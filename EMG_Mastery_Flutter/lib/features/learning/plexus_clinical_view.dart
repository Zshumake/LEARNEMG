import 'package:flutter/material.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../core/widgets/keep_alive_tab_wrapper.dart';
import '../../core/widgets/module_hero_header.dart';
import '../../core/theme/app_theme.dart';
import '../../data/podcast_data.dart';
import '../podcast/widgets/podcast_trigger_card.dart';
import '../../core/widgets/diagram_card.dart';
import '../../core/widgets/comparison_card.dart';
import '../../data/board_comparisons.dart';

/// Clinical Pathophysiology content for the Brachial Plexus module.
class PlexusClinicalView extends StatelessWidget {
  const PlexusClinicalView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          const ModuleHeroHeader(
            title: 'Brachial Plexus Masterclass',
            subtitle: 'Mastering Geographic Neuro-Localization',
            color: AppTheme.modulePlexus,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: PodcastTriggerCard(
              episode: PodcastData.getEpisodesByModule('plexus-anatomy').first,
            ),
          ),
          Container(
            color: Theme.of(context).scaffoldBackgroundColor,
            child: const TabBar(
              indicatorColor: AppTheme.modulePlexus,
              labelColor: AppTheme.modulePlexus,
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
          const SizedBox(height: 20),
          const DiagramCard(
            imagePath: 'assets/images/pathways/Median Nerve.png',
            caption: 'Median Nerve -- From Lateral & Medial Cords to Hand',
            labels: [
              DiagramLabel(text: 'C5-T1 Roots', color: Color(0xFFDC2626)),
              DiagramLabel(text: 'Pronator Teres', color: Color(0xFF2563EB)),
              DiagramLabel(text: 'AIN Branch', color: Color(0xFF7C3AED)),
              DiagramLabel(text: 'Carpal Tunnel', color: Color(0xFFF59E0B)),
            ],
          ),
          const DiagramCard(
            imagePath: 'assets/images/pathways/Ulnar Nerve.png',
            caption: 'Ulnar Nerve -- From Medial Cord to Hand',
            labels: [
              DiagramLabel(text: 'C8-T1 Roots', color: Color(0xFFDC2626)),
              DiagramLabel(text: 'Cubital Tunnel', color: Color(0xFF2563EB)),
              DiagramLabel(text: 'Guyon Canal', color: Color(0xFFF59E0B)),
              DiagramLabel(text: 'DUC Branch', color: Color(0xFF059669)),
            ],
          ),
          _buildGoldenRuleSection(),
          const SizedBox(height: 25),
          _buildBigThreeSection(),
          const SizedBox(height: 25),
          _buildCordPatternsSection(),
          const SizedBox(height: 25),
          _buildBurnersSection(),
          const SizedBox(height: 25),
          ComparisonCard(
            title: BoardComparisons.radiationVsTumor.title,
            columns: BoardComparisons.radiationVsTumor.columns,
            rows: BoardComparisons.radiationVsTumor.rows,
            footnote: BoardComparisons.radiationVsTumor.footnote,
          ),
          const SizedBox(height: 25),
          _buildLocalizationScenariosSection(),
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

  static Widget _buildCordPatternsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: const BoxDecoration(
                color: Color(0xFFF0F9FF),
                shape: BoxShape.circle,
              ),
              child: const Center(
                child: Text(
                  "3",
                  style: TextStyle(
                    color: Color(0xFF0EA5E9),
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            const Text(
              "CORD LESION PATTERNS",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w900,
                color: Color(0xFF1E293B),
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        const _CordPatternCard(
          title: "Lateral Cord (C5-C7)",
          terminal:
              "Musculocutaneous nerve + Lateral root of Median nerve",
          muscles:
              "Biceps, brachialis, coracobrachialis (musculocutaneous); pronator teres, FCR (lateral median contribution)",
          sensory:
              "Lateral antebrachial cutaneous nerve (LABC) -- lateral forearm",
          keyTest:
              "If biceps AND pronator teres are weak, but hand intrinsics and deltoid are normal, think Lateral Cord.",
          edxPearl:
              "Abnormal LABC SNAP with normal ulnar SNAP = lateral cord (not lower trunk)",
          color: Color(0xFF2563EB),
          bgColor: Color(0xFFEFF6FF),
          borderColor: Color(0xFFBFDBFE),
        ),
        const SizedBox(height: 15),
        const _CordPatternCard(
          title: "Posterior Cord (C5-T1)",
          terminal:
              "Axillary nerve + Radial nerve + Thoracodorsal + Subscapular nerves",
          muscles:
              "Deltoid, teres minor (axillary); triceps, brachioradialis, all wrist/finger extensors (radial); latissimus dorsi (thoracodorsal)",
          sensory:
              "Posterior cutaneous nerve of arm, lateral cutaneous nerve of forearm (via radial), regimental badge area (axillary)",
          keyTest:
              "If deltoid AND triceps/wrist extensors are weak, but biceps and hand intrinsics are normal, think Posterior Cord.",
          edxPearl:
              "Absent radial SNAP with normal LABC and ulnar SNAPs = posterior cord",
          color: Color(0xFFEA580C),
          bgColor: Color(0xFFFFF7ED),
          borderColor: Color(0xFFFED7AA),
        ),
        const SizedBox(height: 15),
        const _CordPatternCard(
          title: "Medial Cord (C8-T1)",
          terminal:
              "Ulnar nerve + Medial root of Median nerve + Medial pectoral nerve",
          muscles:
              "All ulnar-innervated hand intrinsics (FDI, ADM, interossei); APB, opponens pollicis (medial median contribution); FDP to ring/little (ulnar)",
          sensory:
              "Medial antebrachial cutaneous (MABC) -- medial forearm; ulnar nerve -- small finger and medial hand",
          keyTest:
              "If ALL hand intrinsics are weak (both ulnar and median-innervated) but deltoid and biceps are normal, think Medial Cord or Lower Trunk.",
          edxPearl:
              "Abnormal MABC SNAP is the key localizer -- it branches directly from the medial cord, not from the ulnar nerve.",
          color: Color(0xFFDC2626),
          bgColor: Color(0xFFFEF2F2),
          borderColor: Color(0xFFFECACA),
        ),
      ],
    );
  }

  static Widget _buildLocalizationScenariosSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: const BoxDecoration(
                color: Color(0xFFF0FDFA),
                shape: BoxShape.circle,
              ),
              child: const Center(
                child: Text(
                  "4",
                  style: TextStyle(
                    color: Color(0xFF0F766E),
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            const Text(
              "LOCALIZATION SCENARIOS",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w900,
                color: Color(0xFF1E293B),
              ),
            ),
          ],
        ),
        const SizedBox(height: 20),
        const _LocalizationScenarioCard(
          scenarioNumber: 1,
          stem:
              "A 22-year-old motorcyclist presents after a high-speed collision. The right arm hangs at the side in the 'waiter's tip' position (shoulder adducted, internally rotated, elbow extended, forearm pronated). Biceps reflex is absent. All SNAPs in the hand are normal.",
          question: "Where is the lesion?",
          options: [
            "C5-C6 Radiculopathy",
            "Upper Trunk (Erb's Palsy)",
            "Lateral Cord Lesion",
            "Posterior Cord Lesion",
          ],
          correctIndex: 1,
          explanation:
              "The waiter's tip posture with absent biceps reflex points to C5-C6. Normal hand SNAPs could indicate either root or trunk level. However, the trauma mechanism (lateral neck-shoulder distraction) and the pattern of weakness in multiple C5-C6 nerves (axillary, musculocutaneous, suprascapular) localizes to the upper trunk. If paraspinals were abnormal, you would consider root avulsion.",
        ),
        const SizedBox(height: 12),
        const _LocalizationScenarioCard(
          scenarioNumber: 2,
          stem:
              "A 58-year-old smoker presents with progressive hand weakness over 3 months. Examination reveals a claw hand deformity, numbness in the small finger and medial forearm, and ipsilateral Horner syndrome (ptosis, miosis, anhidrosis). The ulnar SNAP is absent. Chest imaging shows a Pancoast tumor at the lung apex.",
          question: "Where is the lesion?",
          options: [
            "Ulnar Nerve at the Elbow",
            "Medial Cord",
            "Lower Trunk (C8-T1)",
            "C8 Radiculopathy",
          ],
          correctIndex: 2,
          explanation:
              "Horner syndrome with lower plexus findings is pathognomonic for a lower trunk (C8-T1) lesion. The Pancoast tumor invades the lower trunk from below. Key: (1) Absent ulnar SNAP = postganglionic (rules out root), (2) Horner syndrome = sympathetic chain at T1 (points to trunk, not cord), (3) ALL hand intrinsics weak = not a single peripheral nerve.",
        ),
        const SizedBox(height: 12),
        const _LocalizationScenarioCard(
          scenarioNumber: 3,
          stem:
              "A 35-year-old woman wakes up 2 weeks after a flu-like illness with excruciating right shoulder pain lasting 3 days. The pain resolves, but she cannot lift her arm overhead. EMG shows dense denervation in the supraspinatus, infraspinatus, AND serratus anterior, with normal paraspinals. The lateral antebrachial cutaneous SNAP is reduced.",
          question: "What is the diagnosis?",
          options: [
            "C5-C6 Radiculopathy",
            "Upper Trunk Plexopathy from Trauma",
            "Parsonage-Turner Syndrome (Neuralgic Amyotrophy)",
            "Rotator Cuff Tear",
          ],
          correctIndex: 2,
          explanation:
              "Classic Parsonage-Turner syndrome: (1) Intense pain preceding weakness, (2) Post-viral trigger, (3) Patchy denervation that does NOT follow a single trunk pattern -- suprascapular + long thoracic are from DIFFERENT origins, (4) Normal paraspinals exclude radiculopathy, (5) Abnormal SNAP confirms postganglionic.",
        ),
        const SizedBox(height: 12),
        const _LocalizationScenarioCard(
          scenarioNumber: 4,
          stem:
              "A patient presents after a shoulder dislocation with weakness of deltoid (3/5) and wrist/finger extension (2/5). Biceps strength is 5/5. Triceps is 3/5. The radial SNAP is absent. Lateral antebrachial cutaneous SNAP is normal.",
          question: "Where is the lesion?",
          options: [
            "Upper Trunk",
            "Posterior Cord",
            "C7 Radiculopathy",
            "Radial Nerve at Spiral Groove",
          ],
          correctIndex: 1,
          explanation:
              "The posterior cord gives rise to both the axillary nerve (deltoid) and the radial nerve (triceps, wrist/finger extensors). Normal biceps = lateral cord intact. Absent radial SNAP confirms postganglionic (not root). Normal LABC SNAP confirms the lateral cord is spared. If this were a radial nerve lesion at the spiral groove, the deltoid would be normal.",
        ),
        const SizedBox(height: 12),
        const _LocalizationScenarioCard(
          scenarioNumber: 5,
          stem:
              "A patient has weakness of biceps (3/5) and pronator teres (3/5), but normal hand intrinsic strength (FDI 5/5, APB 5/5). The lateral antebrachial cutaneous SNAP is absent. The ulnar SNAP is normal. Deltoid is 5/5.",
          question: "Where is the lesion?",
          options: [
            "Upper Trunk",
            "Lateral Cord",
            "C6 Radiculopathy",
            "Musculocutaneous Nerve",
          ],
          correctIndex: 1,
          explanation:
              "The lateral cord gives rise to: (1) Musculocutaneous nerve (biceps, brachialis) and (2) Lateral contribution to median nerve (pronator teres, FCR). Normal deltoid = posterior cord intact. Normal hand intrinsics = medial cord intact. Absent LABC SNAP = postganglionic. Normal ulnar SNAP = medial cord/lower trunk spared.",
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

class _CordPatternCard extends StatelessWidget {
  final String title;
  final String terminal;
  final String muscles;
  final String sensory;
  final String keyTest;
  final String edxPearl;
  final Color color;
  final Color bgColor;
  final Color borderColor;

  const _CordPatternCard({
    required this.title,
    required this.terminal,
    required this.muscles,
    required this.sensory,
    required this.keyTest,
    required this.edxPearl,
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
          Text(
            title,
            style: TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.w800,
              color: color,
            ),
          ),
          const SizedBox(height: 15),
          _CordDataRow(label: "Terminal Nerves:", value: terminal),
          _CordDataRow(label: "Key Muscles:", value: muscles),
          _CordDataRow(label: "Sensory Territory:", value: sensory),
          _CordDataRow(label: "Key Test:", value: keyTest),
          _CordDataRow(label: "EDX Pearl:", value: edxPearl),
        ],
      ),
    );
  }
}

class _CordDataRow extends StatelessWidget {
  final String label;
  final String value;
  const _CordDataRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: "$label ",
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                color: Color(0xFF1E293B),
                fontSize: 13,
              ),
            ),
            TextSpan(
              text: value,
              style: const TextStyle(
                color: Color(0xFF475569),
                fontSize: 13,
                height: 1.4,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LocalizationScenarioCard extends StatelessWidget {
  final int scenarioNumber;
  final String stem;
  final String question;
  final List<String> options;
  final int correctIndex;
  final String explanation;

  const _LocalizationScenarioCard({
    required this.scenarioNumber,
    required this.stem,
    required this.question,
    required this.options,
    required this.correctIndex,
    required this.explanation,
  });

  @override
  Widget build(BuildContext context) {
    const optionLetters = ['A', 'B', 'C', 'D'];
    return Card(
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: ExpansionTile(
        leading: CircleAvatar(
          backgroundColor: const Color(0xFF0F766E),
          radius: 16,
          child: Text(
            '$scenarioNumber',
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w800,
              fontSize: 13,
            ),
          ),
        ),
        title: Text(
          stem.length > 60 ? '${stem.substring(0, 60)}...' : stem,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: Color(0xFF1E293B),
          ),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  stem,
                  style: const TextStyle(
                    fontSize: 14,
                    color: Color(0xFF334155),
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 15),
                Text(
                  question,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF0F766E),
                  ),
                ),
                const SizedBox(height: 10),
                for (var i = 0; i < options.length; i++)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: Text(
                      '${optionLetters[i]}. ${options[i]}',
                      style: TextStyle(
                        fontSize: 14,
                        color: const Color(0xFF334155),
                        fontWeight: i == correctIndex
                            ? FontWeight.w700
                            : FontWeight.w400,
                      ),
                    ),
                  ),
                const SizedBox(height: 12),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF0FDF4),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFFBBF7D0)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Answer: ${optionLetters[correctIndex]}. ${options[correctIndex]}',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF059669),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        explanation,
                        style: const TextStyle(
                          fontSize: 13,
                          color: Color(0xFF334155),
                          height: 1.5,
                        ),
                      ),
                    ],
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
  // ── Nerve Pathway Knowledge Checks (from web PathwayData.js) ──
  QuizQuestion(
    question:
        "A patient has numbness in the thumb, index, and middle fingers with thenar weakness. What is the most common site of median nerve entrapment?",
    options: [
      "Ligament of Struthers",
      "Pronator teres",
      "Carpal tunnel",
      "Axilla",
    ],
    correctIndex: 2,
    explanation:
        "Carpal tunnel syndrome is the most common peripheral nerve entrapment worldwide. The median nerve passes beneath the transverse carpal ligament with the flexor tendons. Thenar weakness (APB) plus sensory loss in the first 3.5 digits is the classic pattern.",
  ),
  QuizQuestion(
    question:
        "A patient has numbness in the small finger and weakness of finger abduction. The dorsal ulnar hand is also numb. Where is the lesion?",
    options: [
      "Guyon's canal at the wrist",
      "Cubital tunnel at the elbow",
      "Medial cord of brachial plexus",
      "C8 nerve root",
    ],
    correctIndex: 1,
    explanation:
        "The dorsal ulnar cutaneous nerve branches PROXIMAL to Guyon's canal. If dorsal ulnar hand sensation is abnormal, the lesion must be at or above the elbow (cubital tunnel). Guyon's canal lesions spare dorsal sensation because that branch has already departed.",
  ),
  QuizQuestion(
    question:
        "A patient wakes up after sleeping with the arm draped over a chair. They have wrist drop but can extend the elbow normally. Where is the radial nerve injured?",
    options: [
      "Axilla",
      "Spiral groove of the humerus",
      "Posterior interosseous nerve",
      "Superficial radial nerve",
    ],
    correctIndex: 1,
    explanation:
        "This is classic 'Saturday Night Palsy.' The radial nerve is compressed at the spiral groove. The triceps is spared because its branch exits proximal to the groove.",
  ),
  QuizQuestion(
    question:
        "The musculocutaneous nerve has a unique anatomical feature. Which muscle does it physically pierce (pass through)?",
    options: [
      "Biceps brachii",
      "Brachialis",
      "Coracobrachialis",
      "Deltoid",
    ],
    correctIndex: 2,
    explanation:
        "The musculocutaneous nerve (C5-C7, lateral cord) uniquely pierces through the coracobrachialis muscle before innervating the biceps and brachialis. It then continues as the purely sensory lateral antebrachial cutaneous nerve.",
  ),
  QuizQuestion(
    question:
        "A patient sustains an anterior shoulder dislocation. Which nerve is most at risk, and what is the key sensory area to test?",
    options: [
      "Radial nerve -- posterior forearm",
      "Musculocutaneous nerve -- lateral forearm",
      "Axillary nerve -- regimental badge area",
      "Suprascapular nerve -- posterior shoulder",
    ],
    correctIndex: 2,
    explanation:
        "The axillary nerve (C5-C6, posterior cord) wraps around the surgical neck of the humerus through the quadrilateral space. Anterior shoulder dislocations stretch or compress the nerve. Test sensation over the lateral deltoid ('regimental badge' area).",
  ),
  QuizQuestion(
    question:
        "The sciatic nerve bifurcates into its two terminal branches at which anatomical landmark?",
    options: [
      "Greater sciatic foramen",
      "Piriformis muscle",
      "Popliteal fossa",
      "Fibular head",
    ],
    correctIndex: 2,
    explanation:
        "The sciatic nerve (L4-S3) typically divides into the tibial nerve and common fibular (peroneal) nerve at or just above the popliteal fossa behind the knee. In approximately 10-15% of individuals, the division occurs higher.",
  ),
  QuizQuestion(
    question:
        "The tibial nerve passes through which structure at the ankle, analogous to the carpal tunnel at the wrist?",
    options: [
      "Sinus tarsi",
      "Tarsal tunnel",
      "Cuboid tunnel",
      "Plantar fascia",
    ],
    correctIndex: 1,
    explanation:
        "The tarsal tunnel is formed by the flexor retinaculum behind the medial malleolus. The tibial nerve passes through this space. Compression here causes tarsal tunnel syndrome with burning pain and numbness on the plantar surface of the foot.",
  ),
  QuizQuestion(
    question:
        "Why is the common fibular (peroneal) nerve particularly vulnerable to injury at the fibular head?",
    options: [
      "It crosses over bone with minimal soft tissue protection",
      "It passes through a tight muscular tunnel",
      "It has poor blood supply at this location",
      "It divides into multiple branches here",
    ],
    correctIndex: 0,
    explanation:
        "The common fibular nerve wraps around the fibular neck just beneath the skin with almost no cushioning from muscle or fat. This makes it the most commonly injured nerve in the lower extremity. Compression from leg crossing, casts, or prolonged bed rest can cause foot drop.",
  ),
  QuizQuestion(
    question:
        "A patient cannot extend the knee and has an absent patellar reflex. Sensation is reduced on the anterior thigh and medial leg. Which nerve is affected?",
    options: [
      "Obturator nerve",
      "Sciatic nerve",
      "Femoral nerve",
      "L3 nerve root",
    ],
    correctIndex: 2,
    explanation:
        "The femoral nerve (L2-L4) innervates the quadriceps (knee extension), and its terminal sensory branch (saphenous nerve) supplies the medial leg. The patellar reflex is mediated by the femoral nerve (L3-L4). Common causes include retroperitoneal hematoma and post-surgical injury.",
  ),
  QuizQuestion(
    question:
        "The obturator nerve exits the pelvis through which anatomical structure?",
    options: [
      "Greater sciatic foramen",
      "Obturator foramen/canal",
      "Inguinal canal",
      "Femoral triangle",
    ],
    correctIndex: 1,
    explanation:
        "The obturator nerve (L2-L4) exits through the obturator canal in the pelvis to reach the medial thigh. It innervates the adductor muscles. Obturator neuropathy can occur from pelvic fractures, hip surgery, or obturator hernia.",
  ),
  QuizQuestion(
    question:
        "The sural nerve is a purely sensory nerve formed by contributions from which two sources?",
    options: [
      "Tibial and femoral nerves",
      "Common fibular and tibial nerves",
      "Saphenous and tibial nerves",
      "Superficial and deep fibular nerves",
    ],
    correctIndex: 1,
    explanation:
        "The sural nerve is formed by the medial sural cutaneous nerve (from the tibial nerve) joining the sural communicating branch (from the common fibular nerve) in the mid-calf. It is the gold standard reference nerve for diagnosing polyneuropathy.",
  ),
  QuizQuestion(
    question:
        "How do you confidently differentiate a Lower Trunk (C8-T1) plexopathy from a Medial Cord plexopathy using needle EMG?",
    options: [
      "Test Abductor Pollicis Brevis (APB)",
      "Test Extensor Indicis (EI)",
      "Test First Dorsal Interosseous (FDI)",
      "Test Pronator Teres (PT)",
    ],
    correctIndex: 1,
    explanation:
        "Both Lower Trunk and Medial Cord lesions affect C8-T1 ulnar/median muscles (like APB and FDI). However, the Lower Trunk ALSO sends C8 fibers to the Radial Nerve via the Posterior Cord. Finding denervation in a C8 Radial muscle like Extensor Indicis proves the lesion is at the Lower Trunk, not the Medial Cord.",
  ),
];
