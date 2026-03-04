// Brachial Plexopathy: Clinical Pathophysiology Module
// Mentorship-style guide for residents on injuries, localization, and EDX patterns.

export function generatePlexopathyContent() {
    return `
        <div class="plexopathy-clinical-content" style="padding: 30px; line-height: 1.7; color: #334155; font-family: 'Inter', system-ui, -apple-system, sans-serif;">
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
            ${window.generateModuleQuiz ? window.generateModuleQuiz([
        {
            question: "A newborn presents with the arm hanging by the side, medially rotated, with the forearm extended and pronated ('waiter\\'s tip' posture). Which roots are most typically injured?",
            options: ["C8-T1 (Klumpke\\'s Palsy)", "C5-C6 (Erb\\'s Palsy)", "C7-C8", "Pan-plexus"],
            correct: 1,
            explanation: "Erb\\'s palsy (Upper Trunk / C5-C6 injury) classical presentation. The loss of shoulder abductors/external rotators and elbow flexors causes the arm to hang internally rotated and extended."
        },
        {
            question: "You are evaluating a patient with severe weakness of the hand intrinsics and numbness of the medial forearm and 4th/5th digits. A Horner\\'s syndrome is present on the same side. Where is the lesion?",
            options: ["Lower Trunk", "Upper Trunk", "Medial Cord", "Ulnar Nerve at the Elbow"],
            correct: 0,
            explanation: "This is classic for a lower plexus (C8-T1) lesion. The presence of Horner\\'s syndrome (ptosis, miosis, anhidrosis) strongly localizes the lesion proximally to the T1 root, pre-ganglionic!"
        },
        {
            question: "A patient presents with sharp shoulder pain followed by profound weakness of the shoulder girdle muscles. EDX shows severe denervation in the Supraspinatus, Infraspinatus, Deltoid, and Serratus Anterior. What is the most likely diagnosis?",
            options: ["C5 Radiculopathy", "Neuralgic Amyotrophy (Parsonage-Turner Syndrome)", "Upper Trunk Plexopathy secondary to trauma", "Lateral Cord Neuropathy"],
            correct: 1,
            explanation: "Parsonage-Turner Syndrome (idiopathic brachial plexitis) typically presents with sudden severe pain followed by patchy, profound weakness. It often affects multiple individual nerves branching off the upper/middle plexus (like suprascapular, axillary, and long thoracic) rather than following a strict trunk/cord pattern."
        },
        {
            question: "What is the 'Golden Rule' of Plexus vs. Root localization on EMG regarding sensory studies?",
            options: ["Abnormal SNAPs = Root, Normal SNAPs = Plexus", "Normal SNAPs = Root, Abnormal SNAPs = Plexus", "SNAPs cannot differentiate root from plexus", "Needle EMG of paraspinals is the only way"],
            correct: 1,
            explanation: "In a radiculopathy, the lesion is typically 'pre-ganglionic' (proximal to the DRG). Therefore, the sensory nerve cell body in the DRG and its distal axon remain intact, resulting in a NORMAL SNAP despite sensory symptoms. In a plexopathy ('post-ganglionic'), the axon is severed from the DRG, resulting in an ABNORMAL SNAP."
        },
        {
            question: "Which muscle is critical to test on needle EMG to definitively differentiate a C5-C6 radiculopathy from an Upper Trunk plexopathy?",
            options: ["Biceps brachii", "Deltoid", "Cervical Paraspinals", "Pronator Teres"],
            correct: 2,
            explanation: "Cervical paraspinal muscles are innervated by the dorsal rami of the spinal roots, which branch off BEFORE the brachial plexus forms. Abnormalities in the paraspinals confirm a root (or anterior horn) lesion, not a plexopathy."
        },
        {
            question: "You find robust denervation in the Extensor Indicis, Extensor Carpi Radialis, AND the Deltoid. Which anatomical structure ties these together?",
            options: ["Middle Trunk", "Posterior Cord", "Lateral Cord", "Anterior Interosseous Nerve"],
            correct: 1,
            explanation: "The Posterior Cord gives rise to the Radial nerve (extensors of wrist/fingers) and the Axillary nerve (deltoid). Finding abnormalities in both localizes the lesion to the posterior cord."
        },
        {
            question: "How do you confidently differentiate a Lower Trunk (C8-T1) plexopathy from a Medial Cord plexopathy using needle EMG?",
            options: ["Test Abductor Pollicis Brevis (APB)", "Test Extensor Indicis (EI)", "Test First Dorsal Interosseous (FDI)", "Test Pronator Teres (PT)"],
            correct: 1,
            explanation: "Both Lower Trunk and Medial Cord lesions affect C8-T1 ulnar/median median muscles (like APB and FDI). However, the Lower Trunk ALSO sends C8 fibers to the Radial Nerve via the Posterior Cord. Finding denervation in a C8 Radial muscle like Extensor Indicis proves the lesion is at the Lower Trunk, not the Medial Cord."
        },
        {
            question: "True Neurogenic Thoracic Outlet Syndrome (TOS) typically presents as a compressive injury of which part of the brachial plexus?",
            options: ["Upper Trunk", "Middle Trunk", "Lower Trunk", "Lateral Cord"],
            correct: 2,
            explanation: "True neurogenic TOS almost always affects the Lower Trunk (C8-T1), often due to a cervical rib or elongated C7 transverse process. It presents with wasting of the hand intrinsics (classically severe in the lateral thenar eminence - Gilliatt-Sumner hand) and sensory loss over the medial forearm/hand."
        },
        {
            question: "You diagnose a Lateral Cord lesion. Aside from the Musculocutaneous Nerve (Biceps/Brachialis), which other major arm nerve will have partial deficits?",
            options: ["Ulnar Nerve", "Median Nerve", "Radial Nerve", "Axillary Nerve"],
            correct: 1,
            explanation: "The Lateral Cord gives off the Lateral Root of the Median Nerve, supplying C6-C7 median-innervated muscles like the Pronator Teres and Flexor Carpi Radialis. A lateral cord lesion affects the Biceps AND these proximal Median muscles."
        },
        {
            question: "In a severe stretch injury of the brachial plexus undergoing eventual recovery, which muscles will demonstrate the earliest signs of reinnervation (Nascent motor units)?",
            options: ["Hand intrinsics", "Distal forearm muscles", "Proximal arm/shoulder muscles", "All muscle groups recover simultaneously"],
            correct: 2,
            explanation: "Nerves regenerate at approximately 1mm per day (or 1 inch per month). Therefore, muscles geographically closest to the injury site (proximal shoulder/arm muscles) will receive their repairing axons and show reinnervation long before distal muscles like the hand intrinsics."
        }
    ]) : '<p class="error-text">Quiz module not loaded</p>'}
        </div>
    `;
}
