// ContentLoader.js
// Utility to load content from JSON file

class ContentLoader {
    constructor() {
        this.content = null;
        this.loadingPromise = null;
        this.basePath = 'src/data/content.json';
    }

    async load() {
        if (this.content) return this.content;
        if (this.loadingPromise) return this.loadingPromise;

        console.log('🔄 ContentLoader: Fetching content.json...');
        this.loadingPromise = fetch(this.basePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                this.content = data;
                console.log('✅ ContentLoader: Content loaded successfully');
                return this.content;
            })
            .catch(error => {
                console.error('❌ ContentLoader Error:', error);
                throw error;
            });

        return this.loadingPromise;
    }

    async getModule(moduleId) {
        await this.load();
        if (this.content && this.content.modules && this.content.modules[moduleId]) {
            return this.content.modules[moduleId];
        }
        console.warn(`⚠️ ContentLoader: Module '${moduleId}' not found`);
        return null;
    }

    getModuleSync(moduleId) {
        if (!this.content) {
            console.warn('⚠️ ContentLoader: Content not yet loaded');
            return null;
        }
        if (this.content.modules && this.content.modules[moduleId]) {
            return this.content.modules[moduleId];
        }
        console.warn(`⚠️ ContentLoader: Module '${moduleId}' not found`);
        return null;
    }

    async getHTML(moduleId) {
        const module = await this.getModule(moduleId);
        return module ? module.html : null;
    }

    getHTMLSync(moduleId) {
        const module = this.getModuleSync(moduleId);
        return module ? module.html : null;
    }
}

export const contentLoader = new ContentLoader();
window.contentLoader = contentLoader; // Global access

// Auto-load on instantiation to ensure availability
contentLoader.load().catch(console.error);
