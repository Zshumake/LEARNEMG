import { registerModulePodcasts, generateErnestButton } from '../podcast-player.js';
import { generateContent as generateLumbosacral } from './lumbosacral-plexus-interactive.js';

// Anatomical Data Structure - Linear Flow Layout Design
const plexusData = {
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

const injuryPatterns = {
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

export function generateContent(module) {
    registerModulePodcasts('brachial-plexus-interactive');
    const lumbosacralHTML = generateLumbosacral(module);

    const BrachialPlexus = {
        currentNerve: null,
        currentInjury: null,
        showLabels: true,
        showVariants: false,

        init: function () {
            setTimeout(() => {
                this.drawPlexus();
                this.showTab('anatomy');
            }, 100);
        },

        showTab: function (tabId) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            const tabBtn = document.querySelector(`.tab[onclick*="${tabId}"]`);
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
            plexusData.roots.forEach(root => {
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

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', root.x + 25);
                text.setAttribute('y', root.y + 20);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('class', 'root-label');
                text.textContent = root.label;

                group.appendChild(rect);
                group.appendChild(text);
                svg.appendChild(group);
            });

            // 2. Draw C5 and C6 converging to upper horizontal line
            const c5Root = plexusData.roots.find(r => r.id === 'C5');
            const c6Root = plexusData.roots.find(r => r.id === 'C6');
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
            const c7Root = plexusData.roots.find(r => r.id === 'C7');
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
            const c8Root = plexusData.roots.find(r => r.id === 'C8');
            const t1Root = plexusData.roots.find(r => r.id === 'T1');
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
            plexusData.nerves.forEach(nerve => {
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
            this.currentNerve = plexusData.nerves.find(n => n.id === nerveId);
            this.updateNerveInfo(this.currentNerve);

            // Reset all
            document.querySelectorAll('.plexus-connection').forEach(line => {
                line.style.opacity = '0.1';
                line.style.strokeWidth = '3';
                line.style.filter = 'none';
            });
            document.querySelectorAll('.plexus-element').forEach(el => {
                el.style.opacity = '0.3';
                el.style.filter = 'none';
            });

            // Highlight selected nerve
            const nerveEl = document.querySelector(`[data-id="${nerveId}"]`);
            if (nerveEl) {
                nerveEl.style.opacity = '1';
                nerveEl.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
            }

            // Highlight roots
            this.currentNerve.roots.forEach(rootId => {
                const rootEl = document.querySelector(`[data-id="${rootId}"]`);
                if (rootEl) {
                    rootEl.style.opacity = '1';
                    rootEl.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
                }
            });

            // Highlight pathways
            const nerve = this.currentNerve;

            // Helper to highlight by data-nerve attribute
            const highlightPath = (nerveName) => {
                document.querySelectorAll('.plexus-connection').forEach(line => {
                    const nerves = line.getAttribute('data-nerve').split(',');
                    if (nerves.includes(nerveName)) {
                        line.style.opacity = '1';
                        line.style.strokeWidth = '5';
                        line.style.filter = 'drop-shadow(0 0 6px #3b82f6)';
                    }
                });
            };

            // Basic highlighting based on nerve name
            highlightPath(nerve.id);
        },

        clearTracing: function () {
            this.currentNerve = null;

            // Clear connections
            document.querySelectorAll('.plexus-connection').forEach(line => {
                line.style.opacity = '1';
                line.style.strokeWidth = '3';
                line.style.filter = 'none';
                line.classList.remove('injury-active');
                line.style.stroke = '#374151'; // Reset color
            });

            // Clear elements
            document.querySelectorAll('.plexus-element').forEach(el => {
                el.style.opacity = '1';
                el.style.filter = 'none';
                el.classList.remove('injury-active');
            });

            // Remove injury markers
            document.querySelectorAll('.injury-marker').forEach(el => el.remove());

            document.getElementById('nerve-info').innerHTML = `
                <h4 style="color: #1e40af; margin-bottom: 10px;">Select a nerve to trace its pathway</h4>
                <p style="color: #64748b;">Click on any nerve button to highlight its complete pathway from roots through trunks, divisions, and cords to the terminal nerve.</p>
            `;
        },

        updateNerveInfo: function (nerve) {
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
        },

        showInjury: function (injuryType) {
            const injury = injuryPatterns[injuryType];
            const detailsDiv = document.getElementById('injury-details');

            document.querySelectorAll('.injury-card').forEach(card => card.classList.remove('active'));
            const activeCard = document.querySelector(`.injury-card[onclick*="${injuryType}"]`);
            if (activeCard) activeCard.classList.add('active');

            detailsDiv.innerHTML = `
                <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                    <h3 style="color: #1e40af; margin-bottom: 20px; font-size: 1.8em;">${injury.title}</h3>
                    <p style="color: #64748b; margin-bottom: 25px; font-size: 1.1em; line-height: 1.6;">${injury.description}</p>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 25px;">
                        <div class="clinical-pattern">
                            <h4 style="color: #d97706; margin-bottom: 15px;">🎯 Clinical Pattern</h4>
                            <div style="margin-bottom: 12px;"><strong>Mechanism:</strong> ${injury.mechanism}</div>
                            ${injury.clinicalPattern.weakness ? `<div style="margin-bottom: 12px;"><strong>Weakness:</strong> ${injury.clinicalPattern.weakness}</div>` : ''}
                            ${injury.clinicalPattern.sensory ? `<div style="margin-bottom: 12px;"><strong>Sensory Loss:</strong> ${injury.clinicalPattern.sensory}</div>` : ''}
                        </div>

                        <div class="emg-section">
                            <h4 style="color: #059669; margin-bottom: 15px;">📈 EMG Findings</h4>
                            ${injury.emgFindings.snaps ? `<div style="margin-bottom: 12px;"><strong>SNAPs:</strong> ${injury.emgFindings.snaps}</div>` : ''}
                            ${injury.emgFindings.needleEMG ? `<div><strong>Needle EMG:</strong> ${injury.emgFindings.needleEMG}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;

            // Removed check for anatomy-tab active state - diagram is always visible now
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
                // Advanced mode: Highlight specific segments
                injury.affectedSegments.forEach(segmentId => {
                    document.querySelectorAll(`[data-segment="${segmentId}"]`).forEach(el => {
                        el.classList.add('injury-active');
                        el.style.opacity = '1';
                    });
                });
            } else if (injury.downstreamPathways && injury.location) {
                // Fallback for injuries without granular data
                const minX = injury.location.x - 20;
                injury.downstreamPathways.forEach(nerveName => {
                    document.querySelectorAll('.plexus-connection').forEach(line => {
                        const nerves = line.getAttribute('data-nerve').split(',');
                        const x1 = parseFloat(line.getAttribute('x1'));
                        const x2 = parseFloat(line.getAttribute('x2'));
                        if (nerves.includes(nerveName) && (x1 >= minX || x2 >= minX)) {
                            line.classList.add('injury-active');
                            line.style.opacity = '1';
                        }
                    });
                });
            }

            // 3. Highlight Affected Terminal Nerves
            if (injury.affectedNerves) {
                injury.affectedNerves.forEach(nerveId => {
                    const element = document.querySelector(`[data-id="${nerveId}"]`);
                    if (element) {
                        element.classList.add('injury-active');
                        element.style.opacity = '1';
                    }
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

    window.BrachialPlexus = BrachialPlexus;

    // Global function for switching plexus modules
    window.switchPlexusModule = function (plexusType) {
        const brachialContainer = document.getElementById('brachial-container');
        const lumbosacralContainer = document.getElementById('lumbosacral-container');
        const buttons = document.querySelectorAll('.plexus-selector-btn');

        buttons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.plexus-selector-btn[data-plexus="${plexusType}"]`).classList.add('active');

        if (plexusType === 'brachial') {
            brachialContainer.style.display = 'block';
            lumbosacralContainer.style.display = 'none';
        } else {
            brachialContainer.style.display = 'none';
            lumbosacralContainer.style.display = 'block';
        }
    };

    setTimeout(() => BrachialPlexus.init(), 100);

    // Define switchPlexusModule globally
    window.switchPlexusModule = function (moduleName) {
        const brachialContainer = document.getElementById('brachial-container');
        const lumbosacralContainer = document.getElementById('lumbosacral-container');
        const brachialTab = document.getElementById('tab-brachial');
        const lumbosacralTab = document.getElementById('tab-lumbosacral');

        if (moduleName === 'brachial') {
            if (brachialContainer) brachialContainer.style.display = 'block';
            if (lumbosacralContainer) lumbosacralContainer.style.display = 'none';
            if (brachialTab) {
                brachialTab.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
                brachialTab.style.color = 'white';
                brachialTab.style.border = 'none';
            }
            if (lumbosacralTab) {
                lumbosacralTab.style.background = 'white';
                lumbosacralTab.style.color = '#64748b';
                lumbosacralTab.style.border = '2px solid #e2e8f0';
            }
        } else {
            if (brachialContainer) brachialContainer.style.display = 'none';
            if (lumbosacralContainer) lumbosacralContainer.style.display = 'block';
            if (brachialTab) {
                brachialTab.style.background = 'white';
                brachialTab.style.color = '#64748b';
                brachialTab.style.border = '2px solid #e2e8f0';
            }
            if (lumbosacralTab) {
                lumbosacralTab.style.background = 'linear-gradient(135deg, #059669, #047857)';
                lumbosacralTab.style.color = 'white';
                lumbosacralTab.style.border = 'none';
            }
        }
    };

    return `
        <style>
            .plexus-connection { transition: all 0.3s; }
            .plexus-element { cursor: pointer; transition: all 0.3s; }
            .plexus-element:hover { filter: brightness(1.2); }
            .plexus-root rect { fill: #ffffff; stroke: #374151; stroke-width: 2; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
            .root-label { font-size: 14px; font-weight: 600; fill: #1e293b; }
            
            .tab.active { color: #1e40af !important; border-bottom: 3px solid #3b82f6 !important; background: white !important; }
            .tab-content.active { display: block !important; }
            .injury-card.active { border-color: #3b82f6 !important; background: #eff6ff !important; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15) !important; }
            
            .plexus-connection.injury-active {
                stroke: #dc2626 !important;
                stroke-width: 4px !important;
                filter: drop-shadow(0 0 4px rgba(220, 38, 38, 0.5)) !important;
            }

            .plexus-element.injury-active rect {
                fill: #fef2f2 !important;
                stroke: #dc2626 !important;
                stroke-width: 3px !important;
                filter: drop-shadow(0 0 6px rgba(220, 38, 38, 0.4)) !important;
            }
            
            @media (max-width: 900px) {
                .plexus-layout { grid-template-columns: 1fr !important; }
                .diagram-container { border-right: none !important; border-bottom: 2px solid #e2e8f0; min-height: 400px !important; }
                .controls-column { width: 100%; }
                .plexus-module-wrapper { padding: 5px !important; }
            }
        </style>

        <div class="plexus-module-wrapper" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
            ${generateErnestButton('brachial-plexus-interactive', 'Brachial Plexus')}
            
            <!-- Plexus Selector -->
            <div class="plexus-selector" style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px;">
                <button class="plexus-selector-btn active" data-plexus="brachial" onclick="switchPlexusModule('brachial')" 
                    style="padding: 12px 30px; border-radius: 30px; border: 2px solid #3b82f6; background: white; color: #3b82f6; font-weight: 700; cursor: pointer; transition: all 0.3s; font-size: 1.1em;">
                    🧬 Brachial Plexus
                </button>
                <button class="plexus-selector-btn" data-plexus="lumbosacral" onclick="switchPlexusModule('lumbosacral')" 
                    style="padding: 12px 30px; border-radius: 30px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 700; cursor: pointer; transition: all 0.3s; font-size: 1.1em;">
                    🦵 Lumbosacral Plexus
                </button>
            </div>

            <style>
                .plexus-selector-btn.active {
                    background: #3b82f6 !important;
                    color: white !important;
                    border-color: #3b82f6 !important;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }
                .plexus-selector-btn:hover:not(.active) {
                    background: #f8fafc !important;
                    border-color: #cbd5e1 !important;
                }
            </style>

            <div id="plexus-content-container">
                <div id="brachial-container">
                    <div class="brachial-plexus-container">
                        <div class="plexus-interface" style="background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 30px;">
                            
                            <div class="plexus-layout" style="display: grid; grid-template-columns: 1fr 350px; gap: 0;">
                                
                                <!-- Left Column: Diagram (Always Visible) -->
                                <div class="diagram-container" style="background: #f8fafc; padding: 20px; border-right: 2px solid #e2e8f0; min-height: 600px; display: flex; align-items: center;">
                                    <svg id="plexus-svg" viewBox="0 0 800 600" style="width: 100%; height: 100%;"></svg>
                                </div>

                                <!-- Right Column: Interactive Controls -->
                                <div class="controls-column" style="display: flex; flex-direction: column; background: white;">
                                    
                                    <!-- Tab Headers -->
                                    <div class="tab-container" style="display: flex; background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                                        <button class="tab active" onclick="BrachialPlexus.showTab('anatomy')" style="flex: 1; padding: 15px; border: none; background: none; cursor: pointer; font-weight: 600; color: #64748b; font-size: 0.9em;">
                                            📊 Controls
                                        </button>
                                        <button class="tab" onclick="BrachialPlexus.showTab('injuries')" style="flex: 1; padding: 15px; border: none; background: none; cursor: pointer; font-weight: 600; color: #64748b; font-size: 0.9em;">
                                            ⚡ Injuries
                                        </button>
                                    </div>

                                    <!-- Anatomy Controls Tab -->
                                    <div id="anatomy-tab" class="tab-content active" style="display: none; padding: 20px; overflow-y: auto; max-height: 600px;">
                                        <div class="control-section" style="background: white; padding: 20px; border-radius: 15px; border: 2px solid #e2e8f0; margin-bottom: 20px;">
                                            <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1em;">🎯 Nerve Tracing</h3>
                                            <div class="nerve-buttons" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                                                <button onclick="BrachialPlexus.traceNerve('musculocutaneous')" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; text-align: left;">💪 Musculocutaneous</button>
                                                <button onclick="BrachialPlexus.traceNerve('axillary')" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; text-align: left;">🦾 Axillary</button>
                                                <button onclick="BrachialPlexus.traceNerve('median')" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; text-align: left;">🖐️ Median</button>
                                                <button onclick="BrachialPlexus.traceNerve('radial')" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; text-align: left;">🤚 Radial</button>
                                                <button onclick="BrachialPlexus.traceNerve('ulnar')" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; text-align: left;">🤏 Ulnar</button>
                                            </div>
                                        </div>

                                        <div id="nerve-info" style="background: #f8fafc; padding: 20px; border-radius: 15px; border: 2px solid #e2e8f0;">
                                            <h4 style="color: #1e40af; margin-bottom: 10px;">Select a nerve to trace its pathway</h4>
                                            <p style="color: #64748b;">Click on any nerve button to highlight its complete pathway.</p>
                                        </div>
                                    </div>

                                    <!-- Injuries List Tab -->
                                    <div id="injuries-tab" class="tab-content" style="display: none; padding: 20px; overflow-y: auto; max-height: 600px;">
                                        <div class="injury-grid" style="display: grid; grid-template-columns: 1fr; gap: 15px; margin-bottom: 20px;">
                                            <div class="injury-card" onclick="BrachialPlexus.showInjury('erb')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                                <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Erb's Palsy</div>
                                                <div style="font-size: 0.9em; color: #64748b;">Upper Trunk (C5-C6)</div>
                                            </div>
                                            <div class="injury-card" onclick="BrachialPlexus.showInjury('klumpke')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                                <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Klumpke's Palsy</div>
                                                <div style="font-size: 0.9em; color: #64748b;">Lower Trunk (C8-T1)</div>
                                            </div>
                                            <div class="injury-card" onclick="BrachialPlexus.showInjury('panplexus')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                                <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Pan-Plexus Palsy</div>
                                                <div style="font-size: 0.9em; color: #64748b;">Complete Injury</div>
                                            </div>
                                            <div class="injury-card" onclick="BrachialPlexus.showInjury('posteriorcord')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                                <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Posterior Cord</div>
                                                <div style="font-size: 0.9em; color: #64748b;">Crutch Palsy / Saturday Night</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                            <!-- Injury Details Panel (Full Width Below) -->
                            <div id="injury-details" style="border-top: 2px solid #e2e8f0; background: #f8fafc;">
                                <!-- Details will be injected here -->
                            </div>

                        </div>
                        
                        <!-- Brachial Plexus Clinical Anatomy Section -->
                        <div class="clinical-anatomy-section" style="margin-top: 40px; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                            <h3 style="color: #1e40af; margin-bottom: 25px; font-size: 1.8em; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">📚 Brachial Plexus: The Basics & Beyond</h3>
                            
                            <div style="display: grid; grid-template-columns: 1fr; gap: 30px;">
                                
                                <!-- 1. Anatomical Overview -->
                                <div>
                                    <h4 style="color: #3b82f6; font-size: 1.4em; margin-bottom: 15px;">1. What is the Brachial Plexus?</h4>
                                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 15px;">
                                        Think of the brachial plexus as a <strong>highway interchange</strong>. Nerve fibers coming out of the neck (Roots C5-T1) mix and reorganize to form the major nerves that control your arm.
                                    </p>
                                    <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border-left: 5px solid #3b82f6; margin-bottom: 20px;">
                                        <strong style="color: #1e40af; display: block; margin-bottom: 10px; font-size: 1.1em;">🔑 The "Pre-Plexus" Checkpoint</strong>
                                        <p style="color: #475569; margin-bottom: 0;">
                                            Some nerves branch off <em>immediately</em> after the roots leave the spine, before entering the plexus interchange.
                                            <br><br>
                                            <strong>Why this matters:</strong> If these muscles are weak, the injury is likely a <strong>Root Avulsion</strong> (torn right at the spine). If they are strong, the injury is further down in the plexus.
                                            <ul style="margin-top: 10px; margin-bottom: 0; padding-left: 20px;">
                                                <li><strong>Serratus Anterior (Long Thoracic N.):</strong> Medial winging scapula? Check C5-C7 roots.</li>
                                                <li><strong>Rhomboids (Dorsal Scapular N.):</strong> Lateral winging/Weak retraction? Check C5 root.</li>
                                            </ul>
                                        </p>
                                    </div>
                                </div>

                                <!-- 2. Clinical Presentation -->
                                <div>
                                    <h4 style="color: #d97706; font-size: 1.4em; margin-bottom: 15px;">2. Recognizing the Patterns</h4>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                                        <div style="background: #fffbeb; padding: 20px; border-radius: 12px;">
                                            <h5 style="color: #92400e; margin-bottom: 10px; font-size: 1.2em;">Upper Trunk (Erb's Palsy)</h5>
                                            <p style="color: #78350f; font-size: 0.9em; margin-bottom: 10px;"><em>"The Waiter's Tip"</em></p>
                                            <p style="color: #78350f; line-height: 1.5;">
                                                The arm hangs by the side (shoulder weakness), is straight (elbow weakness), and rotated inward.
                                                <br><strong>Sensory Loss:</strong> Numbness on the side of the shoulder and thumb.
                                            </p>
                                        </div>
                                        <div style="background: #fffbeb; padding: 20px; border-radius: 12px;">
                                            <h5 style="color: #92400e; margin-bottom: 10px; font-size: 1.2em;">Lower Trunk (Klumpke's)</h5>
                                            <p style="color: #78350f; font-size: 0.9em; margin-bottom: 10px;"><em>"The Claw Hand"</em></p>
                                            <p style="color: #78350f; line-height: 1.5;">
                                                Difficulty using the small muscles of the hand (spreading fingers, gripping).
                                                <br><strong>Sensory Loss:</strong> Numbness on the pinky side of the hand and forearm.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- 3. Etiology & 4. Evaluation -->
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                                    <!-- Etiology -->
                                    <div>
                                        <h4 style="color: #059669; font-size: 1.4em; margin-bottom: 15px;">3. Common Causes</h4>
                                        <ul style="list-style: none; padding: 0; color: #64748b;">
                                            <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
                                                <span style="position: absolute; left: 0; color: #059669; font-size: 1.2em;">•</span>
                                                <strong>Trauma:</strong> Pulling the head away from the shoulder tears the <em>Upper Trunk</em>. Pulling the arm up (like hanging from a tree) tears the <em>Lower Trunk</em>.
                                            </li>
                                            <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
                                                <span style="position: absolute; left: 0; color: #059669; font-size: 1.2em;">•</span>
                                                <strong>Radiation:</strong> Can damage nerves years after cancer treatment. Look for <strong>Myokymia</strong> (rippling muscles) on EMG.
                                            </li>
                                            <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
                                                <span style="position: absolute; left: 0; color: #059669; font-size: 1.2em;">•</span>
                                                <strong>Parsonage-Turner Syndrome:</strong> Sudden, severe shoulder pain followed by weakness as the pain fades. Often an immune reaction.
                                            </li>
                                        </ul>
                                    </div>

                                    <!-- Evaluation -->
                                    <div>
                                        <h4 style="color: #db2777; font-size: 1.4em; margin-bottom: 15px;">4. How We Diagnose It</h4>
                                        <div style="background: #fdf2f8; padding: 20px; border-radius: 12px; border-left: 5px solid #db2777;">
                                            <p style="margin-bottom: 10px; font-weight: 600; color: #9d174d; font-size: 1.1em;">The Golden Rule: Sensory Nerves</p>
                                            <p style="color: #831843; line-height: 1.6; margin-bottom: 15px;">
                                                We test the sensory wire (SNAP) to locate the cut:
                                            </p>
                                            <ul style="margin: 0; padding-left: 20px; color: #831843; line-height: 1.5;">
                                                <li style="margin-bottom: 10px;">
                                                    <strong>Abnormal SNAP:</strong> The wire is broken <em>after</em> the nerve cell body. This means the injury is in the <strong>Plexus</strong>.
                                                </li>
                                                <li>
                                                    <strong>Normal SNAP + Numbness:</strong> The wire is broken <em>before</em> the nerve cell body (at the spine). This means it's a <strong>Root</strong> problem (Radiculopathy).
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Quiz Section -->
                        ${generateModuleQuiz([
        {
            question: "A patient presents with weakness in shoulder abduction and elbow flexion, with sensory loss over the lateral arm. Which part of the brachial plexus is most likely affected?",
            options: [
                "Lower Trunk (C8-T1)",
                "Upper Trunk (C5-C6)",
                "Posterior Cord",
                "Medial Cord"
            ],
            correct: 1,
            explanation: "This is the classic presentation of ERB'S PALSY (Upper Trunk Plexopathy). It affects the C5-C6 roots/trunk, causing weakness in the deltoid (abduction), biceps (flexion), and brachioradialis, often leading to the 'waiter's tip' position."
        },
        {
            question: "Which nerve injury results in 'medial winging of the scapula'?",
            options: [
                "Dorsal Scapular Nerve",
                "Suprascapular Nerve",
                "Long Thoracic Nerve",
                "Axillary Nerve"
            ],
            correct: 2,
            explanation: "Medial winging of the scapula is caused by weakness of the SERRATUS ANTERIOR muscle (Long Thoracic Nerve). Contrast this with *lateral* winging, which is associated with Trapezius (Spinal Accessory) or Rhomboid (Dorsal Scapular) palsy."
        },
        {
            question: "What is the hallmark clinical finding of a Lower Trunk (Klumpke's) plexopathy?",
            options: [
                "Wrist drop",
                "Claw hand deformity",
                "Medial scapular winging",
                "Inability to shrug shoulders"
            ],
            correct: 1,
            explanation: "Lower Trunk (C8-T1) plexopathy affects the intrinsic hand muscles (ulnar and median innervated), leading to a 'CLAW HAND' deformity due to the unopposed action of the extensors."
        },
        {
            question: "In a patient with sensory loss in a specific distribution, you obtain a NORMAL SNAP amplitude in that same area. Which of the following interpretations is best?",
            options: [
                "Plexopathy",
                "Radiculopathy (Pre-ganglionic lesion)",
                "Peripheral neuropathy",
                "Technical error"
            ],
            correct: 1,
            explanation: "A NORMAL SNAP in an area of sensory loss suggests a PRE-GANGLIONIC lesion (proximal to the Dorsal Root Ganglion), i.e., a RADICULOPATHY. In plexopathies (post-ganglionic), the SNAP is typically reduced or absent because the lesion is distal to the cell body."
        },
        {
            question: "Which cord of the brachial plexus gives rise to the Radial and Axillary nerves?",
            options: [
                "Lateral Cord",
                "Medial Cord",
                "Posterior Cord",
                "Anterior Cord"
            ],
            correct: 2,
            explanation: "The POSTERIOR CORD gives rise to the Radial and Axillary nerves (as well as the Upper and Lower Subscapular and Thoracodorsal nerves). It is formed by the posterior divisions of all three trunks."
        },
        {
            question: "Parsonage-Turner Syndrome (Neuralgic Amyotrophy) is typically characterized by:",
            options: [
                "Painless progressive weakness",
                "Sudden onset of severe shoulder pain followed by weakness",
                "Bilateral symmetric hand weakness",
                "Pure sensory loss without weakness"
            ],
            correct: 1,
            explanation: "Parsonage-Turner Syndrome classically presents with SUDDEN, SEVERE SHOULDER PAIN that lasts for days to weeks, followed by patchy WEAKNESS and atrophy as the pain subsides. It is an immune-mediated inflammatory plexitis."
        },
        {
            question: "Which nerve is formed by contributions from both the Lateral and Medial cords?",
            options: [
                "Musculocutaneous Nerve",
                "Ulnar Nerve",
                "Median Nerve",
                "Radial Nerve"
            ],
            correct: 2,
            explanation: "The MEDIAN NERVE is formed by the union of the Lateral Root (from the Lateral Cord) and the Medial Root (from the Medial Cord), receiving fibers from C6-T1 (and sometimes C5)."
        },
        {
            question: "Horner's Syndrome (ptosis, miosis, anhidrosis) accompanying a hand weakness suggests an avulsion of which root?",
            options: [
                "C5",
                "C6",
                "C7",
                "T1"
            ],
            correct: 3,
            explanation: "Horner's Syndrome indicates injury to the sympathetic chain, which is closely associated with the T1 NERVE ROOT. Its presence in a patient with hand weakness suggests a T1 root avulsion (pre-ganglionic injury)."
        },
        {
            question: "The 'Burner' or 'Stinger' injury common in contact sports typically involves:",
            options: [
                "Transient stretch of the Upper Trunk (C5-C6)",
                "Avulsion of C8-T1",
                "Compression of the Posterior Cord",
                "Laceration of the Median Nerve"
            ],
            correct: 0,
            explanation: "A 'Burner' or 'Stinger' is a transient brachial plexopathy, usually involving a traction/stretch injury to the UPPER TRUNK (C5-C6) or cervical roots, causing temporary burning pain and weakness in the shoulder/arm."
        },
        {
            question: "Which muscle is innervated by the Suprascapular Nerve?",
            options: [
                "Deltoid",
                "Supraspinatus",
                "Teres Major",
                "Subscapularis"
            ],
            correct: 1,
            explanation: "The Suprascapular Nerve (C5-C6) innervates the SUPRASPINATUS and INFRASPINATUS muscles. It arises from the Upper Trunk."
        }
    ])}
                    </div>
                </div>

                <div id="lumbosacral-container" style="display: none;">
                    ${lumbosacralHTML}
                </div>
            </div>
        </div>
    `;
}

