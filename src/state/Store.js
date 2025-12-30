// Store.js
// centralized state management for LEARNEMG

class Store {
    constructor() {
        this.state = {
            pgyLevel: null,
            completedModules: new Set(),
            currentModuleId: null,
            settings: {
                soundEnabled: true,
                animationsEnabled: true
            }
        };
        this.listeners = new Set();
        this.init();
    }

    init() {
        // Load from localStorage
        // Try 'emg-pgy-level' first, then legacy 'selectedPGY'
        const savedPGY = localStorage.getItem('emg-pgy-level') || localStorage.getItem('selectedPGY');
        if (savedPGY) {
            this.state.pgyLevel = savedPGY;
        }

        // Load progress object
        const savedProgress = localStorage.getItem('emg-learning-progress');
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress);
                if (progress.completedModules) {
                    this.state.completedModules = new Set(progress.completedModules);
                }
                // Also could load pgyLevel from here if missing
                if (!this.state.pgyLevel && progress.pgyLevel) {
                    this.state.pgyLevel = progress.pgyLevel;
                }
            } catch (e) {
                console.error('State: Failed to parse progress', e);
            }
        }

        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            try {
                this.state.settings = { ...this.state.settings, ...JSON.parse(savedSettings) };
            } catch (e) {
                console.error('State: Failed to parse settings', e);
            }
        }

        console.log('🧠 Store Initialized:', this.state);
    }

    // --- Actions ---

    setPGYLevel(level) {
        if (this.state.pgyLevel === level) return;
        this.state.pgyLevel = level;
        this.persistProgress();
        this.notify('pgyLevel', level);
    }

    completeModule(moduleId) {
        if (this.state.completedModules.has(moduleId)) return;
        this.state.completedModules.add(moduleId);
        this.persistProgress();
        this.notify('completedModules', this.state.completedModules);
    }

    uncompleteModule(moduleId) {
        if (!this.state.completedModules.has(moduleId)) return;
        this.state.completedModules.delete(moduleId);
        this.persistProgress();
        this.notify('completedModules', this.state.completedModules);
    }

    setCurrentModule(moduleId) {
        this.state.currentModuleId = moduleId;
        this.persistProgress();
        this.notify('currentModuleId', moduleId);
    }

    updateSettings(newSettings) {
        this.state.settings = { ...this.state.settings, ...newSettings };
        localStorage.setItem('appSettings', JSON.stringify(this.state.settings));
        this.notify('settings', this.state.settings);
    }

    resetProgress() {
        this.state.completedModules.clear();
        this.persistProgress();
        this.notify('completedModules', this.state.completedModules);
    }

    // --- Persistence Helper ---

    persistProgress() {
        const progressData = {
            pgyLevel: this.state.pgyLevel,
            moduleIndex: 0, // Default or track currentModuleIndex if needed
            completedModules: Array.from(this.state.completedModules),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('emg-learning-progress', JSON.stringify(progressData));
        if (this.state.pgyLevel) {
            localStorage.setItem('emg-pgy-level', this.state.pgyLevel);
        }
    }

    // --- Getters ---

    getPGYLevel() {
        return this.state.pgyLevel;
    }

    isModuleCompleted(moduleId) {
        return this.state.completedModules.has(moduleId);
    }

    getCompletedModulesArray() {
        return Array.from(this.state.completedModules);
    }

    // --- Subscriptions ---

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notify(key, value) {
        console.log(`🧠 State Change: ${key} =`, value);
        this.listeners.forEach(listener => listener(this.state, key, value));

        // Sync with legacy globals for compatibility
        if (key === 'pgyLevel') window.currentPGYLevel = value;
        if (key === 'completedModules') window.completedModules = value;
    }
}

export const store = new Store();
window.appStore = store; // Global access
