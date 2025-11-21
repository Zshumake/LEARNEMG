// Muscle Study System (Module 9)
// Complete EMG Challenge and Advanced Muscle Study Lab
// Extracted from monolithic file for better performance

// ========== EMG CHALLENGE SYSTEM ==========

window.EMGChallenge = {
    currentSettings: {
        difficulty: 'moderate',
        region: 'mixed',
        type: 'localization'
    },
    isActive: false,
    currentCase: null,
    selectedAnswer: null,
    score: { correct: 0, total: 0 },
    activeQuestionTypes: {
        root: true,
        plexus: true,
        peripheral: true
    },

    lesionSites: {
        UE: {
            'C5 nerve root': { type: 'root', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Infraspinatus'] },
            'C6 nerve root': { type: 'root', muscles: ['Biceps brachii', 'Brachioradialis', 'Extensor carpi radialis'] },
            'C7 nerve root': { type: 'root', muscles: ['Triceps brachii', 'Extensor digitorum', 'Flexor carpi radialis'] },
            'C8 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
            'T1 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Abductor digiti minimi'] },
            'Upper trunk (C5-C6)': { type: 'plexus', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Brachioradialis'] },
            'Lower trunk (C8-T1)': { type: 'plexus', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
            'Posterior cord': { type: 'plexus', muscles: ['Deltoid', 'Triceps brachii', 'Extensor digitorum', 'Brachioradialis'] },
            'Medial cord': { type: 'plexus', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
            'Lateral cord': { type: 'plexus', muscles: ['Biceps brachii', 'Brachialis', 'Pronator teres'] },
            'Median nerve at wrist (carpal tunnel)': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Opponens pollicis'] },
            'Median nerve at forearm': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Flexor pollicis longus', 'Pronator teres', 'Flexor carpi radialis'] },
            'Ulnar nerve at wrist (Guyon canal)': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Abductor digiti minimi', 'Adductor pollicis'] },
            'Ulnar nerve at elbow': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
            'Radial nerve in spiral groove': { type: 'peripheral', muscles: ['Triceps brachii', 'Brachioradialis', 'Extensor digitorum'] },
            'Posterior interosseous nerve': { type: 'peripheral', muscles: ['Extensor digitorum', 'Extensor pollicis longus'] },
            'Axillary nerve': { type: 'peripheral', muscles: ['Deltoid', 'Teres minor'] },
            'Suprascapular nerve': { type: 'peripheral', muscles: ['Supraspinatus', 'Infraspinatus'] }
        },
        LE: {
            'L2 nerve root': { type: 'root', muscles: ['Iliopsoas', 'Adductor longus', 'Sartorius'] },
            'L3 nerve root': { type: 'root', muscles: ['Rectus femoris', 'Vastus medialis', 'Adductor longus'] },
            'L4 nerve root': { type: 'root', muscles: ['Tibialis anterior', 'Rectus femoris', 'Vastus medialis'] },
            'L5 nerve root': { type: 'root', muscles: ['Extensor hallucis longus', 'Tibialis anterior', 'Gluteus medius', 'Biceps femoris'] },
            'S1 nerve root': { type: 'root', muscles: ['Gastrocnemius', 'Gluteus maximus', 'Biceps femoris'] },
            'Femoral nerve': { type: 'peripheral', muscles: ['Rectus femoris', 'Vastus medialis', 'Vastus lateralis', 'Sartorius'] },
            'Peroneal nerve at fibular head': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Fibularis longus'] },
            'Deep peroneal nerve': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Extensor digitorum longus'] },
            'Sciatic nerve': { type: 'peripheral', muscles: ['Biceps femoris', 'Semitendinosus', 'Gastrocnemius'] },
            'Tibial nerve': { type: 'peripheral', muscles: ['Gastrocnemius', 'Soleus', 'Flexor hallucis longus'] },
            'Superior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus medius', 'Gluteus minimus', 'Tensor fasciae latae'] },
            'Inferior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus maximus'] }
        }
    },

    toggleQuestionType: function(type) {
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
    },

    startChallenge: function() {
        this.isActive = true;
        this.score = { correct: 0, total: 0 };

        // Hide settings, show active challenge
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');

        if (settingsPanel) settingsPanel.style.display = 'none';
        if (activePanel) activePanel.style.display = 'block';

        this.generateCase();
    },

    generateCase: function() {
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
    },

    getAvailableLesions: function() {
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
    },

    getLesionData: function(lesionName) {
        // Check UE first, then LE
        if (this.lesionSites.UE[lesionName]) {
            return { ...this.lesionSites.UE[lesionName], region: 'UE' };
        } else if (this.lesionSites.LE[lesionName]) {
            return { ...this.lesionSites.LE[lesionName], region: 'LE' };
        }
        return null;
    },

    selectRandomMuscles: function(muscleArray, count) {
        const shuffled = [...muscleArray].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, muscleArray.length));
    },

    selectNormalMuscles: function(abnormalMuscles, region, count) {
        // Get all muscles from the same extremity
        const allMuscles = Object.keys(window.MuscleAnatomy.muscleDatabase).filter(muscle => {
            return window.MuscleAnatomy.muscleDatabase[muscle].region === region;
        });

        // Filter out abnormal muscles
        const normalMuscles = allMuscles.filter(muscle => !abnormalMuscles.includes(muscle));

        // Select random normal muscles
        return this.selectRandomMuscles(normalMuscles, count);
    },

    generateAnswerOptions: function(correctLesion, correctLesionData) {
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
    },

    displayCase: function() {
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
                <button class="challenge-answer-btn" onclick="EMGChallenge.selectAnswer('${option.replace(/'/g, "\\'")}')" style="
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
    },

    selectAnswer: function(lesion) {
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
    },

    submitAnswer: function() {
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
    },

    nextCase: function() {
        this.generateCase();
    },

    backToSettings: function() {
        this.isActive = false;

        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');

        if (settingsPanel) settingsPanel.style.display = 'block';
        if (activePanel) activePanel.style.display = 'none';
    }
};

console.log('✅ EMG Challenge system loaded');

// ========== EMG CHALLENGE MODAL FUNCTION ==========

window.showEMGChallenge = function() {
    console.log('🧪 Launching EMG Localization Challenge...');

    const emgChallengeContent = `
        <style>
            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
                50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
            }

            /* Toggle card inactive state - HIGHLY VISIBLE */
            .toggle-option:not(.active) {
                opacity: 0.35;
                filter: grayscale(0.8);
                transform: scale(0.96);
                border: 2px solid rgba(239, 68, 68, 0.3) !important;
                background: rgba(254, 226, 226, 0.3) !important;
            }

            .toggle-option:not(.active)::after {
                content: '✕ DISABLED';
                position: absolute;
                top: 10px;
                right: 15px;
                color: #ef4444;
                font-size: 0.75rem;
                font-weight: 700;
                opacity: 0.7;
            }

            .toggle-option:not(.active) .status-indicator {
                background: #ef4444 !important;
                box-shadow: 0 0 10px rgba(239, 68, 68, 0.3) !important;
            }

            .toggle-option.active {
                position: relative;
            }

            .toggle-option.active::after {
                content: '✓ ENABLED';
                position: absolute;
                top: 10px;
                right: 15px;
                color: #10b981;
                font-size: 0.75rem;
                font-weight: 700;
            }

            .toggle-option.active .status-indicator {
                animation: pulse-indicator 2s ease-in-out infinite;
            }

            @keyframes pulse-indicator {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.8; }
            }
        </style>

        <!-- Challenge Settings -->
        <div id="emg-challenge-setup" class="challenge-section" style="
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(99, 102, 241, 0.03));
            border: 3px solid rgba(139, 92, 246, 0.3);
            border-radius: 25px;
            padding: 45px;
            margin-bottom: 20px;
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

    showModal('🧪 EMG Localization Challenge', emgChallengeContent);
};

console.log('✅ showEMGChallenge function loaded');

// ========== MUSCLE LOCALIZATION SYSTEM ==========

window.MuscleLocalization = {
    currentRegion: 'upper',

    switchRegion: function(region) {
        console.log(`🎯 Switching to ${region} extremity muscle localization`);
        this.currentRegion = region;

        // Update button states
        document.querySelectorAll('.region-btn').forEach(btn => {
            const btnRegion = btn.dataset.region;
            if (btnRegion === region) {
                btn.classList.add('active');
                btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                btn.style.color = 'white';
            } else {
                btn.classList.remove('active');
                btn.style.background = '#f3f4f6';
                btn.style.color = '#6b7280';
            }
        });

        // Show region-specific message
        alert(`📍 Switched to ${region} extremity muscle localization. Advanced muscle database with complete innervation patterns and clinical correlations available.`);
    }
};

console.log('✅ Muscle Localization system loaded');

// ========== SHOW STUDY CARDS FUNCTION ==========

window.showStudyCards = function() {
    console.log('🧬 Launching Advanced Muscle Study Lab...');
    console.log('✨ UI FACELIFT VERSION LOADED - v20251001093045');

    const muscleLabContent = `
        <style>
            /* Advanced Muscle Lab Styling */
            @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            .muscle-lab-hero {
                background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6, #14b8a6);
                background-size: 300% 300%;
                animation: gradient-shift 15s ease infinite;
                border-radius: 25px;
                padding: 40px;
                margin: 20px 0;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                text-align: center;
                box-shadow: 0 20px 60px rgba(20, 184, 166, 0.3);
                position: relative;
                overflow: hidden;
            }

            .muscle-lab-hero::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.05);
                z-index: 1;
            }

            .muscle-lab-hero .hero-content {
                position: relative;
                z-index: 2;
            }
            .hero-title {
                font-size: 2.5rem;
                color: white;
                margin-bottom: 15px;
                font-weight: 700;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
            .hero-subtitle {
                font-size: 1.1rem;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 25px;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }
            .hero-stats {
                display: flex;
                justify-content: center;
                gap: 30px;
                flex-wrap: wrap;
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .stat-card {
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px 30px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                min-width: 120px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                animation: float 3s ease-in-out infinite;
            }

            .stat-card:nth-child(1) { animation-delay: 0s; }
            .stat-card:nth-child(2) { animation-delay: 0.2s; }
            .stat-card:nth-child(3) { animation-delay: 0.4s; }

            .stat-card:hover {
                transform: translateY(-15px) scale(1.05);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                background: rgba(255, 255, 255, 0.3);
            }
            .stat-number {
                font-size: 2rem;
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
            .stat-label {
                font-size: 0.9rem;
                color: rgba(255, 255, 255, 0.9);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }

            .study-controls-bar {
                display: flex;
                gap: 40px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(107, 159, 120, 0.2);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }
            .control-section h4 {
                color: #2c3e50;
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .region-selector, .anatomy-selector {
                display: flex;
                gap: 10px;
            }
            .region-btn, .anatomy-btn {
                padding: 16px 35px;
                border: 2px solid rgba(20, 184, 166, 0.3);
                border-radius: 50px;
                background: rgba(255, 255, 255, 0.9);
                color: #0d9488;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1.1rem;
                box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15);
            }
            .region-btn:hover, .anatomy-btn:hover {
                background: rgba(20, 184, 166, 0.1);
                color: #0d9488;
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 6px 20px rgba(20, 184, 166, 0.25);
                border-color: rgba(20, 184, 166, 0.5);
            }
            .region-btn.active, .anatomy-btn.active {
                background: linear-gradient(135deg, #14b8a6, #06b6d4);
                color: white;
                font-weight: 700;
                box-shadow: 0 6px 25px rgba(20, 184, 166, 0.5);
                border-color: transparent;
            }

            .quiz-section {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(139, 92, 246, 0.2);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 30px;
            }
            .quiz-header h3 {
                color: #2c3e50;
                margin-bottom: 5px;
            }
            .quiz-header p {
                color: #6b7280;
                margin-bottom: 20px;
            }
            .quiz-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                flex-wrap: wrap;
                gap: 20px;
            }
            .quiz-mode-toggle {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .quiz-mode-toggle label {
                font-weight: 600;
                color: #374151;
            }
            .mode-toggle-btn {
                padding: 8px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                background: white;
                color: #6b7280;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .mode-toggle-btn:hover {
                border-color: #8b5cf6;
                background: rgba(139, 92, 246, 0.05);
                color: #8b5cf6;
            }
            .mode-toggle-btn.active {
                border-color: #8b5cf6;
                background: #8b5cf6;
                color: white;
            }
            .quiz-action-btns {
                display: flex;
                gap: 15px;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            .quiz-start-btn, .quiz-stop-btn {
                padding: 14px 28px;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1.05rem;
            }
            .quiz-start-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                animation: pulse 2s ease-in-out infinite;
            }
            .quiz-start-btn:hover {
                background: linear-gradient(135deg, #059669, #047857);
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
                animation: none;
            }
            .quiz-stop-btn {
                background: linear-gradient(135deg, #f97316, #ec4899);
                color: white;
                box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
            }
            .quiz-stop-btn:hover {
                background: linear-gradient(135deg, #ea580c, #db2777);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
            }
            .inline-quiz-area {
                border-top: 1px solid #e5e7eb;
                padding-top: 20px;
            }

            .muscle-anatomy-display-enhanced {
                background: rgba(254, 252, 243, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 20px;
                padding: 25px;
                margin: 20px 0;
                box-shadow: 0 15px 35px rgba(107, 159, 120, 0.2);
                min-height: 400px;
            }

            .muscle-region h3 {
                color: #2c3e50;
                font-size: 1.5rem;
                margin-bottom: 20px;
                text-align: center;
            }

            .muscle-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
            }

            .muscle-card-interactive {
                background: white;
                border: 2px solid rgba(20, 184, 166, 0.15);
                border-radius: 12px;
                padding: 20px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .muscle-card-interactive:hover {
                border-color: #14b8a6;
                box-shadow: 0 8px 25px rgba(20, 184, 166, 0.25);
                transform: translateY(-4px);
            }

            .muscle-card-interactive.expanded {
                border-color: #14b8a6;
                box-shadow: 0 12px 35px rgba(20, 184, 166, 0.3);
                transform: scale(1.02);
                background: linear-gradient(135deg, rgba(20, 184, 166, 0.02), rgba(6, 182, 212, 0.02));
            }

            .muscle-header {
                margin-bottom: 15px;
            }

            .muscle-name {
                background: linear-gradient(135deg, #0d9488, #06b6d4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0;
            }

            .muscle-controls {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 15px;
            }

            .muscle-btn {
                padding: 6px 12px;
                border: 1px solid rgba(20, 184, 166, 0.3);
                border-radius: 8px;
                background: rgba(20, 184, 166, 0.05);
                color: #0d9488;
                font-size: 0.8rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .muscle-btn:hover {
                border-color: #14b8a6;
                background: rgba(20, 184, 166, 0.15);
                color: #0d9488;
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(20, 184, 166, 0.2);
            }

            .muscle-btn.active {
                border-color: #14b8a6;
                background: linear-gradient(135deg, #14b8a6, #06b6d4);
                color: white;
                box-shadow: 0 3px 10px rgba(20, 184, 166, 0.3);
            }

            .muscle-btn.show-all {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                border: none;
                color: white;
                box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
                transition: all 0.3s ease;
            }

            .muscle-btn.show-all:hover {
                background: linear-gradient(135deg, #f59e0b, #d97706);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
            }

            .muscle-detail {
                margin-top: 10px;
                padding: 12px;
                border-radius: 8px;
                border-left: 4px solid #14b8a6;
                background: linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.05));
                transition: all 0.3s ease;
                opacity: 0;
                transform: translateY(-10px);
                box-shadow: 0 2px 8px rgba(20, 184, 166, 0.1);
            }

            .muscle-detail[style*="display: block"] {
                opacity: 1;
                transform: translateY(0);
            }

            .detail-header {
                margin-bottom: 8px;
            }

            .detail-label {
                font-weight: 600;
                color: #374151;
                font-size: 0.9rem;
            }

            .detail-content {
                color: #1f2937;
                font-size: 0.9rem;
                line-height: 1.4;
            }

            .muscle-test-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10001;
            }

            .muscle-test-content {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 800px;
                width: 90%;
                max-height: 90%;
                overflow-y: auto;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            }

            .muscle-test-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #e5e7eb;
            }

            .test-title h3 {
                color: #1e40af;
                margin: 0;
            }

            .test-stats {
                display: flex;
                gap: 20px;
                margin-top: 10px;
            }

            .test-stats span {
                background: #f3f4f6;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.9rem;
                color: #374151;
            }

            .close-test-btn {
                background: linear-gradient(135deg, #f97316, #ec4899);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
            }

            .close-test-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
            }

            .quiz-question {
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.05));
                border: 2px solid rgba(139, 92, 246, 0.2);
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 6px 25px rgba(139, 92, 246, 0.15);
            }

            .quiz-question h4 {
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 25px;
                font-size: 1.5rem;
                font-weight: 700;
            }

            .quiz-answer-input {
                display: flex;
                gap: 12px;
                margin-bottom: 25px;
            }

            .quiz-answer-input input {
                flex: 1;
                padding: 14px 20px;
                border: 2px solid rgba(139, 92, 246, 0.3);
                border-radius: 50px;
                font-size: 1.1rem;
                transition: all 0.3s ease;
                box-shadow: 0 3px 10px rgba(139, 92, 246, 0.1);
            }

            .quiz-answer-input input:focus {
                outline: none;
                border-color: rgba(139, 92, 246, 0.6);
                box-shadow: 0 5px 20px rgba(139, 92, 246, 0.2);
            }

            .check-answer-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 14px 35px;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 700;
                font-size: 1.1rem;
                transition: all 0.3s ease;
                box-shadow: 0 5px 20px rgba(16, 185, 129, 0.4);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .check-answer-btn:hover {
                background: linear-gradient(135deg, #059669, #047857);
                transform: translateY(-2px) scale(1.03);
                box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
            }

            .check-answer-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }

            .quiz-options {
                display: grid;
                gap: 15px;
                margin-bottom: 25px;
            }

            .quiz-option {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 18px 25px;
                border: 2px solid rgba(139, 92, 246, 0.3);
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: white;
                font-weight: 600;
                font-size: 1.05rem;
                box-shadow: 0 3px 12px rgba(139, 92, 246, 0.1);
            }

            .quiz-option:hover {
                border-color: rgba(139, 92, 246, 0.6);
                background: rgba(139, 92, 246, 0.05);
                transform: translateX(5px);
                box-shadow: 0 5px 20px rgba(139, 92, 246, 0.2);
            }

            .quiz-option.selected {
                border-color: transparent;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                color: white;
                transform: translateX(8px);
                box-shadow: 0 6px 25px rgba(139, 92, 246, 0.4);
            }

            .quiz-option input[type="radio"] {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }

            .quiz-feedback {
                margin-top: 20px;
                padding: 15px;
                border-radius: 8px;
            }

            .feedback-result.correct {
                background: #dcfce7;
                border: 1px solid #16a34a;
                color: #15803d;
            }

            .feedback-result.incorrect {
                background: #fef2f2;
                border: 1px solid #dc2626;
                color: #dc2626;
            }

            .next-question-btn {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                margin-top: 10px;
            }

            /* Global Reveal Controls */
            .global-reveal-controls {
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(99, 102, 241, 0.03));
                border-radius: 20px;
                padding: 25px;
                margin-bottom: 30px;
                border: 2px solid rgba(139, 92, 246, 0.2);
                box-shadow: 0 4px 20px rgba(139, 92, 246, 0.1);
            }

            .global-reveal-buttons {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
            }

            .global-reveal-btn {
                padding: 14px 24px;
                border: none;
                border-radius: 50px;
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                color: white;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
                white-space: nowrap;
            }

            .global-reveal-btn:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 6px 25px rgba(139, 92, 246, 0.5);
                background: linear-gradient(135deg, #7c3aed, #4f46e5);
            }

            .global-reveal-btn.active {
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
            }

            .global-reveal-btn.reveal-all {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
                font-size: 1.1rem;
                padding: 16px 30px;
            }

            .global-reveal-btn.reveal-all:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 6px 25px rgba(251, 191, 36, 0.5);
                background: linear-gradient(135deg, #f59e0b, #d97706);
            }

            .global-reveal-btn.reveal-all.active {
                background: linear-gradient(135deg, #f59e0b, #d97706);
            }

            /* Tab Navigation Styles */
            .muscle-lab-tabs {
                display: flex;
                gap: 10px;
                margin-bottom: 30px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 8px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }

            .muscle-tab {
                padding: 15px 30px;
                background: transparent;
                border: none;
                border-radius: 10px;
                color: #6b7280;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }

            .muscle-tab:hover {
                color: #14b8a6;
                background: rgba(20, 184, 166, 0.1);
                transform: translateY(-2px);
            }

            .muscle-tab.active {
                color: white;
                background: linear-gradient(135deg, #14b8a6, #06b6d4);
                box-shadow: 0 4px 15px rgba(20, 184, 166, 0.4);
            }

            /* Tab Content */
            .tab-content {
                display: none;
            }

            .tab-content.active {
                display: block;
            }

            /* Cards Section Styles */
            .cards-controls-section {
                background: linear-gradient(135deg, rgba(20, 184, 166, 0.03), rgba(6, 182, 212, 0.03));
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 30px;
                border: 2px solid rgba(20, 184, 166, 0.2);
                box-shadow: 0 4px 20px rgba(20, 184, 166, 0.1);
            }

            .cards-controls-section h4 {
                background: linear-gradient(135deg, #0d9488, #06b6d4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 1.3rem;
                margin-bottom: 20px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .extremity-toggle-buttons {
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
            }

            /* Quiz Config Panel Styles */
            .quiz-config-panel {
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.03), rgba(99, 102, 241, 0.03));
                border-radius: 25px;
                padding: 40px;
                margin-bottom: 30px;
                border: 3px solid rgba(139, 92, 246, 0.2);
                box-shadow: 0 8px 30px rgba(139, 92, 246, 0.15);
            }

            .quiz-section-block {
                margin-bottom: 30px;
                padding-bottom: 30px;
                border-bottom: 2px solid rgba(139, 92, 246, 0.1);
            }

            .quiz-section-block:last-of-type {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }

            .quiz-section-block h4 {
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-size: 1.3rem;
                margin-bottom: 20px;
                font-weight: 700;
            }

            /* Quiz Content Checkboxes */
            .quiz-content-checkboxes {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                margin-bottom: 20px;
            }

            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding: 14px 22px;
                background: white;
                border: 2px solid rgba(20, 184, 166, 0.3);
                border-radius: 50px;
                transition: all 0.3s ease;
                font-weight: 600;
                color: #64748b;
                box-shadow: 0 3px 10px rgba(20, 184, 166, 0.1);
            }

            .checkbox-label:hover {
                border-color: rgba(20, 184, 166, 0.6);
                background: rgba(20, 184, 166, 0.05);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(20, 184, 166, 0.2);
            }

            .checkbox-label input[type="checkbox"] {
                cursor: pointer;
                width: 18px;
                height: 18px;
            }

            .checkbox-label:has(input:checked) {
                background: linear-gradient(135deg, #14b8a6, #06b6d4);
                border-color: transparent;
                color: white;
                box-shadow: 0 5px 20px rgba(20, 184, 166, 0.4);
            }

            /* Quiz Extremity Radios */
            .quiz-extremity-radios {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }

            .radio-label {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding: 14px 22px;
                background: white;
                border: 2px solid rgba(251, 191, 36, 0.3);
                border-radius: 50px;
                transition: all 0.3s ease;
                font-weight: 600;
                color: #64748b;
                box-shadow: 0 3px 10px rgba(251, 191, 36, 0.1);
            }

            .radio-label:hover {
                border-color: rgba(251, 191, 36, 0.6);
                background: rgba(251, 191, 36, 0.05);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(251, 191, 36, 0.2);
            }

            .radio-label input[type="radio"] {
                cursor: pointer;
                width: 18px;
                height: 18px;
            }

            .radio-label:has(input:checked) {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                border-color: transparent;
                color: white;
                box-shadow: 0 5px 20px rgba(251, 191, 36, 0.4);
            }

            /* Test All Toggle Button */
            .test-all-toggle-btn {
                background: linear-gradient(135deg, #14b8a6, #06b6d4);
                color: white;
                border: none;
                padding: 12px 28px;
                border-radius: 50px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
                font-size: 1rem;
            }

            .test-all-toggle-btn:hover {
                background: linear-gradient(135deg, #0d9488, #0891b2);
                transform: translateY(-2px) scale(1.03);
                box-shadow: 0 6px 20px rgba(20, 184, 166, 0.4);
            }

            /* Quiz Mode Buttons */
            .quiz-mode-buttons {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }

            .mode-toggle-btn {
                padding: 14px 28px;
                border: 2px solid rgba(139, 92, 246, 0.3);
                border-radius: 50px;
                background: white;
                color: #8b5cf6;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
                box-shadow: 0 3px 10px rgba(139, 92, 246, 0.1);
            }

            .mode-toggle-btn:hover {
                border-color: rgba(139, 92, 246, 0.6);
                background: rgba(139, 92, 246, 0.05);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(139, 92, 246, 0.2);
            }

            .mode-toggle-btn.active {
                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                border-color: transparent;
                color: white;
                box-shadow: 0 5px 20px rgba(139, 92, 246, 0.4);
                font-weight: 700;
            }

            /* Quiz Action Section */
            .quiz-action-section {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 20px;
            }

            .quiz-action-section .quiz-start-btn {
                font-size: 1.3rem;
                padding: 18px 45px;
                border-radius: 50px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
            }

            .quiz-action-section .quiz-start-btn:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
            }

            .quiz-action-section .quiz-stop-btn {
                font-size: 1.2rem;
                padding: 16px 40px;
                border-radius: 50px;
                font-weight: 700;
                box-shadow: 0 6px 25px rgba(249, 115, 22, 0.4);
            }

            .quiz-action-section .quiz-stop-btn:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
            }
        </style>

        <div class="muscle-lab-hero">
            <div class="hero-content">
                <h2 class="hero-title">🧬 Advanced Muscle Laboratory</h2>
                <p class="hero-subtitle">Preston & Shapiro Complete Muscle Database</p>
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

    showModal('🧬 Advanced Muscle Study Lab', muscleLabContent);

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (window.MuscleAnatomy) {
            console.log('🧬 Initializing MuscleAnatomy...', window.MuscleAnatomy);
            console.log('🧬 Muscle database size:', Object.keys(window.MuscleAnatomy.muscleDatabase).length);
            MuscleAnatomy.initializeDisplay();
        } else {
            console.error('❌ MuscleAnatomy object not found!');
        }
    }, 500);
};

console.log('✅ showStudyCards function loaded');

// ========== COMPLETE MUSCLE ANATOMY OBJECT - PRESTON & SHAPIRO DATABASE ==========

window.MuscleAnatomy = {
    currentTab: 'cards',
    currentRegion: 'lower',
    currentAnatomyType: 'nerve',
    inlineQuizActive: false,
    quizMode: 'multiple', // 'type' or 'multiple'
    selectedQuizAnswer: null,
    currentQuestionAnatomyType: null, // Store anatomy type for current question
    currentQuestionMuscle: null, // Store muscle for current question
    quizContentTypes: ['nerve', 'roots', 'cord', 'actions'], // What anatomy types to test
    quizRegion: 'both', // 'upper', 'lower', or 'both'
    testData: {
        questionsAnswered: 0,
        correctAnswers: 0,
        missedQuestions: [],
        usedMuscles: new Set(),
        isActive: false
    },

    // Complete Muscle Database - Preston & Shapiro - Organized by Peripheral Nerve
    muscleDatabase: {
        // ========== UPPER EXTREMITY MUSCLES - ORGANIZED BY PERIPHERAL NERVE ==========

        // 1. SPINAL ACCESSORY NERVE
        'Trapezius (upper)': { nerve: 'Spinal accessory', roots: ['C3', 'C4'], region: 'UE', peripheralNerve: 'Spinal accessory', cord: 'N/A (cranial nerve)', actions: 'Shoulder elevation, scapular retraction' },

        // 2. DORSAL SCAPULAR NERVE
        'Rhomboids': { nerve: 'Dorsal scapular', roots: ['C5'], region: 'UE', peripheralNerve: 'Dorsal scapular', cord: 'Upper trunk', actions: 'Scapular retraction and downward rotation' },

        // 3. LONG THORACIC NERVE
        'Serratus anterior': { nerve: 'Long thoracic', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Long thoracic', cord: 'Upper/Middle trunk', actions: 'Scapular protraction and upward rotation' },

        // 4. SUPRASCAPULAR NERVE
        'Supraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'Upper trunk', actions: 'Shoulder abduction initiation' },
        'Infraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'Upper trunk', actions: 'Shoulder external rotation' },

        // 5. SUBSCAPULAR AND LOWER SUBSCAPULAR NERVES
        'Subscapularis': { nerve: 'Subscapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Subscapular', cord: 'Posterior cord', actions: 'Shoulder internal rotation' },
        'Teres major': { nerve: 'Lower subscapular', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Lower subscapular', cord: 'Posterior cord', actions: 'Shoulder adduction, internal rotation, extension' },

        // 6. PECTORAL NERVES (LATERAL AND MEDIAL)
        'Pectoralis major': { nerve: 'Pectoral', roots: ['C5', 'C6', 'C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Pectoral', cord: 'Lateral/Medial cord', actions: 'Shoulder adduction, internal rotation' },

        // 7. THORACODORSAL NERVE
        'Latissimus dorsi': { nerve: 'Thoracodorsal', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Thoracodorsal', cord: 'Posterior cord', actions: 'Shoulder adduction, extension, internal rotation' },

        // 8. AXILLARY NERVE
        'Deltoid': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder abduction, flexion, extension' },
        'Teres minor': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder external rotation' },

        // 9. MUSCULOCUTANEOUS NERVE
        'Biceps brachii': { nerve: 'Musculocutaneous', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral cord', actions: 'Elbow flexion, forearm supination' },
        'Brachialis (Musculocutaneous)': { nerve: 'Musculocutaneous/Radial', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral/Posterior cord', actions: 'Elbow flexion' },
        'Coracobrachialis': { nerve: 'Musculocutaneous', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral cord', actions: 'Shoulder flexion, adduction' },

        // 10. RADIAL NERVE
        'Brachioradialis': { nerve: 'Radial', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow flexion, forearm rotation' },
        'Triceps brachii': { nerve: 'Radial', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow extension' },
        'Brachialis (Radial)': { nerve: 'Musculocutaneous/Radial', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Radial', cord: 'Lateral/Posterior cord', actions: 'Elbow flexion' },
        'Anconeus': { nerve: 'Radial', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow extension, stabilizes elbow joint' },
        'Extensor carpi radialis': { nerve: 'Radial', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Wrist extension and radial deviation' },
        'Supinator': { nerve: 'Posterior interosseous', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Forearm supination' },
        'Extensor digitorum': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Finger extension at MCP joints' },
        'Extensor carpi ulnaris': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Wrist extension and ulnar deviation' },
        'Extensor pollicis longus': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Thumb extension and retropulsion' },
        'Extensor indicis': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Index finger extension' },
        'Abductor pollicis longus': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Thumb abduction and extension' },

        // 11. MEDIAN NERVE
        'Pronator teres': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Forearm pronation, elbow flexion' },
        'Flexor carpi radialis': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Wrist flexion and radial deviation' },
        'Palmaris longus': { nerve: 'Median', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Wrist flexion, tenses palmar aponeurosis' },
        'Flexor digitorum superficialis': { nerve: 'Median', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at PIP joints' },
        'Flexor digitorum profundus (digits 2&3)': { nerve: 'Anterior interosseous', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at DIP joints (index, middle)' },
        'Flexor pollicis longus': { nerve: 'Anterior interosseous', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb flexion at IP joint' },
        'Pronator quadratus': { nerve: 'Anterior interosseous', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Forearm pronation' },
        'Abductor pollicis brevis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb abduction' },
        'Opponens pollicis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb opposition' },

        // 12. ULNAR NERVE
        'Flexor carpi ulnaris': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Wrist flexion and ulnar deviation' },
        'Flexor digitorum profundus (digits 4&5)': { nerve: 'Ulnar', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Finger flexion at DIP joints (ring, little)' },
        'Adductor pollicis': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Thumb adduction' },
        'First dorsal interosseous': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Index finger abduction' },
        'Abductor digiti minimi': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Little finger abduction' },

        // ========== LOWER EXTREMITY MUSCLES - ORGANIZED BY PERIPHERAL NERVE ==========

        // 1. SUPERIOR GLUTEAL NERVE
        'Gluteus medius': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation (anterior fibers), lateral rotation (posterior fibers)' },
        'Gluteus minimus': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation, stabilizes pelvis' },
        'Tensor fasciae latae': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip flexion, abduction, medial rotation, stabilizes IT band' },

        // 2. INFERIOR GLUTEAL NERVE
        'Gluteus maximus': { nerve: 'Inferior gluteal', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Inferior gluteal', actions: 'Hip extension, lateral rotation, upper fibers assist in abduction' },

        // 3. NERVE TO PIRIFORMIS
        'Piriformis': { nerve: 'Nerve to piriformis', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Piriformis', actions: 'Hip lateral rotation, abduction when hip is flexed' },

        // 4. FEMORAL NERVE
        'Iliopsoas': { nerve: 'Lumbar plexus/Femoral', roots: ['L1', 'L2', 'L3'], region: 'LE', peripheralNerve: 'Lumbar plexus', actions: 'Hip flexion, stabilizes lumbar spine' },
        'Pectineus': { nerve: 'Femoral', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion, adduction' },
        'Rectus femoris': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension, hip flexion' },
        'Vastus lateralis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
        'Vastus medialis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
        'Vastus intermedius': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
        'Sartorius': { nerve: 'Femoral', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion, abduction, external rotation; knee flexion' },

        // 5. OBTURATOR NERVE
        'Obturator externus': { nerve: 'Obturator', roots: ['L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip external rotation, adduction' },
        'Adductor longus': { nerve: 'Obturator', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, flexion' },
        'Adductor magnus (Obturator)': { nerve: 'Obturator/Sciatic', roots: ['L2', 'L3', 'L4', 'L5'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, extension (posterior fibers)' },
        'Gracilis': { nerve: 'Obturator', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, knee flexion' },

        // 6. SCIATIC NERVE
        'Biceps femoris': { nerve: 'Sciatic', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
        'Semitendinosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
        'Semimembranosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
        'Adductor magnus (Sciatic)': { nerve: 'Obturator/Sciatic', roots: ['L2', 'L3', 'L4', 'L5'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Hip adduction, extension (posterior fibers)' },

        // 7. TIBIAL NERVE
        'Gastrocnemius': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, knee flexion' },
        'Soleus': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion' },
        'Tibialis posterior': { nerve: 'Tibial', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, foot inversion' },
        'Flexor digitorum longus': { nerve: 'Tibial', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Toe flexion, ankle plantarflexion' },
        'Flexor hallucis longus': { nerve: 'Tibial', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe flexion, ankle plantarflexion' },
        'Abductor hallucis': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe abduction, supports medial arch' },
        'Abductor digiti minimi pedis': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Little toe abduction, supports lateral arch' },

        // 8. PERONEAL NERVE (DEEP PERONEAL)
        'Tibialis anterior': { nerve: 'Deep peroneal', roots: ['L4', 'L5'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle dorsiflexion, foot inversion' },
        'Extensor digitorum longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Toe extension, ankle dorsiflexion' },
        'Extensor hallucis longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Great toe extension, ankle dorsiflexion' },
        'Extensor digitorum brevis': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Toe extension at MTP joints' },
        'Peroneus tertius': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle dorsiflexion, foot eversion' },

        // 9. PERONEAL NERVE (SUPERFICIAL PERONEAL)
        'Fibularis longus': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle plantarflexion, foot eversion' },
        'Fibularis brevis': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Foot eversion' }
    },

    initializeDisplay() {
        this.displayMuscles('lower');
    },

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
    },

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
    },

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
    },

    updateQuizRegion() {
        const selected = document.querySelector('input[name="quiz-region"]:checked');
        this.quizRegion = selected ? selected.value : 'both';
    },

    switchAnatomy(region) {
        this.currentRegion = region;
        this.displayMuscles(region);

        // Update button states
        document.querySelectorAll('.region-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-region="${region}"]`).classList.add('active');
    },

    displayMuscles(region) {
        const display = document.getElementById('muscle-anatomy-display');
        console.log('🧬 displayMuscles called with region:', region);
        console.log('🧬 Display element found:', !!display);
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
    },

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
    },

    setAnatomyType(type) {
        this.currentAnatomyType = type;

        document.querySelectorAll('.anatomy-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-anatomy="${type}"]`).classList.add('active');

        this.displayMuscles(this.currentRegion);
    },

    setQuizMode(mode) {
        this.quizMode = mode;

        document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    },

    startInlineQuiz() {
        this.inlineQuizActive = true;

        document.getElementById('inline-quiz-area').style.display = 'block';
        document.querySelector('.quiz-start-btn').style.display = 'none';
        document.querySelector('.quiz-stop-btn').style.display = 'block';

        this.generateInlineQuestion();
    },

    stopInlineQuiz() {
        this.inlineQuizActive = false;

        document.getElementById('inline-quiz-area').style.display = 'none';
        document.querySelector('.quiz-start-btn').style.display = 'block';
        document.querySelector('.quiz-stop-btn').style.display = 'none';
    },

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
        const anatomyType = this.quizContentTypes[Math.floor(Math.random() * this.quizContentTypes.length)];

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
    },

    getCorrectAnswer(muscle) {
        const muscleData = this.muscleDatabase[muscle];
        switch(this.currentAnatomyType) {
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
    },

    generateQuizOptions(muscle, correctAnswer) {
        // Filter muscles to only include those from the same region (UE or LE) as the question muscle
        const muscleRegion = this.muscleDatabase[muscle].region;
        const allMuscles = Object.keys(this.muscleDatabase)
            .filter(muscleName => this.muscleDatabase[muscleName].region === muscleRegion);
        const distractors = [];

        while (distractors.length < 3) {
            const randomMuscle = allMuscles[Math.floor(Math.random() * allMuscles.length)];
            if (randomMuscle !== muscle) {
                const distractorAnswer = this.getCorrectAnswer(randomMuscle);
                if (!distractors.includes(distractorAnswer) && distractorAnswer !== correctAnswer) {
                    distractors.push(distractorAnswer);
                }
            }
        }

        const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
        return options;
    },

    selectQuizOption(answer) {
        document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        event.target.closest('.quiz-option').classList.add('selected');

        this.selectedQuizAnswer = answer;
        document.getElementById('check-multiple-btn').disabled = false;
    },

    getAnatomyLabel() {
        switch(this.currentAnatomyType) {
            case 'nerve': return 'peripheral nerve';
            case 'roots': return 'nerve roots';
            case 'cord': return 'brachial plexus cord/trunk';
            case 'actions': return 'primary actions';
            default: return 'nerve supply';
        }
    },

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
    },

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
    },

    stopMuscleTest() {
        this.testData.isActive = false;
        const modal = document.getElementById('muscle-test-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

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
        const correctAnswer = this.getCorrectAnswer(muscle);
        const options = this.generateQuizOptions(muscle, correctAnswer);

        document.getElementById('question-text').textContent = `What is the ${this.getAnatomyLabel()} of ${muscle}?`;

        const choicesDiv = document.getElementById('answer-choices');
        choicesDiv.innerHTML = options.map((option, index) => `
            <div class="quiz-option" onclick="MuscleAnatomy.submitTestAnswer('${option}', '${correctAnswer}', '${muscle}')">
                <input type="radio" name="test-choice" id="test-option-${index}" value="${option}">
                <label for="test-option-${index}">${option}</label>
            </div>
        `).join('');

        document.getElementById('answer-feedback').style.display = 'none';
    },

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
    },

    nextQuestion() {
        this.generateNextQuestion();
    },

    updateTestStats() {
        const questionsElem = document.getElementById('questions-answered');
        const accuracyElem = document.getElementById('current-accuracy');

        if (questionsElem) questionsElem.textContent = `Questions: ${this.testData.questionsAnswered}`;

        if (accuracyElem) {
            const accuracy = this.testData.questionsAnswered > 0 ?
                Math.round((this.testData.correctAnswers / this.testData.questionsAnswered) * 100) : 0;
            accuracyElem.textContent = `Accuracy: ${accuracy}%`;
        }
    },

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
        revealAllBtn.classList.toggle('active', !anyVisible);
        revealAllBtn.textContent = anyVisible ? '📖 Reveal All' : '📖 Hide All';

        console.log('🔍 Global reveal all:', !anyVisible ? 'shown' : 'hidden');
    },

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
        typeBtn.classList.toggle('active', !anyTypeVisible);

        // Update button text based on type
        const buttonTexts = {
            nerve: anyTypeVisible ? '🔌 All Nerves' : '🔌 Hide Nerves',
            roots: anyTypeVisible ? '🌿 All Roots' : '🌿 Hide Roots',
            cord: anyTypeVisible ? '🕸️ All Cords/Trunks' : '🕸️ Hide Cords/Trunks',
            actions: anyTypeVisible ? '💪 All Actions' : '💪 Hide Actions'
        };

        typeBtn.textContent = buttonTexts[type];

        console.log(`🔍 Global reveal ${type}:`, !anyTypeVisible ? 'shown' : 'hidden');
    }
};

console.log('✅ Complete MuscleAnatomy object loaded - 71 muscles');
