const fs = require('fs');
const path = require('path');

const ncsDir = 'ncs_images';
const jsPath = 'js/modules/ncs-techniques.js';

// Get correct filenames
const correctFiles = fs.readdirSync(ncsDir).filter(f => f.endsWith('.png'));

function normalize(name) {
    let base = name.split('.').slice(0, -1).join('.');
    let norm = base.toLowerCase()
        .replace(/ /g, '_')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/-/g, '_')
        .replace(/\./g, '') // remove extra dots
        .replace(/_+/g, '_') // collapse underscores
        .replace(/^_+|_+$/g, ''); // trim
    return norm;
}

const normMap = {};
correctFiles.forEach(f => {
    normMap[normalize(f)] = f;
});

let content = fs.readFileSync(jsPath, 'utf8');
let replacements = 0;

// Regex to find "NCS images/FILENAME"
// We use a replacer function
content = content.replace(/"NCS images\/([^"]+)"/g, (match, p1) => {
    const norm = normalize(p1);
    if (normMap[norm]) {
        replacements++;
        return `"ncs_images/${normMap[norm]}"`;
    } else {
        console.log(`Could not map: ${p1} -> ${norm}`);
        // Try fuzzy?
        // Check if 'norm' is contained in any correct file norm?
        const fuzzy = Object.keys(normMap).find(k => k.includes(norm) || norm.includes(k));
        if (fuzzy) {
            console.log(`  -> Fuzzy match? ${normMap[fuzzy]}`);
            // return `"ncs_images/${normMap[fuzzy]}"`; // risky?
        }
        return match; // keep original if no match
    }
});

console.log(`Replaced ${replacements} paths.`);
fs.writeFileSync(jsPath, content);
