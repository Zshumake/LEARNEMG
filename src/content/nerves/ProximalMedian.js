
import { generateErnestButton } from '../../modules/audio/AudioData.js';

const generateContent = () => `
    <div style="background: white; padding: 20px; border-radius: 12px; font-family: 'Segoe UI', system-ui, sans-serif;">
        <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">💪 Proximal Median Neuropathy & AIN Syndrome</h5>

        ${generateErnestButton ? generateErnestButton('proximal-median', 'Proximal Median Neuropathy') : ''}

        <!-- Pronator Syndrome -->
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h6 style="color: #92400e; margin-bottom: 10px;">🛡️ Pronator Teres Syndrome</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div>
                    <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Three Compression Sites:</p>
                    <ul style="color: #451a03; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li><strong>Lacertus fibrosus:</strong> From biceps to flexor muscles</li>
                        <li><strong>Pronator teres:</strong> Between muscle heads (most common)</li>
                        <li><strong>Sublimis bridge:</strong> FDS aponeurotic edge</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Clinical Presentation:</p>
                    <ul style="color: #451a03; font-size: 0.9em; margin: 0; padding-left: 20px;">
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
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li><strong>FPL:</strong> Thumb IP flexion weakness</li>
                        <li><strong>FDP (index/middle):</strong> DIP flexion loss</li>
                        <li><strong>Pronator quadratus:</strong> Weak pronation (elbow flexed)</li>
                        <li><strong>Pure motor</strong> - no sensory loss</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Clinical Signs:</p>
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0; padding-left: 20px;">
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
                <ul style="color: #14532d; font-size: 0.9em; margin: 0; padding-left: 20px;">
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
                    <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Reduced CMAP/SNAP amplitudes</li>
                        <li>Normal/slightly prolonged distal latencies</li>
                        <li>Slow forearm conduction velocity</li>
                        <li>Normal median-ulnar comparison studies</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #3730a3; font-weight: 500; margin-bottom: 5px;">EMG Key Findings:</p>
                    <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
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
                    <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li><strong>Thenar sensation:</strong> Affected in proximal (spared in CTS)</li>
                        <li><strong>Timing:</strong> Not worse at night</li>
                        <li><strong>Proximal muscles:</strong> Involved in proximal lesions</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">vs C6/C7 Radiculopathy:</p>
                    <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li><strong>Neck pain:</strong> Absent in median neuropathy</li>
                        <li><strong>Reflexes:</strong> Normal in isolated median lesions</li>
                        <li><strong>Distribution:</strong> Pure median territory</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;

export const ProximalMedian = { generateContent };
export default ProximalMedian;
