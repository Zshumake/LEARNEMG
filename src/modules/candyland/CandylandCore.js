
import { learningModulesConfig, MODULE_DESCRIPTIONS } from './BoardData.js';
import { BoardRenderer } from './BoardRenderer.js';

export class CandylandCore {
    constructor(store) {
        this.store = store;
        this.renderer = new BoardRenderer(this);
        this.config = learningModulesConfig;
        this.descriptions = MODULE_DESCRIPTIONS;

        this.currentPGYLevel = null;
        this.completedModules = new Set();

        // Sync with global legacy state
        if (typeof window.completedModules !== 'undefined' && window.completedModules instanceof Set) {
            this.completedModules = window.completedModules;
        }

        // Listen for store updates
        if (this.store) {
            this.store.subscribe((state, key, value) => {
                if (key === 'pgyLevel') {
                    this.generateLearningBoard(value);
                } else if (key === 'completedModules') {
                    this.completedModules = value;
                    if (this.currentPGYLevel) {
                        this.renderer.render('learning-board', this.enrichModules(this.currentPGYLevel), this.currentPGYLevel, this.completedModules);
                    }
                }
            });
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

    handleModuleClick(moduleId, index) {
        console.log(`🎯 Module clicked: ${moduleId} (Index: ${index})`);

        // Use module loader for dynamic loading on ALL devices (including iOS)
        const module = { contentId: moduleId, id: moduleId };
        const moduleNumber = index + 1;

        // Legacy Module Loading Logic preserved from index.html
        if (window.moduleLoader) {
            console.log(`📦 Loading module dynamically: ${moduleId}`);
            window.moduleLoader.loadModule(moduleId).then(loadedModule => {
                if (loadedModule && loadedModule.generateContent) {
                    const content = loadedModule.generateContent(module);
                    if (content && typeof window.showModal === 'function') {
                        window.showModal(`Module ${moduleNumber}: ${module.title || moduleId}`, content);
                    }
                }
            }).catch(err => {
                console.error("Module load failed", err);
                this.fallbackLoad(module, moduleNumber);
            });
        } else {
            console.log('⚠️ Module loader not available, using fallback');
            this.fallbackLoad(module, moduleNumber);
        }
    }

    fallbackLoad(module, moduleNumber) {
        if (typeof window.generateLearningContentByType === 'function') {
            const content = window.generateLearningContentByType(module, moduleNumber - 1);
            if (content && typeof window.showModal === 'function') {
                window.showModal(`Module ${moduleNumber}: ${module.id}`, content);
            }
        } else {
            console.error("No fallback loader available");
        }
    }

    showModuleDescription(moduleNumber) {
        const desc = this.descriptions[moduleNumber];
        if (desc) {
            this.renderer.updateErnestDescription(desc.title, desc.text, desc.highlights);
        }
    }

    hideModuleDescription() {
        this.renderer.resetErnestDescription();
    }
}
