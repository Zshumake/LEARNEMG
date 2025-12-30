/**
 * LegacyNavigator.js
 * 
 * Manages legacy navigation requirements including returning to the PGY Navigator
 * and displaying legacy content tabs.
 * Extracted from emg-app-main.js
 */

export class LegacyNavigator {
    constructor() {
        this.moduleRouter = window.appComponents?.moduleRouter;
        this.pgySelector = window.appComponents?.pgySelector;
    }

    init() {
        console.log('🧭 Legacy Navigator Initialized');
        // Expose global functions for legacy onclick handlers
        window.returnToPGYNavigator = (pgy) => this.returnToPGYNavigator(pgy);
        window.showLegacyTab = (tabIndex, fromPGY) => this.showLegacyTab(tabIndex, fromPGY);
        window.showTabFeedback = (tabIndex) => this.showTabFeedback(tabIndex);
    }

    /**
     * Return to the main PGY Dashboard/Navigator
     * @param {string} pgyLevel - target PGY level to select
     */
    returnToPGYNavigator(pgyLevel = null) {
        console.log(`🏠 Returning to Navigator (${pgyLevel || 'current'})`);

        // 1. Clean up Legacy/Modal UI
        const focusedContainer = document.getElementById('focused-tab-container');
        if (focusedContainer) focusedContainer.style.display = 'none';

        // 2. Restore Main Interface
        const mainInterface = document.getElementById('main-interface-container');
        if (mainInterface) mainInterface.style.display = 'block';

        // Restore legacy containers just in case
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.style.display = 'block';
        const pgySelector = document.querySelector('.pgy-selector-container');
        if (pgySelector) pgySelector.style.display = 'block';

        // 3. Close any active modals
        if (window.closeModal) window.closeModal();

        // 4. Update State via PGYSelector
        // Use global because instance might be stale if re-initialized or timing
        const selector = window.appComponents?.pgySelector;
        const targetPGY = pgyLevel || window.currentPGYLevel || 'all';

        if (selector) {
            selector.select(targetPGY);
        } else {
            console.warn('PGYSelector not found, falling back to global state');
            window.currentPGYLevel = targetPGY;
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Show a legacy content tab in the "Focused Container" view
     * @param {number} tabIndex 
     * @param {string} fromPGY 
     */
    showLegacyTab(tabIndex, fromPGY = null) {
        // Hide ALL content sections for clean, isolated view
        const pgydashboards = document.querySelectorAll('.pgy-dashboard');
        pgydashboards.forEach(dashboard => {
            dashboard.style.display = 'none';
        });

        // Hide the all-levels dashboard with tab navigation
        const allLevelsDashboard = document.getElementById('all-levels-dashboard');
        if (allLevelsDashboard) {
            allLevelsDashboard.style.display = 'none';
        }

        // Hide main content section (contains all tabs)
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.display = 'none';
        }

        // Hide PGY selector container
        const pgySelector = document.querySelector('.pgy-selector-container');
        if (pgySelector) {
            pgySelector.style.display = 'none';
        }

        // Hide progress dashboard
        const progressDashboard = document.getElementById('progressDashboard');
        if (progressDashboard) {
            progressDashboard.style.display = 'none';
        }

        // Hide competency navigation
        const competencyNav = document.getElementById('competency-navigation');
        if (competencyNav) {
            competencyNav.style.display = 'none';
        }

        // Create or show focused tab container
        let focusedContainer = document.getElementById('focused-tab-container');
        if (!focusedContainer) {
            focusedContainer = document.createElement('div');
            focusedContainer.id = 'focused-tab-container';
            focusedContainer.className = 'pgy-dashboard';
            focusedContainer.style.cssText = `
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(107, 159, 120, 0.2);
                        border-radius: 15px;
                        padding: 30px;
                        margin: 20px auto;
                        max-width: 1200px;
                        box-shadow: 0 8px 32px rgba(107, 159, 120, 0.1);
                        position: relative;
                        z-index: 1000;
                    `;

            // Insert at the beginning of container for top positioning
            const container = document.querySelector('.container');
            if (container) {
                container.insertBefore(focusedContainer, container.firstChild);
            } else {
                // Fallback if container class not found
                document.body.prepend(focusedContainer);
            }
        }

        // Get tab name for header
        const tabNames = {
            0: 'Interactive Case Studies',
            1: 'Nerve Conduction Studies',
            2: 'EMG Instruments',
            3: 'EMG Terms',
            4: 'Nerve Classifications',
            5: 'Quick Reference',
            6: 'NCS Videos',
            7: 'Cardinal Rules of NCS',
            8: 'Advanced Muscle Lab',
            9: 'EMG Challenge',
            10: 'NCS Landmarks',
            11: 'EMG Waveforms & Audio',
            12: 'Interactive Plexus Anatomy',
            13: 'EMG Report Writing',
            14: 'EMG Diagnosis Reference'
        };

        const tabName = tabNames[tabIndex] || `Content Area ${tabIndex}`;

        // Get the actual tab content
        const sourceTab = document.getElementById(`tab-${tabIndex}`);
        let tabContent = '<p>Content not found.</p>';
        if (sourceTab) {
            tabContent = sourceTab.innerHTML;
        }

        // Create focused view with back button
        focusedContainer.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                        <h2 style="margin: 0; color: #2c3e50;">📚 ${tabName}</h2>
                        <button onclick="returnToPGYNavigator('${fromPGY || ''}')" 
                                style="background: #6b9f78; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 8px; cursor: pointer; font-weight: 600;
                                       transition: all 0.3s ease;">
                            ← Back to Navigator
                        </button>
                    </div>
                    <div style="border-top: 2px solid #6b9f78; padding-top: 20px;">
                        ${tabContent}
                    </div>
                `;

        focusedContainer.style.display = 'block';

        // Clear PGY button states
        const pgyButtonElements = document.querySelectorAll('.pgy-button');
        pgyButtonElements.forEach(button => button.classList.remove('active'));

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Show visual feedback
        this.showTabFeedback(tabIndex);
    }

    /**
     * Show a temporary visual feedback notification
     * @param {number} tabIndex 
     */
    showTabFeedback(tabIndex) {
        const tabNames = {
            0: 'Interactive Case Studies',
            1: 'Nerve Conduction Studies',
            2: 'EMG Instruments',
            3: 'EMG Terms',
            4: 'Nerve Classifications',
            5: 'Quick Reference',
            6: 'NCS Videos',
            7: 'Cardinal Rules of NCS',
            8: 'Advanced Muscle Lab',
            9: 'EMG Challenge',
            10: 'NCS Landmarks',
            11: 'EMG Waveforms & Audio',
            12: 'Interactive Plexus Anatomy',
            13: 'EMG Report Writing',
            14: 'EMG Diagnosis Reference'
        };

        const tabName = tabNames[tabIndex] || `Tab ${tabIndex}`;

        // Create a temporary feedback notification
        const feedback = document.createElement('div');
        feedback.className = 'tab-feedback';
        feedback.innerHTML = `
                    <div class="feedback-content">
                        <span class="feedback-icon">📖</span>
                        <span class="feedback-text">Loading: ${tabName}</span>
                    </div>
                `;

        // Check if style already exists
        if (!document.getElementById('legacy-feedback-style')) {
            const style = document.createElement('style');
            style.id = 'legacy-feedback-style';
            style.textContent = `
                        .tab-feedback {
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background: linear-gradient(135deg, #3498db, #2980b9);
                            color: white;
                            padding: 12px 20px;
                            border-radius: 25px;
                            box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                            z-index: 1001;
                            animation: slideInRight 0.3s ease;
                        }
                        
                        .feedback-content {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-weight: 600;
                        }
                        
                        @keyframes slideInRight {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                    `;
            document.head.appendChild(style);
        }

        document.body.appendChild(feedback);

        // Remove feedback after 2 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 2000);
    }
}
