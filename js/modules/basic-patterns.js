// Basic Patterns Module
// Comprehensive EMG pattern recognition with multimedia content

import { generateErnestButton } from '../../src/modules/audio/AudioData.js';

export function generateContent(module) {
    // Register podcast for this module
    // Podcast registered automatically via AudioData.js

    return `
        <div class="interactive-content" style="position: relative;">
            ${generateErnestButton('basic-patterns', 'Pattern Recognition')}
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0e7ff); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #6366f1;">
                <h3 style="color: #4338ca; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #3730a3; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master the systematic analysis of EMG patterns using morphology, stability, and firing characteristics. Develop expertise in recognizing normal and abnormal spontaneous activity, motor unit potentials, and their clinical significance for accurate electrodiagnostic interpretation.
                </p>
            </div>

            <!-- Pattern Analysis Framework -->
            <div style="background: linear-gradient(135deg, #e0f7fa, #e8f5e8); padding: 25px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #00796b;">
                <h3 style="color: #00695c; margin-bottom: 20px; font-size: 1.4em;">📋 Systematic Pattern Analysis Framework</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h4 style="color: #00796b; margin-bottom: 15px; font-size: 1.2em;">🔍 Morphology</h4>
                        <ul style="color: #37474f; line-height: 1.6; font-size: 0.95em; margin: 0;">
                            <li><strong>Duration:</strong> Time from initial to final baseline crossing</li>
                            <li><strong>Amplitude:</strong> Peak-to-peak voltage measurement</li>
                            <li><strong>Phases:</strong> Baseline crossings + 1</li>
                            <li><strong>Initial deflection:</strong> Positive vs. negative</li>
                            <li><strong>Shape:</strong> Brief spike vs. positive wave</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h4 style="color: #00796b; margin-bottom: 15px; font-size: 1.2em;">⚖️ Stability</h4>
                        <ul style="color: #37474f; line-height: 1.6; font-size: 0.95em; margin: 0;">
                            <li><strong>Stable:</strong> Consistent morphology</li>
                            <li><strong>Waxing/Waning:</strong> Amplitude changes</li>
                            <li><strong>Decrementing:</strong> Progressive amplitude decrease</li>
                            <li><strong>Abrupt changes:</strong> Discrete morphology jumps</li>
                            <li><strong>Blocking:</strong> Intermittent firing failure</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h4 style="color: #00796b; margin-bottom: 15px; font-size: 1.2em;">🎯 Firing Characteristics</h4>
                        <ul style="color: #37474f; line-height: 1.6; font-size: 0.95em; margin: 0;">
                            <li><strong>Rate:</strong> Very slow (&lt;2Hz) to very fast (&gt;100Hz)</li>
                            <li><strong>Pattern:</strong> Regular, irregular, bursting</li>
                            <li><strong>Rhythm:</strong> Semi-rhythmic vs. perfectly regular</li>
                            <li><strong>Recruitment:</strong> Activation vs. recruitment patterns</li>
                            <li><strong>Voluntary control:</strong> &lt;4-5Hz cannot be voluntary</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Multimedia Pattern Recognition Library -->
            <div style="background: linear-gradient(135deg, #fff3e0, #fce4ec); padding: 25px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #f57c00;">
                <h3 style="color: #e65100; margin-bottom: 20px; font-size: 1.4em;">🎥 Interactive Pattern Recognition Library</h3>
                <p style="color: #bf360c; margin-bottom: 25px; font-size: 1.05em;">
                    Master EMG pattern recognition through real-time video demonstrations with expert clinical interpretation.
                </p>

                <!-- Abnormal Spontaneous Activity Videos -->
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #d84315; margin-bottom: 20px; font-size: 1.3em;">⚠️ Abnormal Spontaneous Activity</h4>

                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
                        <!-- Fibrillations and Positive Sharp Waves -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #c62828; margin-bottom: 15px; font-size: 1.1em;">🔴 Fibrillations & Positive Sharp Waves</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Spontaneous muscle fiber discharges indicating active denervation - the hallmark of nerve injury and motor neuron disease.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/jjUZMf8_B1k"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #ffebee; padding: 15px; border-radius: 8px;">
                                <p style="color: #b71c1c; font-weight: 600; margin-bottom: 8px;">Clinical Significance:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Fibrillations:</strong> Brief spike (1-5ms), regular 0.5-10Hz, "rain on tin roof" sound</li>
                                    <li><strong>PSWs:</strong> Initial positive, slow negative, "dull thud" sound</li>
                                    <li><strong>Pathology:</strong> Active denervation - radiculopathy, neuropathy, motor neuron disease</li>
                                    <li><strong>Timing:</strong> Appear 1-3 weeks post-denervation</li>
                                </ul>
                            </div>
                        </div>

                        <!-- 3+ Positive Sharp Waves -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #c62828; margin-bottom: 15px; font-size: 1.1em;">📈 Grade 3+ Positive Sharp Waves</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Severe denervation with abundant positive sharp waves filling multiple muscle areas - indicates significant nerve damage.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/fT6Lx4rnRNs"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #ffebee; padding: 15px; border-radius: 8px;">
                                <p style="color: #b71c1c; font-weight: 600; margin-bottom: 8px;">Grading Scale (0-4+):</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>0:</strong> None present</li>
                                    <li><strong>1+:</strong> Persistent single trains (2-3 areas)</li>
                                    <li><strong>2+:</strong> Moderate number (3+ areas)</li>
                                    <li><strong>3+:</strong> Many potentials in all areas</li>
                                    <li><strong>4+:</strong> Full interference pattern - severe denervation</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Complex Repetitive Discharges -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #7b1fa2; margin-bottom: 15px; font-size: 1.1em;">🔄 Complex Repetitive Discharges</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Time-linked muscle fibers creating perfectly regular "machine-like" discharges - characteristic of chronic muscle disorders.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/UE-UIRDzZ-U"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #f3e5f5; padding: 15px; border-radius: 8px;">
                                <p style="color: #4a148c; font-weight: 600; margin-bottom: 8px;">Distinctive Features:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Morphology:</strong> Time-linked individual muscle fibers</li>
                                    <li><strong>Sound:</strong> Characteristic "machine-like" pattern</li>
                                    <li><strong>Frequency:</strong> 5-100Hz, perfectly regular</li>
                                    <li><strong>Pathology:</strong> Chronic neuropathic/myopathic conditions</li>
                                    <li><strong>Mechanism:</strong> Ephaptic transmission between denervated fibers</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Myokymia -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #00796b; margin-bottom: 15px; font-size: 1.1em;">🌊 Myokymic Discharges</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Grouped bursts of the same motor unit with "marching soldiers" sound - often seen in radiation-induced nerve damage.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/ZClcikXOOaU"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #e0f2f1; padding: 15px; border-radius: 8px;">
                                <p style="color: #00695c; font-weight: 600; margin-bottom: 8px;">Clinical Patterns:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Pattern:</strong> Grouped repetitive discharges of same MUAP</li>
                                    <li><strong>Sound:</strong> "Marching soldiers"</li>
                                    <li><strong>Frequency:</strong> 1-5Hz (interburst), 5-60Hz (intraburst)</li>
                                    <li><strong>Associations:</strong> Radiation plexopathy, MS (facial), Guillain-Barré</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Motor Unit Analysis Videos -->
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #1565c0; margin-bottom: 20px; font-size: 1.3em;">⚡ Motor Unit Analysis</h4>

                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <!-- Polyphasic Potentials -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #1565c0; margin-bottom: 15px; font-size: 1.1em;">🔀 Polyphasic Potentials</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Motor units with >4 phases indicating loss of synchrony - seen in both muscle disease and nerve reinnervation.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/liNujyDKe58"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                                <p style="color: #0d47a1; font-weight: 600; margin-bottom: 8px;">Polyphasia Analysis:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Normal:</strong> 2-4 phases (≤10% polyphasic acceptable)</li>
                                    <li><strong>Abnormal:</strong> >10% polyphasic (&gt;25% in deltoid)</li>
                                    <li><strong>Sound:</strong> High-frequency "clicking"</li>
                                    <li><strong>Significance:</strong> Measure of synchrony, seen in both neuropathy and myopathy</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Motor Unit Recruitment -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #1565c0; margin-bottom: 15px; font-size: 1.1em;">📊 Motor Unit Recruitment</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Progressive activation of motor units with increasing force - essential for distinguishing neuropathic vs. myopathic patterns.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/kTJiD1d0NsI"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                                <p style="color: #0d47a1; font-weight: 600; margin-bottom: 8px;">Recruitment Patterns:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Normal ratio:</strong> ~5:1 (firing rate : # of MUAPs)</li>
                                    <li><strong>Reduced recruitment:</strong> Neuropathic (axonal loss)</li>
                                    <li><strong>Early recruitment:</strong> Myopathic (fewer fibers per MU)</li>
                                    <li><strong>Poor activation:</strong> Central (upper motor neuron)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Normal Activity -->
                <div>
                    <h4 style="color: #2e7d32; margin-bottom: 20px; font-size: 1.3em;">✅ Normal Spontaneous Activity</h4>

                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px;">
                        <h5 style="color: #2e7d32; margin-bottom: 15px; font-size: 1.1em;">🎯 End Plate Spike (Normal)</h5>
                        <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                            Normal needle-induced activity at the neuromuscular junction - important to distinguish from pathologic fibrillations.
                        </p>
                        <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                            <iframe loading="lazy" src="https://www.youtube.com/embed/2QgTg8f0pHE"
                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                        </div>
                        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                            <p style="color: #1b5e20; font-weight: 600; margin-bottom: 8px;">Normal Endplate Zone Activity:</p>
                            <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                <li><strong>Endplate noise:</strong> MEPPs, monophasic negative, "seashell" sound</li>
                                <li><strong>Endplate spikes:</strong> Needle-induced, biphasic, initial negative</li>
                                <li><strong>Mechanism:</strong> Terminal nerve twig irritation → muscle fiber AP</li>
                                <li><strong>Key feature:</strong> Initial negativity (vs. fibrillations: initial positive)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comprehensive Pattern Reference Guide -->
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 30px;">
                <h3 style="color: #424242; margin-bottom: 20px; font-size: 1.4em;">📚 Comprehensive Pattern Reference Guide</h3>

                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Pattern</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Source Generator</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Sound</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Firing Rate</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Stability</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Clinical Significance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #d32f2f; font-weight: 500;">Fibrillation</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Muscle fiber</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Rain on tin roof</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">0.5-10 Hz (regular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Active denervation (neuropathy, radiculopathy, motor neuron disease)</td>
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 10px; border: 1px solid #ddd; color: #d32f2f; font-weight: 500;">Positive Sharp Wave</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Muscle fiber</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Dull pops</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">0.5-10 Hz (regular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Active denervation (same as fibrillations)</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #7b1fa2; font-weight: 500;">Complex Repetitive</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Multiple muscle fibers</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Machine-like</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">5-100 Hz (perfectly regular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Usually stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Chronic neuropathic/myopathic conditions</td>
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 10px; border: 1px solid #ddd; color: #00796b; font-weight: 500;">Myokymic</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Motor unit</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Marching soldiers</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">1-5 Hz (interburst)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Usually stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Radiation injury, MS (facial), Guillain-Barré</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #f57c00; font-weight: 500;">Myotonic</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Muscle fiber</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Revving engine</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">20-150 Hz</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Waxing/waning</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Myotonic dystrophy, myotonia congenita</td>
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 10px; border: 1px solid #ddd; color: #1976d2; font-weight: 500;">Fasciculation</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Motor unit</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Corn popping</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Low (0.1-10 Hz)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Motor neuron disease, benign fasciculations</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #388e3c; font-weight: 500;">Endplate Spike</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Terminal axon twig</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Sputtering</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">5-50 Hz (irregular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Normal (needle-induced at endplate zone)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Advanced Clinical Scenarios -->
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                <h3 style="color: #6366f1; margin-bottom: 20px; font-size: 1.3em;">🎯 Advanced Pattern Recognition Scenarios</h3>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #ef4444;">
                        <h4 style="color: #dc2626; margin-bottom: 15px;">Case 1: Motor Neuron Disease</h4>
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                            <strong>Clinical:</strong> 55-year-old with progressive weakness, fasciculations<br>
                            <strong>EMG Findings:</strong> 3+ fibrillations/PSWs, large polyphasic MUAPs, reduced recruitment, fasciculations
                        </p>
                        <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                            <strong style="color: #991b1b;">Key Features:</strong>
                            <ul style="color: #7f1d1d; margin-top: 8px; font-size: 0.9em;">
                                <li>Widespread denervation pattern</li>
                                <li>Chronic reinnervation (large MUAPs)</li>
                                <li>Active denervation (fibs/PSWs)</li>
                                <li>Fasciculations (motor neuron irritability)</li>
                            </ul>
                        </div>
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #8b5cf6;">
                        <h4 style="color: #7c3aed; margin-bottom: 15px;">Case 2: Myotonic Dystrophy</h4>
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                            <strong>Clinical:</strong> 35-year-old with grip myotonia, distal weakness<br>
                            <strong>EMG Findings:</strong> Myotonic discharges, small polyphasic MUAPs, early recruitment
                        </p>
                        <div style="background: #f3e8ff; padding: 12px; border-radius: 8px;">
                            <strong style="color: #6b21a8;">Key Features:</strong>
                            <ul style="color: #6b21a8; margin-top: 8px; font-size: 0.9em;">
                                <li>Characteristic "dive bomber" sound</li>
                                <li>Waxing/waning amplitude and frequency</li>
                                <li>Myopathic MUAPs (small, brief, polyphasic)</li>
                                <li>Early recruitment pattern</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style="background: #eff6ff; padding: 20px; border-radius: 12px; margin-top: 20px;">
                    <h4 style="color: #1e40af; margin-bottom: 15px;">Diagnostic Approach</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div>
                            <strong style="color: #1e40af;">1. Morphology Analysis</strong>
                            <ul style="color: #374151; font-size: 0.9em; margin-top: 8px;">
                                <li>Duration (reflects fiber number)</li>
                                <li>Amplitude (proximity-dependent)</li>
                                <li>Phases (synchrony measure)</li>
                            </ul>
                        </div>
                        <div>
                            <strong style="color: #1e40af;">2. Stability Assessment</strong>
                            <ul style="color: #374151; font-size: 0.9em; margin-top: 8px;">
                                <li>Consistent morphology</li>
                                <li>Blocking patterns</li>
                                <li>Amplitude variations</li>
                            </ul>
                        </div>
                        <div>
                            <strong style="color: #1e40af;">3. Firing Pattern</strong>
                            <ul style="color: #374151; font-size: 0.9em; margin-top: 8px;">
                                <li>Rate and rhythm</li>
                                <li>Recruitment analysis</li>
                                <li>Voluntary vs. spontaneous</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            ${generateModuleQuiz([
        {
            question: "In systematic EMG pattern analysis, what are the THREE key parameters that must be evaluated?",
            options: [
                "Morphology, Stability, and Firing Characteristics",
                "Amplitude, Duration, and Frequency",
                "Sound, Shape, and Speed",
                "Recruitment, Rhythm, and Rate"
            ],
            correct: 0,
            explanation: "The three key parameters for systematic EMG pattern analysis are: (1) MORPHOLOGY (duration, amplitude, phases, initial deflection, shape), (2) STABILITY (consistent vs. waxing/waning), and (3) FIRING CHARACTERISTICS (rate, pattern, rhythm, recruitment, voluntary control)."
        },
        {
            question: "You observe a regular 'machine-like' sound with perfectly repetitive, multi-serrated discharges at 50Hz. Individual spikes are discernible and time-linked. This pattern most likely represents:",
            options: [
                "Complex repetitive discharges",
                "Myokymic discharges",
                "Polyphasic motor unit potentials",
                "Neuromyotonic discharges"
            ],
            correct: 0,
            explanation: "Complex repetitive discharges (CRDs) are characterized by a regular 'machine-like' sound and perfectly repetitive discharges (usually 5-100Hz). They are caused by ephaptic transmission between adjacent muscle fibers."
        },
        {
            question: "A patient with suspected motor neuron disease shows abundant spontaneous activity. Which combination of findings would be MOST supportive of this diagnosis?",
            options: [
                "Fibrillations + large polyphasic MUAPs + fasciculations + reduced recruitment",
                "Myotonic discharges + small MUAPs + early recruitment",
                "Complex repetitive discharges + normal MUAPs",
                "Endplate spikes + normal recruitment"
            ],
            correct: 0,
            explanation: "Motor Neuron Disease (ALS) typically presents with widespread active denervation (fibrillations/PSWs), chronic reinnervation changes (large, polyphasic MUAPs), fasciculations (motor neuron irritability), and reduced recruitment due to loss of motor units."
        },
        {
            question: "What is the characteristic sound of fibrillation potentials on EMG?",
            options: [
                "Machine-like regular pattern",
                "Rain on tin roof",
                "Marching soldiers",
                "Seashell sound"
            ],
            correct: 1,
            explanation: "Fibrillations produce a characteristic 'rain on tin roof' sound. These are brief spikes (1-5ms duration) firing regularly at 0.5-10Hz, indicating active denervation."
        },
        {
            question: "What is the clinical significance of myokymic discharges?",
            options: [
                "Always indicate motor neuron disease",
                "Grouped repetitive discharges of the same MUAP often associated with radiation plexopathy, MS, or Guillain-Barré",
                "Normal finding in healthy muscle",
                "Only seen in myopathies"
            ],
            correct: 1,
            explanation: "Myokymic discharges are grouped repetitive discharges of the same motor unit with a characteristic 'marching soldiers' sound. They are commonly associated with radiation plexopathy, MS (facial), and Guillain-Barré syndrome."
        },
        {
            question: "How can you distinguish endplate spikes (normal) from pathologic fibrillations?",
            options: [
                "Endplate spikes have initial negative deflection; fibrillations have initial positive deflection",
                "Endplate spikes are larger in amplitude",
                "Endplate spikes fire faster",
                "There is no difference"
            ],
            correct: 0,
            explanation: "The KEY DIFFERENTIATOR is the initial deflection: Endplate spikes have an INITIAL NEGATIVE deflection (needle-induced terminal nerve twig irritation), while pathologic fibrillations have an INITIAL POSITIVE deflection."
        },
        {
            question: "Which pattern is characterized by a 'dive bomber' sound and waxing/waning amplitude and frequency?",
            options: [
                "Myotonic discharges",
                "Complex repetitive discharges",
                "Neuromyotonic discharges",
                "Fasciculations"
            ],
            correct: 0,
            explanation: "Myotonic discharges are characterized by a distinctive 'dive bomber' or 'revving engine' sound due to the waxing and waning of both amplitude and frequency. This is seen in myotonic dystrophy and myotonia congenita."
        },
        {
            question: "What constitutes a 'polyphasic' motor unit potential?",
            options: [
                "Greater than 4 phases (baseline crossings + 1)",
                "Greater than 2 phases",
                "Any potential with a negative onset",
                "A potential with high amplitude"
            ],
            correct: 0,
            explanation: "A motor unit potential is considered polyphasic if it has more than 4 phases. While up to 10% of MUAPs can be polyphasic in normal muscle, an increase suggests desynchronization of muscle fiber firing, seen in both myopathy and reinnervation."
        },
        {
            question: "In a patient with severe myopathy, what recruitment pattern would you expect?",
            options: [
                "Early recruitment (full interference pattern at low force)",
                "Reduced recruitment (fast firing rate of few units)",
                "Normal recruitment ratio (5:1)",
                "Poor activation"
            ],
            correct: 0,
            explanation: "Myopathy leads to 'early recruitment'. Because each motor unit produces less force (due to loss of muscle fibers), the CNS recruits many more units than normal for a given level of force, leading to a full interference pattern with minimal effort."
        },
        {
            question: "Neuromyotonic discharges are characterized by:",
            options: [
                "Very high frequency (150-300Hz) decrementing bursts with a 'pinging' sound",
                "Slow, regular firing at 1-2Hz",
                "Waxing and waning amplitude only",
                "Irregular firing with 'popcorn' sound"
            ],
            correct: 0,
            explanation: "Neuromyotonic discharges are high-frequency (150-300Hz) bursts that typically decrement in amplitude, producing a characteristic high-pitched 'pinging' sound. They are seen in syndromes of peripheral nerve hyperexcitability (Isaac's syndrome)."
        }
    ])}

        </div>
    `;
}

