
import { themeManager } from './ThemeManager.js';
import { learningModulesConfig } from '../candyland/BoardData.js';
import logger from '../../utils/Logger.js';

export class ModalSystem {
    constructor() {
        this.activeModal = null;
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
            <div class="learning-modal-overlay active" id="enhanced-modal-${index}">
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
                        <button class="modal-close-btn" onclick="window.appComponents.modal.closeModal(${index})">Return to Journey</button>
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

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.activeModal = document.getElementById(`enhanced-modal-${index}`);
        window.isModalOpen = true; // Legacy flag

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
                            <button onclick="window.moduleLoader.launchApplication('${moduleId}')" 
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

        // Render content
        setTimeout(() => {
            contentArea.innerHTML = contentHTML;



            // Auto-Initialize if needed (legacy support)
            if (window.moduleLoader) {
                const loadedModule = window.moduleLoader.loadedModules.get(moduleId);
                if (loadedModule && typeof loadedModule.initialize === 'function') {
                    loadedModule.initialize();
                }
            }
        }, 500);
    }

    closeModal(index) {
        const modal = document.getElementById(`enhanced-modal-${index}`);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 400);
        }
        this.activeModal = null;
        window.isModalOpen = false;
    }


}
