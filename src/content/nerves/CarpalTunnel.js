
import { generateErnestButton } from '../../modules/audio/AudioData.js';

const generateContent = () => `
    <div style="background: white; padding: 20px; border-radius: 12px; font-family: 'Segoe UI', system-ui, sans-serif;">
        <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">🖐️ Carpal Tunnel Syndrome - Median Nerve at Wrist</h5>

        ${generateErnestButton ? generateErnestButton('carpal-tunnel', 'Carpal Tunnel Syndrome') : ''}

        <!-- Anatomy Section -->
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Anatomy & Compression Site</h6>
            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
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
                    <ul style="color: #451a03; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Nocturnal paresthesias</li>
                        <li>Hand shaking relieves symptoms</li>
                        <li>Provoked by driving, phone use</li>
                        <li>Pain radiates to forearm</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Physical Signs:</p>
                    <ul style="color: #451a03; font-size: 0.9em; margin: 0; padding-left: 20px;">
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
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Prolonged median distal motor latency</li>
                        <li>Prolonged median sensory latency</li>
                        <li>Reduced amplitudes (severe cases)</li>
                        <li>Abnormal comparison studies</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Sensitive Tests:</p>
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0; padding-left: 20px;">
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
`;

export const CarpalTunnel = { generateContent };
export default CarpalTunnel;
