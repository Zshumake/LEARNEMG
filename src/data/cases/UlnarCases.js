export const ulnarCases = {
    'hand5': {
        title: "Hand Weakness (Pinky Side)",
        difficulty: "beginner",
        presentation: {
            age: 52,
            gender: "Male",
            occupation: "Mechanic",
            chiefComplaint: "6-month history of weakness and numbness affecting pinky and ring fingers",
            history: "Gradual onset of difficulty with fine motor tasks. Notices weakness when trying to grip tools. Numbness in ring and little fingers, worse in the morning. Works long hours using hand tools and machinery. No neck pain or trauma.",
            pmh: "None significant",
            medications: "None"
        },
        physicalExam: {
            inspection: "Mild atrophy of hypothenar muscles and first dorsal interosseous on right",
            palpation: "Tenderness over cubital tunnel. No cervical spine tenderness.",
            rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
            strength: "Weakness in grip strength (4/5), weak finger abduction and adduction, positive Froment's sign",
            sensation: "Decreased light touch and pinprick in ulnar distribution (digits 4-5) and the dorsal-medial aspect of the hand (DUC territory).",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Positive Tinel's sign at elbow, positive Froment's sign"
        },
        differentialDiagnosis: [
            { name: "Cubital tunnel syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Ulnar neuropathy at elbow", ruleOut: "Synonymous with Cubital Tunnel." },
            { name: "Guyon's canal syndrome", ruleOut: "Would spare dorsal ulnar cutaneous sensation (dorsal hand) and typically spares FCU." },
            { name: "C8 radiculopathy", ruleOut: "Would typically involve Median-innervated C8 muscles (APB, FPL) and spare the Ulnar SNAP." },
            { name: "Lower trunk brachial plexopathy", ruleOut: "Would affect C8-T1 fibers in both Median and Ulnar nerves; SNAP would be abnormal but typically affects Medial Antebrachial Cutaneous as well." },
            { name: "Polyneuropathy", ruleOut: "Symptoms are asymmetric (focal to right arm) and specific to ulnar distribution." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Cubital Tunnel Syndrome",
        explanation: "Classic ulnar neuropathy at elbow with weakness of intrinsic hand muscles, positive Froment's sign, and ulnar sensory distribution.",
        reviewOfSystems: {
            constitutional: "No weight loss or fatigue.",
            musculoskeletal: "No neck pain vs shoulder pain. Elbow pain occasionally.",
            neurological: "Numbness in digits 4-5. Grip weakness.",
            skin: "No rashes."
        },
        humoralData: {
            labs: ["CBC: Normal", "BMP: Normal"],
            imaging: ["Elbow X-ray: Mild osteophytes at cubital tunnel."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 4.2, amp: 6.0, velocity: 42, abnormal: true },
                { name: "Dorsal Ulnar Cutaneous", peak: 4.5, amp: 5.0, velocity: 40, abnormal: true },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 4.8, amp: 4.2, velocity: 38, abnormal: true, comment: "Focal slowing (>10m/s drop) across the elbow segment" }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, fibs: "2+", psw: "1+", recruitment: "Reduced" },
            { muscle: "Flexor Carpi Ulnaris", nerve: "Ulnar", root: "C8", abnormal: false, comment: "Spared (Common in mild/moderate cubital tunnel)" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" }
        ],
        teachingPoints: [
            "Localization to the elbow is confirmed by conduction velocity drop (>10m/s) or conduction block across the elbow segment.",
            "In UNE, the Flexor Carpi Ulnaris (FCU) is often spared if the lesion is mild or distal to the FCU branch origins.",
            "Dorsal Ulnar Cutaneous (DUC) SNAP should be abnormal in a lesion at or proximal to the elbow."
        ]
    },

    klumpke: {
        title: "Weak Hand and Medial Arm Numbness",
        difficulty: "difficult",
        presentation: {
            age: 24,
            gender: "Male",
            occupation: "Bike Messenger",
            chiefComplaint: "Weakness and numbness in the right hand following a fall where he caught himself by a tree branch",
            history: "24-year-old male who fell from a height and reflexively grabbed a tree branch with his right hand, causing a sudden upward traction on his arm. Immediately felt sharp pain in the axilla and numbness in the medial arm and hand. Now presents 4 weeks later with progressive 'clawing' of the hand and inability to perform fine motor tasks.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Atrophy of the thenar and hypothenar eminences. 'Claw hand' posture (hyperextension at MCP, flexion at IP joints of digits 4-5).",
            palpation: "Tenderness in the right axilla and supraclavicular space.",
            rom: "Full ROM at shoulder and elbow. Limited finger extension and abduction.",
            strength: "Right hand intrinsics: APB 2/5, FDI 2/5, ADM 2/5. Finger flexors (FPL/FDP) 3/5. Wrist flexors (FCU) 4/5. Triceps 5/5. Deltoid 5/5.",
            sensation: "Decreased light touch and pinprick on the medial aspect of the arm, forearm, and the ulnar side of the hand (digits 4-5).",
            reflexes: "2+ and symmetric throughout. No Horner's syndrome (suggests post-ganglionic trunk rather than t1 root avulsion).",
            specialTests: "Negative Spurling's test. Negative Tinel's at the wrist and elbow."
        },
        differentialDiagnosis: [
            { name: "Lower Trunk Brachial Plexopathy (Klumpke's)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "C8-T1 Radiculopathy", ruleOut: "Radiculopathy (pre-ganglionic) would spare the Medial Antebrachial Cutaneous (MAC) and Ulnar SNAPs; here both are abnormal." },
            { name: "Combined Ulnar and Median Neuropathy", ruleOut: "Would not explain the sensory loss in the medial arm/forearm (MAC territory) or the weakness in non-median/non-ulnar C8 muscles like the EIP." },
            { name: "Thoracic Outlet Syndrome (TOS)", ruleOut: "TOS usually presents with more chronic, positional symptoms and often involves vascular changes; the acute traction injury history is highly suggestive of plexopathy." },
            { name: "T1 Root Avulsion", ruleOut: "Typically presents with Horner's syndrome (ptosis/miosis) due to disruption of sympathetic fibers; its absence here points to the trunk." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right Lower Trunk Brachial Plexopathy (Klumpke's Palsy)",
        explanation: "Acute traction injury (upward pull) causing damage to the lower trunk (C8-T1). Localization is confirmed by: 1) Abnormal MAC and Ulnar SNAPs (post-ganglionic), 2) Weakness in all C8-T1 innervated muscles (Median, Ulnar, and Radial), and 3) Sparing of proximal (C5-C7) muscles and reflexes.",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "Axillary and medial arm pain. No neck pain.",
            neurological: "Severe hand weakness and numbness in the 'medial' distribution. No leg symptoms."
        },
        humoralData: {
            labs: ["None indicated"],
            imaging: ["MRI Brachial Plexus: Signal abnormality and edema in the lower trunk; no evidence of root avulsion or pseudomeningocele."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false, comment: "Spared (C6-C7)" },
                { name: "Ulnar Sensory (Little)", peak: 4.5, amp: 5.0, velocity: 40, abnormal: true },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false, comment: "Spared (C6)" },
                { name: "Medial Antebrachial Cut", peak: 4.8, amp: 4.0, velocity: 38, abnormal: true, comment: "Key Localization - Abnormal" }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 5.2, amp: 3.5, velocity: 52, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 4.8, amp: 2.5, velocity: 48, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Flexor Carpi Ulnaris", nerve: "Ulnar", root: "C8", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Biceps", nerve: "Musculocutaneous", root: "C5-C6", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Deltoid", nerve: "Axillary", root: "C5", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "C8-T1 Paraspinals", abnormal: false, fibs: "0", comment: "Confirms post-ganglionic" }
        ],
        teachingPoints: [
            "Klumpke's palsy results from injury to the lower trunk (C8-T1), often due to hyperabduction of the arm.",
            "The hallmark finding for localization is the abnormal Medial Antebrachial Cutaneous (MAC) SNAP, which distinguishes it from a C8 radiculopathy.",
            "Physical exam classically shows a 'claw hand' due to weakness of the lumbricals and interossei.",
            "Normal paraspinals and SNAPs would suggest a root level lesion (radiculopathy), while abnormal SNAPs and normal paraspinals confirm a plexopathy."
        ]
    }
};
