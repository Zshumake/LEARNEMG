
import { themeManager } from './ThemeManager.js';
import { LEARNING_MODULES_CONFIG } from '../../data/ModuleConfig.js';

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
        const totalModules = LEARNING_MODULES_CONFIG[pgyLevel]?.length || 10;
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

                    <!-- ERNEST Helper -->
                    <div class="modal-ernest-guide" onclick="console.log('Ernest clicked')">
                        <div class="ernest-face">🤖</div>
                    </div>

                    <!-- Module Completion Footer -->
                    <div style="padding: 20px; border-top: 1px solid rgba(107, 159, 120, 0.2); background: #f8fafc;">
                        <div style="text-align: center;">
                            <button id="complete-enhanced-btn-${index}"
                                    onclick="window.appComponents.modal.completeModule(${index})"
                                    style="background: #6b9f78; color: white; border: none; padding: 12px 30px; border-radius: 10px; font-weight: 600; cursor: pointer; opacity: 0.5; transition: all 0.3s ease;"
                                    disabled>
                                Complete Module & Continue Journey
                            </button>
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
            console.error("Error loading module:", e);
            contentHTML = `<div class="error-msg">Error loading content: ${e.message}</div>`;
        }

        // Render content
        setTimeout(() => {
            contentArea.innerHTML = contentHTML;

            // Re-bind completion button
            const completeBtn = document.getElementById(`complete-enhanced-btn-${index}`);
            if (completeBtn) {
                completeBtn.disabled = false;
                completeBtn.style.opacity = '1';
            }

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

    completeModule(index) {
        // Get module data from global config
        const pgyLevel = window.currentPGYLevel || 'pgy2';
        const modules = LEARNING_MODULES_CONFIG[pgyLevel] || LEARNING_MODULES_CONFIG['all'];
        const module = modules[index];

        if (!module) return;

        console.log(`🎉 Module ${index + 1} completed: ${module.title}`);

        // Update Global State (Hybrid approach)
        if (window.completedModules) {
            window.completedModules.add(module.id);
        }

        if (window.currentModuleIndex !== undefined && index >= window.currentModuleIndex) {
            window.currentModuleIndex = index + 1;
        }

        if (window.saveProgressToStorage) window.saveProgressToStorage();

        // Show Celebration
        this.showCompletionCelebration(module);

        // Close modal and refresh board
        setTimeout(() => {
            this.closeModal(index);
            if (window.generateLearningBoard) window.generateLearningBoard(pgyLevel);
            if (window.updateProgressDashboard) window.updateProgressDashboard();
        }, 2000);
    }

    showCompletionCelebration(module) {
        const celebrationHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 3000;" id="celebration-overlay">
                <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 400px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);">
                    <div style="font-size: 4em; margin-bottom: 20px; animation: bounce 1s infinite;">🎉</div>
                    <h3 style="color: #1e293b; margin-bottom: 15px; font-size: 1.5em; font-weight: 700;">Module Completed!</h3>
                    <p style="color: #64748b; font-size: 1.1em; line-height: 1.5;"><strong>${module.title}</strong> has been mastered!</p>
                    <div style="margin-top: 25px;">
                        <p style="color: #6b9f78; font-weight: 600; font-size: 1.1em;">Your journey continues...</p>
                    </div>
                </div>
            </div>
            <style>
                @keyframes bounce {
                    0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
                    50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
                }
            </style>
        `;

        document.body.insertAdjacentHTML('beforeend', celebrationHTML);

        setTimeout(() => {
            const celebration = document.getElementById('celebration-overlay');
            if (celebration) celebration.remove();
        }, 2000);
    }
}
