
export const Pathophysiology = {
    showNeuropathyVsMyopathy() {
        const content = `
        <div style="max-width: 1000px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #2c3e50; margin-bottom: 10px;">🧠 Neuropathy vs Myopathy Basics</h2>
                <p style="color: #5a6c7d; font-size: 16px;">Understanding EMG and NCS patterns in muscle and nerve disorders</p>
            </div>

            <!-- Tab Navigation -->
            <div style="display: flex; margin-bottom: 20px; background: #f8f9fa; border-radius: 10px; padding: 5px;">
                <button id="myopathy-tab" onclick="Pathophysiology.showMyopathyTab()"
                        style="flex: 1; padding: 12px; border: none; background: #007bff; color: white;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">
                    🔬 Myopathy Patterns
                </button>
                <button id="neuropathy-tab" onclick="Pathophysiology.showNeuropathyTab()"
                        style="flex: 1; padding: 12px; border: none; background: #e9ecef; color: #6c757d;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; margin-left: 5px;">
                    ⚡ Neuropathy Patterns
                </button>
                <button id="comparison-tab" onclick="Pathophysiology.showComparisonTab()"
                        style="flex: 1; padding: 12px; border: none; background: #e9ecef; color: #6c757d;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; margin-left: 5px;">
                    📊 Side-by-Side
                </button>
            </div>

            <!-- Tab Content -->
            <div id="tab-content">
                ${getMyopathyContent()}
            </div>
        </div>
        `;

        if (window.showModal) window.showModal('🧠 Neuropathy vs Myopathy Basics', content);
    },

    showMyopathyTab() {
        this.updateTabStyles('myopathy-tab');
        document.getElementById('tab-content').innerHTML = getMyopathyContent();
    },

    showNeuropathyTab() {
        this.updateTabStyles('neuropathy-tab');
        document.getElementById('tab-content').innerHTML = getNeuropathyContent();
    },

    showComparisonTab() {
        this.updateTabStyles('comparison-tab');
        document.getElementById('tab-content').innerHTML = this.getComparisonContent();
    },

    updateTabStyles(activeId) {
        const tabs = ['myopathy-tab', 'neuropathy-tab', 'comparison-tab'];
        tabs.forEach(tabId => {
            const el = document.getElementById(tabId);
            if (!el) return;

            if (tabId === activeId) {
                el.style.background = '#007bff';
                el.style.color = 'white';
            } else {
                el.style.background = '#e9ecef';
                el.style.color = '#6c757d';
            }
        });
    },

    getComparisonContent() {
        return `
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h3 style="color: #2c3e50; margin-bottom: 20px; text-align: center;">📊 Side-by-Side Comparison</h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8f9fa;">
                            <th style="padding: 15px; text-align: left; border-bottom: 2px solid #dee2e6;">Feature</th>
                            <th style="padding: 15px; text-align: left; border-bottom: 2px solid #007bff; color: #007bff;">Neuropathy (Neurogenic)</th>
                            <th style="padding: 15px; text-align: left; border-bottom: 2px solid #6610f2; color: #6610f2;">Myopathy (Myopathic)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;"><strong>CMAP Amplitude</strong></td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">Reduced (Axonal) or Normal (Demyelinating)</td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">Usually Normal (Reduced in severe)</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;"><strong>Spontaneous Activity</strong></td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;">Fibs/PSWs Common</td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;">Fibs/PSWs in Inflammatory types</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;"><strong>MUAP Duration</strong></td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">Increased (Long) ⬆️</td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">Decreased (Short) ⬇️</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;"><strong>MUAP Amplitude</strong></td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;">Increased (Giant) ⬆️</td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;">Decreased (Small) ⬇️</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;"><strong>Recruitment</strong></td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">Reduced (Fast Firing)</td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">Early/Rapid (Full Pattern)</td>
                        </tr>
                         <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;"><strong>Sensory NCS</strong></td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;"> often Abnormal</td>
                            <td style="padding: 12px; border-bottom: 1px solid #e9ecef; background: #f8f9fa;">Normal</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
};

// Internal Helper Functions (Extracted content strings)
function getMyopathyContent() {
    return `
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
}

function getNeuropathyContent() {
    return `
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
                    <li>Sensory loss common</li>
                    <li>Reflexes often absent</li>
                </ul>
            </div>
            <div>
                <h5 style="margin-bottom: 10px;">EMG Strategy:</h5>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Check distal muscles</li>
                    <li>Perform sensory NCS</li>
                    <li>Compare side-to-side</li>
                </ul>
            </div>
        </div>
    </div>
        </div>
    `;
}

// Global Alias
window.Pathophysiology = Pathophysiology;
