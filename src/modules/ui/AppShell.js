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
            const ai = window.appComponents && window.appComponents.ernestAI;
            const isEarl = !!(ai && ai.currentPersonaId === 'earl');
            const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

            // --- Welcome-screen voices ---
            const ernestEntry = [
                "Fresh electrodes, big dreams, zero artifact. Let's make some gorgeous waveforms!",
                "Good news, Doctor — your conduction velocity for showing up is excellent. Let's build on it!",
                "I'm twelve milliamps of pure optimism. Plug in and let's learn!",
                "Side effects of this app may include actually enjoying EMG. Worth it!",
                "Needle's sharp, gain's set, vibes are immaculate. Let's localize something!"
            ];
            const ernestPokes = [
                "Ack! That's my STIM button, not a doorbell. ...Okay, that was kinda fun.",
                "Ooh, a free nerve stim! You're a natural, Doctor.",
                "Careful, I'm calibrated. Roughly. We'll round up!",
                "Poke logged, amplitude noted. Ten out of ten — would be poked again.",
                "That tickled my F-waves! Let's channel that energy into studying, yeah?"
            ];
            const earlEntry = [
                "Oh good, you're here. And I was so close to a relaxing day.",
                "Let me guess — you call a CMAP a 'squiggle.' We have so much work to do.",
                "I'm Earl. I'm contractually required to help you. Emphasis on 'contractually.'",
                "Touch nothing, ground your patient, and stop breathing on my electrodes.",
                "I reviewed your localization skills. I aged a decade. Let's get this over with."
            ];
            const earlPokes = [
                "Did you just poke me? Bold, for someone who can't find the fibular head.",
                "I'm a diagnostic instrument, not your stress toy. Hands off.",
                "Every time you poke me, a SNAP somewhere goes axonal. Quit it.",
                "Astonishing. You can press a button but not calculate a conduction velocity.",
                "Poke me again and I'm documenting reduced recruitment — of my patience."
            ];

            if (isEarl) {
                const earlAnimations = [
                    'earl-glitch-sigh', 'earl-angry-scan', 'earl-engine-stall',
                    'earl-impatient-hop', 'earl-power-surge', 'earl-slow-burn'
                ];
                ernestContainer.classList.add(pick(earlAnimations));
                if (speechBubbleText) speechBubbleText.innerHTML = pick(earlEntry);
            } else {
                const randomState = pick(['dancing', 'jumping', 'waving']);
                ernestContainer.classList.add(randomState);
                // hand gestures stay tied to the pose
                if (randomState === 'dancing') {
                    ernestContainer.setAttribute('data-gesture-l', 'palm');
                    ernestContainer.setAttribute('data-gesture-r', 'palm');
                } else if (randomState === 'jumping') {
                    ernestContainer.setAttribute('data-gesture-l', 'fist');
                    ernestContainer.setAttribute('data-gesture-r', 'fist');
                } else if (randomState === 'waving') {
                    ernestContainer.setAttribute('data-gesture-r', 'palm');
                }
                if (speechBubbleText) speechBubbleText.innerHTML = pick(ernestEntry);
            }

            // Poke response on click — stays in character for whoever's on screen
            ernestContainer.addEventListener('click', () => {
                if (speechBubbleText) speechBubbleText.innerHTML = pick(isEarl ? earlPokes : ernestPokes);
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
