import { PathwayData } from './PathwayData.js';

const generateContent = () => `
    <style>
        .pathway-app-container {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 0;
            height: calc(100vh - 120px);
            min-height: 700px;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            border: 1px solid #e2e8f0;
        }

        /* SIDEBAR styling */
        .pathway-sidebar {
            background: #f8fafc;
            border-right: 1px solid #e2e8f0;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }

        .sidebar-header {
            padding: 25px 20px;
            background: #fff;
            border-bottom: 1px solid #e2e8f0;
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .nerve-list-group {
            padding: 10px;
        }

        .nerve-group-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #64748b;
            margin: 15px 10px 8px;
            font-weight: 800;
        }

        .nerve-item {
            padding: 12px 15px;
            margin-bottom: 6px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid #f1f5f9;
            font-size: 0.95rem;
            font-weight: 500;
            color: #475569;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
        }
        
        .nerve-item:hover {
            transform: translateX(4px);
            background: #f1f5f9;
        }

        .nerve-item.active {
            color: white;
            font-weight: 700;
            box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.15);
            border: none;
        }
        
        .nerve-item.active .root-badge {
            background: rgba(255, 255, 255, 0.25);
            color: white;
        }

        /* Thematic Gradients for Nav Items */
        .nerve-item[data-nerve="median"].active { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .nerve-item[data-nerve="ulnar"].active { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
        .nerve-item[data-nerve="radial"].active { background: linear-gradient(135deg, #f97316, #c2410c); }
        .nerve-item[data-nerve="musculocutaneous"].active { background: linear-gradient(135deg, #10b981, #047857); }
        .nerve-item[data-nerve="axillary"].active { background: linear-gradient(135deg, #ef4444, #b91c1c); }
        .nerve-item[data-nerve="sciatic"].active { background: linear-gradient(135deg, #334155, #0f172a); }
        .nerve-item[data-nerve="tibial"].active { background: linear-gradient(135deg, #06b6d4, #0e7490); }
        .nerve-item[data-nerve="peroneal"].active { background: linear-gradient(135deg, #f59e0b, #b45309); }
        .nerve-item[data-nerve="femoral"].active { background: linear-gradient(135deg, #6366f1, #4338ca); }
        .nerve-item[data-nerve="obturator"].active { background: linear-gradient(135deg, #ec4899, #be185d); }
        .nerve-item[data-nerve="sural"].active { background: linear-gradient(135deg, #10b981, #047857); }

        .root-badge {
            font-size: 0.75em;
            padding: 3px 8px;
            border-radius: 4px;
            background: #f1f5f9;
            color: #64748b;
            font-weight: 600;
            transition: all 0.2s;
        }

        /* MAIN CONTENT styling */
        .pathway-main {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            position: relative;
            background: #fff;
        }

        /* PREMIUM WELCOME SCREEN (Replacing the old blank empty state) */
        .welcome-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 40px;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }
        .welcome-card {
            background: white;
            padding: 50px;
            border-radius: 24px;
            max-width: 600px;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            text-align: center;
        }

        .welcome-card h3 {
            font-size: 2.2em;
            font-weight: 900;
            color: #0f172a;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
        }

        .welcome-card p {
            font-size: 1.15em;
            color: #475569;
            line-height: 1.7;
            margin-bottom: 25px;
        }

        /* HERO HEADER in main view */
        .nerve-hero {
            padding: 35px 40px;
            color: white;
            position: relative;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .bg-median { background: linear-gradient(135deg, #3b82f6, #1e40af); }
        .bg-ulnar { background: linear-gradient(135deg, #8b5cf6, #5b21b6); }
        .bg-radial { background: linear-gradient(135deg, #f97316, #9a3412); }
        .bg-musculocutaneous { background: linear-gradient(135deg, #10b981, #047857); }
        .bg-axillary { background: linear-gradient(135deg, #ef4444, #991b1b); }
        .bg-sciatic { background: linear-gradient(135deg, #334155, #0f172a); } 
        .bg-tibial { background: linear-gradient(135deg, #06b6d4, #164e63); }
        .bg-peroneal { background: linear-gradient(135deg, #f59e0b, #92400e); }
        .bg-femoral { background: linear-gradient(135deg, #6366f1, #3730a3); }
        .bg-obturator { background: linear-gradient(135deg, #ec4899, #831843); }
        .bg-sural { background: linear-gradient(135deg, #10b981, #064e3b); }
        .bg-default { background: linear-gradient(135deg, #64748b, #334155); }

        .content-grid {
            display: grid;
            grid-template-columns: 350px 1fr; /* Wider timeline for better reading */
            gap: 0;
            flex: 1;
            overflow: hidden;
            background: #fff;
        }

        /* Left Split: Timeline */
        .steps-container {
            padding: 30px;
            border-right: 1px solid #e2e8f0;
            overflow-y: auto;
            background: #f8fafc;
        }

        .step-timeline-item {
            position: relative;
            padding-left: 35px;
            padding-bottom: 30px;
            border-left: 2px solid #cbd5e1;
            cursor: pointer;
            transition: all 0.3s;
        }
        .step-timeline-item:last-child { border-left-color: transparent; }
        
        .timeline-dot {
            position: absolute;
            left: -8px;
            top: 0;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: white;
            border: 3px solid #cbd5e1;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .step-timeline-item.active .timeline-dot {
            background: currentColor;
            border-color: currentColor;
            transform: scale(1.5);
            box-shadow: 0 0 0 5px rgba(0,0,0,0.05);
        }
        .step-timeline-item.past .timeline-dot {
            background: currentColor;
            border-color: currentColor;
        }

        .step-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            transition: all 0.2s;
            margin-top: -8px;
        }
        
        .step-timeline-item.active .step-card {
            border-color: currentColor;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        
        .step-timeline-item:hover:not(.active) .step-card {
            transform: translateY(-2px);
            border-color: #cbd5e1;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .step-card-title {
            font-weight: 800;
            font-size: 1.05em;
            margin-bottom: 8px;
            color: #0f172a;
        }

        .step-card-desc {
            color: #475569;
            font-size: 0.95em;
            line-height: 1.6;
            margin: 0;
        }

        .entrapment-label {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.75em;
            font-weight: 800;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 6px;
            background: #fef2f2;
            color: #b91c1c;
            margin-bottom: 10px;
            letter-spacing: 0.05em;
            border: 1px solid #fecaca;
        }

        /* Right Split: Visuals & Lore */
        .visual-container {
            padding: 30px;
            overflow-y: auto;
            background: #fff;
            display: flex;
            flex-direction: column;
        }

        .story-box {
            background: linear-gradient(to right, #f8fafc, #ffffff);
            border-left: 4px solid currentColor;
            padding: 25px;
            margin-bottom: 30px;
            border-radius: 0 12px 12px 0;
            box-shadow: inset 0 0 0 1px #e2e8f0;
        }
        
        /* IMAGE CUTOFF FIXES */
        .img-wrapper {
            flex: 1; /* Take remaining space */
            display: flex;
            align-items: stretch; /* Stretch to fill vertically */
            justify-content: center;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px;
            min-height: 500px;
            position: relative;
            overflow: hidden; /* Keep zoom inside box */
        }

        .zoom-stage {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-origin: center center;
        }

        .image-coord-space {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            /* Remove absolute max-width/height so image drives the space */
            width: 100%;
            height: 100%;
        }

        #main-pathway-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain; /* CRITICAL: Ensures no cut-off regardless of container shape */
            display: block;
        }

        .nerve-svg-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        }

        .nerve-path-animated {
            fill: none;
            stroke-width: 5;
            stroke-linecap: round;
            stroke-linejoin: round;
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.9));
            transition: stroke-dashoffset 0.8s ease-in-out, stroke 0.3s;
        }

        .nerve-path-shadow {
            fill: none;
            stroke: rgba(0, 0, 0, 0.15);
            stroke-width: 8;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .controls-footer {
            background: white;
            padding: 20px 30px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 10;
        }
        
        .nav-btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.95em;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
        }
        .nav-btn.secondary { background: #f1f5f9; color: #475569; }
        .nav-btn.secondary:hover:not(:disabled) { background: #e2e8f0; color: #0f172a; }
        
        .nav-btn.primary { background: #0f172a; color: white; }
        .nav-btn.primary:hover:not(:disabled) { background: #1e293b; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
        .nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        @media (max-width: 1000px) {
            .pathway-app-container { grid-template-columns: 1fr; height: auto; }
            .pathway-sidebar { height: 250px; border-bottom: 1px solid #e2e8f0; border-right: none; }
            .content-grid { grid-template-columns: 1fr; }
            .img-wrapper { min-height: 400px; }
        }
    </style>

    <div class="pathway-app-container">
        <!-- SIDEBAR -->
        <div class="pathway-sidebar">
            <div class="sidebar-header">
                <h3 style="margin: 0; font-size: 1.3em; color: #0f172a; font-weight: 900; letter-spacing: -0.02em;">Pathway Explorer</h3>
                <p style="margin: 5px 0 0; font-size: 0.9em; color: #64748b;">Select an anatomical roadmap</p>
            </div>
            
            <div class="nerve-list-group">
                <div class="nerve-group-title">Upper Extremity</div>
                <div class="nerve-item" data-nerve="median" onclick="selectNerve('median')">
                    <span>Median Nerve</span><span class="root-badge">C6-T1</span>
                </div>
                <div class="nerve-item" data-nerve="ulnar" onclick="selectNerve('ulnar')">
                    <span>Ulnar Nerve</span><span class="root-badge">C8-T1</span>
                </div>
                <div class="nerve-item" data-nerve="radial" onclick="selectNerve('radial')">
                    <span>Radial Nerve</span><span class="root-badge">C5-T1</span>
                </div>
                <div class="nerve-item" data-nerve="musculocutaneous" onclick="selectNerve('musculocutaneous')">
                    <span>Musculocutaneous</span><span class="root-badge">C5-C7</span>
                </div>
                <div class="nerve-item" data-nerve="axillary" onclick="selectNerve('axillary')">
                    <span>Axillary Nerve</span><span class="root-badge">C5-C6</span>
                </div>
            </div>

            <div class="nerve-list-group">
                <div class="nerve-group-title">Lower Extremity</div>
                <div class="nerve-item" data-nerve="sciatic" onclick="selectNerve('sciatic')">
                    <span>Sciatic Nerve</span><span class="root-badge">L4-S3</span>
                </div>
                <div class="nerve-item" data-nerve="tibial" onclick="selectNerve('tibial')">
                    <span>Tibial Nerve</span><span class="root-badge">L4-S3</span>
                </div>
                <div class="nerve-item" data-nerve="peroneal" onclick="selectNerve('peroneal')">
                    <span>Peroneal Nerve</span><span class="root-badge">L4-S2</span>
                </div>
                <div class="nerve-item" data-nerve="femoral" onclick="selectNerve('femoral')">
                    <span>Femoral Nerve</span><span class="root-badge">L2-L4</span>
                </div>
                <div class="nerve-item" data-nerve="obturator" onclick="selectNerve('obturator')">
                    <span>Obturator Nerve</span><span class="root-badge">L2-L4</span>
                </div>
                <div class="nerve-item" data-nerve="sural" onclick="selectNerve('sural')">
                    <span>Sural Nerve</span><span class="root-badge">S1-S2</span>
                </div>
            </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="pathway-main" id="main-content-area">
            
            <!-- Welcome State -->
            <div id="welcome-state" class="welcome-state">
                <div class="welcome-card">
                    <div style="background: #e0e7ff; color: #4338ca; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                    </div>
                    <h3>Why Anatomy Matters</h3>
                    <p>In Electrodiagnostic Medicine, nerves are nothing more than electrical cables, and muscles are their batteries. The magic of EMG isn't in looking at a screen—it's in knowing exactly where the wire goes when it leaves the spine.</p>
                    <p>Every nerve has a highly specific, totally predictable physical roadmap. It dives under specific ligaments, wrapping tightly around specific bones. When a patient presents with a 'Foot Drop', knowing that the Peroneal nerve wraps dangerously tight around the unprotected fibular neck instantly tells you where to press your stimulator.</p>
                    <div style="padding: 15px; background: #f1f5f9; border-radius: 12px; margin-top: 30px; border-left: 4px solid #6366f1;">
                        <strong style="color: #3730a3;">The Golden Rule:</strong> An isolated nerve injury didn't happen randomly. It happened because the nerve was squeezed against a specific bone or ligament. Master the pinch points, and the diagnosis makes itself. Select a nerve from the sidebar to trace its path.
                    </div>
                </div>
            </div>

            <!-- Active Content (Hidden by default) -->
            <div id="active-nerve-content" style="display: none; height: 100%; flex-direction: column;">
                
                <!-- Hero Header -->
                <div id="nerve-hero" class="nerve-hero bg-default">
                    <div>
                        <h2 id="hero-title" style="margin: 0; font-size: 2.2em; font-weight: 900; letter-spacing: -0.02em;">Nerve Name</h2>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                            <span style="opacity: 0.9;">Spinal Roots:</span>
                            <span id="hero-roots" style="background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 20px; font-weight: 700; letter-spacing: 0.05em; font-size: 0.95em;">ROOTS</span>
                        </div>
                    </div>
                </div>

                <!-- Split Content -->
                <div class="content-grid">
                    <!-- Left: Timeline -->
                    <div class="steps-container">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                            <div style="font-size: 0.85em; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em;">The Clinical Pathway</div>
                        </div>
                        <div id="timeline-steps">
                            <!-- Injected by JS -->
                        </div>
                    </div>

                    <!-- Right: Visuals -->
                    <div class="visual-container">
                        <div class="story-box" id="story-box">
                            <!-- Story injected by JS -->
                        </div>

                        <div class="img-wrapper" id="zoom-viewport">
                            <div class="zoom-stage" id="nerve-zoom-stage">
                                <div id="nerve-image-container" class="image-coord-space">
                                    <svg class="nerve-svg-overlay" id="nerve-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path class="nerve-path-shadow" id="path-shadow" d=""></path>
                                        <path class="nerve-path-animated" id="path-main" d=""></path>
                                    </svg>
                                    <img id="main-pathway-img" src="" alt="Pathway Diagram">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Navigation -->
                <div class="controls-footer">
                    <button class="nav-btn secondary" id="prev-btn" onclick="previousStep()">Previous Base</button>
                    <div style="color: #64748b; font-size: 1.05em; font-weight: 600;">Location <span id="current-step-num" style="color: #0f172a; font-weight: 800;">1</span> of <span id="total-step-num">7</span></div>
                    <button class="nav-btn primary" id="next-btn" onclick="nextStep()">Trace Forward</button>
                </div>
            </div>
        </div>
    </div>
`;

export const PathwayExplorer = {
    generateContent,

    state: {
        currentNerve: null,
        currentStep: 0,
        maxSteps: 0,
        data: PathwayData // Use the imported data model
    },

    initialize() {
        window.pathwayExplorer = this.state;
        window.selectNerve = this.selectNerve.bind(this);
        window.showStep = this.showStep.bind(this);
        window.nextStep = this.nextStep.bind(this);
        window.previousStep = this.previousStep.bind(this);

        window._pathwayCheckAnswer = function(btnEl, isCorrect, explanation) {
            const container = btnEl.closest('.knowledge-check-card');
            if (!container) return;
            const allBtns = container.querySelectorAll('.kc-option-btn');
            allBtns.forEach(b => {
                b.disabled = true;
                b.style.cursor = 'default';
                b.style.opacity = '0.7';
                if (b.dataset.correct === 'true') {
                    b.style.background = '#dcfce7';
                    b.style.borderColor = '#16a34a';
                    b.style.color = '#15803d';
                }
            });
            if (!isCorrect) {
                btnEl.style.background = '#fee2e2';
                btnEl.style.borderColor = '#dc2626';
                btnEl.style.color = '#b91c1c';
                btnEl.style.opacity = '1';
            } else {
                btnEl.style.opacity = '1';
            }
            const explEl = container.querySelector('.kc-explanation');
            if (explEl) {
                explEl.style.display = 'block';
                explEl.innerHTML = (isCorrect ? '<strong style="color:#16a34a;">Correct!</strong> ' : '<strong style="color:#dc2626;">Incorrect.</strong> ') + explanation;
            }
        };
    },

    selectNerve(nerveName) {
        const explorer = window.pathwayExplorer;
        if (!explorer || !explorer.data.nerves[nerveName]) return;

        explorer.currentNerve = explorer.data.nerves[nerveName];
        explorer.currentStep = 0;
        explorer.maxSteps = explorer.currentNerve.steps.length;

        // UI Transitions
        document.getElementById('welcome-state').style.display = 'none';
        const activeContainer = document.getElementById('active-nerve-content');
        if (activeContainer) activeContainer.style.display = 'flex';

        // Sidebar Styling
        document.querySelectorAll('.nerve-item').forEach(el => el.classList.remove('active'));
        const activeItem = document.querySelector(`.nerve-item[data-nerve="${nerveName}"]`);
        if (activeItem) activeItem.classList.add('active');

        // Hero Update
        document.getElementById('hero-title').innerText = explorer.currentNerve.name;
        document.getElementById('hero-roots').innerText = explorer.currentNerve.roots;

        const hero = document.getElementById('nerve-hero');
        if (hero) {
            hero.className = 'nerve-hero';
            hero.classList.add(`bg-${nerveName}`);
        }

        const themeColor = explorer.data.themeColors[nerveName] || '#64748b';
        if (activeContainer) activeContainer.style.color = themeColor;

        // Story Update
        const storyBox = document.getElementById('story-box');
        if (storyBox) {
            storyBox.innerHTML = `
                <div style="font-weight: 800; font-size: 1.1em; color: ${themeColor}; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h1.66"/><path d="M11 21.09V19a2 2 0 0 1 2-2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h1.66"/><path d="M12 2v0a2 2 0 0 0-2 2v0c0 1.1-.9 2-2 2v0a2 2 0 0 1-2-2v0a2 2 0 0 0-2-2"/><path d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10A10 10 0 0 1 2 12Z"/></svg>
                    The Anatomical Overview
                </div>
                <div style="font-size: 1.05em; line-height: 1.7; color: #334155;">${explorer.currentNerve.story}</div>
            `;
        }

        // Image Load
        const img = document.getElementById('main-pathway-img');
        if (img) {
            if (explorer.currentNerve.imagePath) {
                img.src = explorer.currentNerve.imagePath;
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        }

        document.getElementById('total-step-num').innerText = explorer.maxSteps;
        this.resetVisualization();
        this.showStep(0);
    },

    resetVisualization() {
        const pathMain = document.getElementById('path-main');
        const pathShadow = document.getElementById('path-shadow');
        const zoomStage = document.getElementById('nerve-zoom-stage');

        if (pathMain) pathMain.setAttribute('d', '');
        if (pathShadow) pathShadow.setAttribute('d', '');
        if (zoomStage) zoomStage.style.transform = 'scale(1) translate(0, 0)';
    },

    showStep(stepIndex) {
        const explorer = window.pathwayExplorer;
        if (!explorer || !explorer.currentNerve) return;

        const steps = explorer.currentNerve.steps;
        explorer.currentStep = stepIndex;

        // Render Timeline
        const stepsContainer = document.getElementById('timeline-steps');
        if (stepsContainer) {
            stepsContainer.innerHTML = steps.map((s, i) => {
                let stateClass = i < stepIndex ? 'past' : (i === stepIndex ? 'active' : '');

                let injuryHtml = '';
                if (s.isInjurySite) {
                    injuryHtml = `
                        <div class="entrapment-label">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            Key Entrapment Site
                        </div>
                    `;
                }

                return `
                    <div class="step-timeline-item ${stateClass}" onclick="showStep(${i})">
                        <div class="timeline-dot"></div>
                        ${injuryHtml}
                        <div class="step-card">
                            <div class="step-card-title">${s.title}</div>
                            <div class="step-card-desc">${s.desc}</div>
                        </div>
                    </div>
                `;
            }).join('');

            // Append knowledge check card after the last timeline step
            const kc = explorer.currentNerve.knowledgeCheck;
            if (kc) {
                const optionsHtml = kc.options.map((opt, i) => {
                    const isCorrect = i === kc.correct;
                    const escapedExplanation = kc.explanation.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                    return `<button class="kc-option-btn" data-correct="${isCorrect}" onclick="_pathwayCheckAnswer(this, ${isCorrect}, '${escapedExplanation}')" style="display:block;width:100%;text-align:left;padding:12px 16px;margin-bottom:8px;border:2px solid #e2e8f0;border-radius:8px;background:#fff;font-size:0.95em;color:#334155;cursor:pointer;font-weight:500;transition:all 0.2s;font-family:inherit;"><strong style="margin-right:8px;color:#64748b;">${String.fromCharCode(65 + i)}.</strong>${opt}</button>`;
                }).join('');

                stepsContainer.innerHTML += `
                    <div class="knowledge-check-card" style="margin-top:10px;padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #6366f1;border-radius:0 12px 12px 0;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                        <div style="font-size:0.8em;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#6366f1;margin-bottom:12px;">Knowledge Check</div>
                        <div style="font-size:1em;font-weight:600;color:#0f172a;line-height:1.6;margin-bottom:18px;">${kc.question}</div>
                        <div>${optionsHtml}</div>
                        <div class="kc-explanation" style="display:none;margin-top:16px;padding:14px 18px;background:#fff;border-radius:8px;border:1px solid #e2e8f0;font-size:0.95em;line-height:1.6;color:#334155;"></div>
                    </div>
                `;
            }
        }

        // Handle Zoom Effect for Image (Safe Zoom to prevent cutoff)
        const currentStep = steps[stepIndex];
        const zoomStage = document.getElementById('nerve-zoom-stage');

        // We only zoom slightly on injury sites to emphasize them, but not enough to drastically cut off the image.
        // If exact coordinates are added back to the data later, this logic will still function safely.
        if (currentStep && currentStep.isInjurySite) {
            if (zoomStage) zoomStage.style.transform = 'scale(1.2) translate(0, 0)';
        } else {
            if (zoomStage) zoomStage.style.transform = 'scale(1) translate(0, 0)';
        }

        // Footer Management
        document.getElementById('current-step-num').innerText = stepIndex + 1;
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) prevBtn.disabled = stepIndex === 0;
        if (nextBtn) {
            if (stepIndex === explorer.maxSteps - 1) {
                nextBtn.innerText = 'Completed';
                nextBtn.disabled = true;
            } else {
                nextBtn.innerText = 'Trace Forward';
                nextBtn.disabled = false;
            }
        }
    },

    nextStep() {
        const exp = window.pathwayExplorer;
        if (exp && exp.currentStep < exp.maxSteps - 1) this.showStep(exp.currentStep + 1);
    },

    previousStep() {
        const exp = window.pathwayExplorer;
        if (exp && exp.currentStep > 0) this.showStep(exp.currentStep - 1);
    }
};

window.generatePathwayExplorerContent = PathwayExplorer.generateContent;
window.initializePathwayExplorer = PathwayExplorer.initialize;

export default PathwayExplorer;
