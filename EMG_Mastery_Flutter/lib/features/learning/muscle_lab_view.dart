import 'package:flutter/material.dart';
import '../../data/muscle_data.dart';
import '../../data/models/muscle_model.dart';
import 'dart:math' as math;

class MuscleLabView extends StatefulWidget {
  const MuscleLabView({super.key});

  @override
  State<MuscleLabView> createState() => _MuscleLabViewState();
}

class _MuscleLabViewState extends State<MuscleLabView>
    with TickerProviderStateMixin {
  String _activeView = 'menu';

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 400),
      switchInCurve: Curves.easeOutCubic,
      switchOutCurve: Curves.easeInCubic,
      transitionBuilder: (child, animation) {
        return FadeTransition(
          opacity: animation,
          child: SlideTransition(
            position: Tween<Offset>(
              begin: const Offset(0, 0.03),
              end: Offset.zero,
            ).animate(animation),
            child: child,
          ),
        );
      },
      child: _buildCurrentView(),
    );
  }

  Widget _buildCurrentView() {
    switch (_activeView) {
      case 'cards':
        return _StudyCardsView(
          key: const ValueKey('cards'),
          onBack: () => setState(() => _activeView = 'menu'),
        );
      case 'quiz':
        return _QuizEngineView(
          key: const ValueKey('quiz'),
          onBack: () => setState(() => _activeView = 'menu'),
        );
      case 'challenge':
        return _EMGChallengeView(
          key: const ValueKey('challenge'),
          onBack: () => setState(() => _activeView = 'menu'),
        );
      default:
        return _buildMenu();
    }
  }

  Widget _buildMenu() {
    final ueCount =
        MuscleData.muscleDatabase.values.where((m) => m.region == 'UE').length;
    final leCount =
        MuscleData.muscleDatabase.values.where((m) => m.region == 'LE').length;

    return SingleChildScrollView(
      key: const ValueKey('menu'),
      child: Column(
        children: [
          // Hero
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(28, 50, 28, 40),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF0F172A), Color(0xFF1E293B), Color(0xFF0F172A)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFF14B8A6).withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: const Color(0xFF14B8A6).withValues(alpha: 0.3),
                    ),
                  ),
                  child: const Text(
                    'PRESTON & SHAPIRO DATABASE',
                    style: TextStyle(
                      color: Color(0xFF5EEAD4),
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.5,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Muscle\nStudy Lab',
                  style: TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                    height: 1.1,
                    letterSpacing: -1,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'Master innervation patterns through active recall and clinical case simulation.',
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.white.withValues(alpha: 0.6),
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 24),
                // Stats row
                Row(
                  children: [
                    _statChip('$ueCount', 'Upper', const Color(0xFF14B8A6)),
                    const SizedBox(width: 12),
                    _statChip('$leCount', 'Lower', const Color(0xFF8B5CF6)),
                    const SizedBox(width: 12),
                    _statChip(
                      '${ueCount + leCount}',
                      'Total',
                      const Color(0xFF0EA5E9),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Mode cards
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                _ModeCard(
                  title: 'Study Cards',
                  subtitle: 'Interactive flashcards with reveal-on-tap innervation details',
                  accentColor: const Color(0xFF14B8A6),
                  icon: Icons.style_rounded,
                  onTap: () => setState(() => _activeView = 'cards'),
                ),
                const SizedBox(height: 14),
                _ModeCard(
                  title: 'Quiz Engine',
                  subtitle: 'Infinite question generator -- customize topics and regions',
                  accentColor: const Color(0xFF10B981),
                  icon: Icons.bolt_rounded,
                  onTap: () => setState(() => _activeView = 'quiz'),
                ),
                const SizedBox(height: 14),
                _ModeCard(
                  title: 'EMG Challenge',
                  subtitle: 'Clinical case scenarios -- analyze findings, localize lesions',
                  accentColor: const Color(0xFF6366F1),
                  icon: Icons.monitor_heart_rounded,
                  onTap: () => setState(() => _activeView = 'challenge'),
                ),
                const SizedBox(height: 30),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _statChip(String value, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            value,
            style: TextStyle(
              color: color,
              fontSize: 18,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              color: color.withValues(alpha: 0.7),
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

// ── MODE CARD WIDGET ──────────────────────────────────────
class _ModeCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final Color accentColor;
  final IconData icon;
  final VoidCallback onTap;

  const _ModeCard({
    required this.title,
    required this.subtitle,
    required this.accentColor,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color(0xFFFAFAFA),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE5E7EB)),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.04),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      accentColor,
                      accentColor.withValues(alpha: 0.7),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: Colors.white, size: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                        color: Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 13,
                        color: Color(0xFF64748B),
                        height: 1.3,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.chevron_right_rounded,
                color: accentColor.withValues(alpha: 0.5),
                size: 24,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ── STUDY CARDS SUB-VIEW ──────────────────────────────────────
class _StudyCardsView extends StatefulWidget {
  final VoidCallback onBack;
  const _StudyCardsView({super.key, required this.onBack});

  @override
  State<_StudyCardsView> createState() => _StudyCardsViewState();
}

class _StudyCardsViewState extends State<_StudyCardsView> {
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
                      onPressed: widget.onBack,
                      icon: const Icon(Icons.arrow_back_ios_new_rounded,
                          color: Colors.white, size: 20),
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
                          horizontal: 10, vertical: 5),
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
                        'All', Icons.auto_awesome_rounded, _revealAll),
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
                    () => _revealedNerves.addAll(MuscleData.muscleDatabase.keys));
              }),
              const SizedBox(width: 6),
              _chipBtn('Roots', const Color(0xFFF59E0B), () {
                setState(
                    () => _revealedRoots.addAll(MuscleData.muscleDatabase.keys));
              }),
              const SizedBox(width: 6),
              _chipBtn('Cord', const Color(0xFF8B5CF6), () {
                setState(
                    () => _revealedCords.addAll(MuscleData.muscleDatabase.keys));
              }),
              const SizedBox(width: 6),
              _chipBtn('Action', const Color(0xFFEF4444), () {
                setState(() =>
                    _revealedActions.addAll(MuscleData.muscleDatabase.keys));
              }),
            ],
          ),
        ),

        // Muscle list
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 40),
            itemCount: muscles.length,
            itemBuilder: (context, index) =>
                _MuscleCard(
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
          color: active
              ? Colors.white
              : Colors.white.withValues(alpha: 0.15),
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
                  fontWeight: FontWeight.w700),
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
                      color: Color(0xFF0F172A),
                    ),
                  ),
                ),
                if (allRevealed)
                  const Icon(Icons.check_circle_rounded,
                      color: Color(0xFF14B8A6), size: 18),
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
                _attrChip('Nerve', nerveRevealed, const Color(0xFF0EA5E9),
                    () => onReveal('nerve')),
                _attrChip('Roots', rootsRevealed, const Color(0xFFF59E0B),
                    () => onReveal('roots')),
                if (muscle.cord != null)
                  _attrChip('Cord', cordRevealed, const Color(0xFF8B5CF6),
                      () => onReveal('cord')),
                _attrChip('Actions', actionsRevealed, const Color(0xFFEF4444),
                    () => onReveal('actions')),
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
                        'Nerve', muscle.peripheralNerve, const Color(0xFF0EA5E9)),
                  if (rootsRevealed)
                    _detailLine('Roots', muscle.roots.join(', '),
                        const Color(0xFFF59E0B)),
                  if (cordRevealed && muscle.cord != null)
                    _detailLine('Cord', muscle.cord!, const Color(0xFF8B5CF6)),
                  if (actionsRevealed)
                    _detailLine(
                        'Actions', muscle.actions, const Color(0xFFEF4444)),
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
      String label, bool revealed, Color color, VoidCallback onTap) {
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
                child: Icon(Icons.touch_app_rounded,
                    size: 12,
                    color: color.withValues(alpha: 0.6)),
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
                color: Color(0xFF334155),
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
class _QuizEngineView extends StatefulWidget {
  final VoidCallback onBack;
  const _QuizEngineView({super.key, required this.onBack});

  @override
  State<_QuizEngineView> createState() => _QuizEngineViewState();
}

class _QuizEngineViewState extends State<_QuizEngineView> {
  bool _quizStarted = false;
  String _region = 'both';
  final Map<String, bool> _topics = {
    'nerve': true,
    'roots': true,
    'cord': true,
    'actions': true,
  };

  int _answered = 0;
  int _correct = 0;
  int _streak = 0;
  late MuscleModel _currentMuscle;
  late String _currentType;
  late List<String> _options;
  String? _selectedOption;

  @override
  void initState() {
    super.initState();
    _nextQuestion();
  }

  void _nextQuestion() {
    final allMuscles = MuscleData.muscleDatabase.values.where((m) {
      if (_region == 'upper') return m.region == 'UE';
      if (_region == 'lower') return m.region == 'LE';
      return true;
    }).toList();

    _currentMuscle = allMuscles[math.Random().nextInt(allMuscles.length)];

    final activeTypes =
        _topics.entries.where((e) => e.value).map((e) => e.key).toList();
    _currentType = activeTypes[math.Random().nextInt(activeTypes.length)];

    final correctAns = _getAnswer(_currentMuscle, _currentType);
    final Set<String> options = {correctAns};

    while (options.length < 4) {
      final m = allMuscles[math.Random().nextInt(allMuscles.length)];
      final ans = _getAnswer(m, _currentType);
      if (ans.isNotEmpty) options.add(ans);
    }

    _options = options.toList()..shuffle();
    _selectedOption = null;
    setState(() {});
  }

  String _getAnswer(MuscleModel m, String type) {
    if (type == 'nerve') return m.peripheralNerve;
    if (type == 'roots') return m.roots.join(', ');
    if (type == 'cord') return m.cord ?? 'N/A';
    return m.actions;
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: _quizStarted ? _buildQuizArea() : _buildSetup(),
    );
  }

  Widget _buildSetup() {
    return SingleChildScrollView(
      key: const ValueKey('setup'),
      child: Column(
        children: [
          // Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(28, 50, 28, 35),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF065F46), Color(0xFF047857)],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                GestureDetector(
                  onTap: widget.onBack,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.arrow_back_ios_new_rounded,
                        color: Colors.white, size: 18),
                  ),
                ),
                const SizedBox(height: 20),
                const Text(
                  'Quiz Engine',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                    letterSpacing: -1,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Configure your rapid-fire anatomy review',
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.white.withValues(alpha: 0.7),
                  ),
                ),
              ],
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _sectionLabel('TARGET EXTREMITY'),
                const SizedBox(height: 12),
                Row(
                  children: [
                    _setupPill('Upper', _region == 'upper',
                        () => setState(() => _region = 'upper')),
                    const SizedBox(width: 10),
                    _setupPill('Lower', _region == 'lower',
                        () => setState(() => _region = 'lower')),
                    const SizedBox(width: 10),
                    _setupPill('Both', _region == 'both',
                        () => setState(() => _region = 'both')),
                  ],
                ),
                const SizedBox(height: 28),
                _sectionLabel('TEST TOPICS'),
                const SizedBox(height: 12),
                _topicToggle('Peripheral Nerve', 'nerve', Icons.bolt_rounded,
                    const Color(0xFF0EA5E9)),
                _topicToggle('Nerve Roots', 'roots',
                    Icons.account_tree_rounded, const Color(0xFFF59E0B)),
                _topicToggle('Cord / Trunk', 'cord', Icons.hub_rounded,
                    const Color(0xFF8B5CF6)),
                _topicToggle('Muscle Actions', 'actions',
                    Icons.fitness_center_rounded, const Color(0xFFEF4444)),
                const SizedBox(height: 36),
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _quizStarted = true;
                        _answered = 0;
                        _correct = 0;
                        _streak = 0;
                        _nextQuestion();
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF059669),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14)),
                      elevation: 0,
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.play_arrow_rounded, size: 22),
                        SizedBox(width: 8),
                        Text(
                          'START QUIZ',
                          style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 1),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuizArea() {
    final accuracy =
        _answered > 0 ? (_correct * 100 / _answered).round() : 0;

    return SingleChildScrollView(
      key: const ValueKey('quiz'),
      child: Column(
        children: [
          // Stats bar
          Container(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF065F46), Color(0xFF047857)],
              ),
            ),
            child: SafeArea(
              bottom: false,
              child: Row(
                children: [
                  _liveStatBadge('$_correct/$_answered', 'Score',
                      const Color(0xFF34D399)),
                  const SizedBox(width: 12),
                  _liveStatBadge(
                      '$accuracy%', 'Accuracy', const Color(0xFF60A5FA)),
                  const SizedBox(width: 12),
                  _liveStatBadge(
                      '$_streak', 'Streak', const Color(0xFFFBBF24)),
                  const Spacer(),
                  GestureDetector(
                    onTap: () => setState(() => _quizStarted = false),
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.settings_rounded,
                          color: Colors.white, size: 18),
                    ),
                  ),
                ],
              ),
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                const SizedBox(height: 20),
                // Question prompt
                Text(
                  'Identify the ${_getTypeLabel(_currentType)}',
                  style: const TextStyle(
                    fontSize: 14,
                    color: Color(0xFF64748B),
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 12),
                // Muscle name
                Container(
                  width: double.infinity,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                    ),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    _currentMuscle.name,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      letterSpacing: -0.5,
                    ),
                  ),
                ),
                const SizedBox(height: 28),
                // Options
                ..._options.asMap().entries.map((entry) =>
                    _buildQuizOption(entry.key, entry.value)),
                const SizedBox(height: 24),
                // Skip button
                if (_selectedOption == null)
                  TextButton(
                    onPressed: _nextQuestion,
                    child: const Text(
                      'SKIP',
                      style: TextStyle(
                        color: Color(0xFF94A3B8),
                        fontWeight: FontWeight.w700,
                        letterSpacing: 1,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuizOption(int index, String opt) {
    final bool isSelected = _selectedOption == opt;
    final bool isCorrect = opt == _getAnswer(_currentMuscle, _currentType);
    final letters = ['A', 'B', 'C', 'D'];

    Color borderColor = const Color(0xFFE5E7EB);
    Color bgColor = Colors.white;
    Color textColor = const Color(0xFF334155);
    Color letterBg = const Color(0xFFF1F5F9);
    Color letterColor = const Color(0xFF64748B);

    if (_selectedOption != null) {
      if (isCorrect) {
        borderColor = const Color(0xFF10B981);
        bgColor = const Color(0xFFECFDF5);
        textColor = const Color(0xFF065F46);
        letterBg = const Color(0xFF10B981);
        letterColor = Colors.white;
      } else if (isSelected) {
        borderColor = const Color(0xFFEF4444);
        bgColor = const Color(0xFFFEF2F2);
        textColor = const Color(0xFF991B1B);
        letterBg = const Color(0xFFEF4444);
        letterColor = Colors.white;
      }
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: _selectedOption == null
              ? () {
                  setState(() {
                    _selectedOption = opt;
                    _answered++;
                    if (isCorrect) {
                      _correct++;
                      _streak++;
                      Future.delayed(
                        const Duration(milliseconds: 1200),
                        _nextQuestion,
                      );
                    } else {
                      _streak = 0;
                    }
                  });
                }
              : null,
          borderRadius: BorderRadius.circular(14),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 250),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: borderColor, width: 1.5),
            ),
            child: Row(
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 250),
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: letterBg,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(
                      letters[index],
                      style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 13,
                        color: letterColor,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Text(
                    opt,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: textColor,
                    ),
                  ),
                ),
                if (_selectedOption != null && isCorrect)
                  const Icon(Icons.check_circle_rounded,
                      color: Color(0xFF10B981), size: 22),
                if (_selectedOption != null && isSelected && !isCorrect)
                  const Icon(Icons.cancel_rounded,
                      color: Color(0xFFEF4444), size: 22),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _liveStatBadge(String value, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Text(
            value,
            style: TextStyle(
              color: color,
              fontSize: 15,
              fontWeight: FontWeight.w900,
            ),
          ),
          Text(
            label,
            style: TextStyle(
              color: color.withValues(alpha: 0.7),
              fontSize: 9,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  String _getTypeLabel(String type) {
    if (type == 'nerve') return 'Peripheral Nerve';
    if (type == 'roots') return 'Root Supply';
    if (type == 'cord') return 'Cord / Trunk';
    return 'Action';
  }

  Widget _sectionLabel(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w800,
        color: Color(0xFF475569),
        letterSpacing: 1.2,
      ),
    );
  }

  Widget _setupPill(String label, bool active, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: active ? const Color(0xFF059669) : const Color(0xFFF1F5F9),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: active
                  ? const Color(0xFF059669)
                  : const Color(0xFFE5E7EB),
            ),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: active ? Colors.white : const Color(0xFF475569),
              fontWeight: FontWeight.w700,
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }

  Widget _topicToggle(
      String label, String key, IconData icon, Color color) {
    final active = _topics[key]!;
    return GestureDetector(
      onTap: () => setState(() => _topics[key] = !active),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: active ? color.withValues(alpha: 0.06) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: active ? color.withValues(alpha: 0.4) : const Color(0xFFE5E7EB),
          ),
        ),
        child: Row(
          children: [
            Icon(icon, color: active ? color : const Color(0xFFCBD5E1), size: 22),
            const SizedBox(width: 14),
            Expanded(
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: active ? color : const Color(0xFF94A3B8),
                ),
              ),
            ),
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 22,
              height: 22,
              decoration: BoxDecoration(
                color: active ? color : const Color(0xFFE5E7EB),
                borderRadius: BorderRadius.circular(6),
              ),
              child: active
                  ? const Icon(Icons.check_rounded,
                      color: Colors.white, size: 16)
                  : null,
            ),
          ],
        ),
      ),
    );
  }
}

// ── EMG CHALLENGE SUB-VIEW ──────────────────────────────────────
class _EMGChallengeView extends StatefulWidget {
  final VoidCallback onBack;
  const _EMGChallengeView({super.key, required this.onBack});

  @override
  State<_EMGChallengeView> createState() => _EMGChallengeViewState();
}

class _EMGChallengeViewState extends State<_EMGChallengeView> {
  bool _isActive = false;
  final Map<String, bool> _activeTypes = {
    'root': true,
    'plexus': true,
    'peripheral': true,
  };
  String _region = 'both';

  int _total = 0;
  int _correct = 0;
  late _Case _currentCase;
  String? _selectedDiagnosis;
  bool _submitted = false;

  @override
  void initState() {
    super.initState();
    _generateCase();
  }

  void _generateCase() {
    final available = <LesionSiteModel>[];
    if (_region == 'UE' || _region == 'both') {
      if (_activeTypes['root']!) {
        available
            .addAll(MuscleData.lesionSites['UE']!.where((l) => l.type == 'root'));
      }
      if (_activeTypes['plexus']!) {
        available.addAll(
            MuscleData.lesionSites['UE']!.where((l) => l.type == 'plexus'));
      }
      if (_activeTypes['peripheral']!) {
        available.addAll(
            MuscleData.lesionSites['UE']!.where((l) => l.type == 'peripheral'));
      }
    }
    if (_region == 'LE' || _region == 'both') {
      if (_activeTypes['root']!) {
        available
            .addAll(MuscleData.lesionSites['LE']!.where((l) => l.type == 'root'));
      }
      if (_activeTypes['peripheral']!) {
        available.addAll(
            MuscleData.lesionSites['LE']!.where((l) => l.type == 'peripheral'));
      }
    }

    if (available.isEmpty) return;

    final correctLesion = available[math.Random().nextInt(available.length)];

    final abnormal =
        (List<String>.from(correctLesion.muscles)..shuffle()).take(4).toList();

    final regionMuscles = MuscleData.muscleDatabase.values
        .where((m) =>
            m.region ==
            (correctLesion.muscles.any(
                    (name) => MuscleData.muscleDatabase[name]?.region == 'UE')
                ? 'UE'
                : 'LE'))
        .map((m) => m.name)
        .toList();
    final potentialNormal =
        regionMuscles.where((m) => !correctLesion.muscles.contains(m)).toList();
    final normal = (potentialNormal..shuffle()).take(4).toList();

    final Set<String> options = {correctLesion.name};
    while (options.length < 4) {
      options.add(available[math.Random().nextInt(available.length)].name);
    }

    _currentCase = _Case(
      correct: correctLesion.name,
      abnormal: abnormal,
      normal: normal,
      options: options.toList()..shuffle(),
    );

    _selectedDiagnosis = null;
    _submitted = false;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: _isActive ? _buildActiveChallenge() : _buildSetup(),
    );
  }

  Widget _buildSetup() {
    return SingleChildScrollView(
      key: const ValueKey('setup'),
      child: Column(
        children: [
          // Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(28, 50, 28, 35),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF312E81), Color(0xFF4338CA)],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                GestureDetector(
                  onTap: widget.onBack,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.arrow_back_ios_new_rounded,
                        color: Colors.white, size: 18),
                  ),
                ),
                const SizedBox(height: 20),
                const Text(
                  'EMG Challenge',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                    letterSpacing: -1,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Clinical case simulation -- localize the lesion',
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.white.withValues(alpha: 0.7),
                  ),
                ),
              ],
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _sectionLabel('TARGET REGION'),
                const SizedBox(height: 12),
                Row(
                  children: [
                    _setupPill('Upper', _region == 'UE',
                        () => setState(() => _region = 'UE')),
                    const SizedBox(width: 10),
                    _setupPill('Lower', _region == 'LE',
                        () => setState(() => _region = 'LE')),
                    const SizedBox(width: 10),
                    _setupPill('Both', _region == 'both',
                        () => setState(() => _region = 'both')),
                  ],
                ),
                const SizedBox(height: 28),
                _sectionLabel('LESION TYPES'),
                const SizedBox(height: 12),
                _lesionTypeCard(
                  'Nerve Roots',
                  'C5-T1, L2-S1 radiculopathies',
                  Icons.account_tree_rounded,
                  const Color(0xFF14B8A6),
                  _activeTypes['root']!,
                  () => setState(
                      () => _activeTypes['root'] = !_activeTypes['root']!),
                ),
                _lesionTypeCard(
                  'Plexus',
                  'Trunk and cord injuries',
                  Icons.hub_rounded,
                  const Color(0xFFF59E0B),
                  _activeTypes['plexus']!,
                  () => setState(
                      () => _activeTypes['plexus'] = !_activeTypes['plexus']!),
                ),
                _lesionTypeCard(
                  'Peripheral Nerve',
                  'Entrapments & neuropathies',
                  Icons.bolt_rounded,
                  const Color(0xFF8B5CF6),
                  _activeTypes['peripheral']!,
                  () => setState(() =>
                      _activeTypes['peripheral'] = !_activeTypes['peripheral']!),
                ),
                const SizedBox(height: 36),
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton(
                    onPressed: () {
                      _generateCase();
                      setState(() => _isActive = true);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF4F46E5),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14)),
                      elevation: 0,
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.play_arrow_rounded, size: 22),
                        SizedBox(width: 8),
                        Text(
                          'BEGIN CHALLENGE',
                          style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 1),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActiveChallenge() {
    return SingleChildScrollView(
      key: const ValueKey('active'),
      child: Column(
        children: [
          // Case header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF312E81), Color(0xFF4338CA)],
              ),
            ),
            child: SafeArea(
              bottom: false,
              child: Row(
                children: [
                  const Expanded(
                    child: Text(
                      'Case Analysis',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '$_correct / $_total correct',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // EMG findings panel
                const Text(
                  'EMG FINDINGS',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF475569),
                    letterSpacing: 1.2,
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: _findingsPanel(
                        'Abnormal',
                        _currentCase.abnormal,
                        const Color(0xFFDC2626),
                        const Color(0xFFFEF2F2),
                        Icons.warning_amber_rounded,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _findingsPanel(
                        'Normal',
                        _currentCase.normal,
                        const Color(0xFF059669),
                        const Color(0xFFF0FDF4),
                        Icons.check_circle_outline_rounded,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 28),

                // Diagnosis prompt
                const Text(
                  'LOCALIZE THE LESION',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF475569),
                    letterSpacing: 1.2,
                  ),
                ),
                const SizedBox(height: 12),
                ..._currentCase.options.map((opt) => _diagnosisOption(opt)),

                const SizedBox(height: 20),

                // Submit / Next
                if (!_submitted && _selectedDiagnosis != null)
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _submitted = true;
                          _total++;
                          if (_selectedDiagnosis == _currentCase.correct) {
                            _correct++;
                          }
                        });
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF4F46E5),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14)),
                        elevation: 0,
                      ),
                      child: const Text('SUBMIT ANALYSIS',
                          style: TextStyle(
                              fontWeight: FontWeight.w800, letterSpacing: 1)),
                    ),
                  ),

                if (_submitted) ...[
                  _buildCaseFeedback(),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: ElevatedButton(
                      onPressed: _generateCase,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF4F46E5),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14)),
                        elevation: 0,
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('NEXT CASE',
                              style: TextStyle(
                                  fontWeight: FontWeight.w800,
                                  letterSpacing: 1)),
                          SizedBox(width: 8),
                          Icon(Icons.arrow_forward_rounded, size: 20),
                        ],
                      ),
                    ),
                  ),
                ],

                const SizedBox(height: 16),
                Center(
                  child: TextButton(
                    onPressed: () => setState(() => _isActive = false),
                    child: const Text(
                      'BACK TO SETTINGS',
                      style: TextStyle(
                        color: Color(0xFF94A3B8),
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _findingsPanel(
      String title, List<String> muscles, Color color, Color bg, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 16),
              const SizedBox(width: 6),
              Text(
                title.toUpperCase(),
                style: TextStyle(
                  color: color,
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          ...muscles.map((m) => Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 5,
                      height: 5,
                      margin: const EdgeInsets.only(top: 6, right: 8),
                      decoration: BoxDecoration(
                        color: color,
                        shape: BoxShape.circle,
                      ),
                    ),
                    Expanded(
                      child: Text(
                        m,
                        style: TextStyle(
                          fontSize: 13,
                          color: color,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }

  Widget _diagnosisOption(String opt) {
    final bool isSelected = _selectedDiagnosis == opt;
    final bool isCorrect = opt == _currentCase.correct;

    Color borderColor = const Color(0xFFE5E7EB);
    Color bgColor = Colors.white;
    Color textColor = const Color(0xFF334155);

    if (_submitted) {
      if (isCorrect) {
        borderColor = const Color(0xFF10B981);
        bgColor = const Color(0xFFECFDF5);
        textColor = const Color(0xFF065F46);
      } else if (isSelected) {
        borderColor = const Color(0xFFEF4444);
        bgColor = const Color(0xFFFEF2F2);
        textColor = const Color(0xFF991B1B);
      }
    } else if (isSelected) {
      borderColor = const Color(0xFF6366F1);
      bgColor = const Color(0xFFEEF2FF);
      textColor = const Color(0xFF4338CA);
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap:
              !_submitted ? () => setState(() => _selectedDiagnosis = opt) : null,
          borderRadius: BorderRadius.circular(12),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: bgColor,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: borderColor, width: 1.5),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    opt,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: textColor,
                    ),
                  ),
                ),
                if (_submitted && isCorrect)
                  const Icon(Icons.check_circle_rounded,
                      color: Color(0xFF10B981), size: 20),
                if (_submitted && isSelected && !isCorrect)
                  const Icon(Icons.cancel_rounded,
                      color: Color(0xFFEF4444), size: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCaseFeedback() {
    final bool win = _selectedDiagnosis == _currentCase.correct;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: win ? const Color(0xFFF0FDF4) : const Color(0xFFFEF2F2),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: win
              ? const Color(0xFF10B981).withValues(alpha: 0.3)
              : const Color(0xFFEF4444).withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                win ? Icons.check_circle_rounded : Icons.error_rounded,
                color:
                    win ? const Color(0xFF059669) : const Color(0xFFDC2626),
                size: 22,
              ),
              const SizedBox(width: 10),
              Text(
                win ? 'Correct Localization' : 'Incorrect',
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w800,
                  color: win
                      ? const Color(0xFF059669)
                      : const Color(0xFFDC2626),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            'The pattern of ${_currentCase.abnormal.join(", ")} being abnormal while ${_currentCase.normal.join(", ")} remain normal localizes to the ${_currentCase.correct}.',
            style: const TextStyle(
              fontSize: 13,
              color: Color(0xFF334155),
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _sectionLabel(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w800,
        color: Color(0xFF475569),
        letterSpacing: 1.2,
      ),
    );
  }

  Widget _setupPill(String label, bool active, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: active ? const Color(0xFF4F46E5) : const Color(0xFFF1F5F9),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color:
                  active ? const Color(0xFF4F46E5) : const Color(0xFFE5E7EB),
            ),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: active ? Colors.white : const Color(0xFF475569),
              fontWeight: FontWeight.w700,
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }

  Widget _lesionTypeCard(String title, String sub, IconData icon, Color color,
      bool active, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: active ? color.withValues(alpha: 0.06) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color:
                active ? color.withValues(alpha: 0.4) : const Color(0xFFE5E7EB),
          ),
        ),
        child: Row(
          children: [
            Icon(icon,
                color: active ? color : const Color(0xFFCBD5E1), size: 22),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: active ? color : const Color(0xFF94A3B8),
                    ),
                  ),
                  Text(
                    sub,
                    style: const TextStyle(
                        fontSize: 12, color: Color(0xFF94A3B8)),
                  ),
                ],
              ),
            ),
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 22,
              height: 22,
              decoration: BoxDecoration(
                color: active ? color : const Color(0xFFE5E7EB),
                borderRadius: BorderRadius.circular(6),
              ),
              child: active
                  ? const Icon(Icons.check_rounded,
                      color: Colors.white, size: 16)
                  : null,
            ),
          ],
        ),
      ),
    );
  }
}

class _Case {
  final String correct;
  final List<String> abnormal;
  final List<String> normal;
  final List<String> options;
  _Case({
    required this.correct,
    required this.abnormal,
    required this.normal,
    required this.options,
  });
}
