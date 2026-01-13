/**
 * ModuleLoader.js
 * Dynamically loads ES6 modules from the src/content/ directory.
 * Replaces legacy path-based loading with strict mapping.
 */

const MODULE_MAP = {
    // EMG
    'emg-introduction': () => import('../content/emg/Introduction.js'),
    'basic-patterns': () => import('../content/emg/BasicPatterns.js'),
    'neuropathy-myopathy-basics': () => import('../content/emg/NeuropathyMyopathy.js'),
    'clinical-correlation': () => import('../content/emg/ClinicalCorrelation.js'),
    'emg-needle-localization': () => import('../content/emg/NeedleLocalization.js'),
    'emg-machine': () => import('../content/emg/EMGMachine.js'),
    'simple-reports': () => import('../content/emg/ReportWriting.js'),

    // Anatomy
    'brachial-plexus-interactive': () => import('../content/anatomy/BrachialPlexus.js'),
    'lumbosacral-plexus-interactive': () => import('../content/anatomy/LumbosacralPlexus.js'),
    'plexus-anatomy': () => import('../content/anatomy/PathwayExplorer.js'),

    // NCS
    'ncs-fundamentals': () => import('../content/ncs/Fundamentals.js'),
    'ncs-techniques': () => import('../content/ncs/Techniques.js'),

    // Pathology
    'neuropathy-pathophysiology': () => import('../content/pathology/Pathophysiology.js'),
    'radiculopathy-pathophysiology': () => import('../content/pathology/Radiculopathy.js'),

    // Quiz
    'muscle-quiz': () => import('../content/emg/MuscleQuiz.js'),

    // Migrated Legacy Content
    'carpal-tunnel': () => import('../content/nerves/CarpalTunnel.js'),
    'proximal-median': () => import('../content/nerves/ProximalMedian.js'),
    'ulnar-elbow': () => import('../content/nerves/UlnarNerve.js').then(m => ({ generateContent: m.UlnarNerve.generateElbowContent })),
    'ulnar-wrist': () => import('../content/nerves/UlnarNerve.js').then(m => ({ generateContent: m.UlnarNerve.generateWristContent })),
    'master-nerve-chart': () => import('../content/reference/MasterNerveChart.js'),

    // Aliases
    'neuropathy': () => import('../content/pathology/Pathophysiology.js'),
    'radiculopathy': () => import('../content/pathology/Radiculopathy.js'),
    'emg-basics': () => import('../content/emg/Introduction.js'), // Alias for safety
};

class ModuleLoader {
    constructor() {
        this.loadedModules = new Map();
        console.log('📦 ModuleLoader: Initialized (v2)');
    }

    async loadModule(moduleId) {
        if (this.loadedModules.has(moduleId)) {
            return this.loadedModules.get(moduleId);
        }

        console.log(`📦 ModuleLoader: Loading '${moduleId}'...`);

        const loader = MODULE_MAP[moduleId];
        if (!loader) {
            console.error(`❌ ModuleLoader: Unknown module '${moduleId}'`);
            // Fallback for debugging - or throw
            throw new Error(`Unknown module: ${moduleId}`);
        }

        try {
            const module = await loader();

            // Find the actionable instance (object with generateContent/init)
            // Priority: default export -> specific object export -> any object with generateContent
            let instance = module.default;

            if (!instance || typeof instance.generateContent !== 'function') {
                const values = Object.values(module);
                const found = values.find(v => v && typeof v.generateContent === 'function');
                if (found) instance = found;
            }

            // Fallback: If no generateContent, maybe it's a legacy module structure or just init?
            if (!instance) instance = module;

            this.loadedModules.set(moduleId, instance);
            console.log(`✅ ModuleLoader: Loaded '${moduleId}'`);
            return instance;
        } catch (error) {
            console.error(`❌ ModuleLoader: Failed to load '${moduleId}'`, error);
            throw error;
        }
    }
}

export const moduleLoader = new ModuleLoader();
window.moduleLoader = moduleLoader;
