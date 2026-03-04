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
            text: "Welcome to the EMG lab! If you're feeling a bit overwhelmed by the wires and the noise, don't worry—that's normal. Think of an Electrodiagnostic (EDX) study not as a separate test, but as a 'Super-Physical Exam.' Just like you use a stethoscope to hear the heart better, we use this machine to hear the nerves and muscles better. We aren't just looking for 'abnormal numbers'; we are hunting for the exact spot where a patient's symptoms are coming from. Every single study is a live puzzle that you will solve in real-time by adjusting your plan based on every wave you see.",
            aim: "The Golden Rule: We aren't here to 'do an EMG.' We are here to LOCALIZE. We want to tell the surgeon or the patient exactly which nerve is hurt, where it's hurt, and how badly."
        },
        encounter: [
            { step: 1, title: "Clinical History: The Roadmap", detail: "The patient is your best witness. If they say the numbness is only in the thumb and index finger, your 'map' already points to the Median nerve or the C6 root. We ask about diabetes, chemotherapy, or thyroid issues because these are 'system-wide' problems that change how every nerve in the body behaves. A good history saves you from testing 10 nerves when you only needed 2." },
            { step: 2, title: "Physical Exam: The Anchor", detail: "Never skip the manual exam! If you see atrophy (muscle wasting) in the hand, you know you're going to find something 'loud' on the machine there. Sensory loss or reflex changes tell the machine where to look; if you don't check for these first, you're just stabbing in the dark. The machine should confirm your exam, not replace it." },
            { step: 3, title: "Differential Diagnosis", detail: "Before you even turn on the machine, you should have 2 or 3 'suspects.' Is it Carpal Tunnel (at the wrist)? Or is it a Pronator Syndrome (in the forearm)? Or is it a pinched nerve in the neck (the C6 root)? Your study should be designed specifically to rule these in or out by testing specific 'checkpoint' muscles." },
            { step: 4, title: "The Willy Sutton Rule", detail: "When asked why he robbed banks, the famous thief Willy Sutton said, 'Because that's where the money is.' In the lab, we go where the symptoms are first! If the patient is tired or in pain, you want to make sure you've tested the most suspicious muscles and nerves right at the start. Don't waste time on a 'normal' foot if the problem is clearly in the hand." }
        ],
        cardinalRules: [
            { id: 1, title: 'Cables vs. Insulation', color: '#2563eb', text: "Nerves are like electrical wires. The Axon is the 'copper' that carries the signal, and Myelin is the 'rubber' insulation that makes it go fast. Most diseases either break the copper (Axonal Loss) or peel the rubber (Demyelination). Identifying which one is happening is the core of your job because it changes the patient's recovery time from weeks to months." },
            { id: 2, title: 'The Cold Hand Trap', color: '#ef4444', text: "Skin temperature is a physical variable that can ruin your data. Cold temperature slows down the chemical reactions in the nerve, making it look 'diseased' (slow) even when it's perfectly healthy. Often, a cold hand produces a wave that is 'Big and Slow.' If the hand feels like an ice cube, your numbers aren't real—warm them up first!" },
            { id: 3, title: 'The Marriage of Data & Exam', color: '#f59e0b', text: "The machine is just a tool, and sometimes it's wrong. If the computer says a nerve is dead, but the patient can move their fingers with 5/5 strength, then the machine (or your technique) is the problem. The clinical exam and the electrical data MUST marry; if they don't, keep investigating until you find the technical error." },
            { id: 4, title: 'Supramaximal: Giving it your all', color: '#059669', text: "A nerve is made of thousands of tiny fibers. To get a true reading, you have to 'wake up' every single one of them. We increase the current until the response stops growing, and then we add 20% more for good measure. If you only use a tiny bit of current, you're only seeing part of the story, which can lead to a false diagnosis of 'nerve loss.'" },
            { id: 5, title: 'Optimal Positions', color: '#8b5cf6', text: "Millimeters matter in electrodiagnosis. If your recording sticker is slightly off center, or your stimulator is slightly to the left of the nerve, the signal gets weaker. Always 'hunt' for the biggest, cleanest wave by moving your equipment around before you hit the 'store' button. A small wave because of bad technique is a common beginner mistake." },
            { id: 6, title: "Specificity is King", color: '#475569', text: "Just because a number is 0.1 outside the 'normal' range doesn't mean the patient has a disease. Beware of 'borderline' findings. If the finding doesn't explain the patient's symptoms, it might just be a normal variation. It's much better to be conservative than to over-diagnose a healthy person with a lifetime label." }
        ]
    },

    basics: {
        anatomy: [
            {
                title: "The Motor Unit: The fundamental 'Team'",
                detail: "Think of this like a 'Squad' in a sport. You have the Coach (the Motor Neuron cell body in the spine), the Messenger (the Axon/wire), and the Players (the Muscle Fibers). When the Coach sends a signal, the entire team acts together as one functional block. In some diseases, the Coach dies; in others, the Messenger wire is cut; and in some, the Players get sick. Our job is to use electricity to figure out which part of the team is failing.",
                image: "images/anatomy/motor_unit.png"
            },
            {
                title: "Nerve 'Wiring' and Protection",
                detail: "A peripheral nerve is actually a massive bundle of thousands of individual wires grouped together. They are protected by three specialized layers: The Epineurium (the heavy-duty outer jacket), the Perineurium (the internal shielding that groups wires into bundles called fascicles), and the Endoneurium (the delicate individual wrap for each wire). This complex shielding is why some mild injuries can heal (if the shield is intact) while severe 'crushes' can't because the roadmap for regrowth is destroyed.",
                image: "images/anatomy/nerve_structure_new.png"
            }
        ],
        physiology: [
            {
                title: "Saltatory Conduction: The 'Leap-Frog'",
                detail: "Our nerves don't just 'flow' electricity like a slow stream of water. They use a brilliant trick to save energy and space: the signal 'jumps' between small gaps in the insulation called Nodes of Ranvier. This leap-frogging makes the signal travel at incredible speeds—up to 150 miles per hour! If the 'insulation' (Myelin) is damaged, the signal can't jump anymore and has to crawl or it simply gets stuck, which is why patients feel weak or numb.",
                image: "images/anatomy/saltatory_conduction.png"
            },
            {
                title: "The DRG: The 'Junction' for Sensation",
                detail: "Sensory nerves have a special 'command center' called the Dorsal Root Ganglion (DRG) that sits just outside the spinal cord. This is the single most important landmark in EDX! If a sensory response is normal but the patient is numb, the problem is likely 'behind' the DRG (in the spine/root). If the sensory response is dead, the problem is 'in front' of the DRG (in the arm/leg/nerve itself). This one fact allows us to tell the difference between a 'slipped disc' and a 'smashed elbow' instantly.",
                image: "images/anatomy/primary_neuron_localization.png"
            }
        ],
        equipment: {
            amplifiers: "Our EMG machine is basically a world-class 'Microphone' designed to hear a single person whispering in a football stadium during a hurricane. Because the signals coming from nerves are tiny (millionths of a volt), the machine has to ignore all the massive 'noise' from the room (like overhead lights and AC units) and focus only on the tiny electrical whispers of the nerve.",
            filters: "Think of filters like the 'Equalizer settings' on a high-end stereo. We use 'High Pass' and 'Low Pass' filters to cut out the bass hum (slow noise) and the treble static (fast noise) so that we can see the clean, beautiful shape of the nerve wave without any fuzzy distractions. Setting these incorrectly is a common way to get fake results."
        }
    },

    technical: {
        physiologic: [
            { factor: "Temperature: The Silent Saboteur", effect: "This is the most common mistake for beginners. Cold air in the lab makes the nerve chemicals sluggish. This makes the nerve conduct VERY SLOWLY (which looks like disease) and also makes the wave look BIGGER (which can hide real nerve loss). If the skin is below 32°C, you are recording fiction—always use a heater or a warm soak to get accurate numbers!" },
            { factor: "Age: The Natural Slowdown", effect: "Just like we stop running as fast as we get older, our nerves lose a bit of their zip. After age 60, it's normal to see slightly slower conduction speeds and slightly smaller waves. We compare every patient to people their own age so we don't accidentally tell a perfectly healthy 80-year-old they have a rare disease." },
            { factor: "Height: Longer Cables, Slower Speeds", effect: "Tall people have longer nerves. Because the 'wire' (axon) actually gets slightly thinner as it gets farther away from the spine, signals travel slightly slower in the feet of a 6-foot-tall person than they do in a 5-foot-tall person. Height matters! If you don't account for it, you might misdiagnose a tall patient with neuropathy." }
        ],
        nonPhysiologic: [
            { factor: "60Hz Noise: The 'Room Hum'", cause: "This is the 'buzz' of the electricity in the walls of the building leaking into your stickers. It usually happens because your ground sticker is loose or the patient's skin is too oily for the stickers to make good contact.", solution: "The fix is easy: scrub the skin with a little alcohol or paste until it's slightly pink and make sure all your stickers are pressed down firmly." },
            { factor: "Stimulus Artifact: The 'Power Surge'", cause: "This is the massive 'flash' of electricity from the stimulator overwhelming the recording stickers. It looks like a huge spike that 'swallows' the beginning of your nerve wave, making it impossible to measure.", mitigation: "To fix this, make sure the patient's skin is perfectly dry between the shocker and the stickers so the electricity doesn't 'slide' across the skin surface like a short circuit." }
        ],
        safety: {
            pacemakers: "Don't be afraid! NCS (the shocks) are extremely safe for patients with pacemakers. The only rule is common sense: avoid 'crossing the heart'—don't stimulate on both arms at the same time—and don't put the shocker right on top of the pacemaker box itself.",
            anticoagulation: "If a patient is on a strong blood thinner like Eliquis or Warfarin, their muscles can bleed much easier when we use the needle. We have to be extra gentle and might skip deep muscles (like the ones in the hip) because we can't apply pressure to stop a bruise from forming deep inside.",
            infection: "This is our sacred rule: One needle, one patient. We use high-quality, pre-sterilized disposable needles and throw them in the sharps container immediately after the study. We use gloves and clean the skin, ensuring that our lab is the safest part of the patient's day."
        }
    },

    localization: {
        pathophysiology: [
            {
                type: "Axonal Loss (Broken Wires)",
                findings: "Think of this like a bridge that has physically collapsed. The 'volume' of the signal goes down because fewer wires are present to carry the electricity (Low Amplitude). This is the 'structural' type of injury. It takes a long time to heal because the physical wire has to grow back from scratch.",
                prognosis: "Guarded. Nerves are like plants; they grow back very slowly (about 1 inch per month). If the injury is far away from the fingers, it could take a year or more for the 'new' wire to reach the destination."
            },
            {
                type: "Demyelination (Peeling Insulation)",
                findings: "The 'Wire' is fine, but the 'Rubber Coating' is missing in spots. This causes the signal to leak out and travel very SLOWLY. You'll see low conduction speeds and long 'waiting times' (latencies). This is the hallmark of common things like Carpal Tunnel or more serious things like GBS.",
                prognosis: "Excellent! The body is very good at 're-wrapping' its wires with new insulation. If we can remove the pressure (like a surgeon snipping a tight ligament), the patient can get their strength back in just a few weeks."
            }
        ],
        patterns: [
            { site: "Radiculopathy (A pinched nerve in the spine)", snap: "TRICK QUESTION! The sensory response (SNAP) is actually NORMAL. Why? Because the pinch is in the neck, which is 'behind' the sensory headquarters (the DRG). This is how we prove to a surgeon that the problem is in the spine and not the arm!", cmap: "The motor response might be low if the pinch is really severe." },
            { site: "Plexopathy (Shoulder or Hip injury)", snap: "LOW or ABSENT. Because the signal is damaged in the shoulder (after it leaves the spine), the sensory wires themselves are destroyed. This is the 'smoking gun' that tells us the injury is in the plexus and not the neck.", cmap: "LOW or ABSENT. Both motor and sensory signals will look messy or weak." },
            { site: "NMJ Disorders (Like Myasthenia Gravis)", snap: "NORMAL. The nerves themselves are perfect! The problem is the 'handshake' between the nerve and the muscle. The patient's nerves start fine but get 'tired' very quickly. If you shock them 5 times in a row, you'll see the wave get smaller and smaller (Decrement)." }
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
    ]
};
