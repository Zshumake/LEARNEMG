
export class Plexus {
    constructor() {
        this.currentRegion = 'brachial';
        this.currentQuiz = null;

        // Bind methods for onclick events
        this.startQuiz = this.startQuiz.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
        this.showInteractiveAnatomy = this.showInteractiveAnatomy.bind(this);
    }

    startQuiz(pgyLevel) {
        // Initialize plexus quiz with appropriate difficulty
        const quizData = this.createQuizData(pgyLevel);
        this.showQuizModal(quizData, pgyLevel);
        console.log(`Plexus quiz started for: ${pgyLevel} `);
    }

    createQuizData(pgyLevel) {
        const allQuestions = [
            {
                id: 1,
                difficulty: 'pgy2',
                plexus: 'brachial',
                question: "Identify the nerve roots that form the upper trunk of the brachial plexus:",
                type: 'multiple_choice',
                options: ["C5-C6", "C7", "C8-T1", "C5-C7"],
                correct: 0,
                explanation: "The upper trunk is formed by nerve roots C5 and C6. This is the most commonly injured trunk in brachial plexus injuries (Erb's palsy)."
            },
            {
                id: 2,
                difficulty: 'pgy2',
                plexus: 'brachial',
                question: "Which nerve comes directly from the medial cord?",
                type: 'multiple_choice',
                options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Axillary nerve"],
                correct: 1,
                explanation: "The ulnar nerve arises directly from the medial cord (C8-T1). The median nerve has contributions from both medial and lateral cords."
            },
            {
                id: 3,
                difficulty: 'pgy2',
                plexus: 'lumbosacral',
                question: "Which nerve root is most commonly affected in L5 radiculopathy?",
                type: 'multiple_choice',
                options: ["L4", "L5", "S1", "L3"],
                correct: 1,
                explanation: "L5 radiculopathy typically affects the L5 nerve root, commonly due to L4-L5 disc herniation or L5-S1 disc affecting the traversing L5 root."
            },
            {
                id: 4,
                difficulty: 'pgy3',
                plexus: 'brachial',
                question: "In the visual diagram, identify which structure represents the posterior cord:",
                type: 'visual_identification',
                options: ["A", "B", "C", "D"],
                correct: 2,
                explanation: "The posterior cord (C) is formed by the posterior divisions of all three trunks and gives rise to the radial and axillary nerves."
            },
            {
                id: 5,
                difficulty: 'pgy3',
                plexus: 'brachial',
                question: "What is the most common entrapment site for the ulnar nerve?",
                type: 'multiple_choice',
                options: ["Guyon's canal", "Cubital tunnel", "Axilla", "Carpal tunnel"],
                correct: 1,
                explanation: "The cubital tunnel at the elbow is the most common site for ulnar nerve entrapment, more frequent than Guyon's canal at the wrist."
            },
            {
                id: 6,
                difficulty: 'pgy4',
                plexus: 'lumbosacral',
                question: "Which muscles would be affected in a complete L5 root lesion?",
                type: 'multiple_choice',
                options: [
                    "Only tibialis anterior",
                    "Tibialis anterior and extensor digitorum longus",
                    "Tibialis anterior, EHL, EDL, and gluteus medius",
                    "All dorsiflexors and plantarflexors"
                ],
                correct: 2,
                explanation: "Complete L5 root lesion affects tibialis anterior, extensor hallucis longus, extensor digitorum longus, and gluteus medius, causing foot drop and Trendelenburg gait."
            }
        ];

        // Filter questions based on PGY level
        const pgyLevels = {
            'pgy2': ['pgy2'],
            'pgy3': ['pgy2', 'pgy3'],
            'pgy4': ['pgy2', 'pgy3', 'pgy4']
        };

        const allowedDifficulties = pgyLevels[pgyLevel] || ['pgy2'];
        const filteredQuestions = allQuestions.filter(q => allowedDifficulties.includes(q.difficulty));

        // Shuffle and select 4 questions
        const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(4, shuffled.length));
    }

    showQuizModal(questions, pgyLevel) {
        const content = `
    < div class="plexus-quiz-container" >
                <div class="quiz-header">
                    <div class="quiz-progress">
                        <span id="plexus-question-counter">Question 1 of ${questions.length}</span>
                        <div class="progress-bar">
                            <div id="plexus-progress-fill" style="width: ${(1 / questions.length) * 100}%"></div>
                        </div>
                    </div>
                    <div class="quiz-score">Score: <span id="plexus-score">0</span>/${questions.length}</div>
                </div>
                
                <div id="plexus-question-container">
                    <!-- Question content will be populated here -->
                </div>
                
                <div class="quiz-controls">
                    <button id="plexus-submit" class="quiz-button primary" style="display:none;" onclick="window.appComponents.plexus.submitAnswer()">Submit Answer</button>
                    <button id="plexus-next" class="quiz-button primary" style="display:none;" onclick="window.appComponents.plexus.nextQuestion()">Next Question</button>
                    <button id="plexus-finish" class="quiz-button success" style="display:none;" onclick="window.appComponents.plexus.finishQuiz()">View Results</button>
                </div>
            </div >

    <style>
        .plexus-quiz-container {font - family: Arial, sans-serif; }
        .plexus-diagram {max - width: 100%; height: auto; border: 2px solid #e0e7e9; border-radius: 8px; margin: 15px 0; background: white; }
        .diagram-container {text - align: center; margin: 20px 0; }
        .plexus-badge {display: inline-block; background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.8em; font-weight: 600; margin-bottom: 15px; }
        .visual-options {display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px; }
        .visual-option {padding: 10px; background: #f8f9fa; border: 2px solid transparent; border-radius: 8px; cursor: pointer; text-align: center; font-weight: bold; transition: all 0.2s ease; }
        .visual-option:hover {background: #e9ecef; border-color: #6b9f78; }
        .visual-option.selected {background: #d1ecf1; border-color: #3498db; }
        .visual-option.correct {background: #d4edda; border-color: #28a745; color: #155724; }
        .visual-option.incorrect {background: #f8d7da; border-color: #dc3545; color: #721c24; }
    </style>
`;

        if (window.showModal) {
            window.showModal('🧠 Plexus Anatomy Challenge', content);
        } else {
            console.error("ViewHelpers not loaded: showModal missing");
        }

        // Store quiz data in instance state
        this.currentQuiz = {
            questions: questions,
            currentQuestion: 0,
            score: 0,
            answers: [],
            pgyLevel: pgyLevel
        };

        this.displayQuestion();
    }

    displayQuestion() {
        if (!this.currentQuiz) return;

        const quiz = this.currentQuiz;
        const question = quiz.questions[quiz.currentQuestion];

        const questionContainer = document.getElementById('plexus-question-container');
        if (!questionContainer) return;

        let questionHTML = `
    < div class="quiz-question" >
                <div class="plexus-badge">${question.plexus.toUpperCase()} PLEXUS</div>
                <div class="question-text">${question.question}</div>
`;

        // Add visual diagram for visual identification questions
        if (question.type === 'visual_identification') {
            questionHTML += `
    < div class="diagram-container" >
        ${this.createBrachialPlexusDiagram()}
            </div >
    <div class="visual-options">
        ${question.options.map((option, index) => `
                    <div class="visual-option" data-value="${index}">
                        ${option}
                    </div>
                `).join('')}
    </div>
`;
        } else {
            questionHTML += `
    < ul class="quiz-options" >
        ${question.options.map((option, index) => `
                    <li>
                        <label>
                            <input type="radio" name="plexus-answer" value="${index}">
                            ${option}
                        </label>
                    </li>
                `).join('')
                }
            </ul >
    `;
        }

        questionHTML += `</div > `;
        questionContainer.innerHTML = questionHTML;

        // Update progress
        document.getElementById('plexus-question-counter').textContent = `Question ${quiz.currentQuestion + 1} of ${quiz.questions.length} `;
        document.getElementById('plexus-progress-fill').style.width = `${((quiz.currentQuestion + 1) / quiz.questions.length) * 100}% `;

        // Show submit button
        document.getElementById('plexus-submit').style.display = 'inline-block';
        document.getElementById('plexus-next').style.display = 'none';
        document.getElementById('plexus-finish').style.display = 'none';
        document.getElementById('plexus-submit').disabled = true;

        // Add event listeners (cleaner than inline because of 'this' binding complexity with loops)
        // Actually, for simplicity in generated HTML, we use delegations for buttons, but listeners for selection options.
        if (question.type === 'visual_identification') {
            const visualOptions = document.querySelectorAll('.visual-option');
            visualOptions.forEach(option => {
                option.addEventListener('click', () => {
                    visualOptions.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    option.dataset.selected = 'true';
                    document.getElementById('plexus-submit').disabled = false;
                });
            });
        } else {
            const radioButtons = document.querySelectorAll('input[name="plexus-answer"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', () => {
                    document.getElementById('plexus-submit').disabled = false;
                });
            });
        }
    }

    createBrachialPlexusDiagram() {
        return `
    < svg class="plexus-diagram" viewBox = "0 0 600 400" xmlns = "http://www.w3.org/2000/svg" >
                < !--Background -->
                <rect width="600" height="400" fill="#fafafa" stroke="#ddd" stroke-width="1"/>
                
                <!--Title -->
                <text x="300" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2c3e50">Brachial Plexus - Simplified Diagram</text>
                
                <!--Nerve Roots-- >
                <g stroke="#3498db" stroke-width="3" fill="none">
                    <line x1="50" y1="80" x2="150" y2="120" /> <!-- C5 -->
                    <line x1="50" y1="110" x2="150" y2="120" /> <!-- C6 -->
                    <line x1="50" y1="140" x2="150" y2="180" /> <!-- C7 -->
                    <line x1="50" y1="170" x2="150" y2="240" /> <!-- C8 -->
                    <line x1="50" y1="200" x2="150" y2="240" /> <!-- T1 -->
                </g>
                
                <!--Trunks -->
                <g stroke="#27ae60" stroke-width="4" fill="none">
                    <line x1="150" y1="120" x2="250" y2="140" /> <!-- Upper Trunk -->
                    <line x1="150" y1="180" x2="250" y2="180" /> <!-- Middle Trunk -->
                    <line x1="150" y1="240" x2="250" y2="220" /> <!-- Lower Trunk -->
                </g>
                
                <!--Divisions(simplified) -->
                <g stroke="#f39c12" stroke-width="2" fill="none">
                    <line x1="250" y1="140" x2="350" y2="120" /> <!-- Upper anterior -->
                    <line x1="250" y1="140" x2="350" y2="160" /> <!-- Upper posterior -->
                    <line x1="250" y1="180" x2="350" y2="160" /> <!-- Middle posterior -->
                    <line x1="250" y1="180" x2="350" y2="200" /> <!-- Middle anterior -->
                    <line x1="250" y1="220" x2="350" y2="200" /> <!-- Lower anterior -->
                    <line x1="250" y1="220" x2="350" y2="240" /> <!-- Lower posterior -->
                </g>
                
                <!--Cords -->
                <g stroke="#e74c3c" stroke-width="5" fill="none">
                    <line x1="350" y1="120" x2="450" y2="130" /> <!-- Lateral Cord (A) -->
                    <line x1="350" y1="160" x2="450" y2="180" /> <!-- Posterior Cord (C) -->
                    <line x1="350" y1="200" x2="450" y2="230" /> <!-- Medial Cord (B) -->
                </g>
                
                <!--Terminal Nerves-- >
                <g stroke="#9b59b6" stroke-width="3" fill="none">
                    <line x1="450" y1="130" x2="550" y2="120" /> <!-- From Lateral -->
                    <line x1="450" y1="130" x2="550" y2="150" /> <!-- From Lateral -->
                    <line x1="450" y1="180" x2="550" y2="170" /> <!-- From Posterior -->
                    <line x1="450" y1="180" x2="550" y2="190" /> <!-- From Posterior -->
                    <line x1="450" y1="230" x2="550" y2="220" /> <!-- From Medial -->
                    <line x1="450" y1="230" x2="550" y2="240" /> <!-- From Medial -->
                </g>
                
                <!--Labels -->
                <g font-size="12" text-anchor="middle" fill="#2c3e50">
                    <!-- Roots -->
                    <text x="30" y="85">C5</text>
                    <text x="30" y="115">C6</text>
                    <text x="30" y="145">C7</text>
                    <text x="30" y="175">C8</text>
                    <text x="30" y="205">T1</text>
                    
                    <!-- Trunks -->
                    <text x="200" y="135">Upper</text>
                    <text x="200" y="175">Middle</text>
                    <text x="200" y="215">Lower</text>
                    
                    <!-- Cords with answer labels -->
                    <text x="470" y="125" font-weight="bold" fill="#e74c3c">A</text>
                    <text x="470" y="225" font-weight="bold" fill="#e74c3c">B</text>
                    <text x="470" y="175" font-weight="bold" fill="#e74c3c">C</text>
                    <text x="420" y="175" font-weight="bold" fill="#e74c3c">D</text>
                    
                    <!-- Cord names (smaller) -->
                    <text x="430" y="110" font-size="10">Lateral</text>
                    <text x="430" y="160" font-size="10">Posterior</text>
                    <text x="430" y="210" font-size="10">Medial</text>
                </g>
                
                <!--Legend -->
    <g font-size="10" fill="#666">
        <text x="50" y="350">Legend:</text>
        <line x1="50" y1="365" x2="70" y2="365" stroke="#3498db" stroke-width="3" />
        <text x="75" y="369">Roots</text>
        <line x1="120" y1="365" x2="140" y2="365" stroke="#27ae60" stroke-width="4" />
        <text x="145" y="369">Trunks</text>
        <line x1="190" y1="365" x2="210" y2="365" stroke="#e74c3c" stroke-width="5" />
        <text x="215" y="369">Cords</text>
        <line x1="260" y1="365" x2="280" y2="365" stroke="#9b59b6" stroke-width="3" />
        <text x="285" y="369">Terminal Nerves</text>
    </g>
            </svg >
    `;
    }

    submitAnswer() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        const question = quiz.questions[quiz.currentQuestion];
        let selectedIndex = -1;

        if (question.type === 'visual_identification') {
            const selectedOption = document.querySelector('.visual-option[data-selected="true"]');
            if (!selectedOption) {
                alert('Please select an answer.');
                return;
            }
            selectedIndex = parseInt(selectedOption.dataset.value);
        } else {
            const selectedAnswer = document.querySelector('input[name="plexus-answer"]:checked');
            if (!selectedAnswer) {
                alert('Please select an answer.');
                return;
            }
            selectedIndex = parseInt(selectedAnswer.value);
        }

        const isCorrect = selectedIndex === question.correct;

        // Store answer
        quiz.answers.push({
            questionId: question.id,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            quiz.score++;
            const scoreDisplay = document.getElementById('plexus-score');
            if (scoreDisplay) scoreDisplay.textContent = quiz.score;
        }

        // Show visual feedback
        if (question.type === 'visual_identification') {
            const options = document.querySelectorAll('.visual-option');
            if (options[question.correct]) options[question.correct].classList.add('correct');
            if (!isCorrect && options[selectedIndex]) {
                options[selectedIndex].classList.add('incorrect');
            }
        } else {
            const labels = document.querySelectorAll('.quiz-options label');
            if (labels[question.correct]) labels[question.correct].classList.add('correct');
            if (!isCorrect && labels[selectedIndex]) {
                labels[selectedIndex].classList.add('incorrect');
            }

            // Disable all radio buttons
            const radioButtons = document.querySelectorAll('input[name="plexus-answer"]');
            radioButtons.forEach(radio => radio.disabled = true);
        }

        // Show explanation
        const questionContainer = document.querySelector('.quiz-question');
        if (questionContainer) {
            questionContainer.innerHTML += `
    < div class="quiz-explanation" >
        <strong>Explanation:</strong> ${question.explanation}
                </div >
    `;
        }

        // Show appropriate next button
        document.getElementById('plexus-submit').style.display = 'none';
        if (quiz.currentQuestion < quiz.questions.length - 1) {
            document.getElementById('plexus-next').style.display = 'inline-block';
        } else {
            document.getElementById('plexus-finish').style.display = 'inline-block';
        }
    }

    nextQuestion() {
        if (!this.currentQuiz) return;
        this.currentQuiz.currentQuestion++;
        this.displayQuestion();
    }

    finishQuiz() {
        const quiz = this.currentQuiz;
        if (!quiz) return;

        const percentage = Math.round((quiz.score / quiz.questions.length) * 100);

        let scoreClass, feedback;
        if (percentage >= 75) {
            scoreClass = 'score-excellent';
            feedback = 'Outstanding! You have excellent plexus anatomy knowledge.';
        } else if (percentage >= 50) {
            scoreClass = 'score-good';
            feedback = 'Good foundation! Review missed concepts for improvement.';
        } else {
            scoreClass = 'score-needs-work';
            feedback = 'Focus on studying plexus anatomy basics and nerve pathways.';
        }

        const content = `
    < div class="quiz-final-score" >
                <h3>🧠 Plexus Quiz Complete!</h3>
                <div class="${scoreClass}" style="font-size: 2em; font-weight: bold; margin: 20px 0;">
                    ${quiz.score}/${quiz.questions.length} (${percentage}%)
                </div>
                <p>${feedback}</p>
                
                <div class="modal-features">
                    <h4>📊 Performance Summary:</h4>
                    <ul>
                        <li><strong>Total Questions:</strong> ${quiz.questions.length}</li>
                        <li><strong>Correct Answers:</strong> ${quiz.score}</li>
                        <li><strong>Accuracy:</strong> ${percentage}%</li>
                        <li><strong>Level:</strong> ${quiz.pgyLevel.toUpperCase()}</li>
                    </ul>
                </div>
                
                <p><strong>Continue Learning:</strong> Use the Interactive Plexus Anatomy tab and muscle lab for hands-on practice with nerve pathways and clinical correlations.</p>
            </div >
    `;

        if (window.showModal) {
            window.showModal('🧠 Plexus Anatomy Results', content);
        }
    }

    showInteractiveAnatomy() {
        // Assuming showPlaceholderContent is available globally or we can use ViewHelpers if updated
        if (window.showPlaceholderContent) {
            window.showPlaceholderContent(12, 'interactive-plexus-anatomy');
        } else {
            alert('Interactive Plexus Anatomy is under development.');
        }
    }
}
