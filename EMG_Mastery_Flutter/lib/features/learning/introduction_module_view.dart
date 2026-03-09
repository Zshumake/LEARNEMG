import 'package:flutter/material.dart';
import '../../data/introduction_data.dart';
import '../../data/podcast_data.dart';
import '../podcast/widgets/podcast_trigger_card.dart';
import '../../data/models/introduction_content.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/content_card.dart';
import 'widgets/glossary_list.dart';

class IntroductionModuleView extends StatelessWidget {
  const IntroductionModuleView({super.key});

  @override
  Widget build(BuildContext context) {
    final content = IntroductionData.data;

    return DefaultTabController(
      length: 6,
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
              ],
            ),
          ),

          // Tab Content
          Expanded(
            child: TabBarView(
              children: [
                _buildPhilosophyTab(content),
                _buildBasicsTab(content),
                _buildInstrumentationTab(),
                _buildTechnicalTab(content),
                _buildLocalizationTab(content),
                _buildTerminologyTab(content),
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
          ...PodcastData.getEpisodesByModule(
            'emg-introduction',
          ).map((ep) => PodcastTriggerCard(episode: ep)),
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
                _InstrumentationSystemTab(),
                _InstrumentationSoftwareTab(),
                _InstrumentationStimTrollerTab(),
                _InstrumentationPreampTab(),
                _InstrumentationSettingsTab(),
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
