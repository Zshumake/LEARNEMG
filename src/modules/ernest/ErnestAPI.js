export class ErnestAPI {
    constructor() {
        this.apiKey = localStorage.getItem('ernest_api_key') || null;
        this.preferredModel = localStorage.getItem('ernest_preferred_model') || null;
    }

    resetApiKey() {
        localStorage.removeItem('ernest_api_key');
        location.reload();
    }

    setApiKey(key) {
        if (key && key.startsWith('AIza')) {
            localStorage.setItem('ernest_api_key', key);
            this.apiKey = key;
            return true;
        }
        return false;
    }

    async discoverWorkingModel() {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.models) {
                const names = data.models.map(m => m.name.replace('models/', ''));
                console.log('Available Models:', names);

                const best = names.find(n => n === 'gemini-flash-latest') ||
                    names.find(n => n === 'gemini-1.5-flash-latest') ||
                    names.find(n => n === 'gemini-pro-latest') ||
                    names.find(n => n === 'gemini-2.0-flash') ||
                    names.find(n => n === 'gemini-2.0-flash-001') ||
                    names.find(n => n === 'gemini-1.5-flash') ||
                    names.find(n => n === 'gemini-1.5-pro') ||
                    names.find(n => n.includes('flash') && n.includes('2.0')) ||
                    names.find(n => n.includes('flash') && n.includes('1.5')) ||
                    names.find(n => n.includes('flash')) ||
                    names.find(n => n.includes('gemini'));

                return best;
            }
        } catch (e) {
            console.error("Discovery failed", e);
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
