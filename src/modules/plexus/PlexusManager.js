/**
 * PlexusManager.js
 * 
 * Central coordinator for the Plexus Anatomy Tool.
 * Manages state, initializes sub-systems (Logic, Renderer), and handles user interactions.
 */

import { PlexusLogic } from './PlexusLogic.js';
import { PlexusRenderer } from './PlexusRenderer.js?v=zoomFix1';

export class PlexusManager {
    constructor() {
        this.logic = new PlexusLogic();
        this.renderer = null;
        this.currentPlexus = 'brachial';
        this.mode = 'discovery'; // 'discovery', 'lesion', 'emg'
        this.dataCache = {};
        this.initialFitDone = false;
    }

    async initialize(containerId, initialPlexus = null) {
        console.log('🚀 PlexusManager: Initializing...');

        // Initialize Renderer
        this.renderer = new PlexusRenderer(containerId, this);

        // Responsive handling for environments where modal dimensions change over time
        const container = document.getElementById(containerId);
        if (container && window.ResizeObserver) {
            if (this.resizeObserver) this.resizeObserver.disconnect();

            this.resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    if (width > 0 && height > 0 && this.renderer) {
                        // Update renderer dimensions and ViewBox
                        this.renderer.resize(width, height);

                        // Ensure graph is centered when container becomes visible
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

            // Set initial view
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
            console.log(`📦 Loaded ${type} plexus data`);
            return true; // Indicate success
        } catch (e) {
            console.error(`Failed to load ${type} data:`, e);
            return false; // Indicate failure
        }
    }

    async switchPlexus(name) {
        if (!this.dataCache[name]) {
            const success = await this.loadPlexusData(name);
            if (!success) return;
        }

        this.currentPlexus = name;
        this.initialFitDone = false; // Reset zoom initial framing for the new graph
        this.logic.loadGraph(this.dataCache[name]);

        // Notify Renderer 
        if (this.renderer) {
            this.renderer.render(this.dataCache[name]);
        }
    }

    handleNodeClick(nodeId) {
        console.log(`Select Node: ${nodeId} [Mode: ${this.mode}]`);
        const node = this.logic.nodeMap.get(nodeId);

        if (this.mode === 'discovery') {
            // Pathfinding: Highlight ancestors
            const path = this.logic.findAncestors(nodeId);
            this.renderer.highlightPath(path);
            this.showNodeInfo(node);

        } else if (this.mode === 'lesion') {
            // Lesion Logic: Highlight descendants
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

        let html = `<h3>${node.label}</h3><p style="text-transform: capitalize; color: #666; margin-bottom: 15px;">Type: ${node.level > 0 ? node.id.split('_')[0] : 'Root'}</p>`;

        if (node.description) {
            html += `<p style="font-size: 0.9em; margin-bottom: 10px;">${node.description}</p>`;
        }

        if (node.muscles && node.muscles.length > 0) {
            html += `<div style="margin-top: 15px;"><strong>Innervated Muscles:</strong><ul style="margin-top: 5px; padding-left: 20px; font-size: 0.9em;">`;
            node.muscles.forEach(m => {
                html += `<li style="margin-bottom: 3px;">${m}</li>`;
            });
            html += `</ul></div>`;
        } else if (node.type === 'nerve' || node.type === 'branch') {
            html += `<p style="font-size: 0.9em; font-style: italic; color: #888;">No primary motor innervation.</p>`;
        }

        panel.innerHTML = html;

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 16px; cursor: pointer; color: #999;';
        closeBtn.onclick = () => {
            panel.style.display = 'none';
            this.renderer.resetHighlight();
            // Trigger a fake resize to force D3 to recognize the full width again
            if (this.renderer) {
                const container = document.getElementById('plexus-viz-container');
                if (container) this.renderer.resize(container.clientWidth, container.clientHeight);
            }
        };
        panel.appendChild(closeBtn);
    }

    showLesionInfo(effects) {
        const panel = document.getElementById('plexus-info-panel');
        if (!panel || !effects) return;

        panel.style.display = 'block';

        let html = `<h3>Lesion: ${effects.node.label}</h3>`;
        html += `<p style="color: #e74c3c; font-weight: bold; margin-bottom:15px;">Simulated Damage Simulation</p>`;

        html += `<div style="font-size: 0.9em;">`;
        html += `<p><strong>Prognosis:</strong></p>`;
        html += `<ul><li>Sensory: ${effects.sensoryPrognosis}</li><li>Motor: ${effects.motorPrognosis}</li></ul>`;

        if (effects.affectedStructures.length > 0) {
            html += `<p style="margin-top: 10px;"><strong>Downstream Compromised:</strong></p>`;
            html += `<ul style="max-height: 150px; overflow-y: auto;">`;
            effects.affectedStructures.forEach(struct => {
                html += `<li>${struct}</li>`;
            });
            html += `</ul>`;
        }

        if (effects.affectedMuscles && effects.affectedMuscles.length > 0) {
            html += `<p style="margin-top: 10px; color: #d35400;"><strong>Affected Muscles:</strong></p>`;
            html += `<ul style="max-height: 150px; overflow-y: auto; padding-left: 20px; font-size: 0.9em; margin-top: 5px;">`;
            effects.affectedMuscles.forEach(m => {
                html += `<li style="margin-bottom: 3px;">${m}</li>`;
            });
            html += `</ul>`;
        }

        html += `</div>`;
        panel.innerHTML = html;

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 16px; cursor: pointer; color: #999;';
        closeBtn.onclick = () => {
            panel.style.display = 'none';
            this.renderer.resetHighlight();
            if (this.renderer) {
                const container = document.getElementById('plexus-viz-container');
                if (container) this.renderer.resize(container.clientWidth, container.clientHeight);
            }
        };
        panel.appendChild(closeBtn);
    }

    zoomIn() {
        if (this.renderer) this.renderer.zoomIn();
    }

    zoomOut() {
        if (this.renderer) this.renderer.zoomOut();
    }

    zoomReset() {
        if (this.renderer && this.dataCache[this.currentPlexus]) {
            this.renderer.zoomReset(this.dataCache[this.currentPlexus].nodes);
        }
    }

    setMode(mode) {
        this.mode = mode;
        console.log('Switched to mode:', mode);
        this.renderer.resetHighlight();
    }

    getHTMLContent() {
        return `
            <div class="plexus-tool-container" style="height: 80vh; min-height: 0; display: flex; flex-direction: column;">
                <div class="plexus-toolbar" style="padding: 10px; background: #f8f9fa; border-bottom: 1px solid #ddd; display: flex; gap: 10px; align-items: center;">
                    <select id="plexus-select" onchange="window.appComponents.plexus.switchPlexus(this.value)" style="padding: 5px; border-radius: 4px;">
                        <option value="brachial" ${this.currentPlexus === 'brachial' ? 'selected' : ''}>Brachial Plexus</option>
                        <option value="lumbosacral" ${this.currentPlexus === 'lumbosacral' ? 'selected' : ''}>Lumbosacral Plexus</option>
                    </select>
                    
                    <div class="mode-toggles">
                        <button onclick="window.appComponents.plexus.setMode('discovery')" class="mode-btn active">Discovery</button>
                        <button onclick="window.appComponents.plexus.setMode('lesion')" class="mode-btn">Lesion Simulator</button>
                    </div>
                    
                    <div style="flex-grow: 1;"></div>
                    <div class="legend" style="font-size: 0.8em; color: #666;">
                        <span style="color:#3498db">● Root</span>
                        <span style="color:#27ae60">● Trunk</span>
                        <span style="color:#e74c3c">● Cord</span>
                        <span style="color:#9b59b6">● Nerve</span>
                    </div>
                </div>

                <div style="flex-grow: 1; min-height: 0; min-width: 0; display: flex; overflow: hidden; position: relative;">
                    <div id="plexus-viz-container" style="flex-grow: 1; min-height: 0; min-width: 0; background: #fafafa; position: relative; overflow: hidden;">
                        <!-- D3 Graph will be rendered here -->
                        <div class="plexus-zoom-controls" style="position: absolute; bottom: 20px; right: 20px; display: flex; flex-direction: column; gap: 8px; z-index: 10;">
                            <button onclick="window.appComponents.plexus.zoomIn()" style="width: 36px; height: 36px; border-radius: 4px; border: 1px solid #ccc; background: white; cursor: pointer; font-weight: bold; font-size: 18px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #555; display: flex; align-items: center; justify-content: center;">+</button>
                            <button onclick="window.appComponents.plexus.zoomOut()" style="width: 36px; height: 36px; border-radius: 4px; border: 1px solid #ccc; background: white; cursor: pointer; font-weight: bold; font-size: 18px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #555; display: flex; align-items: center; justify-content: center;">−</button>
                            <button onclick="window.appComponents.plexus.zoomReset()" style="width: 36px; height: 36px; border-radius: 4px; border: 1px solid #ccc; background: white; cursor: pointer; font-size: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); color: #555; display: flex; align-items: center; justify-content: center;" title="Reset View">⟲</button>
                        </div>
                    </div>
                    
                    <!-- Information Side Panel -->
                    <div id="plexus-info-panel" style="display: none; width: 350px; flex-shrink: 0; overflow-y: auto; background: white; padding: 20px; box-shadow: -4px 0 15px rgba(0,0,0,0.05); border-left: 1px solid #eee; z-index: 100; position: relative;">
                        <!-- Content injected via JS -->
                    </div>
                </div>
                
                <style>
                    .mode-btn { padding: 5px 10px; border: 1px solid #ccc; background: white; cursor: pointer; border-radius: 4px; }
                    .mode-btn.active { background: #3498db; color: white; border-color: #2980b9; }
                    .nerve-node { cursor: pointer; }
                    .nerve-node:hover circle { stroke: #333; stroke-width: 3px; }
                </style>
            </div>
        `;
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
