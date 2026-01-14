/**
 * Introduction.js
 * EMG Introduction Module - Refactored for consolidated clinical content and fixed navigation.
 */
import { BaseContent } from '../BaseContent.js';
import { IntroductionData } from './IntroductionData.js';
import { UIComponents } from '../../ui/UIComponents.js';
import { DesignTokens } from '../../ui/DesignTokens.js';

class IntroductionModule extends BaseContent {
    constructor() {
        super({ defaultTab: 'philosophy' });
        this.data = IntroductionData;
    }

    initialize() {
        console.log('📦 Initializing EMG Introduction Module (v2 Consolidated)');

        const tabColors = {
            'philosophy': DesignTokens.gradients.foundations,
            'basics': DesignTokens.gradients.anatomy,
            'technical': DesignTokens.gradients.technical,
            'localization': DesignTokens.gradients.localization,
            'terminology': DesignTokens.gradients.terminology
        };

        this.initTabNavigation('intro', tabColors, '.emg-intro-section');

        // Inject search logic globally for the terminology tab
        window.filterGlossary = this.handleGlossarySearch.bind(this);
    }

    handleGlossarySearch() {
        const input = document.getElementById('glossary-search');
        if (!input) return;

        const filter = input.value.toUpperCase();
        const container = document.getElementById('glossary-container');
        const cards = container.getElementsByClassName('glossary-card');

        for (let i = 0; i < cards.length; i++) {
            const title = cards[i].querySelector('h5').textContent.toUpperCase();
            const def = cards[i].querySelector('p').textContent.toUpperCase();
            cards[i].style.display = (title.includes(filter) || def.includes(filter)) ? "" : "none";
        }
    }

    renderGlossary() {
        const categories = {
            'NCS': '#2563eb', 'EMG': '#db2777', 'Anatomy': '#7c3aed',
            'Technical': '#ea580c', 'Pathology': '#dc2626', 'Physiology': '#059669'
        };

        return this.data.glossary.sort((a, b) => a.term.localeCompare(b.term)).map(item => `
            <div class="glossary-card emg-card" style="border-left: 5px solid ${categories[item.category] || '#ccc'}; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <h5 style="color: #334155; margin: 0; font-size: 1.1em; font-weight: 700;">${item.term}</h5>
                    <span style="background: ${categories[item.category]}20; color: ${categories[item.category]}; font-size: 0.7em; padding: 2px 8px; border-radius: 10px; font-weight: 600; text-transform: uppercase;">${item.category}</span>
                </div>
                <p style="margin: 0; color: #64748b; font-size: 0.9em; line-height: 1.5;">${item.def}</p>
            </div>
        `).join('');
    }

    generateContent() {
        return `
            ${this.getStandardStyles()}
            <div class="interactive-content" style="max-width: 1200px; margin: 0 auto; animation: fadeIn 0.5s ease-out;">
                
                ${UIComponents.renderHeader(this.data.header.title, this.data.header.subtitle)}
                ${UIComponents.renderTabs(this.data.tabs, 'intro')}

                <!-- 1. Clinical Philosophy -->
                <div id="intro-philosophy-section" class="emg-intro-section">
                    ${UIComponents.renderCard(`
                        <p style="font-size: 1.15em; line-height: 1.6; color: #1e293b; margin-bottom: 15px;">
                            ${this.data.philosophy.core.text}
                        </p>
                        <div style="background: ${DesignTokens.colors.primary}10; padding: 15px; border-radius: 12px; border-left: 5px solid ${DesignTokens.colors.primary};">
                            <strong style="color: ${DesignTokens.colors.primary};">The Gold Standard:</strong> ${this.data.philosophy.core.aim}
                        </div>
                    `, { title: "Clinical Correlation is King", borderLeftColor: DesignTokens.colors.primary, style: 'margin-bottom: 30px;' })}

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;">
                        ${this.data.philosophy.encounter.map(step => `
                            <div class="emg-card" style="border-top: 4px solid ${DesignTokens.colors.secondary};">
                                <div style="color: ${DesignTokens.colors.secondary}; font-weight: 800; font-size: 0.8em; margin-bottom: 8px;">STEP ${step.step}</div>
                                <h5 style="margin-bottom: 10px;">${step.title}</h5>
                                <p style="font-size: 0.9em; color: #475569;">${step.detail}</p>
                            </div>
                        `).join('')}
                    </div>

                    <h4 style="color: #334155; margin-bottom: 20px;">The 6 Cardinal Rules (Preston & Shapiro)</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        ${this.data.philosophy.cardinalRules.map(rule => `
                            <div class="emg-card" style="border-top: 4px solid ${rule.color};">
                                <div style="background: ${rule.color}; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8em; font-weight: 800; margin-bottom: 10px;">${rule.id}</div>
                                <h5 style="color: ${rule.color};">${rule.title}</h5>
                                <p style="font-size: 0.9em; color: #475569;">${rule.text}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 2. EDX Basics -->
                <div id="intro-basics-section" class="emg-intro-section" style="display: none;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 30px;">
                        ${this.data.basics.anatomy.map(item => `
                            <div class="emg-card" style="border-top: 5px solid #7c3aed;">
                                <h5 style="color: #4c1d95; margin-bottom: 15px;">${item.title}</h5>
                                ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 100%; border-radius: 8px; margin-bottom: 15px; border: 1px solid #e2e8f0;">` : ''}
                                <p style="font-size: 0.95em; color: #475569; line-height: 1.5;">${item.detail}</p>
                            </div>
                        `).join('')}
                        ${this.data.basics.physiology.map(item => `
                            <div class="emg-card" style="border-top: 5px solid #8b5cf6;">
                                <h5 style="color: #4c1d95; margin-bottom: 15px;">${item.title}</h5>
                                ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 100%; border-radius: 8px; margin-bottom: 15px; border: 1px solid #e2e8f0;">` : ''}
                                <p style="font-size: 0.95em; color: #475569; line-height: 1.5;">${item.detail}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${UIComponents.renderCard(`
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                                <h6 style="color: #1e3a8a; margin-bottom: 10px;">📡 Signal Processing</h6>
                                <p style="font-size: 0.9em;">${this.data.basics.equipment.amplifiers}</p>
                            </div>
                            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                                <h6 style="color: #1e3a8a; margin-bottom: 10px;">🎛️ Filter Settings</h6>
                                <p style="font-size: 0.9em;">${this.data.basics.equipment.filters}</p>
                            </div>
                        </div>
                    `, { title: "The EDX Machine", borderLeftColor: '#6366f1' })}
                </div>

                <!-- 3. Technical Excellence -->
                <div id="intro-technical-section" class="emg-intro-section" style="display: none;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
                        ${this.data.technical.physiologic.map(item => `
                            <div class="emg-card" style="border-left: 5px solid #f59e0b;">
                                <h5 style="color: #92400e;">${item.factor}</h5>
                                <p style="font-size: 0.95em; color: #475569;">${item.effect}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        ${this.data.technical.nonPhysiologic.map(item => `
                            <div class="emg-card" style="border-left: 5px solid #ef4444;">
                                <h5 style="color: #b91c1c;">${item.factor}</h5>
                                <p style="font-size: 0.9em; margin-bottom: 8px;"><strong>Cause:</strong> ${item.cause}</p>
                                <p style="font-size: 0.9em;">${item.mitigation || ''}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="emg-card" style="border-top: 5px solid #ef4444; background: #fef2f2;">
                        <h5 style="color: #b91c1c; margin-bottom: 15px;">Medical Safety & Precautions</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div>
                                <strong style="color: #991b1b;">Device Check:</strong>
                                <p style="font-size: 0.85em;">${this.data.technical.safety.pacemakers}</p>
                            </div>
                            <div>
                                <strong style="color: #991b1b;">Bleeding Risk:</strong>
                                <p style="font-size: 0.85em;">${this.data.technical.safety.anticoagulation}</p>
                            </div>
                            <div>
                                <strong style="color: #991b1b;">Infection Control:</strong>
                                <p style="font-size: 0.85em;">${this.data.technical.safety.infection}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4. Localization Patterns -->
                <div id="intro-localization-section" class="emg-intro-section" style="display: none;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px;">
                        ${this.data.localization.pathophysiology.map(item => `
                            <div class="emg-card" style="border-top: 5px solid ${item.type === 'Axonal Loss' ? '#dc2626' : '#2563eb'};">
                                <h5 style="color: ${item.type === 'Axonal Loss' ? '#991b1b' : '#1e3a8a'}; margin-bottom: 10px;">${item.type}</h5>
                                <p style="font-size: 0.95em; color: #1e293b; margin-bottom: 10px;"><strong>Key Findings:</strong> ${item.findings}</p>
                                <div style="background: #f8fafc; padding: 10px; border-radius: 8px; font-size: 0.85em;">
                                    <strong>Prognosis:</strong> ${item.prognosis}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    ${UIComponents.renderCard(`
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                                <thead style="background: #ecfdf5;">
                                    <tr>
                                        <th style="padding: 12px; border-bottom: 2px solid #10b981;">Site of Lesion</th>
                                        <th style="padding: 12px; border-bottom: 2px solid #10b981;">SNAP (Sensory)</th>
                                        <th style="padding: 12px; border-bottom: 2px solid #10b981;">CMAP (Motor)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.data.localization.patterns.map(p => `
                                        <tr style="border-bottom: 1px solid #f1f5f9;">
                                            <td style="padding: 12px; font-weight: bold;">${p.site}</td>
                                            <td style="padding: 12px;">${p.snap}</td>
                                            <td style="padding: 12px;">${p.cmap}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `, { title: "Anatomic Pattern Recognition", borderLeftColor: '#10b981' })}
                </div>

                <!-- 5. Terminology -->
                <div id="intro-terminology-section" class="emg-intro-section" style="display: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                        <h4 style="color: #be185d; margin: 0;">EDX Mastery Glossary</h4>
                        <input type="text" id="glossary-search" onkeyup="window.filterGlossary()" placeholder="Search mastery terms..." style="padding: 12px; border-radius: 12px; border: 1px solid #fce7f3; width: 300px; box-shadow: ${DesignTokens.shadows.sm};">
                    </div>
                    <div id="glossary-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                        ${this.renderGlossary()}
                    </div>
                </div>

                <!-- Global Mastery Terms (Always Visible at bottom) -->
                <div style="margin-top: 50px; border-top: 2px solid #e2e8f0; padding-top: 30px;">
                    <h5 style="color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.9em; margin-bottom: 20px;">Mastery Terms</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                        ${this.data.masteryTerms.map(g => `
                            <div style="background: #f8fafc; padding: 15px; border-radius: 10px; border: 1px solid #e2e8f0;">
                                <strong style="color: #1e293b; display: block; margin-bottom: 5px;">${g.term}</strong>
                                <p style="color: #64748b; font-size: 0.85em; margin: 0;">${g.definition}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

            </div>
        `;
    }
}

const introModule = new IntroductionModule();

// --- GLOBAL LEGACY INTERFACE ---
// These are exposed to ensure that legacy scripts in index.html or other untracked files
// can still call the EMG introduction logic without a ReferenceError.
window.generateEMGIntroductionContent = () => introModule.generateContent();
window.initializeEMGIntroduction = () => introModule.initialize();
window.showEMGSection = (sectionId) => introModule.showTab(sectionId); // Mapping showEMGSection to showTab

export default {
    initialize() { introModule.initialize(); },
    generateContent() { return introModule.generateContent(); }
};
