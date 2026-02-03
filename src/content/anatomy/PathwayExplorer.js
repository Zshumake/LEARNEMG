const generateContent = () => `
    <style>
        .pathway-app-container {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 0;
            height: calc(100vh - 120px); /* Adjust based on your header height */
            min-height: 600px;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
            padding: 20px;
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
            margin: 15px 10px 5px;
            font-weight: 700;
        }

        .nerve-item {
            padding: 12px 15px;
            margin-bottom: 6px; /* Increased separation */
            border-radius: 8px; /* Softer corners */
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid transparent; /* default border */
            font-size: 0.95rem;
            color: #475569;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            position: relative;
            overflow: hidden;
        }
        
        /* Subtle hover effect for all */
        .nerve-item:hover {
            transform: translateX(4px);
            background: #f1f5f9;
        }

        /* Active State Base */
        .nerve-item.active {
            color: white;
            font-weight: 600;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: none;
        }
        
        .nerve-item.active .root-badge {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .nerve-item.active::before { display: none; } /* Remove the old bar indicator */

        /* SPECIFIC COLORS - Active Backgrounds */
        .nerve-item[data-nerve="median"].active { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
        .nerve-item[data-nerve="ulnar"].active { background: linear-gradient(135deg, #7c3aed, #6d28d9); }
        .nerve-item[data-nerve="radial"].active { background: linear-gradient(135deg, #ea580c, #c2410c); }
        .nerve-item[data-nerve="musculocutaneous"].active { background: linear-gradient(135deg, #059669, #047857); }
        .nerve-item[data-nerve="axillary"].active { background: linear-gradient(135deg, #dc2626, #b91c1c); }
        
        /* Lower Extremity Colors - Differentiated */
        .nerve-item[data-nerve="sciatic"].active { background: linear-gradient(135deg, #0f172a, #1e293b); }
        .nerve-item[data-nerve="tibial"].active { background: linear-gradient(135deg, #0891b2, #0e7490); } /* Cyan/Teal */
        .nerve-item[data-nerve="peroneal"].active { background: linear-gradient(135deg, #d97706, #b45309); } /* Amber */
        .nerve-item[data-nerve="femoral"].active { background: linear-gradient(135deg, #4f46e5, #4338ca); } /* Indigo */
        .nerve-item[data-nerve="obturator"].active { background: linear-gradient(135deg, #be185d, #9d174d); } /* Pink */
        .nerve-item[data-nerve="sural"].active { background: linear-gradient(135deg, #059669, #047857); } /* Emerald match */

        /* Hover Colors (Subtle tints) */
        .nerve-item[data-nerve="median"]:not(.active):hover { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
        .nerve-item[data-nerve="ulnar"]:not(.active):hover { background: #f5f3ff; color: #6d28d9; border-color: #ddd6fe; }
        .nerve-item[data-nerve="radial"]:not(.active):hover { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
        .nerve-item[data-nerve="musculocutaneous"]:not(.active):hover { background: #ecfdf5; color: #047857; border-color: #a7f3d0; }
        .nerve-item[data-nerve="axillary"]:not(.active):hover { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
        .nerve-item[data-nerve="sciatic"]:not(.active):hover { background: #f8fafc; color: #0f172a; border-color: #cbd5e1; }
        
        
        /* Roots Badge */
        .root-badge {
            font-size: 0.75em;
            padding: 2px 6px;
            border-radius: 4px;
            background: #f1f5f9;
            color: #64748b;
            font-weight: 500;
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

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #94a3b8;
            text-align: center;
            padding: 20px;
        }

        /* HERO HEADER in main view */
        .nerve-hero {
            padding: 30px;
            color: white;
            position: relative;
            z-index: 1;
        }
        /* Dynamic Gradients */
        .bg-median { background: linear-gradient(135deg, #2563eb, #1e40af); }
        .bg-ulnar { background: linear-gradient(135deg, #7c3aed, #5b21b6); }
        .bg-radial { background: linear-gradient(135deg, #f59e0b, #b45309); }
        .bg-musculocutaneous { background: linear-gradient(135deg, #10b981, #047857); }
        .bg-axillary { background: linear-gradient(135deg, #ef4444, #b91c1c); }
        .bg-sciatic { background: linear-gradient(135deg, #0f172a, #334155); } 
        .bg-default { background: linear-gradient(135deg, #64748b, #475569); }

        .content-grid {
            display: grid;
            grid-template-columns: 320px 1fr; /* Fixed timeline width, rest for visuals */
            gap: 0;
            flex: 1;
            overflow: hidden;
        }

        /* Left Split: Timeline */
        .steps-container {
            padding: 25px;
            border-right: 1px solid #f1f5f9;
            overflow-y: auto;
            background: #fcfcfc;
            min-width: 320px; /* Prevent shrinking */
        }

        .step-timeline-item {
            position: relative;
            padding-left: 30px;
            padding-bottom: 25px;
            border-left: 2px solid #e2e8f0;
            cursor: pointer;
        }
        .step-timeline-item:last-child { border-left-color: transparent; }
        
        .timeline-dot {
            position: absolute;
            left: -6px;
            top: 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
            border: 2px solid #cbd5e1;
            transition: all 0.3s;
        }
        .step-timeline-item.active .timeline-dot {
            background: currentColor; /* Inherits from parent color */
            border-color: currentColor;
            transform: scale(1.4);
            box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
        }
        .step-timeline-item.past .timeline-dot {
            background: currentColor;
            border-color: currentColor;
        }

        .step-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #f1f5f9;
            box-shadow: 0 1px 2px rgba(0,0,0,0.02);
            transition: all 0.2s;
            margin-top: -5px;
        }
        .step-timeline-item.active .step-card {
            border-color: currentColor;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        
        /* Hover Effect for steps */
        .step-timeline-item:hover .step-card {
            transform: translateY(-3px);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
            border-color: #cbd5e1;
        }
        
        .entrapment-label {
            display: inline-block;
            font-size: 0.7em;
            font-weight: 700;
            text-transform: uppercase;
            padding: 3px 8px;
            border-radius: 4px;
            background: #fee2e2;
            color: #991b1b;
            margin-left: 8px;
            letter-spacing: 0.5px;
        }

        /* Right Split: Visuals & Lore */
        .visual-container {
            padding: 25px;
            overflow-y: auto;
            background: #fff;
            display: flex;
            flex-direction: column;
            height: 100%; /* Ensure full height usage */
        }

        .story-box {
            background: #f0fdf4; /* Light green/fresh background */
            border-left: 4px solid #10b981;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
            flex-shrink: 0; /* Don't shrink the story */
        }
        
        .img-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 10px;
            min-height: 400px;
            position: relative;
            overflow: hidden;
        }

        .image-coord-space {
            position: relative;
            display: inline-block;
            max-width: 100%;
            max-height: 100%;
        }

        .image-coord-space img {
            display: block;
            max-width: 100%;
            max-height: 80vh; /* Prevent it from being too tall */
            object-fit: contain;
        }

        .img-wrapper img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* SVG Overlay Styling */
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
            stroke-width: 4;
            stroke-linecap: round;
            stroke-linejoin: round;
            filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
            transition: stroke-dashoffset 0.8s ease-in-out, stroke 0.3s;
        }

        .nerve-path-shadow {
            fill: none;
            stroke: rgba(0, 0, 0, 0.1);
            stroke-width: 6;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        /* Zoom Container */
        .zoom-stage {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-origin: center center;
        }

        .entrapment-marker {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(239, 68, 68, 0.2);
            border: 2px solid #ef4444;
            border-radius: 50%;
            display: none;
            animation: pulse-red 2s infinite;
            z-index: 6;
        }

        @keyframes pulse-red {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        
        .controls-footer {
            background: white;
            padding: 15px 25px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav-btn {
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
        }
        .nav-btn.secondary { background: #f1f5f9; color: #475569; }
        .nav-btn.secondary:hover { background: #e2e8f0; }
        
        .nav-btn.primary { background: #0f172a; color: white; }
        .nav-btn.primary:hover { background: #1e293b; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @media (max-width: 900px) {
            .pathway-app-container { grid-template-columns: 1fr; height: auto; }
            .pathway-sidebar { height: 200px; border-bottom: 1px solid #e2e8f0; border-right: none; }
            .content-grid { grid-template-columns: 1fr; }
            .steps-container { min-width: auto; }
        }
    </style>

    <div class="pathway-app-container">
        <!-- SIDEBAR -->
        <div class="pathway-sidebar">
            <div class="sidebar-header">
                <h3 style="margin: 0; font-size: 1.1em; color: #1e293b; font-weight: 800;">Nerve Explorer</h3>
                <p style="margin: 5px 0 0; font-size: 0.85em; color: #64748b;">Select a pathway to begin</p>
            </div>
            
            <div class="nerve-list-group">
                <div class="nerve-group-title">Upper Extremity</div>
                <div class="nerve-item" data-nerve="median" onclick="selectNerve('median')">
                    <span>Median Nerve</span>
                    <span class="root-badge">C6-T1</span>
                </div>
                <div class="nerve-item" data-nerve="ulnar" onclick="selectNerve('ulnar')">
                    <span>Ulnar Nerve</span>
                    <span class="root-badge">C8-T1</span>
                </div>
                <div class="nerve-item" data-nerve="radial" onclick="selectNerve('radial')">
                    <span>Radial Nerve</span>
                    <span class="root-badge">C5-T1</span>
                </div>
                <div class="nerve-item" data-nerve="musculocutaneous" onclick="selectNerve('musculocutaneous')">
                    <span>Musculocutaneous</span>
                    <span class="root-badge">C5-C7</span>
                </div>
                <div class="nerve-item" data-nerve="axillary" onclick="selectNerve('axillary')">
                    <span>Axillary Nerve</span>
                    <span class="root-badge">C5-C6</span>
                </div>
            </div>

            <div class="nerve-list-group">
                <div class="nerve-group-title">Lower Extremity</div>
                <div class="nerve-item" data-nerve="sciatic" onclick="selectNerve('sciatic')">
                    <span>Sciatic Nerve</span>
                    <span class="root-badge">L4-S3</span>
                </div>
                <div class="nerve-item" data-nerve="tibial" onclick="selectNerve('tibial')">
                    <span>Tibial Nerve</span>
                    <span class="root-badge">L4-S3</span>
                </div>
                <div class="nerve-item" data-nerve="peroneal" onclick="selectNerve('peroneal')">
                    <span>Peroneal Nerve</span>
                    <span class="root-badge">L4-S2</span>
                </div>
                <div class="nerve-item" data-nerve="femoral" onclick="selectNerve('femoral')">
                    <span>Femoral Nerve</span>
                    <span class="root-badge">L2-L4</span>
                </div>
                <div class="nerve-item" data-nerve="obturator" onclick="selectNerve('obturator')">
                    <span>Obturator Nerve</span>
                    <span class="root-badge">L2-L4</span>
                </div>
                <div class="nerve-item" data-nerve="sural" onclick="selectNerve('sural')">
                    <span>Sural Nerve</span>
                    <span class="root-badge">S1-S2</span>
                </div>
            </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="pathway-main" id="main-content-area">
            <!-- Empty State -->
            <div id="empty-state" class="empty-state">
                <div style="width: 60px; height: 60px; background: #f1f5f9; border-radius: 50%; margin-bottom: 20px;"></div>
                <h3 style="color: #475569;">No Nerve Selected</h3>
                <p>Choose a nerve from the sidebar to view its anatomical pathway.</p>
            </div>

            <!-- Active Content (Hidden by default) -->
            <div id="active-nerve-content" style="display: none; height: 100%; flex-direction: column;">
                
                <!-- Hero Header -->
                <div id="nerve-hero" class="nerve-hero bg-default">
                    <h2 id="hero-title" style="margin: 0; font-size: 1.8em; font-weight: 800;">Nerve Name</h2>
                    <p id="hero-roots" style="margin: 5px 0 0; opacity: 0.9;">Roots Information</p>
                </div>

                <!-- Split Content -->
                <div class="content-grid">
                    <!-- Left: Timeline -->
                    <div class="steps-container">
                        <div style="font-size: 0.8em; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px;">Pathway Steps</div>
                        <div id="timeline-steps">
                            <!-- Injected -->
                        </div>
                    </div>

                    <!-- Right: Visuals -->
                    <div class="visual-container">
                        <div style="font-size: 0.8em; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px;">Clinical Context</div>
                        
                        <div class="story-box" id="story-box">
                            <!-- Story injected -->
                        </div>

                        <div class="img-wrapper" id="zoom-viewport">
                            <div class="zoom-stage" id="nerve-zoom-stage">
                                <div id="nerve-image-container" class="image-coord-space">
                                    <svg class="nerve-svg-overlay" id="nerve-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path class="nerve-path-shadow" id="path-shadow" d=""></path>
                                        <path class="nerve-path-animated" id="path-main" d=""></path>
                                    </svg>
                                    <div class="entrapment-marker" id="zoom-marker"></div>
                                    <img id="main-pathway-img" src="" alt="Pathway Diagram">
                                </div>
                            </div>
                        </div>
        </div>
                    </div>
                </div>

                <!-- Footer Navigation -->
                <div class="controls-footer">
                    <button class="nav-btn secondary" id="prev-btn" onclick="previousStep()">Previous</button>
                    <div style="color: #94a3b8; font-size: 0.9em;">Step <span id="current-step-num">1</span> of <span id="total-step-num">5</span></div>
                    <button class="nav-btn primary" id="next-btn" onclick="nextStep()">Next Step</button>
                </div>
            </div>
        </div>
    </div>
`;

export const PathwayExplorer = {
    generateContent,

    // Initial State
    state: {
        currentNerve: null,
        currentStep: 0,
        maxSteps: 0,
        // Theme mapping
        themeColors: {
            median: '#2563eb', // blue
            ulnar: '#7c3aed', // purple
            radial: '#ea580c', // orange
            musculocutaneous: '#059669', // green
            axillary: '#dc2626', // red
            sciatic: '#0f172a', // slate
            tibial: '#0f172a',
            peroneal: '#0f172a',
            femoral: '#0f172a',
            obturator: '#0f172a',
            sural: '#0f172a'
        },
        nerveData: {
            median: {
                name: "Median Nerve",
                roots: "C6-T1",
                story: "The Median nerve originates from the lateral and medial cords of the brachial plexus. It travels down the arm medial to the humerus, passes through the cubital fossa, and enters the forearm between the heads of the pronator teres. It supplies the flexor compartment of the forearm before passing through the carpal tunnel to innervate the thenar muscles and provide sensation to the lateral 3.5 digits.",
                imagePath: "images/pathways/Median Nerve Optimized.png",
                steps: [
                    { title: "Origin", desc: "Forms from lateral and medial cords of brachial plexus (C6-T1)", isInjurySite: false },
                    { title: "Upper Arm", desc: "Travels medially to humerus in bicipital groove", isInjurySite: false },
                    { title: "Cubital Fossa", desc: "Passes medial to brachial artery", isInjurySite: false },
                    { title: "Forearm Entry", desc: "Passes between heads of pronator teres (common entrapment site)", isInjurySite: true },
                    { title: "AIN Branch", desc: "Gives off anterior interosseous nerve", isInjurySite: false },
                    { title: "Carpal Tunnel", desc: "Passes through carpal tunnel under transverse carpal ligament (most common entrapment)", isInjurySite: true },
                    { title: "Hand", desc: "Divides into branches for thenar muscles (LOAF)", isInjurySite: false }
                ]
            },
            ulnar: {
                name: "Ulnar Nerve",
                roots: "C8-T1",
                story: "The Ulnar nerve arises from the medial cord. It descends the medial arm, passing behind the medial epicondyle (cubital tunnel) where it is superficial and vulnerable. It enters the forearm between heads of the FCU, descends to the wrist, and passes through Guyon's canal to innervate intrinsic hand muscles.",
                imagePath: "images/pathways/Ulnar%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Arises from medial cord of brachial plexus (C8-T1)", isInjurySite: false },
                    { title: "Upper Arm", desc: "Travels down medial aspect of arm", isInjurySite: false },
                    { title: "Cubital Tunnel", desc: "Passes through cubital tunnel under Osborne's band behind medial epicondyle (most common entrapment)", isInjurySite: true },
                    { title: "Forearm", desc: "Travels between FCU and FDP in forearm", isInjurySite: false },
                    { title: "Guyon's Canal", desc: "Passes through Guyon's canal at wrist (volar carpal ligament roof)", isInjurySite: true },
                    { title: "Hand Division", desc: "Splits into superficial and deep branches", isInjurySite: false },
                    { title: "Hand Muscles", desc: "Innervates intrinsic hand muscles and sensation", isInjurySite: false }
                ]
            },
            radial: {
                name: "Radial Nerve",
                roots: "C5-T1",
                story: "The Radial nerve originates from the posterior cord. It winds around the humerus in the spiral groove (vulnerable to fracture), pierces the lateral intermuscular septum, and divides at the elbow into superficial (sensory) and deep (PIN - motor) branches.",
                imagePath: "images/pathways/Radial%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Arises from posterior cord (C5-T1)", isInjurySite: false },
                    { title: "Spiral Groove", desc: "Travels in spiral groove of humerus directly on bone (most vulnerable point for compression/fracture)", isInjurySite: true },
                    { title: "Lateral Arm", desc: "Emerges laterally, pierces lateral intermuscular septum", isInjurySite: false },
                    { title: "Elbow Division", desc: "Divides into superficial and deep (PIN) branches", isInjurySite: false },
                    { title: "Posterior Forearm", desc: "PIN passes through arcade of Frohse at supinator (compression site)", isInjurySite: true },
                    { title: "Dorsal Hand", desc: "Superficial branch provides dorsal hand sensation", isInjurySite: false }
                ]
            },
            musculocutaneous: {
                name: "Musculocutaneous Nerve",
                roots: "C5-C7",
                story: "Arising from the lateral cord, this nerve pierces the coracobrachialis muscle and travels between the biceps and brachialis, supplying the anterior arm flexors. It terminates as the lateral antebrachial cutaneous nerve.",
                imagePath: "images/pathways/Musculocutaneous%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Arises from lateral cord of brachial plexus (C5-C7)", isInjurySite: false },
                    { title: "Coracobrachialis", desc: "Pierces coracobrachialis muscle", isInjurySite: false },
                    { title: "Biceps Brachii", desc: "Innervates biceps brachii", isInjurySite: false },
                    { title: "Brachialis", desc: "Innervates lateral part of brachialis", isInjurySite: false },
                    { title: "Lateral Cutaneous", desc: "Becomes lateral cutaneous nerve of forearm", isInjurySite: false },
                    { title: "Forearm Sensation", desc: "Provides sensation to lateral forearm", isInjurySite: false }
                ]
            },
            axillary: {
                name: "Axillary Nerve",
                roots: "C5-C6",
                story: "From the posterior cord, the Axillary nerve passes posteriorly through the quadrilateral space with the posterior circumflex humeral artery. It winds around the surgical neck of the humerus to innervate the deltoid and teres minor.",
                imagePath: "images/pathways/Axillary%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Arises from posterior cord (C5-C6)", isInjurySite: false },
                    { title: "Quadrilateral Space", desc: "Passes through quadrilateral space", isInjurySite: false },
                    { title: "Surgical Neck", desc: "Wraps around surgical neck of humerus (vulnerable to fracture)", isInjurySite: true },
                    { title: "Deltoid Motor", desc: "Innervates deltoid muscle", isInjurySite: false },
                    { title: "Teres Minor", desc: "Innervates teres minor muscle", isInjurySite: false },
                    { title: "Cutaneous Branch", desc: "Provides sensation over deltoid (regimental patch)", isInjurySite: false }
                ]
            },
            femoral: {
                name: "Femoral Nerve",
                roots: "L2-L4",
                story: "The Femoral nerve arises from the lumbar plexus, passes deep to the inguinal ligament, and enters the femoral triangle lateral to the femoral artery. It branches extensively to supply the quadriceps and anterior thigh skin.",
                imagePath: "images/pathways/Femoral%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Forms from lumbar plexus (L2-L4)", isInjurySite: false },
                    { title: "Inguinal Ligament", desc: "Passes under inguinal ligament", isInjurySite: false },
                    { title: "Femoral Triangle", desc: "Enters femoral triangle", isInjurySite: false },
                    { title: "Quadriceps", desc: "Innervates quadriceps muscle group", isInjurySite: false },
                    { title: "Saphenous Branch", desc: "Gives off saphenous nerve", isInjurySite: false },
                    { title: "Medial Leg", desc: "Saphenous nerve provides sensation to medial leg", isInjurySite: false }
                ]
            },
            tibial: {
                name: "Tibial Nerve",
                roots: "L4-S3",
                story: "The medial division of the sciatic nerve. It traverses the popliteal fossa, descends the posterior leg supplying plantarflexors, and passes through the tarsal tunnel behind the medial malleolus to innervate the foot.",
                imagePath: "images/pathways/Tibial%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Medial division of sciatic nerve (L4-S3)", isInjurySite: false },
                    { title: "Popliteal Fossa", desc: "Continues from sciatic bifurcation", isInjurySite: false },
                    { title: "Posterior Leg", desc: "Travels down posterior compartment", isInjurySite: false },
                    { title: "Plantarflexors", desc: "Innervates calf muscles and deep compartment", isInjurySite: false },
                    { title: "Tarsal Tunnel", desc: "Passes through tarsal tunnel under flexor retinaculum at medial ankle (entrapment site)", isInjurySite: true },
                    { title: "Foot Muscles", desc: "Divides into medial and lateral plantar nerves for intrinsic foot muscles", isInjurySite: false }
                ]
            },
            peroneal: {
                name: "Peroneal (Fibular) Nerve",
                roots: "L4-S2",
                story: "The Common Peroneal nerve (lateral sciatic division) winds around the fibular neck (highly vulnerable). It divides into superficial (lateral compartment, eversion) and deep (anterior compartment, dorsiflexion) branches.",
                imagePath: "images/pathways/Deep%20Fibular%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Lateral division of sciatic nerve (L4-S2)", isInjurySite: false },
                    { title: "Fibular Head", desc: "Wraps around fibular neck through fibular tunnel (most common lower extremity mononeuropathy)", isInjurySite: true },
                    { title: "Superficial Branch", desc: "Gives off superficial peroneal nerve for ankle eversion", isInjurySite: false },
                    { title: "Deep Branch", desc: "Continues as deep peroneal nerve for ankle dorsiflexion", isInjurySite: false },
                    { title: "Anterior Tarsal Tunnel", desc: "Deep peroneal passes under inferior extensor retinaculum at ankle (rare entrapment)", isInjurySite: true },
                    { title: "Foot", desc: "Provides motor to foot extensors and sensation to dorsal foot and first web space", isInjurySite: false }
                ]
            },
            sciatic: {
                name: "Sciatic Nerve",
                roots: "L4-S3",
                story: "The largest nerve in the body, leaving the pelvis via the greater sciatic foramen. It descends the posterior thigh, innervating hamstrings, before splitting into tibial and common peroneal nerves.",
                imagePath: "images/pathways/Sciatic%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Forms from sacral plexus (L4-S3)", isInjurySite: false },
                    { title: "Greater Sciatic Foramen", desc: "Exits pelvis through greater sciatic foramen", isInjurySite: false },
                    { title: "Posterior Thigh", desc: "Travels down posterior thigh, innervating hamstrings", isInjurySite: false },
                    { title: "Popliteal Fossa", desc: "Divides into tibial and common peroneal nerves at popliteal fossa", isInjurySite: false }
                ]
            },
            obturator: {
                name: "Obturator Nerve",
                roots: "L2-L4",
                story: "Arising from the lumbar plexus, it passes through the obturator canal to innervate the medial thigh adductor muscles and cutaneous distribution.",
                imagePath: "images/pathways/Obturator%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Forms from lumbar plexus (L2-L4)", isInjurySite: false },
                    { title: "Obturator Canal", desc: "Passes through obturator canal", isInjurySite: true },
                    { title: "Thigh", desc: "Divides into anterior and posterior branches", isInjurySite: false },
                    { title: "Adductors", desc: "Innervates adductor muscle group", isInjurySite: false },
                    { title: "Skin", desc: "Provides sensation to medial thigh", isInjurySite: false }
                ]
            },
            sural: {
                name: "Sural Nerve",
                roots: "S1-S2",
                story: "A pure sensory nerve formed by branches of the tibial and common peroneal nerves. It runs distally with the small saphenous vein, passing posterior to the lateral malleolus to supply the lateral foot.",
                imagePath: "images/pathways/Sural%20Nerve.png",
                steps: [
                    { title: "Origin", desc: "Formed by union of medial sural cutaneous (tibial) and sural communicating branch (common peroneal) (S1-S2)", isInjurySite: false },
                    { title: "Posterior Leg", desc: "Travels down midline of posterior calf with small saphenous vein", isInjurySite: false },
                    { title: "Lateral Malleolus", desc: "Passes posterior to lateral malleolus (key landmark)", isInjurySite: false },
                    { title: "Foot", desc: "Travels along lateral side of foot", isInjurySite: false },
                    { title: "Innervation", desc: "Sensation to posterolateral leg, lateral foot, and lateral aspect of 5th toe", isInjurySite: false }
                ]
            }
        }
    },

    initialize() {
        // FORCE RESET STATE to avoid stale window objects from previous versions
        window.pathwayExplorer = this.state;

        // Expose functions globally with proper context binding
        window.selectNerve = this.selectNerve.bind(this);
        window.showStep = this.showStep.bind(this);
        window.nextStep = this.nextStep.bind(this);
        window.previousStep = this.previousStep.bind(this);
        window.pickCoordinate = this.pickCoordinate.bind(this);

        // Add coordinate picker listener
        const container = document.getElementById('nerve-image-container');
        if (container) {
            container.onclick = (e) => this.pickCoordinate(e);
        }

        console.log("%cNERVE PATHWAY CALIBRATOR", "color: #3b82f6; font-size: 20px; font-weight: bold;");
        console.log("1. Click anywhere on the image to get {x, y} coordinates.");
        console.log("2. Use these coordinates in PathwayExplorer.js nerveData.");
        console.log("3. The blue dot shows exactly where your point will land.");
    },

    pickCoordinate(event) {
        const container = document.getElementById('nerve-image-container');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        // Calculate relative to the image container
        const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1);

        console.log(`%cCOORDINATE: {x: ${x}, y: ${y}}`, "color: #10b981; font-weight: bold;");

        // Visual feedback
        const marker = document.createElement('div');
        marker.style.position = 'absolute';
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
        marker.style.width = '8px';
        marker.style.height = '8px';
        marker.style.background = '#3b82f6';
        marker.style.borderRadius = '50%';
        marker.style.transform = 'translate(-50%, -50%)';
        marker.style.zIndex = '100';
        marker.style.pointerEvents = 'none';
        container.appendChild(marker);
        setTimeout(() => marker.remove(), 2000);
    },

    selectNerve(nerveName) {
        // Always read from window.pathwayExplorer to ensure single source of truth
        const explorer = window.pathwayExplorer;
        if (!explorer || !explorer.nerveData[nerveName]) {
            console.error("Nerve data not found for:", nerveName);
            return;
        }

        explorer.currentNerve = explorer.nerveData[nerveName];
        explorer.currentStep = 0;
        explorer.maxSteps = explorer.currentNerve.steps.length;

        // UI Updates
        document.getElementById('empty-state').style.display = 'none';
        const activeContainer = document.getElementById('active-nerve-content');
        if (activeContainer) {
            activeContainer.style.display = 'flex';
        }

        // Sidebar active state
        document.querySelectorAll('.nerve-item').forEach(el => el.classList.remove('active'));
        const activeItem = document.querySelector(`.nerve-item[data-nerve="${nerveName}"]`);
        if (activeItem) activeItem.classList.add('active');

        // Hero Update
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.innerText = explorer.currentNerve.name;

        const heroRoots = document.getElementById('hero-roots');
        if (heroRoots) heroRoots.innerText = explorer.currentNerve.roots;

        // Hero Background
        const hero = document.getElementById('nerve-hero');
        if (hero) {
            hero.className = 'nerve-hero'; // reset
            const themeClass = `bg-${nerveName}` in {
                'bg-median': 1, 'bg-ulnar': 1, 'bg-radial': 1, 'bg-musculocutaneous': 1, 'bg-axillary': 1, 'bg-sciatic': 1
            } ? `bg-${nerveName}` : 'bg-default';
            hero.classList.add(themeClass);
        }

        // Update Theme Color CSS VAR for timeline
        const themeColor = explorer.themeColors[nerveName] || '#64748b';
        if (activeContainer) {
            activeContainer.style.color = themeColor;
        }

        // Story
        const storyBox = document.getElementById('story-box');
        if (storyBox) {
            storyBox.innerHTML = `
                <div style="font-weight:700; color:#065f46; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
                    Pathway Story
                </div>
                <div style="font-size:0.95em; line-height:1.6; color:#1e293b;">${explorer.currentNerve.story}</div>
            `;
        }

        // Image
        const img = document.getElementById('main-pathway-img');
        if (img) {
            if (explorer.currentNerve.imagePath) {
                img.src = explorer.currentNerve.imagePath;
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        }

        const totalStepNum = document.getElementById('total-step-num');
        if (totalStepNum) totalStepNum.innerText = explorer.maxSteps;

        // Reset Visualization
        this.resetVisualization();

        this.showStep(0);
    },

    resetVisualization() {
        const pathMain = document.getElementById('path-main');
        const pathShadow = document.getElementById('path-shadow');
        const zoomStage = document.getElementById('nerve-zoom-stage');
        const zoomMarker = document.getElementById('zoom-marker');

        if (pathMain) pathMain.setAttribute('d', '');
        if (pathShadow) pathShadow.setAttribute('d', '');
        if (zoomStage) zoomStage.style.transform = 'scale(1) translate(0, 0)';
        if (zoomMarker) zoomMarker.style.display = 'none';
    },

    showStep(stepIndex) {
        const explorer = window.pathwayExplorer;
        if (!explorer || !explorer.currentNerve) return;

        const steps = explorer.currentNerve.steps;
        explorer.currentStep = stepIndex;

        // Update Visualization (Nerve growth and Zoom)
        this.updateNerveVisualization(stepIndex);

        // Update Timeline
        const stepsContainer = document.getElementById('timeline-steps');
        if (stepsContainer) {
            stepsContainer.innerHTML = steps.map((s, i) => {
                let stateClass = '';
                if (i < stepIndex) stateClass = 'past';
                else if (i === stepIndex) stateClass = 'active';

                const injuryBadge = s.isInjurySite ? `<span class="entrapment-label">Entrapment Site</span>` : '';

                return `
                    <div class="step-timeline-item ${stateClass}" onclick="showStep(${i})">
                        <div class="timeline-dot"></div>
                        <div class="step-card">
                            <div style="font-weight:600; font-size:0.95em; margin-bottom:4px; color:#1e293b;">${s.title} ${injuryBadge}</div>
                            <div style="color:#64748b; font-size:0.9em; line-height:1.4;">${s.desc}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Update Footer Controls
        const currentStepNum = document.getElementById('current-step-num');
        if (currentStepNum) currentStepNum.innerText = stepIndex + 1;

        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) prevBtn.disabled = stepIndex === 0;

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            if (stepIndex === explorer.maxSteps - 1) {
                nextBtn.innerText = 'Completed';
                nextBtn.disabled = true;
            } else {
                nextBtn.innerText = 'Next Step';
                nextBtn.disabled = false;
            }
        }
    },

    updateNerveVisualization(stepIndex) {
        const explorer = window.pathwayExplorer;
        const steps = explorer.currentNerve.steps;
        const currentStep = steps[stepIndex];

        const pathMain = document.getElementById('path-main');
        const pathShadow = document.getElementById('path-shadow');
        const zoomStage = document.getElementById('nerve-zoom-stage');
        const zoomMarker = document.getElementById('zoom-marker');

        // 1. Build & Update Path
        const coords = steps.slice(0, stepIndex + 1)
            .filter(s => s.coord)
            .map(s => `${s.coord.x},${s.coord.y}`);

        if (coords.length > 0) {
            const d = `M ${coords.join(' L ')}`;
            if (pathMain) {
                pathMain.setAttribute('d', d);
                // Color path based on nerve theme
                const activeNerve = Object.keys(explorer.nerveData).find(key => explorer.nerveData[key] === explorer.currentNerve);
                pathMain.style.stroke = explorer.themeColors[activeNerve] || '#64748b';
            }
            if (pathShadow) pathShadow.setAttribute('d', d);
        }

        // 2. Handle Zoom & Marker
        if (currentStep && currentStep.coord) {
            if (currentStep.isInjurySite) {
                // Zoom calculation: Center the coordinate
                // We shift the stage so the coordinate (x,y) moves to the center (50,50)
                const scale = 2.5;
                // Percentage based transforms can be tricky with scaling
                // Better approach: Calculate pixel-like offsets or use percentage centers
                const tx = (50 - currentStep.coord.x) * scale;
                const ty = (50 - currentStep.coord.y) * scale;

                if (zoomStage) {
                    zoomStage.style.transform = `scale(${scale}) translate(${tx / scale}%, ${ty / scale}%)`;
                }

                if (zoomMarker) {
                    zoomMarker.style.display = 'block';
                    zoomMarker.style.left = `${currentStep.coord.x}%`;
                    zoomMarker.style.top = `${currentStep.coord.y}%`;
                }
            } else {
                // Normal view - slightly zoomed out to see context
                if (zoomStage) zoomStage.style.transform = 'scale(1) translate(0, 0)';
                if (zoomMarker) zoomMarker.style.display = 'none';
            }
        }
    },

    nextStep() {
        const explorer = window.pathwayExplorer;
        if (explorer && explorer.currentStep < explorer.maxSteps - 1) {
            this.showStep(explorer.currentStep + 1);
        }
    },

    previousStep() {
        const explorer = window.pathwayExplorer;
        if (explorer && explorer.currentStep > 0) {
            this.showStep(explorer.currentStep - 1);
        }
    }
};

window.generatePathwayExplorerContent = PathwayExplorer.generateContent;
window.initializePathwayExplorer = PathwayExplorer.initialize;

export default PathwayExplorer;
