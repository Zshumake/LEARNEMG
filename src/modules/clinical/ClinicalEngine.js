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

    // Normalize for matching: lowercase, strip punctuation (keep hyphens for C8-T1),
    // collapse whitespace
    _normalize(text) {
        return (text || '')
            .toLowerCase()
            .replace(/[()[\]{}'",.;:!?]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Tokenize a normalized string, dropping common stopwords so "ulnar and median"
    // compares the same as "ulnar median"
    _tokenize(text) {
        const stopwords = new Set(['of', 'the', 'and', 'or', 'a', 'an', 'at', 's', 'with', 'in', 'on', 'to']);
        return text.split(' ').filter(t => t.length > 1 && !stopwords.has(t));
    }

    // Does a single user-entered term correspond to an expected differential name?
    _matchTerm(userTerm, expectedName) {
        const user = this._normalize(userTerm);
        const expected = this._normalize(expectedName);
        if (!user || !expected) return false;

        // Whole-string containment either direction (e.g. "klumpke" inside expected)
        if (expected.includes(user) || user.includes(expected)) return true;

        // Synonym bridge (e.g. "cts" <-> "carpal tunnel")
        for (const [abbr, terms] of Object.entries(this.synonyms)) {
            const userHitsSyn = user === abbr || terms.some(t => user.includes(t));
            const expectedHitsSyn = expected.includes(abbr) || terms.some(t => expected.includes(t));
            if (userHitsSyn && expectedHitsSyn) return true;
        }

        // Token-based fallback: any distinctive user token (>=5 chars) that appears
        // in the expected name counts as a match -- handles "klumpke palsy" ->
        // "Lower Trunk Brachial Plexopathy (Klumpke's)" via the token "klumpke"
        const userTokens = this._tokenize(user);
        if (userTokens.length === 0) return false;
        if (userTokens.some(t => t.length >= 5 && expected.includes(t))) return true;

        // If the user typed several short tokens, require a majority to match
        const matchCount = userTokens.filter(t => expected.includes(t)).length;
        return matchCount >= Math.ceil(userTokens.length * 0.6) && matchCount > 0;
    }

    // Kept for backwards compatibility -- delegates to the new matcher
    _isMatch(userTerm, expectedTerm) {
        return this._matchTerm(userTerm, expectedTerm);
    }

    analyzeDifferential(userInputStr) {
        if (!this.currentCase || !this.currentCase.differentialDiagnosis) {
            return { matched: [], unmatched: [], totalExpected: 0, expectedData: [] };
        }

        const expectedDifferentials = this.currentCase.differentialDiagnosis;
        const expectedNames = expectedDifferentials.map(e => typeof e === 'string' ? e : e.name);

        // Split the user input into individual differentials. Residents type them
        // separated by commas, newlines, semicolons, or " and "
        const userTerms = (userInputStr || '')
            .split(/[,;\n\/]+|\s+and\s+/i)
            .map(t => t.trim())
            .filter(t => t.length > 0);

        if (userTerms.length === 0) {
            return {
                matched: [],
                unmatched: expectedNames,
                totalExpected: expectedDifferentials.length,
                expectedData: expectedDifferentials
            };
        }

        const matched = [];
        const unmatched = [];
        expectedDifferentials.forEach(expected => {
            const name = typeof expected === 'string' ? expected : expected.name;
            const hit = userTerms.some(userTerm => this._matchTerm(userTerm, name));
            if (hit) matched.push(name);
            else unmatched.push(name);
        });

        return {
            matched,
            unmatched,
            totalExpected: expectedDifferentials.length,
            expectedData: expectedDifferentials
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

        const input = (userInputStr || '').trim().toLowerCase();
        const correct = this.currentCase.correctDiagnosis.toLowerCase().trim();

        if (input === '') {
            return false;
        }

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
