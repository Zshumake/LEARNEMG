import 'models/module_model.dart';

class ModuleData {
  static final List<ModuleModel> standardModules = [
    ModuleModel(
      id: 'emg-introduction',
      title: 'EMG/NCS Introduction',
      description:
          'Master the fundamental principles of electrodiagnostic medicine.',
      icon: 'assets/icons/emg_intro.png',
      highlights: ['Fundamentals', 'Clinical reasoning'],
    ),
    ModuleModel(
      id: 'plexus-anatomy',
      title: 'Peripheral Nerve Anatomy',
      description:
          'Build your anatomical foundation with detailed nerve pathway mapping.',
      icon: 'assets/icons/nerve_anatomy.png',
    ),
    ModuleModel(
      id: 'plexus',
      title: 'Interactive Plexus Anatomy',
      description:
          'Explore the complex nerve networks of the body interactively.',
      icon: 'assets/icons/plexus.png',
    ),
    ModuleModel(
      id: 'radiculopathy-pathophysiology',
      title: 'Radiculopathy Pathophysiology',
      description: 'Understand the mechanisms behind nerve root compression.',
      icon: 'assets/icons/radiculopathy.png',
    ),
    ModuleModel(
      id: 'neuropathy-pathophysiology',
      title: 'Neuropathy Pathophysiology',
      description: 'Distinguish between axonal and demyelinating processes.',
      icon: 'assets/icons/neuropathy.png',
    ),
    ModuleModel(
      id: 'ncs-fundamentals',
      title: 'NCS Fundamentals',
      description: 'Dive deep into nerve conduction studies.',
      icon: 'assets/icons/ncs_fundamentals.png',
    ),
    ModuleModel(
      id: 'ncs-techniques',
      title: 'NCS Techniques',
      description: 'Perfect your technical skills with advanced techniques.',
      icon: 'assets/icons/ncs_techniques.png',
    ),
    ModuleModel(
      id: 'emg-needle-localization',
      title: 'EMG Needle Localization',
      description: 'Master precise needle electrode placement.',
      icon: 'assets/icons/needle_localization.png',
    ),
    ModuleModel(
      id: 'muscle-quiz',
      title: 'Muscle Study Lab',
      description: 'Explore comprehensive muscle anatomy.',
      icon: 'assets/icons/muscle_lab.png',
    ),
    ModuleModel(
      id: 'basic-patterns',
      title: 'Basic Pattern Recognition',
      description: 'Develop your pattern recognition skills.',
      icon: 'assets/icons/patterns.png',
    ),
    ModuleModel(
      id: 'neuropathy-myopathy-basics',
      title: 'Neuropathy vs Myopathy Basics',
      description:
          'Learn the critical distinction between nerve and muscle disorders.',
      icon: 'assets/icons/myopathy.png',
    ),
    ModuleModel(
      id: 'simple-reports',
      title: 'Basic Report Writing',
      description: 'Learn to write clear, clinically relevant reports.',
      icon: 'assets/icons/reports.png',
    ),
    ModuleModel(
      id: 'clinical-correlation',
      title: 'Clinical Application',
      description: 'Apply your knowledge to real clinical scenarios.',
      icon: 'assets/icons/clinical.png',
    ),
  ];
}
