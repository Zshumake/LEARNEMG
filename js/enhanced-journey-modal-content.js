// Enhanced Journey Modal Content Generation Functions
// Clean implementation for smooth learning content integration

// Navigation transition helper
function navigateWithTransition(callback, duration = 300) {
    // Get main content areas to blur
    const mainContent = document.getElementById('learning-board') || document.getElementById('pgy-selection');

    if (mainContent) {
        // Add blur-out effect to current content
        mainContent.classList.add('blur-out');
    }

    // Wait for blur animation, then execute navigation
    setTimeout(() => {
        callback();

        // Remove blur from background after modal shows
        if (mainContent) {
            setTimeout(() => {
                mainContent.classList.remove('blur-out');
            }, 100);
        }
    }, duration);
}

// Detect iOS (use existing if already defined in index.html)
if (typeof window.isIOS === 'undefined') {
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
const isIOS = window.isIOS;

// Modal System Function with Transitions
function showModal(title, content) {
    console.log('🔍 DEBUG: showModal called with title:', title);
    console.log('🔍 DEBUG: Content length:', content ? content.length : 'null');
    console.log('🔍 DEBUG: iOS detected:', isIOS);

    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    console.log('🔍 DEBUG: Elements found:', {
        overlay: !!overlay,
        modalTitle: !!modalTitle,
        modalBody: !!modalBody
    });

    if (!overlay || !modalTitle || !modalBody) {
        console.error('❌ Modal elements not found');
        return;
    }

    // Set content
    modalTitle.textContent = title;

    // For iOS: Optimize content to reduce memory pressure
    // DISABLED: User requested full desktop experience on mobile
    /*
    if (isIOS && content && content.length > 30000) {
        console.log('📱 iOS: Optimizing large content for mobile');

        // Create a temporary div to parse content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Remove all image placeholders and large visual elements to reduce DOM size
        const images = tempDiv.querySelectorAll('img, [style*="background-image"]');
        images.forEach(img => {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = 'background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center; color: #0369a1; margin: 10px 0;';
            placeholder.textContent = '📱 Image hidden on mobile to improve performance';
            img.replaceWith(placeholder);
        });

        // Simplify complex nested structures
        const complexDivs = tempDiv.querySelectorAll('[style*="linear-gradient"]');
        complexDivs.forEach(div => {
            if (div.style.background) {
                div.style.background = '#f8fafc';
            }
        });

        modalBody.innerHTML = tempDiv.innerHTML;
        console.log('✅ iOS: Content optimized and loaded');
    } else {
        // Desktop or small content: load immediately
        modalBody.innerHTML = content;
    }
    */
    // Always load full content
    modalBody.innerHTML = content;

    // CRITICAL FIX: Mark modal body so overlay can identify and ignore touches from it
    // This is a simpler approach that doesn't use stopPropagation which causes Safari crashes
    modalBody.setAttribute('data-modal-content', 'true');

    // iOS FIX: Increase base font size so less zoom is needed
    if (isIOS) {
        modalBody.style.fontSize = '18px';
        modalBody.style.lineHeight = '1.8';

        // Make all text larger
        const allText = modalBody.querySelectorAll('p, li, span, div');
        allText.forEach(el => {
            const currentSize = window.getComputedStyle(el).fontSize;
            const sizeNum = parseFloat(currentSize);
            if (sizeNum < 16) {
                el.style.fontSize = '16px';
            }
        });

        console.log('✅ iOS: Increased base font size for better readability');
    }

    // Show overlay but keep it invisible initially
    overlay.style.display = 'flex';

    // Force a repaint to ensure display: flex is applied
    overlay.offsetHeight;

    // Trigger fade-in animation
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });

    // Show visual feedback that modal opened
    console.log(`✅ Modal opened with transition: ${title}`);
}

// Enhanced close modal with transition
function closeModalWithTransition() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        // Fade out
        overlay.classList.remove('show');

        // Hide after animation completes (increased to match slower transition)
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 700);
    }
}

// Make functions globally available
window.showModal = showModal;
window.navigateWithTransition = navigateWithTransition;
window.closeModalWithTransition = closeModalWithTransition;

// [Brachial Plexus Content Extracted to src/content/anatomy/BrachialPlexus.js]

// Content generation functions for each module type
// [EMG Introduction Content Extracted to src/content/emg/Introduction.js]

function generateMuscleQuizContent(module) {
    return window.contentLoader ? window.contentLoader.getHTMLSync('muscle-quiz') : '<div class="loading">Loading content...</div>';
}

// [NCS Fundamentals & Pathophysiology Extracted to src/content/ncs/Fundamentals.js]

// [NCS Basic Techniques Extracted to src/content/ncs/Techniques.js]

function generateEMGNeedleBasicsContent(module) {
    return window.contentLoader ? window.contentLoader.getHTMLSync('emg-needle-basics') : '<div class="loading">Loading content...</div>';
}

function generateBasicPatternsContent(module) {
    return window.contentLoader ? window.contentLoader.getHTMLSync('basic-patterns') : '<div class="loading">Loading content...</div>';
}

function generateRadiculopathyContent(module) {
    return window.contentLoader ? window.contentLoader.getHTMLSync('radiculopathy') : '<div class="loading">Loading content...</div>';
}

function generateNeuropathyContent(module) {
    return window.contentLoader ? window.contentLoader.getHTMLSync('neuropathy') : '<div class="loading">Loading content...</div>';
}

function generateCarpalTunnelContent() {
    return window.contentLoader ? window.contentLoader.getHTMLSync('carpal-tunnel') : '<div class="loading">Loading content...</div>';
}

function generateProximalMedianContent() {
    return window.contentLoader ? window.contentLoader.getHTMLSync('proximal-median') : '<div class="loading">Loading content...</div>';
}

// Ulnar Nerve Content Functions
function generateUlnarElbowContent() {
    return window.contentLoader ? window.contentLoader.getHTMLSync('ulnar-elbow') : '<div class="loading">Loading content...</div>';
}

function generateUlnarWristContent() {
    return window.contentLoader ? window.contentLoader.getHTMLSync('ulnar-wrist') : '<div class="loading">Loading content...</div>';
}

function generateMasterNerveChart() {
    return window.contentLoader ? window.contentLoader.getHTMLSync('master-nerve-chart') : '<div class="loading">Loading content...</div>';
}

// [Pathway Explorer Logic Extracted to src/content/anatomy/PathwayExplorer.js]

function generatePlexusAnatomyContent(module) {
    return window.contentLoader ? window.contentLoader.getHTMLSync('plexus-anatomy') : '<div class="loading">Loading content...</div>';


}

function generateReportWritingContent(module) {
    return window.contentLoader ? window.contentLoader.getHTMLSync('report-writing') : '<div class="loading">Loading content...</div>';
}

function generateClinicalCorrelationContent(module) {
    if (window.showClinicalCases) {
        setTimeout(() => {
            const pgy = (window.appComponents && window.appComponents.pgySelector && window.appComponents.pgySelector.currentPGY) || window.currentPGYLevel || 'pgy2';
            window.showClinicalCases(pgy);
        }, 100);
        return `<div class="loading">Launching Clinical Cases Dashboard...</div>`;
    }
    return window.contentLoader ? window.contentLoader.getHTMLSync('clinical-correlation') : '<div class="loading">Loading content...</div>';
}

function generateLearningContentByType(module, moduleIndex) {
    const contentId = module.contentId || module.id;
    switch (contentId) {
        case 'emg-introduction':
            return generateEMGIntroductionContent(module);
        case 'muscle-quiz':
            return generateMuscleQuizContent(module);
        case 'plexus-anatomy':
            return generatePlexusAnatomyContent(module);
        case 'brachial-plexus-interactive':
            setTimeout(() => {
                if (window.BrachialPlexus) {
                    window.BrachialPlexus.showExplain();
                } else {
                    console.error("BrachialPlexus module not loaded (window.BrachialPlexus undefined)");
                }
            }, 100);
            return `<div class="loading">Launching Brachial Plexus Module...</div>`;
        case 'radiculopathy-pathophysiology':
            return generateRadiculopathyContent(module);
        case 'neuropathy-pathophysiology':
            return generateNeuropathyContent(module);
        case 'ncs-fundamentals':
            return generateNCSFundamentalsContent(module);
        case 'ncs-techniques':
            return generateNCSBasicTechniquesContent(module);
        case 'emg-needle-localization':
            setTimeout(() => {
                if (window.EMGNeedleLocalization) {
                    window.EMGNeedleLocalization.showGuide();
                } else {
                    console.error("EMGNeedleLocalization module not loaded");
                }
            }, 100);
            return `<div class="loading">Launching Needle Localization Guide...</div>`;
        case 'basic-patterns':
            return generateBasicPatternsContent(module);
        case 'report-writing':
        case 'simple-reports':
            return generateReportWritingContent(module);
        case 'clinical-correlation':
            return generateClinicalCorrelationContent(module);
        case 'clinical-cases-system':
            setTimeout(() => {
                if (window.showClinicalCases) {
                    // Default to PGY-1 if selector available, else 1
                    const pgy = (window.appComponents && window.appComponents.pgySelector && window.appComponents.pgySelector.currentPGY) || 1;
                    window.showClinicalCases(pgy);
                } else {
                    console.error("ClinicalCases system not loaded");
                }
            }, 100);
            return `<div class="loading">Launching Clinical Cases...</div>`;
        case 'neuropathy-myopathy-basics':
            // Delegate to new module
            setTimeout(() => {
                if (window.Pathophysiology) {
                    window.Pathophysiology.showNeuropathyVsMyopathy();
                } else {
                    console.error("Pathophysiology module not loaded");
                }
            }, 100);
            return `
        <div style="padding: 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">🧠</div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Loading Neuropathy vs Myopathy Basics...</h3>
        </div>
        `;
        default:
            return generatePlaceholderContent(module);
    }
}

// Generate placeholder content for unknown module types
function generatePlaceholderContent(module) {
    return `
        < div class="interactive-content" >
            <div style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 15px;">🔧</div>
                <h3 style="color: #374151; margin-bottom: 15px;">Module Under Development</h3>
                <p style="color: #6b7280; margin: 0;">
                    This module type (${module.type}) is currently being developed.
                    Check back soon for interactive content!
                </p>
            </div>
        </div >
        `;
}


// [Clinical Cases Selection UI Removed - Delegated to ClinicalCases.js]


// Wrapper function for compatibility - OVERRIDE OLD SYSTEM
function showClinicalCasesModal(pgyLevel, difficulty) {
    console.log('🎯 DEBUG: EMG APP showClinicalCasesModal called with:', { pgyLevel, difficulty });
    console.log('🚀 Using EMG APP design instead of old system');
    showClinicalCases(pgyLevel);
}

// Unlock Prompt Function - EXACT COPY from working system
function showUnlockPrompt(level, requiredPGY) {
    const levelNames = {
        'intermediate': 'Intermediate',
        'expert': 'Expert'
    };

    const content = `
    < div style = "text-align: center;" >
            <div style="font-size: 60px; margin-bottom: 20px;">🔓</div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Unlock ${levelNames[level]} Cases?</h3>
            <p style="color: #5a6c7d; margin-bottom: 25px;">
                These cases are designed for ${requiredPGY.toUpperCase()} residents, but you can access them if you'd like extra challenge.
            </p>
            <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                <p style="color: #92400e; margin: 0; font-weight: 600;">
                    ⚠️ "Proceed at your own risk!"
                </p>
                <p style="color: #b45309; margin: 5px 0 0 0; font-size: 14px;">
                    These cases may contain concepts you haven't learned yet.
                </p>
            </div>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button onclick="closeGeneralModal()"
                        style="background: #9ca3af; color: white; border: none; padding: 10px 20px;
                               border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Cancel
                </button>
                <button onclick="closeGeneralModal(); ${level === 'intermediate' ? 'startIntermediateCases()' : 'startExpertCases()'};"
                        style="background: #ef4444; color: white; border: none; padding: 10px 20px;
                               border-radius: 8px; cursor: pointer; font-weight: 600;">
                    🚀 Unlock & Continue
                </button>
            </div>
        </div >
    `;

    showModal('🔓 Unlock Cases', content);
}


// [Neuropathy vs Myopathy Basics Extracted to src/content/pathology/Pathophysiology.js]


// Complete EMG APP Case Database - Extracted from EMG APP
// DISABLED: caseDatabase now provided by emg-app-complete-system.js to avoid duplicate variable error
/*
const caseDatabase = {
    'hand14': {
        title: "Hand Numbness/Tingling (Digits 1-4)",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Administrative Assistant",
            chiefComplaint: "3-month history of numbness and tingling in thumb, index, and middle fingers, worse at night",
            history: "Symptoms wake her up at night, shaking hands provides relief. Occasional thenar weakness when gripping objects. No neck pain or trauma. Uses computer 8+ hours daily.",
            pmh: "Hypothyroidism, well-controlled",
            medications: "Levothyroxine"
        },
        physicalExam: {
            inspection: "Mild thenar atrophy",
            palpation: "Tenderness over carpal tunnel",
            rom: "Full ROM at wrist and fingers",
            strength: "Thenar muscles 4/5, other hand muscles normal",
            sensation: "Decreased sensation in median nerve distribution",
            reflexes: "Normal throughout",
            specialTests: "Positive Tinel's and Phalen's signs"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Dorsal ulnar Anti Sensory (Dorsum 5th MC)",
                    nr: "2.5",
                    peak: "64.2",
                    normPeak: "-10",
                    fpAmp: "41.0",
                    normFP: "",
                    site1: "Wrist",
                    site2: "Dorsum 5th MC",
                    deltaP: "1.9",
                    dist: "8.0",
                    vel: "42",
                    normVel: ""
                },
                {
                    site: "Right Dorsal ulnar Anti Sensory (Dorsum 5th MC)",
                    nr: "2.5",
                    peak: "",
                    normPeak: "-10",
                    fpAmp: "",
                    normFP: "",
                    site1: "Wrist",
                    site2: "Dorsum 5th MC",
                    deltaP: "1.9",
                    dist: "8.0",
                    vel: "42",
                    normVel: ""
                },
                {
                    site: "Left Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "64.2",
                    normPeak: "-10",
                    fpAmp: "41.0",
                    normFP: "",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "3.1",
                    dist: "14.0",
                    vel: "42",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "4.8",
                    normPeak: "<3.7",
                    fpAmp: "9.2",
                    normFP: ">20",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "5.1",
                    dist: "14.0",
                    vel: "28",
                    normVel: ">39"
                },
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.4",
                    fpAmp: "42.8",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.4",
                    fpAmp: "36.5",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                }
            ],
            motorSummary: [
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "9.4",
                    normOnset: ">5",
                    fpAmp: "4.23",
                    normFP: "",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.9",
                    dist: "22.0",
                    vel: "56",
                    normVel: ">50"
                },
                {
                    site: "Elbow",
                    nr: "",
                    onset: "8.2",
                    normOnset: "",
                    fpAmp: "4.69",
                    normFP: "",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "",
                    dist: "",
                    vel: "",
                    normVel: ""
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "5.8",
                    normOnset: "<4.4",
                    fpAmp: "3.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.9",
                    dist: "22.0",
                    vel: "64",
                    normVel: ">50"
                },
                {
                    site: "Elbow",
                    nr: "",
                    onset: "8.5",
                    normOnset: "",
                    fpAmp: "5.08",
                    normFP: "",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "",
                    dist: "",
                    vel: "",
                    normVel: ""
                },
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<3.3",
                    fpAmp: "9.16",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.8",
                    dist: "23.0",
                    vel: "61",
                    normVel: ">51"
                },
                {
                    site: "B Elbow",
                    nr: "6.0",
                    onset: "9.1",
                    normOnset: "",
                    fpAmp: "5.44",
                    normFP: "",
                    neg: "A Elbow",
                    site1: "B Elbow",
                    site2: "",
                    deltaP: "2.4",
                    dist: "10.0",
                    vel: "42",
                    normVel: ">51"
                },
                {
                    site: "A Elbow",
                    nr: "8.0",
                    onset: "9.1",
                    normOnset: "",
                    fpAmp: "5.94",
                    normFP: "",
                    neg: "",
                    site1: "A Elbow",
                    site2: "",
                    deltaP: "",
                    dist: "",
                    vel: "",
                    normVel: ""
                }
            ]
        },
        emgStudies: {
            comparisonSummary: [
                {
                    site: "Left Median/Radial Comparison (Digit 1)",
                    nr: "2.5",
                    peak: "88.4",
                    fpAmp: "",
                    site1: "Median",
                    site2: "Radial",
                    deltaP: "0.5"
                },
                {
                    site: "Radial",
                    nr: "3.0",
                    peak: "27.8",
                    fpAmp: "",
                    site1: "",
                    site2: "",
                    deltaP: ""
                },
                {
                    site: "Right Median/Radial Comparison (Digit 1)",
                    nr: "2.5",
                    peak: "103.0",
                    fpAmp: "",
                    site1: "Median",
                    site2: "Radial",
                    deltaP: "0.4"
                },
                {
                    site: "Radial",
                    nr: "2.9",
                    peak: "23.0",
                    fpAmp: "",
                    site1: "",
                    site2: "",
                    deltaP: ""
                }
            ],
            needleExamination: [
                {
                    side: "Right",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "1st Dorsal",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "Extindicts",
                    nerve: "Radial (Post Int)",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "1st Dorsal",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "Extindicts",
                    nerve: "Radial (Post Int)",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Carpal Tunnel Syndrome (Median Neuropathy at Wrist)",
        differentialDiagnosis: [
            "Carpal tunnel syndrome",
            "Cervical radiculopathy",
            "Pronator teres syndrome",
            "Thoracic outlet syndrome"
        ],
        explanation: "Classic carpal tunnel syndrome with median nerve compression at the wrist. Night symptoms, Tinel's/Phalen's signs, and electrodiagnostic findings confirm diagnosis."
    },
    'fibromyalgia': {
        title: "Widespread Pain and Fatigue",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Office Manager",
            chiefCompliant: "6-month history of widespread muscle pain, fatigue, and tingling in hands",
            history: "Gradual onset of widespread muscle and joint pain, fatigue, and sleep disturbances. Reports tingling in hands that led to EMG referral. No weakness or muscle atrophy. Pain worse with stress and weather changes.",
            pmh: "Depression, irritable bowel syndrome",
            medications: "Sertraline, gabapentin"
        },
        physicalExam: {
            inspection: "No visible atrophy or fasciculations",
            palpation: "Multiple tender points at neck, shoulders, back, hips",
            rom: "Full ROM but limited by pain",
            strength: "5/5 strength throughout (limited by effort due to pain)",
            sensation: "Normal objective sensation, subjective numbness in hands",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Positive tender points (>11/18), negative Tinel's/Phalen's"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "3.2",
                    normPeak: "<3.7",
                    fpAmp: "48.5",
                    normFP: ">20",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.8",
                    dist: "14.0",
                    vel: "50",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.7",
                    fpAmp: "52.3",
                    normFP: ">20",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">39"
                },
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.4",
                    fpAmp: "44.8",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.6",
                    dist: "14.0",
                    vel: "54",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.9",
                    normPeak: "<3.4",
                    fpAmp: "47.2",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.7",
                    dist: "14.0",
                    vel: "52",
                    normVel: ">38"
                }
            ],
            motorSummary: [
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.2",
                    normOnset: "<4.4",
                    fpAmp: "8.5",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.1",
                    dist: "22.0",
                    vel: "71",
                    normVel: ">50"
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.4",
                    normOnset: "<4.4",
                    fpAmp: "9.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.0",
                    dist: "22.0",
                    vel: "73",
                    normVel: ">50"
                },
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<3.3",
                    fpAmp: "10.8",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.8",
                    dist: "23.0",
                    vel: "82",
                    normVel: ">51"
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.0",
                    normOnset: "<3.3",
                    fpAmp: "11.2",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.9",
                    dist: "23.0",
                    vel: "79",
                    normVel: ">51"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Right",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "1st Dorsal",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "Deltoid",
                    nerve: "Axillary",
                    root: "C5-6",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                }
            ]
        },
        requiresEMG: false,
        emgIndication: "NOT INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Fibromyalgia - EMG NOT INDICATED",
        differentialDiagnosis: [
            "Fibromyalgia",
            "Myofascial pain syndrome",
            "Chronic fatigue syndrome",
            "Inflammatory myopathy"
        ],
        explanation: "Fibromyalgia is a central pain disorder with normal peripheral nervous system. EMG/NCS are normal and not indicated unless there are objective neurological findings."
    },
    'ulnarwristcompression': {
        title: "Hand Weakness After Wrist Injury",
        presentation: {
            age: 29,
            gender: "Male",
            occupation: "Rock Climber",
            chiefCompliant: "Hand weakness and numbness after fall while rock climbing 4 weeks ago",
            history: "Fell while climbing 4 weeks ago, landed on outstretched hands. Initially focused on wrist pain, but developed progressive weakness and numbness in ring and little fingers.",
            pmh: "Previous wrist injuries from climbing",
            medications: "Ibuprofen, wrist bracing"
        },
        physicalExam: {
            inspection: "Mild hypothenar atrophy, well-healed abrasions on palm",
            palpation: "Tenderness over Guyon's canal and pisiform bone",
            rom: "Full ROM at wrist and fingers",
            strength: "Hypothenar muscles 3/5, interossei normal (5/5), FCU normal",
            sensation: "Decreased sensation in little finger and ulnar half ring finger",
            reflexes: "Normal throughout",
            specialTests: "Positive Tinel's at Guyon's canal, negative at elbow"
        },
        ncsStudies: [
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Prolonged distal latency (4.8ms), reduced amplitude",
                interpretation: "Deep motor branch ulnar neuropathy at wrist"
            },
            {
                name: "Ulnar Sensory (digit 5)",
                result: "abnormal",
                findings: "Prolonged latency, reduced amplitude",
                interpretation: "Superficial sensory branch involvement"
            },
            {
                name: "Dorsal ulnar cutaneous",
                result: "normal",
                findings: "Normal response",
                interpretation: "Branches proximal to Guyon's canal spared"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor digiti minimi",
                findings: "Denervation changes with reduced recruitment",
                interpretation: "Deep motor branch involvement"
            },
            {
                muscle: "Flexor carpi ulnaris",
                findings: "Normal",
                interpretation: "Proximal ulnar nerve intact"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal - Type I (Mixed Motor and Sensory)",
        differentialDiagnosis: [
            "Ulnar neuropathy at Guyon's canal",
            "Ulnar neuropathy at elbow",
            "C8 radiculopathy",
            "Brachial plexopathy"
        ],
        explanation: "Ulnar nerve compression at Guyon's canal affecting both superficial sensory and deep motor branches. Spares dorsal ulnar cutaneous nerve which branches above wrist."
    },
    'footdrop': {
        title: "Foot Drop/Dorsiflexor Weakness",
        presentation: {
            age: 28,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "2-week history of inability to lift right foot, frequent tripping",
            history: "Gradual onset after prolonged squatting while laying tile. No back pain. No numbness initially, mild numbness over dorsum of foot developed later.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Right foot in plantar flexed position. No muscle atrophy visible yet.",
            palpation: "No tenderness over fibular head or spine. Fibular head feels normal.",
            rom: "Limited active dorsiflexion of right foot. Passive ROM normal.",
            strength: "Right dorsiflexion 1/5, eversion 2/5. Plantar flexion and inversion normal (5/5). Hip and knee strength normal.",
            sensation: "Decreased sensation over dorsum of right foot in first web space",
            reflexes: "Achilles reflex present and symmetric. No pathological reflexes.",
            specialTests: "Negative straight leg raise. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Right Superficial Fibular Anti Sensory (Dorsum Foot)",
                    nr: "2.5",
                    peak: "NR",
                    normPeak: "<4.2",
                    fpAmp: "NR",
                    normFP: ">6",
                    site1: "Ankle",
                    site2: "Dorsum Foot",
                    deltaP: "NR",
                    dist: "14.0",
                    vel: "NR",
                    normVel: ">40"
                },
                {
                    site: "Left Superficial Fibular Anti Sensory (Dorsum Foot)",
                    nr: "2.5",
                    peak: "3.8",
                    normPeak: "<4.2",
                    fpAmp: "12.5",
                    normFP: ">6",
                    site1: "Ankle",
                    site2: "Dorsum Foot",
                    deltaP: "3.8",
                    dist: "14.0",
                    vel: "37",
                    normVel: ">40"
                },
                {
                    site: "Right Sural Anti Sensory",
                    nr: "2.5",
                    peak: "3.4",
                    normPeak: "<4.4",
                    fpAmp: "18.2",
                    normFP: ">6",
                    site1: "Calf",
                    site2: "Ankle",
                    deltaP: "3.2",
                    dist: "14.0",
                    vel: "44",
                    normVel: ">40"
                },
                {
                    site: "Left Sural Anti Sensory",
                    nr: "2.5",
                    peak: "3.6",
                    normPeak: "<4.4",
                    fpAmp: "16.8",
                    normFP: ">6",
                    site1: "Calf",
                    site2: "Ankle",
                    deltaP: "3.4",
                    dist: "14.0",
                    vel: "41",
                    normVel: ">40"
                }
            ],
            motorSummary: [
                {
                    site: "Right Fibular Motor (EDB)",
                    nr: "2.0",
                    onset: "NR",
                    normOnset: "<6.5",
                    fpAmp: "NR",
                    normFP: ">2.0",
                    neg: "Fib Head",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "NR",
                    dist: "31.0",
                    vel: "NR",
                    normVel: ">44"
                },
                {
                    site: "Right Fibular Motor (Tib Ant)",
                    nr: "2.0",
                    onset: "NR",
                    normOnset: "<6.0",
                    fpAmp: "NR",
                    normFP: ">2.0",
                    neg: "Fib Head",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "NR",
                    dist: "28.0",
                    vel: "NR",
                    normVel: ">44"
                },
                {
                    site: "Left Fibular Motor (EDB)",
                    nr: "2.0",
                    onset: "5.8",
                    normOnset: "<6.5",
                    fpAmp: "4.2",
                    normFP: ">2.0",
                    neg: "Fib Head",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "2.9",
                    dist: "31.0",
                    vel: "50",
                    normVel: ">44"
                },
                {
                    site: "Right Tibial Motor (Abd Hall)",
                    nr: "2.0",
                    onset: "4.8",
                    normOnset: "<5.8",
                    fpAmp: "8.5",
                    normFP: ">4.0",
                    neg: "Pop Fossa",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "3.2",
                    dist: "42.0",
                    vel: "52",
                    normVel: ">41"
                },
                {
                    site: "Left Tibial Motor (Abd Hall)",
                    nr: "2.0",
                    onset: "4.6",
                    normOnset: "<5.8",
                    fpAmp: "9.1",
                    normFP: ">4.0",
                    neg: "Pop Fossa",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "3.0",
                    dist: "42.0",
                    vel: "54",
                    normVel: ">41"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Right",
                    muscle: "Tibialis Anterior",
                    nerve: "Deep Fibular",
                    root: "L4-5",
                    insAct: "↑↑",
                    fibs: "3+",
                    psw: "2+",
                    amp: "↓",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Acute denervation"
                },
                {
                    side: "Right",
                    muscle: "Extensor Digitorum Brevis",
                    nerve: "Deep Fibular",
                    root: "L5-S1",
                    insAct: "↑↑",
                    fibs: "3+",
                    psw: "3+",
                    amp: "Absent",
                    dur: "Absent",
                    poly: "0",
                    recrt: "No volitional",
                    intPat: "No pattern",
                    comment: "Complete denervation"
                },
                {
                    side: "Right",
                    muscle: "Fibularis Longus",
                    nerve: "Superficial Fibular",
                    root: "L5-S1",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "1+",
                    amp: "↓",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Mild denervation"
                },
                {
                    side: "Right",
                    muscle: "Biceps Femoris (Short Head)",
                    nerve: "Fibular Div Sciatic",
                    root: "L5-S2",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Spares sciatic trunk"
                },
                {
                    side: "Right",
                    muscle: "Tibialis Posterior",
                    nerve: "Tibial",
                    root: "L4-5",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Tibial nerve normal"
                },
                {
                    side: "Left",
                    muscle: "Tibialis Anterior",
                    nerve: "Deep Fibular",
                    root: "L4-5",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Normal control"
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Common Fibular (Peroneal) Neuropathy at the Fibular Head",
        differentialDiagnosis: [
            "Common fibular (peroneal) neuropathy at fibular head",
            "Deep fibular (peroneal) neuropathy",
            "L5 radiculopathy",
            "Sciatic neuropathy",
            "Anterior compartment syndrome"
        ],
        explanation: "Acute onset foot drop with both motor and sensory involvement in common fibular distribution following prolonged squatting (compression at fibular head) is classic for fibular neuropathy."
    },
    'ulnarneuropathy': {
        title: "Hand Weakness and Numbness",
        presentation: {
            age: 52,
            gender: "Male",
            occupation: "Carpenter",
            chiefComplaint: "6-month history of weakness in right hand and numbness in ring and little fingers",
            history: "Gradual onset of difficulty with fine motor tasks. Notices weakness when trying to grip tools. Numbness in ring and little fingers, worse in the morning. Works long hours using hand tools and machinery. No neck pain or trauma.",
            pmh: "Diabetes mellitus type 2, hypertension",
            medications: "Metformin, lisinopril"
        },
        physicalExam: {
            inspection: "Mild atrophy of hypothenar eminence and first dorsal interosseous space on right",
            palpation: "No tenderness over ulnar groove at elbow. Ulnar nerve mobile at elbow.",
            rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
            strength: "Right hand intrinsics 3/5 (FDI, ADM, interossei). Grip strength reduced. FCU 4/5. All other muscle groups 5/5.",
            sensation: "Decreased light touch and pinprick in ulnar distribution (ring and little finger)",
            reflexes: "2+ and symmetric throughout. No pathological reflexes.",
            specialTests: "Positive Froment's sign on right. Negative Tinel's at wrist. Mild Tinel's at elbow. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.4",
                    fpAmp: "18.4",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "4.2",
                    normPeak: "<3.4",
                    fpAmp: "6.0",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "4.1",
                    dist: "14.0",
                    vel: "34",
                    normVel: ">38"
                },
                {
                    site: "Left Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "3.0",
                    normPeak: "<3.7",
                    fpAmp: "22.0",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.8",
                    dist: "14.0",
                    vel: "50",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.7",
                    fpAmp: "24.2",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.6",
                    dist: "14.0",
                    vel: "54",
                    normVel: ">39"
                }
            ],
            motorSummary: [
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.0",
                    normOnset: "<3.3",
                    fpAmp: "11.2",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.8",
                    dist: "23.0",
                    vel: "58",
                    normVel: ">51"
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.8",
                    normOnset: "<3.3",
                    fpAmp: "4.8",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.2",
                    dist: "23.0",
                    vel: "32",
                    normVel: ">51"
                },
                {
                    site: "B Elbow",
                    nr: "6.0",
                    onset: "6.8",
                    normOnset: "",
                    fpAmp: "4.5",
                    normFP: "",
                    neg: "A Elbow",
                    site1: "B Elbow",
                    site2: "",
                    deltaP: "2.9",
                    dist: "9.0",
                    vel: "31",
                    normVel: ">51"
                },
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<4.4",
                    fpAmp: "8.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.0",
                    dist: "22.0",
                    vel: "66",
                    normVel: ">50"
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<4.4",
                    fpAmp: "8.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.8",
                    dist: "22.0",
                    vel: "79",
                    normVel: ">50"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Right",
                    muscle: "1st Dorsal Interosseous",
                    nerve: "Deep Ulnar",
                    root: "C8-T1",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "2+",
                    amp: "↑",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Chronic denervation"
                },
                {
                    side: "Right",
                    muscle: "Abductor Digiti Minimi",
                    nerve: "Deep Ulnar",
                    root: "C8-T1",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "1+",
                    amp: "↑",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Chronic denervation"
                },
                {
                    side: "Right",
                    muscle: "Flexor Carpi Ulnaris",
                    nerve: "Ulnar",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Spares FCU branch"
                },
                {
                    side: "Right",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Median nerve normal"
                },
                {
                    side: "Right",
                    muscle: "Extensor Indicis",
                    nerve: "Post Interosseous",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Radial nerve normal"
                },
                {
                    side: "Left",
                    muscle: "1st Dorsal Interosseous",
                    nerve: "Deep Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Normal control"
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Cubital Tunnel Syndrome (Ulnar Neuropathy at Elbow)",
        differentialDiagnosis: [
            "Cubital tunnel syndrome",
            "Ulnar neuropathy at elbow",
            "Guyon's canal syndrome",
            "C8 radiculopathy",
            "Lower trunk brachial plexopathy",
            "Polyneuropathy"
        ],
        explanation: "Progressive hand weakness with ulnar distribution, positive Froment's sign, focal slowing across elbow on NCS, and EMG showing denervation in distal ulnar muscles while sparing FCU confirms ulnar neuropathy at the elbow."
    },
    'cervicalradiculopathy': {
        title: "Neck Pain with Arm Weakness",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Office Manager",
            chiefComplaint: "3-month history of neck pain radiating to left arm with weakness and numbness",
            history: "Gradual onset of neck pain after minor motor vehicle accident. Pain radiates down left arm to thumb and index finger. Weakness noticed when lifting objects overhead. Numbness in thumb, index, and middle finger. Symptoms worse with neck extension.",
            pmh: "None",
            medications: "Ibuprofen PRN"
        },
        physicalExam: {
            inspection: "No visible muscle atrophy. Patient holds head in slightly flexed position.",
            palpation: "Tenderness over left cervical paraspinal muscles. No palpable lymphadenopathy.",
            rom: "Limited neck extension due to pain. Left lateral flexion reproduces arm pain.",
            strength: "Left biceps 4/5, brachioradialis 4/5, deltoid 4-/5. Grip strength mildly reduced on left. Right side normal.",
            sensation: "Decreased sensation in left C6 dermatome (thumb, index finger, lateral forearm)",
            reflexes: "Left biceps reflex diminished (1+). Brachioradialis reflex absent on left. Triceps 2+ bilaterally.",
            specialTests: "Positive Spurling's test on left. Negative Hoffmann bilaterally. No clonus or spasticity"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Median Anti Sensory (1st Digit)",
                    nr: "2.5",
                    peak: "4.1",
                    normPeak: "<3.4",
                    fpAmp: "12.0",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "1st Digit",
                    deltaP: "4.0",
                    dist: "13.0",
                    vel: "33",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (1st Digit)",
                    nr: "2.5",
                    peak: "3.2",
                    normPeak: "<3.4",
                    fpAmp: "18.5",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "1st Digit",
                    deltaP: "3.1",
                    dist: "13.0",
                    vel: "42",
                    normVel: ">39"
                },
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.0",
                    normPeak: "<3.4",
                    fpAmp: "16.8",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.4",
                    fpAmp: "15.2",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "3.0",
                    dist: "14.0",
                    vel: "47",
                    normVel: ">38"
                }
            ],
            motorSummary: [
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.2",
                    normOnset: "<4.4",
                    fpAmp: "9.1",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.0",
                    dist: "22.0",
                    vel: "73",
                    normVel: ">50"
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<4.4",
                    fpAmp: "9.4",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.9",
                    dist: "22.0",
                    vel: "76",
                    normVel: ">50"
                },
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "2.7",
                    normOnset: "<3.3",
                    fpAmp: "11.8",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.6",
                    dist: "23.0",
                    vel: "88",
                    normVel: ">51"
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "2.8",
                    normOnset: "<3.3",
                    fpAmp: "12.1",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.7",
                    dist: "23.0",
                    vel: "85",
                    normVel: ">51"
                },
                {
                    site: "Left Radial Motor (Ext Indicis)",
                    nr: "2.0",
                    onset: "3.4",
                    normOnset: "<4.0",
                    fpAmp: "4.2",
                    normFP: ">2.0",
                    neg: "Spiral Groove",
                    site1: "Forearm",
                    site2: "",
                    deltaP: "2.8",
                    dist: "18.0",
                    vel: "64",
                    normVel: ">50"
                },
                {
                    site: "Right Radial Motor (Ext Indicis)",
                    nr: "2.0",
                    onset: "3.3",
                    normOnset: "<4.0",
                    fpAmp: "4.5",
                    normFP: ">2.0",
                    neg: "Spiral Groove",
                    site1: "Forearm",
                    site2: "",
                    deltaP: "2.9",
                    dist: "18.0",
                    vel: "62",
                    normVel: ">50"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Left",
                    muscle: "Biceps",
                    nerve: "Musculocutaneous",
                    root: "C5-6",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "2+",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Active denervation"
                },
                {
                    side: "Left",
                    muscle: "Deltoid",
                    nerve: "Axillary",
                    root: "C5-6",
                    insAct: "↑",
                    fibs: "1+",
                    psw: "1+",
                    amp: "↑",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Chronic reinnervation"
                },
                {
                    side: "Left",
                    muscle: "Brachioradialis",
                    nerve: "Radial",
                    root: "C5-6",
                    insAct: "↑",
                    fibs: "1+",
                    psw: "1+",
                    amp: "↑",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Mild denervation"
                },
                {
                    side: "Left",
                    muscle: "Triceps",
                    nerve: "Radial",
                    root: "C6-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Spares C7 myotome"
                },
                {
                    side: "Left",
                    muscle: "Extensor Indicis",
                    nerve: "Post Interosseous",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "C8 myotome normal"
                },
                {
                    side: "Left",
                    muscle: "Cervical Paraspinals",
                    nerve: "Dorsal Rami",
                    root: "C6",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "2+",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Confirms root level"
                },
                {
                    side: "Right",
                    muscle: "Biceps",
                    nerve: "Musculocutaneous",
                    root: "C5-6",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Normal control"
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "advanced",
        correctDiagnosis: "Left C6 Radiculopathy",
        differentialDiagnosis: [
            "C6 radiculopathy",
            "Cervical radiculopathy",
            "Cervical disc herniation",
            "Brachial plexopathy",
            "Multiple peripheral neuropathies",
            "Cervical myelopathy"
        ],
        explanation: "Clinical presentation with neck pain, C6 distribution weakness and numbness, diminished reflexes, positive Spurling's test, and EMG showing active denervation in C6 myotome muscles confirms C6 radiculopathy."
    }
};
*/
// DISABLED: End of caseDatabase - now provided by emg-app-complete-system.js

// Complete EMG APP Functionality - Extracted from EMG APP
function toggleDifficulty(difficulty) {
    const toggle = document.getElementById(`${difficulty} -toggle`);
    const checkbox = document.getElementById(`${difficulty} -checkbox`);
    const statusText = toggle.querySelector('.status-text');

    if (toggle.classList.contains('active')) {
        // Turn OFF
        toggle.classList.remove('active');
        toggle.classList.add('inactive');
        checkbox.checked = false;
        statusText.textContent = 'INACTIVE';
    } else {
        // Turn ON
        toggle.classList.remove('inactive');
        toggle.classList.add('active');
        checkbox.checked = true;
        statusText.textContent = 'ACTIVE';
    }

    updateCaseDisplay();
}

function startRandomCaseByDifficulty() {
    const beginnerChecked = document.getElementById('beginner-checkbox').checked;
    const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
    const difficultChecked = document.getElementById('difficult-checkbox').checked;

    if (!beginnerChecked && !intermediateChecked && !difficultChecked) {
        alert('Please select at least one difficulty level first.');
        return;
    }

    const availableCases = [];
    for (const [caseId, caseData] of Object.entries(window.caseDatabase)) {
        const difficulty = caseData.difficulty || 'intermediate';

        if ((difficulty === 'beginner' && beginnerChecked) ||
            (difficulty === 'intermediate' && intermediateChecked) ||
            (difficulty === 'difficult' && difficultChecked)) {
            availableCases.push(caseId);
        }
    }

    if (availableCases.length === 0) {
        alert('No cases available for selected difficulty levels.');
        return;
    }

    const randomCase = availableCases[Math.floor(Math.random() * availableCases.length)];
    startCase(randomCase);
}

function showCaseSelection() {
    document.getElementById('case-selection-section').style.display = 'block';
    populateCaseGrid();

    // Smooth scroll to case selection
    document.getElementById('case-selection-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function hideCaseSelection() {
    document.getElementById('case-selection-section').style.display = 'none';
}

function populateCaseGrid() {
    const beginnerChecked = document.getElementById('beginner-checkbox').checked;
    const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
    const difficultChecked = document.getElementById('difficult-checkbox').checked;

    const caseGrid = document.getElementById('case-grid');
    let html = '';

    for (const [caseId, caseData] of Object.entries(window.caseDatabase)) {
        const difficulty = caseData.difficulty || 'intermediate';

        // Filter based on selected difficulties
        if ((difficulty === 'beginner' && !beginnerChecked) ||
            (difficulty === 'intermediate' && !intermediateChecked) ||
            (difficulty === 'difficult' && !difficultChecked)) {
            continue;
        }

        html += `
    < div class="case-item" onclick = "toggleCaseSelection('${caseId}')" id = "case-${caseId}" >
                <div class="case-title">${caseData.title}</div>
                <div class="case-difficulty difficulty-${difficulty}">${difficulty.toUpperCase()}</div>
                <div class="case-preview">${caseData.presentation.chiefComplaint}</div>
            </div >
    `;
    }

    caseGrid.innerHTML = html;
}

function toggleCaseSelection(caseId) {
    const caseElement = document.getElementById(`case -${caseId} `);
    caseElement.classList.toggle('selected');
}

function selectAllCases() {
    document.querySelectorAll('.case-item').forEach(item => {
        item.classList.add('selected');
    });
}

function deselectAllCases() {
    document.querySelectorAll('.case-item').forEach(item => {
        item.classList.remove('selected');
    });
}

function startSelectedCases() {
    const selectedCases = [];
    document.querySelectorAll('.case-item.selected').forEach(item => {
        const caseId = item.id.replace('case-', '');
        selectedCases.push(caseId);
    });

    if (selectedCases.length === 0) {
        alert('Please select at least one case first.');
        return;
    }

    // Start first selected case
    startCase(selectedCases[0]);
}

function updateCaseDisplay() {
    // This function would update any displayed case information based on difficulty selection
    console.log('Updating case display based on difficulty selection');
}

// Case Flow Functions
function startCase(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    if (!caseData) {
        console.error('❌ Case Data Error - Case not found:', caseId, 'Available cases:', window.caseDatabase ? Object.keys(window.caseDatabase) : 'No caseDatabase');
        return;
    }

    // Hide other sections
    document.getElementById('case-selection-section').style.display = 'none';

    // Show case interface
    const caseInterface = document.getElementById('case-interface');
    caseInterface.style.display = 'block';

    // Populate case interface
    caseInterface.innerHTML = generateCaseInterface(caseData, caseId);

    // Scroll to case interface
    caseInterface.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateCaseInterface(caseData, caseId) {
    return `
    < div id = "case-interface" class="case-interface" style = "display: block;" >
            <div class="progress-bar">
                <div id="progress-fill" class="progress-fill" style="width: 25%"></div>
            </div>

            <!--Step 1: Case Presentation-- >
            <div id="case-presentation-step" class="case-step" style="display: block;">
                <h3>📋 Patient Presentation</h3>
                <div id="case-details">
                    <div class="case-header">
                        <div class="case-title-main">${caseData.title}</div>
                        <div class="case-difficulty difficulty-${caseData.difficulty}">${caseData.difficulty.toUpperCase()}</div>
                    </div>
                    <div class="case-info">
                        <div class="info-section">
                            <h4>👤 Patient Information</h4>
                            <p><strong>Age:</strong> ${caseData.presentation.age}</p>
                            <p><strong>Gender:</strong> ${caseData.presentation.gender}</p>
                            <p><strong>Occupation:</strong> ${caseData.presentation?.occupation || 'Not specified'}</p>
                        </div>
                        <div class="info-section">
                            <h4>🩺 Chief Complaint</h4>
                            <p>${caseData.presentation.chiefComplaint}</p>
                        </div>
                        <div class="info-section">
                            <h4>📋 History</h4>
                            <p>${caseData.presentation?.history || caseData.history?.historyOfPresentIllness || 'History not available'}</p>
                        </div>
                    </div>
                </div>
                <button class="quiz-button" onclick="showPhysicalExam('${caseId}')">View Physical Exam →</button>
            </div>

            <!--Step 2: Physical Examination-- >
            <div id="physical-exam-step" class="case-step" style="display: none;">
                <h3>🔍 Physical Examination Findings</h3>
                <div id="physical-exam-details">
                    <div class="case-info">
                        <div class="info-section">
                            <h4>🏥 Physical Exam</h4>
                            <p><strong>Inspection:</strong> ${(caseData.physicalExam?.inspection || caseData.physicalExamination?.generalAppearance) || 'No significant findings'}</p>
                            <p><strong>Palpation:</strong> ${(caseData.physicalExam?.palpation || caseData.physicalExamination?.musculoskeletalExam) || 'No significant findings'}</p>
                            <p><strong>Strength:</strong> ${caseData.physicalExam?.strength || caseData.physicalExamination?.neurologicalExam || 'Normal strength'}</p>
                            <p><strong>Sensation:</strong> ${caseData.physicalExam?.sensation || caseData.physicalExamination?.neurologicalExam || 'Normal sensation'}</p>
                            <p><strong>Reflexes:</strong> ${caseData.physicalExam?.reflexes || caseData.physicalExamination?.neurologicalExam || 'Normal reflexes'}</p>
                            <p><strong>Special Tests:</strong> ${caseData.physicalExam?.specialTests || 'Not performed'}</p>
                        </div>
                    </div>
                </div>
                <button class="quiz-button" onclick="showCasePresentation('${caseId}')">← Back to Presentation</button>
                <button class="quiz-button" onclick="showDifferentialBuilder('${caseId}')">Build Differential →</button>
            </div>

            <!--Step 3: Differential Building-- >
            <div id="differential-step" class="case-step" style="display: none;">
                <h3>🧠 Build Your Differential Diagnosis</h3>
                <p><strong>Instructions:</strong> Based on the history and physical examination, list your differential diagnoses. Include both peripheral and central causes, ranking from most to least likely.</p>
                <textarea id="user-differential" class="differential-input" placeholder="Enter your differential diagnosis list here...&#10;Example:&#10;1. Carpal tunnel syndrome&#10;2. Ulnar neuropathy at elbow&#10;3. Cervical radiculopathy&#10;..."></textarea>
                <div id="differential-feedback" style="margin-top: 15px;"></div>
                <button class="quiz-button" onclick="showPhysicalExam('${caseId}')">← Back to Exam</button>
                <button class="quiz-button" onclick="analyzeDifferential('${caseId}')">Analyze Differential</button>

                <!-- EMG Decision Section (shown after differential analysis) -->
                <div id="emg-decision-section" style="display: none; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                    <h4>⚖️ Clinical Decision: EMG/NCS Indication</h4>
                    <p><strong>Based on the patient's presentation and your differential diagnosis, do the symptoms and findings warrant EMG/NCS studies?</strong></p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Consider:</strong></p>
                        <ul>
                            <li>Does this appear to be a <strong>peripheral nervous system</strong> problem?</li>
                            <li>Would EMG/NCS help <strong>localize</strong> the lesion?</li>
                            <li>Would EMG/NCS <strong>change management</strong>?</li>
                            <li>Are there <strong>upper motor neuron signs</strong> suggesting central pathology?</li>
                        </ul>
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <button class="quiz-button" onclick="makeEMGDecision('${caseId}', true)" style="background: #27ae60; margin-right: 20px;">
                            ✅ YES - EMG/NCS is indicated
                        </button>
                        <button class="quiz-button" onclick="makeEMGDecision('${caseId}', false)" style="background: #e74c3c;">
                            ❌ NO - EMG/NCS is not indicated
                        </button>
                    </div>
                    <div id="emg-decision-feedback" style="margin-top: 20px;"></div>
                    <button id="continue-after-decision" class="quiz-button" onclick="proceedAfterDecision('${caseId}')" style="display: none;">Continue →</button>
                </div>
            </div>

            <!--Step 4: NCS / EMG Results-- >
            <div id="results-step" class="case-step" style="display: none;">
                <h3>⚡ Nerve Conduction Study Results</h3>
                <div id="ncs-results">
                    <!-- NCS results will be populated here -->
                </div>

                <div id="emg-results" class="emg-section" style="display: none;">
                    <h4>🔬 EMG Results (when required for diagnosis)</h4>
                    <div id="emg-details">
                        <!-- EMG results will be populated here -->
                    </div>
                </div>

                <button class="quiz-button" onclick="showEMGDecision('${caseId}')">← Back to Decision</button>
                <button class="quiz-button" onclick="showFinalDiagnosis('${caseId}')">Make Final Diagnosis →</button>
            </div>

            <!--Step 5: Final Diagnosis-- >
    <div id="diagnosis-step" class="case-step" style="display: none;">
        <h3>🎯 Final Diagnosis</h3>
        <p><strong>Based on the clinical presentation and test results, what is your final diagnosis?</strong></p>
        <textarea id="final-diagnosis" class="differential-input" style="min-height: 80px;" placeholder="Enter your final diagnosis and reasoning..."></textarea>
        <div id="diagnosis-feedback" style="margin-top: 15px;"></div>
        <button class="quiz-button" onclick="showNCSResults('${caseId}')">← Back to Results</button>
        <button class="quiz-button" onclick="checkFinalDiagnosis('${caseId}')">Check Diagnosis</button>
        <button class="quiz-button" onclick="hideCaseInterface()" style="background: #95a5a6;">← Back to Cases</button>
    </div>
        </div >
    `;
}

function checkDifferential(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const userInput = document.getElementById(`differential - input - ${caseId} `).value.toLowerCase();
    const feedbackDiv = document.getElementById(`differential - feedback - ${caseId} `);

    const userDifferentials = userInput.split('\n').map(d => d.trim()).filter(d => d.length > 0);
    const correctDifferentials = caseData.differentialDiagnosis.map(d => d.toLowerCase());

    let matchedDifferentials = [];
    let missedDifferentials = [];

    // Check which differentials user got right
    userDifferentials.forEach(userDiff => {
        const matched = correctDifferentials.find(correctDiff =>
            correctDiff.includes(userDiff) || userDiff.includes(correctDiff.split(' ')[0])
        );
        if (matched) {
            matchedDifferentials.push(matched);
        }
    });

    // Find missed differentials
    missedDifferentials = correctDifferentials.filter(correct =>
        !matchedDifferentials.some(matched => matched === correct)
    );

    // Generate feedback
    let feedbackClass = 'feedback-correct';
    let feedbackText = '';

    if (matchedDifferentials.length === correctDifferentials.length) {
        feedbackClass = 'feedback-correct';
        feedbackText = `🎉 Excellent! You identified all key differentials: ${matchedDifferentials.join(', ')} `;
    } else if (matchedDifferentials.length > 0) {
        feedbackClass = 'feedback-partial';
        feedbackText = `✅ Good start! You identified: ${matchedDifferentials.join(', ')} <br>`;
        feedbackText += `💡 Also consider: ${missedDifferentials.join(', ')}`;
    } else {
        feedbackClass = 'feedback-incorrect';
        feedbackText = `🤔 Consider these key differentials: ${correctDifferentials.join(', ')}`;
    }

    feedbackDiv.className = `feedback-section ${feedbackClass}`;
    feedbackDiv.innerHTML = feedbackText;
    feedbackDiv.style.display = 'block';
}

function checkDiagnosis(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const userDiagnosis = document.getElementById(`diagnosis-input-${caseId}`).value.toLowerCase();
    const feedbackDiv = document.getElementById(`diagnosis-feedback-${caseId}`);
    const correctDiagnosis = caseData.correctDiagnosis.toLowerCase();

    let feedbackClass = 'feedback-incorrect';
    let feedbackText = '';

    // Check if diagnosis matches (flexible matching)
    const diagnosisWords = correctDiagnosis.split(' ');
    const userWords = userDiagnosis.split(' ');

    let matchCount = 0;
    diagnosisWords.forEach(word => {
        if (userWords.some(userWord => userWord.includes(word) || word.includes(userWord))) {
            matchCount++;
        }
    });

    const matchPercentage = matchCount / diagnosisWords.length;

    if (matchPercentage >= 0.7) {
        feedbackClass = 'feedback-correct';
        feedbackText = `🎉 Correct! ${caseData.correctDiagnosis}<br><br>📚 ${caseData.explanation}`;
    } else if (matchPercentage >= 0.4) {
        feedbackClass = 'feedback-partial';
        feedbackText = `🤔 Close! The correct diagnosis is: ${caseData.correctDiagnosis}<br><br>📚 ${caseData.explanation}`;
    } else {
        feedbackClass = 'feedback-incorrect';
        feedbackText = `❌ The correct diagnosis is: ${caseData.correctDiagnosis}<br><br>📚 ${caseData.explanation}`;
    }

    feedbackDiv.className = `feedback-section ${feedbackClass}`;
    feedbackDiv.innerHTML = feedbackText;
    feedbackDiv.style.display = 'block';
}

function showExplanation(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    alert(`Explanation:\n\n${caseData.explanation}`);
}

function hideCaseInterface() {
    document.getElementById('case-interface').style.display = 'none';
}

// Clinical Cases Navigation Functions
function hideAllSteps() {
    const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
    steps.forEach(stepId => {
        const element = document.getElementById(stepId);
        if (element) element.style.display = 'none';
    });
}

function updateProgress(percentage) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

function showCasePresentation(caseId) {
    hideAllSteps();
    document.getElementById('case-presentation-step').style.display = 'block';
    updateProgress(25);
}

function showPhysicalExam(caseId) {
    hideAllSteps();
    document.getElementById('physical-exam-step').style.display = 'block';
    updateProgress(50);
}

function showDifferentialBuilder(caseId) {
    hideAllSteps();
    document.getElementById('differential-step').style.display = 'block';
    updateProgress(75);
}

function analyzeDifferential(caseId) {
    const userInput = document.getElementById('user-differential').value;
    const feedbackDiv = document.getElementById('differential-feedback');

    if (!userInput.trim()) {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 15px; margin: 15px 0;">' +
            '<h4 style="color: #e74c3c;">⚠️ Please Enter Your Differential</h4>' +
            '<p style="color: #e74c3c;">Please provide your differential diagnosis before proceeding.</p>' +
            '</div>';
        return;
    }

    // Get case data and expected differentials
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    console.log('🔍 Differential Debug:', {
        caseId: caseId,
        hasDatabase: !!window.caseDatabase,
        caseFound: !!caseData,
        hasDifferential: !!(caseData && caseData.differentialDiagnosis),
        availableCases: window.caseDatabase ? Object.keys(window.caseDatabase) : 'No DB'
    });

    if (!caseData || !caseData.differentialDiagnosis) {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 15px; margin: 15px 0;">' +
            '<h4 style="color: #e74c3c;">❌ Case Data Error</h4>' +
            '<p style="color: #e74c3c;">Unable to analyze differential. Case ID: ' + caseId + '</p>' +
            '<p style="color: #e74c3c;">Database exists: ' + (!!window.caseDatabase) + '</p>' +
            '<p style="color: #e74c3c;">Available cases: ' + (window.caseDatabase ? Object.keys(window.caseDatabase).slice(0, 3).join(', ') + '...' : 'None') + '</p>' +
            '</div>';
        return;
    }

    // Define common medical abbreviations and their full forms
    const abbreviationMap = {
        'cts': ['carpal tunnel syndrome', 'carpal tunnel'],
        'cuts': ['cubital tunnel syndrome', 'cubital tunnel'],
        'als': ['amyotrophic lateral sclerosis', 'motor neuron disease'],
        'ms': ['multiple sclerosis'],
        'gbs': ['guillain-barre syndrome', 'guillain barre syndrome'],
        'cidp': ['chronic inflammatory demyelinating polyneuropathy'],
        'dm': ['diabetes mellitus', 'diabetic neuropathy', 'diabetes'],
        'rad': ['radiculopathy'],
        'plexop': ['plexopathy'],
        'bpi': ['brachial plexus injury', 'brachial plexopathy'],
        'pn': ['peripheral neuropathy', 'polyneuropathy'],
        'myasthenia': ['myasthenia gravis', 'mg'],
        'rhabdo': ['rhabdomyolysis'],
        'polymyositis': ['inflammatory myopathy']
    };

    // Function to expand abbreviations and match terms
    function expandAndMatch(userTerm, expectedTerms) {
        const lowerUserTerm = userTerm.toLowerCase().trim();

        // Direct match
        if (expectedTerms.some(expected => expected.includes(lowerUserTerm) || lowerUserTerm.includes(expected))) {
            return true;
        }

        // Check if user term is an abbreviation
        if (abbreviationMap[lowerUserTerm]) {
            return abbreviationMap[lowerUserTerm].some(expansion =>
                expectedTerms.some(expected => expected.includes(expansion) || expansion.includes(expected))
            );
        }

        // Check if expected term has abbreviations
        for (const [abbrev, expansions] of Object.entries(abbreviationMap)) {
            if (expansions.some(expansion => expectedTerms.some(expected => expected.includes(expansion)))) {
                if (lowerUserTerm === abbrev) return true;
            }
        }

        return false;
    }

    // Parse user input
    const userDifferentials = userInput.toLowerCase().split('\n').map(d => d.trim()).filter(d => d.length > 0);
    const expectedDifferentials = caseData.differentialDiagnosis.map(d => d.toLowerCase());

    let matchedDifferentials = [];
    let missedDifferentials = [];

    // Check which differentials user got right
    userDifferentials.forEach(userDiff => {
        const matched = expectedDifferentials.find(expectedDiff => {
            // First try abbreviation/expansion matching
            if (expandAndMatch(userDiff, [expectedDiff])) {
                return true;
            }

            // Fallback to original word-based matching
            const userWords = userDiff.replace(/[^\w\s]/g, '').split(/\s+/);
            const expectedWords = expectedDiff.replace(/[^\w\s]/g, '').split(/\s+/);

            return userWords.some(userWord =>
                expectedWords.some(expectedWord =>
                    userWord.length > 3 && (expectedWord.includes(userWord) || userWord.includes(expectedWord))
                )
            );
        });

        if (matched) {
            const originalExpected = caseData.differentialDiagnosis.find(d => d.toLowerCase() === matched);
            if (!matchedDifferentials.includes(originalExpected)) {
                matchedDifferentials.push(originalExpected);
            }
        }
    });

    // Find missed key differentials
    missedDifferentials = caseData.differentialDiagnosis.filter(expected =>
        !matchedDifferentials.includes(expected)
    );

    // Generate comprehensive feedback
    let feedbackHtml = '<div style="background: #f0fff4; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 15px 0;">';
    feedbackHtml += '<h4 style="color: #047857; margin-bottom: 15px;">📋 Differential Analysis</h4>';

    if (matchedDifferentials.length > 0) {
        feedbackHtml += '<div style="margin-bottom: 15px;">';
        feedbackHtml += '<h5 style="color: #047857; margin-bottom: 8px;">✅ Correctly Identified:</h5>';
        feedbackHtml += '<ul style="margin: 0; padding-left: 20px; color: #047857;">';
        matchedDifferentials.forEach(diff => {
            feedbackHtml += `<li>${diff}</li>`;
        });
        feedbackHtml += '</ul></div>';
    }

    if (missedDifferentials.length > 0) {
        feedbackHtml += '<div style="margin-bottom: 15px;">';
        feedbackHtml += '<h5 style="color: #dc2626; margin-bottom: 8px;">❌ Key Differentials to Consider:</h5>';
        feedbackHtml += '<ul style="margin: 0; padding-left: 20px; color: #dc2626;">';
        missedDifferentials.forEach(diff => {
            feedbackHtml += `<li>${diff}</li>`;
        });
        feedbackHtml += '</ul></div>';
    }

    // Add learning point
    if (caseData.learningPoint) {
        feedbackHtml += '<div style="background: #fef3c7; padding: 12px; border-radius: 6px; margin-top: 15px;">';
        feedbackHtml += '<h5 style="color: #92400e; margin-bottom: 5px;">💡 Learning Point:</h5>';
        feedbackHtml += `<p style="color: #92400e; margin: 0; font-size: 14px;">${caseData.learningPoint}</p>`;
        feedbackHtml += '</div>';
    }

    feedbackHtml += '</div>';

    feedbackDiv.innerHTML = feedbackHtml;

    // Show EMG decision section
    document.getElementById('emg-decision-section').style.display = 'block';
}

function showEMGDecision(caseId) {
    hideAllSteps();
    document.getElementById('emg-decision-step').style.display = 'block';
    updateProgress(70);
}

function makeEMGDecision(caseId, decision) {
    const feedbackDiv = document.getElementById('emg-decision-feedback');
    const continueBtn = document.getElementById('continue-after-decision');

    // For now, assume EMG is indicated for most cases (this can be refined per case)
    const isEMGIndicated = true; // This should be set per case data

    if (decision === true && isEMGIndicated) {
        feedbackDiv.innerHTML = '<div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">' +
            '<h4 style="color: #27ae60;">✅ Correct Decision</h4>' +
            '<p>You correctly identified that this presentation warrants EMG/NCS evaluation. This appears to be a peripheral nervous system problem that would benefit from electrodiagnostic studies.</p>' +
            '</div>';
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = 'Proceed to EMG/NCS Results →';
    } else if (decision === false && !isEMGIndicated) {
        feedbackDiv.innerHTML = '<div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">' +
            '<h4 style="color: #27ae60;">✅ Excellent Clinical Judgment</h4>' +
            '<p>You correctly identified that EMG/NCS is not indicated in this case.</p>' +
            '</div>';
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = 'Complete Case Review →';
    } else {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">' +
            '<h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>' +
            '<p>For this case, EMG/NCS would be appropriate to help localize and characterize the peripheral nerve pathology.</p>' +
            '</div>';
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = 'Proceed to EMG/NCS Results (Educational) →';
    }
}

function proceedAfterDecision(caseId) {
    showNCSResults(caseId);
}

function convertLegacyToProfessionalFormat(legacyData) {
    console.log('🔄 Converting legacy format to professional format...');

    const professionalFormat = {
        antiSensorySummary: [],
        motorSummary: [],
        comparisonSummary: [],
        emgFindings: legacyData.emgFindings || []
    };

    // Determine if this is upper or lower extremity based on studies
    const isLowerExtremity = legacyData.sensoryStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('sural') ||
        study.nerve.toLowerCase().includes('tibial')
    ) || legacyData.motorStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('tibial') ||
        study.nerve.toLowerCase().includes('peroneal')
    );

    // Add required standard studies first
    if (isLowerExtremity) {
        // Add standard lower extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Superficial Fibular Sensory (Lateral Leg)",
                nr: "2.5", peak: "3.2", normPeak: "<4.0", ptAmp: "18.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Leg", deltaP: "3.0", dist: "14.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Sural Sensory (Lateral Foot)",
                nr: "2.5", peak: "3.8", normPeak: "<4.4", ptAmp: "15.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Foot", deltaP: "3.6", dist: "14.0",
                vel: "45", normVel: ">40", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Fibular Motor (Ext Dig Brev)",
                nr: "4.5", onset: "4.2", normOnset: "<5.5", opAmp: "6.0", normOPAmp: ">2",
                negDur: "7.5", site1: "Ankle", site2: "EDB", deltaO: "4.0", dist: "8.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Tibial Motor (Abd Hall)",
                nr: "4.5", onset: "4.8", normOnset: "<5.8", opAmp: "12.0", normOPAmp: ">4",
                negDur: "8.0", site1: "Ankle", site2: "AH", deltaO: "4.6", dist: "8.0",
                vel: "45", normVel: ">41", abnormal: false
            }
        );
    } else {
        // Add standard upper extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Median Sensory (Index Finger)",
                nr: "2.5", peak: "3.1", normPeak: "<3.4", ptAmp: "20.0", normPT: ">15",
                site1: "Wrist", site2: "Index Finger", deltaP: "2.9", dist: "13.0",
                vel: "58", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Sensory (Little Finger)",
                nr: "2.5", peak: "2.8", normPeak: "<3.4", ptAmp: "18.0", normPT: ">10",
                site1: "Wrist", site2: "Little Finger", deltaP: "2.6", dist: "13.0",
                vel: "62", normVel: ">49", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Median Motor (Abd Poll Brev)",
                nr: "4.5", onset: "3.8", normOnset: "<4.2", opAmp: "8.0", normOPAmp: ">5",
                negDur: "6.2", site1: "Wrist", site2: "APB", deltaO: "3.6", dist: "7.0",
                vel: "58", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Motor (Abd Dig Minimi)",
                nr: "4.5", onset: "2.8", normOnset: "<3.3", opAmp: "14.0", normOPAmp: ">6",
                negDur: "6.0", site1: "Wrist", site2: "ADM", deltaO: "2.6", dist: "7.0",
                vel: "62", normVel: ">53", abnormal: false
            }
        );
    }

    // Then add case-specific studies from legacy data
    if (legacyData.sensoryStudies) {
        legacyData.sensoryStudies.forEach(study => {
            // Skip if we already have this study type in standards
            const alreadyExists = professionalFormat.antiSensorySummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.antiSensorySummary.push({
                    site: `${study.nerve} Sensory (${study.recording})`,
                    nr: "2.5",
                    peak: study.peakLatency.toString(),
                    normPeak: "<3.5",
                    ptAmp: study.amplitude.toString(),
                    normPT: ">15",
                    site1: "Wrist",
                    site2: study.recording,
                    deltaP: (study.peakLatency - 1.0).toFixed(1),
                    dist: "14.0",
                    vel: study.cv.toString(),
                    normVel: ">40",
                    abnormal: !study.normal
                });
            }
        });
    }

    if (legacyData.motorStudies) {
        legacyData.motorStudies.forEach(study => {
            // Skip if we already have this study type in standards
            const alreadyExists = professionalFormat.motorSummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase()) &&
                existing.site.toLowerCase().includes(study.recording.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.motorSummary.push({
                    site: `${study.nerve} Motor (${study.recording})`,
                    nr: "4.5",
                    onset: study.distalLatency.toString(),
                    normOnset: "<4.0",
                    opAmp: study.amplitude.toString(),
                    normOPAmp: ">5",
                    negDur: "6.5",
                    site1: "Wrist",
                    site2: study.recording,
                    deltaO: (study.distalLatency - 1.0).toFixed(1),
                    dist: "7.0",
                    vel: study.cv.toString(),
                    normVel: ">50",
                    abnormal: !study.normal
                });
            }
        });
    }

    console.log('✅ Legacy conversion completed with standard studies included');
    return professionalFormat;
}

function convertNcsStudiesToProfessionalFormat(ncsStudies) {
    console.log('🔄 Converting ncsStudies format to professional format...');

    const professionalFormat = {
        antiSensorySummary: [],
        motorSummary: [],
        comparisonSummary: [],
        emgFindings: []
    };

    // If ncsStudies already has professional format structure, use it directly
    if (ncsStudies.antiSensorySummary) {
        professionalFormat.antiSensorySummary = [...ncsStudies.antiSensorySummary];
    }
    if (ncsStudies.motorSummary) {
        professionalFormat.motorSummary = [...ncsStudies.motorSummary];
    }
    if (ncsStudies.comparisonSummary) {
        professionalFormat.comparisonSummary = [...ncsStudies.comparisonSummary];
    }
    if (ncsStudies.emgFindings) {
        professionalFormat.emgFindings = [...ncsStudies.emgFindings];
    }

    // Determine if this is upper or lower extremity
    const isLowerExtremity = ncsStudies.sensoryStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('sural') ||
        study.nerve.toLowerCase().includes('tibial')
    ) || ncsStudies.motorStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('tibial') ||
        study.nerve.toLowerCase().includes('peroneal')
    );

    // Ensure standard studies are present if not already in professional format
    if (professionalFormat.antiSensorySummary.length === 0 && professionalFormat.motorSummary.length === 0) {
        if (isLowerExtremity) {
            // Add standard lower extremity studies
            professionalFormat.antiSensorySummary.push(
                {
                    site: "Right Superficial Fibular Sensory (Lateral Leg)",
                    nr: "2.5", peak: "3.2", normPeak: "<4.0", ptAmp: "18.0", normPT: ">6",
                    site1: "Ankle", site2: "Lateral Leg", deltaP: "3.0", dist: "14.0",
                    vel: "48", normVel: ">44", abnormal: false
                },
                {
                    site: "Right Sural Sensory (Lateral Foot)",
                    nr: "2.5", peak: "3.8", normPeak: "<4.4", ptAmp: "15.0", normPT: ">6",
                    site1: "Ankle", site2: "Lateral Foot", deltaP: "3.6", dist: "14.0",
                    vel: "45", normVel: ">40", abnormal: false
                }
            );
            professionalFormat.motorSummary.push(
                {
                    site: "Right Fibular Motor (Ext Dig Brev)",
                    nr: "4.5", onset: "4.2", normOnset: "<5.5", opAmp: "6.0", normOPAmp: ">2",
                    negDur: "7.5", site1: "Ankle", site2: "EDB", deltaO: "4.0", dist: "8.0",
                    vel: "48", normVel: ">44", abnormal: false
                },
                {
                    site: "Right Tibial Motor (Abd Hall)",
                    nr: "4.5", onset: "4.8", normOnset: "<5.8", opAmp: "12.0", normOPAmp: ">4",
                    negDur: "8.0", site1: "Ankle", site2: "AH", deltaO: "4.6", dist: "8.0",
                    vel: "45", normVel: ">41", abnormal: false
                }
            );
        } else {
            // Add standard upper extremity studies
            professionalFormat.antiSensorySummary.push(
                {
                    site: "Right Median Sensory (Index Finger)",
                    nr: "2.5", peak: "3.1", normPeak: "<3.4", ptAmp: "20.0", normPT: ">15",
                    site1: "Wrist", site2: "Index Finger", deltaP: "2.9", dist: "13.0",
                    vel: "58", normVel: ">50", abnormal: false
                },
                {
                    site: "Right Ulnar Sensory (Little Finger)",
                    nr: "2.5", peak: "2.8", normPeak: "<3.4", ptAmp: "18.0", normPT: ">10",
                    site1: "Wrist", site2: "Little Finger", deltaP: "2.6", dist: "13.0",
                    vel: "62", normVel: ">49", abnormal: false
                }
            );
            professionalFormat.motorSummary.push(
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "4.5", onset: "3.8", normOnset: "<4.2", opAmp: "8.0", normOPAmp: ">5",
                    negDur: "6.2", site1: "Wrist", site2: "APB", deltaO: "3.6", dist: "7.0",
                    vel: "58", normVel: ">50", abnormal: false
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "4.5", onset: "2.8", normOnset: "<3.3", opAmp: "14.0", normOPAmp: ">6",
                    negDur: "6.0", site1: "Wrist", site2: "ADM", deltaO: "2.6", dist: "7.0",
                    vel: "62", normVel: ">53", abnormal: false
                }
            );
        }
    }

    // Handle legacy sensory/motor study arrays if they exist (add as additional studies)
    if (ncsStudies.sensoryStudies) {
        ncsStudies.sensoryStudies.forEach(study => {
            // Skip if we already have this study type
            const alreadyExists = professionalFormat.antiSensorySummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.antiSensorySummary.push({
                    site: `${study.nerve} Sensory`,
                    nr: "2.5",
                    peak: study.peakLatency?.toString() || study.latency?.toString() || "N/A",
                    normPeak: "<3.5",
                    ptAmp: study.amplitude?.toString() || "N/A",
                    normPT: ">15",
                    site1: "Wrist",
                    site2: study.recording || "Digit",
                    deltaP: "2.0",
                    dist: "14.0",
                    vel: study.cv?.toString() || study.velocity?.toString() || "N/A",
                    normVel: ">40",
                    abnormal: !study.normal
                });
            }
        });
    }

    if (ncsStudies.motorStudies) {
        ncsStudies.motorStudies.forEach(study => {
            // Skip if we already have this study type
            const alreadyExists = professionalFormat.motorSummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase()) &&
                existing.site.toLowerCase().includes(study.recording.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.motorSummary.push({
                    site: `${study.nerve} Motor`,
                    nr: "4.5",
                    onset: study.distalLatency?.toString() || study.latency?.toString() || "N/A",
                    normOnset: "<4.0",
                    opAmp: study.amplitude?.toString() || "N/A",
                    normOPAmp: ">5",
                    negDur: "6.5",
                    site1: "Wrist",
                    site2: study.recording || "Muscle",
                    deltaO: "2.0",
                    dist: "7.0",
                    vel: study.cv?.toString() || study.velocity?.toString() || "N/A",
                    normVel: ">50",
                    abnormal: !study.normal
                });
            }
        });
    }

    console.log('✅ ncsStudies conversion completed with standard studies ensured');
    return professionalFormat;
}

// Enhanced conversion function specifically for resident tool format
function convertResidentToolToProfessionalFormat(residentData) {
    console.log('🔄 Converting resident tool format to professional format...');
    const professionalFormat = {
        antiSensorySummary: [],
        motorSummary: [],
        comparisonSummary: [],
        emgFindings: []
    };

    // Determine if this is upper or lower extremity based on ncsStudies
    const isLowerExtremity = residentData.ncsStudies?.some(study =>
        study.nerve?.toLowerCase().includes('fibular') ||
        study.nerve?.toLowerCase().includes('sural') ||
        study.nerve?.toLowerCase().includes('tibial') ||
        study.nerve?.toLowerCase().includes('peroneal')
    );

    // Add required standard studies first
    if (isLowerExtremity) {
        // Standard lower extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Superficial Fibular Sensory (Lateral Leg)",
                nr: "2.5", peak: "3.2", normPeak: "<4.0", ptAmp: "18.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Leg", deltaP: "3.0", dist: "14.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Sural Sensory (Lateral Foot)",
                nr: "2.5", peak: "3.8", normPeak: "<4.4", ptAmp: "15.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Foot", deltaP: "3.6", dist: "14.0",
                vel: "45", normVel: ">40", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Fibular Motor (Ext Dig Brev)",
                nr: "4.5", onset: "4.2", normOnset: "<5.5", opAmp: "6.0", normOPAmp: ">2",
                negDur: "7.5", site1: "Ankle", site2: "EDB", deltaO: "4.0", dist: "8.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Tibial Motor (Abd Hall)",
                nr: "4.5", onset: "4.8", normOnset: "<5.8", opAmp: "12.0", normOPAmp: ">4",
                negDur: "8.0", site1: "Ankle", site2: "AH", deltaO: "4.6", dist: "8.0",
                vel: "45", normVel: ">41", abnormal: false
            }
        );
    } else {
        // Standard upper extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Median Sensory (Index Finger)",
                nr: "2.5", peak: "3.1", normPeak: "<3.4", ptAmp: "20.0", normPT: ">15",
                site1: "Wrist", site2: "Index Finger", deltaP: "3.0", dist: "14.0",
                vel: "46", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Sensory (Little Finger)",
                nr: "2.5", peak: "2.9", normPeak: "<3.4", ptAmp: "18.0", normPT: ">15",
                site1: "Wrist", site2: "Little Finger", deltaP: "2.8", dist: "14.0",
                vel: "50", normVel: ">50", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Median Motor (Abd Poll Brev)",
                nr: "4.5", onset: "3.8", normOnset: "<4.2", opAmp: "12.0", normOPAmp: ">4",
                negDur: "7.5", site1: "Wrist", site2: "APB", deltaO: "3.6", dist: "7.0",
                vel: "52", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Motor (Abd Dig Min)",
                nr: "4.5", onset: "3.4", normOnset: "<3.3", opAmp: "14.0", normOPAmp: ">6",
                negDur: "6.8", site1: "Wrist", site2: "ADM", deltaO: "3.2", dist: "7.0",
                vel: "55", normVel: ">50", abnormal: false
            }
        );
    }

    // Process the resident tool ncsStudies data to add disease-specific findings
    if (residentData.ncsStudies) {
        residentData.ncsStudies.forEach(study => {
            const isAbnormal = study.interpretation?.toLowerCase().includes('abnormal') ||
                study.interpretation?.toLowerCase().includes('prolonged') ||
                study.interpretation?.toLowerCase().includes('reduced') ||
                study.interpretation?.toLowerCase().includes('absent') ||
                study.interpretation?.toLowerCase().includes('decreased') ||
                study.result?.toLowerCase().includes('abnormal');

            if (study.type && study.type.toLowerCase().includes('sensory')) {
                // Modify existing sensory study to show abnormality
                const existingIndex = professionalFormat.antiSensorySummary.findIndex(s =>
                    s.site.toLowerCase().includes(study.nerve?.toLowerCase())
                );

                if (existingIndex >= 0 && isAbnormal) {
                    // Modify existing study to show abnormality
                    professionalFormat.antiSensorySummary[existingIndex].abnormal = true;
                    professionalFormat.antiSensorySummary[existingIndex].peak = "Absent";
                    professionalFormat.antiSensorySummary[existingIndex].ptAmp = "0.0";
                    professionalFormat.antiSensorySummary[existingIndex].vel = "N/A";
                    professionalFormat.antiSensorySummary[existingIndex].deltaP = "N/A";
                } else if (existingIndex < 0) {
                    // Add new sensory study if not found in standards
                    professionalFormat.antiSensorySummary.push({
                        site: `Right ${study.nerve} Sensory`,
                        nr: study.result || "2.5",
                        peak: isAbnormal ? "Absent" : "3.1",
                        normPeak: "<3.4",
                        ptAmp: isAbnormal ? "0.0" : "20.0",
                        normPT: ">15",
                        site1: "Stimulation",
                        site2: "Recording",
                        deltaP: isAbnormal ? "N/A" : "3.0",
                        dist: "14.0",
                        vel: isAbnormal ? "N/A" : "46",
                        normVel: ">50",
                        abnormal: isAbnormal
                    });
                }
            } else if (study.type && study.type.toLowerCase().includes('motor')) {
                // Modify existing motor study to show abnormality
                const existingIndex = professionalFormat.motorSummary.findIndex(s =>
                    s.site.toLowerCase().includes(study.nerve?.toLowerCase())
                );

                if (existingIndex >= 0 && isAbnormal) {
                    // Modify existing study to show abnormality
                    professionalFormat.motorSummary[existingIndex].abnormal = true;
                    professionalFormat.motorSummary[existingIndex].onset = "Absent";
                    professionalFormat.motorSummary[existingIndex].opAmp = "0.0";
                    professionalFormat.motorSummary[existingIndex].vel = "N/A";
                    professionalFormat.motorSummary[existingIndex].deltaO = "N/A";
                    professionalFormat.motorSummary[existingIndex].negDur = "N/A";
                } else if (existingIndex < 0) {
                    // Add new motor study if not found in standards
                    professionalFormat.motorSummary.push({
                        site: `Right ${study.nerve} Motor`,
                        nr: study.result || "4.5",
                        onset: isAbnormal ? "Absent" : "3.8",
                        normOnset: "<4.2",
                        opAmp: isAbnormal ? "0.0" : "12.0",
                        normOPAmp: ">4",
                        negDur: isAbnormal ? "N/A" : "7.5",
                        site1: "Stimulation",
                        site2: "Recording",
                        deltaO: isAbnormal ? "N/A" : "3.6",
                        dist: "7.0",
                        vel: isAbnormal ? "N/A" : "52",
                        normVel: ">50",
                        abnormal: isAbnormal
                    });
                }
            }
        });
    }

    // Convert EMG studies if present in resident tool format
    if (residentData.emgStudies) {
        residentData.emgStudies.forEach(study => {
            const isAbnormal = study.interpretation?.toLowerCase().includes('abnormal') ||
                study.interpretation?.toLowerCase().includes('neuropathic') ||
                study.interpretation?.toLowerCase().includes('denervation');

            professionalFormat.emgFindings.push({
                muscle: study.muscle || study.nerve || "Unknown",
                insertionalActivity: study.interpretation?.toLowerCase().includes('increased') ? "Increased" : "Normal",
                spontaneousActivity: study.interpretation?.toLowerCase().includes('fibrillation') ||
                    study.interpretation?.toLowerCase().includes('denervation') ? "2+ Fibs, 1+ PSWs" : "None",
                voluntaryActivity: study.interpretation?.toLowerCase().includes('neuropathic') ? "Reduced recruitment, large polyphasic MUAPs" : "Normal",
                recruitmentPattern: study.interpretation?.toLowerCase().includes('reduced') ? "Reduced" : "Normal",
                abnormal: isAbnormal
            });
        });
    }

    console.log('✅ Resident tool conversion completed');
    return professionalFormat;
}

function generateSimplifiedNCSTable(ncsResults) {
    let html = '';

    // Nerve/Root Reveal Controls
    html += `
            <div style="margin-bottom: 20px; text-align: center;">
                <button id="toggle-anatomy-info" onclick="toggleAnatomyInfo()"
                    style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                    🧠 Show Nerve/Root Info
                </button>
                <p style="color: #6b7280; font-size: 12px; margin: 5px 0 0 0;">💪 Challenge yourself: Try to recall the nerve and root for each muscle before revealing!</p>
                <p style="color: #8b8b8b; font-size: 11px; margin: 2px 0 0 0; font-style: italic;">Building anatomical memory strengthens your clinical reasoning skills</p>
            </div>
            `;

    // Professional Anti Sensory Summary Table
    console.log('🔍 DEBUG: antiSensorySummary exists:', !!ncsResults.antiSensorySummary);
    console.log('🔍 DEBUG: antiSensorySummary length:', ncsResults.antiSensorySummary ? ncsResults.antiSensorySummary.length : 'N/A');
    if (ncsResults.antiSensorySummary && ncsResults.antiSensorySummary.length > 0) {
        console.log('✅ DEBUG: Rendering Anti Sensory Summary Table');
        console.log('📋 DEBUG: Current HTML length before table:', html.length);
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Anti Sensory Summary Table</h4>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Site</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">N/R</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Peak</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">P-T Amp (μV)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm P-T</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site1</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site2</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Vel (m/s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;

        ncsResults.antiSensorySummary.forEach(study => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            html += `
                            <tr>
                                <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${study.site}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.nr}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.peak, !study.abnormal)}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normPeak}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.ptAmp, !study.abnormal)}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normPT}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site1}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site2}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.deltaP}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.dist}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.vel, !study.abnormal)}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normVel}</td>
                            </tr>
                            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
            `;
        console.log('📋 DEBUG: Anti Sensory table completed, HTML length:', html.length);
    }

    // Professional Motor Summary Table
    console.log('🔍 DEBUG: motorSummary exists:', !!ncsResults.motorSummary);
    console.log('🔍 DEBUG: motorSummary length:', ncsResults.motorSummary ? ncsResults.motorSummary.length : 'N/A');
    if (ncsResults.motorSummary && ncsResults.motorSummary.length > 0) {
        console.log('✅ DEBUG: Rendering Motor Summary Table');
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Motor Summary Table</h4>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Site</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">N/R</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Onset (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Onset (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">O-P Amp (mV)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm O-P Amp</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Neg Dur (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site1</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site2</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Delta-O (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Vel (m/s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;

        ncsResults.motorSummary.forEach(study => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            html += `
                            <tr>
                                <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${study.site}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.nr}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.onset, !study.abnormal)}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normOnset}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.opAmp, !study.abnormal)}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normOPAmp}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.negDur}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site1}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site2}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.deltaO}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.dist}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.vel, !study.abnormal)}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normVel}</td>
                            </tr>
                            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
            `;
    }

    // Comparison Summary Table
    console.log('🔍 DEBUG: comparisonSummary exists:', !!ncsResults.comparisonSummary);
    console.log('🔍 DEBUG: comparisonSummary length:', ncsResults.comparisonSummary ? ncsResults.comparisonSummary.length : 'N/A');
    if (ncsResults.comparisonSummary && ncsResults.comparisonSummary.length > 0) {
        console.log('✅ DEBUG: Rendering Comparison Summary Table');
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Comparison Summary Table</h4>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Site</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">N/R</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">P-T Amp (μV)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site1</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site2</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;

        ncsResults.comparisonSummary.forEach(study => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            html += `
                            <tr>
                                <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${study.site}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">
                                    Median: ${study.median.nr}<br />
                                    Ulnar: ${study.ulnar.nr}
                                </td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">
                                    ${formatValue(study.median.peak, !study.abnormal)}<br />
                                    ${study.ulnar.peak}
                                </td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">
                                    ${formatValue(study.median.ptAmp, !study.abnormal)}<br />
                                    ${study.ulnar.ptAmp}
                                </td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site1}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site2}</td>
                                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.deltaP, !study.abnormal)}</td>
                            </tr>
                            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
            `;
    }

    // Professional EMG Table
    if (ncsResults.emgFindings && ncsResults.emgFindings.length > 0) {
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">EMG</h4>
                <div style="margin-bottom: 15px;">
                    <button id="toggle-anatomy-info"
                            onclick="toggleAnatomyInfo()"
                            style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer; margin-bottom: 10px;">
                        🧠 Show Nerve/Root Info
                    </button>
                    <p style="color: #8b8b8b; font-size: 11px; margin: 2px 0 0 0; font-style: italic;">Building anatomical memory strengthens your clinical reasoning skills</p>
                </div>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Side</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Muscle</th>
                                <th class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600; display: none;">Nerve</th>
                                <th class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600; display: none;">Root</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Ins Act</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Fibs</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Psw</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Amp</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Dur</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Poly</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Recrt</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Int Pat</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        ncsResults.emgFindings.forEach(finding => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            console.log('🔍 EMG Finding:', finding.muscle, 'nerve:', finding.nerve, 'root:', finding.root);

            html += `
            <tr>
                <td style="border: 1px solid #d1d5db; padding: 6px;">${finding.side || 'Right'}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px;">${finding.muscle}</td>
                <td class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; display: none;">${finding.nerve || '—'}</td>
                <td class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; display: none;">${finding.root || '—'}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.insAct || finding.insertionalActivity, !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.fibs || finding.spontaneousActivity, !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.psw || 'Nml', !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.amp || 'Nml', !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.dur || 'Nml', !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.poly || '0', !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.recrt || finding.recruitment, !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.intPat || 'Nml', !finding.abnormal)}</td>
                <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${finding.comment || ''}</td>
            </tr>
            `;
        });

        html += `
        </tbody>
    </table>
    </div>
</div>
`;
    }

    console.log('🎯 DEBUG: Final HTML length:', html.length);
    console.log('📄 DEBUG: Final HTML preview:', html.substring(0, 500) + '...');
    return html;
}

function toggleAnatomyInfo() {
    const anatomyElements = document.querySelectorAll('.anatomy-info');
    const toggleButton = document.getElementById('toggle-anatomy-info');

    // Check if elements exist
    if (anatomyElements.length === 0) {
        console.warn('No anatomy-info elements found');
        return;
    }

    const isVisible = anatomyElements[0].style.display !== 'none';

    anatomyElements.forEach(element => {
        element.style.display = isVisible ? 'none' : 'table-cell';
    });

    if (toggleButton) {
        toggleButton.textContent = isVisible ? '🧠 Show Nerve/Root Info' : '🧠 Hide Nerve/Root Info';
    }
}

// Make function globally available
window.toggleAnatomyInfo = toggleAnatomyInfo;

function showNCSResults(caseId) {
    hideAllSteps();

    // Populate NCS results from case data
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const ncsResultsDiv = document.getElementById('ncs-results');

    // Handle both old ncsStudies format and new ncsResults format
    if (caseData && (caseData.ncsStudies || caseData.ncsResults)) {
        let ncsHtml = '<div class="clinical-report-container" style="background: white; padding: 25px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">';

        // Patient header
        ncsHtml += `
    < div style = "border-bottom: 2px solid #374151; margin-bottom: 25px; padding-bottom: 15px;" >
                <h3 style="color: #374151; margin: 0; font-size: 20px; font-weight: 700;">Patient: ${caseData.presentation.occupation || 'Case Study'}</h3>
                <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Test Date: ${new Date().toLocaleDateString()}</p>
            </div >
    `;

        // Check if using new ncsResults format
        console.log('🔍 DEBUG: caseData.ncsResults exists:', !!caseData.ncsResults);
        console.log('🔍 DEBUG: ncsResults content:', caseData.ncsResults);

        if (caseData.ncsResults) {
            console.log('🔍 DEBUG: ncsResults keys:', Object.keys(caseData.ncsResults));

            // Convert legacy format to professional format if needed
            let professionalFormat = caseData.ncsResults;

            if (caseData.ncsResults.sensoryStudies || caseData.ncsResults.motorStudies) {
                console.log('🔄 DEBUG: Converting legacy format to professional format');
                professionalFormat = convertLegacyToProfessionalFormat(caseData.ncsResults);
            } else if (caseData.ncsResults.antiSensorySummary) {
                console.log('✅ DEBUG: Using existing professional format');
            } else {
                console.log('⚠️ DEBUG: Unknown format detected');
            }

            // CRITICAL FIX: Merge EMG data from separate emgFindings array if it exists
            if (caseData.emgFindings && caseData.emgFindings.length > 0) {
                console.log('🔧 DEBUG: Merging separate emgFindings array with', caseData.emgFindings.length, 'entries');
                if (!professionalFormat.emgFindings) {
                    professionalFormat.emgFindings = [];
                }
                professionalFormat.emgFindings = [...professionalFormat.emgFindings, ...caseData.emgFindings];
                console.log('✅ DEBUG: Merged EMG data, total EMG findings:', professionalFormat.emgFindings.length);
            }

            ncsHtml += generateSimplifiedNCSTable(professionalFormat);
        } else if (caseData.ncsStudies) {
            console.log('🔄 DEBUG: Converting ncsStudies legacy format to professional format');

            // Detect if this is resident tool format (has type, nerve, interpretation fields)
            const isResidentToolFormat = caseData.ncsStudies.some(study =>
                study.type && study.nerve && study.interpretation
            );

            let professionalFormat;
            if (isResidentToolFormat) {
                console.log('🎯 DEBUG: Detected resident tool format, using enhanced conversion');
                professionalFormat = convertResidentToolToProfessionalFormat(caseData);
            } else {
                console.log('🔄 DEBUG: Using standard ncsStudies conversion');
                professionalFormat = convertNcsStudiesToProfessionalFormat(caseData.ncsStudies);
            }

            // CRITICAL FIX: Merge EMG data from separate emgFindings array if it exists
            if (caseData.emgFindings && caseData.emgFindings.length > 0) {
                console.log('🔧 DEBUG: Merging separate emgFindings array with', caseData.emgFindings.length, 'entries');
                if (!professionalFormat.emgFindings) {
                    professionalFormat.emgFindings = [];
                }
                professionalFormat.emgFindings = [...professionalFormat.emgFindings, ...caseData.emgFindings];
                console.log('✅ DEBUG: Merged EMG data, total EMG findings:', professionalFormat.emgFindings.length);
            }

            ncsHtml += generateSimplifiedNCSTable(professionalFormat);
        } else {
            console.log('⚠️ DEBUG: No NCS data found, using legacy table rendering');
            // Handle legacy format
            // Anti-Sensory Summary Table
            ncsHtml += `
    < div style = "margin-bottom: 30px;" >
                    <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Nerve Conduction Studies</h4>
                    <h5 style="color: #6b7280; margin-bottom: 10px; font-size: 14px; font-weight: 600;">Anti Sensory Summary Table</h5>
                    <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                            <thead style="background: #f9fafb;">
                                <tr>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Site</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">NR</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Peak</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">F-P Amp (μV)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm F-P Amp</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site1</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site2</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Vel</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            caseData.ncsStudies.antiSensorySummary.forEach(study => {
                // Function to check if value is abnormal and return styled text
                const formatValue = (value, normal, isVelocity = false) => {
                    if (!value || !normal) return value || '';

                    const numValue = parseFloat(value);
                    let isAbnormal = false;

                    if (normal.startsWith('>')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue < threshold;
                    } else if (normal.startsWith('<')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue > threshold;
                    }

                    return isAbnormal ? `<strong>${value}</strong>` : value;
                };

                ncsHtml += `
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 8px; font-weight: 500;">${study.site}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.nr}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.peak, study.normPeak)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normPeak}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.fpAmp, study.normFP)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normFP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site1}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site2}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.deltaP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.dist}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.vel, study.normVel, true)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normVel}</td>
                    </tr>
                `;
            });

            ncsHtml += `
                            </tbody>
                        </table>
                    </div>
                </div >
    `;
        }

        // Motor Summary Table (only for legacy format)
        if (caseData.ncsStudies && caseData.ncsStudies.motorSummary) {
            ncsHtml += `
    < div style = "margin-bottom: 30px;" >
                    <h5 style="color: #6b7280; margin-bottom: 10px; font-size: 14px; font-weight: 600;">Motor Summary Table</h5>
                    <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                            <thead style="background: #f9fafb;">
                                <tr>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Site</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">NR</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Onset (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Onset</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">F-P Amp (mV)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm F-P Amp</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Neg</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site1</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site2</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Vel</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            caseData.ncsStudies.motorSummary.forEach(study => {
                // Function to check if value is abnormal and return styled text
                const formatValue = (value, normal) => {
                    if (!value || !normal) return value || '';

                    const numValue = parseFloat(value);
                    let isAbnormal = false;

                    if (normal.startsWith('>')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue < threshold;
                    } else if (normal.startsWith('<')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue > threshold;
                    }

                    return isAbnormal ? `<strong>${value}</strong>` : value;
                };

                ncsHtml += `
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 8px; font-weight: 500;">${study.site}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.nr}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.onset, study.normOnset)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normOnset}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.fpAmp, study.normFP)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normFP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.neg}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site1}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site2}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.deltaP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.dist}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.vel, study.normVel)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normVel}</td>
                    </tr>
                `;
            });

            ncsHtml += `
                            </tbody>
                        </table>
                    </div>
                </div >
    `;
        }

        // EMG Results
        if (caseData.emgStudies) {
            // Comparison Summary Table
            if (caseData.emgStudies.comparisonSummary) {
                ncsHtml += `
    < div style = "margin-bottom: 30px;" >
                        <h5 style="color: #6b7280; margin-bottom: 10px; font-size: 14px; font-weight: 600;">Comparison Summary Table</h5>
                        <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                                <thead style="background: #f9fafb;">
                                    <tr>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Site</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">NR</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">F-P Amp (μV)</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site1</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site2</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;

                caseData.emgStudies.comparisonSummary.forEach(study => {
                    ncsHtml += `
                        <tr>
                            <td style="border: 1px solid #d1d5db; padding: 8px; font-weight: 500;">${study.site}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.nr}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.peak}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.fpAmp}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site1}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site2}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.deltaP}</td>
                        </tr>
                    `;
                });

                ncsHtml += `
                                </tbody>
                            </table>
                        </div>
                    </div >
    `;
            }

            // EMG Needle Examination Table
            if (caseData.emgStudies.needleExamination) {
                ncsHtml += `
    < div style = "margin-bottom: 30px;" >
                        <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">EMG</h4>
                        <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                                <thead style="background: #f9fafb;">
                                    <tr>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Side</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Muscle</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Nerve</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Root</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Ins Act</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Fibs</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Psw</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Amp</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Dur</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Poly</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Recrt</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Int Pat</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;

                caseData.emgStudies.needleExamination.forEach(study => {
                    // Function to format EMG findings (bold if abnormal)
                    const formatEMGValue = (value) => {
                        if (!value || value === "Nml" || value === "0") return value;
                        // If it's not "Nml" or "0", it's abnormal
                        return `<strong>${value}</strong>`;
                    };

                    ncsHtml += `
                        <tr>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 500;">${study.side}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px;">${study.muscle}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px;">${study.nerve}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.root}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.insAct)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.fibs)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.psw)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.amp)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.dur)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.poly)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.recrt)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.intPat)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px;">${study.comment}</td>
                        </tr>
                    `;
                });

                ncsHtml += `
                                </tbody>
                            </table>
                        </div>
                    </div >
    `;
            }
        }

        ncsHtml += '</div>';
        ncsResultsDiv.innerHTML = ncsHtml;
    } else {
        ncsResultsDiv.innerHTML = '<p>NCS results would be loaded here for this case.</p>';
    }

    document.getElementById('results-step').style.display = 'block';
    updateProgress(100);
}

function showFinalDiagnosis(caseId) {
    hideAllSteps();

    document.getElementById('diagnosis-step').style.display = 'block';
    updateProgress(100);
}

function checkFinalDiagnosis(caseId) {
    const userDiagnosis = document.getElementById('final-diagnosis').value;
    const feedbackDiv = document.getElementById('diagnosis-feedback');

    if (!userDiagnosis.trim()) {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 15px; margin: 15px 0;">' +
            '<h4 style="color: #e74c3c;">⚠️ Please Enter Your Diagnosis</h4>' +
            '<p style="color: #e74c3c;">Please provide your final diagnosis before checking.</p>' +
            '</div>';
        return;
    }

    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const correctDiagnosis = caseData ? caseData.correctDiagnosis || caseData.title : 'diagnosis not available';

    feedbackDiv.innerHTML = '<div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 15px 0;">' +
        '<h4 style="color: #1e40af;">📋 Your Diagnosis Recorded</h4>' +
        '<p style="color: #1e40af;"><strong>Your Diagnosis:</strong> ' + userDiagnosis + '</p>' +
        '<p style="color: #1e40af;"><strong>Expected Diagnosis:</strong> ' + correctDiagnosis + '</p>' +
        '<p style="color: #1e40af;">Great work completing this clinical case! Consider how the systematic approach helped you reach your diagnosis.</p>' +
        '</div>';
}

// Legacy function compatibility
function startBeginnerCases() {
    // Set only beginner to active
    document.getElementById('beginner-checkbox').checked = true;
    document.getElementById('intermediate-checkbox').checked = false;
    document.getElementById('difficult-checkbox').checked = false;
    updateDifficultyCards();
    startRandomCaseByDifficulty();
}

function startIntermediateCases() {
    // Set only intermediate to active
    document.getElementById('beginner-checkbox').checked = false;
    document.getElementById('intermediate-checkbox').checked = true;
    document.getElementById('difficult-checkbox').checked = false;
    updateDifficultyCards();
    startRandomCaseByDifficulty();
}

function startExpertCases() {
    // Set only difficult to active
    document.getElementById('beginner-checkbox').checked = false;
    document.getElementById('intermediate-checkbox').checked = false;
    document.getElementById('difficult-checkbox').checked = true;
    updateDifficultyCards();
    startRandomCaseByDifficulty();
}

function updateDifficultyCards() {
    ['beginner', 'intermediate', 'difficult'].forEach(difficulty => {
        const toggle = document.getElementById(`${difficulty} -toggle`);
        const checkbox = document.getElementById(`${difficulty} -checkbox`);
        const statusText = toggle.querySelector('.status-text');

        if (checkbox.checked) {
            toggle.classList.remove('inactive');
            toggle.classList.add('active');
            statusText.textContent = 'ACTIVE';
        } else {
            toggle.classList.remove('active');
            toggle.classList.add('inactive');
            statusText.textContent = 'INACTIVE';
        }
    });
}

// Make functions globally available
// Clinical Cases functions are now handled by src/modules/ClinicalCases.js and Initialization.js
// Legacy exports removed to prevent ReferenceErrors

// Advanced Muscle Localization Lab - Extracted from EMG_NCS_Resident_Tool
window.AdvancedMuscleTest = {
    currentMode: 'regional',
    isTestActive: false,
    currentQuestion: null,
    stats: {
        questionsAnswered: 0,
        correctAnswers: 0,
        currentStreak: 0
    },

    setMode: function (mode) {
        this.currentMode = mode;
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('selected');
        });
        if (event && event.target) {
            event.target.closest('.mode-card').classList.add('selected');
        }
        console.log('🎯 Training mode set to:', mode);
    },

    startTest: function () {
        this.isTestActive = true;
        // For now, show study cards until we have the full modal
        showStudyCards();
        console.log('🚀 Advanced muscle test started');
    },

    stopTest: function () {
        this.isTestActive = false;
        console.log('⏹️ Advanced muscle test stopped');
    }
};

// EMG Localization Challenge - Extracted from EMG_NCS_Resident_Tool
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

    toggleQuestionType: function (type) {
        this.activeQuestionTypes[type] = !this.activeQuestionTypes[type];
    },

    startChallenge: function () {
        this.isActive = true;
        this.score = { correct: 0, total: 0 };

        // Hide settings, show active challenge
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');

        if (settingsPanel) settingsPanel.style.display = 'none';
        if (activePanel) activePanel.style.display = 'block';

        this.generateCase();
    },

    generateCase: function () {
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

    getAvailableLesions: function () {
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

    getLesionData: function (lesionName) {
        // Check UE first, then LE
        if (this.lesionSites.UE[lesionName]) {
            return { ...this.lesionSites.UE[lesionName], region: 'UE' };
        } else if (this.lesionSites.LE[lesionName]) {
            return { ...this.lesionSites.LE[lesionName], region: 'LE' };
        }
        return null;
    },

    selectRandomMuscles: function (muscleArray, count) {
        const shuffled = [...muscleArray].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, muscleArray.length));
    },

    selectNormalMuscles: function (abnormalMuscles, region, count) {
        // Get all muscles from the same extremity
        const allMuscles = Object.keys(window.MuscleAnatomy.muscleDatabase).filter(muscle => {
            return window.MuscleAnatomy.muscleDatabase[muscle].region === region;
        });

        // Filter out abnormal muscles
        const normalMuscles = allMuscles.filter(muscle => !abnormalMuscles.includes(muscle));

        // Select random normal muscles
        return this.selectRandomMuscles(normalMuscles, count);
    },

    generateAnswerOptions: function (correctLesion, correctLesionData) {
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

    displayCase: function () {
        const { abnormalMuscles, normalMuscles, answerOptions } = this.currentCase;

        // Update abnormal muscles list
        const abnormalList = document.getElementById('challenge-abnormal-muscles');
        if (abnormalList) {
            abnormalList.innerHTML = abnormalMuscles.map(m => `< li > ${m}</li > `).join('');
        }

        // Update normal muscles list
        const normalList = document.getElementById('challenge-normal-muscles');
        if (normalList) {
            normalList.innerHTML = normalMuscles.map(m => `< li > ${m}</li > `).join('');
        }

        // Update answer options
        const optionsContainer = document.getElementById('challenge-answer-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = answerOptions.map(option => `
    < button class="challenge-answer-btn" onclick = "EMGChallenge.selectAnswer('${option.replace(/'/g, "\\'")}') " style="
background: white;
border: 2px solid #d1d5db;
border - radius: 8px;
padding: 15px 20px;
color: #374151;
font - weight: 500;
cursor: pointer;
transition: all 0.3s ease;
text - align: center;
">
                    ${option}
                </button >
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

    selectAnswer: function (lesion) {
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

    submitAnswer: function () {
        if (!this.selectedAnswer) return;

        const correct = this.selectedAnswer === this.currentCase.correctLesion;
        this.score.total++;
        if (correct) this.score.correct++;

        // Show feedback
        const feedbackDiv = document.getElementById('challenge-feedback');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'block';
            feedbackDiv.innerHTML = `
    < div style = "background: ${correct ? '#f0fdf4' : '#fef2f2'};
border: 2px solid ${correct ? '#10b981' : '#dc2626'};
border - radius: 10px;
padding: 20px;
margin - top: 20px; ">
    < h4 style = "color: ${correct ? '#10b981' : '#dc2626'}; margin-bottom: 10px;" >
        ${correct ? '✅ Correct!' : '❌ Incorrect'}
                    </h4 >
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
                </div >
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

    nextCase: function () {
        this.generateCase();
    },

    backToSettings: function () {
        this.isActive = false;

        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');

        if (settingsPanel) settingsPanel.style.display = 'block';
        if (activePanel) activePanel.style.display = 'none';
    }
};

// EMG Challenge Modal Function
window.showEMGChallenge = function () {
    console.log('🧪 Launching EMG Localization Challenge...');

    const emgChallengeContent = `
    < style >
    @keyframes pulse - glow {
    0 %, 100 % { box- shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
50 % { box- shadow: 0 0 40px rgba(139, 92, 246, 0.6);
}
            }

            /* Toggle card inactive state - HIGHLY VISIBLE */
            .toggle - option: not(.active) {
    opacity: 0.35;
    filter: grayscale(0.8);
    transform: scale(0.96);
    border: 2px solid rgba(239, 68, 68, 0.3)!important;
    background: rgba(254, 226, 226, 0.3)!important;
}

            .toggle - option: not(.active)::after {
    content: '✕ DISABLED';
    position: absolute;
    top: 10px;
    right: 15px;
    color: #ef4444;
    font - size: 0.75rem;
    font - weight: 700;
    opacity: 0.7;
}

            .toggle - option: not(.active).status - indicator {
    background: #ef4444!important;
    box - shadow: 0 0 10px rgba(239, 68, 68, 0.3)!important;
}

            .toggle - option.active {
    position: relative;
}

            .toggle - option.active::after {
    content: '✓ ENABLED';
    position: absolute;
    top: 10px;
    right: 15px;
    color: #10b981;
    font - size: 0.75rem;
    font - weight: 700;
}

            .toggle - option.active.status - indicator {
    animation: pulse - indicator 2s ease -in -out infinite;
}

@keyframes pulse - indicator {
    0 %, 100 % { transform: scale(1); opacity: 1; }
    50 % { transform: scale(1.2); opacity: 0.8; }
}
        </style >

        < !--Challenge Settings-- >
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

        <!--Active Challenge-- >
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

// Muscle Localization System - Simple Implementation for Region Switching
window.MuscleLocalization = {
    currentRegion: 'upper',

    switchRegion: function (region) {
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
        alert(`📍 Switched to ${region} extremity muscle localization.Advanced muscle database with complete innervation patterns and clinical correlations available.`);
    }
};

// Study Cards Function - Links to Advanced Muscle Tools
window.showStudyCards = function () {
    console.log('🧬 Launching Advanced Muscle Study Lab...');
    console.log('✨ UI FACELIFT VERSION LOADED - v20251001093045');

    const muscleLabContent = `
    < style >
    /* Advanced Muscle Lab Styling */
    @keyframes gradient - shift {
    0 % { background- position: 0 % 50 %;
}
50 % { background- position: 100 % 50 %; }
100 % { background- position: 0 % 50 %; }
            }

            .muscle - lab - hero {
    background: linear - gradient(135deg, #14b8a6, #06b6d4, #8b5cf6, #14b8a6);
    background - size: 300 % 300 %;
    animation: gradient - shift 15s ease infinite;
    border - radius: 25px;
    padding: 40px;
    margin: 20px 0;
    backdrop - filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    text - align: center;
    box - shadow: 0 20px 60px rgba(20, 184, 166, 0.3);
    position: relative;
    overflow: hidden;
}

            .muscle - lab - hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05);
    z - index: 1;
}

            .muscle - lab - hero.hero - content {
    position: relative;
    z - index: 2;
}
            .hero - title {
    font - size: 2.5rem;
    color: white;
    margin - bottom: 15px;
    font - weight: 700;
    text - shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
            .hero - subtitle {
    font - size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin - bottom: 25px;
    text - shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
            .hero - stats {
    display: flex;
    justify - content: center;
    gap: 30px;
    flex - wrap: wrap;
}
@keyframes float {
    0 %, 100 % { transform: translateY(0px); }
    50 % { transform: translateY(-10px); }
}

            .stat - card {
    background: rgba(255, 255, 255, 0.2);
    backdrop - filter: blur(10px);
    border - radius: 15px;
    padding: 20px 30px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    min - width: 120px;
    box - shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    animation: float 3s ease -in -out infinite;
}

            .stat - card: nth - child(1) { animation - delay: 0s; }
            .stat - card: nth - child(2) { animation - delay: 0.2s; }
            .stat - card: nth - child(3) { animation - delay: 0.4s; }

            .stat - card:hover {
    transform: translateY(-15px) scale(1.05);
    box - shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.3);
}
            .stat - number {
    font - size: 2rem;
    font - weight: 700;
    color: white;
    margin - bottom: 5px;
    text - shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
            .stat - label {
    font - size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    text - transform: uppercase;
    letter - spacing: 0.5px;
    text - shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

            .study - controls - bar {
    display: flex;
    gap: 40px;
    background: rgba(255, 255, 255, 0.95);
    backdrop - filter: blur(10px);
    border: 1px solid rgba(107, 159, 120, 0.2);
    border - radius: 15px;
    padding: 20px;
    margin - bottom: 30px;
    flex - wrap: wrap;
}
            .control - section h4 {
    color: #2c3e50;
    font - size: 14px;
    font - weight: 700;
    margin - bottom: 12px;
    text - transform: uppercase;
    letter - spacing: 0.5px;
}
            .region - selector, .anatomy - selector {
    display: flex;
    gap: 10px;
}
            .region - btn, .anatomy - btn {
    padding: 16px 35px;
    border: 2px solid rgba(20, 184, 166, 0.3);
    border - radius: 50px;
    background: rgba(255, 255, 255, 0.9);
    color: #0d9488;
    font - weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font - size: 1.1rem;
    box - shadow: 0 4px 15px rgba(20, 184, 166, 0.15);
}
            .region - btn: hover, .anatomy - btn:hover {
    background: rgba(20, 184, 166, 0.1);
    color: #0d9488;
    transform: translateY(-3px) scale(1.02);
    box - shadow: 0 6px 20px rgba(20, 184, 166, 0.25);
    border - color: rgba(20, 184, 166, 0.5);
}
            .region - btn.active, .anatomy - btn.active {
    background: linear - gradient(135deg, #14b8a6, #06b6d4);
    color: white;
    font - weight: 700;
    box - shadow: 0 6px 25px rgba(20, 184, 166, 0.5);
    border - color: transparent;
}

            .quiz - section {
    background: rgba(255, 255, 255, 0.95);
    backdrop - filter: blur(10px);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border - radius: 15px;
    padding: 20px;
    margin - bottom: 30px;
}
            .quiz - header h3 {
    color: #2c3e50;
    margin - bottom: 5px;
}
            .quiz - header p {
    color: #6b7280;
    margin - bottom: 20px;
}
            .quiz - controls {
    display: flex;
    justify - content: space - between;
    align - items: center;
    margin - bottom: 20px;
    flex - wrap: wrap;
    gap: 20px;
}
            .quiz - mode - toggle {
    display: flex;
    align - items: center;
    gap: 10px;
}
            .quiz - mode - toggle label {
    font - weight: 600;
    color: #374151;
}
            .mode - toggle - btn {
    padding: 8px 16px;
    border: 2px solid #e5e7eb;
    border - radius: 8px;
    background: white;
    color: #6b7280;
    font - weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}
            .mode - toggle - btn:hover {
    border - color: #8b5cf6;
    background: rgba(139, 92, 246, 0.05);
    color: #8b5cf6;
}
            .mode - toggle - btn.active {
    border - color: #8b5cf6;
    background: #8b5cf6;
    color: white;
}
            .quiz - action - btns {
    display: flex;
    gap: 15px;
}
@keyframes pulse {
    0 %, 100 % { transform: scale(1); }
    50 % { transform: scale(1.05); }
}

            .quiz - start - btn, .quiz - stop - btn {
    padding: 14px 28px;
    border: none;
    border - radius: 12px;
    font - weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font - size: 1.05rem;
}
            .quiz - start - btn {
    background: linear - gradient(135deg, #10b981, #059669);
    color: white;
    box - shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    animation: pulse 2s ease -in -out infinite;
}
            .quiz - start - btn:hover {
    background: linear - gradient(135deg, #059669, #047857);
    transform: translateY(-3px);
    box - shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    animation: none;
}
            .quiz - stop - btn {
    background: linear - gradient(135deg, #f97316, #ec4899);
    color: white;
    box - shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}
            .quiz - stop - btn:hover {
    background: linear - gradient(135deg, #ea580c, #db2777);
    transform: translateY(-2px);
    box - shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}
            .inline - quiz - area {
    border - top: 1px solid #e5e7eb;
    padding - top: 20px;
}

            .muscle - anatomy - display - enhanced {
    background: rgba(254, 252, 243, 0.95);
    backdrop - filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border - radius: 20px;
    padding: 25px;
    margin: 20px 0;
    box - shadow: 0 15px 35px rgba(107, 159, 120, 0.2);
    min - height: 400px;
}

            .muscle - region h3 {
    color: #2c3e50;
    font - size: 1.5rem;
    margin - bottom: 20px;
    text - align: center;
}

            .muscle - grid {
    display: grid;
    grid - template - columns: repeat(auto - fill, minmax(300px, 1fr));
    gap: 20px;
}

            .muscle - card - interactive {
    background: white;
    border: 2px solid rgba(20, 184, 166, 0.15);
    border - radius: 12px;
    padding: 20px;
    transition: all 0.3s ease;
    box - shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

            .muscle - card - interactive:hover {
    border - color: #14b8a6;
    box - shadow: 0 8px 25px rgba(20, 184, 166, 0.25);
    transform: translateY(-4px);
}

            .muscle - card - interactive.expanded {
    border - color: #14b8a6;
    box - shadow: 0 12px 35px rgba(20, 184, 166, 0.3);
    transform: scale(1.02);
    background: linear - gradient(135deg, rgba(20, 184, 166, 0.02), rgba(6, 182, 212, 0.02));
}

            .muscle - header {
    margin - bottom: 15px;
}

            .muscle - name {
    background: linear - gradient(135deg, #0d9488, #06b6d4);
    -webkit - background - clip: text;
    -webkit - text - fill - color: transparent;
    background - clip: text;
    font - size: 1.1rem;
    font - weight: 600;
    margin: 0;
}

            .muscle - controls {
    display: flex;
    flex - wrap: wrap;
    gap: 8px;
    margin - bottom: 15px;
}

            .muscle - btn {
    padding: 6px 12px;
    border: 1px solid rgba(20, 184, 166, 0.3);
    border - radius: 8px;
    background: rgba(20, 184, 166, 0.05);
    color: #0d9488;
    font - size: 0.8rem;
    font - weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

            .muscle - btn:hover {
    border - color: #14b8a6;
    background: rgba(20, 184, 166, 0.15);
    color: #0d9488;
    transform: translateY(-1px);
    box - shadow: 0 2px 8px rgba(20, 184, 166, 0.2);
}

            .muscle - btn.active {
    border - color: #14b8a6;
    background: linear - gradient(135deg, #14b8a6, #06b6d4);
    color: white;
    box - shadow: 0 3px 10px rgba(20, 184, 166, 0.3);
}

            .muscle - btn.show - all {
    background: linear - gradient(135deg, #fbbf24, #f59e0b);
    border: none;
    color: white;
    box - shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
    transition: all 0.3s ease;
}

            .muscle - btn.show - all:hover {
    background: linear - gradient(135deg, #f59e0b, #d97706);
    transform: translateY(-2px);
    box - shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
}

            .muscle - detail {
    margin - top: 10px;
    padding: 12px;
    border - radius: 8px;
    border - left: 4px solid #14b8a6;
    background: linear - gradient(135deg, rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.05));
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(-10px);
    box - shadow: 0 2px 8px rgba(20, 184, 166, 0.1);
}

            .muscle - detail[style *= "display: block"] {
    opacity: 1;
    transform: translateY(0);
}

            .detail - header {
    margin - bottom: 8px;
}

            .detail - label {
    font - weight: 600;
    color: #374151;
    font - size: 0.9rem;
}

            .detail - content {
    color: #1f2937;
    font - size: 0.9rem;
    line - height: 1.4;
}

            .muscle - test - modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
    background: rgba(0, 0, 0, 0.8);
    backdrop - filter: blur(5px);
    display: none;
    justify - content: center;
    align - items: center;
    z - index: 10001;
}

            .muscle - test - content {
    background: white;
    border - radius: 20px;
    padding: 30px;
    max - width: 800px;
    width: 90 %;
    max - height: 90 %;
    overflow - y: auto;
    box - shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

            .muscle - test - header {
    display: flex;
    justify - content: space - between;
    align - items: center;
    margin - bottom: 25px;
    padding - bottom: 15px;
    border - bottom: 2px solid #e5e7eb;
}

            .test - title h3 {
    color: #1e40af;
    margin: 0;
}

            .test - stats {
    display: flex;
    gap: 20px;
    margin - top: 10px;
}

            .test - stats span {
    background: #f3f4f6;
    padding: 4px 8px;
    border - radius: 4px;
    font - size: 0.9rem;
    color: #374151;
}

            .close - test - btn {
    background: linear - gradient(135deg, #f97316, #ec4899);
    color: white;
    border: none;
    padding: 8px 16px;
    border - radius: 6px;
    cursor: pointer;
    font - weight: 600;
    transition: all 0.3s ease;
    box - shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

            .close - test - btn:hover {
    transform: scale(1.05);
    box - shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
}

            .quiz - question {
    background: linear - gradient(135deg, rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.05));
    border: 2px solid rgba(139, 92, 246, 0.2);
    border - radius: 20px;
    padding: 30px;
    box - shadow: 0 6px 25px rgba(139, 92, 246, 0.15);
}

            .quiz - question h4 {
    background: linear - gradient(135deg, #8b5cf6, #6366f1);
    -webkit - background - clip: text;
    -webkit - text - fill - color: transparent;
    background - clip: text;
    margin - bottom: 25px;
    font - size: 1.5rem;
    font - weight: 700;
}

            .quiz - answer - input {
    display: flex;
    gap: 12px;
    margin - bottom: 25px;
}

            .quiz - answer - input input {
    flex: 1;
    padding: 14px 20px;
    border: 2px solid rgba(139, 92, 246, 0.3);
    border - radius: 50px;
    font - size: 1.1rem;
    transition: all 0.3s ease;
    box - shadow: 0 3px 10px rgba(139, 92, 246, 0.1);
}

            .quiz - answer - input input:focus {
    outline: none;
    border - color: rgba(139, 92, 246, 0.6);
    box - shadow: 0 5px 20px rgba(139, 92, 246, 0.2);
}

            .check - answer - btn {
    background: linear - gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    padding: 14px 35px;
    border - radius: 50px;
    cursor: pointer;
    font - weight: 700;
    font - size: 1.1rem;
    transition: all 0.3s ease;
    box - shadow: 0 5px 20px rgba(16, 185, 129, 0.4);
    text - transform: uppercase;
    letter - spacing: 0.5px;
}

            .check - answer - btn:hover {
    background: linear - gradient(135deg, #059669, #047857);
    transform: translateY(-2px) scale(1.03);
    box - shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
}

            .check - answer - btn:disabled {
    opacity: 0.5;
    cursor: not - allowed;
    transform: none;
}

            .quiz - options {
    display: grid;
    gap: 15px;
    margin - bottom: 25px;
}

            .quiz - option {
    display: flex;
    align - items: center;
    gap: 12px;
    padding: 18px 25px;
    border: 2px solid rgba(139, 92, 246, 0.3);
    border - radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    font - weight: 600;
    font - size: 1.05rem;
    box - shadow: 0 3px 12px rgba(139, 92, 246, 0.1);
}

            .quiz - option:hover {
    border - color: rgba(139, 92, 246, 0.6);
    background: rgba(139, 92, 246, 0.05);
    transform: translateX(5px);
    box - shadow: 0 5px 20px rgba(139, 92, 246, 0.2);
}

            .quiz - option.selected {
    border - color: transparent;
    background: linear - gradient(135deg, #8b5cf6, #6366f1);
    color: white;
    transform: translateX(8px);
    box - shadow: 0 6px 25px rgba(139, 92, 246, 0.4);
}

            .quiz - option input[type = "radio"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

            .quiz - feedback {
    margin - top: 20px;
    padding: 15px;
    border - radius: 8px;
}

            .feedback - result.correct {
    background: #dcfce7;
    border: 1px solid #16a34a;
    color: #15803d;
}

            .feedback - result.incorrect {
    background: #fef2f2;
    border: 1px solid #dc2626;
    color: #dc2626;
}

            .next - question - btn {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border - radius: 6px;
    cursor: pointer;
    margin - top: 10px;
}

            /* Global Reveal Controls */
            .global - reveal - controls {
    background: linear - gradient(135deg, rgba(139, 92, 246, 0.03), rgba(99, 102, 241, 0.03));
    border - radius: 20px;
    padding: 25px;
    margin - bottom: 30px;
    border: 2px solid rgba(139, 92, 246, 0.2);
    box - shadow: 0 4px 20px rgba(139, 92, 246, 0.1);
}

            .global - reveal - buttons {
    display: flex;
    gap: 12px;
    flex - wrap: wrap;
    justify - content: center;
}

            .global - reveal - btn {
    padding: 14px 24px;
    border: none;
    border - radius: 50px;
    background: linear - gradient(135deg, #8b5cf6, #6366f1);
    color: white;
    font - size: 1rem;
    font - weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box - shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    white - space: nowrap;
}

            .global - reveal - btn:hover {
    transform: translateY(-3px) scale(1.05);
    box - shadow: 0 6px 25px rgba(139, 92, 246, 0.5);
    background: linear - gradient(135deg, #7c3aed, #4f46e5);
}

            .global - reveal - btn.active {
    background: linear - gradient(135deg, #6366f1, #4f46e5);
    box - shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

            .global - reveal - btn.reveal - all {
    background: linear - gradient(135deg, #fbbf24, #f59e0b);
    box - shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
    font - size: 1.1rem;
    padding: 16px 30px;
}

            .global - reveal - btn.reveal - all:hover {
    transform: translateY(-3px) scale(1.05);
    box - shadow: 0 6px 25px rgba(251, 191, 36, 0.5);
    background: linear - gradient(135deg, #f59e0b, #d97706);
}

            .global - reveal - btn.reveal - all.active {
    background: linear - gradient(135deg, #f59e0b, #d97706);
}

            /* Tab Navigation Styles */
            .muscle - lab - tabs {
    display: flex;
    gap: 10px;
    margin - bottom: 30px;
    background: rgba(255, 255, 255, 0.1);
    backdrop - filter: blur(10px);
    border - radius: 15px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box - shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

            .muscle - tab {
    padding: 15px 30px;
    background: transparent;
    border: none;
    border - radius: 10px;
    color: #6b7280;
    font - size: 1.1rem;
    font - weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

            .muscle - tab:hover {
    color: #14b8a6;
    background: rgba(20, 184, 166, 0.1);
    transform: translateY(-2px);
}

            .muscle - tab.active {
    color: white;
    background: linear - gradient(135deg, #14b8a6, #06b6d4);
    box - shadow: 0 4px 15px rgba(20, 184, 166, 0.4);
}

            /* Tab Content */
            .tab - content {
    display: none;
}

            .tab - content.active {
    display: block;
}

            /* Cards Section Styles */
            .cards - controls - section {
    background: linear - gradient(135deg, rgba(20, 184, 166, 0.03), rgba(6, 182, 212, 0.03));
    border - radius: 20px;
    padding: 30px;
    margin - bottom: 30px;
    border: 2px solid rgba(20, 184, 166, 0.2);
    box - shadow: 0 4px 20px rgba(20, 184, 166, 0.1);
}

            .cards - controls - section h4 {
    background: linear - gradient(135deg, #0d9488, #06b6d4);
    -webkit - background - clip: text;
    -webkit - text - fill - color: transparent;
    background - clip: text;
    font - size: 1.3rem;
    margin - bottom: 20px;
    font - weight: 700;
    text - transform: uppercase;
    letter - spacing: 1px;
}

            .extremity - toggle - buttons {
    display: flex;
    gap: 20px;
    flex - wrap: wrap;
}

            /* Quiz Config Panel Styles */
            .quiz - config - panel {
    background: linear - gradient(135deg, rgba(139, 92, 246, 0.03), rgba(99, 102, 241, 0.03));
    border - radius: 25px;
    padding: 40px;
    margin - bottom: 30px;
    border: 3px solid rgba(139, 92, 246, 0.2);
    box - shadow: 0 8px 30px rgba(139, 92, 246, 0.15);
}

            .quiz - section - block {
    margin - bottom: 30px;
    padding - bottom: 30px;
    border - bottom: 2px solid rgba(139, 92, 246, 0.1);
}

            .quiz - section - block: last - of - type {
    border - bottom: none;
    margin - bottom: 0;
    padding - bottom: 0;
}

            .quiz - section - block h4 {
    background: linear - gradient(135deg, #8b5cf6, #6366f1);
    -webkit - background - clip: text;
    -webkit - text - fill - color: transparent;
    background - clip: text;
    font - size: 1.3rem;
    margin - bottom: 20px;
    font - weight: 700;
}

            /* Quiz Content Checkboxes */
            .quiz - content - checkboxes {
    display: flex;
    gap: 12px;
    flex - wrap: wrap;
    margin - bottom: 20px;
}

            .checkbox - label {
    display: flex;
    align - items: center;
    gap: 10px;
    cursor: pointer;
    padding: 14px 22px;
    background: white;
    border: 2px solid rgba(20, 184, 166, 0.3);
    border - radius: 50px;
    transition: all 0.3s ease;
    font - weight: 600;
    color: #64748b;
    box - shadow: 0 3px 10px rgba(20, 184, 166, 0.1);
}

            .checkbox - label:hover {
    border - color: rgba(20, 184, 166, 0.6);
    background: rgba(20, 184, 166, 0.05);
    transform: translateY(-2px);
    box - shadow: 0 5px 15px rgba(20, 184, 166, 0.2);
}

            .checkbox - label input[type = "checkbox"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
}

            .checkbox - label: has(input: checked) {
    background: linear - gradient(135deg, #14b8a6, #06b6d4);
    border - color: transparent;
    color: white;
    box - shadow: 0 5px 20px rgba(20, 184, 166, 0.4);
}

            /* Quiz Extremity Radios */
            .quiz - extremity - radios {
    display: flex;
    gap: 12px;
    flex - wrap: wrap;
}

            .radio - label {
    display: flex;
    align - items: center;
    gap: 10px;
    cursor: pointer;
    padding: 14px 22px;
    background: white;
    border: 2px solid rgba(251, 191, 36, 0.3);
    border - radius: 50px;
    transition: all 0.3s ease;
    font - weight: 600;
    color: #64748b;
    box - shadow: 0 3px 10px rgba(251, 191, 36, 0.1);
}

            .radio - label:hover {
    border - color: rgba(251, 191, 36, 0.6);
    background: rgba(251, 191, 36, 0.05);
    transform: translateY(-2px);
    box - shadow: 0 5px 15px rgba(251, 191, 36, 0.2);
}

            .radio - label input[type = "radio"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
}

            .radio - label: has(input: checked) {
    background: linear - gradient(135deg, #fbbf24, #f59e0b);
    border - color: transparent;
    color: white;
    box - shadow: 0 5px 20px rgba(251, 191, 36, 0.4);
}

            /* Test All Toggle Button */
            .test - all - toggle - btn {
    background: linear - gradient(135deg, #14b8a6, #06b6d4);
    color: white;
    border: none;
    padding: 12px 28px;
    border - radius: 50px;
    font - weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box - shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
    font - size: 1rem;
}

            .test - all - toggle - btn:hover {
    background: linear - gradient(135deg, #0d9488, #0891b2);
    transform: translateY(-2px) scale(1.03);
    box - shadow: 0 6px 20px rgba(20, 184, 166, 0.4);
}

            /* Quiz Mode Buttons */
            .quiz - mode - buttons {
    display: flex;
    gap: 12px;
    flex - wrap: wrap;
}

            .mode - toggle - btn {
    padding: 14px 28px;
    border: 2px solid rgba(139, 92, 246, 0.3);
    border - radius: 50px;
    background: white;
    color: #8b5cf6;
    font - weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font - size: 1rem;
    box - shadow: 0 3px 10px rgba(139, 92, 246, 0.1);
}

            .mode - toggle - btn:hover {
    border - color: rgba(139, 92, 246, 0.6);
    background: rgba(139, 92, 246, 0.05);
    transform: translateY(-2px);
    box - shadow: 0 5px 15px rgba(139, 92, 246, 0.2);
}

            .mode - toggle - btn.active {
    background: linear - gradient(135deg, #8b5cf6, #6366f1);
    border - color: transparent;
    color: white;
    box - shadow: 0 5px 20px rgba(139, 92, 246, 0.4);
    font - weight: 700;
}

            /* Quiz Action Section */
            .quiz - action - section {
    display: flex;
    gap: 15px;
    justify - content: center;
    margin - top: 20px;
}

            .quiz - action - section.quiz - start - btn {
    font - size: 1.3rem;
    padding: 18px 45px;
    border - radius: 50px;
    font - weight: 700;
    text - transform: uppercase;
    letter - spacing: 1px;
    box - shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
}

            .quiz - action - section.quiz - start - btn:hover {
    transform: translateY(-2px) scale(1.05);
    box - shadow: 0 8px 30px rgba(16, 185, 129, 0.5);
}

            .quiz - action - section.quiz - stop - btn {
    font - size: 1.2rem;
    padding: 16px 40px;
    border - radius: 50px;
    font - weight: 700;
    box - shadow: 0 6px 25px rgba(249, 115, 22, 0.4);
}

            .quiz - action - section.quiz - stop - btn:hover {
    transform: translateY(-2px) scale(1.05);
    box - shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
}
        </style >

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

        <!--Tab Navigation-- >
        <div class="muscle-lab-tabs">
            <button class="muscle-tab active" data-tab="cards" onclick="MuscleAnatomy.switchTab('cards')">
                📚 Study Cards
            </button>
            <button class="muscle-tab" data-tab="quiz" onclick="MuscleAnatomy.switchTab('quiz')">
                🧪 Interactive Quiz
            </button>
        </div>

        <!--CARDS TAB CONTENT-- >
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

        <!--QUIZ TAB CONTENT-- >
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


        <!--Muscle Test Modal-- >
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

// Complete MuscleAnatomy Object - Preston & Shapiro Database
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
        const activeTab = document.querySelector(`[data - tab= "${tab}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Show/hide tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });
        const activeContent = document.getElementById(`${tab} -tab - content`);
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
        document.querySelector(`[data - region="${region}"]`).classList.add('active');
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
    < div class="muscle-region" >
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
            </div >
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
            const detail = card.querySelector(`.muscle - detail[data - type="${type}"]`);
            const button = card.querySelector(`.muscle - btn.${type} `);

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
        document.querySelector(`[data - anatomy= "${type}"]`).classList.add('active');

        this.displayMuscles(this.currentRegion);
    },

    setQuizMode(mode) {
        this.quizMode = mode;

        document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data - mode= "${mode}"]`).classList.add('active');
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
    < div class="quiz-question" >
                    <h4>What is the ${this.getAnatomyLabel()} of ${muscle}?</h4>
                    <div class="quiz-answer-input">
                        <input type="text" id="quiz-answer" placeholder="Enter your answer..." />
                        <button onclick="MuscleAnatomy.checkInlineAnswer()" class="check-answer-btn">Check Answer</button>
                    </div>
                    <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
                </div >
    `;

            setTimeout(() => {
                document.getElementById('quiz-answer').focus();
            }, 100);

        } else {
            const correctAnswer = this.getCorrectAnswer(muscle);
            const options = this.generateQuizOptions(muscle, correctAnswer);

            quizArea.innerHTML = `
    < div class="quiz-question" >
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
                </div >
    `;
        }

        // Restore previous anatomy type (for card display)
        this.currentAnatomyType = previousAnatomyType;
    },

    getCorrectAnswer(muscle) {
        const muscleData = this.muscleDatabase[muscle];
        switch (this.currentAnatomyType) {
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
        switch (this.currentAnatomyType) {
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
    < div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}" >
                <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                <p><strong>Correct answer:</strong> ${correctAnswer}</p>
                <button onclick="MuscleAnatomy.generateInlineQuestion()" class="next-question-btn">Next Question</button>
            </div >
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
    < div class="quiz-option" onclick = "MuscleAnatomy.submitTestAnswer('${option}', '${correctAnswer}', '${muscle}')" >
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
    < div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}" >
                <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                <p><strong>Correct answer:</strong> ${correctAnswer}</p>
            </div >
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

        if (questionsElem) questionsElem.textContent = `Questions: ${this.testData.questionsAnswered} `;

        if (accuracyElem) {
            const accuracy = this.testData.questionsAnswered > 0 ?
                Math.round((this.testData.correctAnswers / this.testData.questionsAnswered) * 100) : 0;
            accuracyElem.textContent = `Accuracy: ${accuracy}% `;
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
        const typeBtn = document.querySelector(`[onclick = "MuscleAnatomy.globalRevealType('${type}')"]`);

        if (allCards.length === 0) return;

        // Check if this type is currently visible on any card
        const anyTypeVisible = Array.from(allCards).some(card =>
            card.querySelector(`.muscle - detail[data - type="${type}"][style *= "display: block"]`)
        );

        // Toggle this specific type across all cards
        allCards.forEach(card => {
            const detail = card.querySelector(`.muscle - detail[data - type="${type}"]`);
            const button = card.querySelector(`.muscle - btn.${type} `);

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

        console.log(`🔍 Global reveal ${type}: `, !anyTypeVisible ? 'shown' : 'hidden');
    }
};



// Function to start a clinical case with 5-stage system
function startClinicalCase(caseId) {
    // Close the current modal
    const currentModal = document.querySelector('.learning-modal-overlay.active');
    if (currentModal) {
        currentModal.classList.remove('active');
        setTimeout(() => {
            currentModal.remove();
        }, 300);
    }

    // Show the general modal with clinical case interface
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-body');

    if (!modalOverlay || !modalTitle || !modalContent) {
        console.error('Modal elements not found');
        return;
    }

    modalTitle.textContent = 'Clinical Case Evaluation';

    // Get case data - use existing case database
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    if (!caseData) {
        console.error('❌ Case Data Error - Case not found:', caseId, 'Available cases:', window.caseDatabase ? Object.keys(window.caseDatabase) : 'No caseDatabase');
        return;
    }

    // Generate the 5-stage interface
    modalContent.innerHTML = generateCaseInterface(caseData, caseId);

    // Ensure any clinical cases selection UI is hidden when running a case
    const difficultySelector = document.querySelector('.difficulty-selector');
    if (difficultySelector) {
        difficultySelector.style.display = 'none';
    }

    // Show the modal
    modalOverlay.style.display = 'flex';

    // Scroll to top
    modalContent.scrollTop = 0;
}

window.startCase = startCase;
window.checkDifferential = checkDifferential;
window.checkDiagnosis = checkDiagnosis;
window.showExplanation = showExplanation;
window.hideCaseInterface = hideCaseInterface;
window.startBeginnerCases = startBeginnerCases;
window.startIntermediateCases = startIntermediateCases;
window.startExpertCases = startExpertCases;
window.updateCaseDisplay = updateCaseDisplay;
window.startClinicalCase = startClinicalCase;
window.toggleAnatomyInfo = toggleAnatomyInfo;
window.generateLearningContentByType = generateLearningContentByType;

// ============================================================================
// EMG NEEDLE LOCALIZATION GUIDE SYSTEM
// Complete implementation with muscle database and interactive UI
// ============================================================================

// EMG Needle Localization Database - From PDF Analysis
window.EMGLocalizationDatabase = {
    upperExtremity: {
        "APB": {
            fullName: "Abductor Pollicis Brevis",
            innervation: "Median Nerve, Medial Cord, Anterior Division, Lower Trunk, C8, T1",
            origin: "From the palmer retinaculum, the tubercle of the scaphoid and that of the trapezium",
            insertion: "Lateral side of the base of the proximal phalanx of the thumb",
            position: "Hand in full supination",
            electrodeInsertion: "Midpoint of a line drawn between the volar aspect of the first metacarpophalangeal joint (MP-1) and the carpometacarpal joint (C-MC). Insert to depth of one-fourth to one-half inch",
            testManeuver: "Palmar abduction of the thumb",
            pitfalls: "If the electrode is inserted too deeply it will be in the opponens pollicis",
            comments: "(a) Frequently used as recording muscle for median nerve motor conduction study. (b) May be involved in all median nerve entrapment syndromes (carpal tunnel; pronator teres, ligament of Struthers) except anterior interosseus syndrome. (c) Involved in Klumpke's palsy (avulsion of C8, T1 roots). (d) This is the most superficially located muscle in the thenar eminence. (e) Its function is to palmarly abduct the thumb to about 90-degree angle. (f) In comparative anatomy we found that this muscle is not present in the monkey's hand which cannot make terminal pinch with the other fingers. The monkey hand has 5 fingers, while the human hand has 4 fingers and 1 thumb."
        },
        "Bicep": {
            fullName: "Biceps Brachii",
            innervation: "Musculocutaneous Nerve, Lateral Cord, Anterior Division, Upper Trunk, C5, C6",
            origin: "Long Head: From the supraglenoid tuberosity of scapula. Short Head: From the apex of the coracoid process of the scapula",
            insertion: "On the bicipital tuberosity of the radius",
            position: "The patient supine with the arm extended",
            electrodeInsertion: "Into the bulk of the muscle in mid-arm",
            testManeuver: "To flex or to supinate the forearm",
            pitfalls: "If the needle electrode is inserted too deeply it will be in the brachialis",
            comments: "Frequently used as recording muscle for musculocutaneous nerve motor conduction study. This muscle gets involved in entrapment of the musculocutaneous nerve as it courses through the coracobrachialis muscle. It also gets involved in upper brachial plexus lesions and in high cervical radiculopathies. Excessive traction of the baby head during delivery may produce an elongation of the upper brachial plexus resulting in paralysis of this muscle (obstetrical paralysis or Bell's palsy). The biceps shows a dual function: as a strong supinator of the forearm and a powerful elbow flexor. These two functions can be carried out separately."
        },
        "EIP": {
            fullName: "Extensor Indicis Proprius",
            innervation: "Posterior Interosseus Nerve, Radial Nerve, Posterior Cord, Posterior Division, Middle and Lower Trunk, C7, C8",
            origin: "Dorsal surface of lower half of ulnar shaft below the origin of the extensor pollicis longus",
            insertion: "Joins ulnar side of tendon of extensor digitorum communis, which goes to index finger; terminates in extensor expansion",
            position: "The forearm fully prorated",
            electrodeInsertion: "Two fingerbreadths proximal to ulnar styloid (UL. ST.) just radial to ulnar at a depth of one-half inch",
            testManeuver: "Extend finger with flexion of other fingers",
            pitfalls: "If needle electrode is inserted too radially it will be in the abductor pollicis longus; if inserted too proximally it will be in the extensor digitorum communis",
            comments: "Usually it is the most distal radial nerve innervated muscle (at times the extensor pollicis longus occupies this position). Tendon occupies the fourth compartment on dorsum of wrist with extensor digitorum communis. Used as recording muscle in radial nerve motor conduction studies. Involved in posterior interosseus and more proximal radial nerve injuries ('Saturday night' palsy and crutch palsy). This muscle acting in conjunction with the extensor digitorum, extends the index finger at the M.P. joint and at the proximal interphalangeal joint. It can work in an isolated fashion, as when the hand is kept in a fist and the index finger is pointing."
        },
        "FDI": {
            fullName: "First Dorsal Interosseus",
            innervation: "Ulnar Nerve, Medial Cord, Anterior Division, Lower Trunk, C8, T1",
            origin: "Lateral border of the third metacarpal",
            insertion: "Medial side of the base of the proximal phalanx",
            position: "Hand in full pronation, thumb in radial abduction",
            electrodeInsertion: "At the free edge of the first web space. The needle is directed toward the proximal end of the first metacarpal bone",
            testManeuver: "Adduct the thumb",
            pitfalls: "If the electrode is inserted too dorsally it will be in the first dorsal interosseus; if too volarly it will be in the opponens pollicis",
            comments: "The most distal muscle innervated by the ulnar nerve. Paresis or paralysis of this muscle results in Froment's sign (substitution of flexor pollicis longus on attempted adduction of thumb). May be involved in ulnar entrapment syndromes (Guyon's Tunnel; cubital tunnel; tardy ulnar palsy; cervical rib) and Klumpke's palsy (avulsion of C8, T1 nerve roots). This muscle is a powerful adductor of the thumb and greatly contributes in the strength of the grasp."
        },
        "Middle Deltoid": {
            fullName: "Deltoid, Middle",
            innervation: "Axillary Nerve, Posterior Cord, Posterior Division, Upper Trunk, C5, C6",
            origin: "Acromion",
            insertion: "Deltoid tubercle of the humerus",
            position: "Patient supine with arm at side",
            electrodeInsertion: "Halfway between the tip of the acromion (A) and the deltoid tubercle (DT)",
            testManeuver: "Abduction of arm",
            pitfalls: "None",
            comments: "Generally used as recording muscle in axillary nerve motor conduction study. If patient has a history of multiple injections into this muscle electromyographic findings may be misleading. Involved in axillary nerve injuries secondary to fractures, or joint dislocations and in upper brachial plexus injury (traction) during delivery. The function of this part of the deltoid is of a powerful abductor of the arm but in order to do this it needs the assistance of the supraspinatus muscle in order to prevent the head of the humerus for raising and hitting the acromium. Therefore, the specific function of the supraspinatus muscle is to fix the head of the humerus against the glenoid cavity of the scapula. This portion is also very active in controlling the gravitational descend of the arm, avoiding to drop abruptly against the body."
        },
        "PT": {
            fullName: "Pronator Teres",
            innervation: "Median Nerve, Lateral Cord, Anterior Division, Upper and Middle Trunk, C6, C7",
            origin: "This muscle has two heads of origins: (a) from the medial epicondyle of the humerus and (b) the coronoid process of the ulna. The median nerve enters the forearm between these two heads",
            insertion: "Lateral surface of radius at mid-shaft",
            position: "The forearm fully supinated",
            electrodeInsertion: "Two fingerbreadths distal to the midpoint of a line connecting the medial epicondyle (ME) and biceps tendon (BT)",
            testManeuver: "Pronation of forearm",
            pitfalls: "If the needle electrode is inserted too deeply it will be in the flexor digitorum sublimis; if inserted too ulnarly it will be in the flexor carpi radialis",
            comments: "The most proximal muscle innervated by the median nerve. Common site of entrapment as it is pierced by the median nerve. May or may not be involved in pronator teres syndrome depending on whether the nerve to the pronator muscle branches proximal to or within the muscle itself. Also involved in entrapment at the ligament of Struther. Of the two pronators, this is the most powerful. Its main function is to flex and prorate the forearm."
        },
        "Tricep": {
            fullName: "Triceps Brachii (Lateral Head)",
            innervation: "Radial Nerve, Posterior Cord, Posterior Division, Middle and Lower Trunk, C6, C7, C8",
            origin: "Posterior surface of humerus, above radial groove",
            insertion: "Olecranon process of ulna",
            position: "Forearm pronated, elbow flexed",
            electrodeInsertion: "With the patient’s forearm pronated and the elbow flexed, insert the needle just below the mid-point between the lateral epicondyle and shoulder",
            testManeuver: "Have the patient extend the elbow",
            pitfalls: "As long as this muscle is sampled from the lateral approach, there are no other nearby vascular structures or major nerves",
            comments: "The lateral head is the easiest of the three heads of the triceps to study. Often abnormal in C7 radiculopathy. Spared in radial neuropathy at the spiral groove."
        }
    },
    lowerExtremity: {
        "Extensor Hallucis": {
            fullName: "Extensor Hallucis Longus",
            innervation: "Deep Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1",
            origin: "From the midportion of the shaft of the fibula",
            insertion: "Into the distal phalanx of the great toe",
            position: "The patient supine",
            electrodeInsertion: "Three fingerbreadths above the bimalleolar line (MM-LM) of the ankle just lateral to the crest of the tibia and just lateral to the Tibialis Anterior tendon",
            testManeuver: "Patient to extend the big toe or to dorsi flex the foot",
            pitfalls: "If the electrode is inserted too superficially and too proximally it will be in the tibialis anterior; if inserted too laterally it will be in the Peroneus tertius",
            comments: "Involved in: 1. Anterior compartment syndrome 2. Lesion of the deep peroneal nerve 3. Common peroneal nerve 4. Sciatic nerve 5. Sacral plexus 6. L5, S1 root lesions"
        },
        "Medial Gastroc": {
            fullName: "Gastrocnemius: Medial Head",
            innervation: "Tibial Nerve, Sciatic Nerve, Ventral Division Sacral Plexus, S1, S2",
            origin: "From the medial femoral condyle",
            insertion: "Into the calcaneus, through the Achille's tendon",
            position: "The patient prone with feet over edge of bed",
            electrodeInsertion: "One handbreadth below the popliteal crease on the medial mass of the calf",
            testManeuver: "Patient to plantar flex the foot with the knee extended",
            pitfalls: "If the electrode is inserted too deeply it will be in the soleus",
            comments: "Involved in lesions of: 1. Tibial nerve 2. Sciatic nerve 3. Sacral plexus 4. L5, S1, S2 roots. The medial head is the larger and more prominent of the two gastrocnemius heads and is commonly used for EMG evaluation of the tibial nerve."
        },
        "Peroneus Longus": {
            fullName: "Peroneus Longus",
            innervation: "Superficial Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1, S2",
            origin: "From the fibular head and from the proximal two-thirds of the fibula",
            insertion: "Into the base of the first metatarsal and the first cuneiform",
            position: "The patient supine",
            electrodeInsertion: "Three fingerbreadths below the fibular head (FH) directed toward the lateral aspect of the fibula",
            testManeuver: "Patient to plantar flex and evert the foot",
            pitfalls: "If the electrode is inserted too posteriorly it will be in the soleus; if inserted too anteriorly it will be in the extensor digitorum longus",
            comments: "This muscle is involved in lesions of: 1. Superficial peroneal nerve 2. Common peroneal nerve 3. Sciatic nerve 4. Sacral plexus 5. L5, S1, roots. The main function of this muscle is to evert the foot. It also has a weak function in plantar-flexing the foot. It is a good support of the transverse arch of the foot."
        },
        "Tibialis Ant": {
            fullName: "Tibialis Anterior",
            innervation: "Deep Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1",
            origin: "From the midportion of the shaft of the fibula",
            insertion: "Into the distal phalanx of the great toe",
            position: "The patient supine",
            electrodeInsertion: "Upper 1/3 of the leg, one fingerbreadth lateral to the tibial crest",
            testManeuver: "Patient to extend the big toe or to dorsi flex the foot",
            pitfalls: "If the electrode is inserted too superficially and too proximally it will be in the tibialis anterior; if inserted too laterally it will be in the Peroneus tertius",
            comments: "Involved in: 1. Anterior compartment syndrome 2. Lesion of the deep peroneal nerve 3. Common peroneal nerve 4. Sciatic nerve 5. Sacral plexus 6. L5, S1 root lesions"
        },
        "Tibialis Post": {
            fullName: "Tibialis Posterior",
            innervation: "Tibial Nerve, Sciatic Nerve, Anterior Division Sacral Plexus, L5, S1",
            origin: "From the interosseus membrane, the posterior surface of the body of the tibia and the upper two-thirds of the medial surface of the fibula",
            insertion: "This muscle inserts on the tuberosity of the navicular bone and the medial cuneiform bone, and strong aponeurotic strips are sent across the foot to the bases of the second, third and fourth metatarsal bone",
            position: "The patient prone with feet over edge of bed, thigh internally rotated",
            electrodeInsertion: "One handbreadth distal to the tibial tuberosity (TT) and one fingerbreadth off the medial edge of the tibia. The electrode is directed obliquely through the soleus and flexor digitorum longus, staying posterior to the tibia. CAUTION: The neurovascular bundle (Posterior Tibial Artery/Nerve) lies nearby — do not direct the needle too laterally.",
            testManeuver: "Patient is to invert foot in plantar flexion",
            pitfalls: "If the electrode is inserted too superficially it will be in the soleus or flexor digitorum longus; if inserted too deeply it will be in the tibialis anterior",
            comments: "Involved in lesions of: 1. Tibial nerve 2. Sciatic nerve 3. Sacral plexus 4. L5, S1 root. The main function of this muscle is to plantar flex and invert the foot. This is the deepest muscle in the posterior compartment. This muscle is the strongest support of the longitudinal arch of the foot."
        },
        "Vastus Lateralis": {
            fullName: "Vastus Lateralis",
            innervation: "Femoral Nerve, Posterior Division Lumbar Plexus, L2, L3, L4",
            origin: "From the intertrochanteric line, the linea aspera and the medial supracondylar line",
            insertion: "Through the quadriceps tendon onto the tibial tubercle",
            position: "The patient supine",
            electrodeInsertion: "Over the lateral aspect of the thigh, one handbreadth above the patella",
            testManeuver: "Patient to lift heel from bed with knee extended",
            pitfalls: "If the electrode is inserted too posteriorly it will be in the biceps femoris; if inserted too medially it will be in the rectus femoris",
            comments: "Involved in lesions of: 1. Femoral nerve (entrapment) at the inguinal ligament level 2. Femoral nerve proximal to the inguinal ligament 3. Posterior division of the lumbar plexus 4. L2, L3, L4 roots. The main function of this muscle is to extend the knee. When this muscle gets paralyzed, the patient loses the force that keeps the knee in extension. Therefore, the patient develops the feeling that the knee will collapse when loaded during walking for which he tends to support it by placing one hand at the end of the thigh or by forcefully sending his knee into recurvatum which will produce the same effect."
        }
    }
};

// Image filename mapping for EMG needle localization muscle keys
function getMuscleImagePath(muscleKey) {
    const imageMap = {
        'APB': 'EMG IMAGES/Abductor Pollicus Brevis.png',
        'Bicep': 'EMG IMAGES/Biceps.png',
        'EIP': 'EMG IMAGES/Extensor Indicus.png',
        'FDI': 'EMG IMAGES/First Dorsal Interosseous.png',
        'Middle Deltoid': 'EMG IMAGES/Deltoid.png',
        'PT': 'EMG IMAGES/Pronator teres.png',
        'Tricep': 'EMG IMAGES/Triceps.png',
        'Extensor Hallucis': 'EMG IMAGES/Extensor Hallucis longus.png',
        'Medial Gastroc': 'EMG IMAGES/Medial Gastroc.png',
        'Peroneus Longus': 'EMG IMAGES/Fibularis longus.png',
        'Tibialis Ant': 'EMG IMAGES/Tibialis Anterior.png',
        'Tibialis Post': 'EMG IMAGES/Tibialis Posterior.png',
        'Vastus Lateralis': 'EMG IMAGES/Vastus Lateralis.png'
    };
    return imageMap[muscleKey] || null;
}

// EMG Needle Localization Guide Function
window.showEMGLocalizationGuide = function () {
    console.log('🔍 DEBUG: showEMGLocalizationGuide called');
    console.log('✨ UI FACELIFT VERSION LOADED - EMG Needle Localization v20251002');

    const title = '💉 EMG Needle Localization Guide';
    const content = `
    < div class="emg-localization-container" >
            < !--Hero Section with Animated Gradient-- >
            <div class="emg-hero">
                <div class="hero-content">
                    <h1 class="hero-title">💉 EMG Needle Localization Guide</h1>
                    <p class="hero-subtitle">Precise electrode placement using anatomical landmarks</p>
                    <div class="hero-stats">
                        <div class="stat-card">
                            <div class="stat-number">13</div>
                            <div class="stat-label">Total Muscles</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">7</div>
                            <div class="stat-label">Upper Extremity</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">6</div>
                            <div class="stat-label">Lower Extremity</div>
                        </div>
                    </div>
                </div>
            </div>

            <!--Compact Control Bar-- >
            <div class="control-bar">
                <div class="control-section">
                    <h4>🎯 Select Region</h4>
                    <div class="region-selector">
                        <button class="region-btn active" id="upper-region-btn" onclick="EMGLocalization.switchRegion('upper')">
                            🫱 Upper Extremity
                        </button>
                        <button class="region-btn" id="lower-region-btn" onclick="EMGLocalization.switchRegion('lower')">
                            🦵 Lower Extremity
                        </button>
                    </div>
                </div>
            </div>

            <!--Muscle Pill Selector-- >
            <div class="muscle-pill-container" id="muscle-pill-container">
                <!-- Will be populated by JavaScript -->
            </div>

            <!--Main Content Area(Full Width)-- >
    <div class="muscle-detail-panel">
        <div class="detail-placeholder" id="muscle-detail-content">
            <div class="placeholder-content">
                <h4>🎯 Select a Muscle</h4>
                <p>Choose a muscle above to view detailed EMG needle localization information including:</p>
                <ul>
                    <li>💉 <strong>Electrode Insertion</strong> - Precise needle placement instructions</li>
                    <li>🧍 <strong>Patient Position</strong> - Optimal positioning for access</li>
                    <li>💪 <strong>Test Maneuver</strong> - Activation technique for verification</li>
                    <li>⚠️ <strong>Pitfalls</strong> - Common mistakes and warnings</li>
                    <li>🧠 <strong>Innervation</strong> - Nerve supply details</li>
                    <li>📝 <strong>Clinical Notes</strong> - Important anatomical information</li>
                </ul>
            </div>
        </div>
    </div>
        </div >

    <style>
            /* Advanced EMG Localization Styling */
        @keyframes gradient-shift {
            0 % { background- position: 0% 50%; }
        50% {background - position: 100% 50%; }
        100% {background - position: 0% 50%; }
            }

        @keyframes float {
            0 %, 100 % { transform: translateY(0px); }
                50% {transform: translateY(-10px); }
            }

        .emg-localization-container {
            font - family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        max-width: 1400px;
        margin: 0 auto;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 20px;
        overflow: hidden;
            }

        /* Hero Section */
        .emg-hero {
            background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6, #14b8a6);
        background-size: 300% 300%;
        animation: gradient-shift 15s ease infinite;
        border-radius: 25px 25px 0 0;
        padding: 40px;
        margin: 0;
        text-align: center;
        box-shadow: 0 20px 60px rgba(20, 184, 166, 0.3);
        position: relative;
        overflow: hidden;
            }

        .emg-hero::before {
            content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.05);
        z-index: 1;
            }

        .emg-hero .hero-content {
            position: relative;
        z-index: 2;
            }

        .hero-title {
            font - size: 2.5rem;
        color: white;
        margin-bottom: 15px;
        font-weight: 700;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }

        .hero-subtitle {
            font - size: 1.1rem;
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

        .stat-card:nth-child(1) {animation - delay: 0s; }
        .stat-card:nth-child(2) {animation - delay: 0.2s; }
        .stat-card:nth-child(3) {animation - delay: 0.4s; }

        .stat-card:hover {
            transform: translateY(-15px) scale(1.05);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.3);
            }

        .stat-number {
            font - size: 2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 5px;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

        .stat-label {
            font - size: 0.9rem;
        color: rgba(255, 255, 255, 0.9);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            }

        /* Control Bar */
        .control-bar {
            background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 2px solid #e2e8f0;
        padding: 20px 35px;
            }

        .control-section h4 {
            color: #2c3e50;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
            }

        .region-selector {
            display: flex;
        gap: 15px;
            }

        .region-btn {
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

        .region-btn:hover {
            background: rgba(20, 184, 166, 0.1);
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 6px 20px rgba(20, 184, 166, 0.25);
        border-color: rgba(20, 184, 166, 0.5);
            }

        .region-btn.active {
            background: linear-gradient(135deg, #14b8a6, #06b6d4);
        color: white;
        font-weight: 700;
        box-shadow: 0 6px 25px rgba(20, 184, 166, 0.5);
        border-color: transparent;
            }

        /* Muscle Pill Selector */
        .muscle-pill-container {
            padding: 25px 35px;
        background: white;
        border-bottom: 2px solid #e2e8f0;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
            }

        .muscle-pill {
            padding: 12px 24px;
        border: 2px solid rgba(139, 92, 246, 0.3);
        border-radius: 25px;
        background: white;
        color: #8b5cf6;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
            }

        .muscle-pill:hover {
            background: rgba(139, 92, 246, 0.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
        border-color: #8b5cf6;
            }

        .muscle-pill.active {
            background: linear-gradient(135deg, #8b5cf6, #6366f1);
        color: white;
        font-weight: 700;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        border-color: transparent;
            }

        .muscle-pill-abbrev {
            font - weight: 700;
        margin-right: 6px;
            }

        .muscle-pill-name {
            font - weight: 500;
        opacity: 0.9;
            }

        /* Content Panel */
        .muscle-detail-panel {
            padding: 35px;
        background: linear-gradient(135deg, #fefefe, #f9fafb);
        min-height: 400px;
            }

        .placeholder-content {
            text - align: center;
        padding: 80px 40px;
        color: #64748b;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

        .placeholder-content h4 {
            color: #1e293b;
        margin-bottom: 24px;
        font-size: 1.6em;
        font-weight: 700;
            }

        .placeholder-content ul {
            text - align: left;
        max-width: 550px;
        margin: 24px auto 0;
        line-height: 1.9;
            }

        .placeholder-content li {
            margin - bottom: 12px;
        font-weight: 500;
            }

        /* Selected Muscle Detail Styles */
        .muscle-detail {
            animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

        @keyframes fadeInUp {
            from {
            opacity: 0;
        transform: translateY(20px);
                }
        to {
            opacity: 1;
        transform: translateY(0);
                }
            }

        .muscle-title {
            background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
        padding: 28px;
        border-radius: 16px;
        margin-bottom: 30px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

        .muscle-title h4 {
            margin: 0 0 10px 0;
        font-size: 1.8em;
        font-weight: 800;
            }

        .muscle-subtitle {
            color: #94a3b8;
        font-size: 1.15em;
        margin: 0;
        font-weight: 400;
            }

        .detail-section {
            background: white;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
        border-left: 4px solid #3b82f6;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
            }

        .detail-section:hover {
            box - shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
            }

        .detail-section h5 {
            color: #1e293b;
        margin: 0 0 16px 0;
        font-size: 1.25em;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
            }

        .detail-text {
            color: #374151;
        line-height: 1.8;
        margin: 0;
        font-size: 1.05em;
        font-weight: 400;
            }

        .image-placeholder {
            background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        border: 3px dashed #94a3b8;
        border-radius: 16px;
        padding: 50px;
        text-align: center;
        color: #64748b;
        margin-bottom: 25px;
        transition: all 0.3s ease;
            }

        .image-placeholder:hover {
            border - color: #6366f1;
        background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
            }

        .image-placeholder-icon {
            font - size: 3.5em;
        margin-bottom: 16px;
        opacity: 0.6;
            }

        .image-placeholder p {
            margin: 8px 0;
        font-weight: 500;
            }

        /* Electrode Insertion Section - RED HIGHLIGHT */
        .detail-section.electrode-insertion {
            border - left: 4px solid #dc2626;
        background: linear-gradient(135deg, #ffffff, #fef2f2);
        box-shadow: 0 6px 15px -3px rgba(220, 38, 38, 0.15);
            }

        .detail-section.electrode-insertion h5 {
            color: #dc2626;
            }

        /* Pitfalls Section - ORANGE HIGHLIGHT */
        .detail-section.pitfalls {
            border - left: 4px solid #f59e0b;
        background: linear-gradient(135deg, #ffffff, #fffbeb);
        box-shadow: 0 6px 15px -3px rgba(245, 158, 11, 0.15);
            }

        .detail-section.pitfalls h5 {
            color: #f59e0b;
            }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 480px) {
                .emg - localization - container {
            border - radius: 10px;
                }

        /* Hero section */
        .emg-hero {
            padding: 25px 15px !important;
        border-radius: 10px 10px 0 0;
                }

        .hero-title {
            font - size: 1.5rem !important;
                }

        .hero-subtitle {
            font - size: 0.9rem !important;
                }

        .hero-stats {
            gap: 15px;
                }

        .stat-card {
            padding: 15px 20px !important;
        min-width: 90px;
                }

        .stat-number {
            font - size: 1.5rem !important;
                }

        .stat-label {
            font - size: 0.75rem !important;
                }

        /* Control bar */
        .control-bar {
            padding: 15px 20px !important;
                }

        .control-section h4 {
            font - size: 12px !important;
                }

        .region-selector {
            flex - direction: column;
        gap: 10px;
                }

        .region-btn {
            padding: 12px 20px !important;
        font-size: 0.95rem !important;
        width: 100%;
                }

        /* Muscle pills */
        .muscle-pill-container {
            padding: 15px 20px !important;
                }

        .muscle-pill {
            padding: 10px 18px !important;
        font-size: 0.9rem !important;
                }

        /* Content panel */
        .muscle-detail-panel {
            padding: 20px 15px !important;
                }

        /* Placeholder content */
        .placeholder-content {
            padding: 40px 20px !important;
                }

        .placeholder-content h4 {
            font - size: 1.2em !important;
                }

        .placeholder-content p {
            font - size: 0.9em !important;
                }

        .placeholder-content li {
            font - size: 0.85em !important;
        margin-bottom: 8px;
                }

        /* Muscle detail content */
        .muscle-detail-content h3 {
            font - size: 1.4em !important;
                }

        .muscle-detail-content h4 {
            font - size: 1.1em !important;
                }

        .muscle-detail-content h5 {
            font - size: 1em !important;
                }

        .muscle-detail-content p,
        .muscle-detail-content li {
            font - size: 0.9em !important;
        line-height: 1.5 !important;
                }

        /* Info boxes */
        .info-box {
            padding: 12px !important;
        margin: 12px 0 !important;
                }

        /* Image placeholders */
        .image-placeholder {
            padding: 30px 15px !important;
        margin-bottom: 15px !important;
                }

        .image-placeholder-icon {
            font - size: 2.5em !important;
                }
            }

        /* Extra small phones */
        @media (max-width: 375px) {
                .hero - title {
            font - size: 1.3rem !important;
                }

        .stat-card {
            min - width: 80px;
        padding: 12px 15px !important;
                }
            }
    </style>
`;

    showModal(title, content);

    // Initialize the EMG Localization system after modal is loaded
    setTimeout(() => {
        if (!window.EMGLocalization) {
            window.EMGLocalization = {
                selectedMuscle: null,
                selectedRegion: 'upper', // Default to upper

                switchRegion: function (region) {
                    console.log(`🔄 Switching to ${region} extremity`);
                    this.selectedRegion = region;

                    // Update region button styles
                    document.querySelectorAll('.region-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    document.getElementById(`${region} -region - btn`).classList.add('active');

                    // Render muscle pills for selected region
                    this.renderMusclePills(region);

                    // Clear detail panel
                    document.getElementById('muscle-detail-content').innerHTML = `
    < div class="placeholder-content" >
                            <h4>🎯 Select a Muscle</h4>
                            <p>Choose a muscle above to view detailed EMG needle localization information</p>
                        </div >
    `;
                },

                renderMusclePills: function (region) {
                    const container = document.getElementById('muscle-pill-container');
                    const muscles = region === 'upper'
                        ? EMGLocalizationDatabase.upperExtremity
                        : EMGLocalizationDatabase.lowerExtremity;

                    const pillsHTML = Object.keys(muscles).map(abbrev => {
                        const muscle = muscles[abbrev];
                        return `
    < div class="muscle-pill" onclick = "EMGLocalization.selectMuscle('${abbrev}', '${region}')" data - muscle="${abbrev}" >
                                <span class="muscle-pill-abbrev">${abbrev}</span>
                                <span class="muscle-pill-name">${muscle.fullName}</span>
                            </div >
    `;
                    }).join('');

                    container.innerHTML = pillsHTML;
                },

                selectMuscle: function (muscle, region) {
                    console.log(`🔍 Selecting muscle: ${muscle} from ${region} extremity`);

                    // Update selection state
                    this.selectedMuscle = muscle;
                    this.selectedRegion = region;

                    // Remove previous selections
                    document.querySelectorAll('.muscle-pill').forEach(item => {
                        item.classList.remove('active');
                    });

                    // Add selection to clicked item
                    const selectedItem = document.querySelector(`.muscle - pill[data - muscle="${muscle}"]`);
                    if (selectedItem) {
                        selectedItem.classList.add('active');
                    }

                    // Get muscle data
                    const muscleData = region === 'upper'
                        ? EMGLocalizationDatabase.upperExtremity[muscle]
                        : EMGLocalizationDatabase.lowerExtremity[muscle];

                    // Update detail panel (pass muscle key for image lookup)
                    this.displayMuscleDetails({ ...muscleData, key: muscle });
                },

                displayMuscleDetails: function (muscleData) {
                    const detailPanel = document.getElementById('muscle-detail-content');

                    // REORDERED: Electrode insertion FIRST after image!
                    const detailHTML = `
    < div class="muscle-detail" >
        <div class="muscle-title">
            <h4>${muscleData.fullName}</h4>
            <p class="muscle-subtitle">EMG Needle Localization Guide</p>
        </div>

                            ${(() => {
                            const imagePath = getMuscleImagePath(muscleData.key || '');
                            if (imagePath) {
                                return `
                                        <div style="margin-bottom: 25px; text-align: center;">
                                            <img src="${imagePath}"
                                                 alt="${muscleData.fullName} needle insertion"
                                                 style="width: 100%; max-width: 600px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
                                                 onerror="this.parentElement.innerHTML='<div class=\\'image-placeholder\\'><div class=\\'image-placeholder-icon\\'>🖼️</div><p><strong>Image not found</strong></p><p>${muscleData.fullName}</p></div>'">
                                        </div>
                                    `;
                            } else {
                                return `
                                        <div class="image-placeholder" style="margin-bottom: 25px;">
                                            <div class="image-placeholder-icon">🖼️</div>
                                            <p><strong>EMG Needle Placement Image</strong></p>
                                            <p>Anatomical diagram for ${muscleData.fullName} needle insertion</p>
                                            <p style="font-size: 0.9em; color: #94a3b8; margin-top: 8px;">Image coming soon</p>
                                        </div>
                                    `;
                            }
                        })()
                        }

                            <div class="detail-section electrode-insertion">
                                <h5>💉 Electrode Insertion</h5>
                                <p class="detail-text"><strong>${muscleData.electrodeInsertion}</strong></p>
                            </div>

                            <div class="detail-section">
                                <h5>🧍 Patient Position</h5>
                                <p class="detail-text">${muscleData.position}</p>
                            </div>

                            <div class="detail-section">
                                <h5>💪 Test Maneuver</h5>
                                <p class="detail-text">${muscleData.testManeuver}</p>
                            </div>

                            <div class="detail-section pitfalls">
                                <h5>⚠️ Pitfalls</h5>
                                <p class="detail-text">${muscleData.pitfalls}</p>
                            </div>

                            <div class="detail-section">
                                <h5>🧠 Innervation</h5>
                                <p class="detail-text">${muscleData.innervation}</p>
                            </div>

                            <div class="detail-section">
                                <h5>📍 Origin</h5>
                                <p class="detail-text">${muscleData.origin}</p>
                            </div>

                            <div class="detail-section">
                                <h5>🎯 Insertion</h5>
                                <p class="detail-text">${muscleData.insertion}</p>
                            </div>

                            <div class="detail-section">
                                <h5>📝 Clinical Comments</h5>
                                <p class="detail-text">${muscleData.comments}</p>
                            </div>
                        </div >
    `;

                    detailPanel.innerHTML = detailHTML;
                }
            };
        }

        // Initialize with upper extremity muscles
        EMGLocalization.renderMusclePills('upper');
    }, 100);
};

// Make EMG Localization Guide globally available
window.showEMGLocalizationGuide = showEMGLocalizationGuide;

// Report Writing Module Functions
window.showReportModule = function (moduleName) {
    // Update tab styles
    document.querySelectorAll('#communication-tab, #severity-tab, #examples-tab, #builder-tab, #coach-tab').forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#64748b';
    });

    const targetTab = document.getElementById(moduleName + '-tab');
    if (targetTab) {
        targetTab.style.background = '#3b82f6';
        targetTab.style.color = 'white';
    }

    // Hide all modules
    document.querySelectorAll('#communication-module, #severity-module, #examples-module, #builder-module, #coach-module').forEach(module => {
        module.style.display = 'none';
    });

    // Show selected module
    const targetModule = document.getElementById(moduleName + '-module');
    if (targetModule) {
        targetModule.style.display = 'block';
    }

    window.currentReportModule = moduleName;
};

window.updateStructurePreview = function () {
    const studyResult = document.getElementById('study-result');
    const primaryFinding = document.getElementById('primary-finding');
    const preview = document.getElementById('structure-preview');

    if (!studyResult || !primaryFinding || !preview) return;

    let previewText = '';

    if (studyResult.value === 'normal') {
        previewText = `1. Normal study.

2. No electrodiagnostic evidence of median neuropathy, ulnar neuropathy, or superficial radial neuropathy in the upper extremity.

3. No electrodiagnostic evidence of a cervical radiculopathy or plexopathy in the upper extremity.

Thank you for the courtesy of this referral.`;
    } else {
        let diagnosis = '';

        switch (primaryFinding.value) {
            case 'carpal':
                diagnosis = 'entrapment of the median nerve at the level of the wrist consistent with carpal tunnel syndrome';
                break;
            case 'cubital':
                diagnosis = 'entrapment of the ulnar nerve at the level of the elbow consistent with cubital tunnel syndrome';
                break;
            case 'radiculopathy':
                diagnosis = 'a cervical radiculopathy';
                break;
            case 'polyneuropathy':
                diagnosis = 'a distal sensorimotor polyneuropathy';
                break;
        }

        previewText = `1. Abnormal study.

2. There are electrodiagnostic abnormalities consistent with ${diagnosis}. Involvement appears to be mild, affecting sensory fibers in a demyelinating process.

3. There is no electrodiagnostic evidence of other nerve entrapments in the upper extremity.

4. There is no electrodiagnostic evidence of a cervical radiculopathy.

Thank you for the courtesy of this referral.`;
    }

    preview.innerHTML = previewText.replace(/\n/g, '<br>');
};

window.showExample = function (exampleType) {
    // Update button styles
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.style.background = '#6b7280';
    });

    const targetBtn = document.getElementById(exampleType + '-btn');
    if (targetBtn) {
        targetBtn.style.background = '#10b981';
    }

    const display = document.getElementById('example-display');
    if (!display) return;

    let content = '';

    switch (exampleType) {
        case 'normal':
            content = `
    < h5 style = "color: #065f46; margin-bottom: 15px;" >📄 Normal Study Example</h5 >
        <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151;">
            <strong>Conclusions:</strong><br><br>
                1. Normal study.<br><br>
                    2. No electrodiagnostic evidence of median neuropathy, ulnar neuropathy, or superficial radial neuropathy in the left upper extremity.<br><br>
                        3. No electrodiagnostic evidence of a cervical radiculopathy or plexopathy in the left upper extremity.<br><br>
                            Thank you for the courtesy of this referral.
                        </div>
                            <div style="margin-top: 15px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #065f46; margin-bottom: 8px;">🎯 Key Points:</h6>
                                <ul style="color: #047857; margin: 0; padding-left: 20px;">
                                    <li>Clear declaration of normal study</li>
                                    <li>Systematic exclusion of common conditions</li>
                                    <li>Professional closing</li>
                                </ul>
                            </div>
                            `;
            break;
        case 'mild-cts':
            content = `
                            <h5 style="color: #065f46; margin-bottom: 15px;">📄 Mild Carpal Tunnel Syndrome</h5>
                            <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151;">
                                <strong>Conclusions:</strong><br><br>
                                    1. Abnormal study.<br><br>
                                        2. There are electrodiagnostic abnormalities consistent with entrapment of the left median nerve at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, affecting sensory fibers in a demyelinating process. There is no denervation noted in the left APB muscle.<br><br>
                                            3. There is no electrodiagnostic evidence of an ulnar neuropathy or superficial radial sensory neuropathy in the left upper extremity.<br><br>
                                                4. There is no electrodiagnostic evidence of a cervical radiculopathy in the left upper extremity.<br><br>
                                                    Thank you for the courtesy of this referral.
                                                </div>
                                                    <div style="margin-top: 15px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                                        <h6 style="color: #92400e; margin-bottom: 8px;">🎯 Key Elements:</h6>
                                                        <ul style="color: #451a03; margin: 0; padding-left: 20px;">
                                                            <li>Specific anatomical localization</li>
                                                            <li>Severity assessment (mild)</li>
                                                            <li>Process type (demyelinating)</li>
                                                            <li>Exclusion of denervation</li>
                                                        </ul>
                                                    </div>
                                                    `;
            break;
        case 'severe-cts':
            content = `
                                                    <h5 style="color: #065f46; margin-bottom: 15px;">📄 Severe Carpal Tunnel Syndrome</h5>
                                                    <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151;">
                                                        <strong>Conclusions:</strong><br><br>
                                                            1. Abnormal study.<br><br>
                                                                2. There are electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be severe, right worse than left, affecting sensory and motor fibers in a demyelinating and axonal manner. There is denervation seen in both APB muscles.<br><br>
                                                                    3. There are electrodiagnostic abnormalities suggestive of an ulnar neuropathy in both upper extremities at the level of the elbow consistent with cubital tunnel syndrome. There is motor slowing across both elbows with borderline sensory studies. There is no denervation noted in either FDI muscle.<br><br>
                                                                        4. There is no electrodiagnostic evidence of a superficial radial sensory neuropathy in either upper extremity.<br><br>
                                                                            5. There is no electrodiagnostic evidence of a lower cervical radiculopathy in either upper extremity.<br><br>
                                                                                Thank you for the courtesy of this referral.
                                                                            </div>
                                                                                <div style="margin-top: 15px; padding: 15px; background: #fecaca; border-radius: 8px; border-left: 4px solid #dc2626;">
                                                                                    <h6 style="color: #991b1b; margin-bottom: 8px;">🎯 Complex Case Features:</h6>
                                                                                    <ul style="color: #7f1d1d; margin: 0; padding-left: 20px;">
                                                                                        <li>Multiple nerve involvement</li>
                                                                                        <li>Bilateral findings with asymmetry</li>
                                                                                        <li>Mixed demyelinating and axonal process</li>
                                                                                        <li>Evidence of denervation</li>
                                                                                    </ul>
                                                                                </div>
                                                                                `;
            break;
        case 'complex':
            content = `
                                                                                <h5 style="color: #065f46; margin-bottom: 15px;">📄 Complex Multi-System Case</h5>
                                                                                <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151; font-size: 0.85em;">
                                                                                    <strong>Conclusions:</strong><br><br>
                                                                                        1. Abnormal study.<br><br>
                                                                                            2. There is electrodiagnostic evidence of a diffuse axonal process in the left upper extremity involving all tested muscles. The left median, radial and ulnar sensory studies are absent consistent with a post-ganglionic pan brachial plexopathy. Clinical correlation indicated.<br><br>
                                                                                                3. There are electrodiagnostic abnormalities consistent with entrapment of the right median nerve at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild to moderate, affecting sensory and motor fibers in a demyelinating manner.<br><br>
                                                                                                    4. There are electrodiagnostic abnormalities suggestive of an ulnar neuropathy in the right upper extremity at the level of the elbow consistent with cubital tunnel syndrome.<br><br>
                                                                                                        5. Electrodiagnostic evidence suggestive of an axonal and demyelinating peripheral polyneuropathy involving sensory and motor fibers in the right upper extremity.<br><br>
                                                                                                            Thank you for the courtesy of this referral.
                                                                                                        </div>
                                                                                                            <div style="margin-top: 15px; padding: 15px; background: #e0e7ff; border-radius: 8px; border-left: 4px solid #6366f1;">
                                                                                                                <h6 style="color: #3730a3; margin-bottom: 8px;">🎯 Advanced Reporting Features:</h6>
                                                                                                                <ul style="color: #4338ca; margin: 0; padding-left: 20px;">
                                                                                                                    <li>Multiple pathological processes</li>
                                                                                                                    <li>Detailed anatomical correlation</li>
                                                                                                                    <li>Clinical correlation recommendations</li>
                                                                                                                    <li>Systematic exclusions</li>
                                                                                                                </ul>
                                                                                                            </div>
                                                                                                            `;
            break;
    }

    display.innerHTML = content;
};

window.generateNewScenario = function () {
    if (!window.practiceScenarios) {
        window.practiceScenarios = [
            {
                title: "Bilateral Carpal Tunnel Syndrome",
                description: "45-year-old female office worker with bilateral hand numbness and tingling, worse at night. NCS shows prolonged median distal latencies bilaterally, worse on right. No denervation on EMG.",
                expert: "1. Abnormal study.\n2. There are electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, bilaterally, right slightly worse than left, affecting sensory fibers in a demyelinating process. There is no denervation noted in either APB muscle. Clinical correlation is indicated.\n3. There is no electrodiagnostic evidence of an ulnar neuropathy or superficial radial sensory neuropathy in either upper extremity.\n4. There is no electrodiagnostic evidence of a cervical radiculopathy in either upper extremity.\n\nThank you for the courtesy of this referral."
            },
            {
                title: "Normal Study",
                description: "28-year-old male with intermittent hand numbness. All nerve conduction studies within normal limits. EMG shows normal voluntary motor units.",
                expert: "1. Normal study.\n2. No electrodiagnostic evidence of median neuropathy, ulnar neuropathy, or superficial radial neuropathy in the left upper extremity.\n3. No electrodiagnostic evidence of a cervical radiculopathy or plexopathy in the left upper extremity.\n\nThank you for the courtesy of this referral."
            },
            {
                title: "Cubital Tunnel Syndrome",
                description: "52-year-old carpenter with elbow pain and hand weakness. NCS shows ulnar motor slowing across elbow. EMG shows denervation in ulnar-innervated muscles.",
                expert: "1. Abnormal study.\n2. There are electrodiagnostic abnormalities consistent with entrapment of the left ulnar nerve at the level of the elbow consistent with cubital tunnel syndrome. There is motor slowing across the elbow with normal sensory studies. There is denervation noted in the left FDI muscle.\n3. There is no electrodiagnostic evidence of a median neuropathy or superficial radial sensory neuropathy in the left upper extremity.\n4. There is no electrodiagnostic evidence of a cervical radiculopathy in the left upper extremity.\n\nThank you for the courtesy of this referral."
            }
        ];
    }

    window.currentScenario = Math.floor(Math.random() * window.practiceScenarios.length);
    const scenario = window.practiceScenarios[window.currentScenario];

    const scenarioDiv = document.getElementById('practice-scenario');
    if (scenarioDiv && scenario) {
        scenarioDiv.innerHTML = `
            <h6 style="color: #92400e; margin-bottom: 10px; font-weight: 600;">${scenario.title}</h6>
            <p style="margin: 0; color: #374151;">${scenario.description}</p>
        `;
    }

    // Clear the textarea
    const textarea = document.getElementById('report-textarea');
    if (textarea) {
        textarea.value = '';
        validateReport();
    }
};

window.showExpertExample = function () {
    if (!window.practiceScenarios || !window.practiceScenarios[window.currentScenario]) return;

    const expertReport = window.practiceScenarios[window.currentScenario].expert;
    const textarea = document.getElementById('report-textarea');

    if (textarea && expertReport) {
        textarea.value = expertReport;
        validateReport();
    }
};

window.clearReport = function () {
    const textarea = document.getElementById('report-textarea');
    if (textarea) {
        textarea.value = '';
        validateReport();
    }
};

window.validateReport = function () {
    const textarea = document.getElementById('report-textarea');
    const feedbackDiv = document.getElementById('feedback-content');

    if (!textarea || !feedbackDiv) return;

    const text = textarea.value.trim();
    const feedback = [];

    if (text === '') {
        feedbackDiv.innerHTML = 'Start typing to get instant feedback on your report structure and language...';
        return;
    }

    // Check structure
    if (!text.startsWith('1.')) {
        feedback.push('❌ Reports should start with "1. Normal study." or "1. Abnormal study."');
    } else if (text.startsWith('1. Normal study.')) {
        feedback.push('✅ Good start with normal study declaration');
    } else if (text.startsWith('1. Abnormal study.')) {
        feedback.push('✅ Good start with abnormal study declaration');
    }

    // Check for professional language
    if (text.includes('consistent with')) {
        feedback.push('✅ Using professional language: "consistent with"');
    }

    if (text.includes('electrodiagnostic abnormalities')) {
        feedback.push('✅ Professional terminology: "electrodiagnostic abnormalities"');
    }

    if (text.includes('There is no electrodiagnostic evidence of')) {
        feedback.push('✅ Good exclusion language');
    }

    if (text.includes('Thank you for the courtesy of this referral')) {
        feedback.push('✅ Professional closing included');
    } else if (text.length > 100) {
        feedback.push('⚠️ Don\'t forget professional closing: "Thank you for the courtesy of this referral."');
    }

    // Check severity descriptors
    if (text.includes('mild') || text.includes('moderate') || text.includes('severe')) {
        feedback.push('✅ Severity assessment included');
    }

    // Check numbering
    const lines = text.split('\n');
    let hasNumbering = true;
    let currentNumber = 1;

    for (const line of lines) {
        if (line.trim().match(/^\d+\./)) {
            const number = parseInt(line.trim().match(/^(\d+)\./)[1]);
            if (number !== currentNumber) {
                hasNumbering = false;
                break;
            }
            currentNumber++;
        }
    }

    if (hasNumbering && currentNumber > 1) {
        feedback.push('✅ Proper sequential numbering');
    } else if (currentNumber === 1 && text.length > 50) {
        feedback.push('⚠️ Consider adding numbered sections (2., 3., etc.)');
    }

    // Length feedback
    if (text.length < 50) {
        feedback.push('💡 Keep writing - reports typically have multiple numbered sections');
    } else if (text.length > 1000) {
        feedback.push('⚠️ Report is getting long - consider being more concise');
    }

    feedbackDiv.innerHTML = feedback.join('<br>') || '👍 Looking good! Keep writing...';
};

// Severity Classification Training Functions
window.checkSeverity = function (selectedSeverity, scenarioNumber) {
    const correctAnswer = 'mild'; // For scenario 1
    const feedbackDiv = document.getElementById(`severity-feedback-${scenarioNumber}`);

    if (!feedbackDiv) return;

    let feedbackContent = '';
    let bgColor = '';
    let borderColor = '';

    if (selectedSeverity === correctAnswer) {
        bgColor = '#f0fdf4';
        borderColor = '#16a34a';
        feedbackContent = `
                                                                                                                <div style="color: #15803d;">
                                                                                                                    <h6 style="color: #15803d; margin-bottom: 8px;">✅ Correct! This is MILD CTS</h6>
                                                                                                                    <p style="margin: 0; font-size: 0.9em;">
                                                                                                                        <strong>Why it's mild:</strong> Only sensory involvement (prolonged sensory latency), normal motor studies, and no denervation.
                                                                                                                        Motor amplitudes are normal at 12mV, and EMG shows no denervation in APB muscles.
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                                `;
    } else if (selectedSeverity === 'moderate') {
        bgColor = '#fef2f2';
        borderColor = '#dc2626';
        feedbackContent = `
                                                                                                                <div style="color: #dc2626;">
                                                                                                                    <h6 style="color: #dc2626; margin-bottom: 8px;">❌ Incorrect - This is NOT moderate</h6>
                                                                                                                    <p style="margin: 0; font-size: 0.9em;">
                                                                                                                        <strong>Why not moderate:</strong> Moderate requires BOTH motor AND sensory involvement.
                                                                                                                        This case has normal motor latency (3.8ms) and normal motor amplitudes (12mV).
                                                                                                                        Only sensory fibers are affected = MILD.
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                                `;
    } else if (selectedSeverity === 'severe') {
        bgColor = '#fef2f2';
        borderColor = '#dc2626';
        feedbackContent = `
                                                                                                                <div style="color: #dc2626;">
                                                                                                                    <h6 style="color: #dc2626; margin-bottom: 8px;">❌ Incorrect - This is NOT severe</h6>
                                                                                                                    <p style="margin: 0; font-size: 0.9em;">
                                                                                                                        <strong>Why not severe:</strong> Severe requires denervation on EMG AND axon loss in motor studies.
                                                                                                                        This case shows no denervation and normal motor amplitudes.
                                                                                                                        Common mistake: motor involvement ≠ severe!
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                                `;
    }

    feedbackDiv.style.display = 'block';
    feedbackDiv.style.background = bgColor;
    feedbackDiv.style.borderLeft = `3px solid ${borderColor}`;
    feedbackDiv.innerHTML = feedbackContent;

    // Disable all buttons after selection
    document.querySelectorAll('.severity-option').forEach(btn => {
        btn.style.opacity = '0.6';
        btn.style.pointerEvents = 'none';
    });
};

window.generateNewSeverityScenario = function () {
    const scenarios = [
        {
            title: "Scenario 2:",
            description: `52-year-old male construction worker with hand weakness.<br>
                                                                                                                    • Median sensory latency: 5.1ms (prolonged)<br>
                                                                                                                        • Median motor latency: 4.8ms (prolonged)<br>
                                                                                                                            • Motor amplitudes: 9mV (maintained)<br>
                                                                                                                                • EMG: No denervation in APB muscle`,
            correct: 'moderate'
        },
        {
            title: "Scenario 3:",
            description: `68-year-old female with severe hand pain and weakness.<br>
                                                                                                                                    • Median sensory: Absent<br>
                                                                                                                                        • Median motor latency: 6.2ms (very prolonged)<br>
                                                                                                                                            • Motor amplitudes: 1.8mV (very low - axon loss)<br>
                                                                                                                                                • EMG: Denervation potentials in APB muscle`,
            correct: 'severe'
        },
        {
            title: "Scenario 4:",
            description: `35-year-old pregnant woman with hand numbness.<br>
                                                                                                                                                    • Median sensory latency: 4.0ms (prolonged)<br>
                                                                                                                                                        • Median motor latency: 3.5ms (normal)<br>
                                                                                                                                                            • Motor amplitudes: 14mV (normal)<br>
                                                                                                                                                                • EMG: Normal voluntary motor units`,
            correct: 'mild'
        }
    ];

    // Cycle through scenarios
    if (!window.currentSeverityScenario) {
        window.currentSeverityScenario = 0;
    }
    window.currentSeverityScenario = (window.currentSeverityScenario + 1) % scenarios.length;

    const scenario = scenarios[window.currentSeverityScenario];
    const container = document.getElementById('severity-quiz-container');

    if (!container) return;

    container.innerHTML = `
                                                                                                                                                                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                                                                                                                                                    <h6 style="color: #475569; margin-bottom: 10px;">${scenario.title}</h6>
                                                                                                                                                                    <p style="color: #374151; margin-bottom: 15px; font-family: 'Courier New', monospace; font-size: 0.9em;">
                                                                                                                                                                        ${scenario.description}
                                                                                                                                                                    </p>

                                                                                                                                                                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                                                                                                                                                                        <button onclick="checkNewSeverity('mild', '${scenario.correct}')" class="severity-option" style="padding: 10px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 6px; cursor: pointer; font-weight: 500; color: #065f46;">
                                                                                                                                                                            Mild CTS
                                                                                                                                                                        </button>
                                                                                                                                                                        <button onclick="checkNewSeverity('moderate', '${scenario.correct}')" class="severity-option" style="padding: 10px; background: #fef3c7; border: 2px solid #f59e0b; border-radius: 6px; cursor: pointer; font-weight: 500; color: #92400e;">
                                                                                                                                                                            Moderate CTS
                                                                                                                                                                        </button>
                                                                                                                                                                        <button onclick="checkNewSeverity('severe', '${scenario.correct}')" class="severity-option" style="padding: 10px; background: #fef2f2; border: 2px solid #dc2626; border-radius: 6px; cursor: pointer; font-weight: 500; color: #991b1b;">
                                                                                                                                                                            Severe CTS
                                                                                                                                                                        </button>
                                                                                                                                                                    </div>

                                                                                                                                                                    <div id="severity-feedback-new" style="margin-top: 15px; padding: 10px; border-radius: 6px; display: none;">
                                                                                                                                                                        <!-- Feedback will be inserted here -->
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                                `;
};

window.checkNewSeverity = function (selectedSeverity, correctAnswer) {
    const feedbackDiv = document.getElementById('severity-feedback-new');

    if (!feedbackDiv) return;

    const explanations = {
        mild: {
            mild: "Correct! Only sensory involvement, normal motor studies, no denervation = MILD CTS.",
            moderate: "Not moderate because motor studies are completely normal. Moderate needs motor involvement.",
            severe: "Not severe - no denervation and normal motor studies. Far from severe criteria."
        },
        moderate: {
            mild: "Not mild because BOTH sensory and motor are affected. Mild = sensory only.",
            moderate: "Correct! Both sensory and motor involved, but amplitudes maintained and no denervation.",
            severe: "Not severe because no denervation on EMG and motor amplitudes are maintained."
        },
        severe: {
            mild: "Not mild - this has absent sensory studies and severe motor involvement with denervation.",
            moderate: "Not moderate because there is clear denervation on EMG and significant axon loss.",
            severe: "Correct! Denervation on EMG + axon loss (low amplitude) + absent sensory = SEVERE CTS."
        }
    };

    let feedbackContent = '';
    let bgColor = '';
    let borderColor = '';

    if (selectedSeverity === correctAnswer) {
        bgColor = '#f0fdf4';
        borderColor = '#16a34a';
        feedbackContent = `
                                                                                                                                                                <div style="color: #15803d;">
                                                                                                                                                                    <h6 style="color: #15803d; margin-bottom: 8px;">✅ Correct! This is ${correctAnswer.toUpperCase()} CTS</h6>
                                                                                                                                                                    <p style="margin: 0; font-size: 0.9em;">
                                                                                                                                                                        <strong>Explanation:</strong> ${explanations[correctAnswer][selectedSeverity]}
                                                                                                                                                                    </p>
                                                                                                                                                                </div>
                                                                                                                                                                `;
    } else {
        bgColor = '#fef2f2';
        borderColor = '#dc2626';
        feedbackContent = `
                                                                                                                                                                <div style="color: #dc2626;">
                                                                                                                                                                    <h6 style="color: #dc2626; margin-bottom: 8px;">❌ Incorrect - This is ${correctAnswer.toUpperCase()} CTS</h6>
                                                                                                                                                                    <p style="margin: 0; font-size: 0.9em;">
                                                                                                                                                                        <strong>Why not ${selectedSeverity}:</strong> ${explanations[correctAnswer][selectedSeverity]}<br><br>
                                                                                                                                                                            <strong>Correct answer:</strong> ${explanations[correctAnswer][correctAnswer]}
                                                                                                                                                                        </p>
                                                                                                                                                                        </div>
                                                                                                                                                                        `;
    }

    feedbackDiv.style.display = 'block';
    feedbackDiv.style.background = bgColor;
    feedbackDiv.style.borderLeft = `3px solid ${borderColor}`;
    feedbackDiv.innerHTML = feedbackContent;

    // Disable all buttons after selection
    document.querySelectorAll('.severity-option').forEach(btn => {
        btn.style.opacity = '0.6';
        btn.style.pointerEvents = 'none';
    });
};



// Clinical Examples Database based on the 39 EMG conclusion screenshots
const clinicalExamplesDatabase = {
    "carpal-tunnel": [
        {
            id: "cts-bilateral-mild",
            title: "Bilateral Mild CTS",
            condition: "Carpal Tunnel Syndrome",
            severity: "Mild",
            conclusion: `1. Abnormal study.
                                                                                                                                                                        2. The above study revealed electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, bilaterally, affecting sensory fibers in a demyelinating process. There is no denervation noted in either APB muscle. Clinical correlation is indicated.
                                                                                                                                                                        3. There is no electrodiagnostic evidence of an ulnar neuropathy or superficial radial sensory neuropathy in either upper extremity.
                                                                                                                                                                        4. There is no electrodiagnostic evidence of a cervical radiculopathy in either upper extremity.`,
            keyTerms: ["electrodiagnostic abnormalities consistent with", "at the level of the wrist", "mild", "affecting sensory fibers", "demyelinating process", "no denervation"],
            professionalLanguage: "Uses precise anatomical localization and standard severity descriptors"
        }
    ],
    "normal": [
        {
            id: "normal-lower-extremity",
            title: "Normal Lower Extremity Study",
            condition: "Normal Study",
            severity: "N/A",
            conclusion: `1. Normal study.
                                                                                                                                                                        2. No electrodiagnostic evidence of a lumbar radiculopathy or plexopathy in the right lower extremity.
                                                                                                                                                                        3. No electrodiagnostic evidence of a large fiber peripheral neuropathy in the right lower extremity.
                                                                                                                                                                        4. No electrodiagnostic evidence of a focal tibial, sciatic or peroneal entrapment neuropathy in the right lower extremity.`,
            keyTerms: ["Normal study", "No electrodiagnostic evidence of", "lumbar radiculopathy or plexopathy", "large fiber peripheral neuropathy"],
            professionalLanguage: "Standard normal study format with comprehensive exclusion statements"
        }
    ]
};

// Clinical Examples Functions
window.filterExamples = function (category) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.style.background = "#6b7280";
        btn.classList.remove("active-filter");
    });

    const activeBtn = document.getElementById(`filter-${category}`);
    if (activeBtn) {
        activeBtn.style.background = "#10b981";
        activeBtn.classList.add("active-filter");
    }

    const grid = document.getElementById("examples-grid");
    if (!grid) return;

    let examplesToShow = [];
    if (category === "all") {
        Object.values(clinicalExamplesDatabase).forEach(categoryExamples => {
            examplesToShow = examplesToShow.concat(categoryExamples);
        });
    } else {
        examplesToShow = clinicalExamplesDatabase[category] || [];
    }

    grid.innerHTML = examplesToShow.map(example => `
                                                                                                                                                                        <div onclick="showExampleDetail('${example.id}')" style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                                                                                                                                                                            <div style="display: flex; justify-content: between; align-items: flex-start; margin-bottom: 12px;">
                                                                                                                                                                                <h6 style="color: #1f2937; margin: 0; font-weight: 600; flex: 1;">${example.title}</h6>
                                                                                                                                                                                ${example.severity !== "N/A" ? `<span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: 500;">${example.severity}</span>` : ""}
                                                                                                                                                                            </div>
                                                                                                                                                                            <p style="color: #6b7280; margin-bottom: 15px; font-size: 0.9em;">${example.condition}</p>
                                                                                                                                                                            <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                                                                                                                                                                                <p style="color: #374151; margin: 0; font-size: 0.85em; line-height: 1.4; font-family: 'Courier New', monospace;">
                                                                                                                                                                                    ${example.conclusion.split("\\n")[0]}<br>
                                                                                                                                                                                        ${example.conclusion.split("\\n")[1] ? example.conclusion.split("\\n")[1].substring(0, 80) + '...' : ''}
                                                                                                                                                                                </p>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        `).join("");
};

window.showExampleDetail = function (exampleId) {
    let example = null;
    Object.values(clinicalExamplesDatabase).forEach(categoryExamples => {
        const found = categoryExamples.find(ex => ex.id === exampleId);
        if (found) example = found;
    });
    if (!example) return;

    const modalContent = `
                                                                                                                                                                        <div style="max-width: 800px; background: white; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto;">
                                                                                                                                                                            <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 25px; border-radius: 15px 15px 0 0;">
                                                                                                                                                                                <h3 style="margin: 0 0 10px 0; font-size: 1.5em;">${example.title}</h3>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div style="padding: 25px;">
                                                                                                                                                                                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #0ea5e9;">
                                                                                                                                                                                    <h5 style="color: #0c4a6e; margin-bottom: 12px;">💡 Professional Language Analysis</h5>
                                                                                                                                                                                    <p style="color: #075985; margin: 0; font-style: italic;">${example.professionalLanguage}</p>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div style="margin-bottom: 20px;">
                                                                                                                                                                                    <h5 style="color: #1f2937; margin-bottom: 12px;">📄 Complete EMG Conclusion</h5>
                                                                                                                                                                                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                                                                                                                                                                                        <pre style="color: #374151; margin: 0; font-family: 'Courier New', monospace; font-size: 0.9em; line-height: 1.6; white-space: pre-wrap;">${example.conclusion}</pre>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div style="display: flex; gap: 12px; margin-top: 25px;">
                                                                                                                                                                                    <button onclick="closeExampleDetail()" style="padding: 12px 20px; background: #6b7280; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">✕ Close</button>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        `;

    const modalOverlay = document.createElement("div");
    modalOverlay.id = "example-detail-modal";
    modalOverlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; justify-content: center; align-items: center; padding: 20px;`;
    modalOverlay.innerHTML = modalContent;
    document.body.appendChild(modalOverlay);
};

window.closeExampleDetail = function () {
    const modal = document.getElementById("example-detail-modal");
    if (modal) modal.remove();
};

window.showLanguageComparison = function () {
    const trainingArea = document.getElementById("language-training-area");
    if (!trainingArea) return;
    trainingArea.style.display = "block";
    trainingArea.innerHTML = `
                                                                                                                                                                        <div style="background: white; padding: 20px; border-radius: 12px; margin-top: 15px;">
                                                                                                                                                                            <h6 style="color: #1f2937; margin-bottom: 15px;">🔄 Before/After Language Training</h6>
                                                                                                                                                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                                                                                                                                                                                <div>
                                                                                                                                                                                    <h6 style="color: #dc2626; margin-bottom: 10px;">❌ Unprofessional</h6>
                                                                                                                                                                                    <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 3px solid #dc2626;">
                                                                                                                                                                                        <p style="color: #374151; margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em;">
                                                                                                                                                                                            "The patient has carpal tunnel syndrome that is not too bad. The nerve conduction study shows some problems with the median nerve at the wrist. No muscle damage was seen."
                                                                                                                                                                                        </p>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div>
                                                                                                                                                                                    <h6 style="color: #10b981; margin-bottom: 10px;">✅ Professional</h6>
                                                                                                                                                                                    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 3px solid #10b981;">
                                                                                                                                                                                        <p style="color: #374151; margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em;">
                                                                                                                                                                                            "There are electrodiagnostic abnormalities consistent with entrapment of the median nerve at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, affecting sensory fibers in a demyelinating process. There is no denervation noted in the APB muscle."
                                                                                                                                                                                        </p>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        `;
};

window.showTerminologyQuiz = function () {
    const trainingArea = document.getElementById("language-training-area");
    if (!trainingArea) return;
    trainingArea.style.display = "block";
    trainingArea.innerHTML = `
                                                                                                                                                                        <div style="background: white; padding: 20px; border-radius: 12px; margin-top: 15px;">
                                                                                                                                                                            <h6 style="color: #1f2937; margin-bottom: 15px;">📝 Professional Terminology Quiz</h6>
                                                                                                                                                                            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                                                                                                                                                                <p style="color: #374151; margin-bottom: 15px; font-weight: 500;">Which phrase is most professional for describing carpal tunnel syndrome findings?</p>
                                                                                                                                                                                <div style="display: grid; gap: 10px;">
                                                                                                                                                                                    <button onclick="alert('Professional EMG language requires precise terminology. The correct answer uses: electrodiagnostic abnormalities consistent with entrapment at the level of the wrist.')" style="padding: 12px; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; text-align: left;">
                                                                                                                                                                                        A) "Electrodiagnostic abnormalities consistent with entrapment of the median nerve at the level of the wrist"
                                                                                                                                                                                    </button>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        `;
};

window.loadAllExamples = function () {
    filterExamples("all");
};

// ===================================================================
// UNIVERSAL MODULE QUIZ SYSTEM
// ===================================================================

/**
 * Generate a standardized quiz section for any module
 * @param {Array} questions - Array of question objects with structure:
                                                                                                                                                                        *   {
 * question: "Question text",
                                                                                                                                                                        *     options: ["Option A", "Option B", "Option C", "Option D"],
                                                                                                                                                                        *     correct: 0, // Index of correct answer (0-3)
                                                                                                                                                                        *     explanation: "Explanation of correct answer"
 *   }
                                                                                                                                                                        * @returns {string} HTML for quiz section
                                                                                                                                                                        */
function generateModuleQuiz(questions) {
    if (!questions || questions.length === 0) return '';

    // Generate HTML for all questions (hidden by default except first)
    const quizHTML = questions.map((q, index) => `
                                                                                                                                                                        <div class="quiz-question-card" style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb; display: ${index === 0 ? 'block' : 'none'};" data-question="${index}">
                                                                                                                                                                            <p style="font-size: 1.1em; font-weight: 600; margin-bottom: 20px; color: #1f2937;">
                                                                                                                                                                                <span style="background: #0d9488; color: white; padding: 4px 10px; border-radius: 6px; margin-right: 10px; font-size: 0.9em;">Question ${index + 1} of ${questions.length}</span>
                                                                                                                                                                                ${q.question}
                                                                                                                                                                            </p>
                                                                                                                                                                            <div class="quiz-options" style="display: grid; gap: 10px;">
                                                                                                                                                                                ${q.options.map((option, optIndex) => `
                    <button class="quiz-option"
                            onclick="checkQuizAnswer(this, ${optIndex === q.correct}, '${q.explanation.replace(/'/g, "\\'")}', ${index}, ${questions.length})"
                            style="padding: 15px 20px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; text-align: left; font-size: 1em; transition: all 0.3s; min-height: 48px;"
                            onmouseover="this.style.background='#f1f5f9'; this.style.borderColor='#cbd5e1';"
                            onmouseout="if(!this.classList.contains('correct') && !this.classList.contains('incorrect')) { this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'; }">
                        ${option}
                    </button>
                `).join('')}
                                                                                                                                                                            </div>
                                                                                                                                                                            <div class="quiz-feedback" style="margin-top: 15px; padding: 15px; border-radius: 8px; display: none;"></div>
                                                                                                                                                                            <button class="quiz-next-btn" style="margin-top: 20px; padding: 12px 24px; background: #0d9488; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; display: none; transition: all 0.3s;"
                                                                                                                                                                                onclick="nextQuizQuestion(${index}, ${questions.length})"
                                                                                                                                                                                onmouseover="this.style.background='#0f766e';"
                                                                                                                                                                                onmouseout="this.style.background='#0d9488';">
                                                                                                                                                                                ${index === questions.length - 1 ? 'View Results' : 'Next Question →'}
                                                                                                                                                                            </button>
                                                                                                                                                                        </div>
                                                                                                                                                                        `).join('');

    return `
                                                                                                                                                                        <div class="module-quiz-section" style="margin-top: 40px; padding-top: 30px; border-top: 3px solid #e5e7eb;">
                                                                                                                                                                            <div style="background: linear-gradient(135deg, #0d9488, #0f766e); padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                                                                                                                                                                                <h3 style="color: white; margin-bottom: 10px; font-size: 1.8em;">📝 Test Your Knowledge</h3>
                                                                                                                                                                                <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 1.1em;">Answer ${questions.length} questions to reinforce your learning</p>
                                                                                                                                                                            </div>

                                                                                                                                                                            <div class="quiz-score-tracker" style="background: #f0fdfa; padding: 15px 20px; border-radius: 10px; margin-bottom: 25px; text-align: center; border: 2px solid #99f6e4;">
                                                                                                                                                                                <span style="font-size: 1.2em; font-weight: 600; color: #134e4a;">Score: <span id="quiz-score">0</span>/${questions.length}</span>
                                                                                                                                                                            </div>

                                                                                                                                                                            <div class="quiz-container">
                                                                                                                                                                                ${quizHTML}
                                                                                                                                                                            </div>

                                                                                                                                                                            <div id="quiz-complete" style="display: none; background: #ccfbf1; padding: 25px; border-radius: 12px; border: 2px solid #5eead4; text-align: center;">
                                                                                                                                                                                <h3 style="color: #115e59; margin-bottom: 15px;">🎉 Quiz Complete!</h3>
                                                                                                                                                                                <p style="color: #134e4a; font-size: 1.2em; margin: 0;">You scored <span id="final-score"></span> out of ${questions.length}</p>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        `;
}

/**
 * Check quiz answer and provide immediate feedback
 * @param {HTMLElement} button - The clicked button
                                                                                                                                                                        * @param {boolean} isCorrect - Whether the answer is correct
                                                                                                                                                                        * @param {string} explanation - Explanation text
                                                                                                                                                                        * @param {number} questionIndex - Index of the question
                                                                                                                                                                        */
window.checkQuizAnswer = function (button, isCorrect, explanation, questionIndex, totalQuestions) {
    const questionCard = button.closest('.quiz-question-card');
    const allButtons = questionCard.querySelectorAll('.quiz-option');
    const feedbackDiv = questionCard.querySelector('.quiz-feedback');
    const nextBtn = questionCard.querySelector('.quiz-next-btn');

    // Disable all buttons for this question
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
        btn.style.opacity = '0.6';
    });

    // Style the clicked button
    if (isCorrect) {
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.style.borderColor = '#059669';
        button.style.color = 'white';
        button.style.fontWeight = '600';
        button.style.opacity = '1';
        button.classList.add('correct');

        // Update score
        const scoreEl = document.getElementById('quiz-score');
        if (scoreEl) {
            scoreEl.textContent = parseInt(scoreEl.textContent) + 1;
        }

        // Show success feedback
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.background = '#d1fae5';
        feedbackDiv.style.borderLeft = '4px solid #10b981';
        feedbackDiv.innerHTML = `
                                                                                                                                                                        <p style="margin: 0; color: #065f46; font-weight: 600; margin-bottom: 8px;">✅ Correct!</p>
                                                                                                                                                                        <p style="margin: 0; color: #047857; line-height: 1.6;">${explanation}</p>
                                                                                                                                                                        `;
    } else {
        button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        button.style.borderColor = '#dc2626';
        button.style.color = 'white';
        button.style.fontWeight = '600';
        button.style.opacity = '1';
        button.classList.add('incorrect');

        // Highlight correct answer
        allButtons.forEach((btn, idx) => {
            if (btn !== button && !btn.classList.contains('incorrect')) {
                const isThisCorrect = btn.onclick.toString().includes('true');
                if (isThisCorrect) {
                    btn.style.background = '#d1fae5';
                    btn.style.borderColor = '#10b981';
                    btn.style.color = '#065f46';
                    btn.style.fontWeight = '600';
                    btn.style.opacity = '1';
                }
            }
        });

        // Show error feedback
        feedbackDiv.style.display = 'block';
        feedbackDiv.style.background = '#fee2e2';
        feedbackDiv.style.borderLeft = '4px solid #ef4444';
        feedbackDiv.innerHTML = `
                                                                                                                                                                        <p style="margin: 0; color: #991b1b; font-weight: 600; margin-bottom: 8px;">❌ Incorrect</p>
                                                                                                                                                                        <p style="margin: 0; color: #b91c1c; line-height: 1.6;">${explanation}</p>
                                                                                                                                                                        `;
    }

    // Show next button
    if (nextBtn) {
        nextBtn.style.display = 'block';
    }

    // Smooth scroll to feedback
    feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

/**
 * Move to next quiz question
 * @param {number} currentIndex - Current question index
                                                                                                                                                                        * @param {number} totalQuestions - Total number of questions
                                                                                                                                                                        */
window.nextQuizQuestion = function (currentIndex, totalQuestions) {
    // Hide current question
    const currentCard = document.querySelector(`.quiz-question-card[data-question="${currentIndex}"]`);
    if (currentCard) {
        currentCard.style.display = 'none';
    }

    // Check if we're at the last question
    if (currentIndex === totalQuestions - 1) {
        // Show completion message
        const completeDiv = document.getElementById('quiz-complete');
        const finalScoreSpan = document.getElementById('final-score');
        const currentScore = document.getElementById('quiz-score').textContent;

        if (completeDiv && finalScoreSpan) {
            finalScoreSpan.textContent = currentScore;
            completeDiv.style.display = 'block';
            completeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        // Show next question
        const nextCard = document.querySelector(`.quiz-question-card[data-question="${currentIndex + 1}"]`);
        if (nextCard) {
            nextCard.style.display = 'block';
            nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
};

// Expose quiz generation function globally
window.generateModuleQuiz = generateModuleQuiz;

// NCS Image Gallery Navigation Function
window.navigateGallery = function (button, direction) {
    const gallery = button.closest('.ncs-image-gallery');
    const img = gallery.querySelector('.ncs-gallery-image');
    const images = JSON.parse(gallery.getAttribute('data-images'));
    const counter = gallery.querySelector('.gallery-counter');
    const leftBtn = gallery.querySelectorAll('button')[0];
    const rightBtn = gallery.querySelectorAll('button')[1];

    let currentIndex = parseInt(gallery.getAttribute('data-current-index') || '0');
    currentIndex = (currentIndex + direction + images.length) % images.length;
    gallery.setAttribute('data-current-index', currentIndex);

    img.src = images[currentIndex];
    counter.textContent = `${currentIndex + 1} / ${images.length}`;

    // Show/hide arrows based on position
    leftBtn.style.display = currentIndex === 0 ? 'none' : 'block';
    rightBtn.style.display = currentIndex === images.length - 1 ? 'none' : 'block';
};

// NCS Techniques Videos/Pictures Toggle Function
window.showNCSContentType = function (type) {
    const videosBtn = document.getElementById('ncs-videos-btn');
    const picturesBtn = document.getElementById('ncs-pictures-btn');
    const videosSection = document.getElementById('ncs-videos-section');
    const picturesSection = document.getElementById('ncs-pictures-section');

    if (type === 'videos') {
        // Activate Videos button
        videosBtn.classList.add('active');
        videosBtn.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
        videosBtn.style.color = 'white';
        videosBtn.style.borderColor = 'transparent';
        videosBtn.style.transform = 'scale(1.05)';
        videosBtn.style.boxShadow = '0 8px 25px rgba(20, 184, 166, 0.4)';

        // Deactivate Pictures button
        picturesBtn.classList.remove('active');
        picturesBtn.style.background = 'white';
        picturesBtn.style.color = '#64748b';
        picturesBtn.style.borderColor = 'rgba(139, 92, 246, 0.3)';
        picturesBtn.style.transform = '';
        picturesBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';

        // Show Videos, hide Pictures
        videosSection.style.display = 'block';
        picturesSection.style.display = 'none';
    } else if (type === 'pictures') {
        // Activate Pictures button
        picturesBtn.classList.add('active');
        picturesBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        picturesBtn.style.color = 'white';
        picturesBtn.style.borderColor = 'transparent';
        picturesBtn.style.transform = 'scale(1.05)';
        picturesBtn.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';

        // Deactivate Videos button
        videosBtn.classList.remove('active');
        videosBtn.style.background = 'white';
        videosBtn.style.color = '#64748b';
        videosBtn.style.borderColor = 'rgba(20, 184, 166, 0.3)';
        videosBtn.style.transform = '';
        videosBtn.style.boxShadow = '0 4px 15px rgba(20, 184, 166, 0.15)';

        // Show Pictures, hide Videos
        picturesSection.style.display = 'block';
        videosSection.style.display = 'none';
    }
};

console.log('✅ Universal Module Quiz System loaded');
