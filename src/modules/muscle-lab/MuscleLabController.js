
import { MuscleDatabase, LesionSites } from './MuscleData.js';

export class MuscleLabController {
    constructor() {
        this.currentTab = 'cards';
        this.currentRegion = 'lower';
        this.currentAnatomyType = 'nerve';
        this.inlineQuizActive = false;
        this.quizMode = 'multiple'; // 'type' or 'multiple'
        this.selectedQuizAnswer = null;
        this.currentQuestionAnatomyType = null; // Store anatomy type for current question
        this.currentQuestionMuscle = null; // Store muscle for current question
        this.quizContentTypes = ['nerve', 'roots', 'cord', 'actions']; // What anatomy types to test
        this.quizRegion = 'both'; // 'upper', 'lower', or 'both'

        // Test Data State
        this.testData = {
            questionsAnswered: 0,
            correctAnswers: 0,
            missedQuestions: [],
            usedMuscles: new Set(),
            isActive: false
        };

        // Data Source
        this.muscleDatabase = MuscleDatabase;
    }

    // ==========================================
    // INITIALIZATION & RENDER
    // ==========================================

    launch() {
        console.log('🧬 Launching Advanced Muscle Study Lab...');

        // Inject CSS if not present
        if (!document.getElementById('muscle-lab-css')) {
            const link = document.createElement('link');
            link.id = 'muscle-lab-css';
            link.rel = 'stylesheet';
            link.href = 'src/css/muscle-lab.css';
            document.head.appendChild(link);
        }

        const muscleLabContent = `
        <div class="muscle-lab-hero">
            <button class="hero-back-btn" onclick="window.backToMuscleMenu()">← Menu</button>
            <div class="hero-content">
                <h2 class="hero-title">Advanced Muscle Localization Training</h2>
                <p class="hero-subtitle">Interactive quiz system with nerve roots, innervation patterns, and clinical correlation</p>
                <div class="hero-stats">
                    <div class="stat-card">
                        <div class="stat-number">71</div>
                        <div class="stat-label">Muscles</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">∞</div>
                        <div class="stat-label">Questions</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">📈</div>
                        <div class="stat-label">Adaptive</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="muscle-lab-tabs">
            <button class="muscle-tab active" data-tab="cards" onclick="MuscleAnatomy.switchTab('cards')">
                📚 Study Cards
            </button>
            <button class="muscle-tab" data-tab="quiz" onclick="MuscleAnatomy.switchTab('quiz')">
                🧪 Interactive Quiz
            </button>
        </div>

        <!-- CARDS TAB CONTENT -->
        <div id="cards-tab-content" class="tab-content active">
            <!-- Extremity Selection for Cards -->
            <div class="cards-controls-section">
                <h4>Select Extremity</h4>
                <div class="extremity-toggle-buttons">
                    <button class="region-btn active" data-region="lower" onclick="MuscleAnatomy.switchAnatomy('lower')">
                        🦵 Lower Extremity
                    </button>
                    <button class="region-btn" data-region="upper" onclick="MuscleAnatomy.switchAnatomy('upper')">
                        💪 Upper Extremity
                    </button>
                </div>
            </div>

            <!-- Global Reveal Controls -->
            <div class="global-reveal-controls">
                <div class="global-reveal-buttons">
                    <button class="global-reveal-btn reveal-all" onclick="MuscleAnatomy.globalRevealAll()" title="Show/Hide All Details">
                        📖 Reveal All
                    </button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('nerve')" title="Show/Hide All Nerve Information">
                        🔌 All Nerves
                    </button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('roots')" title="Show/Hide All Nerve Roots">
                        🌿 All Roots
                    </button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('cord')" title="Show/Hide All Cord/Trunk Information">
                        🕸️ All Cords/Trunks
                    </button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('actions')" title="Show/Hide All Muscle Actions">
                        💪 All Actions
                    </button>
                </div>
            </div>

            <!-- Muscle Cards Display -->
            <div id="muscle-anatomy-display" class="muscle-anatomy-display-enhanced">
                <!-- Muscles will be displayed here -->
            </div>
        </div>

        <!-- QUIZ TAB CONTENT -->
        <div id="quiz-tab-content" class="tab-content" style="display: none;">
            <div class="quiz-config-panel">

                <!-- Quiz Content Filter -->
                <div class="quiz-section-block">
                    <h4>📋 What to Test</h4>
                    <div class="quiz-content-checkboxes">
                        <label class="checkbox-label">
                            <input type="checkbox" id="quiz-nerve" checked onchange="MuscleAnatomy.updateQuizContent()">
                            <span>Nerve</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="quiz-roots" checked onchange="MuscleAnatomy.updateQuizContent()">
                            <span>Roots</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="quiz-cord" checked onchange="MuscleAnatomy.updateQuizContent()">
                            <span>Cord/Trunk</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="quiz-actions" checked onchange="MuscleAnatomy.updateQuizContent()">
                            <span>Actions</span>
                        </label>
                    </div>
                    <button class="test-all-toggle-btn" onclick="MuscleAnatomy.toggleAllQuizContent()">
                        ✓ Test All
                    </button>
                </div>

                <!-- Extremity Selection for Quiz -->
                <div class="quiz-section-block">
                    <h4>🦴 Which Muscles</h4>
                    <div class="quiz-extremity-radios">
                        <label class="radio-label">
                            <input type="radio" name="quiz-region" value="upper" onchange="MuscleAnatomy.updateQuizRegion()">
                            <span>💪 Upper Extremity</span>
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="quiz-region" value="lower" onchange="MuscleAnatomy.updateQuizRegion()">
                            <span>🦵 Lower Extremity</span>
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="quiz-region" value="both" checked onchange="MuscleAnatomy.updateQuizRegion()">
                            <span>🎯 Both Extremities</span>
                        </label>
                    </div>
                </div>

                <!-- Answer Format -->
                <div class="quiz-section-block">
                    <h4>✏️ Answer Format</h4>
                    <div class="quiz-mode-buttons">
                        <button class="mode-toggle-btn" data-mode="type" onclick="MuscleAnatomy.setQuizMode('type')">
                            Type Answer
                        </button>
                        <button class="mode-toggle-btn active" data-mode="multiple" onclick="MuscleAnatomy.setQuizMode('multiple')">
                            Multiple Choice
                        </button>
                    </div>
                </div>

                <!-- Start/Stop Buttons -->
                <div class="quiz-action-section">
                    <button class="quiz-start-btn" onclick="MuscleAnatomy.startInlineQuiz()">
                        ▶️ Start Quiz
                    </button>
                    <button class="quiz-stop-btn" onclick="MuscleAnatomy.stopInlineQuiz()" style="display: none;">
                        ⏹️ Stop Quiz
                    </button>
                </div>
            </div>

            <!-- Quiz Display Area -->
            <div id="inline-quiz-area" class="inline-quiz-area" style="display: none;">
                <!-- Quiz content will be populated here -->
            </div>
        </div>


        <!-- Muscle Test Modal -->
        <div id="muscle-test-modal" class="muscle-test-modal" style="display: none;">
            <div class="muscle-test-content">
                <div class="muscle-test-header">
                    <div class="test-title">
                        <h3>🧪 Continuous Muscle Anatomy Quiz</h3>
                        <div class="test-stats">
                            <span id="questions-answered">Questions: 0</span>
                            <span id="current-accuracy">Accuracy: 0%</span>
                        </div>
                    </div>
                    <button class="close-test-btn" onclick="MuscleAnatomy.stopMuscleTest()">✕ Stop Quiz</button>
                </div>

                <div class="muscle-test-body" id="muscle-test-body">
                    <div class="test-question">
                        <h4 id="question-text">Loading question...</h4>
                        <div id="answer-choices" class="answer-choices">
                            <!-- Multiple choice options will be populated here -->
                        </div>
                    </div>

                    <div id="answer-feedback" class="answer-feedback" style="display: none;">
                        <div class="feedback-content">
                            <div id="feedback-result"></div>
                            <div id="feedback-explanation"></div>
                        </div>
                        <button id="next-question-btn" class="next-question-btn" onclick="MuscleAnatomy.nextQuestion()">Next Question →</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        if (window.showModal) {
            window.showModal('🧬 Advanced Muscle Study Lab', muscleLabContent);
        } else {
            console.error('Core functionality missing: window.showModal not found');
            // Fallback: Inject into main content area if showModal is missing (should verify this assumption)
            const mainContent = document.getElementById('main-content-area');
            if (mainContent) mainContent.innerHTML = muscleLabContent;
        }

        // Initialize display after DOM injection
        setTimeout(() => {
            this.initializeDisplay();
        }, 100);
    }

    initializeDisplay() {
        this.displayMuscles('lower');
    }

    switchTab(tab) {
        this.currentTab = tab;

        // Update tab buttons
        document.querySelectorAll('.muscle-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-tab="${tab}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Show/hide tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });
        const activeContent = document.getElementById(`${tab}-tab-content`);
        if (activeContent) {
            activeContent.style.display = 'block';
            activeContent.classList.add('active');
        }
    }

    updateQuizContent() {
        this.quizContentTypes = [];
        if (document.getElementById('quiz-nerve')?.checked) this.quizContentTypes.push('nerve');
        if (document.getElementById('quiz-roots')?.checked) this.quizContentTypes.push('roots');
        if (document.getElementById('quiz-cord')?.checked) this.quizContentTypes.push('cord');
        if (document.getElementById('quiz-actions')?.checked) this.quizContentTypes.push('actions');

        // Ensure at least one is selected
        if (this.quizContentTypes.length === 0) {
            this.quizContentTypes = ['nerve'];
            document.getElementById('quiz-nerve').checked = true;
        }
    }

    toggleAllQuizContent() {
        const allChecked = this.quizContentTypes.length === 4;
        const newState = !allChecked;

        ['quiz-nerve', 'quiz-roots', 'quiz-cord', 'quiz-actions'].forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = newState;
            }
        });

        this.updateQuizContent();

        // Update button text
        const btn = event?.target;
        if (btn) {
            btn.textContent = newState ? '✓ Test All' : '☐ Test All';
        }
    }

    updateQuizRegion() {
        const selected = document.querySelector('input[name="quiz-region"]:checked');
        this.quizRegion = selected ? selected.value : 'both';
    }

    switchAnatomy(region) {
        this.currentRegion = region;
        this.displayMuscles(region);

        // Update button states
        document.querySelectorAll('.region-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-region="${region}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    displayMuscles(region) {
        const display = document.getElementById('muscle-anatomy-display');
        console.log('🧬 displayMuscles called with region:', region);
        if (!display) {
            console.error('❌ muscle-anatomy-display element not found!');
            return;
        }

        const muscles = Object.entries(this.muscleDatabase).filter(([name, data]) =>
            data.region === (region === 'upper' ? 'UE' : 'LE')
        );
        console.log('🧬 Filtered muscles for region', region, ':', muscles.length);

        const regionName = region === 'upper' ? 'Upper Extremity' : 'Lower Extremity';
        const regionEmoji = region === 'upper' ? '💪' : '🦵';

        let html = `
            <div class="muscle-region">
                <h3>${regionEmoji} ${regionName} Muscles</h3>
                <div class="muscle-grid">
        `;

        muscles.forEach(([muscleName, muscleData]) => {
            html += `
                <div class="muscle-card-interactive" data-muscle="${muscleName}">
                    <div class="muscle-header">
                        <h4 class="muscle-name">${muscleName}</h4>
                    </div>

                    <div class="muscle-controls">
                        <button class="muscle-btn nerve" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'nerve')" title="Show Nerve Supply">
                            Nerve
                        </button>
                        <button class="muscle-btn roots" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'roots')" title="Show Nerve Roots">
                            Roots
                        </button>
                        <button class="muscle-btn cord" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'cord')" title="Show Cord/Trunk">
                            Cord/Trunk
                        </button>
                        <button class="muscle-btn actions" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'actions')" title="Show Actions">
                            Actions
                        </button>
                        <button class="muscle-btn show-all" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'all')" title="Show All Details">
                            Show All
                        </button>
                    </div>

                    <div class="muscle-detail nerve-detail" data-type="nerve" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Nerve Supply</span>
                        </div>
                        <div class="detail-content">${muscleData.peripheralNerve}</div>
                    </div>

                    <div class="muscle-detail roots-detail" data-type="roots" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Nerve Roots</span>
                        </div>
                        <div class="detail-content">${muscleData.roots.join(', ')}</div>
                    </div>

                    <div class="muscle-detail cord-detail" data-type="cord" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Cord/Trunk</span>
                        </div>
                        <div class="detail-content">${muscleData.cord || 'Not applicable'}</div>
                    </div>

                    <div class="muscle-detail actions-detail" data-type="actions" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Primary Actions</span>
                        </div>
                        <div class="detail-content">${muscleData.actions}</div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        display.innerHTML = html;
    }

    toggleDetail(muscleName, type) {
        const card = Array.from(document.querySelectorAll('[data-muscle]')).find(el => el.dataset.muscle === muscleName);
        if (!card) return;

        if (type === 'all') {
            const details = card.querySelectorAll('.muscle-detail');
            const buttons = card.querySelectorAll('.muscle-btn:not(.show-all)');
            const showAllBtn = card.querySelector('.muscle-btn.show-all');
            const isAllShown = Array.from(details).every(detail => detail.style.display === 'block');

            details.forEach(detail => {
                detail.style.display = isAllShown ? 'none' : 'block';
            });

            buttons.forEach(btn => {
                if (isAllShown) {
                    btn.classList.remove('active');
                } else {
                    btn.classList.add('active');
                }
            });

            if (showAllBtn) {
                showAllBtn.textContent = isAllShown ? 'Show All' : 'Hide All';
                showAllBtn.classList.toggle('active');
            }
        } else {
            const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
            const button = card.querySelector(`.muscle-btn.${type}`);

            if (detail && button) {
                const isVisible = detail.style.display === 'block';
                detail.style.display = isVisible ? 'none' : 'block';
                button.classList.toggle('active');
            }
        }

        const visibleDetails = card.querySelectorAll('.muscle-detail[style*="display: block"]');
        if (visibleDetails.length > 0) {
            card.classList.add('expanded');
        } else {
            card.classList.remove('expanded');
        }
    }

    setAnatomyType(type) {
        this.currentAnatomyType = type;

        document.querySelectorAll('.anatomy-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-anatomy="${type}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        this.displayMuscles(this.currentRegion);
    }

    setQuizMode(mode) {
        this.quizMode = mode;

        document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    startInlineQuiz() {
        this.inlineQuizActive = true;

        document.getElementById('inline-quiz-area').style.display = 'block';
        document.querySelector('.quiz-start-btn').style.display = 'none';
        document.querySelector('.quiz-stop-btn').style.display = 'block';

        this.generateInlineQuestion();
    }

    stopInlineQuiz() {
        this.inlineQuizActive = false;

        document.getElementById('inline-quiz-area').style.display = 'none';
        document.querySelector('.quiz-start-btn').style.display = 'block';
        document.querySelector('.quiz-stop-btn').style.display = 'none';
    }

    generateInlineQuestion() {
        // Filter muscles by selected region
        let muscleEntries = Object.entries(this.muscleDatabase);

        if (this.quizRegion === 'upper') {
            muscleEntries = muscleEntries.filter(([name, data]) => data.region === 'UE');
        } else if (this.quizRegion === 'lower') {
            muscleEntries = muscleEntries.filter(([name, data]) => data.region === 'LE');
        }
        // if 'both', use all muscles

        // Pick random muscle
        const [muscle, muscleData] = muscleEntries[Math.floor(Math.random() * muscleEntries.length)];

        // Pick random anatomy type from selected content types
        // FIX: Filter out 'cord' for Lower Extremity muscles as they don't have brachial plexus cords
        let validTypes = [...this.quizContentTypes];
        if (muscleData.region === 'LE') {
            validTypes = validTypes.filter(t => t !== 'cord');
        }

        // Safety check: if no valid types remain (e.g. user only selected 'cord' for LE), default to nerve
        if (validTypes.length === 0) {
            validTypes = ['nerve'];
        }

        const anatomyType = validTypes[Math.floor(Math.random() * validTypes.length)];

        // Store question context for checking answer later
        this.currentQuestionAnatomyType = anatomyType;
        this.currentQuestionMuscle = muscle;

        // Temporarily set currentAnatomyType for question generation
        const previousAnatomyType = this.currentAnatomyType;
        this.currentAnatomyType = anatomyType;

        const quizArea = document.getElementById('inline-quiz-area');

        if (this.quizMode === 'type') {
            quizArea.innerHTML = `
                <div class="quiz-question">
                    <h4>What is the ${this.getAnatomyLabel()} of ${muscle}?</h4>
                    <div class="quiz-answer-input">
                        <input type="text" id="quiz-answer" placeholder="Enter your answer..." />
                        <button onclick="MuscleAnatomy.checkInlineAnswer()" class="check-answer-btn">Check Answer</button>
                    </div>
                    <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
                </div>
            `;

            setTimeout(() => {
                document.getElementById('quiz-answer').focus();
            }, 100);

        } else {
            const correctAnswer = this.getCorrectAnswer(muscle);
            const options = this.generateQuizOptions(muscle, correctAnswer);

            quizArea.innerHTML = `
                <div class="quiz-question">
                    <h4>What is the ${this.getAnatomyLabel()} of ${muscle}?</h4>
                    <div class="quiz-options">
                        ${options.map((option, index) => `
                            <div class="quiz-option" onclick="MuscleAnatomy.selectQuizOption('${option}')">
                                <input type="radio" name="quiz-choice" id="option-${index}" value="${option}">
                                <label for="option-${index}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                    <button onclick="MuscleAnatomy.checkInlineAnswer()" class="check-answer-btn" disabled id="check-multiple-btn">Check Answer</button>
                    <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
                </div>
            `;
        }

        // Restore previous anatomy type (for card display)
        this.currentAnatomyType = previousAnatomyType;
    }

    getCorrectAnswer(muscle) {
        const muscleData = this.muscleDatabase[muscle];
        switch (this.currentAnatomyType) {
            case 'nerve':
                return muscleData.peripheralNerve;
            case 'roots':
                return muscleData.roots.join(', ');
            case 'cord':
                return muscleData.cord || 'Not applicable';
            case 'actions':
                return muscleData.actions;
            default:
                return muscleData.peripheralNerve;
        }
    }

    generateQuizOptions(muscle, correctAnswer) {
        // Filter muscles to only include those from the same region (UE or LE) as the question muscle
        const muscleRegion = this.muscleDatabase[muscle].region;
        const allMuscles = Object.keys(this.muscleDatabase)
            .filter(muscleName => this.muscleDatabase[muscleName].region === muscleRegion);
        const distractors = [];

        while (distractors.length < 3) {
            const randomMuscle = allMuscles[Math.floor(Math.random() * allMuscles.length)];
            if (randomMuscle !== muscle) {
                // Must handle context switching for random muscle too if needed, but getCorrectAnswer uses this.currentAnatomyType
                // which is currently set to the question type in generateInlineQuestion
                const distractorAnswer = this.getCorrectAnswer(randomMuscle);
                if (!distractors.includes(distractorAnswer) && distractorAnswer !== correctAnswer) {
                    distractors.push(distractorAnswer);
                }
            }
        }

        const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
        return options;
    }

    selectQuizOption(answer) {
        document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        event.target.closest('.quiz-option').classList.add('selected');

        this.selectedQuizAnswer = answer;
        const checkBtn = document.getElementById('check-multiple-btn');
        if (checkBtn) checkBtn.disabled = false;
    }

    getAnatomyLabel() {
        switch (this.currentAnatomyType) {
            case 'nerve': return 'peripheral nerve';
            case 'roots': return 'nerve roots';
            case 'cord': return 'brachial plexus cord/trunk';
            case 'actions': return 'primary actions';
            default: return 'nerve supply';
        }
    }

    checkInlineAnswer() {
        // Use stored question context
        const muscle = this.currentQuestionMuscle;
        const previousAnatomyType = this.currentAnatomyType;
        this.currentAnatomyType = this.currentQuestionAnatomyType;

        const correctAnswer = this.getCorrectAnswer(muscle);

        // Restore anatomy type
        this.currentAnatomyType = previousAnatomyType;

        const feedbackEl = document.getElementById('quiz-feedback');
        let userAnswer, isCorrect;

        if (this.quizMode === 'type') {
            userAnswer = document.getElementById('quiz-answer').value.trim();
            isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase().split(' ')[0]);
        } else {
            userAnswer = this.selectedQuizAnswer || 'No answer selected';
            isCorrect = userAnswer === correctAnswer;
        }

        feedbackEl.innerHTML = `
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                <p><strong>Correct answer:</strong> ${correctAnswer}</p>
                <button onclick="MuscleAnatomy.generateInlineQuestion()" class="next-question-btn">Next Question</button>
            </div>
        `;
        feedbackEl.style.display = 'block';

        this.selectedQuizAnswer = null;
    }

    startMuscleTest() {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.testData.questionsAnswered = 0;
        this.testData.correctAnswers = 0;
        this.testData.missedQuestions = [];
        this.testData.usedMuscles = new Set();
        this.testData.isActive = true;

        const modal = document.getElementById('muscle-test-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.getElementById('muscle-test-body').style.display = 'block';
            document.getElementById('answer-feedback').style.display = 'none';

            this.updateTestStats();
            this.generateNextQuestion();
        }
    }

    stopMuscleTest() {
        this.testData.isActive = false;
        const modal = document.getElementById('muscle-test-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    generateNextQuestion() {
        if (!this.testData.isActive) return;

        const muscles = Object.keys(this.muscleDatabase);
        let muscle;

        const availableMuscles = muscles.filter(m => !this.testData.usedMuscles.has(m));
        if (availableMuscles.length === 0) {
            this.testData.usedMuscles.clear();
            muscle = muscles[Math.floor(Math.random() * muscles.length)];
        } else {
            muscle = availableMuscles[Math.floor(Math.random() * availableMuscles.length)];
        }

        this.testData.usedMuscles.add(muscle);

        // Randomize question type for the test mode? Or use default?
        // Original code used this.getCorrectAnswer(muscle) which uses this.currentAnatomyType.
        // Assuming test mode wants to vary types or use what's selected?
        // For consistency with inline quiz logic, we should probably set a random type here too or use current.
        // The original code didn't seem to set type in generateNextQuestion, so it might use whatever was last set.
        // Let's force a random type for the "Test" to make it robust.
        const types = ['nerve', 'roots', 'cord', 'actions'];
        // Filter cord for LE
        const muscleData = this.muscleDatabase[muscle];
        let validTypes = [...types];
        if (muscleData.region === 'LE') validTypes = validTypes.filter(t => t !== 'cord');

        const randomType = validTypes[Math.floor(Math.random() * validTypes.length)];
        const prevType = this.currentAnatomyType;
        this.currentAnatomyType = randomType;

        const correctAnswer = this.getCorrectAnswer(muscle);
        const options = this.generateQuizOptions(muscle, correctAnswer);
        const label = this.getAnatomyLabel();

        // Restore type
        this.currentAnatomyType = prevType;

        document.getElementById('question-text').textContent = `What is the ${label} of ${muscle}?`;

        const choicesDiv = document.getElementById('answer-choices');
        choicesDiv.innerHTML = options.map((option, index) => `
            <div class="quiz-option" onclick="MuscleAnatomy.submitTestAnswer('${option.replace(/'/g, "\\'")}', '${correctAnswer.replace(/'/g, "\\'")}', '${muscle.replace(/'/g, "\\'")}')">
                <input type="radio" name="test-choice" id="test-option-${index}" value="${option}">
                <label for="test-option-${index}">${option}</label>
            </div>
        `).join('');

        document.getElementById('answer-feedback').style.display = 'none';
    }

    submitTestAnswer(userAnswer, correctAnswer, muscle) {
        const isCorrect = userAnswer === correctAnswer;

        this.testData.questionsAnswered++;
        if (isCorrect) {
            this.testData.correctAnswers++;
        } else {
            this.testData.missedQuestions.push({
                muscle: muscle,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            });
        }

        const feedbackDiv = document.getElementById('answer-feedback');
        feedbackDiv.innerHTML = `
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                <p><strong>Correct answer:</strong> ${correctAnswer}</p>
            </div>
        `;
        feedbackDiv.style.display = 'block';

        this.updateTestStats();
    }

    nextQuestion() {
        this.generateNextQuestion();
    }

    updateTestStats() {
        const questionsElem = document.getElementById('questions-answered');
        const accuracyElem = document.getElementById('current-accuracy');

        if (questionsElem) questionsElem.textContent = `Questions: ${this.testData.questionsAnswered}`;

        if (accuracyElem) {
            const accuracy = this.testData.questionsAnswered > 0 ?
                Math.round((this.testData.correctAnswers / this.testData.questionsAnswered) * 100) : 0;
            accuracyElem.textContent = `Accuracy: ${accuracy}%`;
        }
    }

    // Global reveal functions
    globalRevealAll() {
        const allCards = document.querySelectorAll('.muscle-card-interactive');
        const revealAllBtn = document.querySelector('.global-reveal-btn.reveal-all');

        if (allCards.length === 0) return;

        // Check if any details are currently visible
        const anyVisible = Array.from(allCards).some(card =>
            card.querySelectorAll('.muscle-detail[style*="display: block"]').length > 0
        );

        // Toggle all details
        allCards.forEach(card => {
            const details = card.querySelectorAll('.muscle-detail');
            const buttons = card.querySelectorAll('.muscle-btn:not(.show-all)');
            const showAllBtn = card.querySelector('.muscle-btn.show-all');

            details.forEach(detail => {
                detail.style.display = anyVisible ? 'none' : 'block';
            });

            buttons.forEach(btn => {
                if (anyVisible) {
                    btn.classList.remove('active');
                } else {
                    btn.classList.add('active');
                }
            });

            if (showAllBtn) {
                showAllBtn.textContent = anyVisible ? 'Show All' : 'Hide All';
                showAllBtn.classList.toggle('active', !anyVisible);
            }

            if (!anyVisible) {
                card.classList.add('expanded');
            } else {
                card.classList.remove('expanded');
            }
        });

        // Update button state
        if (revealAllBtn) {
            revealAllBtn.classList.toggle('active', !anyVisible);
            revealAllBtn.textContent = anyVisible ? '📖 Reveal All' : '📖 Hide All';
        }

        console.log('🔍 Global reveal all:', !anyVisible ? 'shown' : 'hidden');
    }

    globalRevealType(type) {
        const allCards = document.querySelectorAll('.muscle-card-interactive');
        const typeBtn = document.querySelector(`[onclick="MuscleAnatomy.globalRevealType('${type}')"]`);

        if (allCards.length === 0) return;

        // Check if this type is currently visible on any card
        const anyTypeVisible = Array.from(allCards).some(card =>
            card.querySelector(`.muscle-detail[data-type="${type}"][style*="display: block"]`)
        );

        // Toggle this specific type across all cards
        allCards.forEach(card => {
            const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
            const button = card.querySelector(`.muscle-btn.${type}`);

            if (detail && button) {
                detail.style.display = anyTypeVisible ? 'none' : 'block';
                button.classList.toggle('active', !anyTypeVisible);
            }

            // Update card expansion state
            const visibleDetails = card.querySelectorAll('.muscle-detail[style*="display: block"]');
            if (visibleDetails.length > 0) {
                card.classList.add('expanded');
            } else {
                card.classList.remove('expanded');
            }
        });

        // Update button state
        if (typeBtn) typeBtn.classList.toggle('active', !anyTypeVisible);

        // Update button text based on type
        const buttonTexts = {
            nerve: anyTypeVisible ? '🔌 All Nerves' : '🔌 Hide Nerves',
            roots: anyTypeVisible ? '🌿 All Roots' : '🌿 Hide Roots',
            cord: anyTypeVisible ? '🕸️ All Cords/Trunks' : '🕸️ Hide Cords/Trunks',
            actions: anyTypeVisible ? '💪 All Actions' : '💪 Hide Actions'
        };

        if (typeBtn) typeBtn.textContent = buttonTexts[type];

        console.log(`🔍 Global reveal ${type}: `, !anyTypeVisible ? 'shown' : 'hidden');
    }
}
