import 'package:flutter/material.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';
import '../../data/needle_localization_data.dart';
import '../../data/models/needle_localization_model.dart';

/// EMG Needle Localization teaching module.
class NeedleLocalizationView extends StatelessWidget {
  const NeedleLocalizationView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          _buildHero(),
          Container(
            color: Theme.of(context).scaffoldBackgroundColor,
            child: const TabBar(
              indicatorColor: Color(0xFF4F46E5),
              labelColor: Color(0xFF4F46E5),
              unselectedLabelColor: Color(0xFF94A3B8),
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: [
                Tab(text: 'Anatomy Atlas'),
                Tab(text: 'Practice Quiz'),
              ],
            ),
          ),
          const Expanded(
            child: TabBarView(children: [_AnatomyAtlasTab(), _QuizTab()]),
          ),
        ],
      ),
    );
  }

  Widget _buildHero() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 40),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF0EA5E9), Color(0xFF4F46E5)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: const Column(
        children: [
          Text(
            'Needle Localization Atlas',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: -0.5,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 8),
          Text(
            'Master Anatomical Landmarks & Clinical Maneuvers',
            style: TextStyle(
              fontSize: 14,
              color: Colors.white70,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _AnatomyAtlasTab extends StatefulWidget {
  const _AnatomyAtlasTab();

  @override
  State<_AnatomyAtlasTab> createState() => _AnatomyAtlasTabState();
}

class _AnatomyAtlasTabState extends State<_AnatomyAtlasTab> {
  String _selectedRegion = 'Upper';
  String? _selectedMuscleKey;

  @override
  void initState() {
    super.initState();
    _selectedMuscleKey = NeedleLocalizationData.upperExtremity.keys.first;
  }

  void _switchRegion(String region) {
    setState(() {
      _selectedRegion = region;
      _selectedMuscleKey = region == 'Upper'
          ? NeedleLocalizationData.upperExtremity.keys.first
          : NeedleLocalizationData.lowerExtremity.keys.first;
    });
  }

  @override
  Widget build(BuildContext context) {
    final muscles = _selectedRegion == 'Upper'
        ? NeedleLocalizationData.upperExtremity
        : NeedleLocalizationData.lowerExtremity;
    final muscle = muscles[_selectedMuscleKey];

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildRegionSelector(),
          _buildMusclePills(muscles),
          if (muscle != null)
            _buildDetailSection(muscle)
          else
            const Padding(
              padding: EdgeInsets.all(40),
              child: Center(child: Text('Select a muscle to begin.')),
            ),
          const SizedBox(height: 60),
        ],
      ),
    );
  }

  Widget _buildRegionSelector() {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          Expanded(child: _regionButton('Upper', Icons.back_hand_outlined)),
          const SizedBox(width: 12),
          Expanded(child: _regionButton('Lower', Icons.directions_walk)),
        ],
      ),
    );
  }

  Widget _regionButton(String label, IconData icon) {
    final isSelected = _selectedRegion == label;
    return InkWell(
      onTap: () => _switchRegion(label),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF4F46E5) : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? const Color(0xFF4F46E5)
                : const Color(0xFFE2E8F0),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 18,
              color: isSelected ? Colors.white : const Color(0xFF64748B),
            ),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(
                fontWeight: FontWeight.w800,
                color: isSelected ? Colors.white : const Color(0xFF64748B),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMusclePills(Map<String, NeedleMuscleData> muscles) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: muscles.keys.map((key) {
          final isSelected = _selectedMuscleKey == key;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ChoiceChip(
              label: Text(key),
              selected: isSelected,
              onSelected: (val) {
                if (val) setState(() => _selectedMuscleKey = key);
              },
              backgroundColor: Colors.white,
              selectedColor: const Color(0xFF4F46E5).withValues(alpha: 0.1),
              labelStyle: TextStyle(
                color: isSelected
                    ? const Color(0xFF4F46E5)
                    : const Color(0xFF64748B),
                fontWeight: isSelected ? FontWeight.w800 : FontWeight.w500,
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildDetailSection(NeedleMuscleData muscle) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            muscle.fullName,
            style: const TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: Color(0xFF1E293B),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            muscle.innervation,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: Color(0xFF4F46E5),
            ),
          ),
          const SizedBox(height: 24),
          _imageCard(muscle.imagePath),
          const SizedBox(height: 24),
          _infoCard('Anatomical Landmarks', muscle.origin, muscle.insertion),
          const SizedBox(height: 16),
          _stepCard(
            'Insertion Strategy',
            muscle.position,
            muscle.electrodeInsertion,
          ),
          const SizedBox(height: 16),
          _testCard('Validation Maneuver', muscle.testManeuver),
          const SizedBox(height: 16),
          _warningCard('Clinical Pitfalls', muscle.pitfalls),
          const SizedBox(height: 16),
          _pearlCard('Expert Clinical Pearl', muscle.pearl),
        ],
      ),
    );
  }

  Widget _infoCard(String title, String origin, String insertion) {
    return _baseCard(title, const Color(0xFF0EA5E9), [
      _subHeader('Origin'),
      Text(
        origin,
        style: const TextStyle(
          fontSize: 14,
          color: Color(0xFF475569),
          height: 1.5,
        ),
      ),
      const SizedBox(height: 12),
      _subHeader('Insertion'),
      Text(
        insertion,
        style: const TextStyle(
          fontSize: 14,
          color: Color(0xFF475569),
          height: 1.5,
        ),
      ),
    ]);
  }

  Widget _stepCard(String title, String position, String insertion) {
    return _baseCard(title, const Color(0xFF6366F1), [
      _subHeader('Patient Position'),
      Text(
        position,
        style: const TextStyle(
          fontSize: 14,
          color: Color(0xFF475569),
          height: 1.5,
        ),
      ),
      const SizedBox(height: 12),
      _subHeader('Needle Entry'),
      Text(
        insertion,
        style: const TextStyle(
          fontSize: 14,
          color: Color(0xFF475569),
          height: 1.5,
        ),
      ),
    ]);
  }

  Widget _testCard(String title, String maneuver) {
    return _baseCard(title, const Color(0xFF8B5CF6), [
      Text(
        maneuver,
        style: const TextStyle(
          fontSize: 14,
          color: Color(0xFF475569),
          height: 1.5,
          fontWeight: FontWeight.w600,
        ),
      ),
    ]);
  }

  Widget _warningCard(String title, String pitfalls) {
    return _baseCard(title, const Color(0xFFF43F5E), [
      Text(
        pitfalls,
        style: const TextStyle(
          fontSize: 14,
          color: Color(0xFF9F1239),
          height: 1.5,
        ),
      ),
    ], bgColor: const Color(0xFFFFF1F2));
  }

  Widget _pearlCard(String title, String pearl) {
    return _baseCard(title, const Color(0xFF10B981), [
      Text(
        pearl,
        style: const TextStyle(
          fontSize: 14,
          color: Color(0xFF065F46),
          height: 1.5,
          fontStyle: FontStyle.italic,
        ),
      ),
    ], bgColor: const Color(0xFFECFDF5));
  }

  Widget _imageCard(String imagePath) {
    return Container(
      width: double.infinity,
      clipBehavior: Clip.antiAlias,
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
      child: Image.asset(
        imagePath,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return Container(
            height: 200,
            color: const Color(0xFFF1F5F9),
            child: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.image_not_supported_outlined,
                    color: Color(0xFF94A3B8),
                    size: 40,
                  ),
                  SizedBox(height: 12),
                  Text(
                    'Image not found',
                    style: TextStyle(color: Color(0xFF64748B), fontSize: 13),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _baseCard(
    String title,
    Color accent,
    List<Widget> children, {
    Color? bgColor,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: bgColor ?? Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title.toUpperCase(),
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w900,
              color: accent,
              letterSpacing: 1.2,
            ),
          ),
          const SizedBox(height: 12),
          ...children,
        ],
      ),
    );
  }

  Widget _subHeader(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w800,
          color: Color(0xFF94A3B8),
        ),
      ),
    );
  }
}

class _QuizTab extends StatelessWidget {
  const _QuizTab();

  @override
  Widget build(BuildContext context) {
    return const QuizSessionView(
      questions: _needleQuizQuestions,
      title: "Needle Mastery",
      subtitle: "Validate your anatomical precision and technical knowledge.",
    );
  }
}

// Redundant local data removed in favor of NeedleLocalizationData

const _needleQuizQuestions = [
  QuizQuestion(
    question:
        "Which muscle is the most distal innervated by the Ulnar nerve and is essential for evaluating Froment's sign?",
    options: [
      "Abductor Pollicis Brevis (APB)",
      "First Dorsal Interosseous (FDI)",
      "Opponens Pollicis",
      "Flexor Carpi Ulnaris",
    ],
    correctIndex: 1,
    explanation:
        "The FIRST DORSAL INTEROSSEOUS (FDI) is the most distal muscle innervated by the ulnar nerve. Weakness here results in Froment's sign, where the patient must substitute the median-innervated FPL for pinching. Sampling FDI is mandatory to differentiate ulnar entrapment at Guyon's canal from lower radiculopathies.",
  ),
  QuizQuestion(
    question:
        "When sampling the Abductor Pollicis Brevis (APB), what is a common technical pitfall if the needle is inserted too deeply?",
    options: [
      "Sampling the Adductor Pollicis",
      "Overshooting into the Opponens Pollicis",
      "Hitting the Radial Artery",
      "Entering the Flexor Pollicis Longus",
    ],
    correctIndex: 1,
    explanation:
        "If you insert the needle too deeply (beyond 1/2 inch) in the thenar eminence, you will overshoot the superficial APB and inadvertently sample the deeper OPPONENS POLLICIS muscle. Precise shallow depth is required for APB.",
  ),
  QuizQuestion(
    question:
        "Which muscle is the 'ultimate test' to rule out a distal radial nerve injury, such as Posterior Interosseous Nerve (PIN) entrapment at the Arcade of Frohse?",
    options: [
      "Extensor Digitorum Communis",
      "Extensor Indicis Proprius (EIP)",
      "Brachioradialis",
      "Extensor Carpi Radialis Longus",
    ],
    correctIndex: 1,
    explanation:
        "The EXTENSOR INDICIS PROPRIUS (EIP) is usually the most distal muscle innervated by the radial nerve complex. It is the definitive muscle to evaluate when ruling out distal PIN entrapment or Saturday night palsy.",
  ),
  QuizQuestion(
    question:
        "To differentiate a high Median nerve injury from Carpal Tunnel Syndrome, which proximal forearm muscle should be sampled?",
    options: [
      "Flexor Digitorum Superficialis",
      "Pronator Teres (PT)",
      "Flexor Carpi Radialis",
      "Palmaris Longus",
    ],
    correctIndex: 1,
    explanation:
        "The PRONATOR TERES (PT) is the most proximal forearm muscle innervated by the median nerve. Because the nerve passes through its two heads, sampling it helps localize entrapment (Pronator Teres Syndrome) vs distal wrist entrapment.",
  ),
  QuizQuestion(
    question:
        "In cases of a suspected C7 radiculopathy, which head of the triceps is generally considered the safest and easiest to sample?",
    options: [
      "Long Head",
      "Medial Head",
      "Lateral Head",
      "All are equally safe",
    ],
    correctIndex: 2,
    explanation:
        "The LATERAL HEAD of the triceps is preferred for routine evaluation. It is critical for C7 isolation; its innervation branches so high in the axilla that it is spared in 'Saturday night palsy' radial nerve compressions at the spiral groove.",
  ),
  QuizQuestion(
    question:
        "Which muscle allows for clear differentiation between an L5 radiculopathy and an isolated Peroneal (Fibular) neuropathy because of its Strong L5-S1 representation?",
    options: [
      "Tibialis Anterior",
      "Extensor Hallucis Longus (EHL)",
      "Peroneus Longus",
      "Gastrocnemius",
    ],
    correctIndex: 1,
    explanation:
        "While Tibialis Anterior is primarily L4-L5, the EXTENSOR HALLUCIS LONGUS (EHL) has a stronger L5-S1 representation. This makes EHL an excellent target to differentiate L5 radiculopathy from isolated peroneal nerve injury.",
  ),
  QuizQuestion(
    question:
        "What is the hallmark clinical sign of severe denervation in the Tibialis Anterior muscle?",
    options: [
      "Inability to jump",
      "Foot drop (loss of dorsiflexion)",
      "Inability to wiggle toes",
      "Severe calf cramping",
    ],
    correctIndex: 1,
    explanation:
        "The TIBIALIS ANTERIOR is the king of foot dorsiflexion. Damage to the deep peroneal nerve or L5 root causes 'FOOT DROP', forcing a high-stepping gait to avoid tripping.",
  ),
  QuizQuestion(
    question:
        "Which muscle is the deepest and most difficult to reach in the posterior leg compartment, but is critical for evaluating L5 root integrity via the Tibial nerve?",
    options: [
      "Soleus",
      "Flexor Hallucis Longus",
      "Tibialis Posterior",
      "Medial Gastrocnemius",
    ],
    correctIndex: 2,
    explanation:
        "The TIBIALIS POSTERIOR is the deepest muscle in the posterior compartment. It is heavily innervated by the L5 root via the Tibial nerve, making it a key discriminator for complex lumbosacral plexopathies.",
  ),
  QuizQuestion(
    question:
        "What is the primary danger when attempting to sample the Tibialis Posterior muscle?",
    options: [
      "Hitting the Sural nerve",
      "Injury to the Posterior Tibial Artery/Nerve bundle",
      "Damaging the Achilles tendon",
      "Overshooting into the Fibula",
    ],
    correctIndex: 1,
    explanation:
        "When sampling Tibialis Posterior, the major neurovascular bundle (POSTERIOR TIBIAL ARTERY and NERVE) lies very close. Clinicians must stay tight to the posterior cortex of the tibia and avoid indiscriminate lateral movements.",
  ),
  QuizQuestion(
    question:
        "Which muscle is the primary shock absorber/extensor of the knee and is the largest component of the quadriceps?",
    options: [
      "Rectus Femoris",
      "Vastus Medialis",
      "Vastus Lateralis",
      "Biceps Femoris",
    ],
    correctIndex: 2,
    explanation:
        "The VASTUS LATERALIS is the largest of the quadriceps. If the Femoral nerve is damaged, the patient loses the ability to lock their knee in extension, causing life-altering instability during walking.",
  ),
];
