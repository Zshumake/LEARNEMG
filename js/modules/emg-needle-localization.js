import { registerModulePodcasts, generateErnestButton } from '../podcast-player.js';

export function generateContent(module) {
    registerModulePodcasts('emg-needle-localization');

    // EMG Localization Database
    const EMGLocalizationDatabase = {
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
                fullName: "Triceps",
                innervation: "Radial Nerve, Posterior Cord, Posterior Division, Middle and Lower Trunk, C7, C8, T1",
                origin: "Long Head: Infraglenoid tuberosity of the scapula. Medial Head: From the dorsal surface of the shaft of the humerus below the groove for the radial nerve",
                insertion: "Long Head: Via a common tendon, the three heads of the triceps insert on the dorsal aspect of the olecranon process of the ulna. Medial Head: By common tendon into olecranon processes",
                position: "Long Head: Patient prone with arm abducted to ninety degrees and elbow flexed over edge of plinth. Medial Head: Patient prone with arm abducted",
                electrodeInsertion: "Long Head: Four fingerbreadths distal to the posterior axillary fold. Medial Head: Three fingerbreadths proximal to the medial epicondyle (ME) of humerus",
                testManeuver: "Long Head: Extension of the elbow. Medial Head: Extension of elbow",
                pitfalls: "Long Head: None. Medial Head: If the needle electrode is inserted too anteriorly it will be in the biceps, and there is also the danger of puncturing the brachial artery",
                comments: "Long Head: Because of its very proximal innervation through the radial nerve, it is almost never involved in 'crutch paralysis' or 'Saturday night palsy.' The main function of this portion of the triceps is to extend the elbow; however, as it crosses the shoulder joint, it helps in extension and adduction of the arm. A 3rd function is to fix the head of the humerus during abduction of the arm. This head of the triceps is the medial boundary of the 'quadrilateral space,' through which the circumflex (axillary) nerve and the vessel travel. The other boundaries of this space are: laterally: the surgical neck of the humerus; below: the teres major muscle and above by the teres minor muscle and subscapularis. Medial Head: If the needle electrode is inserted too anteriorly it will be in the biceps, and there is also the danger of puncturing the brachial artery."
            }
        },
        lowerExtremity: {
            "Extensor Hallucis": {
                fullName: "Extensor Hallucis Longus",
                innervation: "Deep Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1",
                origin: "From the midportion of the shaft of the fibula",
                insertion: "Into the distal phalanx of the great toe",
                position: "The patient supine",
                electrodeInsertion: "Three fingerbreadths above the bimalleolar line (MM-LM) of the ankle just lateral to the crest of the tibia",
                testManeuver: "Patient to extend the big toe or to dorsi flex the foot",
                pitfalls: "If the electrode is inserted too superficially and too proximally it will be in the tibialis anterior; if inserted too laterally it will be in the Peroneus tertius",
                comments: "Involved in: 1. Anterior compartment syndrome 2. Lesion of the deep peroneal nerve 3. Common peroneal nerve 4. Sciatic nerve 5. Sacral plexus 6. L5, S1 root lesions"
            },
            "Medial Gastroc": {
                fullName: "Gastrocnemius: Medial Head",
                innervation: "Tibial Nerve, Sciatic Nerve, Ventral Division Sacral Plexus, S1, S2",
                origin: "From the medial femoral condyle",
                insertion: "Into the calcaneus, through the Achille's tendon",
                position: "The patient prone with feet over edge of plinth",
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
                electrodeInsertion: "Three fingerbreadths above the bimalleolar line (MM-LM) of the ankle just lateral to the crest of the tibia",
                testManeuver: "Patient to extend the big toe or to dorsi flex the foot",
                pitfalls: "If the electrode is inserted too superficially and too proximally it will be in the tibialis anterior; if inserted too laterally it will be in the Peroneus tertius",
                comments: "Involved in: 1. Anterior compartment syndrome 2. Lesion of the deep peroneal nerve 3. Common peroneal nerve 4. Sciatic nerve 5. Sacral plexus 6. L5, S1 root lesions"
            },
            "Tibialis Post": {
                fullName: "Tibialis Posterior",
                innervation: "Tibial Nerve, Sciatic Nerve, Anterior Division Sacral Plexus, L5, S1",
                origin: "From the interosseus membrane, the posterior surface of the body of the tibia and the upper two-thirds of the medial surface of the fibula",
                insertion: "This muscle inserts on the tuberosity of the navicular bone and the medial cuneiform bone, and strong aponeurotic strips are sent across the foot to the bases of the second, third and fourth metatarsal bone",
                position: "The patient prone with feet over edge of plinth, thigh internally rotated",
                electrodeInsertion: "One handbreadth distal to the tibial tuberosity (TT) and one fingerbreadth off the medial edge of the tibia. The electrode is directly obliquely through the soleus and flexor digitorum longus, just posterior to the tibia",
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
                testManeuver: "Patient to lift heel from plinth with knee extended",
                pitfalls: "If the electrode is inserted too posteriorly it will be in the biceps femoris; if inserted too medially it will be in the rectus femoris",
                comments: "Involved in lesions of: 1. Femoral nerve (entrapment) at the inguinal ligament level 2. Femoral nerve proximal to the inguinal ligament 3. Posterior division of the lumbar plexus 4. L2, L3, L4 roots. The main function of this muscle is to extend the knee. When this muscle gets paralyzed, the patient loses the force that keeps the knee in extension. Therefore, the patient develops the feeling that the knee will collapse when loaded during walking for which he tends to support it by placing one hand at the end of the thigh or by forcefully sending his knee into recurvatum which will produce the same effect."
            }
        }
    };

    // Helper function for image paths (safe fallback)
    // Helper function for image paths
    const getMuscleImagePath = (key) => {
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
        return imageMap[key] || null;
    };

    // Define the EMGLocalization logic object
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
            document.getElementById(`${region}-region-btn`).classList.add('active');

            // Render muscle pills for selected region
            this.renderMusclePills(region);

            // Clear detail panel
            document.getElementById('muscle-detail-content').innerHTML = `
                <div class="placeholder-content">
                    <h4>🎯 Select a Muscle</h4>
                    <p>Choose a muscle above to view detailed EMG needle localization information</p>
                </div>
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
                    <div class="muscle-pill" onclick="EMGLocalization.selectMuscle('${abbrev}', '${region}')" data-muscle="${abbrev}">
                        <span class="muscle-pill-abbrev">${abbrev}</span>
                        <span class="muscle-pill-name">${muscle.fullName}</span>
                    </div>
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
            const selectedItem = document.querySelector(`.muscle-pill[data-muscle="${muscle}"]`);
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
                <div class="muscle-detail">
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
                })()}

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
                </div>
            `;

            detailPanel.innerHTML = detailHTML;
        }
    };

    // Initialize logic after content is inserted
    setTimeout(() => {
        if (window.EMGLocalization) {
            window.EMGLocalization.renderMusclePills('upper');
        }
    }, 0);

    return `
        <div class="emg-localization-container">
            ${generateErnestButton('emg-needle-localization', 'EMG Needle Localization')}
            <!-- Hero Section with Animated Gradient -->
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

            <!-- Compact Control Bar -->
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

            <!-- Muscle Pill Selector -->
            <div class="muscle-pill-container" id="muscle-pill-container">
                <!-- Will be populated by JavaScript -->
            </div>

            <!-- Main Content Area (Full Width) -->
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
            /* Advanced EMG Localization Styling */
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
                font-size: 2.5rem;
                color: white;
                margin-bottom: 15px;
                font-weight: 700;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }

            .hero-subtitle {
                font-size: 1.1rem;
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

            .stat-card:nth-child(1) { animation-delay: 0s; }
            .stat-card:nth-child(2) { animation-delay: 0.2s; }
            .stat-card:nth-child(3) { animation-delay: 0.4s; }

            .stat-card:hover {
                transform: translateY(-15px) scale(1.05);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                background: rgba(255, 255, 255, 0.3);
            }

            .stat-number {
                font-size: 2rem;
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .stat-label {
                font-size: 0.9rem;
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
                font-weight: 700;
                margin-right: 6px;
            }

            .muscle-pill-name {
                font-weight: 500;
                opacity: 0.9;
            }

            /* Content Panel */
            .muscle-detail-panel {
                padding: 35px;
                background: linear-gradient(135deg, #fefefe, #f9fafb);
                min-height: 400px;
            }

            .placeholder-content {
                text-align: center;
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
                text-align: left;
                max-width: 550px;
                margin: 24px auto 0;
                line-height: 1.9;
            }

            .placeholder-content li {
                margin-bottom: 12px;
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
                border-color: #6366f1;
                background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
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

            /* Electrode Insertion Section - RED HIGHLIGHT */
            .detail-section.electrode-insertion {
                border-left: 4px solid #dc2626;
                background: linear-gradient(135deg, #ffffff, #fef2f2);
                box-shadow: 0 6px 15px -3px rgba(220, 38, 38, 0.15);
            }

            .detail-section.electrode-insertion h5 {
                color: #dc2626;
            }

            /* Pitfalls Section - ORANGE HIGHLIGHT */
            .detail-section.pitfalls {
                border-left: 4px solid #f59e0b;
                background: linear-gradient(135deg, #ffffff, #fffbeb);
                box-shadow: 0 6px 15px -3px rgba(245, 158, 11, 0.15);
            }

            .detail-section.pitfalls h5 {
                color: #f59e0b;
            }

            /* MOBILE RESPONSIVENESS */
            @media (max-width: 480px) {
                .emg-localization-container {
                    border-radius: 10px;
                }

                /* Hero section */
                .emg-hero {
                    padding: 25px 15px !important;
                    border-radius: 10px 10px 0 0;
                }

                .hero-title {
                    font-size: 1.5rem !important;
                }

                .hero-subtitle {
                    font-size: 0.9rem !important;
                }

                .hero-stats {
                    gap: 15px;
                }

                .stat-card {
                    padding: 15px 20px !important;
                    min-width: 90px;
                }

                .stat-number {
                    font-size: 1.5rem !important;
                }

                .stat-label {
                    font-size: 0.75rem !important;
                }

                /* Control bar */
                .control-bar {
                    padding: 15px 20px !important;
                }

                .control-section h4 {
                    font-size: 12px !important;
                }

                .region-selector {
                    flex-direction: column;
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
                    font-size: 1.2em !important;
                }

                .placeholder-content p {
                    font-size: 0.9em !important;
                }

                .placeholder-content li {
                    font-size: 0.85em !important;
                    margin-bottom: 8px;
                }

                /* Muscle detail content */
                .muscle-detail-content h3 {
                    font-size: 1.4em !important;
                }

                .muscle-detail-content h4 {
                    font-size: 1.1em !important;
                }

                .muscle-detail-content h5 {
                    font-size: 1em !important;
                }

                .muscle-detail-content p,
                .muscle-detail-content li {
                    font-size: 0.9em !important;
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
                    font-size: 2.5em !important;
                }
            }

            /* Extra small phones */
            @media (max-width: 375px) {
                .hero-title {
                    font-size: 1.3rem !important;
                }

                .stat-card {
                    min-width: 80px;
                    padding: 12px 15px !important;
                }
            }
        </style>
    `;
}
