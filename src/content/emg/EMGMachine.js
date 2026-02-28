
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
                <h1>⚡ Cadwell Sierra Summit</h1>
                <p>Instrumentation mastery is the first step toward diagnostic precision. This guide highlights the essential hardware components and the critical buttons you'll use every day in the lab.</p>
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
                        <h3>The Base Unit</h3>
                        <div class="hardware-img-container" style="background: white;">
                            <img src="images/hardware/sierra-summit.webp" alt="Sierra Summit Console" class="hardware-img">
                        </div>
                        <div class="info-box">
                            <p>The "Brain" of the EDX system. It handles high-speed A/D conversion and integrates directly with the Sierra software platform.</p>
                            <ul>
                                <li><strong>Main Console:</strong> Connects all peripherals via high-speed USB.</li>
                                <li><strong>Software Integration:</strong> Real-time waveform rendering and automated findings.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="tech-card">
                        <h3>The Clinical Workflow</h3>
                        <div class="info-box" style="height: 100%; display: flex; flex-direction: column; justify-content: center;">
                            <p>Residents typically interact with the machine through three primary devices:</p>
                            <ol>
                                <li><strong>StimTroller Plus:</strong> For delivering shocks and storing data.</li>
                                <li><strong>Preamp:</strong> For electrode connection and impedance testing.</li>
                                <li><strong>Footpedal:</strong> For "hands-free" needle EMG operation.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

                </div>
            </div>

            <!-- 1b. NCS SOFTWARE INTERFACE -->
            <div id="content-software" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <h3>The NCS Main Interface</h3>
                    <p style="color: var(--clinical-text-muted); margin-bottom: 20px;">The Sierra Summit's software is designed for high-speed clinical workflow. Here is the primary layout you'll see during a study:</p>
                    
                    <div class="hardware-img-container" style="height: auto; min-width: 100%; border-style: solid; background: #000;">
                        <img src="images/hardware/analysis-software.webp" alt="NCS Interface" class="hardware-img" style="object-fit: contain; padding: 0;">
                    </div>

                    <div class="grid-3" style="margin-top: 30px; gap: 15px;">
                        <div class="info-box" style="border-top: 4px solid #0ea5e9;">
                            <h5 style="margin-bottom: 10px;">🌊 Waveform Window (Left)</h5>
                            <ul style="font-size: 0.85em; padding-left: 15px;">
                                <li><strong>Real-time Trace:</strong> Displays the live acquisition and saved sweeps.</li>
                                <li><strong>Markers:</strong> Active cursors for Latency and Peak-to-Peak measurements.</li>
                                <li><strong>Status Bar:</strong> Gain (uV/div) and Sweep (ms/div) shown at the bottom.</li>
                            </ul>
                        </div>
                        <div class="info-box" style="border-top: 4px solid #10b981;">
                            <h5 style="margin-bottom: 10px;">📊 Results & Tables (Center)</h5>
                            <ul style="font-size: 0.85em; padding-left: 15px;">
                                <li><strong>Motor/Sensory Tables:</strong> Shows Onset Latency, Amplitude, and CV.</li>
                                <li><strong>Normative Colors:</strong> Values highlight green (normal) or yellow/red (out of range).</li>
                                <li><strong>L/R Compare:</strong> Toggle at top to quickly see side-to-side differences.</li>
                            </ul>
                        </div>
                        <div class="info-box" style="border-top: 4px solid #8b5cf6;">
                            <h5 style="margin-bottom: 10px;">📁 Study Window (Right)</h5>
                            <ul style="font-size: 0.85em; padding-left: 15px;">
                                <li><strong>Nerve Tree:</strong> Your pre-planned protocol (e.g., Median, Ulnar).</li>
                                <li><strong>Breadcrumbs:</strong> Clear indicator of current site (Wrist, Elbow, etc.).</li>
                                <li><strong>Capture Log:</strong> List of all recordings saved for the current nerve.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="alert-box info" style="margin-top: 20px;">
                        <h4 style="margin-bottom: 8px;">⌨️ Virtual F-Keys & Knobs</h4>
                        <p style="font-size: 0.9em; margin: 0;">Notice the colored buttons at the bottom. These mirror the physical console, allowing you to use <strong>F1-F7</strong> for things like 'Auto-Distance' or 'Next Site', and the <strong>Circular Knobs</strong> for real-time Gain, Sweep, and Marker movement.</p>
                    </div>
                </div>
            </div>
            <div id="content-stimtroller" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                        <span style="font-size: 3em;">🕹️</span>
                        <div>
                            <h3>StimTroller Plus™</h3>
                            <p style="color: var(--clinical-text-muted);">The primary command center for NCS.</p>
                        </div>
                    </div>
                    
                    <div class="hardware-img-container" style="height: 380px; background: white;">
                        <img src="images/hardware/stimtroller.jpg" alt="StimTroller Plus" class="hardware-img rotate-90">
                    </div>

                    <div class="button-grid">
                        <div class="button-card">
                            <div class="button-name">Intensity / Distance</div>
                            <p>The central dial. Rotate to adjust mA (current) intensity. Press or rotate as a wheel to input distances.</p>
                        </div>
                        <div class="button-card" style="border-top-color: #ef4444;">
                            <div class="button-name" style="color: #ef4444;">STORE Button</div>
                            <p><strong>SUCCESS:</strong> Press to save the current tracing to the report. The most important button for capturing data.</p>
                        </div>
                        <div class="button-card">
                            <div class="button-name">Single Stim / Run</div>
                            <p>Center button above the wheel. Toggles between capturing a single pulse or repetitive stimulation.</p>
                        </div>
                        <div class="button-card">
                            <div class="button-name">Reverse Polarity (+/-)</div>
                            <p>Top center toggle. Quickly reverses the cathode and anode electronically without moving the probes.</p>
                        </div>
                        <div class="button-card">
                            <div class="button-name">Programmable 1 & 2</div>
                            <p>At the bottom. Typically mapped to 'Next Site' or 'Move Markers' for hands-on efficiency.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. PREAMPLIFIER -->
            <div id="content-amplifier" class="tech-section" style="display: none;">
                <div class="grid-2">
                    <div class="tech-card">
                        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                            <span style="font-size: 3em;">🔌</span>
                            <div>
                                <h3>Pre-Amplifier Headbox</h3>
                                <p style="color: var(--clinical-text-muted);">Premium differential amplification.</p>
                            </div>
                        </div>
                        <div class="hardware-img-container" style="background: white;">
                            <img src="images/hardware/headbox.png" alt="Sierra Amplifier" class="hardware-img">
                        </div>
                        <div class="info-box">
                            <p>The headbox provides high-fidelity differential amplification and filters out external electrical noise.</p>
                        </div>
                    </div>
                    
                    <div class="tech-card">
                        <h3>Input Configuration</h3>
                        <div class="port-list">
                            <div class="port-item">
                                <span class="port-dot" style="background: black;"></span>
                                <div><strong>G1 (Active):</strong> Black lead. Placed over the muscle belly.</div>
                            </div>
                            <div class="port-item">
                                <span class="port-dot" style="background: #ef4444;"></span>
                                <div><strong>G2 (Reference):</strong> Red lead. Placed over the tendon (E1).</div>
                            </div>
                            <div class="port-item">
                                <span class="port-dot" style="background: #22c55e;"></span>
                                <div><strong>Ground:</strong> Green lead. Placed between the stim site and G1.</div>
                            </div>
                        </div>

                        <div class="alert-box success" style="margin-top: 25px;">
                            <h4>🚀 The "Z" (Impedance) Button</h4>
                            <p>Press this on the headbox to run a live impedance check. <strong>Green (< 5kΩ)</strong> means excellent signal; <strong>Red</strong> means you need to scrub the skin!</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. SETTINGS -->
            <div id="content-controls" class="tech-section" style="display: none;">
                <div class="grid-3">
                    <div class="tech-card hover-lift">
                        <div class="icon-lg">📈</div>
                        <h3>Gain</h3>
                        <p class="def">Vertical sensitivity (uV/div).</p>
                        <div class="settings-box">
                            <strong>Standard:</strong>
                            <ul>
                                <li>Sensory: 10-20 uV</li>
                                <li>Motor: 2-5 mV</li>
                            </ul>
                        </div>
                    </div>
                    <div class="tech-card hover-lift">
                        <div class="icon-lg">⏱️</div>
                        <h3>Sweep</h3>
                        <p class="def">Horizontal time (ms/div).</p>
                        <div class="settings-box">
                            <strong>Standard:</strong>
                            <ul>
                                <li>NCS: 2-5 ms</li>
                                <li>F-Waves: 10 ms</li>
                            </ul>
                        </div>
                    </div>
                    <div class="tech-card hover-lift">
                        <div class="icon-lg">🔧</div>
                        <h3>Filters</h3>
                        <p class="def">LFF and HFF ranges.</p>
                        <div class="settings-box">
                            <strong>NCS Default:</strong>
                            <ul>
                                <li>LFF: 20 Hz</li>
                                <li>HFF: 2 kHz</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <style>
            .emg-machine-container {
                font-family: 'Inter', sans-serif;
                max-width: 1000px;
                margin: 0 auto;
                color: #1e293b;
            }
            .machine-hero {
                text-align: center; 
                margin-bottom: 30px;
                padding: 40px;
                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                border-radius: 20px;
                border: 1px solid #e2e8f0;
            }
            .machine-hero h1 { color: #0f172a; margin-bottom: 12px; }
            
            .tabs-container {
                display: flex;
                justify-content: center;
                gap: 12px;
                margin-bottom: 40px;
                flex-wrap: wrap;
            }
            .tech-tab {
                padding: 12px 24px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                cursor: pointer;
                font-weight: 600;
                color: #64748b;
                transition: all 0.2s;
            }
            .tech-tab.active {
                background: #0ea5e9;
                color: white;
                border-color: #0ea5e9;
                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
            }

            .tech-card {
                background: white;
                padding: 30px;
                border-radius: 20px;
                border: 1px solid #e2e8f0;
                margin-bottom: 20px;
            }

            .hardware-img-container {
                width: 100%;
                height: 180px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                margin-bottom: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .hardware-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                padding: 10px;
                transition: transform 0.3s ease;
            }
            .hardware-img-container:hover .hardware-img {
                transform: scale(1.05);
            }
            .hardware-img.rotate-90 {
                transform: rotate(-90deg);
                height: 120%;
                width: auto;
            }
            .hardware-img-container:hover .hardware-img.rotate-90 {
                transform: scale(1.05) rotate(-90deg);
            }

            .button-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 25px;
            }
            .button-card {
                padding: 15px;
                background: #f8fafc;
                border-radius: 12px;
                border-top: 4px solid #0ea5e9;
                font-size: 0.85em;
            }
            .button-name { font-weight: 700; color: #0f172a; margin-bottom: 5px; font-size: 1.1em; }

            .port-list { display: flex; flex-direction: column; gap: 12px; }
            .port-item { display: flex; align-items: center; gap: 12px; font-size: 0.95em; }
            .port-dot { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1); }

            .grid-2 { display: grid; grid-template-columns: 1fr; gap: 20px; }
            .grid-3 { display: grid; grid-template-columns: 1fr; gap: 20px; }
            @media(min-width: 768px) {
                .grid-2 { grid-template-columns: 1fr 1fr; }
                .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
            }

            .tech-section { animation: fadeIn 0.4s ease; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        </style>
        `;
    }
};
