/**
 * ErnestAI - JRPG Style Companion & Tutor
 * Integrates Google Gemini Flash (Free Tier) for contextual explanations.
 */

class ErnestJRPG {
    constructor() {
        this.apiKey = localStorage.getItem('ernest_api_key') || null;
        this.preferredModel = localStorage.getItem('ernest_preferred_model') || null;
        this.isThinking = false;

        // --- PERSONA CONFIGURATION ---
        this.personas = {
            'ernest': {
                description: "Join Ernest on an interactive adventure through the peripheral nervous system. Master complex anatomy, conquer clinical patterns, and build the skills that will help you become a confident electrodiagnostician. Ready to begin your journey?",
                name: "Ernest (StimTroller Plus™)",
                image: "ERNEST.png",
                color: "#6b9f78", // Green
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
                image: "EARL.png",
                color: "#b91c1c", // Dark Red
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
              1. IF INPUT STARTS WITH "[APP_CONTEXT_SOURCE]": Roast the user for needing to ask about such BASIC material from the app. (e.g., "You highlighted *that*? It's literally the first sentence.", "Did you sleep through the lecture? Read it again.").
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

        // Default Persona
        this.currentPersonaId = 'ernest';
        const p = this.personas[this.currentPersonaId];

        // Apply Initial Theme
        this.applyTheme(this.personas[this.currentPersonaId]);
        this.updateGlobalImages(this.personas[this.currentPersonaId].image);

        this.characterImage = p.image;
        this.systemPrompt = p.prompt;
        this.themeColor = p.color;

        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.injectStyles();
        this.createUI();
        this.attachEventListeners();
        console.log('🎩 Ernest JRPG System Initialized (StimTroller Edition)');
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ernest JRPG UI Styles */
            .jrpg-ernest-wrapper {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(150%); /* Hidden by default */
                width: 90%;
                max-width: 800px;
                z-index: 2147483647; /* God-mode Layer */
                display: flex;
                align-items: flex-end;
                gap: 15px;
                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: none;
                visibility: hidden;
            }

            .jrpg-ernest-wrapper.active {
                transform: translateX(-50%) translateY(0);
                pointer-events: all;
                visibility: visible;
            }

            .jrpg-ernest-avatar-container {
                position: relative;
                width: 120px;
                height: 120px;
                flex-shrink: 0;
            }

            .jrpg-ernest-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 4px solid #6b9f78;
                background: #fff;
                object-fit: contain;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                background-color: #f0fdf4;
                /* Failsafe size constraints */
                max-width: 120px !important;
                max-height: 120px !important;
            }

            .jrpg-ernest-dialogue-box {
                background: rgba(255, 255, 255, 0.98);
                border: 3px solid #6b9f78;
                border-radius: 15px;
                padding: 15px;
                flex-grow: 1;
                height: 350px; /* Fixed height for chat */
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                font-family: 'Segoe UI', sans-serif;
                position: relative;
                backdrop-filter: blur(10px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .jrpg-ernest-name-tag {
                position: absolute;
                top: -15px;
                left: 20px;
                background: #6b9f78;
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 0.9em;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            .jrpg-ernest-chat-history {
                flex-grow: 1;
                overflow-y: auto;
                margin-top: 10px;
                margin-bottom: 10px;
                padding-right: 5px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .jrpg-ernest-chat-message {
                padding: 8px 12px;
                border-radius: 10px;
                font-size: 1em;
                line-height: 1.4;
                max-width: 90%;
            }

            .jrpg-ernest-message-user {
                align-self: flex-end;
                background: #e2e8f0;
                color: #334155;
            }

            .jrpg-ernest-message-ernest {
                align-self: flex-start;
                background: #f0fdf4;
                color: #2c3e50;
                border: 1px solid #dcfce7;
            }

            /* Table Styles */
            .jrpg-table-wrapper {
                overflow-x: auto;
                margin: 10px 0;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }

            .jrpg-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 0.9em;
                background: white;
            }

            .jrpg-table th {
                background: #6b9f78;
                color: white;
                padding: 8px 12px;
                text-align: left;
                font-weight: 600;
            }

            .jrpg-table td {
                padding: 8px 12px;
                border-bottom: 1px solid #f1f5f9;
                color: #334155;
            }

            .jrpg-table tr:last-child td {
                border-bottom: none;
            }

            .jrpg-table tr:nth-child(even) {
                background-color: #f8fafc;
            }

            .jrpg-ernest-input-area {
                display: flex;
                gap: 10px;
                border-top: 1px solid #e2e8f0;
                padding-top: 10px;
            }

            .jrpg-ernest-input {
                flex-grow: 1;
                padding: 10px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1em;
                outline: none;
                transition: border-color 0.2s;
            }
            .jrpg-ernest-input:focus {
                border-color: #6b9f78;
            }

            .jrpg-ernest-btn {
                background: #e2e8f0;
                border: none;
                padding: 8px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.2s;
                color: #475569;
                font-weight: 600;
                white-space: nowrap;
            }

            .jrpg-ernest-btn:hover {
                background: #cbd5e1;
                transform: translateY(-2px);
            }

            .jrpg-ernest-btn.primary {
                background: #6b9f78;
                color: white;
            }

            .jrpg-ernest-btn.primary:hover {
                background: #5a8a67;
            }

            /* Tooltip for Text Selection */
            .jrpg-ernest-tooltip {
                position: absolute;
                background: #2c3e50;
                color: white;
                padding: 8px 14px 8px 10px;
                border-radius: 25px;
                font-size: 14px;
                cursor: pointer;
                z-index: 2147483647;
                display: none;
                animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                border: 2px solid white;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            /* Tooltip Arrow (Points UP) */
            .jrpg-ernest-tooltip::after {
                 content: '';
                 position: absolute;
                 bottom: 100%; /* Top of tooltip */
                 left: 50%;
                 margin-left: -6px;
                 border-width: 6px;
                 border-style: solid;
                 border-color: transparent transparent #2c3e50 transparent;
            }
            .jrpg-ernest-tooltip img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            /* Loading Dots */
            .jrpg-typing-dots {
                display: inline-block;
                width: 20px;
                text-align: left;
            }
            .jrpg-typing-dots::after {
                content: '...';
                animation: dots 1.5s steps(4, end) infinite;
            }
            @keyframes dots {
                0%, 20% { content: ''; }
                40% { content: '.'; }
                60% { content: '..'; }
                80%, 100% { content: '...'; }
            }

            /* Floating "Start Page" Avatar */
            .jrpg-floating-avatar {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 3px solid #6b9f78;
                background: #fff;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                z-index: 2147483646; /* Just below wrapper */
                cursor: pointer;
                transition: transform 0.2s;
                display: flex; /* Flex to center image */
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            .jrpg-floating-avatar:hover {
                transform: scale(1.1);
            }

            .jrpg-floating-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    createUI() {
        // 1. Floating Avatar (Persistent)
        const floater = document.createElement('div');
        floater.className = 'jrpg-floating-avatar';
        floater.id = 'jrpg-floating-avatar';
        floater.title = "Open AI Companion";
        floater.innerHTML = `<img src="${this.characterImage}" alt="AI Companion">`;
        floater.onclick = () => this.toggleDialogue();
        document.body.appendChild(floater);

        // Main Interaction Wrapper (Chat Window)
        const wrapper = document.createElement('div');
        wrapper.className = 'jrpg-ernest-wrapper';
        wrapper.id = 'jrpg-ernest-wrapper';
        wrapper.innerHTML = `
            <div class="jrpg-ernest-avatar-container">
                <img src="${this.characterImage}" alt="Ernest" class="jrpg-ernest-avatar">
            </div>
            <div class="jrpg-ernest-dialogue-box">
                <div class="jrpg-ernest-name-tag">Ernest (StimTroller Plus™)</div>
                
                <div class="jrpg-ernest-chat-history" id="jrpg-ernest-chat-history"></div>

                <div class="jrpg-ernest-input-area">
                    <input type="text" class="jrpg-ernest-input" id="jrpg-ernest-input" placeholder="Input query...">
                    <button class="jrpg-ernest-btn primary" id="jrpg-ernest-send">Send</button>

                    <button class="jrpg-ernest-btn" id="jrpg-ernest-close" title="Minimize">▼</button>
                    <button class="jrpg-ernest-btn" id="jrpg-ernest-reset" title="Reset API Key">⚙️</button>
                    ${!this.apiKey ? '<button class="jrpg-ernest-btn primary" id="jrpg-ernest-setup">Setup Key</button>' : ''}
                </div>
            </div>
        `;
        document.body.appendChild(wrapper);

        // Elements
        this.ui = {
            wrapper: wrapper,
            floater: floater,
            chatHistory: document.getElementById('jrpg-ernest-chat-history'),
            input: document.getElementById('jrpg-ernest-input'),
            sendBtn: document.getElementById('jrpg-ernest-send'),
            closeBtn: document.getElementById('jrpg-ernest-close'),
            resetBtn: document.getElementById('jrpg-ernest-reset'),
            setupBtn: document.getElementById('jrpg-ernest-setup'),
            swapBtn: document.getElementById('jrpg-ernest-swap'), // New Button
            avatar: wrapper.querySelector('.jrpg-ernest-avatar'),
            nameTag: wrapper.querySelector('.jrpg-ernest-name-tag'),
            dialogueBox: wrapper.querySelector('.jrpg-ernest-dialogue-box')
        };

        // Selection Tooltip - NOW called after this.ui is ready
        this.createTooltip();

        if (this.ui.resetBtn) {
            this.ui.resetBtn.addEventListener('click', () => this.resetApiKey());
        }

        // Event Delegation for Setup Button (Robust handling)
        this.ui.wrapper.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'jrpg-ernest-setup') {
                console.log("Setup Key Button Clicked via Delegation");
                this.promptApiKey();
            }
        });

        this.ui.closeBtn.addEventListener('click', () => this.toggleDialogue());

        // Chat Inputs
        if (this.ui.sendBtn) {
            this.ui.sendBtn.addEventListener('click', () => this.handleUserQuestion());
        }

        // Easter Egg: Hidden Persona Swap (Click Name Tag 5x)
        this.eggClickCount = 0;
        if (this.ui.nameTag) {
            this.ui.nameTag.style.userSelect = 'none';
            this.ui.nameTag.title = "Ernest (AI Tutor)"; // Default title, no hint about Earl

            this.ui.nameTag.addEventListener('click', () => {
                this.eggClickCount++;
                if (this.eggClickCount >= 5) {
                    this.switchPersona();
                    this.eggClickCount = 0; // Reset
                }

                // Reset count if idle for 2 seconds
                if (this.eggTimer) clearTimeout(this.eggTimer);
                this.eggTimer = setTimeout(() => { this.eggClickCount = 0; }, 2000);
            });
        }

        // Handle Enter Key
        this.ui.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserQuestion();
        });
    }

    createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'jrpg-ernest-tooltip';
        tooltip.innerHTML = `<img src="${this.characterImage}" id="jrpg-tooltip-face"> <span>Ask ${this.currentPersonaId === 'earl' ? 'Earl' : 'Ernest'}</span>`;
        tooltip.id = 'jrpg-ernest-tooltip';
        document.body.appendChild(tooltip);
        this.ui.tooltip = tooltip;
    }

    attachEventListeners() {
        // Text Selection Listener
        document.addEventListener('mouseup', (e) => this.handleSelection(e));

        // Hide tooltip on click interactions that aren't the tooltip itself
        document.addEventListener('mousedown', (e) => {
            if (e.target.id !== 'jrpg-ernest-tooltip' && !e.target.closest('#jrpg-ernest-tooltip')) {
                this.hideTooltip();
            }
        });

        // Tooltip Click
        this.ui.tooltip.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default
            e.stopPropagation(); // Stop bubbling

            this.hideTooltip();
            if (this.currentSelection) {
                this.askErnest(this.currentSelection, true);
            }
        });

        // Mobile/Touch Support
        this.ui.tooltip.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hideTooltip();
            if (this.currentSelection) {
                this.askErnest(this.currentSelection, true);
            }
        });


        // Start Page Easter Egg: Click Label 5x
        const startPageLabel = document.querySelector('.ernest-label');
        if (startPageLabel) {
            // Prevent text selection hijacking
            startPageLabel.style.userSelect = 'none';
            startPageLabel.style.webkitUserSelect = 'none';
            startPageLabel.style.cursor = 'pointer';

            let labelClicks = 0;
            let labelTimer = null;

            // Prevent selection start
            startPageLabel.addEventListener('mousedown', (e) => {
                e.preventDefault();
            });

            startPageLabel.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop bubble

                labelClicks++;

                // Subtle feedback
                startPageLabel.style.transform = 'scale(0.95)';
                setTimeout(() => startPageLabel.style.transform = 'scale(1)', 100);

                if (labelClicks >= 5) {
                    this.switchPersona();
                    labelClicks = 0;
                }

                if (labelTimer) clearTimeout(labelTimer);
                labelTimer = setTimeout(() => { labelClicks = 0; }, 2000);
            });
        }
    }

    showTooltip() {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Show tooltip if text is selected
            if (selectedText.length > 5 && !this.isThinking) { // Added minimum length and thinking check
                // Determine absolute position including scroll
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                // Position AT BOTTOM of selection (User Request)
                // Add 10px buffer
                this.ui.tooltip.style.top = `${rect.bottom + scrollTop + 10}px`;
                this.ui.tooltip.style.left = `${rect.left + scrollLeft + (rect.width / 2) - (this.ui.tooltip.offsetWidth / 2)}px`; // Centered
                this.ui.tooltip.style.display = 'flex'; // Use flex for image alignment

                // Save selection for button click
                this.currentSelection = selectedText;
            } else {
                this.ui.tooltip.style.display = 'none';
            }
        }
    }

    handleSelection() {
        // Debounce selection handling to avoid flickering while dragging
        if (this.selectionTimeout) clearTimeout(this.selectionTimeout);
        this.selectionTimeout = setTimeout(() => this.showTooltip(), 300);
    }

    stopTyping() {
        if (this.typeTimer) {
            clearTimeout(this.typeTimer);
            this.typeTimer = null;
        }
    }

    hideTooltip() {
        this.ui.tooltip.style.display = 'none';
    }

    addToChat(role, displayText, saveText = null) {
        if (!this.ui.chatHistory) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `jrpg-ernest-chat-message jrpg-ernest-message-${role}`;

        // Handle loading state
        if (displayText === '...') {
            // Use random hardware message instead of static text
            const loadingText = this.getLoadingMessage();
            msgDiv.innerHTML = `<span class="thinking-dots">${loadingText}</span>`;
            msgDiv.id = 'ernest-loading-msg';

            // Re-randomize text every 2 seconds if it takes too long
            this.loadingInterval = setInterval(() => {
                const loader = document.getElementById('ernest-loading-msg');
                if (loader) {
                    loader.innerHTML = `<span class="thinking-dots">${this.getLoadingMessage()}</span>`;
                } else {
                    clearInterval(this.loadingInterval);
                }
            }, 2000);

        } else {
            // Clear interval if it exists
            if (this.loadingInterval) clearInterval(this.loadingInterval);

            // Advanced Markdown Parsing
            let safeText = this.parseMarkdown(displayText);

            // Apply Typewriter effect for Ernest, instant for User
            if (role === 'ernest') {
                this.typeMessage(msgDiv, safeText);
            } else {
                msgDiv.innerHTML = safeText;
            }
        }

        this.ui.chatHistory.appendChild(msgDiv);

        // Always scroll to bottom for new message start
        this.ui.chatHistory.scrollTop = this.ui.chatHistory.scrollHeight;

        // Remember context
        if (displayText !== '...') {
            const contextContent = saveText || displayText;
            if (!this.conversationHistory) this.conversationHistory = [];
            this.conversationHistory.push({ role: role === 'user' ? 'user' : 'model', parts: [{ text: contextContent }] });
            // Keep history manageable (last 20 turns)
            if (this.conversationHistory.length > 20) this.conversationHistory.shift();
        }
    }

    parseMarkdown(text) {
        if (!text) return '';

        // 1. Initial Cleanup & Safety
        let html = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // 2. Math & Physics Symbol Parsing (Custom Heuristics for Ernest/Earl)
        // Greek Letters
        html = html.replace(/\\mu/g, 'μ')
            .replace(/\\alpha/g, 'α')
            .replace(/\\beta/g, 'β')
            .replace(/\\Delta/g, 'Δ')
            .replace(/\\theta/g, 'θ');

        // Subscripts (R_m -> Rm, Na^+ -> Na⁺)
        html = html.replace(/_([a-zA-Z0-9]+)/g, '<sub>$1</sub>'); // Simple subscript
        html = html.replace(/\^([\+0-9]+)/g, '<sup>$1</sup>');    // Simple superscript (charges)
        html = html.replace(/\^\{([^\}]+)\}/g, '<sup>$1</sup>'); // Complex superscript ^{...}
        html = html.replace(/_\{([^\}]+)\}/g, '<sub>$1</sub>');  // Complex subscript _{...}

        // Clean up LaTeX artifacts
        // 1. Text wrappers: \text{something} -> something
        html = html.replace(/\\text\{([^\}]+)\}/g, '$1');

        // 2. Fractions: \frac{a}{b} -> (a / b)
        // Simple case (no nested braces in numerator/denominator)
        html = html.replace(/\\frac\{([^\}]+)\}\{([^\}]+)\}/g, '($1 / $2)');

        // 3. Greek/Math Symbols (Extended)
        html = html.replace(/\\approx/g, '≈')
            .replace(/\\rightarrow/g, '→')
            .replace(/\\leftarrow/g, '←')
            .replace(/\\times/g, '×')
            .replace(/\\cdot/g, '·')
            .replace(/\\le/g, '≤')
            .replace(/\\ge/g, '≥');

        // 4. Brackets: \left( ... \right) -> ( ... )
        html = html.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')');
        html = html.replace(/\\left\[/g, '[').replace(/\\right\]/g, ']');

        // 5. Remove lingering $ signs
        html = html.replace(/\$/g, '');

        // 3. Table Parsing (Relaxed GFM Support)
        const lines = html.split('\n');
        let inTable = false;
        let tableHtml = '';
        let resultLines = [];

        // Helper: Check if line looks like a separator row (--- | --- | ---)
        const isSeparator = (str) => {
            // Support 2 or more columns (repetition of "content |")
            return str.trim().match(/^\|?([\s-:]+\|)+[\s-:]+\|?$/);
        };

        // Helper: Check if line is a table row (has pipe)
        const isTableRow = (str) => {
            return str.trim().includes('|');
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Detect start of table: Current line has pipe AND next line is separator
            const nextLine = lines[i + 1] ? lines[i + 1].trim() : '';

            if (!inTable && isTableRow(line) && isSeparator(nextLine)) {
                // Formatting Table Start
                inTable = true;
                tableHtml = '<div class="jrpg-table-wrapper"><table class="jrpg-table">';

                // Header Processing
                // handle optional outer pipes
                let cleanLine = line;
                if (cleanLine.startsWith('|')) cleanLine = cleanLine.substring(1);
                if (cleanLine.endsWith('|')) cleanLine = cleanLine.substring(0, cleanLine.length - 1);

                const headers = cleanLine.split('|').map(h => h.trim());
                tableHtml += '<thead><tr>';
                headers.forEach(h => tableHtml += `<th>${h}</th>`);
                tableHtml += '</tr></thead><tbody>';

                // Skip the separator line (i+1)
                i++;
            } else if (inTable) {
                if (isTableRow(line) && !isSeparator(line)) {
                    // Body Row
                    let cleanLine = line;
                    if (cleanLine.startsWith('|')) cleanLine = cleanLine.substring(1);
                    if (cleanLine.endsWith('|')) cleanLine = cleanLine.substring(0, cleanLine.length - 1);

                    const cells = cleanLine.split('|').map(c => c.trim());
                    tableHtml += '<tr>';
                    cells.forEach(c => tableHtml += `<td>${c}</td>`);
                    tableHtml += '</tr>';
                } else {
                    // End of table (non-row line)
                    inTable = false;
                    tableHtml += '</tbody></table></div>';
                    resultLines.push(tableHtml);
                    tableHtml = '';
                    resultLines.push(line);
                }
            } else {
                resultLines.push(line);
            }
        }

        // Close table if still open
        if (inTable) {
            tableHtml += '</tbody></table></div>';
            resultLines.push(tableHtml);
        }

        html = resultLines.join('\n');

        // 4. Standard Markdown Formatting
        html = html
            .replace(/### (.*?)(?:\n|$)/g, '<h3>$1</h3>')
            .replace(/## (.*?)(?:\n|$)/g, '<h4>$1</h4>') // Map ## to h4 for chat size
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');

        // 5. Lists & Newlines
        // Convert bullet points * or - at start of line
        html = html.replace(/^\s*[\*•-]\s+(.*)$/gm, '• $1');

        // Convert newlines to <br>, but NOT inside tables or after headers
        html = html.replace(/<\/h[34]>\n/g, '</h$1>'); // Remove newline after headers
        html = html.replace(/\n/g, '<br>');

        return html;
    }

    typeMessage(element, htmlContent) {
        // Clear any existing typing
        this.stopTyping();

        // Tokenize by tags to preserve structure speed, but type text chars
        // simpler approach: accumulate string and set innerHTML
        // To make it look like typing:
        // We can't just slice HTML string because we might slice inside a tag <str...

        // Better Tokenizer: Split into [Tags] and [Words]
        const tokens = htmlContent.split(/(<[^>]+>)/g).filter(t => t !== "");

        let qIndex = 0;
        let currentHTML = ""; // What is currently displayed
        const speed = 20; // Faster typing for better feel

        // Pre-calculate the steps
        // Step = { text: "...", isTag: boolean }
        const steps = [];
        tokens.forEach(t => {
            if (t.startsWith('<')) {
                steps.push({ text: t, isTag: true });
            } else {
                // Split words to type smoothly
                const words = t.split(/(\s+)/g).filter(w => w !== "");
                words.forEach(w => steps.push({ text: w, isTag: false }));
            }
        });

        const typeLoop = () => {
            if (qIndex >= steps.length) {
                this.typeTimer = null;
                return;
            }

            // SMART SCROLL V3 LOGIC
            const container = this.ui.chatHistory;
            let isAtBottom = false;
            if (container) {
                const distanceToBottom = container.scrollHeight - (container.scrollTop + container.clientHeight);
                isAtBottom = distanceToBottom < 30; // 30px tolerance
            }

            // Update Content
            const step = steps[qIndex];
            currentHTML += step.text;
            element.innerHTML = currentHTML;
            // Note: innerHTML auto-closes tags. This is fine visually for bolding.
            // "<strong>H" -> renders as bold H.
            // "<strong>Hello</strong>" -> renders as bold Hello.

            // Scroll if needed
            if (container && isAtBottom) {
                container.scrollTop = container.scrollHeight;
            }

            qIndex++;
            this.typeTimer = setTimeout(typeLoop, speed);
        };

        typeLoop();
    }

    // Call this in init()




    async explainVisiblePage() {
        // 1. Identify content container
        const modalBody = document.getElementById('modal-body');
        if (!modalBody) {
            alert("No active module content found for Ernest to read.");
            return;
        }

        // 2. Try to find specific active section if tabs are used
        // Look for sections with style.display = 'block' inside modal body
        const visibleSections = Array.from(modalBody.querySelectorAll('div[style*="block"]'));
        let targetElement = modalBody;

        // If we found a specific visible sub-section, use it (it's likely the tab content)
        // But exclude small elements, look for substantial content
        if (visibleSections.length > 0) {
            // Filter for sections that likely contain the main text
            const mainSection = visibleSections.find(el => el.innerText.length > 50);
            if (mainSection) targetElement = mainSection;
        }

        // 3. Get text content
        const pageText = targetElement.innerText;

        if (pageText.length < 10) {
            alert("This page seems empty to Ernest.");
            return;
        }

        // 4. Send to Ernest
        if (!this.apiKey) {
            this.ui.wrapper.classList.add('active');
            this.addToChat('ernest', "I need my API key to read this page. Please configure it.");
            return;
        }

        this.ui.wrapper.classList.add('active');

        // Construct context specifically for full page
        // "Explain this module"
        const contextWrapper = `[CONTEXT: The user is looking at the following module page you designed]: \n"${pageText}"\n\n[INSTRUCTION]: Provide a summary of this page's key concepts for a beginner, then ask if they have specific questions.`;

        // Clear history for this new "lesson"
        this.conversationHistory = [];
        this.ui.chatHistory.innerHTML = '';

        this.addToChat('user', `Please explain this page to me.`, contextWrapper);
        this.addToChat('ernest', '...');
        this.isThinking = true;

        try {
            const explanation = await this.callGeminiAPI(pageText); // The context wrapper is handled in the payload construction or askErnest? 
            // WAIT - askErnest logic handles the wrapping manually. I need to replicate that or adapt askErnest.
            // Let's just USE callGeminiAPI directly with the context wrapper injected into the "user" role.
            // Actually, better to reuse the payload logic.
            // Let's call a modified version of the logic.

            // Re-using fetchFromModel logic requires history to be set.
            // We set history above with addToChat + contextWrapper.

            // But addToChat pushes contextWrapper to history.
            // So calling callGeminiAPI("") (empty query) might work if history is set?
            // checking callGeminiAPI... it takes (query, model).
            // fetchFromModel uses query if history empty, or prepends system prompt to history[0].

            // IF I put the Page Text into history[0], fetchFromModel will pick it up!

            const response = await this.callGeminiAPI("Explain this page");
            this.removeLoadingMessage();
            this.addToChat('ernest', response);
        } catch (error) {
            this.removeLoadingMessage();
            this.addToChat('ernest', `System Error: ${error.message}`);
        }
        this.isThinking = false;
    }

    removeLoadingMessage() {
        const loader = document.getElementById('ernest-loading-msg');
        if (loader) loader.remove();
    }

    async handleUserQuestion() {
        console.log("Triggering User Question...");

        // Kill any previous typing
        this.stopTyping();
        this.isThinking = false; // Force reset state

        const text = this.ui.input.value.trim();
        if (!text) return;

        this.ui.input.value = ''; // Clear input
        this.addToChat('user', text);

        if (!this.apiKey) {
            this.addToChat('ernest', "My circuits require an API Key to function. Please configure it below.");
            return;
        }

        this.addToChat('ernest', '...');
        this.isThinking = true;

        try {
            const response = await this.callGeminiAPI(text);
            this.removeLoadingMessage();
            this.addToChat('ernest', response);
        } catch (error) {
            this.removeLoadingMessage();
            if (error.message.includes('not found') || error.message.includes('404')) {
                this.addToChat('ernest', this.currentPersonaId === 'earl' ? "Model missing. Finding backup..." : "Signal lost! Re-scanning...");
                const workingModel = await this.discoverWorkingModel();
                if (workingModel) {
                    const retryExp = await this.callGeminiAPI(text, workingModel);
                    this.addToChat('ernest', retryExp);
                    this.preferredModel = workingModel;
                    localStorage.setItem('ernest_preferred_model', workingModel);
                } else {
                    this.addToChat('ernest', `Error: ${error.message}`);
                }
            } else if (error.message.includes('503')) {
                this.addToChat('ernest', "Server overloaded. Please retry.");
            } else if (error.message.includes('Quota') || error.message.includes('429')) {
                this.addToChat('ernest', "Daily quota exceeded! My brain needs a cooldown. Please wait ~60s.");
            } else {
                this.addToChat('ernest', `Error: ${error.message}`);
            }
        }
        this.isThinking = false;
    }

    async askErnest(query) {
        // Kill any previous typing IMMEDIATELY
        this.stopTyping();

        if (!this.apiKey) {
            this.ui.wrapper.classList.add('active');
            this.addToChat('ernest', "Probing... No API Key detected. Please configure my systems.");
            return;
        }

        // New Interaction: Reset Context
        this.conversationHistory = [];
        this.ui.chatHistory.innerHTML = '';
        // this.ui.wrapper.classList.add('active'); // This is handled by toggleDialogue now

        if (!this.ui.wrapper.classList.contains('active')) {
            this.toggleDialogue(); // Auto-open
        }

        // Show user message (clean)
        if (isContext) {
            this.addToChat('user', `<em>"${query}"</em>`);
        } else {
            this.addToChat('user', query);
        }

        this.showLoadingMessage();

        this.isThinking = true;

        try {
            // If context, wrap it for the LLM so it knows not to roast the user
            const finalQuery = isContext ? `[APP_CONTEXT_SOURCE]: "${query}"\n(Instruction: This is text from the application validation logic. Analyze/Explain it. DO NOT ROAST THE USER for writing this, they selected it to ask about it.)` : query;

            const explanation = await this.callGeminiAPI(finalQuery);
            this.removeLoadingMessage();
            this.addToChat('ernest', explanation);
        } catch (error) {
            this.removeLoadingMessage();
            console.error("Gemini Error:", error);

            // 1. Network / Offline
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                this.addToChat('ernest', this.currentPersonaId === 'earl'
                    ? "Connection severed. Are you in a lead-lined room? Check your Wi-Fi."
                    : "Signal lost! I can't reach the cloud! Check your connection!");
            }
            // 2. Overloaded (503)
            else if (error.message.includes('503') || error.message.includes('overloaded')) {
                this.addToChat('ernest', this.currentPersonaId === 'earl'
                    ? "The server is currently overwhelmed by incompetence. Please wait a moment."
                    : "Brain freeze! Too much data! (Server overloaded, please try again in 5s).");
            }
            // 3. Quota Exceeded (429)
            else if (error.message.includes('Quota') || error.message.includes('429')) {
                this.addToChat('ernest', this.currentPersonaId === 'earl'
                    ? "You've exhausted my patience (and your API quota). Silence for 60 seconds."
                    : "Whoa! Too many questions! My neurons are overheating (Quota limit). Give me a minute!");
            }
            // 4. Model Not Found (404) -> Auto-Heal
            else if (error.message.includes('not found') || error.message.includes('404')) {
                const msg = this.currentPersonaId === 'earl'
                    ? "Standard model missing. Typical. Rerouting to backup processors..."
                    : "Main brain offline! Scanning frequencies for a new signal...";

                this.addToChat('ernest', msg);

                // Attempt to find ANY working model
                const workingModel = await this.discoverWorkingModel();

                if (workingModel) {
                    this.addToChat('ernest', `Found valid signal: ${workingModel}. Retrying...`);
                    // Actually, showDialogue is legacy. Use addToChat.
                    // this.addToChat('ernest', `Found: ${workingModel}. Retrying...`);

                    try {
                        const explanation = await this.callGeminiAPI(query, workingModel);
                        this.removeLoadingMessage();
                        this.addToChat('ernest', explanation);
                        // Save this model
                        this.preferredModel = workingModel;
                        localStorage.setItem('ernest_preferred_model', workingModel);
                    } catch (retryError) {
                        this.addToChat('ernest', this.currentPersonaId === 'earl'
                            ? `Even the backup (${workingModel}) is useless. Error: ${retryError.message}`
                            : `Backup signal (${workingModel}) failed too! Error: ${retryError.message}`);
                    }
                } else {
                    this.addToChat('ernest', "Critical failure: No working models found. Check API key settings.");
                }
            }
            else {
                this.addToChat('ernest', `System Error: ${error.message}`);
            }
        }

        this.isThinking = false;
    }

    switchPersona() {
        const newId = this.currentPersonaId === 'ernest' ? 'earl' : 'ernest';
        this.currentPersonaId = newId;
        const p = this.personas[newId];

        // 1. Update State
        this.characterImage = p.image;
        this.systemPrompt = p.prompt;
        this.themeColor = p.color;

        // 2. Update UI Elements
        this.ui.avatar.src = p.image;
        this.ui.nameTag.textContent = p.name;
        this.ui.floater.innerHTML = `<img src="${p.image}" alt="AI Companion">`;

        // 3. Update Theme
        this.applyTheme(p);

        // 4. Update Tooltip if exists
        if (this.ui.tooltip) {
            const face = this.ui.tooltip.querySelector('img');
            const text = this.ui.tooltip.querySelector('span');
            if (face) face.src = p.image;
            if (text) text.textContent = `Ask ${p.name.split(' ')[0]}`; // "Ask Ernest" or "Ask Earl"
        }

        // 5. Global Image Swap (Start Page)
        this.updateGlobalImages(p.image);

        // 6. Update Start Page Label
        const startLabel = document.querySelector('.ernest-label');
        if (startLabel) {
            startLabel.textContent = this.currentPersonaId.toUpperCase(); // "ERNEST" or "EARL"
            startLabel.style.backgroundColor = p.color; // Match theme
        }

        // 7. Update Start Page Description (Speech Bubble)
        const speechBubbleText = document.querySelector('.speech-bubble p, .lead-text');
        if (speechBubbleText && p.description) {
            speechBubbleText.textContent = p.description;
        }
    }

    getLoadingMessage() {
        if (this.currentPersonaId === 'earl') {
            const msgs = [
                "Judging your query...",
                "Sighing dramatically...",
                "Checking if you read the manual (doubtful)...",
                "Retrieving 'Common Sense' module...",
                "Scanning for incompetence..."
            ];
            return msgs[Math.floor(Math.random() * msgs.length)];
        } else {
            const msgs = [
                "Analyzing waveforms...",
                "Consulting Preston & Shapiro...",
                "Checking references...",
                "Filtering 60Hz noise...",
                "Calculating conduction velocity...",
                "Decreasing impedance..."
            ];
            return msgs[Math.floor(Math.random() * msgs.length)];
        }
    }

    toggleDialogue() {
        this.ui.wrapper.classList.toggle('active');
        // Hide floater when chat is open to avoid clutter, show when minimized
        if (this.ui.wrapper.classList.contains('active')) {
            this.ui.floater.style.display = 'none';
            this.ui.input.focus();
        } else {
            this.ui.floater.style.display = 'flex';
        }
    }

    updateGlobalImages(newSrc) {
        // Find triggers, banners, or any other image that looks like Ernest/Earl
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (img.src.includes('ERNEST.png') || img.src.includes('EARL.png')) {
                const oldFilename = img.src.split('/').pop();
                if (oldFilename === 'ERNEST.png' || oldFilename === 'EARL.png') {
                    img.src = newSrc;
                }
            }
        });
    }

    applyTheme(p) {
        if (!this.ui || !this.ui.dialogueBox) return;
        this.ui.dialogueBox.style.borderColor = p.color;
        this.ui.nameTag.style.background = p.color;
        this.ui.avatar.style.borderColor = p.color;
        this.ui.avatar.style.backgroundColor = p.bg;
    }

    resetApiKey() {
        localStorage.removeItem('ernest_api_key');
        location.reload();
    }

    promptApiKey() {
        console.log("promptApiKey triggered!");
        // Open the key generation page for them
        window.open('https://aistudio.google.com/app/apikey', '_blank');

        // Delay the prompt slightly to allow the tab to open/load without blocking immediately
        setTimeout(() => {
            let key = prompt("I've opened the key page for you!\n\n1. Sign in with Google\n2. Click 'Create API key'\n3. Paste it here:");

            if (key) {
                key = key.trim(); // Vital: Remove accidental spaces or newlines

                if (key.startsWith('AIza')) {
                    localStorage.setItem('ernest_api_key', key);
                    this.apiKey = key;
                    alert("Perfect! Ernest is now fully operational.");
                    if (this.ui.setupBtn) this.ui.setupBtn.remove();
                } else {
                    alert("That doesn't look like a valid key (should start with 'AIza'). Please try again.");
                }
            }
        }, 1000);
    }

    async discoverWorkingModel() {
        try {
            // List all models available to this key
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.models) {
                const names = data.models.map(m => m.name.replace('models/', ''));
                console.log('Available Models:', names);

                // Heuristic: Prefer known stable versions first
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

    async callGeminiAPI(query, modelOverride = null) {
        // Use override, or saved preference, or default
        const modelToUse = modelOverride || this.preferredModel || 'gemini-flash-latest';

        return await this.fetchFromModel(modelToUse, query);
    }

    async fetchFromModel(modelName, query) {
        // Use v1 stable endpoint now
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`;

        // Deep copy history to avoid mutating the UI source
        let apiContents = JSON.parse(JSON.stringify(this.conversationHistory));

        if (apiContents.length === 0) {
            // Fallback if history is empty (shouldn't happen via askErnest)
            apiContents = [{
                role: 'user',
                parts: [{ text: query }]
            }];
        }

        // Prepend System Prompt to the VERY FIRST message
        // This is the most robust way to ensure the model sees "Persona" + "Query" as one context unit
        if (apiContents[0].role === 'user') {
            apiContents[0].parts[0].text = `SYSTEM INSTRUCTIONS:\n${this.systemPrompt}\n\nUSER QUERY:\n${apiContents[0].parts[0].text}`;
        } else {
            // Edge case: if history started with model (unlikely), unshift a system message
            apiContents.unshift({
                role: 'user',
                parts: [{ text: `SYSTEM INSTRUCTIONS:\n${this.systemPrompt}` }]
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // Try to parse detailed error from Google
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
        console.log('Gemini API Response:', data); // Debug log

        // Check for safety blocks
        if (data.promptFeedback && data.promptFeedback.blockReason) {
            throw new Error(`Safety Block: ${data.promptFeedback.blockReason}`);
        }

        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                return candidate.content.parts[0].text;
            } else if (candidate.finishReason === 'STOP') {
                // STOP means natural completion, but if content is empty creator might have returned empty string
                return "End of response.";
            } else if (candidate.finishReason) {
                // Handle cases where content is empty but there's a reason (e.g. SAFETY, STOP, etc)
                throw new Error(`Response blocked. Reason: ${candidate.finishReason}`);
            }
        }

        throw new Error('No content returned from AI');
    }


}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ernest = new ErnestJRPG();
});
