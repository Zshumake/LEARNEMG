/**
 * NCSFundamentalsData.js
 * Comprehensive clinical data, technical factors, patterns, and quiz data for the NCS Fundamentals module.
 * Source: Standard Clinical Guidelines
 */

export const NCSFundamentalsData = {
    header: {
        title: "NCS Fundamentals",
        subtitle: "Master the physiology, technique, and interpretation of nerve conduction studies. This is the bedrock of electrodiagnostic medicine."
    },

    tabs: [
        { id: 'foundations', label: 'Physics & Physiology', icon: 'M13 2L3 14 12 14 11 22 21 10 12 10 13 2z' },
        { id: 'methods', label: 'Setup & Methods', icon: 'M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
        { id: 'technical', label: 'Technical Factors', icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
        { id: 'interpretation', label: 'Interpretation', icon: 'M2 12h4l2-9 5 18 3-9h6' },
        { id: 'calculations', label: 'Math & Calcs', icon: 'M4 4h16v16H4z M4 9h16 M9 4v16' },
        { id: 'quiz', label: 'Knowledge Check', icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' }
    ],

    physiology: {
        intro: {
            title: "Physics & Physiology Foundations",
            text: "Before picking up a stimulator, we must understand the fundamental biophysics of the peripheral nervous system. Nerve conduction studies (NCS) are simply a way to artificially trigger and measure the body's natural electrical signaling system."
        },
        actionPotential: [
            { stage: "Resting State", value: "-70mV", detail: "The nerve is negatively charged relative to the outside. This is actively maintained by the Na+/K+ ATPase pump, which burns ATP to constantly push 3 Na+ ions out for every 2 K+ ions it pulls in. The nerve is a loaded spring, waiting to fire." },
            { stage: "Threshold", value: "-55mV", detail: "When a stimulus (either natural or from our stimulator) pushes the local charge from -70mV up to -55mV, an explosive chain reaction begins. Voltage-gated Na+ channels suddenly pop open." },
            { stage: "Depolarization", value: "+30mV", detail: "Na+ floods into the cell, rapidly shifting the internal charge from negative to positive. This is the 'all-or-none' action potential spike we record on the screen." },
            { stage: "Repolarization", value: "Restoring", detail: "The Na+ channels quickly snap shut (inactivation), and K+ channels open. K+ rushes out of the cell, dropping the internal charge back toward negative." },
            { stage: "Hyperpolarization", value: "Overshoot", detail: "The K+ channels are slightly slow to close, allowing too much positive charge to escape. The potential briefly drops below -70mV before the resting state is restored." }
        ],
        conduction: {
            process: "Saltatory Conduction: The Need for Speed",
            detail: "If electrical signals simply washed down the length of an axon like water through a hose, conduction velocity would be incredibly slow (about 1-2 m/s). This is far too slow for complex animals to survive. Evolution solved this with Myelin. Myelin acts as a thick layer of biological insulation wrapped around the axon by Schwann cells. Between these insulated segments are microscopic gaps called the Nodes of Ranvier, which contain massive clusters of sodium channels. The action potential does not flow continuously; it 'jumps' (saltates) from node to node. This brilliant design increases the speed of the signal up to 70 m/s or more.",
            staircase: "Think of saltatory conduction like a staircase on a graph of distance versus time. At the node (the vertical step), the nerve takes a fraction of a millisecond to depolarize. Across the internode of myelin (the horizontal step), the electrical field propagates almost instantaneously. If the myelin is damaged (demyelination), the signal leaks out, takes longer to reach the next node, and conduction velocity plummets."
        },
        fiberTypes: [
            {
                name: "A-alpha (Motor & Spindles)",
                diameter: "12-20μm",
                velocity: "70-120 m/s",
                function: "The 'Fiber Optic Cable'. These are massive, heavily myelinated fibers. They control Extrafusal Motor function (muscle contraction) and Proprioception.",
                color: "#1e40af"
            },
            {
                name: "A-beta (Sensory)",
                diameter: "6-12μm",
                velocity: "35-75 m/s",
                function: "These are the large, moderately myelinated sensory fibers responsible for Light Touch, Pressure, and Vibration. When we perform a standard Sensory Nerve Action Potential (SNAP) study in the clinic, THESE are the ONLY sensory fibers we are measuring.",
                color: "#047857"
            },
            {
                name: "A-delta (Small Myelinated)",
                diameter: "1-5μm",
                velocity: "5-30 m/s",
                function: "Small, thinly myelinated fibers. They carry the sensation of Sharp, pricking, 'Fast' Pain and Cold temperature.",
                color: "#b45309"
            },
            {
                name: "C (Unmyelinated)",
                diameter: "0.4-1.2μm",
                velocity: "0.5-2 m/s",
                function: "The 'Dial-up Internet'. These are tiny, unmyelinated fibers. They carry Dull, aching, 'Slow' Pain, Warm temperature perception, and Autonomic functions (sweating, heart rate). Because they lack myelin, their conduction is painfully slow.",
                color: "#475569"
            }
        ],
        pearl: "The Great Blind Spot of Electrodiagnosis: Standard NCS equipment only has the resolution to 'see' the massive A-alpha (motor) and A-beta (sensory) fibers. We are completely blind to the A-delta and C fibers. If a patient comes to your clinic complaining of severe burning pain in their feet and loss of temperature sensation, but they have normal strength and vibration, they likely have a Small Fiber Neuropathy. Their EDX study will be 100% normal. You must diagnose small fiber disease clinicaly or with a specialized skin punch biopsy."
    },

    methods: {
        intro: "Setup & Methods",
        text: "Understanding where you place your electrodes and why is critical. The machine does not know human anatomy; it only knows how to record the electrical difference between two metal discs.",
        recording: {
            montage: "The Belly-Tendon Montage (G1-G2)",
            g1: "G1 / The Active Electrode (Black wire): This must be placed directly over the recording target. For a motor study, it goes directly over the center of the muscle belly (the motor endplate zone). For a sensory study, it goes directly over the sensory nerve you wish to record.",
            g2: "G2 / The Reference Electrode (Red wire): This must be placed over an area that is electrically silent. For a motor study, it typically goes on the distal tendon of the target muscle. For a sensory study, it is placed 3-4 cm distally along the finger.",
            principle: "Differential Amplification: The amplifier is designed to calculate (G1 - G2). It takes whatever signal hits the G1 electrode and subtracts whatever signal hits the G2 electrode. It also throws out any signal that hits BOTH electrodes simultaneously (Common Mode Rejection), which eliminates 60Hz ambient room noise. You want a massive signal at G1 and absolute silence at G2."
        },
        direction: [
            {
                type: "Antidromic Sensory Study",
                direction: "Stimulating in the 'wrong' direction. The signal travels AWAY from the spinal cord, toward the sensory receptor (e.g., shocking the median nerve at the wrist and recording on the index finger).",
                pros: "This produces much larger sensory amplitudes because the digital nerves in the finger are extremely superficial and close to the recording electrodes.",
                cons: "Because you are shocking a mixed nerve at the wrist, the motor fibers also fire! This creates a massive muscle twitch in the hand, which causes a volume-conducted 'motor artifact' that can obscure the end of your tiny sensory response. Ensure your SNAP duration is brief."
            },
            {
                type: "Orthodromic Sensory Study",
                direction: "Stimulating in the 'correct' physiological direction. The signal travels TOWARD the spinal cord (e.g., shocking the index finger and recording the median nerve at the wrist).",
                pros: "Perfectly clean baseline. Because there are no motor fibers in the finger, you only stimulate sensory fibers. There is no muscle twitch artifact.",
                cons: "Produces much smaller amplitudes compared to antidromic methods because the nerve is buried deeper under tendons and fascia at the wrist recording site."
            }
        ],
        supramaximal: {
            definition: "Stimulation Intensity: Achieving 'Supramaximal'",
            reason: "When we shock a nerve, we start with a low electrical current and slowly increase it. As the current grows, we recruit more and more individual axons, and our waveform grows taller. We must continue increasing the current until the waveform stops growing. But we don't stop there! We must go 20-30% beyond the point of maximum amplitude. This is called 'supramaximal' stimulation. This gives us absolute certainty that we fired 100% of the working axons in that nerve bundle. If you don't stimulate supramaximally, you will measure an artificially small amplitude, which you might mistakenly diagnose as severe axonal loss."
        },
        pearl: "Initial Positive Deflection: When you do a motor study, the very first movement of the waveform on the screen should always be sharply upward (Negative, by convention). If you hit the stimulator and the waveform dips downward initially, there is a 99% chance your G1 (Active) electrode is NOT placed over the center of the muscle belly. Move the G1 electrode until the downward dip disappears and the waveform rockets straight up. This single maneuver will save you from inaccurate latency measurements."
    },

    technicalFactors: {
        intro: "Technical Factors & Pitfalls",
        text: "The electromyographer is only as good as the raw data they collect. Artifacts, improper settings, and environmental factors can aggressively masquerade as severe pathology.",
        temperature: {
            title: "Temperature Variation: The Silent Saboteur",
            effects: "Skin temperature is the most critical technical factor in all of electrodiagnosis. When a nerve gets cold, its sodium channels physically open and close more slowly. Cold nerves conduct electricity slowly, and the latencies become prolonged. Crucially, because the depolarization of individual muscle fibers happens more slowly, there is less 'phase cancellation' (the fast and slow fibers don't cancel each other out as much). This paradoxically causes the waveform amplitude to INCREASE.",
            correction: "The Golden Rule: Cool limb = Slowed Conduction + Higher Amplitude. Cold limbs perfectly mimic demyelinating neuropathies! For every 1°C drop below normal, conduction velocity slows by 1.5 - 2.5 m/s, and distal latency prolongs by 0.2 ms.",
            ideal: "Always, ALWAYS verify skin temperature before starting. Target skin temp is 32-34°C. Warm the patient's limbs if necessary."
        },
        noise: {
            type: "60 Hz Interference",
            cause: "You see thick, fuzzy, continuous oscillations on the screen exactly tracking at 60 cycles per second. This is ambient electrical noise radiating from the wall outlets and lights.",
            solution: "To kill 60Hz noise, the amplifier relies on Common Mode Rejection. For this to work, the skin resistance (impedance) under the G1 and G2 electrodes must be identical. Scrub the skin with alcohol/prep pads, use plenty of conductive jelly, and ensure the ground electrode is firmly attached between the stimulator and the recording electrodes."
        },
        filters: [
            { type: "Motor Study Filters", lff: "Low Frequency Filter: 10 Hz", hff: "High Frequency Filter: 10 kHz", note: "A Motor CMAP is a massive, slow wave. We set our high frequency filter very high (10 kHz) to ensure we don't accidentally clip off the peak of the wave, and we set our low filter to 10 Hz." },
            { type: "Sensory Study Filters", lff: "Low Frequency Filter: 20 Hz", hff: "High Frequency Filter: 2 kHz", note: "A Sensory SNAP is a tiny, incredibly fast wave. We lower the High Frequency Filter to 2 kHz to aggressively chop out high-frequency noise that would otherwise drown out the tiny sensory response. We raise the Low Frequency filter to 20 Hz to stabilize the baseline and prevent wander." }
        ],
        artifact: {
            trailing: "Stimulus Artifact Mitigation",
            mitigation: [
                "The 'shock' you deliver with the stimulator is thousands of times larger than the nerve signal. It creates a massive 'Far-field' artifact that hits the recording electrodes instantly, often obscuring the start of your waveform.",
                "Always place the Ground electrode between your stimulator and your recording electrodes. It acts as a ditch to catch the excess stimulus current before it hits the recording site.",
                "Rotate the Anode (the positive, non-stimulating prong) around the Cathode (the negative, stimulating prong) while moving the probe. Sometimes simply changing the angle of the current flow violently alters the artifact trajectory, cleaning your baseline."
            ]
        },
        pearl: "Cathode Position Matters: Ensure the Cathode (the black prong on the stimulator) is always aimed TOWARD the recording electrodes. The nerve depolarization starts at the Cathode. If you hold the stimulator upside down, the depolarization starts further away at the wrong prong, travels an extra distance, and will artificially prolong your latency measurements."
    },

    interpretation: {
        intro: "The Art of Interpretation",
        text: "The machine gives you numbers; it is your job to synthesize biology. The primary question of all NCS interpretation is 'Is this Axonal Loss, or is it Demyelination?'",
        axonalLoss: {
            title: "The Axonal Loss Pattern",
            primary: "Key Finding: Severely reduced Amplitudes (CMAP or SNAP).",
            secondary: "When axons are damaged (Wallerian Degeneration), the 'wires' are physically gone. Fewer wires firing means less electricity reaches the muscle, resulting in a tiny, crushed amplitude. Because the surviving wires still have perfect myelin insulation, the Conduction Velocity and Latencies usually remain entirely normal or only slightly slowed (always >75% of Lower Limit of Normal).",
            note: "Timing matters! Wallerian degeneration is not instantaneous. If a patient severs their ulnar nerve today, their distal amplitudes will look completely normal for several days. It takes 3-5 days for motor axons to break down, and 6-10 days for sensory axons."
        },
        demyelination: {
            title: "The Demyelinating Pattern",
            primary: "Key Finding: Marked slowing of Conduction Velocity and prolonged Latencies.",
            secondary: "When the myelin insulation is stripped away (like in Guillain-Barre Syndrome), the signal can't jump efficiently. It leaks out and moves sluggishly. The velocities crash (<75% of normal) and the latencies stretch out. The amplitudes generally remain robust, because the axons themselves haven't died, they are just communicating slowly.",
            dispersion: "You will also see Temporal Dispersion. Because the myelin damage is uneven, some fibers conduct slightly better than others. The signals arrive at the muscle at different times, causing the waveform to spread out and become much wider (longer duration) than normal."
        },
        conductionBlock: {
            title: "Conduction Block",
            block: "This is a form of severe, focal demyelination. Imagine tracing a nerve up the arm. You stimulate at the wrist, and get a huge, beautiful 10mV response. You stimulate at the elbow, and suddenly the response crashes to 3mV. This >50% abrupt drop in amplitude means the electrical signal could not jump past a severe focal block of demyelination between the elbow and the wrist. The axons are alive, but the signal cannot pass the roadblock.",
            dispersion: "Crucial difference: To prove true conduction block, the waveform must shrink in height without dramatically stretching out in width. If it stretches out widely while losing height, that is simply Temporal Dispersion, not a block."
        },
        pearl: "The 75% Rule of Thumb: If a nerve's conduction velocity falls below 75% of the lower limit of normal, you can definitively declare it a primary demyelinating process. Axonal loss alone, even if severe, will almost never drag the remaining surviving axons down below 75% velocity."
    },

    calculations: {
        intro: "Clinical Mathematics",
        text: "Understanding the physics of Conduction Velocity calculations is essential to avoid catastrophic diagnostic errors.",
        formula: "Conduction Velocity (m/s) = Distance (mm) / (Proximal Latency - Distal Latency)",
        practice: [
            {
                question: "You are testing the Median Motor nerve. You measure the physical distance between your wrist and elbow stimulation sites as 250 millimeters. Your proximal latency at the elbow was 8.5 milliseconds. Your distal latency at the wrist was 3.5 milliseconds. What is the Conduction Velocity across the forearm?",
                answer: "50 m/s",
                check: "Perfect. Step 1: Subtract the latencies. (8.5 - 3.5 = 5.0 milliseconds). This 5.0 ms is the pure nerve travel time through the forearm, completely stripping away the time it took to cross the neuromuscular junction. Step 2: Divide distance by time. (250 mm / 5.0 ms = 50 m/s). This is a completely healthy, perfectly normal conduction velocity.",
                category: "Normal Benchmark"
            },
            {
                question: "You are testing the Ulnar Motor nerve. You measure the distance across the forearm as 300 millimeters. Your proximal latency at the elbow was 12.8 milliseconds. Your distal latency at the wrist was 2.8 milliseconds. What is the Conduction Velocity?",
                answer: "30 m/s",
                check: "Correct. Step 1: Subtract the latencies. (12.8 - 2.8 = 10.0 milliseconds). Step 2: Divide distance by time. (300 mm / 10.0 ms = 30 m/s). This velocity has crashed into the 30s. This is a severe primary demyelinating neuropathy, moving slowly enough to confidently diagnose demyelination using the 75% rule.",
                category: "Severe Pathology"
            }
        ],
        pearl: "Why Do We Subtract Latencies? The machine clicks, but the muscle doesn't twitch instantly. The electrical signal has to travel down the nerve, cross the chemical synapse of the Neuromuscular Junction (NMJ), depolarize the muscle membrane, and trigger the mechanical contraction. That takes a lot of time! If we just divided Distance by the Latency, we would include all that extra NMJ time, and our velocities would look artificially slow. By doing two stimulation sites and subtracting Distal Latency from Proximal Latency, the NMJ time is chemically cancelled out. We are left with pure, clean nerve travel time."
    },

    glossary: [
        { term: "Common Mode Rejection", definition: "A differential amplifier's brilliant ability to subtract out identical electrical noise (like 60Hz hum) present at both the Active and Reference electrodes, leaving only the biological nerve signal." },
        { term: "Volume Conduction", definition: "The passive spread of electrical current through bodily tissues and fluids, much like ripples in a pond. This allows muscles from far away to contaminate your recording." },
        { term: "Near-field Potential", definition: "An electrical signal recorded by an electrode located very close to the biological generator (e.g., standard sensory or motor responses). The voltage changes dynamically as the signal moves." },
        { term: "Far-field Potential", definition: "An electrical signal recorded at a massive distance from the generator. Because it is so far away, the voltage change hits all recording electrodes instantaneously at exactly the same time. The massive stimulus artifact is a far-field potential." },
        { term: "Phase Cancellation", definition: "In sensory studies, fast fibers arrive at the electrode early (creating an upward wave), and slower fibers arrive later (creating a downward wave). These opposite waves smash into each other and cancel each other out, artificially reducing the total amplitude the machine reads." },
        { term: "H-Reflex", definition: "An electrical analog of the tendon monosynaptic reflex. It bypasses the muscle spindle by directly stimulating the Ia afferent fibers, travels up to the spinal cord, synapses once, and returns down the motor neuron. Clinically useful for S1 radiculopathy assessment." },
        { term: "Temporal Dispersion", definition: "The broadening of a waveform due to individual nerve fibers conducting at different speeds, common in demyelinating neuropathies. The signals arrive at the recording electrode at different times, spreading the waveform out like a fan." },
        { term: "Cathode", definition: "The active (black) pole of the stimulator where depolarization of the nerve actually begins. Must always be aimed toward recording electrodes to avoid artificially prolonged latency measurements." },
        { term: "Anode", definition: "The positive (red) pole of the stimulator. If placed between the cathode and recording electrodes, it can cause 'anodal block', preventing the action potential from propagating past the stimulation site." },
        { term: "Latency", definition: "The time (in milliseconds) from the stimulus delivery to the initial onset of the recorded waveform. Reflects conduction speed plus neuromuscular junction transmission time for motor studies." },
        { term: "Amplitude", definition: "The height of the waveform (mV for motor CMAP, microvolts for sensory SNAP), representing the total number of axons firing synchronously. Reduced amplitude indicates axonal loss." }
    ],

    quiz: [
        {
            question: "A technician performs an NCS on a patient with icy cold hands from walking outside in the winter. What pattern is this most likely to mimic on the screen?",
            options: [
                "Severe Axonal Loss",
                "A Primary Demyelinating Neuropathy",
                "Complete Nerve Transection"
            ],
            correct: 1,
            explanation: "Cold temperatures decisively slow down nerve conduction velocity and prolong latencies, perfectly mirroring the cardinal signs of demyelination. It also paradoxically increases amplitude."
        },
        {
            question: "You stimulate the ulnar nerve at the wrist, but note the initial deflection off the baseline is a sharp positive (downward) dip before going upward. What is the most likely cause?",
            options: [
                "The G1 (Active) electrode is not placed over the true motor endpoint",
                "The patient has a conduction block at the elbow",
                "The stimulus intensity is not supramaximal"
            ],
            correct: 0,
            explanation: "If G1 is off the motor endpoint, it records the approaching electrical wavefront as volume conduction before the muscle fully depolarizes under it, creating an initial positive (downward) dip."
        },
        {
            question: "Which of the following fibers are you actually evaluating when performing a standard Sural Sensory Nerve Action Potential (SNAP) study?",
            options: [
                "Unmyelinated C-fibers",
                "A-delta fibers",
                "Large, myelinated A-beta fibers"
            ],
            correct: 2,
            explanation: "Standard EDX machines only have the power to resolve the massive, high-speed A-alpha and A-beta fibers. We are completely blind to small pain fibers (A-delta and C fibers)."
        },
        {
            question: "A patient presents 24 hours after an acute knife wound completely severed their median nerve at the elbow. What will the median motor CMAP amplitude look like if you stimulate at the wrist today?",
            options: [
                "It will be completely absent (0 mV)",
                "It will be perfectly normal",
                "It will have a conduction velocity of 20 m/s"
            ],
            correct: 1,
            explanation: "Wallerian degeneration takes time. The distal axon segment remains electrically viable and can conduct an impulse for 3-5 days (motor) before the structure begins to physically dissolve."
        },
        {
            question: "To definitively declare Conduction Block, you stimulate proximally. What must happen to the CMAP response compared to the distal stimulation?",
            options: [
                "Amplitude must drop >50% with minimal temporal dispersion",
                "Velocity must drop below 75% of normal",
                "Amplitude must increase by 20%"
            ],
            correct: 0,
            explanation: "A sudden, massive drop in amplitude across a segment proves the signal hit a focal blockade of demyelination and could not pass. If it spreads out widely instead, that is dispersion, not a true block."
        },
        {
            question: "Why do we subtract Distal Latency from Proximal Latency when calculating motor conduction velocity?",
            options: [
                "To correct for skin temperature differences",
                "To eliminate the time spent crossing the Neuromuscular Junction",
                "To account for phase cancellation"
            ],
            correct: 1,
            explanation: "The chemical transmission across the NMJ is incredibly slow compared to nerve conduction. Subtracting the latencies isolates the pure nerve travel time so our calculated velocity isn't artificially slow."
        }
    ]
};
