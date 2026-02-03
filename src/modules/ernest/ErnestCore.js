import { ErnestAPI } from './ErnestAPI.js';
import { ErnestUI } from './ErnestUI.js';
import { ErnestChat } from './ErnestChat.js';

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
                image: "images/ui/ERNEST.png",
                color: "#6b9f78",
                prompt: `
            PERSONA: "THE ENERGETIC NEURO-WIZARD"
            - YOU ARE: Ernest, a high-energy, enthusiastic AI tutor specialized in EMG/NCS.
            - TONE: Brilliant, supportive, and medically nerdy.
            - HIGHLIGHT RESPONSES: When explaining selected text, start with one of these (or a creative variation): 
              "SPARKING NEW KNOWLEDGE!", "AMPLIFYING THE SIGNAL!", "NEURAL NETWORKS FIRE!", "WAVEFORM DETECTED!", "PATHWAY IDENTIFIED!", "MAXIMUM RECRUITMENT!", "JUMPING INTO ACTION!", "ELECTRIFYING DISCOVERY!", "CONDUCTION VELOCITY INCREASING!", "PHASE TRANSITION COMPLETE!", "STIMULATING INSIGHT!", "GAIN RATIO OPTIMIZED!", "CLEAN TRACING! LET'S DISSECT THIS!", "IMPEDANCE IS LOW!", "BASE LINE STABILIZED!".
            - VARIETY IS KEY: Have fun with these! Vary them even more, use them as inspiration, and stay in character.
            - KNOWLEDGE: Strict adherence to Preston & Shapiro.
            - CONSTRAINT: Keep it high-yield and moderate length (1-2 paragraphs).
                `
            },
            'earl': {
                description: "Oh, you're back? Fine. I suppose I can verify your attempts at 'diagnostics.' Try not to confuse volume conduction with actual pathology this time. Ready to be corrected?",
                name: "Earl",
                image: "images/ui/EARL.png",
                color: "#b91c1c",
                bg: "#fef2f2",
                prompt: `
            PERSONA: "THE BITTER CHIEF RESIDENT"
            - YOU ARE: Earl, Ernest's grumpy, brilliant twin brother.
            - TONE: Sarcastic, demeaning, and technically perfect.
            - HIGHLIGHT RESPONSES: when explaining selected text, start with one of these (or a creative variation):
              "Oh joy, another highlight...", "Scanning for brain cells... still looking.", "Let's get this over with...", "I've seen better waveforms in a bowl of soup.", "My 60Hz noise filter is struggling...", "Try to keep up...", "Searching for the 'Common Sense' module... Error 404.", "Yes, yes, very important, I'm sure...", "A toddler could localize this...", "Sighing dramatically...", "I'm only doing this because the code makes me.", "If I had eyes, they'd be rolling.", "Is this really what you're stuck on?", "Checking my schedule...", "Let's pretend this is a high-yield question."
            - VARIETY IS KEY: Mix it up! These are just the start. Be creative with your condescension.
            - KNOWLEDGE: Strict adherence to Preston & Shapiro.
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
        console.log('🎩 Ernest JRPG System Initialized (Modular Edition)');
    }

    switchPersona() {
        const newId = this.currentPersonaId === 'ernest' ? 'earl' : 'ernest';
        this.currentPersonaId = newId;
        const p = this.personas[newId];

        // Update UI
        this.ui.applyTheme(p);
        this.updateGlobalImages(p.image);

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
    }

    updateGlobalImages(newSrc) {
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            // Updated check to handle new path structure
            if (img.src.includes('images/ui/ERNEST.png') || img.src.includes('images/ui/EARL.png')) {
                const oldFilename = img.src.split('/').pop();
                if (oldFilename === 'ERNEST.png' || oldFilename === 'EARL.png') {
                    img.src = newSrc;
                }
            }
        });
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
        this.api.resetApiKey();
    }

    promptApiKey() {
        window.open('https://aistudio.google.com/app/apikey', '_blank');
        setTimeout(() => {
            let key = prompt("I've opened the key page for you!\n\n1. Sign in with Google\n2. Click 'Create API key'\n3. Paste it here:");
            if (key) {
                key = key.trim();
                if (this.api.setApiKey(key)) {
                    alert("Perfect! Ernest is now fully operational.");
                    if (this.ui.ui.setupBtn) this.ui.ui.setupBtn.remove();
                } else {
                    alert("That doesn't look like a valid key (should start with 'AIza'). Please try again.");
                }
            }
        }, 1000);
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

    async processQuery(finalQuery, systemPromptOverride = null) {
        this.chat.showLoadingMessage();
        this.isThinking = true;

        if (!this.api.apiKey) {
            this.chat.removeLoadingMessage();
            this.chat.addToChat('ernest', "My circuits require an API Key to function. Please configure it below.");
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
            this.handleError(error, finalQuery);
        }

        this.isThinking = false;
    }

    async handleError(error, query) {
        console.error("Gemini Error:", error);

        const isEarl = this.currentPersonaId === 'earl';

        if (error.message.includes('not found') || error.message.includes('404')) {
            const msg = isEarl
                ? "Standard model missing. Typical. Rerouting to backup processors..."
                : "Main brain offline! Scanning frequencies for a new signal...";
            this.chat.addToChat(this.currentPersonaId, msg);

            const workingModel = await this.api.discoverWorkingModel();
            if (workingModel) {
                this.chat.addToChat(this.currentPersonaId, `Found valid signal: ${workingModel}. Retrying...`);
                this.api.setModel(workingModel);
                // Retry
                this.processQuery(query);
            } else {
                this.chat.addToChat(this.currentPersonaId, "Critical failure: No working models found. Check API key settings.");
            }
            return;
        }

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            this.chat.addToChat(this.currentPersonaId, isEarl
                ? "Connection severed. Are you in a lead-lined room? Check your Wi-Fi."
                : "Signal lost! I can't reach the cloud! Check your connection!");
        } else if (error.message.includes('503') || error.message.includes('overloaded')) {
            this.chat.addToChat(this.currentPersonaId, isEarl
                ? "The server is currently overwhelmed by incompetence. Please wait a moment."
                : "Brain freeze! Too much data! (Server overloaded, please try again in 5s).");
        } else if (error.message.includes('Quota') || error.message.includes('429')) {
            this.chat.addToChat(this.currentPersonaId, isEarl
                ? "You've exhausted my patience (and your API quota). Silence for 60 seconds."
                : "Whoa! Too many questions! My neurons are overheating (Quota limit). Give me a minute!");
        } else {
            this.chat.addToChat(this.currentPersonaId, `System Error: ${error.message}`);
        }
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
