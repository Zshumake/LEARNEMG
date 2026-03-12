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
        CustomWidgetBlock(CustomWidgetType.actionPotentialTimeline),
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
        CustomWidgetBlock(CustomWidgetType.fiberTypeGrid),
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
        CustomWidgetBlock(CustomWidgetType.montageSection),
        HeaderBlock('Targeting Sensory Signals'),
        CustomWidgetBlock(CustomWidgetType.directionCards),
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
        CustomWidgetBlock(CustomWidgetType.temperatureCard),
        CustomWidgetBlock(CustomWidgetType.filterGrid),
        HeaderBlock('Troubleshooting Noise'),
        TextBlock(
          'The EMG lab is a hostile electrical environment. Hospital beds, fluorescent lights, and wall outlets all bleed noise into your recording.',
          isIntro: true,
        ),
        CustomWidgetBlock(CustomWidgetType.noiseSection),
        CustomWidgetBlock(CustomWidgetType.artifactSection),
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
        CustomWidgetBlock(CustomWidgetType.ncsMathScenarios),
        PearlBlock(
          "Why Subtract?",
          "The chemical delay at the NMJ is incredibly slow. Subtracting distal latency isolates pure nerve travel time, preventing artificially slow calculations.",
        ),
      ],
    ),
    TopicTab(
      title: 'Quiz',
      blocks: [CustomWidgetBlock(CustomWidgetType.ncsQuiz)],
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
