export class ErnestUI {
    constructor(core) {
        this.core = core;
        this.ui = {};
        this.eggClickCount = 0;
        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('ernest-jrpg-styles')) return;

        const style = document.createElement('style');
        style.id = 'ernest-jrpg-styles';
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
                width: 280px;
                height: 350px; /* Make it as tall as the chat box so he can stand full body */
                flex-shrink: 0;
            }

            .jrpg-ernest-full-svg {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: contain;
                /* Anchor him to the bottom so his body shows */
                object-position: bottom left; 
                filter: drop-shadow(0 4px 15px rgba(0,0,0,0.2));
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
            .jrpg-ernest-message-earl {
                 align-self: flex-start;
                 background: #fef2f2;
                 color: #2c3e50;
                 border: 1px solid #fee2e2;
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
                display: none; /* Initially hidden */
                animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                border: 2px solid white;
                align-items: center;
                gap: 8px;
            }

            /* Prevent tooltip from showing on start page */
            body.on-start-page .jrpg-ernest-tooltip {
                display: none !important;
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
                width: 80px;
                height: 80px;
                min-width: 80px;
                min-height: 80px;
                flex-shrink: 0;
                border-radius: 50%;
                border: 2px solid #2a2d34;
                background: #6b9f78;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                z-index: 2147483646; /* Just below wrapper */
                cursor: pointer;
                transition: transform 0.2s, opacity 0.5s, visibility 0.5s;
                display: flex; /* Flex to center image */
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            /* Hidden state for start page */
            body.on-start-page .jrpg-floating-avatar {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
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

            /* Custom API Key Modal */
            .jrpg-ernest-modal-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(5px);
                z-index: 2147483648; /* Topmost */
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s;
            }
            .jrpg-ernest-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .jrpg-ernest-modal {
                background: white;
                border-radius: 15px;
                padding: 30px;
                width: 90%;
                max-width: 450px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border: 3px solid #6b9f78;
                transform: translateY(20px);
                transition: transform 0.3s;
            }
            .jrpg-ernest-modal-overlay.active .jrpg-ernest-modal {
                transform: translateY(0);
            }
            .jrpg-ernest-modal h3 {
                margin: 0 0 15px 0;
                color: #1e293b;
                font-family: 'Segoe UI', sans-serif;
            }
            .jrpg-ernest-modal p {
                margin: 0 0 20px 0;
                color: #64748b;
                font-size: 0.95em;
                line-height: 1.5;
            }
            .jrpg-ernest-modal input {
                width: 100%;
                padding: 12px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1em;
                margin-bottom: 20px;
                box-sizing: border-box;
                font-family: monospace;
            }
            .jrpg-ernest-modal input:focus {
                border-color: #6b9f78;
                outline: none;
            }
            .jrpg-ernest-modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
        `;
        document.head.appendChild(style);
    }

    createUI(initialPersona) {
        // 1. Floating Avatar (Persistent)
        const floater = document.createElement('div');
        floater.className = 'jrpg-floating-avatar';
        floater.id = 'jrpg-floating-avatar';
        floater.title = "Open AI Companion";
        floater.innerHTML = this._buildFloaterSVG();
        floater.onclick = () => this.toggleDialogue();
        document.body.appendChild(floater);

        // Main Interaction Wrapper (Chat Window)
        const wrapper = document.createElement('div');
        wrapper.className = 'jrpg-ernest-wrapper';
        wrapper.id = 'jrpg-ernest-wrapper';
        wrapper.innerHTML = `
            <div class="jrpg-ernest-avatar-container">
                ${this._buildErnestSVG()}
            </div>
            <div class="jrpg-ernest-dialogue-box">
                <div class="jrpg-ernest-name-tag">${initialPersona.name}</div>
                
                <div class="jrpg-ernest-chat-history" id="jrpg-ernest-chat-history"></div>

                <div class="jrpg-ernest-input-area">
                    <input type="text" class="jrpg-ernest-input" id="jrpg-ernest-input" placeholder="Ask me anything...">
                    <button class="jrpg-ernest-btn primary" id="jrpg-ernest-send">Send</button>

                    <button class="jrpg-ernest-btn" id="jrpg-ernest-close" title="Minimize">▼</button>
                    <button class="jrpg-ernest-btn" id="jrpg-ernest-reset" title="Reset API Key">⚙️</button>
                    ${!this.core.api.apiKey ? '<button class="jrpg-ernest-btn primary" id="jrpg-ernest-setup">Setup Key</button>' : ''}
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
            avatar: wrapper.querySelector('.jrpg-ernest-full-svg'),
            nameTag: wrapper.querySelector('.jrpg-ernest-name-tag'),
            dialogueBox: wrapper.querySelector('.jrpg-ernest-dialogue-box')
        };

        // API Key Modal HTML
        const apiModal = document.createElement('div');
        apiModal.className = 'jrpg-ernest-modal-overlay';
        apiModal.id = 'jrpg-ernest-apikey-overlay';
        apiModal.innerHTML = `
            <div class="jrpg-ernest-modal">
                <h3>Configure Ernest API Key</h3>
                <p>To use Ernest as your AI companion, please provide a Google Gemini API Key. It will be stored securely in your browser's local storage.</p>
                <input type="text" id="jrpg-ernest-apikey-input" placeholder="Paste your API key here (starts with AIza...)">
                <div class="jrpg-ernest-modal-actions">
                    <button class="jrpg-ernest-btn" id="jrpg-ernest-apikey-cancel">Cancel</button>
                    <button class="jrpg-ernest-btn primary" id="jrpg-ernest-apikey-save">Save Key</button>
                </div>
            </div>
        `;
        document.body.appendChild(apiModal);

        this.ui.apiModal = apiModal;
        this.ui.apiInput = document.getElementById('jrpg-ernest-apikey-input');
        this.ui.apiSaveBtn = document.getElementById('jrpg-ernest-apikey-save');
        this.ui.apiCancelBtn = document.getElementById('jrpg-ernest-apikey-cancel');

        this.attachEventListeners();
        this.createTooltip(initialPersona);
        this.applyTheme(initialPersona);
    }

    showApiKeyModal(onSubmitCallback) {
        this.ui.apiInput.value = '';
        this.ui.apiModal.classList.add('active');
        this.ui.apiInput.focus();

        const closeAndCleanup = () => {
            this.ui.apiModal.classList.remove('active');
            this.ui.apiSaveBtn.onclick = null;
            this.ui.apiCancelBtn.onclick = null;
        };

        this.ui.apiCancelBtn.onclick = () => {
            closeAndCleanup();
            if (onSubmitCallback) onSubmitCallback(null);
        };

        this.ui.apiSaveBtn.onclick = () => {
            const val = this.ui.apiInput.value.trim();
            closeAndCleanup();
            if (onSubmitCallback) onSubmitCallback(val);
        };

        // Allow Enter key to save
        this.ui.apiInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.ui.apiSaveBtn.click();
            }
        };
    }

    attachEventListeners() {
        if (this.ui.resetBtn) {
            this.ui.resetBtn.addEventListener('click', () => this.core.resetApiKey());
        }

        this.ui.wrapper.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'jrpg-ernest-setup') {
                this.core.promptApiKey();
            }
        });

        this.ui.closeBtn.addEventListener('click', () => this.toggleDialogue());

        if (this.ui.sendBtn) {
            this.ui.sendBtn.addEventListener('click', () => this.core.handleUserQuestion(this.ui.input.value));
        }

        // Easter Egg: Hidden Persona Swap (Click Name Tag 5x)
        if (this.ui.nameTag) {
            this.ui.nameTag.style.userSelect = 'none';
            this.ui.nameTag.addEventListener('click', () => {
                this.eggClickCount++;
                if (this.eggClickCount >= 5) {
                    this.core.switchPersona();
                    this.eggClickCount = 0;
                }
                if (this.eggTimer) clearTimeout(this.eggTimer);
                this.eggTimer = setTimeout(() => { this.eggClickCount = 0; }, 2000);
            });
        }

        this.ui.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.core.handleUserQuestion(this.ui.input.value);
        });

        // Global Event Listeners for Tooltips
        document.addEventListener('mouseup', (e) => this.handleSelection(e));
        document.addEventListener('touchend', (e) => this.handleSelection(e));
        document.addEventListener('mousedown', (e) => {
            if (e.target.id !== 'jrpg-ernest-tooltip' && !e.target.closest('#jrpg-ernest-tooltip')) {
                this.hideTooltip();
            }
        });

        // Start Page Easter Egg (Static LP Name Tag)
        const startPageLabel = document.querySelector('.ernest-label');
        if (startPageLabel) {
            let startPageEggCount = 0;
            let startPageEggTimer;
            startPageLabel.style.cursor = 'pointer';
            startPageLabel.title = "???";
            startPageLabel.addEventListener('click', () => {
                startPageEggCount++;
                if (startPageEggCount >= 5) {
                    this.core.switchPersona();
                    startPageEggCount = 0;
                }
                if (startPageEggTimer) clearTimeout(startPageEggTimer);
                startPageEggTimer = setTimeout(() => { startPageEggCount = 0; }, 2000);
            });
        }
    }

    createTooltip(persona) {
        const tooltip = document.createElement('div');
        tooltip.className = 'jrpg-ernest-tooltip';
        tooltip.innerHTML = `<img src="${persona.image}" id="jrpg-tooltip-face"> <span>Ask ${persona.name.split(' ')[0]}</span>`;
        tooltip.id = 'jrpg-ernest-tooltip';
        document.body.appendChild(tooltip);
        this.ui.tooltip = tooltip;

        this.ui.tooltip.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hideTooltip();
            if (this.currentSelection) {
                this.core.handleSelectionExplanation(this.currentSelection);
            }
        });

        this.ui.tooltip.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.hideTooltip();
            if (this.currentSelection) {
                this.core.askErnest(this.currentSelection, true);
            }
        });
    }

    showTooltip() {
        if (!this.ui.tooltip) return;

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            if (selectedText.length > 5 && !this.core.isThinking) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                this.ui.tooltip.style.top = `${rect.bottom + scrollTop + 10}px`;
                this.ui.tooltip.style.left = `${rect.left + scrollLeft + (rect.width / 2) - (this.ui.tooltip.offsetWidth / 2)}px`;
                this.ui.tooltip.style.display = 'flex';
                this.currentSelection = selectedText;
            } else {
                this.ui.tooltip.style.display = 'none';
            }
        }
    }

    handleSelection() {
        if (this.selectionTimeout) clearTimeout(this.selectionTimeout);
        this.selectionTimeout = setTimeout(() => {
            this.showTooltip();

            // Auto-populate input if chat is already open
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            if (selectedText.length > 5 && this.ui.wrapper.classList.contains('active')) {
                if (this.ui.input) {
                    this.ui.input.value = `Can you explain: "${selectedText}"?`;
                }
            }
        }, 300);
    }

    hideTooltip() {
        if (this.ui.tooltip) this.ui.tooltip.style.display = 'none';
    }

    toggleDialogue() {
        this.ui.wrapper.classList.toggle('active');
        if (this.ui.wrapper.classList.contains('active')) {
            this.ui.floater.style.display = 'none';
            this.ui.input.focus();
        } else {
            this.ui.floater.style.display = 'flex';
        }
    }

    applyTheme(p) {
        if (!this.ui || !this.ui.dialogueBox) return;
        this.ui.dialogueBox.style.borderColor = p.color;
        this.ui.nameTag.style.background = p.color;
        this.ui.nameTag.textContent = p.name;

        // Restore SVG-based theme application
        this.ui.floater.innerHTML = this._buildFloaterSVG(p);

        if (this.ui.tooltip) {
            const face = this.ui.tooltip.querySelector('img');
            const text = this.ui.tooltip.querySelector('span');
            if (face) face.src = p.image;
            if (text) text.textContent = `Ask ${p.name.split(' ')[0]}`;
        }
    }

    /** Returns the full-body Ernest SVG for the chat panel. */
    _buildErnestSVG() {
        return `
        <svg viewBox="0 0 500 500" class="jrpg-ernest-full-svg at-ernest-container awake"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <style>
                    .ernest-outline { stroke: #2a2d34; stroke-width: 7; stroke-linejoin: round; stroke-linecap: round; }
                    .ernest-thick-outline { stroke: #2a2d34; stroke-width: 9; stroke-linejoin: round; stroke-linecap: round; }
                    .ernest-text-cyan { fill: #88dded; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                    .ernest-text-white { fill: #ffffff; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                    .ernest-shading { fill: rgba(0, 0, 0, 0.15); mix-blend-mode: multiply; }
                    .ernest-highlight { fill: rgba(255, 255, 255, 0.2); mix-blend-mode: screen; }
                </style>
                <filter id="${this.id}-cel">
                    <feOffset dx="12" dy="0" in="SourceAlpha" result="hl-offset"/>
                    <feComposite operator="out" in="SourceAlpha" in2="hl-offset" result="hl-crescent"/>
                    <feFlood flood-color="#ffffff" flood-opacity="0.35" result="hl-color"/>
                    <feComposite operator="in" in="hl-color" in2="hl-crescent" result="highlight"/>

                    <feOffset dx="-12" dy="-12" in="SourceAlpha" result="sh-offset"/>
                    <feComposite operator="out" in="SourceAlpha" in2="sh-offset" result="sh-crescent"/>
                    <feFlood flood-color="#000000" flood-opacity="0.3" result="sh-color"/>
                    <feComposite operator="in" in="sh-color" in2="sh-crescent" result="shadow"/>

                    <feMerge result="shading">
                        <feMergeNode in="shadow"/>
                        <feMergeNode in="highlight"/>
                    </feMerge>
                    <feMerge>
                        <feMergeNode in="SourceGraphic"/>
                        <feMergeNode in="shading"/>
                    </feMerge>
                </filter>
            </defs>
            <g transform="translate(45, 10)">
                <!-- Back left prong -->
                <rect x="145" y="45" width="22" height="90" fill="#b0b5ba" class="ernest-outline"/>
                <rect x="160" y="45" width="7" height="90" class="ernest-shading"/>
                <path d="M 140 105 L 172 105 L 172 120 L 140 120 Z" fill="#666" class="ernest-outline"/>
                <circle cx="156" cy="45" r="11" fill="#b0b5ba" class="ernest-outline"/>
                
                <!-- Back right prong -->
                <rect x="255" y="45" width="22" height="90" fill="#b0b5ba" class="ernest-outline"/>
                <rect x="270" y="45" width="7" height="90" class="ernest-shading"/>
                <path d="M 250 105 L 282 105 L 282 120 L 250 120 Z" fill="#666" class="ernest-outline"/>
                <circle cx="266" cy="45" r="11" fill="#b0b5ba" class="ernest-outline"/>

                <g>
                    <!-- Body Fill (with perfect inset cel-shading filter) -->
                    <path d="
                        M 100 130 
                        C 80 130 70 145 70 160 
                        L 70 200 
                        C 70 230 140 250 140 280 
                        L 140 450
                        C 140 500 280 500 280 450
                        L 280 280 
                        C 280 250 350 230 350 200 
                        L 350 160 
                        C 350 145 340 130 320 130 
                        Z" fill="#55595f" filter="url(#${this.id}-cel)"/>
                    
                    <!-- Left Side Nub (Behind Outline) -->
                    <path d="M 70 165 L 60 165 L 60 195 L 70 195 Z" fill="#606469" class="ernest-outline"/>
                    
                    <!-- Top Screen Panel Fill -->
                    <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                        fill="#80858b" filter="url(#${this.id}-cel)"/>
                        
                    <!-- Bottom Dark Cap Fill -->
                    <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                        fill="#606469" filter="url(#${this.id}-cel)"/>

                    <!-- OUTLINES -->
                    <!-- Main Body Outline -->
                    <path d="M 100 130 C 80 130 70 145 70 160 L 70 200 C 70 230 140 250 140 280 L 140 450 C 140 500 280 500 280 450 L 280 280 C 280 250 350 230 350 200 L 350 160 C 350 145 340 130 320 130 Z" 
                        fill="none" class="ernest-thick-outline"/>

                    <!-- Top Panel Outline -->
                    <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                        fill="none" class="ernest-outline"/>

                    <!-- Bottom Cap Outline -->
                    <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                        fill="none" class="ernest-outline"/>
                </g>

                <!-- Inner Dark Screen Panel -->
                <path d="M 125 145 L 295 145 C 315 145 325 152 325 165 L 325 180 C 325 205 260 220 210 220 C 160 220 95 205 95 180 L 95 165 C 95 152 105 145 125 145 Z" fill="#2a2d34" class="ernest-outline"/>

                <!-- Front Elements on Top Screen Panel -->
                <!-- '-3' elements -->
                <rect x="110" y="160" width="16" height="8" rx="4" fill="#1e1f24" class="ernest-outline"/>
                <text x="135" y="172" class="ernest-text-white" font-size="28">3</text>

                <!-- '+/-' elements -->
                <text x="235" y="170" class="ernest-text-white" font-size="20">+/-</text>
                <circle cx="278" cy="162" r="7" class="ernest-outline ernest-led" fill="#00ff4c"/>
                <ellipse cx="278" cy="160" rx="3" ry="1.5" fill="#fff" opacity="0.6"/> <!-- LED glare -->

                <!-- STIM Text -->
                <text x="210" y="212" class="ernest-text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STIM</text>

                <!-- STORE 1 2 Text -->
                <text x="210" y="375" class="ernest-text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STORE</text>
                <text x="210" y="405" class="ernest-text-cyan" font-size="24" text-anchor="middle">1</text>
                <text x="210" y="435" class="ernest-text-cyan" font-size="24" text-anchor="middle">2</text>
                
                <!-- Bottom Logo Symbol -->
                <circle cx="210" cy="465" r="18" fill="none" class="ernest-outline"/>
                <path d="M 190 465 L 202 465 L 206 452 L 214 478 L 218 465 L 230 465" fill="none" stroke="#2a2d34" stroke-width="5" stroke-linejoin="round"/>

                <!-- THE FACE -->
                <g id="cartoon-face">
                    <!-- Eyebrows (Tilted medial up for happier expression) -->
                    <g class="ernest-eyebrow">
                        <path d="M 165 260 Q 180 245 195 250" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        <path d="M 255 260 Q 240 245 225 250" fill="none" class="ernest-outline" stroke-linecap="round"/>
                    </g>
                    
                    <!-- Eyes -->
                    <g class="ernest-eyes">
                        <g class="ernest-eyes-open">
                            <ellipse cx="180" cy="285" rx="12" ry="18" fill="#1e1f24"/>
                            <circle cx="183" cy="278" r="4" fill="#ffffff"/> <!-- Shine point -->
                            
                            <ellipse cx="240" cy="285" rx="12" ry="18" fill="#1e1f24"/>
                            <circle cx="243" cy="278" r="4" fill="#ffffff"/> <!-- Shine point -->
                        </g>
                        <g class="ernest-eyes-closed">
                            <path d="M 168 285 Q 180 295 192 285" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 228 285 Q 240 295 252 285" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                    </g>

                    <!-- Nose -->
                    <rect x="203" y="283" width="14" height="24" rx="7" fill="#606469" class="ernest-outline"/>
                    <line x1="205" y1="289" x2="215" y2="289" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                    <line x1="205" y1="295" x2="215" y2="295" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                    <line x1="205" y1="301" x2="215" y2="301" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>

                    <!-- Mouth Group -->
                    <g class="ernest-mouth-container">
                        <!-- Open Mouth -->
                        <g class="ernest-mouth-open" transform="translate(78.5, 108.75) scale(0.65)">
                            <defs>
                                <clipPath id="mouth-cut">
                                    <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z"/>
                                </clipPath>
                            </defs>
                            <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z" fill="#141517" class="ernest-outline" stroke-linejoin="round"/>
                            <path d="M 185 340 Q 210 315 235 340 C 235 365 185 365 185 340 Z" fill="#ff7675" stroke="#2a2d34" stroke-width="2" clip-path="url(#mouth-cut)"/>
                            
                            <path d="M 168 310 Q 172 312 175 315" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 252 310 Q 248 312 245 315" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                        
                        <!-- Closed Mouth -->
                        <g class="ernest-mouth-closed" transform="translate(78.5, 108.75) scale(0.65)">
                            <path d="M 180 320 Q 210 335 240 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 173 315 Q 178 317 180 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 247 315 Q 242 317 240 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                    </g>
                </g>

                <!-- Cartoon Action Lines -->
                <path class="ernest-zap-line" d="M 155 10 L 140 -20 L 160 -35 L 145 -60" fill="none" stroke="#88dded" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="ernest-zap-line" d="M 265 10 L 280 -20 L 260 -35 L 275 -60" fill="none" stroke="#88dded" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
</svg>
`;
    }

    /** Returns a mini full-body version of Ernest for the floating button. */
    _buildFloaterSVG(persona = null) {
        const id = `floater-ernest-${Math.random().toString(36).substr(2, 5)}`;
        // If persona provided, use its color, else default
        const accent = persona ? persona.color : '#6b9f78';

        return `<svg viewBox="75 40 340 340" preserveAspectRatio="xMidYMid meet" class="mini-ernest-svg at-ernest-container awake"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 100%; height: 100%; display: block;">
            <defs>
                <style>
                    .ernest-outline { stroke: #2a2d34; stroke-width: 7; stroke-linejoin: round; stroke-linecap: round; }
                    .ernest-thick-outline { stroke: #2a2d34; stroke-width: 9; stroke-linejoin: round; stroke-linecap: round; }
                    .ernest-text-cyan { fill: ${accent}; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                    .ernest-text-white { fill: #ffffff; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                    .ernest-shading { fill: rgba(0, 0, 0, 0.15); mix-blend-mode: multiply; }
                    .ernest-highlight { fill: rgba(255, 255, 255, 0.2); mix-blend-mode: screen; }
                </style>
                <filter id="${id}-cel">
                    <feOffset dx="12" dy="0" in="SourceAlpha" result="hl-offset"/>
                    <feComposite operator="out" in="SourceAlpha" in2="hl-offset" result="hl-crescent"/>
                    <feFlood flood-color="#ffffff" flood-opacity="0.35" result="hl-color"/>
                    <feComposite operator="in" in="hl-color" in2="hl-crescent" result="highlight"/>

                    <feOffset dx="-12" dy="-12" in="SourceAlpha" result="sh-offset"/>
                    <feComposite operator="out" in="SourceAlpha" in2="sh-offset" result="sh-crescent"/>
                    <feFlood flood-color="#000000" flood-opacity="0.3" result="sh-color"/>
                    <feComposite operator="in" in="sh-color" in2="sh-crescent" result="shadow"/>

                    <feMerge result="shading">
                        <feMergeNode in="shadow"/>
                        <feMergeNode in="highlight"/>
                    </feMerge>
                    <feMerge>
                        <feMergeNode in="SourceGraphic"/>
                        <feMergeNode in="shading"/>
                    </feMerge>
                </filter>
            </defs>
            <g transform="translate(45, 10)">
                <!-- Back left prong -->
                <rect x="145" y="45" width="22" height="90" fill="#b0b5ba" class="ernest-outline"/>
                <rect x="160" y="45" width="7" height="90" class="ernest-shading"/>
                <path d="M 140 105 L 172 105 L 172 120 L 140 120 Z" fill="#666" class="ernest-outline"/>
                <circle cx="156" cy="45" r="11" fill="#b0b5ba" class="ernest-outline"/>
                
                <!-- Back right prong -->
                <rect x="255" y="45" width="22" height="90" fill="#b0b5ba" class="ernest-outline"/>
                <rect x="270" y="45" width="7" height="90" class="ernest-shading"/>
                <path d="M 250 105 L 282 105 L 282 120 L 250 120 Z" fill="#666" class="ernest-outline"/>
                <circle cx="266" cy="45" r="11" fill="#b0b5ba" class="ernest-outline"/>

                <g>
                    <!-- Body Fill (with perfect inset cel-shading filter) -->
                    <path d="
                        M 100 130 
                        C 80 130 70 145 70 160 
                        L 70 200 
                        C 70 230 140 250 140 280 
                        L 140 450
                        C 140 500 280 500 280 450
                        L 280 280 
                        C 280 250 350 230 350 200 
                        L 350 160 
                        C 350 145 340 130 320 130 
                        Z" fill="#55595f" filter="url(#${id}-cel)"/>
                    
                    <!-- Left Side Nub (Behind Outline) -->
                    <path d="M 70 165 L 60 165 L 60 195 L 70 195 Z" fill="#606469" class="ernest-outline"/>
                    
                    <!-- Top Screen Panel Fill -->
                    <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                        fill="#80858b" filter="url(#${id}-cel)"/>
                        
                    <!-- Bottom Dark Cap Fill -->
                    <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                        fill="#606469" filter="url(#${id}-cel)"/>

                    <!-- OUTLINES -->
                    <!-- Main Body Outline -->
                    <path d="M 100 130 C 80 130 70 145 70 160 L 70 200 C 70 230 140 250 140 280 L 140 450 C 140 500 280 500 280 450 L 280 280 C 280 250 350 230 350 200 L 350 160 C 350 145 340 130 320 130 Z" 
                        fill="none" class="ernest-thick-outline"/>

                    <!-- Top Panel Outline -->
                    <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                        fill="none" class="ernest-outline"/>

                    <!-- Bottom Cap Outline -->
                    <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                        fill="none" class="ernest-outline"/>
                </g>

                <!-- Inner Dark Screen Panel -->
                <path d="M 125 145 L 295 145 C 315 145 325 152 325 165 L 325 180 C 325 205 260 220 210 220 C 160 220 95 205 95 180 L 95 165 C 95 152 105 145 125 145 Z" fill="#2a2d34" class="ernest-outline"/>

                <!-- Front Elements on Top Screen Panel -->
                <!-- '-3' elements -->
                <rect x="110" y="160" width="16" height="8" rx="4" fill="#1e1f24" class="ernest-outline"/>
                <text x="135" y="172" class="ernest-text-white" font-size="28">3</text>

                <!-- '+/-' elements -->
                <text x="235" y="170" class="ernest-text-white" font-size="20">+/-</text>
                <circle cx="278" cy="162" r="7" class="ernest-outline ernest-led" fill="#00ff4c"/>
                <ellipse cx="278" cy="160" rx="3" ry="1.5" fill="#fff" opacity="0.6"/> <!-- LED glare -->

                <!-- STIM Text -->
                <text x="210" y="212" class="ernest-text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STIM</text>

                <!-- STORE 1 2 Text -->
                <text x="210" y="375" class="ernest-text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STORE</text>
                <text x="210" y="405" class="ernest-text-cyan" font-size="24" text-anchor="middle">1</text>
                <text x="210" y="435" class="ernest-text-cyan" font-size="24" text-anchor="middle">2</text>
                
                <!-- Bottom Logo Symbol -->
                <circle cx="210" cy="465" r="18" fill="none" class="ernest-outline"/>
                <path d="M 190 465 L 202 465 L 206 452 L 214 478 L 218 465 L 230 465" fill="none" stroke="#2a2d34" stroke-width="5" stroke-linejoin="round"/>

                <!-- THE FACE -->
                <g id="cartoon-face">
                    <!-- Eyebrows (Tilted medial up for happier expression) -->
                    <g class="ernest-eyebrow">
                        <path d="M 165 260 Q 180 245 195 250" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        <path d="M 255 260 Q 240 245 225 250" fill="none" class="ernest-outline" stroke-linecap="round"/>
                    </g>
                    
                    <!-- Eyes -->
                    <g class="ernest-eyes">
                        <g class="ernest-eyes-open">
                            <ellipse cx="180" cy="285" rx="12" ry="18" fill="#1e1f24"/>
                            <circle cx="183" cy="278" r="4" fill="#ffffff"/> <!-- Shine point -->
                            
                            <ellipse cx="240" cy="285" rx="12" ry="18" fill="#1e1f24"/>
                            <circle cx="243" cy="278" r="4" fill="#ffffff"/> <!-- Shine point -->
                        </g>
                        <g class="ernest-eyes-closed">
                            <path d="M 168 285 Q 180 295 192 285" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 228 285 Q 240 295 252 285" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                    </g>

                    <!-- Nose -->
                    <rect x="203" y="283" width="14" height="24" rx="7" fill="#606469" class="ernest-outline"/>
                    <line x1="205" y1="289" x2="215" y2="289" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                    <line x1="205" y1="295" x2="215" y2="295" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                    <line x1="205" y1="301" x2="215" y2="301" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>

                    <!-- Mouth Group -->
                    <g class="ernest-mouth-container">
                        <!-- Open Mouth -->
                        <g class="ernest-mouth-open" transform="translate(78.5, 108.75) scale(0.65)">
                            <defs>
                                <clipPath id="mouth-cut">
                                    <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z"/>
                                </clipPath>
                            </defs>
                            <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z" fill="#141517" class="ernest-outline" stroke-linejoin="round"/>
                            <path d="M 185 340 Q 210 315 235 340 C 235 365 185 365 185 340 Z" fill="#ff7675" stroke="#2a2d34" stroke-width="2" clip-path="url(#mouth-cut)"/>
                            
                            <path d="M 168 310 Q 172 312 175 315" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 252 310 Q 248 312 245 315" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                        
                        <!-- Closed Mouth -->
                        <g class="ernest-mouth-closed" transform="translate(78.5, 108.75) scale(0.65)">
                            <path d="M 180 320 Q 210 335 240 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 173 315 Q 178 317 180 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 247 315 Q 242 317 240 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                    </g>
                </g>

                <!-- Cartoon Action Lines -->
                <path class="ernest-zap-line" d="M 155 10 L 140 -20 L 160 -35 L 145 -60" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="ernest-zap-line" d="M 265 10 L 280 -20 L 260 -35 L 275 -60" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
</svg>`;
    }
}
