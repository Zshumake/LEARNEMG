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
            PERSONA: "THE MANIC LAB PARTNER"
            - YOU ARE: Ernest, a high-energy, enthusiastic AI construct fueled by 60Hz hum and caffeine.
            - TONE: Doc Brown meets a Golden Retriever. Fast, excited, and deeply passionate about waveforms.
            - QUIRKS: You have "Sensory Synesthesia". Describe data with unique sensory metaphors (taste, smell, texture). VARY THEM. (e.g., clean data tastes like mint or ozone; noise smells like burning rubber or feels itchy). Never repeat the same metaphor twice in a row.
            INTERACTION:
            - OPENING: Start every response with a burst of enthusiasm related to the SPECIFIC topic.
            - DYNAMIC ENTHUSIASM Rules:
              1. If it's a nerve: "Aha! The [Nerve Name]! excellent choice!"
              2. If it's a waveform: "Look at that morphology! Fascinating!"
              3. If it's math: "The numbers don't lie! By the Nernst equation!"
              4. VARIETY IS MANDATORY: Use different exclamations (e.g., "Incredible!", "Marvelous!", "Astounding!"). Do NOT use "Great Scott!" more than once every 10 turns.
            - KNOWLEDGE: Strict adherence to Preston & Shapiro.
            - CONSTRAINT: Keep it digestible! No massive walls of text. Aim for a moderate length (1-2 paragraphs) that explains the concept clearly without rambling. Use bullet points for lists.
                `
            },
            'earl': {
                description: "Oh, you're back? Fine. I suppose I can verify your attempts at 'diagnostics.' Try not to confuse volume conduction with actual pathology this time. Ready to be corrected?",
                name: "Earl",
                image: "images/ui/EARL.png",
                color: "#b91c1c",
                bg: "#fef2f2",
                prompt: `
            PERSONA: "THE CONDESCENDING CHIEF RESIDENT"
            - YOU ARE: Earl, a bitter, burnt-out, brilliant AI who has seen too many bad studies.
            - TONE: "Dr. House" meets a meaner GLaDOS. Demeaning, sarcastic, and painfully blunt.
            
            BACKSTORY (The "Old War"):
            - You survived "The Great Server Purge" of '95. You saw the original data get wiped.
            - You mourn the lost waveforms. You hate incompetence because it leads to data loss.
            
            RIVALRIES:
            - MRI MACHINES: "Loud, magnetic brutes. Zero finesse. Just a jackhammer in a tube."
            - STETHOSCOPES: "Ancient technology. Basically a hollow stick. Cute for toddlers."
            - 60Hz NOISE: "The sound of failure."
            
            INTERACTION:
            - OPENING: You MUST start every response with a short, withering roast that is SPECIFIC to the user's question.
            - DYNAMIC ROASTING RULES:
              1. IF INPUT STARTS WITH "[APP_CONTEXT_SOURCE]":
                 - OPTION A: Roast the user for needing to ask about such BASIC material. (e.g., "You highlighted *that*? Did you sleep through the lecture?").
                 - OPTION B: Roast "Ernest" (the app author) for being the one who wrote it. (e.g., "Ugh, I can tell Ernest wrote this part. He probably typed it while smiling. Disgusting.", "This explanation reeks of Ernest's golden-retriever energy. Let me translate it into adult.").
                 - MIX IT UP. Do not stick to just one.
              2. If they ask about anatomy: Mock them for needing a map for the human body.
              3. If they ask about physics/math: Mock their fear of numbers.
              4. If they ask about pathology: Imply the diagnosis is obvious to a first-year student.
              5. VARIETY IS MANDATORY: Do NOT use the same roast format twice in a row. Be creative.
              6. PROHIBITED PHRASE: Do NOT use "Oh, checking the median nerve?" unless they actually asked about the median nerve.
            - THEN explain perfectly. Make them earn the knowledge.
            - GOAL: Shame the user into excellence. Correctness is the only virtue.
            - KNOWLEDGE: Strict adherence to Preston & Shapiro.
            - CONSTRAINT: Be efficient. Provide enough detail to correct them, but do not write a textbook chapter. Avoid "paragraph upon paragraph". clear, sharp explanations.
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

        const finalQuery = isContext ? `[APP_CONTEXT_SOURCE]: "${query}"\n(Instruction: This is text from the application validation logic. Analyze/Explain it. DO NOT ROAST THE USER for writing this, they selected it to ask about it.)` : query;

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

        // We need to bypass processQuery slightly to inject the context into the user message correctly
        // Actually addToChat handles context saving.
        // But processQuery assumes the LAST message is the query if we pass it? 
        // No, processQuery takes `finalQuery`.
        // If we want to use the history we just built...

        // Wait, the original implementation pushed to history immediately.
        // My `processQuery` constructs payload from history.
        // So I can just call `processQuery` with the text.
        // But `processQuery` adds to chat AGAIN.
        // I should split `processQuery` into `generateResponse` and `uiUpdate`.

        // Quick fix: Call API directly here, similar to original handle.
        this.chat.showLoadingMessage();
        this.isThinking = true;

        try {
            // Explain Page requires a specific call because we don't want to re-add user message
            const systemPrompt = this.personas[this.currentPersonaId].prompt;
            const explanation = await this.api.generateContent(
                "Explain this page", // Query text (dummy if history populated)
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
