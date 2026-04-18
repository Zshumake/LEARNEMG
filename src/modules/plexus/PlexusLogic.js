/**
 * PlexusLogic.js
 *
 * The "Brain" of the Plexus Anatomy Tool.
 * Handles graph traversal, lesion simulation, EMG prediction, and case building.
 */

import logger from '../../utils/Logger.js';
export class PlexusLogic {
    constructor() {
        this.graph = { nodes: [], links: [] };
        this.nodeMap = new Map();
        this.adjacencyList = new Map();
        this.reverseAdjacencyList = new Map();
    }

    loadGraph(graphData) {
        this.graph = graphData;
        this.nodeMap.clear();
        this.adjacencyList.clear();
        this.reverseAdjacencyList.clear();

        graphData.nodes.forEach(node => {
            this.nodeMap.set(node.id, node);
            this.adjacencyList.set(node.id, []);
            this.reverseAdjacencyList.set(node.id, []);
        });

        graphData.links.forEach(link => {
            const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
            const targetId = typeof link.target === 'object' ? link.target.id : link.target;
            if (this.adjacencyList.has(sourceId)) this.adjacencyList.get(sourceId).push(targetId);
            if (this.reverseAdjacencyList.has(targetId)) this.reverseAdjacencyList.get(targetId).push(sourceId);
        });

        logger.log('PlexusLogic: Graph loaded with', this.nodeMap.size, 'nodes');
    }

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

    getLesionEffects(nodeId) {
        const node = this.nodeMap.get(nodeId);
        if (!node) return null;

        const descendants = this.findDescendants(nodeId);
        const affectedMuscles = new Set();
        const allMuscles = new Set();

        // Collect affected muscles from descendants
        descendants.forEach(id => {
            const dn = this.nodeMap.get(id);
            if (dn && dn.muscles) dn.muscles.forEach(m => affectedMuscles.add(m));
        });

        // Collect ALL muscles in the plexus for spared list
        this.nodeMap.forEach(n => {
            if (n.muscles) n.muscles.forEach(m => allMuscles.add(m));
        });
        const sparedMuscles = [...allMuscles].filter(m => !affectedMuscles.has(m)).sort();

        const isRoot = node.type === 'root';
        const isPreganglionic = isRoot;

        // Feature 6: EMG Prediction
        const sensoryNodes = [];
        const motorNodes = [];
        descendants.forEach(id => {
            const dn = this.nodeMap.get(id);
            if (!dn) return;
            if (dn.description && dn.description.toLowerCase().includes('sensory')) {
                sensoryNodes.push(dn);
            }
            if (dn.muscles && dn.muscles.length > 0) {
                motorNodes.push(dn);
            }
        });

        return {
            node,
            affectedNodeCount: descendants.size - 1,
            isRoot,
            isPreganglionic,
            sensoryPrognosis: isPreganglionic
                ? 'SNAPs PRESERVED (Pre-ganglionic -- DRG intact, sensory axons survive distally)'
                : 'SNAPs ABSENT/REDUCED (Post-ganglionic -- sensory axons undergo Wallerian degeneration)',
            motorPrognosis: 'CMAPs reduced/absent. Denervation (fibrillations/PSWs) expected in 10-21 days.',
            affectedStructures: Array.from(descendants).map(id => this.nodeMap.get(id)?.label).filter(l => l && l !== node.label),
            affectedMuscles: Array.from(affectedMuscles).sort(),
            // EMG Prediction data
            predictedNCS: {
                snapStatus: isPreganglionic ? 'Preserved (normal amplitudes)' : 'Absent or reduced',
                cmapStatus: 'Reduced or absent in affected nerve territories',
                fWaves: 'Absent in affected nerves',
                sensoryNerves: sensoryNodes.map(n => n.label),
                motorNerves: motorNodes.map(n => n.label)
            },
            predictedEMG: {
                denervatedMuscles: Array.from(affectedMuscles).sort(),
                sparedMuscles,
                paraspinalExpected: isPreganglionic,
                timeline: isPreganglionic
                    ? 'Paraspinals: fibrillations by day 7-10. Proximal limb muscles: day 10-14. Distal muscles: day 14-21.'
                    : 'Proximal affected muscles: fibrillations by day 10-14. Distal muscles: day 14-21. Paraspinals: NORMAL (post-ganglionic).'
            }
        };
    }

    // Feature 5: Build a Case -- find common lesion site from weak muscles
    findCommonLesionSite(weakMuscleNames) {
        // Step 1: Find terminal nerve nodes for each weak muscle
        const muscleNodeIds = new Set();
        for (const muscleName of weakMuscleNames) {
            for (const [id, node] of this.nodeMap) {
                if (node.muscles && node.muscles.some(m => m.toLowerCase() === muscleName.toLowerCase())) {
                    muscleNodeIds.add(id);
                }
            }
        }

        if (muscleNodeIds.size === 0) return null;

        // Step 2: Find ancestors for each terminal nerve
        const ancestorSets = [...muscleNodeIds].map(id => this.findAncestors(id));

        // Step 3: Find common ancestors (intersection of all sets)
        let commonAncestors = new Set(ancestorSets[0]);
        for (let i = 1; i < ancestorSets.length; i++) {
            commonAncestors = new Set([...commonAncestors].filter(id => ancestorSets[i].has(id)));
        }

        if (commonAncestors.size === 0) return { nodeId: null, explanation: 'No common anatomical pathway found -- consider multiple lesion sites.' };

        // Step 4: Find the LOWEST (most distal) common ancestor
        // = the common ancestor with the highest level number
        let bestNodeId = null;
        let bestLevel = -1;
        for (const id of commonAncestors) {
            const node = this.nodeMap.get(id);
            if (node && (node.level || 0) > bestLevel) {
                bestLevel = node.level || 0;
                bestNodeId = id;
            }
        }

        const lesionNode = this.nodeMap.get(bestNodeId);

        // Step 5: Get the full effects of a lesion at this site
        const effects = this.getLesionEffects(bestNodeId);

        // Step 6: Check if some weak muscles are NOT in the affected set (multiple lesion sites)
        const unexplained = weakMuscleNames.filter(m =>
            !effects.affectedMuscles.some(am => am.toLowerCase() === m.toLowerCase())
        );

        return {
            nodeId: bestNodeId,
            node: lesionNode,
            effects,
            explanation: unexplained.length > 0
                ? `Best fit: ${lesionNode.label}. However, ${unexplained.join(', ')} cannot be explained by a single lesion at this site -- consider additional pathology.`
                : `The pattern of weakness localizes to the ${lesionNode.label} (${lesionNode.type}). All selected muscles are downstream of this structure.`,
            unexplainedMuscles: unexplained
        };
    }
}
