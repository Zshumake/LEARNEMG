// EMG APP Complete Clinical Cases System - EXACT COPY from EMG APP
console.log('🚀 Loading COMPLETE EMG APP Clinical Cases System...');

// Standardize NCS studies for consistency - Professional Format
function getStandardUpperExtremityNCS() {
    return {
        antiSensorySummary: [
            {
                site: "Right Median Sensory (Index Finger)",
                nr: "2.5",
                peak: "3.1",
                normPeak: "<3.4",
                ptAmp: "20.0",
                normPT: ">15",
                site1: "Wrist",
                site2: "Index Finger",
                deltaP: "2.9",
                dist: "13.0",
                vel: "58",
                normVel: ">50",
                abnormal: false
            },
            {
                site: "Right Ulnar Sensory (Little Finger)",
                nr: "2.5",
                peak: "2.8",
                normPeak: "<3.4",
                ptAmp: "18.0",
                normPT: ">10",
                site1: "Wrist",
                site2: "Little Finger",
                deltaP: "2.6",
                dist: "13.0",
                vel: "62",
                normVel: ">49",
                abnormal: false
            }
        ],
        motorSummary: [
            {
                site: "Right Median Motor (Abd Poll Brev)",
                nr: "4.5",
                onset: "3.8",
                normOnset: "<4.2",
                opAmp: "8.0",
                normOPAmp: ">5",
                negDur: "6.2",
                site1: "Wrist",
                site2: "APB",
                deltaO: "3.6",
                dist: "7.0",
                vel: "58",
                normVel: ">50",
                abnormal: false
            },
            {
                site: "Right Ulnar Motor (Abd Dig Minimi)",
                nr: "4.5",
                onset: "2.8",
                normOnset: "<3.3",
                opAmp: "14.0",
                normOPAmp: ">6",
                negDur: "6.0",
                site1: "Wrist",
                site2: "ADM",
                deltaO: "2.6",
                dist: "7.0",
                vel: "62",
                normVel: ">53",
                abnormal: false
            }
        ],
        comparisonSummary: [],
        emgFindings: []
    };
}

function getStandardLowerExtremityNCS() {
    return {
        antiSensorySummary: [
            {
                site: "Right Superficial Fibular Sensory (Lateral Leg)",
                nr: "2.5",
                peak: "3.2",
                normPeak: "<4.0",
                ptAmp: "18.0",
                normPT: ">6",
                site1: "Ankle",
                site2: "Lateral Leg",
                deltaP: "3.0",
                dist: "14.0",
                vel: "48",
                normVel: ">44",
                abnormal: false
            },
            {
                site: "Right Sural Sensory (Lateral Foot)",
                nr: "2.5",
                peak: "3.8",
                normPeak: "<4.4",
                ptAmp: "15.0",
                normPT: ">6",
                site1: "Ankle",
                site2: "Lateral Foot",
                deltaP: "3.6",
                dist: "14.0",
                vel: "45",
                normVel: ">40",
                abnormal: false
            }
        ],
        motorSummary: [
            {
                site: "Right Fibular Motor (Ext Dig Brev)",
                nr: "4.5",
                onset: "4.2",
                normOnset: "<5.5",
                opAmp: "6.0",
                normOPAmp: ">2",
                negDur: "7.5",
                site1: "Ankle",
                site2: "EDB",
                deltaO: "4.0",
                dist: "8.0",
                vel: "48",
                normVel: ">44",
                abnormal: false
            },
            {
                site: "Right Tibial Motor (Abd Hall)",
                nr: "4.5",
                onset: "4.8",
                normOnset: "<5.8",
                opAmp: "12.0",
                normOPAmp: ">4",
                negDur: "8.0",
                site1: "Ankle",
                site2: "AH",
                deltaO: "4.6",
                dist: "8.0",
                vel: "45",
                normVel: ">41",
                abnormal: false
            }
        ],
        comparisonSummary: [],
        emgFindings: []
    };
}

// Global case database - exactly from EMG APP
const caseDatabase = {
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
            sensation: "Decreased light touch and pinprick in median nerve distribution (digits 1-3)",
            reflexes: "2+ and symmetric throughout. No pathological reflexes.",
            specialTests: "Positive Tinel's sign at wrist, positive Phalen's sign"
        },
        differentialDiagnosis: ["Carpal tunnel syndrome", "Median neuropathy at wrist", "C6 radiculopathy", "Cervical radiculopathy", "Pronator teres syndrome", "Anterior interosseous syndrome"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Carpal Tunnel Syndrome",
        explanation: "Classic carpal tunnel syndrome with nocturnal symptoms, thenar weakness, positive provocative tests, and median nerve distribution sensory loss.",
        ncsResults: {
            antiSensorySummary: [
                {
                    site: "Right Median Anti Sensory (2nd Digit)",
                    nr: "2.5",
                    peak: "4.5",
                    normPeak: "<3.4",
                    ptAmp: "8.0",
                    normPT: ">15",
                    site1: "Wrist",
                    site2: "2nd Digit",
                    deltaP: "4.3",
                    dist: "13.0",
                    vel: "30",
                    normVel: ">39",
                    abnormal: true
                },
                {
                    site: "Right Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "4.2",
                    normPeak: "<3.4",
                    ptAmp: "9.5",
                    normPT: ">15",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "4.0",
                    dist: "13.0",
                    vel: "33",
                    normVel: ">39",
                    abnormal: true
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.2",
                    normPeak: "<3.4",
                    ptAmp: "38.0",
                    normPT: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.1",
                    dist: "14.0",
                    vel: "67",
                    normVel: ">38",
                    abnormal: false
                },
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.3",
                    normPeak: "<3.4",
                    ptAmp: "35.0",
                    normPT: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.2",
                    dist: "14.0",
                    vel: "64",
                    normVel: ">38",
                    abnormal: false
                }
            ],
            motorSummary: [
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "4.5",
                    onset: "5.8",
                    normOnset: "<4.2",
                    opAmp: "3.2",
                    normOPAmp: ">5",
                    negDur: "8.5",
                    site1: "Wrist",
                    site2: "APB",
                    deltaO: "5.6",
                    dist: "7.0",
                    vel: "12",
                    normVel: ">50",
                    abnormal: true
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "4.5",
                    onset: "2.8",
                    normOnset: "<3.3",
                    opAmp: "14.0",
                    normOPAmp: ">6",
                    negDur: "6.2",
                    site1: "Wrist",
                    site2: "ADM",
                    deltaO: "2.6",
                    dist: "7.0",
                    vel: "27",
                    normVel: ">53",
                    abnormal: false
                },
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "4.5",
                    onset: "2.7",
                    normOnset: "<3.3",
                    opAmp: "15.2",
                    normOPAmp: ">6",
                    negDur: "6.0",
                    site1: "Wrist",
                    site2: "ADM",
                    deltaO: "2.5",
                    dist: "7.0",
                    vel: "28",
                    normVel: ">53",
                    abnormal: false
                }
            ],
            comparisonSummary: [
                {
                    site: "Right Median/Ulnar Comparison (Digit 4)",
                    median: {
                        nr: "2.5",
                        peak: "4.8",
                        ptAmp: "6.2"
                    },
                    ulnar: {
                        nr: "2.5",
                        peak: "2.4",
                        ptAmp: "32.0"
                    },
                    site1: "Wrist",
                    site2: "4th Digit",
                    deltaP: "2.4",
                    abnormal: true
                }
            ],
            emgFindings: [
                {
                    side: "Right",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Incr",
                    fibs: "1+",
                    psw: "Nml",
                    amp: "Incr",
                    dur: "Incr",
                    poly: "2",
                    recrt: "Red",
                    intPat: "Dec",
                    comment: "Chronic denervation with reinnervation",
                    abnormal: true
                },
                {
                    side: "Right",
                    muscle: "1st Dorsal Int",
                    nerve: "Deep Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Normal ulnar innervated muscle",
                    abnormal: false
                },
                {
                    side: "Right",
                    muscle: "Flex Poll Long",
                    nerve: "Ant Inteross",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Proximal median nerve normal",
                    abnormal: false
                }
            ]
        }
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
            sensation: "Decreased sensation in ulnar distribution (digits 4-5)",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Positive Tinel's sign at elbow, positive Froment's sign"
        },
        differentialDiagnosis: ["Cubital tunnel syndrome", "Ulnar neuropathy at elbow", "Guyon's canal syndrome", "C8 radiculopathy", "Lower trunk brachial plexopathy", "Polyneuropathy"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Cubital Tunnel Syndrome",
        explanation: "Classic ulnar neuropathy at elbow with weakness of intrinsic hand muscles, positive Froment's sign, and ulnar sensory distribution.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Ulnar - little",
                    recording: "Little finger",
                    peakLatency: 4.2,
                    amplitude: 6,
                    cv: 42,
                    normal: false
                },
                {
                    nerve: "Median - index",
                    recording: "Index finger",
                    peakLatency: 2.8,
                    amplitude: 45,
                    cv: 58,
                    normal: true
                }
            ],
            motorStudies: [
                {
                    nerve: "Ulnar",
                    recording: "ADM",
                    distalLatency: 4.8,
                    amplitude: 4.2,
                    cv: 38,
                    normal: false
                },
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 3.2,
                    amplitude: 12,
                    cv: 58,
                    normal: true
                }
            ],
            emgFindings: [
                {
                    muscle: "First Dorsal Interosseous",
                    nerve: "Deep ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "Severely reduced",
                    motorUnits: "Large, polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Abductor Digiti Minimi",
                    nerve: "Deep ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "Reduced",
                    motorUnits: "Polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Flexor Carpi Ulnaris",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "1+ fibrillations",
                    recruitment: "Mildly reduced",
                    motorUnits: "Polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Abductor Pollicis Brevis",
                    nerve: "Median (recurrent branch)",
                    root: "C8-T1",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                }
            ]
        }
    },
    'complex1': {
        title: "Complex Plexopathy with Multiple Nerve Involvement",
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
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Traumatic Brachial Plexus Avulsion (Pan-plexopathy)",
        explanation: "Complete motor and sensory loss in C5-T1 distribution with Horner's syndrome following high-energy trauma indicates traumatic brachial plexus avulsion.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Median - index",
                    recording: "Index finger",
                    peakLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                },
                {
                    nerve: "Ulnar - little",
                    recording: "Little finger",
                    peakLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                },
                {
                    nerve: "Radial - thumb",
                    recording: "Thumb",
                    peakLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                }
            ],
            motorStudies: [
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                },
                {
                    nerve: "Ulnar",
                    recording: "ADM",
                    distalLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                },
                {
                    nerve: "Radial",
                    recording: "EIP",
                    distalLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                }
            ],
            emgFindings: [
                {
                    muscle: "Deltoid",
                    nerve: "Axillary",
                    root: "C5-C6",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 3+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Biceps",
                    nerve: "Musculocutaneous",
                    root: "C5-C6-C7",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 3+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Triceps",
                    nerve: "Radial",
                    root: "C6-C7-C8",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 3+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "First Dorsal Interosseous",
                    nerve: "Deep ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 3+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Cervical Paraspinals (C5-T1)",
                    nerve: "Dorsal rami",
                    root: "C5-C6-C7-C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 3+ PSWs",
                    recruitment: "N/A",
                    motorUnits: "N/A",
                    abnormal: true
                }
            ]
        }
    },
    'birthinjury': {
        title: "Brachial Plexus Birth Injury (Erb's Palsy)",
        difficulty: "intermediate",
        presentation: {
            age: 0.1, // 1 month old
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
            strength: "0/5 deltoid, 0/5 biceps, 0/5 supraspinatus/infraspinatus. Normal triceps (3/5), normal hand intrinsics",
            sensation: "Decreased sensation over deltoid region (axillary nerve distribution)",
            reflexes: "Absent biceps reflex, absent brachioradialis reflex. Normal triceps reflex.",
            specialTests: "Absent Moro reflex on right side"
        },
        differentialDiagnosis: ["Erb's palsy (upper trunk brachial plexus injury)", "Clavicle fracture", "Shoulder dislocation", "Spinal cord injury"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Erb's Palsy (Upper Trunk Brachial Plexus Birth Injury)",
        explanation: "Classic Erb's palsy with waiter's tip position, absent shoulder abduction/external rotation, normal triceps and hand function indicating upper trunk (C5-C6) brachial plexus injury.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Median - index",
                    recording: "Index finger",
                    peakLatency: 2.8,
                    amplitude: 45,
                    cv: 58,
                    normal: true
                },
                {
                    nerve: "Ulnar - little",
                    recording: "Little finger",
                    peakLatency: 2.2,
                    amplitude: 38,
                    cv: 62,
                    normal: true
                },
                {
                    nerve: "Radial - thumb",
                    recording: "Thumb",
                    peakLatency: 2.5,
                    amplitude: 42,
                    cv: 60,
                    normal: true
                }
            ],
            motorStudies: [
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 3.2,
                    amplitude: 12,
                    cv: 58,
                    normal: true
                },
                {
                    nerve: "Ulnar",
                    recording: "ADM",
                    distalLatency: 2.8,
                    amplitude: 14,
                    cv: 62,
                    normal: true
                },
                {
                    nerve: "Radial",
                    recording: "EIP",
                    distalLatency: 3.5,
                    amplitude: 8,
                    cv: 55,
                    normal: true
                }
            ],
            emgFindings: [
                {
                    muscle: "Deltoid",
                    nerve: "Axillary",
                    root: "C5-C6",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Biceps",
                    nerve: "Musculocutaneous",
                    root: "C5-C6-C7",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Supraspinatus",
                    nerve: "Suprascapular",
                    root: "C5-C6",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Infraspinatus",
                    nerve: "Suprascapular",
                    root: "C5-C6",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Triceps",
                    nerve: "Radial",
                    root: "C6-C7-C8",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Reduced recruitment",
                    motorUnits: "Normal morphology",
                    abnormal: false
                },
                {
                    muscle: "First Dorsal Interosseous",
                    nerve: "Deep ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                }
            ]
        }
    },
    'radiationplexopathy': {
        title: "Post-Radiation Brachial Plexopathy",
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
        differentialDiagnosis: ["Radiation-induced brachial plexopathy", "Tumor recurrence/metastasis", "Ulnar neuropathy at elbow", "Cervical radiculopathy"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Radiation-Induced Brachial Plexopathy (Lower Trunk)",
        explanation: "Progressive lower trunk plexopathy developing 2 years post-radiation, affecting primarily C8-T1 distribution with hand intrinsic weakness and ulnar sensory loss.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Median - index",
                    recording: "Index finger",
                    peakLatency: 3.2,
                    amplitude: 35,
                    cv: 52,
                    normal: true
                },
                {
                    nerve: "Ulnar - little",
                    recording: "Little finger",
                    peakLatency: 3.8,
                    amplitude: 15,
                    cv: 45,
                    normal: false
                },
                {
                    nerve: "Medial antebrachial cutaneous",
                    recording: "Medial forearm",
                    peakLatency: 4.2,
                    amplitude: 8,
                    cv: 42,
                    normal: false
                }
            ],
            motorStudies: [
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 3.8,
                    amplitude: 8,
                    cv: 55,
                    normal: false
                },
                {
                    nerve: "Ulnar",
                    recording: "ADM",
                    distalLatency: 4.2,
                    amplitude: 4,
                    cv: 48,
                    normal: false
                },
                {
                    nerve: "Radial",
                    recording: "EIP",
                    distalLatency: 3.2,
                    amplitude: 10,
                    cv: 58,
                    normal: true
                }
            ],
            emgFindings: [
                {
                    muscle: "First Dorsal Interosseous",
                    nerve: "Deep ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "Severely reduced",
                    motorUnits: "Large, polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Abductor Digiti Minimi",
                    nerve: "Deep ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                    recruitment: "Severely reduced",
                    motorUnits: "Large, polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Flexor Digitorum Profundus (4-5)",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "Reduced",
                    motorUnits: "Polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Flexor Carpi Ulnaris",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "1+ fibrillations",
                    recruitment: "Mildly reduced",
                    motorUnits: "Polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Biceps",
                    nerve: "Musculocutaneous",
                    root: "C5-C6-C7",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                },
                {
                    muscle: "Deltoid",
                    nerve: "Axillary",
                    root: "C5-C6",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                }
            ]
        }
    },
    'diabeticplexopathy': {
        title: "Diabetic Lumbosacral Plexopathy",
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
        differentialDiagnosis: ["Diabetic lumbosacral plexopathy", "Lumbar radiculopathy", "Femoral neuropathy", "Lumbar spinal stenosis"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Diabetic Lumbosacral Plexopathy (Diabetic Amyotrophy)",
        explanation: "Classic diabetic amyotrophy with acute onset severe thigh pain, proximal leg weakness, weight loss, and involvement of multiple lumbar plexus nerve territories.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Superficial peroneal",
                    recording: "Lateral leg",
                    peakLatency: 3.2,
                    amplitude: 18,
                    cv: 48,
                    normal: true
                },
                {
                    nerve: "Sural",
                    recording: "Lateral foot",
                    peakLatency: 3.8,
                    amplitude: 15,
                    cv: 45,
                    normal: true
                },
                {
                    nerve: "Lateral femoral cutaneous",
                    recording: "Lateral thigh",
                    peakLatency: 4.5,
                    amplitude: 8,
                    cv: 42,
                    normal: false
                }
            ],
            motorStudies: [
                {
                    nerve: "Peroneal",
                    recording: "EDB",
                    distalLatency: 4.2,
                    amplitude: 6,
                    cv: 48,
                    normal: true
                },
                {
                    nerve: "Peroneal",
                    recording: "TA",
                    distalLatency: 3.8,
                    amplitude: 8,
                    cv: 52,
                    normal: true
                },
                {
                    nerve: "Tibial",
                    recording: "AH",
                    distalLatency: 4.5,
                    amplitude: 12,
                    cv: 45,
                    normal: true
                },
                {
                    nerve: "Femoral",
                    recording: "Quadriceps",
                    distalLatency: 5.2,
                    amplitude: 3,
                    cv: 38,
                    normal: false
                }
            ],
            emgFindings: [
                {
                    muscle: "Quadriceps",
                    nerve: "Femoral",
                    root: "L2-L3-L4",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                    recruitment: "Severely reduced",
                    motorUnits: "Large, polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Adductor Longus",
                    nerve: "Obturator",
                    root: "L2-L3-L4",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "Reduced",
                    motorUnits: "Polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Iliopsoas",
                    nerve: "Femoral/L1-L2",
                    root: "L1-L2-L3",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "Reduced",
                    motorUnits: "Polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Gluteus Medius",
                    nerve: "Superior gluteal",
                    root: "L4-L5-S1",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                },
                {
                    muscle: "Tibialis Anterior",
                    nerve: "Deep peroneal",
                    root: "L4-L5-S1",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                },
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
            ]
        }
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
            rom: "Absent dorsiflexion, normal plantarflexion. Normal inversion and eversion.",
            strength: "Dorsiflexors 0/5, EHL 1/5, evertors 2/5. Normal plantarflexors and invertors.",
            sensation: "Decreased sensation in first web space and dorsal foot",
            reflexes: "Normal Achilles and patellar reflexes bilaterally",
            specialTests: "Positive Tinel's sign over fibular head"
        },
        differentialDiagnosis: ["Common fibular nerve palsy", "Lumbar radiculopathy", "Sciatic neuropathy", "Peripheral neuropathy"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right Common Fibular Nerve Palsy",
        explanation: "Classic fibular nerve palsy at fibular head with foot drop, first web space numbness, and preserved inversion (distinguishing from L5 radiculopathy).",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Superficial peroneal",
                    recording: "Lateral leg",
                    peakLatency: 3.2,
                    amplitude: 18,
                    cv: 48,
                    normal: true
                },
                {
                    nerve: "Sural",
                    recording: "Lateral foot",
                    peakLatency: 3.8,
                    amplitude: 15,
                    cv: 45,
                    normal: true
                },
                {
                    nerve: "Lateral femoral cutaneous",
                    recording: "Lateral thigh",
                    peakLatency: 4.5,
                    amplitude: 8,
                    cv: 42,
                    normal: false
                }
            ],
            motorStudies: [
                {
                    nerve: "Peroneal",
                    recording: "EDB",
                    distalLatency: 4.2,
                    amplitude: 6,
                    cv: 48,
                    normal: true
                },
                {
                    nerve: "Peroneal",
                    recording: "TA",
                    distalLatency: 3.8,
                    amplitude: 8,
                    cv: 52,
                    normal: true
                },
                {
                    nerve: "Tibial",
                    recording: "AH",
                    distalLatency: 4.5,
                    amplitude: 12,
                    cv: 45,
                    normal: true
                },
                {
                    nerve: "Femoral",
                    recording: "Quadriceps",
                    distalLatency: 5.2,
                    amplitude: 3,
                    cv: 38,
                    normal: false
                }
            ],
            emgFindings: [
                {
                    muscle: "Tibialis Anterior",
                    nerve: "Deep peroneal",
                    root: "L4-L5-S1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Extensor Hallucis Longus",
                    nerve: "Deep peroneal",
                    root: "L4-L5-S1",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                    recruitment: "Severely reduced",
                    motorUnits: "Single large unit",
                    abnormal: true
                },
                {
                    muscle: "Peroneus Longus",
                    nerve: "Superficial peroneal",
                    root: "L5-S1-S2",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations",
                    recruitment: "Reduced",
                    motorUnits: "Polyphasic units",
                    abnormal: true
                },
                {
                    muscle: "Tibialis Posterior",
                    nerve: "Tibial",
                    root: "L4-L5",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                }
            ]
        }
    },
    'radialneuropathy': {
        title: "Wrist Drop After Saturday Night",
        difficulty: "beginner",
        presentation: {
            age: 35,
            gender: "Male",
            occupation: "Software Developer",
            chiefComplaint: "Acute onset inability to extend wrist and fingers after falling asleep with arm over chair",
            history: "Woke up yesterday morning unable to extend right wrist or fingers. Had been drinking the night before and fell asleep in chair with right arm draped over the back (Saturday night palsy). No pain, just weakness. Can still flex fingers and wrist normally.",
            pmh: "No significant medical history",
            medications: "None"
        },
        physicalExam: {
            inspection: "Right wrist drop, inability to extend fingers at MCP joints",
            palpation: "No tenderness over spiral groove or elbow",
            rom: "Full passive ROM, limited active extension",
            strength: "Wrist extensors 0/5, finger extensors 0/5, triceps 5/5, brachioradialis 5/5",
            sensation: "Decreased sensation in first web space (superficial radial distribution)",
            reflexes: "Triceps reflex normal. Brachioradialis present but weak due to positioning.",
            specialTests: "Negative Tinel's at elbow, positive wrist drop sign"
        },
        differentialDiagnosis: ["Radial nerve palsy (spiral groove)", "Posterior interosseous syndrome", "Cervical radiculopathy", "Stroke"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Radial Nerve Palsy (Spiral Groove)",
        explanation: "Classic Saturday night palsy with wrist drop, preserved triceps and brachioradialis, localizing lesion to spiral groove level of radial nerve.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Superficial radial",
                    recording: "First web space",
                    peakLatency: 4.5,
                    amplitude: 8,
                    cv: 42,
                    normal: false
                },
                {
                    nerve: "Median - index",
                    recording: "Index finger",
                    peakLatency: 2.8,
                    amplitude: 45,
                    cv: 58,
                    normal: true
                }
            ],
            motorStudies: [
                {
                    nerve: "Radial",
                    recording: "EIP",
                    distalLatency: 5.2,
                    amplitude: 2,
                    cv: 38,
                    normal: false
                },
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 3.2,
                    amplitude: 12,
                    cv: 58,
                    normal: true
                }
            ],
            emgFindings: [
                {
                    muscle: "Extensor Carpi Radialis",
                    nerve: "Radial",
                    root: "C5-C6-C7",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
                    abnormal: true
                },
                {
                    muscle: "Extensor Digitorum Communis",
                    nerve: "Posterior interosseous",
                    root: "C7-C8",
                    insertionalActivity: "Increased",
                    spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                    recruitment: "No voluntary activity",
                    motorUnits: "None",
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
                },
                {
                    muscle: "Brachioradialis",
                    nerve: "Radial",
                    root: "C5-C6-C7",
                    insertionalActivity: "Normal",
                    spontaneousActivity: "None",
                    recruitment: "Normal",
                    motorUnits: "Normal morphology",
                    abnormal: false
                }
            ]
        }
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
        differentialDiagnosis: ["Cervical radiculopathy", "Lateral epicondylitis", "Bicipital tendinitis", "Carpal tunnel syndrome"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C6 Radiculopathy",
        explanation: "C6 radiculopathy with classic biceps/brachioradialis weakness, diminished reflexes, and lateral arm/thumb sensory loss. Spurling's sign supports cervical origin.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Lateral antebrachial cutaneous",
                    recording: "Lateral forearm",
                    peakLatency: 2.8,
                    amplitude: 25,
                    cv: 56,
                    normal: true
                },
                {
                    nerve: "Median - index",
                    recording: "Index finger",
                    peakLatency: 2.8,
                    amplitude: 42,
                    cv: 58,
                    normal: true
                }
            ],
            motorStudies: [
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 3.2,
                    amplitude: 11,
                    cv: 56,
                    normal: true
                },
                {
                    nerve: "Radial",
                    recording: "EIP",
                    distalLatency: 3.8,
                    amplitude: 8,
                    cv: 52,
                    normal: true
                }
            ],
            emgFindings: [
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
            ]
        }
    },
    'als': {
        title: "Progressive Weakness and Muscle Twitching",
        difficulty: "advanced",
        presentation: {
            age: 58,
            gender: "Male",
            occupation: "Engineer",
            chiefComplaint: "8-month history of progressive weakness in right hand and visible muscle twitching",
            history: "Started with weakness in right hand, difficulty with fine motor tasks like writing and buttoning shirts. Recently developed weakness in left hand and noticed muscle twitching in arms. Some difficulty with speech articulation. Denies sensory symptoms or bowel/bladder dysfunction.",
            pmh: "Hypertension",
            medications: "Amlodipine"
        },
        physicalExam: {
            inspection: "Visible fasciculations in bilateral thenar and hypothenar eminences, deltoids, and tongue. Mild atrophy of right first dorsal interosseous",
            palpation: "Fasciculations palpable in multiple muscle groups. No tenderness",
            rom: "Full ROM throughout",
            strength: "Right hand intrinsics 3/5, left hand intrinsics 4/5. Grip strength reduced bilaterally. Proximal strength mildly reduced in arms",
            sensation: "Normal throughout",
            reflexes: "Hyperreflexic throughout (3+). Positive Hoffmann sign bilaterally. Jaw jerk present",
            specialTests: "Positive Babinski bilaterally. Tongue fasciculations visible. Mild dysarthria"
        },
        differentialDiagnosis: ["Amyotrophic lateral sclerosis", "Motor neuron disease", "Progressive muscular atrophy", "Primary lateral sclerosis", "Kennedy disease", "Multifocal motor neuropathy", "Cervical myelopathy"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Amyotrophic Lateral Sclerosis (ALS)",
        explanation: "Progressive weakness with both upper motor neuron signs (hyperreflexia, Babinski) and lower motor neuron signs (fasciculations, atrophy), preserved sensation, and EMG showing widespread denervation with fasciculations confirms ALS.",
        ncsResults: {
            antiSensorySummary: [
                {
                    site: "Right Median Sensory (Index Finger)",
                    nr: "2.5",
                    peak: "2.9",
                    normPeak: "<3.4",
                    ptAmp: "18.0",
                    normPT: ">15",
                    site1: "Wrist",
                    site2: "Index Finger",
                    deltaP: "2.7",
                    dist: "13.0",
                    vel: "58",
                    normVel: ">50",
                    abnormal: false
                },
                {
                    site: "Right Ulnar Sensory (Little Finger)",
                    nr: "2.5",
                    peak: "3.0",
                    normPeak: "<3.4",
                    ptAmp: "15.0",
                    normPT: ">10",
                    site1: "Wrist",
                    site2: "Little Finger",
                    deltaP: "2.8",
                    dist: "13.0",
                    vel: "62",
                    normVel: ">49",
                    abnormal: false
                }
            ],
            motorSummary: [
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "4.5",
                    onset: "3.4",
                    normOnset: "<4.2",
                    opAmp: "2.1",
                    normOPAmp: ">5",
                    negDur: "6.2",
                    site1: "Wrist",
                    site2: "APB",
                    deltaO: "3.2",
                    dist: "7.0",
                    vel: "58",
                    normVel: ">50",
                    abnormal: true
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "4.5",
                    onset: "3.1",
                    normOnset: "<3.3",
                    opAmp: "3.2",
                    normOPAmp: ">6",
                    negDur: "6.0",
                    site1: "Wrist",
                    site2: "ADM",
                    deltaO: "2.9",
                    dist: "7.0",
                    vel: "62",
                    normVel: ">53",
                    abnormal: true
                }
            ],
            comparisonSummary: [],
            emgFindings: []
        },
        emgFindings: [
            {
                muscle: "First Dorsal Interosseous",
                nerve: "Deep ulnar",
                root: "C8-T1",
                insertionalActivity: "Increased",
                spontaneousActivity: "Frequent fasciculations, 3+ fibrillations, 2+ PSWs",
                recruitment: "Severely reduced",
                motorUnits: "Large amplitude, long duration potentials",
                abnormal: true
            },
            {
                muscle: "Deltoid",
                nerve: "Axillary",
                root: "C5-C6",
                insertionalActivity: "Increased",
                spontaneousActivity: "Fasciculations, fibrillations",
                recruitment: "Reduced",
                motorUnits: "Giant motor unit potentials",
                abnormal: true
            },
            {
                muscle: "Tongue",
                nerve: "Hypoglossal",
                root: "Brainstem",
                insertionalActivity: "Increased",
                spontaneousActivity: "Frequent fasciculations, fibrillations",
                recruitment: "Reduced",
                motorUnits: "Large, unstable potentials",
                abnormal: true
            }
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
        differentialDiagnosis: ["Inflammatory myopathy", "Polymyositis", "Dermatomyositis", "Inclusion body myositis", "Thyroid myopathy", "Muscular dystrophy", "Metabolic myopathy"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Inflammatory Myopathy (likely Polymyositis)",
        explanation: "Proximal muscle weakness, elevated CK (implied), normal NCS with myopathic EMG changes showing membrane instability and small, short-duration motor units in proximal muscles supports inflammatory myopathy.",
        ncsResults: {
            antiSensorySummary: [
                {
                    site: "Right Median Sensory (Index Finger)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.4",
                    ptAmp: "20.0",
                    normPT: ">15",
                    site1: "Wrist",
                    site2: "Index Finger",
                    deltaP: "2.9",
                    dist: "13.0",
                    vel: "58",
                    normVel: ">50",
                    abnormal: false
                },
                {
                    site: "Right Ulnar Sensory (Little Finger)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.4",
                    ptAmp: "18.0",
                    normPT: ">10",
                    site1: "Wrist",
                    site2: "Little Finger",
                    deltaP: "2.6",
                    dist: "13.0",
                    vel: "62",
                    normVel: ">49",
                    abnormal: false
                }
            ],
            motorSummary: [
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "4.5",
                    onset: "3.0",
                    normOnset: "<4.2",
                    opAmp: "8.5",
                    normOPAmp: ">5",
                    negDur: "6.2",
                    site1: "Wrist",
                    site2: "APB",
                    deltaO: "2.8",
                    dist: "7.0",
                    vel: "58",
                    normVel: ">50",
                    abnormal: false
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "4.5",
                    onset: "2.8",
                    normOnset: "<3.3",
                    opAmp: "10.2",
                    normOPAmp: ">6",
                    negDur: "6.0",
                    site1: "Wrist",
                    site2: "ADM",
                    deltaO: "2.6",
                    dist: "7.0",
                    vel: "62",
                    normVel: ">53",
                    abnormal: false
                }
            ],
            comparisonSummary: [],
            emgFindings: []
        },
        emgFindings: [
            {
                muscle: "Deltoid",
                nerve: "Axillary",
                root: "C5-C6",
                insertionalActivity: "Increased",
                spontaneousActivity: "Frequent fibrillations, PSWs, complex repetitive discharges",
                recruitment: "Early, full recruitment",
                motorUnits: "Small, short-duration, polyphasic potentials",
                abnormal: true
            },
            {
                muscle: "Biceps",
                nerve: "Musculocutaneous",
                root: "C5-C6-C7",
                insertionalActivity: "Increased",
                spontaneousActivity: "Fibrillations, PSWs",
                recruitment: "Early recruitment",
                motorUnits: "Small amplitude, short duration units",
                abnormal: true
            },
            {
                muscle: "Iliopsoas",
                nerve: "Femoral/L1-L2",
                root: "L1-L2-L3",
                insertionalActivity: "Increased",
                spontaneousActivity: "Abnormal spontaneous activity",
                recruitment: "Early recruitment",
                motorUnits: "Myopathic motor unit potentials",
                abnormal: true
            }
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
        differentialDiagnosis: ["C5 radiculopathy", "Cervical disc herniation", "Suprascapular neuropathy", "Axillary neuropathy", "Brachial plexopathy", "Rotator cuff tear"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C5 Radiculopathy",
        explanation: "Acute onset neck pain with radiation, C5 distribution weakness (deltoid, biceps, supraspinatus), diminished biceps reflex, positive Spurling's test, and EMG showing denervation in C5 myotome muscles confirms C5 radiculopathy.",
        ncsResults: {
            antiSensorySummary: [
                {
                    site: "Right Median Sensory (Index Finger)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.4",
                    ptAmp: "42.0",
                    normPT: ">15",
                    site1: "Wrist",
                    site2: "Index Finger",
                    deltaP: "2.6",
                    dist: "13.0",
                    vel: "58",
                    normVel: ">50",
                    abnormal: false
                },
                {
                    site: "Right Ulnar Sensory (Little Finger)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.4",
                    ptAmp: "18.0",
                    normPT: ">10",
                    site1: "Wrist",
                    site2: "Little Finger",
                    deltaP: "2.6",
                    dist: "13.0",
                    vel: "62",
                    normVel: ">49",
                    abnormal: false
                },
                {
                    site: "Right Lateral Antebrachial Cutaneous",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.2",
                    ptAmp: "25.0",
                    normPT: ">20",
                    site1: "Elbow",
                    site2: "Lateral Forearm",
                    deltaP: "2.6",
                    dist: "12.0",
                    vel: "56",
                    normVel: ">50",
                    abnormal: false
                }
            ],
            motorSummary: [
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "4.5",
                    onset: "3.2",
                    normOnset: "<4.2",
                    opAmp: "11.0",
                    normOPAmp: ">5",
                    negDur: "6.2",
                    site1: "Wrist",
                    site2: "APB",
                    deltaO: "3.0",
                    dist: "7.0",
                    vel: "56",
                    normVel: ">50",
                    abnormal: false
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "4.5",
                    onset: "2.7",
                    normOnset: "<3.3",
                    opAmp: "12.0",
                    normOPAmp: ">6",
                    negDur: "6.0",
                    site1: "Wrist",
                    site2: "ADM",
                    deltaO: "2.5",
                    dist: "7.0",
                    vel: "62",
                    normVel: ">53",
                    abnormal: false
                }
            ],
            comparisonSummary: [],
            emgFindings: []
        },
        emgFindings: [
            {
                muscle: "Deltoid",
                nerve: "Axillary",
                root: "C5-C6",
                insertionalActivity: "Increased",
                spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                recruitment: "Severely reduced",
                motorUnits: "Large, polyphasic units with reinnervation",
                abnormal: true
            },
            {
                muscle: "Biceps",
                nerve: "Musculocutaneous",
                root: "C5-C6-C7",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "Reduced",
                motorUnits: "Large amplitude, polyphasic potentials",
                abnormal: true
            },
            {
                muscle: "Supraspinatus",
                nerve: "Suprascapular",
                root: "C5-C6",
                insertionalActivity: "Increased",
                spontaneousActivity: "3+ fibrillations, 3+ PSWs",
                recruitment: "Severely reduced",
                motorUnits: "Large, unstable potentials",
                abnormal: true
            },
            {
                muscle: "Cervical Paraspinals (C5)",
                nerve: "Dorsal rami",
                root: "C5",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "N/A",
                motorUnits: "N/A",
                abnormal: true
            }
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
        differentialDiagnosis: ["Diabetic polyneuropathy", "Distal sensorimotor polyneuropathy", "Peripheral neuropathy", "Chronic inflammatory demyelinating polyneuropathy", "Vitamin deficiency neuropathy", "Toxic neuropathy"],
        requiresEMG: false,
        emgIndication: "INDICATED FOR LOCALIZATION",
        correctDiagnosis: "Diabetic Distal Sensorimotor Polyneuropathy",
        explanation: "Length-dependent sensorimotor polyneuropathy with stocking-glove distribution, absent reflexes, and uniform slowing on NCS studies in a patient with long-standing diabetes confirms diabetic polyneuropathy.",
        ncsResults: {
            sensoryStudies: [
                {
                    nerve: "Median - index",
                    recording: "Index finger",
                    peakLatency: 4.8,
                    amplitude: 4,
                    cv: 38,
                    normal: false
                },
                {
                    nerve: "Ulnar - little",
                    recording: "Little finger",
                    peakLatency: 4.2,
                    amplitude: 6,
                    cv: 42,
                    normal: false
                },
                {
                    nerve: "Sural",
                    recording: "Lateral foot",
                    peakLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                },
                {
                    nerve: "Superficial fibular",
                    recording: "Lateral leg",
                    peakLatency: 0,
                    amplitude: 0,
                    cv: 0,
                    normal: false
                }
            ],
            motorStudies: [
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 5.2,
                    amplitude: 4.8,
                    cv: 38,
                    normal: false
                },
                {
                    nerve: "Ulnar",
                    recording: "ADM",
                    distalLatency: 4.8,
                    amplitude: 5.2,
                    cv: 42,
                    normal: false
                },
                {
                    nerve: "Peroneal",
                    recording: "EDB",
                    distalLatency: 7.2,
                    amplitude: 0.8,
                    cv: 28,
                    normal: false
                },
                {
                    nerve: "Tibial",
                    recording: "AH",
                    distalLatency: 6.8,
                    amplitude: 2.2,
                    cv: 32,
                    normal: false
                }
            ]
        },
        emgFindings: [
            {
                muscle: "Extensor Digitorum Brevis",
                nerve: "Deep peroneal",
                root: "L5-S1",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "Reduced",
                motorUnits: "Large, polyphasic units",
                abnormal: true
            },
            {
                muscle: "Tibialis Anterior",
                nerve: "Deep peroneal",
                root: "L4-L5-S1",
                insertionalActivity: "Increased",
                spontaneousActivity: "1+ fibrillations",
                recruitment: "Mildly reduced",
                motorUnits: "Polyphasic units",
                abnormal: true
            }
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
        differentialDiagnosis: ["C7 radiculopathy", "Cervical disc herniation", "Posterior interosseous syndrome", "Radial tunnel syndrome", "Lateral epicondylitis", "Cervical spondylosis"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Right C7 Radiculopathy",
        explanation: "Neck pain with C7 distribution weakness (wrist/finger extensors, triceps), diminished triceps reflex, C7 dermatomal sensory loss, positive Spurling's test, and EMG showing denervation in C7 myotome muscles confirms C7 radiculopathy.",
        ncsResults: {
            ...getStandardUpperExtremityNCS(),
            sensoryStudies: [
                {
                    nerve: "Median - middle",
                    recording: "Middle finger",
                    peakLatency: 3.8,
                    amplitude: 12,
                    cv: 52,
                    normal: false
                },
                {
                    nerve: "Radial - first web",
                    recording: "First web space",
                    peakLatency: 3.2,
                    amplitude: 18,
                    cv: 56,
                    normal: true
                }
            ],
            motorStudies: [
                {
                    nerve: "Median",
                    recording: "APB",
                    distalLatency: 3.2,
                    amplitude: 9.5,
                    cv: 58,
                    normal: true
                },
                {
                    nerve: "Radial",
                    recording: "EIP",
                    distalLatency: 3.8,
                    amplitude: 6.2,
                    cv: 52,
                    normal: true
                }
            ]
        },
        emgFindings: [
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
        differentialDiagnosis: ["Ulnar neuropathy at Guyon's canal", "Cyclist's palsy", "Cubital tunnel syndrome", "C8 radiculopathy", "Ulnar neuropathy at elbow", "Thoracic outlet syndrome"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal (Cyclist's Palsy)",
        explanation: "Compression neuropathy from prolonged pressure on handlebars affecting deep branch of ulnar nerve in Guyon's canal, sparing sensory branches and flexor carpi ulnaris (proximal to canal).",
        ncsResults: {
            ...getStandardUpperExtremityNCS(),
            sensoryStudies: [
                {
                    nerve: "Ulnar - little",
                    recording: "Little finger",
                    peakLatency: 2.8,
                    amplitude: 22,
                    cv: 62,
                    normal: true
                },
                {
                    nerve: "Dorsal ulnar cutaneous",
                    recording: "Dorsal hand",
                    peakLatency: 2.6,
                    amplitude: 18,
                    cv: 58,
                    normal: true
                }
            ],
            motorStudies: [
                {
                    nerve: "Ulnar",
                    recording: "ADM",
                    distalLatency: 4.2,
                    amplitude: 6.8,
                    cv: 58,
                    normal: false
                },
                {
                    nerve: "Ulnar",
                    recording: "FDI",
                    distalLatency: 4.8,
                    amplitude: 5.2,
                    cv: 55,
                    normal: false
                }
            ]
        },
        emgFindings: [
            {
                muscle: "First Dorsal Interosseous",
                nerve: "Deep ulnar",
                root: "C8-T1",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "Reduced",
                motorUnits: "Large, polyphasic units",
                abnormal: true
            },
            {
                muscle: "Abductor Digiti Minimi",
                nerve: "Deep ulnar",
                root: "C8-T1",
                insertionalActivity: "Increased",
                spontaneousActivity: "1+ fibrillations",
                recruitment: "Mildly reduced",
                motorUnits: "Polyphasic units",
                abnormal: true
            },
            {
                muscle: "Flexor Carpi Ulnaris",
                nerve: "Ulnar",
                root: "C8-T1",
                insertionalActivity: "Normal",
                spontaneousActivity: "None",
                recruitment: "Normal",
                motorUnits: "Normal morphology",
                abnormal: false
            }
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
        differentialDiagnosis: ["L5 radiculopathy", "Lumbar disc herniation", "Common peroneal neuropathy", "Sciatic neuropathy", "Lumbosacral plexopathy", "L5-S1 disc protrusion"],
        requiresEMG: true,
        emgIndication: "INDICATED",
        correctDiagnosis: "Left L5 Radiculopathy",
        explanation: "Acute onset back pain with radiation, L5 distribution weakness (dorsiflexion, great toe extension), L5 dermatomal sensory loss, positive SLR, and EMG showing denervation in L5 myotome muscles confirms L5 radiculopathy.",
        ncsResults: {
            ...getStandardLowerExtremityNCS(),
            sensoryStudies: [
                {
                    nerve: "Superficial fibular",
                    recording: "Lateral leg",
                    peakLatency: 3.6,
                    amplitude: 15,
                    cv: 45,
                    normal: true
                },
                {
                    nerve: "Sural",
                    recording: "Lateral foot",
                    peakLatency: 3.8,
                    amplitude: 18,
                    cv: 48,
                    normal: true
                }
            ],
            motorStudies: [
                {
                    nerve: "Peroneal",
                    recording: "EDB",
                    distalLatency: 4.2,
                    amplitude: 6,
                    cv: 48,
                    normal: true
                },
                {
                    nerve: "Peroneal",
                    recording: "TA",
                    distalLatency: 3.8,
                    amplitude: 8,
                    cv: 52,
                    normal: true
                }
            ]
        },
        emgFindings: [
            {
                muscle: "Tibialis Anterior",
                nerve: "Deep peroneal",
                root: "L4-L5-S1",
                insertionalActivity: "Increased",
                spontaneousActivity: "3+ fibrillations, 3+ PSWs",
                recruitment: "Severely reduced",
                motorUnits: "Large, polyphasic units",
                abnormal: true
            },
            {
                muscle: "Extensor Hallucis Longus",
                nerve: "Deep peroneal",
                root: "L4-L5-S1",
                insertionalActivity: "Increased",
                spontaneousActivity: "3+ fibrillations, 2+ PSWs",
                recruitment: "Severely reduced",
                motorUnits: "Large amplitude potentials",
                abnormal: true
            },
            {
                muscle: "Peroneus Longus",
                nerve: "Superficial peroneal",
                root: "L5-S1-S2",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations",
                recruitment: "Reduced",
                motorUnits: "Polyphasic units",
                abnormal: true
            },
            {
                muscle: "Lumbar Paraspinals (L5)",
                nerve: "Dorsal rami",
                root: "L5",
                insertionalActivity: "Increased",
                spontaneousActivity: "2+ fibrillations, 1+ PSWs",
                recruitment: "N/A",
                motorUnits: "N/A",
                abnormal: true
            }
        ]
    },

    // Myasthenia Gravis - Neuromuscular Junction Disorder
    mg: {
        title: "Progressive Muscle Weakness with Fatigue",
        difficulty: "intermediate",
        presentation: {
            age: "32",
            gender: "Female",
            chiefComplaint: "Progressive weakness and fatigue, worse with exercise, affecting eyelids and speech"
        },
        history: {
            historyOfPresentIllness: "32-year-old woman presents with 6-month history of progressively worsening weakness and fatigue. Symptoms initially affected eyelids causing ptosis, then progressed to difficulty speaking and chewing. Weakness worse at end of day and after physical activity. Some improvement with rest.",
            pastMedicalHistory: "No significant past medical history",
            medications: "None",
            familyHistory: "No known neuromuscular disorders",
            socialHistory: "Non-smoker, works as teacher"
        },
        physicalExamination: {
            generalAppearance: "Alert, well-appearing female with mild bilateral ptosis",
            musculoskeletalExam: "Proximal muscle weakness, more pronounced after exercise. Fatigable weakness of extraocular muscles.",
            neurologicalExam: "Normal reflexes, normal sensation, fatigable weakness especially ocular and bulbar muscles"
        },
        ncsStudies: [
            {
                nerve: "Median",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Ulnar",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Median",
                type: "motor",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Ulnar",
                type: "motor",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            }
        ],
        emgStudies: [
            {
                muscle: "Repetitive nerve stimulation - Median nerve",
                interpretation: "Significant decremental response >10% at 3 Hz stimulation"
            },
            {
                muscle: "Single fiber EMG - Frontalis",
                interpretation: "Increased jitter and blocking consistent with neuromuscular junction disorder"
            }
        ],
        specialTests: [
            "Repetitive nerve stimulation showing >10% decrement",
            "Single fiber EMG showing increased jitter",
            "Edrophonium test positive",
            "Acetylcholine receptor antibodies positive"
        ],
        diagnosis: "Myasthenia Gravis",
        differentialDiagnosis: [
            "Lambert-Eaton myasthenic syndrome",
            "Botulism",
            "Congenital myasthenic syndromes",
            "Thyroid eye disease",
            "Ocular myositis"
        ],
        treatmentPlan: [
            "Acetylcholinesterase inhibitors (pyridostigmine)",
            "Immunosuppressive therapy",
            "Thymus evaluation/thymectomy consideration",
            "Avoid medications that worsen myasthenia"
        ],
        educationalNotes: {
            keyPoints: [
                "Myasthenia gravis affects the neuromuscular junction",
                "Characterized by fatigable weakness",
                "Repetitive nerve stimulation shows decremental response",
                "Single fiber EMG shows increased jitter",
                "Standard NCS and needle EMG are typically normal"
            ],
            clinicalPearls: [
                "Weakness that worsens with activity and improves with rest",
                "Often presents with ocular symptoms first",
                "Edrophonium test can be diagnostic",
                "Associated with thymoma in some patients"
            ]
        }
    },

    // Tarsal Tunnel Syndrome - Lower Extremity Entrapment Neuropathy
    tarsal: {
        title: "Foot Numbness and Burning Pain",
        difficulty: "intermediate",
        presentation: {
            age: "45",
            gender: "Female",
            chiefComplaint: "Burning pain and numbness in the sole of the foot, worse at night"
        },
        history: {
            historyOfPresentIllness: "45-year-old female runner presents with 8-month history of progressive burning pain and numbness affecting the sole of right foot. Symptoms worse at night and after prolonged standing. Some relief with elevation and rest. Numbness affects toes and medial plantar surface.",
            pastMedicalHistory: "History of ankle sprain 1 year ago, no diabetes",
            medications: "Ibuprofen as needed",
            familyHistory: "No known neuropathies",
            socialHistory: "Long-distance runner, works as nurse (prolonged standing)"
        },
        physicalExamination: {
            generalAppearance: "Well-appearing female, mild antalgic gait",
            musculoskeletalExam: "Mild swelling posterior to medial malleolus, positive Tinel's sign over tarsal tunnel",
            neurologicalExam: "Decreased sensation in medial plantar distribution, weakness of abductor hallucis muscle"
        },
        ncsStudies: [
            {
                nerve: "Sural",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Superficial Fibular",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Tibial",
                type: "motor",
                result: "Normal to ankle",
                interpretation: "Normal amplitude and conduction velocity to ankle"
            },
            {
                nerve: "Medial Plantar",
                type: "sensory",
                result: "Prolonged",
                interpretation: "Prolonged distal latency 4.2 ms (normal <3.5 ms)"
            },
            {
                nerve: "Lateral Plantar",
                type: "sensory",
                result: "Abnormal",
                interpretation: "Reduced amplitude 8 μV (normal >15 μV)"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor hallucis",
                interpretation: "Chronic neuropathic changes with reduced recruitment"
            },
            {
                muscle: "Flexor digitorum brevis",
                interpretation: "Mild chronic denervation changes"
            }
        ],
        specialTests: [
            "MRI showing space-occupying lesion in tarsal tunnel",
            "Positive Tinel's sign over posterior tibial nerve",
            "Positive plantar flexion-eversion test"
        ],
        diagnosis: "Tarsal Tunnel Syndrome",
        differentialDiagnosis: [
            "Plantar fasciitis",
            "S1 radiculopathy",
            "Diabetic neuropathy",
            "Peripheral arterial disease",
            "Morton's neuroma"
        ],
        treatmentPlan: [
            "Activity modification",
            "NSAIDs and neuropathic pain medications",
            "Physical therapy and stretching",
            "Corticosteroid injection",
            "Surgical decompression if conservative treatment fails"
        ],
        educationalNotes: {
            keyPoints: [
                "Entrapment of posterior tibial nerve in tarsal tunnel",
                "Affects medial and lateral plantar nerve branches",
                "Often requires specialized nerve conduction studies",
                "Can be caused by space-occupying lesions or anatomical variants",
                "Conservative treatment often successful if caught early"
            ],
            clinicalPearls: [
                "Symptoms often worse at night or after prolonged activity",
                "Tinel's sign positive over tarsal tunnel",
                "Medial plantar nerve more commonly affected than lateral",
                "May require surgical decompression in refractory cases"
            ]
        }
    },

    // S1 Radiculopathy - Different Root Level with H-reflex
    s1radiculopathy: {
        title: "Lower Back Pain with Foot Weakness",
        difficulty: "intermediate",
        presentation: {
            age: "52",
            gender: "Male",
            chiefComplaint: "Lower back pain radiating to posterior leg and lateral foot"
        },
        history: {
            historyOfPresentIllness: "52-year-old male presents with 4-month history of lower back pain following heavy lifting at work. Pain radiates down posterior aspect of right leg to lateral foot. Associated numbness in lateral foot and weakness in plantarflexion. Pain worse with sitting and forward flexion.",
            pastMedicalHistory: "History of lower back pain, no diabetes",
            medications: "Ibuprofen, gabapentin",
            familyHistory: "No known back problems",
            socialHistory: "Construction worker, smoker 1 pack/day"
        },
        physicalExamination: {
            generalAppearance: "Male in mild distress with antalgic gait",
            musculoskeletalExam: "Positive straight leg raise at 45 degrees on right, limited lumbar flexion",
            neurologicalExam: "Weakness in plantarflexion (4/5), diminished Achilles reflex, decreased sensation lateral foot"
        },
        ncsStudies: [
            {
                nerve: "Sural",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Superficial Fibular",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Tibial",
                type: "motor",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            },
            {
                nerve: "Fibular",
                type: "motor",
                result: "Normal",
                interpretation: "Normal amplitude and conduction velocity"
            }
        ],
        emgStudies: [
            {
                muscle: "Gastrocnemius medial head",
                interpretation: "Active denervation with 2+ fibrillations and positive sharp waves"
            },
            {
                muscle: "Tibialis posterior",
                interpretation: "Chronic neuropathic changes with large polyphasic motor units"
            },
            {
                muscle: "Gluteus maximus",
                interpretation: "Active denervation changes consistent with S1 radiculopathy"
            },
            {
                muscle: "Lumbar paraspinals L5-S1",
                interpretation: "Active denervation with 3+ fibrillations and positive sharp waves"
            }
        ],
        specialTests: [
            "H-reflex: Prolonged latency 35 ms (normal <32 ms)",
            "MRI lumbar spine: L5-S1 disc herniation with nerve root compression",
            "Positive straight leg raise test"
        ],
        diagnosis: "S1 Radiculopathy",
        differentialDiagnosis: [
            "Piriformis syndrome",
            "Sciatic neuropathy",
            "Lumbar stenosis",
            "Sacroiliac joint dysfunction",
            "Fibular neuropathy"
        ],
        treatmentPlan: [
            "Physical therapy and core strengthening",
            "Neuropathic pain medications",
            "Epidural steroid injection",
            "Activity modification and ergonomics",
            "Surgical consultation if conservative treatment fails"
        ],
        educationalNotes: {
            keyPoints: [
                "S1 nerve root compression affects plantarflexion strength",
                "H-reflex is a sensitive test for S1 radiculopathy",
                "EMG shows denervation in S1 myotome muscles",
                "NCS are typically normal in radiculopathy",
                "Paraspinal muscles involved suggest root vs. peripheral nerve"
            ],
            clinicalPearls: [
                "H-reflex abnormalities occur early in S1 radiculopathy",
                "Gastrocnemius and gluteus maximus involvement is characteristic",
                "Sural nerve should be normal (distinguishes from sciatic neuropathy)",
                "Paraspinal abnormalities confirm preganglionic (root) lesion"
            ]
        }
    },

    // Double Crush Syndrome - C8 Radiculopathy + Cubital Tunnel
    doublecrush: {
        title: "Hand Weakness with Neck and Elbow Pain",
        difficulty: "difficult",
        presentation: {
            age: "48",
            gender: "Male",
            chiefComplaint: "Progressive weakness and numbness in right hand with neck pain"
        },
        history: {
            historyOfPresentIllness: "48-year-old male programmer presents with 8-month history of progressive numbness and weakness affecting right hand. Symptoms include numbness in ring and little fingers, weakness gripping objects, and neck pain radiating down right arm. Symptoms worse with prolonged computer use and overhead activities.",
            pastMedicalHistory: "Cervical disc disease, diabetes mellitus type 2",
            medications: "Metformin, gabapentin",
            familyHistory: "Diabetes in family",
            socialHistory: "Software programmer, long hours at computer"
        },
        physicalExamination: {
            generalAppearance: "Well-appearing male with mild right hand muscle atrophy",
            musculoskeletalExam: "Cervical extension reproduces right arm symptoms, positive elbow flexion test on right",
            neurologicalExam: "Right hand intrinsics weakness (4/5), diminished sensation C8/ulnar distribution on right, positive Tinel's at right elbow"
        },
        ncsStudies: [
            {
                nerve: "Median",
                type: "sensory",
                result: "Mildly prolonged",
                interpretation: "Right median sensory: mildly prolonged distal latency 3.8 ms (normal <3.5 ms)"
            },
            {
                nerve: "Ulnar",
                type: "sensory",
                result: "Reduced amplitude",
                interpretation: "Right ulnar sensory: reduced amplitude 12 μV (normal >15 μV), normal latency"
            },
            {
                nerve: "Median",
                type: "motor",
                result: "Normal",
                interpretation: "Right median motor: normal amplitude and conduction velocity"
            },
            {
                nerve: "Ulnar",
                type: "motor",
                result: "Conduction block",
                interpretation: "Right ulnar motor: conduction block across elbow 40% amplitude drop (normal <20%)"
            }
        ],
        emgStudies: [
            {
                muscle: "Right first dorsal interosseous",
                interpretation: "Active denervation with 2+ fibrillations and chronic neuropathic changes"
            },
            {
                muscle: "Right abductor digiti minimi",
                interpretation: "Active denervation with 3+ fibrillations and large polyphasic MUAPs"
            },
            {
                muscle: "Right flexor carpi ulnaris",
                interpretation: "Mild chronic changes, no active denervation"
            },
            {
                muscle: "Right cervical paraspinals C7-C8",
                interpretation: "Active denervation with 2+ fibrillations consistent with radiculopathy"
            },
            {
                muscle: "Right extensor indicis proprius",
                interpretation: "Chronic neuropathic changes in C8 distribution"
            },
            {
                muscle: "Right biceps",
                interpretation: "Normal recruitment and motor unit morphology (C5-C6 innervation normal)"
            },
            {
                muscle: "Right triceps",
                interpretation: "Mild chronic changes with large polyphasic MUAPs (C7-C8 radiculopathy involvement)"
            },
            {
                muscle: "Right deltoid",
                interpretation: "Normal recruitment and motor unit morphology (C5-C6 innervation normal)"
            }
        ],
        specialTests: [
            "MRI cervical spine: Right C7-C8 disc herniation with foraminal stenosis",
            "MRI right elbow: Ulnar nerve swelling and signal changes at cubital tunnel",
            "Diabetic neuropathy screening studies"
        ],
        diagnosis: "Double Crush Syndrome: C8 Radiculopathy with Cubital Tunnel Syndrome",
        differentialDiagnosis: [
            "Isolated ulnar neuropathy",
            "C8 radiculopathy alone",
            "Diabetic neuropathy",
            "Thoracic outlet syndrome",
            "Multiple mononeuropathy"
        ],
        treatmentPlan: [
            "Right cervical epidural steroid injection",
            "Right ulnar nerve decompression surgery at elbow",
            "Diabetic control optimization",
            "Ergonomic workplace modifications",
            "Physical therapy for cervical and right arm"
        ],
        educationalNotes: {
            keyPoints: [
                "Double crush syndrome involves two compression sites on same nerve pathway",
                "C8 radiculopathy affects ulnar nerve distribution muscles",
                "Cubital tunnel syndrome shows focal conduction block at elbow",
                "Both conditions must be treated for optimal recovery",
                "EMG helps differentiate proximal vs. distal pathology"
            ],
            clinicalPearls: [
                "Paraspinal involvement confirms radiculopathy component",
                "Conduction block at elbow suggests cubital tunnel syndrome",
                "Double crush makes each individual lesion more symptomatic",
                "Diabetes increases risk of multiple nerve compressions"
            ]
        }
    },

    // Diabetic Polyneuropathy - Length-dependent Sensorimotor Neuropathy
    diabetic: {
        title: "Progressive Numbness in Hands and Feet",
        difficulty: "intermediate",
        presentation: {
            age: "62",
            gender: "Male",
            chiefComplaint: "Progressive numbness in feet and hands with weakness"
        },
        history: {
            historyOfPresentIllness: "62-year-old retired mechanic with 1-year history of progressive numbness starting in toes, now involves fingertips bilaterally. Difficulty walking due to imbalance. 15 years of diabetes with poor glucose control.",
            pastMedicalHistory: "Diabetes mellitus type 2, hypertension, hyperlipidemia",
            medications: "Insulin, metformin, lisinopril, atorvastatin",
            familyHistory: "Diabetes in family",
            socialHistory: "Retired mechanic, former smoker"
        },
        physicalExamination: {
            generalAppearance: "Steady gait but decreased arm swing",
            musculoskeletalExam: "Decreased muscle bulk in distal legs",
            neurologicalExam: "Stocking-glove sensory loss, distal weakness (dorsiflexion 4/5), absent Achilles reflexes"
        },
        ncsStudies: [
            {
                nerve: "Median",
                type: "sensory",
                result: "Abnormal",
                interpretation: "Prolonged peak latency 4.8 ms, markedly reduced amplitude 4 μV"
            },
            {
                nerve: "Ulnar",
                type: "sensory",
                result: "Abnormal",
                interpretation: "Prolonged peak latency 4.2 ms, reduced amplitude 6 μV"
            },
            {
                nerve: "Median",
                type: "motor",
                result: "Abnormal",
                interpretation: "Prolonged distal latency 5.2 ms, reduced amplitude 3.1 mV"
            },
            {
                nerve: "Ulnar",
                type: "motor",
                result: "Abnormal",
                interpretation: "Prolonged distal latency 4.8 ms, reduced amplitude 4.2 mV"
            },
            {
                nerve: "Sural",
                type: "sensory",
                result: "Absent",
                interpretation: "No response obtained"
            },
            {
                nerve: "Tibial",
                type: "motor",
                result: "Abnormal",
                interpretation: "Prolonged distal latency 6.8 ms, reduced amplitude 2.1 mV"
            },
            {
                nerve: "Fibular",
                type: "motor",
                result: "Abnormal",
                interpretation: "Prolonged distal latency 7.2 ms, markedly reduced amplitude 0.8 mV"
            }
        ],
        specialTests: [
            "HbA1c elevated at 9.2%",
            "Nerve biopsy: loss of myelinated fibers",
            "Normal vitamin B12 and folate levels"
        ],
        diagnosis: "Diabetic Distal Sensorimotor Polyneuropathy",
        differentialDiagnosis: [
            "Vitamin deficiency neuropathy",
            "Toxic neuropathy",
            "Chronic inflammatory demyelinating polyneuropathy",
            "Hereditary neuropathy",
            "Uremic neuropathy"
        ],
        treatmentPlan: [
            "Strict glycemic control",
            "Neuropathic pain medications (gabapentin, pregabalin)",
            "Physical therapy and balance training",
            "Foot care education",
            "Regular monitoring for complications"
        ],
        educationalNotes: {
            keyPoints: [
                "Length-dependent sensorimotor polyneuropathy",
                "Affects longest nerves first (feet before hands)",
                "Both sensory and motor involvement",
                "Uniform slowing pattern on NCS",
                "Related to duration and control of diabetes"
            ],
            clinicalPearls: [
                "Stocking-glove distribution is classic",
                "Loss of vibration sense occurs early",
                "Absent Achilles reflexes are common",
                "Pain often prominent initially, then becomes numb"
            ]
        }
    },

    // Polymyositis - Inflammatory Myopathy
    polymyositis: {
        title: "Progressive Proximal Muscle Weakness",
        difficulty: "difficult",
        presentation: {
            age: "38",
            gender: "Female",
            chiefComplaint: "Difficulty climbing stairs and lifting objects overhead"
        },
        history: {
            historyOfPresentIllness: "38-year-old teacher with 6-month history of gradual onset weakness affecting shoulders and hips. Difficulty getting up from chairs and climbing stairs. Initial no pain, now has muscle aches. No rash or swallowing difficulties.",
            pastMedicalHistory: "Hypothyroidism",
            medications: "Levothyroxine",
            familyHistory: "No family history of muscle disease",
            socialHistory: "Teacher, non-smoker"
        },
        physicalExamination: {
            generalAppearance: "No obvious muscle atrophy, no rash",
            musculoskeletalExam: "Mild tenderness in proximal muscle groups, positive Gowers' sign",
            neurologicalExam: "Proximal weakness: deltoids 3/5, hip flexors 3/5, distal strength preserved (5/5)"
        },
        ncsStudies: [
            {
                nerve: "Median",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and latency"
            },
            {
                nerve: "Ulnar",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and latency"
            },
            {
                nerve: "Median",
                type: "motor",
                result: "Normal",
                interpretation: "Normal distal latency and CMAP amplitude"
            },
            {
                nerve: "Ulnar",
                type: "motor",
                result: "Normal",
                interpretation: "Normal distal latency and CMAP amplitude"
            },
            {
                nerve: "Fibular",
                type: "motor",
                result: "Normal",
                interpretation: "Normal distal latency and CMAP amplitude"
            }
        ],
        emgStudies: [
            {
                muscle: "Deltoid",
                interpretation: "Increased insertional activity, frequent fibrillations, positive sharp waves, early recruitment with small, short-duration, polyphasic MUPs"
            },
            {
                muscle: "Biceps",
                interpretation: "Increased insertional activity, fibrillations, early recruitment with myopathic motor unit potentials"
            },
            {
                muscle: "Iliopsoas",
                interpretation: "Increased insertional activity, abnormal spontaneous activity, early recruitment with myopathic MUPs"
            }
        ],
        specialTests: [
            "Elevated CK (creatine kinase) >2000 U/L",
            "Muscle biopsy: inflammatory infiltrates",
            "Anti-Jo-1 antibodies positive",
            "Normal thyroid function"
        ],
        diagnosis: "Polymyositis (Inflammatory Myopathy)",
        differentialDiagnosis: [
            "Dermatomyositis",
            "Inclusion body myositis",
            "Thyroid myopathy",
            "Muscular dystrophy",
            "Metabolic myopathy"
        ],
        treatmentPlan: [
            "Corticosteroids (prednisone)",
            "Immunosuppressive therapy (methotrexate)",
            "Physical therapy",
            "Monitor for associated malignancy",
            "Pulmonary function monitoring"
        ],
        educationalNotes: {
            keyPoints: [
                "Primary muscle disease with normal NCS",
                "EMG shows myopathic changes with membrane instability",
                "Proximal muscle weakness pattern",
                "Associated with autoimmune conditions",
                "May have associated interstitial lung disease"
            ],
            clinicalPearls: [
                "Normal nerve conduction distinguishes from neuropathy",
                "Small, short-duration motor units on EMG",
                "Membrane instability causes fibrillations in myopathy",
                "Screen for malignancy in older patients"
            ]
        }
    },

    // ALS - Motor Neuron Disease
    als: {
        title: "Progressive Hand Weakness with Muscle Twitching",
        difficulty: "difficult",
        presentation: {
            age: "58",
            gender: "Male",
            chiefComplaint: "Progressive weakness in hands and visible muscle twitching"
        },
        history: {
            historyOfPresentIllness: "58-year-old engineer with 8-month history starting with right hand weakness, difficulty with fine motor tasks. Recently developed left hand weakness and muscle twitching in arms. Some difficulty with speech articulation. Denies sensory symptoms.",
            pastMedicalHistory: "Hypertension",
            medications: "Amlodipine",
            familyHistory: "No family history of neurologic disease",
            socialHistory: "Engineer, non-smoker"
        },
        physicalExamination: {
            generalAppearance: "Visible fasciculations in bilateral thenar and hypothenar eminences, deltoids, and tongue",
            musculoskeletalExam: "Mild atrophy of right first dorsal interosseous, fasciculations palpable",
            neurologicalExam: "Right hand intrinsics 3/5, left 4/5. Hyperreflexic (3+), positive Hoffmann sign bilaterally, positive Babinski"
        },
        ncsStudies: [
            {
                nerve: "Median",
                type: "motor",
                result: "Abnormal",
                interpretation: "Normal latency, reduced CMAP amplitude 2.1 mV (motor axon loss)"
            },
            {
                nerve: "Ulnar",
                type: "motor",
                result: "Abnormal",
                interpretation: "Normal latency, reduced CMAP amplitude 3.2 mV (motor neuron loss)"
            },
            {
                nerve: "Median",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and latency - sensory spared"
            },
            {
                nerve: "Ulnar",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and latency - sensory spared"
            }
        ],
        emgStudies: [
            {
                muscle: "First dorsal interosseous",
                interpretation: "Frequent fasciculations, fibrillations and PSWs, reduced recruitment with large amplitude, long duration MUPs"
            },
            {
                muscle: "Deltoid",
                interpretation: "Fasciculation potentials, reduced recruitment with giant motor unit potentials"
            },
            {
                muscle: "Tongue",
                interpretation: "Frequent fasciculations, fibrillations, reduced recruitment (bulbar involvement)"
            }
        ],
        specialTests: [
            "Normal CSF analysis",
            "MRI brain and spine: normal",
            "Genetic testing for familial ALS: negative"
        ],
        diagnosis: "Amyotrophic Lateral Sclerosis (ALS)",
        differentialDiagnosis: [
            "Progressive muscular atrophy",
            "Primary lateral sclerosis",
            "Kennedy disease",
            "Multifocal motor neuropathy",
            "Cervical myelopathy"
        ],
        treatmentPlan: [
            "Riluzole therapy",
            "Multidisciplinary ALS clinic care",
            "Speech and swallow therapy",
            "Respiratory monitoring",
            "Supportive care and symptom management"
        ],
        educationalNotes: {
            keyPoints: [
                "Combines upper and lower motor neuron signs",
                "Preserved sensory function",
                "EMG shows widespread fasciculations and denervation",
                "Normal nerve conduction velocities",
                "Progressive and ultimately fatal disease"
            ],
            clinicalPearls: [
                "Fasciculations in tongue are highly suggestive",
                "Hyperreflexia with muscle atrophy is characteristic",
                "Split hand syndrome (thenar > hypothenar atrophy)",
                "Sensory sparing helps distinguish from other conditions"
            ]
        }
    },

    // Stroke - Central Lesion (EMG NOT Indicated)
    stroke: {
        title: "Sudden Weakness Following Stroke",
        difficulty: "beginner",
        presentation: {
            age: "68",
            gender: "Male",
            chiefComplaint: "Acute onset left-sided weakness and facial droop"
        },
        history: {
            historyOfPresentIllness: "68-year-old retired man found by wife at 7 AM with left-sided weakness and facial droop. Was normal at bedtime. Alert and oriented with slurred speech. Denies headache, neck pain, or back pain. No recent trauma.",
            pastMedicalHistory: "Hypertension, diabetes, atrial fibrillation",
            medications: "Lisinopril, metformin, warfarin",
            familyHistory: "Stroke in father",
            socialHistory: "Retired, former smoker"
        },
        physicalExamination: {
            generalAppearance: "Left facial droop, left arm held in flexed posture",
            musculoskeletalExam: "Reduced active ROM on left side due to weakness",
            neurologicalExam: "Left arm 2/5, left leg 3/5. Upper motor neuron pattern, hyperreflexia on left, positive Babinski"
        },
        specialTests: [
            "CT head: acute right MCA stroke",
            "CT angiogram: right MCA occlusion",
            "ECG: atrial fibrillation",
            "NIHSS score: 12"
        ],
        diagnosis: "Acute Right Middle Cerebral Artery Stroke",
        differentialDiagnosis: [
            "Transient ischemic attack",
            "Hemorrhagic stroke",
            "Hypoglycemia",
            "Migraine with aura",
            "Seizure with Todd's paralysis"
        ],
        treatmentPlan: [
            "Acute stroke protocol",
            "Tissue plasminogen activator (if within window)",
            "Anticoagulation management",
            "Blood pressure control",
            "Rehabilitation therapy"
        ],
        emgIndication: "NOT INDICATED",
        educationalNotes: {
            keyPoints: [
                "EMG/NCS is NOT indicated in acute stroke",
                "Central nervous system lesion vs. peripheral",
                "Upper motor neuron signs distinguish from peripheral nerve",
                "Acute onset and clinical picture are diagnostic",
                "Neuroimaging confirms diagnosis"
            ],
            clinicalPearls: [
                "Acute onset suggests vascular etiology",
                "Upper motor neuron pattern with hyperreflexia",
                "No sensory loss in pure motor strokes",
                "EMG would delay appropriate acute stroke care"
            ]
        }
    },

    // Severe CTS - Disease Progression Example
    severects: {
        title: "Severe Hand Numbness with Thenar Atrophy",
        difficulty: "intermediate",
        presentation: {
            age: "55",
            gender: "Female",
            chiefComplaint: "Severe hand numbness with visible muscle wasting"
        },
        history: {
            historyOfPresentIllness: "55-year-old assembly line worker with 2-year history of progressive hand numbness and weakness. Initially intermittent symptoms, now constant numbness in thumb, index, and middle fingers. Visible muscle wasting in thenar eminence. Difficulty with fine motor tasks.",
            pastMedicalHistory: "Diabetes mellitus, hypothyroidism",
            medications: "Metformin, levothyroxine",
            familyHistory: "No known nerve disorders",
            socialHistory: "Assembly line worker for 20 years, repetitive hand motions"
        },
        physicalExamination: {
            generalAppearance: "Visible thenar atrophy on right hand",
            musculoskeletalExam: "Marked thenar atrophy, positive Tinel's and Phalen's signs",
            neurologicalExam: "Decreased sensation in median distribution, weakness in thumb opposition (3/5)"
        },
        ncsStudies: [
            {
                nerve: "Median",
                type: "sensory",
                result: "Absent",
                interpretation: "No response obtained from index finger"
            },
            {
                nerve: "Median",
                type: "motor",
                result: "Severely abnormal",
                interpretation: "Markedly prolonged distal latency 8.2 ms, severely reduced amplitude 1.2 mV"
            },
            {
                nerve: "Ulnar",
                type: "sensory",
                result: "Normal",
                interpretation: "Normal amplitude and latency"
            },
            {
                nerve: "Ulnar",
                type: "motor",
                result: "Normal",
                interpretation: "Normal amplitude and latency"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor pollicis brevis",
                interpretation: "Severe chronic denervation with marked reduction in recruitment, large polyphasic MUPs"
            },
            {
                muscle: "Flexor pollicis longus",
                interpretation: "Normal - innervated by anterior interosseous nerve (spares AIN)"
            }
        ],
        specialTests: [
            "MRI wrist: severe median nerve compression",
            "Ultrasound: increased cross-sectional area of median nerve",
            "Diabetes screening: HbA1c 7.8%"
        ],
        diagnosis: "Severe Carpal Tunnel Syndrome with Thenar Atrophy",
        differentialDiagnosis: [
            "C6-C7 radiculopathy",
            "Pronator syndrome",
            "Anterior interosseous syndrome",
            "Diabetic neuropathy",
            "Brachial plexopathy"
        ],
        treatmentPlan: [
            "Urgent carpal tunnel release surgery",
            "Post-operative hand therapy",
            "Diabetic glucose control",
            "Ergonomic workplace modifications",
            "Long-term monitoring for recovery"
        ],
        educationalNotes: {
            keyPoints: [
                "End-stage carpal tunnel syndrome with axonal loss",
                "Absent sensory responses indicate severe compression",
                "Thenar atrophy suggests chronic, severe compression",
                "Surgery urgent to prevent permanent damage",
                "Recovery may be limited due to axonal loss"
            ],
            clinicalPearls: [
                "Thenar atrophy indicates severe, chronic CTS",
                "Absent sensory responses = poor prognosis",
                "AIN-innervated muscles (FPL) are spared",
                "Early surgery crucial before irreversible damage"
            ]
        }
    }
};

// Complete EMG APP Clinical Cases Interface
function showClinicalCases(pgyLevel = 'pgy3') {
    const content = `
        <style>
            .difficulty-selector {
                background: rgba(107, 159, 120, 0.95);
                border-radius: 25px;
                padding: 40px;
                margin: 20px 0;
                position: relative;
                overflow: hidden;
            }

            .selector-title {
                text-align: center;
                color: #2c3e50;
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
            }

            .selector-subtitle {
                text-align: center;
                color: #ffffff;
                font-size: 16px;
                margin-bottom: 40px;
                opacity: 0.9;
            }

            .difficulty-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 25px;
                margin-bottom: 40px;
                position: relative;
                z-index: 2;
            }

            .difficulty-card {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 25px 30px 35px 30px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                overflow: visible;
                text-align: center;
                color: white;
                min-height: 220px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .difficulty-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .difficulty-card:hover::before {
                opacity: 1;
            }

            .difficulty-card.active {
                transform: translateY(-10px) scale(1.05);
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border-color: rgba(255, 255, 255, 0.5);
            }

            .difficulty-card.inactive {
                opacity: 0.4;
                transform: scale(0.95);
                filter: grayscale(100%);
            }

            .beginner-card.active {
                background: linear-gradient(135deg, #4ade80, #22c55e);
                box-shadow: 0 20px 40px rgba(34, 197, 94, 0.4);
            }

            .intermediate-card.active {
                background: linear-gradient(135deg, #fb923c, #f97316);
                box-shadow: 0 20px 40px rgba(249, 115, 22, 0.4);
            }

            .difficult-card.active {
                background: linear-gradient(135deg, #f87171, #ef4444);
                box-shadow: 0 20px 40px rgba(239, 68, 68, 0.4);
            }

            .card-icon {
                font-size: 48px;
                margin-bottom: 15px;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .card-title {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }

            .card-subtitle {
                font-size: 14px;
                opacity: 0.9;
                font-weight: 600;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin: 10px 0;
                padding: 5px;
                position: relative;
                z-index: 3;
            }

            .status-light {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #4ade80;
                box-shadow: 0 0 15px #4ade80;
                animation: pulse 2s infinite;
            }

            .difficulty-card.inactive .status-light {
                background: #6b7280;
                box-shadow: 0 0 5px #6b7280;
                animation: none;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .status-text {
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1px;
                color: #1f2937;
                text-shadow: 0 0 3px rgba(255,255,255,0.8);
                background: rgba(255,255,255,0.9);
                padding: 2px 6px;
                border-radius: 4px;
            }

            .difficulty-card.inactive .status-text {
                color: #6b7280;
                background: rgba(156,163,175,0.3);
                text-shadow: none;
            }

            .card-description {
                font-size: 14px;
                opacity: 0.9;
                line-height: 1.4;
            }

            .action-buttons {
                display: flex;
                gap: 20px;
                justify-content: center;
                flex-wrap: wrap;
                position: relative;
                z-index: 2;
            }

            .primary-action-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 18px 36px;
                border-radius: 50px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
                position: relative;
                overflow: hidden;
            }

            .secondary-action-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 16px 34px;
                border-radius: 50px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .primary-action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(5, 150, 105, 0.4);
            }

            .secondary-action-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }

            /* Case Selection Section */
            .case-selection-section {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 15px;
                padding: 30px;
                margin-top: 30px;
                display: none;
            }

            .section-header {
                text-align: center;
                margin-bottom: 25px;
            }

            .section-header h3 {
                color: #2c3e50;
                font-size: 24px;
                margin-bottom: 10px;
            }

            .section-header p {
                color: #5a6c7d;
                font-size: 16px;
            }

            .case-controls {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }

            .control-btn {
                background: #f8f9fa;
                color: #495057;
                border: 2px solid #dee2e6;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 600;
            }

            .control-btn:hover {
                background: #e9ecef;
                border-color: #adb5bd;
            }

            .control-btn.primary {
                background: #28a745;
                color: white;
                border-color: #28a745;
            }

            .control-btn.primary:hover {
                background: #218838;
                border-color: #1e7e34;
            }

            .control-btn.secondary {
                background: #6c757d;
                color: white;
                border-color: #6c757d;
            }

            .control-btn.secondary:hover {
                background: #5a6268;
                border-color: #545b62;
            }

            .case-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
            }

            .case-card {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 10px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }

            .case-card:hover {
                border-color: #007bff;
                box-shadow: 0 4px 12px rgba(0,123,255,0.15);
            }

            .case-card.selected {
                border-color: #28a745;
                background: #f8fff8;
                box-shadow: 0 4px 12px rgba(40,167,69,0.2);
            }

            .case-card h4 {
                color: #2c3e50;
                margin-bottom: 10px;
                font-size: 18px;
            }

            .case-card p {
                color: #5a6c7d;
                margin-bottom: 8px;
                font-size: 14px;
            }

            .difficulty {
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .difficulty.beginner {
                background: #d4edda;
                color: #155724;
            }

            .difficulty.intermediate {
                background: #fff3cd;
                color: #856404;
            }

            .difficulty.difficult {
                background: #f8d7da;
                color: #721c24;
            }

            .case-card input[type="checkbox"] {
                position: absolute;
                top: 15px;
                left: 15px;
                width: 18px;
                height: 18px;
            }
        </style>

        <div class="difficulty-selector">
            <h3 class="selector-title">⚡ Choose Your Challenge Level</h3>
            <p class="selector-subtitle">Select which difficulty levels you want to practice with</p>

            <div class="difficulty-cards">
                <div class="difficulty-card beginner-card active" id="beginner-toggle" onclick="toggleDifficulty('beginner')">
                    <input type="checkbox" id="beginner-checkbox" checked>
                    <div class="card-icon">🌱</div>
                    <div class="card-title">Beginner</div>
                    <div class="card-subtitle">Learning the Basics</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Perfect for residents starting their EMG/NCS journey</div>
                </div>

                <div class="difficulty-card intermediate-card active" id="intermediate-toggle" onclick="toggleDifficulty('intermediate')">
                    <input type="checkbox" id="intermediate-checkbox" checked>
                    <div class="card-icon">🔥</div>
                    <div class="card-title">Intermediate</div>
                    <div class="card-subtitle">Building Skills</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Ready for more complex diagnostic challenges</div>
                </div>

                <div class="difficulty-card difficult-card active" id="difficult-toggle" onclick="toggleDifficulty('difficult')">
                    <input type="checkbox" id="difficult-checkbox" checked>
                    <div class="card-icon">💎</div>
                    <div class="card-title">Expert</div>
                    <div class="card-subtitle">Master Level</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Advanced cases that challenge even experts</div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="primary-action-btn" onclick="startRandomCaseByDifficulty()">
                    🎲 Start Practice Session
                </button>
                <button class="secondary-action-btn" onclick="showCaseSelection()">
                    🎯 Choose Specific Cases
                </button>
            </div>
        </div>

        <!-- Individual Case Selection (Hidden by default) -->
        <div class="case-selection-section" id="case-selection-section">
            <div class="section-header">
                <h3>🎯 Select Your Cases</h3>
                <p>Choose specific scenarios to practice</p>
            </div>

            <div class="case-controls">
                <button class="control-btn" onclick="selectAllCases()">✓ Select All</button>
                <button class="control-btn" onclick="deselectAllCases()">✗ Clear All</button>
                <button class="control-btn primary" onclick="startSelectedCases()">▶ Start Selected</button>
                <button class="control-btn secondary" onclick="hideCaseSelection()">← Back</button>
            </div>

            <div id="case-grid" class="case-grid">
                <!-- Cases will be populated here dynamically -->
            </div>
        </div>
    `;

    showModal('⚡ Choose Your Challenge Level', content);
}

// Complete EMG APP JavaScript Functions - EXACT COPY
function toggleDifficulty(difficulty) {
    const toggle = document.getElementById(`${difficulty}-toggle`);
    const checkbox = document.getElementById(`${difficulty}-checkbox`);
    const statusText = toggle.querySelector('.status-text');

    if (toggle.classList.contains('active')) {
        // Turn OFF
        toggle.classList.remove('active');
        toggle.classList.add('inactive');
        checkbox.checked = false;
        statusText.textContent = 'INACTIVE';
    } else {
        // Turn ON
        toggle.classList.remove('inactive');
        toggle.classList.add('active');
        checkbox.checked = true;
        statusText.textContent = 'ACTIVE';
    }

    updateCaseDisplay();
}

function showCaseSelection() {
    document.getElementById('case-selection-section').style.display = 'block';
    populateCaseGrid();
    // Smooth scroll to case selection
    document.getElementById('case-selection-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function hideCaseSelection() {
    document.getElementById('case-selection-section').style.display = 'none';
}

function updateCaseDisplay() {
    const beginnerChecked = document.getElementById('beginner-checkbox').checked;
    const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
    const difficultChecked = document.getElementById('difficult-checkbox').checked;

    populateCaseGrid();
}

function populateCaseGrid() {
    const caseGrid = document.getElementById('case-grid');
    const beginnerChecked = document.getElementById('beginner-checkbox').checked;
    const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
    const difficultChecked = document.getElementById('difficult-checkbox').checked;

    let html = '';

    for (const [caseId, caseData] of Object.entries(caseDatabase)) {
        const difficulty = caseData.difficulty || 'intermediate';

        // Filter based on selected difficulties
        if ((difficulty === 'beginner' && !beginnerChecked) ||
            (difficulty === 'intermediate' && !intermediateChecked) ||
            (difficulty === 'difficult' && !difficultChecked)) {
            continue;
        }

        const difficultyClass = difficulty;
        const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

        html += `
            <div class="case-card" onclick="toggleCaseSelection('${caseId}')" id="case-${caseId}">
                <input type="checkbox" id="checkbox-${caseId}" onchange="event.stopPropagation(); updateCaseCard('${caseId}')">
                <h4>${caseData.title}</h4>
                <p><strong>Age:</strong> ${caseData.presentation.age} | <strong>Gender:</strong> ${caseData.presentation.gender}</p>
                <p>${caseData.presentation.chiefComplaint}</p>
                <span class="difficulty ${difficultyClass}">${difficultyText}</span>
            </div>
        `;
    }

    caseGrid.innerHTML = html;
}

function toggleCaseSelection(caseId) {
    const checkbox = document.getElementById(`checkbox-${caseId}`);
    const caseCard = document.getElementById(`case-${caseId}`);

    checkbox.checked = !checkbox.checked;
    updateCaseCard(caseId);
}

function updateCaseCard(caseId) {
    const checkbox = document.getElementById(`checkbox-${caseId}`);
    const caseCard = document.getElementById(`case-${caseId}`);

    if (checkbox.checked) {
        caseCard.classList.add('selected');
    } else {
        caseCard.classList.remove('selected');
    }
}

function selectAllCases() {
    const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        updateCaseCard(checkbox.id.replace('checkbox-', ''));
    });
}

function deselectAllCases() {
    const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        updateCaseCard(checkbox.id.replace('checkbox-', ''));
    });
}

function startSelectedCases() {
    const selectedCases = [];
    const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        selectedCases.push(checkbox.id.replace('checkbox-', ''));
    });

    if (selectedCases.length === 0) {
        alert('Please select at least one case to begin.');
        return;
    }

    // Start with first selected case
    startSpecificCase(selectedCases[0]);
}

function startRandomCaseByDifficulty() {
    const beginnerChecked = document.getElementById('beginner-checkbox').checked;
    const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
    const difficultChecked = document.getElementById('difficult-checkbox').checked;

    if (!beginnerChecked && !intermediateChecked && !difficultChecked) {
        alert('Please select at least one difficulty level first.');
        return;
    }

    const availableCases = [];
    for (const [caseId, caseData] of Object.entries(caseDatabase)) {
        const difficulty = caseData.difficulty || 'intermediate';
        if ((difficulty === 'beginner' && beginnerChecked) ||
            (difficulty === 'intermediate' && intermediateChecked) ||
            (difficulty === 'difficult' && difficultChecked)) {
            availableCases.push(caseId);
        }
    }

    if (availableCases.length === 0) {
        alert('No cases available for the selected difficulty levels.');
        return;
    }

    const randomCase = availableCases[Math.floor(Math.random() * availableCases.length)];
    startSpecificCase(randomCase);
}

function startSpecificCase(caseId) {
    // This would integrate with the existing clinical cases system
    console.log('🎯 Starting case:', caseId);

    // For now, use the existing clinical cases system
    if (window.ClinicalCases && window.ClinicalCases.startSpecificCase) {
        window.ClinicalCases.startSpecificCase(caseId);
    } else {
        alert(`Starting case: ${caseDatabase[caseId].title}\n\nThis will integrate with the full clinical cases workflow.`);
    }
}

// Wrapper function for compatibility
function showClinicalCasesModal(pgyLevel, difficulty) {
    console.log('🎯 DEBUG: EMG APP Complete System called with:', { pgyLevel, difficulty });
    showClinicalCases(pgyLevel);
}

// Make functions globally available
window.showClinicalCases = showClinicalCases;
window.showClinicalCasesModal = showClinicalCasesModal;
window.toggleDifficulty = toggleDifficulty;
window.showCaseSelection = showCaseSelection;
window.hideCaseSelection = hideCaseSelection;
window.updateCaseDisplay = updateCaseDisplay;
window.populateCaseGrid = populateCaseGrid;
window.toggleCaseSelection = toggleCaseSelection;
window.updateCaseCard = updateCaseCard;
window.selectAllCases = selectAllCases;
window.deselectAllCases = deselectAllCases;
window.startSelectedCases = startSelectedCases;
window.startRandomCaseByDifficulty = startRandomCaseByDifficulty;
window.startSpecificCase = startSpecificCase;
window.caseDatabase = caseDatabase;

console.log('✅ EMG APP Complete Clinical Cases System loaded successfully!');
console.log('🔄 All EMG APP functions are now available globally');