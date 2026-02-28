/**
 * Logic Engine for the NCS Module.
 * Adheres strictly to the Contract: ZERO DOM manipulation, HTML, or global window references.
 * Pure state management and calculation.
 */

export class NCSEngine {
    constructor(ncsData) {
        if (!ncsData) {
            console.error("NCSEngine initialized without data dependency!");
        }
        this.data = ncsData;

        // Internal State
        this.currentQuizState = null;
    }

    /**
     * Data Access
     */
    getVideos() {
        return this.data.VIDEOS || [];
    }

    /**
     * Quiz Logic: Initialization
     */
    startLandmarkQuiz(pgyLevel) {
        const questions = this._generateQuestionPool(pgyLevel);

        this.currentQuizState = {
            questions: questions,
            currentQuestionIndex: 0,
            score: 0,
            answers: [],
            pgyLevel: pgyLevel
        };

        return this.getCurrentQuestion();
    }

    /**
     * Helper to filter and shuffle questions
     */
    _generateQuestionPool(pgyLevel) {
        const pgyLevels = {
            'pgy2': ['pgy2'],
            'pgy3': ['pgy2', 'pgy3'],
            'pgy4': ['pgy2', 'pgy3', 'pgy4']
        };

        const allowedDifficulties = pgyLevels[pgyLevel] || ['pgy2'];
        const allQuestions = this.data.LANDMARK_QUESTIONS || [];

        const filteredQuestions = allQuestions.filter(q => allowedDifficulties.includes(q.difficulty));
        const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());

        return shuffled.slice(0, Math.min(5, shuffled.length));
    }

    /**
     * Quiz Logic: State Retrieval
     */
    getCurrentQuestion() {
        if (!this.currentQuizState || this.currentQuizState.questions.length === 0) return null;
        return this.currentQuizState.questions[this.currentQuizState.currentQuestionIndex];
    }

    getQuizProgress() {
        if (!this.currentQuizState) return { current: 0, total: 0 };
        return {
            current: this.currentQuizState.currentQuestionIndex + 1,
            total: this.currentQuizState.questions.length
        };
    }

    getCurrentScore() {
        return this.currentQuizState ? this.currentQuizState.score : 0;
    }

    /**
     * Quiz Logic: Evaluation
     */
    evaluateQuizAnswer(selectedIndex) {
        if (!this.currentQuizState) return null;

        const question = this.getCurrentQuestion();
        const isCorrect = (selectedIndex === question.correct);

        this.currentQuizState.answers.push({
            questionId: question.id,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });

        if (isCorrect) {
            this.currentQuizState.score++;
        }

        return {
            isCorrect: isCorrect,
            correctIndex: question.correct,
            explanation: question.explanation,
            updatedScore: this.currentQuizState.score
        };
    }

    /**
     * Quiz Logic: Advancement
     */
    hasNextQuestion() {
        if (!this.currentQuizState) return false;
        return this.currentQuizState.currentQuestionIndex < this.currentQuizState.questions.length - 1;
    }

    advanceToNextQuestion() {
        if (this.hasNextQuestion()) {
            this.currentQuizState.currentQuestionIndex++;
            return this.getCurrentQuestion();
        }
        return null;
    }

    /**
     * Quiz Logic: Completion
     */
    getFinalResults() {
        if (!this.currentQuizState) return null;

        const total = this.currentQuizState.questions.length;
        const score = this.currentQuizState.score;
        const percentage = Math.round((score / total) * 100);

        let performanceCategory = 'needs-work';
        let feedback = 'Consider reviewing the NCS Landmarks section for better understanding.';

        if (percentage >= 80) {
            performanceCategory = 'excellent';
            feedback = 'Excellent! You have a strong understanding of NCS landmarks.';
        } else if (percentage >= 60) {
            performanceCategory = 'good';
            feedback = 'Good work! Review the missed questions to improve your landmark knowledge.';
        }

        return {
            score: score,
            total: total,
            percentage: percentage,
            category: performanceCategory,
            feedback: feedback,
            pgyLevel: this.currentQuizState.pgyLevel
        };
    }
}
