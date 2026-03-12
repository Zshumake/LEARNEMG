import 'package:flutter/material.dart';

// --- Generic Block Types ---

abstract class ContentBlock {}

class HeaderBlock extends ContentBlock {
  final String title;
  HeaderBlock(this.title);
}

class TextBlock extends ContentBlock {
  final String text;
  final bool isIntro; // If true, gets secondary styling like _introText
  TextBlock(this.text, {this.isIntro = false});
}

class PearlBlock extends ContentBlock {
  final String title;
  final String text;
  PearlBlock(this.title, this.text);
}

class BulletCardBlock extends ContentBlock {
  final String title;
  final Color themeColor;
  final Color backgroundColor;
  final List<String> points;
  BulletCardBlock({
    required this.title,
    required this.themeColor,
    required this.backgroundColor,
    required this.points,
  });
}

class NumberedListBlock extends ContentBlock {
  final List<MapEntry<String, String>> items; // Num (or identifier) -> Text
  NumberedListBlock(this.items);
}

class MechanismCardBlock extends ContentBlock {
  final String type;
  final String subtitle;
  final Color themeColor;
  final Color backgroundColor;
  final IconData icon;
  final String mechanism;
  final String findings;
  final String prognosis;

  MechanismCardBlock({
    required this.type,
    required this.subtitle,
    required this.themeColor,
    required this.backgroundColor,
    required this.icon,
    required this.mechanism,
    required this.findings,
    required this.prognosis,
  });
}

class SeddonRowBlock extends ContentBlock {
  final List<Map<String, dynamic>> cards; // {title, desc, color}
  SeddonRowBlock(this.cards);
}

// Enum for highly distinct/bespoke legacy tables
enum CustomWidgetType {
  sunderlandTable,
  actionPotentialTimeline,
  fiberTypeGrid,
  correlationsTable,
  montageSection,
  directionCards,
  temperatureCard,
  filterGrid,
  noiseSection,
  artifactSection,
  neuropathyAtlas,
  neuropathyQuiz,
  ncsQuiz,
  ncsMathScenarios,
}

class CustomWidgetBlock extends ContentBlock {
  final CustomWidgetType type;
  CustomWidgetBlock(this.type);
}

// --- Tab and Topic Containers ---

class TopicTab {
  final String title;
  final List<ContentBlock> blocks;

  TopicTab({required this.title, required this.blocks});
}

class TopicData {
  final String id;
  final String title;
  final List<TopicTab> tabs;

  TopicData({required this.id, required this.title, required this.tabs});
}
