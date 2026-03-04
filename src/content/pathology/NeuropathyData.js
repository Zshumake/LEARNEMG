export const NeuropathyData = {
    header: {
        title: "Neuropathy Pathophysiology",
        subtitle: "From fundamental cellular mechanisms to the clinical diagnosis of peripheral nerve disorders. Master the 'why' before the 'what'."
    },

    tabs: [
        { id: 'anatomy', label: 'Anatomy & Function', icon: 'M6 18h8 M3 22h18 M14 22a7 7 0 1 0 0-14h-1 M9 14h2 M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3' },
        { id: 'mechanisms', label: 'Injury Mechanisms', icon: 'M13 2L3 14 12 14 11 22 21 10 12 10 13 2z' },
        { id: 'injury-classification', label: 'Injury Classification', icon: 'M16 3h5v5 M4 20L21 3 M21 16v5h-5 M15 15l6 6 M4 4l5 5' },
        { id: 'correlations', label: 'EDX Correlations', icon: 'M3 3h18v18H3z M3 9h18 M9 21V9 M15 21V9' },
        { id: 'classification', label: 'Fiber Classification', icon: 'M8.5 2h7 M12 2v20 M6.5 22h11 M8.5 2v10l-4 8v2h15v-2l-4-8V2' },
        { id: 'atlas', label: 'Clinical Atlas', icon: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z M9 3v15 M15 6v15' }
    ],

    anatomy: {
        intro: {
            title: "Fundamental Nerve Anatomy & Function",
            text: "Before we can understand how nerves break down, we must understand how they are built. The peripheral nerve is not a single wire; it is a complex, heavily armored micro-cable system designed to rapidly transmit high-fidelity signals across vast physiological distances."
        },
        components: [
            {
                title: "The Nerve Architecture",
                iconColor: "#3b82f6",
                bgColor: "#f8fafc",
                borderColor: "#3b82f6",
                points: [
                    "<strong>Epineurium (The Outer Armor):</strong> The heavy-duty connective tissue wrapping the entire nerve. It cushions against physical trauma and compression. This is what the surgeon sees.",
                    "<strong>Perineurium (The Blood-Nerve Barrier):</strong> An incredibly dense sleeve that bundles specific groups of axons into 'fascicles'. This layer actively controls the microenvironment, keeping toxins out. If this is breached, the nerve is highly vulnerable.",
                    "<strong>Endoneurium (The Inner Wrap):</strong> The delicate connective matrix surrounding individual axons and their Schwann cells, maintaining fluid pressure."
                ]
            },
            {
                title: "Schwann Cells & Myelin",
                iconColor: "#22c55e",
                bgColor: "#f0fdf4",
                borderColor: "#22c55e",
                points: [
                    "<strong>The Insulation:</strong> Myelin isn't just fat; it is the living cell membrane of a Schwann cell spiraled hundreds of times around an axon. In the PNS, one Schwann cell creates one internode of myelin.",
                    "<strong>Nodes of Ranvier:</strong> The microscopically small, unmyelinated gaps between Schwann cells where the action potential 're-charges' via dense clusters of sodium channels.",
                    "<strong>Saltatory Conduction:</strong> Because of the myelin insulation, the electrical signal doesn't flow like water; it 'jumps' (saltates) from Node to Node. This evolutionary masterpiece increases conduction velocity from 1m/s to over 70m/s."
                ]
            }
        ],
        physiology: {
            title: "Cellular Physiology & The Metabolic Burden",
            text: "A motor neuron in your spinal cord sending an axon down to your toe is mathematically equivalent to a grapefruit in New York City growing a garden hose all the way to Los Angeles. The metabolic demand is staggering.",
            points: [
                "<strong>The Cell Body (Soma):</strong> The factory. Located in the anterior horn (motor) or Dorsal Root Ganglion (DRG, sensory). It produces all the proteins, neurotransmitters, and organelles required for the entire nerve.",
                "<strong>Anterograde Transport:</strong> Fast transport (400 mm/day) moves cargo (like vesicles) on microtubule 'tracks' driven by Kinesin motors down to the synapse.",
                "<strong>Retrograde Transport:</strong> Slower transport (200 mm/day) moves waste and chemical 'survival signals' from the muscle back up to the cell body via Dynein motors.",
                "<strong>The 'Dying Back' Phenomenon:</strong> When the cell body is metabolically stressed (e.g., from Diabetes or Toxins), it can no longer maintain its longest, most distant 'hoses'. The axon slowly retreats from the toes upward, creating the classic 'stocking-glove' pattern of length-dependent neuropathy."
            ]
        },
        pearl: "Remember the DRG location! Because the sensory cell body lives *outside* the spinal cord in the DRG, a herniated disc compressing a nerve root (Radiculopathy) will damage the motor wire but leave the sensory wire physically connected to its life-source. This is why in a Radiculopathy, the sensory study (SNAP) remains completely normal despite the patient feeling numb! It is the most powerful localizing pearl in the lab."
    },

    mechanisms: {
        title: "Injury Mechanisms: How Nerves Fail",
        cards: [
            {
                type: "Ischemic Dysfunction",
                subtitle: "(Transient Metabolic Block)",
                color: "#f59e0b",
                bg: "#fffbeb",
                icon: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z",
                mechanism: "Compression restricts microvascular blood flow (vasa nervorum), depriving the nerve of oxygen and ATP. Without ATP, the sodium/potassium pumps fail, and the nerve cannot fire.",
                findings: "<strong>Purely functional failure.</strong> Think of your foot 'falling asleep' when your legs are crossed. There is NO structural damage. The moment pressure is relieved and blood returns, the paresthesias resolve in minutes.",
                prognosis: "Immediate and complete recovery. The EDX study is entirely normal (if tested after the numbness resolves)."
            },
            {
                type: "Local Demyelination",
                subtitle: "(Conduction Block)",
                color: "#3b82f6",
                bg: "#eff6ff",
                icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
                mechanism: "Sustained pressure causes local ischemia that damages the delicate Schwann cells. The myelin sheath physically unspools or breaks apart at the site of compression. The underlying axon 'wire' remains perfectly intact.",
                findings: "Because the insulation is missing, the electrical signal either 'leaks' and travels incredibly slowly, or it fails to jump the gap entirely (<strong>Conduction Block</strong>). The patient experiences profound weakness or numbness.",
                prognosis: "Excellent! The Schwann cells simply need to re-wrap the nerve. Remyelination takes <strong>weeks to months</strong>. Because the axon never died, the muscle never atrophies."
            },
            {
                type: "Wallerian Degeneration",
                subtitle: "(Axonal Loss)",
                color: "#ef4444",
                bg: "#fef2f2",
                icon: "M18.36 6.64a9 9 0 1 1-12.73 0",
                mechanism: "Severe crush or cut injury severs the actual axon 'wire'. Without attachment to the cell body, the distal portion of the axon physically dissolves into fragments over 7-10 days, leaving empty myelin tubes behind.",
                findings: "The 'road' is broken. On NCS, the amplitude crashes because fewer wires exist to carry the current. On EMG, the disconnected muscle fibers become unstable and cry out spontaneously (<strong>Fibrillation potentials & Positive Sharp Waves</strong>).",
                prognosis: "Guarded to Poor. The nerve must physically regrow from the injury site all the way down to the muscle at a painfully slow rate of <strong>1 millimeter per day (1 inch per month)</strong>. If it takes too long (e.g., >18 months for a shoulder injury to reach the hand), the muscle turns to fat and the repair fails permanently."
            }
        ],
        pearl: "The 7-Day Waiting Period: If a patient severs their ulnar nerve today in a glass accident, their NCS study on day 1 will look completely normal below the cut! Why? Because Wallerian degeneration takes time. It takes 5-7 days for motor axons to physically dissolve, and 10-11 days for sensory axons. Never do an EDX study on a traumatic nerve injury less than a week after the event!"
    },

    injuryClassification: {
        intro: "Classification Systems",
        text: "Two major classification systems are used to grade nerve injuries. Seddon's is the classic clinical model, while Sunderland's provides the microscopic anatomical detail required for complex prognostication.",
        seddon: [
            { grade: "Neurapraxia", desc: "Focal demyelination without axonal damage. Conduction block is present, but recovery is complete (weeks to months) once compression is removed. No Wallerian degeneration occurs." },
            { grade: "Axonotmesis", desc: "The axon is severed, but the connective tissue tubes (Endoneurium, Perineurium) are entirely intact. Wallerian degeneration occurs. The nerve regenerates well because it has a perfectly intact 'tunnel' to guide it back to the muscle (1mm/day)." },
            { grade: "Neurotmesis", desc: "The nerve and all connective tissue sheaths are completely severed (e.g., a knife wound). Spontaneous recovery is impossible. Neuroma formation is common. Requires surgical grafting." }
        ],
        sunderland: [
            { grade: "Type I", anatomical: "Myelin damage only", seddonEq: "Neurapraxia", recovery: "Complete", timeline: "Days to weeks" },
            { grade: "Type II", anatomical: "Axon severed, Endoneurium intact", seddonEq: "Axonotmesis", recovery: "Good-Excellent", timeline: "1mm / day (Months)" },
            { grade: "Type III", anatomical: "Endoneurium disrupted, Perineurium intact", seddonEq: "Axonotmesis", recovery: "Poor-Fair", timeline: "Variable, often incomplete" },
            { grade: "Type IV", anatomical: "Perineurium disrupted, Epineurium intact", seddonEq: "Axonotmesis", recovery: "Very Poor", timeline: "Neuroma-in-continuity forms" },
            { grade: "Type V", anatomical: "Complete nerve transection", seddonEq: "Neurotmesis", recovery: "None", timeline: "Requires surgery" }
        ],
        pearl: "Why does Sunderland matter? If just the endoneurium is torn (Type III), the regenerating nerve sprouts can get 'confused' and grow down the wrong tube, leading to aberrant regeneration (e.g., moving a finger causes the thumb to twitch). If the perineurium is torn (Type IV), scar tissue forms a localized 'knot' (neuroma-in-continuity) that mechanically blocks any regrowth, requiring resection."
    },

    correlations: {
        intro: "The EDX Truth Table",
        text: "Electrodiagnosis isn't about memorizing numbers; it's about translating electrical physics back into cellular biology. The machine is answering two specific questions: 'Is it the Insulation or the Wire?' and 'Where is the break?'",
        table: [
            {
                patho: "Demyelination",
                clinical: "Weakness without atrophy. Numbness.",
                ncs: "Velocities SLOW (<75% LLN). Distal Latencies PROLONGED (>130% ULN). Conduction Block. F-waves severely delayed.",
                emg: "Normal appearing motor units, simply firing less often (reduced recruitment). No spontaneous rest activity."
            },
            {
                patho: "Axonal Loss",
                clinical: "Profound atrophy. Weakness. Numbness.",
                ncs: "Velocities mostly PRESERVED. CMAP/SNAP Amplitudes severely REDUCED. (The surviving wires conduct at normal speeds, there are just fewer of them).",
                emg: "Spontaneous rest activity (Fibrillation potentials / PSWs). Reinnervation patterns: giant, polyphasic motor units."
            },
            {
                patho: "Pre-Ganglionic (Radiculopathy)",
                clinical: "Pain radiating down limb. Myotomal weakness in a spine-root distribution (e.g., C6).",
                ncs: "Sensory SNAPs are perfectly NORMAL. Motor CMAPs may be reduced in severe cases.",
                emg: "Abnormalities found in muscles sharing the same root (e.g., Pronator Teres and Biceps for C6), including the paraspinal muscles of the back."
            },
            {
                patho: "Post-Ganglionic (Plexopathy/Neuropathy)",
                clinical: "Weakness or numbness restricted to a specific peripheral nerve territory (e.g., Ulnar).",
                ncs: "Sensory SNAPs are REDUCED or ABSENT (the lesion is distal to the DRG).",
                emg: "Abnormalities strictly limited to muscles innervated by that specific nerve. Paraspinal muscles of the back are perfectly NORMAL."
            }
        ],
        pearl: "The Double Crush Hypothesis: Nerves rely on high-pressure axoplasmic flow to move nutrients. If a nerve is slightly compressed in the neck (C6 radiculopathy), the nutrient flow is restricted. This makes the nerve 'starved' and incredibly vulnerable to a second compression further down the arm (like Carpal Tunnel Syndrome). This is why patients often have concurrent radiculopathies and focal entrapments."
    },

    classification: {
        intro: "Erlanger-Gasser Classification of Nerve Fibers",
        text: "The peripheral nerve is a mixed cable of different wire types. The machine you use daily (NCS) is actually blind to half of these wires!",
        fibers: [
            { type: "Group A-alpha (Aα)", speed: "70-120 m/s", size: "Massive, Heavily Myelinated", func: "Extrafusal Motor driving (muscle contraction) and Proprioception. The 'High-Speed Internet' lines." },
            { type: "Group A-beta (Aβ)", speed: "30-70 m/s", size: "Large, Moderately Myelinated", func: "Touch, Pressure, and Vibration. (These are the purely sensory fibers we test during a SNAP)." },
            { type: "Group A-gamma (Aγ)", speed: "15-30 m/s", size: "Medium Myelinated", func: "Intrafusal Motor to muscle spindles (maintains muscle tone)." },
            { type: "Group A-delta (Aδ)", speed: "12-30 m/s", size: "Small, Thinly Myelinated", func: "Sharp, pricking, 'Fast' Pain and Cold temperature." },
            { type: "Group C", speed: "0.5-2 m/s", size: "Tiny, Unmyelinated", func: "Dull, aching, 'Slow' Pain, Warm temperature, and Autonomic functions (sweating, heart rate). The 'Dial-up Internet'." }
        ],
        pearl: "The Great Blind Spot of EDX: Standard nerve conduction studies ONLY measure the massive, heavily myelinated A-alpha and A-beta fibers. If a patient presents with severe burning pain and temperature loss in their feet, but normal strength and vibration, they likely have a Small Fiber Neuropathy (targeting A-delta and C fibers). Their EMG/NCS will be completely, 100% NORMAL. You must diagnose small fiber disease clinically or via punch skin biopsy, not with EDX!"
    },

    atlas: {
        intro: "Master Peripheral Nerve Entrapment Atlas",
        text: "A comprehensive reference guide differentiating the classic compressive patterns.",
        data: [
            {
                nerve: "Median",
                site: "Carpal Tunnel (Wrist)",
                motor: "APB, OP, FPB, Lumb 1&2",
                sensory: "Thumb, index, middle, lateral ring",
                edx: "Prolonged distal latencies",
                sign: "Nocturnal symptoms, Phalen's"
            },
            {
                nerve: "Median",
                site: "Pronator Syndrome (Arm)",
                motor: "CTS muscles + FCR, FPL, FDP(2/3), PQ, PT",
                sensory: "CTS territory + Thenar Eminence (Palmar Cutaneous br.)",
                edx: "Slow forearm conduction, Normal Latency",
                sign: "Aching forearm pain, Activity-related, Not nocturnal"
            },
            {
                nerve: "Median",
                site: "AIN Syndrome (Arm)",
                motor: "FPL, FDP (2/3), PQ",
                sensory: "NONE (Pure Motor branch)",
                edx: "Isolated denervation in FPL/PQ",
                sign: "Cannot make the 'OK' sign; pinch weakness"
            },
            {
                nerve: "Ulnar",
                site: "Cubital Tunnel (Elbow/UNE)",
                motor: "FCU, FDP (4/5), Hand Intrinsics",
                sensory: "Ring, little finger + Dorsal Hand (Dorsal Ulnar Cutaneous)",
                edx: "Slow conduction/Block across elbow",
                sign: "Froment's sign, Wartenberg's sign"
            },
            {
                nerve: "Ulnar",
                site: "Guyon's Canal (Wrist/UNW)",
                motor: "Hand Intrinsics ONLY",
                sensory: "Ring, little finger (Palmar only, Dorsal is spared!)",
                edx: "Normal elbow conduction, prolonged distal unlar latency",
                sign: "No forearm involvement or pain"
            },
            {
                nerve: "Radial",
                site: "Spiral Groove (Humerus)",
                motor: "Brachioradialis, Extensors (Wrist Drop)",
                sensory: "First dorsal web space",
                edx: "Conduction block at spiral groove",
                sign: "Saturday Night Palsy, Triceps SPARED"
            },
            {
                nerve: "Peroneal",
                site: "Fibular Head (Knee)",
                motor: "Tibialis Anterior (Foot Drop), Extensors",
                sensory: "Dorsal foot, lateral calf",
                edx: "Conduction block at fibular head",
                sign: "Painless acute foot drop after leg crossing/squatting"
            },
            {
                nerve: "Tibial",
                site: "Tarsal Tunnel (Ankle)",
                motor: "Intrinsic foot muscles (AH, ADM)",
                sensory: "Plantar surface of foot",
                edx: "Prolonged medial/lateral plantar latencies",
                sign: "Burning plantar pain, worse with standing"
            }
        ]
    }
};
