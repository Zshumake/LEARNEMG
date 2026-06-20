import { MuscleDatabase, LesionSites } from '../../data/MuscleDatabase.js';
import { showModal } from '../../utils/ViewHelpers.js';
import { registerAction } from '../../utils/ActionBus.js';
import logger from '../../utils/Logger.js';
import { shuffle } from '../../utils/shuffle.js';

export class EMGChallengeSystem {
    constructor() {
        this.currentSettings = {
            difficulty: 'moderate',
            region: 'mixed',
            type: 'localization'
        };
        this.isActive = false;
        this.currentCase = null;
        this.selectedAnswer = null;
        this.score = { correct: 0, total: 0 };
        this.caseNumber = 0;
        this.activeQuestionTypes = {
            root: true,
            plexus: true,
            peripheral: true
        };

        // Data Sources
        this.muscles = MuscleDatabase;
        this.lesionSites = LesionSites;

        // Bind methods
        this.startChallenge = this.startChallenge.bind(this);
        this.generateCase = this.generateCase.bind(this);
        this.selectAnswer = this.selectAnswer.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.nextCase = this.nextCase.bind(this);
        this.backToSettings = this.backToSettings.bind(this);
        this.toggleQuestionType = this.toggleQuestionType.bind(this);

        // Register with ActionBus (uses polling helper because this constructor
        // runs BEFORE Initialization.js defines window._registerAction)
        registerAction('emgChallenge:toggleQuestionType', (el) => {
            const type = el.getAttribute('data-type');
            this.toggleQuestionType(type);
        });
        registerAction('emgChallenge:startChallenge', () => this.startChallenge());
        registerAction('emgChallenge:selectAnswer', (el) => {
            const answer = el.getAttribute('data-answer');
            this.selectAnswer(answer);
        });
        registerAction('emgChallenge:backToSettings', () => this.backToSettings());
        registerAction('emgChallenge:submitAnswer', () => this.submitAnswer());
        registerAction('emgChallenge:nextCase', () => this.nextCase());
    }

    launch() {
        logger.log('EMG Localization Challenge Launched...');

        const emgChallengeContent = `

            <div class="emg-challenge-root">
                <!-- ================= SETUP PANEL ================= -->
                <div id="emg-challenge-setup" class="challenge-section">
                    <div class="emg-clinical-bar">
                        <div class="emg-bar-left">
                            <span class="emg-bar-indicator"></span>
                            <div>
                                <p class="emg-bar-subtitle">EMG Clinical Workstation</p>
                                <h3 class="emg-bar-title">Localization Challenge — Setup</h3>
                            </div>
                        </div>
                        <div class="emg-bar-right">
                            <button class="emg-back-btn" data-action="backToMuscleMenu">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                Menu
                            </button>
                        </div>
                    </div>

                    <div class="emg-setup-card">
                        <div class="emg-setup-intro">
                            <h4>Diagnostic Localization Drill</h4>
                            <p>Review the pattern of abnormal and normal muscles, then localize the lesion. Select which lesion categories to include in your session below.</p>
                        </div>

                        <h5 class="emg-section-label">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Lesion Categories
                            <span class="emg-section-count">3 available</span>
                        </h5>

                        <div class="emg-toggle-grid">
                            <div class="emg-toggle-card active" data-type="root" role="button" tabindex="0" data-action="emgChallenge:toggleQuestionType">
                                <div class="emg-toggle-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                </div>
                                <div class="emg-toggle-body">
                                    <h5 class="emg-toggle-title">Nerve Roots</h5>
                                    <p class="emg-toggle-desc">C5–T1 and L2–S1 radiculopathies</p>
                                </div>
                                <div class="emg-toggle-check">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>

                            <div class="emg-toggle-card active" data-type="plexus" role="button" tabindex="0" data-action="emgChallenge:toggleQuestionType">
                                <div class="emg-toggle-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                                </div>
                                <div class="emg-toggle-body">
                                    <h5 class="emg-toggle-title">Plexus</h5>
                                    <p class="emg-toggle-desc">Trunk and cord-level injuries</p>
                                </div>
                                <div class="emg-toggle-check">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>

                            <div class="emg-toggle-card active" data-type="peripheral" role="button" tabindex="0" data-action="emgChallenge:toggleQuestionType">
                                <div class="emg-toggle-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>
                                </div>
                                <div class="emg-toggle-body">
                                    <h5 class="emg-toggle-title">Peripheral Nerve</h5>
                                    <p class="emg-toggle-desc">Entrapments and focal neuropathies</p>
                                </div>
                                <div class="emg-toggle-check">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <div class="emg-launch-row">
                            <div class="emg-launch-label">
                                Ready to begin?<br>
                                <strong>Cases draw from all selected categories.</strong>
                            </div>
                            <button class="emg-launch-btn" data-action="emgChallenge:startChallenge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                Begin Session
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ================= ACTIVE CHALLENGE PANEL ================= -->
                <div id="emg-challenge-active" class="challenge-section" style="display:none;">
                    <div class="emg-clinical-bar">
                        <div class="emg-bar-left">
                            <span class="emg-bar-indicator"></span>
                            <div>
                                <p class="emg-bar-subtitle">Active Case Review</p>
                                <h3 class="emg-bar-title" id="emg-case-title">Case #1 — Localization</h3>
                            </div>
                        </div>
                        <div class="emg-bar-right">
                            <div class="emg-stat-chip">Accuracy<span class="emg-stat-value" id="emg-stat-accuracy">—</span></div>
                            <div class="emg-stat-chip">Score<span class="emg-stat-value" id="emg-stat-score">0 / 0</span></div>
                        </div>
                    </div>

                    <div class="emg-case-grid">
                        <div class="emg-findings-card">
                            <div class="emg-findings-head abnormal">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                                Abnormal Findings
                                <span class="emg-findings-count" id="emg-abnormal-count">0</span>
                            </div>
                            <div class="emg-findings-body" id="challenge-abnormal-muscles"></div>
                        </div>

                        <div class="emg-findings-card">
                            <div class="emg-findings-head normal">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Normal Findings
                                <span class="emg-findings-count" id="emg-normal-count">0</span>
                            </div>
                            <div class="emg-findings-body" id="challenge-normal-muscles"></div>
                        </div>
                    </div>

                    <div class="emg-question-card">
                        <div class="emg-question-head">Diagnostic Impression</div>
                        <div class="emg-question-prompt" id="challenge-question-text">
                            Where is the most likely location of the lesion?
                        </div>
                        <div class="emg-answer-grid" id="challenge-answer-options"></div>
                    </div>

                    <div class="emg-controls">
                        <button id="challenge-back-btn" class="emg-btn-ghost" data-action="emgChallenge:backToSettings">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            Back to Setup
                        </button>
                        <button id="challenge-submit-btn" class="emg-btn-primary" data-action="emgChallenge:submitAnswer" disabled>
                            Submit Diagnosis
                        </button>
                        <button id="challenge-next-btn" class="emg-btn-primary emg-btn-next" data-action="emgChallenge:nextCase" style="display:none;">
                            Next Case
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>

                    <div id="challenge-feedback" style="display:none;"></div>
                </div>
            </div>
        `;

        if (showModal) {
            showModal('Clinical Case Challenge', emgChallengeContent, true);
        } else {
            logger.error('showModal is not defined');
        }
    }

    toggleQuestionType(type) {
        this.activeQuestionTypes[type] = !this.activeQuestionTypes[type];
        const toggleElement = document.querySelector(`.emg-toggle-card[data-type="${type}"]`);
        if (toggleElement) {
            toggleElement.classList.toggle('active', this.activeQuestionTypes[type]);
        }
    }

    startChallenge() {
        this.isActive = true;
        this.score = { correct: 0, total: 0 };
        this.caseNumber = 0;
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');
        if (settingsPanel) settingsPanel.style.display = 'none';
        if (activePanel) activePanel.style.display = 'block';
        this.updateScoreboard();
        this.generateCase();
    }

    generateCase() {
        const availableLesions = this.getAvailableLesions();
        if (availableLesions.length === 0) {
            alert('No lesion types selected! Please enable at least one.');
            this.backToSettings();
            return;
        }

        this.caseNumber++;

        const randomIndex = Math.floor(Math.random() * availableLesions.length);
        const correctLesion = availableLesions[randomIndex];
        const lesionData = this.getLesionData(correctLesion);

        const abnormalMuscles = this.selectRandomMuscles(lesionData.muscles, 4);
        const normalMuscles = this.selectNormalMuscles(lesionData.muscles, lesionData.region, 4);
        const answerOptions = this.generateAnswerOptions(correctLesion, lesionData);

        this.currentCase = {
            correctLesion: correctLesion,
            abnormalMuscles: abnormalMuscles,
            normalMuscles: normalMuscles,
            answerOptions: answerOptions,
            region: lesionData.region
        };

        this.selectedAnswer = null;
        this.displayCase();
    }

    getAvailableLesions() {
        const lesions = [];
        const regions = this.currentSettings.region === 'mixed' ? ['UE', 'LE'] :
            this.currentSettings.region === 'upper' ? ['UE'] : ['LE'];

        regions.forEach(region => {
            Object.entries(this.lesionSites[region]).forEach(([name, data]) => {
                if (this.activeQuestionTypes[data.type]) {
                    lesions.push(name);
                }
            });
        });

        return lesions;
    }

    getLesionData(lesionName) {
        if (this.lesionSites.UE[lesionName]) {
            return { ...this.lesionSites.UE[lesionName], region: 'UE' };
        } else if (this.lesionSites.LE[lesionName]) {
            return { ...this.lesionSites.LE[lesionName], region: 'LE' };
        }
        return null;
    }

    selectRandomMuscles(muscleArray, count) {
        const shuffled = shuffle(muscleArray);
        return shuffled.slice(0, Math.min(count, muscleArray.length));
    }

    selectNormalMuscles(abnormalMuscles, region, count) {
        const allMuscles = Object.keys(this.muscles).filter(muscle => {
            return this.muscles[muscle].region === region;
        });
        const normalMuscles = allMuscles.filter(muscle => !abnormalMuscles.includes(muscle));
        return this.selectRandomMuscles(normalMuscles, count);
    }

    generateAnswerOptions(correctLesion, correctLesionData) {
        const options = [correctLesion];
        const region = correctLesionData.region;
        const correctType = correctLesionData.type;
        const sameLesions = Object.keys(this.lesionSites[region]).filter(name => name !== correctLesion);

        const sameTypeLesions = sameLesions.filter(name => this.lesionSites[region][name].type === correctType);
        const shuffledSameType = shuffle(sameTypeLesions);
        shuffledSameType.slice(0, 3).forEach(lesion => options.push(lesion));

        if (options.length < 4) {
            const differentTypeLesions = sameLesions.filter(name =>
                this.lesionSites[region][name].type !== correctType &&
                !options.includes(name)
            );
            const shuffledDifferent = shuffle(differentTypeLesions);
            shuffledDifferent.slice(0, 4 - options.length).forEach(lesion => options.push(lesion));
        }
        return shuffle(options);
    }

    displayCase() {
        const { abnormalMuscles, normalMuscles, answerOptions } = this.currentCase;

        // Case title
        const caseTitle = document.getElementById('emg-case-title');
        if (caseTitle) caseTitle.textContent = `Case #${this.caseNumber} — Localization`;

        // Abnormal muscles as chips
        const abnormalList = document.getElementById('challenge-abnormal-muscles');
        if (abnormalList) {
            abnormalList.innerHTML = abnormalMuscles
                .map(m => `<span class="emg-muscle-chip abnormal">${m}</span>`)
                .join('');
        }
        const abnormalCount = document.getElementById('emg-abnormal-count');
        if (abnormalCount) abnormalCount.textContent = abnormalMuscles.length;

        // Normal muscles as chips
        const normalList = document.getElementById('challenge-normal-muscles');
        if (normalList) {
            normalList.innerHTML = normalMuscles
                .map(m => `<span class="emg-muscle-chip normal">${m}</span>`)
                .join('');
        }
        const normalCount = document.getElementById('emg-normal-count');
        if (normalCount) normalCount.textContent = normalMuscles.length;

        // Answer buttons with letter badges (A, B, C, D)
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const optionsContainer = document.getElementById('challenge-answer-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = answerOptions.map((option, i) => `
                <button class="emg-answer-btn" data-action="emgChallenge:selectAnswer" data-answer="${option.replace(/"/g, '&quot;')}">
                    <span class="emg-answer-letter">${letters[i] || (i + 1)}</span>
                    <span>${option}</span>
                </button>
            `).join('');
        }

        // Reset button states
        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');
        const feedbackDiv = document.getElementById('challenge-feedback');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.display = 'inline-flex';
        }
        if (nextBtn) nextBtn.style.display = 'none';
        if (feedbackDiv) {
            feedbackDiv.style.display = 'none';
            feedbackDiv.innerHTML = '';
        }
    }

    selectAnswer(lesion) {
        this.selectedAnswer = lesion;
        document.querySelectorAll('.emg-answer-btn').forEach(btn => {
            const answer = btn.getAttribute('data-answer');
            btn.classList.toggle('selected', answer === lesion);
        });
        const submitBtn = document.getElementById('challenge-submit-btn');
        if (submitBtn) submitBtn.disabled = false;
    }

    submitAnswer() {
        if (!this.selectedAnswer) return;

        const correct = this.selectedAnswer === this.currentCase.correctLesion;
        this.score.total++;
        if (correct) this.score.correct++;
        this.updateScoreboard();

        const feedbackDiv = document.getElementById('challenge-feedback');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'block';
            const iconCorrect = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            const iconWrong = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

            const abnormalSpan = this.currentCase.abnormalMuscles.map(m => `<span class="emg-mention-red">${m}</span>`).join(', ');
            const normalSpan = this.currentCase.normalMuscles.map(m => `<span class="emg-mention-green">${m}</span>`).join(', ');
            const accuracyPct = Math.round((this.score.correct / this.score.total) * 100);

            feedbackDiv.innerHTML = `
                <div class="emg-feedback-card">
                    <div class="emg-feedback-head ${correct ? 'correct' : 'wrong'}">
                        <span class="emg-feedback-icon">${correct ? iconCorrect : iconWrong}</span>
                        ${correct ? 'Diagnosis Correct' : 'Diagnosis Incorrect'}
                    </div>
                    <div class="emg-feedback-body">
                        <div class="emg-feedback-row">
                            <span class="emg-feedback-label">Your Answer</span>
                            <span class="emg-feedback-value">${this.selectedAnswer}</span>
                        </div>
                        <div class="emg-feedback-row">
                            <span class="emg-feedback-label">Correct Answer</span>
                            <span class="emg-feedback-value">${this.currentCase.correctLesion}</span>
                        </div>
                        <div class="emg-feedback-explanation">
                            The pattern of abnormality in ${abnormalSpan}, sparing ${normalSpan},
                            localizes to a <strong>${this.currentCase.correctLesion}</strong> lesion.
                        </div>
                        <div class="emg-score-inline">
                            Session Score: ${this.score.correct} / ${this.score.total} (${accuracyPct}%)
                        </div>
                    </div>
                </div>
            `;
        }

        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');
        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'inline-flex';

        // Highlight correct / wrong answers
        document.querySelectorAll('.emg-answer-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('selected');
            const answer = btn.getAttribute('data-answer');
            if (answer === this.currentCase.correctLesion) {
                btn.classList.add('correct');
            } else if (answer === this.selectedAnswer) {
                btn.classList.add('wrong');
            }
        });
    }

    updateScoreboard() {
        const scoreEl = document.getElementById('emg-stat-score');
        const accuracyEl = document.getElementById('emg-stat-accuracy');
        if (scoreEl) scoreEl.textContent = `${this.score.correct} / ${this.score.total}`;
        if (accuracyEl) {
            if (this.score.total === 0) {
                accuracyEl.textContent = '—';
            } else {
                accuracyEl.textContent = `${Math.round((this.score.correct / this.score.total) * 100)}%`;
            }
        }
    }

    nextCase() {
        this.generateCase();
    }

    backToSettings() {
        this.isActive = false;
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');
        if (settingsPanel) settingsPanel.style.display = 'block';
        if (activePanel) activePanel.style.display = 'none';
    }
}
