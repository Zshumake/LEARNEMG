import { caseDatabase } from '../data/CaseDatabase.js';
import { ClinicalDataStandardizer } from '../utils/ClinicalDataStandardizer.js';

export class ClinicalCases {
    constructor(store) {
        this.store = store;
        this.currentCase = null;
        this.currentStep = 1;
        this.userDifferential = '';
        this.userEMGDecision = null;

        // Bind methods that might be called from event listeners
        this.analyzeDifferential = this.analyzeDifferential.bind(this);
        this.makeEMGDecision = this.makeEMGDecision.bind(this);
    }

    // Main Entry: Show Cases Dashboard
    showClinicalCases(pgyLevel) {
        console.log(`🏥 ClinicalCases.showClinicalCases triggered for ${pgyLevel}`);

        // Generate list of available cases
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

        // 1. Dashboard (Restored Legacy Design)
        const dashboardContent = `
        <style>
            .difficulty-selector {
                background: linear-gradient(135deg, #1e293b, #0f172a); 
                border-radius: 25px;
                padding: 40px;
                margin: 20px 0;
                position: relative;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }

            .selector-title {
                text-align: center;
                color: #f8fafc;
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
            }

            .selector-subtitle {
                text-align: center;
                color: #cbd5e1;
                font-size: 16px;
                margin-bottom: 40px;
                opacity: 0.9;
            }

            .difficulty-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 25px;
                margin-bottom: 40px;
                position: relative;
                z-index: 2;
            }

            .difficulty-card {
                /* Default fallback */
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 30px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                overflow: hidden;
                text-align: center;
                color: white;
                /* Ensure text doesn't spill */
                word-wrap: break-word; 
                overflow-wrap: break-word;
            }

            .difficulty-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 30px rgba(0,0,0,0.3);
            }

            /* Full colored backgrounds as requested */
            .beginner-card {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                box-shadow: 0 10px 20px rgba(34, 197, 94, 0.3);
            }

            .intermediate-card {
                background: linear-gradient(135deg, #f97316, #ea580c);
                box-shadow: 0 10px 20px rgba(249, 115, 22, 0.3);
            }

            .difficult-card {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
            }

            .card-icon {
                font-size: 48px;
                margin-bottom: 15px;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .card-title {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }

            .card-subtitle {
                font-size: 14px;
                opacity: 0.9;
                font-weight: 600;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            /* Professional Clinical Report Styling */
            .clinical-report-table {
                width: 100%;
                border-collapse: collapse;
                background-color: white !important;
                color: black !important;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-size: 11px;
                margin-bottom: 20px;
                border: 1px solid black;
            }

            .clinical-report-table th {
                background-color: #e5e7eb !important;
                color: black !important;
                font-weight: bold;
                text-align: center;
                border: 1px solid black;
                padding: 4px 6px;
                text-transform: none;
            }

            .clinical-report-table td {
                border: 1px solid black;
                padding: 3px 6px;
                text-align: center;
                background-color: white !important;
                color: black !important;
            }

            .clinical-report-table .text-left {
                text-align: left;
            }

            .clinical-report-table .abnormal-value {
                font-weight: bold;
                color: #b91c1c !important;
            }

            .clinical-report-header {
                font-weight: bold;
                font-size: 13px;
                margin: 15px 0 5px 0;
                color: #1e293b;
                text-decoration: underline;
                text-align: left;
            }

        </style>

        <div id="case-selection" class="difficulty-selector">
            <h3 class="selector-title">⚡ Choose Your Challenge Level</h3>
            <p class="selector-subtitle">Select which difficulty levels you want to practice with</p>

            <div class="difficulty-cards">
                <!-- Beginner: Green -->
                <div class="difficulty-card beginner-card" onclick="window.appComponents.clinicalCases.startBeginnerCases()">
                    <div class="card-icon">🌱</div>
                    <div class="card-title">Beginner</div>
                    <div class="card-subtitle">Learning the Basics</div>
                </div>

                <!-- Intermediate: Orange (No Lock) -->
                <div class="difficulty-card intermediate-card" onclick="window.appComponents.clinicalCases.startIntermediateCases()">
                    <div class="card-icon">🔥</div>
                    <div class="card-title">Intermediate</div>
                    <div class="card-subtitle">Building Skills</div>
                </div>

                <!-- Expert: Red (No Lock) -->
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
        </div>`;

        // 2. Case Interface (Hidden)
        const interfaceContent = `
            <div id="case-interface" style="display: none;">
                <!-- Header / Progress -->
                <div class="case-header" style="margin-bottom: 20px;">
                    <button onclick="window.appComponents.clinicalCases.startNewCase()" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; float: right;">Quit Case</button>
                    <h3 style="margin: 0; color: #2c3e50;">Clinical Case</h3>
                    <div class="progress-bar" style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 10px;">
                        <div id="progress-fill" style="height: 100%; background: #3b82f6; width: 0%; transition: width 0.3s ease;"></div>
                    </div>
                </div>

                <!-- Step 1: Presentation -->
                <div id="case-presentation-step">
                    <div id="case-details"></div>
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="window.appComponents.clinicalCases.showPhysicalExam()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Proceed to Physical Exam →</button>
                    </div>
                </div>

                <!-- Step 2: Physical Exam -->
                <div id="physical-exam-step" style="display: none;">
                    <h3>Physical Examination</h3>
                    <div id="physical-exam-details"></div>
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="window.appComponents.clinicalCases.showDifferentialBuilder()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Develop Differential →</button>
                    </div>
                </div>

                <!-- Step 3: Differential -->
                <div id="differential-step" style="display: none;">
                    <h3>Differential Diagnosis</h3>
                    <textarea id="user-differential" rows="4" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 15px;" placeholder="Type your differential diagnosis here..."></textarea>
                    <button onclick="window.appComponents.clinicalCases.analyzeDifferential()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Analyze</button>
                    <div id="differential-feedback" style="margin-top: 20px;"></div>
                    <div style="text-align: center; margin-top: 30px;">
                        <button id="continue-to-studies" onclick="window.appComponents.clinicalCases.showEMGDecision()" style="display: none; background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Next: EMG/NCS Decision →</button>
                    </div>
                </div>

                <!-- Step 4: EMG Decision -->
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

                <!-- Step 5: Results -->
                <div id="results-step" style="display: none;">
                    <h3>Electrodiagnostic Findings</h3>
                    <div id="ncs-results"></div>
                    <h3 id="emg-results" style="display: none; margin-top: 30px;">Needle EMG Findings</h3>
                    <div id="emg-details"></div>
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="window.appComponents.clinicalCases.showFinalDiagnosis()" style="background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Make Final Diagnosis →</button>
                    </div>
                </div>

                <!-- Step 6: Final Diagnosis -->
                <div id="diagnosis-step" style="display: none;">
                    <h3>Final Diagnosis</h3>
                    <input type="text" id="final-diagnosis" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 20px;" placeholder="Enter specific diagnosis...">
                    <button onclick="window.appComponents.clinicalCases.checkFinalDiagnosis()" style="background: #10b981; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Submit Diagnosis</button>
                    <div id="diagnosis-feedback" style="margin-top: 20px;"></div>
                    <div style="text-align: center; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                         <button onclick="window.appComponents.clinicalCases.startNewCase()" style="background: #64748b; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">Complete Case & Return to Dashboard</button>
                    </div>
                </div>
            </div>`;

        if (window.showModal) window.showModal('Clinical Cases', dashboardContent + interfaceContent);
    }

    handleIntermediateClick(pgyLevel) {
        if (pgyLevel === 'pgy2') {
            this.showUnlockPrompt('intermediate', 'pgy3');
        } else {
            this.startIntermediateCases();
        }
    }

    handleExpertClick(pgyLevel) {
        if (pgyLevel === 'pgy4') {
            this.startExpertCases();
        } else {
            this.showUnlockPrompt('expert', 'pgy4');
        }
    }

    showUnlockPrompt(level, requiredPGY) {
        const levelNames = { 'intermediate': 'Intermediate', 'expert': 'Expert' };
        const content = `
            <div style="text-align: center;">
                <div style="font-size: 60px; margin-bottom: 20px;">🔓</div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">Unlock ${levelNames[level]} Cases?</h3>
                <p style="color: #5a6c7d; margin-bottom: 25px;">
                    These cases are designed for ${requiredPGY.toUpperCase()} residents, but you can access them if you'd like extra challenge.
                </p>
                <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                    <p style="color: #92400e; margin: 0; font-weight: 600;">⚠️ "Proceed at your own risk!"</p>
                    <p style="color: #b45309; margin: 5px 0 0 0; font-size: 14px;">These cases may contain concepts you haven't learned yet.</p>
                </div>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="window.closeModal(); window.appComponents.clinicalCases.showClinicalCases('${requiredPGY}')" style="background: #9ca3af; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">Cancel</button>
                    <button onclick="window.appComponents.clinicalCases.${level === 'intermediate' ? 'startIntermediateCases()' : 'startExpertCases()'}" 
                            style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                        🚀 Unlock & Continue
                    </button>
                </div>
            </div>`;
        if (window.showModal) window.showModal('🔓 Unlock Cases', content);
    }

    // --- Case Initiation Logic ---

    startBeginnerCases() {
        this.startPGYSpecificCases('pgy2', 'beginner');
    }

    startIntermediateCases() {
        this.startPGYSpecificCases('pgy3', 'intermediate');
    }

    startExpertCases() {
        this.startPGYSpecificCases('pgy4', 'difficult');
    }

    startPGYSpecificCases(pgyLevel, difficulty) {
        // Ensure UI structure exists (restore if we are coming from unlock screen or closed modal)
        if (!document.getElementById('case-interface')) {
            console.log('Case interface missing, restoring UI...');
            this.showClinicalCases(pgyLevel);
        }

        // Define case filtering based on PGY level and difficulty
        const pgyLevelMap = {
            'pgy2': ['beginner'],
            'pgy3': ['beginner', 'intermediate'],
            'pgy4': ['beginner', 'intermediate', 'difficult'],
            'all': ['beginner', 'intermediate', 'difficult']
        };

        let targetDifficulties = [];
        if (difficulty === 'all') {
            targetDifficulties = pgyLevelMap[pgyLevel] || ['beginner'];
        } else {
            // In this streamlined logic, we assume if called directly we trust the mapping
            targetDifficulties = [difficulty];
        }

        // Filter cases based on difficulty
        const filteredCases = [];
        for (const [caseId, caseData] of Object.entries(caseDatabase)) {
            if (targetDifficulties.includes(caseData.difficulty)) {
                filteredCases.push(caseId);
            }
        }

        if (filteredCases.length === 0) {
            // Fallback if strict filtering finds nothing
            for (const [caseId, caseData] of Object.entries(caseDatabase)) {
                filteredCases.push(caseId); // Just use all cases
            }
        }

        if (filteredCases.length === 0) {
            alert('No cases found in database.');
            return;
        }

        // Start a random case from the filtered set
        const randomId = filteredCases[Math.floor(Math.random() * filteredCases.length)];
        this.startSpecificCase(randomId);

        console.log(`Started ${pgyLevel} level ${difficulty} case: ${randomId} `);
    }

    startRandomCase() {
        const allCaseIds = Object.keys(caseDatabase);
        if (allCaseIds.length === 0) return;
        const randomId = allCaseIds[Math.floor(Math.random() * allCaseIds.length)];
        this.startSpecificCase(randomId);
    }

    startSpecificCase(caseId) {
        if (!caseDatabase[caseId]) {
            alert('Case not available yet. Please try another case.');
            return;
        }

        this.currentCase = ClinicalDataStandardizer.standardizeCase(JSON.parse(JSON.stringify(caseDatabase[caseId])));
        window.currentCase = this.currentCase; // Sync global for legacy
        this.currentStep = 1;
        this.userDifferential = '';
        this.userEMGDecision = null;

        // Hide case selection, show case interface
        const selDiv = document.getElementById('case-selection');
        if (selDiv) selDiv.style.display = 'none';

        const intDiv = document.getElementById('case-interface');
        if (intDiv) intDiv.style.display = 'block';

        // Populate case details
        this.populateCaseDetails();

        // Reset interface
        this.showCasePresentation();
        this.updateProgress(20);
    }

    startNewCase() {
        this.currentCase = null;
        window.currentCase = null;
        this.currentStep = 1;
        this.userDifferential = '';
        this.userEMGDecision = null;

        // Reset interface
        const intDiv = document.getElementById('case-interface');
        if (intDiv) intDiv.style.display = 'none';

        const selDiv = document.getElementById('case-selection');
        if (selDiv) selDiv.style.display = 'block';

        // Clear form data
        const diffInput = document.getElementById('user-differential');
        if (diffInput) diffInput.value = '';

        const diagInput = document.getElementById('final-diagnosis');
        if (diagInput) diagInput.value = '';

        const diffFeed = document.getElementById('differential-feedback');
        if (diffFeed) diffFeed.innerHTML = '';

        const diagFeed = document.getElementById('diagnosis-feedback');
        if (diagFeed) diagFeed.innerHTML = '';

        const contBtn = document.getElementById('continue-to-studies');
        if (contBtn) contBtn.style.display = 'none';

        // Hide EMG results
        const emgRes = document.getElementById('emg-results');
        if (emgRes) emgRes.style.display = 'none';

        const emgDecFeed = document.getElementById('emg-decision-feedback');
        if (emgDecFeed) emgDecFeed.innerHTML = '';

        const contDecBtn = document.getElementById('continue-after-decision');
        if (contDecBtn) contDecBtn.style.display = 'none';

        this.updateProgress(0);

        // Show the selection modal again
        // Assuming we want to return to the picker
        if (this.store) {
            this.showClinicalCases(this.store.getPgyLevel());
        }
    }

    // --- Steps & Rendering ---

    populateCaseDetails() {
        const case_ = this.currentCase;
        const caseDetailsDiv = document.getElementById('case-details');
        if (!caseDetailsDiv) return;

        caseDetailsDiv.innerHTML = `
            <h4 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">${case_.title}</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Age</strong><br><span style="font-weight: 600;">${case_.presentation.age}</span></div>
                <div><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Gender</strong><br><span style="font-weight: 600;">${case_.presentation.gender}</span></div>
                <div><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Occupation</strong><br><span style="font-weight: 600;">${case_.presentation.occupation}</span></div>
            </div>
            
            <div class="history-section" style="display: flex; flex-direction: column; gap: 15px;">
                <div style="background: white; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h5 style="margin: 0 0 5px 0; color: #3b82f6;">Chief Complaint</h5>
                    <p style="margin: 0; line-height: 1.5;">${case_.presentation.chiefComplaint}</p>
                </div>
                
                <div style="background: white; border-left: 4px solid #64748b; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h5 style="margin: 0 0 5px 0; color: #64748b;">History of Present Illness</h5>
                    <p style="margin: 0; line-height: 1.5;">${case_.presentation.history}</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: white; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <h5 style="margin: 0 0 5px 0; color: #10b981;">Past Medical History</h5>
                        <p style="margin: 0; line-height: 1.5;">${case_.presentation.pmh}</p>
                        <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;"><strong>Meds:</strong> ${case_.presentation.medications}</p>
                    </div>
                    <div style="background: white; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <h5 style="margin: 0 0 5px 0; color: #f59e0b;">Family History</h5>
                        <p style="margin: 0; line-height: 1.5;">${case_.presentation.familyHistory || 'Non-contributory'}</p>
                    </div>
                </div>
            </div>
`;

        // Populate physical exam
        const examDiv = document.getElementById('physical-exam-details');
        if (!examDiv) return;

        const exam = case_.physicalExam;
        examDiv.innerHTML = `
            <div class="physical-exam">
                <div class="exam-category">
                    <h5>👁️ Inspection</h5>
                    <p>${exam.inspection}</p>
                </div>
                <div class="exam-category">
                    <h5>👋 Palpation</h5>
                    <p>${exam.palpation}</p>
                </div>
                <div class="exam-category">
                    <h5>🔄 Range of Motion</h5>
                    <p>${exam.rom}</p>
                </div>
                <div class="exam-category">
                    <h5>💪 Strength</h5>
                    <p>${exam.strength}</p>
                </div>
                <div class="exam-category">
                    <h5>👆 Sensation</h5>
                    <p>${exam.sensation}</p>
                </div>
                <div class="exam-category">
                    <h5>🔨 Reflexes</h5>
                    <p>${exam.reflexes}</p>
                </div>
                <div class="exam-category">
                    <h5>🧪 Special Tests</h5>
                    <p>${exam.specialTests}</p>
                </div>
            </div>
    `;
    }

    updateProgress(percentage) {
        const bar = document.getElementById('progress-fill');
        if (bar) bar.style.width = percentage + '%';
    }

    hideAllSteps() {
        const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
        steps.forEach(stepId => {
            const el = document.getElementById(stepId);
            if (el) el.style.display = 'none';
        });
    }

    showCasePresentation() {
        this.hideAllSteps();
        const el = document.getElementById('case-presentation-step');
        if (el) el.style.display = 'block';
        this.updateProgress(20);
    }

    showPhysicalExam() {
        this.hideAllSteps();
        const el = document.getElementById('physical-exam-step');
        if (el) el.style.display = 'block';
        this.updateProgress(40);
    }

    showDifferentialBuilder() {
        this.hideAllSteps();
        const el = document.getElementById('differential-step');
        if (el) el.style.display = 'block';
        this.updateProgress(60);
    }

    showEMGDecision() {
        this.hideAllSteps();
        const el = document.getElementById('emg-decision-step');
        if (el) el.style.display = 'block';
        this.updateProgress(70);
    }

    // --- Analysis Logic ---

    // Differential Analysis with Match Logic
    analyzeDifferential() {
        const userInput = document.getElementById('user-differential').value.toLowerCase();
        const expectedDifferentials = this.currentCase ? (this.currentCase.expectedDifferential || []) : [];
        const feedbackDiv = document.getElementById('differential-feedback');

        if (!userInput.trim()) {
            feedbackDiv.innerHTML = `<div class="feedback-card error"><h4>🤔 Missing Input</h4><p>Please enter your differential diagnosis first!</p></div>`;
            return;
        }

        // Fuzzy matching logic
        const matchedDiagnoses = [];
        const unmatchedDiagnoses = [];

        // Synonym dictionary for smarter matching
        const synonyms = {
            "cts": ["carpal tunnel", "carpal tunnel syndrome", "median neuropathy at wrist"],
            "une": ["ulnar neuropathy at elbow", "cubital tunnel", "cubital tunnel syndrome"],
            "gbs": ["guillain-barre", "aidp", "acute inflammatory demyelinating polyneuropathy"],
            "cidp": ["chronic inflammatory demyelinating polyneuropathy"],
            "als": ["amyotrophic lateral sclerosis", "lou gehrig"],
            "mg": ["myasthenia gravis", "myasthenia"],
            "md": ["muscular dystrophy"],
            "pn": ["polyneuropathy", "peripheral neuropathy"],
            "radiculopathy": ["root", "radic"],
            "plexopathy": ["plexus"]
        };

        const isMatch = (userTerm, expectedTerm) => {
            userTerm = userTerm.toLowerCase().trim();
            expectedTerm = expectedTerm.toLowerCase().trim();
            if (expectedTerm.includes(userTerm) || userTerm.includes(expectedTerm)) return true;

            // Check synonyms
            for (const [abbr, terms] of Object.entries(synonyms)) {
                if (userTerm === abbr || terms.includes(userTerm)) {
                    if (terms.some(t => expectedTerm.includes(t)) || expectedTerm.includes(abbr)) return true;
                }
            }
            return false;
        };

        expectedDifferentials.forEach(expected => {
            // Simple check: does user input contain the expected term or synonym?
            // Since userInput is a full paragraph potentially, we check if expected terms are IN userInput
            if (isMatch(expected, userInput) || userInput.includes(expected.toLowerCase())) {
                matchedDiagnoses.push(expected);
            } else {
                unmatchedDiagnoses.push(expected);
            }
        });

        // Also check if user listed something valid that isn't in expected (would need more complex NLP, skipping for now)

        let feedbackHTML = `
    <div class="analysis-header">
                <h3>📊 Analysis Result</h3>
                <p>You identified <strong>${matchedDiagnoses.length}</strong> out of <strong>${expectedDifferentials.length}</strong> key differentials.</p>
            </div>
    `;

        if (matchedDiagnoses.length > 0) {
            feedbackHTML += `
            <div class="feedback-card success">
                    <h4>✅ Well Done!</h4>
                    <p>You correctly included:</p>
                    <ul>
                        ${matchedDiagnoses.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
    `;
        } else {
            feedbackHTML += `
            <div class="feedback-card warning">
                    <h4>🤔 Keep Thinking</h4>
                    <p>Consider the anatomy and distribution of symptoms again.</p>
                </div>
    `;
        }

        feedbackHTML += `
            <div class="feedback-card info" style="margin-top: 20px; border-top: 2px solid #e2e8f0; padding-top: 20px;">
                <h4 style="color: #1e293b;">📘 Textbook Differential</h4>
                <p style="color: #64748b; font-size: 14px; margin-bottom: 10px;">For a patient with this presentation, the standard differential includes:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${expectedDifferentials.map(d => `<span style="background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 16px; font-size: 13px; font-weight: 500; border: 1px solid #e2e8f0;">${d}</span>`).join('')}
                </div>
                <p class="feedback-note" style="margin-top: 15px; font-style: italic; color: #64748b;"><strong>Learning Point:</strong> Compare your list with the textbook examples above to identify any clinical blind spots.</p>
            </div>
    `;

        feedbackDiv.innerHTML = feedbackHTML;
        const contBtn = document.getElementById('continue-to-studies');
        if (contBtn) contBtn.style.display = 'inline-block';
    }

    makeEMGDecision(indicatedDecision) {
        this.userEMGDecision = indicatedDecision;
        const feedbackDiv = document.getElementById('emg-decision-feedback');
        const continueBtn = document.getElementById('continue-after-decision');
        const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";

        if (indicatedDecision === true && isEMGIndicated) {
            feedbackDiv.innerHTML = `
            <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #27ae60;">✅ Correct Decision</h4>
                    <p>You correctly identified that this presentation warrants EMG/NCS evaluation.</p>
                </div>`;
            if (continueBtn) {
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Proceed to EMG/NCS Results →';
            }
        } else if (indicatedDecision === false && !isEMGIndicated) {
            feedbackDiv.innerHTML = `
            <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #27ae60;">✅ Excellent Clinical Judgment</h4>
                    <p>You correctly identified that EMG/NCS is <strong>not indicated</strong> in this case (Central cause).</p>
                    <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                        <h5>🚨 Immediate Management Required</h5>
                        <p>${this.currentCase.educationalNote}</p>
                    </div>
                </div>`;
            if (continueBtn) {
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Complete Case Review →';
            }
        } else if (indicatedDecision === false && isEMGIndicated) {
            feedbackDiv.innerHTML = `
            <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                    <p>Actually, EMG/NCS <strong>would be appropriate</strong> in this case.</p>
                </div>`;
            if (continueBtn) {
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Proceed to EMG/NCS Results (Educational) →';
            }
        } else {
            feedbackDiv.innerHTML = `
            <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                    <p>EMG/NCS would <strong>not be helpful</strong> in this case (Central signs present).</p>
                     <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                        <h5>🚨 This Patient Needs:</h5>
                        <p>${this.currentCase.educationalNote}</p>
                    </div>
                </div>`;
            if (continueBtn) {
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Complete Case Review →';
            }
        }
    }

    proceedAfterDecision() {
        const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";

        if (this.userEMGDecision === true && isEMGIndicated) {
            this.showNCSResults();
        } else if (this.userEMGDecision === false && !isEMGIndicated) {
            this.showFinalDiagnosis();
        } else if (this.userEMGDecision === false && isEMGIndicated) {
            this.showNCSResults(); // Educational show
        } else {
            this.showFinalDiagnosis(); // Central case end
        }
    }

    showNCSResults() {
        this.hideAllSteps();
        const resStep = document.getElementById('results-step');
        if (resStep) resStep.style.display = 'block';

        const ncsDiv = document.getElementById('ncs-results');
        if (!ncsDiv) return;

        if (this.currentCase.emgIndication === "NOT INDICATED") {
            ncsDiv.innerHTML = `
            <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #e74c3c;">⚠️ EMG/NCS NOT INDICATED</h4>
                    <p>${this.currentCase.explanation}</p>
                </div>`;
        } else {
            // Group NCS studies by type
            const studies = this.currentCase.ncsStudies || [];
            const motorStudies = studies.filter(s => s.type === 'motor');
            const sensoryStudies = studies.filter(s => s.type === 'sensory');
            const comparisonStudies = studies.filter(s => s.type === 'comparison');
            const otherStudies = studies.filter(s => !s.type || (s.type !== 'motor' && s.type !== 'sensory' && s.type !== 'comparison'));

            let ncsHtml = '';

            // 1. Sensory Table
            if (sensoryStudies.length > 0) {
                ncsHtml += `<div class="clinical-report-header">Anti Sensory Summary Table</div>`;
                ncsHtml += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Nerve / Site</th>
                            <th>NR</th>
                            <th>Peak (ms)</th>
                            <th>Norm Peak (ms)</th>
                            <th>P-T* Amp (µV)</th>
                            <th>Norm P-T Amp</th>
                            <th>Site1</th>
                            <th>Site2</th>
                            <th>Delta-P (ms)</th>
                            <th>Dist (cm)</th>
                            <th>Vel (m/s)</th>
                            <th>Norm Vel (m/s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sensoryStudies.map(s => {
                    const peakClass = this.isAbnormal(s.peak, s.normPeak) ? 'abnormal-value' : '';
                    const ampClass = this.isAbnormal(s.amp, s.normAmp) ? 'abnormal-value' : '';
                    const velClass = this.isAbnormal(s.velocity, s.normVelocity) ? 'abnormal-value' : '';
                    return `
                            <tr>
                                <td class="text-left">${s.name} / ${s.site || ''}</td>
                                <td>${s.nr || ''}</td>
                                <td class="${peakClass}">${s.peak || '-'}</td>
                                <td>${s.normPeak || ''}</td>
                                <td class="${ampClass}">${s.amp || '-'}</td>
                                <td>${s.normAmp || ''}</td>
                                <td>${s.site1 || ''}</td>
                                <td>${s.site2 || ''}</td>
                                <td>${s.deltaP || ''}</td>
                                <td>${s.distance || '-'}</td>
                                <td class="${velClass}">${s.velocity || '-'}</td>
                                <td>${s.normVelocity || ''}</td>
                            </tr>
                        `;
                }).join('')}
                    </tbody>
                </table>`;
            }

            // 2. Motor Table
            if (motorStudies.length > 0) {
                ncsHtml += `<div class="clinical-report-header">Motor Summary Table</div>`;
                ncsHtml += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Nerve / Site</th>
                            <th>NR</th>
                            <th>Onset (ms)</th>
                            <th>Norm Onset (ms)</th>
                            <th>O-P* Amp (mV)</th>
                            <th>Norm O-P Amp</th>
                            <th>Neg Dur (ms)</th>
                            <th>Site1</th>
                            <th>Site2</th>
                            <th>Delta-O (ms)</th>
                            <th>Dist (cm)</th>
                            <th>Vel (m/s)</th>
                            <th>Norm Vel (m/s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${motorStudies.map(s => {
                    const onsetClass = this.isAbnormal(s.onset, s.normOnset) ? 'abnormal-value' : '';
                    const ampClass = this.isAbnormal(s.amp, s.normAmp) ? 'abnormal-value' : '';
                    const velClass = this.isAbnormal(s.velocity, s.normVelocity) ? 'abnormal-value' : '';
                    return `
                            <tr>
                                <td class="text-left">${s.name} / ${s.site || ''}</td>
                                <td>${s.nr || ''}</td>
                                <td class="${onsetClass}">${s.onset || '-'}</td>
                                <td>${s.normOnset || ''}</td>
                                <td class="${ampClass}">${s.amp || '-'}</td>
                                <td>${s.normAmp || ''}</td>
                                <td>${s.negDur || '-'}</td>
                                <td>${s.site1 || ''}</td>
                                <td>${s.site2 || ''}</td>
                                <td>${s.deltaO || ''}</td>
                                <td>${s.distance || '-'}</td>
                                <td class="${velClass}">${s.velocity || '-'}</td>
                                <td>${s.normVelocity || ''}</td>
                            </tr>
                        `;
                }).join('')}
                    </tbody>
                </table>`;
            }

            // 3. Comparison Table
            if (comparisonStudies.length > 0) {
                ncsHtml += `<div class="clinical-report-header">Comparison Summary Table</div>`;
                ncsHtml += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Study Name</th>
                            <th>NR</th>
                            <th>Peak (ms)</th>
                            <th>P-T* Amp (µV)</th>
                            <th>Site1</th>
                            <th>Site2</th>
                            <th>Delta-P (ms)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${comparisonStudies.map(s => `
                            <tr>
                                <td class="text-left">${s.name} / ${s.site || ''}</td>
                                <td>${s.nr || ''}</td>
                                <td>${s.peak || ''}</td>
                                <td>${s.amp || ''}</td>
                                <td>${s.site1 || ''}</td>
                                <td>${s.site2 || ''}</td>
                                <td class="${Math.abs(s.deltaP || 0) > 0.4 ? 'abnormal-value' : ''}">${s.deltaP || ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`;
            }

            // 4. Legacy/Other Table
            if (otherStudies.length > 0) {
                ncsHtml += `<div class="clinical-report-header">NCS Findings Summary</div>`;
                ncsHtml += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Study Name</th>
                            <th class="text-left">Findings</th>
                            <th class="text-left">Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${otherStudies.map(s => `
                            <tr>
                                <td class="text-left"><strong>${s.name}</strong></td>
                                <td class="text-left">${s.findings}</td>
                                <td class="text-left">${s.interpretation}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`;
            }

            ncsDiv.innerHTML = ncsHtml;

            // EMG Table
            const emgTitle = document.getElementById('emg-results');
            if (this.currentCase.requiresEMG && this.currentCase.emgStudies) {
                if (emgTitle) emgTitle.style.display = 'block';

                const emgDetailDiv = document.getElementById('emg-details');
                if (emgDetailDiv) {
                    emgDetailDiv.innerHTML = `
                    <div class="clinical-report-header">Needle EMG Summary Table</div>
                    <table class="clinical-report-table">
                        <thead>
                            <tr>
                                <th>Side</th>
                                <th class="text-left">Muscle</th>
                                <th>Nerve</th>
                                <th>Root</th>
                                <th>Ins Act</th>
                                <th>Fibs</th>
                                <th>Psw</th>
                                <th>Amp</th>
                                <th>Dur</th>
                                <th>Poly</th>
                                <th>Recrt</th>
                                <th>Int Pat</th>
                                <th>Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.currentCase.emgStudies.map(s => {
                        const isAbnormal = (field) => {
                            if (!field) return false;
                            const f = String(field).toLowerCase();
                            return f !== 'nml' && f !== 'none' && f !== '0' && f !== 'normal' && f !== 'full';
                        };

                        return `
                                <tr>
                                    <td>${s.side || ''}</td>
                                    <td class="text-left">${s.muscle}</td>
                                    <td>${s.nerve || '-'}</td>
                                    <td>${s.root || '-'}</td>
                                    <td class="${isAbnormal(s.insAct) ? 'abnormal-value' : ''}">${s.insAct || 'Nml'}</td>
                                    <td class="${isAbnormal(s.fibs) ? 'abnormal-value' : ''}">${s.fibs || '0'}</td>
                                    <td class="${isAbnormal(s.psw) ? 'abnormal-value' : ''}">${s.psw || '0'}</td>
                                    <td class="${isAbnormal(s.amp) ? 'abnormal-value' : ''}">${s.amp || 'Nml'}</td>
                                    <td class="${isAbnormal(s.dur) ? 'abnormal-value' : ''}">${s.dur || 'Nml'}</td>
                                    <td>${s.poly || '0'}</td>
                                    <td class="${isAbnormal(s.recrt) ? 'abnormal-value' : ''}">${s.recrt || 'Nml'}</td>
                                    <td class="${isAbnormal(s.intPat) ? 'abnormal-value' : ''}">${s.intPat || 'Full'}</td>
                                    <td class="text-left">${s.comment || s.findings || ''}</td>
                                </tr>
                            `;
                    }).join('')}
                        </tbody>
                    </table>`;
                }
            } else {
                if (emgTitle) emgTitle.style.display = 'none';
                const emgDetailDiv = document.getElementById('emg-details');
                if (emgDetailDiv) emgDetailDiv.innerHTML = '';
            }
        }
        this.updateProgress(80);
    }

    isAbnormal(value, normalRange) {
        if (!value || !normalRange) return false;
        // Simple heuristic for common EMG/NCS string-based thresholds
        const v = parseFloat(value);
        if (isNaN(v)) return false;

        // Strip units and common prefixes
        const cleanRange = normalRange.replace(/[^0-9.<>]/g, '');

        if (cleanRange.includes('<')) {
            const threshold = parseFloat(cleanRange.replace('<', ''));
            return v > threshold;
        }
        if (cleanRange.includes('>')) {
            const threshold = parseFloat(cleanRange.replace('>', ''));
            return v < threshold;
        }
        return false;
    }

    showFinalDiagnosis() {
        this.hideAllSteps();
        const diagStep = document.getElementById('diagnosis-step');
        if (diagStep) diagStep.style.display = 'block';
        this.updateProgress(100);
    }

    checkFinalDiagnosis() {
        const userDiagnosis = document.getElementById('final-diagnosis').value.trim();
        const feedbackDiv = document.getElementById('diagnosis-feedback');
        if (!userDiagnosis) return;

        // Simple matching
        const correctDiagnosis = this.currentCase.correctDiagnosis.toLowerCase();
        const userLower = userDiagnosis.toLowerCase();
        const isCorrect = correctDiagnosis.includes(userLower) || userLower.includes(correctDiagnosis);

        let feedbackHTML = `< div class="analysis-header" ><h3>🎯 Final Diagnosis Review</h3><p>Your diagnosis: "<em>${userDiagnosis}</em>"</p></div > `;

        if (isCorrect) {
            feedbackHTML += `
                <div class="feedback-card success" style="background: #f0fff4; border: 2px solid #22c55e; border-radius: 12px; padding: 25px; margin-top: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <span style="font-size: 24px;">🌟</span>
                        <h4 style="margin: 0; color: #166534; font-size: 18px;">Excellent! Accurate Diagnosis</h4>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 20px;">
                        <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Final Diagnosis</strong>
                        <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: 700; color: #1e293b;">${this.currentCase.correctDiagnosis}</p>
                    </div>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                        <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Diagnostic Reasoning</strong>
                        <p style="margin: 5px 0 0 0; line-height: 1.6; color: #334155;">${this.currentCase.explanation}</p>
                    </div>
                </div>`;
        } else {
            feedbackHTML += `
                <div class="feedback-card error" style="background: #fff1f2; border: 2px solid #ef4444; border-radius: 12px; padding: 25px; margin-top: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <span style="font-size: 24px;">🧐</span>
                        <h4 style="margin: 0; color: #991b1b; font-size: 18px;">Clinical Correlation</h4>
                    </div>
                    <p style="color: #7f1d1d; margin-bottom: 20px;">Your diagnosis was: <strong>${userDiagnosis}</strong>. Let's look at the expert analysis.</p>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin-bottom: 20px;">
                        <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Correct Diagnosis</strong>
                        <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: 700; color: #1e293b;">${this.currentCase.correctDiagnosis}</p>
                    </div>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                        <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Diagnostic Reasoning</strong>
                        <p style="margin: 5px 0 0 0; line-height: 1.6; color: #334155;">${this.currentCase.explanation}</p>
                    </div>
                </div>`;
        }

        if (this.currentCase.emgIndication === "NOT INDICATED") {
            feedbackHTML += `
                <div class="feedback-card warning" style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-top: 15px; display: flex; align-items: flex-start; gap: 15px;">
                    <span style="font-size: 20px;">⚠️</span>
                    <div>
                        <h5 style="margin: 0 0 5px 0; color: #92400e; font-size: 16px;">Key Educational Note</h5>
                        <p style="margin: 0; color: #b45309; font-size: 14px;"><strong>EMG/NCS was NOT indicated</strong> for this case. Clinical focus should be on immediate management of the central pathology.</p>
                    </div>
                </div>`;
        }

        feedbackDiv.innerHTML = feedbackHTML;
    }

    // Pathophysiology Modals
    showRadiculopathyPathophysiology() {
        const content = `
    < div style = "max-width: 900px; margin: 0 auto;" >
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #4a6d52; margin-bottom: 10px;">🧠 Radiculopathy Pathophysiology</h2>
                    <p style="color: #6b9f78; font-size: 1.1em;">Level 1 Foundation</p>
                </div>
                 <div style="background: white; padding: 25px;">
                    <h3>Mechanism of Injury</h3>
                    <ul>
                        <li><strong>Disc Herniation:</strong> Nucleus pulposus compresses nerve root</li>
                        <li><strong>Spinal Stenosis:</strong> Narrowed foramen</li>
                    </ul>
                 </div>
                 <div style="text-align: center; margin-top: 30px;">
                    <button onclick="window.closeModal()" style="background: #6b7280; color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer;">Close</button>
                </div>
            </div > `;
        if (window.showModal) window.showModal('Radiculopathy Pathophysiology', content);
    }

    showNeuropathyPathophysiology() {
        const content = `
    < div style = "max-width: 900px; margin: 0 auto;" >
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #4a6d52; margin-bottom: 10px;">🧬 Peripheral Neuropathy</h2>
                </div>
                 <div style="background: white; padding: 25px;">
                    <h3>Axonal vs Demyelinating</h3>
                    <p>Understanding the difference is key to diagnosis.</p>
                 </div>
                 <div style="text-align: center; margin-top: 30px;">
                    <button onclick="window.closeModal()" style="background: #6b7280; color: white; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer;">Close</button>
                </div>
            </div > `;
        if (window.showModal) window.showModal('Neuropathy Pathophysiology', content);
    }
}
