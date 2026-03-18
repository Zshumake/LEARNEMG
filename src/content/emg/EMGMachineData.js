export const EMGMachineData = {
    hero: {
        title: "⚡ Cadwell Sierra Summit",
        subtitle: "Instrumentation mastery is the first step toward diagnostic precision. This guide isn't just a technical manual; it's a clinical roadmap highlighting the subtle hardware nuances and mental workflows you'll use every single day in the lab."
    },
    tabs: [
        { id: "hardware", label: "🖥️ System Overview" },
        { id: "software", label: "💻 NCS Software" },
        { id: "stimtroller", label: "🕹️ StimTroller Plus™" },
        { id: "amplifier", label: "🔌 Preamplifier" },
        { id: "controls", label: "🎛️ Settings Guide" }
    ],
    hardware: {
        hub: {
            title: "The Base Unit",
            subtitle: "The \"Brain\" of the EDX system.",
            description: "The Sierra Summit Base Unit is more than just a computer; it's a high-precision A/D converter. It takes the analog signals (tiny electrical whispers) from the patient's nerves and digitizes them at incredible sampling rates before they even reach the PC. This minimizes electronic interference and ensures that what you see on the screen is a faithful reproduction of the biological event. Every filter setting and gain adjustment starts here.",
            bulletPoints: [
                "<strong>Main Console:</strong> Handles high-speed data transfer via industrial-grade USB.",
                "<strong>Isolation Transformer:</strong> Hidden in the stand, this protects the patient from building-level electrical surges and creates a 'sterile' electrical environment.",
                "<strong>Speaker System:</strong> High-fidelity audio to help you 'hear' the muscle firing during needle EMG."
            ]
        },
        ergonomics: {
            title: "The Senior Resident's Workflow",
            description: "Efficiency in the lab isn't just about speed; it's about minimizing 'cognitive load' and 'arm reach.' A professional resident organizes their lab like a cockpit, with three primary interactive zones:",
            steps: [
                {
                    title: "Zone A: The StimTroller Plus",
                    desc: "Keep this in your dominant hand at all times. It handles 90% of your data entry (distances, nerve selection) and all of your stimulation. You should be able to operate it without looking."
                },
                {
                    title: "Zone B: The Preamp (Headbox)",
                    desc: "Mounted on an adjustable arm. Position it as close to the patient's limb as possible. This keeps your lead wires short, which is the #1 way to reduce electrical noise (interference)."
                },
                {
                    title: "Zone C: The Footpedal",
                    desc: "Tucked under the cart. This is your 'Hands-Free' mode for needle EMG, allowing you to control the 'Run/Stop' and 'Store' functions while both of your hands are busy at the patient's side."
                }
            ]
        }
    },
    software: {
        narrative: "The Sierra software is designed for high-speed clinical workflow. When you look at the screen, your eyes should follow a deliberate 'Data Audit' path: **First check the Nerve Tree → Then watch the Waveform → Finally verify the Results Table.** Never trust the table if the waveform looks messy!",
        windows: [
            {
                title: "🌊 Waveform Window (Left)",
                color: "0ea5e9", // Blue
                description: "This is your clinical truth. Your main job is to ensure the dots (markers) are in the right place. 'Takeoff' marker goes at the first departure from baseline; 'Peak' marker goes at the absolute summit.",
                bullets: [
                    "<strong>Markers:</strong> Use the StimTroller wheel to fine-tune placement.",
                    "<strong>Superimpose:</strong> Check how waves stack to see changes in latency."
                ]
            },
            {
                title: "📊 Results Table (Center)",
                color: "10b981", // Green
                description: "The logic engine. This table highlights values in Red or Blue if they fall outside the age-matched 'Normative' range for that specific nerve.",
                bullets: [
                    "<strong>Velocity:</strong> Only calculated after you input a distance (e.g., 8cm).",
                    "<strong>Comparisons:</strong> Automatically calculates Side-to-Side ratios for symmetry checks."
                ]
            },
            {
                title: "📁 Study Window (Right)",
                color: "8b5cf6", // Purple
                description: "The checklist. It manages the 'Protocol Tree,' allowing you to quickly switch between the Median, Ulnar, and Radial nerves with a single click.",
                bullets: [
                    "<strong>Real-time status:</strong> Checkmarks show which sites have stored data.",
                    "<strong>Distance Log:</strong> View your measured distances at a glance."
                ]
            }
        ],
        proTip: "Efficiency is king when the lab is busy. The colored buttons at the bottom of the screen always mirror the **F1-F7** keys on your keyboard and the physical buttons on the StimTroller. **F2** is always 'Store', **F3** is 'Next Site', and **F10** is 'Finish Study'. Learn these shortcuts early, and you'll save yourself miles of mouse movement over your residency!"
    },
    stimtroller: {
        subtitle: "The most advanced handheld controller in EDX medicine.",
        buttons: [
            {
                name: "Intensity / Distance Wheel",
                color: "0ea5e9",
                content: "The 'Haptic' dial. **Rotate** to adjust the stimulation current (milliamps). **Click it** to toggle into 'Distance Mode' so you can input your measurements without touching the computer. It provides physical 'clicks' for every 1mA change."
            },
            {
                name: "THE STORE BUTTON (RED)",
                color: "ef4444",
                content: "The thumb-triggered red button on the side. This is your 'Commit' button. Pressing this freezes the live waveform and adds it to the report. Senior trick: If the wave is beautiful but the patient moves, hit Store instantly to save your data before it's lost!"
            },
            {
                name: "Single / Seq Stim",
                color: "10b981",
                content: "The center top button. **Single Press** for one pulse. **Double Press** or **Long Press** to start repetitive stimulation (useful for myasthenia testing). Having this on the probe means you never have to turn away from the patient."
            },
            {
                name: "Reverse Polarity (+/-)",
                color: "f59e0b",
                content: "Swaps the Cathode and Anode internally. This is a game-changer when testing the Ulnar nerve at the elbow; you can flip the polarity with a click rather than physically flipping the probe in a cramped space."
            }
        ],
        trap: "Don't start with the dial at 100mA! Always verify your baseline is at **0mA** before placing it on a new patient. Delivering a high-intensity shock unexpectedly is the fastest way to lose a patient's trust. **Pro-tip:** Place the stimulator on the skin first, THEN start cranking the dial up from zero until you see the 'takeoff' of the wave."
    },
    amplifier: {
        intro: "Think of the Preamplifier as the 'Electronic Bodyguard.' It takes the tiny biological signals (measured in microvolts) and amplifies them immediately, right at the source, while rejecting any noise from the environment. **The Golden Rule of Noise:** Every inch of lead wire is an antenna for interference. Position the headbox so the wires hang slack and never cross paths with the power cables on the floor.",
        trinityLabel: "The Differential Trinity",
        trinityDesc: "The machine only sees the **difference** between G1 and G2. If the room humming reaches both leads evenly, it will be cancelled out. This is 'Common Mode Rejection'—the magic of modern EDX.",
        ports: [
            { color: "black", label: "G1 (Active): Black Lead", desc: "Place this directly over the motor point (the thickest part of the muscle belly). This is where the electrical wave starts its jump out of the skin." },
            { color: "ef4444", label: "G2 (Reference): Red Lead", desc: "Place this on an electrically 'inactive' spot, like a tendon or a bone. It acts as the 'Control' group for the comparison." },
            { color: "22c55e", label: "Ground: Green Lead", desc: "Placed *between* the stimulator and the recording leads. It 'bleeds off' the massive stimulus artifact before it touches your sensitive G1/G2 ports." }
        ],
        zTip: "Before you shock, look at the headbox. Notice the small 'Z' button? Press it! The lights next to your ports will turn **Green (< 5kΩ)** if the connection is high-quality or **Red** if it's poor. **Senior Resident Secret:** If the light is Red, don't just push the sticker harder. Use one more alcohol swap to aggressively scrub the dead skin cells away—high-quality data is worth the extra 5 seconds of prep!"
    },
    controls: {
        intro: "You don't just 'set and forget' the machine. For every nerve, you are adjusting the three pillars of signal fidelity: Gain, Sweep, and Filters. Mastering these is what separates a 'technician' from a 'clinician'.",
        pillars: [
            {
                title: "Gain (Sensitivity)",
                icon: "📈",
                color: "0ea5e9",
                desc: "The 'Vertical Zoom.' Adjust this so the wave fills at least 1/3rd of the screen but doesn't 'clip' off the top.",
                settingsText: "Standard Settings:",
                settings: ["Sensory: 10 - 20 µV / div", "Motor: 2 - 5 mV / div", "EMG: 50 - 100 µV / div"]
            },
            {
                title: "Sweep Speed",
                icon: "⏱️",
                color: "10b981",
                desc: "The 'Horizontal Zoom.' This determines how much time (space) you see on the screen at once.",
                settingsText: "Standard Settings:",
                settings: ["NCS: 2 - 5 ms / div", "F-Waves: 10 ms / div", "H-Reflex: 10 - 20 ms / div"]
            },
            {
                title: "Filter Settings",
                icon: "🔧",
                color: "8b5cf6",
                desc: "The 'Electronic Sieve.' It decides which frequencies are allowed on your screen and which are deleted.",
                settingsText: "NCS Filter:",
                settings: ["LFF: 20 Hz | HFF: 3 kHz", "EMG Filter:", "LFF: 10 Hz | HFF: 10 kHz"]
            }
        ],
        distortionWarning: "Beginners often forget to switch filters between sensory and motor studies. Using the narrow **Sensory filter (2kHz)** while recording a powerful **EMG muscle wave** will artificially 'round' the peaks, making all your muscle waves look diseased or 'slow'. Always verify your Filter Protocol at the bottom of the screen before you hit the 'Run' button. If the baseline looks 'hairy', your HFF is too high; if the baseline is 'wavy', your LFF is too low!"
    }
};
