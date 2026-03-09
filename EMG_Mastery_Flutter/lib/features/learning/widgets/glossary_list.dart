import 'package:flutter/material.dart';
import '../../../data/models/introduction_content.dart';
import '../../../core/theme/app_theme.dart';

class GlossaryList extends StatefulWidget {
  final List<GlossaryTerm> terms;

  const GlossaryList({super.key, required this.terms});

  @override
  State<GlossaryList> createState() => _GlossaryListState();
}

class _GlossaryListState extends State<GlossaryList> {
  late List<GlossaryTerm> filteredTerms;
  String query = '';

  @override
  void initState() {
    super.initState();
    filteredTerms = widget.terms;
  }

  void filterSearch(String value) {
    setState(() {
      query = value;
      filteredTerms = widget.terms
          .where(
            (t) =>
                t.term.toLowerCase().contains(value.toLowerCase()) ||
                t.definition.toLowerCase().contains(value.toLowerCase()),
          )
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Search Bar - Modern & Frictionless
        TextField(
          onChanged: filterSearch,
          decoration: InputDecoration(
            hintText: 'Search terminology...',
            prefixIcon: const Icon(Icons.search, color: AppTheme.primary),
            filled: true,
            fillColor: Colors.white,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: AppTheme.border.withValues(alpha: 0.5)),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: AppTheme.border.withValues(alpha: 0.3),
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Term Cards - No nested borders
        ...filteredTerms.map((t) => _buildTermItem(t)),

        if (filteredTerms.isEmpty)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 40),
            child: Text(
              'No matching terms found.',
              style: TextStyle(color: AppTheme.textMuted),
            ),
          ),
      ],
    );
  }

  Widget _buildTermItem(GlossaryTerm t) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                t.term,
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.textHeading,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: AppTheme.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  t.category,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.primary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            t.definition,
            style: const TextStyle(
              fontSize: 14,
              color: AppTheme.textMain,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}
