export const medianForearmCases = {
    pronator: {
        title: "Forearm Pain and Palmar Numbness",
        difficulty: "difficult",
        presentation: {
            age: 42,
            gender: "Male",
            occupation: "Carpenter",
            chiefComplaint: "Aching forearm pain and numbness in the palm of the hand",
            history: "Develop progressive aching pain in the proximal volar forearm, worsened by repetitive hammering and screwdriving. Noticed numbness that extends into the base of the thumb and central palm. No nocturnal awakening. No significant neck pain.",
            pmh: "None",
            medications: "Ibuprofen as needed"
        },
        physicalExam: {
            inspection: "No visible atrophy in the hand or forearm.",
            palpation: "Marked tenderness over the pronator teres muscle in the proximal forearm.",
            rom: "Full ROM throughout.",
            strength: "Normal strength in thumb flexion (FPL) and finger flexion (FDP 2/3). Mild weakness in pronation against resistance (Pronator Teres/PQ). Normal hand intrinsic strength.",
            sensation: "Decreased sensation in the median distribution, INCLUDING the palmar cutaneous territory (the central palm).",
            reflexes: "2+ and symmetric throughout.",
            specialTests: "Pain reproduced with resisted pronation of the forearm and resisted flexion of the middle finger FDS."
        },
        differentialDiagnosis: [
            { name: "Pronator Teres Syndrome (Elbow)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Carpal Tunnel Syndrome (Wrist)", ruleOut: "CTS typically spares the palm (Palmar Cutaneous branch branches off proximal to the carpal tunnel) and usually causes nocturnal symptoms; here the palm is involved and symptoms are activity-related." },
            { name: "Anterior Interosseous Nerve (AIN) Syndrome", ruleOut: "AIN syndrome is a PURE MOTOR syndrome causing weakness in FPL/FDP2; it would NOT cause the palmar numbness seen here." },
            { name: "C6 Radiculopathy", ruleOut: "Radiculopathy would involve C6 muscles like the Brachioradialis and would typically be associated with neck pain and decreased brachioradialis reflex." },
            { name: "Medial Epicondylitis (Golfer's Elbow)", ruleOut: "Causes pain at the medial epicondyle on palpation and resisted wrist flexion, but NOT the neurological sensory loss in the palm." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Levels of involvement)",
        correctDiagnosis: "Pronator Teres Syndrome",
        explanation: "This case localizes the Median neuropathy to the proximal forearm. The involvement of the **Palmar Cutaneous branch** (causing numbness in the central palm) is a critical clinical differentiator from Carpal Tunnel Syndrome. EMG helps confirm by showing sparing of the **Pronator Teres** (innervated proximal to the entrapment) while potentially showing denervation in distal median or AIN muscles if the compression is significant.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Forearm pain, worsening with work.",
            neurological: "Palmar numbness. No weakness in legs."
        },
        humoralData: {
            labs: ["None indicated."],
            imaging: ["Ultrasound Forearm: Thickening of the median nerve as it passes between the two heads of the pronator teres muscle.", "MRI Elbow: Mild edema within the pronator teres muscle; no structural mass or bony abnormality."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.8, amp: 12.0, velocity: 48, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Palmar Cutaneous (Median)", peak: "Absent", amp: 0, velocity: 0, abnormal: true }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 4.2, amp: 8.5, velocity: 40, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Median Conduction (Elbow-Wrist)", velocity: 38, normal: 50, abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "Pronator Teres", nerve: "Median", root: "C6-C7", abnormal: false, fibs: "0", comment: "Typically spared as it is the first median branch" },
            { muscle: "Flexor Carpi Radialis", nerve: "Median", root: "C6-C7", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Pronator Quadratus", nerve: "AIN/Median", root: "C7-C8", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "C6 Paraspinals", abnormal: false }
        ],
        teachingPoints: [
            "Pronator Teres Syndrome (PTS) is the second most common median nerve entrapment after CTS.",
            "Crucial Distinction: PTS involves the **Palmar Cutaneous branch**, leading to sensory loss in the central palm. CTS spares this area because the branch arises proximal to the carpal tunnel.",
            "Electrodiagnosis: The **Pronator Teres (PT)** is typically **SPARED** on EMG because the entrapment occurs as the nerve passes between the PT heads or under the FDS arch (distal to the PT branch).",
            "NCS may show conduction slowing across the elbow, though this can be technically difficult to demonstrate compared to CTS."
        ]
    },

    ain: {
        title: "Difficulty Making the 'OK' Sign",
        difficulty: "difficult",
        presentation: {
            age: 28,
            gender: "Female",
            occupation: "Knitter",
            chiefComplaint: "Sudden onset of difficulty picking up small objects and an awkward tip-to-tip pinch",
            history: "Noticed difficulty yesterday while knitting. She cannot properly flex the tip of her thumb or index finger. No numbness or tingling. Had deep forearm pain for 2 days preceding the weakness. No trauma or neck pain.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "No visible atrophy (acute onset).",
            palpation: "Mild deep tenderness in the proximal volar forearm.",
            rom: "Full ROM throughout.",
            strength: "Right Flexor Pollicis Longus (FPL) 2/5, Flexor Digitorum Profundus (FDP) of index finger 2/5. Normal strength in Pronator Teres, FCR, and APB (Hand intrinsics). Normal strength in FDP of 4th and 5th digits (Ulnar).",
            sensation: "STRICTLY NORMAL throughout the median, ulnar, and radial distributions. No palmar or digital numbness.",
            reflexes: "2+ and symmetric throughout.",
            specialTests: "Negative 'OK' sign (Patient's thumb and index finger meet in a flat 'pincer' position rather than a circle due to lack of distal IP/DIP flexion)."
        },
        differentialDiagnosis: [
            { name: "Anterior Interosseous Nerve (AIN) Syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Pronator Teres Syndrome", ruleOut: "PTS would cause sensory loss in the palm and involve non-AIN muscles like the FCR." },
            { name: "Carpal Tunnel Syndrome", ruleOut: "CTS would cause sensory loss (Digits 1-3) and involve the APB, while sparing the AIN-innervated FPL/FDP." },
            { name: "FPL Tendon Rupture", ruleOut: "A tendon rupture would cause an inability to flex the thumb but would not involve the index finger FDP; also, EMG would be normal in a pure tendon injury." },
            { name: "C8-T1 Radiculopathy", ruleOut: "A radiculopathy would involve ulnar-innervated C8 muscles (FDI, ADM) and would often have sensory changes and paraspinal involvement." }
        ],
        requiresEMG: true,
        emgIndication: "CRITICAL (NCS is normal in pure AIN)",
        correctDiagnosis: "Anterior Interosseous Nerve Syndrome",
        explanation: "AIN syndrome is a pure motor neuropathy. The hallmark is the inability to flex the distal phalanges of the thumb (FPL) and index finger (FDP 2), resulting in a characteristic 'pincer' pinch instead of a round 'OK' sign. Because the AIN carries no cutaneous sensory fibers, the **NCS is characteristically normal**, making EMG of the AIN-innervated muscles (FPL, FDP 2, PQ) the definitive diagnostic tool.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Forearm pain (acute phase).",
            neurological: "Weakness in thumb/finger. **NO SENSORY LOSS**."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["Ultrasound Forearm: Normal median nerve; no mass lesion in the forearm.", "MRI Forearm: Stable; no structural cause identified."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false, comment: "Normal because APB is not AIN-innervated" },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false },
                { name: "Radial Motor (EIP)", latency: 10.5, amp: 8.0, velocity: "N/A", abnormal: false, comment: "Distractor - Normal" }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.5", measureB: "2.4", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Spared (Not AIN-innervated)" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Flexor Pollicis Longus (FPL)", nerve: "AIN", root: "C7-C8", abnormal: true, fibs: "3+", recruitment: "Absent/Severely Reduced" },
            { muscle: "Flexor Digitorum Profundus 2", nerve: "AIN", root: "C7-C8", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Pronator Quadratus", nerve: "AIN", root: "C7-C8", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Pronator Teres", nerve: "Median", root: "C6-C7", abnormal: false, comment: "Spared (Proximal to AIN)" }
        ],
        teachingPoints: [
            "AIN syndrome (Kiloh-Nevin) involves only the motor branch of the median nerve supplying the FPL, FDP 2/3, and PQ.",
            "Crucial Clinical Pearl: **AIN syndrome has NO sensory loss**. If the patient has numbness, look for PTS or CTS.",
            "NCS studies (Median sensory and motor to APB) are characteristically **NORMAL** in AIN syndrome.",
            "The diagnosis is made solely on **EMG**, showing denervation only in the AIN-innervated triad (FPL, FDP 2, PQ)."
        ]
    },

    struthers: {
        title: "Forearm Weakness with Mid-Arm Pain",
        difficulty: "difficult",
        presentation: {
            age: 55,
            gender: "Male",
            occupation: "House Painter",
            chiefComplaint: "Pain in the mid-arm and weakness in the hand and wrist",
            history: "Developed deep, aching pain in the medial mid-arm about 4 inches above the elbow. Over several weeks, noticed numbness in the thumb, index, and middle fingers and difficulty gripping objects. No neck pain.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Mild atrophy of the thenar eminence and the proximal volar forearm muscles.",
            palpation: "A hard, bony prominence is palpable on the medial humerus approximately 5cm proximal to the medial epicondyle. Tenderness on pressure over this site reproduces 'shocks' to the thumb.",
            rom: "Full ROM throughout.",
            strength: "Right Pronator Teres 3/5, Flexor Carpi Radialis (FCR) 3/5, Flexor Pollicis Longus (FPL) 3/5, APB 3/5. Sparing of triceps and biceps.",
            sensation: "Decreased sensation in the median distribution (digits 1-3.5) AND the central palm (palmar cutaneous territory).",
            reflexes: "2+ and symmetric throughout.",
            specialTests: "Positive Tinel's sign at the mid-humerus site."
        },
        differentialDiagnosis: [
            { name: "Median Neuropathy at the Ligament of Struthers", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Pronator Teres Syndrome (Elbow)", ruleOut: "PTS occurs at the elbow and WOULD SPARE the Pronator Teres muscle (first median branch); here the PT is weak, localizing the lesion more proximally to the humerus." },
            { name: "Carpal Tunnel Syndrome (Wrist)", ruleOut: "CTS involves the wrist and spares the forearm muscles (FCR, FPL, PT) and the palm; here all are involved." },
            { name: "C6-C7 Radiculopathy", ruleOut: "Radiculopathy would commonly involve the Brachioradialis (C6) and show neck pain; here the BR is normal and there is a bony humeral spur palpable." },
            { name: "Arcade of Struthers (Ulnar)", ruleOut: "A potential terminological confusion; Arcade of Struthers affects the Ulnar nerve, causing pinky numbness; this case involves the median distribution." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (High-level localization)",
        correctDiagnosis: "Median Neuropathy at the Ligament of Struthers",
        explanation: "This rare high-median entrapment occurs at the supracondylar process of the humerus, where the Ligament of Struthers compresses the median nerve. Unlike Pronator Teres Syndrome (which spares the PT branch), this lesion is PROXIMAL to the PT branch, causing weakness in the **Pronator Teres, FCR, FPL, and APB**. Diagnosis is supported by seeing a supracondylar process on X-ray.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Medial arm pain.",
            neurological: "Hand weakness and numbness involving the thumb/index fingers."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["X-ray Right Humerus: Presence of a **Supracondylar Process** (bony spur) on the anteromedial surface of the humerus proximal to the epicondyle.", "MRI Arm: Hyperintensity and swelling of the median nerve at the site of the supracondylar process."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 4.8, amp: 8.0, velocity: 32, abnormal: true },
                { name: "Palmar Cutaneous (Median)", peak: "Absent", amp: 0, velocity: 0, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB) - Wrist", latency: 3.8, amp: 4.2, velocity: "N/A", abnormal: false },
                { name: "Median Motor (APB) - Elbow", latency: 12.0, amp: 4.0, velocity: 52, abnormal: false },
                { name: "Median Motor (APB) - Axilla", latency: 18.2, amp: 3.8, velocity: 35, abnormal: true, comment: "Slowing localized to the mid-humerus" }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Pronator Teres", nerve: "Median", root: "C6-C7", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Flexor Carpi Radialis (FCR)", nerve: "Median", root: "C6-C7", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Flexor Pollicis Longus (FPL)", nerve: "AIN/Median", root: "C7-C8", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false },
            { muscle: "Biceps", nerve: "Musculocutaneous", root: "C5-C6", abnormal: false }
        ],
        teachingPoints: [
            "Median neuropathy at the Ligament of Struthers is a high-arm entrapment near the supracondylar process.",
            "Classic differentiator from PTS: The **Pronator Teres is weak** (in PTS, it is spared).",
            "Classic differentiator from CTS: The **Forearm muscles and Palm sensation are involved**.",
            "Radiographic hallmark: A bony **supracondylar process** on lateral/AP X-rays of the distal humerus."
        ]
    }
};
