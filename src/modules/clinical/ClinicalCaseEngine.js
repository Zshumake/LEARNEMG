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

    // --- Interaction Methods ---
    analyzeDifferential() {
        const inputEl = document.getElementById('user-differential');
        if (!inputEl) return;

        const userInput = inputEl.value;
        this.userDifferential = userInput;

        // Ensure differentialDiagnosis is an array of objects or strings, handle both
        let expected = this.currentCase.differentialDiagnosis || [];

        const results = ClinicalEvaluator.analyzeDifferential(userInput, expected);

        const feedbackDiv = document.getElementById('differential-feedback');
        if (feedbackDiv) {
            feedbackDiv.innerHTML = ClinicalRenderer.renderDifferentialFeedback(results, expected);
            feedbackDiv.style.display = 'block';
        }

        const nextBtn = document.getElementById('continue-to-studies');
        if (nextBtn) nextBtn.style.display = 'inline-block';
    }

    makeEMGDecision(decision) {
        this.userEMGDecision = decision;
        const evaluation = ClinicalEvaluator.evaluateEMGDecision(decision, this.currentCase);

        const feedbackDiv = document.getElementById('emg-decision-feedback');
        if (feedbackDiv) {
            feedbackDiv.innerHTML = ClinicalRenderer.renderEMGDecisionFeedback(evaluation);
            feedbackDiv.style.display = 'block';
        }

        const continueBtn = document.getElementById('continue-after-decision');
        if (continueBtn) {
            continueBtn.style.display = 'inline-block';
        }
    }

    proceedAfterDecision() {
        this.showNCSResults();
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
    transitionToStep(stepId, percentage) {
        const steps = ['case-selection', 'case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];

        steps.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (id === stepId) {
                    el.classList.add('active-step');
                    el.style.display = 'block';
                    // Trigger reflow for animation
                    void el.offsetWidth;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                } else {
                    el.classList.remove('active-step');
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(10px)';
                    // Delay hiding to allow transition
                    setTimeout(() => {
                        if (!el.classList.contains('active-step')) {
                            el.style.display = 'none';
                        }
                    }, 400);
                }
            }
        });

        if (percentage !== undefined) {
            this.updateProgress(percentage);
        }
    }

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

    showCasePresentation() {
        this.transitionToStep('case-presentation-step', 20);
    }

    showPhysicalExam() {
        this.transitionToStep('physical-exam-step', 40);
    }

    showDifferentialBuilder() {
        this.transitionToStep('differential-step', 60);
    }

    showEMGDecision() {
        this.transitionToStep('emg-decision-step', 70);
    }

    showNCSResults() {
        this.transitionToStep('results-step', 80);

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
    }

    showFinalDiagnosis() {
        this.transitionToStep('diagnosis-step', 100);
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
