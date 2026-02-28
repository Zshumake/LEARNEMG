import { ClinicalDataStandardizer } from '../../utils/ClinicalDataStandardizer.js';

export class ClinicalEngine {
    constructor(caseDatabase) {
        this.database = caseDatabase;
        this.currentCase = null;

        // Synonyms for evaluation from old ClinicalEvaluator
        this.synonyms = {
            "cts": ["carpal tunnel", "carpal tunnel syndrome", "median neuropathy at wrist"],
            "une": ["ulnar neuropathy at elbow", "cubital tunnel", "cubital tunnel syndrome"],
            "gbs": ["guillain-barre", "aidp", "acute inflammatory demyelinating polyneuropathy"],
            "cidp": ["chronic inflammatory demyelinating polyneuropathy"],
            "als": ["amyotrophic lateral sclerosis", "lou gehrig"],
            "mg": ["myasthenia gravis", "myasthenia"],
            "md": ["muscular dystrophy"],
            "pn": ["polyneuropathy", "peripheral neuropathy"],
            "radiculopathy": ["root", "radic"],
            "plexopathy": ["plexus"]
        };
    }

    // --- Core API ---

    loadCase(caseId) {
        if (!this.database[caseId]) {
            throw new Error(`Case ID ${caseId} not found in database.`);
        }

        // Deep copy and standardize
        this.currentCase = ClinicalDataStandardizer.standardizeCase(
            JSON.parse(JSON.stringify(this.database[caseId]))
        );

        return this.currentCase;
    }

    // --- Evaluation Logic ---

    _isMatch(userTerm, expectedTerm) {
        userTerm = userTerm.toLowerCase().trim();
        expectedTerm = expectedTerm.toLowerCase().trim();
        if (expectedTerm.includes(userTerm) || userTerm.includes(expectedTerm)) return true;

        for (const [abbr, terms] of Object.entries(this.synonyms)) {
            if (userTerm === abbr || terms.includes(userTerm)) {
                if (terms.some(t => expectedTerm.includes(t)) || expectedTerm.includes(abbr)) return true;
            }
        }
        return false;
    }

    analyzeDifferential(userInputStr) {
        if (!this.currentCase || !this.currentCase.differentialDiagnosis) {
            return { matched: [], unmatched: [], totalExpected: 0 };
        }

        const inputLower = userInputStr.toLowerCase();
        const expectedDifferentials = this.currentCase.differentialDiagnosis;

        const matchedDiagnoses = [];
        const unmatchedDiagnoses = [];

        expectedDifferentials.forEach(expected => {
            const expectedName = typeof expected === 'string' ? expected : expected.name;
            if (this._isMatch(expectedName, inputLower) || inputLower.includes(expectedName.toLowerCase())) {
                matchedDiagnoses.push(expectedName);
            } else {
                unmatchedDiagnoses.push(expectedName);
            }
        });

        return {
            matched: matchedDiagnoses,
            unmatched: unmatchedDiagnoses,
            totalExpected: expectedDifferentials.length,
            expectedData: expectedDifferentials // Expose original records for UI feedback
        };
    }

    evaluateEMGDecision(isIndicatedBtnPressed) {
        if (!this.currentCase) return null;

        const isEMGIndicated = this.currentCase.emgIndication !== "NOT INDICATED";

        if (isIndicatedBtnPressed === true && isEMGIndicated) {
            return { type: 'correct', message: 'You correctly identified that this presentation warrants EMG/NCS evaluation.' };
        } else if (isIndicatedBtnPressed === false && !isEMGIndicated) {
            return { type: 'correct_clinical', message: 'You correctly identified that EMG/NCS is <strong>not indicated</strong> in this case (Central cause).', educationalNote: this.currentCase.educationalNote };
        } else if (isIndicatedBtnPressed === false && isEMGIndicated) {
            return { type: 'incorrect_indicated', message: 'Actually, EMG/NCS <strong>would be appropriate</strong> in this case.' };
        } else {
            return { type: 'incorrect_not_indicated', message: 'EMG/NCS would <strong>not be helpful</strong> in this case (Central signs present).', educationalNote: this.currentCase.educationalNote };
        }
    }

    evaluateFinalDiagnosis(userInputStr) {
        if (!this.currentCase || !this.currentCase.correctDiagnosis) return false;

        const input = userInputStr.toLowerCase().trim();
        const correct = this.currentCase.correctDiagnosis.toLowerCase().trim();

        // Simple fuzzy match for final diagnosis
        if (input === correct || correct.includes(input) || input.includes(correct)) {
            return true;
        }

        // Check synonyms
        for (const [abbr, terms] of Object.entries(this.synonyms)) {
            if ((input === abbr || terms.includes(input)) && (correct === abbr || terms.includes(correct))) {
                return true;
            }
        }

        return false;
    }
}
