// Radiculopathy Pathophysiology Module
// Nerve root compression patterns and localization
// Updated: 20260304-v4 for Deep Content Expansion


export function generateContent(module) {
    return `
        <div class="interactive-content" style="position: relative; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
<!-- Hero Section: Clinical Significance -->
            <div style="background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); padding: 35px; border-radius: 20px; margin-bottom: 30px; border: 1px solid #fb923c; box-shadow: 0 10px 25px rgba(251, 146, 60, 0.1);">
                <h3 style="color: #c2410c; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.8em; font-weight: 800;">
                    <svg style="width: 32px; height: 32px; margin-right: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Radiculopathy: The EMG "Bread & Butter"
                </h3>
                <p style="color: #9a3412; font-size: 1.1em; line-height: 1.6; margin-bottom: 20px; font-weight: 500;">
                    If you talk to any EMG attending, they'll tell you: <strong>Radiculopathy is the most common reason patients are sent to the lab.</strong> 
                    Whether it's a "pinched nerve" in the neck (cervical) or the low back (lumbar), your job as the electrodiagnostician is to act as a 
                    detective. You aren't just looking for "abnormalities"—you are mapping exactly which spinal level is being compressed.
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(251, 146, 60, 0.3);">
                        <h5 style="color: #c2410c; margin-bottom: 10px; font-weight: 700;">Diagnostic Goals</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #9a3412; font-size: 0.95em; line-height: 1.4;">
                            <li>Confirm the nerve root is the problem</li>
                            <li>Identify the exact spinal level (e.g., L5 vs S1)</li>
                            <li>Determine if the injury is acute or chronic</li>
                        </ul>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(251, 146, 60, 0.3);">
                        <h5 style="color: #c2410c; margin-bottom: 10px; font-weight: 700;">Resident Pro-Tip</h5>
                        <p style="margin: 0; color: #9a3412; font-size: 0.95em; font-style: italic;">
                            "The history is half the battle. If the pain radiates down to the big toe, think L5. If it's the little toe, think S1. Let the patient guide your needle!"
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 1: Definition & The "Behind the DRG" Secret -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #ef4444; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #fee2e2; color: #ef4444; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">1</span>
                    The Pathophysiology: What's Actually Happening?
                </h4>
                <div style="line-height: 1.7; color: #475569;">
                    <p style="margin-bottom: 20px;">
                        At its core, <strong>Radiculopathy</strong> is a plumbing problem. A nerve root is being squeezed or irritated 
                        right as it tries to exit the spinal column. This happens at the <em>neural foramen</em>—the small holes between 
                        your vertebrae.
                    </p>
                    
                    <div style="background: #f8fafc; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px; font-weight: 700; font-size: 1.1em;">The "Behind the DRG" Secret (High Yield!)</h5>
                        <p style="margin-bottom: 15px;">
                            This is the most common board question and the most confusing concept for new residents. 
                            <strong>Why are the sensory nerve conduction studies (SNAPs) normal even when the patient feels numb?</strong>
                        </p>
                        <p>
                            Imagine a telephone wire. The "Telephone Exchange" (the <strong>Dorsal Root Ganglion/DRG</strong>) is located 
                            <em>outside</em> the spinal canal. 
                        </p>
                        <ul style="margin-top: 10px;">
                            <li>If you cut the wire <strong>distal</strong> to the exchange (in the arm), the distal end dies and the signal disappears (SNAP becomes abnormal).</li>
                            <li>In radiculopathy, the pinch is <strong>proximal</strong> to the exchange (inside the spine/foramen). The "Telephone Exchange" (DRG) is still happy and healthy, so the wire in the arm is still attached to its power source. <strong>The signal in the arm remains normal!</strong></li>
                        </ul>
                        <div style="margin-top: 15px; padding: 12px; background: #fff1f2; border-radius: 8px; border: 1px solid #fecaca; color: #991b1b; font-weight: 600; text-align: center;">
                            🌟 Clinical Pearl: Normal SNAPs + Sensory Symptoms = Radiculopathy until proven otherwise!
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Etiology & Mechanisms -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #8b5cf6; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #f5f3ff; color: #8b5cf6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">2</span>
                    Who and Why? (Age-Related Trends)
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                    <div style="background: #fdf4ff; padding: 20px; border-radius: 15px; border: 1px solid #f5d0fe;">
                        <h5 style="color: #86198f; margin-bottom: 15px; font-weight: 700;">Younger Adults (< 50)</h5>
                        <p style="font-size: 0.95em; color: #701a75; line-height: 1.5;">
                            Usually <strong>Acute Disc Herniation</strong>. The "jelly" inside the disc (nucleus pulposus) squirts out 
                            and smashes a nerve root. 
                        </p>
                        <ul style="margin-top: 10px; color: #701a75; font-size: 0.9em; padding-left: 20px;">
                            <li>Trigger: Heavy lifting or sudden twisting</li>
                            <li>Pain: Sudden, sharp, "electric shock" pain</li>
                            <li>EMG Timing: Often done too early (wait 3 weeks!)</li>
                        </ul>
                    </div>
                    <div style="background: #fffbeb; padding: 20px; border-radius: 15px; border: 1px solid #fef3c7;">
                        <h5 style="color: #92400e; margin-bottom: 15px; font-weight: 700;">Older Adults (> 50)</h5>
                        <p style="font-size: 0.95em; color: #78350f; line-height: 1.5;">
                            Usually <strong>Spinal Stenosis/Spondylosis</strong>. This is slow and "crumbly." Bone spurs (osteophytes) 
                            gradually narrow the exit holes.
                        </p>
                        <ul style="margin-top: 10px; color: #78350f; font-size: 0.9em; padding-left: 20px;">
                            <li>Trigger: Gradual onset, worse with walking</li>
                            <li>Pain: Aching, heavy, "claudication" of the nerves</li>
                            <li>EMG Timing: Often shows chronic changes (large, rare MUAPs)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Section 3: The "EMG Clock" (Timeline) -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #069669; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #ecfdf5; color: #069669; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">3</span>
                    The EMG "Clock": Timing is Everything
                </h4>
                <p style="color: #475569; margin-bottom: 25px; line-height: 1.6;">
                    Residents often ask: "Should I do the EMG today?" The answer depends on where we are on the <strong>biological clock of nerve death.</strong> 
                    Fibrillation potentials (evidence of nerve death) don't just appear immediately. They take time to travel down the wire.
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <!-- Time Phase 1 -->
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="background: #10b981; color: white; padding: 10px; border-radius: 12px; font-weight: 800; min-width: 100px; text-align: center; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);">
                            Day 0-3
                            <div style="font-size: 0.7em; font-weight: 400; margin-top: 4px;">Immediate</div>
                        </div>
                        <div style="flex: 1; background: #f0fdf4; padding: 15px; border-radius: 12px; border: 1px solid #d1fae5;">
                            <strong style="color: #065f46;">Recruitment Failure:</strong> You won't see "fibs" yet. You'll just see <em>decreased recruitment</em> 
                            (the muscle isn't getting enough commands). F-waves might be slightly slow.
                        </div>
                    </div>
                    
                    <!-- Time Phase 2 -->
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="background: #059669; color: white; padding: 10px; border-radius: 12px; font-weight: 800; min-width: 100px; text-align: center; box-shadow: 0 4px 10px rgba(5, 150, 105, 0.2);">
                            Day 7-10
                            <div style="font-size: 0.7em; font-weight: 400; margin-top: 4px;">Phase 1</div>
                        </div>
                        <div style="flex: 1; background: #f0fdf4; padding: 15px; border-radius: 12px; border: 1px solid #d1fae5;">
                            <strong style="color: #065f46;">Paraspinal Fire:</strong> Denervation reaches the <strong>paraspinal muscles</strong> (muscles in the back) 
                            because they are physically <em>closest</em> to the spine. If you see abnormalities here, you've localized it to the root!
                        </div>
                    </div>

                    <!-- Time Phase 3 -->
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="background: #047857; color: white; padding: 10px; border-radius: 12px; font-weight: 800; min-width: 100px; text-align: center; box-shadow: 0 4px 10px rgba(4, 120, 87, 0.2);">
                            Day 14-21
                            <div style="font-size: 0.7em; font-weight: 400; margin-top: 4px;">Phase 2</div>
                        </div>
                        <div style="flex: 1; background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7;">
                            <strong style="color: #92400e;">Limb Invasion:</strong> Fibrillations finally arrive in the arm or leg. Now you can do a full limb study. 
                            <strong>This is the "Golden Window" for diagnostic precision.</strong>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 4: Clinical Localization Table -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #3b82f6; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #eff6ff; color: #3b82f6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">4</span>
                    Mastering the Levels: Clinical Localization
                </h4>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                        <thead>
                            <tr style="background: #f1f5f9; color: #475569;">
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: center;">Root</th>
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: left;">Key Weakness / Muscles</th>
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: center;">Reflex</th>
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: left;">Resident Pro-Tip</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #2563eb; background: #f8fafc;">C5</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0;">Biceps, Deltoid, Rhomboids</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center;">Biceps</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 0.9em; font-style: italic; color: #64748b;">"Check the rhomboids to prove it's the root, not the plexus!"</td>
                            </tr>
                            <tr style="background: #fdfcf8;">
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #2563eb; background: #f1f5f9;">C6</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0;">Biceps, Brachioradialis, PT</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center;">Brachiorad.</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 0.9em; font-style: italic; color: #64748b;">"The 'Thumb Root'. Often confused with Carpal Tunnel!"</td>
                            </tr>
                            <tr>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #2563eb; background: #f8fafc;">C7</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0;">Triceps, FCR, Finger Ext</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center;">Triceps</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 0.9em; font-style: italic; color: #64748b;">"Most common cervical root. Triceps is your best friend here."</td>
                            </tr>
                            <tr style="background: #fdfcf8;">
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #2563eb; background: #f1f5f9;">L5</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0;">Tib Ant, EHL, Glut Med</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center;">Med Hamst.</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 0.9em; font-style: italic; color: #64748b;">"Always check the Glut Med. If it's abnormal, the lesion is in the root, not the peroneal nerve!"</td>
                            </tr>
                            <tr>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #2563eb; background: #f8fafc;">S1</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0;">Gastroc, Soleus, Glut Max</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center;">Achilles</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 0.9em; font-style: italic; color: #64748b;">"The 'Foot Slapping' root. Look for S1 paraspinals down low."</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Section 5: The "HI MADAM" Differential -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #f59e0b; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 15px; font-size: 1.5em; font-weight: 700;">
                    Don't Be a "Disc-Snob": The HI MADAM Differential
                </h4>
                <p style="color: #475569; margin-bottom: 20px; line-height: 1.6;">
                    Even though 90% of radiculopathies are due to discs or stenosis, every resident should know the <strong>non-mechanical</strong> 
                    causes. If a patient has multiple levels involved, systemic symptoms, or doesn't improve with rest, think of <strong>HI MADAM</strong>.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">H</div>
                        <div style="font-size: 0.85em; color: #92400e;">Herpes Zoster</div>
                    </div>
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">I</div>
                        <div style="font-size: 0.85em; color: #92400e;">Inflammatory</div>
                    </div>
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">M</div>
                        <div style="font-size: 0.85em; color: #92400e;">Metastasis</div>
                    </div>
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">A</div>
                        <div style="font-size: 0.85em; color: #92400e;">Arachnoiditis</div>
                    </div>
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">D</div>
                        <div style="font-size: 0.85em; color: #92400e;">Diabetes</div>
                    </div>
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">A</div>
                        <div style="font-size: 0.85em; color: #92400e;">Abscess</div>
                    </div>
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">M</div>
                        <div style="font-size: 0.85em; color: #92400e;">Mass/Tumor</div>
                    </div>
                </div>
            </div>

            <!-- Final Diagnostic Pearls: The "Senior Resident Lecture" -->
            <div style="background: #1e293b; padding: 35px; border-radius: 20px; color: white; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <h4 style="color: #38bdf8; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <svg style="width: 28px; height: 28px; margin-right: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    Final Senior Resident "Truths"
                </h4>
                <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                    <p style="margin: 0; line-height: 1.7; opacity: 0.9;">
                        1. <strong>The Paraspinals are NOT optional.</strong> You will find the diagnosis there 10-20% of the time when everything else looks normal. 
                        If you skip them, you're guessing, not diagnosing.
                    </p>
                    <p style="margin: 0; line-height: 1.7; opacity: 0.9;">
                        2. <strong>Rule #2: Rule out the "Impersonators".</strong> For every L5 radikulopathy, verify the Fibular (Peroneal) nerve. 
                        For every C6, check the Median nerve. <em>Prove</em> it's the root by finding abnormalities "upstream" of where the plexus begins.
                    </p>
                    <p style="margin: 0; line-height: 1.7; opacity: 0.9;">
                        3. <strong>Symmetry is a trap.</strong> Don't just look at the bad leg. Look at the good one too. Comparison is your best diagnostic tool.
                    </p>
                </div>
            </div>

            <!-- Quiz Component -->
            ${generateModuleQuiz([
        {
            question: "You have a patient with numbness in the thumb and index finger. The Median SNAP (sensory) is completely normal, but the Biceps and Brachioradialis show denervation. Where is the lesion?",
            options: ["Carpal Tunnel", "Median Nerve at the Elbow", "C6 Nerve Root", "Brachial Plexus"],
            correct: 2,
            explanation: "This is a classic C6 radiculopathy. The clue is the NORMAL sensory study (SNAP) despite the numbness—this means the pinch is 'Behind the DRG'. The involvement of both the Biceps and Brachioradialis (which are innervated by different peripheral nerves but the same C6 root) confirms the level."
        },
        {
            question: "Why do we wait at least 3 weeks after a sudden disc herniation before doing a full EMG study?",
            options: ["To let the pain subside", "To allow enough time for fibrillation potentials to develop in the limbs", "Because insurance won't pay for it sooner", "To allow the disc to heal on its own"],
            correct: 1,
            explanation: "Wallerian degeneration takes time. It takes approximately 2-3 weeks for the distal parts of the nerve in the limbs to show spontaneous activity (fibrillations) after a proximal injury at the root. Doing the study too early might result in a false-negative result!"
        },
        {
            question: "Which muscle should you check to differentiate an L5 radiculopathy from a Peroneal (Fibular) neuropathy?",
            options: ["Tibialis Anterior", "Extensor Hallucis Longus", "Gluteus Medius", "Gastroc"],
            correct: 2,
            explanation: "The Gluteus Medius is innervated by the Superior Gluteal Nerve (L5), which branches off the plexus BEFORE the peroneal nerve forms. If the Glut Med is abnormal, the lesion must be at or proximal to the plexus/root level. If it's normal, the lesion might be distal (like at the fibular head)."
        }
    ])}
        </div>
    `;
}
