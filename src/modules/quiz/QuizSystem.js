export class QuizSystem {
    constructor() {
        // Bind methods
        this.checkQuizAnswer = this.checkQuizAnswer.bind(this);
        this.nextQuizQuestion = this.nextQuizQuestion.bind(this);
    }

    init() {
        console.log('📝 Quiz System Initialized');
        // Expose global functions for legacy onclick handlers
        window.generateModuleQuiz = (questions) => this.generateModuleQuiz(questions);
        window.checkQuizAnswer = this.checkQuizAnswer;
        window.nextQuizQuestion = this.nextQuizQuestion;
    }

    generateModuleQuiz(questions) {
        if (!questions || questions.length === 0) return '';

        // Generate HTML for all questions (hidden by default except first)
        const quizHTML = questions.map((q, index) => `
            <div class="quiz-question-card" style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb; display: ${index === 0 ? 'block' : 'none'};" data-question="${index}">
                <p style="font-size: 1.1em; font-weight: 600; margin-bottom: 20px; color: #1f2937;">
                    <span style="background: #0d9488; color: white; padding: 4px 10px; border-radius: 6px; margin-right: 10px; font-size: 0.9em;">Question ${index + 1} of ${questions.length}</span>
                    ${q.question}
                </p>
                <div class="quiz-options" style="display: grid; gap: 10px;">
                    ${q.options.map((option, optIndex) => `
                        <button class="quiz-option" 
                                onclick="checkQuizAnswer(this, ${optIndex === q.correct}, '${q.explanation.replace(/'/g, "\\'")}', ${index}, ${questions.length})"
                                style="padding: 15px 20px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; text-align: left; font-size: 1em; transition: all 0.3s; min-height: 48px;"
                                onmouseover="this.style.background='#f1f5f9'; this.style.borderColor='#cbd5e1';"
                                onmouseout="if(!this.classList.contains('correct') && !this.classList.contains('incorrect')) { this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'; }">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" style="margin-top: 15px; padding: 15px; border-radius: 8px; display: none;"></div>
                <button class="quiz-next-btn" style="margin-top: 20px; padding: 12px 24px; background: #0d9488; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; display: none; transition: all 0.3s;"
                        onclick="nextQuizQuestion(${index}, ${questions.length})"
                        onmouseover="this.style.background='#0f766e';"
                        onmouseout="this.style.background='#0d9488';">
                    ${index === questions.length - 1 ? 'View Results' : 'Next Question →'}
                </button>
            </div>
        `).join('');

        return `
            <div class="module-quiz-section" style="margin-top: 40px; padding-top: 30px; border-top: 3px solid #e5e7eb;">
                <div style="background: linear-gradient(135deg, #0d9488, #0f766e); padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                    <h3 style="color: white; margin-bottom: 10px; font-size: 1.8em;">📝 Test Your Knowledge</h3>
                    <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 1.1em;">Answer ${questions.length} questions to reinforce your learning</p>
                </div>
                
                <div class="quiz-score-tracker" style="background: #f0fdfa; padding: 15px 20px; border-radius: 10px; margin-bottom: 25px; text-align: center; border: 2px solid #99f6e4;">
                    <span style="font-size: 1.2em; font-weight: 600; color: #134e4a;">Score: <span id="quiz-score">0</span>/${questions.length}</span>
                </div>

                <div class="quiz-container">
                    ${quizHTML}
                </div>

                <div id="quiz-complete" style="display: none; background: #ccfbf1; padding: 25px; border-radius: 12px; border: 2px solid #5eead4; text-align: center;">
                    <h3 style="color: #115e59; margin-bottom: 15px;">🎉 Quiz Complete!</h3>
                    <p style="color: #134e4a; font-size: 1.2em; margin: 0;">You scored <span id="final-score"></span> out of ${questions.length}</p>
                </div>
            </div>
        `;
    }

    checkQuizAnswer(button, isCorrect, explanation, questionIndex, totalQuestions) {
        const questionCard = button.closest('.quiz-question-card');
        const allButtons = questionCard.querySelectorAll('.quiz-option');
        const feedbackDiv = questionCard.querySelector('.quiz-feedback');
        const nextBtn = questionCard.querySelector('.quiz-next-btn');

        // Disable all buttons for this question
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.style.opacity = '0.6';
        });

        // Style the clicked button
        if (isCorrect) {
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            button.style.borderColor = '#059669';
            button.style.color = 'white';
            button.style.fontWeight = '600';
            button.style.opacity = '1';
            button.classList.add('correct');

            // Update score
            const scoreEl = document.getElementById('quiz-score');
            if (scoreEl) {
                scoreEl.textContent = parseInt(scoreEl.textContent) + 1;
            }

            // Show success feedback
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.background = '#d1fae5';
            feedbackDiv.style.borderLeft = '4px solid #10b981';
            feedbackDiv.innerHTML = `
                <p style="margin: 0; color: #065f46; font-weight: 600; margin-bottom: 8px;">✅ Correct!</p>
                <p style="margin: 0; color: #047857; line-height: 1.6;">${explanation}</p>
            `;
        } else {
            button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            button.style.borderColor = '#dc2626';
            button.style.color = 'white';
            button.style.fontWeight = '600';
            button.style.opacity = '1';
            button.classList.add('incorrect');

            // Highlight correct answer
            allButtons.forEach((btn, idx) => {
                if (btn !== button && !btn.classList.contains('incorrect')) {
                    // This is a bit hacky but consistent with how the inline onclick was set up
                    // We check if the onclick string contains 'true' as the second argument
                    const isThisCorrect = btn.onclick.toString().includes('true,');
                    if (isThisCorrect) {
                        btn.style.background = '#d1fae5';
                        btn.style.borderColor = '#10b981';
                        btn.style.color = '#065f46';
                        btn.style.fontWeight = '600';
                        btn.style.opacity = '1';
                    }
                }
            });

            // Show error feedback
            feedbackDiv.style.display = 'block';
            feedbackDiv.style.background = '#fee2e2';
            feedbackDiv.style.borderLeft = '4px solid #ef4444';
            feedbackDiv.innerHTML = `
                <p style="margin: 0; color: #991b1b; font-weight: 600; margin-bottom: 8px;">❌ Incorrect</p>
                <p style="margin: 0; color: #b91c1c; line-height: 1.6;">${explanation}</p>
            `;
        }

        // Show next button
        if (nextBtn) {
            nextBtn.style.display = 'block';
        }

        // Smooth scroll to feedback
        feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    nextQuizQuestion(currentIndex, totalQuestions) {
        // Hide current question
        const currentCard = document.querySelector(`.quiz-question-card[data-question="${currentIndex}"]`);
        if (currentCard) {
            currentCard.style.display = 'none';
        }

        // Check if we're at the last question
        if (currentIndex === totalQuestions - 1) {
            // Show completion message
            const completeDiv = document.getElementById('quiz-complete');
            const finalScoreSpan = document.getElementById('final-score');
            const currentScore = document.getElementById('quiz-score').textContent;

            if (completeDiv && finalScoreSpan) {
                finalScoreSpan.textContent = currentScore;
                completeDiv.style.display = 'block';
                completeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Show next question
            const nextCard = document.querySelector(`.quiz-question-card[data-question="${currentIndex + 1}"]`);
            if (nextCard) {
                nextCard.style.display = 'block';
                nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}
