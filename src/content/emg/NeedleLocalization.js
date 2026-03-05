/**
 * EMG Needle Localization Content Module
 * UI Facelift: Pulls from NeedleLocalizationData.js
 */

import { NeedleLocalizationData } from './NeedleLocalizationData.js';

function getMuscleImagePath(muscleKey) {
    const imageMap = {
        'APB': 'images/Abductor Pollicus Brevis.png',
        'Bicep': 'images/Biceps.png',
        'EIP': 'images/Extensor Indicus.png',
        'FDI': 'images/First Dorsal Interosseous.png',
        'Middle Deltoid': 'images/Deltoid.png',
        'PT': 'images/Pronator teres.png',
        'Tricep': 'images/Triceps.png',
        'Extensor Hallucis': 'images/Extensor Hallucis longus.png',
        'Medial Gastroc': 'images/Medial Gastroc.png',
        'Peroneus Longus': 'images/Fibularis longus.png',
        'Tibialis Ant': 'images/Tibialis Anterior.png',
        'Tibialis Post': 'images/Tibialis Posterior.png',
        'Vastus Lateralis': 'images/Vastus Lateralis.png'
    };
    return imageMap[muscleKey] || null;
}

// Define the global handler for interactions
if (!window.EMGLocalization) {
    window.EMGLocalization = {
        selectedMuscle: null,
        selectedRegion: 'upper',

        switchRegion: function (region) {
            this.selectedRegion = region;

            // Update region button styles
            document.querySelectorAll('.region-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = document.getElementById(`${region}-region-btn`);
            if (activeBtn) activeBtn.classList.add('active');

            // Render muscle pills for selected region
            this.renderMusclePills(region);

            // Clear detail panel and show primer
            this.showPrimer();
        },

        showPrimer: function () {
            const detailPanel = document.getElementById('muscle-detail-content');
            if (!detailPanel) return;

            // Render the mentor-style primer card about needle basics
            detailPanel.innerHTML = `
                <div class="muscle-detail" style="animation: fadeInUp 0.4s ease;">
                    <div class="primer-card" style="background: linear-gradient(135deg, #ffffff, #f8fafc); border-radius: 16px; padding: 35px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-top: 5px solid #0ea5e9;">
                        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h3 style="margin: 0; font-size: 2em; font-weight: 800; background: linear-gradient(to right, #0284c7, #4f46e5); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Fundamentals of Needle Placement</h3>
                                <p style="margin: 8px 0 0 0; color: #64748b; font-size: 1.1em; font-weight: 500;">Resident Primer on EMG Safety and Technique</p>
                            </div>
                        </div>
                        
                        <div style="background: rgba(14, 165, 233, 0.05); border-left: 4px solid #0ea5e9; padding: 25px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                            <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1.3em;">Why Anatomy Matters</h4>
                            <p style="margin: 0; color: #334155; line-height: 1.7; font-size: 1.05em;">Unlike nerve conduction studies where we stimulate on the surface, needle electromyography is inherently invasive. A deviation of just a few millimeters can mean the difference between correctly sampling the target muscle, inadvertently sampling an adjacent muscle (false localization), or catastrophically striking a major neurovascular bundle.</p>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                            <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <strong style="color: #0284c7; display: block; margin-bottom: 8px; font-size: 1.1em;">1. The Golden Rule of Safety</strong>
                                <span style="color: #475569; font-size: 1em; line-height: 1.6;">Never blindly plunge the needle. Always physically palpate your bony landmarks and definitively identify the muscle belly before insertion. If you cannot feel the muscle contract under your fingers during a test maneuver, DO NOT insert the needle.</span>
                            </div>
                            <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <strong style="color: #0284c7; display: block; margin-bottom: 8px; font-size: 1.1em;">2. Depth Control</strong>
                                <span style="color: #475569; font-size: 1em; line-height: 1.6;">Most target muscles are surprisingly superficial. Advancing the needle too deeply is the single most common beginner error, leading to sampling of deeper 'bystander' muscles and erroneous neuroanatomic localization.</span>
                            </div>
                            <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <strong style="color: #0284c7; display: block; margin-bottom: 8px; font-size: 1.1em;">3. Activation Maneuvers</strong>
                                <span style="color: #475569; font-size: 1em; line-height: 1.6;">Once the needle is inserted, you must ask the patient to perform the specific 'Test Maneuver'. This confirms your placement (you will hear the crisp, staccato pop of motor units firing) and ensures you are evaluating the correct physiological action.</span>
                            </div>
                        </div>

                        <div style="margin-top: 35px; text-align: center; color: #94a3b8; font-size: 1em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            Select any muscle above to view its specific anatomical landmarks and clinical pearls
                        </div>
                    </div>
                </div>
            `;
        },

        renderMusclePills: function (region) {
            const container = document.getElementById('muscle-pill-container');
            if (!container) return;

            const muscles = region === 'upper'
                ? NeedleLocalizationData.upperExtremity
                : NeedleLocalizationData.lowerExtremity;

            const pillsHTML = Object.keys(muscles).map(abbrev => {
                const muscle = muscles[abbrev];
                return `
                    <div class="muscle-pill" onclick="EMGLocalization.selectMuscle('${abbrev}', '${region}')" data-muscle="${abbrev}">
                        <span class="muscle-pill-abbrev">${abbrev}</span>
                        <span class="muscle-pill-name">${muscle.fullName}</span>
                    </div>
                `;
            }).join('');

            container.innerHTML = pillsHTML;
        },

        selectMuscle: function (muscle, region) {
            this.selectedMuscle = muscle;
            this.selectedRegion = region;

            document.querySelectorAll('.muscle-pill').forEach(item => {
                item.classList.remove('active');
            });

            const selectedItem = document.querySelector(`.muscle-pill[data-muscle="${muscle}"]`);
            if (selectedItem) {
                selectedItem.classList.add('active');
            }

            const muscleData = region === 'upper'
                ? NeedleLocalizationData.upperExtremity[muscle]
                : NeedleLocalizationData.lowerExtremity[muscle];

            this.displayMuscleDetails({ ...muscleData, key: muscle });
        },

        displayMuscleDetails: function (muscleData) {
            const detailPanel = document.getElementById('muscle-detail-content');
            if (!detailPanel) return;

            const imagePath = getMuscleImagePath(muscleData.key || '');
            const imageHTML = imagePath ? `
                <div style="margin-bottom: 30px; text-align: center;">
                    <img src="${imagePath}"
                            alt="${muscleData.fullName} needle insertion"
                            style="width: 100%; max-width: 600px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 2px solid #e2e8f0;"
                            onerror="this.parentElement.innerHTML='<div class=\\'image-placeholder\\'><div class=\\'image-placeholder-icon\\'></div><p><strong>Image not found</strong></p><p>${muscleData.fullName}</p></div>'">
                </div>
            ` : '';

            const detailHTML = `
                <div class="muscle-detail" style="animation: fadeInUp 0.4s ease;">
                    <div class="muscle-title" style="background: linear-gradient(135deg, #0d9488, #0f766e); color: white; padding: 25px; border-radius: 16px; margin-bottom: 25px; box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);">
                        <h4 style="margin: 0 0 8px 0; font-size: 2em; font-weight: 800; letter-spacing: -0.02em;">${muscleData.fullName}</h4>
                        <p style="margin: 0; color: #ccfbf1; font-size: 1.1em; font-weight: 500;">${muscleData.innervation}</p>
                    </div>

                    ${imageHTML}

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 20px;">
                        <div class="info-card" style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #6366f1;">
                            <h5 style="margin: 0 0 12px 0; color: #4f46e5; font-size: 1.1em; font-weight: 700;">Patient Position</h5>
                            <p style="margin: 0; color: #334155; line-height: 1.6;">${muscleData.position}</p>
                        </div>

                        <div class="info-card" style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
                            <h5 style="margin: 0 0 12px 0; color: #059669; font-size: 1.1em; font-weight: 700;">Electrode Insertion</h5>
                            <p style="margin: 0; color: #334155; line-height: 1.6; font-weight: 500;">${muscleData.electrodeInsertion}</p>
                        </div>
                    </div>

                    <div class="info-card" style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #f59e0b; margin-bottom: 20px;">
                        <h5 style="margin: 0 0 12px 0; color: #d97706; font-size: 1.1em; font-weight: 700;">Test Maneuver</h5>
                        <p style="margin: 0; color: #334155; line-height: 1.6;">${muscleData.testManeuver}</p>
                    </div>

                    <div class="pearl-card" style="background: linear-gradient(135deg, #fef2f2, #fee2e2); border-radius: 12px; padding: 25px; border-left: 6px solid #ef4444; margin-bottom: 20px;">
                        <h5 style="margin: 0 0 12px 0; color: #b91c1c; font-size: 1.2em; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                            Clinical Pitfall
                        </h5>
                        <p style="margin: 0; color: #7f1d1d; line-height: 1.6; font-size: 1.05em;">${muscleData.pitfalls}</p>
                    </div>

                    <div class="pearl-card" style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 12px; padding: 25px; border-left: 6px solid #0ea5e9;">
                        <h5 style="margin: 0 0 12px 0; color: #0369a1; font-size: 1.2em; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                            Resident Pearl
                        </h5>
                        <p style="margin: 0; color: #0c4a6e; line-height: 1.6; font-size: 1.05em;">${muscleData.pearl}</p>
                    </div>
                </div>
            `;

            detailPanel.innerHTML = detailHTML;
        }
    };
}

export const NeedleLocalization = {
    generateContent(module) {
        console.log('UI FACELIFT VERSION LOADED - EMG Needle Localization v20251002');

        // Define helpers locally if not global yet (though we defined them above)
        // Ensure initialization triggers
        setTimeout(() => {
            if (window.EMGLocalization) {
                window.EMGLocalization.switchRegion('upper');
            }
        }, 100);

        return `
        <div class="emg-localization-container">
            <!-- Hero Section with Animated Gradient -->
            <div class="emg-hero">
                <div class="hero-content">
                    <h1 class="hero-title">EMG Needle Localization Guide</h1>
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

            <!-- Compact Control Bar -->
            <div class="control-bar">
                <div class="control-section">
                    <h4>Select Region</h4>
                    <div class="region-selector">
                        <button class="region-btn active" id="upper-region-btn" onclick="EMGLocalization.switchRegion('upper')">
                            Upper Extremity
                        </button>
                        <button class="region-btn" id="lower-region-btn" onclick="EMGLocalization.switchRegion('lower')">
                            Lower Extremity
                        </button>
                    </div>
                </div>
            </div>

            <!-- Muscle Pill Selector -->
            <div class="muscle-pill-container" id="muscle-pill-container">
                <!-- Will be populated by JavaScript -->
            </div>

            <!-- Main Content Area (Full Width) -->
            <div class="muscle-detail-panel">
                <div class="detail-placeholder" id="muscle-detail-content">
                    <!-- Populated by JS primer or selected muscle -->
                </div>
            </div>
            
            <!-- Quiz Section -->
            ${generateModuleQuiz([
            {
                question: "Which nerve innervates the Abductor Pollicis Brevis (APB)?",
                options: [
                    "Ulnar Nerve",
                    "Radial Nerve",
                    "Median Nerve",
                    "Musculocutaneous Nerve"
                ],
                correct: 2,
                explanation: "The APB is innervated by the MEDIAN NERVE (C8, T1). It is the most distal muscle innervated by the median nerve and is critical for thumb abduction."
            },
            {
                question: "What are the primary root levels for the Tibialis Anterior?",
                options: [
                    "L2, L3",
                    "L3, L4",
                    "L4, L5",
                    "S1, S2"
                ],
                correct: 2,
                explanation: "The Tibialis Anterior is primarily innervated by the L4 and L5 nerve roots (Deep Peroneal Nerve). It is a key muscle for dorsiflexion."
            },
            {
                question: "The Medial Head of the Gastrocnemius is innervated by which nerve?",
                options: [
                    "Common Peroneal Nerve",
                    "Tibial Nerve",
                    "Femoral Nerve",
                    "Obturator Nerve"
                ],
                correct: 1,
                explanation: "The Gastrocnemius (both heads) is innervated by the TIBIAL NERVE (S1, S2). It is a powerful plantar flexor."
            },
            {
                question: "Where is the correct electrode insertion point for the Middle Deltoid?",
                options: [
                    "At the coracoid process",
                    "Halfway between the acromion and the deltoid tubercle",
                    "At the deltoid tubercle",
                    "Posterior to the acromion"
                ],
                correct: 1,
                explanation: "The needle should be inserted into the bulk of the muscle, HALFWAY between the tip of the acromion and the deltoid tubercle."
            },
            {
                question: "Which nerve innervates the Pronator Teres?",
                options: [
                    "Ulnar Nerve",
                    "Radial Nerve",
                    "Median Nerve",
                    "Musculocutaneous Nerve"
                ],
                correct: 2,
                explanation: "The Pronator Teres is innervated by the MEDIAN NERVE (C6, C7). It is the most proximal muscle innervated by the median nerve in the forearm."
            },
            {
                question: "The First Dorsal Interosseous (FDI) is innervated by:",
                options: [
                    "Median Nerve (C8, T1)",
                    "Ulnar Nerve (C8, T1)",
                    "Radial Nerve (C7, C8)",
                    "Axillary Nerve (C5, C6)"
                ],
                correct: 1,
                explanation: "The FDI is innervated by the ULNAR NERVE (C8, T1). It is the most distal ulnar-innervated muscle and is used to test ulnar nerve integrity."
            },
            {
                question: "Which nerve supplies the Vastus Lateralis?",
                options: [
                    "Sciatic Nerve",
                    "Obturator Nerve",
                    "Femoral Nerve",
                    "Tibial Nerve"
                ],
                correct: 2,
                explanation: "The Vastus Lateralis (part of the Quadriceps) is innervated by the FEMORAL NERVE (L2, L3, L4)."
            },
            {
                question: "What is a potential pitfall when inserting the needle too deeply into the Pronator Teres?",
                options: [
                    "Hitting the Brachial Artery",
                    "Entering the Flexor Digitorum Sublimis",
                    "Entering the Biceps Brachii",
                    "Hitting the Radius bone"
                ],
                correct: 1,
                explanation: "If the needle is inserted too deeply into the Pronator Teres, it may enter the FLEXOR DIGITORUM SUBLIMIS, which lies deep to it."
            },
            {
                question: "What is the correct patient position for examining the Biceps Brachii?",
                options: [
                    "Prone with arm abducted",
                    "Sitting with arm flexed",
                    "Supine with arm extended",
                    "Side-lying"
                ],
                correct: 2,
                explanation: "The patient should be SUPINE with the arm EXTENDED. This relaxes the muscle and allows for proper localization."
            },
            {
                question: "Which maneuver tests the Tibialis Posterior?",
                options: [
                    "Dorsiflexion of the foot",
                    "Eversion of the foot",
                    "Inversion of the foot in plantar flexion",
                    "Extension of the big toe"
                ],
                correct: 2,
                explanation: "The Tibialis Posterior is tested by asking the patient to INVERT the foot while it is in PLANTAR FLEXION. It is the primary inverter of the foot."
            }
        ])}
        </div>

        <style>
            /* Advanced Premium Light Theme Styling */
            @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .emg-localization-container {
                font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
                max-width: 1400px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                border: 1px solid #e2e8f0;
            }

            /* Responsive container adjustments for the quiz component if necessary */
            .emg-localization-container .quiz-container {
                background: #f8fafc !important;
                border-top: 1px solid #e2e8f0 !important;
            }

            /* Hero Section */
            .emg-hero {
                background: linear-gradient(135deg, #0ea5e9, #4f46e5, #8b5cf6, #0ea5e9);
                background-size: 300% 300%;
                animation: gradient-shift 15s ease infinite;
                padding: 60px 40px;
                margin: 0;
                text-align: center;
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
                background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwaC04djhaIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==') repeat;
                opacity: 0.5;
                z-index: 1;
            }

            .emg-hero .hero-content {
                position: relative;
                z-index: 2;
            }

            .hero-title {
                font-size: 3rem;
                color: white;
                margin-bottom: 15px;
                font-weight: 800;
                letter-spacing: -0.02em;
                text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .hero-subtitle {
                font-size: 1.2rem;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 35px;
                font-weight: 500;
                letter-spacing: 0.05em;
            }

            .hero-stats {
                display: flex;
                justify-content: center;
                gap: 25px;
                flex-wrap: wrap;
            }

            .stat-card {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(12px);
                border-radius: 16px;
                padding: 20px 35px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                min-width: 140px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .stat-card:hover {
                transform: translateY(-8px);
                background: rgba(255, 255, 255, 0.25);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }

            .stat-number {
                font-size: 2.5rem;
                font-weight: 800;
                color: white;
                margin-bottom: 5px;
                line-height: 1;
            }

            .stat-label {
                font-size: 0.85rem;
                color: rgba(255, 255, 255, 0.9);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-weight: 600;
            }

            /* Control Bar */
            .control-bar {
                background: white;
                border-bottom: 1px solid #e2e8f0;
                padding: 25px 40px;
                display: flex;
                justify-content: center;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                position: relative;
                z-index: 10;
            }

            .control-section {
                text-align: center;
            }

            .control-section h4 {
                color: #64748b;
                font-size: 0.9rem;
                font-weight: 700;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 0.15em;
            }

            .region-selector {
                display: flex;
                gap: 15px;
                background: #f1f5f9;
                padding: 8px;
                border-radius: 50px;
                border: 1px solid #e2e8f0;
            }

            .region-btn {
                padding: 14px 40px;
                border: none;
                border-radius: 40px;
                background: transparent;
                color: #64748b;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1.05rem;
            }

            .region-btn:hover {
                color: #0f172a;
                background: white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }

            .region-btn.active {
                background: linear-gradient(135deg, #0ea5e9, #4f46e5);
                color: white;
                font-weight: 700;
                box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
            }

            /* Muscle Pill Selector */
            .muscle-pill-container {
                padding: 30px 40px;
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                justify-content: center;
            }

            .muscle-pill {
                padding: 12px 28px;
                border: 1px solid #cbd5e1;
                border-radius: 30px;
                background: white;
                color: #475569;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 1rem;
                box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            }

            .muscle-pill:hover {
                background: #f0f9ff;
                border-color: #7dd3fc;
                transform: translateY(-2px);
                color: #0284c7;
                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
            }

            .muscle-pill.active {
                background: linear-gradient(135deg, #0ea5e9, #4f46e5);
                color: white;
                font-weight: 700;
                border-color: transparent;
                box-shadow: 0 8px 20px rgba(14, 165, 233, 0.25);
            }

            .muscle-pill-abbrev {
                font-weight: 800;
                margin-right: 8px;
                color: inherit;
            }

            .muscle-pill-name {
                font-weight: 500;
                opacity: 0.8;
            }

            .muscle-pill.active .muscle-pill-name {
                opacity: 1;
            }

            /* Content Panel Background */
            .muscle-detail-panel {
                padding: 40px;
                background: #f1f5f9;
                min-height: 500px;
            }

            .placeholder-content {
                text-align: center;
                padding: 60px 40px;
                color: #64748b;
                background: white;
                border-radius: 16px;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                border: 1px dashed #cbd5e1;
            }

            .placeholder-content h4 {
                color: #334155;
                margin-bottom: 20px;
                font-size: 1.5em;
                font-weight: 700;
            }

            .placeholder-content ul {
                text-align: left;
                max-width: 500px;
                margin: 20px auto 0;
                line-height: 1.8;
            }

            .placeholder-content li {
                margin-bottom: 10px;
                color: #475569;
            }

            /* Selected Muscle Detail Styles */
            .muscle-detail {
                animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .muscle-title {
                background: linear-gradient(135deg, #0ea5e9, #4f46e5);
                color: white;
                padding: 28px;
                border-radius: 16px;
                margin-bottom: 30px;
                box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.2);
                border: none;
            }

            .muscle-title h4 {
                margin: 0 0 10px 0;
                font-size: 1.8em;
                font-weight: 800;
            }

            .muscle-subtitle {
                color: #e0e7ff;
                font-size: 1.15em;
                margin: 0;
                font-weight: 500;
            }

            .detail-section {
                background: white;
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 20px;
                border-left: 4px solid #3b82f6;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
                border-top: 1px solid #f1f5f9;
                border-right: 1px solid #f1f5f9;
                border-bottom: 1px solid #f1f5f9;
            }

            .detail-section:hover {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
                color: #334155;
                line-height: 1.8;
                margin: 0;
                font-size: 1.05em;
                font-weight: 400;
            }

            .image-placeholder {
                background: #f8fafc;
                border: 2px dashed #cbd5e1;
                border-radius: 16px;
                padding: 50px;
                text-align: center;
                color: #64748b;
                margin-bottom: 25px;
                transition: all 0.3s ease;
            }

            .image-placeholder:hover {
                border-color: #0ea5e9;
                background: #f0f9ff;
            }

            .image-placeholder-icon {
                font-size: 3.5em;
                margin-bottom: 16px;
                opacity: 0.6;
            }

            .image-placeholder p {
                margin: 8px 0;
                font-weight: 500;
            }

            /* Electrode Insertion Section - GREEN HIGHLIGHT */
            .detail-section.electrode-insertion {
                border-left: 4px solid #10b981;
                background: linear-gradient(135deg, #ffffff, #ecfdf5);
                box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);
            }

            .detail-section.electrode-insertion h5 {
                color: #059669;
            }

            /* Pitfalls Section - RED HIGHLIGHT */
            .detail-section.pitfalls {
                border-left: 4px solid #ef4444;
                background: linear-gradient(135deg, #ffffff, #fef2f2);
                box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.1);
            }

            .detail-section.pitfalls h5 {
                color: #dc2626;
            }

            /* MOBILE RESPONSIVENESS */
            @media (max-width: 480px) {
                .emg-localization-container {
                    border-radius: 10px;
                }

                /* Hero section */
                .emg-hero {
                    padding: 30px 20px !important;
                    border-radius: 10px 10px 0 0;
                }

                .hero-title {
                    font-size: 1.8rem !important;
                }

                .hero-subtitle {
                    font-size: 1rem !important;
                }

                /* Control bar */
                .control-bar {
                    padding: 15px 20px !important;
                }

                .region-btn {
                    padding: 12px 20px !important;
                    font-size: 0.95rem !important;
                    width: 100%;
                }

                /* Muscle pills */
                .muscle-pill-container {
                    padding: 15px 20px !important;
                    gap: 8px;
                    justify-content: center;
                }

                .muscle-pill {
                    padding: 10px 18px !important;
                    font-size: 0.9rem !important;
                    flex: 1 1 auto; /* Make pills flexible */
                    text-align: center;
                }

                /* Content panel */
                .muscle-detail-panel {
                    padding: 20px 15px !important;
                }
            }
            }
        </style>
        `;
    }
};
