import { ClinicalRenderer } from './ClinicalRenderer.js';
import { ClinicalTables } from './components/ClinicalTables.js';
import logger from '../../utils/Logger.js';

export class ClinicalUI {
    constructor(engine) {
        this.engine = engine;
        this.container = null;

        // Bind methods so they can be securely used in event listeners
        this.startSpecificCase = this.startSpecificCase.bind(this);
        this.startBeginnerCases = this.startBeginnerCases.bind(this);
        this.startIntermediateCases = this.startIntermediateCases.bind(this);
        this.startExpertCases = this.startExpertCases.bind(this);
        this.startNewCase = this.startNewCase.bind(this);

        this.showPhysicalExam = this.showPhysicalExam.bind(this);
        this.showDifferentialBuilder = this.showDifferentialBuilder.bind(this);
        this._handleDifferentialSubmit = this._handleDifferentialSubmit.bind(this);
        this.showEMGDecision = this.showEMGDecision.bind(this);
        this.proceedAfterDecision = this.proceedAfterDecision.bind(this);
        this.showFinalDiagnosis = this.showFinalDiagnosis.bind(this);
        this._handleFinalDiagnosisSubmit = this._handleFinalDiagnosisSubmit.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.analyzeDifferential = this.analyzeDifferential.bind(this);
        this.makeEMGDecision = this.makeEMGDecision.bind(this);
        this.checkFinalDiagnosis = this.checkFinalDiagnosis.bind(this);
        this._handleAction = this._handleAction.bind(this);
        this.currentPGY = 'all';
    }

    // --- Core API ---

    showClinicalCases(pgyLevel) {
        this.currentPGY = pgyLevel || 'all';
        this.renderDashboard(this.currentPGY);
    }

    setFilter(difficulty) {
        this.renderDashboard(this.currentPGY, difficulty);
    }

    renderDashboard(pgyLevel, selectedDifficulty = 'all') {
        const content = ClinicalRenderer.renderDashboard(pgyLevel, this.engine.database, selectedDifficulty);

        // 1. Candyland Core Integration Check
        const activeCandylandModal = document.querySelector('.learning-modal-overlay.active .learning-modal');

        if (activeCandylandModal) {
            const existingRoot = document.getElementById('clinical-root');
            if (existingRoot) {
                const scrollTop = existingRoot.scrollTop;
                existingRoot.innerHTML = content;
                existingRoot.scrollTop = scrollTop;
                this.container = existingRoot;
            } else {
                logger.log('Injecting directly into active Candyland module...');
                activeCandylandModal.innerHTML = `
                    <div style="padding: 25px; border-bottom: 2px solid #e5e7eb; background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 15px 15px 0 0; position: relative;">
                        <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">Clinical Cases</h2>
                        <button class="modal-close-btn" data-action="closeModal" style="position: absolute; top: 20px; right: 20px; background: #ef4444; color: white; border: none; font-size: 20px; cursor: pointer; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: all 0.2s;">×</button>
                    </div>
                    <div id="clinical-root" style="padding: 30px; background: white; border-radius: 0 0 15px 15px; overflow-y: auto; max-height: 80vh;">
                        ${content}
                    </div>
                `;
                this.container = document.getElementById('clinical-root');
            }
        } else if (window.showModal) {
            window.showModal('Clinical Cases', `<div id="clinical-root">${content}</div>`);
            this.container = document.getElementById('clinical-root');
        }

        this._attachDashboardListeners();
    }

    _attachDashboardListeners() {
        if (!this.container) return;

        // Use the closest modal or the container itself for delegation
        const delegate = this.container.closest('.learning-modal') || this.container;

        delegate.onclick = (e) => {
            const actionEl = e.target.closest('[data-action]');
            if (!actionEl) return;
            this._handleAction(actionEl, e);
        };
    }

    _attachInterfaceListeners() {
        if (!this.container) return;

        this._attachMagneticEffects();

        // Use the closest modal or the container itself for delegation
        const delegate = this.container.closest('.learning-modal') || this.container;

        delegate.onclick = (e) => {
            const actionEl = e.target.closest('[data-action]');
            if (!actionEl) return;
            this._handleAction(actionEl, e);
        };
    }

    _handleAction(el, event) {
        const action = el.dataset.action;
        if (!action) return;

        // Prevent default only for our handled actions
        event.stopPropagation();

        switch (action) {
            case 'setFilter':
                this.setFilter(el.dataset.difficulty);
                break;
            case 'startCase':
                this.startSpecificCase(el.dataset.id);
                break;
            case 'exitCase':
                this.startNewCase();
                break;
            case 'showExam':
                this.showPhysicalExam();
                break;
            case 'showReasoning':
                this.showDifferentialBuilder();
                break;
            case 'analyzeReasoning':
                this._handleDifferentialSubmit();
                break;
            case 'showStrategy':
                this.showEMGDecision();
                break;
            case 'emgIndicated':
                this._handleEMGDecisionClick(el.dataset.value === 'true');
                break;
            case 'showResults':
                this.proceedAfterDecision();
                break;
            case 'showConclusion':
                this.showFinalDiagnosis();
                break;
            case 'closeModal':
                const overlay = el.closest('.learning-modal-overlay');
                if (overlay) overlay.remove();
                break;
            case 'submitConclusion':
                this._handleFinalDiagnosisSubmit();
                break;
            case 'openSettings':
                alert("Clinical Settings: Difficulty filtering and profile management are currently integrated directly into the dashboard. More standalone settings coming soon!");
                break;
            case 'resetProgress':
                if (confirm("Are you sure you want to reset all progress? This will clear your module completion history and reload the app.")) {
                    localStorage.removeItem('ernestEMGProgress');
                    location.reload();
                }
                break;
        }
    }

    _attachMagneticEffects() {
        // Find all interactive elements that should glow or float
        const magnetics = document.querySelectorAll('.glass-btn, .glass-card, .large-diff-card, .dashboard-card-btn, .difficulty-card');

        magnetics.forEach(btn => {
            if (!btn.classList.contains('magnetic-btn')) {
                btn.classList.add('magnetic-btn');
            }
        });

        // Use a single document-level tracker for proximity effects
        if (!this._magneticTrackerAttached) {
            this._magneticTrackerAttached = true;

            document.addEventListener('mousemove', (e) => {
                const magneticBtns = document.querySelectorAll('.magnetic-btn');
                const pullRadius = 180; // pixels of magnetic reach

                magneticBtns.forEach(btn => {
                    const rect = btn.getBoundingClientRect();

                    // Compensate for existing transform to prevent jitter
                    const computedStyle = window.getComputedStyle(btn);
                    let tx = 0, ty = 0;
                    if (computedStyle.transform !== 'none') {
                        try {
                            const matrix = new DOMMatrixReadOnly(computedStyle.transform);
                            tx = matrix.e || 0;
                            ty = matrix.f || 0;
                        } catch (err) { }
                    }

                    const centerX = (rect.left - tx) + (rect.width / 2);
                    const centerY = (rect.top - ty) + (rect.height / 2);

                    const distanceX = e.clientX - centerX;
                    const distanceY = e.clientY - centerY;
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                    if (distance < pullRadius) {
                        // Calculate an easing force (stronger when closer)
                        const force = (pullRadius - distance) / pullRadius;
                        const pullX = distanceX * 0.15 * force;
                        const pullY = distanceY * 0.15 * force;
                        btn.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.02)`;
                    } else if (btn.style.transform !== '') {
                        btn.style.transform = '';
                    }
                });
            });
        }
    }

    // --- Interaction Routing & Public API Aliases ---

    analyzeDifferential() { this._handleDifferentialSubmit(); }
    makeEMGDecision(isIndicated) { this._handleEMGDecisionClick(isIndicated); }
    checkFinalDiagnosis() { this._handleFinalDiagnosisSubmit(); }

    startSpecificCase(caseId) {
        try {
            const caseData = this.engine.loadCase(caseId);

            // UI Transitions
            const selDiv = document.getElementById('case-selection');
            const intDiv = document.getElementById('case-interface');
            const stepsContainer = document.getElementById('case-steps-container');

            if (selDiv) selDiv.style.opacity = '0';

            setTimeout(() => {
                if (selDiv) selDiv.style.display = 'none';
                if (intDiv) intDiv.style.display = 'block';
                if (stepsContainer) stepsContainer.style.display = 'none';

                // Inject Skeleton Loader
                const skeletonId = 'temp-skeleton-loader';
                let skeleton = document.getElementById(skeletonId);
                if (!skeleton) {
                    skeleton = document.createElement('div');
                    skeleton.id = skeletonId;
                    skeleton.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
                            <div class="skeleton-box" style="height: 32px; width: 40%;"></div>
                            <div class="skeleton-box" style="height: 24px; width: 25%;"></div>
                        </div>
                        <div class="medical-history-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="skeleton-box" style="height: 100px;"></div>
                            <div class="skeleton-box" style="height: 150px; grid-column: span 2;"></div>
                            <div class="skeleton-box" style="height: 120px;"></div>
                            <div class="skeleton-box" style="height: 120px;"></div>
                        </div>
                    `;
                    intDiv.querySelector('.case-header').insertAdjacentElement('afterend', skeleton);
                }
                skeleton.style.display = 'block';

                // Simulate high-speed data retrieval
                setTimeout(() => {
                    skeleton.style.display = 'none';
                    if (stepsContainer) stepsContainer.style.display = 'block';

                    this._attachInterfaceListeners();
                    this._populateCaseDetails(caseData);
                    this._transitionToStep('case-presentation-step', 20);
                }, 400);

            }, 200);

        } catch (e) {
            logger.error(e);
            alert('Case not available.');
        }
    }

    startNewCase() {
        this.engine.currentCase = null;

        // Reset state
        const selDiv = document.getElementById('case-selection');
        const intDiv = document.getElementById('case-interface');

        if (selDiv && intDiv) {
            intDiv.style.display = 'none';
            selDiv.style.display = 'block';
            selDiv.style.opacity = '1';

            // Hide and reset all steps
            const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
            steps.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.style.display = 'none';
                    el.classList.remove('shrunk-pill');
                    el.classList.remove('active-step');
                    el.style.maxHeight = '';
                    el.style.opacity = '';
                    el.style.filter = '';
                    el.style.transform = '';
                    el.style.pointerEvents = '';
                    el.onclick = null;
                }
            });

            this._updateProgress(0);
        } else {
            this.renderDashboard('all');
        }
    }

    // Stubbed category loaders
    startBeginnerCases() { alert('Category filter not yet implemented. Please select a specific case.'); }
    startIntermediateCases() { alert('Category filter not yet implemented. Please select a specific case.'); }
    startExpertCases() { alert('Category filter not yet implemented. Please select a specific case.'); }

    // --- State & Stepping Handlers ---

    _animateKineticNumbers(containerElement) {
        if (!containerElement) return;
        const kineticEls = containerElement.querySelectorAll('.kinetic-number');

        kineticEls.forEach(el => {
            if (el.dataset.animated) return;
            el.dataset.animated = 'true';

            const targetStr = el.getAttribute('data-target');
            const target = parseFloat(targetStr);
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';

            if (isNaN(target)) return;

            const duration = 1000; // 1 second animation
            const frameRate = 30;
            const totalFrames = duration / frameRate;
            let currentFrame = 0;

            // Decimal places logic (e.g. 54.2 CV has 1 decimal)
            const decimals = targetStr.includes('.') ? targetStr.split('.')[1].length : 0;

            const counter = setInterval(() => {
                currentFrame++;
                const progress = currentFrame / totalFrames;
                // Easing out cubic: 1 - pow(1 - x, 3)
                const easeOut = 1 - Math.pow(1 - progress, 3);

                const currentVal = target * easeOut;
                el.innerText = prefix + currentVal.toFixed(decimals) + suffix;

                if (currentFrame >= totalFrames) {
                    clearInterval(counter);
                    el.innerText = prefix + target.toFixed(decimals) + suffix;
                }
            }, frameRate);
        });
    }

    _transitionToStep(stepId, percentage) {
        const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
        const container = document.getElementById('case-steps-container');

        if (container) {
            container.style.position = 'relative';
        }

        let passedTarget = false;

        steps.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (id === stepId) {
                    passedTarget = true;
                    el.classList.remove('shrunk-pill');
                    el.classList.add('active-step');

                    if (stepId === 'results-step') {
                        // Start kinetic counter animations after slight delay for visual sync
                        setTimeout(() => this._animateKineticNumbers(el), 400);
                    }
                    el.style.position = 'relative';
                    el.style.visibility = 'visible';
                    el.style.display = 'block';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(15px)';
                    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    el.style.maxHeight = '';
                    el.style.filter = '';

                    // Trigger reflow
                    void el.offsetWidth;

                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.style.pointerEvents = 'auto';
                    el.onclick = null;
                } else if (!passedTarget) {
                    // Previous steps: Progressive disclosure (shrunk pills)
                    el.classList.remove('active-step');
                    if (!el.classList.contains('shrunk-pill')) {
                        el.classList.add('shrunk-pill');
                        el.style.position = 'relative';
                        el.style.visibility = 'visible';
                        el.style.display = 'block';
                        el.style.pointerEvents = 'auto';
                        el.style.opacity = '';
                        el.style.transform = '';
                        el.style.maxHeight = '';
                        el.style.filter = '';
                        // Toggle expansion on click
                        el.onclick = function (e) {
                            if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') return;
                            if (this.style.maxHeight === 'none') {
                                this.style.maxHeight = '';
                                this.style.opacity = '';
                                this.style.filter = '';
                            } else {
                                this.style.maxHeight = 'none';
                                this.style.opacity = '1';
                                this.style.filter = 'none';
                            }
                        };
                    }
                } else {
                    // Future steps: Hidden
                    el.classList.remove('active-step');
                    el.classList.remove('shrunk-pill');
                    el.style.position = 'absolute';
                    el.style.top = '0';
                    el.style.left = '0';
                    el.style.width = '100%';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(-10px)';
                    el.style.pointerEvents = 'none';
                    el.style.visibility = 'hidden';
                    el.style.transition = 'opacity 0.4s ease-in, transform 0.4s ease-in, visibility 0s 0.4s';
                    el.onclick = null;
                }
            }
        });

        if (percentage !== undefined) {
            this._updateProgress(percentage);
        }
    }

    _populateCaseDetails(caseData) {
        const detailsDiv = document.getElementById('case-details');
        if (detailsDiv) detailsDiv.innerHTML = ClinicalRenderer.renderCaseDetails(caseData);

        const examDiv = document.getElementById('physical-exam-details');
        if (examDiv) examDiv.innerHTML = ClinicalRenderer.renderPhysicalExam(caseData.physicalExam);
    }

    _updateProgress(percentage) {
        const bar = document.getElementById('progress-fill');
        if (bar) bar.style.width = percentage + '%';
    }

    showPhysicalExam() { this._transitionToStep('physical-exam-step', 40); }
    showDifferentialBuilder() { this._transitionToStep('differential-step', 60); }
    showEMGDecision() { this._transitionToStep('emg-decision-step', 70); }
    showFinalDiagnosis() { this._transitionToStep('diagnosis-step', 90); }

    proceedAfterDecision() {
        this._transitionToStep('results-step', 80);

        const caseData = this.engine.currentCase;
        const ncsDiv = document.getElementById('ncs-results');
        if (ncsDiv) ncsDiv.innerHTML = ClinicalTables.generateNCSTable(caseData);

        const emgTitle = document.getElementById('emg-results');
        const emgDetailDiv = document.getElementById('emg-details');

        if (emgTitle && emgDetailDiv) {
            if (caseData.emgStudies) {
                emgTitle.style.display = 'block';
                emgDetailDiv.innerHTML = ClinicalTables.generateEMGTable(caseData.emgStudies);
            } else {
                emgTitle.style.display = 'none';
                emgDetailDiv.innerHTML = '';
            }
        }
    }

    // --- Input & Evaluation Handlers ---

    _handleDifferentialSubmit() {
        const inputEl = document.getElementById('differential-input');
        if (!inputEl) return;

        const results = this.engine.analyzeDifferential(inputEl.value);

        const feedbackDiv = document.getElementById('differential-feedback');
        if (feedbackDiv) {
            // Note: The original ClinicalRenderer.renderDifferentialFeedback takes (results, expectedDifferentials)
            // It only structurally needs results.matched, results.totalExpected.
            feedbackDiv.innerHTML = ClinicalRenderer.renderDifferentialFeedback(results, results.expectedData);
            feedbackDiv.style.display = 'block';
        }

        const nextBtn = document.getElementById('continue-to-studies');
        if (nextBtn) nextBtn.style.display = 'inline-block';
    }

    _handleEMGDecisionClick(isIndicated) {
        const evaluation = this.engine.evaluateEMGDecision(isIndicated);

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

    _handleFinalDiagnosisSubmit() {
        const inputEl = document.getElementById('final-diagnosis');
        if (!inputEl) return;

        // Ask engine if correct
        const isCorrect = this.engine.evaluateFinalDiagnosis(inputEl.value);

        // Tell renderer to show answers
        const feedbackDiv = document.getElementById('diagnosis-feedback');
        if (feedbackDiv) {
            feedbackDiv.innerHTML = ClinicalRenderer.renderFinalDiagnosis(isCorrect, this.engine.currentCase, inputEl.value);
            feedbackDiv.style.display = 'block';
        }

        this._updateProgress(100);
    }
}
