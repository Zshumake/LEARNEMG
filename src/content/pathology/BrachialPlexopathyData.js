export const BrachialPlexopathyData = {
    hero: {
        title: "Clinical Brachial Plexopathy",
        description: "If Radiculopathy is the \"Bread & Butter,\" then **Brachial Plexopathy** is the \"Master Class.\" Detecting a plexus lesion requires you to stop thinking about single nerves and start thinking about **geographic intersections.**",
        diagnosticGoal: "Is it a Root (Radiculopathy), a Plexus lesion, or a Peripheral Nerve injury?",
        proTip: "\"The SNAP is your compass. If the SNAP is dead, the lesion is in or distal to the plexus.\""
    },
    sections: [
        {
            id: "anatomy-overview",
            title: "The Brachial Plexus: Your Roadmap",
            description: "The brachial plexus is one of the most complex and clinically important structures you will encounter in the EMG lab. It is a network of nerves that originates from spinal nerve roots C5 through T1 and is responsible for the entire motor and sensory supply to the upper extremity. Think of it like a massive highway interchange system: five separate roads (nerve roots) merge, split, and recombine in a very specific pattern before branching out into the final destination roads (peripheral nerves) that reach the muscles and skin of the arm, forearm, and hand.\n\nThe reason you need to understand this architecture deeply is that when a patient comes in with arm weakness or numbness, your job on EMG is to figure out exactly WHERE in this network the damage has occurred. Is it at the root level (a radiculopathy)? At the trunk level (a traumatic plexopathy)? At the cord level (a compressive lesion near the axilla)? Or out in one of the terminal nerves (a peripheral neuropathy)? Each level produces a different pattern of abnormalities on your nerve conduction studies and needle EMG, and the only way to recognize these patterns is to know the anatomy cold.\n\nThe plexus follows a strict organizational sequence: Roots form Trunks, Trunks split into Divisions, Divisions regroup into Cords, and Cords give off Terminal Branches. The classic mnemonic is **'Robert Taylor Drinks Cold Beer'** (Roots, Trunks, Divisions, Cords, Branches). Let us walk through each level in detail.",
            levels: [
                { name: "Roots (C5, C6, C7, C8, T1)", description: "Five spinal nerve roots exit the intervertebral foramina of the cervical and upper thoracic spine. These are the starting points -- the 'on-ramps' -- of the entire plexus. Each root carries two types of fibers: motor fibers originating from the anterior horn cells of the spinal cord, and sensory fibers whose cell bodies reside in the dorsal root ganglion (DRG).\n\nThe DRG is arguably the single most important anatomical landmark in all of electrodiagnostic medicine. It sits just outside the spinal canal, in or near the intervertebral foramen. This means that a herniated disc or foraminal stenosis compresses the root PROXIMAL to (behind) the DRG. Because the sensory cell body in the DRG remains connected to its peripheral axon, that axon stays alive and healthy -- which is why the SNAP (Sensory Nerve Action Potential) remains NORMAL in radiculopathy even though the patient may be clinically numb. This single fact is what allows you to differentiate a root lesion from a plexus lesion on every single study you perform.\n\nEach root has a characteristic myotome (muscles it supplies) and dermatome (skin area it innervates). For example, C5 is the 'shoulder root' (deltoid, biceps), C7 is the 'triceps root,' and T1 is the 'hand intrinsic root.' Knowing these root signatures is essential for interpreting EMG patterns.", color: "#3498db" },
                { name: "Trunks (Upper, Middle, Lower)", description: "After exiting the foramina, the roots merge into three trunks in the posterior triangle of the neck, between the anterior and middle scalene muscles. This is the first level of convergence in the plexus:\n\n-- C5 and C6 merge to form the **Upper Trunk**. This trunk is responsible for shoulder and elbow function (deltoid, biceps, rotator cuff). It is the most commonly injured trunk, especially in motorcycle accidents (where the head is forced away from the shoulder, stretching C5-C6) and birth injuries (shoulder dystocia). Damage here produces the classic 'Waiter's Tip' posture of Erb's palsy.\n\n-- C7 continues alone as the **Middle Trunk**. This is the 'extension root' -- it contributes heavily to the triceps, wrist extensors, and finger extensors via the posterior cord and radial nerve. Isolated middle trunk lesions are uncommon but can occur with specific trauma patterns.\n\n-- C8 and T1 merge to form the **Lower Trunk**. This trunk controls the hand -- all intrinsic hand muscles (both median and ulnar innervated) depend on C8-T1 fibers. The lower trunk is vulnerable to Pancoast tumors at the lung apex (which invade from below) and to cervical ribs (true neurogenic thoracic outlet syndrome). Damage produces Klumpke's palsy with a claw hand deformity.\n\nThe suprascapular nerve branches directly off the upper trunk (not from a cord), which is why it can be affected in upper trunk injuries but spared in cord lesions -- an important localizing distinction.", color: "#27ae60" },
                { name: "Divisions (Anterior and Posterior)", description: "Each of the three trunks splits into an anterior division and a posterior division, creating six divisions total. This is the plexus's internal sorting mechanism, and while you cannot directly test the divisions on EMG, understanding their purpose is essential for making sense of cord anatomy.\n\nThe anterior divisions carry fibers destined for the flexor compartment of the arm (the muscles on the front: biceps, forearm flexors, thenar muscles). The posterior divisions carry fibers destined for the extensor compartment (the muscles on the back: deltoid, triceps, wrist and finger extensors). This anterior/posterior sorting is why a posterior cord lesion produces weakness of extensors (wrist drop, finger drop, deltoid weakness) while sparing flexors (biceps, pronator teres) -- the flexor fibers traveled through a completely different pathway.\n\nThink of the divisions as a sorting facility at a postal distribution center. Letters (nerve fibers) arrive grouped by ZIP code (root level), but they need to be re-sorted by delivery route (flexor vs. extensor destination) before being sent out to the final carriers (cords and terminal nerves).", color: "#f39c12" },
                { name: "Cords (Lateral, Posterior, Medial)", description: "The six divisions regroup into three cords, which are named for their anatomical position relative to the axillary artery (a crucial vascular landmark in the axilla/armpit region). Understanding the cords is where plexus localization truly becomes clinically powerful.\n\nThe **Lateral Cord** forms from the anterior divisions of the upper and middle trunks (carrying C5, C6, C7 fibers). It gives rise to the musculocutaneous nerve (biceps, brachialis) and contributes the lateral root of the median nerve (pronator teres, FCR, and other proximal median muscles). It also sends off the lateral pectoral nerve. The key sensory nerve from this cord territory is the lateral antebrachial cutaneous (LABC), which supplies the lateral forearm. An abnormal LABC SNAP is the electrodiagnostic 'fingerprint' of a lateral cord lesion.\n\nThe **Posterior Cord** is unique because it receives ALL three posterior divisions (from every trunk), giving it fibers from C5 through T1. It gives rise to two major nerves: the axillary nerve (deltoid, teres minor) and the radial nerve (triceps, wrist extensors, finger extensors, brachioradialis). It also gives off the thoracodorsal nerve (latissimus dorsi) and the upper and lower subscapular nerves. A posterior cord lesion is recognized by the combination of deltoid weakness (axillary territory) WITH extensor weakness (radial territory) -- no single peripheral nerve produces both of these findings simultaneously.\n\nThe **Medial Cord** forms from the anterior division of the lower trunk only (carrying C8, T1 fibers). It gives rise to the ulnar nerve and contributes the medial root of the median nerve (which carries the C8-T1 fibers to the thenar muscles). It also sends off the medial pectoral nerve and the medial cutaneous nerves of the arm and forearm (MABC and MACN). The medial antebrachial cutaneous (MABC) SNAP is critically important: it branches directly from the medial cord itself (not from the ulnar nerve), so an abnormal MABC SNAP in combination with ulnar nerve findings proves the lesion is at the cord or trunk level, not at the elbow or wrist.", color: "#e74c3c" },
                { name: "Terminal Branches", description: "The cords ultimately give off the five major terminal nerves that you will test on virtually every upper extremity EMG study:\n\n1. **Musculocutaneous Nerve** (from lateral cord, C5-C7): Pierces the coracobrachialis muscle, innervates biceps and brachialis, then continues as the purely sensory lateral antebrachial cutaneous nerve (LABC) along the lateral forearm.\n\n2. **Median Nerve** (from lateral AND medial cords, C6-T1): The only terminal nerve with dual cord origin. The lateral cord contributes proximal forearm muscles (pronator teres, FCR), while the medial cord contributes distal hand muscles (APB, opponens pollicis, lumbricals 1-2). The anterior interosseous nerve (AIN) is a pure motor branch of the median.\n\n3. **Ulnar Nerve** (from medial cord, C8-T1): Travels behind the medial epicondyle at the elbow (cubital tunnel) and through Guyon's canal at the wrist. Innervates most hand intrinsics (FDI, ADM, interossei, adductor pollicis) and the FDP to the ring and little fingers.\n\n4. **Axillary Nerve** (from posterior cord, C5-C6): Wraps around the surgical neck of the humerus through the quadrilateral space. Innervates the deltoid and teres minor. Provides sensory innervation to the 'regimental badge' area on the lateral shoulder.\n\n5. **Radial Nerve** (from posterior cord, C5-T1): The largest nerve from the posterior cord. Travels through the spiral groove of the humerus, then divides into the posterior interosseous nerve (PIN, motor to finger/wrist extensors) and the superficial radial nerve (sensory to dorsal hand).\n\nAdditionally, several important 'early branches' leave the plexus before the cord level: the **Long Thoracic Nerve** (C5-C7, innervates serratus anterior -- damage causes medial scapular winging), the **Dorsal Scapular Nerve** (C5, innervates rhomboids), and the **Suprascapular Nerve** (branches from upper trunk, innervates supraspinatus and infraspinatus). These early branches are important because they can be affected in Parsonage-Turner syndrome independently of the trunks and cords.", color: "#9b59b6" }
            ]
        },
        {
            id: "cord-patterns",
            title: "Cord Lesion Patterns: The Key to Localization",
            description: "Once you understand the plexus architecture, the next step is learning how to localize a lesion to a specific cord. The key insight is this: each cord gives rise to multiple peripheral nerves. If you find denervation in muscles supplied by two different peripheral nerves that share the same cord origin, the lesion MUST be at the cord level or higher -- it cannot be in either peripheral nerve alone, because a single peripheral nerve lesion would only affect its own muscles.\n\nFor example, if a patient has both deltoid weakness (axillary nerve) and wrist drop (radial nerve), no single peripheral nerve lesion explains both findings. But the posterior cord gives rise to BOTH the axillary and radial nerves -- so a posterior cord lesion explains everything. This is the fundamental logic of plexus localization, and mastering it is what separates a competent electrodiagnostician from a beginner.\n\nBelow are the three cords with their complete motor, sensory, and EDX profiles. Study these carefully -- you will use this knowledge on every plexopathy case you encounter.",
            cords: [
                {
                    name: "Lateral Cord (C5-C7)",
                    terminal: "Musculocutaneous nerve + Lateral root of Median nerve",
                    muscles: "Biceps, brachialis, coracobrachialis (musculocutaneous); pronator teres, FCR (lateral median contribution)",
                    sensory: "Lateral antebrachial cutaneous nerve (LABC) -- lateral forearm",
                    keyTest: "If biceps AND pronator teres are weak, but hand intrinsics and deltoid are normal, think Lateral Cord.",
                    edxPearl: "Abnormal LABC SNAP with normal ulnar SNAP = lateral cord (not lower trunk)"
                },
                {
                    name: "Posterior Cord (C5-T1)",
                    terminal: "Axillary nerve + Radial nerve + Thoracodorsal + Subscapular nerves",
                    muscles: "Deltoid, teres minor (axillary); triceps, brachioradialis, all wrist/finger extensors (radial); latissimus dorsi (thoracodorsal)",
                    sensory: "Posterior cutaneous nerve of arm, lateral cutaneous nerve of forearm (via radial), regimental badge area (axillary)",
                    keyTest: "If deltoid AND triceps/wrist extensors are weak, but biceps and hand intrinsics are normal, think Posterior Cord.",
                    edxPearl: "Absent radial SNAP with normal LABC and ulnar SNAPs = posterior cord"
                },
                {
                    name: "Medial Cord (C8-T1)",
                    terminal: "Ulnar nerve + Medial root of Median nerve + Medial pectoral nerve",
                    muscles: "All ulnar-innervated hand intrinsics (FDI, ADM, interossei); APB, opponens pollicis (medial median contribution); FDP to ring/little (ulnar)",
                    sensory: "Medial antebrachial cutaneous (MABC) -- medial forearm; ulnar nerve -- small finger and medial hand",
                    keyTest: "If ALL hand intrinsics are weak (both ulnar and median-innervated) but deltoid and biceps are normal, think Medial Cord or Lower Trunk.",
                    edxPearl: "Abnormal MABC SNAP is the key localizer -- it branches directly from the medial cord, not from the ulnar nerve. An absent MABC with absent ulnar SNAP = medial cord or lower trunk."
                }
            ]
        },
        {
            id: "lumbosacral-overview",
            title: "The Lumbosacral Plexus: Lower Extremity Foundations",
            description: "While the brachial plexus gets most of the attention in EMG training, the lumbosacral plexus is equally important and arguably more commonly affected by medical (non-traumatic) conditions. Unlike the brachial plexus, which is a single continuous network, the lumbosacral plexus is actually two anatomically distinct plexuses that are connected by a shared nerve bundle:\n\nThe **Lumbar Plexus** (T12-L4) forms within the psoas major muscle in the retroperitoneal space. It primarily supplies the anterior thigh (quadriceps, hip flexors) and medial thigh (adductors). Because it is deep in the retroperitoneum, it is vulnerable to retroperitoneal hematomas (especially in anticoagulated patients), psoas abscesses, and surgical injury during hip or pelvic procedures.\n\nThe **Sacral Plexus** (L4-S4) forms on the anterior surface of the piriformis muscle in the pelvis. It gives rise to the sciatic nerve (the largest nerve in the body), which supplies the entire leg below the knee. The sacral plexus is vulnerable to pelvic fractures, pelvic tumors, radiation therapy, and endometriosis.\n\nThe two plexuses are connected by the **Lumbosacral Trunk**, which carries L4 and L5 fibers from the lumbar plexus down to join the sacral plexus. This trunk can be selectively compressed by a fetal head during difficult childbirth, by an expanding pelvic mass, or by an iliac artery aneurysm, causing an isolated L5 weakness pattern that mimics a radiculopathy.\n\nThe most common medical cause of lumbosacral plexopathy is **diabetic amyotrophy** (formally called diabetic lumbosacral radiculoplexus neuropathy or DLRPN). This presents with acute, severe proximal leg pain followed by progressive weakness, often with significant weight loss. It is caused by a microvasculitis of the plexus and is one of the most important diagnoses to recognize in the EMG lab because it has a specific prognosis and management pathway.",
            lumbarNerves: [
                { name: "Iliohypogastric (T12-L1)", function: "Provides sensation to the lower abdomen and lateral hip area. It has a small motor branch to the internal oblique and transversus abdominis muscles. You will rarely need to test this nerve on EMG, but it can be injured during lower abdominal surgeries (appendectomy, cesarean section), causing a small area of numbness on the lower abdomen." },
                { name: "Ilioinguinal (L1)", function: "Provides sensation to the inguinal (groin) region, the base of the penis/labia, and upper medial thigh. This nerve is commonly injured during inguinal hernia repair surgery, causing chronic post-surgical groin pain -- a condition increasingly referred to the EMG lab. Since it is purely sensory in its terminal distribution, EMG needle testing is not helpful; diagnosis relies on clinical localization and nerve blocks." },
                { name: "Genitofemoral (L1-L2)", function: "Has two branches: the genital branch mediates the cremasteric reflex (testicular elevation when the inner thigh is stroked), and the femoral branch provides sensation to a small patch on the anterior upper thigh. The cremasteric reflex is actually a useful bedside test for L1-L2 integrity. This nerve can be injured during retroperitoneal surgery or affected by psoas abscesses." },
                { name: "Lateral Femoral Cutaneous (L2-L3)", function: "A purely sensory nerve that supplies the lateral thigh. It passes under (or sometimes through) the inguinal ligament near the anterior superior iliac spine (ASIS). Compression at this point causes **meralgia paresthetica** -- burning pain, tingling, and numbness on the outer thigh. This is one of the most common referrals to the EMG lab. Risk factors include obesity, pregnancy, tight belts, diabetes, and prolonged standing. Because it is purely sensory, all motor studies and needle EMG will be normal. Diagnosis is confirmed by an abnormal lateral femoral cutaneous SNAP (technically difficult to record) or clinical localization. The SNAP study has a sensitivity of only about 50-60%, so a normal study does not rule out the diagnosis." },
                { name: "Femoral Nerve (L2-L4)", function: "The dominant motor nerve of the anterior thigh and one of the most important nerves to understand for lower extremity EMG. It forms within the psoas muscle from L2, L3, and L4 roots, passes under the inguinal ligament lateral to the femoral artery (mnemonic: NAVEL from lateral to medial = Nerve, Artery, Vein, Empty space, Lymphatics), and then fans out to innervate the quadriceps (vastus lateralis, medialis, intermedius, rectus femoris), the iliopsoas (hip flexion -- though direct L1-L3 branches also contribute), and the sartorius. After its motor branches, it continues as the **saphenous nerve**, which is purely sensory and supplies the medial leg and ankle -- this is the longest sensory nerve in the body. The patellar reflex (knee jerk) is the femoral nerve's signature reflex, mediated primarily by L3-L4. A patient with femoral neuropathy presents with knee buckling (cannot extend the knee), difficulty climbing stairs, and absent patellar reflex. Common causes include retroperitoneal hematoma (especially in anticoagulated patients), post-surgical injury (hip replacement, cardiac catheterization via femoral artery), and diabetic amyotrophy." },
                { name: "Obturator Nerve (L2-L4)", function: "Innervates the adductor muscles of the thigh (adductor longus, adductor brevis, adductor magnus partial, and gracilis). It exits the pelvis through the obturator foramen and canal. This nerve is critically important for EMG localization: if a patient has both quadriceps weakness (femoral nerve territory) AND adductor weakness (obturator nerve territory), the lesion MUST be at the lumbar plexus level or higher -- it cannot be in either peripheral nerve alone. This is the same localizing logic used in the brachial plexus (two different nerves, same plexus origin). The obturator nerve can be injured by pelvic fractures, hip surgery (especially total hip arthroplasty), obturator hernia, or pelvic tumors." }
            ],
            sacralNerves: [
                { name: "Superior Gluteal (L4-S1)", function: "Innervates the gluteus medius and gluteus minimus (primary hip abductors) as well as the tensor fascia lata. This nerve exits the greater sciatic foramen ABOVE the piriformis muscle -- this anatomical detail matters because it means the superior gluteal nerve is typically spared in piriformis syndrome (where the sciatic nerve below the piriformis is compressed). If the superior gluteal nerve is damaged, the patient develops a positive Trendelenburg sign: when standing on the affected leg, the pelvis drops on the opposite side because the hip abductors cannot stabilize it. On EMG, testing the gluteus medius is important for differentiating L5 radiculopathy (gluteus medius abnormal) from common fibular neuropathy (gluteus medius normal)." },
                { name: "Inferior Gluteal (L5-S2)", function: "Innervates the gluteus maximus, the most powerful hip extensor. This nerve also exits through the greater sciatic foramen but BELOW the piriformis, running alongside the sciatic nerve. Gluteus maximus weakness causes difficulty rising from a seated position, climbing stairs, and running. On EMG, the gluteus maximus is innervated by a different nerve (inferior gluteal) than the hip abductors (superior gluteal), so finding abnormalities in both helps localize to the sacral plexus rather than an individual nerve." },
                { name: "Sciatic Nerve (L4-S3)", function: "The largest and longest nerve in the human body, about the width of your thumb at its thickest point. It is formed from L4, L5, S1, S2, and S3 nerve roots and exits the pelvis through the greater sciatic foramen, passing below the piriformis muscle in approximately 85% of individuals (anatomic variants exist where it pierces through or passes above the piriformis, predisposing to piriformis syndrome). The sciatic nerve is actually two nerves bundled together in a common sheath: the tibial division (medial, from the anterior divisions of L4-S3) and the common fibular/peroneal division (lateral, from the posterior divisions of L4-S2). These two divisions typically separate at or just above the popliteal fossa behind the knee, though in 10-15% of people the separation occurs higher. The tibial division supplies the posterior compartment of the leg (gastrocnemius, soleus, tibialis posterior, toe flexors) and all intrinsic foot muscles. The common fibular division supplies the anterior and lateral compartments (tibialis anterior, peronei, toe extensors). Understanding this dual nature is essential because even in a 'sciatic neuropathy,' the fibular division is almost always more severely affected than the tibial division -- the fibular fibers are more laterally placed and less protected within the nerve sheath." },
                { name: "Posterior Femoral Cutaneous (S1-S3)", function: "A purely sensory nerve that supplies the skin of the posterior thigh. While it may seem minor, it has real localizing value on the EMG study. The posterior femoral cutaneous nerve exits the pelvis alongside the sciatic nerve but is NOT a branch of the sciatic nerve -- it is a separate nerve from the sacral plexus. This means that in a true sciatic neuropathy at the buttock level, the posterior femoral cutaneous nerve may be spared (posterior thigh sensation is normal), while in a sacral plexopathy, it would be affected (posterior thigh numbness). This distinction helps differentiate between sciatic neuropathy and sacral plexopathy when both seem possible." },
                { name: "Pudendal Nerve (S2-S4)", function: "Innervates the pelvic floor muscles (external anal sphincter, external urethral sphincter, bulbocavernosus, ischiocavernosus) and provides sensation to the perineum and external genitalia. This nerve is important in specialized pelvic floor EMG studies, which are performed for urinary or fecal incontinence evaluation. The pudendal nerve exits through the greater sciatic foramen, loops around the ischial spine (sacrospinous ligament), and re-enters the pelvis through the lesser sciatic foramen to reach the perineum via Alcock's canal. Pudendal nerve motor latency testing and anal sphincter EMG are used to evaluate neurogenic causes of incontinence, particularly in women after childbirth and in patients with cauda equina syndrome." }
            ],
            lumbosacralPearl: "The lumbosacral trunk (L4-L5 fibers descending from the lumbar plexus to join the sacral plexus) is the anatomical bridge between the two plexuses. This trunk is clinically vulnerable because it drapes over the pelvic brim, where it can be compressed by a fetal head during prolonged or difficult labor, by an expanding iliac artery aneurysm, or by pelvic tumors. Compression of the lumbosacral trunk produces an isolated L5 weakness pattern (foot drop, ankle inversion weakness, hip abduction weakness) that closely mimics an L5 radiculopathy. The key differentiator on EMG is the SNAP: in lumbosacral trunk compression (postganglionic), the superficial fibular SNAP will be abnormal; in L5 radiculopathy (preganglionic), it will be normal. This is one of the most commonly missed diagnoses in the EMG lab."
        },
        {
            id: "golden-rule",
            title: "The Golden Rule: Pre-ganglionic vs. Post-ganglionic",
            description: "This is the most critical distinction in all of EDX. When a patient presents with weakness and numbness in the arm, the **Sensory Nerve Action Potential (SNAP)** tells you exactly where the \"cut\" is.",
            scenarios: [
                {
                    label: "Scenario A: Pre-ganglionic",
                    type: "Root Level (Radiculopathy)",
                    description: "The lesion is *proximal* to the Dorsal Root Ganglion. The axon in the arm is still connected to its cell body.",
                    result: "Result: SNAP is NORMAL."
                },
                {
                    label: "Scenario B: Post-ganglionic",
                    type: "Plexus Level (Plexopathy)",
                    description: "The lesion is *distal* to the DRG. The axon in the arm has been cut off from its cell body and dies.",
                    result: "Result: SNAP is ABSENT/LOW."
                }
            ]
        },
        {
            id: "major-patterns",
            title: "The Big Three: Erb's, Klumpke's, & Parsonage-Turner",
            patterns: [
                {
                    title: "Upper Trunk (C5-C6) — \"Erb's Palsy\"",
                    tag: "Most Common",
                    cause: "**Cause:** Trauma (motorcycle accidents) or birth injury where the head and shoulder are pulled apart.",
                    presentation: "**Presentation:** \"Waiter's Tip\" posture. Shoulder adducted/internally rotated; elbow extended; forearm pronated.",
                    edx: "**EDX Signature:** Abnormal Medial/Lateral Antebrachial Cutaneous SNAPs + C5/C6 muscle denervation (Deltoid, Biceps)."
                },
                {
                    title: "Lower Trunk (C8-T1) — \"Klumpke's Palsy\"",
                    tag: "",
                    cause: "**Cause:** Grabbing a tree branch while falling, or \"Apex of Lung\" tumors (Pancoast Tumor).",
                    presentation: "**Presentation:** \"Claw Hand\" with sensory loss in the pinky and medial forearm.",
                    edx: "**EDX Signature:** Abnormal Ulnar SNAP + Medial Antebrachial Cutaneous SNAP. Weakness in ALL hand intrinsics."
                },
                {
                    title: "Parsonage-Turner Syndrome (Neuralgic Amyotrophy)",
                    tag: "",
                    cause: "**The Story:** A patient wakes up with *intense*, debilitating shoulder pain for a few days, which then disappears and is replaced by sudden, profound weakness. Often follows a viral infection or surgery.",
                    presentation: "",
                    edx: "**Resident Pearl:** This is a patchy, inflammatory plexitis. It doesn't follow a neat \"trunk\" pattern. Look for specific nerves like the Long Thoracic or Suprascapular to be hit in isolation."
                }
            ]
        },
        {
            id: "burner",
            title: "The Athlete's Nightmare: Burners & Stingers",
            description: "Common in football and wrestling. When the head is violently forced to the side, it either **compresses** or **stretches** the upper plexus.",
            bullets: [
                "Transient electric shock sensation down the arm.",
                "If symptoms last >15 minutes, get an EMG (but wait 3 weeks!).",
                "Localization: Usually the Upper Trunk (C5-C6)."
            ]
        }
    ],
    quiz: [
        {
            question: "A newborn presents with the arm hanging by the side, medially rotated, with the forearm extended and pronated ('waiter\\'s tip' posture). Which roots are most typically injured?",
            options: ["C8-T1 (Klumpke\\'s Palsy)", "C5-C6 (Erb\\'s Palsy)", "C7-C8", "Pan-plexus"],
            correct: 1,
            explanation: "Erb\\'s palsy (Upper Trunk / C5-C6 injury) classical presentation. The loss of shoulder abductors/external rotators and elbow flexors causes the arm to hang internally rotated and extended."
        },
        {
            question: "You are evaluating a patient with severe weakness of the hand intrinsics and numbness of the medial forearm and 4th/5th digits. A Horner\\'s syndrome is present on the same side. Where is the lesion?",
            options: ["Lower Trunk", "Upper Trunk", "Medial Cord", "Ulnar Nerve at the Elbow"],
            correct: 0,
            explanation: "This is classic for a lower plexus (C8-T1) lesion. The presence of Horner\\'s syndrome (ptosis, miosis, anhidrosis) strongly localizes the lesion proximally to the T1 root, pre-ganglionic!"
        },
        {
            question: "A patient presents with sharp shoulder pain followed by profound weakness of the shoulder girdle muscles. EDX shows severe denervation in the Supraspinatus, Infraspinatus, Deltoid, and Serratus Anterior. What is the most likely diagnosis?",
            options: ["C5 Radiculopathy", "Neuralgic Amyotrophy (Parsonage-Turner Syndrome)", "Upper Trunk Plexopathy secondary to trauma", "Lateral Cord Neuropathy"],
            correct: 1,
            explanation: "Parsonage-Turner Syndrome (idiopathic brachial plexitis) typically presents with sudden severe pain followed by patchy, profound weakness. It often affects multiple individual nerves branching off the upper/middle plexus (like suprascapular, axillary, and long thoracic) rather than following a strict trunk/cord pattern."
        },
        {
            question: "What is the 'Golden Rule' of Plexus vs. Root localization on EMG regarding sensory studies?",
            options: ["Abnormal SNAPs = Root, Normal SNAPs = Plexus", "Normal SNAPs = Root, Abnormal SNAPs = Plexus", "SNAPs cannot differentiate root from plexus", "Needle EMG of paraspinals is the only way"],
            correct: 1,
            explanation: "In a radiculopathy, the lesion is typically 'pre-ganglionic' (proximal to the DRG). Therefore, the sensory nerve cell body in the DRG and its distal axon remain intact, resulting in a NORMAL SNAP despite sensory symptoms. In a plexopathy ('post-ganglionic'), the axon is severed from the DRG, resulting in an ABNORMAL SNAP."
        },
        {
            question: "Which muscle is critical to test on needle EMG to definitively differentiate a C5-C6 radiculopathy from an Upper Trunk plexopathy?",
            options: ["Biceps brachii", "Deltoid", "Cervical Paraspinals", "Pronator Teres"],
            correct: 2,
            explanation: "Cervical paraspinal muscles are innervated by the dorsal rami of the spinal roots, which branch off BEFORE the brachial plexus forms. Abnormalities in the paraspinals confirm a root (or anterior horn) lesion, not a plexopathy."
        },
        {
            question: "You find robust denervation in the Extensor Indicis, Extensor Carpi Radialis, AND the Deltoid. Which anatomical structure ties these together?",
            options: ["Middle Trunk", "Posterior Cord", "Lateral Cord", "Anterior Interosseous Nerve"],
            correct: 1,
            explanation: "The Posterior Cord gives rise to the Radial nerve (extensors of wrist/fingers) and the Axillary nerve (deltoid). Finding abnormalities in both localizes the lesion to the posterior cord."
        },
        {
            question: "How do you confidently differentiate a Lower Trunk (C8-T1) plexopathy from a Medial Cord plexopathy using needle EMG?",
            options: ["Test Abductor Pollicis Brevis (APB)", "Test Extensor Indicis (EI)", "Test First Dorsal Interosseous (FDI)", "Test Pronator Teres (PT)"],
            correct: 1,
            explanation: "Both Lower Trunk and Medial Cord lesions affect C8-T1 ulnar/median median muscles (like APB and FDI). However, the Lower Trunk ALSO sends C8 fibers to the Radial Nerve via the Posterior Cord. Finding denervation in a C8 Radial muscle like Extensor Indicis proves the lesion is at the Lower Trunk, not the Medial Cord."
        },
        {
            question: "True Neurogenic Thoracic Outlet Syndrome (TOS) typically presents as a compressive injury of which part of the brachial plexus?",
            options: ["Upper Trunk", "Middle Trunk", "Lower Trunk", "Lateral Cord"],
            correct: 2,
            explanation: "True neurogenic TOS almost always affects the Lower Trunk (C8-T1), often due to a cervical rib or elongated C7 transverse process. It presents with wasting of the hand intrinsics (classically severe in the lateral thenar eminence - Gilliatt-Sumner hand) and sensory loss over the medial forearm/hand."
        },
        {
            question: "You diagnose a Lateral Cord lesion. Aside from the Musculocutaneous Nerve (Biceps/Brachialis), which other major arm nerve will have partial deficits?",
            options: ["Ulnar Nerve", "Median Nerve", "Radial Nerve", "Axillary Nerve"],
            correct: 1,
            explanation: "The Lateral Cord gives off the Lateral Root of the Median Nerve, supplying C6-C7 median-innervated muscles like the Pronator Teres and Flexor Carpi Radialis. A lateral cord lesion affects the Biceps AND these proximal Median muscles."
        },
        {
            question: "In a severe stretch injury of the brachial plexus undergoing eventual recovery, which muscles will demonstrate the earliest signs of reinnervation (Nascent motor units)?",
            options: ["Hand intrinsics", "Distal forearm muscles", "Proximal arm/shoulder muscles", "All muscle groups recover simultaneously"],
            correct: 2,
            explanation: "Nerves regenerate at approximately 1mm per day (or 1 inch per month). Therefore, muscles geographically closest to the injury site (proximal shoulder/arm muscles) will receive their repairing axons and show reinnervation long before distal muscles like the hand intrinsics."
        }
    ],
    localizationScenarios: [
        {
            stem: "A 22-year-old motorcyclist presents after a high-speed collision. The right arm hangs at the side in the 'waiter's tip' position (shoulder adducted, internally rotated, elbow extended, forearm pronated). Biceps reflex is absent. All SNAPs in the hand are normal.",
            question: "Where is the lesion?",
            options: ["C5-C6 Radiculopathy", "Upper Trunk (Erb's Palsy)", "Lateral Cord Lesion", "Posterior Cord Lesion"],
            correct: 1,
            explanation: "The waiter's tip posture with absent biceps reflex points to C5-C6. Normal hand SNAPs could indicate either root or trunk level. However, the trauma mechanism (lateral neck-shoulder distraction) and the pattern of weakness in multiple C5-C6 nerves (axillary, musculocutaneous, suprascapular) localizes to the upper trunk. If paraspinals were abnormal, you would consider root avulsion."
        },
        {
            stem: "A 58-year-old smoker presents with progressive hand weakness over 3 months. Examination reveals a claw hand deformity, numbness in the small finger and medial forearm, and ipsilateral Horner syndrome (ptosis, miosis, anhidrosis). The ulnar SNAP is absent. Chest imaging shows a Pancoast tumor at the lung apex.",
            question: "Where is the lesion?",
            options: ["Ulnar Nerve at the Elbow", "Medial Cord", "Lower Trunk (C8-T1)", "C8 Radiculopathy"],
            correct: 2,
            explanation: "Horner syndrome with lower plexus findings is pathognomonic for a lower trunk (C8-T1) lesion. The Pancoast tumor invades the lower trunk from below. Key distinguishing features: (1) Absent ulnar SNAP = postganglionic (rules out root), (2) Horner syndrome = sympathetic chain involvement at T1 (points to trunk, not cord), (3) ALL hand intrinsics weak (both median and ulnar innervated) = not a single peripheral nerve."
        },
        {
            stem: "A 35-year-old woman wakes up 2 weeks after a flu-like illness with excruciating right shoulder pain lasting 3 days. The pain resolves, but she notices she cannot lift her arm overhead. EMG shows dense denervation in the supraspinatus, infraspinatus, AND serratus anterior, with normal paraspinals. The lateral antebrachial cutaneous SNAP is reduced.",
            question: "What is the diagnosis?",
            options: ["C5-C6 Radiculopathy", "Upper Trunk Plexopathy from Trauma", "Parsonage-Turner Syndrome (Neuralgic Amyotrophy)", "Rotator Cuff Tear"],
            correct: 2,
            explanation: "This is classic Parsonage-Turner syndrome: (1) Intense pain preceding weakness, (2) Post-viral trigger, (3) Patchy denervation that does NOT follow a single trunk pattern -- suprascapular nerve (supraspinatus/infraspinatus) + long thoracic nerve (serratus anterior) are from DIFFERENT cord/trunk origins, (4) Normal paraspinals exclude radiculopathy, (5) Abnormal SNAP confirms postganglionic. The patchy, multi-nerve pattern is the hallmark."
        },
        {
            stem: "A patient presents after a shoulder dislocation with weakness of deltoid (3/5) and wrist/finger extension (2/5). Biceps strength is 5/5. Triceps is 3/5. The radial SNAP is absent. Lateral antebrachial cutaneous SNAP is normal.",
            question: "Where is the lesion?",
            options: ["Upper Trunk", "Posterior Cord", "C7 Radiculopathy", "Radial Nerve at Spiral Groove"],
            correct: 1,
            explanation: "The posterior cord gives rise to both the axillary nerve (deltoid) and the radial nerve (triceps, wrist/finger extensors). Normal biceps (musculocutaneous = lateral cord) with weak deltoid + extensors = posterior cord. The absent radial SNAP confirms postganglionic (not root). Normal LABC SNAP confirms the lateral cord is spared. If this were a radial nerve lesion at the spiral groove, the deltoid would be normal."
        },
        {
            stem: "A patient has weakness of biceps (3/5) and pronator teres (3/5), but normal hand intrinsic strength (FDI 5/5, APB 5/5). The lateral antebrachial cutaneous SNAP is absent. The ulnar SNAP is normal. Deltoid is 5/5.",
            question: "Where is the lesion?",
            options: ["Upper Trunk", "Lateral Cord", "C6 Radiculopathy", "Musculocutaneous Nerve"],
            correct: 1,
            explanation: "The lateral cord gives rise to: (1) Musculocutaneous nerve (biceps, brachialis) and (2) Lateral contribution to median nerve (pronator teres, FCR). Normal deltoid = posterior cord intact. Normal hand intrinsics = medial cord intact. Absent LABC SNAP = musculocutaneous territory damaged (postganglionic). Normal ulnar SNAP = medial cord/lower trunk spared. Weak biceps + pronator with preserved intrinsics = lateral cord."
        }
    ]
};
