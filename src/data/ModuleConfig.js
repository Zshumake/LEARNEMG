
// Custom Icon Mappings
export const CUSTOM_ICON_MAPPING = {
    'emg-introduction': 'images/icons/EMG-NCS Intro.png',
    'plexus-anatomy': 'images/icons/Peripheral Anatomy.png',
    'plexus': 'images/icons/Brachial Plexus Anatomy.png',
    'radiculopathy-pathophysiology': 'images/icons/Radiculopathy Pathophysiology.png',
    'neuropathy-pathophysiology': 'images/icons/Neuropathy Pathophysiology.png',
    'ncs-fundamentals': 'images/icons/NCS Fundamentals.png',
    'ncs-techniques': 'images/icons/NCS Techniques.png',
    'emg-needle-localization': 'images/icons/EMG Needle localization.png',
    'muscle-quiz': 'images/icons/muscle study lab.png',
    'basic-patterns': 'images/icons/Basic Pattern Recognition.png',
    'neuropathy-myopathy-basics': 'images/icons/Neuropathy vs. Myopathy Basics.png',
    'simple-reports': 'images/icons/Basic report writing.png',
    'clinical-correlation': 'images/icons/Clinical application.png'
};

// Standard Module List
export const STANDARD_MODULES = [
    { id: 'emg-introduction', title: 'EMG/NCS Introduction', customIcon: CUSTOM_ICON_MAPPING['emg-introduction'], competency: 'Patient Care & Knowledge', description: 'Master the fundamental principles of electrodiagnostic medicine.' },
    { id: 'plexus-anatomy', title: 'Peripheral Nerve Anatomy', customIcon: CUSTOM_ICON_MAPPING['plexus-anatomy'], competency: 'Medical Knowledge', description: 'Build your anatomical foundation with detailed nerve pathway mapping.' },
    { id: 'plexus', title: 'Interactive Plexus Anatomy', customIcon: CUSTOM_ICON_MAPPING['plexus'], competency: 'Medical Knowledge', description: 'Explore the complex nerve networks of the body interactively.' },
    { id: 'radiculopathy-pathophysiology', title: 'Radiculopathy Pathophysiology', customIcon: CUSTOM_ICON_MAPPING['radiculopathy-pathophysiology'], competency: 'Medical Knowledge', description: 'Understand the mechanisms behind nerve root compression.' },
    { id: 'neuropathy-pathophysiology', title: 'Neuropathy Pathophysiology', customIcon: CUSTOM_ICON_MAPPING['neuropathy-pathophysiology'], competency: 'Medical Knowledge', description: 'Distinguish between axonal and demyelinating processes.' },
    { id: 'ncs-fundamentals', title: 'NCS Fundamentals', customIcon: CUSTOM_ICON_MAPPING['ncs-fundamentals'], competency: 'Patient Care', description: 'Dive deep into nerve conduction studies.' },
    { id: 'ncs-techniques', title: 'NCS Techniques', customIcon: CUSTOM_ICON_MAPPING['ncs-techniques'], competency: 'Patient Care', description: 'Perfect your technical skills with advanced techniques.' },
    { id: 'emg-needle-localization', title: 'EMG Needle Localization', customIcon: CUSTOM_ICON_MAPPING['emg-needle-localization'], competency: 'Patient Care', description: 'Master precise needle electrode placement.' },
    { id: 'muscle-quiz', title: 'Muscle Study Lab', customIcon: CUSTOM_ICON_MAPPING['muscle-quiz'], competency: 'Medical Knowledge', description: 'Explore comprehensive muscle anatomy.' },
    { id: 'basic-patterns', title: 'Basic Pattern Recognition', customIcon: CUSTOM_ICON_MAPPING['basic-patterns'], competency: 'Medical Knowledge', description: 'Develop your pattern recognition skills.' },
    { id: 'neuropathy-myopathy-basics', title: 'Neuropathy vs Myopathy Basics', customIcon: CUSTOM_ICON_MAPPING['neuropathy-myopathy-basics'], competency: 'Medical Knowledge', description: 'Learn the critical distinction between nerve and muscle disorders.' },
    { id: 'simple-reports', title: 'Basic Report Writing', customIcon: CUSTOM_ICON_MAPPING['simple-reports'], competency: 'Interpersonal & Communication Skills', description: 'Learn to write clear, clinically relevant reports.' },
    { id: 'clinical-correlation', title: 'Clinical Application', customIcon: CUSTOM_ICON_MAPPING['clinical-correlation'], competency: 'Patient Care', description: 'Apply your knowledge to real clinical scenarios.' }
];

// Configuration
export const LEARNING_MODULES_CONFIG = {
    pgy2: STANDARD_MODULES,
    pgy3: STANDARD_MODULES, // Can be customized later
    pgy4: STANDARD_MODULES, // Can be customized later
    all: STANDARD_MODULES
};
