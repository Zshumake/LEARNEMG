
import { themeManager } from './ThemeManager.js';
import { learningModulesConfig } from '../candyland/BoardData.js';
import logger from '../../utils/Logger.js';
import { registerAction } from '../../utils/ActionBus.js';

export class ModalSystem {
    constructor() {
        this.activeModal = null;
        // Learning-modal buttons go through the ActionBus (were inline onclick).
        registerAction('closeLearningModal', (el) =>
            window.appComponents?.modal?.closeModal(parseInt(el.dataset.index, 10)));
        registerAction('launchApp', (el) =>
            window.moduleLoader?.launchApplication(el.dataset.moduleId));
    }

    /**
     * Shows the enhanced learning modal for a given module.
     * @param {Object} module - The module object.
     * @param {number} index - The module index.
     * @param {string} pgyLevel - Current PGY Level.
     */
    async showLearningModal(module, index, pgyLevel = 'pgy2') {
        const totalModules = learningModulesConfig[pgyLevel]?.length || 10;
        const terrain = themeManager.getTerrainTheme(index, totalModules);

        const modalHTML = `
            <div class="learning-modal-overlay active" id="enhanced-modal-${index}" role="dialog" aria-modal="true" aria-label="${(module.title || 'Learning module').replace(/"/g, '&quot;')}" tabindex="-1">
                <div class="learning-modal" data-terrain="${terrain.theme}">
                    <!-- Journey Context Bar -->
                    <div class="journey-context-bar">
                        <div class="journey-breadcrumb">
                            <span>${terrain.decoration} ${terrain.theme}</span>
                            <span class="breadcrumb-separator">→</span>
                            <span>Module ${index + 1} of ${totalModules}</span>
                            <span class="breadcrumb-separator">→</span>
                            <span>${pgyLevel.toUpperCase()}</span>
                        </div>
                        <button class="modal-close-btn" data-action="closeLearningModal" data-index="${index}">Return to Journey</button>
                    </div>

                    <!-- Learning Content Area -->
                    <div class="learning-content-area" id="enhanced-content-${index}">
                        <div class="content-header">
                            <div class="content-icon">${module.customIcon ? `<img src="${module.customIcon}" style="width:64px;height:64px;">` : '📚'}</div>
                            <h2 class="content-title">${module.title}</h2>
                            <div class="content-competency">${module.competency || 'Medical Knowledge'}</div>
                            <p class="content-description">${module.description || ''}</p>
                        </div>

                        <div class="content-loading">
                            <div class="loading-spinner"></div>
                            <p>Loading interactive learning content...</p>
                        </div>
                    </div>



                </div>
            </div>
        `;

        // Remove existing modal if any
        if (this.activeModal) {
            this.activeModal.remove();
        }

        this._lastFocus = document.activeElement; // remember the trigger for focus return
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.activeModal = document.getElementById(`enhanced-modal-${index}`);
        this._setupModalA11y(this.activeModal, index);

        // Load Content
        await this.loadModuleContent(module, index);
    }

    async loadModuleContent(module, index) {
        const contentArea = document.getElementById(`enhanced-content-${index}`);
        if (!contentArea) return;

        const moduleId = module.id;
        let contentHTML = '';

        try {
            if (window.moduleLoader) {
                const loadedModule = await window.moduleLoader.loadModule(moduleId);
                // Support both generateContent and direct render
                if (loadedModule && typeof loadedModule.generateContent === 'function') {
                    contentHTML = loadedModule.generateContent(module);
                } else if (loadedModule && loadedModule.type === 'application') {
                    // Applications usually handle their own rendering or redirect
                    // For the modal, we might want to show a "Launch" button
                    contentHTML = `
                        <div style="text-align:center; padding: 40px;">
                            <h3>Interactive Application</h3>
                            <button data-action="launchApp" data-module-id="${moduleId}"
                                style="padding: 15px 30px; font-size: 1.2em; background: #4f46e5; color: white; border-radius: 8px; border: none; cursor: pointer;">
                                Launch ${module.title}
                            </button>
                        </div>
                     `;
                }
            }
        } catch (e) {
            logger.error("Error loading module:", e);
            contentHTML = `<div class="error-msg">Error loading content: ${e.message}</div>`;
        }

        // Render content immediately — it's already in hand. (Was a flat 500ms
        // setTimeout that added half a second of artificial latency to every
        // module open.)
        contentArea.innerHTML = contentHTML;

        // Auto-Initialize if needed (legacy support)
        if (window.moduleLoader) {
            const loadedModule = window.moduleLoader.loadedModules.get(moduleId);
            if (loadedModule && typeof loadedModule.initialize === 'function') {
                loadedModule.initialize();
            }
        }
    }

    _setupModalA11y(modal, index) {
        // Move focus into the dialog (close button = first sensible target).
        const closeBtn = modal.querySelector('.modal-close-btn');
        (closeBtn || modal).focus();
        // Trap Tab within the dialog and close on Escape.
        this._modalKeyHandler = (e) => {
            if (e.key === 'Escape') { e.preventDefault(); this.closeModal(index); return; }
            if (e.key !== 'Tab') return;
            const f = modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])');
            if (!f.length) return;
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        };
        modal.addEventListener('keydown', this._modalKeyHandler);
    }

    closeModal(index) {
        const modal = document.getElementById(`enhanced-modal-${index}`);
        if (modal) {
            if (this._modalKeyHandler) {
                modal.removeEventListener('keydown', this._modalKeyHandler);
                this._modalKeyHandler = null;
            }
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 400);
        }
        this.activeModal = null;
        // Return focus to whatever opened the modal (keyboard users land back on the tile).
        if (this._lastFocus && typeof this._lastFocus.focus === 'function') {
            this._lastFocus.focus();
            this._lastFocus = null;
        }
    }


}
