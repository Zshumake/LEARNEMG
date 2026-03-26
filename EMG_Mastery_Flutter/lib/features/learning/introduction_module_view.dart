import 'package:flutter/material.dart';
import '../../data/introduction_data.dart';
import '../../data/podcast_data.dart';
import '../podcast/widgets/podcast_trigger_card.dart';
import '../../data/models/introduction_content.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/content_card.dart';
import 'widgets/glossary_list.dart';
import '../../core/widgets/keep_alive_tab_wrapper.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../core/widgets/diagram_card.dart';
import '../../core/widgets/comparison_card.dart';
import '../../data/board_comparisons.dart';

class IntroductionModuleView extends StatelessWidget {
  const IntroductionModuleView({super.key});

  @override
  Widget build(BuildContext context) {
    final content = IntroductionData.data;

    return DefaultTabController(
      length: 7,
      child: Column(
        children: [
          // Hero Header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(gradient: AppTheme.foundationGradient),
            child: SafeArea(
              bottom: false,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    content.header.title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    content.header.subtitle,
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.9),
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Scrollable TabBar (6 tabs)
          Container(
            color: Colors.white,
            child: const TabBar(
              isScrollable: true,
              tabAlignment: TabAlignment.start,
              labelColor: AppTheme.primary,
              unselectedLabelColor: AppTheme.textMuted,
              indicatorColor: AppTheme.primary,
              indicatorSize: TabBarIndicatorSize.tab,
              tabs: [
                Tab(text: 'Philosophy'),
                Tab(text: 'EDX Basics'),
                Tab(text: 'Instrumentation'),
                Tab(text: 'Technical'),
                Tab(text: 'Localization'),
                Tab(text: 'Terminology'),
                Tab(text: 'Quiz'),
              ],
            ),
          ),

          // Tab Content
          Expanded(
            child: TabBarView(
              children: [
                KeepAliveTabWrapper(child: _buildPhilosophyTab(content)),
                KeepAliveTabWrapper(child: _buildBasicsTab(content)),
                KeepAliveTabWrapper(child: _buildInstrumentationTab()),
                KeepAliveTabWrapper(child: _buildTechnicalTab(content)),
                KeepAliveTabWrapper(child: _buildLocalizationTab(content)),
                KeepAliveTabWrapper(child: _buildTerminologyTab(content)),
                KeepAliveTabWrapper(child: _buildQuizTab()),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ─── TAB 1: Clinical Philosophy ───────────────────────────────────

  Widget _buildPhilosophyTab(IntroductionContent content) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ContentCard(
            title: content.philosophy.core.title,
            accentColor: AppTheme.primary,
            content: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  content.philosophy.core.text,
                  style: const TextStyle(
                    fontSize: 16,
                    color: AppTheme.textMain,
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 20),
                _buildHighlightedBox(
                  title: 'The Golden Rule',
                  text: content.philosophy.core.aim,
                  color: AppTheme.warning,
                ),
                const SizedBox(height: 20),
                _buildHighlightedBox(
                  title: 'Resident Pearl',
                  text: content.philosophy.core.pearl,
                  color: AppTheme.info,
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          const Text(
            'The 4-Step Encounter',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          ...content.philosophy.encounter.map((step) => _buildStepCard(step)),
          const SizedBox(height: 32),
          const Text(
            'The 6 Cardinal Rules',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Fundamental laws of electrodiagnostic medicine.',
            style: TextStyle(fontSize: 15, color: AppTheme.textMuted),
          ),
          const SizedBox(height: 16),
          ...content.philosophy.cardinalRules.map(
            (rule) => _buildRuleCard(rule),
          ),
          const SizedBox(height: 32),
          const Text(
            'Check Your Understanding',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 12),
          const _InlineKnowledgeCheck(
            question:
                'A patient\'s hand temperature is 29°C. Their median motor distal latency is 5.1 ms (prolonged). What should you do FIRST?',
            options: [
              'Diagnose carpal tunnel syndrome',
              'Warm the hand and repeat the study',
              'Order an MRI of the wrist',
              'Refer for surgical consultation',
            ],
            correctIndex: 1,
            explanation:
                'Cold temperature slows sodium channels, artificially prolonging latencies and mimicking demyelination. You must warm the limb to at least 32°C (upper) or 31°C (lower) before trusting any conduction values.',
          ),
          const _InlineKnowledgeCheck(
            question:
                'The NCS shows complete absence of median CMAP, but the patient wiggles all fingers with full strength. What is the most likely explanation?',
            options: [
              'Complete median nerve transection',
              'Severe carpal tunnel syndrome',
              'Technical error (electrode misplacement or submaximal stimulation)',
              'Martin-Gruber anastomosis',
            ],
            correctIndex: 2,
            explanation:
                'When the clinical exam and electrical data don\'t match, the machine (or your setup) is wrong. Full strength with absent CMAP points to a technical problem -- re-check electrode placement and ensure supramaximal stimulation.',
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  // ─── TAB 2: EDX Basics ────────────────────────────────────────────

  Widget _buildBasicsTab(IntroductionContent content) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Anatomy',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          const DiagramCard(
            imagePath: 'assets/images/pathology/peripheral_anatomy.png',
            caption: 'Peripheral Nerve Architecture',
            labels: [
              DiagramLabel(text: 'Axon', color: Color(0xFF2563EB)),
              DiagramLabel(text: 'Myelin', color: Color(0xFF7C3AED)),
              DiagramLabel(text: 'Endoneurium', color: Color(0xFF059669)),
              DiagramLabel(text: 'Perineurium', color: Color(0xFFF59E0B)),
              DiagramLabel(text: 'Epineurium', color: Color(0xFFDC2626)),
            ],
          ),
          ...content.basics.anatomy.map(
            (a) => _buildDetailCard(a, Colors.teal),
          ),
          const SizedBox(height: 24),
          const Text(
            'Physiology',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          ...content.basics.physiology.map(
            (p) => _buildDetailCard(p, Colors.blueGrey),
          ),
          const SizedBox(height: 24),
          const Text(
            'Sunderland Classification',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Nerve injury severity determines prognosis and recovery.',
            style: TextStyle(fontSize: 15, color: AppTheme.textMuted),
          ),
          const SizedBox(height: 16),
          if (content.sunderlandClassification != null)
            ...content.sunderlandClassification!.map(
              (grade) => _buildSunderlandCard(grade),
            ),
          const SizedBox(height: 16),
          ComparisonCard(
            title: BoardComparisons.seddonVsSunderland.title,
            columns: BoardComparisons.seddonVsSunderland.columns,
            rows: BoardComparisons.seddonVsSunderland.rows,
            footnote: BoardComparisons.seddonVsSunderland.footnote,
          ),
          const SizedBox(height: 24),
          const Text(
            'Temporal Evolution of Nerve Injury',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Understanding the timeline is critical for proper EDX timing.',
            style: TextStyle(fontSize: 15, color: AppTheme.textMuted),
          ),
          const SizedBox(height: 16),
          if (content.temporalEvolution != null)
            ...content.temporalEvolution!.map(
              (tp) => _buildTemporalCard(tp),
            ),
          const SizedBox(height: 32),
          const Text(
            'Check Your Understanding',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 12),
          const _InlineKnowledgeCheck(
            question:
                'A patient suffers a complete median nerve laceration at the wrist. NCS performed 24 hours later shows a NORMAL median CMAP distally. Why?',
            options: [
              'The nerve was not actually cut',
              'Wallerian degeneration takes 3-5 days for motor axons; the distal segment is still alive',
              'The recording electrode was on the wrong muscle',
              'Sensory fibers always degenerate before motor fibers',
            ],
            correctIndex: 1,
            explanation:
                'After nerve transection, the distal motor axons remain electrically excitable for 3-5 days before Wallerian degeneration destroys them. This is why EMG performed too early can be falsely reassuring.',
          ),
          const _InlineKnowledgeCheck(
            question:
                'In a Sunderland Grade III injury (axonotmesis with endoneurial disruption), what is the expected recovery pattern?',
            options: [
              'Complete recovery in days (like neurapraxia)',
              'Partial recovery is possible, but misdirected regrowth may occur since endoneurial tubes are disrupted',
              'No recovery is ever possible',
              'Recovery occurs only with surgical intervention within 24 hours',
            ],
            correctIndex: 1,
            explanation:
                'In Grade III, the axon AND endoneurial tube are damaged. Axons can still regrow, but without intact tubes to guide them, fibers may reach wrong targets (synkinesis). Recovery is partial and unpredictable.',
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  // ─── TAB 3: Instrumentation ───────────────────────────────────────

  Widget _buildInstrumentationTab() {
    return DefaultTabController(
      length: 5,
      child: Column(
        children: [
          Container(
            color: const Color(0xFFF8FAFC),
            child: const TabBar(
              isScrollable: true,
              tabAlignment: TabAlignment.start,
              indicatorColor: Color(0xFF0EA5E9),
              labelColor: Color(0xFF0EA5E9),
              unselectedLabelColor: Color(0xFF64748B),
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
              tabs: [
                Tab(text: 'SYSTEM'),
                Tab(text: 'SOFTWARE'),
                Tab(text: 'STIMTROLLER'),
                Tab(text: 'PREAMP'),
                Tab(text: 'SETTINGS'),
              ],
            ),
          ),
          const Expanded(
            child: TabBarView(
              children: [
                KeepAliveTabWrapper(child: _InstrumentationSystemTab()),
                KeepAliveTabWrapper(child: _InstrumentationSoftwareTab()),
                KeepAliveTabWrapper(child: _InstrumentationStimTrollerTab()),
                KeepAliveTabWrapper(child: _InstrumentationPreampTab()),
                KeepAliveTabWrapper(child: _InstrumentationSettingsTab()),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ─── TAB 4: Technical Excellence ──────────────────────────────────

  Widget _buildTechnicalTab(IntroductionContent content) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Technical Excellence',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Physiologic Factors',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppTheme.primary,
            ),
          ),
          const SizedBox(height: 12),
          ...content.technical.physiologic.map((f) => _buildFactorCard(f)),
          const SizedBox(height: 24),
          const Text(
            'Non-Physiologic Factors',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppTheme.primary,
            ),
          ),
          const SizedBox(height: 12),
          ...content.technical.nonPhysiologic.map((f) => _buildFactorCard(f)),
          const SizedBox(height: 32),
          const Text(
            'Patient Safety',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          _buildSafetyCard(
            'Pacemakers',
            content.technical.safety.pacemakers,
            Icons.favorite_outline,
          ),
          _buildSafetyCard(
            'Anticoagulation',
            content.technical.safety.anticoagulation,
            Icons.bloodtype_outlined,
          ),
          _buildSafetyCard(
            'Infection Control',
            content.technical.safety.infection,
            Icons.clean_hands_outlined,
          ),
          const SizedBox(height: 32),
          const Text(
            'Check Your Understanding',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 12),
          const _InlineKnowledgeCheck(
            question:
                'A 6\'4" basketball player has a sural SNAP amplitude of 4 uV (lab normal >6 uV). No symptoms. What is the best interpretation?',
            options: [
              'Early peripheral neuropathy',
              'Normal variant due to height -- taller patients have lower distal amplitudes',
              'Technical error requiring repeat study',
              'Diabetic neuropathy until proven otherwise',
            ],
            correctIndex: 1,
            explanation:
                'Height is a major physiologic variable. Taller individuals have longer nerve fibers with thinner distal segments, producing lower amplitudes in the feet. Height-adjusted normative data should be used before diagnosing neuropathy.',
          ),
          const _InlineKnowledgeCheck(
            question:
                'Your NCS recording shows a thick, fuzzy, oscillating baseline that obscures the waveform. What is the most likely cause and fix?',
            options: [
              'Stimulus artifact -- dry the skin between stimulator and recording electrodes',
              '60 Hz interference -- scrub the skin to lower impedance and reposition the ground electrode',
              'Low battery in the stimulator -- replace batteries',
              'Demyelinating disease causing abnormal waveforms',
            ],
            correctIndex: 1,
            explanation:
                '60 Hz noise from building wiring appears as a rhythmic fuzzy baseline. The fix is to lower skin impedance by scrubbing with abrasive paste and ensuring the ground electrode is placed firmly between the stimulator and recording leads.',
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  // ─── TAB 5: Localization Patterns ─────────────────────────────────

  Widget _buildLocalizationTab(IntroductionContent content) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Pathophysiology Patterns',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          ...content.localization.pathophysiology.map(
            (p) => ContentCard(
              title: p.type,
              accentColor: AppTheme.primary,
              content: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildLabelText('Findings:', p.findings),
                  const SizedBox(height: 12),
                  _buildLabelText('Prognosis:', p.prognosis),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          ComparisonCard(
            title: BoardComparisons.axonalVsDemyelinating.title,
            columns: BoardComparisons.axonalVsDemyelinating.columns,
            rows: BoardComparisons.axonalVsDemyelinating.rows,
            footnote: BoardComparisons.axonalVsDemyelinating.footnote,
          ),
          const SizedBox(height: 16),
          ComparisonCard(
            title: BoardComparisons.umnVsLmn.title,
            columns: BoardComparisons.umnVsLmn.columns,
            rows: BoardComparisons.umnVsLmn.rows,
            footnote: BoardComparisons.umnVsLmn.footnote,
          ),
          const SizedBox(height: 32),
          const Text(
            'Common Localization Patterns',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          ...content.localization.patterns.map(
            (p) => Card(
              margin: const EdgeInsets.only(bottom: 16),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      p.site,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primary,
                      ),
                    ),
                    const Divider(),
                    _buildLabelText('SNAP:', p.snap),
                    const SizedBox(height: 8),
                    _buildLabelText('CMAP:', p.cmap),
                  ],
                ),
              ),
            ),
          ),
          if (content.martinGruber != null) ...[
            const SizedBox(height: 32),
            _buildMartinGruberCard(content.martinGruber!),
          ],
          if (content.expandedPatterns != null) ...[
            const SizedBox(height: 32),
            const Text(
              'Expanded EDX Patterns',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: AppTheme.textHeading,
              ),
            ),
            const SizedBox(height: 16),
            ...content.expandedPatterns!.map(
              (p) => _buildExpandedPatternCard(p),
            ),
          ],
          if (content.localizationScenarios != null) ...[
            const SizedBox(height: 32),
            const Text(
              'Clinical Localization Scenarios',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: AppTheme.textHeading,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Test your localization reasoning with these cases.',
              style: TextStyle(fontSize: 15, color: AppTheme.textMuted),
            ),
            const SizedBox(height: 16),
            ...content.localizationScenarios!.map(
              (s) => _buildScenarioCard(s),
            ),
          ],
          const SizedBox(height: 32),
          const Text(
            'Check Your Understanding',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 12),
          const _InlineKnowledgeCheck(
            question:
                'NCS shows: reduced median SNAP, reduced median CMAP, normal ulnar SNAP, normal ulnar CMAP. Needle EMG shows fibrillations in APB only. Where is the lesion?',
            options: [
              'C8-T1 radiculopathy',
              'Median neuropathy at the wrist (carpal tunnel syndrome)',
              'Lower trunk brachial plexopathy',
              'Anterior horn cell disease',
            ],
            correctIndex: 1,
            explanation:
                'Both SNAP and CMAP are reduced in the median distribution only, with normal ulnar studies. The abnormal SNAP localizes the lesion distal to the DRG (postganglionic). Fibrillations limited to APB confirm median nerve territory. This is classic severe CTS.',
          ),
          const _InlineKnowledgeCheck(
            question:
                'A patient has weakness of the deltoid and biceps with absent biceps reflex. NCS shows normal median and ulnar SNAPs. Needle EMG shows fibrillations in deltoid, biceps, and infraspinatus. Where is the lesion?',
            options: [
              'Axillary neuropathy',
              'Musculocutaneous neuropathy',
              'Upper trunk brachial plexopathy or C5-C6 radiculopathy',
              'Lateral cord plexopathy',
            ],
            correctIndex: 2,
            explanation:
                'Denervation spanning multiple nerve territories (axillary -> deltoid, musculocutaneous -> biceps, suprascapular -> infraspinatus) with preserved SNAPs points to either upper trunk plexopathy or C5-C6 radiculopathy. Preserved SNAPs favor radiculopathy (preganglionic).',
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  // ─── TAB 6: Mastery Glossary ──────────────────────────────────────

  Widget _buildTerminologyTab(IntroductionContent content) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Mastery Glossary',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 16),
          PodcastTriggerCard(
            episode: PodcastData.getEpisodesByModule(
              'emg-introduction',
            ).firstWhere((ep) => ep.id == 'emg-terminology'),
          ),
          const SizedBox(height: 16),
          GlossaryList(terms: content.terminology.glossary),
          const SizedBox(height: 32),
          const Text(
            'Mastery Concepts',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.primary,
            ),
          ),
          const SizedBox(height: 16),
          ...content.terminology.masteryTerms.map(
            (m) => Container(
              margin: const EdgeInsets.only(bottom: 16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.primary.withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: AppTheme.primary.withValues(alpha: 0.2),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    m.term,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.primary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    m.definition,
                    style: const TextStyle(
                      fontSize: 15,
                      color: AppTheme.textMain,
                      height: 1.4,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  // ─── SHARED WIDGETS ───────────────────────────────────────────────

  Widget _buildRuleCard(CardinalRule rule) {
    final color = Color(int.parse(rule.color.replaceFirst('#', '0xFF')));

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withValues(alpha: 0.2), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: color,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(14),
                topRight: Radius.circular(14),
              ),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 12,
                  backgroundColor: Colors.white.withValues(alpha: 0.2),
                  child: Text(
                    rule.id.toString(),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    rule.title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              rule.text,
              style: const TextStyle(
                fontSize: 15,
                color: AppTheme.textMain,
                height: 1.4,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailCard(AnatomyPhysiologyDetail detail, Color color) {
    return ContentCard(
      title: detail.title,
      accentColor: color,
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            detail.detail,
            style: const TextStyle(
              fontSize: 15,
              color: AppTheme.textMain,
              height: 1.4,
            ),
          ),
          if (detail.pearl != null) ...[
            const SizedBox(height: 12),
            _buildHighlightedBox(
              title: 'Pearl',
              text: detail.pearl!,
              color: AppTheme.info,
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildFactorCard(FactorDetail factor) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              factor.factor,
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 4),
            Text(
              factor.effect,
              style: const TextStyle(color: AppTheme.textMain),
            ),
            if (factor.solution != null) ...[
              const SizedBox(height: 8),
              Text(
                'Fix: ${factor.solution}',
                style: const TextStyle(
                  color: AppTheme.success,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildSafetyCard(String title, String text, IconData icon) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.danger.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.danger.withValues(alpha: 0.1)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppTheme.danger),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                    color: AppTheme.danger,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  text,
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppTheme.textMain,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepCard(PhilosophyStep step) {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border.withValues(alpha: 0.5)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: const BoxDecoration(
              color: AppTheme.primary,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                step.step.toString(),
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  step.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textHeading,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  step.detail,
                  style: const TextStyle(
                    fontSize: 15,
                    color: AppTheme.textMain,
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

  Widget _buildHighlightedBox({
    required String title,
    required String text,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title.toUpperCase(),
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: color,
              letterSpacing: 1.1,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            text,
            style: TextStyle(
              fontSize: 15,
              color: color.withValues(alpha: 0.9),
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLabelText(String label, String text) {
    return RichText(
      text: TextSpan(
        style: const TextStyle(color: AppTheme.textMain, fontSize: 14),
        children: [
          TextSpan(
            text: '$label ',
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: AppTheme.textHeading,
            ),
          ),
          TextSpan(text: text),
        ],
      ),
    );
  }

  // ─── TAB 7: Quiz ────────────────────────────────────────────────

  Widget _buildQuizTab() {
    const questions = <QuizQuestion>[
      // Philosophy (3)
      QuizQuestion(
        question: "A resident begins an EDX study by following a pre-set template without examining the patient first. What is the primary risk?",
        options: ["The study will take too long", "Missing the actual pathology by testing irrelevant nerves", "The patient will be in more pain", "The insurance will not cover the study"],
        correctIndex: 1,
        explanation: "The Golden Rule of EDX is to LOCALIZE. Without a focused clinical question from the history and exam, you may test nerves that have nothing to do with the patient's problem, missing the real diagnosis entirely.",
      ),
      QuizQuestion(
        question: "A patient's median motor distal latency is 4.3 ms (upper limit of normal: 4.2 ms) but they have zero hand symptoms. What is the most appropriate interpretation?",
        options: ["Diagnose mild carpal tunnel syndrome", "Recommend surgery based on the numbers", "Consider this a normal variant and do NOT diagnose CTS", "Repeat the study in 6 months"],
        correctIndex: 2,
        explanation: "Specificity is King. A borderline finding that does not correlate with the patient's symptoms is most likely a normal variant. Labeling a healthy person with CTS based on a 0.1 ms difference could lead to unnecessary surgery.",
      ),
      QuizQuestion(
        question: "Before turning on the EMG machine, what three steps should the physician always complete?",
        options: ["Calibrate the machine, test the stimulator, check the filters", "Review the MRI, order labs, consult neurology", "Take a clinical history, perform a physical exam, formulate a differential diagnosis", "Warm the limb, check impedance, set the gain"],
        correctIndex: 2,
        explanation: "The Patient Encounter workflow is: (1) Clinical History, (2) Physical Exam, and (3) Differential Diagnosis. The machine comes AFTER you know what questions to ask the nervous system.",
      ),
      // Basics (3)
      QuizQuestion(
        question: "A patient has a confirmed C7 radiculopathy on MRI. The median SNAP recorded from the index finger is completely normal. Why?",
        options: ["The MRI is wrong", "The SNAP test was performed incorrectly", "The dorsal root ganglion (DRG) is proximal to the lesion, so peripheral sensory axons survive", "Sensory nerves are not affected by radiculopathy"],
        correctIndex: 2,
        explanation: "The DRG sits outside the spinal canal. In radiculopathy, the compression is proximal (behind) the DRG. Since the sensory cell body in the DRG is still connected to its peripheral axon, the SNAP remains normal.",
      ),
      QuizQuestion(
        question: "In Amyotrophic Lateral Sclerosis (ALS), which component of the motor unit is primarily affected?",
        options: ["The myelin sheath (insulation)", "The neuromuscular junction (handshake)", "The anterior horn cell (motor neuron cell body)", "The muscle fiber itself"],
        correctIndex: 2,
        explanation: "ALS is a motor neuron disease -- it destroys the cell body in the anterior horn of the spinal cord. This leads to widespread denervation with fasciculations and fibrillations on EMG with normal sensory studies.",
      ),
      QuizQuestion(
        question: "A nerve injury causes the myelin to be stripped but the axon remains intact. What is the expected recovery timeline?",
        options: ["No recovery is possible", "Weeks (remyelination)", "6-12 months (axon regrowth)", "Years (surgical repair required)"],
        correctIndex: 1,
        explanation: "Demyelination recovers in weeks because the body can re-wrap myelin relatively quickly. The axon itself is intact, so no regrowth is needed.",
      ),
      // Technical (3)
      QuizQuestion(
        question: "You record a median motor distal latency of 5.2 ms. The patient's hand skin temperature is 28 degrees C. What should you do?",
        options: ["Report the finding as carpal tunnel syndrome", "Add a correction factor of 0.2 ms per degree", "Warm the hand to at least 32 degrees C and repeat the study", "The temperature does not affect distal latency"],
        correctIndex: 2,
        explanation: "Cold temperature slows sodium channel kinetics, artificially prolonging latencies. The hand must be warmed to at least 32 degrees C before results can be trusted.",
      ),
      QuizQuestion(
        question: "You see a thick, rhythmic 'fuzzy' baseline obscuring all your waveforms. What is the most likely cause?",
        options: ["The nerve is severely damaged", "60 Hz electrical interference from building wiring", "The stimulator is malfunctioning", "The patient is moving too much"],
        correctIndex: 1,
        explanation: "60 Hz interference is the most common artifact in the EMG lab. Fix it by scrubbing the skin to reduce impedance and ensuring good ground electrode contact.",
      ),
      QuizQuestion(
        question: "A patient with an ICD needs an EMG study. What is the primary safety concern?",
        options: ["Nerve conduction shocks will trigger the ICD", "The EMG machine will interfere with the pacemaker function", "Needle EMG electrical activity near the device may be sensed as a cardiac arrhythmia by the ICD", "EMG is absolutely contraindicated in all patients with cardiac devices"],
        correctIndex: 2,
        explanation: "The primary concern with ICDs is that electrical activity from needle EMG near the generator may be misinterpreted by the device as ventricular fibrillation, potentially triggering an inappropriate shock.",
      ),
      // Localization (3)
      QuizQuestion(
        question: "A patient presents with hand weakness. The ulnar SNAP is absent. Where can the lesion NOT be located?",
        options: ["Ulnar nerve at the elbow", "Lower trunk of the brachial plexus", "C8 nerve root (radiculopathy)", "Guyon's canal at the wrist"],
        correctIndex: 2,
        explanation: "In radiculopathy, the lesion is proximal to the DRG (preganglionic). The sensory cell bodies remain connected to their peripheral axons, so the SNAP is PRESERVED. An absent SNAP means the lesion is postganglionic.",
      ),
      QuizQuestion(
        question: "On repetitive nerve stimulation at 3 Hz, the CMAP amplitude drops by 20% by the 4th stimulus. What does this suggest?",
        options: ["Carpal tunnel syndrome", "ALS (motor neuron disease)", "Neuromuscular junction disorder (e.g., myasthenia gravis)", "Demyelinating polyneuropathy"],
        correctIndex: 2,
        explanation: "A decremental response (>10% amplitude drop) on low-frequency repetitive nerve stimulation is the hallmark of a postsynaptic NMJ disorder such as myasthenia gravis.",
      ),
      QuizQuestion(
        question: "EMG shows widespread fibrillations and fasciculations across 3 body regions. All SNAPs are normal. What is the most likely category?",
        options: ["Inflammatory myopathy", "Sensorimotor polyneuropathy", "Motor neuron disease (e.g., ALS)", "Chronic inflammatory demyelinating polyneuropathy"],
        correctIndex: 2,
        explanation: "Widespread denervation across multiple body regions with completely normal sensory studies and fasciculations is the classic electrodiagnostic pattern for motor neuron disease.",
      ),
      // Glossary (3)
      QuizQuestion(
        question: "What does a 'positive sharp wave' on needle EMG indicate?",
        options: ["Normal muscle activity during contraction", "A healthy motor unit firing voluntarily", "Active denervation -- a muscle fiber spontaneously firing after losing its nerve supply", "An artifact from the needle touching bone"],
        correctIndex: 2,
        explanation: "Positive sharp waves are the electrical signatures of denervation. When a muscle fiber loses its nerve connection, it becomes electrically unstable and fires spontaneously.",
      ),
      QuizQuestion(
        question: "Why is supramaximal stimulation necessary for valid nerve conduction studies?",
        options: ["It makes the study faster", "It ensures ALL nerve fibers are activated, giving a true measurement of the nerve's health", "It reduces artifact", "It is only needed for sensory studies"],
        correctIndex: 1,
        explanation: "If you stimulate submaximally, you only activate a portion of the fibers, making the CMAP amplitude artificially low. This could lead to a false diagnosis of axonal loss.",
      ),
      QuizQuestion(
        question: "A motor unit potential has 6 phases and increased duration. What process does this most likely represent?",
        options: ["Acute denervation", "Myopathic changes", "Chronic reinnervation via collateral sprouting", "Normal variation in young adults"],
        correctIndex: 2,
        explanation: "Polyphasic, long-duration, high-amplitude MUAPs are the hallmark of chronic neurogenic reinnervation. Surviving neurons send collateral sprouts to adopt orphaned muscle fibers.",
      ),
    ];

    return QuizSessionView(questions: questions);
  }

  // ─── NEW HELPER WIDGETS ─────────────────────────────────────────

  Widget _buildSunderlandCard(SunderlandGrade grade) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              grade.grade,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppTheme.primary,
              ),
            ),
            const Divider(),
            _buildLabelText('Injury:', grade.injury),
            const SizedBox(height: 8),
            _buildLabelText('Pathology:', grade.pathology),
            const SizedBox(height: 8),
            _buildLabelText('Recovery:', grade.recovery),
            const SizedBox(height: 8),
            _buildLabelText('EDX Findings:', grade.edxFindings),
          ],
        ),
      ),
    );
  }

  Widget _buildTemporalCard(TemporalTimepoint tp) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border.withValues(alpha: 0.5)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: AppTheme.primary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              tp.timepoint,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 12,
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tp.finding,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    color: AppTheme.textHeading,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  tp.explanation,
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppTheme.textMain,
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

  Widget _buildMartinGruberCard(MartinGruberContent mga) {
    return ContentCard(
      title: mga.title,
      accentColor: AppTheme.warning,
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildLabelText('Prevalence:', mga.prevalence),
          const SizedBox(height: 12),
          Text(
            mga.description,
            style: const TextStyle(
              fontSize: 15,
              color: AppTheme.textMain,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Clinical Impact:',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 15,
              color: AppTheme.textHeading,
            ),
          ),
          const SizedBox(height: 8),
          ...mga.clinicalImpact.map(
            (impact) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('-- ', style: TextStyle(color: AppTheme.textMuted)),
                  Expanded(
                    child: Text(
                      impact,
                      style: const TextStyle(
                        fontSize: 14,
                        color: AppTheme.textMain,
                        height: 1.4,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Source: ${mga.source}',
            style: const TextStyle(
              fontSize: 12,
              color: AppTheme.textMuted,
              fontStyle: FontStyle.italic,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExpandedPatternCard(ExpandedPattern pattern) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              pattern.site,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppTheme.primary,
              ),
            ),
            const Divider(),
            _buildLabelText('SNAP:', pattern.snap),
            const SizedBox(height: 8),
            _buildLabelText('CMAP:', pattern.cmap),
            const SizedBox(height: 8),
            _buildLabelText('EMG:', pattern.emg),
            const SizedBox(height: 12),
            _buildHighlightedBox(
              title: 'Key Feature',
              text: pattern.keyFeature,
              color: AppTheme.info,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildScenarioCard(LocalizationScenario scenario) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              scenario.stem,
              style: const TextStyle(
                fontSize: 15,
                color: AppTheme.textMain,
                height: 1.4,
                fontStyle: FontStyle.italic,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              scenario.question,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppTheme.textHeading,
              ),
            ),
            const SizedBox(height: 8),
            ...scenario.options.asMap().entries.map(
              (entry) => Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: Text(
                  '${String.fromCharCode(65 + entry.key)}. ${entry.value}',
                  style: TextStyle(
                    fontSize: 14,
                    color: entry.key == scenario.correct
                        ? AppTheme.success
                        : AppTheme.textMain,
                    fontWeight: entry.key == scenario.correct
                        ? FontWeight.bold
                        : FontWeight.normal,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            _buildHighlightedBox(
              title: 'Explanation',
              text: scenario.explanation,
              color: AppTheme.success,
            ),
          ],
        ),
      ),
    );
  }
}

// ─── Inline Knowledge Check Widget ─────────────────────────────────

class _InlineKnowledgeCheck extends StatefulWidget {
  final String question;
  final List<String> options;
  final int correctIndex;
  final String explanation;

  const _InlineKnowledgeCheck({
    required this.question,
    required this.options,
    required this.correctIndex,
    required this.explanation,
  });

  @override
  State<_InlineKnowledgeCheck> createState() => _InlineKnowledgeCheckState();
}

class _InlineKnowledgeCheckState extends State<_InlineKnowledgeCheck> {
  int? _selected;

  bool get _answered => _selected != null;
  bool get _correct => _selected == widget.correctIndex;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _answered
              ? (_correct ? AppTheme.success : AppTheme.danger)
              : const Color(0xFFF59E0B).withValues(alpha: 0.3),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: const Color(0xFFF59E0B).withValues(alpha: 0.15),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(10),
                topRight: Radius.circular(10),
              ),
            ),
            child: const Text(
              'KNOWLEDGE CHECK',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: Color(0xFFB45309),
                letterSpacing: 1.2,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.question,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textHeading,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 12),
                ...widget.options.asMap().entries.map((entry) {
                  final i = entry.key;
                  final text = entry.value;
                  final isCorrect = i == widget.correctIndex;
                  final isSelected = i == _selected;

                  Color bg = Colors.white;
                  Color border = AppTheme.border;
                  Color textColor = AppTheme.textMain;

                  if (_answered) {
                    if (isCorrect) {
                      bg = AppTheme.success.withValues(alpha: 0.1);
                      border = AppTheme.success;
                      textColor = const Color(0xFF166534);
                    } else if (isSelected) {
                      bg = AppTheme.danger.withValues(alpha: 0.1);
                      border = AppTheme.danger;
                      textColor = const Color(0xFF991B1B);
                    }
                  }

                  return GestureDetector(
                    onTap: _answered
                        ? null
                        : () => setState(() => _selected = i),
                    child: Container(
                      width: double.infinity,
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: bg,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: border),
                      ),
                      child: Row(
                        children: [
                          Text(
                            '${String.fromCharCode(65 + i)}.',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: textColor,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              text,
                              style: TextStyle(
                                fontSize: 14,
                                color: textColor,
                                height: 1.3,
                              ),
                            ),
                          ),
                          if (_answered && isCorrect)
                            const Icon(
                              Icons.check_circle,
                              color: AppTheme.success,
                              size: 20,
                            ),
                          if (_answered && isSelected && !isCorrect)
                            const Icon(
                              Icons.cancel,
                              color: AppTheme.danger,
                              size: 20,
                            ),
                        ],
                      ),
                    ),
                  );
                }),
                if (_answered) ...[
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: (_correct ? AppTheme.success : AppTheme.danger)
                          .withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      widget.explanation,
                      style: TextStyle(
                        fontSize: 13,
                        color: _correct
                            ? const Color(0xFF166534)
                            : const Color(0xFF991B1B),
                        height: 1.4,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ── INSTRUMENTATION SUB-TABS ───────────────────────────────────

class _InstrumentationSystemTab extends StatelessWidget {
  const _InstrumentationSystemTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "⚡ Cadwell Sierra Summit",
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 10),
          const Text(
            "Instrumentation mastery is the first step toward diagnostic precision. This guide highlights the subtle hardware nuances and mental workflows you'll use every single day in the lab.",
            style: TextStyle(color: Color(0xFF475569), height: 1.5),
          ),
          const SizedBox(height: 30),
          _buildHardwareCard(
            title: "The Base Unit",
            subtitle: "THE CONTROL HUB",
            color: const Color(0xFF0EA5E9),
            imagePath: 'assets/images/hardware/sierra-summit.webp',
            description:
                "The Sierra Summit Base Unit is a high-precision A/D converter. It takes analog signals from the patient and digitizes them at incredible sampling rates to minimize interference.",
            points: [
              "Main Console: Handles high-speed data transfer.",
              "Isolation Transformer: Protects the patient from surges.",
              "Speaker System: High-fidelity audio for needle EMG.",
            ],
          ),
          const SizedBox(height: 30),
          const Text(
            "Physical Ergonomics",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 15),
          const Text(
            "A professional resident organizes their lab like a cockpit, with three primary interactive zones:",
            style: TextStyle(color: Color(0xFF475569), fontSize: 14),
          ),
          const SizedBox(height: 20),
          _buildWorkflowItem(
            "1",
            "Zone A: The StimTroller Plus",
            "Keep this in your dominant hand. It handles 90% of your data entry (distances, nerve selection) and all stimulation.",
            const Color(0xFF8B5CF6),
          ),
          _buildWorkflowItem(
            "2",
            "Zone B: The Preamp (Headbox)",
            "Position it as close to the patient's limb as possible to keep wires short and reduce noise.",
            const Color(0xFF8B5CF6),
          ),
          _buildWorkflowItem(
            "3",
            "Zone C: The Footpedal",
            "Your 'Hands-Free' mode for needle EMG, allowing 'Run/Stop' and 'Store' functions while your hands are busy.",
            const Color(0xFF8B5CF6),
          ),
        ],
      ),
    );
  }

  Widget _buildWorkflowItem(
    String num,
    String title,
    String desc,
    Color color,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(8),
              boxShadow: [
                BoxShadow(
                  color: color.withValues(alpha: 0.3),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            alignment: Alignment.center,
            child: Text(
              num,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
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
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    color: Color(0xFF1E293B),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  desc,
                  style: const TextStyle(
                    fontSize: 13,
                    color: Color(0xFF64748B),
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

class _InstrumentationSoftwareTab extends StatelessWidget {
  const _InstrumentationSoftwareTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "NCS Software Interface",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 15),
          const Text(
            "Never trust the table if the waveform looks messy! Follow the Data Audit path: Nerve Tree → Waveform → Results Table.",
            style: TextStyle(color: Color(0xFF475569), height: 1.5),
          ),
          const SizedBox(height: 25),
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.asset(
              'assets/images/hardware/analysis-software.webp',
              fit: BoxFit.contain,
            ),
          ),
          const SizedBox(height: 30),
          _buildSoftwareBox(
            "🌊 Waveform Window",
            "Ensure markers are correct. Takeoff at first departure; Peak at absolute summit.",
            const Color(0xFF0EA5E9),
            const Color(0xFFF0F9FF),
          ),
          _buildSoftwareBox(
            "📊 Results Table",
            "Logic engine. Highlights values in Red/Blue if outside age-matched normative range.",
            const Color(0xFF10B981),
            const Color(0xFFF0FDF4),
          ),
          _buildSoftwareBox(
            "📁 Study Window",
            "The checklist. Manages the Protocol Tree and real-time site status.",
            const Color(0xFF8B5CF6),
            const Color(0xFFF5F3FF),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFFFFBEB),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFFDE68A)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.lightbulb_outline, color: Color(0xFF92400E)),
                    SizedBox(width: 8),
                    Text(
                      "Resident Pro-Tip: Keyboard Shortcuts",
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF92400E),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 10),
                Text(
                  "Efficiency is king. Colored buttons at the bottom mirror F1-F7 keys. F2 is 'Store', F3 is 'Next Site', and F10 is 'Finish Study'.",
                  style: TextStyle(color: Color(0xFF78350F), fontSize: 13),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSoftwareBox(String title, String desc, Color color, Color bg) {
    return Container(
      margin: const EdgeInsets.only(bottom: 15),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(16),
        border: Border(top: BorderSide(color: color, width: 4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 16,
              color: color,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            desc,
            style: const TextStyle(fontSize: 14, color: Color(0xFF334155)),
          ),
        ],
      ),
    );
  }
}

class _InstrumentationStimTrollerTab extends StatelessWidget {
  const _InstrumentationStimTrollerTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "🕹️ StimTroller Plus™ Mastery",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 20),
          Center(
            child: Container(
              height: 200,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Image.asset(
                'assets/images/hardware/stimtroller.jpg',
                fit: BoxFit.contain,
              ),
            ),
          ),
          const SizedBox(height: 30),
          _buildStimCard(
            "Intensity / Distance Wheel",
            "Rotate to adjust current (mA). Click to toggle Distance Mode for measurements.",
            const Color(0xFF0EA5E9),
          ),
          _buildStimCard(
            "THE STORE BUTTON (RED)",
            "Thumb-triggered. Freezes the live waveform and adds it to the report. Use instantly if data is clean.",
            const Color(0xFFEF4444),
          ),
          _buildStimCard(
            "Reverse Polarity (+/-)",
            "Swaps Cathode and Anode internally. Essential for cramped spaces like the ulnar at the elbow.",
            const Color(0xFFF59E0B),
          ),
          _buildStimCard(
            "Single / Seq Stim",
            "Single Press for one pulse. Double/Long Press for repetitive stimulation (useful for Myasthenia testing).",
            const Color(0xFF10B981),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF2F2),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFFECACA)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.warning_amber_rounded, color: Color(0xFF991B1B)),
                    SizedBox(width: 8),
                    Text(
                      "The 'Beginner's Dial' Trap",
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF991B1B),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 10),
                Text(
                  "Never deliver a high-intensity shock unexpectedly! Always verify baseline is at 0mA before starting. Build trust by cranking up from zero.",
                  style: TextStyle(color: Color(0xFF7F1D1D), fontSize: 13),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStimCard(String title, String desc, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border(left: BorderSide(color: color, width: 4)),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 5),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(fontWeight: FontWeight.w900, color: color),
          ),
          const SizedBox(height: 6),
          Text(
            desc,
            style: const TextStyle(fontSize: 14, color: Color(0xFF475569)),
          ),
        ],
      ),
    );
  }
}

class _InstrumentationPreampTab extends StatelessWidget {
  const _InstrumentationPreampTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "🔌 Preamplifier Headbox",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 20),
          Center(
            child: Image.asset(
              'assets/images/hardware/headbox.png',
              height: 200,
              fit: BoxFit.contain,
            ),
          ),
          const SizedBox(height: 30),
          const Text(
            "The Differential Trinity",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 15),
          _buildPortItem(
            "G1 (Active)",
            "Black Lead",
            "Place over motor point.",
            Colors.black,
          ),
          _buildPortItem(
            "G2 (Reference)",
            "Red Lead",
            "Place on inactive spot (tendon/bone).",
            Colors.red,
          ),
          _buildPortItem(
            "Ground",
            "Green Lead",
            "Place between stimulator and recording leads.",
            Colors.green,
          ),
          const SizedBox(height: 30),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFECFDF5),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF10B981)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "The 'Z' (Impedance) Cheat-Code",
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF064E3B),
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  "Press the 'Z' button. Green (<5kΩ) is high-quality; Red is poor. Scrub skin with alcohol if Red!",
                  style: TextStyle(color: Color(0xFF065F46), fontSize: 14),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPortItem(String label, String colorName, String desc, Color c) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(color: c, shape: BoxShape.circle),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: RichText(
              text: TextSpan(
                style: const TextStyle(
                  color: Color(0xFF334155),
                  fontSize: 14,
                  fontFamily: 'Inter',
                ),
                children: [
                  TextSpan(
                    text: "$label: ",
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  TextSpan(text: desc),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _InstrumentationSettingsTab extends StatelessWidget {
  const _InstrumentationSettingsTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "🎛️ Settings Mastery",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 20),
          _buildSettingCard(
            "Gain (Sensitivity)",
            "The Vertical Zoom. Adjust so wave fills ~1/3 screen.",
            "Sensory: 10-20 µV | Motor: 2-5 mV",
            const Color(0xFF0EA5E9),
          ),
          _buildSettingCard(
            "Sweep Speed",
            "The Horizontal Zoom. Time/space on screen.",
            "NCS: 2-5 ms | F-Waves: 10 ms",
            const Color(0xFF10B981),
          ),
          _buildSettingCard(
            "Filter Settings",
            "The Electronic Sieve. LFF (Low) and HFF (High).",
            "NCS: 20Hz - 3kHz | EMG: 10Hz - 10kHz",
            const Color(0xFF8B5CF6),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFCBD5E1)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "The 'Filter Distortion' Warning",
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF1E293B),
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  "Using a narrow Sensory filter (2kHz) for Motor waves will 'round' peaks, making waves look diseased. Always verify protocol before you hit Run!",
                  style: TextStyle(color: Color(0xFF475569), fontSize: 13),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingCard(
    String title,
    String desc,
    String standard,
    Color c,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 15),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 16,
              color: c,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            desc,
            style: const TextStyle(fontSize: 13, color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 10),
          Text(
            standard,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 13,
              color: c,
            ),
          ),
        ],
      ),
    );
  }
}

Widget _buildHardwareCard({
  required String title,
  required String subtitle,
  required Color color,
  required String imagePath,
  required String description,
  required List<String> points,
}) {
  return Container(
    padding: const EdgeInsets.all(25),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(20),
      border: Border.all(color: const Color(0xFFE2E8F0)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          subtitle,
          style: TextStyle(
            color: color,
            fontWeight: FontWeight.w800,
            fontSize: 10,
            letterSpacing: 1.5,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          title,
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 20),
        Center(child: Image.asset(imagePath, height: 180, fit: BoxFit.contain)),
        const SizedBox(height: 25),
        Text(
          description,
          style: const TextStyle(color: Color(0xFF475569), height: 1.5),
        ),
        const SizedBox(height: 20),
        ...points.map(
          (p) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                Icon(Icons.check_circle_outline, color: color, size: 16),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    p,
                    style: const TextStyle(
                      fontSize: 13,
                      color: Color(0xFF475569),
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
