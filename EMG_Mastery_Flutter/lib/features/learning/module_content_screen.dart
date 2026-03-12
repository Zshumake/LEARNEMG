import 'package:flutter/material.dart';
import '../../data/models/module_model.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/content_card.dart';
import 'introduction_module_view.dart';
import 'nerve_explorer_view.dart';
import 'plexus_explorer_view.dart';
import 'plexus_clinical_view.dart';
import 'radiculopathy_view.dart';
import '../../data/module_contents/neuropathy_content.dart';
import '../../data/module_contents/ncs_fundamentals_content.dart';
import 'topic_content_view.dart';
import 'needle_localization_view.dart';
import 'ncs_techniques_view.dart';
import 'muscle_lab_view.dart';
import 'basic_patterns_view.dart';
import 'nm_basics_view.dart';
import 'report_writing_view.dart';
import 'clinical_cases_view.dart';

class ModuleContentScreen extends StatelessWidget {
  final ModuleModel module;

  const ModuleContentScreen({super.key, required this.module});

  @override
  Widget build(BuildContext context) {
    // EMG/NCS Introduction — specialized native view
    if (module.id == 'emg-introduction') {
      return Scaffold(
        appBar: AppBar(
          title: Text(module.title),
          actions: [
            IconButton(
              icon: const Icon(Icons.headset),
              onPressed: () {
                // TODO: Trigger Podcast
              },
            ),
          ],
        ),
        body: const IntroductionModuleView(),
      );
    }

    // Peripheral Nerve Anatomy — Pathway Explorer
    if (module.id == 'plexus-anatomy') {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Pathway Explorer'),
          actions: [
            IconButton(
              icon: const Icon(Icons.headset),
              onPressed: () {
                // TODO: Trigger Podcast
              },
            ),
          ],
        ),
        body: const NerveExplorerView(),
      );
    }

    // Brachial Plexus Interactive — Tabbed: Anatomy + Clinical
    if (module.id == 'plexus' ||
        module.id == 'brachial-plexus' ||
        module.id == 'plexus-interactive') {
      return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: const Text('Plexus Anatomy'),
            actions: [
              IconButton(
                icon: const Icon(Icons.headset),
                onPressed: () {
                  // TODO: Trigger Podcast
                },
              ),
            ],
            bottom: const TabBar(
              indicatorColor: Color(0xFF3B82F6),
              indicatorWeight: 3,
              labelColor: Color(0xFF3B82F6),
              unselectedLabelColor: Color(0xFF94A3B8),
              labelStyle: TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
              tabs: [
                Tab(text: 'Clinical Pathophysiology'),
                Tab(text: 'Interactive Anatomy'),
              ],
            ),
          ),
          body: const TabBarView(
            children: [PlexusClinicalView(), PlexusExplorerView()],
          ),
        ),
      );
    }
    // Radiculopathy Pathophysiology
    if (module.id == 'radiculopathy-pathophysiology') {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Radiculopathy Pathophysiology'),
          actions: [
            IconButton(
              icon: const Icon(Icons.headset),
              onPressed: () {
                // TODO: Trigger Podcast
              },
            ),
          ],
        ),
        body: const RadiculopathyView(),
      );
    }

    // Neuropathy Pathophysiology
    if (module.id == 'neuropathy-pathophysiology') {
      return TopicContentView(data: neuropathyContent);
    }

    // NCS Fundamentals
    if (module.id == 'ncs-fundamentals') {
      return TopicContentView(data: ncsFundamentalsContent);
    }

    // EMG Needle Localization
    if (module.id == 'emg-needle-localization') {
      return Scaffold(
        appBar: AppBar(title: const Text('Needle Localization')),
        body: const NeedleLocalizationView(),
      );
    }

    // NCS Techniques
    if (module.id == 'ncs-techniques') {
      return Scaffold(
        appBar: AppBar(title: const Text('NCS Techniques')),
        body: const NCSTechniquesView(),
      );
    }

    // Muscle Study Lab
    if (module.id == 'muscle-quiz') {
      return Scaffold(
        appBar: AppBar(title: const Text('Muscle Study Lab')),
        body: const MuscleLabView(),
      );
    }

    // Basic Pattern Recognition
    if (module.id == 'basic-patterns') {
      return Scaffold(
        appBar: AppBar(title: const Text('Basic Pattern Recognition')),
        body: const BasicPatternsView(),
      );
    }

    // Neuropathy vs. Myopathy Basics
    if (module.id == 'neuropathy-myopathy-basics') {
      return Scaffold(
        appBar: AppBar(title: const Text('NM Basics')),
        body: const NMBasicsView(),
      );
    }

    // Basic Report Writing
    if (module.id == 'simple-reports') {
      return Scaffold(
        appBar: AppBar(title: const Text('Report Writing')),
        body: const ReportWritingView(),
      );
    }

    // Clinical Application
    if (module.id == 'clinical-correlation') {
      return Scaffold(
        appBar: AppBar(title: const Text('Clinical Application')),
        body: const ClinicalCasesView(),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(module.title),
        actions: [
          IconButton(
            icon: const Icon(Icons.headset),
            onPressed: () {
              // TODO: Trigger Podcast
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Hero Header - Uses full available width
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: AppTheme.foundationGradient,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    module.title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    module.description,
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.9),
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 30),

            const SizedBox(height: 40),

            const ContentCard(
              title: 'Placeholder Content',
              accentColor: AppTheme.primary,
              content: Text(
                'This module is still under construction in the native Flutter version. We are currently focusing on the EMG/NCS Introduction module.',
                style: TextStyle(
                  fontSize: 16,
                  color: AppTheme.textMain,
                  height: 1.5,
                ),
              ),
            ),

            const SizedBox(height: 40),

            // Bottom Action
            Center(
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                },
                icon: const Icon(Icons.check_circle_outline),
                label: const Text('Return to Pathway'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.success,
                  foregroundColor: Colors.white,
                  minimumSize: const Size(
                    double.infinity,
                    54,
                  ), // Full width button
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 30),
          ],
        ),
      ),
    );
  }
}
