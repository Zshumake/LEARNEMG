/**
 * ClinicalDataStandardizer
 * Automatically populates realistic normal numerical data for NCS and EMG studies
 * based on clinical reference ranges.
 */

const REFERENCE_VALUES = {
    motor: {
        "Median": { lat: 4.4, amp: 4.0, vel: 49, dist: 8 },
        "Ulnar": { lat: 3.3, amp: 6.0, vel: 49, dist: 8 },
        "Fibular": { lat: 6.5, amp: 2.0, vel: 44, dist: 9 },
        "Tibial": { lat: 5.8, amp: 3.0, vel: 41, dist: 10 },
        "Radial": { lat: 5.0, amp: 2.0, vel: 50, dist: 10 }
    },
    sensory: {
        "Median": { peak: 3.5, amp: 20, vel: 50, dist: 14, onsetOffset: 0.6 },
        "Ulnar": { peak: 3.1, amp: 17, vel: 50, dist: 14, onsetOffset: 0.6 },
        "Radial": { peak: 2.9, amp: 15, vel: 50, dist: 10, onsetOffset: 0.5 },
        "Sural": { peak: 4.4, amp: 6, vel: 40, dist: 14, onsetOffset: 0.7 }
    }
};

export class ClinicalDataStandardizer {
    static standardizeCase(caseData) {
        if (!caseData) return;

        // Handle NCS Studies (Support both array and categorized object)
        if (caseData.ncsStudies) {
            if (Array.isArray(caseData.ncsStudies)) {
                caseData.ncsStudies = caseData.ncsStudies.map(s => this.standardizeNCS(s));
            } else {
                // Categorized object (sensory, motor, comparison)
                if (caseData.ncsStudies.sensory) caseData.ncsStudies.sensory = caseData.ncsStudies.sensory.map(s => this.standardizeNCS(s, 'sensory'));
                if (caseData.ncsStudies.motor) caseData.ncsStudies.motor = caseData.ncsStudies.motor.map(s => this.standardizeNCS(s, 'motor'));
            }
        }

        if (caseData.emgStudies) {
            caseData.emgStudies = caseData.emgStudies.map(s => this.standardizeEMG(s));
        }

        return caseData;
    }

    static standardizeNCS(study, forceType = null) {
        const type = forceType || study.type || (study.name && study.name.toLowerCase().includes('motor') ? 'motor' : 'sensory');
        const nerve = this.identifyNerve(study.name || study.nerve);
        const ref = REFERENCE_VALUES[type] ? REFERENCE_VALUES[type][nerve] : null;

        if (study.result === 'normal') {
            if (type === 'motor' && ref) {
                study.onset = study.onset || (ref.lat * 0.85).toFixed(1);
                study.normOnset = study.normOnset || `<${ref.lat}`;
                study.amp = study.amp || (ref.amp * 1.8).toFixed(1);
                study.normAmp = study.normAmp || `>${ref.amp}`;
                study.velocity = study.velocity || Math.round(ref.vel * 1.1);
                study.normVelocity = study.normVelocity || `>${ref.vel}`;
                study.distance = study.distance || 22.0;
                study.negDur = study.negDur || 4.5;
            } else if (type === 'sensory' && ref) {
                study.peak = study.peak || (ref.peak * 0.85).toFixed(1);
                study.normPeak = study.normPeak || `<${ref.peak}`;
                study.amp = study.amp || (ref.amp * 2.5).toFixed(1);
                study.normAmp = study.normAmp || `>${ref.amp}`;
                study.velocity = study.velocity || Math.round(ref.vel * 1.1);
                study.normVelocity = study.normVelocity || `>${ref.vel}`;
                study.distance = study.distance || 14.0;
            }
        }

        // Fill in missing reference strings and Sierra Wave fields for ALL studies
        if (ref) {
            if (type === 'motor') {
                study.normOnset = study.normOnset || `<${ref.lat}`;
                study.normAmp = study.normAmp || `>${ref.amp}`;
                study.normVelocity = study.normVelocity || `>${ref.vel}`;
                // Auto-populate distance if missing
                if (!study.dist && ref.dist) study.dist = ref.dist;
            } else {
                study.normPeak = study.normPeak || `<${ref.peak}`;
                study.normAmp = study.normAmp || `>${ref.amp}`;
                study.normVelocity = study.normVelocity || `>${ref.vel}`;
                // Auto-populate onset and distance if missing
                if (!study.onset && study.peak && typeof study.peak === 'number' && ref.onsetOffset) {
                    study.onset = +(study.peak - ref.onsetOffset).toFixed(1);
                }
                if (!study.dist && ref.dist) study.dist = ref.dist;
            }
        }

        return study;
    }

    static standardizeEMG(study) {
        if (study.findings === 'Normal' || (!study.fibs && !study.psw)) {
            study.insAct = study.insAct || 'Nml';
            study.fibs = study.fibs || '0';
            study.psw = study.psw || '0';
            study.amp = study.amp || 'Nml';
            study.dur = study.dur || 'Nml';
            study.poly = study.poly || '0';
            study.recrt = study.recrt || 'Nml';
            study.intPat = study.intPat || 'Full';
        }
        return study;
    }

    static identifyNerve(name) {
        if (!name) return "";
        const lower = name.toLowerCase();
        if (lower.includes('median')) return "Median";
        if (lower.includes('ulnar')) return "Ulnar";
        if (lower.includes('fibular') || lower.includes('peroneal')) return "Fibular";
        if (lower.includes('tibial')) return "Tibial";
        if (lower.includes('radial')) return "Radial";
        if (lower.includes('sural')) return "Sural";
        return "";
    }
}
