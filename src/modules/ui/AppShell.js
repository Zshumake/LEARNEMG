import logger from '../../utils/Logger.js';
import { ErnestIcon } from '../../utils/ErnestIcon.js';
export class AppShell {
    constructor() {
        this.containerId = 'app-root';
    }

    render() {
        const root = document.getElementById(this.containerId);
        if (!root) {
            logger.error(`AppShell: Container #${this.containerId} not found`);
            return;
        }

        // Add class to hide floater on start page
        document.body.classList.add('on-start-page');

        const personaId = (window.appComponents && window.appComponents.ernestAI) ? window.appComponents.ernestAI.currentPersonaId : 'ernest';
        const personaName = personaId.toUpperCase();

        root.innerHTML = `
            <!-- Initial Loading State / Splash -->
            <div id="pgy-selection" class="app-welcome-screen">
                <div class="app-main-container">
                    <div class="app-logo-container">
                        <img src="images/ui/modern_edx_app_icon.png" alt="Neuromuscular Mastery" class="app-logo-img">
                    </div>
                    
                    <h1 class="app-main-title">EMG/NCS Mastery System</h1>
                    
                    <div class="app-content-area">
                        <div class="mascot-column">
                            <div id="ernest-character" class="start-page-mascot-stage ernest-container awake">
                                ${this._getMascotSVG()}
                            </div>
                            <div class="ernest-label-pill" id="mascot-persona-label">${personaName}</div>
                        </div>
                        
                        <div class="speech-bubble">
                            <p class="lead-text">${personaId === 'earl' ? "Oh, you're back? Fine. I suppose I can verify your attempts at 'diagnostics.' Ready to be corrected?" : "Doctor, listen up. I'm Ernest. We're here to master the core fundamentals—no shortcuts. Ready to step up?"}</p>
                        </div>
                    </div>
                    
                    <div class="cta-container">
                        <button class="app-cta-button" id="start-journey-btn">BEGIN LEARNING</button>
                    </div>
                </div>
            </div>

            <!-- Progress Dashboard -->
            <div id="progress-dashboard" class="progress-dashboard hidden" style="display: none;">
                <div class="dashboard-header">
                    <h3>📊 Learning Progress Dashboard</h3>
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div class="stat-number" id="completed-modules">0</div>
                            <div class="stat-label">Modules Completed</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="competency-score">0%</div>
                            <div class="stat-label">Competency Progress</div>
                        </div>
                    </div>
                </div>
                <div class="achievement-showcase" id="achievements-display">
                    <!-- Achievement badges will be displayed here -->
                </div>
            </div>

            <!-- Enhanced Journey Learning Board -->
            <div id="learning-board" class="enhanced-journey-board hidden">
                <!-- Journey content will be dynamically generated here -->
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const startBtn = document.getElementById('start-journey-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.transitionToJourney();
            });
        }

        // Ernest Interactive Animation Logic
        const ernestContainer = document.getElementById('ernest-character');
        const speechBubbleText = document.querySelector('.speech-bubble .lead-text');

        if (ernestContainer) {
            // Pick random animation
            const isEarl = (window.appComponents && window.appComponents.ernestAI && window.appComponents.ernestAI.currentPersonaId === 'earl');

            if (isEarl) {
                const earlAnimations = [
                    'earl-glitch-sigh',
                    'earl-angry-scan',
                    'earl-engine-stall',
                    'earl-impatient-hop',
                    'earl-power-surge',
                    'earl-slow-burn'
                ];
                const randomEarlState = earlAnimations[Math.floor(Math.random() * earlAnimations.length)];
                ernestContainer.classList.add(randomEarlState);
            } else {
                const entryStates = ['dancing', 'jumping', 'waving'];
                const randomState = entryStates[Math.floor(Math.random() * entryStates.length)];
                ernestContainer.classList.add(randomState);

                // Set corresponding dialogue and gestures for Ernest
                if (speechBubbleText) {
                    if (randomState === 'dancing') {
                        ernestContainer.setAttribute('data-gesture-l', 'palm');
                        ernestContainer.setAttribute('data-gesture-r', 'palm');
                        speechBubbleText.innerHTML = "Rhythm and recruitment! If you can't keep the beat, you can't read a MUAP. Click and let's get into the flow.";
                    } else if (randomState === 'jumping') {
                        ernestContainer.setAttribute('data-gesture-l', 'fist');
                        ernestContainer.setAttribute('data-gesture-r', 'fist');
                        speechBubbleText.innerHTML = "High amplitude, fast rise time! That's the energy I need to see. Ready to recruit some motor units? Click to start.";
                    } else if (randomState === 'waving') {
                        ernestContainer.setAttribute('data-gesture-r', 'palm');
                        speechBubbleText.innerHTML = "Don't just stand there, Doctor. This is the EMG/NCS Mastery System—the gold standard. Click me and let's see if your conduction velocities are up to snuff.";
                    }
                }
            }

            // Playful poke response on click (preserves current dancing/jumping/waving state)
            ernestContainer.addEventListener('click', () => {
                if (speechBubbleText) {
                    const responses = [
                        "Check your ground, that's unstable.",
                        "Latency is the key to life, Doctor. Don't forget it.",
                        "Are you stimulating or just guessing? Match the signal.",
                        "Knowledge is the best filter for noise. Keep studying."
                    ];
                    speechBubbleText.innerHTML = responses[Math.floor(Math.random() * responses.length)];
                }
            });
        }

        // Easter Egg Logic for Persona Switch
        const personaLabel = document.getElementById('mascot-persona-label');
        if (personaLabel) {
            let clickCount = 0;
            personaLabel.addEventListener('click', () => {
                clickCount++;
                if (clickCount >= 7) {
                    logger.log("🌟 Easter Egg Triggered: Switching Persona!");
                    if (window.appComponents && window.appComponents.ernestAI) {
                        window.appComponents.ernestAI.switchPersona();
                    }
                    clickCount = 0;
                }
            });
        }
    }

    transitionToJourney() {
        logger.log('🚀 AppShell: Transitioning to Journey');
        const welcomeScreen = document.getElementById('pgy-selection');
        const learningBoard = document.getElementById('learning-board');

        if (welcomeScreen) {
            welcomeScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transform = 'translateY(-20px)';

            // Remove class to reveal floating avatar
            document.body.classList.remove('on-start-page');

            setTimeout(() => {
                welcomeScreen.classList.add('hidden');

                if (learningBoard) {
                    learningBoard.classList.remove('hidden');
                }

                // Trigger the core logic to load the board
                if (window.appComponents && window.appComponents.candyland) {
                    window.appComponents.candyland.generateLearningBoard('all');
                } else if (typeof window.generateLearningBoard === 'function') {
                    window.generateLearningBoard('all');
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Show dashboard logic if needed
                if (window.updateProgressDashboard) {
                    window.updateProgressDashboard();
                    document.getElementById('progress-dashboard').classList.remove('hidden');
                }

            }, 800);
        }
    }

    _getMascotSVG() {
        const personaId = (window.appComponents && window.appComponents.ernestAI) ? window.appComponents.ernestAI.currentPersonaId : 'ernest';

        if (personaId === 'earl') {
            return `
<svg id="earl-character" class="earl-svg-char earl-container awake" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">${ErnestIcon.getEarlBody()}</svg>`;
        }

        // Default Ernest SVG (Restored to full detailed legacy version)
        return `
        <svg class="ernest-svg-char at-ernest-container awake" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">${ErnestIcon.getErnestBody('cel-shading')}</svg>`;
    }
}
