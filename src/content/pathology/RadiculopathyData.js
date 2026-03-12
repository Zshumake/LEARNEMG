export const RadiculopathyData = {
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
                clinicalPearl: "🌟 Clinical Pearl: Normal SNAPs + Sensory Symptoms = Radiculopathy until proven otherwise!"
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
        }
    ]
};
