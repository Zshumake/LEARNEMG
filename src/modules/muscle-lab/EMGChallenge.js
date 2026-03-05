import { MuscleDatabase, LesionSites } from '../../data/MuscleDatabase.js';

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
    }

    launch() {
        console.log('EMG Localization Challenge Launched...');

        // Inject CSS if not present
        if (!document.getElementById('emg-challenge-css')) {
            const link = document.createElement('link');
            link.id = 'emg-challenge-css';
            link.rel = 'stylesheet';
            link.href = 'src/css/emg-challenge.css';
            document.head.appendChild(link);
        }

        const emgChallengeContent = `
            <style>
                .active-challenge-btn {
                    background: #10b981 !important;
                    color: white !important;
                    border-color: #10b981 !important;
                }
            </style>
            <!-- Challenge Settings -->
        <div id="emg-challenge-setup" class="challenge-section" style="
            padding: 30px;
            max-width: 900px;
            margin: 0 auto;
            font-family: 'Inter', sans-serif;
        ">
            <button class="hero-back-btn" onclick="window.backToMuscleMenu()" style="
                background: white;
                border: 2px solid #e2e8f0;
                padding: 10px 20px;
                border-radius: 20px;
                color: #64748b;
                cursor: pointer;
                margin-bottom: 25px;
                font-weight: 600;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
            " onmouseover="this.style.background='#f8fafc'; this.style.color='#0f172a'" onmouseout="this.style.background='white'; this.style.color='#64748b'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> 
                Menu
            </button>

            <div class="challenge-header" style="text-align: center; margin-bottom: 40px;">
                <h3 style="
                    color: #0f172a;
                    margin-bottom: 15px;
                    font-size: 2.2em;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                ">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    Clinical Case Challenge
                </h3>
                <p style="color: #64748b; margin: 0; font-size: 1.15em;">Configure your challenge and test your diagnostic skills</p>
            </div>

            <!-- Question Type Toggles -->
            <div class="question-type-selector" style="margin-bottom: 40px;">
                <h4 style="
                    color: #1e293b;
                    margin-bottom: 15px;
                    font-size: 1.4em;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    Select Lesion Types
                </h4>
                <p style="color: #64748b; margin-bottom: 25px; font-size: 1.05em;">Choose which localizations you want to master</p>

                <div class="toggle-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="toggle-option active" data-type="root" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('root')" style="
                        display: flex;
                        align-items: center;
                        padding: 20px;
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 15px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.borderColor='#14b8a6'; this.style.background='#f0fdfa';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
                        <div style="margin-right: 15px; color: #14b8a6;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0 0 8px 0; color: #0d9488; font-size: 1.15em; font-weight: 600;">Nerve Roots</h5>
                            <p style="margin: 0; font-size: 0.95em; color: #64748b; line-height: 1.4;">C5-T1, L2-S1 radiculopathies</p>
                        </div>
                        <div class="toggle-status" style="margin-left: 15px;">
                            <span class="status-indicator active" style="width: 16px; height: 16px; background: #14b8a6; border-radius: 50%; display: inline-block;"></span>
                        </div>
                    </div>

                    <div class="toggle-option active" data-type="plexus" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('plexus')" style="
                        display: flex;
                        align-items: center;
                        padding: 20px;
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 15px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
                        <div style="margin-right: 15px; color: #f59e0b;">
                           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
                        </div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0 0 8px 0; color: #d97706; font-size: 1.15em; font-weight: 600;">Plexus</h5>
                            <p style="margin: 0; font-size: 0.95em; color: #64748b; line-height: 1.4;">Trunk and cord injuries</p>
                        </div>
                        <div class="toggle-status" style="margin-left: 15px;">
                            <span class="status-indicator active" style="width: 16px; height: 16px; background: #fbbf24; border-radius: 50%; display: inline-block;"></span>
                        </div>
                    </div>

                    <div class="toggle-option active" data-type="peripheral" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('peripheral')" style="
                        display: flex;
                        align-items: center;
                        padding: 20px;
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 15px;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.borderColor='#8b5cf6'; this.style.background='#f5f3ff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc';">
                        <div style="margin-right: 15px; color: #8b5cf6;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                        </div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0 0 8px 0; color: #7c3aed; font-size: 1.15em; font-weight: 600;">Peripheral Nerve</h5>
                            <p style="margin: 0; font-size: 0.95em; color: #64748b; line-height: 1.4;">Entrapments & neuropathies</p>
                        </div>
                        <div class="toggle-status" style="margin-left: 15px;">
                            <span class="status-indicator active" style="width: 16px; height: 16px; background: #8b5cf6; border-radius: 50%; display: inline-block;"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="challenge-launch" style="text-align: center;">
                <button class="launch-challenge-btn" onclick="window.EMGChallenge && EMGChallenge.startChallenge()" style="
                    background: linear-gradient(135deg, #8b5cf6, #6366f1);
                    color: white;
                    border: none;
                    padding: 20px 50px;
                    border-radius: 50px;
                    font-size: 1.4em;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 40px rgba(139, 92, 246, 0.6)';" onmouseout="this.style.transform=''; this.style.boxShadow='0 8px 30px rgba(139, 92, 246, 0.4)';">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Begin Challenge
                </button>
            </div>
        </div>

        <!-- Active Challenge -->
        <div id="emg-challenge-active" class="challenge-section" style="display: none;
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 25px;
            padding: 45px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
            font-family: 'Inter', sans-serif;
        ">
            <div class="challenge-header" style="text-align: center; margin-bottom: 40px;">
                <h3 style="
                    color: #0f172a;
                    margin-bottom: 15px;
                    font-size: 2.2em;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                ">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    EMG Case Analysis
                </h3>
                <div style="color: #64748b; font-size: 1.2em; font-weight: 500;">
                    <p id="challenge-scenario" style="margin: 0;">Review the findings and select the lesion location.</p>
                </div>
            </div>

            <div class="findings-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px;">
                <div class="abnormal-findings" style="
                    background: #fef2f2;
                    border: 2px solid #fecaca;
                    border-radius: 20px;
                    padding: 30px;
                ">
                    <h5 style="
                        color: #dc2626;
                        margin-bottom: 20px;
                        font-size: 1.4em;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        Abnormal Muscles
                    </h5>
                    <ul id="challenge-abnormal-muscles" style="
                        color: #991b1b;
                        line-height: 2;
                        margin: 0;
                        padding-left: 25px;
                        font-size: 1.05em;
                        font-weight: 600;
                    ">
                        <!-- Abnormal muscles -->
                    </ul>
                </div>

                <div class="normal-findings" style="
                    background: #f0fdf4;
                    border: 2px solid #bbf7d0;
                    border-radius: 20px;
                    padding: 30px;
                ">
                    <h5 style="
                        color: #059669;
                        margin-bottom: 20px;
                        font-size: 1.4em;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Normal Muscles
                    </h5>
                    <ul id="challenge-normal-muscles" style="
                        color: #065f46;
                        line-height: 2;
                        margin: 0;
                        padding-left: 25px;
                        font-size: 1.05em;
                        font-weight: 600;
                    ">
                        <!-- Normal muscles -->
                    </ul>
                </div>
            </div>

            <div class="challenge-question" style="
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 20px;
                padding: 35px;
                margin-bottom: 30px;
                text-align: center;
            ">
                <div class="question-text" id="challenge-question-text" style="
                    color: #0f172a;
                    font-size: 1.5em;
                    font-weight: 700;
                    margin-bottom: 30px;
                ">
                    Where is the most likely location of the lesion?
                </div>

                <div class="answer-options-challenge" id="challenge-answer-options" style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 15px;
                ">
                    <!-- Answer options -->
                </div>
            </div>

            <div class="challenge-controls" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 20px;">
                <button id="challenge-back-btn" onclick="window.EMGChallenge && EMGChallenge.backToSettings()" style="
                    background: white;
                    color: #64748b;
                    border: 2px solid #e2e8f0;
                    padding: 14px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1.05rem;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                    ← Back to Settings
                </button>
                <button id="challenge-submit-btn" onclick="window.EMGChallenge && EMGChallenge.submitAnswer()" disabled style="
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    border: none;
                    padding: 16px 40px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 1.15rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                    opacity: 0.5;
                " onmouseover="if(!this.disabled) { this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.4)'; }" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(16, 185, 129, 0.3)'">
                    Submit Analysis
                </button>
                <button id="challenge-next-btn" onclick="window.EMGChallenge && EMGChallenge.nextCase()" style="display: none;
                    background: #10b981;
                    color: white;
                    border: none;
                    padding: 14px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1.05em;
                ">
                    Next Case →
                </button>
            </div>

            <div class="challenge-feedback" id="challenge-feedback" style="display: none;">
                <!-- Feedback -->
            </div>
        </div>
        `;

        if (window.showModal) {
            window.showModal('Clinical Case Challenge', emgChallengeContent, true);
        } else {
            console.error('showModal is not defined');
        }
    }

    toggleQuestionType(type) {
        this.activeQuestionTypes[type] = !this.activeQuestionTypes[type];
        const toggleElement = document.querySelector(`.toggle-option[data-type="${type}"]`);
        if (toggleElement) {
            if (this.activeQuestionTypes[type]) {
                toggleElement.style.borderColor = (type === 'root') ? '#14b8a6' : (type === 'plexus') ? '#f59e0b' : '#8b5cf6';
                toggleElement.querySelector('.status-indicator').style.background = (type === 'root') ? '#14b8a6' : (type === 'plexus') ? '#fbbf24' : '#8b5cf6';
            } else {
                toggleElement.style.borderColor = '#e2e8f0';
                toggleElement.querySelector('.status-indicator').style.background = '#cbd5e1';
            }
        }
    }

    startChallenge() {
        this.isActive = true;
        this.score = { correct: 0, total: 0 };
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');
        if (settingsPanel) settingsPanel.style.display = 'none';
        if (activePanel) activePanel.style.display = 'block';
        this.generateCase();
    }

    generateCase() {
        const availableLesions = this.getAvailableLesions();
        if (availableLesions.length === 0) {
            alert('No lesion types selected! Please enable at least one.');
            this.backToSettings();
            return;
        }

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
        const shuffled = [...muscleArray].sort(() => Math.random() - 0.5);
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
        const shuffledSameType = [...sameTypeLesions].sort(() => Math.random() - 0.5);
        shuffledSameType.slice(0, 3).forEach(lesion => options.push(lesion));

        if (options.length < 4) {
            const differentTypeLesions = sameLesions.filter(name =>
                this.lesionSites[region][name].type !== correctType &&
                !options.includes(name)
            );
            const shuffledDifferent = [...differentTypeLesions].sort(() => Math.random() - 0.5);
            shuffledDifferent.slice(0, 4 - options.length).forEach(lesion => options.push(lesion));
        }
        return options.sort(() => Math.random() - 0.5);
    }

    displayCase() {
        const { abnormalMuscles, normalMuscles, answerOptions } = this.currentCase;
        const abnormalList = document.getElementById('challenge-abnormal-muscles');
        if (abnormalList) {
            abnormalList.innerHTML = abnormalMuscles.map(m => `<li>${m}</li>`).join('');
        }
        const normalList = document.getElementById('challenge-normal-muscles');
        if (normalList) {
            normalList.innerHTML = normalMuscles.map(m => `<li>${m}</li>`).join('');
        }
        const optionsContainer = document.getElementById('challenge-answer-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = answerOptions.map(option => `
                <button class="challenge-answer-btn" onclick="window.EMGChallenge && window.EMGChallenge.selectAnswer('${option.replace(/'/g, "\\'")}')" style="
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 15px 20px;
                    color: #334155;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: center;
                    font-size: 1.1em;
                ">
                    ${option}
                </button>
            `).join('');
        }

        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');
        const feedbackDiv = document.getElementById('challenge-feedback');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.style.display = 'block';
        }
        if (nextBtn) nextBtn.style.display = 'none';
        if (feedbackDiv) feedbackDiv.style.display = 'none';
    }

    selectAnswer(lesion) {
        this.selectedAnswer = lesion;
        document.querySelectorAll('.challenge-answer-btn').forEach(btn => {
            if (btn.textContent.trim() === lesion) {
                btn.style.background = '#eef2ff';
                btn.style.color = '#4f46e5';
                btn.style.borderColor = '#6366f1';
            } else {
                btn.style.background = 'white';
                btn.style.color = '#334155';
                btn.style.borderColor = '#e2e8f0';
            }
        });
        const submitBtn = document.getElementById('challenge-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }

    submitAnswer() {
        if (!this.selectedAnswer) return;

        const correct = this.selectedAnswer === this.currentCase.correctLesion;
        this.score.total++;
        if (correct) this.score.correct++;

        const feedbackDiv = document.getElementById('challenge-feedback');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'block';
            let icon = correct ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
            feedbackDiv.innerHTML = `
                <div style="background: ${correct ? '#f0fdf4' : '#fef2f2'};
                            border: 2px solid ${correct ? '#10b981' : '#dc2626'};
                            border-radius: 15px;
                            padding: 25px;
                            margin-top: 30px;">
                    <h4 style="color: ${correct ? '#059669' : '#b91c1c'}; margin-bottom: 15px; font-size: 1.3em; display:flex; align-items:center; gap:10px;">
                        ${icon}
                        ${correct ? 'Diagnosis Correct!' : 'Incorrect Diagnosis'}
                    </h4>
                    <p style="margin: 10px 0; color: #334155; font-size: 1.05em;">
                        <strong>Your answer:</strong> ${this.selectedAnswer}
                    </p>
                    <p style="margin: 10px 0; color: #1e293b; font-size: 1.05em;">
                        <strong>Correct answer:</strong> ${this.currentCase.correctLesion}
                    </p>
                    <p style="margin: 15px 0 0 0; color: #475569; line-height: 1.6;">
                        The pattern of <span style="color:#dc2626; font-weight:600;">${this.currentCase.abnormalMuscles.join(', ')}</span> being abnormal
                        while <span style="color:#059669; font-weight:600;">${this.currentCase.normalMuscles.join(', ')}</span> remain normal
                        is indicative of a <strong>${this.currentCase.correctLesion}</strong> lesion.
                    </p>
                    <div style="margin-top: 20px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 10px 15px; border-radius: 8px; display: inline-block;">
                        Session Score: ${this.score.correct}/${this.score.total} (${Math.round((this.score.correct / this.score.total) * 100)}%)
                    </div>
                </div>
            `;
        }

        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');
        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'block';

        document.querySelectorAll('.challenge-answer-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            if (btn.textContent.trim() === this.currentCase.correctLesion) {
                btn.style.background = '#10b981';
                btn.style.color = 'white';
                btn.style.borderColor = '#10b981';
            }
        });
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
