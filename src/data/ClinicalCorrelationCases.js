import { getStandardUpperExtremityNCS, getStandardLowerExtremityNCS } from './StandardNCSData.js';

export const clinicalCasesData = {
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
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false }
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
        difficulty: "advanced",
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
            "Radiation plexopathy typically involves more proximal elements and classically affects the upper trunk. Finding myokymia in a lower-trunk distribution is key to differentiating from tumor recurrence.",
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
    },
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

    'myopathy': {
        title: "Progressive Proximal Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 38,
            gender: "Female",
            occupation: "Teacher",
            chiefComplaint: "6-month history of difficulty climbing stairs and lifting objects overhead",
            history: "Gradual onset of weakness affecting shoulders and hips. Difficulty getting up from chairs and climbing stairs. No pain initially, but now has muscle aches. Denies rash or swallowing difficulties. No family history of muscle disease.",
            pmh: "Hypothyroidism",
            medications: "Levothyroxine"
        },
        physicalExam: {
            inspection: "No obvious muscle atrophy. No rash or skin changes observed",
            palpation: "Mild tenderness in proximal muscle groups. No fasciculations palpated",
            rom: "Full passive ROM. Limited active ROM due to weakness",
            strength: "Proximal weakness: deltoids 3/5, hip flexors 3/5, neck flexors 4/5. Distal strength preserved (5/5)",
            sensation: "Normal throughout",
            reflexes: "2+ and symmetric throughout. No pathological reflexes",
            specialTests: "Gowers' sign present"
        },
        differentialDiagnosis: [
            { name: "Inflammatory Myopathy (Polymyositis)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Inclusion Body Myositis", ruleOut: "Usually affects older patients (>50) and has a predilection for distal muscles (finger flexors) and quadriceps, with more chronic progression." },
            { name: "Thyroid Myopathy", ruleOut: "Though she has hypothyroidism, the degree of CK elevation and the presence of significant fibrillations support an active inflammatory process." },
            { name: "Muscular Dystrophy", ruleOut: "Usually presents earlier in life with a strong family history and different genetic patterns." },
            { name: "Lambert-Eaton Syndrome", ruleOut: "LEMS would show decremental or incremental responses on repetitive nerve stimulation and typically has autonomic symptoms and diminished reflexes." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Inflammatory Myopathy (Polymyositis)",
        explanation: "Classic inflammatory myopathy profile: symmetric proximal weakness, elevated CK, and EMG findings including both membrane instability (fibrillations) and small, short-duration MUAPs with early recruitment. Normal SNAPs definitively rule out a primary neuropathy.",
        reviewOfSystems: {
            constitutional: "Progressive fatigue and 5lb weight loss. No fever.",
            musculoskeletal: "Proximal muscle aching. Difficulty Rising from seated position. No joint swelling.",
            neurological: "Weakness in shoulders and hips. No numbness or tingling. No cranial nerve symptoms.",
            respiratory: "Mild shortness of breath when climbing stairs."
        },
        humoralData: {
            labs: ["Creatine Kinase (CK): 5,200 U/L (Severely Elevated)", "Aldolase: 45 U/L (Elevated)", "ANA: Positive (1:160, Speckled)", "TSH: 2.5 mIU/L (Normal on Levothyroxine)"],
            imaging: ["CXR: Normal, no evidence of interstitial lung disease.", "Muscle MRI: Edema and enhancement in the deltoids and thigh musculature bilateral."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Sural Sensory", peak: 3.8, amp: 15, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false },
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.0, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Distractor - Normal" },
            { muscle: "Deltoid", abnormal: true, fibs: "3+", motorUnits: "Small/Poly", recruitment: "Early" },
            { muscle: "Iliopsoas", abnormal: true, fibs: "2+", motorUnits: "Small/Poly", recruitment: "Early" },
            { muscle: "Biceps", abnormal: true, fibs: "2+", motorUnits: "Small/Poly", recruitment: "Early/Full" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: true, fibs: "2+", motorUnits: "Small/Poly", recruitment: "Early/Full" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: true, fibs: "2+", motorUnits: "Small/Poly", recruitment: "Early/Full" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: true, fibs: "2+", motorUnits: "Small/Poly", recruitment: "Early/Full" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: true, fibs: "2+", motorUnits: "Small/Poly", recruitment: "Early/Full" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: true, fibs: "2+", motorUnits: "Small/Poly", recruitment: "Early/Full" }
        ],
        teachingPoints: [
            "Myopathic disorders show preservation of sensory and motor conduction (unless severe).",
            "Key EMG hallmark: Small, short-duration, polyphasic MUAPs.",
            "Recruitment is typically 'early' or 'brisk' relative to the amount of effort/strength."
        ]
    },
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
    'polyneuropathy': {
        title: "Progressive Weakness and Numbness",
        difficulty: "intermediate",
        presentation: {
            age: 62,
            gender: "Male",
            occupation: "Retired Mechanic",
            chiefComplaint: "1-year history of progressive numbness in feet and hands with weakness",
            history: "Gradual onset of numbness that started in toes and has progressed up legs. Now involves fingertips bilaterally. Reports difficulty walking due to imbalance. Denies back pain or trauma. Has had diabetes for 15 years with poor glucose control.",
            pmh: "Diabetes mellitus type 2, hypertension, hyperlipidemia",
            medications: "Insulin, metformin, lisinopril, atorvastatin"
        },
        physicalExam: {
            inspection: "No muscle atrophy visible. Steady gait but decreased arm swing",
            palpation: "No tenderness. Decreased muscle bulk in distal legs",
            rom: "Full ROM throughout",
            strength: "Distal lower extremity weakness: dorsiflexion 4/5, plantar flexion 4/5. Intrinsic hand muscles 4/5. Proximal strength normal",
            sensation: "Stocking-glove pattern sensory loss. Vibration and proprioception markedly reduced in toes and fingers",
            reflexes: "Achilles reflexes absent bilaterally. Knee reflexes 1+ bilaterally. Upper extremity reflexes 2+ but symmetric",
            specialTests: "Romberg positive. Unable to heel-to-toe walk"
        },
        differentialDiagnosis: [
            { name: "Diabetic Distal Sensorimotor Polyneuropathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "CIDP", ruleOut: "CIDP usually presents with more significant proximal weakness and striking demyelinating features (conduction block, temporal dispersion), whereas this is primarily length-dependent and axonal." },
            { name: "Vitamin B12 Deficiency", ruleOut: "Can present similarly with sensory ataxia and large fiber loss, but history of long-standing diabetes and HbA1c makes diabetic cause more likely." },
            { name: "Alcoholic Neuropathy", ruleOut: "Also causes a length-dependent axonal neuropathy, but patient's diabetes/poor control is a more direct correlate here." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Diabetic Distal Sensorimotor Polyneuropathy (Axonal)",
        explanation: "Classic symmetric, length-dependent, sensorimotor polyneuropathy in the setting of chronic poorly controlled diabetes. NCS confirms distal axonal loss (reduced amplitudes) and EMG shows distal chronic denervation/reinnervation with normal proximal sparing.",
        reviewOfSystems: {
            constitutional: "Normal weight. No fever.",
            musculoskeletal: "No back pain or joint pain.",
            neurological: "Numbness in 'stocking-glove' distribution. Poor balance (sensory ataxia). Mild distal weakness. No bowel/bladder dysfunction."
        },
        humoralData: {
            labs: ["HbA1c: 10.5% (Markedly Elevated)", "Vitamin B12: 520 pg/mL (Normal)", "TSH: 2.1 mIU/L (Normal)", "SPEP/UIEP: Normal"],
            imaging: ["No imaging performed for distal symmetric neuropathy."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 4.8, amp: 4.0, velocity: 38, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: 4.2, amp: 6.0, velocity: 42, abnormal: true },
                { name: "Radial Sensory (Snuffbox)", peak: 3.8, amp: 5.0, velocity: 45, abnormal: true },
                { name: "Sural Sensory", peak: 0, amp: 0, velocity: 0, abnormal: true },
                { name: "Fibular Sensory", peak: 0, amp: 0, velocity: 0, abnormal: true }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 5.2, amp: 4.8, velocity: 38, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 4.8, amp: 5.2, velocity: 42, abnormal: true },
                { name: "Fibular Motor (EDB)", latency: 7.2, amp: 0.8, velocity: 28, abnormal: true },
                { name: "Tibial Motor (AH)", latency: 6.8, amp: 2.2, velocity: 32, abnormal: true }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "1+", motorUnits: "Polyphasic", recruitment: "Mildly Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, fibs: "1+", motorUnits: "Polyphasic", recruitment: "Mildly Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: false, comment: "Proximal distractor" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: true, fibs: "1+", recruitment: "Mildly reduced", motorUnits: "Polyphasic units" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Polyphasic units" },
            { muscle: "Fibularis Longus", nerve: "Superficial peroneal", root: "L5-S1", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Polyphasic units" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: true, fibs: "2+", recruitment: "Reduced", motorUnits: "Polyphasic units" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false },
            { muscle: "Iliopsoas", nerve: "Femoral/L1-L2", root: "L1-L3", abnormal: false },
            { muscle: "Lumbar Paraspinals (L5)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Length-dependent neuropathy affects the longest nerves first (lower extremities before upper).",
            "Sural SNAP is often the first response to disappear in axonal polyneuropathy.",
            "NCS typically shows reduced amplitudes with disproportionately preserved velocities (axonal loss).",
            "Normal proximal control muscles (Vastus, Iliopsoas) and paraspinals help rule out plexopathy or radiculopathy."
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

    // Myasthenia Gravis - Neuromuscular Junction Disorder
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

    // Tarsal Tunnel Syndrome - Lower Extremity Entrapment Neuropathy
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

    // S1 Radiculopathy - Different Root Level with H-reflex
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
    },

    doublecrush: {
        title: "Hand Weakness with Neck and Elbow Pain",
        difficulty: "advanced",
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
    stroke: {
        title: "Sudden Onset Left-Sided Weakness",
        difficulty: "beginner",
        presentation: {
            age: 68,
            gender: "Male",
            occupation: "Retired",
            chiefComplaint: "Acute onset left-sided weakness and facial droop",
            history: "Wired found patient at 7 AM with left facial droop and dense left-sided weakness. He was neurologically normal when he went to bed at 10 PM. No history of headache, neck pain, or vision changes. Slurred speech noted on arrival.",
            pmh: "Hypertension, Type 2 Diabetes, Atrial Fibrillation (non-compliant with anticoagulation)",
            medications: "Lisinopril, Metformin, Amlodipine"
        },
        physicalExam: {
            inspection: "Left-sided facial droop (sparing forehead). Left arm held in flexed posture. Left leg externally rotated.",
            palpation: "Normal muscle bulk in all 4 limbs (Too acute for atrophy).",
            rom: "Reduced active ROM on left side due to weakness; passive ROM normal.",
            strength: "Left side: Shoulder 2/5, Elbow 2/5, Wrist/Fingers 2/5, Hip 3/5, Knee 3/5, Ankle 3/5. Right side: 5/5 throughout.",
            sensation: "Patchy sensory loss on left hemibody; not following a dermatomal or nerve pattern.",
            reflexes: "Left: Biceps 3+, Patellar 3+, Babinski positive (upgoing). Right: 2+ throughout, Babinski negative.",
            specialTests: "NIHSS Score: 12. Significant left neglect."
        },
        differentialDiagnosis: [
            { name: "Acute Ischemic Stroke", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Hemorrhagic Stroke", ruleOut: "Ruled out by non-contrast head CT which showed no acute hemorrhage." },
            { name: "Hypoglycemia", ruleOut: "Point-of-care glucose was 112 mg/dL; hypoglycemia can mimic focal deficits but is ruled out here." },
            { name: "Todd's Paralysis", ruleOut: "No history of seizure activity or rhythmic movements preceding the weakness." },
            { name: "Conversion Disorder", ruleOut: "Positive Babinski sign and UMN patterns are objective findings that cannot be voluntarily produced." }
        ],
        requiresEMG: false,
        emgIndication: "NOT INDICATED",
        correctDiagnosis: "Acute Right MCA Territory Ischemic Stroke",
        explanation: "The acute onset of hemiplegia with facial involvement, hyperreflexia (UMN), and a positive Babinski sign localizes the lesion to the central nervous system (brain). Non-contrast CT confirming an MCA territory infarct makes electrodiagnostic testing (NCS/EMG) inappropriate and unnecessary.",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "No joint pain or back pain.",
            neurological: "Left-sided weakness, slurred speech, facial droop. No bowel or bladder incontinence.",
            cardiovascular: "Irregularly irregular pulse (consistent with AFib)."
        },
        humoralData: {
            labs: ["POC Glucose: 112 mg/dL (Normal)", "INR: 1.1 (Sub-therapeutic for AFib)", "Cardiac Troponin: Negative"],
            imaging: ["CT Head (Non-contrast): Early signs of right MCA territory ischemic stroke (loss of insular ribbon).", "CT Angiogram: Occlusion of the right M1 segment of the MCA."]
        },
        ncsStudies: {
            sensory: [],
            motor: [],
            comparison: []
        },
        emgStudies: [],
        teachingPoints: [
            "Electrodiagnostic studies (NCS/EMG) are tests of the PERIPHERAL nervous system (Root, Plexus, Nerve, NMJ, Muscle).",
            "Central nervous system lesions (Stroke, MS, SCI) present with Upper Motor Neuron (UMN) signs: Hyperreflexia, Spasticity, and Babinski sign.",
            "Ordering an EMG for a stroke patient is a common 'trap' in clinical exams; it is not indicated and would delay acute stabilization/thrombectomy.",
            "Standard NCS/EMG will be ENTIRELY NORMAL in the acute setting of a CNS lesion."
        ]
    },

    // Severe CTS - Disease Progression Example
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

    als: {
        title: "Progressive Weakness with Muscle Twitching",
        difficulty: "advanced",
        presentation: {
            age: 62,
            gender: "Male",
            occupation: "Retired",
            chiefComplaint: "Progressive weakness in all four limbs and difficulty swallowing",
            history: "Started with weakness in the right hand 8 months ago, progressed to left hand and both legs. Noticed involuntary muscle twitching (fasciculations). Recently developed slurred speech and difficulty swallowing (dysphagia). No sensory symptoms. No bladder/bowel issues.",
            pmh: "Hyperlipidemia",
            medications: "Atorvastatin"
        },
        physicalExam: {
            inspection: "Diffuse muscle atrophy, most prominent in hand intrinsics and tongue. Visible fasciculations in the deltoids, thighs, and tongue.",
            palpation: "No tenderness.",
            rom: "Normal.",
            strength: "Right hand (FDI/APB) 2/5, Left hand 3/5. Hip flexors 3/5. Tibialis anterior 4/5.",
            sensation: "Normal throughout (Touch, Pin, Vib, Prop).",
            reflexes: "3+ (brisk) at the biceps, patella, and Achilles. Positive Babinski (upgoing) bilaterally. Positive Hoffmann's sign.",
            specialTests: "Tongue fasciculations and atrophy (Bulbar involvement)."
        },
        differentialDiagnosis: [
            { name: "Amyotrophic Lateral Sclerosis (ALS)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Cervical Spondylotic Myelopathy", ruleOut: "While a myelopathy can cause UMN/LMN signs, it would not explain the bulbar involvement (tongue) or the widespread denervation in the legs." },
            { name: "Multifocal Motor Neuropathy (MMN)", ruleOut: "MMN typically shows focal conduction blocks on NCS and lacks UMN signs; here SNAPs are normal and UMN signs (Babinski) are present." },
            { name: "Kennedy's Disease (SBMA)", ruleOut: "Kennedy's usually presents with abnormal SNAPs (sensory neuropathy) and is X-linked; the sensory NCS here is entirely normal." },
            { name: "Inclusion Body Myositis (IBM)", ruleOut: "IBM usually affects finger flexors and quadriceps disproportionately and would show myopathic motor units on EMG rather than the large neurogenic units seen here." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Widespread denervation)",
        correctDiagnosis: "Amyotrophic Lateral Sclerosis (ALS)",
        explanation: "This patient demonstrates the Awaji/El Escorial criteria for ALS: both Upper Motor Neuron (UMN) signs (brisk reflexes, Babinski) and Lower Motor Neuron (LMN) signs (atrophy, fasciculations) across 3-4 body regions (Bulbar, Cervical, Thoracic, Lumbosacral). Normal SNAPs confirm the lesion is pre-ganglionic.",
        reviewOfSystems: {
            constitutional: "10-lb unintentional weight loss. Generalized fatigue.",
            respiratory: "Shortness of breath when lying flat (orthopnea).",
            neurological: "Progressive weakness in all limbs. Frequent muscle cramping. Difficulty with speech and swallowing. No numbness or tingling.",
            psychiatric: "Episodes of uncontrollable laughing and crying (Pseudobulbar affect)."
        },
        humoralData: {
            labs: ["Creatine Kinase (CK): 445 U/L (Mildly Elevated)", "Vitamin B12: 600 pg/mL (Normal)", "SPEP/UPEP: Normal"],
            imaging: ["MRI Brain and C-Spine: No evidence of structural compression or demyelinating lesions; no signal changes in the corticospinal tracts."],
            pulmonary: ["FVC (Forced Vital Capacity): 65% of predicted (Consistent with respiratory muscle weakness)."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Sural Sensory", peak: 3.2, amp: 15, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 2.5, velocity: 48, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 3.2, amp: 3.2, velocity: 49, abnormal: true },
                { name: "Fibular Motor (EDB)", latency: 5.2, amp: 2.5, velocity: 32, abnormal: true },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 2.8, velocity: 40, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.5", measureB: "2.4", deltaP: "0.1", abnormal: false }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fascic: "2+", fibs: "1+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, fascic: "2+", fibs: "2+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, fascic: "2+", fibs: "1+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "Tongue", abnormal: true, fascic: "3+" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: true, fascic: "2+", fibs: "3+" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: true, fascic: "1+", fibs: "2+" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: true, fascic: "1+", fibs: "2+" },
            { muscle: "Thoracic Paraspinals (T10)", abnormal: true, fibs: "2+", fascic: "1+" }
        ],
        teachingPoints: [
            "ALS requires evidence of both UMN and LMN involvement to make a clinical diagnosis.",
            "Electrodiagnostically, look for 'active' denervation (Fibs/PSWs) and 'chronic' reinnervation (Large MUAPs) in at least 3 of 4 regions (Bulbar, Cervical, Thoracic, Lumbosacral).",
            "Sensory NCS are characteristically normal in ALS; if abnormal, consider an alternative or co-morbid diagnosis."
        ]
    },

    gbs: {
        title: "Ascending Weakness and Tingling",
        difficulty: "intermediate",
        presentation: {
            age: 28,
            gender: "Female",
            occupation: "Sales",
            chiefComplaint: "Weakness starting in feet and legs, moving upwards, and tingling in hands",
            history: "Develop weakness in both legs over the past 3 days. Now having trouble walking and climbing stairs. Tingling in fingertips and toes. Had a severe 'stomach flu' (diarrhea) 2 weeks ago.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Normal muscle bulk (it's too early for atrophy).",
            palpation: "Normal.",
            rom: "Normal.",
            strength: "Bilateral Hip Flexion 3/5, Dorsiflexion 4/5. Grip strength 4/5. Sparing of cranial nerves so far.",
            sensation: "Mildly decreased vibration at toes; otherwise normal.",
            reflexes: "0 (Absent) throughout (at all levels).",
            specialTests: "Unsteady gait, requiring assistance to stand."
        },
        differentialDiagnosis: [
            { name: "Guillain-Barré Syndrome (AIDP)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)", ruleOut: "CIDP is a chronic condition (symptoms >8 weeks); here the onset is acute (3 days)." },
            { name: "Transverse Myelitis", ruleOut: "Transverse myelitis would usually present with an UMN pattern (eventually), a discrete sensory level on the trunk, and early bowel/bladder dysfunction; here reflexes are absent (LMN) and there is no sensory level." },
            { name: "Myasthenia Gravis", ruleOut: "MG causes fluctuating weakness and usually involves cranial nerves (ptosis/diplopia) early on; it would NOT cause areflexia or sensory symptoms (tingling)." },
            { name: "Tick Paralysis", ruleOut: "A classic mimic of GBS; would be ruled out by a thorough skin exam for a tick; clinically identical but usually lacks the CSF findings seen here." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Look for demyelination)",
        correctDiagnosis: "Guillain-Barré Syndrome (AIDP)",
        explanation: "Acute, rapidly progressive ascending symmetric weakness with global areflexia and antecedent gastrointestinal illness. Diagnosis is supported by NCS findings of demyelination (delayed motor latencies, slow conduction, and absent/prolonged F-waves) and CSF albuminocytologic dissociation.",
        reviewOfSystems: {
            constitutional: "No fever currently. Had severe diarrhea 2 weeks ago.",
            respiratory: "Mild shortness of breath when lying flat. No cough.",
            neurological: "Ascending weakness starting in feet. Tingling in hands and feet. Normal bowel and bladder control currently.",
            cardiovascular: "Occasional racing heart (potential autonomic instability)."
        },
        humoralData: {
            labs: ["CSF Analysis: Protein 120 mg/dL (Elevated), WBC 2 cells/mm³ (Normal) - Albuminocytologic dissociation.", "Campylobacter jejuni serology: Positive.", "Anti-GM1 antibodies: Negative."],
            imaging: ["MRI Spine: Enhancement of the cauda equina nerve roots (consistent with GBS)."],
            cardiac: ["ECG: Sinus tachycardia with occasional PVCs (monitor for autonomic dysfunction)."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 4.8, amp: 8.0, velocity: 32, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 35, velocity: 60, abnormal: false },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 25, velocity: 56, abnormal: false },
                { name: "Sural Sensory", peak: 3.5, amp: 15, velocity: 45, abnormal: false },
                { name: "Fibular Sensory", peak: 3.2, amp: 18, velocity: 48, abnormal: false }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.8, amp: 5.2, velocity: 45, abnormal: true },
                { name: "Ulnar Motor (ADM)", latency: 3.5, amp: 4.8, velocity: 42, abnormal: true },
                { name: "Fibular Motor (EDB)", latency: 5.2, amp: 2.5, velocity: 32, abnormal: true },
                { name: "Tibial Motor (AH)", latency: 6.5, amp: 3.0, velocity: 30, abnormal: true }
            ],
            comparison: [
                { name: "Median-Radial Thumb Comp", measureA: "2.4", measureB: "2.3", deltaP: "0.1", abnormal: false },
                { name: "F-waves (Ulnar)", measureA: "Right Side", measureB: "65ms", deltaP: "Marked Delay", abnormal: true }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, recruitment: "Reduced" },
            { muscle: "EIP", nerve: "Radial", root: "C7-C8", abnormal: true, recruitment: "Reduced" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: true, recruitment: "Reduced" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: true, recruitment: "Reduced" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: true, recruitment: "Reduced" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: true, recruitment: "Reduced" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L3-L4", abnormal: true, recruitment: "Reduced" }
        ],
        teachingPoints: [
            "In early GBS (AIDP), the 'Sural-sparing' pattern (abnormal motor, normal sural) is a classic finding.",
            "Absent or prolonged F-waves and H-reflexes are often the earliest signs of demyelination as they sample the long course of the nerve/roots.",
            "Areflexia in the face of only mild weakness is a clinical red flag for a demyelinating polyneuropathy like GBS."
        ]
    },

    lems: {
        title: "Weakness Improving with Exercise",
        difficulty: "advanced",
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

    parsonage: {
        title: "Extreme Shoulder Pain Followed by Weakness",
        difficulty: "advanced",
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
    },

    pronator: {
        title: "Forearm Pain and Palmar Numbness",
        difficulty: "advanced",
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
        difficulty: "advanced",
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
        difficulty: "advanced",
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
    },

    pin: {
        title: "Finger Drop without Numbness",
        difficulty: "advanced",
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
            strength: "Right Wrist Extension (ECRL/B, ECU) 0/5, Finger Extension (EDC) 0/5, Thumb Extension (EPL) 0/5. Brachioradialis 1/5. Supinator 2/5. Triceps strength 5/5. Normal hand intrinsics (APB, ADM, FDI).",
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
                { name: "Radial Sensory (Snuffbox)", peak: "Absent", amp: 0, velocity: 0, abnormal: true, comment: "Characteristic finding in high radial neuropathy" },
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
            { muscle: "Extensor Carpi Radialis Longus", nerve: "Radial", root: "C6-C7", abnormal: true, fibs: "0", recruitment: "Absent" },
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

    suprascapular: {
        title: "Deep Shoulder Pain and External Rotation Weakness",
        difficulty: "advanced",
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
        difficulty: "advanced",
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

    meralgia: {
        title: "The Burning Thigh",
        difficulty: "easy",
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
    deep_peroneal_ankle: {
        title: "Top of Foot Numbness and EDB Atrophy",
        difficulty: "advanced",
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
    obturator: {
        title: "Groin Pain and Inner Thigh Weakness",
        difficulty: "advanced",
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
        difficulty: "advanced",
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
        difficulty: "advanced",
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
    klumpke: {
        title: "Weak Hand and Medial Arm Numbness",
        difficulty: "advanced",
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
    },
    cidp: {
        title: "Chronic Progressive Weakness and Sensory Loss",
        difficulty: "advanced",
        presentation: {
            age: 52,
            gender: "Male",
            occupation: "Accountant",
            chiefComplaint: "6-month history of progressive difficulty walking and weakness in both hands",
            history: "52-year-old male with gradual onset of weakness in his legs, starting 6 months ago. He now has difficulty climbing stairs and rising from a chair. Over the last 3 months, he noticed weakness in his hands and difficulty with fine motor tasks like buttoning shirts. Numbness and tingling in feet and hands. No preceding illness. Symptoms have been steadily progressive without plateau.",
            pmh: "None significant",
            medications: "None"
        },
        physicalExam: {
            inspection: "Normal muscle bulk in the shoulders and thighs. Mild atrophy of the hand intrinsic muscles. Gait is wide-based and slightly steady.",
            palpation: "No muscle tenderness.",
            rom: "Full ROM throughout.",
            strength: "Proximal weakness: Hip flexion 4/5, Shoulder abduction 4/5. Distal weakness: Dorsiflexion 4/5, Grip strength 3+/5, Finger abduction 3/5.",
            sensation: "Symmetric decreased light touch, pinprick, and vibration in a stocking-glove distribution (up to knees and wrists). Marked reduction in proprioception at toes.",
            reflexes: "Absent (0) Achilles, Patellar, Biceps, and Triceps reflexes bilaterally.",
            specialTests: "Positive Romberg test. Negative Babinski."
        },
        differentialDiagnosis: [
            { name: "Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Guillain-Barré Syndrome (GBS)", ruleOut: "GBS is acute (peak <4 weeks); this patient has been progressing for 6 months." },
            { name: "Diabetic Polyneuropathy", ruleOut: "Diabetes typically causes an axonal (amplitude loss) length-dependent neuropathy; CIDP shows striking demyelinating features (slowing, block) and significant proximal involvement." },
            { name: "Multifocal Motor Neuropathy (MMN)", ruleOut: "MMN is purely motor (no sensory loss) and is typically asymmetric." },
            { name: "POEMS Syndrome", ruleOut: "Can mimic CIDP, but would usually have associated systemic findings (organomegaly, endocrinopathy, M-protein, skin changes)." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Demyelinating vs Axonal)",
        correctDiagnosis: "Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)",
        explanation: "Chronic polyradiculoneuropathy (>8 weeks progression) with proximal and distal weakness and generalized areflexia. NCS shows hallmark demyelinating features: prolonged distal latencies, marked velocity slowing (<70% LLN), temporal dispersion, and prolonged F-waves.",
        reviewOfSystems: {
            constitutional: "No fever, no recent weight loss.",
            musculoskeletal: "Weakness in all four limbs, worse proximally. No joint pain.",
            neurological: "Progressive weakness and numbness. Significant balance issues. No bowel/bladder changes."
        },
        humoralData: {
            labs: ["CSF: Albuminocytologic dissociation (Protein: 120 mg/dL, WBC: 2/mm³)", "HbA1c: 5.4% (Normal)", "SPEP: Normal"],
            imaging: ["MRI Lumbosacral Plexus: Nerve root enhancement and thickening consistent with inflammatory polyradiculopathy."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: "Absent", amp: 0, velocity: 0, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: "Absent", amp: 0, velocity: 0, abnormal: true },
                { name: "Sural Sensory", peak: 5.2, amp: 4.0, velocity: 32, abnormal: true }
            ],
            motor: [
                { name: "Median Motor (APB) - Wrist", latency: 8.5, amp: 2.2, velocity: "N/A", abnormal: true, comment: "Marked Distal Latency Delay" },
                { name: "Median Motor (APB) - Elbow", latency: 18.2, amp: 1.8, velocity: 22, abnormal: true, comment: "Slowing & Temporal Dispersion" },
                { name: "F-waves (Median)", measureA: "Right Side", measureB: "58ms", deltaP: "Marked Delay", abnormal: true },
                { name: "Fibular Motor (EDB) - Ank", latency: 9.8, amp: 0.8, velocity: "N/A", abnormal: true },
                { name: "Fibular Motor (EDB) - Knee", latency: 24.5, amp: 0.4, velocity: 18, abnormal: true, comment: "Conduction Block/Dispersion" }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, motorUnits: "Polyphasic", recruitment: "Reduced" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: true, motorUnits: "Polyphasic", recruitment: "Reduced", comment: "Proximal involvement" },
            { muscle: "Deltoid", nerve: "Axillary", root: "C5", abnormal: true, motorUnits: "Polyphasic", recruitment: "Reduced", comment: "Proximal involvement" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5", abnormal: true, motorUnits: "Polyphasic", recruitment: "Reduced" },
            { muscle: "Lumbar Paraspinals (L4)", abnormal: false, comment: "Often spared despite root involvement" }
        ],
        teachingPoints: [
            "CIDP is a chronic demyelinating polyneuropathy characterized by progression >8 weeks.",
            "NCS hallmark: Criteria for demyelination include 1) Prolonged distal latency, 2) Conduction velocity <70% LLN, 3) Abnormal F-waves, and 4) Conduction block or temporal dispersion.",
            "Aripiprazole-like dissociation (High protein, normal cell count) in CSF is common.",
            "Proximal weakness is as common as distal weakness in CIDP/GBS because the roots (polyradiculopathy) are involved."
        ]
    },
    mmn: {
        title: "Asymmetric Hand Weakness and Wrist Drop",
        difficulty: "advanced",
        presentation: {
            age: 55,
            gender: "Male",
            occupation: "Gardener",
            chiefComplaint: "1-year history of progressive weakness in the right hand and forearm",
            history: "55-year-old male who noticed difficulty with grip strength and occasional dropping of tools. Over the last 6 months, he has developed a significant 'wrist drop' on the right side. No pain, numbness, or tingling. He denies any swallowing or speaking difficulties. His legs are strong and he has no bowel or bladder issues.",
            pmh: "Hyperlipidemia",
            medications: "Atorvastatin"
        },
        physicalExam: {
            inspection: "Moderate atrophy of the first dorsal interosseous and thenar muscles on the right. No fasciculations observed in the tongue or other limbs.",
            palpation: "No muscle tenderness.",
            rom: "Full ROM throughout.",
            strength: "Right side: Wrist extension 3/5, Finger extension 3/5, APB 2/5, FDI 3/5. Elbow flexion/extension 5/5. Left side: 5/5 throughout. Lower extremities: 5/5 throughout.",
            sensation: "Entirely normal light touch, pinprick, vibration, and proprioception in all 4 limbs.",
            reflexes: "2+ and symmetric throughout. Babinski is negative (flexor). No Hoffmann's sign.",
            specialTests: "Negative Spurling's test. No upper motor neuron (UMN) signs."
        },
        differentialDiagnosis: [
            { name: "Multifocal Motor Neuropathy (MMN)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Amyotrophic Lateral Sclerosis (ALS)", ruleOut: "ALS would typically involve UMN signs (brisk reflexes, Babinski) and is rarely focal to one nerve's distribution for a year without spreading or fasciculations; here reflexes are normal and sensory SNAPs are preserved." },
            { name: "Lewis-Sumner Syndrome (MADSAM)", ruleOut: "MADSAM is a variant of CIDP that involves sensory nerves; here the sensory SNAPs are entirely normal, localizing the lesion to motor fibers only." },
            { name: "C7 or C8 Radiculopathy", ruleOut: "Radiculopathy would be associated with neck pain and usually spares the distal motor responses (no conduction block); also, paraspinals would be abnormal." },
            { name: "Vasculitic Mononeuritis Multiplex", ruleOut: "Vasculitis typically causes painful, axonal loss (amplitude drop) and involves sensory nerves (SNAP loss); here it is painless and demyelinating (block)." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Block vs Axonal Loss)",
        correctDiagnosis: "Multifocal Motor Neuropathy (MMN)",
        explanation: "Asymmetric, pure motor polyneuropathy. The hallmark is focal conduction block in motor nerves at non-compressive sites (e.g., Median block at forearm) with complete sparing of sensory nerves (Normal SNAPs). Normal reflexes and lack of UMN signs rule out ALS.",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "Right hand weakness. No joint pain.",
            neurological: "Pure motor weakness. No numbness or tingling. No cranial nerve symptoms."
        },
        humoralData: {
            labs: ["Anti-GM1 Ganglioside Antibody: Positive (High Titer)", "Creatine Kinase (CK): 250 U/L (Mildly Elevated)", "SPEP: Normal"],
            imaging: ["MRI Brachial Plexus: Normal; no masses or root thickening.", "Ultrasound Median Nerve: Focal swelling at the mid-forearm (site of conduction block)."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.2, amp: 42.0, velocity: 58, abnormal: false, comment: "Normal (Pure Motor)" },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 38.0, velocity: 60, abnormal: false, comment: "Normal (Pure Motor)" },
                { name: "Radial Sensory (Snuffbox)", peak: 2.4, amp: 26.0, velocity: 56, abnormal: false, comment: "Normal (Pure Motor)" }
            ],
            motor: [
                { name: "Median Motor (APB) - Wrist", latency: 3.8, amp: 11.5, velocity: "N/A", abnormal: false },
                { name: "Median Motor (APB) - Elbow", latency: 10.5, amp: 4.2, velocity: 35, abnormal: true, comment: "63% Conduction Block at Forearm" },
                { name: "Ulnar Motor (ADM) - Wrist", latency: 3.1, amp: 14.0, velocity: "N/A", abnormal: false },
                { name: "Ulnar Motor (ADM) - BE", latency: 8.2, amp: 13.5, velocity: 55, abnormal: false }
            ],
            comparison: [
                { name: "Median Motor (Left Side)", latency: 3.6, amp: 12.0, velocity: 58, abnormal: false, comment: "Normal comparison" }
            ]
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, fibs: "2+", motorUnits: "Large/Poly", recruitment: "Severely Reduced" },
            { muscle: "Extensor Indicis", nerve: "Radial", root: "C7-C8", abnormal: true, fibs: "1+", motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false, comment: "Sparing of Ulnar territory" },
            { muscle: "Biceps", nerve: "Musculocutaneous", root: "C5-C6", abnormal: false },
            { muscle: "Cervical Paraspinals", abnormal: false, fibs: "0", comment: "Sparing rules out root lesion" }
        ],
        teachingPoints: [
            "Multifocal Motor Neuropathy (MMN) presents with asymmetric, pure motor weakness, often mimicking ALS.",
            "NCS hallmark: Multifocal conduction block in motor nerves outside of common entrapment sites.",
            "Normal sensory SNAPs are essential for diagnosis; their involvement would suggest MADSAM or vasculitis.",
            "Positive anti-GM1 antibodies are found in 50-80% of cases and support the diagnosis.",
            "Unlike ALS, MMN is treatable with IVIG and lacks Upper Motor Neuron signs (no brisk reflexes or Babinski)."
        ]
    },
    cmt: {
        title: "Life-long Difficulty Walking and High Arches",
        difficulty: "intermediate",
        presentation: {
            age: 18,
            gender: "Male",
            occupation: "Student",
            chiefComplaint: "Slowly progressive difficulty walking and frequent ankle sprains",
            history: "18-year-old male who has always been 'clumsy' and was never good at sports. In the last 2 years, he noticed his feet appearing 'different' with high arches and toes that are curling. He tires easily when walking long distances and has frequent ankle sprains. No pain or numbness. He mentions his father and paternal aunt have 'funny-looking feet' as well.",
            pmh: "History of frequent ankle sprains",
            medications: "None"
        },
        physicalExam: {
            inspection: "Marked bilateral Pes Cavus (high arches) and hammer toes. Thinning of the distal leg muscles ('champagne bottle legs' or inverted champagne bottle appearance). No visible fasciculations.",
            palpation: "No muscle tenderness. Nerves feel slightly thickened on palpation at the elbows.",
            rom: "Full ROM throughout.",
            strength: "Symmetric distal weakness: Ankle dorsiflexion 4-/5, Eversion 3+/5, Toe extension 3/5. Hand intrinsics 4/5. Proximal strength (Hips/Shoulders) is 5/5.",
            sensation: "Symmetric mildly decreased pinprick and vibration in a distal stocking distribution (to the ankles). Proprioception is normal.",
            reflexes: "Absent (0) Achilles reflexes bilaterally. 1+ Patellar reflexes. 2+ Upper extremity reflexes.",
            specialTests: "Gait: Mild steppage gait noted. Negative Romberg."
        },
        differentialDiagnosis: [
            { name: "Charcot-Marie-Tooth Type 1 (CMT1)", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)", ruleOut: "CIDP is an acquired condition with non-uniform slowing (blocks/dispersion) and typically has a more rapid progression with proximal involvement; here the history is life-long and slowing is uniform." },
            { name: "Distal Muscular Dystrophy", ruleOut: "Would show myopathic changes on EMG (small units) rather than neurogenic changes; standard NCS velocities would be normal." },
            { name: "Friedreich's Ataxia", ruleOut: "Would involve gait ataxia, cardiomyopathy, and often diabetes; the primary finding is sensory loss and absent reflexes, but the motor NCS slowing here is more typical of CMT1." },
            { name: "Kennedy's Disease", ruleOut: "Primarily motor with bulbar involvement and a later onset; CMT1 is more distal/leg predominant and has the characteristic skeletal deformities." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (Uniform vs Multi-focal)",
        correctDiagnosis: "Charcot-Marie-Tooth Disease Type 1 (CMT1)",
        explanation: "Classic hereditary demyelinating polyneuropathy (likely PMP22 duplication). Hallmark is uniform, symmetric, and severe slowing of conduction velocities across all nerves and segments (typically 15-25 m/s) without evidence of conduction block or temporal dispersion. Clinical markers like Pes Cavus and family history are highly supportive.",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "High arches and curling toes. Frequent ankle instability.",
            neurological: "Chronic difficulty walking. No hand numbness. No bowel/bladder issues."
        },
        humoralData: {
            labs: ["Genetic Testing: PMP22 duplication detected.", "SPEP: Normal.", "HbA1c: 5.2% (Normal)."],
            imaging: ["None indicated; clinical/electrodiagnostic hallmark is sufficient."]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: "Absent", amp: 0, velocity: 0, abnormal: true },
                { name: "Ulnar Sensory (Little)", peak: "Absent", amp: 0, velocity: 0, abnormal: true },
                { name: "Sural Sensory", peak: "Absent", amp: 0, velocity: 0, abnormal: true }
            ],
            motor: [
                { name: "Median Motor (APB) - Wrist", latency: 12.0, amp: 4.5, velocity: "N/A", abnormal: true, comment: "Uniform Marked Delay" },
                { name: "Median Motor (APB) - Elbow", latency: 26.5, amp: 4.2, velocity: 20, abnormal: true, comment: "No Block/Dispersion" },
                { name: "Ulnar Motor (ADM) - Wrist", latency: 10.5, amp: 4.0, velocity: "N/A", abnormal: true },
                { name: "Ulnar Motor (ADM) - BE", latency: 24.2, amp: 3.8, velocity: 18, abnormal: true },
                { name: "Fibular Motor (EDB) - Ank", latency: 14.5, amp: 0.8, velocity: "N/A", abnormal: true },
                { name: "Fibular Motor (EDB) - Knee", latency: 32.5, amp: 0.8, velocity: 15, abnormal: true }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: true, motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: true, motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5", abnormal: true, motorUnits: "Large/Poly", recruitment: "Reduced", comment: "Chronic neurogenic changes" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: true, motorUnits: "Large/Poly", recruitment: "Reduced" },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false, comment: "Proximal sparing" }
        ],
        teachingPoints: [
            "Charcot-Marie-Tooth (CMT) Type 1 is the most common hereditary polyneuropathy.",
            "NCS hallmark: Uniform and symmetric conduction velocity slowing across all nerves and segments, with no evidence of conduction block or temporal dispersion.",
            "Motory velocities in CMT1 are typically <30 m/s (mean ~20 m/s).",
            "Clinical clues include high arches (Pes Cavus), hammer toes, and distal leg atrophy ('inverted champagne bottle').",
            "Inheritance is usually Autosomal Dominant, with PMP22 duplication being the most common genetic cause."
        ]
    },
    small_fiber: {
        title: "Burning Feet with Normal Strength",
        difficulty: "intermediate",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Retail Manager",
            chiefComplaint: "Severe burning pain and 'electric shocks' in the soles of both feet",
            history: "45-year-old female with a 3-month history of progressive burning pain in her feet. The pain is worse at night and sometimes feels like 'walking on glass'. She denies any weakness, balance issues, or back pain. She has recently started a lifestyle program for pre-diabetes.",
            pmh: "Pre-diabetes (A1c 6.2%), Hypertension",
            medications: "Lisinopril"
        },
        physicalExam: {
            inspection: "Normal muscle bulk in all 4 limbs. No skin changes, rashes, or ulcers on the feet.",
            palpation: "No muscle tenderness. No spinal tenderness.",
            rom: "Full ROM throughout.",
            strength: "5/5 strength throughout, including intrinsic foot muscles and ankle dorsiflexion/plantarflexion.",
            sensation: "Decreased pinprick and temperature sensation in a stocking distribution up to the ankles. **Vibration, Proprioception, and Light Touch are entirely normal.**",
            reflexes: "2+ and symmetric Patellar and Achilles reflexes. Babinski is negative.",
            specialTests: "Gait: Normal, including heel-to-toe walk. Romberg: Negative."
        },
        differentialDiagnosis: [
            { name: "Small Fiber Neuropathy", ruleOut: "N/A (Correct Diagnosis)" },
            { name: "Large Fiber Polyneuropathy", ruleOut: "Large fiber involvement would typically show abnormal vibration/proprioception, absent reflexes, and abnormal NCS (low amplitudes or slow velocities); here all are normal." },
            { name: "Erythromelalgia", ruleOut: "Characterized by episodic redness and warmth in addition to burning pain; here there are no visible skin changes or color changes." },
            { name: "Plantar Fasciitis", ruleOut: "Pain is typically worse with the first steps in the morning and localized to the calcaneal insertion; here it is diffuse, burning, and nocturnal." },
            { name: "L5-S1 Radiculopathy", ruleOut: "Would be asymmetric, usually involve back pain, and often show reflex/strength changes; here it is symmetric and distal." }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED (To rule out large-fiber involvement)",
        correctDiagnosis: "Small Fiber Neuropathy",
        explanation: "Pure small fiber neuropathy (SFN) affects the A-delta (thinly myelinated) and C (unmyelinated) fibers responsible for pain and temperature. Because standard NCS/EMG only measures large, myelinated fibers (A-alpha/A-beta), the studies are expected to be **ENTIRELY NORMAL** in pure SFN. Diagnosis is clinical or confirmed by skin biopsy (Intraepidermal Nerve Fiber Density).",
        reviewOfSystems: {
            constitutional: "No fever or weight loss.",
            musculoskeletal: "Burning feet. No joint pain.",
            neurological: "Painful sensory symptoms. No weakness. No hand symptoms."
        },
        humoralData: {
            labs: ["HbA1c: 6.2% (Pre-diabetes)", "Vitamin B12: 500 pg/mL (Normal)", "TSH: 2.1 mIU/L (Normal)"],
            imaging: ["None"]
        },
        ncsStudies: {
            sensory: [
                { name: "Median Sensory (Index)", peak: 3.1, amp: 45, velocity: 58, abnormal: false, comment: "Normal" },
                { name: "Ulnar Sensory (Little)", peak: 2.8, amp: 38, velocity: 60, abnormal: false, comment: "Normal" },
                { name: "Sural Sensory", peak: 3.8, amp: 18, velocity: 45, abnormal: false, comment: "Normal (measures large fibers)" }
            ],
            motor: [
                { name: "Median Motor (APB)", latency: 3.6, amp: 12.0, velocity: 55, abnormal: false },
                { name: "Ulnar Motor (ADM)", latency: 2.8, amp: 14.0, velocity: 62, abnormal: false },
                { name: "Fibular Motor (EDB)", latency: 4.2, amp: 6.0, velocity: 48, abnormal: false },
                { name: "Tibial Motor (AH)", latency: 4.5, amp: 12.0, velocity: 45, abnormal: false }
            ],
            comparison: []
        },
        emgStudies: [
            { muscle: "APB", nerve: "Median", root: "C8-T1", abnormal: false },
            { muscle: "FDI", nerve: "Ulnar", root: "C8-T1", abnormal: false },
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5", abnormal: false },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false },
            { muscle: "Vastus Lateralis", nerve: "Femoral", root: "L2-L4", abnormal: false },
            { muscle: "Lumbar Paraspinals (L5)", abnormal: false, fibs: "0" }
        ],
        teachingPoints: [
            "Small fiber neuropathy (SFN) is a clinical diagnosis characterized by burning pain and loss of pinprick/temperature sensation.",
            "NCS and needle EMG measure ONLY large, myelinated fibers (A-alpha and A-beta).",
            "In pure SFN, the NCS and EMG will be **ENTIRELY NORMAL**.",
            "Associated clinical features include normal strength, normal reflexes, and normal vibration/proprioception (as these are large fiber functions).",
            "Underlying causes include diabetes/pre-diabetes, Sjogren's, HIV, and amyloidosis."
        ]
    }
};
