export const radiculopathyCases = {
    'c5radiculopathy': {
        title: "Shoulder Pain and Arm Weakness",
        difficulty: "beginner",
        presentation: {
            age: 41,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "3-week history of severe neck pain radiating to right shoulder and arm with weakness",
            history: "Lifting heavy materials 3 weeks ago, felt immediate sharp neck pain. Pain radiates from neck to right shoulder, lateral arm, and thumb. Weakness lifting arm overhead and external rotation. Coughing and sneezing worsen pain. No numbness in hand.",
            pmh: "Previous back injury 10 years ago",
            medications: "Ibuprofen, muscle relaxants"
        },
        physicalExam: {
            inspection: "Holding right arm in adducted position",
            palpation: "Cervical paraspinal muscle spasm, tender over C4-C5 region",
            rom: "Limited cervical extension and right lateral flexion",
            strength: "Deltoid 3/5, biceps 4/5, supraspinatus 3/5 on right. Left side normal",
            sensation: "Decreased sensation over lateral shoulder (C5 dermatome)",
            reflexes: "Biceps reflex diminished (1+) on right. Triceps and brachioradialis normal",
            specialTests: "Positive Spurling's test on right"
        },
        differentialDiagnosis: [
            { name: "C5 Radiculopathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Axillary Neuropathy", ruleOut: "Would affect deltoid but spare biceps and supraspinatus; here multiple C5 muscles from different nerves are involved." },
            { name: "Suprascapular Neuropathy", ruleOut: "Would spare the deltoid and biceps; here deltoid and biceps are clinically weak." },
            { name: "Rotator Cuff Tear", ruleOut: "Shoulder pain and weakness can mimic this, but denervation on EMG and Spurling's sign point to a neurological root cause." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C5 Radiculopathy",
        explanation: "Right C5 radiculopathy confirmed by weakness in a multi-nerve C5 distribution (Deltoid, Biceps, Supraspinatus) with associated cervical paraspinal denervation and normal SNAPs (LABC), localizing the lesion to the pre-ganglionic root level.",
        reviewOfSystems: {
            constitutional: "No fevers or weight loss.",
            musculoskeletal: "Severe right neck and shoulder pain. No joint swelling.",
            neurological: "Weakness lifting right arm. Numbness on outer shoulder. No hand weakness.",
            integumentary: "No rashes."
        },
        humoralData: {
            labs: ["TSH: 2.1 mIU/L (Normal)"],
            imaging: ["MRI Cervical Spine: Right-sided C4-C5 disc protrusion with compression of the exiting C5 nerve root. Mild facet arthropathy."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Lat Antebrach Cutaneous", peak: 2.5, amp: 15.0, velocity: 52, abnormal: false }
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
            { muscle: "Deltoid", abnormal: true, fibs: "3+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "Biceps", abnormal: true, fibs: "2+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "Supraspinatus", abnormal: true, fibs: "2+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "Cervical Paraspinals (C5)", abnormal: true, fibs: "2+" }
        ],
        teachingPoints: [
            "C5 radiculopathy is pre-ganglionic; therefore, SNAPs (like Lateral Antebrachial Cutaneous) remain normal despite sensory loss.",
            "Localization depends on finding denervation in multiple muscles from different nerves but sharing the same root.",
            "Paraspinal involvement is the 'smoking gun' for a root rather than a plexus lesion."
        ]
    },

    'c6radiculopathy': {
        title: "Neck Pain with Arm Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Office Manager",
            chiefComplaint: "6-week history of neck pain radiating to right arm with weakness",
            history: "Gradual onset neck pain after lifting heavy boxes. Pain radiates from neck down lateral arm to thumb. Weakness gripping objects and lifting arm. Numbness in thumb and index finger. Pain worse with neck extension and lateral bending to right.",
            pmh: "Cervical spondylosis noted on prior imaging",
            medications: "Ibuprofen, muscle relaxers"
        },
        physicalExam: {
            inspection: "Mild thenar atrophy on right, antalgic neck posture",
            palpation: "Cervical paraspinal muscle spasm, tender over C6 facet",
            rom: "Limited cervical extension and right lateral bending",
            strength: "Biceps 3/5, brachioradialis 3/5, wrist extensors 4/5 on right",
            sensation: "Decreased sensation in lateral forearm and thumb (C6 distribution)",
            reflexes: "Biceps reflex diminished on right (1+). Brachioradialis diminished.",
            specialTests: "Positive Spurling's sign on right, negative Hoffmann"
        },
        differentialDiagnosis: [
            { name: "Cervical radiculopathy (C6)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Carpal tunnel syndrome", ruleOut: "CTS would have an abnormal Median SNAP and spare the Biceps/Brachioradialis muscles." },
            { name: "Pronator teres syndrome", ruleOut: "Would cause weakness in Median-innervated muscles but spare the Brachioradialis and neck-related symptoms." },
            { name: "Bicipital tendinitis", ruleOut: "Purely musculoskeletal; would not cause sensory loss or denervation on EMG." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C6 Radiculopathy",
        explanation: "C6 radiculopathy characterized by neck pain radiating to the thumb, weakness in C6-innervated muscles (Biceps, Brachioradialis), and denervation in the C6 paraspinals. The preservation of the Median and Radial SNAPs confirms a pre-ganglionic lesion.",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "Right-sided neck pain and stiffness. No shoulder joint pain.",
            neurological: "Weakness in right arm. Numbness in thumb and index finger. No bowel/bladder dysfunction.",
            integumentary: "No rashes over the neck or arm."
        },
        humoralData: {
            labs: ["ESR: 12 mm/hr (Normal)", "CRP: 0.5 mg/dL (Normal)"],
            imaging: ["MRI Cervical Spine: Right-sided foraminal stenosis at C5-C6 due to a disc-osteophyte complex, compressing the exiting C6 nerve root."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 10.5, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 12.0, velocity: 62, abnormal: false }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            {
                muscle: "Cervical Paraspinals (C6)",
                nerve: "Dorsal rami",
                root: "C6",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "N/A",
                motorUnits: "N/A",
                abnormal: true
            },
            {
                muscle: "Biceps",
                nerve: "Musculocutaneous",
                root: "C5-C6-C7",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "Reduced",
                motorUnits: "Large, polyphasic units",
                abnormal: true
            },
            {
                muscle: "Brachioradialis",
                nerve: "Radial",
                root: "C5-C6-C7",
                insertionalActivity: "Increased",
                spontaneousActivity: "1+ fibrillations",
                recruitment: "Mildly reduced",
                motorUnits: "Polyphasic units",
                abnormal: true
            },
            {
                muscle: "Triceps",
                nerve: "Radial",
                root: "C6-C7-C8",
                insertionalActivity: "Normal",
                spontaneousActivity: "None",
                recruitment: "Normal",
                motorUnits: "Normal morphology",
                abnormal: false
            }
        ],
        teachingPoints: [
            "C6 radiculopathy typically affects biceps, brachioradialis, and wrist extensors, with sensory loss in the thumb and index finger.",
            "Diminished biceps and brachioradialis reflexes are characteristic.",
            "SNAPs are typically normal in radiculopathy because the lesion is proximal to the dorsal root ganglion.",
            "Paraspinal muscle denervation confirms a root lesion."
        ]
    },

    'c7radiculopathy': {
        title: "Arm Pain with Hand Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 48,
            gender: "Female",
            occupation: "Office Worker",
            chiefComplaint: "2-month history of neck pain radiating to right arm with hand weakness",
            history: "Gradual onset of neck pain that now radiates down right arm to middle finger. Weakness noticed when extending wrist and fingers. Numbness and tingling in middle finger and palm. Symptoms worse with neck movements and overhead activities.",
            pmh: "Fibromyalgia, osteoarthritis",
            medications: "Tramadol, ibuprofen"
        },
        physicalExam: {
            inspection: "No obvious muscle atrophy. Slight wrist drop tendency on right",
            palpation: "Cervical paraspinal tenderness, especially C6-C7 level",
            rom: "Limited cervical extension and right rotation",
            strength: "Right wrist extensors 3/5, finger extensors 3/5, triceps 4/5. Grip strength reduced. Left side normal",
            sensation: "Decreased sensation in C7 dermatome (middle finger, palm)",
            reflexes: "Triceps reflex diminished (1+) on right. Biceps and brachioradialis normal",
            specialTests: "Positive Spurling's test. Negative upper limb tension test"
        },
        differentialDiagnosis: [
            { name: "C7 Radiculopathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Posterior Interosseous syndrome", ruleOut: "PIN would cause wrist/finger extender weakness but would spare the Triceps and sensory branches; here both are affected." },
            { name: "Carpal Tunnel Syndrome", ruleOut: "CTS involvement is restricted to the Median nerve; here non-median muscles (Triceps, ECR) are denervated and Median SNAP is normal." },
            { name: "Radial Tunnel Syndrome", ruleOut: "Primarily a pain syndrome; would not cause the significant weakness and denervation seen here." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C7 Radiculopathy",
        explanation: "Right C7 radiculopathy characterized by neck pain radiating to the middle finger, weakness in C7-innervated muscles (Triceps, ECR, FCR), and preserved SNAPs. The involvement of both Radial and Median innervated muscles (Triceps/FCR) with paraspinal denervation confirms a root level lesion.",
        reviewOfSystems: {
            constitutional: "No weight loss or fever.",
            musculoskeletal: "Neck pain radiating down the arm. No shoulder joint instability.",
            neurological: "Weakness extending fingers and wrist. Numbness in the middle finger. Normal bowel and bladder control."
        },
        humoralData: {
            labs: ["Vitamin B12: 480 pg/mL (Normal)"],
            imaging: ["MRI Cervical Spine: Right-sided C6-C7 disc herniation compressing the exiting C7 nerve root."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Lat Antebrach Cutaneous", peak: 2.8, amp: 25, velocity: 56, abnormal: false }
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
            { muscle: "APB", nerve: "Median", root: "LMN:C8-T1, Sensory sparing:C6", abnormal: false },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, recruitment: "Reduced" },
            {
                muscle: "Triceps",
                nerve: "Radial",
                root: "C6-C7-C8",
                insertionalActivity: "Increased",
                spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                recruitment: "Severely reduced",
                motorUnits: "Large, polyphasic units",
                abnormal: true
            },
            {
                muscle: "Extensor Carpi Radialis",
                nerve: "Radial",
                root: "C5-C6-C7",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "Reduced",
                motorUnits: "Large amplitude, polyphasic potentials",
                abnormal: true
            },
            {
                muscle: "Flexor Carpi Radialis",
                nerve: "Median",
                root: "C6-C7",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations",
                recruitment: "Mildly reduced",
                motorUnits: "Polyphasic units",
                abnormal: true
            },
            {
                muscle: "Cervical Paraspinals (C7)",
                nerve: "Dorsal rami",
                root: "C7",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "N/A",
                motorUnits: "N/A",
                abnormal: true
            }
        ],
        teachingPoints: [
            "C7 is the most frequently affected cervical root, often presenting with middle finger symptoms.",
            "Distinction from CTS: Normal SNAPs and involvement of non-Median muscles like Triceps/ECR (Radial nerve).",
            "Distinction from Radial Neuropathy: Involvement of Flexor Carpi Radialis (Median nerve, C7) and paraspinal muscles."
        ]
    },

    'l5radiculopathy': {
        title: "Lower Back Pain with Leg Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 44,
            gender: "Male",
            occupation: "Warehouse Worker",
            chiefComplaint: "6-week history of lower back pain radiating to left leg with foot drop",
            history: "Lifting heavy boxes 6 weeks ago, felt immediate sharp lower back pain. Pain radiates down left leg to great toe. Developed foot drop over past 2 weeks. Numbness over dorsum of foot and great toe. Pain worse with sitting and forward flexion.",
            pmh: "Previous back strain 5 years ago",
            medications: "Naproxen, cyclobenzaprine"
        },
        physicalExam: {
            inspection: "Left foot drop evident. Steppage gait pattern",
            palpation: "Lumbar paraspinal muscle spasm, tender over L4-L5 region",
            rom: "Limited lumbar flexion due to pain",
            strength: "Left dorsiflexion 2/5, great toe extension 2/5, eversion 4/5. Hip abduction 4/5. Right side normal",
            sensation: "Decreased sensation in L5 dermatome (dorsum of foot, great toe, lateral leg)",
            reflexes: "Achilles reflexes normal and symmetric. No pathological reflexes",
            specialTests: "Positive straight leg raise at 45 degrees on left. Negative contralateral SLR"
        },
        differentialDiagnosis: [
            { name: "L5 Radiculopathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Common Peroneal Neuropathy", ruleOut: "Peroneal neuropathy at the fibular head would spare hip abduction (Gluteus Medius) and foot inversion (Tibialis Posterior); here both are affected." },
            { name: "Sciatic Neuropathy", ruleOut: "Sciatic lesions would typically involve both peroneal and tibial divisions (e.g., weak knee flexion, absent Achilles reflex); here Achilles is normal and ankle plantarflexion is preserved." },
            { name: "Lumbosacral Plexopathy", ruleOut: "Plexopathy would often involve multiple roots (L4, L5, S1) and usually shows abnormal SNAPs (e.g., Fibular sensory); here SNAPs are normal." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Left L5 Radiculopathy",
        explanation: "Acute foot drop with back pain and radiating symptoms. Localization to the L5 root is confirmed by: 1) Preserved SNAPs (pre-ganglionic), 2) Weakness and denervation in non-peroneal L5 muscles (Gluteus Medius, Tibialis Posterior), and 3) Denervation in the L5 paraspinals.",
        reviewOfSystems: {
            constitutional: "No weight loss, no recent fevers or chills.",
            musculoskeletal: "Severe lower back pain radiating down the lateral leg to the great toe. No hip or knee joint pain.",
            neurological: "Weakness lifting the foot (foot drop). Numbness on top of the foot. Normal bowel and bladder function.",
            vascular: "Distal pulses are normal and symmetric."
        },
        humoralData: {
            labs: ["Vitamin B12: 450 pg/mL (Normal)", "HbA1c: 5.4% (Normal)"],
            imaging: ["MRI Lumbar Spine: Large left-sided L4-L5 disc extrusion compressing the exiting left L5 nerve root."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 15, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.0, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor (UE) - Normal" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5", abnormal: true, fibs: "3+", recruitment: "Severely reduced", motorUnits: "Large/Poly" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5", abnormal: true, fibs: "3+", recruitment: "Severely reduced", motorUnits: "Large/Poly" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Large/Poly" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false },
            { muscle: "Tibialis Posterior", nerve: "Tibial", root: "L5-S1", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Polyphasic" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L3-L4", abnormal: false },
            { muscle: "Gluteus Medius", nerve: "Superior gluteal", root: "L4-L5-S1", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Large/Poly" },
            { muscle: "Lumbar Paraspinals (L5)", nerve: "Dorsal rami", root: "L5", abnormal: true, fibs: "2+", recruitment: "N/A", motorUnits: "N/A" }
        ],
        teachingPoints: [
            "Localization to the L5 root is confirmed by finding denervation in non-peroneal muscles (e.g., Hip Abductors like Gluteus Medius).",
            "Preganglionic lesions (radiculopathy) spare the sensory responses (Superficial Fibular/Sural) despite sensory loss on exam.",
            "The combination of foot drop and weak hip abduction is a classic 'smoking gun' for L5 radiculopathy vs peroneal neuropathy."
        ]
    },

    // Myasthenia Gravis - Neuromuscular Junction Disorder,

    s1radiculopathy: {
        title: "Lower Back Pain with Foot Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 52,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "Lower back pain radiating to posterior leg and lateral foot",
            history: "4-month history of lower back pain following heavy lifting at work. Pain radiates down posterior aspect of right leg to lateral foot. Associated numbness in lateral foot and weakness in plantarflexion (toe walking). Pain worse with sitting and forward flexion.",
            pmh: "None",
            medications: "Ibuprofen, gabapentin"
        },
        physicalExam: {
            inspection: "Normal bulk. Patient unable to perform single-leg calf raise on the right.",
            palpation: "Lumbar paraspinal tenderness.",
            rom: "Limited lumbar flexion.",
            strength: "Right plantarflexion (Gastrocnemius) 4/5. Gluteus maximus 4/5. Other muscle groups 5/5.",
            sensation: "Decreased sensation in S1 dermatome (lateral foot and small toe).",
            reflexes: "Right Achilles reflex absent/diminished (0 or 1+). Patellar reflexes 2+ bilaterally.",
            specialTests: "Positive straight leg raise at 45 degrees on right."
        },
        differentialDiagnosis: [
            { name: "S1 Radiculopathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Sciatic Neuropathy", ruleOut: "Sciatic lesions would typically involve peroneal muscles (TA, EHL) and the Sural SNAP; here those are entirely spared." },
            { name: "Piriformis Syndrome", ruleOut: "A diagnosis of exclusion; would spare the paraspinal muscles and typically spares the S1 roots' contributions to the Gluteus Maximus (inferior gluteal nerve branches proximal to the piriformis)." },
            { name: "Lumbosacral Plexopathy", ruleOut: "Plexopathy would involve multiple root levels (L5, S1, S2) and usually shows an abnormal Sural SNAP (post-ganglionic); here Sural is normal." },
            { name: "Sacroiliac Joint Dysfunction", ruleOut: "primarily a pain syndrome without the neurologic deficits (absent reflex, abnormal EMG) seen here." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right S1 Radiculopathy",
        explanation: "Right S1 radiculopathy characterized by lower back pain radiating to the lateral foot, an absent right Achilles reflex, and weak plantarflexion. The diagnosis is confirmed by 1) Preserved SNAPs (Sural), 2) H-reflex delay, and 3) Denervation in the S1 myotome muscles (Gastroc, Gluteus Maximus) and S1 paraspinals.",
        reviewOfSystems: {
            constitutional: "No weight loss or fever.",
            musculoskeletal: "Severe lower back pain radiating down the back of the leg to the lateral foot and small toe.",
            neurological: "Weakness when trying to stand on TIP-TOES. Numbness on the side of the foot. Normal bowel and bladder control."
        },
        humoralData: {
            labs: ["Vitamin B12: 480 pg/mL (Normal)", "HbA1c: 5.5% (Normal)"],
            imaging: ["MRI Lumbar Spine: Large right-sided L5-S1 disc protrusion compressing the right S1 nerve root."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 15, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.0, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 11.5, velocity: 45, abnormal: false }
            ],
            comparison: [
                { name: "H-Reflex (Tibial)", measureA: "Right Side: 35ms", measureB: "Left Side: 30ms", deltaP: "5ms Delay", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Large/Poly" },
            { muscle: "Gluteus Maximus", nerve: "Inferior gluteal", root: "L5-S1-S2", abnormal: true, fibs: "1+", recruitment: "Reduced", motorUnits: "Large/Poly" },
            { muscle: "Lumbar Paraspinals (S1)", nerve: "Dorsal rami", root: "S1", abnormal: true, fibs: "3+", recruitment: "N/A", motorUnits: "N/A" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: false },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: false },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: false },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L3-L4", abnormal: false }
        ],
        teachingPoints: [
            "S1 radiculopathy classically presents with a diminished or absent Achilles reflex (S1 arc).",
            "The H-reflex is the electrophysiological equivalent of the Achilles reflex and is a sensitive marker for S1 root dysfunction.",
            "Normal Sural SNAP in the setting of S1 sensory loss localizes the lesion as pre-ganglionic (at the root level)."
        ]
    }
};
