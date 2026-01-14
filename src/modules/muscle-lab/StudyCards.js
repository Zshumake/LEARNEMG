
import { MuscleDatabase } from '../../data/MuscleDatabase.js';

export class StudyCardsModule {
    constructor() {
        this.muscleDatabase = MuscleDatabase;
        this.currentTab = 'cards';
        this.currentRegion = 'lower';
        this.currentAnatomyType = 'nerve';
        this.inlineQuizActive = false;
        this.quizMode = 'multiple'; // 'type' or 'multiple'
        this.selectedQuizAnswer = null;
        this.currentQuestionAnatomyType = null;
        this.currentQuestionMuscle = null;
        this.quizContentTypes = ['nerve', 'roots', 'cord', 'actions'];
        this.quizRegion = 'both';
        this.testData = {
            questionsAnswered: 0,
            correctAnswers: 0,
            missedQuestions: [],
            usedMuscles: new Set(),
            isActive: false
        };

        // Bind high-level methods
        this.launch = this.launch.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.switchAnatomy = this.switchAnatomy.bind(this);
        this.displayMuscles = this.displayMuscles.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
        this.globalRevealAll = this.globalRevealAll.bind(this);
        this.globalRevealType = this.globalRevealType.bind(this);
        this.updateQuizContent = this.updateQuizContent.bind(this);
        this.toggleAllQuizContent = this.toggleAllQuizContent.bind(this);
        this.updateQuizRegion = this.updateQuizRegion.bind(this);
        this.setQuizMode = this.setQuizMode.bind(this);
        this.startInlineQuiz = this.startInlineQuiz.bind(this);
        this.stopInlineQuiz = this.stopInlineQuiz.bind(this);
        this.checkInlineAnswer = this.checkInlineAnswer.bind(this);
        this.selectQuizOption = this.selectQuizOption.bind(this);

        // Expose globally for HTML onclicks
        this.initGlobalBindings();
    }

    initGlobalBindings() {
        window.MuscleAnatomy = this;
        window.showStudyCards = this.launch;
    }

    launch() {
        console.log('🧬 Launching Advanced Muscle Study Lab...');

        const content = this.generateUI();

        if (window.showModal) {
            window.showModal('🧬 Advanced Muscle Study Lab', content);
        } else {
            console.error("showModal not available");
        }

        // Initialize after DOM update
        setTimeout(() => {
            this.initializeDisplay();
        }, 500);
    }

    initializeDisplay() {
        this.displayMuscles('lower');
    }

    generateUI() {
        return `
            <style>
                /* Advanced Muscle Lab Styling - Inline for encapsulation */
                .muscle-lab-hero {
                    background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6, #14b8a6);
                    background-size: 300% 300%;
                    animation: gradient-shift 15s ease infinite;
                    border-radius: 25px;
                    padding: 40px;
                    margin: 20px 0;
                    text-align: center;
                    color: white;
                    box-shadow: 0 10px 30px rgba(20, 184, 166, 0.3);
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .muscle-lab-tabs {
                    display: flex; gap: 10px; margin-bottom: 30px;
                    background: rgba(255,255,255,0.1); padding: 8px; border-radius: 15px;
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .muscle-tab {
                    padding: 15px 30px; border: none; background: transparent;
                    color: #64748b; font-weight: 600; cursor: pointer; border-radius: 10px;
                    font-size: 1.1rem; flex: 1; transition: all 0.3s;
                }
                .muscle-tab.active {
                    background: linear-gradient(135deg, #14b8a6, #06b6d4);
                    color: white; shadow: 0 4px 15px rgba(20, 184, 166, 0.4);
                }
                .muscle-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }
                .muscle-card-interactive {
                    background: white; border: 2px solid rgba(20, 184, 166, 0.15);
                    border-radius: 12px; padding: 20px; transition: all 0.3s;
                }
                .muscle-card-interactive:hover {
                    border-color: #14b8a6; transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.2);
                }
                .muscle-name {
                    font-size: 1.2rem; margin: 0 0 15px 0;
                    color: #0f766e;
                }
                .muscle-btn {
                    padding: 6px 12px; border: 1px solid #ccfbf1; border-radius: 6px;
                    background: #f0fdfa; color: #0d9488; cursor: pointer;
                    font-size: 0.85rem; margin-right: 5px; margin-bottom: 5px;
                }
                .muscle-btn.active {
                    background: #0d9488; color: white; border-color: #0d9488;
                }
                .muscle-detail {
                    margin-top: 10px; padding: 10px; background: #f0f9ff;
                    border-left: 3px solid #0ea5e9; border-radius: 4px;
                    font-size: 0.9rem;
                }
                .global-reveal-controls {
                    display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
                    margin-bottom: 30px;
                }
                .global-reveal-btn {
                     padding: 10px 20px; border-radius: 20px; border: none;
                     background: #e2e8f0; color: #475569; cursor: pointer; font-weight: 600;
                }
                .global-reveal-btn:hover { background: #cbd5e1; }
                .region-btn {
                    padding: 12px 24px; border-radius: 25px; border: 2px solid #e2e8f0;
                    background: white; color: #64748b; font-weight: 600; cursor: pointer;
                }
                .region-btn.active {
                    border-color: #14b8a6; color: #0d9488; background: #f0fdfa;
                }
            </style>

            <div class="muscle-lab-hero">
                <button onclick="window.backToMuscleMenu()" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; padding: 8px 16px; border-radius: 20px; cursor: pointer;">← Menu</button>
                <h2>🧬 Advanced Muscle Laboratory</h2>
                <p>Preston & Shapiro Complete Muscle Database</p>
                <div style="display: flex; justify-content: center; gap: 30px; margin-top: 20px;">
                    <div><strong>${Object.keys(this.muscleDatabase).length}</strong> Muscles</div>
                    <div><strong>∞</strong> Questions</div>
                </div>
            </div>

            <div class="muscle-lab-tabs">
                <button class="muscle-tab active" data-tab="cards" onclick="MuscleAnatomy.switchTab('cards')">📚 Study Cards</button>
                <button class="muscle-tab" data-tab="quiz" onclick="MuscleAnatomy.switchTab('quiz')">🧪 Interactive Quiz</button>
            </div>

            <!-- CARDS TAB -->
            <div id="cards-tab-content" class="tab-content">
                <div style="text-align: center; margin-bottom: 20px;">
                     <button class="region-btn active" data-region="lower" onclick="MuscleAnatomy.switchAnatomy('lower')">🦵 Lower Extremity</button>
                     <button class="region-btn" data-region="upper" onclick="MuscleAnatomy.switchAnatomy('upper')">💪 Upper Extremity</button>
                </div>

                <div class="global-reveal-controls">
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealAll()">📖 Reveal All</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('nerve')">🔌 Nerves</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('roots')">🌿 Roots</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('cord')">🕸️ Cords</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('actions')">💪 Actions</button>
                </div>

                <div id="muscle-anatomy-display"></div>
            </div>

            <!-- QUIZ TAB -->
            <div id="quiz-tab-content" class="tab-content" style="display: none;">
                <div style="background: #f8fafc; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0;">
                    <h3 style="margin-top: 0; color: #334155;">Quiz Configuration</h3>
                    
                    <div style="margin-bottom: 20px;">
                        <h4>Extremity</h4>
                        <label><input type="radio" name="quiz-region" value="upper" onchange="MuscleAnatomy.updateQuizRegion()"> Upper</label>
                        <label><input type="radio" name="quiz-region" value="lower" onchange="MuscleAnatomy.updateQuizRegion()"> Lower</label>
                        <label><input type="radio" name="quiz-region" value="both" checked onchange="MuscleAnatomy.updateQuizRegion()"> Both</label>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <h4>Content</h4>
                        <label><input type="checkbox" id="quiz-nerve" checked onchange="MuscleAnatomy.updateQuizContent()"> Nerve</label>
                        <label><input type="checkbox" id="quiz-roots" checked onchange="MuscleAnatomy.updateQuizContent()"> Roots</label>
                        <label><input type="checkbox" id="quiz-cord" checked onchange="MuscleAnatomy.updateQuizContent()"> Cord/Trunk</label>
                        <label><input type="checkbox" id="quiz-actions" checked onchange="MuscleAnatomy.updateQuizContent()"> Actions</label>
                    </div>

                    <button onclick="MuscleAnatomy.startInlineQuiz()" class="global-reveal-btn" style="background: #10b981; color: white; width: 100%; padding: 15px;">▶️ Start Quiz</button>
                </div>

                <div id="inline-quiz-area" style="margin-top: 30px; display: none;"></div>
            </div>
        `;
    }

    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.muscle-tab').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');

        document.getElementById('cards-tab-content').style.display = tab === 'cards' ? 'block' : 'none';
        document.getElementById('quiz-tab-content').style.display = tab === 'quiz' ? 'block' : 'none';
    }

    switchAnatomy(region) {
        this.currentRegion = region;
        this.displayMuscles(region);

        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-region="${region}"]`)?.classList.add('active');
    }

    displayMuscles(region) {
        const display = document.getElementById('muscle-anatomy-display');
        if (!display) return;

        const regionCode = region === 'upper' ? 'UE' : 'LE';
        const muscles = Object.entries(this.muscleDatabase).filter(([_, data]) => data.region === regionCode);

        display.innerHTML = `
            <div class="muscle-grid">
                ${muscles.map(([name, data]) => `
                    <div class="muscle-card-interactive" data-muscle="${name}">
                        <h4 class="muscle-name">${name}</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;">
                            <button class="muscle-btn nerve" onclick="MuscleAnatomy.toggleDetail('${name}', 'nerve')">Nerve</button>
                            <button class="muscle-btn roots" onclick="MuscleAnatomy.toggleDetail('${name}', 'roots')">Roots</button>
                            <button class="muscle-btn cord" onclick="MuscleAnatomy.toggleDetail('${name}', 'cord')">Cord</button>
                            <button class="muscle-btn actions" onclick="MuscleAnatomy.toggleDetail('${name}', 'actions')">Actions</button>
                        </div>
                        
                        <div class="muscle-detail" data-type="nerve" style="display: none;">
                            <strong>Nerve:</strong> ${data.peripheralNerve}
                        </div>
                        <div class="muscle-detail" data-type="roots" style="display: none;">
                            <strong>Roots:</strong> ${data.roots.join(', ')}
                        </div>
                        <div class="muscle-detail" data-type="cord" style="display: none;">
                            <strong>Cord/Trunk:</strong> ${data.cord || 'N/A'}
                        </div>
                        <div class="muscle-detail" data-type="actions" style="display: none;">
                            <strong>Actions:</strong> ${data.actions}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    toggleDetail(muscleName, type) {
        const card = Array.from(document.querySelectorAll(`[data-muscle]`)).find(el => el.dataset.muscle === muscleName);
        if (!card) return;

        const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
        const btn = card.querySelector(`.muscle-btn.${type}`);

        if (detail && btn) {
            const isHidden = detail.style.display === 'none';
            detail.style.display = isHidden ? 'block' : 'none';
            if (isHidden) btn.classList.add('active'); else btn.classList.remove('active');
        }
    }

    globalRevealType(type) {
        document.querySelectorAll(`.muscle-detail[data-type="${type}"]`).forEach(d => d.style.display = 'block');
        document.querySelectorAll(`.muscle-btn.${type}`).forEach(b => b.classList.add('active'));
    }

    globalRevealAll() {
        document.querySelectorAll('.muscle-detail').forEach(d => d.style.display = 'block');
        document.querySelectorAll('.muscle-btn').forEach(b => b.classList.add('active'));
    }

    // QUIZ METHODS
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

    toggleAllQuizContent() { /* Not essential for core functionality, implied by individual checks */ }
    setQuizMode(mode) { this.quizMode = mode; }

    startInlineQuiz() {
        this.inlineQuizActive = true;
        document.getElementById('inline-quiz-area').style.display = 'block';
        this.generateInlineQuestion();
    }

    stopInlineQuiz() {
        this.inlineQuizActive = false;
        document.getElementById('inline-quiz-area').style.display = 'none';
    }

    generateInlineQuestion() {
        let entries = Object.entries(this.muscleDatabase);
        if (this.quizRegion === 'upper') entries = entries.filter(([_, d]) => d.region === 'UE');
        else if (this.quizRegion === 'lower') entries = entries.filter(([_, d]) => d.region === 'LE');

        const [muscle, data] = entries[Math.floor(Math.random() * entries.length)];

        // Pick type
        let types = [...this.quizContentTypes];
        if (data.region === 'LE') types = types.filter(t => t !== 'cord');
        if (types.length === 0) types = ['nerve'];
        const type = types[Math.floor(Math.random() * types.length)];

        this.currentQuestionMuscle = muscle;
        this.currentQuestionAnatomyType = type;

        // Generate Options
        const correct = this.getCorrectAnswer(muscle, type);
        const options = this.generateOptions(muscle, type, correct);

        const container = document.getElementById('inline-quiz-area');
        container.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #8b5cf6; text-align: center;">
                <h3 style="color: #6d28d9;">What is the ${this.getTypeLabel(type)} of <span style="color:#0d9488">${muscle}</span>?</h3>
                <div style="display: grid; gap: 10px; margin: 20px 0;">
                    ${options.map(opt => `
                        <button class="quiz-option-btn" onclick="MuscleAnatomy.checkInlineAnswer('${opt.replace(/'/g, "\\'")}')" 
                        style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer; font-size: 1rem;">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <button onclick="MuscleAnatomy.generateInlineQuestion()" style="background: #e2e8f0; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">Skip Question</button>
            </div>
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
        if (type === 'nerve') return d.peripheralNerve; // Alias
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

    checkInlineAnswer(selected) {
        const correct = this.getCorrectAnswer(this.currentQuestionMuscle, this.currentQuestionAnatomyType);
        const isCorrect = selected === correct;

        if (isCorrect) {
            alert('✅ Correct!');
            setTimeout(() => this.generateInlineQuestion(), 1000);
        } else {
            alert(`❌ Incorrect.\nCorrect answer: ${correct}`);
        }
    }

    selectQuizOption(opt) {
        // Handled directly by onclick in this simplified version
    }
}
