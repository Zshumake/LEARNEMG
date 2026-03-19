export const RadiculopathyData = {
    beginnerIntro: {
        title: "What IS a Radiculopathy?",
        text: "A radiculopathy is an injury to a spinal nerve root -- the thick bundle of motor and sensory fibers that exits the spinal cord through a bony opening called the neural foramen. The most common cause in younger patients is a herniated disc: the soft, gel-like nucleus pulposus of an intervertebral disc ruptures through its outer ring (the annulus fibrosus) and physically compresses the nerve root as it exits the spine. In older patients, the cause is more often degenerative: bone spurs (osteophytes) gradually narrow the foramen over years, slowly squeezing the root in a process called foraminal stenosis.\n\nThe result is the same regardless of mechanism: the compressed nerve root becomes inflamed and dysfunctional, producing a characteristic triad of symptoms: (1) pain radiating along the nerve root's dermatome (the classic 'shooting' pain down the arm or leg), (2) numbness or tingling in the same dermatomal distribution, and (3) weakness in the muscles innervated by that root (the myotome). Not every patient has all three -- some present with only pain, others with only weakness.\n\nEMG/NCS is the gold standard for confirming radiculopathy because it provides objective evidence of nerve root dysfunction that imaging alone cannot. An MRI may show a disc herniation, but up to 30% of asymptomatic adults have disc herniations on MRI that cause zero symptoms (Jensen et al., NEJM 1994). Conversely, a patient with severe radiculopathy may have a 'normal-looking' MRI if the compression is dynamic (position-dependent) or caused by chemical irritation from the disc material. The EMG tells you whether the nerve root is actually injured, how severely, whether the injury is acute or chronic, and whether recovery is occurring -- information no imaging study can provide.\n\nThe single most important electrodiagnostic principle in radiculopathy is the behavior of the SNAP (Sensory Nerve Action Potential). Because the dorsal root ganglion (DRG) -- the cell body of the sensory neuron -- sits OUTSIDE the spinal canal in or near the neural foramen, a disc herniation compresses the root PROXIMAL to the DRG. The sensory axon in the arm or leg remains physically connected to its cell body and stays alive, even though the patient has clinical numbness. This is why the SNAP is NORMAL in radiculopathy -- the peripheral sensory nerve is intact. If you find an absent SNAP, the lesion must be DISTAL to the DRG (in the plexus or peripheral nerve), not at the root. This single finding is the most powerful localizer in all of electrodiagnostic medicine."
    },
    redFlags: {
        title: "Red Flags: When It's NOT a Simple Radiculopathy",
        intro: "Most radiculopathies are benign, self-limiting conditions caused by disc herniations or foraminal stenosis. However, certain clinical presentations should raise immediate concern for more serious pathology. Recognizing these red flags can be life-saving.",
        flags: [
            { name: "Cauda Equina Syndrome", description: "Bilateral leg weakness, saddle anesthesia (numbness in the perineal/genital area), and bowel or bladder dysfunction (urinary retention or incontinence) constitute a surgical emergency. This occurs when a large central disc herniation compresses the entire cauda equina. The patient needs emergent MRI and surgical decompression within 24-48 hours to prevent permanent neurological deficit. If a patient in your EMG lab reports new bladder or bowel symptoms with bilateral lower extremity findings, STOP the study and arrange immediate imaging." },
            { name: "Progressive Myelopathy", description: "If a patient has upper motor neuron signs (hyperreflexia, Babinski sign, spasticity, clonus) in addition to their radicular symptoms, the spinal cord itself may be compressed -- not just a single nerve root. Cervical myelopathy from spinal stenosis is a common cause. EMG will show lower motor neuron findings at the compressed level, but the upper motor neuron signs indicate cord involvement that requires urgent neurosurgical evaluation." },
            { name: "Bilateral or Multi-Level Involvement", description: "A single disc herniation typically affects one root on one side. If you find EMG abnormalities at multiple root levels or bilaterally, consider: (1) multilevel degenerative disease (common in elderly), (2) polyradiculopathy from diabetes or inflammatory conditions (CIDP, CMV in immunocompromised), (3) motor neuron disease (ALS can mimic multilevel radiculopathy), or (4) neoplastic leptomeningeal disease. Always think beyond the simple disc when the pattern is too widespread." },
            { name: "Systemic Symptoms", description: "Weight loss, fever, night sweats, or a history of cancer in a patient with radicular symptoms should raise concern for metastatic disease to the spine, epidural abscess, or vertebral osteomyelitis. These conditions can compress nerve roots but require very different management than a simple disc herniation. The 'HI MADAM' differential (Herpes zoster, Inflammatory, Metastasis, Arachnoiditis, Diabetes, Abscess, Mass) should be considered when the presentation is atypical." },
            { name: "No Improvement After 6-8 Weeks", description: "Most acute disc herniations improve significantly within 6-8 weeks with conservative management. If symptoms are unchanged or progressive despite appropriate treatment, reconsider the diagnosis. Persistent or worsening weakness is an indication for repeat imaging and possible surgical consultation. On EMG, the presence of ongoing active denervation (fibrillations) without any signs of reinnervation (nascent MUAPs) at 3-4 months suggests poor spontaneous recovery." }
        ]
    },
    hero: {
        title: "Radiculopathy: The EMG \"Bread & Butter\"",
        description: "If you talk to any EMG attending, they'll tell you: **Radiculopathy is the most common reason patients are sent to the lab.** Whether it's a \"pinched nerve\" in the neck (cervical) or the low back (lumbar), your job as the electrodiagnostician is to act as a detective. You aren't just looking for \"abnormalities\"—you are mapping exactly which spinal level is being compressed.",
        goals: [
            "Confirm the nerve root is the problem",
            "Identify the exact spinal level (e.g., L5 vs S1)",
            "Determine if the injury is acute or chronic"
        ],
        proTip: "\"The history is half the battle. If the pain radiates down to the big toe, think L5. If it's the little toe, think S1. Let the patient guide your needle!\""
    },
    sections: [
        {
            id: "anatomy",
            title: "The Pathophysiology: What's Actually Happening?",
            description: "At its core, **Radiculopathy** is a plumbing problem. A nerve root is being squeezed or irritated right as it tries to exit the spinal column. This happens at the *neural foramen*—the small holes between your vertebrae.",
            callout: {
                title: "The \"Behind the DRG\" Secret (High Yield!)",
                description: "This is the most common board question and the most confusing concept for new residents. **Why are the sensory nerve conduction studies (SNAPs) normal even when the patient feels numb?**\n\nImagine a telephone wire. The \"Telephone Exchange\" (the **Dorsal Root Ganglion/DRG**) is located *outside* the spinal canal.",
                bullets: [
                    "If you cut the wire **distal** to the exchange (in the arm), the distal end dies and the signal disappears (SNAP becomes abnormal).",
                    "In radiculopathy, the pinch is **proximal** to the exchange (inside the spine/foramen). The \"Telephone Exchange\" (DRG) is still happy and healthy, so the wire in the arm is still attached to its power source. **The signal in the arm remains normal!**"
                ],
                clinicalPearl: "Clinical Pearl: Normal SNAPs + Sensory Symptoms = Radiculopathy until proven otherwise!"
            }
        },
        {
            id: "etiology",
            title: "Who and Why? (Age-Related Trends)",
            groups: [
                {
                    title: "Younger Adults (< 50)",
                    description: "Usually **Acute Disc Herniation**. The \"jelly\" inside the disc (nucleus pulposus) squirts out and smashes a nerve root.",
                    bullets: [
                        "Trigger: Heavy lifting or sudden twisting",
                        "Pain: Sudden, sharp, \"electric shock\" pain",
                        "EMG Timing: Often done too early (wait 3 weeks!)"
                    ]
                },
                {
                    title: "Older Adults (> 50)",
                    description: "Usually **Spinal Stenosis/Spondylosis**. This is slow and \"crumbly.\" Bone spurs (osteophytes) gradually narrow the exit holes.",
                    bullets: [
                        "Trigger: Gradual onset, worse with walking",
                        "Pain: Aching, heavy, \"claudication\" of the nerves",
                        "EMG Timing: Often shows chronic changes (large, rare MUAPs)"
                    ]
                }
            ]
        },
        {
            id: "clock",
            title: "The EMG \"Clock\": Timing is Everything",
            description: "Residents often ask: \"Should I do the EMG today?\" The answer depends on where we are on the **biological clock of nerve death.** Fibrillation potentials (evidence of nerve death) don't just appear immediately. They take time to travel down the wire.",
            phases: [
                {
                    label: "Day 0-3",
                    sublabel: "Immediate",
                    content: "**Recruitment Failure:** You won't see \"fibs\" yet. You'll just see *decreased recruitment* (the muscle isn't getting enough commands). F-waves might be slightly slow."
                },
                {
                    label: "Day 7-10",
                    sublabel: "Phase 1",
                    content: "**Paraspinal Fire:** Denervation reaches the **paraspinal muscles** (muscles in the back) because they are physically *closest* to the spine. If you see abnormalities here, you've localized it to the root!"
                },
                {
                    label: "Day 14-21",
                    sublabel: "Phase 2",
                    content: "**Limb Invasion:** Fibrillations finally arrive in the arm or leg. Now you can do a full limb study. **This is the \"Golden Window\" for diagnostic precision.**"
                }
            ]
        },
        {
            id: "localization",
            title: "Mastering the Levels: Clinical Localization",
            table: [
                { root: "C5", weakness: "Biceps, Deltoid, Rhomboids", reflex: "Biceps", proTip: "\"Check the rhomboids to prove it's the root, not the plexus!\"" },
                { root: "C6", weakness: "Biceps, Brachioradialis, PT", reflex: "Brachiorad.", proTip: "\"The 'Thumb Root'. Often confused with Carpal Tunnel!\"" },
                { root: "C7", weakness: "Triceps, FCR, Finger Ext", reflex: "Triceps", proTip: "\"Most common cervical root. Triceps is your best friend here.\"" },
                { root: "C8", weakness: "FDI, ADM, EIP, FDP (index)", reflex: "None specific", proTip: "The 'Hand Root.' All intrinsic hand muscles get C8 contribution. Key differentiator from T1: C8 affects BOTH median AND ulnar muscles PLUS the radial-innervated EIP. If EIP is abnormal, the lesion must be at C8 root or lower trunk." },
                { root: "T1", weakness: "APB, Opponens, FDI (all hand intrinsics)", reflex: "None specific", proTip: "Pure hand intrinsic root. Clinically mimics medial cord or combined ulnar + median neuropathy. The key: T1 radiculopathy has NORMAL SNAPs (preganglionic), while cord/nerve lesions have ABSENT SNAPs. Horner syndrome (ptosis, miosis) suggests T1 root avulsion." },
                { root: "L2", weakness: "Iliopsoas, Adductor Longus", reflex: "Cremasteric (L1-L2)", proTip: "The 'Hip Flexion Root.' Isolated L2 radiculopathy is rare. Weakness in hip flexion with numbness in the upper anterior thigh. Must differentiate from femoral neuropathy (which also affects quadriceps) and lumbar plexopathy (which affects both femoral and obturator territories)." },
                { root: "L3", weakness: "Quadriceps, Iliopsoas, Adductors", reflex: "Patellar (L3-L4)", proTip: "The 'Knee Extension Root' (shared with L4). L3 contributes heavily to hip flexion and knee extension. Patients have trouble climbing stairs and rising from chairs. Distinguish from L4 by the relative sparing of tibialis anterior (which is L4-L5, not L3)." },
                { root: "L4", weakness: "Quadriceps, Tibialis Anterior, Tibialis Posterior", reflex: "Patellar (L3-L4)", proTip: "The 'Knee Jerk Root.' L4 radiculopathy causes knee extension weakness AND ankle dorsiflexion weakness (tibialis anterior gets L4-L5). The patellar reflex is the signature reflex. Key differentiator from L5: in L4, the quadriceps is weak (L5 spares it). In L5, the gluteus medius is weak (L4 spares it)." },
                { root: "L5", weakness: "Tib Ant, EHL, Glut Med", reflex: "Med Hamst.", proTip: "\"Always check the Glut Med. If it's abnormal, the lesion is in the root, not the peroneal nerve!\"" },
                { root: "S1", weakness: "Gastroc, Soleus, Glut Max", reflex: "Achilles", proTip: "\"The 'Foot Slapping' root. Look for S1 paraspinals down low.\"" }
            ]
        },
        {
            id: "differential",
            title: "Don't Be a \"Disc-Snob\": The HI MADAM Differential",
            description: "Even though 90% of radiculopathies are due to discs or stenosis, every resident should know the **non-mechanical** causes. If a patient has multiple levels involved, systemic symptoms, or doesn't improve with rest, think of **HI MADAM**.",
            acronym: [
                { letter: "H", meaning: "Herpes Zoster" },
                { letter: "I", meaning: "Inflammatory" },
                { letter: "M", meaning: "Metastasis" },
                { letter: "A", meaning: "Arachnoiditis" },
                { letter: "D", meaning: "Diabetes" },
                { letter: "A", meaning: "Abscess" },
                { letter: "M", meaning: "Mass/Tumor" }
            ]
        }
    ],
    pearls: {
        title: "Final Senior Resident \"Truths\"",
        list: [
            "**The Paraspinals are NOT optional.** You will find the diagnosis there 10-20% of the time when everything else looks normal. If you skip them, you're guessing, not diagnosing.",
            "**Rule #2: Rule out the \"Impersonators\".** For every L5 radikulopathy, verify the Fibular (Peroneal) nerve. For every C6, check the Median nerve. *Prove* it's the root by finding abnormalities \"upstream\" of where the plexus begins.",
            "**Symmetry is a trap.** Don't just look at the bad leg. Look at the good one too. Comparison is your best diagnostic tool."
        ]
    },
    quiz: [
        {
            question: "You have a patient with numbness in the thumb and index finger. The Median SNAP (sensory) is completely normal, but the Biceps and Brachioradialis show denervation. Where is the lesion?",
            options: ["Carpal Tunnel", "Median Nerve at the Elbow", "C6 Nerve Root", "Brachial Plexus"],
            correct: 2,
            explanation: "This is a classic C6 radiculopathy. The clue is the NORMAL sensory study (SNAP) despite the numbness—this means the pinch is 'Behind the DRG'. The involvement of both the Biceps and Brachioradialis (which are innervated by different peripheral nerves but the same C6 root) confirms the level."
        },
        {
            question: "Why do we wait at least 3 weeks after a sudden disc herniation before doing a full EMG study?",
            options: ["To let the pain subside", "To allow enough time for fibrillation potentials to develop in the limbs", "Because insurance won't pay for it sooner", "To allow the disc to heal on its own"],
            correct: 1,
            explanation: "Wallerian degeneration takes time. It takes approximately 2-3 weeks for the distal parts of the nerve in the limbs to show spontaneous activity (fibrillations) after a proximal injury at the root. Doing the study too early might result in a false-negative result!"
        },
        {
            question: "Which muscle should you check to differentiate an L5 radiculopathy from a Peroneal (Fibular) neuropathy?",
            options: ["Tibialis Anterior", "Extensor Hallucis Longus", "Gluteus Medius", "Gastroc"],
            correct: 2,
            explanation: "The Gluteus Medius is innervated by the Superior Gluteal Nerve (L5), which branches off the plexus BEFORE the peroneal nerve forms. If the Glut Med is abnormal, the lesion must be at or proximal to the plexus/root level. If it's normal, the lesion might be distal (like at the fibular head)."
        },
        {
            question: "A patient presents with weakness of finger abduction (FDI) and thumb opposition (APB). SNAPs are all normal. EMG shows fibrillations in FDI, APB, EIP, and C8 paraspinals. What is the most likely diagnosis?",
            options: ["Ulnar neuropathy at the elbow", "Combined median and ulnar neuropathy", "C8 radiculopathy", "Lower trunk brachial plexopathy"],
            correct: 2,
            explanation: "Normal SNAPs rule out a postganglionic lesion (plexopathy or peripheral neuropathy). The involvement of BOTH ulnar (FDI) and median (APB) innervated muscles plus a radial nerve muscle (EIP) that all share the C8 root, combined with C8 paraspinal fibrillations, localizes to the C8 nerve root."
        },
        {
            question: "A 70-year-old presents with knee buckling when walking. Patellar reflex is absent on the right. Quadriceps is 3/5. Tibialis anterior is 5/5. Which root is most likely affected?",
            options: ["L2", "L3-L4", "L5", "S1"],
            correct: 1,
            explanation: "Quadriceps weakness with absent patellar reflex and NORMAL tibialis anterior points to L3-L4. If L5 were involved, you would expect tibialis anterior weakness. The patellar reflex is primarily L3-L4 via the femoral nerve."
        },
        {
            question: "A patient had a lumbar disc herniation 5 days ago. You perform an EMG and find no fibrillations anywhere, but recruitment is mildly reduced in the tibialis anterior. Is this study reliable?",
            options: ["Yes -- reduced recruitment proves radiculopathy", "No -- fibrillations take 2-3 weeks to develop; the study should be repeated at 3-4 weeks", "Yes -- absence of fibrillations rules out radiculopathy", "No -- the patient should never have EMG after disc herniation"],
            correct: 1,
            explanation: "At day 5, Wallerian degeneration has barely begun. Fibrillation potentials take 2-3 weeks to appear in proximal muscles and 3-5 weeks in distal muscles. Reduced recruitment alone can suggest radiculopathy but is less specific. The optimal timing for EMG after acute radiculopathy is 3-4 weeks post-onset, when fibrillations have developed but before chronic reinnervation obscures the acute findings."
        },
        {
            question: "You find fibrillations in the cervical paraspinal muscles but ALL limb muscles are completely normal. What does this mean?",
            options: ["The study is normal -- paraspinals are nonspecific", "There is likely an early or mild radiculopathy affecting the root but not yet the limb muscles", "The patient has a myopathy", "The needle was in the wrong muscle"],
            correct: 1,
            explanation: "Paraspinal muscles are innervated by the dorsal rami, which branch off at the root level (proximal to the plexus). In early radiculopathy, fibrillations may appear in paraspinals first (they are closest to the lesion) before Wallerian degeneration has reached the more distal limb muscles. This finding localizes to the root level and should NOT be dismissed. Up to 10-20% of radiculopathies are diagnosed based on paraspinal findings alone."
        },
        {
            question: "A patient has findings consistent with BOTH C6 AND C7 radiculopathy on EMG. What should you consider in the differential?",
            options: ["This is impossible -- radiculopathy only affects one level", "Multilevel disc disease, motor neuron disease, or a middle trunk plexopathy", "The EMG was performed incorrectly", "This always indicates spinal stenosis"],
            correct: 1,
            explanation: "Multi-level EMG abnormalities can represent: (1) multilevel disc disease (common in older adults with degenerative spines), (2) a middle trunk plexopathy (the middle trunk carries C7, and the adjacent upper trunk carries C5-C6), (3) motor neuron disease (ALS can mimic multi-level radiculopathy with widespread denervation), or (4) early polyradiculopathy. Always consider these alternatives when findings span multiple levels."
        },
        {
            question: "A patient has bilateral L5 weakness, saddle area numbness, and new-onset urinary retention. What is the immediate concern?",
            options: ["Bilateral L5 radiculopathy from degenerative disease", "Cauda equina syndrome -- surgical emergency", "Diabetic amyotrophy", "Normal age-related changes"],
            correct: 1,
            explanation: "Bilateral lower extremity weakness + saddle anesthesia + bladder dysfunction is the classic triad of cauda equina syndrome, a surgical emergency. A large central disc herniation is compressing the entire cauda equina. This patient needs EMERGENT MRI and likely surgical decompression within 24-48 hours. Do NOT complete the EMG -- arrange immediate imaging."
        },
        {
            question: "In S1 radiculopathy, the sural SNAP (which tests S1 sensory fibers) is normal. Why?",
            options: ["The sural nerve is not affected by S1 lesions", "The DRG for S1 is proximal to the lesion, preserving the peripheral sensory axon", "The sural nerve does not carry S1 fibers", "S1 radiculopathy only affects motor fibers"],
            correct: 1,
            explanation: "The S1 DRG sits outside the spinal canal. A disc herniation compresses the S1 root PROXIMAL to the DRG (preganglionic). The sensory cell body in the DRG remains connected to its distal axon in the sural nerve, so the axon survives and the SNAP is normal. This is the fundamental DRG principle that applies to ALL radiculopathies."
        },
        {
            question: "An EMG performed 6 months after a disc herniation shows large, polyphasic motor unit potentials (MUAPs) with increased duration but NO fibrillation potentials. What does this indicate?",
            options: ["Active, ongoing denervation", "Chronic radiculopathy with successful reinnervation", "Myopathic changes", "Normal EMG findings"],
            correct: 1,
            explanation: "Large, long-duration, polyphasic MUAPs without fibrillations indicate CHRONIC neurogenic changes with completed reinnervation. Surviving motor neurons sent collateral sprouts to adopt orphaned muscle fibers (increasing motor unit size and complexity). The absence of fibrillations means the acute denervation phase has passed and the nerve root has recovered enough to stop ongoing axon loss. This is actually a good prognostic sign."
        },
        {
            question: "A patient has numbness in the thumb and index finger with weak biceps. You suspect C6 radiculopathy, but the referring doctor diagnosed carpal tunnel syndrome. What EMG finding definitively differentiates C6 radiculopathy from CTS?",
            options: ["Reduced median SNAP amplitude", "Fibrillations in the biceps brachii", "Prolonged median distal motor latency", "Fibrillations in the APB muscle"],
            correct: 1,
            explanation: "Fibrillations in the BICEPS definitively prove the lesion is at the C6 root level, not at the carpal tunnel. The biceps (musculocutaneous nerve, C5-C6) is nowhere near the carpal tunnel -- median nerve compression at the wrist cannot cause biceps denervation. In CTS, only median-innervated muscles DISTAL to the wrist (APB) are affected, and the median SNAP is abnormal (unlike radiculopathy where SNAPs are normal)."
        }
    ],
    scenarios: [
        {
            stem: "A 45-year-old office worker presents with 3 weeks of neck pain radiating to the lateral forearm and thumb. Examination shows numbness in the thumb and index finger, weak biceps (4/5) and brachioradialis (4/5), and a diminished biceps reflex. Triceps strength and reflex are normal. Median SNAP is normal.",
            question: "Which nerve root is most likely affected?",
            options: ["C5", "C6", "C7", "C8"],
            correct: 1,
            explanation: "This is classic C6 radiculopathy: thumb/index numbness (C6 dermatome), biceps and brachioradialis weakness (C6 myotome), diminished biceps reflex (C5-C6), with sparing of triceps (C7). The normal median SNAP confirms the lesion is preganglionic (at the root), not in the peripheral nerve. C6 is the most commonly confused with CTS because both can cause thumb numbness, but CTS does NOT cause biceps weakness or reflex changes."
        },
        {
            stem: "A 55-year-old runner presents with 4 weeks of low back pain radiating down the lateral leg to the dorsum of the foot. Examination shows weakness of ankle dorsiflexion (3/5), great toe extension (2/5), and hip abduction (4/5). Ankle jerk is normal. Sural SNAP is normal.",
            question: "Which nerve root is most likely affected?",
            options: ["L4", "L5", "S1", "Common fibular neuropathy"],
            correct: 1,
            explanation: "This is L5 radiculopathy: lateral leg and dorsal foot pain (L5 dermatome), weak ankle dorsiflexion and great toe extension (deep peroneal territory, L5) PLUS weak hip abduction (gluteus medius, superior gluteal nerve, L5). The gluteus medius involvement is the KEY finding that distinguishes L5 radiculopathy from common fibular neuropathy -- the fibular nerve does not innervate the gluteus medius. Normal ankle jerk (S1) and normal sural SNAP (S1, preganglionic) confirm the level."
        },
        {
            stem: "A 60-year-old diabetic presents with progressive hand clumsiness over 2 months. FDI is 3/5, APB is 4/5, EIP is 4/5. All SNAPs (median, ulnar, radial) are normal. EMG shows fibrillations in FDI, APB, EIP, and C8 paraspinal muscles.",
            question: "What is the diagnosis?",
            options: ["Combined ulnar and median neuropathy", "Lower trunk brachial plexopathy", "C8 radiculopathy", "Motor neuron disease"],
            correct: 2,
            explanation: "Normal SNAPs across all three major nerves rules out a postganglionic lesion (plexopathy or neuropathy). The involvement of ulnar (FDI), median (APB), AND radial (EIP) innervated muscles that all share the C8 root, plus C8 paraspinal fibrillations, definitively localizes to the C8 nerve root. This is a pattern that beginners often miss -- they see hand weakness and jump to ulnar neuropathy, but the normal ulnar SNAP and the EIP involvement prove it's a root lesion."
        },
        {
            stem: "A 40-year-old construction worker presents after lifting a heavy object with acute right shoulder pain. Deltoid is 3/5, infraspinatus is 4/5, biceps is 4/5. Triceps is 5/5. Biceps reflex is diminished. All upper extremity SNAPs are normal.",
            question: "Which nerve root is most likely affected?",
            options: ["C5", "C6", "C7", "Axillary neuropathy"],
            correct: 0,
            explanation: "Deltoid (axillary nerve, C5-C6) + infraspinatus (suprascapular nerve, C5-C6) + biceps (musculocutaneous nerve, C5-C6) weakness spans THREE different peripheral nerves that share C5. The diminished biceps reflex and normal triceps point to C5 (not C6, which would affect brachioradialis more prominently). Normal SNAPs confirm preganglionic (root) localization. Axillary neuropathy alone would only affect deltoid and teres minor, not infraspinatus or biceps."
        },
        {
            stem: "A 65-year-old presents with 6 weeks of right posterior calf pain that worsens with walking. Gastrocnemius is 4/5. Ankle jerk is absent on the right (normal on left). H-reflex latency is 35 ms on the right vs 29 ms on the left (>1.5 ms asymmetry is abnormal). Sural SNAP is normal bilaterally.",
            question: "Which nerve root is most likely affected?",
            options: ["L4", "L5", "S1", "Tibial neuropathy at the tarsal tunnel"],
            correct: 2,
            explanation: "This is S1 radiculopathy: calf pain (S1 dermatome), gastrocnemius weakness (S1 myotome via tibial nerve), absent ankle jerk (S1 reflex), and prolonged H-reflex (the electrical equivalent of the ankle jerk, testing the S1 arc). The H-reflex asymmetry of 6 ms is clearly abnormal (>1.5 ms is significant). Normal bilateral sural SNAPs confirm preganglionic localization. Tarsal tunnel syndrome would not cause gastrocnemius weakness or affect the ankle jerk (it only affects intrinsic foot muscles)."
        }
    ]
};
