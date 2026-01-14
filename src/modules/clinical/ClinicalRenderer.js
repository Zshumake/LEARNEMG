import { ClinicalTables } from './components/ClinicalTables.js';

export const ClinicalRenderer = {
    renderDashboard: function (pgyLevel, caseDatabase) {
        let caseListHtml = '';
        if (caseDatabase) {
            caseListHtml = '<div class="case-list-container" style="margin-top: 40px;">';
            caseListHtml += '<h3 style="color: white; text-align: center; margin-bottom: 20px;">📚 Available Cases</h3>';
            caseListHtml += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">';

            for (const [id, caseData] of Object.entries(caseDatabase)) {
                const difficultyColor = caseData.difficulty === 'beginner' ? '#22c55e' : (caseData.difficulty === 'intermediate' ? '#f97316' : '#ef4444');
                caseListHtml += `
                    <div onclick="window.appComponents.clinicalCases.startSpecificCase('${id}')" 
                         style="background: rgba(255,255,255,0.9); padding: 15px; border-radius: 10px; cursor: pointer; border-bottom: 4px solid ${difficultyColor}; transition: transform 0.2s;">
                        <div style="font-weight: bold; color: #1e293b;">${caseData.title}</div>
                        <div style="font-size: 12px; color: #64748b; margin-top: 5px; text-transform: uppercase;">${caseData.difficulty}</div>
                    </div>
                 `;
            }
            caseListHtml += '</div></div>';
        }

        return `
            <div id="case-selection" class="difficulty-selector">
                <h3 class="selector-title">⚡ Choose Your Challenge Level</h3>
                <p class="selector-subtitle">Select which difficulty levels you want to practice with</p>

                <div class="difficulty-cards">
                    <div class="difficulty-card beginner-card" onclick="window.appComponents.clinicalCases.startBeginnerCases()">
                        <div class="card-icon">🌱</div>
                        <div class="card-title">Beginner</div>
                        <div class="card-subtitle">Learning the Basics</div>
                    </div>
                    <div class="difficulty-card intermediate-card" onclick="window.appComponents.clinicalCases.startIntermediateCases()">
                        <div class="card-icon">🔥</div>
                        <div class="card-title">Intermediate</div>
                        <div class="card-subtitle">Building Skills</div>
                    </div>
                    <div class="difficulty-card difficult-card" onclick="window.appComponents.clinicalCases.startExpertCases()">
                        <div class="card-icon">💎</div>
                        <div class="card-title">Expert</div>
                        <div class="card-subtitle">Master Level</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 20px;">
                     <button onclick="window.returnToPGYNavigator('${pgyLevel}')" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 10px 20px; border-radius: 8px; cursor: pointer;">← Back to Learning Pathway</button>
                </div>

                ${caseListHtml}
            </div>
            ${this.renderInterfaceShell()}
        `;
    },

    renderInterfaceShell: function () {
        return `
            <div id="case-interface" style="display: none;">
                <div class="case-header" style="margin-bottom: 20px;">
                    <button onclick="window.appComponents.clinicalCases.startNewCase()" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; float: right;">Quit Case</button>
                    <h3 style="margin: 0; color: #2c3e50;">Clinical Case</h3>
                    <div class="progress-bar" style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 10px;">
                        <div id="progress-fill" style="height: 100%; background: #3b82f6; width: 0%; transition: width 0.3s ease;"></div>
                    </div>
                </div>

                <!-- Steps container -->
                <div id="case-steps-container">
                    <div id="case-presentation-step">
                        <div id="case-details"></div>
                        <div style="text-align: center; margin-top: 30px;">
                            <button onclick="window.appComponents.clinicalCases.showPhysicalExam()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Proceed to Physical Exam →</button>
                        </div>
                    </div>

                    <div id="physical-exam-step" style="display: none;">
                        <h3>Physical Examination</h3>
                        <div id="physical-exam-details"></div>
                        <div style="text-align: center; margin-top: 30px;">
                            <button onclick="window.appComponents.clinicalCases.showDifferentialBuilder()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Develop Differential →</button>
                        </div>
                    </div>

                    <div id="differential-step" style="display: none;">
                        <h3>Differential Diagnosis</h3>
                        <textarea id="user-differential" rows="4" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 15px;" placeholder="Type your differential diagnosis here..."></textarea>
                        <button onclick="window.appComponents.clinicalCases.analyzeDifferential()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Analyze</button>
                        <div id="differential-feedback" style="margin-top: 20px;"></div>
                        <div style="text-align: center; margin-top: 30px;">
                            <button id="continue-to-studies" onclick="window.appComponents.clinicalCases.showEMGDecision()" style="display: none; background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Next: EMG/NCS Decision →</button>
                        </div>
                    </div>

                    <div id="emg-decision-step" style="display: none;">
                        <h3>Diagnostic Plan</h3>
                        <p>Is EMG/NCS indicated for this patient?</p>
                        <div style="display: flex; gap: 20px; margin: 20px 0;">
                            <button onclick="window.appComponents.clinicalCases.makeEMGDecision(true)" style="flex: 1; padding: 20px; background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 10px; cursor: pointer;">✅ Yes, Proceed with Studies</button>
                            <button onclick="window.appComponents.clinicalCases.makeEMGDecision(false)" style="flex: 1; padding: 20px; background: #fef2f2; border: 2px solid #ef4444; border-radius: 10px; cursor: pointer;">❌ No, Clinical Diagnosis Only</button>
                        </div>
                        <div id="emg-decision-feedback"></div>
                        <div style="text-align: center; margin-top: 30px;">
                            <button id="continue-after-decision" onclick="window.appComponents.clinicalCases.proceedAfterDecision()" style="display: none; background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Continue →</button>
                        </div>
                    </div>

                    <div id="results-step" style="display: none;">
                        <h3>Electrodiagnostic Findings</h3>
                        <div id="ncs-results"></div>
                        <h3 id="emg-results" style="display: none; margin-top: 30px;">Needle EMG Findings</h3>
                        <div id="emg-details"></div>
                        <div style="text-align: center; margin-top: 30px;">
                            <button onclick="window.appComponents.clinicalCases.showFinalDiagnosis()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Make Final Diagnosis →</button>
                        </div>
                    </div>

                    <div id="diagnosis-step" style="display: none;">
                        <h3>Final Diagnosis</h3>
                        <input type="text" id="final-diagnosis" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 20px;" placeholder="Enter specific diagnosis...">
                        <button onclick="window.appComponents.clinicalCases.checkFinalDiagnosis()" style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Submit Diagnosis</button>
                        <div id="diagnosis-feedback" style="margin-top: 20px;"></div>
                        <div style="text-align: center; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                             <button onclick="window.appComponents.clinicalCases.startNewCase()" style="background: #64748b; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">Complete Case & Return to Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderCaseDetails: function (caseData) {
        const c = caseData.presentation;
        return `
            <h4 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">${caseData.title}</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Age</strong><br><span style="font-weight: 600;">${c.age}</span></div>
                <div><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Gender</strong><br><span style="font-weight: 600;">${c.gender}</span></div>
                <div><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Occupation</strong><br><span style="font-weight: 600;">${c.occupation}</span></div>
            </div>
            <div class="history-section" style="display: flex; flex-direction: column; gap: 15px;">
                <div style="background: white; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h5 style="margin: 0 0 5px 0; color: #3b82f6;">Chief Complaint</h5>
                    <p style="margin: 0; line-height: 1.5;">${c.chiefComplaint}</p>
                </div>
                <div style="background: white; border-left: 4px solid #64748b; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h5 style="margin: 0 0 5px 0; color: #64748b;">History of Present Illness</h5>
                    <p style="margin: 0; line-height: 1.5;">${c.history}</p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: white; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <h5 style="margin: 0 0 5px 0; color: #10b981;">Past Medical History</h5>
                        <p style="margin: 0; line-height: 1.5;">${c.pmh}</p>
                    </div>
                    <div style="background: white; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <h5 style="margin: 0 0 5px 0; color: #f59e0b;">Family History</h5>
                        <p style="margin: 0; line-height: 1.5;">${c.familyHistory || 'Non-contributory'}</p>
                    </div>
                </div>
            </div>
        `;
    },

    renderPhysicalExam: function (exam) {
        return `
            <div class="physical-exam">
                <div class="exam-category"><h5>👁️ Inspection</h5><p>${exam.inspection}</p></div>
                <div class="exam-category"><h5>👋 Palpation</h5><p>${exam.palpation}</p></div>
                <div class="exam-category"><h5>🔄 ROM</h5><p>${exam.rom}</p></div>
                <div class="exam-category"><h5>💪 Strength</h5><p>${exam.strength}</p></div>
                <div class="exam-category"><h5>👆 Sensation</h5><p>${exam.sensation}</p></div>
                <div class="exam-category"><h5>🔨 Reflexes</h5><p>${exam.reflexes}</p></div>
                <div class="exam-category"><h5>🧪 Specials</h5><p>${exam.specialTests}</p></div>
            </div>
        `;
    },

    renderDifferentialFeedback: function (results, expected) {
        let html = `
            <div class="analysis-header">
                <h3>📊 Analysis Result</h3>
                <p>You identified <strong>${results.matched.length}</strong> out of <strong>${results.totalExpected}</strong> key differentials.</p>
            </div>
        `;

        if (results.matched.length > 0) {
            html += `
                <div class="feedback-card success">
                    <h4>✅ Well Done!</h4>
                    <p>You correctly included: ${results.matched.join(', ')}</p>
                </div>
            `;
        }

        html += `
            <div class="feedback-card info">
                <h4>📘 Textbook Differential</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                    ${expected.map(d => `<span style="background: white; padding: 4px 12px; border-radius: 16px; border: 1px solid #ddd;">${d}</span>`).join('')}
                </div>
            </div>
        `;
        return html;
    },

    renderEMGDecisionFeedback: function (evaluation) {
        const color = evaluation.type.includes('correct') ? '#27ae60' : '#e74c3c';
        const title = evaluation.type.includes('correct') ? '✅ Correct' : '❌ Reconsider';

        let html = `
            <div class="feedback-card" style="border: 2px solid ${color};">
                <h4 style="color: ${color};">${title}</h4>
                <p>${evaluation.message}</p>
        `;

        if (evaluation.educationalNote) {
            html += `
                <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                    <h5>🚨 Management</h5>
                    <p>${evaluation.educationalNote}</p>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    },

    renderFinalDiagnosis: function (isCorrect, currentCase, userDiagnosis) {
        const type = isCorrect ? 'success' : 'error';
        const title = isCorrect ? 'Excellent! Accurate Diagnosis' : 'Clinical Correlation Review';
        const icon = isCorrect ? '🌟' : '🧐';

        return `
            <div class="feedback-card ${type}">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <span style="font-size: 24px;">${icon}</span>
                    <h4 style="margin: 0; font-size: 18px;">${title}</h4>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid var(--border-color); margin-bottom: 20px;">
                    <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Correct Diagnosis</strong>
                    <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: 700; color: #1e293b;">${currentCase.correctDiagnosis}</p>
                </div>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                    <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Diagnostic Reasoning</strong>
                    <p style="margin: 5px 0 0 0; line-height: 1.6; color: #334155;">${currentCase.explanation}</p>
                </div>
            </div>
        `;
    }
};
