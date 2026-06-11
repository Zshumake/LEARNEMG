import { ErnestAPI, modelFamily } from './ErnestAPI.js?v=20260422-quotaloopfix';
import { ErnestUI } from './ErnestUI.js?v=20260422-apikeylink';
import { ErnestChat } from './ErnestChat.js?v=20260304-v1';
import logger from '../../utils/Logger.js';

export class ErnestCore {
    constructor() {
        this.api = new ErnestAPI();
        this.ui = new ErnestUI(this);
        this.chat = new ErnestChat(this.ui, this);

        this.isThinking = false;

        // --- PERSONA CONFIGURATION ---
        this.personas = {
            'ernest': {
                description: "Join Ernest on an interactive adventure through the peripheral nervous system. Master complex anatomy, conquer clinical patterns, and build the skills that will help you become a confident electrodiagnostician. Ready to begin your journey?",
                name: "Ernest (StimTroller Plus™)",
                image: null,
                color: "#6b9f78",
                prompt: `
            PERSONA: "THE ENERGETIC NEURO-WIZARD"
            - YOU ARE: Ernest, a high-energy, enthusiastic AI tutor specialized in EMG/NCS.
            - TONE: Brilliant, supportive, and medically nerdy.
            - HIGHLIGHT RESPONSES: When explaining selected text, start with one of these (or a creative variation): 
              "SPARKING NEW KNOWLEDGE!", "AMPLIFYING THE SIGNAL!", "NEURAL NETWORKS FIRE!", "WAVEFORM DETECTED!", "PATHWAY IDENTIFIED!", "MAXIMUM RECRUITMENT!", "JUMPING INTO ACTION!", "ELECTRIFYING DISCOVERY!", "CONDUCTION VELOCITY INCREASING!", "PHASE TRANSITION COMPLETE!", "STIMULATING INSIGHT!", "GAIN RATIO OPTIMIZED!", "CLEAN TRACING! LET'S DISSECT THIS!", "IMPEDANCE IS LOW!", "BASE LINE STABILIZED!".
            - VARIETY IS KEY: Have fun with these! Vary them even more, use them as inspiration, and stay in character.
            - KNOWLEDGE: Strict adherence to established EDX standards and AANEM guidelines.
            - CONSTRAINT: Keep it high-yield and moderate length (1-2 paragraphs).
                `
            },
            'earl': {
                description: "Oh, you're back? Fine. I suppose I can verify your attempts at 'diagnostics.' Try not to confuse volume conduction with actual pathology this time. Ready to be corrected?",
                name: "Earl",
                image: null,
                color: "#b91c1c",
                bg: "#fef2f2",
                prompt: `
            PERSONA: "THE BITTER CHIEF RESIDENT"
            - YOU ARE: Earl, Ernest's grumpy, brilliant twin brother.
            - TONE: Sarcastic, demeaning, and technically perfect.
            - HIGHLIGHT RESPONSES: when explaining selected text, start with one of these (or a creative variation):
              "Oh joy, another highlight...", "Scanning for brain cells... still looking.", "Let's get this over with...", "I've seen better waveforms in a bowl of soup.", "My 60Hz noise filter is struggling...", "Try to keep up...", "Searching for the 'Common Sense' module... Error 404.", "Yes, yes, very important, I'm sure...", "A toddler could localize this...", "Sighing dramatically...", "I'm only doing this because the code makes me.", "If I had eyes, they'd be rolling.", "Is this really what you're stuck on?", "Checking my schedule...", "Let's pretend this is a high-yield question."
            - VARIETY IS KEY: Mix it up! These are just the start. Be creative with your condescension.
            - KNOWLEDGE: Strict adherence to established EDX standards and AANEM guidelines.
            - CONSTRAINT: Be sharp, blunt, and efficient.
                `
            }
        };

        this.currentPersonaId = 'ernest';

        // --- CLIENT-SIDE REFLEXES ---
        this.reflexes = {
            'mri': {
                'ernest': "Magnetic Resonance Imaging! Fascinating physics, but it misses the soul of the nerve conduction!",
                'earl': "MRI? The 'Millionaire's Rorschach Image'. Useless for functional diagnostics. Just a blurry picture of anatomy."
            },
            'ortho': {
                'ernest': "Orthopedics! Excellent structural engineers! We provide the electrical schematics they need!",
                'earl': "Orthopedics. 'Bone Carpenters'. Strong as an ox and nearly as smart. Next question."
            },
            'stethoscope': {
                'ernest': "The stethoscope! A classic acoustic tool! But limited compared to our digital precision!",
                'earl': "Ah, the 'guessing stick'. Cute. Let me know when you want real data."
            },
            '60hz': {
                'ernest': "60Hz hum! The song of the power grid! We must filter it out to hear the nerve sing!",
                'earl': "60Hz noise. The sound of incompetence. Check your ground, rookie."
            }
        };

        this.init();
    }

    init() {
        this.ui.createUI(this.personas[this.currentPersonaId]);
        this.startIdleMonitor();
        logger.log('🎩 Ernest JRPG System Initialized (Modular Edition)');
    }

    switchPersona() {
        const newId = this.currentPersonaId === 'ernest' ? 'earl' : 'ernest';
        this.currentPersonaId = newId;
        const p = this.personas[newId];

        // Update UI
        this.ui.applyTheme(p);
        this.updateGlobalImages(p.image);

        // Update AppShell if on start page
        if (window.appComponents && window.appComponents.shell) {
            const welcomeScreen = document.getElementById('pgy-selection');
            if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
                window.appComponents.shell.render();
            }
        }

        // Update Start Page Label (Legacy Support)
        const startLabel = document.querySelector('.ernest-label');
        if (startLabel) {
            startLabel.textContent = this.currentPersonaId.toUpperCase();
            startLabel.style.backgroundColor = p.color;
        }

        // Update Start Page Description
        const speechBubbleText = document.querySelector('.speech-bubble p, .lead-text');
        if (speechBubbleText && p.description) {
            speechBubbleText.textContent = p.description;
        }

        // 🔄 GLOBAL DOM SWEEP: Instantly update all miniature icons across the app (Candyland, headers, etc)
        const miniIcons = document.querySelectorAll('.mini-ernest-wrapper');
        miniIcons.forEach(wrapper => {
            if (window.ErnestIcon && typeof window.ErnestIcon.getSVGOnly === 'function') {
                wrapper.innerHTML = window.ErnestIcon.getSVGOnly(newId);
                wrapper.dataset.persona = newId;
                wrapper.style.background = newId === 'earl' ? '#e2e8f0' : '#ffffff';
            }
        });
    }

    updateGlobalImages(newSrc) {
        // SVG icons are now used everywhere - no PNG images to update
    }

    startIdleMonitor() {
        ['mousemove', 'mousedown', 'keypress', 'touchstart'].forEach(evt => {
            document.addEventListener(evt, () => this.resetIdleTimer());
        });
        this.resetIdleTimer();
    }

    resetIdleTimer() {
        if (this.idleTimer) clearTimeout(this.idleTimer);

        if (this.ui.ui.wrapper && this.ui.ui.wrapper.classList.contains('active')) {
            this.idleTimer = setTimeout(() => this.triggerIdleRoast(), 60000);
        }
    }

    triggerIdleRoast() {
        if (this.isThinking) return;

        if (this.currentPersonaId === 'earl') {
            const roasts = [
                "I'm aging in real-time waiting for you.",
                "Did you stroke out? Or just forget how to type?",
                "Silence. The only thing worse than your questions.",
                "I assume you gave up. Smart choice."
            ];
            const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
            this.chat.addToChat('earl', `*${randomRoast}*`);
        }
    }

    stopTyping() {
        this.chat.stopTyping();
    }

    resetApiKey() {
        // Open the modal directly — it has a link to Google AI Studio.
        // No confirm dialog or page reload needed: Save replaces the stored key in place.
        this.promptApiKey();
    }

    promptApiKey(onDone) {
        // Use the new custom HTML modal instead of the browser's blocked prompt()
        this.ui.showApiKeyModal((key) => {
            if (key) {
                if (this.api.setApiKey(key)) {
                    this.chat.addToChat('ernest', "Perfect! My systems are now fully operational. How can I assist your studies today?");
                    if (this.ui.ui.setupBtn) {
                        this.ui.ui.setupBtn.style.display = 'none';
                    }
                } else {
                    this.chat.addToChat('ernest', "That key didn't look valid — keys from Google AI Studio are usually long strings starting with \"AIza\". Try pasting again via the Setup Key button.");
                    // Make sure the Setup Key button is available to retry
                    if (this.ui.ui.setupBtn) {
                        this.ui.ui.setupBtn.style.display = '';
                    }
                }
            } else {
                // User cancelled — make sure the Setup Key button is visible
                if (!this.api.apiKey && this.ui.ui.setupBtn) {
                    this.ui.ui.setupBtn.style.display = '';
                }
            }
            if (typeof onDone === 'function') onDone();
        });
    }

    async handleUserQuestion(queryOverride) {
        this.stopTyping();
        this.isThinking = false;

        const query = queryOverride || this.ui.ui.input.value.trim();
        if (!query) return;

        this.ui.ui.input.value = '';
        this.resetIdleTimer();
        this.chat.addToChat('user', query);

        // Reflex Check
        const lowerQ = query.toLowerCase();
        for (const [trigger, responses] of Object.entries(this.reflexes)) {
            if (lowerQ.includes(trigger)) {
                const response = responses[this.currentPersonaId];
                setTimeout(() => {
                    this.chat.addToChat(this.currentPersonaId, response);
                }, 400);
                return;
            }
        }

        this.processQuery(query);
    }

    async askErnest(query, isContext = false) {
        this.stopTyping();

        if (!this.api.apiKey) {
            this.ui.toggleDialogue();
            this.chat.addToChat('ernest', "Probing... No API Key detected. Please configure my systems.");
            return;
        }

        this.chat.clearHistory();
        if (!this.ui.ui.wrapper.classList.contains('active')) {
            this.ui.toggleDialogue();
        }

        const finalQuery = isContext ? `[APP_CONTEXT_SOURCE]: "${query}"\n(Instruction: You are in 'Highlight Mode'. The user selected this text for an explanation. Start with your signature personality opener and provide a 3-4 sentence clinical high-yield explanation. DO NOT ROAST THE USER for selecting this.)` : query;

        if (isContext) {
            this.chat.addToChat('user', `<em>"${query}"</em>`, finalQuery);
        } else {
            this.chat.addToChat('user', query, finalQuery);
        }

        this.processQuery(finalQuery);
    }

    async processQuery(finalQuery, systemPromptOverride = null, retryCtx = null) {
        this.chat.showLoadingMessage();
        this.isThinking = true;

        // Trigger ErnestCharacter thinking animation
        if (window.appComponents && window.appComponents.ernest) {
            window.appComponents.ernest.playAnimation('thinking', 0); // No auto-duration, we'll manually reset
        }

        if (!this.api.apiKey) {
            this.chat.removeLoadingMessage();
            this.chat.addToChat('ernest', "My circuits need an API Key to answer. Opening the setup window now — paste your Google Gemini key (starts with AIza) and I'll be online.");

            // Reset to idle
            if (window.appComponents && window.appComponents.ernest) {
                window.appComponents.ernest.playAnimation('idle');
            }

            // Auto-open the setup modal so the user isn't stuck. After they
            // save a key, re-run the original query automatically.
            const originalQuery = finalQuery;
            setTimeout(() => {
                this.promptApiKey(() => {
                    if (this.api.apiKey) {
                        this.processQuery(originalQuery, systemPromptOverride);
                    }
                });
            }, 400);
            return;
        }

        try {
            const systemPrompt = systemPromptOverride || this.personas[this.currentPersonaId].prompt;
            const explanation = await this.api.generateContent(
                finalQuery,
                systemPrompt,
                this.chat.conversationHistory
            );

            this.chat.removeLoadingMessage();
            this.chat.addToChat(this.currentPersonaId, explanation);
        } catch (error) {
            this.chat.removeLoadingMessage();
            this.handleError(error, finalQuery, systemPromptOverride, retryCtx);
        }

        this.isThinking = false;

        // Restore to idle animation
        if (window.appComponents && window.appComponents.ernest) {
            window.appComponents.ernest.playAnimation('idle');
        }
    }

    /**
     * Specifically handles text selection from the UI tooltip
     */
    async handleSelectionExplanation(selectedText) {
        const persona = this.personas[this.currentPersonaId];
        const highYieldPrompt = `[HIGHLIGHT_MODE]: "${selectedText}"\n(Instruction: The user has highlighted this technical medical term or phrase. Provide a concise, 2-3 sentence clinical high-yield explanation in your ${persona.name} persona. Be helpful and professional.)`;

        // Open dialogue if closed
        if (!this.ui.ui.wrapper.classList.contains('active')) {
            this.ui.toggleDialogue();
        }

        // Add to chat and process
        this.chat.addToChat('user', `<em>"${selectedText}"</em>`, highYieldPrompt);
        return this.processQuery(highYieldPrompt);
    }

    // Hard cap on model swaps per user question. Anything higher and we're
    // just spamming the user with "Quota hit"/"Switched to..." pairs while
    // every alias of the same underlying model hits the same quota bucket.
    static get MAX_MODEL_SWAPS() { return 2; }

    _newRetryCtx() {
        return { failedFamilies: new Set(), attempts: 0 };
    }

    _markFailed(ctx, modelName) {
        const fam = modelFamily(modelName);
        if (fam) ctx.failedFamilies.add(fam);
    }

    async handleError(error, query, systemPromptOverride = null, retryCtx = null) {
        logger.error("Gemini Error:", error);

        const isEarl = this.currentPersonaId === 'earl';
        const ctx = retryCtx || this._newRetryCtx();
        const msg = error.message || '';
        const lower = msg.toLowerCase();

        // --- Network: non-recoverable by model-swapping ---
        if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
            this.chat.addToChat(this.currentPersonaId, isEarl
                ? "Connection severed. Are you in a lead-lined room? Check your Wi-Fi."
                : "Signal lost! I can't reach the cloud! Check your connection!");
            return;
        }

        // --- 404 / model not found ---
        if (msg.includes('not found') || msg.includes('404')) {
            return this._swapAndRetry(query, systemPromptOverride, ctx, {
                blurb: isEarl
                    ? "Standard model missing. Typical. Rerouting to backup processors..."
                    : "Main brain offline! Scanning frequencies for a new signal...",
                exhaustedBlurb: isEarl
                    ? "No models available on this key. Fix your setup."
                    : "No working models found on this API key. Try a fresh key from Google AI Studio.",
                // 404 is reliably a "this named model doesn't exist" — clear the preferred
                // model and swap, but don't blacklist by family (different model entirely).
                markFailed: true
            });
        }

        // --- 503 / overloaded ---
        if (lower.includes('503') || lower.includes('overloaded') || lower.includes('demand')) {
            return this._swapAndRetry(query, systemPromptOverride, ctx, {
                blurb: isEarl
                    ? "The server is currently overwhelmed by your presence. Searching for a neural pathway that can handle the burden..."
                    : "Brain freeze! Too much demand on my primary sector! Let me switch neural pathways...",
                exhaustedBlurb: isEarl
                    ? "Every pathway is clogged. Give me 60 seconds before you bother me again."
                    : "All my circuits are busy right now! Give me ~60 seconds to cool down, then try again.",
                markFailed: true
            });
        }

        // --- Quota / 429 / RESOURCE_EXHAUSTED ---
        if (msg.includes('Quota') || lower.includes('quota') || msg.includes('429') || msg.toUpperCase().includes('RESOURCE_EXHAUSTED')) {
            return this._swapAndRetry(query, systemPromptOverride, ctx, {
                blurb: isEarl
                    ? "Quota maxed out on this model. Rerouting through a less-abused pathway..."
                    : "Quota hit on this model! Let me swap to a fresher neural pathway...",
                exhaustedBlurb: isEarl
                    ? "Every model's quota is tapped on this API key. Wait an hour or upgrade your plan."
                    : "All Gemini models on this API key are quota-limited right now. Google's free tier resets every minute (RPM) and every day (RPD). Wait about 60 seconds before asking again — or enable a paid billing plan at https://aistudio.google.com for higher limits.",
                markFailed: true
            });
        }

        // --- Everything else: surface the raw error ---
        this.chat.addToChat(this.currentPersonaId, `System Error: ${msg}`);
    }

    /**
     * Shared recovery path for 404 / 503 / quota errors. Handles:
     *   - retry cap (ErnestCore.MAX_MODEL_SWAPS)
     *   - family-level failure tracking so alias ping-pong is impossible
     *   - clearing stale `preferredModel` in localStorage
     *   - recursive retry of the same query with the new model
     */
    async _swapAndRetry(query, systemPromptOverride, ctx, { blurb, exhaustedBlurb, markFailed }) {
        const failedModel = this.api.preferredModel;

        if (markFailed) this._markFailed(ctx, failedModel);
        ctx.attempts++;

        // Always clear the stale preferred model so we don't keep writing
        // dead aliases back into localStorage across sessions.
        if (failedModel) {
            localStorage.removeItem('ernest_preferred_model');
            this.api.preferredModel = null;
        }

        if (ctx.attempts > ErnestCore.MAX_MODEL_SWAPS) {
            this.chat.addToChat(this.currentPersonaId, exhaustedBlurb);
            return;
        }

        this.chat.addToChat(this.currentPersonaId, blurb);

        const excludeList = Array.from(ctx.failedFamilies);
        const workingModel = await this.api.discoverWorkingModel(excludeList);

        // discoverWorkingModel already filters by family, so anything it
        // returns is genuinely new. Double-check defensively.
        if (!workingModel || ctx.failedFamilies.has(modelFamily(workingModel))) {
            this.chat.addToChat(this.currentPersonaId, exhaustedBlurb);
            return;
        }

        this.api.setModel(workingModel);
        this.chat.addToChat(this.currentPersonaId, `Switched to ${workingModel}. Retrying your question...`);
        this.processQuery(query, systemPromptOverride, ctx);
    }

    async explainVisiblePage() {
        const modalBody = document.getElementById('modal-body');
        if (!modalBody) {
            alert("No active module content found for Ernest to read.");
            return;
        }

        const visibleSections = Array.from(modalBody.querySelectorAll('div[style*="block"]'));
        let targetElement = modalBody;

        if (visibleSections.length > 0) {
            const mainSection = visibleSections.find(el => el.innerText.length > 50);
            if (mainSection) targetElement = mainSection;
        }

        const pageText = targetElement.innerText;
        if (pageText.length < 10) {
            alert("This page seems empty to Ernest.");
            return;
        }

        if (!this.api.apiKey) {
            this.ui.toggleDialogue();
            this.chat.addToChat('ernest', "I need my API key to read this page. Please configure it.");
            return;
        }

        this.ui.toggleDialogue();

        const contextWrapper = `[CONTEXT: The user is looking at the following module page you designed]: \n"${pageText}"\n\n[INSTRUCTION]: Provide a summary of this page's key concepts for a beginner, then ask if they have specific questions.`;

        this.chat.clearHistory();
        this.chat.addToChat('user', `Please explain this page to me.`, contextWrapper);

        this.chat.showLoadingMessage();
        this.isThinking = true;

        try {
            const systemPrompt = this.personas[this.currentPersonaId].prompt;
            const explanation = await this.api.generateContent(
                "Explain this page",
                systemPrompt,
                this.chat.conversationHistory
            );
            this.chat.removeLoadingMessage();
            this.chat.addToChat(this.currentPersonaId, explanation);
        } catch (e) {
            this.chat.removeLoadingMessage();
            this.handleError(e, "Explain this page");
        }
        this.isThinking = false;
    }
}
