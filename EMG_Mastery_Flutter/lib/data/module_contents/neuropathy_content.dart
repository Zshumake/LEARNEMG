import 'package:flutter/material.dart';
import '../models/topic_content_model.dart';

final TopicData neuropathyContent = TopicData(
  id: 'neuropathy-pathophysiology',
  title: 'Neuropathy Pathophysiology',
  tabs: [
    TopicTab(
      title: 'Anatomy',
      blocks: [
        HeaderBlock('Peripheral Nerve Anatomy'),
        TextBlock(
          'Before understanding pathology, we must understand the structure of the "wire" itself. A peripheral nerve is not a single string; it is a highly organized, multi-layered physiological cable.',
          isIntro: true,
        ),
        TextBlock(
          'The Axon is the actual conductive wire, carrying electrical impulses from the neuron body (in the spinal cord or DRG) to the target organ. Large axons are wrapped in Myelin, an insulating fat layer created by Schwann cells, which drastically increases conduction speed.',
        ),
        BulletCardBlock(
          title: 'The Three Connective Tissue Layers',
          themeColor: const Color(0xFF6B21A8),
          backgroundColor: const Color(0xFFFAF5FF),
          points: [
            'Epineurium: The tough, outermost sheath enclosing the entire nerve. It absorbs gross mechanical stress.',
            'Perineurium: Wraps individual groups of axons into "fascicles." This is the primary physical barrier (like the blood-brain barrier for the nerve) and maintains internal pressure.',
            'Endoneurium: The delicate matrix surrounding each individual myelinated or unmyelinated axon inside the fascicle.',
          ],
        ),
      ],
    ),
    TopicTab(
      title: 'Mechanisms',
      blocks: [
        HeaderBlock('Mechanisms of Injury'),
        TextBlock(
          'Neuropathies are broadly divided into three pathophysiological mechanisms. Identifying which mechanism is occurring is the primary goal of the EMG/NCS study.',
          isIntro: true,
        ),
        MechanismCardBlock(
          type: '1. Wallerian Degeneration',
          subtitle: 'The axon is physically severed.',
          themeColor: const Color(0xFFDC2626),
          backgroundColor: const Color(0xFFFEF2F2),
          icon: Icons.content_cut,
          mechanism:
              'Complete physical disruption of the axon. Within 24-48 hours, the nerve segment distal to the cut begins to actively self-destruct. Macrophages move in to clear the debris. The proximal stump survives and attempts to regenerate.',
          findings:
              'Distal NCS responses are completely normal for the first few days (because the distal wire hasn\'t died yet!), then suddenly drop to zero. Needle EMG will show massive Fibrillation potentials in 2-3 weeks.',
          prognosis:
              'Slow and uncertain. Nerves grow at roughly 1mm per day (1 inch per month). Severe injuries may require surgical grafting.',
        ),
        MechanismCardBlock(
          type: '2. Axonal Degeneration',
          subtitle: 'The axon slowly dies from within.',
          themeColor: const Color(0xFFD97706),
          backgroundColor: const Color(0xFFFFFBEB),
          icon: Icons.trending_down,
          mechanism:
              'A metabolic, toxic, or energetic failure within the neuron. It usually starts at the very end of the longest nerves (feet) and slowly dies back toward the spine. Think: Diabetes, Chemo, Alcoholism.',
          findings:
              'On NCS, Amplitudes (the number of surviving wires) are reduced, but velocities remain relatively normal (because the surviving wires are healthy). Needle EMG shows fibrillations in distal muscles.',
          prognosis:
              'Depends on removing the toxic/metabolic insult. If diabetes is controlled, the dying back stops, but regeneration is extremely slow.',
        ),
        MechanismCardBlock(
          type: '3. Demyelination',
          subtitle: 'The insulation is stripped, but the wire survives.',
          themeColor: const Color(0xFF2563EB),
          backgroundColor: const Color(0xFFEFF6FF),
          icon: Icons.electric_bolt,
          mechanism:
              'Autoimmune attack, genetic defect, or focal compression strips the myelin sheath off the axon. The underlying axon remains intact, but the electrical signal "leaks" and slows down dramatically. Think: Guillain-Barré, CIDP, Carpal Tunnel.',
          findings:
              'On NCS, Conduction Velocity is drastically slowed, and latencies are prolonged. You may see Conduction Block (signal drops across the lesion). Needle EMG is completely NORMAL (no fibrillations) because the muscle is still connected to a live nerve.',
          prognosis:
              'Often excellent if treated. Schwann cells can remyelinate the nerve over weeks to months, restoring normal or near-normal conduction.',
        ),
      ],
    ),
    TopicTab(
      title: 'Classification',
      blocks: [
        HeaderBlock('Structural Classification'),
        TextBlock(
          'How we label the anatomic pattern of the neuropathy. This pattern recognition is the first step in formulating a differential diagnosis.',
          isIntro: true,
        ),
        CustomWidgetBlock(
          CustomWidgetType.directionCards,
        ), // Reusing a type that maps to _buildClassificationGrid logic or something. Wait, we need to handle specific text. Let's use BulletCardBlocks for classifications.
        BulletCardBlock(
          title: "Mononeuropathy",
          themeColor: const Color(0xFF16A34A),
          backgroundColor: Colors.white,
          points: [
            "Damage to ONE single peripheral nerve.",
            "Usually caused by focal trauma, compression, or entrapment.",
            "Classic Examples: Carpal Tunnel Syndrome (Median nerve at wrist), Cubital Tunnel Syndrome (Ulnar nerve at elbow), Fibular Head compression (Peroneal nerve at knee causing foot drop).",
            "EDX Goal: Localize the exact inch where the nerve is trapped (e.g., above vs. below the elbow).",
          ],
        ),
        BulletCardBlock(
          title: "Polyneuropathy",
          themeColor: const Color(0xFF9333EA),
          backgroundColor: Colors.white,
          points: [
            "Widespread, symmetric dysfunction of many peripheral nerves simultaneously.",
            "Classic presentation is 'Length-Dependent', meaning the longest nerves in the body (the toes) are affected first, slowly moving up to the knees, then the fingers. The 'Stocking-Glove' pattern.",
            "Common Causes: Diabetes, Alcohol toxicity, B12 deficiency, Chemotherapy.",
            "EDX Goal: Determine if it is primarily Axonal (Diabetes) vs Demyelinating (CIDP).",
          ],
        ),
        BulletCardBlock(
          title: "Radiculopathy",
          themeColor: const Color(0xFFE11D48),
          backgroundColor: Colors.white,
          points: [
            "Compression or inflammation of the nerve ROOT as it exits the spinal cord (before the plexus).",
            "Symptoms follow a specific Dermatome (sensory) and Myotome (motor).",
            "Classic Cause: Herniated disc in the cervical or lumbar spine.",
            "EDX Hallmark: Sensory nerve action potentials (SNAPs) are miraculously NORMAL because the lesion is proximal to the dorsal root ganglion (DRG). The sensory cell body is still connected to the limb!",
          ],
        ),
        BulletCardBlock(
          title: "Plexopathy",
          themeColor: const Color(0xFFEA580C),
          backgroundColor: Colors.white,
          points: [
            "Damage to the complex web of nerves in the Brachial (arm) or Lumbosacral (leg) plexus.",
            "Symptoms cross multiple nerve territories and roots. The arm is often flaccid.",
            "Classic Causes: Severe trauma (motorcycle accident), Radiation therapy, Parsonage-Turner Syndrome (autoimmune brachial neuritis).",
            "EDX Goal: Extremely complex mapping to prove the lesion is distal to the root, but proximal to the individual terminal nerves.",
          ],
        ),
        PearlBlock(
          "The 'Mononeuropathy Multiplex'",
          "Also known as Multiple Mononeuropathy. This is when severe damage hits multiple, random, isolated single nerves asynchronously (e.g., right wrist wrist drop today, left foot drop next week). This asymmetric pattern is a massive red flag for VASCULITIS (infarction of the vasa nervorum). It is a medical emergency requiring urgent biopsy and high-dose steroids to prevent permanent paralysis.",
        ),
      ],
    ),
    TopicTab(
      title: 'EDX Findings',
      blocks: [
        HeaderBlock('Nerve Conduction (NCS) Rules'),
        TextBlock(
          "When analyzing NCS data, look at Amplitude and Velocity independently. They answer two different questions about the nerve's health.",
          isIntro: true,
        ),
        BulletCardBlock(
          title: "Amplitude = Axons",
          themeColor: const Color(0xFF1E3A8A),
          backgroundColor: Colors.white,
          points: [
            "The height of the wave tells you HOW MANY wires are still alive and connected to muscle/skin.",
            "Low Amplitude = Axonal Loss (or severe demyelinating conduction block).",
          ],
        ),
        BulletCardBlock(
          title: "Velocity = Myelin",
          themeColor: const Color(0xFF047857),
          backgroundColor: Colors.white,
          points: [
            "The speed of the wave tells you HOW HEALTHY the insulation is on the surviving wires.",
            "Slow Velocity / Prolonged Latency = Demyelination.",
          ],
        ),
        HeaderBlock('Needle EMG Findings'),
        TextBlock(
          "The needle examination is the most sensitive test for active axonal loss. Muscle fibers that lose their nerve supply become hyper-irritable inside the body.",
          isIntro: true,
        ),
        NumberedListBlock([
          const MapEntry(
            "1",
            "Fibrillation Potentials & Positive Sharp Waves: These indicate active, ongoing denervation. The muscle fiber is crying out for a nerve. They take 2-3 weeks to appear after an injury.",
          ),
          const MapEntry(
            "2",
            "Fasciculations: Spontaneous firing of an entire motor unit. Often benign, but if seen with denervation, highly concerning for Anterior Horn Cell disease (ALS).",
          ),
          const MapEntry(
            "3",
            "Giant Motor Units: Over months, surviving nerves sprout tiny branches to 'adopt' the orphaned muscle fibers. When this motor unit fires, it now controls far more muscle fibers than normal, resulting in a massively tall, wide waveform (Chronic Reinnervation).",
          ),
        ]),
        PearlBlock(
          "Timing is Everything",
          "If a patient is referred for EMG 2 days after a car accident causing foot drop, you MUST warn the refering physician that the test will be incomplete. Wallerian degeneration takes time. You cannot see fibrillations on EMG until 21 days post-injury. Testing too early leads to false negatives.",
        ),
      ],
    ),
    TopicTab(
      title: 'Fibers',
      blocks: [
        HeaderBlock('Fiber Classification'),
        TextBlock(
          "The peripheral nerve is a mixed cable, but NCS is blind to half of these wires!",
          isIntro: true,
        ),
        CustomWidgetBlock(CustomWidgetType.fiberTypeGrid),
        PearlBlock(
          "The Great Blind Spot of EDX",
          "Standard nerve conduction studies ONLY measure the massive, heavily myelinated A-alpha and A-beta fibers. If a patient presents with severe burning pain and temperature loss in their feet, but normal strength and vibration, they likely have a Small Fiber Neuropathy (targeting A-delta and C fibers). Their EMG/NCS will be completely, 100% NORMAL. You must diagnose small fiber disease clinically or via punch skin biopsy, not with EDX!",
        ),
      ],
    ),
    TopicTab(
      title: 'Atlas',
      blocks: [
        HeaderBlock('Master Entrapment Atlas'),
        TextBlock(
          "A comprehensive guide to classic compressive patterns.",
          isIntro: true,
        ),
        CustomWidgetBlock(CustomWidgetType.neuropathyAtlas),
        HeaderBlock('Quiz Time'),
        TextBlock(
          "Test your understanding of Neuropathy Pathophysiology.",
          isIntro: true,
        ),
        CustomWidgetBlock(CustomWidgetType.neuropathyQuiz),
      ],
    ),
  ],
);
