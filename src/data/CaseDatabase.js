export const caseDatabase = {
    'hand14': {
        title: "Hand Numbness/Tingling (Digits 1-4)",
        difficulty: "beginner",
        // Competency metadata
        competencyArea: "NCS", // Primary: Nerve Conduction Study
        competencyLevel: 3, // Independent NCS screen
        pgyTarget: ["pgy3", "pgy4"], // Appropriate for PGY-3+
        secondaryCompetencies: [
            { area: "Report Writing", level: 2 },
            { area: "Peripheral Neuropathy", level: 2 }
        ],
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Administrative Assistant",
            chiefComplaint: "3-month history of numbness and tingling in thumb, index, and middle fingers, worse at night",
            history: "Symptoms wake her up at night, shaking hands provides relief. Occasional thenar weakness when gripping objects. No neck pain or trauma. Uses computer 8+ hours daily.",
            pmh: "Hypothyroidism, well-controlled",
            medications: "Levothyroxine",
            familyHistory: "Non-contributory"
        },
        physicalExam: {
            inspection: "No visible muscle atrophy. No fasciculations observed.",
            palpation: "Mild tenderness over carpal tunnel. No cervical spine tenderness.",
            rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
            strength: "5/5 strength in all muscle groups except mild thenar weakness (4/5) on right",
            sensation: "Decreased light touch and pinprick in median nerve distribution (digits 1-3)",
            reflexes: "2+ and symmetric throughout. No pathological reflexes.",
            specialTests: "Positive Tinel's sign at wrist. Positive Phalen's test. Negative Hoffmann, no clonus, no spasticity"
        },
        expectedDifferential: [
            "Carpal tunnel syndrome",
            "Pronator syndrome",
            "C6 radiculopathy",
            "Cervical myelopathy",
            "Polyneuropathy"
        ],
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Prolonged distal latency: 5.8 ms (normal <4.2 ms). Reduced CMAP amplitude: 3.2 mV (normal >4.0 mV)",
                interpretation: "Abnormal median nerve function at the wrist level"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal distal latency: 2.8 ms. Normal CMAP amplitude: 12.5 mV",
                interpretation: "Normal ulnar nerve function"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Prolonged peak latency: 4.5 ms (normal <3.4 ms). Reduced amplitude: 8 μV (normal >15 μV)",
                interpretation: "Median sensory involvement at wrist"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal peak latency: 2.9 ms. Normal amplitude: 25 μV",
                interpretation: "Ulnar sensory function preserved"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Difference: 0.8 ms (normal <0.4 ms)",
                interpretation: "Sensitive indicator of carpal tunnel syndrome"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis (APB)",
                findings: "Increased insertional activity, few fibrillation potentials, reduced recruitment with large amplitude, long duration motor unit potentials",
                interpretation: "Chronic denervation with reinnervation in median-innervated muscle"
            },
            {
                muscle: "First dorsal interosseous",
                findings: "Normal insertional activity, no abnormal spontaneous activity, full recruitment with normal motor unit potentials",
                interpretation: "Normal ulnar nerve function, no evidence of C8 involvement"
            }
        ],
        requiresEMG: true,
        correctDiagnosis: "Moderate Carpal Tunnel Syndrome",
        explanation: "Classic presentation with night symptoms, thenar weakness, positive provocative tests, and selective median nerve abnormalities on NCS. EMG shows chronic denervation in median-innervated thenar muscles confirming the diagnosis."
    },
    'footdrop': {
        title: "Foot Drop/Dorsiflexor Weakness",
        difficulty: "beginner",
        // Competency metadata
        competencyArea: "NCS", // Primary: Nerve Conduction Study
        competencyLevel: 2, // Focused H&P pertinent to EMG study
        pgyTarget: ["pgy2", "pgy3", "pgy4"], // Good for all levels - clear presentation
        secondaryCompetencies: [
            { area: "Peripheral Neuropathy", level: 1 },
            { area: "Report Writing", level: 1 }
        ],
        presentation: {
            age: 28,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "2-week history of inability to lift right foot, frequent tripping",
            history: "Gradual onset after prolonged squatting while laying tile. No back pain. No numbness initially, mild numbness over dorsum of foot developed later.",
            pmh: "Pelvic surgery for endometriosis",
            medications: "Hormone therapy",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Lumbosacral plexopathy",
            "Femoral neuropathy",
            "L4 radiculopathy",
            "Sciatic neuropathy",
            "Piriformis syndrome"
        ],
        physicalExam: {
            inspection: "Right foot in plantar flexed position. No muscle atrophy visible yet.",
            palpation: "No tenderness over fibular head or spine. Fibular head feels normal.",
            rom: "Limited active dorsiflexion of right foot. Passive ROM normal.",
            strength: "Right dorsiflexion 1/5, eversion 2/5. Plantar flexion and inversion normal (5/5). Hip and knee strength normal.",
            sensation: "Decreased sensation over dorsum of right foot in first web space",
            reflexes: "Achilles reflex present and symmetric. No pathological reflexes.",
            specialTests: "Negative straight leg raise. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "abnormal",
                findings: "No response obtained from extensor digitorum brevis",
                interpretation: "Complete conduction block or axonal loss in deep fibular nerve"
            },
            {
                name: "Tibial Motor (AH)",
                result: "normal",
                findings: "Normal distal latency and amplitude",
                interpretation: "Tibial nerve function preserved"
            },
            {
                name: "Fibular Sensory",
                result: "abnormal",
                findings: "No sensory response obtained",
                interpretation: "Superficial fibular nerve also affected"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal amplitude and latency",
                interpretation: "Sural nerve function preserved"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency (30.2 ms)",
                interpretation: "S1 root and tibial nerve conduction preserved"
            }
        ],
        correctDiagnosis: "Common Fibular (Peroneal) Neuropathy at the Fibular Head",
        explanation: "Acute onset foot drop with both motor and sensory involvement in common fibular distribution following prolonged squatting (compression at fibular head) is classic for fibular neuropathy."
    },
    'ulnar': {
        title: "Hand Weakness and Numbness",
        difficulty: "beginner",
        presentation: {
            age: 52,
            gender: "Male",
            occupation: "Carpenter",
            chiefComplaint: "6-month history of weakness in right hand and numbness in ring and little fingers",
            history: "Gradual onset of difficulty with fine motor tasks. Notices weakness when trying to grip tools. Numbness in ring and little fingers, worse in the morning. Works long hours using hand tools and machinery. No neck pain or trauma.",
            pmh: "Cubital tunnel release surgery 1 week ago",
            medications: "Post-op pain medications",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Acute Cubital Tunnel Syndrome",
            "Ulnar neuropathy at wrist",
            "Medial cord plexopathy",
            "Post-operative infection",
            "C8 radiculopathy"
        ],
        physicalExam: {
            inspection: "Mild atrophy of hypothenar eminence and first dorsal interosseous space on right",
            palpation: "No tenderness over ulnar groove at elbow. Ulnar nerve mobile at elbow.",
            rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
            strength: "Right hand intrinsics 3/5 (FDI, ADM, interossei). Grip strength reduced. FCU 4/5. All other muscle groups 5/5.",
            sensation: "Decreased light touch and pinprick in ulnar distribution (ring and little finger)",
            reflexes: "2+ and symmetric throughout. No pathological reflexes.",
            specialTests: "Positive Froment's sign on right. Negative Tinel's at wrist. Mild Tinel's at elbow. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency: 3.1 ms. Normal CMAP amplitude: 8.2 mV",
                interpretation: "Normal median nerve function"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Across elbow conduction velocity: 32 m/s (normal >50 m/s). Distal latency: 3.8 ms (normal <3.3 ms)",
                interpretation: "Focal conduction abnormality across elbow segment"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal peak latency: 2.8 ms. Normal amplitude: 22 μV",
                interpretation: "Median sensory function preserved"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Prolonged peak latency: 4.2 ms (normal <3.4 ms). Reduced amplitude: 6 μV (normal >10 μV)",
                interpretation: "Ulnar sensory involvement"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms (normal <0.4 ms)",
                interpretation: "Normal comparative studies"
            }
        ],
        emgStudies: [
            {
                muscle: "First dorsal interosseous",
                findings: "Increased insertional activity, frequent fibrillation potentials and positive sharp waves, reduced recruitment with large amplitude motor unit potentials",
                interpretation: "Chronic denervation with reinnervation in ulnar-innervated hand muscles"
            },
            {
                muscle: "Flexor carpi ulnaris",
                findings: "Normal insertional activity, no abnormal spontaneous activity, full recruitment with normal motor unit potentials",
                interpretation: "Normal - suggests lesion below elbow (spares FCU branch)"
            }
        ],
        requiresEMG: true,
        correctDiagnosis: "Cubital Tunnel Syndrome (Ulnar Neuropathy at Elbow)",
        explanation: "Progressive hand weakness with ulnar distribution, positive Froment's sign, focal slowing across elbow on NCS, and EMG showing denervation in distal ulnar muscles while sparing FCU confirms ulnar neuropathy at the elbow."
    },
    'cervical': {
        title: "Neck Pain with Arm Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Office Manager",
            chiefComplaint: "3-month history of neck pain radiating to left arm with weakness and numbness",
            history: "Gradual onset of neck pain after minor motor vehicle accident. Pain radiates down left arm to thumb and index finger. Weakness noticed when lifting objects overhead. Numbness in thumb, index, and middle finger. Symptoms worse with neck extension.",
            pmh: "None",
            medications: "Ibuprofen PRN"
        },
        expectedDifferential: [
            "c6 radiculopathy",
            "cervical radiculopathy",
            "cervical disc herniation",
            "brachial plexopathy",
            "multiple peripheral neuropathies",
            "cervical myelopathy"
        ],
        physicalExam: {
            inspection: "No visible muscle atrophy. Patient holds head in slightly flexed position.",
            palpation: "Tenderness over left cervical paraspinal muscles. No palpable lymphadenopathy.",
            rom: "Limited neck extension due to pain. Left lateral flexion reproduces arm pain.",
            strength: "Left biceps 4/5, brachioradialis 4/5, deltoid 4-/5. Grip strength mildly reduced on left. Right side normal.",
            sensation: "Decreased sensation in left C6 dermatome (thumb, index finger, lateral forearm)",
            reflexes: "Left biceps reflex diminished (1+). Brachioradialis reflex absent on left. Triceps 2+ bilaterally.",
            specialTests: "Positive Spurling's test on left. Negative Hoffmann bilaterally. No clonus or spasticity"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency: 3.2 ms. Normal CMAP amplitude: 9.1 mV",
                interpretation: "Median nerve function normal"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal distal latency: 2.7 ms. Normal CMAP amplitude: 11.8 mV",
                interpretation: "Ulnar nerve function normal"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal peak latency: 2.9 ms. Normal amplitude: 18 μV",
                interpretation: "Sensory NCS normal in radiculopathy (lesion is proximal to DRG)"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal peak latency: 2.8 ms. Normal amplitude: 20 μV",
                interpretation: "Sensory NCS normal in radiculopathy"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms (normal <0.4 ms)",
                interpretation: "Normal comparison study"
            }
        ],
        emgStudies: [
            {
                muscle: "Biceps",
                findings: "Increased insertional activity, fibrillation potentials and positive sharp waves, reduced recruitment",
                interpretation: "Active denervation in C6 innervated muscle"
            },
            {
                muscle: "Deltoid",
                findings: "Increased insertional activity, few fibrillation potentials, reduced recruitment with large amplitude MUPs",
                interpretation: "Chronic denervation with reinnervation in C6 innervated muscle"
            },
            {
                muscle: "Triceps",
                findings: "Normal insertional activity, no spontaneous activity, full recruitment with normal MUPs",
                interpretation: "Normal C7 innervated muscle"
            }
        ],
        requiresEMG: true,
        correctDiagnosis: "Left C6 Radiculopathy",
        explanation: "Clinical presentation with neck pain, C6 distribution weakness and numbness, diminished reflexes, positive Spurling's test, and EMG showing active denervation in C6 myotome muscles confirms C6 radiculopathy."
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
        expectedDifferential: [
            "diabetic polyneuropathy",
            "distal sensorimotor polyneuropathy",
            "peripheral neuropathy",
            "chronic inflammatory demyelinating polyneuropathy",
            "vitamin deficiency neuropathy",
            "toxic neuropathy"
        ],
        physicalExam: {
            inspection: "No muscle atrophy visible. Steady gait but decreased arm swing.",
            palpation: "No tenderness. Decreased muscle bulk in distal legs.",
            rom: "Full ROM throughout",
            strength: "Distal lower extremity weakness: dorsiflexion 4/5, plantar flexion 4/5. Intrinsic hand muscles 4/5. Proximal strength normal.",
            sensation: "Stocking-glove pattern sensory loss. Vibration and proprioception markedly reduced in toes and fingers.",
            reflexes: "Achilles reflexes absent bilaterally. Knee reflexes 1+ bilaterally. Upper extremity reflexes 2+ but symmetric.",
            specialTests: "Romberg positive. Unable to heel-to-toe walk. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Reduced amplitude: 3.2 mV (normal >4.0mV). Mildly slow velocity.",
                interpretation: "Axonal motor involvement"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Reduced amplitude: 3.8 mV (normal >6.0mV).",
                interpretation: "Axonal motor involvement"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Prolonged peak latency: 4.8 ms (normal <3.4 ms). Markedly reduced amplitude: 4 μV (normal >15 μV)",
                interpretation: "Severe median sensory nerve dysfunction"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Prolonged peak latency: 4.2 ms (normal <3.4 ms). Reduced amplitude: 6 μV (normal >10 μV)",
                interpretation: "Severe ulnar sensory nerve dysfunction"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Both responses reduced in amplitude",
                interpretation: "Widespread axonal loss"
            },
            {
                name: "Fibular Motor (EDB)",
                result: "abnormal",
                findings: "Prolonged distal latency: 7.2 ms (normal <6.5 ms). Markedly reduced amplitude: 0.8 mV (normal >2.5 mV)",
                interpretation: "Severe fibular motor nerve dysfunction"
            },
            {
                name: "Tibial Motor (AH)",
                result: "abnormal",
                findings: "Reduced amplitude: 2.4 mV (normal >4.0mV)",
                interpretation: "Axonal tibial involvement"
            },
            {
                name: "Fibular Sensory",
                result: "abnormal",
                findings: "No response obtained",
                interpretation: "Axonal sensory loss"
            },
            {
                name: "Sural Sensory",
                result: "abnormal",
                findings: "No response obtained",
                interpretation: "Severe sural sensory nerve dysfunction"
            },
            {
                name: "H-Reflex",
                result: "abnormal",
                findings: "Absent bilaterally",
                interpretation: "Pathological H-reflex consistent with polyneuropathy"
            }
        ],
        requiresEMG: false,
        correctDiagnosis: "Diabetic Distal Sensorimotor Polyneuropathy",
        explanation: "Length-dependent sensorimotor polyneuropathy with stocking-glove distribution, absent reflexes, and uniform slowing on NCS studies in a patient with long-standing diabetes confirms diabetic polyneuropathy."
    },
    'myopathy': {
        title: "Progressive Proximal Weakness",
        difficulty: "expert",
        presentation: {
            age: 38,
            gender: "Female",
            occupation: "Teacher",
            chiefComplaint: "6-month history of difficulty climbing stairs and lifting objects overhead",
            history: "Gradual onset of weakness affecting shoulders and hips. Difficulty getting up from chairs and climbing stairs. No pain initially, but now has muscle aches. Denies rash or swallowing difficulties. No family history of muscle disease.",
            pmh: "Hypothyroidism",
            medications: "Levothyroxine"
        },
        expectedDifferential: [
            "inflammatory myopathy",
            "polymyositis",
            "dermatomyositis",
            "inclusion body myositis",
            "thyroid myopathy",
            "muscular dystrophy",
            "metabolic myopathy"
        ],
        physicalExam: {
            inspection: "No obvious muscle atrophy. No rash or skin changes observed.",
            palpation: "Mild tenderness in proximal muscle groups. No fasciculations palpated.",
            rom: "Full passive ROM. Limited active ROM due to weakness.",
            strength: "Proximal weakness: deltoids 3/5, hip flexors 3/5, neck flexors 4/5. Distal strength preserved (5/5).",
            sensation: "Normal throughout",
            reflexes: "2+ and symmetric throughout. No pathological reflexes.",
            specialTests: "Gowers' sign present. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency: 3.0 ms. Normal CMAP amplitude: 8.5 mV",
                interpretation: "Normal median nerve function"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal distal latency: 2.8 ms. Normal CMAP amplitude: 10.2 mV",
                interpretation: "Normal ulnar nerve function"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal amplitude and latency",
                interpretation: "Normal sensory nerve function"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal amplitude and latency",
                interpretation: "Normal sensory nerve function"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal comparison"
            },
            {
                name: "Fibular Motor (EDB)",
                result: "normal",
                findings: "Normal distal latency: 4.2 ms. Normal CMAP amplitude: 3.8 mV",
                interpretation: "Normal fibular nerve function"
            },
            {
                name: "Tibial Motor (AH)",
                result: "normal",
                findings: "Normal distal latency: 4.5 ms. Normal CMAP amplitude: 10.5 mV",
                interpretation: "Normal tibial nerve function"
            },
            {
                name: "Fibular Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency (29.8 ms)",
                interpretation: "Normal reflex"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                findings: "Increased insertional activity, frequent fibrillation potentials, positive sharp waves, and complex repetitive discharges. Early recruitment with small, short-duration, polyphasic motor unit potentials",
                interpretation: "Myopathic changes with membrane instability"
            },
            {
                muscle: "Biceps",
                findings: "Increased insertional activity, fibrillation potentials, early recruitment with small amplitude, short duration MUPs",
                interpretation: "Myopathic changes consistent with inflammatory myopathy"
            },
            {
                muscle: "Iliopsoas",
                findings: "Increased insertional activity, abnormal spontaneous activity, early recruitment with myopathic MUPs",
                interpretation: "Proximal myopathic involvement"
            }
        ],
        requiresEMG: true,
        correctDiagnosis: "Inflammatory Myopathy (likely Polymyositis)",
        explanation: "Proximal muscle weakness, elevated CK (implied), normal NCS with myopathic EMG changes showing membrane instability and small, short-duration motor units in proximal muscles supports inflammatory myopathy."
    },
    'als': {
        title: "Progressive Weakness and Muscle Twitching",
        difficulty: "expert",
        presentation: {
            age: 58,
            gender: "Male",
            occupation: "Engineer",
            chiefComplaint: "8-month history of progressive weakness in right hand and visible muscle twitching",
            history: "Started with weakness in right hand, difficulty with fine motor tasks like writing and buttoning shirts. Recently developed weakness in left hand and noticed muscle twitching in arms. Some difficulty with speech articulation. Denies sensory symptoms or bowel/bladder dysfunction.",
            pmh: "Hypertension",
            medications: "Amlodipine"
        },
        expectedDifferential: [
            "amyotrophic lateral sclerosis",
            "motor neuron disease",
            "progressive muscular atrophy",
            "primary lateral sclerosis",
            "kennedy disease",
            "multifocal motor neuropathy",
            "cervical myelopathy"
        ],
        physicalExam: {
            inspection: "Visible fasciculations in bilateral thenar and hypothenar eminences, deltoids, and tongue. Mild atrophy of right first dorsal interosseous.",
            palpation: "Fasciculations palpable in multiple muscle groups. No tenderness.",
            rom: "Full ROM throughout",
            strength: "Right hand intrinsics 3/5, left hand intrinsics 4/5. Grip strength reduced bilaterally. Proximal strength mildly reduced in arms.",
            sensation: "Normal throughout",
            reflexes: "Hyperreflexic throughout (3+). Positive Hoffmann sign bilaterally. Jaw jerk present.",
            specialTests: "Positive Babinski bilaterally. Tongue fasciculations visible. Mild dysarthria. No clonus."
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Normal distal latency: 3.4 ms. Reduced CMAP amplitude: 2.1 mV (normal >4.0 mV)",
                interpretation: "Reduced amplitude suggesting motor axon loss"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Normal distal latency: 3.1 ms. Reduced CMAP amplitude: 3.2 mV (normal >6.0 mV)",
                interpretation: "Reduced amplitude consistent with motor neuron loss"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal peak latency: 2.9 ms. Normal amplitude: 18 μV",
                interpretation: "Normal sensory function preserved in ALS (LMN/UMN lesion only)"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal peak latency: 3.0 ms. Normal amplitude: 15 μV",
                interpretation: "Normal sensory function preserved"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal study"
            }
        ],
        emgStudies: [
            {
                muscle: "First dorsal interosseous",
                findings: "Increased insertional activity, frequent fasciculation potentials, fibrillation potentials and positive sharp waves. Reduced recruitment with large amplitude, long duration motor unit potentials",
                interpretation: "Chronic denervation with reinnervation and ongoing fasciculations"
            },
            {
                muscle: "Deltoid",
                findings: "Fasciculation potentials, reduced recruitment with giant motor unit potentials",
                interpretation: "Chronic reinnervation with ongoing denervation"
            },
            {
                muscle: "Tongue",
                findings: "Frequent fasciculation potentials, fibrillation potentials, reduced recruitment",
                interpretation: "Bulbar involvement with lower motor neuron signs"
            }
        ],
        requiresEMG: true,
        correctDiagnosis: "Amyotrophic Lateral Sclerosis (ALS)",
        explanation: "Progressive weakness with both upper motor neuron signs (hyperreflexia, Babinski) and lower motor neuron signs (fasciculations, atrophy), preserved sensation, and EMG showing widespread denervation with fasciculations confirms ALS."
    },
    'stroke': {
        title: "Acute Hemiparesis",
        difficulty: "expert",
        presentation: {
            age: 68,
            gender: "Male",
            occupation: "Retired",
            chiefComplaint: "Acute onset left-sided weakness and facial droop this morning",
            history: "Patient was found by wife at 7 AM with left-sided weakness and facial droop. She reports he was normal when she went to bed at 11 PM. Patient has slurred speech but is alert and oriented. Denies headache, neck pain, or back pain. No recent trauma or illness.",
            pmh: "Hypertension, diabetes, atrial fibrillation",
            medications: "Lisinopril, metformin, warfarin"
        },
        expectedDifferential: [
            "Acute cerebrovascular accident (stroke)",
            "Brain tumor with mass effect",
            "Intracranial hemorrhage",
            "Todd's paralysis (post-ictal)",
            "Complicated migraine"
        ],
        emgIndication: "NOT INDICATED",
        explanation: "This is an upper motor neuron lesion (stroke). EMG/NCS evaluate the peripheral nervous system and would be normal in isolated stroke. Clinical presentation with hyperreflexia, Babinski sign, and spasticity confirms central cause.",
        correctDiagnosis: "Acute Cerebrovascular Accident (Stroke) - EMG NOT INDICATED",
        educationalNote: "EMG/NCS studies are used to evaluate the peripheral nervous system (nerve roots, plexuses, peripheral nerves, neuromuscular junction, and muscle). In pure upper motor neuron lesions like stroke, EMG would be normal and is not clinically indicated."
    },
    'combined': {
        title: "Bilateral Hand Numbness and Weakness",
        difficulty: "intermediate",
        presentation: {
            age: 50,
            gender: "Female",
            occupation: "Office Manager",
            chiefComplaint: "Pain and numbness in neck, shoulder, and first three fingers of right hand for 6 months",
            history: "Symptoms began with mild neck stiffness, followed by progressive numbness in the thumb and index finger. Sensation of 'pins and needles' wakes her up at night. Occasional sharp pain radiates from neck to right shoulder. No history of injury.",
            pmh: "Osteoarthritis of cervical spine",
            medications: "Ibuprofen as needed",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "C6 radiculopathy",
            "Carpal tunnel syndrome",
            "Double crush syndrome",
            "Brachial plexopathy (upper trunk)",
            "Pronator teres syndrome"
        ],
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Prolonged distal latencies: 5.2 ms Right, 4.8 ms Left (normal <4.2 ms). Reduced amplitudes.",
                interpretation: "Bilateral median nerve dysfunction at wrist level"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Conduction velocity slowing across elbow: 42 m/s Right, 45 m/s Left (normal >50 m/s).",
                interpretation: "Bilateral ulnar nerve dysfunction at elbow level"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Prolonged peak latencies: 4.1 ms Right, 3.9 ms Left (normal <3.4 ms). Reduced amplitudes.",
                interpretation: "Bilateral median sensory involvement at wrist"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Reduced amplitudes bilaterally, mildly prolonged latencies.",
                interpretation: "Bilateral ulnar sensory involvement"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Prolonged median latency compared to radial bilaterally.",
                interpretation: "Confirms carpal tunnel component"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis",
                findings: "Chronic denervation with reinnervation changes",
                interpretation: "Chronic median nerve dysfunction"
            },
            {
                muscle: "First dorsal interosseous",
                findings: "Mild denervation changes",
                interpretation: "Ulnar nerve dysfunction"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Combined Carpal Tunnel Syndrome and Cubital Tunnel Syndrome (bilateral)",
        explanation: "This case demonstrates the classic 'double crush' phenomenon where a worker with repetitive motions develops entrapments at multiple sites. Both median (carpal tunnel) and ulnar (cubital tunnel) neuropathies can coexist, especially in occupational settings."
    },
    'c5radiculopathy': {
        title: "Shoulder Pain and Arm Weakness",
        difficulty: "beginner",
        presentation: {
            age: 42,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "Right shoulder weakness and difficulty lifting arm for 2 months",
            history: "Noticed progressive difficulty reaching overhead and lifting heavy objects. Dull ache in the lateral shoulder area. No specific injury, but work involves heavy lifting. Numbness over the lateral deltoid area.",
            pmh: "No significant medical history",
            medications: "None",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Brachial plexopathy (upper trunk)",
            "C5/C6 radiculopathy",
            "Parsonage-Turner syndrome",
            "Axillary neuropathy",
            "Musculocutaneous neuropathy"
        ],
        physicalExam: {
            inspection: "Holding right arm in adducted position",
            palpation: "Cervical paraspinal muscle spasm, tender over C4-C5 region",
            rom: "Limited cervical extension and right lateral flexion",
            strength: "Deltoid 3/5, biceps 4/5, supraspinatus 3/5 on right. Left side normal.",
            sensation: "Decreased sensation over lateral shoulder (C5 dermatome)",
            reflexes: "Biceps reflex diminished (1+) on right. Brachioradialis normal. Triceps 2+ bilaterally.",
            specialTests: "Positive Spurling's test on right"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency: 3.2 ms. Normal CMAP amplitude: 8.5 mV",
                interpretation: "Normal median nerve function"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal distal latency: 2.8 ms. Normal CMAP amplitude: 10.2 mV",
                interpretation: "Normal ulnar nerve function"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory function"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory function"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal comparison"
            }
        ],
        emgStudies: [
            {
                muscle: "Cervical paraspinals (C4-C5)",
                findings: "Positive sharp waves and fibrillations",
                interpretation: "Acute denervation"
            },
            {
                muscle: "Deltoid",
                findings: "Positive sharp waves, reduced recruitment",
                interpretation: "C5 root involvement"
            },
            {
                muscle: "Biceps",
                findings: "Mild denervation changes",
                interpretation: "C5-C6 involvement"
            },
            {
                muscle: "Supraspinatus",
                findings: "Active denervation",
                interpretation: "C5 root lesion"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C5 Radiculopathy",
        explanation: "Classic C5 radiculopathy presentation with shoulder/deltoid weakness, diminished biceps reflex, and lateral shoulder sensory loss. Normal peripheral NCS with denervation in C5 myotomes and cervical paraspinals confirms root level pathology."
    },
    'l5radiculopathy': {
        title: "Lower Back Pain with Leg Weakness",
        presentation: {
            age: 38,
            gender: "Female",
            occupation: "Nurse",
            chiefComplaint: "6-week history of lower back pain radiating down right leg with foot weakness",
            history: "Gradual onset lower back pain after lifting patient. Pain radiates from low back down posterior/lateral right leg to dorsum of foot. Weakness dorsiflexing foot, difficulty walking on heels. Numbness between great and second toe. Pain worse with sitting, better with walking.",
            pmh: "Previous episode of low back pain 5 years ago, resolved",
            medications: "Naproxen, gabapentin",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "L5 radiculopathy",
            "Peroneal neuropathy (at fibular head)",
            "Sciatic neuropathy",
            "Lumbosacral plexopathy",
            "Anterior horn cell disease (ALS)"
        ],
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 2.1 mV (normal >2.5 mV). Normal distal latency.",
                interpretation: "Axonal loss in fibular distribution"
            },
            {
                name: "Tibial Motor (AH)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "No tibial nerve involvement"
            },
            {
                name: "Fibular Sensory",
                result: "normal",
                findings: "Normal amplitude and latency (Sensory NCS normal in radiculopathy)",
                interpretation: "Normal sensory conduction"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "S1 distribution spared"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency: 30.5 ms",
                interpretation: "S1 reflex arc intact"
            }
        ],
        emgStudies: [
            {
                muscle: "Lumbar paraspinals (L4-L5)",
                findings: "Positive sharp waves and fibrillations",
                interpretation: "Acute denervation"
            },
            {
                muscle: "Tibialis anterior",
                findings: "Positive sharp waves, reduced recruitment",
                interpretation: "L4-L5 root involvement"
            },
            {
                muscle: "Extensor hallucis longus",
                findings: "Active denervation, severely reduced recruitment",
                interpretation: "L5 root lesion"
            },
            {
                muscle: "Gluteus medius",
                findings: "Mild denervation changes",
                interpretation: "Superior gluteal nerve (L5 root)"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Right L5 Radiculopathy",
        explanation: "L5 radiculopathy with classic dorsiflexor weakness, sensory loss in L5 distribution, and EMG showing denervation in L5 myotomes with sparing of S1 muscles. Reduced peroneal motor amplitude reflects axonal loss from chronic root compression."
    },
    'c7radiculopathy': {
        title: "Arm Pain with Hand Weakness",
        presentation: {
            age: 46,
            gender: "Male",
            occupation: "Office Manager",
            chiefComplaint: "4-week history of neck pain radiating down arm with hand and wrist weakness",
            history: "Gradual onset neck pain radiating down posterior arm to middle finger. Weakness extending wrist and fingers. Difficulty opening jars and gripping objects. Pain worse with neck extension. No trauma. Desk job with poor ergonomics.",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "C7 radiculopathy",
            "Radial neuropathy",
            "Median neuropathy",
            "Brachial plexopathy",
            "Cervical spondylosis"
        ],
        physicalExam: {
            inspection: "No visible atrophy",
            palpation: "Cervical paraspinal tenderness at C6-C7 level",
            rom: "Limited cervical extension",
            strength: "Triceps 4/5, wrist extensors 3/5, finger extensors 4/5 on right",
            sensation: "Decreased sensation in middle finger (C7 dermatome)",
            reflexes: "Triceps reflex diminished (1+) on right. Biceps and brachioradialis normal.",
            specialTests: "Positive Spurling's test, negative Tinel's at wrist/elbow"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency and amplitude",
                interpretation: "Normal median nerve function"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "Normal ulnar nerve function"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal comparison"
            }
        ],
        emgStudies: [
            {
                muscle: "Cervical paraspinals (C6-C7)",
                findings: "Positive sharp waves and fibrillations",
                interpretation: "Acute denervation"
            },
            {
                muscle: "Triceps",
                findings: "Positive sharp waves, reduced recruitment",
                interpretation: "C7 root involvement"
            },
            {
                muscle: "Extensor carpi radialis",
                findings: "Active denervation changes",
                interpretation: "C7 root lesion"
            },
            {
                muscle: "Extensor digitorum communis",
                findings: "Denervation with reduced recruitment",
                interpretation: "Posterior interosseous nerve (C7 root)"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Right C7 Radiculopathy",
        explanation: "C7 radiculopathy with classic triceps weakness, diminished triceps reflex, and middle finger sensory loss. EMG shows denervation in C7 myotomes including triceps and wrist/finger extensors, with sparing of C5, C6, C8, and T1 muscles."
    },
    'plexopathy': {
        title: "Arm Weakness After Motorcycle Accident",
        presentation: {
            age: 28,
            gender: "Male",
            occupation: "Motorcycle Mechanic",
            chiefComplaint: "3-month history of right arm weakness and numbness following motorcycle accident",
            history: "High-speed motorcycle accident 3 months ago with right shoulder trauma. Initially had complete right arm paralysis. Some recovery occurred but persistent weakness and numbness remain. Weakness affects entire arm from shoulder down. Numbness along medial arm and forearm.",
            pmh: "No significant past medical history",
            medications: "Gabapentin, physical therapy",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Brachial plexopathy (lower trunk/medial cord)",
            "Multiple radiculopathies (C8-T1)",
            "Ulnar neuropathy at elbow",
            "Median neuropathy at wrist",
            "Thoracic outlet syndrome"
        ],
        physicalExam: {
            inspection: "Winged scapula on right, mild atrophy of hand intrinsics",
            palpation: "Supraclavicular tenderness, no brachial plexus mass",
            rom: "Limited shoulder abduction and flexion",
            strength: "Deltoid 2/5, biceps 3/5, triceps 3/5, hand intrinsics 2/5 on right",
            sensation: "Decreased sensation along medial arm and forearm (C8-T1 distribution)",
            reflexes: "Absent biceps and triceps reflexes on right",
            specialTests: "Positive Tinel's sign over brachial plexus"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Severely reduced amplitude: 0.8 mV (normal >4.0 mV)",
                interpretation: "Severe median nerve dysfunction"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Severely reduced amplitude: 1.2 mV (normal >6.0 mV)",
                interpretation: "Severe ulnar nerve dysfunction"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Widespread sensory involvement"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Absent sensory response",
                interpretation: "Medial cord/lower trunk involvement"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "No responses obtained",
                interpretation: "Plexus involvement"
            }
        ],
        emgStudies: [
            {
                muscle: "Cervical paraspinals",
                findings: "Normal",
                interpretation: "Root level spared"
            },
            {
                muscle: "Serratus anterior",
                findings: "Denervation changes",
                interpretation: "Long thoracic nerve involvement"
            },
            {
                muscle: "Hand intrinsics",
                findings: "Severe denervation with poor reinnervation",
                interpretation: "Lower trunk/medial cord lesion"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Right Brachial Plexopathy (Lower Trunk/Medial Cord Pattern)",
        explanation: "Post-traumatic brachial plexopathy affecting primarily the lower trunk/medial cord, causing weakness in C8-T1 distribution with sparing of cervical paraspinals (distinguishing from root avulsion). Pattern of multiple nerve involvement localizes to plexus level."
    },
    's1radiculopathy': {
        title: "Lower Back Pain with Calf Weakness",
        presentation: {
            age: 44,
            gender: "Male",
            occupation: "Warehouse Worker",
            chiefComplaint: "2-month history of lower back pain radiating down leg with calf weakness",
            history: "Gradual onset lower back pain after lifting boxes. Pain radiates from low back down posterior leg to lateral foot. Difficulty walking on tiptoes and going up stairs. Numbness in lateral foot and little toe. Pain worse with prolonged standing.",
            pmh: "Previous lumbar strain 3 years ago",
            medications: "Ibuprofen, cyclobenzaprine",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "S1 radiculopathy",
            "Sciatic neuropathy",
            "Tibial neuropathy",
            "Lumbosacral plexopathy",
            "Gastrocnemius tear"
        ],
        physicalExam: {
            inspection: "Slightly antalgic gait, difficulty with toe walking",
            palpation: "Lumbar paraspinal muscle spasm, tender over L5-S1 region",
            rom: "Limited lumbar flexion",
            strength: "Plantarflexors 4/5, gastrocnemius 3/5 on right. EHL and tibialis anterior normal.",
            sensation: "Decreased sensation in S1 dermatome (lateral foot, little toe)",
            reflexes: "Achilles reflex absent on right (0+). Patellar normal.",
            specialTests: "Positive straight leg raise at 50 degrees on right"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "L5 distribution spared"
            },
            {
                name: "Tibial Motor (AH)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 8.2 mV (normal >10 mV)",
                interpretation: "Mild axonal loss affecting tibial nerve"
            },
            {
                name: "Fibular Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal amplitude and latency (Sensory NCS normal in radiculopathy)",
                interpretation: "S1 sensory nerves intact"
            },
            {
                name: "H-Reflex",
                result: "abnormal",
                findings: "Absent H-reflex on right, normal on left",
                interpretation: "Classic finding in S1 radiculopathy"
            }
        ],
        emgStudies: [
            {
                muscle: "Lumbar paraspinals (L5-S1)",
                findings: "Positive sharp waves and fibrillations",
                interpretation: "Acute denervation"
            },
            {
                muscle: "Gastrocnemius medial head",
                findings: "Positive sharp waves, reduced recruitment",
                interpretation: "S1 root involvement"
            },
            {
                muscle: "Gluteus maximus",
                findings: "Denervation changes",
                interpretation: "Inferior gluteal nerve (S1 root)"
            },
            {
                muscle: "Tibialis anterior",
                findings: "Normal",
                interpretation: "L5 distribution spared"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Right S1 Radiculopathy",
        explanation: "S1 radiculopathy with classic plantarflexor weakness, absent Achilles reflex, and lateral foot sensory loss. H-reflex absence is a sensitive early finding in S1 radiculopathy. EMG shows denervation in S1 myotomes with sparing of L5 muscles."
    },
    'radialneuropathy': {
        title: "Wrist Drop After Saturday Night",
        presentation: {
            age: 35,
            gender: "Male",
            occupation: "Software Developer",
            chiefComplaint: "Acute onset inability to extend wrist and fingers after falling asleep with arm over chair",
            history: "Woke up yesterday morning unable to extend right wrist or fingers. Had been drinking the night before and fell asleep in chair with right arm draped over the back (Saturday night palsy). No pain, just weakness. Can still flex fingers and wrist normally.",
            pmh: "No significant medical history",
            medications: "None"
        },
        expectedDifferential: [
            "Radial neuropathy (spiral groove)",
            "Posterior interosseous nerve (PIN) syndrome",
            "C7 radiculopathy",
            "Brachial plexopathy",
            "Lead poisoning"
        ],
        physicalExam: {
            inspection: "Right wrist drop, inability to extend fingers at MCP joints",
            palpation: "No tenderness over spiral groove or elbow",
            rom: "Full passive ROM, limited active extension",
            strength: "Wrist extensors 0/5, finger extensors 0/5, triceps 5/5, brachioradialis 5/5",
            sensation: "Decreased sensation in first web space (superficial radial distribution)",
            reflexes: "Triceps reflex normal. Brachioradialis present but weak due to positioning.",
            specialTests: "Negative Tinel's at elbow, positive wrist drop sign"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Radial component absent",
                interpretation: "Confirms radial nerve involvement"
            }
        ],
        emgStudies: [
            {
                muscle: "Extensor carpi radialis longus",
                findings: "Normal (innervated above spiral groove)",
                interpretation: "Lesion at spiral groove level"
            },
            {
                muscle: "Extensor carpi radialis brevis",
                findings: "No voluntary activity",
                interpretation: "Posterior interosseous nerve involvement"
            },
            {
                muscle: "Extensor digitorum communis",
                findings: "No voluntary activity",
                interpretation: "Complete posterior interosseous nerve palsy"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Radial Neuropathy at Spiral Groove (Saturday Night Palsy)",
        explanation: "Classic compression of radial nerve at spiral groove from prolonged pressure. Spares triceps and ECRL (innervated proximal to compression) but affects posterior interosseous nerve causing wrist and finger extensor weakness with sensory loss in superficial radial distribution."
    },
    'peronealpalsy': {
        title: "Foot Drop After Knee Surgery",
        presentation: {
            age: 29,
            gender: "Female",
            occupation: "Teacher",
            chiefComplaint: "Inability to lift foot up and numbness on top of foot since knee arthroscopy 2 weeks ago",
            history: "Underwent knee arthroscopy 2 weeks ago for meniscal tear. Woke up from surgery with foot drop and numbness over dorsum of foot. Initially attributed to positioning during surgery. No improvement since discharge. Trips frequently due to toe catching.",
            pmh: "Right meniscal tear",
            medications: "Ibuprofen, physical therapy",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Peroneal neuropathy at fibular head",
            "L5 radiculopathy",
            "Sciatic neuropathy",
            "Anterior compartment syndrome",
            "Lumbosacral plexopathy"
        ],
        physicalExam: {
            inspection: "Right foot drop, steppage gait pattern",
            palpation: "Tenderness over fibular head, no calf tenderness",
            rom: "Full passive dorsiflexion, limited active dorsiflexion",
            strength: "Tibialis anterior 1/5, EHL 2/5, eversion 2/5. Plantarflexion and inversion normal.",
            sensation: "Decreased sensation over dorsum of foot and lateral leg",
            reflexes: "Achilles reflex normal. No patellar reflex abnormality.",
            specialTests: "Positive Tinel's sign over fibular head"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "abnormal",
                findings: "Prolonged distal latency: 7.2 ms. Reduced CMAP amplitude: 0.8 mV (normal >2.5 mV).",
                interpretation: "Severe peroneal nerve dysfunction at fibular head level"
            },
            {
                name: "Tibial Motor (AH)",
                result: "normal",
                findings: "Normal amplitude and conduction velocity",
                interpretation: "Tibial nerve spared"
            },
            {
                name: "Fibular Sensory",
                result: "abnormal",
                findings: "Absent sensory response",
                interpretation: "Superficial peroneal nerve involvement"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Sural nerve function preserved"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency: 30.1 ms",
                interpretation: "Normal S1 reflex arc"
            }
        ],
        emgStudies: [
            {
                muscle: "Tibialis anterior",
                findings: "No voluntary activity, denervation changes",
                interpretation: "Complete deep peroneal nerve palsy"
            },
            {
                muscle: "Extensor digitorum longus",
                findings: "No voluntary activity",
                interpretation: "Deep peroneal nerve involvement"
            },
            {
                muscle: "Peroneus longus",
                findings: "Denervation changes",
                interpretation: "Superficial peroneal nerve involvement"
            },
            {
                muscle: "Tibialis posterior",
                findings: "Normal",
                interpretation: "Tibial nerve spared"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Common Peroneal Neuropathy at Fibular Head (Post-surgical)",
        explanation: "Iatrogenic peroneal nerve injury at fibular head from surgical positioning or compression. Complete palsy affecting both deep (dorsiflexion) and superficial (eversion) peroneal nerves with sparing of tibial nerve function."
    },
    'mg': {
        title: "Fatigable Weakness and Ptosis",
        presentation: {
            age: 31,
            gender: "Female",
            occupation: "Graphic Designer",
            chiefComplaint: "3-month history of fatigue, droopy eyelids, and weakness that worsens throughout the day",
            history: "Gradual onset of fatigue and weakness that gets worse with activity and improves with rest. Noticed droopy eyelids, especially in evening. Difficulty chewing food by end of meals. Voice becomes nasal after talking for extended periods. Shortness of breath with minimal exertion.",
            pmh: "Thyroid disease (Hashimoto's thyroiditis)",
            medications: "Levothyroxine",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Myasthenia Gravis",
            "Lambert-Eaton Myasthenic Syndrome",
            "Botulism",
            "Hyperthyroidism",
            "Mitochondrial myopathy",
            "Oculopharyngeal muscular dystrophy"
        ],
        physicalExam: {
            inspection: "Bilateral ptosis, worse on left. Facial weakness.",
            palpation: "No muscle tenderness or atrophy",
            rom: "Full ROM at all joints",
            strength: "Proximal weakness (4/5) that worsens with repetitive testing. Normal strength initially.",
            sensation: "Normal throughout",
            reflexes: "Normal (2+) throughout",
            specialTests: "Positive ice pack test (ptosis improves), positive edrophonium test"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency and amplitude",
                interpretation: "Normal peripheral nerve function"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "No nerve involvement"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal peak latency and amplitude",
                interpretation: "Normal sensory nerve function"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Repetitive Nerve Stimulation (3Hz)",
                result: "abnormal",
                findings: "15% decrement in amplitude with slow repetitive stimulation",
                interpretation: "Neuromuscular junction dysfunction"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                findings: "Normal motor unit morphology, normal recruitment",
                interpretation: "No myopathy"
            },
            {
                muscle: "Biceps",
                findings: "Normal spontaneous activity and motor units",
                interpretation: "No denervation"
            },
            {
                muscle: "Orbicularis oculi",
                findings: "Increased jitter on single fiber EMG",
                interpretation: "Facial muscle involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Myasthenia Gravis (Generalized)",
        explanation: "Classic presentation of myasthenia gravis with fatigable weakness, ptosis, and bulbar symptoms. Repetitive nerve stimulation shows decremental response characteristic of postsynaptic neuromuscular junction disorder. Single fiber EMG confirms transmission defect."
    },
    'tarsal': {
        title: "Foot Pain and Numbness",
        presentation: {
            age: 42,
            gender: "Female",
            occupation: "Nurse",
            chiefComplaint: "6-month history of burning foot pain and numbness, worse at night",
            history: "Gradual onset burning pain and numbness on bottom of foot, radiating to toes. Pain worse at night and when wearing shoes. Standing for long periods at work exacerbates symptoms. Some relief with rest and elevation. No back pain or leg symptoms.",
            pmh: "Diabetes mellitus type 2, well-controlled",
            medications: "Metformin, gabapentin",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Tarsal tunnel syndrome",
            "S1 radiculopathy",
            "Tibial neuropathy",
            "Plantar fasciitis",
            "Peripheral polyneuropathy"
        ],
        physicalExam: {
            inspection: "No visible deformity or swelling",
            palpation: "Tenderness over tarsal tunnel, positive Tinel's sign",
            rom: "Full ankle ROM",
            strength: "Intrinsic foot muscles weak (4/5), other muscles normal",
            sensation: "Decreased sensation on plantar surface of foot",
            reflexes: "Achilles reflex normal bilaterally",
            specialTests: "Positive Tinel's sign over tarsal tunnel, negative straight leg raise"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Tibial Motor (AH)",
                result: "abnormal",
                findings: "Prolonged distal latency to Abductor Hallucis: 6.5 ms (normal <6.0 ms).",
                interpretation: "Distal tibial nerve compression at ankle"
            },
            {
                name: "Fibular Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency: 30.8 ms",
                interpretation: "Normal reflex arc"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor hallucis",
                findings: "Denervation changes with reduced recruitment",
                interpretation: "Medial plantar nerve involvement"
            },
            {
                muscle: "Flexor digitorum brevis",
                findings: "Mild denervation changes",
                interpretation: "Lateral plantar nerve involvement"
            },
            {
                muscle: "Tibialis posterior",
                findings: "Normal",
                interpretation: "Proximal tibial nerve spared"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Tarsal Tunnel Syndrome (Tibial Neuropathy at Ankle)",
        explanation: "Compression of tibial nerve and its branches (medial and lateral plantar nerves) at the tarsal tunnel. Prolonged standing and diabetes are risk factors. Studies show distal tibial nerve involvement with sparing of proximal branches."
    },
    'mildcts': {
        title: "Early Hand Tingling in Pregnancy",
        presentation: {
            age: 28,
            gender: "Female",
            occupation: "Teacher",
            chiefComplaint: "3-week history of mild tingling in fingers, mainly at night",
            history: "Currently 32 weeks pregnant. Started noticing mild tingling in thumb, index, and middle fingers that wakes her up at night. Shaking hands provides some relief. No weakness or dropping objects. Symptoms are intermittent and mild. No previous hand problems.",
            pmh: "Pregnant (G2P1), no complications",
            medications: "Prenatal vitamins",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Mild Carpal Tunnel Syndrome",
            "C6 radiculopathy",
            "Pronator teres syndrome",
            "Brachial plexopathy",
            "Polyneuropathy"
        ],
        physicalExam: {
            inspection: "No visible atrophy or deformity",
            palpation: "Mild tenderness over carpal tunnel, no swelling",
            rom: "Full ROM at all joints",
            strength: "5/5 strength throughout, normal pinch strength",
            sensation: "Subjective mild numbness in median distribution, objective sensation intact",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Mildly positive Phalen's test (symptoms at 45 seconds), negative Tinel's sign"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency: 3.2 ms. Normal CMAP amplitude: 8.5 mV",
                interpretation: "No motor involvement"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "Normal ulnar function"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Mildly prolonged peak latency: 3.8 ms (normal <3.5 ms). Normal amplitude.",
                interpretation: "Mild median sensory nerve dysfunction"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal ulnar function"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Prolonged peak latency difference: 0.6 ms (normal <0.4 ms)",
                interpretation: "Sensitive indicator of early carpal tunnel syndrome"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis",
                findings: "Normal spontaneous activity, normal motor units",
                interpretation: "No denervation"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Mild Carpal Tunnel Syndrome (Pregnancy-related)",
        explanation: "Early/mild CTS with purely sensory findings. Pregnancy-related fluid retention commonly causes reversible median nerve compression. Palm-wrist comparison study is sensitive for early CTS when routine sensory studies are borderline."
    },
    'severects': {
        title: "Severe Hand Weakness and Atrophy",
        presentation: {
            age: 58,
            gender: "Male",
            occupation: "Retired Mechanic",
            chiefComplaint: "2-year history of progressive hand weakness with visible muscle wasting",
            history: "Started with nighttime numbness 2 years ago, gradually worsened. Now has constant numbness in thumb, index, and middle fingers. Significant weakness gripping tools, difficulty with buttons and fine motor tasks. Notices visible muscle loss in thumb area. Denies trauma or neck pain.",
            pmh: "Diabetes mellitus type 2",
            medications: "Metformin",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Severe Carpal Tunnel Syndrome",
            "Median neuropathy at palm",
            "C6 radiculopathy",
            "Motor neuron disease",
            "Lower trunk plexopathy"
        ],
        physicalExam: {
            inspection: "Marked thenar atrophy, visible muscle wasting",
            palpation: "Firm, non-tender mass over carpal tunnel",
            rom: "Full ROM but weak thumb opposition",
            strength: "Abductor pollicis brevis 2/5, opponens pollicis 2/5, severe pinch weakness",
            sensation: "Complete sensory loss in median distribution",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Unable to perform Phalen's test due to weakness, no Tinel's sign"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Severely prolonged distal latency: 8.1 ms. Markedly reduced amplitude: 1.2 mV.",
                interpretation: "Severe median motor nerve dysfunction"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "Ulnar nerve spared"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "No sensory response elicitable",
                interpretation: "Severe median sensory nerve dysfunction"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal ulnar sensory function"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Median response absent, radial response normal.",
                interpretation: "Severe median nerve entrapment"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis",
                findings: "Severe chronic denervation with poor reinnervation",
                interpretation: "Severe chronic median nerve dysfunction"
            },
            {
                muscle: "Opponens pollicis",
                findings: "Chronic denervation changes",
                interpretation: "Recurrent motor branch involvement"
            },
            {
                muscle: "Flexor pollicis longus",
                findings: "Chronic denervation",
                interpretation: "Anterior interosseous nerve involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Severe Carpal Tunnel Syndrome with Thenar Atrophy",
        explanation: "End-stage CTS with severe motor and sensory involvement, thenar atrophy, and poor prognosis for recovery. Diabetes is a risk factor for more severe neuropathy. Surgical decompression urgent to prevent further deterioration."
    },
    'acutecutspost': {
        title: "Acute Hand Numbness After Elbow Fracture",
        presentation: {
            age: 24,
            gender: "Male",
            occupation: "Student",
            chiefComplaint: "Acute onset numbness and weakness in hand 3 days after elbow fracture surgery",
            history: "Fell off bicycle 1 week ago, sustained elbow fracture requiring ORIF. Surgery went well initially. Three days post-op, developed acute numbness in ring and little fingers with weakness pinching. No pre-surgical hand symptoms. Concerned about nerve injury.",
            pmh: "No significant medical history",
            medications: "Oxycodone, ibuprofen",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Acute Cubital Tunnel Syndrome",
            "Ulnar neuropathy at wrist",
            "Medial cord plexopathy",
            "Post-operative infection",
            "C8 radiculopathy"
        ],
        physicalExam: {
            inspection: "Surgical incision healing well, mild swelling around elbow",
            palpation: "Tender over surgical site, positive Tinel's over cubital tunnel",
            rom: "Limited elbow flexion due to post-surgical restrictions",
            strength: "Interosseous muscles 3/5, FDP (ring/little) 4/5, FCU 4/5",
            sensation: "Decreased sensation in ulnar distribution (ring/little fingers)",
            reflexes: "Normal throughout",
            specialTests: "Positive elbow flexion test, positive Tinel's at cubital tunnel"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal median nerve function"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Conduction block across elbow (50% amplitude drop). Normal distal latency.",
                interpretation: "Acute ulnar nerve dysfunction at elbow level"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Severely reduced amplitude: 2 μV (normal >10 μV).",
                interpretation: "Acute ulnar sensory involvement"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal comparison"
            }
        ],
        emgStudies: [
            {
                muscle: "First dorsal interosseous",
                findings: "Reduced recruitment, no denervation (too early)",
                interpretation: "Acute ulnar nerve dysfunction"
            },
            {
                muscle: "Flexor carpi ulnaris",
                findings: "Reduced recruitment",
                interpretation: "Ulnar nerve at elbow level"
            },
            {
                muscle: "Flexor digitorum profundus (ring)",
                findings: "Mildly reduced recruitment",
                interpretation: "Ulnar nerve involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Acute Post-Surgical Cubital Tunnel Syndrome",
        explanation: "Iatrogenic ulnar neuropathy following elbow surgery, likely from surgical trauma, swelling, or positioning. Conduction block pattern suggests compressive/demyelinating injury with potential for recovery if decompressed early."
    },
    'lumboplexopathy': {
        title: "Hip Pain and Leg Weakness After Surgery",
        presentation: {
            age: 67,
            gender: "Female",
            occupation: "Retired",
            chiefComplaint: "Right leg weakness and numbness following hip replacement surgery 6 weeks ago",
            history: "Underwent right total hip replacement 6 weeks ago for severe arthritis. Post-operatively developed weakness in right leg, difficulty walking, and numbness over anterior thigh. Initially attributed to surgical pain but weakness persists. Can't lift leg straight up or extend knee strongly.",
            pmh: "Osteoarthritis, hypertension",
            medications: "Lisinopril, tramadol, physical therapy",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Lumbosacral plexopathy",
            "Femoral neuropathy",
            "L4 radiculopathy",
            "Sciatic neuropathy",
            "Piriformis syndrome"
        ],
        physicalExam: {
            inspection: "Surgical scar healing well, mild quadriceps atrophy",
            palpation: "No tenderness over surgical site, no palpable masses",
            rom: "Limited hip flexion due to weakness",
            strength: "Hip flexors 2/5, quadriceps 3/5, hip adductors 3/5. Normal ankle dorsiflexion.",
            sensation: "Decreased sensation over anterior thigh and medial leg",
            reflexes: "Absent patellar reflex on right (0+). Achilles normal.",
            specialTests: "Negative straight leg raise, positive femoral stretch test"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "L5-S1 distribution spared"
            },
            {
                name: "Tibial Motor (AH)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Tibial nerve spared"
            },
            {
                name: "Fibular Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency: 31.2 ms",
                interpretation: "Normal reflex arc"
            },
            {
                name: "Femoral Motor (Quadriceps)",
                result: "abnormal",
                findings: "Reduced amplitude (4.2 mV, normal >6 mV)",
                interpretation: "Femoral nerve dysfunction"
            }
        ],
        emgStudies: [
            {
                muscle: "Lumbar paraspinals",
                findings: "Normal",
                interpretation: "Root level spared"
            },
            {
                muscle: "Iliopsoas",
                findings: "Denervation changes",
                interpretation: "Femoral nerve involvement"
            },
            {
                muscle: "Quadriceps",
                findings: "Active denervation and reduced recruitment",
                interpretation: "Femoral nerve palsy"
            },
            {
                muscle: "Adductor longus",
                findings: "Mild denervation changes",
                interpretation: "Obturator nerve involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Lumbar Plexopathy (Post-Surgical) - Femoral and Obturator Nerve Pattern",
        explanation: "Post-surgical lumbar plexopathy affecting femoral and obturator nerves from retractor positioning, hematoma, or direct surgical trauma. Pattern of multiple nerve involvement in L2-L4 distribution with spared paraspinals localizes to plexus level."
    },
    'c8radiculopathy': {
        title: "Hand Weakness with Neck Pain",
        presentation: {
            age: 51,
            gender: "Female",
            occupation: "Administrative Assistant",
            chiefComplaint: "6-week history of neck pain radiating to hand with weakness gripping",
            history: "Gradual onset neck pain radiating down medial arm to ring and little fingers. Weakness gripping small objects and difficulty with fine motor tasks. Pain worse with neck movement. Numbness in ring and little fingers. No trauma but poor workplace ergonomics.",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "C8 radiculopathy",
            "Ulnar neuropathy at elbow",
            "Lower trunk plexopathy",
            "Median neuropathy (AION)",
            "Thoracic outlet syndrome"
        ],
        physicalExam: {
            inspection: "Mild intrinsic hand muscle atrophy",
            palpation: "Cervical paraspinal tenderness at C7-T1 level",
            rom: "Limited cervical lateral flexion",
            strength: "Hand intrinsics 4/5, FDP (ring/little) 4/5, grip strength reduced",
            sensation: "Decreased sensation in C8 dermatome (ring/little fingers, medial hand)",
            reflexes: "Normal biceps and triceps, finger flexor reflex hyperactive",
            specialTests: "Positive Spurling's test, negative Tinel's at elbow/wrist"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 5.2 mV (normal >6.0 mV).",
                interpretation: "Median nerve involvement (C8-T1 component)"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Mildly reduced CMAP amplitude: 6.8 mV (normal >8.0 mV).",
                interpretation: "Ulnar nerve involvement (C8-T1 component)"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal amplitude and latency (Sensory NCS normal in radiculopathy)",
                interpretation: "Normal sensory conduction"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory function"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Cervical paraspinals (C7-T1)",
                findings: "Positive sharp waves and fibrillations",
                interpretation: "Acute denervation"
            },
            {
                muscle: "First dorsal interosseous",
                findings: "Denervation changes with reduced recruitment",
                interpretation: "C8-T1 root involvement"
            },
            {
                muscle: "Abductor digiti minimi",
                findings: "Active denervation",
                interpretation: "C8-T1 root lesion"
            },
            {
                muscle: "Flexor digitorum profundus (ring)",
                findings: "Denervation changes",
                interpretation: "C8 root involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C8 Radiculopathy",
        explanation: "C8 radiculopathy with classic hand intrinsic weakness and sensory loss in C8 distribution. Both median and ulnar nerve amplitudes reduced due to C8 root lesion affecting both nerves. Cervical paraspinal denervation confirms root level pathology."
    },
    'guyon': {
        title: "Hand Numbness After Cycling",
        presentation: {
            age: 34,
            gender: "Male",
            occupation: "Accountant",
            chiefComplaint: "Numbness and weakness in ring and little fingers after long bike ride",
            history: "Avid cyclist who completed 100-mile ride 2 weeks ago. Developed numbness in ring and little fingers during ride that persisted. Weakness gripping and pinching with thumb and little finger. No elbow pain or neck symptoms. Uses drop handlebars with prolonged pressure on palms.",
            pmh: "No significant medical history",
            medications: "None"
        },
        expectedDifferential: [
            "Guyon's canal syndrome",
            "Ulnar neuropathy at elbow",
            "C8 radiculopathy",
            "Hypothenar hammer syndrome",
            "Lower trunk plexopathy"
        ],
        physicalExam: {
            inspection: "Mild hypothenar atrophy, no interosseous atrophy",
            palpation: "Tenderness over Guyon's canal, no elbow tenderness",
            rom: "Full ROM at all joints",
            strength: "Hypothenar muscles 4/5, interossei normal, FCU normal",
            sensation: "Decreased sensation in little finger and ulnar half of ring finger",
            reflexes: "Normal throughout",
            specialTests: "Negative Tinel's at elbow, positive Tinel's at Guyon's canal"
        },
        ncsStudies: [
            // Motor Studies
            {
                name: "Median Motor (Abd Poll Brev)",
                type: "motor",
                site: "Wrist",
                result: "normal"
            },
            {
                name: "Median Motor (Abd Poll Brev)",
                type: "motor",
                site: "Elbow",
                result: "normal"
            },
            {
                name: "Ulnar Motor (Abd Dig Minimi)",
                type: "motor",
                site: "Wrist",
                onset: 4.8,
                normOnset: "<4.2",
                amp: 3.2,
                normAmp: ">3.0",
                negDur: 5.31,
                site1: "B Elbow",
                site2: "Wrist",
                deltaO: 3.9,
                distance: 21.0,
                velocity: 54,
                normVelocity: ">53",
                result: "abnormal",
                findings: "Prolonged distal motor latency.",
                interpretation: "Ulnar neuropathy at or distal to wrist"
            },
            {
                name: "Ulnar Motor (Abd Dig Minimi)",
                type: "motor",
                site: "B Elbow",
                onset: 8.7,
                normOnset: "",
                amp: 3.1,
                normAmp: "",
                negDur: 5.63,
                site1: "A Elbow",
                site2: "B Elbow",
                deltaO: 2.5,
                distance: 10.0,
                velocity: 40,
                normVelocity: ">53",
                result: "normal",
                findings: "Normal forearm conduction.",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Motor (1st Dor Int)",
                type: "motor",
                site: "Wrist",
                onset: 5.2,
                normOnset: "<4.5",
                amp: 2.8,
                normAmp: ">3.0",
                negDur: 5.47,
                site1: "B Elbow",
                site2: "Wrist",
                deltaO: 3.7,
                distance: 20.5,
                velocity: 55,
                normVelocity: ">53",
                result: "abnormal",
                findings: "Reduced amplitude and prolonged latency.",
                interpretation: "Deep motor branch involvement"
            },
            // Sensory Studies
            {
                name: "Median Anti Sensory (Digit 3)",
                type: "sensory",
                site: "Wrist",
                result: "normal"
            },
            {
                name: "Ulnar Anti Sensory (Digit 5)",
                type: "sensory",
                site: "Wrist",
                peak: 3.9,
                normPeak: "<3.8",
                amp: 8.4,
                normAmp: ">15.0",
                site1: "Wrist",
                site2: "5th Digit",
                deltaP: 3.9,
                distance: 14.0,
                velocity: 36,
                normVelocity: ">38",
                result: "abnormal",
                findings: "Reduced amplitude and prolonged peak latency.",
                interpretation: "Superficial sensory branch involvement"
            },
            {
                name: "Ulnar DorsCutan Anti Sensory",
                type: "sensory",
                site: "Wrist",
                result: "normal"
            },
            {
                name: "Radial Anti Sensory (Dorsum)",
                type: "sensory",
                site: "Wrist",
                result: "normal"
            },
            // Comparison Studies
            {
                name: "Median vs Ulnar Comparison (Digit 4)",
                type: "comparison",
                site: "Wrist",
                peak: 2.5,
                amp: 88.4,
                site1: "Median",
                site2: "Ulnar",
                deltaP: 0.8,
                result: "abnormal",
                findings: "Abnormal latency difference (>0.4 ms)",
                interpretation: "Ulnar neuropathy at wrist"
            }
        ],
        emgStudies: [
            {
                side: "Right",
                muscle: "1stDorInt",
                nerve: "Ulnar",
                root: "C8-T1",
                insAct: "Nml",
                fibs: "2+",
                psw: "2+",
                amp: "Nml",
                dur: "Nml",
                poly: 0,
                recrt: "Reduced",
                intPat: "Reduced",
                comment: "Active denervation"
            },
            {
                side: "Right",
                muscle: "Abd Poll Brev",
                nerve: "Median",
                root: "C8-T1",
                result: "normal"
            },
            {
                side: "Right",
                muscle: "ExtIndicis",
                nerve: "Radial (Post Int)",
                root: "C7-8",
                result: "normal"
            },
            {
                side: "Right",
                muscle: "PronatorTeres",
                nerve: "Median",
                root: "C6-7",
                result: "normal"
            },
            {
                side: "Right",
                muscle: "Triceps",
                nerve: "Radial",
                root: "C6-7-8",
                result: "normal"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal (Cyclist's Palsy)",
        explanation: "Compression of ulnar nerve at Guyon's canal from prolonged pressure on handlebars. Affects superficial sensory branch and deep motor branch to hypothenar muscles while sparing interossei (which branch more proximally). Classic cycling injury."
    },
    'lumbosacralplexopathy': {
        title: "Bilateral Leg Weakness After Prolonged Labor",
        presentation: {
            age: 26,
            gender: "Female",
            occupation: "Marketing Coordinator",
            chiefComplaint: "Bilateral leg weakness and numbness after prolonged childbirth 6 weeks ago",
            history: "Had difficult 18-hour labor with prolonged second stage requiring forceps delivery. Immediately post-delivery noticed bilateral leg weakness and numbness. Right leg more affected than left. Difficulty walking, frequent falls. Numbness over anterior thighs and medial legs bilaterally.",
            pmh: "Uncomplicated pregnancy until delivery",
            medications: "Iron supplements, physical therapy",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Obstetric lumbosacral plexopathy",
            "Bilateral femoral neuropathy",
            "L4 radiculopathy",
            "Meralgia paresthetica",
            "Polyneuropathy of pregnancy"
        ],
        physicalExam: {
            inspection: "Bilateral quadriceps atrophy, more pronounced on right",
            palpation: "No masses or tenderness over pelvis",
            rom: "Limited hip flexion due to weakness",
            strength: "Hip flexors 3/5 bilaterally, quadriceps 2/5 right, 3/5 left",
            sensation: "Decreased sensation over anterior thighs and medial legs bilaterally",
            reflexes: "Absent patellar reflexes bilaterally, normal Achilles reflexes",
            specialTests: "Negative straight leg raise, positive femoral stretch test bilaterally"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "L5-S1 spared"
            },
            {
                name: "Tibial Motor (AH)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Tibial nerve spared"
            },
            {
                name: "Fibular Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency: 30.2 ms",
                interpretation: "Normal"
            },
            {
                name: "Femoral Motor (Quadriceps)",
                result: "abnormal",
                findings: "Severely reduced CMAP amplitudes bilaterally (2.1 mV Right, 3.8 mV Left).",
                interpretation: "Bilateral femoral nerve dysfunction"
            }
        ],
        emgStudies: [
            {
                muscle: "Lumbar paraspinals",
                findings: "Normal",
                interpretation: "Root level spared"
            },
            {
                muscle: "Iliopsoas - Bilateral",
                findings: "Denervation changes bilaterally",
                interpretation: "Bilateral femoral nerve involvement"
            },
            {
                muscle: "Quadriceps - Right",
                findings: "Severe denervation with poor reinnervation",
                interpretation: "Severe femoral nerve palsy"
            },
            {
                muscle: "Quadriceps - Left",
                findings: "Mild denervation changes",
                interpretation: "Mild femoral nerve involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Bilateral Lumbosacral Plexopathy (Obstetric) - Femoral Nerve Pattern",
        explanation: "Bilateral femoral nerve injury from prolonged labor with fetal head compression against maternal pelvis. Classic obstetric complication affecting lumbosacral plexus, typically involving femoral and lateral femoral cutaneous nerves."
    },
    'pinoneuropathy': {
        title: "Thumb Weakness After Wrist Fracture",
        presentation: {
            age: 39,
            gender: "Female",
            occupation: "Physical Therapist",
            chiefComplaint: "Inability to pinch and weakness making 'OK' sign 8 weeks after wrist fracture",
            history: "Fell on outstretched hand 8 weeks ago, sustained distal radius fracture requiring ORIF with volar plate. Post-operatively developed inability to pinch tip of thumb to tip of index finger. Can't make 'OK' sign or pick up small objects. No numbness. Other hand functions normal.",
            pmh: "No significant medical history",
            medications: "Ibuprofen, physical therapy",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Anterior interosseous nerve (AIN) palsy",
            "Carpal tunnel syndrome",
            "Pronator syndrome",
            "C6/C7 radiculopathy",
            "Brachial plexopathy"
        ],
        physicalExam: {
            inspection: "No visible atrophy, well-healed surgical scar",
            palpation: "No tenderness over carpal tunnel or surgical site",
            rom: "Full ROM at wrist and fingers",
            strength: "FPL 2/5, FDP (index) 2/5, all other muscles normal including APB",
            sensation: "Normal sensation throughout hand",
            reflexes: "Normal throughout",
            specialTests: "Positive anterior interosseous nerve sign (can't make 'OK' sign)"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency: 3.4 ms. Normal CMAP amplitude: 9.8 mV.",
                interpretation: "Main trunk of median nerve normal"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "Normal"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal sensory function"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Flexor pollicis longus",
                findings: "No voluntary activity, denervation changes",
                interpretation: "Anterior interosseous nerve palsy"
            },
            {
                muscle: "Flexor digitorum profundus (index)",
                findings: "No voluntary activity",
                interpretation: "Anterior interosseous nerve involvement"
            },
            {
                muscle: "Pronator quadratus",
                findings: "Denervation changes",
                interpretation: "Anterior interosseous nerve palsy"
            },
            {
                muscle: "Abductor pollicis brevis",
                findings: "Normal",
                interpretation: "Main median nerve trunk spared"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Anterior Interosseous Nerve Palsy (Post-Surgical)",
        explanation: "Isolated anterior interosseous nerve (pure motor branch of median nerve) palsy following volar plate ORIF. Classic presentation with inability to pinch (FPL and FDP index weakness) with preserved sensation and normal APB. Often iatrogenic from surgical approach."
    },
    'lamberteatonmyasthenic': {
        title: "Progressive Weakness in Cancer Patient",
        presentation: {
            age: 62,
            gender: "Male",
            occupation: "Retired Electrician",
            chiefComplaint: "6-month history of progressive weakness and fatigue, especially in legs",
            history: "Gradual onset proximal weakness, especially in legs. Difficulty standing from chair and climbing stairs. Weakness improves with activity initially but then worsens. Dry mouth and some difficulty swallowing. Recently diagnosed with small cell lung cancer. Family concerned about progression.",
            pmh: "Small cell lung cancer (recently diagnosed), smoking history",
            medications: "Chemotherapy regimen, prednisone",
            familyHistory: "Father with history of lung cancer"
        },
        expectedDifferential: [
            "Lambert-Eaton Myasthenic Syndrome (LEMS)",
            "Myasthenia gravis",
            "Polymyositis",
            "ALS",
            "Cervical myelopathy"
        ],
        physicalExam: {
            inspection: "Mild proximal muscle atrophy, no fasciculations",
            palpation: "No muscle tenderness",
            rom: "Full ROM but limited by weakness",
            strength: "Proximal weakness (3/5) that improves with initial exercise then fatigues",
            sensation: "Normal throughout",
            reflexes: "Diminished (1+) but improve with exercise",
            specialTests: "Strength improves with brief exercise, then fatigues"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Low baseline amplitude: 2.8 mV (normal >4.0 mV). Normal latency.",
                interpretation: "Reduced compound muscle action potential"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Low baseline amplitude: 3.2 mV (normal >6.0 mV).",
                interpretation: "Reduced CMAP amplitude"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Sensory function preserved"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.2 ms",
                interpretation: "Normal"
            },
            {
                name: "High-Frequency RNS / Post-Exercise",
                result: "abnormal",
                findings: "400% increment in CMAP amplitude after 10s of exercise",
                interpretation: "Classic Lambert-Eaton pattern (presynaptic NMJ disorder)"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                findings: "Small amplitude motor units with normal morphology",
                interpretation: "Reduced recruitment due to NMJ dysfunction"
            },
            {
                muscle: "Quadriceps",
                findings: "Low amplitude voluntary units, no denervation",
                interpretation: "Neuromuscular transmission defect"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Lambert-Eaton Myasthenic Syndrome (Paraneoplastic)",
        explanation: "Presynaptic neuromuscular junction disorder associated with small cell lung cancer. Characterized by low baseline CMAP amplitudes with dramatic increment (>100%) on high-frequency stimulation, opposite pattern from myasthenia gravis."
    },
    'inclusionbodymyositis': {
        title: "Slowly Progressive Weakness and Atrophy",
        presentation: {
            age: 68,
            gender: "Male",
            occupation: "Retired Teacher",
            chiefComplaint: "3-year history of slowly progressive weakness in arms and legs with muscle wasting",
            history: "Insidious onset weakness starting with difficulty gripping objects and frequent falls. Progressive weakness in both proximal and distal muscles. Noticed muscle wasting in forearms and thighs. Difficulty swallowing solids recently. No rash or arthritis. Family history of 'muscle disease' in uncle.",
            pmh: "Hypertension, type 2 diabetes",
            medications: "Lisinopril, metformin",
            familyHistory: "Uncle with muscle disease (unknown type)"
        },
        expectedDifferential: [
            "Inclusion Body Myositis (IBM)",
            "Polymyositis",
            "ALS",
            "Cervical myelopathy",
            "Peripheral neuropathy"
        ],
        physicalExam: {
            inspection: "Asymmetric muscle atrophy affecting quadriceps and forearm flexors",
            palpation: "Firm, atrophic muscles without tenderness",
            rom: "Limited by weakness and contractures",
            strength: "Asymmetric weakness: quadriceps 2/5, finger flexors 3/5, deltoids 4/5",
            sensation: "Normal throughout",
            reflexes: "Diminished (1+) throughout",
            specialTests: "No rash, no fasciculations at rest"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal distal latency and amplitude",
                interpretation: "Normal peripheral nerve function"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal parameters throughout",
                interpretation: "No nerve involvement"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal peak latency and amplitude",
                interpretation: "Normal sensory nerve function"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Quadriceps",
                findings: "Mixed myopathic and neurogenic changes, positive sharp waves",
                interpretation: "Inclusion body myositis pattern"
            },
            {
                muscle: "Biceps",
                findings: "Small polyphasic motor units with spontaneous activity",
                interpretation: "Active myopathy with denervation"
            },
            {
                muscle: "Forearm flexors",
                findings: "Mixed pattern: small motor units with fibrillations",
                interpretation: "Characteristic IBM pattern"
            },
            {
                muscle: "Deltoid",
                findings: "Predominantly myopathic changes",
                interpretation: "Proximal myopathy"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Inclusion Body Myositis",
        explanation: "Progressive inflammatory myopathy with characteristic asymmetric pattern affecting both proximal and distal muscles. EMG shows mixed myopathic and neurogenic features with spontaneous activity, distinguishing it from other inflammatory myopathies."
    },
    'pronatorteres': {
        title: "Forearm Pain with Hand Numbness",
        presentation: {
            age: 42,
            gender: "Female",
            occupation: "Tennis Instructor",
            chiefComplaint: "6-month history of forearm pain and hand numbness that worsens with activity",
            history: "Gradual onset pain in proximal forearm with numbness in thumb, index, and middle fingers. Pain and numbness worsen with repetitive forearm pronation during tennis instruction. Unlike typical carpal tunnel, symptoms present during day with activity rather than at night. No weakness with pinching.",
            pmh: "Tennis elbow 2 years ago, resolved",
            medications: "Ibuprofen PRN",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Pronator teres syndrome",
            "Carpal tunnel syndrome",
            "C6 radiculopathy",
            "Brachial plexopathy",
            "Tenosynovitis"
        ],
        physicalExam: {
            inspection: "No visible atrophy or deformity",
            palpation: "Tenderness over pronator teres muscle, no carpal tunnel tenderness",
            rom: "Full ROM but pain with resisted pronation",
            strength: "5/5 strength throughout including normal pinch strength",
            sensation: "Mild numbness in median distribution, including thenar eminence",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Negative Phalen's and Tinel's at wrist. Positive pronator teres compression test."
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Mildly prolonged distal latency: 4.2 ms (normal <4.2 ms - borderline). Normal amplitude.",
                interpretation: "Possible median nerve dysfunction"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "Normal"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Prolonged peak latency: 3.7 ms (normal <3.5 ms).",
                interpretation: "Median sensory nerve dysfunction"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.2 ms (Sparing of distal median fibers at wrist)",
                interpretation: "Normal comparison (supports proximal lesion vs CTS)"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis",
                findings: "Mild denervation changes",
                interpretation: "Median nerve involvement"
            },
            {
                muscle: "Flexor pollicis longus",
                findings: "Normal",
                interpretation: "AIN spared (branches before pronator teres)"
            },
            {
                muscle: "Pronator teres",
                findings: "Normal",
                interpretation: "Compression distal to muscle innervation"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Pronator Teres Syndrome (Proximal Median Neuropathy)",
        explanation: "Median nerve compression at pronator teres level. Key features: activity-related symptoms (vs nighttime CTS), thenar eminence numbness (palmar cutaneous involved), normal palm-wrist studies. Less common than CTS, requires high index of suspicion."
    },
    'sci': {
        title: "Acute Paralysis After Diving Accident",
        presentation: {
            age: 22,
            gender: "Male",
            occupation: "College Student",
            chiefComplaint: "Complete paralysis below chest level after diving accident 2 weeks ago",
            history: "Dove into shallow water 2 weeks ago, struck head on bottom. Immediate complete paralysis below nipple line. No sensation or movement in legs. Some arm movement preserved but hands weak. Bladder and bowel dysfunction. MRI shows complete C6 spinal cord injury.",
            pmh: "Previously healthy athlete",
            medications: "Methylprednisolone, catheter care",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Spinal cord injury",
            "Transverse myelitis",
            "Guillain-Barré Syndrome",
            "Conversion disorder",
            "Bilateral brachial plexopathy"
        ],
        physicalExam: {
            inspection: "Wheelchair-bound, complete flaccid paralysis below C6 level",
            palpation: "No pain sensation below injury level",
            rom: "No active movement below C6 dermatome",
            strength: "Biceps 4/5, triceps 0/5, complete paralysis below C7",
            sensation: "Complete sensory loss below C6 dermatome",
            reflexes: "Absent reflexes below injury, hyperreflexic biceps",
            specialTests: "Positive Babinski sign, spasticity in arms"
        },
        ncsStudies: [],
        emgStudies: [],
        requiresEMG: false,
        emgIndication: "NOT INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Complete C6 Spinal Cord Injury - EMG NOT INDICATED",
        explanation: "Complete spinal cord injury with clear anatomical level and imaging confirmation. EMG/NCS would be normal below the lesion as the peripheral nervous system is intact. Clinical picture and imaging provide definitive diagnosis.",
        educationalNote: "EMG/NCS studies evaluate the peripheral nervous system. In complete spinal cord injuries, the peripheral nerves, muscles, and neuromuscular junctions are intact. EMG would show normal nerve conduction and muscle responses, providing no additional diagnostic information beyond clinical examination and imaging."
    },
    'femoraltrauma': {
        title: "Hip Pain and Leg Weakness After MVA",
        presentation: {
            age: 35,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "Right leg weakness and anterior thigh numbness 8 weeks after motor vehicle accident",
            history: "High-speed MVA 8 weeks ago with pelvic fractures and retroperitoneal hematoma. After initial trauma stabilization, developed right leg weakness and numbness. Cannot extend knee or flex hip effectively. Numbness over anterior thigh and medial leg. Initial concern was for back injury but lumbar spine imaging normal.",
            pmh: "No significant medical history before accident",
            medications: "Oxycodone, physical therapy",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Femoral neuropathy",
            "Lumbosacral plexopathy",
            "L3/L4 radiculopathy",
            "Retroperitoneal hemorrhage",
            "Iliopsoas hematoma"
        ],
        physicalExam: {
            inspection: "Right quadriceps atrophy, antalgic gait with assistive device",
            palpation: "Well-healed abdominal surgical scars, no palpable masses",
            rom: "Limited hip flexion and knee extension",
            strength: "Hip flexors 2/5, quadriceps 1/5, hip adductors 3/5 on right",
            sensation: "Complete sensory loss over anterior thigh and medial leg",
            reflexes: "Absent patellar reflex on right (0+), normal Achilles",
            specialTests: "Positive femoral stretch test, negative straight leg raise"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Tibial Motor (AH)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Fibular Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Sural Sensory",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency: 30.5 ms",
                interpretation: "Normal"
            },
            {
                name: "Femoral Motor (Quadriceps)",
                result: "abnormal",
                findings: "No motor response elicitable",
                interpretation: "Complete femoral nerve palsy"
            }
        ],
        emgStudies: [
            {
                muscle: "Lumbar paraspinals",
                findings: "Normal",
                interpretation: "Root level spared"
            },
            {
                muscle: "Iliopsoas",
                findings: "No voluntary activity, denervation changes",
                interpretation: "Complete femoral nerve palsy"
            },
            {
                muscle: "Quadriceps",
                findings: "No voluntary activity, active denervation",
                interpretation: "Complete femoral nerve lesion"
            },
            {
                muscle: "Adductor longus",
                findings: "Denervation changes",
                interpretation: "Partial obturator nerve involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Traumatic Femoral Nerve Palsy with Partial Obturator Nerve Injury",
        explanation: "Complete femoral nerve palsy from retroperitoneal hematoma or direct trauma during pelvic fracture. Compression/stretching of lumbar plexus branches. Pattern localizes to plexus level (spared paraspinals) rather than root avulsion."
    },
    'sciaticneoplasm': {
        title: "Progressive Leg Pain and Weakness",
        presentation: {
            age: 58,
            gender: "Female",
            occupation: "Accountant",
            chiefComplaint: "6-month history of progressive right leg pain, weakness, and numbness",
            history: "Insidious onset deep, aching pain in right buttock radiating down entire leg. Progressive weakness in foot dorsiflexion and plantarflexion. Numbness in lateral leg and foot. Pain constant, not positional. Weight loss of 15 pounds. Night pain disrupting sleep. No back pain or trauma.",
            pmh: "Breast cancer 8 years ago, treated with mastectomy and chemotherapy",
            medications: "Gabapentin, oxycodone",
            familyHistory: "Mother with breast cancer"
        },
        expectedDifferential: [
            "Sciatic neuropathy",
            "Lumbosacral plexopathy",
            "L5/S1 radiculopathy",
            "Piriformis syndrome",
            "Metastatic plexopathy"
        ],
        physicalExam: {
            inspection: "Right leg atrophy, foot drop gait pattern",
            palpation: "Deep tenderness in right buttock, no discrete mass palpable",
            rom: "Limited by weakness and pain",
            strength: "Complete foot drop (0/5 dorsiflexion), plantarflexion 2/5, hip weakness 3/5",
            sensation: "Decreased sensation in entire sciatic distribution (lateral leg, dorsal/plantar foot)",
            reflexes: "Absent Achilles reflex, absent patellar reflex on right",
            specialTests: "Negative straight leg raise (too painful), negative Spurling's test"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "abnormal",
                findings: "No response elicitable",
                interpretation: "Complete deep peroneal nerve palsy"
            },
            {
                name: "Tibial Motor (AH)",
                result: "abnormal",
                findings: "Severely reduced CMAP amplitude: 2.1 mV (normal >4.0 mV).",
                interpretation: "Severe tibial nerve dysfunction"
            },
            {
                name: "Fibular Sensory",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Complete superficial peroneal nerve loss"
            },
            {
                name: "Sural Sensory",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Complete sural nerve loss"
            },
            {
                name: "H-Reflex",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Sciatic/S1 involvement"
            }
        ],
        emgStudies: [
            {
                muscle: "Lumbar paraspinals",
                findings: "Normal",
                interpretation: "Root level spared"
            },
            {
                muscle: "Gluteus maximus",
                findings: "Severe denervation, no voluntary activity",
                interpretation: "Sciatic nerve involvement above knee"
            },
            {
                muscle: "Biceps femoris (short head)",
                findings: "Complete denervation",
                interpretation: "Peroneal division of sciatic nerve"
            },
            {
                muscle: "Gastrocnemius",
                findings: "Severe denervation changes",
                interpretation: "Tibial division of sciatic nerve"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Sciatic Neuropathy Secondary to Neoplasm (Metastatic Disease)",
        explanation: "Complete sciatic nerve palsy from tumor compression/infiltration in pelvis. History of breast cancer, weight loss, and progressive nature suggest metastatic disease. EMG localizes to sciatic nerve level with spared paraspinals, distinguishing from root pathology."
    },
    'ulnarwristcompression': {
        title: "Hand Weakness After Wrist Injury",
        presentation: {
            age: 29,
            gender: "Male",
            occupation: "Rock Climber",
            chiefComplaint: "Hand weakness and numbness after fall while rock climbing 4 weeks ago",
            history: "Fell while climbing 4 weeks ago, landed on outstretched hands. Initially focused on wrist pain, but developed progressive weakness and numbness in ring and little fingers. Weakness gripping and difficulty with fine motor tasks. Uses wrist guards for climbing which may compress ulnar nerve at wrist.",
            pmh: "Previous wrist injuries from climbing",
            medications: "Ibuprofen, wrist bracing",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Ulnar neuropathy at wrist",
            "Guyon's canal syndrome",
            "Ulnar neuropathy at elbow",
            "C8 radiculopathy",
            "Median neuropathy at wrist"
        ],
        physicalExam: {
            inspection: "Mild hypothenar atrophy, well-healed abrasions on palm",
            palpation: "Tenderness over Guyon's canal and pisiform bone",
            rom: "Full ROM at wrist and fingers",
            strength: "Hypothenar muscles 3/5, interossei normal (5/5), FCU normal",
            sensation: "Decreased sensation in little finger and ulnar half ring finger",
            reflexes: "Normal throughout",
            specialTests: "Positive Tinel's at Guyon's canal, negative at elbow"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Prolonged distal latency: 4.8 ms (normal <3.3 ms). Reduced amplitude.",
                interpretation: "Ulnar neuropathy at wrist"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Prolonged latency: 4.1 ms (normal <3.5 ms). Reduced amplitude.",
                interpretation: "Superficial sensory branch involvement"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Normal",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor digiti minimi",
                findings: "Denervation changes with reduced recruitment",
                interpretation: "Deep motor branch involvement"
            },
            {
                muscle: "First dorsal interosseous",
                findings: "Normal",
                interpretation: "Interossei branch spares (branches proximally in canal)"
            },
            {
                muscle: "Flexor carpi ulnaris",
                findings: "Normal",
                interpretation: "Proximal ulnar nerve intact"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal - Type I (Mixed Motor and Sensory)",
        explanation: "Ulnar nerve compression at Guyon's canal affecting both superficial sensory and deep motor branches to hypothenar muscles. Spares interossei (branch more proximally) and dorsal ulnar cutaneous nerve (branches above wrist). Classic pattern from trauma or chronic pressure."
    },
    'fibromyalgia': {
        title: "Widespread Pain and Fatigue",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Office Manager",
            chiefComplaint: "6-month history of widespread muscle pain, fatigue, and tingling in hands",
            history: "Gradual onset of widespread muscle and joint pain, fatigue, and sleep disturbances. Reports tingling in hands that led to EMG referral. No weakness or muscle atrophy. Pain worse with stress and weather changes. Multiple tender points throughout body. Previous normal labs including ESR, CRP, ANA.",
            pmh: "Depression, irritable bowel syndrome",
            medications: "Sertraline, gabapentin",
            familyHistory: "Mother with fibromyalgia and chronic fatigue syndrome"
        },
        expectedDifferential: [
            "Fibromyalgia",
            "Chronic Fatigue Syndrome",
            "Polymyalgia rheumatica",
            "Hypothyroidism",
            "Inflammatory myopathy"
        ],
        physicalExam: {
            inspection: "No visible atrophy or fasciculations",
            palpation: "Multiple tender points at neck, shoulders, back, hips",
            rom: "Full ROM but limited by pain",
            strength: "5/5 strength throughout (limited by effort due to pain)",
            sensation: "Normal objective sensation, subjective numbness in hands",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Positive tender points (>11/18), negative Tinel's/Phalen's"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Multiple muscles sampled",
                findings: "Normal spontaneous activity, normal motor units",
                interpretation: "Normal muscle and nerve function"
            }
        ],
        requiresEMG: false,
        emgIndication: "NOT INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Fibromyalgia - EMG NOT INDICATED",
        explanation: "Fibromyalgia is a central pain disorder with normal peripheral nervous system. EMG/NCS are normal and not indicated unless there are objective neurological findings. Subjective sensory symptoms without objective deficits don't warrant electrodiagnostic studies.",
        educationalNote: "EMG/NCS should only be performed when there are objective neurological findings (weakness, atrophy, reflex changes, objective sensory loss). Subjective pain and fatigue without focal neurological deficits are not indications for electrodiagnostic testing."
    },
    'charcotmarietooth': {
        title: "Progressive Foot Deformity and Weakness",
        presentation: {
            age: 32,
            gender: "Male",
            occupation: "Software Engineer",
            chiefComplaint: "Lifelong foot problems with recent worsening weakness and frequent falls",
            history: "Born with 'club feet' requiring braces as child. Progressive weakness in feet and legs over past 5 years. Frequent ankle sprains and falls. Family history of similar problems in father and paternal grandfather. High-arched feet and difficulty finding shoes that fit.",
            pmh: "Pes cavus since childhood, multiple ankle sprains",
            medications: "None",
            familyHistory: "Father and paternal grandfather with similar high arches and leg weakness"
        },
        expectedDifferential: [
            "Charcot-Marie-Tooth (CMT) disease",
            "Hereditary Motor and Sensory Neuropathy (HMSN)",
            "Chronic Inflammatory Demyelinating Polyneuropathy (CIDP)",
            "Distal spinal muscular atrophy",
            "Friedreich's ataxia"
        ],
        physicalExam: {
            inspection: "Bilateral pes cavus, hammer toes, distal leg atrophy",
            palpation: "Atrophic calf muscles, normal proximal muscles",
            rom: "Limited ankle dorsiflexion",
            strength: "Distal weakness: dorsiflexion 3/5, plantarflexion 4/5. Proximal muscles normal.",
            sensation: "Decreased vibration and position sense in feet",
            reflexes: "Absent Achilles reflexes, diminished patellar reflexes",
            specialTests: "Positive Romberg sign, high-arched feet"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Severely prolonged distal latency: 8.5 ms (normal <4.2 ms). Slow conduction velocity: 28 m/s.",
                interpretation: "Demyelinating process"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Prolonged distal latency: 6.2 ms. Conduction velocity: 30 m/s.",
                interpretation: "Demyelinating process"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Severe sensory involvement"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Sensory nerve dysfunction"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "No responses obtained",
                interpretation: "Demyelinating neuropathy"
            }
        ],
        emgStudies: [
            {
                muscle: "Tibialis anterior",
                findings: "Chronic denervation with large polyphasic motor units",
                interpretation: "Chronic nerve dysfunction with reinnervation changes"
            },
            {
                muscle: "Gastrocnemius",
                findings: "Severe denervation, poor recruitment",
                interpretation: "Advanced nerve dysfunction"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Charcot-Marie-Tooth Disease (Hereditary Neuropathy)",
        explanation: "Hereditary demyelinating neuropathy with classic distal weakness, pes cavus, and family history. Uniform slowing of conduction velocities throughout suggests demyelinating CMT (likely CMT1). Genetic testing would confirm specific subtype."
    },
    'multifocalmotorneuropathy': {
        title: "Asymmetric Hand and Arm Weakness",
        presentation: {
            age: 48,
            gender: "Male",
            occupation: "Electrician",
            chiefComplaint: "2-year history of progressive asymmetric weakness in hands and arms",
            history: "Gradual onset weakness starting in right hand, now affecting left hand and right arm. Weakness is patchy - some muscles weak while adjacent ones normal. No sensory symptoms. No fasciculations visible. Weakness interferes with work requiring fine motor control.",
            pmh: "No significant medical history",
            medications: "None"
        },
        expectedDifferential: [
            "Multifocal Motor Neuropathy (MMN)",
            "Amyotrophic Lateral Sclerosis (ALS)",
            "Lewis-Sumner Syndrome (MADSAM)",
            "Cervical spondylotic myelopathy",
            "Multiple mononeuropathies"
        ],
        physicalExam: {
            inspection: "Asymmetric muscle atrophy in hands and forearms",
            palpation: "Atrophic muscles without tenderness",
            rom: "Full ROM where strength permits",
            strength: "Patchy weakness: FDI 2/5 right, normal left. APB 3/5 right, 4/5 left. Triceps normal bilaterally.",
            sensation: "Normal throughout",
            reflexes: "Normal throughout",
            specialTests: "No fasciculations, no upper motor neuron signs"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Conduction block: 60% CMAP amplitude drop from forearm to wrist.",
                interpretation: "Focal conduction block in median nerve"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Conduction block across elbow (45% drop). Prolonged distal latency.",
                interpretation: "Multifocal motor involvement"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal parameters",
                interpretation: "No sensory involvement"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Difference: 0.1 ms",
                interpretation: "Normal"
            },
            {
                name: "Anti-GM1 antibodies",
                result: "positive",
                findings: "Elevated anti-GM1 ganglioside antibodies",
                interpretation: "Supports MMN diagnosis"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis",
                findings: "Chronic denervation with large motor units",
                interpretation: "Chronic motor nerve dysfunction"
            },
            {
                muscle: "First dorsal interosseous",
                findings: "Active denervation, reduced recruitment",
                interpretation: "Progressive motor nerve dysfunction"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Multifocal Motor Neuropathy (MMN)",
        explanation: "Rare immune-mediated motor neuropathy with conduction blocks at non-entrapment sites. Key features: asymmetric pure motor involvement, normal sensory studies, conduction blocks, and anti-GM1 antibodies. Responds to immunotherapy unlike ALS."
    },
    'criticalillnesspolyneuropathy': {
        title: "Weakness After Prolonged ICU Stay",
        presentation: {
            age: 55,
            gender: "Female",
            occupation: "Nurse",
            chiefComplaint: "Severe weakness in all extremities after 3-week ICU stay for sepsis",
            history: "Admitted 6 weeks ago with severe pneumonia and sepsis, required mechanical ventilation for 3 weeks. Multiple organ failure with prolonged use of steroids and neuromuscular blocking agents. When sedation lifted, found to have severe weakness in all extremities. Unable to lift arms or legs against gravity.",
            pmh: "Diabetes mellitus, hypertension",
            medications: "Multiple ICU medications, now weaning steroids",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Critical Illness Polyneuropathy (CIP)",
            "Critical Illness Myopathy (CIM)",
            "Guillain-Barré Syndrome",
            "Lambert-Eaton Myasthenic Syndrome",
            "Neuromuscular junction blockade"
        ],
        physicalExam: {
            inspection: "Generalized muscle atrophy, recently extubated",
            palpation: "Diffuse muscle atrophy without specific tenderness",
            rom: "Full passive ROM, limited active movement",
            strength: "Proximal and distal weakness 2-3/5 throughout all extremities",
            sensation: "Decreased sensation in stocking-glove distribution",
            reflexes: "Diminished to absent throughout (1+ or absent)",
            specialTests: "Difficulty weaning from ventilator due to diaphragm weakness"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "abnormal",
                findings: "Severely reduced CMAP amplitude: 0.6 mV (normal >2.0 mV).",
                interpretation: "Severe axonal nerve dysfunction"
            },
            {
                name: "Tibial Motor (AH)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 1.5 mV (normal >4.0 mV).",
                interpretation: "Axonal motor nerve dysfunction"
            },
            {
                name: "Fibular Sensory",
                result: "abnormal",
                findings: "Reduced amplitude: 1 μV (normal >6 μV).",
                interpretation: "Axonal sensory dysfunction"
            },
            {
                name: "Sural Sensory",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Severe sensory axonal loss"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency but reduced amplitude",
                interpretation: "Axonal involvement"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                findings: "Fibrillations, positive sharp waves, reduced recruitment",
                interpretation: "Acute denervation"
            },
            {
                muscle: "Biceps",
                findings: "Mixed myopathic and neuropathic changes",
                interpretation: "Critical illness neuromyopathy"
            },
            {
                muscle: "Tibialis anterior",
                findings: "Severe denervation changes",
                interpretation: "Axonal nerve dysfunction"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Critical Illness Polyneuropathy/Myopathy",
        explanation: "Acquired condition in critically ill patients, often with sepsis, prolonged mechanical ventilation, and multiple organ failure. Combination of axonal neuropathy and myopathy. Recovery is variable and often incomplete."
    },
    'spinalmusculatrophy': {
        title: "Progressive Weakness Since Childhood",
        presentation: {
            age: 28,
            gender: "Male",
            occupation: "Teacher (uses wheelchair)",
            chiefComplaint: "Lifelong progressive weakness, now with new concerns about swallowing",
            history: "Born with muscle weakness, delayed motor milestones. Progressive weakness throughout childhood requiring wheelchair by age 12. Recent development of difficulty swallowing and choking on liquids. Family history of similar condition in younger brother who died in infancy.",
            pmh: "Spinal muscular atrophy (known diagnosis), scoliosis",
            medications: "Nusinersen injections, respiratory support",
            familyHistory: "Younger brother died in infancy from similar condition"
        },
        expectedDifferential: [
            "Spinal Muscular Atrophy (SMA)",
            "Duchenne Muscular Dystrophy",
            "Amyotrophic Lateral Sclerosis (ALS)",
            "Pompe disease",
            "Limb-girdle muscular dystrophy"
        ],
        physicalExam: {
            inspection: "Severe muscle atrophy, scoliosis, fasciculations in tongue",
            palpation: "Diffuse muscle atrophy, particularly proximal",
            rom: "Contractures at hips and knees",
            strength: "Severe proximal weakness (1-2/5), distal muscles relatively preserved",
            sensation: "Normal throughout",
            reflexes: "Absent throughout",
            specialTests: "Tongue fasciculations, weak cough, difficulty swallowing"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 3.2 mV (normal >4.0 mV). Normal latency and velocity.",
                interpretation: "Motor unit loss"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 4.5 mV (normal >6.0 mV).",
                interpretation: "Motor neuron loss"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "No sensory involvement"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Normal",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                findings: "Widespread fasciculations, large polyphasic motor units",
                interpretation: "Chronic denervation with reinnervation"
            },
            {
                muscle: "Biceps",
                findings: "Fasciculations, giant motor units, reduced recruitment",
                interpretation: "Chronic motor neuron disease"
            },
            {
                muscle: "Tongue",
                findings: "Fasciculations and fibrillations",
                interpretation: "Bulbar motor neuron involvement"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Spinal Muscular Atrophy Type II (Intermediate)",
        explanation: "Genetic motor neuron disease caused by SMN1 gene mutations. Type II presents in childhood with progressive proximal weakness, fasciculations, and preserved sensation. Distinguished from ALS by early onset, family history, and specific genetic pattern."
    },
    'toxicneuropathy': {
        title: "Progressive Painful Neuropathy",
        presentation: {
            age: 52,
            gender: "Male",
            occupation: "Factory Worker (Chemical Plant)",
            chiefComplaint: "6-month history of progressive burning feet and hand numbness",
            history: "Insidious onset burning pain in feet, progressing to hands over several months. Works in chemical plant with exposure to organic solvents. Symptoms worse at night, interfering with sleep. Progressive weakness in feet making walking difficult. Coworkers have similar complaints.",
            pmh: "No diabetes, no alcohol abuse",
            medications: "None",
            familyHistory: "Non-contributory (Coworkers with similar exposure symptoms)"
        },
        expectedDifferential: [
            "Toxic polyneuropathy",
            "Diabetic neuropathy",
            "Alcoholic neuropathy",
            "B12 deficiency",
            "CIDP"
        ],
        physicalExam: {
            inspection: "No visible deformities, mild pes cavus",
            palpation: "No specific tenderness",
            rom: "Full ROM",
            strength: "Mild distal weakness, toe dorsiflexion 4/5, hand intrinsics 4/5",
            sensation: "Decreased vibration and pinprick in stocking-glove distribution",
            reflexes: "Absent ankle reflexes, diminished throughout",
            specialTests: "Negative Romberg, gait with mild foot drop"
        },
        ncsStudies: [
            {
                name: "Fibular Motor (EDB)",
                result: "abnormal",
                findings: "Low CMAP amplitude: 1.2 mV (normal >2.0 mV). Normal velocity.",
                interpretation: "Axonal motor nerve dysfunction"
            },
            {
                name: "Tibial Motor (AH)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 3.8 mV (normal >4.0 mV). Normal velocity.",
                interpretation: "Axonal nerve dysfunction"
            },
            {
                name: "Fibular Sensory",
                result: "abnormal",
                findings: "Reduced amplitude: 2 μV (normal >6 μV).",
                interpretation: "Axonal sensory dysfunction"
            },
            {
                name: "Sural Sensory",
                result: "abnormal",
                findings: "Severely reduced amplitude: 2 μV (normal >6 μV).",
                interpretation: "Axonal sensory nerve dysfunction"
            },
            {
                name: "H-Reflex",
                result: "normal",
                findings: "Normal latency: 31.8 ms",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Extensor digitorum brevis",
                findings: "Fibrillations and positive sharp waves, reduced recruitment",
                interpretation: "Active denervation"
            },
            {
                muscle: "Tibialis anterior",
                findings: "Chronic denervation changes with large motor units",
                interpretation: "Chronic axonal nerve dysfunction"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Toxic Polyneuropathy (Solvent Exposure)",
        explanation: "Length-dependent axonal polyneuropathy caused by chronic exposure to organic solvents. Key features: occupational exposure, predominantly sensory symptoms with burning pain, distal axonal pattern on NCS, and similar symptoms in coworkers suggesting environmental cause."
    },
    'postviralguillainbarre': {
        title: "Acute Ascending Weakness",
        presentation: {
            age: 34,
            gender: "Female",
            occupation: "Teacher",
            chiefComplaint: "Rapidly progressive weakness in legs and arms over 5 days",
            history: "2 weeks ago had viral gastroenteritis with diarrhea. 5 days ago developed tingling in toes, followed by progressive weakness ascending from feet to hands. Now has difficulty walking and using hands. No respiratory symptoms yet but concerned about breathing.",
            pmh: "Recent viral gastroenteritis 2 weeks ago",
            medications: "None",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Guillain-Barré Syndrome (GBS)",
            "Acute myelitis",
            "Tick paralysis",
            "Critical illness polyneuropathy",
            "Porphyria",
            "Botulism"
        ],
        physicalExam: {
            inspection: "No muscle atrophy, appears anxious",
            palpation: "No muscle tenderness",
            rom: "Full passive ROM",
            strength: "Symmetric weakness: legs 3/5 distal, 4/5 proximal; arms 4/5 distal, 4+/5 proximal",
            sensation: "Decreased vibration in feet, mild numbness in fingertips",
            reflexes: "Absent throughout all extremities",
            specialTests: "Negative Babinski, normal cranial nerves, vital capacity 80% predicted"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Prolonged distal latency: 6.2 ms (normal <4.2 ms). Slow conduction velocity: 35 m/s. Conduction block present.",
                interpretation: "Demyelinating motor neuropathy"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Prolonged distal latency: 5.8 ms. Prolonged F-wave latency.",
                interpretation: "Proximal demyelination"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Prolonged latency and reduced amplitude",
                interpretation: "Sensory involvement"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Prolonged latency and reduced amplitude",
                interpretation: "Sensory nerve involvement"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Diffuse slowing bilaterally",
                interpretation: "Demyelinating process"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis",
                findings: "Normal spontaneous activity, reduced recruitment",
                interpretation: "Acute demyelination without denervation yet"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Guillain-Barré Syndrome (AIDP variant)",
        explanation: "Acute inflammatory demyelinating polyneuropathy following viral infection. Classic features: ascending weakness after infection, areflexia, demyelinating pattern on NCS with conduction blocks and prolonged latencies. Requires urgent monitoring for respiratory involvement."
    },
    'hereditaryneuropathy': {
        title: "Family History of Foot Problems",
        presentation: {
            age: 28,
            gender: "Male",
            occupation: "Physical Therapist",
            chiefComplaint: "Lifelong foot deformities and recent ankle sprains",
            history: "Born with high arched feet, frequent ankle sprains since childhood. Mother and grandfather had similar foot problems and weakness. Recently noticed weakness in hands, difficulty with fine motor tasks. Progressive symptoms but very slowly. No acute illnesses.",
            pmh: "Multiple ankle sprains, no other medical problems",
            medications: "None",
            familyHistory: "Mother and grandfather with foot problems and leg weakness"
        },
        expectedDifferential: [
            "Charcot-Marie-Tooth (CMT) Disease",
            "HMSN",
            "Distal SMA",
            "Chronic axonal neuropathy",
            "Friedreich's ataxia"
        ],
        physicalExam: {
            inspection: "High arched feet (pes cavus), hammer toes, mild hand atrophy",
            palpation: "Atrophic intrinsic foot muscles",
            rom: "Limited ankle dorsiflexion due to contractures",
            strength: "Distal weakness: foot dorsiflexion 3/5, foot inversion 4/5, hand intrinsics 4/5",
            sensation: "Decreased vibration in feet and hands",
            reflexes: "Absent ankle reflexes, diminished elsewhere",
            specialTests: "Steppage gait, positive family history"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Mildly reduced amplitude. Uniformly slow conduction velocity: 40 m/s (normal >50 m/s).",
                interpretation: "Uniform demyelinating process"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Uniformly slow conduction velocity: 41 m/s.",
                interpretation: "Uniform demyelinating process"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Severe sensory involvement"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Absent response",
                interpretation: "Sensory nerve dysfunction"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "No responses obtained",
                interpretation: "Uniform demyelinating process"
            }
        ],
        emgStudies: [
            {
                muscle: "Extensor digitorum brevis",
                findings: "Chronic denervation with large motor units",
                interpretation: "Chronic neurogenic changes"
            },
            {
                muscle: "Abductor pollicis brevis",
                findings: "Mild chronic denervation changes",
                interpretation: "Progressive motor nerve dysfunction"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Charcot-Marie-Tooth Disease (CMT1A)",
        explanation: "Hereditary sensorimotor neuropathy with autosomal dominant inheritance. Classic features: pes cavus, distal weakness, positive family history, uniform slowing on NCS, and chronic progressive course. Genetic testing confirms PMP22 duplication."
    },
    'metabolicmyopathy': {
        title: "Exercise Intolerance and Muscle Pain",
        presentation: {
            age: 25,
            gender: "Female",
            occupation: "Graduate Student",
            chiefComplaint: "Lifelong exercise intolerance with muscle pain and fatigue",
            history: "Since childhood, develops severe muscle pain and fatigue with moderate exercise. Episodes of dark urine after strenuous activity. Cannot keep up with peers during physical activity. Symptoms improve with rest and carbohydrate intake. Family history of similar symptoms in brother.",
            pmh: "Recurrent episodes of myoglobinuria",
            medications: "None",
            familyHistory: "Brother with similar exercise intolerance"
        },
        expectedDifferential: [
            "McArdle disease",
            "CPT II deficiency",
            "Mitochondrial myopathy",
            "Polymyositis",
            "Myoadenylate deaminase deficiency"
        ],
        physicalExam: {
            inspection: "Normal muscle bulk, no atrophy",
            palpation: "No muscle tenderness at rest",
            rom: "Full ROM",
            strength: "Normal strength at rest (5/5 throughout)",
            sensation: "Normal throughout",
            reflexes: "Normal and symmetric (2+ throughout)",
            specialTests: "Ischemic forearm test planned, normal baseline strength"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "normal",
                findings: "Normal findings",
                interpretation: "Normal"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "normal",
                findings: "Normal",
                interpretation: "Normal"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                findings: "Normal spontaneous activity, normal motor unit morphology",
                interpretation: "No evidence of myopathy at rest"
            },
            {
                muscle: "Quadriceps",
                findings: "Normal baseline findings",
                interpretation: "Normal muscle membrane stability"
            },
            {
                muscle: "Ischemic forearm test",
                findings: "No rise in serum lactate with anaerobic exercise",
                interpretation: "Suggests glycolytic enzyme deficiency"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "McArdle Disease (Glycogen Storage Disease Type V)",
        explanation: "Metabolic myopathy due to muscle phosphorylase deficiency. Key features: exercise intolerance, myoglobinuria, normal strength at rest, normal EMG at baseline, and abnormal ischemic forearm test (no lactate rise). Requires enzyme testing or genetic analysis for confirmation."
    },
    'criticalillnessmyopathy': {
        title: "Post-ICU Weakness with Elevated CK",
        presentation: {
            age: 48,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "Severe weakness after prolonged ICU stay for COVID-19",
            history: "Hospitalized 8 weeks ago with severe COVID-19, required mechanical ventilation for 4 weeks. Received high-dose steroids and neuromuscular blocking agents. Now has severe proximal and distal weakness, worse than expected for polyneuropathy alone. CK elevated at 2800 U/L.",
            pmh: "Hypertension, obesity",
            medications: "Prednisone (tapering), multiple ICU medications",
            familyHistory: "Non-contributory"
        },
        expectedDifferential: [
            "Critical Illness Myopathy (CIM)",
            "Critical Illness Polyneuropathy (CIP)",
            "Guillain-Barré Syndrome",
            "Steroid myopathy",
            "Neuromuscular junction blockade"
        ],
        physicalExam: {
            inspection: "Generalized muscle atrophy, more prominent proximally",
            palpation: "Muscle atrophy without specific tenderness",
            rom: "Full passive ROM, limited active movement",
            strength: "Severe weakness: proximal 2/5, distal 3/5 in all extremities",
            sensation: "Mild stocking-glove sensory loss",
            reflexes: "Absent throughout",
            specialTests: "Difficulty with ventilator weaning, elevated CK"
        },
        ncsStudies: [
            {
                name: "Median Motor (APB)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 2.1 mV (normal >4.0 mV). Normal velocity.",
                interpretation: "Axonal motor nerve dysfunction component"
            },
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Reduced CMAP amplitude: 3.2 mV (normal >6.0 mV).",
                interpretation: "Reduced CMAP amplitude"
            },
            {
                name: "Median Sensory (Wrist-Digit 3)",
                result: "abnormal",
                findings: "Reduced amplitude: 3 μV (normal >15 μV).",
                interpretation: "Sensory axonal loss (consistent with CIP)"
            },
            {
                name: "Ulnar Sensory (Wrist-Digit 5)",
                result: "abnormal",
                findings: "Reduced amplitude: 2 μV.",
                interpretation: "Sensory nerve involvement"
            },
            {
                name: "Median-Radial Comparison (Thumb)",
                result: "abnormal",
                findings: "Reduced amplitudes bilaterally",
                interpretation: "Diffuse axonal process"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                findings: "Fibrillations, positive sharp waves, small polyphasic motor units",
                interpretation: "Combined myopathic and neurogenic features"
            },
            {
                muscle: "Quadriceps",
                findings: "Abundant spontaneous activity, mixed motor unit sizes",
                interpretation: "Acute myopathy with membrane instability"
            },
            {
                muscle: "Biceps",
                findings: "Myopathic motor units with spontaneous activity",
                interpretation: "Necrotizing myopathy pattern"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "difficult",
        correctDiagnosis: "Critical Illness Myopathy with Polyneuropathy",
        explanation: "Combined critical illness myopathy and polyneuropathy (CIM/CIP) following prolonged ICU stay. Features: severe weakness, elevated CK, mixed EMG pattern with both myopathic and neurogenic changes, worse than neuropathy alone. Associated with steroids, paralytics, and systemic inflammation."
    }
};
