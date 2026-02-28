/**
 * PlexusLogic.js
 * 
 * The "Brain" of the Plexus Anatomy Tool.
 * Handles graph traversal for pathfinding and clinical logic for lesion simulation.
 */

export class PlexusLogic {
    constructor() {
        this.graph = { nodes: [], links: [] };
        this.nodeMap = new Map();
        this.adjacencyList = new Map(); // Forward connections (Parent -> Children)
        this.reverseAdjacencyList = new Map(); // Backward connections (Child -> Parents)
    }

    /**
     * Load graph data and build optimized lookup structures
     * @param {Object} graphData - { nodes: [], links: [] }
     */
    loadGraph(graphData) {
        this.graph = graphData;
        this.nodeMap.clear();
        this.adjacencyList.clear();
        this.reverseAdjacencyList.clear();

        // Index nodes
        graphData.nodes.forEach(node => {
            this.nodeMap.set(node.id, node);
            this.adjacencyList.set(node.id, []);
            this.reverseAdjacencyList.set(node.id, []);
        });

        // Build adjacency lists
        graphData.links.forEach(link => {
            // D3 might transform links into objects, handle both strings and objects
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;

            if (this.adjacencyList.has(sourceId)) {
                this.adjacencyList.get(sourceId).push(targetId);
            }
            if (this.reverseAdjacencyList.has(targetId)) {
                this.reverseAdjacencyList.get(targetId).push(sourceId);
            }
        });

        console.log('🧠 PlexusLogic: Graph loaded with', this.nodeMap.size, 'nodes');
    }

    /**
     * Find all ancestors (upstream paths to roots)
     * Used for "Discovery Mode" - clicking a nerve highlights path to spine.
     * @param {string} startNodeId 
     * @returns {Set<string>} Set of node IDs
     */
    findAncestors(startNodeId) {
        const ancestors = new Set();
        const queue = [startNodeId];
        ancestors.add(startNodeId);

        while (queue.length > 0) {
            const currentId = queue.shift();
            const parents = this.reverseAdjacencyList.get(currentId) || [];

            parents.forEach(parentId => {
                if (!ancestors.has(parentId)) {
                    ancestors.add(parentId);
                    queue.push(parentId);
                }
            });
        }
        return ancestors;
    }

    /**
     * Find all descendants (downstream paths to muscles/skin)
     * Used for "Lesion Mode" - clicking a trunk shows affected areas.
     * @param {string} startNodeId 
     * @returns {Set<string>} Set of node IDs
     */
    findDescendants(startNodeId) {
        const descendants = new Set();
        const queue = [startNodeId];
        descendants.add(startNodeId);

        while (queue.length > 0) {
            const currentId = queue.shift();
            const children = this.adjacencyList.get(currentId) || [];

            children.forEach(childId => {
                if (!descendants.has(childId)) {
                    descendants.add(childId);
                    queue.push(childId);
                }
            });
        }
        return descendants;
    }

    /**
     * Determine clinical effects of a lesion at a specific node
     * @param {string} nodeId 
     */
    getLesionEffects(nodeId) {
        const node = this.nodeMap.get(nodeId);
        if (!node) return null;

        const descendants = this.findDescendants(nodeId);

        const affectedMuscles = new Set();
        descendants.forEach(id => {
            const descendantNode = this.nodeMap.get(id);
            if (descendantNode && descendantNode.muscles) {
                descendantNode.muscles.forEach(m => affectedMuscles.add(m));
            }
        });

        return {
            node: node,
            affectedNodeCount: descendants.size - 1, // Exclude self
            isRoot: node.type === 'root',
            isPreganglionic: node.type === 'root', // Simplified rule: Roots = preganglionic (usually)
            sensoryPrognosis: node.type === 'root' ? 'SNAP Intact (Pre-ganglionic)' : 'SNAP Absent/Reduced (Post-ganglionic)',
            motorPrognosis: 'Denervation likely (Fibs/PSW in 10-21 days)',
            affectedStructures: Array.from(descendants).map(id => this.nodeMap.get(id)?.label).filter(l => l && l !== node.label), // Exclude self from downstream
            affectedMuscles: Array.from(affectedMuscles).sort()
        };
    }
}
