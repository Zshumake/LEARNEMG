
// Standard Nerve Conduction Study (NCS) Data & Normal Values
// Extracted for reusability and consistency across modules

// Professional Format - Upper Extremity NCS Template
export function getStandardUpperExtremityNCS() {
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

// Professional Format - Lower Extremity NCS Template
export function getStandardLowerExtremityNCS() {
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

// Helper to get standard normal values
// Used for validating and reference in NCS tables
export function getStandardNormalValues(nerveOrSite, type, site1, site2) {
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
}
