import 'package:flutter/material.dart';
import '../../data/models/report_writing_model.dart';
import '../../data/report_writing_data.dart';
import '../../core/widgets/keep_alive_tab_wrapper.dart';

class ReportWritingView extends StatefulWidget {
  const ReportWritingView({super.key});

  @override
  State<ReportWritingView> createState() => _ReportWritingViewState();
}

class _ReportWritingViewState extends State<ReportWritingView> {
  int _currentStepIdx = 0;

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          Container(
            color: Colors.white,
            child: const TabBar(
              tabs: [
                Tab(text: "Interactive Tutorial"),
                Tab(text: "Ideal Reports"),
              ],
              labelColor: Color(0xFF3B82F6),
              unselectedLabelColor: Color(0xFF64748B),
              indicatorColor: Color(0xFF3B82F6),
              indicatorWeight: 3,
              labelStyle: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: TabBarView(
              children: [
                KeepAliveTabWrapper(child: _buildTutorialSection()),
                KeepAliveTabWrapper(child: _buildScenariosSection()),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTutorialSection() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          _buildHeroHeader(),
          const SizedBox(height: 20),
          const SizedBox(height: 30),
          _buildProgressBar(),
          const SizedBox(height: 40),
          _buildStepContent(),
          const SizedBox(height: 40),
          _buildNavigationButtons(),
          const SizedBox(height: 50),
        ],
      ),
    );
  }

  Widget _buildHeroHeader() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFF1F5F9)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        children: [
          const Text(
            ReportWritingData.title,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Color(0xFF0F172A),
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 15),
          Text(
            ReportWritingData.description,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Color(0xFF475569),
              fontSize: 15,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProgressBar() {
    return Row(
      children: List.generate(ReportWritingData.steps.length, (index) {
        final step = ReportWritingData.steps[index];
        final isActive = index == _currentStepIdx;
        final isCompleted = index < _currentStepIdx;
        final color = Color(int.parse(step.color));

        return Expanded(
          child: GestureDetector(
            onTap: () => setState(() => _currentStepIdx = index),
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 4),
              padding: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: isActive
                    ? color
                    : (isCompleted
                          ? color.withValues(alpha: 0.1)
                          : Colors.white),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isActive
                      ? color
                      : (isCompleted
                            ? color.withValues(alpha: 0.3)
                            : const Color(0xFFE2E8F0)),
                  width: 2,
                ),
              ),
              child: Column(
                children: [
                  if (isCompleted)
                    const Icon(
                      Icons.check_circle,
                      color: Colors.green,
                      size: 20,
                    )
                  else
                    Text(
                      "Step ${index + 1}",
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: isActive
                            ? Colors.white
                            : const Color(0xFF94A3B8),
                      ),
                    ),
                  const SizedBox(height: 4),
                  Text(
                    step.title.split(' ').first,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                      color: isActive ? Colors.white : const Color(0xFF64748B),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      }),
    );
  }

  Widget _buildStepContent() {
    final step = ReportWritingData.steps[_currentStepIdx];
    final color = Color(int.parse(step.color));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: color.withValues(alpha: 0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: _getIcon(step.icon, Colors.white, 32),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "STEP ${_currentStepIdx + 1}",
                    style: TextStyle(
                      color: color,
                      fontWeight: FontWeight.w900,
                      fontSize: 13,
                      letterSpacing: 1.5,
                    ),
                  ),
                  Text(
                    step.title,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 30),
        _buildRequirementBox(step, color),
        const SizedBox(height: 30),
        const Text(
          "MANDATORY DATA POINTS",
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w900,
            color: Color(0xFF64748B),
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 15),
        ...step.safetyTips.map((tip) => _buildSafetyTip(tip, color)),
        const SizedBox(height: 30),
        _buildPearlBox(step.pearlBox, color),
        const SizedBox(height: 30),
        _buildExampleSection(step.example),
      ],
    );
  }

  Widget _buildRequirementBox(RWStep step, Color color) {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(16),
        border: Border(left: BorderSide(color: color, width: 5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.info_outline, color: color, size: 20),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  "AANEM CORE REQUIREMENT: ${step.keyRequirement}",
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 14,
                    color: Color(0xFF1E293B),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          Text(
            step.keyRequirementDescription,
            style: const TextStyle(
              color: Color(0xFF475569),
              fontSize: 15,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSafetyTip(RWSafetyTip tip, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 4),
            width: 8,
            height: 8,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tip.label,
                  style: TextStyle(
                    color: color,
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  tip.text,
                  style: const TextStyle(
                    color: Color(0xFF475569),
                    fontSize: 14,
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

  Widget _buildPearlBox(RWPearlBox pearl, Color color) {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.stars, color: color, size: 24),
              const SizedBox(width: 10),
              Text(
                "CLINICAL PEARL: ${pearl.title}",
                style: const TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 15,
                  color: Color(0xFF1E293B),
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          Text(
            pearl.content,
            style: const TextStyle(
              color: Color(0xFF0F172A),
              fontSize: 14,
              height: 1.6,
              fontStyle: FontStyle.italic,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExampleSection(List<RWExampleItem> items) {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.article_outlined, color: Color(0xFF64748B), size: 24),
              SizedBox(width: 10),
              Text(
                "PROPER DOCUMENTATION EXAMPLE",
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 14,
                  color: Color(0xFF1E293B),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFFFFBEB),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFFFEF3C7)),
            ),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: items.map((item) {
                  switch (item.type) {
                    case RWExampleType.header:
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 5, top: 10),
                        child: Text(
                          item.text,
                          style: const TextStyle(
                            fontFamily: 'Courier',
                            fontWeight: FontWeight.w900,
                            fontSize: 13,
                            color: Color(0xFF1E293B),
                          ),
                        ),
                      );
                    case RWExampleType.content:
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: Text(
                          item.text,
                          style: const TextStyle(
                            fontFamily: 'Courier',
                            fontSize: 13,
                            color: Color(0xFF475569),
                          ),
                        ),
                      );
                    case RWExampleType.tabular:
                      return Text(
                        item.text,
                        style: const TextStyle(
                          fontFamily: 'Courier',
                          fontSize: 13,
                          color: Color(0xFF334155),
                          height: 1.5,
                        ),
                      );
                  }
                }).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavigationButtons() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        if (_currentStepIdx > 0)
          ElevatedButton(
            onPressed: () => setState(() => _currentStepIdx--),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: const Color(0xFF475569),
              padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
              side: const BorderSide(color: Color(0xFFCBD5E1)),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              "Previous Step",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          )
        else
          const SizedBox(),
        ElevatedButton(
          onPressed: () {
            if (_currentStepIdx < ReportWritingData.steps.length - 1) {
              setState(() => _currentStepIdx++);
            } else {
              setState(() => _currentStepIdx = 0);
            }
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF3B82F6),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          child: Text(
            _currentStepIdx < ReportWritingData.steps.length - 1
                ? "Next Step"
                : "Restart Masterclass",
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
      ],
    );
  }

  Widget _buildScenariosSection() {
    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: ReportWritingData.scenarios.length + 1,
      itemBuilder: (context, index) {
        if (index == 0) {
          return const Padding(
            padding: EdgeInsets.only(bottom: 30, top: 10),
            child: Column(
              children: [
                Text(
                  "Ideal Report Gallery",
                  style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900),
                ),
                SizedBox(height: 10),
                Text(
                  "Review these correctly phrased final impressions based on specific electrophysiological findings to master your phrasing.",
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Color(0xFF64748B), fontSize: 15),
                ),
              ],
            ),
          );
        }
        final scenario = ReportWritingData.scenarios[index - 1];
        return _buildScenarioCard(scenario);
      },
    );
  }

  Widget _buildScenarioCard(RWScenario scenario) {
    return Container(
      margin: const EdgeInsets.only(bottom: 25),
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFFEFF6FF),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.gps_fixed,
                  color: Color(0xFF2563EB),
                  size: 20,
                ),
              ),
              const SizedBox(width: 15),
              Text(
                scenario.title,
                style: const TextStyle(
                  color: Color(0xFF2563EB),
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "CLINICAL FINDINGS",
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF64748B),
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  scenario.finding,
                  style: const TextStyle(
                    fontSize: 14,
                    color: Color(0xFF334155),
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFFDF2F8),
              borderRadius: BorderRadius.circular(12),
              border: const Border(
                left: BorderSide(color: Color(0xFFDB2777), width: 4),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "AANEM GRADE IMPRESSION",
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF9D174D),
                    letterSpacing: 1,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  "\"${scenario.impression}\"",
                  style: const TextStyle(
                    fontSize: 15,
                    color: Color(0xFF831843),
                    fontWeight: FontWeight.w600,
                    fontStyle: FontStyle.italic,
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

  Widget _getIcon(String iconName, Color color, double size) {
    switch (iconName) {
      case 'User':
        return Icon(Icons.person, color: color, size: size);
      case 'Activity':
        return Icon(Icons.timeline, color: color, size: size);
      case 'FileSignature':
        return Icon(Icons.draw, color: color, size: size);
      case 'AlignLeft':
        return Icon(Icons.notes, color: color, size: size);
      case 'Target':
        return Icon(Icons.track_changes, color: color, size: size);
      default:
        return Icon(Icons.circle, color: color, size: size);
    }
  }
}
