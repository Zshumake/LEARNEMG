import 'package:flutter/material.dart';
import '../../data/muscle_data.dart';
import '../../data/models/muscle_model.dart';
import 'dart:math' as math;

class MuscleLabView extends StatefulWidget {
  const MuscleLabView({super.key});

  @override
  State<MuscleLabView> createState() => _MuscleLabViewState();
}

class _MuscleLabViewState extends State<MuscleLabView> {
  String _activeView = 'menu'; // 'menu', 'cards', 'quiz', 'challenge'

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: _buildCurrentView(),
    );
  }

  Widget _buildCurrentView() {
    switch (_activeView) {
      case 'cards':
        return _StudyCardsView(
          onBack: () => setState(() => _activeView = 'menu'),
        );
      case 'quiz':
        return _QuizEngineView(
          onBack: () => setState(() => _activeView = 'menu'),
        );
      case 'challenge':
        return _EMGChallengeView(
          onBack: () => setState(() => _activeView = 'menu'),
        );
      default:
        return _buildMenu();
    }
  }

  Widget _buildMenu() {
    return SingleChildScrollView(
      key: const ValueKey('menu'),
      padding: const EdgeInsets.all(25),
      child: Column(
        children: [
          _buildHeroBanner(),
          const SizedBox(height: 30),
          _buildMenuCard(
            title: "Master Every Muscle",
            description:
                "Dive deep into over 40 muscles with interactive cards. Review innervation, roots, and actions.",
            icon: Icons.grid_view_rounded,
            color: const Color(0xFF0D9488),
            btnColor: const Color(0xFF0EA5E9),
            onTap: () => setState(() => _activeView = 'cards'),
          ),
          const SizedBox(height: 25),
          _buildMenuCard(
            title: "Anatomy Quiz Engine",
            description:
                "Test your rapid recall with an infinite generator. Customize topics and build diagnostic intuition.",
            icon: Icons.star_rounded,
            color: const Color(0xFF10B981),
            btnColor: const Color(0xFF10B981),
            onTap: () => setState(() => _activeView = 'quiz'),
          ),
          const SizedBox(height: 25),
          _buildMenuCard(
            title: "Clinical EMG Challenge",
            description:
                "Challenge yourself with real clinical scenarios. Analyze abnormal findings and identify lesions.",
            icon: Icons.show_chart_rounded,
            color: const Color(0xFF6366F1),
            btnColor: const Color(0xFF6366F1),
            onTap: () => setState(() => _activeView = 'challenge'),
          ),
          const SizedBox(height: 40),
          const Text(
            "Module 9: Advanced Muscle Lab • Dr. Zachary Shumaker",
            style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
          ),
        ],
      ),
    );
  }

  Widget _buildHeroBanner() {
    return Container(
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFF8FAFC), Color(0xFFF1F5F9)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
      ),
      child: const Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Advanced Muscle Laboratory",
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF0F172A),
                  ),
                ),
                SizedBox(height: 5),
                Text(
                  "Preston & Shapiro Complete Muscle Database",
                  style: TextStyle(
                    fontSize: 14,
                    color: Color(0xFF64748B),
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuCard({
    required String title,
    required String description,
    required IconData icon,
    required Color color,
    required Color btnColor,
    required VoidCallback onTap,
  }) {
    return Container(
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(25),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 40,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 32, color: color),
              const SizedBox(width: 15),
              Text(
                title,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          Text(
            description,
            style: const TextStyle(
              fontSize: 16,
              color: Color(0xFF64748B),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 25),
          ElevatedButton(
            onPressed: onTap,
            style: ElevatedButton.styleFrom(
              backgroundColor: btnColor,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(50),
              ),
              elevation: 8,
              shadowColor: btnColor.withValues(alpha: 0.4),
            ),
            child: const Text(
              "LAUNCH MODULE",
              style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1),
            ),
          ),
        ],
      ),
    );
  }
}

// ── STUDY CARDS SUB-VIEW ──────────────────────────────────────
class _StudyCardsView extends StatefulWidget {
  final VoidCallback onBack;
  const _StudyCardsView({required this.onBack});

  @override
  State<_StudyCardsView> createState() => _StudyCardsViewState();
}

class _StudyCardsViewState extends State<_StudyCardsView> {
  String _region = 'LE'; // 'UE' or 'LE'
  final Set<String> _revealedNerves = {};
  final Set<String> _revealedRoots = {};
  final Set<String> _revealedCords = {};
  final Set<String> _revealedActions = {};

  @override
  Widget build(BuildContext context) {
    final muscles = MuscleData.muscleDatabase.values
        .where((m) => m.region == _region)
        .toList();

    return Column(
      children: [
        _buildHero(
          "Advanced Muscle Laboratory",
          "Comprehensive Muscle Database",
          Icons.science_rounded,
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            children: [
              IconButton(
                onPressed: widget.onBack,
                icon: const Icon(Icons.arrow_back_ios_new_rounded),
              ),
              const Spacer(),
              _pillTab(
                "Lower Extremity",
                _region == 'LE',
                () => setState(() => _region = 'LE'),
              ),
              const SizedBox(width: 10),
              _pillTab(
                "Upper Extremity",
                _region == 'UE',
                () => setState(() => _region = 'UE'),
              ),
              const Spacer(),
            ],
          ),
        ),
        const SizedBox(height: 15),
        _buildGlobalControls(),
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(20),
            itemCount: muscles.length,
            itemBuilder: (context, index) => _buildMuscleCard(muscles[index]),
          ),
        ),
      ],
    );
  }

  Widget _buildHero(String title, String subtitle, IconData icon) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.all(20),
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF14B8A6), Color(0xFF06B6D4), Color(0xFF8B5CF6)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF14B8A6).withValues(alpha: 0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: Colors.white, size: 40),
          const SizedBox(height: 15),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 22,
              fontWeight: FontWeight.w900,
            ),
          ),
          Text(
            subtitle,
            style: TextStyle(
              color: Colors.white.withValues(alpha: 0.9),
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }

  Widget _pillTab(String label, bool active, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: active ? const Color(0xFFF0FDFA) : Colors.white,
          borderRadius: BorderRadius.circular(25),
          border: Border.all(
            color: active ? const Color(0xFF14B8A6) : const Color(0xFFE2E8F0),
            width: 2,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: active ? const Color(0xFF0D9488) : const Color(0xFF64748B),
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }

  Widget _buildGlobalControls() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: [
          _controlBtn(
            "Reveal All",
            Icons.auto_awesome,
            () => setState(() {
              final allMuscles = MuscleData.muscleDatabase.keys.toList();
              _revealedNerves.addAll(allMuscles);
              _revealedRoots.addAll(allMuscles);
              _revealedCords.addAll(allMuscles);
              _revealedActions.addAll(allMuscles);
            }),
          ),
          _controlBtn(
            "Nerves",
            Icons.bolt,
            () => setState(
              () => _revealedNerves.addAll(MuscleData.muscleDatabase.keys),
            ),
          ),
          _controlBtn(
            "Roots",
            Icons.account_tree,
            () => setState(
              () => _revealedRoots.addAll(MuscleData.muscleDatabase.keys),
            ),
          ),
          _controlBtn(
            "Cords",
            Icons.hub_rounded,
            () => setState(
              () => _revealedCords.addAll(MuscleData.muscleDatabase.keys),
            ),
          ),
          _controlBtn(
            "Actions",
            Icons.fitness_center,
            () => setState(
              () => _revealedActions.addAll(MuscleData.muscleDatabase.keys),
            ),
          ),
        ],
      ),
    );
  }

  Widget _controlBtn(String label, IconData icon, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ActionChip(
        avatar: Icon(icon, size: 16, color: const Color(0xFF475569)),
        label: Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
            color: Color(0xFF475569),
          ),
        ),
        backgroundColor: const Color(0xFFF1F5F9),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        onPressed: onTap,
      ),
    );
  }

  Widget _buildMuscleCard(MuscleModel muscle) {
    return Container(
      margin: const EdgeInsets.only(bottom: 15),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: const Color(0xFF14B8A6).withValues(alpha: 0.15),
          width: 2,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            muscle.name,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: Color(0xFF0F766E),
            ),
          ),
          const SizedBox(height: 15),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _attrBtn(
                "Nerve",
                _revealedNerves.contains(muscle.name),
                () => setState(() => _revealedNerves.add(muscle.name)),
              ),
              _attrBtn(
                "Roots",
                _revealedRoots.contains(muscle.name),
                () => setState(() => _revealedRoots.add(muscle.name)),
              ),
              if (muscle.cord != null)
                _attrBtn(
                  "Cord",
                  _revealedCords.contains(muscle.name),
                  () => setState(() => _revealedCords.add(muscle.name)),
                ),
              _attrBtn(
                "Actions",
                _revealedActions.contains(muscle.name),
                () => setState(() => _revealedActions.add(muscle.name)),
              ),
            ],
          ),
          if (_revealedNerves.contains(muscle.name))
            _detailRow("Nerve", muscle.peripheralNerve),
          if (_revealedRoots.contains(muscle.name))
            _detailRow("Roots", muscle.roots.join(', ')),
          if (_revealedCords.contains(muscle.name) && muscle.cord != null)
            _detailRow("Cord", muscle.cord!),
          if (_revealedActions.contains(muscle.name))
            _detailRow("Actions", muscle.actions),
        ],
      ),
    );
  }

  Widget _attrBtn(String label, bool revealed, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: revealed ? const Color(0xFF0D9488) : const Color(0xFFF0FDFA),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xFFCCFBF1)),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: revealed ? Colors.white : const Color(0xFF0D9488),
            fontSize: 12,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget _detailRow(String label, String value) {
    return Container(
      margin: const EdgeInsets.only(top: 10),
      padding: const EdgeInsets.all(10),
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFFF0F9FF),
        border: const Border(
          left: BorderSide(color: Color(0xFF0EA5E9), width: 3),
        ),
        borderRadius: BorderRadius.circular(4),
      ),
      child: RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "$label: ",
              style: const TextStyle(
                fontWeight: FontWeight.w900,
                color: Color(0xFF0F172A),
                fontSize: 13,
              ),
            ),
            TextSpan(
              text: value,
              style: const TextStyle(color: Color(0xFF334155), fontSize: 13),
            ),
          ],
        ),
      ),
    );
  }
}

// ── QUIZ ENGINE SUB-VIEW ──────────────────────────────────────
class _QuizEngineView extends StatefulWidget {
  final VoidCallback onBack;
  const _QuizEngineView({required this.onBack});

  @override
  State<_QuizEngineView> createState() => _QuizEngineViewState();
}

class _QuizEngineViewState extends State<_QuizEngineView> {
  bool _quizStarted = false;
  String _region = 'both'; // 'upper', 'lower', 'both'
  final Map<String, bool> _topics = {
    'nerve': true,
    'roots': true,
    'cord': true,
    'actions': true,
  };

  // Session State
  int _answered = 0;
  int _correct = 0;
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

    final activeTypes = _topics.entries
        .where((e) => e.value)
        .map((e) => e.key)
        .toList();
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
      padding: const EdgeInsets.all(25),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFECFDF5),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.check_circle_outline_rounded,
              size: 40,
              color: Color(0xFF10B981),
            ),
          ),
          const SizedBox(height: 20),
          const Text(
            "Configure Study Quiz",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
          ),
          const Text(
            "Customize your rapid-fire anatomy review.",
            style: TextStyle(color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 30),
          _setupSection("Target Extremity", [
            _choicePill(
              "Upper",
              _region == 'upper',
              () => setState(() => _region = 'upper'),
            ),
            _choicePill(
              "Lower",
              _region == 'lower',
              () => setState(() => _region = 'lower'),
            ),
            _choicePill(
              "Both",
              _region == 'both',
              () => setState(() => _region = 'both'),
            ),
          ]),
          const SizedBox(height: 25),
          _setupSection("Test Topics", [
            _topicCheck("Peripheral Nerve", 'nerve'),
            _topicCheck("Nerve Roots", 'roots'),
            _topicCheck("Cord / Trunk", 'cord'),
            _topicCheck("Muscle Actions", 'actions'),
          ]),
          const SizedBox(height: 40),
          _actionBtn("START QUIZ ENGINE", Icons.play_arrow_rounded, () {
            setState(() {
              _quizStarted = true;
              _answered = 0;
              _correct = 0;
              _nextQuestion();
            });
          }),
          const SizedBox(height: 20),
          TextButton(
            onPressed: widget.onBack,
            child: const Text(
              "CANCEL",
              style: TextStyle(
                color: Color(0xFF64748B),
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _setupSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title.toUpperCase(),
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w900,
            color: Color(0xFF475569),
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 15),
        Wrap(spacing: 12, runSpacing: 12, children: children),
      ],
    );
  }

  Widget _choicePill(String label, bool active, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: active ? const Color(0xFF10B981) : const Color(0xFFF1F5F9),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: active ? Colors.white : const Color(0xFF1E293B),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget _topicCheck(String label, String key) {
    final active = _topics[key]!;
    return GestureDetector(
      onTap: () => setState(() => _topics[key] = !active),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: active ? const Color(0xFFF0FDF4) : Colors.white,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: active ? const Color(0xFF10B981) : const Color(0xFFCBD5E1),
            width: 2,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              active
                  ? Icons.check_box_rounded
                  : Icons.check_box_outline_blank_rounded,
              color: active ? const Color(0xFF10B981) : const Color(0xFF94A3B8),
              size: 20,
            ),
            const SizedBox(width: 10),
            Text(
              label,
              style: TextStyle(
                color: active
                    ? const Color(0xFF065F46)
                    : const Color(0xFF64748B),
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuizArea() {
    return SingleChildScrollView(
      key: const ValueKey('quiz'),
      padding: const EdgeInsets.all(25),
      child: Column(
        children: [
          _buildStatsRow(),
          const SizedBox(height: 30),
          Text(
            "Identify the ${_getTypeLabel(_currentType)}",
            style: const TextStyle(
              fontSize: 18,
              color: Color(0xFF64748B),
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 15),
            decoration: BoxDecoration(
              color: const Color(0xFFE0E7FF),
              borderRadius: BorderRadius.circular(50),
              border: Border.all(color: const Color(0xFFC7D2FE), width: 2),
            ),
            child: Text(
              _currentMuscle.name,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w900,
                color: Color(0xFF4338CA),
              ),
            ),
          ),
          const SizedBox(height: 40),
          ..._options.map((opt) => _buildOptionBtn(opt)),
          const SizedBox(height: 40),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextButton(
                onPressed: () => setState(() => _quizStarted = false),
                child: const Text(
                  "SETTINGS",
                  style: TextStyle(
                    color: Color(0xFF64748B),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: _nextQuestion,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFF1F5F9),
                  foregroundColor: const Color(0xFF475569),
                  elevation: 0,
                ),
                child: const Text("SKIP"),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _getTypeLabel(String type) {
    if (type == 'nerve') return 'Peripheral Nerve';
    if (type == 'roots') return 'Root Supply';
    if (type == 'cord') return 'Cord/Trunk';
    return 'Action';
  }

  Widget _buildStatsRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          "SESSION PROGRESS",
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w900,
            color: Color(0xFF94A3B8),
            letterSpacing: 1,
          ),
        ),
        Row(
          children: [
            _statItem(
              "Correct",
              "$_correct/$_answered",
              const Color(0xFF10B981),
            ),
            const SizedBox(width: 20),
            _statItem(
              "Accuracy",
              "${_answered > 0 ? (_correct * 100 / _answered).round() : 0}%",
              const Color(0xFF3B82F6),
            ),
          ],
        ),
      ],
    );
  }

  Widget _statItem(String label, String val, Color c) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Text(
          label.toUpperCase(),
          style: const TextStyle(fontSize: 10, color: Color(0xFF94A3B8)),
        ),
        Text(
          val,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: c),
        ),
      ],
    );
  }

  Widget _buildOptionBtn(String opt) {
    final bool isSelected = _selectedOption == opt;
    final bool isCorrect = opt == _getAnswer(_currentMuscle, _currentType);

    Color border = const Color(0xFFE2E8F0);
    Color bg = Colors.white;
    Color text = const Color(0xFF334155);

    if (_selectedOption != null) {
      if (isCorrect) {
        border = const Color(0xFF10B981);
        bg = const Color(0xFFECFDF5);
        text = const Color(0xFF047857);
      } else if (isSelected) {
        border = const Color(0xFFEF4444);
        bg = const Color(0xFFFEF2F2);
        text = const Color(0xFFB91C1C);
      }
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: _selectedOption == null
            ? () {
                setState(() {
                  _selectedOption = opt;
                  _answered++;
                  if (isCorrect) {
                    _correct++;
                    Future.delayed(
                      const Duration(milliseconds: 1500),
                      _nextQuestion,
                    );
                  }
                });
              }
            : null,
        borderRadius: BorderRadius.circular(12),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: border, width: 2),
          ),
          child: Row(
            children: [
              Container(
                width: 30,
                height: 30,
                decoration: BoxDecoration(
                  color: isSelected && !isCorrect
                      ? const Color(0xFFFEE2E2)
                      : const Color(0xFFF1F5F9),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    String.fromCharCode(65 + _options.indexOf(opt)),
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15),
              Expanded(
                child: Text(
                  opt,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: text,
                  ),
                ),
              ),
              if (_selectedOption != null && isCorrect)
                const Icon(
                  Icons.check_circle_rounded,
                  color: Color(0xFF10B981),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _actionBtn(String label, IconData icon, VoidCallback onTap) {
    return ElevatedButton(
      onPressed: onTap,
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF10B981),
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 60),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        elevation: 8,
        shadowColor: const Color(0xFF10B981).withValues(alpha: 0.4),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon),
          const SizedBox(width: 10),
          Text(
            label,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w900,
              letterSpacing: 1,
            ),
          ),
        ],
      ),
    );
  }
}

// ── EMG CHALLENGE SUB-VIEW ──────────────────────────────────────
class _EMGChallengeView extends StatefulWidget {
  final VoidCallback onBack;
  const _EMGChallengeView({required this.onBack});

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
  String _region = 'both'; // 'UE', 'LE', 'both'

  // Game State
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
    if ((_region == 'UE' || _region == 'both')) {
      if (_activeTypes['root']!)
        available.addAll(
          MuscleData.lesionSites['UE']!.where((l) => l.type == 'root'),
        );
      if (_activeTypes['plexus']!)
        available.addAll(
          MuscleData.lesionSites['UE']!.where((l) => l.type == 'plexus'),
        );
      if (_activeTypes['peripheral']!)
        available.addAll(
          MuscleData.lesionSites['UE']!.where((l) => l.type == 'peripheral'),
        );
    }

    if ((_region == 'LE' || _region == 'both')) {
      if (_activeTypes['root']!)
        available.addAll(
          MuscleData.lesionSites['LE']!.where((l) => l.type == 'root'),
        );
      if (_activeTypes['peripheral']!)
        available.addAll(
          MuscleData.lesionSites['LE']!.where((l) => l.type == 'peripheral'),
        );
    }

    final correctLesion = available[math.Random().nextInt(available.length)];

    // Pick 4 abnormal muscles from the lesion
    final abnormal = (List<String>.from(
      correctLesion.muscles,
    )..shuffle()).take(4).toList();

    // Pick 4 normal muscles from same region but NOT in the lesion muscles
    final regionMuscles = MuscleData.muscleDatabase.values
        .where(
          (m) =>
              m.region ==
              (correctLesion.muscles.any(
                    (name) => MuscleData.muscleDatabase[name]?.region == 'UE',
                  )
                  ? 'UE'
                  : 'LE'),
        )
        .map((m) => m.name)
        .toList();
    final potentialNormal = regionMuscles
        .where((m) => !correctLesion.muscles.contains(m))
        .toList();
    final normal = (potentialNormal..shuffle()).take(4).toList();

    // Generate options
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
      padding: const EdgeInsets.all(25),
      child: Column(
        children: [
          IconButton(
            onPressed: widget.onBack,
            icon: const Icon(Icons.arrow_back_ios_new_rounded),
          ),
          const SizedBox(height: 10),
          const Icon(
            Icons.show_chart_rounded,
            size: 50,
            color: Color(0xFF6366F1),
          ),
          const SizedBox(height: 20),
          const Text(
            "Clinical Case Challenge",
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900),
          ),
          const Text(
            "Configure your challenge and test diagnostic skills",
            style: TextStyle(color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 30),
          _setupSection("Target Region", [
            _choicePill(
              "Upper",
              _region == 'UE',
              () => setState(() => _region = 'UE'),
            ),
            _choicePill(
              "Lower",
              _region == 'LE',
              () => setState(() => _region = 'LE'),
            ),
            _choicePill(
              "Both",
              _region == 'both',
              () => setState(() => _region = 'both'),
            ),
          ]),
          const SizedBox(height: 25),
          _typeToggle(
            "Nerve Roots",
            "C5-T1, L2-S1 radiculopathies",
            Icons.account_tree_rounded,
            const Color(0xFF14B8A6),
            _activeTypes['root']!,
            () => setState(() => _activeTypes['root'] = !_activeTypes['root']!),
          ),
          _typeToggle(
            "Plexus",
            "Trunk and cord injuries",
            Icons.hub_rounded,
            const Color(0xFFF59E0B),
            _activeTypes['plexus']!,
            () => setState(
              () => _activeTypes['plexus'] = !_activeTypes['plexus']!,
            ),
          ),
          _typeToggle(
            "Peripheral Nerve",
            "Entrapments & neuropathies",
            Icons.bolt_rounded,
            const Color(0xFF8B5CF6),
            _activeTypes['peripheral']!,
            () => setState(
              () => _activeTypes['peripheral'] = !_activeTypes['peripheral']!,
            ),
          ),
          const SizedBox(height: 50),
          _actionBtn(
            "BEGIN CHALLENGE",
            Icons.play_arrow_rounded,
            () => setState(() => _isActive = true),
          ),
        ],
      ),
    );
  }

  Widget _typeToggle(
    String title,
    String sub,
    IconData icon,
    Color c,
    bool active,
    VoidCallback onTap,
  ) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 15),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: active ? c.withValues(alpha: 0.05) : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: active ? c : const Color(0xFFE2E8F0),
            width: 2,
          ),
        ),
        child: Row(
          children: [
            Icon(icon, color: active ? c : const Color(0xFF94A3B8), size: 30),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                      color: active ? c : const Color(0xFF475569),
                    ),
                  ),
                  Text(
                    sub,
                    style: const TextStyle(
                      fontSize: 13,
                      color: Color(0xFF94A3B8),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: 18,
              height: 18,
              decoration: BoxDecoration(
                color: active ? c : const Color(0xFFE2E8F0),
                shape: BoxShape.circle,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActiveChallenge() {
    return SingleChildScrollView(
      key: const ValueKey('active'),
      padding: const EdgeInsets.all(25),
      child: Column(
        children: [
          const Text(
            "EMG CASE ANALYSIS",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
          ),
          const Text(
            "Review findings and select the lesion location.",
            style: TextStyle(color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 30),
          Row(
            children: [
              Expanded(
                child: _findingsCard(
                  "Abnormal",
                  _currentCase.abnormal,
                  const Color(0xFFFEF2F2),
                  const Color(0xFFDC2626),
                  Icons.close_rounded,
                ),
              ),
              const SizedBox(width: 15),
              Expanded(
                child: _findingsCard(
                  "Normal",
                  _currentCase.normal,
                  const Color(0xFFF0FDF4),
                  const Color(0xFF059669),
                  Icons.check_rounded,
                ),
              ),
            ],
          ),
          const SizedBox(height: 30),
          const Text(
            "Where is the lesion?",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 20),
          ..._currentCase.options.map((opt) => _buildDiagnosisBtn(opt)),
          const SizedBox(height: 30),
          if (_submitted) _buildFeedback(),
          if (!_submitted)
            _actionBtn("SUBMIT ANALYSIS", Icons.check_rounded, () {
              if (_selectedDiagnosis != null) {
                setState(() {
                  _submitted = true;
                  _total++;
                  if (_selectedDiagnosis == _currentCase.correct) _correct++;
                });
              }
            }),
          if (_submitted)
            _actionBtn("NEXT CASE", Icons.arrow_forward_rounded, _generateCase),
          const SizedBox(height: 20),
          TextButton(
            onPressed: () => setState(() => _isActive = false),
            child: const Text(
              "BACK TO SETTINGS",
              style: TextStyle(
                color: Color(0xFF64748B),
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _findingsCard(
    String title,
    List<String> muscles,
    Color bg,
    Color c,
    IconData icon,
  ) {
    return Container(
      padding: const EdgeInsets.all(20),
      height: 200,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: c.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: c, size: 20),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(color: c, fontWeight: FontWeight.w900),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Expanded(
            child: ListView(
              children: muscles
                  .map(
                    (m) => Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text(
                        "• $m",
                        style: TextStyle(
                          fontSize: 13,
                          color: c,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDiagnosisBtn(String opt) {
    final bool isSelected = _selectedDiagnosis == opt;
    final bool isCorrect = opt == _currentCase.correct;

    Color border = const Color(0xFFE2E8F0);
    Color bg = Colors.white;
    Color text = const Color(0xFF334155);

    if (_submitted) {
      if (isCorrect) {
        border = const Color(0xFF10B981);
        bg = const Color(0xFFECFDF5);
        text = const Color(0xFF047857);
      } else if (isSelected) {
        border = const Color(0xFFEF4444);
        bg = const Color(0xFFFEF2F2);
        text = const Color(0xFFB91C1C);
      }
    } else if (isSelected) {
      border = const Color(0xFF6366F1);
      bg = const Color(0xFFEEF2FF);
      text = const Color(0xFF4F46E5);
    }

    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: InkWell(
        onTap: !_submitted
            ? () => setState(() => _selectedDiagnosis = opt)
            : null,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: border, width: 2),
          ),
          child: Center(
            child: Text(
              opt,
              style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: text,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFeedback() {
    final bool win = _selectedDiagnosis == _currentCase.correct;
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: win ? const Color(0xFFF0FDF4) : const Color(0xFFFEF2F2),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: win ? const Color(0xFF10B981) : const Color(0xFFEF4444),
          width: 2,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                win ? Icons.check_circle_rounded : Icons.error_rounded,
                color: win ? const Color(0xFF059669) : const Color(0xFFB91C1C),
              ),
              const SizedBox(width: 10),
              Text(
                win ? "Diagnosis Correct!" : "Incorrect Diagnosis",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: win
                      ? const Color(0xFF059669)
                      : const Color(0xFFB91C1C),
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          Text(
            "The pattern of ${_currentCase.abnormal.join(', ')} being abnormal while ${_currentCase.normal.join(', ')} remain normal indicates an injury at the ${_currentCase.correct}.",
            style: const TextStyle(
              fontSize: 14,
              color: Color(0xFF334155),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFE0F2FE),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              "Session Score: $_correct/$_total",
              style: const TextStyle(
                color: Color(0xFF0369A1),
                fontWeight: FontWeight.w900,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _actionBtn(String label, IconData icon, VoidCallback onTap) {
    return ElevatedButton(
      onPressed: onTap,
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF6366F1),
        foregroundColor: Colors.white,
        minimumSize: const Size(double.infinity, 60),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
        elevation: 8,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon),
          const SizedBox(width: 10),
          Text(
            label,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900),
          ),
        ],
      ),
    );
  }

  Widget _setupSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title.toUpperCase(),
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w900,
            color: Color(0xFF475569),
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 15),
        Wrap(spacing: 12, runSpacing: 12, children: children),
      ],
    );
  }

  Widget _choicePill(String label, bool active, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: active ? const Color(0xFF6366F1) : const Color(0xFFF1F5F9),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: active ? Colors.white : const Color(0xFF1E293B),
            fontWeight: FontWeight.bold,
          ),
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
