// Brachial Plexopathy: Clinical Pathophysiology Module
// Mentorship-style guide for residents on injuries, localization, and EDX patterns.

import { generateErnestButton } from '../../modules/audio/AudioData.js';

export function generatePlexopathyContent() {
    return `
        <div class="plexopathy-clinical-content" style="padding: 30px; line-height: 1.7; color: #334155; font-family: 'Inter', system-ui, -apple-system, sans-serif;">
            ${generateErnestButton('brachial-plexopathy', 'Brachial Plexopathy Clinical Guide')}

            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #7dd3fc; padding: 35px; border-radius: 24px; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.08);">
                <h2 style="color: #0369a1; margin-bottom: 20px; font-weight: 800; display: flex; align-items: center; gap: 12px; font-size: 1.8em;">
                    <svg style="width: 32px; height: 32px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    Clinical Brachial Plexopathy
                </h2>
                <p style="font-size: 1.1em; color: #0c4a6e; font-weight: 500;">
                    If Radiculopathy is the "Bread & Butter," then <strong>Brachial Plexopathy</strong> is the "Master Class." 
                    Detecting a plexus lesion requires you to stop thinking about single nerves and start thinking about <strong>geographic intersections.</strong>
                </p>
                <div style="margin-top: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #bae6fd;">
                        <h5 style="color: #0369a1; margin-bottom: 8px; font-weight: 700;">Diagnostic Goal</h5>
                        <p style="margin: 0; font-size: 0.95em;">Is it a Root (Radiculopathy), a Plexus lesion, or a Peripheral Nerve injury?</p>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #bae6fd;">
                        <h5 style="color: #0369a1; margin-bottom: 8px; font-weight: 700;">Resident Pro-Tip</h5>
                        <p style="margin: 0; font-size: 0.95em; font-style: italic;">"The SNAP is your compass. If the SNAP is dead, the lesion is in or distal to the plexus."</p>
                    </div>
                </div>
            </div>

            <!-- Section 1: The Golden Rule (Localization) -->
            <div style="background: white; padding: 30px; border-radius: 20px; border-left: 8px solid #0ea5e9; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 35px;">
                <h4 style="color: #0f172a; margin-bottom: 20px; font-size: 1.4em; font-weight: 700; display: flex; align-items: center; gap: 12px;">
                    <span style="background: #e0f2fe; color: #0ea5e9; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8em;">1</span>
                    The Golden Rule: Pre-ganglionic vs. Post-ganglionic
                </h4>
                <p style="margin-bottom: 20px;">
                    This is the most critical distinction in all of EDX. When a patient presents with weakness and numbness in the arm, 
                    the <strong>Sensory Nerve Action Potential (SNAP)</strong> tells you exactly where the "cut" is.
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0;">
                        <h5 style="color: #64748b; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.05em;">Scenario A: Pre-ganglionic</h5>
                        <p style="font-weight: 700; color: #0369a1; margin-bottom: 10px;">Root Level (Radiculopathy)</p>
                        <p style="font-size: 0.9em;">The lesion is <em>proximal</em> to the Dorsal Root Ganglion. The axon in the arm is still connected to its cell body.</p>
                        <div style="margin-top: 10px; color: #059669; font-weight: 800;">Result: SNAP is NORMAL.</div>
                    </div>
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 16px; border: 1px solid #bae6fd;">
                        <h5 style="color: #0369a1; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.05em;">Scenario B: Post-ganglionic</h5>
                        <p style="font-weight: 700; color: #0ea5e9; margin-bottom: 10px;">Plexus Level (Plexopathy)</p>
                        <p style="font-size: 0.9em;">The lesion is <em>distal</em> to the DRG. The axon in the arm has been cut off from its cell body and dies.</p>
                        <div style="margin-top: 10px; color: #ef4444; font-weight: 800;">Result: SNAP is ABSENT/LOW.</div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Major Injury Patterns -->
            <div style="background: white; padding: 30px; border-radius: 20px; border-left: 8px solid #8b5cf6; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 35px;">
                <h4 style="color: #0f172a; margin-bottom: 25px; font-size: 1.4em; font-weight: 700; display: flex; align-items: center; gap: 12px;">
                    <span style="background: #f5f3ff; color: #8b5cf6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8em;">2</span>
                    The Big Three: Erb's, Klumpke's, & Parsonage-Turner
                </h4>
                
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="background: #faf5ff; padding: 20px; border-radius: 16px; border: 1px solid #e9d5ff;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                            <h5 style="color: #6b21a8; font-weight: 800; margin: 0;">Upper Trunk (C5-C6) — "Erb's Palsy"</h5>
                            <span style="background: #8b5cf6; color: white; font-size: 0.7em; padding: 4px 10px; border-radius: 10px; font-weight: 700;">Most Common</span>
                        </div>
                        <p style="margin-bottom: 10px; font-size: 0.95em;">
                            <strong>Cause:</strong> Trauma (motorcycle accidents) or birth injury where the head and shoulder are pulled apart.
                        </p>
                        <p style="margin-bottom: 10px; font-size: 0.95em;">
                            <strong>Presentation:</strong> "Waiter's Tip" posture. Shoulder adducted/internally rotated; elbow extended; forearm pronated.
                        </p>
                        <div style="background: white; padding: 10px; border-radius: 8px; border: 1px dashed #c084fc; font-size: 0.9em; color: #5b21b6;">
                            <strong>EDX Signature:</strong> Abnormal Medial/Lateral Antebrachial Cutaneous SNAPs + C5/C6 muscle denervation (Deltoid, Biceps).
                        </div>
                    </div>

                    <div style="background: #fff1f2; padding: 20px; border-radius: 16px; border: 1px solid #fecaca;">
                        <h5 style="color: #be123c; font-weight: 800; margin-bottom: 10px;">Lower Trunk (C8-T1) — "Klumpke's Palsy"</h5>
                        <p style="margin-bottom: 10px; font-size: 0.95em;">
                            <strong>Cause:</strong> Grabbing a tree branch while falling, or "Apex of Lung" tumors (Pancoast Tumor).
                        </p>
                        <p style="margin-bottom: 10px; font-size: 0.95em;">
                            <strong>Presentation:</strong> "Claw Hand" with sensory loss in the pinky and medial forearm.
                        </p>
                        <div style="background: white; padding: 10px; border-radius: 8px; border: 1px dashed #fb7185; font-size: 0.9em; color: #9f1239;">
                            <strong>EDX Signature:</strong> Abnormal Ulnar SNAP + Medial Antebrachial Cutaneous SNAP. Weakness in ALL hand intrinsics.
                        </div>
                    </div>

                    <div style="background: #f0fdfa; padding: 20px; border-radius: 16px; border: 1px solid #ccfbf1;">
                        <h5 style="color: #0f766e; font-weight: 800; margin-bottom: 10px;">Parsonage-Turner Syndrome (Neuralgic Amyotrophy)</h5>
                        <p style="margin-bottom: 10px; font-size: 0.95em;">
                            <strong>The Story:</strong> A patient wakes up with <em>intense</em>, debilitating shoulder pain for a few days, 
                            which then disappears and is replaced by sudden, profound weakness. Often follows a viral infection or surgery.
                        </p>
                        <div style="background: white; padding: 10px; border-radius: 8px; border: 1px dashed #2dd4bf; font-size: 0.9em; color: #115e59;">
                            <strong>Resident Pearl:</strong> This is a patchy, inflammatory plexitis. It doesn't follow a neat "trunk" pattern. Look for specific nerves like the Long Thoracic or Suprascapular to be hit in isolation.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3: The "Burner" or "Stinger" -->
            <div style="background: #1e293b; padding: 30px; border-radius: 20px; color: white; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                <h4 style="color: #38bdf8; margin-bottom: 20px; font-size: 1.4em; font-weight: 700; display: flex; align-items: center; gap: 12px;">
                    <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    The Athlete's Nightmare: Burners & Stingers
                </h4>
                <p style="opacity: 0.9; margin-bottom: 20px;">
                    Common in football and wrestling. When the head is violently forced to the side, it either <strong>compresses</strong> or 
                    <strong>stretches</strong> the upper plexus.
                </p>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;">
                    <li style="display: flex; gap: 10px; align-items: center;">
                        <span style="background: #38bdf8; color: #1e293b; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8em; flex-shrink: 0;">!</span>
                        <span>Transient electric shock sensation down the arm.</span>
                    </li>
                    <li style="display: flex; gap: 10px; align-items: center;">
                        <span style="background: #38bdf8; color: #1e293b; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8em; flex-shrink: 0;">!</span>
                        <span>If symptoms last >15 minutes, get an EMG (but wait 3 weeks!).</span>
                    </li>
                    <li style="display: flex; gap: 10px; align-items: center;">
                        <span style="background: #38bdf8; color: #1e293b; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8em; flex-shrink: 0;">!</span>
                        <span>Localization: Usually the Upper Trunk (C5-C6).</span>
                    </li>
                </ul>
            </div>

            <!-- Quiz Section -->
            <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 30px; border-radius: 20px; margin-bottom: 20px;">
                <h4 style="color: #0f172a; margin-bottom: 20px; font-weight: 800; text-align: center;">Rapid Localizer Quiz</h4>
                <div id="plexopathy-mini-quiz">
                    <!-- Quiz logic to be handled by window.renderMiniQuiz -->
                    <p style="text-align: center; color: #64748b; font-style: italic;">Select the buttons below to test your knowledge.</p>
                </div>
            </div>
        </div>
    `;
}
