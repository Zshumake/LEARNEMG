export const nMJCases = {
    mg: {
        title: "Fatigable Ptosis and Speech Changes",
        difficulty: "intermediate",
        presentation: {
            age: 32,
            gender: "Female",
            occupation: "Teacher",
            chiefComplaint: "6-month history of progressive weakness and fatigue, worse with exercise",
            history: "Symptoms initially affected eyelids causing ptosis, then progressed to difficulty speaking and chewing. Weakness is notably worse at the end of the day or after physical activity. Some improvement with rest.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Bilateral ptosis, worse on sustained up-gaze",
            palpation: "Normal muscle bulk",
            rom: "Normal",
            strength: "Proximal muscle weakness (4/5) initially, dropping to 3/5 with repetitive testing. Fatigable weakness of extraocular muscles.",
            sensation: "Normal throughout",
            reflexes: "2+ and symmetric; NO fatigue of reflexes (distinguishes from LEMS)",
            specialTests: "Positive ice pack test (improvement in ptosis)"
        },
        differentialDiagnosis: [
            { name: "Myasthenia Gravis", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Lambert-Eaton Myasthenic Syndrome (LEMS)", ruleOut: "LEMS typically shows *facilitation* (amplitude increase) after exercise and depressed reflexes; here reflexes are normal and there is a decrement on RNS." },
            { name: "Botulism", ruleOut: "Acute onset with autonomic symptoms (dilated pupils, ileus) and rapidly progressive descending paralysis; here symptoms are chronic and fluctuating." },
            { name: "Thyroid Eye Disease", ruleOut: "Would cause proptosis and lid retraction rather than ptosis, and standard RNS would be normal." },
            { name: "Congenital Myasthenic Syndrome", ruleOut: "Usually presents in infancy or early childhood with fixed or fluctuating weakness." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (RNS/SFEMG)",
        correctDiagnosis: "Myasthenia Gravis",
        explanation: "Fluctuating weakness (ptosis, bulbar, proximal) that worsens with activity and improves with rest. The presence of a significant decrement (>10%) on slow RNS and increased jitter/blocking on SFEMG confirms a post-synaptic NMJ disorder.",
        reviewOfSystems: {
            constitutional: "Normal weight. Occasional fatigue at the end of the day.",
            musculoskeletal: "Proximal limb weakness, especially after climbing stairs or prolonged standing.",
            neurological: "Bilateral ptosis, double vision (diplopia), difficulty swallowing (dysphagia), and change in voice (nasal speech) after long conversations.",
            ophthalmological: "Intermittent drooping of eyelids, worse when tired."
        },
        humoralData: {
            labs: ["AChR Binding Antibody: 8.5 nmol/L (Significantly Elevated)", "Muscle-Specific Kinase (MuSK) Antibody: Negative", "TSH: 1.8 mIU/L (Normal)"],
            imaging: ["CT Chest (with contrast): No evidence of thymoma; consistent with thymic hyperplasia."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Repetitive Nerve Stimulation (Median)", measureA: "Baseline Amp: 12.0mV", measureB: "4th Stim: 9.5mV", deltaP: "21% Decrement", abnormal: true },
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false },
            { muscle: "Frontalis (Single Fiber)", abnormal: true, motorUnits: "Increased Jitter/Blocking" }
        ],
        teachingPoints: [
            "Myasthenia Gravis (MG) is a post-synaptic NMJ disorder; standard NCS and needle EMG are typically normal.",
            "Repetitive Nerve Stimulation (RNS) showing a >10% decrement is diagnostic of a NMJ defect.",
            "Single Fiber EMG (SFEMG) is the most sensitive test for MG, showing increased 'jitter' and impulses failing to propagate (blocking)."
        ]
    },

    // Tarsal Tunnel Syndrome - Lower Extremity Entrapment Neuropathy,

    lems: {
        title: "Weakness Improving with Exercise",
        difficulty: "difficult",
        presentation: {
            age: 58,
            gender: "Male",
            occupation: "Construction",
            chiefComplaint: "Proximal leg weakness and dry mouth, improvement with activity",
            history: "Develop progressive difficulty climbing stairs and rising from chairs. Interestingly, the first few steps are the hardest, and strength seems to improve slightly with walking. Noticed dry mouth (xerostomia) and constipation. Long history of smoking.",
            pmh: "COPD, Hypertension",
            medications: "Tiotropium, Lisinopril"
        },
        physicalExam: {
            inspection: "Mild proximal muscle thinning.",
            palpation: "Normal.",
            rom: "Normal.",
            strength: "Proximal hip flexors 3/5 initially. After 10 seconds of maximal isometric contraction, strength improves to 4/5.",
            sensation: "Normal.",
            reflexes: "1+ (diminished) at the patella; however, they become 2+ (normal) immediately after brief exercise (reflex potentiation).",
            specialTests: "Post-exercise potentiation of reflexes and strength."
        },
        differentialDiagnosis: [
            { name: "Lambert-Eaton Myasthenic Syndrome (LEMS)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Myasthenia Gravis (MG)", ruleOut: "MG usually involves ocular/bulbar muscles first and DOES NOT typically show baseline low CMAPs or significant facilitation after exercise. Reflexes are also normal in MG." },
            { name: "Polymyositis / Dermatomyositis", ruleOut: "Inflammatory myopathies cause constant weakness (doesn't improve with exercise) and are associated with significantly elevated CK; they do not show the CMAP facilitation seen here." },
            { name: "Statin-induced Myopathy", ruleOut: "Usually presents with myalgia and elevated CK; would not show autonomic symptoms or areflexia/reflex potentiation." },
            { name: "Cervical Spondylotic Myelopathy", ruleOut: "Would cause UMN signs (Babinski, spasticity) and would not have dry mouth or the specific NCS facilitation pattern." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Look for facilitation)",
        correctDiagnosis: "Lambert-Eaton Myasthenic Syndrome (LEMS)",
        explanation: "LEMS is a pre-synaptic NMJ disorder caused by antibodies against P/Q-type voltage-gated calcium channels (VGCC). It is characterized by proximal weakness, autonomic dysfunction (dry mouth), and diminished reflexes that paradoxically improve after brief exercise (reflex potentiation). Electrodiagnosis confirms low baseline CMAP amplitudes that markedly facilitate (>100%) after 10 seconds of max exercise or high-frequency RNS.",
        reviewOfSystems: {
            constitutional: "15-lb unintentional weight loss. Chronic cough (former smoker).",
            gastrointestinal: "Chronic constipation (autonomic).",
            genitourinary: "New onset erectile dysfunction (autonomic).",
            neurological: "Proximal leg weakness, dry mouth (xerostomia). No double vision or ptosis currently.",
            respiratory: "Mild shortness of breath, stable COPD."
        },
        humoralData: {
            labs: ["P/Q-type Voltage-Gated Calcium Channel (VGCC) Antibody: 120 pmol/L (Highly Elevated)", "HbA1c: 5.4% (Normal)", "Creatine Kinase (CK): 180 U/L (Normal)"],
            imaging: ["CT Chest (with contrast): 3cm irregular mass in the right upper lobe with associated hilar lymphadenopathy; highly suspicious for Small Cell Lung Cancer (SCLC)."],
            biopsy: ["Endobronchial Ultrasound (EBUS) Biopsy: Confirms Small Cell Lung Cancer."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Sural Sensory", peak: 3.2, amp: 22, velocity: 48, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 1.2, velocity: 55, abnormal: true },
                { name: "Ulnar Motor (Baseline)", latency: 2.8, amp: 1.5, velocity: 58, abnormal: true },
                { name: "Ulnar Motor (Post-Exercise)", latency: 2.8, amp: 4.8, velocity: 58, abnormal: false },
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 1.0, velocity: 48, abnormal: true },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 1.5, velocity: 45, abnormal: true }
            ],
            comparison: [
                { name: "Post-Exercise Facilitation", measureA: "Baseline: 1.5mV", measureB: "4.8mV", deltaP: "220% Facilitation", abnormal: true },
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L3-L4", abnormal: true, motorUnits: "Small/Poly", recruitment: "Reduced" }
        ],
        teachingPoints: [
            "LEMS is a pre-synaptic NMJ disorder affecting Voltage-Gated Calcium Channels (VGCC).",
            "The classic NCS triad of LEMS: Low baseline CMAP amplitudes, decrement at low-frequency stimulation (3Hz), and profound facilitation (>100%) after brief exercise or high-frequency stimulation (20-50Hz).",
            "Screening for Small Cell Lung Cancer (SCLC) is mandatory in patients diagnosed with LEMS."
        ]
    }
};
