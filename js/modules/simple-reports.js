// ============================================================================
// MODULE 12: AANEM REPORT WRITING
// ============================================================================
// Interactive tutorial and template generator based on AANEM guidelines
// Two-tab system: Tutorial | Template Generator
// ============================================================================

import { registerModulePodcasts, generateErnestButton } from '../podcast-player.js';

console.log('📝 Loading AANEM Report Writing module...');

export function generateContent(module) {
    // Register podcast for this module
    registerModulePodcasts('simple-reports');

    // Initialize global functions immediately
    window.switchReportTab = switchReportTab;
    window.showTutorialStep = showTutorialStep;
    window.generateWizardProgressBar = generateWizardProgressBar;
    window.showWizardStep = showWizardStep;
    window.saveCurrentStepData = saveCurrentStepData;
    window.escapeHtml = escapeHtml;

    // Expose wizard helper functions
    window.addSensoryRow = addSensoryRow;
    window.removeSensoryRow = removeSensoryRow;
    window.updateSensoryRow = updateSensoryRow;
    window.addMotorRow = addMotorRow;
    window.removeMotorRow = removeMotorRow;
    window.updateMotorRow = updateMotorRow;
    window.addEmgRow = addEmgRow;
    window.addNormalEmgRow = addNormalEmgRow;
    window.removeEmgRow = removeEmgRow;
    window.updateEmgRow = updateEmgRow;
    window.copyReport = copyReport;
    window.printReport = printReport;
    window.renderSensoryRows = renderSensoryRows;
    window.renderMotorRows = renderMotorRows;
    window.renderEmgRows = renderEmgRows;

    // Initialize report data if not exists
    if (!window.reportData) {
        window.reportData = {
            patient: { name: '', dob: '', mrn: '', date: new Date().toISOString().split('T')[0], referring: '', tech: '', instrument: '', history: '' },
            ncs: { sensory: [], motor: [] },
            emg: [],
            summary: { narrative: '', limitations: '', comparison: '', diagnosis: '', recommendations: '' }
        };
        window.currentTemplateStep = 1;
    }

    return `
        <div class="interactive-content" style="max-width: 1400px; margin: 0 auto; position: relative;">${generateErnestButton('simple-reports', 'Report Writing')}

            <!-- Tab Navigation -->
            <div style="display: flex; gap: 15px; margin-bottom: 30px; border-bottom: 3px solid #e5e7eb; padding-bottom: 0;">
                <button id="tutorial-tab" onclick="switchReportTab('tutorial')"
                    style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                    📚 Interactive Tutorial
                </button>
                <button id="template-tab" onclick="switchReportTab('template')"
                    style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: white; color: #64748b; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease; border: 2px solid rgba(59, 130, 246, 0.3);">
                    📝 Template Generator
                </button>
            </div>

            <!-- Tutorial Section -->
            <div id="tutorial-section" style="display: block;">
                ${generateTutorialContent()}
            </div>

            <!-- Template Generator Section -->
            <div id="template-section" style="display: none;">
                ${generateTemplateContent()}
            </div>

        </div>
    `;
}

// ============================================================================
// GLOBAL HELPER FUNCTIONS
// ============================================================================

function switchReportTab(tab) {
    const tutorialSection = document.getElementById('tutorial-section');
    const templateSection = document.getElementById('template-section');
    const tutorialTab = document.getElementById('tutorial-tab');
    const templateTab = document.getElementById('template-tab');

    if (tab === 'tutorial') {
        tutorialSection.style.display = 'block';
        templateSection.style.display = 'none';
        tutorialTab.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        tutorialTab.style.color = 'white';
        tutorialTab.style.border = 'none';
        tutorialTab.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
        templateTab.style.background = 'white';
        templateTab.style.color = '#64748b';
        templateTab.style.border = '2px solid rgba(59, 130, 246, 0.3)';
        templateTab.style.boxShadow = 'none';
    } else {
        tutorialSection.style.display = 'none';
        templateSection.style.display = 'block';
        tutorialTab.style.background = 'white';
        tutorialTab.style.color = '#64748b';
        tutorialTab.style.border = '2px solid rgba(139, 92, 246, 0.3)';
        tutorialTab.style.boxShadow = 'none';
        templateTab.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        templateTab.style.color = 'white';
        templateTab.style.border = 'none';
        templateTab.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';

        // Initialize wizard if needed
        if (!window.reportData) {
            window.reportData = {
                patient: { name: '', dob: '', mrn: '', date: new Date().toISOString().split('T')[0], referring: '', tech: '', instrument: '', history: '' },
                ncs: { sensory: [], motor: [] },
                emg: [],
                summary: { narrative: '', limitations: '', comparison: '', diagnosis: '', recommendations: '' }
            };
            window.currentTemplateStep = 1;
        }

        // Ensure rows are rendered if they exist
        setTimeout(() => {
            if (window.renderSensoryRows) window.renderSensoryRows();
            if (window.renderMotorRows) window.renderMotorRows();
            if (window.renderEmgRows) window.renderEmgRows();
        }, 100);
    }
}

function showTutorialStep(step) {
    // Hide all steps
    for (let i = 1; i <= 5; i++) {
        const stepDiv = document.getElementById(`tutorial-step-${i}`);
        if (stepDiv) stepDiv.style.display = 'none';
    }

    // Show requested step
    const targetStep = document.getElementById(`tutorial-step-${step}`);
    if (targetStep) targetStep.style.display = 'block';

    // Update progress bar
    const progressContainer = document.getElementById('tutorial-progress');
    if (progressContainer) {
        progressContainer.innerHTML = generateProgressBar(step, 5);
    }

    // Scroll to top of tutorial
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const tutorialSection = document.getElementById('tutorial-section');
    if (tutorialSection) {
        tutorialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================================================
// TUTORIAL CONTENT GENERATOR
// ============================================================================
function generateTutorialContent() {
    return `
        <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #1e293b; font-size: 2.2rem; margin-bottom: 15px;">
                    📋 AANEM Report Writing Tutorial
                </h2>
                <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0 auto;">
                    Learn how to write professional electrodiagnostic reports following AANEM guidelines.
                    This step-by-step tutorial covers all essential sections of an EMG/NCS report.
                </p>
            </div>

            <!-- Progress Indicator -->
            <div id="tutorial-progress" style="margin-bottom: 40px;">
                ${generateProgressBar(1, 5)}
            </div>

            <!-- Tutorial Steps Container -->
            <div id="tutorial-content">
                <div id="tutorial-step-1" style="display: block;">
                    ${generateTutorialStep1()}
                </div>
                <div id="tutorial-step-2" style="display: none;">
                    ${generateTutorialStep2()}
                </div>
                <div id="tutorial-step-3" style="display: none;">
                    ${generateTutorialStep3()}
                </div>
                <div id="tutorial-step-4" style="display: none;">
                    ${generateTutorialStep4()}
                </div>
                <div id="tutorial-step-5" style="display: none;">
                    ${generateTutorialStep5()}
                </div>
            </div>

            <!-- Quiz Section -->
            ${generateModuleQuiz([
        {
            question: "Which section of the EDX report should be written in a NARRATIVE format?",
            options: [
                "Nerve Conduction Studies",
                "Needle EMG Findings",
                "Summary",
                "Patient Demographics"
            ],
            correct: 2,
            explanation: "The SUMMARY section provides a narrative synthesis of the findings. The NCS and EMG data should always be presented in TABULAR format for clarity and ease of review."
        },
        {
            question: "Why is it critical to include the patient's Date of Birth or Age in the report?",
            options: [
                "For billing purposes only",
                "To determine appropriate reference values",
                "To identify the patient",
                "It is not critical"
            ],
            correct: 1,
            explanation: "Nerve conduction velocities and amplitudes change with age. Therefore, knowing the patient's age is essential for selecting the correct REFERENCE VALUES to interpret the study accurately."
        },
        {
            question: "How should abnormal values in NCS tables be highlighted?",
            options: [
                "They should not be highlighted to avoid bias",
                "With a footnote only",
                "Clearly marked (e.g., bold, asterisk, color) to draw attention",
                "By deleting normal values"
            ],
            correct: 2,
            explanation: "Abnormal values should be CLEARLY MARKED (e.g., with an asterisk, bold text, or color) so that the referring physician can quickly identify the pathological findings."
        },
        {
            question: "What is the primary purpose of the 'Clinical Correlation' section?",
            options: [
                "To repeat the electrodiagnostic findings",
                "To list the patient's medications",
                "To explain how the EDX findings relate to the patient's symptoms and clinical presentation",
                "To criticize the referring physician's diagnosis"
            ],
            correct: 2,
            explanation: "The Clinical Correlation section connects the technical EDX findings to the patient's specific symptoms, explaining whether the findings explain the complaint and answering the referring physician's clinical question."
        },
        {
            question: "If a muscle is not examined during needle EMG, how should it be documented?",
            options: [
                "Left blank in the table",
                "Marked as 'Normal'",
                "Marked as 'Not Tested' or omitted from the table",
                "Marked as 'Incomplete'"
            ],
            correct: 2,
            explanation: "If a muscle is not tested, it should be clearly marked as 'NOT TESTED' or simply not listed. Leaving it blank or marking it normal is misleading and can be interpreted as a normal finding."
        },
        {
            question: "Which of the following is a REQUIRED element for reporting Motor NCS?",
            options: [
                "Needle type used",
                "Room humidity",
                "Amplitude, Distal Latency, Conduction Velocity, and Distance",
                "Patient's height"
            ],
            correct: 2,
            explanation: "For Motor NCS, you must report the AMPLITUDE (axonal integrity), DISTAL LATENCY (distal demyelination), CONDUCTION VELOCITY (segmental demyelination), and DISTANCE (to validate velocity)."
        },
        {
            question: "In the Diagnostic Interpretation, what does 'Right Median Neuropathy at the Wrist' specify?",
            options: [
                "Just the nerve involved",
                "The nerve, the side, and the localization of the lesion",
                "The severity only",
                "The etiology only"
            ],
            correct: 1,
            explanation: "A complete diagnosis specifies the NERVE (Median), the LATERALITY (Right), and the LOCALIZATION (at the Wrist). It should also ideally comment on severity and pathophysiology (e.g., demyelinating vs axonal)."
        },
        {
            question: "What does the presence of 'Fibrillation Potentials' in the EMG table indicate?",
            options: [
                "Normal muscle activity",
                "Active denervation / Membrane instability",
                "Reinnervation",
                "Central nervous system lesion"
            ],
            correct: 1,
            explanation: "Fibrillation potentials (and positive sharp waves) are signs of ACTIVE DENERVATION and muscle membrane instability. They are a critical finding in neuropathic and myopathic processes."
        },
        {
            question: "Which part of the report answers the question: 'Why was this study performed?'",
            options: [
                "Patient Demographics",
                "Clinical Problem / History",
                "NCS Tables",
                "Description of Procedure"
            ],
            correct: 1,
            explanation: "The CLINICAL PROBLEM or HISTORY section states the patient's symptoms and the clinical question (e.g., 'Rule out carpal tunnel syndrome'), establishing the indication for the study."
        },
        {
            question: "When reporting Sensory NCS, which parameters are essential?",
            options: [
                "Peak Latency and Amplitude",
                "Duration only",
                "Area under the curve",
                "Stimulation intensity"
            ],
            correct: 0,
            explanation: "For Sensory NCS, the PEAK LATENCY (or onset latency) and AMPLITUDE are the key parameters. Conduction velocity is also typically reported."
        }
    ])}

        </div>
    `;
}

// ============================================================================
// PROGRESS BAR
// ============================================================================
function generateProgressBar(currentStep, totalSteps) {
    const steps = [
        '👤 Patient Data',
        '⚡ NCS Studies',
        '💉 Needle EMG',
        '📊 Summary',
        '🎯 Interpretation'
    ];

    let progressHTML = '<div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">';

    for (let i = 1; i <= totalSteps; i++) {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        let bgColor = '#e5e7eb';
        let textColor = '#9ca3af';
        let borderColor = '#e5e7eb';

        if (isCompleted) {
            bgColor = '#10b981';
            textColor = 'white';
            borderColor = '#10b981';
        } else if (isActive) {
            bgColor = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            textColor = 'white';
            borderColor = '#3b82f6';
        }

        progressHTML += `
            <div style="flex: 1; text-align: center;">
                <div style="background: ${bgColor}; color: ${textColor}; border: 2px solid ${borderColor}; border-radius: 12px; padding: 15px 10px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    ${isCompleted ? '✓' : `Step ${i}`}
                    <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.9;">${steps[i - 1]}</div>
                </div>
            </div>
        `;
    }

    progressHTML += '</div>';
    return progressHTML;
}

// ============================================================================
// TUTORIAL STEP 1: PATIENT DATA & CLINICAL PROBLEM
// ============================================================================
function generateTutorialStep1() {
    return `
        <div class="tutorial-step" data-step="1">
            <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">👤</span>
                Step 1: Patient Data & Clinical Problem
            </h3>

            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                <p style="color: #475569; line-height: 1.8; margin: 0;">
                    Every electrodiagnostic report must begin with essential patient information and a clear statement of the clinical problem being investigated. This section establishes the context for the entire study.
                </p>
            </div>

            <h4 style="color: #1e293b; margin: 30px 0 15px 0;">✅ Required Elements:</h4>

            <div style="display: grid; gap: 20px; margin-bottom: 30px;">

                <!-- Patient Demographics -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">1. Patient Demographics</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Patient Name:</strong> Full legal name</li>
                        <li><strong>Date of Birth / Age:</strong> For age-appropriate reference values</li>
                        <li><strong>Date of Study:</strong> When the EMG/NCS was performed</li>
                        <li><strong>Medical Record Number:</strong> (if applicable)</li>
                    </ul>
                </div>

                <!-- Referring Provider -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">2. Referring Provider Information</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Referring Physician:</strong> Name and specialty</li>
                        <li><strong>Clinical Question:</strong> What is being investigated?</li>
                    </ul>
                </div>

                <!-- Clinical Problem -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">3. Clinical Problem Statement</h5>
                    <p style="color: #475569; line-height: 1.8; margin-bottom: 15px;">
                        A concise description of the patient's symptoms and clinical presentation. This should include:
                    </p>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Chief Complaint:</strong> Primary symptom (e.g., "hand numbness", "foot drop")</li>
                        <li><strong>Location:</strong> Which extremity or region is affected?</li>
                        <li><strong>Duration:</strong> How long have symptoms been present?</li>
                        <li><strong>Quality:</strong> Numbness? Weakness? Pain? Tingling?</li>
                        <li><strong>Relevant History:</strong> Trauma, diabetes, occupation, etc.</li>
                    </ul>
                </div>

            </div>

            <!-- Example Report Section -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">💡</span> Example: Well-Written Patient Data Section
                </h4>
                <div style="background: white; border-radius: 8px; padding: 20px; font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.8; color: #1e293b;">
                    <strong>PATIENT:</strong> Jane Smith<br>
                    <strong>DATE OF BIRTH:</strong> 03/15/1978 (Age 47)<br>
                    <strong>DATE OF STUDY:</strong> November 20, 2025<br>
                    <strong>MRN:</strong> 123456789<br>
                    <strong>REFERRING PHYSICIAN:</strong> Dr. John Davis, Neurology<br>
                    <br>
                    <strong>CLINICAL PROBLEM:</strong><br>
                    The patient is a 47-year-old right-handed woman presenting with a 6-month history of numbness and tingling in the right thumb, index, and middle fingers. Symptoms are worse at night and after prolonged computer use. She reports occasional hand weakness when gripping objects. No history of trauma. The patient works as a data entry clerk. Referred for evaluation of possible median neuropathy at the wrist.
                </div>
            </div>

            <!-- Key Tips -->
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #92400e; margin-bottom: 12px;">⚠️ Important Tips:</h4>
                <ul style="color: #78350f; line-height: 2; margin: 0; padding-left: 25px;">
                    <li>Be specific and objective in describing symptoms</li>
                    <li>Include duration and severity of symptoms</li>
                    <li>Note any relevant medical history (diabetes, trauma, occupation)</li>
                    <li>State the clinical question clearly (e.g., "rule out carpal tunnel syndrome")</li>
                    <li>Avoid speculation or diagnosis in this section - just state the facts</li>
                </ul>
            </div>

            <!-- Navigation -->
            <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
                <button onclick="showTutorialStep(2)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Next: NCS Studies →
                </button>
            </div>
        </div>
    `;
}

// ============================================================================
// TUTORIAL STEP 2: NERVE CONDUCTION STUDIES
// ============================================================================
function generateTutorialStep2() {
    return `
        <div class="tutorial-step" data-step="2">
            <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">⚡</span>
                Step 2: Nerve Conduction Studies
            </h3>

            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                <p style="color: #475569; line-height: 1.8; margin: 0;">
                    Nerve conduction study results must be presented in <strong>tabular format</strong> with clear indication of abnormal values.
                    Include reference values or clearly mark abnormalities. Both amplitude and latency/velocity data are essential.
                </p>
            </div>

            <h4 style="color: #1e293b; margin: 30px 0 15px 0;">✅ Required Data for Each Study:</h4>

            <div style="display: grid; gap: 20px; margin-bottom: 30px;">

                <!-- Sensory Studies -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">📊 Sensory Nerve Studies</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Nerve tested:</strong> (e.g., Median sensory, Ulnar sensory)</li>
                        <li><strong>Recording site:</strong> Where electrodes were placed</li>
                        <li><strong>Peak latency:</strong> Time to peak (ms)</li>
                        <li><strong>Amplitude:</strong> Peak-to-peak (μV)</li>
                        <li><strong>Distance:</strong> Between stimulation and recording (cm)</li>
                        <li><strong>Conduction velocity:</strong> (m/s)</li>
                    </ul>
                </div>

                <!-- Motor Studies -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">⚡ Motor Nerve Studies</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Nerve tested:</strong> (e.g., Median motor to APB)</li>
                        <li><strong>Stimulation site:</strong> (e.g., wrist, elbow)</li>
                        <li><strong>Distal latency:</strong> (ms)</li>
                        <li><strong>Amplitude:</strong> Baseline-to-peak (mV)</li>
                        <li><strong>Distance:</strong> Between stimulation sites (cm)</li>
                        <li><strong>Conduction velocity:</strong> Across segments (m/s)</li>
                        <li><strong>F-wave latency:</strong> (if performed)</li>
                    </ul>
                </div>

                <!-- H-Reflex and Repetitive Stimulation -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">🔄 Special Studies</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>H-reflex:</strong> Latency and side-to-side comparison</li>
                        <li><strong>Repetitive stimulation:</strong> Decrement/increment percentage at different frequencies</li>
                    </ul>
                </div>

            </div>

            <!-- Example Table -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">💡</span> Example: NCS Table Format
                </h4>
                <div style="background: white; border-radius: 8px; padding: 20px; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <thead>
                            <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
                                <th style="padding: 12px; text-align: left; font-weight: 600;">Nerve / Site</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Latency (ms)</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Amplitude</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Distance (cm)</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Velocity (m/s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td colspan="5" style="padding: 10px; font-weight: 600; background: #fafafa;">SENSORY STUDIES (Right)</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px;">Median - digit 2</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">4.8*</td>
                                <td style="padding: 10px; text-align: center;">35 μV</td>
                                <td style="padding: 10px; text-align: center;">14</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">38*</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px;">Ulnar - digit 5</td>
                                <td style="padding: 10px; text-align: center;">3.0</td>
                                <td style="padding: 10px; text-align: center;">42 μV</td>
                                <td style="padding: 10px; text-align: center;">14</td>
                                <td style="padding: 10px; text-align: center;">52</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td colspan="5" style="padding: 10px; font-weight: 600; background: #fafafa;">MOTOR STUDIES (Right)</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px;">Median - Wrist to APB</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">5.2*</td>
                                <td style="padding: 10px; text-align: center;">7.8 mV</td>
                                <td style="padding: 10px; text-align: center;">8</td>
                                <td style="padding: 10px; text-align: center;">-</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px;">Median - Elbow to Wrist</td>
                                <td style="padding: 10px; text-align: center;">-</td>
                                <td style="padding: 10px; text-align: center;">7.5 mV</td>
                                <td style="padding: 10px; text-align: center;">24</td>
                                <td style="padding: 10px; text-align: center;">56</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="color: #64748b; font-size: 0.85rem; margin: 15px 0 0 0; font-style: italic;">
                        * = Abnormal (outside laboratory reference range)<br>
                        Reference: Distal latency <3.5ms, Velocity >50 m/s for upper extremity sensory
                    </p>
                </div>
            </div>

            <!-- Key Tips -->
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #92400e; margin-bottom: 12px;">⚠️ Important Tips:</h4>
                <ul style="color: #78350f; line-height: 2; margin: 0; padding-left: 25px;">
                    <li>Always use <strong>tabular format</strong> - not narrative text</li>
                    <li>Clearly mark abnormal values (*, bold, color, etc.)</li>
                    <li>Include reference values or normal ranges</li>
                    <li>Report both amplitude and latency/velocity data</li>
                    <li>Specify side tested (right, left, bilateral)</li>
                    <li>If study not obtainable, document reason (e.g., "no response")</li>
                </ul>
            </div>

            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                <button onclick="showTutorialStep(1)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: white; color: #64748b; border: 2px solid #cbd5e1; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    ← Previous
                </button>
                <button onclick="showTutorialStep(3)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Next: Needle EMG →
                </button>
            </div>
        </div>
    `;
}

// ============================================================================
// TUTORIAL STEP 3: NEEDLE EMG
// ============================================================================
function generateTutorialStep3() {
    return `
        <div class="tutorial-step" data-step="3">
            <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">💉</span>
                Step 3: Needle Electromyography
            </h3>

            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                <p style="color: #475569; line-height: 1.8; margin: 0;">
                    EMG findings must be presented in <strong>tabular format</strong> listing each muscle examined.
                    Include insertional activity, spontaneous activity, and motor unit action potential (MUAP) characteristics.
                </p>
            </div>

            <h4 style="color: #1e293b; margin: 30px 0 15px 0;">✅ Required Elements for Each Muscle:</h4>

            <div style="display: grid; gap: 20px; margin-bottom: 30px;">

                <!-- Insertional Activity -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">1. Insertional Activity</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Normal:</strong> Brief burst during needle movement</li>
                        <li><strong>Increased:</strong> Prolonged activity (denervation, myopathy)</li>
                        <li><strong>Decreased:</strong> Reduced/absent (fibrosis, severe atrophy)</li>
                    </ul>
                </div>

                <!-- Spontaneous Activity -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">2. Spontaneous Activity</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Fibrillation potentials:</strong> Grade 0-4+ (indicates denervation)</li>
                        <li><strong>Positive sharp waves:</strong> Grade 0-4+ (indicates denervation)</li>
                        <li><strong>Fasciculations:</strong> Present/absent (motor neuron disease)</li>
                        <li><strong>Complex repetitive discharges:</strong> (chronic denervation)</li>
                    </ul>
                </div>

                <!-- Voluntary Activity -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">3. Motor Unit Action Potentials (Voluntary Activity)</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Recruitment:</strong> Normal, reduced, or rapid (early recruitment)</li>
                        <li><strong>MUAP amplitude:</strong> Normal, increased (neuropathy), or decreased (myopathy)</li>
                        <li><strong>MUAP duration:</strong> Normal, long (reinnervation), or short (myopathy)</li>
                        <li><strong>MUAP morphology:</strong> Simple or polyphasic</li>
                    </ul>
                </div>

            </div>

            <!-- Example Table -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">💡</span> Example: Needle EMG Table Format
                </h4>
                <div style="background: white; border-radius: 8px; padding: 20px; overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <thead>
                            <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
                                <th style="padding: 12px; text-align: left; font-weight: 600;">Muscle</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Insert Act</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Fib</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">PSW</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Fasc</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">MUAP Amp</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">MUAP Dur</th>
                                <th style="padding: 12px; text-align: center; font-weight: 600;">Recruitment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td colspan="8" style="padding: 10px; font-weight: 600; background: #fafafa;">RIGHT UPPER EXTREMITY</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px;">First Dorsal Interosseous</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">2+</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">2+</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">Increased</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">Long</td>
                                <td style="padding: 10px; text-align: center; color: #dc2626; font-weight: 600;">Reduced</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px;">Abductor Pollicis Brevis</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px;">Flexor Carpi Radialis</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px;">Cervical Paraspinal (C7-8)</td>
                                <td style="padding: 10px; text-align: center;">Normal</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">None</td>
                                <td style="padding: 10px; text-align: center;">N/A</td>
                                <td style="padding: 10px; text-align: center;">N/A</td>
                                <td style="padding: 10px; text-align: center;">N/A</td>
                                <td style="padding: 10px; text-align: center;">N/A</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="color: #64748b; font-size: 0.85rem; margin: 15px 0 0 0; font-style: italic;">
                        Fib = Fibrillations; PSW = Positive Sharp Waves; Fasc = Fasciculations;<br>
                        MUAP Amp = Motor Unit Amplitude; MUAP Dur = Motor Unit Duration
                    </p>
                </div>
            </div>

            <!-- Key Tips -->
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #92400e; margin-bottom: 12px;">⚠️ Important Tips:</h4>
                <ul style="color: #78350f; line-height: 2; margin: 0; padding-left: 25px;">
                    <li>Use <strong>tabular format</strong> for clarity</li>
                    <li>Include muscles from multiple nerve/root distributions</li>
                    <li>Grade fibrillations and PSWs consistently (0, 1+, 2+, 3+, 4+)</li>
                    <li>Examine paraspinal muscles when radiculopathy is suspected</li>
                    <li>Document all abnormal findings clearly</li>
                    <li>Note if muscle was "not tested" rather than leaving blank</li>
                </ul>
            </div>

            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                <button onclick="showTutorialStep(2)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: white; color: #64748b; border: 2px solid #cbd5e1; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    ← Previous
                </button>
                <button onclick="showTutorialStep(4)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Next: Summary →
                </button>
            </div>
        </div>
    `;
}

// ============================================================================
// TUTORIAL STEP 4: SUMMARY SECTION
// ============================================================================
function generateTutorialStep4() {
    return `
        <div class="tutorial-step" data-step="4">
            <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📊</span>
                Step 4: Summary Section
            </h3>

            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                <p style="color: #475569; line-height: 1.8; margin: 0;">
                    The summary section provides a <strong>narrative synthesis</strong> of all electrodiagnostic findings.
                    It should describe the pattern and severity of abnormalities without yet stating the final diagnosis.
                </p>
            </div>

            <h4 style="color: #1e293b; margin: 30px 0 15px 0;">✅ What to Include:</h4>

            <div style="display: grid; gap: 20px; margin-bottom: 30px;">

                <!-- NCS Findings -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">1. Nerve Conduction Study Findings</h5>
                    <p style="color: #475569; line-height: 1.8; margin-bottom: 10px;">Describe the overall pattern:</p>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li>Which nerves showed abnormalities?</li>
                        <li>What type of abnormality? (prolonged latency, reduced amplitude, slow velocity)</li>
                        <li>Is the pattern focal or diffuse?</li>
                        <li>Are findings consistent with axonal loss, demyelination, or both?</li>
                    </ul>
                </div>

                <!-- EMG Findings -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">2. Needle EMG Findings</h5>
                    <p style="color: #475569; line-height: 1.8; margin-bottom: 10px;">Describe the abnormal EMG pattern:</p>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li>Which muscles showed abnormalities?</li>
                        <li>What is the distribution? (single nerve, root, plexus, generalized)</li>
                        <li>Is denervation present? (fibrillations, positive sharp waves)</li>
                        <li>Is reinnervation present? (large, polyphasic MUAPs, reduced recruitment)</li>
                    </ul>
                </div>

                <!-- Severity and Localization -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">3. Severity and Localization</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Severity:</strong> Mild, moderate, or severe?</li>
                        <li><strong>Acuity:</strong> Acute, subacute, or chronic findings?</li>
                        <li><strong>Localization:</strong> Where is the lesion? (e.g., "focal at the wrist", "L5 root level")</li>
                        <li><strong>Laterality:</strong> Unilateral or bilateral?</li>
                    </ul>
                </div>

            </div>

            <!-- Example Summary -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">💡</span> Example: Well-Written Summary Section
                </h4>
                <div style="background: white; border-radius: 8px; padding: 20px; font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.8; color: #1e293b;">
                    <strong>SUMMARY:</strong><br><br>

                    This electrodiagnostic study reveals abnormalities localized to the right median nerve at the wrist. <br><br>

                    Nerve conduction studies demonstrate prolonged median sensory distal latency (4.8 ms, normal <3.5 ms) and slowed sensory conduction velocity (38 m/s, normal >50 m/s) across the wrist segment. The median motor distal latency is also prolonged at 5.2 ms (normal <4.0 ms). Median motor amplitudes are preserved, indicating no significant axonal loss. The ulnar sensory and motor studies are normal, confirming that the abnormality is isolated to the median nerve.<br><br>

                    Needle EMG examination did not reveal any evidence of active denervation (no fibrillations or positive sharp waves) in median-innervated hand muscles. Motor unit recruitment and morphology were normal, indicating no significant axonal loss or chronic denervation.<br><br>

                    The findings indicate a focal demyelinating process affecting the right median nerve at the wrist level, without axonal loss. The severity is <strong>mild</strong>, as motor amplitudes are preserved and there is no denervation on EMG.
                </div>
            </div>

            <!-- Key Tips -->
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #92400e; margin-bottom: 12px;">⚠️ Important Tips:</h4>
                <ul style="color: #78350f; line-height: 2; margin: 0; padding-left: 25px;">
                    <li>Use narrative format (not tables) for this section</li>
                    <li>Synthesize findings - don't just repeat the tables</li>
                    <li>Describe patterns and localization clearly</li>
                    <li>Indicate severity (mild, moderate, severe)</li>
                    <li>Save the diagnosis for the next section</li>
                    <li>Be objective - describe what you found, not what you think it means</li>
                </ul>
            </div>

            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                <button onclick="showTutorialStep(3)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: white; color: #64748b; border: 2px solid #cbd5e1; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    ← Previous
                </button>
                <button onclick="showTutorialStep(5)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                    Next: Interpretation →
                </button>
            </div>
        </div>
    `;
}

// ============================================================================
// TUTORIAL STEP 5: DIAGNOSTIC INTERPRETATION
// ============================================================================
function generateTutorialStep5() {
    return `
        <div class="tutorial-step" data-step="5">
            <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🎯</span>
                Step 5: Diagnostic Interpretation
            </h3>

            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                <p style="color: #475569; line-height: 1.8; margin: 0;">
                    The diagnostic interpretation section provides the <strong>electrodiagnostic diagnosis</strong> and correlates findings with the clinical presentation.
                    This is where you state what the findings mean and answer the clinical question.
                </p>
            </div>

            <h4 style="color: #1e293b; margin: 30px 0 15px 0;">✅ Required Elements:</h4>

            <div style="display: grid; gap: 20px; margin-bottom: 30px;">

                <!-- Primary Diagnosis -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">1. Electrodiagnostic Diagnosis</h5>
                    <p style="color: #475569; line-height: 1.8; margin-bottom: 10px;">State the diagnosis clearly and specifically:</p>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li><strong>Specific lesion:</strong> (e.g., "Right median neuropathy at the wrist")</li>
                        <li><strong>Laterality:</strong> Right, left, or bilateral?</li>
                        <li><strong>Severity:</strong> Mild, moderate, or severe</li>
                        <li><strong>Pathophysiology:</strong> Demyelinating, axonal, or mixed</li>
                        <li><strong>Acuity:</strong> Acute, subacute, or chronic (if determinable)</li>
                    </ul>
                </div>

                <!-- Clinical Correlation -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">2. Clinical Correlation</h5>
                    <p style="color: #475569; line-height: 1.8; margin-bottom: 10px;">Connect EDX findings to clinical presentation:</p>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li>Do the findings explain the patient's symptoms?</li>
                        <li>Are findings consistent with clinical presentation?</li>
                        <li>Address the referring physician's clinical question</li>
                    </ul>
                </div>

                <!-- Additional Recommendations -->
                <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px;">
                    <h5 style="color: #3b82f6; margin-bottom: 12px; font-size: 1.1rem;">3. Additional Recommendations (Optional)</h5>
                    <ul style="color: #475569; line-height: 2; margin: 0; padding-left: 25px;">
                        <li>Follow-up studies if needed (and when to perform them)</li>
                        <li>Additional diagnostic testing (MRI, labs, etc.)</li>
                        <li>Referral to specialists if appropriate</li>
                    </ul>
                </div>

            </div>

            <!-- Example Interpretation -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">💡</span> Example: Well-Written Interpretation
                </h4>
                <div style="background: white; border-radius: 8px; padding: 20px; font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.8; color: #1e293b;">
                    <strong>ELECTRODIAGNOSTIC INTERPRETATION:</strong><br><br>

                    <strong>Right median neuropathy at the wrist, mild severity, demyelinating type, consistent with carpal tunnel syndrome.</strong><br><br>

                    The electrodiagnostic findings demonstrate focal slowing of median nerve conduction across the wrist segment without evidence of axonal loss. The preserved motor amplitudes and absence of denervation on needle EMG indicate that the process has not yet resulted in significant axonal damage. The normal ulnar nerve studies help confirm that the pathology is localized to the median nerve rather than a more generalized polyneuropathy or C6-7 radiculopathy.<br><br>

                    These findings are consistent with the patient's clinical presentation of nocturnal hand numbness in a median distribution, worse with computer use. The electrodiagnostic study confirms the clinical suspicion of carpal tunnel syndrome affecting the right hand.<br><br>

                    <strong>RECOMMENDATIONS:</strong><br>
                    Conservative management with wrist splinting and activity modification is appropriate given the mild severity. If symptoms persist or worsen despite conservative treatment, surgical decompression may be considered. Repeat electrodiagnostic study is not routinely necessary unless there is concern for progression or inadequate response to treatment.
                </div>
            </div>

            <!-- Common Pitfalls -->
            <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #991b1b; margin-bottom: 12px;">❌ Common Pitfalls to Avoid:</h4>
                <ul style="color: #7f1d1d; line-height: 2; margin: 0; padding-left: 25px;">
                    <li><strong>Being too vague:</strong> "Nerve problem" → Should be "Right median neuropathy at the wrist"</li>
                    <li><strong>Overreaching:</strong> Don't diagnose conditions beyond the scope of EDX (e.g., specific causes like tumor, unless imaging done)</li>
                    <li><strong>Ignoring discrepancies:</strong> If EDX findings don't match clinical presentation, acknowledge this</li>
                    <li><strong>Missing the severity:</strong> Always include mild, moderate, or severe</li>
                </ul>
            </div>

            <!-- Key Tips -->
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: #92400e; margin-bottom: 12px;">⚠️ Important Tips:</h4>
                <ul style="color: #78350f; line-height: 2; margin: 0; padding-left: 25px;">
                    <li>Be specific and clear in your diagnosis</li>
                    <li>Always include: location, severity, and pathophysiology type</li>
                    <li>Correlate findings with clinical presentation</li>
                    <li>Answer the referring physician's question directly</li>
                    <li>Acknowledge limitations of the study when appropriate</li>
                    <li>Provide actionable recommendations if appropriate</li>
                </ul>
            </div>

            <!-- Completion Message -->
            <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); border: 2px solid #10b981; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
                <div style="font-size: 3rem; margin-bottom: 15px;">🎉</div>
                <h4 style="color: #065f46; font-size: 1.5rem; margin-bottom: 15px;">Tutorial Complete!</h4>
                <p style="color: #047857; line-height: 1.8; margin: 0;">
                    You've learned all five essential sections of an AANEM-compliant electrodiagnostic report.
                    Ready to create your own? Switch to the <strong>Template Generator</strong> tab to get started!
                </p>
            </div>

            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                <button onclick="showTutorialStep(4)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: white; color: #64748b; border: 2px solid #cbd5e1; border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                    ← Previous
                </button>
                <button onclick="showTutorialStep(1)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;">
                    ↺ Restart Tutorial
                </button>
            </div>
        </div>
    `;
}

// ============================================================================
// TEMPLATE GENERATOR CONTENT
// ============================================================================
// ============================================================================
// TEMPLATE GENERATOR CONTENT
// ============================================================================

// Global state for report data
let reportData = {
    patient: {
        name: '', dob: '', mrn: '', date: new Date().toISOString().split('T')[0],
        referring: '', tech: '', instrument: '', history: ''
    },
    ncs: {
        sensory: [], // { nerve, latency, amp, dist, velocity }
        motor: []    // { nerve, latency, amp, velocity, fwave }
    },
    emg: [], // { muscle, side, insertional, fibs, psw, fasc, muapAmp, muapDur, recruitment }
    summary: {
        narrative: '',
        limitations: '',
        comparison: '',
        diagnosis: '',
        recommendations: ''
    }
};

let currentTemplateStep = 1;

function generateTemplateContent() {
    return `
        <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #1e293b; font-size: 2.2rem; margin-bottom: 15px;">
                    📝 Report Template Generator
                </h2>
                <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0 auto 20px auto;">
                    Create a professional, AANEM-compliant EMG/NCS report.
                    Fill out the sections below to generate your final report.
                </p>
            </div>

            <!-- Wizard Progress -->
            <div id="wizard-progress" style="margin-bottom: 30px;">
                ${generateWizardProgressBar(1)}
            </div>

            <!-- Wizard Steps -->
            <div id="wizard-content">
                <div id="wizard-step-1">${generateWizardStep1()}</div>
                <div id="wizard-step-2" style="display: none;">${generateWizardStep2()}</div>
                <div id="wizard-step-3" style="display: none;">${generateWizardStep3()}</div>
                <div id="wizard-step-4" style="display: none;">${generateWizardStep4()}</div>
                <div id="wizard-step-5" style="display: none;">${generateWizardStep5()}</div>
            </div>

        </div>
    `;
}

// ============================================================================
// WIZARD HELPER FUNCTIONS
// ============================================================================

function generateWizardProgressBar(currentStep) {
    const steps = ['Patient Info', 'NCS Data', 'EMG Data', 'Summary', 'Preview'];
    let html = '<div style="display: flex; justify-content: space-between; position: relative;">';

    // Progress line
    html += '<div style="position: absolute; top: 50%; left: 0; right: 0; height: 4px; background: #e2e8f0; z-index: 0; transform: translateY(-50%);"></div>';
    html += `<div style="position: absolute; top: 50%; left: 0; width: ${(currentStep - 1) / (steps.length - 1) * 100}%; height: 4px; background: #3b82f6; z-index: 0; transform: translateY(-50%); transition: width 0.3s ease;"></div>`;

    steps.forEach((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        let circleStyle = `
            width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-weight: 600; z-index: 1; position: relative; background: white; border: 2px solid #e2e8f0; color: #94a3b8;
        `;

        if (isActive) {
            circleStyle = `
                width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                font-weight: 600; z-index: 1; position: relative; background: #3b82f6; border: 2px solid #3b82f6; color: white;
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
            `;
        } else if (isCompleted) {
            circleStyle = `
                width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                font-weight: 600; z-index: 1; position: relative; background: #10b981; border: 2px solid #10b981; color: white;
            `;
        }

        html += `
            <div style="text-align: center; z-index: 1;">
                <div style="${circleStyle}">
                    ${isCompleted ? '✓' : stepNum}
                </div>
                <div style="margin-top: 8px; font-size: 0.85rem; font-weight: 600; color: ${isActive ? '#1e293b' : '#94a3b8'};">
                    ${step}
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

function showWizardStep(step) {
    // Save data from current step before moving
    if (window.currentTemplateStep) {
        saveCurrentStepData(window.currentTemplateStep);
    }

    window.currentTemplateStep = step;

    // Hide all steps
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(`wizard-step-${i}`);
        if (el) el.style.display = 'none';
    }

    // Show target step
    const target = document.getElementById(`wizard-step-${step}`);
    if (target) {
        target.style.display = 'block';
        // If moving to preview step, regenerate it
        if (step === 5) {
            target.innerHTML = generateWizardStep5();
        }
    }

    // Update progress bar
    const progress = document.getElementById('wizard-progress');
    if (progress) {
        progress.innerHTML = generateWizardProgressBar(step);
    }

    // Scroll to top
    const wizardContent = document.getElementById('wizard-content');
    if (wizardContent) {
        wizardContent.scrollIntoView({ behavior: 'smooth' });
    }
}

function saveCurrentStepData(step) {
    if (!window.reportData) return;

    if (step === 1) {
        window.reportData.patient.name = document.getElementById('pt-name')?.value || '';
        window.reportData.patient.dob = document.getElementById('pt-dob')?.value || '';
        window.reportData.patient.mrn = document.getElementById('pt-mrn')?.value || '';
        window.reportData.patient.date = document.getElementById('pt-date')?.value || '';
        window.reportData.patient.referring = document.getElementById('pt-ref')?.value || '';
        window.reportData.patient.tech = document.getElementById('pt-tech')?.value || '';
        window.reportData.patient.instrument = document.getElementById('pt-instrument')?.value || '';
        window.reportData.patient.history = document.getElementById('pt-history')?.value || '';
    } else if (step === 4) {
        window.reportData.summary.narrative = document.getElementById('sum-narrative')?.value || '';
        window.reportData.summary.limitations = document.getElementById('sum-limitations')?.value || '';
        window.reportData.summary.comparison = document.getElementById('sum-comparison')?.value || '';
        window.reportData.summary.diagnosis = document.getElementById('sum-diagnosis')?.value || '';
        window.reportData.summary.recommendations = document.getElementById('sum-recs')?.value || '';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}



// ============================================================================
// WIZARD STEP 1: PATIENT DATA
// ============================================================================
function generateWizardStep1() {
    const d = window.reportData ? window.reportData.patient : {
        name: '', dob: '', mrn: '', date: new Date().toISOString().split('T')[0],
        referring: '', tech: '', instrument: '', history: ''
    };

    return `
            <div class="wizard-step">
            <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">
                👤 Patient Information & Clinical History
            </h3>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Patient Name</label>
                    <input type="text" id="pt-name" value="${d.name}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
                </div>
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Date of Birth</label>
                    <input type="date" id="pt-dob" value="${d.dob}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
                </div>
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">MRN</label>
                    <input type="text" id="pt-mrn" value="${d.mrn}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
                </div>
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Date of Study</label>
                    <input type="date" id="pt-date" value="${d.date}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Referring Physician</label>
                    <input type="text" id="pt-ref" value="${d.referring}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
                </div>
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Technologist / Resident (Optional)</label>
                    <input type="text" id="pt-tech" value="${d.tech}" placeholder="e.g., Jane Doe, resident" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Instrument Used (Optional)</label>
                <input type="text" id="pt-inst" value="${d.instrument}" placeholder="e.g., Natus Nicolet EDX" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">
            </div>

            <div style="margin-bottom: 30px;">
                <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Clinical Problem / History</label>
                <textarea id="pt-history" rows="4" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit;">${d.history}</textarea>
                <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 5px;">Include chief complaint, duration, location, and relevant medical history.</p>
            </div>

            <div style="text-align: right;">
                <button onclick="showWizardStep(2)" style="padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                    Next: NCS Data →
                </button>
            </div>
        </div >
            `;
}

// ============================================================================
// WIZARD STEP 2: NCS DATA
// ============================================================================
function generateWizardStep2() {
    return `
        <div class="wizard-step">
            <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">
                ⚡ Nerve Conduction Studies
            </h3>

            <!-- Sensory Table -->
            <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <h4 style="color: #1e293b; margin-bottom: 15px;">Sensory Studies</h4>
                <table id="ncs-sensory-table" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <thead>
                        <tr style="background: #e2e8f0; text-align: left;">
                            <th style="padding: 10px; border-radius: 8px 0 0 8px;">Nerve / Side</th>
                            <th style="padding: 10px;">Latency (ms)</th>
                            <th style="padding: 10px;">Amp (μV)</th>
                            <th style="padding: 10px;">Dist (cm)</th>
                            <th style="padding: 10px;">Vel (m/s)</th>
                            <th style="padding: 10px; border-radius: 0 8px 8px 0;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="ncs-sensory-body">
                        <!-- Rows generated by JS -->
                    </tbody>
                </table>
                <button onclick="addSensoryRow()" style="padding: 8px 15px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 600; color: #475569;">
                    + Add Sensory Row
                </button>
            </div>

            <!-- Motor Table -->
            <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <h4 style="color: #1e293b; margin-bottom: 15px;">Motor Studies</h4>
                <table id="ncs-motor-table" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <thead>
                        <tr style="background: #e2e8f0; text-align: left;">
                            <th style="padding: 10px; border-radius: 8px 0 0 8px;">Nerve / Side</th>
                            <th style="padding: 10px;">Lat (ms)</th>
                            <th style="padding: 10px;">Amp (mV)</th>
                            <th style="padding: 10px;">Vel (m/s)</th>
                            <th style="padding: 10px;">F-Wave (ms)</th>
                            <th style="padding: 10px; border-radius: 0 8px 8px 0;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="ncs-motor-body">
                        <!-- Rows generated by JS -->
                    </tbody>
                </table>
                <button onclick="addMotorRow()" style="padding: 8px 15px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 600; color: #475569;">
                    + Add Motor Row
                </button>
            </div>

            <div style="display: flex; justify-content: space-between;">
                <button onclick="showWizardStep(1)" style="padding: 12px 30px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600; cursor: pointer; color: #64748b;">
                    ← Back
                </button>
                <button onclick="showWizardStep(3)" style="padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                    Next: EMG Data →
                </button>
            </div>
        </div>
    `;
}

// Initialize rows from saved data
setTimeout(() => {
    renderSensoryRows();
    renderMotorRows();
}, 100);

// Standard NCS Values for Auto-Calculation
const STANDARD_NCS_VALUES = {
    sensory: {
        'Median Sensory (Digit 2)': 14.0,
        'Median Sensory (Digit 3)': 14.0,
        'Median Sensory Palmar': 7.0,
        'Ulnar Sensory (Digit 5)': 14.0,
        'Dorsal Ulnar Cutaneous': 8.0,
        'Radial Sensory (Thumb)': 14.0,
        'Medial Antebrachial Cutaneous': 12.0,
        'Lateral Antebrachial Cutaneous': 12.0,
        'Superficial Fibular Sensory': 14.0,
        'Sural Sensory': 14.0,
        'Saphenous Sensory': 14.0,
        'Lateral Femoral Cutaneous': 12.0,
        'Medial Plantar Sensory': 14.0,
        'Lateral Plantar Sensory': 14.0,
        'Lumbrical-Interossei Comparison': 10.0,
        'Median vs Ulnar (Digit 4)': 10.0,
        'Median vs Radial (Digit 1)': 10.0,
        'Median Palmar Mixed': 8.0,
        'Ulnar Palmar Mixed': 8.0
    },
    motor: {
        'Median Motor (APB)': 8.0,
        'Median Motor Palmar': 8.0,
        'Ulnar Motor (ADM)': 8.0,
        'Deep Ulnar Motor (FDI)': 8.0,
        'Radial Motor (EIP)': 5.0,
        'Tibial Motor (AHB)': 9.0,
        'Peroneal Motor (EDB)': 9.0,
        'Peroneal Motor (TA)': 5.0,
        'Femoral Motor': 0, // Variable
        'Medial Plantar Motor': 9.0,
        'Lateral Plantar Motor': 0 // Variable
    }
};

function addSensoryRow() {
    window.reportData.ncs.sensory.push({ nerve: '', latency: '', amp: '', dist: '', velocity: '' });
    renderSensoryRows();
}
window.addSensoryRow = addSensoryRow;

function removeSensoryRow(index) {
    window.reportData.ncs.sensory.splice(index, 1);
    renderSensoryRows();
}
window.removeSensoryRow = removeSensoryRow;

function updateSensoryRow(index, field, value) {
    const row = window.reportData.ncs.sensory[index];
    row[field] = value;

    // Auto-fill distance if nerve is selected
    if (field === 'nerve') {
        // Exact match first
        let standardDist = STANDARD_NCS_VALUES.sensory[value];

        // If no exact match, try partial match
        if (standardDist === undefined) {
            const match = Object.entries(STANDARD_NCS_VALUES.sensory).find(([key]) => value.includes(key) || key.includes(value));
            if (match) standardDist = match[1];
        }

        if (standardDist !== undefined && standardDist > 0) {
            row.dist = standardDist;
        }
    }

    // Auto-calculate velocity: Velocity (m/s) = (Distance (cm) * 10) / Latency (ms)
    if ((field === 'latency' || field === 'dist' || field === 'nerve') && row.latency && row.dist) {
        const lat = parseFloat(row.latency);
        const dist = parseFloat(row.dist);
        if (lat > 0 && dist > 0) {
            row.velocity = ((dist * 10) / lat).toFixed(1);
        }
    }

    renderSensoryRows(); // Re-render to show updated values
}
window.updateSensoryRow = updateSensoryRow;

function renderSensoryRows() {
    const tbody = document.getElementById('ncs-sensory-body');
    if (!tbody) return;

    // Datalist for sensory nerves
    const datalist = `
        <datalist id="sensory-nerves">
            <option value="Median Sensory (Digit 2)">
            <option value="Median Sensory (Digit 3)">
            <option value="Median Sensory Palmar">
            <option value="Ulnar Sensory (Digit 5)">
            <option value="Dorsal Ulnar Cutaneous">
            <option value="Radial Sensory (Thumb)">
            <option value="Medial Antebrachial Cutaneous">
            <option value="Lateral Antebrachial Cutaneous">
            <option value="Superficial Fibular Sensory">
            <option value="Sural Sensory">
            <option value="Saphenous Sensory">
            <option value="Lateral Femoral Cutaneous">
            <option value="Medial Plantar Sensory">
            <option value="Lateral Plantar Sensory">
            <option value="Lumbrical-Interossei Comparison">
            <option value="Median vs Ulnar (Digit 4)">
            <option value="Median vs Radial (Digit 1)">
            <option value="Median Palmar Mixed">
            <option value="Ulnar Palmar Mixed">
        </datalist>
    `;

    tbody.innerHTML = datalist + window.reportData.ncs.sensory.map((row, i) => {
        return '<tr>' +
            '<td><input type="text" list="sensory-nerves" value="' + (row.nerve || '') + '" onchange="updateSensoryRow(' + i + ', \'nerve\', this.value)" placeholder="Select or type..." style="width: 100%; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.latency || '') + '" onchange="updateSensoryRow(' + i + ', \'latency\', this.value)" style="width: 60px; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.amp || '') + '" onchange="updateSensoryRow(' + i + ', \'amp\', this.value)" style="width: 60px; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.dist || '') + '" onchange="updateSensoryRow(' + i + ', \'dist\', this.value)" style="width: 60px; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.velocity || '') + '" onchange="updateSensoryRow(' + i + ', \'velocity\', this.value)" style="width: 60px; padding: 5px; background: #f1f5f9;" readonly></td>' +
            '<td><button onclick="removeSensoryRow(' + i + ')" style="color: red; border: none; background: none; cursor: pointer;">🗑️</button></td>' +
            '</tr>';
    }).join('');
}

function addMotorRow() {
    window.reportData.ncs.motor.push({ nerve: '', latency: '', amp: '', velocity: '', fwave: '' });
    renderMotorRows();
}
window.addMotorRow = addMotorRow;

function removeMotorRow(index) {
    window.reportData.ncs.motor.splice(index, 1);
    renderMotorRows();
}
window.removeMotorRow = removeMotorRow;

function updateMotorRow(index, field, value) {
    const row = window.reportData.ncs.motor[index];
    row[field] = value;

    // Auto-fill distance if nerve is selected (Note: Motor studies often don't have a fixed distance for velocity calc in the same way, but we can pre-fill standard distances for distal latency check if needed, though velocity usually requires proximal stimulation. However, for simple reports, we might just use the distal distance for reference or if the user wants to calculate a velocity across a segment)
    // Wait, standard motor velocity is usually calculated between two points (proximal and distal). 
    // But the user asked for "distance based on lengths I told you". The values found (7cm, 8cm) are standard DISTAL distances.
    // Velocity calculation typically requires (Proximal Dist - Distal Dist) / (Prox Lat - Dist Lat).
    // However, if the user wants simple velocity = Dist / Latency, that's incorrect for motor studies (that would be conduction time).
    // BUT, maybe they mean for the SENSORY studies primarily, or they are using a simplified method?
    // Let's assume for Motor, we just pre-fill the Distal Distance. Velocity usually comes from a second stimulation site.
    // Given the simple table structure (one row per nerve), it implies a single stimulation point or a pre-calculated velocity.
    // If I look at the table headers: Lat, Amp, Vel, F-Wave.
    // If the user inputs Velocity directly, that's fine.
    // If they want it calculated, they need a distance.
    // Let's pre-fill the standard distal distance into a 'dist' field if we had one, but the motor table DOES NOT have a 'dist' column visible in the previous code!
    // Wait, let's check the previous code for Motor table.
    // Previous code: <th>Lat (ms)</th> <th>Amp</th> <th>Dist (cm)</th> <th>Vel (m/s)</th> (Wait, line 1541 in view_file 3229 shows Dist column for Sensory, but for Motor line 1563 shows `<td>-</td>` for distance in the generated report!)
    // But in the WIZARD (line 1236 in view_file 3227), the Motor row inputs are: Nerve, Latency, Amp, Velocity, F-Wave. There is NO Distance input for Motor in the wizard!
    // So for Motor, I can't auto-calculate velocity from a single distance input because there isn't one.
    // Unless I add a Distance input to the Motor row?
    // The user said "the distance should be based on the lengths... and then the velocity should be able to be calculated".
    // This strongly implies they want to see/edit distance for Motor too, or at least have it used.
    // But standard motor velocity requires 2 points.
    // Maybe they are referring to Sensory only? Or maybe they want to add Distance to Motor?
    // Let's stick to Sensory for auto-calc for now, and for Motor just pre-fill if I can, but without a field it's hard.
    // Actually, let's look at the user request again: "I shouldn't have to type in the distance and the velocity."
    // This applies to wherever they ARE typing it.
    // In the current Wizard, Sensory has a Distance field. Motor does NOT.
    // So I will implement this for Sensory rows.

    // However, I will check if I should add Distance to Motor.
    // Standard Motor NCS: Distal Latency (at 7cm or 8cm). Velocity is calculated from a proximal site.
    // If the row represents a single site (e.g. Wrist), you only get Distal Latency. You don't get Velocity from one site.
    // If the row represents the NERVE (e.g. Median), you might enter the calculated velocity from the study.
    // Without two sites in the UI, I can't calculate motor velocity properly.
    // I will assume the user is talking about the Sensory studies where Distance and Velocity are present in the row.

    // I will update Sensory logic as planned.
    // For Motor, I will leave as is unless I see a way to infer velocity (unlikely without 2 points).
    // Wait, the user said "lengths I told you". Those 7cm/8cm are distal distances.
    // If I add a Distance field to Motor, it would just be the distal distance.
    // I will focus on Sensory for the full auto-calc.

    // RE-READING: "the distance should be based on the lengths... and then the velocity should be able to be calculated"
    // This works perfectly for Sensory (Dist / Lat).
    // For Motor, if they want velocity, they usually type it.
    // I'll implement for Sensory first.

    // Wait, I should also check if I can pre-fill the "Nerve" input with the standard names to make it easier.

    // Let's proceed with updating Sensory.

    // For Motor, I'll just add the datalist for names.
}
window.updateMotorRow = updateMotorRow;

function renderMotorRows() {
    const tbody = document.getElementById('ncs-motor-body');
    if (!tbody) return;

    // Datalist for motor nerves
    const datalist = `
        <datalist id="motor-nerves">
            <option value="Median Motor (APB)">
            <option value="Median Motor Palmar">
            <option value="Ulnar Motor (ADM)">
            <option value="Deep Ulnar Motor (FDI)">
            <option value="Radial Motor (EIP)">
            <option value="Tibial Motor (AHB)">
            <option value="Peroneal Motor (EDB)">
            <option value="Peroneal Motor (TA)">
            <option value="Femoral Motor">
            <option value="Medial Plantar Motor">
            <option value="Lateral Plantar Motor">
        </datalist>
    `;

    tbody.innerHTML = datalist + window.reportData.ncs.motor.map((row, i) => {
        return '<tr>' +
            '<td><input type="text" list="motor-nerves" value="' + (row.nerve || '') + '" onchange="updateMotorRow(' + i + ', \'nerve\', this.value)" placeholder="Select or type..." style="width: 100%; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.latency || '') + '" onchange="updateMotorRow(' + i + ', \'latency\', this.value)" style="width: 60px; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.amp || '') + '" onchange="updateMotorRow(' + i + ', \'amp\', this.value)" style="width: 60px; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.velocity || '') + '" onchange="updateMotorRow(' + i + ', \'velocity\', this.value)" style="width: 60px; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.fwave || '') + '" onchange="updateMotorRow(' + i + ', \'fwave\', this.value)" style="width: 60px; padding: 5px;"></td>' +
            '<td><button onclick="removeMotorRow(' + i + ')" style="color: red; border: none; background: none; cursor: pointer;">🗑️</button></td>' +
            '</tr>';
    }).join('');
}


// ============================================================================
// WIZARD STEP 3: EMG DATA
// ============================================================================
function generateWizardStep3() {
    return `
        <div class="wizard-step">
            <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">
                💉 Needle EMG
            </h3>

            <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <table id="emg-table" style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <thead>
                        <tr style="background: #e2e8f0; text-align: left;">
                            <th style="padding: 10px; border-radius: 8px 0 0 8px;">Muscle / Side</th>
                            <th style="padding: 10px;">Ins. Act</th>
                            <th style="padding: 10px;">Spont (Fib/PSW)</th>
                            <th style="padding: 10px;">MUAP</th>
                            <th style="padding: 10px;">Recruit</th>
                            <th style="padding: 10px; border-radius: 0 8px 8px 0;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="emg-body">
                        <!-- Rows generated by JS -->
                    </tbody>
                </table>
                <button onclick="addEmgRow()" style="padding: 8px 15px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 600; color: #475569;">
                    + Add Muscle
                </button>
                <button onclick="addNormalEmgRow()" style="padding: 8px 15px; background: #dcfce7; border: 1px solid #86efac; border-radius: 6px; cursor: pointer; font-weight: 600; color: #166534; margin-left: 10px;">
                    + Add Normal Muscle
                </button>
            </div>

            <div style="display: flex; justify-content: space-between;">
                <button onclick="showWizardStep(2)" style="padding: 12px 30px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600; cursor: pointer; color: #64748b;">
                    ← Back
                </button>
                <button onclick="showWizardStep(4)" style="padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                    Next: Summary →
                </button>
            </div>
        </div>
    `;
}

const STANDARD_EMG_MUSCLES = {
    ue: [
        "Trapezius (upper)", "Rhomboids", "Serratus anterior", "Supraspinatus", "Infraspinatus",
        "Subscapularis", "Teres major", "Pectoralis major", "Latissimus dorsi", "Deltoid",
        "Teres minor", "Biceps brachii", "Brachialis", "Coracobrachialis", "Brachioradialis",
        "Triceps brachii", "Anconeus", "Extensor carpi radialis", "Supinator", "Extensor digitorum",
        "Extensor carpi ulnaris", "Extensor pollicis longus", "Extensor indicis", "Abductor pollicis longus",
        "Pronator teres", "Flexor carpi radialis", "Palmaris longus", "Flexor digitorum superficialis",
        "Flexor digitorum profundus (digits 2&3)", "Flexor pollicis longus", "Pronator quadratus",
        "Abductor pollicis brevis", "Opponens pollicis", "Flexor carpi ulnaris",
        "Flexor digitorum profundus (digits 4&5)", "Adductor pollicis", "First dorsal interosseous",
        "Abductor digiti minimi"
    ],
    le: [
        "Gluteus medius", "Gluteus minimus", "Tensor fasciae latae", "Gluteus maximus", "Piriformis",
        "Iliopsoas", "Pectineus", "Rectus femoris", "Vastus lateralis", "Vastus medialis",
        "Vastus intermedius", "Sartorius", "Obturator externus", "Adductor longus", "Adductor magnus",
        "Gracilis", "Biceps femoris", "Semitendinosus", "Semimembranosus", "Gastrocnemius",
        "Soleus", "Tibialis posterior", "Flexor digitorum longus", "Flexor hallucis longus",
        "Abductor hallucis", "Abductor digiti minimi pedis", "Tibialis anterior", "Extensor digitorum longus",
        "Extensor hallucis longus", "Extensor digitorum brevis", "Peroneus tertius", "Fibularis longus",
        "Fibularis brevis"
    ]
};

function addEmgRow(data = {}) {
    window.reportData.emg.push({
        muscle: data.muscle || '',
        insertional: data.insertional || 'Normal',
        spont: data.spont || 'None',
        muap: data.muap || 'Normal',
        recruit: data.recruit || 'Normal'
    });
    renderEmgRows();
}

function addNormalEmgRow() {
    addEmgRow({ insertional: 'Normal', spont: 'None', muap: 'Normal', recruit: 'Normal' });
}

function removeEmgRow(index) {
    window.reportData.emg.splice(index, 1);
    renderEmgRows();
}

function updateEmgRow(index, field, value) {
    window.reportData.emg[index][field] = value;
}

function renderEmgRows() {
    const tbody = document.getElementById('emg-body');
    if (!tbody) return;

    // Create datalist options
    const ueOptions = STANDARD_EMG_MUSCLES.ue.map(m => `<option value="${m} (R)">\n<option value="${m} (L)">`).join('\n');
    const leOptions = STANDARD_EMG_MUSCLES.le.map(m => `<option value="${m} (R)">\n<option value="${m} (L)">`).join('\n');

    const datalist = `
        <datalist id="emg-muscles">
            ${ueOptions}
            ${leOptions}
        </datalist>
    `;

    tbody.innerHTML = datalist + window.reportData.emg.map((row, i) => {
        return '<tr>' +
            '<td><input type="text" list="emg-muscles" value="' + (row.muscle || '') + '" onchange="updateEmgRow(' + i + ', \'muscle\', this.value)" placeholder="Select or type..." style="width: 100%; padding: 5px;"></td>' +
            '<td>' +
            '<select onchange="updateEmgRow(' + i + ', \'insertional\', this.value)" style="width: 100%; padding: 5px;">' +
            '<option value="Normal" ' + (row.insertional === 'Normal' ? 'selected' : '') + '>Normal</option>' +
            '<option value="Increased" ' + (row.insertional === 'Increased' ? 'selected' : '') + '>Increased</option>' +
            '<option value="Decreased" ' + (row.insertional === 'Decreased' ? 'selected' : '') + '>Decreased</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="text" value="' + (row.spont || '') + '" onchange="updateEmgRow(' + i + ', \'spont\', this.value)" placeholder="None" style="width: 100%; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.muap || '') + '" onchange="updateEmgRow(' + i + ', \'muap\', this.value)" placeholder="Normal" style="width: 100%; padding: 5px;"></td>' +
            '<td><input type="text" value="' + (row.recruit || '') + '" onchange="updateEmgRow(' + i + ', \'recruit\', this.value)" placeholder="Normal" style="width: 100%; padding: 5px;"></td>' +
            '<td><button onclick="removeEmgRow(' + i + ')" style="color: red; border: none; background: none; cursor: pointer;">🗑️</button></td>' +
            '</tr>';
    }).join('');
}


// ============================================================================
// WIZARD STEP 4: SUMMARY & INTERPRETATION
// ============================================================================
function generateWizardStep4() {
    const d = window.reportData ? window.reportData.summary : {
        narrative: '', limitations: '', comparison: '', diagnosis: '', recommendations: ''
    };

    return `
        <div class="wizard-step">
            <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">
                📊 Summary & Interpretation
            </h3>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Summary of Findings</label>
                <textarea id="sum-narrative" rows="4" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.narrative}</textarea>
                <p style="color: #94a3b8; font-size: 0.85rem;">Narrative description of NCS and EMG abnormalities.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Study Limitations</label>
                    <textarea id="sum-limitations" rows="2" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.limitations}</textarea>
                </div>
                <div>
                    <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Comparison to Prior Studies</label>
                    <textarea id="sum-comparison" rows="2" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.comparison}</textarea>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Electrodiagnostic Diagnosis (Conclusion)</label>
                <textarea id="sum-diagnosis" rows="3" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.diagnosis}</textarea>
            </div>

            <div style="margin-bottom: 30px;">
                <label style="display: block; color: #475569; font-weight: 600; margin-bottom: 5px;">Recommendations</label>
                <textarea id="sum-recommendations" rows="3" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.recommendations}</textarea>
            </div>

            <div style="display: flex; justify-content: space-between;">
                <button onclick="showWizardStep(3)" style="padding: 12px 30px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600; cursor: pointer; color: #64748b;">
                    ← Back
                </button>
                <button onclick="showWizardStep(5)" style="padding: 12px 30px; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                    Generate Report →
                </button>
            </div>
        </div>
    `;
}

// ============================================================================
// WIZARD STEP 5: PREVIEW & EXPORT
// ============================================================================
function generateWizardStep5() {
    const d = window.reportData;
    const now = new Date().toLocaleDateString();

    // Generate HTML Report
    const reportHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #000; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">
            <h2 style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">ELECTRODIAGNOSTIC REPORT</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <strong>Patient:</strong> ${escapeHtml(d.patient.name)}<br>
                    <strong>DOB:</strong> ${escapeHtml(d.patient.dob)}<br>
                    <strong>MRN:</strong> ${escapeHtml(d.patient.mrn)}
                </div>
                <div>
                    <strong>Date of Study:</strong> ${escapeHtml(d.patient.date)}<br>
                    <strong>Referring MD:</strong> ${escapeHtml(d.patient.referring)}<br>
                    ${d.patient.tech ? `<strong>Technologist:</strong> ${escapeHtml(d.patient.tech)}<br>` : ''}
                    ${d.patient.instrument ? `<strong>Instrument:</strong> ${escapeHtml(d.patient.instrument)}` : ''}
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <strong>CLINICAL PROBLEM:</strong><br>
                ${escapeHtml(d.patient.history)}
            </div>

            <h3 style="background: #eee; padding: 5px; border-bottom: 1px solid #ccc;">NERVE CONDUCTION STUDIES</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 0.9em;">
                <thead>
                    <tr style="border-bottom: 1px solid #000;">
                        <th style="text-align: left;">Nerve / Site</th>
                        <th>Lat (ms)</th>
                        <th>Amp</th>
                        <th>Dist (cm)</th>
                        <th>Vel (m/s)</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.ncs.sensory.length > 0 ? `<tr><td colspan="5" style="font-weight: bold; padding-top: 10px;">Sensory Studies</td></tr>` : ''}
                    ${d.ncs.sensory.map(r => `
                        <tr>
                            <td>${escapeHtml(r.nerve)}</td>
                            <td style="text-align: center;">${escapeHtml(r.latency)}</td>
                            <td style="text-align: center;">${escapeHtml(r.amp)}</td>
                            <td style="text-align: center;">${escapeHtml(r.dist)}</td>
                            <td style="text-align: center;">${escapeHtml(r.velocity)}</td>
                        </tr>
                    `).join('')}
                    
                    ${d.ncs.motor.length > 0 ? `<tr><td colspan="5" style="font-weight: bold; padding-top: 10px;">Motor Studies</td></tr>` : ''}
                    ${d.ncs.motor.map(r => `
                        <tr>
                            <td>${escapeHtml(r.nerve)}</td>
                            <td style="text-align: center;">${escapeHtml(r.latency)}</td>
                            <td style="text-align: center;">${escapeHtml(r.amp)}</td>
                            <td style="text-align: center;">-</td>
                            <td style="text-align: center;">${escapeHtml(r.velocity)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h3 style="background: #eee; padding: 5px; border-bottom: 1px solid #ccc;">NEEDLE EMG</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 0.9em;">
                <thead>
                    <tr style="border-bottom: 1px solid #000;">
                        <th style="text-align: left;">Muscle</th>
                        <th>Ins. Act</th>
                        <th>Spont</th>
                        <th>MUAP</th>
                        <th>Recruit</th>
                    </tr>
                </thead>
                <tbody>
                    ${d.emg.map(r => `
                        <tr>
                            <td>${escapeHtml(r.muscle)}</td>
                            <td style="text-align: center;">${escapeHtml(r.insertional)}</td>
                            <td style="text-align: center;">${escapeHtml(r.spont)}</td>
                            <td style="text-align: center;">${escapeHtml(r.muap)}</td>
                            <td style="text-align: center;">${escapeHtml(r.recruit)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h3 style="background: #eee; padding: 5px; border-bottom: 1px solid #ccc;">SUMMARY & INTERPRETATION</h3>
            <div style="margin-bottom: 15px;">
                <strong>SUMMARY:</strong><br>
                ${escapeHtml(d.summary.narrative)}
            </div>
            
            ${d.summary.limitations ? `<div style="margin-bottom: 10px;"><strong>LIMITATIONS:</strong> ${escapeHtml(d.summary.limitations)}</div>` : ''}
            ${d.summary.comparison ? `<div style="margin-bottom: 10px;"><strong>COMPARISON:</strong> ${escapeHtml(d.summary.comparison)}</div>` : ''}

            <div style="margin-bottom: 15px; border: 2px solid #000; padding: 10px;">
                <strong>ELECTRODIAGNOSTIC DIAGNOSIS:</strong><br>
                ${escapeHtml(d.summary.diagnosis)}
            </div>

            <div style="margin-bottom: 15px;">
                <strong>RECOMMENDATIONS:</strong><br>
                ${escapeHtml(d.summary.recommendations)}
            </div>
            
            <div style="margin-top: 40px; border-top: 1px solid #000; width: 200px; padding-top: 5px;">
                Electronically Signed<br>
                ${new Date().toLocaleDateString()}
            </div>
        </div>
    `;

    return `
        <div class="wizard-step">
            <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">
                📄 Report Preview
            </h3>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button onclick="copyReport()" style="flex: 1; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    📋 Copy to Clipboard
                </button>
                <button onclick="printReport()" style="flex: 1; padding: 12px; background: #475569; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    🖨️ Print Report
                </button>
            </div>

            <div id="report-preview-container" style="border: 1px solid #cbd5e1; padding: 20px; background: #f8fafc; border-radius: 8px; overflow-y: auto; max-height: 600px;">
                ${reportHtml}
            </div>

            <div style="margin-top: 20px; text-align: left;">
                <button onclick="showWizardStep(4)" style="padding: 12px 30px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600; cursor: pointer; color: #64748b;">
                    ← Edit Report
                </button>
            </div>
        </div>
    `;
}

function copyReport() {
    const content = document.getElementById('report-preview-container').innerText;
    navigator.clipboard.writeText(content).then(() => {
        alert('Report text copied to clipboard!');
    });
}

function printReport() {
    const content = document.getElementById('report-preview-container').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Report</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}


console.log('✅ AANEM Report Writing module loaded');

