/**
 * ModuleLoader.js
 * Dynamically loads ES6 modules from the src/content/ directory.
 * Replaces legacy path-based loading with strict mapping.
 */

const MODULE_MAP = {
    // DIRECT APPLICATION LAUNCHES (No file load needed)
    'plexus': {
        type: 'inline-app',
        generateContent: () => {
            if (window.appComponents && window.appComponents.plexus) {
                window.appComponents.plexus.currentPlexus = 'brachial';
                return window.appComponents.plexus.getHTMLContent();
            }
            return '<div>Error loading Plexus Anatomy.</div>';
        },
        initialize: () => {
            if (window.appComponents && window.appComponents.plexus) {
                window.appComponents.plexus.initialize('plexus-viz-container', 'brachial');
            }
        }
    },
    'brachial-plexus-interactive': {
        type: 'inline-app',
        generateContent: () => {
            if (window.appComponents && window.appComponents.plexus) {
                window.appComponents.plexus.currentPlexus = 'brachial';
                return window.appComponents.plexus.getHTMLContent();
            }
            return '<div>Error loading Plexus Anatomy.</div>';
        },
        initialize: () => {
            if (window.appComponents && window.appComponents.plexus) {
                window.appComponents.plexus.initialize('plexus-viz-container', 'brachial');
            }
        }
    },
    'lumbosacral-plexus-interactive': {
        type: 'inline-app',
        generateContent: () => {
            if (window.appComponents && window.appComponents.plexus) {
                window.appComponents.plexus.currentPlexus = 'lumbosacral';
                return window.appComponents.plexus.getHTMLContent();
            }
            return '<div>Error loading Plexus Anatomy.</div>';
        },
        initialize: () => {
            if (window.appComponents && window.appComponents.plexus) {
                window.appComponents.plexus.initialize('plexus-viz-container', 'lumbosacral');
            }
        }
    },

    // STANDARD CONTENT MODULES (Lazy Loaded)
    'emg-introduction': () => import('../content/emg/Introduction.js'),
    'basic-patterns': () => import('../content/emg/BasicPatterns.js'),
    'neuropathy-myopathy-basics': () => import('../content/emg/NeuropathyMyopathy.js'),
    'clinical-correlation': () => import('../content/emg/ClinicalCorrelation.js'),
    'emg-needle-localization': () => import('../content/emg/NeedleLocalization.js'),
    'emg-machine': () => import('../content/emg/EMGMachine.js'),
    'simple-reports': () => import('../content/emg/ReportWriting.js'),
    'plexus-anatomy': () => import('../content/anatomy/PathwayExplorer.js'),
    'ncs-fundamentals': () => import('../content/ncs/Fundamentals.js'),
    'ncs-techniques': () => import('../content/ncs/Techniques.js'),
    'neuropathy-pathophysiology': () => import('../content/pathology/Pathophysiology.js?v=quizFix1'),
    'radiculopathy-pathophysiology': () => import('../content/pathology/Radiculopathy.js'),
    'muscle-quiz': () => import('../content/emg/MuscleQuiz.js'),
    'carpal-tunnel': () => import('../content/nerves/CarpalTunnel.js'),
    'proximal-median': () => import('../content/nerves/ProximalMedian.js'),
    'ulnar-elbow': () => import('../content/nerves/UlnarNerve.js').then(m => ({ generateContent: m.UlnarNerve.generateElbowContent })),
    'ulnar-wrist': () => import('../content/nerves/UlnarNerve.js').then(m => ({ generateContent: m.UlnarNerve.generateWristContent })),
    'master-nerve-chart': () => import('../content/reference/MasterNerveChart.js'),
    'neuropathy': () => import('../content/pathology/Pathophysiology.js?v=quizFix1'),
    'radiculopathy': () => import('../content/pathology/Radiculopathy.js'),
    'emg-basics': () => import('../content/emg/Introduction.js'),
};

class ModuleLoader {
    constructor() {
        this.loadedModules = new Map();
        console.log('📦 ModuleLoader: Initialized (v3 - App Support)');
    }

    async loadModule(moduleId) {
        // Check cache first
        if (this.loadedModules.has(moduleId)) {
            return this.loadedModules.get(moduleId);
        }

        console.log(`📦 ModuleLoader: Loading '${moduleId}'...`);

        const loader = MODULE_MAP[moduleId];
        if (!loader) {
            console.error(`❌ ModuleLoader: Unknown module '${moduleId}'`);
            throw new Error(`Unknown module: ${moduleId}`);
        }

        // NEW: Check for Direct Application Launch
        if (typeof loader === 'object' && loader.type === 'application') {
            console.log(`🚀 ModuleLoader: Launching Application '${moduleId}' directly`);

            // Generate a 'stub' module that auto-launches on init
            const appModule = {
                id: moduleId,
                type: 'application',
                generateContent: () => `
                    <div style="text-align: center; padding: 50px;">
                        <div class="loading-spinner"></div>
                        <p>Launching Application...</p>
                    </div>`,
                initialize: () => {
                    console.log(`🚀 ModuleLoader: Executing launch sequence for ${moduleId}`);
                    if (loader.launch) loader.launch();
                }
            };

            this.loadedModules.set(moduleId, appModule);
            return appModule;
        }

        // NEW: Check for Inline Applications (rendered directly inside the modal)
        if (typeof loader === 'object' && loader.type === 'inline-app') {
            console.log(`🚀 ModuleLoader: Injecting Application '${moduleId}' inline`);

            const appModule = {
                id: moduleId,
                type: 'inline-app',
                generateContent: (moduleParam) => {
                    let header = '';
                    if (moduleParam) {
                        header = `
                        <div class="content-header" style="margin-bottom: 20px;">
                            <div class="content-icon" style="margin-bottom: 15px;">${moduleParam.customIcon ? `<img src="${moduleParam.customIcon}" style="width:64px;height:64px;">` : '📚'}</div>
                            <h2 class="content-title" style="margin: 0 0 10px 0;">${moduleParam.title}</h2>
                            <p class="content-description" style="color: #64748b; font-size: 1.1em; line-height: 1.5;">${moduleParam.description || ''}</p>
                        </div>`;
                    }

                    if (typeof loader.generateContent === 'function') {
                        return header + loader.generateContent();
                    }
                    return '<div class="error-msg">Error generating inline app content</div>';
                },
                initialize: () => {
                    console.log(`🚀 ModuleLoader: Initializing inline sequence for ${moduleId}`);
                    if (typeof loader.initialize === 'function') loader.initialize();
                }
            };

            this.loadedModules.set(moduleId, appModule);
            return appModule;
        }

        // Standard Lazy Loading
        try {
            const module = await loader();

            let instance = module.default;
            if (!instance || typeof instance.generateContent !== 'function') {
                const values = Object.values(module);
                const found = values.find(v => v && typeof v.generateContent === 'function');
                if (found) instance = found;
            }
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
