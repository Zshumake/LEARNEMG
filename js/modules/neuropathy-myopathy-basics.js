import { generateErnestButton } from '../../src/modules/audio/AudioData.js';

export function generateContent(module) {
    // Podcast registered automatically via AudioData.js

    // Define content generation functions
    const getMyopathyContent = () => `
        <div style="background: linear-gradient(135deg, #e3f2fd, #f3e5f5); padding: 25px; border-radius: 15px;">
            <h3 style="color: #1565c0; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 10px;">🔬</span>
                Myopathy: EMG & NCS Patterns
            </h3>

            <!-- Definition and Pathophysiology -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #9c27b0;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🧬 What is Myopathy?</h4>
                <p style="color: #495057; margin-bottom: 15px; line-height: 1.6;">
                    <strong>Myopathy</strong> refers to diseases of muscle tissue where the primary pathology affects the muscle fibers themselves,
                    not the nerves that innervate them. The disorder involves dysfunction of the muscle cell membrane, contractile proteins,
                    or cellular metabolism.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #6f42c1; margin-bottom: 10px;">Common Causes</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Inflammatory:</strong> Polymyositis, dermatomyositis</li>
                            <li><strong>Metabolic:</strong> Thyroid disorders, steroid myopathy</li>
                            <li><strong>Genetic:</strong> Muscular dystrophies</li>
                            <li><strong>Toxic:</strong> Statins, alcohol</li>
                            <li><strong>Infectious:</strong> Viral myositis</li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #6f42c1; margin-bottom: 10px;">Typical Symptoms</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Proximal weakness</strong> (shoulders, hips)</li>
                            <li><strong>Symmetric</strong> muscle involvement</li>
                            <li><strong>No sensory symptoms</strong></li>
                            <li><strong>Muscle pain/tenderness</strong> (inflammatory)</li>
                            <li><strong>Difficulty climbing stairs</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Key EMG Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #1565c0;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📈 Classic EMG Findings</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #dc3545; margin-bottom: 10px;">MUAP Characteristics</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>Short duration</strong> (↓)</li>
                            <li><strong>Small amplitude</strong> (↓)</li>
                            <li><strong>Polyphasic</strong> (>5 phases)</li>
                            <li><strong>Early recruitment</strong></li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #28a745; margin-bottom: 10px;">Recruitment Pattern</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>Early/rapid recruitment</strong></li>
                            <li><strong>Full interference pattern</strong></li>
                            <li><strong>Low amplitude</strong></li>
                            <li><strong>Normal firing frequency</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- NCS Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #28a745;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">⚡ NCS Findings</h4>
                <div style="background: #d4edda; padding: 15px; border-radius: 8px;">
                    <p style="margin: 0; color: #155724; font-weight: 600;">
                        ✅ <strong>Usually Normal</strong> - Nerves are intact in pure myopathy
                    </p>
                    <p style="margin: 10px 0 0 0; color: #155724; font-size: 14px;">
                        Exception: Very severe myopathy may show reduced CMAP amplitude
                    </p>
                </div>
            </div>

            <!-- Specific Myopathy Types -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🎯 Specific Myopathy Patterns</h4>

                <div style="margin-bottom: 15px;">
                    <div style="background: #fff3cd; padding: 12px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <h5 style="color: #856404; margin: 0 0 8px 0;">Inflammatory Myopathy</h5>
                        <p style="margin: 0; color: #856404; font-size: 14px;">
                            <strong>Spontaneous Activity:</strong> Fibrillations, positive sharp waves, complex repetitive discharges
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #f8d7da; padding: 12px; border-radius: 8px; border-left: 4px solid #dc3545;">
                        <h5 style="color: #721c24; margin: 0 0 8px 0;">Inclusion Body Myositis</h5>
                        <p style="margin: 0; color: #721c24; font-size: 14px;">
                            <strong>Mixed Pattern:</strong> Both myopathic and neurogenic features (long-duration MUAPs)
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #d1ecf1; padding: 12px; border-radius: 8px; border-left: 4px solid #17a2b8;">
                        <h5 style="color: #0c5460; margin: 0 0 8px 0;">Steroid Myopathy</h5>
                        <p style="margin: 0; color: #0c5460; font-size: 14px;">
                            <strong>Type II Fiber:</strong> Affects fast-twitch fibers, may have minimal EMG changes
                        </p>
                    </div>
                </div>
            </div>

            <!-- Clinical Correlation -->
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 20px; border-radius: 10px; color: white;">
                <h4 style="margin-bottom: 15px;">🩺 Clinical Correlation</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <h5 style="margin-bottom: 10px;">Typical Presentation:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Proximal weakness</li>
                            <li>Preserved reflexes (early)</li>
                            <li>No sensory loss</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 10px;">EMG Strategy:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Sample proximal muscles</li>
                            <li>Look for spontaneous activity</li>
                            <li>Assess MUAP morphology</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    const getNeuropathyContent = () => `
        <div style="background: linear-gradient(135deg, #fff3e0, #ffecb3); padding: 25px; border-radius: 15px;">
            <h3 style="color: #f57c00; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 10px;">⚡</span>
                Neuropathy: EMG & NCS Patterns
            </h3>

            <!-- Definition and Pathophysiology -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #ff9800;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">⚡ What is Neuropathy?</h4>
                <p style="color: #495057; margin-bottom: 15px; line-height: 1.6;">
                    <strong>Neuropathy</strong> refers to disorders affecting peripheral nerves, including motor, sensory, and autonomic fibers.
                    The pathology can involve <strong>axonal damage</strong> (affecting the nerve fiber itself) or <strong>demyelination</strong>
                    (affecting the myelin sheath that insulates the nerve).
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #e65100; margin-bottom: 10px;">Common Causes</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Metabolic:</strong> Diabetes (most common)</li>
                            <li><strong>Autoimmune:</strong> CIDP, Guillain-Barré</li>
                            <li><strong>Toxic:</strong> Chemotherapy, alcohol</li>
                            <li><strong>Compression:</strong> Carpal tunnel, cubital tunnel</li>
                            <li><strong>Hereditary:</strong> CMT, HNPP</li>
                            <li><strong>Infectious:</strong> HIV, Lyme disease</li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #e65100; margin-bottom: 10px;">Typical Symptoms</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Distal weakness</strong> (hands, feet)</li>
                            <li><strong>Sensory symptoms</strong> (numbness, tingling)</li>
                            <li><strong>Length-dependent</strong> pattern</li>
                            <li><strong>Reduced/absent reflexes</strong></li>
                            <li><strong>Burning pain</strong> (small fiber)</li>
                            <li><strong>"Stocking-glove"</strong> distribution</li>
                        </ul>
                    </div>
                </div>

                <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h5 style="color: #e65100; margin-bottom: 10px;">🔬 Pathophysiology Types</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <strong style="color: #d84315;">Axonal:</strong> Nerve fiber damage → ↓ amplitude, normal velocity
                        </div>
                        <div>
                            <strong style="color: #d84315;">Demyelinating:</strong> Myelin damage → ↓ velocity, ↑ latency
                        </div>
                    </div>
                </div>
            </div>

            <!-- NCS Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #f57c00;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📊 Primary NCS Abnormalities</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #dc3545; margin-bottom: 10px;">Axonal Pattern</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>↓ Amplitude</strong> (CMAP/SNAP)</li>
                            <li><strong>Normal velocity</strong></li>
                            <li><strong>Normal latency</strong></li>
                            <li><strong>Length-dependent</strong></li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #28a745; margin-bottom: 10px;">Demyelinating Pattern</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>↓ Velocity</strong> (CV)</li>
                            <li><strong>↑ Latency</strong></li>
                            <li><strong>Conduction block</strong></li>
                            <li><strong>Temporal dispersion</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- EMG Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #28a745;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📈 EMG Changes (Chronic)</h4>
                <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                    <h5 style="color: #2e7d32; margin-bottom: 10px;">Neurogenic Pattern</h5>
                    <ul style="margin: 0; padding-left: 20px; color: #2e7d32;">
                        <li><strong>Large amplitude</strong> MUAPs (reinnervation)</li>
                        <li><strong>Long duration</strong> MUAPs</li>
                        <li><strong>Reduced recruitment</strong></li>
                        <li><strong>High firing frequency</strong></li>
                        <li><strong>Fibrillations/PSWs</strong> (denervation)</li>
                    </ul>
                </div>
            </div>

            <!-- Common Neuropathy Types -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🎯 Common Neuropathy Patterns</h4>

                <div style="margin-bottom: 15px;">
                    <div style="background: #fff3cd; padding: 12px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <h5 style="color: #856404; margin: 0 0 8px 0;">Diabetic Polyneuropathy</h5>
                        <p style="margin: 0; color: #856404; font-size: 14px;">
                            <strong>Distal, symmetric, length-dependent</strong> - Sensory > Motor, Axonal pattern
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #f8d7da; padding: 12px; border-radius: 8px; border-left: 4px solid #dc3545;">
                        <h5 style="color: #721c24; margin: 0 0 8px 0;">Carpal Tunnel Syndrome</h5>
                        <p style="margin: 0; color: #721c24; font-size: 14px;">
                            <strong>Focal demyelinating</strong> - Prolonged median distal latencies, normal ulnar
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #d1ecf1; padding: 12px; border-radius: 8px; border-left: 4px solid #17a2b8;">
                        <h5 style="color: #0c5460; margin: 0 0 8px 0;">CIDP</h5>
                        <p style="margin: 0; color: #0c5460; font-size: 14px;">
                            <strong>Acquired demyelinating</strong> - Multifocal conduction blocks, prolonged F-waves
                        </p>
                    </div>
                </div>
            </div>

            <!-- Clinical Correlation -->
            <div style="background: linear-gradient(135deg, #ff9800, #ff5722); padding: 20px; border-radius: 10px; color: white;">
                <h4 style="margin-bottom: 15px;">🩺 Clinical Correlation</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <h5 style="margin-bottom: 10px;">Typical Presentation:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Distal weakness (usually)</li>
                            <li>Sensory symptoms</li>
                            <li>Reduced/absent reflexes</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 10px;">NCS Strategy:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Multiple nerves</li>
                            <li>Distal and proximal sites</li>
                            <li>F-waves and H-reflexes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    const getComparisonContent = () => `
        <div style="background: linear-gradient(135deg, #f3e5f5, #e8eaf6); padding: 25px; border-radius: 15px;">
            <h3 style="color: #673ab7; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 10px;">📊</span>
                Side-by-Side Comparison
            </h3>

            <!-- Comparison Table -->
            <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #673ab7, #3f51b5);">
                            <th style="padding: 15px; color: white; text-align: left; border-right: 1px solid rgba(255,255,255,0.2);">Parameter</th>
                            <th style="padding: 15px; color: white; text-align: center; border-right: 1px solid rgba(255,255,255,0.2);">🔬 Myopathy</th>
                            <th style="padding: 15px; color: white; text-align: center;">⚡ Neuropathy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">NCS Findings</td>
                            <td style="padding: 12px; text-align: center; color: #28a745;">✅ Usually Normal</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">❌ Abnormal</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">MUAP Duration</td>
                            <td style="padding: 12px; text-align: center; color: #007bff;">⬇️ Short</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">⬆️ Long (chronic)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">MUAP Amplitude</td>
                            <td style="padding: 12px; text-align: center; color: #007bff;">⬇️ Small</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">⬆️ Large (chronic)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Recruitment</td>
                            <td style="padding: 12px; text-align: center; color: #28a745;">⚡ Early/Full</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">🔽 Reduced</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Firing Frequency</td>
                            <td style="padding: 12px; text-align: center; color: #6c757d;">➡️ Normal</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">⬆️ High</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Weakness Pattern</td>
                            <td style="padding: 12px; text-align: center; color: #007bff;">🏠 Proximal</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">👣 Distal (usually)</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Sensory Loss</td>
                            <td style="padding: 12px; text-align: center; color: #28a745;">❌ Absent</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">✅ Present (usually)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Key Learning Points -->
            <div style="margin-top: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: linear-gradient(135deg, #e3f2fd, #f3e5f5); padding: 20px; border-radius: 10px;">
                    <h4 style="color: #1565c0; margin-bottom: 15px;">🎯 Quick Diagnosis Tips</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #2c3e50;">
                        <li><strong>Normal NCS + Proximal weakness</strong> → Think Myopathy</li>
                        <li><strong>Abnormal NCS + Distal weakness</strong> → Think Neuropathy</li>
                        <li><strong>Mixed pattern</strong> → Consider inclusion body myositis</li>
                    </ul>
                </div>

                <div style="background: linear-gradient(135deg, #fff3e0, #ffecb3); padding: 20px; border-radius: 10px;">
                    <h4 style="color: #f57c00; margin-bottom: 15px;">⚠️ Important Exceptions</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #2c3e50;">
                        <li><strong>Severe myopathy</strong> → May have ↓ CMAP</li>
                        <li><strong>Early neuropathy</strong> → May have normal EMG</li>
                        <li><strong>Motor neuron disease</strong> → Normal NCS, neurogenic EMG</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Expose functions to window for inline onclick handlers
    window.showMyopathyTab = function () {
        document.getElementById('myopathy-tab').style.background = '#007bff';
        document.getElementById('myopathy-tab').style.color = 'white';
        document.getElementById('neuropathy-tab').style.background = '#e9ecef';
        document.getElementById('neuropathy-tab').style.color = '#6c757d';
        document.getElementById('comparison-tab').style.background = '#e9ecef';
        document.getElementById('comparison-tab').style.color = '#6c757d';
        document.getElementById('tab-content').innerHTML = getMyopathyContent();
    };

    window.showNeuropathyTab = function () {
        document.getElementById('myopathy-tab').style.background = '#e9ecef';
        document.getElementById('myopathy-tab').style.color = '#6c757d';
        document.getElementById('neuropathy-tab').style.background = '#007bff';
        document.getElementById('neuropathy-tab').style.color = 'white';
        document.getElementById('comparison-tab').style.background = '#e9ecef';
        document.getElementById('comparison-tab').style.color = '#6c757d';
        document.getElementById('tab-content').innerHTML = getNeuropathyContent();
    };

    window.showComparisonTab = function () {
        document.getElementById('myopathy-tab').style.background = '#e9ecef';
        document.getElementById('myopathy-tab').style.color = '#6c757d';
        document.getElementById('neuropathy-tab').style.background = '#e9ecef';
        document.getElementById('neuropathy-tab').style.color = '#6c757d';
        document.getElementById('comparison-tab').style.background = '#007bff';
        document.getElementById('comparison-tab').style.color = 'white';
        document.getElementById('tab-content').innerHTML = getComparisonContent();
    };

    return `
        <div style="max-width: 1000px; margin: 0 auto;">
            ${generateErnestButton('neuropathy-myopathy-basics', 'Neuropathy vs Myopathy')}

            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #2c3e50; margin-bottom: 10px;">🧠 Neuropathy vs Myopathy Basics</h2>
                <p style="color: #5a6c7d; font-size: 16px;">Understanding EMG and NCS patterns in muscle and nerve disorders</p>
            </div>

            <!-- Tab Navigation -->
            <div style="display: flex; margin-bottom: 20px; background: #f8f9fa; border-radius: 10px; padding: 5px;">
                <button id="myopathy-tab" onclick="showMyopathyTab()"
                        style="flex: 1; padding: 12px; border: none; background: #007bff; color: white;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">
                    🔬 Myopathy Patterns
                </button>
                <button id="neuropathy-tab" onclick="showNeuropathyTab()"
                        style="flex: 1; padding: 12px; border: none; background: #e9ecef; color: #6c757d;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; margin-left: 5px;">
                    ⚡ Neuropathy Patterns
                </button>
                <button id="comparison-tab" onclick="showComparisonTab()"
                        style="flex: 1; padding: 12px; border: none; background: #e9ecef; color: #6c757d;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; margin-left: 5px;">
                    📊 Side-by-Side
                </button>
            </div>

            <!-- Tab Content -->
            <div id="tab-content">
                ${getMyopathyContent()}
            </div>

            <!-- Quiz Section -->
            ${generateModuleQuiz([
        {
            question: "What is the hallmark EMG finding in myopathy regarding Motor Unit Action Potentials (MUAPs)?",
            options: [
                "Long duration, large amplitude, polyphasic",
                "Short duration, small amplitude, polyphasic",
                "Normal duration, reduced recruitment",
                "Fasciculations and myokymia"
            ],
            correct: 1,
            explanation: "The hallmark of MYOPATHY is SHORT DURATION, SMALL AMPLITUDE, POLYPHASIC MUAPs. This occurs because muscle fibers are lost or dysfunctional within the motor unit, so the summation of their potentials is smaller and shorter. The polyphasia results from desynchronized firing of the remaining fibers."
        },
        {
            question: "In a typical axonal neuropathy, what is the primary Nerve Conduction Study (NCS) abnormality?",
            options: [
                "Reduced conduction velocity",
                "Prolonged distal latency",
                "Reduced amplitude (CMAP/SNAP)",
                "Conduction block"
            ],
            correct: 2,
            explanation: "In AXONAL NEUROPATHY, the primary finding is REDUCED AMPLITUDE of CMAPs and SNAPs. This reflects the loss of axons. Conduction velocities and distal latencies are typically normal or only mildly slowed (never <75-80% of lower limit of normal) because the remaining axons conduct at normal speeds."
        },
        {
            question: "Which recruitment pattern is characteristic of myopathy?",
            options: [
                "Reduced recruitment (fast firing rate)",
                "Early/Rapid recruitment (full interference pattern at low effort)",
                "Normal recruitment",
                "Absent recruitment"
            ],
            correct: 1,
            explanation: "MYOPATHY is characterized by EARLY/RAPID RECRUITMENT. Because individual motor units produce less force (due to muscle fiber loss), the nervous system must recruit MORE motor units than normal for a given level of force. This leads to a full interference pattern appearing at low effort levels."
        },
        {
            question: "What clinical feature strongly suggests myopathy over neuropathy?",
            options: [
                "Distal weakness and sensory loss",
                "Proximal weakness without sensory loss",
                "Fasciculations and atrophy",
                "Burning pain in feet"
            ],
            correct: 1,
            explanation: "PROXIMAL WEAKNESS (shoulders, hips) WITHOUT SENSORY LOSS is the classic clinical presentation of MYOPATHY. Neuropathies typically present with distal weakness ('stocking-glove' distribution) and often have associated sensory symptoms."
        },
        {
            question: "What is the significance of 'conduction block' on NCS?",
            options: [
                "It indicates axonal loss",
                "It is a sign of focal demyelination",
                "It suggests myopathy",
                "It is a normal variant"
            ],
            correct: 1,
            explanation: "CONDUCTION BLOCK (a significant drop in CMAP amplitude/area between distal and proximal stimulation sites) is a hallmark of FOCAL DEMYELINATION (e.g., in Guillain-Barré, CIDP, or entrapment neuropathies). It indicates that the impulse is blocked at a specific segment of the nerve but the axon is intact distally."
        },
        {
            question: "Which of the following is a common cause of inflammatory myopathy?",
            options: [
                "Diabetes Mellitus",
                "Polymyositis/Dermatomyositis",
                "Charcot-Marie-Tooth disease",
                "Vitamin B12 deficiency"
            ],
            correct: 1,
            explanation: "POLYMYOSITIS and DERMATOMYOSITIS are classic causes of INFLAMMATORY MYOPATHY. They present with proximal weakness, elevated CK, and 'irritable' myopathy on EMG (fibrillations/positive sharp waves + myopathic MUAPs). Diabetes and B12 deficiency cause neuropathy; CMT is a hereditary neuropathy."
        },
        {
            question: "In a neurogenic process (neuropathy), what happens to the firing frequency of motor units?",
            options: [
                "It remains normal",
                "It decreases",
                "It increases (reduced recruitment with high firing rate)",
                "It becomes irregular"
            ],
            correct: 2,
            explanation: "In a NEUROGENIC process, there is REDUCED RECRUITMENT because motor units are lost. To compensate and generate force, the remaining motor units must fire at a HIGHER FREQUENCY. Thus, you see 'reduced recruitment with high firing rates' (fast firing of few units)."
        },
        {
            question: "What is the typical distribution of weakness in diabetic polyneuropathy?",
            options: [
                "Proximal symmetric",
                "Distal symmetric (length-dependent)",
                "Asymmetric multifocal",
                "Bulbar and respiratory"
            ],
            correct: 1,
            explanation: "Diabetic polyneuropathy typically presents as a DISTAL SYMMETRIC, LENGTH-DEPENDENT process ('stocking-glove' pattern). The longest nerves are affected first, so symptoms start in the toes/feet and progress proximally. Hands are affected only after leg symptoms reach the knees."
        },
        {
            question: "Which finding would you expect in Inclusion Body Myositis (IBM)?",
            options: [
                "Purely myopathic units",
                "Normal EMG",
                "Mixed myopathic and neurogenic features (long-duration MUAPs)",
                "Conduction block"
            ],
            correct: 2,
            explanation: "INCLUSION BODY MYOSITIS (IBM) is unique. While it is a myopathy, it often shows 'MIXED' features on EMG. You may see typical small/short myopathic units mixed with LONG-DURATION, LARGE AMPLITUDE units (pseudo-neurogenic) due to chronicity and fiber splitting/reinnervation. It also classically affects distal muscles (finger flexors) unlike other myopathies."
        },
        {
            question: "If NCS are normal but the patient has profound proximal weakness, what is the most likely localization?",
            options: [
                "Axonal neuropathy",
                "Demyelinating neuropathy",
                "Myopathy",
                "Lumbosacral plexopathy"
            ],
            correct: 2,
            explanation: "NORMAL NCS in the setting of WEAKNESS strongly points to MYOPATHY (or NMJ disorder). In pure myopathy, the nerves are intact, so sensory and motor nerve conduction studies are typically normal (unless muscle atrophy is severe enough to reduce CMAP amplitude). Neuropathies and plexopathies would almost always show NCS abnormalities."
        }
    ])}
        </div>
    `;
}
