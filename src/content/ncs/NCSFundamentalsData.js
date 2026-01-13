/**
 * NCSFundamentalsData.js
 * Comprehensive clinical data, technical factors, patterns, and quiz data for the NCS Fundamentals module.
 * Source: Preston & Shapiro, Chapters 3 & 8.
 */

export const NCSFundamentalsData = {
    header: {
        title: "NCS Fundamentals",
        subtitle: "Master the physiology, technique, and interpretation of nerve conduction studies."
    },

    tabs: [
        { id: 'foundations', label: 'Physics & Physiology' },
        { id: 'methods', label: 'Setup & Methods' },
        { id: 'technical', label: 'Technical Factors' },
        { id: 'interpretation', label: 'Interpretation' },
        { id: 'calculations', label: 'Math & Calcs' },
        { id: 'quiz', label: 'Quiz' }
    ],

    physiology: {
        actionPotential: [
            { stage: "Resting", value: "-70mV", detail: "Maintained by Na+/K+ ATPase pump (3 Na+ out / 2 K+ in)." },
            { stage: "Threshold", value: "-55mV", detail: "Triggers explosive opening of voltage-gated Na+ channels." },
            { stage: "Depolarization", value: "+30mV", detail: "Rapid Na+ influx; the 'all-or-none' spike." },
            { stage: "Repolarization", value: "Restoring", detail: "Na+ channels inactivate; K+ channels open (efflux)." },
            { stage: "Hyperpolarization", value: "Overshoot", detail: "Potential drops below -70mV before stabilizing." }
        ],
        conduction: {
            process: "Saltatory Conduction",
            detail: "APs 'jump' between Nodes of Ranvier. Myelin acts as insulation (high resistance) and capacitor (low capacitance), drastically increasing speed.",
            staircase: "Distance/Latency graph is a 'staircase': latency increases at nodes (depolarization time) but stays flat across internodes."
        },
        fiberTypes: [
            {
                name: "A-alpha (Motor)",
                diameter: "12-20μm",
                velocity: "70-120 m/s",
                function: "Motor / Muscle Spindles (Ia)",
                color: "rgba(254, 243, 199, 0.5)"
            },
            {
                name: "A-beta (Sensory)",
                diameter: "6-12μm",
                velocity: "35-75 m/s",
                function: "Light Touch / Pressure",
                color: "rgba(209, 250, 229, 0.5)"
            },
            {
                name: "A-delta (Small Myelinated)",
                diameter: "1-5μm",
                velocity: "5-30 m/s",
                function: "Sharp Pain / Temp",
                color: "rgba(219, 234, 254, 0.5)"
            },
            {
                name: "C (Unmyelinated)",
                diameter: "0.4-1.2μm",
                velocity: "0.5-2 m/s",
                function: "Dull Pain / Temp / Autonomic",
                color: "rgba(243, 244, 246, 0.5)"
            }
        ]
    },

    methods: {
        recording: {
            montage: "Belly-Tendon Montage (G1-G2)",
            g1: "Active Electrode: Placed over the motor point (endplate) or sensory nerve segment.",
            g2: "Reference Electrode: Placed distally over an electrically silent area (tendon or non-innervated site).",
            principle: "The machine records the difference (G1 - G2). If G1 is 'off' the motor point, an initial positive deflection occurs (volume conduction from distance)."
        },
        direction: [
            {
                type: "Antidromic",
                direction: "Toward sensory receptor (e.g., Wrist to Finger).",
                pros: "Higher amplitudes (electrodes closer to digital nerves).",
                cons: "May be followed by volume-conducted motor potentials; ensure SNAP duration is brief (1.5ms)."
            },
            {
                type: "Orthodromic",
                direction: "Away from sensory receptor (e.g., Finger to Wrist).",
                pros: "No motor interference; cleaner baseline.",
                cons: "Lower amplitudes due to increased tissue depth at the wrist."
            }
        ],
        supramaximal: {
            definition: "Stimulation 20-25% beyond maximal response.",
            reason: "Ensures ALL axons are recruited. Failure to reach this simulated axonal loss or conduction block."
        }
    },

    technicalFactors: {
        temperature: {
            title: "Temperature (Most Important)",
            effects: "Cold = Slowed CV, Prolonged Latency, Paradoxically Higher Amplitude (less phase cancellation).",
            correction: "Velocity: 1.5 - 2.5 m/s per 1°C drop | Latency: 0.2 ms per 1°C increase.",
            ideal: "Target skin temp: 32-34°C."
        },
        noise: {
            type: "60 Hz Interference",
            cause: "Electrode Impedance Mismatch (G1 and G2 have different resistances).",
            solution: "Clean skin (alcohol/acetone), use conducting jelly, ensure identical electrode types."
        },
        filters: [
            { type: "Motor Filter", lff: "10 Hz", hff: "10 kHz", note: "Higher HFF allows faithful recording of large CMAPs." },
            { type: "Sensory Filter", lff: "20 Hz", hff: "2 kHz", note: "Lower HFF (2kHz) reduces high-frequency noise for tiny SNAPs." }
        ],
        artifact: {
            trailing: "Stimulus Artifact",
            mitigation: ["Place ground between stimulator and electrodes", "Rotate anode while keeping cathode fixed", "Use coaxial recording cables"]
        }
    },

    interpretation: {
        axonalLoss: {
            title: "Axonal Loss (e.g., Trauma, Vasculitis)",
            primary: "Reduced Amplitude (lowered CMAP/SNAP peak-to-peak).",
            secondary: "Relatively preserved CV (>75% LLN) and Latency (<130% ULN).",
            note: "Wallerian degeneration takes 3-5 days (motor) and 6-10 days (sensory) to show amplitude drop."
        },
        demyelination: {
            title: "Demyelination (e.g., GBS, CIDP, Entrapment)",
            primary: "Marked slowing (CV < 70-75% LLN) or Prolonged Latency (>130% ULN).",
            secondary: "Increased Duration (due to temporal dispersion)."
        },
        conductionBlock: {
            title: "Conduction Block vs Dispersion",
            block: "Focal Demyelination: Abrupt >50% drop in CMAP Area/Amplitude between proximal and distal sites with MINIMAL duration change.",
            dispersion: "Different fiber speeds: Drop in amplitude but INCREASING duration (>15-20% increase)."
        }
    },

    calculations: {
        formula: "CV (m/s) = Distance (mm) / (Proximal Latency - Distal Latency)",
        practice: [
            {
                question: "Median Motor: Distance 250mm, Wrist Lat 3.5ms, Elbow Lat 8.5ms. CV?",
                answer: "50 m/s",
                check: "250 / (8.5 - 3.5) = 250 / 5 = 50. Normal level.",
                category: "Normal"
            },
            {
                question: "Ulnar Motor: Distance 300mm, Wrist Lat 2.8ms, Elbow Lat 12.8ms. CV?",
                answer: "30 m/s",
                check: "300 / (12.8 - 2.8) = 300 / 10 = 30. Demyelinating range.",
                category: "Pathology"
            }
        ]
    },

    glossary: [
        { term: "Common Mode Rejection", definition: "Differential amplifier's ability to subtract out identical noise present at G1 and G2." },
        { term: "Volume Conduction", definition: "Passive spread of electrical current through tissue/fluids." },
        { term: "Near-field Potential", definition: "Recorded close to the source (e.g., standard SNAP/CMAP)." },
        { term: "Far-field Potential", definition: "Recorded at a distance, appears instantly (e.g., Stimulus Artifact, F-wave components)." },
        { term: "Supramaximal", definition: "Intensity reaching beyond the recruitment of all axons to ensure stability." }
    ],

    quiz: [
        {
            id: 1,
            question: "Which setting change would likely increase a measured CMAP amplitude?",
            options: [
                { text: "Raising the LFF (Low Frequency Filter)", correct: false },
                { text: "Lowering the limb temperature", correct: true, feedback: "Correct! Cold increases individual fiber duration and reduces phase cancellation, paradoxically raising amplitudes." },
                { text: "Performing an orthodromic sensory study", correct: false }
            ]
        },
        {
            id: 2,
            question: "A conduction velocity of 25 m/s at birth is considered:",
            options: [
                { text: "Severely demyelinating", correct: false },
                { text: "Normal for age", correct: true, feedback: "Correct! Newborn CVs are roughly 50% of adult values." },
                { text: "Consistent with axonal loss", correct: false }
            ]
        },
        {
            id: 3,
            question: "True Conduction Block is best defined as a proximal/distal CMAP area drop of:",
            options: [
                { text: ">20%", correct: false },
                { text: ">50% with minimal temporal dispersion", correct: true, feedback: "Correct! A >50% drop without significant spreading suggests focal block." },
                { text: ">80%", correct: false }
            ]
        },
        {
            id: 4,
            question: "Why is the LFF higher for sensory (20Hz) vs motor (10Hz) studies?",
            options: [
                { text: "To increase amplitude", correct: false },
                { text: "To stabilize the baseline against low-frequency artifacts", correct: true, feedback: "Correct! Helping isolate the small pulse from baseline wander." },
                { text: "To reduce stimulus artifact", correct: false }
            ]
        },
        {
            id: 5,
            question: "Impedance mismatch typically results in which artifact?",
            options: [
                { text: "Stimulus artifact", correct: false },
                { text: "60 Hz interference", correct: true, feedback: "Correct! Unequal resistance at G1/G2 prevents the amplifier from canceling ambient noise." },
                { text: "Far-field potentials", correct: false }
            ]
        },
        {
            id: 6,
            question: "In Saltatory Conduction, where does depolarization occur?",
            options: [
                { text: "Along the entire axolemma", correct: false },
                { text: "Only at the Nodes of Ranvier", correct: true, feedback: "Correct! The signal 'jumps' between these gaps in the myelin." },
                { text: "Within the myelin sheath", correct: false }
            ]
        }
    ]
};
