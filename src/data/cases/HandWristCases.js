export const handWristCases = {
    'hand14': {
        title: "Hand Numbness/Tingling (Digits 1-4)",
        difficulty: "beginner",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Administrative Assistant",
            chiefComplaint: "3-month history of numbness and tingling in thumb, index, and middle fingers, worse at night",
            history: "Symptoms wake her up at night, shaking hands provides relief. Occasional thenar weakness when gripping objects. No neck pain or trauma. Uses computer 8+ hours daily.",
            pmh: "Hypothyroidism, well-controlled",
            medications: "Levothyroxine"
        },
        physicalExam: {
            inspection: "No visible muscle atrophy. No fasciculations observed.",
            palpation: "Mild tenderness over carpal tunnel. No cervical spine tenderness.",
            rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
            strength: "5/5 strength in all muscle groups except mild thenar weakness (4/5) on right",
            sensation: "Decreased light touch and pinprick in median nerve distribution (digits 1-3). Sensation in the palm (palmar cutaneous branch) is entirely spared.",
            reflexes: "2+ and symmetric throughout. No pathological reflexes.",
            specialTests: "Positive Tinel's sign at wrist, positive Phalen's sign"
        },
        differentialDiagnosis: [
            { name: "Carpal tunnel syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Median neuropathy at wrist", ruleOut: "Synonymous with CTS." },
            { name: "C6 radiculopathy", ruleOut: "Radiculopathy would typically spare the Median Sensory response (pre-ganglionic) and involve C6 muscles outside Median distribution (e.g. Brachioradialis)." },
            { name: "Cervical radiculopathy", ruleOut: "No ongoing neck pain; normal reflexes; isolated distal findings." },
            { name: "Pronator teres syndrome", ruleOut: "Would cause sensory loss in the palm (palmar cutaneous branch) and involves weakness in more proximal median-innervated muscles (e.g. FDP 1/2, FPL, and PQ)." },
            { name: "Anterior interosseous syndrome", ruleOut: "Purely motor syndrome (FPL/FDP weakness), no sensory loss." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Carpal Tunnel Syndrome",
        explanation: "Classic carpal tunnel syndrome with nocturnal symptoms, thenar weakness, positive provocative tests, and median nerve distribution sensory loss.",
        reviewOfSystems: {
            constitutional: "Negative for fevers, chills, or weight loss.",
            musculoskeletal: "No joint pain or swelling. Intermittent wrist pain.",
            neurological: "Numbness in digits 1-3. No weakness in legs or other limbs.",
            endocrine: "History of hypothyroidism."
        },
        humoralData: {
            labs: ["TSH: 2.5 mIU/L (Normal)", "HbA1c: 5.4% (Normal)"],
            imaging: ["Cervical Spine X-Ray: Mild spondylosis, no acute fracture or significant foraminal narrowing."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 4.5, amp: 8.0, velocity: 30, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: 2.5, amp: 38.0, velocity: 67, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 5.8, amp: 4.2, velocity: 52, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 5.0, velocity: 62, abnormal: true }
            ],
            comparison: [
                { name: "Median-Ulnar Comp (Digit 4)", measureA: "4.8", measureB: "2.4", deltaP: "2.4", abnormal: true },
                { name: "Median-Radial Thumb Comp", measureA: "3.8", measureB: "2.3", deltaP: "1.5", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "1+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" }
        ],
        teachingPoints: [
            "Comparison studies (Median vs Ulnar/Radial) are the most sensitive method for diagnosing CTS, especially in early or mild cases.",
            "Comparison studies (Median vs Ulnar) improve specificity by accounting for individual variation in skin temperature and nerve size.",
            "EMG is used to assess severity (loss of axons/denervation) and to rule out mimickers like C6 radiculopathy."
        ]
    },

    'guyon': {
        title: "Hand Numbness After Cycling",
        difficulty: "beginner",
        presentation: {
            age: 35,
            gender: "Male",
            occupation: "Cyclist",
            chiefComplaint: "3-week history of numbness in ring and little fingers after long bike ride",
            history: "Completed 100-mile bike ride 3 weeks ago. Noticed numbness in ring and little fingers immediately after. Initially thought it would resolve, but numbness persists. Some weakness when trying to spread fingers. Uses drop handlebars with aggressive hand position.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "No visible atrophy. Normal hand posture",
            palpation: "Mild tenderness over Guyon's canal. No elbow tenderness",
            rom: "Full ROM at elbow and wrist",
            strength: "Deep interossei 4/5, abductor digiti minimi 4/5. Flexor carpi ulnaris normal (5/5). Grip strength normal",
            sensation: "Decreased sensation in ring and little fingers, palmar surface. Dorsal sensation normal",
            reflexes: "Normal and symmetric throughout",
            specialTests: "Negative Tinel's at elbow. Mild Tinel's at wrist (Guyon's canal)"
        },
        differentialDiagnosis: [
            { name: "Ulnar Neuropathy at Guyon's Canal", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Cubital Tunnel Syndrome (UNE)", ruleOut: "UNE would typically involve the Dorsal Ulnar Cutaneous (DUC) nerve and forearm muscles (FCU, FDP 4/5); here both are normal." },
            { name: "C8 Radiculopathy", ruleOut: "C8 radiculopathy would affect Median-innervated C8 muscles (e.g., APB) and paraspinals; here APB and paraspinals are spared." },
            { name: "Thoracic Outlet Syndrome", ruleOut: "TOS usually involves the lower trunk (C8-T1) and would show more widespread weakness and often an abnormal Medial Antebrachial Cutaneous (MAC) SNAP." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal (Zone 1)",
        explanation: "The combination of palmar sensory loss (superficial branch) and intrinsic weakness (deep branch) with sparing of the DUC and forearm ulnar muscles (FCU) localizes the lesion specifically to Zone 1 of Guyon's Canal, most likely due to mechanical pressure during cycling.",
        reviewOfSystems: {
            constitutional: "No fevers, no weight loss.",
            musculoskeletal: "Wrist pain on the ulnar side. No elbow or neck pain.",
            neurological: "Numbness in the pinky side of the palm. Weakness in grip and finger spreading. No weakness in wrist flexion.",
            integumentary: "No callous or skin changes over the wrist."
        },
        humoralData: {
            labs: ["Vitamin B12: 550 pg/mL (Normal)", "HbA1c: 5.2% (Normal)"],
            imaging: ["X-ray Right Wrist: No fracture of the hook of the hamate. No carpal abnormalities."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 3.5, amp: 6.2, velocity: 52, abnormal: true },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Dorsal Ulnar Cutaneous", peak: 2.2, amp: 25, velocity: 62, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false },
                { name: "Ulnar Motor (FDI)", latency: 3.2, amp: 4.5, velocity: 58, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false },
            { muscle: "FDI", nerve: "Ulnar", root: "Deep Branch", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "ADM", nerve: "Ulnar", root: "Deep Branch", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false },
            { muscle: "Flexor Digitorum Profundus 4/5", nerve: "Ulnar", root: "C8-T1", abnormal: false },
            { muscle: "Flexor Carpi Ulnaris", nerve: "Ulnar", root: "C8-T1", abnormal: false },
            { muscle: "Cervical Paraspinals (C8)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Guyon's canal compression spares the Dorsal Ulnar Cutaneous (DUC) nerve, which branches proximal to the wrist.",
            "Sparing of the Flexor Carpi Ulnaris (FCU) muscle distinguishes this from Ulnar Neuropathy at the Elbow (UNE).",
            "This case demonstrates a Zone 1 lesion involving both the superficial sensory and deep motor branches of the ulnar nerve."
        ]
    },

    severects: {
        title: "Severe Hand Numbness with Visible Wasting",
        difficulty: "intermediate",
        presentation: {
            age: 55,
            gender: "Female",
            occupation: "Assembly Line Worker",
            chiefComplaint: "2-year history of progressive hand numbness and weakness with visible thumb muscle wasting",
            history: "Hand symptoms have worsened significantly over 2 years. Constant numbness now affects the first 3.5 digits. Patient noticed she was dropping items and struggled with buttoning shirts. Visible 'flatness' of the thumb muscle emerged over the last 6 months. Works 40 hours/week in manual assembly.",
            pmh: "Type 2 Diabetes, Hypothyroidism",
            medications: "Metformin, Levothyroxine"
        },
        physicalExam: {
            inspection: "Marked atrophy (hollowing) of the right thenar eminence. No calluses on the right thumb.",
            palpation: "Mild tenderness over the carpal tunnel. Normal elbow and neck palpation.",
            rom: "Full ROM throughout.",
            strength: "Thumb Abduction (APB) 3/5. Thumb Opposition 3+/5. Finger abduction (FDI) 5/5. Wrist extension 5/5.",
            sensation: "Absent light touch/pinprick in the first 3.5 digits on the palmar surface. Normal sensation on the dorsal hand.",
            reflexes: "2+ and symmetric throughout upper extremities.",
            specialTests: "Highly positive Phalen's test (immediate symptoms). Tinel's positive at the wrist."
        },
        differentialDiagnosis: [
            { name: "Severe Carpal Tunnel Syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "C6 Radiculopathy", ruleOut: "A C6 radiculopathy would typically spare the Median SNAP (pre-ganglionic); while the SNAP is absent here due to severe nerve damage, the paraspinals and non-median C6 muscles are normal." },
            { name: "Median Neuropathy at the Elbow (Pronator)", ruleOut: "Pronator syndrome would involve proximal median-innervated muscles (FCR, PT) and cause sensory loss in the palm (palmar cutaneous branch); here those are spared." },
            { name: "Grip/Motor Branch Entrapment", ruleOut: "Would cause weakness but not the profound sensory loss seen here." },
            { name: "Diabetic Polyneuropathy", ruleOut: "Polyneuropathy is typically symmetric and affects the feet first (stocking-glove); here findings are focal to the Median nerve." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Severity Assessment)",
        correctDiagnosis: "Severe Carpal Tunnel Syndrome with Axonal Loss",
        explanation: "Severe CTS characterized by chronic compression leading to axonal loss (thenar atrophy). NCS shows absent sensory responses and a very delayed/low-amplitude motor response. EMG confirms active and chronic denervation in the thenar muscles.",
        reviewOfSystems: {
            constitutional: "No weight loss. General fatigue.",
            musculoskeletal: "Chronic hand and wrist pain, radiating to the forearm. No neck pain.",
            neurological: "Constant numbness in digits 1-3. Weakness in grip. Normal lower extremity function.",
            endocrine: "Type 2 Diabetes (HbA1c 7.8% - mildly controlled)."
        },
        humoralData: {
            labs: ["HbA1c: 7.8% (Elevated)", "TSH: 2.2 mIU/L (Normal)"],
            imaging: ["Ultrasound Wrist: Cross-sectional area of the median nerve at the inlet is 16 mm² (Significantly Enlarged).", "MRI Wrist: High T2 signal in the median nerve with flattening at the hamate level."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: "Absent", amp: 0, velocity: 0, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 8.2, amp: 1.2, velocity: 45, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "Absent", measureB: "2.3", deltaP: "N/A", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "2+", recruitment: "Severely Reduced", motorUnits: "Large/Poly" },
            { muscle: "Pronator Teres", nerve: "Median", root: "C6-C7", abnormal: false, comment: "Spared (Critical: confirms lesion is at the wrist)" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false },
            { muscle: "C6 Paraspinals", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Thenar atrophy is a clinical hallmark of SEVERE carpal tunnel syndrome with secondary axonal loss.",
            "Absent Median SNAPs are common in severe cases; the diagnosis is confirmed by excluding more proximal lesions using needle EMG.",
            "In severe CTS, the Median CMAP distal motor latency is typically >6.0 ms and the amplitude is reduced (<4.0 mV).",
            "Urgent surgical consultation is indicated once axonal loss (atrophy/denervation) is present to prevent further permanent damage."
        ]
    },

    doublecrush: {
        title: "Hand Weakness with Neck and Elbow Pain",
        difficulty: "difficult",
        presentation: {
            age: 48,
            gender: "Male",
            occupation: "Software Programmer",
            chiefComplaint: "8-month history of progressive numbness and weakness in right hand with neck pain",
            history: "Symptoms include numbness in ring and little fingers, weakness gripping objects, and neck pain radiating down right arm. Recently developed difficulty with fine motor tasks like typing. Symptoms worse with prolonged computer use and overhead activities.",
            pmh: "Cervical disc disease, Type 2 Diabetes",
            medications: "Metformin, gabapentin"
        },
        physicalExam: {
            inspection: "Mild atrophy of right hand intrinsics (FDI and Hypothenar).",
            palpation: "Tenderness over the cubital tunnel and cervical paraspinals.",
            rom: "Cervical extension reproduces right arm radiation.",
            strength: "Right FDI 3/5, ADM 4/5. Extensor Indicis Proprius (EIP) 4/5. Flexor Carpi Ulnaris (FCU) 4/5.",
            sensation: "Decreased sensation in C8 and Ulnar distributions (medial hand/forearm).",
            reflexes: "Triceps reflex 1+ on right, 2+ on left. Other reflexes symmetric.",
            specialTests: "Positive Tinel's at elbow. Positive Spurling's test (right)."
        },
        differentialDiagnosis: [
            { name: "Double Crush Syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "C8 Radiculopathy (Isolated)", ruleOut: "An isolated C8 radiculopathy would not explain the focal conduction block and significant 43% amplitude drop across the elbow." },
            { name: "Cubital Tunnel Syndrome (Isolated)", ruleOut: "A cubital tunnel lesion cannot explain the weakness and denervation in the EIP (Radial nerve, C8) or the C8 paraspinal muscles." },
            { name: "Lower Trunk Brachial Plexopathy", ruleOut: "Lower trunk plexopathy would involve multiple cord/nerve contributions and typically shows an abnormal Medial Antebrachial Cutaneous (MAC) SNAP; here the MAC is normal, localizing the second lesion to the root." },
            { name: "Thoracic Outlet Syndrome (TOS)", ruleOut: "TOS usually causes lower trunk symptoms and is often associated with vascular symptoms or a cervical rib; the normal MAC here rules out the lower trunk." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Double Crush Syndrome (C8 Radiculopathy + Cubital Tunnel Syndrome)",
        explanation: "This patient demonstrates 'Double Crush Syndrome', where a proximal root lesion makes the distal nerve more susceptible to compression. The ulnar motor conduction block across the elbow (43% drop) confirms Cubital Tunnel Syndrome. The concurrent denervation in the EIP (C8 root, Radial nerve) and C8 paraspinals confirms a second lesion at the C8 root level.",
        reviewOfSystems: {
            constitutional: "No fevers, no weight loss.",
            musculoskeletal: "Neck pain radiating down the medial arm. Pain at the medial elbow. No shoulder joint pain.",
            neurological: "Numbness in the pinky and ring fingers. Weakness in grip and finger dexterity. Normal bowel and bladder function.",
            endocrine: "Type 2 Diabetes (Well-controlled on Metformin)."
        },
        humoralData: {
            labs: ["A1c: 6.8% (Fairly controlled)", "Vitamin B12: 520 pg/mL (Normal)"],
            imaging: ["MRI Cervical Spine: C7-T1 posterior disc protrusion encroaching on the right C8 nerve root.", "Ultrasound Elbow: Focal enlargement of the ulnar nerve at the cubital tunnel with hypervascularity."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 3.8, amp: 10, velocity: 52, abnormal: true },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Medial Antebrachial Cut", peak: 2.8, amp: 15, velocity: 55, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM) - BE", latency: 2.8, amp: 8.5, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM) - AE", latency: 7.2, amp: 4.8, velocity: 32, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false },
                { name: "Ulnar Across Elbow", measureA: "Below Elbow", measureB: "Above Elbow", deltaP: "43% Block", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "C8 Paraspinals", abnormal: true, fibs: "2+" }
        ],
        teachingPoints: [
            "Double Crush Syndrome occurs when a nerve is compressed at two different sites, making the nerve more sensitive to injury at each site.",
            "Localization: Ulnar conduction block at the elbow confirms a peripheral component, while EIP (Radial nerve, C8 root) confirms a more proximal root component.",
            "Normal Medial Antebrachial Cutaneous (MAC) suggests a root lesion (pre-ganglionic); as seen here, its preservation helps localize the proximal component to the C8 root rather than the lower trunk."
        ]
    },


    // Stroke - Central Lesion (EMG NOT Indicated)
};
