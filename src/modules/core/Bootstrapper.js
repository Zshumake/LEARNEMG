import { AppShell } from '../ui/AppShell.js?v=4a916fb7';
import { moduleLoader } from '../../utils/ModuleLoader.js?v=4ede3554';
import logger from '../../utils/Logger.js';

export class Bootstrapper {
    constructor() {
        this.shell = new AppShell();
    }

    start() {
        logger.log('🚀 Bootstrapper: Starting Application');

        // 1. Setup UI Shell
        this.shell.render();

        // 2. Initialize iOS tracking if needed
        this.setupIOSTracking();

        // 3. Expose Shell globally (optional, for debugging)
        if (!window.appComponents) window.appComponents = {};
        window.appComponents.shell = this.shell;
    }

    setupIOSTracking() {
        if (typeof window.isIOS === 'undefined') {
            window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        }

        if (window.isIOS) {
            logger.warn('📱 iOS DETECTED - Enhanced tracking enabled');

            // Track memory if available
            if (performance.memory) {
                setInterval(() => {
                    const mem = performance.memory;
                    const usedMB = (mem.usedJSHeapSize / 1048576).toFixed(2);
                    const limitMB = (mem.jsHeapSizeLimit / 1048576).toFixed(2);
                    const percentUsed = ((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100).toFixed(1);

                    if (percentUsed > 90) {
                        logger.error('🚨 MEMORY CRITICAL: ' + percentUsed + '%');
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
                logger.error('⚠️ PAGE UNLOAD - Something triggered navigation away from page');
            });
        }
    }
}
