import 'package:flutter/material.dart';
import '../../core/models/quiz_model.dart';
import '../../core/widgets/quiz_session_view.dart';

/// NCS Fundamentals teaching module.
/// Ported from NCSFundamentalsData.js and Fundamentals.js.
class NCSFundamentalsView extends StatelessWidget {
  const NCSFundamentalsView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 7,
      child: Column(
        children: [
          _buildHeroSection(),
          Container(
            color: Theme.of(context).scaffoldBackgroundColor,
            child: const TabBar(
              isScrollable: true,
              indicatorColor: Color(0xFF2563EB),
              padding: EdgeInsets.symmetric(horizontal: 8),
              labelColor: Color(0xFF2563EB),
              unselectedLabelColor: Color(0xFF64748B),
              labelStyle: TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
              tabs: [
                Tab(text: 'Foundations'),
                Tab(text: 'Methods'),
                Tab(text: 'Technical'),
                Tab(text: 'Interpretation'),
                Tab(text: 'Math'),
                Tab(text: 'Quiz'),
                Tab(text: 'Glossary'),
              ],
            ),
          ),
          const Expanded(
            child: TabBarView(
              children: [
                _FoundationsTab(),
                _MethodsTab(),
                _TechnicalTab(),
                _InterpretationTab(),
                _MathTab(),
                _QuizTab(),
                _GlossaryTab(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeroSection() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFFF8FAFC), Color(0xFFF1F5F9)],
        ),
        border: const Border(bottom: BorderSide(color: Color(0xFFE2E8F0))),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Expanded(
                child: Text(
                  "NCS: The Master Fundamentals",
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF1E293B),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          const Text(
            "Welcome to the core logic of Nerve Conduction Studies. In this module, we move beyond simple anatomy to the electrical physics of the human body. Understanding these 'rules of the game' is what separates a technician from a true clinical electrodiagnostician.",
            style: TextStyle(
              fontSize: 14,
              color: Color(0xFF475569),
              fontWeight: FontWeight.w500,
              height: 1.6,
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
        colors: [Color(0xFFEFF6FF), Color(0xFFDBEAFE)],
      ),
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: const Color(0xFFBFDBFE)),
      boxShadow: [
        BoxShadow(
          color: const Color(0xFF3B82F6).withValues(alpha: 0.1),
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
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                color: Color(0xFF1D4ED8),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Text(
          text,
          style: const TextStyle(
            fontSize: 15,
            color: Color(0xFF1E3A8A),
            height: 1.6,
          ),
        ),
      ],
    ),
  );
}

// ── 1. FOUNDATIONS TAB ──────────────────────────────────────────

class _FoundationsTab extends StatelessWidget {
  const _FoundationsTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Physics & Physiology Foundations"),
          _introText(
            "Before picking up a stimulator, we must understand the fundamental biophysics of the peripheral nervous system. Nerve conduction studies (NCS) are simply a way to artificially trigger and measure the body's natural electrical signaling system.",
          ),

          const Text(
            "The Action Potential Timeline",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: Color(0xFF2563EB),
            ),
          ),
          const SizedBox(height: 15),
          _buildActionPotentialTimeline(),

          const SizedBox(height: 30),
          _sectionTitle("Saltatory Conduction: The Need for Speed"),
          _introText(
            "If electrical signals simply washed down the length of an axon like water through a hose, conduction velocity would be incredibly slow (about 1-2 m/s). This is far too slow for complex animals to survive. Evolution solved this with Myelin insulation wrapped around the axon by Schwann cells. Between these insulated segments are microscopic gaps called the Nodes of Ranvier, which contain massive clusters of sodium channels.",
          ),

          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFBFDBFE)),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "The 'Jumping' Process",
                  style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                ),
                SizedBox(height: 10),
                Text(
                  "The action potential does not flow continuously; it 'jumps' (saltates) from node to node, increasing speed up to 70 m/s or more. Think of saltatory conduction like a staircase on a graph of distance versus time. At the node (the vertical step), the nerve takes a fraction of a millisecond to depolarize. Across the internode of myelin (the horizontal step), the electrical field propagates almost instantaneously. If the myelin is damaged (demyelination), the signal leaks out, takes longer to reach the next node, and conduction velocity plummets.",
                  style: TextStyle(
                    fontSize: 14,
                    height: 1.5,
                    color: Color(0xFF1E3A8A),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 30),
          const Text(
            "Fiber Type Capabilities",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: Color(0xFF2563EB),
            ),
          ),
          const SizedBox(height: 15),
          _buildFiberTypeGrid(),

          _residentPearl(
            "The Great Blind Spot of Electrodiagnosis",
            "Standard NCS equipment only has the resolution to 'see' the massive A-alpha (motor) and A-beta (sensory) fibers. We are completely blind to the A-delta and C fibers. If a patient comes to your clinic complaining of severe burning pain in their feet and loss of temperature sensation, but they have normal strength and vibration, they likely have a Small Fiber Neuropathy. Their EDX study will be 100% normal. You must diagnose small fiber disease clinically or with a specialized skin punch biopsy.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildActionPotentialTimeline() {
    final stages = [
      (
        'Resting State',
        '-70mV',
        'The nerve is negatively charged relative to the outside. This is actively maintained by the Na+/K+ ATPase pump, which burns ATP to constantly push 3 Na+ ions out for every 2 K+ ions it pulls in. The nerve is a loaded spring, waiting to fire.',
      ),
      (
        'Threshold',
        '-55mV',
        'When a stimulus (either natural or from our stimulator) pushes the local charge from -70mV up to -55mV, an explosive chain reaction begins. Voltage-gated Na+ channels suddenly pop open.',
      ),
      (
        'Depolarization',
        '+30mV',
        'Na+ floods into the cell, rapidly shifting the internal charge from negative to positive. This is the "all-or-none" action potential spike we record on the screen.',
      ),
      (
        'Repolarization',
        'Restoring',
        'The Na+ channels quickly snap shut (inactivation), and K+ channels open. K+ rushes out of the cell, dropping the internal charge back toward negative.',
      ),
      (
        'Hyperpolarization',
        'Overshoot',
        'The K+ channels are slightly slow to close, allowing too much positive charge to escape. The potential briefly drops below -70mV before the resting state is restored.',
      ),
    ];

    return Column(
      children: stages
          .asMap()
          .entries
          .map(
            (e) => Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: e.key % 2 == 0 ? Colors.white : const Color(0xFFF8FAFC),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Row(
                children: [
                  SizedBox(
                    width: 100,
                    child: Text(
                      e.value.$1,
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 13,
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEF3C7),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      e.value.$2,
                      style: const TextStyle(
                        fontFamily: 'monospace',
                        fontWeight: FontWeight.w700,
                        color: Color(0xFFB45309),
                        fontSize: 12,
                      ),
                    ),
                  ),
                  const SizedBox(width: 15),
                  Expanded(
                    child: Text(
                      e.value.$3,
                      style: const TextStyle(
                        fontSize: 12,
                        color: Color(0xFF475569),
                        height: 1.4,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          )
          .toList(),
    );
  }

  Widget _buildFiberTypeGrid() {
    final fibers = [
      (
        'A-alpha',
        '70-120 m/s',
        'Massive',
        'Motor contraction & Proprioception.',
        const Color(0xFF1E40AF),
      ),
      (
        'A-beta',
        '35-75 m/s',
        'Large',
        'These are the large, moderately myelinated sensory fibers responsible for Light Touch, Pressure, and Vibration. When we perform a standard Sensory Nerve Action Potential (SNAP) study in the clinic, THESE are the ONLY sensory fibers we are measuring.',
        const Color(0xFF047857),
      ),
      (
        'A-delta',
        '5-30 m/s',
        'Small',
        'Small, thinly myelinated fibers. They carry the sensation of Sharp, pricking, "Fast" Pain and Cold temperature.',
        const Color(0xFFB45309),
      ),
      (
        'C',
        '0.5-2 m/s',
        'Tiny',
        'The "Dial-up Internet". These are tiny, unmyelinated fibers. They carry Dull, aching, "Slow" Pain, Warm temperature perception, and Autonomic functions (sweating, heart rate). Because they lack myelin, their conduction is painfully slow.',
        const Color(0xFF475569),
      ),
    ];

    return Column(
      children: fibers
          .map(
            (f) => Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border(left: BorderSide(color: f.$5, width: 6)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.02),
                    blurRadius: 5,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        f.$1,
                        style: const TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 16,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF0FDF4),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          f.$2,
                          style: const TextStyle(
                            color: Color(0xFF166534),
                            fontWeight: FontWeight.w800,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    f.$4,
                    style: const TextStyle(
                      fontSize: 13,
                      color: Color(0xFF334155),
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
          )
          .toList(),
    );
  }
}

// ── 2. METHODS TAB ──────────────────────────────────────────────

class _MethodsTab extends StatelessWidget {
  const _MethodsTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Setup & Methods"),
          _introText(
            "The machine does not know human anatomy; it only knows the electrical difference between two metal discs.",
          ),

          _buildMontageSection(),
          const SizedBox(height: 30),

          const Text(
            "Targeting Sensory Signals",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: Color(0xFF2563EB),
            ),
          ),
          const SizedBox(height: 15),
          _buildDirectionCards(),

          _residentPearl(
            "Initial Positive Deflection",
            "When you do a motor study, the very first movement of the waveform on the screen should always be sharply upward (Negative, by convention). If you hit the stimulator and the waveform dips downward initially, there is a 99% chance your G1 (Active) electrode is NOT placed over the center of the muscle belly. Move the G1 electrode until the downward dip disappears and the waveform rockets straight up. This single maneuver will save you from inaccurate latency measurements.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildMontageSection() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "The Belly-Tendon Montage",
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
          ),
          const SizedBox(height: 20),
          _montageItem(
            "G1 (Active)",
            "Place directly over the motor endplate (muscle belly) or target nerve.",
            const Color(0xFF1E293B),
            Colors.white,
          ),
          const SizedBox(height: 12),
          _montageItem(
            "G2 (Reference)",
            "Place over an electrically silent area (distal tendon or finger).",
            Colors.white,
            const Color(0xFF334155),
          ),
          const SizedBox(height: 15),
          const Text(
            "Differential Amplification: The amplifier is designed to calculate (G1 - G2). It takes whatever signal hits the G1 electrode and subtracts whatever signal hits the G2 electrode. It also throws out any signal that hits BOTH electrodes simultaneously (Common Mode Rejection), which eliminates 60Hz ambient room noise. You want a massive signal at G1 and absolute silence at G2.",
            style: TextStyle(
              fontSize: 13,
              fontStyle: FontStyle.italic,
              color: Color(0xFF475569),
            ),
          ),
        ],
      ),
    );
  }

  Widget _montageItem(String label, String desc, Color bg, Color textColor) {
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFCBD5E1)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$label: ",
            style: TextStyle(fontWeight: FontWeight.w900, color: textColor),
          ),
          Expanded(
            child: Text(
              desc,
              style: TextStyle(
                color: textColor.withValues(alpha: 0.9),
                fontSize: 13,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDirectionCards() {
    return Column(
      children: [
        _directionCard(
          "Antidromic Sensory Study",
          "Stimulating in the 'wrong' direction. The signal travels AWAY from the spinal cord, toward the sensory receptor (e.g., shocking the median nerve at the wrist and recording on the index finger).",
          "This produces much larger sensory amplitudes because the digital nerves in the finger are extremely superficial and close to the recording electrodes.",
          "Because you are shocking a mixed nerve at the wrist, the motor fibers also fire! This creates a massive muscle twitch in the hand, which causes a volume-conducted 'motor artifact' that can obscure the end of your tiny sensory response. Ensure your SNAP duration is brief.",
          const Color(0xFF3B82F6),
        ),
        const SizedBox(height: 16),
        _directionCard(
          "Orthodromic Sensory Study",
          "Stimulating in the 'correct' physiological direction. The signal travels TOWARD the spinal cord (e.g., shocking the index finger and recording the median nerve at the wrist).",
          "Perfectly clean baseline. Because there are no motor fibers in the finger, you only stimulate sensory fibers. There is no muscle twitch artifact.",
          "Produces much smaller amplitudes compared to antidromic methods because the nerve is buried deeper under tendons and fascia at the wrist recording site.",
          const Color(0xFF14B8A6),
        ),
      ],
    );
  }

  Widget _directionCard(
    String title,
    String flow,
    String pros,
    String cons,
    Color theme,
  ) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: theme),
        boxShadow: [
          BoxShadow(color: theme.withValues(alpha: 0.05), blurRadius: 10),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              color: theme,
              fontWeight: FontWeight.w900,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 5),
          Text(
            flow,
            style: const TextStyle(fontSize: 13, color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 15),
          _proCon(
            "PROS:",
            pros,
            const Color(0xFF166534),
            const Color(0xFFF0FDF4),
          ),
          const SizedBox(height: 8),
          _proCon(
            "CONS:",
            cons,
            const Color(0xFF991B1B),
            const Color(0xFFFEF2F2),
          ),
        ],
      ),
    );
  }

  Widget _proCon(String label, String text, Color c, Color bg) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 11,
              color: c,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(text, style: TextStyle(fontSize: 12, color: c)),
          ),
        ],
      ),
    );
  }
}

// ── 3. TECHNICAL TAB ────────────────────────────────────────────

class _TechnicalTab extends StatelessWidget {
  const _TechnicalTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Technical Pitfalls"),
          _introText(
            "Artifacts and environmental factors can aggressively masquerade as severe pathology.",
          ),

          _sectionTitle("Technical Factors & Pitfalls"),
          _introText(
            "In electrodiagnosis, your results are only as good as your technical setup. External factors like skin temperature, electrode placement, and ambient electrical noise can completely ruin a study if not addressed.",
          ),
          _buildTemperatureCard(),
          const SizedBox(height: 20),
          _buildFilterGrid(), // Assuming _buildFilterGrid is intended here, as _buildFilterCard is not defined as a standalone widget in the original code.
          const SizedBox(height: 40),
          _sectionTitle("Troubleshooting Noise"),
          _introText(
            "The EMG lab is a hostile electrical environment. Hospital beds, fluorescent lights, and wall outlets all bleed noise into your recording.",
          ),
          _buildNoiseSection(),
          const SizedBox(height: 20),
          _buildArtifactSection(),
          const SizedBox(height: 40),

          _residentPearl(
            "Cathode Position",
            "Ensure the Cathode (black prong) aims TOWARD recording electrodes. Depolarization starts there; reversing it artificially prolongs latency measurements.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildTemperatureCard() {
    return Container(
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFF59E0B), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Temperature: The Silent Saboteur",
            style: TextStyle(
              color: Color(0xFFB45309),
              fontWeight: FontWeight.w900,
              fontSize: 20,
            ),
          ),
          const SizedBox(height: 15),
          const Text(
            "Skin temperature is the most critical technical factor in all of electrodiagnosis. When a nerve gets cold, its sodium channels physically open and close more slowly. Cold nerves conduct electricity slowly, and the latencies become prolonged. Crucially, because the depolarization of individual muscle fibers happens more slowly, there is less 'phase cancellation'. This paradoxically causes the waveform amplitude to INCREASE.",
            style: TextStyle(
              color: Color(0xFF92400E),
              fontSize: 13,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFFF59E0B)),
            ),
            child: const Center(
              child: Text(
                "The Golden Rule: Cool limb = Slowed Conduction + Higher Amplitude. Cold limbs perfectly mimic demyelinating neuropathies! For every 1°C drop below normal, conduction velocity slows by 1.5 - 2.5 m/s, and distal latency prolongs by 0.2 ms.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 12,
                  color: Color(0xFFB45309),
                ),
              ),
            ),
          ),
          const SizedBox(height: 10),
          const Center(
            child: Text(
              "Target Temp: 32-34°C",
              style: TextStyle(
                fontWeight: FontWeight.w800,
                color: Color(0xFF78350F),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterGrid() {
    return Row(
      children: [
        _filterCard("Motor (CMAP)", "10 Hz", "10 kHz", "Massive, slow waves."),
        const SizedBox(width: 12),
        _filterCard("Sensory (SNAP)", "20 Hz", "2 kHz", "Tiny, fast waves."),
      ],
    );
  }

  Widget _filterCard(String title, String lff, String hff, String note) {
    return Expanded(
      child: Container(
        height: 160,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: const Color(0xFFE2E8F0)),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
            ),
            const SizedBox(height: 15),
            _filterRow(
              "LFF:",
              lff,
              const Color(0xFF1D4ED8),
              const Color(0xFFEFF6FF),
            ),
            _filterRow(
              "HFF:",
              hff,
              const Color(0xFFB91C1C),
              const Color(0xFFFEF2F2),
            ),
            const Spacer(),
            Text(
              note,
              style: const TextStyle(
                fontSize: 10,
                color: Color(0xFF64748B),
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNoiseSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFCBD5E1)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.bolt, color: Color(0xFF64748B)),
              const SizedBox(width: 8),
              const Text(
                "60 Hz Interference",
                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
              ),
            ],
          ),
          const SizedBox(height: 10),
          const Text(
            "Fuzzy, continuous oscillations tracking at 60 cycles/sec. Radiates from wall outlets and lighting.",
            style: TextStyle(
              fontSize: 13,
              color: Color(0xFF334155),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            "FIX: Ensure skin impedance is equal at G1 and G2. Scrub with alcohol, use gel, and ensure ground placement is secure.",
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              color: Color(0xFF1E293B),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildArtifactSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFFDF2F8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFFBCFE8)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.waves, color: Color(0xFFDB2777)),
              const SizedBox(width: 8),
              const Text(
                "Stimulus Artifact Mitigation",
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  fontSize: 16,
                  color: Color(0xFF9D174D),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _artifactTip(
            "Place the ground electrode between the stimulator and G1.",
          ),
          _artifactTip(
            "Rotate the Anode around the Cathode to shift polarity.",
          ),
          _artifactTip(
            "Ensure minimal distance between stimulator probes and skin surface.",
          ),
          _artifactTip(
            "Use a dry cloth to remove excess gel bridges between electrodes.",
          ),
        ],
      ),
    );
  }

  Widget _artifactTip(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        children: [
          const Icon(
            Icons.check_circle_outline,
            size: 14,
            color: Color(0xFFBE185D),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(fontSize: 12, color: Color(0xFF831843)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _filterRow(String label, String val, Color c, Color bg) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: bg,
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(
              val,
              style: TextStyle(
                color: c,
                fontWeight: FontWeight.bold,
                fontSize: 11,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── 4. INTERPRETATION TAB ──────────────────────────────────────

class _InterpretationTab extends StatelessWidget {
  const _InterpretationTab();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("The Art of Interpretation"),
          _introText("Primary question: Is this Axonal Loss or Demyelination?"),

          _interpretationCard(
            "Axonal Loss Pattern",
            "Severely Reduced Amplitudes",
            "Functional 'wires' (axons) are physically dead. However, the surviving wires conduct perfectly normally. Therefore, Velocity & Latency will stay >75% of normal values.",
            "Remember: Wallerian degeneration takes 3-5 days (motor) or 6-10 days (sensory) to complete. You cannot reliably diagnose axonal loss 1 hour after an injury.",
            const Color(0xFFEF4444),
          ),
          const SizedBox(height: 20),
          _interpretationCard(
            "Demyelinating Pattern",
            "Marked Slowing & Prolonged Latencies",
            "The insulation (myelin) is stripped, causing current leakage. Velocities crash (<75% normal). Amplitudes stay robust initially, but waveforms often become widened or 'dispersed'.",
            "Temporal Dispersion: Waveforms spread out like a fan as some fibers conduct much faster than others.",
            const Color(0xFF3B82F6),
          ),
          const SizedBox(height: 20),
          _interpretationCard(
            "Focal Conduction Block",
            ">50% Focal Drop in Amplitude",
            "A sudden massive drop in amplitude between wrist and elbow stimulation (with no significant dispersion). The signal hits a focal myelin roadblock and simply stops.",
            "The axons are alive, but they are 'frozen' at a single spot along the nerve pathway.",
            const Color(0xFFA855F7),
          ),

          _residentPearl(
            "The 75% Rule of Thumb",
            "In electrodiagnosis, 75% is the magic number. If velocity falls below 75% of the lower limit of normal, it's primary demyelination. Axonal loss alone almost never drags surviving fibers below 75%, because the fastest-conducting large fibers are usually the last to die.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _interpretationCard(
    String title,
    String keyFinding,
    String detail,
    String note,
    Color theme,
  ) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border(left: BorderSide(color: theme, width: 8)),
        boxShadow: [
          BoxShadow(color: theme.withValues(alpha: 0.1), blurRadius: 15),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              color: theme,
              fontWeight: FontWeight.w900,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            width: double.infinity,
            decoration: BoxDecoration(
              color: theme.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              keyFinding,
              style: TextStyle(
                fontWeight: FontWeight.w900,
                color: theme,
                fontSize: 13,
              ),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            detail,
            style: const TextStyle(
              fontSize: 14,
              color: Color(0xFF475569),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            note,
            style: TextStyle(
              fontSize: 12,
              color: theme.withValues(alpha: 0.8),
              fontStyle: FontStyle.italic,
            ),
          ),
        ],
      ),
    );
  }
}

// ── 5. MATH TAB ────────────────────────────────────────────────

class _MathTab extends StatefulWidget {
  const _MathTab();

  @override
  State<_MathTab> createState() => _MathTabState();
}

class _MathTabState extends State<_MathTab> {
  final Map<int, bool?> _answers = {};

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Clinical Mathematics"),
          _introText("Master the physics of Conduction Velocity calculation."),

          Container(
            padding: const EdgeInsets.all(30),
            width: double.infinity,
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Column(
              children: [
                Text(
                  "THE MASTER FORMULA",
                  style: TextStyle(
                    color: Color(0xFF94A3B8),
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 2,
                  ),
                ),
                SizedBox(height: 15),
                Text(
                  "CV (m/s) = Distance (mm) / Δ Latency (ms)",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    fontFamily: 'monospace',
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 30),
          _buildScenario(
            0,
            "Median Motor: Distance 250mm, Elbow Latency 8.5ms, Wrist Latency 3.5ms.",
            "50 m/s",
            "Perfect. Step 1: Subtract the latencies. (8.5 - 3.5 = 5.0 milliseconds). This 5.0 ms is the pure nerve travel time through the forearm, completely stripping away the time it took to cross the neuromuscular junction. Step 2: Divide distance by time. (250 mm / 5.0 ms = 50 m/s). This is a completely healthy, perfectly normal conduction velocity.",
          ),
          _buildScenario(
            1,
            "Ulnar Motor: Distance 300mm, Elbow Latency 12.8ms, Wrist Latency 2.8ms.",
            "30 m/s",
            "Correct. Step 1: Subtract the latencies. (12.8 - 2.8 = 10.0 milliseconds). Step 2: Divide distance by time. (300 mm / 10.0 ms = 30 m/s). This velocity has crashed into the 30s. This is a severe primary demyelinating neuropathy, moving slowly enough to confidently diagnose demyelination using the 75% rule.",
          ),

          _residentPearl(
            "Why Subtract?",
            "The chemical delay at the NMJ is incredibly slow. Subtracting distal latency isolates pure nerve travel time, preventing artificially slow calculations.",
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildScenario(
    int idx,
    String scenario,
    String correctVal,
    String explanation,
  ) {
    final choices = [correctVal, "40 m/s", "60 m/s"]..shuffle();
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Scenario ${idx + 1}",
            style: const TextStyle(
              fontWeight: FontWeight.w900,
              fontSize: 12,
              color: Color(0xFF2563EB),
            ),
          ),
          const SizedBox(height: 8),
          Text(scenario, style: const TextStyle(fontSize: 15, height: 1.4)),
          const SizedBox(height: 20),
          Row(
            children: choices
                .map(
                  (c) => Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: ElevatedButton(
                        onPressed: _answers[idx] != null
                            ? null
                            : () => setState(
                                () => _answers[idx] = (c == correctVal),
                              ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _answers[idx] != null
                              ? (c == correctVal
                                    ? const Color(0xFFD1FAE5)
                                    : const Color(0xFFF1F5F9))
                              : Colors.white,
                          foregroundColor: const Color(0xFF1E293B),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          elevation: 0,
                          side: const BorderSide(color: Color(0xFFE2E8F0)),
                        ),
                        child: Text(
                          c,
                          style: const TextStyle(fontWeight: FontWeight.w700),
                        ),
                      ),
                    ),
                  ),
                )
                .toList(),
          ),
          if (_answers[idx] != null) ...[
            const SizedBox(height: 15),
            Text(
              explanation,
              style: const TextStyle(
                fontSize: 12,
                color: Color(0xFF64748B),
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

// ── 6. QUIZ TAB ────────────────────────────────────────────────

class _QuizTab extends StatelessWidget {
  const _QuizTab();

  @override
  Widget build(BuildContext context) {
    return const QuizSessionView(
      questions: _ncsQuizQuestions,
      title: "NCS Fundamentals",
      subtitle:
          "Validate your mastery of the electrical physics of the human body.",
    );
  }
}

const _ncsQuizQuestions = [
  QuizQuestion(
    question:
        "What is the primary physiological mechanism underlying saltatory conduction in myelinated nerve fibers?",
    options: [
      "Continuous depolarization along the entire axon membrane",
      "Action potentials 'jump' between nodes of Ranvier, depolarizing only at nodes",
      "Myelin increases the resistance of the axon membrane uniformly",
      "Schwann cells actively conduct the electrical signal",
    ],
    correctIndex: 1,
    explanation:
        "SALTATORY CONDUCTION occurs when action potentials 'JUMP' between nodes of Ranvier in myelinated fibers. This mechanism: (1) increases conduction velocity 50x compared to unmyelinated fibers, (2) requires depolarization only at nodes rather than continuously, (3) is energy efficient by reducing the membrane area requiring active Na+/K+ pumping. Myelination by Schwann cells insulates internodal segments, concentrating voltage-gated channels at nodes.",
  ),
  QuizQuestion(
    question:
        "A technician performs an NCS on a patient with icy cold hands from walking outside in the winter. What pattern is this most likely to mimic on the screen?",
    options: [
      "Severe Axonal Loss",
      "A Primary Demyelinating Neuropathy",
      "Complete Nerve Transection",
    ],
    correctIndex: 1,
    explanation:
        "Cold temperatures decisively slow down nerve conduction velocity and prolong latencies, perfectly mirroring the cardinal signs of demyelination. It also paradoxically increases amplitude.",
  ),
  QuizQuestion(
    question:
        "In nerve conduction studies, what does CMAP amplitude primarily reflect?",
    options: [
      "The speed of the fastest conducting motor fibers",
      "The number of functioning motor axons",
      "The degree of myelination of the nerve",
      "The distance between stimulation sites",
    ],
    correctIndex: 1,
    explanation:
        "CMAP AMPLITUDE reflects the NUMBER OF FUNCTIONING MOTOR AXONS. When measured from baseline to negative peak (in millivolts), amplitude indicates how many motor units are contributing to the response. AXONAL LOSS causes amplitude reduction because fewer axons depolarize muscle fibers.",
  ),
  QuizQuestion(
    question:
        "You stimulate the ulnar nerve at the wrist, but note the initial deflection off the baseline is a sharp positive (downward) dip before going upward. What is the most likely cause?",
    options: [
      "The G1 (Active) electrode is not placed over the true motor endpoint",
      "The patient has a conduction block at the elbow",
      "The stimulus intensity is not supramaximal",
    ],
    correctIndex: 0,
    explanation:
        "If G1 is off the motor endpoint, it records the approaching electrical wavefront as volume conduction before the muscle fully depolarizes under it, creating an initial positive (downward) dip.",
  ),
  QuizQuestion(
    question:
        "What is supramaximal stimulation, and why is it necessary in motor NCS?",
    options: [
      "Stimulation at the maximum tolerable intensity for the patient",
      "Stimulation 20-50% above threshold to ensure all axons depolarize",
      "The highest stimulus intensity the equipment can produce",
      "Stimulation that produces a painful sensation",
    ],
    correctIndex: 1,
    explanation:
        "SUPRAMAXIMAL STIMULATION is 20-50% ABOVE the stimulus intensity that produces maximum CMAP amplitude. This ensures ALL motor axons in the nerve are depolarized. Submaximal stimulation causes errors: (1) underestimates amplitude, (2) overestimates conduction velocity (only fastest fibers activated).",
  ),
  QuizQuestion(
    question:
        "Which of the following fibers are you actually evaluating when performing a standard Sural Sensory Nerve Action Potential (SNAP) study?",
    options: [
      "Unmyelinated C-fibers",
      "A-delta fibers",
      "Large, myelinated A-beta fibers",
    ],
    correctIndex: 2,
    explanation:
        "Standard EDX machines only have the power to resolve the massive, high-speed A-alpha and A-beta fibers. We are completely blind to small pain fibers (A-delta and C fibers).",
  ),
  QuizQuestion(
    question:
        "What is the key difference in how CMAP amplitude versus SNAP amplitude is measured?",
    options: [
      "CMAP: baseline-to-peak (mV); SNAP: peak-to-peak (μV)",
      "CMAP: peak-to-peak (mV); SNAP: baseline-to-peak (μV)",
      "Both are measured peak-to-peak in the same units",
      "Both are measured baseline-to-peak in the same units",
    ],
    correctIndex: 0,
    explanation:
        "CMAP amplitude is measured BASELINE-TO-NEGATIVE PEAK in millivolts (mV), while SNAP amplitude is measured PEAK-TO-PEAK in microvolts (μV). This difference exists because SNAPs are small (μV range) and often triphasic with baseline drift, making peak-to-peak more reliable.",
  ),
  QuizQuestion(
    question:
        "A patient presents 24 hours after an acute knife wound completely severed their median nerve at the elbow. What will the median motor CMAP amplitude look like if you stimulate at the wrist today?",
    options: [
      "It will be completely absent (0 mV)",
      "It will be perfectly normal",
      "It will have a conduction velocity of 20 m/s",
    ],
    correctIndex: 1,
    explanation:
        "Wallerian degeneration takes time. The distal axon segment remains electrically viable and can conduct an impulse for 3-5 days (motor) before the structure begins to physically dissolve.",
  ),
  QuizQuestion(
    question:
        "In conduction velocity calculations, if the wrist latency is 3.2ms, elbow latency is 4.8ms, and distance is 8cm, what is the forearm conduction velocity?",
    options: ["25 m/s", "40 m/s", "50 m/s", "64 m/s"],
    correctIndex: 2,
    explanation:
        "CALCULATION: Distance ÷ (Latency difference) = 8cm ÷ (4.8ms - 3.2ms) = 8 ÷ 1.6 = 5.0 cm/ms. To get m/s, multiply by 10 (since 10mm = 1cm). So 5.0 * 10 = 50 m/s. This is normal for a median motor nerve.",
  ),
  QuizQuestion(
    question:
        "To definitively declare Conduction Block, you stimulate proximally. What must happen to the CMAP response compared to the distal stimulation?",
    options: [
      "Amplitude must drop >50% with minimal temporal dispersion",
      "Velocity must drop below 75% of normal",
      "Amplitude must increase by 20%",
    ],
    correctIndex: 0,
    explanation:
        "A sudden, massive drop in amplitude across a segment proves the signal hit a focal blockade of demyelination and could not pass. If it spreads out widely instead, that is dispersion, not a true block.",
  ),
  QuizQuestion(
    question:
        "What pattern distinguishes demyelinating neuropathy from axonal neuropathy on NCS?",
    options: [
      "Demyelinating: reduced amplitude with normal CV; Axonal: slow CV with preserved amplitude",
      "Demyelinating: slow CV with conduction blocks; Axonal: reduced amplitude with normal/mildly slow CV",
      "Both show identical NCS patterns",
      "Demyelinating: absent responses; Axonal: prolonged latencies",
    ],
    correctIndex: 1,
    explanation:
        "DEMYELINATING pattern: Significantly SLOWED CV (<70% of LLN) and markedly prolonged distal latency. AXONAL pattern: Normal or mildly slow CV but REDUCED AMPLITUDES (<50% of LLN).",
  ),
  QuizQuestion(
    question: "What is the F-wave, and what does it assess?",
    options: [
      "A direct motor response that assesses distal nerve segments",
      "A sensory response that evaluates dorsal root function",
      "A late response traveling antidromically to anterior horn cells then returning orthodromically, assessing entire motor pathway",
      "A reflex response through the dorsal root ganglion",
    ],
    correctIndex: 2,
    explanation:
        "The F-WAVE is a LATE MOTOR RESPONSE that assesses the ENTIRE MOTOR PATHWAY. The signal travels antidromically (backwards) to the anterior horn cell, which 'backfires' and sends a signal back down the axon to the muscle.",
  ),
  QuizQuestion(
    question: "What is temporal dispersion, and what does it signify?",
    options: [
      "Increased amplitude of the proximal response",
      "Reduced duration of the proximal response",
      "Increased duration and reduced amplitude of the proximal response compared to distal",
      "A complete block of conduction",
    ],
    correctIndex: 2,
    explanation:
        "TEMPORAL DISPERSION is the desynchronization of nerve impulses. It manifests as INCREASED DURATION and REDUCED AMPLITUDE of the proximal CMAP. Significant dispersion suggests acquired demyelination (uneven slowing of different fibers).",
  ),
  QuizQuestion(
    question: "How does the H-reflex differ from the F-wave?",
    options: [
      "H-reflex is a true reflex arc (sensory afferent, motor efferent); F-wave is purely motor",
      "H-reflex is purely motor; F-wave is a reflex",
      "H-reflex is seen in all nerves; F-wave only in tibial nerve",
      "There is no difference",
    ],
    correctIndex: 0,
    explanation:
        "The H-REFLEX is a TRUE REFLEX ARC involving Ia sensory afferents synapsing on alpha motor neurons. It is the electrical equivalent of the ankle jerk reflex. The F-WAVE is NOT a reflex; it is a purely motor antidromic backfiring.",
  ),
];

// ── 7. GLOSSARY TAB ─────────────────────────────────────────────

class _GlossaryTab extends StatelessWidget {
  const _GlossaryTab();

  @override
  Widget build(BuildContext context) {
    final glossary = [
      (
        'Common Mode Rejection',
        "A differential amplifier's brilliant ability to subtract out identical electrical noise (like 60Hz hum) present at both the Active and Reference electrodes, leaving only the biological nerve signal.",
      ),
      (
        'Volume Conduction',
        'The passive spread of electrical current through bodily tissues and fluids, much like ripples in a pond. This allows muscles from far away to contaminate your recording.',
      ),
      (
        'Near-field Potential',
        'An electrical signal recorded by an electrode located very close to the biological generator (e.g., standard sensory or motor responses). The voltage changes dynamically as the signal moves.',
      ),
      (
        'Far-field Potential',
        'An electrical signal recorded at a massive distance from the generator. Because it is so far away, the voltage change hits all recording electrodes instantaneously at exactly the same time. The massive stimulus artifact is a far-field potential.',
      ),
      (
        'Phase Cancellation',
        'In sensory studies, fast fibers arrive at the electrode early (creating an upward wave), and slower fibers arrive later (creating a downward wave). These opposite waves smash into each other and cancel each other out, artificially reducing the total amplitude the machine reads.',
      ),
      (
        'H-Reflex',
        'An electrical analog of the tendon monosynaptic reflex. Bypasses the muscle spindle.',
      ),
      (
        'Temporal Dispersion',
        'The broadening of a waveform due to fibers conducting at different speeds, common in demyelination.',
      ),
      (
        'Cathode',
        'The active (black) pole of the stimulator where depolarization of the nerve actually begins. Must always be aimed toward recording electrodes.',
      ),
      (
        'Anode',
        'The positive (red) pole. If placed between the cathode and recording electrodes, it can cause "anodal block".',
      ),
      (
        'Latency',
        'The time (ms) from stimulus to the initial onset of the waveform.',
      ),
      (
        'Amplitude',
        'The height (mV) of the waveform, representing the total number of axons firing.',
      ),
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _sectionTitle("Mastery Glossary"),
          _introText("Key terminology for Nerve Conduction Studies."),
          ...glossary.map(
            (g) => Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.02),
                    blurRadius: 4,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    g.$1,
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF0F172A),
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    g.$2,
                    style: const TextStyle(
                      color: Color(0xFF475569),
                      fontSize: 14,
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }
}
