import { learningModulesConfig, MODULE_DESCRIPTIONS } from './BoardData.js?v=podcastRefactor1';
import { BoardRenderer } from './BoardRenderer.js?v=podcastRefactor1';

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

        if (window.appComponents && window.appComponents.modal) {
            const modules = this.config[this.currentPGYLevel] || this.config['all'] || [];
            const module = modules[index];

            if (module) {
                window.appComponents.modal.showLearningModal(module, index, this.currentPGYLevel);
            } else {
                console.error(`❌ Module not found for index: ${index} in PGY: ${this.currentPGYLevel}`);
            }
        } else if (window.startLearningModule) {
            // Legacy fallback
            window.startLearningModule(index);
        } else {
            console.error("❌ Modal system not available!");
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
