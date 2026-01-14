
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
            ${generateErnestButton('emg-machine', 'EMG Machine & Parameters')}
            
            <!-- Hero Section -->
            <div class="machine-hero">
                <h1>⚡ Instrumentation Mastery</h1>
                <p>Mastering the instrument is as important as mastering the anatomy. Understand your knobs, filters, and settings to troubleshoot artifacts and optimize your study.</p>
            </div>

            <!-- Navigation Tabs -->
            <div class="tabs-container">
                <button onclick="EMGMachine_switchTab('hardware')" class="tech-tab active" id="tab-hardware">🖥️ Hardware</button>
                <button onclick="EMGMachine_switchTab('controls')" class="tech-tab" id="tab-controls">🎛️ Controls</button>
                <button onclick="EMGMachine_switchTab('features')" class="tech-tab" id="tab-features">🚀 Features</button>
                <button onclick="EMGMachine_switchTab('troubleshooting')" class="tech-tab" id="tab-troubleshooting">🔧 Troubleshooting</button>
            </div>

            <!-- CONTENT SECTIONS -->

            <!-- 1. HARDWARE SECTION -->
            <div id="content-hardware" class="tech-section" style="display: block;">
                <div class="grid-2">
                    <div class="tech-card">
                        <h3>The Base Unit</h3>
                        <div class="placeholder-img">
                            [Sierra Summit Base Unit]
                        </div>
                        <div class="info-box">
                            <ul>
                                <li><strong>🔌 Smart Amplifiers:</strong> A/D conversion at the headbox reduces noise.</li>
                                <li><strong>✅ Electrode Check:</strong> Integrated impedance testing.</li>
                            </ul>
                        </div>
                    </div>
                    <div class="tech-card">
                        <h3>The StimTroller Plus™</h3>
                        <div class="placeholder-img">
                            [StimTroller Handheld]
                        </div>
                        <div class="info-box">
                            <p>Handheld control for efficiency.</p>
                            <ul>
                                <li><strong>📏 Distance Wheel:</strong> Measure & stimulate simultaneously.</li>
                                <li><strong>Controls:</strong> Programmable buttons for Run/Stop/Store.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="alert-box info">
                    <h4>🔌 Electrode Setup</h4>
                    <p><strong>Active (G1/Black):</strong> Belly. <strong>Reference (G2/Red):</strong> Tendon. <strong>Ground (Green):</strong> Between stim/record sites.</p>
                </div>
            </div>

            <!-- 2. CONTROLS SECTION -->
            <div id="content-controls" class="tech-section" style="display: none;">
                <div class="grid-3">
                    <!-- GAIN -->
                    <div class="tech-card hover-lift">
                        <div class="icon-lg">📈</div>
                        <h3>Gain (Sensitivity)</h3>
                        <p class="def">Vertical zoom (uV/div or mV/div).</p>
                        <div class="settings-box">
                            <strong>Standard Settings:</strong>
                            <ul>
                                <li><strong>Sensory:</strong> 5-10 uV/div</li>
                                <li><strong>Motor:</strong> 2-5 mV/div</li>
                            </ul>
                        </div>
                    </div>

                    <!-- SWEEP -->
                    <div class="tech-card hover-lift">
                        <div class="icon-lg">⏱️</div>
                        <h3>Sweep Speed</h3>
                        <p class="def">Horizontal time scale (ms/div).</p>
                        <div class="settings-box">
                            <strong>Standard Settings:</strong>
                            <ul>
                                <li><strong>NCS:</strong> 2-5 ms/div</li>
                                <li><strong>F-Waves:</strong> 5-10 ms/div</li>
                                <li><strong>Rep Stim:</strong> 100 ms/div</li> // Changed from 50 to 100 (user feedback previously?) -> Stick to common practice, 50-100 is fine.
                            </ul>
                        </div>
                    </div>

                    <!-- PULSE WIDTH -->
                    <div class="tech-card hover-lift">
                        <div class="icon-lg">⚡</div>
                        <h3>Pulse Width</h3>
                        <p class="def">Duration of stimulus (ms).</p>
                        <div class="settings-box">
                            <strong>Standard Settings:</strong>
                            <ul>
                                <li><strong>Default:</strong> 0.1 ms</li>
                                <li><strong>Deep Nerves:</strong> 0.2 - 1.0 ms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. FEATURES SECTION -->
            <div id="content-features" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <h3>Standard & Advanced Capabilities</h3>
                    <div class="placeholder-img">
                        [Software Interface]
                    </div>
                    <div class="grid-2">
                        <div>
                            <h4 style="color: #be185d;">📊 Advanced Analysis</h4>
                            <ul>
                                <li><strong>AnatomyVIEW™:</strong> 3D color-coded anatomical models.</li>
                                <li><strong>Auto Findings:</strong> Generates report text automatically.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="alert-box warning">
                        <h4>⚡ The Notch Filter (60 Hz)</h4>
                        <p>Aggressively removes 60 Hz line noise. <strong>WARNING:</strong> Can distort waveforms (ringing) and alter latency! Use only as a last resort.</p>
                    </div>
                </div>
            </div>

            <!-- 4. TROUBLESHOOTING SECTION -->
            <div id="content-troubleshooting" class="tech-section" style="display: none;">
                 <div class="tech-card">
                    <h3>🔍 The "Big 3" Artifacts</h3>
                    <div class="artifact-list">
                        <div class="artifact-item">
                            <div class="artifact-icon">〰️</div>
                            <div>
                                <strong>60 Hz Cycle Noise</strong>
                                <p>Thick, fuzzy baseline. <br><strong>Fix:</strong> Check Ground, unplug laptops, turn off lights.</p>
                            </div>
                        </div>
                        <div class="artifact-item">
                            <div class="artifact-icon">⚡</div>
                            <div>
                                <strong>Shock Artifact</strong>
                                <p>Huge spike at start. <br><strong>Fix:</strong> Dry ground? Move Ground <em>between</em> Stim/Pickup.</p>
                            </div>
                        </div>
                        <div class="artifact-item">
                            <div class="artifact-icon">📉</div>
                            <div>
                                <strong>Baseline Drift</strong>
                                <p>Line wanders. <br><strong>Fix:</strong> Stabilize limb, clean skin (impedance).</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="alert-box success">
                    <h3>✅ Impedance Check Protocol</h3>
                    <p>Press <strong>"Impedance"</strong> or <strong>"Z"</strong> button.</p>
                    <ul>
                        <li><strong>Green (< 5k):</strong> Good to go.</li>
                        <li><strong>Red (> 20k):</strong> Scrub skin with prep pad!</li>
                    </ul>
                </div>
            </div>

        </div>

        <style>
            .emg-machine-container {
                font-family: 'Inter', sans-serif;
                max-width: 1000px;
                margin: 0 auto;
                color: #334155;
            }
            .machine-hero {
                text-align: center; 
                margin-bottom: 30px;
                padding: 30px;
                background: linear-gradient(135deg, #f8fafc, #eff6ff);
                border-radius: 16px;
            }
            .machine-hero h1 {
                color: #0f172a;
                font-size: 2.2rem;
                margin-bottom: 10px;
            }
            .machine-hero p {
                color: #64748b;
                font-size: 1.1rem;
                max-width: 700px;
                margin: 0 auto;
            }
            
            .tabs-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }
            .tech-tab {
                padding: 12px 24px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 600;
                color: #64748b;
                transition: all 0.2s;
                font-size: 0.95rem;
            }
            .tech-tab:hover {
                background: #f1f5f9;
                color: #0369a1;
                transform: translateY(-2px);
            }
            .tech-tab.active {
                background: #0ea5e9;
                color: white;
                border-color: #0ea5e9;
                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
            }

            .tech-card {
                background: white;
                padding: 25px;
                border-radius: 16px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                margin-bottom: 20px;
                transition: transform 0.2s;
            }
            .hover-lift:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);
            }
            .tech-card h3 {
                color: #0f172a;
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 1.25rem;
            }
            
            .grid-2 { display: grid; grid-template-columns: 1fr; gap: 20px; }
            .grid-3 { display: grid; grid-template-columns: 1fr; gap: 20px; }
            @media(min-width: 768px) {
                .grid-2 { grid-template-columns: 1fr 1fr; }
                .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
            }

            .placeholder-img {
                width: 100%;
                height: 150px;
                background: #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 2px dashed #cbd5e1;
                color: #94a3b8;
                font-weight: 600;
            }

            .info-box {
                background: #f8fafc;
                padding: 15px;
                border-radius: 8px;
            }
            .info-box ul { padding-left: 20px; margin: 0; }
            .info-box li { margin-bottom: 8px; }

            .settings-box {
                background: #f1f5f9;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
            }

            .icon-lg { font-size: 2.5rem; margin-bottom: 15px; }
            
            .alert-box {
                padding: 20px;
                border-radius: 12px;
                margin-top: 20px;
                border-left: 4px solid;
            }
            .alert-box.info { background: #f0f9ff; border-color: #0ea5e9; color: #0c4a6e; }
            .alert-box.warning { background: #fff1f2; border-color: #f43f5e; color: #881337; }
            .alert-box.success { background: #f0fdf4; border-color: #22c55e; color: #14532d; }
            .alert-box h3, .alert-box h4 { margin-top: 0; color: inherit; }

            .artifact-item {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                padding-bottom: 15px;
                margin-bottom: 15px;
                border-bottom: 1px solid #f1f5f9;
            }
            .artifact-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
            .artifact-icon {
                font-size: 1.5rem;
                background: #f1f5f9;
                width: 45px;
                height: 45px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .tech-section {
                animation: fadeIn 0.4s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
        `;
    }
};
