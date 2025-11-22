// NCS Fundamentals Module
// Core nerve conduction study principles and measurements

export function generateContent(module) {
    return `
        <div class="interactive-content" style="position: relative;">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master comprehensive nerve conduction study principles: physiology, techniques, calculations, clinical applications, and professional standards for accurate electrodiagnostic interpretation.
                </p>
            </div>

            <!-- Tab Navigation for Enhanced Content -->
            <div style="display: flex; background: #f8fafc; padding: 5px; border-radius: 12px; margin-bottom: 25px; gap: 3px; flex-wrap: wrap;">
                <button onclick="showNCSSection('fundamentals')" id="ncs-fundamentals-tab" class="ncs-tab active-ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🔬 Fundamentals
                </button>
                <button onclick="showNCSSection('techniques')" id="ncs-techniques-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    ⚡ Techniques
                </button>
                <button onclick="showNCSSection('calculations')" id="ncs-calculations-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🧮 Calculations
                </button>
                <button onclick="showNCSSection('clinical')" id="ncs-clinical-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🏥 Clinical
                </button>
                <button onclick="showNCSSection('standards')" id="ncs-standards-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    📋 Standards
                </button>
            </div>

            <!-- Fundamentals Section -->
            <div id="ncs-fundamentals-section" class="ncs-section">
                <!-- Nerve Physiology -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🧬 Nerve Physiology & Action Potentials</h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                            <h5 style="color: #92400e; margin-bottom: 15px;">⚡ Membrane Physiology</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Resting Potential:</strong> -70mV (Na⁺/K⁺ ATPase pump)</li>
                                <li><strong>Threshold:</strong> -55mV triggers voltage-gated Na⁺ channels</li>
                                <li><strong>Depolarization:</strong> Na⁺ influx → +30mV peak</li>
                                <li><strong>Repolarization:</strong> K⁺ efflux restores negative potential</li>
                                <li><strong>Refractory Period:</strong> Absolute (1ms) & relative phases</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">🚄 Conduction Velocity Factors</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Myelination:</strong> Saltatory conduction (50x faster)</li>
                                <li><strong>Axon Diameter:</strong> Larger = faster (square root relationship)</li>
                                <li><strong>Temperature:</strong> 2-5% decrease per 1°C drop</li>
                                <li><strong>Internodal Distance:</strong> Affects conduction efficiency</li>
                                <li><strong>Age:</strong> 0.5-1 m/s decrease per decade after 30</li>
                            </ul>
                        </div>
                    </div>

                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #f59e0b;">
                        <h5 style="color: #92400e; margin-bottom: 15px;">🔬 Fiber Type Classification</h5>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                                <strong style="color: #92400e;">Aα (Motor)</strong>
                                <div style="color: #6b7280; font-size: 0.9em; margin-top: 5px;">
                                    12-20μm diameter<br>
                                    70-120 m/s<br>
                                    Heavily myelinated
                                </div>
                            </div>
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
                                <strong style="color: #059669;">Aβ (Touch/Vibration)</strong>
                                <div style="color: #6b7280; font-size: 0.9em; margin-top: 5px;">
                                    5-12μm diameter<br>
                                    30-70 m/s<br>
                                    Myelinated
                                </div>
                            </div>
                            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
                                <strong style="color: #374151;">C (Pain/Temperature)</strong>
                                <div style="color: #6b7280; font-size: 0.9em; margin-top: 5px;">
                                    0.4-1.2μm diameter<br>
                                    0.5-2 m/s<br>
                                    Unmyelinated
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compound Potentials Deep Dive -->
                <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #1d4ed8; margin-bottom: 20px; font-size: 1.4em;">📊 Compound Potentials Deep Dive</h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                            <h5 style="color: #1d4ed8; margin-bottom: 15px;">🔋 CMAP (Compound Muscle Action Potential)</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Generation:</strong> Stimulate motor nerve → muscle fiber depolarization</li>
                                <li><strong>Amplitude:</strong> Reflects number of functioning motor axons</li>
                                <li><strong>Latency:</strong> Time to fastest conducting motor fibers</li>
                                <li><strong>Duration:</strong> Indicates synchrony of muscle fiber activation</li>
                                <li><strong>Area:</strong> Total electrical activity (amplitude × duration)</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">🌊 SNAP (Sensory Nerve Action Potential)</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Recording:</strong> Orthodromic (physiological) vs antidromic</li>
                                <li><strong>Amplitude:</strong> Lower than CMAP (μV vs mV)</li>
                                <li><strong>Sensitivity:</strong> First affected in length-dependent neuropathies</li>
                                <li><strong>Peak Latency:</strong> Time to maximum negative deflection</li>
                                <li><strong>Morphology:</strong> Triphasic waveform in normal studies</li>
                            </ul>
                        </div>
                    </div>

                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #3b82f6;">
                        <h5 style="color: #1d4ed8; margin-bottom: 15px;">⚖️ Factors Affecting Amplitude & Morphology</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 8px; font-weight: 600;">Technical Factors</h6>
                                <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Electrode placement and contact</li>
                                    <li>Stimulus intensity and duration</li>
                                    <li>Filter settings and gain</li>
                                    <li>Temperature and skin impedance</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 8px; font-weight: 600;">Physiological Factors</h6>
                                <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Age and height effects</li>
                                    <li>Muscle bulk and anatomy</li>
                                    <li>Temporal dispersion</li>
                                    <li>Phase cancellation</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 8px; font-weight: 600;">Pathological Factors</h6>
                                <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Axonal loss (amplitude ↓)</li>
                                    <li>Demyelination (dispersion ↑)</li>
                                    <li>Conduction block</li>
                                    <li>Reinnervation changes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Techniques Section -->
            <div id="ncs-techniques-section" class="ncs-section" style="display: none;">
                <!-- Stimulation Techniques -->
                <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #166534; margin-bottom: 20px; font-size: 1.4em;">⚡ Stimulation Techniques & Methods</h4>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">🎯 Supramaximal Stimulation</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">Principles</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Definition:</strong> 20-50% above stimulus threshold for maximum response</li>
                                    <li><strong>Purpose:</strong> Ensure all axons are depolarized</li>
                                    <li><strong>Verification:</strong> No amplitude increase with higher intensity</li>
                                    <li><strong>Safety:</strong> Avoid excessive current (patient discomfort)</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">Parameters</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Duration:</strong> 0.1-1.0ms (typically 0.2ms)</li>
                                    <li><strong>Intensity:</strong> 10-100mA range</li>
                                    <li><strong>Waveform:</strong> Square wave, constant current</li>
                                    <li><strong>Polarity:</strong> Cathode (-) stimulates, anode (+) blocks</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">📏 Electrode Placement & Spacing</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #166534; margin-bottom: 10px;">Motor Studies</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Active (G1):</strong> Over motor point of muscle</li>
                                    <li><strong>Reference (G2):</strong> Over tendon or bone</li>
                                    <li><strong>Ground:</strong> Between stimulator and recording electrodes</li>
                                    <li><strong>Distance:</strong> 8cm between stimulation sites (standard)</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 10px;">Sensory Studies</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Recording:</strong> Over nerve trunk (G1-G2: 3-4cm apart)</li>
                                    <li><strong>Distance:</strong> 14cm between stimulation and recording (standard)</li>
                                    <li><strong>Stimulation:</strong> Distally for orthodromic studies</li>
                                    <li><strong>Advantage:</strong> Orthodromic = physiological direction</li>
                                    <li><strong>Alternative:</strong> Antidromic for digit-to-palm studies</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">🌡️ Technical Factors & Optimization</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #dc2626; margin-bottom: 10px;">🌡️ Temperature Control</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Target:</strong> Limb temp >32°C</li>
                                    <li><strong>Effect:</strong> 2-5% CV change per 1°C</li>
                                    <li><strong>Warming:</strong> Heating lamps, warm water</li>
                                    <li><strong>Monitoring:</strong> Surface thermometer</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">📡 Signal Quality</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Impedance:</strong> <5kΩ for surface electrodes</li>
                                    <li><strong>Artifacts:</strong> Movement, 60Hz, stimulator</li>
                                    <li><strong>Filters:</strong> Low-pass 10kHz, high-pass 2-20Hz</li>
                                    <li><strong>Averaging:</strong> Multiple sweeps for SNAPs</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #059669; margin-bottom: 10px;">⚙️ Equipment Setup</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Gain:</strong> 2-5mV/div (motor), 10-20μV/div (sensory)</li>
                                    <li><strong>Sweep:</strong> 2-5ms/div (motor), 1-2ms/div (sensory)</li>
                                    <li><strong>Sensitivity:</strong> Optimize for clear waveform visualization</li>
                                    <li><strong>Calibration:</strong> Daily equipment verification</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Late Responses -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔄 Late Responses & Special Techniques</h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                            <h5 style="color: #92400e; margin-bottom: 15px;">🔄 F-Wave Studies</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Pathway:</strong> Antidromic to anterior horn → orthodromic return</li>
                                <li><strong>Latency:</strong> Assesses entire motor pathway length</li>
                                <li><strong>Normal Values:</strong> <31ms (median), <56ms (tibial)</li>
                                <li><strong>Clinical Use:</strong> Proximal conduction, radiculopathy</li>
                                <li><strong>Abnormalities:</strong> Prolonged, absent, or dispersed</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px;">🎯 H-Reflex Studies</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Pathway:</strong> Monosynaptic reflex arc (Ia afferent → α motor)</li>
                                <li><strong>Technique:</strong> Submaximal tibial nerve stimulation</li>
                                <li><strong>Recording:</strong> Soleus muscle surface electrodes</li>
                                <li><strong>Normal:</strong> <35ms latency, symmetric bilaterally</li>
                                <li><strong>Pathology:</strong> S1 radiculopathy, polyneuropathy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Calculations Section -->
            <div id="ncs-calculations-section" class="ncs-section" style="display: none;">
                <!-- Interactive Calculation System -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🧮 Interactive Calculation System</h4>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1f2937; margin-bottom: 20px;">📐 Conduction Velocity Calculations</h5>

                        <!-- Example 1: Normal Median Motor -->
                        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #10b981;">
                            <h6 style="color: #059669; margin-bottom: 15px;">Example 1: Normal Median Motor Study</h6>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center; margin: 15px 0;">
                                <div style="background: #ecfdf5; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Distance</div>
                                    <div style="font-size: 1.1em; color: #059669; margin: 5px 0; font-weight: bold;">8 cm</div>
                                </div>
                                <div style="background: #ecfdf5; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Wrist Latency</div>
                                    <div style="font-size: 1.1em; color: #059669; margin: 5px 0; font-weight: bold;">3.2 ms</div>
                                </div>
                                <div style="background: #ecfdf5; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Elbow Latency</div>
                                    <div style="font-size: 1.1em; color: #059669; margin: 5px 0; font-weight: bold;">4.8 ms</div>
                                </div>
                                <div style="background: #166534; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: white; font-size: 0.9em;">CV Result</div>
                                    <div style="font-size: 1.1em; color: white; margin: 5px 0; font-weight: bold;">50 m/s</div>
                                </div>
                            </div>
                            <div style="text-align: center; background: #f0fdf4; padding: 12px; border-radius: 6px;">
                                <strong style="color: #166534;">Calculation: 8 cm ÷ (4.8 - 3.2) ms = 8 ÷ 1.6 = 50 m/s ✓ Normal</strong>
                            </div>
                        </div>

                        <!-- Example 2: Abnormal Ulnar -->
                        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #dc2626;">
                            <h6 style="color: #dc2626; margin-bottom: 15px;">Example 2: Ulnar Neuropathy at Elbow</h6>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center; margin: 15px 0;">
                                <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Distance</div>
                                    <div style="font-size: 1.1em; color: #dc2626; margin: 5px 0; font-weight: bold;">8 cm</div>
                                </div>
                                <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Below Elbow</div>
                                    <div style="font-size: 1.1em; color: #dc2626; margin: 5px 0; font-weight: bold;">3.1 ms</div>
                                </div>
                                <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Above Elbow</div>
                                    <div style="font-size: 1.1em; color: #dc2626; margin: 5px 0; font-weight: bold;">7.5 ms</div>
                                </div>
                                <div style="background: #991b1b; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: white; font-size: 0.9em;">CV Result</div>
                                    <div style="font-size: 1.1em; color: white; margin: 5px 0; font-weight: bold;">18 m/s</div>
                                </div>
                            </div>
                            <div style="text-align: center; background: #fef2f2; padding: 12px; border-radius: 6px;">
                                <strong style="color: #991b1b;">Calculation: 8 cm ÷ (7.5 - 3.1) ms = 8 ÷ 4.4 = 18 m/s ⚠️ Abnormally Slow</strong>
                            </div>
                        </div>

                        <!-- Example 3: Normal Median Sensory -->
                        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #f59e0b;">
                            <h6 style="color: #92400e; margin-bottom: 15px;">Example 3: Normal Median Sensory Study</h6>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center; margin: 15px 0;">
                                <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Distance</div>
                                    <div style="font-size: 1.1em; color: #92400e; margin: 5px 0; font-weight: bold;">14 cm</div>
                                </div>
                                <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Digit 2 Stim</div>
                                    <div style="font-size: 1.1em; color: #92400e; margin: 5px 0; font-weight: bold;">0 ms</div>
                                </div>
                                <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Wrist Record</div>
                                    <div style="font-size: 1.1em; color: #92400e; margin: 5px 0; font-weight: bold;">2.8 ms</div>
                                </div>
                                <div style="background: #92400e; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: white; font-size: 0.9em;">CV Result</div>
                                    <div style="font-size: 1.1em; color: white; margin: 5px 0; font-weight: bold;">50 m/s</div>
                                </div>
                            </div>
                            <div style="text-align: center; background: #fef3c7; padding: 12px; border-radius: 6px;">
                                <strong style="color: #92400e;">Calculation: 14 cm ÷ 2.8 ms = 50 m/s ✓ Normal</strong>
                            </div>
                        </div>

                        <!-- Practice Problem -->
                        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 2px solid #3b82f6;">
                            <h6 style="color: #1d4ed8; margin-bottom: 15px;">🧠 Practice Problem: Calculate This!</h6>
                            <p style="color: #374151; margin-bottom: 15px;">Peroneal motor study: Distance = 8cm, Ankle latency = 4.2ms, Fibular head latency = 6.0ms</p>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
                                <button class="calc-option" onclick="checkCalcAnswer(this, false)" style="padding: 10px; background: #f3f4f6; border: 2px solid #d1d5db; border-radius: 8px; cursor: pointer;">35 m/s</button>
                                <button class="calc-option" onclick="checkCalcAnswer(this, true)" style="padding: 10px; background: #f3f4f6; border: 2px solid #d1d5db; border-radius: 8px; cursor: pointer;">44 m/s</button>
                                <button class="calc-option" onclick="checkCalcAnswer(this, false)" style="padding: 10px; background: #f3f4f6; border: 2px solid #d1d5db; border-radius: 8px; cursor: pointer;">52 m/s</button>
                            </div>
                        </div>
                    </div>

                    <!-- Amplitude & Duration Measurements -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1f2937; margin-bottom: 20px;">📏 Amplitude & Morphology Analysis</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 15px;">📊 Amplitude Measurements</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>CMAP:</strong> Baseline to negative peak (mV)</li>
                                    <li><strong>SNAP:</strong> Peak-to-peak measurement (μV)</li>
                                    <li><strong>Normal CMAP:</strong> >4mV (thenar), >2mV (hypothenar)</li>
                                    <li><strong>Normal SNAP:</strong> >15μV (median), >10μV (ulnar)</li>
                                    <li><strong>Age Effect:</strong> 1-2% decrease per decade</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 15px;">⏱️ Duration & Morphology</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Duration:</strong> Onset to return to baseline</li>
                                    <li><strong>Normal CMAP:</strong> 4-12ms duration</li>
                                    <li><strong>Phases:</strong> Baseline crossings + 1</li>
                                    <li><strong>Polyphasia:</strong> >4 phases = abnormal</li>
                                    <li><strong>Area:</strong> Amplitude × duration correlation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clinical Applications Section -->
            <div id="ncs-clinical-section" class="ncs-section" style="display: none;">
                <!-- Normal Values & Pathology Recognition -->
                <div style="background: linear-gradient(135deg, #fecaca, #fed7d7); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.4em;">🏥 Clinical Applications & Pattern Recognition</h4>

                    <!-- Comprehensive Normal Values -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #dc2626; margin-bottom: 20px;">📊 Comprehensive Normal Values by Nerve</h5>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <!-- Upper Extremity Motor -->
                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 15px;">💪 Upper Extremity Motor</h6>
                                <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                                    <strong>Median (APB):</strong><br>
                                    • CV: >49 m/s • DL: <4.4ms • Amp: >4mV<br><br>
                                    <strong>Ulnar (ADM):</strong><br>
                                    • CV: >49 m/s • DL: <3.3ms • Amp: >6mV<br><br>
                                    <strong>Radial (EIP):</strong><br>
                                    • CV: >50 m/s • DL: <3.5ms • Amp: >2mV
                                </div>
                            </div>

                            <!-- Upper Extremity Sensory -->
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 15px;">👋 Upper Extremity Sensory</h6>
                                <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                                    <strong>Median (digit 2):</strong><br>
                                    • CV: >50 m/s • DL: <3.5ms • Amp: >15μV<br><br>
                                    <strong>Ulnar (digit 5):</strong><br>
                                    • CV: >50 m/s • DL: <3.1ms • Amp: >10μV<br><br>
                                    <strong>Radial (snuffbox):</strong><br>
                                    • CV: >50 m/s • DL: <2.8ms • Amp: >12μV
                                </div>
                            </div>

                            <!-- Lower Extremity -->
                            <div style="background: #dbeafe; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1d4ed8; margin-bottom: 15px;">🦵 Lower Extremity</h6>
                                <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                                    <strong>Peroneal Motor:</strong><br>
                                    • CV: >44 m/s • DL: <6.5ms • Amp: >2mV<br><br>
                                    <strong>Tibial Motor:</strong><br>
                                    • CV: >41 m/s • DL: <5.8ms • Amp: >4mV<br><br>
                                    <strong>Sural Sensory:</strong><br>
                                    • CV: >40 m/s • Amp: >6μV
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pathology Pattern Recognition -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #dc2626; margin-bottom: 20px;">🔍 Pathology Pattern Recognition</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                            <!-- Demyelinating Pattern -->
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border: 2px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 15px;">🐌 Demyelinating Pattern</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>CV:</strong> Significantly slowed (&lt;70% of LLN)</li>
                                    <li><strong>DL:</strong> Markedly prolonged (&gt;130% of ULN)</li>
                                    <li><strong>Amplitude:</strong> Relatively preserved early</li>
                                    <li><strong>Morphology:</strong> Temporal dispersion</li>
                                    <li><strong>Conduction Block:</strong> &gt;20-50% amplitude drop</li>
                                </ul>
                            </div>

                            <!-- Axonal Pattern -->
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border: 2px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 15px;">⚡ Axonal Pattern</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>CV:</strong> Normal or mildly slow (&gt;80% of LLN)</li>
                                    <li><strong>DL:</strong> Normal or mildly prolonged</li>
                                    <li><strong>Amplitude:</strong> Reduced (&lt;50% of LLN)</li>
                                    <li><strong>Morphology:</strong> Normal duration</li>
                                    <li><strong>Pattern:</strong> Length-dependent (distal→proximal)</li>
                                </ul>
                            </div>

                            <!-- Mixed Pattern -->
                            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; border: 2px solid #6b7280;">
                                <h6 style="color: #374151; margin-bottom: 15px;">🔗 Mixed Pattern</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Features:</strong> Both demyelinating AND axonal</li>
                                    <li><strong>CV:</strong> Moderately slowed</li>
                                    <li><strong>Amplitude:</strong> Reduced with dispersion</li>
                                    <li><strong>Examples:</strong> CIDP, diabetic neuropathy</li>
                                    <li><strong>Prognosis:</strong> Depends on primary pathology</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Localization Principles -->
                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #dc2626; margin-bottom: 20px;">🎯 Localization Principles (Preston & Shapiro Framework)</h5>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 10px;">📍 Focal Lesions</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Discrete slowing or block across specific segment</li>
                                    <li>Normal conduction above/below lesion</li>
                                    <li>Examples: CTS, cubital tunnel, peroneal palsy</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 10px;">🌐 Generalized Lesions</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Uniform slowing across all segments</li>
                                    <li>Multiple nerves affected similarly</li>
                                    <li>Examples: CIDP, CMT, diabetic neuropathy</li>
                                </ul>
                            </div>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 10px;">📏 Length-Dependent</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Distal > proximal involvement</li>
                                    <li>Longest nerves affected first</li>
                                    <li>Examples: Most toxic/metabolic neuropathies</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Standards Section -->
            <div id="ncs-standards-section" class="ncs-section" style="display: none;">
                <!-- Quality Control & Professional Standards -->
                <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #7c3aed; margin-bottom: 20px; font-size: 1.4em;">📋 Professional Standards & Quality Control</h4>

                    <!-- Preston & Shapiro Cardinal Rules for NCS -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #7c3aed; margin-bottom: 20px;">⚖️ Cardinal Rules Applied to NCS (Preston & Shapiro Framework)</h5>

                        <div style="display: grid; gap: 20px;">
                            <div style="background: #faf5ff; padding: 20px; border-radius: 10px; border-left: 5px solid #7c3aed;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span style="background: #7c3aed; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8em;">1</span>
                                    NCS Must Correlate with Clinical Examination
                                </h6>
                                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 0.95em;">
                                    <strong>Unexpected findings demand re-examination.</strong> If median sensory study is abnormal but patient has normal sensory exam in median distribution, investigate technical factors or consider subclinical disease.
                                </p>
                            </div>

                            <div style="background: #faf5ff; padding: 20px; border-radius: 10px; border-left: 5px solid #059669;">
                                <h6 style="color: #059669; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span style="background: #059669; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8em;">2</span>
                                    Always Consider Technical Factors First
                                </h6>
                                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 0.95em;">
                                    <strong>Most "abnormalities" are technical errors.</strong> Check temperature, electrode placement, stimulus intensity, and patient cooperation before calling a study abnormal.
                                </p>
                            </div>

                            <div style="background: #faf5ff; padding: 20px; border-radius: 10px; border-left: 5px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span style="background: #dc2626; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8em;">3</span>
                                    Study Multiple Nerves for Pattern Recognition
                                </h6>
                                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 0.95em;">
                                    <strong>Single nerve abnormalities suggest focal lesions; multiple nerve involvement suggests systemic disease.</strong> Compare bilateral studies and examine similar function nerves.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Technical Quality Control -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #7c3aed; margin-bottom: 20px;">🔧 Technical Quality Control Checklist</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 15px; font-weight: 600;">🌡️ Pre-Study Requirements</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>Limb temperature >32°C (warming if needed)</li>
                                    <li>Clean electrode sites with alcohol/abrasive</li>
                                    <li>Check equipment calibration daily</li>
                                    <li>Verify electrode impedance <5kΩ</li>
                                    <li>Explain procedure to reduce anxiety</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 15px; font-weight: 600;">⚙️ During Study Monitoring</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>Maintain consistent electrode placement</li>
                                    <li>Verify supramaximal stimulation achieved</li>
                                    <li>Monitor for movement artifacts</li>
                                    <li>Check stimulus artifact for consistency</li>
                                    <li>Document any technical difficulties</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Clinical Correlation Requirements -->
                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #7c3aed; margin-bottom: 20px;">🩺 Clinical Correlation & Limitations</h5>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 10px;">✅ What NCS Can Do</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Assess large myelinated fiber function</li>
                                    <li>Localize focal lesions precisely</li>
                                    <li>Differentiate axonal vs demyelinating</li>
                                    <li>Quantify severity objectively</li>
                                    <li>Monitor progression/recovery</li>
                                </ul>
                            </div>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 10px;">❌ NCS Limitations</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Cannot assess small fiber neuropathy</li>
                                    <li>May miss very early/mild disease</li>
                                    <li>Cannot determine precise etiology</li>
                                    <li>Technical factors affect accuracy</li>
                                    <li>Patient cooperation required</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 10px;">⚠️ Reporting Requirements</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Always correlate with clinical findings</li>
                                    <li>Note technical limitations clearly</li>
                                    <li>Distinguish definite from possible abnormalities</li>
                                    <li>Provide specific recommendations</li>
                                    <li>Include prognostic information when appropriate</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NCS Fundamentals Quiz -->
            ${generateModuleQuiz([
                {
                    question: "What is the primary physiological mechanism underlying saltatory conduction in myelinated nerve fibers?",
                    options: [
                        "Continuous depolarization along the entire axon membrane",
                        "Action potentials 'jump' between nodes of Ranvier, depolarizing only at nodes",
                        "Myelin increases the resistance of the axon membrane uniformly",
                        "Schwann cells actively conduct the electrical signal"
                    ],
                    correct: 1,
                    explanation: "SALTATORY CONDUCTION occurs when action potentials 'JUMP' between nodes of Ranvier in myelinated fibers. This mechanism: (1) increases conduction velocity 50x compared to unmyelinated fibers, (2) requires depolarization only at nodes rather than continuously, (3) is energy efficient by reducing the membrane area requiring active Na⁺/K⁺ pumping. Myelination by Schwann cells insulates internodal segments, concentrating voltage-gated channels at nodes. This is why demyelinating diseases dramatically slow conduction."
                },
                {
                    question: "In nerve conduction studies, what does CMAP amplitude primarily reflect?",
                    options: [
                        "The speed of the fastest conducting motor fibers",
                        "The number of functioning motor axons",
                        "The degree of myelination of the nerve",
                        "The distance between stimulation sites"
                    ],
                    correct: 1,
                    explanation: "CMAP AMPLITUDE reflects the NUMBER OF FUNCTIONING MOTOR AXONS. When measured from baseline to negative peak (in millivolts), amplitude indicates how many motor units are contributing to the response. AXONAL LOSS causes amplitude reduction because fewer axons depolarize muscle fibers. This contrasts with: (1) LATENCY - reflects fastest fibers, (2) CONDUCTION VELOCITY - reflects myelination/fiber diameter, (3) DURATION - reflects synchrony. Amplitude is the key parameter for detecting axonal neuropathies."
                },
                {
                    question: "What is the target limb temperature for nerve conduction studies, and why does temperature matter?",
                    options: [
                        "Target >37°C; higher temperature speeds conduction",
                        "Target >32°C; every 1°C drop slows conduction by 2-5%",
                        "Target <30°C; cold temperatures improve signal quality",
                        "Temperature doesn't significantly affect NCS results"
                    ],
                    correct: 1,
                    explanation: "Limb temperature must be >32°C because cold significantly affects conduction. For every 1°C DROP below normal, conduction velocity SLOWS by 2-5% and distal latency increases. Cold limbs can falsely suggest demyelinating neuropathy. Temperature effects occur because: (1) ion channel kinetics slow in cold, (2) membrane resistance increases, (3) enzyme activity decreases. Always warm cold limbs with heating lamps or warm water before testing to avoid false-positive results."
                },
                {
                    question: "What is supramaximal stimulation, and why is it necessary in motor NCS?",
                    options: [
                        "Stimulation at the maximum tolerable intensity for the patient",
                        "Stimulation 20-50% above threshold to ensure all axons depolarize",
                        "The highest stimulus intensity the equipment can produce",
                        "Stimulation that produces a painful sensation"
                    ],
                    correct: 1,
                    explanation: "SUPRAMAXIMAL STIMULATION is 20-50% ABOVE the stimulus intensity that produces maximum CMAP amplitude. This ensures ALL motor axons in the nerve are depolarized. Verification: further increasing stimulus intensity produces NO amplitude increase. Submaximal stimulation causes errors: (1) underestimates amplitude (appears falsely reduced), (2) overestimates conduction velocity (only fastest fibers activated). This is a fundamental technical requirement - failure to achieve supramaximal stimulation is a common source of false-positive findings."
                },
                {
                    question: "What is the key difference in how CMAP amplitude versus SNAP amplitude is measured?",
                    options: [
                        "CMAP: baseline-to-peak (mV); SNAP: peak-to-peak (μV)",
                        "CMAP: peak-to-peak (mV); SNAP: baseline-to-peak (μV)",
                        "Both are measured peak-to-peak in the same units",
                        "Both are measured baseline-to-peak in the same units"
                    ],
                    correct: 0,
                    explanation: "CMAP amplitude is measured BASELINE-TO-NEGATIVE PEAK in millivolts (mV), while SNAP amplitude is measured PEAK-TO-PEAK in microvolts (μV). This difference exists because: (1) CMAPs are large (several mV), uniphasic/biphasic waveforms from muscle with clear baseline, (2) SNAPs are small (μV range), often triphasic with baseline drift, making peak-to-peak more reliable, (3) SNAPs are 1000x smaller than CMAPs. Understanding proper measurement technique is crucial for accurate amplitude interpretation."
                },
                {
                    question: "In conduction velocity calculations, if the wrist latency is 3.2ms, elbow latency is 4.8ms, and distance is 8cm, what is the forearm conduction velocity?",
                    options: [
                        "25 m/s",
                        "40 m/s",
                        "50 m/s",
                        "64 m/s"
                    ],
                    correct: 2,
                    explanation: "CALCULATION: Distance ÷ (Latency difference) = 8cm ÷ (4.8ms - 3.2ms) = 8 ÷ 1.6 = 50 m/s. This is NORMAL for median motor nerve. The formula is: Conduction Velocity (m/s) = Distance (cm) ÷ Time difference (ms) × 10. Key points: (1) use ONSET latencies for motor studies, (2) distance must be measured accurately between stimulation sites, (3) normal motor CV is typically >49-50 m/s in upper extremity. Values <70% of lower limit suggest demyelination."
                },
                {
                    question: "What pattern distinguishes demyelinating neuropathy from axonal neuropathy on NCS?",
                    options: [
                        "Demyelinating: reduced amplitude with normal CV; Axonal: slow CV with preserved amplitude",
                        "Demyelinating: slow CV with conduction blocks; Axonal: reduced amplitude with normal/mildly slow CV",
                        "Both show identical NCS patterns",
                        "Demyelinating: absent responses; Axonal: prolonged latencies"
                    ],
                    correct: 1,
                    explanation: "DEMYELINATING pattern: (1) Significantly SLOWED CV (<70% of LLN), (2) Markedly prolonged DL (>130% of ULN), (3) Amplitudes relatively preserved early, (4) Temporal dispersion and conduction blocks, (5) Affects myelin/Schwann cells. AXONAL pattern: (1) Normal or mildly slow CV (>80% of LLN), (2) REDUCED AMPLITUDES (<50% of LLN), (3) Normal duration, (4) Length-dependent distribution, (5) Affects axons directly. This fundamental distinction guides diagnosis, prognosis, and treatment."
                },
                {
                    question: "What is the F-wave, and what does it assess?",
                    options: [
                        "A direct motor response that assesses distal nerve segments",
                        "A sensory response that evaluates dorsal root function",
                        "A late response traveling antidromically to anterior horn cells then returning orthodromically, assessing entire motor pathway",
                        "A reflex response through the dorsal root ganglion"
                    ],
                    correct: 2,
                    explanation: "The F-WAVE is a LATE MOTOR RESPONSE that assesses the ENTIRE MOTOR PATHWAY. Pathway: (1) Antidromic stimulation travels UP motor axon to anterior horn cell, (2) ~5% of cells 'backfire', (3) Orthodromic impulse returns DOWN to muscle. Clinical utility: (1) Assesses PROXIMAL conduction (plexus, roots), (2) Useful in radiculopathy and proximal neuropathies, (3) Normal values: median <31ms, tibial <56ms. Prolonged or absent F-waves suggest proximal demyelination or axonal loss."
                }
            ])}

        </div>
    `;
}

// NCS Section Navigation Functions
function showNCSSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.ncs-section');
    sections.forEach(section => section.style.display = 'none');

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.ncs-tab');
    tabs.forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#64748b';
        tab.classList.remove('active-ncs-tab');
    });

    // Show selected section
    const selectedSection = document.getElementById('ncs-' + sectionName + '-section');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Activate selected tab
    const selectedTab = document.getElementById('ncs-' + sectionName + '-tab');
    if (selectedTab) {
        selectedTab.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
        selectedTab.style.color = 'white';
        selectedTab.classList.add('active-ncs-tab');
    }
}

// Initialize NCS Fundamentals with first section visible
function initializeNCSFundamentals() {
    // Wait a brief moment for DOM elements to be available
    setTimeout(() => {
        showNCSSection('fundamentals');
    }, 100);
}

// Make functions globally available for onclick handlers
window.showNCSSection = showNCSSection;
window.initializeNCSFundamentals = initializeNCSFundamentals;
