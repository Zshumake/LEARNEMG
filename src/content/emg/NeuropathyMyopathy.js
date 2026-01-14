import { generateErnestButton } from '../../modules/audio/AudioData.js';

const generateContent = function (module) {
    // Podcast registered automatically via AudioData.js in the main loader/player

    // ==========================================
    // CONTENT GENERATORS
    // ==========================================

    const getMyopathyContent = () => `
        <div class="nm-content-fade-in">
            <!-- Pathophysiology Card -->
            <div class="nm-card nm-border-left-primary" style="border-left: 5px solid hsl(var(--purple));">
                <div class="nm-card-header">
                    <h4 style="color: hsl(var(--purple));">🧬 What is Myopathy?</h4>
                </div>
                <div class="nm-card-body">
                    <p class="nm-text">
                        <strong>Myopathy</strong> refers to diseases of muscle tissue where the primary pathology affects the muscle fibers themselves,
                        not the nerves that innervate them. The disorder involves dysfunction of the muscle cell membrane, contractile proteins,
                        or cellular metabolism.
                    </p>

                    <div class="nm-grid-2">
                        <div class="nm-sub-card">
                            <h5 style="color: hsl(var(--purple));">Common Causes</h5>
                            <ul class="nm-list">
                                <li><strong>Inflammatory:</strong> Polymyositis, dermatomyositis</li>
                                <li><strong>Metabolic:</strong> Thyroid disorders, steroid myopathy</li>
                                <li><strong>Genetic:</strong> Muscular dystrophies</li>
                                <li><strong>Toxic:</strong> Statins, alcohol</li>
                                <li><strong>Infectious:</strong> Viral myositis</li>
                            </ul>
                        </div>
                        <div class="nm-sub-card">
                            <h5 style="color: hsl(var(--purple));">Typical Symptoms</h5>
                            <ul class="nm-list">
                                <li><strong>Proximal weakness</strong> (shoulders, hips)</li>
                                <li><strong>Symmetric</strong> muscle involvement</li>
                                <li><strong>No sensory symptoms</strong></li>
                                <li><strong>Muscle pain/tenderness</strong> (inflammatory)</li>
                                <li><strong>Difficulty climbing stairs</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Findings Grid -->
            <div class="nm-grid-2">
                <!-- EMG Findings -->
                <div class="nm-card nm-border-left-primary">
                    <div class="nm-card-header">
                        <h4 style="color: hsl(var(--primary));">📈 Classic EMG Findings</h4>
                    </div>
                    <div class="nm-card-body">
                        <div class="nm-highlight-box margin-bottom">
                            <h5 style="color: hsl(var(--red));">MUAP Characteristics</h5>
                            <ul class="nm-list">
                                <li><strong>Short duration</strong> (↓)</li>
                                <li><strong>Small amplitude</strong> (↓)</li>
                                <li><strong>Polyphasic</strong> (>5 phases)</li>
                                <li><strong>Early recruitment</strong></li>
                            </ul>
                        </div>
                        <div class="nm-highlight-box">
                            <h5 style="color: hsl(var(--green));">Recruitment Pattern</h5>
                            <ul class="nm-list">
                                <li><strong>Early/rapid recruitment</strong></li>
                                <li><strong>Full interference pattern</strong></li>
                                <li><strong>Low amplitude</strong></li>
                                <li><strong>Normal firing frequency</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- NCS Findings -->
                <div class="nm-card nm-border-left-primary" style="border-left-color: hsl(var(--green));">
                    <div class="nm-card-header">
                        <h4 style="color: hsl(var(--green-dark));">⚡ NCS Findings</h4>
                    </div>
                    <div class="nm-card-body" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                        <div class="nm-status-box success">
                            <p class="nm-status-main">
                                ✅ <strong>Usually Normal</strong>
                            </p>
                            <p class="nm-status-sub">
                                Nerves are intact in pure myopathy.<br>
                                <span style="font-size: 0.85em; opacity: 0.8;">(Severe cases may show reduced CMAP amp)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Specific Patterns -->
            <div class="nm-card">
                <div class="nm-card-header">
                    <h4>🎯 Specific Myopathy Patterns</h4>
                </div>
                <div class="nm-card-body">
                    <div class="nm-info-row warning">
                        <strong>Inflammatory Myopathy:</strong> Spontaneous activity (fibs, PSWs, CRDs)
                    </div>
                    <div class="nm-info-row danger">
                        <strong>Inclusion Body Myositis:</strong> Mixed pattern (myopathic + neurogenic features)
                    </div>
                    <div class="nm-info-row info">
                        <strong>Steroid Myopathy:</strong> Type II fiber atrophy (may have minimal EMG changes)
                    </div>
                </div>
            </div>

             <!-- Clinical Correlation -->
            <div class="nm-gradient-card purple">
                <h4 class="nm-gradient-title">🩺 Clinical Correlation</h4>
                <div class="nm-grid-2">
                    <div>
                        <h5>Typical Presentation:</h5>
                        <ul class="nm-white-list">
                            <li>Proximal weakness</li>
                            <li>Preserved reflexes (early)</li>
                            <li>No sensory loss</li>
                        </ul>
                    </div>
                    <div>
                        <h5>EMG Strategy:</h5>
                        <ul class="nm-white-list">
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
        <div class="nm-content-fade-in">
             <!-- Pathophysiology Card -->
            <div class="nm-card nm-border-left-secondary">
                <div class="nm-card-header">
                    <h4 style="color: hsl(var(--secondary-dark));">⚡ What is Neuropathy?</h4>
                </div>
                <div class="nm-card-body">
                    <p class="nm-text">
                        <strong>Neuropathy</strong> refers to disorders affecting peripheral nerves (motor, sensory, autonomic).
                        Pathology involves <strong>axonal damage</strong> (fiber loss) or <strong>demyelination</strong> (myelin loss).
                    </p>

                    <div class="nm-grid-2">
                        <div class="nm-sub-card">
                             <h5 style="color: hsl(var(--secondary-dark));">Common Causes</h5>
                            <ul class="nm-list">
                                <li><strong>Metabolic:</strong> Diabetes</li>
                                <li><strong>Autoimmune:</strong> CIDP, GBS</li>
                                <li><strong>Toxic:</strong> Chemo, Alcohol</li>
                                <li><strong>Compression:</strong> CTS, Une</li>
                            </ul>
                        </div>
                        <div class="nm-sub-card">
                             <h5 style="color: hsl(var(--secondary-dark));">Typical Symptoms</h5>
                            <ul class="nm-list">
                                <li><strong>Distal weakness</strong> (hands/feet)</li>
                                <li><strong>Sensory loss</strong> (stocking-glove)</li>
                                <li><strong>Reduced reflexes</strong></li>
                                <li><strong>Length-dependent</strong></li>
                            </ul>
                        </div>
                    </div>
                     <div class="nm-highlight-box margin-top" style="background: hsl(var(--secondary-light)); border-left: 3px solid hsl(var(--secondary));">
                        <div class="nm-grid-2">
                            <div><strong style="color: hsl(var(--secondary-dark));">Axonal:</strong> Nerve fiber damage → ↓ Amplitude</div>
                            <div><strong style="color: hsl(var(--secondary-dark));">Demyelinating:</strong> Myelin damage → ↓ Velocity</div>
                        </div>
                    </div>
                </div>
            </div>

             <!-- Findings Grid -->
            <div class="nm-grid-2">
                <!-- NCS Findings -->
                <div class="nm-card nm-border-left-secondary">
                    <div class="nm-card-header">
                        <h4 style="color: hsl(var(--secondary-dark));">📊 Primary NCS Abnormalities</h4>
                    </div>
                    <div class="nm-card-body">
                         <div class="nm-highlight-box margin-bottom">
                            <h5 style="color: hsl(var(--red));">Axonal Pattern</h5>
                            <ul class="nm-list">
                                <li><strong>↓ Amplitude</strong> (CMAP/SNAP)</li>
                                <li><strong>Normal velocity</strong></li>
                                <li><strong>Normal latency</strong></li>
                            </ul>
                        </div>
                        <div class="nm-highlight-box">
                            <h5 style="color: hsl(var(--green-dark));">Demyelinating Pattern</h5>
                            <ul class="nm-list">
                                <li><strong>↓ Velocity</strong> (CV)</li>
                                <li><strong>↑ Latency</strong></li>
                                <li><strong>Conduction block</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- EMG Findings -->
                <div class="nm-card nm-border-left-secondary" style="border-left-color: hsl(var(--green));">
                    <div class="nm-card-header">
                        <h4 style="color: hsl(var(--green-dark));">📈 EMG Changes (Chronic)</h4>
                    </div>
                    <div class="nm-card-body">
                        <div class="nm-highlight-box success-light">
                             <h5 style="color: hsl(var(--green-dark));">Neurogenic Pattern</h5>
                             <ul class="nm-list">
                                <li><strong>Large amplitude</strong> MUAPs</li>
                                <li><strong>Long duration</strong> MUAPs</li>
                                <li><strong>Reduced recruitment</strong></li>
                                <li><strong>High firing frequency</strong></li>
                                <li><strong>Fibs/PSWs</strong> (denervation)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Specific Patterns -->
            <div class="nm-card">
                <div class="nm-card-header">
                    <h4>🎯 Common Neuropathy Patterns</h4>
                </div>
                <div class="nm-card-body">
                    <div class="nm-info-row warning">
                        <strong>Diabetic Polyneuropathy:</strong> Distal, symmetric, length-dependent, axonal.
                    </div>
                    <div class="nm-info-row danger">
                        <strong>Carpal Tunnel Syndrome:</strong> Focal demyelinating (median nerve at wrist).
                    </div>
                    <div class="nm-info-row info">
                         <strong>CIDP:</strong> Acquired demyelinating, multifocal conduction blocks.
                    </div>
                </div>
            </div>

             <!-- Clinical Correlation -->
            <div class="nm-gradient-card orange">
                <h4 class="nm-gradient-title">🩺 Clinical Correlation</h4>
                <div class="nm-grid-2">
                    <div>
                        <h5>Typical Presentation:</h5>
                        <ul class="nm-white-list">
                            <li>Distal weakness (usually)</li>
                            <li>Sensory symptoms</li>
                            <li>Reduced/absent reflexes</li>
                        </ul>
                    </div>
                    <div>
                        <h5>NCS Strategy:</h5>
                        <ul class="nm-white-list">
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
        <div class="nm-content-fade-in">
             <div class="nm-card">
                 <div class="nm-card-header centered">
                    <h3 style="color: hsl(var(--accent));">📊 Side-by-Side Comparison</h3>
                    <p style="color: #64748b; font-size: 0.9em; margin-top: 5px;">Key electrodiagnostic differences between neurogenic and myopathic disorders</p>
                </div>
                <div class="nm-table-container">
                    <table class="nm-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th class="col-myo">🔬 Myopathy</th>
                                <th class="col-neuro">⚡ Neuropathy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- NCS Findings Group -->
                            <tr style="background: #f8fafc;">
                                <td colspan="3" style="padding: 10px 15px; font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0;">Nerve Conduction Studies (NCS)</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">CMAP Amplitude</td>
                                <td class="success-text">
                                    <span style="display: block;">✅ Usually Normal</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Reduced only in severe cases</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">⬇️ Reduced (Axonal)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Normal in demyelinating</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Sensory NCS (SNAP)</td>
                                <td class="success-text">
                                    <span style="display: block;">✅ Always Normal</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Primary muscle pathology</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">❌ Often Abnormal</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">If lesion is post-ganglionic</span>
                                </td>
                            </tr>

                            <!-- Needle EMG Findings Group -->
                            <tr style="background: #f8fafc;">
                                <td colspan="3" style="padding: 10px 15px; font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0;">Needle EMG (Rest & Activity)</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Spontaneous Activity</td>
                                <td style="color: #ea580c; font-weight: 600;">
                                    <span style="display: block;">Variable</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Seen in inflammatory types</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">Common (Fibs/PSWs)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Denervation pattern after 3+ weeks</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">MUAP Duration</td>
                                <td class="primary-text">
                                    <span style="display: block;">⬇️ Short Duration</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Loss of muscle fibers</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">⬆️ Long Duration</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Chronic reinnervation</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">MUAP Amplitude</td>
                                <td class="primary-text">
                                    <span style="display: block;">⬇️ Low (Small)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Reduced fiber density</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">⬆️ High (Giant)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Increased fiber/MU ratio</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Polyphasia</td>
                                <td class="primary-text">
                                    <span style="display: block;">⬆️ Increased</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Loss of fiber synchrony</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">⬆️ Increased</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Imperfect reinnervation</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Recruitment</td>
                                <td class="success-text">
                                    <span style="display: block;">⚡ Early / Rapid</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Full pattern at low effort</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">🔽 Reduced (Discrete)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Too few units available</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Firing Frequency</td>
                                <td class="text-muted">
                                    <span style="display: block;">➡️ Usually Normal</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Stable firing rate</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">⬆️ Increased (Fast)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Units fire faster to compensate</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Localization</td>
                                <td class="primary-text">🏠 Proximal</td>
                                <td class="danger-text">👣 Distal (Usually)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Summary Pro-Tip -->
            <div class="nm-gradient-card orange-light text-dark margin-top" style="border-left: 5px solid hsl(var(--secondary));">
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <span style="font-size: 24px;">💡</span>
                    <div>
                        <h4 style="color: hsl(var(--secondary-dark)); margin: 0 0 5px 0;">Electrophysiological Rule of Thumb</h4>
                        <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
                            In <strong>Neuropathy</strong>, think "Too Few units firing Too Fast".<br>
                            In <strong>Myopathic</strong> disorders, think "Too Many units for Too Little force".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inline global function for tab switching
    window.showTab = function (tabName) {
        const contentMap = {
            'myopathy': getMyopathyContent(),
            'neuropathy': getNeuropathyContent(),
            'comparison': getComparisonContent()
        };

        const container = document.getElementById('tab-content-container');
        const activeTab = document.querySelector('.nm-tab.active');
        const newTab = document.getElementById(`${tabName}-tab`);

        if (activeTab === newTab) return;

        // Transition logic
        container.style.opacity = '0';
        container.style.transform = 'translateY(10px)';

        setTimeout(() => {
            document.querySelectorAll('.nm-tab').forEach(btn => btn.classList.remove('active'));
            newTab.classList.add('active');

            container.innerHTML = contentMap[tabName];

            requestAnimationFrame(() => {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            });
        }, 200);
    };

    // ==========================================
    // MAIN RENDER WITH PREMIUM CSS
    // ==========================================
    return `
        <style>
            :root {
                /* HSL Palette */
                --primary: 220 90% 56%;      /* Blue */
                --primary-dark: 220 90% 40%;
                --secondary: 35 95% 55%;     /* Orange/Amber */
                --secondary-light: 40 100% 94%;
                --secondary-dark: 25 100% 45%;
                --accent: 270 80% 60%;       /* Purple */
                --purple: 270 60% 50%;
                --green: 145 65% 45%;
                --green-dark: 145 75% 35%;
                --red: 350 80% 55%;
                --surface: 215 25% 97%;
                --glass: rgba(255, 255, 255, 0.85);
                --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
                --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
                --radius: 16px;
            }

            .nm-module-wrapper {
                max-width: 1000px;
                margin: 0 auto;
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                color: #1e293b;
                line-height: 1.6;
            }

            /* --- Header --- */
            .nm-gradient-header {
                padding: 40px;
                text-align: center;
                background: linear-gradient(135deg, hsl(220, 40%, 20%), hsl(220, 40%, 15%));
                color: white;
                border-radius: 20px;
                margin-bottom: 30px;
                box-shadow: var(--shadow-md);
                position: relative;
                overflow: hidden;
            }
            .nm-gradient-header::after {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 45%, transparent 50%);
                pointer-events: none;
            }

            /* --- Tabs --- */
            .nm-tabs-container {
                display: flex;
                background: white;
                padding: 6px;
                border-radius: 18px;
                box-shadow: var(--shadow-sm);
                gap: 8px;
                margin-bottom: 30px;
            }
            .nm-tab {
                flex: 1;
                padding: 12px;
                border: none;
                background: transparent;
                color: #64748b; /* Slate 500 */
                font-weight: 600;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 1rem;
            }
            .nm-tab:hover:not(.active) {
                background: #f1f5f9;
                color: #334155;
            }
            .nm-tab.active {
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            /* Tab Specific Active Colors */
            #myopathy-tab.active { background: hsl(var(--primary)); color: white; }
            #neuropathy-tab.active { background: hsl(var(--secondary)); color: white; }
            #comparison-tab.active { background: hsl(var(--accent)); color: white; }

            /* --- Content & Cards --- */
            .nm-content-fade-in {
                animation: fadeIn 0.4s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .nm-card {
                background: white;
                border-radius: var(--radius);
                padding: 0;
                box-shadow: var(--shadow-sm);
                margin-bottom: 25px;
                border: 1px solid #e2e8f0;
                overflow: hidden;
            }
            .nm-card-header {
                padding: 20px 25px;
                border-bottom: 1px solid #f1f5f9;
                background: #fcfcfc;
            }
            .nm-card-header.centered { text-align: center; }
            .nm-card-header h4 { margin: 0; font-size: 1.25rem; font-weight: 700; }
            .nm-card-body { padding: 25px; }

            /* Border Accents */
            .nm-border-left-primary { border-left: 5px solid hsl(var(--primary)); }
            .nm-border-left-secondary { border-left: 5px solid hsl(var(--secondary)); }

            /* Grid System */
            .nm-grid-2 {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            @media (max-width: 768px) { .nm-grid-2 { grid-template-columns: 1fr; } }

            /* Helpers */
            .margin-bottom { margin-bottom: 15px; }
            .margin-top { margin-top: 15px; }

            /* Typography & Lists */
            .nm-text { color: #475569; margin-bottom: 15px; }
            .nm-list {
                margin: 0;
                padding-left: 20px;
                color: #475569; /* Slate 600 */
                font-size: 0.95rem;
            }
            .nm-list li { margin-bottom: 6px; }

            /* Components: Status Box */
            .nm-status-box {
                padding: 20px;
                border-radius: 12px;
                text-align: center;
                width: 100%;
            }
            .nm-status-box.success { background: #dcfce7; color: #166534; }
            .nm-status-main { font-size: 1.2rem; margin-bottom: 5px; }
            .nm-status-sub { font-size: 0.95rem; opacity: 0.9; margin: 0; }

            /* Components: Highlight Box */
            .nm-highlight-box {
                background: #f8fafc;
                padding: 15px;
                border-radius: 12px;
                border: 1px solid #f1f5f9;
            }
            .nm-highlight-box h5 { margin: 0 0 10px 0; font-size: 1rem; font-weight: 700; }
            .nm-highlight-box.success-light { background: #f0fdf4; }

            /* Components: Info Row */
            .nm-info-row {
                padding: 12px 15px;
                border-radius: 8px;
                margin-bottom: 10px;
                font-size: 0.95rem;
                border-left: 4px solid #ccc;
                background: #f9fafb;
            }
            .nm-info-row.warning { border-color: hsl(var(--secondary)); background: hsl(var(--secondary-light)); color: #7c2d12; }
            .nm-info-row.danger { border-color: hsl(var(--red)); background: #fef2f2; color: #991b1b; }
            .nm-info-row.info { border-color: #0ea5e9; background: #f0f9ff; color: #075985; }

            /* Components: Gradient Cards */
            .nm-gradient-card {
                padding: 25px;
                border-radius: var(--radius);
                color: white;
                margin-bottom: 25px;
                box-shadow: var(--shadow-md);
            }
            .nm-gradient-card.purple { background: linear-gradient(135deg, hsl(250, 60%, 55%), hsl(270, 60%, 50%)); }
            .nm-gradient-card.orange { background: linear-gradient(135deg, hsl(var(--secondary)), hsl(20, 90%, 50%)); }
            .nm-gradient-card.blue-light { background: linear-gradient(135deg, #e0f2fe, #bfdbfe); border: 1px solid #bae6fd; }
            .nm-gradient-card.orange-light { background: linear-gradient(135deg, #ffedd5, #fed7aa); border: 1px solid #fed7aa; }
            .nm-gradient-card.text-dark { color: #1e293b; }

            .nm-gradient-title { margin: 0 0 15px 0; font-size: 1.2rem; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px; }
            .nm-white-list { margin: 0; padding-left: 20px; color: rgba(255,255,255,0.95); }
            .nm-white-list li { margin-bottom: 5px; }

            /* Components: Comparison Table */
            .nm-table-container { overflow-x: auto; }
            .nm-table { width: 100%; border-collapse: separate; border-spacing: 0; }
            .nm-table th { padding: 15px; text-align: left; background: #f8fafc; color: #64748b; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
            .nm-table td { padding: 15px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
            .nm-table th.col-myo { color: hsl(var(--primary)); text-align: center; background: #eff6ff; }
            .nm-table th.col-neuro { color: hsl(var(--secondary-dark)); text-align: center; background: #fff7ed; }
            .nm-table td { text-align: center; }
            .nm-table td:first-child { text-align: left; background: #fcfcfc; }
            
            .success-text { color: hsl(var(--green)); font-weight: 600; }
            .danger-text { color: hsl(var(--red)); font-weight: 600; }
            .primary-text { color: hsl(var(--primary)); font-weight: 600; }
            .fw-bold { font-weight: 600; color: #334155; }

            #tab-content-container {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
            }
        </style>

        <div class="nm-module-wrapper">
            ${generateErnestButton('neuropathy-myopathy-basics', 'Neuropathy vs Myopathy')}

            <div class="nm-gradient-header">
                <h2 style="margin: 0; font-size: 2.2em; font-weight: 800; letter-spacing: -0.025em;">🧠 Neuropathy vs Myopathy</h2>
                <p style="margin: 10px 0 0 0; opacity: 0.8; font-size: 1.1em; font-weight: 500;">Differential Localization Masterclass</p>
            </div>

            <!-- Tab Navigation -->
            <div class="nm-tabs-container">
                <button id="myopathy-tab" onclick="window.showTab('myopathy')" class="nm-tab active">
                    <span style="font-size: 1.2em;">🔬</span> Myopathy
                </button>
                <button id="neuropathy-tab" onclick="window.showTab('neuropathy')" class="nm-tab">
                    <span style="font-size: 1.2em;">⚡</span> Neuropathy
                </button>
                <button id="comparison-tab" onclick="window.showTab('comparison')" class="nm-tab">
                    <span style="font-size: 1.2em;">📊</span> Deep Comparison
                </button>
            </div>

            <!-- Tab Content Area -->
            <div id="tab-content-container">
                ${getMyopathyContent()}
            </div>

            <!-- Interactive Quiz Section -->
            <div class="margin-top">
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
            explanation: "The hallmark of MYOPATHY is SHORT DURATION, SMALL AMPLITUDE, POLYPHASIC MUAPs. This reflects the loss of muscle fibers within the motor unit."
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
            explanation: "In AXONAL NEUROPATHY, the primary finding is REDUCED AMPLITUDE of CMAPs and SNAPs, reflecting axon loss. Velocities are usually preserved."
        },
        {
            question: "Which recruitment pattern is characteristic of myopathy?",
            options: [
                "Reduced recruitment (fast firing rate)",
                "Early/Rapid recruitment",
                "Normal recruitment",
                "Absent recruitment"
            ],
            correct: 1,
            explanation: "MYOPATHY is characterized by EARLY/RAPID RECRUITMENT. The CNS recruits more motor units to compensate for the weakness of individual units."
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
            explanation: "PROXIMAL WEAKNESS (shoulders, hips) WITHOUT SENSORY LOSS is the classic sign of MYOPATHY. Neuropathy is typically distal."
        },
        {
            question: "What does 'conduction block' on NCS suggest?",
            options: [
                "Axonal loss",
                "Focal demyelination",
                "Myopathy",
                "NMJ disorder"
            ],
            correct: 1,
            explanation: "CONDUCTION BLOCK suggests FOCAL DEMYELINATION (e.g., GBS, CIDP, entrapment). The signal is blocked at a specific point but the axon is intact."
        },
        {
            question: "Polymyositis is an example of which type of disorder?",
            options: [
                "Inflammatory Myopathy",
                "Hereditary Neuropathy",
                "Metabolic Neuropathy",
                "NMJ Disorder"
            ],
            correct: 0,
            explanation: "Polymyositis is a classic INFLAMMATORY MYOPATHY, presenting with proximal weakness and 'irritable' EMG features."
        },
        {
            question: "What happens to firing frequency in a neurogenic process (neuropathy)?",
            options: [
                "Remains normal",
                "Decreases",
                "Increases (high firing rate)",
                "Becomes chaotic"
            ],
            correct: 2,
            explanation: "In NEUROGENIC processes, the remaining motor units fire at a HIGHER FREQUENCY to compensate for the loss of other units."
        },
        {
            question: "Diabetic polyneuropathy typically follows which pattern?",
            options: [
                "Proximal symmetric",
                "Distal symmetric (length-dependent)",
                "Mononeuritis multiplex",
                "Global plexopathy"
            ],
            correct: 1,
            explanation: "Diabetic polyneuropathy is typically DISTAL SYMMETRIC and LENGTH-DEPENDENT ('stocking-glove')."
        },
        {
            question: "Inclusion Body Myositis (IBM) may show which unique EMG feature?",
            options: [
                "Purely myopathic units",
                "Normal EMG",
                "Mixed myopathic and neurogenic features",
                "Conduction block"
            ],
            correct: 2,
            explanation: "IBM often shows MIXED features: myopathic units mixed with 'pseudo-neurogenic' (long duration) units due to chronicity."
        },
        {
            question: "Normal NCS with proximal weakness suggests:",
            options: [
                "Axonal neuropathy",
                "Demyelinating neuropathy",
                "Myopathy",
                "Radiculopathy"
            ],
            correct: 2,
            explanation: "Normal NCS + Weakness = MYOPATHY (or NMJ). Neuropathies almost always cause NCS abnormalities."
        }
    ])}
            </div>
        </div>
    `;
}

export const NeuropathyMyopathy = { generateContent };
