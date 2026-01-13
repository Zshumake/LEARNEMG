/**
 * BaseContent.js
 * Base class for all content modules. Provides shared rendering utilities.
 */
import { UIComponents } from '../ui/UIComponents.js';
import { DesignTokens } from '../ui/DesignTokens.js';

export class BaseContent {
    constructor(config) {
        this.config = config;
        this.tokens = DesignTokens;
        this.components = UIComponents;
    }

    /**
     * Standard initialization for tab-based content modules.
     */
    initTabNavigation(idPrefix, colorMap, sectionClass = '.intro-section') {
        window.showIntroSection = (sectionId) => {
            // Hide all sections of this module type
            document.querySelectorAll(sectionClass).forEach(el => {
                el.style.display = 'none';
                el.classList.remove('active-section');
            });

            // Show target section
            const target = document.getElementById(`${idPrefix}-${sectionId}-section`);
            if (target) {
                target.style.display = 'block';
                setTimeout(() => target.classList.add('active-section'), 10);
            }

            // Update tab button styles
            document.querySelectorAll('.intro-tab').forEach(el => {
                // Only update tabs that belong to this module's prefix to avoid cross-pollution
                if (el.id.startsWith(`${idPrefix}-`)) {
                    el.style.background = 'white';
                    el.style.color = DesignTokens.colors.text.muted;
                    el.style.boxShadow = 'none';
                }
            });

            const activeTab = document.getElementById(`${idPrefix}-${sectionId}-tab`);
            if (activeTab) {
                activeTab.style.background = colorMap[sectionId] || DesignTokens.gradients.foundations;
                activeTab.style.color = 'white';
                activeTab.style.boxShadow = DesignTokens.shadows.md;
            }
        };

        // Auto-select first tab
        if (this.config.defaultTab) {
            setTimeout(() => window.showIntroSection(this.config.defaultTab), 100);
        }
    }

    getStandardStyles() {
        return `
            <style>
                ${DesignTokens.animations}
                .intro-section {
                    opacity: 0;
                    transform: translateY(10px);
                    transition: opacity 0.4s ease, transform 0.4s ease;
                }
                .intro-section.active-section {
                    opacity: 1;
                    transform: translateY(0);
                }
                .emg-card {
                    background: white;
                    padding: 25px;
                    border-radius: 20px;
                    box-shadow: ${DesignTokens.shadows.md};
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    transition: all 0.3s ease;
                    height: 100%;
                }
                .emg-card:hover {
                    transform: translateY(-5px);
                    box-shadow: ${DesignTokens.shadows.lg};
                    border-color: rgba(37, 99, 235, 0.2);
                }
                .intro-tab-pill {
                    transition: all 0.3s ease;
                    border-radius: 12px !important;
                    font-weight: 600 !important;
                    border: 1px solid ${DesignTokens.colors.border};
                }
            </style>
        `;
    }
}
