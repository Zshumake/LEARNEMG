import 'package:flutter/material.dart';

/// Data model for a single nerve pathway
class NervePathway {
  final String id;
  final String name;
  final String roots;
  final String story;
  final Color themeColor;
  final Color themeColorDark;
  final String? imagePath;
  final List<PathwayStep> steps;

  const NervePathway({
    required this.id,
    required this.name,
    required this.roots,
    required this.story,
    required this.themeColor,
    required this.themeColorDark,
    this.imagePath,
    required this.steps,
  });

  int get injurySiteCount => steps.where((s) => s.isInjurySite).length;
}

/// A single step along a nerve's anatomical pathway
class PathwayStep {
  final String title;
  final String description;
  final bool isInjurySite;

  const PathwayStep({
    required this.title,
    required this.description,
    this.isInjurySite = false,
  });
}

/// Nerve groups for the sidebar/list organization
class NerveGroup {
  final String title;
  final List<NervePathway> nerves;

  const NerveGroup({required this.title, required this.nerves});
}
