/**
 * UIComponents.js
 * Reusable UI components for consistent modular rendering.
 */
import { DesignTokens } from './DesignTokens.js';

export const UIComponents = {
    /**
     * Renders a primary header banner for a module.
     */
    renderHeader(title, subtitle) {
        return `
            <div class="module-header-banner" style="
                background: ${DesignTokens.gradients.header};
                padding: 40px;
                border-radius: 24px;
                margin-bottom: 40px;
                position: relative;
                overflow: hidden;
                box-shadow: ${DesignTokens.shadows.xl};
            ">
                <div style="position: relative; z-index: 2;">
                    <h3 style="color: white; margin: 0; font-size: 2em; font-weight: 800; letter-spacing: -0.02em;">${title}</h3>
                    <p style="color: #cbd5e1; font-size: 1.2em; font-weight: 400; margin: 15px 0 0 0; line-height: 1.6; max-width: 800px;">
                        ${subtitle}
                    </p>
                </div>
                <div style="position: absolute; top: -50px; right: -50px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0) 70%); border-radius: 50%;"></div>
            </div>
        `;
    },

    /**
     * Renders a standard card.
     */
    renderCard(content, options = {}) {
        const borderTop = options.borderTopColor ? `border-top: 5px solid ${options.borderTopColor};` : '';
        const borderLeft = options.borderLeftColor ? `border-left: 5px solid ${options.borderLeftColor};` : '';

        return `
            <div class="emg-card" style="${borderTop} ${borderLeft} ${options.style || ''}">
                ${options.title ? `<h4 style="color: ${options.titleColor || DesignTokens.colors.text.heading}; margin-bottom: 15px;">${options.title}</h4>` : ''}
                <div class="card-content">
                    ${content}
                </div>
            </div>
        `;
    },

    /**
     * Renders a tab navigation container.
     */
    renderTabs(tabs, idPrefix = 'intro') {
        return `
            <div class="tabs-navigation-container" style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; justify-content: center;">
                ${tabs.map(tab => `
                    <button onclick="showIntroSection('${tab.id}')" id="${idPrefix}-${tab.id}-tab" class="intro-tab intro-tab-pill" 
                            style="padding: 14px 24px; font-size: 1em; color: ${DesignTokens.colors.text.muted}; background: white; cursor: pointer;">
                        ${tab.label}
                    </button>
                `).join('')}
            </div>
        `;
    }
};
