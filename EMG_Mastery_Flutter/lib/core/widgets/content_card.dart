import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';

class ContentCard extends StatelessWidget {
  final String title;
  final Widget content;
  final Color? accentColor;

  const ContentCard({
    super.key,
    required this.title,
    required this.content,
    this.accentColor,
  });

  @override
  Widget build(BuildContext context) {
    // We avoid hard borders and nested containers here.
    // Instead, we use a single clean Card with minimal padding
    // to ensure the internal content (Text/Tables) has maximum width.

    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Elegant Header (No border, just typography and a small indent)
          Row(
            children: [
              Container(
                width: 4,
                height: 24,
                decoration: BoxDecoration(
                  color: accentColor ?? AppTheme.primary,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontSize: 20,
                    color: accentColor ?? AppTheme.textHeading,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Main Content Area - Maximized Width
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(
              horizontal: 4,
            ), // Minimal lateral padding
            child: content,
          ),
        ],
      ),
    );
  }
}
