import 'models/nm_basics_model.dart';

class NMBasicsData {
  static const String title = "Neuropathy vs. Myopathy";
  static const String subtitle =
      "The fundamental dichotomy of neuromuscular medicine. Master the electrodiagnostic patterns that differentiate primary nerve pathology from primary muscle disease.";

  static const String comparisonIntro = "Side-by-Side Reference Guide";
  static const String comparisonText =
      "When analyzing complex electrodiagnostic data, anchor yourself to these fundamental opposing patterns.";
  static const String neuropathyRule =
      "The Labor Shortage: In Neuropathy, the workforce of nerves has been decimated. There are Too Few units available. To compensate, the few giant surviving units must fire Too Fast to generate force.";
  static const String myopathyRule =
      "The Weak Workforce: In Myopathy, all the nerves are present, but the muscle 'workers' they control are severely weakened. To generate force, the brain must deploy Too Many tiny units at once, resulting in early, dense recruitment for minimal actual effort.";

  static const NMDeepDive myopathy = NMDeepDive(
    title: "What is Myopathy?",
    text:
        "Myopathy refers to diseases of the muscle tissue where the primary pathology directly attacks the muscle fibers. The nerves controlling these muscles are entirely healthy, but the 'engine' they are trying to drive is fundamentally broken. Whether the muscle is structurally defective (dystrophy), under inflammatory attack (myositis), or chemically poisoned (toxins), the end result is a severely weakened electrical generator.",
    causes: [
      NMClinicalPoint(
        title: "Inflammatory",
        detail:
            "The immune system inappropriately attacks the muscle tissue (e.g., Polymyositis, Dermatomyositis).",
      ),
      NMClinicalPoint(
        title: "Metabolic / Endocrine",
        detail:
            "Systemic imbalances disrupting muscle function (e.g., severe Hypothyroidism, chronic steroid use).",
      ),
      NMClinicalPoint(
        title: "Genetic (Dystrophies)",
        detail:
            "Inherited mutations causing structural defects in the muscle wall proteins (e.g., Duchenne, Becker, Facioscapulohumeral).",
      ),
      NMClinicalPoint(
        title: "Toxic",
        detail:
            "Medication or substance-induced muscle damage (e.g., Statin-induced myopathy, severe chronic alcohol abuse).",
      ),
    ],
    symptoms: [
      NMClinicalPoint(
        title: "Proximal Weakness",
        detail:
            "Difficulty raising arms above the head, combing hair, getting up from a low chair, or climbing stairs. The large proximal muscles (deltoids, hip flexors) usually fail first.",
      ),
      NMClinicalPoint(
        title: "Symmetric Involvement",
        detail:
            "Strength loss typically affects the left and right sides of the body equally.",
      ),
      NMClinicalPoint(
        title: "Purely Motor",
        detail:
            "Sensory nerves are entirely unaffected. There is NO numbness, tingling, or loss of sensation.",
      ),
      NMClinicalPoint(
        title: "Muscle Pain",
        detail:
            "Often present, especially if the myopathy is inflammatory or necrotizing in nature.",
      ),
    ],
    emgTitle: "Classic Needle EMG Findings",
    muap: NMEMGSection(
      title: "The Motor Unit Action Potential (MUAP)",
      traits: [
        "Short Duration: A normal motor unit contains hundreds of healthy muscle fibers. In a myopathy, the nerve is fine, but many of its target muscle fibers have died or shriveled. When the nerve fires, fewer fibers respond, causing the electrical wave to be physically shorter in time.",
        "Small Amplitude: Because fewer fibers are generating voltage within the unit, the overall electrical output (height) drops.",
        "Polyphasic: The surviving muscle fibers are sick and regenerating. They do not fire together in perfect sync. This asynchronous firing creates a jagged, multi-peaked wave (>5 phases) instead of a clean spike.",
      ],
    ),
    recruitment: NMEMGSection(
      title: "The Recruitment Pattern",
      traits: [
        "Early / Rapid Recruitment: This is the hallmark of myopathy. Because each individual motor unit is terribly weak, the brain realizes it cannot generate force normally. If you ask the patient to lightly lift a finger, the brain panics and instantly recruits almost every available motor unit to compensate. The screen fills with chaotic electrical activity despite the patient barely exerting any effort.",
        "Full Interference Pattern: Even at minimal effort, the screen is entirely full of firing units.",
        "Low Amplitude: Despite the screen being completely full, the overall height of the 'cloud' of activity remains short, because all the units are tiny and sick.",
      ],
    ),
    ncsTitle: "Nerve Conduction Studies (NCS)",
    ncsFinding: "Usually Entirely Normal",
    ncsDetail:
        "Because the pathology is strictly within the muscle tissue, the sensory and motor nerves running down the arm and leg conduct electrical signals at perfectly normal speeds and normal amplitudes. The only exception is in end-stage, extremely severe myopathies, where so much muscle has died that the motor CMAP amplitude finally drops.",
    clinicalPresentation:
        "A patient complaining of profound difficulty standing up from the toilet or reaching high shelves, with absolutely no numbness, perfectly normal reflexes, and a normal sensory nerve study.",
    clinicalStrategy:
        "On EMG, deliberately target the large proximal muscles (Deltoid, Biceps, Iliopsoas, Vastus Lateralis). Look aggressively for tiny, short-duration, highly polyphasic units that fill the screen the moment the patient moves.",
    pearlTitle: "Steroid Myopathy: The Great Deceiver",
    pearlText:
        "Steroid Myopathy is the great deceiver. A patient on high-dose prednisone may present with profound proximal weakness, but their EMG may look shockingly normal. This occurs because steroids selectively atrophy the Type II (fast-twitch) muscle fibers, leaving the Type I fibers relatively intact. The needle EMG primarily records the healthier Type I fibers, masking the true extent of the weakness.",
  );

  static const NMDeepDive neuropathy = NMDeepDive(
    title: "What is Neuropathy?",
    text:
        "Neuropathy refers to disorders affecting the peripheral nerves (the 'wiring'). The muscles themselves are structurally capable, but the electrical cables carrying instructions from the spinal cord to the muscles (motor nerves) or from the skin back to the brain (sensory nerves) are damaged. Peripheral nerve damage generally falls into two distinct biometric patterns: Axonal Loss (the wire breaks) or Demyelination (the insulation strips away).",
    causes: [
      NMClinicalPoint(
        title: "Metabolic",
        detail:
            "Diabetes Mellitus is the undisputed most common cause of peripheral neuropathy worldwide.",
      ),
      NMClinicalPoint(
        title: "Autoimmune",
        detail:
            "The immune system attacks the nerve myelin (e.g., Guillain-Barré Syndrome, CIDP).",
      ),
      NMClinicalPoint(
        title: "Toxic / Nutritional",
        detail:
            "Chemotherapy agents, Vitamin B12 deficiency, heavy metal poisoning.",
      ),
      NMClinicalPoint(
        title: "Focal Compression",
        detail:
            "Nerves trapped and crushed in tight anatomical spaces (e.g., Carpal Tunnel Syndrome, Ulnar Neuropathy at the elbow).",
      ),
    ],
    symptoms: [
      NMClinicalPoint(
        title: "Distal Weakness",
        detail:
            "Weakness begins at the absolute furthest points: the toes, feet, and hands. Frequent tripping, foot drop, or dropping coffee mugs.",
      ),
      NMClinicalPoint(
        title: "Stocking-Glove Sensory Loss",
        detail:
            "Numbness, burning, and tingling marching slowly up from the toes and fingers toward the trunk.",
      ),
      NMClinicalPoint(
        title: "Reduced Reflexes",
        detail:
            "Deep tendon reflexes (like the ankle jerk) are diminished or completely absent early in the disease course.",
      ),
      NMClinicalPoint(
        title: "Length-Dependent",
        detail:
            "The longest nerves in the body (running from the lower back all the way down to the toes) succumb to metabolic stress first.",
      ),
    ],
    emgTitle: "Classic Needle EMG Findings (Chronic Reinnervation)",
    emgTraits: [
      "Giant MUAPs: When a motor nerve dies, the muscle fibers it controlled become 'orphans'. A neighboring healthy nerve will sprout new branches and adopt these orphans. Now, one nerve controls twice as many muscle fibers. When it fires, it produces an abnormally massive (Giant) electrical wave.",
      "Long Duration MUAPs: Because the single nerve is trying to synchronize the firing of a huge, sprawled-out territory of adopted muscle fibers, the electrical wave stretches out in time.",
      "Reduced Recruitment (Fast Firing): Because so many nerves have died, the brain has very few motor units left to recruit. If you ask the patient to lift a heavy weight, the few surviving giant units fire incredibly fast to compensate, but they simply cannot fill the screen with activity.",
      "Spontaneous Activity: If you put the needle in a resting muscle and hear 'rain on a tin roof' (Fibrillations and Positive Sharp Waves), you are hearing the desperate cries of actively orphaned muscle fibers looking for a nerve supply.",
    ],
    ncsTitle: "Nerve Conduction Studies (NCS) - The Primary Tool",
    ncsFinding: "Usually Abnormal",
    ncsDetail:
        "NCS is the primary technical tool for characterizing neuropathy. Depending on whether the pathology is axonal loss or demyelination, the amplitudes or velocities will be significantly affected.",
    axonal: NMEMGSection(
      title: "The Axonal Pattern",
      traits: [
        "Decreased Amplitude: Wallerian degeneration physically severs the axons. Fewer surviving axons means less electricity hits the muscle, resulting in a dropped motor CMAP or a dropped sensory SNAP.",
        "Normal Conduction Velocity: The few axons that survived the attack still have their pristine myelin insulation. They conduct at a perfectly normal speed. The signal just lacks total power.",
        "Normal Latency: The signal arrives exactly when expected.",
      ],
    ),
    demyelinating: NMEMGSection(
      title: "The Demyelinating Pattern",
      traits: [
        "Decreased Velocity: The myelin insulation is destroyed. The electrical signal leaks out and travels sluggishly along the bare axon, plummeting the conduction velocity (<75% of normal).",
        "Increased Latency: Because the signal is moving so slowly, it takes much longer to arrive at the recording electrode.",
        "Conduction Block: If the demyelination is severe enough at a focal spot, the signal completely drops across that segment.",
      ],
    ),
    clinicalPresentation:
        "A patient complaining of burning, numb feet, tripping over their toes, dropped ankle reflexes, and severe weakness in their hands.",
    clinicalStrategy:
        "NCS is king. Test multiple motor and sensory nerves in the legs and arms. Compare distal to proximal sites to look for conduction blocks. On EMG, look distally (e.g., Tibialis Anterior, Abductor Pollicis Brevis) for giant, fast-firing neurogenic units and active fibrillations.",
    pearlTitle: "The Truth About Stocking-Glove",
    pearlText:
        "The 'Stocking-Glove' progression isn't magic; it's physics. In a toxic or metabolic neuropathy (like Diabetes), the nerve cell body in the spinal cord can no longer generate enough energy to maintain its massive axon. The axon begins to 'die back' from the absolute furthest tip (the toes). As the disease worsens over years, the axon slowly dies closer and closer to the spine, causing the numbness to march slowly up the leg toward the knee.",
  );

  static const List<NMComparisonRow> comparisonRows = [
    NMComparisonRow(
      feature: "Motor CMAP Amplitude",
      myopathy: NMComparisonValue(
        text: "Usually Normal",
        sub: "Reduced only in extreme, late-stage atrophy",
      ),
      neuropathy: NMComparisonValue(
        text: "Decreased (Axonal)",
        sub: "Normal in purely demyelinating cases",
      ),
    ),
    NMComparisonRow(
      feature: "Sensory SNAP Amplitude",
      myopathy: NMComparisonValue(
        text: "Always Normal",
        sub: "Muscle diseases do NOT affect sensory nerves",
      ),
      neuropathy: NMComparisonValue(
        text: "Usually Abnormal",
        sub: "Sensory axons are highly susceptible to damage",
      ),
    ),
    NMComparisonRow(category: "Needle EMG (Rest)"),
    NMComparisonRow(
      feature: "Spontaneous Activity",
      myopathy: NMComparisonValue(
        text: "Variable",
        sub: "Seen prominently in Inflammatory/Necrotizing myopathies",
      ),
      neuropathy: NMComparisonValue(
        text: "Very Common",
        sub: "Fibrillations and PSWs indicate active denervation",
      ),
    ),
    NMComparisonRow(category: "Needle EMG (Voluntary)"),
    NMComparisonRow(
      feature: "MUAP Duration",
      myopathy: NMComparisonValue(
        text: "Short Duration",
        sub: "Loss of muscle fibers within the unit",
      ),
      neuropathy: NMComparisonValue(
        text: "Long Duration",
        sub: "Territorial expansion via reinnervation sprouting",
      ),
    ),
    NMComparisonRow(
      feature: "MUAP Amplitude",
      myopathy: NMComparisonValue(
        text: "Low (Small Height)",
        sub: "Diminished total fiber mass firing",
      ),
      neuropathy: NMComparisonValue(
        text: "High (Giant Height)",
        sub: "One nerve firing an excessive adopted fiber load",
      ),
    ),
    NMComparisonRow(
      feature: "Recruitment Pattern",
      myopathy: NMComparisonValue(
        text: "Early / Dense",
        sub: "Screen rapidly fills despite weak clinical force",
      ),
      neuropathy: NMComparisonValue(
        text: "Reduced / Fast",
        sub: "Sparse screen; surviving units firing at max frequency",
      ),
    ),
    NMComparisonRow(category: "Clinical"),
    NMComparisonRow(
      feature: "Pattern of Weakness",
      myopathy: NMComparisonValue(
        text: "Proximal Focus",
        sub: "Shoulders, hips, and neck flexors",
      ),
      neuropathy: NMComparisonValue(
        text: "Distal Focus",
        sub: "Hands, feet, and distal extremities",
      ),
    ),
  ];

  static const List<NMGlossaryItem> glossary = [
    NMGlossaryItem(
      term: "MUAP (Motor Unit Action Potential)",
      def:
          "The summated electrical activity of all muscle fibers belonging to a single motor unit. The 'fingerprint' of a single nerve's domain.",
    ),
    NMGlossaryItem(
      term: "Recruitment",
      def:
          "The process by which the central nervous system increases the number of active motor units to increase muscle force.",
    ),
    NMGlossaryItem(
      term: "Fibrillations & PSWs",
      def:
          "The tiny, spontaneous electrical discharges of an individual muscle fiber that has lost its nerve supply. It fires on its own, desperately waiting to be reinnervated.",
    ),
    NMGlossaryItem(
      term: "Interference Pattern",
      def:
          "The dense, chaotic cloud of electrical activity seen on the EMG screen during a maximal voluntary contraction.",
    ),
  ];

  static const List<NMQuizQuestion> quiz = [
    NMQuizQuestion(
      question:
          "A patient presents with profound proximal muscle weakness, difficulty climbing stairs, and perfectly normal sensory examinations. Needle EMG reveals an early, dense recruitment pattern. What is the most likely diagnosis?",
      options: [
        "Primary Demyelinating Polyneuropathy",
        "A Myopathic process (e.g., Polymyositis)",
        "Severe Axonal Neuropathy",
      ],
      correct: 1,
      explanation:
          "Proximal weakness, preserved sensation, and early recruitment are classic hallmarks of myopathy. The brain recruits surviving weak motor units extremely early to compensate for muscle failure.",
    ),
    NMQuizQuestion(
      question:
          "In a purely demyelinating polyneuropathy, what is the expected finding on standard Sensory Nerve Action Potential (SNAP) testing?",
      options: [
        "Severely dropped amplitudes but normal conduction velocities",
        "Perfectly normal latencies and velocities",
        "Prolonged latencies and significantly slowed conduction velocities",
      ],
      correct: 2,
      explanation:
          "Demyelination destroys the nerve's insulation. The primary resulting dysfunction is slowed conduction velocity and stretched, prolonged piece-to-piece latencies across the demyelinated segments.",
    ),
    NMQuizQuestion(
      question:
          "You perform a needle EMG on a patient. During voluntary contraction, you observe MUAPs that are extraordinarily tall (giant amplitude) and very wide (long duration). The screen looks incredibly barren with only one or two units firing at rapid speed. What mechanism creates this?",
      options: [
        "Myopathic muscle fiber necrosis",
        "Chronic neurogenic reinnervation (axonal sprouting)",
        "Acute toxic muscle destruction",
      ],
      correct: 1,
      explanation:
          "When nerves die, surviving neighboring nerves aggressively 'sprout' to adopt the orphaned muscle fibers. This creates a massive (tall) and spread-out (wide) electrical footprint: the 'Giant' MUAP of chronic reinnervation.",
    ),
    NMQuizQuestion(
      question:
          "A patient complains of stocking-glove numbness marching up from their toes, absent ankle reflexes, and dropping objects from their hands. What is the likely pathology?",
      options: [
        "Inflammatory Myopathy",
        "Length-Dependent Peripheral Neuropathy",
        "Focal Muscle Dystrophy",
      ],
      correct: 1,
      explanation:
          "Stocking-glove sensory loss, distal weakness, and absent reflexes strongly indicate a length-dependent peripheral neuropathy (the longest nerves dying back first), often due to metabolic causes like Diabetes.",
    ),
    NMQuizQuestion(
      question:
          "Why do we typically see a 'Short Duration' MUAP in an active myopathy?",
      options: [
        "The nerve fires faster to compensate",
        "The surviving muscle fibers within the unit are fewer, so the electrical wave takes less time to pass",
        "Demyelination causes the signal to shrink in length",
      ],
      correct: 1,
      explanation:
          "In myopathy, the nerve is healthy but many of the muscle fibers it commands have died. With fewer workers responding to the nerve's signal, the total electrical ripple created in the muscle is physically shorter in time.",
    ),
    NMQuizQuestion(
      question:
          "A patient taking high-dose prednisone for months develops severe proximal weakness. Their EMG study appears surprisingly normal with little to no spontaneous activity. Why?",
      options: [
        "Steroid myopathy selectively atrophies Type II fibers, while standard EMG primarily records healthier Type I fibers",
        "The weakness is entirely psychological",
        "Steroids enhance nerve conduction velocity to hide the muscle damage",
      ],
      correct: 0,
      explanation:
          "Steroid myopathy is notorious for looking normal on EMG because it selectively targets Type II (fast-twitch) muscle fibers. The needle largely misses this damage because it naturally records the healthier Type I fibers during mild contraction.",
    ),
    NMQuizQuestion(
      question:
          "In a severe axonal loss motor neuropathy, what is the foundational abnormality seen on the Nerve Conduction Study (NCS)?",
      options: [
        "Massive drops in conduction velocity",
        "Severely reduced Compound Muscle Action Potential (CMAP) amplitudes",
        "Focal conduction block across the forearm",
      ],
      correct: 1,
      explanation:
          "Axonal loss means the physical wires are cut or dead. Fewer wires reaching the target muscle means less electricity delivered, yielding a starkly reduced CMAP amplitude. The surviving fibers still conduct at normal velocities.",
    ),
    NMQuizQuestion(
      question:
          "You stick a resting muscle with your EMG needle and hear a sound like 'rain on a tin roof' consisting of Fibrillations and Positive Sharp Waves. What does this mean?",
      options: [
        "Perfectly normal muscle tone",
        "Active denervation: individual orphaned muscle fibers are spontaneously misfiring",
        "A purely demyelinating conduction block",
      ],
      correct: 1,
      explanation:
          "Fibrillations and Positive Sharp Waves are the desperate cries of individual muscle fibers that have been physically separated from their nerve supply. They become hyper-irritable and fire spontaneously while waiting for reinnervation.",
    ),
    NMQuizQuestion(
      question:
          "According to the fundamental 'Rules of Thumb', which scenario represents the 'Labor Shortage' where surviving units must fire incredibly fast to generate any force?",
      options: ["Neuropathy", "Myopathy", "Both depending on temperature"],
      correct: 0,
      explanation:
          "Neuropathy is the Labor Shortage. The axons (workers) die off. To make up the deficit, the few surviving axon units must fire at absolute maximum frequency to maintain strength. Myopathy is the Weak Workforce (too many weak units firing early).",
    ),
    NMQuizQuestion(
      question:
          "Which of the following describes a 'Full Interference Pattern'?",
      options: [
        "The screen showing absolutely zero electrical activity during maximum effort",
        "A single motor unit firing clearly and slowly at 10 Hz",
        "A dense, overlapping, chaotic cloud of electrical activity filling the screen during maximal voluntary contraction",
      ],
      correct: 2,
      explanation:
          "The interference pattern occurs when the patient exerts maximal force. The brain recruits every motor unit available, and they fire so fast and densely that the individual spikes 'interfere' with each other, creating a solid wall of electrical noise.",
    ),
  ];
}
