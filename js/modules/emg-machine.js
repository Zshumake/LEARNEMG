export function generateContent() {
    return `
    <div class="emg-machine-container" style="max-width: 1000px; margin: 0 auto; padding: 20px; font-family: 'Inter', sans-serif;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1e293b; font-size: 2.2em; margin-bottom: 10px;">⚡ EMG Machine & Technical Parameters</h2>
            <p style="color: #64748b; font-size: 1.1em; max-width: 700px; margin: 0 auto;">
                Mastering the instrument is as important as mastering the anatomy. Understand your knobs, filters, and settings to troubleshoot artifacts and optimize your study.
            </p>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; flex-wrap: wrap;">
            <button onclick="switchTab('hardware')" class="tech-tab active" id="tab-hardware">🖥️ Hardware & Setup</button>
            <button onclick="switchTab('controls')" class="tech-tab" id="tab-controls">🎛️ Core Controls</button>
            <button onclick="switchTab('features')" class="tech-tab" id="tab-features">🚀 Features & Software</button>
            <button onclick="switchTab('specs')" class="tech-tab" id="tab-specs">📊 Tech Specs (AANEM)</button>
            <button onclick="switchTab('troubleshooting')" class="tech-tab" id="tab-troubleshooting">🔧 Troubleshooting</button>
        </div>

        <!-- CONTENT SECTIONS -->

        <!-- 1. HARDWARE SECTION -->
        <div id="content-hardware" class="tech-section" style="display: block;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                <div class="tech-card">
                    <h3 style="color: #0369a1;">The Base Unit (Sierra Summit™)</h3>
                    <div style="width: 100%; height: 150px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 15px; border: 2px dashed #94a3b8; color: #64748b; font-weight: bold;">
                        [PLACEHOLDER: Sierra Summit Base Unit Image]
                    </div>
                    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                        <ul style="list-style: none; padding: 0; color: #334155;">
                            <li style="margin-bottom: 10px;"><strong>🔌 Smart Amplifiers:</strong> Analog-to-digital conversion happens <em>inside</em> the amplifier (headbox).</li>
                            <li style="margin-bottom: 10px;"><strong>✅ Electrode Check:</strong> Built-in continuity check to identify bad leads.</li>
                            <li style="margin-bottom: 10px;"><strong>🔊 Dual Speakers:</strong> High-power stereo for spatial analysis.</li>
                        </ul>
                    </div>
                </div>
                <div class="tech-card">
                    <h3 style="color: #0369a1;">The StimTroller Plus™</h3>
                    <div style="width: 100%; height: 150px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 15px; border: 2px dashed #94a3b8; color: #64748b; font-weight: bold;">
                        [PLACEHOLDER: StimTroller Plus Image]
                    </div>
                    <div style="background: #fff; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px;">
                        <p style="color: #475569; margin-bottom: 10px;">The signature handheld controller.</p>
                        <ul style="font-size: 0.9em; color: #334155;">
                            <li><strong>📏 Distance Wheel:</strong> Measure distance & adjust intensity.</li>
                            <li><strong>🔄 Adjustable Probes:</strong> Removable tips/angle.</li>
                            <li><strong>Controls:</strong> 3 programmable buttons.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                <h4 style="margin: 0 0 5px 0; color: #0f172a;">🔌 Electrode Setup</h4>
                <p style="margin: 0; font-size: 0.9em; color: #64748b;">
                    <strong>Active (G1/Black):</strong> Belly. <strong>Reference (G2/Red):</strong> Tendon. <strong>Ground (Green):</strong> Between stim/record.
                </p>
            </div>
        </div>

        <!-- 2. CONTROLS SECTION -->
        <div id="content-controls" class="tech-section" style="display: none;">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                
                <!-- GAIN -->
                <div class="tech-card highlight-hover">
                    <div style="font-size: 2em; margin-bottom: 10px;">📈</div>
                    <h3 style="color: #0f172a; margin-bottom: 10px;">Gain (Sensitivity)</h3>
                    <p style="font-size: 0.9em; color: #64748b; margin-bottom: 15px;"><strong>Definition:</strong> How much the signal is amplified/zoomed vertically. Measured in uV/div or mV/div.</p>
                    <div style="background: #f1f5f9; padding: 10px; border-radius: 6px;">
                        <strong style="font-size: 0.8em; text-transform: uppercase; color: #475569;">When to Adjust:</strong>
                        <ul style="font-size: 0.85em; padding-left: 20px; text-align: left; margin-top: 5px; color: #334155;">
                            <li><strong>To 5-10 uV/div:</strong> For Sensory Nerves (Snaps are tiny!).</li>
                            <li><strong>To 2-5 mV/div:</strong> For Motor Nerves (CMAPs are huge).</li>
                            <li><strong>Trouble:</strong> If wave is "clipped" (flat top/bottom), decrease gain (make number larger).</li>
                        </ul>
                    </div>
                </div>

                <!-- SWEEP -->
                <div class="tech-card highlight-hover">
                    <div style="font-size: 2em; margin-bottom: 10px;">⏱️</div>
                    <h3 style="color: #0f172a; margin-bottom: 10px;">Sweep Speed</h3>
                    <p style="font-size: 0.9em; color: #64748b; margin-bottom: 15px;"><strong>Definition:</strong> The horizontal time scale. How fast the "beam" moves across the screen. ms/div.</p>
                    <div style="background: #f1f5f9; padding: 10px; border-radius: 6px;">
                        <strong style="font-size: 0.8em; text-transform: uppercase; color: #475569;">When to Adjust:</strong>
                        <ul style="font-size: 0.85em; padding-left: 20px; text-align: left; margin-top: 5px; color: #334155;">
                            <li><strong>To 2-5 ms/div:</strong> Standard NCS.</li>
                            <li><strong>To 5-10 ms/div:</strong> F-Waves & H-Reflexes (need to see late responses).</li>
                            <li><strong>To 100 ms/div:</strong> Repetitive Stimulation (see the train).</li>
                        </ul>
                    </div>
                </div>

                <!-- PULSE WIDTH -->
                <div class="tech-card highlight-hover">
                    <div style="font-size: 2em; margin-bottom: 10px;">⚡</div>
                    <h3 style="color: #0f172a; margin-bottom: 10px;">Pulse Width</h3>
                    <p style="font-size: 0.9em; color: #64748b; margin-bottom: 15px;"><strong>Definition:</strong> Duration of the electrical stimulus. Standard is 0.1 ms.</p>
                    <div style="background: #f1f5f9; padding: 10px; border-radius: 6px;">
                        <strong style="font-size: 0.8em; text-transform: uppercase; color: #475569;">When to Adjust:</strong>
                        <ul style="font-size: 0.85em; padding-left: 20px; text-align: left; margin-top: 5px; color: #334155;">
                            <li><strong>Standard:</strong> 0.1 ms (default).</li>
                            <li><strong>Increase (0.2 - 1.0 ms):</strong> For deep nerves (Femoral/Sciatic) or large limbs (Edema/Obesity).</li>
                            <li><strong>Why?</strong> Adds total energy/charge without increasing the voltage spike, often more tolerable than cranking mA to max.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

        <!-- 3. FEATURES SECTION -->
        <div id="content-features" class="tech-section" style="display: none;">
            <div class="tech-card">
                <h3 style="color: #0f172a; margin-bottom: 20px;">Standard & Advanced Capabilities</h3>
                <div style="width: 100%; height: 150px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 20px; border: 2px dashed #94a3b8; color: #64748b; font-weight: bold;">
                    [PLACEHOLDER: Analysis Software Interface]
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h4 style="color: #be185d;">📊 Advanced Analysis</h4>
                        <ul style="font-size: 0.9em; color: #334155; line-height: 1.6;">
                            <li><strong>AnatomyVIEW™:</strong> 3D color-coded anatomical model.</li>
                            <li><strong>Auto Findings:</strong> Generates sentence-based findings.</li>
                            <li><strong>Buffer Playback:</strong> Review 10 min of audio/video.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="color: #15803d;">🔬 Specialized Studies</h4>
                        <ul style="font-size: 0.9em; color: #334155; line-height: 1.6;">
                    </div>
                </div>

                <div style="background: #fff1f2; padding: 15px; border-radius: 8px; border: 1px solid #fda4af;">
                    <h4 style="color: #be123c; margin: 0 0 10px 0;">⚡ The Notch Filter (60 Hz)</h4>
                    <p style="color: #881337; font-size: 0.95em; margin: 0;">
                        Aggressively removes 60 Hz line noise (from wall outlets/lights). <br>
                        <strong>WARNING:</strong> Only use when necessary! It can distort the waveform (ringing) and alter latency/amplitude values. Best practice is to eliminate the noise source first (unplug laptop, move beds).
                    </p>
                </div>
            </div>
        </div>

        <!-- 4. TROUBLESHOOTING SECTION -->
        <div id="content-troubleshooting" class="tech-section" style="display: none;">
             <div class="tech-card" style="margin-bottom: 20px;">
                <h3 style="color: #0f172a; margin-bottom: 15px;">🔍 The "Big 3" Artifacts</h3>
                <div style="display: grid; gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 1.5em; background: #e0f2fe; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">〰️</div>
                        <div>
                            <strong>60 Hz Cycle Noise</strong>
                            <p style="font-size: 0.9em; color: #64748b; margin: 0;">Thick, fuzzy baseline. Regular rhythmic peaks if zoomed in. <br><strong>Fix:</strong> Check Ground electrode, unplug nearby devices, turn off fluorescent lights.</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 1.5em; background: #e0f2fe; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">⚡</div>
                        <div>
                            <strong>Shock Artifact</strong>
                            <p style="font-size: 0.9em; color: #64748b; margin: 0;">Huge spike at the start of the trace. <br><strong>Fix:</strong> Your Ground is dry or in the wrong spot! Place Ground <em>between</em> Stimulator and Pickup.</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 1.5em; background: #e0f2fe; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">📉</div>
                        <div>
                            <strong>Baseline Drift</strong>
                            <p style="font-size: 0.9em; color: #64748b; margin: 0;">Line wanders up and down (respiration/movement). <br><strong>Fix:</strong> Stabilize patient limb. Clean skin (alcohol/prep pad) to lower impedance.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <h3 style="color: #166534; margin-bottom: 10px;">✅ Impedance Check Protocol</h3>
                <p style="color: #15803d;">Before every study (or if signal looks bad):</p>
                <ol style="color: #15803d; margin-top: 5px;">
                    <li>Press the <strong>"Impedance"</strong> or <strong>"Z"</strong> button on the base unit.</li>
                    <li>Look for all LEDs to be Green (< 5 kOhm).</li>
                    <li>If Red (> 20 kOhm): Signal will be noisy and small. <strong>Scrub the skin more!</strong></li>
                </ol>
            </div>
        </div>

    </div>

    <style>
        .tech-tab {
            padding: 12px 20px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            color: #64748b;
            transition: all 0.2s;
        }
        .tech-tab:hover {
            background: #f8fafc;
            color: #0369a1;
        }
        .tech-tab.active {
            background: #0ea5e9;
            color: white;
            border-color: #0ea5e9;
            box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.2);
        }
        .tech-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        .highlight-hover:hover {
            transform: translateY(-2px);
            border-color: #bae6fd;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .tech-section {
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>

    <script>
        // Inline tab switching logic (since module loader executes scripts)
        window.switchTab = function(tabName) {
            // Hide all sections
            document.querySelectorAll('.tech-section').forEach(el => el.style.display = 'none');
            // Show target
            document.getElementById('content-' + tabName).style.display = 'block';
            
            // Updates buttons
            document.querySelectorAll('.tech-tab').forEach(el => el.classList.remove('active'));
            document.getElementById('tab-' + tabName).classList.add('active');
        };
    </script>
    `;
}
