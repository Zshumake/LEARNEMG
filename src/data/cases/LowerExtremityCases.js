export const lowerExtremityCases = {
    'footdrop': {
        title: "Foot Drop/Dorsiflexor Weakness",
        difficulty: "beginner",
        presentation: {
            age: 28,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "3-week history of right foot drop after prolonged squatting",
            history: "Construction worker who spent several hours in deep squatting position while laying tile. Next day noticed difficulty lifting right foot and tripping while walking. No back pain or other neurological symptoms. Feels numbness on top of foot.",
            pmh: "No significant past medical history",
            medications: "None"
        },
        physicalExam: {
            inspection: "Right foot drop with steppage gait. No muscle atrophy visible.",
            palpation: "Mild tenderness over fibular head. No swelling or masses.",
            rom: "Absent dorsiflexion, limited active eversion. Normal plantarflexion and inversion.",
            strength: "Dorsiflexors 0/5, EHL 1/5, evertors 2/5. Normal plantarflexors and invertors.",
            sensation: "Decreased sensation in first web space and dorsal foot",
            reflexes: "Normal Achilles and patellar reflexes bilaterally",
            specialTests: "Positive Tinel's sign over fibular head"
        },
        differentialDiagnosis: [
            { name: "Common fibular nerve palsy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "L5 radiculopathy", ruleOut: "Inversion (Tibialis Posterior) is spared here, and paraspinals are normal; L5 radiculopathy would affect both eversion and inversion." },
            { name: "Sciatic neuropathy", ruleOut: "Would typically involve the Tibial nerve (weakness in plantarflexion and inversion, loss of Achilles reflex)." },
            { name: "Peripheral neuropathy", ruleOut: "Symptoms are acute and strictly unilateral; no glove-stocking distribution." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right Common Fibular Nerve Palsy at Fibular Head",
        explanation: "Classic compression neuropathy at the fibular head causing foot drop (Deep Peroneal) and eversion weakness (Superficial Peroneal) with sparing of Tibial-innervated muscles.",
        reviewOfSystems: {
            constitutional: "Normal weight. No fever.",
            musculoskeletal: "No back pain or radiating leg pain.",
            neurological: "Right foot drop. Numbness on dorsum of foot. No bowel/bladder changes.",
            skin: "No rashes or shingles history."
        },
        humoralData: {
            labs: ["HbA1c: 5.6% (Normal)", "ESR/CRP: Normal"],
            imaging: ["Lumbar Spine MRI: Mild degenerative changes, no significant root compression or foraminal narrowing."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 15, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 4.0, velocity: 48, abnormal: true }
            ],
            motor: [
                { name: "Fibular Motor (EDB) - Ank", latency: 4.2, amp: 1.5, velocity: 48, abnormal: true },
                { name: "Fibular Motor (EDB) - BFH", latency: 10.2, amp: 1.4, velocity: 45, abnormal: true },
                { name: "Fibular Motor (EDB) - AFH", latency: 13.8, amp: 0.4, velocity: 28, abnormal: true },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: true, fibs: "3+", recruitment: "Severely reduced", motorUnits: "Single large unit" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: true, fibs: "2+", recruitment: "No voluntary activity", motorUnits: "None" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Fibularis Longus", nerve: "Superficial peroneal", root: "L5-S1-S2", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Polyphasic units" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L3-L4", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Tibialis Posterior", nerve: "Tibial", root: "L4-L5", abnormal: false },
            { muscle: "Short Head Biceps Femoris", nerve: "Common Fibular", root: "L5-S1", abnormal: false, comment: "Spared (Critical: confirms lesion is at or distal to fibular head)" },
            { muscle: "Lumbar Paraspinals (L5)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Common fibular nerve palsy typically causes foot drop (weak dorsiflexion and eversion) and sensory loss in the first web space and dorsal foot.",
            "The lesion is most commonly at the fibular head due to compression.",
            "Preserved ankle inversion (Tibialis Posterior, Tibial nerve) helps distinguish from L5 radiculopathy.",
            "NCS will show conduction block or amplitude reduction across the fibular head."
        ]
    },

    tarsal: {
        title: "Foot Numbness and Burning Pain",
        difficulty: "intermediate",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Nurse",
            chiefComplaint: "8-month history of burning pain and numbness in the sole of the foot",
            history: "Symptoms worse at night and after prolonged standing (8-12 hour shifts). Some relief with elevation. No back pain. History of ankle sprain 1 year ago.",
            pmh: "None",
            medications: "Ibuprofen"
        },
        physicalExam: {
            inspection: "Normal bulk. Mild swelling posterior to medial malleolus.",
            palpation: "Tenderness over the tarsal tunnel.",
            rom: "Full ROM at ankle.",
            strength: "Abductor hallucis 4/5. Other foot muscles 5/5.",
            sensation: "Decreased sensation in medial and lateral plantar distributions. Sural distribution (lateral foot) is spared.",
            reflexes: "Achilles and Patellar reflexes 2+ and symmetric.",
            specialTests: "Positive Tinel's sign posterior to medial malleolus."
        },
        differentialDiagnosis: [
            { name: "Tarsal Tunnel Syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "S1 Radiculopathy", ruleOut: "S1 radiculopathy would typically cause an absent Achilles reflex and denervation in proximal S1 muscles (Gastrocnemius, Gluteus Maximus); here both are normal." },
            { name: "Plantar Fasciitis", ruleOut: "Primarily a pain syndrome at the calcaneal insertion; would not cause the significant intrinsic muscle denervation and plantar NCS abnormalities seen here." },
            { name: "Diabetic Polyneuropathy", ruleOut: "Usually presents with symmetric 'stocking-glove' distribution and abnormal Sural SNAPs; here findings are focal and the Sural is normal." },
            { name: "Sciatic Neuropathy", ruleOut: "Sciatic lesions would involve the peroneal division (TA, EHL) and the Sural SNAP; here those are entirely spared." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Tarsal Tunnel Syndrome",
        explanation: "Focal entrapment of the posterior tibial nerve at the flexor retinaculum. Diagnosis is confirmed by the specific involvement of the medial and lateral plantar nerves (both sensory and motor) with sparing of proximal tibial muscles (Gastrocnemius), normal Achilles reflexes, and normal Sural SNAPs.",
        reviewOfSystems: {
            constitutional: "No weight loss or fever.",
            musculoskeletal: "Burning pain in the sole of the right foot. No back or hip pain.",
            neurological: "Numbness on the bottom of the foot. Normal strength in the calf and thigh. Normal bowel and bladder function."
        },
        humoralData: {
            labs: ["Vitamin B12: 512 pg/mL (Normal)", "HbA1c: 5.6% (Normal)"],
            imaging: ["MRI Right Ankle: Thickened flexor retinaculum with mild tenosynovitis of the posterior tibial tendon; no space-occupying lesion or ganglion cyst noted."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.5, amp: 18, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false },
                { name: "Medial Plantar Sensory", peak: 4.2, amp: 8.0, velocity: 32, abnormal: true },
                { name: "Lateral Plantar Sensory", peak: 4.5, amp: 6.0, velocity: 30, abnormal: true }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.1, amp: 6.0, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 6.2, amp: 3.5, velocity: 42, abnormal: true }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Abductor Hallucis", nerve: "Medial plantar", root: "S1-S2", abnormal: true, fibs: "1+", recruitment: "Reduced", motorUnits: "Polyphasic units" },
            { muscle: "Abductor Digiti Quinti (Foot)", nerve: "Lateral plantar", root: "S1-S2", abnormal: true, fibs: "1+", recruitment: "Reduced", motorUnits: "Polyphasic units" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L3-L4", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false },
            { muscle: "Gluteus Maximus", nerve: "Inferior gluteal", root: "L5-S1-S2", abnormal: false },
            { muscle: "Lumbar Paraspinals (S1)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Tarsal Tunnel Syndrome (TTS) involves compression of the posterior tibial nerve behind the medial malleolus.",
            "Normal Sural and Superficial Fibular SNAPs help rule out more proximal lesions (Sciatic/Plexus) or generalized polyneuropathy.",
            "Specialized plantar nerve studies (Mixed or Sensory) are necessary for diagnosis as standard Tibial motor studies may be normal early on."
        ]
    },

    // S1 Radiculopathy - Different Root Level with H-reflex,

    deep_peroneal_ankle: {
        title: "Top of Foot Numbness and EDB Atrophy",
        difficulty: "difficult",
        presentation: {
            age: 38,
            gender: "Male",
            occupation: "Soccer Player",
            chiefComplaint: "Pain and numbness on the top of the right foot, especially when wearing tight cleats.",
            history: "Professional soccer player who noticed aching pain in the dorsal ankle and numbness in the first webspace (between big toe and second toe) after wearing new, tight cleats. Pain is worse with ankle dorsiflexion and at night. No leg weakness. No back pain.",
            pmh: "History of ankle sprains",
            medications: "None"
        },
        physicalExam: {
            inspection: "Atrophy of the **Extensor Digitorum Brevis (EDB)** muscle belly on the lateral top of the foot.",
            palpation: "Tenderness over the anterior ankle, just deep to the extensor retinaculum. No tenderness at the fibular head.",
            rom: "Full ROM of the ankle and toes.",
            strength: "5/5 Strength in Tibialis Anterior, EHL, and Peroneals. Unable to specifically test EDB strength effectively, but atrophy is noted.",
            sensation: "Decreased sensation strictly localized to the **first dorsal webspace**. Normal sensation on the lateral and medial foot.",
            reflexes: "Symmetric 2+ (Patellar, Achilles).",
            specialTests: "Positive Tinel's sign over the deep peroneal nerve at the anterior ankle (extensor retinaculum)."
        },
        differentialDiagnosis: [
            { name: "Anterior Tarsal Tunnel Syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Common Peroneal Neuropathy (Fibular Head)", ruleOut: "A lesion at the fibular head would cause weakness in the TA and EHL (foot drop) and sensory loss across the entire dorsal foot; here, TA/EHL are normal and sensory loss is restricted to the first webspace." },
            { name: "L5 Radiculopathy", ruleOut: "Radiculopathy would cause weakness in TA/EHL and hip abductors, and would usually spare the EDB amplitude on NCS (pre-ganglionic). This case is strictly distal." },
            { name: "First Webspace Neuroma", ruleOut: "Would cause localized digital pain but would NOT cause EDB atrophy or an abnormal EDB motor study." },
            { name: "Sural Neuropathy", ruleOut: "Involves the lateral foot sensation; this case is first webspace (Deep Peroneal territory)." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To confirm EDB involvement and spare TA/EHL)",
        correctDiagnosis: "Anterior Tarsal Tunnel Syndrome",
        explanation: "Compression of the deep peroneal nerve under the extensor retinaculum. This localizes distal to the branches to the TA and EHL. The hallmark is **isolated EDB atrophy/denervation** and **first webspace sensory loss** with **sparing of the proximal deep peroneal muscles (TA/EHL)**.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Dorsal foot pain.",
            neurological: "First webspace numbness. **No Foot Drop**."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["Ultrasound Ankle: Flattening of the deep peroneal nerve beneath the extensor retinaculum; associated with a small ganglion cyst."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 18, velocity: 45, abnormal: false, comment: "Distractor - Normal" },
                { name: "Fibular Sensory", peak: 3.1, amp: 15, velocity: 52, abnormal: false, comment: "Distractor - Normal" },
                { name: "Deep Peroneal Sensory", peak: 4.8, amp: 2.0, velocity: 30, abnormal: true, comment: "Confirms isolated first webspace involvement" }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 8.2, amp: 1.0, velocity: 45, abnormal: true, comment: "Prolonged distal latency localizes to the ankle" },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 48, abnormal: false }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Extensor Digitorum Brevis (EDB)", nerve: "Deep Peroneal", root: "L5-S1", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Tibialis Anterior", nerve: "Deep Peroneal", root: "L4-L5", abnormal: false, comment: "Spared (proximal to ankle)" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep Peroneal", root: "L5", abnormal: false, comment: "Spared" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: false },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false, comment: "Distractor" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false, comment: "Distractor" },
            { muscle: "Lumbar Paraspinals (L5)", abnormal: false }
        ],
        teachingPoints: [
            "Anterior Tarsal Tunnel Syndrome is an entrapment of the deep peroneal nerve at the ankle.",
            "Localization Pearl: Isolated **EDB denervation** with **Normal TA/EHL** and **Normal Superficial Fibular SNAP**.",
            "Commonly caused by tight-fitting footwear ('Cleat Palsy'), ankle trauma, or ganglion cysts.",
            "Sensory loss is restricted to the **first dorsal webspace** (between the 1st and 2nd toes)."
        ]
    },

    femoral: {
        title: "Buckling Knee and Thigh Numbness",
        difficulty: "intermediate",
        presentation: {
            age: 42,
            gender: "Male",
            occupation: "Sales",
            chiefComplaint: "Sudden onset of right knee 'buckling' and numbness in the front of the thigh",
            history: "Symptoms started after a long abdominal surgery (inguinal hernia repair). Noticed difficulty going down stairs as the knee gives way. Numbness on the anterior thigh and medial lower leg.",
            pmh: "Obesity, Type 2 Diabetes",
            medications: "Metformin"
        },
        physicalExam: {
            inspection: "Mild atrophy of the right quadriceps muscle.",
            palpation: "No focal tenderness.",
            rom: "Normal.",
            strength: "Right Knee Extension (Quad) 3/5. Hip Flexion (Psoas) 4/5. **Hip Adduction (Adductors) 5/5**.",
            sensation: "Decreased sensation over anterior thigh and medial leg (Saphenous distribution).",
            reflexes: "Right Patellar reflex 0 or 1+. Left Patellar reflex 2+. Achilles reflexes 2+ bilaterally.",
            specialTests: "Negative straight leg raise."
        },
        differentialDiagnosis: [
            { name: "Femoral Neuropathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "L3-L4 Radiculopathy", ruleOut: "A radiculopathy would involve the hip adductors (Obturator nerve, L2-L4) and the lumbar paraspinal muscles; here adductor strength and paraspinal EMG are normal." },
            { name: "Lumbosacral Plexopathy (Upper Trunk)", ruleOut: "Plexopathy would typically involve the obturator and lateral femoral cutaneous nerves in addition to the femoral, leading to adductor weakness and wider sensory loss." },
            { name: "Meralgia Paresthetica", ruleOut: "Involves only the Lateral Femoral Cutaneous nerve; causes sensory loss on the lateral thigh but NO muscle weakness or reflex changes." },
            { name: "Diabetic Amyotrophy", ruleOut: "Usually presents with severe pain followed by multi-level proximal weakness (often bilateral or spreading); it is a plexo-radiculopathy and would not be as focal as this post-surgical presentation." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Femoral Neuropathy",
        explanation: "Focal femoral neuropathy localizing distal to the plexus. The preservation of hip adduction (Obturator nerve) and normal lumbar paraspinals, combined with weakness in knee extension and an absent patellar reflex, confirms the lesion is isolated to the femoral nerve—likely due to compression or stretch during the recent abdominal surgery.",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "Right knee 'buckling' and thigh pain. No lower back pain.",
            neurological: "Numbness on the front of the right thigh and the inner side of the lower leg. Difficulty climbing and descending stairs.",
            endocrine: "Type 2 Diabetes (on Metformin)."
        },
        humoralData: {
            labs: ["HbA1c: 7.2% (Mildly elevated)", "Vitamin B12: 450 pg/mL (Normal)"],
            imaging: ["MRI Pelvis: Small hematoma noted in the right iliacus muscle near the inguinal ligament, consistent with mild compression of the femoral nerve post-surgery.", "MRI Lumbar Spine: No significant canal or foraminal stenosis at the L2-L4 levels."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.4, amp: 18, velocity: 46, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false },
                { name: "Saphenous Sensory", peak: "Absent", amp: 0, velocity: 0, abnormal: true }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.5, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false },
                { name: "Femoral Motor (Quad)", latency: 7.8, amp: 1.2, velocity: "N/A", abnormal: true }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Polyphasic units" },
            { muscle: "Adductor Longus", nerve: "Obturator", root: "L2-L4", abnormal: false },
            { muscle: "Iliopsoas", nerve: "Femoral/L1-L2", root: "L1-L3", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Lumbar Paraspinals (L3-L4)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Femoral neuropathy is often distinguished from L3-L4 radiculopathy by testing the Hip Adductors (Obturator nerve, same roots).",
            "An abnormal Saphenous SNAP localizes the lesion as post-ganglionic (at the nerve or plexus level), whereas a radiculopathy would typically spare the SNAP.",
            "Iatrogenic femoral nerve injury can occur during pelvic or inguinal surgeries due to compression or retractors."
        ]
    },

    obturator: {
        title: "Groin Pain and Inner Thigh Weakness",
        difficulty: "difficult",
        presentation: {
            age: 44,
            gender: "Female",
            occupation: "Competitive Runner",
            chiefComplaint: "Pain in the groin and weakness in the right inner thigh.",
            history: "Develop deep groin pain after a marathon. Initially treated as an 'adductor strain', but weakness worsened. Noticed difficulty keeping her legs together and stability issues while running. Occasional numbness on the medial mid-thigh. No back pain.",
            pmh: "None",
            medications: "NSAIDs"
        },
        physicalExam: {
            inspection: "Normal bulk (it's hard to see adductor atrophy).",
            palpation: "Deep tenderness in the medial thigh/obturator canal area.",
            rom: "Full ROM of the hip.",
            strength: "Right Hip Adduction 3/5. Hip Flexion 5/5. Knee Extension (Quad) 5/5. Ankle muscles 5/5.",
            sensation: "Decreased sensation in a small area on the medial mid-thigh. Normal sensation on the anterior thigh (femoral) and lateral thigh (LFCN).",
            reflexes: "Symmetric 2+ (Patellar, Achilles). Adductor reflex (if tested) is diminished on the right.",
            specialTests: "Pain with resisted hip adduction."
        },
        differentialDiagnosis: [
            { name: "Obturator Neuropathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Adductor Strain", ruleOut: "A pure muscle strain would cause pain but NOT cutaneous sensory loss or neurogenic EMG findings (fibs/PSWs)." },
            { name: "L2-L4 Radiculopathy", ruleOut: "Radiculopathy would involve the quadriceps (femoral) and hip flexors (psoas), and often presents with back pain and paraspinal involvement. Here, quads and psoas are 5/5." },
            { name: "Femoral Neuropathy", ruleOut: "Involves the anterior thigh and quadriceps; here, the weakness is strictly in the adductors." },
            { name: "Osteitis Pubis", ruleOut: "Causes midline groin pain and tenderness over the pubic symphysis, but lacks the focal adductor weakness and sensory findings." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To differentiate from radiculopathy and muscle strain)",
        correctDiagnosis: "Obturator Neuropathy",
        explanation: "Isolated obturator neuropathy localizing to the adductor group. Localization is confirmed by **isolated weakness of hip adduction**, **medial thigh sensory loss**, and **sparing of the quadriceps/psoas (femoral)** and lumbar paraspinals. EMG shows denervation in the adductor longus/brevis while femoral-innervated muscles remain normal.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Groin pain and inner thigh weakness.",
            neurological: "Medial thigh numbness. No leg drop."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["MRI Pelvis: Edema and focal compression of the obturator nerve within the obturator canal; potentially related to a small pelvic lymph node or muscular hypertrophy."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 18, velocity: 45, abnormal: false, comment: "Distractor - Normal" },
                { name: "Fibular Sensory", peak: 3.2, amp: 15, velocity: 50, abnormal: false, comment: "Distractor - Normal" },
                { name: "Medial Thigh (Obturator)", peak: "Absent", amp: "Absent", velocity: "N/A", abnormal: true, comment: "Confirms sensory involvement" }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.5, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false },
                { name: "Obturator Motor (Adductor)", latency: 8.5, amp: 1.2, velocity: "N/A", abnormal: true, comment: "Low amplitude CMAP" }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Adductor Longus", nerve: "Obturator", root: "L2-L4", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Adductor Magnus", nerve: "Obturator/Sciatic", root: "L2-S1", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Gracilis", nerve: "Obturator", root: "L2-L3", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false, comment: "Spared (rules out radiculopathy/plexopathy)" },
            { muscle: "Iliopsoas", nerve: "Femoral", root: "L2-L3", abnormal: false, comment: "Spared" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: false, comment: "Distractor" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false, comment: "Distractor" },
            { muscle: "Lumbar Paraspinals (L2-L3)", abnormal: false }
        ],
        teachingPoints: [
            "The obturator nerve provides motor innervation to the adductor longus, brevis, magnus, and gracilis.",
            "It provides sensory innervation to a small area on the medial mid-thigh.",
            "Localization Pearl: Isolated adductor weakness with **Normal Quadriceps** and **Normal Patellar Reflex** is the clinical hallmark.",
            "Common causes include pelvic surgery, pregnancy (compression by fetal head), or obturator hernias."
        ]
    },

    piriformis: {
        title: "Deep Buttock Pain and Hip Weakness",
        difficulty: "difficult",
        presentation: {
            age: 41,
            gender: "Female",
            occupation: "Office Manager",
            chiefComplaint: "Aching pain in the right buttock that radiates down the back of the leg.",
            history: "Symptoms began after starting a new exercise program involving heavy lunges. Pain is localized deep in the buttock and travels to the mid-calf. Worse with prolonged sitting and climbing stairs. Some numbness in the lateral foot. No back pain. No history of trauma.",
            pmh: "None",
            medications: "Acetaminophen"
        },
        physicalExam: {
            inspection: "Normal bulk. No visible asymmetry in the gluteal region.",
            palpation: "Deep tenderness to palpation in the right sciatic notch. No lumbar paraspinal tenderness.",
            rom: "Full hip ROM. Pain with internal rotation and adduction (FAIR test position).",
            strength: "5/5 strength in the Gluteus Maximus (Hip extension). 4+/5 weakness in the hamstrings and ankle muscles (TA, EHL, Gastroc) on the right. Right ankle eversion is 4/5.",
            sensation: "Decreased sensation in the S1 distribution (lateral foot) and L5 distribution (dorsal foot).",
            reflexes: "Right Achilles reflex 1+. Left Achilles reflex 2+. Patellar reflexes 2+ bilaterally.",
            specialTests: "Positive FAIR test (Flexion, Adduction, Internal Rotation). Negative straight leg raise for back pain, but reproduces buttock pain."
        },
        differentialDiagnosis: [
            { name: "Piriformis Syndrome", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "S1 Radiculopathy (L5-S1 disc)", ruleOut: "A radiculopathy would involve the S1 paraspinals and typically involves the Gluteus Maximus (Inferior Gluteal nerve, L5-S1-S2). Here, the gluteus maximus is spared and paraspinals are normal." },
            { name: "Sciatic Neuropathy (at the Notch)", ruleOut: "Piriformis syndrome is a subset of sciatic neuropathy. Key localization is the exclusion of muscles innervated proximal to the piriformis (e.g., gluteals)." },
            { name: "Trochanteric Bursitis", ruleOut: "Causes lateral hip pain over the greater trochanter, but not radiating neurological symptoms or weak ankle reflection." },
            { name: "Sacroiliac Joint Dysfunction", ruleOut: "Primarily causes SI joint pain; lacks the distal neurological deficits and denervation seen on EMG." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To rule out radiculopathy/plexopathy)",
        correctDiagnosis: "Piriformis Syndrome / Sciatic Neuropathy at the Notch",
        explanation: "Compression of the sciatic nerve as it passes through or under the piriformis muscle. Diagnosis is confirmed by **weakness in the sciatic distribution** (leg/foot) with **sparing of the proximal gluteal muscles** and **normal lumbar paraspinals**. The H-reflex may be delayed, especially in positions of piriformis tension (FAIR test).",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Buttock and leg pain.",
            neurological: "Radiating leg pain. No bowel/bladder changes."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["MRI Pelvis: Small area of edema in the right piriformis muscle; the sciatic nerve appears mildly hyperintense at the level of the sciatic notch."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 4.5, amp: 8.0, velocity: 38, abnormal: true, comment: "Relatively low amplitude suggests post-ganglionic lesion" },
                { name: "Fibular Sensory", peak: 3.8, amp: 10.0, velocity: 42, abnormal: true },
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false, comment: "Distractor - Normal" }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 52, abnormal: false, comment: "Distractor - Normal" },
                { name: "Fibular Motor (EDB)", latency: 5.2, amp: 3.5, velocity: 40, abnormal: true },
                { name: "Tibial Motor (AH)", latency: 4.8, amp: 8.5, velocity: 42, abnormal: true }
            ],
            comparison: [
                { name: "H-Reflex (Tibial)", measureA: "Right (Neutral): 32ms", measureB: "Right (FAIR): 38ms", deltaP: "Positional Delay", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: true, fibs: "1+", recruitment: "Reduced" },
            { muscle: "Gluteus Maximus", nerve: "Inferior gluteal", root: "L5-S1-S2", abnormal: false, comment: "Spared (rules out S1 root/plexus)" },
            { muscle: "Gluteus Medius", nerve: "Superior gluteal", root: "L4-L5-S1", abnormal: false, comment: "Spared (rules out L5 root/plexus)" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false, comment: "Distractor" },
            { muscle: "Lumbar Paraspinals (L5-S1)", abnormal: false, comment: "Spared (rules out radiculopathy)" }
        ],
        teachingPoints: [
            "Piriformis syndrome involves compression of the sciatic nerve at the sciatic notch, often exacerbated by hip internal rotation/adduction.",
            "Localization Pearl: **Sparing of the Gluteus Maximus** (Inferior Gluteal nerve) and **Normal Paraspinals** distinguishes this from an S1 radiculopathy.",
            "H-reflex testing in the FAIR position (Flexion, Adduction, Internal Rotation) can increase diagnostic sensitivity by physically compressing the nerve during the test.",
            "Normal Sural SNAP would be expected in radiculopathy; in piriformis syndrome (post-ganglionic), it is often abnormal."
        ]
    },

    baxters: {
        title: "Chronic Heel Pain and Medial Foot Aching",
        difficulty: "difficult",
        presentation: {
            age: 48,
            gender: "Male",
            occupation: "Long-distance Runner",
            chiefComplaint: "Chronic, deep heel pain that doesn't improve with stretching.",
            history: "Persistent pain on the medial aspect of the heel for 8 months. Initially diagnosed as plantar fasciitis, but treatments (orthotics, injections) have failed. Pain is sharp and shooting, especially during a run. No back pain. No numbness in the toes.",
            pmh: "Recurrent Plantar Fasciitis",
            medications: "NSAIDs"
        },
        physicalExam: {
            inspection: "Normal arch height. No obvious atrophy of the intrinsic foot muscles.",
            palpation: "Maximal tenderness over the medial calcaneal tuberosity and along the course of the first branch of the lateral plantar nerve. No tenderness at the Achilles insertion.",
            rom: "Full ROM of the ankle and foot.",
            strength: "5/5 strength in TA, EHL, and Gastrocnemius. Weakness in abduction of the 5th toe (ADQ) compared to the left. 5/5 hip and knee strength.",
            sensation: "Normal sensation throughout the foot, including the medial and lateral plantar distributions (this nerve is primarily motor/pain).",
            reflexes: "Symmetric 2+ (Patellar, Achilles).",
            specialTests: "Negative Windlass test. Tinel's sign present over the proximal course of the inferior calcaneal nerve."
        },
        differentialDiagnosis: [
            { name: "Baxter's Neuropathy (Inferior Calcaneal Nerve)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Plantar Fasciitis", ruleOut: "While commonly co-existing, isolated plantar fasciitis would NOT cause weakness or neurogenic EMG findings in the ADQ muscle." },
            { name: "Tarsal Tunnel Syndrome", ruleOut: "TTS would involve the entire medial or lateral plantar nerves, causing sensory loss on the sole of the foot and weakness in multiple intrinsic muscles (AH, FDB)." },
            { name: "S1 Radiculopathy", ruleOut: "Radiculopathy would involve the Gastrocnemius and potentially cause a decreased Achilles reflex. This patient has normal strength and reflexes." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To differentiate from common heel pain causes)",
        correctDiagnosis: "Baxter's Neuropathy",
        explanation: "Entrapment of the **Inferior Calcaneal Nerve** (first branch of the lateral plantar nerve) between the abductor hallucis and quadratus plantae. The hallmark is **isolated denervation of the Abductor Digiti Quinti (ADQ)** with **sparing of the Abductor Hallucis (AH)** and all other proximal muscles.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Chronic heel pain.",
            neurological: "Deep stabbing pain. No toe numbness."
        },
        humoralData: {
            labs: ["None."],
            imaging: ["MRI Foot: Edema and atrophy of the Abductor Digiti Quinti (ADQ) muscle; associated with mild plantar fasciitis."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 20, velocity: 45, abnormal: false, comment: "Distractor - Normal" },
                { name: "Fibular Sensory", peak: 3.2, amp: 15, velocity: 50, abnormal: false, comment: "Distractor - Normal" },
                { name: "Lateral Plantar Sensory", peak: 3.5, amp: 10, velocity: 42, abnormal: false, comment: "Often normal as the entrapment is motor-heavy" }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.5, velocity: 48, abnormal: false, comment: "Distractor - Normal" },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false, comment: "Spared (branch arises distal to this stim point)" },
                { name: "Tibial Motor (ADQ)", latency: 8.5, amp: 1.5, velocity: "N/A", abnormal: true, comment: "Prolonged distal latency confirming branch-specific entrapment" }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Abductor Digiti Quinti (ADQ)", nerve: "Lateral Plantar (Baxter's)", root: "S1-S2", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Abductor Hallucis (AH)", nerve: "Medial Plantar", root: "S1-S2", abnormal: false, comment: "Spared (confirms focal localization)" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Lumbar Paraspinals (L5-S1)", abnormal: false }
        ],
        teachingPoints: [
            "Baxter's Nerve is the first branch of the lateral plantar nerve; it provides motor innervation to the ADQ.",
            "Compression occurs within the deep fascia between the abductor hallucis and quadratus plantae muscles.",
            "Localization Pearl: Isolated ADQ involvement with a **Normal AH motor study** and **Normal Sural SNAP**.",
            "This is a common, often overlooked cause of chronic heel pain in athletes."
        ]
    },

    meralgia: {
        title: "The Burning Thigh",
        difficulty: "beginner",
        presentation: {
            age: 45,
            gender: "Male",
            occupation: "Police Officer",
            chiefComplaint: "Burning and numbness on the outer part of the right thigh.",
            history: "Patient wears a heavy duty belt for 10-12 hours a day. Over the last 4 months, he has developed a 'fire-like' sensation on the lateral aspect of his right mid-thigh. It is worse with standing and better with sitting. No weakness in the leg. No back pain.",
            pmh: "Obesity (BMI 33), Type 2 Diabetes",
            medications: "Metformin"
        },
        physicalExam: {
            inspection: "Normal muscle bulk in the lower extremities. No skin changes.",
            palpation: "Tapping over the lateral aspect of the inguinal ligament (near ASIS) reproduces the burning sensation (Tinel's sign).",
            rom: "Full ROM of the hip, knee, and ankle.",
            strength: "5/5 Strength throughout the right lower extremity (Iliopsoas, Quadriceps, Adductors, TA, EHL, Gastroc).",
            sensation: "Decreased sensation to light touch and pinprick in a well-circumscribed oval area on the lateral thigh. Normal sensation in the groin and medial/anterior thigh.",
            reflexes: "Symmetric 2+ (Patellar, Achilles).",
            specialTests: "Negative Reverse SLR (for femoral nerve tension). Negative SLR."
        },
        differentialDiagnosis: [
            { name: "Meralgia Paresthetica (LFCN)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "L2 or L3 Radiculopathy", ruleOut: "Radiculopathy would typically cause weakness in the hip flexors or quadriceps and potentially a decreased patellar reflex. This patient has 5/5 strength and normal reflexes." },
            { name: "Femoral Neuropathy", ruleOut: "Would cause weakness in the quadriceps and numbness on the anterior/medial thigh (not lateral thigh)." },
            { name: "Trochanteric Bursitis", ruleOut: "Causes lateral hip pain and tenderness over the greater trochanter, but not cutaneous numbness or burning in the LFCN territory." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To rule out radiculopathy/plexopathy)",
        correctDiagnosis: "Meralgia Paresthetica",
        explanation: "Compression of the **Lateral Femoral Cutaneous Nerve (LFCN)** under the inguinal ligament. This is a **purely sensory** nerve; therefore, there should be NO weakness on exam. EMG is used to confirm the absence of motor involvement (ruling out radiculopathy) while NCS may show a delayed or absent LFCN SNAP.",
        reviewOfSystems: {
            constitutional: "Negative.",
            musculoskeletal: "Lateral thigh discomfort.",
            neurological: "Pure sensory burning on the outer thigh."
        },
        humoralData: {
            labs: ["A1c: 6.8% (Stable)"],
            imaging: ["None indicated initially."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 18, velocity: 45, abnormal: false, comment: "Distractor - Normal" },
                { name: "Fibular Sensory", peak: 3.2, amp: 15, velocity: 50, abnormal: false, comment: "Distractor - Normal" },
                { name: "Lat Fem Cutaneous (LFCN)", peak: "Absent", amp: "Absent", velocity: "N/A", abnormal: true, comment: "Confirms LFCN involvement" }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.5, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 8.0, velocity: 45, abnormal: false }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false, comment: "Spared (rules out femoral/plexus/L3 root)" },
            { muscle: "Iliopsoas", nerve: "Femoral", root: "L2-L3", abnormal: false, comment: "Spared (rules out L2-L3 roots)" },
            { muscle: "Adductor Longus", nerve: "Obturator", root: "L2-L4", abnormal: false, comment: "Spared" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Lumbar Paraspinals (L2-L4)", abnormal: false }
        ],
        teachingPoints: [
            "Meralgia paresthetica is a compression of the LFCN as it passes under the inguinal ligament near the ASIS.",
            "Common risk factors include obesity, pregnancy, and wearing tight clothing or heavy belts.",
            "Localization Pearl: It is a **pure sensory nerve**. The presence of ANY motor weakness immediately rules out isolated meralgia paresthetica.",
            "NCS can be technically difficult to obtain, especially in obese patients, making clinical correlation paramount."
        ]
    },

    saphenous_isolated: {
        title: "Medial Leg Numbness Post-Surgery",
        difficulty: "intermediate",
        presentation: {
            age: 58,
            gender: "Female",
            occupation: "Retired",
            chiefComplaint: "Burning pain and numbness along the inner aspect of the right leg following knee replacement surgery",
            history: "58-year-old female who underwent an uncomplicated total knee arthroplasty (TKA) 6 weeks ago. Since the surgery, she has had persistent burning pain and numbness on the medial side of her leg, extending from the knee down towards the medial ankle. No weakness noted. No back pain.",
            pmh: "Osteoarthritis of the knees",
            medications: "Gabapentin, Acetaminophen"
        },
        physicalExam: {
            inspection: "Well-healed surgical incision on the anterior knee. No muscle atrophy in the quadriceps.",
            palpation: "Tenderness along the medial joint line and infrapatellar region.",
            rom: "Full ROM at the hip. Knee ROM 0-110 degrees, limited by post-surgical stiffness but not weakness.",
            strength: "5/5 strength in hip flexion (Iliopsoas), knee extension (Quadriceps), and hip adduction (Adductors).",
            sensation: "Decreased pinprick and light touch along the medial leg below the knee (Saphenous distribution). Sensation on the thigh and lateral leg is normal.",
            reflexes: "2+ and symmetric patellar and Achilles reflexes.",
            specialTests: "Negative straight leg raise. Negative femoral stretch test."
        },
        differentialDiagnosis: [
            { name: "Isolated Saphenous Neuropathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Femoral Neuropathy", ruleOut: "Femoral neuropathy would involve weakness in the quadriceps and a diminished patellar reflex; here both are normal." },
            { name: "L3 or L4 Radiculopathy", ruleOut: "Radiculopathy would typically involve quadriceps weakness and paraspinal denervation; also, the Saphenous SNAP would be preserved in a pre-ganglionic root lesion." },
            { name: "Infrapatellar Branch of Saphenous Injury", ruleOut: "This is a subset of saphenous injury, but here the sensory loss extends further down the medial leg, suggesting a lesion to the main saphenous trunk." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To rule out Femoral/Root)",
        correctDiagnosis: "Isolated Saphenous Neuropathy (Post-Surgical)",
        explanation: "Pure sensory neuropathy following local trauma/surgery. The diagnosis is confirmed by: 1) Abnormal Saphenous SNAP, 2) Normal Femoral motor studies, and 3) Entirely normal EMG of the L3-L4 innervated muscles (Quadriceps/Adductors), which rules out more proximal lesions.",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "Medial leg pain. No hip or back pain.",
            neurological: "Purely sensory symptoms in the medial leg. No weakness."
        },
        humoralData: {
            labs: ["None"],
            imaging: ["X-ray Right Knee: Status post TKA, components in good alignment."]
        },
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.5, amp: 18, velocity: 45, abnormal: false, comment: "Distractor - Normal" },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false, comment: "Distractor - Normal" },
                { name: "Saphenous Sensory", peak: "Absent", amp: 0, velocity: 0, abnormal: true, comment: "Key Localization - Abnormal" }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.0, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false },
                { name: "Femoral Motor (Quad)", latency: 5.2, amp: 8.5, velocity: 40, abnormal: false, comment: "Rules out Femoral nerve" }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false, comment: "Normal (Rules out Femoral/Root)" },
            { muscle: "Adductor Longus", nerve: "Obturator", root: "L2-L4", abnormal: false, comment: "Normal (Rules out Plexus/Root)" },
            { muscle: "Iliopsoas", nerve: "Femoral/L1-L2", root: "L1-L3", abnormal: false, comment: "Normal (Rules out Proximal Femoral/Root)" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5", abnormal: false },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false },
            { muscle: "Lumbar Paraspinals (L3-L4)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "The saphenous nerve is a purely sensory branch of the femoral nerve; injury causes sensory loss but NO muscle weakness.",
            "Iatrogenic injury during knee surgery (TKA, ACL repair, or saphenous vein stripping) is the most common cause.",
            "Abnormal Saphenous SNAP with normal Femoral motor study and normal needle EMG of the quadriceps localizes the lesion distal to the femoral motor branches.",
            "Normal L3-L4 paraspinals further support a peripheral rather than root-level pathology."
        ]
    }
};
