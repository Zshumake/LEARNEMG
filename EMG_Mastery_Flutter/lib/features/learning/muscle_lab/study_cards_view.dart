import 'package:flutter/material.dart';
import '../../../data/muscle_data.dart';
import '../../../data/models/muscle_model.dart';
import '../../../core/theme/app_theme.dart';

class StudyCardsView extends StatefulWidget {
  final VoidCallback onBack;
  const StudyCardsView({super.key, required this.onBack});

  @override
  State<StudyCardsView> createState() => _StudyCardsViewState();
}

class _StudyCardsViewState extends State<StudyCardsView> {
  String _region = 'UE';
  final Set<String> _revealedNerves = {};
  final Set<String> _revealedRoots = {};
  final Set<String> _revealedCords = {};
  final Set<String> _revealedActions = {};

  int get _totalRevealed {
    final muscles = MuscleData.muscleDatabase.keys.toList();
    int count = 0;
    for (final m in muscles) {
      if (_revealedNerves.contains(m)) count++;
      if (_revealedRoots.contains(m)) count++;
      if (_revealedCords.contains(m)) count++;
      if (_revealedActions.contains(m)) count++;
    }
    return count;
  }

  @override
  Widget build(BuildContext context) {
    final muscles = MuscleData.muscleDatabase.values
        .where((m) => m.region == _region)
        .toList();
    final totalPossible = MuscleData.muscleDatabase.length * 4;

    return Column(
      children: [
        // Header
        Container(
          padding: const EdgeInsets.fromLTRB(8, 8, 20, 16),
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFF0F766E), Color(0xFF0E7490)],
            ),
          ),
          child: SafeArea(
            bottom: false,
            child: Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      tooltip: 'Back',
                      onPressed: widget.onBack,
                      icon: const Icon(
                        Icons.arrow_back_ios_new_rounded,
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                    const Expanded(
                      child: Text(
                        'Study Cards',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ),
                    // Progress indicator
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        '$_totalRevealed / $totalPossible',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                // Region toggle + global controls
                Row(
                  children: [
                    const SizedBox(width: 8),
                    _regionPill('Upper', 'UE'),
                    const SizedBox(width: 8),
                    _regionPill('Lower', 'LE'),
                    const Spacer(),
                    _quickRevealBtn(
                      'All',
                      Icons.auto_awesome_rounded,
                      _revealAll,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),

        // Global reveal chips
        Container(
          color: const Color(0xFFF0FDFA),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Row(
            children: [
              const Text(
                'REVEAL:',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0D9488),
                  letterSpacing: 1,
                ),
              ),
              const SizedBox(width: 10),
              _chipBtn('Nerve', const Color(0xFF0EA5E9), () {
                setState(
                  () => _revealedNerves.addAll(MuscleData.muscleDatabase.keys),
                );
              }),
              const SizedBox(width: 6),
              _chipBtn('Roots', AppTheme.warning, () {
                setState(
                  () => _revealedRoots.addAll(MuscleData.muscleDatabase.keys),
                );
              }),
              const SizedBox(width: 6),
              _chipBtn('Cord', const Color(0xFF8B5CF6), () {
                setState(
                  () => _revealedCords.addAll(MuscleData.muscleDatabase.keys),
                );
              }),
              const SizedBox(width: 6),
              _chipBtn('Action', AppTheme.danger, () {
                setState(
                  () => _revealedActions.addAll(MuscleData.muscleDatabase.keys),
                );
              }),
            ],
          ),
        ),

        // Muscle list
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 40),
            itemCount: muscles.length,
            itemBuilder: (context, index) => _MuscleCard(
              muscle: muscles[index],
              revealedNerves: _revealedNerves,
              revealedRoots: _revealedRoots,
              revealedCords: _revealedCords,
              revealedActions: _revealedActions,
              onReveal: (type) {
                setState(() {
                  switch (type) {
                    case 'nerve':
                      _revealedNerves.add(muscles[index].name);
                    case 'roots':
                      _revealedRoots.add(muscles[index].name);
                    case 'cord':
                      _revealedCords.add(muscles[index].name);
                    case 'actions':
                      _revealedActions.add(muscles[index].name);
                  }
                });
              },
            ),
          ),
        ),
      ],
    );
  }

  void _revealAll() {
    setState(() {
      final allKeys = MuscleData.muscleDatabase.keys;
      _revealedNerves.addAll(allKeys);
      _revealedRoots.addAll(allKeys);
      _revealedCords.addAll(allKeys);
      _revealedActions.addAll(allKeys);
    });
  }

  Widget _regionPill(String label, String value) {
    final active = _region == value;
    return GestureDetector(
      onTap: () => setState(() => _region = value),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: active ? Colors.white : Colors.white.withValues(alpha: 0.15),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: active ? const Color(0xFF0F766E) : Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 13,
          ),
        ),
      ),
    );
  }

  Widget _quickRevealBtn(String label, IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.2),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: Colors.white, size: 14),
            const SizedBox(width: 5),
            Text(
              label,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _chipBtn(String label, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: color.withValues(alpha: 0.3)),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: color,
            fontSize: 11,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }
}

// ── MUSCLE CARD ──────────────────────────────────────
class _MuscleCard extends StatelessWidget {
  final MuscleModel muscle;
  final Set<String> revealedNerves;
  final Set<String> revealedRoots;
  final Set<String> revealedCords;
  final Set<String> revealedActions;
  final void Function(String type) onReveal;

  const _MuscleCard({
    required this.muscle,
    required this.revealedNerves,
    required this.revealedRoots,
    required this.revealedCords,
    required this.revealedActions,
    required this.onReveal,
  });

  @override
  Widget build(BuildContext context) {
    final nerveRevealed = revealedNerves.contains(muscle.name);
    final rootsRevealed = revealedRoots.contains(muscle.name);
    final cordRevealed = revealedCords.contains(muscle.name);
    final actionsRevealed = revealedActions.contains(muscle.name);
    final allRevealed =
        nerveRevealed && rootsRevealed && cordRevealed && actionsRevealed;

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: allRevealed ? const Color(0xFFF0FDFA) : Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: allRevealed
              ? const Color(0xFF99F6E4)
              : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Muscle name header
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 10),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    muscle.name,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.slate950,
                    ),
                  ),
                ),
                if (allRevealed)
                  const Icon(
                    Icons.check_circle_rounded,
                    color: Color(0xFF14B8A6),
                    size: 18,
                  ),
              ],
            ),
          ),
          // Attribute chips
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 4),
            child: Wrap(
              spacing: 6,
              runSpacing: 6,
              children: [
                _attrChip(
                  'Nerve',
                  nerveRevealed,
                  const Color(0xFF0EA5E9),
                  () => onReveal('nerve'),
                ),
                _attrChip(
                  'Roots',
                  rootsRevealed,
                  AppTheme.warning,
                  () => onReveal('roots'),
                ),
                if (muscle.cord != null)
                  _attrChip(
                    'Cord',
                    cordRevealed,
                    const Color(0xFF8B5CF6),
                    () => onReveal('cord'),
                  ),
                _attrChip(
                  'Actions',
                  actionsRevealed,
                  AppTheme.danger,
                  () => onReveal('actions'),
                ),
              ],
            ),
          ),
          // Revealed details
          if (nerveRevealed || rootsRevealed || cordRevealed || actionsRevealed)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 14),
              child: Column(
                children: [
                  if (nerveRevealed)
                    _detailLine(
                      'Nerve',
                      muscle.peripheralNerve,
                      const Color(0xFF0EA5E9),
                    ),
                  if (rootsRevealed)
                    _detailLine(
                      'Roots',
                      muscle.roots.join(', '),
                      AppTheme.warning,
                    ),
                  if (cordRevealed && muscle.cord != null)
                    _detailLine('Cord', muscle.cord!, const Color(0xFF8B5CF6)),
                  if (actionsRevealed)
                    _detailLine('Actions', muscle.actions, AppTheme.danger),
                ],
              ),
            )
          else
            const SizedBox(height: 10),
        ],
      ),
    );
  }

  Widget _attrChip(
    String label,
    bool revealed,
    Color color,
    VoidCallback onTap,
  ) {
    return GestureDetector(
      onTap: revealed ? null : onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: revealed ? color : color.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (!revealed)
              Padding(
                padding: const EdgeInsets.only(right: 4),
                child: Icon(
                  Icons.touch_app_rounded,
                  size: 12,
                  color: color.withValues(alpha: 0.6),
                ),
              ),
            Text(
              label,
              style: TextStyle(
                color: revealed ? Colors.white : color,
                fontSize: 12,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _detailLine(String label, String value, Color accent) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 3,
            height: 16,
            margin: const EdgeInsets.only(right: 10, top: 2),
            decoration: BoxDecoration(
              color: accent,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          SizedBox(
            width: 55,
            child: Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w800,
                color: accent,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                fontSize: 13,
                color: AppTheme.textMain,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── QUIZ ENGINE SUB-VIEW ──────────────────────────────────────
