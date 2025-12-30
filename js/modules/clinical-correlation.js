import { generateErnestButton } from '../../src/modules/audio/AudioData.js';


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

export function generateContent(module) {
    // Podcast registered automatically via AudioData.js

    // Clinical Cases System Logic
    const ClinicalCases = {
        currentCase: null,
        currentStep: 1,
        userDifferential: '',
        userEMGDecision: null,

        // Case Database
        caseDatabase: {
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
                title: "Newborn Arm Weakness",
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
                            nerve: "Fibular",
                            recording: "EDB",
                            distalLatency: 4.2,
                            amplitude: 6,
                            cv: 48,
                            normal: true
                        },
                        {
                            nerve: "Fibular",
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
                            amplitude: 4,
                            cv: 48,
                            normal: false
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
                            nerve: "Fibular",
                            recording: "EDB",
                            distalLatency: 4.2,
                            amplitude: 1.5,
                            cv: 48,
                            normal: false
                        },
                        {
                            nerve: "Fibular",
                            recording: "TA",
                            distalLatency: 3.8,
                            amplitude: 2.0,
                            cv: 52,
                            normal: false
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
                    chiefComplaint: "3-week history of inability to extend wrist and fingers after falling asleep with arm over chair",
                    history: "Woke up 3 weeks ago unable to extend right wrist or fingers. Had been drinking the night before and fell asleep in chair with right arm draped over the back (Saturday night palsy). No pain, just weakness. Can still flex fingers and wrist normally. Symptoms have not improved.",
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
                            nerve: "Fibular",
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
                            peakLatency: 3.2,
                            amplitude: 35,
                            cv: 52,
                            normal: true
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
                            peakLatency: 3.5,
                            amplitude: 5,
                            cv: 62,
                            normal: false
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
                            nerve: "Fibular",
                            recording: "EDB",
                            distalLatency: 4.2,
                            amplitude: 6,
                            cv: 48,
                            normal: true
                        },
                        {
                            nerve: "Fibular",
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


            // Stroke - Central Lesion (EMG NOT Indicated)
            stroke: {
                title: "Sudden Onset Left-Sided Weakness",
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
        },

        // Legacy UI Methods
        toggleDifficulty: function (difficulty) {
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

            this.updateCaseDisplay();
        },

        showCaseSelection: function () {
            document.getElementById('case-selection-section').style.display = 'block';
            this.populateCaseGrid();
            // Smooth scroll to case selection
            document.getElementById('case-selection-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        },

        hideCaseSelection: function () {
            document.getElementById('case-selection-section').style.display = 'none';
        },

        updateCaseDisplay: function () {
            this.populateCaseGrid();
        },

        populateCaseGrid: function () {
            const caseGrid = document.getElementById('case-grid');
            const beginnerChecked = document.getElementById('beginner-checkbox').checked;
            const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
            const difficultChecked = document.getElementById('difficult-checkbox').checked;

            let html = '';

            for (const [caseId, caseData] of Object.entries(this.caseDatabase)) {
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
                    <div class="case-card" onclick="ClinicalCases.startCase('${caseId}')" id="case-${caseId}">
                        <h4>${caseData.title}</h4>
                        <p><strong>Age:</strong> ${caseData.presentation.age} | <strong>Gender:</strong> ${caseData.presentation.gender}</p>
                        <p>${caseData.presentation.chiefComplaint}</p>
                        <span class="difficulty ${difficultyClass}">${difficultyText}</span>
                    </div>
                `;
            }

            caseGrid.innerHTML = html;
        },

        toggleCaseSelection: function (caseId) {
            const checkbox = document.getElementById(`checkbox-${caseId}`);
            checkbox.checked = !checkbox.checked;
            this.updateCaseCard(caseId);
        },

        updateCaseCard: function (caseId) {
            const checkbox = document.getElementById(`checkbox-${caseId}`);
            const caseCard = document.getElementById(`case-${caseId}`);

            if (checkbox.checked) {
                caseCard.classList.add('selected');
            } else {
                caseCard.classList.remove('selected');
            }
        },

        selectAllCases: function () {
            const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                this.updateCaseCard(checkbox.id.replace('checkbox-', ''));
            });
        },

        deselectAllCases: function () {
            const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                this.updateCaseCard(checkbox.id.replace('checkbox-', ''));
            });
        },

        startSelectedCases: function () {
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
            this.startCase(selectedCases[0]);
        },

        startRandomCaseByDifficulty: function () {
            const beginnerChecked = document.getElementById('beginner-checkbox').checked;
            const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
            const difficultChecked = document.getElementById('difficult-checkbox').checked;

            if (!beginnerChecked && !intermediateChecked && !difficultChecked) {
                alert('Please select at least one difficulty level first.');
                return;
            }

            const availableCases = [];
            for (const [caseId, caseData] of Object.entries(this.caseDatabase)) {
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
            this.startCase(randomCase);
        },

        init: function () {
            this.populateCaseGrid();
        },

        startCase: function (caseId) {
            if (!this.caseDatabase[caseId]) {
                console.error('Case not found:', caseId);
                alert('Case not available yet.');
                return;
            }
            console.log('Starting case:', caseId);

            this.currentCase = this.caseDatabase[caseId];
            this.currentStep = 1;
            this.userDifferential = '';

            document.getElementById('case-interface').style.display = 'block';
            document.getElementById('case-selection-screen').style.display = 'none'; // Hide list for full focus

            this.populateCaseDetails();

            // Reset UI state
            this.userDifferential = '';
            this.userEMGDecision = null;
            document.getElementById('user-differential').value = '';
            document.getElementById('final-diagnosis').value = '';
            document.getElementById('differential-feedback').innerHTML = '';
            document.getElementById('emg-decision-feedback').innerHTML = '';
            document.getElementById('diagnosis-feedback').innerHTML = '';
            document.getElementById('continue-to-studies').style.display = 'none';
            document.getElementById('continue-after-decision').style.display = 'none';
            document.getElementById('emg-results').style.display = 'none';

            this.showCasePresentation();
            this.updateProgress(20);

            // Scroll to case interface
            setTimeout(() => {
                document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        },

        populateCaseDetails: function () {
            const case_ = this.currentCase;
            const caseDetailsDiv = document.getElementById('case-details');

            // Normalize Presentation Data
            const age = case_.presentation.age || case_.presentation.Age || 'N/A';
            const gender = case_.presentation.gender || case_.presentation.Gender || 'N/A';
            const occupation = case_.presentation.occupation || (case_.history && case_.history.socialHistory ? case_.history.socialHistory.split(',')[1] || case_.history.socialHistory : 'N/A');
            const chiefComplaint = case_.presentation.chiefComplaint || case_.presentation.ChiefComplaint || 'N/A';

            // Normalize History Data
            let history = case_.presentation.history || (case_.history ? case_.history.historyOfPresentIllness : 'N/A');
            let pmh = case_.presentation.pmh || (case_.history ? case_.history.pastMedicalHistory : 'N/A');
            let medications = case_.presentation.medications || (case_.history ? case_.history.medications : 'N/A');

            caseDetailsDiv.innerHTML = `
                <h4>${case_.title}</h4>
                <p><strong>Age:</strong> ${age} | <strong>Gender:</strong> ${gender} | <strong>Occupation:</strong> ${occupation}</p>
                <p><strong>Chief Complaint:</strong> ${chiefComplaint}</p>
                <p><strong>History:</strong> ${history}</p>
                <p><strong>PMH:</strong> ${pmh}</p>
                <p><strong>Medications:</strong> ${medications}</p>
            `;

            const examDiv = document.getElementById('physical-exam-details');
            let examHtml = '<div class="physical-exam">';

            // Handle Standard Physical Exam (Specific Keys)
            if (case_.physicalExam) {
                const exam = case_.physicalExam;
                examHtml += `
                    <div class="exam-category"><h5>👁️ Inspection</h5><p>${exam.inspection || 'Normal'}</p></div>
                    <div class="exam-category"><h5>👋 Palpation</h5><p>${exam.palpation || 'Normal'}</p></div>
                    <div class="exam-category"><h5>Range of Motion</h5><p>${exam.rom || 'Full'}</p></div>
                    <div class="exam-category"><h5>💪 Strength</h5><p>${exam.strength || '5/5 throughout'}</p></div>
                    <div class="exam-category"><h5>👆 Sensation</h5><p>${exam.sensation || 'Intact'}</p></div>
                    <div class="exam-category"><h5>🔨 Reflexes</h5><p>${exam.reflexes || '2+ symmetric'}</p></div>
                    <div class="exam-category"><h5>🧪 Special Tests</h5><p>${exam.specialTests || 'None'}</p></div>
                `;
            }
            // Handle Alternative Physical Examination (Generic Keys)
            else if (case_.physicalExamination) {
                const exam = case_.physicalExamination;
                if (exam.generalAppearance) examHtml += `<div class="exam-category"><h5>General Appearance</h5><p>${exam.generalAppearance}</p></div>`;
                if (exam.musculoskeletalExam) examHtml += `<div class="exam-category"><h5>Musculoskeletal</h5><p>${exam.musculoskeletalExam}</p></div>`;
                if (exam.neurologicalExam) examHtml += `<div class="exam-category"><h5>Neurological</h5><p>${exam.neurologicalExam}</p></div>`;
                // Add any other keys dynamically
                Object.keys(exam).forEach(key => {
                    if (!['generalAppearance', 'musculoskeletalExam', 'neurologicalExam'].includes(key)) {
                        // Format key from camelCase to Title Case
                        const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        examHtml += `<div class="exam-category"><h5>${title}</h5><p>${exam[key]}</p></div>`;
                    }
                });
            } else {
                examHtml += '<p>No physical exam data available.</p>';
            }

            examHtml += '</div>';
            examDiv.innerHTML = examHtml;
        },

        showCasePresentation: function () {
            console.log('Showing Case Presentation');
            this.hideAllSteps();
            document.getElementById('case-presentation-step').style.display = 'block';
            this.updateProgress(20);
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        showPhysicalExam: function () {
            console.log('Showing Physical Exam');
            this.hideAllSteps();
            document.getElementById('physical-exam-step').style.display = 'block';
            this.updateProgress(40);
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        showDifferentialBuilder: function () {
            console.log('Showing Differential Builder');
            this.hideAllSteps();
            document.getElementById('differential-step').style.display = 'block';
            this.updateProgress(60);
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        checkDifferential: function () {
            const userInput = document.getElementById('user-differential').value;
            console.log('Checking Differential:', userInput);
            this.userDifferential = userInput;

            const feedbackDiv = document.getElementById('differential-feedback');

            // Provide generic positive feedback as we can't easily validate free text against a list without NLP
            // But we can show the list of differentials considered in the case data if available
            let differentialList = "";
            if (this.currentCase.differentialDiagnosis && this.currentCase.differentialDiagnosis.length > 0) {
                differentialList = `<p style="margin-top: 10px;"><strong>Common Differentials for this presentation:</strong><br>${this.currentCase.differentialDiagnosis.join(', ')}</p>`;
            }

            feedbackDiv.innerHTML = `
                <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; margin: 15px 0;">
                    <h4 style="color: #1e40af;">✅ Differential Recorded</h4>
                    <p style="color: #1e40af;">Your differential has been recorded. Compare your thoughts with the standard differentials below.</p>
                    ${differentialList}
                </div>
            `;

            document.getElementById('continue-to-studies').style.display = 'inline-block';
        },

        showEMGDecision: function () {
            console.log('Showing EMG Decision');
            this.hideAllSteps();
            document.getElementById('emg-decision-step').style.display = 'block';
            this.updateProgress(70);
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        makeEMGDecision: function (indicatedDecision) {
            console.log('Making EMG Decision:', indicatedDecision);
            this.userEMGDecision = indicatedDecision;
            const feedbackDiv = document.getElementById('emg-decision-feedback');
            const continueBtn = document.getElementById('continue-after-decision');
            const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";

            if (indicatedDecision === true && isEMGIndicated) {
                feedbackDiv.innerHTML = `
                    <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #27ae60;">✅ Correct Decision</h4>
                        <p>You correctly identified that this presentation warrants EMG/NCS evaluation.</p>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Proceed to EMG/NCS Results →';
            } else if (indicatedDecision === false && !isEMGIndicated) {
                feedbackDiv.innerHTML = `
                    <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #27ae60;">✅ Excellent Clinical Judgment</h4>
                        <p>You correctly identified that EMG/NCS is <strong>not indicated</strong> in this case.</p>
                        <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                            <h5>🚨 Immediate Management Required</h5>
                            <p>${this.currentCase.educationalNote || 'This requires urgent medical attention.'}</p>
                        </div>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Complete Case Review →';
            } else if (indicatedDecision === false && isEMGIndicated) {
                feedbackDiv.innerHTML = `
                    <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                        <p>Actually, EMG/NCS <strong>would be appropriate</strong> in this case.</p>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Proceed to EMG/NCS Results (Educational) →';
            } else {
                feedbackDiv.innerHTML = `
                    <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                        <p>EMG/NCS would <strong>not be helpful</strong> in this case.</p>
                        <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                            <h5>🚨 This Patient Needs:</h5>
                            <p>${this.currentCase.educationalNote || 'Urgent neurological evaluation.'}</p>
                        </div>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Complete Case Review →';
            }
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        proceedAfterDecision: function () {
            const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";
            if (this.userEMGDecision === true && isEMGIndicated) {
                this.showNCSResults();
            } else if (this.userEMGDecision === false && !isEMGIndicated) {
                this.showFinalDiagnosis();
            } else if (this.userEMGDecision === false && isEMGIndicated) {
                this.showNCSResults();
            } else {
                this.showFinalDiagnosis();
            }
        },

        showNCSResults: function () {
            console.log('Showing NCS Results');
            this.hideAllSteps();
            document.getElementById('results-step').style.display = 'block';
            this.updateProgress(85);
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });

            const ncsDiv = document.getElementById('ncs-results');
            if (this.currentCase.emgIndication === "NOT INDICATED") {
                ncsDiv.innerHTML = `
                    <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #e74c3c;">⚠️ EMG/NCS NOT INDICATED</h4>
                        <p>${this.currentCase.explanation}</p>
                    </div>
                `;
            } else {
                let html = '';
                const caseData = this.currentCase;
                const ncs = caseData.ncsResults || caseData.ncsStudies;

                if (!ncs) {
                    ncsDiv.innerHTML = '<p>No NCS data available.</p>';
                    return;
                }

                // Helper to format value with bolding if abnormal
                const formatValue = (val, isAbnormal) => {
                    return isAbnormal ? `<strong>${val}</strong>` : val;
                };

                // Helper to get standard normal values
                const getStandardNormalValues = (nerveOrSite, type, site1, site2) => {
                    // Extract nerve name from site string if needed
                    let nerve = nerveOrSite;
                    if (!nerve && type === 'Motor') return { peak: '-', amp: '-', vel: '-', dist: '-', site1: '-', site2: '-' };

                    // Normalize nerve name
                    let normalizedNerve = 'Median';
                    if (nerve.toLowerCase().includes('ulnar')) normalizedNerve = 'Ulnar';
                    else if (nerve.toLowerCase().includes('radial')) normalizedNerve = 'Radial';
                    else if (nerve.toLowerCase().includes('peroneal') || nerve.toLowerCase().includes('fibular')) normalizedNerve = 'Peroneal';
                    else if (nerve.toLowerCase().includes('tibial')) normalizedNerve = 'Tibial';
                    else if (nerve.toLowerCase().includes('sural')) normalizedNerve = 'Sural';

                    // Normalize type
                    let normalizedType = 'Sensory';
                    if (type && type.toLowerCase().includes('motor')) normalizedType = 'Motor';

                    // Default Standards
                    const standards = {
                        'Median': {
                            'Sensory': { peak: '<3.5', amp: '>20', vel: '>50', dist: '14', site1: 'Wrist', site2: 'Digit 2' },
                            'Motor': { lat: '<4.4', amp: '>4.0', vel: '>49', dist: '8', site1: 'Wrist', site2: 'APB' }
                        },
                        'Ulnar': {
                            'Sensory': { peak: '<3.1', amp: '>17', vel: '>50', dist: '14', site1: 'Wrist', site2: 'Digit 5' },
                            'Motor': { lat: '<3.3', amp: '>6.0', vel: '>49', dist: '8', site1: 'Wrist', site2: 'ADM' }
                        },
                        'Radial': {
                            'Sensory': { peak: '<2.9', amp: '>15', vel: '>50', dist: '10', site1: 'Forearm', site2: 'Thumb' },
                            'Motor': { lat: '<4.5', amp: '>5.0', vel: '>50', dist: '4', site1: 'Forearm', site2: 'EIP' }
                        },
                        'Peroneal': {
                            'Sensory': { peak: '<4.4', amp: '>6', vel: '>40', dist: '14', site1: 'Ankle', site2: 'Dorsum' },
                            'Motor': { lat: '<6.5', amp: '>2.0', vel: '>44', dist: '8', site1: 'Ankle', site2: 'EDB' }
                        },
                        'Tibial': {
                            'Motor': { lat: '<6.1', amp: '>3.0', vel: '>41', dist: '8', site1: 'Ankle', site2: 'AH' }
                        },
                        'Sural': {
                            'Sensory': { peak: '<4.4', amp: '>6', vel: '>40', dist: '14', site1: 'Calf', site2: 'Ankle' }
                        }
                    };

                    let result = standards[normalizedNerve]?.[normalizedType] || { peak: '-', amp: '-', vel: '-', dist: '-', site1: '-', site2: '-' };

                    // Specific Distance Logic based on User Input
                    if (normalizedType === 'Motor') {
                        // Median Motor
                        if (normalizedNerve === 'Median') {
                            if (site1?.includes('Wrist')) result.dist = '8';
                            else if (site1?.includes('Elbow')) result.dist = '25'; // "mid 20s"
                        }
                        // Ulnar Motor
                        else if (normalizedNerve === 'Ulnar') {
                            if (site1?.includes('Wrist')) result.dist = '8';
                            else if (site1?.includes('Elbow')) result.dist = '25'; // "mid 20s"
                        }
                        // Radial Motor
                        else if (normalizedNerve === 'Radial') {
                            if (site1?.includes('Forearm')) result.dist = '4';
                            else if (site1?.includes('Elbow') || site1?.includes('Spiral')) result.dist = '12';
                        }
                        // Peroneal (Fibular) Motor
                        else if (normalizedNerve === 'Peroneal') {
                            if (site1?.includes('Ankle')) result.dist = '8';
                            else if (site1?.includes('Fib') || site1?.includes('Head')) result.dist = '28'; // "26-30"
                            else if (site1?.includes('Popliteal')) result.dist = '10';
                        }
                        // Tibial Motor
                        else if (normalizedNerve === 'Tibial') {
                            if (site1?.includes('Ankle')) result.dist = '8';
                            else if (site1?.includes('Popliteal')) result.dist = '42'; // "40-45"
                        }
                    }

                    return result;
                };

                // 1. Handle "Anti-Sensory Summary" / "Motor Summary" format
                if (ncs.antiSensorySummary || ncs.motorSummary) {
                    if (ncs.antiSensorySummary && ncs.antiSensorySummary.length > 0) {
                        html += '<h4>Nerve Conduction Studies</h4><h5>Anti Sensory Summary Table</h5>';
                        html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Peak (ms)</th><th>Norm Peak (ms)</th><th>P-T Amp (µV)</th><th>Norm P-T Amp</th><th>Site1</th><th>Site2</th><th>Delta-P (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                        ncs.antiSensorySummary.forEach(study => {
                            const isAbnormal = study.abnormal;
                            html += `<tr>
                                <td>${study.site}</td>
                                <td>${study.nr || ''}</td>
                                <td>${formatValue(study.peak || study.peakLatency, isAbnormal)}</td>
                                <td>${study.normPeak || '<2.7'}</td>
                                <td>${formatValue(study.ptAmp || study.amplitude, isAbnormal)}</td>
                                <td>${study.normAmp || '>15.0'}</td>
                                <td>${study.site1 || 'Wrist'}</td>
                                <td>${study.site2 || study.site.split(' ')[0]}</td>
                                <td>${study.deltaP || (study.peak || study.peakLatency)}</td>
                                <td>${study.dist || '14.0'}</td>
                                <td>${formatValue(study.vel || study.cv, isAbnormal)}</td>
                                <td>${study.normVel || '>38'}</td>
                            </tr>`;
                        });
                        html += '</tbody></table></div>';
                    }
                    if (ncs.motorSummary && ncs.motorSummary.length > 0) {
                        html += '<h5>Motor Summary Table</h5>';
                        html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Onset (ms)</th><th>Norm Onset (ms)</th><th>O-P Amp (mV)</th><th>Norm O-P Amp</th><th>Neg Dur (ms)</th><th>Site1</th><th>Site2</th><th>Delta-O (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                        ncs.motorSummary.forEach(study => {
                            const isAbnormal = study.abnormal;
                            html += `<tr>
                                <td>${study.site}</td>
                                <td>${study.nr || ''}</td>
                                <td>${formatValue(study.onset || study.distalLatency, isAbnormal)}</td>
                                <td>${study.normOnset || '<4.2'}</td>
                                <td>${formatValue(study.opAmp || study.amplitude, isAbnormal)}</td>
                                <td>${study.normAmp || '>5'}</td>
                                <td>${study.negDur || '-'}</td>
                                <td>${study.site1 || 'Elbow'}</td>
                                <td>${study.site2 || 'Wrist'}</td>
                                <td>${study.deltaO || '-'}</td>
                                <td>${study.dist || '-'}</td>
                                <td>${formatValue(study.vel || study.cv, isAbnormal)}</td>
                                <td>${study.normVel || '>50'}</td>
                            </tr>`;
                        });
                        html += '</tbody></table></div>';
                    }
                }
                // 2. Handle "sensoryStudies" / "motorStudies" format
                else if (ncs.sensoryStudies || ncs.motorStudies) {
                    if (ncs.sensoryStudies && ncs.sensoryStudies.length > 0) {
                        html += '<h4>Nerve Conduction Studies</h4><h5>Sensory Summary Table</h5>';
                        html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Peak (ms)</th><th>Norm Peak (ms)</th><th>P-T Amp (µV)</th><th>Norm P-T Amp</th><th>Site1</th><th>Site2</th><th>Delta-P (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                        ncs.sensoryStudies.forEach(study => {
                            const isAbnormal = !study.normal;
                            const std = getStandardNormalValues(study.nerve, 'Sensory', study.recording, study.stimulation); // Assuming recording/stimulation map to site1/site2 contextually or just use defaults
                            html += `<tr>
                                <td>${study.nerve}</td>
                                <td>-</td>
                                <td>${formatValue(study.peakLatency, isAbnormal)}</td>
                                <td>${std.peak}</td>
                                <td>${formatValue(study.amplitude, isAbnormal)}</td>
                                <td>${std.amp}</td>
                                <td>${std.site1}</td>
                                <td>${std.site2}</td>
                                <td>${study.peakLatency}</td>
                                <td>${std.dist}</td>
                                <td>${formatValue(study.cv, isAbnormal)}</td>
                                <td>${std.vel}</td>
                            </tr>`;
                        });
                        html += '</tbody></table></div>';
                    }
                    if (ncs.motorStudies && ncs.motorStudies.length > 0) {
                        html += '<h5>Motor Summary Table</h5>';
                        html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Onset (ms)</th><th>Norm Onset (ms)</th><th>O-P Amp (mV)</th><th>Norm O-P Amp</th><th>Neg Dur (ms)</th><th>Site1</th><th>Site2</th><th>Delta-O (ms)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th>Norm Vel (m/s)</th></tr></thead><tbody>';
                        ncs.motorStudies.forEach(study => {
                            const isAbnormal = !study.normal;
                            const std = getStandardNormalValues(study.nerve, 'Motor', study.recording, study.stimulation);
                            html += `<tr>
                                <td>${study.nerve}</td>
                                <td>-</td>
                                <td>${formatValue(study.distalLatency, isAbnormal)}</td>
                                <td>${std.lat}</td>
                                <td>${formatValue(study.amplitude, isAbnormal)}</td>
                                <td>${std.amp}</td>
                                <td>-</td>
                                <td>${std.site1}</td>
                                <td>${std.site2}</td>
                                <td>-</td>
                                <td>${std.dist}</td>
                                <td>${formatValue(study.cv, isAbnormal)}</td>
                                <td>${std.vel}</td>
                            </tr>`;
                        });
                        html += '</tbody></table></div>';
                    }
                }
                // 3. Handle nested ncsStudies (e.g., MG, Tarsal)
                else if (ncs.ncsStudies && Array.isArray(ncs.ncsStudies)) {
                    html += '<h4>Nerve Conduction Studies</h4>';
                    html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Nerve</th><th>Type</th><th>Result</th><th>Interpretation</th></tr></thead><tbody>';
                    ncs.ncsStudies.forEach(study => {
                        html += `<tr>
                             <td>${study.nerve}</td>
                             <td>${study.type || '-'}</td>
                             <td>${study.result}</td>
                             <td>${study.interpretation}</td>
                         </tr>`;
                    });
                    html += '</tbody></table></div>';
                }
                // 4. Handle simple array format
                else if (Array.isArray(ncs)) {
                    ncs.forEach(study => {
                        html += `
                            <div class="ncs-study" style="margin: 15px 0; padding: 15px; background: #fff; border-left: 4px solid ${study.result === 'abnormal' ? '#ef4444' : '#10b981'}; border-radius: 5px;">
                                <h4>⚡ ${study.name || study.nerve}</h4>
                                <div style="color: ${study.result === 'abnormal' ? '#dc2626' : '#059669'};"><strong>Results:</strong> ${study.findings || study.result}</div>
                                ${study.interpretation ? `<p><strong>Interpretation:</strong> ${study.interpretation}</p>` : ''}
                        `;
                    });
                }

                // Handle Comparison Summary
                if (ncs.comparisonSummary && ncs.comparisonSummary.length > 0) {
                    html += '<h5>Comparison Summary Table</h5>';
                    html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Site</th><th>NR</th><th>Peak (ms)</th><th>P-T* Amp (µV)</th><th>Site1</th><th>Site2</th><th>Delta-P (ms)</th></tr></thead><tbody>';
                    ncs.comparisonSummary.forEach(comp => {
                        // Render Median row
                        html += `<tr>
                            <td style="font-weight:bold; text-align:left;">${comp.site}</td>
                            <td colspan="6"></td>
                        </tr>`;
                        if (comp.median) {
                            html += `<tr>
                                <td style="text-align:left; padding-left:20px;">Median</td>
                                <td>${comp.median.nr || ''}</td>
                                <td>${comp.median.peak}</td>
                                <td>${comp.median.ptAmp}</td>
                                <td>Median</td>
                                <td>Radial</td>
                                <td rowspan="2" style="vertical-align:middle;">${comp.deltaP}</td>
                            </tr>`;
                        }
                        if (comp.ulnar) { // Handle Ulnar if present instead of Radial
                            html += `<tr>
                                <td style="text-align:left; padding-left:20px;">Ulnar</td>
                                <td>${comp.ulnar.nr || ''}</td>
                                <td>${comp.ulnar.peak}</td>
                                <td>${comp.ulnar.ptAmp}</td>
                                <td>Median</td>
                                <td>Ulnar</td>
                            </tr>`;
                        } else if (comp.radial) { // Default to Radial as per example
                            html += `<tr>
                                <td style="text-align:left; padding-left:20px;">Radial</td>
                                <td>${comp.radial.nr || ''}</td>
                                <td>${comp.radial.peak}</td>
                                <td>${comp.radial.ptAmp}</td>
                                <td>Median</td>
                                <td>Radial</td>
                            </tr>`;
                        }
                    });
                    html += '</tbody></table></div>';
                }

                // Handle EMG Findings
                const emg = ncs.emgFindings || caseData.emgFindings || ncs.emgStudies || caseData.emgStudies;
                if (emg && emg.length > 0) {
                    html += '<h4>Needle EMG Findings</h4>';
                    html += '<div class="table-responsive"><table class="ncs-table"><thead><tr><th>Side</th><th>Muscle</th><th>Nerve</th><th>Root</th><th>Ins Act</th><th>Fibs</th><th>Psw</th><th>Amp</th><th>Dur</th><th>Poly</th><th>Recrt</th><th>Int Pat</th></tr></thead><tbody>';
                    emg.forEach(muscle => {
                        const isAbnormal = muscle.abnormal || muscle.interpretation?.toLowerCase().includes('abnormal') || muscle.interpretation?.toLowerCase().includes('denervation');

                        // Map old format to new columns if needed
                        const side = muscle.side || 'Right'; // Default to Right if missing
                        const nerve = muscle.nerve || '-';
                        const root = muscle.root || '-';
                        const insAct = muscle.insAct || muscle.insertionalActivity || 'Nml';
                        const fibs = muscle.fibs || (muscle.spontaneousActivity?.includes('fib') ? muscle.spontaneousActivity : 'Nml');
                        const psw = muscle.psw || (muscle.spontaneousActivity?.includes('PSW') ? 'Present' : 'Nml');
                        const amp = muscle.amp || 'Nml';
                        const dur = muscle.dur || 'Nml';
                        const poly = muscle.poly || (muscle.motorUnits?.includes('poly') ? '++' : '0');
                        const recrt = muscle.recrt || muscle.recruitment || 'Nml';
                        const intPat = muscle.intPat || 'Nml';
                        const comment = muscle.comment || muscle.interpretation || '';

                        html += `<tr>
                            <td>${side}</td>
                            <td style="font-weight:600;">${muscle.muscle}</td>
                            <td>${nerve}</td>
                            <td>${root}</td>
                            <td>${insAct}</td>
                            <td>${fibs}</td>
                            <td>${psw}</td>
                            <td>${amp}</td>
                            <td>${dur}</td>
                            <td>${poly}</td>
                            <td>${recrt}</td>
                            <td>${intPat}</td>
                        </tr>`;
                    });
                    html += '</tbody></table></div>';
                }

                ncsDiv.innerHTML = html;
                this.updateProgress(80);
            }
        },

        showFinalDiagnosis: function () {
            console.log('Showing Final Diagnosis');
            this.hideAllSteps();
            document.getElementById('diagnosis-step').style.display = 'block';
            this.updateProgress(95);
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        checkDiagnosis: function () {
            const userDiagnosis = document.getElementById('final-diagnosis').value;
            console.log('Checking Diagnosis:', userDiagnosis);

            if (!userDiagnosis.trim()) {
                alert('Please enter a diagnosis first.');
                return;
            }
            const correctDiagnosis = this.currentCase.diagnosis || this.currentCase.correctDiagnosis;
            const feedbackDiv = document.getElementById('diagnosis-feedback');

            // Simple string matching for now (case insensitive)
            if (!correctDiagnosis) {
                console.error('Diagnosis not defined for this case');
                alert('Error: Diagnosis data missing for this case.');
                return;
            }

            const isCorrect = userDiagnosis.toLowerCase().includes(correctDiagnosis.toLowerCase()) ||
                correctDiagnosis.toLowerCase().includes(userDiagnosis.toLowerCase());

            if (isCorrect) {
                feedbackDiv.innerHTML = `
                    <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px; margin-top: 20px;">
                        <h3 style="color: #27ae60; margin-top: 0;">🎉 Correct Diagnosis!</h3>
                        <p style="font-size: 1.1em;"><strong>${correctDiagnosis}</strong></p>
                        <p>Excellent work! You correctly identified the pathology based on the clinical presentation and electrodiagnostic findings.</p>
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #bbf7d0;">
                            <h5>🎓 Key Learning Points:</h5>
                            <ul>
                                ${this.currentCase.educationalNotes ? this.currentCase.educationalNotes.keyPoints.map(point => `<li>${point}</li>`).join('') : '<li>Review the case details to solidify your understanding.</li>'}
                            </ul>
                        </div>
                    </div>
                `;
                this.updateProgress(100);
            } else {
                feedbackDiv.innerHTML = `
                    <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px; margin-top: 20px;">
                        <h3 style="color: #e74c3c; margin-top: 0;">Not Quite</h3>
                        <p>The correct diagnosis is <strong>${correctDiagnosis}</strong>.</p>
                        <p>Your answer: ${userDiagnosis}</p>
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #fecaca;">
                            <h5>💡 Clinical Pearls:</h5>
                            <ul>
                                ${this.currentCase.educationalNotes ? this.currentCase.educationalNotes.clinicalPearls.map(pearl => `<li>${pearl}</li>`).join('') : '<li>Consider the pattern of weakness and sensory loss.</li>'}
                            </ul>
                        </div>
                    </div>
                `;
            }
            document.getElementById('case-interface').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        hideAllSteps: function () {
            const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
            steps.forEach(stepId => {
                const element = document.getElementById(stepId);
                if (element) element.style.display = 'none';
            });
        },

        startNewCase: function () {
            this.currentCase = null;
            this.currentStep = 1;
            this.userDifferential = '';
            this.userEMGDecision = null;

            document.getElementById('case-interface').style.display = 'none';
            document.getElementById('case-selection-screen').style.display = 'block';

            document.getElementById('user-differential').value = '';
            document.getElementById('final-diagnosis').value = '';
            document.getElementById('differential-feedback').innerHTML = '';
            document.getElementById('diagnosis-feedback').innerHTML = '';
            document.getElementById('continue-to-studies').style.display = 'none';
            document.getElementById('emg-results').style.display = 'none';

            this.updateProgress(0);
        },

        updateProgress: function (percentage) {
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            if (progressBar) progressBar.style.width = percentage + '%';
            if (progressText) {
                const stepTexts = {
                    0: 'Starting case...',
                    20: 'Case Presentation',
                    40: 'Physical Examination',
                    60: 'Differential Diagnosis',
                    70: 'EMG/NCS Decision',
                    80: 'Results Review',
                    100: 'Final Diagnosis'
                };
                progressText.textContent = stepTexts[percentage] || 'In Progress...';
            }
        }
    };

    // Expose ClinicalCases to window for onclick handlers
    window.ClinicalCases = ClinicalCases;
    setTimeout(() => ClinicalCases.init(), 100);

    window.ClinicalCases = ClinicalCases;

    return `
        <div class="clinical-module-container" style="max-width: 1000px; margin: 0 auto; padding: 20px;">
            <div class="module-header" style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #1e40af; font-size: 2.5em; margin-bottom: 10px;">Clinical Application</h2>
                <p style="color: #64748b; font-size: 1.2em;">Test your diagnostic skills with real-world EMG/NCS cases</p>
            </div>

            <!-- Legacy Difficulty Selector UI -->
            <div id="case-selection-screen">
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
                        <div class="difficulty-card beginner-card active" id="beginner-toggle" onclick="ClinicalCases.toggleDifficulty('beginner')">
                            <input type="checkbox" id="beginner-checkbox" checked style="display:none">

                            <div class="card-icon">🌱</div>
                            <div class="card-title">Beginner</div>
                            <div class="card-subtitle">Learning the Basics</div>
                            <div class="status-indicator">
                                <div class="status-light"></div>
                                <span class="status-text">ACTIVE</span>
                            </div>
                            <div class="card-description">Perfect for residents starting their EMG/NCS journey</div>
                        </div>

                        <div class="difficulty-card intermediate-card active" id="intermediate-toggle" onclick="ClinicalCases.toggleDifficulty('intermediate')">
                            <input type="checkbox" id="intermediate-checkbox" checked style="display:none">

                            <div class="card-icon">🔥</div>
                            <div class="card-title">Intermediate</div>
                            <div class="card-subtitle">Building Skills</div>
                            <div class="status-indicator">
                                <div class="status-light"></div>
                                <span class="status-text">ACTIVE</span>
                            </div>
                            <div class="card-description">Ready for more complex diagnostic challenges</div>
                        </div>

                        <div class="difficulty-card difficult-card active" id="difficult-toggle" onclick="ClinicalCases.toggleDifficulty('difficult')">
                            <input type="checkbox" id="difficult-checkbox" checked style="display:none">

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
                        <button class="primary-action-btn" onclick="ClinicalCases.startRandomCaseByDifficulty()">
                            🎲 Start Random Case
                        </button>
                    </div>
                </div>

                <!-- Individual Case Selection -->
                <div class="case-selection-section" id="case-selection-section" style="display: block;">
                    <div class="section-header">
                        <h3>🎯 Select a Case to Begin</h3>
                        <p>Choose a scenario to practice</p>
                    </div>

                    <div class="case-controls" style="display: none;">
                        <!-- Controls hidden as we now have direct selection -->
                    </div>

                    <div id="case-grid" class="case-grid">
                        <!-- Cases will be populated here dynamically -->
                    </div>
                </div>
            </div>

            <!--Active Case Container(Hidden initially)-->
        <div id="case-interface" style="display: none;">
            <style>
                #case-interface {
                    background: white;
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    }
                .progress-container {
                    width: 100%;
                background-color: #e2e8f0;
                border-radius: 10px;
                margin-bottom: 20px;
                height: 20px;
                position: relative;
                overflow: hidden;
                    }
                #progress-bar {
                    height: 100%;
                background: linear-gradient(90deg, #10b981, #3b82f6);
                transition: width 0.5s ease;
                    }
                #progress-text {
                    position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 700;
                color: #1e293b;
                text-shadow: 0 0 2px rgba(255,255,255,0.8);
                    }
                .primary-action-btn {
                    background: #3b82f6;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 20px;
                transition: background 0.2s;
                    }
                .primary-action-btn:hover {
                    background: #2563eb;
                    }
                .secondary-action-btn {
                    background: #94a3b8;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 20px;
                margin-left: 10px;
                    }
                .decision-buttons {
                    display: flex;
                gap: 20px;
                margin: 20px 0;
                    }
                .decision-btn {
                    flex: 1;
                padding: 20px;
                border: none;
                border-radius: 10px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: transform 0.2s;
                    }
                .decision-btn.yes {
                    background: #10b981;
                color: white;
                    }
                .decision-btn.no {
                    background: #ef4444;
                color: white;
                    }
                .decision-btn:hover {
                    transform: scale(1.05);
                    }
                textarea, input[type="text"] {
                    width: 100%;
                    padding: 15px;
                    border: 2px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 16px;
                    margin: 10px 0;
                    min-height: 120px; /* Increased height for textarea */
                    font-family: inherit;
                }
                input[type="text"] {
                    min-height: auto; /* Reset for text input */
                }
                .physical-exam {
                    display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                    }
                .exam-category {
                    background: #f8fafc;
                padding: 15px;
                border-radius: 10px;
                border-left: 4px solid #3b82f6;
                    }
                .exam-category h5 {
                    margin - top: 0;
                color: #1e293b;
                    }
                .table-responsive {
                    overflow - x: auto;
                margin-bottom: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .ncs-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.85em; /* Slightly smaller font for dense data */
                    background: white;
                    border: 2px solid #333; /* Thicker outer border */
                }
                .ncs-table th, .ncs-table td {
                    padding: 6px 8px; /* Tighter padding */
                    text-align: center; /* Center align by default */
                    border: 1px solid #999; /* Visible borders for all cells */
                }
                .ncs-table th {
                    background: #d1d5db; /* Gray background matching reference */
                    color: #000;
                    font-weight: 700;
                    text-transform: none; /* Keep original casing */
                    letter-spacing: normal;
                    border-bottom: 2px solid #333;
                }
                .ncs-table tr:nth-child(even) {
                    background: #f9fafb;
                }
                .ncs-table tr:hover {
                    background: #f3f4f6;
                }
                /* Specific column alignments */
                .ncs-table td:first-child {
                    text-align: left; /* Align Site/Nerve to left */
                    font-weight: 600;
                }
            </style>

            <div class="progress-container">
                <div id="progress-bar" style="width: 0%"></div>
                <div id="progress-text">Starting case...</div>
            </div>

            <!-- Steps -->
            <div id="case-presentation-step">
                <div id="case-details"></div>
                <button class="primary-action-btn" onclick="ClinicalCases.showPhysicalExam()">Next: Physical Exam</button>
            </div>

            <div id="physical-exam-step" style="display: none;">
                <div id="physical-exam-details"></div>
                <button class="primary-action-btn" onclick="ClinicalCases.showDifferentialBuilder()">Next: Differential</button>
            </div>

            <div id="differential-step" style="display: none;">
                <h3>Differential Diagnosis</h3>
                <p>What is your differential diagnosis?</p>
                <textarea id="user-differential" rows="3" placeholder="Enter your differential diagnosis..."></textarea>
                <button class="primary-action-btn" onclick="ClinicalCases.checkDifferential()">Submit Differential</button>
                <div id="differential-feedback"></div>
                <button id="continue-to-studies" class="secondary-action-btn" style="display: none;" onclick="ClinicalCases.showEMGDecision()">Next: EMG Decision</button>
            </div>

            <div id="emg-decision-step" style="display: none;">
                <h3>EMG/NCS Decision</h3>
                <p>Is EMG/NCS indicated for this patient?</p>
                <div class="decision-buttons">
                    <button class="decision-btn yes" onclick="ClinicalCases.makeEMGDecision(true)">Yes, Indicated</button>
                    <button class="decision-btn no" onclick="ClinicalCases.makeEMGDecision(false)">No, Not Indicated</button>
                </div>
                <div id="emg-decision-feedback"></div>
                <button id="continue-after-decision" class="primary-action-btn" style="display: none;" onclick="ClinicalCases.proceedAfterDecision()">Continue</button>
            </div>

            <div id="results-step" style="display: none;">
                <h3>NCS Results</h3>
                <div id="ncs-results"></div>
                <div id="emg-results" style="display: none;">
                    <h3>EMG Results</h3>
                    <div id="emg-details"></div>
                </div>
                <button class="primary-action-btn" onclick="ClinicalCases.showFinalDiagnosis()">Next: Final Diagnosis</button>
            </div>

            <div id="diagnosis-step" style="display: none;">
                <h3>Final Diagnosis</h3>
                <p>What is your final diagnosis?</p>
                <input type="text" id="final-diagnosis" placeholder="Enter final diagnosis...">
                    <button class="primary-action-btn" onclick="ClinicalCases.checkDiagnosis()">Check Diagnosis</button>
                    <div id="diagnosis-feedback"></div>
                    <button class="secondary-action-btn" onclick="ClinicalCases.startNewCase()">Start New Case</button>
            </div>
        </div>
        </div >
        `;
}
