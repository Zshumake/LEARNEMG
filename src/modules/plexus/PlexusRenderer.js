/**
 * PlexusRenderer.js
 * 
 * Visualization engine using D3.js (v7).
 * Renders the plexus as an interactive force-directed graph.
 */

export class PlexusRenderer {
    constructor(containerId, manager) {
        this.containerId = containerId;
        this.manager = manager;
        this.width = 0;
        this.height = 0;
        this.simulation = null;
        this.svg = null;
        this.g = null; // Main group for zooming
    }

    initialize() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('Renderer: Container not found', this.containerId);
            return;
        }

        this.width = container.clientWidth || 800;
        this.height = container.clientHeight || 600;

        // Clear existing
        container.innerHTML = '';

        // Create Zoom Behavior
        this.zoomBehavior = d3.zoom()
            .scaleExtent([0.0001, 10]) // Unrestricted zoom to prevent Safari math locking
            .on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });

        // Create SVG
        this.svg = d3.select(container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, this.width, this.height])
            .call(this.zoomBehavior)
            .on("dblclick.zoom", null) // Disable annoying double-click to zoom
            .on("click", (event) => event.stopPropagation());

        // Main group
        this.g = this.svg.append('g');

        // Layers
        this.linkGroup = this.g.append('g').attr('class', 'links');
        this.nodeGroup = this.g.append('g').attr('class', 'nodes');

        // Remove force simulation setup completely as we are switching to a fixed layout
        this.simulation = null;
    }

    zoomIn() {
        if (this.svg) {
            this.svg.transition().duration(250).call(this.zoomBehavior.scaleBy, 1.3);
        }
    }

    zoomOut() {
        if (this.svg) {
            this.svg.transition().duration(250).call(this.zoomBehavior.scaleBy, 0.7);
        }
    }

    zoomReset(nodes) {
        if (nodes) {
            this.fitToScreen(nodes);
        }
    }

    resize(width, height) {
        if (!width || !height || width === 0 || height === 0) return;

        this.width = width;
        this.height = height;

        if (this.svg && this.zoomBehavior) {
            // Update the SVG dimensions
            this.svg.attr('viewBox', [0, 0, this.width, this.height]);

            // Tell the zoom behavior the container has changed size 
            this.zoomBehavior.extent([[0, 0], [this.width, this.height]]);

            console.log(`[PlexusRenderer] Handled resize to ${this.width}x${this.height}`);
        }
    }

    render(graphData) {
        if (!this.svg) this.initialize();

        const nodes = graphData.nodes.map(d => Object.create(d));
        const links = graphData.links.map(d => Object.create(d));

        // Compute fixed positions based on levels
        this.computeLayout(nodes);

        // Clear existing elements to prevent duplication on re-render
        this.linkGroup.selectAll('*').remove();
        this.nodeGroup.selectAll('*').remove();

        // Render Links (using Bezier curves)
        const linkGen = d3.linkHorizontal()
            .x(d => d.x)
            .y(d => d.y);

        const link = this.linkGroup.selectAll('path')
            .data(links)
            .join('path')
            .attr('class', 'nerve-link')
            .attr('d', d => {
                const sourceNode = nodes.find(n => n.id === d.source);
                const targetNode = nodes.find(n => n.id === d.target);
                if (sourceNode && targetNode) {
                    return linkGen({ source: sourceNode, target: targetNode });
                }
                return "";
            })
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', 4)
            .attr('fill', 'none');

        // Render Nodes
        const node = this.nodeGroup.selectAll('g')
            .data(nodes)
            .join('g')
            .attr('class', 'nerve-node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .on('click', (event, d) => {
                event.stopPropagation();
                this.manager.handleNodeClick(d.id);
            });

        // Node Shapes
        node.append('circle')
            .attr('r', 20)
            .attr('fill', d => this.getNodeColor(d.type))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        // Label Group
        const labelGroup = node.append('g')
            .attr('transform', 'translate(0, 30)');

        // Background pill
        labelGroup.append('rect')
            .attr('x', d => -(d.label.length * 4) - 5) // Approximate width
            .attr('y', -12)
            .attr('width', d => (d.label.length * 8) + 10)
            .attr('height', 18)
            .attr('rx', 4)
            .attr('fill', 'rgba(255,255,255,0.85)')
            .attr('stroke', '#eee')
            .style('pointer-events', 'none');

        // Text
        labelGroup.append('text')
            .attr('text-anchor', 'middle')
            .text(d => d.label)
            .attr('font-size', '11px')
            .attr('font-weight', '500')
            .attr('fill', '#333')
            .style('pointer-events', 'none');

        this.nodeSelection = node;
        this.linkSelection = link;

        // Auto-scale to fit the layout
        this.fitToScreen(nodes);
    }

    computeLayout(nodes) {
        // Group nodes by their defined level (X-axis column)
        const levels = {};
        let maxLevel = 0;

        nodes.forEach(node => {
            const lvl = node.level || 0;
            if (!levels[lvl]) levels[lvl] = [];
            levels[lvl].push(node);
            if (lvl > maxLevel) maxLevel = lvl;
        });

        // Parameters for spacing
        const columnSpacing = 220; // X distance between levels
        const rowSpacing = 60;     // Y distance between rows

        // Calculate positions
        Object.keys(levels).forEach(lvl => {
            const levelNodes = levels[lvl];

            levelNodes.forEach(node => {
                node.x = (parseFloat(lvl) * columnSpacing) + 100;

                // Use strict row mapping if available, otherwise fallback to calculated
                if (node.row !== undefined) {
                    node.y = (node.row * rowSpacing) + 50;
                } else {
                    // Fallback
                    const numNodes = levelNodes.length;
                    const levelHeight = (numNodes - 1) * rowSpacing;
                    const index = levelNodes.indexOf(node);
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

        // Add padding to ensure nodes and labels are fully visible
        minX -= 150; maxX += 150;
        minY -= 150; maxY += 180; // keep bottom margin wider for text

        const w = maxX - minX;
        const h = maxY - minY;

        if (w <= 0 || h <= 0) return; // Prevent NaN

        const scale = Math.min(this.width / w, this.height / h) * 0.85;

        if (isNaN(scale) || scale === Infinity || scale === -Infinity) return;

        const xOffset = (this.width - (w * scale)) / 2 - (minX * scale);
        const yOffset = (this.height - (h * scale)) / 2 - (minY * scale);

        if (isNaN(xOffset) || isNaN(yOffset)) return;

        console.log(`[PlexusRenderer] fitToScreen applying calculated transform - Scale: ${scale} OffsetX: ${xOffset} OffsetY: ${yOffset}`);

        const transform = d3.zoomIdentity.translate(xOffset, yOffset).scale(scale);

        if (instant) {
            this.svg.call(this.zoomBehavior.transform, transform);
        } else {
            this.svg.transition().duration(750).call(this.zoomBehavior.transform, transform);
        }
    }

    getNodeColor(type) {
        switch (type) {
            case 'root': return '#3498db'; // Blue
            case 'trunk': return '#27ae60'; // Green
            case 'division': return '#f39c12'; // Orange
            case 'cord': return '#e74c3c'; // Red
            case 'nerve': return '#9b59b6'; // Purple
            case 'branch': return '#8e44ad'; // Dark Purple
            default: return '#95a5a6'; // Grey
        }
    }

    highlightPath(nodeIds) {
        // Dim all
        this.nodeSelection.attr('opacity', 0.3);
        this.linkSelection.attr('opacity', 0.1);

        // Highlight specific
        this.nodeSelection.filter(d => nodeIds.has(d.id))
            .attr('opacity', 1)
            .select('circle')
            .attr('stroke', '#f1c40f')
            .attr('stroke-width', 4);

        // Highlight links between highlighted nodes
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
        this.nodeSelection.attr('opacity', 1)
            .select('circle')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        this.linkSelection.attr('opacity', 0.6)
            .attr('stroke', '#999')
            .attr('stroke-width', 4);
    }

    // Setup zoom, but no dragging since it's a fixed diagram
    setupZoom() {
        // Handled in initialize
    }
}
