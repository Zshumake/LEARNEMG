
export const PathwayExplorer = {
    // Initial State
    state: {
        currentNerve: null,
        currentStep: 0,
        maxSteps: 0,
        nerveData: {
            median: {
                name: "Median Nerve",
                roots: "C6-T1",
                story: "The Median Messenger starts his epic journey at the bustling Brachial Plexus Central Station (C6-T1), where lateral and medial cords shake hands to form our hero. He travels down the arm like a VIP, riding the bicipital groove limousine between the Biceps and Brachialis neighborhoods. At the Cubital Fossa rest stop, he takes a breather medial to the brachial artery before squeezing through the narrow Pronator Teres tunnel. His faithful sidekick, the Anterior Interosseous branch, splits off to handle the deep muscle work while our main character continues toward his final destination: the infamous Carpal Tunnel! After surviving this tight squeeze, he emerges victorious in the hand, ready to command the LOAF muscles like a general commanding his troops!",
                imagePath: "images/pathways/Median Nerve.png",
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
                story: "The Ulnar Underdog begins as the lone ranger from the medial cord, carrying the pure power of C8 and T1. He travels down the arm, taking the scenic route around the medial epicondyle at the elbow - that famous 'funny bone' spot where everyone's felt his electric personality! He slides through Guyon's canal at the wrist like a secret agent, then splits his mission: the deep branch heads to the interossei (the hand's fine motor specialists), while the superficial branch handles sensation for the pinky side of life.",
                imagePath: "images/pathways/Ulnar Nerve.png",
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
                story: "The Radial Rebel is the strong, silent type from the posterior cord, packing the full power of C5-T1. This mighty nerve takes the back route down the arm, spiraling around the humerus in the famous spiral groove like a roller coaster. He's the extension expert, powering all the muscles that straighten the elbow, lift the wrist, and extend the fingers. His most vulnerable moment comes at the spiral groove, where a broken humerus can leave him bruised and beaten, causing the dreaded 'wrist drop.'",
                imagePath: "images/pathways/Radial Nerve.png",
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
                story: "The Musculocutaneous Marvel begins at the lateral cord headquarters in the brachial plexus, carrying orders from C5-C7. This sturdy nerve pierces through the coracobrachialis muscle like a determined warrior, then travels between the biceps brachii and brachialis muscles, supervising their every flex. As it approaches the elbow, it transforms into the lateral cutaneous nerve of the forearm, spreading its sensory network across the lateral forearm like a protective shield.",
                imagePath: "images/pathways/Musculocutaneous Nerve.png",
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
                story: "The Axillary Ambassador emerges from the posterior cord, carrying the strength of C5 and C6. This diplomatic nerve travels posteriorly around the surgical neck of the humerus, navigating through the quadrilateral space like a secret agent. It has two important missions: powering the mighty deltoid muscle and providing sensation to the shoulder's badge of honor - that small patch of skin over the deltoid that soldiers call the 'regimental patch'.",
                imagePath: "images/pathways/Axillary Nerve.png",
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
                story: "The Femoral General emerges from the lumbar plexus with the authority of L2-L4. This commanding nerve travels under the inguinal ligament like a VIP passing through customs, then spreads its influence across the anterior thigh. It's the knee extension expert, powering the mighty quadriceps muscle group while also providing sensation down the medial leg via its saphenous branch - the longest sensory nerve in the body!",
                imagePath: "images/pathways/Femoral Nerve.png",
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
                story: "The Tibial Traveler is one half of the mighty sciatic nerve's legacy, carrying the plantarflexion power of L4-S3. After the sciatic nerve splits at the popliteal fossa, this nerve takes the deep route down the posterior leg, traveling through the tarsal tunnel at the ankle like a train through a mountain pass. It's the pointing-toes expert, controlling all the muscles that push the foot down and curl the toes.",
                imagePath: "images/pathways/Tibial Nerve.png",
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
                story: "The Peroneal Pioneer, also known as the Common Fibular nerve, is an adventurous branch of the mighty sciatic nerve. This nerve loves taking the scenic route around the fibular head, making it vulnerable but vital for foot function. It splits into two explorers: the superficial peroneal (the ankle evertor) and the deep peroneal (the toe lifter), each with their own important territories to govern in the lower leg and foot.",
                imagePath: "images/pathways/Peroneal Nerve.png",
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
                story: "The Sciatic Supreme is the body's largest and most powerful nerve, combining the might of the lumbar and sacral plexuses. This heavyweight champion travels through the greater sciatic foramen, then runs down the posterior thigh like a mighty river. At the popliteal fossa, it typically splits into its two famous branches: the tibial nerve (the plantarflexion powerhouse) and the common peroneal nerve (the dorsiflexion dynamo).",
                imagePath: "images/pathways/Sciatic Nerve.png",
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
                story: "The Obturator Operator is the adduction specialist of the thigh. Emerging from L2-L4, this nerve navigates through the obturator canal like a precise instrument. It's the 'squeeze' expert, controlling the muscles that pull the legs together (adduction) and acting as a guardian of hip stability.",
                imagePath: "images/pathways/Obturator Nerve.png",
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
                story: "The Sural Scout is the faithful sensory companion of the lower leg. Formed by the union of the medial sural cutaneous nerve (from the tibial) and the communicating branch (from the common peroneal), this nerve travels down the back of the calf like a dedicated rear guard. It passes behind the lateral malleolus - a key landmark! - and continues along the side of the foot, providing sensation to the postero-lateral leg and the lateral side of the foot and little toe.",
                imagePath: "images/pathways/Sural Nerve.png",
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
        if (!window.pathwayExplorer) {
            window.pathwayExplorer = this.state;
        } else {
            // If it exists, merge data to ensure we have everything
            Object.assign(window.pathwayExplorer.nerveData, this.state.nerveData);
        }
    },

    selectNerve(nerveName) {
        console.log('DEBUG: PathwayExplorer.selectNerve called with:', nerveName);
        const explorer = window.pathwayExplorer || this.state;

        if (!explorer.nerveData[nerveName]) {
            console.error('DEBUG: Nerve data MISSING for:', nerveName);
            return;
        }

        explorer.currentNerve = explorer.nerveData[nerveName];
        explorer.currentStep = 0;
        explorer.maxSteps = explorer.currentNerve.steps.length;

        // Show pathway container
        const container = document.getElementById('pathway-container');
        if (container) container.style.display = 'block';

        // Update story
        const storyText = document.getElementById('story-text');
        if (storyText) storyText.innerHTML = explorer.currentNerve.story;

        // Update image
        let imageContent;
        if (explorer.currentNerve.imagePath) {
            imageContent = `
                <div style="text-align: center;">
                    <h6 style="color: #0c4a6e; margin-bottom: 15px; font-size: 1.1em;">${explorer.currentNerve.name}</h6>
                    <img src="${explorer.currentNerve.imagePath}" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;" alt="${explorer.currentNerve.name} Pathway" onerror="this.src=''; this.alt='Image not found'; this.parentElement.innerHTML+='<br><small style=\\'color:#94a3b8\\'>Image missing (check paths)</small>';">
                    <p style="color: #64748b; margin-top: 10px; font-size: 0.9em;">Nerve Roots: ${explorer.currentNerve.roots}</p>
                </div>
            `;
        } else {
            imageContent = `
                <div style="text-align: center;">
                    <div style="font-size: 3em; margin-bottom: 15px; color: #0ea5e9;">🧠</div>
                    <h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 1.1em;">${explorer.currentNerve.name}</h6>
                    <p style="color: #64748b;">Nerve Roots: ${explorer.currentNerve.roots}</p>
                    <p style="color: #94a3b8; font-size: 0.9em; margin-top: 15px; padding: 10px; background: #f1f5f9; border-radius: 6px;">[Anatomical pathway diagram placeholder]</p>
                </div>
            `;
        }
        const imageContainer = document.getElementById('nerve-pathway-image');
        if (imageContainer) imageContainer.innerHTML = imageContent;

        // Reset and show first step
        PathwayExplorer.showStep(0);

        // Update button states
        document.querySelectorAll('.nerve-btn').forEach(btn => {
            btn.style.background = 'white';
            btn.style.color = '#0c4a6e';
        });
        // Note: Event handling might need adjustment if calling from non-event context
        if (typeof event !== 'undefined' && event && event.target && event.target.classList.contains('nerve-btn')) {
            event.target.style.background = '#0ea5e9';
            event.target.style.color = 'white';
        }
    },

    showStep(stepIndex) {
        const explorer = window.pathwayExplorer || this.state;
        const steps = explorer.currentNerve.steps;
        explorer.currentStep = stepIndex;

        const stepsHtml = steps.map((s, i) => {
            const isPast = i < stepIndex;
            const isCurrent = i === stepIndex;
            const isFuture = i > stepIndex;

            let bgColor = isCurrent ? '#f0f9ff' : (isPast ? '#f8fafc' : 'white');
            let borderColor = isCurrent ? '#0ea5e9' : (isPast ? '#cbd5e1' : '#e2e8f0');
            let textColor = isCurrent ? '#0369a1' : (isPast ? '#64748b' : '#94a3b8');

            // Injury site highlighting
            if (s.isInjurySite && (isCurrent || isPast)) {
                borderColor = '#ef4444';
                if (isCurrent) bgColor = '#fef2f2';
            }

            let icon = isPast ? '✓' : (i + 1) + '.';
            if (s.isInjurySite) icon = '⚠️';

            return `
                <div style="padding: 10px; margin-bottom: 8px; border-radius: 8px; border-left: 4px solid ${borderColor}; background: ${bgColor}; transition: all 0.3s ease;">
                    <div style="font-weight: 600; color: ${textColor}; margin-bottom: 4px;">
                        ${icon} ${s.title}
                    </div>
                    <div style="color: ${isFuture ? '#9ca3af' : '#374151'}; font-size: 0.95em;">
                        ${s.desc}
                    </div>
                </div>
            `;
        }).join('');

        const stepsContainer = document.getElementById('pathway-steps');
        if (stepsContainer) {
            stepsContainer.innerHTML = stepsHtml;

            // Add click handler to advance
            if (explorer.currentStep < explorer.maxSteps - 1) {
                stepsContainer.style.cursor = 'pointer';
                stepsContainer.onclick = function () { PathwayExplorer.nextStep(); };
                stepsContainer.title = "Click to advance to next step";
            } else {
                stepsContainer.style.cursor = 'default';
                stepsContainer.onclick = null;
                stepsContainer.title = "";
            }
        }

        // Update buttons
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.disabled = stepIndex === 0;
            prevBtn.style.opacity = stepIndex === 0 ? '0.5' : '1';
        }
    },

    nextStep() {
        const explorer = window.pathwayExplorer || this.state;
        if (explorer.currentStep < explorer.maxSteps - 1) {
            PathwayExplorer.showStep(explorer.currentStep + 1);
        }
    },

    previousStep() {
        const explorer = window.pathwayExplorer || this.state;
        if (explorer.currentStep > 0) {
            PathwayExplorer.showStep(explorer.currentStep - 1);
        }
    },

    resetPathway() {
        const explorer = window.pathwayExplorer || this.state;
        if (explorer.currentNerve) {
            PathwayExplorer.showStep(0);
        }
    }
};

// Expose to window for backward compatibility
window.selectNerve = PathwayExplorer.selectNerve;
window.showStep = PathwayExplorer.showStep;
window.nextStep = PathwayExplorer.nextStep;
window.previousStep = PathwayExplorer.previousStep;
window.resetPathway = PathwayExplorer.resetPathway;

// Initialize on load to ensure data is present
PathwayExplorer.initialize();
