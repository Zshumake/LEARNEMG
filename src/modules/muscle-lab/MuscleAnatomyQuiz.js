import { MuscleDatabase } from '../../data/MuscleDatabase.js';
import logger from '../../utils/Logger.js';

export class MuscleAnatomyQuizModule {
    constructor() {
        this.muscleDatabase = MuscleDatabase;
        this.quizMode = 'multiple';
        this.quizContentTypes = ['nerve', 'roots', 'cord', 'actions'];
        this.quizRegion = 'both';
        this.currentQuestionMuscle = null;
        this.currentQuestionAnatomyType = null;
        this.testData = {
            questionsAnswered: 0,
            correctAnswers: 0,
        };

        this.launch = this.launch.bind(this);
        this.updateQuizRegion = this.updateQuizRegion.bind(this);
        this.updateQuizContent = this.updateQuizContent.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
        this.generateQuestion = this.generateQuestion.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);

        this.initGlobalBindings();
    }

    initGlobalBindings() {
        window.MuscleAnatomyQuiz = this;
        window.launchAnatomyQuiz = this.launch;

        // Register with ActionBus
        if (window._registerAction) {
            window._registerAction('muscleQuiz:startQuiz', () => this.startQuiz());
            window._registerAction('muscleQuiz:checkAnswer', (el) => {
                const answer = el.getAttribute('data-answer');
                const idx = parseInt(el.getAttribute('data-idx'), 10);
                this.checkAnswer(answer, idx);
            });
            window._registerAction('muscleQuiz:generateQuestion', () => this.generateQuestion());
            window._registerAction('muscleQuiz:backToSetup', () => {
                document.getElementById('quiz-setup').style.display = 'block';
                document.getElementById('active-quiz-area').style.display = 'none';
            });
        }
    }

    launch() {
        logger.log('Quiz Module Launched...');

        // Reset stats on launch
        this.testData.questionsAnswered = 0;
        this.testData.correctAnswers = 0;

        const content = this.generateUI();

        if (window.showModal) {
            window.showModal('Anatomy Quiz Configuration', content, true);
        } else {
            logger.error("showModal not available");
        }
    }

    generateUI() {
        return `
            <style>
                .quiz-config-panel {
                    background: white;
                    padding: 30px;
                    border-radius: 20px;
                    font-family: 'Inter', sans-serif;
                }
                .config-section {
                    margin-bottom: 25px;
                }
                .config-section h4 {
                    color: #475569;
                    font-size: 1.1em;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .radio-group, .checkbox-group {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                .custom-checkbox {
                    display: block;
                    position: relative;
                    padding-left: 35px;
                    margin-bottom: 12px;
                    cursor: pointer;
                    font-size: 1.1em;
                    color: #1e293b;
                    font-weight: 500;
                    user-select: none;
                }
                .custom-checkbox input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 25px;
                    width: 25px;
                    background-color: #f1f5f9;
                    border: 2px solid #cbd5e1;
                    border-radius: 6px;
                    transition: all 0.2s;
                }
                .custom-checkbox:hover input ~ .checkmark {
                    background-color: #e2e8f0;
                }
                .custom-checkbox input:checked ~ .checkmark {
                    background-color: #10b981;
                    border-color: #10b981;
                }
                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
                .custom-checkbox input:checked ~ .checkmark:after {
                    display: block;
                }
                .custom-checkbox .checkmark:after {
                    left: 9px;
                    top: 5px;
                    width: 5px;
                    height: 10px;
                    border: solid white;
                    border-width: 0 3px 3px 0;
                    transform: rotate(45deg);
                }
                
                .quiz-start-btn {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    width: 100%;
                    padding: 18px;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.25em;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                    transition: all 0.3s ease;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                .quiz-start-btn:hover {
                    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
                    transform: translateY(-2px);
                }
                
                #active-quiz-area {
                    background: #f8fafc;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
                }
            </style>

            <div class="quiz-config-panel" id="quiz-setup">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="width: 70px; height: 70px; background: #ecfdf5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: #10b981;">
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    </div>
                    <h3 style="margin: 0; color: #0f172a; font-size: 1.8em;">Configure Study Quiz</h3>
                    <p style="color: #64748b; margin-top: 5px;">Customize your rapid-fire anatomy review.</p>
                </div>

                <div class="config-section">
                    <h4>Target Extremity</h4>
                    <div class="radio-group">
                        <label class="custom-checkbox">
                            <input type="radio" name="quiz-region" value="upper" onchange="MuscleAnatomyQuiz.updateQuizRegion()">
                            <span class="checkmark" style="border-radius: 50%;"></span>
                            Upper Extremity
                        </label>
                        <label class="custom-checkbox">
                            <input type="radio" name="quiz-region" value="lower" onchange="MuscleAnatomyQuiz.updateQuizRegion()">
                            <span class="checkmark" style="border-radius: 50%;"></span>
                            Lower Extremity
                        </label>
                        <label class="custom-checkbox">
                            <input type="radio" name="quiz-region" value="both" checked onchange="MuscleAnatomyQuiz.updateQuizRegion()">
                            <span class="checkmark" style="border-radius: 50%;"></span>
                            Comprehensive (Both)
                        </label>
                    </div>
                </div>

                <div class="config-section">
                    <h4>Test Topics</h4>
                    <div class="checkbox-group">
                        <label class="custom-checkbox">
                            <input type="checkbox" id="quiz-nerve" checked onchange="MuscleAnatomyQuiz.updateQuizContent()">
                            <span class="checkmark"></span>
                            Peripheral Nerve
                        </label>
                        <label class="custom-checkbox">
                            <input type="checkbox" id="quiz-roots" checked onchange="MuscleAnatomyQuiz.updateQuizContent()">
                            <span class="checkmark"></span>
                            Nerve Roots
                        </label>
                        <label class="custom-checkbox">
                            <input type="checkbox" id="quiz-cord" checked onchange="MuscleAnatomyQuiz.updateQuizContent()">
                            <span class="checkmark"></span>
                            Cord / Trunk
                        </label>
                        <label class="custom-checkbox">
                            <input type="checkbox" id="quiz-actions" checked onchange="MuscleAnatomyQuiz.updateQuizContent()">
                            <span class="checkmark"></span>
                            Muscle Actions
                        </label>
                    </div>
                </div>

                <button data-action="muscleQuiz:startQuiz" class="quiz-start-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Start Quiz Engine
                </button>
            </div>

            <div id="active-quiz-area" style="display: none; padding: 40px;"></div>
        `;
    }

    updateQuizRegion() {
        const checked = document.querySelector('input[name="quiz-region"]:checked');
        if (checked) this.quizRegion = checked.value;
    }

    updateQuizContent() {
        this.quizContentTypes = [];
        ['nerve', 'roots', 'cord', 'actions'].forEach(t => {
            if (document.getElementById(`quiz-${t}`)?.checked) this.quizContentTypes.push(t);
        });
        if (this.quizContentTypes.length === 0) {
            this.quizContentTypes = ['nerve'];
            document.getElementById('quiz-nerve').checked = true;
        }
    }

    startQuiz() {
        document.getElementById('quiz-setup').style.display = 'none';
        document.getElementById('active-quiz-area').style.display = 'block';
        this.generateQuestion();
    }

    generateQuestion() {
        let entries = Object.entries(this.muscleDatabase);
        if (this.quizRegion === 'upper') entries = entries.filter(([_, d]) => d.region === 'UE');
        else if (this.quizRegion === 'lower') entries = entries.filter(([_, d]) => d.region === 'LE');

        const [muscle, data] = entries[Math.floor(Math.random() * entries.length)];

        let types = [...this.quizContentTypes];
        if (data.region === 'LE') types = types.filter(t => t !== 'cord');
        if (types.length === 0) types = ['nerve'];
        const type = types[Math.floor(Math.random() * types.length)];

        this.currentQuestionMuscle = muscle;
        this.currentQuestionAnatomyType = type;

        const correct = this.getCorrectAnswer(muscle, type);
        const options = this.generateOptions(muscle, type, correct);

        const container = document.getElementById('active-quiz-area');

        let statsHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
                <h4 style="margin: 0; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.9em;">Session Progress</h4>
                <div style="display: flex; gap: 20px;">
                    <div style="text-align: right;">
                        <span style="display: block; font-size: 0.8em; color: #94a3b8; text-transform: uppercase;">Correct</span>
                        <strong style="color: #10b981; font-size: 1.2em;">${this.testData.correctAnswers}/${this.testData.questionsAnswered}</strong>
                    </div>
                    <div style="text-align: right;">
                        <span style="display: block; font-size: 0.8em; color: #94a3b8; text-transform: uppercase;">Accuracy</span>
                        <strong style="color: #3b82f6; font-size: 1.2em;">${this.testData.questionsAnswered > 0 ? Math.round((this.testData.correctAnswers / this.testData.questionsAnswered) * 100) : 0}%</strong>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = `
            ${statsHtml}
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #0f172a; font-size: 2em; margin-bottom: 15px;">Identify the <span style="color: #cf2a2c;">${this.getTypeLabel(type)}</span></h2>
                <div style="display: inline-block; background: #e0e7ff; color: #4338ca; padding: 10px 25px; border-radius: 50px; font-weight: 700; font-size: 1.4em; border: 2px solid #c7d2fe;">
                    ${muscle}
                </div>
            </div>
            
            <div id="quiz-feedback" style="display: none; padding: 20px; border-radius: 12px; margin-bottom: 25px; text-align: center; font-weight: 600; font-size: 1.2em;"></div>

            <div id="quiz-options-container" style="display: grid; gap: 15px; grid-template-columns: 1fr;">
                ${options.map((opt, i) => `
                    <button class="quiz-option-btn option-${i}" data-action="muscleQuiz:checkAnswer" data-answer="${opt.replace(/"/g, '&quot;')}" data-idx="${i}"
                    style="padding: 20px; text-align: left; border: 2px solid #e2e8f0; border-radius: 12px; background: white; cursor: pointer; font-size:1.1em; font-weight: 500; color: #334155; transition: all 0.2s ease; display: flex; align-items: center; gap: 15px;">
                        <div style="width: 30px; height: 30px; border-radius: 50%; background: #f1f5f9; color: #64748b; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9em;">${String.fromCharCode(65 + i)}</div>
                        ${opt}
                    </button>
                `).join('')}
            </div>

            <div style="margin-top: 30px; display: flex; justify-content: space-between;">
                <button data-action="muscleQuiz:backToSetup" style="background: transparent; border: 2px solid #e2e8f0; color: #64748b; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
                    Settings
                </button>

                <button data-action="muscleQuiz:generateQuestion" style="background: #f1f5f9; border: none; color: #475569; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
                    Skip Question
                </button>
            </div>
            
            <style>
                .quiz-option-btn:hover:not(.disabled) {
                    border-color: #3b82f6 !important;
                    background: #eff6ff !important;
                    color: #1d4ed8 !important;
                    transform: translateX(5px);
                }
                .quiz-option-btn.disabled {
                    cursor: default;
                    opacity: 0.7;
                }
                .quiz-option-btn.correct {
                    border-color: #10b981 !important;
                    background: #ecfdf5 !important;
                    color: #047857 !important;
                }
                .quiz-option-btn.wrong {
                    border-color: #ef4444 !important;
                    background: #fef2f2 !important;
                    color: #b91c1c !important;
                }
            </style>
        `;
    }

    getTypeLabel(type) {
        const map = { nerve: 'Peripheral Nerve', roots: 'Root Supply', cord: 'Cord/Trunk', actions: 'Action' };
        return map[type] || type;
    }

    getCorrectAnswer(muscle, type) {
        const d = this.muscleDatabase[muscle];
        if (type === 'roots') return d.roots.join(', ');
        if (type === 'peripheral') return d.peripheralNerve;
        if (type === 'nerve') return d.peripheralNerve;
        return d[type] || 'N/A';
    }

    generateOptions(correctMuscle, type, correctAnswer) {
        const region = this.muscleDatabase[correctMuscle].region;
        const allMuscles = Object.entries(this.muscleDatabase).filter(([_, d]) => d.region === region);

        const options = new Set([correctAnswer]);
        while (options.size < 4) {
            const [m, _] = allMuscles[Math.floor(Math.random() * allMuscles.length)];
            const ans = this.getCorrectAnswer(m, type);
            if (ans && ans !== 'N/A') options.add(ans);
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selected, idx) {
        const correct = this.getCorrectAnswer(this.currentQuestionMuscle, this.currentQuestionAnatomyType);
        const isCorrect = selected === correct;

        this.testData.questionsAnswered++;
        if (isCorrect) this.testData.correctAnswers++;

        const btns = document.querySelectorAll('.quiz-option-btn');
        btns.forEach((btn, i) => {
            btn.classList.add('disabled');
            btn.onclick = null; // Remove handlers to prevent double clicks

            // Highlight the selected wrong answer
            if (i === idx && !isCorrect) {
                btn.classList.add('wrong');
            }
            // Always highlight correct answer
            if (btn.innerText.includes(correct)) {
                btn.classList.add('correct');
            }
        });

        const feedback = document.getElementById('quiz-feedback');
        feedback.style.display = 'block';
        if (isCorrect) {
            feedback.style.backgroundColor = '#ecfdf5';
            feedback.style.color = '#059669';
            feedback.style.border = '2px solid #10b981';
            feedback.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Correct!';
            setTimeout(() => this.generateQuestion(), 1500);
        } else {
            feedback.style.backgroundColor = '#fef2f2';
            feedback.style.color = '#dc2626';
            feedback.style.border = '2px solid #ef4444';
            feedback.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> Incorrect.';

            // Add a manual "Next" button since they got it wrong, let them read the correct answer
            setTimeout(() => {
                feedback.innerHTML += `<br><button data-action="muscleQuiz:generateQuestion" style="margin-top: 15px; background: #dc2626; color: white; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Next Question</button>`;
            }, 500);
        }
    }
}

// Export initialization singleton
export const muscleAnatomyQuizModule = new MuscleAnatomyQuizModule();
