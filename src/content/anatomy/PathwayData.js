/**
 * PathwayData.js
 * Comprehensive anatomical data for the Nerve Explorer module.
 * Provides mentor-style explanations, step-by-step pathway narratives, and clinical context.
 */

export const PathwayData = {
    themeColors: {
        median: '#2563eb', // blue
        ulnar: '#7c3aed', // purple
        radial: '#ea580c', // orange
        musculocutaneous: '#059669', // green
        axillary: '#dc2626', // red
        sciatic: '#0f172a', // slate
        tibial: '#0891b2', // cyan/teal
        peroneal: '#d97706', // amber
        femoral: '#4f46e5', // indigo
        obturator: '#be185d', // pink
        sural: '#059669' // emerald
    },

    nerves: {
        // --- UPPER EXTREMITY ---
        median: {
            name: "Median Nerve",
            roots: "C6-T1",
            story: "The Median nerve is the powerhouse of the anterior forearm and the precision tool of the hand. It forms from the convergence of the precise lateral cord and the powerful medial cord of the brachial plexus. It runs cleanly down the upper arm with the brachial artery, taking no branches, until it hits the elbow. Here, it dives deep between the two heads of the pronator teres muscle—its first major 'pinch point'. It then powers almost all the flexors of the forearm before slipping into the notoriously tight Carpal Tunnel at the wrist, emerging to supply the critical 'thenar' muscles at the base of the thumb and sensation to the primary grasping fingers.",
            imagePath: "images/anatomy/median_nerve.png",
            steps: [
                { title: "The Origin", desc: "Forms from the convergence of the lateral and medial cords of the brachial plexus in the axilla (C6-T1).", isInjurySite: false },
                { title: "Descent of the Arm", desc: "Travels straight down the medial aspect of the humerus running alongside the brachial artery. It gives off absolutely zero branches in the upper arm.", isInjurySite: false },
                { title: "The Cubital Fossa", desc: "Crosses the front of the elbow joint (cubital fossa), sitting medial to the biceps tendon and brachial artery.", isInjurySite: false },
                { title: "Pronator Teres Entrapment", desc: "The nerve must dive between the two muscular heads of the Pronator Teres. If this muscle hypertrophies or spasms, it can crush the nerve here, causing 'Pronator Teres Syndrome'.", isInjurySite: true },
                { title: "The AIN Branch", desc: "Deep in the forearm, it yields the Anterior Interosseous Nerve (AIN), a pure motor branch that dives to the bone to supply the deep finger and thumb flexors (FDP and FPL).", isInjurySite: false },
                { title: "The Carpal Tunnel", desc: "The ultimate bottleneck. The nerve, along with 9 thick flexor tendons, must pass under the rigid Transverse Carpal Ligament. Any swelling here crushes the nerve against the ligament, resulting in Carpal Tunnel Syndrome—the most common entrapment globally.", isInjurySite: true },
                { title: "Hand Terminus", desc: "Emerges from the tunnel to supply the crucial thenar muscles (LOAF: Lumbricals 1 & 2, Opponens pollicis, Abductor pollicis brevis, Flexor pollicis brevis) and sensation to the palmar thumb, index, middle, and half of the ring finger.", isInjurySite: false }
            ]
        },
        ulnar: {
            name: "Ulnar Nerve",
            roots: "C8-T1",
            story: "The Ulnar nerve is the fine-tuner of the hand. While the Median nerve provides the gross grasping power, the Ulnar nerve provides the delicate, intrinsic finger spreading and pinching required for complex tasks like playing piano or writing. Originating from the medial cord, it descends the arm until it swings completely behind the elbow joint, passing through the highly exposed Cubital Tunnel (your 'funny bone'). It then ducks down the medial forearm before entering the hand via its own specialized tunnel (Guyon's Canal) next to the pisiform bone.",
            imagePath: "images/pathways/Ulnar%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "Arises solely from the medial cord of the brachial plexus, carrying fibers predominantly from C8 and T1.", isInjurySite: false },
                { title: "Medial Upper Arm", desc: "Travels down the medial aspect of the arm, parallel to the brachial artery, before piercing the medial intermuscular septum to move posteriorly.", isInjurySite: false },
                { title: "The Cubital Tunnel", desc: "Passes directly behind the medial epicondyle of the humerus, trapped under Osborne's ligament. This is the 'funny bone'. Bending the elbow stretches the nerve tightly over the bone here, making it the second most common site of nerve compression.", isInjurySite: true },
                { title: "Forearm Entry", desc: "Passes between the two heads of the Flexor Carpi Ulnaris (FCU) muscle to enter the anterior compartment of the forearm.", isInjurySite: false },
                { title: "Guyon's Canal", desc: "At the wrist, it bypasses the carpal tunnel entirely. Instead, it runs through a separate superficial bridge called Guyon's Canal, roofed by the volar carpal ligament. Cyclists holding handlebars often crush the nerve here.", isInjurySite: true },
                { title: "Intrinsic Motor Division", desc: "In the palm, it splits. The deep motor branch dives beneath the muscles to supply almost all the small, intrinsic muscles of the hand (interossei, hypothenar eminence, adductor pollicis).", isInjurySite: false },
                { title: "Sensory Division", desc: "The superficial branch provides sensation only to the pinky finger and the medial half of the ring finger.", isInjurySite: false }
            ]
        },
        radial: {
            name: "Radial Nerve",
            roots: "C5-T1",
            story: "The Radial nerve is the great extensor. It commands every muscle required to straighten your elbow, wrist, and fingers. Arising from the posterior cord, it violently spirals around the back of the humerus bone. This anatomical quirk puts it directly against the bone, meaning a solid strike or a mid-shaft humerus fracture can instantly severe or crush it, resulting in the classic 'wrist drop'. It crosses the lateral elbow before splitting into two highly specialized terminal branches: one for pure movement, one for pure feeling.",
            imagePath: "images/pathways/Radial%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "A direct continuation of the posterior cord of the brachial plexus, carrying fibers from all roots (C5-T1).", isInjurySite: false },
                { title: "The Spiral Groove", desc: "Winds tightly around the posterior shaft of the humerus in the 'spiral groove'. It lays directly against the bare bone here. Falling asleep with an arm over a park bench ('Saturday Night Palsy') or fracturing the humerus crushes the nerve against the bone.", isInjurySite: true },
                { title: "Lateral Emergence", desc: "Pierces the lateral intermuscular septum to move to the front of the arm just above the elbow, riding over the lateral epicondyle.", isInjurySite: false },
                { title: "The Great Divide", desc: "At the elbow, it splits completely into two distinct paths: the superficial sensory branch and the deep motor branch (the Posterior Interosseous Nerve, or PIN).", isInjurySite: false },
                { title: "Arcade of Frohse (PIN)", desc: "The heavy motor branch (PIN) must dive through a tough fibrotic arch in the Supinator muscle known as the Arcade of Frohse. Repetitive twisting motions (mechanics using screwdrivers) can trap the nerve here, causing pure weakness without any numbness.", isInjurySite: true },
                { title: "Dorsal Sensory Path", desc: "The superficial sensory branch continues down the forearm under the brachioradialis to safely supply sensation to the back of the hand.", isInjurySite: false }
            ]
        },
        musculocutaneous: {
            name: "Musculocutaneous Nerve",
            roots: "C5-C7",
            story: "A relatively short but powerful nerve arising directly from the lateral cord. It executes a unique anatomical maneuver by physically piercing straight through the meat of the coracobrachialis muscle. It acts as the primary power source for your biceps before tapering off to simply provide sensation to the skin of the outer forearm.",
            imagePath: "images/pathways/Musculocutaneous%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "The terminal branch of the lateral cord of the brachial plexus (C5-C7).", isInjurySite: false },
                { title: "Muscle Piercing", desc: "Instead of going around, it violently pierces directly through the muscle belly of the Coracobrachialis.", isInjurySite: false },
                { title: "Biceps Power", desc: "Travels deep to the biceps brachii, providing massive motor innervation to both the biceps and the brachialis muscle beneath it.", isInjurySite: false },
                { title: "Sensory Transition", desc: "Having exhausted its motor fibers, it emerges lateral to the biceps tendon at the elbow as a pure sensory nerve.", isInjurySite: false },
                { title: "Lateral Antebrachial Cutaneous", desc: "It changes its name to the Lateral Antebrachial Cutaneous (LAC) nerve, providing feeling to the skin on the lateral (thumb) side of the forearm.", isInjurySite: false }
            ]
        },
        axillary: {
            name: "Axillary Nerve",
            roots: "C5-C6",
            story: "The Axillary nerve is critical for shoulder function. It arises from the posterior cord and immediately dives backwards through a small anatomical window (the quadrilateral space) to wrap tightly around the surgical neck of the humerus. Because it hugs the loose shoulder joint so closely, anterior shoulder dislocations frequently stretch and tear this nerve, paralyzing the massive deltoid muscle.",
            imagePath: "images/pathways/Axillary%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "Originates from the posterior cord alongside the radial nerve (C5-C6).", isInjurySite: false },
                { title: "Quadrilateral Space", desc: "Dives backward out of the axilla through a tiny square window bordered by the teres major, teres minor, triceps, and humerus.", isInjurySite: false },
                { title: "Surgical Neck Vulnerability", desc: "Wraps horizontally around the 'surgical neck' of the upper humerus. If the shoulder pops out of socket (dislocation), the migrating bone stretches and shreds the nerve.", isInjurySite: true },
                { title: "Deltoid Command", desc: "Provides massive motor innervation to the entire Deltoid muscle, allowing you to lift your arm outward.", isInjurySite: false },
                { title: "Regimental Badge", desc: "Terminates by providing a small patch of sensation over the lateral shoulder, exactly where a military patch would sit.", isInjurySite: false }
            ]
        },

        // --- LOWER EXTREMITY ---
        sciatic: {
            name: "Sciatic Nerve",
            roots: "L4-S3",
            story: "The Sciatic nerve is the absolute titan of the human body. As thick as an adult's thumb, it carries almost all the electrical wiring for the entire lower leg and foot. It exits the deep pelvis through the greater sciatic foramen, diving under the piriformis muscle. It travels largely unprotected down the back of the thigh, powering the massive hamstring muscles. Behind the knee, this massive trunk finally bifurcates into the Tibial and Peroneal nerves.",
            imagePath: "images/pathways/Sciatic%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "A massive confluence of the sacral plexus, drawing heavy contributions all the way from L4 down to S3.", isInjurySite: false },
                { title: "Pelvic Exit", desc: "Leaves the protective vault of the pelvis through the greater sciatic foramen.", isInjurySite: false },
                { title: "Piriformis Entrapment", desc: "It typically passes just beneath the piriformis muscle deep in the buttocks. In some people, the nerve pierces the muscle. A tight piriformis can fiercely crimp the nerve, causing 'Piriformis Syndrome' (deep buttock pain radiating down the leg).", isInjurySite: true },
                { title: "Posterior Thigh", desc: "Descends directly down the midline of the posterior thigh, dispatching thick motor branches to power the hamstrings.", isInjurySite: false },
                { title: "The Great Divide", desc: "Just above the back of the knee (the popliteal fossa), the giant trunk finally unzips into its two terminal components: the Tibial and Common Peroneal nerves.", isInjurySite: false }
            ]
        },
        tibial: {
            name: "Tibial Nerve",
            roots: "L4-S3",
            story: "The Tibial nerve is the workhorse of the posterior leg. Born from the massive sciatic trunk, it plunges straight down the back of the calf, buried deep beneath the massive gastrocnemius (calf) muscle. It provides the immense power required to push off your toes when walking or jumping. To reach the bottom of the foot, it must hook sharply under the medial ankle bone, passing through the tight Tarsal Tunnel, where it acts much like the median nerve at the wrist.",
            imagePath: "images/pathways/Tibial%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "The direct medial continuation of the bifurcated sciatic nerve.", isInjurySite: false },
                { title: "Popliteal Fossa", desc: "Crosses behind the knee joint running safely alongside the popliteal artery and vein.", isInjurySite: false },
                { title: "Deep Calf Muscles", desc: "Dives deep under the massive calf muscles (Gastrocnemius and Soleus), providing the critical motor power for pushing off (plantarflexion).", isInjurySite: false },
                { title: "The Tarsal Tunnel", desc: "To reach the bottom of the foot, it hooks tightly around the inside ankle bone (medial malleolus) passing under the thick flexor retinaculum. Swelling here causes Tarsal Tunnel Syndrome, leading to burning pain on the sole of the foot.", isInjurySite: true },
                { title: "Plantar Division", desc: "Successfully through the tunnel, it divides into the Medial and Lateral Plantar nerves, supplying all the intrinsic muscles of the sole and sensory coverage to the bottom of the foot.", isInjurySite: false }
            ]
        },
        peroneal: {
            name: "Peroneal (Fibular) Nerve",
            roots: "L4-S2",
            story: "The Common Peroneal nerve is highly notorious for its catastrophic anatomical vulnerability. After splitting from the sciatic nerve, it swings laterally and wraps tightly around the bony neck of the fibula, just under the skin. Because there is virtually zero muscle or fat protecting it here, even crossing your legs too tightly for too long can crush this nerve against the bone. Damage here instantly paralyses the muscles that lift the foot, resulting in the classic, devastating 'Foot Drop'.",
            imagePath: "images/pathways/Deep%20Fibular%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "The lateral division of the colossal sciatic nerve.", isInjurySite: false },
                { title: "Fibular Neck Wrap", desc: "Swings to the outside of the knee and violently wraps around the bony neck of the fibula. It is shockingly superficial here. Casts, tight knee braces, or simply sleeping awkwardly can crush the nerve against the bone, causing 'Foot Drop'.", isInjurySite: true },
                { title: "The Split", desc: "Immediately after surviving the fibular neck, it splits into the Superficial and Deep branches.", isInjurySite: false },
                { title: "Superficial Branch", desc: "Travels down the outside of the shin, powering the ankle 'eversion' muscles before spraying out to provide sensation over the broad top of the foot.", isInjurySite: false },
                { title: "Deep Branch (Anterior Tarsal Tunnel)", desc: "Dives deep to power the crucial 'dorsiflexor' muscles that pick the foot up. It eventually surfaces at the front of the ankle, passing under the tight extensor retinaculum. Tight shoelaces or heavy boots can compress it here (Anterior Tarsal Tunnel Syndrome).", isInjurySite: true }
            ]
        },
        femoral: {
            name: "Femoral Nerve",
            roots: "L2-L4",
            story: "The Femoral nerve is the king of the anterior thigh. Assembling deep within the psoas muscle of the abdomen, it slips under the tough inguinal ligament (the groin crease) to explode into a massive starburst of muscular branches. These branches power the massive quadriceps muscles, which are utterly essential for standing up from a chair, climbing stairs, or simply preventing your knee from buckling when you walk.",
            imagePath: "images/pathways/Femoral%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "Assembles from the posterior divisions of the lumbar plexus (L2-L4), high up in the abdominal vault.", isInjurySite: false },
                { title: "Psoas Descent", desc: "Travels down through the core meat of the psoas major muscle. A pelvic bleed or tumor can compress the nerve here before it even reaches the leg.", isInjurySite: false },
                { title: "Inguinal Ligament", desc: "Slips under the dense inguinal ligament into the thigh. Childbirth or prolonged lithotomy positions can stretch and damage the nerve here.", isInjurySite: true },
                { title: "Quadriceps Starburst", desc: "Immediately shatters into numerous deep branches to fire the colossal quadriceps muscles.", isInjurySite: false },
                { title: "The Saphenous Continuation", desc: "The final, longest sensory-only branch (the Saphenous Nerve) continues down the inside of the thigh and calf, providing sensation all the way to the inner ankle.", isInjurySite: false }
            ]
        },
        obturator: {
            name: "Obturator Nerve",
            roots: "L2-L4",
            story: "The elusive sibling of the femoral nerve. While the femoral nerve takes the front of the thigh, the Obturator nerve heads straight to the inner thigh. It exits the deep pelvis through a tiny ring of bone and ligament (the obturator canal) to innervate the heavy adductor muscles that squeeze your thighs together.",
            imagePath: "images/pathways/Obturator%20Nerve.png",
            steps: [
                { title: "The Origin", desc: "Arises from the anterior divisions of the lumbar plexus (L2-L4).", isInjurySite: false },
                { title: "Pelvic Journey", desc: "Runs along the lateral pelvic wall, largely out of sight.", isInjurySite: false },
                { title: "The Obturator Canal", desc: "Must squeeze through a tiny circular window in the pelvis known as the obturator canal to reach the leg. Pelvic fractures or heavy scarring from pelvic surgery can trap the nerve here.", isInjurySite: true },
                { title: "The Adductor Powerhouse", desc: "Splits into anterior and posterior branches to power the massive adductor longus, brevis, and magnus muscles.", isInjurySite: false },
                { title: "Sensory Patch", desc: "Provides a small, highly variable patch of sensation to the skin of the inner thigh.", isInjurySite: false }
            ]
        },
        sural: {
            name: "Sural Nerve",
            roots: "S1-S2",
            story: "The Sural nerve is a fascinating anatomical cooperation. It is a completely sensory nerve formed by two communicating branches—one from the Tibial nerve, one from the Peroneal nerve—joining forces halfway down the back of the calf. It serves as the standard 'reference nerve' for all lower extremity sensory studies because it reliably travels right behind the outside ankle bone.",
            imagePath: "images/pathways/Sural%20Nerve.png",
            steps: [
                { title: "The Origin (A Meeting of Two)", desc: "Uniquely formed when a branch from the tibial nerve (medial sural cutaneous) merges with a branch from the common peroneal nerve.", isInjurySite: false },
                { title: "Calf Descent", desc: "Runs straight down the midline of the back of the calf, traveling safely alongside the small saphenous vein.", isInjurySite: false },
                { title: "Lateral Malleolus Landmark", desc: "Swings distinctly behind the lateral malleolus (the outside ankle bone). This predictable bony landmark is why we always use the Sural nerve to test for length-dependent neuropathies.", isInjurySite: false },
                { title: "Lateral Foot", desc: "Provides absolute sensory coverage to the outer edge of the foot and the pinky toe.", isInjurySite: false }
            ]
        }
    }
};
