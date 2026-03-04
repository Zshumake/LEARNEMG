import { PlexusLogic } from './PlexusLogic.js';
import { PlexusRenderer } from './PlexusRenderer.js?v=20260304-v5';
import { generatePlexopathyContent } from '../../content/pathology/BrachialPlexopathy.js?v=20260304-v5';

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
                        <ul style="margin: 0; padding-left: 0; list-style: none;">`;
            node.muscles.forEach(m => {
                html += `<li style="margin-bottom: 8px; font-size: 0.9em; padding: 8px 12px; background: #ecfdf5; color: #065f46; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                            <svg style="width: 14px; height: 14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            ${m}
                        </li>`;
            });
            html += `</ul></div>`;
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
                        <div style="max-height: 250px; overflow-y: auto; padding-right: 5px;">`;
            effects.affectedMuscles.forEach(m => {
                html += `<div style="margin-bottom: 6px; font-size: 0.85em; padding: 8px 12px; background: #fff1f2; color: #9f1239; border-radius: 8px; border-left: 3px solid #f43f5e;">${m}</div>`;
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

showInteractiveAnatomy() {
    const content = this.getHTMLContent();

    // The showModal function is provided globally by ViewHelpers.js
    if (window.showModal) {
        window.showModal('🧠 Interactive Plexus Anatomy', content);

        // Initialize manager visually after modal is in DOM
        setTimeout(() => {
            this.initialize('plexus-viz-container');
        }, 100);

    } else {
        console.error("ViewHelpers not loaded: showModal missing");
    }
}
}
