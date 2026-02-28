/**
 * UI Presenter for the NCS Module
 * Handles all DOM manipulation, HTML rendering, and click events.
 * Relies exclusively on `NCSEngine.js` for logic and state.
 */

export class NCSUI {
    constructor(engine) {
        if (!engine) {
            console.error("NCSUI initialized without an NCSEngine dependency!");
        }
        this.engine = engine;

        // Bind DOM event handlers to maintain `this` context
        this.navigateGallery = this.navigateGallery.bind(this);
        this.showNCSContentType = this.showNCSContentType.bind(this);
        this.showNCSExtremity = this.showNCSExtremity.bind(this);

        // Quiz Handlers
        this.submitLandmarkAnswer = this.submitLandmarkAnswer.bind(this);
        this.nextLandmarkQuestion = this.nextLandmarkQuestion.bind(this);
        this.finishLandmarkQuiz = this.finishLandmarkQuiz.bind(this);
    }

    /* =========================================================================
       NCS Interactive Gallery Toggles
       ========================================================================= */

    navigateGallery(button, direction) {
        const gallery = button.closest('.ncs-image-gallery');
        if (!gallery) return;

        const img = gallery.querySelector('.ncs-gallery-image');
        const imagesAttr = gallery.getAttribute('data-images');
        if (!imagesAttr) return;

        const images = JSON.parse(imagesAttr);
        const counter = gallery.querySelector('.gallery-counter');
        const buttons = gallery.querySelectorAll('button');
        const leftBtn = buttons[0];
        const rightBtn = buttons[1];

        let currentIndex = parseInt(gallery.getAttribute('data-current-index') || '0');
        currentIndex = (currentIndex + direction + images.length) % images.length;
        gallery.setAttribute('data-current-index', currentIndex);

        if (img) img.src = images[currentIndex];
        if (counter) counter.textContent = `${currentIndex + 1} / ${images.length}`;

        if (leftBtn) leftBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        if (rightBtn) rightBtn.style.display = currentIndex === images.length - 1 ? 'none' : 'block';
    }

    showNCSContentType(type) {
        const videosBtn = document.getElementById('ncs-videos-btn');
        const picturesBtn = document.getElementById('ncs-pictures-btn');
        const videosSection = document.getElementById('ncs-videos-section');
        const picturesSection = document.getElementById('ncs-pictures-section');

        if (!videosBtn || !picturesBtn || !videosSection || !picturesSection) return;

        if (type === 'videos') {
            videosBtn.classList.add('active');
            videosBtn.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
            videosBtn.style.color = 'white';
            videosBtn.style.borderColor = 'transparent';
            videosBtn.style.transform = 'scale(1.05)';
            videosBtn.style.boxShadow = '0 8px 25px rgba(20, 184, 166, 0.4)';

            picturesBtn.classList.remove('active');
            picturesBtn.style.background = 'white';
            picturesBtn.style.color = '#64748b';
            picturesBtn.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            picturesBtn.style.transform = '';
            picturesBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';

            videosSection.style.display = 'block';
            picturesSection.style.display = 'none';
        } else if (type === 'pictures') {
            picturesBtn.classList.add('active');
            picturesBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            picturesBtn.style.color = 'white';
            picturesBtn.style.borderColor = 'transparent';
            picturesBtn.style.transform = 'scale(1.05)';
            picturesBtn.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';

            videosBtn.classList.remove('active');
            videosBtn.style.background = 'white';
            videosBtn.style.color = '#64748b';
            videosBtn.style.borderColor = 'rgba(20, 184, 166, 0.3)';
            videosBtn.style.transform = '';
            videosBtn.style.boxShadow = '0 4px 15px rgba(20, 184, 166, 0.15)';

            picturesSection.style.display = 'block';
            videosSection.style.display = 'none';
        }
    }

    showNCSExtremity(extremity) {
        const ueSection = document.getElementById('ncs-ue-pictures');
        const leSection = document.getElementById('ncs-le-pictures');
        const ueBtn = document.getElementById('ncs-ue-btn');
        const leBtn = document.getElementById('ncs-le-btn');

        if (!ueSection || !leSection) return;

        if (extremity === 'ue') {
            ueSection.style.display = 'block';
            leSection.style.display = 'none';
            if (ueBtn) ueBtn.classList.add('active');
            if (leBtn) leBtn.classList.remove('active');
        } else if (extremity === 'le') {
            ueSection.style.display = 'none';
            leSection.style.display = 'block';
            if (ueBtn) ueBtn.classList.remove('active');
            if (leBtn) leBtn.classList.add('active');
        }
    }

    /* =========================================================================
       HTML Renderers (Standard Content)
       ========================================================================= */

    renderVideos(containerId = 'video-grid') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const videos = this.engine.getVideos();
        let html = '';
        videos.forEach(video => {
            html += `
                <div class="video-card">
                    <h3>${video.title}</h3>
                    <div class="video-container">
                        <iframe width="100%" height="100%" src="${video.videoUrl}" 
                                frameborder="0" allowfullscreen 
                                title="${video.description}">
                        </iframe>
                    </div>
                    <div class="video-info">
                        <p><strong>Description:</strong> ${video.description}</p>
                        <p><strong>Recording:</strong> ${video.recording}</p>
                        <p><strong>Stimulation:</strong> ${video.stimulation}</p>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    showBasicPrinciples() {
        const content = `
            <div class="ncs-principles-content">
                <h3 style="color: #2c3e50; margin-bottom: 20px;">⚡ Basic NCS Principles</h3>
                <div style="display: grid; gap: 20px;">
                    <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 10px;">
                        <h4 style="color: #1e40af;">🧠 What is NCS?</h4>
                        <p>Nerve Conduction Studies measure the speed and amplitude of electrical signals traveling along peripheral nerves. This helps us identify nerve damage, compression, or disease.</p>
                    </div>
                    <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 10px;">
                        <h4 style="color: #1e40af;">📊 Key Parameters</h4>
                        <ul>
                            <li><strong>Latency:</strong> Time from stimulus to response onset</li>
                            <li><strong>Amplitude:</strong> Size of the nerve response</li>
                            <li><strong>Conduction Velocity:</strong> Speed of nerve signal</li>
                            <li><strong>Duration:</strong> Length of the response</li>
                        </ul>
                    </div>
                    <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 10px;">
                        <h4 style="color: #1e40af;">🎯 Clinical Applications</h4>
                        <ul>
                            <li>Carpal tunnel syndrome evaluation</li>
                            <li>Peripheral neuropathy assessment</li>
                            <li>Radiculopathy screening</li>
                            <li>Nerve injury localization</li>
                        </ul>
                    </div>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <button onclick="window.returnToPGYNavigator(window.currentPGYLevel || 'pgy2')" 
                            style="background: #6b9f78; color: white; border: none; padding: 12px 24px; 
                                    border-radius: 8px; cursor: pointer; font-weight: 600;">
                        ← Back to Learning Pathway
                    </button>
                </div>
            </div>
        `;
        if (window.showModal) window.showModal('⚡ Basic NCS Principles', content);
    }

    showTechniqueVideos() {
        if (window.showPlaceholderContent) window.showPlaceholderContent(6, 'ncs-technique-videos');
    }

    showLandmarks() {
        if (window.showPlaceholderContent) window.showPlaceholderContent(10, 'ncs-landmarks');
    }

    /* =========================================================================
       NCS Landmarks Quiz UI Flow
       ========================================================================= */

    startLandmarkQuiz(pgyLevel) {
        // Tell Engine to initialize the pool and get the first question
        this.engine.startLandmarkQuiz(pgyLevel);

        // Define the static UI wrapper shell
        const content = `
            <div class="landmark-quiz-container">
                <div class="quiz-header">
                    <div class="quiz-progress">
                        <span id="question-counter">Question 1</span>
                        <div class="progress-bar">
                            <div id="quiz-progress-fill" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="quiz-score">Score: <span id="current-score">0</span></div>
                </div>
                
                <div id="quiz-question-container">
                    <!-- Dynamic Question content injected here by _renderCurrentQuestion() -->
                </div>
                
                <div class="quiz-controls">
                    <button id="quiz-submit" class="quiz-button primary" style="display:none;" onclick="window.appComponents.ncsUI.submitLandmarkAnswer()">Submit Answer</button>
                    <button id="quiz-next" class="quiz-button primary" style="display:none;" onclick="window.appComponents.ncsUI.nextLandmarkQuestion()">Next Question</button>
                    <button id="quiz-finish" class="quiz-button success" style="display:none;" onclick="window.appComponents.ncsUI.finishLandmarkQuiz()">View Results</button>
                </div>
            </div>

            <style>
                .landmark-quiz-container { font-family: Arial, sans-serif; }
                .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
                .quiz-progress { flex: 1; margin-right: 20px; }
                .progress-bar { width: 100%; height: 6px; background: #e0e7e9; border-radius: 3px; margin-top: 5px; }
                #quiz-progress-fill { height: 100%; background: linear-gradient(90deg, #6b9f78, #4a7c59); border-radius: 3px; transition: width 0.3s ease; }
                .quiz-score { font-weight: bold; color: #2d5a3d; }
                .quiz-question { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #e0e7e9; }
                .question-text { font-size: 1.1em; font-weight: 600; color: #2c3e50; margin-bottom: 15px; line-height: 1.4; }
                .nerve-badge { display: inline-block; background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.8em; font-weight: 600; margin-bottom: 15px; }
                .quiz-options { list-style: none; padding: 0; margin: 0; }
                .quiz-options li { margin-bottom: 12px; }
                .quiz-options label { display: flex; align-items: center; padding: 12px 15px; background: #f8f9fa; border: 2px solid transparent; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; }
                .quiz-options label:hover { background: #e9ecef; border-color: #6b9f78; }
                .quiz-options input[type="radio"] { margin-right: 12px; }
                .quiz-options label.correct { background: #d4edda; border-color: #28a745; color: #155724; }
                .quiz-options label.incorrect { background: #f8d7da; border-color: #dc3545; color: #721c24; }
                .quiz-explanation { background: #e7f3ff; border-left: 4px solid #3498db; padding: 15px; margin-top: 15px; border-radius: 0 8px 8px 0; }
                .quiz-button { padding: 12px 25px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
                .quiz-button.primary { background: #3498db; color: white; }
                .quiz-button.primary:hover { background: #2980b9; }
                .quiz-button.success { background: #27ae60; color: white; }
                .quiz-button.success:hover { background: #229954; }
                .quiz-controls { text-align: center; margin-top: 20px; }
                .quiz-final-score { text-align: center; padding: 30px; }
                .score-excellent { color: #27ae60; }
                .score-good { color: #f39c12; }
                .score-needs-work { color: #e74c3c; }
            </style>
        `;

        if (window.showModal) window.showModal('📍 NCS Landmarks Quiz', content);

        // Inject dynamic state
        this._renderCurrentQuestion();
    }

    _renderCurrentQuestion() {
        const question = this.engine.getCurrentQuestion();
        const progress = this.engine.getQuizProgress();
        if (!question) return;

        const container = document.getElementById('quiz-question-container');
        if (!container) return;

        container.innerHTML = `
            <div class="quiz-question">
                <div class="nerve-badge">${question.nerve.toUpperCase()} NERVE</div>
                <div class="question-text">${question.question}</div>
                <ul class="quiz-options">
                    ${question.options.map((option, index) => `
                        <li>
                            <label>
                                <input type="radio" name="quiz-answer" value="${index}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        // Update progress UI
        const counterEl = document.getElementById('question-counter');
        const progressFillEl = document.getElementById('quiz-progress-fill');
        const scoreEl = document.getElementById('current-score');

        if (counterEl) counterEl.textContent = `Question ${progress.current} of ${progress.total}`;
        if (progressFillEl) progressFillEl.style.width = `${(progress.current / progress.total) * 100}%`;
        if (scoreEl) scoreEl.textContent = `${this.engine.getCurrentScore()}/${progress.total}`;

        // Reset Buttons
        document.getElementById('quiz-submit').style.display = 'inline-block';
        document.getElementById('quiz-submit').disabled = true;
        document.getElementById('quiz-next').style.display = 'none';
        document.getElementById('quiz-finish').style.display = 'none';

        // Mount Listeners to Radio Buttons
        const radioBtns = document.querySelectorAll('input[name="quiz-answer"]');
        radioBtns.forEach(radio => {
            radio.addEventListener('change', () => {
                document.getElementById('quiz-submit').disabled = false;
            });
        });
    }

    submitLandmarkAnswer() {
        const selectedRadio = document.querySelector('input[name="quiz-answer"]:checked');
        if (!selectedRadio) {
            alert('Please select an answer.');
            return;
        }

        const selectedIndex = parseInt(selectedRadio.value);

        // Delegate evaluation to Engine
        const result = this.engine.evaluateQuizAnswer(selectedIndex);
        if (!result) return;

        // Update Score UI
        const scoreEl = document.getElementById('current-score');
        if (scoreEl) scoreEl.textContent = `${result.updatedScore}/${this.engine.getQuizProgress().total}`;

        // Update Option Coloring
        const labels = document.querySelectorAll('.quiz-options label');
        if (labels[result.correctIndex]) {
            labels[result.correctIndex].classList.add('correct');
        }
        if (!result.isCorrect && labels[selectedIndex]) {
            labels[selectedIndex].classList.add('incorrect');
        }

        // Disable radios
        document.querySelectorAll('input[name="quiz-answer"]').forEach(r => r.disabled = true);

        // Render Explanation
        const questionContainer = document.querySelector('.quiz-question');
        if (questionContainer) {
            questionContainer.innerHTML += `
                <div class="quiz-explanation">
                    <strong>Explanation:</strong> ${result.explanation}
                </div>
            `;
        }

        // Setup next step buttons
        document.getElementById('quiz-submit').style.display = 'none';
        if (this.engine.hasNextQuestion()) {
            document.getElementById('quiz-next').style.display = 'inline-block';
        } else {
            document.getElementById('quiz-finish').style.display = 'inline-block';
        }
    }

    nextLandmarkQuestion() {
        this.engine.advanceToNextQuestion();
        this._renderCurrentQuestion();
    }

    finishLandmarkQuiz() {
        const results = this.engine.getFinalResults();
        if (!results) return;

        const content = `
            <div class="quiz-final-score">
                <h3>🎯 Quiz Complete!</h3>
                <div class="score-${results.category}" style="font-size: 2em; font-weight: bold; margin: 20px 0;">
                    ${results.score}/${results.total} (${results.percentage}%)
                </div>
                <p>${results.feedback}</p>
                
                <div class="modal-features">
                    <h4>📊 Performance Summary:</h4>
                    <ul>
                        <li><strong>Total Questions:</strong> ${results.total}</li>
                        <li><strong>Correct Answers:</strong> ${results.score}</li>
                        <li><strong>Accuracy:</strong> ${results.percentage}%</li>
                        <li><strong>Level:</strong> ${results.pgyLevel.toUpperCase()}</li>
                    </ul>
                </div>
                
                <p><strong>Next Steps:</strong> Review the NCS Landmarks tab for detailed electrode placement information and continue practicing with different PGY levels.</p>
            </div>
        `;

        if (window.showModal) window.showModal('📍 NCS Landmarks Quiz Results', content);
    }

    /* =========================================================================
       Protocol Modals (Read-Only HTML dumps)
       ========================================================================= */

    showRadiculopathyProtocols() {
        const content = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #4a6d52; margin-bottom: 10px;">⚡ NCS Protocols for Radiculopathy</h2>
                    <p style="color: #6b9f78; font-size: 1.1em;">Level 2 Skills - Why and how we perform NCS for radiculopathy</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Key Principle</h3>
                    <p style="color: #9a3412; font-size: 1.1em; font-weight: 500;">
                        NCS are typically NORMAL in radiculopathy (nerve root lesion is proximal to NCS recording sites). 
                        We perform them to EXCLUDE peripheral nerve disorders that can mimic radiculopathy.
                    </p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #dc2626; margin-bottom: 20px;">🔍 Why NCS in Suspected Radiculopathy?</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #16a34a;">
                            <h5 style="color: #15803d; margin-bottom: 15px;">✅ What NCS Should Show:</h5>
                            <ul style="color: #166534; line-height: 1.6;">
                                <li>Normal distal latencies</li>
                                <li>Normal conduction velocities</li>
                                <li>Normal amplitudes</li>
                                <li>Normal F-waves (unless severe)</li>
                            </ul>
                        </div>
                        <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #dc2626;">
                            <h5 style="color: #991b1b; margin-bottom: 15px;">❌ Red Flags (Not Radiculopathy):</h5>
                            <ul style="color: #991b1b; line-height: 1.6;">
                                <li>Prolonged distal latencies → Entrapment</li>
                                <li>Slow velocities → Neuropathy</li>
                                <li>Low amplitudes → Axonal process</li>
                                <li>Absent responses → Severe nerve damage</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #2563eb; margin-bottom: 20px;">📋 Recommended NCS Protocol</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                        <div>
                            <h5 style="color: #1d4ed8; margin-bottom: 15px; padding: 10px; background: #dbeafe; border-radius: 8px;">Cervical Radiculopathy</h5>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Motor Studies:</p>
                                <ul style="color: #6b7280; line-height: 1.6; margin-bottom: 15px;">
                                    <li>Median motor (APB)</li>
                                    <li>Ulnar motor (ADM)</li>
                                    <li>Radial motor (EIP) if indicated</li>
                                </ul>
                                <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Sensory Studies:</p>
                                <ul style="color: #6b7280; line-height: 1.6;">
                                    <li>Median sensory</li>
                                    <li>Ulnar sensory</li>
                                    <li>Radial sensory</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h5 style="color: #1d4ed8; margin-bottom: 15px; padding: 10px; background: #dbeafe; border-radius: 8px;">Lumbar Radiculopathy</h5>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Motor Studies:</p>
                                <ul style="color: #6b7280; line-height: 1.6; margin-bottom: 15px;">
                                    <li>Peroneal motor (EDB)</li>
                                    <li>Tibial motor (AH)</li>
                                    <li>H-reflex (S1 root function)</li>
                                </ul>
                                <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Sensory Studies:</p>
                                <ul style="color: #6b7280; line-height: 1.6;">
                                    <li>Sural sensory</li>
                                    <li>Superficial peroneal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="window.closeModal()" 
                            style="background: #6b7280; color: white; border: none; padding: 15px 30px; 
                                    border-radius: 10px; font-size: 1.1em; cursor: pointer;">
                        ← Back to Competencies
                    </button>
                </div>
            </div>
        `;
        if (window.showModal) window.showModal('NCS Protocols for Radiculopathy', content);
    }

    showNeuropathyProtocols() {
        const content = `
            <div style="max-width: 900px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #4a6d52; margin-bottom: 10px;">⚡ NCS Protocols for Peripheral Neuropathy</h2>
                    <p style="color: #6b9f78; font-size: 1.1em;">Level 2 Skills - Systematic approach to neuropathy evaluation</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Key Principle</h3>
                    <p style="color: #9a3412; font-size: 1.1em; font-weight: 500;">
                        NCS are the PRIMARY tool for diagnosing peripheral neuropathy. They detect changes before clinical symptoms 
                        and help classify neuropathy type (axonal vs demyelinating) to guide treatment.
                    </p>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #dc2626; margin-bottom: 20px;">📋 Standard Neuropathy NCS Protocol</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 20px;">
                        <div style="background: #dbeafe; padding: 20px; border-radius: 10px;">
                            <h5 style="color: #1d4ed8; margin-bottom: 15px;">🏃‍♂️ Motor Studies</h5>
                            <ul style="color: #1e40af; line-height: 1.6;">
                                <li><strong>Median:</strong> Wrist → Elbow stimulation</li>
                                <li><strong>Ulnar:</strong> Wrist → Below elbow → Above elbow</li>
                                <li><strong>Peroneal:</strong> Ankle → Fibular head</li>
                                <li><strong>Tibial:</strong> Ankle stimulation</li>
                            </ul>
                            <p style="color: #1e40af; font-size: 0.9em; margin-top: 10px; font-style: italic;">
                                Measure: Amplitude, latency, velocity
                            </p>
                        </div>
                        <div style="background: #ecfdf5; padding: 20px; border-radius: 10px;">
                            <h5 style="color: #059669; margin-bottom: 15px;">👋 Sensory Studies</h5>
                            <ul style="color: #047857; line-height: 1.6;">
                                <li><strong>Median:</strong> Digit 2 or 3 → Wrist</li>
                                <li><strong>Ulnar:</strong> Digit 5 → Wrist</li>
                                <li><strong>Radial:</strong> Thumb → Forearm</li>
                                <li><strong>Sural:</strong> Lateral foot → Calf</li>
                            </ul>
                            <p style="color: #047857; font-size: 0.9em; margin-top: 10px; font-style: italic;">
                                Most sensitive: Often abnormal first
                            </p>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="window.closeModal()" 
                            style="background: #6b7280; color: white; border: none; padding: 15px 30px; 
                                    border-radius: 10px; font-size: 1.1em; cursor: pointer;">
                        ← Back to Competencies
                    </button>
                </div>
            </div>
        `;
        if (window.showModal) window.showModal('NCS Protocols for Peripheral Neuropathy', content);
    }
}
