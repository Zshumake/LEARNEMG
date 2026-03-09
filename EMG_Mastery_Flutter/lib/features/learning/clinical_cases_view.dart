import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'clinical_case_controller.dart';
import '../../data/models/clinical_case_model.dart';
import '../../data/clinical_case_data.dart';
import 'widgets/clinical_tables.dart';

class ClinicalCasesView extends StatefulWidget {
  const ClinicalCasesView({super.key});

  @override
  State<ClinicalCasesView> createState() => _ClinicalCasesViewState();
}

class _ClinicalCasesViewState extends State<ClinicalCasesView> {
  String _selectedDifficulty = 'all';

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => ClinicalCaseController(),
      child: Consumer<ClinicalCaseController>(
        builder: (context, controller, _) {
          if (controller.currentCase == null) {
            return _buildDashboard(controller);
          } else {
            return _buildCaseInterface(controller);
          }
        },
      ),
    );
  }

  Widget _buildDashboard(ClinicalCaseController controller) {
    final filteredCases = ClinicalCaseData.cases.entries.where((e) {
      if (_selectedDifficulty == 'all') return true;
      return e.value.difficulty == _selectedDifficulty;
    }).toList();

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      body: Container(
        decoration: BoxDecoration(
          gradient: RadialGradient(
            center: Alignment.topLeft,
            radius: 1.5,
            colors: [const Color(0xFF1E293B), const Color(0xFF0F172A)],
          ),
        ),
        child: CustomScrollView(
          slivers: [
            SliverAppBar(
              expandedHeight: 200,
              floating: false,
              pinned: true,
              backgroundColor: Colors.transparent,
              elevation: 0,
              flexibleSpace: FlexibleSpaceBar(
                title: const Text(
                  "Clinical Correlation Lab",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    fontSize: 18,
                  ),
                ),
                background: Stack(
                  fit: StackFit.expand,
                  children: [
                    Positioned(
                      top: -50,
                      left: -50,
                      child: Container(
                        width: 300,
                        height: 300,
                        decoration: BoxDecoration(
                          color: Colors.cyan.withValues(alpha: 0.1),
                          shape: BoxShape.circle,
                        ),
                      ),
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const SizedBox(height: 40),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 40),
                          child: Text(
                            "Master the diagnostic pathway through real-world patient scenarios",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.blueGrey[300],
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    _buildDifficultyGrid(),
                    const SizedBox(height: 32),
                    _buildCaseList(controller, filteredCases),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDifficultyGrid() {
    return Row(
      children: [
        Expanded(
          child: _DifficultyCard(
            title: "Beginner",
            subtitle: "FOUNDATIONAL",
            icon: Icons.school,
            color: const Color(0xFF10B981),
            isActive: _selectedDifficulty == 'beginner',
            onTap: () => setState(() => _selectedDifficulty = 'beginner'),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _DifficultyCard(
            title: "Intermediate",
            subtitle: "REASONING",
            icon: Icons.psychology,
            color: const Color(0xFFF59E0B),
            isActive: _selectedDifficulty == 'intermediate',
            onTap: () => setState(() => _selectedDifficulty = 'intermediate'),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _DifficultyCard(
            title: "Expert",
            subtitle: "COMPLEX",
            icon: Icons.diamond,
            color: const Color(0xFFEF4444),
            isActive: _selectedDifficulty == 'expert',
            onTap: () => setState(() => _selectedDifficulty = 'expert'),
          ),
        ),
      ],
    );
  }

  Widget _buildCaseList(
    ClinicalCaseController controller,
    List<MapEntry<String, ClinicalCase>> cases,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              "Patient Case Load",
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            if (_selectedDifficulty != 'all')
              TextButton(
                onPressed: () => setState(() => _selectedDifficulty = 'all'),
                child: const Text(
                  "Show All",
                  style: TextStyle(color: Colors.cyan),
                ),
              ),
          ],
        ),
        const SizedBox(height: 16),
        if (cases.isEmpty)
          const Center(
            child: Padding(
              padding: EdgeInsets.all(40),
              child: Text(
                "No cases found.",
                style: TextStyle(color: Colors.white38),
              ),
            ),
          ),
        ...cases.map(
          (entry) => _CaseSelectionCard(
            caseTitle: entry.value.title,
            difficulty: entry.value.difficulty,
            onTap: () => controller.loadCase(entry.key),
          ),
        ),
      ],
    );
  }

  Widget _buildCaseInterface(ClinicalCaseController controller) {
    final curCase = controller.currentCase!;
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E293B).withValues(alpha: 0.5),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close, color: Colors.redAccent),
          onPressed: () => controller.loadCase(''),
        ),
        centerTitle: true,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: const [
            Icon(Icons.medical_services, color: Colors.cyan, size: 20),
            SizedBox(width: 8),
            Text(
              "Case Investigation",
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(4),
          child: LinearProgressIndicator(
            value: _calculateProgress(controller.currentSection),
            backgroundColor: Colors.white10,
            valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF06B6D4)),
          ),
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
          ),
        ),
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _buildStep(
              controller: controller,
              section: CaseSection.presentation,
              title: "Patient Presentation",
              icon: Icons.person,
              child: _PresentationStep(caseData: curCase.presentation),
            ),
            _buildStep(
              controller: controller,
              section: CaseSection.physicalExam,
              title: "Physical Examination",
              icon: Icons.front_hand,
              child: _PhysicalExamStep(exam: curCase.physicalExam),
            ),
            _buildStep(
              controller: controller,
              section: CaseSection.differential,
              title: "Clinical Reasoning",
              icon: Icons.psychology,
              child: _DifferentialStep(controller: controller),
            ),
            _buildStep(
              controller: controller,
              section: CaseSection.emgDecision,
              title: "Diagnostic Strategy",
              icon: Icons.bolt,
              child: _EmgDecisionStep(controller: controller),
            ),
            if (curCase.requiresEMG &&
                controller.currentSection.index >= CaseSection.results.index &&
                (controller.isEmgDecisionCorrect == true ||
                    controller.currentSection.index >
                        CaseSection.results.index))
              _buildStep(
                controller: controller,
                section: CaseSection.results,
                title: "Electrodiagnostic Findings",
                icon: Icons.bar_chart,
                child: Column(
                  children: [
                    ClinicalNCSTable(ncs: curCase.ncsStudies!),
                    const SizedBox(height: 16),
                    if (curCase.emgStudies != null &&
                        curCase.emgStudies!.isNotEmpty)
                      ClinicalEMGTable(findings: curCase.emgStudies!),
                    const SizedBox(height: 24),
                    _ActionButton(
                      label: "Conclusion →",
                      onPressed: () => controller.nextSection(),
                      backgroundColor: Colors.green.withValues(alpha: 0.2),
                      foregroundColor: Colors.greenAccent,
                      borderColor: Colors.green,
                    ),
                  ],
                ),
              ),
            _buildStep(
              controller: controller,
              section: CaseSection.finalDiagnosis,
              title: "Definitive Diagnosis",
              icon: Icons.star,
              child: _FinalDiagnosisStep(controller: controller),
              alwaysExpanded: true,
            ),
          ],
        ),
      ),
    );
  }

  double _calculateProgress(CaseSection section) {
    return (section.index + 1) / CaseSection.values.length;
  }

  Widget _buildStep({
    required ClinicalCaseController controller,
    required CaseSection section,
    required String title,
    required IconData icon,
    required Widget child,
    bool alwaysExpanded = false,
  }) {
    bool isComplete = controller.isSectionComplete(section);
    bool isHidden = controller.currentSection.index < section.index;

    if (isHidden) return const SizedBox.shrink();

    return Column(
      children: [
        if (isComplete && !alwaysExpanded)
          _ShrunkPill(title: title, icon: icon, onTap: () {})
        else
          _ActiveStep(title: title, icon: icon, child: child),
        const SizedBox(height: 12),
      ],
    );
  }
}

class _DifficultyCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  final bool isActive;
  final VoidCallback onTap;

  const _DifficultyCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 8),
        decoration: BoxDecoration(
          color: isActive
              ? Colors.white.withValues(alpha: 0.02)
              : Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isActive ? color : color.withValues(alpha: 0.2),
            width: 1.5,
          ),
          boxShadow: isActive
              ? [
                  BoxShadow(
                    color: color.withValues(alpha: 0.3),
                    blurRadius: 15,
                    offset: const Offset(0, 8),
                  ),
                ]
              : [],
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: isActive ? Colors.white : Colors.transparent,
                shape: BoxShape.circle,
                border: isActive
                    ? null
                    : Border.all(color: color.withValues(alpha: 0.3)),
              ),
              child: Icon(icon, color: isActive ? color : color, size: 24),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: isActive ? color : Colors.transparent,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                title,
                style: TextStyle(
                  color: isActive ? Colors.white : Colors.white70,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
            ),
            const SizedBox(height: 6),
            Text(
              subtitle,
              style: TextStyle(
                color: isActive ? color : Colors.white38,
                fontSize: 9,
                letterSpacing: 1,
                fontWeight: FontWeight.w800,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CaseSelectionCard extends StatelessWidget {
  final String caseTitle;
  final String difficulty;
  final VoidCallback onTap;

  const _CaseSelectionCard({
    required this.caseTitle,
    required this.difficulty,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = difficulty == 'beginner'
        ? const Color(0xFF10B981)
        : (difficulty == 'intermediate'
              ? const Color(0xFFF59E0B)
              : const Color(0xFFEF4444));

    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    caseTitle,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 15,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: color,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        difficulty.toUpperCase(),
                        style: TextStyle(
                          color: color,
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: Colors.white24, size: 20),
          ],
        ),
      ),
    );
  }
}

class _ShrunkPill extends StatelessWidget {
  final String title;
  final IconData icon;
  final VoidCallback onTap;

  const _ShrunkPill({
    required this.title,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.04),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white10),
      ),
      child: Row(
        children: [
          Icon(icon, size: 16, color: const Color(0xFF06B6D4)),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              title,
              style: const TextStyle(
                color: Colors.white60,
                fontSize: 13,
                fontWeight: FontWeight.w500,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const Spacer(),
          const Icon(Icons.check_circle, size: 16, color: Color(0xFF10B981)),
        ],
      ),
    );
  }
}

class _ActiveStep extends StatelessWidget {
  final String title;
  final IconData icon;
  final Widget child;

  const _ActiveStep({
    required this.title,
    required this.icon,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFF06B6D4).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(icon, color: const Color(0xFF06B6D4), size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
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

class _PresentationStep extends StatelessWidget {
  final CasePresentation caseData;
  const _PresentationStep({required this.caseData});

  @override
  Widget build(BuildContext context) {
    final String patientInfo =
        "Age: ${caseData.age} • ${caseData.gender}${caseData.occupation != null && caseData.occupation != "null" ? " • ${caseData.occupation}" : ""}";
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildInfoChip(patientInfo),
        const SizedBox(height: 20),
        _buildSection(
          "Chief Complaint",
          caseData.chiefComplaint,
          isPrimary: true,
        ),
        _buildSection("History of Present Illness", caseData.history),
        _buildSection(
          "Medical History",
          caseData.pmh,
          extra: "Meds: ${caseData.medications}",
        ),
        const SizedBox(height: 24),
        Center(
          child: _ActionButton(
            label: "Physical Exam →",
            onPressed: () =>
                context.read<ClinicalCaseController>().nextSection(),
            backgroundColor: const Color(0xFF06B6D4).withValues(alpha: 0.15),
            foregroundColor: const Color(0xFF22D3EE),
            borderColor: const Color(0xFF06B6D4).withValues(alpha: 0.5),
          ),
        ),
      ],
    );
  }

  Widget _buildInfoChip(String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white10),
      ),
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.white70,
          fontSize: 11,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Widget _buildSection(
    String title,
    String content, {
    bool isPrimary = false,
    String? extra,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title.toUpperCase(),
            style: const TextStyle(
              color: Colors.white30,
              fontSize: 10,
              letterSpacing: 1,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            content,
            style: TextStyle(
              color: Colors.white,
              fontSize: isPrimary ? 16 : 14,
              fontWeight: isPrimary ? FontWeight.w800 : FontWeight.normal,
              height: 1.5,
            ),
          ),
          if (extra != null) ...[
            const SizedBox(height: 6),
            Text(
              extra,
              style: const TextStyle(
                color: Colors.white24,
                fontSize: 12,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _PhysicalExamStep extends StatelessWidget {
  final PhysicalExam exam;
  const _PhysicalExamStep({required this.exam});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildExamGrid(),
        const SizedBox(height: 24),
        _ExamCard(
          title: "Provocative & Special Tests",
          content: exam.specialTests,
          icon: Icons.biotech,
          isWide: true,
        ),
        const SizedBox(height: 24),
        Center(
          child: _ActionButton(
            label: "Differential →",
            onPressed: () =>
                context.read<ClinicalCaseController>().nextSection(),
            backgroundColor: const Color(0xFF8B5CF6).withValues(alpha: 0.15),
            foregroundColor: const Color(0xFFC4B5FD),
            borderColor: const Color(0xFF8B5CF6),
          ),
        ),
      ],
    );
  }

  Widget _buildExamGrid() {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      mainAxisSpacing: 10,
      crossAxisSpacing: 10,
      childAspectRatio: 1.3,
      children: [
        _ExamCard(
          title: "Inspection",
          content: exam.inspection,
          icon: Icons.visibility,
        ),
        _ExamCard(
          title: "Palpation",
          content: exam.palpation,
          icon: Icons.touch_app,
        ),
        _ExamCard(title: "ROM", content: exam.rom, icon: Icons.unfold_more),
        _ExamCard(
          title: "Strength",
          content: exam.strength,
          icon: Icons.fitness_center,
        ),
        _ExamCard(
          title: "Sensation",
          content: exam.sensation,
          icon: Icons.track_changes,
        ),
        _ExamCard(title: "Reflexes", content: exam.reflexes, icon: Icons.build),
      ],
    );
  }
}

class _ExamCard extends StatelessWidget {
  final String title;
  final String content;
  final IconData icon;
  final bool isWide;

  const _ExamCard({
    required this.title,
    required this.content,
    required this.icon,
    this.isWide = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.04),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 14, color: const Color(0xFF22D3EE)),
              const SizedBox(width: 8),
              Text(
                title.toUpperCase(),
                style: const TextStyle(
                  color: Color(0xFF22D3EE),
                  fontSize: 9,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            content,
            style: const TextStyle(
              color: Colors.white70,
              fontSize: 12,
              height: 1.4,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}

class _DifferentialStep extends StatefulWidget {
  final ClinicalCaseController controller;
  const _DifferentialStep({required this.controller});

  @override
  State<_DifferentialStep> createState() => _DifferentialStepState();
}

class _DifferentialStepState extends State<_DifferentialStep> {
  final TextEditingController _textController = TextEditingController();
  bool _submitted = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Based on the history and exam, what are your primary considerations?",
          style: TextStyle(color: Colors.white70, fontSize: 13),
        ),
        const SizedBox(height: 20),
        TextField(
          controller: _textController,
          maxLines: 4,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            hintText: "List your differential diagnosis here...",
            hintStyle: const TextStyle(color: Colors.white24, fontSize: 14),
            filled: true,
            fillColor: Colors.black26,
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.white10),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Color(0xFF8B5CF6)),
            ),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () => setState(() => _submitted = true),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF8B5CF6).withValues(alpha: 0.2),
              foregroundColor: const Color(0xFFC4B5FD),
            ),
            child: const Text("Analyze Differential"),
          ),
        ),
        if (_submitted) ...[
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.cyan.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.cyan.withValues(alpha: 0.2)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: const [
                    Icon(Icons.analytics, color: Colors.cyan, size: 18),
                    SizedBox(width: 8),
                    Text(
                      "Clinical Analysis Result",
                      style: TextStyle(
                        color: Colors.cyan,
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                const Text(
                  "Diagnostic capture is being recorded. Continue your investigation and EDX studies to reveal the definitive differential exclusion logic.",
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 12,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Center(
            child: _ActionButton(
              label: "Strategy →",
              onPressed: () => widget.controller.nextSection(),
              backgroundColor: const Color(0xFF3B82F6),
              foregroundColor: Colors.white,
            ),
          ),
        ],
      ],
    );
  }
}

class _EmgDecisionStep extends StatelessWidget {
  final ClinicalCaseController controller;
  const _EmgDecisionStep({required this.controller});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Is an Electrodiagnostic (EMG/NCS) evaluation indicated for this presentation?",
          style: TextStyle(color: Colors.white70, fontSize: 13),
        ),
        const SizedBox(height: 24),
        Row(
          children: [
            Expanded(
              child: _DecisionCard(
                title: "Indicated",
                icon: Icons.check_circle,
                color: const Color(0xFF10B981),
                onTap: () => controller.evaluateEmgDecision(true),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: _DecisionCard(
                title: "Not Indicated",
                icon: Icons.cancel,
                color: const Color(0xFFEF4444),
                onTap: () => controller.evaluateEmgDecision(false),
              ),
            ),
          ],
        ),
        if (controller.emgDecisionFeedback != null) ...[
          const SizedBox(height: 24),
          Container(
            decoration: BoxDecoration(
              color: (controller.isEmgDecisionCorrect ?? false)
                  ? Colors.green.withValues(alpha: 0.1)
                  : Colors.red.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: (controller.isEmgDecisionCorrect ?? false)
                    ? Colors.green.withValues(alpha: 0.3)
                    : Colors.red.withValues(alpha: 0.3),
              ),
            ),
            child: IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    width: 4,
                    decoration: BoxDecoration(
                      color: (controller.isEmgDecisionCorrect ?? false)
                          ? Colors.green
                          : Colors.red,
                      borderRadius: const BorderRadius.horizontal(
                        left: Radius.circular(12),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.all(18),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            controller.isEmgDecisionCorrect == true
                                ? "Strategy Confirmed"
                                : "Clinical Correction",
                            style: TextStyle(
                              color: controller.isEmgDecisionCorrect == true
                                  ? Colors.greenAccent
                                  : Colors.redAccent,
                              fontWeight: FontWeight.w800,
                              fontSize: 14,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            controller.emgDecisionFeedback!,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13,
                              height: 1.4,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          Center(
            child: _ActionButton(
              label: "Investigation →",
              onPressed: () => controller.nextSection(),
              backgroundColor: const Color(0xFF06B6D4),
              foregroundColor: Colors.white,
            ),
          ),
        ],
      ],
    );
  }
}

class _DecisionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const _DecisionCard({
    required this.title,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 24),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withValues(alpha: 0.3)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 40),
            const SizedBox(height: 12),
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w800,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _FinalDiagnosisStep extends StatefulWidget {
  final ClinicalCaseController controller;

  const _FinalDiagnosisStep({required this.controller});

  @override
  State<_FinalDiagnosisStep> createState() => _FinalDiagnosisStepState();
}

class _FinalDiagnosisStepState extends State<_FinalDiagnosisStep> {
  final TextEditingController _inputController = TextEditingController();
  bool _submitted = false;

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final curCase = widget.controller.currentCase;
    if (curCase == null) return const SizedBox.shrink();

    // Ensure state persists if the controller is already in complete state
    if (widget.controller.currentSection == CaseSection.complete) {
      _submitted = true;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(0xFF10B981).withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.star, color: Color(0xFF34D399), size: 20),
            ),
            const SizedBox(width: 12),
            const Text(
              "Definitive Diagnosis",
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        const Text(
          "Synthesize all clinical and EDX data to provide the specific diagnosis.",
          style: TextStyle(color: Colors.white70, fontSize: 13),
        ),
        const SizedBox(height: 24),
        if (!_submitted) _buildInputForm() else _buildFinalReview(curCase),
      ],
    );
  }

  Widget _buildInputForm() {
    return Column(
      children: [
        TextField(
          controller: _inputController,
          style: const TextStyle(color: Colors.white, fontSize: 14),
          decoration: InputDecoration(
            hintText: "Type specific diagnosis (e.g. Severe CTS)...",
            hintStyle: const TextStyle(color: Colors.white24, fontSize: 13),
            filled: true,
            fillColor: Colors.black26,
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Colors.white10),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Colors.white30),
            ),
          ),
        ),
        const SizedBox(height: 24),
        Center(
          child: ElevatedButton(
            onPressed: () {
              widget.controller.evaluateFinalDiagnosis(_inputController.text);
              setState(() => _submitted = true);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF10B981),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 14),
            ),
            child: const Text(
              "Submit Investigation",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFinalReview(ClinicalCase curCase) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: const Color(0xFF10B981).withValues(alpha: 0.3),
            ),
          ),
          child: Column(
            children: [
              const Icon(
                Icons.emoji_events,
                color: Color(0xFF10B981),
                size: 48,
              ),
              const SizedBox(height: 16),
              const Text(
                "Confirmed Diagnosis",
                style: TextStyle(
                  color: Colors.white38,
                  fontSize: 11,
                  letterSpacing: 1.5,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                curCase.correctDiagnosis,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w900,
                  height: 1.1,
                ),
              ),
              const SizedBox(height: 24),
              const Divider(color: Colors.white10),
              const SizedBox(height: 16),
              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  "Diagnostic Synthesis",
                  style: TextStyle(
                    color: Color(0xFF10B981),
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              const SizedBox(height: 10),
              Text(
                curCase.explanation,
                style: const TextStyle(
                  color: Colors.white70,
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        _buildEvidenceReview(curCase),
        const SizedBox(height: 24),
        _buildDifferentialTable(curCase),
        const SizedBox(height: 24),
        if (curCase.teachingPoints != null)
          for (var point in curCase.teachingPoints!)
            Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.amber.withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(12),
                border: Border(
                  left: const BorderSide(color: Colors.amber, width: 4),
                  top: BorderSide(color: Colors.amber.withValues(alpha: 0.2)),
                  right: BorderSide(color: Colors.amber.withValues(alpha: 0.2)),
                  bottom: BorderSide(
                    color: Colors.amber.withValues(alpha: 0.2),
                  ),
                ),
              ),
              child: Text(
                point,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  height: 1.5,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: () => widget.controller.loadCase(''),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.white10,
            foregroundColor: Colors.white70,
          ),
          child: const Text("Return to Dashboard"),
        ),
      ],
    );
  }

  Widget _buildEvidenceReview(ClinicalCase curCase) {
    final evidence = curCase.generateEvidenceReview();
    if (evidence.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "KEY EVIDENCE REVIEW",
          style: TextStyle(
            color: Colors.white38,
            fontSize: 10,
            letterSpacing: 1.2,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 12),
        ...evidence.map(
          (point) => Container(
            margin: const EdgeInsets.only(bottom: 8),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.03),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: Colors.white.withValues(alpha: 0.05)),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(point.icon, color: const Color(0xFF22D3EE), size: 18),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    point.text,
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 12,
                      height: 1.4,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDifferentialTable(ClinicalCase curCase) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "DIFFERENTIAL EXCLUSION LOGIC",
          style: TextStyle(
            color: Colors.white38,
            fontSize: 10,
            letterSpacing: 1.2,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.03),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
          ),
          child: Column(
            children: [
              ...curCase.differentialDiagnosis.map((item) {
                final isCorrect = item.name == curCase.correctDiagnosis;
                return Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                        color: Colors.white.withValues(alpha: 0.05),
                      ),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          if (isCorrect) ...[
                            const Icon(
                              Icons.check_circle,
                              color: Color(0xFF10B981),
                              size: 16,
                            ),
                            const SizedBox(width: 8),
                          ],
                          Text(
                            item.name,
                            style: TextStyle(
                              color: isCorrect
                                  ? const Color(0xFF10B981)
                                  : Colors.white,
                              fontWeight: isCorrect
                                  ? FontWeight.w700
                                  : FontWeight.w600,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        item.ruleOut,
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.6),
                          fontSize: 12,
                          height: 1.4,
                        ),
                      ),
                    ],
                  ),
                );
              }),
            ],
          ),
        ),
      ],
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final Color? borderColor;

  const _ActionButton({
    required this.label,
    required this.onPressed,
    this.backgroundColor,
    this.foregroundColor,
    this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor ?? const Color(0xFF3B82F6),
        foregroundColor: foregroundColor ?? Colors.white,
        side: borderColor != null
            ? BorderSide(color: borderColor!, width: 1.2)
            : null,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
      child: Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
    );
  }
}
