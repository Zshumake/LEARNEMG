import 'package:flutter/material.dart';
import 'dart:math' as math;
import '../../../data/muscle_data.dart';
import '../../../data/models/muscle_model.dart';
import '../../../core/theme/app_theme.dart';

class QuizEngineView extends StatefulWidget {
  final VoidCallback onBack;
  const QuizEngineView({super.key, required this.onBack});

  @override
  State<QuizEngineView> createState() => _QuizEngineViewState();
}

class _QuizEngineViewState extends State<QuizEngineView> {
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
    if (!mounted) return; // reached via Future.delayed; route may be gone
    final allMuscles = MuscleData.muscleDatabase.values.where((m) {
      if (_region == 'upper') return m.region == 'UE';
      if (_region == 'lower') return m.region == 'LE';
      return true;
    }).toList();

    _currentMuscle = allMuscles[math.Random().nextInt(allMuscles.length)];

    // Pick a question type valid for THIS muscle. "Cord" is a brachial-plexus
    // concept, so leg muscles (which have no cord) never get a cord question
    // -- it would only ever have "N/A" as an answer.
    var activeTypes = _topics.entries
        .where((e) => e.value)
        .map((e) => e.key)
        .toList();
    if (_currentMuscle.region == 'LE') {
      activeTypes = activeTypes.where((t) => t != 'cord').toList();
    }
    if (activeTypes.isEmpty) activeTypes = ['actions']; // safe fallback
    _currentType = activeTypes[math.Random().nextInt(activeTypes.length)];

    final correctAns = _getAnswer(_currentMuscle, _currentType);
    final Set<String> options = {correctAns};

    // Distractors come from the SAME extremity as the question muscle, so an
    // upper-extremity question never offers leg answers (and vice versa) even
    // when the quiz is set to "Both". Bounded so it can't spin forever if a
    // type has fewer than four distinct answers within one extremity.
    final distractorPool = MuscleData.muscleDatabase.values
        .where((m) => m.region == _currentMuscle.region)
        .toList();
    var attempts = 0;
    while (options.length < 4 && attempts < 200) {
      attempts++;
      final m = distractorPool[math.Random().nextInt(distractorPool.length)];
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
                    child: const Icon(
                      Icons.arrow_back_ios_new_rounded,
                      color: Colors.white,
                      size: 18,
                    ),
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
                    _setupPill(
                      'Upper',
                      _region == 'upper',
                      () => setState(() => _region = 'upper'),
                    ),
                    const SizedBox(width: 10),
                    _setupPill(
                      'Lower',
                      _region == 'lower',
                      () => setState(() => _region = 'lower'),
                    ),
                    const SizedBox(width: 10),
                    _setupPill(
                      'Both',
                      _region == 'both',
                      () => setState(() => _region = 'both'),
                    ),
                  ],
                ),
                const SizedBox(height: 28),
                _sectionLabel('TEST TOPICS'),
                const SizedBox(height: 12),
                _topicToggle(
                  'Peripheral Nerve',
                  'nerve',
                  Icons.bolt_rounded,
                  const Color(0xFF0EA5E9),
                ),
                _topicToggle(
                  'Nerve Roots',
                  'roots',
                  Icons.account_tree_rounded,
                  AppTheme.warning,
                ),
                _topicToggle(
                  'Cord / Trunk',
                  'cord',
                  Icons.hub_rounded,
                  const Color(0xFF8B5CF6),
                ),
                _topicToggle(
                  'Muscle Actions',
                  'actions',
                  Icons.fitness_center_rounded,
                  AppTheme.danger,
                ),
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
                        borderRadius: BorderRadius.circular(14),
                      ),
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
                            letterSpacing: 1,
                          ),
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
    final accuracy = _answered > 0 ? (_correct * 100 / _answered).round() : 0;

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
                  _liveStatBadge(
                    '$_correct/$_answered',
                    'Score',
                    const Color(0xFF34D399),
                  ),
                  const SizedBox(width: 12),
                  _liveStatBadge(
                    '$accuracy%',
                    'Accuracy',
                    const Color(0xFF60A5FA),
                  ),
                  const SizedBox(width: 12),
                  _liveStatBadge('$_streak', 'Streak', const Color(0xFFFBBF24)),
                  const Spacer(),
                  GestureDetector(
                    onTap: () => setState(() => _quizStarted = false),
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(
                        Icons.settings_rounded,
                        color: Colors.white,
                        size: 18,
                      ),
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
                    color: AppTheme.textMuted,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 12),
                // Muscle name
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 20,
                  ),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [AppTheme.slate950, AppTheme.textHeading],
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
                ..._options.asMap().entries.map(
                  (entry) => _buildQuizOption(entry.key, entry.value),
                ),
                const SizedBox(height: 24),
                // Skip button
                if (_selectedOption == null)
                  TextButton(
                    onPressed: _nextQuestion,
                    child: const Text(
                      'SKIP',
                      style: TextStyle(
                        color: AppTheme.slate400,
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
    Color textColor = AppTheme.textMain;
    Color letterBg = AppTheme.slate100;
    Color letterColor = AppTheme.textMuted;

    if (_selectedOption != null) {
      if (isCorrect) {
        borderColor = AppTheme.success;
        bgColor = const Color(0xFFECFDF5);
        textColor = const Color(0xFF065F46);
        letterBg = AppTheme.success;
        letterColor = Colors.white;
      } else if (isSelected) {
        borderColor = AppTheme.danger;
        bgColor = const Color(0xFFFEF2F2);
        textColor = const Color(0xFF991B1B);
        letterBg = AppTheme.danger;
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
                  const Icon(
                    Icons.check_circle_rounded,
                    color: AppTheme.success,
                    size: 22,
                  ),
                if (_selectedOption != null && isSelected && !isCorrect)
                  const Icon(
                    Icons.cancel_rounded,
                    color: AppTheme.danger,
                    size: 22,
                  ),
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
        color: AppTheme.slate600,
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
            color: active ? const Color(0xFF059669) : AppTheme.slate100,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: active ? const Color(0xFF059669) : const Color(0xFFE5E7EB),
            ),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: active ? Colors.white : AppTheme.slate600,
              fontWeight: FontWeight.w700,
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }

  Widget _topicToggle(String label, String key, IconData icon, Color color) {
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
            color: active
                ? color.withValues(alpha: 0.4)
                : const Color(0xFFE5E7EB),
          ),
        ),
        child: Row(
          children: [
            Icon(icon, color: active ? color : AppTheme.slate300, size: 22),
            const SizedBox(width: 14),
            Expanded(
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: active ? color : AppTheme.slate400,
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
                  ? const Icon(
                      Icons.check_rounded,
                      color: Colors.white,
                      size: 16,
                    )
                  : null,
            ),
          ],
        ),
      ),
    );
  }
}

// ── EMG CHALLENGE SUB-VIEW ──────────────────────────────────────
