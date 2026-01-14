export const ClinicalEvaluator = {
    synonyms: {
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
    },

    isMatch: function (userTerm, expectedTerm) {
        userTerm = userTerm.toLowerCase().trim();
        expectedTerm = expectedTerm.toLowerCase().trim();
        if (expectedTerm.includes(userTerm) || userTerm.includes(expectedTerm)) return true;

        for (const [abbr, terms] of Object.entries(this.synonyms)) {
            if (userTerm === abbr || terms.includes(userTerm)) {
                if (terms.some(t => expectedTerm.includes(t)) || expectedTerm.includes(abbr)) return true;
            }
        }
        return false;
    },

    analyzeDifferential: function (userInput, expectedDifferentials) {
        const inputLower = userInput.toLowerCase();
        const matchedDiagnoses = [];
        const unmatchedDiagnoses = [];

        expectedDifferentials.forEach(expected => {
            if (this.isMatch(expected, inputLower) || inputLower.includes(expected.toLowerCase())) {
                matchedDiagnoses.push(expected);
            } else {
                unmatchedDiagnoses.push(expected);
            }
        });

        return {
            matched: matchedDiagnoses,
            unmatched: unmatchedDiagnoses,
            totalExpected: expectedDifferentials.length
        };
    },

    evaluateEMGDecision: function (indicatedDecision, currentCase) {
        const isEMGIndicated = currentCase.emgIndication !== "NOT INDICATED";

        if (indicatedDecision === true && isEMGIndicated) {
            return { type: 'correct', message: 'You correctly identified that this presentation warrants EMG/NCS evaluation.' };
        } else if (indicatedDecision === false && !isEMGIndicated) {
            return { type: 'correct_clinical', message: 'You correctly identified that EMG/NCS is <strong>not indicated</strong> in this case (Central cause).', educationalNote: currentCase.educationalNote };
        } else if (indicatedDecision === false && isEMGIndicated) {
            return { type: 'incorrect_indicated', message: 'Actually, EMG/NCS <strong>would be appropriate</strong> in this case.' };
        } else {
            return { type: 'incorrect_not_indicated', message: 'EMG/NCS would <strong>not be helpful</strong> in this case (Central signs present).', educationalNote: currentCase.educationalNote };
        }
    },

    evaluateDiagnosis: function (userDiagnosis, correctDiagnosis) {
        const input = userDiagnosis.toLowerCase().trim();
        const correct = correctDiagnosis.toLowerCase().trim();

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
};
