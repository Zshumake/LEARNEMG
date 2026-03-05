import { ClinicalTables } from './components/ClinicalTables.js';
import { ClinicalEvaluator } from './ClinicalEvaluator.js';

export const ClinicalRenderer = {
    getSvgIcon(name, color = "currentColor", size = "24") {
        const base = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
        const icons = {
            folder: `${base}<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
            beginner: `${base}<path d="M12 22V12"></path><path d="M12 12C12 12 7 7 4 9C1 11 5 17 12 17"></path><path d="M12 12C12 12 17 7 20 9C23 11 19 17 12 17"></path><path d="M12 2A4 4 0 0 0 8 6C8 9 12 12 12 12C12 12 16 9 16 6A4 4 0 0 0 12 2Z"></path></svg>`,
            intermediate: `${base}<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
            expert: `${base}<path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M11 3 8 9l4 13"></path><path d="M13 3l3 6-4 13"></path><path d="M2 9h20"></path></svg>`,
            stethoscope: `${base}<path d="M4 14a8 8 0 0 0 16 0V6a2 2 0 1 0-4 0v8a4 4 0 0 1-8 0V6a2 2 0 1 0-4 0v8z"></path><path d="M14 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4"></path></svg>`,
            hand: `${base}<path d="M18 11V6a2 2 0 0 0-4 0v5"></path><path d="M14 10V4a2 2 0 0 0-4 0v6"></path><path d="M10 10.5V3a2 2 0 0 0-4 0v9"></path><path d="M6 12v-1a2 2 0 0 0-4 0v8a8 8 0 0 0 16 0V11a2 2 0 0 0-4 0v2"></path></svg>`,
            brain: `${base}<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>`,
            lightning: `${base}<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
            check: `${base}<polyline points="20 6 9 17 4 12"></polyline></svg>`,
            x: `${base}<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            chart: `${base}<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
            star: `${base}<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
            trophy: `${base}<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
            microscope: `${base}<path d="M6 18h8"></path><path d="M3 22h18"></path><path d="M14 22a7 7 0 1 0 0-14h-1"></path><path d="M9 14h2"></path><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path></svg>`,
            neck: `${base}<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>`,
            plug: `${base}<path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>`,
            scale: `${base}<path d="M3 6h18"></path><path d="M12 6v16"></path><path d="m5 6-3 7c0 1.66 2.69 3 6 3s6-1.34 6-3l-3-7"></path><path d="m19 6-3 7c0 1.66 2.69 3 6 3s6-1.34 6-3l-3-7"></path></svg>`,
            target: `${base}<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
            wrench: `${base}<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
            cap: `${base}<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`
        };
        return icons[name] || icons.check;
    },

    renderDashboard: function (pgyLevel, caseDatabase, selectedDifficulty = 'all') {
        let caseListHtml = '';
        if (caseDatabase) {
            caseListHtml = '<div class="case-list-container" style="margin-top: 50px;">';
            const displayDifficulty = selectedDifficulty === 'difficult' ? 'Expert' : (selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1));
            caseListHtml += `<h3 style="color: #0f172a; text-align: center; margin-bottom: 25px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px;">
                ${this.getSvgIcon('folder', '#3b82f6')} ${selectedDifficulty === 'all' ? 'All Patient' : displayDifficulty} Case Load
            </h3>`;
            caseListHtml += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 10px;">';

            for (const [id, caseData] of Object.entries(caseDatabase)) {
                if (selectedDifficulty !== 'all' && caseData.difficulty !== selectedDifficulty) continue;

                const difficultyColor = caseData.difficulty === 'beginner' ? '#10b981' : (caseData.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444');

                caseListHtml += `
                    <div class="difficulty-card" onclick="window.appComponents.clinicalCases.startSpecificCase('${id}')" 
                         style="width: auto; padding: 20px; border-bottom: 4px solid ${difficultyColor}; text-align: left; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer;">
                        <div style="font-size: 1.1em; font-weight: 700; color: #0f172a; margin-bottom: 8px;">${caseData.title}</div>
                        <div style="font-size: 11px; letter-spacing: 1px; color: #64748b; text-transform: uppercase; display: flex; align-items: center; gap: 5px; font-weight: 600;">
                            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${difficultyColor};"></span>
                            ${caseData.difficulty}
                        </div>
                    </div>
                 `;
            }
            caseListHtml += '</div></div>';
        }

        const activeStyles = {
            beginner: 'background: linear-gradient(135deg, #10b981, #059669); color: white; border-color: transparent;',
            intermediate: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border-color: transparent;',
            difficult: 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border-color: transparent;'
        };

        return `
            <style>
                .difficulty-cards-centered {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                .large-diff-card {
                    width: 300px !important;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    cursor: pointer;
                    color: #0f172a;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .large-diff-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
                }
                .large-diff-card.active {
                    transform: translateY(-5px);
                }
                .large-diff-card.beginner-card:hover, .large-diff-card.beginner-card.active {
                    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
                    border-color: #10b981;
                    z-index: 10;
                }
                .large-diff-card.intermediate-card:hover, .large-diff-card.intermediate-card.active {
                    box-shadow: 0 15px 30px rgba(245, 158, 11, 0.4);
                    border-color: #f59e0b;
                    z-index: 10;
                }
                .large-diff-card.difficult-card:hover, .large-diff-card.difficult-card.active {
                    box-shadow: 0 15px 30px rgba(239, 68, 68, 0.4);
                    border-color: #ef4444;
                    z-index: 10;
                }
            </style>
            <div class="advanced-mesh-bg" style="min-height: 100%; border-radius: 12px; margin: -30px; padding: 30px;">
            <div id="case-selection" class="difficulty-selector" style="background: transparent; border: none; box-shadow: none;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h3 class="selector-title" style="color: #f8fafc; font-size: 2em; font-weight: 800; margin-bottom: 10px;">Clinical Correlation Lab</h3>
                    <p class="selector-subtitle" style="color: #94a3b8; font-size: 1.1em;">Master the diagnostic pathway through real-world patient scenarios</p>
                </div>

                <div class="difficulty-cards-centered">
                    <div class="difficulty-card large-diff-card beginner-card glass-card ${selectedDifficulty === 'beginner' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'beginner' ? activeStyles.beginner : ''}"
                         onclick="window.appComponents.clinicalCases.setFilter('beginner')">
                        <div class="card-icon" style="margin-bottom: 15px; color: ${selectedDifficulty === 'beginner' ? 'white' : '#10b981'};">
                            ${this.getSvgIcon('beginner', 'currentColor', '64')}
                        </div>
                        <div class="card-title" style="font-size: 1.6em; margin-bottom: 8px; font-weight: 700; color: #f8fafc;">Beginner</div>
                        <div class="card-subtitle" style="font-weight: 600; font-size: 0.8em; letter-spacing: 1px; color: ${selectedDifficulty === 'beginner' ? 'rgba(255,255,255,0.8)' : '#94a3b8'};">FOUNDATIONAL SKILLS</div>
                    </div>
                    <div class="difficulty-card large-diff-card intermediate-card glass-card ${selectedDifficulty === 'intermediate' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'intermediate' ? activeStyles.intermediate : ''}"
                         onclick="window.appComponents.clinicalCases.setFilter('intermediate')">
                        <div class="card-icon" style="margin-bottom: 15px; color: ${selectedDifficulty === 'intermediate' ? 'white' : '#f59e0b'};">
                            ${this.getSvgIcon('intermediate', 'currentColor', '64')}
                        </div>
                        <div class="card-title" style="font-size: 1.6em; margin-bottom: 8px; font-weight: 700; color: #f8fafc;">Intermediate</div>
                        <div class="card-subtitle" style="font-weight: 600; font-size: 0.8em; letter-spacing: 1px; color: ${selectedDifficulty === 'intermediate' ? 'rgba(255,255,255,0.8)' : '#94a3b8'};">CLINICAL REASONING</div>
                    </div>
                    <div class="difficulty-card large-diff-card difficult-card glass-card ${selectedDifficulty === 'difficult' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'difficult' ? activeStyles.difficult : ''}"
                         onclick="window.appComponents.clinicalCases.setFilter('difficult')">
                        <div class="card-icon" style="margin-bottom: 15px; color: ${selectedDifficulty === 'difficult' ? 'white' : '#ef4444'};">
                            ${this.getSvgIcon('expert', 'currentColor', '64')}
                        </div>
                        <div class="card-title" style="font-size: 1.6em; margin-bottom: 8px; font-weight: 700; color: #f8fafc;">Expert</div>
                        <div class="card-subtitle" style="font-weight: 600; font-size: 0.8em; letter-spacing: 1px; color: ${selectedDifficulty === 'difficult' ? 'rgba(255,255,255,0.8)' : '#94a3b8'};">COMPLEX LOCALIZATION</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
                     ${selectedDifficulty !== 'all' ? '<button class="dashboard-card-btn glass-btn" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.4);" onclick="window.appComponents.clinicalCases.setFilter(\'all\')">Show All Cases</button>' : ''}
                </div>

                ${caseListHtml}
            </div>
            </div>
            ${this.renderInterfaceShell()}
        `;
    },

    renderInterfaceShell: function () {
        return `
            <div id="case-interface" class="advanced-mesh-bg" style="display: none; padding: 30px; border-radius: 12px; margin: -30px; min-height: 100%; max-width: none; width: calc(100% + 60px); box-sizing: border-box;">
                <div class="glass-card" style="border-radius: 16px; padding: 30px; max-width: 1200px; margin: 0 auto; box-sizing: border-box; min-height: calc(100vh - 120px);">
                <div class="case-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(6, 182, 212, 0.1); padding-bottom: 20px; margin-bottom: 30px;">
                    <button class="dashboard-card-btn glass-btn" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 8px 16px; border-radius: 6px; font-weight: 600;" onclick="window.appComponents.clinicalCases.startNewCase()">← End Case</button>
                    <h3 style="margin: 0; font-weight: 800; font-size: 1.4em; color: #f8fafc; display: flex; align-items: center; gap: 10px;">
                        ${this.getSvgIcon('stethoscope', '#06b6d4')} Case Investigation
                    </h3>
                    <div style="width: 150px;">
                        <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: 4px; overflow: hidden; width: 100%;">
                            <div id="progress-fill" style="background: #06b6d4; height: 100%; width: 0%; transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);"></div>
                        </div>
                    </div>
                </div>

                <div id="case-steps-container" style="position: relative; min-height: 400px;">
                    <div id="case-presentation-step" style="width: 100%; transition: all 0.4s ease;">
                        <div id="case-details"></div>
                        <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.4); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);" onclick="window.appComponents.clinicalCases.showPhysicalExam()">Initiate Physical Exam →</button>
                        </div>
                    </div>

                    <div id="physical-exam-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px; color: #f8fafc;">
                            <div style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; padding: 8px; border-radius: 8px;">${this.getSvgIcon('hand', 'currentColor')}</div>
                            Physical Examination
                        </h3>
                        <div id="physical-exam-details" class="exam-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"></div>
                        <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(139, 92, 246, 0.15); color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.4); box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);" onclick="window.appComponents.clinicalCases.showDifferentialBuilder()">Formulate Differential →</button>
                        </div>
                    </div>

                    <div id="differential-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #f8fafc;">
                            <div style="background: rgba(139, 92, 246, 0.15); color: #c4b5fd; padding: 8px; border-radius: 8px;">${this.getSvgIcon('brain', 'currentColor')}</div>
                            Clinical Reasoning
                        </h3>
                        <p style="color: #94a3b8; font-size: 1.05em; margin-bottom: 25px;">Based on the history and exam, what are your primary considerations?</p>
                        
                        <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                            <textarea id="differential-input" placeholder="List your differential diagnosis here..." style="width: 100%; min-height: 120px; padding: 15px; border-radius: 8px; border: 1px solid rgba(139, 92, 246, 0.4); background: rgba(0, 0, 0, 0.2); color: #f8fafc; font-size: 1.05em; margin-bottom: 15px; resize: vertical;"></textarea>
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.5); width: 100%;" onclick="window.appComponents.clinicalCases.analyzeDifferential()">Analyze Differential</button>
                        </div>
                        
                        <div id="differential-feedback" style="display: none; margin-bottom: 30px;"></div>
                        
                        <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
                            <button id="continue-to-studies" class="dashboard-card-btn glass-btn" style="display: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none;" onclick="window.appComponents.clinicalCases.showEMGDecision()">Next: Diagnostic Strategy →</button>
                        </div>
                    </div>

                    <div id="emg-decision-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #f8fafc;">
                            <div style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; padding: 8px; border-radius: 8px;">${this.getSvgIcon('lightning', 'currentColor')}</div>
                            Diagnostic Plan
                        </h3>
                        <p style="color: #94a3b8; margin-bottom: 30px;">Is an Electrodiagnostic (EMG/NCS) evaluation indicated for this presentation?</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                            <div class="difficulty-card glass-card" onclick="window.appComponents.clinicalCases.makeEMGDecision(true)" style="padding: 30px; border-bottom: 4px solid #10b981; border-radius: 12px; cursor: pointer; text-align: center; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                                <div style="margin-bottom: 15px; color: #10b981;">${this.getSvgIcon('check', 'currentColor', '48')}</div>
                                <div style="font-weight: 700; font-size: 1.2em; color: #f8fafc;">Indicated</div>
                                <p style="font-size: 0.9em; color: #94a3b8; margin: 8px 0 0 0;">Proceed with studies to localize lesion</p>
                            </div>
                            <div class="difficulty-card glass-card" onclick="window.appComponents.clinicalCases.makeEMGDecision(false)" style="padding: 30px; border-bottom: 4px solid #ef4444; border-radius: 12px; cursor: pointer; text-align: center; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                                <div style="margin-bottom: 15px; color: #ef4444;">${this.getSvgIcon('x', 'currentColor', '48')}</div>
                                <div style="font-weight: 700; font-size: 1.2em; color: #f8fafc;">Not Indicated</div>
                                <p style="font-size: 0.9em; color: #94a3b8; margin: 8px 0 0 0;">Rely on clinical diagnosis alone</p>
                            </div>
                        </div>
                        <div id="emg-decision-feedback" style="display: none;"></div>
                        <div style="text-align: center; margin-top: 30px; padding-bottom: 20px;">
                            <button id="continue-after-decision" class="dashboard-card-btn glass-btn" style="display: none; background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.4); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);" onclick="window.appComponents.clinicalCases.proceedAfterDecision()">Proceed to Investigation →</button>
                        </div>
                    </div>

                    <div id="results-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px; color: #f8fafc;">
                            <div style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; padding: 8px; border-radius: 8px;">${this.getSvgIcon('chart', 'currentColor')}</div>
                            Electrodiagnostic Findings
                        </h3>
                        <div id="ncs-results"></div>
                        <h3 id="emg-results" style="display: none; margin-top: 40px; border-top: 2px solid rgba(6, 182, 212, 0.1); padding-top: 30px; color: #f8fafc;">Needle EMG Data</h3>
                        <div id="emg-details"></div>
                        <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);" onclick="window.appComponents.clinicalCases.showFinalDiagnosis()">Formulate Conclusion →</button>
                        </div>
                    </div>

                    <div id="diagnosis-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #f8fafc;">
                            <div style="background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 8px; border-radius: 8px;">${this.getSvgIcon('star', 'currentColor')}</div>
                            Definitive Diagnosis
                        </h3>
                        <p style="color: #94a3b8; margin-bottom: 25px;">Synthesize all clinical and EDX data to provide the specific diagnosis.</p>

                        <input type="text" id="final-diagnosis" class="clinical-textarea" style="width: 100%; padding: 15px; border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(0, 0, 0, 0.2); color: #f8fafc; border-radius: 8px; font-size: 1.1em; margin-bottom: 25px; font-family: inherit;" placeholder="Type specific diagnosis (e.g. Severe CTS)...">
                        
                        <div style="display: flex; justify-content: center;">
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 12px 30px; font-size: 1.1em; border: 1px solid rgba(16, 185, 129, 0.5); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);" onclick="window.appComponents.clinicalCases.checkFinalDiagnosis()">Submit Investigation</button>
                        </div>
                        
                        <div id="diagnosis-feedback" style="margin-top: 30px; display: none;"></div>
                        
                        <div style="text-align: center; margin-top: 50px; border-top: 2px solid rgba(6, 182, 212, 0.1); padding-top: 30px;">
                             <button class="dashboard-card-btn glass-btn" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(248, 250, 252, 0.2); color: #94a3b8;" onclick="window.appComponents.clinicalCases.startNewCase()">Complete Case & Return to Dashboard</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    },

    renderCaseDetails: function (caseData) {
        const c = caseData.presentation;
        const diffColors = {
            beginner: '#10b981',
            intermediate: '#f59e0b',
            difficult: '#ef4444'
        };
        const badgeColor = diffColors[caseData.difficulty] || '#3b82f6';

        return `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; border-bottom: 2px solid rgba(6, 182, 212, 0.1); padding-bottom: 20px;">
                <h2 style="margin: 0; font-weight: 800; color: #f8fafc; font-size: 1.6em;">${caseData.title}</h2>
                <div style="display: flex; gap: 10px; align-items: center; color: #94a3b8; font-size: 0.9em; font-weight: 600; text-transform: uppercase;">
                    <span style="background: ${badgeColor}20; color: ${badgeColor}; padding: 4px 10px; border-radius: 20px; font-size: 0.8em; box-shadow: 0 0 10px ${badgeColor}40;">${caseData.difficulty}</span>
                    <span>•</span>
                    <span>Age: ${c.age}</span>
                    <span>•</span>
                    <span>${c.gender}</span>
                    <span>•</span>
                    <span>${c.occupation}</span>
                </div>
            </div>

            <div class="medical-history-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Chief Complaint</h5>
                    <p style="font-size: 1.1em; color: #f8fafc; font-weight: 700; margin: 0;">"${c.chiefComplaint}"</p>
                </div>
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">History of Present Illness</h5>
                    <p style="color: #e2e8f0; line-height: 1.6; margin: 0;">${c.history}</p>
                </div>
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Medical History</h5>
                    <p style="color: #e2e8f0; margin: 0 0 10px 0;">${c.pmh}</p>
                    <div style="font-size: 0.85em; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;"><strong>Meds:</strong> ${c.medications || 'None'}</div>
                </div>
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Family/Social</h5>
                    <p style="color: #e2e8f0; margin: 0;">${c.familyHistory || 'Non-contributory'}</p>
                </div>
                ${caseData.reviewOfSystems ? `
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Review of Systems</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9em; color: #e2e8f0;">
                        ${Object.entries(caseData.reviewOfSystems).map(([sys, val]) => `<div><strong style="color: #f8fafc;">${sys.charAt(0).toUpperCase() + sys.slice(1)}:</strong> ${val}</div>`).join('')}
                    </div>
                </div>` : ''}
                ${caseData.humoralData && ((caseData.humoralData.labs && caseData.humoralData.labs.length > 0) || (caseData.humoralData.imaging && caseData.humoralData.imaging.length > 0)) ? `
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Ancillary Studies (Labs/Imaging)</h5>
                    <div style="font-size: 0.9em; color: #e2e8f0; display: flex; flex-direction: column; gap: 8px;">
                        ${caseData.humoralData.labs && caseData.humoralData.labs.length > 0 ? `<div><strong style="color: #f8fafc;">Labs:</strong> ${caseData.humoralData.labs.join(', ')}</div>` : ''}
                        ${caseData.humoralData.imaging && caseData.humoralData.imaging.length > 0 ? `<div><strong style="color: #f8fafc;">Imaging:</strong> ${caseData.humoralData.imaging.join(', ')}</div>` : ''}
                    </div>
                </div>` : ''}
            </div>
        `;
    },

    renderPhysicalExam: function (exam) {
        return `
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${this.getSvgIcon('hand', 'currentColor', '18')} Inspection</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.inspection}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${this.getSvgIcon('hand', 'currentColor', '18')} Palpation</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.palpation}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${this.getSvgIcon('neck', 'currentColor', '18')} Range of Motion</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.rom}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${this.getSvgIcon('lightning', 'currentColor', '18')} Motor Strength</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.strength}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${this.getSvgIcon('target', 'currentColor', '18')} Sensation</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.sensation}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${this.getSvgIcon('wrench', 'currentColor', '18')} Reflexes</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.reflexes}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;"><h5 style="margin: 0 0 8px 0; color: #c4b5fd; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${this.getSvgIcon('microscope', 'currentColor', '18')} Provocative & Special Tests</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.specialTests}</p></div>
        `;
    },

    renderDifferentialFeedback: function (results, expected) {
        let html = `
            <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; color: #22d3ee; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    ${this.getSvgIcon('chart', 'currentColor', '20')} Clinical Analysis Result
                </h4>
                <p style="margin: 0; color: #94a3b8;">Diagnostic capture: <strong style="color: #f8fafc;">${results.matched.length}</strong> / <strong style="color: #f8fafc;">${results.totalExpected}</strong> key considerations.</p>
            </div>
        `;

        if (results.matched.length > 0) {
            html += `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 15px;">
                    <h4 style="margin: 0 0 8px 0; color: #34d399; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                        ${this.getSvgIcon('check', 'currentColor', '20')} Valid Considerations
                    </h4>
                    <p style="margin: 0; color: #a7f3d0;">${results.matched.join(', ')}</p>
                </div>
            `;
        }

        html += `
            <div style="background: rgba(15, 23, 42, 0.5); border: 2px dashed rgba(148, 163, 184, 0.3); padding: 20px; border-radius: 12px;">
                <h4 style="margin: 0 0 8px 0; color: #94a3b8; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                    ${this.getSvgIcon('folder', 'currentColor', '20')} Diagnostic Progress
                </h4>
                <p style="margin: 0; font-size: 0.9em; color: #cbd5e1;">Capture is being recorded. Continue your investigation and EDX studies to reveal the definitive differential exclusion logic.</p>
            </div>
        `;
        return html;
    },

    renderEMGDecisionFeedback: function (evaluation) {
        const isCorrect = evaluation.type.includes('correct');
        const color = isCorrect ? '#34d399' : '#f87171';
        const bg = isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
        const border = isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        const title = isCorrect ? 'Clinical Correlation Accurate' : 'Strategy Reconsideration';
        const icon = isCorrect ? 'check' : 'x';

        let html = `
            <div style="background: ${bg}; border: 1px solid ${border}; padding: 25px; border-radius: 12px; border-left: 4px solid ${color};">
                <h4 style="color: ${color}; margin: 0 0 10px 0; display: flex; align-items: center; gap: 10px; font-size: 1.2em;">
                    ${this.getSvgIcon(icon, 'currentColor', '24')} ${title}
                </h4>
                <p style="font-size: 1.05em; line-height: 1.5; color: #f8fafc; margin: 0;">${evaluation.message}</p>
        `;

        if (evaluation.educationalNote) {
            html += `
                <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid ${border}; border-left: 3px solid #fbbf24; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h5 style="margin: 0 0 8px 0; color: #fbbf24; text-transform: uppercase; font-size: 0.8em; letter-spacing: 1px;">Clinical Learning Point</h5>
                    <p style="margin: 0; font-size: 0.95em; color: #e2e8f0;">${evaluation.educationalNote}</p>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    },

    renderFinalDiagnosis: function (isCorrect, currentCase, userDiagnosis) {
        const title = isCorrect ? 'Clinical Excellence' : 'Diagnostic Review';
        const color = isCorrect ? '#34d399' : '#22d3ee';
        const bg = isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(6, 182, 212, 0.1)';
        const icon = isCorrect ? 'trophy' : 'microscope';

        return `
            <div style="background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(24px); border: 1px solid ${color}40; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); margin-top: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="color: ${color}; margin-bottom: 15px; filter: drop-shadow(0 0 10px ${color}80);">
                        ${this.getSvgIcon(icon, 'currentColor', '64')}
                    </div>
                    <h3 style="margin: 0; color: ${color}; font-size: 2em; font-weight: 800; text-shadow: 0 0 10px ${color}40;">${title}</h3>
                </div>

                <div style="background: ${bg}; padding: 25px; border-radius: 12px; margin-bottom: 30px; text-align: center; border: 1px solid ${color}40;">
                    <div style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; font-weight: 600;">Confirmed Diagnosis</div>
                    <div style="font-size: 1.8em; font-weight: 800; color: #f8fafc;">${currentCase.correctDiagnosis}</div>
                </div>

                <div style="background: rgba(6, 182, 212, 0.05); border-left: 4px solid ${color}; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                    <h5 style="margin: 0 0 10px 0; color: ${color}; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Diagnostic Synthesis</h5>
                    <p style="margin: 0; line-height: 1.6; font-size: 1.05em; color: #e2e8f0;">${currentCase.explanation}</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <h5 style="margin: 0 0 15px 0; color: #94a3b8; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px; font-weight: 700;">Key Evidence Review</h5>
                    <div style="display: grid; gap: 12px;">
                        ${this.generateEvidenceReview(currentCase, color)}
                    </div>
                </div>

                ${currentCase.differentialDiagnosis && typeof currentCase.differentialDiagnosis[0] === 'object' ? `
                <div style="margin-bottom: 30px;">
                    <h5 style="margin: 0 0 15px 0; color: #94a3b8; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px; font-weight: 700;">Differential Exclusion Logic</h5>
                    <div style="background: rgba(15, 23, 42, 0.5); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.95em;">
                            <thead>
                                <tr style="background: rgba(255, 255, 255, 0.05); border-bottom: 2px solid rgba(255, 255, 255, 0.1);">
                                    <th style="padding: 15px; text-align: left; width: 40%; color: #94a3b8; font-weight: 600;">Diagnosis</th>
                                    <th style="padding: 15px; text-align: left; color: #94a3b8; font-weight: 600;">Rule-Out Reasoning</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${currentCase.differentialDiagnosis.map(diff => `
                                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        <td style="padding: 15px; color: ${diff.name === currentCase.correctDiagnosis ? '#34d399' : '#f8fafc'}; font-weight: ${diff.name === currentCase.correctDiagnosis ? '700' : '500'}; display: flex; align-items: center; gap: 8px;">
                                            ${diff.name === currentCase.correctDiagnosis ? this.getSvgIcon('check', '#34d399', '20') : ''}
                                            ${diff.name}
                                        </td>
                                        <td style="padding: 15px; color: #cbd5e1; line-height: 1.5;">${diff.ruleOut || diff.explanation || 'N/A'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                ` : ''}

            ${currentCase.teachingPoints ? `
                <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #fbbf24; padding: 25px; border-radius: 0 12px 12px 0;">
                    <h5 style="margin: 0 0 15px 0; color: #fbbf24; text-transform: uppercase; display: flex; align-items: center; gap: 8px; font-weight: 700;">
                        ${this.getSvgIcon('cap', 'currentColor', '20')} Clinical Pearls
                    </h5>
                    <ul style="margin: 0; padding-left: 20px; color: #e2e8f0; line-height: 1.6;">
                        ${currentCase.teachingPoints.map(point => `<li style="margin-bottom: 10px;">${point}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
    },

    generateEvidenceReview: function (caseData, color = '#22d3ee') {
        let evidence = [];

        if (caseData.physicalExam) {
            const exam = caseData.physicalExam;
            if (exam.specialTests) {
                const tests = exam.specialTests.toLowerCase();
                if (tests.includes('tinel')) {
                    evidence.push({ icon: 'hand', text: 'Positive Tinel sign suggests focal nerve irritability at the site of compression.' });
                }
                if (tests.includes('spurling')) {
                    evidence.push({ icon: 'neck', text: "Positive Spurling's test strongly suggests cervical nerve root irritation (radiculopathy)." });
                }
                if (tests.includes('phalen')) {
                    evidence.push({ icon: 'hand', text: "Positive Phalen's maneuver increases carpal tunnel pressure, confirming focal median nerve entrapment." });
                }
            }
        }

        const ncs = caseData.ncsStudies || caseData.ncsResults;
        if (ncs) {
            const sensory = ncs.sensory || ncs.sensoryStudies;
            const motor = ncs.motor || ncs.motorStudies;
            const comparison = ncs.comparison;

            if (sensory) {
                sensory.filter(s => s.abnormal).forEach(s => {
                    evidence.push({ icon: 'lightning', text: `Abnormal sensory response in ${s.name || s.nerve} suggests ${s.amp === 0 ? 'severe axonal loss' : 'axonal drop or focal demyelination'}.` });
                });
            }
            if (motor) {
                motor.filter(m => m.abnormal).forEach(m => {
                    evidence.push({ icon: 'plug', text: `Abnormal motor response in ${m.name || m.nerve} indicates motor axon involvement or conduction failure.` });
                });
            }
            if (comparison) {
                comparison.filter(c => c.abnormal).forEach(c => {
                    evidence.push({ icon: 'scale', text: `Side - to - side or internal comparison (${c.name}) confirms focal pathology ${c.deltaP ? `with a significant ${c.deltaP} difference` : ''}.` });
                });
            }
        }

        const emg = caseData.emgStudies || caseData.emgFindings;
        if (emg) {
            emg.filter(f => f.abnormal).forEach(f => {
                const hasDenervation = (f.fibs && f.fibs !== '0' && f.fibs !== 'None' && f.fibs !== 'Nml');
                const chronic = (f.motorUnits && (f.motorUnits.toLowerCase().includes('large') || f.motorUnits.toLowerCase().includes('polyphasic')));

                if (hasDenervation) {
                    evidence.push({ icon: 'target', text: `Active denervation (Fibs/PSWs) in ${f.muscle} confirms ${caseData.title.toLowerCase().includes('myopathy') ? 'muscle fiber necrosis' : 'acute/ongoing axonal injury'}.` });
                }
                if (chronic) {
                    evidence.push({ icon: 'wrench', text: `Motor unit remodeling in ${f.muscle} indicates chronic reinnervation and neuroplasticity.` });
                }
            });
        }

        if (evidence.length === 0) return '<p style="color: #64748b; font-style: italic; margin: 0;">No specific abnormalities identified to review.</p>';

        return evidence.slice(0, 5).map(e => `
            <div style="display: flex; gap: 12px; align-items: flex-start; background: rgba(15, 23, 42, 0.4); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <div style="color: ${color}; margin-top: 2px;">${this.getSvgIcon(e.icon, 'currentColor', '20')}</div>
                <div style="color: #cbd5e1; font-size: 0.95em; line-height: 1.5;">${e.text}</div>
            </div>
    `).join('');
    }
};
