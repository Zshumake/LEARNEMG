import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// A node in the plexus graph
class PlexusNode {
  final String id;
  final String label;
  final String type; // root, trunk, division, cord, nerve, branch
  final double level;
  final double row;
  final List<String> muscles;
  final String? description;

  // Computed layout position
  double x = 0;
  double y = 0;

  PlexusNode({
    required this.id,
    required this.label,
    required this.type,
    required this.level,
    required this.row,
    this.muscles = const [],
    this.description,
  });

  factory PlexusNode.fromJson(Map<String, dynamic> json) {
    return PlexusNode(
      id: json['id'] as String,
      label: json['label'] as String,
      type: json['type'] as String,
      level: (json['level'] as num).toDouble(),
      row: (json['row'] as num).toDouble(),
      muscles:
          (json['muscles'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      description: json['description'] as String?,
    );
  }

  Color get color {
    switch (type) {
      case 'root':
        return const Color(0xFF3498DB);
      case 'trunk':
        return const Color(0xFF27AE60);
      case 'division':
        return const Color(0xFFF39C12);
      case 'cord':
        return const Color(0xFFE74C3C);
      case 'nerve':
      case 'nerve-division':
        return const Color(0xFF9B59B6);
      case 'branch':
        return const Color(0xFF8E44AD);
      default:
        return const Color(0xFF95A5A6);
    }
  }
}

/// A link between two nodes
class PlexusLink {
  final String source;
  final String target;

  const PlexusLink({required this.source, required this.target});

  factory PlexusLink.fromJson(Map<String, dynamic> json) {
    return PlexusLink(
      source: json['source'] as String,
      target: json['target'] as String,
    );
  }
}

/// Complete graph data for one plexus
class PlexusGraphData {
  final List<PlexusNode> nodes;
  final List<PlexusLink> links;

  PlexusGraphData({required this.nodes, required this.links});

  factory PlexusGraphData.fromJson(Map<String, dynamic> json) {
    return PlexusGraphData(
      nodes: (json['nodes'] as List<dynamic>)
          .map((e) => PlexusNode.fromJson(e as Map<String, dynamic>))
          .toList(),
      links: (json['links'] as List<dynamic>)
          .map((e) => PlexusLink.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  /// Load graph from bundled JSON asset
  static Future<PlexusGraphData> loadAsset(String assetPath) async {
    final jsonString = await rootBundle.loadString(assetPath);
    final jsonData = json.decode(jsonString) as Map<String, dynamic>;
    return PlexusGraphData.fromJson(jsonData);
  }
}
