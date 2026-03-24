import 'package:flutter/material.dart';
import '../models/topic_content_model.dart';

final TopicData ncsFundamentalsContent = TopicData(
  id: 'ncs-fundamentals',
  title: 'NCS Fundamentals',
  tabs: [
    TopicTab(
      title: 'Foundations',
      blocks: [
        HeaderBlock('Physics & Physiology Foundations'),
        TextBlock(
          'Before picking up a stimulator, we must understand the fundamental biophysics of the peripheral nervous system. Nerve conduction studies (NCS) are simply a way to artificially trigger and measure the body\'s natural electrical signaling system.',
          isIntro: true,
        ),
        HeaderBlock('The Action Potential Timeline'),
        NumberedListBlock([
          const MapEntry("1", "Resting State (-70mV): The nerve is negatively charged. Actively maintained by the Na+/K+ ATPase pump, which burns ATP to push 3 Na+ out for every 2 K+ in. The nerve is a loaded spring."),
          const MapEntry("2", "Threshold (-55mV): When stimulus pushes charge to -55mV, voltage-gated Na+ channels suddenly pop open. An explosive chain reaction begins."),
          const MapEntry("3", "Depolarization (+30mV): Na+ floods into the cell, rapidly shifting internal charge from negative to positive. This is the all-or-none action potential spike we record on screen."),
          const MapEntry("4", "Repolarization (Restoring): Na+ channels snap shut (inactivation), K+ channels open. K+ rushes out, dropping internal charge back toward negative."),
          const MapEntry("5", "Hyperpolarization (Overshoot): K+ channels are slightly slow to close, allowing too much positive charge to escape. Potential briefly drops below -70mV before resting state restores."),
        ]),
        HeaderBlock('Saltatory Conduction: The Need for Speed'),
        TextBlock(
          'If electrical signals simply washed down the length of an axon like water through a hose, conduction velocity would be incredibly slow (about 1-2 m/s). This is far too slow for complex animals to survive. Evolution solved this with Myelin insulation wrapped around the axon by Schwann cells. Between these insulated segments are microscopic gaps called the Nodes of Ranvier, which contain massive clusters of sodium channels.',
          isIntro: true,
        ),
        BulletCardBlock(
          title: "The 'Jumping' Process",
          themeColor: const Color(0xFF1E3A8A),
          backgroundColor: const Color(0xFFEFF6FF),
          points: [
            "The action potential does not flow continuously; it 'jumps' (saltates) from node to node, increasing speed up to 70 m/s or more.",
            "Think of saltatory conduction like a staircase on a graph of distance versus time. At the node (the vertical step), the nerve takes a fraction of a millisecond to depolarize.",
            "Across the internode of myelin (the horizontal step), the electrical field propagates almost instantaneously.",
            "If the myelin is damaged (demyelination), the signal leaks out, takes longer to reach the next node, and conduction velocity plummets.",
          ],
        ),
        HeaderBlock('Fiber Type Capabilities'),
        BulletCardBlock(
          title: "A-alpha (Motor & Spindles)",
          themeColor: const Color(0xFF1E40AF),
          backgroundColor: const Color(0xFFEFF6FF),
          points: [
            "Diameter: 12-20 micrometers",
            "Velocity: 70-120 m/s",
            "The 'Fiber Optic Cable'. Massive, heavily myelinated fibers controlling extrafusal motor function (muscle contraction) and proprioception.",
          ],
        ),
        BulletCardBlock(
          title: "A-beta (Sensory)",
          themeColor: const Color(0xFF047857),
          backgroundColor: const Color(0xFFF0FDF4),
          points: [
            "Diameter: 6-12 micrometers",
            "Velocity: 35-75 m/s",
            "Large, moderately myelinated sensory fibers for light touch, pressure, and vibration. These are the ONLY sensory fibers measured during a standard SNAP study.",
          ],
        ),
        BulletCardBlock(
          title: "A-delta (Small Myelinated)",
          themeColor: const Color(0xFFB45309),
          backgroundColor: const Color(0xFFFFFBEB),
          points: [
            "Diameter: 1-5 micrometers",
            "Velocity: 5-30 m/s",
            "Small, thinly myelinated fibers carrying sharp, pricking 'fast' pain and cold temperature sensation.",
          ],
        ),
        BulletCardBlock(
          title: "C (Unmyelinated)",
          themeColor: const Color(0xFF475569),
          backgroundColor: const Color(0xFFF8FAFC),
          points: [
            "Diameter: 0.4-1.2 micrometers",
            "Velocity: 0.5-2 m/s",
            "The 'Dial-up Internet'. Tiny, unmyelinated fibers carrying dull/aching 'slow' pain, warm temperature, and autonomic functions (sweating, heart rate).",
          ],
        ),
        PearlBlock(
          "The Great Blind Spot of Electrodiagnosis",
          "Standard NCS equipment only has the resolution to 'see' the massive A-alpha (motor) and A-beta (sensory) fibers. We are completely blind to the A-delta and C fibers. If a patient comes to your clinic complaining of severe burning pain in their feet and loss of temperature sensation, but they have normal strength and vibration, they likely have a Small Fiber Neuropathy. Their EDX study will be 100% normal. You must diagnose small fiber disease clinically or with a specialized skin punch biopsy.",
        ),
      ],
    ),
    TopicTab(
      title: 'Methods',
      blocks: [
        HeaderBlock('Setup & Methods'),
        TextBlock(
          'The machine does not know human anatomy; it only knows the electrical difference between two metal discs.',
          isIntro: true,
        ),
        BulletCardBlock(
          title: "The Belly-Tendon Montage (G1-G2)",
          themeColor: const Color(0xFF1E3A8A),
          backgroundColor: const Color(0xFFEFF6FF),
          points: [
            "G1 / Active Electrode (Black): Place directly over the recording target. For motor studies, over the center of the muscle belly (motor endplate zone). For sensory studies, directly over the sensory nerve.",
            "G2 / Reference Electrode (Red): Place over an electrically silent area. For motor studies, on the distal tendon. For sensory studies, 3-4 cm distally along the finger.",
            "Differential Amplification: The amplifier calculates (G1 - G2). It also throws out any signal hitting BOTH electrodes simultaneously (Common Mode Rejection), which eliminates 60Hz ambient room noise.",
          ],
        ),
        HeaderBlock('Supramaximal Stimulation'),
        TextBlock(
          'Start with low current and slowly increase. Continue until the waveform stops growing, then go 20-30% beyond maximum amplitude. This ensures 100% of working axons are fired. Failure to reach supramaximal stimulation produces artificially small amplitudes that may be mistakenly diagnosed as axonal loss.',
        ),
        HeaderBlock('Targeting Sensory Signals'),
        BulletCardBlock(
          title: "Antidromic Sensory Study",
          themeColor: const Color(0xFF059669),
          backgroundColor: const Color(0xFFF0FDF4),
          points: [
            "Direction: Stimulating 'against' physiological direction -- signal travels AWAY from the spinal cord (e.g., shocking median nerve at wrist, recording on index finger).",
            "Advantage: Produces much larger sensory amplitudes because digital nerves are extremely superficial and close to recording electrodes.",
            "Disadvantage: Motor fibers also fire, creating a massive muscle twitch that causes volume-conducted 'motor artifact' that can obscure the sensory response.",
          ],
        ),
        BulletCardBlock(
          title: "Orthodromic Sensory Study",
          themeColor: const Color(0xFF7C3AED),
          backgroundColor: const Color(0xFFF5F3FF),
          points: [
            "Direction: Stimulating in the 'correct' physiological direction -- signal travels TOWARD the spinal cord (e.g., shocking index finger, recording median nerve at wrist).",
            "Advantage: Perfectly clean baseline. No motor fibers in the finger means no muscle twitch artifact.",
            "Disadvantage: Produces much smaller amplitudes because the nerve is buried deeper under tendons and fascia at the wrist recording site.",
          ],
        ),
        PearlBlock(
          "Initial Positive Deflection",
          "When you do a motor study, the very first movement of the waveform on the screen should always be sharply upward (Negative, by convention). If you hit the stimulator and the waveform dips downward initially, there is a 99% chance your G1 (Active) electrode is NOT placed over the center of the muscle belly. Move the G1 electrode until the downward dip disappears and the waveform rockets straight up. This single maneuver will save you from inaccurate latency measurements.",
        ),
      ],
    ),
    TopicTab(
      title: 'Technical',
      blocks: [
        HeaderBlock('Technical Pitfalls'),
        TextBlock(
          'Artifacts and environmental factors can aggressively masquerade as severe pathology.',
          isIntro: true,
        ),
        HeaderBlock('Technical Factors & Pitfalls'),
        TextBlock(
          'In electrodiagnosis, your results are only as good as your technical setup. External factors like skin temperature, electrode placement, and ambient electrical noise can completely ruin a study if not addressed.',
          isIntro: true,
        ),
        BulletCardBlock(
          title: "Temperature: The Silent Saboteur",
          themeColor: const Color(0xFFDC2626),
          backgroundColor: const Color(0xFFFEF2F2),
          points: [
            "Cold nerves conduct slowly because Na+ channels physically open and close more slowly.",
            "Cool limb = Slowed Conduction + Higher Amplitude. Cold limbs perfectly mimic demyelinating neuropathies!",
            "For every 1 degree C drop below normal: velocity slows by 1.5-2.5 m/s, and distal latency prolongs by 0.2 ms.",
            "Golden Rule: Always verify skin temperature before starting. Target: 32-34 degrees C. Warm limbs if necessary.",
          ],
        ),
        BulletCardBlock(
          title: "Motor Study Filters",
          themeColor: const Color(0xFF1E3A8A),
          backgroundColor: const Color(0xFFEFF6FF),
          points: [
            "Low Frequency Filter: 10 Hz",
            "High Frequency Filter: 10 kHz",
            "A motor CMAP is a massive, slow wave. High filter set very high (10 kHz) to avoid clipping the peak. Low filter at 10 Hz.",
          ],
        ),
        BulletCardBlock(
          title: "Sensory Study Filters",
          themeColor: const Color(0xFF047857),
          backgroundColor: const Color(0xFFF0FDF4),
          points: [
            "Low Frequency Filter: 20 Hz",
            "High Frequency Filter: 2 kHz",
            "A sensory SNAP is tiny and fast. Lower HFF to 2 kHz to aggressively chop high-frequency noise. Raise LFF to 20 Hz to stabilize the baseline.",
          ],
        ),
        HeaderBlock('Troubleshooting Noise'),
        TextBlock(
          'The EMG lab is a hostile electrical environment. Hospital beds, fluorescent lights, and wall outlets all bleed noise into your recording.',
          isIntro: true,
        ),
        BulletCardBlock(
          title: "60 Hz Interference",
          themeColor: const Color(0xFFD97706),
          backgroundColor: const Color(0xFFFFFBEB),
          points: [
            "Appearance: Thick, fuzzy, continuous oscillations at exactly 60 cycles per second from wall outlets and lights.",
            "Solution: The amplifier uses Common Mode Rejection. For this to work, skin impedance under G1 and G2 must be identical.",
            "Fix: Scrub skin with alcohol/prep pads, use plenty of conductive jelly, ensure ground electrode is firmly attached between stimulator and recording electrodes.",
          ],
        ),
        BulletCardBlock(
          title: "Stimulus Artifact Mitigation",
          themeColor: const Color(0xFF7C3AED),
          backgroundColor: const Color(0xFFF5F3FF),
          points: [
            "The stimulus is thousands of times larger than the nerve signal, creating a massive far-field artifact that can obscure the waveform start.",
            "Always place the Ground electrode between the stimulator and recording electrodes -- it acts as a ditch to catch excess stimulus current.",
            "Rotate the Anode around the Cathode while moving the probe. Changing the angle of current flow can dramatically clean up the artifact.",
          ],
        ),
        PearlBlock(
          "Cathode Position",
          "Ensure the Cathode (black prong) aims TOWARD recording electrodes. Depolarization starts there; reversing it artificially prolongs latency measurements.",
        ),
      ],
    ),
    TopicTab(
      title: 'Interpretation',
      blocks: [
        HeaderBlock('The Art of Interpretation'),
        TextBlock(
          'Primary question: Is this Axonal Loss or Demyelination?',
          isIntro: true,
        ),
        MechanismCardBlock(
          type: "Axonal Loss Pattern",
          subtitle: "Severely Reduced Amplitudes",
          themeColor: const Color(0xFFEF4444),
          backgroundColor: const Color(0xFFFEF2F2),
          icon: Icons.trending_down,
          mechanism: "Functional 'wires' (axons) are physically dead.",
          findings:
              "Surviving wires conduct perfectly normally. Therefore, Velocity & Latency will stay >75% of normal values.",
          prognosis:
              "Remember: Wallerian degeneration takes 3-5 days (motor) or 6-10 days (sensory) to complete. You cannot reliably diagnose axonal loss 1 hour after an injury.",
        ),
        MechanismCardBlock(
          type: "Demyelinating Pattern",
          subtitle: "Marked Slowing & Prolonged Latencies",
          themeColor: const Color(0xFF3B82F6),
          backgroundColor: const Color(0xFFEFF6FF),
          icon: Icons.speed,
          mechanism:
              "The insulation (myelin) is stripped, causing current leakage.",
          findings:
              "Velocities crash (<75% normal). Amplitudes stay robust initially, but waveforms often become widened or 'dispersed'.",
          prognosis:
              "Temporal Dispersion: Waveforms spread out like a fan as some fibers conduct much faster than others.",
        ),
        MechanismCardBlock(
          type: "Focal Conduction Block",
          subtitle: ">50% Focal Drop in Amplitude",
          themeColor: const Color(0xFFA855F7),
          backgroundColor: const Color(0xFFFAF5FF),
          icon: Icons.block,
          mechanism:
              "A sudden massive drop in amplitude between wrist and elbow stimulation (with no significant dispersion).",
          findings:
              "The signal hits a focal myelin roadblock and simply stops.",
          prognosis:
              "The axons are alive, but they are 'frozen' at a single spot along the nerve pathway.",
        ),
        PearlBlock(
          "The 75% Rule of Thumb",
          "In electrodiagnosis, 75% is the magic number. If velocity falls below 75% of the lower limit of normal, it's primary demyelination. Axonal loss alone almost never drags surviving fibers below 75%, because the fastest-conducting large fibers are usually the last to die.",
        ),
      ],
    ),
    TopicTab(
      title: 'Math',
      blocks: [
        HeaderBlock('Clinical Mathematics'),
        TextBlock(
          'Master the physics of Conduction Velocity calculation.',
          isIntro: true,
        ),
        TextBlock(
          'Master Formula: CV (m/s) = Distance (mm) / (Proximal Latency - Distal Latency)',
          isIntro: true,
        ),
        NumberedListBlock([
          const MapEntry("S1", "Normal Benchmark: Median Motor -- distance 250mm, proximal latency 8.5ms, distal latency 3.5ms. Step 1: Subtract latencies (8.5 - 3.5 = 5.0ms). Step 2: Divide (250 / 5.0 = 50 m/s). This is a perfectly normal conduction velocity."),
          const MapEntry("S2", "Severe Pathology: Ulnar Motor -- distance 300mm, proximal latency 12.8ms, distal latency 2.8ms. Step 1: Subtract (12.8 - 2.8 = 10.0ms). Step 2: Divide (300 / 10.0 = 30 m/s). This velocity has crashed into the 30s -- a severe primary demyelinating neuropathy."),
        ]),
        PearlBlock(
          "Why Subtract?",
          "The chemical delay at the NMJ is incredibly slow. Subtracting distal latency isolates pure nerve travel time, preventing artificially slow calculations.",
        ),
      ],
    ),
    TopicTab(
      title: 'Quiz',
      blocks: [
        HeaderBlock('NCS Fundamentals Quiz'),
        TextBlock('Test your understanding of nerve conduction study principles.', isIntro: true),
        NumberedListBlock([
          const MapEntry("Q1", "A technician performs NCS on a patient with icy cold hands from walking outside. What pattern does this mimic? -- Answer: A primary demyelinating neuropathy. Cold temperatures slow conduction velocity and prolong latencies, perfectly mirroring demyelination. It also paradoxically increases amplitude."),
          const MapEntry("Q2", "You stimulate the ulnar nerve at the wrist, but note the initial deflection is a sharp positive (downward) dip. What is the cause? -- Answer: The G1 (Active) electrode is not placed over the true motor endpoint. It records the approaching wavefront as volume conduction before the muscle fully depolarizes under it."),
          const MapEntry("Q3", "Which fibers are you evaluating during a standard Sural SNAP study? -- Answer: Large, myelinated A-beta fibers. Standard EDX machines only resolve the massive A-alpha and A-beta fibers. We are completely blind to small A-delta and C fibers."),
          const MapEntry("Q4", "A patient presents 24 hours after a knife wound severed their median nerve at the elbow. What will the distal CMAP amplitude look like? -- Answer: Perfectly normal. Wallerian degeneration takes 3-5 days (motor) to complete. The distal axon remains electrically viable for several days."),
          const MapEntry("Q5", "To declare Conduction Block, what must happen to the proximal CMAP compared to distal? -- Answer: Amplitude must drop >50% with minimal temporal dispersion. A sudden massive drop proves the signal hit a focal blockade of demyelination. If it spreads widely, that is dispersion, not block."),
          const MapEntry("Q6", "Why do we subtract Distal Latency from Proximal Latency when calculating CV? -- Answer: To eliminate the time spent crossing the Neuromuscular Junction. The NMJ chemical transmission is slow. Subtracting latencies isolates pure nerve travel time so velocity isn't artificially slow."),
        ]),
      ],
    ),
    TopicTab(
      title: 'Glossary',
      blocks: [
        HeaderBlock('Mastery Glossary'),
        TextBlock(
          'Key terminology for Nerve Conduction Studies.',
          isIntro: true,
        ),
        NumberedListBlock([
          const MapEntry(
            "1",
            "Common Mode Rejection: A differential amplifier's brilliant ability to subtract out identical electrical noise (like 60Hz hum) present at both the Active and Reference electrodes, leaving only the biological nerve signal.",
          ),
          const MapEntry(
            "2",
            "Volume Conduction: The passive spread of electrical current through bodily tissues and fluids, much like ripples in a pond. This allows muscles from far away to contaminate your recording.",
          ),
          const MapEntry(
            "3",
            "Near-field Potential: An electrical signal recorded by an electrode located very close to the biological generator (e.g., standard sensory or motor responses). The voltage changes dynamically as the signal moves.",
          ),
          const MapEntry(
            "4",
            "Far-field Potential: An electrical signal recorded at a massive distance from the generator. Because it is so far away, the voltage change hits all recording electrodes instantaneously at exactly the same time. The massive stimulus artifact is a far-field potential.",
          ),
          const MapEntry(
            "5",
            "Phase Cancellation: In sensory studies, fast fibers arrive at the electrode early (creating an upward wave), and slower fibers arrive later (creating a downward wave). These opposite waves smash into each other and cancel each other out, artificially reducing the total amplitude the machine reads.",
          ),
          const MapEntry(
            "6",
            "H-Reflex: An electrical analog of the tendon monosynaptic reflex. Bypasses the muscle spindle.",
          ),
          const MapEntry(
            "7",
            "Temporal Dispersion: The broadening of a waveform due to fibers conducting at different speeds, common in demyelination.",
          ),
          const MapEntry(
            "8",
            "Cathode: The active (black) pole of the stimulator where depolarization of the nerve actually begins. Must always be aimed toward recording electrodes.",
          ),
          const MapEntry(
            "9",
            "Anode: The positive (red) pole. If placed between the cathode and recording electrodes, it can cause 'anodal block'.",
          ),
          const MapEntry(
            "10",
            "Latency: The time (ms) from stimulus to the initial onset of the waveform.",
          ),
          const MapEntry(
            "11",
            "Amplitude: The height (mV) of the waveform, representing the total number of axons firing.",
          ),
        ]),
      ],
    ),
  ],
);
