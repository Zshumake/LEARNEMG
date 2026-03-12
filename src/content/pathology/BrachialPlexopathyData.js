export const BrachialPlexopathyData = {
    hero: {
        title: "Clinical Brachial Plexopathy",
        description: "If Radiculopathy is the \"Bread & Butter,\" then **Brachial Plexopathy** is the \"Master Class.\" Detecting a plexus lesion requires you to stop thinking about single nerves and start thinking about **geographic intersections.**",
        diagnosticGoal: "Is it a Root (Radiculopathy), a Plexus lesion, or a Peripheral Nerve injury?",
        proTip: "\"The SNAP is your compass. If the SNAP is dead, the lesion is in or distal to the plexus.\""
    },
    sections: [
        {
            id: "golden-rule",
            title: "The Golden Rule: Pre-ganglionic vs. Post-ganglionic",
            description: "This is the most critical distinction in all of EDX. When a patient presents with weakness and numbness in the arm, the **Sensory Nerve Action Potential (SNAP)** tells you exactly where the \"cut\" is.",
            scenarios: [
                {
                    label: "Scenario A: Pre-ganglionic",
                    type: "Root Level (Radiculopathy)",
                    description: "The lesion is *proximal* to the Dorsal Root Ganglion. The axon in the arm is still connected to its cell body.",
                    result: "Result: SNAP is NORMAL."
                },
                {
                    label: "Scenario B: Post-ganglionic",
                    type: "Plexus Level (Plexopathy)",
                    description: "The lesion is *distal* to the DRG. The axon in the arm has been cut off from its cell body and dies.",
                    result: "Result: SNAP is ABSENT/LOW."
                }
            ]
        },
        {
            id: "major-patterns",
            title: "The Big Three: Erb's, Klumpke's, & Parsonage-Turner",
            patterns: [
                {
                    title: "Upper Trunk (C5-C6) — \"Erb's Palsy\"",
                    tag: "Most Common",
                    cause: "**Cause:** Trauma (motorcycle accidents) or birth injury where the head and shoulder are pulled apart.",
                    presentation: "**Presentation:** \"Waiter's Tip\" posture. Shoulder adducted/internally rotated; elbow extended; forearm pronated.",
                    edx: "**EDX Signature:** Abnormal Medial/Lateral Antebrachial Cutaneous SNAPs + C5/C6 muscle denervation (Deltoid, Biceps)."
                },
                {
                    title: "Lower Trunk (C8-T1) — \"Klumpke's Palsy\"",
                    tag: "",
                    cause: "**Cause:** Grabbing a tree branch while falling, or \"Apex of Lung\" tumors (Pancoast Tumor).",
                    presentation: "**Presentation:** \"Claw Hand\" with sensory loss in the pinky and medial forearm.",
                    edx: "**EDX Signature:** Abnormal Ulnar SNAP + Medial Antebrachial Cutaneous SNAP. Weakness in ALL hand intrinsics."
                },
                {
                    title: "Parsonage-Turner Syndrome (Neuralgic Amyotrophy)",
                    tag: "",
                    cause: "**The Story:** A patient wakes up with *intense*, debilitating shoulder pain for a few days, which then disappears and is replaced by sudden, profound weakness. Often follows a viral infection or surgery.",
                    presentation: "",
                    edx: "**Resident Pearl:** This is a patchy, inflammatory plexitis. It doesn't follow a neat \"trunk\" pattern. Look for specific nerves like the Long Thoracic or Suprascapular to be hit in isolation."
                }
            ]
        },
        {
            id: "burner",
            title: "The Athlete's Nightmare: Burners & Stingers",
            description: "Common in football and wrestling. When the head is violently forced to the side, it either **compresses** or **stretches** the upper plexus.",
            bullets: [
                "Transient electric shock sensation down the arm.",
                "If symptoms last >15 minutes, get an EMG (but wait 3 weeks!).",
                "Localization: Usually the Upper Trunk (C5-C6)."
            ]
        }
    ],
    quiz: [
        {
            question: "A newborn presents with the arm hanging by the side, medially rotated, with the forearm extended and pronated ('waiter\\'s tip' posture). Which roots are most typically injured?",
            options: ["C8-T1 (Klumpke\\'s Palsy)", "C5-C6 (Erb\\'s Palsy)", "C7-C8", "Pan-plexus"],
            correct: 1,
            explanation: "Erb\\'s palsy (Upper Trunk / C5-C6 injury) classical presentation. The loss of shoulder abductors/external rotators and elbow flexors causes the arm to hang internally rotated and extended."
        },
        {
            question: "You are evaluating a patient with severe weakness of the hand intrinsics and numbness of the medial forearm and 4th/5th digits. A Horner\\'s syndrome is present on the same side. Where is the lesion?",
            options: ["Lower Trunk", "Upper Trunk", "Medial Cord", "Ulnar Nerve at the Elbow"],
            correct: 0,
            explanation: "This is classic for a lower plexus (C8-T1) lesion. The presence of Horner\\'s syndrome (ptosis, miosis, anhidrosis) strongly localizes the lesion proximally to the T1 root, pre-ganglionic!"
        },
        {
            question: "A patient presents with sharp shoulder pain followed by profound weakness of the shoulder girdle muscles. EDX shows severe denervation in the Supraspinatus, Infraspinatus, Deltoid, and Serratus Anterior. What is the most likely diagnosis?",
            options: ["C5 Radiculopathy", "Neuralgic Amyotrophy (Parsonage-Turner Syndrome)", "Upper Trunk Plexopathy secondary to trauma", "Lateral Cord Neuropathy"],
            correct: 1,
            explanation: "Parsonage-Turner Syndrome (idiopathic brachial plexitis) typically presents with sudden severe pain followed by patchy, profound weakness. It often affects multiple individual nerves branching off the upper/middle plexus (like suprascapular, axillary, and long thoracic) rather than following a strict trunk/cord pattern."
        },
        {
            question: "What is the 'Golden Rule' of Plexus vs. Root localization on EMG regarding sensory studies?",
            options: ["Abnormal SNAPs = Root, Normal SNAPs = Plexus", "Normal SNAPs = Root, Abnormal SNAPs = Plexus", "SNAPs cannot differentiate root from plexus", "Needle EMG of paraspinals is the only way"],
            correct: 1,
            explanation: "In a radiculopathy, the lesion is typically 'pre-ganglionic' (proximal to the DRG). Therefore, the sensory nerve cell body in the DRG and its distal axon remain intact, resulting in a NORMAL SNAP despite sensory symptoms. In a plexopathy ('post-ganglionic'), the axon is severed from the DRG, resulting in an ABNORMAL SNAP."
        },
        {
            question: "Which muscle is critical to test on needle EMG to definitively differentiate a C5-C6 radiculopathy from an Upper Trunk plexopathy?",
            options: ["Biceps brachii", "Deltoid", "Cervical Paraspinals", "Pronator Teres"],
            correct: 2,
            explanation: "Cervical paraspinal muscles are innervated by the dorsal rami of the spinal roots, which branch off BEFORE the brachial plexus forms. Abnormalities in the paraspinals confirm a root (or anterior horn) lesion, not a plexopathy."
        },
        {
            question: "You find robust denervation in the Extensor Indicis, Extensor Carpi Radialis, AND the Deltoid. Which anatomical structure ties these together?",
            options: ["Middle Trunk", "Posterior Cord", "Lateral Cord", "Anterior Interosseous Nerve"],
            correct: 1,
            explanation: "The Posterior Cord gives rise to the Radial nerve (extensors of wrist/fingers) and the Axillary nerve (deltoid). Finding abnormalities in both localizes the lesion to the posterior cord."
        },
        {
            question: "How do you confidently differentiate a Lower Trunk (C8-T1) plexopathy from a Medial Cord plexopathy using needle EMG?",
            options: ["Test Abductor Pollicis Brevis (APB)", "Test Extensor Indicis (EI)", "Test First Dorsal Interosseous (FDI)", "Test Pronator Teres (PT)"],
            correct: 1,
            explanation: "Both Lower Trunk and Medial Cord lesions affect C8-T1 ulnar/median median muscles (like APB and FDI). However, the Lower Trunk ALSO sends C8 fibers to the Radial Nerve via the Posterior Cord. Finding denervation in a C8 Radial muscle like Extensor Indicis proves the lesion is at the Lower Trunk, not the Medial Cord."
        },
        {
            question: "True Neurogenic Thoracic Outlet Syndrome (TOS) typically presents as a compressive injury of which part of the brachial plexus?",
            options: ["Upper Trunk", "Middle Trunk", "Lower Trunk", "Lateral Cord"],
            correct: 2,
            explanation: "True neurogenic TOS almost always affects the Lower Trunk (C8-T1), often due to a cervical rib or elongated C7 transverse process. It presents with wasting of the hand intrinsics (classically severe in the lateral thenar eminence - Gilliatt-Sumner hand) and sensory loss over the medial forearm/hand."
        },
        {
            question: "You diagnose a Lateral Cord lesion. Aside from the Musculocutaneous Nerve (Biceps/Brachialis), which other major arm nerve will have partial deficits?",
            options: ["Ulnar Nerve", "Median Nerve", "Radial Nerve", "Axillary Nerve"],
            correct: 1,
            explanation: "The Lateral Cord gives off the Lateral Root of the Median Nerve, supplying C6-C7 median-innervated muscles like the Pronator Teres and Flexor Carpi Radialis. A lateral cord lesion affects the Biceps AND these proximal Median muscles."
        },
        {
            question: "In a severe stretch injury of the brachial plexus undergoing eventual recovery, which muscles will demonstrate the earliest signs of reinnervation (Nascent motor units)?",
            options: ["Hand intrinsics", "Distal forearm muscles", "Proximal arm/shoulder muscles", "All muscle groups recover simultaneously"],
            correct: 2,
            explanation: "Nerves regenerate at approximately 1mm per day (or 1 inch per month). Therefore, muscles geographically closest to the injury site (proximal shoulder/arm muscles) will receive their repairing axons and show reinnervation long before distal muscles like the hand intrinsics."
        }
    ]
};
