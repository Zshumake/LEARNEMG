import 'package:flutter/material.dart';
import '../../data/podcast_data.dart';
import '../podcast/widgets/podcast_trigger_card.dart';

/// Neuropathy Pathophysiology teaching module.
/// Ported from NeuropathyPathophysiology.js and NeuropathyData.js.
class NeuropathyView extends StatelessWidget {
  const NeuropathyView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 6,
      child: Column(
        children: [
          Container(
            color: Theme.of(context).scaffoldBackgroundColor,
            child: const TabBar(
              isScrollable: true,
              indicatorColor: Color(0xFF6B21A8),
              labelColor: Color(0xFF6B21A8),
              unselectedLabelColor: Color(0xFF64748B),
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: [
                Tab(text: 'Anatomy'),
                Tab(text: 'Mechanisms'),
                Tab(text: 'Classification'),
                Tab(text: 'Correlations'),
                Tab(text: 'Fibers'),
                Tab(text: 'Atlas'),
              ],
            ),
          ),
          const Expanded(
            child: TabBarView(
              children: [
                _AnatomyTab(),
                _MechanismsTab(),
                _ClassificationTab(),
                _CorrelationsTab(),
                _FibersTab(),
                _AtlasTab(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ── SHARED COMPONENTS ──────────────────────────────────────────

Widget _sectionTitle(String title) {
  return Text(
    title,
    style: const TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.w900,
      color: Color(0xFF0F172A),
      letterSpacing: -0.5,
    ),
  );
}

Widget _introText(String text) {
  return Padding(
    padding: const EdgeInsets.only(top: 12, bottom: 24),
    child: Text(
      text,
      style: const TextStyle(
        fontSize: 15,
        color: Color(0xFF475569),
        height: 1.6,
      ),
    ),
  );
}

Widget _residentPearl(String title, String text) {
  return Container(
    margin: const EdgeInsets.only(top: 30, bottom: 20),
    padding: const EdgeInsets.all(24),
    decoration: BoxDecoration(
      gradient: const LinearGradient(
        colors: [Color(0xFFFFFBEB), Color(0xFFFEF3C7)],
      ),
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: const Color(0xFFFDE68A)),
      boxShadow: [
        BoxShadow(
          color: const Color(0xFFF59E0B).withValues(alpha: 0.1),
          blurRadius: 15,
          offset: const Offset(0, 4),
        ),
      ],
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(
              Icons.tips_and_updates,
              color: Color(0xFFB45309),
              size: 24,
            ),
            const SizedBox(width: 10),
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                color: Color(0xFFB45309),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Text(
          text,
          style: const TextStyle(
            fontSize: 15,
            color: Color(0xFF92400E),
            height: 1.6,
          ),
        ),
      ],
    ),
  );
}

// ── 1. ANATOMY TAB ──────────────────────────────────────────────

class _AnatomyTab extends StatelessWidget {
  const _AnatomyTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ...PodcastData.getEpisodesByModule(
            'neuropathy-pathophysiology',
          ).map((ep) => PodcastTriggerCard(episode: ep)),
          _sectionTitle("Fundamental Nerve Anatomy"),
          _introText(
            "Before we can understand how nerves break down, we must understand how they are built. The peripheral nerve is a complex, heavily armored micro-cable system.",
          ),

          _buildComponentCard(
            title: "The Nerve Architecture",
            color: const Color(0xFF3B82F6),
            bg: const Color(0xFFF8FAFC),
            points: [
              "Epineurium (The Outer Armor): The heavy-duty connective tissue wrapping the entire nerve. It cushions against physical trauma and compression. This is what the surgeon sees.",
              "Perineurium (The Blood-Nerve Barrier): An incredibly dense sleeve that bundles specific groups of axons into 'fascicles'. This layer actively controls the microenvironment, keeping toxins out. If this is breached, the nerve is highly vulnerable.",
              "Endoneurium (The Inner Wrap): The delicate connective matrix surrounding individual axons and their Schwann cells, maintaining fluid pressure.",
            ],
          ),
          const SizedBox(height: 16),
          _buildComponentCard(
            title: "Schwann Cells & Myelin",
            color: const Color(0xFF22C55E),
            bg: const Color(0xFFF0FDF4),
            points: [
              "The Insulation: Myelin isn't just fat; it is the living cell membrane of a Schwann cell spiraled hundreds of times around an axon. In the PNS, one Schwann cell creates one internode of myelin.",
              "Nodes of Ranvier: The microscopically small, unmyelinated gaps between Schwann cells where the action potential 're-charges' via dense clusters of sodium channels.",
              "Saltatory Conduction: Because of the myelin insulation, the electrical signal doesn't flow like water; it 'jump' (saltates) from Node to Node. This evolutionary masterpiece increases conduction velocity from 1m/s to over 70m/s.",
            ],
          ),
          const SizedBox(height: 30),
          _sectionTitle("Cellular Physiology"),
          _introText(
            "A motor neuron in your spinal cord sending an axon down to your toe is mathematically equivalent to a grapefruit in NYC growing a garden hose to LA.",
          ),

          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              children: [
                _buildPhysPoint(
                  "01",
                  "The Cell Body (Soma): The factory. Located in the anterior horn (motor) or Dorsal Root Ganglion (DRG, sensory). It produces all the proteins, neurotransmitters, and organelles required for the entire nerve.",
                ),
                _buildPhysPoint(
                  "02",
                  "Anterograde Transport: Fast transport (400 mm/day) moves cargo (like vesicles) on microtubule 'tracks' driven by Kinesin motors down to the synapse.",
                ),
                _buildPhysPoint(
                  "03",
                  "Retrograde Transport: Slower transport (200 mm/day) moves waste and chemical 'survival signals' from the muscle back up to the cell body via Dynein motors.",
                ),
                _buildPhysPoint(
                  "04",
                  "The 'Dying Back' Phenomenon: When the cell body is metabolically stressed (e.g., from Diabetes or Toxins), it can no longer maintain its longest, most distant 'hoses'. The axon slowly retreats from the toes upward, creating the classic 'stocking-glove' pattern of length-dependent neuropathy.",
                ),
              ],
            ),
          ),

          _residentPearl(
            "The DRG Pearl",
            "Remember the DRG location! Because the sensory cell body lives outside the spinal cord in the DRG, a herniated disc compressing a nerve root (Radiculopathy) will damage the motor wire but leave the sensory wire physically connected to its life-source. This is why in a Radiculopathy, the sensory study (SNAP) remains completely normal despite the patient feeling numb! It is the most powerful localizing pearl in the lab.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildComponentCard({
    required String title,
    required Color color,
    required Color bg,
    required List<String> points,
  }) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(16),
        border: Border(left: BorderSide(color: color, width: 5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              color: color,
              fontSize: 18,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 15),
          ...points.map(
            (p) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "• ",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Expanded(
                    child: Text(
                      p,
                      style: const TextStyle(
                        fontSize: 14,
                        height: 1.5,
                        color: Color(0xFF334155),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPhysPoint(String num, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            num,
            style: const TextStyle(
              color: Color(0xFF6B21A8),
              fontWeight: FontWeight.w900,
              fontSize: 16,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                fontSize: 14,
                color: Color(0xFF475569),
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── 2. MECHANISMS TAB ───────────────────────────────────────────

class _MechanismsTab extends StatelessWidget {
  const _MechanismsTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("How Nerves Fail"),
          const SizedBox(height: 20),
          _buildMechCard(
            type: "Ischemic Dysfunction",
            subtitle: "(Transient Metabolic Block)",
            color: const Color(0xFFF59E0B),
            bg: const Color(0xFFFFFBEB),
            icon: Icons.flash_off,
            mechanism:
                "Compression restricts microvascular blood flow (vasa nervorum), depriving the nerve of oxygen and ATP. Without ATP, the sodium/potassium pumps fail, and the nerve cannot fire.",
            findings:
                "Purely functional failure. Think of your foot 'falling asleep' when your legs are crossed. There is NO structural damage. The moment pressure is relieved and blood returns, the paresthesias resolve in minutes.",
            prognosis:
                "Immediate and complete recovery. The EDX study is entirely normal (if tested after the numbness resolves).",
          ),
          const SizedBox(height: 20),
          _buildMechCard(
            type: "Local Demyelination",
            subtitle: "(Conduction Block)",
            color: const Color(0xFF3B82F6),
            bg: const Color(0xFFEFF6FF),
            icon: Icons.layers_clear,
            mechanism:
                "Sustained pressure causes local ischemia that damages the delicate Schwann cells. The myelin sheath physically unspools or breaks apart at the site of compression. The underlying axon 'wire' remains perfectly intact.",
            findings:
                "Because the insulation is missing, the electrical signal either 'leaks' and travels incredibly slowly, or it fails to jump the gap entirely (Conduction Block). The patient experiences profound weakness or numbness.",
            prognosis:
                "Excellent! The Schwann cells simply need to re-wrap the nerve. Remyelination takes weeks to months. Because the axon never died, the muscle never atrophies.",
          ),
          const SizedBox(height: 20),
          _buildMechCard(
            type: "Wallerian Degeneration",
            subtitle: "(Axonal Loss)",
            color: const Color(0xFFEF4444),
            bg: const Color(0xFFFEF2F2),
            icon: Icons.scuba_diving_sharp,
            mechanism:
                "Severe crush or cut injury severs the actual axon 'wire'. Without attachment to the cell body, the distal portion of the axon physically dissolves into fragments over 7-10 days, leaving empty myelin tubes behind.",
            findings:
                "The 'road' is broken. On NCS, the amplitude crashes because fewer wires exist to carry the current. On EMG, the disconnected muscle fibers become unstable and cry out spontaneously (Fibrillation potentials & Positive Sharp Waves).",
            prognosis:
                "Guarded to Poor. The nerve must physically regrow from the injury site all the way down to the muscle at a painfully slow rate of 1 millimeter per day (1 inch per month). If it takes too long (e.g., >18 months for a shoulder injury to reach the hand), the muscle turns to fat and the repair fails permanently.",
          ),
          _residentPearl(
            "The 7-Day Waiting Period",
            "Wallerian degeneration takes time. Motor axons dissolve in 5-7 days; sensory in 10-11. Never do an EDX study on a traumatic injury less than a week after the event!",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildMechCard({
    required String type,
    required String subtitle,
    required Color color,
    required Color bg,
    required IconData icon,
    required String mechanism,
    required String findings,
    required String prognosis,
  }) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
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
                      type,
                      style: TextStyle(
                        color: color,
                        fontSize: 18,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    Text(
                      subtitle,
                      style: TextStyle(
                        color: color.withValues(alpha: 0.8),
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          _mechDetail("The 'Why':", mechanism, color),
          _mechDetail("Findings:", findings, color),
          _mechDetail("Prognosis:", prognosis, color),
        ],
      ),
    );
  }

  Widget _mechDetail(String label, String text, Color labelColor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: RichText(
        text: TextSpan(
          style: const TextStyle(
            fontSize: 14,
            color: Color(0xFF334155),
            height: 1.5,
            fontFamily: 'Inter',
          ),
          children: [
            TextSpan(
              text: "$label ",
              style: TextStyle(fontWeight: FontWeight.w900, color: labelColor),
            ),
            TextSpan(text: text),
          ],
        ),
      ),
    );
  }
}

// ── 3. CLASSIFICATION TAB ───────────────────────────────────────

class _ClassificationTab extends StatelessWidget {
  const _ClassificationTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Classification Systems"),
          _introText(
            "Seddon's is the clinical model; Sunderland's provides the microscopic detail required for surgical planning.",
          ),

          _sectionHeader("Seddon's Clinical Classification"),
          Row(
            children: [
              _seddonCard(
                "Neurapraxia",
                "Focal demyelination without axonal damage. Conduction block is present, but recovery is complete (weeks to months) once compression is removed. No Wallerian degeneration occurs.",
                const Color(0xFF6B21A8),
              ),
              const SizedBox(width: 8),
              _seddonCard(
                "Axonotmesis",
                "The axon is severed, but the connective tissue tubes (Endoneurium, Perineurium) are entirely intact. Wallerian degeneration occurs. The nerve regenerates well because it has a perfectly intact 'tunnel' to guide it back to the muscle (1mm/day).",
                const Color(0xFF6B21A8),
              ),
              const SizedBox(width: 8),
              _seddonCard(
                "Neurotmesis",
                "The nerve and all connective tissue sheaths are completely severed (e.g., a knife wound). Spontaneous recovery is impossible. Neuroma formation is common. Requires surgical grafting.",
                const Color(0xFF6B21A8),
              ),
            ],
          ),

          const SizedBox(height: 30),
          _sectionHeader("Sunderland's Anatomical Grades"),
          _buildSunderlandTable(),

          _residentPearl(
            "Why Sunderland Matters",
            "Why does Sunderland matter? If just the endoneurium is torn (Type III), the regenerating nerve sprouts can get 'confused' and grow down the wrong tube, leading to aberrant regeneration (e.g., moving a finger causes the thumb to twitch). If the perineurium is torn (Type IV), scar tissue forms a localized 'knot' (neuroma-in-continuity) that mechanically blocks any regrowth, requiring resection.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _sectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w800,
          color: Color(0xFF0F172A),
        ),
      ),
    );
  }

  Widget _seddonCard(String title, String desc, Color color) {
    return Expanded(
      child: Container(
        height: 120,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border(top: BorderSide(color: color, width: 4)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13),
            ),
            const SizedBox(height: 6),
            Expanded(
              child: Text(
                desc,
                style: const TextStyle(
                  fontSize: 11,
                  color: Color(0xFF64748B),
                  height: 1.4,
                ),
              ),
            ),
          ],
        ),
      ),
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
          columnSpacing: 12, // Reduced for mobile
          headingRowHeight: 48,
          columns: const [
            DataColumn(
              label: Text(
                'Grade',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            DataColumn(
              label: Text(
                'Damage',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            DataColumn(
              label: Text(
                'Seddon',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            DataColumn(
              label: Text(
                'Prognosis',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ],
          rows: [
            _sunRow("Type I", "Myelin damage only", "Neurapraxia", "Complete"),
            _sunRow(
              "Type II",
              "Axon severed, Endoneurium intact",
              "Axonotmesis",
              "Good-Excellent",
            ),
            _sunRow(
              "Type III",
              "Endoneurium disrupted, Perineurium intact",
              "Axonotmesis",
              "Poor-Fair",
            ),
            _sunRow(
              "Type IV",
              "Perineurium disrupted, Epineurium intact",
              "Axonotmesis",
              "Very Poor",
            ),
            _sunRow(
              "Type V",
              "Complete nerve transection",
              "Neurotmesis",
              "None",
            ),
          ],
        ),
      ),
    );
  }

  DataRow _sunRow(String g, String d, String s, String p) {
    return DataRow(
      cells: [
        DataCell(
          Text(
            g,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: Color(0xFF0369A1),
            ),
          ),
        ),
        DataCell(Text(d)),
        DataCell(Text(s, style: const TextStyle(fontSize: 12))),
        DataCell(Text(p, style: const TextStyle(fontWeight: FontWeight.w600))),
      ],
    );
  }
}

// ── 4. CORRELATIONS TAB ─────────────────────────────────────────

class _CorrelationsTab extends StatelessWidget {
  const _CorrelationsTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("The EDX Truth Table"),
          _introText(
            "Electrodiagnosis is about translating physics to biology. 'Is it the Insulation or the Wire?' and 'Where is the break?'",
          ),

          _buildCorrRow(
            "Demyelination",
            "Weakness without atrophy. Numbness.",
            "Velocities SLOW (<75% LLN). Distal Latencies PROLONGED (>130% ULN). Conduction Block. F-waves severely delayed.",
            "Normal appearing motor units, simply firing less often (reduced recruitment). No spontaneous rest activity.",
          ),
          _buildCorrRow(
            "Axonal Loss",
            "Profound atrophy. Weakness. Numbness.",
            "Velocities mostly PRESERVED. CMAP/SNAP Amplitudes severely REDUCED. (The surviving wires conduct at normal speeds, there are just fewer of them).",
            "Spontaneous rest activity (Fibrillation potentials / PSWs). Reinnervation patterns: giant, polyphasic motor units.",
          ),
          _buildCorrRow(
            "Pre-Ganglionic (Radiculopathy)",
            "Pain radiating down limb. Myotomal weakness in a spine-root distribution (e.g., C6).",
            "Sensory SNAPs are perfectly NORMAL. Motor CMAPs may be reduced in severe cases.",
            "Abnormalities found in muscles sharing the same root (e.g., Pronator Teres and Biceps for C6), including the paraspinal muscles of the back.",
          ),
          _buildCorrRow(
            "Post-Ganglionic (Plexopathy/Neuropathy)",
            "Weakness or numbness restricted to a specific peripheral nerve territory (e.g., Ulnar).",
            "Sensory SNAPs are REDUCED or ABSENT (the lesion is distal to the DRG).",
            "Abnormalities strictly limited to muscles innervated by that specific nerve. Paraspinal muscles of the back are perfectly NORMAL.",
          ),

          _residentPearl(
            "The Double Crush Hypothesis",
            "The Double Crush Hypothesis: Nerves rely on high-pressure axoplasmic flow to move nutrients. If a nerve is slightly compressed in the neck (C6 radiculopathy), the nutrient flow is restricted. This makes the nerve 'starved' and incredibly vulnerable to a second compression further down the arm (like Carpal Tunnel Syndrome). This is why patients often have concurrent radiculopathies and focal entrapments.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildCorrRow(String title, String clinical, String ncs, String emg) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 5),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            width: double.infinity,
            decoration: const BoxDecoration(
              color: Color(0xFFF8FAFC),
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
            ),
            child: Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _corrDetail("Clinical:", clinical),
                const SizedBox(height: 12),
                _corrBox(
                  "NCS",
                  ncs,
                  const Color(0xFFEFF6FF),
                  const Color(0xFF1E40AF),
                ),
                const SizedBox(height: 10),
                _corrBox(
                  "EMG",
                  emg,
                  const Color(0xFFFDF4FF),
                  const Color(0xFF86198F),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _corrDetail(String label, String text) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 11,
            color: Color(0xFF64748B),
          ),
        ),
        Text(
          text,
          style: const TextStyle(fontSize: 13, color: Color(0xFF334155)),
        ),
      ],
    );
  }

  Widget _corrBox(String label, String text, Color bg, Color textC) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(8),
        border: Border(left: BorderSide(color: textC, width: 3)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$label: ",
            style: TextStyle(
              fontWeight: FontWeight.w900,
              color: textC,
              fontSize: 12,
            ),
          ),
          Expanded(
            child: Text(text, style: TextStyle(color: textC, fontSize: 12)),
          ),
        ],
      ),
    );
  }
}

// ── 5. FIBERS TAB ──────────────────────────────────────────────

class _FibersTab extends StatelessWidget {
  const _FibersTab();

  @override
  Widget build(BuildContext context) {
    final fibers = [
      (
        'Group A-alpha (Aα)',
        '70-120 m/s',
        'Massive, Heavily Myelinated',
        'Extrafusal Motor driving (muscle contraction) and Proprioception. The \'High-Speed Internet\' lines.',
      ),
      (
        'Group A-beta (Aβ)',
        '30-70 m/s',
        'Large, Moderately Myelinated',
        'Touch, Pressure, and Vibration. (These are the purely sensory fibers we test during a SNAP).',
      ),
      (
        'Group A-gamma (Aγ)',
        '15-30 m/s',
        'Medium Myelinated',
        'Intrafusal Motor to muscle spindles (maintains muscle tone).',
      ),
      (
        'Group A-delta (Aδ)',
        '12-30 m/s',
        'Small, Thinly Myelinated',
        'Sharp, pricking, \'Fast\' Pain and Cold temperature.',
      ),
      (
        'Group C',
        '0.5-2 m/s',
        'Tiny, Unmyelinated',
        'Dull, aching, \'Slow\' Pain, Warm temperature, and Autonomic functions (sweating, heart rate). The \'Dial-up Internet\'.',
      ),
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Fiber Classification"),
          _introText(
            "The peripheral nerve is a mixed cable, but NCS is blind to half of these wires!",
          ),

          ...fibers.map(
            (f) => Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          f.$1,
                          style: const TextStyle(fontWeight: FontWeight.w900),
                        ),
                        Text(
                          f.$3,
                          style: const TextStyle(
                            fontSize: 11,
                            color: Color(0xFF64748B),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          f.$4,
                          style: const TextStyle(
                            fontSize: 13,
                            color: Color(0xFF475569),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      f.$2,
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF475569),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          _residentPearl(
            "The Great Blind Spot of EDX",
            "The Great Blind Spot of EDX: Standard nerve conduction studies ONLY measure the massive, heavily myelinated A-alpha and A-beta fibers. If a patient presents with severe burning pain and temperature loss in their feet, but normal strength and vibration, they likely have a Small Fiber Neuropathy (targeting A-delta and C fibers). Their EMG/NCS will be completely, 100% NORMAL. You must diagnose small fiber disease clinically or via punch skin biopsy, not with EDX!",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }
}

// ── 6. ATLAS TAB ───────────────────────────────────────────────

class _AtlasTab extends StatelessWidget {
  const _AtlasTab();

  @override
  Widget build(BuildContext context) {
    const data = [
      (
        'Median',
        'Carpal Tunnel (Wrist)',
        'APB, OP, FPB, Lumb 1&2',
        'Thumb, index, middle, lateral ring',
        'Prolonged distal latencies',
        'Nocturnal symptoms, Phalen\'s',
      ),
      (
        'Median',
        'Pronator Syndrome (Arm)',
        'CTS muscles + FCR, FPL, FDP(2/3), PQ, PT',
        'CTS territory + Thenar Eminence (Palmar Cutaneous br.)',
        'Slow forearm conduction, Normal Latency',
        'Aching forearm pain, Activity-related, Not nocturnal',
      ),
      (
        'Median',
        'AIN Syndrome (Arm)',
        'FPL, FDP (2/3), PQ',
        'NONE (Pure Motor branch)',
        'Isolated denervation in FPL/PQ',
        'Cannot make the \'OK\' sign; pinch weakness',
      ),
      (
        'Ulnar',
        'Cubital Tunnel (Elbow/UNE)',
        'FCU, FDP (4/5), Hand Intrinsics',
        'Ring, little finger + Dorsal Hand (Dorsal Ulnar Cutaneous)',
        'Slow conduction/Block across elbow',
        'Froment\'s sign, Wartenberg\'s sign',
      ),
      (
        'Ulnar',
        'Guyon\'s Canal (Wrist/UNW)',
        'Hand Intrinsics ONLY',
        'Ring, little finger (Palmar only, Dorsal is spared!)',
        'Normal elbow conduction, prolonged distal unlar latency',
        'No forearm involvement or pain',
      ),
      (
        'Radial',
        'Spiral Groove (Humerus)',
        'Brachioradialis, Extensors (Wrist Drop)',
        'First dorsal web space',
        'Conduction block at spiral groove',
        'Saturday Night Palsy, Triceps SPARED',
      ),
      (
        'Peroneal',
        'Fibular Head (Knee)',
        'Tibialis Anterior (Foot Drop), Extensors',
        'Dorsal foot, lateral calf',
        'Conduction block at fibular head',
        'Painless acute foot drop after leg crossing/squatting',
      ),
      (
        'Tibial',
        'Tarsal Tunnel (Ankle)',
        'Intrinsic foot muscles (AH, ADM)',
        'Plantar surface of foot',
        'Prolonged medial/lateral plantar latencies',
        'Burning plantar pain, worse with standing',
      ),
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Master Entrapment Atlas"),
          _introText("A comprehensive guide to classic compressive patterns."),

          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                columns: const [
                  DataColumn(label: Text('Nerve')),
                  DataColumn(label: Text('Site')),
                  DataColumn(label: Text('Motor')),
                  DataColumn(label: Text('Classic Sign')),
                ],
                rows: data
                    .map(
                      (r) => DataRow(
                        cells: [
                          DataCell(
                            Text(
                              r.$1,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          DataCell(Text(r.$2)),
                          DataCell(
                            Text(r.$3, style: const TextStyle(fontSize: 11)),
                          ),
                          DataCell(
                            Text(
                              r.$6,
                              style: const TextStyle(
                                fontSize: 11,
                                fontStyle: FontStyle.italic,
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                    .toList(),
              ),
            ),
          ),

          const SizedBox(height: 30),
          _sectionTitle("Quiz Time"),
          _introText("Test your understanding of Neuropathy Pathophysiology."),
          ..._quizQuestions.asMap().entries.map(
            (e) => _NeuropathyQuizCard(index: e.key, q: e.value),
          ),
          const SizedBox(height: 60),
        ],
      ),
    );
  }
}

// ── QUIZ DATA / WIDGET ──────────────────────────────────────────

class _NeuropathyQuiz {
  final String question;
  final List<String> options;
  final int correct;
  final String explanation;
  const _NeuropathyQuiz({
    required this.question,
    required this.options,
    required this.correct,
    required this.explanation,
  });
}

const _quizQuestions = [
  _NeuropathyQuiz(
    question:
        "What is the primary pathological difference between demyelinating and axonal neuropathies?",
    options: [
      "Demyelinating affects myelin; axonal affects the axon",
      "Demyelinating is painful; axonal is painless",
      "Demyelinating is proximal; axonal is distal",
      "Demyelinating is motor; axonal is sensory",
    ],
    correct: 0,
    explanation:
        "Demyelinating neuropathies damage Schwann cells (myelin), slowing signals. Axonal neuropathies involve degeneration of the axon itself, reducing amplitudes.",
  ),
  _NeuropathyQuiz(
    question:
        "In a demyelinating neuropathy, what is the most characteristic NCS finding?",
    options: [
      "Reduced amplitudes, normal velocity",
      "Slowed velocity with conduction blocks",
      "Fibrillation potentials",
      "Reduced recruitment",
    ],
    correct: 1,
    explanation:
        "Slowed conduction velocity and conduction blocks are the hallmarks of demyelination due to disruption of saltatory conduction.",
  ),
  _NeuropathyQuiz(
    question: "What indicate axonal loss rather than demyelination on NCS?",
    options: [
      "Prolonged latencies",
      "Temporal dispersion",
      "Reduced amplitudes with normal velocity",
      "Conduction block",
    ],
    correct: 2,
    explanation:
        "Reduced amplitudes reflect fewer functioning axons. Surviving axons conduct normally, so velocity stays near-normal.",
  ),
];

class _NeuropathyQuizCard extends StatefulWidget {
  final int index;
  final _NeuropathyQuiz q;
  const _NeuropathyQuizCard({required this.index, required this.q});

  @override
  State<_NeuropathyQuizCard> createState() => _NeuropathyQuizCardState();
}

class _NeuropathyQuizCardState extends State<_NeuropathyQuizCard> {
  int? _selected;
  bool _submitted = false;

  @override
  Widget build(BuildContext context) {
    final q = widget.q;
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Q${widget.index + 1}. ${q.question}',
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 12),
          ...q.options.asMap().entries.map((e) {
            final i = e.key;
            final isCorrect = i == q.correct;
            Color bg = Colors.white;
            if (_submitted) {
              if (isCorrect) {
                bg = const Color(0xFFD1FAE5);
              } else if (_selected == i) {
                bg = const Color(0xFFFEE2E2);
              }
            } else if (_selected == i) {
              bg = const Color(0xFFE0F2FE);
            }

            return Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: InkWell(
                onTap: _submitted ? null : () => setState(() => _selected = i),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: bg,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: _selected == i
                          ? const Color(0xFF6B21A8)
                          : const Color(0xFFE2E8F0),
                    ),
                  ),
                  child: Text(e.value, style: const TextStyle(fontSize: 13)),
                ),
              ),
            );
          }),
          if (!_submitted)
            ElevatedButton(
              onPressed: _selected != null
                  ? () => setState(() => _submitted = true)
                  : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF6B21A8),
                foregroundColor: Colors.white,
              ),
              child: const Text('Submit'),
            ),
          if (_submitted)
            Padding(
              padding: const EdgeInsets.only(top: 10),
              child: Text(
                q.explanation,
                style: const TextStyle(
                  fontSize: 12,
                  color: Color(0xFF64748B),
                  fontStyle: FontStyle.italic,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
