import 'package:flutter/material.dart';

/// Shared hero header used at the top of every learning module.
/// Provides a consistent gradient banner with title and subtitle.
class ModuleHeroHeader extends StatelessWidget {
  final String title;
  final String subtitle;
  final Color color;
  final Color? colorEnd;

  const ModuleHeroHeader({
    super.key,
    required this.title,
    required this.subtitle,
    required this.color,
    this.colorEnd,
  });

  @override
  Widget build(BuildContext context) {
    final endColor = colorEnd ?? HSLColor.fromColor(color).withLightness(
      (HSLColor.fromColor(color).lightness - 0.1).clamp(0.0, 1.0),
    ).toColor();

    final isLight = ThemeData.estimateBrightnessForColor(color) == Brightness.light;
    final textColor = isLight ? const Color(0xFF1E293B) : Colors.white;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color, endColor],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: SafeArea(
        bottom: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                color: textColor,
                fontSize: 24,
                fontWeight: FontWeight.w900,
                letterSpacing: -0.5,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              subtitle,
              style: TextStyle(
                color: textColor.withValues(alpha: isLight ? 0.7 : 0.85),
                fontSize: 14,
                height: 1.4,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
