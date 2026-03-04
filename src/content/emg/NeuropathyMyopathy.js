
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
                    <h4 style="color: hsl(var(--purple)); display: flex; align-items: center; gap: 8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        What is Myopathy?
                    </h4>
                </div>
                <div class="nm-card-body">
                    <p class="nm-text">
                        <strong>Myopathy</strong> refers to diseases of muscle tissue where the primary pathology affects the <strong>muscle fibers</strong> themselves,
                        rather than the nerves that control them. In a myopathy, the structural integrity or metabolic function of the muscle cell is compromised.
                    </p>

                    <div class="nm-grid-2">
                        <div class="nm-sub-card">
                            <h5 style="color: hsl(var(--purple));">Common Causes</h5>
                            <ul class="nm-list">
                                <li><strong>Inflammatory:</strong> Polymyositis, dermatomyositis (immune system attacks muscle)</li>
                                <li><strong>Metabolic:</strong> Thyroid disorders, steroid-induced muscle loss</li>
                                <li><strong>Genetic:</strong> Muscular dystrophies (inherited structural defects)</li>
                                <li><strong>Toxic:</strong> Statins, alcohol-induced damage</li>
                                <li><strong>Infectious:</strong> Viral-induced inflammation (myositis)</li>
                            </ul>
                        </div>
                        <div class="nm-sub-card">
                            <h5 style="color: hsl(var(--purple));">Typical Symptoms</h5>
                            <ul class="nm-list">
                                <li><strong>Proximal weakness</strong> (Difficulty with shoulders and hips)</li>
                                <li><strong>Symmetric</strong> involvement (Affects both sides equally)</li>
                                <li><strong>No sensory symptoms</strong> (Numbness/tingling are absent)</li>
                                <li><strong>Muscle pain/tenderness</strong> (Especially in inflammatory types)</li>
                                <li><strong>Functional impact:</strong> Difficulty climbing stairs or rising from a chair</li>
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
                        <h4 style="color: hsl(var(--primary)); display: flex; align-items: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                            Classic Electromyography (EMG) Findings
                        </h4>
                    </div>
                    <div class="nm-card-body">
                        <div class="nm-highlight-box margin-bottom">
                            <h5 style="color: hsl(var(--red));">Motor Unit Action Potential (MUAP)</h5>
                            <p style="font-size: 0.85em; color: #64748b; margin-bottom: 10px;">The MUAP represents the collective electrical activity of muscle fibers controlled by one nerve.</p>
                            <ul class="nm-list">
                                <li><strong>Short duration:</strong> Indicates fewer functioning muscle fibers per unit</li>
                                <li><strong>Small amplitude:</strong> Lower total voltage output from the unit</li>
                                <li><strong>Polyphasic:</strong> (>5 baseline crossings) due to asynchronous fiber firing</li>
                            </ul>
                        </div>
                        <div class="nm-highlight-box">
                            <h5 style="color: hsl(var(--green));">Recruitment Pattern</h5>
                            <ul class="nm-list">
                                <li><strong>Early/Rapid recruitment:</strong> CNS activates "too many" units for small tasks to compensate for unit weakness</li>
                                <li><strong>Full interference pattern:</strong> Screen fills with activity even with minimal effort</li>
                                <li><strong>Low amplitude:</strong> The busy screen remains "short" in height</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- NCS Findings -->
                <div class="nm-card nm-border-left-primary" style="border-left-color: hsl(var(--green));">
                    <div class="nm-card-header">
                        <h4 style="color: hsl(var(--green-dark)); display: flex; align-items: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3-4 5h8l-4 5M8 11l-4 5h8l-4 5"/></svg>
                            Nerve Conduction Study (NCS)
                        </h4>
                    </div>
                    <div class="nm-card-body" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                        <div class="nm-status-box success">
                            <div class="nm-status-main" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                <strong>Usually Normal</strong>
                            </div>
                            <p class="nm-status-sub">
                                Because the pathology is in the muscle, the nerves themselves typically conduct signals at normal speeds and amplitudes.
                                <br><span style="font-size: 0.85em; opacity: 0.8;">(Exceptionally severe cases may show low CMAP amplitudes)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Specific Patterns -->
            <div class="nm-card">
                <div class="nm-card-header">
                    <h4 style="display: flex; align-items: center; gap: 8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                        Specific Myopathy Sub-types
                    </h4>
                </div>
                <div class="nm-card-body">
                    <div class="nm-info-row warning">
                        <strong>Inflammatory Myopathy:</strong> Often shows "irritable" spontaneous activity (Fibrillations, Positive Sharp Waves).
                    </div>
                    <div class="nm-info-row danger">
                        <strong>Inclusion Body Myositis (IBM):</strong> A unique "mixed" pattern showing both myopathic and chronic neurogenic features.
                    </div>
                    <div class="nm-info-row info">
                        <strong>Steroid Myopathy:</strong> Affects specific fiber types; may result in a surprisingly normal-looking EMG despite clinical weakness.
                    </div>
                </div>
            </div>

             <!-- Clinical Correlation -->
            <div class="nm-gradient-card purple">
                <h4 class="nm-gradient-title" style="display: flex; align-items: center; gap: 8px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1a.3.3 0 1 0 .2-.3"/><path d="M13 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="3 9 2 9 7 14"/><path d="M10.2 3.2C12 3.2 13.4 4.5 13.5 6.2a4.6 4.6 0 0 1 2.1-.8c2 .2 3.4 2 3.4 4 0 .2 0 .5-.1.7.9.5 1.5 1.5 1.5 2.6a2.8 2.8 0 0 1-2.8 2.8H13"/><path d="M12 9.8V15"/></svg>
                    Clinical Summary
                </h4>
                <div class="nm-grid-2">
                    <div>
                        <h5>Typical Presentation:</h5>
                        <ul class="nm-white-list">
                            <li>Proximal muscle weakness</li>
                            <li>Preserved reflexes (until late stages)</li>
                            <li>Absence of sensory loss</li>
                        </ul>
                    </div>
                    <div>
                        <h5>EMG Strategy:</h5>
                        <ul class="nm-white-list">
                            <li>Focus on proximal muscles (e.g., Deltoid, Iliopsoas)</li>
                            <li>Listen for "irritable" spontaneous sounds</li>
                            <li>Measure MUAP duration and phases carefully</li>
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
                    <h4 style="color: hsl(var(--secondary-dark)); display: flex; align-items: center; gap: 8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        What is Neuropathy?
                    </h4>
                </div>
                <div class="nm-card-body">
                    <p class="nm-text">
                        <strong>Neuropathy</strong> refers to disorders affecting the peripheral nerves (motor, sensory, or autonomic).
                        The damage typically falls into two categories: <strong>Axonal damage</strong> (physical loss of nerve fibers) or 
                        <strong>Demyelination</strong> (loss of the protective myelin sheath).
                    </p>

                    <div class="nm-grid-2">
                        <div class="nm-sub-card">
                             <h5 style="color: hsl(var(--secondary-dark));">Common Causes</h5>
                            <ul class="nm-list">
                                <li><strong>Metabolic:</strong> Diabetes Mellitus (most common distal neuropathy)</li>
                                <li><strong>Autoimmune:</strong> Chronic Inflammatory Demyelinating Polyneuropathy (CIDP), Guillain-Barré Syndrome (GBS)</li>
                                <li><strong>Toxic/Drug:</strong> Chemotherapy agents, excessive Alcohol intake</li>
                                <li><strong>Compression:</strong> Carpal Tunnel Syndrome (Wrist), Ulnar Neuropathy (Elbow)</li>
                            </ul>
                        </div>
                        <div class="nm-sub-card">
                             <h5 style="color: hsl(var(--secondary-dark));">Typical Symptoms</h5>
                            <ul class="nm-list">
                                <li><strong>Distal weakness:</strong> Weakness begins in the hands and feet</li>
                                <li><strong>Sensory loss:</strong> "Stocking-glove" distribution of numbness</li>
                                <li><strong>Reduced reflexes:</strong> Diminished deep tendon reflexes</li>
                                <li><strong>Length-dependent:</strong> The longest nerves (to the feet) are usually affected first</li>
                            </ul>
                        </div>
                    </div>
                     <div class="nm-highlight-box margin-top" style="background: hsl(var(--secondary-light)); border-left: 3px solid hsl(var(--secondary));">
                        <div class="nm-grid-2">
                            <div><strong style="color: hsl(var(--secondary-dark));">Axonal:</strong> Nerve "wire" breaks → <strong>Decreased Amplitude</strong></div>
                            <div><strong style="color: hsl(var(--secondary-dark));">Demyelinating:</strong> "Insulation" lost → <strong>Decreased Speed</strong></div>
                        </div>
                    </div>
                </div>
            </div>

             <!-- Findings Grid -->
            <div class="nm-grid-2">
                <!-- NCS Findings -->
                <div class="nm-card nm-border-left-secondary">
                    <div class="nm-card-header">
                        <h4 style="color: hsl(var(--secondary-dark)); display: flex; align-items: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                            Primary NCS Abnormalities
                        </h4>
                    </div>
                    <div class="nm-card-body">
                         <div class="nm-highlight-box margin-bottom">
                            <h5 style="color: hsl(var(--red));">Axonal Pattern</h5>
                            <ul class="nm-list">
                                <li><strong>Decreased Amplitude</strong> (CMAP and SNAP)</li>
                                <li><strong>Normal Conduction Velocity</strong> (Nerve still runs fast on few fibers)</li>
                                <li><strong>Normal Latency</strong> (Signal starts on time)</li>
                            </ul>
                        </div>
                        <div class="nm-highlight-box">
                            <h5 style="color: hsl(var(--green-dark));">Demyelinating Pattern</h5>
                            <ul class="nm-list">
                                <li><strong>Decreased Velocity</strong> (Signals take longer to travel)</li>
                                <li><strong>Increased Latency</strong> (Delayed onset of signal)</li>
                                <li><strong>Conduction Block:</strong> Signal drops out across a specific point</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- EMG Findings -->
                <div class="nm-card nm-border-left-secondary" style="border-left-color: hsl(var(--green));">
                    <div class="nm-card-header">
                        <h4 style="color: hsl(var(--green-dark)); display: flex; align-items: center; gap: 8px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                            EMG Findings (Chronic / Reinnervation)
                        </h4>
                    </div>
                    <div class="nm-card-body">
                        <div class="nm-highlight-box success-light">
                             <h5 style="color: hsl(var(--green-dark));">Neurogenic Pattern</h5>
                             <ul class="nm-list">
                                <li><strong>Large amplitude MUAPs:</strong> Remaining nerves adopt homeless muscle fibers</li>
                                <li><strong>Long duration MUAPs:</strong> Larger units take longer to fire</li>
                                <li><strong>Reduced recruitment:</strong> Fewer motor units are available to fire</li>
                                <li><strong>High firing frequency:</strong> Units fire faster to compensate for lack of peers</li>
                                <li><strong>Spontaneous Activity:</strong> Fibrillations and Positive Sharp Waves (active injury)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Specific Patterns -->
            <div class="nm-card">
                <div class="nm-card-header">
                    <h4 style="display: flex; align-items: center; gap: 8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                        Common Neuropathy Patterns
                    </h4>
                </div>
                <div class="nm-card-body">
                    <div class="nm-info-row warning">
                        <strong>Diabetic Polyneuropathy:</strong> Typically a distal, symmetric, length-dependent axonal process.
                    </div>
                    <div class="nm-info-row danger">
                        <strong>Carpal Tunnel Syndrome:</strong> Focal demyelination (slowing) of the median nerve at the wrist.
                    </div>
                    <div class="nm-info-row info">
                         <strong>CIDP:</strong> An acquired demyelinating process characterized by multi-focal conduction blocks.
                    </div>
                </div>
            </div>

             <!-- Clinical Correlation -->
            <div class="nm-gradient-card orange">
                <h4 class="nm-gradient-title" style="display: flex; align-items: center; gap: 8px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1a.3.3 0 1 0 .2-.3"/><path d="M13 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="3 9 2 9 7 14"/><path d="M10.2 3.2C12 3.2 13.4 4.5 13.5 6.2a4.6 4.6 0 0 1 2.1-.8c2 .2 3.4 2 3.4 4 0 .2 0 .5-.1.7.9.5 1.5 1.5 1.5 2.6a2.8 2.8 0 0 1-2.8 2.8H13"/><path d="M12 9.8V15"/></svg>
                    Clinical Summary
                </h4>
                <div class="nm-grid-2">
                    <div>
                        <h5>Typical Presentation:</h5>
                        <ul class="nm-white-list">
                            <li>Distal weakness (Heels/Toes/Hands)</li>
                            <li>Sensory changes (Numbness/Tingling)</li>
                            <li>Reduced or absent deep tendon reflexes</li>
                        </ul>
                    </div>
                    <div>
                        <h5>NCS Strategy:</h5>
                        <ul class="nm-white-list">
                            <li>Test multiple nerves in upper and lower limbs</li>
                            <li>Compare distal vs. proximal stimulation sites</li>
                            <li>Evaluate late responses (F-waves and H-reflexes)</li>
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
                    <h3 style="color: hsl(var(--accent)); display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                        Side-by-Side Comparison
                    </h3>
                    <p style="color: #64748b; font-size: 0.9em; margin-top: 5px;">Key electrodiagnostic differences between neurogenic and myopathic disorders</p>
                </div>
                <div class="nm-table-container">
                    <table class="nm-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th class="col-myo">Myopathy</th>
                                <th class="col-neuro">Neuropathy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- NCS Findings Group -->
                            <tr style="background: #f8fafc;">
                                <td colspan="3" style="padding: 10px 15px; font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0;">Nerve Conduction Studies (NCS)</td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Motor CMAP Amplitude</td>
                                <td class="success-text">
                                    <span style="display: block;">Usually Normal</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Reduced only in severe/late cases</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">Decreased (Axonal)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Normal in pure demyelinating</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Sensory SNAP Amplitude</td>
                                <td class="success-text">
                                    <span style="display: block;">Always Normal</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Muscle diseases don't affect sensory nerves</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">Often Abnormal</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">If the lesion is post-ganglionic (most neuropathies)</span>
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
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Seen in inflammatory or necrotizing types</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">Common (Fibs/PSWs)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Denervation pattern after 3+ weeks of axonal injury</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">MUAP Duration</td>
                                <td class="primary-text">
                                    <span style="display: block;">Short Duration</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Due to loss of muscle fibers in the unit</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">Long Duration</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">From chronic reinnervation (wire-switching)</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">MUAP Amplitude</td>
                                <td class="primary-text">
                                    <span style="display: block;">Low (Small)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Reduced total fiber density</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">High (Giant)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Units expand via reinnervation</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Recruitment Pattern</td>
                                <td class="success-text">
                                    <span style="display: block;">Early / Rapid</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Screen fills with activity at low effort</span>
                                </td>
                                <td class="danger-text">
                                    <span style="display: block;">Reduced (Fast Firing)</span>
                                    <span style="font-size: 0.8em; font-weight: 400; opacity: 0.8;">Too few units available to fill the screen</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="fw-bold">Clinical Localization</td>
                                <td class="primary-text">Proximal (Shoulders/Hips)</td>
                                <td class="danger-text">Distal (Hands/Feet)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Summary Pro-Tip -->
            <div class="nm-gradient-card orange-light text-dark margin-top" style="border-left: 5px solid hsl(var(--secondary));">
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div style="background: white; padding: 10px; border-radius: 50%; box-shadow: var(--shadow-sm);">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: hsl(var(--secondary-dark));"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/></svg>
                    </div>
                    <div>
                        <h4 style="color: hsl(var(--secondary-dark)); margin: 0 0 5px 0;">Electrophysiological Rule of Thumb</h4>
                        <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">
                            In <strong>Neuropathy</strong>, it's a "Labor Shortage": <strong>Too Few</strong> units firing <strong>Too Fast</strong> to compensate.
                            <br>In <strong>Myopathic</strong> disorders, it's a "Weak Workforce": <strong>Too Many</strong> units working for <strong>Too Little</strong> actual force production.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const getMasteryTermsContent = () => `
        <div class="nm-card margin-top" style="border-top: 4px solid hsl(var(--primary));">
            <div class="nm-card-header">
                <h4 style="display: flex; align-items: center; gap: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-5"/><path d="M4 19.5L6.5 17"/><path d="M6.5 2v15"/></svg>
                    Glossary: Mastery Terms
                </h4>
            </div>
            <div class="nm-card-body">
                <div class="nm-grid-2">
                    <div>
                        <p><strong>MUAP (Motor Unit Action Potential):</strong> The summated electrical activity of all muscle fibers belonging to a single motor unit.</p>
                        <p><strong>Recruitment:</strong> The process by which the nervous system increases the number of active motor units to increase muscle force.</p>
                        <p><strong>Polyphasia:</strong> A MUAP with more than 4 phases (crossings of the baseline). Suggests asynchronous firing of muscle fibers.</p>
                    </div>
                    <div>
                        <p><strong>Fibrillations / PSWs:</strong> Spontaneous electrical activity of a single muscle fiber that has lost its nerve supply (denervation).</p>
                        <p><strong>Interference Pattern:</strong> The chaotic density of electrical activity seen on the screen during maximal voluntary contraction.</p>
                        <p><strong>Conduction Block:</strong> A failure of the nerve impulse to propagate past a point, despite the axon behind it being healthy.</p>
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
<div class="nm-gradient-header">
                <h2 style="margin: 0; font-size: 2.2em; font-weight: 800; letter-spacing: -0.025em; display: flex; align-items: center; justify-content: center; gap: 15px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><path d="M12 6a4 4 0 0 0-4 4h2a2 2 0 1 1 4 0h2a4 4 0 0 0-4-4z"/><path d="M12 14v2h.01"/></svg>
                    Neuropathy vs Myopathy
                </h2>
                <p style="margin: 10px 0 0 0; opacity: 0.8; font-size: 1.1em; font-weight: 500;">Differential Localization Masterclass</p>
            </div>

            <!-- Tab Navigation -->
            <div class="nm-tabs-container">
                <button id="myopathy-tab" onclick="window.showTab('myopathy')" class="nm-tab active">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 1 0-4 0v6"/><path d="M11 10.5V11"/></svg>
                    Myopathy
                </button>
                <button id="neuropathy-tab" onclick="window.showTab('neuropathy')" class="nm-tab">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    Neuropathy
                </button>
                <button id="comparison-tab" onclick="window.showTab('comparison')" class="nm-tab">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    Comparison
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

            <!-- Mastery Glossary -->
            ${getMasteryTermsContent()}
        </div>
    `;
}

export const NeuropathyMyopathy = { generateContent };
