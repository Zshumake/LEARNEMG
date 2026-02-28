
export const Pathophysiology = {
    generateContent(module) {
        console.log('🧠 Pathophysiology (Module 5) generated');
        // Initialize support functions if they exist (delayed to ensure DOM is ready)
        if (window.initializePathophysiology) {
            setTimeout(window.initializePathophysiology, 100);
        }

        return `

        <div class="interactive-content" style="position: relative;">
            
        <div data-podcast-trigger="true" data-module-id="neuropathy-pathophysiology" data-episode-id="neuropathy-poly"
             class="podcast-card-hover"
             style="background: linear-gradient(135deg, #ffffff, #f8fafc);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    padding: 24px;
                    border-radius: 20px;
                    margin-bottom: 24px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    position: relative;
                    overflow: hidden;">
            
            <!-- Decorative background blob -->
            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>

            <div style="position: relative;">
                <img src="images/ui/ERNEST.png"
                     style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover;"
                     alt="Ernest">
                <div style="position: absolute; bottom: 2px; right: 2px; background: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>
            </div>

            <div style="flex: 1; z-index: 1;">
                <div style="font-weight: 800; font-size: 1.2em; margin-bottom: 6px; color: #0f172a;">
                    Neuropathy Pathophysiology Series
                </div>
                <div style="font-size: 0.95em; color: #64748b;">
                    2 episodes available • Click to browse
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #f59e0b, #ea580c);
                       color: white;
                       width: 48px;
                       height: 48px;
                       border-radius: 50%;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                       box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
                       transition: transform 0.2s;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
        </div>
    
            <!-- Learning Objectives -->
            <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #9a3412; font-weight: 500;">• Master median and ulnar nerve anatomy and compression points</p>
                        <p style="color: #9a3412; font-weight: 500;">• Differentiate UNE vs UNW and CTS vs proximal median lesions</p>
                    </div>
                    <div>
                        <p style="color: #9a3412; font-weight: 500;">• Understand electrodiagnostic patterns for each lesion</p>
                        <p style="color: #9a3412; font-weight: 500;">• Apply clinical localization and differential diagnosis principles</p>
                    </div>
                </div>
            </div>

            <!-- Neuropathy Pathophysiology & Clinical Applications Section -->
            <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #8b5cf6;">
                <h4 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.4em;">🧠 Neuropathy Pathophysiology & Clinical Applications</h4>
                <p style="color: #7c3aed; margin-bottom: 25px; font-style: italic;">From fundamental mechanisms to clinical diagnosis of peripheral nerve disorders</p>

                <!-- Pathophysiology Tab Navigation -->
                <div style="display: flex; background: #faf5ff; padding: 5px; border-radius: 12px; margin-bottom: 25px; gap: 3px; flex-wrap: wrap;">
                    <button onclick="showPathophysSection('anatomy')" id="patho-anatomy-tab" class="patho-tab active-patho-tab" style="
                        background: #8b5cf6; color: white; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        🔬 Anatomy & Function
                    </button>
                    <button onclick="showPathophysSection('mechanisms')" id="patho-mechanisms-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        ⚡ Injury Mechanisms
                    </button>
                    <button onclick="showPathophysSection('injury-classification')" id="patho-injury-classification-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        🔀 Injury Classification
                    </button>
                    <button onclick="showPathophysSection('correlations')" id="patho-correlations-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        📊 EDX Correlations
                    </button>
                    <button onclick="showPathophysSection('classification')" id="patho-classification-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        🧪 Fiber Classification
                    </button>
                    <button onclick="showPathophysSection('atlas')" id="patho-atlas-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        🗺️ Clinical Atlas
                    </button>
                </div>

                <!-- Anatomy & Function Section -->
                <div id="patho-anatomy-content" class="patho-content" style="display: block;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">🔬 Fundamental Nerve Anatomy & Function</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1em;">📍 Peripheral Nervous System Components</h6>
                                <ul style="color: #475569; line-height: 1.6;">
                                    <li><strong>Nerve Roots:</strong> Motor (anterior) and sensory (dorsal) origins</li>
                                    <li><strong>Plexuses:</strong> Brachial (C5-T1) and lumbosacral (L1-S4) intermixing</li>
                                    <li><strong>Peripheral Nerves:</strong> Mixed motor/sensory/autonomic fibers</li>
                                    <li><strong>Neuromuscular Junction:</strong> Chemical transmission site</li>
                                    <li><strong>Muscle Fibers:</strong> Final effector organs</li>
                                </ul>
                            </div>

                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #22c55e;">
                                <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🧬 Schwann Cells & Myelin</h6>
                                <ul style="color: #475569; line-height: 1.6;">
                                    <li><strong>Myelin Formation:</strong> Concentric spirals of Schwann cell membrane</li>
                                    <li><strong>Internodes:</strong> Myelinated segments (~1mm length)</li>
                                    <li><strong>Nodes of Ranvier:</strong> Unmyelinated gaps (1-2μm)</li>
                                    <li><strong>Insulation Function:</strong> Reduces capacitance, enables saltatory conduction</li>
                                    <li><strong>Support Role:</strong> Metabolic support and nerve regeneration</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
                            <h6 style="color: #d97706; margin-bottom: 15px; font-size: 1.1em;">⚡ Action Potential Propagation</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #92400e; margin-bottom: 10px;"><strong>Saltatory Conduction (Myelinated):</strong></p>
                                    <ul style="color: #78350f; line-height: 1.6; font-size: 0.9em;">
                                        <li>Depolarization only at nodes</li>
                                        <li>Action potential "jumps" between nodes</li>
                                        <li>Conduction velocity: 35-75 m/s</li>
                                        <li>Energy efficient transmission</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #92400e; margin-bottom: 10px;"><strong>Continuous Conduction (Unmyelinated):</strong></p>
                                    <ul style="color: #78350f; line-height: 1.6; font-size: 0.9em;">
                                        <li>Depolarization along entire membrane</li>
                                        <li>Slow, progressive transmission</li>
                                        <li>Conduction velocity: 0.2-1.5 m/s</li>
                                        <li>Used for pain, temperature, autonomics</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; border: 2px solid #22c55e;">
                            <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🔑 Key Physiological Principles</h6>
                            <div style="color: #166534; line-height: 1.6;">
                                <p><strong>Resting Membrane Potential:</strong> -70 to -90mV maintained by Na+/K+ pump</p>
                                <p><strong>Threshold Activation:</strong> 10-30mV depolarization triggers all-or-none response</p>
                                <p><strong>Refractory Period:</strong> 1-2ms inactivation prevents backward propagation</p>
                                <p><strong>Conduction Velocity Formula:</strong> CV ∝ axon diameter × myelination thickness</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Injury Mechanisms Section -->
                <div id="patho-mechanisms-content" class="patho-content" style="display: none;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">⚡ Nerve Injury Mechanisms</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #ef4444;">
                                <h6 style="color: #dc2626; margin-bottom: 15px; font-size: 1.1em;">🛡️ Demyelinating Neuropathies</h6>
                                <div style="color: #7f1d1d; line-height: 1.6;">
                                    <p><strong>Primary Pathology:</strong> Myelin sheath damage/loss</p>
                                    <p><strong>Mechanisms:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Immune-mediated destruction</li>
                                        <li>Metabolic disruption</li>
                                        <li>Compression-induced ischemia</li>
                                        <li>Toxic demyelination</li>
                                    </ul>
                                    <p><strong>Functional Effects:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Slowed conduction velocity</li>
                                        <li>Conduction blocks</li>
                                        <li>Temporal dispersion</li>
                                        <li>Prolonged distal latencies</li>
                                    </ul>
                                </div>
                            </div>

                            <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1d4ed8; margin-bottom: 15px; font-size: 1.1em;">🔗 Axonal Neuropathies</h6>
                                <div style="color: #1e3a8a; line-height: 1.6;">
                                    <p><strong>Primary Pathology:</strong> Axon degeneration</p>
                                    <p><strong>Mechanisms:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Wallerian degeneration</li>
                                        <li>Metabolic dysfunction</li>
                                        <li>Toxic axonopathy</li>
                                        <li>Ischemic damage</li>
                                    </ul>
                                    <p><strong>Functional Effects:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Reduced amplitude (axon loss)</li>
                                        <li>Denervation (fibrillations)</li>
                                        <li>Motor unit dropout</li>
                                        <li>Preserved conduction velocity</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #fefce8; padding: 20px; border-radius: 10px; border-left: 4px solid #eab308; margin-bottom: 20px;">
                            <h6 style="color: #a16207; margin-bottom: 15px; font-size: 1.1em;">🔄 Mixed Neuropathies</h6>
                            <div style="color: #854d0e; line-height: 1.6;">
                                <p><strong>Combined Pathology:</strong> Both axonal and demyelinating features</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                                    <div>
                                        <p style="font-weight: 600;">Common Causes:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Diabetic neuropathy</li>
                                            <li>Uremic neuropathy</li>
                                            <li>Chronic inflammatory conditions</li>
                                            <li>Severe compression neuropathies</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p style="font-weight: 600;">EDX Features:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Reduced amplitudes</li>
                                            <li>Slowed conduction</li>
                                            <li>Prolonged latencies</li>
                                            <li>Denervation changes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; border: 2px solid #8b5cf6;">
                            <h6 style="color: #6b21a8; margin-bottom: 15px; font-size: 1.1em;">🗜️ Compression Neuropathies</h6>
                            <div style="color: #581c87; line-height: 1.6;">
                                <p><strong>Pathophysiology Stages:</strong></p>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px;">
                                    <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                        <p style="font-weight: 600; color: #7c3aed;">Stage 1: Ischemia</p>
                                        <ul style="font-size: 0.85em; margin-left: 15px;">
                                            <li>Reduced blood flow</li>
                                            <li>Reversible dysfunction</li>
                                            <li>Conduction slowing</li>
                                        </ul>
                                    </div>
                                    <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                        <p style="font-weight: 600; color: #7c3aed;">Stage 2: Demyelination</p>
                                        <ul style="font-size: 0.85em; margin-left: 15px;">
                                            <li>Myelin breakdown</li>
                                            <li>Conduction blocks</li>
                                            <li>Temporal dispersion</li>
                                        </ul>
                                    </div>
                                    <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                        <p style="font-weight: 600; color: #7c3aed;">Stage 3: Axonal Loss</p>
                                        <ul style="font-size: 0.85em; margin-left: 15px;">
                                            <li>Wallerian degeneration</li>
                                            <li>Amplitude reduction</li>
                                            <li>Denervation changes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Injury Classification Section -->
                <div id="patho-injury-classification-content" class="patho-content" style="display: none;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">🔀 Nerve Injury Classification Systems</h5>

                        <!-- Nerve Regeneration Info Box -->
                        <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 20px; border-radius: 10px; border-left: 4px solid #10b981; margin-bottom: 25px;">
                            <h6 style="color: #047857; margin-bottom: 12px; font-size: 1.1em; display: flex; align-items: center;">
                                <span style="font-size: 24px; margin-right: 10px;">⏱️</span>
                                Key Principle: Nerve Regeneration Rate
                            </h6>
                            <div style="color: #065f46; line-height: 1.6;">
                                <p style="font-size: 1.05em; margin-bottom: 10px;"><strong>Peripheral nerves regenerate at approximately:</strong></p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                                    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                                        <p style="font-size: 2em; font-weight: bold; color: #10b981; margin: 0;">1 mm/day</p>
                                        <p style="font-size: 0.9em; margin: 5px 0 0 0;">Millimeters per day</p>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                                        <p style="font-size: 2em; font-weight: bold; color: #10b981; margin: 0;">1 inch/month</p>
                                        <p style="font-size: 0.9em; margin: 5px 0 0 0;">Approximately 25mm/month</p>
                                    </div>
                                </div>
                                <p style="font-size: 0.95em;"><strong>Clinical Implication:</strong> Recovery time depends on distance from injury site to target muscle. A proximal lesion requires more time for reinnervation than a distal one.</p>
                            </div>
                        </div>

                        <!-- Seddon Classification -->
                        <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border: 2px solid #dc2626; margin-bottom: 25px;">
                            <h6 style="color: #991b1b; margin-bottom: 20px; font-size: 1.2em;">📋 Seddon Classification (1943)</h6>
                            <p style="color: #7f1d1d; margin-bottom: 20px; font-style: italic;">Simple 3-category system based on structural damage and prognosis</p>

                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                                <!-- Neurapraxia -->
                                <div style="background: #fee2e2; padding: 18px; border-radius: 10px; border: 2px solid #fca5a5;">
                                    <h6 style="color: #991b1b; margin-bottom: 12px; font-weight: bold;">Type 1: Neurapraxia</h6>
                                    <p style="color: #7f1d1d; font-size: 0.9em; margin-bottom: 10px;"><strong>Etiology:</strong> Nerve compression injury</p>
                                    <p style="color: #7f1d1d; font-size: 0.9em; margin-bottom: 10px;"><strong>Pathology:</strong> Local myelin injury, axon intact</p>
                                    <p style="color: #7f1d1d; font-size: 0.9em; margin-bottom: 10px;"><strong>Conduction:</strong> Block at lesion site</p>
                                    <p style="color: #059669; font-size: 0.9em; font-weight: bold;">✓ Best prognosis</p>
                                    <p style="color: #059669; font-size: 0.85em;">Recovery: Days to weeks</p>
                                </div>

                                <!-- Axonotmesis -->
                                <div style="background: #fef3c7; padding: 18px; border-radius: 10px; border: 2px solid #fcd34d;">
                                    <h6 style="color: #92400e; margin-bottom: 12px; font-weight: bold;">Type 2: Axonotmesis</h6>
                                    <p style="color: #78350f; font-size: 0.9em; margin-bottom: 10px;"><strong>Etiology:</strong> Nerve crush injury</p>
                                    <p style="color: #78350f; font-size: 0.9em; margin-bottom: 10px;"><strong>Pathology:</strong> Axonal interruption, endoneurial tubes intact</p>
                                    <p style="color: #78350f; font-size: 0.9em; margin-bottom: 10px;"><strong>Conduction:</strong> Wallerian degeneration</p>
                                    <p style="color: #d97706; font-size: 0.9em; font-weight: bold;">⚠ Intermediate prognosis</p>
                                    <p style="color: #d97706; font-size: 0.85em;">Recovery: Months (1mm/day)</p>
                                </div>

                                <!-- Neurotmesis -->
                                <div style="background: #fee2e2; padding: 18px; border-radius: 10px; border: 2px solid #dc2626;">
                                    <h6 style="color: #7f1d1d; margin-bottom: 12px; font-weight: bold;">Type 3: Neurotmesis</h6>
                                    <p style="color: #450a0a; font-size: 0.9em; margin-bottom: 10px;"><strong>Etiology:</strong> Nerve transection injury</p>
                                    <p style="color: #450a0a; font-size: 0.9em; margin-bottom: 10px;"><strong>Pathology:</strong> Complete disruption of axon and connective tissue</p>
                                    <p style="color: #450a0a; font-size: 0.9em; margin-bottom: 10px;"><strong>Conduction:</strong> Complete failure</p>
                                    <p style="color: #dc2626; font-size: 0.9em; font-weight: bold;">✗ Worst prognosis</p>
                                    <p style="color: #dc2626; font-size: 0.85em;">Recovery: Surgery required</p>
                                </div>
                            </div>
                        </div>

                        <!-- Sunderland Classification -->
                        <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border: 2px solid #3b82f6; margin-bottom: 25px;">
                            <h6 style="color: #1e40af; margin-bottom: 20px; font-size: 1.2em;">📊 Sunderland Classification (1951)</h6>
                            <p style="color: #1e3a8a; margin-bottom: 20px; font-style: italic;">Detailed 5-type system based on specific structural components damaged</p>

                            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 20px;">
                                <!-- Type 1 -->
                                <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border: 2px solid #93c5fd;">
                                    <h6 style="color: #1e40af; margin-bottom: 10px; font-weight: bold; font-size: 0.95em;">Type 1</h6>
                                    <p style="color: #1e3a8a; font-size: 0.85em; margin-bottom: 8px;"><strong>= Neurapraxia</strong></p>
                                    <p style="color: #1e3a8a; font-size: 0.8em; margin-bottom: 8px;">Conduction block</p>
                                    <div style="background: white; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                                        <p style="color: #059669; font-size: 0.75em; margin: 0;"><strong>Myelin:</strong> ✗</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Axon:</strong> ✓</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Endoneurium:</strong> ✓</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Perineurium:</strong> ✓</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Epineurium:</strong> ✓</p>
                                    </div>
                                    <p style="color: #059669; font-size: 0.75em; font-weight: bold;">Excellent recovery</p>
                                </div>

                                <!-- Type 2 -->
                                <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; border: 2px solid #7dd3fc;">
                                    <h6 style="color: #0369a1; margin-bottom: 10px; font-weight: bold; font-size: 0.95em;">Type 2</h6>
                                    <p style="color: #075985; font-size: 0.85em; margin-bottom: 8px;"><strong>= Axonotmesis</strong></p>
                                    <p style="color: #075985; font-size: 0.8em; margin-bottom: 8px;">Axonal injury</p>
                                    <div style="background: white; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Myelin:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Axon:</strong> ✗</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Endoneurium:</strong> ✓</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Perineurium:</strong> ✓</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Epineurium:</strong> ✓</p>
                                    </div>
                                    <p style="color: #059669; font-size: 0.75em; font-weight: bold;">Good recovery</p>
                                </div>

                                <!-- Type 3 -->
                                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 2px solid #fcd34d;">
                                    <h6 style="color: #92400e; margin-bottom: 10px; font-weight: bold; font-size: 0.95em;">Type 3</h6>
                                    <p style="color: #78350f; font-size: 0.85em; margin-bottom: 8px;"><strong>Type 2 +</strong></p>
                                    <p style="color: #78350f; font-size: 0.8em; margin-bottom: 8px;">Endoneurium injury</p>
                                    <div style="background: white; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Myelin:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Axon:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Endoneurium:</strong> ✗</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Perineurium:</strong> ✓</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Epineurium:</strong> ✓</p>
                                    </div>
                                    <p style="color: #d97706; font-size: 0.75em; font-weight: bold;">Variable recovery</p>
                                </div>

                                <!-- Type 4 -->
                                <div style="background: #fee2e2; padding: 15px; border-radius: 8px; border: 2px solid #fca5a5;">
                                    <h6 style="color: #991b1b; margin-bottom: 10px; font-weight: bold; font-size: 0.95em;">Type 4</h6>
                                    <p style="color: #7f1d1d; font-size: 0.85em; margin-bottom: 8px;"><strong>Type 3 +</strong></p>
                                    <p style="color: #7f1d1d; font-size: 0.8em; margin-bottom: 8px;">Perineurium injury</p>
                                    <div style="background: white; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Myelin:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Axon:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Endoneurium:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Perineurium:</strong> ✗</p>
                                        <p style="color: #475569; font-size: 0.75em; margin: 0;"><strong>Epineurium:</strong> ✓</p>
                                    </div>
                                    <p style="color: #dc2626; font-size: 0.75em; font-weight: bold;">Poor recovery</p>
                                </div>

                                <!-- Type 5 -->
                                <div style="background: #fecaca; padding: 15px; border-radius: 8px; border: 2px solid #dc2626;">
                                    <h6 style="color: #7f1d1d; margin-bottom: 10px; font-weight: bold; font-size: 0.95em;">Type 5</h6>
                                    <p style="color: #450a0a; font-size: 0.85em; margin-bottom: 8px;"><strong>= Neurotmesis</strong></p>
                                    <p style="color: #450a0a; font-size: 0.8em; margin-bottom: 8px;">Complete transection</p>
                                    <div style="background: white; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Myelin:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Axon:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Endoneurium:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Perineurium:</strong> ✗</p>
                                        <p style="color: #dc2626; font-size: 0.75em; margin: 0;"><strong>Epineurium:</strong> ✗</p>
                                    </div>
                                    <p style="color: #7f1d1d; font-size: 0.75em; font-weight: bold;">No recovery w/o surgery</p>
                                </div>
                            </div>
                        </div>

                        <!-- Comprehensive Comparison Table -->
                        <div style="background: white; padding: 20px; border-radius: 10px; border: 2px solid #8b5cf6; margin-bottom: 25px;">
                            <h6 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.2em;">📊 Detailed Electrodiagnostic & Clinical Comparison</h6>
                            <div style="overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
                                    <thead>
                                        <tr style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff);">
                                            <th style="border: 2px solid #8b5cf6; padding: 10px; text-align: left; min-width: 120px;">Classification</th>
                                            <th style="border: 2px solid #8b5cf6; padding: 10px; text-align: left; min-width: 150px;">Etiology</th>
                                            <th style="border: 2px solid #8b5cf6; padding: 10px; text-align: left; min-width: 180px;">Pathophysiology</th>
                                            <th style="border: 2px solid #8b5cf6; padding: 10px; text-align: left; min-width: 180px;">NCS Findings</th>
                                            <th style="border: 2px solid #8b5cf6; padding: 10px; text-align: left; min-width: 150px;">EMG Findings</th>
                                            <th style="border: 2px solid #8b5cf6; padding: 10px; text-align: left; min-width: 120px;">Recovery</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="background: #fef2f2;">
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold;">Neurapraxia<br/>(Sunderland 1)</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Compression, ischemia, mild trauma</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Focal demyelination, axon intact, conduction block at lesion</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Normal distal to lesion, absent/reduced proximal to lesion, temporal dispersion</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Normal or decreased recruitment, no denervation</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; color: #059669; font-weight: bold;">Complete<br/>Days-weeks</td>
                                        </tr>
                                        <tr style="background: #fef3c7;">
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold;">Axonotmesis<br/>(Sunderland 2)</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Crush injury, severe compression</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Axonal interruption, Wallerian degeneration, endoneurial tubes intact</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Resembles neurapraxia 4-5 days, then amplitude drops as Wallerian degeneration occurs</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Fibrillations/PSWs after 2-3 weeks, reduced recruitment</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; color: #d97706; font-weight: bold;">Good<br/>Months (1mm/day)</td>
                                        </tr>
                                        <tr style="background: #fee2e2;">
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold;">Sunderland 3</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Severe crush, traction injury</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Axon + endoneurium disrupted, loss of guided regeneration</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Similar to axonotmesis, absent responses in severe cases</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Widespread denervation, poor reinnervation</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; color: #dc2626; font-weight: bold;">Variable<br/>Months-years</td>
                                        </tr>
                                        <tr style="background: #fecaca;">
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold;">Sunderland 4</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Severe traction, near-transection</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Axon + endoneurium + perineurium disrupted, fascicular architecture lost</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Absent responses, no recovery on serial studies</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Persistent denervation, no reinnervation</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; color: #7f1d1d; font-weight: bold;">Poor<br/>Surgery often needed</td>
                                        </tr>
                                        <tr style="background: #fee2e2;">
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: bold;">Neurotmesis<br/>(Sunderland 5)</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Complete transection, laceration</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Complete nerve disruption, all layers severed, neuroma formation</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Absent all responses, no improvement over time</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px;">Complete denervation, no spontaneous recovery</td>
                                            <td style="border: 1px solid #e5e7eb; padding: 10px; color: #450a0a; font-weight: bold;">None<br/>Surgery required</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Wallerian Degeneration Timeline -->
                        <div style="background: #faf5ff; padding: 20px; border-radius: 10px; border-left: 4px solid #8b5cf6;">
                            <h6 style="color: #6b21a8; margin-bottom: 15px; font-size: 1.1em;">⏳ Wallerian Degeneration & Recovery Timeline</h6>
                            <div style="color: #581c87; line-height: 1.6;">
                                <p style="margin-bottom: 10px;"><strong>Acute Phase (0-7 days):</strong> Axon degenerates distally, NCS may appear normal initially</p>
                                <p style="margin-bottom: 10px;"><strong>Subacute Phase (7-21 days):</strong> CMAP/SNAP amplitudes drop, fibrillations begin appearing on EMG (distal muscles first)</p>
                                <p style="margin-bottom: 10px;"><strong>Chronic Phase (>3 weeks):</strong> Complete denervation pattern, reinnervation potentials if recovery occurring</p>
                                <p style="margin-bottom: 10px;"><strong>Regeneration:</strong> Axons regenerate at ~1mm/day from injury site toward target. Proximal lesions take longer to recover.</p>
                                <p style="margin-top: 15px; padding: 12px; background: white; border-radius: 8px; font-weight: 600; color: #6b21a8;">
                                    💡 Clinical Pearl: Serial EMG studies every 3-4 weeks can track reinnervation progress by detecting nascent motor unit potentials.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- EDX Correlations Section -->
                <div id="patho-correlations-content" class="patho-content" style="display: none;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">📊 Electrodiagnostic Correlations</h5>

                        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #475569; margin-bottom: 25px;">
                            <h6 style="color: #334155; margin-bottom: 15px; font-size: 1.1em;">🔬 Volume Conduction Principles</h6>
                            <div style="color: #475569; line-height: 1.6;">
                                <p><strong>Near-field Potentials:</strong> Recorded close to source (NCS, EMG), amplitude depends on distance</p>
                                <p><strong>Triphasic Waveforms:</strong> Positive → Negative → Positive as action potential passes electrode</p>
                                <p><strong>Biphasic Waveforms:</strong> Initial negative deflection when depolarization starts under electrode</p>
                                <p><strong>Recording Principle:</strong> Intracellular events transmitted through tissue to surface electrodes</p>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #ef4444;">
                                <h6 style="color: #dc2626; margin-bottom: 15px; font-size: 1.1em;">🐌 Demyelinating Patterns</h6>
                                <div style="color: #7f1d1d; line-height: 1.5;">
                                    <p><strong>NCS Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Prolonged distal latencies (>125% normal)</li>
                                        <li>Slowed conduction velocities (<75% normal)</li>
                                        <li>Conduction blocks (>50% amplitude drop)</li>
                                        <li>Temporal dispersion (duration >130%)</li>
                                        <li>Prolonged F-waves and H-reflexes</li>
                                    </ul>
                                    <p><strong>EMG Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Normal or minimal denervation</li>
                                        <li>Large, polyphasic MUAPs</li>
                                        <li>Reduced recruitment</li>
                                    </ul>
                                </div>
                            </div>

                            <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1d4ed8; margin-bottom: 15px; font-size: 1.1em;">📉 Axonal Patterns</h6>
                                <div style="color: #1e3a8a; line-height: 1.5;">
                                    <p><strong>NCS Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Reduced CMAP/SNAP amplitudes</li>
                                        <li>Normal or mildly slow conduction velocities</li>
                                        <li>Normal distal latencies (if axons intact)</li>
                                        <li>Absent responses in severe cases</li>
                                        <li>Normal F-wave latencies</li>
                                    </ul>
                                    <p><strong>EMG Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Fibrillation potentials</li>
                                        <li>Positive sharp waves</li>
                                        <li>Reduced recruitment</li>
                                        <li>Large, long-duration MUAPs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; border: 2px solid #22c55e;">
                            <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🎯 Clinical Correlation Guidelines</h6>
                            <div style="color: #166534; line-height: 1.6;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div>
                                        <p style="font-weight: 600;">Severity Assessment:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li><strong>Mild:</strong> Prolonged latencies only</li>
                                            <li><strong>Moderate:</strong> Slowed CV + reduced amplitude</li>
                                            <li><strong>Severe:</strong> Absent responses + denervation</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p style="font-weight: 600;">Localization Principles:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li><strong>Focal:</strong> Localized slowing/block</li>
                                            <li><strong>Generalized:</strong> Diffuse abnormalities</li>
                                            <li><strong>Proximal:</strong> F-wave/H-reflex changes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fiber Classification Section -->
                <div id="patho-classification-content" class="patho-content" style="display: none;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">🧪 Nerve Fiber Classification & Clinical Relevance</h5>

                        <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; border-left: 4px solid #334155; margin-bottom: 25px;">
                            <h6 style="color: #1e293b; margin-bottom: 15px; font-size: 1.1em;">📊 Fiber Type Classification Table</h6>
                            <div style="overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
                                    <thead>
                                        <tr style="background: #334155; color: white;">
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Fiber Type</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Diameter (μm)</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">CV (m/s)</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Function</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Clinical Relevance</th>
                                        </tr>
                                    </thead>
                                    <tbody style="color: #374151; font-size: 0.85em;">
                                        <tr style="border-bottom: 1px solid #e5e7eb;">
                                            <td style="padding: 10px; font-weight: 600;">Aα (Ia)</td>
                                            <td style="padding: 10px;">12-21</td>
                                            <td style="padding: 10px;">80-120</td>
                                            <td style="padding: 10px;">Muscle spindle afferents</td>
                                            <td style="padding: 10px;">Mixed nerve studies, early compression</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
                                            <td style="padding: 10px; font-weight: 600;">Aβ</td>
                                            <td style="padding: 10px;">6-12</td>
                                            <td style="padding: 10px;">35-75</td>
                                            <td style="padding: 10px;">Motor efferents, touch, vibration</td>
                                            <td style="padding: 10px;">Standard NCS, most neuropathies</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb;">
                                            <td style="padding: 10px; font-weight: 600;">Aδ</td>
                                            <td style="padding: 10px;">1-5</td>
                                            <td style="padding: 10px;">5-30</td>
                                            <td style="padding: 10px;">Fast pain, temperature</td>
                                            <td style="padding: 10px;">Not recorded in routine NCS</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
                                            <td style="padding: 10px; font-weight: 600;">B</td>
                                            <td style="padding: 10px;">3</td>
                                            <td style="padding: 10px;">3-15</td>
                                            <td style="padding: 10px;">Preganglionic autonomic</td>
                                            <td style="padding: 10px;">Autonomic testing only</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb;">
                                            <td style="padding: 10px; font-weight: 600;">C</td>
                                            <td style="padding: 10px;">0.2-1.5</td>
                                            <td style="padding: 10px;">1-2</td>
                                            <td style="padding: 10px;">Slow pain, autonomics</td>
                                            <td style="padding: 10px;">Small fiber neuropathy</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #d97706; margin-bottom: 15px; font-size: 1.1em;">🎯 Large Fiber Neuropathies</h6>
                                <div style="color: #92400e; line-height: 1.5;">
                                    <p><strong>Fibers Affected:</strong> Aα, Aβ (large myelinated)</p>
                                    <p><strong>Clinical Features:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Weakness and muscle atrophy</li>
                                        <li>Loss of vibration and position sense</li>
                                        <li>Areflexia (lost tendon reflexes)</li>
                                        <li>Sensory ataxia</li>
                                    </ul>
                                    <p><strong>EDX Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Abnormal NCS parameters</li>
                                        <li>Denervation on EMG</li>
                                        <li>Absent/prolonged F-waves</li>
                                    </ul>
                                </div>
                            </div>

                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #ef4444;">
                                <h6 style="color: #dc2626; margin-bottom: 15px; font-size: 1.1em;">🔥 Small Fiber Neuropathies</h6>
                                <div style="color: #7f1d1d; line-height: 1.5;">
                                    <p><strong>Fibers Affected:</strong> Aδ, C (small unmyelinated)</p>
                                    <p><strong>Clinical Features:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Burning, shooting pain</li>
                                        <li>Loss of pain and temperature</li>
                                        <li>Autonomic dysfunction</li>
                                        <li>Preserved strength and reflexes</li>
                                    </ul>
                                    <p><strong>EDX Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Normal routine NCS</li>
                                        <li>Normal needle EMG</li>
                                        <li>Requires specialized testing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border: 2px solid #22c55e;">
                            <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🔑 Key Clinical Correlations</h6>
                            <div style="color: #166534; line-height: 1.6;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div>
                                        <p style="font-weight: 600;">Why Large Fibers Are Affected First:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Higher metabolic demands</li>
                                            <li>Longer axonal transport distances</li>
                                            <li>More susceptible to compression</li>
                                            <li>Greater myelin content</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p style="font-weight: 600;">Clinical Testing Implications:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Standard NCS tests large fibers only</li>
                                            <li>Normal NCS doesn't exclude neuropathy</li>
                                            <li>Small fiber testing requires special methods</li>
                                            <li>Symptom-EDX correlation essential</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Clinical Atlas Section -->
                <div id="patho-atlas-content" class="patho-content" style="display: none;">

            <!-- Common Peripheral Neuropathies Atlas -->
            <div style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #0ea5e9;">
                <h4 style="color: #0c4a6e; margin-bottom: 10px; font-size: 1.4em;">🗺️ Common Peripheral Neuropathies Atlas</h4>
                <p style="color: #0369a1; margin-bottom: 20px; font-style: italic;">Interactive guide to specific nerve entrapments and compression neuropathies</p>

                <!-- Nerve Type Selector -->
                <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 25px; justify-content: center;">
                    <button class="nerve-type-btn active" onclick="showNerveType('median')" data-nerve="median" style="
                        background: white;
                        border: 3px solid #3b82f6;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #1e40af;
                        font-size: 0.95em;
                    ">
                        🖐️ Median
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('ulnar')" data-nerve="ulnar" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        🤏 Ulnar
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('radial')" data-nerve="radial" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        👍 Radial
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('peroneal')" data-nerve="peroneal" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        🦶 Peroneal
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('tibial')" data-nerve="tibial" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        🦵 Tibial
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('overview')" data-nerve="overview" style="
                        background: #fef3c7;
                        border: 2px solid #f59e0b;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #d97706;
                        font-size: 0.95em;
                    ">
                        📊 Master Chart
                    </button>
                </div>

                <!-- Median Nerve Content -->
                <div id="median-content" class="nerve-content" style="display: block;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🖐️</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Median Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">C6-T1 • Lateral & Medial Cords • Precision Grip Master</p>
                    </div>

                    <!-- Nerve Selection -->
                    <div class="nerve-selector" style="margin-bottom: 25px;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                            <button class="nerve-nav-btn active" onclick="showMedianSection('carpal-tunnel')" data-section="carpal-tunnel" style="
                                background: white;
                                border: 3px solid #3b82f6;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">🖐️</span>
                                    <h5 style="color: #1e40af; margin: 0; font-size: 1.1em;">Carpal Tunnel Syndrome</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Most common entrapment - median nerve at wrist</p>
                            </button>

                            <button class="nerve-nav-btn" onclick="showMedianSection('proximal-median')" data-section="proximal-median" style="
                                background: #f8fafc;
                                border: 2px solid #e2e8f0;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">💪</span>
                                    <h5 style="color: #64748b; margin: 0; font-size: 1.1em;">Proximal Median Neuropathies</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Pronator syndrome, anterior interosseous syndrome</p>
                            </button>
                        </div>
                    </div>

                    <!-- Content Sections -->
                    <div id="carpal-tunnel" class="median-section" style="display: block;">
                        
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">🖐️ Carpal Tunnel Syndrome - Median Nerve at Wrist</h5>

            <!-- Anatomy Section -->
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Anatomy & Compression Site</h6>
                <ul style="color: #374151; line-height: 1.6; margin: 0;">
                    <li><strong>Location:</strong> Median nerve within carpal tunnel</li>
                    <li><strong>Boundaries:</strong> Carpal bones (floor/sides), transverse carpal ligament (roof)</li>
                    <li><strong>Contents:</strong> Median nerve + 9 flexor tendons</li>
                    <li><strong>Pathophysiology:</strong> Increased pressure → ischemia → demyelination</li>
                </ul>
            </div>

            <!-- Clinical Presentation -->
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #92400e; margin-bottom: 10px;">📋 Clinical Presentation</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Classic Symptoms:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Nocturnal paresthesias</li>
                            <li>Hand shaking relieves symptoms</li>
                            <li>Provoked by driving, phone use</li>
                            <li>Pain radiates to forearm</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Physical Signs:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Positive Phalen's sign</li>
                            <li>Weak thumb abduction</li>
                            <li>Thenar atrophy (severe cases)</li>
                            <li>Spared thenar sensation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- EDX Findings -->
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #065f46; margin-bottom: 10px;">⚡ Electrodiagnostic Findings</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">NCS Abnormalities:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li>Prolonged median distal motor latency</li>
                            <li>Prolonged median sensory latency</li>
                            <li>Reduced amplitudes (severe cases)</li>
                            <li>Abnormal comparison studies</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Sensitive Tests:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li>Median-ulnar palmar mixed</li>
                            <li>Median-ulnar digit 4 sensory</li>
                            <li>Lumbrical-interosseous motor</li>
                            <li>Segmental sensory studies</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Key Teaching Points -->
            <div style="background: #fdf2f8; padding: 15px; border-radius: 8px;">
                <h6 style="color: #be185d; margin-bottom: 10px;">💡 Key Teaching Points</h6>
                <div style="color: #831843; font-size: 0.9em; line-height: 1.6;">
                    <p style="margin-bottom: 8px;"><strong>🔑 Localization Key:</strong> Normal thenar sensation (palmar cutaneous branch spared)</p>
                    <p style="margin-bottom: 8px;"><strong>📊 EDX Strategy:</strong> Use comparison studies when routine tests normal</p>
                    <p style="margin-bottom: 8px;"><strong>⚠️ Pitfall:</strong> Forearm slowing in severe CTS doesn't indicate proximal lesion</p>
                    <p style="margin: 0;"><strong>🎯 Clinical Pearl:</strong> Symptoms worse at night and with sustained grip</p>
                </div>
            </div>
        </div>
    
                    </div>

                    <div id="proximal-median" class="median-section" style="display: none;">
                        
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">💪 Proximal Median Neuropathies</h5>

            <!-- Anatomical Overview -->
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Anatomical Compression Sites</h6>
                <div style="color: #374151; line-height: 1.6; margin: 0;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Four Major Sites:</p>
                            <ol style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                                <li><strong>Ligament of Struthers</strong> (rare)</li>
                                <li><strong>Lacertus fibrosus</strong></li>
                                <li><strong>Between pronator teres heads</strong></li>
                                <li><strong>Sublimis bridge (FDS arch)</strong></li>
                            </ol>
                        </div>
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Key Anatomical Points:</p>
                            <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                                <li>AIN branch given off 5-8cm distal to medial epicondyle</li>
                                <li>Palmar cutaneous branch proximal to carpal tunnel</li>
                                <li>Nerve travels with brachial artery</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ligament of Struthers -->
            <div style="background: #fefbeb; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                <h6 style="color: #92400e; margin-bottom: 10px;">⚠️ Ligament of Struthers Entrapment (Very Rare)</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Anatomy & Prevalence:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Supracondylar bony spur (1-2% population)</li>
                            <li>Tendinous band to medial epicondyle</li>
                            <li>Median nerve + brachial artery compressed</li>
                            <li>Visible on plain X-rays</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Clinical Features:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Volar forearm pain</li>
                            <li>Symptoms worse with supination + elbow extension</li>
                            <li>Radial pulse may be diminished</li>
                            <li>Palpable bony spur</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Pronator Syndrome -->
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #92400e; margin-bottom: 10px;">🔧 Pronator Syndrome (Most Common Proximal)</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Three Compression Sites:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li><strong>Lacertus fibrosus:</strong> From biceps to flexor muscles</li>
                            <li><strong>Pronator teres:</strong> Between muscle heads (most common)</li>
                            <li><strong>Sublimis bridge:</strong> FDS aponeurotic edge</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Clinical Presentation:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Vague forearm pain with activity</li>
                            <li>NOT worse at night (vs CTS)</li>
                            <li>Enlarged/firm pronator teres</li>
                            <li>Thenar numbness INCLUDED</li>
                        </ul>
                    </div>
                </div>

                <!-- Provocative Tests -->
                <div style="background: #fff8db; padding: 12px; border-radius: 6px; border: 1px solid #fbbf24;">
                    <p style="color: #92400e; font-weight: 600; margin-bottom: 8px;">🧪 Provocative Tests (Pain + Paresthesias):</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 0.85em;">
                        <div style="text-align: center; color: #78350f;">
                            <strong>Pronator Teres:</strong><br>
                            Resisted pronation with elbow extension
                        </div>
                        <div style="text-align: center; color: #78350f;">
                            <strong>Sublimis Bridge:</strong><br>
                            Resisted middle finger PIP flexion
                        </div>
                        <div style="text-align: center; color: #78350f;">
                            <strong>Lacertus Fibrosus:</strong><br>
                            Resisted elbow flexion in supination
                        </div>
                    </div>
                    <p style="color: #b45309; font-size: 0.8em; margin: 8px 0 0 0; font-style: italic;">⚠️ Note: Pain alone is unreliable unless accompanied by median paresthesias</p>
                </div>
            </div>

            <!-- AIN Syndrome -->
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #065f46; margin-bottom: 10px;">🎯 Anterior Interosseous Nerve (AIN) Syndrome</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Motor Loss Pattern:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li><strong>FPL:</strong> Thumb IP flexion weakness</li>
                            <li><strong>FDP (index/middle):</strong> DIP flexion loss</li>
                            <li><strong>Pronator quadratus:</strong> Weak pronation (elbow flexed)</li>
                            <li><strong>Pure motor</strong> - no sensory loss</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Clinical Signs:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li><strong>Abnormal "OK" sign:</strong> Cannot form circle</li>
                            <li>Compensatory hyperextension at IP joints</li>
                            <li>No sensory symptoms/signs</li>
                            <li>Often follows trauma or part of brachial neuritis</li>
                        </ul>
                    </div>
                </div>

                <!-- Special Considerations -->
                <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; border: 1px solid #22c55e;">
                    <p style="color: #065f46; font-weight: 600; margin-bottom: 8px;">⚠️ Special Considerations:</p>
                    <ul style="color: #14532d; font-size: 0.9em; margin: 0;">
                        <li><strong>Anatomical variant:</strong> Some patients have ulnar innervation to FDP digit 3</li>
                        <li><strong>Martin-Gruber anastomosis:</strong> Can cause ulnar hand muscle weakness with AIN</li>
                        <li><strong>Associated with brachial neuritis</strong> more often than true entrapment</li>
                    </ul>
                </div>
            </div>

            <!-- EDX Findings -->
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #6366f1;">
                <h6 style="color: #4f46e5; margin-bottom: 10px;">⚡ Electrodiagnostic Patterns</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #3730a3; font-weight: 500; margin-bottom: 5px;">NCS Findings:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li>Reduced CMAP/SNAP amplitudes</li>
                            <li>Normal/slightly prolonged distal latencies</li>
                            <li>Slow forearm conduction velocity</li>
                            <li>Normal median-ulnar comparison studies</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #3730a3; font-weight: 500; margin-bottom: 5px;">EMG Key Findings:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li><strong>Most important:</strong> Proximal median muscle denervation</li>
                            <li>PT, FCR, FDS, FPL abnormalities</li>
                            <li>Normal non-median C6-C7 muscles</li>
                            <li>AIN: Isolated FPL, FDP (2,3), PQ changes</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Differential Diagnosis -->
            <div style="background: #fdf2f8; padding: 15px; border-radius: 8px;">
                <h6 style="color: #be185d; margin-bottom: 10px;">🔍 Differential Diagnosis</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">vs Carpal Tunnel:</p>
                        <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0;">
                            <li><strong>Thenar sensation:</strong> Affected in proximal (spared in CTS)</li>
                            <li><strong>Timing:</strong> Not worse at night</li>
                            <li><strong>Proximal muscles:</strong> Involved in proximal lesions</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">vs C6/C7 Radiculopathy:</p>
                        <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0;">
                            <li><strong>Neck pain:</strong> Absent in median neuropathy</li>
                            <li><strong>Reflexes:</strong> Normal in isolated median lesions</li>
                            <li><strong>Distribution:</strong> Pure median territory</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
                    </div>

                    <!-- Comparison Table for Median Nerve Lesions -->
                    <div style="background: white; padding: 20px; border-radius: 15px; margin-top: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h3 style="color: #1e40af; margin-bottom: 15px; display: flex; align-items: center;">
                            <span style="font-size: 24px; margin-right: 10px;">📊</span>
                            Quick Comparison: Median Nerve Lesions
                        </h3>
                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                <thead>
                                    <tr style="background: linear-gradient(135deg, #dbeafe, #bfdbfe);">
                                        <th style="border: 2px solid #3b82f6; padding: 10px; text-align: center;">Location</th>
                                        <th style="border: 2px solid #3b82f6; padding: 10px; text-align: center;">Motor Loss</th>
                                        <th style="border: 2px solid #3b82f6; padding: 10px; text-align: center;">Sensory Loss</th>
                                        <th style="border: 2px solid #3b82f6; padding: 10px; text-align: center;">Key EDX Finding</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background: #f8f9fa;">
                                        <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold;">Carpal Tunnel</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">APB, OP, FPB (superficial), lumbricals 1&2</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">Thumb, index, middle, lateral ring</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">Prolonged distal latencies</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold;">Pronator Syndrome</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">Same as CTS + proximal muscles</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">Same as CTS + thenar eminence</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">Slow forearm conduction</td>
                                    </tr>
                                    <tr style="background: #f8f9fa;">
                                        <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold;">AIN Syndrome</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">FPL, FDP (index/middle), PQ</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">None (pure motor)</td>
                                        <td style="border: 1px solid #dee2e6; padding: 10px;">Denervation in specific muscles</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Ulnar Nerve Content -->
                <div id="ulnar-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🤏</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Ulnar Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">C8-T1 • Medial Cord • Grip Strength & Fine Motor Control</p>
                    </div>

                    <!-- Ulnar Nerve Selection -->
                    <div class="nerve-selector" style="margin-bottom: 25px;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                            <button class="nerve-nav-btn active" onclick="showUlnarSection('ulnar-elbow')" data-section="ulnar-elbow" style="
                                background: white;
                                border: 3px solid #3b82f6;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">🤏</span>
                                    <h5 style="color: #1e40af; margin: 0; font-size: 1.1em;">Ulnar Neuropathy at Elbow (UNE)</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Most common ulnar entrapment - cubital tunnel syndrome</p>
                            </button>

                            <button class="nerve-nav-btn" onclick="showUlnarSection('ulnar-wrist')" data-section="ulnar-wrist" style="
                                background: #f8fafc;
                                border: 2px solid #e2e8f0;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">✋</span>
                                    <h5 style="color: #64748b; margin: 0; font-size: 1.1em;">Ulnar Neuropathy at Wrist (UNW)</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Guyon's canal syndrome and ulnar tunnel syndrome</p>
                            </button>
                        </div>
                    </div>

                    <!-- Ulnar Content Sections -->
                    <div id="ulnar-elbow" class="ulnar-section" style="display: block;">
                        
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">🤏 Ulnar Neuropathy at Elbow (UNE)</h5>

            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Cubital Tunnel Anatomy</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Compression Sites:</p>
                        <ol style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                            <li><strong>Arcade of Struthers</strong> (proximal)</li>
                            <li><strong>Medial intermuscular septum</strong></li>
                            <li><strong>Cubital tunnel</strong> (most common)</li>
                            <li><strong>Aponeurosis between FCU heads</strong></li>
                        </ol>
                    </div>
                    <div>
                        <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Key Anatomy:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li>Ulnar groove behind medial epicondyle</li>
                            <li>Osborne's band (roof of cubital tunnel)</li>
                            <li>MCL forms floor of tunnel</li>
                            <li>Most vulnerable with elbow flexion</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #92400e; margin-bottom: 10px;">🎯 Clinical Presentation</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Sensory Symptoms:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Medial forearm pain</li>
                            <li>Ring & little finger numbness</li>
                            <li>Worse with prolonged elbow flexion</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Motor Signs:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li><strong>Early:</strong> Weak pinch, grip strength</li>
                            <li><strong>Late:</strong> Visible muscle atrophy</li>
                            <li>Froment's sign (FPL compensation)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #065f46; margin-bottom: 10px;">⚡ EDX Findings</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">NCS Key Findings:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li>Slow conduction across elbow segment</li>
                            <li>Normal distal ulnar motor/sensory</li>
                            <li>Conduction block possible</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">EMG Patterns:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li><strong>FCU involvement:</strong> Proximal lesion</li>
                            <li><strong>FCU sparing:</strong> Distal lesion</li>
                            <li>Hand muscle denervation (FDI primary)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
                    </div>

                    <div id="ulnar-wrist" class="ulnar-section" style="display: none;">
                        
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">✋ Ulnar Neuropathy at Wrist (UNW)</h5>

            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Guyon's Canal Anatomy</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Canal Boundaries:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li><strong>Radial:</strong> Hook of hamate</li>
                            <li><strong>Ulnar:</strong> Pisiform bone</li>
                            <li><strong>Floor:</strong> Transverse carpal ligament</li>
                            <li><strong>Roof:</strong> Volar carpal ligament</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Three Zones:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li><strong>Zone 1:</strong> Mixed nerve compression</li>
                            <li><strong>Zone 2:</strong> Deep motor branch</li>
                            <li><strong>Zone 3:</strong> Superficial sensory branch</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #92400e; margin-bottom: 10px;">🎯 Clinical Presentations by Zone</h6>
                <div style="background: #fff8db; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #f59e0b;">
                    <strong style="color: #92400e;">Zone 1:</strong> Motor + sensory loss (all ulnar hand muscles + ring/little finger)
                </div>
                <div style="background: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #ef4444;">
                    <strong style="color: #dc2626;">Zone 2:</strong> Pure motor - hand weakness only, normal sensation
                </div>
                <div style="background: #f0f9ff; padding: 12px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                    <strong style="color: #2563eb;">Zone 3:</strong> Pure sensory loss only, normal strength
                </div>
            </div>

            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #065f46; margin-bottom: 10px;">🔑 Key Differentiating Features from UNE</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Preserved Functions:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li><strong>FCU:</strong> Normal strength</li>
                            <li><strong>FDP (ring/little):</strong> Normal</li>
                            <li><strong>Dorsal hand sensation:</strong> Normal</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Common Causes:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li>Hook of hamate fracture</li>
                            <li>Cyclist's palsy</li>
                            <li>Ganglion cysts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    
                    </div>
                </div>

                <!-- Radial Nerve Content -->
                <div id="radial-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">👍</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Radial Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">C5-T1 • Posterior Cord • Extension Powerhouse</p>
                    </div>

                    <!-- Spiral Groove Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fee2e2; padding: 8px; border-radius: 50%; margin-right: 12px;">💥</span>
                            Spiral Groove Syndrome ("Saturday Night Palsy")
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">🎯 Anatomy & Vulnerability</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Radial nerve travels in <strong>spiral groove</strong> of mid-humerus</li>
                                    <li>Nerve lies directly against bone with minimal protection</li>
                                    <li>Most common site of radial nerve injury</li>
                                    <li>Vulnerable to compression, trauma, and fractures</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">⚡ Common Causes</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Humeral fractures</strong> (most serious)</li>
                                    <li><strong>Prolonged compression</strong> (arm over chair)</li>
                                    <li><strong>Crutch palsy</strong> (improper use)</li>
                                    <li><strong>Surgical positioning</strong> injury</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 1em;">🔍 Classic Clinical Presentation</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #7f1d1d; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Motor Signs:</p>
                                    <ul style="color: #7f1d1d; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Wrist drop</strong> (cannot extend wrist)</li>
                                        <li>Weak finger extension at MCPs</li>
                                        <li>Weak thumb extension/abduction</li>
                                        <li>Triceps usually SPARED (branches proximal)</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #7f1d1d; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Sensory Loss:</p>
                                    <ul style="color: #7f1d1d; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>First web space</strong> (dorsal)</li>
                                        <li>Dorsal hand between thumb/index</li>
                                        <li>Variable extent (often minimal)</li>
                                        <li>Preserved palmar sensation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">📊 Electrodiagnostic Findings</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">NCS Findings:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Low/absent radial CMAP (spiral groove stimulation)</li>
                                        <li>Normal radial SNAP (lesion proximal to DRG)</li>
                                        <li>Normal median/ulnar studies</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">EMG Pattern:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Denervation in extensor muscles</li>
                                        <li>Triceps typically normal</li>
                                        <li>Brachioradialis affected</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Posterior Interosseous Nerve (PIN) Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #059669; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #d1fae5; padding: 8px; border-radius: 50%; margin-right: 12px;">🎯</span>
                            Posterior Interosseous Nerve (PIN) Syndrome
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #065f46; margin-bottom: 12px; font-size: 1.1em;">📍 Anatomy & Location</h5>
                                <ul style="color: #064e3b; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>PIN = deep motor branch of radial nerve</li>
                                    <li>Passes through <strong>supinator muscle</strong></li>
                                    <li>Compression at <strong>arcade of Frohse</strong></li>
                                    <li>Purely motor - no sensory involvement</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #065f46; margin-bottom: 12px; font-size: 1.1em;">⚡ Causes</h5>
                                <ul style="color: #064e3b; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Repetitive supination</strong></li>
                                    <li>Rheumatoid synovitis</li>
                                    <li>Space-occupying lesions</li>
                                    <li>Trauma/fractures</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #059669; margin-bottom: 10px; font-size: 1em;">🔍 Clinical Features</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Key Motor Signs:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Finger drop</strong> (weak MCP extension)</li>
                                        <li>Weak thumb extension/abduction</li>
                                        <li><strong>Wrist extension PRESERVED</strong></li>
                                        <li>ECRL/ECRB normal (branch proximal)</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Distinguishing Features:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>NO sensory loss</strong></li>
                                        <li>NO wrist drop</li>
                                        <li>Normal brachioradialis</li>
                                        <li>May have forearm pain</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">📊 Electrodiagnostic Pattern</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">NCS:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>All sensory studies normal</li>
                                        <li>Radial motor to ECRB normal</li>
                                        <li>PIN motor responses reduced</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">EMG:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Denervation in PIN-innervated muscles</li>
                                        <li>ECRB/ECRL spared</li>
                                        <li>Brachioradialis normal</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Differential Diagnosis -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">🤔</span>
                            Differential Diagnosis
                        </h4>

                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                <thead>
                                    <tr style="background: #f3f4f6;">
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Condition</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Wrist Extension</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Finger Extension</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sensory Loss</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Triceps</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #dc2626;">Spiral Groove</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak (wrist drop)</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">First web space</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Normal</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">PIN Syndrome</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>None</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #7c2d12;">C7 Radiculopathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">C7 dermatome</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;"><strong>Weak</strong></td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #1d4ed8;">Axillary Level</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">First web + forearm</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;"><strong>Weak</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Clinical Pearls -->
                    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #78350f; padding: 20px; border-radius: 15px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; color: #78350f; font-size: 1.3em;">
                            <span style="margin-right: 10px;">💎</span>
                            Clinical Pearls
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Saturday night palsy:</strong> Classic spiral groove injury from prolonged arm compression</li>
                                    <li><strong>Wrist drop</strong> = spiral groove lesion until proven otherwise</li>
                                    <li><strong>PIN syndrome:</strong> Finger drop WITHOUT wrist drop</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Humeral fractures:</strong> Always consider radial nerve injury</li>
                                    <li><strong>Normal radial SNAP</strong> in spiral groove lesions (proximal to DRG)</li>
                                    <li><strong>Triceps involvement</strong> suggests axillary or very proximal lesion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Peroneal Nerve Content -->
                <div id="peroneal-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🦶</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Peroneal/Fibular Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">L4-S1 • Sciatic Division • Foot Drop Expert</p>
                    </div>

                    <!-- Common Peroneal Neuropathy at Fibular Neck -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fee2e2; padding: 8px; border-radius: 50%; margin-right: 12px;">⚡</span>
                            Common Peroneal Neuropathy at Fibular Neck
                        </h4>

                        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 1em;">📍 Most Common Lower Extremity Mononeuropathy</h6>
                            <p style="color: #7f1d1d; margin: 0; font-size: 0.9em; line-height: 1.5;">
                                <strong>Both names are commonly used:</strong> "Peroneal" (traditional) and "Fibular" (modern anatomical terminology).
                                The nerve is most vulnerable at the fibular neck where it's superficial and lies directly against bone.
                            </p>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">🎯 Anatomy & Vulnerability</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Nerve winds around <strong>fibular neck</strong></li>
                                    <li>Passes through <strong>fibular tunnel</strong> (peroneus longus)</li>
                                    <li>Most superficial and vulnerable location</li>
                                    <li>Deep branch fibers lie closest to fibula</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">⚡ Common Causes</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Prolonged positioning</strong> (anesthesia)</li>
                                    <li><strong>Habitual leg crossing</strong></li>
                                    <li><strong>Trauma & fractures</strong></li>
                                    <li><strong>Weight loss</strong> (loss of protective fat)</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; border-left: 4px solid #1e40af; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">🔍 Classic Clinical Presentation: "Foot Drop"</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Motor Signs:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Foot drop</strong> (weak dorsiflexion)</li>
                                        <li>Weak toe extension</li>
                                        <li>Weak foot eversion</li>
                                        <li><strong>Steppage gait</strong> pattern</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Sensory Loss:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Dorsum of foot</strong></li>
                                        <li>Lateral calf (mid to lower)</li>
                                        <li>First web space</li>
                                        <li>Preserved lateral foot (sural)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #059669; margin-bottom: 10px; font-size: 1em;">📊 Key Diagnostic Features</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Preserved Functions:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Ankle inversion</strong> (tibialis posterior)</li>
                                        <li>Normal ankle reflex</li>
                                        <li>Plantar flexion intact</li>
                                        <li>Knee flexion normal</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Clinical Signs:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Tinel's sign at fibular neck</li>
                                        <li>Increased ankle sprains</li>
                                        <li>Tripping on uneven surfaces</li>
                                        <li>Foot slapping when walking</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Anterior Tarsal Tunnel Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">🦶</span>
                            Anterior Tarsal Tunnel Syndrome (ATTS)
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">📍 Deep Peroneal at Ankle</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Compression under <strong>inferior extensor retinaculum</strong></li>
                                    <li>Rare entrapment neuropathy</li>
                                    <li>Affects extensor digitorum brevis</li>
                                    <li>Pure motor involvement</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">⚡ Causes</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Tight shoes</strong> (especially dancers)</li>
                                    <li>Trauma to anterior ankle</li>
                                    <li>Ganglion cysts</li>
                                    <li>Pes cavus deformity</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #92400e; margin-bottom: 10px; font-size: 1em;">🔍 Clinical Features</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #78350f; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Symptoms:</p>
                                    <ul style="color: #78350f; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Foot pain and paresthesias</li>
                                        <li>Dorsal foot discomfort</li>
                                        <li>Pain worse with plantar flexion</li>
                                        <li>Relief with dorsiflexion</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #78350f; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Signs:</p>
                                    <ul style="color: #78350f; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>EDB weakness/atrophy</li>
                                        <li>Sensory loss: first web space</li>
                                        <li>Tinel's sign at anterior ankle</li>
                                        <li>Normal foot dorsiflexion</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Differential Diagnosis -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #1d4ed8; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #dbeafe; padding: 8px; border-radius: 50%; margin-right: 12px;">🤔</span>
                            Differential Diagnosis of Foot Drop
                        </h4>

                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                <thead>
                                    <tr style="background: #f3f4f6;">
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Condition</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Dorsiflexion</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Eversion</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Inversion</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Ankle Reflex</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sensory Pattern</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #dc2626;">Common Peroneal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Dorsal foot, lateral calf</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #7c2d12;">Deep Peroneal Only</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">First web space only</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">Sciatic Nerve</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Weak</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Absent</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Dorsal + plantar foot</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #1d4ed8;">L5 Radiculopathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;"><strong>Weak</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Normal*</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">L5 dermatome</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px; margin-bottom: 0;">
                                *May be reduced if S1 also involved
                            </p>
                        </div>
                    </div>

                    <!-- Electrodiagnostic Patterns -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">📊</span>
                            Electrodiagnostic Patterns
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">🔬 Nerve Conduction Studies</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Peroneal motor:</strong> Record EDB & TA</li>
                                    <li><strong>Conduction block</strong> across fibular neck</li>
                                    <li><strong>Superficial peroneal sensory</strong> abnormal</li>
                                    <li>Normal tibial motor and sural sensory</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">⚡ EMG Findings</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Denervation:</strong> TA, EHL, peroneus longus</li>
                                    <li><strong>Normal:</strong> Tibialis posterior</li>
                                    <li><strong>Normal:</strong> Short head biceps femoris</li>
                                    <li>Normal paraspinal muscles</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Clinical Pearls -->
                    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #78350f; padding: 20px; border-radius: 15px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; color: #78350f; font-size: 1.3em;">
                            <span style="margin-right: 10px;">💎</span>
                            Clinical Pearls
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Both names valid:</strong> Peroneal (traditional) = Fibular (modern)</li>
                                    <li><strong>Most common</strong> lower extremity mononeuropathy</li>
                                    <li><strong>Fibular neck:</strong> Most vulnerable location</li>
                                    <li><strong>Preserved inversion</strong> = key differentiating feature</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Recording TA</strong> more sensitive than EDB</li>
                                    <li><strong>Weight loss patients</strong> at higher risk</li>
                                    <li><strong>Normal radial SNAP</strong> in fibular neck lesions</li>
                                    <li><strong>EDB reinnervation</strong> common in normals</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tibial Nerve Content -->
                <div id="tibial-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #7c2d12 0%, #dc2626 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🦵</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Tibial Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">L4-S3 • Sciatic Division • Plantar Flexion Master</p>
                    </div>

                    <!-- Tarsal Tunnel Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fee2e2; padding: 8px; border-radius: 50%; margin-right: 12px;">🔒</span>
                            Tarsal Tunnel Syndrome (TTS)
                        </h4>

                        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 1em;">⚠️ Important Clinical Reality</h6>
                            <p style="color: #7f1d1d; margin: 0; font-size: 0.9em; line-height: 1.5;">
                                <strong>Unlike carpal tunnel syndrome, TTS is exceptionally rare.</strong> Most patients referred for "TTS" have either
                                normal studies (orthopedic problems) or mild distal polyneuropathy. True TTS requires careful electrodiagnostic confirmation.
                            </p>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">📍 Anatomy & Location</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Tibial nerve passes under <strong>flexor retinaculum</strong></li>
                                    <li>Travels through <strong>tarsal tunnel</strong> at medial ankle</li>
                                    <li>Divides into medial/lateral plantar nerves</li>
                                    <li>Also gives off calcaneal sensory branches</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">⚡ Causes</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Trauma</strong> (sprains, fractures)</li>
                                    <li><strong>Mass lesions</strong> (ganglions, lipomas)</li>
                                    <li>Degenerative bone/tissue disorders</li>
                                    <li>Varicosities (rare)</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; border-left: 4px solid #1e40af; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">🔍 Clinical Presentation</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Primary Symptoms:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Perimalleolar pain</strong> (burning)</li>
                                        <li>Worse with weight bearing</li>
                                        <li>Often worse at night</li>
                                        <li>Sole paresthesias</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Preserved Functions:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Normal ankle reflex</strong></li>
                                        <li>Normal lateral foot sensation (sural)</li>
                                        <li>Normal dorsal foot sensation</li>
                                        <li>Normal long flexors/extensors</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #059669; margin-bottom: 10px; font-size: 1em;">🎯 Sensory Distribution</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Medial Plantar Nerve:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Medial sole of foot</li>
                                        <li>Great toe + 2nd, 3rd toes</li>
                                        <li>Medial half of 4th toe</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Lateral Plantar Nerve:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Lateral sole of foot</li>
                                        <li>5th toe</li>
                                        <li>Lateral half of 4th toe</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Electrodiagnostic Challenges -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">⚠️</span>
                            Electrodiagnostic Challenges
                        </h4>

                        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #92400e; margin-bottom: 10px; font-size: 1em;">🚨 Technical Difficulties</h6>
                            <ul style="color: #78350f; font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                <li><strong>Plantar responses are extremely small</strong> - often require averaging</li>
                                <li><strong>May be absent in normal subjects</strong> - especially older patients</li>
                                <li><strong>Temperature sensitive</strong> - most distal nerve in lower extremity</li>
                                <li><strong>Side-to-side comparison essential</strong> - absolute values unreliable</li>
                            </ul>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">🔬 Required Studies</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Bilateral tibial motor</strong> to AHB & ADQP</li>
                                    <li><strong>Plantar mixed responses</strong> (medial & lateral)</li>
                                    <li><strong>Routine tibial/peroneal</strong> studies</li>
                                    <li><strong>Sural sensory</strong> (exclude polyneuropathy)</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">⚡ EMG Limitations</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Intrinsic foot muscles painful</strong> to examine</li>
                                    <li><strong>Difficult to activate</strong> muscles</li>
                                    <li><strong>"Normal abnormalities"</strong> common</li>
                                    <li><strong>Requires bilateral comparison</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Differential Diagnosis -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #1d4ed8; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #dbeafe; padding: 8px; border-radius: 50%; margin-right: 12px;">🤔</span>
                            Differential Diagnosis
                        </h4>

                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                <thead>
                                    <tr style="background: #f3f4f6;">
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Condition</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sole Sensation</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Lateral Foot</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Ankle Reflex</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sural Response</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #dc2626;">Tarsal Tunnel</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Normal</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">Polyneuropathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Abnormal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">May be reduced</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Abnormal</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #7c2d12;">Proximal Tibial</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;"><strong>Abnormal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #1d4ed8;">S1 Radiculopathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">May be abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;"><strong>Abnormal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Normal</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">Orthopedic</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Diagnostic Strategy -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #059669; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #d1fae5; padding: 8px; border-radius: 50%; margin-right: 12px;">📋</span>
                            Diagnostic Strategy
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                                <h5 style="color: #1e40af; margin-bottom: 12px; font-size: 1.1em;">✅ Criteria for TTS</h5>
                                <ul style="color: #1e3a8a; font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Asymmetric plantar responses</strong> (>50% difference)</li>
                                    <li><strong>Prolonged distal latencies</strong></li>
                                    <li><strong>Normal sural response</strong></li>
                                    <li><strong>Clinical correlation</strong> essential</li>
                                </ul>
                            </div>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px;">
                                <h5 style="color: #dc2626; margin-bottom: 12px; font-size: 1.1em;">❌ Red Flags</h5>
                                <ul style="color: #7f1d1d; font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Abnormal sural</strong> → polyneuropathy</li>
                                    <li><strong>Bilateral absent plantar</strong> → normal variant</li>
                                    <li><strong>Abnormal ankle reflex</strong> → proximal lesion</li>
                                    <li><strong>Normal studies</strong> → orthopedic problem</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Clinical Pearls -->
                    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #78350f; padding: 20px; border-radius: 15px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; color: #78350f; font-size: 1.3em;">
                            <span style="margin-right: 10px;">💎</span>
                            Clinical Pearls
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>TTS is exceptionally rare</strong> - unlike carpal tunnel syndrome</li>
                                    <li><strong>Most "TTS" referrals</strong> are polyneuropathy or orthopedic</li>
                                    <li><strong>Side-to-side comparison</strong> absolutely essential</li>
                                    <li><strong>Normal ankle reflex</strong> key differentiating feature</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Plantar responses difficult</strong> - often need averaging</li>
                                    <li><strong>Intrinsic foot EMG</strong> frequently shows "normal abnormalities"</li>
                                    <li><strong>Temperature affects</strong> plantar nerve conduction</li>
                                    <li><strong>Clinical correlation critical</strong> for diagnosis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Master Overview Chart -->
                <div id="overview-content" class="nerve-content" style="display: none;">
                    
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.3em;">📊 Master Peripheral Nerve Pathophysiology Chart</h5>

            <!-- Introduction -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <p style="color: #92400e; font-weight: 500; margin: 0; font-size: 1.05em;">
                    🎯 Comprehensive comparison of all major peripheral nerve entrapments and their clinical patterns
                </p>
            </div>

            <!-- Comprehensive Comparison Table -->
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white;">
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Nerve</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Entrapment Site</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Motor Loss</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Sensory Loss</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Key EDX Finding</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Classic Sign</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Median Nerve Group -->
                        <tr style="background: #f0fdf4;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #065f46;">🖐️ Median</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #047857;"><strong>Carpal Tunnel</strong></td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">APB, OP, FPB, Lumb 1&2</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Thumb, index, middle, lateral ring</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Prolonged distal latencies</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Nocturnal symptoms, Phalen's</td>
                        </tr>
                        <tr style="background: #f8f9fa;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #065f46;">🖐️ Median</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #047857;"><strong>Pronator Syndrome</strong></td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">CTS muscles + proximal</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">CTS + thenar eminence</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Slow forearm conduction</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Activity-related, not nocturnal</td>
                        </tr>
                        <tr style="background: #f0fdf4;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #065f46;">🖐️ Median</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #047857;"><strong>AIN Syndrome</strong></td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">FPL, FDP (2,3), PQ</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">None (pure motor)</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Isolated muscle denervation</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Abnormal "OK" sign</td>
                        </tr>

                        <!-- Ulnar Nerve Group -->
                        <tr style="background: #fef3c7;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #92400e;">🤏 Ulnar</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #78350f;"><strong>Cubital Tunnel (UNE)</strong></td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">FCU, FDP (4,5), hand intrinsics</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">Ring, little finger + dorsal hand</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">Slow conduction across elbow</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">Froment's sign, Wartenberg's</td>
                        </tr>
                        <tr style="background: #fff8db;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #92400e;">🤏 Ulnar</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #78350f;"><strong>Guyon's Canal (UNW)</strong></td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">Hand intrinsics only</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">Variable (by zone)</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">Normal elbow conduction</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #451a03;">No forearm involvement</td>
                        </tr>

                        <!-- Radial Nerve Group -->
                        <tr style="background: #f0f9ff;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #1d4ed8;">👍 Radial</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #2563eb;"><strong>Spiral Groove</strong> • PIN Syndrome</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #1e3a8a;">Extensors, wrist drop</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #1e3a8a;">First web space</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #1e3a8a;">Conduction block at spiral groove</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #1e3a8a;">Saturday night palsy</td>
                        </tr>

                        <!-- Lower Extremity Nerves -->
                        <tr style="background: #fef2f2;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #dc2626;">🦶 Peroneal</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #991b1b;"><strong>Fibular Head</strong> • Anterior Tarsal Tunnel</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #7f1d1d;">Dorsiflexors, foot drop</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #7f1d1d;">Dorsal foot</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #7f1d1d;">Conduction block at fibular head</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #7f1d1d;">Foot drop, steppage gait</td>
                        </tr>

                        <tr style="background: #f3e8ff;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #7c3aed;">🦵 Tibial</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #6d28d9;"><strong>Tarsal Tunnel Syndrome</strong></td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #553c9a;">Intrinsic foot muscles</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #553c9a;">Plantar foot</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #553c9a;">Prolonged tibial distal latency</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #553c9a;">Burning plantar pain</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Quick Reference Tips -->
            <div style="margin-top: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <h6 style="color: #065f46; margin-bottom: 10px;">🔑 Localization Keys</h6>
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                        <li><strong>Sensory sparing:</strong> Look for pure motor syndromes</li>
                        <li><strong>Timing patterns:</strong> Nocturnal vs activity-related</li>
                        <li><strong>Muscle combinations:</strong> Which muscles group together</li>
                        <li><strong>Provocative tests:</strong> Specific anatomical stresses</li>
                    </ul>
                </div>
                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
                    <h6 style="color: #991b1b; margin-bottom: 10px;">⚠️ Common Pitfalls</h6>
                    <ul style="color: #7f1d1d; font-size: 0.9em; margin: 0;">
                        <li><strong>Anatomical variants:</strong> Martin-Gruber, Riche-Cannieu</li>
                        <li><strong>Double crush:</strong> Multiple compression sites</li>
                        <li><strong>Clinical vs electrical:</strong> Don't ignore clinical findings</li>
                        <li><strong>Severity grading:</strong> Correlate with functional impact</li>
                    </ul>
                </div>
            </div>

            <!-- Status Update -->
            <div style="margin-top: 20px; background: #f0f9ff; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="color: #3730a3; font-weight: 500; margin: 0;">
                    📚 <strong>System Status:</strong> Median, Ulnar, Radial, Peroneal/Fibular & Tibial content complete - comprehensive clinical protocols ready.
                </p>
            </div>

            <!-- Quiz Section -->
            ${typeof window.generateModuleQuiz === 'function' ? window.generateModuleQuiz(JSON.parse('[{"question":"Which Sunderland classification corresponds to &#39;Neurapraxia&#39;?","options":["Type 1","Type 2","Type 3","Type 5"],"correct":0,"explanation":"Sunderland Type 1 corresponds to NEURAPRAXIA (Seddon classification). It involves a focal conduction block (often due to focal demyelination) with NO axonal loss. The prognosis is excellent, with recovery typically occurring in days to weeks."},{"question":"What is the primary electrodiagnostic finding in a pure demyelinating neuropathy?","options":["Reduced CMAP amplitude with normal velocity","Fibrillation potentials on EMG","Slowed conduction velocity and prolonged distal latency","Absent sensory responses with normal motor responses"],"correct":2,"explanation":"DEMYELINATING neuropathies are characterized by SLOWED CONDUCTION VELOCITY (<75% of lower limit of normal) and PROLONGED DISTAL LATENCIES (>125% of upper limit of normal). This reflects the loss of the myelin sheath, which is responsible for fast saltatory conduction."},{"question":"In Wallerian degeneration, when do fibrillation potentials typically first appear on EMG in distal muscles?","options":["Immediately (0-24 hours)","2-3 days","2-3 weeks","3-6 months"],"correct":2,"explanation":"Fibrillation potentials (a sign of membrane instability due to denervation) typically take 2-3 WEEKS to appear in distal muscles following nerve injury. They appear sooner in proximal muscles (paraspinals: 7-10 days) and later in distal muscles due to the length-dependent nature of Wallerian degeneration."},{"question":"Which finding distinguishes an axonal neuropathy from a demyelinating one?","options":["Reduced recruitment","Reduced CMAP/SNAP amplitudes with relatively preserved velocities","Conduction block","Temporal dispersion"],"correct":1,"explanation":"AXONAL neuropathies are characterized by REDUCED AMPLITUDES (reflecting axon loss) with relatively PRESERVED CONDUCTION VELOCITIES (usually >75% of normal, as surviving axons conduct normally). Conduction block and temporal dispersion are hallmarks of acquired demyelination."},{"question":"What is the approximate rate of axonal regeneration?","options":["1 mm/day (1 inch/month)","1 cm/day","10 mm/day","It varies widely and cannot be estimated"],"correct":0,"explanation":"Peripheral nerves regenerate at a rate of approximately 1 MM/DAY (or roughly 1 inch per month). This rule of thumb is crucial for estimating recovery time based on the distance from the lesion site to the target muscle."},{"question":"Which nerve fibers are primarily assessed during routine Nerve Conduction Studies (NCS)?","options":["Small unmyelinated C fibers (pain/temp)","Large myelinated A-beta fibers","Autonomic B fibers","A-delta fibers"],"correct":1,"explanation":"Routine NCS assess only the LARGE MYELINATED A-BETA FIBERS (motor and sensory). Small fibers (A-delta and C fibers), which carry pain and temperature sensation and autonomic functions, are NOT assessed by standard NCS and require specialized testing (e.g., skin biopsy, autonomic testing)."},{"question":"A &#39;Saturday Night Palsy&#39; typically involves compression of which nerve and at what location?","options":["Median nerve at the wrist","Ulnar nerve at the elbow","Radial nerve at the spiral groove","Peroneal nerve at the fibular head"],"correct":2,"explanation":"&#39;Saturday Night Palsy&#39; is a compressive neuropathy of the RADIAL NERVE at the SPIRAL GROOVE of the humerus. It typically presents with wrist drop and sensory loss on the dorsum of the hand, but sparing triceps function (innervation proximal to the groove)."},{"question":"What is the hallmark of an acquired demyelinating neuropathy like CIDP?","options":["Uniform slowing of conduction velocities","Conduction block and temporal dispersion","Pure axonal loss","Normal F-waves"],"correct":1,"explanation":"ACQUIRED demyelinating neuropathies (like CIDP, GBS) are characterized by NON-UNIFORM demyelination, leading to CONDUCTION BLOCK (focal drop in amplitude) and TEMPORAL DISPERSION (desynchronized arrival of potentials). Hereditary demyelinating neuropathies (like CMT1A) typically show uniform slowing without block/dispersion."},{"question":"In Anterior Interosseous Nerve (AIN) syndrome, which muscle is weak?","options":["Abductor Pollicis Brevis (APB)","Flexor Pollicis Longus (FPL)","Flexor Carpi Ulnaris (FCU)","Extensor Indicis Proprius (EIP)"],"correct":1,"explanation":"AIN syndrome affects the FLEXOR POLLICIS LONGUS (FPL), Flexor Digitorum Profundus (FDP) to digits 2 & 3, and Pronator Quadratus. It presents with the inability to make the &#39;OK&#39; sign. The APB is innervated by the recurrent motor branch of the median nerve (distal to AIN takeoff), and FCU is ulnar."},{"question":"Which finding suggests a lesion is PROXIMAL to the dorsal root ganglion (i.e., a radiculopathy)?","options":["Absent SNAP","Reduced CMAP","Preserved (Normal) SNAP despite sensory loss","Slowed conduction velocity"],"correct":2,"explanation":"In a RADICULOPATHY (lesion proximal to the DRG), the sensory nerve cell body in the DRG is intact, so the distal axon remains healthy. Therefore, the SNAP (Sensory Nerve Action Potential) remains NORMAL (preserved) despite the patient having clinical sensory loss. This distinguishes radiculopathy from plexopathy or peripheral neuropathy (where SNAPs are reduced/absent)."}]')) : '<div class="quiz-container">Quiz System currently unavailable</div>'}
        </div>
    
                </div>
            </div>

                </div>
            </div>

            <!-- Neuropathy Pathophysiology Quiz -->
            ${typeof window.generateModuleQuiz === 'function' ? window.generateModuleQuiz(JSON.parse('[{"question":"What is the primary pathological difference between demyelinating and axonal neuropathies?","options":["Demyelinating affects myelin; axonal affects the axon itself","Demyelinating is painful; axonal is painless","Demyelinating occurs proximally; axonal occurs distally","Demyelinating affects motor fibers; axonal affects sensory fibers"],"correct":0,"explanation":"Demyelinating neuropathies primarily damage the myelin sheath (Schwann cells), leading to slowed conduction velocity and conduction blocks. Axonal neuropathies involve degeneration of the axon itself (Wallerian degeneration), resulting in reduced amplitudes but preserved conduction velocity. This fundamental distinction is crucial for diagnosis and prognosis."},{"question":"In a demyelinating neuropathy, what is the most characteristic electrodiagnostic finding?","options":["Reduced CMAP/SNAP amplitudes with normal conduction velocity","Slowed conduction velocity with conduction blocks","Fibrillation potentials and positive sharp waves","Reduced recruitment with large motor units"],"correct":1,"explanation":"Demyelinating neuropathies characteristically show SLOWED CONDUCTION VELOCITY and may demonstrate CONDUCTION BLOCKS or temporal dispersion. The myelin damage disrupts saltatory conduction, causing signals to travel more slowly. Amplitudes are typically preserved unless severe secondary axonal loss occurs. This contrasts with axonal neuropathies where velocities are normal but amplitudes are reduced."},{"question":"What NCS finding indicates axonal loss rather than demyelination?","options":["Prolonged F-wave latencies","Temporal dispersion of the waveform","Reduced CMAP amplitude with normal conduction velocity","Conduction block across a nerve segment"],"correct":2,"explanation":"REDUCED CMAP/SNAP AMPLITUDES with NORMAL/NEAR-NORMAL conduction velocities indicate axonal loss. The amplitude reflects the number of functioning axons - when axons degenerate, fewer motor units contribute to the response, reducing amplitude. Conduction velocity remains preserved because the surviving myelinated fibers conduct normally. This is the hallmark of axonal neuropathies."},{"question":"What are the three progressive stages of compression neuropathy pathophysiology?","options":["Inflammation → Fibrosis → Atrophy","Ischemia → Demyelination → Axonal Loss","Edema → Scarring → Necrosis","Conduction slowing → Conduction block → Denervation"],"correct":1,"explanation":"Compression neuropathies progress through three stages: (1) ISCHEMIA - reduced blood flow causes reversible dysfunction and conduction slowing, (2) DEMYELINATION - continued compression causes myelin breakdown with conduction blocks and temporal dispersion, (3) AXONAL LOSS - severe/prolonged compression leads to Wallerian degeneration with amplitude reduction and denervation changes. Understanding these stages guides prognosis and treatment timing."},{"question":"What EMG finding would you expect in an acute axonal neuropathy (less than 2 weeks)?","options":["Fibrillation potentials throughout affected muscles","Reduced recruitment with no spontaneous activity","Normal EMG with abnormal NCS amplitudes","Myotonic discharges with reduced recruitment"],"correct":1,"explanation":"In ACUTE axonal injury (<2-3 weeks), EMG shows REDUCED RECRUITMENT (due to motor unit loss) but NO SPONTANEOUS ACTIVITY yet. Fibrillation potentials and positive sharp waves require time to develop - typically appearing 2-3 weeks after denervation (distal muscles) or 3-4 weeks (proximal muscles). This time lag reflects Wallerian degeneration and muscle fiber membrane instability development."},{"question":"A patient has slowed median motor conduction velocity (35 m/s), but normal ulnar and radial velocities. What does this suggest?","options":["Generalized demyelinating polyneuropathy","Focal median nerve demyelination (e.g., carpal tunnel)","C6-C7 radiculopathy affecting median components","Brachial plexopathy affecting lateral cord"],"correct":1,"explanation":"ISOLATED slowing of ONE nerve with normal velocities in other nerves indicates a FOCAL DEMYELINATING LESION of that specific nerve. In this case, median nerve compression (likely carpal tunnel syndrome). Generalized demyelinating polyneuropathies would affect multiple nerves symmetrically. Radiculopathy and plexopathy would show denervation patterns rather than uniform slowing."},{"question":"What is the functional consequence of saltatory conduction in myelinated fibers?","options":["Slower but more energy-efficient transmission","Faster conduction (35-75 m/s) with energy efficiency","Continuous depolarization along the entire membrane","Better pain and temperature sensation"],"correct":1,"explanation":"SALTATORY CONDUCTION occurs in myelinated fibers where action potentials &#39;jump&#39; between nodes of Ranvier, depolarizing only at nodes rather than continuously along the membrane. This produces FASTER conduction velocities (35-75 m/s for motor fibers) compared to unmyelinated fibers (0.2-1.5 m/s). It&#39;s also ENERGY EFFICIENT since less membrane area requires active depolarization. This is why demyelinating diseases cause such profound slowing."},{"question":"Why are large myelinated fibers (Aα, Aβ) typically affected first in metabolic and compressive neuropathies?","options":["They have slower conduction and accumulate more toxins","They have higher metabolic demands and longer transport distances","They are unmyelinated and more fragile","They only carry pain signals which are most sensitive"],"correct":1,"explanation":"Large myelinated fibers (Aα, Aβ) are affected first because: (1) HIGHER METABOLIC DEMANDS - maintaining large axons and thick myelin requires more energy, (2) LONGER AXONAL TRANSPORT DISTANCES - nutrients/proteins must travel farther in large fibers, (3) MORE SUSCEPTIBLE TO COMPRESSION - larger diameter makes them vulnerable to mechanical pressure, (4) GREATER MYELIN CONTENT - more myelin means more vulnerability to demyelinating processes. This is why weakness, vibration loss, and areflexia occur before small fiber symptoms."},{"question":"What pathophysiological mechanism causes &#39;conduction block&#39; in demyelinating neuropathies?","options":["Complete axonal transection at the compression site","Severe focal demyelination preventing action potential propagation","Ischemia causing temporary nerve dysfunction","Schwann cell hypertrophy blocking sodium channels"],"correct":1,"explanation":"CONDUCTION BLOCK occurs when severe focal demyelination is so extensive that the action potential cannot propagate past the lesion, despite intact axons. The demyelinated segment has increased capacitance and reduced resistance, causing current to leak away. Proximal stimulation shows reduced amplitude compared to distal stimulation (>50% drop). This is reversible with remyelination, unlike axonal loss."},{"question":"A diabetic patient has reduced sural and superficial peroneal SNAP amplitudes, but normal median/ulnar sensory responses. What pattern does this represent?","options":["Mononeuritis multiplex","Length-dependent sensory polyneuropathy","Dorsal root ganglionopathy","Small fiber neuropathy"],"correct":1,"explanation":"This represents LENGTH-DEPENDENT SENSORY POLYNEUROPATHY, the classic &#39;stocking-glove&#39; distribution. The longest nerves (lower extremities) are affected first because: (1) longer axons have greater metabolic demands, (2) more distance for toxin/metabolic dysfunction accumulation, and (3) greater vulnerability to vascular supply issues. Sural and superficial peroneal nerves are longest sensory nerves, hence affected earliest in diabetic neuropathy."},{"question":"What is the key difference between Seddon&#39;s and Sunderland&#39;s nerve injury classification systems?","options":["Seddon uses 3 categories based on severity; Sunderland uses 5 grades based on anatomical structures damaged","Seddon focuses on motor deficits; Sunderland focuses on sensory deficits","Seddon is used for compression injuries; Sunderland is used for traumatic injuries","Seddon classifies demyelinating injuries; Sunderland classifies axonal injuries"],"correct":0,"explanation":"SEDDON&#39;S CLASSIFICATION uses 3 broad categories based on injury severity: (1) Neurapraxia - temporary myelin damage, (2) Axonotmesis - axon damage with intact connective tissue, (3) Neurotmesis - complete nerve transection. SUNDERLAND&#39;S CLASSIFICATION expands this into 5 grades based on specific anatomical structures damaged: Grade 1 = myelin only, Grade 2 = axon + myelin (endoneurium intact), Grade 3 = endoneurium disrupted (perineurium intact), Grade 4 = perineurium disrupted (epineurium intact), Grade 5 = complete transection. Sunderland&#39;s system provides more detail for surgical planning and prognosis."},{"question":"A patient suffers a severe laceration to the median nerve. You counsel them that peripheral nerves regenerate at approximately what rate, and recovery time depends on distance to target?","options":["1 millimeter per week (~0.25 inches per month)","1 millimeter per day (~1 inch per month)","1 centimeter per day (~1 foot per month)","1 millimeter per hour (~2 feet per month)"],"correct":1,"explanation":"Peripheral nerves regenerate at approximately 1 MILLIMETER PER DAY (or about 1 INCH PER MONTH). This rate is relatively consistent across patients and is crucial for counseling about recovery expectations. For example, a median nerve injury at the wrist (about 10cm from APB muscle) would take approximately 3-4 months before reinnervation begins. This regeneration rate reflects the speed of axonal transport mechanisms that deliver structural proteins and organelles to the regenerating growth cone. Understanding this timeline helps set realistic expectations for functional recovery and guides timing of surgical interventions."}]')) : '<div class="quiz-container">Quiz System currently unavailable</div>'}
        </div>
    

        `;
    }
};

// Global Alias for legacy/onclick compatibility
window.Pathophysiology = Pathophysiology;
