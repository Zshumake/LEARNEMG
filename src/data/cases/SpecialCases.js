export const specialCases = {
    stroke: {
        title: "Sudden Onset Left-Sided Weakness",
        difficulty: "beginner",
        presentation: {
            age: 68,
            gender: "Male",
            occupation: "Retired",
            chiefComplaint: "Acute onset left-sided weakness and facial droop",
            history: "Wife found patient at 7 AM with left facial droop and dense left-sided weakness. He was neurologically normal when he went to bed at 10 PM. No history of headache, neck pain, or vision changes. Slurred speech noted on arrival.",
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
};
