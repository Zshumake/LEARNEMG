export const radialCases = {
    'radialneuropathy': {
        title: "Wrist Drop After Saturday Night",
        difficulty: "beginner",
        presentation: {
            age: 35,
            gender: "Male",
            occupation: "Software Developer",
            chiefComplaint: "3-week history of inability to extend wrist and fingers after falling asleep with arm over chair",
            history: "Woke up 3 weeks ago unable to extend right wrist or fingers. Had been drinking the night before and fell asleep in chair with right arm draped over the back (Saturday night palsy). No pain, just weakness. Can still flex fingers and wrist normally. Symptoms have not improved.",
            pmh: "No significant medical history",
            medications: "None"
        },
        physicalExam: {
            inspection: "Right wrist drop, inability to extend fingers at MCP joints",
            palpation: "No tenderness over spiral groove or elbow",
            rom: "Full passive ROM, limited active extension",
            strength: "Wrist extensors 0/5, finger extensors 0/5, triceps 5/5, brachioradialis 3/5",
            sensation: "Decreased sensation in first web space (superficial radial distribution)",
            reflexes: "Triceps reflex normal. Brachioradialis present but weak due to positioning.",
            specialTests: "Negative Tinel's at elbow, positive wrist drop sign"
        },
        differentialDiagnosis: [
            { name: "Radial nerve palsy (spiral groove)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Posterior interosseous syndrome", ruleOut: "Spares the ECR (wrist extension) and sensory branches; here, ECR is weak and Radial SNAP is abnormal." },
            { name: "Cervical radiculopathy (C7)", ruleOut: "C7 radiculopathy would typically affect the Triceps reflex and involve non-radial C7 muscles (e.g., PT, FCR); Radic spares SNAPs." },
            { name: "Stroke", ruleOut: "Isolated peripheral nerve findings; no other CNS signs or upper motor neuron symptoms." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Radial Nerve Palsy at the Spiral Groove (Saturday Night Palsy)",
        explanation: "Classic compression of the radial nerve in the spiral groove, sparing the triceps (arises proximally) but affecting all distal radial muscles and the superficial radial sensory nerve.",
        reviewOfSystems: {
            constitutional: "No weight loss or fever.",
            musculoskeletal: "No neck pain or shoulder pain.",
            neurological: "Right wrist drop. Numbness on back of hand. No other limb involvement.",
            psychiatric: "Admits to heavy alcohol use on weekends."
        },
        humoralData: {
            labs: ["Blood Alcohol Level: High (at time of admission)", "Vitamin B12: 450 pg/mL (Normal)"],
            imaging: ["X-ray Right Humerus: No fracture or bony abnormality at spiral groove."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 4.5, amp: 8.0, velocity: 42, abnormal: true }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false },
                { name: "Radial Motor (EIP)", latency: 5.2, amp: 2.0, velocity: 38, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.5", measureB: "4.8", deltaP: "2.3", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, fibs: "3+", recruitment: "None" },
            { muscle: "Extensor Carpi Radialis", nerve: "Radial", root: "C6-C7", abnormal: true, fibs: "3+", recruitment: "None" },
            { muscle: "Brachioradialis", nerve: "Radial", root: "C5-C6", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Triceps", nerve: "Radial", root: "C7-C8", abnormal: false },
            { muscle: "Cervical Paraspinals (C7)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Saturday night palsy is a common form of radial nerve compression at the spiral groove.",
            "Characterized by wrist drop and finger drop, with preserved triceps function (as the triceps branch comes off proximally).",
            "Sensory loss is typically in the superficial radial nerve distribution (dorsum of hand, first web space).",
            "EMG helps confirm the lesion level and assess severity and prognosis."
        ]
    },

    saturday_night: {
        title: "Wrist Drop and Thumb Numbness",
        difficulty: "intermediate",
        presentation: {
            age: 29,
            gender: "Male",
            occupation: "Student",
            chiefComplaint: "Complete' wrist drop' and numbness on the back of the hand after a long night of sleep",
            history: "Woke up after a heavy night of drinking with his arm draped over a hard chair. He found he could not lift his wrist or fingers at all. Significant numbness on the back of the thumb and hand. No neck pain. No trauma.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Wrist and fingers hanging in a flexed position (Wrist Drop). No atrophy (hyperacute).",
            palpation: "No significant tenderness in the neck or forearm.",
            rom: "Full passive ROM. Active extension zero.",
            strength: "Right Wrist Extension 2/5 (radial deviation only, ECRL partially spared), Finger Extension (EDC) 0/5, Thumb Extension (EPL) 0/5. Brachioradialis 1/5. Supinator 2/5. Triceps strength 5/5. Normal hand intrinsics (APB, ADM, FDI).",
            sensation: "Decreased sensation over the radial sensory territory (Snuffbox and dorsal first webspace).",
            reflexes: "Right Brachioradialis reflex 0. Triceps reflex 2+. Left reflexes symmetric.",
            specialTests: "Positive Tinel's sign at the spiral groove of the humerus; Negative Tinel's at the wrist/elbow."
        },
        differentialDiagnosis: [
            { name: "Radial Neuropathy at the Spiral Groove (Saturday Night Palsy)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Posterior Interosseous Nerve (PIN) Syndrome", ruleOut: "PIN syndrome spares the Brachioradialis and Supinator and has STRICTLY NORMAL sensation. This case has both BR weakness and snuffbox numbness." },
            { name: "C7 Radiculopathy", ruleOut: "Radiculopathy would typically cause neck pain and involve the triceps; sensory loss would be in the middle finger rather than the first webspace." },
            { name: "Brachial Plexopathy (Posterior Cord)", ruleOut: "A posterior cord lesion would involve the axillary nerve as well, leading to weak shoulder abduction (Deltoid), which is spared here." },
            { name: "Radial Neuropathy at the Axilla", ruleOut: "An axillary-level radial lesion (e.g. 'Crutch Palsy') would involve the **Triceps**, which is spared in this mid-humeral spiral groove injury." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Conduction block vs Axonal loss)",
        correctDiagnosis: "Saturday Night Palsy",
        explanation: "This is a classic 'Saturday Night Palsy' localizing to the **Spiral Groove of the humerus**. The presence of **wrist drop**, **weakness of the Brachioradialis**, and **sensory loss in the snuffbox** confirms a high radial lesion. The **sparing of the Triceps** (which branches proximal to the spiral groove) narrows the localization to the humerus. In the hyperacute phase, this is often a pure neurapraxia (conduction block).",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "No joint pain.",
            neurological: "Wrist drop and dorsal hand numbness."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["Ultrasound Humerus: Focal swelling of the radial nerve within the spiral groove.", "MRI Arm: Normal; no structural mass or fracture."]
        },
        ncsStudies: {
            sensory: [
                { name: "Radial Sensory (Snuffbox)", peak: 2.8, amp: 18.0, velocity: 52, abnormal: false, comment: "Preserved distally in neurapraxia (conduction block)" },
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false }
            ],
            motor: [
                { name: "Radial Motor (EIP) - Below Groove", latency: 4.5, amp: 6.0, velocity: "N/A", abnormal: false },
                { name: "Radial Motor (EIP) - Above Groove", latency: 8.5, amp: 0.5, velocity: 25, abnormal: true, comment: "Profound conduction block and slowing across the spiral groove" },
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, fibs: "0", recruitment: "Absent" },
            { muscle: "Triceps", nerve: "Radial", root: "C6-C8", abnormal: false, comment: "Spared (Proximal to spiral groove)" },
            { muscle: "Brachioradialis", nerve: "Radial", root: "C5-C6", abnormal: true, fibs: "0 (Hyperacute)", recruitment: "Absent", comment: "Neurapraxic block" },
            { muscle: "Extensor Carpi Radialis Longus", nerve: "Radial", root: "C6-C7", abnormal: false, fibs: "0", recruitment: "Normal", motorUnits: "Normal", comment: "Spared (ECRL branches above spiral groove)" },
            { muscle: "Extensor Digitorum Communis", nerve: "PIN", root: "C7-C8", abnormal: true, fibs: "0", recruitment: "Absent" }
        ],
        teachingPoints: [
            "Saturday Night Palsy is a compression neuropathy of the radial nerve at the spiral groove of the humerus.",
            "Key distinction from PIN: High radial lesions involve the **Brachioradialis** and the **Radial Sensory territorio** (Snuffbox).",
            "Localization Pearl: Sparing of the **Triceps** points to a lesion *after* the axilla, typically at the mid-humerus.",
            "Initial NCS often shows dramatic conduction block with preserved distal CMAP amplitudes (until wallerian degeneration occurs)."
        ]
    },

    wartenberg: {
        title: "Tingling on the Back of the Thumb",
        difficulty: "beginner",
        presentation: {
            age: 34,
            gender: "Female",
            occupation: "Security Officer",
            chiefComplaint: "Tingling and burning pain on the back of the right thumb and index finger",
            history: "Develop symptoms after wearing tight-fitting handcuffs during a training exercise 2 weeks ago. The pain is constant and worsened by wrist movement or wearing a tight watch. No weakness in the hand or arm. No neck pain.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Mild redness over the radial aspect of the wrist. No atrophy.",
            palpation: "Extreme tenderness over the superficial radial nerve as it emerges from under the Brachioradialis tendon (approximately 8cm proximal to the radial styloid).",
            rom: "Full ROM throughout.",
            strength: "5/5 strength in ALL muscle groups including wrist/finger extension, brachioradialis, and hand intrinsics.",
            sensation: "Decreased sensation (hypesthesia) and burning (allodynia) over the dorsal first webspace and the back of the thumb.",
            reflexes: "2+ and symmetric throughout. Brachioradialis reflex normal.",
            specialTests: "Highly positive Tinel's sign at the radial wrist; Negative Finkelstein's test (rules out De Quervain's)."
        },
        differentialDiagnosis: [
            { name: "Wartenberg's Syndrome (Cheiralgia Paresthetica)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "De Quervain's Tenosynovitis", ruleOut: "A tendonitis causing pain with thumb movement (Positive Finkelstein's), but it does NOT cause neurological numbness or an abnormal SNAP." },
            { name: "C6 Radiculopathy", ruleOut: "Radiculopathy would cause neck pain and involvement of C6 muscles (Biceps/BR) which are normal here. The SNAP is typically spared in a pre-ganglionic root lesion." },
            { name: "High Radial Neuropathy", ruleOut: "A high radial lesion would cause wrist drop and weakness in the Brachioradialis, which is not present here." },
            { name: "First CMC Osteoarthritis", ruleOut: "Causes joint pain and stiffness but not neurogenic tingling or sensory loss." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To rule out higher lesions)",
        correctDiagnosis: "Wartenberg's Syndrome",
        explanation: "Wartenberg's Syndrome is a pure sensory neuropathy of the superficial radial nerve at the wrist. It is often caused by external compression (tight watches, handcuffs, casts). The hallmark is **sensory loss/pain in the snuffbox** with **strictly normal motor function**. Electrodiagnostically, the **Radial Sensory SNAP is abnormal** (low amplitude or absent) while the motor NCS and EMG are completely normal.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Wrist/Thumb pain.",
            neurological: "Dorsal thumb numbness. **NO WEAKNESS**."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["Ultrasound Wrist: Localized edema and flattening of the superficial radial nerve near the radial styloid."]
        },
        ncsStudies: {
            sensory: [
                { name: "Radial Sensory (Snuffbox)", peak: 4.8, amp: 4.0, velocity: 35, abnormal: true, comment: "Confirms isolated sensory radial involvement" },
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false }
            ],
            motor: [
                { name: "Radial Motor (EIP)", latency: 4.2, amp: 8.0, velocity: 58, abnormal: false, comment: "Normal motor function distal to the lesion" },
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Extensor Indicis Proprius (EIP)", nerve: "PIN", root: "C7-C8", abnormal: false },
            { muscle: "Extensor Carpi Ulnaris (ECU)", nerve: "PIN", root: "C7-C8", abnormal: false },
            { muscle: "Brachioradialis", nerve: "Radial", root: "C5-C6", abnormal: false },
            { muscle: "First Dorsal Interosseous (FDI)", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Pronator Teres", nerve: "Median", root: "C6-C7", abnormal: false, comment: "Distractor - Normal" }
        ],
        teachingPoints: [
            "Wartenberg's syndrome is a pure sensory entrapment of the superficial radial nerve at the wrist.",
            "Often confused with De Quervain's tenosynovitis; look for the neurological distribution of numbness and the abnormal SNAP to differentiate.",
            "The hallmark is **Normal EMG** and **Abnormal Radial Sensory SNAP**.",
            "Commonly caused by tight-fitting objects around the wrist ('Handcuff Palsy')."
        ]
    },

    pin: {
        title: "Finger Drop without Numbness",
        difficulty: "difficult",
        presentation: {
            age: 48,
            gender: "Male",
            occupation: "Mechanic",
            chiefComplaint: "Inability to straighten fingers and thumb, but no numbness",
            history: "Noticed difficulty 3 days ago. He can extend his wrist but it 'pulls' towards the thumb side. He cannot lift his fingers or thumb up from a flat surface. No history of trauma. No neck pain. No sensory symptoms at all.",
            pmh: "Osteoarthritis of the elbow",
            medications: "NSAIDs"
        },
        physicalExam: {
            inspection: "No visible atrophy (acute).",
            palpation: "Deep tenderness over the proximal lateral forearm (over the supinator muscle).",
            rom: "Full ROM throughout.",
            strength: "Right Finger Extension (EDC) 1/5, Thumb Extension (EPL) 1/5, Thumb Abduction (APL) 2/5. Wrist Extension: 4/5 (Presents with RADIAL deviation due to preserved ECRL/ECRB and weak ECU). Brachioradialis and Supinator strength: 5/5.",
            sensation: "STRICTLY NORMAL throughout the radial, median, and ulnar distributions. No snuffbox numbness.",
            reflexes: "Right Brachioradialis reflex 2+. Triceps reflex 2+. Left reflexes symmetric.",
            specialTests: "Negative 'OK' sign. Negative Tinel's at the wrist."
        },
        differentialDiagnosis: [
            { name: "Posterior Interosseous Nerve (PIN) Syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "High Radial Neuropathy (Saturday Night Palsy)", ruleOut: "A high radial lesion would involve the Brachioradialis and Supinator and ALWAYS cause sensory loss in the snuffbox/dorsal hand territory." },
            { name: "C7 Radiculopathy", ruleOut: "Radiculopathy would involve the triceps (root-level) and typically cause neck pain and sensory changes in the middle finger." },
            { name: "Lead Poisoning Neuropathy", ruleOut: "Classically causes Bilateral wrist drop; this case is focal/unilateral and associated with local forearm pain." },
            { name: "Extensor Tendon Rupture", ruleOut: "Common in Rheumatoid Arthritis; however, tendon rupture would not explain the radial deviation of the wrist or the neurogenic findings on EMG." }
        ],
        requiresEMG: true,
        emgIndication: "CRITICAL (NCS is characteristically normal)",
        correctDiagnosis: "Posterior Interosseous Nerve Syndrome",
        explanation: "PIN syndrome is a pure motor branch neuropathy of the radial nerve. The hallmark is 'finger drop' with **preservation of the Brachioradialis and Supinator** (which branch before the PIN enters the Arcade of Frohse). A characteristic finding is **Radial Deviation** during wrist extension, because the ECRL (Radio-radial) is spared while the ECU (PIN-radial) is weak. Like AIN, the **Radial Sensory SNAP is strictly normal**, as the PIN carries no cutaneous sensation.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Lateral elbow/forearm pain.",
            neurological: "Finger/thumb weakness. **NO SENSORY LOSS**."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["Ultrasound Forearm: Compression of the radial nerve at the **Arcade of Frohse** (proximal border of supinator).", "MRI Elbow: Synovitis of the radio-humeral joint potentially compressing the deep radial nerve."]
        },
        ncsStudies: {
            sensory: [
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false, comment: "Crucial finding ruling out high radial neuropathy" },
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false }
            ],
            motor: [
                { name: "Radial Motor (EIP)", latency: 10.5, amp: 0.8, velocity: "N/A", abnormal: true, comment: "Low amplitude CMAP from a PIN-innervated muscle" },
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.5", measureB: "2.4", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, fibs: "3+", recruitment: "Absent" },
            { muscle: "Extensor Digitorum Communis (EDC)", nerve: "PIN", root: "C7-C8", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Extensor Carpi Ulnaris (ECU)", nerve: "PIN", root: "C7-C8", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Brachioradialis", nerve: "Radial", root: "C5-C6", abnormal: false, comment: "Spared (Proximal to PIN)" },
            { muscle: "Supinator", nerve: "Radial", root: "C6-C7", abnormal: false, comment: "Spared (Innervated before/at entry to arcade)" },
            { muscle: "Triceps", nerve: "Radial", root: "C6-C8", abnormal: false }
        ],
        teachingPoints: [
            "PIN syndrome is the radial equivalent of AIN—a pure motor syndrome with strictly **Normal Sensation**.",
            "Localization Pearl: Preservation of **Brachioradialis** and **Radial Sensory SNAP** localizes the lesion distal to the mid-arm/elbow bifurcation.",
            "The 'Radial Deviation' of the wrist is a pathognomonic sign, caused by imbalance between the spared ECRL and the weak ECU.",
            "The most common site of entrapment is the **Arcade of Frohse** in the supinator muscle."
        ]
    }
};
