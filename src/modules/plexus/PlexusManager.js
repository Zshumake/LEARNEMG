import { PlexusLogic } from './PlexusLogic.js';
import { PlexusRenderer } from './PlexusRenderer.js?v=20260304-v5';
import { generatePlexopathyContent } from '../../content/pathology/BrachialPlexopathy.js?v=20260304-v5';
import logger from '../../utils/Logger.js';

const MUSCLE_DETAILS = {
    // Upper Extremity
    'Deltoid': { action: 'Shoulder abduction', root: 'C5-C6', test: 'Resist shoulder abduction at 90 degrees' },
    'Biceps': { action: 'Elbow flexion, forearm supination', root: 'C5-C6', test: 'Resist elbow flexion with forearm supinated' },
    'Brachialis': { action: 'Elbow flexion', root: 'C5-C6', test: 'Resist elbow flexion with forearm pronated' },
    'Coracobrachialis': { action: 'Shoulder flexion, adduction', root: 'C5-C7', test: 'Resist shoulder flexion' },
    'Supraspinatus': { action: 'Shoulder abduction initiation (first 15 degrees)', root: 'C5-C6', test: 'Empty can test (Jobe test)' },
    'Infraspinatus': { action: 'Shoulder external rotation', root: 'C5-C6', test: 'Resist external rotation with arm at side' },
    'Teres Minor': { action: 'Shoulder external rotation', root: 'C5-C6', test: 'Resist external rotation at 90 degrees abduction' },
    'Serratus Anterior': { action: 'Scapular protraction', root: 'C5-C7', test: 'Wall push-up -- watch for medial scapular winging' },
    'Rhomboids': { action: 'Scapular retraction', root: 'C5', test: 'Resist scapular retraction (squeeze shoulder blades)' },
    'Triceps': { action: 'Elbow extension', root: 'C6-C8', test: 'Resist elbow extension' },
    'Brachioradialis': { action: 'Elbow flexion (neutral forearm)', root: 'C5-C6', test: 'Resist elbow flexion with forearm in neutral' },
    'ECRL': { action: 'Wrist extension with radial deviation', root: 'C6-C7', test: 'Resist wrist extension' },
    'ECU': { action: 'Wrist extension with ulnar deviation', root: 'C7-C8', test: 'Resist ulnar wrist extension' },
    'Wrist Extensors': { action: 'Wrist extension', root: 'C6-C8', test: 'Resist wrist extension' },
    'Finger Extensors': { action: 'Finger MCP extension', root: 'C7-C8', test: 'Resist finger extension at MCP joints' },
    'Supinator': { action: 'Forearm supination', root: 'C5-C6', test: 'Resist supination with elbow extended' },
    'Pronator Teres': { action: 'Forearm pronation', root: 'C6-C7', test: 'Resist forearm pronation' },
    'FCR': { action: 'Wrist flexion with radial deviation', root: 'C6-C7', test: 'Resist radial wrist flexion' },
    'Palmaris Longus': { action: 'Wrist flexion (weak)', root: 'C7-C8', test: 'Oppose thumb to pinky; palmaris tendon visible at wrist' },
    'FPL': { action: 'Thumb IP flexion', root: 'C8-T1', test: 'Resist thumb IP flexion (AIN test)' },
    'FDP (Index)': { action: 'Index finger DIP flexion', root: 'C8-T1', test: 'Resist index DIP flexion (AIN test)' },
    'APB': { action: 'Thumb abduction (palmar)', root: 'C8-T1', test: 'Resist thumb abduction perpendicular to palm' },
    'Opponens Pollicis': { action: 'Thumb opposition', root: 'C8-T1', test: 'Resist thumb-to-pinky opposition' },
    'Lumbricals 1-2': { action: 'Index/middle MCP flexion + IP extension', root: 'C8-T1', test: 'Resist MCP flexion with IP extended' },
    'FDI': { action: 'Index finger abduction', root: 'C8-T1', test: 'Resist index finger abduction (spreading)' },
    'ADM': { action: 'Small finger abduction', root: 'C8-T1', test: 'Resist small finger abduction' },
    'Adductor Pollicis': { action: 'Thumb adduction', root: 'C8-T1', test: 'Froment test (paper pinch)' },
    'Interossei': { action: 'Finger abduction/adduction', root: 'C8-T1', test: 'Resist finger spreading' },
    'FCU': { action: 'Wrist flexion with ulnar deviation', root: 'C7-C8', test: 'Resist ulnar wrist flexion' },
    'FDP (Ring/Little)': { action: 'Ring/little DIP flexion', root: 'C8-T1', test: 'Resist ring/little DIP flexion' },
    'Latissimus Dorsi': { action: 'Shoulder adduction, extension, internal rotation', root: 'C6-C8', test: 'Resist shoulder adduction from abducted position' },
    'Subscapularis': { action: 'Shoulder internal rotation', root: 'C5-C6', test: 'Belly press test or lift-off test' },
    'Teres Major': { action: 'Shoulder adduction, internal rotation', root: 'C5-C7', test: 'Resist shoulder internal rotation' },
    'Pectoralis Major': { action: 'Shoulder adduction, flexion, internal rotation', root: 'C5-T1', test: 'Resist horizontal adduction' },
    // Lower Extremity
    'Tibialis Anterior': { action: 'Ankle dorsiflexion, inversion', root: 'L4-L5', test: 'Resist ankle dorsiflexion (heel walk)' },
    'Extensor Hallucis Longus': { action: 'Great toe extension', root: 'L5-S1', test: 'Resist great toe extension' },
    'Extensor Digitorum Longus': { action: 'Toe extension', root: 'L5-S1', test: 'Resist toe extension' },
    'Peroneus Longus': { action: 'Foot eversion, plantar flexion', root: 'L5-S1', test: 'Resist foot eversion' },
    'Peroneus Brevis': { action: 'Foot eversion', root: 'L5-S1', test: 'Resist foot eversion' },
    'Extensor Digitorum Brevis': { action: 'Toe extension (intrinsic)', root: 'L5-S1', test: 'Observe EDB bulk on dorsum of foot' },
    'Gastrocnemius': { action: 'Ankle plantar flexion (knee extended)', root: 'S1-S2', test: 'Single leg heel raise' },
    'Soleus': { action: 'Ankle plantar flexion (knee flexed)', root: 'S1-S2', test: 'Resist plantar flexion with knee bent' },
    'Tibialis Posterior': { action: 'Ankle inversion, plantar flexion', root: 'L5-S1', test: 'Resist foot inversion (critical L5 vs peroneal test)' },
    'Quadriceps': { action: 'Knee extension', root: 'L2-L4', test: 'Resist knee extension' },
    'Iliopsoas': { action: 'Hip flexion', root: 'L1-L3', test: 'Resist hip flexion in seated position' },
    'Adductors': { action: 'Hip adduction', root: 'L2-L4', test: 'Resist hip adduction (squeeze knees together)' },
    'Gluteus Medius': { action: 'Hip abduction', root: 'L5-S1', test: 'Trendelenburg test (single leg stance)' },
    'Gluteus Maximus': { action: 'Hip extension', root: 'L5-S2', test: 'Resist hip extension from prone position' },
    'Hamstrings': { action: 'Knee flexion', root: 'L5-S2', test: 'Resist knee flexion in prone' },
    'Intrinsic Foot Muscles': { action: 'Toe flexion, foot stabilization', root: 'S1-S2', test: 'Resist toe flexion / observe foot arch' },
    'Flexor Digitorum Longus': { action: 'Toe DIP flexion', root: 'L5-S1', test: 'Resist toe flexion' },
    'Flexor Hallucis Longus': { action: 'Great toe IP flexion', root: 'S1-S2', test: 'Resist great toe flexion' }
};

export class PlexusManager {
    constructor() {
        this.logic = new PlexusLogic();
        this.renderer = null;
        this.currentPlexus = 'brachial';
        this.mode = 'discovery'; // 'discovery', 'lesion', 'emg'
        this.view = 'anatomy'; // 'anatomy', 'clinical'
        this.dataCache = {};
        this.initialFitDone = false;

        // Register ActionBus handlers
        if (window._registerAction) {
            window._registerAction('plexusSwitchView', (el) => {
                window.appComponents.plexus.switchView(el.dataset.view);
            });
            window._registerAction('plexusSetMode', (el) => {
                window.appComponents.plexus.setMode(el.dataset.mode);
            });
            window._registerAction('plexusZoomIn', () => {
                window.appComponents.plexus.zoomIn();
            });
            window._registerAction('plexusZoomOut', () => {
                window.appComponents.plexus.zoomOut();
            });
            window._registerAction('plexusZoomReset', () => {
                window.appComponents.plexus.zoomReset();
            });
        }
    }

    async initialize(containerId, initialPlexus = null) {
        logger.log('🚀 PlexusManager: Initializing...');

        // Reset view state to anatomy upon re-initialization
        this.view = 'anatomy';

        // Initialize Renderer
        this.renderer = new PlexusRenderer(containerId, this);

        // Responsive handling
        const container = document.getElementById(containerId);
        if (container && window.ResizeObserver) {
            if (this.resizeObserver) this.resizeObserver.disconnect();

            this.resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    if (width > 0 && height > 0 && this.renderer && this.view === 'anatomy') {
                        this.renderer.resize(width, height);

                        if (this.dataCache && this.dataCache[this.currentPlexus] && this.dataCache[this.currentPlexus].nodes && this.renderer.svg) {
                            if (!this.initialFitDone) {
                                this.renderer.fitToScreen(this.dataCache[this.currentPlexus].nodes, true);
                                this.initialFitDone = true;
                            }
                        }
                    }
                }
            });
            this.resizeObserver.observe(container);
        }

        // Load data
        try {
            await this.loadPlexusData('brachial');
            await this.loadPlexusData('lumbosacral');

            const targetPlexus = initialPlexus || this.currentPlexus || 'brachial';
            this.switchPlexus(targetPlexus);

            logger.log('✅ PlexusManager: Initialization complete');
            return true;
        } catch (error) {
            logger.error('❌ PlexusManager: Init failed', error);
            return false;
        }
    }

    async loadPlexusData(type) {
        const path = `src/modules/plexus/data/${type}_plexus.json?v=${new Date().getTime()}`;
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const data = await response.json();
            this.dataCache[type] = data;
            return true;
        } catch (e) {
            logger.error(`Failed to load ${type} data:`, e);
            return false;
        }
    }

    async switchPlexus(name) {
        if (!this.dataCache[name]) {
            const success = await this.loadPlexusData(name);
            if (!success) return;
        }

        this.currentPlexus = name;
        this.initialFitDone = false;
        this.logic.loadGraph(this.dataCache[name]);

        if (this.renderer && this.view === 'anatomy') {
            this.renderer.render(this.dataCache[name]);
        }
    }

    switchView(viewName) {
        if (this.view === viewName) return;
        this.view = viewName;

        const anatomyContainer = document.getElementById('plexus-anatomy-view');
        const clinicalContainer = document.getElementById('plexus-clinical-view');
        const anatomyTab = document.getElementById('tab-anatomy');
        const clinicalTab = document.getElementById('tab-clinical');

        if (viewName === 'anatomy') {
            anatomyContainer.style.display = 'flex';
            clinicalContainer.style.display = 'none';
            anatomyTab.classList.add('active');
            clinicalTab.classList.remove('active');

            // Re-render D3 if switching back
            setTimeout(() => {
                if (this.renderer) {
                    const vizContainer = document.getElementById('plexus-viz-container');
                    this.renderer.resize(vizContainer.clientWidth, vizContainer.clientHeight);
                    this.renderer.render(this.dataCache[this.currentPlexus]);
                }
            }, 50);
        } else {
            anatomyContainer.style.display = 'none';
            clinicalContainer.style.display = 'block';
            anatomyTab.classList.remove('active');
            clinicalTab.classList.add('active');

            // Load clinical content
            clinicalContainer.innerHTML = generatePlexopathyContent();
        }
    }

    handleNodeClick(nodeId) {
        const node = this.logic.nodeMap.get(nodeId);
        if (this.mode === 'discovery') {
            const path = this.logic.findAncestors(nodeId);
            this.renderer.animatePath(path);
            this.showNodeInfo(node);
        } else if (this.mode === 'lesion') {
            const descendants = this.logic.findDescendants(nodeId);
            this.renderer.highlightPath(descendants);
            const effects = this.logic.getLesionEffects(nodeId);
            this.showLesionInfo(effects);
        } else if (this.mode === 'compare') {
            this.handleCompareClick(nodeId);
        }
    }

    // Feature 7: Side-by-Side Comparison
    handleCompareClick(nodeId) {
        if (!this._compareA) {
            this._compareA = nodeId;
            // Highlight first selection in blue
            this.renderer.resetHighlight();
            const descendants = this.logic.findDescendants(nodeId);
            this.renderer.highlightPath(descendants);
            const panel = document.getElementById('plexus-info-panel');
            if (panel) {
                panel.style.display = 'block';
                const node = this.logic.nodeMap.get(nodeId);
                panel.innerHTML = `<h3 style="color:#1e293b;">Compare Mode</h3>
                    <p style="color:#64748b;font-size:0.85rem;">Selected: <strong style="color:#3b82f6;">${node?.label || nodeId}</strong></p>
                    <p style="color:#94a3b8;font-size:0.82rem;">Now click a second structure to compare.</p>`;
            }
        } else {
            const nodeA = this._compareA;
            const nodeB = nodeId;
            this._compareA = null;
            this.showComparison(nodeA, nodeB);
        }
    }

    showComparison(nodeIdA, nodeIdB) {
        const effectsA = this.logic.getLesionEffects(nodeIdA);
        const effectsB = this.logic.getLesionEffects(nodeIdB);
        if (!effectsA || !effectsB) return;

        const musclesA = new Set(effectsA.affectedMuscles);
        const musclesB = new Set(effectsB.affectedMuscles);

        const shared = [...musclesA].filter(m => musclesB.has(m)).sort();
        const onlyA = [...musclesA].filter(m => !musclesB.has(m)).sort();
        const onlyB = [...musclesB].filter(m => !musclesA.has(m)).sort();

        // Highlight both on diagram
        const allNodes = new Set([
            ...this.logic.findDescendants(nodeIdA),
            ...this.logic.findDescendants(nodeIdB)
        ]);
        this.renderer.highlightPath(allNodes);

        const panel = document.getElementById('plexus-info-panel');
        if (!panel) return;
        panel.style.display = 'block';

        panel.innerHTML = `
            <div style="position:relative;">
                <button onclick="this.parentElement.parentElement.style.display='none'; window.appComponents?.plexus?.renderer?.resetHighlight(); window.appComponents.plexus._compareA=null;"
                    style="position:absolute;top:0;right:0;background:#ef4444;color:white;border:none;width:28px;height:28px;border-radius:50%;cursor:pointer;font-weight:bold;font-size:14px;">x</button>
                <h3 style="color:#1e293b;margin:0 0 12px;">Comparison</h3>
                <div style="display:flex;gap:8px;margin-bottom:14px;">
                    <div style="flex:1;background:#eff6ff;padding:10px;border-radius:8px;text-align:center;border:2px solid #3b82f6;">
                        <div style="font-weight:700;color:#1e40af;font-size:0.9rem;">${effectsA.node.label}</div>
                        <div style="color:#3b82f6;font-size:0.75rem;">${effectsA.node.type} | ${musclesA.size} muscles</div>
                    </div>
                    <div style="display:flex;align-items:center;font-weight:700;color:#94a3b8;">vs</div>
                    <div style="flex:1;background:#faf5ff;padding:10px;border-radius:8px;text-align:center;border:2px solid #8b5cf6;">
                        <div style="font-weight:700;color:#6b21a8;font-size:0.9rem;">${effectsB.node.label}</div>
                        <div style="color:#8b5cf6;font-size:0.75rem;">${effectsB.node.type} | ${musclesB.size} muscles</div>
                    </div>
                </div>

                <div style="margin-bottom:10px;">
                    <div style="font-weight:700;font-size:0.82rem;color:#64748b;margin-bottom:4px;">Key Differences</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:0.78rem;">
                        <div style="background:#eff6ff;padding:6px 8px;border-radius:6px;border:1px solid #bfdbfe;">
                            <strong>SNAPs:</strong> ${effectsA.isPreganglionic ? 'Preserved' : 'Absent'}
                        </div>
                        <div style="background:#faf5ff;padding:6px 8px;border-radius:6px;border:1px solid #e9d5ff;">
                            <strong>SNAPs:</strong> ${effectsB.isPreganglionic ? 'Preserved' : 'Absent'}
                        </div>
                        <div style="background:#eff6ff;padding:6px 8px;border-radius:6px;border:1px solid #bfdbfe;">
                            <strong>Paraspinals:</strong> ${effectsA.isPreganglionic ? 'Abnormal' : 'Normal'}
                        </div>
                        <div style="background:#faf5ff;padding:6px 8px;border-radius:6px;border:1px solid #e9d5ff;">
                            <strong>Paraspinals:</strong> ${effectsB.isPreganglionic ? 'Abnormal' : 'Normal'}
                        </div>
                    </div>
                </div>

                ${shared.length > 0 ? `
                <div style="margin-bottom:8px;">
                    <div style="font-weight:700;font-size:0.78rem;color:#059669;margin-bottom:4px;">Shared (${shared.length})</div>
                    <div style="font-size:0.75rem;color:#065f46;background:#f0fdf4;padding:8px;border-radius:6px;border:1px solid #bbf7d0;max-height:100px;overflow-y:auto;">${shared.join(', ')}</div>
                </div>` : ''}

                ${onlyA.length > 0 ? `
                <div style="margin-bottom:8px;">
                    <div style="font-weight:700;font-size:0.78rem;color:#1e40af;margin-bottom:4px;">Only ${effectsA.node.label} (${onlyA.length})</div>
                    <div style="font-size:0.75rem;color:#1e3a5f;background:#eff6ff;padding:8px;border-radius:6px;border:1px solid #bfdbfe;max-height:100px;overflow-y:auto;">${onlyA.join(', ')}</div>
                </div>` : ''}

                ${onlyB.length > 0 ? `
                <div style="margin-bottom:8px;">
                    <div style="font-weight:700;font-size:0.78rem;color:#6b21a8;margin-bottom:4px;">Only ${effectsB.node.label} (${onlyB.length})</div>
                    <div style="font-size:0.75rem;color:#4c1d95;background:#faf5ff;padding:8px;border-radius:6px;border:1px solid #e9d5ff;max-height:100px;overflow-y:auto;">${onlyB.join(', ')}</div>
                </div>` : ''}
            </div>
        `;
    }

    // Feature 3: Muscle Search
    searchMuscle(query) {
        const dropdown = document.getElementById('plexus-search-results');
        if (!dropdown) return;

        if (!query || query.length < 2) {
            dropdown.style.display = 'none';
            this.renderer.resetHighlight();
            return;
        }

        const q = query.toLowerCase();
        const matches = Object.keys(MUSCLE_DETAILS).filter(m => m.toLowerCase().includes(q)).slice(0, 8);

        if (matches.length === 0) {
            dropdown.style.display = 'none';
            return;
        }

        dropdown.style.display = 'block';
        dropdown.innerHTML = matches.map(m => {
            const d = MUSCLE_DETAILS[m];
            return `<div style="padding:8px 12px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:0.85rem;"
                         onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='white'"
                         onclick="window.appComponents?.plexus?.selectMuscleSearch('${m.replace(/'/g, "\\'")}')">
                <strong style="color:#1e293b;">${m}</strong>
                <span style="color:#64748b;font-size:0.78rem;margin-left:6px;">${d.root}</span>
            </div>`;
        }).join('');
    }

    selectMuscleSearch(muscleName) {
        const dropdown = document.getElementById('plexus-search-results');
        if (dropdown) dropdown.style.display = 'none';
        const input = document.getElementById('plexus-muscle-search');
        if (input) input.value = muscleName;

        // Find the terminal nerve node that contains this muscle
        let targetNodeId = null;
        for (const [id, node] of this.logic.nodeMap) {
            if (node.muscles && node.muscles.some(m => m.toLowerCase() === muscleName.toLowerCase())) {
                targetNodeId = id;
                break;
            }
        }

        if (targetNodeId) {
            const path = this.logic.findAncestors(targetNodeId);
            this.renderer.animatePath(path);

            // Show muscle info in panel
            const node = this.logic.nodeMap.get(targetNodeId);
            this.showNodeInfo(node);
        }
    }

    showNodeInfo(node) {
        const panel = document.getElementById('plexus-info-panel');
        if (!panel || !node) return;

        panel.style.display = 'block';
        let html = `<h3 style="color: #1e293b; margin-bottom: 5px;">${node.label}</h3>
                    <p style="text-transform: capitalize; color: #64748b; font-size: 0.85em; font-weight: 600; margin-bottom: 20px; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                        SEGMENT TYPE: ${node.level > 0 ? (node.type || 'Structure') : 'SPINAL ROOT'}
                    </p>`;

        if (node.description) {
            html += `<p style="font-size: 0.95em; color: #475569; line-height: 1.6; margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 12px; border-left: 4px solid #3b82f6;">${node.description}</p>`;
        }

        if (node.muscles && node.muscles.length > 0) {
            html += `<div style="margin-top: 15px;">
                        <strong style="color: #1e293b; font-size: 0.9em; display: block; margin-bottom: 10px;">Primary Motor Innervation:</strong>
                        <div style="margin: 0;">`;
            node.muscles.forEach(m => {
                const detail = MUSCLE_DETAILS[m];
                if (detail) {
                    html += `<div style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                                <div style="font-weight: 600; color: #1e293b; font-size: 0.9em;">${m}</div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
                                    <span style="color: #64748b; font-size: 0.8em;">${detail.action}</span>
                                    <span style="background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; font-size: 0.7em; font-weight: 600; white-space: nowrap; margin-left: 8px;">${detail.root}</span>
                                </div>
                                <div style="color: #94a3b8; font-size: 0.75em; margin-top: 2px; font-style: italic;">Test: ${detail.test}</div>
                            </div>`;
                } else {
                    html += `<div style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                                <div style="font-weight: 600; color: #1e293b; font-size: 0.9em;">${m}</div>
                            </div>`;
                }
            });
            html += `</div></div>`;
        }

        panel.innerHTML = html;
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 15px; right: 15px; background: #f1f5f9; border: none; width: 28px; height: 28px; border-radius: 50%; font-size: 14px; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; transition: all 0.2s;';
        closeBtn.onclick = () => {
            panel.style.display = 'none';
            this.renderer.resetHighlight();
        };
        panel.appendChild(closeBtn);
    }

    showLesionInfo(effects) {
        const panel = document.getElementById('plexus-info-panel');
        if (!panel || !effects) return;

        panel.style.display = 'block';
        let html = `<h3 style="color: #1e293b; margin-bottom: 5px;">Lesion: ${effects.node.label}</h3>
                    <div style="background: #fef2f2; border: 1px solid #fee2e2; padding: 12px; border-radius: 10px; margin-bottom: 20px;">
                        <div style="color: #dc2626; font-weight: 800; font-size: 0.75em; text-transform: uppercase; letter-spacing: 0.1em;">Damage Simulation</div>
                    </div>`;

        html += `<div style="margin-bottom: 25px;">
                    <div style="font-weight: 700; font-size: 0.9em; margin-bottom: 10px; color: #1e293b;">Prognostic Impact:</div>
                    <div style="display: grid; gap: 8px;">
                        <div style="background: white; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; font-size: 0.85em;">
                            <span style="color: #64748b; font-weight: 600;">Sensory:</span> ${effects.sensoryPrognosis}
                        </div>
                        <div style="background: white; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; font-size: 0.85em;">
                            <span style="color: #64748b; font-weight: 600;">Motor:</span> ${effects.motorPrognosis}
                        </div>
                    </div>
                </div>`;

        if (effects.affectedMuscles && effects.affectedMuscles.length > 0) {
            html += `<div>
                        <strong style="color: #dc2626; font-size: 0.9em; display: block; margin-bottom: 10px;">Compromised Myotomes:</strong>
                        <div style="max-height: 350px; overflow-y: auto; padding-right: 5px;">`;
            effects.affectedMuscles.forEach(m => {
                const detail = MUSCLE_DETAILS[m];
                if (detail) {
                    html += `<div style="margin-bottom: 6px; padding: 8px 12px; background: #fff1f2; border-radius: 8px; border-left: 3px solid #f43f5e;">
                                <div style="font-weight: 600; color: #9f1239; font-size: 0.85em;">${m}</div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
                                    <span style="color: #be123c; font-size: 0.78em;">${detail.action}</span>
                                    <span style="background: #fecdd3; color: #9f1239; padding: 1px 6px; border-radius: 4px; font-size: 0.7em; font-weight: 600; white-space: nowrap; margin-left: 8px;">${detail.root}</span>
                                </div>
                                <div style="color: #e11d48; font-size: 0.73em; margin-top: 2px; font-style: italic; opacity: 0.8;">Test: ${detail.test}</div>
                            </div>`;
                } else {
                    html += `<div style="margin-bottom: 6px; font-size: 0.85em; padding: 8px 12px; background: #fff1f2; color: #9f1239; border-radius: 8px; border-left: 3px solid #f43f5e;">${m}</div>`;
                }
            });
            html += `</div></div>`;
        }

        // Feature 6: EMG Prediction Overlay
        if (effects.predictedEMG) {
            const emg = effects.predictedEMG;
            const ncs = effects.predictedNCS;
            html += `
                <div style="margin-top: 20px; border-top: 2px solid #e2e8f0; padding-top: 15px;">
                    <strong style="color: #1e40af; font-size: 0.9em; display: block; margin-bottom: 10px;">Predicted EDX Findings</strong>
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                        <div style="font-weight: 700; font-size: 0.78em; color: #1e40af; text-transform: uppercase; margin-bottom: 6px;">NCS Prediction</div>
                        <div style="font-size: 0.82em; color: #1e3a5f; line-height: 1.6;">
                            <strong>SNAPs:</strong> ${ncs.snapStatus}<br>
                            <strong>CMAPs:</strong> ${ncs.cmapStatus}<br>
                            <strong>F-waves:</strong> ${ncs.fWaves}
                        </div>
                    </div>
                    <div style="background: #faf5ff; border: 1px solid #e9d5ff; padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                        <div style="font-weight: 700; font-size: 0.78em; color: #6b21a8; text-transform: uppercase; margin-bottom: 6px;">EMG Prediction</div>
                        <div style="font-size: 0.82em; color: #4c1d95; line-height: 1.6;">
                            <strong>Paraspinals:</strong> ${emg.paraspinalExpected ? 'ABNORMAL (fibs/PSWs -- confirms root-level)' : 'Normal (post-ganglionic spares paraspinals)'}<br>
                            <strong>Denervated:</strong> ${emg.denervatedMuscles.length} muscles<br>
                            ${emg.sparedMuscles.length > 0 ? `<strong>Spared:</strong> ${emg.sparedMuscles.slice(0, 5).join(', ')}${emg.sparedMuscles.length > 5 ? ` (+${emg.sparedMuscles.length - 5} more)` : ''}<br>` : ''}
                        </div>
                    </div>
                    <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 10px; border-radius: 8px; font-size: 0.78em; color: #92400e; line-height: 1.5;">
                        <strong>Timeline:</strong> ${emg.timeline}
                    </div>
                </div>
            `;
        }

        panel.innerHTML = html;
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = 'position: absolute; top: 15px; right: 15px; background: #f1f5f9; border: none; width: 28px; height: 28px; border-radius: 50%; font-size: 14px; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; transition: all 0.2s;';
        closeBtn.onclick = () => {
            panel.style.display = 'none';
            this.renderer.resetHighlight();
        };
        panel.appendChild(closeBtn);
    }

    zoomIn() { if (this.renderer) this.renderer.zoomIn(); }
    zoomOut() { if (this.renderer) this.renderer.zoomOut(); }
    zoomReset() {
        if (this.renderer && this.dataCache[this.currentPlexus]) {
            this.renderer.zoomReset(this.dataCache[this.currentPlexus].nodes);
        }
    }

    setMode(mode) {
        this.mode = mode;
        this.selectedWeakMuscles = new Set();
        const btns = document.querySelectorAll('.mode-btn');
        btns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-mode') === mode);
        });
        this.renderer.resetHighlight();

        this._compareA = null; // Reset compare state
        if (mode === 'buildcase') {
            this.showBuildCasePanel();
        } else if (mode === 'compare') {
            const panel = document.getElementById('plexus-info-panel');
            if (panel) {
                panel.style.display = 'block';
                panel.innerHTML = `<h3 style="color:#1e293b;">Compare Mode</h3>
                    <p style="color:#64748b;font-size:0.85rem;">Click any two structures to compare their downstream effects side-by-side.</p>
                    <p style="color:#94a3b8;font-size:0.82rem;">Example: Compare Upper Trunk vs C5 Root to see what differs.</p>`;
            }
        } else {
            const panel = document.getElementById('plexus-info-panel');
            if (panel) panel.style.display = 'none';
        }
    }

    // Feature 5: Build a Case
    showBuildCasePanel() {
        const panel = document.getElementById('plexus-info-panel');
        if (!panel) return;
        panel.style.display = 'block';

        // Get muscles relevant to current plexus
        const currentNodes = this.dataCache[this.currentPlexus]?.nodes || [];
        const plexusMuscles = new Set();
        currentNodes.forEach(n => { if (n.muscles) n.muscles.forEach(m => plexusMuscles.add(m)); });

        const muscleList = [...plexusMuscles].sort();

        panel.innerHTML = `
            <div style="position: relative;">
                <button onclick="this.parentElement.parentElement.style.display='none'; window.appComponents?.plexus?.renderer?.resetHighlight();"
                    style="position:absolute;top:0;right:0;background:#ef4444;color:white;border:none;width:28px;height:28px;border-radius:50%;cursor:pointer;font-weight:bold;font-size:14px;">x</button>
                <h3 style="color:#1e293b;margin:0 0 5px;">Build a Case</h3>
                <p style="color:#64748b;font-size:0.82rem;margin:0 0 12px;border-bottom:1px solid #f1f5f9;padding-bottom:8px;">Select muscles that are WEAK, then click Analyze to find the lesion site.</p>
                <div style="max-height:300px;overflow-y:auto;margin-bottom:12px;">
                    ${muscleList.map(m => `
                        <div class="bc-muscle-item" data-muscle="${m}" onclick="window.appComponents?.plexus?.toggleBuildCaseMuscle(this, '${m.replace(/'/g, "\\'")}')"
                             style="padding:6px 10px;margin:3px 0;border-radius:8px;cursor:pointer;font-size:0.82rem;border:1px solid #e2e8f0;transition:all 0.2s;display:flex;justify-content:space-between;align-items:center;">
                            <span>${m}</span>
                            <span class="bc-status" style="font-size:0.72rem;font-weight:700;color:#94a3b8;">--</span>
                        </div>
                    `).join('')}
                </div>
                <button onclick="window.appComponents?.plexus?.analyzeBuildCase()"
                    style="width:100%;padding:10px;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:white;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:0.95rem;">
                    Analyze Lesion Site
                </button>
                <div id="bc-result" style="margin-top:12px;"></div>
            </div>
        `;
    }

    toggleBuildCaseMuscle(el, muscleName) {
        if (!this.selectedWeakMuscles) this.selectedWeakMuscles = new Set();
        const status = el.querySelector('.bc-status');

        if (this.selectedWeakMuscles.has(muscleName)) {
            this.selectedWeakMuscles.delete(muscleName);
            el.style.background = 'white';
            el.style.borderColor = '#e2e8f0';
            if (status) { status.textContent = '--'; status.style.color = '#94a3b8'; }
        } else {
            this.selectedWeakMuscles.add(muscleName);
            el.style.background = '#fef2f2';
            el.style.borderColor = '#fca5a5';
            if (status) { status.textContent = 'WEAK'; status.style.color = '#dc2626'; }
        }
    }

    analyzeBuildCase() {
        if (!this.selectedWeakMuscles || this.selectedWeakMuscles.size === 0) {
            document.getElementById('bc-result').innerHTML = '<p style="color:#94a3b8;text-align:center;font-size:0.85rem;">Select at least one weak muscle first.</p>';
            return;
        }

        const result = this.logic.findCommonLesionSite([...this.selectedWeakMuscles]);
        const resultDiv = document.getElementById('bc-result');

        if (!result || !result.nodeId) {
            resultDiv.innerHTML = `<div style="background:#fef2f2;padding:12px;border-radius:10px;border:1px solid #fca5a5;color:#dc2626;font-size:0.85rem;">${result?.explanation || 'Could not determine lesion site.'}</div>`;
            return;
        }

        // Highlight the lesion site and its descendants
        const descendants = this.logic.findDescendants(result.nodeId);
        this.renderer.highlightPath(descendants);

        resultDiv.innerHTML = `
            <div style="background:#f0fdf4;padding:14px;border-radius:10px;border:1px solid #bbf7d0;">
                <strong style="color:#166534;font-size:0.95rem;">Lesion Site: ${result.node.label}</strong>
                <p style="color:#15803d;font-size:0.82rem;margin:6px 0 0;line-height:1.5;">${result.explanation}</p>
                ${result.unexplainedMuscles?.length > 0 ? `<p style="color:#dc2626;font-size:0.78rem;margin:6px 0 0;">Unexplained: ${result.unexplainedMuscles.join(', ')}</p>` : ''}
            </div>
        `;
    }

    getHTMLContent() {
        return `
            <div class="plexus-tool-container" style="height: 85vh; min-height: 0; display: flex; flex-direction: column; background: #f1f5f9; font-family: 'Inter', sans-serif;">
                <!-- Main Tab Navigation -->
                <div class="plexus-main-tabs" style="background: white; padding: 10px 20px 0 20px; border-bottom: 1px solid #e2e8f0; display: flex; gap: 30px;">
                    <div id="tab-anatomy" data-action="plexusSwitchView" data-view="anatomy" class="plexus-tab active">
                        Interactive Anatomy
                    </div>
                    <div id="tab-clinical" data-action="plexusSwitchView" data-view="clinical" class="plexus-tab">
                        Clinical Pathophysiology
                    </div>
                </div>

                <!-- View Container: Anatomy -->
                <div id="plexus-anatomy-view" style="flex-grow: 1; display: flex; flex-direction: column; min-height: 0;">
                    <div class="plexus-toolbar" style="padding: 12px 20px; background: white; border-bottom: 1px solid #f1f5f9; display: flex; gap: 15px; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);">
                        <div style="background: #f8fafc; padding: 4px 8px; border-radius: 10px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 0.75em; font-weight: 700; color: #64748b; text-transform: uppercase; padding-left: 5px;">Network:</span>
                            <select id="plexus-select" onchange="window.appComponents.plexus.switchPlexus(this.value)" 
                                    style="padding: 6px 12px; border: none; background: transparent; font-weight: 600; color: #1e293b; outline: none; cursor: pointer;">
                                <option value="brachial">Brachial Plexus</option>
                                <option value="lumbosacral">Lumbosacral Plexus</option>
                            </select>
                        </div>
                        
                        <div class="mode-toggles" style="background: #f1f5f9; padding: 4px; border-radius: 12px; display: flex; gap: 4px;">
                            <button data-action="plexusSetMode" data-mode="discovery" class="mode-btn active">Pathfinding</button>
                            <button data-action="plexusSetMode" data-mode="lesion" class="mode-btn">Lesion Simulator</button>
                            <button data-action="plexusSetMode" data-mode="buildcase" class="mode-btn">Build a Case</button>
                            <button data-action="plexusSetMode" data-mode="compare" class="mode-btn">Compare</button>
                        </div>
                        
                        <!-- Muscle Search -->
                        <div style="position: relative; flex: 0 0 200px;">
                            <input type="text" id="plexus-muscle-search" placeholder="Search muscles..."
                                   oninput="window.appComponents?.plexus?.searchMuscle(this.value)"
                                   style="width:100%;padding:7px 10px 7px 30px;border:1px solid #e2e8f0;border-radius:8px;font-size:0.82rem;outline:none;box-sizing:border-box;"
                                   onfocus="this.style.borderColor='#8b5cf6'" onblur="this.style.borderColor='#e2e8f0'">
                            <svg style="position:absolute;left:8px;top:50%;transform:translateY(-50%);color:#94a3b8;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <div id="plexus-search-results" style="display:none;position:absolute;top:100%;left:0;right:0;background:white;border:1px solid #e2e8f0;border-radius:8px;max-height:200px;overflow-y:auto;z-index:50;box-shadow:0 8px 24px rgba(0,0,0,0.12);margin-top:4px;"></div>
                        </div>

                        <div style="flex-grow: 1;"></div>
                        <div class="legend" style="display: flex; gap: 12px; font-size: 0.72em; font-weight: 700; color: #94a3b8; text-transform: uppercase;">
                            <span style="display: flex; align-items: center; gap: 4px;"><span style="width:8px; height:8px; border-radius:50%; background:#3498db"></span> Root</span>
                            <span style="display: flex; align-items: center; gap: 4px;"><span style="width:8px; height:8px; border-radius:50%; background:#27ae60"></span> Trunk</span>
                            <span style="display: flex; align-items: center; gap: 4px;"><span style="width:8px; height:8px; border-radius:50%; background:#e74c3c"></span> Cord</span>
                            <span style="display: flex; align-items: center; gap: 4px;"><span style="width:8px; height:8px; border-radius:50%; background:#9b59b6"></span> Nerve</span>
                        </div>
                    </div>

                    <div style="flex-grow: 1; min-height: 0; min-width: 0; display: flex; overflow: hidden; position: relative;">
                        <div id="plexus-viz-container" style="flex-grow: 1; min-height: 0; min-width: 0; background: #fdfdfd; position: relative; overflow: hidden;">
                            <div class="plexus-zoom-controls" style="position: absolute; bottom: 25px; left: 25px; display: flex; gap: 8px; z-index: 10;">
                                <button data-action="plexusZoomIn" class="control-btn">+</button>
                                <button data-action="plexusZoomOut" class="control-btn">−</button>
                                <button data-action="plexusZoomReset" class="control-btn" title="Fit to Screen">⟲</button>
                            </div>
                        </div>
                        
                        <!-- Information Side Panel -->
                        <div id="plexus-info-panel" style="display: none; width: 380px; flex-shrink: 0; overflow-y: auto; background: white; padding: 30px; border-left: 1px solid #e2e8f0; z-index: 100; position: relative; box-shadow: -10px 0 20px rgba(0,0,0,0.02);">
                            <!-- Content injected via JS -->
                        </div>
                    </div>
                </div>

                <!-- View Container: Clinical -->
                <div id="plexus-clinical-view" style="display: none; flex-grow: 1; overflow-y: auto; background: #fff;">
                    <!-- Content injected via BrachialPlexopathy.js -->
                </div>
                
                <style>
                    .plexus-tab { padding: 12px 10px; cursor: pointer; color: #94a3b8; font-weight: 700; font-size: 0.9em; border-bottom: 3px solid transparent; transition: all 0.2s; }
                    .plexus-tab:hover { color: #3b82f6; }
                    .plexus-tab.active { color: #3b82f6; border-bottom-color: #3b82f6; }
                    
                    .mode-btn { padding: 8px 16px; border: none; background: transparent; cursor: pointer; border-radius: 8px; font-weight: 700; font-size: 0.82em; color: #64748b; transition: all 0.2s; }
                    .mode-btn:hover { color: #1e293b; }
                    .mode-btn.active { background: white; color: #3b82f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
                    
                    .control-btn { width: 44px; height: 44px; border-radius: 12px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-weight: bold; font-size: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.06); color: #475569; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
                    .control-btn:hover { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; transform: translateY(-2px); }
                    
                    .nerve-link { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dash 1.5s ease-out forwards; }
                    @keyframes dash { to { stroke-dashoffset: 0; } }
                </style>
            </div>
        `;
    }

    showInteractiveAnatomy() {
        const content = this.getHTMLContent();
        if (window.showModal) {
            window.showModal('🧠 Advanced Plexus Systems', content);
            setTimeout(() => { this.initialize('plexus-viz-container'); }, 100);
        } else {
            logger.error("ViewHelpers not loaded: showModal missing");
        }
    }
}
