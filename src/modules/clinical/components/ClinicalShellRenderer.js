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
                        <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: #f8fafc;">
                            <div style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; padding: 8px; border-radius: 8px;">${ClinicalIcons.getSvgIcon('lightning', 'currentColor')}</div>
                            Diagnostic Plan
                        </h3>
                        <p style="color: #94a3b8; margin-bottom: 30px;">Is an Electrodiagnostic (EMG/NCS) evaluation indicated for this presentation?</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                            <div class="difficulty-card glass-card" data-action="emgIndicated" data-value="true" style="padding: 30px; border-bottom: 4px solid #10b981; border-radius: 12px; cursor: pointer; text-align: center; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                                <div style="margin-bottom: 15px; color: #10b981;">${ClinicalIcons.getSvgIcon('check', 'currentColor', '48')}</div>
                                <div style="font-weight: 700; font-size: 1.2em; color: #f8fafc;">Indicated</div>
                                <p style="font-size: 0.9em; color: #94a3b8; margin: 8px 0 0 0;">Proceed with studies to localize lesion</p>
                            </div>
                            <div class="difficulty-card glass-card" data-action="emgIndicated" data-value="false" style="padding: 30px; border-bottom: 4px solid #ef4444; border-radius: 12px; cursor: pointer; text-align: center; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                                <div style="margin-bottom: 15px; color: #ef4444;">${ClinicalIcons.getSvgIcon('x', 'currentColor', '48')}</div>
                                <div style="font-weight: 700; font-size: 1.2em; color: #f8fafc;">Not Indicated</div>
                                <p style="font-size: 0.9em; color: #94a3b8; margin: 8px 0 0 0;">Rely on clinical diagnosis alone</p>
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
