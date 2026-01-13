/**
 * Fundamentals.js
 * NCS Fundamentals Module - Refactored for modularity and standardized UI.
 * Extends BaseContent for unified behavior.
 */
import { BaseContent } from '../BaseContent.js';
import { NCSFundamentalsData } from './NCSFundamentalsData.js';
import { UIComponents } from '../../ui/UIComponents.js';
import { DesignTokens } from '../../ui/DesignTokens.js';

class FundamentalsModule extends BaseContent {
    constructor() {
        super({ defaultTab: 'foundations' });
        this.data = NCSFundamentalsData;
    }

    initialize() {
        console.log('📦 Initializing NCS Fundamentals Module (v2 Modular Expanded)');

        const tabColors = {
            'foundations': DesignTokens.gradients.anatomy,
            'methods': DesignTokens.gradients.technical,
            'technical': DesignTokens.gradients.safety,
            'interpretation': DesignTokens.gradients.cardinal,
            'calculations': DesignTokens.gradients.foundations,
            'quiz': DesignTokens.gradients.localization
        };

        this.initTabNavigation('ncs', tabColors, '.ncs-section');

        // Interactive logic for Calculations and Quiz
        window.checkNCSCalc = (btn, isCorrect) => this.handleCalculationAnswer(btn, isCorrect);
        window.checkNCSQuiz = (btn, isCorrect, feedback) => this.handleQuizAnswer(btn, isCorrect, feedback);
        window.nextNCSQuestion = (curr, total) => this.handleNextQuestion(curr, total);
    }

    handleCalculationAnswer(btn, isCorrect) {
        const parent = btn.parentElement;
        parent.querySelectorAll('button').forEach(b => {
            b.disabled = true;
            if (b === btn) {
                b.style.background = isCorrect ? DesignTokens.colors.successLight : DesignTokens.colors.dangerLight;
                b.style.borderColor = isCorrect ? DesignTokens.colors.success : DesignTokens.colors.danger;
                b.innerHTML += isCorrect ? ' ✅' : ' ❌';
            }
        });
    }

    handleQuizAnswer(btn, isCorrect, feedback) {
        const card = btn.closest('.quiz-question-card');
        card.querySelectorAll('.quiz-option').forEach(opt => opt.disabled = true);

        if (isCorrect) {
            btn.style.background = DesignTokens.colors.successLight;
            btn.style.borderColor = DesignTokens.colors.success;
            const scoreSpan = document.getElementById('quiz-score');
            if (scoreSpan) scoreSpan.textContent = parseInt(scoreSpan.textContent || '0') + 1;
        } else {
            btn.style.background = DesignTokens.colors.dangerLight;
            btn.style.borderColor = DesignTokens.colors.danger;
        }

        const feedbackDiv = card.querySelector('.quiz-feedback');
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.background = isCorrect ? DesignTokens.colors.successLight : DesignTokens.colors.dangerLight;
        feedbackDiv.innerHTML = `<strong>${isCorrect ? 'Correct!' : 'Incorrect.'}</strong> ${feedback || ''}`;

        const nextBtn = card.querySelector('.quiz-next-btn');
        if (nextBtn) nextBtn.style.display = 'inline-block';
    }

    handleNextQuestion(current, total) {
        document.querySelector(`[data-question="${current}"]`).style.display = 'none';
        if (current + 1 < total) {
            document.querySelector(`[data-question="${current + 1}"]`).style.display = 'block';
        } else {
            document.getElementById('quiz-complete').style.display = 'block';
            document.getElementById('final-score').textContent = document.getElementById('quiz-score').textContent;
        }
    }

    renderQuiz() {
        return this.data.quiz.map((q, idx) => `
            <div class="ncs-hover-card quiz-question-card" style="background: white; padding: 25px; border-radius: 12px; border: 2px solid ${DesignTokens.colors.border}; display: ${idx === 0 ? 'block' : 'none'};" data-question="${idx}">
                <p style="font-size: 1.1em; font-weight: 600; margin-bottom: 20px;">
                    <span style="background: ${DesignTokens.colors.primary}; color: white; padding: 4px 10px; border-radius: 6px; margin-right: 10px;">Q${idx + 1}</span>
                    ${q.question}
                </p>
                <div class="quiz-options" style="display: grid; gap: 10px;">
                    ${q.options.map(opt => `
                        <button class="quiz-option" onclick="window.checkNCSQuiz(this, ${opt.correct}, '${opt.feedback || ''}')" 
                                style="padding: 15px; border: 2px solid ${DesignTokens.colors.border}; border-radius: 8px; text-align: left; cursor: pointer; background: white; transition: all 0.2s;">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" style="margin-top: 15px; padding: 15px; border-radius: 8px; display: none;"></div>
                <button class="quiz-next-btn btn-primary" style="margin-top: 20px; display:none;" onclick="window.nextNCSQuestion(${idx}, ${this.data.quiz.length})">Next →</button>
            </div>
        `).join('');
    }

    generateContent() {
        return `
            ${this.getStandardStyles()}
            <div class="interactive-content" style="max-width: 1200px; margin: 0 auto; animation: fadeIn 0.5s ease-out;">
                
                ${UIComponents.renderHeader(this.data.header.title, this.data.header.subtitle)}
                ${UIComponents.renderTabs(this.data.tabs, 'ncs')}

                <!-- 1. Physics & Physiology -->
                <div id="ncs-foundations-section" class="ncs-section">
                    <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 30px; border-radius: 20px; margin-bottom: 30px; box-shadow: ${DesignTokens.shadows.md};">
                        <h4 style="color: #92400e; margin-bottom: 25px; font-size: 1.5em; border-bottom: 2px solid rgba(146, 64, 14, 0.1); padding-bottom: 10px;">Nerve Physiology & Action Potentials</h4>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 25px;">
                            ${UIComponents.renderCard(`
                                <h5 style="color: #92400e; margin-bottom: 15px; display: flex; align-items: center;"><span style="margin-right: 10px;">⚡</span> Action Potential Phases</h5>
                                <div style="overflow-x: auto;">
                                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                        <thead>
                                            <tr style="text-align: left; color: #b45309; border-bottom: 1px solid #fde68a;">
                                                <th style="padding: 8px;">Phase</th>
                                                <th style="padding: 8px;">Potential</th>
                                                <th style="padding: 8px;">Mechanism</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${this.data.physiology.actionPotential.map(p => `
                                                <tr style="border-bottom: 1px solid rgba(251, 191, 36, 0.1);">
                                                    <td style="padding: 8px; font-weight: 600;">${p.stage}</td>
                                                    <td style="padding: 8px; color: #d97706;"><code>${p.value}</code></td>
                                                    <td style="padding: 8px; font-size: 0.85em;">${p.detail}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            `, { borderLeftColor: '#f59e0b' })}

                            ${UIComponents.renderCard(`
                                <h5 style="color: #059669; margin-bottom: 15px; display: flex; align-items: center;"><span style="margin-right: 10px;">🏎️</span> Conduction Principles</h5>
                                <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #d1fae5; margin-bottom: 15px;">
                                    <strong style="color: #065f46; display: block; margin-bottom: 5px;">${this.data.physiology.conduction.process}</strong>
                                    <p style="font-size: 0.9em; line-height: 1.4; color: #374151;">${this.data.physiology.conduction.detail}</p>
                                </div>
                                <div style="background: #ecfdf5; padding: 12px; border-radius: 8px; font-size: 0.85em; color: #065f46;">
                                    <strong>Clinical Insight:</strong> ${this.data.physiology.conduction.staircase}
                                </div>
                            `, { borderLeftColor: '#059669' })}
                        </div>

                        ${UIComponents.renderCard(`
                            <h5 style="color: #1e40af; margin-bottom: 20px; text-align: center;">Fiber Type Classification</h5>
                            <div style="overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                                    <thead style="background: #eff6ff;">
                                        <tr>
                                            <th style="padding: 12px; border-bottom: 2px solid #bfdbfe;">Fiber Type</th>
                                            <th style="padding: 12px; border-bottom: 2px solid #bfdbfe;">Diameter</th>
                                            <th style="padding: 12px; border-bottom: 2px solid #bfdbfe;">Velocity</th>
                                            <th style="padding: 12px; border-bottom: 2px solid #bfdbfe;">Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.data.physiology.fiberTypes.map(f => `
                                            <tr style="background: white; border-bottom: 1px solid #f1f5f9;">
                                                <td style="padding: 12px; font-weight: bold; color: ${DesignTokens.colors.primary};"><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${f.color}; margin-right:8px;"></span>${f.name}</td>
                                                <td style="padding: 12px;">${f.diameter}</td>
                                                <td style="padding: 12px;"><code>${f.velocity}</code></td>
                                                <td style="padding: 12px; font-size: 0.9em;">${f.function}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `, { borderLeftColor: '#3b82f6' })}
                    </div>
                </div>

                <!-- 2. Setup & Methods -->
                <div id="ncs-methods-section" class="ncs-section" style="display: none;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px;">
                        ${UIComponents.renderCard(`
                            <h5 style="color: #1e293b; margin-bottom: 15px;">Recording Principles</h5>
                            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                                <strong style="color: #475569; display: block; margin-bottom: 10px;">${this.data.methods.recording.montage}</strong>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: 10px;"><span style="color: ${DesignTokens.colors.primary}; font-weight: bold;">G1:</span> ${this.data.methods.recording.g1}</li>
                                    <li style="margin-bottom: 10px;"><span style="color: ${DesignTokens.colors.secondary}; font-weight: bold;">G2:</span> ${this.data.methods.recording.g2}</li>
                                </ul>
                                <div style="margin-top: 15px; padding: 12px; background: #fffbeb; border-radius: 8px; font-size: 0.9em; border: 1px solid #fef3c7;">
                                    <strong>The "G1-G2" Differential:</strong> ${this.data.methods.recording.principle}
                                </div>
                            </div>
                        `, { title: "Clinical Setup", borderLeftColor: DesignTokens.colors.primary })}

                        ${UIComponents.renderCard(`
                            <h5 style="color: #1e293b; margin-bottom: 15px;">Antidromic vs Orthodromic</h5>
                            <div style="display: grid; gap: 10px;">
                                ${this.data.methods.direction.map(dir => `
                                    <div style="background: white; border: 1px solid #f1f5f9; padding: 15px; border-radius: 10px;">
                                        <strong style="color: ${DesignTokens.colors.primary}; display: block; margin-bottom: 4px;">${dir.type}</strong>
                                        <div style="font-size: 0.85em; color: #64748b; margin-bottom: 8px;">${dir.direction}</div>
                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                            <div style="color: #059669; font-size: 0.85em;"><strong>+</strong> ${dir.pros}</div>
                                            <div style="color: #dc2626; font-size: 0.85em;"><strong>-</strong> ${dir.cons}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `, { borderLeftColor: DesignTokens.colors.secondary })}
                    </div>
                </div>

                <!-- 3. Technical Factors -->
                <div id="ncs-technical-section" class="ncs-section" style="display: none;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        ${UIComponents.renderCard(`
                            <h5 style="color: #92400e; margin-bottom: 15px;">${this.data.technicalFactors.temperature.title}</h5>
                            <p style="font-size: 0.9em; color: #4b5563; margin-bottom: 15px;">${this.data.technicalFactors.temperature.effects}</p>
                            <div style="background: #fff9db; padding: 15px; border-radius: 12px; font-family: monospace; font-size: 0.95em;">
                                ${this.data.technicalFactors.temperature.correction}
                            </div>
                            <p style="margin-top: 10px; font-weight: bold; color: #92400e;">Target: ${this.data.technicalFactors.temperature.ideal}</p>
                        `, { borderLeftColor: '#f59e0b' })}

                        ${UIComponents.renderCard(`
                            <h5 style="color: #1e40af; margin-bottom: 15px;">Filter Settings</h5>
                            <div style="display: grid; gap: 12px;">
                                ${this.data.technicalFactors.filters.map(f => `
                                    <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border: 1px solid #e0f2fe;">
                                        <strong style="display: block; color: #0369a1;">${f.type}</strong>
                                        <code>LFF: ${f.lff} | HFF: ${f.hff}</code>
                                        <p style="font-size: 0.8em; margin-top: 5px; color: #64748b;">${f.note}</p>
                                    </div>
                                `).join('')}
                            </div>
                        `, { borderLeftColor: '#3b82f6' })}

                        ${UIComponents.renderCard(`
                            <h5 style="color: #b91c1c; margin-bottom: 15px;">Stimulus Artifact & Noise</h5>
                            <strong style="font-size: 0.9em;">Common Mitigation:</strong>
                            <ul style="font-size: 0.85em; color: #4b5563; padding-left: 15px; margin-top: 8px;">
                                ${this.data.technicalFactors.artifact.mitigation.map(m => `<li>${m}</li>`).join('')}
                            </ul>
                            <div style="margin-top: 15px; padding: 10px; background: #fef2f2; border-radius: 6px; font-size: 0.85em;">
                                <strong>60Hz Tip:</strong> ${this.data.technicalFactors.noise.solution}
                            </div>
                        `, { borderLeftColor: '#ef4444' })}
                    </div>
                </div>

                <!-- 4. Interpretation -->
                <div id="ncs-interpretation-section" class="ncs-section" style="display: none;">
                    <div style="display: grid; gap: 20px;">
                        ${Object.values(this.data.interpretation).map(p => `
                            ${UIComponents.renderCard(`
                                <h5 style="margin-bottom: 10px;">${p.title}</h5>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #cbd5e1;">
                                        <strong style="display: block; margin-bottom: 5px;">Primary Findings</strong>
                                        <p style="font-size: 0.9em; color: #475569;">${p.primary}</p>
                                    </div>
                                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #cbd5e1;">
                                        <strong style="display: block; margin-bottom: 5px;">Differential Logic</strong>
                                        <p style="font-size: 0.9em; color: #475569;">${p.secondary || p.block}</p>
                                    </div>
                                </div>
                                ${p.note || p.dispersion ? `<div style="margin-top: 15px; font-size: 0.85em; color: #64748b; font-style: italic;">Note: ${p.note || p.dispersion}</div>` : ''}
                            `, { borderLeftColor: DesignTokens.colors.primary })}
                        `).join('')}
                    </div>
                </div>

                <!-- 5. Math & Calculations -->
                <div id="ncs-calculations-section" class="ncs-section" style="display: none;">
                    <div style="background: ${DesignTokens.colors.surface}; padding: 30px; border-radius: 20px; border: 1px solid ${DesignTokens.colors.border};">
                        <h4 style="color: ${DesignTokens.colors.primary}; margin-bottom: 25px;">Interactive Calculation System</h4>
                        <div style="background: #f8fafc; border-radius: 12px; padding: 20px; border-left: 5px solid ${DesignTokens.colors.primary}; margin-bottom: 25px;">
                            <code>Formula: ${this.data.calculations.formula}</code>
                        </div>
                        
                        <div style="display: grid; gap: 20px; margin-bottom: 30px;">
                            ${this.data.calculations.practice.map((p, idx) => `
                                <div class="ncs-hover-card" style="background: white; padding: 25px; border-radius: 16px; border: 1px solid ${DesignTokens.colors.border}; border-top: 6px solid ${DesignTokens.colors.primary};">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                                        <span style="background: ${DesignTokens.colors.primary}20; color: ${DesignTokens.colors.primary}; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 0.8em;">SCENARIO ${idx + 1}</span>
                                        <span style="font-size: 0.9em; color: #64748b;">${p.category} Case</span>
                                    </div>
                                    <p style="font-size: 1.1em; color: #1e293b; margin-bottom: 20px; font-weight: 500;">${p.question}</p>
                                    
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
                                        <button class="btn-secondary" onclick="window.checkNCSCalc(this, ${p.answer === '50 m/s' || p.answer === '30 m/s'})">${p.answer}</button>
                                        <button class="btn-secondary" onclick="window.checkNCSCalc(this, false)">40 m/s</button>
                                        <button class="btn-secondary" onclick="window.checkNCSCalc(this, false)">60 m/s</button>
                                    </div>
                                    <div style="margin-top: 15px; padding: 12px; background: #f0f9ff; border-radius: 8px; font-size: 0.85em; color: #0369a1; display: none;" class="calc-feedback">
                                        <strong>Explanation:</strong> ${p.check}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- 6. Quiz -->
                <div id="ncs-quiz-section" class="ncs-section" style="display: none;">
                    <div style="background: linear-gradient(135deg, ${DesignTokens.colors.primary}, ${DesignTokens.colors.secondary}); padding: 30px; border-radius: 20px; margin-bottom: 30px; text-align: center; color: white;">
                        <h3 style="margin-bottom: 10px;">Knowledge Check</h3>
                        <p style="opacity: 0.9;">Validate your mastery of NCS Fundamentals</p>
                    </div>
                    
                    <div class="quiz-score-tracker" style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 30px; text-align: center; border: 2px solid ${DesignTokens.colors.border};">
                        <span style="font-size: 1.3em; font-weight: bold; color: ${DesignTokens.colors.primary};">
                            Score: <span id="quiz-score">0</span> / ${this.data.quiz.length}
                        </span>
                    </div>

                    <div class="quiz-container">
                        ${this.renderQuiz()}
                        <div id="quiz-complete" style="display: none; background: #ecfdf5; padding: 40px; border-radius: 20px; border: 3px solid #10b981; text-align: center; animation: slideIn 0.5s ease-out;">
                            <h3 style="color: #065f46; margin-bottom: 15px;">🎉 Quiz Complete!</h3>
                            <p style="color: #064e3b; font-size: 1.4em; margin: 0;">Final Score: <span id="final-score" style="font-weight: 800;"></span> / ${this.data.quiz.length}</p>
                            <button class="btn-primary" style="margin-top: 25px;" onclick="location.reload()">Restart Quiz</button>
                        </div>
                    </div>
                </div>

                <!-- Global Glossary (Always Visible at bottom) -->
                <div style="margin-top: 50px; border-top: 2px solid #e2e8f0; padding-top: 30px;">
                    <h5 style="color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.9em; margin-bottom: 20px;">Mastery Terms</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                        ${this.data.glossary.map(g => `
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

const fundamentalsModule = new FundamentalsModule();

export default {
    initialize() { fundamentalsModule.initialize(); },
    generateContent() { return fundamentalsModule.generateContent(); }
};
