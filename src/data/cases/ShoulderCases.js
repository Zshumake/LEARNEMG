export const shoulderCases = {
    suprascapular: {
        title: "Deep Shoulder Pain and External Rotation Weakness",
        difficulty: "difficult",
        presentation: {
            age: 24,
            gender: "Male",
            occupation: "Professional Volleyball Player",
            chiefComplaint: "Deep, poorly localized dull ache in the right shoulder and weakness when serving",
            history: "Develop pain in the posterior shoulder over several months. Lately, notices he cannot 'follow through' on his serve and feels like his arm is 'giving out' during external rotation. No history of acute trauma. No neck pain or radiating numbness.",
            pmh: "None",
            medications: "NSAIDs"
        },
        physicalExam: {
            inspection: "Visible wasting/atrophy of the right supraspinatus and infraspinatus fossae. Deltoid bulk is preserved.",
            palpation: "Tenderness over the suprascapular notch (posterior scapula). No joint instability.",
            rom: "Full passive ROM. Pain with extreme horizontal adduction.",
            strength: "Right Shoulder Abduction (initial 15-30 degrees) 3/5. External Rotation (Infraspinatus) 2/5. Shoulder Abduction (Mid-range, Deltoid) 5/5. Biceps 5/5. Triceps 5/5.",
            sensation: "NORMAL throughout the arm, including the lateral shoulder (axillary patch) and all digital distributions.",
            reflexes: "Symmetric 2+ throughout (Biceps, Triceps, Brachioradialis).",
            specialTests: "Negative Empty Can test (no pain, just weakness). Negative Spurling's maneuver."
        },
        differentialDiagnosis: [
            { name: "Suprascapular Nerve Entrapment (Suprascapular Notch)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Spinoglenoid Notch Entrapment", ruleOut: "Entrapment at the spinoglenoid notch would involve ONLY the Infraspinatus, sparing the Supraspinatus. Here, both muscles are weak and atrophied." },
            { name: "C5 Radiculopathy", ruleOut: "Radiculopathy would involve the Deltoid (Axillary), Biceps (Musculocutaneous), and Rhomboids/Paraspinals. It would also often be associated with neck pain and an abnormal Biceps reflex." },
            { name: "Upper Trunk Brachial Plexopathy", ruleOut: "Would involve a wider array of C5-C6 muscles including the Deltoid, Biceps, and Brachioradialis, and would typically have sensory loss in the lateral arm/forearm." },
            { name: "Parsonage-Turner Syndrome (PTS)", ruleOut: "PTS usually presents with a hyperacute, agonizing pain followed by weakness; this case is a chronic, progressive presentation related to overhead sports." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Levels of entrapment)",
        correctDiagnosis: "Suprascapular Nerve Entrapment",
        explanation: "Suprascapular neuropathy at the **Suprascapular Notch** leads to weakness and atrophy of both the **Supraspinatus** and **Infraspinatus**. This is a purely motor/joint-pain syndrome (the nerve carries no cutaneous sensory fibers). A key localization pearl is **Deltoid sparing** (ruling out C5/Upper Trunk) and **Supraspinatus involvement** (ruling out the more distal Spinoglenoid notch site). In athletes, this is often caused by repetitive overhead motion or a paralabral cyst.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Deep shoulder pain.",
            neurological: "Shoulder weakness. **NO NUMBNESS**."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["MRI Shoulder: 2cm **Paralabral Cyst** at the suprascapular notch causing compression of the nerve. Atrophy and fatty infiltration of the supraspinatus and infraspinatus muscles."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Lateral Antebrachial Cutaneous", peak: 2.4, amp: 20, velocity: 62, abnormal: false, comment: "Spared (rules out Upper Trunk)" }
            ],
            motor: [
                { name: "Suprascapular Motor (SS)", latency: 5.2, amp: 1.2, velocity: "N/A", abnormal: true, comment: "Prolonged latency and low amplitude" },
                { name: "Suprascapular Motor (IS)", latency: 6.8, amp: 0.8, velocity: "N/A", abnormal: true },
                { name: "Axillary Motor (Deltoid)", latency: 3.8, amp: 10.5, velocity: "N/A", abnormal: false, comment: "Spared" }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Supraspinatus", nerve: "Suprascapular", root: "C5-C6", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Infraspinatus", nerve: "Suprascapular", root: "C5-C6", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Deltoid", nerve: "Axillary", root: "C5-C6", abnormal: false },
            { muscle: "Biceps", nerve: "Musculocutaneous", root: "C5-C6", abnormal: false },
            { muscle: "Rhomboids", nerve: "Dorsal Scapular", root: "C4-C5", abnormal: false },
            { muscle: "C5-C6 Paraspinals", abnormal: false }
        ],
        teachingPoints: [
            "The suprascapular nerve supplies the supraspinatus and infraspinatus; it carries only motor and sensory fibers to the GH and AC joints.",
            "Localization Site 1: **Suprascapular Notch** (involves both muscles).",
            "Localization Site 2: **Spinoglenoid Notch** (involves ONLY the infraspinatus).",
            "Athletes (volleyball, baseball) and patients with paralabral cysts are at highest risk.",
            "Normal Deltoid and Biceps EMG is critical to rule out C5 radiculopathy or Upper Trunk plexopathy."
        ]
    },

    axillary: {
        title: "Shoulder Weakness after a Fall",
        difficulty: "intermediate",
        presentation: {
            age: 58,
            gender: "Female",
            occupation: "Retired",
            chiefComplaint: "Inability to lift the right arm after a shoulder dislocation",
            history: "Tripped and fell 3 weeks ago, sustaining an anterior shoulder dislocation which was reduced in the ED. Since then, she has been unable to lift her arm to the side. Numbness noted over a small area on the outer shoulder. No neck pain. No weakness in the hand or elbow.",
            pmh: "Osteoporosis",
            medications: "Calcium, Vitamin D"
        },
        physicalExam: {
            inspection: "Noticeable flattening of the right deltoid muscle. No other visible atrophy.",
            palpation: "Mild residual soreness in the glenohumeral joint. No bony abnormalities palpable.",
            rom: "Full passive ROM. Active abduction capped at 20-30 degrees due to weakness.",
            strength: "Right Shoulder Abduction (Deltoid) 1/5. External Rotation (Infraspinatus) 5/5. Biceps 5/5. Triceps 5/5. Hand intrinsics 5/5.",
            sensation: "Decreased sensation over the lateral aspect of the upper arm ('Regimental Patch' area). Normal sensation in the forearm and hand.",
            reflexes: "Symmetric 2+ (Biceps, Triceps, Brachioradialis).",
            specialTests: "Negative Empty Can (for pain). Negative Spurling's maneuver."
        },
        differentialDiagnosis: [
            { name: "Axillary Neuropathy (Shoulder Dislocation)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "C5 Radiculopathy", ruleOut: "Radiculopathy would typically involve the Biceps (Musculocutaneous) and Supraspinatus (Suprascapular), and often presents with neck pain and paraspinal involvement. Here, muscle weakness is isolated to the deltoid." },
            { name: "Upper Trunk Brachial Plexopathy", ruleOut: "Would involve a combination of C5-C6 muscles (Biceps, BR, Deltoid, Infraspinatus) and cause sensory loss in the lateral forearm. Here, only the deltoid and its sensory patch are involved." },
            { name: "Rotator Cuff Tear (Full Thickness)", ruleOut: "A massive tear can cause pseudo-paralysis of abduction, but it would NOT cause the 'regimental patch' sensory loss or the neurogenic findings on EMG." },
            { name: "Suprascapular Neuropathy", ruleOut: "Involves Supraspinatus/Infraspinatus; this case has preserved external rotation (IS) and weak abduction (Deltoid)." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Prognostication and localization)",
        correctDiagnosis: "Axillary Neuropathy",
        explanation: "Axillary nerve injury is a well-known complication of anterior shoulder dislocations. Localization is confirmed by **isolated weakness of the Deltoid**, **sensory loss in the regimental patch distribution**, and **sparing of all other C5-C6 muscles** (Biceps, Infraspinatus, Supraspinatus). EMG shows denervation in the deltoid while proximal (Suprascapular) and other distal C5-C6 branches remain normal.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Significant shoulder weakness post-mva/fall.",
            neurological: "Numbness on the outer shoulder. No hand numbness."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["X-ray Right Shoulder: Status post reduction of anterior dislocation. No fracture.", "MRI Shoulder: No full-thickness rotator cuff tear; mild deltoid edema noted."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 42, velocity: 55, abnormal: false, comment: "Distractor - Normal" },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 38, velocity: 62, abnormal: false, comment: "Distractor - Normal" },
                { name: "Lateral Antebrachial Cutaneous", peak: 2.4, amp: 22, velocity: 65, abnormal: false, comment: "Spared (localizes distal to the trunk)" }
            ],
            motor: [
                { name: "Axillary Motor (Deltoid)", latency: 8.5, amp: 0.5, velocity: "N/A", abnormal: true, comment: "Low amplitude CMAP suggests severe axonal loss" },
                { name: "Median Motor (APB)", latency: 3.8, amp: 14.0, velocity: 52, abnormal: false, comment: "Distractor - Normal" },
                { name: "Musculocutaneous Motor (Biceps)", latency: 4.8, amp: 12.0, velocity: "N/A", abnormal: false, comment: "Spared" }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Deltoid (Ant/Mid)", nerve: "Axillary", root: "C5-C6", abnormal: true, fibs: "3+", recruitment: "Severely Reduced" },
            { muscle: "Teres Minor", nerve: "Axillary", root: "C5-C6", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Biceps", nerve: "Musculocutaneous", root: "C5-C6", abnormal: false },
            { muscle: "Infraspinatus", nerve: "Suprascapular", root: "C5-C6", abnormal: false },
            { muscle: "Rhomboids", nerve: "Dorsal Scapular", root: "C4-C5", abnormal: false },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "C5-C6 Paraspinals", abnormal: false }
        ],
        teachingPoints: [
            "The axillary nerve is highly vulnerable in shoulder dislocations as it winds around the surgical neck of the humerus.",
            "Localization Pearl: Isolated Deltoid weakness with **Sparing of the Infraspinatus/Biceps** and **Normal LABC SNAP** rules out radiculopathy and upper trunk plexopathy.",
            "The 'Regimental Patch' is the sensory territory of the superior lateral cutaneous nerve of the arm (branch of axillary).",
            "EMG is essential to rule out co-existing rotator cuff tears which may clinically mimic nerve weakness."
        ]
    },

    long_thoracic: {
        title: "The Winged Scapula",
        difficulty: "difficult",
        presentation: {
            age: 28,
            gender: "Female",
            occupation: "Swimmer",
            chiefComplaint: "Pain in the shoulder and difficulty with overhead reaching; noticed a 'bulge' in her back",
            history: "Professional swimmer who developed aching shoulder pain after a grueling training block. Noticed her right shoulder blade 'sticks out' when she pushes against a wall. No numbness in the hand or arm. Denies recent trauma.",
            pmh: "None",
            medications: "NSAIDs"
        },
        physicalExam: {
            inspection: "Obvious winging of the medial border of the right scapula, especially when the patient pushes against a wall (protraction).",
            palpation: "Mild tenderness over the right serratus anterior muscle.",
            rom: "Full active and passive ROM of the glenohumeral joint, but scapulothoracic rhythm is disrupted.",
            strength: "Right Shoulder Flexion/Abduction 4/5 (limited by unstable scapula). Serratus Anterior 2/5. Rhomboids 5/5. Trapezius 5/5. Biceps/Triceps 5/5. Hand intrinsics 5/5.",
            sensation: "STRICTLY NORMAL throughout the arm and shoulder.",
            reflexes: "Symmetric 2+ (Biceps, Triceps, Brachioradialis).",
            specialTests: "Positive Scapular Winging Test (with wall push)."
        },
        differentialDiagnosis: [
            { name: "Long Thoracic Neuropathy (Winged Scapula)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Spinal Accessory Neuropathy (CN XI)", ruleOut: "CN XI injury would cause winging of the **lateral** border of the scapula (Trapezius weakness) and weakness in shoulder shrugging; here the medial border is winged and shrug is normal." },
            { name: "Dorsal Scapular Neuropathy", ruleOut: "Would cause weakness of the Rhomboids and Levator Scapulae, with the scapula shifting **laterally** at rest; here the scapula reflects medial winging during protraction." },
            { name: "Brachial Plexopathy (Upper Trunk)", ruleOut: "Would involve multiple muscles (Biceps, Deltoid, Supraspinatus) and cause sensory loss. This case is isolated to the serratus anterior." },
            { name: "Facio-Scapulo-Humeral Dystrophy (FSHD)", ruleOut: "Can cause scapular winging but is usually bilateral, chronic, and involves the face (orbicularis oculi weakness) which is absent here." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Definitive localization)",
        correctDiagnosis: "Long Thoracic Neuropathy",
        explanation: "Isolated long thoracic nerve injury localizing to the **Serratus Anterior**. This is a pure motor syndrome. The hallmark is medial scapular winging during protraction (pushing). Diagnosis is confirmed by EMG showing denervation in the serratus anterior with strict sparing of the Rhomboids (Dorsal Scapular), Trapezius (CN XI), and all other C5-C7 muscles.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Shoulder pain and difficulty reaching high shelves.",
            neurological: "Scapular winging. **NO SENSORY LOSS**."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["Dynamic Ultrasound of the Scapula: Confirms abnormal scapular tracking during protraction consistent with serratus anterior dysfunction (winging).", "MRI Shoulder/Neck: No evidence of cervical root compression or mass in the supraclavicular fossa."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false, comment: "Distractor - Normal" },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false, comment: "Distractor - Normal" },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false, comment: "Distractor - Normal" },
                { name: "Lat Antebrach Cutaneous", peak: 2.8, amp: 20, velocity: 62, abnormal: false, comment: "Spared (rules out Upper Trunk)" }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "Serratus Anterior", nerve: "Long Thoracic", root: "C5-C6-C7", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Rhomboids", nerve: "Dorsal Scapular", root: "C4-C5", abnormal: false, comment: "Spared (rules out very proximal root lesion)" },
            { muscle: "Trapezius", nerve: "Spinal Accessory", root: "CN XI", abnormal: false, comment: "Spared (rules out CN XI lesion)" },
            { muscle: "Deltoid", nerve: "Axillary", root: "C5-C6", abnormal: false },
            { muscle: "Infraspinatus", nerve: "Suprascapular", root: "C5-C6", abnormal: false },
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "C5-C7 Paraspinals", abnormal: false }
        ],
        teachingPoints: [
            "Medial scapular winging (scapula moves up and in) is diagnostic of Serratus Anterior weakness (Long Thoracic nerve).",
            "Differentiate from lateral winging (scapula moves down and out), which is due to Trapezius weakness (Spinal Accessory nerve).",
            "The Long Thoracic nerve is vulnerable to repetitive overhead sports (swimming, tennis) and surgical trauma (axillary node dissection).",
            "This is a pure motor neuropathy; any sensory loss in the arm should point towards a plexus or root lesion."
        ]
    },

    musculocutaneous: {
        title: "Weakness after a Biceps Tear?",
        difficulty: "intermediate",
        presentation: {
            age: 32,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "Weakness bending the elbow and numbness in the outer forearm.",
            history: "Felt a 'pop' in his arm while lifting a heavy crate 2 weeks ago. Initially thought he tore his biceps tendon, but the bruising is mild and the muscle doesn't look 'bunched up'. Since then, he has noticed difficulty lifting tools and numbness on the thumb side of his forearm.",
            pmh: "None",
            medications: "Over-the-counter Ibuprofen"
        },
        physicalExam: {
            inspection: "Very mild swelling in the antecubital fossa. No 'Popeye' deformity.",
            palpation: "Biceps tendon is intact but tender.",
            rom: "Full passive ROM. Active elbow flexion is weak (3/5).",
            strength: "Right Elbow Flexion (Biceps/Brachialis) 3/5. Supination (Biceps) 3/5. Shoulder Abduction 5/5. Triceps 5/5. Hand intrinsics 5/5.",
            sensation: "Decreased sensation over the lateral aspect of the forearm (LABC distribution). Normal sensation in the hand and upper arm.",
            reflexes: "Right Biceps reflex 0. Triceps and Brachioradialis reflexes 2+.",
            specialTests: "Negative O'Brien's test. Negative Spurling's."
        },
        differentialDiagnosis: [
            { name: "Musculocutaneous Neuropathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "C5 Radiculopathy", ruleOut: "Radiculopathy would typically involve the Deltoid and Supraspinatus, and often causes neck pain. This patient has a normal deltoid and no neck pain." },
            { name: "Upper Trunk Brachial Plexopathy", ruleOut: "Would involve the Axillary and Suprascapular nerves (Deltoid/Infraspinatus weakness) in addition to the musculocutaneous findings." },
            { name: "Distal Biceps Tendon Rupture", ruleOut: "While it causes weakness, it would NOT cause sensory loss in the lateral forearm or neurogenic EMG findings." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To differentiate from tendon rupture or radiculopathy)",
        correctDiagnosis: "Musculocutaneous Neuropathy",
        explanation: "Isolated musculocutaneous injury localizing to the biceps and brachialis. The hallmark is **weak elbow flexion/supination**, **loss of the biceps reflex**, and **numbness in the LABC distribution** with **sparing of the deltoid (axillary)**. This localizes the lesion distal to the upper trunk and roots.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Elbow flexion weakness.",
            neurological: "Lateral forearm numbness."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["Ultrasound Elbow: Biceps tendon intact. Mild edema around the musculocutaneous nerve as it exits the coracobrachialis."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 48, velocity: 58, abnormal: false, comment: "Distractor - Normal" },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false, comment: "Distractor - Normal" },
                { name: "Lat Antebrach Cutaneous", peak: "Absent", amp: "Absent", velocity: "N/A", abnormal: true, comment: "Localizes the lesion to the musculocutaneous nerve or upper trunk" }
            ],
            motor: [
                { name: "Musculocutaneous Motor (Biceps)", latency: 8.2, amp: 0.8, velocity: "N/A", abnormal: true, comment: "Low amplitude and prolonged latency" },
                { name: "Median Motor (APB)", latency: 3.8, amp: 14.2, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 15.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "Biceps Brachii", nerve: "Musculocutaneous", root: "C5-C6", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Brachialis", nerve: "Musculocutaneous", root: "C5-C6", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Coracobrachialis", nerve: "Musculocutaneous", root: "C6-C7", abnormal: false, comment: "Spared (often innervated proximally or within the muscle)" },
            { muscle: "Deltoid", nerve: "Axillary", root: "C5-C6", abnormal: false, comment: "Spared (localizes distal to the trunk)" },
            { muscle: "Infraspinatus", nerve: "Suprascapular", root: "C5-C6", abnormal: false, comment: "Spared" },
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "C5-C6 Paraspinals", abnormal: false }
        ],
        teachingPoints: [
            "The musculocutaneous nerve arises from the lateral cord and penetrates the coracobrachialis muscle.",
            "It provides motor innervation to the Coracobrachialis, Biceps, and Brachialis.",
            "Its terminal sensory branch is the Lateral Antebrachial Cutaneous (LABC) nerve.",
            "Isolated injury is rare but can occur with heavy lifting, shoulder dislocations, or surgical positioning."
        ]
    },

    parsonage: {
        title: "Extreme Shoulder Pain Followed by Weakness",
        difficulty: "difficult",
        presentation: {
            age: 35,
            gender: "Male",
            occupation: "Painter",
            chiefComplaint: "Severe right shoulder pain for 1 week, followed by weakness in the arm",
            history: "Developed deep, agonizing pain in the right shoulder and upper arm that kept him awake at night. Pain subsided after 10 days, but he noticed he couldn't lift his arm or flex his elbow properly. No recent trauma. Had a viral illness 3 weeks ago.",
            pmh: "None",
            medications: "NSAIDs"
        },
        physicalExam: {
            inspection: "Rapid onset of atrophy in the right deltoid and supraspinatus muscles.",
            palpation: "Mild residual tenderness in the axilla.",
            rom: "Limited active abduction and elbow flexion due to weakness.",
            strength: "Right Shoulder Abduction (Deltoid) 2/5, External Rotation (Infraspinatus) 2/5, Elbow Flexion (Biceps) 3/5. Hand strength 5/5.",
            sensation: "Patchy numbness over the lateral shoulder (axillary nerve patch).",
            reflexes: "Right Biceps reflex 1+. Right Triceps reflex 2+. Left reflexes 2+ throughout.",
            specialTests: "Negative Spurling's maneuver."
        },
        differentialDiagnosis: [
            { name: "Parsonage-Turner Syndrome (Neuralgic Amyotrophy)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "C5-C6 Radiculopathy", ruleOut: "Radiculopathy would involve the paraspinal muscles and usually cause neck pain. Patchy involvement of the axillary, suprascapular, and musculocutaneous nerves without paraspinal denervation points to a post-ganglionic lesion." },
            { name: "Brachial Plexopathy (Upper Trunk)", ruleOut: "A trunk lesion would involve all muscles in that division; PTS is characterized by 'patchy' involvement of individual nerves often from different trunks/cords." },
            { name: "Rotator Cuff Tear", ruleOut: "While causing pain and limited ROM, a tear would not explain the multi-focal weakness, muscle atrophy, or the neurogenic findings on EMG." },
            { name: "Mononeuritis Multiplex", ruleOut: "Usually associated with vasculitis and more systemic symptoms; PTS is more likely given the preceding viral illness and focal shoulder girdle predilection." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Look for patchy denervation)",
        correctDiagnosis: "Parsonage-Turner Syndrome",
        explanation: "Neuralgic Amyotrophy (PTS) typically presents with a 'pain-weakness sequence': severe, deep-seated shoulder pain that lasts days to weeks, followed by patchy weakness and atrophy in the shoulder girdle. EMG confirms multifocal, patchy denervation (Fibs/PSWs) and normal paraspinals, localizing the lesion as post-ganglionic.",
        reviewOfSystems: {
            constitutional: "Fever and malaise 3 weeks ago (viral prodrome). No weight loss.",
            musculoskeletal: "Deep, agonizing right shoulder pain, now mostly resolved. Weakness in lifting the arm.",
            neurological: "Weakness and muscle wasting in the shoulder. Numbness over the lateral deltoid.",
            skin: "No rashes noted (rules out Herpes Zoster)."
        },
        humoralData: {
            labs: ["Sedimentation Rate (ESR): 25 mm/hr (Mildly Elevated)", "CRP: 1.2 mg/dL (Normal)", "HIV/Hepatitis Panel: Negative"],
            imaging: ["MRI Brachial Plexus: T2/STIR hyperintensity and swelling in the upper trunk and individual nerves (Suprascapular, Axillary), consistent with an inflammatory plexitis.", "MRI Cervical Spine: Normal; no root compression."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Lat Antebrach Cutaneous", peak: 3.2, amp: 5.0, velocity: 52, abnormal: true }
            ],
            motor: [
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
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Deltoid", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Infraspinatus", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Biceps", nerve: "Musculocutaneous", root: "C5-C6", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "C5-C6 Paraspinals", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Parsonage-Turner Syndrome (Neuralgic Amyotrophy) is an idiopathic inflammatory plexitis/neuropathy.",
            "The hallmark is 'patchy' involvement of the brachial plexus, often affecting individual nerves (Long thoracic, Axillary, Suprascapular) rather than traditional trunks or cords.",
            "Normal Cervical Paraspinal EMG identifies the lesion as post-ganglionic (at the plexus or nerve level), ruling out radiculopathy."
        ]
    }
};
