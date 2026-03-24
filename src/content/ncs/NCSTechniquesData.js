/**
 * NCSTechniquesData.js
 * Comprehensive dataset for NCS technique videos, images, and protocols.
 * All clinical notes have been expanded into a mentor-style, beginner-friendly narrative.
 * Completely free of emojis.
 */

export const NCSTechniquesData = {
    // --- VIDEOS SECTION ---
    videos: {
        upperExtremity: [
            {
                title: "Median Sensory Technique",
                url: "https://www.youtube.com/embed/86j7cNLIX0U"
            },
            {
                title: "Ulnar Sensory Technique",
                url: "https://www.youtube.com/embed/i9Naurf0eWU"
            },
            {
                title: "Median-Radial Sensory Comparison",
                url: "https://www.youtube.com/embed/nMaxrbpyR-0"
            },
            {
                title: "Dorsal Ulnar Cutaneous Technique",
                url: "https://www.youtube.com/embed/U-60ft_8klI"
            },
            {
                title: "Median Motor Technique",
                url: "https://www.youtube.com/embed/cdVrcgeBgIg"
            },
            {
                title: "Ulnar Motor Technique",
                url: "https://www.youtube.com/embed/UmFYJDMucOY"
            }
        ],
        lowerExtremity: [
            {
                title: "Superficial Fibular Sensory Technique",
                url: "https://www.youtube.com/embed/M1sE2FT8YQg"
            },
            {
                title: "Sural Sensory Technique",
                url: "https://www.youtube.com/embed/zP1yAU5DW2s"
            },
            {
                title: "Common Fibular Motor Technique",
                url: "https://www.youtube.com/embed/G1bsDinxuF8"
            },
            {
                title: "Tibial Motor Technique",
                url: "https://www.youtube.com/embed/pWeH6kCa9lo"
            }
        ]
    },

    // --- PICTURES SECTION ---
    pictures: {
        upperExtremityMotor: [
            {
                title: "Median Motor",
                images: ["images/ncs/median_motor_at_wrist.png", "images/ncs/median_motor_at_elbow.png"],
                protocol: "Place the active recording electrode (G1) directly over the center belly of the Abductor Pollicis Brevis (APB) muscle. Place the reference electrode (G2) precisely on the first MCP joint of the thumb. Stimulate the median nerve at the wrist, running between the FCR and palmaris longus tendons, exactly 8 cm proximal to G1. For the proximal stimulation, shock directly over the brachial artery pulse in the antecubital fossa.",
                pearl: "If the current is turned up too high at the wrist, the electrical field can spread sideways and accidentally stimulate the adjacent ulnar nerve. This is called 'co-stimulation' and will ruin your waveform. Also, if the waveform from the elbow stimulation looks surprisingly larger than the wrist stimulation, you must look for an anomalous crossover connection (Martin-Gruber anastomosis) in the forearm."
            },
            {
                title: "Median Motor Palmar",
                images: ["images/ncs/median_motor_at_wrist.png", "images/ncs/median_motor_at_elbow.png"],
                protocol: "Keep the exact same recording setup over the Abductor Pollicis Brevis (APB). Keep the standard wrist stimulation at exactly 8 cm. Add a second stimulation point in the palm of the hand, exactly 7 cm distal to the wrist stimulation site.",
                pearl: "We do this to isolate the carpal tunnel. If conduction is significantly slower crossing from the palm to the wrist compared to from the wrist to the elbow, the hold-up is definitively across the wrist joint. We look for a palm-to-wrist ratio greater than 1.2 to confirm a conduction block across the ligament."
            },
            {
                title: "Ulnar Motor",
                images: ["images/ncs/ulnar_motor_at_the_wrist.png", "images/ncs/ulnar_motor_ncs_below_the_elbow.png", "images/ncs/ulnar_motor_ncs_above_the_elbow.png"],
                protocol: "Place G1 over the dense belly of the Abductor Digiti Minimi (ADM) muscle. Place G2 on the 5th MCP joint of the pinky. Stimulate at the medial wrist next to the FCU tendon, 8 cm proximal to G1. Next, stimulate below the elbow (exactly 3 cm distal to the medial epicondyle). Finally, stimulate above the elbow on the medial humerus, ensuring a 10 to 12 cm gap from the below-elbow site.",
                pearl: "The ulnar nerve slips tightly behind the medial epicondyle (the funny bone). If you fail to bend the patient's elbow to at least 90 degrees during the study, the nerve becomes slack and winds around the bone. This slack falsely increases your distance measurement, resulting in an artificially calculated slow conduction velocity that mimics a neuropathy when the nerve is perfectly healthy. Always flex the elbow."
            },
            {
                title: "Deep Ulnar Motor (FDI)",
                images: ["images/ncs/deep_ulnar_motor_branch.png"],
                protocol: "Place G1 on the prominent First Dorsal Interosseous (FDI) muscle in the web space between the thumb and index finger. Place G2 on the thumb MCP joint. Use the exact same three ulnar stimulation sites (wrist, below elbow, above elbow) as the standard ulnar motor study.",
                pearl: "Why record way over here? The standard ulnar motor study (recording from the ADM) evaluates the superficial branch in the hand. The deep motor branch dives further underneath the hand muscles to supply the FDI. If a patient compresses the nerve in Guyon's Canal next to the pisiform bone, it often specifically crushes this deep branch, sparing the ADM entirely. Recording from the FDI catches this isolated damage."
            },
            {
                title: "Radial Motor",
                images: ["images/ncs/radial_motor_distal_stim.png", "images/ncs/radial_motor_stim_at_elbow.png", "images/ncs/radial_motor_stim_below_spiral_groove.png", "images/ncs/radial_motor_stim_above_spiral_groove.png"],
                protocol: "Have the patient fully pronate their hand. Place G1 over the Extensor Indicis Proprius (EIP), typically two fingerbreadths proximal to the ulnar styloid on the back of the forearm. Stimulate the forearm over the ulna bone (5 to 7 cm proximal to G1). Then, stimulate at the elbow in the groove between the biceps and brachioradialis. Finally, perform stimulations both below and above the spiral groove on the posterior humerus.",
                pearl: "Because the EIP muscle lies parallel to several other extensors, the initial deflection of your waveform might actually drop down (a positive deflection) rather than shoot up (negative), simply due to volume conduction from nearby muscles firing first. Do not waste time repositioning electrodes to fix this; it is perfectly normal for the radial motor study."
            }
        ],
        upperExtremitySensory: [
            {
                title: "Median Sensory",
                images: ["images/ncs/median_sensory_ncs.png"],
                protocol: "Place ring electrodes on the middle finger. Ensure G1 is at the PIP joint and G2 is at the DIP joint. Stimulate antidromically at the wrist, directly over the median nerve, precisely 14 cm proximal to G1. You can perform a segmental study by also stimulating in the mid-palm, 7 cm distal to the wrist stimulation.",
                pearl: "This is the gold standard test for Carpal Tunnel Syndrome. If the electrical signal slows down significantly as it tries to squeeze through the wrist compared to its speed through the palm, the diagnosis is confirmed. If you see a messy, thick artifact on your screen just before the waveform, visually rotate the anode (the red prong) of your stimulator until the artifact shrinks."
            },
            {
                title: "Ulnar Sensory",
                images: ["images/ncs/ulnar_sensory_ncs.png"],
                protocol: "Place ring electrodes on the little finger (Digit 5). G1 goes at the MCP joint, and G2 sits 3 to 4 cm distally near the DIP joint. Stimulate the medial wrist adjacent to the FCU tendon, 14 cm proximal to G1.",
                pearl: "When testing the ulnar sensory nerve, the electrical shock often hits the adjacent ulnar motor fibers by accident. This triggers a massive muscle twitch in the hand, and the electrical volume of that muscle firing can completely eclipse the tiny sensory nerve waveform on your screen. If this happens, ask the patient to splay their fingers wide open to physically move the twitching muscles further away from your recording rings."
            },
            {
                title: "Dorsal Ulnar Cutaneous",
                images: ["images/ncs/dorsal_ulnar_cutaneous_ncs.png"],
                protocol: "Have the patient rest their hand completely pronated. Place G1 on the back of the hand in the web space between the ring and little fingers. Place G2 a few centimeters distally over the little finger. Stimulate just proximal to the prominent ulnar styloid bone on the wrist, maintaining an exact 8 cm distance.",
                pearl: "This nerve branches off the main ulnar nerve halfway up the forearm and travels to the back of the hand. It entirely bypasses Guyon's Canal at the wrist. Thus, if a patient has hand numbness and this nerve tests completely normal, the injury must be happening downstream inside Guyon's Canal. If this nerve tests poorly, the injury must be higher up closer to the elbow."
            },
            {
                title: "Radial Sensory",
                images: ["images/ncs/radial_sensory_study.png"],
                protocol: "Place G1 over the superficial sensory branch of the radial nerve. The easiest way to find this is to have the patient forcefully extend their thumb upward like hitchhiking; place the electrode over the prominent extensor tendons. Stimulate on the distal radius bone, 14 cm proximal to G1.",
                pearl: "This nerve travels superficially along the edge of the forearm. Because it separates from the deep motor branch (the PIN) at the elbow, it is a critical diagnostic tool. If the patient has a 'wrist drop' but a perfectly healthy radial sensory response, the lesion must be isolated to the deep motor branch deep in the forearm."
            },
            {
                title: "Medial Antebrachial Cutaneous",
                images: ["images/ncs/medial_antebrachial_cutaneous.png"],
                protocol: "Place G1 on the medial surface of the forearm, 12 cm down an imaginary line drawn from the medial elbow to the ulnar wrist. Place G2 3 to 4 cm further down that line. Stimulate the medial elbow, specifically at the midpoint between the biceps tendon and the medial epicondyle.",
                pearl: "This is a purely sensory study essential for evaluating a lower trunk brachial plexopathy or true neurogenic Thoracic Outlet Syndrome. You only need a very small amount of electrical current (5 to 15 mA) to fire this purely cutaneous nerve. Do not over-stimulate."
            },
            {
                title: "Lateral Antebrachial Cutaneous",
                images: ["images/ncs/lateral_antebrachial_cutaneous.png"],
                protocol: "Place G1 on the lateral surface of the forearm, 12 cm down an imaginary line drawn from the lateral elbow to the radial wrist. Stimulate right in the antecubital fossa, sitting just lateral to the massive biceps tendon cord.",
                pearl: "This nerve is the sensory continuation of the musculocutaneous nerve. If you apply too much electrical current in the elbow pit during stimulation, the electricity will leak directly into the massive biceps muscle belly below. The resulting gigantic muscle artifact will obliterate the tiny sensory response you are trying to read."
            }
        ],
        comparisonStudies: [
            {
                title: "Lumbrical-Interossei Comparison",
                images: ["images/ncs/ulnar_median_motor_comparsion_median_stim.png", "images/ncs/ulnar_median_motor_comparsion_ulnar_stim.png"],
                protocol: "You will use the exact same recording setup for both stimulations. Place G1 slightly lateral to the midpoint of the 3rd metacarpal bone. Place G2 on the index finger MCP joint. First, stimulate the median nerve at the wrist to fire the 2nd lumbrical muscle. Next, stimulate the ulnar nerve at the wrist to fire the 1st palmar interosseous muscle. Ensure both stimulation distances are exactly 10 cm.",
                pearl: "This is a highly sensitive test for severe Carpal Tunnel Syndrome or when a patient already has underlying peripheral neuropathy. In a normal hand, the signals fired from the median and ulnar nerves should arrive at almost the exact same millisecond (less than 0.5 ms difference). Because both nerves are firing different muscles located physically next to each other, you remove variables like temperature and skin thickness from the equation."
            },
            {
                title: "Median vs Ulnar - Digit 4",
                images: ["images/ncs/ulnar_to_median_sensory_comparison_median_stim.png", "images/ncs/ulnar_to_median_sensory_comparison_ulnar_stim.png"],
                protocol: "Place recording rings on the ring finger (Digit 4) with G1 at the MCP joint and G2 near the DIP. Leave the rings perfectly still. First, stimulate the median nerve at the wrist, ensuring an exact distance of 14 cm. Next, stimulate the ulnar nerve at the wrist, adjusting to ensure an exact distance of 14 cm.",
                pearl: "The skin of the ring finger has split 'dual-innervation': the lateral side feels with the median nerve, and the medial side feels with the ulnar nerve. By recording the entire finger's sensation, we can send a median signal and an ulnar signal on a completely identical 'race track'. If the median signal arrives significantly later (greater than 0.5 ms difference), you have proven the median nerve was delayed passing through the carpal tunnel, confirming entrapment."
            },
            {
                title: "Median vs Radial - Digit 1",
                images: ["images/ncs/radian_vs_median_sensory_comparison_median_stim.png", "images/ncs/radian_vs_median_sensory_comparison_radial_stim.png"],
                protocol: "Place recording rings on the thumb (Digit 1) with G1 at the MCP and G2 distally. First, stimulate the median nerve at the wrist at exactly 10 cm. Next, stimulate the radial nerve over the radius bone in the forearm, ensuring the distance remains exactly 10 cm.",
                pearl: "Like the ring finger race, we are racing the median nerve against the radial nerve into the thumb. The superficial radial nerve runs completely outside the carpal tunnel, serving as a perfect control group. If the median nerve loses the 10 cm race by more than 0.5 ms, it proves the hold-up is localized solely to the wrist ligament."
            }
        ],
        palmarMixed: [
            {
                title: "Median Palmar Mixed",
                images: ["images/ncs/median_vs_ulnar_palmar_mixed_median_record.png"],
                protocol: "Here, we record 'backwards' (orthodromically). Place the G1 recording electrode on the median nerve at the wrist, right between the FCR and palmaris longus tendons. Stimulate the thick skin of the mid-palm, exactly 8 cm distal to G1, aiming the cathode toward the web space between the index and middle fingers.",
                pearl: "This technique evaluates the short, highly localized 'mixed' nerve segment (containing both returning sensory fibers and outgoing motor fibers) travelling straight through the carpal tunnel. The 8 cm measurement must be absolutely perfect, straight down to the millimeter. Even a 1 cm measurement error on such a short distance will mathematically ruin the calculated velocity and trigger a false-positive diagnosis."
            },
            {
                title: "Ulnar Palmar Mixed",
                images: ["images/ncs/median_vs_ulnar_palmar_mixed_ulnar_record.png"],
                protocol: "Place the G1 recording electrode on the ulnar nerve at the medial wrist adjacent to the FCU. Stimulate the mid-palm exactly 8 cm distal to G1, aiming toward the web space between the ring and little fingers.",
                pearl: "This serves as the sibling control test for the median palmar mixed study. We race the median palmar signal through the carpal tunnel against the ulnar palmar signal travelling safely through Guyon's canal. If the median time drops more than 0.4 ms behind the ulnar time, you have caught the earliest, most subtle evidence of Carpal Tunnel Syndrome before the standard full-length studies even begin to show disease."
            }
        ],
        lowerExtremityMotor: [
            {
                title: "Tibial Motor (AHB)",
                images: ["images/ncs/tibial_motor_at_the_ankle.png", "images/ncs/tibial_motor_at_the_popliteal_fossa.png"],
                protocol: "Place G1 precisely 1 cm superior and 1 cm posterior to the prominent navicular bone on the inner foot. This rests squarely on the Abductor Hallucis Brevis (AHB) belly. Place G2 on the first MTP joint of the great toe. Stimulate at the medial ankle exactly 9 cm proximal to G1, tracing just behind the medial malleolus. For the proximal stimulation, shock directly over the popliteal artery pulse centrally behind the knee.",
                pearl: "The tibial nerve is deeply embedded beneath heavy fascia and fat behind the knee joint. You will need to thrust the stimulator aggressively into the tissue and turn the electrical current up significantly higher than usual to punch the signal through to the nerve. Because the electricity has a long way to travel physically down the leg, the waveform 'pile' will inevitably spread out and the amplitude can drop up to 50% from the ankle to the knee. This drop is completely normal physiological dispersion, not a conduction block."
            },
            {
                title: "Peroneal Motor (EDB)",
                images: ["images/fibular_peroneal_motor_at_the_ankle.png", "images/fibular_peronal_motor_at_the_fibular_head.png", "images/fibular_peronal_motor_at_the_popliteal_fossa.png"],
                protocol: "Place G1 on the fleshy bump of the Extensor Digitorum Brevis (EDB) on the top-lateral aspect of the foot. Place G2 on the MTP joint of the little toe. First, stimulate the anterior ankle lateral to the thick tibialis anterior tendon, exactly 9 cm proximal to G1. Next, stimulate the lateral calf, 1 to 2 fingerbreadths directly below the bony fibular head. Finally, stimulate the popliteal fossa slightly laterally, exactly 10 to 12 cm proximal to the below-fibular head site.",
                pearl: "Crucially, you MUST always perform three distinct stimulations to thoroughly bracket the fibular neck (above the neck, below the neck, and ankle). This bone is the 'danger zone' for nerve crush injuries. If your amplitude fired from below the fibula is magically larger than the amplitude fired at the ankle, suspect an accessory deep peroneal nerve anomalous connection arriving from behind the lateral malleolus."
            },
            {
                title: "Peroneal Motor (TA)",
                images: ["images/ncs/fibular_motor_over_tibialis_anterior_at_the_fibular_head.png", "images/ncs/fibular_motor_over_tibialis_anterior_at_the_popliteal_fossa.png"],
                protocol: "Place G1 on the massive muscular belly of the Tibialis Anterior (TA) on the front of the shin, approximately 1/3 down from the knee. Place G2 down at the anterior ankle joint. Stimulate first on the lateral calf below the fibular head, and then again higher up in the lateral popliteal fossa.",
                pearl: "The standard EDB foot recording can often be tiny or entirely absent in perfectly healthy older adults due to lifelong wear and tight shoes permanently crushing the muscle. To confirm a true peroneal nerve injury, record from this massive shin muscle instead. The signal is gigantic and incredibly robust, making it the superior test for isolating conduction slowing exactly across the fibular neck."
            },
            {
                title: "Femoral Motor",
                images: ["images/ncs/femoral_motor_study.png"],
                protocol: "Place G1 directly over the anterior mid-thigh on the Rectus Femoris muscle. Place G2 squarely on the kneecap. Press the stimulator deeply into the inguinal groin crease, just lateral to the heavy pulse of the femoral artery.",
                pearl: "This test is notoriously difficult to execute on obese patients because copious amounts of adipose tissue block the electrical current from reaching the deep femoral nerve. Even with the stimulator cranked to maximum output (>50mA) and pressing firmly into the pelvis, you may fail to reach the nerve. Measure side-to-side (left leg vs right leg) for diagnostic comparison, as absolute values vary wildly."
            },
            {
                title: "Medial Plantar Motor",
                images: ["images/ncs/medial_plantar_motor_study_at_medial_malleolus.png"],
                protocol: "Place G1 slightly proximal and posterior to the prominent navicular bone on the inner foot, resting centrally on the Abductor Hallucis Brevis (AHB). Stimulate precisely at the medial ankle behind the medial malleolus, exactly 9 cm proximal to G1.",
                pearl: "This targeted test is exquisite for definitively diagnosing Tarsal Tunnel Syndrome as the tibial nerve passes beneath the flexor retinaculum. Because amplitudes vary significantly in the general population, you absolutely must perform a strict side-to-side comparison of the sick foot against the asymptomatic foot to confirm suspected pathology."
            },
            {
                title: "Lateral Plantar Motor",
                images: ["images/ncs/lateral_plantar_motor.png"],
                protocol: "Place G1 on the Abductor Digiti Quinti Pedis (ADQP) located cleanly on the lateral edge of the foot beneath the 5th metatarsal. Stimulate at the medial ankle behind the medial malleolus. The distance is anatomically variable depending on foot length.",
                pearl: "Like the medial plantar motor protocol, this specifically tests for downstream branches trapped in Tarsal Tunnel Syndrome. Because the active recording electrode is on the opposite side of the foot from the medial ankle stimulation, the electrical current inherently runs diagonally through the foot anatomy, requiring careful technique."
            }
        ],
        lowerExtremitySensory: [
            {
                title: "Superficial Fibular Sensory",
                images: ["images/ncs/superficial_fibular_peroneal_sensory_stud.png"],
                protocol: "Place G1 laterally on the ankle, positioned precisely between the thick tibialis anterior tendon and the prominent lateral malleolus bone. Place G2 3 to 4 cm distally along the dorsum of the foot. Stimulate over the lateral calf. While 14 cm is the textbook standard, a shorter 7 to 12 cm distance is often significantly easier to obtain on the ward.",
                pearl: "This nerve represents the crucial sensory branch splitting off the common fibular (peroneal) nerve. If a patient presents with a severe foot drop, achieving a perfectly healthy superficial sensory response on this nerve definitively localizes the injury deep into the motor branch (akin to testing the radial sensory nerve in the arm). Be sure to calculate the true conduction velocity from the onset latency mark, never the peak latency."
            },
            {
                title: "Sural Sensory",
                images: ["images/ncs/sural_sensory_study.png"],
                protocol: "Instruct the patient to roll completely onto their side with the recording leg facing upward for optimal access. Place G1 horizontally just behind the lateral malleolus at the ankle. Place G2 exactly 3 to 4 cm distal. Stimulate firmly on the posterior-lateral calf. Again, the 14 cm standard can be shortened to 10 to 12 cm for challenging anatomy.",
                pearl: "The sural nerve is the workhorse screening tool for virtually any length-dependent peripheral polyneuropathy (like diabetic neuropathy). Because it is purely sensory and relatively superficial, it classically dies off very early in generalized systemic disease. A completely absent sural response on both legs is often the first definitive, quantifiable proof of peripheral nerve deterioration."
            },
            {
                title: "Saphenous Sensory",
                images: ["images/ncs/saphenous_sensory_study.png"],
                protocol: "Place G1 on the medial-anterior ankle, tucked snugly between the medial malleolus and the tibialis anterior tendon. Place G2 3 to 4 cm distally on the foot. Stimulate the medial calf inside the muscular groove between the tibia bone and the bulky medial gastrocnemius muscle belly.",
                pearl: "This purely sensory nerve originates from the femoral nerve high in the thigh. It is notoriously fragile; it is often frustratingly small or completely unrecordable in perfectly healthy adults over the age of forty. If you suspect an isolated femoral nerve injury or a high lumbar plexus lesion, you must compare the sick leg to the healthy leg to prove objective signal loss."
            },
            {
                title: "Lateral Femoral Cutaneous",
                images: ["images/ncs/lateral_femoral_cutaneous_sensory_study.png"],
                protocol: "Place G1 on the anterior thigh, tracing an imaginary line downward directly from the Anterior Superior Iliac Spine (ASIS) to the lateral edge of the patella. Place G2 3 to 4 cm distally down the leg. Drive the stimulator deep into the inguinal crease, exactly 1 cm medial to the ASIS bone, sitting entirely above the inguinal ligament. Maintain a 12 cm gap.",
                pearl: "This purely sensory nerve classically gets pinched tightly under the inguinal ligament, causing Meralgia Paresthetica (the infamous 'tight belt syndrome'). Anatomical variation here is wild: in 80% of patients the nerve drops straight down near the ASIS, but occasionally it drifts vastly medial. Finding it requires immense patience and heavy pressure. Always perform a side-to-side comparison."
            },
            {
                title: "Medial Plantar Sensory",
                images: ["images/ncs/medial_plantar_sensory.png"],
                protocol: "Place G1 securely slightly proximal and posterior to the medial malleolus. Wrap ring electrodes around the great toe (digit 1), ensuring the active cathode sits proximally at the MTP joint to fire orthodromically up the leg.",
                pearl: "Sensory testing on the dense, calloused sole of the foot is incredibly difficult. Even in robust young adults, the electrical signal may be microscopically small or entirely absent. You will almost certainly need to meticulously average numerous shocks on your machine to pull the true sensory waveform out of the baseline background noise."
            },
            {
                title: "Lateral Plantar Sensory",
                images: ["images/ncs/lateral_plantar_sensory.png"],
                protocol: "Maintain the exact same G1 recording position behind the medial malleolus. Move your stimulating ring electrodes sequentially to the little toe (digit 5), hooking the active cathode as far proximal on the MTP joint as physically possible.",
                pearl: "Like the medial sensory test, this is exquisitely difficult to obtain through thick plantar fascia. If the orthodromic approach (stimulating the toes and recording the ankle) completely fails due to tough skin, you can reverse the polarity and fire antidromically (stimulating the ankle and recording the toes), which occasionally yields a cleaner artifact profile."
            }
        ],
        lowerExtremityMixed: [
            {
                title: "Medial Plantar Mixed",
                images: ["images/ncs/medial_plantar_mixed_study.png"],
                protocol: "Place the recording G1 electrode on the main tibial nerve trunk at the medial ankle, slightly proximal and posterior to the medial malleolus. Measure exactly 14 cm distally onto the thick sole of the foot. To find the stimulation site, measure 7 cm straight down into the sole, and then 7 cm parallel aiming toward the web space between the first and second toes.",
                pearl: "Firing both sensory and motor fibers simultaneously creates a significantly larger, more robust 'mixed' waveform than a pure orthodromic sensory study. Therefore, when evaluating a patient for Tarsal Tunnel Syndrome, checking these mixed distal responses is technically much easier and far more reliable than fighting through foot calluses for tiny sensory signals."
            },
            {
                title: "Lateral Plantar Mixed",
                images: ["images/ncs/lateral_plantar_mixed_study.png"],
                protocol: "Keep the G1 recording electrode anchored firmly on the tibial nerve trunk behind the medial malleolus. Measure exactly 14 cm diagonally across the sole of the foot. The stimulation site sits 7 cm straight down into the heel, and then 7 cm parallel aiming laterally toward the web space between the fourth and fifth toes.",
                pearl: "Just like the medial mixed study, this massive mixed signal is the superior choice for exposing focal slowing in the tarsal tunnel beneath the flexor retinaculum. Again, perfectly healthy adults over forty may spontaneously lose these signals entirely to age-related axonal loss, so always perform bilateral comparisons before diagnosing unilateral entrapment."
            },
            {
                title: "Soleus H-Reflex",
                images: ["images/soleus_h_reflex.png"],
                protocol: "Place G1 slightly distal to the junction of the medial and lateral bellies of the gastrocnemius muscle (approx 2 fingerbreadths above the soleus insertion onto the Achilles tendon). Place G2 on the Achilles tendon itself. Stimulate the tibial nerve at the popliteal fossa. Crucially, the cathode (black prong) MUST face proximally/superiorly (towards the spinal cord) rather than distally like a normal motor NCS, because you are trying to measure the afferent Ia sensory fibers traveling UP to the cord, not the efferent motor fibers traveling DOWN.",
                pearl: "This is the electrical equivalent of striking the Achilles tendon with a reflex hammer. The electrical signal travels all the way up the sensory nerve into the spinal cord, synapses in the S1 nerve root, and physically fires back down the motor nerve to twitch the calf. If a patient has an aggressive S1 radiculopathy (a pinched nerve in their lower spine), this elegant, long-distance loop will be delayed or completely destroyed."
            }
        ]
    },

    // --- QUIZ SECTION ---
    quiz: [
        {
            question: "You are performing a median motor study. Where should the G1 (Active) recording electrode be placed?",
            options: [
                "Over the center of the Abductor Pollicis Brevis muscle belly",
                "On the tendon of the APB at the thumb",
                "On the index finger",
                "Over the thenar eminence crease"
            ],
            correct: 0,
            explanation: "For motor studies, G1 must be placed directly over the motor endplate zone, which is the center of the muscle belly. For median motor studies, this is the APB. Placing G1 off-center will produce an initial positive deflection and inaccurate latency measurements."
        },
        {
            question: "A patient is referred for evaluation of carpal tunnel syndrome. Which comparison study is most sensitive for detecting mild median neuropathy at the wrist?",
            options: [
                "Median vs Radial sensory to Digit 1",
                "Median motor recording APB",
                "Ulnar motor recording ADM",
                "Sural sensory"
            ],
            correct: 0,
            explanation: "The Median vs Radial sensory comparison to Digit 1 is one of the most sensitive tests for mild CTS. Both nerves travel to the same finger, so any latency difference greater than 0.5ms strongly suggests focal median slowing at the wrist. This eliminates age, temperature, and limb-length as confounders."
        },
        {
            question: "When performing a sensory nerve conduction study, what is the standard distance between the stimulating cathode and the G1 recording electrode?",
            options: [
                "8 cm",
                "10 cm",
                "14 cm",
                "20 cm"
            ],
            correct: 2,
            explanation: "The standard distance for antidromic sensory studies is 14 cm. This standardized distance allows for accurate comparison of onset latencies and peak latencies across patients and between laboratories."
        },
        {
            question: "You are performing an ulnar motor study and need to evaluate for cubital tunnel syndrome. What is critical about electrode placement when stimulating above the elbow?",
            options: [
                "The arm must be fully extended",
                "The elbow must be flexed to 70-90 degrees",
                "The stimulator should be placed on the lateral epicondyle",
                "G2 should be moved to the wrist"
            ],
            correct: 1,
            explanation: "The elbow MUST be flexed to 70-90 degrees during ulnar motor NCS across the elbow. In full extension, the ulnar nerve takes a shortcut across the medial epicondyle, making the measured distance artificially long and the calculated velocity falsely slow, potentially mimicking a neuropathy that does not exist."
        },
        {
            question: "During a sural sensory study, where is the G1 recording electrode placed?",
            options: [
                "Behind the medial malleolus",
                "On the dorsum of the foot",
                "Behind the lateral malleolus",
                "At the fibular head"
            ],
            correct: 2,
            explanation: "The sural nerve runs behind the lateral malleolus (outside ankle bone). G1 is placed just posterior and inferior to the lateral malleolus. The sural nerve is the gold standard reference for diagnosing length-dependent polyneuropathy because of its predictable superficial course."
        },
        {
            question: "What is unique about the cathode orientation when performing an H-reflex study compared to standard motor NCS?",
            options: [
                "The cathode faces distally, same as motor NCS",
                "The cathode faces proximally (toward the spinal cord)",
                "No cathode is used; only surface electrodes",
                "The cathode is placed on the recording site"
            ],
            correct: 1,
            explanation: "For the H-reflex, the cathode MUST face proximally (superiorly) because you are trying to selectively stimulate the Ia sensory afferent fibers traveling UP to the spinal cord. This is the opposite of standard motor NCS where the cathode faces distally toward the recording electrodes."
        },
        {
            question: "You notice that your median motor CMAP has an initial positive (downward) deflection. What is the most likely problem?",
            options: [
                "The stimulus intensity is too high",
                "The G1 electrode is not over the motor endplate zone",
                "The patient has carpal tunnel syndrome",
                "The nerve is demyelinated"
            ],
            correct: 1,
            explanation: "An initial positive deflection almost always means the G1 (Active) electrode is off the motor endplate zone. The electrode is recording the approaching wavefront as volume conduction before the muscle under it depolarizes. Move G1 until the waveform rockets straight upward from baseline."
        },
        {
            question: "The Lumbrical-Interossei comparison study is used to diagnose which condition?",
            options: [
                "Ulnar neuropathy at the elbow",
                "Radial neuropathy at the spiral groove",
                "Carpal tunnel syndrome (median neuropathy at the wrist)",
                "C8 radiculopathy"
            ],
            correct: 2,
            explanation: "The Lumbrical-Interossei comparison records from two muscles in the same hand -- the 2nd lumbrical (median-innervated) and the interosseous (ulnar-innervated). Both are the same distance from the wrist, eliminating distance as a variable. A latency difference >0.4ms confirms focal median nerve slowing at the carpal tunnel."
        },
        {
            question: "When performing a superficial fibular (peroneal) sensory study, where do you place the G1 recording electrode?",
            options: [
                "Behind the lateral malleolus",
                "On the dorsum of the foot at the ankle",
                "At the fibular head",
                "On the lateral calf"
            ],
            correct: 1,
            explanation: "G1 is placed on the anterolateral ankle (dorsum of the foot) where the superficial fibular nerve becomes subcutaneous. This nerve provides sensation to the dorsal foot. Stimulation is applied 14 cm proximally on the lateral leg."
        },
        {
            question: "What is the clinical significance of the Dorsal Ulnar Cutaneous (DUC) sensory study?",
            options: [
                "It confirms carpal tunnel syndrome",
                "It differentiates ulnar neuropathy at the elbow vs. the wrist (Guyon's canal)",
                "It tests C6 radiculopathy",
                "It measures tibial nerve function"
            ],
            correct: 1,
            explanation: "The DUC nerve branches off the ulnar nerve PROXIMAL to Guyon's canal at the wrist. If a patient has ulnar symptoms and the DUC is abnormal, the lesion must be at or above the elbow (cubital tunnel). If the DUC is normal but other ulnar studies are abnormal, the lesion is at Guyon's canal."
        },
        {
            question: "What is the primary advantage of an antidromic sensory study over an orthodromic study?",
            options: [
                "It produces a cleaner baseline without motor artifact",
                "It produces larger amplitude sensory responses",
                "It requires less stimulus intensity",
                "It is more comfortable for the patient"
            ],
            correct: 1,
            explanation: "Antidromic studies produce much larger SNAP amplitudes because the digital nerves in the fingers are extremely superficial and close to the recording ring electrodes. The disadvantage is that motor fibers also fire, creating a volume-conducted motor artifact that can contaminate the recording."
        },
        {
            question: "A patient presents with burning pain on the sole of the foot. Which specialized NCS protocol would you add to evaluate for tarsal tunnel syndrome?",
            options: [
                "Sural sensory and superficial fibular sensory",
                "Medial and lateral plantar mixed nerve studies",
                "Common fibular motor across the fibular head",
                "Tibial H-reflex"
            ],
            correct: 1,
            explanation: "The medial and lateral plantar mixed nerve studies are the most sensitive electrodiagnostic tests for tarsal tunnel syndrome. They measure the signal traveling through the tarsal tunnel beneath the flexor retinaculum. Prolonged plantar latencies or absent responses with a normal tibial motor study strongly support focal compression at the ankle."
        }
    ]
};
