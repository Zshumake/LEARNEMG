
const generateContent = () => `
    <div style="background: white; padding: 20px; border-radius: 12px; font-family: 'Segoe UI', system-ui, sans-serif;">
        <h5 style="color: #1e40af; margin-bottom: 20px; font-size: 1.25em;">🗺️ Master Nerve Chart: Entrapment Syndromes Reference</h5>

        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
                <thead>
                    <tr style="background: #1e40af; color: white; text-align: left;">
                        <th style="padding: 12px;">Nerve</th>
                        <th style="padding: 12px;">Syndrome(s)</th>
                        <th style="padding: 12px;">Motor Findings</th>
                        <th style="padding: 12px;">Sensory Findings</th>
                        <th style="padding: 12px;">EDX Hallmarks</th>
                        <th style="padding: 12px;">Clinical Clues</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Median Nerve Group -->
                    <tr style="background: #f0fdf4;">
                        <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #065f46;">🖐️ Median</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; color: #047857;"><strong>Carpal Tunnel Syndrome</strong></td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">APB weakness, atrophy</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Digits 1-3, lat 4</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Slow sensory/motor across wrist</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Nocturnal symptoms, Phalen's +</td>
                    </tr>
                    <tr style="background: #f0fdf4;">
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
                <ul style="color: #064e3b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                    <li><strong>Sensory sparing:</strong> Look for pure motor syndromes</li>
                    <li><strong>Timing patterns:</strong> Nocturnal vs activity-related</li>
                    <li><strong>Muscle combinations:</strong> Which muscles group together</li>
                    <li><strong>Provocative tests:</strong> Specific anatomical stresses</li>
                </ul>
            </div>
            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
                <h6 style="color: #991b1b; margin-bottom: 10px;">⚠️ Common Pitfalls</h6>
                <ul style="color: #7f1d1d; font-size: 0.9em; margin: 0; padding-left: 20px;">
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
    </div>
`;
export const MasterNerveChart = { generateContent };
export default MasterNerveChart;
