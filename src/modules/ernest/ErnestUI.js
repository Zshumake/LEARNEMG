import { ERNEST_STYLES } from './ErnestStyles.js?v=c8fbfb83';

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
        style.textContent = ERNEST_STYLES;

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
                    <input type="text" class="jrpg-ernest-input" id="jrpg-ernest-input" aria-label="Ask Ernest a question" placeholder="Ask me anything...">
                    <button class="jrpg-ernest-btn primary" id="jrpg-ernest-send">Send</button>

                    <button class="jrpg-ernest-btn" id="jrpg-ernest-close" title="Minimize">▼</button>
                    <button class="jrpg-ernest-btn" id="jrpg-ernest-reset" title="Change API Key">⚙️</button>
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
                <p>Ernest uses a Google Gemini API key. It's free, takes ~30 seconds to get, and is stored only in your browser's local storage.</p>
                <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" class="jrpg-ernest-modal-link" id="jrpg-ernest-apikey-link">
                    <span class="jrpg-ernest-modal-link-text">Get a free key from Google AI Studio</span>
                    <span class="jrpg-ernest-modal-link-arrow">&rarr;</span>
                </a>
                <input type="text" id="jrpg-ernest-apikey-input" aria-label="Gemini API key" placeholder="Paste your API key here (starts with AIza...)">
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

        // Easter Egg: Hidden Persona Swap (Click Name Tag 7x)
        if (this.ui.nameTag) {
            this.ui.nameTag.style.userSelect = 'none';
            this.ui.nameTag.addEventListener('click', () => {
                this.eggClickCount++;
                if (this.eggClickCount >= 7) {
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

        // Start Page Easter Egg logic moved to AppShell.js for better encapsulation
    }

    createTooltip(persona) {
        const tooltip = document.createElement('div');
        tooltip.className = 'jrpg-ernest-tooltip';
        tooltip.innerHTML = `${this._renderTooltipAvatar(persona)} <span class="jrpg-tooltip-text">Ask ${persona.name.split(' ')[0]}</span>`;
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
        this.ui.floater.innerHTML = this._buildFloaterSVG();

        if (this.ui.tooltip) {
            const oldAvatar = this.ui.tooltip.querySelector('.jrpg-tooltip-avatar');
            const text = this.ui.tooltip.querySelector('.jrpg-tooltip-text');
            if (oldAvatar) oldAvatar.outerHTML = this._renderTooltipAvatar(p);
            if (text) text.textContent = `Ask ${p.name.split(' ')[0]}`;
        }
        // Update the main chat window mascot
        const artContainer = this.ui.wrapper.querySelector('.jrpg-ernest-avatar-container');
        if (artContainer) {
            artContainer.innerHTML = this._buildErnestSVG();
        }
    }

    /** Returns a compact inline SVG avatar for the "Ask {persona}" tooltip. */
    _renderTooltipAvatar(persona) {
        const pId = (this.core && this.core.currentPersonaId)
            || (persona === this.core?.personas?.earl ? 'earl' : 'ernest');
        const color = persona.color || '#6b9f78';

        if (pId === 'earl') {
            // Grumpy red avatar — closed eyes, flat mouth
            return `<span class="jrpg-tooltip-avatar" aria-hidden="true" style="background:${color};">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10 L10 10" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M14 10 L18 10" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 16 L16 16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </span>`;
        }
        // Cheerful green Ernest — round eyes, smile, lightning accent
        return `<span class="jrpg-tooltip-avatar" aria-hidden="true" style="background:${color};">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="10" r="1.6" fill="white"/>
                <circle cx="15.5" cy="10" r="1.6" fill="white"/>
                <path d="M7.5 14 Q12 18 16.5 14" stroke="white" stroke-width="1.8" stroke-linecap="round" fill="none"/>
                <path d="M19 4 L17 8 L19 8 L17 12" stroke="#fde68a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
        </span>`;
    }

    /** Returns the full-body SVG for the chat panel. */
    _buildErnestSVG() {
        const pId = this.core ? this.core.currentPersonaId : 'ernest';

        if (pId === 'earl') {
            return `
            <svg id="earl-character" class="jrpg-ernest-full-svg earl-container awake" viewBox="0 0 500 550" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">${window.ErnestIcon.getEarlBody()}</svg>`;
        }

        return `
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMax meet" class="jrpg-ernest-full-svg at-ernest-container awake"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${window.ErnestIcon.getErnestBody(this.id + '-cel')}</svg>
`;
    }

    /** Returns the SVG content for the floating button using the central utility. */
    _buildFloaterSVG() {
        const pId = this.core ? this.core.currentPersonaId : 'ernest';
        if (window.ErnestIcon && typeof window.ErnestIcon.getSVGOnly === 'function') {
            return window.ErnestIcon.getSVGOnly(pId);
        }
        return '';
    }
}
