
import { generateErnestButton } from '../../modules/audio/AudioData.js';

const generateElbowContent = () => `
    <div style="background: white; padding: 20px; border-radius: 12px; font-family: 'Segoe UI', system-ui, sans-serif; margin-bottom: 25px;">
        <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">💪 Ulnar Neuropathy at the Elbow (UNE)</h5>

        ${generateErnestButton ? generateErnestButton('ulnar-elbow', 'Ulnar Neuropathy at Elbow') : ''}

        <!-- Anatomy Section -->
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Anatomy & Localization</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Retrocondylar Groove:</p>
                    <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Posterior to medial epicondyle</li>
                        <li>External compression/trauma risk</li>
                        <li>"Funny bone" location</li>
                        <li>Superficial and vulnerable</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Cubital Tunnel:</p>
                    <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Under humeroulnar aponeurosis (Osborne's)</li>
                        <li>Compression increases with flexion</li>
                        <li>FCU muscle arcade compression</li>
                        <li>Subluxation risk</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Clinical Features -->
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h6 style="color: #92400e; margin-bottom: 10px;">📋 Clinical Presentation</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Symptoms:</p>
                    <ul style="color: #451a03; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Numbness in digits 4 & 5 + medial hand</li>
                        <li>Worse with elbow flexion (phone, sleep)</li>
                        <li>Weak grip / pinch strength</li>
                        <li>Medial elbow pain</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Physical Signs:</p>
                    <ul style="color: #451a03; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li><strong>Froment's Sign:</strong> Thumb IP flexion (adductor weakness)</li>
                        <li><strong>Wartenberg's Sign:</strong> Abducted little finger</li>
                        <li>Hypothenar/interosseous atrophy</li>
                        <li>Claw hand (late stage)</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Differential Diagnosis -->
        <div style="background: #fdf2f8; padding: 15px; border-radius: 8px;">
            <h6 style="color: #be185d; margin-bottom: 10px;">🔍 Differential Diagnosis Keys</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 0.9em;">
                <div style="background: white; padding: 10px; border-radius: 6px; border: 1px solid #fbcfe8;">
                    <strong style="color: #831843;">Vs C8 Radiculopathy:</strong><br>
                    <span style="color: #4c1d4f;">C8 affects thumb abduction (APB/EPB) and radial extensors. Ulnar spares these.</span>
                </div>
                <div style="background: white; padding: 10px; border-radius: 6px; border: 1px solid #fbcfe8;">
                    <strong style="color: #831843;">Vs Lower Plexus:</strong><br>
                    <span style="color: #4c1d4f;">Plexopathy affects median C8-T1 muscles (APB) & sensation in medial forearm (MABC).</span>
                </div>
                <div style="background: white; padding: 10px; border-radius: 6px; border: 1px solid #fbcfe8;">
                    <strong style="color: #831843;">Vs Guyon's Canal:</strong><br>
                    <span style="color: #4c1d4f;">Wrist lesions spare dorsal ulnar cutaneous sensation (back of hand).</span>
                </div>
            </div>
        </div>
    </div>
`;

const generateWristContent = () => `
    <div style="background: white; padding: 20px; border-radius: 12px; font-family: 'Segoe UI', system-ui, sans-serif;">
        <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">✋ Ulnar Neuropathy at the Wrist (Guyon's Canal)</h5>

        ${generateErnestButton ? generateErnestButton('ulnar-wrist', 'Ulnar at Wrist') : ''}

        <!-- Anatomy Section -->
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Anatomy: Guyon's Canal</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <h6 style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Boundaries:</h6>
                    <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li><strong>Roof:</strong> Palmar carpal ligament</li>
                        <li><strong>Floor:</strong> Flexor retinaculum & hypothenar muscles</li>
                        <li><strong>Medial:</strong> Pisiform</li>
                        <li><strong>Lateral:</strong> Hook of hamate</li>
                    </ul>
                </div>
                <div>
                    <h6 style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Contents:</h6>
                    <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Ulnar nerve (bifurcates within canal)</li>
                        <li>Ulnar artery</li>
                        <li><strong>NO tendons</strong> (unlike carpal tunnel)</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Clinical Presentations by Zone -->
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h6 style="color: #92400e; margin-bottom: 10px;">🎯 Clinical Presentations by Zone</h6>

            <!-- Zone 1 -->
            <div style="background: #fff8db; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #f59e0b;">
                <h6 style="color: #92400e; margin-bottom: 8px;">Zone 1: Mixed Nerve (Complete UNW)</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 3px;">Motor:</p>
                        <p style="color: #451a03; font-size: 0.85em; margin: 0;">All ulnar hand muscles affected</p>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 3px;">Sensory:</p>
                        <p style="color: #451a03; font-size: 0.85em; margin: 0;">Ring/little finger numbness</p>
                    </div>
                </div>
            </div>

            <!-- Zone 2 -->
            <div style="background: #fef2f2; padding: 12px; border-radius: 6px; margin-bottom: 12px; border-left: 4px solid #ef4444;">
                <h6 style="color: #dc2626; margin-bottom: 8px;">Zone 2: Deep Motor Branch Only</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <p style="color: #991b1b; font-weight: 500; margin-bottom: 3px;">Motor:</p>
                        <p style="color: #7f1d1d; font-size: 0.85em; margin: 0;">Pure motor - hand weakness</p>
                    </div>
                    <div>
                        <p style="color: #991b1b; font-weight: 500; margin-bottom: 3px;">Sensory:</p>
                        <p style="color: #7f1d1d; font-size: 0.85em; margin: 0;">Normal sensation</p>
                    </div>
                </div>
            </div>

            <!-- Zone 3 -->
            <div style="background: #f0f9ff; padding: 12px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <h6 style="color: #2563eb; margin-bottom: 8px;">Zone 3: Superficial Sensory Branch Only</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div>
                        <p style="color: #1d4ed8; font-weight: 500; margin-bottom: 3px;">Motor:</p>
                        <p style="color: #1e3a8a; font-size: 0.85em; margin: 0;">Normal strength</p>
                    </div>
                    <div>
                        <p style="color: #1d4ed8; font-weight: 500; margin-bottom: 3px;">Sensory:</p>
                        <p style="color: #1e3a8a; font-size: 0.85em; margin: 0;">Pure sensory loss</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Common Causes -->
        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h6 style="color: #065f46; margin-bottom: 10px;">⚠️ Common Causes</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Traumatic:</p>
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Hook of hamate fracture</li>
                        <li>Cyclist's palsy (handlebar pressure)</li>
                        <li>Repetitive trauma</li>
                        <li>Chronic pressure on hypothenar</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Occupational/Masses:</p>
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Ganglion cysts</li>
                        <li>Ulnar artery thrombosis</li>
                        <li>Lipomas</li>
                        <li>Prolonged wrist extension</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Key Differentiating Features -->
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #6366f1;">
            <h6 style="color: #4f46e5; margin-bottom: 10px;">🔑 Key Differentiating Features from UNE</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <p style="color: #3730a3; font-weight: 500; margin-bottom: 5px;">Preserved Functions:</p>
                    <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li><strong>FCU:</strong> Normal strength</li>
                        <li><strong>FDP (ring/little):</strong> Normal</li>
                        <li><strong>Dorsal hand sensation:</strong> Normal</li>
                        <li>No forearm symptoms</li>
                    </ul>
                </div>
                <div>
                    <p style="color: #3730a3; font-weight: 500; margin-bottom: 5p;">EDX Findings:</p>
                    <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                        <li>Normal ulnar motor latency to ADM</li>
                        <li>Normal ulnar sensory from digit 5</li>
                        <li>Normal conduction across elbow</li>
                        <li>Isolated hand muscle denervation</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Clinical Exam Tips -->
        <div style="background: #fdf2f8; padding: 15px; border-radius: 8px;">
            <h6 style="color: #be185d; margin-bottom: 10px;">🔍 Clinical Examination Tips</h6>
            <div style="background: #fff7fc; padding: 12px; border-radius: 6px; border: 1px solid #f3e8ff;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.9em;">
                    <div>
                        <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">Always Test:</p>
                        <ul style="color: #4c1d4f; margin: 0; padding-left: 20px;">
                            <li>FDI strength (first dorsal interosseous)</li>
                            <li>ADM strength (abductor digiti minimi)</li>
                            <li>Froment's sign</li>
                            <li>Wartenberg's sign</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">Examine Wrist For:</p>
                        <ul style="color: #4c1d4f; margin: 0; padding-left: 20px;">
                            <li>Masses in Guyon's canal</li>
                            <li>Hypothenar tenderness</li>
                            <li>Hook of hamate tenderness</li>
                            <li>Occupational calluses</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export const UlnarNerve = {
    generateElbowContent,
    generateWristContent
};

export default {
    generateElbowContent,
    generateWristContent
};
