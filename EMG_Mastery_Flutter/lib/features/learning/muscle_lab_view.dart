import 'package:flutter/material.dart';
import '../../data/muscle_data.dart';
import '../../core/theme/app_theme.dart';
import 'muscle_lab/study_cards_view.dart';
import 'muscle_lab/quiz_engine_view.dart';
import 'muscle_lab/emg_challenge_view.dart';

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
        return StudyCardsView(
          key: const ValueKey('cards'),
          onBack: () => setState(() => _activeView = 'menu'),
        );
      case 'quiz':
        return QuizEngineView(
          key: const ValueKey('quiz'),
          onBack: () => setState(() => _activeView = 'menu'),
        );
      case 'challenge':
        return EMGChallengeView(
          key: const ValueKey('challenge'),
          onBack: () => setState(() => _activeView = 'menu'),
        );
      default:
        return _buildMenu();
    }
  }

  Widget _buildMenu() {
    final ueCount = MuscleData.muscleDatabase.values
        .where((m) => m.region == 'UE')
        .length;
    final leCount = MuscleData.muscleDatabase.values
        .where((m) => m.region == 'LE')
        .length;

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
                colors: [
                  AppTheme.slate950,
                  AppTheme.textHeading,
                  AppTheme.slate950,
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
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
                  subtitle:
                      'Interactive flashcards with reveal-on-tap innervation details',
                  accentColor: const Color(0xFF14B8A6),
                  icon: Icons.style_rounded,
                  onTap: () => setState(() => _activeView = 'cards'),
                ),
                const SizedBox(height: 14),
                _ModeCard(
                  title: 'Quiz Engine',
                  subtitle:
                      'Infinite question generator -- customize topics and regions',
                  accentColor: AppTheme.success,
                  icon: Icons.bolt_rounded,
                  onTap: () => setState(() => _activeView = 'quiz'),
                ),
                const SizedBox(height: 14),
                _ModeCard(
                  title: 'EMG Challenge',
                  subtitle:
                      'Clinical case scenarios -- analyze findings, localize lesions',
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
                    colors: [accentColor, accentColor.withValues(alpha: 0.7)],
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
                        color: AppTheme.slate950,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 13,
                        color: AppTheme.textMuted,
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
