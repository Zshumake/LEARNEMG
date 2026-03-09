import 'models/podcast_model.dart';

class PodcastData {
  static final Map<String, List<PodcastEpisode>> episodes = {
    'emg-introduction': [
      PodcastEpisode(
        id: 'emg-intro-main',
        title: 'EMG Introduction Fundamentals',
        duration: '52:27',
        audioFile: 'Podcasts/EMG Intro.m4a',
        description:
            'Comprehensive introduction to electrodiagnostic medicine fundamentals',
        showNotes: '''
#### In This Episode:
* What is electrodiagnostic medicine?
* Overview of EMG and NCS techniques
* Clinical applications and when to order studies
* What to expect during an EMG/NCS examination
* Comprehensive fundamentals for beginners

#### Key Takeaways:
Electrodiagnostic studies are powerful tools for evaluating nerve and muscle disorders. This comprehensive introduction covers everything you need to get started with EMG and NCS interpretation.
''',
      ),
      PodcastEpisode(
        id: 'emg-terminology',
        title: 'Essential EMG Terminology',
        duration: '14:46',
        audioFile: 'Podcasts/Essential Terminology.m4a',
        description:
            'Master the essential vocabulary and definitions used in electrodiagnostic medicine',
        showNotes: '''
#### In This Episode:
* Fundamental EMG and NCS terminology
* Understanding motor unit action potentials (MUAPs)
* Spontaneous activity patterns and their significance
* Key concepts: recruitment, conduction velocity, latency
* Essential definitions for accurate interpretation

#### Key Takeaways:
Mastering electrodiagnostic terminology is the foundation for accurate study interpretation. Learn the essential terms and concepts that every EDX physician needs to know.
''',
      ),
    ],
    'plexus-anatomy': [
      PodcastEpisode(
        id: 'plexus-peripheral',
        title: 'Peripheral Nerve Anatomy',
        duration: '39:08',
        audioFile: 'Podcasts/Peripheral Anatomy.m4a',
        description:
            'Comprehensive exploration of peripheral nerve anatomy and organization',
        showNotes: '''
#### In This Episode:
* Anatomical organization of peripheral nerves
* Key landmarks and nerve pathways
* Upper and lower extremity nerve anatomy
* Clinical correlations with nerve injury patterns
* Tips for remembering complex anatomy

#### Key Takeaways:
Understanding peripheral nerve anatomy is essential for localizing lesions and interpreting electrodiagnostic findings accurately. This comprehensive episode covers the entire peripheral nervous system.
''',
      ),
    ],
    'radiculopathy': [
      PodcastEpisode(
        id: 'radiculopathy-ep1',
        title: 'Radiculopathy Pathophysiology',
        duration: '15:49',
        audioFile: 'Podcasts/Radiculopathy.m4a',
        description:
            'Ernest explains the pathophysiology of nerve root compression',
        showNotes: '''
#### In This Episode:
* Mechanisms of nerve root compression and injury
* Classic radiculopathy patterns (C5-T1, L4-S1)
* EMG findings: denervation and reinnervation patterns
* Differentiating radiculopathy from peripheral neuropathy and plexopathy
* Clinical presentation and physical exam findings

#### Key Takeaways:
Radiculopathy is one of the most common reasons for EMG referral. Learn to recognize the patterns and correlate with imaging findings for accurate diagnosis.
''',
      ),
    ],
    'neuropathy-pathophysiology': [
      PodcastEpisode(
        id: 'neuropathy-poly',
        title: 'Polyneuropathies',
        duration: '16:03',
        audioFile: 'Podcasts/Polyneuropathies.m4a',
        description:
            'Comprehensive exploration of polyneuropathy patterns and mechanisms',
        showNotes: '''
#### In This Episode:
* Axonal vs. demyelinating polyneuropathies
* Length-dependent vs. non-length-dependent patterns
* Common causes: diabetes, toxins, hereditary conditions
* NCS and EMG patterns in polyneuropathies
* Diagnostic approach and differential diagnosis

#### Key Takeaways:
Polyneuropathies are among the most common peripheral nerve disorders. Master the pattern recognition and diagnostic approach for accurate classification and treatment.
''',
      ),
      PodcastEpisode(
        id: 'neuropathy-mono',
        title: 'Mononeuropathy Pathophysiology',
        duration: '33:22',
        audioFile: 'Podcasts/Mononeuropathy pathophysiology.m4a',
        description:
            'Detailed examination of focal neuropathies and mononeuropathy multiplex',
        showNotes: '''
#### In This Episode:
* Focal entrapment neuropathies: carpal tunnel, cubital tunnel, and more
* Mononeuropathy multiplex patterns and causes
* Compression, ischemia, and inflammation mechanisms
* Electrodiagnostic localization techniques
* Clinical localization and differential diagnosis strategies

#### Key Takeaways:
Understanding mononeuropathy pathophysiology is essential for accurate localization. Learn to distinguish focal compression from systemic causes and recognize mononeuropathy multiplex patterns.
''',
      ),
    ],
    'basic-patterns': [
      PodcastEpisode(
        id: 'patterns-ep1',
        title: 'Basic Pattern Recognition',
        duration: '15:00',
        audioFile: 'Podcasts/Basic Patter Recognition.m4a',
        description:
            'Ernest teaches systematic EMG interpretation and pattern recognition',
        showNotes: '''
#### In This Episode:
* Systematic approach to EMG/NCS interpretation
* Classic patterns: CTS, cubital tunnel, fibular neuropathy
* Radiculopathy patterns and myotomal distributions
* Plexopathy vs. multiple mononeuropathies
* Putting it all together: clinical correlation and diagnosis
* Common pitfalls and how to avoid misinterpretation

#### Key Takeaways:
Pattern recognition is a skill that develops with practice. Learn a systematic approach to interpreting EMG/NCS studies and recognizing common patterns to build your diagnostic confidence.
''',
      ),
    ],
    'neuropathy-myopathy-basics': [
      PodcastEpisode(
        id: 'neuro-myo-ep1',
        title: 'Neuropathy vs. Myopathy',
        duration: '17:10',
        audioFile: 'Podcasts/Neuropathy vs. Myopathy.m4a',
        description:
            'Ernest explains how to differentiate nerve and muscle disorders using clinical and EDX features',
        showNotes: '''
#### In This Episode:
* Clinical clues: distribution of weakness (proximal vs. distal)
* NCS findings: normal in myopathy, abnormal in neuropathy
* Needle EMG: myopathic vs. neuropathic changes in detail
* Motor neuron disease: the great imitator with mixed features
* Inflammatory myopathies and their EDX signatures
* Practical diagnostic algorithms and clinical correlation

#### Key Takeaways:
Distinguishing neuropathy from myopathy is essential for proper patient management. Use clinical history, NCS, and needle EMG together for accurate diagnosis and appropriate treatment planning.
''',
      ),
    ],
    'simple-reports': [
      PodcastEpisode(
        id: 'reports-ep1',
        title: 'Basic Report Writing',
        duration: '11:57',
        audioFile: 'Podcasts/Basic Report Writing.m4a',
        description:
            'Ernest teaches the art of clear, effective electrodiagnostic report writing',
        showNotes: '''
#### In This Episode:
* AANEM reporting guidelines overview
* Essential elements: patient data, NCS, EMG, summary
* Writing clear interpretations and recommendations
* Common mistakes to avoid
* Tips for efficient and professional report generation

#### Key Takeaways:
A well-written report communicates your findings clearly to referring physicians and becomes part of the permanent medical record. Take time to craft quality reports that accurately convey your electrodiagnostic findings.
''',
      ),
    ],
  };

  static List<PodcastEpisode> get allEpisodes {
    return episodes.values.expand((list) => list).toList();
  }

  static List<PodcastEpisode> getEpisodesByModule(String moduleId) {
    return episodes[moduleId] ?? [];
  }
}
