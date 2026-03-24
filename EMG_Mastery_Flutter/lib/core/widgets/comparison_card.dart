import 'package:flutter/material.dart';

/// A visual side-by-side comparison card for board-critical differentials.
/// Displays two or three columns with color-coded headers and row-by-row
/// feature comparisons. Designed for quick pattern recognition.
class ComparisonCard extends StatelessWidget {
  final String title;
  final List<ComparisonColumn> columns;
  final List<ComparisonRow> rows;
  final String? footnote;

  const ComparisonCard({
    super.key,
    required this.title,
    required this.columns,
    required this.rows,
    this.footnote,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Title bar
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: const BoxDecoration(
              color: Color(0xFF1E293B),
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
            ),
            child: Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w800,
                letterSpacing: 0.5,
              ),
            ),
          ),

          // Column headers
          Container(
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: Color(0xFFE2E8F0)),
              ),
            ),
            child: Row(
              children: [
                // Feature label column
                const SizedBox(
                  width: 100,
                  child: Padding(
                    padding: EdgeInsets.all(10),
                    child: Text(
                      'Feature',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF64748B),
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                ),
                // Data columns
                ...columns.map(
                  (col) => Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 10,
                      ),
                      decoration: BoxDecoration(
                        color: col.color.withValues(alpha: 0.08),
                        border: const Border(
                          left: BorderSide(color: Color(0xFFE2E8F0)),
                        ),
                      ),
                      child: Text(
                        col.label,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w800,
                          color: col.color,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Data rows
          ...rows.asMap().entries.map((entry) {
            final i = entry.key;
            final row = entry.value;
            final isEven = i % 2 == 0;

            return Container(
              decoration: BoxDecoration(
                color: isEven
                    ? const Color(0xFFF8FAFC)
                    : Colors.white,
                border: const Border(
                  bottom: BorderSide(color: Color(0xFFF1F5F9)),
                ),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Feature label
                  SizedBox(
                    width: 100,
                    child: Padding(
                      padding: const EdgeInsets.all(10),
                      child: Text(
                        row.feature,
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: Color(0xFF334155),
                        ),
                      ),
                    ),
                  ),
                  // Values
                  ...row.values.asMap().entries.map((valEntry) {
                    final colIdx = valEntry.key;
                    final value = valEntry.value;
                    final colColor = colIdx < columns.length
                        ? columns[colIdx].color
                        : const Color(0xFF64748B);

                    return Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 10,
                        ),
                        decoration: const BoxDecoration(
                          border: Border(
                            left: BorderSide(color: Color(0xFFF1F5F9)),
                          ),
                        ),
                        child: Text(
                          value,
                          style: TextStyle(
                            fontSize: 11,
                            color: colColor.withValues(alpha: 0.85),
                            height: 1.4,
                          ),
                        ),
                      ),
                    );
                  }),
                ],
              ),
            );
          }),

          // Footnote
          if (footnote != null)
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
              child: Text(
                footnote!,
                style: const TextStyle(
                  fontSize: 10,
                  color: Color(0xFF94A3B8),
                  fontStyle: FontStyle.italic,
                  height: 1.4,
                ),
              ),
            )
          else
            const SizedBox(height: 4),
        ],
      ),
    );
  }
}

/// A column header for the comparison card.
class ComparisonColumn {
  final String label;
  final Color color;

  const ComparisonColumn({
    required this.label,
    this.color = const Color(0xFF2563EB),
  });
}

/// A row of feature values in the comparison card.
class ComparisonRow {
  final String feature;
  final List<String> values;

  const ComparisonRow({
    required this.feature,
    required this.values,
  });
}
