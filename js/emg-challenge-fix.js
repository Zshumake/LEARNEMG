// EMGChallenge fix - standalone working version
console.log('🚀 Loading EMGChallenge fix...');

// Complete EMGChallenge object with all required methods - uses existing EMG challenge interface
window.EMGChallenge = {
    selectedTypes: ['root', 'trunk', 'cord', 'peripheral'],
    currentCase: null,

    toggleQuestionType: function(type) {
        console.log('🔍 DEBUG: toggleQuestionType called with:', type);
        const element = document.querySelector(`[data-type="${type}"]`);
        if (element) {
            if (this.selectedTypes.includes(type)) {
                this.selectedTypes = this.selectedTypes.filter(t => t !== type);
                element.classList.remove('active');
                element.style.opacity = '0.6';
                element.style.transform = 'scale(0.98)';
                element.style.boxShadow = 'none';
            } else {
                this.selectedTypes.push(type);
                element.classList.add('active');
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
                element.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                element.style.backgroundColor = '#22c55e';
                element.style.borderColor = '#16a34a';
            }
            this.updateLaunchButton();
        }
    },

    updateLaunchButton: function() {
        const launchBtn = document.querySelector('.launch-challenge-btn');
        if (launchBtn) {
            if (this.selectedTypes.length > 0) {
                launchBtn.disabled = false;
                launchBtn.textContent = '🚀 Launch EMG Challenge';
            } else {
                launchBtn.disabled = true;
                launchBtn.textContent = 'At least one question type must be selected';
            }
        }
    },

    startChallenge: function() {
        console.log('🚀 EMG Challenge startChallenge() called!');
        if (this.selectedTypes.length === 0) {
            alert('Please select at least one question type to begin the challenge.');
            return;
        }

        // Prevent modal from closing during challenge
        window.challengeRunning = true;

        // Use the existing EMG challenge interface structure from the modal content
        const settingsDiv = document.getElementById('emg-challenge-settings');
        const activeDiv = document.getElementById('emg-challenge-active');

        if (settingsDiv && activeDiv) {
            console.log('✅ Found existing EMG challenge interface, switching to active mode');
            settingsDiv.style.display = 'none';
            activeDiv.style.display = 'block';
            this.generateNewCase();
        } else {
            console.error('❌ EMG challenge interface elements not found');
            alert('Challenge interface could not be loaded. Please try again.');
        }

        // Prevent event bubbling that might close the modal
        if (event) {
            event.stopPropagation();
        }
        return false;
    },

    // Basic lesion database for EMG challenge
    lesionDatabase: {
        'C6 Radiculopathy': {
            abnormalMuscles: ['Biceps', 'Brachioradialis', 'Deltoid', 'Infraspinatus'],
            normalMuscles: ['Triceps', 'First Dorsal Interosseous', 'Abductor Pollicis Brevis', 'Flexor Carpi Ulnaris'],
            scenario: 'A 45-year-old presents with neck pain radiating to the thumb-side of the arm'
        },
        'C8 Radiculopathy': {
            abnormalMuscles: ['First Dorsal Interosseous', 'Abductor Pollicis Brevis', 'Flexor Digitorum Profundus', 'Flexor Carpi Ulnaris'],
            normalMuscles: ['Biceps', 'Triceps', 'Deltoid', 'Brachioradialis'],
            scenario: 'A 52-year-old presents with numbness and weakness affecting the pinky side of the hand'
        },
        'Median Nerve (Carpal Tunnel)': {
            abnormalMuscles: ['Abductor Pollicis Brevis', 'Opponens Pollicis', 'Flexor Pollicis Brevis', 'Lumbrical 1&2'],
            normalMuscles: ['First Dorsal Interosseous', 'Abductor Digiti Minimi', 'Triceps', 'Biceps'],
            scenario: 'A 38-year-old office worker with nighttime hand numbness and positive Tinel\'s sign'
        },
        'Ulnar Nerve (Cubital Tunnel)': {
            abnormalMuscles: ['First Dorsal Interosseous', 'Abductor Digiti Minimi', 'Flexor Carpi Ulnaris', 'Flexor Digitorum Profundus 4&5'],
            normalMuscles: ['Abductor Pollicis Brevis', 'Triceps', 'Biceps', 'Brachioradialis'],
            scenario: 'A 41-year-old with elbow pain and weakness in grip strength, especially with pincer grasp'
        },
        'Radial Nerve (Spiral Groove)': {
            abnormalMuscles: ['Triceps', 'Extensor Carpi Radialis', 'Extensor Digitorum', 'Extensor Pollicis Longus'],
            normalMuscles: ['Biceps', 'First Dorsal Interosseous', 'Abductor Pollicis Brevis', 'Flexor Carpi Ulnaris'],
            scenario: 'A 35-year-old with wrist drop after prolonged arm compression during sleep'
        }
    },

    generateNewCase: function() {
        console.log('📝 Generating new EMG case...');

        // Select random lesion from database
        const lesionNames = Object.keys(this.lesionDatabase);
        const selectedLesion = lesionNames[Math.floor(Math.random() * lesionNames.length)];
        const lesionData = this.lesionDatabase[selectedLesion];

        // Store current case
        this.currentCase = {
            correctAnswer: selectedLesion,
            lesionData: lesionData
        };

        // Update abnormal muscles list
        const abnormalList = document.getElementById('challenge-abnormal-muscles');
        if (abnormalList) {
            abnormalList.innerHTML = '';
            lesionData.abnormalMuscles.forEach(muscle => {
                const li = document.createElement('li');
                li.textContent = muscle;
                li.style.marginBottom = '8px';
                abnormalList.appendChild(li);
            });
        }

        // Update normal muscles list
        const normalList = document.getElementById('challenge-normal-muscles');
        if (normalList) {
            normalList.innerHTML = '';
            lesionData.normalMuscles.forEach(muscle => {
                const li = document.createElement('li');
                li.textContent = muscle;
                li.style.marginBottom = '8px';
                normalList.appendChild(li);
            });
        }

        // Update scenario
        const scenarioDiv = document.getElementById('challenge-scenario-text');
        if (scenarioDiv) {
            scenarioDiv.textContent = lesionData.scenario;
        }

        // Generate answer options
        const optionsContainer = document.getElementById('challenge-answer-options');
        if (optionsContainer) {
            // Create distractors
            const distractors = lesionNames.filter(name => name !== selectedLesion)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            const allOptions = [selectedLesion, ...distractors].sort(() => 0.5 - Math.random());

            optionsContainer.innerHTML = '';
            allOptions.forEach(option => {
                const button = document.createElement('button');
                button.className = 'emg-answer-option';
                button.textContent = option;
                button.onclick = () => this.selectAnswer(option);
                button.style.cssText = `
                    display: block;
                    width: 100%;
                    padding: 18px 25px;
                    margin-bottom: 0px;
                    background: white;
                    border: 2px solid rgba(251, 191, 36, 0.3);
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: left;
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: #64748b;
                    box-shadow: 0 3px 12px rgba(251, 191, 36, 0.1);
                `;
                button.onmouseover = () => {
                    if (!button.classList.contains('selected')) {
                        button.style.borderColor = 'rgba(251, 191, 36, 0.6)';
                        button.style.backgroundColor = 'rgba(251, 191, 36, 0.05)';
                        button.style.transform = 'translateX(5px)';
                        button.style.boxShadow = '0 5px 20px rgba(251, 191, 36, 0.2)';
                    }
                };
                button.onmouseout = () => {
                    if (!button.classList.contains('selected')) {
                        button.style.borderColor = 'rgba(251, 191, 36, 0.3)';
                        button.style.backgroundColor = 'white';
                        button.style.transform = '';
                        button.style.boxShadow = '0 3px 12px rgba(251, 191, 36, 0.1)';
                    }
                };
                optionsContainer.appendChild(button);
            });
        }

        // Reset submit button
        const submitBtn = document.getElementById('challenge-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
        }

        console.log('✅ EMG case generated:', selectedLesion);
    },

    selectAnswer: function(answer) {
        console.log('📝 Answer selected:', answer);
        this.currentCase.selectedAnswer = answer;

        // Visual feedback - highlight selected answer
        const allButtons = document.querySelectorAll('.emg-answer-option');
        allButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.borderColor = 'rgba(251, 191, 36, 0.3)';
            btn.style.backgroundColor = 'white';
            btn.style.fontWeight = '600';
            btn.style.color = '#64748b';
            btn.style.transform = '';
            btn.style.boxShadow = '0 3px 12px rgba(251, 191, 36, 0.1)';
        });

        // Find and highlight the selected button
        allButtons.forEach(btn => {
            if (btn.textContent === answer) {
                btn.classList.add('selected');
                btn.style.borderColor = 'transparent';
                btn.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
                btn.style.color = 'white';
                btn.style.fontWeight = '700';
                btn.style.transform = 'translateX(8px)';
                btn.style.boxShadow = '0 6px 25px rgba(251, 191, 36, 0.4)';
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
        console.log('✅ Submit answer called');
        if (!this.currentCase || !this.currentCase.selectedAnswer) {
            alert('Please select an answer first.');
            return;
        }

        const isCorrect = this.currentCase.selectedAnswer === this.currentCase.correctAnswer;

        // Show feedback
        if (isCorrect) {
            alert(`🎉 Correct! The muscle pattern is consistent with ${this.currentCase.correctAnswer}.`);
        } else {
            alert(`❌ Incorrect. The correct answer is ${this.currentCase.correctAnswer}. Your answer: ${this.currentCase.selectedAnswer}`);
        }

        // Show next button
        const nextBtn = document.getElementById('challenge-next-btn');
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
        }

        // Disable submit button
        const submitBtn = document.getElementById('challenge-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
        }
    },

    nextCase: function() {
        console.log('➡️ Next case called');
        this.generateNewCase();

        // Reset buttons
        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');

        if (submitBtn) submitBtn.disabled = true;
        if (nextBtn) nextBtn.style.display = 'none';
    },

    backToSettings: function() {
        console.log('⬅️ Back to settings called');

        // Clear challenge running flag
        window.challengeRunning = false;

        // Use the existing EMG challenge interface structure
        const settingsDiv = document.getElementById('emg-challenge-settings');
        const activeDiv = document.getElementById('emg-challenge-active');

        if (settingsDiv && activeDiv) {
            console.log('✅ Returning to EMG challenge settings');
            activeDiv.style.display = 'none';
            settingsDiv.style.display = 'block';

            // Hide next button
            const nextBtn = document.getElementById('challenge-next-btn');
            if (nextBtn) {
                nextBtn.style.display = 'none';
            }
        } else {
            console.log('⚠️ Challenge interface elements not found, using fallback');
            // Fallback: just reload the page content
            const contentArea = document.querySelector('.modal-content-area') ||
                               document.querySelector('.interactive-content') ||
                               document.querySelector('[id*="modal-content"]');

            if (contentArea) {
                contentArea.innerHTML = '<div style="padding: 40px; text-align: center;"><h3>🔄 Reloading content...</h3><p>Please close this modal and reopen the Muscle Localization module.</p></div>';
            }
        }
    }
};

console.log('✅ EMGChallenge fix loaded successfully');