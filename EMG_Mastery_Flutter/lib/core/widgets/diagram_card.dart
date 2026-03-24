import 'package:flutter/material.dart';

/// A card that displays an anatomy diagram with caption and attribution.
/// Supports zoom via InteractiveViewer and optional labeled hotspots.
class DiagramCard extends StatelessWidget {
  final String imagePath;
  final String caption;
  final String? attribution;
  final List<DiagramLabel>? labels;
  final Color borderColor;

  const DiagramCard({
    super.key,
    required this.imagePath,
    required this.caption,
    this.attribution,
    this.labels,
    this.borderColor = const Color(0xFFE2E8F0),
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: borderColor),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image with zoom
          ClipRRect(
            borderRadius: const BorderRadius.vertical(
              top: Radius.circular(15),
            ),
            child: GestureDetector(
              onTap: () => _showFullScreen(context),
              child: Stack(
                children: [
                  SizedBox(
                    width: double.infinity,
                    child: Image.asset(
                      imagePath,
                      fit: BoxFit.contain,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          height: 180,
                          color: const Color(0xFFF1F5F9),
                          child: const Center(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.image_not_supported_outlined,
                                    color: Color(0xFF94A3B8), size: 32),
                                SizedBox(height: 8),
                                Text('Image not available',
                                    style: TextStyle(
                                        color: Color(0xFF94A3B8),
                                        fontSize: 12)),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  // Zoom hint
                  Positioned(
                    right: 8,
                    top: 8,
                    child: Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.5),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(
                        Icons.zoom_in,
                        color: Colors.white,
                        size: 16,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Caption
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Text(
              caption,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                color: Color(0xFF1E293B),
                height: 1.4,
              ),
            ),
          ),

          // Labels list (if provided)
          if (labels != null && labels!.isNotEmpty)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 4),
              child: Wrap(
                spacing: 6,
                runSpacing: 6,
                children: labels!
                    .map((l) => _LabelChip(label: l))
                    .toList(),
              ),
            ),

          // Attribution
          if (attribution != null)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 12),
              child: Text(
                attribution!,
                style: const TextStyle(
                  fontSize: 10,
                  color: Color(0xFF94A3B8),
                  fontStyle: FontStyle.italic,
                ),
              ),
            )
          else
            const SizedBox(height: 12),
        ],
      ),
    );
  }

  void _showFullScreen(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => _FullScreenDiagram(
          imagePath: imagePath,
          caption: caption,
          attribution: attribution,
        ),
      ),
    );
  }
}

/// A labeled point of interest on a diagram.
class DiagramLabel {
  final String text;
  final Color color;

  const DiagramLabel({
    required this.text,
    this.color = const Color(0xFF2563EB),
  });
}

class _LabelChip extends StatelessWidget {
  final DiagramLabel label;
  const _LabelChip({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: label.color.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: label.color.withValues(alpha: 0.2)),
      ),
      child: Text(
        label.text,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: label.color,
        ),
      ),
    );
  }
}

/// Full-screen zoomable diagram viewer.
class _FullScreenDiagram extends StatelessWidget {
  final String imagePath;
  final String caption;
  final String? attribution;

  const _FullScreenDiagram({
    required this.imagePath,
    required this.caption,
    this.attribution,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: Text(
          caption,
          style: const TextStyle(fontSize: 14, color: Colors.white70),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: InteractiveViewer(
              minScale: 0.5,
              maxScale: 4.0,
              child: Center(
                child: Image.asset(
                  imagePath,
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) {
                    return const Center(
                      child: Text(
                        'Image not available',
                        style: TextStyle(color: Colors.white54),
                      ),
                    );
                  },
                ),
              ),
            ),
          ),
          if (attribution != null)
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text(
                attribution!,
                style: const TextStyle(
                  color: Colors.white38,
                  fontSize: 10,
                  fontStyle: FontStyle.italic,
                ),
                textAlign: TextAlign.center,
              ),
            ),
        ],
      ),
    );
  }
}
