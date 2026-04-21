import { ClinicalIcons } from './ClinicalIcons.js';

export const ClinicalShellRenderer = {
    renderInterfaceShell: function () {
        return `
            <div id="case-interface" class="advanced-mesh-bg" style="display: none; padding: 30px; border-radius: 12px; margin: -30px; min-height: 100%; max-width: none; width: calc(100% + 60px); box-sizing: border-box;">
                <div class="glass-card" style="border-radius: 16px; padding: 30px; max-width: 1200px; margin: 0 auto; box-sizing: border-box; min-height: calc(100vh - 120px);">
                <div class="case-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(6, 182, 212, 0.1); padding-bottom: 20px; margin-bottom: 30px;">
                    <button class="dashboard-card-btn glass-btn" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 8px 16px; border-radius: 6px; font-weight: 600;" data-action="exitCase">← End Case</button>
                    <h3 style="margin: 0; font-weight: 800; font-size: 1.4em; color: #f8fafc; display: flex; align-items: center; gap: 10px;">
                        ${ClinicalIcons.getSvgIcon('stethoscope', '#06b6d4')} Case Investigation
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
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.4); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);" data-action="showExam">Initiate Physical Exam →</button>
                        </div>
                    </div>

                    <div id="physical-exam-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px; color: #f8fafc;">
                            <div style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; padding: 8px; border-radius: 8px;">${ClinicalIcons.getSvgIcon('hand', 'currentColor')}</div>
                            Physical Examination
                        </h3>
                        <div id="physical-exam-details" class="exam-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"></div>
                        <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(139, 92, 246, 0.15); color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.4); box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);" data-action="showReasoning">Formulate Differential →</button>
                        </div>
                    </div>

                    <div id="differential-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #f8fafc;">
                            <div style="background: rgba(139, 92, 246, 0.15); color: #c4b5fd; padding: 8px; border-radius: 8px;">${ClinicalIcons.getSvgIcon('brain', 'currentColor')}</div>
                            Clinical Reasoning
                        </h3>
                        <p style="color: #94a3b8; font-size: 1.05em; margin-bottom: 25px;">Based on the history and exam, what are your primary considerations?</p>
                        
                        <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                            <textarea id="differential-input" placeholder="List your differential diagnosis here..." style="width: 100%; min-height: 120px; padding: 15px; border-radius: 8px; border: 1px solid rgba(139, 92, 246, 0.4); background: rgba(0, 0, 0, 0.2); color: #f8fafc; font-size: 1.05em; margin-bottom: 15px; resize: vertical;"></textarea>
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(139, 92, 246, 0.2); color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.5); width: 100%;" data-action="analyzeReasoning">Analyze Differential</button>
                        </div>
                        
                        <div id="differential-feedback" style="display: none; margin-bottom: 30px;"></div>
                        
                        <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
                            <button id="continue-to-studies" class="dashboard-card-btn glass-btn" style="display: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none;" data-action="showStrategy">Next: Diagnostic Strategy →</button>
                        </div>
                    </div>

                    <div id="emg-decision-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <style>
                            #emg-decision-step .emg-decision-grid {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                gap: 24px;
                                margin: 0 auto 30px auto;
                                max-width: 780px;
                                width: 100%;
                            }
                            #emg-decision-step .emg-choice {
                                position: relative;
                                width: 100% !important;
                                min-height: 200px;
                                padding: 32px 28px !important;
                                border-radius: 18px !important;
                                background: linear-gradient(160deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%);
                                border: 1px solid rgba(148, 163, 184, 0.18) !important;
                                cursor: pointer;
                                text-align: center;
                                overflow: hidden;
                                box-sizing: border-box;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                                            border-color 0.3s ease,
                                            box-shadow 0.4s ease,
                                            background 0.4s ease;
                            }
                            #emg-decision-step .emg-choice::before {
                                content: "";
                                position: absolute;
                                inset: 0;
                                background: radial-gradient(circle at 50% 0%, var(--glow), transparent 65%);
                                opacity: 0;
                                transition: opacity 0.4s ease;
                                pointer-events: none;
                            }
                            #emg-decision-step .emg-choice::after {
                                content: "";
                                position: absolute;
                                top: 0; left: 0; right: 0;
                                height: 3px;
                                background: var(--accent);
                                transform: scaleX(0.25);
                                transform-origin: center;
                                opacity: 0.7;
                                transition: transform 0.4s ease, opacity 0.3s ease;
                            }
                            #emg-decision-step .emg-choice:hover {
                                transform: translateY(-6px);
                                border-color: var(--accent) !important;
                                box-shadow: 0 18px 40px -12px var(--glow), 0 0 0 1px var(--accent) inset;
                            }
                            #emg-decision-step .emg-choice:hover::before { opacity: 0.35; }
                            #emg-decision-step .emg-choice:hover::after { transform: scaleX(1); opacity: 1; }
                            #emg-decision-step .emg-choice:active { transform: translateY(-2px) scale(0.99); }
                            #emg-decision-step .emg-choice.selected {
                                transform: translateY(-6px);
                                border-color: var(--accent) !important;
                                box-shadow: 0 18px 40px -12px var(--glow), 0 0 0 2px var(--accent) inset;
                            }
                            #emg-decision-step .emg-choice.selected::before { opacity: 0.45; }
                            #emg-decision-step .emg-choice.selected::after { transform: scaleX(1); opacity: 1; }
                            #emg-decision-step .emg-choice--yes { --accent: #10b981; --glow: rgba(16, 185, 129, 0.35); }
                            #emg-decision-step .emg-choice--no  { --accent: #ef4444; --glow: rgba(239, 68, 68, 0.35); }
                            #emg-decision-step .emg-choice .emg-icon-wrap {
                                position: relative;
                                width: 68px; height: 68px;
                                display: flex; align-items: center; justify-content: center;
                                margin-bottom: 18px;
                                border-radius: 50%;
                                background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
                                color: var(--accent);
                                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                            }
                            #emg-decision-step .emg-choice:hover .emg-icon-wrap,
                            #emg-decision-step .emg-choice.selected .emg-icon-wrap { transform: scale(1.12) rotate(-4deg); }
                            #emg-decision-step .emg-choice .emg-title {
                                font-weight: 700;
                                font-size: 1.35em;
                                color: #f8fafc;
                                letter-spacing: 0.3px;
                                position: relative;
                                z-index: 1;
                            }
                            #emg-decision-step .emg-choice .emg-subtitle {
                                font-size: 0.95em;
                                color: #94a3b8;
                                margin: 8px 0 0 0;
                                max-width: 260px;
                                line-height: 1.45;
                                position: relative;
                                z-index: 1;
                            }
                            @media (max-width: 640px) {
                                #emg-decision-step .emg-decision-grid { grid-template-columns: 1fr; }
                            }
                        </style>
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #f8fafc;">
                            <div style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; padding: 8px; border-radius: 8px;">${ClinicalIcons.getSvgIcon('lightning', 'currentColor')}</div>
                            Diagnostic Plan
                        </h3>
                        <p style="color: #94a3b8; margin-bottom: 30px;">Is an Electrodiagnostic (EMG/NCS) evaluation indicated for this presentation?</p>

                        <div class="emg-decision-grid">
                            <div class="emg-choice emg-choice--yes" data-action="emgIndicated" data-value="true">
                                <div class="emg-icon-wrap">${ClinicalIcons.getSvgIcon('check', 'currentColor', '44')}</div>
                                <div class="emg-title">Indicated</div>
                                <p class="emg-subtitle">Proceed with studies to localize lesion</p>
                            </div>
                            <div class="emg-choice emg-choice--no" data-action="emgIndicated" data-value="false">
                                <div class="emg-icon-wrap">${ClinicalIcons.getSvgIcon('x', 'currentColor', '44')}</div>
                                <div class="emg-title">Not Indicated</div>
                                <p class="emg-subtitle">Rely on clinical diagnosis alone</p>
                            </div>
                        </div>
                        <div id="emg-decision-feedback" style="display: none;"></div>
                        <div style="text-align: center; margin-top: 30px; padding-bottom: 20px;">
                            <button id="continue-after-decision" class="dashboard-card-btn glass-btn" style="display: none; background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.4); box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);" data-action="showResults">Proceed to Investigation →</button>
                        </div>
                    </div>

                    <div id="results-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 25px; color: #f8fafc;">
                            <div style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; padding: 8px; border-radius: 8px;">${ClinicalIcons.getSvgIcon('chart', 'currentColor')}</div>
                            Electrodiagnostic Findings
                        </h3>
                        <div id="ncs-results"></div>
                        <h3 id="emg-results" style="display: none; margin-top: 40px; border-top: 2px solid rgba(6, 182, 212, 0.1); padding-top: 30px; color: #f8fafc;">Needle EMG Data</h3>
                        <div id="emg-details"></div>
                        <div style="text-align: center; margin-top: 40px; padding-bottom: 20px;">
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);" data-action="showConclusion">Formulate Conclusion →</button>
                        </div>
                    </div>

                    <div id="diagnosis-step" style="display: none; width: 100%; transition: all 0.4s ease;">
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #f8fafc;">
                            <div style="background: rgba(16, 185, 129, 0.15); color: #34d399; padding: 8px; border-radius: 8px;">${ClinicalIcons.getSvgIcon('star', 'currentColor')}</div>
                            Definitive Diagnosis
                        </h3>
                        <p style="color: #94a3b8; margin-bottom: 25px;">Synthesize all clinical and EDX data to provide the specific diagnosis.</p>

                        <input type="text" id="final-diagnosis" class="clinical-textarea" style="width: 100%; padding: 15px; border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(0, 0, 0, 0.2); color: #f8fafc; border-radius: 8px; font-size: 1.1em; margin-bottom: 25px; font-family: inherit;" placeholder="Type specific diagnosis (e.g. Severe CTS)...">
                        
                        <div style="display: flex; justify-content: center;">
                            <button class="dashboard-card-btn glass-btn" style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 12px 30px; font-size: 1.1em; border: 1px solid rgba(16, 185, 129, 0.5); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);" data-action="submitConclusion">Submit Investigation</button>
                        </div>
                        
                        <div id="diagnosis-feedback" style="margin-top: 30px; display: none;"></div>
                        
                        <div style="text-align: center; margin-top: 50px; border-top: 2px solid rgba(6, 182, 212, 0.1); padding-top: 30px;">
                             <button class="dashboard-card-btn glass-btn" style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(248, 250, 252, 0.2); color: #94a3b8;" data-action="exitCase">Complete Case & Return to Dashboard</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    }
};
