
import { MuscleDatabase, LesionSites } from './MuscleData.js';

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
        this.muscles = MuscleDatabase; // Assuming direct use if needed, though most logic uses data passed in
        this.lesionSites = LesionSites;
    }

    launch() {
        console.log('🧪 Launching EMG Localization Challenge...');

        // Inject CSS if not present
        if (!document.getElementById('emg-challenge-css')) {
            const link = document.createElement('link');
            link.id = 'emg-challenge-css';
            link.rel = 'stylesheet';
            link.href = 'src/css/emg-challenge.css';
            document.head.appendChild(link);
        }

        const emgChallengeContent = `
            <!-- Challenge Settings -->
        <div id="emg-challenge-setup" class="challenge-section" style="
            padding: 30px;
            max-width: 900px;
            margin: 0 auto;
        ">
            <button class="hero-back-btn" onclick="window.backToMuscleMenu()" style="
                background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                padding: 8px 16px;
                border-radius: 20px;
                color: #e2e8f0;
                cursor: pointer;
                margin-bottom: 20px;
                font-weight: 500;
                transition: all 0.2s;
            " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                ← Menu
            </button>

            <div class="challenge-header" style="text-align: center; margin-bottom: 40px;">
                <h3 style="
                    background: linear-gradient(135deg, #8b5cf6, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 15px;
                    font-size: 2.2em;
                    font-weight: 700;
                ">📋 EMG Localization Challenge</h3>
                <p style="color: #64748b; margin: 0; font-size: 1.15em;">Configure your challenge and test your diagnostic skills</p>
            </div>

            <!-- Question Type Toggles -->
            <div class="question-type-selector" style="margin-bottom: 40px;">
                <h4 style="
                    background: linear-gradient(135deg, #8b5cf6, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 15px;
                    font-size: 1.4em;
                    font-weight: 600;
                ">🎯 Select Lesion Types</h4>
                <p style="color: #64748b; margin-bottom: 25px; font-size: 1.05em;">Choose which localizations you want to master</p>

                <div class="toggle-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                    <div class="toggle-option active" data-type="root" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('root')" style="
                        display: flex;
                        align-items: center;
                        padding: 20px;
                        background: linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.08));
                        border: 2px solid rgba(20, 184, 166, 0.4);
                        border-radius: 15px;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15);
                    " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                        <div style="margin-right: 15px; font-size: 2em;">🌿</div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0 0 8px 0; color: #0d9488; font-size: 1.15em; font-weight: 600;">Nerve Root Lesions</h5>
                            <p style="margin: 0; font-size: 0.95em; color: #64748b; line-height: 1.4;">C5-T1, L2-S1 radiculopathies</p>
                            <div style="font-size: 0.85em; color: #94a3b8; margin-top: 5px;">e.g., C6, L5 radiculopathy</div>
                        </div>
                        <div class="toggle-status" style="margin-left: 15px;">
                            <span class="status-indicator active" style="width: 16px; height: 16px; background: #14b8a6; border-radius: 50%; display: inline-block; box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);"></span>
                        </div>
                    </div>

                    <div class="toggle-option active" data-type="plexus" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('plexus')" style="
                        display: flex;
                        align-items: center;
                        padding: 20px;
                        background: linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.08));
                        border: 2px solid rgba(251, 191, 36, 0.4);
                        border-radius: 15px;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 4px 15px rgba(251, 191, 36, 0.15);
                    " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(251, 191, 36, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(251, 191, 36, 0.15)'">
                        <div style="margin-right: 15px; font-size: 2em;">🌳</div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0 0 8px 0; color: #d97706; font-size: 1.15em; font-weight: 600;">Plexus Lesions</h5>
                            <p style="margin: 0; font-size: 0.95em; color: #64748b; line-height: 1.4;">Trunk and cord injuries</p>
                            <div style="font-size: 0.85em; color: #94a3b8; margin-top: 5px;">e.g., Upper trunk, posterior cord</div>
                        </div>
                        <div class="toggle-status" style="margin-left: 15px;">
                            <span class="status-indicator active" style="width: 16px; height: 16px; background: #fbbf24; border-radius: 50%; display: inline-block; box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);"></span>
                        </div>
                    </div>

                    <div class="toggle-option active" data-type="peripheral" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('peripheral')" style="
                        display: flex;
                        align-items: center;
                        padding: 20px;
                        background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.08));
                        border: 2px solid rgba(139, 92, 246, 0.4);
                        border-radius: 15px;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.15);
                    " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(139, 92, 246, 0.15)'">
                        <div style="margin-right: 15px; font-size: 2em;">⚡</div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0 0 8px 0; color: #8b5cf6; font-size: 1.15em; font-weight: 600;">Peripheral Nerve Lesions</h5>
                            <p style="margin: 0; font-size: 0.95em; color: #64748b; line-height: 1.4;">Entrapment neuropathies, focal injuries</p>
                            <div style="font-size: 0.85em; color: #94a3b8; margin-top: 5px;">e.g., Carpal tunnel, peroneal palsy</div>
                        </div>
                        <div class="toggle-status" style="margin-left: 15px;">
                            <span class="status-indicator active" style="width: 16px; height: 16px; background: #8b5cf6; border-radius: 50%; display: inline-block; box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);"></span>
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
                    animation: pulse-glow 3s ease-in-out infinite;
                " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 40px rgba(139, 92, 246, 0.6)'; this.style.animation='none'" onmouseout="this.style.transform=''; this.style.boxShadow='0 8px 30px rgba(139, 92, 246, 0.4)'; this.style.animation='pulse-glow 3s ease-in-out infinite'">
                    <span style="font-size: 1.1em;">🚀</span>
                    <span>Begin Challenge</span>
                </button>
                <div style="margin-top: 15px; color: #64748b; font-size: 1em;">Select at least one lesion type to start</div>
            </div>
        </div>

        <!-- Active Challenge -->
        <div id="emg-challenge-active" class="challenge-section" style="display: none;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(99, 102, 241, 0.03));
            border: 3px solid rgba(139, 92, 246, 0.3);
            border-radius: 25px;
            padding: 45px;
            box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15);
        ">
            <div class="challenge-header" style="text-align: center; margin-bottom: 40px;">
                <h3 style="
                    background: linear-gradient(135deg, #8b5cf6, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 15px;
                    font-size: 2.2em;
                    font-weight: 700;
                ">🔬 EMG Case Analysis</h3>
                <div style="color: #64748b; font-size: 1.2em; font-weight: 500;">
                    <p id="challenge-scenario" style="margin: 0;">Loading case scenario...</p>
                </div>
            </div>

            <div class="findings-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px;">
                <div class="abnormal-findings" style="
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(220, 38, 38, 0.08));
                    border: 3px solid rgba(239, 68, 68, 0.4);
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 6px 25px rgba(239, 68, 68, 0.15);
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 35px rgba(239, 68, 68, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 6px 25px rgba(239, 68, 68, 0.15)'">
                    <h5 style="
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 20px;
                        font-size: 1.4em;
                        font-weight: 700;
                    ">❌ Abnormal Muscles (Denervation)</h5>
                    <ul id="challenge-abnormal-muscles" style="
                        color: #991b1b;
                        line-height: 2;
                        margin: 0;
                        padding-left: 25px;
                        font-size: 1.05em;
                        font-weight: 600;
                    ">
                        <!-- Abnormal muscles will be populated here -->
                    </ul>
                </div>

                <div class="normal-findings" style="
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.08));
                    border: 3px solid rgba(16, 185, 129, 0.4);
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 6px 25px rgba(16, 185, 129, 0.15);
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 35px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 6px 25px rgba(16, 185, 129, 0.15)'">
                    <h5 style="
                        background: linear-gradient(135deg, #10b981, #059669);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 20px;
                        font-size: 1.4em;
                        font-weight: 700;
                    ">✅ Normal Muscles</h5>
                    <ul id="challenge-normal-muscles" style="
                        color: #065f46;
                        line-height: 2;
                        margin: 0;
                        padding-left: 25px;
                        font-size: 1.05em;
                        font-weight: 600;
                    ">
                        <!-- Normal muscles will be populated here -->
                    </ul>
                </div>
            </div>

            <div class="challenge-question" style="
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.08));
                border: 3px solid rgba(251, 191, 36, 0.3);
                border-radius: 20px;
                padding: 35px;
                margin-bottom: 30px;
                text-align: center;
                box-shadow: 0 6px 25px rgba(251, 191, 36, 0.15);
            ">
                <div class="question-text" id="challenge-question-text" style="
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
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
                    <!-- Answer options will be populated here -->
                </div>
            </div>

            <div class="challenge-controls" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 20px;">
                <button id="challenge-back-btn" onclick="window.EMGChallenge && EMGChallenge.backToSettings()" style="
                    background: linear-gradient(135deg, #64748b, #475569);
                    color: white;
                    border: none;
                    padding: 14px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 1.05rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(100, 116, 139, 0.3);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(100, 116, 139, 0.4)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(100, 116, 139, 0.3)'">
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
                    box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    opacity: 0.5;
                " onmouseover="if(!this.disabled) { this.style.transform='translateY(-2px) scale(1.03)'; this.style.boxShadow='0 8px 30px rgba(16, 185, 129, 0.5)'; }" onmouseout="this.style.transform=''; this.style.boxShadow='0 6px 25px rgba(16, 185, 129, 0.4)'">
                    Submit Analysis
                </button>
                <button id="challenge-next-btn" onclick="window.EMGChallenge && EMGChallenge.nextCase()" style="display: none;
                    background: #10b981;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">
                    Next Case →
                </button>
            </div>

            <div class="challenge-feedback" id="challenge-feedback" style="display: none;">
                <!-- Feedback will be populated here -->
            </div>
        </div>
        `;

        if (window.showModal) {
            window.showModal('🧪 EMG Localization Challenge', emgChallengeContent);
        } else {
            console.error('showModal is not defined');
            // Fallback would go here
        }
    }

    toggleQuestionType(type) {
        this.activeQuestionTypes[type] = !this.activeQuestionTypes[type];

        // Update toggle appearance
        const toggleElement = document.querySelector(`.toggle-option[data-type="${type}"]`);
        if (toggleElement) {
            if (this.activeQuestionTypes[type]) {
                toggleElement.classList.add('active');
            } else {
                toggleElement.classList.remove('active');
            }
        }
    }

    startChallenge() {
        this.isActive = true;
        this.score = { correct: 0, total: 0 };

        // Hide settings, show active challenge
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');

        if (settingsPanel) settingsPanel.style.display = 'none';
        if (activePanel) activePanel.style.display = 'block';

        this.generateCase();
    }

    generateCase() {
        // Get available lesions based on settings
        const availableLesions = this.getAvailableLesions();

        if (availableLesions.length === 0) {
            alert('❌ No lesion types selected! Please enable at least one question type.');
            this.backToSettings();
            return;
        }

        // Pick random lesion
        const randomIndex = Math.floor(Math.random() * availableLesions.length);
        const correctLesion = availableLesions[randomIndex];

        // Get lesion data
        const lesionData = this.getLesionData(correctLesion);

        // Select 4 abnormal muscles from lesion
        const abnormalMuscles = this.selectRandomMuscles(lesionData.muscles, 4);

        // Select 4 normal muscles (not in lesion)
        const normalMuscles = this.selectNormalMuscles(lesionData.muscles, lesionData.region, 4);

        // Generate answer options
        const answerOptions = this.generateAnswerOptions(correctLesion, lesionData);

        // Store current case
        this.currentCase = {
            correctLesion: correctLesion,
            abnormalMuscles: abnormalMuscles,
            normalMuscles: normalMuscles,
            answerOptions: answerOptions,
            region: lesionData.region
        };

        this.selectedAnswer = null;

        // Display case
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
        // Check UE first, then LE
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
        // Get all muscles from the same extremity
        // Using imported MuscleDatabase directly
        const allMuscles = Object.keys(this.muscles).filter(muscle => {
            return this.muscles[muscle].region === region;
        });

        // Filter out abnormal muscles
        const normalMuscles = allMuscles.filter(muscle => !abnormalMuscles.includes(muscle));

        // Select random normal muscles
        return this.selectRandomMuscles(normalMuscles, count);
    }

    generateAnswerOptions(correctLesion, correctLesionData) {
        const options = [correctLesion];
        const region = correctLesionData.region;
        const correctType = correctLesionData.type;

        // Get all lesions from same region
        const sameLesions = Object.keys(this.lesionSites[region])
            .filter(name => name !== correctLesion);

        // Try to get 3 distractors of same type first
        const sameTypeLesions = sameLesions.filter(name =>
            this.lesionSites[region][name].type === correctType
        );

        // Add up to 3 same-type distractors
        const shuffledSameType = [...sameTypeLesions].sort(() => Math.random() - 0.5);
        shuffledSameType.slice(0, 3).forEach(lesion => options.push(lesion));

        // If we need more, add different types
        if (options.length < 4) {
            const differentTypeLesions = sameLesions.filter(name =>
                this.lesionSites[region][name].type !== correctType &&
                !options.includes(name)
            );
            const shuffledDifferent = [...differentTypeLesions].sort(() => Math.random() - 0.5);
            shuffledDifferent.slice(0, 4 - options.length).forEach(lesion => options.push(lesion));
        }

        // Shuffle final options
        return options.sort(() => Math.random() - 0.5);
    }

    displayCase() {
        const { abnormalMuscles, normalMuscles, answerOptions } = this.currentCase;

        // Update abnormal muscles list
        const abnormalList = document.getElementById('challenge-abnormal-muscles');
        if (abnormalList) {
            abnormalList.innerHTML = abnormalMuscles.map(m => `<li>${m}</li>`).join('');
        }

        // Update normal muscles list
        const normalList = document.getElementById('challenge-normal-muscles');
        if (normalList) {
            normalList.innerHTML = normalMuscles.map(m => `<li>${m}</li>`).join('');
        }

        // Update answer options
        const optionsContainer = document.getElementById('challenge-answer-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = answerOptions.map(option => `
                <button class="challenge-answer-btn" onclick="window.EMGChallenge && EMGChallenge.selectAnswer('${option.replace(/'/g, "\\'")}')" style="
                    background: white;
                    border: 2px solid #d1d5db;
                    border-radius: 8px;
                    padding: 15px 20px;
                    color: #374151;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                ">
                    ${option}
                </button>
            `).join('');
        }

        // Reset buttons
        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');
        const feedbackDiv = document.getElementById('challenge-feedback');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.style.display = 'block'; // Show submit button again
        }
        if (nextBtn) nextBtn.style.display = 'none';
        if (feedbackDiv) feedbackDiv.style.display = 'none';
    }

    selectAnswer(lesion) {
        this.selectedAnswer = lesion;

        // Highlight selected answer
        document.querySelectorAll('.challenge-answer-btn').forEach(btn => {
            if (btn.textContent.trim() === lesion) {
                btn.style.background = '#6b9f78';
                btn.style.color = 'white';
                btn.style.borderColor = '#6b9f78';
            } else {
                btn.style.background = 'white';
                btn.style.color = '#374151';
                btn.style.borderColor = '#d1d5db';
            }
        });

        // Enable submit button
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

        // Show feedback
        const feedbackDiv = document.getElementById('challenge-feedback');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'block';
            feedbackDiv.innerHTML = `
                <div style="background: ${correct ? '#f0fdf4' : '#fef2f2'};
                            border: 2px solid ${correct ? '#10b981' : '#dc2626'};
                            border-radius: 10px;
                            padding: 20px;
                            margin-top: 20px;">
                    <h4 style="color: ${correct ? '#10b981' : '#dc2626'}; margin-bottom: 10px;">
                        ${correct ? '✅ Correct!' : '❌ Incorrect'}
                    </h4>
                    <p style="margin: 10px 0;">
                        <strong>Your answer:</strong> ${this.selectedAnswer}
                    </p>
                    <p style="margin: 10px 0;">
                        <strong>Correct answer:</strong> ${this.currentCase.correctLesion}
                    </p>
                    <p style="margin: 10px 0; color: #374151;">
                        The pattern of ${this.currentCase.abnormalMuscles.join(', ')} being abnormal
                        while ${this.currentCase.normalMuscles.join(', ')} remain normal
                        is consistent with a <strong>${this.currentCase.correctLesion}</strong> lesion.
                    </p>
                    <p style="margin-top: 15px; font-weight: 600; color: #6b9f78;">
                        Score: ${this.score.correct}/${this.score.total}
                    </p>
                </div>
            `;
        }

        // Disable submit, show next button
        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');

        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'block';

        // Disable answer buttons
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
