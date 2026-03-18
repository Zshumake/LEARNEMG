export const plexopathyCases = {
    'complex1': {
        title: "Severe Arm Weakness after Trauma",
        difficulty: "difficult",
        presentation: {
            age: 62,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "6-month history of progressive weakness and numbness affecting entire left arm following motorcycle accident",
            history: "Started with shoulder pain, progressed to weakness in all arm muscles. Numbness extends from shoulder to fingertips. Horner's syndrome present. History of high-energy trauma with clavicle fracture.",
            pmh: "Diabetes mellitus, hypertension",
            medications: "Metformin, Lisinopril"
        },
        physicalExam: {
            inspection: "Left arm appears atrophic. Ptosis and miosis on left (Horner's syndrome). Winged scapula.",
            palpation: "Supraclavicular tenderness. No masses palpable.",
            rom: "Severely limited shoulder abduction and flexion. Limited elbow flexion and extension.",
            strength: "1-2/5 proximal muscles, 2-3/5 distal muscles throughout left arm",
            sensation: "Decreased throughout C5-T1 distribution",
            reflexes: "Absent biceps, triceps, brachioradialis on left. Normal on right.",
            specialTests: "Positive Tinel's sign at Erb's point. Horner's syndrome confirmed."
        },
        differentialDiagnosis: [
            { name: "Traumatic Brachial Plexus Root Avulsions (C5-T1)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Cervical Spinal Cord Injury", ruleOut: "Would typically involve bilateral symptoms or long tract signs (legs)." },
            { name: "Multifocal Motor Neuropathy", ruleOut: "Typically asymmetric but distal-predominant and purely motor; sensory loss makes this unlikely." },
            { name: "Severe Diabetic Polyneuropathy", ruleOut: "Would be length-dependent (stocking-glove) and symmetric." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Traumatic Brachial Plexus Root Avulsions (C5-T1)",
        explanation: "Complete motor and sensory loss in C5-T1 distribution with Horner's syndrome following high-energy trauma indicates traumatic brachial plexus avulsion.",
        reviewOfSystems: {
            constitutional: "10 lb weight loss attributed to muscle atrophy. No fever.",
            musculoskeletal: "Chronic shoulder pain. Arm is 'dead weight'.",
            neurological: "Complete anesthesia of arm. Severe weakness.",
            ophthalmologic: "Drooping eyelid (left side)."
        },
        humoralData: {
            labs: ["CBC: Normal", "Creatine Kinase: Normal"],
            imaging: ["MRI Brachial Plexus: Pseudomeningoceles at C5-T1 nerve roots indicative of avulsion.", "Chest X-Ray: Healed clavicle fracture."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.2, amp: 28.0, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 22.0, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.1, amp: 25.0, velocity: 56, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: "Absent", amp: 0, velocity: 0, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: "Absent", amp: 0, velocity: 0, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "Absent", measureB: "Absent", deltaP: "N/A", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "3+", recruitment: "None" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, fibs: "3+", recruitment: "None" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, fibs: "3+", recruitment: "None" },
            { muscle: "Cervical Paraspinals", abnormal: true, fibs: "3+" }
        ],
        teachingPoints: [
            "Traumatic avulsion results in a 'pan-plexopathy' with severe multi-segmental denervation.",
            "The presence of Horner's syndrome (ptosis, miosis) suggests a T1 root avulsion (pre-ganglionic sympathetic lesion).",
            "Paraspinal denervation confirms that the lesion is at the level of the root (pre-plexus).",
            "Preserved SNAPs in an anesthetic/paralyzed limb are pathognomonic for pre-ganglionic (root-level) injury, as the lesion is proximal to the dorsal root ganglion."
        ]
    },

    'birthinjury': {
        title: "Newborn Arm Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 0.1,
            gender: "Male",
            chiefComplaint: "Right arm weakness noticed since birth following difficult delivery",
            history: "Newborn with right arm weakness after difficult delivery with shoulder dystocia. Arm hangs at side, internally rotated. No movement at shoulder or elbow. Normal hand grasp reflex present.",
            pmh: "Term delivery, shoulder dystocia, vacuum extraction",
            medications: "None"
        },
        physicalExam: {
            inspection: "Right arm hangs limply at side in 'waiter's tip' position. Internal rotation and adduction at shoulder.",
            palpation: "No masses or swelling. Supraclavicular region normal.",
            rom: "Absent shoulder abduction and external rotation. No elbow flexion. Normal wrist and finger movements.",
            strength: "0/5 deltoid, 0/5 biceps, 0/5 supraspinatus/infraspinatus. Normal triceps (5/5), normal hand intrinsics",
            sensation: "Decreased sensation over deltoid region (axillary nerve distribution)",
            reflexes: "Absent biceps reflex, absent brachioradialis reflex. Normal triceps reflex.",
            specialTests: "Absent Moro reflex on right side"
        },
        differentialDiagnosis: [
            { name: "Erb's palsy (upper trunk brachial plexus injury)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Clavicle fracture", ruleOut: "Palpation negative for deformity/crepitus; X-ray normal." },
            { name: "Shoulder dislocation", ruleOut: "Shoulder joint symmetric on palpation." },
            { name: "Spinal cord injury", ruleOut: "Unilateral upper limb weakness; lower limbs and sphincter tone normal." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Erb's Palsy (Upper Trunk Brachial Plexus Birth Injury)",
        explanation: "Classic Erb's palsy with waiter's tip position, absent shoulder abduction/external rotation, normal triceps and hand function indicating upper trunk (C5-C6) brachial plexus injury.",
        reviewOfSystems: {
            constitutional: "Healthy newborn, feeding well.",
            musculoskeletal: "Decreased movement of right arm.",
            neurological: "Alert, appropriate cry. Moves other 3 limbs normally.",
            respiratory: "No respiratory distress (phrenic nerve intact)."
        },
        humoralData: {
            imaging: ["C-Spine/Shoulder Ultrasound: No humeral fracture. Nerve root integrity visualized."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 3.8, amp: 5.0, velocity: 32, abnormal: true },
                { name: "Lat Antebrachial Cutaneous", peak: 4.2, amp: 4.5, velocity: 30, abnormal: true }
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
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Lower trunk fibers preserved" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Lower trunk fibers preserved" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Middle/Lower trunk fibers involved but often EIP is spared in upper trunk lesions" },
            { muscle: "Deltoid", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Biceps", abnormal: true, fibs: "3+", recruitment: "Reduced" },
            { muscle: "Cervical Paraspinals", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Erb's Palsy results from traction on the upper trunk (C5-C6) during delivery.",
            "Classic 'Waiter's Tip' posture: adducted, internally rotated shoulder, extended elbow.",
            "Normal hand function (Median/Ulnar nerves from lower trunks) is preserved."
        ]
    },

    'radiationplexopathy': {
        title: "Progressive Hand Weakness History of Cancer",
        difficulty: "difficult",
        presentation: {
            age: 55,
            gender: "Female",
            chiefComplaint: "Progressive hand weakness and numbness 2 years after radiation therapy for breast cancer",
            history: "55-year-old woman with history of right breast cancer treated with mastectomy and radiation therapy 2 years ago. Over the past 6 months, developed progressive weakness in right hand, especially grip strength. Numbness in ring and little fingers. No pain initially, but now has some aching discomfort.",
            pmh: "Breast cancer (T2N1M0), status post mastectomy and radiation therapy",
            medications: "Tamoxifen"
        },
        physicalExam: {
            inspection: "Mild atrophy of right hand intrinsic muscles. Radiation changes visible on right chest wall.",
            palpation: "Firm, non-tender supraclavicular area. No discrete mass.",
            rom: "Full ROM at shoulder and elbow. Mild limitation of finger extension.",
            strength: "Normal proximal strength. Weakness in grip (4/5), finger abduction/adduction (3/5)",
            sensation: "Decreased sensation in ulnar distribution (digits 4-5) extending to medial forearm",
            reflexes: "Normal biceps and brachioradialis. Slightly diminished triceps reflex.",
            specialTests: "Positive Froment's sign. Negative Tinel's at elbow."
        },
        differentialDiagnosis: [
            { name: "Radiation-induced brachial plexopathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Tumor recurrence/metastasis", ruleOut: "MRI shows no mass; painful progression is less common than in radiation (often painless) but myokymia is specific for radiation." },
            { name: "Ulnar neuropathy at elbow", ruleOut: "Would spare Median-innervated C8-T1 muscles (APB) which are involved here." },
            { name: "Cervical radiculopathy", ruleOut: "Would spare the Ulnar and Medial Antebrachial Cutaneous SNAPs." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Radiation-Induced Brachial Plexopathy (Lower Trunk)",
        explanation: "Progressive lower trunk plexopathy developing 2 years post-radiation, affecting primarily C8-T1 distribution with hand intrinsic weakness and ulnar sensory loss.",
        reviewOfSystems: {
            constitutional: "Fatigue (post-cancer). No fever.",
            musculoskeletal: "Shoulder tightness. No bone pain.",
            neurological: "Hand weakness and numbness. No leg symptoms.",
            integumentary: "Thickened skin over right chest radiation field."
        },
        humoralData: {
            labs: ["CBC: Normal", "Calcium: Normal (Ruling out metastasis)"],
            imaging: ["MRI Brachial Plexus: Diffuse thickening and T2 hyperintensity without discrete mass. No enhancing lesion."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.2, amp: 35, velocity: 52, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 3.8, amp: 15, velocity: 45, abnormal: true },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Medial Antebrachial Cut", peak: 4.2, amp: 8, velocity: 42, abnormal: true }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.5, amp: 3.5, velocity: 56, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 4.2, amp: 2.1, velocity: 45, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.5", measureB: "2.4", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "None", motorUnits: "Myokymic discharges observed", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, fibs: "1+", motorUnits: "Myokymic discharges observed", recruitment: "Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Spared (Middle/Upper trunks)" },
            { muscle: "Flexor Carpi Ulnaris", nerve: "Ulnar", root: "C8-T1", abnormal: true, fibs: "1+", recruitment: "Reduced" }
        ],
        teachingPoints: [
            "Radiation plexopathy most commonly affects the upper trunk, but lower trunk involvement can also occur, particularly when the radiation field extends to the lower plexus as in this case. Finding myokymia is key to differentiating radiation injury from tumor recurrence regardless of trunk level.",
            "EMG hallmark: Myokymic discharges (spontaneous bursts of potentials) are highly suggestive of radiation injury.",
            "NCS often shows reduced amplitudes across multiple nerves."
        ]
    },

    'diabeticplexopathy': {
        title: "Severe Thigh Pain and Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 65,
            gender: "Male",
            chiefComplaint: "Severe thigh pain followed by weakness, unable to climb stairs",
            history: "65-year-old diabetic man with 6-week history of severe burning pain in right thigh that kept him awake at night. Over the past 2 weeks, developed significant weakness in right leg, particularly difficulty climbing stairs and getting up from chairs. 15-pound weight loss. Diabetes well-controlled until recently.",
            pmh: "Type 2 diabetes mellitus (20 years), hypertension, hyperlipidemia",
            medications: "Metformin, Lisinopril, Atorvastatin"
        },
        physicalExam: {
            inspection: "Mild atrophy of right quadriceps muscle. Patient favors right leg when walking.",
            palpation: "Tenderness over anterior thigh. No masses palpable.",
            rom: "Full hip and knee ROM, but limited by pain and weakness",
            strength: "Hip flexion 3/5, knee extension 2/5, knee flexion 4/5. Normal ankle dorsiflexion and plantar flexion.",
            sensation: "Decreased sensation over anterior thigh and medial leg below knee",
            reflexes: "Absent right patellar reflex. Normal Achilles reflex. Normal left-sided reflexes.",
            specialTests: "Positive femoral stretch test. Negative straight leg raise."
        },
        differentialDiagnosis: [
            { name: "Diabetic lumbosacral plexopathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Lumbar radiculopathy", ruleOut: "Paraspinal sparing and involvement of multiple roots (L2-L4) make root-level pathology less likely than plexus." },
            { name: "Femoral neuropathy", ruleOut: "Involvement of Adductor Longus (Obturator nerve) localizes the lesion proximal to the femoral nerve, in the lumbar plexus." },
            { name: "Lumbar spinal stenosis", ruleOut: "Usually bilateral, chronic, and physical exam would typically show different reflex patterns; lacks the acute painful amyotrophy presentation." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Diabetic Lumbosacral Plexopathy (Diabetic Amyotrophy)",
        explanation: "Classic diabetic amyotrophy with acute onset severe thigh pain, proximal leg weakness, weight loss, and involvement of multiple lumbar plexus nerve territories.",
        ncsStudies: {
            sensory: [
                { name: "Sural Sensory", peak: 3.8, amp: 15, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false },
                { name: "Lat Fem Cutaneous", peak: 4.5, amp: 8.0, velocity: 42, abnormal: true },
                { name: "Saphenous Sensory", peak: 4.8, amp: 2.0, velocity: 35, abnormal: true }
            ],
            motor: [
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.0, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false },
                { name: "Femoral Motor (Quad)", latency: 5.2, amp: 3.0, velocity: 38, abnormal: true }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "Extensor Hallucis Longus", nerve: "Deep Peroneal", root: "L5-S1", abnormal: false, comment: "Spared (S1 root/distal distractor)" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: false, comment: "Spared (L4 root/distal distractor)" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false, comment: "Spared (S1 root/distal distractor)" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: false, comment: "Spared (L5 root/distal distractor)" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L3-L4", abnormal: true, fibs: "3+", recruitment: "Severely Reduced", motorUnits: "Large/Poly" },
            { muscle: "Adductor Longus", nerve: "Obturator", root: "L2-L3-L4", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Iliopsoas", nerve: "Femoral/L1-L2", root: "L1-L2-L3", abnormal: true, fibs: "2+", recruitment: "Reduced" },
            { muscle: "Gluteus Medius", nerve: "Superior gluteal", root: "L4-L5-S1", abnormal: false },
            {
                muscle: "Lumbar Paraspinals (L3)",
                nerve: "Dorsal rami",
                root: "L3",
                insertionalActivity: "Normal",
                spontaneousActivity: "None",
                recruitment: "Normal",
                motorUnits: "Normal morphology",
                abnormal: false
            }
        ],
        teachingPoints: [
            "Diabetic amyotrophy (often termed Diabetic Lumbosacral Radiculoplexoneuropathy or LRPN) presents with acute, severe, often unilateral thigh pain followed by proximal leg weakness.",
            "Weight loss is a common associated symptom.",
            "EMG shows denervation in multiple muscles supplied by the lumbar plexus (e.g., femoral, obturator nerves) but sparing of paraspinal muscles (distinguishing from radiculopathy).",
            "NCS are often normal or show mild changes in the affected nerves, as the lesion is proximal."
        ]
    }
};
