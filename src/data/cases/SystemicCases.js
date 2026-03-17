export const systemicCases = {
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

    als: {
        title: "Progressive Weakness with Muscle Twitching",
        difficulty: "difficult",
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

    cidp: {
        title: "Chronic Progressive Weakness and Sensory Loss",
        difficulty: "difficult",
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
        difficulty: "difficult",
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
