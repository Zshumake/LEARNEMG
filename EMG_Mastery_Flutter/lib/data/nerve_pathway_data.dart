import 'package:flutter/material.dart';
import 'models/nerve_pathway_content.dart';
import '../core/theme/app_theme.dart';

/// Complete nerve pathway data ported from PathwayData.js
class NervePathwayData {
  static final List<NerveGroup> groups = [
    const NerveGroup(
      title: 'Upper Extremity',
      nerves: [median, ulnar, radial, musculocutaneous, axillary],
    ),
    const NerveGroup(
      title: 'Lower Extremity',
      nerves: [sciatic, tibial, peroneal, femoral, obturator, sural],
    ),
  ];

  static final List<NervePathway> allNerves = [
    median,
    ulnar,
    radial,
    musculocutaneous,
    axillary,
    sciatic,
    tibial,
    peroneal,
    femoral,
    obturator,
    sural,
  ];

  // ─── UPPER EXTREMITY ─────────────────────────────────────────────

  static const median = NervePathway(
    id: 'median',
    name: 'Median Nerve',
    roots: 'C6-T1',
    themeColor: Color(0xFF2563EB),
    themeColorDark: Color(0xFF1D4ED8),
    imagePath: 'assets/images/pathways/Median Nerve.webp',
    story:
        "The Median nerve is the powerhouse of the anterior forearm and the precision tool of the hand. It forms from the convergence of the lateral cord and the medial cord of the brachial plexus. It runs cleanly down the upper arm with the brachial artery, taking no branches, until it hits the elbow. Here, it dives deep between the two heads of the pronator teres muscle—its first major 'pinch point'. It then powers almost all the flexors of the forearm before slipping into the notoriously tight Carpal Tunnel at the wrist, emerging to supply the critical 'thenar' muscles at the base of the thumb and sensation to the primary grasping fingers.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'Forms from the convergence of the lateral and medial cords of the brachial plexus in the axilla (C6-T1).',
      ),
      PathwayStep(
        title: 'Descent of the Arm',
        description:
            'Travels straight down the medial aspect of the humerus running alongside the brachial artery. It gives off absolutely zero branches in the upper arm.',
      ),
      PathwayStep(
        title: 'The Cubital Fossa',
        description:
            'Crosses the front of the elbow joint (cubital fossa), sitting medial to the biceps tendon and brachial artery.',
      ),
      PathwayStep(
        title: 'Pronator Teres Entrapment',
        description:
            "The nerve must dive between the two muscular heads of the Pronator Teres. If this muscle hypertrophies or spasms, it can crush the nerve here, causing 'Pronator Teres Syndrome'.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'The AIN Branch',
        description:
            'Deep in the forearm, it yields the Anterior Interosseous Nerve (AIN), a pure motor branch that dives to the bone to supply the deep finger and thumb flexors (FDP and FPL).',
      ),
      PathwayStep(
        title: 'The Carpal Tunnel',
        description:
            "The ultimate bottleneck. The nerve, along with 9 thick flexor tendons, must pass under the rigid Transverse Carpal Ligament. Any swelling here crushes the nerve against the ligament, resulting in Carpal Tunnel Syndrome—the most common entrapment globally.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Hand Terminus',
        description:
            'Emerges from the tunnel to supply the crucial thenar muscles (LOAF: Lumbricals 1 & 2, Opponens pollicis, Abductor pollicis brevis, Flexor pollicis brevis) and sensation to the palmar thumb, index, middle, and half of the ring finger.',
      ),
    ],
  );

  static const ulnar = NervePathway(
    id: 'ulnar',
    name: 'Ulnar Nerve',
    roots: 'C8-T1',
    themeColor: Color(0xFF7C3AED),
    themeColorDark: Color(0xFF6D28D9),
    imagePath: 'assets/images/pathways/Ulnar Nerve.webp',
    story:
        "The Ulnar nerve is the fine-tuner of the hand. While the Median nerve provides the gross grasping power, the Ulnar nerve provides the delicate, intrinsic finger spreading and pinching required for complex tasks like playing piano or writing. Originating from the medial cord, it descends the arm until it swings completely behind the elbow joint, passing through the highly exposed Cubital Tunnel (your 'funny bone'). It then ducks down the medial forearm before entering the hand via its own specialized tunnel (Guyon's Canal) next to the pisiform bone.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'Arises solely from the medial cord of the brachial plexus, carrying fibers predominantly from C8 and T1.',
      ),
      PathwayStep(
        title: 'Medial Upper Arm',
        description:
            'Travels down the medial aspect of the arm, parallel to the brachial artery, before piercing the medial intermuscular septum to move posteriorly.',
      ),
      PathwayStep(
        title: 'The Cubital Tunnel',
        description:
            "Passes directly behind the medial epicondyle of the humerus, trapped under Osborne's ligament. This is the 'funny bone'. Bending the elbow stretches the nerve tightly over the bone here, making it the second most common site of nerve compression.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Forearm Entry',
        description:
            'Passes between the two heads of the Flexor Carpi Ulnaris (FCU) muscle to enter the anterior compartment of the forearm.',
      ),
      PathwayStep(
        title: "Guyon's Canal",
        description:
            "At the wrist, it bypasses the carpal tunnel entirely. Instead, it runs through a separate superficial bridge called Guyon's Canal, roofed by the volar carpal ligament. Cyclists holding handlebars often crush the nerve here.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Intrinsic Motor Division',
        description:
            'In the palm, it splits. The deep motor branch dives beneath the muscles to supply almost all the small, intrinsic muscles of the hand (interossei, hypothenar eminence, adductor pollicis).',
      ),
      PathwayStep(
        title: 'Sensory Division',
        description:
            'The superficial branch provides sensation only to the pinky finger and the medial half of the ring finger.',
      ),
    ],
  );

  static const radial = NervePathway(
    id: 'radial',
    name: 'Radial Nerve',
    roots: 'C5-T1',
    themeColor: Color(0xFFEA580C),
    themeColorDark: Color(0xFFC2410C),
    imagePath: 'assets/images/pathways/Radial Nerve.webp',
    story:
        "The Radial nerve is the great extensor. It commands every muscle required to straighten your elbow, wrist, and fingers. Arising from the posterior cord, it violently spirals around the back of the humerus bone. This anatomical quirk puts it directly against the bone, meaning a solid strike or a mid-shaft humerus fracture can instantly severe or crush it, resulting in the classic 'wrist drop'. It crosses the lateral elbow before splitting into two highly specialized terminal branches: one for pure movement, one for pure feeling.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'A direct continuation of the posterior cord of the brachial plexus, carrying fibers from all roots (C5-T1).',
      ),
      PathwayStep(
        title: 'The Spiral Groove',
        description:
            "Winds tightly around the posterior shaft of the humerus in the 'spiral groove'. It lays directly against the bare bone here. Falling asleep with an arm over a park bench ('Saturday Night Palsy') or fracturing the humerus crushes the nerve against the bone.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Lateral Emergence',
        description:
            'Pierces the lateral intermuscular septum to move to the front of the arm just above the elbow, riding over the lateral epicondyle.',
      ),
      PathwayStep(
        title: 'The Great Divide',
        description:
            'At the elbow, it splits completely into two distinct paths: the superficial sensory branch and the deep motor branch (the Posterior Interosseous Nerve, or PIN).',
      ),
      PathwayStep(
        title: 'Arcade of Frohse (PIN)',
        description:
            "The heavy motor branch (PIN) must dive through a tough fibrotic arch in the Supinator muscle known as the Arcade of Frohse. Repetitive twisting motions (mechanics using screwdrivers) can trap the nerve here, causing pure weakness without any numbness.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Dorsal Sensory Path',
        description:
            'The superficial sensory branch continues down the forearm under the brachioradialis to safely supply sensation to the back of the hand.',
      ),
    ],
  );

  static const musculocutaneous = NervePathway(
    id: 'musculocutaneous',
    name: 'Musculocutaneous Nerve',
    roots: 'C5-C7',
    themeColor: Color(0xFF059669),
    themeColorDark: Color(0xFF047857),
    imagePath: 'assets/images/pathways/Musculocutaneous Nerve.webp',
    story:
        "A relatively short but powerful nerve arising directly from the lateral cord. It executes a unique anatomical maneuver by physically piercing straight through the meat of the coracobrachialis muscle. It acts as the primary power source for your biceps before tapering off to simply provide sensation to the skin of the outer forearm.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'The terminal branch of the lateral cord of the brachial plexus (C5-C7).',
      ),
      PathwayStep(
        title: 'Muscle Piercing',
        description:
            'Instead of going around, it violently pierces directly through the muscle belly of the Coracobrachialis.',
      ),
      PathwayStep(
        title: 'Biceps Power',
        description:
            'Travels deep to the biceps brachii, providing massive motor innervation to both the biceps and the brachialis muscle beneath it.',
      ),
      PathwayStep(
        title: 'Sensory Transition',
        description:
            'Having exhausted its motor fibers, it emerges lateral to the biceps tendon at the elbow as a pure sensory nerve.',
      ),
      PathwayStep(
        title: 'Lateral Antebrachial Cutaneous',
        description:
            'It changes its name to the Lateral Antebrachial Cutaneous (LAC) nerve, providing feeling to the skin on the lateral (thumb) side of the forearm.',
      ),
    ],
  );

  static const axillary = NervePathway(
    id: 'axillary',
    name: 'Axillary Nerve',
    roots: 'C5-C6',
    themeColor: Color(0xFFDC2626),
    themeColorDark: Color(0xFFB91C1C),
    imagePath: 'assets/images/pathways/Axillary Nerve.webp',
    story:
        "The Axillary nerve is critical for shoulder function. It arises from the posterior cord and immediately dives backwards through a small anatomical window (the quadrilateral space) to wrap tightly around the surgical neck of the humerus. Because it hugs the loose shoulder joint so closely, anterior shoulder dislocations frequently stretch and tear this nerve, paralyzing the massive deltoid muscle.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'Originates from the posterior cord alongside the radial nerve (C5-C6).',
      ),
      PathwayStep(
        title: 'Quadrilateral Space',
        description:
            'Dives backward out of the axilla through a tiny square window bordered by the teres major, teres minor, triceps, and humerus.',
      ),
      PathwayStep(
        title: 'Surgical Neck Vulnerability',
        description:
            "Wraps horizontally around the 'surgical neck' of the upper humerus. If the shoulder pops out of socket (dislocation), the migrating bone stretches and shreds the nerve.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Deltoid Command',
        description:
            'Provides massive motor innervation to the entire Deltoid muscle, allowing you to lift your arm outward.',
      ),
      PathwayStep(
        title: 'Regimental Badge',
        description:
            'Terminates by providing a small patch of sensation over the lateral shoulder, exactly where a military patch would sit.',
      ),
    ],
  );

  // ─── LOWER EXTREMITY ─────────────────────────────────────────────

  static const sciatic = NervePathway(
    id: 'sciatic',
    name: 'Sciatic Nerve',
    roots: 'L4-S3',
    themeColor: AppTheme.slate950,
    themeColorDark: Color(0xFF020617),
    imagePath: 'assets/images/pathways/Sciatic Nerve.webp',
    story:
        "The Sciatic nerve is the absolute titan of the human body. As thick as an adult's thumb, it carries almost all the electrical wiring for the entire lower leg and foot. It exits the deep pelvis through the greater sciatic foramen, diving under the piriformis muscle. It travels largely unprotected down the back of the thigh, powering the massive hamstring muscles. Behind the knee, this massive trunk finally bifurcates into the Tibial and Peroneal nerves.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'A massive confluence of the sacral plexus, drawing heavy contributions all the way from L4 down to S3.',
      ),
      PathwayStep(
        title: 'Pelvic Exit',
        description:
            'Leaves the protective vault of the pelvis through the greater sciatic foramen.',
      ),
      PathwayStep(
        title: 'Piriformis Entrapment',
        description:
            "It typically passes just beneath the piriformis muscle deep in the buttocks. In some people, the nerve pierces the muscle. A tight piriformis can fiercely crimp the nerve, causing 'Piriformis Syndrome' (deep buttock pain radiating down the leg).",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Posterior Thigh',
        description:
            'Descends directly down the midline of the posterior thigh, dispatching thick motor branches to power the hamstrings.',
      ),
      PathwayStep(
        title: 'The Great Divide',
        description:
            'Just above the back of the knee (the popliteal fossa), the giant trunk finally unzips into its two terminal components: the Tibial and Common Peroneal nerves.',
      ),
    ],
  );

  static const tibial = NervePathway(
    id: 'tibial',
    name: 'Tibial Nerve',
    roots: 'L4-S3',
    themeColor: Color(0xFF0891B2),
    themeColorDark: Color(0xFF0E7490),
    imagePath: 'assets/images/pathways/Tibial Nerve.webp',
    story:
        "The Tibial nerve is the workhorse of the posterior leg. Born from the massive sciatic trunk, it plunges straight down the back of the calf, buried deep beneath the massive gastrocnemius (calf) muscle. It provides the immense power required to push off your toes when walking or jumping. To reach the bottom of the foot, it must hook sharply under the medial ankle bone, passing through the tight Tarsal Tunnel, where it acts much like the median nerve at the wrist.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'The direct medial continuation of the bifurcated sciatic nerve.',
      ),
      PathwayStep(
        title: 'Popliteal Fossa',
        description:
            'Crosses behind the knee joint running safely alongside the popliteal artery and vein.',
      ),
      PathwayStep(
        title: 'Deep Calf Muscles',
        description:
            'Dives deep under the massive calf muscles (Gastrocnemius and Soleus), providing the critical motor power for pushing off (plantarflexion).',
      ),
      PathwayStep(
        title: 'The Tarsal Tunnel',
        description:
            'To reach the bottom of the foot, it hooks tightly around the inside ankle bone (medial malleolus) passing under the thick flexor retinaculum. Swelling here causes Tarsal Tunnel Syndrome, leading to burning pain on the sole of the foot.',
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Plantar Division',
        description:
            'Successfully through the tunnel, it divides into the Medial and Lateral Plantar nerves, supplying all the intrinsic muscles of the sole and sensory coverage to the bottom of the foot.',
      ),
    ],
  );

  static const peroneal = NervePathway(
    id: 'peroneal',
    name: 'Peroneal (Fibular) Nerve',
    roots: 'L4-S2',
    themeColor: Color(0xFFD97706),
    themeColorDark: Color(0xFFB45309),
    imagePath: 'assets/images/pathways/Deep Fibular Nerve.webp',
    story:
        "The Common Peroneal nerve is highly notorious for its catastrophic anatomical vulnerability. After splitting from the sciatic nerve, it swings laterally and wraps tightly around the bony neck of the fibula, just under the skin. Because there is virtually zero muscle or fat protecting it here, even crossing your legs too tightly for too long can crush this nerve against the bone. Damage here instantly paralyses the muscles that lift the foot, resulting in the classic, devastating 'Foot Drop'.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description: 'The lateral division of the colossal sciatic nerve.',
      ),
      PathwayStep(
        title: 'Fibular Neck Wrap',
        description:
            "Swings to the outside of the knee and violently wraps around the bony neck of the fibula. It is shockingly superficial here. Casts, tight knee braces, or simply sleeping awkwardly can crush the nerve against the bone, causing 'Foot Drop'.",
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'The Split',
        description:
            'Immediately after surviving the fibular neck, it splits into the Superficial and Deep branches.',
      ),
      PathwayStep(
        title: 'Superficial Branch',
        description:
            "Travels down the outside of the shin, powering the ankle 'eversion' muscles before spraying out to provide sensation over the broad top of the foot.",
      ),
      PathwayStep(
        title: 'Deep Branch (Anterior Tarsal Tunnel)',
        description:
            "Dives deep to power the crucial 'dorsiflexor' muscles that pick the foot up. It eventually surfaces at the front of the ankle, passing under the tight extensor retinaculum. Tight shoelaces or heavy boots can compress it here (Anterior Tarsal Tunnel Syndrome).",
        isInjurySite: true,
      ),
    ],
  );

  static const femoral = NervePathway(
    id: 'femoral',
    name: 'Femoral Nerve',
    roots: 'L2-L4',
    themeColor: Color(0xFF4F46E5),
    themeColorDark: Color(0xFF4338CA),
    imagePath: 'assets/images/pathways/Femoral Nerve.webp',
    story:
        "The Femoral nerve is the king of the anterior thigh. Assembling deep within the psoas muscle of the abdomen, it slips under the tough inguinal ligament (the groin crease) to explode into a massive starburst of muscular branches. These branches power the massive quadriceps muscles, which are utterly essential for standing up from a chair, climbing stairs, or simply preventing your knee from buckling when you walk.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'Assembles from the posterior divisions of the lumbar plexus (L2-L4), high up in the abdominal vault.',
      ),
      PathwayStep(
        title: 'Psoas Descent',
        description:
            'Travels down through the core meat of the psoas major muscle. A pelvic bleed or tumor can compress the nerve here before it even reaches the leg.',
      ),
      PathwayStep(
        title: 'Inguinal Ligament',
        description:
            'Slips under the dense inguinal ligament into the thigh. Childbirth or prolonged lithotomy positions can stretch and damage the nerve here.',
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'Quadriceps Starburst',
        description:
            'Immediately shatters into numerous deep branches to fire the colossal quadriceps muscles.',
      ),
      PathwayStep(
        title: 'The Saphenous Continuation',
        description:
            'The final, longest sensory-only branch (the Saphenous Nerve) continues down the inside of the thigh and calf, providing sensation all the way to the inner ankle.',
      ),
    ],
  );

  static const obturator = NervePathway(
    id: 'obturator',
    name: 'Obturator Nerve',
    roots: 'L2-L4',
    themeColor: Color(0xFFBE185D),
    themeColorDark: Color(0xFF831843),
    imagePath: 'assets/images/pathways/Obturator Nerve.webp',
    story:
        "The elusive sibling of the femoral nerve. While the femoral nerve takes the front of the thigh, the Obturator nerve heads straight to the inner thigh. It exits the deep pelvis through a tiny ring of bone and ligament (the obturator canal) to innervate the heavy adductor muscles that squeeze your thighs together.",
    steps: [
      PathwayStep(
        title: 'The Origin',
        description:
            'Arises from the anterior divisions of the lumbar plexus (L2-L4).',
      ),
      PathwayStep(
        title: 'Pelvic Journey',
        description:
            'Runs along the lateral pelvic wall, largely out of sight.',
      ),
      PathwayStep(
        title: 'The Obturator Canal',
        description:
            'Must squeeze through a tiny circular window in the pelvis known as the obturator canal to reach the leg. Pelvic fractures or heavy scarring from pelvic surgery can trap the nerve here.',
        isInjurySite: true,
      ),
      PathwayStep(
        title: 'The Adductor Powerhouse',
        description:
            'Splits into anterior and posterior branches to power the massive adductor longus, brevis, and magnus muscles.',
      ),
      PathwayStep(
        title: 'Sensory Patch',
        description:
            'Provides a small, highly variable patch of sensation to the skin of the inner thigh.',
      ),
    ],
  );

  static const sural = NervePathway(
    id: 'sural',
    name: 'Sural Nerve',
    roots: 'S1-S2',
    themeColor: Color(0xFF059669),
    themeColorDark: Color(0xFF064E3B),
    imagePath: 'assets/images/pathways/Sural Nerve.webp',
    story:
        "The Sural nerve is a fascinating anatomical cooperation. It is a completely sensory nerve formed by two communicating branches—one from the Tibial nerve, one from the Peroneal nerve—joining forces halfway down the back of the calf. It serves as the standard 'reference nerve' for all lower extremity sensory studies because it reliably travels right behind the outside ankle bone.",
    steps: [
      PathwayStep(
        title: 'The Origin (A Meeting of Two)',
        description:
            'Uniquely formed when a branch from the tibial nerve (medial sural cutaneous) merges with a branch from the common peroneal nerve.',
      ),
      PathwayStep(
        title: 'Calf Descent',
        description:
            'Runs straight down the midline of the back of the calf, traveling safely alongside the small saphenous vein.',
      ),
      PathwayStep(
        title: 'Lateral Malleolus Landmark',
        description:
            'Swings distinctly behind the lateral malleolus (the outside ankle bone). This predictable bony landmark is why we always use the Sural nerve to test for length-dependent neuropathies.',
      ),
      PathwayStep(
        title: 'Lateral Foot',
        description:
            'Provides absolute sensory coverage to the outer edge of the foot and the pinky toe.',
      ),
    ],
  );
}
