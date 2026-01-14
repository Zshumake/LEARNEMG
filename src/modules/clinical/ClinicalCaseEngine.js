import { clinicalCasesData as caseDatabase } from '../../data/ClinicalCorrelationCases.js';
import { ClinicalDataStandardizer } from '../../utils/ClinicalDataStandardizer.js';
import { ClinicalEvaluator } from './ClinicalEvaluator.js';
import { ClinicalRenderer } from './ClinicalRenderer.js';
import { ClinicalTables } from './components/ClinicalTables.js';

export class ClinicalCases {
    constructor() {
        this.currentCase = null;
        this.currentStep = 1;
        this.userDifferential = '';
        this.userEMGDecision = null;

        // Bind methods
        this.analyzeDifferential = this.analyzeDifferential.bind(this);
        this.makeEMGDecision = this.makeEMGDecision.bind(this);
    }

    // --- Main Entry ---
    showClinicalCases() {
        console.log(`🏥 ClinicalCases triggered`);
        const content = ClinicalRenderer.renderDashboard('all', caseDatabase);
        if (window.showModal) window.showModal('Clinical Cases', content);
    }

    // --- Case Lifecycle ---
    startSpecificCase(caseId) {
        if (!caseDatabase[caseId]) {
            alert('Case not available.');
            return;
        }

        this.currentCase = ClinicalDataStandardizer.standardizeCase(JSON.parse(JSON.stringify(caseDatabase[caseId])));
        window.currentCase = this.currentCase;
        this.currentStep = 1;
        this.userDifferential = '';
        this.userEMGDecision = null;

        // UI Transitions
        const selDiv = document.getElementById('case-selection');
        if (selDiv) selDiv.style.display = 'none';
        const intDiv = document.getElementById('case-interface');
        if (intDiv) intDiv.style.display = 'block';

        this.populateCaseDetails();
        this.showCasePresentation();
        this.updateProgress(20);
    }

    startNewCase() {
        this.currentCase = null;
        window.currentCase = null;
        this.currentStep = 1;
        this.userDifferential = '';
        this.userEMGDecision = null;

        this.showClinicalCases();
    }

    // --- Step Navigation & Rendering ---
    populateCaseDetails() {
        const detailsDiv = document.getElementById('case-details');
        if (detailsDiv) detailsDiv.innerHTML = ClinicalRenderer.renderCaseDetails(this.currentCase);

        const examDiv = document.getElementById('physical-exam-details');
        if (examDiv) examDiv.innerHTML = ClinicalRenderer.renderPhysicalExam(this.currentCase.physicalExam);
    }

    updateProgress(percentage) {
        const bar = document.getElementById('progress-fill');
        if (bar) bar.style.width = percentage + '%';
    }

    hideAllSteps() {
        const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
        steps.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    showCasePresentation() {
        this.hideAllSteps();
        document.getElementById('case-presentation-step').style.display = 'block';
        this.updateProgress(20);
    }

    showPhysicalExam() {
        this.hideAllSteps();
        document.getElementById('physical-exam-step').style.display = 'block';
        this.updateProgress(40);
    }

    showDifferentialBuilder() {
        this.hideAllSteps();
        document.getElementById('differential-step').style.display = 'block';
        this.updateProgress(60);
    }

    showEMGDecision() {
        this.hideAllSteps();
        document.getElementById('emg-decision-step').style.display = 'block';
        this.updateProgress(70);
    }

    // --- Interaction Logic (Delegated) ---
    analyzeDifferential() {
        const userInput = document.getElementById('user-differential').value;
        const feedbackDiv = document.getElementById('differential-feedback');

        if (!userInput.trim()) {
            feedbackDiv.innerHTML = '<div class="feedback-card error"><h4>🤔 Missing Input</h4><p>Please enter your differential!</p></div>';
            return;
        }

        const expected = this.currentCase.expectedDifferential || [];
        const results = ClinicalEvaluator.analyzeDifferential(userInput, expected);

        feedbackDiv.innerHTML = ClinicalRenderer.renderDifferentialFeedback(results, expected);
        document.getElementById('continue-to-studies').style.display = 'inline-block';
    }

    makeEMGDecision(indicatedDecision) {
        this.userEMGDecision = indicatedDecision;
        const evaluation = ClinicalEvaluator.evaluateEMGDecision(indicatedDecision, this.currentCase);

        const feedbackDiv = document.getElementById('emg-decision-feedback');
        feedbackDiv.innerHTML = ClinicalRenderer.renderEMGDecisionFeedback(evaluation);

        const continueBtn = document.getElementById('continue-after-decision');
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = evaluation.type.includes('correct') ? 'Proceed →' : 'Proceed (Educational) →';
    }

    proceedAfterDecision() {
        const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";
        if (this.userEMGDecision === true || (this.userEMGDecision === false && isEMGIndicated)) {
            this.showNCSResults();
        } else {
            this.showFinalDiagnosis();
        }
    }

    showNCSResults() {
        this.hideAllSteps();
        document.getElementById('results-step').style.display = 'block';

        const ncsDiv = document.getElementById('ncs-results');
        ncsDiv.innerHTML = ClinicalTables.generateNCSTable(this.currentCase);

        const emgTitle = document.getElementById('emg-results');
        const emgDetailDiv = document.getElementById('emg-details');

        if (this.currentCase.emgStudies) {
            emgTitle.style.display = 'block';
            emgDetailDiv.innerHTML = ClinicalTables.generateEMGTable(this.currentCase.emgStudies);
        } else {
            emgTitle.style.display = 'none';
            emgDetailDiv.innerHTML = '';
        }

        this.updateProgress(80);
    }

    showFinalDiagnosis() {
        this.hideAllSteps();
        document.getElementById('diagnosis-step').style.display = 'block';
        this.updateProgress(100);
    }

    checkFinalDiagnosis() {
        const userDiagnosis = document.getElementById('final-diagnosis').value;
        const isCorrect = ClinicalEvaluator.evaluateDiagnosis(userDiagnosis, this.currentCase.correctDiagnosis);

        const feedbackDiv = document.getElementById('diagnosis-feedback');
        feedbackDiv.innerHTML = ClinicalRenderer.renderFinalDiagnosis(isCorrect, this.currentCase, userDiagnosis);
    }

    // --- Difficulty Filtering ---
    startBeginnerCases() { this.startPGYSpecificCases('pgy2', 'beginner'); }
    startIntermediateCases() { this.startPGYSpecificCases('pgy3', 'intermediate'); }
    startExpertCases() { this.startPGYSpecificCases('pgy4', 'difficult'); }

    startPGYSpecificCases(pgyLevel, difficulty) {
        const filteredCases = Object.entries(caseDatabase)
            .filter(([id, data]) => data.difficulty === difficulty)
            .map(([id]) => id);

        if (filteredCases.length === 0) return;
        this.startSpecificCase(filteredCases[Math.floor(Math.random() * filteredCases.length)]);
    }
}
