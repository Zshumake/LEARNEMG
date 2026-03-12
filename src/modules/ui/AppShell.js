export class AppShell {
    constructor() {
        this.containerId = 'app-root';
    }

    render() {
        const root = document.getElementById(this.containerId);
        if (!root) {
            console.error(`AppShell: Container #${this.containerId} not found`);
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
                const entryStates = ['sleeping', 'dancing', 'jumping', 'waving'];
                const randomState = entryStates[Math.floor(Math.random() * entryStates.length)];
                ernestContainer.classList.add(randomState);

                // Set corresponding dialogue and gestures for Ernest
                if (speechBubbleText) {
                    if (randomState === 'sleeping') {
                        speechBubbleText.innerHTML = "Zzz... *Snores in 60Hz hum*... Wake up, Doctor. The clinic waitlist is growing. Click to begin.";
                    } else if (randomState === 'dancing') {
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

            // Wake up / resolve action on click
            ernestContainer.addEventListener('click', () => {
                if (ernestContainer.classList.contains('sleeping')) {
                    ernestContainer.classList.remove('sleeping');
                    ernestContainer.classList.add('awake');
                    ernestContainer.removeAttribute('data-gesture-l');
                    ernestContainer.removeAttribute('data-gesture-r');
                    if (speechBubbleText) {
                        speechBubbleText.innerHTML = "Good. You're awake. Focused H&P is done? Good. I'm Ernest. Let's start dissecting these waveforms. No noise, just signal. Ready?";
                    }
                } else {
                    // Playful poke response, without breaking his current dancing/jumping state
                    if (speechBubbleText) {
                        const responses = [
                            "Check your ground, that's unstable.",
                            "Latency is the key to life, Doctor. Don't forget it.",
                            "Are you stimulating or just guessing? Match the signal.",
                            "Knowledge is the best filter for noise. Keep studying."
                        ];
                        speechBubbleText.innerHTML = responses[Math.floor(Math.random() * responses.length)];
                    }
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
                    console.log("🌟 Easter Egg Triggered: Switching Persona!");
                    if (window.appComponents && window.appComponents.ernestAI) {
                        window.appComponents.ernestAI.switchPersona();
                    }
                    clickCount = 0;
                }
            });
        }
    }

    transitionToJourney() {
        console.log('🚀 AppShell: Transitioning to Journey');
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
<svg id="earl-character" class="earl-svg-char earl-container awake" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6a736e" />
            <stop offset="50%" stop-color="#555d59" />
            <stop offset="100%" stop-color="#3b423f" />
        </linearGradient>

        <linearGradient id="screen-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4c5c44" />
            <stop offset="100%" stop-color="#3a4734" />
        </linearGradient>

        <linearGradient id="gloss-grad" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>

        <clipPath id="left-eye-clip">
            <path d="M 185 268 Q 210 280 235 268 L 235 310 L 185 310 Z" />
        </clipPath>
        <clipPath id="right-eye-clip">
            <path d="M 265 268 Q 290 280 315 268 L 315 310 L 265 310 Z" />
        </clipPath>
    </defs>

    <g class="earl-z-group" fill="#88dded" font-family="Comic Sans MS, Marker Felt, sans-serif" font-weight="bold" font-size="30" opacity="0">
        <text class="earl-z1" x="320" y="150">Z</text>
        <text class="earl-z2" x="360" y="110">z</text>
        <text class="earl-z3" x="390" y="80">z</text>
    </g>

    <g id="earl-prongs">
        <g class="earl-prong earl-prong-left">
            <rect x="180" y="40" width="16" height="80" fill="#787d7a" stroke="#1a1c1a" stroke-width="4"/>
            <circle cx="188" cy="40" r="12" fill="#787d7a" stroke="#1a1c1a" stroke-width="4"/>
            <rect x="182" y="45" width="4" height="70" fill="#ffffff" opacity="0.3"/>
            <path d="M 182 50 Q 186 45 194 52 L 194 62 Q 186 65 182 58 Z" fill="#4a2010"/>
            <path d="M 184 52 Q 188 48 192 53 L 192 60 Q 188 62 184 56 Z" fill="#8c3e16"/>
            <path d="M 182 85 Q 188 80 194 88 L 194 95 L 182 95 Z" fill="#4a2010"/>
        </g>
        
        <g class="earl-prong earl-prong-right">
            <rect x="304" y="40" width="16" height="80" fill="#787d7a" stroke="#1a1c1a" stroke-width="4"/>
            <circle cx="312" cy="40" r="12" fill="#787d7a" stroke="#1a1c1a" stroke-width="4"/>
            <rect x="306" y="45" width="4" height="70" fill="#ffffff" opacity="0.3"/>
            <path d="M 306 70 Q 312 65 318 75 L 318 90 Q 310 95 306 85 Z" fill="#4a2010"/>
            <path d="M 308 73 Q 312 68 316 76 L 316 88 Q 312 91 308 83 Z" fill="#8c3e16"/>
            <path d="M 306 45 Q 314 42 318 48 L 318 55 L 306 50 Z" fill="#4a2010"/>
        </g>
    </g>

    <g id="earl-body-group">
        <path id="body-chassis" d="M 110 160 C 110 110, 140 100, 180 100 L 320 100 C 360 100, 390 110, 390 160 C 390 200, 350 210, 330 240 C 320 255, 320 280, 320 300 L 320 480 C 320 530, 280 540, 250 540 C 220 540, 180 530, 180 480 L 180 300 C 180 280, 180 255, 170 240 C 150 210, 110 200, 110 160 Z" 
              fill="url(#body-grad)" stroke="#1a1c1a" stroke-width="8" stroke-linejoin="round"/>

        <path d="M 120 160 C 120 120, 145 110, 180 110 L 320 110 C 340 110, 355 115, 365 125 M 120 160 C 120 190, 155 205, 175 235 C 185 250, 190 270, 190 300 L 190 480 C 190 515, 215 530, 250 530" 
              fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.2"/>
        <path d="M 250 530 C 285 530, 310 515, 310 480 L 310 300 C 310 270, 315 250, 325 235 C 345 205, 380 190, 380 160 C 380 135, 365 118, 340 112" 
              fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" opacity="0.3"/>

        <g>
            <path d="M 388 150 Q 375 160 380 175 Q 392 165 388 150 Z" fill="#4a2010"/>
            <path d="M 385 153 Q 378 160 382 170 Q 388 163 385 153 Z" fill="#8c3e16"/>
        </g>
        <g>
            <path d="M 315 470 Q 305 480 310 500 Q 325 490 315 470 Z" fill="#4a2010"/>
            <path d="M 313 475 Q 308 482 311 495 Q 320 488 313 475 Z" fill="#8c3e16"/>
        </g>

        <g stroke-linecap="round">
            <path d="M 185 412 L 210 452 M 205 412 L 185 447" stroke="#ffffff" stroke-width="3" opacity="0.3"/>
            <path d="M 185 410 L 210 450 M 205 410 L 185 445" stroke="#1a1c1a" stroke-width="4" opacity="0.8"/>
            <path d="M 315 412 L 290 452 M 295 412 L 315 447" stroke="#ffffff" stroke-width="3" opacity="0.3"/>
            <path d="M 315 410 L 290 450 M 295 410 L 315 445" stroke="#1a1c1a" stroke-width="4" opacity="0.8"/>
            <path d="M 230 482 L 245 497" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
            <path d="M 230 480 L 245 495" stroke="#1a1c1a" stroke-width="2.5" opacity="0.7"/>
        </g>

        <g font-family="Comic Sans MS, Marker Felt, sans-serif" font-weight="bold" fill="#2a302d" opacity="0.4" text-anchor="middle">
            <text x="250" y="235" font-size="44" letter-spacing="4">STIM</text>
            <text x="250" y="390" font-size="38" letter-spacing="3">STORE</text>
            <text x="250" y="430" font-size="34">1</text>
            <text x="250" y="470" font-size="34">2</text>
        </g>

        <g stroke="#1a1c1a" stroke-width="5" fill="none">
            <circle cx="250" cy="515" r="22" fill="#4a524e" opacity="0.5"/>
            <circle cx="250" cy="515" r="22" />
            <path d="M 228 515 L 240 515 L 245 498 L 255 532 L 260 515 L 272 515" stroke-linejoin="miter"/>
        </g>

        <g id="earl-screen-area">
            <path d="M 125 130 L 375 130 C 385 130, 385 180, 375 180 L 125 180 C 115 180, 115 130, 125 130 Z" 
                  fill="url(#screen-grad)" stroke="#1a1c1a" stroke-width="6" stroke-linejoin="round"/>
            <path d="M 125 130 L 375 130 C 385 130, 385 180, 375 180 L 125 180 C 115 180, 115 130, 125 130 Z" 
                  fill="none" stroke="#11150f" stroke-width="8" opacity="0.6"/>

            <text x="165" y="166" font-family="monospace, sans-serif" font-size="36" font-weight="bold" fill="#222b1c" opacity="0.9" letter-spacing="5">ERROR</text>
            
            <g stroke-linecap="round" stroke-linejoin="round">
                <path d="M 145 145 L 130 135 M 145 145 L 135 165 L 140 180 M 145 145 L 165 155 L 180 145 M 165 155 L 175 170" stroke="#777777" stroke-width="1.5" fill="none" opacity="0.4"/>
                <path d="M 355 165 L 370 175 M 355 165 L 345 145 L 330 135 M 355 165 L 335 170 L 310 160 M 345 145 L 350 130" stroke="#777777" stroke-width="1.5" fill="none" opacity="0.4"/>

                <path d="M 144 144 L 129 134 M 144 144 L 134 164 L 139 179 M 144 144 L 164 154 L 179 144 M 164 154 L 174 169" stroke="#1a1c1a" stroke-width="2.5" fill="none"/>
                <path d="M 354 164 L 369 174 M 354 164 L 344 144 L 329 134 M 354 164 L 334 169 L 309 159 M 344 144 L 349 129" stroke="#1a1c1a" stroke-width="2.5" fill="none"/>
                
                <circle cx="144" cy="144" r="2" fill="#1a1c1a"/>
                <circle cx="354" cy="164" r="2" fill="#1a1c1a"/>
            </g>

            <path d="M 125 130 L 375 130 C 380 130, 383 135, 383 140 L 122 170 C 120 160, 115 130, 125 130 Z" fill="url(#gloss-grad)"/>

            <circle class="earl-led" cx="365" cy="155" r="7" stroke="#1a1c1a" stroke-width="3"/>
            <path d="M 360 152 A 5 5 0 0 1 368 152" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
        </g>

        <g id="earl-face-area">
            
            <path d="M 180 250 Q 250 270 320 250 L 320 290 Q 250 310 180 290 Z" fill="#2c3330" opacity="0.3"/>

            <g class="earl-eyes">
                <g>
                    <g clip-path="url(#left-eye-clip)">
                        <circle cx="210" cy="275" r="18" fill="#e8e4d3" stroke="#1a1c1a" stroke-width="4"/>
                        <circle cx="212" cy="275" r="6" fill="#1a1c1a"/> 
                        <circle cx="210" cy="275" r="18" fill="none" stroke="#2c3330" stroke-width="4" opacity="0.4"/>
                    </g>
                    <path d="M 188 268 Q 210 280 232 268" fill="none" stroke="#1a1c1a" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 194 298 Q 210 306 226 298" fill="none" stroke="#2c3330" stroke-width="3" stroke-linecap="round"/>
                </g>
                
                <g>
                    <g clip-path="url(#right-eye-clip)">
                        <circle cx="290" cy="275" r="18" fill="#e8e4d3" stroke="#1a1c1a" stroke-width="4"/>
                        <circle cx="288" cy="275" r="6" fill="#1a1c1a"/> 
                        <circle cx="290" cy="275" r="18" fill="none" stroke="#2c3330" stroke-width="4" opacity="0.4"/>
                    </g>
                    <path d="M 268 268 Q 290 280 312 268" fill="none" stroke="#1a1c1a" stroke-width="4" stroke-linecap="round"/>
                    <path d="M 274 298 Q 290 306 306 298" fill="none" stroke="#2c3330" stroke-width="3" stroke-linecap="round"/>
                </g>
            </g>

            <g class="earl-eyebrow" stroke-linecap="round">
                <path d="M 180 255 Q 210 245 242 275" fill="none" stroke="#262b28" stroke-width="8"/>
                <path d="M 320 255 Q 290 245 258 275" fill="none" stroke="#262b28" stroke-width="8"/>
            </g>

            <path d="M 245 275 C 235 275, 235 295, 250 295 C 255 295, 260 290, 260 285" fill="none" stroke="#1a1c1a" stroke-width="4" stroke-linecap="round"/>

            <g class="earl-mouth-closed">
                <path d="M 185 325 Q 250 300 315 325" fill="none" stroke="#1a1c1a" stroke-width="6" stroke-linecap="round"/>
                <path d="M 180 315 Q 175 325 190 332" fill="none" stroke="#1a1c1a" stroke-width="4" stroke-linecap="round"/>
                <path d="M 320 315 Q 325 325 310 332" fill="none" stroke="#1a1c1a" stroke-width="4" stroke-linecap="round"/>
                <path d="M 230 322 Q 250 315 270 322" fill="none" stroke="#2c3330" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
            </g>
            
            <g class="earl-mouth-open" style="display: none;">
                <path d="M 185 325 Q 250 300 315 325 Q 250 350 185 325 Z" fill="#111" stroke="#1a1c1a" stroke-width="4" stroke-linejoin="round"/>
            </g>
        </g>
    </g>
</svg>`;
        }

        // Default Ernest SVG (Restored to full detailed legacy version)
        return `
        <svg class="ernest-svg-char at-ernest-container awake" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .ernest-outline { stroke: #2a2d34; stroke-width: 7; stroke-linejoin: round; stroke-linecap: round; }
                    .ernest-thick-outline { stroke: #2a2d34; stroke-width: 9; stroke-linejoin: round; stroke-linecap: round; }
                    .ernest-text-cyan { fill: #88dded; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                    .ernest-text-white { fill: #ffffff; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                    .ernest-shading { fill: rgba(0, 0, 0, 0.15); mix-blend-mode: multiply; }
                    .ernest-highlight { fill: rgba(255, 255, 255, 0.2); mix-blend-mode: screen; }
                </style>
                <filter id="cel-shading">
                    <feOffset dx="12" dy="0" in="SourceAlpha" result="hl-offset"/>
                    <feComposite operator="out" in="SourceAlpha" in2="hl-offset" result="hl-crescent"/>
                    <feFlood flood-color="#ffffff" flood-opacity="0.35" result="hl-color"/>
                    <feComposite operator="in" in="hl-color" in2="hl-crescent" result="highlight"/>

                    <feOffset dx="-12" dy="-12" in="SourceAlpha" result="sh-offset"/>
                    <feComposite operator="out" in="SourceAlpha" in2="sh-offset" result="sh-crescent"/>
                    <feFlood flood-color="#000000" flood-opacity="0.3" result="sh-color"/>
                    <feComposite operator="in" in="sh-color" in2="sh-crescent" result="shadow"/>

                    <feMerge result="shading">
                        <feMergeNode in="shadow"/>
                        <feMergeNode in="highlight"/>
                    </feMerge>
                    <feMerge>
                        <feMergeNode in="SourceGraphic"/>
                        <feMergeNode in="shading"/>
                    </feMerge>
                </filter>
            </defs>
            <g transform="translate(45, 10)">
                <!-- Back left prong -->
                <rect x="145" y="45" width="22" height="90" fill="#b0b5ba" class="ernest-outline"/>
                <rect x="160" y="45" width="7" height="90" class="ernest-shading"/>
                <path d="M 140 105 L 172 105 L 172 120 L 140 120 Z" fill="#666" class="ernest-outline"/>
                <circle cx="156" cy="45" r="11" fill="#b0b5ba" class="ernest-outline"/>
                
                <!-- Back right prong -->
                <rect x="255" y="45" width="22" height="90" fill="#b0b5ba" class="ernest-outline"/>
                <rect x="270" y="45" width="7" height="90" class="ernest-shading"/>
                <path d="M 250 105 L 282 105 L 282 120 L 250 120 Z" fill="#666" class="ernest-outline"/>
                <circle cx="266" cy="45" r="11" fill="#b0b5ba" class="ernest-outline"/>

                <g>
                    <!-- Body Fill (with perfect inset cel-shading filter) -->
                    <path d="
                        M 100 130 
                        C 80 130 70 145 70 160 
                        L 70 200 
                        C 70 230 140 250 140 280 
                        L 140 450
                        C 140 500 280 500 280 450
                        L 280 280 
                        C 280 250 350 230 350 200 
                        L 350 160 
                        C 350 145 340 130 320 130 
                        Z" fill="#55595f" filter="url(#cel-shading)"/>
                    
                    <!-- Left Side Nub (Behind Outline) -->
                    <path d="M 70 165 L 60 165 L 60 195 L 70 195 Z" fill="#606469" class="ernest-outline"/>
                    
                    <!-- Top Screen Panel Fill -->
                    <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                        fill="#80858b" filter="url(#cel-shading)"/>
                        
                    <!-- Bottom Dark Cap Fill -->
                    <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                        fill="#606469" filter="url(#cel-shading)"/>

                    <!-- OUTLINES -->
                    <!-- Main Body Outline -->
                    <path d="M 100 130 C 80 130 70 145 70 160 L 70 200 C 70 230 140 250 140 280 L 140 450 C 140 500 280 500 280 450 L 280 280 C 280 250 350 230 350 200 L 350 160 C 350 145 340 130 320 130 Z" 
                        fill="none" class="ernest-thick-outline"/>

                    <!-- Top Panel Outline -->
                    <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                        fill="none" class="ernest-outline"/>

                    <!-- Bottom Cap Outline -->
                    <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                        fill="none" class="ernest-outline"/>
                </g>

                <!-- Inner Dark Screen Panel -->
                <path d="M 125 145 L 295 145 C 315 145 325 152 325 165 L 325 180 C 325 205 260 220 210 220 C 160 220 95 205 95 180 L 95 165 C 95 152 105 145 125 145 Z" fill="#2a2d34" class="ernest-outline"/>

                <!-- Front Elements on Top Screen Panel -->
                <!-- '-3' elements -->
                <rect x="110" y="160" width="16" height="8" rx="4" fill="#1e1f24" class="ernest-outline"/>
                <text x="135" y="172" class="ernest-text-white" font-size="28">3</text>

                <!-- '+/-' elements -->
                <text x="235" y="170" class="ernest-text-white" font-size="20">+/-</text>
                <circle cx="278" cy="162" r="7" class="ernest-outline ernest-led" fill="#00ff4c"/>
                <ellipse cx="278" cy="160" rx="3" ry="1.5" fill="#fff" opacity="0.6"/> <!-- LED glare -->

                <!-- STIM Text -->
                <text x="210" y="212" class="ernest-text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STIM</text>

                <!-- STORE 1 2 Text -->
                <text x="210" y="375" class="ernest-text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STORE</text>
                <text x="210" y="405" class="ernest-text-cyan" font-size="24" text-anchor="middle">1</text>
                <text x="210" y="435" class="ernest-text-cyan" font-size="24" text-anchor="middle">2</text>
                
                <!-- Bottom Logo Symbol -->
                <circle cx="210" cy="465" r="18" fill="none" class="ernest-outline"/>
                <path d="M 190 465 L 202 465 L 206 452 L 214 478 L 218 465 L 230 465" fill="none" stroke="#2a2d34" stroke-width="5" stroke-linejoin="round"/>

                <!-- THE FACE -->
                <g id="cartoon-face">
                    <!-- Eyebrows (Tilted medial up for happier expression) -->
                    <g class="ernest-eyebrow">
                        <path d="M 165 260 Q 180 245 195 250" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        <path d="M 255 260 Q 240 245 225 250" fill="none" class="ernest-outline" stroke-linecap="round"/>
                    </g>
                    
                    <!-- Eyes -->
                    <g class="ernest-eyes">
                        <g class="ernest-eyes-open">
                            <ellipse cx="180" cy="285" rx="12" ry="18" fill="#1e1f24"/>
                            <circle cx="183" cy="278" r="4" fill="#ffffff"/> <!-- Shine point -->
                            
                            <ellipse cx="240" cy="285" rx="12" ry="18" fill="#1e1f24"/>
                            <circle cx="243" cy="278" r="4" fill="#ffffff"/> <!-- Shine point -->
                        </g>
                        <g class="ernest-eyes-closed">
                            <path d="M 168 285 Q 180 295 192 285" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 228 285 Q 240 295 252 285" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                    </g>

                    <!-- Nose -->
                    <rect x="203" y="283" width="14" height="24" rx="7" fill="#606469" class="ernest-outline"/>
                    <line x1="205" y1="289" x2="215" y2="289" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                    <line x1="205" y1="295" x2="215" y2="295" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                    <line x1="205" y1="301" x2="215" y2="301" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>

                    <!-- Mouth Group -->
                    <g class="ernest-mouth-container">
                        <!-- Open Mouth -->
                        <g class="ernest-mouth-open" transform="translate(78.5, 108.75) scale(0.65)">
                            <defs>
                                <clipPath id="mouth-cut">
                                    <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z"/>
                                </clipPath>
                            </defs>
                            <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z" fill="#141517" class="ernest-outline" stroke-linejoin="round"/>
                            <path d="M 185 340 Q 210 315 235 340 C 235 365 185 365 185 340 Z" fill="#ff7675" stroke="#2a2d34" stroke-width="2" clip-path="url(#mouth-cut)"/>
                            
                            <path d="M 168 310 Q 172 312 175 315" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 252 310 Q 248 312 245 315" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                        
                        <!-- Closed Mouth -->
                        <g class="ernest-mouth-closed" transform="translate(78.5, 108.75) scale(0.65)">
                            <path d="M 180 320 Q 210 335 240 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 173 315 Q 178 317 180 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                            <path d="M 247 315 Q 242 317 240 320" fill="none" class="ernest-outline" stroke-linecap="round"/>
                        </g>
                    </g>
                </g>

                <!-- Cartoon Action Lines -->
                <path class="ernest-zap-line" d="M 155 10 L 140 -20 L 160 -35 L 145 -60" fill="none" stroke="#88dded" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="ernest-zap-line" d="M 265 10 L 280 -20 L 260 -35 L 275 -60" fill="none" stroke="#88dded" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>`;
    }
}
