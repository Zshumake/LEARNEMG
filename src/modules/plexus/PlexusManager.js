import { PlexusLogic } from './PlexusLogic.js';
import { PlexusRenderer } from './PlexusRenderer.js?v=20260304-v5';
import { generatePlexopathyContent } from '../../content/pathology/BrachialPlexopathy.js?v=20260304-v5';

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
    'Extensor Hallucis Longus': { action: 'Great toe extension', root: 'L5', test: 'Resist great toe extension' },
    'Extensor Digitorum Longus': { action: 'Toe extension', root: 'L5', test: 'Resist toe extension' },
    'Peroneus Longus': { action: 'Foot eversion, plantar flexion', root: 'L5-S1', test: 'Resist foot eversion' },
    'Peroneus Brevis': { action: 'Foot eversion', root: 'L5-S1', test: 'Resist foot eversion' },
    'Extensor Digitorum Brevis': { action: 'Toe extension (intrinsic)', root: 'L5-S1', test: 'Observe EDB bulk on dorsum of foot' },
    'Gastrocnemius': { action: 'Ankle plantar flexion (knee extended)', root: 'S1-S2', test: 'Single leg heel raise' },
    'Soleus': { action: 'Ankle plantar flexion (knee flexed)', root: 'S1-S2', test: 'Resist plantar flexion with knee bent' },
    'Tibialis Posterior': { action: 'Ankle inversion, plantar flexion', root: 'L4-L5', test: 'Resist foot inversion (critical L5 vs peroneal test)' },
    'Quadriceps': { action: 'Knee extension', root: 'L2-L4', test: 'Resist knee extension' },
    'Iliopsoas': { action: 'Hip flexion', root: 'L1-L3', test: 'Resist hip flexion in seated position' },
    'Adductors': { action: 'Hip adduction', root: 'L2-L4', test: 'Resist hip adduction (squeeze knees together)' },
    'Gluteus Medius': { action: 'Hip abduction', root: 'L4-S1', test: 'Trendelenburg test (single leg stance)' },
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
    }

    async initialize(containerId, initialPlexus = null) {
        console.log('🚀 PlexusManager: Initializing...');

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

            console.log('✅ PlexusManager: Initialization complete');
            return true;
        } catch (error) {
            console.error('❌ PlexusManager: Init failed', error);
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
            console.error(`Failed to load ${type} data:`, e);
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
            this.renderer.highlightPath(path);
            this.showNodeInfo(node);
        } else if (this.mode === 'lesion') {
            const descendants = this.logic.findDescendants(nodeId);
            this.renderer.highlightPath(descendants);
            const effects = this.logic.getLesionEffects(nodeId);
            this.showLesionInfo(effects);
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

    zoomIn() { if (this.renderer) this.renderer.zoomIn(); }
    zoomOut() { if (this.renderer) this.renderer.zoomOut(); }
    zoomReset() {
        if (this.renderer && this.dataCache[this.currentPlexus]) {
            this.renderer.zoomReset(this.dataCache[this.currentPlexus].nodes);
        }
    }

    setMode(mode) {
        this.mode = mode;
        const btns = document.querySelectorAll('.mode-btn');
        btns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-mode') === mode);
        });
        this.renderer.resetHighlight();
    }

    getHTMLContent() {
        return `
            <div class="plexus-tool-container" style="height: 85vh; min-height: 0; display: flex; flex-direction: column; background: #f1f5f9; font-family: 'Inter', sans-serif;">
                <!-- Main Tab Navigation -->
                <div class="plexus-main-tabs" style="background: white; padding: 10px 20px 0 20px; border-bottom: 1px solid #e2e8f0; display: flex; gap: 30px;">
                    <div id="tab-anatomy" onclick="window.appComponents.plexus.switchView('anatomy')" class="plexus-tab active">
                        Interactive Anatomy
                    </div>
                    <div id="tab-clinical" onclick="window.appComponents.plexus.switchView('clinical')" class="plexus-tab">
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
                            <button onclick="window.appComponents.plexus.setMode('discovery')" data-mode="discovery" class="mode-btn active">Pathfinding</button>
                            <button onclick="window.appComponents.plexus.setMode('lesion')" data-mode="lesion" class="mode-btn">Lesion Simulator</button>
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
                                <button onclick="window.appComponents.plexus.zoomIn()" class="control-btn">+</button>
                                <button onclick="window.appComponents.plexus.zoomOut()" class="control-btn">−</button>
                                <button onclick="window.appComponents.plexus.zoomReset()" class="control-btn" title="Fit to Screen">⟲</button>
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
            console.error("ViewHelpers not loaded: showModal missing");
        }
    }
}
