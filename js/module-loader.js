// Dynamic Module Loader System
// Loads modules on-demand to reduce initial page load

class ModuleLoader {
    constructor() {
        // Module registry - maps module IDs to file paths (relative to /js/ directory)
        this.moduleRegistry = {
            'emg-introduction': './modules/emg-introduction.js',
            'plexus-anatomy': './modules/plexus-anatomy.js',
            'brachial-plexus-interactive': './modules/brachial-plexus-interactive.js',
            'lumbosacral-plexus-interactive': './modules/lumbosacral-plexus-interactive.js',
            'radiculopathy-pathophysiology': './modules/radiculopathy-pathophysiology.js',
            'neuropathy-pathophysiology': './modules/neuropathy-pathophysiology.js',
            'ncs-fundamentals': './modules/ncs-fundamentals.js',
            'ncs-techniques': './modules/ncs-techniques.js',
            'emg-needle-localization': './modules/emg-needle-localization.js',
            'muscle-quiz': './modules/muscle-quiz.js',
            'basic-patterns': './modules/basic-patterns.js',
            'neuropathy-myopathy-basics': './modules/neuropathy-myopathy-basics.js',
            'simple-reports': './modules/simple-reports.js',
            'clinical-correlation': './modules/clinical-correlation.js'
        };

        // Cache for loaded modules
        this.moduleCache = {};

        // Loading state tracker
        this.loadingModules = new Set();
    }

    /**
     * Load a module dynamically
     * @param {string} moduleId - The module identifier
     * @returns {Promise<Object>} - The loaded module
     */
    async loadModule(moduleId) {
        // Return cached module if already loaded
        if (this.moduleCache[moduleId]) {
            console.log(`✅ Module ${moduleId} loaded from cache`);
            return this.moduleCache[moduleId];
        }

        // Check if module is already loading
        if (this.loadingModules.has(moduleId)) {
            console.log(`⏳ Module ${moduleId} is already loading...`);
            // Wait for it to finish loading
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (this.moduleCache[moduleId]) {
                        clearInterval(checkInterval);
                        resolve(this.moduleCache[moduleId]);
                    }
                }, 100);
            });
        }

        // Get module path from registry
        const modulePath = this.moduleRegistry[moduleId];
        if (!modulePath) {
            throw new Error(`Module "${moduleId}" not found in registry`);
        }

        // Mark as loading
        this.loadingModules.add(moduleId);

        try {
            console.log(`📥 Loading module: ${moduleId} from ${modulePath}`);

            // Show loading indicator
            this.showLoadingIndicator(moduleId);

            // Dynamic import with cache busting
            const cacheBuster = `?v=${Date.now()}`;
            const module = await import(`./${modulePath}${cacheBuster}`);

            // Cache the module
            this.moduleCache[moduleId] = module;
            this.loadingModules.delete(moduleId);

            // Hide loading indicator
            this.hideLoadingIndicator();

            console.log(`✅ Module ${moduleId} loaded successfully`);
            return module;

        } catch (error) {
            this.loadingModules.delete(moduleId);
            this.hideLoadingIndicator();
            console.error(`❌ Failed to load module ${moduleId}:`, error);

            // Retry once after a delay
            if (!error.retried) {
                console.log(`🔄 Retrying module ${moduleId}...`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                error.retried = true;
                return this.loadModule(moduleId);
            }

            throw new Error(`Failed to load module "${moduleId}": ${error.message}`);
        }
    }

    /**
     * Show loading indicator
     * @param {string} moduleId - The module being loaded
     */
    showLoadingIndicator(moduleId) {
        // Create loading overlay if it doesn't exist
        let loader = document.getElementById('module-loader-indicator');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'module-loader-indicator';
            loader.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideInRight 0.3s ease-out;
            `;
            loader.innerHTML = `
                <div class="spinner" style="
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                "></div>
                <span>Loading module...</span>
            `;
            document.body.appendChild(loader);

            // Add animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Hide loading indicator
     */
    hideLoadingIndicator() {
        const loader = document.getElementById('module-loader-indicator');
        if (loader) {
            loader.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => loader.remove(), 300);
        }
    }

    /**
     * Preload a module without executing it
     * @param {string} moduleId - The module to preload
     */
    async preloadModule(moduleId) {
        const modulePath = this.moduleRegistry[moduleId];
        if (!modulePath) return;

        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = modulePath;
        document.head.appendChild(link);
    }

    /**
     * Clear module cache
     * @param {string} moduleId - Optional specific module to clear
     */
    clearCache(moduleId = null) {
        if (moduleId) {
            delete this.moduleCache[moduleId];
            console.log(`🗑️ Cleared cache for module: ${moduleId}`);
        } else {
            this.moduleCache = {};
            console.log(`🗑️ Cleared all module cache`);
        }
    }

    /**
     * Get loading stats
     * @returns {Object} - Cache statistics
     */
    getStats() {
        return {
            totalModules: Object.keys(this.moduleRegistry).length,
            loadedModules: Object.keys(this.moduleCache).length,
            loadingModules: this.loadingModules.size,
            cacheHitRate: Object.keys(this.moduleCache).length / Object.keys(this.moduleRegistry).length
        };
    }
}

// Create global instance
window.moduleLoader = new ModuleLoader();

// Export for ES6 modules
export default window.moduleLoader;
