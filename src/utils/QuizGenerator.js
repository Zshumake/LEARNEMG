
export function generateModuleQuiz(questions) {
    if (!questions || !questions.length) return '';

    const quizId = 'quiz-' + Math.random().toString(36).substr(2, 9);

    // Serialize questions for the client-side handler
    // We'll wrap the logic in a self-executing function or use event delegation
    const serializedQuestions = JSON.stringify(questions).replace(/"/g, '&quot;');

    let html = `
    <div class="module-quiz-container" id="${quizId}">
        <div class="quiz-header">
            <h3>🧠 Knowledge Check</h3>
            <p>Test your understanding of this module</p>
        </div>
        <div class="quiz-questions">
    `;

    questions.forEach((q, index) => {
        html += `
            <div class="quiz-question" data-index="${index}">
                <p class="question-text"><strong>${index + 1}. ${q.question}</strong></p>
                <div class="options-grid">
        `;

        q.options.forEach((opt, optIndex) => {
            html += `
                <button class="quiz-option" onclick="handleQuizAnswer('${quizId}', ${index}, ${optIndex})">
                    ${opt}
                </button>
            `;
        });

        html += `
                </div>
                <div class="explanation hidden" id="${quizId}-explanation-${index}">
                    <p><strong>${q.correct === 0 || q.correct === 1 || q.correct === 2 || q.correct === 3 ? '' : ''}</strong> ${q.explanation}</p>
                </div>
            </div>
        `;
    });

    html += `
        </div>
        <script>
            // Identify correct answers for this quiz instance
            (function() {
                const quizData = ${JSON.stringify(questions)};
                window.quizData_${quizId.replace(/-/g, '_')} = quizData;
            })();
        </script>
        <div id="quiz-controller-${quizId}" style="display:none;" data-quiz-id="${quizId}"></div>
    </div>
    
    <style>
        .module-quiz-container {
            background: white;
            border-radius: 16px;
            padding: 30px;
            margin-top: 40px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        }
        .quiz-header h3 {
            color: #1e293b;
            margin-top: 0;
            font-size: 1.5rem;
        }
        .quiz-question {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f1f5f9;
        }
        .quiz-question:last-child {
            border-bottom: none;
        }
        .question-text {
            font-size: 1.1rem;
            color: #334155;
            margin-bottom: 15px;
        }
        .options-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }
        @media(min-width: 640px) {
            .options-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
        .quiz-option {
            padding: 12px 16px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.95rem;
            color: #475569;
        }
        .quiz-option:hover {
            border-color: #cbd5e1;
            background: #f1f5f9;
        }
        .quiz-option.correct {
            border-color: #10b981;
            background: #ecfdf5;
            color: #047857;
        }
        .quiz-option.incorrect {
            border-color: #ef4444;
            background: #fef2f2;
            color: #b91c1c;
        }
        .explanation {
            margin-top: 15px;
            padding: 15px;
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            border-radius: 6px;
            font-size: 0.95rem;
            color: #0c4a6e;
        }
        .explanation.hidden {
            display: none;
        }
    </style>
    `;

    return html;
}

// Global handler needed since HTML is injected as string and onclick attributes are used
if (!window.handleQuizAnswer) {
    window.handleQuizAnswer = function (quizId, qIndex, optIndex) {
        const quizVar = `quizData_${quizId.replace(/-/g, '_')}`;
        const questions = window[quizVar];
        if (!questions) return;

        const question = questions[qIndex];
        const isCorrect = question.correct === optIndex;

        const quizContainer = document.getElementById(quizId);
        const questionDiv = quizContainer.querySelector(`.quiz-question[data-index="${qIndex}"]`);
        const options = questionDiv.querySelectorAll('.quiz-option');
        const clickedOption = options[optIndex];

        // Disable all options
        options.forEach(opt => opt.onclick = null);

        if (isCorrect) {
            clickedOption.classList.add('correct');
        } else {
            clickedOption.classList.add('incorrect');
            // Highlight correct answer
            if (options[question.correct]) {
                options[question.correct].classList.add('correct');
            }
        }

        // Show explanation
        const explanation = questionDiv.querySelector('.explanation');
        if (explanation) explanation.classList.remove('hidden');
    };
}
