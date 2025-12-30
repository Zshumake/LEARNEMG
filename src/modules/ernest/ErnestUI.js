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

    createUI(initialPersona) {
        // 1. Floating Avatar (Persistent)
        const floater = document.createElement('div');
        floater.className = 'jrpg-floating-avatar';
        floater.id = 'jrpg-floating-avatar';
        floater.title = "Open AI Companion";
        floater.innerHTML = `<img src="${initialPersona.image}" alt="AI Companion">`;
        floater.onclick = () => this.toggleDialogue();
        document.body.appendChild(floater);

        // Main Interaction Wrapper (Chat Window)
        const wrapper = document.createElement('div');
        wrapper.className = 'jrpg-ernest-wrapper';
        wrapper.id = 'jrpg-ernest-wrapper';
        wrapper.innerHTML = `
            <div class="jrpg-ernest-avatar-container">
                <img src="${initialPersona.image}" alt="Ernest" class="jrpg-ernest-avatar">
            </div>
            <div class="jrpg-ernest-dialogue-box">
                <div class="jrpg-ernest-name-tag">${initialPersona.name}</div>
                
                <div class="jrpg-ernest-chat-history" id="jrpg-ernest-chat-history"></div>

                <div class="jrpg-ernest-input-area">
                    <input type="text" class="jrpg-ernest-input" id="jrpg-ernest-input" placeholder="Input query...">
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
            avatar: wrapper.querySelector('.jrpg-ernest-avatar'),
            nameTag: wrapper.querySelector('.jrpg-ernest-name-tag'),
            dialogueBox: wrapper.querySelector('.jrpg-ernest-dialogue-box')
        };

        this.attachEventListeners();
        this.createTooltip(initialPersona);
        this.applyTheme(initialPersona);
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
                this.core.askErnest(this.currentSelection, true);
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
        this.selectionTimeout = setTimeout(() => this.showTooltip(), 300);
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
        this.ui.avatar.src = p.image;
        this.ui.avatar.style.borderColor = p.color;
        this.ui.avatar.style.backgroundColor = p.bg || '#f0fdf4';

        this.ui.floater.innerHTML = `<img src="${p.image}" alt="AI Companion">`;

        if (this.ui.tooltip) {
            const face = this.ui.tooltip.querySelector('img');
            const text = this.ui.tooltip.querySelector('span');
            if (face) face.src = p.image;
            if (text) text.textContent = `Ask ${p.name.split(' ')[0]}`;
        }
    }
}
