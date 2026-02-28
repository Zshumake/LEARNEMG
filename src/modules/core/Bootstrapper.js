import { AppShell } from '../ui/AppShell.js';
import { moduleLoader } from '../../utils/ModuleLoader.js';

export class Bootstrapper {
    constructor() {
        this.shell = new AppShell();
    }

    start() {
        console.log('🚀 Bootstrapper: Starting Application');

        // 1. Setup UI Shell
        this.shell.render();

        // 2. Initialize iOS tracking if needed
        this.setupIOSTracking();

        // 3. Setup Global Storage Functions (Legacy compatibility)
        this.setupStorage();

        // 4. Expose Shell globally (optional, for debugging)
        if (!window.appComponents) window.appComponents = {};
        window.appComponents.shell = this.shell;
    }

    setupStorage() {
        // Local Storage Functions
        window.saveProgressToStorage = function () {
            const progressData = {
                currentPGYLevel: window.currentPGYLevel,
                completedModules: Array.from(window.completedModules || []),
                currentModuleIndex: window.currentModuleIndex,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('ernestEMGProgress', JSON.stringify(progressData));
        };

        window.loadProgressFromStorage = function () {
            const saved = localStorage.getItem('ernestEMGProgress');
            if (saved) {
                try {
                    const progressData = JSON.parse(saved);
                    window.currentPGYLevel = progressData.currentPGYLevel;
                    window.completedModules = new Set(progressData.completedModules || []);
                    window.currentModuleIndex = progressData.currentModuleIndex || 0;
                    console.log('✅ Progress loaded from storage');
                    return true;
                } catch (error) {
                    console.log('⚠️ Error loading progress:', error);
                    return false;
                }
            }
            return false;
        };
    }

    setupIOSTracking() {
        if (typeof window.isIOS === 'undefined') {
            window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        }

        if (window.isIOS) {
            console.warn('📱 iOS DETECTED - Enhanced tracking enabled');

            // Track memory if available
            if (performance.memory) {
                setInterval(() => {
                    const mem = performance.memory;
                    const usedMB = (mem.usedJSHeapSize / 1048576).toFixed(2);
                    const limitMB = (mem.jsHeapSizeLimit / 1048576).toFixed(2);
                    const percentUsed = ((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100).toFixed(1);

                    if (percentUsed > 90) {
                        console.error('🚨 MEMORY CRITICAL: ' + percentUsed + '%');
                    }
                }, 5000);
            }

            // Track zoom level changes
            let lastZoom = window.visualViewport ? window.visualViewport.scale : 1;
            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', () => {
                    const currentZoom = window.visualViewport.scale;
                    if (currentZoom !== lastZoom) {
                        lastZoom = currentZoom;
                    }
                });
            }

            // Minimal crash tracking
            window.addEventListener('beforeunload', function (e) {
                console.error('⚠️ PAGE UNLOAD - Something triggered navigation away from page');
            });
        }
    }
}
