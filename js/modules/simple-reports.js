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

    return `
        <div class="interactive-content" style="max-width: 1400px; margin: 0 auto; position: relative;">${generateErnestButton()}

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

        <script>
            // ============================================================================
            // TAB SWITCHING FUNCTION
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
                }
            }
            window.switchReportTab = switchReportTab;

            // ============================================================================
            // TUTORIAL STEP NAVIGATION
            // ============================================================================
            function showTutorialStep(step) {
                // Hide all steps
                for (let i = 1; i <= 5; i++) {
                    const stepDiv = document.getElementById(\`tutorial-step-\${i}\`);
                    if (stepDiv) stepDiv.style.display = 'none';
                }

                // Show requested step
                const targetStep = document.getElementById(\`tutorial-step-\${step}\`);
                if (targetStep) targetStep.style.display = 'block';

                // Update progress bar
                const progressContainer = document.getElementById('tutorial-progress');
                if (progressContainer) {
                    progressContainer.innerHTML = generateProgressBar(step, 5);
                }

                // Scroll to top of tutorial
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Helper function for progress bar (needs to be in script for dynamic updates)
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

                    progressHTML += \`
                        <div style="flex: 1; text-align: center;">
                            <div style="background: \${bgColor}; color: \${textColor}; border: 2px solid \${borderColor}; border-radius: 12px; padding: 15px 10px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                \${isCompleted ? '✓' : \`Step \${i}\`}
                                <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.9;">\${steps[i-1]}</div>
                            </div>
                        </div>
                    \`;
                }

                progressHTML += '</div>';
                return progressHTML;
            }

            window.showTutorialStep = showTutorialStep;
        </script>
    `;
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
                    <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.9;">${steps[i-1]}</div>
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
function generateTemplateContent() {
    return `
        <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #1e293b; font-size: 2.2rem; margin-bottom: 15px;">
                    📝 Report Template Generator
                </h2>
                <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0 auto 20px auto;">
                    Create a professional EMG/NCS report using our guided wizard.
                    Choose between Quick Mode for summaries or Detailed Mode for full data entry.
                </p>

                <!-- Mode Toggle -->
                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 25px;">
                    <button id="quick-mode-btn" onclick="switchTemplateMode('quick')"
                        style="padding: 12px 30px; font-size: 1rem; font-weight: 600; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3); transition: all 0.3s ease;">
                        ⚡ Quick Mode
                    </button>
                    <button id="detailed-mode-btn" onclick="switchTemplateMode('detailed')"
                        style="padding: 12px 30px; font-size: 1rem; font-weight: 600; background: white; color: #64748b; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 12px; cursor: pointer; transition: all 0.3s ease;">
                        📊 Detailed Mode
                    </button>
                </div>
            </div>

            <!-- Template Wizard Container -->
            <div id="template-wizard">
                <p style="text-align: center; color: #64748b; padding: 40px;">
                    Template wizard will be implemented in Phase 3-6
                </p>
            </div>

        </div>

        <script>
            // Mode switching function (placeholder)
            function switchTemplateMode(mode) {
                const quickBtn = document.getElementById('quick-mode-btn');
                const detailedBtn = document.getElementById('detailed-mode-btn');

                if (mode === 'quick') {
                    quickBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
                    quickBtn.style.color = 'white';
                    quickBtn.style.border = 'none';
                    quickBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
                    detailedBtn.style.background = 'white';
                    detailedBtn.style.color = '#64748b';
                    detailedBtn.style.border = '2px solid rgba(139, 92, 246, 0.3)';
                    detailedBtn.style.boxShadow = 'none';
                } else {
                    quickBtn.style.background = 'white';
                    quickBtn.style.color = '#64748b';
                    quickBtn.style.border = '2px solid rgba(139, 92, 246, 0.3)';
                    quickBtn.style.boxShadow = 'none';
                    detailedBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    detailedBtn.style.color = 'white';
                    detailedBtn.style.border = 'none';
                    detailedBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                }

                console.log('Template mode switched to:', mode);
            }
            window.switchTemplateMode = switchTemplateMode;
        </script>
    `;
}

console.log('✅ AANEM Report Writing module loaded');

