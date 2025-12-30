
import { generateErnestButton } from '../../modules/audio/AudioData.js';

// ==========================================
// 1. BRACHIAL PLEXUS DATA & LOGIC
// ==========================================


const brachialPlexusData = {
    roots: [
        { id: 'C5', x: 80, y: 120, label: 'C5', description: 'Fifth cervical nerve root' },
        { id: 'C6', x: 80, y: 180, label: 'C6', description: 'Sixth cervical nerve root' },
        { id: 'C7', x: 80, y: 280, label: 'C7', description: 'Seventh cervical nerve root' },
        { id: 'C8', x: 80, y: 380, label: 'C8', description: 'Eighth cervical nerve root' },
        { id: 'T1', x: 80, y: 440, label: 'T1', description: 'First thoracic nerve root' }
    ],
    junctions: [
        { id: 'musc-junction', x: 300, y: 100, pathways: ['C5', 'C6', 'C7'] },
        { id: 'axil-junction', x: 400, y: 130, pathways: ['C5', 'C6'] },
        { id: 'median-junction1', x: 350, y: 190, pathways: ['C6', 'C7'] },
        { id: 'median-junction2', x: 450, y: 190, pathways: ['C8', 'T1'] },
        { id: 'radial-junction', x: 400, y: 250, pathways: ['C5', 'C6', 'C7', 'C8', 'T1'] },
        { id: 'ulnar-junction', x: 350, y: 300, pathways: ['C8', 'T1'] }
    ],
    nerves: [
        {
            id: 'musculocutaneous',
            x: 630, y: 160,
            label: 'Musculocutaneous',
            description: 'C5-C7 • Lateral Cord • Elbow Flexion',
            pathway: 'musc-junction',
            roots: ['C5', 'C6', 'C7'],
            muscles: ['Biceps', 'Brachialis', 'Coracobrachialis'],
            sensory: 'Lateral forearm'
        },
        {
            id: 'axillary',
            x: 500, y: 240,
            label: 'Axillary',
            description: 'C5-C6 • Posterior Cord • Shoulder Abduction',
            pathway: 'axil-junction',
            roots: ['C5', 'C6'],
            muscles: ['Deltoid', 'Teres minor'],
            sensory: 'Lateral arm'
        },
        {
            id: 'median',
            x: 630, y: 280,
            label: 'Median',
            description: 'C6-T1 • Lateral & Medial Cords • Precision Grip Master',
            pathway: ['median-junction1', 'median-junction2'],
            roots: ['C6', 'C7', 'C8', 'T1'],
            muscles: ['APB', 'OP', 'FPB', 'Lumb 1&2', 'Pronator Teres', 'FCR'],
            sensory: 'Thumb, index, middle, lateral ring'
        },
        {
            id: 'radial',
            x: 500, y: 320,
            label: 'Radial',
            description: 'C5-T1 • Posterior Cord • Extension Powerhouse',
            pathway: 'radial-junction',
            roots: ['C5', 'C6', 'C7', 'C8', 'T1'],
            muscles: ['Extensors', 'Triceps', 'Brachioradialis'],
            sensory: 'First web space, posterior forearm'
        },
        {
            id: 'ulnar',
            x: 630, y: 410,
            label: 'Ulnar',
            description: 'C8-T1 • Medial Cord • Grip Strength & Fine Motor Control',
            pathway: 'ulnar-junction',
            roots: ['C8', 'T1'],
            muscles: ['Hand intrinsics', 'FCU', 'FDP (4,5)'],
            sensory: 'Ring, little finger + dorsal hand'
        },
        {
            id: 'suprascapular',
            x: 290, y: 130,
            label: 'Suprascapular',
            description: 'C5-C6 • Upper Trunk • Supraspinatus & Infraspinatus',
            roots: ['C5', 'C6'],
            muscles: ['Supraspinatus', 'Infraspinatus'],
            sensory: 'None'
        },
        {
            id: 'dorsal_scapular',
            x: 160, y: 110,
            label: 'Dorsal Scapular',
            description: 'C5 root directly • Rhomboids',
            roots: ['C5'],
            muscles: ['Rhomboids', 'Levator scapulae'],
            sensory: 'None'
        }
    ],
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
    ]
};

const brachialInjuryPatterns = {
    erb: {
        title: "Erb's Palsy (Upper Trunk Plexopathy)",
        affected: ['C5', 'C6', 'upper-trunk'],
        location: { x: 245, y: 160 },
        affectedSegments: [
            'root-c5', 'root-c6',
            'trunk-upper',
            'div-upper-ant', 'div-upper-post',
            'cord-lateral', 'cord-posterior',
            'nerve-musc',
            'median-lateral-root',
            'nerve-axillary', 'nerve-radial',
            'nerve-median', // Added for visual continuity
            'nerve-suprascapular'
        ],
        downstreamPathways: ['musculocutaneous', 'axillary', 'suprascapular', 'radial', 'median'],
        affectedNerves: ['musculocutaneous', 'axillary', 'suprascapular', 'radial'],
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
        location: { x: 260, y: 410 },
        affectedSegments: [
            'root-c8', 'root-t1',
            'trunk-lower',
            'div-lower-ant', // Exclude div-lower-post (Radial) for clinical accuracy
            'cord-medial',
            'nerve-ulnar',
            'median-medial-root',
            'nerve-median'
        ],
        downstreamPathways: ['ulnar', 'median'],
        affectedNerves: ['ulnar', 'median'],
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
        // No specific location marker as it is variable
        description: "Immune-mediated brachial plexitis",
        mechanism: "Often preceded by viral illness, immunization, or surgery",
        clinicalPattern: {
            onset: "Severe shoulder pain for 1-2 weeks, then weakness as pain subsides",
            weakness: "Variable pattern - long thoracic and AIN commonly involved",
            sensory: "Usually mild compared to motor involvement",
            characteristic: "Medial scapular winging (long thoracic), abnormal 'OK' sign (AIN)"
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
        location: { x: 260, y: 410 },
        affectedSegments: [
            'root-c8', 'root-t1',
            'trunk-lower',
            'div-lower-ant',
            'cord-medial',
            'nerve-ulnar',
            'median-medial-root',
            'nerve-median'
        ],
        downstreamPathways: ['ulnar', 'median'],
        affectedNerves: ['ulnar'],
        description: "Most common after cardiac surgery",
        mechanism: "Stretch injury from chest wall retraction or hematoma compression",
        clinicalPattern: {
            weakness: "Hand intrinsics (C8-T1)",
            sensory: "Medial hand/forearm",
            prognosis: "Usually good recovery over months"
        },
        emgFindings: {
            snaps: "Ulnar/Medial Antebrachial Cutaneous abnormal",
            needleEMG: "C8-T1 muscles affected"
        }
    },
    radiation: {
        title: "Radiation-Induced Plexopathy",
        affected: ['upper-trunk'],
        location: { x: 245, y: 160 },
        affectedSegments: [
            'root-c5', 'root-c6',
            'trunk-upper',
            'div-upper-ant', 'div-upper-post',
            'cord-lateral', 'cord-posterior',
            'nerve-musc', 'nerve-axillary', 'nerve-suprascapular',
            'median-lateral-root'
        ],
        downstreamPathways: ['musculocutaneous', 'axillary', 'suprascapular'],
        affectedNerves: ['musculocutaneous', 'axillary', 'suprascapular'],
        description: "Delayed progressive plexopathy after radiation therapy",
        mechanism: "Microvascular damage and fibrosis",
        clinicalPattern: {
            onset: "Years after treatment",
            pain: "Usually painless (unlike neoplastic)",
            progression: "Slowly progressive weakness"
        },
        emgFindings: {
            pathognomonic: "Myokymic discharges (facial-like twitching on EMG)",
            distribution: "Often upper trunk/lateral cord first"
        }
    },
    tos: {
        title: "Thoracic Outlet Syndrome (Neurogenic)",
        affected: ['lower-trunk'],
        location: { x: 260, y: 410 },
        affectedSegments: [
            'root-c8', 'root-t1',
            'trunk-lower',
            'div-lower-ant',
            'cord-medial',
            'nerve-ulnar',
            'median-medial-root',
            'nerve-median'
        ],
        downstreamPathways: ['ulnar', 'median'],
        affectedNerves: ['ulnar', 'median'],
        description: "Compression of lower trunk by fibrous band",
        mechanism: "Fibrous band from cervical rib or elongated C7 transverse process",
        clinicalPattern: {
            weakness: "Thenar atrophy (Gilliatt-Sumner hand)",
            sensory: "Medial forearm (T1)",
            pain: "Medial arm/forearm pain"
        },
        emgFindings: {
            snaps: "Medial antebrachial cutaneous abnormal, Ulnar often normal (spared)",
            motorStudies: "Median CMAP reduced (thenar atrophy)",
            needleEMG: "Chronic denervation in T1 > C8 muscles"
        }
    },
    panplexus: {
        title: "Pan-Plexus Palsy (Flail Arm)",
        affected: ['C5', 'C6', 'C7', 'C8', 'T1'],
        location: { x: 150, y: 280 },
        affectedSegments: [
            'root-c5', 'root-c6', 'root-c7', 'root-c8', 'root-t1',
            'trunk-upper', 'trunk-middle', 'trunk-lower',
            'div-upper-ant', 'div-upper-post', 'div-middle-ant', 'div-middle-post', 'div-lower-ant', 'div-lower-post',
            'cord-lateral', 'cord-posterior', 'cord-medial',
            'nerve-musc', 'nerve-axillary', 'nerve-radial', 'nerve-median', 'nerve-ulnar',
            'median-lateral-root', 'median-medial-root',
            'nerve-suprascapular'
        ],
        downstreamPathways: ['musculocutaneous', 'axillary', 'radial', 'median', 'ulnar', 'suprascapular'],
        affectedNerves: ['musculocutaneous', 'axillary', 'radial', 'median', 'ulnar', 'suprascapular'],
        description: "Complete injury to the entire brachial plexus",
        mechanism: "High-velocity trauma (motorcycle, auto vs ped)",
        clinicalPattern: {
            weakness: "Complete paralysis of the arm (flail arm)",
            sensory: "Global anesthesia of the arm (C5-T1)",
            reflexes: "All deep tendon reflexes absent",
            muscles: "All arm and shoulder girdle muscles"
        },
        emgFindings: {
            snaps: "All SNAPs absent",
            motorStudies: "All CMAPs absent or severely reduced",
            needleEMG: "Denervation in all C5-T1 myotomes"
        }
    },
    posteriorcord: {
        title: "Posterior Cord Plexopathy",
        affected: ['posterior-cord'],
        location: { x: 430, y: 280 },
        affectedSegments: [
            'cord-posterior',
            'nerve-axillary',
            'nerve-radial'
        ],
        downstreamPathways: ['axillary', 'radial'],
        affectedNerves: ['axillary', 'radial'],
        description: "Injury to the posterior cord (C5-C8 fibers)",
        mechanism: "Incorrect use of crutches ('Crutch Palsy'), shoulder dislocation",
        clinicalPattern: {
            weakness: "Shoulder abduction (Axillary), Elbow/Wrist/Finger extension (Radial)",
            sensory: "Lateral arm, posterior forearm, dorsal hand",
            spared: "Biceps (Musculocutaneous), Flexors (Median/Ulnar)",
            characteristic: "Wrist drop + inability to lift arm"
        },
        emgFindings: {
            snaps: "Radial and Axillary abnormal",
            motorStudies: "Radial and Axillary CMAPs reduced",
            needleEMG: "Deltoid, Triceps, Extensors affected. Biceps/Flexors spared."
        }
    }
};

export const BrachialPlexusInteractive = {
    currentNerve: null,
    currentInjury: null,

    init: function () {
        setTimeout(() => {
            this.drawPlexus();
            this.showTab('anatomy');
        }, 100);
    },

    showTab: function (tabId) {
        document.querySelectorAll('#brachial-container .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#brachial-container .tab-content').forEach(c => c.classList.remove('active'));

        const tabBtn = document.querySelector(`#brachial-container .tab[onclick*="${tabId}"]`);
        if (tabBtn) tabBtn.classList.add('active');

        const content = document.getElementById(`${tabId}-tab`);
        if (content) content.classList.add('active');

        if (tabId === 'anatomy') {
            this.drawPlexus();
        }
    },

    drawPlexus: function () {
        const svg = document.getElementById('plexus-svg');
        if (!svg) return;

        svg.innerHTML = ''; // Clear existing

        // Define coordinates
        const coords = {
            rootsX: 80,
            trunksX: 200,
            divisionsX: 300,
            cordsX: 500,
            terminalsX: 630,
            upperLine: 160,
            middleLine: 280,
            lowerLine: 410,
            middlePlexus: 400,
            terminalStart: 570,
            rootConvergence: 200
        };

        // 1. Draw Roots (Boxes)
        brachialPlexusData.roots.forEach(root => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', 'plexus-element plexus-root');
            group.setAttribute('data-id', root.id);
            group.setAttribute('data-segment', `root-${root.id.toLowerCase()}`);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', root.x);
            rect.setAttribute('y', root.y);
            rect.setAttribute('width', '50');
            rect.setAttribute('height', '30');
            rect.setAttribute('rx', '5');
            rect.setAttribute('fill', '#eff6ff');
            rect.setAttribute('stroke', '#000000');
            rect.setAttribute('stroke-width', '2');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', root.x + 25);
            text.setAttribute('y', root.y + 20);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('class', 'root-label');
            text.setAttribute('fill', '#1e40af');
            text.setAttribute('font-weight', 'bold');
            text.setAttribute('font-size', '14px');
            text.textContent = root.label;

            group.appendChild(rect);
            group.appendChild(text);
            svg.appendChild(group);
        });

        // 2. Draw C5 and C6 converging to upper horizontal line
        const c5Root = brachialPlexusData.roots.find(r => r.id === 'C5');
        const c6Root = brachialPlexusData.roots.find(r => r.id === 'C6');
        const upperTrunkStart = { x: 200, y: 160 };

        [c5Root, c6Root].forEach(root => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', root.x + 50);
            line.setAttribute('y1', root.y + 15);
            line.setAttribute('x2', upperTrunkStart.x);
            line.setAttribute('y2', upperTrunkStart.y);
            line.setAttribute('stroke', '#374151');
            line.setAttribute('stroke-width', '3');
            line.classList.add('plexus-connection');
            line.setAttribute('data-nerve', 'musculocutaneous,axillary,radial,median,suprascapular');
            line.setAttribute('data-segment', 'trunk-upper');
            svg.appendChild(line);
        });

        // 3. Draw upper horizontal line in segments
        const suprascapularBranchPoint = 290;
        const axillaryDiagonalStart = 380; // rightX

        // Segment 1: From convergence to suprascapular branch
        const upperHorizontal1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        upperHorizontal1.setAttribute('x1', upperTrunkStart.x);
        upperHorizontal1.setAttribute('y1', coords.upperLine);
        upperHorizontal1.setAttribute('x2', suprascapularBranchPoint);
        upperHorizontal1.setAttribute('y2', coords.upperLine);
        upperHorizontal1.setAttribute('stroke', '#374151');
        upperHorizontal1.setAttribute('stroke-width', '3');
        upperHorizontal1.classList.add('plexus-connection');
        upperHorizontal1.setAttribute('data-nerve', 'musculocutaneous,axillary,radial,median,suprascapular');
        upperHorizontal1.setAttribute('data-segment', 'trunk-upper');
        svg.appendChild(upperHorizontal1);

        // Suprascapular nerve branch (upward)
        const supraNerve = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        supraNerve.setAttribute('x1', suprascapularBranchPoint);
        supraNerve.setAttribute('y1', coords.upperLine);
        supraNerve.setAttribute('x2', suprascapularBranchPoint);
        supraNerve.setAttribute('y2', coords.upperLine - 30);
        supraNerve.setAttribute('stroke', '#374151');
        supraNerve.setAttribute('stroke-width', '3');
        supraNerve.classList.add('plexus-connection');
        supraNerve.setAttribute('data-nerve', 'suprascapular');
        supraNerve.setAttribute('data-segment', 'nerve-suprascapular');
        svg.appendChild(supraNerve);

        // Segment 2a: From suprascapular branch to diagonal split point (Posterior Division takeoff)
        const diagonalSplitPoint = 320; // leftX
        const upperHorizontal2a = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        upperHorizontal2a.setAttribute('x1', suprascapularBranchPoint);
        upperHorizontal2a.setAttribute('y1', coords.upperLine);
        upperHorizontal2a.setAttribute('x2', diagonalSplitPoint);
        upperHorizontal2a.setAttribute('y2', coords.upperLine);
        upperHorizontal2a.setAttribute('stroke', '#374151');
        upperHorizontal2a.setAttribute('stroke-width', '3');
        upperHorizontal2a.classList.add('plexus-connection');
        upperHorizontal2a.setAttribute('data-nerve', 'musculocutaneous,median,radial,axillary');
        upperHorizontal2a.setAttribute('data-segment', 'trunk-upper');
        svg.appendChild(upperHorizontal2a);

        // Segment 2b: From diagonal split point to axillary diagonal start (Anterior Division)
        const upperHorizontal2b = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        upperHorizontal2b.setAttribute('x1', diagonalSplitPoint);
        upperHorizontal2b.setAttribute('y1', coords.upperLine);
        upperHorizontal2b.setAttribute('x2', axillaryDiagonalStart);
        upperHorizontal2b.setAttribute('y2', coords.upperLine);
        upperHorizontal2b.setAttribute('stroke', '#374151');
        upperHorizontal2b.setAttribute('stroke-width', '3');
        upperHorizontal2b.classList.add('plexus-connection');
        upperHorizontal2b.setAttribute('data-nerve', 'musculocutaneous,median'); // No axillary/radial here!
        upperHorizontal2b.setAttribute('data-segment', 'div-upper-ant');
        svg.appendChild(upperHorizontal2b);

        // Segment 3a: From diagonal connection toward terminals (includes median)
        const medianSplitPoint = coords.terminalStart - 80;
        const upperHorizontal3a = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        upperHorizontal3a.setAttribute('x1', axillaryDiagonalStart);
        upperHorizontal3a.setAttribute('y1', coords.upperLine);
        upperHorizontal3a.setAttribute('x2', coords.terminalStart - 30);
        upperHorizontal3a.setAttribute('y2', coords.upperLine);
        upperHorizontal3a.setAttribute('stroke', '#374151');
        upperHorizontal3a.setAttribute('stroke-width', '3');
        upperHorizontal3a.classList.add('plexus-connection');
        upperHorizontal3a.setAttribute('data-nerve', 'median,musculocutaneous');
        upperHorizontal3a.setAttribute('data-segment', 'cord-lateral');
        svg.appendChild(upperHorizontal3a);

        // Segment 3b: From split point to musculocutaneous terminal (musculocutaneous only)
        const upperHorizontal3b = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        upperHorizontal3b.setAttribute('x1', coords.terminalStart - 30);
        upperHorizontal3b.setAttribute('y1', coords.upperLine);
        upperHorizontal3b.setAttribute('x2', coords.terminalStart);
        upperHorizontal3b.setAttribute('y2', coords.upperLine);
        upperHorizontal3b.setAttribute('stroke', '#374151');
        upperHorizontal3b.setAttribute('stroke-width', '3');
        upperHorizontal3b.classList.add('plexus-connection');
        upperHorizontal3b.setAttribute('data-nerve', 'musculocutaneous');
        upperHorizontal3b.setAttribute('data-segment', 'nerve-musc');
        svg.appendChild(upperHorizontal3b);

        // 4. Draw C7 horizontal line in segments
        const c7Root = brachialPlexusData.roots.find(r => r.id === 'C7');
        const c7CrossingPoint = coords.middlePlexus;
        const c7BranchPoint = coords.middlePlexus + 60;

        // Segment 1a: From C7 root to right diagonal connection (includes median)
        const c7Horizontal1a = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        c7Horizontal1a.setAttribute('x1', c7Root.x + 50);
        c7Horizontal1a.setAttribute('y1', c7Root.y + 15);
        c7Horizontal1a.setAttribute('x2', 320);
        c7Horizontal1a.setAttribute('y2', coords.middleLine);
        c7Horizontal1a.setAttribute('stroke', '#374151');
        c7Horizontal1a.setAttribute('stroke-width', '3');
        c7Horizontal1a.classList.add('plexus-connection');
        c7Horizontal1a.setAttribute('data-nerve', 'median,radial');
        c7Horizontal1a.setAttribute('data-segment', 'trunk-middle');
        svg.appendChild(c7Horizontal1a);

        // Segment 1b: From right diagonal connection to crossing point (radial only)
        const c7Horizontal1b = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        c7Horizontal1b.setAttribute('x1', 320);
        c7Horizontal1b.setAttribute('y1', coords.middleLine);
        c7Horizontal1b.setAttribute('x2', c7CrossingPoint);
        c7Horizontal1b.setAttribute('y2', coords.middleLine);
        c7Horizontal1b.setAttribute('stroke', '#374151');
        c7Horizontal1b.setAttribute('stroke-width', '3');
        c7Horizontal1b.classList.add('plexus-connection');
        c7Horizontal1b.setAttribute('data-nerve', 'radial');
        c7Horizontal1b.setAttribute('data-segment', 'div-middle-post');
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
        c7Horizontal2.setAttribute('data-segment', 'cord-posterior');
        svg.appendChild(c7Horizontal2);

        // 5. Draw C8 and T1 converging to lower horizontal line
        const c8Root = brachialPlexusData.roots.find(r => r.id === 'C8');
        const t1Root = brachialPlexusData.roots.find(r => r.id === 'T1');
        const lowerJunction = { x: 200, y: 410 };

        [c8Root, t1Root].forEach(root => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', root.x + 50);
            line.setAttribute('y1', root.y + 15);
            line.setAttribute('x2', lowerJunction.x);
            line.setAttribute('y2', lowerJunction.y);
            line.setAttribute('stroke', '#374151');
            line.setAttribute('stroke-width', '3');
            line.classList.add('plexus-connection');
            line.setAttribute('data-nerve', 'ulnar,median,radial');
            line.setAttribute('data-segment', 'trunk-lower');
            svg.appendChild(line);
        });

        // 6. Calculate diagonal positions
        const leftX = coords.middlePlexus - 80; // 320
        const rightX = coords.middlePlexus - 20; // 380

        // 7. Draw lower horizontal line in segments (C8+T1 pathway)
        const bottomDiagonalConnectionPoint = leftX;
        const medianConvergencePoint = coords.terminalStart - 50;

        // Segment 1: From lower convergence to bottom diagonal connection (includes radial)
        const lowerHorizontal1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lowerHorizontal1.setAttribute('x1', lowerJunction.x);
        lowerHorizontal1.setAttribute('y1', coords.lowerLine);
        lowerHorizontal1.setAttribute('x2', bottomDiagonalConnectionPoint);
        lowerHorizontal1.setAttribute('y2', coords.lowerLine);
        lowerHorizontal1.setAttribute('stroke', '#374151');
        lowerHorizontal1.setAttribute('stroke-width', '3');
        lowerHorizontal1.classList.add('plexus-connection');
        lowerHorizontal1.setAttribute('data-nerve', 'ulnar,median,radial');
        lowerHorizontal1.setAttribute('data-segment', 'trunk-lower');
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
        lowerHorizontal2.setAttribute('data-segment', 'cord-medial'); // Anterior division of lower trunk becomes medial cord
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
        lowerHorizontal3.setAttribute('data-segment', 'nerve-ulnar');
        svg.appendChild(lowerHorizontal3);

        // 8. Draw simple straight diagonal lines that cross
        // Left diagonal: straight line from upper-left DOWN and RIGHT to middle-right
        const leftDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        leftDiagonal.setAttribute('x1', leftX);
        leftDiagonal.setAttribute('y1', coords.upperLine);
        leftDiagonal.setAttribute('x2', rightX);
        leftDiagonal.setAttribute('y2', coords.middleLine);
        leftDiagonal.setAttribute('stroke', '#374151');
        leftDiagonal.setAttribute('stroke-width', '3');
        leftDiagonal.classList.add('plexus-connection');
        leftDiagonal.setAttribute('data-nerve', 'axillary,radial');
        leftDiagonal.setAttribute('data-segment', 'div-upper-post');
        svg.appendChild(leftDiagonal);

        // Right diagonal: straight line from upper-right DOWN and LEFT to middle-left
        const rightDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        rightDiagonal.setAttribute('x1', rightX);
        rightDiagonal.setAttribute('y1', coords.upperLine);
        rightDiagonal.setAttribute('x2', leftX);
        rightDiagonal.setAttribute('y2', coords.middleLine);
        rightDiagonal.setAttribute('stroke', '#374151');
        rightDiagonal.setAttribute('stroke-width', '3');
        rightDiagonal.classList.add('plexus-connection');
        rightDiagonal.setAttribute('data-nerve', 'median');
        rightDiagonal.setAttribute('data-segment', 'div-middle-ant');
        svg.appendChild(rightDiagonal);

        // Bottom diagonal: from bottom line (C8-T1) UP and RIGHT to middle line
        const bottomDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        bottomDiagonal.setAttribute('x1', leftX);
        bottomDiagonal.setAttribute('y1', coords.lowerLine);
        bottomDiagonal.setAttribute('x2', rightX);
        bottomDiagonal.setAttribute('y2', coords.middleLine);
        bottomDiagonal.setAttribute('stroke', '#374151');
        bottomDiagonal.setAttribute('stroke-width', '3');
        bottomDiagonal.classList.add('plexus-connection');
        bottomDiagonal.setAttribute('data-nerve', 'radial');
        bottomDiagonal.setAttribute('data-segment', 'div-lower-post');
        svg.appendChild(bottomDiagonal);

        // 9. Draw two median nerve convergence diagonals
        // Upper diagonal: from upper line (C6 pathway) down to median nerve
        const medianUpperDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        medianUpperDiagonal.setAttribute('x1', coords.terminalStart - 30);
        medianUpperDiagonal.setAttribute('y1', coords.upperLine);
        medianUpperDiagonal.setAttribute('x2', coords.terminalStart);
        medianUpperDiagonal.setAttribute('y2', coords.middleLine);
        medianUpperDiagonal.setAttribute('stroke', '#374151');
        medianUpperDiagonal.setAttribute('stroke-width', '3');
        medianUpperDiagonal.classList.add('plexus-connection');
        medianUpperDiagonal.setAttribute('data-nerve', 'median');
        medianUpperDiagonal.setAttribute('data-segment', 'median-lateral-root');
        svg.appendChild(medianUpperDiagonal);

        // Lower diagonal: from lower line (C8-T1 pathway) up to median nerve
        const medianLowerDiagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        medianLowerDiagonal.setAttribute('x1', medianConvergencePoint);
        medianLowerDiagonal.setAttribute('y1', coords.lowerLine);
        medianLowerDiagonal.setAttribute('x2', coords.terminalStart);
        medianLowerDiagonal.setAttribute('y2', coords.middleLine);
        medianLowerDiagonal.setAttribute('stroke', '#374151');
        medianLowerDiagonal.setAttribute('stroke-width', '3');
        medianLowerDiagonal.classList.add('plexus-connection');
        medianLowerDiagonal.setAttribute('data-nerve', 'median');
        medianLowerDiagonal.setAttribute('data-segment', 'median-medial-root');
        svg.appendChild(medianLowerDiagonal);

        // Median Nerve Extension (to label)
        const medianExtension = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        medianExtension.setAttribute('x1', coords.terminalStart);
        medianExtension.setAttribute('y1', coords.middleLine);
        medianExtension.setAttribute('x2', '630'); // Connects to the label box
        medianExtension.setAttribute('y2', coords.middleLine);
        medianExtension.setAttribute('stroke', '#374151');
        medianExtension.setAttribute('stroke-width', '3');
        medianExtension.classList.add('plexus-connection');
        medianExtension.setAttribute('data-nerve', 'median');
        medianExtension.setAttribute('data-segment', 'nerve-median');
        svg.appendChild(medianExtension);

        // 10. Draw Axillary horizontal connection
        const axillaryHorizontalConnection = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        axillaryHorizontalConnection.setAttribute('x1', '380');
        axillaryHorizontalConnection.setAttribute('y1', coords.middleLine);
        axillaryHorizontalConnection.setAttribute('x2', c7BranchPoint);
        axillaryHorizontalConnection.setAttribute('y2', coords.middleLine);
        axillaryHorizontalConnection.setAttribute('stroke', '#374151');
        axillaryHorizontalConnection.setAttribute('stroke-width', '3');
        axillaryHorizontalConnection.classList.add('plexus-connection');
        axillaryHorizontalConnection.setAttribute('data-nerve', 'axillary,radial');
        axillaryHorizontalConnection.setAttribute('data-segment', 'cord-posterior');
        svg.appendChild(axillaryHorizontalConnection);

        // 11. Draw Axillary branch
        const axillaryBranch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        axillaryBranch.setAttribute('x1', c7BranchPoint);
        axillaryBranch.setAttribute('y1', coords.middleLine);
        axillaryBranch.setAttribute('x2', c7BranchPoint + 30);
        axillaryBranch.setAttribute('y2', coords.middleLine - 40);
        axillaryBranch.setAttribute('stroke', '#374151');
        axillaryBranch.setAttribute('stroke-width', '3');
        axillaryBranch.classList.add('plexus-connection');
        axillaryBranch.setAttribute('data-nerve', 'axillary');
        axillaryBranch.setAttribute('data-segment', 'nerve-axillary');
        svg.appendChild(axillaryBranch);

        // 12. Draw Radial branch
        const radialBranch = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        radialBranch.setAttribute('x1', c7BranchPoint);
        radialBranch.setAttribute('y1', coords.middleLine);
        radialBranch.setAttribute('x2', '500');
        radialBranch.setAttribute('y2', '320');
        radialBranch.setAttribute('stroke', '#374151');
        radialBranch.setAttribute('stroke-width', '3');
        radialBranch.classList.add('plexus-connection');
        radialBranch.setAttribute('data-nerve', 'radial');
        radialBranch.setAttribute('data-segment', 'nerve-radial');
        svg.appendChild(radialBranch);

        // 13. Draw Terminal Nerves
        brachialPlexusData.nerves.forEach(nerve => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', 'plexus-element');
            group.setAttribute('data-id', nerve.id);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', nerve.x);
            rect.setAttribute('y', nerve.y - 15);
            rect.setAttribute('width', '120');
            rect.setAttribute('height', '30');
            rect.setAttribute('rx', '5');
            rect.setAttribute('fill', '#eff6ff');
            rect.setAttribute('stroke', '#3b82f6');
            rect.setAttribute('stroke-width', '2');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', nerve.x + 60);
            text.setAttribute('y', nerve.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12px');
            text.setAttribute('font-weight', '600');
            text.setAttribute('fill', '#1e40af');
            text.textContent = nerve.label;

            group.appendChild(rect);
            group.appendChild(text);
            svg.appendChild(group);
        });
    },

    traceNerve: function (nerveId) {
        this.currentNerve = brachialPlexusData.nerves.find(n => n.id === nerveId);
        this.updateNerveInfo(this.currentNerve);

        // Reset all
        document.querySelectorAll('#brachial-container .plexus-connection').forEach(line => {
            line.style.opacity = '0.1';
            line.style.strokeWidth = '3';
            line.style.filter = 'none';
        });
        document.querySelectorAll('#brachial-container .plexus-element').forEach(el => {
            el.style.opacity = '0.3';
            el.style.filter = 'none';
        });

        // Highlight selected nerve
        const nerveEl = document.querySelector(`#brachial-container [data-id="${nerveId}"]`);
        if (nerveEl) {
            nerveEl.style.opacity = '1';
            nerveEl.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
        }

        // Highlight roots
        this.currentNerve.roots.forEach(rootId => {
            const rootEl = document.querySelector(`#brachial-container [data-id="${rootId}"]`);
            if (rootEl) {
                rootEl.style.opacity = '1';
                rootEl.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
            }
        });

        // Highlight pathways
        const nerve = this.currentNerve;

        // Helper to highlight by data-nerve attribute
        const highlightPath = (nerveName) => {
            document.querySelectorAll('#brachial-container .plexus-connection').forEach(line => {
                const nerves = line.getAttribute('data-nerve').split(',');
                if (nerves.includes(nerveName)) {
                    line.style.opacity = '1';
                    line.style.stroke = '#3b82f6';
                    line.style.strokeWidth = '4';
                    line.style.filter = 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))';
                }
            });
        };

        // If tracing median, we need complex logic for multiple roots/pathways
        // Or simpler: The SVG data-nerve attributes already list "median" on shared segments
        // So we can just checking includes() works!
        highlightPath(nerve.id);
    },

    updateNerveInfo: function (nerve) {
        const infoPanel = document.getElementById('nerve-info');
        if (infoPanel) {
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
    },

    clearTracing: function () {
        this.currentNerve = null;

        // Clear connections
        document.querySelectorAll('#brachial-container .plexus-connection').forEach(line => {
            line.style.opacity = '1';
            line.style.strokeWidth = '3';
            line.style.filter = 'none';
            line.classList.remove('injury-active');
            line.style.stroke = '#374151'; // Reset color
        });

        // Clear elements
        document.querySelectorAll('#brachial-container .plexus-element').forEach(el => {
            el.style.opacity = '1';
            el.style.filter = 'none';
            el.classList.remove('injury-active');
        });

        // Remove injury markers
        document.querySelectorAll('#brachial-container .injury-marker').forEach(el => el.remove());

        const nerveInfo = document.getElementById('nerve-info');
        if (nerveInfo) {
            nerveInfo.innerHTML = `
                <p style="margin: 0; color: #64748b;">Select a nerve to view its pathway, roots, and function.</p>
            `;
        }
    },

    showInjury: function (injuryType) {
        const injury = brachialInjuryPatterns[injuryType];
        const detailsDiv = document.getElementById('injury-details');

        document.querySelectorAll('#brachial-container .injury-card').forEach(card => card.classList.remove('active'));
        const activeCard = document.querySelector(`#brachial-container .injury-card[onclick*="${injuryType}"]`);
        if (activeCard) activeCard.classList.add('active');

        if (detailsDiv) {
            detailsDiv.innerHTML = `
                <div style="background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin-top: 20px;">
                    <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 1.4em;">${injury.title}</h3>
                    <p style="color: #64748b; margin-bottom: 20px; font-size: 1.0em; line-height: 1.6;">${injury.description}</p>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 10px;">
                        <div class="clinical-pattern">
                            <h4 style="color: #d97706; margin-bottom: 10px;">🎯 Clinical Pattern</h4>
                            <div style="margin-bottom: 8px;"><strong>Mechanism:</strong> ${injury.mechanism}</div>
                            ${injury.clinicalPattern.weakness ? `<div style="margin-bottom: 8px;"><strong>Weakness:</strong> ${injury.clinicalPattern.weakness}</div>` : ''}
                            ${injury.clinicalPattern.sensory ? `<div style="margin-bottom: 8px;"><strong>Sensory Loss:</strong> ${injury.clinicalPattern.sensory}</div>` : ''}
                        </div>

                        <div class="emg-section">
                            <h4 style="color: #059669; margin-bottom: 10px;">📈 EMG Findings</h4>
                            ${injury.emgFindings.snaps ? `<div style="margin-bottom: 8px;"><strong>SNAPs:</strong> ${injury.emgFindings.snaps}</div>` : ''}
                            ${injury.emgFindings.needleEMG ? `<div><strong>Needle EMG:</strong> ${injury.emgFindings.needleEMG}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        this.highlightInjuryPattern(injury);
    },

    highlightInjuryPattern: function (injury) {
        this.clearTracing();

        // 1. Draw Injury Marker
        if (injury.location) {
            this.drawInjuryMarker(injury.location.x, injury.location.y);
        }

        // 2. Highlight Downstream Pathways
        if (injury.affectedSegments) {
            injury.affectedSegments.forEach(segmentId => {
                document.querySelectorAll(`#brachial-container [data-segment="${segmentId}"]`).forEach(el => {
                    el.classList.add('injury-active');
                    el.style.opacity = '1';
                    el.style.stroke = '#ef4444'; // Red for injury
                    el.style.strokeWidth = '4';
                });
            });
        }
    },

    drawInjuryMarker: function (x, y) {
        const svg = document.getElementById('plexus-svg');
        if (!svg) return;

        const size = 15;
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'injury-marker');

        // Line 1 of X
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', x - size);
        line1.setAttribute('y1', y - size);
        line1.setAttribute('x2', x + size);
        line1.setAttribute('y2', y + size);
        line1.setAttribute('stroke', '#dc2626');
        line1.setAttribute('stroke-width', '4');
        line1.setAttribute('stroke-linecap', 'round');

        // Line 2 of X
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', x + size);
        line2.setAttribute('y1', y - size);
        line2.setAttribute('x2', x - size);
        line2.setAttribute('y2', y + size);
        line2.setAttribute('stroke', '#dc2626');
        line2.setAttribute('stroke-width', '4');
        line2.setAttribute('stroke-linecap', 'round');

        // Glow effect
        group.style.filter = 'drop-shadow(0 0 4px rgba(220, 38, 38, 0.8))';

        group.appendChild(line1);
        group.appendChild(line2);
        svg.appendChild(group);
    }
};

// ==========================================
// 2. LUMBOSACRAL PLEXUS DATA & LOGIC
// ==========================================

const lumbosacralPlexusData = {
    roots: [
        { id: 'L1', x: 50, y: 60, label: 'L1', description: 'First lumbar nerve root' },
        { id: 'L2', x: 50, y: 120, label: 'L2', description: 'Second lumbar nerve root' },
        { id: 'L3', x: 50, y: 180, label: 'L3', description: 'Third lumbar nerve root' },
        { id: 'L4', x: 50, y: 240, label: 'L4', description: 'Fourth lumbar nerve root' },
        { id: 'L5', x: 50, y: 300, label: 'L5', description: 'Fifth lumbar nerve root' },
        { id: 'S1', x: 50, y: 360, label: 'S1', description: 'First sacral nerve root' },
        { id: 'S2', x: 50, y: 420, label: 'S2', description: 'Second sacral nerve root' },
        { id: 'S3', x: 50, y: 480, label: 'S3', description: 'Third sacral nerve root' },
        { id: 'S4', x: 50, y: 540, label: 'S4', description: 'Fourth sacral nerve root' }
    ],
    nerves: [
        // Lumbar Plexus (Top)
        {
            id: 'lfc',
            x: 250, y: 80,
            label: 'Lat. Fem. Cutaneous',
            description: 'L2-L3 • Sensory only',
            roots: ['L2', 'L3'],
            muscles: ['None'],
            sensory: 'Lateral thigh (Meralgia Paresthetica)'
        },
        {
            id: 'femoral',
            x: 250, y: 140,
            label: 'Femoral',
            description: 'L2-L4 • Hip Flexion, Knee Extension',
            roots: ['L2', 'L3', 'L4'],
            muscles: ['Iliopsoas', 'Quadriceps', 'Sartorius'],
            sensory: 'Anterior thigh, medial leg (Saphenous)'
        },
        {
            id: 'obturator',
            x: 250, y: 200,
            label: 'Obturator',
            description: 'L2-L4 • Hip Adduction',
            roots: ['L2', 'L3', 'L4'],
            muscles: ['Adductors (Longus, Brevis, Magnus)', 'Gracilis'],
            sensory: 'Medial thigh'
        },

        // Sacral Plexus (Bottom)
        {
            id: 'gluteal_sup',
            x: 250, y: 280,
            label: 'Sup. Gluteal',
            description: 'L4-S1 • Hip Abduction',
            roots: ['L4', 'L5', 'S1'],
            muscles: ['Gluteus Medius', 'Gluteus Minimus', 'TFL'],
            sensory: 'None'
        },
        {
            id: 'gluteal_inf',
            x: 250, y: 340,
            label: 'Inf. Gluteal',
            description: 'L5-S2 • Hip Extension',
            roots: ['L5', 'S1', 'S2'],
            muscles: ['Gluteus Maximus'],
            sensory: 'None'
        },
        {
            id: 'sciatic',
            x: 250, y: 400,
            label: 'Sciatic',
            description: 'L4-S3 • Hamstrings, All leg/foot muscles',
            roots: ['L4', 'L5', 'S1', 'S2', 'S3'],
            muscles: ['Hamstrings', 'All leg/foot muscles'],
            sensory: 'Posterior thigh, entire leg/foot (except medial)'
        },
        {
            id: 'common_fibular',
            x: 420, y: 350,
            label: 'Common Fibular',
            description: 'L4-S2 • Anterior leg muscles • Dorsum of foot sensation',
            roots: ['L4', 'L5', 'S1', 'S2'],
            muscles: ['Tibialis Anterior', 'Peronei', 'EHL', 'EDL'],
            sensory: 'Lateral leg, dorsum of foot'
        },
        {
            id: 'tibial',
            x: 420, y: 450,
            label: 'Tibial',
            description: 'L4-S3 • Plantarflexion, Inversion',
            roots: ['L4', 'L5', 'S1', 'S2', 'S3'],
            muscles: ['Gastrocnemius', 'Soleus', 'Tibialis Posterior', 'Flexors'],
            sensory: 'Posterior leg, sole of foot'
        },
        {
            id: 'sural',
            x: 580, y: 400,
            label: 'Sural',
            description: 'S1-S2 • Sensory Only • Formed by union of branches from Tibial and Common Fibular nerves',
            roots: ['S1', 'S2'],
            muscles: ['None'],
            sensory: 'Lateral foot, posterolateral leg'
        }
    ]
};

const lumbosacralInjuryPatterns = {
    diabetic_amyotrophy: {
        title: "Diabetic Amyotrophy",
        affected: ['femoral', 'obturator'],
        location: { x: 225, y: 170 },
        affectedSegments: ['root-l2', 'root-l3', 'root-l4', 'nerve-femoral', 'nerve-obturator'],
        description: "Lumbosacral Radiculoplexus Neuropathy (LRPN)",
        mechanism: "Microvasculitis / Ischemia (Diabetes)",
        clinicalPattern: {
            weakness: "Asymmetric proximal weakness (Quadriceps, Adductors, Iliopsoas)",
            sensory: "Anterior thigh pain/numbness",
            reflexes: "Patellar reflex reduced/absent",
            muscles: "Quadriceps, Adductors, Iliopsoas (Gluteals spared initially)"
        },
        emgFindings: {
            snaps: "Saphenous SNAP reduced/absent",
            motorStudies: "Femoral CMAP reduced",
            needleEMG: "Denervation in L2-L4 muscles (Quads, Adductors). Paraspinals often involved."
        }
    },
    retroperitoneal_hematoma: {
        title: "Retroperitoneal Hematoma",
        affected: ['femoral', 'obturator', 'lfc'],
        location: { x: 225, y: 140 },
        affectedSegments: ['nerve-femoral', 'nerve-obturator', 'nerve-lfc'],
        description: "Compression of Lumbar Plexus",
        mechanism: "Anticoagulation, Trauma, Psoas muscle bleed",
        clinicalPattern: {
            weakness: "Hip flexion, Knee extension, Hip adduction",
            sensory: "Anterior/Lateral thigh, Medial leg",
            reflexes: "Patellar reflex absent",
            muscles: "Iliopsoas, Quadriceps, Adductors"
        },
        emgFindings: {
            snaps: "Saphenous & LFC SNAPs abnormal",
            motorStudies: "Femoral CMAP reduced",
            needleEMG: "Denervation in Lumbar Plexus distribution. Paraspinals SPARED."
        }
    },
    lumbosacral_trunk: {
        title: "Lumbosacral Trunk Lesion",
        affected: ['sciatic', 'common_fibular'],
        location: { x: 225, y: 300 },
        affectedSegments: ['root-l4', 'root-l5', 'nerve-sciatic', 'nerve-common-fibular', 'nerve-gluteal-sup'],
        description: "Compression of L4-L5 Trunk",
        mechanism: "Fetal head compression (Labor), Pelvic trauma",
        clinicalPattern: {
            weakness: "Foot drop (L5), Gluteus Medius (L5)",
            sensory: "Dorsum of foot (L5)",
            reflexes: "Normal (Achilles is S1)",
            muscles: "Tibialis Anterior, Peronei, Gluteus Medius"
        },
        emgFindings: {
            snaps: "Superficial Fibular SNAP abnormal (Post-ganglionic)",
            motorStudies: "Fibular CMAP reduced",
            needleEMG: "Denervation in L5 muscles. Paraspinals SPARED."
        }
    },
    sacral_plexopathy: {
        title: "Sacral Plexopathy",
        affected: ['sciatic', 'gluteal_sup', 'gluteal_inf', 'tibial', 'common_fibular'],
        location: { x: 225, y: 400 },
        affectedSegments: ['root-l5', 'root-s1', 'root-s2', 'nerve-sciatic', 'nerve-gluteal-sup', 'nerve-gluteal-inf', 'nerve-tibial', 'nerve-common-fibular'],
        description: "Lesion of Sacral Plexus (L5-S3)",
        mechanism: "Pelvic malignancy, Trauma, Radiotherapy",
        clinicalPattern: {
            weakness: "Hip extension, Knee flexion, All ankle/foot movements",
            sensory: "Posterior thigh, Entire leg/foot",
            reflexes: "Achilles reflex absent",
            muscles: "Gluteals, Hamstrings, All leg/foot muscles"
        },
        emgFindings: {
            snaps: "Sural & Superficial Fibular SNAPs abnormal",
            motorStudies: "Tibial & Fibular CMAPs reduced",
            needleEMG: "Denervation in L5-S2 muscles. Paraspinals SPARED."
        }
    }
};

export const LumbosacralPlexusInteractive = {
    currentNerve: null,
    currentInjury: null,

    init: function () {
        setTimeout(() => {
            this.showTab('anatomy');
        }, 100);
    },

    showTab: function (tabId) {
        document.querySelectorAll('#lumbosacral-container .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#lumbosacral-container .tab-content').forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });

        const tabBtn = document.querySelector(`#lumbosacral-container .tab[onclick*="${tabId}"]`);
        if (tabBtn) tabBtn.classList.add('active');

        const content = document.getElementById(`ls-${tabId}-tab`);
        if (content) {
            content.classList.add('active');
            content.style.display = 'block';
        }

        if (tabId === 'anatomy') {
            this.drawPlexus();
        }
    },

    drawPlexus: function () {
        const svg = document.getElementById('lumbosacral-svg');
        if (!svg) return;

        svg.innerHTML = ''; // Clear existing

        // Define coordinates
        const coords = {
            rootsX: 80,
            nerveStartX: 550,
            lumbarCrossX: 250,
            sacralCrossX: 250
        };

        // 1. Draw Roots (Boxes)
        lumbosacralPlexusData.roots.forEach(root => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', 'plexus-element plexus-root');
            group.setAttribute('data-id', root.id);
            group.setAttribute('data-segment', `root-${root.id.toLowerCase()}`);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', root.x);
            rect.setAttribute('y', root.y);
            rect.setAttribute('width', '50');
            rect.setAttribute('height', '30');
            rect.setAttribute('rx', '5');
            rect.setAttribute('fill', '#eff6ff');
            rect.setAttribute('stroke', '#000000');
            rect.setAttribute('stroke-width', '2');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', root.x + 25);
            text.setAttribute('y', root.y + 20);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('class', 'root-label');
            text.setAttribute('fill', '#1e40af');
            text.setAttribute('font-weight', 'bold');
            text.setAttribute('font-size', '14px');
            text.textContent = root.label;

            group.appendChild(rect);
            group.appendChild(text);
            svg.appendChild(group);
        });

        // Helper to draw curved connection
        const drawConnection = (rootId, nerveId, nerveX, nerveY, segmentId) => {
            const root = lumbosacralPlexusData.roots.find(r => r.id === rootId);
            if (!root) return;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            const startX = root.x + 50;
            const startY = root.y + 15;
            const endX = nerveX;
            const endY = nerveY + 15; // Connect to middle of nerve box

            // Bezier control points for smooth "S" curve
            const cp1X = startX + (endX - startX) * 0.5;
            const cp1Y = startY;
            const cp2X = endX - (endX - startX) * 0.5;
            const cp2Y = endY;

            const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

            path.setAttribute('d', d);
            path.setAttribute('stroke', '#94a3b8'); // Slate-400
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
            path.classList.add('plexus-connection');
            path.setAttribute('data-nerve', nerveId);
            path.setAttribute('data-segment', segmentId || '');
            svg.insertBefore(path, svg.firstChild); // Draw lines BEHIND boxes
        };

        // Lumbar Plexus Connections
        ['L2', 'L3', 'L4'].forEach(rootId => {
            drawConnection(rootId, 'femoral', 250, 140, 'nerve-femoral');
            drawConnection(rootId, 'obturator', 250, 200, 'nerve-obturator');
        });

        ['L2', 'L3'].forEach(rootId => {
            drawConnection(rootId, 'lfc', 250, 80, 'nerve-lfc');
        });

        // Sacral Plexus Connections
        ['L4', 'L5', 'S1', 'S2', 'S3'].forEach(rootId => {
            const root = lumbosacralPlexusData.roots.find(r => r.id === rootId);
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            const startX = root.x + 50;
            const startY = root.y + 15;
            const endX = 250;
            const endY = 400 + 15;

            const cp1X = startX + 100;
            const cp1Y = startY;
            const cp2X = endX - 100;
            const cp2Y = endY;

            const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

            path.setAttribute('d', d);
            path.setAttribute('stroke', '#94a3b8');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
            path.classList.add('plexus-connection');
            path.setAttribute('data-nerve', 'sciatic,tibial,common_fibular,sural');
            path.setAttribute('data-segment', 'nerve-sciatic');
            svg.insertBefore(path, svg.firstChild);
        });

        // Sciatic Branches
        const sciaticX = 250 + 140; // 390
        const sciaticY = 400 + 15;

        // To Common Fibular
        const cfPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        cfPath.setAttribute('d', `M ${sciaticX} ${sciaticY} C ${sciaticX + 50} ${sciaticY}, ${420 - 50} 350, 420 350`);
        cfPath.setAttribute('stroke', '#94a3b8');
        cfPath.setAttribute('stroke-width', '2');
        cfPath.setAttribute('fill', 'none');
        cfPath.classList.add('plexus-connection');
        cfPath.setAttribute('data-nerve', 'common_fibular,sural');
        cfPath.setAttribute('data-segment', 'nerve-common-fibular');
        svg.insertBefore(cfPath, svg.firstChild);

        // To Tibial
        const tibPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tibPath.setAttribute('d', `M ${sciaticX} ${sciaticY} C ${sciaticX + 50} ${sciaticY}, ${420 - 50} 450, 420 450`);
        tibPath.setAttribute('stroke', '#94a3b8');
        tibPath.setAttribute('stroke-width', '2');
        tibPath.setAttribute('fill', 'none');
        tibPath.classList.add('plexus-connection');
        tibPath.setAttribute('data-nerve', 'tibial,sural');
        tibPath.setAttribute('data-segment', 'nerve-tibial');
        svg.insertBefore(tibPath, svg.firstChild);

        ['L4', 'L5', 'S1'].forEach(rootId => drawConnection(rootId, 'gluteal_sup', 250, 280, 'nerve-gluteal-sup'));
        ['L5', 'S1', 'S2'].forEach(rootId => drawConnection(rootId, 'gluteal_inf', 250, 340, 'nerve-gluteal-inf'));

        // Sural Nerve Origin (Medial Sural from Tibial, Communicating from Common Fibular)
        const suralX = 580;
        const suralY = 400;
        const tibRightX = 420 + 140; // 560
        const tibRightY = 450 + 15;
        const cfRightX = 420 + 140; // 560
        const cfRightY = 350 + 15;

        // Path from Tibial to Sural
        const suralTibPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        suralTibPath.setAttribute('d', `M ${tibRightX} ${tibRightY} C ${tibRightX + 10} ${tibRightY}, ${suralX - 10} ${suralY + 15}, ${suralX} ${suralY + 15}`);
        suralTibPath.setAttribute('stroke', '#94a3b8');
        suralTibPath.setAttribute('stroke-width', '2');
        suralTibPath.setAttribute('fill', 'none');
        suralTibPath.classList.add('plexus-connection');
        suralTibPath.setAttribute('data-id', 'sural-tibial-connection');
        suralTibPath.setAttribute('data-nerve', 'sural');
        suralTibPath.setAttribute('data-segment', 'nerve-sural');
        svg.insertBefore(suralTibPath, svg.firstChild);

        // Path from Common Fibular to Sural
        const suralCfPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        suralCfPath.setAttribute('d', `M ${cfRightX} ${cfRightY} C ${cfRightX + 10} ${cfRightY}, ${suralX - 10} ${suralY + 15}, ${suralX} ${suralY + 15}`);
        suralCfPath.setAttribute('stroke', '#94a3b8');
        suralCfPath.setAttribute('stroke-width', '2');
        suralCfPath.setAttribute('fill', 'none');
        suralCfPath.classList.add('plexus-connection');
        suralCfPath.setAttribute('data-id', 'sural-cf-connection');
        suralCfPath.setAttribute('data-nerve', 'sural');
        suralCfPath.setAttribute('data-segment', 'nerve-sural');
        svg.insertBefore(suralCfPath, svg.firstChild);


        // 3. Draw Nerves (Buttons/Labels)
        lumbosacralPlexusData.nerves.forEach(nerve => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', 'plexus-element');
            group.setAttribute('data-id', nerve.id);
            group.setAttribute('data-segment', 'nerve-' + nerve.id);
            group.style.cursor = 'pointer';
            group.onclick = () => this.traceNerve(nerve.id);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', nerve.x);
            rect.setAttribute('y', nerve.y - 15);
            rect.setAttribute('width', '140');
            rect.setAttribute('height', '30');
            rect.setAttribute('rx', '5');
            rect.setAttribute('fill', '#eff6ff');
            rect.setAttribute('stroke', '#3b82f6');
            rect.setAttribute('stroke-width', '2');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', nerve.x + 60);
            text.setAttribute('y', nerve.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12px');
            text.setAttribute('font-weight', '600');
            text.setAttribute('fill', '#1e40af');
            text.textContent = nerve.label;

            group.appendChild(rect);
            group.appendChild(text);
            svg.appendChild(group);
        });
    },

    traceNerve: function (nerveId) {
        this.currentNerve = lumbosacralPlexusData.nerves.find(n => n.id === nerveId);
        this.updateNerveInfo(this.currentNerve);

        // Reset all opacity
        document.querySelectorAll('#lumbosacral-container .plexus-connection').forEach(line => {
            line.style.opacity = '0.1';
            line.style.stroke = '#94a3b8';
            line.style.strokeWidth = '3';
        });
        document.querySelectorAll('#lumbosacral-container .plexus-element').forEach(el => {
            el.style.opacity = '0.3';
        });
        document.querySelectorAll('#lumbosacral-container .plexus-root').forEach(el => {
            el.style.opacity = '0.3';
        });

        // Highlight selected nerve box
        const nerveEl = document.querySelector(`#lumbosacral-container [data-id="${nerveId}"]`);
        if (nerveEl) {
            nerveEl.style.opacity = '1';
            nerveEl.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
        }

        // Highlight roots
        this.currentNerve.roots.forEach(rootId => {
            const rootEl = document.querySelector(`#lumbosacral-container [data-id="${rootId}"]`);
            if (rootEl) {
                rootEl.style.opacity = '1';
                rootEl.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
            }
        });

        // Highlight pathways
        // We look for any connection that includes the nerveId in its data-nerve attribute
        document.querySelectorAll('#lumbosacral-container .plexus-connection').forEach(line => {
            const nerves = line.getAttribute('data-nerve').split(',');
            if (nerves.includes(nerveId)) {
                line.style.opacity = '1';
                line.style.stroke = '#3b82f6';
                line.style.strokeWidth = '4';
            }
        });
    },

    updateNerveInfo: function (nerve) {
        const infoPanel = document.getElementById('ls-nerve-info');
        if (infoPanel) {
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
    },

    clearTracing: function () {
        this.currentNerve = null;

        document.querySelectorAll('#lumbosacral-container .plexus-connection').forEach(line => {
            line.style.opacity = '1';
            line.style.stroke = '#94a3b8';
            line.style.strokeWidth = '3';
            line.classList.remove('injury-active');
        });

        document.querySelectorAll('#lumbosacral-container .plexus-element').forEach(el => {
            el.style.opacity = '1';
            el.classList.remove('injury-active');
        });
        document.querySelectorAll('#lumbosacral-container .plexus-root').forEach(el => {
            el.style.opacity = '1';
        });

        document.querySelectorAll('#lumbosacral-container .injury-marker').forEach(el => el.remove());

        const infoPanel = document.getElementById('ls-nerve-info');
        if (infoPanel) {
            infoPanel.innerHTML = `<p style="margin: 0; color: #64748b;">Select a nerve to trace its pathway.</p>`;
        }

        const detailsDiv = document.getElementById('ls-injury-details');
        if (detailsDiv) detailsDiv.innerHTML = '';
    },

    showInjury: function (injuryType) {
        const injury = lumbosacralInjuryPatterns[injuryType];
        const detailsDiv = document.getElementById('ls-injury-details');

        // Highlight active card
        document.querySelectorAll(`#lumbosacral-container .injury-card`).forEach(c => c.style.borderColor = '#e2e8f0');
        const activeCard = document.querySelector(`#lumbosacral-container .injury-card[onclick*="${injuryType}"]`);
        if (activeCard) activeCard.style.borderColor = '#ef4444';

        if (detailsDiv) {
            detailsDiv.innerHTML = `
                <div style="background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                    <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 1.4em;">${injury.title}</h3>
                    <p style="color: #64748b; margin-bottom: 20px; font-size: 1.0em; line-height: 1.6;">${injury.description}</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div>
                            <h4 style="color: #d97706; margin-bottom: 10px;">🎯 Clinical Pattern</h4>
                            <div style="margin-bottom: 8px;"><strong>Mechanism:</strong> ${injury.mechanism}</div>
                            <div style="margin-bottom: 8px;"><strong>Weakness:</strong> ${injury.clinicalPattern.weakness}</div>
                            <div style="margin-bottom: 8px;"><strong>Sensory:</strong> ${injury.clinicalPattern.sensory}</div>
                        </div>
                        <div>
                            <h4 style="color: #059669; margin-bottom: 10px;">📈 EMG Findings</h4>
                            ${injury.emgFindings.snaps ? `<div><strong>SNAPs:</strong> ${injury.emgFindings.snaps}</div>` : ''}
                            ${injury.emgFindings.needleEMG ? `<div><strong>Needle:</strong> ${injury.emgFindings.needleEMG}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        this.highlightInjuryPattern(injury);
    },

    highlightInjuryPattern: function (injury) {
        this.clearTracing();

        // 1. Draw Marker
        if (injury.location) {
            this.drawInjuryMarker(injury.location.x, injury.location.y);
        }

        // 2. Highlight Segments
        if (injury.affectedSegments) {
            injury.affectedSegments.forEach(segmentId => {
                document.querySelectorAll(`#lumbosacral-container [data-segment="${segmentId}"]`).forEach(el => {
                    el.classList.add('injury-active');
                    el.style.opacity = '1';
                    el.style.stroke = '#ef4444';
                    el.style.strokeWidth = '4';
                });
            });
        }
    },

    drawInjuryMarker: function (x, y) {
        const svg = document.getElementById('lumbosacral-svg');
        if (!svg) return;

        const size = 15;
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'injury-marker');

        // Line 1 of X
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', x - size);
        line1.setAttribute('y1', y - size);
        line1.setAttribute('x2', x + size);
        line1.setAttribute('y2', y + size);
        line1.setAttribute('stroke', '#dc2626');
        line1.setAttribute('stroke-width', '4');
        line1.setAttribute('stroke-linecap', 'round');

        // Line 2 of X
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', x + size);
        line2.setAttribute('y1', y - size);
        line2.setAttribute('x2', x - size);
        line2.setAttribute('y2', y + size);
        line2.setAttribute('stroke', '#dc2626');
        line2.setAttribute('stroke-width', '4');
        line2.setAttribute('stroke-linecap', 'round');

        // Glow effect
        group.style.filter = 'drop-shadow(0 0 4px rgba(220, 38, 38, 0.8))';

        group.appendChild(line1);
        group.appendChild(line2);
        svg.appendChild(group);
    }

};

// ==========================================
// 3. MAIN EXPORT & INITIALIZATION
// ==========================================

// ==========================================
// 3. MAIN EXPORT & INITIALIZATION
// ==========================================

// Define the module wrapper
export const BrachialPlexus = {
    showExplain(initialModule = 'brachial') {
        console.log(`🧠 Launching Combined Plexus Module: ${initialModule}`);

        // Styles
        const css = `
            .interactive-content {
                font-family: 'Inter', sans-serif;
                max-width: 1400px;
                margin: 0 auto;
            }
            .plexus-selector-btn {
                transition: all 0.3s ease;
            }
            .plexus-selector-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
            }
            .tab {
                border-bottom: 2px solid transparent;
                transition: all 0.3s;
            }
            .tab.active {
                border-bottom-color: #3b82f6;
                color: #2563eb !important;
                background: #eff6ff !important;
            }
            .tab-content {
                display: none;
                animation: fadeIn 0.3s ease;
            }
            .tab-content.active {
                display: block;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .plexus-element {
                transition: all 0.3s ease;
            }
            .plexus-element:hover {
                transform: scale(1.02);
                filter: brightness(1.05);
            }
            .plexus-connection {
                transition: all 0.5s ease;
                stroke-linecap: round;
                stroke-linejoin: round;
            }
            .injury-card.active {
                border-color: #ef4444 !important;
                background: #fef2f2 !important;
                transform: scale(1.02);
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
            }
        `;

        const content = `
        <style>${css}</style>
        <div class="interactive-content">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 1.8em;">🕸️ Interactive Plexus System</h3>
                    <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                        Master the complex neural networks of the upper and lower limbs.
                    </p>
                </div>
                ${generateErnestButton('brachial-plexus-interactive', 'Plexus Master Class')}
            </div>

            <!-- Plexus Switcher -->
            <div class="plexus-selector" style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">
                <button id="btn-brachial" onclick="switchPlexusModule('brachial')" 
                    style="padding: 12px 30px; border-radius: 30px; border: 2px solid #3b82f6; background: #3b82f6; color: white; font-weight: 700; cursor: pointer; font-size: 1.1em; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                    🧬 Brachial Plexus
                </button>
                <button id="btn-lumbosacral" onclick="switchPlexusModule('lumbosacral')" 
                    style="padding: 12px 30px; border-radius: 30px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 700; cursor: pointer; font-size: 1.1em;">
                    🦵 Lumbosacral Plexus
                </button>
            </div>

            <!-- BRACHIAL CONTAINER -->
            <div id="brachial-container" style="display: block;">
                <!-- Main Layout Grid -->
                <div style="display: grid; grid-template-columns: 1fr 350px; gap: 20px; margin-bottom: 30px;">
                    
                    <!-- Left: Interactive Diagram -->
                    <div style="background: white; border-radius: 20px; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; min-height: 600px; display: flex; align-items: center; justify-content: center;">
                        <svg id="plexus-svg" viewBox="0 0 800 500" style="width: 100%; height: 100%; overflow: visible;"></svg>
                    </div>

                    <!-- Right: Controls & Info -->
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        
                        <!-- Tabs -->
                        <div style="background: #f1f5f9; padding: 5px; border-radius: 12px; display: flex;">
                            <button class="tab active" onclick="BrachialPlexus.showTab('anatomy')" style="flex: 1; padding: 10px; border: none; background: transparent; border-radius: 8px; font-weight: 600; color: #64748b; cursor: pointer;">Anatomy</button>
                            <button class="tab" onclick="BrachialPlexus.showTab('injuries')" style="flex: 1; padding: 10px; border: none; background: transparent; border-radius: 8px; font-weight: 600; color: #64748b; cursor: pointer;">Injuries</button>
                        </div>

                        <!-- Anatomy Tab Content -->
                        <div id="anatomy-tab" class="tab-content active" style="height: 100%;">
                            <div style="background: white; padding: 20px; border-radius: 15px; border: 1px solid #e5e7eb; height: 100%;">
                                <h4 style="color: #0f172a; margin-top: 0;">Select Nerve to Trace</h4>
                                <div id="nerve-buttons" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                                    <!-- Buttons injected by drawPlexus or static list -->
                                    <button onclick="BrachialPlexus.traceNerve('musculocutaneous')" class="nerve-btn" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; cursor: pointer;">Musculocutaneous</button>
                                    <button onclick="BrachialPlexus.traceNerve('axillary')" class="nerve-btn" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; cursor: pointer;">Axillary</button>
                                    <button onclick="BrachialPlexus.traceNerve('median')" class="nerve-btn" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; cursor: pointer;">Median</button>
                                    <button onclick="BrachialPlexus.traceNerve('radial')" class="nerve-btn" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; cursor: pointer;">Radial</button>
                                    <button onclick="BrachialPlexus.traceNerve('ulnar')" class="nerve-btn" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; cursor: pointer;">Ulnar</button>
                                    <button onclick="BrachialPlexus.traceNerve('suprascapular')" class="nerve-btn" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; cursor: pointer;">Suprascapular</button>
                                </div>
                                <div id="nerve-info" style="background: #f8fafc; padding: 15px; border-radius: 10px; font-size: 0.9em; border-left: 4px solid #3b82f6;">
                                    <p style="margin: 0; color: #64748b;">Select a nerve to view its pathway, roots, and function.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Injuries Tab Content -->
                        <div id="injuries-tab" class="tab-content">
                            <div style="background: white; padding: 20px; border-radius: 15px; border: 1px solid #e5e7eb; max-height: 500px; overflow-y: auto;">
                                <div class="injury-grid" style="display: grid; gap: 10px;">
                                    <div class="injury-card" onclick="BrachialPlexus.showInjury('erb')" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                                        <strong>Erb's Palsy</strong><br><span style="font-size:0.8em; color:#64748b">Upper Trunk (C5-C6)</span>
                                    </div>
                                    <div class="injury-card" onclick="BrachialPlexus.showInjury('klumpke')" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                                        <strong>Klumpke's Palsy</strong><br><span style="font-size:0.8em; color:#64748b">Lower Trunk (C8-T1)</span>
                                    </div>
                                    <div class="injury-card" onclick="BrachialPlexus.showInjury('posteriorcord')" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                                        <strong>Posterior Cord</strong><br><span style="font-size:0.8em; color:#64748b">Wrist Drop + Deltoid</span>
                                    </div>
                                    <div class="injury-card" onclick="BrachialPlexus.showInjury('panplexus')" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                                        <strong>Pan-Plexus</strong><br><span style="font-size:0.8em; color:#64748b">Flail Arm (C5-T1)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Injury Details (Dynamic) -->
                <div id="injury-details"></div>
            </div>

            <!-- LUMBOSACRAL CONTAINER -->
            <div id="lumbosacral-container" style="display: none;">
                <!-- Main Layout -->
                <div style="display: grid; grid-template-columns: 1fr 350px; gap: 20px; margin-bottom: 30px;">
                    
                    <!-- Diagram -->
                    <div class="diagram-container" style="background: #f8fafc; padding: 20px; border-radius: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); min-height: 600px; display: flex; align-items: center;">
                        <svg id="lumbosacral-svg" viewBox="0 0 800 600" style="width: 100%; height: 100%;"></svg>
                    </div>

                    <!-- Controls -->
                    <div class="controls-column" style="display: flex; flex-direction: column; gap: 20px;">
                        
                        <!-- Tabs -->
                        <div class="tab-container" style="display: flex; background: #f1f5f9; padding: 5px; border-radius: 12px;">
                            <button class="tab active" onclick="LumbosacralPlexus.showTab('anatomy')" style="flex: 1; padding: 10px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; border-radius: 8px;">
                                📊 Controls
                            </button>
                            <button class="tab" onclick="LumbosacralPlexus.showTab('injuries')" style="flex: 1; padding: 10px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; border-radius: 8px;">
                                ⚡ Injuries
                            </button>
                        </div>

                        <!-- Anatomy Tab -->
                        <div id="ls-anatomy-tab" class="tab-content active" style="display: block;">
                            <div class="control-section" style="background: white; padding: 20px; border-radius: 15px; border: 1px solid #e2e8f0;">
                                <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 1.1em;">🎯 Nerve Tracing</h3>
                                <div id="ls-nerve-buttons" class="nerve-buttons" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                                    ${lumbosacralPlexusData.nerves.map(nerve => `
                                        <button onclick="LumbosacralPlexus.traceNerve('${nerve.id}')" style="padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='white'">
                                            <span style="font-weight: 600; color: #1e40af; font-size: 0.9em;">${nerve.label}</span>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                            <div id="ls-nerve-info" style="margin-top: 20px; background: #f8fafc; padding: 15px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <p style="margin: 0; color: #64748b;">Select a nerve to trace its pathway.</p>
                            </div>
                            <div style="margin-top: 15px;">
                                <button onclick="LumbosacralPlexus.clearTracing()" style="width: 100%; padding: 8px; background: #64748b; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Clear Tracing</button>
                            </div>
                        </div>

                        <!-- Injuries Tab -->
                        <div id="ls-injuries-tab" class="tab-content" style="display: none;">
                            <div class="injury-grid" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('diabetic_amyotrophy')" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; cursor: pointer;">
                                    <div style="font-weight: 700; color: #1e40af;">Diabetic Amyotrophy</div>
                                    <div style="font-size: 0.8em; color: #64748b;">Lumbosacral Radiculoplexus</div>
                                </div>
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('retroperitoneal_hematoma')" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; cursor: pointer;">
                                    <div style="font-weight: 700; color: #1e40af;">Retroperitoneal Hematoma</div>
                                    <div style="font-size: 0.8em; color: #64748b;">Lumbar Plexus Compression</div>
                                </div>
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('lumbosacral_trunk')" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; cursor: pointer;">
                                    <div style="font-weight: 700; color: #1e40af;">Lumbosacral Trunk</div>
                                    <div style="font-size: 0.8em; color: #64748b;">L4-L5 Lesion</div>
                                </div>
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('sacral_plexopathy')" style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; cursor: pointer;">
                                    <div style="font-weight: 700; color: #1e40af;">Sacral Plexopathy</div>
                                    <div style="font-size: 0.8em; color: #64748b;">Malignancy / Trauma</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div id="ls-injury-details" style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 20px;"></div>
                
                <!-- LS Educational Content -->
                 <div class="clinical-anatomy-section" style="margin-top: 40px; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <h3 style="color: #1e40af; margin-bottom: 25px; font-size: 1.8em; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">📚 Lumbosacral Plexus: The Basics & Beyond</h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr; gap: 30px;">
                        <div>
                            <h4 style="color: #3b82f6; font-size: 1.4em; margin-bottom: 15px;">1. Two Plexuses in One</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 5px solid #3b82f6;">
                                    <strong style="color: #1e40af; display: block; margin-bottom: 10px; font-size: 1.1em;">Lumbar Plexus (The Front)</strong>
                                    <p style="color: #475569; margin-bottom: 0;">L2-L4 • Femoral (Quads) & Obturator (Adductors)</p>
                                </div>
                                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 5px solid #8b5cf6;">
                                    <strong style="color: #5b21b6; display: block; margin-bottom: 10px; font-size: 1.1em;">Sacral Plexus (The Back)</strong>
                                    <p style="color: #475569; margin-bottom: 0;">L4-S3 • Sciatic • Gluteals & Hamstrings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        if (window.showModal) {
            window.showModal('🕸️ Interactive Plexus Master Class', content);

            // Re-assert globals inside modal just in case
            window.BrachialPlexus = BrachialPlexusInteractive;
            window.LumbosacralPlexus = LumbosacralPlexusInteractive;

            window.switchPlexusModule = function (module) {
                const bBtn = document.getElementById('btn-brachial');
                const lBtn = document.getElementById('btn-lumbosacral');
                const bCon = document.getElementById('brachial-container');
                const lCon = document.getElementById('lumbosacral-container');

                if (module === 'brachial') {
                    if (bBtn) { bBtn.style.background = '#3b82f6'; bBtn.style.color = 'white'; bBtn.style.borderColor = '#3b82f6'; }
                    if (lBtn) { lBtn.style.background = 'white'; lBtn.style.color = '#64748b'; lBtn.style.borderColor = '#e2e8f0'; }
                    if (bCon) bCon.style.display = 'block';
                    if (lCon) lCon.style.display = 'none';
                    setTimeout(() => window.BrachialPlexus.init(), 50);
                } else {
                    if (lBtn) { lBtn.style.background = '#3b82f6'; lBtn.style.color = 'white'; lBtn.style.borderColor = '#3b82f6'; }
                    if (bBtn) { bBtn.style.background = 'white'; bBtn.style.color = '#64748b'; bBtn.style.borderColor = '#e2e8f0'; }
                    if (lCon) lCon.style.display = 'block';
                    if (bCon) bCon.style.display = 'none';
                    setTimeout(() => window.LumbosacralPlexus.init(), 50);
                }
            };

            // Initialize default
            setTimeout(() => {
                if (initialModule === 'lumbosacral') {
                    if (window.switchPlexusModule) window.switchPlexusModule('lumbosacral');
                } else {
                    if (window.BrachialPlexus && window.BrachialPlexus.init) window.BrachialPlexus.init();
                }
            }, 100);
        }
    }
};

window.generateBrachialPlexusExplain = BrachialPlexus.showExplain;

// CRITICAL FIX: Merge and Expose Immediately
// We merge showExplain into the interactive object so that `window.BrachialPlexus` can serve both needs:
// 1. .showExplain() called by module loader
// 2. .traceNerve() etc. called by inline HTML
Object.assign(BrachialPlexusInteractive, {
    showExplain: function () { BrachialPlexus.showExplain('brachial'); }
});
Object.assign(LumbosacralPlexusInteractive, {
    showExplain: function () { BrachialPlexus.showExplain('lumbosacral'); }
});

// Expose safely
if (typeof window !== 'undefined') {
    window.BrachialPlexus = BrachialPlexusInteractive;
    window.LumbosacralPlexus = LumbosacralPlexusInteractive;
}
