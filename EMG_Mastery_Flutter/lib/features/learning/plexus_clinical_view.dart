import 'package:flutter/material.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../core/widgets/keep_alive_tab_wrapper.dart';

/// Clinical Pathophysiology content for the Brachial Plexus module.
class PlexusClinicalView extends StatelessWidget {
  const PlexusClinicalView({super.key});

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
              indicatorColor: Color(0xFF0EA5E9),
              labelColor: Color(0xFF0EA5E9),
              unselectedLabelColor: Color(0xFF94A3B8),
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: [
                Tab(text: 'Clinical Guide'),
                Tab(text: 'Practice Quiz'),
              ],
            ),
          ),
          const Expanded(
            child: TabBarView(
              children: [
                KeepAliveTabWrapper(child: _ClinicalGuideTab()),
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
          colors: [Color(0xFF0EA5E9), Color(0xFF0284C7)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: const Column(
        children: [
          Text(
            'Brachial Plexus Masterclass',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: -0.5,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'Mastering Geographic Neuro-Localization',
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

class _ClinicalGuideTab extends StatelessWidget {
  const _ClinicalGuideTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildMentorshipIntro(),
          const SizedBox(height: 25),
          _buildGoldenRuleSection(),
          const SizedBox(height: 25),
          _buildBigThreeSection(),
          const SizedBox(height: 25),
          _buildBurnersSection(),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildMentorshipIntro() {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: const Color(0xFFF0F9FF),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFF7DD3FC)),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF0EA5E9).withValues(alpha: 0.08),
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
                Icons.psychology_outlined,
                color: Color(0xFF0369A1),
                size: 32,
              ),
              const SizedBox(width: 12),
              const Text(
                'Clinical Brachial Plexopathy',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF0369A1),
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          const Text(
            'If Radiculopathy is the "Bread & Butter," then Brachial Plexopathy is the "Master Class." Detecting a plexus lesion requires you to stop thinking about single nerves and start thinking about geographic intersections.',
            style: TextStyle(
              fontSize: 16,
              color: Color(0xFF0C4A6E),
              fontWeight: FontWeight.w500,
              height: 1.6,
            ),
          ),
          const SizedBox(height: 25),
          Row(
            children: [
              Expanded(
                child: _SmallInfoCard(
                  title: 'Diagnostic Goal',
                  text:
                      'Is it a Root (Radiculopathy), a Plexus lesion, or a Peripheral Nerve injury?',
                ),
              ),
              const SizedBox(width: 15),
              Expanded(
                child: _SmallInfoCard(
                  title: 'Resident Pro-Tip',
                  text:
                      '"The SNAP is your compass. If the SNAP is dead, the lesion is in or distal to the plexus."',
                  isItalic: true,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildGoldenRuleSection() {
    return _SectionCard(
      title: "THE GOLDEN RULE: LOCALIZATION",
      icon: Icons.auto_awesome_rounded,
      color: const Color(0xFF0EA5E9),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "This is the most critical distinction in all of EDX. When a patient presents with weakness and numbness in the arm, the Sensory Nerve Action Potential (SNAP) tells you exactly where the \"cut\" is.",
            style: TextStyle(
              fontSize: 15,
              color: Color(0xFF334155),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 25),
          Row(
            children: [
              Expanded(
                child: _ScenarioCard(
                  title: "Scenario A: Pre-ganglionic",
                  subtitle: "Root Level (Radiculopathy)",
                  desc:
                      "The lesion is proximal to the Dorsal Root Ganglion. The axon in the arm is still connected to its cell body.",
                  result: "Result: SNAP is NORMAL",
                  resultColor: const Color(0xFF059669),
                  isBlue: false,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _ScenarioCard(
                  title: "Scenario B: Post-ganglionic",
                  subtitle: "Plexus Level (Plexopathy)",
                  desc:
                      "The lesion is distal to the DRG. The axon in the arm has been cut off from its cell body and dies.",
                  result: "Result: SNAP is ABSENT/LOW",
                  resultColor: const Color(0xFFEF4444),
                  isBlue: true,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBigThreeSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: const BoxDecoration(
                color: Color(0xFFF5F3FF),
                shape: BoxShape.circle,
              ),
              child: const Center(
                child: Text(
                  "2",
                  style: TextStyle(
                    color: Color(0xFF8B5CF6),
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            const Text(
              "THE BIG THREE PATTERNS",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w900,
                color: Color(0xFF1E293B),
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        _DetailedPatternCard(
          title: "Upper Trunk (C5-C6) — \"Erb's Palsy\"",
          badge: "Most Common",
          color: const Color(0xFF8B5CF6),
          bgColor: const Color(0xFFFAF5FF),
          borderColor: const Color(0xFFE9D5FF),
          cause:
              "Trauma (motorcycle accidents) or birth injury where the head and shoulder are pulled apart.",
          presentation:
              "\"Waiter's Tip\" posture. Shoulder adducted/internally rotated; elbow extended; forearm pronated.",
          signature:
              "Abnormal Medial/Lateral Antebrachial Cutaneous SNAPs + C5/C6 muscle denervation (Deltoid, Biceps).",
        ),
        const SizedBox(height: 15),
        _DetailedPatternCard(
          title: "Lower Trunk (C8-T1) — \"Klumpke's Palsy\"",
          color: const Color(0xFFEF4444),
          bgColor: const Color(0xFFFFF1F2),
          borderColor: const Color(0xFFFECACA),
          cause:
              "Grabbing a tree branch while falling, or \"Apex of Lung\" tumors (Pancoast Tumor).",
          presentation:
              "\"Claw Hand\" with sensory loss in the pinky and medial forearm.",
          signature:
              "Abnormal Ulnar SNAP + Medial Antebrachial Cutaneous SNAP. Weakness in ALL hand intrinsics.",
        ),
        const SizedBox(height: 15),
        _DetailedPatternCard(
          title: "Parsonage-Turner Syndrome",
          subtitle: "Neuralgic Amyotrophy",
          color: const Color(0xFF0F766E),
          bgColor: const Color(0xFFF0FDFA),
          borderColor: const Color(0xFFCCFBF1),
          cause:
              "Intense, debilitating shoulder pain for days, replaced by sudden weakness. Often post-viral.",
          presentation:
              "Patchy multi-nerve weakness (Long Thoracic, Suprascapular) not following a neat trunk pattern.",
          signature:
              "Acute denervation in isolated muscles without a unifying root or trunk distribution.",
        ),
      ],
    );
  }

  Widget _buildBurnersSection() {
    return Container(
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.15),
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
                Icons.bolt_rounded,
                color: Color(0xFF38BDF8),
                size: 28,
              ),
              const SizedBox(width: 12),
              const Text(
                'Burners & Stingers',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF38BDF8),
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          const Text(
            'Common in football and wrestling. When the head is violently forced to the side, it either compresses or stretches the upper plexus.',
            style: TextStyle(fontSize: 15, color: Colors.white70, height: 1.6),
          ),
          const SizedBox(height: 20),
          _AthletePoint(
            text: "Transient electric shock sensation down the arm.",
          ),
          _AthletePoint(
            text:
                "If symptoms last >15 minutes, get an EMG (but wait 3 weeks!).",
          ),
          _AthletePoint(text: "Localization: Usually the Upper Trunk (C5-C6)."),
        ],
      ),
    );
  }
}

// UI Support Widgets
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
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(width: 12),
              Text(
                title,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w900,
                  color: color,
                  letterSpacing: 1.2,
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
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFBAE6FD)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              color: Color(0xFF0369A1),
              fontWeight: FontWeight.w800,
              fontSize: 13,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            text,
            style: TextStyle(
              fontSize: 12,
              color: const Color(0xFF334155),
              fontStyle: isItalic ? FontStyle.italic : null,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _ScenarioCard extends StatelessWidget {
  final String title, subtitle, desc, result;
  final Color resultColor;
  final bool isBlue;
  const _ScenarioCard({
    required this.title,
    required this.subtitle,
    required this.desc,
    required this.result,
    required this.resultColor,
    required this.isBlue,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: isBlue ? const Color(0xFFF0F9FF) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isBlue ? const Color(0xFFBAE6FD) : const Color(0xFFE2E8F0),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title.toUpperCase(),
            style: TextStyle(
              color: isBlue ? const Color(0xFF0369A1) : const Color(0xFF64748B),
              fontWeight: FontWeight.w900,
              fontSize: 10,
              letterSpacing: 0.5,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            subtitle,
            style: TextStyle(
              fontWeight: FontWeight.w800,
              color: isBlue ? const Color(0xFF0EA5E9) : const Color(0xFF0369A1),
              fontSize: 13,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            desc,
            style: const TextStyle(
              fontSize: 12,
              color: Color(0xFF475569),
              height: 1.4,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            result,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w900,
              color: resultColor,
            ),
          ),
        ],
      ),
    );
  }
}

class _DetailedPatternCard extends StatelessWidget {
  final String title;
  final String? subtitle, badge, cause, presentation, signature;
  final Color color, bgColor, borderColor;
  const _DetailedPatternCard({
    required this.title,
    this.subtitle,
    this.badge,
    this.cause,
    this.presentation,
    this.signature,
    required this.color,
    required this.bgColor,
    required this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: borderColor),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: color,
                  ),
                ),
              ),
              if (badge != null)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: color,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    badge!,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
            ],
          ),
          if (subtitle != null) ...[
            const SizedBox(height: 4),
            Text(
              subtitle!,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: color.withValues(alpha: 0.8),
              ),
            ),
          ],
          const SizedBox(height: 15),
          if (cause != null) _DataRow(label: "Cause", value: cause!),
          if (presentation != null)
            _DataRow(label: "Presentation", value: presentation!),
          const SizedBox(height: 12),
          if (signature != null)
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: color.withValues(alpha: 0.2),
                  style: BorderStyle.solid,
                ),
              ),
              child: RichText(
                text: TextSpan(
                  children: [
                    TextSpan(
                      text: "EDX Signature: ",
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        color: color,
                        fontSize: 13,
                      ),
                    ),
                    TextSpan(
                      text: signature!,
                      style: TextStyle(
                        color: color.withValues(alpha: 0.9),
                        fontSize: 13,
                        height: 1.4,
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
}

class _DataRow extends StatelessWidget {
  final String label, value;
  const _DataRow({required this.label, required this.value});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "$label: ",
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                color: Color(0xFF1E293B),
                fontSize: 14,
              ),
            ),
            TextSpan(
              text: value,
              style: const TextStyle(
                color: Color(0xFF475569),
                fontSize: 14,
                height: 1.4,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AthletePoint extends StatelessWidget {
  final String text;
  const _AthletePoint({required this.text});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 4),
            width: 18,
            height: 18,
            decoration: const BoxDecoration(
              color: Color(0xFF38BDF8),
              shape: BoxShape.circle,
            ),
            child: const Center(
              child: Text(
                "!",
                style: TextStyle(
                  color: Color(0xFF1E293B),
                  fontSize: 10,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                height: 1.4,
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
      questions: _plexusQuizQuestions,
      title: "Geographic Mastery",
      subtitle:
          "Prove your ability to localize complex brachial plexus lesions.",
    );
  }
}

const _plexusQuizQuestions = [
  QuizQuestion(
    question:
        "A patient presents with numbness in the thumb and index finger (C6 distribution). The Median SNAP (recording Digit 2) is normal. Where is the most likely location of the lesion?",
    options: [
      "Upper Trunk",
      "Lateral Cord",
      "C6 Nerve Root",
      "Median Nerve at the wrist",
    ],
    correctIndex: 2,
    explanation:
        "If the SNAP is NORMAL in a region of numbness, the lesion is PRE-GANGLIONIC (a nerve root). Post-ganglionic lesions (Plexus/Nerve) destroy the sensory axons distal to the DRG, causing a drop in SNAP amplitude.",
  ),
  QuizQuestion(
    question:
        "A patient presents with a 'Claw Hand' and severe hand intrinsic weakness. You also note Miosis and Ptosis on the same side (Horner's Syndrome). This strongly localizes to:",
    options: [
      "Lower Trunk Brachial Plexopathy",
      "C8/T1 Nerve Root Avulsion",
      "Ulnar Neuropathy at the Cubital Tunnel",
      "Neurogenic Thoracic Outlet Syndrome",
    ],
    correctIndex: 1,
    explanation:
        "Horner's Syndrome + C8/T1 symptoms indicates a PRE-GANGLIONIC (root) lesion high enough to involve the sympathetic rami. This usually suggests a traumatic pre-ganglionic root avulsion.",
  ),
  QuizQuestion(
    question:
        "Which muscle is supplied by a branch directly off the C5 root, making it a critical 'Root vs. Trunk' discriminator on EMG?",
    options: [
      "Supraspinatus",
      "Deltoid",
      "Rhomboids (Dorsal Scapular Nerve)",
      "Biceps",
    ],
    correctIndex: 2,
    explanation:
        "The Rhomboids are innervated by the Dorsal Scapular Nerve, which branches directly off the C5 ROOT. If Rhomboids are spared but the Supraspinatus (Upper Trunk) is weak, the lesion must be at the Trunk level.",
  ),
  QuizQuestion(
    question:
        "A patient presents with sudden, intense, 'unbearable' shoulder pain that lasts for a week, followed by progressive weakness in the shoulder and serratus anterior. This is characteristic of:",
    options: [
      "Pancoast Tumor",
      "Parsonage-Turner Syndrome (Neuralgic Amyotrophy)",
      "Acute C5 Radiculopathy",
      "Axillary Nerve Entrapment",
    ],
    correctIndex: 1,
    explanation:
        "Sudden severe pain followed by multi-focal weakness (often including the Long Thoracic Nerve causing winging) is the hallmark of Parsonage-Turner Syndrome.",
  ),
  QuizQuestion(
    question:
        "Neurogenic Thoracic Outlet Syndrome (nTOS) classically affects which part of the plexus and leads to which EMG finding?",
    options: [
      "Upper Trunk; Median SNAP drop",
      "Lower Trunk; Median CMAP drop + Ulnar SNAP drop",
      "Cords; Normal SNAPs",
      "Roots; Fasciculations",
    ],
    correctIndex: 1,
    explanation:
        "nTOS (Gilliatt-Sumner hand) involves the Lower Trunk. It is unique because it shows a Median CMAP drop (loss of thenar fibers) and an Ulnar SNAP drop (loss of T1/C8 sensory fibers).",
  ),
  QuizQuestion(
    question:
        "Which cord of the brachial plexus is formed solely by the combination of the posterior divisions of all three trunks?",
    options: ["Lateral Cord", "Medial Cord", "Posterior Cord", "Terminal Cord"],
    correctIndex: 2,
    explanation:
        "The Posterior Cord is unique as it receives input from all three trunks (Upper, Middle, and Lower) via their posterior divisions.",
  ),
  QuizQuestion(
    question:
        "An 'Erb's Palsy' typically involves which roots and results in what classic limb posture?",
    options: [
      "C8-T1; Claw Hand",
      "C5-C6; Waiter's Tip",
      "C7; Wrist Drop",
      "C5-T1; Flail Arm",
    ],
    correctIndex: 1,
    explanation:
        "Erb's palsy involves the Upper Trunk (C5-C6). Loss of abductors and external rotators results in the arm being adducted and internally rotated (Waiter's Tip).",
  ),
  QuizQuestion(
    question:
        "During reinnervation after a severe global plexus injury, which of these muscles will show recovery FIRST?",
    options: [
      "Abductor Pollicis Brevis",
      "First Dorsal Interosseous",
      "Biceps Brachii",
      "Extensor Indicis Proprius",
    ],
    correctIndex: 2,
    explanation:
        "Nerves regrow at ~1mm/day. Muscles closest to the plexus (proximal, like the Biceps) will receive axons and show recovery long before distal hand muscles.",
  ),
  QuizQuestion(
    question:
        "A lesion strictly localized to the Posterior Cord would spare which of these nerves?",
    options: [
      "Radial Nerve",
      "Axillary Nerve",
      "Musculocutaneous Nerve",
      "Thoracodorsal Nerve",
    ],
    correctIndex: 2,
    explanation:
        "The Musculocutaneous nerve originates from the Lateral Cord. The Posterior Cord gives rise to the Radial, Axillary, Subscapular, and Thoracodorsal nerves.",
  ),
  QuizQuestion(
    question:
        "You find low SNAPs in the Medial Antebrachial Cutaneous (MAC) and Ulnar distributions, but a normal Median SNAP (Digit 2). This geographic pattern localizes to:",
    options: [
      "Medial Cord / Lower Trunk",
      "Lateral Cord",
      "C6 Radiculopathy",
      "Ulnar nerve at the elbow",
    ],
    correctIndex: 0,
    explanation:
        "MAC and Ulnar SNAPs both represent the C8-T1/Medial Cord/Lower Trunk pathway. Sparing of the Median SNAP (C6-C7/Lateral Cord) confirms the geographic boundary.",
  ),
  QuizQuestion(
    question:
        "What is the primary recording site for motor NCS in a suspected case of neurogenic Thoracic Outlet Syndrome?",
    options: ["FDI (Ulnar)", "APB (Median)", "ADM (Ulnar)", "EIP (Radial)"],
    correctIndex: 1,
    explanation:
        "While nTOS is a lower trunk/medial cord issue, the fibers to the APB (Median) are often more selectively lost, leading to the characteristic thenar atrophy (Gilliatt-Sumner hand).",
  ),
];
