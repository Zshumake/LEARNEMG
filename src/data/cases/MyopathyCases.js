export const myopathyCases = {
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
            { muscle: "Tibialis Anterior", nerve: "Deep peroneal", root: "L4-L5-S1", abnormal: false, fibs: "0", motorUnits: "Normal", recruitment: "Normal" },
            { muscle: "Extensor Hallucis Longus", nerve: "Deep peroneal", root: "L5-S1", abnormal: false, fibs: "0", motorUnits: "Normal", recruitment: "Normal" },
            { muscle: "Fibularis Longus", nerve: "Superficial Peroneal", root: "L5-S1", abnormal: false, fibs: "0", motorUnits: "Normal", recruitment: "Normal" },
            { muscle: "Medial Gastrocnemius", nerve: "Tibial", root: "S1-S2", abnormal: false, fibs: "0", motorUnits: "Normal", recruitment: "Normal" }
        ],
        teachingPoints: [
            "Myopathic disorders show preservation of sensory and motor conduction (unless severe).",
            "Key EMG hallmark: Small, short-duration, polyphasic MUAPs.",
            "Recruitment is typically 'early' or 'brisk' relative to the amount of effort/strength."
        ]
    }
};
