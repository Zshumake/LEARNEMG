import { registerModulePodcasts } from '../../modules/audio/AudioData.js';

// Anatomical Data Structure
const plexusData = {
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
            x: 350, y: 80, // Moved left
            label: 'Lat. Fem. Cutaneous',
            description: 'L2-L3 • Sensory only',
            roots: ['L2', 'L3'],
            muscles: ['None'],
            sensory: 'Lateral thigh (Meralgia Paresthetica)'
        },
        {
            id: 'femoral',
            x: 350, y: 140, // Moved left
            label: 'Femoral',
            description: 'L2-L4 • Hip Flexion, Knee Extension',
            roots: ['L2', 'L3', 'L4'],
            muscles: ['Iliopsoas', 'Quadriceps', 'Sartorius'],
            sensory: 'Anterior thigh, medial leg (Saphenous)'
        },
        {
            id: 'obturator',
            x: 350, y: 200, // Moved left
            label: 'Obturator',
            description: 'L2-L4 • Hip Adduction',
            roots: ['L2', 'L3', 'L4'],
            muscles: ['Adductors (Longus, Brevis, Magnus)', 'Gracilis'],
            sensory: 'Medial thigh'
        },

        // Sacral Plexus (Bottom)
        {
            id: 'gluteal_sup',
            x: 350, y: 280, // Moved left
            label: 'Sup. Gluteal',
            description: 'L4-S1 • Hip Abduction',
            roots: ['L4', 'L5', 'S1'],
            muscles: ['Gluteus Medius', 'Gluteus Minimus', 'TFL'],
            sensory: 'None'
        },
        {
            id: 'gluteal_inf',
            x: 350, y: 340, // Moved left
            label: 'Inf. Gluteal',
            description: 'L5-S2 • Hip Extension',
            roots: ['L5', 'S1', 'S2'],
            muscles: ['Gluteus Maximus'],
            sensory: 'None'
        },
        {
            id: 'sciatic',
            x: 400, y: 400, // Moved left
            label: 'Sciatic',
            description: 'L4-S3 • Hamstrings, All leg/foot muscles',
            roots: ['L4', 'L5', 'S1', 'S2', 'S3'],
            muscles: ['Hamstrings', 'All leg/foot muscles'],
            sensory: 'Posterior thigh, entire leg/foot (except medial)'
        },
        {
            id: 'common_fibular',
            x: 600, y: 350, // Moved left
            label: 'Common Peroneal (Fibular)',
            description: 'L4-S2 • Anterior leg muscles • Dorsum of foot sensation',
            roots: ['L4', 'L5', 'S1', 'S2'],
            muscles: ['Tibialis Anterior', 'Peronei', 'EHL', 'EDL'],
            sensory: 'Lateral leg, dorsum of foot'
        },
        {
            id: 'tibial',
            x: 600, y: 450, // Moved left
            label: 'Tibial',
            description: 'L4-S3 • Plantarflexion, Inversion',
            roots: ['L4', 'L5', 'S1', 'S2', 'S3'],
            muscles: ['Gastrocnemius', 'Soleus', 'Tibialis Posterior', 'Flexors'],
            sensory: 'Posterior leg, sole of foot'
        },
        {
            id: 'sural',
            x: 500, y: 520,
            label: 'Sural',
            description: 'S1-S2 • Sensory Only',
            roots: ['S1', 'S2'],
            muscles: ['None'],
            sensory: 'Lateral foot, posterolateral leg'
        }
    ]
};

const injuryPatterns = {
    diabetic_amyotrophy: {
        title: "Diabetic Amyotrophy",
        affected: ['femoral', 'obturator'],
        location: { x: 500, y: 170 },
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
        location: { x: 500, y: 140 },
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
        location: { x: 500, y: 300 }, // Between Lumbar and Sacral
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
        location: { x: 500, y: 400 },
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
    },
    intrapartum_plexopathy: {
        title: "Intrapartum Plexopathy",
        affected: ['lumbosacral_trunk', 'obturator'], // Often LS trunk or Obturator
        location: { x: 500, y: 250 },
        affectedSegments: ['nerve-common-fibular', 'nerve-obturator'], // Variable
        description: "Compression during labor",
        mechanism: "Fetal head compressing LS trunk or Obturator nerve",
        clinicalPattern: {
            weakness: "Foot drop (LS Trunk) OR Hip adduction (Obturator)",
            sensory: "Dorsum of foot OR Medial thigh",
            reflexes: "Usually normal",
            muscles: "Tibialis Anterior OR Adductors"
        },
        emgFindings: {
            snaps: "Superficial Fibular SNAP abnormal (if LS trunk)",
            motorStudies: "Fibular CMAP reduced",
            needleEMG: "Denervation in L5 or Obturator distribution"
        }
    }
};

export function generateContent(module) {
    // registerModulePodcasts('lumbosacral-plexus'); // TODO: Add podcast support

    const LumbosacralPlexus = {
        currentNerve: null,
        currentInjury: null,

        init: function () {
            setTimeout(() => {
                this.drawPlexus();
                this.showTab('anatomy');
            }, 100);
        },

        showTab: function (tabId) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });

            const tabBtn = document.querySelector(`.tab[onclick*="${tabId}"]`);
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

            // Helper to draw curved connection
            const drawConnection = (rootId, nerveId, nerveX, nerveY, segmentId) => {
                const root = plexusData.roots.find(r => r.id === rootId);
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
                path.setAttribute('data-nerve', nerveId); // This needs to be flexible for multi-nerve lines
                path.setAttribute('data-segment', segmentId);
                svg.insertBefore(path, svg.firstChild); // Draw lines BEHIND boxes
            };

            // 1. Draw Connections (Schematic) - Draw these FIRST so they are behind elements

            // Lumbar Plexus Connections
            // Femoral (L2, L3, L4)
            ['L2', 'L3', 'L4'].forEach(rootId => {
                drawConnection(rootId, 'femoral', 350, 140, 'nerve-femoral');
            });

            // Obturator (L2, L3, L4)
            ['L2', 'L3', 'L4'].forEach(rootId => {
                drawConnection(rootId, 'obturator', 350, 200, 'nerve-obturator');
            });

            // LFC (L2, L3)
            ['L2', 'L3'].forEach(rootId => {
                drawConnection(rootId, 'lfc', 350, 80, 'nerve-lfc');
            });

            // Sacral Plexus Connections
            // Sciatic (L4-S3)
            ['L4', 'L5', 'S1', 'S2', 'S3'].forEach(rootId => {
                // Special handling for Sciatic to show it's the main trunk
                const root = plexusData.roots.find(r => r.id === rootId);
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                const startX = root.x + 50;
                const startY = root.y + 15;
                const endX = 400; // Updated Sciatic X
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
                path.setAttribute('data-nerve', 'sciatic,tibial,common_fibular');
                path.setAttribute('data-segment', 'nerve-sciatic');
                svg.insertBefore(path, svg.firstChild);
            });

            // Sciatic Branches (Sciatic -> Common Fibular & Tibial)
            const sciaticX = 400 + 140; // Right edge of Sciatic box
            const sciaticY = 400 + 15;

            // To Common Fibular
            const cfPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            cfPath.setAttribute('d', `M ${sciaticX} ${sciaticY} C ${sciaticX + 50} ${sciaticY}, ${600 - 50} ${350 + 15}, ${600} ${350 + 15}`);
            cfPath.setAttribute('stroke', '#94a3b8');
            cfPath.setAttribute('stroke-width', '2');
            cfPath.setAttribute('fill', 'none');
            cfPath.classList.add('plexus-connection');
            cfPath.setAttribute('data-nerve', 'common_fibular');
            cfPath.setAttribute('data-segment', 'nerve-common-fibular');
            svg.insertBefore(cfPath, svg.firstChild);

            // To Tibial
            const tibPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            tibPath.setAttribute('d', `M ${sciaticX} ${sciaticY} C ${sciaticX + 50} ${sciaticY}, ${600 - 50} ${450 + 15}, ${600} ${450 + 15}`);
            tibPath.setAttribute('stroke', '#94a3b8');
            tibPath.setAttribute('stroke-width', '2');
            tibPath.setAttribute('fill', 'none');
            tibPath.classList.add('plexus-connection');
            tibPath.setAttribute('data-nerve', 'tibial');
            tibPath.setAttribute('data-segment', 'nerve-tibial');
            svg.insertBefore(tibPath, svg.firstChild);

            // Gluteals (L4-S2)
            ['L4', 'L5', 'S1'].forEach(rootId => drawConnection(rootId, 'gluteal_sup', 350, 280, 'nerve-gluteal-sup'));
            ['L5', 'S1', 'S2'].forEach(rootId => drawConnection(rootId, 'gluteal_inf', 350, 340, 'nerve-gluteal-inf'));


            // 2. Draw Roots (with proper styling)
            plexusData.roots.forEach(root => {
                const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                group.setAttribute('class', 'plexus-element plexus-root');
                group.setAttribute('data-id', root.id);
                group.setAttribute('data-segment', `root-${root.id.toLowerCase()}`);
                group.style.cursor = 'pointer'; // Make clickable
                group.onclick = () => {
                    // Find nerves connected to this root (reverse tracing)
                    // For now, just highlight the root itself
                    document.querySelectorAll('.plexus-element, .plexus-connection').forEach(el => {
                        el.style.opacity = '0.3';
                        el.style.filter = 'none';
                    });
                    group.style.opacity = '1';
                    group.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';

                    // Highlight connections from this root
                    document.querySelectorAll('.plexus-connection').forEach(path => {
                        // This is a bit complex since paths are defined by nerve, not root
                        // But we can check if the path starts near this root
                        const d = path.getAttribute('d');
                        if (d && d.startsWith(`M ${root.x + 50} ${root.y + 15}`)) {
                            path.style.opacity = '1';
                            path.style.strokeWidth = '4';
                            path.style.stroke = '#000000';
                        }
                    });
                };

                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', root.x);
                rect.setAttribute('y', root.y);
                rect.setAttribute('width', '50');
                rect.setAttribute('height', '30');
                rect.setAttribute('rx', '5');
                rect.setAttribute('fill', '#eff6ff'); // Light blue fill
                rect.setAttribute('stroke', '#000000'); // Black stroke
                rect.setAttribute('stroke-width', '2');

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', root.x + 25);
                text.setAttribute('y', root.y + 20);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('class', 'root-label');
                text.setAttribute('fill', '#1e40af'); // Dark blue text
                text.setAttribute('font-weight', 'bold');
                text.setAttribute('font-size', '14px');
                text.textContent = root.label;

                group.appendChild(rect);
                group.appendChild(text);
                svg.appendChild(group);
            });

            // 3. Draw Nerves
            plexusData.nerves.forEach(nerve => {
                const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                group.setAttribute('class', 'plexus-element');
                group.setAttribute('data-id', nerve.id);
                group.style.cursor = 'pointer'; // Make clickable
                group.onclick = () => this.traceNerve(nerve.id); // Trigger tracing

                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', nerve.x);
                rect.setAttribute('y', nerve.y - 15); // Center Y is passed in data, so offset by half height
                rect.setAttribute('width', '140');
                rect.setAttribute('height', '30');
                rect.setAttribute('rx', '5');
                rect.setAttribute('fill', '#eff6ff');
                rect.setAttribute('stroke', '#3b82f6');
                rect.setAttribute('stroke-width', '2');

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', nerve.x + 70);
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
            // Reset all first
            this.clearTracing();

            this.currentNerve = plexusData.nerves.find(n => n.id === nerveId);
            this.updateNerveInfo(this.currentNerve);

            // Highlight current nerve
            const nerveEl = document.querySelector(`.plexus-element[data-id="${nerveId}"]`);
            if (nerveEl) {
                nerveEl.style.opacity = '1';
                nerveEl.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
            }

            // Highlight roots
            this.currentNerve.roots.forEach(rootId => {
                const rootEl = document.querySelector(`.plexus-element[data-segment="root-${rootId.toLowerCase()}"]`);
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
                line.style.strokeWidth = '2';
                line.style.filter = 'none';
                line.classList.remove('injury-active');
                line.style.stroke = '#94a3b8'; // Reset color
            });

            // Clear elements
            document.querySelectorAll('.plexus-element').forEach(el => {
                el.style.opacity = '1';
                el.style.filter = 'none';
                el.classList.remove('injury-active');
            });

            // Remove injury markers
            document.querySelectorAll('.injury-marker').forEach(el => el.remove());

            const nerveInfo = document.getElementById('nerve-info');
            if (nerveInfo) {
                nerveInfo.innerHTML = `
                    <h4 style="color: #1e40af; margin-bottom: 10px;">Select a nerve to trace its pathway</h4>
                    <p style="color: #64748b;">Click on any nerve button to highlight its complete pathway.</p>
                `;
            }
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

        showInjury: function (injuryType) {
            const injury = injuryPatterns[injuryType];
            const detailsDiv = document.getElementById('injury-details');

            document.querySelectorAll('.injury-card').forEach(card => card.classList.remove('active'));
            const activeCard = document.querySelector(`.injury-card[onclick*="${injuryType}"]`);
            if (activeCard) activeCard.classList.add('active');

            if (detailsDiv) {
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
                    document.querySelectorAll(`[data-segment="${segmentId}"]`).forEach(el => {
                        el.classList.add('injury-active');
                        el.style.opacity = '1';
                    });
                });
            }

            // 3. Highlight Affected Terminal Nerves
            // (Simplified for now)
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

    // Expose to global scope for HTML onclick handlers
    window.LumbosacralPlexus = LumbosacralPlexus;
    setTimeout(() => LumbosacralPlexus.init(), 100);

    return `
        <div class="lumbosacral-plexus-container" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
            <div class="module-header" style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #1e40af; font-size: 2.5em; margin-bottom: 10px;">Lumbosacral Plexus Interactive</h2>
                <p style="color: #64748b; font-size: 1.2em;">Explore the anatomy and pathology of the lower limb plexus</p>
            </div>

            <!-- Interactive Interface (Moved to Top) -->
            <div class="plexus-interface" style="background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; margin-bottom: 30px;">
                
                <div class="plexus-layout" style="display: grid; grid-template-columns: 1fr 350px; gap: 0;">
                    
                    <!-- Left Column: Diagram (Always Visible) -->
                    <div class="diagram-container" style="background: #f8fafc; padding: 20px; border-right: 2px solid #e2e8f0; min-height: 600px; display: flex; align-items: center;">
                        <svg id="lumbosacral-svg" viewBox="0 0 800 600" style="width: 100%; height: 100%;"></svg>
                    </div>

                    <!-- Right Column: Interactive Controls -->
                    <div class="controls-column" style="display: flex; flex-direction: column; background: white;">
                        
                        <!-- Tab Headers -->
                        <div class="tab-container" style="display: flex; background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <button class="tab active" onclick="LumbosacralPlexus.showTab('anatomy')" style="flex: 1; padding: 15px; border: none; background: none; cursor: pointer; font-weight: 600; color: #64748b; font-size: 0.9em;">
                                📊 Controls
                            </button>
                            <button class="tab" onclick="LumbosacralPlexus.showTab('injuries')" style="flex: 1; padding: 15px; border: none; background: none; cursor: pointer; font-weight: 600; color: #64748b; font-size: 0.9em;">
                                ⚡ Injuries
                            </button>
                        </div>

                        <!-- Anatomy Controls Tab -->
                        <div id="ls-anatomy-tab" class="tab-content active" style="display: block; padding: 20px; overflow-y: auto; max-height: 600px;">
                            <div class="control-section" style="background: white; padding: 20px; border-radius: 15px; border: 2px solid #e2e8f0; margin-bottom: 20px;">
                                <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1em;">🎯 Nerve Tracing</h3>
                                <div class="nerve-buttons" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                                    ${plexusData.nerves.map(nerve => `
                                        <button onclick="LumbosacralPlexus.traceNerve('${nerve.id}')" style="padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.borderColor='#3b82f6'; this.style.background='#eff6ff'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white'">
                                            <span style="font-weight: 600; color: #1e40af;">${nerve.label}</span>
                                            <div style="font-size: 0.8em; color: #64748b; margin-top: 4px;">${nerve.description.split('•')[0]}</div>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>

                            <div id="nerve-info" style="background: #f8fafc; padding: 20px; border-radius: 15px; border: 2px solid #e2e8f0;">
                                <h4 style="color: #1e40af; margin-bottom: 10px;">Select a nerve to trace its pathway</h4>
                                <p style="color: #64748b;">Click on any nerve button to highlight its complete pathway.</p>
                            </div>
                        </div>

                        <!-- Injuries List Tab -->
                        <div id="ls-injuries-tab" class="tab-content" style="display: none; padding: 20px; overflow-y: auto; max-height: 600px;">
                            <div class="injury-grid" style="display: grid; grid-template-columns: 1fr; gap: 15px; margin-bottom: 20px;">
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('diabetic_amyotrophy')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                    <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Diabetic Amyotrophy</div>
                                    <div style="font-size: 0.9em; color: #64748b;">Lumbosacral Radiculoplexus</div>
                                </div>
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('retroperitoneal_hematoma')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                    <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Retroperitoneal Hematoma</div>
                                    <div style="font-size: 0.9em; color: #64748b;">Lumbar Plexus Compression</div>
                                </div>
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('lumbosacral_trunk')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                    <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Lumbosacral Trunk</div>
                                    <div style="font-size: 0.9em; color: #64748b;">L4-L5 Lesion</div>
                                </div>
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('sacral_plexopathy')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                    <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Sacral Plexopathy</div>
                                    <div style="font-size: 0.9em; color: #64748b;">Malignancy / Trauma</div>
                                </div>
                                <div class="injury-card" onclick="LumbosacralPlexus.showInjury('intrapartum_plexopathy')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.2s;">
                                    <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px;">Intrapartum Plexopathy</div>
                                    <div style="font-size: 0.9em; color: #64748b;">Labor Complication</div>
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

            <!-- Lumbosacral Plexus Clinical Anatomy Section -->
            <div class="clinical-anatomy-section" style="margin-top: 40px; background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h3 style="color: #1e40af; margin-bottom: 25px; font-size: 1.8em; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">📚 Lumbosacral Plexus: The Basics & Beyond</h3>
                
                <div style="display: grid; grid-template-columns: 1fr; gap: 30px;">
                    
                    <!-- 1. Anatomical Overview -->
                    <div>
                        <h4 style="color: #3b82f6; font-size: 1.4em; margin-bottom: 15px;">1. Two Plexuses in One</h4>
                        <p style="color: #64748b; line-height: 1.6; margin-bottom: 15px;">
                            The lumbosacral plexus is actually two separate networks that supply the leg. It's helpful to think of them by "Front vs. Back".
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 5px solid #3b82f6;">
                                <strong style="color: #1e40af; display: block; margin-bottom: 10px; font-size: 1.1em;">Lumbar Plexus (The Front)</strong>
                                <p style="color: #475569; margin-bottom: 0;">
                                    Located deep in the belly (behind the psoas muscle).
                                    <br><strong>Controls:</strong> Lifting the leg (Hip Flexion) and straightening the knee (Extension).
                                    <br><strong>Nerves:</strong> Femoral & Obturator.
                                </p>
                            </div>
                            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 5px solid #8b5cf6;">
                                <strong style="color: #5b21b6; display: block; margin-bottom: 10px; font-size: 1.1em;">Sacral Plexus (The Back)</strong>
                                <p style="color: #475569; margin-bottom: 0;">
                                    Located lower down in the pelvis.
                                    <br><strong>Controls:</strong> Bending the knee and moving the foot/ankle.
                                    <br><strong>Nerves:</strong> Sciatic (which splits into Tibial & Fibular).
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Clinical Presentation -->
                    <div>
                        <h4 style="color: #d97706; font-size: 1.4em; margin-bottom: 15px;">2. Recognizing the Patterns</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <div style="background: #fffbeb; padding: 20px; border-radius: 12px;">
                                <h5 style="color: #92400e; margin-bottom: 10px; font-size: 1.2em;">Upper Lumbar (L2-L4)</h5>
                                <p style="color: #78350f; font-size: 0.9em; margin-bottom: 10px;"><em>"The Buckling Knee"</em></p>
                                <p style="color: #78350f; line-height: 1.5;">
                                    Patient has trouble climbing stairs or getting out of a chair because the knee gives way.
                                    <br><strong>Sensory:</strong> Numbness on the front/inner thigh.
                                </p>
                            </div>
                            <div style="background: #fffbeb; padding: 20px; border-radius: 12px;">
                                <h5 style="color: #92400e; margin-bottom: 10px; font-size: 1.2em;">Lower Lumbosacral (L4-S3)</h5>
                                <p style="color: #78350f; font-size: 0.9em; margin-bottom: 10px;"><em>"Foot Drop"</em></p>
                                <p style="color: #78350f; line-height: 1.5;">
                                    Patient drags their toes or has a "slapping gait" because they can't lift the foot.
                                    <br><strong>Sensory:</strong> Numbness on the back of the leg or foot.
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
                                    <strong>Diabetic Amyotrophy:</strong> High blood sugar damages the nerves. Starts with <em>severe</em> thigh pain, followed by wasting of the thigh muscles.
                                </li>
                                <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
                                    <span style="position: absolute; left: 0; color: #059669; font-size: 1.2em;">•</span>
                                    <strong>Postpartum Plexopathy:</strong> During a difficult delivery, the baby's head can press against the nerves in the pelvis. Mom wakes up with a <strong>Foot Drop</strong>.
                                </li>
                                <li style="margin-bottom: 15px; padding-left: 20px; position: relative;">
                                    <span style="position: absolute; left: 0; color: #059669; font-size: 1.2em;">•</span>
                                    <strong>Retroperitoneal Hemorrhage:</strong> Bleeding into the belly (often from blood thinners) compresses the nerve. Patient keeps their hip bent to relieve pain.
                                </li>
                            </ul>
                        </div>

                        <!-- Evaluation -->
                        <div>
                            <h4 style="color: #db2777; font-size: 1.4em; margin-bottom: 15px;">4. How We Diagnose It</h4>
                            <div style="background: #fdf2f8; padding: 20px; border-radius: 12px; border-left: 5px solid #db2777;">
                                <p style="margin-bottom: 10px; font-weight: 600; color: #9d174d; font-size: 1.1em;">Is it the Plexus or the Back?</p>
                                <p style="color: #831843; line-height: 1.6; margin-bottom: 15px;">
                                    Most leg pain comes from the spine (Radiculopathy). We use two clues to find the Plexus:
                                </p>
                                <ul style="margin: 0; padding-left: 20px; color: #831843; line-height: 1.5;">
                                    <li style="margin-bottom: 10px;">
                                        <strong>Sensory SNAP:</strong> If the sensory wire is broken (Abnormal SNAP), it's the <strong>Plexus</strong>. If it's working but the patient feels numbness, it's the <strong>Spine</strong>.
                                    </li>
                                    <li>
                                        <strong>Paraspinal Muscles:</strong> These back muscles get their nerves <em>before</em> the plexus. If they are healthy, the problem is likely in the <strong>Plexus</strong>.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export const LumbosacralPlexusInteractive = LumbosacralPlexus;
