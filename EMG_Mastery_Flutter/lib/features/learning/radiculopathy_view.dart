import 'package:flutter/material.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../core/widgets/keep_alive_tab_wrapper.dart';

/// Radiculopathy Pathophysiology teaching module.
class RadiculopathyView extends StatelessWidget {
  const RadiculopathyView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          _buildHero(),
          Container(
            color: Theme.of(context).scaffoldBackgroundColor,
            child: const TabBar(
              indicatorColor: Color(0xFFC2410C),
              labelColor: Color(0xFFC2410C),
              unselectedLabelColor: Color(0xFF94A3B8),
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: [
                Tab(text: 'Learning'),
                Tab(text: 'Practice Quiz'),
              ],
            ),
          ),
          const Expanded(
            child: TabBarView(
              children: [
                KeepAliveTabWrapper(child: _RadiculopathyLearningTab()),
                KeepAliveTabWrapper(child: _QuizTab()),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHero() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 40),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFFFFF7ED), Color(0xFFFED7AA)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: const Column(
        children: [
          Text(
            'Radiculopathy Mastery',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Color(0xFFC2410C),
              letterSpacing: -0.5,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'The Detective\'s Guide to Nerve Root Localization',
            style: TextStyle(
              fontSize: 14,
              color: Color(0xFF9A3412),
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _RadiculopathyLearningTab extends StatelessWidget {
  const _RadiculopathyLearningTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildMentorshipIntro(),
          const SizedBox(height: 25),
          _buildPathophysiologySection(),
          const SizedBox(height: 25),
          _buildAgeTrendsSection(),
          const SizedBox(height: 25),
          _buildEmgClockSection(),
          const SizedBox(height: 25),
          _buildLocalizationTableSection(),
          const SizedBox(height: 25),
          _buildHiMadamSection(),
          const SizedBox(height: 25),
          _buildSeniorTruthsSection(),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildMentorshipIntro() {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF7ED),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFFB923C)),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFFC2410C).withValues(alpha: 0.08),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(
                Icons.search_rounded,
                color: Color(0xFFC2410C),
                size: 32,
              ),
              const SizedBox(width: 12),
              const Text(
                'Radiculopathy: The EMG "Bread & Butter"',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFFC2410C),
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          const Text(
            'If you talk to any EMG attending, they\'ll tell you: Radiculopathy is the most common reason patients are sent to the lab. Whether it\'s a "pinched nerve" in the neck (cervical) or the low back (lumbar), your job as the electrodiagnostician is to act as a detective. You aren\'t just looking for "abnormalities"—you are mapping exactly which spinal level is being compressed.',
            style: TextStyle(
              fontSize: 16,
              color: Color(0xFF9A3412),
              fontWeight: FontWeight.w500,
              height: 1.6,
            ),
          ),
          const SizedBox(height: 25),
          Row(
            children: [
              Expanded(
                child: _SmallInfoCard(
                  title: 'Diagnostic Goals',
                  text:
                      '1. Confirm the nerve root is the problem\n2. Identify the exact spinal level (e.g., L5 vs S1)\n3. Determine if the injury is acute or chronic',
                ),
              ),
              const SizedBox(width: 15),
              Expanded(
                child: _SmallInfoCard(
                  title: 'Resident Pro-Tip',
                  text:
                      '"The history is half the battle. If the pain radiates down to the big toe, think L5. If it\'s the little toe, think S1. Let the patient guide your needle!"',
                  isItalic: true,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPathophysiologySection() {
    return _SectionCard(
      title: "1. THE PATHOPHYSIOLOGY: WHAT'S HAPPENING?",
      icon: Icons.biotech_rounded,
      color: const Color(0xFFEF4444),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "At its core, Radiculopathy is a plumbing problem. A nerve root is being squeezed or irritated right as it tries to exit the spinal column. This happens at the neural foramen—the small holes between your vertebrae.",
            style: TextStyle(
              fontSize: 15,
              color: Color(0xFF334155),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "The 'Behind the DRG' Secret (High Yield!)",
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    color: Color(0xFFDC2626),
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  "Why are SNAPs normal in Radiculopathy?\n\nImagine a telephone wire. The \"Telephone Exchange\" (the Dorsal Root Ganglion/DRG) is located outside the spinal canal.\n\n• If you cut the wire distal to the exchange (in the arm), the distal end dies and the signal disappears (SNAP becomes abnormal).\n• In radiculopathy, the pinch is proximal to the exchange (inside the spine/foramen). The \"Telephone Exchange\" (DRG) is still happy and healthy, so the wire in the arm is still attached to its power source. The signal in the arm remains normal!",
                  style: TextStyle(
                    fontSize: 13,
                    color: Color(0xFF475569),
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 15),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF1F2),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFFECACA)),
                  ),
                  child: const Center(
                    child: Text(
                      "🌟 Clinical Pearl: Normal SNAPs + Sensory Symptoms = Radiculopathy until proven otherwise!",
                      style: TextStyle(
                        color: Color(0xFF991B1B),
                        fontWeight: FontWeight.w700,
                        fontSize: 12,
                      ),
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

  Widget _buildAgeTrendsSection() {
    return _SectionCard(
      title: "2. WHO AND WHY? (AGE-RELATED TRENDS)",
      icon: Icons.groups_rounded,
      color: const Color(0xFF8B5CF6),
      child: Column(
        children: [
          _TrendCard(
            title: "Younger Adults (< 50)",
            mechanism: "Usually Acute Disc Herniation",
            desc:
                "The 'jelly' inside the disc (nucleus pulposus) squirts out and smashes a nerve root.\n\n• Trigger: Heavy lifting or sudden twisting\n• Pain: Sudden, sharp, 'electric shock' pain\n• EMG Timing: Often done too early (wait 3 weeks!)",
            color: const Color(0xFF86198F),
            bgColor: const Color(0xFFFDF4FF),
            borderColor: const Color(0xFFF5D0FE),
          ),
          const SizedBox(height: 15),
          _TrendCard(
            title: "Older Adults (> 50)",
            mechanism: "Usually Spinal Stenosis/Spondylosis",
            desc:
                "This is slow and 'crumbly.' Bone spurs (osteophytes) gradually narrow the exit holes.\n\n• Trigger: Gradual onset, worse with walking\n• Pain: Aching, heavy, 'claudication' of the nerves\n• EMG Timing: Often shows chronic changes (large, rare MUAPs)",
            color: const Color(0xFF92400E),
            bgColor: const Color(0xFFFFFBEB),
            borderColor: const Color(0xFFFEF3C7),
          ),
        ],
      ),
    );
  }

  Widget _buildEmgClockSection() {
    return _SectionCard(
      title: "3. THE EMG \"CLOCK\": TIMING IS EVERYTHING",
      icon: Icons.history_toggle_off_rounded,
      color: const Color(0xFF059669),
      child: Column(
        children: [
          const Text(
            "Residents often ask: \"Should I do the EMG today?\" The answer depends on where we are on the biological clock of nerve death. Fibrillation potentials don't just appear immediately. They take time to travel down the wire.",
            style: TextStyle(
              fontSize: 14,
              color: Color(0xFF475569),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 20),
          _ClockPhaseRow(
            days: "Day 0-3",
            title: "Immediate: Recruitment Failure",
            desc:
                "You won't see \"fibs\" yet. You'll just see decreased recruitment (the muscle isn't getting enough commands). F-waves might be slightly slow.",
            color: const Color(0xFF10B981),
          ),
          _ClockPhaseRow(
            days: "Day 7-10",
            title: "Phase 1: Paraspinal Fire",
            desc:
                "Denervation reaches the paraspinal muscles because they are physically closest to the spine. If you see abnormalities here, you've localized it to the root!",
            color: const Color(0xFF059669),
          ),
          _ClockPhaseRow(
            days: "Day 14-21",
            title: "Phase 2: Limb Invasion",
            desc:
                "Fibrillations finally arrive in the arm or leg. Now you can do a full limb study. This is the \"Golden Window\" for diagnostic precision.",
            color: const Color(0xFF047857),
          ),
        ],
      ),
    );
  }

  Widget _buildLocalizationTableSection() {
    return _SectionCard(
      title: "4. MASTERING THE LEVELS: CLINICAL LOCALIZATION",
      icon: Icons.map_rounded,
      color: const Color(0xFF3B82F6),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          headingRowColor: WidgetStateProperty.all(const Color(0xFFF1F5F9)),
          columnSpacing: 25,
          horizontalMargin: 15,
          columns: const [
            DataColumn(
              label: Text(
                "Root",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
            DataColumn(
              label: Text(
                "Key Weakness",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
            DataColumn(
              label: Text(
                "Physical Exam",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
            DataColumn(
              label: Text(
                "Reflex",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
            DataColumn(
              label: Text(
                "Resident Pro-Tip",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
          ],
          rows: const [
            DataRow(
              cells: [
                DataCell(
                  Text("C5", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Deltoid,\nBiceps, Rhomboids")),
                DataCell(Text("Shoulder abduction,\nelbow flexion")),
                DataCell(Text("Biceps")),
                DataCell(
                  Text(
                    "Check the rhomboids to prove it's the root, not the plexus!",
                    style: TextStyle(fontSize: 11, fontStyle: FontStyle.italic),
                  ),
                ),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("C6", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Biceps,\nBrachioradialis, PT")),
                DataCell(Text("Thumb sensation,\nwrist extension")),
                DataCell(Text("Brachiorad.")),
                DataCell(
                  Text(
                    "The 'Thumb Root'. Often confused with Carpal Tunnel!",
                    style: TextStyle(fontSize: 11, fontStyle: FontStyle.italic),
                  ),
                ),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("C7", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Triceps,\nFinger Extensors")),
                DataCell(Text("Elbow extension,\nmiddle finger sens.")),
                DataCell(Text("Triceps")),
                DataCell(
                  Text(
                    "Most common cervical root. Triceps is your best friend here.",
                    style: TextStyle(fontSize: 11, fontStyle: FontStyle.italic),
                  ),
                ),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("L5", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Tib Ant,\nEHL, Glut Med")),
                DataCell(Text("Big toe extension,\nheel walking")),
                DataCell(Text("Med Hamst.")),
                DataCell(
                  Text(
                    "Always check the Glut Med. Root, not the peroneal nerve!",
                    style: TextStyle(fontSize: 11, fontStyle: FontStyle.italic),
                  ),
                ),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("S1", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Gastroc, Soleus,\nGlut Max")),
                DataCell(Text("Plantar flexion,\ntoe walking")),
                DataCell(Text("Achilles")),
                DataCell(
                  Text(
                    "The 'Foot Slapping' root. Look for S1 paraspinals.",
                    style: TextStyle(fontSize: 11, fontStyle: FontStyle.italic),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHiMadamSection() {
    return _SectionCard(
      title: "DON'T BE A \"DISC-SNOB\": THE HI MADAM DIFFERENTIAL",
      icon: Icons.warning_amber_rounded,
      color: const Color(0xFFF59E0B),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Even though 90% of radiculopathies are due to discs or stenosis, every resident should know the non-mechanical causes. If it involves multiple levels, think HI MADAM:",
            style: TextStyle(fontSize: 14, color: Color(0xFF475569)),
          ),
          const SizedBox(height: 15),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              _MnemonicChip(letter: 'H', text: 'Herpes Zoster'),
              _MnemonicChip(letter: 'I', text: 'Inflammatory'),
              _MnemonicChip(letter: 'M', text: 'Metastasis'),
              _MnemonicChip(letter: 'A', text: 'Arachnoiditis'),
              _MnemonicChip(letter: 'D', text: 'Diabetes'),
              _MnemonicChip(letter: 'A', text: 'Abscess'),
              _MnemonicChip(letter: 'M', text: 'Mass/Tumor'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSeniorTruthsSection() {
    return Container(
      padding: const EdgeInsets.all(35),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(
                Icons.lightbulb_outline_rounded,
                color: Color(0xFF38BDF8),
                size: 28,
              ),
              const SizedBox(width: 12),
              const Text(
                "Final Senior Resident \"Truths\"",
                style: TextStyle(
                  color: Color(0xFF38BDF8),
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          _TruthRow(
            text:
                "1. The Paraspinals are NOT optional. You will find the diagnosis there 10-20% of the time when everything else looks normal. If you skip them, you're guessing, not diagnosing.",
          ),
          _TruthRow(
            text:
                "2. Rule #2: Rule out the \"Impersonators\". For every L5 radikulopathy, verify the Fibular (Peroneal) nerve. For every C6, check the Median nerve. Prove it's the root by finding abnormalities \"upstream\" of where the plexus begins.",
          ),
          _TruthRow(
            text:
                "3. Symmetry is a trap. Don't just look at the bad leg. Look at the good one too. Comparison is your best diagnostic tool.",
          ),
        ],
      ),
    );
  }
}

// Support UI Widgets
class _SectionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;
  final Widget child;
  const _SectionCard({
    required this.title,
    required this.icon,
    required this.color,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(width: 10),
              Text(
                title,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w900,
                  color: color,
                  letterSpacing: 1,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          child,
        ],
      ),
    );
  }
}

class _SmallInfoCard extends StatelessWidget {
  final String title, text;
  final bool isItalic;
  const _SmallInfoCard({
    required this.title,
    required this.text,
    this.isItalic = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFFFB923C).withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              color: Color(0xFFC2410C),
              fontWeight: FontWeight.w800,
              fontSize: 13,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            text,
            style: TextStyle(
              fontSize: 11,
              color: const Color(0xFF9A3412),
              fontStyle: isItalic ? FontStyle.italic : null,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _TrendCard extends StatelessWidget {
  final String title, mechanism, desc;
  final Color color, bgColor, borderColor;
  const _TrendCard({
    required this.title,
    required this.mechanism,
    required this.desc,
    required this.color,
    required this.bgColor,
    required this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: borderColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w800,
              color: color,
              fontSize: 14,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            mechanism,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 11,
              color: color.withValues(alpha: 0.7),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            desc,
            style: TextStyle(
              fontSize: 11,
              color: color.withValues(alpha: 0.85),
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _ClockPhaseRow extends StatelessWidget {
  final String days, title, desc;
  final Color color;
  const _ClockPhaseRow({
    required this.days,
    required this.title,
    required this.desc,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 80,
            padding: const EdgeInsets.symmetric(vertical: 8),
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: Text(
                days,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 11,
                ),
              ),
            ),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 14,
                    color: color,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  desc,
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF64748B),
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _MnemonicChip extends StatelessWidget {
  final String letter, text;
  const _MnemonicChip({required this.letter, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFFEF3C7)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            letter,
            style: const TextStyle(
              fontWeight: FontWeight.w900,
              color: Color(0xFFD97706),
              fontSize: 16,
            ),
          ),
          const SizedBox(width: 8),
          Text(
            text,
            style: const TextStyle(
              color: Color(0xFF92400E),
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}

class _TruthRow extends StatelessWidget {
  final String text;
  const _TruthRow({required this.text});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.white70,
          fontSize: 14,
          height: 1.5,
        ),
      ),
    );
  }
}

class _QuizTab extends StatelessWidget {
  const _QuizTab();

  @override
  Widget build(BuildContext context) {
    return const QuizSessionView(
      questions: _radicQuizQuestions,
      title: "Radiculopathy Mastery",
      subtitle: "Test your skills in root-level localization.",
    );
  }
}

const _radicQuizQuestions = [
  QuizQuestion(
    question:
        "A patient presents with numbness in the thumb and index finger. The Median SNAP (sensory) is completely normal, but the Biceps and Brachioradialis show denervation. Where is the lesion?",
    options: [
      "Carpal Tunnel",
      "Median Nerve at the Elbow",
      "C6 Nerve Root",
      "Brachial Plexus",
    ],
    correctIndex: 2,
    explanation:
        "This is a classic C6 radiculopathy. The clue is the NORMAL sensory study (SNAP) despite the numbness—this means the pinch is 'Behind the DRG'. The involvement of both the Biceps and Brachioradialis confirms the level.",
  ),
  QuizQuestion(
    question:
        "Why do we wait at least 3 weeks after a sudden disc herniation before doing a full EMG study?",
    options: [
      "To let the pain subside",
      "To allow enough time for fibrillation potentials to develop in the limbs",
      "Because insurance won't pay for it sooner",
      "To allow the disc to heal on its own",
    ],
    correctIndex: 1,
    explanation:
        "Wallerian degeneration takes time. It takes approximately 2-3 weeks for the distal parts of the nerve in the limbs to show spontaneous activity (fibrillations) after a proximal injury at the root.",
  ),
  QuizQuestion(
    question:
        "Which muscle should you check to differentiate an L5 radiculopathy from a Peroneal (Fibular) neuropathy?",
    options: [
      "Tibialis Anterior",
      "Extensor Hallucis Longus",
      "Gluteus Medius",
      "Gastroc",
    ],
    correctIndex: 2,
    explanation:
        "The Gluteus Medius is innervated by the Superior Gluteal Nerve (L5), which branches off the plexus BEFORE the peroneal nerve forms. If the Glut Med is abnormal, the lesion must be at or proximal to the plexus/root level.",
  ),
  QuizQuestion(
    question:
        "What is the most common cause of radiculopathy in a 35-year-old patient?",
    options: [
      "Spinal stenosis",
      "Degenerative spondylosis",
      "Herniated nucleus pulposus (disc herniation)",
      "Malignancy",
    ],
    correctIndex: 2,
    explanation:
        "In patients YOUNGER than 50 years, HERNIATED NUCLEUS PULPOSUS is the most common cause. In patients OLDER than 50, SPINAL STENOSIS becomes more prevalent.",
  ),
  QuizQuestion(
    question: "Which reflex is associated with L4 radiculopathy?",
    options: [
      "Achilles reflex",
      "Patellar reflex",
      "Biceps reflex",
      "Medial hamstring reflex",
    ],
    correctIndex: 1,
    explanation:
        "L4 radiculopathy affects the PATELLAR (knee jerk) reflex. The reflex patterns are: L4 = patellar, L5 = medial hamstring, S1 = Achilles.",
  ),
  QuizQuestion(
    question:
        "A 60-year-old patient presents with progressive back pain and bilateral leg weakness. What is the most likely etiology?",
    options: [
      "Disc herniation",
      "Spinal stenosis",
      "Inflammatory radiculitis",
      "Athletic injury",
    ],
    correctIndex: 1,
    explanation:
        "In older patients, spinal stenosis due to degenerative changes is the leading cause, often presenting with bilateral symptoms.",
  ),
  QuizQuestion(
    question:
        "What percentage of radiculopathy cases may have paraspinal abnormalities as the ONLY EMG finding?",
    options: ["0-5%", "10-30%", "50-70%", "90-100%"],
    correctIndex: 1,
    explanation:
        "Paraspinal abnormalities are found as the sole indicator in 10-30% of cases, making paraspinal examination crucial for root localization.",
  ),
  QuizQuestion(
    question: "What does the 'HI MADAM' mnemonic help remember?",
    options: [
      "EMG timeline",
      "Myotomal patterns",
      "Non-mechanical causes",
      "Reflex associations",
    ],
    correctIndex: 2,
    explanation:
        "'HI MADAM' covers non-mechanical causes like Herpes, Inflammatory, Metastasis, Arachnoiditis, Diabetes, Abscess, and Mass.",
  ),
  QuizQuestion(
    question:
        "Which nerve root is most commonly affected in cervical radiculopathy?",
    options: ["C5", "C6", "C7", "C8"],
    correctIndex: 2,
    explanation:
        "C7 is the most commonly affected cervical nerve root (approx 70%), usually presenting with triceps weakness.",
  ),
  QuizQuestion(
    question: "In an S1 radiculopathy, which finding is most expected?",
    options: [
      "Weakness of ankle dorsiflexion",
      "Loss of patellar reflex",
      "Loss of Achilles reflex",
      "Sensory loss on the medial calf",
    ],
    correctIndex: 2,
    explanation:
        "S1 radiculopathy classically presents with LOSS OF THE ACHILLES REFLEX and plantar flexion weakness.",
  ),
];
