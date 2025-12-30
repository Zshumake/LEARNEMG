
const fs = require('fs');
const content = fs.readFileSync('src/data/CaseDatabase.js', 'utf8');

// Use regex to find all case IDs
const caseRegex = /'([a-zA-Z0-9]+)': \{/g;
let match;
const cases = [];
while ((match = caseRegex.exec(content)) !== null) {
    cases.push({ id: match[1], index: match.index });
}

const missing = [];
for (let i = 0; i < cases.length; i++) {
    const start = cases[i].index;
    const end = (i + 1 < cases.length) ? cases[i + 1].index : content.length;
    const caseBlock = content.substring(start, end);

    if (!caseBlock.includes('expectedDifferential')) {
        missing.push(cases[i].id);
    }
}

console.log('Cases missing expectedDifferential:', missing);
