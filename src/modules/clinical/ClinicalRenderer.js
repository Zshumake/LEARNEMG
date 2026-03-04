import { ClinicalTables } from './components/ClinicalTables.js';
import { ClinicalEvaluator } from './ClinicalEvaluator.js';

export const ClinicalRenderer = {
    renderDashboard: function (pgyLevel, caseDatabase, selectedDifficulty = 'all') {
        let caseListHtml = '';
        if (caseDatabase) {
            caseListHtml = '<div class="case-list-container" style="margin-top: 50px;">';
            const displayDifficulty = selectedDifficulty === 'difficult' ? 'Expert' : (selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1));
            caseListHtml += `<h3 style="color: white; text-align: center; margin-bottom: 25px; font-size: 1.5em; font-weight: 700;">📂 ${selectedDifficulty === 'all' ? 'All Patient' : displayDifficulty} Case Load</h3>`;
            caseListHtml += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 10px;">';

            for (const [id, caseData] of Object.entries(caseDatabase)) {
                if (selectedDifficulty !== 'all' && caseData.difficulty !== selectedDifficulty) continue;

                const difficultyColor = caseData.difficulty === 'beginner' ? '#10b981' : (caseData.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444');

                caseListHtml += `
                    <div class="difficulty-card" onclick="window.appComponents.clinicalCases.startSpecificCase('${id}')" 
                         style="width: auto; padding: 20px; border-bottom: 4px solid ${difficultyColor}; text-align: left;">
                        <div style="font-size: 1.2em; font-weight: 700; color: white; margin-bottom: 8px;">${caseData.title}</div>
                        <div style="font-size: 11px; letter-spacing: 1px; color: var(--clinical-text-muted); text-transform: uppercase; display: flex; align-items: center; gap: 5px;">
                            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${difficultyColor};"></span>
                            ${caseData.difficulty}
                        </div>
                    </div>
                 `;
            }
            caseListHtml += '</div></div>';
        }

        const activeStyles = {
            beginner: 'background: linear-gradient(135deg, #4ade80, #22c55e); box-shadow: 0 0 30px rgba(34, 197, 94, 0.6); border: 2px solid #bef264; animation: pulse-glow 2s infinite;',
            intermediate: 'background: linear-gradient(135deg, #fb923c, #f97316); box-shadow: 0 0 30px rgba(249, 115, 22, 0.6); border: 2px solid #fdba74; animation: pulse-glow 2s infinite;',
            difficult: 'background: linear-gradient(135deg, #f87171, #ef4444); box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); border: 2px solid #fca5a5; animation: pulse-glow 2s infinite;'
        };

        return `
            <style>
                @keyframes pulse-glow {
                    0% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
                    50% { transform: scale(1.08); box-shadow: 0 0 40px rgba(255,255,255,0.4); }
                    100% { transform: scale(1.05); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
                }
                .difficulty-cards-centered {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                .large-diff-card {
                    width: 320px !important;
                    min-height: 220px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .large-diff-card:hover {
                    transform: translateY(-5px);
                }
            </style>
            <div id="case-selection" class="difficulty-selector">
                <h3 class="selector-title">Clinical Correlation Lab</h3>
                <p class="selector-subtitle" style="color: var(--clinical-text-muted);">Master the diagnostic pathway through real-world patient scenarios</p>

                <div class="difficulty-cards-centered">
                    <div class="difficulty-card large-diff-card beginner-card ${selectedDifficulty === 'beginner' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'beginner' ? activeStyles.beginner : ''}"
                         onclick="window.appComponents.clinicalCases.setFilter('beginner')">
                        <div class="card-icon" style="font-size: 64px;">🌱</div>
                        <div class="card-title" style="font-size: 1.8em; margin-bottom: 10px;">Beginner</div>
                        <div class="card-subtitle" style="font-weight: 600; letter-spacing: 1px;">FOUNDATIONAL SKILLS</div>
                    </div>
                    <div class="difficulty-card large-diff-card intermediate-card ${selectedDifficulty === 'intermediate' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'intermediate' ? activeStyles.intermediate : ''}"
                         onclick="window.appComponents.clinicalCases.setFilter('intermediate')">
                        <div class="card-icon" style="font-size: 64px;">🔥</div>
                        <div class="card-title" style="font-size: 1.8em; margin-bottom: 10px;">Intermediate</div>
                        <div class="card-subtitle" style="font-weight: 600; letter-spacing: 1px;">CLINICAL REASONING</div>
                    </div>
                    <div class="difficulty-card large-diff-card difficult-card ${selectedDifficulty === 'difficult' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'difficult' ? activeStyles.difficult : ''}"
                         onclick="window.appComponents.clinicalCases.setFilter('difficult')">
                        <div class="card-icon" style="font-size: 64px;">💎</div>
                        <div class="card-title" style="font-size: 1.8em; margin-bottom: 10px;">Expert</div>
                        <div class="card-subtitle" style="font-weight: 600; letter-spacing: 1px;">COMPLEX LOCALIZATION</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
                     ${selectedDifficulty !== 'all' ? '<button class="clinical-btn secondary" onclick="window.appComponents.clinicalCases.setFilter(\'all\')">Show All Cases</button>' : ''}
                     <button class="clinical-btn secondary" style="margin: 0 auto;" onclick="window.returnToPGYNavigator('${pgyLevel}')">← Return to Learning Pathway</button>
                </div>

                ${caseListHtml}
            </div>
            ${this.renderInterfaceShell()}
        `;
    },

    renderInterfaceShell: function () {
        return `
            <div id="case-interface" style="display: none;">
                <div class="case-header">
                    <button class="quit-btn" onclick="window.appComponents.clinicalCases.startNewCase()">Quit Case</button>
                    <h3 style="margin: 0; font-weight: 800; font-size: 1.4em;">🩺 Case Investigation</h3>
                    <div class="progress-bar-container">
                        <div id="progress-fill" style="width: 0%; transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
                    </div>
                </div>

                <div id="case-steps-container" style="position: relative;">
                    <div id="case-presentation-step">
                        <div id="case-details"></div>
                        <div style="text-align: center; margin-top: 40px;">
                            <button class="clinical-btn" onclick="window.appComponents.clinicalCases.showPhysicalExam()">Initiate Physical Exam →</button>
                        </div>
                    </div>

                    <div id="physical-exam-step" style="display: none;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px;">
                            <span style="background: var(--clinical-accent); padding: 8px; border-radius: 8px;">👋</span> Physical Examination
                        </h3>
                        <div id="physical-exam-details" class="exam-grid"></div>
                        <div style="text-align: center; margin-top: 40px;">
                            <button class="clinical-btn" onclick="window.appComponents.clinicalCases.showDifferentialBuilder()">Formulate Differential →</button>
                        </div>
                    </div>

                    <div id="differential-step" style="display: none;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="background: #8b5cf6; padding: 8px; border-radius: 8px;">🧠</span> Clinical Reasoning
                        </h3>
                        <p style="color: var(--clinical-text-muted); margin-bottom: 20px;">Based on the history and exam, what are your primary considerations?</p>
                        
                        <textarea id="user-differential" class="clinical-textarea" rows="4" placeholder="Enter findings (e.g. Carpal Tunnel, C6 Radiculopathy)..."></textarea>
                        
                        <div style="display: flex; justify-content: flex-end;">
                            <button class="clinical-btn" style="background: #8b5cf6;" onclick="window.appComponents.clinicalCases.analyzeDifferential()">Analyze Differential</button>
                        </div>
                        
                        <div id="differential-feedback"></div>
                        
                        <div style="text-align: center; margin-top: 40px;">
                            <button id="continue-to-studies" class="clinical-btn" style="display: none;" onclick="window.appComponents.clinicalCases.showEMGDecision()">Next: Diagnostic Strategy →</button>
                        </div>
                    </div>

                    <div id="emg-decision-step" style="display: none;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="background: var(--clinical-warning); padding: 8px; border-radius: 8px;">⚡</span> Diagnostic Plan
                        </h3>
                        <p style="color: var(--clinical-text-muted); margin-bottom: 30px;">Is an Electrodiagnostic (EMG/NCS) evaluation indicated for this presentation?</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                            <div class="difficulty-card" onclick="window.appComponents.clinicalCases.makeEMGDecision(true)" style="padding: 30px; border-bottom: 4px solid var(--clinical-accent);">
                                <div style="font-size: 2.5em; margin-bottom: 15px;">✅</div>
                                <div style="font-weight: 700; font-size: 1.1em;">Indicated</div>
                                <p style="font-size: 0.85em; color: var(--clinical-text-muted); margin: 8px 0 0 0;">Proceed with studies to localize lesion</p>
                            </div>
                            <div class="difficulty-card" onclick="window.appComponents.clinicalCases.makeEMGDecision(false)" style="padding: 30px; border-bottom: 4px solid var(--clinical-danger);">
                                <div style="font-size: 2.5em; margin-bottom: 15px;">❌</div>
                                <div style="font-weight: 700; font-size: 1.1em;">Not Indicated</div>
                                <p style="font-size: 0.85em; color: var(--clinical-text-muted); margin: 8px 0 0 0;">Rely on clinical diagnosis alone</p>
                            </div>
                        </div>
                        <div id="emg-decision-feedback"></div>
                        <div style="text-align: center; margin-top: 30px;">
                            <button id="continue-after-decision" class="clinical-btn" style="display: none;" onclick="window.appComponents.clinicalCases.proceedAfterDecision()">Proceed to Investigation →</button>
                        </div>
                    </div>

                    <div id="results-step" style="display: none;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px;">
                            <span style="background: var(--clinical-accent); padding: 8px; border-radius: 8px;">📈</span> Electrodiagnostic Findings
                        </h3>
                        <div id="ncs-results"></div>
                        <h3 id="emg-results" style="display: none; margin-top: 40px; border-top: 1px solid var(--clinical-border); padding-top: 30px;">Needle EMG Data</h3>
                        <div id="emg-details"></div>
                        <div style="text-align: center; margin-top: 40px;">
                            <button class="clinical-btn" onclick="window.appComponents.clinicalCases.showFinalDiagnosis()">Formulate Conclusion →</button>
                        </div>
                    </div>

                    <div id="diagnosis-step" style="display: none;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <span style="background: var(--clinical-success); padding: 8px; border-radius: 8px;">🌟</span> Definitive Diagnosis
                        </h3>
                        <p style="color: var(--clinical-text-muted); margin-bottom: 25px;">Synthesize all clinical and EDX data to provide the specific diagnosis.</p>

                        <input type="text" id="final-diagnosis" class="clinical-textarea" style="padding: 15px; height: auto;" placeholder="Type specific diagnosis (e.g. Severe CTS)...">
                        
                        <div style="display: flex; justify-content: center;">
                            <button class="clinical-btn" style="background: var(--clinical-success); padding: 18px 40px; font-size: 1.1em;" onclick="window.appComponents.clinicalCases.checkFinalDiagnosis()">Submit Investigation</button>
                        </div>
                        
                        <div id="diagnosis-feedback" style="margin-top: 30px;"></div>
                        
                        <div style="text-align: center; margin-top: 50px; border-top: 1px solid var(--clinical-border); padding-top: 30px;">
                             <button class="clinical-btn secondary" onclick="window.appComponents.clinicalCases.startNewCase()">Complete Case & Finalize Charting</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderCaseDetails: function (caseData) {
        const c = caseData.presentation;
        return `
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 25px; border-bottom: 1px solid var(--clinical-border); padding-bottom: 15px;">
                <h2 style="margin: 0; font-weight: 800; color: white;">${caseData.title}</h2>
                <div style="display: flex; gap: 15px; align-items: center; color: var(--clinical-text-muted); font-size: 0.9em; font-weight: 600; text-transform: uppercase;">
                    <span class="difficulty-badge ${caseData.difficulty}">${caseData.difficulty}</span>
                    <span>•</span>
                    <span>Age: ${c.age}</span>
                    <span>•</span>
                    <span>${c.gender}</span>
                    <span>•</span>
                    <span>${c.occupation}</span>
                </div>
            </div>

            <div class="medical-history-grid">
                <div class="history-card chief">
                    <h5>Chief Complaint</h5>
                    <p style="font-size: 1.1em; color: var(--clinical-accent); font-weight: 700;">"${c.chiefComplaint}"</p>
                </div>
                <div class="history-card hpi" style="grid-column: span 2;">
                    <h5>History of Present Illness</h5>
                    <p>${c.history}</p>
                </div>
                <div class="history-card pmh">
                    <h5>Medical History</h5>
                    <p>${c.pmh}</p>
                    <div style="margin-top: 10px; font-size: 0.8em; color: var(--clinical-text-muted);">Meds: ${c.medications || 'None'}</div>
                </div>
                <div class="history-card family">
                    <h5>Family/Social</h5>
                    <p>${c.familyHistory || 'Non-contributory'}</p>
                </div>
                ${caseData.reviewOfSystems ? `
                <div class="history-card ros" style="grid-column: span 2; border-top: 1px solid var(--clinical-border); margin-top: 10px; padding-top: 10px;">
                    <h5 style="color: var(--clinical-text-muted);">Review of Systems</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9em;">
                        ${Object.entries(caseData.reviewOfSystems).map(([sys, val]) => `<div><strong>${sys.charAt(0).toUpperCase() + sys.slice(1)}:</strong> ${val}</div>`).join('')}
                    </div>
                </div>` : ''}
                ${caseData.humoralData && ((caseData.humoralData.labs && caseData.humoralData.labs.length > 0) || (caseData.humoralData.imaging && caseData.humoralData.imaging.length > 0)) ? `
                <div class="history-card labs" style="grid-column: span 2;">
                    <h5 style="color: var(--clinical-text-muted);">Ancillary Studies (Labs/Imaging)</h5>
                    <div style="font-size: 0.9em;">
                        ${caseData.humoralData.labs && caseData.humoralData.labs.length > 0 ? `<div><strong>Labs:</strong> ${caseData.humoralData.labs.join(', ')}</div>` : ''}
                        ${caseData.humoralData.imaging && caseData.humoralData.imaging.length > 0 ? `<div><strong>Imaging:</strong> ${caseData.humoralData.imaging.join(', ')}</div>` : ''}
                    </div>
                </div>` : ''}
            </div>
        `;
    },

    renderPhysicalExam: function (exam) {
        return `
            <div class="exam-category"><h5>👁️ Inspection</h5><p>${exam.inspection}</p></div>
            <div class="exam-category"><h5>👋 Palpation</h5><p>${exam.palpation}</p></div>
            <div class="exam-category"><h5>🔄 Range of Motion</h5><p>${exam.rom}</p></div>
            <div class="exam-category"><h5>💪 Motor Strength</h5><p>${exam.strength}</p></div>
            <div class="exam-category"><h5>👆 Sensation</h5><p>${exam.sensation}</p></div>
            <div class="exam-category"><h5>🔨 Reflexes</h5><p>${exam.reflexes}</p></div>
            <div class="exam-category" style="grid-column: span 2;"><h5>🧪 Provocative & Special Tests</h5><p>${exam.specialTests}</p></div>
        `;
    },

    renderDifferentialFeedback: function (results, expected) {
        let html = `
            <div class="feedback-card info">
                <h4 style="margin: 0 0 10px 0; color: #3b82f6 !important; font-weight: 800;">📊 Clinical Analysis Result</h4>
                <p>Diagnostic capture: <strong>${results.matched.length}</strong> / <strong>${results.totalExpected}</strong> key considerations.</p>
            </div>
        `;

        if (results.matched.length > 0) {
            html += `
                <div class="feedback-card success">
                    <h4 style="margin: 0 0 5px 0; color: #10b981 !important; font-weight: 800;">✅ Valid Considerations</h4>
                    <p>${results.matched.join(', ')}</p>
                </div>
            `;
        }

        html += `
            <div class="feedback-card" style="background: rgba(255,255,255,0.05); border-style: dashed;">
                <h4 style="margin: 0 0 10px 0; color: var(--clinical-text-muted);">📋 Diagnostic Progress</h4>
                <p style="margin: 0; font-size: 0.9em;">Capture is being recorded. Continue your investigation and EDX studies to reveal the definitive differential exclusion logic.</p>
            </div>
        `;
        return html;
    },

    renderEMGDecisionFeedback: function (evaluation) {
        const color = evaluation.type.includes('correct') ? 'var(--clinical-success)' : 'var(--clinical-danger)';
        const title = evaluation.type.includes('correct') ? '✅ Clinical Correlation Accurate' : '⚠️ Strategy Reconsideration';

        let html = `
            <div class="feedback-card" style="border: 2px solid ${color};">
                <h4 style="color: ${color}; margin: 0 0 10px 0;">${title}</h4>
                <p style="font-size: 1.1em; line-height: 1.5;">${evaluation.message}</p>
        `;

        if (evaluation.educationalNote) {
            html += `
                <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--clinical-danger); color: white; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h5 style="margin: 0 0 5px 0; color: var(--clinical-danger); text-transform: uppercase; font-size: 0.8em; letter-spacing: 1px;">🚨 Clinical Learning Point</h5>
                    <p style="margin: 0; font-size: 0.95em;">${evaluation.educationalNote}</p>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    },

    renderFinalDiagnosis: function (isCorrect, currentCase, userDiagnosis) {
        const title = isCorrect ? '🌟 Clinical Excellence' : '🧐 Diagnostic Review';
        const color = isCorrect ? 'var(--clinical-success)' : 'var(--clinical-accent)';

        return `
            <div class="feedback-card" style="border: 1px solid ${color}; background: rgba(0,0,0,0.3);">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 4em; margin-bottom: 10px;">${isCorrect ? '🏆' : '🔬'}</div>
                    <h3 style="margin: 0; color: ${color}; font-size: 1.8em;">${title}</h3>
                </div>

                <div style="background: var(--clinical-glass-light); padding: 25px; border-radius: 12px; margin-bottom: 25px; text-align: center; border: 1px solid var(--clinical-border);">
                    <div style="color: var(--clinical-text-muted); font-size: 0.8em; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Confirmed Diagnosis</div>
                    <div style="font-size: 1.8em; font-weight: 800; color: white;">${currentCase.correctDiagnosis}</div>
                </div>

                <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--clinical-accent); padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 25px;">
                    <h5 style="margin: 0 0 10px 0; color: var(--clinical-accent); text-transform: uppercase;">Diagnostic Synthesis</h5>
                    <p style="margin: 0; line-height: 1.7; font-size: 1.05em; color: #e2e8f0;">${currentCase.explanation}</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h5 style="margin: 0 0 10px 0; color: var(--clinical-text-muted); text-transform: uppercase; font-size: 0.8em; letter-spacing: 1px;">Key Evidence Review</h5>
                    <div style="display: grid; gap: 10px;">
                        ${this.generateEvidenceReview(currentCase)}
                    </div>
                </div>

                ${currentCase.differentialDiagnosis && typeof currentCase.differentialDiagnosis[0] === 'object' ? `
                <div style="margin-bottom: 25px;">
                    <h5 style="margin: 0 0 10px 0; color: var(--clinical-text-muted); text-transform: uppercase; font-size: 0.8em; letter-spacing: 1px;">Differential Exclusion Logic</h5>
                    <div style="background: var(--clinical-glass); border-radius: 8px; border: 1px solid var(--clinical-border); overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                            <thead>
                                <tr style="background: rgba(255,255,255,0.05); border-bottom: 1px solid var(--clinical-border);">
                                    <th style="padding: 10px; text-align: left; width: 40%;">Diagnosis</th>
                                    <th style="padding: 10px; text-align: left;">Rule-Out Reasoning</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${currentCase.differentialDiagnosis.map(diff => `
                                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                        <td style="padding: 10px; color: ${diff.name === currentCase.correctDiagnosis ? 'var(--clinical-success)' : 'inherit'}; font-weight: ${diff.name === currentCase.correctDiagnosis ? '700' : '400'};">
                                            ${diff.name} ${diff.name === currentCase.correctDiagnosis ? '✅' : ''}
                                        </td>
                                        <td style="padding: 10px; color: #cbd5e1;">${diff.ruleOut || diff.explanation || 'N/A'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                ` : ''
            }

            ${currentCase.teachingPoints ? `
                <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--clinical-success); padding: 20px; border-radius: 0 12px 12px 0;">
                    <h5 style="margin: 0 0 10px 0; color: var(--clinical-success); text-transform: uppercase;">🎓 Clinical Pearls</h5>
                    <ul style="margin: 0; padding-left: 20px; color: #e2e8f0; line-height: 1.6;">
                        ${currentCase.teachingPoints.map(point => `<li style="margin-bottom: 8px;">${point}</li>`).join('')}
                    </ul>
                </div>
            ` : ''
            }
        </div>
    `;
    },

    generateEvidenceReview: function (caseData) {
        let evidence = [];

        // Check Physical Exam clues
        if (caseData.physicalExam) {
            const exam = caseData.physicalExam;
            if (exam.specialTests) {
                const tests = exam.specialTests.toLowerCase();
                if (tests.includes('tinel')) {
                    evidence.push({ icon: '✋', text: 'Positive Tinel sign suggests focal nerve irritability at the site of compression.' });
                }
                if (tests.includes('spurling')) {
                    evidence.push({ icon: '🦒', text: "Positive Spurling's test strongly suggests cervical nerve root irritation (radiculopathy)." });
                }
                if (tests.includes('phalen')) {
                    evidence.push({ icon: '🤲', text: "Positive Phalen's maneuver increases carpal tunnel pressure, confirming focal median nerve entrapment." });
                }
            }
        }

        // Analyze NCS
        const ncs = caseData.ncsStudies || caseData.ncsResults;
        if (ncs) {
            const sensory = ncs.sensory || ncs.sensoryStudies;
            const motor = ncs.motor || ncs.motorStudies;
            const comparison = ncs.comparison;

            if (sensory) {
                sensory.filter(s => s.abnormal).forEach(s => {
                    evidence.push({ icon: '⚡', text: `Abnormal sensory response in ${s.name || s.nerve} suggests ${s.amp === 0 ? 'severe axonal loss' : 'axonal drop or focal demyelination'}.` });
                });
            }
            if (motor) {
                motor.filter(m => m.abnormal).forEach(m => {
                    evidence.push({ icon: '🔌', text: `Abnormal motor response in ${m.name || m.nerve} indicates motor axon involvement or conduction failure.` });
                });
            }
            if (comparison) {
                comparison.filter(c => c.abnormal).forEach(c => {
                    evidence.push({ icon: '⚖️', text: `Side - to - side or internal comparison(${c.name}) confirms focal pathology ${c.deltaP ? `with a significant ${c.deltaP} difference` : ''}.` });
                });
            }
        }

        // Analyze EMG
        const emg = caseData.emgStudies || caseData.emgFindings;
        if (emg) {
            emg.filter(f => f.abnormal).forEach(f => {
                const hasDenervation = (f.fibs && f.fibs !== '0' && f.fibs !== 'None' && f.fibs !== 'Nml');
                const chronic = (f.motorUnits && (f.motorUnits.toLowerCase().includes('large') || f.motorUnits.toLowerCase().includes('polyphasic')));

                if (hasDenervation) {
                    evidence.push({ icon: '🎯', text: `Active denervation(Fibs / PSWs) in ${f.muscle} confirms ${caseData.title.toLowerCase().includes('myopathy') ? 'muscle fiber necrosis' : 'acute/ongoing axonal injury'}.` });
                }
                if (chronic) {
                    evidence.push({ icon: '🏗️', text: `Motor unit remodeling in ${f.muscle} indicates chronic reinnervation and neuroplasticity.` });
                }
            });
        }

        if (evidence.length === 0) return '<p style="color: var(--clinical-text-muted); font-style: italic;">No specific abnormalities identified to review.</p>';

        return evidence.slice(0, 5).map(e => `
            <div style="display: flex; gap: 12px; align-items: start; background: var(--clinical-glass); padding: 12px; border-radius: 8px; border: 1px solid var(--clinical-border);">
                <span style="font-size: 1.2em;">${e.icon}</span>
                <span style="font-size: 0.95em; color: #cbd5e1;">${e.text}</span>
            </div>
    `).join('');
    }
};
