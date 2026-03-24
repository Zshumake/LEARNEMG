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
      ),
      PodcastEpisode(
        id: 'emg-terminology',
        title: 'Essential EMG Terminology',
        duration: '64:49',
        audioFile: 'Podcasts/Essential Terminology.m4a',
        description: 'Master the essential vocabulary and definitions',
      ),
    ],
    'plexus-anatomy': [
      PodcastEpisode(
        id: 'plexus-peripheral',
        title: 'Peripheral Nerve Anatomy',
        duration: '39:07',
        audioFile: 'Podcasts/Peripheral Anatomy.m4a',
        description: 'Comprehensive exploration of peripheral nerve anatomy',
      ),
      PodcastEpisode(
        id: 'plexus-anomalous',
        title: 'Anomalous Anatomy',
        duration: '14:47',
        audioFile: 'Podcasts/Anamolous Anatomy.m4a',
        description: 'Explore anatomical variations and anomalies',
      ),
      PodcastEpisode(
        id: 'plexus-plexopathies',
        title: 'Plexopathies Deep Dive',
        duration: '13:28',
        audioFile: 'Podcasts/Plexopathies.m4a',
        description:
            'Detailed exploration of brachial and lumbosacral plexus disorders',
      ),
    ],
    'radiculopathy': [
      PodcastEpisode(
        id: 'radiculopathy-ep1',
        title: 'Radiculopathy Pathophysiology',
        duration: '10:17',
        audioFile: 'Podcasts/Radiculopathy.m4a',
        description:
            'Ernest explains the pathophysiology of nerve root compression',
      ),
    ],
    'neuropathy-pathophysiology': [
      PodcastEpisode(
        id: 'neuropathy-poly',
        title: 'Polyneuropathies',
        duration: '16:02',
        audioFile: 'Podcasts/Polyneuropathies.m4a',
        description: 'Comprehensive exploration of polyneuropathy patterns',
      ),
      PodcastEpisode(
        id: 'neuropathy-mono',
        title: 'Mononeuropathy Pathophysiology',
        duration: '33:22',
        audioFile: 'Podcasts/Mononeuropathy pathophysiology.m4a',
        description: 'Detailed examination of focal neuropathies',
      ),
      PodcastEpisode(
        id: 'neuropathy-main',
        title: 'Neuropathy Pathophysiology',
        duration: '33:22',
        audioFile: 'Podcasts/Neuropathy Pathophysiology.m4a',
        description:
            'Foundational pathophysiology of peripheral nerve disorders',
      ),
      PodcastEpisode(
        id: 'neuropathy-myo-vs-neuro',
        title: 'Myopathy vs. Neuropathy',
        duration: '17:09',
        audioFile: 'Podcasts/Myopathy vs. Neuropathy.m4a',
        description: 'Key clinical and electrodiagnostic differentiators',
      ),
    ],
    'basic-patterns': [
      PodcastEpisode(
        id: 'patterns-ep1',
        title: 'Basic Pattern Recognition',
        duration: '14:59',
        audioFile: 'Podcasts/Basic Patter Recognition.m4a',
        description: 'Ernest teaches systematic EMG interpretation',
      ),
      PodcastEpisode(
        id: 'patterns-report-writing',
        title: 'Basic Report Writing',
        duration: '11:56',
        audioFile: 'Podcasts/Basic Report Writing.m4a',
        description: 'Master the art of clear and concise EDX reporting',
      ),
      PodcastEpisode(
        id: 'patterns-interpretation',
        title: 'EMG Interpretation',
        duration: '14:59',
        audioFile: 'Podcasts/EMG interpretation.m4a',
        description: 'Systematic approach to interpreting complex EMG signals',
      ),
    ],
    'extra-topics': [
      PodcastEpisode(
        id: 'extra-als',
        title: 'ALS and Mimics',
        duration: '13:54',
        audioFile: 'Podcasts/ALS and mimics.m4a',
        description: 'Ernest explores motor neuron disease and mimics',
      ),
      PodcastEpisode(
        id: 'extra-blink',
        title: 'The Blink Reflex Explained',
        duration: '14:14',
        audioFile: 'Podcasts/The Blink Reflex explained.m4a',
        description: 'Ernest explains the blink reflex study',
      ),
      PodcastEpisode(
        id: 'extra-blink-alt',
        title: 'Blink Reflex Essentials',
        duration: '14:14',
        audioFile: 'Podcasts/Blink Reflex.m4a',
        description: 'Core principles of the electrodiagnostic blink reflex',
      ),
      PodcastEpisode(
        id: 'extra-nmj',
        title: 'Neuromuscular Junction Disorders',
        duration: '16:00',
        audioFile: 'Podcasts/Neuromuscular junction disorders.m4a',
        description: 'Ernest explores disorders affecting the NMJ',
      ),
    ],
    'edx-series': [
      PodcastEpisode(
        id: 'edx-1',
        title: 'EDX Series: Episode 1',
        duration: '31:44',
        audioFile: 'Podcasts/EDX_1.m4a',
        description: 'A fundamental primer on electrodiagnostic medicine.',
      ),
      PodcastEpisode(
        id: 'edx-2',
        title: 'EDX Series: Episode 2',
        duration: '28:29',
        audioFile: 'Podcasts/EDX_2.m4a',
        description:
            'Technical overview of the neuromuscular system and nerve injuries.',
      ),
      PodcastEpisode(
        id: 'edx-3',
        title: 'EDX Series: Episode 3',
        duration: '36:29',
        audioFile: 'Podcasts/EDX_3.m4a',
        description: 'Overview of EDX instrumentation and NCS principles.',
      ),
      PodcastEpisode(
        id: 'edx-4',
        title: 'EDX Series: Episode 4',
        duration: '43:10',
        audioFile: 'Podcasts/EDX_4.m4a',
        description: 'Details various nerve conduction studies (NCS).',
      ),
      PodcastEpisode(
        id: 'edx-5',
        title: 'EDX Series: Episode 5',
        duration: '35:24',
        audioFile: 'Podcasts/EDX_5.m4a',
        description: 'Diagnostic utility of EDX studies and needle EMG.',
      ),
      PodcastEpisode(
        id: 'edx-6',
        title: 'EDX Series: Episode 6',
        duration: '34:56',
        audioFile: 'Podcasts/EDX_6.m4a',
        description: 'Clinical guide for interpreting EMG results.',
      ),
      PodcastEpisode(
        id: 'edx-7',
        title: 'EDX Series: Episode 7',
        duration: '29:57',
        audioFile: 'Podcasts/EDX_7.m4a',
        description: 'Diagnostic framework for identifying nerve injuries.',
      ),
      PodcastEpisode(
        id: 'edx-8',
        title: 'EDX Series: Episode 8',
        duration: '28:28',
        audioFile: 'Podcasts/EDX_8.m4a',
        description: 'Clinical guide to plexopathies and nerve entrapments.',
      ),
      PodcastEpisode(
        id: 'edx-9',
        title: 'EDX Series: Episode 9',
        duration: '37:25',
        audioFile: 'Podcasts/EDX_9.m4a',
        description:
            'Comprehensive overview of upper extremity nerve pathologies.',
      ),
      PodcastEpisode(
        id: 'edx-10',
        title: 'EDX Series: Episode 10',
        duration: '32:36',
        audioFile: 'Podcasts/EDX_10.m4a',
        description: 'Clinical guide to mononeuropathies of the limbs.',
      ),
      PodcastEpisode(
        id: 'edx-11',
        title: 'EDX Series: Episode 11',
        duration: '37:13',
        audioFile: 'Podcasts/EDX_11.m4a',
        description: 'Anatomy and pathology of lower extremity nerves.',
      ),
      PodcastEpisode(
        id: 'edx-12',
        title: 'EDX Series: Episode 12',
        duration: '28:43',
        audioFile: 'Podcasts/EDX_12.m4a',
        description: 'Clinical overview of peripheral polyneuropathy.',
      ),
      PodcastEpisode(
        id: 'edx-13',
        title: 'EDX Series: Episode 13',
        duration: '40:27',
        audioFile: 'Podcasts/EDX_13.m4a',
        description:
            'Clinical guide for diagnosing neuromuscular junction (NMJ) disorders.',
      ),
      PodcastEpisode(
        id: 'edx-14',
        title: 'EDX Series: Episode 14',
        duration: '34:38',
        audioFile: 'Podcasts/EDX_14.m4a',
        description:
            'Comprehensive clinical guide for diagnosing and classifying myopathies.',
      ),
      PodcastEpisode(
        id: 'edx-15',
        title: 'EDX Series: Episode 15',
        duration: '29:43',
        audioFile: 'Podcasts/EDX_15.m4a',
        description: 'Clinical guide to motor neuron diseases (MND).',
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
