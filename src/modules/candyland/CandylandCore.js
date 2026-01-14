import { learningModulesConfig, MODULE_DESCRIPTIONS } from './BoardData.js';
import { BoardRenderer } from './BoardRenderer.js';

export class CandylandCore {
    constructor() {
        this.renderer = new BoardRenderer(this);
        this.config = learningModulesConfig;
        this.descriptions = MODULE_DESCRIPTIONS;

        this.currentPGYLevel = 'all';
        this.completedModules = new Set();

        // Sync with global legacy state
        if (typeof window.completedModules !== 'undefined' && window.completedModules instanceof Set) {
            this.completedModules = window.completedModules;
        }

        // Expose for Renderer's onclick
        if (!window.appComponents) window.appComponents = {};
        window.appComponents.candyland = this;
        window.learningModulesConfig = this.config;
    }

    enrichModules(pgyLevel) {
        let modules = this.config[pgyLevel] || [];
        return modules.map((module, index) => {
            const desc = this.descriptions[index + 1];
            return {
                ...module,
                description: desc ? desc.text : null,
                highlights: desc ? desc.highlights : null
            };
        });
    }

    init() {
        console.log('🚀 Grid Board System (Candyland) Initialized');
        // Expose global hook for Initialization.js and legacy calls
        window.generateLearningBoard = (pgy) => this.generateLearningBoard(pgy);
    }

    generateLearningBoard(pgyLevel) {
        console.log('🎯 Generating Grid EMG/NCS Pathway...');
        this.currentPGYLevel = pgyLevel;
        window.currentPGYLevel = pgyLevel;

        // Merge descriptions into modules for easier rendering if needed, 
        // but Renderer uses lookup by index/id usually.
        let modules = this.config[pgyLevel] || [];

        // Enrich modules with descriptions
        const enhancedModules = modules.map((module, index) => {
            const desc = this.descriptions[index + 1]; // descriptions are 1-based
            return {
                ...module,
                description: desc ? desc.text : null,
                highlights: desc ? desc.highlights : null
            };
        });

        this.renderer.render('learning-board', enhancedModules, pgyLevel, this.completedModules);
    }

    render(pgyLevel) {
        console.log('🔄 CandylandCore: render called, redirecting to generateLearningBoard');
        this.generateLearningBoard(pgyLevel);
    }

    async handleModuleClick(moduleId, index) {
        console.log(`🎯 Module clicked: ${moduleId} (Index: ${index})`);

        const module = {
            contentId: moduleId,
            id: moduleId,
            title: this.descriptions[index + 1]?.title || moduleId
        };
        const moduleNumber = index + 1;
        const title = `Module ${moduleNumber}`;

        // Approach 1: Try Module Loader (Dynamic Logic)
        if (window.moduleLoader) {
            try {
                console.log(`📦 Attempting module load: ${moduleId}`);
                const loadedModule = await window.moduleLoader.loadModule(moduleId);

                if (loadedModule) {
                    // Initialize if available (fixes script execution for fresh modules)
                    if (typeof loadedModule.initialize === 'function') {
                        console.log(`🚀 Initializing module: ${moduleId}`);
                        loadedModule.initialize();
                    }

                    if (loadedModule.generateContent) {
                        console.log(`✨ Calling generateContent for: ${moduleId}`);
                        const content = loadedModule.generateContent(module);

                        // If generateContent returns anything (including null), we assume it handled its own display
                        // or returned content for us to show.
                        if (content !== undefined) {
                            if (content && window.showModal) {
                                window.showModal(`${title}: ${module.title}`, content);
                            }
                            return; // Found and handled
                        }
                    }
                }
            } catch (err) {
                console.warn(`Module load failed for ${moduleId}, trying static content`, err);
            }
        }

        // Approach 2: Static Content Loader Deprecated
        // If ModuleLoader logic fails, we proceed to error handling.
        // The remaining logic previously here is removed to force migration.

        // Approach 3: Handling Special Cases (Quizzes)
        // Check if it's a quiz module which might need special handling via QuizSystem
        // (This part assumes QuizSystem is globally available or integrated)

        console.error(`❌ No content found for module: ${moduleId} `);
        if (window.showModal) {
            const errorContent = `
                <div style="padding: 20px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
                    <h3>Content Not Found</h3>
                    <p>Unable to load content for module: ${moduleId}</p>
                    <p>Please contact support if this persists.</p>
                </div>
            `;
            window.showModal('Error', errorContent);
        }
    }

    showModuleDescription(moduleNumber) {
        // Clear any pending hide timer
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }

        const desc = this.descriptions[moduleNumber];
        if (desc) {
            this.renderer.updateErnestDescription(desc.title, desc.text, desc.highlights);
        }
    }

    hideModuleDescription() {
        // Add a delay before hiding to prevent flickering/accidental mouseout
        this.hideTimer = setTimeout(() => {
            this.renderer.resetErnestDescription();
        }, 300); // 300ms grace period
    }
}
