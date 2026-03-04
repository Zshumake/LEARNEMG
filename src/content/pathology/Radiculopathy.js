// Radiculopathy Pathophysiology Module
// Nerve root compression patterns and localization

import { generateErnestButton } from '../../modules/audio/AudioData.js';

export function generateContent(module) {
    // Register podcast for this module
    // Podcast registered automatically via AudioData.js

    return `
        <div class="interactive-content" style="position: relative;">
            ${generateErnestButton('radiculopathy', 'Radiculopathy Pathophysiology')}
            <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #c2410c; margin-bottom: 15px; display: flex; align-items: center;">
                    <svg style="width: 24px; height: 24px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Learning Objectives
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div>
                        <p style="color: #9a3412; font-weight: 500;">• Understand radiculopathy pathophysiology and etiology</p>
                        <p style="color: #9a3412; font-weight: 500;">• Recognize myotomal distribution patterns</p>
                    </div>
                    <div>
                        <p style="color: #9a3412; font-weight: 500;">• Master electrodiagnostic findings timeline</p>
                        <p style="color: #9a3412; font-weight: 500;">• Apply clinical localization principles</p>
                    </div>
                </div>
            </div>

            <!-- Definition and Pathophysiology -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #dc2626;">
                <h4 style="color: #2c3e50; margin-bottom: 15px; display: flex; align-items: center;">
                    <svg style="width: 20px; height: 20px; margin-right: 8px; color: #dc2626;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    What is Radiculopathy?
                </h4>
                <p style="color: #495057; margin-bottom: 15px; line-height: 1.6;">
                    <strong>Radiculopathy</strong> refers to dysfunction of a nerve root, typically caused by compression, inflammation,
                    or injury at the level where the nerve root exits the spinal cord through the neural foramen. The pathology
                    affects both motor and sensory fibers of the nerve root before they join to form peripheral nerves.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #b91c1c; margin-bottom: 10px;">Common Mechanisms</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Disc herniation:</strong> Nucleus pulposus compresses root</li>
                            <li><strong>Foraminal stenosis:</strong> Narrowing of exit canal</li>
                            <li><strong>Inflammation:</strong> Chemical radiculitis</li>
                            <li><strong>Spondylosis:</strong> Degenerative changes</li>
                            <li><strong>Tumor/infection:</strong> Mass effect</li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #b91c1c; margin-bottom: 10px;">Typical Symptoms</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Radicular pain:</strong> Sharp, shooting pain</li>
                            <li><strong>Dermatomal pattern:</strong> Follows nerve root distribution</li>
                            <li><strong>Motor weakness:</strong> Specific muscle groups (myotome)</li>
                            <li><strong>Reflex changes:</strong> Decreased or absent</li>
                            <li><strong>Sensory symptoms:</strong> Numbness, tingling</li>
                        </ul>
                    </div>
                </div>

                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h5 style="color: #b91c1c; margin-bottom: 10px; display: flex; align-items: center;">
                        <svg style="width: 18px; height: 18px; margin-right: 6px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        Key Pathophysiology
                    </h5>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                        <div>
                            <strong style="color: #991b1b;">Location:</strong> Lesion is <em>proximal</em> to dorsal root ganglion &rarr; Sensory NCS remain normal
                        </div>
                        <div>
                            <strong style="color: #991b1b;">Pattern:</strong> Single nerve root affects multiple muscles (myotome) + paraspinal muscles
                        </div>
                        <div>
                            <strong style="color: #991b1b;">Timeline:</strong> EMG changes evolve over days to weeks after onset
                        </div>
                    </div>
                </div>
            </div>

            <!-- Age-Related Causes -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #7c3aed;">
                <h4 style="color: #2c3e50; margin-bottom: 15px; display: flex; align-items: center;">
                    <svg style="width: 20px; height: 20px; margin-right: 8px; color: #7c3aed;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    Age-Related Etiology
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #ede9fe; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #6b21a8; margin-bottom: 10px; display: flex; align-items: center;">
                            Younger Patients (&lt;50 years)
                        </h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Disc herniation</strong> (most common)</li>
                            <li>Acute trauma</li>
                            <li>Athletic injuries</li>
                            <li>Inflammatory conditions</li>
                        </ul>
                    </div>
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #92400e; margin-bottom: 10px; display: flex; align-items: center;">
                            Older Patients (&gt;50 years)
                        </h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Spinal stenosis</strong> (most common)</li>
                            <li>Degenerative spondylosis</li>
                            <li>Foraminal narrowing</li>
                            <li>Malignancy (consider)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- NCS/EMG Pattern Summary -->
            <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px; display: flex; align-items: center;">
                    <svg style="width: 24px; height: 24px; margin-right: 8px; color: #3b82f6;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    Radiculopathy NCS/EMG Pattern
                </h3>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #e2e8f0;">
                                <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Test</th>
                                <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Motor NCS</th>
                                <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Sensory NCS</th>
                                <th style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Needle EMG</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; font-weight: bold; background: #f1f5f9;">Finding</td>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Normal or ↓ amplitude</td>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; text-align: center; color: #059669; font-weight: bold;">Always Normal</td>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">Neuropathic changes</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; font-weight: bold; background: #f1f5f9;">Distribution</td>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">—</td>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; text-align: center;">—</td>
                                <td style="border: 1px solid #cbd5e1; padding: 12px; text-align: center; font-weight: bold; color: #dc2626;">Single myotome + paraspinals</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="margin-top: 12px; padding: 10px; background: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #92400e;">Key Point:</strong> <span style="color: #78350f;">Sensory NCS are always normal because the lesion is proximal to the dorsal root ganglia</span>
                    </div>
                </div>
            </div>

            <!-- Clinical Findings by Root -->
            <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #059669; margin-bottom: 15px; display: flex; align-items: center;">
                    <svg style="width: 24px; height: 24px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    Clinical Findings by Nerve Root
                </h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc);">
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Root</th>
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Reflex</th>
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Key Weakness</th>
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Sensory Distribution</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="background: #f8f9fa;">
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold; text-align: center; background: #e3f2fd;">C5</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Biceps</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Elbow flexion</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Lateral shoulder</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold; text-align: center; background: #e3f2fd;">C6</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Brachioradialis</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Elbow flexion</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Radial forearm, thumb, index</td>
                            </tr>
                            <tr style="background: #f8f9fa;">
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold; text-align: center; background: #e3f2fd;">C7</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Triceps</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Elbow extension</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Middle finger</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold; text-align: center; background: #e3f2fd;">C8</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-style: italic; color: #6c757d;">None</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Finger flexion</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Ring, little finger, hypothenar</td>
                            </tr>
                            <tr style="background: #fff3cd; border-top: 3px solid #ffc107;">
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold; text-align: center; background: #fff3cd;">L4</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Patellar</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Knee extension, ankle dorsiflexion</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Anterolateral thigh, anteromedial calf</td>
                            </tr>
                            <tr style="background: #f8f9fa;">
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold; text-align: center; background: #fff3cd;">L5</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Medial hamstring</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Ankle dorsiflexion, great toe extension</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Posterolateral thigh/calf, dorsal foot</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold; text-align: center; background: #fff3cd;">S1</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Achilles</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Plantar flexion</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Posterior thigh/calf, lateral toes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Etiology -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                <div style="background: white; padding: 20px; border-radius: 15px; border-left: 5px solid #059669;">
                    <h4 style="color: #059669; margin-bottom: 15px; display: flex; align-items: center;">
                        <svg style="width: 20px; height: 20px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        Common Causes
                    </h4>
                    <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li><strong>Herniated nucleus pulposus:</strong> Most common in adults &lt;50 years</li>
                        <li><strong>Spinal stenosis:</strong> Most common in adults &gt;50 years</li>
                    </ul>
                </div>

                <div style="background: white; padding: 20px; border-radius: 15px; border-left: 5px solid #dc2626;">
                    <h4 style="color: #dc2626; margin-bottom: 15px; display: flex; align-items: center;">
                        <svg style="width: 20px; height: 20px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                        "HI MADAM" Mnemonic
                    </h4>
                    <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                        <p><strong>H</strong> - Herpes zoster</p>
                        <p><strong>I</strong> - Inflammatory <span style="font-size: 0.9em; color: #6b7280;">(TB, Lyme, HIV, sarcoid)</span></p>
                        <p><strong>M</strong> - Metastasis</p>
                        <p><strong>A</strong> - Arachnoiditis</p>
                        <p><strong>D</strong> - Diabetes mellitus</p>
                        <p><strong>A</strong> - Abscess</p>
                        <p><strong>M</strong> - Mass <span style="font-size: 0.9em; color: #6b7280;">(neurofibroma, meningioma, etc.)</span></p>
                    </div>
                </div>
            </div>

            <!-- Electrodiagnostic Timeline -->
            <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #7c3aed; margin-bottom: 15px; display: flex; align-items: center;">
                    <svg style="width: 24px; height: 24px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Electrodiagnostic Timeline
                </h3>
                <div style="position: relative; padding: 20px 0;">
                    <div style="position: absolute; left: 50px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #7c3aed, #a855f7, #059669);"></div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px; position: relative;">
                        <div style="background: #7c3aed; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center; z-index: 1;">Day 0</div>
                        <div style="background: #f3f4f6; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Immediate findings:</strong> Decreased recruitment, prolonged F-waves, abnormal H-reflex (S1)
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px; position: relative;">
                        <div style="background: #a855f7; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center; z-index: 1;">1 Week</div>
                        <div style="background: #fef3c7; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Paraspinal abnormalities:</strong> First spontaneous activity appears in paraspinal muscles
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px; position: relative;">
                        <div style="background: #c084fc; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center; z-index: 1;">2 Weeks</div>
                        <div style="background: #fecaca; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Limb involvement:</strong> Abnormal spontaneous activity begins in limb muscles
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px; position: relative;">
                        <div style="background: #d8b4fe; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center; z-index: 1;">3 Weeks</div>
                        <div style="background: #fed7d7; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Full pattern:</strong> Abnormal activity in both paraspinals and limbs
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; position: relative;">
                        <div style="background: #059669; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center; z-index: 1;">5-6 Weeks</div>
                        <div style="background: #dcfce7; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Recovery begins:</strong> Reinnervation patterns start to appear
                        </div>
                    </div>
                </div>
            </div>

            <!-- Key Clinical Points -->
            <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #f59e0b;">
                <h3 style="color: #d97706; margin-bottom: 15px; display: flex; align-items: center;">
                    <svg style="width: 24px; height: 24px; margin-right: 8px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Diagnostic Pearls
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <h5 style="color: #92400e; margin-bottom: 8px;">Myotomal Pattern</h5>
                        <p style="color: #451a03; font-size: 0.9em; line-height: 1.5;">Neuropathic abnormalities in muscles innervated by the same nerve root but different peripheral nerves (e.g., C7: triceps [radial] + flexor carpi radialis [median])</p>
                    </div>
                    <div>
                        <h5 style="color: #92400e; margin-bottom: 8px;">Paraspinal Key</h5>
                        <p style="color: #451a03; font-size: 0.9em; line-height: 1.5;">Paraspinal abnormalities are crucial for diagnosis. Can be the only abnormal finding 10-30% of the time</p>
                    </div>
                    <div>
                        <h5 style="color: #92400e; margin-bottom: 8px;">Sensory Sparing</h5>
                        <p style="color: #451a03; font-size: 0.9em; line-height: 1.5;">Sensory NCS always normal because compression occurs proximal to dorsal root ganglion</p>
                    </div>
                    <div>
                        <h5 style="color: #92400e; margin-bottom: 8px;">Time Dependent</h5>
                        <p style="color: #451a03; font-size: 0.9em; line-height: 1.5;">Specific neuropathic abnormalities vary based on time course - acute vs chronic presentations differ</p>
                    </div>
                </div>
            </div>

            <!-- Radiculopathy Pathophysiology Quiz -->
            ${generateModuleQuiz([
        {
            question: "Why are sensory nerve conduction studies (SNAPs) always normal in radiculopathy?",
            options: [
                "The sensory fibers are not affected in radiculopathy",
                "The lesion is proximal to the dorsal root ganglion",
                "Sensory symptoms are purely subjective and don't affect NCS",
                "The compression only affects motor roots"
            ],
            correct: 1,
            explanation: "In radiculopathy, sensory NCS remain ALWAYS NORMAL because the lesion occurs PROXIMAL to the dorsal root ganglion (DRG). Since the DRG contains the sensory nerve cell bodies, and NCS recordings measure distal to the DRG, the recorded potentials appear normal even though the patient may have sensory symptoms. This is a crucial distinguishing feature from peripheral nerve lesions where SNAPs are reduced."
        },
        {
            question: "A patient has neuropathic changes in triceps (radial nerve), flexor carpi radialis (median nerve), and C7 paraspinal muscles. What is the diagnosis?",
            options: [
                "Radial neuropathy",
                "Median neuropathy",
                "C7 radiculopathy",
                "Brachial plexopathy"
            ],
            correct: 2,
            explanation: "This is C7 RADICULOPATHY. The key features are: (1) MYOTOMAL PATTERN - neuropathic changes in muscles innervated by the same nerve root (C7) but different peripheral nerves (triceps via radial, FCR via median), (2) PARASPINAL INVOLVEMENT - C7 paraspinal abnormalities confirm the lesion is at the root level, (3) Normal sensory NCS (implied). This myotomal distribution pattern distinguishes radiculopathy from single peripheral nerve lesions."
        },
        {
            question: "What is the most common cause of radiculopathy in a 35-year-old patient?",
            options: [
                "Spinal stenosis",
                "Degenerative spondylosis",
                "Herniated nucleus pulposus (disc herniation)",
                "Malignancy"
            ],
            correct: 2,
            explanation: "In patients YOUNGER than 50 years, HERNIATED NUCLEUS PULPOSUS (disc herniation) is the most common cause of radiculopathy. The nucleus pulposus herniates through the annulus fibrosus and compresses the nerve root. In contrast, patients OLDER than 50 years more commonly have SPINAL STENOSIS due to degenerative changes. This age-related pattern is clinically important for differential diagnosis."
        },
        {
            question: "How long after acute radiculopathy onset do abnormal spontaneous potentials (fibrillations) typically appear in limb muscles?",
            options: [
                "Immediately (Day 0)",
                "1 week after onset",
                "2-3 weeks after onset",
                "5-6 weeks after onset"
            ],
            correct: 2,
            explanation: "Abnormal spontaneous activity (fibrillations and positive sharp waves) appears in LIMB muscles approximately 2-3 WEEKS after acute radiculopathy onset. Timeline: Day 0 = decreased recruitment and abnormal F-waves (immediate), 1 week = paraspinal abnormalities appear FIRST, 2-3 weeks = limb muscle abnormalities begin, 3+ weeks = full pattern in both paraspinals and limbs. This timeline is crucial for timing of EDX studies."
        },
        {
            question: "Which reflex is associated with L4 radiculopathy?",
            options: [
                "Achilles reflex",
                "Patellar reflex",
                "Biceps reflex",
                "Medial hamstring reflex"
            ],
            correct: 1,
            explanation: "L4 radiculopathy affects the PATELLAR (knee jerk) reflex. Key L4 findings include: patellar reflex loss, knee extension weakness, ankle dorsiflexion weakness, and sensory changes in anterolateral thigh and anteromedial calf. The reflex patterns are: L4 = patellar, L5 = medial hamstring, S1 = Achilles. C8 has NO associated reflex. Understanding reflex-root relationships aids clinical localization."
        },
        {
            question: "A 60-year-old patient presents with progressive back pain and bilateral leg weakness. What is the most likely etiology?",
            options: [
                "Disc herniation",
                "Spinal stenosis",
                "Inflammatory radiculitis",
                "Athletic injury"
            ],
            correct: 1,
            explanation: "In patients OLDER than 50 years, SPINAL STENOSIS is the most common cause of radiculopathy. Spinal stenosis results from degenerative spondylosis causing foraminal narrowing and progressive nerve root compression. Bilateral involvement with progressive symptoms is typical. In contrast, younger patients (<50 years) typically have acute disc herniation, often with unilateral presentation."
        },
        {
            question: "What percentage of radiculopathy cases may have paraspinal abnormalities as the ONLY EMG finding?",
            options: [
                "0-5% (very rare)",
                "10-30% (not uncommon)",
                "50-70% (majority)",
                "90-100% (almost always)"
            ],
            correct: 1,
            explanation: "Paraspinal abnormalities can be the ONLY EMG finding in 10-30% of radiculopathy cases. This makes paraspinal examination CRUCIAL and emphasizes why it must never be skipped. Paraspinal muscles are innervated by the posterior rami directly from the nerve root, so they are often the earliest and sometimes the only muscles showing denervation. Missing paraspinal examination can result in false-negative studies."
        },
        {
            question: "What does the 'HI MADAM' mnemonic help remember in radiculopathy evaluation?",
            options: [
                "Timeline of EMG changes",
                "Myotomal muscle patterns",
                "Non-mechanical causes of radiculopathy",
                "Nerve root reflex associations"
            ],
            correct: 2,
            explanation: "'HI MADAM' helps recall NON-MECHANICAL causes of radiculopathy: H=Herpes zoster, I=Inflammatory (TB, Lyme, HIV, sarcoid), M=Metastasis, A=Arachnoiditis, D=Diabetes mellitus, A=Abscess, M=Mass (neurofibroma, meningioma). While most radiculopathies are mechanical (disc herniation, stenosis), this mnemonic reminds clinicians to consider infectious, inflammatory, and neoplastic etiologies, especially when presentation is atypical or progressive despite treatment."
        },
        {
            question: "Which nerve root is most commonly affected in cervical radiculopathy?",
            options: [
                "C5",
                "C6",
                "C7",
                "C8"
            ],
            correct: 2,
            explanation: "C7 is the most commonly affected nerve root in cervical radiculopathy (approx 70% of cases). It typically presents with weakness in elbow extension (triceps), wrist flexion, and finger extension, along with sensory loss in the middle finger. C6 is the second most common."
        },
        {
            question: "In an S1 radiculopathy, which finding is most expected?",
            options: [
                "Weakness of ankle dorsiflexion",
                "Loss of patellar reflex",
                "Loss of Achilles reflex",
                "Sensory loss on the medial calf"
            ],
            correct: 2,
            explanation: "S1 radiculopathy classically presents with LOSS OF THE ACHILLES REFLEX. Motor weakness typically affects plantar flexion (gastrocnemius/soleus) and eversion. Sensory loss is in the posterolateral calf and lateral foot (little toe). Ankle dorsiflexion weakness is L5; patellar reflex loss is L4."
        }
    ])}
        </div>
    `;
}


