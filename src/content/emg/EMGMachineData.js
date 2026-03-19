export const EMGMachineData = {
    hero: {
        title: "Cadwell Sierra Summit",
        subtitle: "Instrumentation mastery is the first step toward diagnostic precision. This guide isn't just a technical manual; it's a clinical roadmap highlighting the subtle hardware nuances and mental workflows you'll use every single day in the lab."
    },
    tabs: [
        { id: "hardware", label: "System Overview" },
        { id: "software", label: "NCS Software" },
        { id: "stimtroller", label: "StimTroller Plus" },
        { id: "amplifier", label: "Preamplifier" },
        { id: "controls", label: "Settings Guide" }
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
                title: "Waveform Window (Left)",
                color: "0ea5e9", // Blue
                description: "This is your clinical truth. Your main job is to ensure the dots (markers) are in the right place. 'Takeoff' marker goes at the first departure from baseline; 'Peak' marker goes at the absolute summit.",
                bullets: [
                    "<strong>Markers:</strong> Use the StimTroller wheel to fine-tune placement.",
                    "<strong>Superimpose:</strong> Check how waves stack to see changes in latency."
                ]
            },
            {
                title: "Results Table (Center)",
                color: "10b981", // Green
                description: "The logic engine. This table highlights values in Red or Blue if they fall outside the age-matched 'Normative' range for that specific nerve.",
                bullets: [
                    "<strong>Velocity:</strong> Only calculated after you input a distance (e.g., 8cm).",
                    "<strong>Comparisons:</strong> Automatically calculates Side-to-Side ratios for symmetry checks."
                ]
            },
            {
                title: "Study Window (Right)",
                color: "8b5cf6", // Purple
                description: "The checklist. It manages the 'Protocol Tree,' allowing you to quickly switch between the Median, Ulnar, and Radial nerves with a single click.",
                bullets: [
                    "<strong>Real-time status:</strong> Checkmarks show which sites have stored data.",
                    "<strong>Distance Log:</strong> View your measured distances at a glance."
                ]
            }
        ],
        proTip: "Efficiency is king when the lab is busy. Function keys map to key actions: **F1** = Train/Single toggle (RNS), **F2** = Store, **F3** = context-dependent (Next Site in NCS, Smooth in EMG, OK in impedance), **F4** = History (review stored traces), **F7** = Navigator (muscle/nerve selection). The colored buttons at the bottom of the screen mirror these F-keys. You can also use mouse clicks, base unit knobs, or StimTroller programmable buttons for the same functions. Learn these shortcuts early and you'll save yourself miles of mouse movement over your residency!"
    },
    stimtroller: {
        subtitle: "The most advanced handheld controller in EDX medicine. Per the official Cadwell manual, the StimTroller Plus features a rotary wheel, a Stim button, a Store button, a Reverse Polarity (+/-) button, and three programmable buttons.",
        buttons: [
            {
                name: "Intensity Wheel",
                color: "0ea5e9",
                content: "The central rotary dial. **Rotate** to adjust stimulation current (milliamps) -- the intensity level is displayed on-screen in the Stimulator Toolbar. The wheel provides tactile feedback for precise adjustments. When a programmable button is set to Distance mode, the wheel switches to adjusting distance in 0.5 cm increments."
            },
            {
                name: "Stim Button",
                color: "10b981",
                content: "Press to deliver a single electrical stimulus to the patient. In NCS, this is your primary trigger -- press it each time you want to shock the nerve. For Repetitive Nerve Stimulation (RNS), **hold the Stim button for 2 seconds** to initiate a stimulus train. The stimulator light on screen flashes yellow when a stimulus is delivered. You can also deliver single stimuli by pressing Knob #1 (the yellow knob) on the base unit."
            },
            {
                name: "Store Button",
                color: "ef4444",
                content: "Your 'Commit' button. Pressing Store freezes the live waveform and saves it to the report. The trace color changes from white to purple when stored, and the next site in the study automatically highlights. You can also store via the Store key on the base unit or by pressing the footswitch pedal."
            },
            {
                name: "Reverse Polarity (+/-)",
                color: "f59e0b",
                content: "Swaps the Cathode and Anode internally. A **green LED** on the stimulator indicates which probe is currently the Cathode. The default (normal) mode has the right-side probe as Cathode when holding the stimulator with the Stim button facing you and probes pointing up. The on-screen stimulator image and polarity field ('Nml' or 'Rev') also update to reflect the current setting. Essential for ulnar nerve studies at the elbow."
            },
            {
                name: "Programmable Buttons (1, 2, 3)",
                color: "8b5cf6",
                content: "Three customizable buttons for workflow shortcuts. **Button #1** is commonly assigned to Distance entry -- press it, turn the wheel to adjust in 0.5 cm increments, then press again to accept. These buttons can also be mapped to functions like Next Site, nerve selection, or trace selection, depending on your lab's preferred configuration."
            }
        ],
        trap: "Don't start with the dial at 100mA! Always verify your baseline is at **0mA** before placing it on a new patient. Delivering a high-intensity shock unexpectedly is the fastest way to lose a patient's trust. **Pro-tip:** Place the stimulator on the skin first, THEN start cranking the dial up from zero until you see the 'takeoff' of the wave.",
        baseUnitKnobs: "The Sierra Summit base unit has **3 physical knobs** that mirror key StimTroller functions: **Knob #1 (Yellow)** -- Intensity / Single Stim (turn to adjust current, press to deliver stimulus). **Knob #2** -- Context-dependent (cursor selection in NCS, score table in EMG, threshold in AEP). **Knob #3 (Blue in NCS+)** -- Gain / Sweep Speed (turn to adjust gain, press to toggle to sweep mode, then turn to adjust sweep)."
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
        zTip: "Before you shock, check your electrode impedances! Click the **Impedance Icon** in the software Toolbar Controls at the top of the screen. A window displays impedance values for each channel's Active (-) and Reference (+) inputs plus the Ground electrode. Values are color-coded: **Green (< 5k Ohms)** = excellent connection, **Yellow (5.1-20k)** = acceptable but could be better, **Red (> 20k)** = poor connection. **Senior Resident Secret:** If impedance is in the red zone, don't just push the sticker harder. Aggressively scrub the skin with alcohol or abrasive paste to remove dead cells -- high-quality data starts with low impedance. For evoked potential studies, ALL impedances should be below 5k Ohms."
    },
    controls: {
        intro: "You don't just 'set and forget' the machine. For every nerve, you are adjusting the three pillars of signal fidelity: Gain, Sweep, and Filters. Mastering these is what separates a 'technician' from a 'clinician'.",
        pillars: [
            {
                title: "Gain (Sensitivity)",
                icon: "",
                color: "0ea5e9",
                desc: "The 'Vertical Zoom.' Adjust this so the wave fills at least 1/3rd of the screen but doesn't 'clip' off the top.",
                settingsText: "Standard Settings:",
                settings: ["Sensory: 10 - 20 µV / div", "Motor: 2 - 5 mV / div", "EMG: 50 - 100 µV / div"]
            },
            {
                title: "Sweep Speed",
                icon: "",
                color: "10b981",
                desc: "The 'Horizontal Zoom.' This determines how much time (space) you see on the screen at once.",
                settingsText: "Standard Settings:",
                settings: ["NCS: 2 - 5 ms / div", "F-Waves: 10 ms / div", "H-Reflex: 10 - 20 ms / div"]
            },
            {
                title: "Filter Settings",
                icon: "",
                color: "8b5cf6",
                desc: "The 'Electronic Sieve.' It decides which frequencies are allowed on your screen and which are deleted.",
                settingsText: "NCS Filter:",
                settings: ["LFF: 20 Hz | HFF: 3 kHz", "EMG Filter:", "LFF: 10 Hz | HFF: 10 kHz"]
            }
        ],
        distortionWarning: "Beginners often forget to switch filters between sensory and motor studies. Using the narrow **Sensory filter (2kHz)** while recording a powerful **EMG muscle wave** will artificially 'round' the peaks, making all your muscle waves look diseased or 'slow'. Always verify your Filter Protocol at the bottom of the screen before you hit the 'Run' button. If the baseline looks 'hairy', your HFF is too high; if the baseline is 'wavy', your LFF is too low!"
    }
};
