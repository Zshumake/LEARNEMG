// EMG Introduction Module
// Comprehensive introduction to EMG/NCS fundamentals

import { registerModulePodcasts, generateErnestButton } from '../podcast-player.js';

export function generateContent(module) {
    // Register podcast for this module
    registerModulePodcasts('emg-introduction');

    return `
        <div class="interactive-content" style="position: relative;">${generateErnestButton('emg-introduction', 'EMG Introduction')}
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master the systematic approach to electrodiagnostic studies: understand localization principles, essential EMG terminology, patient encounter process, and cardinal rules for accurate interpretation.
                </p>
            </div>

            <!-- Tab Navigation for Enhanced Content -->
            <div style="display: flex; background: #f8fafc; padding: 5px; border-radius: 12px; margin-bottom: 25px; gap: 3px; flex-wrap: wrap;">
                <button onclick="showEMGSection('foundations')" id="foundations-tab" class="emg-tab active-emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🏗️ Foundations
                </button>
                <button onclick="showEMGSection('localization')" id="localization-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🎯 Localization
                </button>
                <button onclick="showEMGSection('terminology')" id="terminology-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    📚 Terminology
                </button>
                <button onclick="showEMGSection('encounter')" id="encounter-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🩺 Patient Encounter
                </button>
                <button onclick="showEMGSection('cardinal')" id="cardinal-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    📋 Cardinal Rules
                </button>
            </div>

            <!-- Foundations Section -->
            <div id="foundations-section" class="emg-section">
                <!-- Core Concepts Section -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔍 What are Electrodiagnostic Studies?</h4>

                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin-bottom: 15px;">
                            <strong>Electrodiagnostic (EDX) studies</strong> play a key role in evaluating patients with neuromuscular disorders.
                            Among these studies are included nerve conduction studies (NCSs), repetitive nerve stimulation, late responses,
                            blink reflexes, and needle electromyography (EMG), in addition to a variety of other specialized examinations.
                        </p>
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin: 0;">
                            <strong>NCSs and needle EMG form the core of the EDX study.</strong> They are performed first, and usually yield the
                            greatest diagnostic information. NCSs and needle EMG are complementary, and therefore are always performed
                            together and during the same setting.
                        </p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <h5 style="color: #059669; margin-bottom: 10px;">🧠 Core Components</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>NCS:</strong> Nerve conduction studies</li>
                                <li><strong>Needle EMG:</strong> Muscle evaluation</li>
                                <li><strong>Late responses:</strong> F-waves, H-reflexes</li>
                                <li><strong>Specialized tests:</strong> Repetitive stimulation</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <h5 style="color: #dc2626; margin-bottom: 10px;">⚡ Key Principle</h5>
                            <p style="color: #374151; line-height: 1.6; margin: 0;">
                                <strong>NCS and needle EMG are complementary</strong> and must always be performed together
                                during the same setting to yield the greatest diagnostic information.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Clinical Integration -->
                <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.4em;">🩺 Extension of Clinical Examination</h4>

                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin-bottom: 15px;">
                            <strong>In practice, EDX studies serve as an extension of the clinical examination</strong> and should always be considered as such.
                            Accordingly, a directed neurologic examination should always be performed before EDX studies in order to identify
                            key clinical abnormalities and establish a differential diagnosis.
                        </p>

                        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                            <h6 style="color: #dc2626; margin-bottom: 10px;">⚠️ Critical Point</h6>
                            <p style="color: #374151; margin: 0; font-style: italic;">
                                "With numerous nerves and literally hundreds of muscles available, it is neither desirable for the patient
                                nor practical for the electromyographer to study them all. In each case, the study must be individualized,
                                based on the neurologic examination and differential diagnosis, and modified in real time as the study progresses."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Localization Section -->
            <div id="localization-section" class="emg-section" style="display: none;">
                <!-- Localization is Key -->
                <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #7c3aed; margin-bottom: 20px; font-size: 1.4em;">🎯 The Major Aim: LOCALIZATION</h4>

                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin-bottom: 15px;">
                            <strong>The principal goal of every EDX study is to localize the disorder.</strong>
                            The differential diagnosis is often dramatically narrowed once the disorder has been localized.
                        </p>

                        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
                            <h6 style="color: #7c3aed; margin-bottom: 10px;">First Order Localization</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <div style="color: #374151;">
                                    ✓ <strong>Neuropathic</strong><br>
                                    ✓ <strong>Myopathic</strong>
                                </div>
                                <div style="color: #374151;">
                                    ✓ <strong>Neuromuscular Junction</strong><br>
                                    ✓ <strong>Central Nervous System</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Systematic Localization Framework -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔬 Systematic Localization Framework</h4>

                    <!-- Neuropathic Localization -->
                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">🧠 Neuropathic Localization</h5>
                        <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                            Neuropathic is probably the most common localization made on EDX studies. In conjunction with history and examination,
                            EDX studies can usually further localize the disorder to:
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Neuronopathy</strong> (anterior horn cell, DRG)</li>
                                    <li><strong>Radiculopathy</strong> (nerve root)</li>
                                    <li><strong>Plexopathy</strong> (brachial/lumbosacral)</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Mononeuropathy</strong> (single nerve)</li>
                                    <li><strong>Mononeuropathy multiplex</strong></li>
                                    <li><strong>Polyneuropathy</strong> (generalized)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Key Information Categories -->
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px;">📊 Key Information from EDX Studies</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">Fiber Types</h6>
                                <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 15px;">
                                    <li>Motor</li>
                                    <li>Sensory</li>
                                    <li>Mixed</li>
                                </ul>
                            </div>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">Pathophysiology</h6>
                                <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 15px;">
                                    <li>Axonal loss</li>
                                    <li>Demyelinating</li>
                                    <li>Mixed process</li>
                                </ul>
                            </div>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">Temporal Course</h6>
                                <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 15px;">
                                    <li>Hyperacute (<1 week)</li>
                                    <li>Acute (weeks)</li>
                                    <li>Subacute (months)</li>
                                    <li>Chronic (>months)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Terminology Section -->
            <div id="terminology-section" class="emg-section" style="display: none;">
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">📚 Essential EMG Terminology</h4>

                    <!-- Ernest's Terminology Podcast Callout -->
                    <div onclick="playTerminologyPodcast()"
                         style="background: linear-gradient(135deg, #7c3aed, #6d28d9);
                                padding: 20px; border-radius: 12px; margin-bottom: 20px;
                                cursor: pointer; transition: all 0.3s ease;
                                box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);"
                         onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 25px rgba(124, 58, 237, 0.4)'"
                         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(124, 58, 237, 0.3)'">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <img src="ERNEST.png"
                                 style="width: 60px; height: 60px; border-radius: 50%; border: 3px solid white;"
                                 alt="Ernest">
                            <div style="flex: 1; color: white;">
                                <h5 style="color: white; margin: 0 0 8px 0; font-size: 1.3em; font-weight: 600;">
                                    🎙️ Listen to Ernest's Essential Terminology Podcast
                                </h5>
                                <p style="color: #e9d5ff; margin: 0; font-size: 0.95em; line-height: 1.5;">
                                    Deep dive into core EMG terminology concepts with detailed explanations and clinical context.
                                    Duration: 28 minutes
                                </p>
                            </div>
                            <div style="background: white; color: #7c3aed; padding: 12px 24px; border-radius: 8px; font-weight: 600; white-space: nowrap;">
                                ▶ Play Now
                            </div>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <!-- Basic EMG Concepts -->
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">🔋 Insertional Activity</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Brief burst of electrical activity that occurs when the needle electrode is inserted into or moved within muscle tissue. Normal insertional activity lasts for a few hundred milliseconds after needle movement stops.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px;">⚡ Spontaneous Activity</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Electrical activity that occurs when the muscle is at rest and the needle is not being moved. Normal muscle at rest should be electrically silent except at the motor endplate region.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #7c3aed;">
                            <h5 style="color: #7c3aed; margin-bottom: 15px;">📊 Fibrillation Potentials</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Spontaneous discharges of single muscle fibers occurring at regular intervals. They appear as biphasic spikes with an initial positive deflection and indicate denervation or muscle fiber membrane instability.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #ea580c;">
                            <h5 style="color: #ea580c; margin-bottom: 15px;">⭐ Positive Sharp Waves</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Spontaneous discharges with an initial sharp positive deflection followed by a slow negative phase. Like fibrillation potentials, they indicate denervation and fire at regular intervals.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #0891b2;">
                            <h5 style="color: #0891b2; margin-bottom: 15px;">🔗 Motor Unit</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The smallest functional unit of the motor system, consisting of a single anterior horn cell, its axon, and all the muscle fibers it innervates. Motor units are the building blocks of voluntary muscle contraction.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #9333ea;">
                            <h5 style="color: #9333ea; margin-bottom: 15px;">📈 Motor Unit Action Potential (MUAP)</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The electrical activity recorded from a motor unit during voluntary contraction. Normal MUAPs are analyzed for duration, amplitude, phases, and configuration to assess neuromuscular health.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px;">🔄 Fasciculations</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Spontaneous discharges of an entire motor unit that occur irregularly and may be visible as muscle twitches. They can be benign or pathological, often associated with anterior horn cell disorders.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">📊 Recruitment</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The process by which motor units are activated during increasing voluntary effort. Normal recruitment follows the size principle, with smaller motor units recruited before larger ones.
                            </p>
                        </div>

                        <!-- NCS Advanced Concepts -->
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #1d4ed8;">
                            <h5 style="color: #1d4ed8; margin-bottom: 15px;">⚡ Compound Muscle Action Potential (CMAP)</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The summated electrical response of all muscle fibers in a muscle activated by stimulation of the motor nerve. CMAP amplitude reflects the number of functioning motor axons and muscle fibers.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #7c2d12;">
                            <h5 style="color: #7c2d12; margin-bottom: 15px;">🌊 Sensory Nerve Action Potential (SNAP)</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The electrical response recorded from stimulation of sensory nerve fibers. SNAPs assess the integrity of sensory axons and are often the first to be affected in peripheral neuropathies.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #b45309;">
                            <h5 style="color: #b45309; margin-bottom: 15px;">⏱️ Conduction Velocity</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The speed at which electrical impulses travel along nerve fibers, calculated by dividing distance by the difference in latencies between two stimulation points. Slowed in demyelinating disorders.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #be185d;">
                            <h5 style="color: #be185d; margin-bottom: 15px;">⏰ Distal Latency</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The time from stimulus artifact to onset of the response when stimulating at the most distal site. Prolonged distal latencies suggest focal slowing, often seen in entrapment neuropathies.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #0f766e;">
                            <h5 style="color: #0f766e; margin-bottom: 15px;">🔄 F-Wave</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                A late response that occurs when the motor nerve stimulus travels antidromically to the anterior horn cell and returns orthodromically to the muscle. F-waves assess proximal nerve conduction.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #991b1b;">
                            <h5 style="color: #991b1b; margin-bottom: 15px;">🎯 H-Reflex</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                A monosynaptic reflex response obtained by electrical stimulation of sensory fibers in mixed nerves. The H-reflex tests the entire reflex arc and is commonly performed in the soleus muscle via tibial nerve stimulation.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #7c3aed;">
                            <h5 style="color: #7c3aed; margin-bottom: 15px;">📉 Conduction Block</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                A focal reduction in CMAP amplitude (>20-50%) when comparing proximal to distal stimulation, without significant temporal dispersion. Indicates focal demyelination with functional block.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">📊 Temporal Dispersion</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Abnormal prolongation and decreased amplitude of the CMAP due to varying conduction velocities of individual axons. Results in a spread-out, polyphasic waveform in demyelinating neuropathies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Patient Encounter Section -->
            <div id="encounter-section" class="emg-section" style="display: none;">
                <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #1d4ed8; margin-bottom: 20px; font-size: 1.4em;">🩺 Patient Encounter Process</h4>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1e40af; margin-bottom: 15px;">📋 Pre-Study Preparation</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">📝 Review Clinical Information</h6>
                                <ul style="color: #6b7280; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>History and physical examination findings</li>
                                    <li>Symptoms: onset, distribution, progression</li>
                                    <li>Previous diagnostic studies and imaging</li>
                                    <li>Current medications and medical history</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">🎯 Formulate Clinical Questions</h6>
                                <ul style="color: #6b7280; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>What is the primary diagnostic question?</li>
                                    <li>Which nerves/muscles need evaluation?</li>
                                    <li>Are there specific findings to confirm/exclude?</li>
                                    <li>What is the expected anatomical localization?</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1e40af; margin-bottom: 15px;">🔍 Study Execution Protocol</h5>
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div style="flex: 1; background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1e40af; margin-bottom: 10px;">1️⃣ Nerve Conduction Studies</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Start with most symptomatic area</li>
                                    <li>Include both motor and sensory studies</li>
                                    <li>Compare symptomatic to asymptomatic side</li>
                                    <li>Add late responses (F-waves, H-reflexes) as needed</li>
                                </ul>
                            </div>
                            <div style="flex: 1; background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #059669;">
                                <h6 style="color: #059669; margin-bottom: 10px;">2️⃣ Needle EMG</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Select muscles based on NCS findings</li>
                                    <li>Sample different nerve root levels</li>
                                    <li>Include proximal and distal muscles</li>
                                    <li>Examine paraspinal muscles when indicated</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #1e40af; margin-bottom: 15px;">📊 Interpretation Framework</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #92400e; margin-bottom: 8px;">🎯 Localization</h6>
                                <p style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0;">
                                    Determine anatomical level of lesion: nerve root, plexus, peripheral nerve, neuromuscular junction, or muscle.
                                </p>
                            </div>
                            <div style="background: #dbeafe; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #1d4ed8; margin-bottom: 8px;">🔬 Pathophysiology</h6>
                                <p style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0;">
                                    Classify as axonal vs. demyelinating, acute vs. chronic, or myopathic pattern.
                                </p>
                            </div>
                            <div style="background: #dcfce7; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #166534; margin-bottom: 8px;">⚖️ Severity</h6>
                                <p style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0;">
                                    Grade severity from mild to severe based on amplitude reduction and abnormal spontaneous activity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cardinal Rules Section -->
            <div id="cardinal-section" class="emg-section" style="display: none;">
                <div style="background: linear-gradient(135deg, #fecaca, #fed7d7); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.4em;">📋 Six Cardinal Rules of NCS (Preston & Shapiro)</h4>

                    <div style="display: grid; gap: 20px;">
                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                                Clinical Correlation First
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>NCS are an extension of the clinical examination - Always correlate findings with clinical symptoms.</strong> Electrodiagnostic studies should complement, not replace, thorough clinical assessment.
                            </p>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px;">
                                <p style="color: #991b1b; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Key Point:</strong> EDX abnormalities without clinical correlation may represent subclinical disease, anatomical variants, or technical errors. Clinical context is essential for proper interpretation.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #ea580c;">
                            <h5 style="color: #ea580c; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #ea580c; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                                When in Doubt, Think Technical Factors
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Most "abnormalities" are technical errors.</strong> Before concluding pathology exists, systematically review all technical factors that could explain the findings.
                            </p>
                            <div style="background: #fff7ed; padding: 15px; border-radius: 8px;">
                                <p style="color: #9a3412; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Technical Checklist:</strong> Verify temperature >32°C, electrode placement, stimulation adequacy, artifact minimization, and patient cooperation before attributing findings to pathology.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #d97706;">
                            <h5 style="color: #d97706; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #d97706; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                                When in Doubt, Reexamine the Patient
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>If findings don't match exam, recheck both.</strong> Discordant EDX and clinical findings require reevaluation of both the examination and the electrodiagnostic study.
                            </p>
                            <div style="background: #fffbeb; padding: 15px; border-radius: 8px;">
                                <p style="color: #92400e; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Practical Application:</strong> Re-examine specific muscle groups, verify sensory symptoms, and consider alternative diagnoses when EDX results don't correlate with clinical presentation.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #059669; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</span>
                                Use Supramaximal Stimulation
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Increase current 20% beyond plateau.</strong> Ensure all nerve fibers are depolarized to obtain accurate amplitude and latency measurements.
                            </p>
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
                                <p style="color: #166534; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Technical Detail:</strong> Submaximal stimulation leads to underestimation of amplitude, prolonged latency, and false impressions of conduction block or temporal dispersion.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #0891b2;">
                            <h5 style="color: #0891b2; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #0891b2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</span>
                                Optimize Stimulator Position
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Find lowest threshold, then increase to supramaximal.</strong> Proper electrode positioning is critical for accurate nerve stimulation and consistent results.
                            </p>
                            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                                <p style="color: #0c4a6e; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Positioning Strategy:</strong> Move stimulator methodically to find optimal position with lowest threshold, ensuring consistent nerve activation across all stimulation sites.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #7c3aed;">
                            <h5 style="color: #7c3aed; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #7c3aed; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">6</span>
                                Don't Overcall Abnormalities
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Minor findings without clinical correlation may be irrelevant.</strong> Avoid attributing clinical significance to subtle abnormalities that don't correlate with symptoms.
                            </p>
                            <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                <p style="color: #6b21a8; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Clinical Judgment:</strong> Age-related changes, anatomical variants, and subclinical findings should not drive clinical decision-making without corresponding symptoms and signs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${generateModuleQuiz([
                {
                    question: "What is the PRIMARY goal of every electrodiagnostic (EDX) study?",
                    options: [
                        "To diagnose a specific disease",
                        "To localize the disorder",
                        "To determine prognosis",
                        "To measure nerve conduction velocity"
                    ],
                    correct: 1,
                    explanation: "The principal goal of every EDX study is to LOCALIZE the disorder. Once localized, the differential diagnosis is dramatically narrowed. EDX studies help determine whether a disorder is neuropathic, myopathic, at the neuromuscular junction, or central."
                },
                {
                    question: "Why must NCS and needle EMG always be performed together during the same session?",
                    options: [
                        "For billing purposes",
                        "To save time",
                        "They are complementary and yield the greatest diagnostic information together",
                        "Insurance requirements mandate it"
                    ],
                    correct: 2,
                    explanation: "NCS and needle EMG are COMPLEMENTARY examinations that must always be performed together during the same setting because they yield the greatest diagnostic information when combined. They evaluate different aspects of neuromuscular function."
                },
                {
                    question: "What is a critical principle when planning an EDX study?",
                    options: [
                        "Study every available nerve and muscle systematically",
                        "Focus only on the symptomatic area",
                        "Individualize the study based on exam findings and differential diagnosis",
                        "Always follow a standardized protocol regardless of presentation"
                    ],
                    correct: 2,
                    explanation: "The study must be INDIVIDUALIZED based on the neurologic examination and differential diagnosis, and modified in real time as the study progresses. It is neither desirable nor practical to study all nerves and muscles - a directed exam is most appropriate."
                },
                {
                    question: "In neuropathic localization, what distinguishes a plexopathy from a radiculopathy on EDX?",
                    options: [
                        "Plexopathy shows normal paraspinal muscles, radiculopathy shows abnormal paraspinals",
                        "Radiculopathy affects only sensory fibers",
                        "Plexopathy never shows sensory changes",
                        "They cannot be distinguished electrodiagnostically"
                    ],
                    correct: 0,
                    explanation: "A key differentiator is that RADICULOPATHY shows abnormal paraspinal muscles (serratus anterior, rhomboids) because the lesion is proximal to these nerve branches, while PLEXOPATHY shows NORMAL paraspinals because the lesion is distal to where these nerves branch off from the roots."
                },
                {
                    question: "What is a fundamental principle regarding the interpretation of subclinical EDX findings?",
                    options: [
                        "All abnormalities found should be reported regardless of symptoms",
                        "Subclinical findings should drive treatment decisions",
                        "Abnormal findings without corresponding clinical symptoms should not drive clinical decision-making",
                        "Age-related changes are always pathological"
                    ],
                    correct: 2,
                    explanation: "Age-related changes, anatomical variants, and subclinical findings should NOT drive clinical decision-making without corresponding symptoms and signs. The clinical examination and patient symptoms must guide interpretation - EDX studies are an extension of the clinical exam, not a replacement for it."
                }
            ])}

        </div>
    `;
}

// EMG Section Navigation Functions
function showEMGSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.emg-section');
    sections.forEach(section => section.style.display = 'none');

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.emg-tab');
    tabs.forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#64748b';
        tab.classList.remove('active-emg-tab');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionName + '-section');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Activate selected tab
    const selectedTab = document.getElementById(sectionName + '-tab');
    if (selectedTab) {
        selectedTab.style.background = 'linear-gradient(135deg, #059669, #047857)';
        selectedTab.style.color = 'white';
        selectedTab.classList.add('active-emg-tab');
    }
}

// Initialize EMG Introduction with foundations section visible
function initializeEMGIntroduction() {
    // Wait a brief moment for DOM elements to be available
    setTimeout(() => {
        showEMGSection('foundations');
    }, 100);
}

// Play Terminology Podcast function
function playTerminologyPodcast() {
    console.log('🎧 Playing Essential Terminology podcast');

    // Dynamically import podcast player and play the specific episode
    import('../podcast-player.js').then(module => {
        // Register emg-introduction module podcasts
        module.registerModulePodcasts('emg-introduction');

        // Open podcast player if not visible
        if (typeof window.togglePodcastPlayer === 'function') {
            const player = document.getElementById('podcast-player-overlay');
            if (!player || player.style.display === 'none') {
                window.togglePodcastPlayer();
            }

            // Select the terminology episode after a brief delay
            setTimeout(() => {
                const episodeSelector = document.getElementById('episode-selector');
                if (episodeSelector) {
                    // Find and select the terminology episode
                    for (let i = 0; i < episodeSelector.options.length; i++) {
                        if (episodeSelector.options[i].value === 'emg-terminology') {
                            episodeSelector.selectedIndex = i;
                            episodeSelector.dispatchEvent(new Event('change'));
                            break;
                        }
                    }
                }
            }, 100);
        }
    }).catch(error => {
        console.error('❌ Error loading podcast player:', error);
        alert('Error loading podcast player. Please try again.');
    });
}

// Make functions available globally
window.showEMGSection = showEMGSection;
window.initializeEMGIntroduction = initializeEMGIntroduction;
window.playTerminologyPodcast = playTerminologyPodcast;


