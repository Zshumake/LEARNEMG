// Plexus Anatomy Module
// Detailed brachial and lumbosacral plexus anatomy

import { registerModulePodcasts, generateErnestButton } from '../podcast-player.js';

export function generateContent(module) {
    // Register podcast for this module
    registerModulePodcasts('plexus-anatomy');

    return `
        <div class="interactive-content" style="position: relative;">${generateErnestButton()}
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #fef2f2, #fee2e2); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #dc2626;">
                <h3 style="color: #b91c1c; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #991b1b; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master brachial and lumbosacral plexus anatomy including nerve root organization, pathway tracing, and clinical correlations essential for EMG interpretation and localization.
                </p>
            </div>

            <!-- Pathway Explorer Section -->
            <div style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #0ea5e9;">
                <h4 style="color: #0c4a6e; margin-bottom: 20px; font-size: 1.4em;">📍 Interactive Pathway Explorer</h4>
                <p style="color: #0369a1; margin-bottom: 25px; font-size: 1.1em;">
                    Explore nerve pathways with step-by-step progression and memorable stories. Each nerve's journey is broken down into key anatomical landmarks.
                </p>

                <!-- Nerve Selector -->
                <div class="nerve-selector" id="nerve-selector" style="margin-bottom: 30px;">
                    <h5 style="color: #075985; margin-bottom: 15px; font-size: 1.2em;">🧠 Choose a nerve to explore:</h5>
                    <div class="nerve-buttons" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div class="nerve-group" style="background: #f0f9ff; border-radius: 12px; padding: 20px; border: 2px solid #0ea5e9;">
                            <h6 style="color: #0c4a6e; margin-bottom: 15px; text-align: center; font-size: 1.1em; font-weight: 600;">💪 Upper Extremity</h6>
                            <button class="nerve-btn" onclick="selectNerve('median')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🖐️ Median Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('ulnar')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🤏 Ulnar Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('radial')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">👍 Radial Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('musculocutaneous')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">💪 Musculocutaneous</button>
                            <button class="nerve-btn" onclick="selectNerve('axillary')" style="display: block; width: 100%; margin-bottom: 0; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🤲 Axillary Nerve</button>
                        </div>
                        <div class="nerve-group" style="background: #f0f9ff; border-radius: 12px; padding: 20px; border: 2px solid #0ea5e9;">
                            <h6 style="color: #0c4a6e; margin-bottom: 15px; text-align: center; font-size: 1.1em; font-weight: 600;">🦵 Lower Extremity</h6>
                            <button class="nerve-btn" onclick="selectNerve('femoral')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🦵 Femoral Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('tibial')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🦶 Tibial Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('peroneal')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🚶 Peroneal Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('sciatic')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🦴 Sciatic Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('obturator')" style="display: block; width: 100%; margin-bottom: 0; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🔀 Obturator Nerve</button>
                        </div>
                    </div>
                </div>

                <!-- Pathway Display -->
                <div class="pathway-container" id="pathway-container" style="display: none;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 25px;">
                        <div class="pathway-steps">
                            <h5 style="color: #0c4a6e; margin-bottom: 20px; font-size: 1.2em;">🗺️ Nerve Pathway</h5>
                            <div id="pathway-steps" style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #bae6fd; min-height: 200px; cursor: default; transition: all 0.3s ease; position: relative;">
                                <p style="color: #64748b; text-align: center; margin-top: 60px;">Select a nerve to see pathway steps</p>
                            </div>
                            <div style="text-align: center; margin-top: 15px;">
                                <button onclick="previousStep()" id="prev-btn" style="background: #0ea5e9; color: white; border: none; padding: 8px 15px; border-radius: 6px; margin-right: 10px; cursor: pointer;" disabled>← Previous</button>
                                <button onclick="resetPathway()" style="background: #64748b; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;">Reset</button>
                            </div>
                        </div>

                        <div class="pathway-image-section">
                            <h5 style="color: #0c4a6e; margin-bottom: 20px; font-size: 1.2em;">🖼️ Anatomical Diagram</h5>
                            <div id="nerve-pathway-image" style="background: white; border: 2px solid #bae6fd; border-radius: 12px; padding: 20px; text-align: center; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                                <div style="text-align: center;">
                                    <div style="font-size: 3em; margin-bottom: 15px; color: #94a3b8;">🧠</div>
                                    <p style="color: #64748b;">Select a nerve to view anatomical pathway</p>
                                    <p style="color: #94a3b8; font-size: 0.9em; margin-top: 10px;">[Image placeholder - pathway diagram will appear here]</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Memory Story Section -->
                    <div class="story-section" style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #bae6fd;">
                        <h5 style="color: #0c4a6e; margin-bottom: 15px; font-size: 1.2em;">📖 Memory Story</h5>
                        <div id="story-text" style="color: #374151; line-height: 1.7; font-size: 1.05em;">
                            Select a nerve to begin the journey through your anatomical adventure!
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clinical Applications -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🏥 Clinical Applications</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 12px;">
                        <h5 style="color: #ea580c; margin-bottom: 15px;">EMG Localization Strategy</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>Root vs. plexus vs. peripheral nerve</li>
                            <li>Muscle selection for EMG needle examination</li>
                            <li>Paraspinal muscle significance</li>
                            <li>Anatomical vs. functional localization</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px;">
                        <h5 style="color: #ea580c; margin-bottom: 15px;">Common Clinical Scenarios</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>Cervical radiculopathy vs. carpal tunnel</li>
                            <li>Lumbar radiculopathy vs. peroneal neuropathy</li>
                            <li>Brachial plexopathy patterns</li>
                            <li>Thoracic outlet syndrome</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        <script>
            // Pathway Explorer JavaScript - defined in global scope
            console.log("DEBUG FORCE INITIALIZING PATHWAY EXPLORER WITH INJURY SITES!");
            window.pathwayExplorer = {};
                window.pathwayExplorer = {};

                window.pathwayExplorer.currentNerve = null;
                window.pathwayExplorer.currentStep = 0;
                window.pathwayExplorer.maxSteps = 0;

                window.pathwayExplorer.nerveData = {
                    median: {
                        name: "Median Nerve",
                        roots: "C6-T1",
                        story: "The Median Messenger starts his epic journey at the bustling Brachial Plexus Central Station (C6-T1), where lateral and medial cords shake hands to form our hero. He travels down the arm like a VIP, riding the bicipital groove limousine between the Biceps and Brachialis neighborhoods. At the Cubital Fossa rest stop, he takes a breather medial to the brachial artery before squeezing through the narrow Pronator Teres tunnel. His faithful sidekick, the Anterior Interosseous branch, splits off to handle the deep muscle work while our main character continues toward his final destination: the infamous Carpal Tunnel! After surviving this tight squeeze, he emerges victorious in the hand, ready to command the LOAF muscles like a general commanding his troops!",
                        steps: [
                            {title: "Origin", desc: "Forms from lateral and medial cords of brachial plexus (C6-T1)", isInjurySite: false},
                            {title: "Upper Arm", desc: "Travels medially to humerus in bicipital groove", isInjurySite: false},
                            {title: "Cubital Fossa", desc: "Passes medial to brachial artery", isInjurySite: false},
                            {title: "Forearm Entry", desc: "Passes between heads of pronator teres (common entrapment site)", isInjurySite: true},
                            {title: "AIN Branch", desc: "Gives off anterior interosseous nerve", isInjurySite: false},
                            {title: "Carpal Tunnel", desc: "Passes through carpal tunnel under transverse carpal ligament (most common entrapment)", isInjurySite: true},
                            {title: "Hand", desc: "Divides into branches for thenar muscles (LOAF)", isInjurySite: false}
                        ]
                    },
                    ulnar: {
                        name: "Ulnar Nerve",
                        roots: "C8-T1",
                        story: "The Ulnar Underdog begins as the lone ranger from the medial cord, carrying the pure power of C8 and T1. He travels down the arm, taking the scenic route around the medial epicondyle at the elbow - that famous 'funny bone' spot where everyone's felt his electric personality! He slides through Guyon's canal at the wrist like a secret agent, then splits his mission: the deep branch heads to the interossei (the hand's fine motor specialists), while the superficial branch handles sensation for the pinky side of life.",
                        steps: [
                            {title: "Origin", desc: "Arises from medial cord of brachial plexus (C8-T1)", isInjurySite: false},
                            {title: "Upper Arm", desc: "Travels down medial aspect of arm", isInjurySite: false},
                            {title: "Cubital Tunnel", desc: "Passes through cubital tunnel under Osborne's band behind medial epicondyle (most common entrapment)", isInjurySite: true},
                            {title: "Forearm", desc: "Travels between FCU and FDP in forearm", isInjurySite: false},
                            {title: "Guyon's Canal", desc: "Passes through Guyon's canal at wrist (volar carpal ligament roof)", isInjurySite: true},
                            {title: "Hand Division", desc: "Splits into superficial and deep branches", isInjurySite: false},
                            {title: "Hand Muscles", desc: "Innervates intrinsic hand muscles and sensation", isInjurySite: false}
                        ]
                    },
                    radial: {
                        name: "Radial Nerve",
                        roots: "C5-T1",
                        story: "The Radial Rebel is the strong, silent type from the posterior cord, packing the full power of C5-T1. This mighty nerve takes the back route down the arm, spiraling around the humerus in the famous spiral groove like a roller coaster. He's the extension expert, powering all the muscles that straighten the elbow, lift the wrist, and extend the fingers. His most vulnerable moment comes at the spiral groove, where a broken humerus can leave him bruised and beaten, causing the dreaded 'wrist drop.'",
                        steps: [
                            {title: "Origin", desc: "Arises from posterior cord (C5-T1)", isInjurySite: false},
                            {title: "Spiral Groove", desc: "Travels in spiral groove of humerus directly on bone (most vulnerable point for compression/fracture)", isInjurySite: true},
                            {title: "Lateral Arm", desc: "Emerges laterally, pierces lateral intermuscular septum", isInjurySite: false},
                            {title: "Elbow Division", desc: "Divides into superficial and deep (PIN) branches", isInjurySite: false},
                            {title: "Posterior Forearm", desc: "PIN passes through arcade of Frohse at supinator (compression site)", isInjurySite: true},
                            {title: "Dorsal Hand", desc: "Superficial branch provides dorsal hand sensation", isInjurySite: false}
                        ]
                    },
                    musculocutaneous: {
                        name: "Musculocutaneous Nerve",
                        roots: "C5-C7",
                        story: "The Musculocutaneous Marvel begins at the lateral cord headquarters in the brachial plexus, carrying orders from C5-C7. This sturdy nerve pierces through the coracobrachialis muscle like a determined warrior, then travels between the biceps brachii and brachialis muscles, supervising their every flex. As it approaches the elbow, it transforms into the lateral cutaneous nerve of the forearm, spreading its sensory network across the lateral forearm like a protective shield.",
                        steps: [
                            {title: "Origin", desc: "Arises from lateral cord of brachial plexus (C5-C7)", isInjurySite: false},
                            {title: "Coracobrachialis", desc: "Pierces coracobrachialis muscle", isInjurySite: false},
                            {title: "Biceps Brachii", desc: "Innervates biceps brachii", isInjurySite: false},
                            {title: "Brachialis", desc: "Innervates lateral part of brachialis", isInjurySite: false},
                            {title: "Lateral Cutaneous", desc: "Becomes lateral cutaneous nerve of forearm", isInjurySite: false},
                            {title: "Forearm Sensation", desc: "Provides sensation to lateral forearm", isInjurySite: false}
                        ]
                    },
                    axillary: {
                        name: "Axillary Nerve",
                        roots: "C5-C6",
                        story: "The Axillary Ambassador emerges from the posterior cord, carrying the strength of C5 and C6. This diplomatic nerve travels posteriorly around the surgical neck of the humerus, navigating through the quadrilateral space like a secret agent. It has two important missions: powering the mighty deltoid muscle and providing sensation to the shoulder's badge of honor - that small patch of skin over the deltoid that soldiers call the 'regimental patch'.",
                        steps: [
                            {title: "Origin", desc: "Arises from posterior cord (C5-C6)", isInjurySite: false},
                            {title: "Quadrilateral Space", desc: "Passes through quadrilateral space", isInjurySite: false},
                            {title: "Surgical Neck", desc: "Wraps around surgical neck of humerus (vulnerable to fracture)", isInjurySite: true},
                            {title: "Deltoid Motor", desc: "Innervates deltoid muscle", isInjurySite: false},
                            {title: "Teres Minor", desc: "Innervates teres minor muscle", isInjurySite: false},
                            {title: "Cutaneous Branch", desc: "Provides sensation over deltoid (regimental patch)", isInjurySite: false}
                        ]
                    },
                    femoral: {
                        name: "Femoral Nerve",
                        roots: "L2-L4",
                        story: "The Femoral General emerges from the lumbar plexus with the authority of L2-L4. This commanding nerve travels under the inguinal ligament like a VIP passing through customs, then spreads its influence across the anterior thigh. It's the knee extension expert, powering the mighty quadriceps muscle group while also providing sensation down the medial leg via its saphenous branch - the longest sensory nerve in the body!",
                        steps: [
                            {title: "Origin", desc: "Forms from lumbar plexus (L2-L4)", isInjurySite: false},
                            {title: "Inguinal Ligament", desc: "Passes under inguinal ligament", isInjurySite: false},
                            {title: "Femoral Triangle", desc: "Enters femoral triangle", isInjurySite: false},
                            {title: "Quadriceps", desc: "Innervates quadriceps muscle group", isInjurySite: false},
                            {title: "Saphenous Branch", desc: "Gives off saphenous nerve", isInjurySite: false},
                            {title: "Medial Leg", desc: "Saphenous nerve provides sensation to medial leg", isInjurySite: false}
                        ]
                    },
                    tibial: {
                        name: "Tibial Nerve",
                        roots: "L4-S3",
                        story: "The Tibial Traveler is one half of the mighty sciatic nerve's legacy, carrying the plantarflexion power of L4-S3. After the sciatic nerve splits at the popliteal fossa, this nerve takes the deep route down the posterior leg, traveling through the tarsal tunnel at the ankle like a train through a mountain pass. It's the pointing-toes expert, controlling all the muscles that push the foot down and curl the toes.",
                        steps: [
                            {title: "Origin", desc: "Medial division of sciatic nerve (L4-S3)", isInjurySite: false},
                            {title: "Popliteal Fossa", desc: "Continues from sciatic bifurcation", isInjurySite: false},
                            {title: "Posterior Leg", desc: "Travels down posterior compartment", isInjurySite: false},
                            {title: "Plantarflexors", desc: "Innervates calf muscles and deep compartment", isInjurySite: false},
                            {title: "Tarsal Tunnel", desc: "Passes through tarsal tunnel under flexor retinaculum at medial ankle (entrapment site)", isInjurySite: true},
                            {title: "Foot Muscles", desc: "Divides into medial and lateral plantar nerves for intrinsic foot muscles", isInjurySite: false}
                        ]
                    },
                    peroneal: {
                        name: "Peroneal (Fibular) Nerve",
                        roots: "L4-S2",
                        story: "The Peroneal Pioneer, also known as the Common Fibular nerve, is an adventurous branch of the mighty sciatic nerve. This nerve loves taking the scenic route around the fibular head, making it vulnerable but vital for foot function. It splits into two explorers: the superficial peroneal (the ankle evertor) and the deep peroneal (the toe lifter), each with their own important territories to govern in the lower leg and foot.",
                        steps: [
                            {title: "Origin", desc: "Lateral division of sciatic nerve (L4-S2)", isInjurySite: false},
                            {title: "Fibular Head", desc: "Wraps around fibular neck through fibular tunnel (most common lower extremity mononeuropathy)", isInjurySite: true},
                            {title: "Superficial Branch", desc: "Gives off superficial peroneal nerve for ankle eversion", isInjurySite: false},
                            {title: "Deep Branch", desc: "Continues as deep peroneal nerve for ankle dorsiflexion", isInjurySite: false},
                            {title: "Anterior Tarsal Tunnel", desc: "Deep peroneal passes under inferior extensor retinaculum at ankle (rare entrapment)", isInjurySite: true},
                            {title: "Foot", desc: "Provides motor to foot extensors and sensation to dorsal foot and first web space", isInjurySite: false}
                        ]
                    },
                    sciatic: {
                        name: "Sciatic Nerve",
                        roots: "L4-S3",
                        story: "The Sciatic Supreme is the body's largest and most powerful nerve, combining the might of the lumbar and sacral plexuses. This heavyweight champion travels through the greater sciatic foramen, then runs down the posterior thigh like a mighty river. At the popliteal fossa, it typically splits into its two famous branches: the tibial nerve (the plantarflexion powerhouse) and the common peroneal nerve (the dorsiflexion dynamo).",
                        steps: [
                            {title: "Origin", desc: "Forms from sacral plexus (L4-S3)", isInjurySite: false},
                            {title: "Greater Sciatic Foramen", desc: "Exits pelvis through greater sciatic foramen", isInjurySite: false},
                            {title: "Posterior Thigh", desc: "Travels down posterior thigh", isInjurySite: false},
                            {title: "Hamstring Muscles", desc: "Innervates hamstring muscles", isInjurySite: false},
                            {title: "Popliteal Fossa", desc: "Reaches popliteal fossa", isInjurySite: false},
                            {title: "Bifurcation", desc: "Splits into tibial and common peroneal nerves", isInjurySite: false}
                        ]
                    },
                    obturator: {
                        name: "Obturator Nerve",
                        roots: "L2-L4",
                        story: "The Obturator Officer is a specialized nerve with a unique mission: controlling hip adduction. Born from the lumbar plexus, this nerve takes an unusual route through the obturator foramen (hence its name), like a secret tunnel through the pelvis. It divides into anterior and posterior branches to command the adductor muscle army, helping bring the legs together and stabilize the hip during walking.",
                        steps: [
                            {title: "Origin", desc: "Arises from lumbar plexus (L2-L4)", isInjurySite: false},
                            {title: "Obturator Foramen", desc: "Passes through obturator foramen", isInjurySite: false},
                            {title: "Anterior Branch", desc: "Splits into anterior branch", isInjurySite: false},
                            {title: "Posterior Branch", desc: "Splits into posterior branch", isInjurySite: false},
                            {title: "Adductor Muscles", desc: "Innervates adductor muscle group", isInjurySite: false},
                            {title: "Hip Sensation", desc: "Provides sensation to medial thigh", isInjurySite: false}
                        ]
                    }
                };
            }

            window.selectNerve = function(nerveName) {
                console.log('DEBUG selectNerve called with:', nerveName);
                const explorer = window.pathwayExplorer;
                if (!explorer.nerveData[nerveName]) return;

                explorer.currentNerve = explorer.nerveData[nerveName];
                console.log('DEBUG Selected nerve data:', explorer.currentNerve);
                console.log('DEBUG First step has isInjurySite?', explorer.currentNerve.steps[0].isInjurySite);
                explorer.currentStep = 0;
                explorer.maxSteps = explorer.currentNerve.steps.length;

                // Show pathway container
                document.getElementById('pathway-container').style.display = 'block';

                // Update story
                document.getElementById('story-text').innerHTML = explorer.currentNerve.story;

                // Update pathway image placeholder
                document.getElementById('nerve-pathway-image').innerHTML = \`
                    <div style="text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px; color: #0ea5e9;">🧠</div>
                        <h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 1.1em;">\${explorer.currentNerve.name}</h6>
                        <p style="color: #64748b;">Nerve Roots: \${explorer.currentNerve.roots}</p>
                        <p style="color: #94a3b8; font-size: 0.9em; margin-top: 15px; padding: 10px; background: #f1f5f9; border-radius: 6px;">[Anatomical pathway diagram placeholder - original images were removed due to size]</p>
                    </div>
                \`;

                // Reset and show first step
                window.showStep(0);

                // Update button states
                document.querySelectorAll('.nerve-btn').forEach(btn => {
                    btn.style.background = 'white';
                    btn.style.color = '#0c4a6e';
                });
                event.target.style.background = '#0ea5e9';
                event.target.style.color = 'white';
            };

            window.showStep = function(stepIndex) {
                console.log('DEBUG showStep called with index:', stepIndex);
                const explorer = window.pathwayExplorer;
                if (!explorer.currentNerve || stepIndex < 0 || stepIndex >= explorer.maxSteps) return;

                explorer.currentStep = stepIndex;
                const step = explorer.currentNerve.steps[stepIndex];
                console.log('DEBUG Current step:', step);
                console.log('DEBUG Has isInjurySite flag?', step.isInjurySite);

                // Update pathway steps display with RED for injury sites, GREEN for normal
                const stepsHtml = explorer.currentNerve.steps.map((s, i) => {
                    const isInjury = s.isInjurySite;
                    console.log('DEBUG Step ' + i + ': ' + s.title + ', isInjury:', isInjury);
                    const isPast = i < stepIndex;
                    const isCurrent = i === stepIndex;
                    const isFuture = i > stepIndex;

                    // Color scheme: RED for injury sites, GREEN for normal pathway
                    let borderColor, bgColor, textColor, icon;

                    if (isFuture) {
                        // Future steps - gray
                        borderColor = '#e5e7eb';
                        bgColor = '#f9fafb';
                        textColor = '#6b7280';
                        icon = \`\${i + 1}.\`;
                    } else if (isInjury) {
                        // Injury sites - RED
                        borderColor = '#dc2626';
                        bgColor = isCurrent ? '#fee2e2' : '#fef2f2';
                        textColor = isCurrent ? '#991b1b' : '#dc2626';
                        icon = \`⚠️ \${i + 1}.\`;
                    } else {
                        // Normal pathway - GREEN
                        borderColor = '#10b981';
                        bgColor = isCurrent ? '#f0fdf4' : '#ecfdf5';
                        textColor = isCurrent ? '#047857' : '#059669';
                        icon = \`\${i + 1}.\`;
                    }

                    return \`
                        <div style="padding: 10px; margin-bottom: 8px; border-radius: 8px; border-left: 4px solid \${borderColor}; background: \${bgColor};">
                            <div style="font-weight: 600; color: \${textColor}; margin-bottom: 4px;">
                                \${icon} \${s.title}
                            </div>
                            <div style="color: \${isFuture ? '#9ca3af' : '#374151'}; font-size: 0.95em;">
                                \${s.desc}
                            </div>
                        </div>
                    \`;
                }).join('');

                // Add click hint at the bottom if not at last step
                const clickHint = stepIndex === explorer.maxSteps - 1 ? '' :
                    '<div style="position: absolute; bottom: 10px; right: 15px; color: #94a3b8; font-size: 0.8em; opacity: 0.7;">Click anywhere to advance →</div>';

                document.getElementById('pathway-steps').innerHTML = stepsHtml + clickHint;

                // Update button states (only prev-btn now)
                document.getElementById('prev-btn').disabled = stepIndex === 0;
                document.getElementById('prev-btn').style.opacity = stepIndex === 0 ? '0.5' : '1';

                // Disable clicking if at last step, enable with hover effects if not
                const pathwayBox = document.getElementById('pathway-steps');
                if (stepIndex === explorer.maxSteps - 1) {
                    pathwayBox.style.cursor = 'default';
                    pathwayBox.onclick = null;
                    pathwayBox.onmouseover = null;
                    pathwayBox.onmouseout = null;
                } else {
                    pathwayBox.style.cursor = 'pointer';
                    pathwayBox.onclick = nextStep;
                    pathwayBox.onmouseover = function() {
                        this.style.backgroundColor = '#f0f9ff';
                        this.style.borderColor = '#0ea5e9';
                        this.style.transform = 'translateY(-2px)';
                        this.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.15)';
                    };
                    pathwayBox.onmouseout = function() {
                        this.style.backgroundColor = 'white';
                        this.style.borderColor = '#bae6fd';
                        this.style.transform = 'translateY(0)';
                        this.style.boxShadow = 'none';
                    };
                }
            };

            window.nextStep = function() {
                const explorer = window.pathwayExplorer;
                if (explorer.currentStep < explorer.maxSteps - 1) {
                    window.showStep(explorer.currentStep + 1);
                }
            };

            window.previousStep = function() {
                const explorer = window.pathwayExplorer;
                if (explorer.currentStep > 0) {
                    window.showStep(explorer.currentStep - 1);
                }
            };

            window.resetPathway = function() {
                const explorer = window.pathwayExplorer;
                if (explorer.currentNerve) {
                    window.showStep(0);
                }
            };
        </script>

        ${generateModuleQuiz([
            {
                question: "Through which anatomical structure does the median nerve pass at the wrist?",
                options: [
                    "Carpal tunnel",
                    "Guyon's canal",
                    "Cubital tunnel",
                    "Quadrilateral space"
                ],
                correct: 0,
                explanation: "The median nerve passes through the CARPAL TUNNEL at the wrist. After traveling down the arm through the bicipital groove and passing between the heads of pronator teres in the forearm, it enters this narrow passage before dividing into branches for the thenar muscles (LOAF)."
            },
            {
                question: "Where does the ulnar nerve pass at the elbow, traveling under Osborne's band behind the medial epicondyle?",
                options: [
                    "Through the carpal tunnel",
                    "Through the cubital tunnel (most common ulnar entrapment site)",
                    "Through the spiral groove",
                    "Between the heads of pronator teres"
                ],
                correct: 1,
                explanation: "The ulnar nerve passes through the CUBITAL TUNNEL under Osborne's band (the roof of the tunnel) behind the medial epicondyle at the elbow - the famous 'funny bone' spot. This is the most common site of ulnar nerve entrapment, with compression occurring at multiple potential sites including the arcade of Struthers, medial intermuscular septum, cubital tunnel proper, and the aponeurosis between FCU heads."
            },
            {
                question: "What is the most vulnerable anatomical location for radial nerve injury, particularly with humeral fractures?",
                options: [
                    "Guyon's canal",
                    "Carpal tunnel",
                    "Spiral groove of the humerus",
                    "Cubital tunnel"
                ],
                correct: 2,
                explanation: "The radial nerve travels in the SPIRAL GROOVE of the humerus like a roller coaster. This is the most vulnerable location - a humeral fracture at this site can cause the dreaded 'wrist drop' due to loss of wrist and finger extension."
            },
            {
                question: "After passing through Guyon's canal at the wrist, how does the ulnar nerve divide in the hand?",
                options: [
                    "Into superficial and deep branches",
                    "Into medial and lateral branches",
                    "Into anterior and posterior branches",
                    "It does not divide"
                ],
                correct: 0,
                explanation: "After sliding through Guyon's canal at the wrist like a secret agent, the ulnar nerve splits into SUPERFICIAL and DEEP branches. The deep branch heads to the interossei (fine motor specialists), while the superficial branch handles sensation for the pinky side."
            },
            {
                question: "The axillary nerve wraps around which anatomical structure and provides sensation to which area?",
                options: [
                    "Surgical neck of humerus; sensation over deltoid (regimental patch)",
                    "Spiral groove; dorsal hand",
                    "Medial epicondyle; pinky finger",
                    "Carpal tunnel; thenar eminence"
                ],
                correct: 0,
                explanation: "The axillary nerve wraps around the SURGICAL NECK OF THE HUMERUS after passing through the quadrilateral space. It innervates the deltoid muscle and provides sensation to that small patch of skin over the deltoid - the 'REGIMENTAL PATCH.'"
            }
        ])}
    `;
}


