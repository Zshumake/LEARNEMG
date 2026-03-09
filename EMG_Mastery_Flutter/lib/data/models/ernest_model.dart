import 'package:flutter/material.dart';

class ErnestPersona {
  final String id;
  final String name;
  final String description;
  final String imagePath;
  final Color primaryColor;
  final String prompt;
  final List<String> highlightResponses;
  final List<String> idleRoasts;

  ErnestPersona({
    required this.id,
    required this.name,
    required this.description,
    required this.imagePath,
    required this.primaryColor,
    required this.prompt,
    required this.highlightResponses,
    this.idleRoasts = const [],
  });
}

enum ChatRole { user, model }

class ChatMessage {
  final ChatRole role;
  final String text;
  final DateTime timestamp;

  ChatMessage({required this.role, required this.text, DateTime? timestamp})
    : timestamp = timestamp ?? DateTime.now();
}
