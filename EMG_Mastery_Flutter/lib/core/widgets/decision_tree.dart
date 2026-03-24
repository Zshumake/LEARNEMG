import 'package:flutter/material.dart';

/// A node in a clinical decision tree.
class TreeNode {
  final String question;
  final String? yesLabel;
  final String? noLabel;
  final TreeNode? yesBranch;
  final TreeNode? noBranch;

  /// If both branches are null, this is a leaf (diagnosis).
  final String? diagnosis;
  final Color? diagnosisColor;
  final String? explanation;

  const TreeNode({
    required this.question,
    this.yesLabel,
    this.noLabel,
    this.yesBranch,
    this.noBranch,
    this.diagnosis,
    this.diagnosisColor,
    this.explanation,
  });

  bool get isLeaf => yesBranch == null && noBranch == null;
}

/// Interactive clinical decision tree widget.
/// User taps through branching questions to reach a diagnosis.
class DecisionTree extends StatefulWidget {
  final String title;
  final String subtitle;
  final TreeNode root;
  final Color accentColor;

  const DecisionTree({
    super.key,
    required this.title,
    required this.root,
    this.subtitle = 'Tap to work through the clinical reasoning.',
    this.accentColor = const Color(0xFF2563EB),
  });

  @override
  State<DecisionTree> createState() => _DecisionTreeState();
}

class _DecisionTreeState extends State<DecisionTree> {
  final List<_Step> _history = [];
  late TreeNode _current;

  @override
  void initState() {
    super.initState();
    _current = widget.root;
  }

  void _choose(bool yes) {
    final next = yes ? _current.yesBranch : _current.noBranch;
    if (next == null) return;
    setState(() {
      _history.add(_Step(
        node: _current,
        choseYes: yes,
      ));
      _current = next;
    });
  }

  void _reset() {
    setState(() {
      _history.clear();
      _current = widget.root;
    });
  }

  void _goBack() {
    if (_history.isEmpty) return;
    setState(() {
      final prev = _history.removeLast();
      _current = prev.node;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: widget.accentColor.withValues(alpha: 0.2)),
        boxShadow: [
          BoxShadow(
            color: widget.accentColor.withValues(alpha: 0.06),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: widget.accentColor.withValues(alpha: 0.08),
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(15),
              ),
            ),
            child: Row(
              children: [
                Icon(Icons.account_tree_rounded,
                    color: widget.accentColor, size: 22),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.title,
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: widget.accentColor,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        widget.subtitle,
                        style: TextStyle(
                          fontSize: 11,
                          color: widget.accentColor.withValues(alpha: 0.7),
                        ),
                      ),
                    ],
                  ),
                ),
                if (_history.isNotEmpty)
                  GestureDetector(
                    onTap: _reset,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: widget.accentColor.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        'Reset',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: widget.accentColor,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),

          // Breadcrumb trail
          if (_history.isNotEmpty)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: Wrap(
                spacing: 4,
                runSpacing: 4,
                children: [
                  for (final step in _history) ...[
                    _BreadcrumbChip(
                      text: step.choseYes
                          ? (step.node.yesLabel ?? 'Yes')
                          : (step.node.noLabel ?? 'No'),
                      color: widget.accentColor,
                    ),
                    Icon(Icons.chevron_right,
                        size: 14,
                        color: widget.accentColor.withValues(alpha: 0.3)),
                  ],
                ],
              ),
            ),

          // Current node
          Padding(
            padding: const EdgeInsets.all(16),
            child: _current.isLeaf
                ? _buildDiagnosis(_current)
                : _buildQuestion(_current),
          ),
        ],
      ),
    );
  }

  Widget _buildQuestion(TreeNode node) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Step indicator
        Text(
          'Step ${_history.length + 1}',
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w700,
            color: widget.accentColor.withValues(alpha: 0.5),
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 8),

        // Question
        Text(
          node.question,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: Color(0xFF1E293B),
            height: 1.4,
          ),
        ),
        const SizedBox(height: 16),

        // Branch buttons
        Row(
          children: [
            Expanded(
              child: _BranchButton(
                label: node.yesLabel ?? 'Yes',
                color: const Color(0xFF10B981),
                onTap: () => _choose(true),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _BranchButton(
                label: node.noLabel ?? 'No',
                color: const Color(0xFFEF4444),
                onTap: () => _choose(false),
              ),
            ),
          ],
        ),

        // Back button
        if (_history.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 12),
            child: GestureDetector(
              onTap: _goBack,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.arrow_back_ios,
                      size: 12,
                      color: widget.accentColor.withValues(alpha: 0.5)),
                  const SizedBox(width: 4),
                  Text(
                    'Go back',
                    style: TextStyle(
                      fontSize: 12,
                      color: widget.accentColor.withValues(alpha: 0.5),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildDiagnosis(TreeNode node) {
    final color = node.diagnosisColor ?? widget.accentColor;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.08),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: color.withValues(alpha: 0.2)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.check_circle, color: color, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    'LOCALIZATION',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      color: color,
                      letterSpacing: 1.2,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                node.diagnosis ?? node.question,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: color,
                ),
              ),
              if (node.explanation != null) ...[
                const SizedBox(height: 10),
                Text(
                  node.explanation!,
                  style: TextStyle(
                    fontSize: 13,
                    color: color.withValues(alpha: 0.8),
                    height: 1.5,
                  ),
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 12),
        Center(
          child: GestureDetector(
            onTap: _reset,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration: BoxDecoration(
                color: widget.accentColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                'Try Another Path',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: widget.accentColor,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _Step {
  final TreeNode node;
  final bool choseYes;
  const _Step({required this.node, required this.choseYes});
}

class _BranchButton extends StatelessWidget {
  final String label;
  final Color color;
  final VoidCallback onTap;

  const _BranchButton({
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withValues(alpha: 0.2)),
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: color,
            ),
          ),
        ),
      ),
    );
  }
}

class _BreadcrumbChip extends StatelessWidget {
  final String text;
  final Color color;

  const _BreadcrumbChip({required this.text, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w700,
          color: color,
        ),
      ),
    );
  }
}
