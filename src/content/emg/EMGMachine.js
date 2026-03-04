
import { generateErnestButton } from '../../utils/ButtonGenerator.js';

export const EMGMachine = {
    generateContent(module) {
        // Ensure global handler is defined
        if (!window.EMGMachine_switchTab) {
            window.EMGMachine_switchTab = function (tabName) {
                // Hide all sections
                document.querySelectorAll('.tech-section').forEach(el => el.style.display = 'none');
                // Show target
                const target = document.getElementById('content-' + tabName);
                if (target) target.style.display = 'block';

                // Updates buttons
                document.querySelectorAll('.tech-tab').forEach(el => el.classList.remove('active'));
                const btn = document.getElementById('tab-' + tabName);
                if (btn) btn.classList.add('active');
            };
        }

        return `
        <div class="emg-machine-container">
            ${generateErnestButton('emg-machine', 'Cadwell Sierra Instrumentation')}
            
            <!-- Hero Section -->
            <div class="machine-hero">
                <h1 style="font-size: 2.5em; letter-spacing: -0.04em; margin: 0;">⚡ Cadwell Sierra Summit</h1>
                <p style="margin-top: 15px;">Instrumentation mastery is the first step toward diagnostic precision. This guide isn't just a technical manual; it's a clinical roadmap highlighting the subtle hardware nuances and mental workflows you'll use every single day in the lab.</p>
            </div>

            <!-- Navigation Tabs -->
            <div class="tabs-container">
                <button onclick="EMGMachine_switchTab('hardware')" class="tech-tab active" id="tab-hardware">🖥️ System Overview</button>
                <button onclick="EMGMachine_switchTab('software')" class="tech-tab" id="tab-software">💻 NCS Software</button>
                <button onclick="EMGMachine_switchTab('stimtroller')" class="tech-tab" id="tab-stimtroller">🕹️ StimTroller Plus™</button>
                <button onclick="EMGMachine_switchTab('amplifier')" class="tech-tab" id="tab-amplifier">🔌 Preamplifier</button>
                <button onclick="EMGMachine_switchTab('controls')" class="tech-tab" id="tab-controls">🎛️ Settings Guide</button>
            </div>

            <!-- CONTENT SECTIONS -->

            <!-- 1. SYSTEM OVERVIEW -->
            <div id="content-hardware" class="tech-section" style="display: block;">
                <div class="grid-2">
                    <div class="tech-card">
                        <div style="color: #0ea5e9; font-weight: 800; font-size: 0.8em; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">The Control Hub</div>
                        <h3>The Base Unit</h3>
                        <div class="hardware-img-container" style="background: white;">
                            <img src="images/hardware/sierra-summit.webp" alt="Sierra Summit Console" class="hardware-img">
                        </div>
                        <div class="info-box">
                            <p style="font-weight: 600; color: #0f172a; margin-bottom: 10px;">The "Brain" of the EDX system.</p>
                            <p style="font-size: 0.95em; color: #475569; line-height: 1.6;">The Sierra Summit Base Unit is more than just a computer; it's a high-precision A/D converter. It takes the analog signals (tiny electrical whispers) from the patient's nerves and digitizes them at incredible sampling rates before they even reach the PC. This minimizes electronic interference and ensures that what you see on the screen is a faithful reproduction of the biological event. Every filter setting and gain adjustment starts here.</p>
                            <ul style="margin-top: 15px; font-size: 0.9em; color: #475569;">
                                <li><strong>Main Console:</strong> Handles high-speed data transfer via industrial-grade USB.</li>
                                <li><strong>Isolation Transformer:</strong> Hidden in the stand, this protects the patient from building-level electrical surges and creates a 'sterile' electrical environment.</li>
                                <li><strong>Speaker System:</strong> High-fidelity audio to help you 'hear' the muscle firing during needle EMG.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="tech-card">
                        <div style="color: #8b5cf6; font-weight: 800; font-size: 0.8em; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Physical Ergonomics</div>
                        <h3>The Senior Resident's Workflow</h3>
                        <div class="info-box" style="height: 100%; display: flex; flex-direction: column; justify-content: center;">
                            <p style="font-size: 0.95em; color: #475569; margin-bottom: 20px; line-height: 1.6;">Efficiency in the lab isn't just about speed; it's about minimizing 'cognitive load' and 'arm reach.' A professional resident organizes their lab like a cockpit, with three primary interactive zones:</p>
                            <div class="workflow-steps">
                                <div class="workflow-item">
                                    <span class="step-num">1</span>
                                    <div>
                                        <div style="font-weight: 700;">Zone A: The StimTroller Plus</div>
                                        <div style="font-size: 0.85em; color: #64748b;">Keep this in your dominant hand at all times. It handles 90% of your data entry (distances, nerve selection) and all of your stimulation. You should be able to operate it without looking.</div>
                                    </div>
                                </div>
                                <div class="workflow-item">
                                    <span class="step-num">2</span>
                                    <div>
                                        <div style="font-weight: 700;">Zone B: The Preamp (Headbox)</div>
                                        <div style="font-size: 0.85em; color: #64748b;">Mounted on an adjustable arm. Position it as close to the patient's limb as possible. This keeps your lead wires short, which is the #1 way to reduce electrical noise (interference).</div>
                                    </div>
                                </div>
                                <div class="workflow-item">
                                    <span class="step-num">3</span>
                                    <div>
                                        <div style="font-weight: 700;">Zone C: The Footpedal</div>
                                        <div style="font-size: 0.85em; color: #64748b;">Tucked under the cart. This is your 'Hands-Free' mode for needle EMG, allowing you to control the 'Run/Stop' and 'Store' functions while both of your hands are busy at the patient's side.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NCS SOFTWARE INTERFACE -->
            <div id="content-software" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <div style="color: #0ea5e9; font-weight: 800; font-size: 0.8em; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Analyzing the Sierra Interface</div>
                    <h3>The NCS Software Narrative</h3>
                    <p style="color: #475569; margin-bottom: 25px; line-height: 1.6;">The Sierra software is designed for high-speed clinical workflow. When you look at the screen, your eyes should follow a deliberate 'Data Audit' path: **First check the Nerve Tree → Then watch the Waveform → Finally verify the Results Table.** Never trust the table if the waveform looks messy!</p>
                    
                    <div class="hardware-img-container" style="height: auto; min-width: 100%; border: 3px solid #1e293b; background: #000; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
                        <img src="images/hardware/analysis-software.webp" alt="NCS Interface" class="hardware-img" style="object-fit: contain; padding: 0;">
                    </div>

                    <div class="grid-3" style="margin-top: 30px; gap: 20px;">
                        <div class="info-box" style="border-top: 4px solid #0ea5e9; background: #f0f9ff; padding: 15px; border-radius: 0 0 15px 15px;">
                            <h5 style="margin-bottom: 10px; color: #0369a1;">🌊 Waveform Window (Left)</h5>
                            <p style="font-size: 0.85em; color: #0c4a6e; margin-bottom: 10px;">This is your clinical truth. Your main job is to ensure the dots (markers) are in the right place. 'Takeoff' marker goes at the first departure from baseline; 'Peak' marker goes at the absolute summit.</p>
                            <ul style="font-size: 0.8em; padding-left: 15px; color: #075985;">
                                <li><strong>Markers:</strong> Use the StimTroller wheel to fine-tune placement.</li>
                                <li><strong>Superimpose:</strong> Check how waves stack to see changes in latency.</li>
                            </ul>
                        </div>
                        <div class="info-box" style="border-top: 4px solid #10b981; background: #f0fdf4; padding: 15px; border-radius: 0 0 15px 15px;">
                            <h5 style="margin-bottom: 10px; color: #166534;">📊 Results Table (Center)</h5>
                            <p style="font-size: 0.85em; color: #14532d; margin-bottom: 10px;">The logic engine. This table highlights values in Red or Blue if they fall outside the age-matched 'Normative' range for that specific nerve.</p>
                            <ul style="font-size: 0.8em; padding-left: 15px; color: #064e3b;">
                                <li><strong>Velocity:</strong> Only calculated after you input a distance (e.g., 8cm).</li>
                                <li><strong>Comparisons:</strong> Automatically calculates Side-to-Side ratios for symmetry checks.</li>
                            </ul>
                        </div>
                        <div class="info-box" style="border-top: 4px solid #8b5cf6; background: #f5f3ff; padding: 15px; border-radius: 0 0 15px 15px;">
                            <h5 style="margin-bottom: 10px; color: #5b21b6;">📁 Study Window (Right)</h5>
                            <p style="font-size: 0.85em; color: #4c1d95; margin-bottom: 10px;">The checklist. It manages the 'Protocol Tree,' allowing you to quickly switch between the Median, Ulnar, and Radial nerves with a single click.</p>
                            <ul style="font-size: 0.8em; padding-left: 15px; color: #3730a3;">
                                <li><strong>Real-time status:</strong> Checkmarks show which sites have stored data.</li>
                                <li><strong>Distance Log:</strong> View your measured distances at a glance.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="resident-tip" style="margin-top: 25px; padding: 25px; background: #fffbeb; border-radius: 12px; border: 1px solid #fde68a;">
                        <h4 style="margin-bottom: 8px; color: #92400e; display: flex; align-items: center; gap: 10px;">💡 Resident Pro-Tip: Keyboard Shortcuts</h4>
                        <p style="font-size: 0.9em; margin: 0; color: #78350f; line-height: 1.6;">Efficiency is king when the lab is busy. The colored buttons at the bottom of the screen always mirror the **F1-F7** keys on your keyboard and the physical buttons on the StimTroller. **F2** is always 'Store', **F3** is 'Next Site', and **F10** is 'Finish Study'. Learn these shortcuts early, and you'll save yourself miles of mouse movement over your residency!</p>
                    </div>
                </div>
            </div>

            <!-- STIMTROLLER PLUS -->
            <div id="content-stimtroller" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                        <div style="background: #0ea5e9; color: white; width: 60px; height: 60px; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 2em; box-shadow: 0 4px 12px rgba(14,165,233,0.3);">🕹️</div>
                        <div>
                            <h3 style="margin: 0;">StimTroller Plus™ Mastery</h3>
                            <p style="color: #64748b; margin: 5px 0 0 0;">The most advanced handheld controller in EDX medicine.</p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div class="hardware-img-container" style="height: 450px; background: #f1f5f9; border-radius: 20px; border: 2px solid #e2e8f0; position: relative;">
                            <img src="images/hardware/stimtroller.jpg" alt="StimTroller Plus" class="hardware-img rotate-90" style="filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));">
                            <div style="position: absolute; bottom: 30px; right: 30px; background: white; padding: 10px 15px; border-radius: 10px; font-size: 0.7em; font-weight: 800; border: 1px solid #e2e8f0;">360° VIEW</div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <div class="button-card" style="border-left: 5px solid #0ea5e9; border-top: none;">
                                <div class="button-name">Intensity / Distance Wheel</div>
                                <p style="font-size: 0.9em; line-height: 1.5; color: #475569;">The 'Haptic' dial. **Rotate** to adjust the stimulation current (milliamps). **Click it** to toggle into 'Distance Mode' so you can input your measurements without touching the computer. It provides physical 'clicks' for every 1mA change.</p>
                            </div>
                            <div class="button-card" style="border-left: 5px solid #ef4444; border-top: none; background: #fffcfc;">
                                <div class="button-name" style="color: #ef4444;">THE STORE BUTTON (RED)</div>
                                <p style="font-size: 0.9em; line-height: 1.5; color: #475569;">The thumb-triggered red button on the side. This is your 'Commit' button. Pressing this freezes the live waveform and adds it to the report. Senior trick: If the wave is beautiful but the patient moves, hit Store instantly to save your data before it's lost!</p>
                            </div>
                            <div class="button-card" style="border-left: 5px solid #10b981; border-top: none;">
                                <div class="button-name">Single / Seq Stim</div>
                                <p style="font-size: 0.9em; line-height: 1.5; color: #475569;">The center top button. **Single Press** for one pulse. **Double Press** or **Long Press** to start repetitive stimulation (useful for myasthenia testing). Having this on the probe means you never have to turn away from the patient.</p>
                            </div>
                            <div class="button-card" style="border-left: 5px solid #f59e0b; border-top: none;">
                                <div class="button-name">Reverse Polarity (+/-)</div>
                                <p style="font-size: 0.9em; line-height: 1.5; color: #475569;">Swaps the Cathode and Anode internally. This is a game-changer when testing the Ulnar nerve at the elbow; you can flip the polarity with a click rather than physically flipping the probe in a cramped space.</p>
                            </div>
                        </div>
                    </div>

                    <div class="resident-tip" style="margin-top: 25px; padding: 25px; background: #fef2f2; border-radius: 12px; border: 1px solid #fecaca;">
                        <h4 style="margin-bottom: 8px; color: #991b1b;">⚠️ The "Beginner's Dial" Trap</h4>
                        <p style="font-size: 0.95em; margin: 0; color: #7f1d1d; line-height: 1.6;">Don't start with the dial at 100mA! Always verify your baseline is at **0mA** before placing it on a new patient. Delivering a high-intensity shock unexpectedly is the fastest way to lose a patient's trust. **Pro-tip:** Place the stimulator on the skin first, THEN start cranking the dial up from zero until you see the 'takeoff' of the wave.</p>
                    </div>
                </div>
            </div>

            <!-- PREAMPLIFIER -->
            <div id="content-amplifier" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                                <span style="font-size: 2.5em;">🔌</span>
                                <div>
                                    <h3 style="margin: 0;">Pre-Amplifier Headbox</h3>
                                    <p style="color: #64748b; font-size: 0.9em; margin-top: 5px;">Double-Shielded High Fidelity Differential Input.</p>
                                </div>
                            </div>
                            <div class="hardware-img-container" style="background: white; border-radius: 15px; border: 2px solid #e2e8f0; height: 280px; padding: 30px;">
                                <img src="images/hardware/headbox.png" alt="Sierra Amplifier" class="hardware-img">
                            </div>
                            <p style="font-size: 0.95em; line-height: 1.7; color: #475569; margin-top: 25px;">Think of the Preamplifier as the 'Electronic Bodyguard.' It takes the tiny biological signals (measured in microvolts) and amplifies them immediately, right at the source, while rejecting any noise from the environment. **The Golden Rule of Noise:** Every inch of lead wire is an antenna for interference. Position the headbox so the wires hang slack and never cross paths with the power cables on the floor.</p>
                        </div>
                        
                        <div>
                            <h4 style="margin-bottom: 20px; color: #0f172a; font-size: 1.2em;">The Differential Trinity</h4>
                            <p style="font-size: 0.9em; color: #64748b; margin-bottom: 25px; line-height: 1.6;">The machine only sees the **difference** between G1 and G2. If the room humming reaches both leads evenly, it will be cancelled out. This is 'Common Mode Rejection'—the magic of modern EDX.</p>
                            <div class="port-list">
                                <div class="port-item" style="padding: 15px; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;">
                                    <span class="port-dot" style="background: black;"></span>
                                    <div>
                                        <div style="font-weight: 800;">G1 (Active): Black Lead</div>
                                        <div style="font-size: 0.85em; color: #64748b;">Place this directly over the motor point (the thickest part of the muscle belly). This is where the electrical wave starts its jump out of the skin.</div>
                                    </div>
                                </div>
                                <div class="port-item" style="padding: 15px; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;">
                                    <span class="port-dot" style="background: #ef4444;"></span>
                                    <div>
                                        <div style="font-weight: 800;">G2 (Reference): Red Lead</div>
                                        <div style="font-size: 0.85em; color: #64748b;">Place this on an electrically 'inactive' spot, like a tendon or a bone. It acts as the 'Control' group for the comparison.</div>
                                    </div>
                                </div>
                                <div class="port-item" style="padding: 15px; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;">
                                    <span class="port-dot" style="background: #22c55e;"></span>
                                    <div>
                                        <div style="font-weight: 800;">Ground: Green Lead</div>
                                        <div style="font-size: 0.85em; color: #64748b;">Placed *between* the stimulator and the recording leads. It 'bleeds off' the massive stimulus artifact before it touches your sensitive G1/G2 ports.</div>
                                    </div>
                                </div>
                            </div>

                            <div class="alert-box success" style="margin-top: 30px; padding: 25px; background: #ecfdf5; border-radius: 15px; border: 1.5px solid #10b981; position: relative; overflow: hidden; box-shadow: 0 5px 15px rgba(16,185,129,0.1);">
                                <div style="position: absolute; right: -15px; top: -15px; font-size: 5em; opacity: 0.05; transform: rotate(15deg);">💡</div>
                                <h4 style="margin-bottom: 10px; color: #064e3b; display: flex; align-items: center; gap: 8px; font-weight: 800;">The "Z" (Impedance) Cheat-Code</h4>
                                <p style="color: #065f46; margin: 0; font-size: 0.9em; line-height: 1.6;">Before you shock, look at the headbox. Notice the small 'Z' button? Press it! The lights next to your ports will turn **Green (&lt; 5kΩ)** if the connection is high-quality or **Red** if it's poor. **Senior Resident Secret:** If the light is Red, don't just push the sticker harder. Use one more alcohol swap to aggressively scrub the dead skin cells away—high-quality data is worth the extra 5 seconds of prep!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SETTINGS GUIDE -->
            <div id="content-controls" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <h3 style="margin-bottom: 30px; text-align: center; font-size: 1.8em;">The Dial Settings Mastery</h3>
                    <p style="text-align: center; color: #64748b; max-width: 800px; margin: 0 auto 40px auto; line-height: 1.6;">You don't just 'set and forget' the machine. For every nerve, you are adjusting the three pillars of signal fidelity: Gain, Sweep, and Filters. Mastering these is what separates a 'technician' from a 'clinician'.</p>
                    
                    <div class="grid-3">
                        <div class="tech-card hover-lift" style="border-top: 6px solid #0ea5e9; padding: 25px; margin: 0;">
                            <div class="icon-lg">📈</div>
                            <h4 style="color: #0369a1; font-weight: 800;">Gain (Sensitivity)</h4>
                            <p style="font-size: 0.85em; color: #64748b; margin-bottom: 20px; min-height: 60px;">The 'Vertical Zoom.' Adjust this so the wave fills at least 1/3rd of the screen but doesn't 'clip' off the top.</p>
                            <div style="background: #f0f9ff; padding: 15px; border-radius: 12px; font-size: 0.85em;">
                                <strong>Standard Settings:</strong>
                                <ul style="margin: 10px 0 0 10px; padding: 0; color: #0369a1; display: flex; flex-direction: column; gap: 5px;">
                                    <li><strong>Sensory:</strong> 10 - 20 µV / div</li>
                                    <li><strong>Motor:</strong> 2 - 5 mV / div</li>
                                    <li><strong>EMG:</strong> 50 - 100 µV / div</li>
                                </ul>
                            </div>
                        </div>
                        <div class="tech-card hover-lift" style="border-top: 6px solid #10b981; padding: 25px; margin: 0;">
                            <div class="icon-lg">⏱️</div>
                            <h4 style="color: #166534; font-weight: 800;">Sweep Speed</h4>
                            <p style="font-size: 0.85em; color: #64748b; margin-bottom: 20px; min-height: 60px;">The 'Horizontal Zoom.' This determines how much time (space) you see on the screen at once.</p>
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 12px; font-size: 0.85em;">
                                <strong>Standard Settings:</strong>
                                <ul style="margin: 10px 0 0 10px; padding: 0; color: #166534; display: flex; flex-direction: column; gap: 5px;">
                                    <li><strong>NCS:</strong> 2 - 5 ms / div</li>
                                    <li><strong>F-Waves:</strong> 10 ms / div</li>
                                    <li><strong>H-Reflex:</strong> 10 - 20 ms / div</li>
                                </ul>
                            </div>
                        </div>
                        <div class="tech-card hover-lift" style="border-top: 6px solid #8b5cf6; padding: 25px; margin: 0;">
                            <div class="icon-lg">🔧</div>
                            <h4 style="color: #5b21b6; font-weight: 800;">Filter Settings</h4>
                            <p style="font-size: 0.85em; color: #64748b; margin-bottom: 20px; min-height: 60px;">The 'Electronic Sieve.' It decides which frequencies are allowed on your screen and which are deleted.</p>
                            <div style="background: #f5f3ff; padding: 15px; border-radius: 12px; font-size: 0.85em;">
                                <strong>NCS Filter:</strong>
                                <ul style="margin: 5px 0 10px 10px; padding: 0; color: #5b21b6;">
                                    <li>LFF: 20 Hz | HFF: 3 kHz</li>
                                </ul>
                                <strong>EMG Filter:</strong>
                                <ul style="margin: 5px 0 0 10px; padding: 0; color: #5b21b6;">
                                    <li>LFF: 10 Hz | HFF: 10 kHz</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 40px; padding: 30px; background: #f8fafc; border-radius: 20px; border-left: 10px solid #cbd5e1; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                        <h4 style="margin-bottom: 12px; font-weight: 800;">The "Filter Distortion" Warning</h4>
                        <p style="font-size: 0.95em; line-height: 1.7; color: #475569;">Beginners often forget to switch filters between sensory and motor studies. Using the narrow **Sensory filter (2kHz)** while recording a powerful **EMG muscle wave** will artificially 'round' the peaks, making all your muscle waves look diseased or 'slow'. Always verify your Filter Protocol at the bottom of the screen before you hit the 'Run' button. If the baseline looks 'hairy', your HFF is too high; if the baseline is 'wavy', your LFF is too low!</p>
                    </div>
                </div>
            </div>

            <!-- Journey Footer -->
            <div style="text-align: center; margin-top: 80px; padding: 80px 40px; background: linear-gradient(135deg, #f8fafc, #f1f5f9); border-radius: 40px; border: 3px dashed #cbd5e1; position: relative; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);">
                <div style="position: absolute; left: -20px; bottom: -20px; font-size: 10em; opacity: 0.03; transform: rotate(-15deg);">🩺</div>
                <h2 style="color: #0f172a; margin-bottom: 20px; font-weight: 900; font-size: 2.2em; letter-spacing: -0.03em;">Module Complete: Instrumentation Mastery</h2>
                <p style="color: #64748b; margin-bottom: 40px; max-width: 650px; margin-left: auto; margin-right: auto; line-height: 1.8; font-size: 1.1em;">You've mastered the clinical equipment of the Cadwell Sierra Summit. You're no longer just looking at a machine—you're looking at a diagnostic extension of your own senses. You now understand the *Why* behind every dial and port. Ready to move from gear to technique?</p>
                <div style="display: flex; justify-content: center; gap: 20px;">
                    <button class="tech-tab active" style="padding: 18px 50px; font-size: 1.1em; border-radius: 20px;">Next: Technical Excellence →</button>
                    <button class="tech-tab" style="padding: 18px 40px; font-size: 1.1em; border-radius: 20px;">Return to Menu</button>
                </div>
            </div>

        </div>

        <style>
            .emg-machine-container {
                font-family: 'Inter', -apple-system, system-ui, sans-serif;
                max-width: 1100px;
                margin: 0 auto;
                color: #1e293b;
                line-height: 1.6;
            }
            .machine-hero {
                text-align: center; 
                margin-bottom: 40px;
                padding: 70px 40px;
                background: linear-gradient(135deg, #0f172a, #334155);
                color: white;
                border-radius: 30px;
                box-shadow: 0 25px 40px -10px rgba(0,0,0,0.15);
            }
            .machine-hero h1 { font-weight: 900; }
            .machine-hero p { opacity: 0.85; font-size: 1.25em; max-width: 750px; margin: 0 auto; font-weight: 400; }
            
            .tabs-container {
                display: flex;
                justify-content: center;
                gap: 12px;
                margin-bottom: 60px;
                flex-wrap: wrap;
                background: #f1f5f9;
                padding: 12px;
                border-radius: 24px;
            }
            .tech-tab {
                padding: 16px 30px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 18px;
                cursor: pointer;
                font-weight: 700;
                color: #475569;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 0.95em;
            }
            .tech-tab:hover {
                border-color: #0ea5e9;
                color: #0ea5e9;
                transform: translateY(-4px);
                box-shadow: 0 12px 20px -5px rgba(0,0,0,0.08);
            }
            .tech-tab.active {
                background: #0ea5e9;
                color: white;
                border-color: #0ea5e9;
                box-shadow: 0 12px 25px rgba(14, 165, 233, 0.35);
            }

            .tech-card {
                background: white;
                padding: 45px;
                border-radius: 32px;
                border: 1px solid #e2e8f0;
                margin-bottom: 35px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .tech-card:hover {
                 box-shadow: 0 20px 30px -10px rgba(0,0,0,0.05);
            }
            .tech-card h3 { color: #0f172a; margin-bottom: 25px; font-weight: 900; font-size: 1.7em; letter-spacing: -0.03em; }

            .hardware-img-container {
                width: 100%;
                height: 240px;
                background: #f8fafc;
                border: 1.5px solid #e2e8f0;
                border-radius: 24px;
                margin-bottom: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .hardware-img {
                max-width: 90%;
                max-height: 85%;
                object-fit: contain;
                transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .hardware-img-container:hover .hardware-img {
                transform: scale(1.08);
            }
            .hardware-img.rotate-90 {
                transform: rotate(-90deg);
                max-height: 150% !important;
                max-width: 150% !important;
            }
            .hardware-img-container:hover .hardware-img.rotate-90 {
                transform: scale(1.08) rotate(-90deg);
            }

            .workflow-steps { display: flex; flex-direction: column; gap: 25px; }
            .workflow-item { display: flex; align-items: flex-start; gap: 20px; }
            .step-num { 
                width: 36px; height: 36px; background: #8b5cf6; color: white; 
                border-radius: 12px; display: flex; align-items: center; justify-content: center;
                font-weight: 900; font-size: 1em; flex-shrink: 0;
                box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
            }

            .button-card {
                padding: 28px;
                background: #f8fafc;
                border-radius: 24px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border: 1px solid #f1f5f9;
            }
            .button-card:hover { 
                transform: translateX(10px) scale(1.02); 
                background: white;
                box-shadow: 0 10px 25px -10px rgba(0,0,0,0.1);
                border-color: #e2e8f0;
            }
            .button-name { font-weight: 900; color: #1e293b; margin-bottom: 12px; font-size: 1.15em; letter-spacing: -0.02em; }

            .port-list { display: flex; flex-direction: column; gap: 18px; }
            .port-item { display: flex; align-items: flex-start; gap: 20px; transition: all 0.3s; }
            .port-item:hover { transform: translateX(5px); }
            .port-dot { 
                width: 18px; height: 18px; border-radius: 50%; border: 4px solid white; 
                box-shadow: 0 0 0 2px rgba(0,0,0,0.1); flex-shrink: 0; margin-top: 4px;
            }

            .grid-2 { display: grid; grid-template-columns: 1fr; gap: 40px; }
            .grid-3 { display: grid; grid-template-columns: 1fr; gap: 30px; }
            @media(min-width: 992px) {
                .grid-2 { grid-template-columns: 1fr 1.2fr; }
                .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
            }

            .icon-lg { font-size: 3.5em; margin-bottom: 25px; }

            .tech-section { animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
            @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
            
            .resident-tip h4 { font-weight: 900; letter-spacing: -0.02em; }
        </style>
        `;
    }
};
