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

        root.innerHTML = `
            <!-- Initial Loading State / Splash -->
            <div id="pgy-selection" class="atrium-welcome-screen">
                <div class="atrium-main-container">
                    <div class="atrium-logo-container">
                        <img src="images/ui/atrium.jpeg" alt="Atrium Health" class="atrium-logo-img">
                    </div>
                    <h1 class="atrium-main-title">Atrium Health EMG/NCS Learning System</h1>
                    <div class="atrium-content-area">
                        <div id="ernest-character" class="ernest-container">
                            <svg class="ernest-svg-char" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <style>
                                        .outline { stroke: #2a2d34; stroke-width: 7; stroke-linejoin: round; stroke-linecap: round; }
                                        .thick-outline { stroke: #2a2d34; stroke-width: 9; stroke-linejoin: round; stroke-linecap: round; }
                                        .text-cyan { fill: #88dded; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                                        .text-white { fill: #ffffff; font-family: 'Comic Sans MS', 'Nunito', 'Segoe UI', cursive; font-weight: 900; }
                                        .shading { fill: rgba(0, 0, 0, 0.15); mix-blend-mode: multiply; }
                                        .highlight { fill: rgba(255, 255, 255, 0.2); mix-blend-mode: screen; }
                                    </style>
                                    <!-- Filter for precise inset cel-shading -->
                                    <filter id="cel-shading">
                                        <!-- Highlight (Left Edge) -->
                                        <feOffset dx="12" dy="0" in="SourceAlpha" result="hl-offset"/>
                                        <feComposite operator="out" in="SourceAlpha" in2="hl-offset" result="hl-crescent"/>
                                        <feFlood flood-color="#ffffff" flood-opacity="0.35" result="hl-color"/>
                                        <feComposite operator="in" in="hl-color" in2="hl-crescent" result="highlight"/>

                                        <!-- Shadow (Right/Bottom Edge) -->
                                        <feOffset dx="-12" dy="-12" in="SourceAlpha" result="sh-offset"/>
                                        <feComposite operator="out" in="SourceAlpha" in2="sh-offset" result="sh-crescent"/>
                                        <feFlood flood-color="#000000" flood-opacity="0.3" result="sh-color"/>
                                        <feComposite operator="in" in="sh-color" in2="sh-crescent" result="shadow"/>

                                        <!-- Compose the layers -->
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
                                    
                                    <!-- Sleeping Zs (Hidden by default in CSS unless .sleeping) -->
                                    <g class="ernest-z-group" transform="translate(250, 100)" fill="#1e1f24" font-family="'Comic Sans MS', cursive" font-weight="bold">
                                        <text class="ernest-z1" x="0" y="0" font-size="20">Z</text>
                                        <text class="ernest-z2" x="15" y="-15" font-size="28">Z</text>
                                        <text class="ernest-z3" x="35" y="-35" font-size="36">Z</text>
                                    </g>

                                    <!-- Back left prong (Lowered to connect to body) -->
                                    <rect x="145" y="45" width="22" height="90" fill="#b0b5ba" class="outline"/>
                                    <rect x="160" y="45" width="7" height="90" class="shading"/> <!-- Prong shading -->
                                    <path d="M 140 105 L 172 105 L 172 120 L 140 120 Z" fill="#666" class="outline"/>
                                    <circle cx="156" cy="45" r="11" fill="#b0b5ba" class="outline"/>
                                    
                                    <!-- Back right prong (Lowered to connect to body) -->
                                    <rect x="255" y="45" width="22" height="90" fill="#b0b5ba" class="outline"/>
                                    <rect x="270" y="45" width="7" height="90" class="shading"/> <!-- Prong shading -->
                                    <path d="M 250 105 L 282 105 L 282 120 L 250 120 Z" fill="#666" class="outline"/>
                                    <circle cx="266" cy="45" r="11" fill="#b0b5ba" class="outline"/>

                                    <!-- Floating Image Hands (AI Generated) -->
                                    <!-- Rendered BEFORE body to appear BEHIND it -->
                                    <g class="ernest-hand-pos-right" transform="translate(20, 320)">
                                        <g class="ernest-float-hand-right">
                                            <!-- Right Hand Gestures (Hidden/Shown via CSS) -->
                                            <!-- Ensure we use the proper right hand images, not scaled left hands -->
                                            <image class="ernest-gesture-palm" href="images/ui/right_palm.png" x="-45" y="-45" width="90" height="90" transform="rotate(15)" />
                                            <image class="ernest-gesture-fist" href="images/ui/right_fist.png" x="-45" y="-45" width="90" height="90" transform="rotate(15)" />
                                            <image class="ernest-gesture-point" href="images/ui/right_point.png" x="-45" y="-45" width="90" height="90" transform="rotate(15)" />
                                            <image class="ernest-gesture-thumb" href="images/ui/right_thumb.png" x="-45" y="-45" width="90" height="90" transform="rotate(15)" />
                                        </g>
                                    </g>

                                    <!-- Left Hand -->
                                    <g class="ernest-hand-pos-left" transform="translate(430, 320)">
                                        <g class="ernest-float-hand-left">
                                            <!-- Left Hand Gestures (Hidden/Shown via CSS) -->
                                            <image class="ernest-gesture-palm-l" href="images/ui/left_palm.png" x="-45" y="-45" width="90" height="90" transform="rotate(-15)" />
                                            <image class="ernest-gesture-fist-l" href="images/ui/left_fist.png" x="-45" y="-45" width="90" height="90" transform="rotate(-15)" />
                                            <image class="ernest-gesture-point-l" href="images/ui/left_point.png" x="-45" y="-45" width="90" height="90" transform="rotate(-15)" />
                                            <image class="ernest-gesture-thumb-l" href="images/ui/left_thumb.png" x="-45" y="-45" width="90" height="90" transform="rotate(-15)" />
                                        </g>
                                    </g>

                                    <!-- Main Body Base (Shadowed for pop) -->
                                    <!-- Main Body Base -->
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
                                        <path d="M 70 165 L 60 165 L 60 195 L 70 195 Z" fill="#606469" class="outline"/>
                                        
                                        <!-- Top Screen Panel Fill (with perfect inset cel-shading filter) -->
                                        <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                                          fill="#80858b" filter="url(#cel-shading)"/>
                                          
                                        <!-- Bottom Dark Cap Fill -->
                                        <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                                          fill="#606469" filter="url(#cel-shading)"/>

                                        <!-- ============================================ -->
                                        <!-- OUTLINES (Drawn on top to ensure clean crisp edges) -->
                                        <!-- ============================================ -->
                                        
                                        <!-- Main Body Outline -->
                                        <path d="M 100 130 C 80 130 70 145 70 160 L 70 200 C 70 230 140 250 140 280 L 140 450 C 140 500 280 500 280 450 L 280 280 C 280 250 350 230 350 200 L 350 160 C 350 145 340 130 320 130 Z" 
                                          fill="none" class="thick-outline"/>

                                        <!-- Top Panel Outline -->
                                        <path d="M 100 130 L 320 130 C 340 130 350 145 350 160 L 350 185 C 350 210 270 230 210 230 C 150 230 70 210 70 185 L 70 160 C 70 145 80 130 100 130 Z" 
                                          fill="none" class="outline"/>

                                        <!-- Bottom Cap Outline -->
                                        <path d="M 140 435 Q 210 445 280 435 L 280 450 C 280 500 140 500 140 450 Z" 
                                          fill="none" class="outline"/>
                                    </g>

                                     <!-- Inner Dark Screen Panel -->
                                    <path d="M 125 145 L 295 145 C 315 145 325 152 325 165 L 325 180 C 325 205 260 220 210 220 C 160 220 95 205 95 180 L 95 165 C 95 152 105 145 125 145 Z" fill="#2a2d34" class="outline"/>

                                    <!-- Front Elements on Top Screen Panel -->
                                    <!-- '-3' elements -->
                                    <rect x="110" y="160" width="16" height="8" rx="4" fill="#1e1f24" class="outline"/>
                                    <text x="135" y="172" class="text-white" font-size="28">3</text>

                                    <!-- '+/-' elements -->
                                    <text x="235" y="170" class="text-white" font-size="20">+/-</text>
                                    <circle cx="278" cy="162" r="7" class="outline ernest-led"/>
                                    <ellipse cx="278" cy="160" rx="3" ry="1.5" fill="#fff" opacity="0.6"/> <!-- LED glare -->

                                    <!-- STIM Text (Raised into the dark gray screen panel) -->
                                    <text x="210" y="212" class="text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STIM</text>

                                    <!-- STORE 1 2 Text -->
                                    <text x="210" y="375" class="text-cyan" font-size="28" letter-spacing="2" text-anchor="middle">STORE</text>
                                    <text x="210" y="405" class="text-cyan" font-size="24" text-anchor="middle">1</text>
                                    <text x="210" y="435" class="text-cyan" font-size="24" text-anchor="middle">2</text>
                                    
                                    <!-- Bottom Logo Symbol -->
                                    <circle cx="210" cy="465" r="18" fill="none" class="outline"/>
                                    <path d="M 190 465 L 202 465 L 206 452 L 214 478 L 218 465 L 230 465" fill="none" stroke="#2a2d34" stroke-width="5" stroke-linejoin="round"/>

                                    <!-- THE FACE (The most important part) -->
                                    <g id="cartoon-face">
                                        <!-- Eyebrows (Tilted medial up for happier expression) -->
                                        <g class="ernest-eyebrow">
                                            <path d="M 165 260 Q 180 245 195 250" fill="none" class="outline" stroke-linecap="round"/>
                                            <path d="M 255 260 Q 240 245 225 250" fill="none" class="outline" stroke-linecap="round"/>
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
                                                <path d="M 168 285 Q 180 295 192 285" fill="none" class="outline" stroke-linecap="round"/>
                                                <path d="M 228 285 Q 240 295 252 285" fill="none" class="outline" stroke-linecap="round"/>
                                            </g>
                                        </g>

                                        <!-- Nose -->
                                        <rect x="203" y="283" width="14" height="24" rx="7" fill="#606469" class="outline"/>
                                        <line x1="205" y1="289" x2="215" y2="289" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                                        <line x1="205" y1="295" x2="215" y2="295" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>
                                        <line x1="205" y1="301" x2="215" y2="301" stroke="#2a2d34" stroke-width="4" stroke-linecap="round"/>

                                        <!-- Mouth Group -->
                                        <g class="ernest-mouth-container">
                                            <!-- Open Mouth (Awake) -->
                                            <g class="ernest-mouth-open" transform="translate(78.5, 108.75) scale(0.65)">
                                                <defs>
                                                    <clipPath id="mouth-cut">
                                                        <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z"/>
                                                    </clipPath>
                                                </defs>
                                                <!-- Mouth interior -->
                                                <path d="M 175 315 C 175 315 210 325 245 315 C 245 355 175 355 175 315 Z" fill="#141517" class="outline" stroke-linejoin="round"/>
                                                <!-- Tongue -->
                                                <path d="M 185 340 Q 210 315 235 340 C 235 365 185 365 185 340 Z" fill="#ff7675" stroke="#2a2d34" stroke-width="2" clip-path="url(#mouth-cut)"/>
                                                
                                                <!-- Cheek dimples (smoothed out to avoid a weird higher line) -->
                                                <path d="M 168 310 Q 172 312 175 315" fill="none" class="outline" stroke-linecap="round"/>
                                                <path d="M 252 310 Q 248 312 245 315" fill="none" class="outline" stroke-linecap="round"/>
                                            </g>
                                            
                                            <!-- Closed Mouth Smile (Sleeping) -->
                                            <g class="ernest-mouth-closed" transform="translate(78.5, 108.75) scale(0.65)">
                                                <!-- Centered smile line -->
                                                <path d="M 180 320 Q 210 335 240 320" fill="none" class="outline" stroke-linecap="round"/>
                                                <!-- Cheek dimples -->
                                                <path d="M 173 315 Q 178 317 180 320" fill="none" class="outline" stroke-linecap="round"/>
                                                <path d="M 247 315 Q 242 317 240 320" fill="none" class="outline" stroke-linecap="round"/>
                                            </g>
                                        </g>
                                    </g>


                                    <!-- Cartoon Action Lines -->
                                    <path class="ernest-zap-line" d="M 155 10 L 140 -20 L 160 -35 L 145 -60" fill="none" stroke="#88dded" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path class="ernest-zap-line" d="M 265 10 L 280 -20 L 260 -35 L 275 -60" fill="none" stroke="#88dded" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </div>
                        <div class="speech-bubble">
                            <p class="lead-text" style="font-size: 1.25em; text-align: center;">Welcome, future
                                Electrodiagnostician! I'm Ernest, your guide to the electrifying world of EMG & NCS! We're going
                                to master nerves, muscles, and waveforms together. Ready to spark your learning?</p>
                        </div>
                    </div>
                    <button class="atrium-cta-button" id="start-journey-btn">Begin Learning</button>
                </div>
            </div>

            <!-- Progress Dashboard -->
            <div id="progress-dashboard" class="progress-dashboard hidden">
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
            // Pick a random entry state to make Ernest feel more alive
            const entryStates = ['sleeping', 'dancing', 'jumping', 'waving'];
            const randomState = entryStates[Math.floor(Math.random() * entryStates.length)];

            ernestContainer.classList.add(randomState);

            // Set corresponding dialogue and gestures
            if (speechBubbleText) {
                if (randomState === 'sleeping') {
                    speechBubbleText.innerHTML = "Zzz... Oh! Click me to wake me up!";
                } else if (randomState === 'dancing') {
                    ernestContainer.setAttribute('data-gesture-l', 'palm');
                    ernestContainer.setAttribute('data-gesture-r', 'palm');
                    speechBubbleText.innerHTML = "Woo-hoo! Let's get moving! Click me to start learning!";
                } else if (randomState === 'jumping') {
                    ernestContainer.setAttribute('data-gesture-l', 'fist');
                    ernestContainer.setAttribute('data-gesture-r', 'fist');
                    speechBubbleText.innerHTML = "I'm so pumped up for EMG! Click me when you're ready to dive in!";
                } else if (randomState === 'waving') {
                    ernestContainer.setAttribute('data-gesture-r', 'palm');
                    speechBubbleText.innerHTML = "Hey there! Welcome to the Atrium Health EMG/NCS Learning System! Click me to begin!";
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
                        speechBubbleText.innerHTML = "Awesome, let's jump in! Welcome, future Electrodiagnostician! I'm Ernest. Ready to spark your learning?";
                    }
                } else {
                    // Playful poke response, without breaking his current dancing/jumping state
                    if (speechBubbleText) {
                        const responses = [
                            "Hey, that tickles!",
                            "Ready to measure some nerve conduction velocities?",
                            "Let's get shocking!",
                            "I'm so ready to start learning!"
                        ];
                        speechBubbleText.innerHTML = responses[Math.floor(Math.random() * responses.length)];
                    }
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
}
