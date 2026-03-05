/**
 * NeedleLocalizationData.js
 * Extracted dataset for the EMG Needle Localization Guide.
 * Clinical notes, pitfalls, and maneuvers have been rewritten into long-form, mentor-style narrative without emojis.
 */

export const NeedleLocalizationData = {
    upperExtremity: {
        "APB": {
            fullName: "Abductor Pollicis Brevis",
            innervation: "Median Nerve, Medial Cord, Anterior Division, Lower Trunk, C8, T1",
            origin: "From the palmar retinaculum, the tubercle of the scaphoid, and the tubercle of the trapezium.",
            insertion: "Lateral side of the base of the proximal phalanx of the thumb.",
            position: "Place the patient's hand resting comfortably in full supination (palm up).",
            electrodeInsertion: "Find the midpoint of a line drawn between the volar aspect of the first metacarpophalangeal joint and the carpometacarpal joint. Insert the needle to a shallow depth of one-quarter to one-half inch.",
            testManeuver: "Ask the patient to palmarly abduct their thumb, pointing it straight up toward the ceiling against your resistance.",
            pitfalls: "If you insert the needle electrode too deeply, you will overshoot the superficial APB and inadvertently sample the deeper opponens pollicis muscle.",
            pearl: "This muscle is the quintessential recording site for median nerve motor conduction studies. It will show abnormalities in virtually all median nerve entrapment syndromes, most notably severe Carpal Tunnel Syndrome, with the sole exception being Anterior Interosseous Nerve syndrome. It is also a classic indicator for Klumpke's palsy involving the C8 and T1 roots."
        },
        "Bicep": {
            fullName: "Biceps Brachii",
            innervation: "Musculocutaneous Nerve, Lateral Cord, Anterior Division, Upper Trunk, C5, C6",
            origin: "Long Head originates from the supraglenoid tuberosity of the scapula. Short Head originates from the apex of the coracoid process.",
            insertion: "The bicipital tuberosity of the radius.",
            position: "Have the patient lie supine with their arm resting extended at their side.",
            electrodeInsertion: "Insert the needle directly into the main bulk of the muscle belly in the mid-arm.",
            testManeuver: "Instruct the patient to flex their elbow or forcefully supinate their forearm against resistance.",
            pitfalls: "If the needle electrode is driven too deeply through the biceps belly, it will enter the underlying brachialis muscle.",
            pearl: "The biceps serves a powerful dual function: it is both a strong elbow flexor and a primary supinator of the forearm. It is the go-to muscle for evaluating high cervical radiculopathies (C5, C6) and upper trunk brachial plexopathies. In infants, traction injuries during difficult deliveries can stretch these upper roots, leading to the classic 'waiter's tip' posture of Erb-Duchenne palsy."
        },
        "EIP": {
            fullName: "Extensor Indicis Proprius",
            innervation: "Posterior Interosseous Nerve, Radial Nerve, Posterior Cord, Posterior Division, Middle and Lower Trunk, C7, C8",
            origin: "The dorsal surface of the lower half of the ulnar shaft, just below the origin of the extensor pollicis longus.",
            insertion: "It joins the ulnar side of the extensor digitorum communis tendon destined for the index finger, terminating in the extensor expansion.",
            position: "Rest the patient's forearm on the table, fully pronated.",
            electrodeInsertion: "Measure exactly two fingerbreadths proximal from the prominent ulnar styloid bone. Insert the needle just radial to the ulna at a shallow depth of one-half inch.",
            testManeuver: "Have the patient make a gentle fist, and then ask them to point their index finger straight out while keeping the other fingers curled.",
            pitfalls: "If the needle is inserted too far radially, you will sample the abductor pollicis longus. If inserted too far proximally, you will end up in the overlying extensor digitorum communis.",
            pearl: "This is usually the most distal muscle innervated by the radial nerve complex. It is your ultimate test to definitively rule in or rule out a distal radial nerve injury, such as a Posterior Interosseous Nerve entrapment at the Arcade of Frohse. It is also invaluable for demonstrating the extent of a classic 'Saturday night palsy' originating higher up at the spiral groove."
        },
        "FDI": {
            fullName: "First Dorsal Interosseous",
            innervation: "Ulnar Nerve, Medial Cord, Anterior Division, Lower Trunk, C8, T1",
            origin: "The lateral border of the third metacarpal bone.",
            insertion: "The medial side of the base of the proximal phalanx.",
            position: "Place the hand flat on the table in full pronation, with the thumb stretched out in full radial abduction.",
            electrodeInsertion: "Pinch the meaty web space between the thumb and index finger. Insert the needle at the free edge of this web space, directing the tip back toward the proximal end of the first metacarpal bone.",
            testManeuver: "Ask the patient to forcefully press their index finger laterally against your resisting finger (abduction of the index finger).",
            pitfalls: "If the electrode is angled too far dorsally, you may miss the main bulk of the muscle. If angled too far volarly (toward the palm), you will mistakenly sample the opponens pollicis.",
            pearl: "This is the holy grail for ulnar nerve testing, as it is the most distal muscle innervated by the ulnar nerve. Severe weakness here results in Froment's sign, where the patient must substitute the median-innervated flexor pollicis longus to pinch objects, causing the thumb joint to buckle. This muscle is mandatory sampling for differentiating lower cervical radiculopathies from distal ulnar entrapments at Guyon's canal."
        },
        "Middle Deltoid": {
            fullName: "Deltoid, Middle",
            innervation: "Axillary Nerve, Posterior Cord, Posterior Division, Upper Trunk, C5, C6",
            origin: "The acromion of the scapula.",
            insertion: "The deltoid tuberosity of the lateral humerus.",
            position: "Have the patient lie supine or sit comfortably with their arm resting relaxed at their side.",
            electrodeInsertion: "Palpate the bony tip of the acromion and the prominent deltoid tubercle halfway down the humerus. Insert the needle exactly halfway between these two landmarks.",
            testManeuver: "Instruct the patient to abduct their arm straight out to the side like an airplane wing.",
            pitfalls: "Because this is a common site for routine intramuscular vaccinations, you may occasionally encounter localized, non-neuropathic muscle irritability or fibrotic scarring that can mimic disease.",
            pearl: "The middle deltoid is a powerful abductor of the arm, but it relies heavily on the supraspinatus to securely fix the humeral head into the glenoid socket first. If the axillary nerve is damaged, often due to an anterior shoulder dislocation or a direct fracture of the surgical neck of the humerus, this muscle will show profound denervation and the patient will struggle to lift their arm."
        },
        "PT": {
            fullName: "Pronator Teres",
            innervation: "Median Nerve, Lateral Cord, Anterior Division, Upper and Middle Trunk, C6, C7",
            origin: "This muscle features two distinct heads: the humeral head originates from the medial epicondyle, and the ulnar head originates from the coronoid process. The median nerve dives dangerously between them.",
            insertion: "The lateral surface of the radial shaft, right at the midpoint.",
            position: "Rest the patient's forearm on the table, fully supinated (palm up).",
            electrodeInsertion: "Draw an imaginary line connecting the medial epicondyle to the thick biceps tendon in the elbow crease. Find the midpoint of that line, move exactly two fingerbreadths distally down the forearm, and insert the needle.",
            testManeuver: "Ask the patient to forcefully pronate their forearm (turn palm down) against your resistance.",
            pitfalls: "If the needle electrode is pushed too deeply, it will pass right through the pronator teres and sample the deeper flexor digitorum sublimis. If inserted too far toward the ulnar side, it will hit the flexor carpi radialis.",
            pearl: "This is the most proximal forearm muscle innervated by the median nerve. Because the median nerve must physically pierce through the two heads of this muscle to enter the forearm, it is a prime location for traumatic compression, known as Pronator Teres Syndrome. Sampling this muscle helps differentiate a high median nerve injury from a classic carpal tunnel entrapment at the wrist."
        },
        "Tricep": {
            fullName: "Triceps Brachii (Lateral Head)",
            innervation: "Radial Nerve, Posterior Cord, Posterior Division, Middle and Lower Trunk, C6, C7, C8",
            origin: "The posterior surface of the humerus, situated above the radial groove.",
            insertion: "The prominent olecranon process of the ulna at the elbow.",
            position: "Have the patient rest their hand on their abdomen with the forearm pronated and the elbow comfortably flexed.",
            electrodeInsertion: "Find the midpoint between the lateral epicondyle of the elbow and the top of the shoulder. Insert the needle into the lateral aspect of the arm just below this midpoint.",
            testManeuver: "Instruct the patient to extend their elbow, pushing their hand away from their body against your resistance.",
            pitfalls: "As long as you strictly adhere to a lateral approach when sampling this head, you remain safely away from the major vascular bundles and nerve trunks running down the medial arm.",
            pearl: "Of the three heads of the triceps, the lateral head is generally considered the safest and easiest to sample. It is a critical evaluation point; because the branches supplying the triceps originate very high up in the axilla, this muscle will be completely spared in a classic 'Saturday night palsy' radial nerve compression occurring lower down at the spiral groove. Its primary diagnostic utility is in isolating C7 radiculopathies."
        }
    },
    lowerExtremity: {
        "Extensor Hallucis": {
            fullName: "Extensor Hallucis Longus",
            innervation: "Deep Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1",
            origin: "From the midportion of the fibular shaft and the adjacent interosseous membrane.",
            insertion: "The dorsal base of the distal phalanx of the great toe.",
            position: "Have the patient lie supine with the leg fully extended and relaxed.",
            electrodeInsertion: "Measure three fingerbreadths above the bimalleolar line at the ankle. Move just lateral to the sharp crest of the tibia, and immediately lateral to the thick, easily palpable Tibialis Anterior tendon. Insert the needle here.",
            testManeuver: "Ask the patient to forcefully extend their big toe upward toward their face.",
            pitfalls: "If the electrode is inserted too superficially or too far proximally up the leg, you will end up in the massive Tibialis Anterior. If inserted too far laterally, you may hit the Peroneus Tertius.",
            pearl: "This muscle is an excellent diagnostic target because it allows you to clearly differentiate an L5 radiculopathy from an isolated peroneal neuropathy. While the Tibialis Anterior is primarily L4-L5, the Extensor Hallucis Longus has a stronger L5-S1 representation. In cases of acute anterior compartment syndrome, this muscle will rapidly show signs of severe ischemic necrosis and profound electrical silence."
        },
        "Medial Gastroc": {
            fullName: "Gastrocnemius: Medial Head",
            innervation: "Tibial Nerve, Sciatic Nerve, Ventral Division Sacral Plexus, S1, S2",
            origin: "The medial condyle and popliteal surface of the femur.",
            insertion: "It merges with the soleus to form the massive Achilles tendon, anchoring into the posterior calcaneus.",
            position: "Have the patient lie prone with their feet hanging relaxed over the edge of the examination bed.",
            electrodeInsertion: "Measure one handbreadth below the popliteal crease at the back of the knee. Insert the needle directly into the apex of the prominent medial muscle mass of the calf.",
            testManeuver: "Instruct the patient to forcefully plantar flex their foot (point their toes like a ballerina) while keeping their knee perfectly straight.",
            pitfalls: "If the needle is driven too deeply through the thick gastrocnemius belly, it will enter the underlying, flatter soleus muscle.",
            pearl: "The medial head is anatomically larger and extends slightly further down the leg than the lateral head, making it the preferred target for routine EMG evaluation of the tibial nerve. It is an absolute powerhouse muscle for walking and running. Weakness or denervation here is a classic hallmark of a severe S1 radiculopathy originating in the lumbosacral spine."
        },
        "Peroneus Longus": {
            fullName: "Peroneus Longus",
            innervation: "Superficial Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1, S2",
            origin: "The head of the fibula and the upper two-thirds of the lateral fibular shaft.",
            insertion: "It wraps under the foot to insert into the base of the first metatarsal and the medial cuneiform bone.",
            position: "Have the patient lie supine with their leg slightly internally rotated.",
            electrodeInsertion: "Palpate the prominent bony head of the fibula near the knee. Measure exactly three fingerbreadths distally down the lateral leg. Insert the needle directing it toward the lateral aspect of the fibula bone.",
            testManeuver: "Instruct the patient to forcefully plantar flex and evert their foot (pushing the outer edge of their foot away).",
            pitfalls: "If the electrode is angled too far posteriorly, you will mistakenly sample the lateral gastrocnemius or soleus. If angled too far anteriorly, you will cross into the anterior compartment and hit the extensor digitorum longus.",
            pearl: "This muscle is your primary target for evaluating the integrity of the superficial peroneal nerve. Because the common peroneal nerve wraps tightly around the fibular neck just above this muscle, the Peroneus Longus is highly susceptible to compressive injuries from tight casts, knee braces, or habitual leg crossing. Its tendon provides crucial dynamic support for the transverse arch of the foot."
        },
        "Tibialis Ant": {
            fullName: "Tibialis Anterior",
            innervation: "Deep Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L4, L5",
            origin: "The upper two-thirds of the lateral surface of the tibia and the adjacent interosseous membrane.",
            insertion: "The medial and plantar surfaces of the medial cuneiform bone, and the base of the first metatarsal.",
            position: "Have the patient lie supine with their leg fully relaxed.",
            electrodeInsertion: "In the upper one-third of the lower leg, locate the sharp, prominent tibial crest (the shin bone). Move exactly one fingerbreadth laterally off the bone into the thick muscle belly and insert the needle.",
            testManeuver: "Ask the patient to forcefully dorsiflex their foot, bringing their toes up toward their knee.",
            pitfalls: "The primary pitfall here is failing to insert the needle deeply enough into the bulk of the muscle, resulting in a poor or noisy recording due to superficial fascial interference.",
            pearl: "The Tibialis Anterior is the undisputed king of foot dorsiflexion. When this muscle fails due to a deep peroneal nerve injury or an L5 radiculopathy, the patient develops a devastating 'foot drop,' forcing them to adopt a high-stepping, slapping gait to avoid tripping over their own toes. It is the most critical muscle to sample when evaluating any anterior compartment pathology."
        },
        "Tibialis Post": {
            fullName: "Tibialis Posterior",
            innervation: "Tibial Nerve, Sciatic Nerve, Anterior Division Sacral Plexus, L5, S1",
            origin: "The interosseous membrane, the posterior surface of the tibia, and the upper two-thirds of the medial fibula.",
            insertion: "The tuberosity of the navicular bone, sending strong aponeurotic slips across the plantar foot to the cuneiforms and metatarsal bases.",
            position: "Have the patient lie prone with their feet hanging over the edge of the bed and the thigh slightly internally rotated to expose the medial calf.",
            electrodeInsertion: "Measure one full handbreadth distal to the tibial tuberosity. Move exactly one fingerbreadth off the medial edge of the tibia bone. Direct the needle strictly obliquely through the soleus and flexor digitorum longus, staying tightly posterior to the tibia bone.",
            testManeuver: "Instruct the patient to invert their foot while holding it in plantar flexion.",
            pitfalls: "CAUTION: The major neurovascular bundle (Posterior Tibial Artery and Nerve) lies dangerously close. Never direct the needle indiscriminately strictly laterally. Stick tight to the posterior cortex of the tibia. If inserted too superficially, you will only sample the soleus.",
            pearl: "This is the deepest, most difficult to reach muscle in the posterior compartment of the leg, but it is a critical diagnostic target. The Tibialis Posterior is the strongest dynamic supporter of the longitudinal arch of the foot. Unlike the superficial calf muscles, it is heavily innervated by the L5 root via the Tibial nerve, making it an excellent discriminator when untangling complex lumbosacral plexopathies."
        },
        "Vastus Lateralis": {
            fullName: "Vastus Lateralis",
            innervation: "Femoral Nerve, Posterior Division Lumbar Plexus, L2, L3, L4",
            origin: "The intertrochanteric line, the greater trochanter, the gluteal tuberosity, and the linea aspera of the femur.",
            insertion: "It merges into the quadriceps tendon, ultimately anchoring onto the tibial tubercle.",
            position: "Have the patient lie supine with their leg fully extended.",
            electrodeInsertion: "Locate the massive lateral aspect of the thigh. Measure one full handbreadth directly above the superior pole of the patella and insert the needle into the thick muscle belly.",
            testManeuver: "Ask the patient to lift their heel slightly off the bed while keeping their knee perfectly straight and locked.",
            pitfalls: "If the electrode is inserted too far posteriorly on the thigh, you will inadvertently sample the biceps femoris (hamstrings). If inserted too far medially, you will enter the rectus femoris.",
            pearl: "As the largest component of the quadriceps femoris, this muscle is the primary shock absorber and extensor of the knee. When this muscle is paralyzed by a severe femoral neuropathy, the patient loses the ability to keep their knee locked in extension. They will describe a terrifying sensation that their knee is constantly trying to buckle and collapse whenever they place weight on the leg during walking."
        }
    }
};
