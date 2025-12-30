
// Custom Icon Mappings from index.html (verified)
export const CUSTOM_ICON_MAPPING = {
    'emg-introduction': 'NEW ICONS/EMG:NCS Intro.png',
    'plexus-anatomy': 'NEW ICONS/Peripheral Anatomy.png',
    'brachial-plexus-interactive': 'NEW ICONS/Brachial Plexus Anatomy.png',
    'radiculopathy-pathophysiology': 'NEW ICONS/Radiculopathy Pathophysiology.png',
    'neuropathy-pathophysiology': 'NEW ICONS/Neuropathy Pathophysiology.png',
    'ncs-fundamentals': 'NEW ICONS/NCS Fundamentals.png',
    'ncs-techniques': 'NEW ICONS/NCS Techniques.png',
    'emg-needle-localization': 'NEW ICONS/EMG Needle localization.png',
    'muscle-quiz': 'NEW ICONS/muscle study lab.png',
    'basic-patterns': 'NEW ICONS/Basic Pattern Recognition.png',
    'neuropathy-myopathy-basics': 'NEW ICONS/Neuropathy vs. Myopathy Basics.png',
    'simple-reports': 'NEW ICONS/Basic report writing.png',
    'clinical-correlation': 'NEW ICONS/Clinical application.png'
};

// Module Descriptions (1-based index to match module Number)
export const MODULE_DESCRIPTIONS = {
    1: {
        title: "EMG/NCS Introduction",
        text: "Master the fundamental principles of electrodiagnostic medicine! This comprehensive module covers patient preparation, safety protocols, basic neurophysiology, and the clinical applications that make EMG/NCS an essential diagnostic tool.",
        highlights: "Topics: Patient care, safety, basic principles, clinical applications"
    },
    2: {
        title: "Peripheral Anatomy",
        text: "Build your anatomical foundation with detailed nerve pathway mapping. Learn the complex relationships between peripheral nerves, muscles, and clinical presentations to become an expert diagnostician.",
        highlights: "Topics: Nerve anatomy, muscle innervation, anatomical variations"
    },
    3: {
        title: "Plexus Anatomy",
        text: "Explore the complex nerve networks of the body! This interactive module covers both Brachial and Lumbosacral plexuses, helping you visualize anatomy, trace pathways, and understand injury patterns.",
        highlights: "Topics: Brachial & Lumbosacral anatomy, interactive tracing, injury patterns"
    },
    4: {
        title: "Radiculopathy Pathophysiology",
        text: "Understand the mechanisms behind nerve root compression and irritation. Learn to differentiate radiculopathy from other conditions and master the EMG/NCS findings that confirm your diagnosis.",
        highlights: "Topics: Nerve root compression, differential diagnosis, EMG patterns"
    },
    5: {
        title: "Neuropathy Pathophysiology",
        text: "Distinguish between axonal and demyelinating processes with confidence! This fundamental knowledge shapes your entire approach to peripheral nerve disorders and treatment planning.",
        highlights: "Topics: Axonal vs demyelinating, pathophysiology, treatment implications"
    },
    6: {
        title: "NCS Fundamentals",
        text: "Dive deep into nerve conduction studies! Master electrode placement, stimulation techniques, measurement interpretation, and learn to differentiate normal from pathological findings.",
        highlights: "Topics: Electrode placement, stimulation, normal values, interpretation"
    },
    7: {
        title: "NCS Techniques",
        text: "Perfect your technical skills with advanced nerve conduction study techniques. Learn troubleshooting strategies, optimal positioning, and how to obtain reliable, reproducible results.",
        highlights: "Topics: Advanced techniques, troubleshooting, quality control"
    },
    8: {
        title: "EMG Needle Localization",
        text: "Master precise needle electrode placement using anatomical landmarks. Learn safe insertion techniques, avoid complications, and ensure accurate muscle sampling for reliable results.",
        highlights: "Topics: Needle placement, anatomical landmarks, safety protocols"
    },
    9: {
        title: "Muscle Study Laboratory",
        text: "Explore comprehensive muscle anatomy with our advanced Preston & Shapiro laboratory database. Interactive muscle exploration with detailed anatomical references and clinical correlations.",
        highlights: "Topics: Muscle anatomy, Preston & Shapiro database, interactive learning"
    },
    10: {
        title: "Basic Pattern Recognition",
        text: "Develop the skilled eye needed to identify abnormal spontaneous activity. Learn to recognize positive sharp waves, fibrillations, complex repetitive discharges, and understanding their clinical significance.",
        highlights: "Topics: Spontaneous activity, insertional activity, firing patterns"
    },
    11: {
        title: "Neuropathy vs Myopathy Basics",
        text: "Learn the crucial EMG distinctions between nerve and muscle disorders. Master the recruitment patterns, motor unit potentials, and interference patterns that differentiate these two major categories of disease.",
        highlights: "Topics: Recruitment patterns, MUP analysis, interference patterns"
    },
    12: {
        title: "Basic Report Writing",
        text: "Transform clinical data into professional diagnostic reports. Learn standard formatting, key terminology, and how to clearly communicate your findings and impressions to referring providers.",
        highlights: "Topics: Report structure, standard terminology, formulating impressions"
    },
    13: {
        title: "Clinical Application",
        text: "Apply your knowledge to real clinical scenarios.",
        highlights: "Topics: Case studies, clinical correlation"
    }
};

// Base Module Configuration (Unified List)
// Helper to define standard module list
const standardModules = [
    { id: 'emg-introduction', title: 'EMG/NCS Introduction', customIcon: CUSTOM_ICON_MAPPING['emg-introduction'] },
    { id: 'plexus-anatomy', title: 'Plexus Anatomy', customIcon: CUSTOM_ICON_MAPPING['plexus-anatomy'] },
    { id: 'brachial-plexus-interactive', title: 'Brachial Plexus Interactive', customIcon: CUSTOM_ICON_MAPPING['brachial-plexus-interactive'] },
    { id: 'radiculopathy-pathophysiology', title: 'Radiculopathy Pathophysiology', customIcon: CUSTOM_ICON_MAPPING['radiculopathy-pathophysiology'] },
    { id: 'neuropathy-pathophysiology', title: 'Neuropathy Pathophysiology', customIcon: CUSTOM_ICON_MAPPING['neuropathy-pathophysiology'] },
    { id: 'ncs-fundamentals', title: 'NCS Fundamentals', customIcon: CUSTOM_ICON_MAPPING['ncs-fundamentals'] },
    { id: 'ncs-techniques', title: 'NCS Techniques', customIcon: CUSTOM_ICON_MAPPING['ncs-techniques'] },
    { id: 'emg-needle-localization', title: 'EMG Needle Localization', customIcon: CUSTOM_ICON_MAPPING['emg-needle-localization'] },
    { id: 'muscle-quiz', title: 'Muscle Study Lab', customIcon: CUSTOM_ICON_MAPPING['muscle-quiz'] },
    { id: 'basic-patterns', title: 'Basic Pattern Recognition', customIcon: CUSTOM_ICON_MAPPING['basic-patterns'] },
    { id: 'neuropathy-myopathy-basics', title: 'Neuropathy vs Myopathy Basics', customIcon: CUSTOM_ICON_MAPPING['neuropathy-myopathy-basics'] },
    { id: 'simple-reports', title: 'Basic Report Writing', customIcon: CUSTOM_ICON_MAPPING['simple-reports'] },
    { id: 'clinical-correlation', title: 'Clinical Application', customIcon: CUSTOM_ICON_MAPPING['clinical-correlation'] }
];

// Base Module Configuration (Unified List)
export const learningModulesConfig = {
    pgy2: standardModules,
    all: standardModules
};
