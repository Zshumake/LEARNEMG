/**
 * Router.js
 * Centralized navigation and routing logic for the LEARNEMG application.
 */

export class Router {
    constructor(appComponents) {
        this.components = appComponents;
        this.currentModule = null;
    }

    init() {
        console.log('🚦 Router Initialized');

        // Listen for back button/forward button
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.module) {
                this.navigateTo(event.state.module, false);
            }
        });

        // Check for module in URL params on load
        const urlParams = new URLSearchParams(window.location.search);
        const targetModule = urlParams.get('module');
        if (targetModule) {
            this.navigateTo(targetModule);
        }
    }

    navigateTo(moduleId, updateHistory = true) {
        console.log(`🧭 Navigating to: ${moduleId}`);

        if (updateHistory) {
            const newUrl = `${window.location.pathname}?module=${moduleId}`;
            window.history.pushState({ module: moduleId }, '', newUrl);
        }

        this.currentModule = moduleId;

        // Implementation of module switching logic
        // This will eventually replace the manual 'showIntroSection' logic for top-level navigation
        this.handleModuleSwitch(moduleId);
    }

    handleModuleSwitch(moduleId) {
        // Broad logic to switch between the 12 dashboard modules
        // For now, we'll keep it simple and integrate with existing global functions
        switch (moduleId) {
            case 'intro':
                if (window.showModule) window.showModule('emg-introduction');
                break;
            case 'plexus':
                if (window.showInteractivePlexusAnatomy) window.showInteractivePlexusAnatomy();
                break;
            case 'ncs':
                if (window.showBasicNCSPrinciples) window.showBasicNCSPrinciples();
                break;
            // Add more mappings as needed
            default:
                console.warn(`Unknown module requested: ${moduleId}`);
        }
    }
}
