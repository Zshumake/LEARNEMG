export const BasicPatternsData = {
    objectives: "Master the systematic analysis of EMG patterns using morphology, stability, and firing characteristics. As you develop your ear, you'll gain expertise in recognizing normal and abnormal spontaneous activity. Listen closely to the sounds, look at the morphology, and use this foundation for accurate electrodiagnostic interpretation.",

    analysisFramework: [
        {
            title: "Morphology",
            items: [
                { label: "Duration", desc: "Time from the initial to final baseline crossing. This reflects the number of muscle fibers firing synchronously in the motor unit." },
                { label: "Amplitude", desc: "Peak-to-peak voltage measurement. Keep in mind, this is heavily dependent on how close your needle tip is to the firing fibers." },
                { label: "Phases", desc: "Baseline crossings plus one. A critical measure of synchrony." },
                { label: "Initial Deflection", desc: "Is it positive (down) or negative (up)? Up is normal (endplate spikes) down means active denervation." },
                { label: "Shape", desc: "Are you seeing a brief spike (fibrillation) or a slow positive wave (PSW)?" }
            ]
        },
        {
            title: "Stability",
            items: [
                { label: "Stable", desc: "The morphology remains completely consistent from firing to firing." },
                { label: "Waxing/Waning", desc: "Amplitude changes smoothly over time. Think 'dive bomber' – classic myotonia." },
                { label: "Decrementing", desc: "A progressive, steady decrease in amplitude." },
                { label: "Abrupt Changes", desc: "Discrete jumps in morphology, often suggesting unstable neuromuscular transmission." },
                { label: "Blocking", desc: "Intermittent failure of a muscle fiber to fire. You'll see the wave occasionally drop an entire phase." }
            ]
        },
        {
            title: "Firing Characteristics",
            items: [
                { label: "Rate", desc: "Ranges from very slow (<2Hz, like fasciculations) to extremely fast (>100Hz, like myotonia)." },
                { label: "Pattern", desc: "Is it perfectly regular (CRDs), irregular (fibrillations), or bursting (myokymia)?" },
                { label: "Rhythm", desc: "Distinguish between a semi-rhythmic 'rain on a tin roof' vs. perfectly regular 'machine-like' firing." },
                { label: "Recruitment", desc: "Observe how units activate with increasing force. Does the rate go up, or do more units jump in?" },
                { label: "Voluntary Control", desc: "Remember this pearl: Nobody has voluntary control under 4-5Hz. If it's firing at 2Hz, it's spontaneous." }
            ]
        }
    ],

    abnormalActivity: [
        {
            id: "fibs-psw",
            title: "Fibrillations & Positive Sharp Waves",
            description: "These represent spontaneous muscle fiber discharges, meaning the fiber lost its nerve supply. This is your classic hallmark of active denervation seen in radiculopathy, neuropathy, or motor neuron disease.",
            videoId: "jjUZMf8_B1k",
            clinicalPearls: [
                { label: "The Sound", value: "Fibrillations sound like 'rain on a tin roof'. PSWs sound like a 'dull thud'." },
                { label: "The Look", value: "Fibrillations are brief spikes (1-5ms) with an initial positive (downward) deflection. PSWs have that same initial positive spike followed by a slow, sweeping negative return." },
                { label: "The Rate", value: "Regular, rhythmic firing between 0.5-10Hz." },
                { label: "The Timeline", value: "These do not appear instantly. Give them 1-3 weeks (or longer) post-injury to develop depending on the distance from the lesion to the muscle." }
            ]
        },
        {
            id: "grade3-psw",
            title: "Grade 3+ Positive Sharp Waves",
            description: "When denervation is severe, you don't just see a few blips. You see abundant positive sharp waves filling the screen across multiple muscle areas. This signifies a structurally significant nerve injury.",
            videoId: "fT6Lx4rnRNs",
            clinicalPearls: [
                { label: "Grade 0", value: "A perfectly clean baseline. None present." },
                { label: "Grade 1+", value: "Persistent single trains in just 2-3 areas. You have to hunt for them." },
                { label: "Grade 2+", value: "A moderate number of potentials found in 3 or more areas." },
                { label: "Grade 3+", value: "Many potentials firing simultaneously in all sampled areas." },
                { label: "Grade 4+", value: "A full 'interference pattern' of spontaneous activity. The screen is completely obliterated by denervation." }
            ]
        },
        {
            id: "crd",
            title: "Complex Repetitive Discharges (CRDs)",
            description: "These sound exactly like a perfectly tuned engine. What you're seeing are individual muscle fibers that are time-linked, firing in an ephaptic loop. We see this in chronic, long-standing neuropathic or myopathic conditions.",
            videoId: "UE-UIRDzZ-U",
            clinicalPearls: [
                { label: "The Sound", value: "An incredibly distinctive, perfectly regular 'machine-like' or 'idling motorcycle' sound." },
                { label: "The Look", value: "Multi-serrated, complex spikes that are completely uniform from discharge to discharge." },
                { label: "The Rate", value: "Typically 5-100Hz. The key is that they are *perfectly* regular, unlike fibs which are semi-rhythmic." },
                { label: "The Mechanism", value: "Ephaptic transmission. One denervated fiber acts as a pacemaker, triggering adjacent denervated fibers in a closed loop." }
            ]
        },
        {
            id: "myokymia",
            title: "Myokymic Discharges",
            description: "Think of an entire motor unit bursting repetitively. It has a very distinct 'marching soldiers' cadence. If you see this in the limbs, strongly consider radiation injury. If you see it in the face, consider MS or a brainstem glioma.",
            videoId: "ZClcikXOOaU",
            clinicalPearls: [
                { label: "The Sound", value: "A rhythmic, rhythmic bursting. 'Marching soldiers' hitting the pavement." },
                { label: "The Look", value: "Grouped, repetitive discharges of the exact same Motor Unit Action Potential (MUAP)." },
                { label: "The Rate", value: "Interburst frequency is 1-5Hz; intraburst frequency is 5-60Hz." },
                { label: "Key Associations", value: "Radiation plexopathy (very common), Multiple Sclerosis (if facial), Guillain-Barré, or chronic compressive neuropathy." }
            ]
        },
        {
            id: "myotonia",
            title: "Myotonic Discharges",
            description: "The classic 'dive bomber.' This is an unstable muscle fiber membrane that repetitively discharges. The defining feature is that it waxes and wanes in both frequency and amplitude.",
            videoId: "X29z-QTi0tM",
            clinicalPearls: [
                { label: "The Sound", value: "A 'dive bomber' or a 'revving motorcycle engine'." },
                { label: "The Look", value: "Spiky waves that smoothly grow and then shrink in amplitude while the firing rate speeds up and slows down." },
                { label: "The Rate", value: "Typically 20-150Hz. Remember, the rate actively changes." },
                { label: "Key Pathology", value: "Myotonic dystrophy, myotonia congenita, paramyotonia congenita, and occasionally hyperkalemic periodic paralysis." }
            ]
        },
        {
            id: "fasciculations",
            title: "Fasciculations",
            description: "This is simply an entire motor unit deciding to fire randomly on its own. While it can be a benign finding, if you see it alongside fibs/PSWs and chronic reinnervation, you need to think ALS.",
            videoId: "u0v4tSZq-Fc",
            clinicalPearls: [
                { label: "The Sound", value: "Random, large, distant 'pops'. Think of 'corn popping' slowly in a microwave." },
                { label: "The Look", value: "A normal-looking (or reinnervated) MUAP that fires spontaneously." },
                { label: "The Rate", value: "Very slow and highly irregular (0.1-10Hz)." },
                { label: "Significance", value: "Hallmark of motor neuron irritability (ALS). However, isolated fasciculations in normal muscle are often benign (caffeine, stress, exercise)." }
            ]
        }
    ],

    motorUnitAnalysis: [
        {
            id: "polyphasia",
            title: "Polyphasic Potentials",
            description: "A normal motor unit fires its fibers synchronously. When they lose that synchrony—either because the nerve is trying to reinnervate new fibers (neuropathy) or fibers are sick and dropping out (myopathy)—you get a complex, jagged waveform.",
            videoId: "liNujyDKe58",
            clinicalPearls: [
                { label: "The Rule", value: "Normal MUAPs have 2-4 phases. >4 phases is considered polyphasic." },
                { label: "The Standard", value: "Up to 10% of MUAPs can be polyphasic in completely healthy muscle. Don't overcall it." },
                { label: "The Sound", value: "A higher-frequency, somewhat 'clicky' or 'scratchy' sound due to the rapid baseline crossings." },
                { label: "The Significance", value: "It is simply a measure of desynchronization. It does NOT distinguish between neuropathy and myopathy." }
            ]
        },
        {
            id: "recruitment",
            title: "Motor Unit Recruitment",
            description: "Recruitment is the single most important tool you have to differentiate a nerve problem from a muscle problem. Does the patient fire one extremely fast unit, or do they immediately recruit fifty tiny units?",
            videoId: "kTJiD1d0NsI",
            clinicalPearls: [
                { label: "The Normal Ratio", value: "Generally ~5:1 (firing rate to the number of active MUAPs)." },
                { label: "Reduced Recruitment", value: "The hallmark of axonal loss (neuropathy). The patient only has a few motor units left, so to generate force, they must fire those remaining units incredibly fast (e.g., 1 unit firing at 20Hz)." },
                { label: "Early Recruitment", value: "The hallmark of myopathy. Each motor unit is weak (fibers died), so the CNS has to recruit many units instantly just to generate minimal force." },
                { label: "Poor Activation", value: "A central issue (pain, Upper Motor Neuron lesion). The patient fires one unit at a slow rate (e.g., 5Hz) and refuses to activate more units or fire faster." }
            ]
        }
    ],

    normalActivity: [
        {
            id: "endplate",
            title: "Normal Spontaneous Activity: The Endplate",
            description: "When your needle tip is sitting directly in the neuromuscular junction, you will irritate the terminal nerve twigs. You must learn to recognize this so you don't confidently misdiagnose the patient with active denervation.",
            videoId: "2QgTg8f0pHE",
            clinicalPearls: [
                { label: "Endplate Noise (MEPPs)", value: "Monophasic negative (upward) potentials causing a continuous 'seashell' roaring sound in the background." },
                { label: "Endplate Spikes", value: "Biphasic potentials caused by needle irritation. They look like fibrillations but ALWAYS have an initial negative (upward) deflection." },
                { label: "The Golden Rule", value: "Endplate potentials start UP (negative). Fibrillation potentials start DOWN (positive). Never call a fib if it starts upward." },
                { label: "The Sound", value: "An irregular, painful 'sputtering' sound. The patient will likely tell you that spot hurts." }
            ]
        }
    ],

    referenceGuide: [
        { pattern: "Fibrillation", source: "Muscle fiber", sound: "Rain on tin roof", rate: "0.5-10 Hz (regular)", stable: "Stable", sig: "Active denervation (neuropathy, radiculopathy, ALS)" },
        { pattern: "Positive Sharp Wave", source: "Muscle fiber", sound: "Dull pops", rate: "0.5-10 Hz (regular)", stable: "Stable", sig: "Active denervation (same as fibrillations)" },
        { pattern: "Complex Repetitive", source: "Multiple muscle fibers", sound: "Machine-like", rate: "5-100 Hz (perfectly regular)", stable: "Usually stable", sig: "Chronic neuropathic/myopathic condition" },
        { pattern: "Myokymic", source: "Motor unit", sound: "Marching soldiers", rate: "1-5 Hz (interburst)", stable: "Usually stable", sig: "Radiation injury, facial MS, Guillain-Barré" },
        { pattern: "Myotonic", source: "Muscle fiber", sound: "Revving engine/Dive bomber", rate: "20-150 Hz", stable: "Waxing/waning", sig: "Myotonic dystrophy, myotonia congenita" },
        { pattern: "Fasciculation", source: "Motor unit", sound: "Corn popping", rate: "Low (0.1-10 Hz)", stable: "Stable", sig: "Motor neuron disease, benign fasciculations" },
        { pattern: "Endplate Spike", source: "Terminal axon twig", sound: "Sputtering (painful)", rate: "5-50 Hz (irregular)", stable: "Stable", sig: "Normal (needle sitting in the neuromuscular junction)" }
    ],

    advancedScenarios: [
        {
            id: "case1",
            title: "Case 1: Motor Neuron Disease",
            clinical: "A 55-year-old male presenting with progressive, painless, asymmetric limb weakness and visible twitching in his arms.",
            findings: "Abundant (3+) fibrillations and PSWs in three limbs, extremely large duration and high-amplitude polyphasic MUAPs, profoundly reduced recruitment, and frequent fasciculations.",
            features: [
                "The fibs/PSWs prove there is severe active, ongoing denervation.",
                "The huge MUAPs prove this has been happening essentially forever (the remaining axons have taken over orphaned fibers).",
                "The fasciculations highlight the hallmark irritability of the dying anterior horn cells.",
                "Reduced recruitment occurs because entire motor units are dead."
            ]
        },
        {
            id: "case2",
            title: "Case 2: Myotonic Dystrophy",
            clinical: "A 35-year-old female complaining of hand weakness and an inability to let go of doorknobs after turning them.",
            findings: "Florid myotonic discharges, distinctly small, brief, and polyphasic MUAPs, and an early recruitment pattern.",
            features: [
                "The 'dive bomber' sound confirms the unstable muscle membrane (myotonia).",
                "The MUAPs are small and brief because muscle fibers have died off within the motor unit (myopathy).",
                "Early recruitment happens because the CNS must fire dozens of weak units immediately just to try and grip the doorknob."
            ]
        }
    ]
};
