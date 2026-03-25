export const IntroductionData = {
    header: {
        title: "Electromyography Fundamentals",
        subtitle: "The absolute beginner's guide to clinical reasoning, technical precision, and the 'magic' of electrodiagnostic medicine."
    },

    tabs: [
        { id: 'philosophy', label: 'Clinical Philosophy' },
        { id: 'basics', label: 'EDX Basics' },
        { id: 'instrumentation', label: 'Instrumentation' },
        { id: 'technical', label: 'Technical Excellence' },
        { id: 'localization', label: 'Localization Patterns' },
        { id: 'terminology', label: 'Mastery Glossary' }
    ],

    philosophy: {
        core: {
            title: "Your High-Tech Stethoscope",
            text: "Welcome to the EMG lab! If you're feeling a bit overwhelmed by the wires, the beep-boop sounds, and the massive amount of data on the screens, don't worry—that's every resident's first-day experience. Think of an Electrodiagnostic (EDX) study not as a separate test, but as a direct 'Super-Physical Exam.' Just like you use a stethoscope to hear the heart better, we use this machine to hear the electrical language of nerves and muscles. We aren't just looking for 'abnormal numbers' or checking boxes; we are hunt-tracking for the exact spot where a patient's symptoms are originating. Every single study is a live, unfolding puzzle that you will solve in real-time by adjusting your plan based on every waveform you capture. You are the investigator, and the machine is your forensic tool.",
            aim: "The Golden Rule: We aren't here to 'do an EMG.' We are here to LOCALIZE. Every shock and every needle insertion is a question directed at the nervous system. Our goal is to tell the referring physician exactly which nerve is affected, precisely where the lesion is (the wrist? the elbow? the neck?), and what the 'flavor' of the injury is (is it broken wires or just peeling insulation?).",
            pearl: "Senior Resident's Tip: If you find yourself mindlessly following a template, STOP. Re-examine the patient. Every finding should either support your theory or force you to create a new one. In this lab, we don't just 'run the nerves'—we interrogate them."
        },
        encounter: [
            { step: 1, title: "Clinical History: The Roadmap", detail: "The patient is your most reliable witness and your primary source of truth. If they say the numbness is strictly in the thumb and index finger, your 'mental map' already points to the Median nerve or the C6 root. We ask about diabetes, chemotherapy, or thyroid issues because these are 'system-wide' metabolic problems that change how every nerve in the body behaves, often masking or mimicking focal injuries. A thorough history saves you from testing 10 nerves when you only needed 2, and it tells you exactly where to look for the 'smoking gun.'" },
            { step: 2, title: "Physical Exam: The Anchor", detail: "Never skip the manual exam! If you see atrophy (muscle wasting) in the First Dorsal Interosseous (FDI), you know you're likely to find something 'loud' in the Ulnar nerve or the T1 root. Sensory loss in a specific dermatome or changes in the deep tendon reflexes (like a lost ankle jerk) tell the machine where to focus its attention. If you don't check for these first, you're just stabbing in the dark. The machine's job is to objectively quantify and confirm your clinical exam, not to serve as a substitute for your eyes and hands." },
            { step: 3, title: "Differential Diagnosis", detail: "Before you even turn on the machine's power, you should have 2 or 3 'suspects' in your mind. Is it Carpal Tunnel (at the wrist)? Or is it a Pronator Syndrome (in the forearm)? Or perhaps a 'pinched nerve' in the neck (a C6 radiculopathy)? Your study should be designed specifically to rule these in or out by testing specific 'checkpoint' muscles and nerves. This is 'Hypothesis Testing' in its purest form—if 'A' is normal but 'B' is abnormal, the lesion MUST be between 'A' and 'B'." }
        ],
        cardinalRules: [
            { id: 1, title: 'Cables vs. Insulation', color: '#2563eb', text: "Nerves are essentially physiological electrical wires. The Axon is the 'copper' that carries the signal, and Myelin is the 'rubber' insulation that makes it go fast. Most diseases either break the copper (Axonal Loss) or peel the rubber (Demyelination). Identifying which one is happening is the core of your job because it changes the prognosis entirely. Insulation can be re-wrapped in weeks (fast recovery), but broken copper wires have to grow back from the source (months/years of recovery)." },
            { id: 2, title: 'The Cold Hand Trap', color: '#ef4444', text: "Skin temperature is the most common silent saboteur in the lab. Cold temperature slows down the sodium channels in the nerve, making it look 'diseased' (slow) even when it's healthy. A cold hand typically produces a wave that is 'Big and Slow.' If the hand feels like an ice cube, your numbers are essentially fiction. You must warm the limb to at least 32°C (upper) or 31°C (lower) before you trust any conduction velocity findings. Never diagnose carpal tunnel on a cold limb!" },
            { id: 3, title: 'The Marriage of Data & Exam', color: '#f59e0b', text: "The machine is just a tool, and tools can be misapplied. If the computer says a nerve is completely dead, but the patient can move their fingers with 5/5 strength, then the machine (or your setup) is wrong. The clinical exam and the electrical data MUST marriage; if they don't, keep investigating until you find the technical error. We treat the patient, not the computer screen. When in doubt, re-verify your electrode placement and stimulation site." },
            { id: 4, title: 'Supramaximal: Giving it your all', color: '#059669', text: "A nerve is a bundle of thousands of individual fibers, each with its own 'threshold' for activation. To get a valid reading, you MUST 'wake up' every single one of them. We increase the current until the response (Amplitude) stops growing, and then we add another 20% more for good measure. If you only use a tiny bit of current (submaximal), you are only seeing part of the story, which can lead to a tragic false diagnosis of 'nerve loss' or 'axonopathy.'" },
            { id: 5, title: 'Optimal Positions', color: '#8b5cf6', text: "Millimeters matter immensely in electrodiagnosis. If your recording electrode is slightly off-center from the motor point, or your stimulator is angled slightly away from the nerve path, the signal gets weaker and the latency gets longer. Always 'hunt' for the biggest, cleanest, and sharpest wave by subtly moving your equipment around before you hit the 'store' button. A small wave caused by sloppy technique is the most common beginner error—don't let it be yours!" },
            { id: 6, title: "Specificity is King", color: '#475569', text: "Just because a number is 0.1 m/s outside the 'statistically normal' range doesn't mean the patient has a pathology. Beware of 'borderline' finding syndrome. If a finding doesn't explain the patient's symptoms or follow a logical anatomical pattern, it might just be a normal variation. It is far better to be conservative in your final report than to label a healthy person with a permanent, life-altering diagnosis based on a shaky data point." }
        ]
    },

    basics: {
        anatomy: [
            {
                title: "The Motor Unit: The fundamental 'Team'",
                detail: "Think of this like a 'Squad' in a competitive sport. You have the Coach (the Motor Neuron cell body sitting safely in the spinal cord), the Messenger (the Axon/wire traveling out to the field), and the Players (the individual Muscle Fibers). When the Coach sends a play, the entire team acts together as one functional, inseparable block. In some diseases (like ALS), the Coach dies; in others (like a trauma), the Messenger wire is cut; and in some (like Muscular Dystrophy), the Players themselves get sick. Our diagnostic job is to use electricity to interrogate each part of this team and figure out where the breakdown in communication is happening. If the 'players' are shouting but the 'coach' isn't hearing them, we know where to look.",
                image: "images/anatomy/motor_unit.png",
                pearl: "Clinical Pearl: On EMG, we can actually 'hear' the team firing. If the team is smaller (fewer players), the sound is thin and high-pitched. If the team has been 're-recruited' by a new coach, the sound becomes a deep, jagged rumble."
            },
            {
                title: "Nerve 'Wiring' and Protection",
                detail: "A peripheral nerve is not just a single wire; it is a massive, high-capacity cable containing thousands of individual fibers grouped together. They are protected by three specialized layers of 'armor': 1. The Epineurium (the heavy-duty outer jacket that protects against compression), 2. The Perineurium (the internal shielding that groups wires into bundles called fascicles—this is the blood-nerve barrier), and 3. The Endoneurium (the delicate individual wrap for each wire). This complex shielding is why a minor 'stretch' injury might heal quickly (if the armor is intact), while a severe 'crush' can be devastating because the internal roadmap for regrowth has been physically obliterated.",
                image: "images/anatomy/nerve_structure_new.png"
            }
        ],
        physiology: [
            {
                title: "Saltatory Conduction: The 'Leap-Frog' Miracle",
                detail: "Our nerves don't just 'flow' electricity like a slow stream of water through a pipe. They use a brilliant evolutionary trick to save energy and dramatically increase speed: the electrical signal 'jumps' between small gaps in the insulation called Nodes of Ranvier. This leap-frogging process (Saltatory Conduction) allows signals to travel at incredible speeds—up to 120 meters per second (nearly 270 miles per hour in the fastest fibers)! If the 'insulation' (Myelin) is damaged or peeled away, the signal can no longer jump. It either has to crawl slowly along the bare wire or it simply gets stuck and fails to arrive at all. This is why patients with demyelinating diseases feel sudden weakness or 'heavy' limbs.",
                image: "images/anatomy/saltatory_conduction.png"
            },
            {
                title: "The DRG: The 'Junction' for Sensation",
                detail: "Sensory nerves have a special, off-site 'command center' called the Dorsal Root Ganglion (DRG) that sits just outside the spinal cord in the intervertebral foramen. This is the single most important anatomical landmark in the entire EDX lab! Because the DRG is outside the spine, any injury *inside* the spine (like a herniated disc) happens 'behind' the DRG. This means the sensory nerve fibers in the arm remain attached to their 'power source' and will look PERFECT on our machine, even if the patient is totally numb. If the sensory response is dead, the problem MUST be 'in front' of the DRG (in the arm/nerve itself). This one fact allows us to differentiate a 'slipped disc' from a 'nerve hit' instantly.",
                image: "images/anatomy/primary_neuron_localization.png"
            }
        ],
        equipment: {
            amplifiers: "Our EMG machine is basically a world-class 'Microphone' designed to hear a single person whispering in the middle of a crowded football stadium during a hurricane. Because the signals coming from human nerves are tiny (millionths of a volt), the machine has to use 'Differential Amplification' to ignore all the massive electrical noise from the room—like overhead LED lights, hospital beds, and cell phones—and focus exclusively on the tiny electrical whispers of the nerve. If your ground electrode isn't making good contact, the 'stadium noise' will drown out the 'whisper' every time.",
            filters: "Think of filters like the 'Creative Equalizer' settings on a high-end recording studio console. We use 'High Pass' (LFF) and 'Low Pass' (HFF) filters to cut out the unwanted bass hum (slow movement noise) and the high-frequency static (fast electronic noise). This allows us to see the clean, beautiful, and diagnostic shape of the nerve wave without any fuzzy distractions. Setting these incorrectly (e.g., using an EMG filter for a sensory nerve) will physically 'clip' your wave and give you fake, non-diagnostic results."
        }
    },

    technical: {
        physiologic: [
            { factor: "Temperature: The Silent Saboteur", effect: "This is the single most common source of error in the EDX lab. Cold air in the room or cold tap water in the patient's bathroom can make the nerve chemicals sluggish. This physically slows down the opening of sodium channels, causing the nerve to conduct VERY SLOWLY (mimicking a demyelinating disease) and also making the wave look artificially BIGGER (masking axonal loss). If the skin is below 32°C for upper limbs or 31°C for lower limbs, your numbers are essentially non-diagnostic artifacts. Always use a heater or a warm soak to normalize the limb before you trust the computer." },
            { factor: "Age: The Natural Zip Loss", effect: "Just as we stop being able to sprint as fast as we age, our nerves lose a bit of their conduction zip. After age 60, it's normal to see a slight, steady decline in conduction speeds and a reduction in wave amplitudes. We use age-matched normative data because a perfectly healthy 85-year-old will have numbers that look 'diseased' if compared to a 20-year-old athlete. We diagnose based on what's expected for *that* patient's life stage." },
            { factor: "Height: Longer Cables, Thinner Ends", effect: "Physical height matters immensely for lower limb studies. Taller people have longer individual nerve fibers. As these fibers travel further from the cell body in the spine, the distal axon (the end of the wire) tends to be slightly thinner and further away from the 'power source.' This results in slower conduction speeds and smaller waves in the feet of a 6-foot-5 basketball player compared to a 5-foot-tall patient. If you don't account for height, you risk misdiagnosing a tall patient with a length-dependent neuropathy." }
        ],
        nonPhysiologic: [
            { factor: "60Hz Noise: The 'Wall Hum'", cause: "This is the rhythmic electrical 'buzz' from the building's wiring leaking into your recording. It manifests as a thick, fuzzy baseline that obscures your waves.", solution: "The fix is mechanical: scrub the skin vigorously with alcohol or abrasive paste until it's slightly pink to lower the resistance. Ensure your 'Ground' sticker (the green lead) is placed firmly between the shocker and the recording leads for maximum noise cancellation." },
            { factor: "Stimulus Artifact: The 'Power Surge'", cause: "This occurs when the massive burst of electricity from the stimulator 'jumps' over the skin surface directly to your recording stickers, creating a huge, jagged spike that 'swallows' the start of your nerve wave.", mitigation: "To fix this, make sure the patient's skin is bone-dry between the stimulator and the stickers. If the skin is sweaty or oily, it acts like a bridge for the electricity, causing a short-circuit 'flash' that masks the data you're trying to see." }
        ],
        safety: {
            pacemakers: "Don't be intimidated! Nerve conduction studies are exceptionally safe for patients with pacemakers. The current only travels an inch or two into the skin and doesn't reach the heart. The logic is simple: avoid 'crossing the heart line' (don't stimulate both arms simultaneously) and never place the stimulator directly on top of the pacemaker box itself. For patients with ICDs (implantable cardioverter-defibrillators), studies have shown an excellent safety profile: a 2007 study by Schoeck et al. found zero inappropriate ICD discharges in 77 patients undergoing routine NCS and needle EMG. The theoretical concern is that EMG potentials near the pulse generator could be sensed as cardiac arrhythmia. Standard precautions include: notifying cardiology, having a magnet available in the room, and avoiding needle EMG directly over the pulse generator in the chest wall. Routine NCS does not require ICD reprogramming.",
            anticoagulation: "If a patient is on strong anticoagulants (like Eliquis, Xarelto, or Warfarin), their muscle tissue can bleed and form hematomas much more easily when we use the needle. We must be extra gentle, use the thinnest needles possible, and avoid deep, non-compressible muscles (like the Iliopsoas or deep paraspinals in the hip/back) where we can't apply direct pressure if a bleed starts.",
            infection: "This is our zero-tolerance rule: Every needle is a high-cost, single-use, pre-sterilized medical tool. We throw them into the biohazard sharps container immediately after the study. We use surgical-grade gloves and prep the skin thoroughly with alcohol, ensuring your procedure is the cleanest and safest part of the patient's entire hospital visit."
        }
    },

    localization: {
        pathophysiology: [
            {
                type: "Axonal Loss (Physical Breakage)",
                findings: "Think of this like a physical collapse of the bridge. The 'copper' wire (the axon) is physically dead. Because fewer wires are left to carry the signal, the total 'Volume' (Amplitude) of the response goes way down. This is the 'structural' type of injury. It takes a massive amount of time to heal because the physical nerve has to grow back at about 1 millimeter per day.",
                prognosis: "Guarded and Slow. Since the nerve must physically regrow from the point of injury all the way back to the destination (like the finger), a shoulder injury can take over a year to show clinical recovery. This is why we measure 'denervation' on the needle to track the muscle's relative health."
            },
            {
                type: "Demyelination (Missing Insulation)",
                findings: "The 'Wire' is intact, but the 'Rubber Insulation' (Myelin) is missing or damaged in patches. This causes the signal to 'leak' and travel much more slowly. You will see slow conduction velocities and long, smeared-out waves (temporal dispersion). This is the hallmark of Carpal Tunnel or GBS. The good news? The signal still arrives, just late!",
                prognosis: "Excellent! The body is a master at 're-wrapping' its wires with new myelin in just a few weeks. If we can remove the pressure (e.g., a carpal tunnel release surgery), the patient can often regain their full strength and sensation in a remarkably short period."
            }
        ],
        patterns: [
            { site: "Radiculopathy (Spinal Pinch)", snap: "CRITICAL FINDING: The sensory response (SNAP) remains NORMAL. Why? Because the pinch is at the spinal root, which is 'behind' the sensory 'headquarters' (the DRG). The wires in the arm are still physically attached to their source and haven't died! This is how we prove the neck is the problem.", cmap: "The motor response may be low if the pinch is severe, as the motor 'commanders' (anterior horn cells) are affected directly." },
            { site: "Plexopathy (Shoulder/Hip Trauma)", snap: "LOW or ABSENT. Because the damage happened in the networking center (the plexus) *after* leaving the spine, the sensory wires are truly cut and die off. This 'dead sensory nerve' is the smoking gun that tells us the injury is not in the neck, but in the shoulder.", cmap: "LOW or ABSENT. Both signals will look messy or weak because the entire cable system has been compromised." },
            { site: "NMJ Disorders (Myasthenia)", snap: "NORMAL. The nerves are perfectly healthy! The issue is at the 'handshake'—the spot where the nerve tries to tell the muscle to fire. The patient starts strong but 'fatigues' after a few seconds of work. If we shock the nerve repeatedly (Repetitive Stim), we'll see the wave get smaller and smaller as the handshake fails." }
        ]
    },

    glossary: [
        {
            term: "Action Potential",
            category: "Physiology",
            def: "The 'Spark' of life. It's a tiny traveling wave of electricity that moves along the surface of a nerve cell. Every movement you make and every touch you feel is just a choreographed dance of millions of these tiny sparks."
        },
        {
            term: "Aliasing",
            category: "Technical",
            def: "A digital optical illusion. If the machine samples the electricity too slowly, it can't keep up with the fast nerve signal and it ends up drawing a completely different, fake wave on the screen. It's like how a fast-spinning fan can look like it's barely moving in a video."
        },
        {
            term: "Amplitude",
            category: "NCS",
            def: "The 'Volume' or 'Power.' Measured in microvolts or millivolts, it tells us exactly how many functioning nerve or muscle fibers we've managed to wake up. Large amplitude = healthy 'copper' wires; low amplitude = a loss of fibers (Axonal Loss)."
        },
        {
            term: "Antidromic",
            category: "NCS",
            def: "Traveling 'Against the flow.' Normally, your sensory nerves send signals UP toward your brain. In the lab, we often shock the nerve so the signal travels DOWN to your fingers instead. It's a technical choice that often gives us a cleaner, bigger wave to study."
        },
        {
            term: "Artifact",
            category: "Technical",
            def: "Electrical 'Noise' or 'Pollution.' It's any wavy line on our screen that isn't coming from the patient's nerves. It can be caused by the hospital bed, the lights in the room, or even the patient shivering from being cold."
        },
        {
            term: "Axonal Loss",
            category: "Pathology",
            def: "A 'Structural' injury where the actual 'copper' wire (the axon) of the nerve is broken or dead. This is more serious than just 'insulation' damage because the axon has to physically grow back from the spine all the way down to the muscle, which takes a very long time."
        },
        {
            term: "Baseline",
            category: "Technical",
            def: "The 'Silence.' It's the flat, horizontal line on the screen where no electricity is being recorded. We measure our waves by seeing how far they jump away from this horizontal center line."
        },
        {
            term: "Cathode",
            category: "Technical",
            def: "The 'Black Stimulator' (the negative pole). This is the exact spot where the 'spark' enters the nerve and starts the race. In every test, we point the cathode toward our recording stickers so the signal travels in the right direction."
        },
        {
            term: "CMAP",
            category: "NCS",
            def: "Compound Muscle Action Potential. This is the 'Motor Wave.' When we shock a motor nerve, we aren't actually recording the nerve—we are recording the massive explosion of electricity that happens when all the muscle fibers fire at once. It's the standard way we test for strength and motor fiber health."
        },
        {
            term: "Common Mode Rejection",
            category: "Technical",
            def: "The 'Noise Filter.' Our machine is smart: it records from two different spots. If it hears the same signal at both spots (like the 60Hz hum of the building), it knows that it's 'background noise' and automatically deletes it from the screen, leaving only the unique nerve signal behind."
        },
        {
            term: "Conduction Block",
            category: "Pathology",
            def: "The 'Electrical Dam.' The copper wires are all present and healthy, but at one specific spot (like under a tight ligament), the signal simply can't get through because the insulation is gone. If you shock 'below' the pinch, the response is huge; if you shock 'above' the pinch, it's tiny."
        },
        {
            term: "Conduction Velocity",
            category: "NCS",
            def: "Speed. This is like a 'Speed Trap' for nerves. We measure how many meters per second the signal is traveling. High speeds mean healthy Myelin (insulation). If the speed is very slow, it's a huge clue that the insulation is peeling or damaged."
        },
        {
            term: "Demyelination",
            category: "Pathology",
            def: "Damaged 'Insulation.' This refers to the loss of the Myelin sheath that wraps around nerves. Without it, the signal 'leaks' and travels slowly. Imagine trying to use a garden hose that is full of tiny holes—the water still gets through, but it's much weaker and slower."
        },
        {
            term: "Duration",
            category: "NCS",
            def: "The 'Fatness' of the wave. It tells us how long the signal took to arrive. If some nerve fibers are fast and others are slow, the wave gets 'smeared out' and looks wide. We call this 'Temporal Dispersion,' and it's a classic sign of insulation damage."
        },
        {
            term: "Epineurium",
            category: "Anatomy",
            def: "The 'Nerve Armor.' It is the thick, protective outer layer of connective tissue that holds the thousands of individual axons together in a single nerve cord. It's the first line of defense against physical trauma."
        },
        {
            term: "F-Wave",
            category: "NCS",
            def: "The 'Backfire.' When we shock a motor nerve, 99.9% of the signal goes down to the hand. But a tiny bit travels 'backward' all the way up to the spine, 'bounces' off the motor neuron, and then travels all the way back down. It's the only way we can test the entire length of a nerve from the spine to the fingertips."
        },
        {
            term: "Fasciculation",
            category: "EMG",
            def: "The 'Skin Flicker.' It is a single motor nerve cell firing spontaneously on its own. It's strong enough to cause a visible twitch under the skin. While often benign (like after too much coffee), if they are everywhere, they can be a sign of a motor neuron disease like ALS."
        },
        {
            term: "Fibrillation (Fib)",
            category: "EMG",
            def: "The 'Death Cry.' When a muscle fiber loses its 'connection' to its nerve, it becomes unstable and starts beating rhythmically all by itself. You can't see this with the naked eye; we can only detect it with our needle. It is the classic electrical sign of 'Denervation' (death of the nerve fiber)."
        },
        {
            term: "Gain (Sensitivity)",
            category: "Technical",
            def: "The 'Magnifying Glass.' This setting tells the computer how much to amplify the tiny electrical signals. We 'increase the gain' to see tiny sensory waves, and 'decrease the gain' to see massive muscle waves so they don't go off the top of the screen."
        },
        {
            term: "H-Reflex",
            category: "NCS",
            def: "The 'Electronic Reflex.' It's the exact same pathway as a doctor hitting your ankle with a reflex hammer. The signal travels from the skin, into the spine, and back out to the muscle. It's the gold standard for checking for a pinched nerve in the low back (the S1 root)."
        },
        {
            term: "Impedance",
            category: "Technical",
            def: "Electrical 'Stickiness.' It's the measure of how hard it is for electricity to flow from the skin into our electrodes. If the skin is oily, impedance is high, and the data will be full of 'noise.' We always want to see low impedance for the cleanest possible study."
        },
        {
            term: "Insertional Activity",
            category: "EMG",
            def: "The 'Needle Response.' When the needle enters the muscle, it physically irritates the cells, causing a burst of 'static' sound. If the muscle is healthy, the sound stops immediately when the needle stops moving. If the sound keeps 'crackling' for a long time, it's a sign that the muscle is unstable and likely diseased."
        },
        {
            term: "Jitter",
            category: "EMG",
            def: "Timing 'Shake.' This is an advanced measurement. We look at two muscle fibers belonging to the same team. In a healthy connection, they fire in perfect sync. If the 'handshake' between the nerve and the muscle is broken (like in Myasthenia Gravis), the timing will wobble or 'shake.' We call this jitter."
        },
        {
            term: "Latency",
            category: "NCS",
            def: "The 'Reaction Time.' This is the time (in milliseconds) it takes for the signal to travel from your shocker to your recording sticker. Think of it like a 100-meter dash—the latency is the time on the stopwatch. A long latency means the 'race' was run slowly because the insulation was damaged."
        },
        {
            term: "Motor Unit",
            category: "Anatomy",
            def: "The 'Biological Building Block.' It consists of one single motor nerve cell and every muscle fiber it controls. You can't fire just half of a motor unit—it's all or nothing. The entire unit acts as a single, coordinated team to produce movement."
        },
        {
            term: "MUAP",
            category: "EMG",
            def: "Motor Unit Action Potential. This is the 'Visual Signature' of a motor unit. When you ask a patient to move their muscle, these waves appear on the screen. By looking at their size, shape, and sound, we can tell if the muscle is healthy, if it's recently been re-connected to a nerve, or if it's currently losing its wiring."
        },
        {
            term: "Myokymia",
            category: "EMG",
            def: "The 'Marching soldiers' sound. It's a rare and distinctive firing pattern on the EMG needle. It sounds like a group of people marching in perfect rhythm. It's most commonly seen after a patient has had radiation therapy for cancer, which causes groups of nerves to 'misfire' together."
        },
        {
            term: "Myopathic Recruitment",
            category: "EMG",
            def: "Early and Disorganized. In muscle diseases, each motor unit is weak because some of its 'players' (muscle fibers) are dead. To compensate, the brain has to call in the ENTIRE team immediately. You'll see a screen full of tiny, jagged waves even when the patient is barely trying to move."
        },
        {
            term: "Neuropathic Recruitment",
            category: "EMG",
            def: "The 'Picket Fence' (few and fast). When entire nerve cells die off, the ones that are left have to do all the work. It's like having three workers trying to do the job of a hundred. You'll only see 1 or 2 waves on the screen, but they will be firing at an incredibly fast 'picket fence' rate."
        },
        {
            term: "Nodes of Ranvier",
            category: "Anatomy",
            def: "The 'Booster Stations.' These are tiny, uninsulated gaps in the nerve's myelin sheath. The electrical signal 're-charges' its strength and jumps from one node to the next. This system is the only way our bodies can send signals fast enough for us to survive."
        },
        {
            term: "Orthodromic",
            category: "NCS",
            def: "The 'Natural Direction.' It means we are testing the nerve in the same direction it works in real life. For a motor nerve, this means from the spine down to the hand; for a sensory nerve, this means from the finger up toward the brain."
        },
        {
            term: "Phase Cancellation",
            category: "NCS",
            def: "A 'Hidden Error.' If the nerve signal traveling through a damaged nerve gets smeared out, the 'up' part of one fiber's wave might happen at the exact same time as the 'down' part of another fiber's wave. They literally cancel each other out, which makes the wave on our screen look much smaller than it actually is."
        },
        {
            term: "Polyphasic",
            category: "EMG",
            def: "The 'Jagged Mountain.' A normal motor unit wave has 2 or 3 clean turns. A 'polyphasic' wave has many peaks and valleys (4 or more). It means the muscle fibers aren't firing at the same time, which is a classic sign of re-innervation (new nerve sprouts trying to find their way)."
        },
        {
            term: "Positive Sharp Wave (PSW)",
            category: "EMG",
            def: "The 'V-Wave.' This has the exact same meaning as a Fibrillation. It's the sound of a muscle fiber that has lost its nerve connection and is firing on its own. It's called 'positive sharp' because it starts with a sharp 'downward' (positive) spike on the screen."
        },
        {
            term: "Recruitment",
            category: "EMG",
            def: "The 'Army Drill.' As you pull harder, your brain recruits more and more motor units. It follows a strict rule: smaller units join first, then larger ones. By watching how these units are added to the screen, we can tell if the 'recruiting office' (the motor neuron) is broken."
        },
        {
            term: "Reference (G2)",
            category: "Technical",
            def: "The 'Standard Electrode' (Red). The computer doesn't know how to measure just one spot. It always measures the DIFFERENCE between the Active lead (G1/Black) and the Reference lead (G2/Red). If the signal is identical at both, it shows you nothing. If they are different, it shows you the wave."
        },
        {
            term: "Rise Time",
            category: "EMG",
            def: "The 'Closeness Metric.' This is the time it takes for the wave to jump from the baseline to its highest peak. A very fast (vertical) rise time means your needle tip is sitting millimeters away from the muscle fiber. If the rise time is slow and slanted, you're recording 'underwater' and need to move your needle closer."
        },
        {
            term: "Saltatory Conduction",
            category: "Physiology",
            def: "The 'High-Speed Jump.' It is the scientific name for the electrical signal leap-frogging from Node to Node. This is the physiological miracle that allows a person to pull their hand away from a hot stove in a fraction of a second."
        },
        {
            term: "Satellite Potential",
            category: "EMG",
            def: "The 'Baby sprout.' It's a tiny little wave that follows just behind the main wave. It represents a single muscle fiber that was once dead but has been 'rescued' by a new nerve sprout. It's a beautiful sign of early healing and re-innervation."
        },
        {
            term: "SNAP",
            category: "NCS",
            def: "Sensory Nerve Action Potential. This is the 'Sensory Wave.' It's what we record when we shock a nerve and listen to the purely sensory fibers. Because these signals don't have a giant muscle 'explosion' to help them, the waves are tiny and require a lot of magnification to see."
        },
        {
            term: "Sweep Speed",
            category: "Technical",
            def: "The 'Zoom Factor.' It determines how much time (milliseconds) we can see on the screen at once. A fast sweep speed (like 2ms/div) zooms in to see the details of the start of the wave; a slow sweep speed lets us see 'late' responses like F-waves."
        },
        {
            term: "Temporal Dispersion",
            category: "NCS",
            def: "The 'Asynchronous Mess.' Normally, all nerve fibers conduct at the same speed and arrive together. In diseases that damage insulation, some fibers arrive fast and others arrive very late. This smears the signal across the screen, making the wave look long, low, and messy."
        },
        {
            term: "Wallerian Degeneration",
            category: "Pathology",
            def: "The 'Delayed Crash.' When you cut a nerve, the part that is still attached to the hand doesn't die instantly. It takes about 3 to 7 days for the motor wires to physically dissolve. This is why if someone has a trauma today, we usually ask them to come back in 1 to 2 weeks for their EMG."
        },
    ],

    masteryTerms: [
        { term: "Common Mode Rejection", definition: "The 'Noise-Cancelling' feature of our amplifier. It subtracts any signal that appears simultaneously at BOTH the active and reference leads (like the 60Hz hum of the lights), leaving only the unique nerve signal behind. A CMRR of 90dB or more means the machine is incredibly good at this silence!" },
        { term: "Volume Conduction", definition: "Electrical 'Spillover.' Body tissue is a good conductor of electricity. Sometimes we are testing a nerve in the wrist, but the electricity 'leaks' through the tissue and we record a signal from the shoulder by mistake. As a beginner, always double-check that you are only recording from the muscle you intended!" },
        { term: "Near-field Potential", definition: "Recording 'Front Row.' This is a signal recorded directly underneath your electrode (like a standard CMAP or SNAP). Because the source is right there, the signal is sharp and clear, and we can pinpoint its origin with high accuracy." },
        { term: "Far-field Potential", definition: "The 'Thunder Peal.' This is a signal that originated very far away but is so powerful it can be heard instantly everywhere (like the 'flash' of a camera). Stimulus Artifact is the perfect example—it shows up the exact microsecond you shock the patient, regardless of where your stickers are." },
        { term: "Supramaximal Stimulation", definition: "The 'True Test.' Nerves have thousands of fibers with different thresholds. To get a valid test, you must shock hard enough to wake up the most stubborn fibers. We keep turning up the dial until the wave stops getting bigger—then we add another 20%. If you aren't supramaximal, your entire interpretation of 'nerve health' is invalid." }
    ],

    quizPhilosophy: [
        {
            question: "A resident begins an EDX study by following a pre-set template without examining the patient first. What is the primary risk?",
            options: ["The study will take too long", "Missing the actual pathology by testing irrelevant nerves", "The patient will be in more pain", "The insurance will not cover the study"],
            correct: 1,
            explanation: "The Golden Rule of EDX is to LOCALIZE. Without a focused clinical question from the history and exam, you may test nerves that have nothing to do with the patient's problem, missing the real diagnosis entirely. Every study must be tailored to the individual patient's presentation."
        },
        {
            question: "A patient's median motor distal latency is 4.3 ms (upper limit of normal: 4.2 ms) but they have zero hand symptoms. What is the most appropriate interpretation?",
            options: ["Diagnose mild carpal tunnel syndrome", "Recommend surgery based on the numbers", "Consider this a normal variant and do NOT diagnose CTS", "Repeat the study in 6 months"],
            correct: 2,
            explanation: "Specificity is King (Cardinal Rule 6). A borderline finding that does not correlate with the patient's symptoms is most likely a normal variant. Labeling a healthy, asymptomatic person with carpal tunnel syndrome based on a 0.1 ms difference could lead to unnecessary surgery and permanent anxiety."
        },
        {
            question: "Before turning on the EMG machine, what three steps should the physician always complete?",
            options: ["Calibrate the machine, test the stimulator, check the filters", "Review the MRI, order labs, consult neurology", "Take a clinical history, perform a physical exam, formulate a differential diagnosis", "Warm the limb, check impedance, set the gain"],
            correct: 2,
            explanation: "The Patient Encounter workflow is: (1) Clinical History as your roadmap, (2) Physical Exam as your anchor, and (3) Differential Diagnosis for hypothesis testing. The machine comes AFTER you know what questions to ask the nervous system."
        }
    ],

    quizBasics: [
        {
            question: "A patient has a confirmed C7 radiculopathy on MRI. The median SNAP recorded from the index finger is completely normal. Why?",
            options: ["The MRI is wrong", "The SNAP test was performed incorrectly", "The dorsal root ganglion (DRG) is proximal to the lesion, so peripheral sensory axons survive", "Sensory nerves are not affected by radiculopathy"],
            correct: 2,
            explanation: "The DRG sits outside the spinal canal. In radiculopathy, the compression is proximal (behind) the DRG. Since the sensory cell body in the DRG is still connected to its peripheral axon, the SNAP remains normal even though the patient is clinically numb. This is the single most important localizing principle in electrodiagnostics."
        },
        {
            question: "In Amyotrophic Lateral Sclerosis (ALS), which component of the motor unit is primarily affected?",
            options: ["The myelin sheath (insulation)", "The neuromuscular junction (handshake)", "The anterior horn cell (motor neuron cell body)", "The muscle fiber itself"],
            correct: 2,
            explanation: "ALS is a motor neuron disease -- it destroys the cell body (the 'Coach') in the anterior horn of the spinal cord. This leads to widespread denervation of muscle fibers across multiple myotomes, producing fasciculations and fibrillations on EMG with normal sensory studies."
        },
        {
            question: "A nerve injury causes the myelin to be stripped but the axon remains intact. What is the expected recovery timeline?",
            options: ["No recovery is possible", "Weeks (remyelination)", "6-12 months (axon regrowth)", "Years (surgical repair required)"],
            correct: 1,
            explanation: "Demyelination (insulation damage) recovers in weeks because the body can re-wrap myelin relatively quickly. The axon itself is intact, so no regrowth is needed. This is fundamentally different from axonal loss, where the nerve must physically regrow at approximately 1 mm/day from the injury site."
        }
    ],

    quizTechnical: [
        {
            question: "You record a median motor distal latency of 5.2 ms. The patient's hand skin temperature is 28 degrees C. What should you do before interpreting this result?",
            options: ["Report the finding as carpal tunnel syndrome", "Add a correction factor of 0.2 ms per degree", "Warm the hand to at least 32 degrees C and repeat the study", "The temperature does not affect distal latency"],
            correct: 2,
            explanation: "Cold temperature slows sodium channel kinetics, artificially prolonging latencies and slowing conduction velocities. Per AANEM guidelines, the hand must be warmed to at least 32 degrees C (upper extremity) or 31 degrees C (lower extremity) before results can be trusted. A 'cold hand' can make a perfectly healthy nerve look diseased."
        },
        {
            question: "You see a thick, rhythmic 'fuzzy' baseline obscuring all your nerve conduction waveforms. What is the most likely cause?",
            options: ["The nerve is severely damaged", "60 Hz electrical interference from building wiring", "The stimulator is malfunctioning", "The patient is moving too much"],
            correct: 1,
            explanation: "60 Hz interference (the 'Wall Hum') is the most common artifact in the EMG lab. It comes from the building's electrical wiring coupling into your recording leads. Fix it by: (1) scrubbing the skin to reduce impedance, (2) ensuring good ground electrode contact between the stimulator and recording electrodes, and (3) checking that all electrode leads are properly connected."
        },
        {
            question: "A patient with an implanted cardiac defibrillator (ICD) needs an EMG study. What is the primary safety concern?",
            options: ["Nerve conduction shocks will trigger the ICD", "The EMG machine will interfere with the pacemaker function", "Needle EMG electrical activity near the device may be sensed as a cardiac arrhythmia by the ICD", "EMG is absolutely contraindicated in all patients with cardiac devices"],
            correct: 2,
            explanation: "The primary concern with ICDs is that the electrical activity from needle EMG near the generator may be misinterpreted by the device as ventricular fibrillation, potentially triggering an inappropriate shock. NCS is generally safe as the current is superficial. For ICD patients, consider having the device interrogated or temporarily reprogrammed by cardiology before performing needle EMG near the chest."
        }
    ],

    quizLocalization: [
        {
            question: "A patient presents with hand weakness and numbness. The ulnar SNAP is absent. Where can the lesion NOT be located?",
            options: ["Ulnar nerve at the elbow (cubital tunnel)", "Lower trunk of the brachial plexus", "C8 nerve root (radiculopathy)", "Guyon's canal at the wrist"],
            correct: 2,
            explanation: "In radiculopathy, the lesion is proximal to the DRG (preganglionic). The sensory cell bodies in the DRG remain connected to their peripheral axons, so the SNAP is PRESERVED even if the patient is clinically numb. An absent SNAP means the lesion is postganglionic -- at the plexus, peripheral nerve, or distal to the DRG."
        },
        {
            question: "On repetitive nerve stimulation at 3 Hz, the CMAP amplitude drops by 20% by the 4th stimulus. What disorder does this pattern suggest?",
            options: ["Carpal tunnel syndrome", "ALS (motor neuron disease)", "Neuromuscular junction disorder (e.g., myasthenia gravis)", "Demyelinating polyneuropathy"],
            correct: 2,
            explanation: "A decremental response (>10% amplitude drop) on low-frequency (2-3 Hz) repetitive nerve stimulation is the hallmark of a postsynaptic neuromuscular junction disorder such as myasthenia gravis. The safety factor at the NMJ is reduced, so with repeated stimulation, progressively fewer muscle fibers reach threshold."
        },
        {
            question: "A 65-year-old presents with progressive weakness. EMG shows widespread fibrillations and fasciculations across 3 body regions. All SNAPs are normal. What is the most likely diagnostic category?",
            options: ["Inflammatory myopathy", "Sensorimotor polyneuropathy", "Motor neuron disease (e.g., ALS)", "Chronic inflammatory demyelinating polyneuropathy"],
            correct: 2,
            explanation: "Widespread denervation (fibrillations) across multiple body regions with completely normal sensory studies and fasciculations is the classic electrodiagnostic pattern for motor neuron disease. Normal SNAPs exclude polyneuropathy. The widespread distribution across multiple myotomes and peripheral nerve territories excludes a single radiculopathy or mononeuropathy."
        }
    ],

    quizGlossary: [
        {
            question: "What does a 'positive sharp wave' (PSW) on needle EMG indicate?",
            options: ["Normal muscle activity during contraction", "A healthy motor unit firing voluntarily", "Active denervation -- a muscle fiber spontaneously firing after losing its nerve supply", "An artifact from the needle touching bone"],
            correct: 2,
            explanation: "Positive sharp waves (and fibrillations) are the electrical signatures of denervation. When a muscle fiber loses its nerve connection, it becomes electrically unstable and fires spontaneously. These potentials appear 2-3 weeks after acute nerve injury and indicate active, ongoing denervation of muscle fibers."
        },
        {
            question: "Why is supramaximal stimulation necessary for valid nerve conduction studies?",
            options: ["It makes the study faster", "It ensures ALL nerve fibers are activated, giving a true measurement of the nerve's health", "It reduces artifact", "It is only needed for sensory studies"],
            correct: 1,
            explanation: "A peripheral nerve contains thousands of fibers with different activation thresholds. If you stimulate submaximally, you only activate a portion of the fibers, making the CMAP amplitude artificially low. This could lead to a false diagnosis of axonal loss. Supramaximal stimulation (20% above maximal) ensures every fiber contributes to the response."
        },
        {
            question: "A motor unit potential has 6 phases and increased duration compared to normal. What process does this most likely represent?",
            options: ["Acute denervation (the nerve just died)", "Myopathic changes (muscle disease)", "Chronic reinnervation via collateral sprouting", "Normal variation in young adults"],
            correct: 2,
            explanation: "Polyphasic, long-duration, high-amplitude MUAPs are the hallmark of chronic neurogenic reinnervation. When a motor neuron dies, surviving neighboring neurons send out collateral sprouts to 'adopt' the orphaned muscle fibers. These newly reinnervated fibers fire slightly out of sync, creating the polyphasic morphology."
        }
    ],

    sunderlandClassification: [
        { grade: "I (Neurapraxia)", injury: "Myelin damage only", pathology: "Focal demyelination at the injury site. Axon is intact.", recovery: "Complete recovery in days to 12 weeks. No Wallerian degeneration occurs.", edxFindings: "Conduction block at the lesion site. Normal distal responses. No fibrillations on EMG." },
        { grade: "II (Axonotmesis)", injury: "Axon severed, endoneurium intact", pathology: "Wallerian degeneration occurs distal to the injury. The endoneurial tube remains intact as a guide for regrowth.", recovery: "Good prognosis. Axon regrows at ~1 mm/day along the intact tube. Full recovery expected.", edxFindings: "Reduced CMAP/SNAP amplitudes distally (after Wallerian degeneration). Fibrillations appear at 2-5 weeks." },
        { grade: "III-V (Neurotmesis)", injury: "Progressive connective tissue disruption", pathology: "Grade III: endoneurium disrupted. Grade IV: perineurium disrupted. Grade V: complete nerve transection (epineurium disrupted).", recovery: "Poor without surgical intervention. Misdirected regrowth leads to incomplete recovery. Surgery may be needed for Grades IV-V.", edxFindings: "Absent distal responses. Dense fibrillations. No voluntary MUAPs in affected muscles. No improvement over months without surgery." }
    ],

    temporalEvolution: [
        { timepoint: "Day 0-2", finding: "NCS may appear NORMAL", explanation: "Wallerian degeneration has not yet occurred. The distal nerve segment is still alive and conducting normally, even though it has been severed from its cell body." },
        { timepoint: "Day 3-5", finding: "Motor amplitudes begin to drop", explanation: "The distal motor axons begin to degenerate. CMAP amplitudes recorded distal to the injury site progressively decrease. This is the earliest NCS change." },
        { timepoint: "Day 7-11", finding: "Sensory amplitudes drop", explanation: "Sensory axons undergo Wallerian degeneration slightly later than motor axons. SNAP amplitudes decrease. By day 10-11, the process is largely complete." },
        { timepoint: "Week 2-3", finding: "Fibrillations appear PROXIMALLY", explanation: "Denervated muscle fibers closest to the injury site develop membrane instability first. Fibrillations and positive sharp waves appear on needle EMG in proximal muscles." },
        { timepoint: "Week 3-5", finding: "Fibrillations appear DISTALLY", explanation: "More distal muscles develop fibrillations later because the degenerating axon terminals persist longer in more distal locations. This is why timing matters for EDX." },
        { timepoint: "Months", finding: "Reinnervation potentials appear", explanation: "If recovery is occurring, nascent (small, polyphasic) MUAPs appear first, gradually increasing in size as collateral sprouts mature. Large, polyphasic 'giant' MUAPs indicate established chronic reinnervation." }
    ],

    martinGruber: {
        title: "Martin-Gruber Anastomosis (MGA)",
        prevalence: "Present in 15-30% of the population (often bilateral)",
        description: "A crossover of motor nerve fibers from the median nerve to the ulnar nerve in the forearm. Fibers leave the median nerve (typically from the AIN branch) and join the ulnar nerve, innervating ulnar hand muscles via the median nerve trunk.",
        clinicalImpact: [
            "The ulnar CMAP amplitude may appear LARGER when stimulating at the elbow vs. the wrist (because the crossover fibers join the ulnar nerve in the forearm)",
            "The median CMAP at the elbow may show an initial positive deflection (volume-conducted from ulnar-innervated muscles)",
            "Can cause a false appearance of conduction block in the ulnar nerve across the elbow segment",
            "May mask true ulnar neuropathy by maintaining amplitude via the crossover fibers"
        ],
        source: "Kimura, Electrodiagnosis in Diseases of Nerve and Muscle; prevalence data from Amoiridis & Vlachonikolis, 1992"
    },

    expandedPatterns: [
        { site: "Mononeuropathy (Focal Entrapment)", snap: "May be ABSENT or REDUCED if the sensory fibers of that specific nerve are affected (e.g., absent median SNAP in CTS). Other nerves are normal.", cmap: "Prolonged DISTAL LATENCY at the entrapment site with normal proximal segments. Conduction block or focal slowing may be present across the compression point.", emg: "Denervation limited to muscles innervated by the affected nerve, distal to the lesion.", keyFeature: "Focal abnormality confined to ONE nerve territory" },
        { site: "Polyneuropathy (Length-Dependent)", snap: "ABSENT distally (sural, superficial peroneal affected first), gradually worsening proximal. Follows a length-dependent gradient.", cmap: "REDUCED amplitudes distally (fibular, tibial affected more than median, ulnar). Velocities mildly slow in axonal; markedly slow in demyelinating.", emg: "Denervation most prominent distally (intrinsic foot muscles > legs > hands). Chronic neurogenic changes in a stocking-glove distribution.", keyFeature: "Symmetric, distal-to-proximal gradient affecting MULTIPLE nerves" },
        { site: "Motor Neuron Disease (e.g., ALS)", snap: "NORMAL -- sensory nerves are completely spared because the disease affects motor neurons only.", cmap: "May be REDUCED from motor neuron loss, but sensory amplitudes are preserved. The dissociation between reduced CMAPs and normal SNAPs is characteristic.", emg: "Widespread fibrillations and fasciculations across 3+ body regions (bulbar, cervical, thoracic, lumbosacral). Large, polyphasic MUAPs with reduced recruitment.", keyFeature: "Widespread motor denervation with NORMAL sensory studies" },
        { site: "Myopathy", snap: "NORMAL -- peripheral nerves are not affected in primary muscle disease.", cmap: "Usually NORMAL (the nerve is fine; the muscle is sick). May be mildly reduced in severe cases.", emg: "Short-duration, low-amplitude, polyphasic MUAPs with EARLY recruitment. Fibrillations may be present in inflammatory myopathies (irritable myopathy). NO fasciculations.", keyFeature: "Small, short MUAPs with early/full recruitment pattern" }
    ],

    localizationScenarios: [
        {
            stem: "A 52-year-old presents with right hand weakness and numbness in the ring and small fingers. The ulnar SNAP is absent. The ulnar CMAP amplitude is reduced.",
            question: "Based on the absent ulnar SNAP, which localization can be definitively EXCLUDED?",
            options: ["Ulnar neuropathy at the elbow", "Lower trunk brachial plexopathy", "C8 radiculopathy", "Ulnar neuropathy at the wrist"],
            correct: 2,
            explanation: "An absent SNAP definitively excludes radiculopathy. In radiculopathy, the lesion is proximal to the DRG (preganglionic), so sensory axons in the periphery survive and the SNAP remains NORMAL. An absent SNAP means the lesion is postganglionic -- the problem is in the plexus, nerve trunk, or distally."
        },
        {
            stem: "A 68-year-old diabetic presents with right foot drop. NCS shows: absent fibular CMAP, normal sural SNAP, normal tibial motor study.",
            question: "What is the most likely localization?",
            options: ["S1 radiculopathy", "Common fibular neuropathy at the fibular head", "L5 radiculopathy or fibular neuropathy (cannot distinguish with this data alone)", "Diabetic polyneuropathy"],
            correct: 2,
            explanation: "This is a critical teaching point: the sural SNAP (which is a tibial/S1 territory nerve) is NORMAL in BOTH L5 radiculopathy and fibular neuropathy. To distinguish them, you need needle EMG of non-fibular L5 muscles (tibialis posterior, gluteus medius). If those are abnormal, it is radiculopathy. If only fibular-innervated muscles are affected, it is a fibular neuropathy."
        },
        {
            stem: "A 34-year-old motorcyclist after a high-speed crash has a flail right arm. NCS shows: absent median, ulnar, and radial SNAPs. All CMAPs are absent.",
            question: "What is the localization?",
            options: ["Cervical spinal cord injury", "Pan-brachial plexopathy", "Multiple cervical radiculopathies (C5-T1)", "Peripheral polyneuropathy"],
            correct: 1,
            explanation: "The ABSENT SNAPs are the key finding. In spinal cord injury or radiculopathy, SNAPs would be PRESERVED (preganglionic lesion). Absent SNAPs across all three major nerve territories prove the lesion is postganglionic -- at the brachial plexus level. This is pan-brachial plexopathy, a devastating injury requiring urgent surgical evaluation."
        },
        {
            stem: "A 45-year-old woman presents with fluctuating bilateral ptosis and difficulty swallowing that worsens throughout the day. Routine NCS (sensory and motor) is completely normal.",
            question: "What additional electrodiagnostic test should be performed?",
            options: ["Needle EMG of all four extremities", "Repetitive nerve stimulation (RNS) at 3 Hz", "F-wave studies of all nerves", "Somatosensory evoked potentials"],
            correct: 1,
            explanation: "The clinical presentation (fluctuating weakness, ptosis, bulbar symptoms, diurnal variation) is classic for myasthenia gravis -- a neuromuscular junction disorder. Routine NCS is normal in MG because the nerve and muscle are healthy. Repetitive nerve stimulation at 2-3 Hz will show a decremental response (>10% drop) as the impaired NMJ fails to maintain transmission with repeated stimulation."
        },
        {
            stem: "A 70-year-old man has progressive weakness over 12 months. EMG shows: fibrillations and fasciculations in the tongue, both arms, and both legs. All SNAPs are normal. CMAPs are reduced in multiple nerves.",
            question: "What is the most likely diagnosis?",
            options: ["Chronic inflammatory demyelinating polyneuropathy (CIDP)", "Inclusion body myositis", "Amyotrophic lateral sclerosis (ALS)", "Multifocal motor neuropathy"],
            correct: 2,
            explanation: "Widespread denervation (fibrillations) with fasciculations across 4 body regions (bulbar + 3 limb regions), completely normal SNAPs, and reduced CMAPs is the classic Awaji/revised El Escorial pattern for ALS. Normal SNAPs exclude CIDP. Fasciculations and widespread distribution across nerve and root territories exclude focal neuropathies."
        }
    ]
};
