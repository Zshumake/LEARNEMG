import 'package:flutter/material.dart';
import 'dart:math' as math;
import '../../../data/muscle_data.dart';
import '../../../data/models/muscle_model.dart';
import '../../../core/theme/app_theme.dart';

class EMGChallengeView extends StatefulWidget {
  final VoidCallback onBack;
  const EMGChallengeView({super.key, required this.onBack});

  @override
  State<EMGChallengeView> createState() => _EMGChallengeViewState();
}

class _EMGChallengeViewState extends State<EMGChallengeView> {
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
        available.addAll(
          MuscleData.lesionSites['UE']!.where((l) => l.type == 'root'),
        );
      }
      if (_activeTypes['plexus']!) {
        available.addAll(
          MuscleData.lesionSites['UE']!.where((l) => l.type == 'plexus'),
        );
      }
      if (_activeTypes['peripheral']!) {
        available.addAll(
          MuscleData.lesionSites['UE']!.where((l) => l.type == 'peripheral'),
        );
      }
    }
    if (_region == 'LE' || _region == 'both') {
      if (_activeTypes['root']!) {
        available.addAll(
          MuscleData.lesionSites['LE']!.where((l) => l.type == 'root'),
        );
      }
      if (_activeTypes['peripheral']!) {
        available.addAll(
          MuscleData.lesionSites['LE']!.where((l) => l.type == 'peripheral'),
        );
      }
    }

    if (available.isEmpty) return;

    final correctLesion = available[math.Random().nextInt(available.length)];

    final abnormal = (List<String>.from(
      correctLesion.muscles,
    )..shuffle()).take(4).toList();

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
                    child: const Icon(
                      Icons.arrow_back_ios_new_rounded,
                      color: Colors.white,
                      size: 18,
                    ),
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
                    _setupPill(
                      'Upper',
                      _region == 'UE',
                      () => setState(() => _region = 'UE'),
                    ),
                    const SizedBox(width: 10),
                    _setupPill(
                      'Lower',
                      _region == 'LE',
                      () => setState(() => _region = 'LE'),
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
                _sectionLabel('LESION TYPES'),
                const SizedBox(height: 12),
                _lesionTypeCard(
                  'Nerve Roots',
                  'C5-T1, L2-S1 radiculopathies',
                  Icons.account_tree_rounded,
                  const Color(0xFF14B8A6),
                  _activeTypes['root']!,
                  () => setState(
                    () => _activeTypes['root'] = !_activeTypes['root']!,
                  ),
                ),
                _lesionTypeCard(
                  'Plexus',
                  'Trunk and cord injuries',
                  Icons.hub_rounded,
                  AppTheme.warning,
                  _activeTypes['plexus']!,
                  () => setState(
                    () => _activeTypes['plexus'] = !_activeTypes['plexus']!,
                  ),
                ),
                _lesionTypeCard(
                  'Peripheral Nerve',
                  'Entrapments & neuropathies',
                  Icons.bolt_rounded,
                  const Color(0xFF8B5CF6),
                  _activeTypes['peripheral']!,
                  () => setState(
                    () => _activeTypes['peripheral'] =
                        !_activeTypes['peripheral']!,
                  ),
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
                          'BEGIN CHALLENGE',
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
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
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
                    color: AppTheme.slate600,
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
                    color: AppTheme.slate600,
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
                          borderRadius: BorderRadius.circular(14),
                        ),
                        elevation: 0,
                      ),
                      child: const Text(
                        'SUBMIT ANALYSIS',
                        style: TextStyle(
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1,
                        ),
                      ),
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
                          borderRadius: BorderRadius.circular(14),
                        ),
                        elevation: 0,
                      ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'NEXT CASE',
                            style: TextStyle(
                              fontWeight: FontWeight.w800,
                              letterSpacing: 1,
                            ),
                          ),
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
                        color: AppTheme.slate400,
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
    String title,
    List<String> muscles,
    Color color,
    Color bg,
    IconData icon,
  ) {
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
          ...muscles.map(
            (m) => Padding(
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
            ),
          ),
        ],
      ),
    );
  }

  Widget _diagnosisOption(String opt) {
    final bool isSelected = _selectedDiagnosis == opt;
    final bool isCorrect = opt == _currentCase.correct;

    Color borderColor = const Color(0xFFE5E7EB);
    Color bgColor = Colors.white;
    Color textColor = AppTheme.textMain;

    if (_submitted) {
      if (isCorrect) {
        borderColor = AppTheme.success;
        bgColor = const Color(0xFFECFDF5);
        textColor = const Color(0xFF065F46);
      } else if (isSelected) {
        borderColor = AppTheme.danger;
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
          onTap: !_submitted
              ? () => setState(() => _selectedDiagnosis = opt)
              : null,
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
                  const Icon(
                    Icons.check_circle_rounded,
                    color: AppTheme.success,
                    size: 20,
                  ),
                if (_submitted && isSelected && !isCorrect)
                  const Icon(
                    Icons.cancel_rounded,
                    color: AppTheme.danger,
                    size: 20,
                  ),
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
              ? AppTheme.success.withValues(alpha: 0.3)
              : AppTheme.danger.withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                win ? Icons.check_circle_rounded : Icons.error_rounded,
                color: win ? const Color(0xFF059669) : const Color(0xFFDC2626),
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
              color: AppTheme.textMain,
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
            color: active ? const Color(0xFF4F46E5) : AppTheme.slate100,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: active ? const Color(0xFF4F46E5) : const Color(0xFFE5E7EB),
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

  Widget _lesionTypeCard(
    String title,
    String sub,
    IconData icon,
    Color color,
    bool active,
    VoidCallback onTap,
  ) {
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
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: active ? color : AppTheme.slate400,
                    ),
                  ),
                  Text(
                    sub,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppTheme.slate400,
                    ),
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
