import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

/// A titled white section card with an icon + heading row over arbitrary
/// content. Shared by the learning views (was duplicated as a private
/// `_SectionCard` in radiculopathy_view + plexus_clinical_view). The few
/// styling deltas between those copies are exposed as optional params so each
/// call site keeps its exact look.
class SectionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;
  final Widget child;
  final double borderWidth;
  final double iconGap;
  final double titleSize;
  final double letterSpacing;
  const SectionCard({
    super.key,
    required this.title,
    required this.icon,
    required this.color,
    required this.child,
    this.borderWidth = 1,
    this.iconGap = 10,
    this.titleSize = 12,
    this.letterSpacing = 1,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.border, width: borderWidth),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              SizedBox(width: iconGap),
              Text(
                title,
                style: TextStyle(
                  fontSize: titleSize,
                  fontWeight: FontWeight.w900,
                  color: color,
                  letterSpacing: letterSpacing,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          child,
        ],
      ),
    );
  }
}
