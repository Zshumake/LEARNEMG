import 'package:flutter/material.dart';
import '../../data/nm_basics_data.dart';
import '../../data/models/nm_basics_model.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../core/widgets/keep_alive_tab_wrapper.dart';

class NMBasicsView extends StatelessWidget {
  const NMBasicsView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 5,
      child: Column(
        children: [
          _buildHero(),
          Container(
            color: const Color(0xFFF8FAFC),
            child: const TabBar(
              isScrollable: true,
              tabAlignment: TabAlignment.start,
              labelColor: Color(0xFF7C3AED),
              unselectedLabelColor: Color(0xFF64748B),
              indicatorColor: Color(0xFF7C3AED),
              indicatorWeight: 3,
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: [
                Tab(
                  text: "MYOPATHY",
                  icon: Icon(Icons.fitness_center_rounded, size: 20),
                ),
                Tab(
                  text: "NEUROPATHY",
                  icon: Icon(Icons.bolt_rounded, size: 20),
                ),
                Tab(
                  text: "CLASSIFICATION",
                  icon: Icon(Icons.list_alt_rounded, size: 20),
                ),
                Tab(
                  text: "COMPARISON",
                  icon: Icon(Icons.compare_arrows_rounded, size: 20),
                ),
                Tab(text: "QUIZ", icon: Icon(Icons.quiz_outlined, size: 20)),
              ],
            ),
          ),
          Expanded(
            child: TabBarView(
              children: [
                KeepAliveTabWrapper(
                  child: _DeepDiveTab(
                    data: NMBasicsData.myopathy,
                    color: const Color(0xFF7C3AED),
                  ),
                ),
                KeepAliveTabWrapper(
                  child: _DeepDiveTab(
                    data: NMBasicsData.neuropathy,
                    color: const Color(0xFF0284C7),
                  ),
                ),
                const KeepAliveTabWrapper(child: _ClassificationTab()),
                const KeepAliveTabWrapper(child: _ComparisonTab()),
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
      padding: const EdgeInsets.all(25),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF4C1D95), Color(0xFF8B5CF6)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            NMBasicsData.title,
            style: TextStyle(
              color: Colors.white,
              fontSize: 28,
              fontWeight: FontWeight.w900,
              letterSpacing: -0.5,
            ),
          ),
          SizedBox(height: 8),
          Text(
            NMBasicsData.subtitle,
            style: TextStyle(
              color: Colors.white70,
              fontSize: 14,
              fontWeight: FontWeight.w500,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _DeepDiveTab extends StatelessWidget {
  final NMDeepDive data;
  final Color color;
  const _DeepDiveTab({required this.data, required this.color});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            data.title,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: color,
            ),
          ),
          const SizedBox(height: 15),
          Text(
            data.text,
            style: const TextStyle(
              fontSize: 16,
              color: Color(0xFF334155),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 30),
          _buildCausesSection(),
          const SizedBox(height: 30),
          _buildClinicalGrid(),
          const SizedBox(height: 30),
          _buildEMGFindings(),
          const SizedBox(height: 30),
          _buildNCSFindings(),
          const SizedBox(height: 30),
          _buildStrategySection(),
          const SizedBox(height: 30),
          _buildPearlSection(),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildCausesSection() {
    return Column(
      children: [
        _SectionHeader(
          title: "Common Causes",
          icon: Icons.history_edu_rounded,
          color: color,
        ),
        const SizedBox(height: 15),
        ...data.causes.map(
          (c) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: _ClinicalIconCard(
              title: c.title,
              detail: c.detail,
              color: color,
              isWide: true,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildClinicalGrid() {
    return Column(
      children: [
        _SectionHeader(
          title: "Clinical Symptoms",
          icon: Icons.personal_injury_outlined,
          color: color,
        ),
        const SizedBox(height: 15),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          mainAxisSpacing: 10,
          crossAxisSpacing: 10,
          childAspectRatio: 1.3,
          children: data.symptoms
              .map<Widget>(
                (s) => _ClinicalIconCard(
                  title: s.title,
                  detail: s.detail,
                  color: color,
                ),
              )
              .toList(),
        ),
      ],
    );
  }

  Widget _buildEMGFindings() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeader(
          title: data.emgTitle,
          icon: Icons.analytics_outlined,
          color: color,
        ),
        const SizedBox(height: 15),
        if (data.muap != null) ...[
          _EMGCard(
            title: data.muap!.title,
            traits: data.muap!.traits,
            color: color,
          ),
          const SizedBox(height: 12),
        ],
        if (data.recruitment != null) ...[
          _EMGCard(
            title: data.recruitment!.title,
            traits: data.recruitment!.traits,
            color: color,
          ),
          const SizedBox(height: 12),
        ],
        if (data.emgTraits != null)
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(15),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              children: data.emgTraits!.map((t) => _TraitRow(text: t)).toList(),
            ),
          ),
      ],
    );
  }

  Widget _buildNCSFindings() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeader(
          title: data.ncsTitle,
          icon: Icons.settings_input_component_rounded,
          color: color,
        ),
        const SizedBox(height: 15),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: color.withOpacity(0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: color.withOpacity(0.1)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "FOUNDATION: ${data.ncsFinding}",
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 14,
                  color: color,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                data.ncsDetail,
                style: const TextStyle(
                  fontSize: 14,
                  color: Color(0xFF334155),
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
        if (data.axonal != null) ...[
          const SizedBox(height: 12),
          _EMGCard(
            title: data.axonal!.title,
            traits: data.axonal!.traits,
            color: color,
          ),
        ],
        if (data.demyelinating != null) ...[
          const SizedBox(height: 12),
          _EMGCard(
            title: data.demyelinating!.title,
            traits: data.demyelinating!.traits,
            color: color,
          ),
        ],
      ],
    );
  }

  Widget _buildStrategySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeader(
          title: "Diagnostic Strategy",
          icon: Icons.center_focus_strong_rounded,
          color: Colors.teal,
        ),
        const SizedBox(height: 15),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.teal.withOpacity(0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.teal.withOpacity(0.1)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "HOW TO APPROACH THIS:",
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 12,
                  color: Colors.teal,
                  letterSpacing: 1,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                data.clinicalStrategy,
                style: const TextStyle(
                  fontSize: 14,
                  color: Color(0xFF334155),
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPearlSection() {
    return _RuleCard(
      title: data.pearlTitle.toUpperCase(),
      text: data.pearlText,
      color: const Color(0xFFD97706),
    );
  }
}

class _ComparisonTab extends StatelessWidget {
  const _ComparisonTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            NMBasicsData.comparisonIntro,
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: Color(0xFF1E293B),
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            NMBasicsData.comparisonText,
            style: TextStyle(fontSize: 15, color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 25),
          _RuleCard(
            title: "THE NEUROPATHY RULE",
            text: NMBasicsData.neuropathyRule,
            color: const Color(0xFF0284C7),
          ),
          const SizedBox(height: 15),
          _RuleCard(
            title: "THE MYOPATHY RULE",
            text: NMBasicsData.myopathyRule,
            color: const Color(0xFF7C3AED),
          ),
          const SizedBox(height: 30),
          _buildTable(),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildTable() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        children: NMBasicsData.comparisonRows.map((row) {
          if (row.category != null) {
            return Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
              color: const Color(0xFFF1F5F9),
              child: Text(
                row.category!,
                style: const TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 11,
                  letterSpacing: 1,
                  color: Color(0xFF475569),
                ),
              ),
            );
          }
          return Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  row.feature!,
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 14,
                    color: Color(0xFF0F172A),
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: _TableCell(
                        title: "Myopathy",
                        text: row.myopathy!.text,
                        sub: row.myopathy!.sub,
                        color: const Color(0xFF7C3AED),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _TableCell(
                        title: "Neuropathy",
                        text: row.neuropathy!.text,
                        sub: row.neuropathy!.sub,
                        color: const Color(0xFF0284C7),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _QuizTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<QuizQuestion> questions = NMBasicsData.quiz
        .map(
          (q) => QuizQuestion(
            question: q.question,
            options: q.options,
            correctIndex: q.correct,
            explanation: q.explanation,
          ),
        )
        .toList();

    return QuizSessionView(
      questions: questions,
      title: "Diagnostic Showdown",
      subtitle: "Prove you can tell the difference between nerve and muscle.",
    );
  }
}

// Support Widgets
// Support Widgets
class _ClassificationTab extends StatelessWidget {
  const _ClassificationTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _SectionHeader(
            title: "Injury Classification",
            icon: Icons.list_alt_rounded,
            color: const Color(0xFF6B21A8),
          ),
          const SizedBox(height: 15),
          const Text(
            "Understanding how nerves fail across different anatomical structures is critical for determining prognosis.",
            style: TextStyle(
              fontSize: 14,
              color: Color(0xFF64748B),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 25),
          _buildSeddonCards(),
          const SizedBox(height: 30),
          _buildSunderlandTable(),
          const SizedBox(height: 30),
          _buildPrognosticIndicators(),
          const SizedBox(height: 40),
          _SectionHeader(
            title: "Fiber Classification",
            icon: Icons.compress_rounded,
            color: const Color(0xFF0369A1),
          ),
          const SizedBox(height: 15),
          const Text(
            "Electrodiagnosis primarily tests large, myelinated fibers. Small fibers (pain/temp) are invisible to standard NCS.",
            style: TextStyle(
              fontSize: 14,
              color: Color(0xFF64748B),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 25),
          _buildFiberList(),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildSeddonCards() {
    return Column(
      children: [
        _ClassificationCard(
          grade: "Neurapraxia",
          desc:
              "Focal demyelination with intact axons. Recovery is fast and complete (weeks).",
          color: const Color(0xFF6B21A8),
          icon: Icons.bolt_rounded,
        ),
        const SizedBox(height: 12),
        _ClassificationCard(
          grade: "Axonotmesis",
          desc:
              "Axonal damage with intact connective tissue. Regeneration happens at 1mm/day.",
          color: const Color(0xFF9333EA),
          icon: Icons.content_cut_rounded,
        ),
        const SizedBox(height: 12),
        _ClassificationCard(
          grade: "Neurotmesis",
          desc:
              "Complete nerve transection. Requires surgery; prognosis is often poor.",
          color: const Color(0xFFA855F7),
          icon: Icons.dangerous_rounded,
        ),
      ],
    );
  }

  Widget _buildSunderlandTable() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          headingRowColor: MaterialStateProperty.all(const Color(0xFFF8FAFC)),
          columns: const [
            DataColumn(
              label: Text(
                "Grade",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
            DataColumn(
              label: Text(
                "Anatomy",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
            DataColumn(
              label: Text(
                "Prognosis",
                style: TextStyle(fontWeight: FontWeight.w900),
              ),
            ),
          ],
          rows: const [
            DataRow(
              cells: [
                DataCell(Text("1")),
                DataCell(Text("Myelin Only")),
                DataCell(Text("Excellent")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(Text("2")),
                DataCell(Text("Axon (Endoneurium Intact)")),
                DataCell(Text("Good")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(Text("3")),
                DataCell(Text("Endoneurium Broken")),
                DataCell(Text("Variable")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(Text("4")),
                DataCell(Text("Perineurium Broken")),
                DataCell(Text("Poor")),
              ],
            ),
            DataRow(
              cells: [
                DataCell(Text("5")),
                DataCell(Text("Complete Transection")),
                DataCell(Text("Requires Surgery")),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPrognosticIndicators() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeader(
          title: "Prognostic Indicators",
          icon: Icons.trending_up_rounded,
          color: const Color(0xFFD97706),
        ),
        const SizedBox(height: 15),
        const Text(
          "Key factors influencing nerve injury recovery:",
          style: TextStyle(fontSize: 14, color: Color(0xFF64748B), height: 1.5),
        ),
        const SizedBox(height: 15),
        _ClassificationCard(
          grade: "Distance to Target",
          desc:
              "Shorter distances to target muscle/sensory organ improve prognosis.",
          color: const Color(0xFFD97706),
          icon: Icons.location_on_rounded,
        ),
        const SizedBox(height: 12),
        _ClassificationCard(
          grade: "Age of Patient",
          desc: "Younger patients generally have better regenerative capacity.",
          color: const Color(0xFFF59E0B),
          icon: Icons.person_rounded,
        ),
        const SizedBox(height: 12),
        _ClassificationCard(
          grade: "Type of Injury",
          desc: "Neurapraxia has the best prognosis, Neurotmesis the worst.",
          color: const Color(0xFFFBBF24),
          icon: Icons.healing_rounded,
        ),
      ],
    );
  }

  Widget _buildFiberList() {
    return Column(
      children: [
        _FiberRow(
          type: "Type Ia (Alpha)",
          func: "Motor/Proprioception",
          speed: "70-120 m/s",
          color: const Color(0xFF166534),
        ),
        _FiberRow(
          type: "Alpha Motor",
          func: "Extrafusal Muscle",
          speed: "50-100 m/s",
          color: const Color(0xFF15803D),
        ),
        _FiberRow(
          type: "Type II (Beta)",
          func: "Touch / Pressure",
          speed: "30-70 m/s",
          color: const Color(0xFF16A34A),
        ),
        _FiberRow(
          type: "Type III (Delta)",
          func: "Pain / Temp (Small)",
          speed: "5-30 m/s",
          color: const Color(0xFF64748B),
        ),
        _FiberRow(
          type: "Type IV (C)",
          func: "Pain (Small/Unmyelinated)",
          speed: "0.5-2 m/s",
          color: const Color(0xFF94A3B8),
        ),
      ],
    );
  }
}

class _ClassificationCard extends StatelessWidget {
  final String grade, desc;
  final Color color;
  final IconData icon;
  const _ClassificationCard({
    required this.grade,
    required this.desc,
    required this.color,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 28),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  grade,
                  style: TextStyle(
                    fontWeight: FontWeight.w900,
                    color: color,
                    fontSize: 17,
                    letterSpacing: -0.3,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  desc,
                  style: const TextStyle(
                    fontSize: 14,
                    color: Color(0xFF475569),
                    height: 1.5,
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

class _FiberRow extends StatelessWidget {
  final String type, func, speed;
  final Color color;
  const _FiberRow({
    required this.type,
    required this.func,
    required this.speed,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  type,
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 14,
                  ),
                ),
                Text(
                  func,
                  style: const TextStyle(
                    fontSize: 12,
                    color: Color(0xFF64748B),
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              speed,
              style: TextStyle(
                color: color,
                fontWeight: FontWeight.w900,
                fontSize: 11,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;
  const _SectionHeader({
    required this.title,
    required this.icon,
    required this.color,
  });
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: color, size: 22),
        const SizedBox(width: 10),
        Text(
          title,
          style: TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 16,
            color: color,
          ),
        ),
      ],
    );
  }
}

class _ClinicalIconCard extends StatelessWidget {
  final String title, detail;
  final Color color;
  final bool isWide;
  const _ClinicalIconCard({
    required this.title,
    required this.detail,
    required this.color,
    this.isWide = false,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      width: isWide ? double.infinity : null,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.1)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 12,
              color: color,
            ),
          ),
          const SizedBox(height: 4),
          Expanded(
            child: Text(
              detail,
              style: const TextStyle(
                fontSize: 11,
                color: Color(0xFF475569),
                height: 1.3,
              ),
              overflow: TextOverflow.fade,
            ),
          ),
        ],
      ),
    );
  }
}

class _EMGCard extends StatelessWidget {
  final String title;
  final List<String> traits;
  final Color color;
  const _EMGCard({
    required this.title,
    required this.traits,
    required this.color,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: 14,
              color: Color(0xFF1E293B),
            ),
          ),
          const SizedBox(height: 12),
          ...traits.map((t) => _TraitRow(text: t)),
        ],
      ),
    );
  }
}

class _TraitRow extends StatelessWidget {
  final String text;
  const _TraitRow({required this.text});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 6),
            child: Icon(Icons.circle, size: 6, color: Color(0xFF94A3B8)),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                fontSize: 13,
                color: Color(0xFF475569),
                height: 1.4,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _RuleCard extends StatelessWidget {
  final String title, text;
  final Color color;
  const _RuleCard({
    required this.title,
    required this.text,
    required this.color,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(15),
        border: Border(left: BorderSide(color: color, width: 4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 12,
              color: color,
              letterSpacing: 1,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            text,
            style: const TextStyle(
              fontSize: 14,
              color: Color(0xFF334155),
              height: 1.5,
              fontStyle: FontStyle.italic,
            ),
          ),
        ],
      ),
    );
  }
}

class _TableCell extends StatelessWidget {
  final String title, text, sub;
  final Color color;
  const _TableCell({
    required this.title,
    required this.text,
    required this.sub,
    required this.color,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.03),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            text,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 13,
              color: color,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            sub,
            style: const TextStyle(
              fontSize: 11,
              color: Color(0xFF64748B),
              height: 1.3,
            ),
          ),
        ],
      ),
    );
  }
}
