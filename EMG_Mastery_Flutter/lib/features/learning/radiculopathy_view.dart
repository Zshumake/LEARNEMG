import 'package:flutter/material.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../data/podcast_data.dart';
import '../podcast/widgets/podcast_trigger_card.dart';

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
              children: [_RadiculopathyLearningTab(), _QuizTab()],
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
          ...PodcastData.getEpisodesByModule('radiculopathy').map(
            (episode) => Padding(
              padding: const EdgeInsets.only(bottom: 20),
              child: PodcastTriggerCard(episode: episode),
            ),
          ),
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
                'The EMG "Bread & Butter"',
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
            'If you talk to any EMG attending, they\'ll tell you: Radiculopathy is the most common reason patients are sent to the lab. You aren\'t just looking for "abnormalities"—you are mapping exactly which spinal level is being compressed.',
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
                      'Confirm the nerve root, identify the exact level (e.g. L5 vs S1), and determine acuity.',
                ),
              ),
              const SizedBox(width: 15),
              Expanded(
                child: _SmallInfoCard(
                  title: 'Resident Pro-Tip',
                  text:
                      '"The history is half the battle. If pain radiates to the big toe, think L5. If the little toe, think S1."',
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
      title: "PATHOPHYSIOLOGY: BEHIND THE DRG",
      icon: Icons.biotech_rounded,
      color: const Color(0xFFEF4444),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Radiculopathy is a plumbing problem. A nerve root is being squeezed right as it tries to exit the spinal column at the neural foramen.",
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
                  "Why are SNAPs normal in Radiculopathy?",
                  style: TextStyle(
                    fontWeight: FontWeight.w800,
                    color: Color(0xFFDC2626),
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  "Imagine the Dorsal Root Ganglion (DRG) as a Telephone Exchange. In radiculopathy, the pinch is PROXIMAL to the exchange (inside the spine). The wire in the arm is still attached to its healthy power source (the DRG outside the spine), so the SNAP signal remains normal!",
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
      title: "WHO AND WHY? (AGE TRENDS)",
      icon: Icons.groups_rounded,
      color: const Color(0xFF8B5CF6),
      child: Row(
        children: [
          Expanded(
            child: _TrendCard(
              title: "Younger Adults (<50)",
              mechanism: "Acute Disc Herniation",
              desc:
                  "Sudden 'electric' pain triggered by lifting or twisting. Usually acute onset.",
              color: const Color(0xFF86198F),
              bgColor: const Color(0xFFFDF4FF),
              borderColor: const Color(0xFFF5D0FE),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: _TrendCard(
              title: "Older Adults (>50)",
              mechanism: "Spinal Stenosis",
              desc:
                  "Slow, aching 'claudication' pain worse with walking. Gradual bone spur narrowing.",
              color: const Color(0xFF92400E),
              bgColor: const Color(0xFFFFFBEB),
              borderColor: const Color(0xFFFEF3C7),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmgClockSection() {
    return _SectionCard(
      title: "THE EMG CLOCK: TIMING",
      icon: Icons.history_toggle_off_rounded,
      color: const Color(0xFF059669),
      child: Column(
        children: [
          const Text(
            "Fibrillation potentials don't appear immediately. They take time to travel down the wire based on the distance from the spine.",
            style: TextStyle(
              fontSize: 14,
              color: Color(0xFF475569),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 20),
          _ClockPhaseRow(
            days: "Day 0-3",
            title: "Recruitment Failure",
            desc:
                "No 'fibs' yet. Just decreased motor recruitment and potential F-wave delays.",
            color: const Color(0xFF10B981),
          ),
          _ClockPhaseRow(
            days: "Day 7-10",
            title: "Paraspinal Fire",
            desc:
                "Denervation reaches the paraspinals first as they are closest to the spine.",
            color: const Color(0xFF059669),
          ),
          _ClockPhaseRow(
            days: "Day 14-21",
            title: "Limb Invasion",
            desc:
                "Fibrillations finally arrive in the arm/leg. The 'Golden Window' for full diagnosis.",
            color: const Color(0xFF047857),
          ),
        ],
      ),
    );
  }

  Widget _buildLocalizationTableSection() {
    return _SectionCard(
      title: "MASTERING THE LEVELS",
      icon: Icons.map_rounded,
      color: const Color(0xFF3B82F6),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          headingRowColor: MaterialStateProperty.all(const Color(0xFFF1F5F9)),
          columnSpacing: 20,
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
                "Reflex",
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
                DataCell(Text("Deltoid, Biceps, Rhomboids")),
                DataCell(Text("Biceps")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("C6", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Biceps, Brachioradialis")),
                DataCell(Text("Brachiorad.")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("C7", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Triceps, Finger Extensors")),
                DataCell(Text("Triceps")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("L5", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Tib Ant, EHL, Glut Med")),
                DataCell(Text("Med Hamst.")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(
                  Text("S1", style: TextStyle(fontWeight: FontWeight.w800)),
                ),
                DataCell(Text("Gastroc, Glut Max")),
                DataCell(Text("Achilles")),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHiMadamSection() {
    return _SectionCard(
      title: "NON-MECHANICAL CAUSES",
      icon: Icons.warning_amber_rounded,
      color: const Color(0xFFF59E0B),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "If it involves multiple levels or persistent pain, think HI MADAM:",
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
                "Senior Resident Truths",
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
                "1. The Paraspinals are NOT optional. You'll find the diagnosis there 20% of the time when everything else is normal.",
          ),
          _TruthRow(
            text:
                "2. Rule out the 'Impersonators.' For every L5, verify the Peroneal nerve. For C6, check the Median nerve.",
          ),
          _TruthRow(
            text:
                "3. Symmetry is a trap. Don't just look at the bad leg; comparison is your best diagnostic tool.",
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
        border: Border.all(color: const Color(0xFFFB923C).withValues(alpha: 0.3)),
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
