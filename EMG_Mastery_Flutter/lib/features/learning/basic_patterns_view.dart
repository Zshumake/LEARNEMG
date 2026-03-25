import 'package:flutter/material.dart';
import '../../data/pattern_data.dart';
import '../../data/models/pattern_model.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../core/widgets/keep_alive_tab_wrapper.dart';
import '../../core/widgets/video_player_widget.dart';
import '../../core/widgets/waveform_card.dart';
import '../../data/podcast_data.dart';
import '../podcast/widgets/podcast_trigger_card.dart';

class BasicPatternsView extends StatelessWidget {
  const BasicPatternsView({super.key});

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
              indicatorColor: Color(0xFFF59E0B),
              labelColor: Color(0xFFF59E0B),
              unselectedLabelColor: Color(0xFF94A3B8),
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: [
                Tab(text: 'Pattern Library'),
                Tab(text: 'Practice Quiz'),
              ],
            ),
          ),
          const Expanded(
            child: TabBarView(
              children: [
                KeepAliveTabWrapper(child: _PatternLibraryTab()),
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
          colors: [Color(0xFFF59E0B), Color(0xFFD97706)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: const Column(
        children: [
          Text(
            'EMG Pattern Mastery',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: -0.5,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 8),
          Text(
            'Visual & Auditory Pattern Recognition',
            style: TextStyle(
              fontSize: 14,
              color: Colors.white70,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _PatternLibraryTab extends StatefulWidget {
  const _PatternLibraryTab();

  @override
  State<_PatternLibraryTab> createState() => _PatternLibraryTabState();
}

class _PatternLibraryTabState extends State<_PatternLibraryTab> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          PodcastTriggerCard(
            episode: PodcastData.getEpisodesByModule('basic-patterns').first,
          ),
          const SizedBox(height: 20),
          _buildObjectives(),
          const SizedBox(height: 30),
          _buildAnalysisFramework(),
          const SizedBox(height: 30),
          _buildWaveformVisualizer(),
          const SizedBox(height: 30),
          _buildSectionHeader(
            "Pattern Recognition Library",
            "Master EMG patterns through real-time video demonstrations.",
            Icons.video_library_rounded,
            const Color(0xFFF59E0B),
          ),
          const SizedBox(height: 20),
          _buildPatternCategory(
            "Abnormal Spontaneous Activity",
            PatternData.abnormalActivity,
            const Color(0xFFDC2626),
          ),
          const SizedBox(height: 40),
          _buildPatternCategory(
            "Motor Unit Analysis",
            PatternData.motorUnitAnalysis,
            const Color(0xFF2563EB),
          ),
          const SizedBox(height: 40),
          _buildPatternCategory(
            "Normal Spontaneous Activity",
            PatternData.normalActivity,
            const Color(0xFF059669),
          ),
          const SizedBox(height: 40),
          _buildReferenceGuide(),
          const SizedBox(height: 40),
          _buildClinicalScenarios(),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildObjectives() {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFF8FAFC), Color(0xFFF1F5F9)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 15,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Learning Objectives",
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 15),
          Text(
            PatternData.objectives,
            style: const TextStyle(
              fontSize: 16,
              color: Color(0xFF475569),
              height: 1.6,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAnalysisFramework() {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(
                Icons.description_outlined,
                color: Color(0xFF0EA5E9),
                size: 28,
              ),
              SizedBox(width: 12),
              Text(
                "Systematic Analysis Framework",
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 25),
          ...PatternData.analysisFramework.map(
            (section) => _buildFrameworkSection(section),
          ),
        ],
      ),
    );
  }

  Widget _buildFrameworkSection(AnalysisSection section) {
    return ExpansionTile(
      title: Text(
        section.title,
        style: const TextStyle(
          color: Color(0xFF0369A1),
          fontWeight: FontWeight.w800,
          fontSize: 18,
        ),
      ),
      childrenPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      expandedCrossAxisAlignment: CrossAxisAlignment.start,
      children: section.items.map((item) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 15),
          child: RichText(
            text: TextSpan(
              children: [
                TextSpan(
                  text: "${item.label}: ",
                  style: const TextStyle(
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF334155),
                    fontSize: 15,
                  ),
                ),
                TextSpan(
                  text: item.desc,
                  style: const TextStyle(
                    color: Color(0xFF475569),
                    fontSize: 15,
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildWaveformVisualizer() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.monitor_heart_rounded, color: Color(0xFF059669), size: 28),
            SizedBox(width: 12),
            Expanded(
              child: Text(
                "EMG Waveform Visualizer",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF0F172A),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        const Text(
          "Tap any waveform to see its clinical significance. Learn the morphology that defines each discharge type.",
          style: TextStyle(
            fontSize: 14,
            color: Color(0xFF64748B),
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 20),
        // Abnormal Spontaneous Activity
        _buildWaveformGroup("Abnormal Spontaneous Activity", const Color(0xFFDC2626), const [
          WaveformType.fibrillation,
          WaveformType.psw,
          WaveformType.crd,
          WaveformType.myotonic,
          WaveformType.fasciculation,
        ]),
        const SizedBox(height: 24),
        // Motor Unit Potentials
        _buildWaveformGroup("Motor Unit Potentials", const Color(0xFF2563EB), const [
          WaveformType.normalMuap,
          WaveformType.neuropathicMuap,
          WaveformType.myopathicMuap,
        ]),
        const SizedBox(height: 24),
        // Normal / Benign Activity
        _buildWaveformGroup("Normal & Endplate Activity", const Color(0xFF059669), const [
          WaveformType.endplateNoise,
          WaveformType.endplateSpike,
        ]),
      ],
    );
  }

  Widget _buildWaveformGroup(String title, Color color, List<WaveformType> types) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.only(bottom: 8),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(color: color.withValues(alpha: 0.15), width: 2),
            ),
          ),
          child: Row(
            children: [
              Icon(Icons.auto_graph_rounded, color: color, size: 18),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: color,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        ...types.map((type) => Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: WaveformCard(type: type),
        )),
      ],
    );
  }

  Widget _buildSectionHeader(
    String title,
    String subtitle,
    IconData icon,
    Color color,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(width: 12),
            Text(
              title,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w900,
                color: Color(0xFF0F172A),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Text(
          subtitle,
          style: const TextStyle(
            fontSize: 16,
            color: Color(0xFF64748B),
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildPatternCategory(
    String title,
    List<PatternDetail> items,
    Color accentColor,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.only(bottom: 10),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(
                color: accentColor.withValues(alpha: 0.1),
                width: 2,
              ),
            ),
          ),
          child: Row(
            children: [
              Icon(Icons.auto_graph_rounded, color: accentColor, size: 20),
              const SizedBox(width: 10),
              Text(
                title,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: accentColor,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: items.length,
          itemBuilder: (context, index) => _PatternVideoCard(
            pattern: items[index],
            accentColor: accentColor,
          ),
        ),
      ],
    );
  }

  Widget _buildReferenceGuide() {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(
                Icons.table_chart_outlined,
                color: Color(0xFF6366F1),
                size: 28,
              ),
              SizedBox(width: 12),
              Text(
                "High-Yield Reference Guide",
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              headingRowColor: WidgetStateProperty.all(const Color(0xFFF8FAFC)),
              columns: const [
                DataColumn(
                  label: Text(
                    "Pattern",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                DataColumn(
                  label: Text(
                    "Source",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                DataColumn(
                  label: Text(
                    "Sound",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                DataColumn(
                  label: Text(
                    "Rate",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                DataColumn(
                  label: Text(
                    "Significance",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ],
              rows: PatternData.referenceGuide.map((ref) {
                return DataRow(
                  cells: [
                    DataCell(
                      Text(
                        ref.pattern,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF0F766E),
                        ),
                      ),
                    ),
                    DataCell(Text(ref.source)),
                    DataCell(Text(ref.sound)),
                    DataCell(Text(ref.rate)),
                    DataCell(
                      Text(ref.sig, style: const TextStyle(fontSize: 12)),
                    ),
                  ],
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildClinicalScenarios() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(
              Icons.medical_information_outlined,
              color: Color(0xFF6366F1),
              size: 28,
            ),
            SizedBox(width: 12),
            Text(
              "Advanced Scenario Breakdown",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w900,
                color: Color(0xFF0F172A),
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        ...PatternData.advancedScenarios.map(
          (caseStudy) => _buildCaseCard(caseStudy),
        ),
      ],
    );
  }

  Widget _buildCaseCard(CaseScenario caseStudy) {
    final color = caseStudy.id == 'case1'
        ? const Color(0xFFEF4444)
        : const Color(0xFF8B5CF6);
    return Container(
      margin: const EdgeInsets.only(bottom: 25),
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border(top: BorderSide(color: color, width: 6)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            caseStudy.title,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w800,
              color: Color(0xFF1E293B),
            ),
          ),
          const SizedBox(height: 15),
          RichText(
            text: TextSpan(
              children: [
                const TextSpan(
                  text: "Clinical: ",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF334155),
                    fontSize: 15,
                  ),
                ),
                TextSpan(
                  text: caseStudy.clinical,
                  style: const TextStyle(
                    color: Color(0xFF475569),
                    fontSize: 15,
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 15),
          RichText(
            text: TextSpan(
              children: [
                const TextSpan(
                  text: "EMG Findings: ",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF334155),
                    fontSize: 15,
                  ),
                ),
                TextSpan(
                  text: caseStudy.findings,
                  style: const TextStyle(
                    color: Color(0xFF475569),
                    fontSize: 15,
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(15),
              border: Border.all(color: color.withValues(alpha: 0.1)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "THE RESIDENT BREAKDOWN",
                  style: TextStyle(
                    color: color,
                    fontWeight: FontWeight.w900,
                    fontSize: 12,
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 12),
                ...caseStudy.features.map(
                  (f) => Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(top: 5),
                          child: Icon(
                            Icons.check_circle_rounded,
                            size: 14,
                            color: color,
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            f,
                            style: const TextStyle(
                              color: Color(0xFF475569),
                              fontSize: 14,
                              height: 1.4,
                            ),
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
}

class _PatternVideoCard extends StatelessWidget {
  final PatternDetail pattern;
  final Color accentColor;
  const _PatternVideoCard({required this.pattern, required this.accentColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
            decoration: const BoxDecoration(
              color: Color(0xFFFAFAFA),
              border: Border(bottom: BorderSide(color: Color(0xFFE2E8F0))),
              borderRadius: BorderRadius.vertical(top: Radius.circular(14)),
            ),
            child: Text(
              pattern.title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: Color(0xFF0F172A),
              ),
            ),
          ),
          AppVideoPlayer(videoId: pattern.videoId),
          Padding(
            padding: const EdgeInsets.all(25),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  pattern.description,
                  style: const TextStyle(
                    color: Color(0xFF475569),
                    fontSize: 15,
                    height: 1.6,
                  ),
                ),
                const SizedBox(height: 20),
                _buildPearls(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPearls() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(color: accentColor, width: 4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "CLINICAL PEARLS:",
            style: TextStyle(
              color: accentColor,
              fontWeight: FontWeight.w900,
              fontSize: 12,
              letterSpacing: 1,
            ),
          ),
          const SizedBox(height: 12),
          ...pattern.clinicalPearls.map(
            (pearl) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: RichText(
                text: TextSpan(
                  children: [
                    TextSpan(
                      text: "${pearl.label}: ",
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF334155),
                        fontSize: 14,
                      ),
                    ),
                    TextSpan(
                      text: pearl.value,
                      style: const TextStyle(
                        color: Color(0xFF475569),
                        fontSize: 14,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _QuizTab extends StatelessWidget {
  const _QuizTab();

  @override
  Widget build(BuildContext context) {
    return const QuizSessionView(
      questions: _basicPatternsQuestions,
      title: "Pattern Recognition Mastery",
      subtitle: "Challenge your visual and auditory diagnostic skills.",
    );
  }
}

const _basicPatternsQuestions = [
  QuizQuestion(
    question:
        "Which clinical diagnosis typically presents on EMG with widespread active denervation, large reinnervation MUAPs, and fasciculations?",
    options: [
      "Myasthenia Gravis",
      "Motor Neuron Disease (ALS)",
      "Polymyositis",
      "Myotonic Dystrophy",
    ],
    correctIndex: 1,
    explanation:
        "Widespread denervation + Reinnervation (Large MUAPs) + Fasciculations is the classic triad for Motor Neuron Disease (ALS).",
  ),
  QuizQuestion(
    question:
        "What is the characteristic sound of fibrillation potentials on EMG?",
    options: [
      "Seashell sound",
      "Rain on tin roof",
      "Marching soldiers",
      "Dive bomber",
    ],
    correctIndex: 1,
    explanation:
        "Fibrillations fire regularly at 0.5-10Hz, creating a characteristic 'rain on tin roof' sound.",
  ),
  QuizQuestion(
    question: "What is the clinical significance of myokymic discharges?",
    options: [
      "Always normal",
      "Only seen in myopathy",
      "Associated with radiation plexopathy or MS",
      "Indicates severe stroke",
    ],
    correctIndex: 2,
    explanation:
        "Myokymic discharges (grouped repetitive MUAP firing) are classic for radiation damage or MS (facial).",
  ),
  QuizQuestion(
    question:
        "How do you distinguish normal endplate spikes from pathologic fibrillations?",
    options: [
      "Endplate: initial negative; Fibrillation: initial positive",
      "Endplate: initial positive; Fibrillation: initial negative",
      "Amplitude size",
      "Firing rate",
    ],
    correctIndex: 0,
    explanation:
        "Endplate spikes are negative onset (upward) because they are nerve terminal irritation; Pathologic denervation is positive onset (downward) because it starts at the muscle fiber.",
  ),
  QuizQuestion(
    question:
        "Which EMG pattern is defined by a 'dive bomber' sound and waxing/waning frequency?",
    options: [
      "Fasciculations",
      "Complex Repetitive Discharges",
      "Myotonic Discharges",
      "CRPS",
    ],
    correctIndex: 2,
    explanation:
        "Myotonic discharges wax and wane in both frequency and amplitude, creating the 'dive bomber' or 'revving engine' sound.",
  ),
  QuizQuestion(
    question: "Fasciculations sound similar to:",
    options: ["Rain on tin roof", "Corn popping", "Machine gun", "Waterfall"],
    correctIndex: 1,
    explanation:
        "Fasciculations are single motor units firing irregularly, sounding like 'popcorn' or 'corn popping'.",
  ),
  QuizQuestion(
    question:
        "A 'polyphasic' motor unit potential is defined as having more than how many phases?",
    options: ["2", "3", "4", "5"],
    correctIndex: 2,
    explanation:
        "A MUAP is polyphasic if it has more than 4 phases (where phases = baseline crossings + 1).",
  ),
  QuizQuestion(
    question:
        "In a patient with severe myopathy, what recruitment pattern is expected?",
    options: [
      "Reduced (fast firing)",
      "Early (full interference at low force)",
      "Normal",
      "Infinite",
    ],
    correctIndex: 1,
    explanation:
        "In myopathy, since each unit is weak, the CNS activates many more units early to compensate for low force.",
  ),
  QuizQuestion(
    question: "Neuromyotonic discharges fire at what frequency range?",
    options: ["0.5-10 Hz", "50-100 Hz", "150-300 Hz", "1000 Hz"],
    correctIndex: 2,
    explanation:
        "Neuromyotonic discharges are very high frequency (150-300 Hz) decrementing bursts.",
  ),
  QuizQuestion(
    question:
        "What spontaneous activity pattern sounds like a 'machine-like' motorcycle or motorboat due to its perfect regularity?",
    options: [
      "Fibrillations",
      "Fasciculations",
      "Complex Repetitive Discharges (CRDs)",
      "Myotonia",
    ],
    correctIndex: 2,
    explanation:
        "CRDs are perfectly regular and start/stop abruptly, sounding like a 'motorcycle' or 'motorboat'.",
  ),
  QuizQuestion(
    question:
        "Fasciculation potentials represent the spontaneous firing of what structure?",
    options: [
      "Single muscle fiber",
      "A single motor unit",
      "A nerve bundle",
      "A spinal cord segment",
    ],
    correctIndex: 1,
    explanation:
        "Fasciculations are the spontaneous firing of an entire motor unit, whereas fibrillations are firing of single muscle fibers.",
  ),
];
