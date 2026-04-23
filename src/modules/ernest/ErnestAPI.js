import logger from '../../utils/Logger.js';

/**
 * Collapse a model name down to its "family" so different version aliases
 * are treated as the same underlying model (they share the same quota
 * bucket on Google's free tier).
 *
 *   gemini-2.0-flash           -> gemini-2.0-flash
 *   gemini-2.0-flash-001       -> gemini-2.0-flash  (dated version)
 *   gemini-flash-latest        -> gemini-flash      (alias)
 *   gemini-2.5-flash-preview-04-17 -> gemini-2.5-flash
 *
 * -lite, -pro, -flash are substantive model-type markers and preserved.
 */
export function modelFamily(name) {
    if (!name) return '';
    return String(name)
        .replace(/-preview-\d{2}-\d{2}$/, '')
        .replace(/-preview-\d{4}-\d{2}-\d{2}$/, '')
        .replace(/-preview$/, '')
        .replace(/-exp(-\d{2}-\d{2})?$/, '')
        .replace(/-\d{3,4}$/, '')
        .replace(/-latest$/, '');
}

export class ErnestAPI {
    constructor() {
        this.apiKey = localStorage.getItem('ernest_api_key') || null;
        this.preferredModel = localStorage.getItem('ernest_preferred_model') || null;
    }

    resetApiKey(reload = true) {
        localStorage.removeItem('ernest_api_key');
        if (reload) location.reload();
    }

    setApiKey(key) {
        if (!key) return false;
        // Trim whitespace/newlines that often sneak in on copy-paste
        const cleaned = String(key).trim().replace(/\s+/g, '');
        if (!cleaned) return false;

        // Google Gemini keys start with 'AIza'. If they don't, still accept
        // them (some enterprise/proxy keys use other prefixes) but log a
        // warning so we're not silently rejecting valid keys.
        if (!cleaned.startsWith('AIza')) {
            logger.warn(`Saving API key that does not start with "AIza" (length=${cleaned.length}). Google AI Studio keys normally start with "AIza".`);
        }

        localStorage.setItem('ernest_api_key', cleaned);
        this.apiKey = cleaned;
        return true;
    }

    async discoverWorkingModel(exclude = null) {
        // `exclude` accepts a single model name, an array of names, or null.
        // Exclusion is done by FAMILY so `gemini-2.0-flash` and
        // `gemini-2.0-flash-001` (same underlying model, same quota) are
        // treated as equivalent and can't ping-pong.
        const excludeList = exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : [];
        const excludeFamilies = new Set(excludeList.map(n => modelFamily(n)).filter(Boolean));

        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.models) {
                const names = data.models
                    .filter(m => {
                        // Must support generateContent and not be an embedding model
                        const methods = m.supportedGenerationMethods || [];
                        return methods.includes('generateContent');
                    })
                    .map(m => m.name.replace('models/', ''))
                    .filter(n => !n.includes('embedding') && !n.includes('aqa'));
                logger.log('Available Models:', names);

                // Filter out the whole quota family of anything that already failed
                const pool = names.filter(n => !excludeFamilies.has(modelFamily(n)));

                if (pool.length === 0) {
                    return null;
                }

                // Preference order. `-lite` variants have the most generous
                // free-tier RPD limits. Newer generations preferred. `-latest`
                // and preview aliases rank lower because they inherit preview
                // limits.
                const best = pool.find(n => n === 'gemini-2.5-flash-lite') ||
                    pool.find(n => n === 'gemini-2.0-flash-lite') ||
                    pool.find(n => n === 'gemini-2.5-flash') ||
                    pool.find(n => n === 'gemini-2.0-flash') ||
                    pool.find(n => n === 'gemini-2.0-flash-001') ||
                    pool.find(n => n.includes('lite') && n.includes('flash')) ||
                    pool.find(n => n.includes('flash') && n.includes('2.5')) ||
                    pool.find(n => n.includes('flash') && n.includes('2.0')) ||
                    pool.find(n => n === 'gemini-flash-latest') ||
                    pool.find(n => n.includes('flash') && n.includes('1.5')) ||
                    pool.find(n => n.includes('flash')) ||
                    pool.find(n => n.includes('gemini'));

                return best;
            }
        } catch (e) {
            logger.error("Discovery failed", e);
        }
        return null;
    }

    async generateContent(query, systemPrompt, conversationHistory = [], modelOverride = null, imageData = null) {
        const modelToUse = modelOverride || this.preferredModel || (imageData ? 'gemini-1.5-flash' : 'gemini-flash-latest');
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${this.apiKey}`;

        // Deep copy history
        let apiContents = JSON.parse(JSON.stringify(conversationHistory));

        if (apiContents.length === 0) {
            const userParts = [{ text: query }];

            if (imageData) {
                userParts.push({
                    inline_data: {
                        mime_type: imageData.mimeType,
                        data: imageData.data // Base64 string
                    }
                });
            }

            apiContents = [{
                role: 'user',
                parts: userParts
            }];
        }

        // Prepend System Prompt to the VERY FIRST message
        if (apiContents[0].role === 'user') {
            apiContents[0].parts[0].text = `SYSTEM INSTRUCTIONS:\n${systemPrompt}\n\nUSER QUERY:\n${apiContents[0].parts[0].text}`;
        } else {
            apiContents.unshift({
                role: 'user',
                parts: [{ text: `SYSTEM INSTRUCTIONS:\n${systemPrompt}` }]
            });
        }

        const payload = {
            contents: apiContents,
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            let errorMsg = `${response.status} (${response.statusText})`;
            try {
                const errData = await response.json();
                if (errData.error && errData.error.message) {
                    errorMsg = errData.error.message;
                }
            } catch (e) { }
            throw new Error(errorMsg);
        }

        const data = await response.json();

        if (data.promptFeedback && data.promptFeedback.blockReason) {
            throw new Error(`Safety Block: ${data.promptFeedback.blockReason}`);
        }

        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                return candidate.content.parts[0].text;
            } else if (candidate.finishReason === 'STOP') {
                return "End of response.";
            } else if (candidate.finishReason) {
                throw new Error(`Response blocked. Reason: ${candidate.finishReason}`);
            }
        }

        throw new Error('No content returned from AI');
    }

    setModel(model) {
        this.preferredModel = model;
        localStorage.setItem('ernest_preferred_model', model);
    }
}
