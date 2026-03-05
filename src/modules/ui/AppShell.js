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

        root.innerHTML = `
            <!-- Initial Loading State / Splash -->
            <div id="pgy-selection" class="app-welcome-screen">
                <div class="app-main-container">
                    <div class="app-logo-container">
                        <img src="images/ui/modern_edx_app_icon.png" alt="Neuromuscular Mastery" class="app-logo-img">
                    </div>
                    <h1 class="app-main-title">EMG/NCS Mastery System</h1>
                    <div class="app-content-area">
                        <div id="ernest-character" class="at-ernest-container">
                            <svg class="ernest-svg-char" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">
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
</svg>
                        </div>
                        <div class="speech-bubble">
                            <p class="lead-text" style="font-size: 1.25em; text-align: center;">Junior, listen up. I'm Ernest. We've got a full board today and the sensors aren't going to stabilize themselves. We're here to master the Preston & Shapiro fundamentals—no shortcuts. Ready to step up and handle some real clinical waveforms?</p>
                        </div>
                    </div>
                    <button class="app-cta-button" id="start-journey-btn">Begin Learning</button>
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
                    speechBubbleText.innerHTML = "Zzz... *Snores in 60Hz hum*... Wake up, Junior. The clinic waitlist is growing. Click to begin.";
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
                    speechBubbleText.innerHTML = "Don't just stand there, Junior. This is the EMG/NCS Mastery System—the gold standard. Click me and let's see if your conduction velocities are up to snuff.";
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
                            "Latency is the key to life, Junior. Don't forget it.",
                            "Are you stimulating or just guessing? Match the signal.",
                            "Knowledge is the best filter for noise. Keep studying."
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
}
