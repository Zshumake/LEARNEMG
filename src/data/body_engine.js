    toggleDifficulty: function (difficulty) {
        const toggle = document.getElementById(`${difficulty}-toggle`);
        const checkbox = document.getElementById(`${difficulty}-checkbox`);
        const statusText = toggle.querySelector('.status-text');

        if (toggle.classList.contains('active')) {
            // Turn OFF
            toggle.classList.remove('active');
            toggle.classList.add('inactive');
            checkbox.checked = false;
            statusText.textContent = 'INACTIVE';
        } else {
            // Turn ON
            toggle.classList.remove('inactive');
            toggle.classList.add('active');
            checkbox.checked = true;
            statusText.textContent = 'ACTIVE';
        }

        this.updateCaseDisplay();
    },

    showCaseSelection: function () {
        document.getElementById('case-selection-section').style.display = 'block';
        this.populateCaseGrid();
        // Smooth scroll to case selection
        document.getElementById('case-selection-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    },

    hideCaseSelection: function () {
        document.getElementById('case-selection-section').style.display = 'none';
    },

    updateCaseDisplay: function () {
        this.populateCaseGrid();
    },

    populateCaseGrid: function () {
        const caseGrid = document.getElementById('case-grid');
        const beginnerChecked = document.getElementById('beginner-checkbox').checked;
        const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
        const difficultChecked = document.getElementById('difficult-checkbox').checked;

        let html = '';

        for (const [caseId, caseData] of Object.entries(this.caseDatabase)) {
            const difficulty = caseData.difficulty || 'intermediate';

            // Filter based on selected difficulties
            if ((difficulty === 'beginner' && !beginnerChecked) ||
                (difficulty === 'intermediate' && !intermediateChecked) ||
                (difficulty === 'difficult' && !difficultChecked)) {
                continue;
            }

            const difficultyClass = difficulty;
            const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

            html += `
                <div class="case-card" onclick="ClinicalCases.startCase('${caseId}')" id="case-${caseId}">
                    <h4>${caseData.title}</h4>
                    <p><strong>Age:</strong> ${caseData.presentation.age} | <strong>Gender:</strong> ${caseData.presentation.gender}</p>
                    <p>${caseData.presentation.chiefComplaint}</p>
                    <span class="difficulty ${difficultyClass}">${difficultyText}</span>
                </div>
            `;
        }

        caseGrid.innerHTML = html;
    },

    toggleCaseSelection: function (caseId) {
        const checkbox = document.getElementById(`checkbox-${caseId}`);
        checkbox.checked = !checkbox.checked;
        this.updateCaseCard(caseId);
    },

    updateCaseCard: function (caseId) {
        const checkbox = document.getElementById(`checkbox-${caseId}`);
        const caseCard = document.getElementById(`case-${caseId}`);

        if (checkbox.checked) {
            caseCard.classList.add('selected');
        } else {
            caseCard.classList.remove('selected');
        }
    },

    selectAllCases: function () {
        const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
            this.updateCaseCard(checkbox.id.replace('checkbox-', ''));
        });
    },

    deselectAllCases: function () {
        const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            this.updateCaseCard(checkbox.id.replace('checkbox-', ''));
        });
    },

    startSelectedCases: function () {
        const selectedCases = [];
        const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]:checked');

        checkboxes.forEach(checkbox => {
            selectedCases.push(checkbox.id.replace('checkbox-', ''));
        });

        if (selectedCases.length === 0) {
            alert('Please select at least one case to begin.');
            return;
        }

        // Start with first selected case
        this.startCase(selectedCases[0]);
    },

    startRandomCaseByDifficulty: function () {
        const beginnerChecked = document.getElementById('beginner-checkbox').checked;
        const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
        const difficultChecked = document.getElementById('difficult-checkbox').checked;

        if (!beginnerChecked && !intermediateChecked && !difficultChecked) {
            alert('Please select at least one difficulty level first.');
            return;
        }

        const availableCases = [];
        for (const [caseId, caseData] of Object.entries(this.caseDatabase)) {
            const difficulty = caseData.difficulty || 'intermediate';
            if ((difficulty === 'beginner' && beginnerChecked) ||
                (difficulty === 'intermediate' && intermediateChecked) ||
                (difficulty === 'difficult' && difficultChecked)) {
                availableCases.push(caseId);
            }
        }

        if (availableCases.length === 0) {
            alert('No cases available for the selected difficulty levels.');
            return;
        }

        const randomCase = availableCases[Math.floor(Math.random() * availableCases.length)];
        this.startCase(randomCase);
    },

    init: function () {
        this.populateCaseGrid();
    },

    startCase: function (caseId) {
        if (!this.caseDatabase[caseId]) {
            console.error('Case not found:', caseId);
            alert('Case not available yet.');
            return;
        }
        console.log('Starting case:', caseId);

        this.currentCase = this.caseDatabase[caseId];
        this.currentStep = 1;
        this.userDifferential = '';

        document.getElementById('case-interface').style.display = 'block';
        document.getElementById('case-selection-screen').style.display = 'none'; // Hide list for full focus

        this.populateCaseDetails();

        // Reset UI state
        this.userDifferential = '';
        this.userEMGDecision = null;
        document.getElementById('user-differential').value = '';
        document.getElementById('final-diagnosis').value = '';
        document.getElementById('differential-feedback').innerHTML = '';
        document.getElementById('emg-decision-feedback').innerHTML = '';
        document.getElementById('diagnosis-feedback').innerHTML = '';
        document.getElementById('continue-to-studies').style.display = 'none';
        document.getElementById('continue-after-decision').style.display = 'none';
        document.getElementById('emg-results').style.display = 'none';

        this.showCasePresentation();
        this.updateProgress(20);

        // Scroll to case interface
        setTimeout(() => {
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    },

    populateCaseDetails: function () {
        const case_ = this.currentCase;
        const caseDetailsDiv = document.getElementById('case-details');

        // Normalize Presentation Data
        const age = case_.presentation.age || case_.presentation.Age || 'N/A';
        const gender = case_.presentation.gender || case_.presentation.Gender || 'N/A';
        const occupation = case_.presentation.occupation || (case_.history && case_.history.socialHistory ? case_.history.socialHistory.split(',')[1] || case_.history.socialHistory : 'N/A');
        const chiefComplaint = case_.presentation.chiefComplaint || case_.presentation.ChiefComplaint || 'N/A';

        // Normalize History Data
        let history = case_.presentation.history || (case_.history ? case_.history.historyOfPresentIllness : 'N/A');
        let pmh = case_.presentation.pmh || (case_.history ? case_.history.pastMedicalHistory : 'N/A');
        let medications = case_.presentation.medications || (case_.history ? case_.history.medications : 'N/A');

        caseDetailsDiv.innerHTML = `
            <h4>${case_.title}</h4>
            <p><strong>Age:</strong> ${age} | <strong>Gender:</strong> ${gender} | <strong>Occupation:</strong> ${occupation}</p>
            <p><strong>Chief Complaint:</strong> ${chiefComplaint}</p>
            <p><strong>History:</strong> ${history}</p>
            <p><strong>PMH:</strong> ${pmh}</p>
            <p><strong>Medications:</strong> ${medications}</p>
        `;

        const examDiv = document.getElementById('physical-exam-details');
        let examHtml = '<div class="physical-exam">';

        // Handle Standard Physical Exam (Specific Keys)
        if (case_.physicalExam) {
            const exam = case_.physicalExam;
            examHtml += `
                <div class="exam-category"><h5>👁️ Inspection</h5><p>${exam.inspection || 'Normal'}</p></div>
                <div class="exam-category"><h5>👋 Palpation</h5><p>${exam.palpation || 'Normal'}</p></div>
                <div class="exam-category"><h5>Range of Motion</h5><p>${exam.rom || 'Full'}</p></div>
                <div class="exam-category"><h5>💪 Strength</h5><p>${exam.strength || '5/5 throughout'}</p></div>
                <div class="exam-category"><h5>👆 Sensation</h5><p>${exam.sensation || 'Intact'}</p></div>
                <div class="exam-category"><h5>🔨 Reflexes</h5><p>${exam.reflexes || '2+ symmetric'}</p></div>
                <div class="exam-category"><h5>🧪 Special Tests</h5><p>${exam.specialTests || 'None'}</p></div>
            `;
        }
        // Handle Alternative Physical Examination (Generic Keys)
        else if (case_.physicalExamination) {
            const exam = case_.physicalExamination;
            if (exam.generalAppearance) examHtml += `<div class="exam-category"><h5>General Appearance</h5><p>${exam.generalAppearance}</p></div>`;
            if (exam.musculoskeletalExam) examHtml += `<div class="exam-category"><h5>Musculoskeletal</h5><p>${exam.musculoskeletalExam}</p></div>`;
            if (exam.neurologicalExam) examHtml += `<div class="exam-category"><h5>Neurological</h5><p>${exam.neurologicalExam}</p></div>`;
            // Add any other keys dynamically
            Object.keys(exam).forEach(key => {
                if (!['generalAppearance', 'musculoskeletalExam', 'neurologicalExam'].includes(key)) {
                    // Format key from camelCase to Title Case
                    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    examHtml += `<div class="exam-category"><h5>${title}</h5><p>${exam[key]}</p></div>`;
                }
            });
        } else {
            examHtml += '<p>No physical exam data available.</p>';
        }

        examHtml += '</div>';
        examDiv.innerHTML = examHtml;
    },

    showCasePresentation: function () {
        console.log('Showing Case Presentation');
        this.hideAllSteps();
        document.getElementById('case-presentation-step').style.display = 'block';
        this.updateProgress(20);
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    showPhysicalExam: function () {
        console.log('Showing Physical Exam');
        this.hideAllSteps();
        document.getElementById('physical-exam-step').style.display = 'block';
        this.updateProgress(40);
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    showDifferentialBuilder: function () {
        console.log('Showing Differential Builder');
        this.hideAllSteps();
        document.getElementById('differential-step').style.display = 'block';
        this.updateProgress(60);
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    checkDifferential: function () {
        const userInput = document.getElementById('user-differential').value;
        console.log('Checking Differential:', userInput);
        this.userDifferential = userInput;

        const feedbackDiv = document.getElementById('differential-feedback');

        // Provide generic positive feedback as we can't easily validate free text against a list without NLP
        // But we can show the list of differentials considered in the case data if available
        let differentialList = "";
        if (this.currentCase.differentialDiagnosis && this.currentCase.differentialDiagnosis.length > 0) {
            differentialList = `<p style="margin-top: 10px;"><strong>Common Differentials for this presentation:</strong><br>${this.currentCase.differentialDiagnosis.join(', ')}</p>`;
        }

        feedbackDiv.innerHTML = `
            <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; margin: 15px 0;">
                <h4 style="color: #1e40af;">✅ Differential Recorded</h4>
                <p style="color: #1e40af;">Your differential has been recorded. Compare your thoughts with the standard differentials below.</p>
                ${differentialList}
            </div>
        `;

        document.getElementById('continue-to-studies').style.display = 'inline-block';
    },

    showEMGDecision: function () {
        console.log('Showing EMG Decision');
        this.hideAllSteps();
        document.getElementById('emg-decision-step').style.display = 'block';
        this.updateProgress(70);
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    makeEMGDecision: function (indicatedDecision) {
        console.log('Making EMG Decision:', indicatedDecision);
        this.userEMGDecision = indicatedDecision;
        const feedbackDiv = document.getElementById('emg-decision-feedback');
        const continueBtn = document.getElementById('continue-after-decision');
        const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";

        if (indicatedDecision === true && isEMGIndicated) {
            feedbackDiv.innerHTML = `
                <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #27ae60;">✅ Correct Decision</h4>
                    <p>You correctly identified that this presentation warrants EMG/NCS evaluation.</p>
                </div>
            `;
            continueBtn.style.display = 'inline-block';
            continueBtn.textContent = 'Proceed to EMG/NCS Results →';
        } else if (indicatedDecision === false && !isEMGIndicated) {
            feedbackDiv.innerHTML = `
                <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #27ae60;">✅ Excellent Clinical Judgment</h4>
                    <p>You correctly identified that EMG/NCS is <strong>not indicated</strong> in this case.</p>
                    <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                        <h5>🚨 Immediate Management Required</h5>
                        <p>${this.currentCase.educationalNote || 'This requires urgent medical attention.'}</p>
                    </div>
                </div>
            `;
            continueBtn.style.display = 'inline-block';
            continueBtn.textContent = 'Complete Case Review →';
        } else if (indicatedDecision === false && isEMGIndicated) {
            feedbackDiv.innerHTML = `
                <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                    <p>Actually, EMG/NCS <strong>would be appropriate</strong> in this case.</p>
                </div>
            `;
            continueBtn.style.display = 'inline-block';
            continueBtn.textContent = 'Proceed to EMG/NCS Results (Educational) →';
        } else {
            feedbackDiv.innerHTML = `
                <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                    <p>EMG/NCS would <strong>not be helpful</strong> in this case.</p>
                    <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                        <h5>🚨 This Patient Needs:</h5>
                        <p>${this.currentCase.educationalNote || 'Urgent neurological evaluation.'}</p>
                    </div>
                </div>
            `;
            continueBtn.style.display = 'inline-block';
            continueBtn.textContent = 'Complete Case Review →';
        }
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    proceedAfterDecision: function () {
        const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";
        if (this.userEMGDecision === true && isEMGIndicated) {
            this.showNCSResults();
        } else if (this.userEMGDecision === false && !isEMGIndicated) {
            this.showFinalDiagnosis();
        } else if (this.userEMGDecision === false && isEMGIndicated) {
            this.showNCSResults();
        } else {
            this.showFinalDiagnosis();
        }
    },

    showNCSResults: function () {
        console.log('Showing NCS Results');
        this.hideAllSteps();
        document.getElementById('results-step').style.display = 'block';
        this.updateProgress(85);
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });

        const ncsDiv = document.getElementById('ncs-results');
        if (this.currentCase.emgIndication === "NOT INDICATED") {
            ncsDiv.innerHTML = `
                <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                    <h4 style="color: #e74c3c;">⚠️ EMG/NCS NOT INDICATED</h4>
                    <p>${this.currentCase.explanation}</p>
                </div>
            `;
        } else {
            let html = '';
            const caseData = this.currentCase;
            const ncs = caseData.ncsResults || caseData.ncsStudies;

            if (!ncs) {
                ncsDiv.innerHTML = '<p>No NCS data available.</p>';
                return;
            }

            // Helper to format value with bolding if abnormal
            const formatValue = (val, isAbnormal) => {
                return isAbnormal ? `<strong>${val}</strong>` : val;
            };

            // Helper to get standard normal values
            const getStandardNormalValues = (nerveOrSite, type, site1, site2) => {
                // Extract nerve name from site string if needed
                let nerve = nerveOrSite;
                if (!nerve && type === 'Motor') return { peak: '-', amp: '-', vel: '-', dist: '-', site1: '-', site2: '-' };

                // Normalize nerve name
                let normalizedNerve = 'Median';
                if (nerve.toLowerCase().includes('ulnar')) normalizedNerve = 'Ulnar';
                else if (nerve.toLowerCase().includes('radial')) normalizedNerve = 'Radial';
                else if (nerve.toLowerCase().includes('peroneal') || nerve.toLowerCase().includes('fibular')) normalizedNerve = 'Peroneal';
                else if (nerve.toLowerCase().includes('tibial')) normalizedNerve = 'Tibial';
                else if (nerve.toLowerCase().includes('sural')) normalizedNerve = 'Sural';

                // Normalize type
                let normalizedType = 'Sensory';
                if (type && type.toLowerCase().includes('motor')) normalizedType = 'Motor';

                // Default Standards
                const standards = {
                    'Median': {
                        'Sensory': { peak: '<3.5', amp: '>20', vel: '>50', dist: '14', site1: 'Wrist', site2: 'Digit 2' },
                        'Motor': { lat: '<4.4', amp: '>4.0', vel: '>49', dist: '8', site1: 'Wrist', site2: 'APB' }
                    },
                    'Ulnar': {
                        'Sensory': { peak: '<3.1', amp: '>17', vel: '>50', dist: '14', site1: 'Wrist', site2: 'Digit 5' },
                        'Motor': { lat: '<3.3', amp: '>6.0', vel: '>49', dist: '8', site1: 'Wrist', site2: 'ADM' }
                    },
                    'Radial': {
                        'Sensory': { peak: '<2.9', amp: '>15', vel: '>50', dist: '10', site1: 'Forearm', site2: 'Thumb' },
                        'Motor': { lat: '<4.5', amp: '>5.0', vel: '>50', dist: '4', site1: 'Forearm', site2: 'EIP' }
                    },
                    'Peroneal': {
                        'Sensory': { peak: '<4.4', amp: '>6', vel: '>40', dist: '14', site1: 'Ankle', site2: 'Dorsum' },
                        'Motor': { lat: '<6.5', amp: '>2.0', vel: '>44', dist: '8', site1: 'Ankle', site2: 'EDB' }
                    },
                    'Tibial': {
                        'Motor': { lat: '<6.1', amp: '>3.0', vel: '>41', dist: '8', site1: 'Ankle', site2: 'AH' }
                    },
                    'Sural': {
                        'Sensory': { peak: '<4.4', amp: '>6', vel: '>40', dist: '14', site1: 'Calf', site2: 'Ankle' }
                    }
                };

                let result = standards[normalizedNerve]?.[normalizedType] || { peak: '-', amp: '-', vel: '-', dist: '-', site1: '-', site2: '-' };

                // Specific Distance Logic based on User Input
                if (normalizedType === 'Motor') {
                    // Median Motor
                    if (normalizedNerve === 'Median') {
                        if (site1?.includes('Wrist')) result.dist = '8';
                        else if (site1?.includes('Elbow')) result.dist = '25'; // "mid 20s"
                    }
                    // Ulnar Motor
                    else if (normalizedNerve === 'Ulnar') {
                        if (site1?.includes('Wrist')) result.dist = '8';
                        else if (site1?.includes('Elbow')) result.dist = '25'; // "mid 20s"
                    }
                    // Radial Motor
                    else if (normalizedNerve === 'Radial') {
                        if (site1?.includes('Forearm')) result.dist = '4';
                        else if (site1?.includes('Elbow') || site1?.includes('Spiral')) result.dist = '12';
                    }
                    // Peroneal (Fibular) Motor
                    else if (normalizedNerve === 'Peroneal') {
                        if (site1?.includes('Ankle')) result.dist = '8';
                        else if (site1?.includes('Fib') || site1?.includes('Head')) result.dist = '28'; // "26-30"
                        else if (site1?.includes('Popliteal')) result.dist = '10';
                    }
                    // Tibial Motor
                    else if (normalizedNerve === 'Tibial') {
                        if (site1?.includes('Ankle')) result.dist = '8';
                        else if (site1?.includes('Popliteal')) result.dist = '42'; // "40-45"
                    }
                }

                return result;
            };

            // 1. Handle "Anti-Sensory Summary" / "Motor Summary" format
            if (ncs.antiSensorySummary || ncs.motorSummary) {
                if (ncs.antiSensorySummary && ncs.antiSensorySummary.length > 0) {
                    html += '<h4>Nerve Conduction Studies</h4><h5>Anti Sensory Summary Table</h5>';
                    html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Peak (ms)</th><th>Norm Peak (ms)</th><th>P-T Amp (µV)</th><th>Norm P-T Amp</th><th>Site1</th><th>Site2</th><th>Delta-P (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                    ncs.antiSensorySummary.forEach(study => {
                        const isAbnormal = study.abnormal;
                        html += `<tr>
                            <td>${study.site}</td>
                            <td>${study.nr || ''}</td>
                            <td>${formatValue(study.peak || study.peakLatency, isAbnormal)}</td>
                            <td>${study.normPeak || '<2.7'}</td>
                            <td>${formatValue(study.ptAmp || study.amplitude, isAbnormal)}</td>
                            <td>${study.normAmp || '>15.0'}</td>
                            <td>${study.site1 || 'Wrist'}</td>
                            <td>${study.site2 || study.site.split(' ')[0]}</td>
                            <td>${study.deltaP || (study.peak || study.peakLatency)}</td>
                            <td>${study.dist || '14.0'}</td>
                            <td>${formatValue(study.vel || study.cv, isAbnormal)}</td>
                            <td>${study.normVel || '>38'}</td>
                        </tr>`;
                    });
                    html += '</tbody></table></div>';
                }
                if (ncs.motorSummary && ncs.motorSummary.length > 0) {
                    html += '<h5>Motor Summary Table</h5>';
                    html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Onset (ms)</th><th>Norm Onset (ms)</th><th>O-P Amp (mV)</th><th>Norm O-P Amp</th><th>Neg Dur (ms)</th><th>Site1</th><th>Site2</th><th>Delta-O (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                    ncs.motorSummary.forEach(study => {
                        const isAbnormal = study.abnormal;
                        html += `<tr>
                            <td>${study.site}</td>
                            <td>${study.nr || ''}</td>
                            <td>${formatValue(study.onset || study.distalLatency, isAbnormal)}</td>
                            <td>${study.normOnset || '<4.2'}</td>
                            <td>${formatValue(study.opAmp || study.amplitude, isAbnormal)}</td>
                            <td>${study.normAmp || '>5'}</td>
                            <td>${study.negDur || '-'}</td>
                            <td>${study.site1 || 'Elbow'}</td>
                            <td>${study.site2 || 'Wrist'}</td>
                            <td>${study.deltaO || '-'}</td>
                            <td>${study.dist || '-'}</td>
                            <td>${formatValue(study.vel || study.cv, isAbnormal)}</td>
                            <td>${study.normVel || '>50'}</td>
                        </tr>`;
                    });
                    html += '</tbody></table></div>';
                }
            }
            // 2. Handle "sensoryStudies" / "motorStudies" format
            else if (ncs.sensoryStudies || ncs.motorStudies) {
                if (ncs.sensoryStudies && ncs.sensoryStudies.length > 0) {
                    html += '<h4>Nerve Conduction Studies</h4><h5>Sensory Summary Table</h5>';
                    html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Peak (ms)</th><th>Norm Peak (ms)</th><th>P-T Amp (µV)</th><th>Norm P-T Amp</th><th>Site1</th><th>Site2</th><th>Delta-P (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                    ncs.sensoryStudies.forEach(study => {
                        const isAbnormal = !study.normal;
                        const std = getStandardNormalValues(study.nerve, 'Sensory', study.recording, study.stimulation); // Assuming recording/stimulation map to site1/site2 contextually or just use defaults
                        html += `<tr>
                            <td>${study.nerve}</td>
                            <td>-</td>
                            <td>${formatValue(study.peakLatency, isAbnormal)}</td>
                            <td>${std.peak}</td>
                            <td>${formatValue(study.amplitude, isAbnormal)}</td>
                            <td>${std.amp}</td>
                            <td>${std.site1}</td>
                            <td>${std.site2}</td>
                            <td>${study.peakLatency}</td>
                            <td>${std.dist}</td>
                            <td>${formatValue(study.cv, isAbnormal)}</td>
                            <td>${std.vel}</td>
                        </tr>`;
                    });
                    html += '</tbody></table></div>';
                }
                if (ncs.motorStudies && ncs.motorStudies.length > 0) {
                    html += '<h5>Motor Summary Table</h5>';
                    html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Onset (ms)</th><th>Norm Onset (ms)</th><th>O-P Amp (mV)</th><th>Norm O-P Amp</th><th>Neg Dur (ms)</th><th>Site1</th><th>Site2</th><th>Delta-O (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                    ncs.motorStudies.forEach(study => {
                        const isAbnormal = !study.normal;
                        const std = getStandardNormalValues(study.nerve, 'Motor', study.recording, study.stimulation);
                        html += `<tr>
                            <td>${study.nerve}</td>
                            <td>-</td>
                            <td>${formatValue(study.distalLatency, isAbnormal)}</td>
                            <td>${std.lat}</td>
                            <td>${formatValue(study.amplitude, isAbnormal)}</td>
                            <td>${std.amp}</td>
                            <td>-</td>
                            <td>${std.site1}</td>
                            <td>${std.site2}</td>
                            <td>-</td>
                            <td>${std.dist}</td>
                            <td>${formatValue(study.cv, isAbnormal)}</td>
                            <td>${std.vel}</td>
                        </tr>`;
                    });
                    html += '</tbody></table></div>';
                }
            }
            // 3. Handle nested ncsStudies (e.g., MG, Tarsal)
            else if (ncs.ncsStudies && Array.isArray(ncs.ncsStudies)) {
                html += '<h4>Nerve Conduction Studies</h4>';
                html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Nerve</th><th>Type</th><th>Result</th><th>Interpretation</th></tr></thead><tbody>';
                ncs.ncsStudies.forEach(study => {
                    html += `<tr>
                         <td>${study.nerve}</td>
                         <td>${study.type || '-'}</td>
                         <td>${study.result}</td>
                         <td>${study.interpretation}</td>
                     </tr>`;
                });
                html += '</tbody></table></div>';
            }
            // 4. Handle simple array format
            else if (Array.isArray(ncs)) {
                ncs.forEach(study => {
                    html += `
                        <div class="ncs-study" style="margin: 15px 0; padding: 15px; background: #fff; border-left: 4px solid ${study.result === 'abnormal' ? '#ef4444' : '#10b981'}; border-radius: 5px;">
                            <h4>⚡ ${study.name || study.nerve}</h4>
                            <div style="color: ${study.result === 'abnormal' ? '#dc2626' : '#059669'};"><strong>Results:</strong> ${study.findings || study.result}</div>
                            ${study.interpretation ? `<p><strong>Interpretation:</strong> ${study.interpretation}</p>` : ''}
                    `;
                });
            }

            // Handle Comparison Summary
            if (ncs.comparisonSummary && ncs.comparisonSummary.length > 0) {
                html += '<h5>Comparison Summary Table</h5>';
                html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Peak (ms)</th><th>P-T* Amp (µV)</th><th>Site1</th><th>Site2</th><th>Delta-P (ms)</th></tr></thead><tbody>';
                ncs.comparisonSummary.forEach(comp => {
                    // Render Median row
                    html += `<tr>
                        <td style="font-weight:bold; text-align:left;">${comp.site}</td>
                        <td colspan="6"></td>
                    </tr>`;
                    if (comp.median) {
                        html += `<tr>
                            <td style="text-align:left; padding-left:20px;">Median</td>
                            <td>${comp.median.nr || ''}</td>
                            <td>${comp.median.peak}</td>
                            <td>${comp.median.ptAmp}</td>
                            <td>Median</td>
                            <td>Radial</td>
                            <td rowspan="2" style="vertical-align:middle;">${comp.deltaP}</td>
                        </tr>`;
                    }
                    if (comp.ulnar) { // Handle Ulnar if present instead of Radial
                        html += `<tr>
                            <td style="text-align:left; padding-left:20px;">Ulnar</td>
                            <td>${comp.ulnar.nr || ''}</td>
                            <td>${comp.ulnar.peak}</td>
                            <td>${comp.ulnar.ptAmp}</td>
                            <td>Median</td>
                            <td>Ulnar</td>
                        </tr>`;
                    } else if (comp.radial) { // Default to Radial as per example
                        html += `<tr>
                            <td style="text-align:left; padding-left:20px;">Radial</td>
                            <td>${comp.radial.nr || ''}</td>
                            <td>${comp.radial.peak}</td>
                            <td>${comp.radial.ptAmp}</td>
                            <td>Median</td>
                            <td>Radial</td>
                        </tr>`;
                    }
                });
                html += '</tbody></table></div>';
            }

            // Handle EMG Findings
            const emg = ncs.emgFindings || caseData.emgFindings || ncs.emgStudies || caseData.emgStudies;
            if (emg && emg.length > 0) {
                html += '<h4>Needle EMG Findings</h4>';
                html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Side</th><th>Muscle</th><th>Nerve</th><th>Root</th><th>Ins Act</th><th>Fibs</th><th>Psw</th><th>Amp</th><th>Dur</th><th>Poly</th><th>Recrt</th><th>Int Pat</th></tr></thead><tbody>';
                emg.forEach(muscle => {
                    const isAbnormal = muscle.abnormal || muscle.interpretation?.toLowerCase().includes('abnormal') || muscle.interpretation?.toLowerCase().includes('denervation');

                    // Map old format to new columns if needed
                    const side = muscle.side || 'Right'; // Default to Right if missing
                    const nerve = muscle.nerve || '-';
                    const root = muscle.root || '-';
                    const insAct = muscle.insAct || muscle.insertionalActivity || 'Nml';
                    const fibs = muscle.fibs || (muscle.spontaneousActivity?.includes('fib') ? muscle.spontaneousActivity : 'Nml');
                    const psw = muscle.psw || (muscle.spontaneousActivity?.includes('PSW') ? 'Present' : 'Nml');
                    const amp = muscle.amp || 'Nml';
                    const dur = muscle.dur || 'Nml';
                    const poly = muscle.poly || (muscle.motorUnits?.includes('poly') ? '++' : '0');
                    const recrt = muscle.recrt || muscle.recruitment || 'Nml';
                    const intPat = muscle.intPat || 'Nml';
                    const comment = muscle.comment || muscle.interpretation || '';

                    html += `<tr>
                        <td>${side}</td>
                        <td style="font-weight:600;">${muscle.muscle}</td>
                        <td>${nerve}</td>
                        <td>${root}</td>
                        <td>${insAct}</td>
                        <td>${fibs}</td>
                        <td>${psw}</td>
                        <td>${amp}</td>
                        <td>${dur}</td>
                        <td>${poly}</td>
                        <td>${recrt}</td>
                        <td>${intPat}</td>
                    </tr>`;
                });
                html += '</tbody></table></div>';
            }

            ncsDiv.innerHTML = html;
            this.updateProgress(80);
        }
    },

    showFinalDiagnosis: function () {
        console.log('Showing Final Diagnosis');
        this.hideAllSteps();
        document.getElementById('diagnosis-step').style.display = 'block';
        this.updateProgress(95);
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    checkDiagnosis: function () {
        const userDiagnosis = document.getElementById('final-diagnosis').value;
        console.log('Checking Diagnosis:', userDiagnosis);

        if (!userDiagnosis.trim()) {
            alert('Please enter a diagnosis first.');
            return;
        }
        const correctDiagnosis = this.currentCase.diagnosis || this.currentCase.correctDiagnosis;
        const feedbackDiv = document.getElementById('diagnosis-feedback');

        // Simple string matching for now (case insensitive)
        if (!correctDiagnosis) {
            console.error('Diagnosis not defined for this case');
            alert('Error: Diagnosis data missing for this case.');
            return;
        }

        const isCorrect = userDiagnosis.toLowerCase().includes(correctDiagnosis.toLowerCase()) ||
            correctDiagnosis.toLowerCase().includes(userDiagnosis.toLowerCase());

        if (isCorrect) {
            feedbackDiv.innerHTML = `
                <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px; margin-top: 20px;">
                    <h3 style="color: #27ae60; margin-top: 0;">🎉 Correct Diagnosis!</h3>
                    <p style="font-size: 1.1em;"><strong>${correctDiagnosis}</strong></p>
                    <p>Excellent work! You correctly identified the pathology based on the clinical presentation and electrodiagnostic findings.</p>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #bbf7d0;">
                        <h5>🎓 Key Learning Points:</h5>
                        <ul>
                            ${this.currentCase.educationalNotes ? this.currentCase.educationalNotes.keyPoints.map(point => `<li>${point}</li>`).join('') : '<li>Review the case details to solidify your understanding.</li>'}
                        </ul>
                    </div>
                </div>
            `;
            this.updateProgress(100);
        } else {
            feedbackDiv.innerHTML = `
                <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px; margin-top: 20px;">
                    <h3 style="color: #e74c3c; margin-top: 0;">Not Quite</h3>
                    <p>The correct diagnosis is <strong>${correctDiagnosis}</strong>.</p>
                    <p>Your answer: ${userDiagnosis}</p>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #fecaca;">
                        <h5>💡 Clinical Pearls:</h5>
                        <ul>
                            ${this.currentCase.educationalNotes ? this.currentCase.educationalNotes.clinicalPearls.map(pearl => `<li>${pearl}</li>`).join('') : '<li>Consider the pattern of weakness and sensory loss.</li>'}
                        </ul>
                    </div>
                </div>
            `;
        }
        document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    hideAllSteps: function () {
        const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
        steps.forEach(stepId => {
            const element = document.getElementById(stepId);
            if (element) element.style.display = 'none';
        });
    },

    startNewCase: function () {
        this.currentCase = null;
        this.currentStep = 1;
        this.userDifferential = '';
        this.userEMGDecision = null;

        document.getElementById('case-interface').style.display = 'none';
        document.getElementById('case-selection-screen').style.display = 'block';

        document.getElementById('user-differential').value = '';
        document.getElementById('final-diagnosis').value = '';
        document.getElementById('differential-feedback').innerHTML = '';
        document.getElementById('diagnosis-feedback').innerHTML = '';
        document.getElementById('continue-to-studies').style.display = 'none';
        document.getElementById('emg-results').style.display = 'none';

        this.updateProgress(0);
    },

    updateProgress: function (percentage) {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        if (progressBar) progressBar.style.width = percentage + '%';
        if (progressText) {
            const stepTexts = {
                0: 'Starting case...',
                20: 'Case Presentation',
                40: 'Physical Examination',
                60: 'Differential Diagnosis',
                70: 'EMG/NCS Decision',
                80: 'Results Review',
                100: 'Final Diagnosis'
            };
            progressText.textContent = stepTexts[percentage] || 'In Progress...';
        }
    }
