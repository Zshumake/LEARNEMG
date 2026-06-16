import 'dart:collection';
import '../data/models/plexus_graph_data.dart';

/// Graph traversal logic for plexus anatomy — ported from PlexusLogic.js
class PlexusLogic {
  final Map<String, PlexusNode> nodeMap = {};
  final Map<String, List<String>> adjacencyList = {}; // parent → children
  final Map<String, List<String>> reverseAdjacencyList = {}; // child → parents

  void loadGraph(PlexusGraphData data) {
    nodeMap.clear();
    adjacencyList.clear();
    reverseAdjacencyList.clear();

    for (final node in data.nodes) {
      nodeMap[node.id] = node;
      adjacencyList[node.id] = [];
      reverseAdjacencyList[node.id] = [];
    }

    for (final link in data.links) {
      adjacencyList[link.source]?.add(link.target);
      reverseAdjacencyList[link.target]?.add(link.source);
    }
  }

  /// BFS upstream — find all ancestors back to roots (Discovery Mode)
  Set<String> findAncestors(String startNodeId) {
    final ancestors = <String>{startNodeId};
    final queue = Queue<String>()..add(startNodeId);

    while (queue.isNotEmpty) {
      final current = queue.removeFirst();
      for (final parent in (reverseAdjacencyList[current] ?? [])) {
        if (ancestors.add(parent)) {
          queue.add(parent);
        }
      }
    }
    return ancestors;
  }

  /// BFS downstream — find all descendants (Lesion Mode)
  Set<String> findDescendants(String startNodeId) {
    final descendants = <String>{startNodeId};
    final queue = Queue<String>()..add(startNodeId);

    while (queue.isNotEmpty) {
      final current = queue.removeFirst();
      for (final child in (adjacencyList[current] ?? [])) {
        if (descendants.add(child)) {
          queue.add(child);
        }
      }
    }
    return descendants;
  }

  /// Get clinical effects of a lesion at a node
  LesionEffects? getLesionEffects(String nodeId) {
    final node = nodeMap[nodeId];
    if (node == null) return null;

    final descendants = findDescendants(nodeId);
    final affectedMuscles = <String>{};

    for (final id in descendants) {
      final descendantNode = nodeMap[id];
      if (descendantNode != null) {
        affectedMuscles.addAll(descendantNode.muscles);
      }
    }

    final isRoot = node.type == 'root';

    return LesionEffects(
      node: node,
      affectedNodeCount: descendants.length - 1,
      isRoot: isRoot,
      sensoryPrognosis: isRoot
          ? 'SNAP Intact (Pre-ganglionic)'
          : 'SNAP Absent/Reduced (Post-ganglionic)',
      motorPrognosis: 'Denervation likely (Fibs/PSW in 10-21 days)',
      affectedStructures: descendants
          .where((id) => id != nodeId)
          .map((id) => nodeMap[id]?.label ?? '')
          .where((l) => l.isNotEmpty)
          .toList(),
      affectedMuscles: affectedMuscles.toList()..sort(),
    );
  }
}

class LesionEffects {
  final PlexusNode node;
  final int affectedNodeCount;
  final bool isRoot;
  final String sensoryPrognosis;
  final String motorPrognosis;
  final List<String> affectedStructures;
  final List<String> affectedMuscles;

  const LesionEffects({
    required this.node,
    required this.affectedNodeCount,
    required this.isRoot,
    required this.sensoryPrognosis,
    required this.motorPrognosis,
    required this.affectedStructures,
    required this.affectedMuscles,
  });
}
