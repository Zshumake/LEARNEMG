/**
 * PlexusRenderer.js
 *
 * Visualization engine using D3.js (v7).
 * Renders the plexus as an interactive fixed-layout graph with animated pathfinding,
 * hover tooltips, and division prominence.
 */

import logger from '../../utils/Logger.js';
export class PlexusRenderer {
    constructor(containerId, manager) {
        this.containerId = containerId;
        this.manager = manager;
        this.width = 0;
        this.height = 0;
        this.simulation = null;
        this.svg = null;
        this.g = null;
        this.tooltip = null;
        this._animationTimers = [];
    }

    initialize() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            logger.error('Renderer: Container not found', this.containerId);
            return;
        }

        this.width = container.clientWidth || 800;
        this.height = container.clientHeight || 600;

        container.innerHTML = '';

        // Tooltip div (outside SVG for proper layering)
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'plexus-tooltip';
        this.tooltip.style.cssText = 'position:absolute;display:none;background:#1e293b;color:#f8fafc;padding:10px 14px;border-radius:10px;font-size:12px;line-height:1.5;max-width:240px;pointer-events:none;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,0.25);';
        container.style.position = 'relative';
        container.appendChild(this.tooltip);

        // Zoom behavior
        this.zoomBehavior = d3.zoom()
            .scaleExtent([0.0001, 10])
            .on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });

        // SVG
        this.svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, this.width, this.height])
            .call(this.zoomBehavior)
            .on("dblclick.zoom", null)
            .on("click", (event) => event.stopPropagation());

        // Inject pulse animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes plexus-pulse { 0%,100% { filter: none; } 50% { filter: drop-shadow(0 0 8px #f1c40f); } }
            .plexus-node-pulse circle { animation: plexus-pulse 0.6s ease-in-out; }
        `;
        container.appendChild(style);

        this.g = this.svg.append('g');
        this.linkGroup = this.g.append('g').attr('class', 'links');
        this.nodeGroup = this.g.append('g').attr('class', 'nodes');
        this.simulation = null;
    }

    zoomIn() {
        if (this.svg) this.svg.transition().duration(250).call(this.zoomBehavior.scaleBy, 1.3);
    }

    zoomOut() {
        if (this.svg) this.svg.transition().duration(250).call(this.zoomBehavior.scaleBy, 0.7);
    }

    zoomReset(nodes) {
        if (nodes) this.fitToScreen(nodes);
    }

    resize(width, height) {
        if (!width || !height || width === 0 || height === 0) return;
        this.width = width;
        this.height = height;
        if (this.svg && this.zoomBehavior) {
            this.svg.attr('viewBox', [0, 0, this.width, this.height]);
            this.zoomBehavior.extent([[0, 0], [this.width, this.height]]);
        }
    }

    render(graphData) {
        if (!this.svg) this.initialize();

        const nodes = graphData.nodes.map(d => Object.create(d));
        const links = graphData.links.map(d => Object.create(d));

        this.computeLayout(nodes);

        this.linkGroup.selectAll('*').remove();
        this.nodeGroup.selectAll('*').remove();

        // Links (Bezier curves)
        const linkGen = d3.linkHorizontal().x(d => d.x).y(d => d.y);

        const link = this.linkGroup.selectAll('path')
            .data(links)
            .join('path')
            .attr('class', 'nerve-link')
            .attr('d', d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                const targetNode = nodes.find(n => n.id === d.target);
                if (sourceNode && targetNode) return linkGen({ source: sourceNode, target: targetNode });
                return "";
            })
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', 4)
            .attr('fill', 'none');

        // Nodes
        const node = this.nodeGroup.selectAll('g')
            .data(nodes)
            .join('g')
            .attr('class', 'nerve-node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                event.stopPropagation();
                this.manager.handleNodeClick(d.id);
            })
            .on('mouseover', (event, d) => this.showTooltip(event, d))
            .on('mouseout', () => this.hideTooltip());

        // Feature 4: Division Node Prominence
        node.append('circle')
            .attr('r', d => d.type === 'division' ? 22 : 20)
            .attr('fill', d => {
                if (d.type === 'division' && d.label.toLowerCase().includes('post')) {
                    return 'transparent'; // Hollow for posterior
                }
                return this.getNodeColor(d.type);
            })
            .attr('stroke', d => {
                if (d.type === 'division') return this.getNodeColor('division');
                return '#fff';
            })
            .attr('stroke-width', d => {
                if (d.type === 'division' && d.label.toLowerCase().includes('post')) return 3;
                return 2;
            });

        // Label group
        const labelGroup = node.append('g').attr('transform', 'translate(0, 30)');

        labelGroup.append('rect')
            .attr('x', d => -(d.label.length * 4) - 5)
            .attr('y', -12)
            .attr('width', d => (d.label.length * 8) + 10)
            .attr('height', 18)
            .attr('rx', 4)
            .attr('fill', 'rgba(255,255,255,0.85)')
            .attr('stroke', '#eee')
            .style('pointer-events', 'none');

        labelGroup.append('text')
            .attr('text-anchor', 'middle')
            .text(d => d.label)
            .attr('font-size', '11px')
            .attr('font-weight', '500')
            .attr('fill', '#333')
            .style('pointer-events', 'none');

        this.nodeSelection = node;
        this.linkSelection = link;
        this._nodes = nodes;

        this.fitToScreen(nodes);
    }

    // --- Feature 2: Hover Tooltips ---

    showTooltip(event, d) {
        if (!this.tooltip) return;
        let content = `<strong style="color:#f1c40f;">${d.label}</strong><br><span style="color:#94a3b8;font-size:11px;text-transform:uppercase;">${d.type}</span>`;

        if (d.muscles && d.muscles.length > 0) {
            const top3 = d.muscles.slice(0, 3);
            content += `<hr style="border:none;border-top:1px solid #334155;margin:6px 0;">`;
            content += `<span style="color:#a5b4fc;font-size:11px;">Key muscles:</span><br>`;
            content += top3.map(m => `<span style="color:#e2e8f0;">${m}</span>`).join('<br>');
            if (d.muscles.length > 3) content += `<br><span style="color:#64748b;font-size:10px;">+${d.muscles.length - 3} more</span>`;
        }
        if (d.description) {
            content += `<hr style="border:none;border-top:1px solid #334155;margin:6px 0;">`;
            content += `<span style="color:#cbd5e1;font-size:11px;">${d.description}</span>`;
        }

        this.tooltip.innerHTML = content;
        this.tooltip.style.display = 'block';

        // Position near the node
        const container = document.getElementById(this.containerId);
        const rect = container.getBoundingClientRect();
        const svgRect = container.querySelector('svg').getBoundingClientRect();
        this.tooltip.style.left = `${event.clientX - rect.left + 15}px`;
        this.tooltip.style.top = `${event.clientY - rect.top - 10}px`;
    }

    hideTooltip() {
        if (this.tooltip) this.tooltip.style.display = 'none';
    }

    // --- Feature 1: Animated Pathfinding ---

    animatePath(nodeIds) {
        // Clear any running animation
        this._animationTimers.forEach(t => clearTimeout(t));
        this._animationTimers = [];

        // Sort by level (root first -> terminal last)
        const nodesArray = this._nodes || [];
        const ordered = [...nodeIds].sort((a, b) => {
            const nodeA = nodesArray.find(n => n.id === a);
            const nodeB = nodesArray.find(n => n.id === b);
            return ((nodeA?.level || 0) - (nodeB?.level || 0));
        });

        // Dim everything
        this.nodeSelection.attr('opacity', 0.15);
        this.linkSelection.attr('opacity', 0.05);

        // Stagger highlights
        const highlightedSoFar = new Set();
        ordered.forEach((id, i) => {
            const timer = setTimeout(() => {
                highlightedSoFar.add(id);

                // Highlight this node
                this.nodeSelection.filter(d => d.id === id)
                    .attr('opacity', 1)
                    .classed('plexus-node-pulse', true)
                    .select('circle')
                    .attr('stroke', '#f1c40f')
                    .attr('stroke-width', 4);

                // Highlight links connecting to already-highlighted nodes
                this.linkSelection.filter(d => {
                    const srcId = typeof d.source === 'object' ? d.source.id : d.source;
                    const tgtId = typeof d.target === 'object' ? d.target.id : d.target;
                    return highlightedSoFar.has(srcId) && highlightedSoFar.has(tgtId);
                })
                    .attr('opacity', 1)
                    .attr('stroke', '#f1c40f')
                    .attr('stroke-width', 6);
            }, 250 * i);
            this._animationTimers.push(timer);
        });
    }

    // Instant highlight (for lesion mode -- no animation needed)
    highlightPath(nodeIds) {
        this._animationTimers.forEach(t => clearTimeout(t));
        this._animationTimers = [];

        this.nodeSelection.attr('opacity', 0.3);
        this.linkSelection.attr('opacity', 0.1);

        this.nodeSelection.filter(d => nodeIds.has(d.id))
            .attr('opacity', 1)
            .select('circle')
            .attr('stroke', '#f1c40f')
            .attr('stroke-width', 4);

        this.linkSelection.filter(d => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetId = typeof d.target === 'object' ? d.target.id : d.target;
            return nodeIds.has(sourceId) && nodeIds.has(targetId);
        })
            .attr('opacity', 1)
            .attr('stroke', '#f1c40f')
            .attr('stroke-width', 6);
    }

    resetHighlight() {
        this._animationTimers.forEach(t => clearTimeout(t));
        this._animationTimers = [];

        this.nodeSelection
            .attr('opacity', 1)
            .classed('plexus-node-pulse', false)
            .select('circle')
            .attr('stroke', d => {
                if (d.type === 'division') return this.getNodeColor('division');
                return '#fff';
            })
            .attr('stroke-width', d => {
                if (d.type === 'division' && d.label.toLowerCase().includes('post')) return 3;
                return 2;
            });

        this.linkSelection.attr('opacity', 0.6)
            .attr('stroke', '#999')
            .attr('stroke-width', 4);
    }

    computeLayout(nodes) {
        const levels = {};
        let maxLevel = 0;
        nodes.forEach(node => {
            const lvl = node.level || 0;
            if (!levels[lvl]) levels[lvl] = [];
            levels[lvl].push(node);
            if (lvl > maxLevel) maxLevel = lvl;
        });

        const columnSpacing = 220;
        const rowSpacing = 60;

        Object.keys(levels).forEach(lvl => {
            levels[lvl].forEach(node => {
                node.x = (parseFloat(lvl) * columnSpacing) + 100;
                if (node.row !== undefined) {
                    node.y = (node.row * rowSpacing) + 50;
                } else {
                    const numNodes = levels[lvl].length;
                    const levelHeight = (numNodes - 1) * rowSpacing;
                    const index = levels[lvl].indexOf(node);
                    node.y = (this.height / 2) - (levelHeight / 2) + (index * rowSpacing);
                }
            });
        });
    }

    fitToScreen(nodes, instant = false) {
        if (!nodes || nodes.length === 0) return;
        if (!this.width || !this.height || this.width <= 0 || this.height <= 0) return;

        let minX = d3.min(nodes, d => d.x);
        let maxX = d3.max(nodes, d => d.x);
        let minY = d3.min(nodes, d => d.y);
        let maxY = d3.max(nodes, d => d.y);

        minX -= 150; maxX += 150;
        minY -= 150; maxY += 180;

        const w = maxX - minX;
        const h = maxY - minY;
        if (w <= 0 || h <= 0) return;

        const scale = Math.min(this.width / w, this.height / h) * 0.85;
        if (isNaN(scale) || scale === Infinity || scale === -Infinity) return;

        const xOffset = (this.width - (w * scale)) / 2 - (minX * scale);
        const yOffset = (this.height - (h * scale)) / 2 - (minY * scale);
        if (isNaN(xOffset) || isNaN(yOffset)) return;

        const transform = d3.zoomIdentity.translate(xOffset, yOffset).scale(scale);
        if (instant) {
            this.svg.call(this.zoomBehavior.transform, transform);
        } else {
            this.svg.transition().duration(750).call(this.zoomBehavior.transform, transform);
        }
    }

    getNodeColor(type) {
        switch (type) {
            case 'root': return '#3498db';
            case 'trunk': return '#27ae60';
            case 'division': return '#f39c12';
            case 'cord': return '#e74c3c';
            case 'nerve': return '#9b59b6';
            case 'branch': return '#8e44ad';
            default: return '#95a5a6';
        }
    }

    setupZoom() { /* Handled in initialize */ }
}
