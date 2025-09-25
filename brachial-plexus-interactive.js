// Interactive Brachial Plexus System
// Based on Preston & Shapiro Chapter 30

// Anatomical Data Structure - Linear Flow Layout Design
const plexusData = {
    // Roots arranged vertically on the left matching reference layout
    roots: [
        { id: 'C5', x: 80, y: 120, label: 'C5', description: 'Fifth cervical nerve root' },
        { id: 'C6', x: 80, y: 180, label: 'C6', description: 'Sixth cervical nerve root' },
        { id: 'C7', x: 80, y: 280, label: 'C7', description: 'Seventh cervical nerve root' },
        { id: 'C8', x: 80, y: 380, label: 'C8', description: 'Eighth cervical nerve root' },
        { id: 'T1', x: 80, y: 440, label: 'T1', description: 'First thoracic nerve root' }
    ],

    // Junction points for pathway convergence (hidden visually but used for tracing)
    junctions: [
        { id: 'musc-junction', x: 300, y: 100, pathways: ['C5', 'C6', 'C7'] },
        { id: 'axil-junction', x: 400, y: 130, pathways: ['C5', 'C6'] },
        { id: 'median-junction1', x: 350, y: 190, pathways: ['C6', 'C7'] },
        { id: 'median-junction2', x: 450, y: 190, pathways: ['C8', 'T1'] },
        { id: 'radial-junction', x: 400, y: 250, pathways: ['C5', 'C6', 'C7', 'C8', 'T1'] },
        { id: 'ulnar-junction', x: 350, y: 300, pathways: ['C8', 'T1'] }
    ],

    // Terminal nerves positioned on dedicated horizontal lanes
    nerves: [
        {
            id: 'musculocutaneous',
            x: 630, y: 160,  // Upper line endpoint
            label: 'Musculocutaneous',
            description: 'C5-C7 • Lateral Cord • Elbow Flexion',
            pathway: 'musc-junction',
            roots: ['C5', 'C6', 'C7'],
            muscles: ['Biceps', 'Brachialis', 'Coracobrachialis'],
            sensory: 'Lateral forearm'
        },
        {
            id: 'axillary',
            x: 500, y: 240,  // C7 branch tip (upward)
            label: 'Axillary',
            description: 'C5-C6 • Posterior Cord • Shoulder Abduction',
            pathway: 'axil-junction',
            roots: ['C5', 'C6'],
            muscles: ['Deltoid', 'Teres minor'],
            sensory: 'Lateral arm'
        },
        {
            id: 'median',
            x: 630, y: 280,  // Convergence point at middle line
            label: 'Median',
            description: 'C6-T1 • Lateral & Medial Cords • Precision Grip Master',
            pathway: ['median-junction1', 'median-junction2'],
            roots: ['C6', 'C7', 'C8', 'T1'],
            muscles: ['APB', 'OP', 'FPB', 'Lumb 1&2', 'Pronator Teres', 'FCR'],
            sensory: 'Thumb, index, middle, lateral ring'
        },
        {
            id: 'radial',
            x: 500, y: 320,  // C7 branch tip (downward)
            label: 'Radial',
            description: 'C5-T1 • Posterior Cord • Extension Powerhouse',
            pathway: 'radial-junction',
            roots: ['C5', 'C6', 'C7', 'C8', 'T1'],
            muscles: ['Extensors', 'Triceps', 'Brachioradialis'],
            sensory: 'First web space, posterior forearm'
        },
        {
            id: 'ulnar',
            x: 630, y: 410,  // Lower line endpoint
            label: 'Ulnar',
            description: 'C8-T1 • Medial Cord • Grip Strength & Fine Motor Control',
            pathway: 'ulnar-junction',
            roots: ['C8', 'T1'],
            muscles: ['Hand intrinsics', 'FCU', 'FDP (4,5)'],
            sensory: 'Ring, little finger + dorsal hand'
        },
        {
            id: 'suprascapular',
            x: 290, y: 130,  // Upper trunk branch point
            label: 'Suprascapular',
            description: 'C5-C6 • Upper Trunk • Supraspinatus & Infraspinatus',
            roots: ['C5', 'C6'],
            muscles: ['Supraspinatus', 'Infraspinatus'],
            sensory: 'None'
        },
        {
            id: 'dorsal_scapular',
            x: 160, y: 110,   // C5 direct branch (moved down)
            label: 'Dorsal Scapular',
            description: 'C5 root directly • Rhomboids',
            roots: ['C5'],
            muscles: ['Rhomboids', 'Levator scapulae'],
            sensory: 'None'
        }
    ],

    // Proximal nerves positioned as direct branches
    proximalNerves: [
        {
            id: 'long-thoracic',
            x: 500, y: 60,
            label: 'Long Thoracic',
            description: 'C5-C6-C7 roots directly • Serratus anterior',
            roots: ['C5', 'C6', 'C7']
        },
        {
            id: 'dorsal-scapular',
            x: 350, y: 80,
            label: 'Dorsal Scapular',
            description: 'C5 root directly • Rhomboids',
            roots: ['C5']
        },
        {
            id: 'suprascapular',
            x: 400, y: 80,
            label: 'Suprascapular',
            description: 'C5-C6 • Upper Trunk • Supraspinatus & Infraspinatus',
            roots: ['C5', 'C6']
        }
    ],

    // Keep original data structure for backwards compatibility
    trunks: [
        { id: 'upper-trunk', x: 200, y: 140, label: 'Upper Trunk', roots: ['C5', 'C6'] },
        { id: 'middle-trunk', x: 200, y: 220, label: 'Middle Trunk', roots: ['C7'] },
        { id: 'lower-trunk', x: 200, y: 300, label: 'Lower Trunk', roots: ['C8', 'T1'] }
    ],
    divisions: [
        { id: 'upper-ant', x: 300, y: 120, label: 'Upper Ant', trunk: 'upper-trunk', type: 'anterior' },
        { id: 'upper-post', x: 300, y: 160, label: 'Upper Post', trunk: 'upper-trunk', type: 'posterior' },
        { id: 'middle-ant', x: 300, y: 200, label: 'Middle Ant', trunk: 'middle-trunk', type: 'anterior' },
        { id: 'middle-post', x: 300, y: 240, label: 'Middle Post', trunk: 'middle-trunk', type: 'posterior' },
        { id: 'lower-ant', x: 300, y: 280, label: 'Lower Ant', trunk: 'lower-trunk', type: 'anterior' },
        { id: 'lower-post', x: 300, y: 320, label: 'Lower Post', trunk: 'lower-trunk', type: 'posterior' }
    ],
    cords: [
        { id: 'lateral-cord', x: 500, y: 160, label: 'Lateral Cord', divisions: ['upper-ant', 'middle-ant'] },
        { id: 'posterior-cord', x: 500, y: 220, label: 'Posterior Cord', divisions: ['upper-post', 'middle-post', 'lower-post'] },
        { id: 'medial-cord', x: 500, y: 280, label: 'Medial Cord', divisions: ['lower-ant'] }
    ]
};

// Injury patterns from Chapter 30
const injuryPatterns = {
    erb: {
        title: "Erb's Palsy (Upper Trunk Plexopathy)",
        affected: ['C5', 'C6', 'upper-trunk'],
        description: "Most common type of traumatic brachial plexopathy",
        mechanism: "Head-shoulder traction injury (motorcycle accidents, birth trauma)",
        clinicalPattern: {
            weakness: "Shoulder abduction, elbow flexion, arm supination",
            sensory: "Lateral arm, lateral forearm, lateral hand, thumb",
            reflexes: "Biceps and brachioradialis depressed, triceps spared",
            muscles: "Deltoid, biceps, brachioradialis, supraspinatus, infraspinatus"
        },
        emgFindings: {
            snaps: "Lateral antebrachial cutaneous, radial to thumb may be abnormal",
            motorStudies: "Median and ulnar motor studies normal",
            needleEMG: "Abnormalities in C5-C6 muscles, paraspinals spared if plexus lesion"
        }
    },
    klumpke: {
        title: "Klumpke's Palsy (Lower Trunk Plexopathy)",
        affected: ['C8', 'T1', 'lower-trunk'],
        description: "Severe hand weakness from lower trunk injury",
        mechanism: "Arm-pulling traction (being dragged by arm)",
        clinicalPattern: {
            weakness: "All ulnar muscles, median C8-T1 muscles, radial C8 muscles",
            sensory: "Medial arm, medial forearm, medial hand, 4th and 5th fingers",
            reflexes: "No reflex abnormalities in pure lower trunk lesions",
            muscles: "Hand intrinsics, APB, FPL, FDP, EIP"
        },
        emgFindings: {
            snaps: "Ulnar, dorsal ulnar, medial antebrachial cutaneous abnormal",
            motorStudies: "Median and ulnar CMAPs may be reduced",
            needleEMG: "All ulnar muscles + median/radial C8-T1 muscles affected"
        }
    },
    parsonage: {
        title: "Neuralgic Amyotrophy (Parsonage-Turner Syndrome)",
        affected: "Variable - can affect individual nerves or plexus portions",
        description: "Immune-mediated brachial plexitis",
        mechanism: "Often preceded by viral illness, immunization, or surgery",
        clinicalPattern: {
            onset: "Severe shoulder pain for 1-2 weeks, then weakness as pain subsides",
            weakness: "Variable pattern - long thoracic and AIN commonly involved",
            sensory: "Usually mild compared to motor involvement",
            characteristic: "Scapular winging (long thoracic), abnormal 'OK' sign (AIN)"
        },
        emgFindings: {
            pattern: "May resemble mononeuropathy multiplex",
            needleEMG: "Denervation in affected nerve distributions",
            prognosis: "Usually unilateral, most are one-time events"
        }
    },
    postop: {
        title: "Postoperative Brachial Plexopathy",
        affected: ['lower-trunk', 'medial-cord'],
        description: "Most common after cardiac surgery",
        mechanism: "Stretch injury from chest wall retraction or hematoma compression",
        clinicalPattern: {
            timing: "Noticed immediately post-surgery",
            weakness: "C8-T1 muscles including hand intrinsics and long flexors",
            sensory: "4th and 5th fingers, medial forearm and arm",
            pattern: "Nearly all involve lower trunk or medial cord"
        },
        emgFindings: {
            snaps: "Ulnar and medial antebrachial cutaneous abnormal",
            prognosis: "Usually good recovery over several months (axonal continuity preserved)",
            timing: "Study at 11+ days shows reduced recruitment before denervation appears"
        }
    },
    radiation: {
        title: "Delayed Radiation Injury",
        affected: "Progressive, usually lower trunk predominant",
        description: "Progressive plexopathy years after radiation",
        mechanism: "Cumulative radiation damage (>5700 rads)",
        clinicalPattern: {
            onset: "Insidious over years, typically painless",
            progression: "Slowly progressive unlike acute traumatic lesions",
            characteristic: "Myokymic movements (undulating, wormlike)",
            differential: "vs. neoplastic invasion (pain is earlier/more prominent in neoplasm)"
        },
        emgFindings: {
            pathognomonic: "Myokymic discharges on needle EMG",
            pattern: "Mixed axonal loss and demyelination",
            snaps: "May be normal in sensory areas due to demyelination",
            motorStudies: "Conduction block may be present across plexus"
        }
    },
    tos: {
        title: "True Neurogenic Thoracic Outlet Syndrome",
        affected: ['T1', 'lower-trunk'],
        description: "Fibrous band entrapment of lower trunk",
        mechanism: "Fibrous band from rudimentary cervical rib to first thoracic rib",
        clinicalPattern: {
            weakness: "Preferential T1 fiber involvement - thenar > hypothenar",
            sensory: "4th and 5th fingers, medial hand, medial forearm",
            characteristic: "Thenar wasting out of proportion to hypothenar",
            differential: "vs. ulnar neuropathy (no elbow tenderness), vs. C8-T1 radiculopathy"
        },
        emgFindings: {
            distinctive: "Normal median SNAP despite thenar weakness",
            snaps: "Ulnar and medial antebrachial cutaneous abnormal",
            motorStudies: "Median CMAP more affected than ulnar (T1 preference)",
            needleEMG: "Median > ulnar C8-T1 muscle involvement"
        }
    }
};

// Global variables
let currentNerve = null;
let currentInjury = null;
let showLabels = true;
let showVariants = false;

// Initialize the system
document.addEventListener('DOMContentLoaded', function() {
    initializePlexusDiagram();
    console.log('🧠 Brachial Plexus Interactive System Loaded');
});

// Tab switching
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content and mark tab as active
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Initialize the plexus diagram
function initializePlexusDiagram() {
    const svg = document.getElementById('plexus-svg');
    svg.innerHTML = ''; // Clear existing content

    // Draw linear flow pathways first (so they appear behind elements)
    drawConnections(svg);

    // Draw only the visible elements for clean linear design
    drawRoots(svg);           // Nerve roots on the left
    drawNerves(svg);          // All nerves (terminal and proximal) with medical-grade buttons

    console.log('✅ Linear flow plexus diagram initialized');
}

// Draw anatomical plexus structure with three horizontal lines and crossing diagonals
function drawConnections(svg) {
    // Define coordinates for the three main horizontal pathways
    const coords = {
        // Y-coordinates for the three main horizontal lines
        upperLine: 160,    // C5+C6 line
        middleLine: 280,   // C7 line
        lowerLine: 410,    // C8+T1 line

        // X-coordinates for key points
        rootConvergence: 200,    // Where roots converge to start horizontal lines
        middlePlexus: 400,       // Middle section where crossings occur
        terminalStart: 600,      // Where terminal nerves begin

        // Junction points for root convergence
        upperJunction: { x: 200, y: 160 },
        lowerJunction: { x: 200, y: 410 }
    };

    // 1. Draw C5 and C6 converging to upper horizontal line
    const c5Root = plexusData.roots.find(r => r.id === 'C5');
    const c6Root = plexusData.roots.find(r => r.id === 'C6');

    // C5 root connection (no median nerve)
    const c5Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    c5Line.setAttribute('x1', c5Root.x + 45);
    c5Line.setAttribute('y1', c5Root.y + 14);
    c5Line.setAttribute('x2', coords.upperJunction.x);
    c5Line.setAttribute('y2', coords.upperJunction.y);
    c5Line.setAttribute('stroke', '#374151');
    c5Line.setAttribute('stroke-width', '3');
    c5Line.classList.add('plexus-connection');
    c5Line.setAttribute('data-nerve', 'musculocutaneous,axillary,suprascapular,radial');
    svg.appendChild(c5Line);

    // C6 root connection (includes median nerve)
    const c6Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    c6Line.setAttribute('x1', c6Root.x + 45);
    c6Line.setAttribute('y1', c6Root.y + 14);
    c6Line.setAttribute('x2', coords.upperJunction.x);
    c6Line.setAttribute('y2', coords.upperJunction.y);
    c6Line.setAttribute('stroke', '#374151');
    c6Line.setAttribute('stroke-width', '3');
    c6Line.classList.add('plexus-connection');
    c6Line.setAttribute('data-nerve', 'musculocutaneous,axillary,suprascapular,median,radial');
    svg.appendChild(c6Line);

    // 2. Draw upper horizontal line in segments (C5+C6 pathway)
    const suprascapularBranchPoint = coords.rootConvergence + 60; // Where suprascapular branches off

    // Segment 1: From convergence to suprascapular branch (includes suprascapular nerve)
    const upperHorizontal1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    upperHorizontal1.setAttribute('x1', coords.rootConvergence);
    upperHorizontal1.setAttribute('y1', coords.upperLine);
    upperHorizontal1.setAttribute('x2', suprascapularBranchPoint);
    upperHorizontal1.setAttribute('y2', coords.upperLine);
    upperHorizontal1.setAttribute('stroke', '#374151');
    upperHorizontal1.setAttribute('stroke-width', '3');
    upperHorizontal1.classList.add('plexus-connection');
    upperHorizontal1.setAttribute('data-nerve', 'musculocutaneous,median,suprascapular,radial,axillary');
    svg.appendChild(upperHorizontal1);

    // Segment 2: From suprascapular branch to diagonal connection (includes axillary)
    const axillaryDiagonalStart = 320; // Where axillary diagonal connects
    const upperHorizontal2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    upperHorizontal2.setAttribute('x1', suprascapularBranchPoint);
    upperHorizontal2.setAttribute('y1', coords.upperLine);
    upperHorizontal2.setAttribute('x2', axillaryDiagonalStart);
    upperHorizontal2.setAttribute('y2', coords.upperLine);
    upperHorizontal2.setAttribute('stroke', '#374151');
    upperHorizontal2.setAttribute('stroke-width', '3');
    upperHorizontal2.classList.add('plexus-connection');
    upperHorizontal2.setAttribute('data-nerve', 'musculocutaneous,median,radial,axillary');
    svg.appendChild(upperHorizontal2);

    // Segment 3a: From diagonal connection toward terminals (includes median)
    const medianSplitPoint = coords.terminalStart - 80; // Split point before musculocutaneous terminal
    const upperHorizontal3a = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    upperHorizontal3a.setAttribute('x1', axillaryDiagonalStart);
    upperHorizontal3a.setAttribute('y1', coords.upperLine);
    upperHorizontal3a.setAttribute('x2', coords.terminalStart - 30); // Extend to where final diagonal starts (570)
    upperHorizontal3a.setAttribute('y2', coords.upperLine);
    upperHorizontal3a.setAttribute('stroke', '#374151');
    upperHorizontal3a.setAttribute('stroke-width', '3');
    upperHorizontal3a.classList.add('plexus-connection');
    upperHorizontal3a.setAttribute('data-nerve', 'median');
    svg.appendChild(upperHorizontal3a);

    // Segment 3b: From split point to musculocutaneous terminal (musculocutaneous only)
    const upperHorizontal3b = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    upperHorizontal3b.setAttribute('x1', coords.terminalStart - 30); // Start where median highlighting ends (570)
    upperHorizontal3b.setAttribute('y1', coords.upperLine);
    upperHorizontal3b.setAttribute('x2', coords.terminalStart);
    upperHorizontal3b.setAttribute('y2', coords.upperLine);
    upperHorizontal3b.setAttribute('stroke', '#374151');
    upperHorizontal3b.setAttribute('stroke-width', '3');
    upperHorizontal3b.classList.add('plexus-connection');
    upperHorizontal3b.setAttribute('data-nerve', 'musculocutaneous');
    svg.appendChild(upperHorizontal3b);


    // 3. Draw C7 horizontal line in segments
    const c7Root = plexusData.roots.find(r => r.id === 'C7');
    const c7CrossingPoint = coords.middlePlexus; // Where diagonals cross
    const c7BranchPoint = coords.middlePlexus + 60; // Where axillary/radial branches occur

    // Segment 1a: From C7 root to right diagonal connection (includes median)
    const c7Horizontal1a = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    c7Horizontal1a.setAttribute('x1', c7Root.x + 45);  // Adjusted for larger root boxes
    c7Horizontal1a.setAttribute('y1', c7Root.y + 14);  // Center vertically
    c7Horizontal1a.setAttribute('x2', 320);  // leftX value - where right diagonal connects to middle line
    c7Horizontal1a.setAttribute('y2', coords.middleLine);
    c7Horizontal1a.setAttribute('stroke', '#374151');
    c7Horizontal1a.setAttribute('stroke-width', '3');
    c7Horizontal1a.classList.add('plexus-connection');
    c7Horizontal1a.setAttribute('data-nerve', 'median,radial');
    svg.appendChild(c7Horizontal1a);

    // Segment 1b: From right diagonal connection to crossing point (radial only)
    const c7Horizontal1b = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    c7Horizontal1b.setAttribute('x1', 320);  // leftX value - where right diagonal connects to middle line
    c7Horizontal1b.setAttribute('y1', coords.middleLine);
    c7Horizontal1b.setAttribute('x2', c7CrossingPoint);
    c7Horizontal1b.setAttribute('y2', coords.middleLine);
    c7Horizontal1b.setAttribute('stroke', '#374151');
    c7Horizontal1b.setAttribute('stroke-width', '3');
    c7Horizontal1b.classList.add('plexus-connection');
    c7Horizontal1b.setAttribute('data-nerve', 'radial');
    svg.appendChild(c7Horizontal1b);

    // Segment 2: From crossing point to axillary/radial branch point
    const c7Horizontal2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    c7Horizontal2.setAttribute('x1', c7CrossingPoint);
    c7Horizontal2.setAttribute('y1', coords.middleLine);
    c7Horizontal2.setAttribute('x2', c7BranchPoint);
    c7Horizontal2.setAttribute('y2', coords.middleLine);
    c7Horizontal2.setAttribute('stroke', '#374151');
    c7Horizontal2.setAttribute('stroke-width', '3');
    c7Horizontal2.classList.add('plexus-connection');
    c7Horizontal2.setAttribute('data-nerve', 'radial');
    svg.appendChild(c7Horizontal2);

    // 4. Draw C8 and T1 converging to lower horizontal line
    const c8Root = plexusData.roots.find(r => r.id === 'C8');
    const t1Root = plexusData.roots.find(r => r.id === 'T1');

    [c8Root, t1Root].forEach(root => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', root.x + 45);  // Adjusted for larger root boxes
        line.setAttribute('y1', root.y + 14);  // Center vertically
        line.setAttribute('x2', coords.lowerJunction.x);
        line.setAttribute('y2', coords.lowerJunction.y);
        line.setAttribute('stroke', '#374151');
        line.setAttribute('stroke-width', '3');
        line.classList.add('plexus-connection');
        line.setAttribute('data-nerve', 'ulnar,median,radial');
        svg.appendChild(line);
    });

    // 5. Calculate diagonal positions first (needed for line segmentation)
    const leftX = coords.middlePlexus - 80;               // Left X position (320)
    const rightX = coords.middlePlexus - 20;              // Right X position (380)

    // 6. Draw lower horizontal line in segments (C8+T1 pathway)
    const bottomDiagonalConnectionPoint = leftX; // Where bottom diagonal connects to lower line
    const medianConvergencePoint = coords.terminalStart - 50; // Where median convergence occurs

    // Segment 1: From lower convergence to bottom diagonal connection (includes radial)
    const lowerHorizontal1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lowerHorizontal1.setAttribute('x1', coords.rootConvergence);
    lowerHorizontal1.setAttribute('y1', coords.lowerLine);
    lowerHorizontal1.setAttribute('x2', bottomDiagonalConnectionPoint);
    lowerHorizontal1.setAttribute('y2', coords.lowerLine);
    lowerHorizontal1.setAttribute('stroke', '#374151');
    lowerHorizontal1.setAttribute('stroke-width', '3');
    lowerHorizontal1.classList.add('plexus-connection');
    lowerHorizontal1.setAttribute('data-nerve', 'ulnar,median,radial');
    svg.appendChild(lowerHorizontal1);

    // Segment 2: From bottom diagonal connection to median convergence (no radial)
    const lowerHorizontal2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lowerHorizontal2.setAttribute('x1', bottomDiagonalConnectionPoint);
    lowerHorizontal2.setAttribute('y1', coords.lowerLine);
    lowerHorizontal2.setAttribute('x2', medianConvergencePoint);
    lowerHorizontal2.setAttribute('y2', coords.lowerLine);
    lowerHorizontal2.setAttribute('stroke', '#374151');
    lowerHorizontal2.setAttribute('stroke-width', '3');
    lowerHorizontal2.classList.add('plexus-connection');
    lowerHorizontal2.setAttribute('data-nerve', 'ulnar,median');
    svg.appendChild(lowerHorizontal2);

    // Segment 3: From median convergence to ulnar terminal (ulnar only)
    const lowerHorizontal3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lowerHorizontal3.setAttribute('x1', medianConvergencePoint);
    lowerHorizontal3.setAttribute('y1', coords.lowerLine);
    lowerHorizontal3.setAttribute('x2', coords.terminalStart);
    lowerHorizontal3.setAttribute('y2', coords.lowerLine);
    lowerHorizontal3.setAttribute('stroke', '#374151');
    lowerHorizontal3.setAttribute('stroke-width', '3');
    lowerHorizontal3.classList.add('plexus-connection');
    lowerHorizontal3.setAttribute('data-nerve', 'ulnar');
    svg.appendChild(lowerHorizontal3);

    // 7. Draw simple straight diagonal lines that cross (X pattern between upper and middle lines)

    // Left diagonal: straight line from upper-left DOWN and RIGHT to middle-right
    const leftDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftDiagonal.setAttribute('x1', leftX);               // Start left (320)
    leftDiagonal.setAttribute('y1', coords.upperLine);    // From upper line (160)
    leftDiagonal.setAttribute('x2', rightX);              // End right (380)
    leftDiagonal.setAttribute('y2', coords.middleLine);   // To middle line (280) - straight diagonal!
    leftDiagonal.setAttribute('stroke', '#374151');
    leftDiagonal.setAttribute('stroke-width', '3');
    leftDiagonal.classList.add('plexus-connection');
    leftDiagonal.setAttribute('data-nerve', 'axillary,radial');
    svg.appendChild(leftDiagonal);

    // Right diagonal: straight line from upper-right DOWN and LEFT to middle-left
    const rightDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightDiagonal.setAttribute('x1', rightX);             // Start right (380)
    rightDiagonal.setAttribute('y1', coords.upperLine);   // From upper line (160)
    rightDiagonal.setAttribute('x2', leftX);              // End left (320)
    rightDiagonal.setAttribute('y2', coords.middleLine);  // To middle line (280) - straight diagonal!
    rightDiagonal.setAttribute('stroke', '#374151');
    rightDiagonal.setAttribute('stroke-width', '3');
    rightDiagonal.classList.add('plexus-connection');
    rightDiagonal.setAttribute('data-nerve', 'median');
    svg.appendChild(rightDiagonal);

    // 7. Draw simple diagonal from bottom line (C8-T1) UP and RIGHT to middle line
    const bottomDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    bottomDiagonal.setAttribute('x1', leftX);                // Start left (320)
    bottomDiagonal.setAttribute('y1', coords.lowerLine);     // From bottom line (410)
    bottomDiagonal.setAttribute('x2', rightX);               // End right (380) - going UP and RIGHT
    bottomDiagonal.setAttribute('y2', coords.middleLine);    // To middle line (280) - straight diagonal!
    bottomDiagonal.setAttribute('stroke', '#374151');
    bottomDiagonal.setAttribute('stroke-width', '3');
    bottomDiagonal.classList.add('plexus-connection');
    bottomDiagonal.setAttribute('data-nerve', 'radial');
    svg.appendChild(bottomDiagonal);

    // REMOVED: Extra C8-T1 to median nerve diagonal line (was in red oval)

    // 8. Draw two median nerve convergence diagonals (from upper and lower pathways)
    // Upper diagonal: from upper line (C6 pathway) down to median nerve
    const medianUpperDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    medianUpperDiagonal.setAttribute('x1', coords.terminalStart - 30);  // From upper pathway
    medianUpperDiagonal.setAttribute('y1', coords.upperLine);           // Upper line
    medianUpperDiagonal.setAttribute('x2', coords.terminalStart);       // To median nerve terminal
    medianUpperDiagonal.setAttribute('y2', coords.middleLine);          // Middle line where median is
    medianUpperDiagonal.setAttribute('stroke', '#374151');
    medianUpperDiagonal.setAttribute('stroke-width', '3');
    medianUpperDiagonal.classList.add('plexus-connection');
    medianUpperDiagonal.setAttribute('data-nerve', 'median');
    svg.appendChild(medianUpperDiagonal);

    // Lower diagonal: from lower line (C8-T1 pathway) up to median nerve
    const medianLowerDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    medianLowerDiagonal.setAttribute('x1', medianConvergencePoint);     // From lower pathway convergence point
    medianLowerDiagonal.setAttribute('y1', coords.lowerLine);           // Lower line
    medianLowerDiagonal.setAttribute('x2', coords.terminalStart);       // To median nerve terminal
    medianLowerDiagonal.setAttribute('y2', coords.middleLine);          // Middle line where median is
    medianLowerDiagonal.setAttribute('stroke', '#374151');
    medianLowerDiagonal.setAttribute('stroke-width', '3');
    medianLowerDiagonal.classList.add('plexus-connection');
    medianLowerDiagonal.setAttribute('data-nerve', 'median');
    svg.appendChild(medianLowerDiagonal);

    // 7. Draw Axillary horizontal connection from diagonal endpoint to branch point
    const axillaryHorizontalConnection = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axillaryHorizontalConnection.setAttribute('x1', '380');  // End of left diagonal
    axillaryHorizontalConnection.setAttribute('y1', coords.middleLine);
    axillaryHorizontalConnection.setAttribute('x2', c7BranchPoint);  // Axillary branch point
    axillaryHorizontalConnection.setAttribute('y2', coords.middleLine);
    axillaryHorizontalConnection.setAttribute('stroke', '#374151');
    axillaryHorizontalConnection.setAttribute('stroke-width', '3');
    axillaryHorizontalConnection.classList.add('plexus-connection');
    axillaryHorizontalConnection.setAttribute('data-nerve', 'axillary');
    svg.appendChild(axillaryHorizontalConnection);

    // 8. Draw Axillary branch (from the branch point)
    const axillaryBranch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axillaryBranch.setAttribute('x1', c7BranchPoint);
    axillaryBranch.setAttribute('y1', coords.middleLine);
    axillaryBranch.setAttribute('x2', c7BranchPoint + 30);
    axillaryBranch.setAttribute('y2', coords.middleLine - 40);
    axillaryBranch.setAttribute('stroke', '#374151');
    axillaryBranch.setAttribute('stroke-width', '3');
    axillaryBranch.classList.add('plexus-connection');
    axillaryBranch.setAttribute('data-nerve', 'axillary');
    svg.appendChild(axillaryBranch);

    // 8. Draw Radial branch (from the end of C7 segment 2 down to radial nerve terminal)
    const radialBranch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    radialBranch.setAttribute('x1', c7BranchPoint);
    radialBranch.setAttribute('y1', coords.middleLine);
    radialBranch.setAttribute('x2', '500');  // Radial nerve terminal x position
    radialBranch.setAttribute('y2', '320');  // Radial nerve terminal y position
    radialBranch.setAttribute('stroke', '#374151');
    radialBranch.setAttribute('stroke-width', '3');
    radialBranch.classList.add('plexus-connection');
    radialBranch.setAttribute('data-nerve', 'radial');
    svg.appendChild(radialBranch);

    // 9. Draw proximal nerve branches

    // Suprascapular nerve - branches from upper trunk line (using defined branch point)
    // suprascapularBranchPoint already defined above in line segments
    const suprascapularBranch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    suprascapularBranch.setAttribute('x1', suprascapularBranchPoint);
    suprascapularBranch.setAttribute('y1', coords.upperLine);
    suprascapularBranch.setAttribute('x2', suprascapularBranchPoint + 20);
    suprascapularBranch.setAttribute('y2', coords.upperLine - 30);
    suprascapularBranch.setAttribute('stroke', '#374151');
    suprascapularBranch.setAttribute('stroke-width', '3');
    suprascapularBranch.classList.add('plexus-connection');
    suprascapularBranch.setAttribute('data-nerve', 'suprascapular');
    svg.appendChild(suprascapularBranch);


    // Dorsal scapular nerve - direct branch from C5 root
    const dorsalScapularBranch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    dorsalScapularBranch.setAttribute('x1', c5Root.x + 45);  // Adjusted for larger root boxes
    dorsalScapularBranch.setAttribute('y1', c5Root.y + 14); // Center vertically
    dorsalScapularBranch.setAttribute('x2', c5Root.x + 80);
    dorsalScapularBranch.setAttribute('y2', c5Root.y - 15);
    dorsalScapularBranch.setAttribute('stroke', '#374151');
    dorsalScapularBranch.setAttribute('stroke-width', '2');
    dorsalScapularBranch.classList.add('plexus-connection');
    dorsalScapularBranch.setAttribute('data-nerve', 'dorsal_scapular');
    svg.appendChild(dorsalScapularBranch);

    // OLD DIAGONAL LINES REMOVED - now using simple straight diagonals above

    // 10. Draw short horizontal line to Median nerve label
    const medianFinalLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    medianFinalLine.setAttribute('x1', coords.terminalStart);
    medianFinalLine.setAttribute('y1', coords.middleLine);
    medianFinalLine.setAttribute('x2', coords.terminalStart + 20);
    medianFinalLine.setAttribute('y2', coords.middleLine);
    medianFinalLine.setAttribute('stroke', '#374151');
    medianFinalLine.setAttribute('stroke-width', '3');
    medianFinalLine.classList.add('plexus-connection');
    medianFinalLine.setAttribute('data-nerve', 'median');
    svg.appendChild(medianFinalLine);

    // Note: Nerve labels are now integrated into the clickable buttons themselves
    // No need for separate text labels that create duplicates

    // 11. Add section headers
    const headers = [
        { text: 'ROOTS', x: 80, y: 80 },
        { text: 'TERMINAL NERVES', x: 650, y: 80 }
    ];

    headers.forEach(header => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', header.x);
        text.setAttribute('y', header.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('style', 'font-size: 16px; font-weight: bold; fill: #374151;');
        text.textContent = header.text;
        svg.appendChild(text);
    });
}

// Draw nerve roots
function drawRoots(svg) {
    plexusData.roots.forEach(root => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('plexus-element', 'plexus-root');
        g.setAttribute('data-id', root.id);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', root.x);
        rect.setAttribute('y', root.y);
        rect.setAttribute('width', '45');  // Increased from 30
        rect.setAttribute('height', '28');  // Increased from 20
        rect.setAttribute('rx', '6');       // Slightly increased corner radius

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', root.x + 22.5);  // Centered in new width
        text.setAttribute('y', root.y + 19);    // Centered in new height
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '16');   // Increased from 12
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#1f2937');
        text.textContent = root.label;

        g.appendChild(rect);
        g.appendChild(text);

        // Add hover tooltip
        g.addEventListener('mouseover', () => showTooltip(root.description));
        g.addEventListener('mouseout', hideTooltip);

        svg.appendChild(g);
    });
}

// Draw trunks
function drawTrunks(svg) {
    plexusData.trunks.forEach(trunk => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('plexus-element', 'plexus-trunk');
        g.setAttribute('data-id', trunk.id);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', trunk.x);
        rect.setAttribute('y', trunk.y);
        rect.setAttribute('width', '80');
        rect.setAttribute('height', '25');
        rect.setAttribute('rx', '8');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', trunk.x + 40);
        text.setAttribute('y', trunk.y + 17);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '11');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#1f2937');
        text.textContent = trunk.label;

        g.appendChild(rect);
        g.appendChild(text);

        g.addEventListener('mouseover', () => showTooltip(trunk.description));
        g.addEventListener('mouseout', hideTooltip);

        svg.appendChild(g);
    });
}

// Draw divisions
function drawDivisions(svg) {
    plexusData.divisions.forEach(division => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('plexus-element', 'plexus-division');
        g.setAttribute('data-id', division.id);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', division.x);
        rect.setAttribute('y', division.y);
        rect.setAttribute('width', '60');
        rect.setAttribute('height', '20');
        rect.setAttribute('rx', '6');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', division.x + 30);
        text.setAttribute('y', division.y + 14);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '9');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#1f2937');
        text.textContent = division.label;

        g.appendChild(rect);
        g.appendChild(text);

        g.addEventListener('mouseover', () => showTooltip(`${division.type} division of ${division.trunk}`));
        g.addEventListener('mouseout', hideTooltip);

        svg.appendChild(g);
    });
}

// Draw cords
function drawCords(svg) {
    plexusData.cords.forEach(cord => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('plexus-element', 'plexus-cord');
        g.setAttribute('data-id', cord.id);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', cord.x);
        rect.setAttribute('y', cord.y);
        rect.setAttribute('width', '80');
        rect.setAttribute('height', '25');
        rect.setAttribute('rx', '8');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', cord.x + 40);
        text.setAttribute('y', cord.y + 17);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '11');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#1f2937');
        text.textContent = cord.label;

        g.appendChild(rect);
        g.appendChild(text);

        g.addEventListener('mouseover', () => showTooltip(cord.description));
        g.addEventListener('mouseout', hideTooltip);

        svg.appendChild(g);
    });
}

// Draw terminal nerves with medical-grade readable buttons
function drawNerves(svg) {
    plexusData.nerves.forEach(nerve => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('plexus-element', 'plexus-nerve', 'nerve-button-svg');
        g.setAttribute('data-id', nerve.id);
        g.style.cursor = 'pointer';

        // Calculate dynamic button width based on text length (medical standard: minimum 12px font)
        const textLength = nerve.label.length;
        const buttonWidth = Math.max(textLength * 8 + 20, 80); // Minimum 80px width
        const buttonHeight = 28; // Increased height for better readability

        // Medical-grade button background
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', nerve.x);
        rect.setAttribute('y', nerve.y - buttonHeight/2); // Center on pathway endpoint
        rect.setAttribute('width', buttonWidth);
        rect.setAttribute('height', buttonHeight);
        rect.setAttribute('rx', '6'); // Subtle rounding
        rect.setAttribute('fill', '#ffffff'); // White background for maximum readability
        rect.setAttribute('stroke', '#d1d5db'); // Subtle gray border
        rect.setAttribute('stroke-width', '1.5');
        rect.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'); // Professional shadow

        // High-contrast text with medical typography standards
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', nerve.x + buttonWidth/2);
        text.setAttribute('y', nerve.y + 4); // Vertically centered
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '13'); // Above medical minimum of 12px
        text.setAttribute('font-weight', '600'); // Semi-bold for clarity
        text.setAttribute('font-family', 'system-ui, -apple-system, sans-serif'); // Medical-grade font stack
        text.setAttribute('fill', '#1f2937'); // High contrast dark text
        text.textContent = nerve.label;

        g.appendChild(rect);
        g.appendChild(text);

        // Professional hover and click interactions
        g.addEventListener('mouseover', () => {
            rect.setAttribute('fill', '#e0f2fe'); // Light blue hover
            rect.setAttribute('stroke', '#0369a1'); // Blue border on hover
            showTooltip(nerve.description);
        });

        g.addEventListener('mouseout', () => {
            if (!g.classList.contains('active')) {
                rect.setAttribute('fill', '#ffffff'); // Return to white
                rect.setAttribute('stroke', '#d1d5db'); // Return to gray border
            }
            hideTooltip();
        });

        // Click to trace nerve pathway
        g.addEventListener('click', () => {
            traceNerve(nerve.id);
        });

        svg.appendChild(g);
    });
}

// Draw proximal nerves
function drawProximalNerves(svg) {
    plexusData.proximalNerves.forEach(nerve => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('plexus-element', 'plexus-nerve');
        g.setAttribute('data-id', nerve.id);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', nerve.x);
        rect.setAttribute('y', nerve.y);
        rect.setAttribute('width', '100');
        rect.setAttribute('height', '20');
        rect.setAttribute('rx', '8');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', nerve.x + 50);
        text.setAttribute('y', nerve.y + 14);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#1f2937');
        text.textContent = nerve.label;

        g.appendChild(rect);
        g.appendChild(text);

        g.addEventListener('mouseover', () => showTooltip(nerve.description));
        g.addEventListener('mouseout', hideTooltip);

        svg.appendChild(g);
    });
}

// Nerve tracing functionality
function traceNerve(nerveName) {
    clearTracing();
    currentNerve = nerveName;

    const nerve = plexusData.nerves.find(n => n.id === nerveName);
    if (!nerve) return;

    // Update active button - handle both HTML buttons and SVG nerve buttons
    document.querySelectorAll('.nerve-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.nerve-button-svg').forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked SVG nerve button
    const clickedSvgButton = document.querySelector(`.nerve-button-svg[data-id="${nerveName}"]`);
    if (clickedSvgButton) {
        clickedSvgButton.classList.add('active');
    }

    // Highlight nerve pathway
    highlightPathway(nerve);

    // Update info panel
    updateNerveInfo(nerve);
}

function highlightPathway(nerve) {
    // Clear previous highlighting
    document.querySelectorAll('.plexus-connection').forEach(line => {
        line.style.opacity = '0.3';
        line.style.strokeWidth = '3';
        line.style.filter = 'none';
    });

    // Define nerve pathway mappings for the new structure
    const nervePathways = {
        'musculocutaneous': {
            roots: ['C5', 'C6'],
            lines: ['C5-upper', 'C6-upper', 'upper-horizontal', 'musculocutaneous-final']
        },
        'axillary': {
            roots: ['C5', 'C6'],
            lines: ['C5-upper', 'C6-upper', 'upper-to-middle', 'axillary-branch']
        },
        'radial': {
            roots: ['C5', 'C6', 'C7', 'C8', 'T1'],
            lines: ['C5-upper', 'C6-upper', 'C8-lower', 'T1-lower', 'upper-to-middle', 'lower-to-middle', 'C7-horizontal', 'radial-branch']
        },
        'median': {
            roots: ['C6', 'C7', 'C8', 'T1'],
            lines: ['C6-upper', 'C8-lower', 'T1-lower', 'upper-horizontal', 'lower-horizontal', 'upper-to-median', 'lower-to-median', 'C7-horizontal']
        },
        'ulnar': {
            roots: ['C8', 'T1'],
            lines: ['C8-lower', 'T1-lower', 'lower-horizontal', 'ulnar-final']
        },
        'suprascapular': {
            roots: ['C5', 'C6'],
            lines: ['C5-upper', 'C6-upper', 'upper-horizontal', 'suprascapular-branch']
        },
        'dorsal_scapular': {
            roots: ['C5'],
            lines: ['C5-dorsalscap']
        }
    };

    const pathway = nervePathways[nerve.id];
    if (!pathway) return;

    // Highlight all connections in the pathway
    document.querySelectorAll('.plexus-connection').forEach(line => {
        const datanerve = line.getAttribute('data-nerve');
        const isInPathway = datanerve && datanerve.split(',').includes(nerve.id);

        if (isInPathway) {
            line.style.opacity = '1';
            line.style.strokeWidth = '5';
            line.style.filter = 'drop-shadow(0 0 6px #3b82f6)';
        }
    });

    // Highlight connected roots
    if (pathway.roots) {
        pathway.roots.forEach(rootId => {
            const rootElement = document.querySelector(`[data-id="${rootId}"]`);
            if (rootElement) {
                rootElement.classList.add('highlighted');
                rootElement.style.filter = 'drop-shadow(0 0 4px #3b82f6)';
            }
        });
    }

    // Special highlighting for specific nerve pathways
    switch(nerve.id) {
        case 'musculocutaneous':
            // Highlight C5+C6 convergence and upper horizontal line
            document.querySelectorAll('.plexus-connection').forEach(line => {
                const x1 = parseFloat(line.getAttribute('x1'));
                const y1 = parseFloat(line.getAttribute('y1'));
                const x2 = parseFloat(line.getAttribute('x2'));
                const y2 = parseFloat(line.getAttribute('y2'));

                // Upper horizontal line (y=160) or connections to it
                if ((y1 === 160 && y2 === 160) || (y2 === 160 && x2 === 200)) {
                    line.style.opacity = '1';
                    line.style.strokeWidth = '5';
                    line.style.filter = 'drop-shadow(0 0 6px #3b82f6)';
                }
            });
            break;

        case 'axillary':
            // Highlight axillary branch specifically
            document.querySelectorAll('[data-nerve="axillary"]').forEach(element => {
                element.style.opacity = '1';
                element.style.strokeWidth = '5';
                element.style.filter = 'drop-shadow(0 0 6px #3b82f6)';
            });
            break;

        case 'radial':
            // Highlight radial branch specifically
            document.querySelectorAll('[data-nerve="radial"]').forEach(element => {
                element.style.opacity = '1';
                element.style.strokeWidth = '5';
                element.style.filter = 'drop-shadow(0 0 6px #3b82f6)';
            });
            break;
    }
}

function clearTracing() {
    // Reset all plexus connections
    document.querySelectorAll('.plexus-connection').forEach(line => {
        line.style.opacity = '1';
        line.style.strokeWidth = '3';
        line.style.filter = 'none';
    });

    // Clear highlighted root elements
    document.querySelectorAll('.plexus-element').forEach(el => {
        el.classList.remove('highlighted');
        el.style.filter = 'none';
    });

    // Clear active buttons
    document.querySelectorAll('.nerve-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.nerve-button-svg').forEach(btn => btn.classList.remove('active'));
    currentNerve = null;

    // Reset info panel
    document.getElementById('nerve-info').innerHTML = `
        <h4 style="color: #1e40af; margin-bottom: 10px;">Select a nerve to trace its pathway</h4>
        <p style="color: #64748b;">Click on any nerve button to see how each nerve root contributes to the terminal nerve through the brachial plexus pathways.</p>
    `;
}

function updateNerveInfo(nerve) {
    const infoPanel = document.getElementById('nerve-info');
    infoPanel.innerHTML = `
        <h4 style="color: #1e40af; margin-bottom: 15px;">${nerve.label} Nerve</h4>
        <p style="color: #64748b; margin-bottom: 12px; line-height: 1.5;">${nerve.description}</p>
        <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; margin-bottom: 10px;">
            <strong style="color: #1e40af;">Motor:</strong> ${nerve.muscles.join(', ')}
        </div>
        <div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
            <strong style="color: #059669;">Sensory:</strong> ${nerve.sensory}
        </div>
    `;
}

// Injury simulation
function showInjury(injuryType) {
    currentInjury = injuryType;
    const injury = injuryPatterns[injuryType];

    // Update active card
    document.querySelectorAll('.injury-card').forEach(card => card.classList.remove('active'));
    event.target.classList.add('active');

    // Show detailed injury information
    const detailsDiv = document.getElementById('injury-details');
    detailsDiv.innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
            <h3 style="color: #1e40af; margin-bottom: 20px; font-size: 1.8em;">${injury.title}</h3>
            <p style="color: #64748b; margin-bottom: 25px; font-size: 1.1em; line-height: 1.6;">${injury.description}</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px;">
                <div class="clinical-pattern">
                    <h4 style="color: #d97706; margin-bottom: 15px;">🎯 Clinical Pattern</h4>
                    <div style="margin-bottom: 12px;"><strong>Mechanism:</strong> ${injury.mechanism}</div>
                    ${injury.clinicalPattern.weakness ? `<div style="margin-bottom: 12px;"><strong>Weakness:</strong> ${injury.clinicalPattern.weakness}</div>` : ''}
                    ${injury.clinicalPattern.sensory ? `<div style="margin-bottom: 12px;"><strong>Sensory Loss:</strong> ${injury.clinicalPattern.sensory}</div>` : ''}
                    ${injury.clinicalPattern.reflexes ? `<div><strong>Reflexes:</strong> ${injury.clinicalPattern.reflexes}</div>` : ''}
                </div>

                <div class="emg-section">
                    <h4 style="color: #059669; margin-bottom: 15px;">📈 EMG Findings</h4>
                    ${injury.emgFindings.snaps ? `<div style="margin-bottom: 12px;"><strong>SNAPs:</strong> ${injury.emgFindings.snaps}</div>` : ''}
                    ${injury.emgFindings.motorStudies ? `<div style="margin-bottom: 12px;"><strong>Motor Studies:</strong> ${injury.emgFindings.motorStudies}</div>` : ''}
                    ${injury.emgFindings.needleEMG ? `<div><strong>Needle EMG:</strong> ${injury.emgFindings.needleEMG}</div>` : ''}
                    ${injury.emgFindings.pathognomonic ? `<div style="margin-top: 12px; color: #dc2626;"><strong>Pathognomonic:</strong> ${injury.emgFindings.pathognomonic}</div>` : ''}
                </div>
            </div>

            ${injury.emgFindings.prognosis ? `
                <div style="background: #eff6ff; padding: 15px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <strong style="color: #1e40af;">Prognosis:</strong> ${injury.emgFindings.prognosis}
                </div>
            ` : ''}
        </div>
    `;

    // Highlight affected structures on diagram if in anatomy tab
    if (document.getElementById('anatomy-tab').classList.contains('active')) {
        highlightInjuryPattern(injury);
    }
}

function highlightInjuryPattern(injury) {
    clearTracing();

    if (Array.isArray(injury.affected)) {
        injury.affected.forEach(elementId => {
            const element = document.querySelector(`[data-id="${elementId}"]`);
            if (element) {
                element.classList.add('highlighted');
                element.style.filter = 'brightness(1.2) saturate(1.5)';
                element.style.stroke = '#dc2626';
            }
        });
    }
}

// Toggle functions
function toggleLabels() {
    showLabels = document.getElementById('show-labels').checked;
    // Implementation for label visibility
}

function toggleVariants() {
    showVariants = document.getElementById('show-variants').checked;
    // Implementation for anatomical variants
}

// Tooltip functions
function showTooltip(text) {
    // Simple tooltip implementation
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: #1f2937;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1000;
        max-width: 200px;
        pointer-events: none;
    `;
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    document.addEventListener('mousemove', updateTooltipPosition);
}

function updateTooltipPosition(e) {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.left = (e.clientX + 10) + 'px';
        tooltip.style.top = (e.clientY - 10) + 'px';
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.remove();
        document.removeEventListener('mousemove', updateTooltipPosition);
    }
}

console.log('🚀 Brachial Plexus Interactive System Ready');