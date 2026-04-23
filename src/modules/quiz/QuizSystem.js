import logger from '../../utils/Logger.js';

/**
 * QuizSystem — Polished, unified "Test Your Knowledge" renderer.
 *
 * Features:
 *   - No emojis. SVG iconography and typographic accents only.
 *   - Animated progress bar that tracks answered questions.
 *   - Per-question "stem" (clinical vignette) support with proper clinical card styling.
 *   - Inline explanation reveal with smooth height transitions.
 *   - "Review incorrect" and "Restart" controls on completion.
 *   - Scoped CSS so quiz instances never bleed visually into each other.
 *   - Responsive layout that holds up from 320px to desktop.
 */

let _quizInstanceCounter = 0;

const SVG = {
    check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    brain: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>',
    chevron: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    restart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>',
    review: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    trophy: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>'
};

export class QuizSystem {
    constructor() {
        // Per-instance state, keyed by quiz DOM id
        this._state = new Map();

        this.checkQuizAnswer = this.checkQuizAnswer.bind(this);
        this.nextQuizQuestion = this.nextQuizQuestion.bind(this);
    }

    init() {
        logger.log('Quiz System Initialized');

        // Legacy globals (some content still calls via window)
        window.generateModuleQuiz = (questions, options) => this.generateModuleQuiz(questions, options);
        window.checkQuizAnswer = this.checkQuizAnswer;
        window.nextQuizQuestion = this.nextQuizQuestion;

        // Inject scoped stylesheet once
        if (!document.getElementById('quiz-system-styles')) {
            const style = document.createElement('style');
            style.id = 'quiz-system-styles';
            style.textContent = this._styles();
            document.head.appendChild(style);
        }

        if (!window._registerAction) return;

        window._registerAction('checkQuizAnswer', (el) => {
            const quizEl = el.closest('[data-quiz-id]');
            if (!quizEl) return;
            const quizId = quizEl.dataset.quizId;
            const index = parseInt(el.dataset.index, 10);
            const optIndex = parseInt(el.dataset.opt, 10);
            this.checkQuizAnswer(quizId, index, optIndex, el);
        });

        window._registerAction('nextQuizQuestion', (el) => {
            const quizEl = el.closest('[data-quiz-id]');
            if (!quizEl) return;
            this.nextQuizQuestion(quizEl.dataset.quizId);
        });

        window._registerAction('restartQuiz', (el) => {
            const quizEl = el.closest('[data-quiz-id]');
            if (!quizEl) return;
            this.restartQuiz(quizEl.dataset.quizId);
        });

        window._registerAction('reviewIncorrect', (el) => {
            const quizEl = el.closest('[data-quiz-id]');
            if (!quizEl) return;
            this.reviewIncorrect(quizEl.dataset.quizId);
        });
    }

    /**
     * Generate a quiz block.
     * @param {Array} questions  Each: { question, options, correct, explanation, stem? }
     * @param {Object} [options]
     * @param {string} [options.title="Test Your Knowledge"]
     * @param {string} [options.subtitle]
     */
    generateModuleQuiz(questions, options = {}) {
        if (!questions || questions.length === 0) return '';

        const quizId = `quiz-${++_quizInstanceCounter}`;
        const title = options.title || 'Test Your Knowledge';
        const subtitle = options.subtitle || `${questions.length} question${questions.length === 1 ? '' : 's'} to reinforce your learning`;

        this._state.set(quizId, {
            questions,
            current: 0,
            answers: new Array(questions.length).fill(null), // store chosen option index
            correctCount: 0,
            answered: new Array(questions.length).fill(false)
        });

        const questionsHTML = questions.map((q, qi) => this._renderQuestion(q, qi, questions.length)).join('');

        return `
            <section class="qz-root" data-quiz-id="${quizId}" aria-label="${title}">
                <header class="qz-header">
                    <div class="qz-header-icon">${SVG.brain}</div>
                    <div class="qz-header-copy">
                        <h3 class="qz-title">${title}</h3>
                        <p class="qz-subtitle">${subtitle}</p>
                    </div>
                    <div class="qz-score" aria-live="polite">
                        <span class="qz-score-current">0</span>
                        <span class="qz-score-sep">/</span>
                        <span class="qz-score-total">${questions.length}</span>
                    </div>
                </header>

                <div class="qz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="0">
                    <div class="qz-progress-bar" style="width: 0%"></div>
                    <div class="qz-progress-steps">
                        ${questions.map((_, i) => `<span class="qz-step" data-step="${i}" title="Question ${i + 1}"></span>`).join('')}
                    </div>
                </div>

                <div class="qz-stage">
                    ${questionsHTML}
                </div>

                <div class="qz-complete" data-state="hidden">
                    <div class="qz-complete-icon">${SVG.trophy}</div>
                    <h3 class="qz-complete-title">Quiz Complete</h3>
                    <p class="qz-complete-score">You scored <strong class="qz-final-score">0</strong> out of <strong>${questions.length}</strong></p>
                    <div class="qz-complete-meta"></div>
                    <div class="qz-complete-actions">
                        <button class="qz-btn qz-btn-secondary" data-action="reviewIncorrect">
                            ${SVG.review}<span>Review Answers</span>
                        </button>
                        <button class="qz-btn qz-btn-primary" data-action="restartQuiz">
                            ${SVG.restart}<span>Restart Quiz</span>
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    _renderQuestion(q, qi, total) {
        const stem = q.stem
            ? `<div class="qz-stem"><div class="qz-stem-label">Clinical Vignette</div><p class="qz-stem-text">${q.stem}</p></div>`
            : '';

        const optionsHTML = q.options.map((opt, oi) => `
            <button type="button"
                    class="qz-option"
                    data-action="checkQuizAnswer"
                    data-index="${qi}"
                    data-opt="${oi}">
                <span class="qz-option-letter">${String.fromCharCode(65 + oi)}</span>
                <span class="qz-option-text">${opt}</span>
                <span class="qz-option-status" aria-hidden="true"></span>
            </button>
        `).join('');

        return `
            <article class="qz-question" data-q-index="${qi}" data-state="${qi === 0 ? 'active' : 'hidden'}">
                <div class="qz-question-meta">
                    <span class="qz-question-chip">Question ${qi + 1} of ${total}</span>
                </div>
                ${stem}
                <p class="qz-prompt">${q.question}</p>
                <div class="qz-options" role="radiogroup">
                    ${optionsHTML}
                </div>
                <div class="qz-feedback" data-state="hidden">
                    <div class="qz-feedback-title"></div>
                    <div class="qz-feedback-body"></div>
                </div>
                <div class="qz-actions">
                    <button class="qz-btn qz-btn-primary qz-next" data-action="nextQuizQuestion" data-state="hidden">
                        <span>${qi === total - 1 ? 'View Results' : 'Next Question'}</span>${SVG.chevron}
                    </button>
                </div>
            </article>
        `;
    }

    checkQuizAnswer(quizId, qIndex, optIndex, buttonEl) {
        const state = this._state.get(quizId);
        if (!state) return;
        if (state.answered[qIndex]) return; // lock after first answer

        const q = state.questions[qIndex];
        const isCorrect = optIndex === q.correct;
        state.answers[qIndex] = optIndex;
        state.answered[qIndex] = true;
        if (isCorrect) state.correctCount += 1;

        const quizEl = document.querySelector(`[data-quiz-id="${quizId}"]`);
        if (!quizEl) return;
        const questionEl = quizEl.querySelector(`.qz-question[data-q-index="${qIndex}"]`);
        if (!questionEl) return;

        // Lock all options
        questionEl.querySelectorAll('.qz-option').forEach(btn => {
            btn.classList.add('qz-locked');
            btn.disabled = true;
        });

        // Mark chosen + correct
        const options = questionEl.querySelectorAll('.qz-option');
        options[optIndex].classList.add(isCorrect ? 'qz-correct' : 'qz-incorrect');
        options[optIndex].querySelector('.qz-option-status').innerHTML = isCorrect ? SVG.check : SVG.x;
        if (!isCorrect) {
            options[q.correct].classList.add('qz-correct-reveal');
            options[q.correct].querySelector('.qz-option-status').innerHTML = SVG.check;
        }

        // Feedback panel
        const feedback = questionEl.querySelector('.qz-feedback');
        feedback.classList.remove('qz-feedback-correct', 'qz-feedback-incorrect');
        feedback.classList.add(isCorrect ? 'qz-feedback-correct' : 'qz-feedback-incorrect');
        feedback.querySelector('.qz-feedback-title').innerHTML = isCorrect
            ? `${SVG.check}<span>Correct</span>`
            : `${SVG.x}<span>Not quite</span>`;
        feedback.querySelector('.qz-feedback-body').textContent = q.explanation || '';
        feedback.dataset.state = 'visible';

        // Reveal next button
        const nextBtn = questionEl.querySelector('.qz-next');
        if (nextBtn) nextBtn.dataset.state = 'visible';

        // Update score + progress chip
        const scoreCurrent = quizEl.querySelector('.qz-score-current');
        if (scoreCurrent) scoreCurrent.textContent = state.correctCount;

        const chip = quizEl.querySelector(`.qz-step[data-step="${qIndex}"]`);
        if (chip) {
            chip.classList.add(isCorrect ? 'qz-step-correct' : 'qz-step-incorrect');
        }

        // Smooth scroll so explanation is visible
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    nextQuizQuestion(quizId) {
        const state = this._state.get(quizId);
        if (!state) return;

        const quizEl = document.querySelector(`[data-quiz-id="${quizId}"]`);
        if (!quizEl) return;

        const currentIndex = state.current;
        const currentEl = quizEl.querySelector(`.qz-question[data-q-index="${currentIndex}"]`);
        if (!currentEl) return;

        // Update progress bar
        const answeredCount = state.answered.filter(Boolean).length;
        const progressPct = (answeredCount / state.questions.length) * 100;
        const bar = quizEl.querySelector('.qz-progress-bar');
        if (bar) bar.style.width = `${progressPct}%`;
        const progressRoot = quizEl.querySelector('.qz-progress');
        if (progressRoot) progressRoot.setAttribute('aria-valuenow', answeredCount);

        if (currentIndex === state.questions.length - 1) {
            // Show completion view
            currentEl.dataset.state = 'hidden';
            const complete = quizEl.querySelector('.qz-complete');
            if (complete) {
                const score = state.correctCount;
                const total = state.questions.length;
                const pct = Math.round((score / total) * 100);
                const meta = this._scoreMessage(pct);
                complete.querySelector('.qz-final-score').textContent = score;
                const metaEl = complete.querySelector('.qz-complete-meta');
                metaEl.innerHTML = `<span class="qz-pct qz-pct-${meta.tier}">${pct}%</span><span class="qz-meta-text">${meta.label}</span>`;
                complete.dataset.state = 'visible';
                complete.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Advance
        currentEl.dataset.state = 'hidden';
        state.current = currentIndex + 1;
        const nextEl = quizEl.querySelector(`.qz-question[data-q-index="${state.current}"]`);
        if (nextEl) {
            nextEl.dataset.state = 'active';
            nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    restartQuiz(quizId) {
        const state = this._state.get(quizId);
        if (!state) return;
        state.current = 0;
        state.correctCount = 0;
        state.answers.fill(null);
        state.answered.fill(false);

        const quizEl = document.querySelector(`[data-quiz-id="${quizId}"]`);
        if (!quizEl) return;

        quizEl.querySelector('.qz-score-current').textContent = '0';
        const bar = quizEl.querySelector('.qz-progress-bar');
        if (bar) bar.style.width = '0%';
        quizEl.querySelectorAll('.qz-step').forEach(s => {
            s.classList.remove('qz-step-correct', 'qz-step-incorrect');
        });
        quizEl.querySelector('.qz-complete').dataset.state = 'hidden';

        quizEl.querySelectorAll('.qz-question').forEach((qEl, i) => {
            qEl.dataset.state = i === 0 ? 'active' : 'hidden';
            qEl.querySelectorAll('.qz-option').forEach(btn => {
                btn.classList.remove('qz-correct', 'qz-incorrect', 'qz-correct-reveal', 'qz-locked');
                btn.disabled = false;
                const st = btn.querySelector('.qz-option-status');
                if (st) st.innerHTML = '';
            });
            const fb = qEl.querySelector('.qz-feedback');
            fb.dataset.state = 'hidden';
            fb.classList.remove('qz-feedback-correct', 'qz-feedback-incorrect');
            fb.querySelector('.qz-feedback-title').innerHTML = '';
            fb.querySelector('.qz-feedback-body').textContent = '';
            const nb = qEl.querySelector('.qz-next');
            if (nb) nb.dataset.state = 'hidden';
        });

        quizEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    reviewIncorrect(quizId) {
        const state = this._state.get(quizId);
        if (!state) return;
        const quizEl = document.querySelector(`[data-quiz-id="${quizId}"]`);
        if (!quizEl) return;

        const firstIncorrect = state.answers.findIndex((ans, i) => ans !== null && ans !== state.questions[i].correct);

        if (firstIncorrect === -1) {
            // Everything correct — just scroll to first question in review mode
            quizEl.querySelectorAll('.qz-question').forEach((qEl, i) => {
                qEl.dataset.state = i === 0 ? 'active' : 'hidden';
            });
        } else {
            quizEl.querySelectorAll('.qz-question').forEach((qEl, i) => {
                qEl.dataset.state = i === firstIncorrect ? 'active' : 'hidden';
            });
        }
        quizEl.querySelector('.qz-complete').dataset.state = 'hidden';

        // Hide "Next" buttons since we're in review; hide the complete card
        quizEl.querySelectorAll('.qz-next').forEach(nb => nb.dataset.state = 'hidden');

        const active = quizEl.querySelector('.qz-question[data-state="active"]');
        if (active) active.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    _scoreMessage(pct) {
        if (pct >= 90) return { tier: 'gold', label: 'Outstanding. Board-ready command of the material.' };
        if (pct >= 75) return { tier: 'green', label: 'Strong performance. A few concepts to sharpen.' };
        if (pct >= 60) return { tier: 'amber', label: 'Solid foundation. Review the missed items.' };
        return { tier: 'red', label: 'Keep at it. Re-read the material and try again.' };
    }

    _styles() {
        return `
            .qz-root {
                margin-top: 40px;
                padding: 0;
                border-radius: 20px;
                overflow: hidden;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.15), 0 2px 6px -2px rgba(15, 23, 42, 0.08);
                font-family: inherit;
                position: relative;
            }

            /* Header */
            .qz-header {
                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                gap: 18px;
                padding: 22px 28px;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0d9488 160%);
                color: #f8fafc;
                position: relative;
            }
            .qz-header::after {
                content: "";
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 85% -40%, rgba(20, 184, 166, 0.35), transparent 55%);
                pointer-events: none;
            }
            .qz-header-icon {
                width: 44px;
                height: 44px;
                border-radius: 12px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #5eead4;
                backdrop-filter: blur(4px);
            }
            .qz-header-copy { min-width: 0; }
            .qz-title {
                margin: 0;
                font-size: 1.25em;
                font-weight: 700;
                letter-spacing: -0.01em;
                color: #ffffff;
            }
            .qz-subtitle {
                margin: 2px 0 0 0;
                font-size: 0.85em;
                color: rgba(226, 232, 240, 0.75);
                font-weight: 500;
            }
            .qz-score {
                font-variant-numeric: tabular-nums;
                font-weight: 700;
                font-size: 1.1em;
                padding: 8px 14px;
                border-radius: 999px;
                background: rgba(20, 184, 166, 0.18);
                border: 1px solid rgba(94, 234, 212, 0.35);
                color: #5eead4;
                white-space: nowrap;
                z-index: 1;
            }
            .qz-score-current { color: #ffffff; }
            .qz-score-sep { opacity: 0.5; margin: 0 2px; }

            /* Progress */
            .qz-progress {
                position: relative;
                height: 6px;
                background: #f1f5f9;
                border-bottom: 1px solid #e2e8f0;
            }
            .qz-progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #14b8a6, #0d9488);
                transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 0 4px 4px 0;
            }
            .qz-progress-steps {
                position: absolute;
                inset: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 8px;
                pointer-events: none;
            }
            .qz-step {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #ffffff;
                border: 2px solid #cbd5e1;
                transition: all 0.3s;
            }
            .qz-step-correct {
                background: #10b981;
                border-color: #059669;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
            }
            .qz-step-incorrect {
                background: #ef4444;
                border-color: #dc2626;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
            }

            /* Stage */
            .qz-stage { padding: 28px; }

            /* Question */
            .qz-question { animation: qzFadeSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
            .qz-question[data-state="hidden"] { display: none; }
            @keyframes qzFadeSlide {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .qz-question-meta { margin-bottom: 14px; }
            .qz-question-chip {
                display: inline-block;
                padding: 5px 12px;
                font-size: 0.72em;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: #0f766e;
                background: #ccfbf1;
                border: 1px solid #99f6e4;
                border-radius: 999px;
            }

            .qz-stem {
                background: #f8fafc;
                border-left: 4px solid #0d9488;
                border-radius: 0 12px 12px 0;
                padding: 16px 20px;
                margin-bottom: 18px;
            }
            .qz-stem-label {
                font-size: 0.7em;
                font-weight: 800;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: #0f766e;
                margin-bottom: 6px;
            }
            .qz-stem-text {
                margin: 0;
                color: #334155;
                line-height: 1.65;
                font-size: 0.97em;
            }

            .qz-prompt {
                font-size: 1.12em;
                font-weight: 600;
                line-height: 1.5;
                color: #0f172a;
                margin: 0 0 18px 0;
            }

            /* Options */
            .qz-options {
                display: grid;
                gap: 10px;
                margin-bottom: 18px;
            }
            .qz-option {
                display: grid;
                grid-template-columns: 32px 1fr 24px;
                align-items: center;
                gap: 14px;
                width: 100%;
                padding: 14px 18px;
                background: #ffffff;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                cursor: pointer;
                text-align: left;
                font-size: 0.98em;
                font-family: inherit;
                color: #1e293b;
                line-height: 1.5;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                min-height: 56px;
            }
            .qz-option:hover:not(.qz-locked) {
                background: #f0fdfa;
                border-color: #5eead4;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px -2px rgba(13, 148, 136, 0.2);
            }
            .qz-option:focus-visible {
                outline: 2px solid #0d9488;
                outline-offset: 2px;
            }
            .qz-option-letter {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                border-radius: 8px;
                background: #f1f5f9;
                color: #475569;
                font-weight: 700;
                font-size: 0.85em;
                transition: all 0.2s;
            }
            .qz-option:hover:not(.qz-locked) .qz-option-letter {
                background: #5eead4;
                color: #0f172a;
            }
            .qz-option-text { flex: 1; }
            .qz-option-status {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
            }

            .qz-option.qz-locked { cursor: default; }
            .qz-option.qz-correct {
                background: linear-gradient(135deg, #ecfdf5, #d1fae5);
                border-color: #10b981;
                color: #065f46;
                font-weight: 600;
            }
            .qz-option.qz-correct .qz-option-letter {
                background: #10b981;
                color: #ffffff;
            }
            .qz-option.qz-correct .qz-option-status { color: #10b981; }

            .qz-option.qz-incorrect {
                background: linear-gradient(135deg, #fef2f2, #fee2e2);
                border-color: #ef4444;
                color: #7f1d1d;
                font-weight: 600;
            }
            .qz-option.qz-incorrect .qz-option-letter {
                background: #ef4444;
                color: #ffffff;
            }
            .qz-option.qz-incorrect .qz-option-status { color: #ef4444; }

            .qz-option.qz-correct-reveal {
                background: #ecfdf5;
                border-color: #34d399;
                border-style: dashed;
                color: #065f46;
            }
            .qz-option.qz-correct-reveal .qz-option-letter {
                background: #34d399;
                color: #065f46;
            }
            .qz-option.qz-correct-reveal .qz-option-status { color: #10b981; }

            .qz-option.qz-locked:not(.qz-correct):not(.qz-incorrect):not(.qz-correct-reveal) {
                opacity: 0.5;
            }

            /* Feedback */
            .qz-feedback {
                border-radius: 12px;
                padding: 0 18px;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease, padding 0.3s ease, margin 0.3s ease;
                margin-bottom: 0;
            }
            .qz-feedback[data-state="visible"] {
                max-height: 400px;
                padding: 16px 18px;
                margin-bottom: 18px;
            }
            .qz-feedback-correct {
                background: #ecfdf5;
                border: 1px solid #a7f3d0;
                border-left: 4px solid #10b981;
            }
            .qz-feedback-incorrect {
                background: #fef2f2;
                border: 1px solid #fecaca;
                border-left: 4px solid #ef4444;
            }
            .qz-feedback-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 700;
                font-size: 0.95em;
                margin-bottom: 8px;
            }
            .qz-feedback-correct .qz-feedback-title { color: #065f46; }
            .qz-feedback-incorrect .qz-feedback-title { color: #7f1d1d; }
            .qz-feedback-body {
                color: #334155;
                font-size: 0.92em;
                line-height: 1.65;
            }

            /* Actions */
            .qz-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
            .qz-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 11px 20px;
                border-radius: 10px;
                border: none;
                font-family: inherit;
                font-size: 0.93em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .qz-btn-primary {
                background: linear-gradient(135deg, #0d9488, #0f766e);
                color: #ffffff;
                box-shadow: 0 2px 6px -1px rgba(13, 148, 136, 0.4);
            }
            .qz-btn-primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 14px -2px rgba(13, 148, 136, 0.45);
            }
            .qz-btn-secondary {
                background: #f1f5f9;
                color: #334155;
                border: 1px solid #e2e8f0;
            }
            .qz-btn-secondary:hover {
                background: #e2e8f0;
                color: #0f172a;
            }
            .qz-next { display: inline-flex; }
            .qz-next[data-state="hidden"] { display: none; }

            /* Complete */
            .qz-complete {
                padding: 40px 28px;
                text-align: center;
                background: linear-gradient(180deg, #ecfdf5, #ffffff);
                border-top: 1px solid #d1fae5;
                animation: qzFadeSlide 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .qz-complete[data-state="hidden"] { display: none; }
            .qz-complete-icon {
                width: 64px;
                height: 64px;
                margin: 0 auto 16px auto;
                border-radius: 50%;
                background: #ffffff;
                border: 2px solid #10b981;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #10b981;
                box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.1);
            }
            .qz-complete-title {
                margin: 0 0 8px 0;
                color: #065f46;
                font-size: 1.5em;
                font-weight: 700;
            }
            .qz-complete-score {
                margin: 0 0 14px 0;
                color: #047857;
                font-size: 1.05em;
            }
            .qz-complete-score strong { color: #064e3b; }

            .qz-complete-meta {
                display: inline-flex;
                align-items: center;
                gap: 12px;
                padding: 10px 18px;
                background: #ffffff;
                border-radius: 999px;
                border: 1px solid #d1fae5;
                margin-bottom: 22px;
                font-size: 0.9em;
                color: #334155;
            }
            .qz-pct {
                font-weight: 800;
                font-size: 1.1em;
            }
            .qz-pct-gold { color: #b45309; }
            .qz-pct-green { color: #059669; }
            .qz-pct-amber { color: #d97706; }
            .qz-pct-red { color: #dc2626; }

            .qz-complete-actions {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }

            /* Small screens */
            @media (max-width: 600px) {
                .qz-header { padding: 18px 20px; gap: 12px; }
                .qz-header-icon { width: 38px; height: 38px; }
                .qz-title { font-size: 1.1em; }
                .qz-stage { padding: 22px 18px; }
                .qz-option { grid-template-columns: 26px 1fr 20px; padding: 12px 14px; font-size: 0.93em; }
                .qz-option-letter { width: 24px; height: 24px; font-size: 0.78em; }
                .qz-complete { padding: 32px 20px; }
            }
        `;
    }
}
