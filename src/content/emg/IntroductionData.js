/**
 * IntroductionData.js
 * Clinical content and glossary data for the EMG Introduction module.
 * Restructured into 5 consolidated domains for better UX.
 */

export const IntroductionData = {
    header: {
        title: "Electromyography Fundamentals",
        subtitle: "Master the clinical reasoning, technical precision, and localization patterns that define expert Electrodiagnostic (EDX) medicine."
    },

    tabs: [
        { id: 'philosophy', label: 'Clinical Philosophy' },
        { id: 'basics', label: 'EDX Basics' },
        { id: 'instrumentation', label: 'Instrumentation' },
        { id: 'technical', label: 'Technical Excellence' },
        { id: 'localization', label: 'Localization Patterns' },
        { id: 'terminology', label: 'Mastery Glossary' }
    ],

    philosophy: {
        core: {
            title: "The Extension of the Exam",
            text: "Electrodiagnostic (EDX) studies are not a 'black box' test. They serve as a powerful extension of the clinical neurologic examination. Every study must be individualized, based on the neurologic examination and differential diagnosis, and modified in real time.",
            aim: "The principal goal of every EDX study is to localize the disorder."
        },
        encounter: [
            { step: 1, title: "Clinical History", detail: "Symptoms, duration, and relevant medical history (Diabetes, Chemo, etc.)." },
            { step: 2, title: "Directed Physical Exam", detail: "Assess atrophy, tone, weakness (localization), and reflexes." },
            { step: 3, title: "Differential Diagnosis", detail: "Plan the study based on likely localizations." },
            { step: 4, title: "The Willy Sutton Rule", detail: "Go where the money is. Start with the most suspicious nerves and muscles first in case the patient fatigues." }
        ],
        cardinalRules: [
            { id: 1, title: 'Clinical Correlation First', color: '#2563eb', text: "Don't treat the number; treat the patient. If the find doesn't match the clinical symptom, question the finding." },
            { id: 2, title: 'Think Technical Factors', color: '#ef4444', text: "When you see an abnormality, ask: Is the hand cold? Did I measure wrong? Is the cathode moved?" },
            { id: 3, title: 'Re-examine the Patient', color: '#f59e0b', text: "If EDX implies weakness you didn't see - go back and exam that muscle again. They must marry." },
            { id: 4, title: 'Supramaximal Stimulation', color: '#059669', text: "Increase current until the response stops growing, then add 20%. Submaximal stim causes errors." },
            { id: 5, title: 'Optimal Positions', color: '#8b5cf6', text: "Move the cathode around to find the spot that gives the maximal response (lowest threshold)." },
            { id: 6, title: "Don't Overcall", color: '#475569', text: "Beware of 'borderline' findings with no clinical correlate. Sensitivity is good; Specificity is better." }
        ]
    },

    basics: {
        anatomy: [
            {
                title: "The Motor Unit",
                detail: "One Anterior Horn Cell + Its Axon + all innervated muscle fibers. The fundamental functional unit of the peripheral motor system.",
                image: "images/anatomy/motor_unit.png"
            },
            {
                title: "Nerve Structure",
                detail: "Epineurium (outer sheath), Perineurium (blood-nerve barrier), and Endoneurium (surrounds individual axons).",
                image: "images/anatomy/nerve_structure_new.png"
            }
        ],
        physiology: [
            {
                title: "Saltatory Conduction",
                detail: "Action potentials 'jump' between Nodes of Ranvier. Myelin acts as an insulator, allowing speeds of 50-70 m/s.",
                image: "images/anatomy/saltatory_conduction.png"
            },
            {
                title: "Primary Neurons",
                detail: "Motor neurons reside in the ventral horn of the spinal cord. Sensory neurons (DRGs) reside outside the cord near the intervertebral foramen.",
                image: "images/anatomy/primary_neuron_localization.png"
            }
        ],
        equipment: {
            amplifiers: "Differential amplifiers cancel common noise using Common Mode Rejection Ratio (CMRR >= 90dB).",
            filters: "Standard NCS Settings: LFF (10-20 Hz) to HFF (2-10 kHz). Standard EMG Settings: LFF (10-20 Hz) to HFF (10 kHz)."
        }
    },

    technical: {
        physiologic: [
            { factor: "Temperature", effect: "Cold nerves conduct slower but have HIGHER amplitudes. 1°C drop = ~2 m/s slower CV." },
            { factor: "Age", effect: "CV drops 0.5-4.0 m/s per decade after 60. Peak velocity is at age 20-30." },
            { factor: "Height", effect: "Tall individuals have slower distal conduction velocities due to longer axons and tapering." }
        ],
        nonPhysiologic: [
            { factor: "60Hz Noise", cause: "Impedance mismatch between G1 and G2. Solution: Scrub skin, use gel, or check ground." },
            { factor: "Stimulus Artifact", cause: "Electrical spread from stimulator. Mitigation: Dry skin, place ground between stim and recording." }
        ],
        safety: {
            pacemakers: "NCS is generally safe for pacemakers/ICDs, but avoid stimulating directly over the device/leads.",
            anticoagulation: "EMG is a relative contraindication (esp. deep muscles) if INR is very high (>3.0) or on newer agents.",
            infection: "Use universal precautions. Disposable needles are mandatory."
        }
    },

    localization: {
        pathophysiology: [
            {
                type: "Axonal Loss",
                findings: "Reduced Amplitudes. Wallerian degeneration takes 3-7 days (motor) and up to 11 days (sensory).",
                prognosis: "Guarded; requires slow axonal regrowth (1mm/day)."
            },
            {
                type: "Demyelination",
                findings: "Slowing (CV < 70% LLN), Prolonged Distal Latencies (>130% ULN), and Conduction Block / Temporal Dispersion.",
                prognosis: "Excellent; remyelination usually occurs in weeks."
            }
        ],
        patterns: [
            { site: "Radiculopathy", snap: "Normal (Lesion is proximal to DRG)", cmap: "May be low if severe" },
            { site: "Plexopathy", snap: "Reduced/Absent (Lesion is distal to DRG)", cmap: "Reduced/Absent" },
            { site: "NMJ Disorder", snap: "Normal", cmap: "Normal (unless severe decrement)" }
        ]
    },

    glossary: [
        { term: "Action Potential", category: "Physiology", def: "A rapid rise and fall in voltage across a cellular membrane. The fundamental unit of information in the nervous system." },
        { term: "Aliasing", category: "Technical", def: "Distortion of a signal when sampled at a rate less than twice its highest frequency component (Nyquist rate)." },
        { term: "Amplitude", category: "NCS", def: "Height of the waveform. CMAP: Reflects number of muscle fibers. SNAP: Reflects number of sensory axons." },
        { term: "Antidromic", category: "NCS", def: "Nerve impulse propagation in the direction opposite to physiological conduction." },
        { term: "Artifact", category: "Technical", def: "Any voltage potential not originating from the target biological source (e.g., 60Hz noise, stimulus artifact)." },
        { term: "Axonal Loss", category: "Pathology", def: "Pathology where the axon itself is damaged. Hallmark: Reduced Amplitude." },
        { term: "Baseline", category: "Technical", def: "The flat line on the trace representing zero voltage potential." },
        { term: "Cathode", category: "Technical", def: "The negative pole of the stimulator (Black). Depolarization occurs here. Crucial: Must be placed closest to the recording electrode." },
        { term: "CMAP", category: "NCS", def: "Compound Muscle Action Potential. Summation of all underlying muscle fiber action potentials." },
        { term: "Common Mode Rejection", category: "Technical", def: "The ability of a differential amplifier to cancel out signals that are identical at both inputs (G1 and G2), reducing noise." },
        { term: "Conduction Block", category: "Pathology", def: "Failure of an action potential to propagate past a focal lesion despite the axon being intact. Definition: >50% drop in area/amplitude between proximal and distal sites." },
        { term: "Conduction Velocity", category: "NCS", def: "The speed of propagation of an action potential along a nerve (m/s). Reflects the health of Myelin." },
        { term: "Demyelination", category: "Pathology", def: "Loss or damage to the myelin sheath. Hallmark: Classically Slowed CV (>30% drop) and Prolonged Latency (>130% ULN)." },
        { term: "Duration", category: "NCS", def: "Time from onset to termination of a potential. Prolonged duration = Temporal Dispersion." },
        { term: "Epineurium", category: "Anatomy", def: "The dense connective tissue sheath surrounding a peripheral nerve trunk." },
        { term: "F-Wave", category: "NCS", def: "A late response resulting from antidromic activation of the motor neuron, which backfires orthodromically. Measures proximal nerve segment." },
        { term: "Fasciculation", category: "EMG", def: "Spontaneous, involuntary contraction of a single motor unit. Visible as a flicker ('worms under skin')." },
        { term: "Fibrillation Potential (Fib)", category: "EMG", def: "Spontaneous depolarization of a single muscle fiber. Invisible to the eye. Sign of denervation." },
        { term: "Gain (Sensitivity)", category: "Technical", def: "Amplification of the signal (uV/div or mV/div)." },
        { term: "H-Reflex", category: "NCS", def: "Electrical equivalent of the tendon reflex. Submaximal stim, bypasses muscle spindle. True reflex loop." },
        { term: "Impedance", category: "Technical", def: "Resistance to alternating current flow. Mismatch between G1/G2 causes 60Hz noise." },
        { term: "Insertional Activity", category: "EMG", def: "Electrical activity caused by needle movement. Increased: Denervation/Myotonia. Decreased: Fibrosis/Fat." },
        { term: "Jitter", category: "EMG", def: "Variability in time interval between two muscle fiber action potentials from the same motor unit. Hallmark of NMJ disorders (SFEMG)." },
        { term: "Latency (Onset)", category: "NCS", def: "Time (ms) from stimulus to the first deflection from baseline. Reflects fastest conducting fibers." },
        { term: "Motor Unit", category: "Anatomy", def: "One Anterior Horn Cell + Its Axon + All Muscle Fibers it innervates." },
        { term: "MUAP", category: "EMG", def: "Motor Unit Action Potential. The electrical activity of a single motor unit seen during voluntary contraction." },
        { term: "Myokymia", category: "EMG", def: "Spontaneous, rhythmic, grouped repetitive discharges of the same motor unit. Sounds like 'Marching Soldiers'." },
        { term: "Myopathic Recruitment", category: "EMG", def: "Early/Full recruitment of small, polyphasic units with low force generation." },
        { term: "Neuropathic Recruitment", category: "EMG", def: "Reduced recruitment (Fast firing rate of few units). 'Picket Fence' pattern." },
        { term: "Nodes of Ranvier", category: "Anatomy", def: "Gaps in the myelin sheath where saltatory conduction occurs." },
        { term: "Orthodromic", category: "NCS", def: "Propagation of an impulse in the physiological direction (e.g., Motor: Proximal to Distal)." },
        { term: "Phase Cancellation", category: "NCS", def: "Reduction in amplitude/area due to asynchronous arrival of positive and negative phases of action potentials (seen in Temporal Dispersion)." },
        { term: "Polyphasic", category: "EMG", def: "A MUAP with >4 phases (baseline crossings + 1). Non-specific sign of reinnervation or myopathy." },
        { term: "Positive Sharp Wave (PSW)", category: "EMG", def: "Spontaneous discharge of a single muscle fiber. initial positive (down) deflection. Significance same as Fibs." },
        { term: "Recruitment", category: "EMG", def: "The process of adding motor units to increase force. Follows Henneman's Size Principle (Small -> Large)." },
        { term: "Reference Electrode (G2)", category: "Technical", def: "The electrode paired with the active electrode (G1) for differential amplification." },
        { term: "Rise Time", category: "EMG", def: "Time from onset to peak of the negative phase. <500us indicates the needle is close to the fiber." },
        { term: "Saltatory Conduction", category: "Physiology", def: "The 'jumping' of action potentials from one Node of Ranvier to the next. Increases velocity energy-efficiently." },
        { term: "Satellite Potential", category: "EMG", def: "A small late potential linked to the main MUAP. Represents a reinnervated fiber with slow conduction (immature sprout)." },
        { term: "SNAP", category: "NCS", def: "Sensory Nerve Action Potential. Summation of sensory fiber APs. Has no NMJ transmission time." },
        { term: "Stimulus Artifact", category: "Technical", def: "Electrical spread from the stimulator to the recording electrodes. Reduce by lowering impedance and drying skin." },
        { term: "Sweep Speed", category: "Technical", def: "The horizontal time base of the display (ms/div)." },
        { term: "Temporal Dispersion", category: "NCS", def: "Spreading out of the waveform duration due to different conduction velocities of underlying fibers." },
        { term: "Wallerian Degeneration", category: "Pathology", def: "Anterograde degeneration of the axon and myelin distal to a transection/lesion." },
    ],

    masteryTerms: [
        { term: "Common Mode Rejection", definition: "Differential amplifier's ability to subtract out identical noise present at G1 and G2." },
        { term: "Volume Conduction", definition: "Passive spread of electrical current through tissue/fluids." },
        { term: "Near-field Potential", definition: "Recorded close to the source (e.g., standard SNAP/CMAP)." },
        { term: "Far-field Potential", definition: "Recorded at a distance, appears instantly (e.g., Stimulus Artifact, F-wave components)." },
        { term: "Supramaximal", definition: "Intensity reaching beyond the recruitment of all axons to ensure stability." }
    ]
};
