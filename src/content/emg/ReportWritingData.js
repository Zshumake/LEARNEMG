export const ReportWritingData = {
    header: {
        title: "AANEM Report Writing Masterclass",
        description: "Learn how to write professional, defensible electrodiagnostic reports that meet AANEM accreditation guidelines. Always remember: your report is the only permanent record of your needle examination."
    },
    steps: [
        {
            id: "patient-data",
            title: "Patient Data & Logistics",
            icon: "User",
            color: "#3b82f6",
            keyRequirement: "The 'Real-Time' Mandate",
            keyRequirementDescription: "Listen up—an EMG is not an MRI. It is a live, dynamic extension of your physical exam. A quality study requires you to continuously modify the test as data comes in. The AANEM explicitly states that interpretation cannot be performed by an offsite physician because the findings you uncover must guide your nerve and muscle selection in real-time. If you find an unexpected sensory drop drop, you pivot. You can't do that if you're just reading a tech's printout.",
            safetyTips: [
                {
                    label: "Cardiac Risk Assessment",
                    text: "Always document the presence or absence of pacemakers or ICDs before shocking anyone. This isn't just paperwork; it's a critical safety step. If they have an ICD, you need to know where it is and avoid proximally stimulating near it without clearance."
                },
                {
                    label: "Bleeding Risk & Anticoagulants",
                    text: "Document their exact anticoagulation status, any bleeding disorders, or recent blood thinners before you stick a needle in them. Deep muscles (like the paraspinals or pronator teres) are off-limits or high-risk for severe hematomas in fully anticoagulated patients."
                },
                {
                    label: "Physical Limitations",
                    text: "Be honest about what you couldn't do. Note limitations like casts, thick wound dressings, or if the patient physically could not lie on their stomach for paraspinal testing. It explains to the referring doc why your study might be limited."
                }
            ],
            pearlBox: {
                title: "The Temperature Mandate",
                content: "Never skip the temperature check. Cool limbs (anything under ~28 degrees Celsius) prolong the opening time of sodium channels. What does this mean for you? It falsely elevates the amplitude and artificially slows the conduction velocity. If you test a perfectly healthy but freezing cold patient, you might accidentally diagnose them with a demyelinating neuropathy! Always warm them up. Document that hands were maintained >32°C and feet >30°C."
            },
            example: [
                { type: "header", text: "HISTORY:" },
                { type: "content", text: "45 y.o. male with 3 months of numbness in digits 1-3 of the right hand. Symptoms are worse at night and wake the patient from sleep." },
                { type: "header", text: "SAFETY / CONTRAINDICATIONS:" },
                { type: "content", text: "No cardiac pacemaker or ICD. Patient is not on anticoagulants or anti-platelet therapy." },
                { type: "header", text: "LIMITATIONS:" },
                { type: "content", text: "None. Patient tolerated the study well and was able to comply with all positioning requests." },
                { type: "header", text: "TEMPERATURE:" },
                { type: "content", text: "Right Hand: 33.2 degrees Celsius (Warmed with heating pad prior to testing)." }
            ]
        },
        {
            id: "ncs-studies",
            title: "NCS Documentation Standards",
            icon: "Activity",
            color: "#f59e0b",
            keyRequirement: "The Tabular Imperative",
            keyRequirementDescription: "This is a big one: narrative summary sentences like 'The nerve conduction studies were normal' are completely unacceptable for a formal report. You must provide the raw tabular data. Why? Because other physicians (and future you) need to review the exact numbers. If this patient comes back in three years with worse symptoms, we need the exact baseline amplitudes and velocities to track their disease progression.",
            safetyTips: [
                {
                    label: "Mandatory Data Columns",
                    text: "Every table must include the nerve name, side tested, stimulation and recording sites, the distance between them, latency (onset for motor, peak for sensory), baseline-to-peak amplitude, and conduction velocity."
                },
                {
                    label: "Axonal vs Demyelinating Patterns",
                    text: "Keep the physiology straight in your head as you document. Axonal injury shows up as low amplitudes with relatively preserved velocities. Demyelinating injury shows significant slowing or severely prolonged latencies with preserved amplitudes (unless there is secondary axonal loss or conduction block)."
                },
                {
                    label: "Late Responses (F-Waves & H-Reflexes)",
                    text: "For F-Waves, always report the minimum latency out of the 10-ish traces you fire. For H-Reflexes, report the latency. These are essential for screening proximal segments like the S1 root, which routine distal NCS can't reach."
                }
            ],
            pearlBox: {
                title: "Reference Values Are Non-Negotiable",
                content: "You cannot just hand a doctor a sheet of numbers. You must include your specific laboratory's 'Normal' cut-off values right there in the report, or explicitly cite the published reference material you use (e.g., AANEM Reference Data). An outside reviewer must be able to verify your 'abnormal' flags against your chosen normal limits."
            },
            example: [
                { type: "header", text: "SENSORY NCS:" },
                { type: "tabular", text: "Nerve/Recording   | Peak Lat | Amp   | Dist  | Vel    | (Norm L/A/V)" },
                { type: "tabular", text: "R Median Digit 2  | 3.1 ms   | 45 uV | 14 cm | 45 m/s | (<3.5, >20, >50)" },
                { type: "tabular", text: "R Median Palmar   | 1.8 ms   | 80 uV | 8 cm  | 44 m/s | (<2.2, >50, >50)" },
                { type: "header", text: "F-WAVE STUDIES:" },
                { type: "content", text: "R Median (APB): Minimum latency 28.5 ms (Normal < 31.0 ms)" }
            ]
        },
        {
            id: "needle-emg",
            title: "Needle EMG Technical Detail",
            icon: "FileSignature",
            color: "#10b981",
            keyRequirement: "The Single Primary Record",
            keyRequirementDescription: "Unlike nerve conduction studies where the machine saves the waveform traces, there is generally no permanent video or audio record of what you saw and heard during the needle EMG. That means your written matrix table is the ONLY formal, legal evidence that the testing was actually performed, that specific muscles were sampled, and that the waveforms were analyzed correctly. Your documentation has to be bulletproof.",
            safetyTips: [
                {
                    label: "Muscle-by-Muscle Reporting",
                    text: "You must document findings for EACH specific muscle examined individually. Do not group them like 'Right arm muscles were normal' unless you are summarizing later. If the APB is abnormal but the FDI is normal, grouping them is a critical error."
                },
                {
                    label: "Spontaneous Activity Columns",
                    text: "Your table must have dedicated columns for insertional activity, fibrillations (fibs), positive sharp waves (PSWs), and ideally fasciculations. Grade them formally (e.g., 1+ to 4+) rather than just saying 'Present'."
                },
                {
                    label: "Voluntary Activity Profiling",
                    text: "You must describe both the Morphology (Amplitude, Duration, Polyphasia) AND the Recruitment pattern. A muscle might have giant, complex motor units but recruit very poorly. Both tell a vital part of the story."
                }
            ],
            pearlBox: {
                title: "Defensive Charting & Honesty in Limitations",
                content: "If a patient cannot fully relax because they are anxious, or if severe pain limits their ability to give you a maximum voluntary contraction, document it explicitly! Writing 'Unable to assess recruitment secondary to pain-limited effort' is highly professional. It protects you from making false conclusions (like diagnosing a severe axonotmesis) based on incomplete, effort-limited data."
            },
            example: [
                { type: "header", text: "NEEDLE EMG FINDINGS:" },
                { type: "tabular", text: "Muscle        | Ins | Fibs | PSW | Amp   | Dur  | Poly | Recruit" },
                { type: "tabular", text: "------------------------------------------------------------------" },
                { type: "tabular", text: "R APB (C8-T1) | Nml | 2+   | 2+  | Incr  | Long | Incr | Reduced" },
                { type: "tabular", text: "R FPL (C7-C8) | Nml | 0    | 0   | Nml   | Nml  | Nml  | Nml" },
                { type: "tabular", text: "R C7 Parasp   | Nml | 1+   | 1+  | Nml   | Nml  | Nml  | Nml" }
            ]
        },
        {
            id: "formal-summary",
            title: "Formal Summary Drafting",
            icon: "AlignLeft",
            color: "#8b5cf6",
            keyRequirement: "Connecting Raw Data to Clinical Dialogue",
            keyRequirementDescription: "The summary paragraph is where you prove you are a physician, not just a technician. This section translates your raw tables of latencies and fibrillations into clinical observations. It must summarize the abnormalities for both NCS and needle EMG separately, and then begin to synthesize those findings into a recognizable distribution (e.g., peripheral nerve vs. root).",
            safetyTips: [
                {
                    label: "Acknowledge the Normal Studies",
                    text: "Don't just jump to the pathology. Briefly list which limbs and specific nerve distributions were tested and found to be electrophysiologically normal. This establishes the boundaries of the lesion."
                },
                {
                    label: "Use Precise Electrophysiological Terminology",
                    text: "Do not use clinical jargon here. Use precise phrasing like 'focal slowing of conduction velocity', 'active denervation', or 'chronic neurogenic reinnervation changes' rather than colloquial terms like 'pinched nerve' or 'sciatica'."
                },
                {
                    label: "Build the Distribution Case",
                    text: "Is the lesion focal? Is it length-dependent? Does it follow a strict myotomal pattern? The summary is where you build this argument before delivering your final verdict in the impression."
                }
            ],
            pearlBox: {
                title: "Avoid Premature Diagnosis",
                content: "The summary section is strictly for descriptive electrophysiology. Do not give the final diagnosis yet! State 'There is a focal delay across the carpal tunnel with secondary axonal loss in the APB' rather than 'The patient has severe Carpal Tunnel Syndrome'. Save the clinical diagnosis for the Final Impression."
            },
            example: [
                { type: "header", text: "SUMMARY OF FINDINGS:" },
                { type: "content", text: "Right upper extremity nerve conduction studies reveal a focal delay of the median sensory response across the carpal tunnel, with preserved motor amplitudes and normal ulnar and radial studies. Needle EMG of the right upper extremity reveals active denervation (2+ fibrillations/PSWs) and chronic motor unit changes (long duration, large amplitude, polyphasic) restricted to the median-innervated APB. The FPL, pronator teres, and proximally sampled C7/C8 innervated muscles remain entirely spared without evidence of radiculopathy." }
            ]
        },
        {
            id: "final-impression",
            title: "Diagnostic Interpretation",
            icon: "Target",
            color: "#ef4444",
            keyRequirement: "The Diagnostic Anchor",
            keyRequirementDescription: "The Impression is the most important part of the report because it is often the ONLY part the referring physician will read. It must directly answer the referring physician's clinical question. A proper impression is a graded (mild, moderate, or severe), anatomically localized, and chronological (acute vs. chronic) electrophysiological diagnosis.",
            safetyTips: [
                {
                    label: "The Perfect Diagnostic Sentence",
                    text: "Describe the exact location, the severity, and the fiber type involved. A great impression reads like: 'Electrophysiological evidence of a moderate, active-on-chronic right median mononeuropathy at the wrist, affecting both sensory and motor fibers.'"
                },
                {
                    label: "Chronology & Contextual Comparison",
                    text: "If the patient has had previous studies at your institution, you are ethically obligated to explicitly state whether the current findings represent an improvement, are stable, or have worsened compared to the prior baseline."
                },
                {
                    label: "Mandatory Administrative Components",
                    text: "Don't forget the boilerplate: Identify all personnel involved in the study (including technicians), list the equipment make/model utilized, and proudly state your laboratory's AANEM accreditation status if applicable."
                }
            ],
            pearlBox: {
                title: "The Clinical Correlate Exception",
                content: "Sometimes the numbers don't perfectly align with the textbook. If your EDX findings are borderline but the patient's clinical picture is absolutely classic, AANEM guidelines permit you to establish a diagnosis based on the synthesis of both. Add a brief, clarifying note: 'While these demyelinating findings are borderline, they strongly correlate with the patient's classic clinical presentation of nocturnal paresthesias and a positive Tinel's sign.'"
            },
            example: [
                { type: "header", text: "IMPRESSION:" },
                { type: "content", text: "1. Electrophysiological evidence of a moderate, active-on-chronic right median mononeuropathy at the wrist (Carpal Tunnel Syndrome), now with evidence of active axonal loss in the abductor pollicis brevis." },
                { type: "content", text: "2. There is no electrophysiological evidence of a co-existing right cervical radiculopathy, brachial plexopathy, or generalized polyneuropathy." },
                { type: "content", text: "3. This study demonstrates electrophysiological worsening (new onset active denervation) compared to the previous examination dated 01/15/2024." },
                { type: "content", text: "Note: The above findings closely correlate with the patient's worsening clinical presentation and thenar atrophy." }
            ]
        }
    ],
    scenarios: [
        {
            id: "carpal-tunnel",
            title: "Carpal Tunnel (Mild)",
            finding: "Prolonged median sensory peak latency across the wrist; normal motor latencies and amplitudes; completely normal needle EMG of the APB.",
            impression: "Electrophysiological evidence of a mild right median mononeuropathy at the wrist (carpal tunnel syndrome), affecting sensory fibers only, without evidence of motor axonal loss."
        },
        {
            id: "ulnar-neuropathy",
            title: "Ulnar Neuropathy (Elbow)",
            finding: "Focal slowing of the ulnar motor conduction velocity across the elbow segment (>10 m/s drop) with a >20% conduction block (amplitude drop) compared to the below-elbow stimulation site.",
            impression: "Electrophysiological findings highly consistent with a focal ulnar neuropathy at the elbow (cubital tunnel syndrome), demonstrating primary demyelination and conduction block."
        },
        {
            id: "l5-radiculopathy",
            title: "L5 Radiculopathy",
            finding: "Normal lower extremity nerve conduction studies; needle EMG reveals abnormal insertional activity and spontaneous potentials (fibrillations/PSWs) in the Tibialis Anterior, Peroneus Longus, and mid-lumbar paraspinals, with sparing of the gastrocnemius.",
            impression: "Evidence of an active, moderate right L5 radiculopathy. The presence of paraspinal denervation suggests a lesion proximal to the posterior primary ramus."
        },
        {
            id: "polyneuropathy",
            title: "Sensorimotor Polyneuropathy",
            finding: "Absent bilateral sural and superficial peroneal sensory responses. Diffusely low amplitude, mildly slowed peroneal and tibial motor responses. Needle EMG shows distal active denervation in the intrinsic foot muscles.",
            impression: "Electrophysiological evidence of a length-dependent, moderate-to-severe, primarily axonal, sensorimotor polyneuropathy. This pattern is often seen in poorly controlled diabetes mellitus or toxic/metabolic etiologies."
        }
    ]
};
