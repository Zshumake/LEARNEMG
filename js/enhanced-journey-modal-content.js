// Enhanced Journey Modal Content Generation Functions
// Clean implementation for smooth learning content integration

// Modal System Function
function showModal(title, content) {
    console.log('🔍 DEBUG: showModal called with title:', title);
    console.log('🔍 DEBUG: Content length:', content ? content.length : 'null');

    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    console.log('🔍 DEBUG: Elements found:', {
        overlay: !!overlay,
        modalTitle: !!modalTitle,
        modalBody: !!modalBody
    });

    if (!overlay || !modalTitle || !modalBody) {
        console.error('❌ Modal elements not found');
        return;
    }

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    overlay.style.display = 'flex';

    console.log('🔍 DEBUG: Modal display set to:', overlay.style.display);
    console.log('🔍 DEBUG: Modal overlay computed style:', window.getComputedStyle(overlay).display);

    // Scroll to top of page so modal is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Force a repaint
    overlay.offsetHeight;

    // Show visual feedback that modal opened
    console.log(`✅ Modal opened: ${title}`);
    console.log('🔍 DEBUG: Modal should now be visible');
}

// Make showModal globally available
window.showModal = showModal;

// Brachial Plexus Interactive Content Generator
function generateBrachialPlexusInteractiveContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🕸️ Interactive Brachial Plexus System</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Complete interactive brachial plexus anatomy with nerve pathway tracing, clinical patterns, and EMG correlations.
                </p>
            </div>

            <!-- Brachial Plexus Launch Button -->
            <div style="background: #f8fafc; border-radius: 15px; padding: 30px; border: 2px solid #e2e8f0; margin-bottom: 25px; text-align: center;">
                <h3 style="color: #1e40af; margin-bottom: 20px;">🕸️ Launch Interactive Brachial Plexus</h3>
                <p style="color: #64748b; margin-bottom: 25px; font-size: 1.1em;">
                    Open the complete brachial plexus system in a new tab for optimal viewing and interaction.
                </p>
                <button
                    onclick="window.open('brachial-plexus-prototype.html', '_blank', 'width=1400,height=900')"
                    style="
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 10px;
                        font-size: 1.2em;
                        font-weight: 600;
                        cursor: pointer;
                        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
                        transition: all 0.3s;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(59, 130, 246, 0.3)'"
                >
                    🚀 Launch Brachial Plexus System
                </button>
                <div style="margin-top: 15px;">
                    <small style="color: #64748b;">
                        Opens in a new window for full-screen interactive experience
                    </small>
                </div>
            </div>

            <!-- Definition and Anatomy -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #3b82f6;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🧬 What is Brachial Plexopathy?</h4>
                <p style="color: #495057; margin-bottom: 15px; line-height: 1.6;">
                    <strong>Brachial plexopathy</strong> refers to disorders affecting the brachial plexus, a complex network formed by nerve roots
                    C5-T1 that supplies motor and sensory innervation to the entire upper extremity. The plexus is anatomically divided into
                    <strong>roots → trunks → divisions → cords → terminal nerves</strong>.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #1565c0; margin-bottom: 10px;">Anatomical Organization</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Upper trunk:</strong> C5-C6 roots</li>
                            <li><strong>Middle trunk:</strong> C7 root</li>
                            <li><strong>Lower trunk:</strong> C8-T1 roots</li>
                            <li><strong>3 Cords:</strong> Lateral, posterior, medial</li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #1565c0; margin-bottom: 10px;">Key Nerves from Roots</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Long thoracic:</strong> C5-C6-C7 (serratus anterior)</li>
                            <li><strong>Dorsal scapular:</strong> C5 (rhomboids)</li>
                            <li><strong>Critical for localization</strong></li>
                        </ul>
                    </div>
                </div>

                <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h5 style="color: #1565c0; margin-bottom: 10px;">🔬 Clinical Importance</h5>
                    <p style="margin: 0; color: #1e3a8a; font-size: 14px;">
                        <strong>Localization is key:</strong> Different plexus levels have characteristic patterns that help distinguish
                        from root lesions, peripheral neuropathies, and guide treatment decisions, especially in trauma cases.
                    </p>
                </div>
            </div>

            <!-- Clinical Patterns by Location -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #10b981;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🎯 Clinical Patterns by Plexus Location</h4>

                <div style="margin-bottom: 15px;">
                    <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                        <h5 style="color: #047857; margin: 0 0 8px 0;">Panplexus (Complete)</h5>
                        <p style="margin: 0; color: #047857; font-size: 14px;">
                            <strong>Pattern:</strong> Entire arm weakness + sensory loss, BUT serratus anterior and rhomboids spared (key differentiator from root lesions)
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <h5 style="color: #92400e; margin: 0 0 8px 0;">Upper Trunk (Erb's Palsy) - C5-C6</h5>
                        <p style="margin: 0; color: #92400e; font-size: 14px;">
                            <strong>Weakness:</strong> Deltoid, biceps, brachioradialis, supraspinatus | <strong>Sensory:</strong> Lateral arm/forearm | <strong>Reflexes:</strong> ↓ biceps, brachioradialis
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #f3e8ff; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                        <h5 style="color: #6b21a8; margin: 0 0 8px 0;">Middle Trunk (Rare) - C7</h5>
                        <p style="margin: 0; color: #6b21a8; font-size: 14px;">
                            <strong>Weakness:</strong> Triceps, flexor carpi radialis, pronator teres | <strong>Sensory:</strong> Middle finger | <strong>Reflexes:</strong> ↓ triceps only
                        </p>
                    </div>
                </div>

                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
                    <h5 style="color: #dc2626; margin: 0 0 8px 0;">Lower Trunk (Klumpke's) - C8-T1</h5>
                    <p style="margin: 0; color: #dc2626; font-size: 14px;">
                        <strong>Weakness:</strong> All hand intrinsics + long finger flexors | <strong>Sensory:</strong> Medial arm/forearm, 4th-5th fingers | <strong>Reflexes:</strong> Normal
                    </p>
                </div>
            </div>

            <!-- Cord Patterns -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #8b5cf6;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🔗 Cord-Level Patterns</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                    <div style="background: #ede9fe; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #6b21a8; margin-bottom: 10px;">Lateral Cord</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                            <li><strong>Muscles:</strong> Biceps, pronator teres, FCR</li>
                            <li><strong>Sensory:</strong> Lateral forearm, thumb-index</li>
                            <li><strong>Reflex:</strong> ↓ biceps</li>
                        </ul>
                    </div>
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #92400e; margin-bottom: 10px;">Posterior Cord</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                            <li><strong>Muscles:</strong> Complete radial palsy + deltoid</li>
                            <li><strong>Sensory:</strong> Posterior arm/forearm, dorsal hand</li>
                            <li><strong>Reflex:</strong> ↓ triceps, brachioradialis</li>
                        </ul>
                    </div>
                    <div style="background: #fef2f2; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #dc2626; margin-bottom: 10px;">Medial Cord</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                            <li><strong>Muscles:</strong> Similar to lower trunk, spares radial C8</li>
                            <li><strong>Sensory:</strong> Medial arm/forearm, 4th-5th fingers</li>
                            <li><strong>Reflex:</strong> Normal</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Common Etiologies -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #ef4444;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📊 Common Etiologies</h4>

                <div style="margin-bottom: 20px;">
                    <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
                        <h5 style="color: #dc2626; margin: 0 0 10px 0;">🚗 Traumatic (Most Common)</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <p style="margin: 0 0 8px 0; color: #991b1b; font-size: 14px; font-weight: 600;">Motor Vehicle Accidents:</p>
                                <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                                    <li>Head pushed away from shoulder → Upper trunk</li>
                                    <li>Arm pulled up → Lower trunk</li>
                                    <li>May involve root avulsion (poor prognosis)</li>
                                </ul>
                            </div>
                            <div>
                                <p style="margin: 0 0 8px 0; color: #991b1b; font-size: 14px; font-weight: 600;">Birth Trauma:</p>
                                <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                                    <li>Shoulder dystocia → Erb's palsy (C5-C6)</li>
                                    <li>Breech delivery → Klumpke's palsy (C8-T1)</li>
                                    <li>Large infants at higher risk</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <h5 style="color: #92400e; margin: 0 0 10px 0;">🦠 Neoplastic</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px; font-weight: 600;">Primary Tumors:</p>
                                <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                                    <li>Pancoast tumors (lung apex)</li>
                                    <li>Schwannomas, neurofibromas</li>
                                    <li>Direct plexus invasion</li>
                                </ul>
                            </div>
                            <div>
                                <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px; font-weight: 600;">Metastatic:</p>
                                <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                                    <li>Breast cancer (most common)</li>
                                    <li>Lymphoma, lung cancer</li>
                                    <li>Lymph node compression</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                        <h5 style="color: #047857; margin: 0 0 10px 0;">⚡ Neuralgic Amyotrophy (Parsonage-Turner)</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <p style="margin: 0 0 8px 0; color: #047857; font-size: 14px; font-weight: 600;">Triggers:</p>
                                <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                                    <li>Viral illness, immunization</li>
                                    <li>Surgery, trauma</li>
                                    <li>Autoimmune mechanism</li>
                                </ul>
                            </div>
                            <div>
                                <p style="margin: 0 0 8px 0; color: #047857; font-size: 14px; font-weight: 600;">Pattern:</p>
                                <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                                    <li>Severe shoulder pain (days to weeks)</li>
                                    <li>Weakness follows as pain subsides</li>
                                    <li>Often long thoracic nerve involved</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #f3e8ff; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                        <h5 style="color: #6b21a8; margin: 0 0 8px 0;">☢️ Radiation-Induced</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                            <li>Delayed onset (years after RT)</li>
                            <li>Dose >5700 rads</li>
                            <li>Myokymia characteristic</li>
                            <li>Slowly progressive, painless</li>
                        </ul>
                    </div>
                    <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <h5 style="color: #1e40af; margin: 0 0 8px 0;">🏥 Postoperative</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                            <li>Cardiac surgery (most common)</li>
                            <li>Chest wall retraction</li>
                            <li>Usually lower trunk/medial cord</li>
                            <li>Good recovery potential</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Electrodiagnostic Patterns -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #7c3aed;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">⚡ Electrodiagnostic Patterns & Localization</h4>

                <div style="background: #faf5ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h5 style="color: #7c3aed; margin-bottom: 10px;">🔑 Key Principle: SNAP Abnormalities</h5>
                    <p style="margin: 0; color: #5b21b6; font-size: 14px;">
                        <strong>SNAPs are abnormal in plexopathy</strong> (lesion distal to dorsal root ganglion) but
                        <strong>normal in pure radiculopathy</strong> (lesion proximal to DRG). This is the primary differentiator.
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #dc2626; margin-bottom: 10px;">NCS Strategy</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                            <li><strong>Multiple SNAPs:</strong> Lateral antebrachial, radial, median, ulnar, medial antebrachial</li>
                            <li><strong>Bilateral comparison</strong> essential</li>
                            <li><strong>50% amplitude difference</strong> = abnormal</li>
                            <li><strong>Pattern determines</strong> localization</li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #059669; margin-bottom: 10px;">EMG Approach</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                            <li><strong>Extensive sampling:</strong> Multiple nerves, myotomes</li>
                            <li><strong>Proximal muscles:</strong> Key for localization</li>
                            <li><strong>Paraspinals/rhomboids/serratus:</strong> Normal in plexopathy</li>
                            <li><strong>Look for myokymia</strong> (radiation injury)</li>
                        </ul>
                    </div>
                </div>

                <div style="background: #fffbeb; padding: 15px; border-radius: 8px;">
                    <h5 style="color: #92400e; margin-bottom: 10px;">🚨 Important: Thoracic Outlet Syndrome (TOS)</h5>
                    <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px;">
                        <strong>True neurogenic TOS is rare.</strong> Lower trunk pattern with:
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 13px;">
                        <li>Thenar > hypothenar weakness (T1 > C8 fibers affected)</li>
                        <li>Normal median SNAP, abnormal ulnar + medial antebrachial SNAPs</li>
                        <li>Often caused by fibrous band from cervical rib to first rib</li>
                    </ul>
                </div>
            </div>

            <!-- Clinical Correlation -->
            <div style="background: linear-gradient(135deg, #1e293b, #334155); padding: 25px; border-radius: 15px; color: white; margin-bottom: 20px;">
                <h4 style="margin-bottom: 15px;">🩺 Clinical Correlation & Examination</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="margin-bottom: 10px;">Key Examination Points:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li><strong>Scapular winging:</strong> Long thoracic nerve (serratus anterior)</li>
                            <li><strong>Horner's syndrome:</strong> Suggests neoplastic invasion</li>
                            <li><strong>Pain prominent:</strong> Neoplastic > neuralgic amyotrophy > radiation</li>
                            <li><strong>Bilateral involvement:</strong> Consider neuralgic amyotrophy</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 10px;">Prognosis & Management:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li><strong>Trauma with root avulsion:</strong> Poor prognosis, consider surgery</li>
                            <li><strong>Postoperative:</strong> Usually good recovery over months</li>
                            <li><strong>Neuralgic amyotrophy:</strong> Gradual improvement over 1-2 years</li>
                            <li><strong>Serial EMG helpful</strong> to assess reinnervation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Enhanced EMG Localization Reference -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.4em;">💡 Enhanced EMG Localization Guide</h4>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">🎯 Localization Strategy</h5>
                        <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                            <li><strong>Root level:</strong> Paraspinal + rhomboid/serratus abnormal + myotome pattern</li>
                            <li><strong>Trunk level:</strong> Specific nerve combinations + normal paraspinals</li>
                            <li><strong>Cord level:</strong> Multiple terminal nerve involvement + normal paraspinals</li>
                            <li><strong>Peripheral nerve:</strong> Single nerve distribution only</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px;">🔍 Clinical Pearls</h5>
                        <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                            <li><strong>Pain pattern:</strong> Neoplastic > traumatic > radiation (painless)</li>
                            <li><strong>Onset:</strong> Acute (trauma) vs. subacute (neuralgic) vs. chronic (radiation)</li>
                            <li><strong>Age:</strong> Birth trauma vs. young adult trauma vs. older cancer/radiation</li>
                            <li><strong>Bilateral findings:</strong> Suggest neuralgic amyotrophy or systemic cause</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Content generation functions for each module type
function generateEMGIntroductionContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master the systematic approach to electrodiagnostic studies: understand localization principles, essential EMG terminology, patient encounter process, and cardinal rules for accurate interpretation.
                </p>
            </div>

            <!-- Tab Navigation for Enhanced Content -->
            <div style="display: flex; background: #f8fafc; padding: 5px; border-radius: 12px; margin-bottom: 25px; gap: 3px; flex-wrap: wrap;">
                <button onclick="showEMGSection('foundations')" id="foundations-tab" class="emg-tab active-emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🏗️ Foundations
                </button>
                <button onclick="showEMGSection('localization')" id="localization-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🎯 Localization
                </button>
                <button onclick="showEMGSection('terminology')" id="terminology-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    📚 Terminology
                </button>
                <button onclick="showEMGSection('encounter')" id="encounter-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🩺 Patient Encounter
                </button>
                <button onclick="showEMGSection('cardinal')" id="cardinal-tab" class="emg-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    📋 Cardinal Rules
                </button>
            </div>

            <!-- Foundations Section -->
            <div id="foundations-section" class="emg-section">
                <!-- Core Concepts Section -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔍 What are Electrodiagnostic Studies?</h4>

                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin-bottom: 15px;">
                            <strong>Electrodiagnostic (EDX) studies</strong> play a key role in evaluating patients with neuromuscular disorders.
                            Among these studies are included nerve conduction studies (NCSs), repetitive nerve stimulation, late responses,
                            blink reflexes, and needle electromyography (EMG), in addition to a variety of other specialized examinations.
                        </p>
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin: 0;">
                            <strong>NCSs and needle EMG form the core of the EDX study.</strong> They are performed first, and usually yield the
                            greatest diagnostic information. NCSs and needle EMG are complementary, and therefore are always performed
                            together and during the same setting.
                        </p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <h5 style="color: #059669; margin-bottom: 10px;">🧠 Core Components</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>NCS:</strong> Nerve conduction studies</li>
                                <li><strong>Needle EMG:</strong> Muscle evaluation</li>
                                <li><strong>Late responses:</strong> F-waves, H-reflexes</li>
                                <li><strong>Specialized tests:</strong> Repetitive stimulation</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <h5 style="color: #dc2626; margin-bottom: 10px;">⚡ Key Principle</h5>
                            <p style="color: #374151; line-height: 1.6; margin: 0;">
                                <strong>NCS and needle EMG are complementary</strong> and must always be performed together
                                during the same setting to yield the greatest diagnostic information.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Clinical Integration -->
                <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.4em;">🩺 Extension of Clinical Examination</h4>

                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin-bottom: 15px;">
                            <strong>In practice, EDX studies serve as an extension of the clinical examination</strong> and should always be considered as such.
                            Accordingly, a directed neurologic examination should always be performed before EDX studies in order to identify
                            key clinical abnormalities and establish a differential diagnosis.
                        </p>

                        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                            <h6 style="color: #dc2626; margin-bottom: 10px;">⚠️ Critical Point</h6>
                            <p style="color: #374151; margin: 0; font-style: italic;">
                                "With numerous nerves and literally hundreds of muscles available, it is neither desirable for the patient
                                nor practical for the electromyographer to study them all. In each case, the study must be individualized,
                                based on the neurologic examination and differential diagnosis, and modified in real time as the study progresses."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Localization Section -->
            <div id="localization-section" class="emg-section" style="display: none;">
                <!-- Localization is Key -->
                <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #7c3aed; margin-bottom: 20px; font-size: 1.4em;">🎯 The Major Aim: LOCALIZATION</h4>

                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin-bottom: 15px;">
                            <strong>The principal goal of every EDX study is to localize the disorder.</strong>
                            The differential diagnosis is often dramatically narrowed once the disorder has been localized.
                        </p>

                        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
                            <h6 style="color: #7c3aed; margin-bottom: 10px;">First Order Localization</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <div style="color: #374151;">
                                    ✓ <strong>Neuropathic</strong><br>
                                    ✓ <strong>Myopathic</strong>
                                </div>
                                <div style="color: #374151;">
                                    ✓ <strong>Neuromuscular Junction</strong><br>
                                    ✓ <strong>Central Nervous System</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Systematic Localization Framework -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔬 Systematic Localization Framework</h4>

                    <!-- Neuropathic Localization -->
                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">🧠 Neuropathic Localization</h5>
                        <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                            Neuropathic is probably the most common localization made on EDX studies. In conjunction with history and examination,
                            EDX studies can usually further localize the disorder to:
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Neuronopathy</strong> (anterior horn cell, DRG)</li>
                                    <li><strong>Radiculopathy</strong> (nerve root)</li>
                                    <li><strong>Plexopathy</strong> (brachial/lumbosacral)</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Mononeuropathy</strong> (single nerve)</li>
                                    <li><strong>Mononeuropathy multiplex</strong></li>
                                    <li><strong>Polyneuropathy</strong> (generalized)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Key Information Categories -->
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px;">📊 Key Information from EDX Studies</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">Fiber Types</h6>
                                <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 15px;">
                                    <li>Motor</li>
                                    <li>Sensory</li>
                                    <li>Mixed</li>
                                </ul>
                            </div>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">Pathophysiology</h6>
                                <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 15px;">
                                    <li>Axonal loss</li>
                                    <li>Demyelinating</li>
                                    <li>Mixed process</li>
                                </ul>
                            </div>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">Temporal Course</h6>
                                <ul style="color: #374151; font-size: 0.9em; margin: 0; padding-left: 15px;">
                                    <li>Hyperacute (<1 week)</li>
                                    <li>Acute (weeks)</li>
                                    <li>Subacute (months)</li>
                                    <li>Chronic (>months)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Terminology Section -->
            <div id="terminology-section" class="emg-section" style="display: none;">
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">📚 Essential EMG Terminology</h4>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <!-- Basic EMG Concepts -->
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">🔋 Insertional Activity</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Brief burst of electrical activity that occurs when the needle electrode is inserted into or moved within muscle tissue. Normal insertional activity lasts for a few hundred milliseconds after needle movement stops.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px;">⚡ Spontaneous Activity</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Electrical activity that occurs when the muscle is at rest and the needle is not being moved. Normal muscle at rest should be electrically silent except at the motor endplate region.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #7c3aed;">
                            <h5 style="color: #7c3aed; margin-bottom: 15px;">📊 Fibrillation Potentials</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Spontaneous discharges of single muscle fibers occurring at regular intervals. They appear as biphasic spikes with an initial positive deflection and indicate denervation or muscle fiber membrane instability.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #ea580c;">
                            <h5 style="color: #ea580c; margin-bottom: 15px;">⭐ Positive Sharp Waves</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Spontaneous discharges with an initial sharp positive deflection followed by a slow negative phase. Like fibrillation potentials, they indicate denervation and fire at regular intervals.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #0891b2;">
                            <h5 style="color: #0891b2; margin-bottom: 15px;">🔗 Motor Unit</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The smallest functional unit of the motor system, consisting of a single anterior horn cell, its axon, and all the muscle fibers it innervates. Motor units are the building blocks of voluntary muscle contraction.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #9333ea;">
                            <h5 style="color: #9333ea; margin-bottom: 15px;">📈 Motor Unit Action Potential (MUAP)</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The electrical activity recorded from a motor unit during voluntary contraction. Normal MUAPs are analyzed for duration, amplitude, phases, and configuration to assess neuromuscular health.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px;">🔄 Fasciculations</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Spontaneous discharges of an entire motor unit that occur irregularly and may be visible as muscle twitches. They can be benign or pathological, often associated with anterior horn cell disorders.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">📊 Recruitment</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The process by which motor units are activated during increasing voluntary effort. Normal recruitment follows the size principle, with smaller motor units recruited before larger ones.
                            </p>
                        </div>

                        <!-- NCS Advanced Concepts -->
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #1d4ed8;">
                            <h5 style="color: #1d4ed8; margin-bottom: 15px;">⚡ Compound Muscle Action Potential (CMAP)</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The summated electrical response of all muscle fibers in a muscle activated by stimulation of the motor nerve. CMAP amplitude reflects the number of functioning motor axons and muscle fibers.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #7c2d12;">
                            <h5 style="color: #7c2d12; margin-bottom: 15px;">🌊 Sensory Nerve Action Potential (SNAP)</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The electrical response recorded from stimulation of sensory nerve fibers. SNAPs assess the integrity of sensory axons and are often the first to be affected in peripheral neuropathies.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #b45309;">
                            <h5 style="color: #b45309; margin-bottom: 15px;">⏱️ Conduction Velocity</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The speed at which electrical impulses travel along nerve fibers, calculated by dividing distance by the difference in latencies between two stimulation points. Slowed in demyelinating disorders.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #be185d;">
                            <h5 style="color: #be185d; margin-bottom: 15px;">⏰ Distal Latency</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                The time from stimulus artifact to onset of the response when stimulating at the most distal site. Prolonged distal latencies suggest focal slowing, often seen in entrapment neuropathies.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #0f766e;">
                            <h5 style="color: #0f766e; margin-bottom: 15px;">🔄 F-Wave</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                A late response that occurs when the motor nerve stimulus travels antidromically to the anterior horn cell and returns orthodromically to the muscle. F-waves assess proximal nerve conduction.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #991b1b;">
                            <h5 style="color: #991b1b; margin-bottom: 15px;">🎯 H-Reflex</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                A monosynaptic reflex response obtained by electrical stimulation of sensory fibers in mixed nerves. The H-reflex tests the entire reflex arc and is commonly performed in the soleus muscle via tibial nerve stimulation.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #7c3aed;">
                            <h5 style="color: #7c3aed; margin-bottom: 15px;">📉 Conduction Block</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                A focal reduction in CMAP amplitude (>20-50%) when comparing proximal to distal stimulation, without significant temporal dispersion. Indicates focal demyelination with functional block.
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">📊 Temporal Dispersion</h5>
                            <p style="color: #374151; font-size: 0.95em; line-height: 1.6; margin: 0;">
                                Abnormal prolongation and decreased amplitude of the CMAP due to varying conduction velocities of individual axons. Results in a spread-out, polyphasic waveform in demyelinating neuropathies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Patient Encounter Section -->
            <div id="encounter-section" class="emg-section" style="display: none;">
                <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #1d4ed8; margin-bottom: 20px; font-size: 1.4em;">🩺 Patient Encounter Process</h4>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1e40af; margin-bottom: 15px;">📋 Pre-Study Preparation</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">📝 Review Clinical Information</h6>
                                <ul style="color: #6b7280; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>History and physical examination findings</li>
                                    <li>Symptoms: onset, distribution, progression</li>
                                    <li>Previous diagnostic studies and imaging</li>
                                    <li>Current medications and medical history</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">🎯 Formulate Clinical Questions</h6>
                                <ul style="color: #6b7280; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>What is the primary diagnostic question?</li>
                                    <li>Which nerves/muscles need evaluation?</li>
                                    <li>Are there specific findings to confirm/exclude?</li>
                                    <li>What is the expected anatomical localization?</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1e40af; margin-bottom: 15px;">🔍 Study Execution Protocol</h5>
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div style="flex: 1; background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1e40af; margin-bottom: 10px;">1️⃣ Nerve Conduction Studies</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Start with most symptomatic area</li>
                                    <li>Include both motor and sensory studies</li>
                                    <li>Compare symptomatic to asymptomatic side</li>
                                    <li>Add late responses (F-waves, H-reflexes) as needed</li>
                                </ul>
                            </div>
                            <div style="flex: 1; background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #059669;">
                                <h6 style="color: #059669; margin-bottom: 10px;">2️⃣ Needle EMG</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Select muscles based on NCS findings</li>
                                    <li>Sample different nerve root levels</li>
                                    <li>Include proximal and distal muscles</li>
                                    <li>Examine paraspinal muscles when indicated</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #1e40af; margin-bottom: 15px;">📊 Interpretation Framework</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #92400e; margin-bottom: 8px;">🎯 Localization</h6>
                                <p style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0;">
                                    Determine anatomical level of lesion: nerve root, plexus, peripheral nerve, neuromuscular junction, or muscle.
                                </p>
                            </div>
                            <div style="background: #dbeafe; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #1d4ed8; margin-bottom: 8px;">🔬 Pathophysiology</h6>
                                <p style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0;">
                                    Classify as axonal vs. demyelinating, acute vs. chronic, or myopathic pattern.
                                </p>
                            </div>
                            <div style="background: #dcfce7; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #166534; margin-bottom: 8px;">⚖️ Severity</h6>
                                <p style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0;">
                                    Grade severity from mild to severe based on amplitude reduction and abnormal spontaneous activity.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cardinal Rules Section -->
            <div id="cardinal-section" class="emg-section" style="display: none;">
                <div style="background: linear-gradient(135deg, #fecaca, #fed7d7); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.4em;">📋 Six Cardinal Rules of NCS (Preston & Shapiro)</h4>

                    <div style="display: grid; gap: 20px;">
                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                                Clinical Correlation First
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>NCS are an extension of the clinical examination - Always correlate findings with clinical symptoms.</strong> Electrodiagnostic studies should complement, not replace, thorough clinical assessment.
                            </p>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px;">
                                <p style="color: #991b1b; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Key Point:</strong> EDX abnormalities without clinical correlation may represent subclinical disease, anatomical variants, or technical errors. Clinical context is essential for proper interpretation.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #ea580c;">
                            <h5 style="color: #ea580c; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #ea580c; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                                When in Doubt, Think Technical Factors
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Most "abnormalities" are technical errors.</strong> Before concluding pathology exists, systematically review all technical factors that could explain the findings.
                            </p>
                            <div style="background: #fff7ed; padding: 15px; border-radius: 8px;">
                                <p style="color: #9a3412; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Technical Checklist:</strong> Verify temperature >32°C, electrode placement, stimulation adequacy, artifact minimization, and patient cooperation before attributing findings to pathology.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #d97706;">
                            <h5 style="color: #d97706; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #d97706; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                                When in Doubt, Reexamine the Patient
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>If findings don't match exam, recheck both.</strong> Discordant EDX and clinical findings require reevaluation of both the examination and the electrodiagnostic study.
                            </p>
                            <div style="background: #fffbeb; padding: 15px; border-radius: 8px;">
                                <p style="color: #92400e; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Practical Application:</strong> Re-examine specific muscle groups, verify sensory symptoms, and consider alternative diagnoses when EDX results don't correlate with clinical presentation.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #059669; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</span>
                                Use Supramaximal Stimulation
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Increase current 20% beyond plateau.</strong> Ensure all nerve fibers are depolarized to obtain accurate amplitude and latency measurements.
                            </p>
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
                                <p style="color: #166534; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Technical Detail:</strong> Submaximal stimulation leads to underestimation of amplitude, prolonged latency, and false impressions of conduction block or temporal dispersion.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #0891b2;">
                            <h5 style="color: #0891b2; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #0891b2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</span>
                                Optimize Stimulator Position
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Find lowest threshold, then increase to supramaximal.</strong> Proper electrode positioning is critical for accurate nerve stimulation and consistent results.
                            </p>
                            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                                <p style="color: #0c4a6e; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Positioning Strategy:</strong> Move stimulator methodically to find optimal position with lowest threshold, ensuring consistent nerve activation across all stimulation sites.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #7c3aed;">
                            <h5 style="color: #7c3aed; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #7c3aed; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">6</span>
                                Don't Overcall Abnormalities
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Minor findings without clinical correlation may be irrelevant.</strong> Avoid attributing clinical significance to subtle abnormalities that don't correlate with symptoms.
                            </p>
                            <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                <p style="color: #6b21a8; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Clinical Judgment:</strong> Age-related changes, anatomical variants, and subclinical findings should not drive clinical decision-making without corresponding symptoms and signs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}

// EMG Section Navigation Functions
function showEMGSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.emg-section');
    sections.forEach(section => section.style.display = 'none');

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.emg-tab');
    tabs.forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#64748b';
        tab.classList.remove('active-emg-tab');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionName + '-section');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Activate selected tab
    const selectedTab = document.getElementById(sectionName + '-tab');
    if (selectedTab) {
        selectedTab.style.background = 'linear-gradient(135deg, #059669, #047857)';
        selectedTab.style.color = 'white';
        selectedTab.classList.add('active-emg-tab');
    }
}

// Initialize EMG Introduction with foundations section visible
function initializeEMGIntroduction() {
    // Wait a brief moment for DOM elements to be available
    setTimeout(() => {
        showEMGSection('foundations');
    }, 100);
}

// Make functions available globally
window.showEMGSection = showEMGSection;
window.initializeEMGIntroduction = initializeEMGIntroduction;

function generateMuscleQuizContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #10b981;">
                <h3 style="color: #065f46; margin-bottom: 15px;">💪 Advanced Muscle Localization Training</h3>
                <p style="color: #047857; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Interactive quiz system with nerve roots, innervation patterns, and clinical correlation - the same advanced system from the main EMG application.
                </p>
            </div>

            <!-- Note: EMG Needle Localization Guide is available in the dedicated tab above -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                <div style="background: #f8fafc; border-radius: 15px; padding: 25px; border: 2px solid #e2e8f0; text-align: center;">
                    <h4 style="color: #1e40af; margin-bottom: 15px;">🫀 Anatomy Study Cards</h4>
                    <p style="color: #64748b; margin-bottom: 20px; font-size: 1em;">
                        Interactive cards with reveal functionality for detailed study.
                    </p>
                    <button
                        onclick="showStudyCards()"
                        style="
                            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 1.1em;
                            font-weight: 600;
                            cursor: pointer;
                            width: 100%;
                        "
                    >
                        Launch Study Cards
                    </button>
                </div>

                <div style="background: #f8fafc; border-radius: 15px; padding: 25px; border: 2px solid #e2e8f0; text-align: center;">
                    <h4 style="color: #dc2626; margin-bottom: 15px;">🧪 EMG Localization Challenge</h4>
                    <p style="color: #64748b; margin-bottom: 20px; font-size: 1em;">
                        Advanced lesion localization with normal/abnormal muscle patterns.
                    </p>
                    <button
                        onclick="
                            const challengeInterface = document.getElementById('emg-challenge-interface');
                            if (challengeInterface) {
                                challengeInterface.style.display = challengeInterface.style.display === 'none' ? 'block' : 'none';
                                if (challengeInterface.style.display === 'block') {
                                    challengeInterface.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        "
                        style="
                            background: linear-gradient(135deg, #dc2626, #b91c1c);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 1.1em;
                            font-weight: 600;
                            cursor: pointer;
                            width: 100%;
                        "
                    >
                        Launch EMG Challenge
                    </button>
                </div>
            </div>

            <!-- Instructions -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 20px; border-radius: 10px;">
                <h4 style="color: #1e40af; margin-bottom: 15px;">📚 How to Use the Advanced Quiz System</h4>
                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Select Quiz Types:</strong> Choose which anatomical aspects to test (nerve, roots, cords, actions)</li>
                    <li><strong>Choose Mode:</strong> Type answers for harder challenge or use multiple choice</li>
                    <li><strong>Region Selection:</strong> Focus on upper or lower extremity muscles</li>
                    <li><strong>Start Quiz:</strong> Begin interactive questions with immediate feedback</li>
                    <li><strong>EMG Testing Mode:</strong> Advanced continuous quiz with performance statistics</li>
                    <li><strong>EMG Localization Challenge:</strong> Study normal/abnormal muscle patterns to identify lesion locations</li>
                </ul>
            </div>

            <!-- EMG Challenge Interface -->
            <div id="emg-challenge-interface" style="display: none; margin-top: 30px;">
                <!-- Challenge Settings -->
                <div id="emg-challenge-settings" class="challenge-section" style="
                    background: linear-gradient(135deg, #fefcf3, #fef3c7);
                    border: 2px solid #f59e0b;
                    border-radius: 15px;
                    padding: 30px;
                    margin-bottom: 20px;
                ">
                    <div class="challenge-header" style="text-align: center; margin-bottom: 30px;">
                        <h3 style="color: #92400e; margin-bottom: 10px; font-size: 1.5em;">📋 EMG Localization Challenge</h3>
                        <p style="color: #d97706; margin: 0;">Configure your advanced EMG localization challenge parameters</p>
                    </div>

                    <!-- Question Type Toggles -->
                    <div class="question-type-selector" style="margin-bottom: 30px;">
                        <h4 style="color: #92400e; margin-bottom: 15px;">🎯 Select Question Types</h4>
                        <p style="color: #a16207; margin-bottom: 20px;">Choose which types of localizations you want to practice</p>

                        <div class="toggle-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div class="toggle-option active" data-type="root" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('root')" style="
                                display: flex;
                                align-items: center;
                                padding: 15px;
                                background: #f0fdf4;
                                border: 2px solid #10b981;
                                border-radius: 10px;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                <div style="margin-right: 15px; font-size: 1.5em;">🌿</div>
                                <div style="flex: 1;">
                                    <h5 style="margin: 0 0 5px 0; color: #059669;">Nerve Root Lesions</h5>
                                    <p style="margin: 0; font-size: 0.9em; color: #6b7280;">C5-T1, L2-S1 radiculopathies</p>
                                    <div style="font-size: 0.8em; color: #9ca3af; margin-top: 3px;">Examples: C6 radiculopathy, L5 radiculopathy</div>
                                </div>
                                <div class="toggle-status" style="margin-left: 10px;">
                                    <span class="status-indicator active" style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; display: inline-block;"></span>
                                </div>
                            </div>

                            <div class="toggle-option active" data-type="trunk" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('trunk')" style="
                                display: flex;
                                align-items: center;
                                padding: 15px;
                                background: #f0fdf4;
                                border: 2px solid #10b981;
                                border-radius: 10px;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                <div style="margin-right: 15px; font-size: 1.5em;">🌳</div>
                                <div style="flex: 1;">
                                    <h5 style="margin: 0 0 5px 0; color: #059669;">Plexus Trunk Lesions</h5>
                                    <p style="margin: 0; font-size: 0.9em; color: #6b7280;">Upper, middle, lower trunk injuries</p>
                                    <div style="font-size: 0.8em; color: #9ca3af; margin-top: 3px;">Examples: Erb's palsy, Klumpke's palsy</div>
                                </div>
                                <div class="toggle-status" style="margin-left: 10px;">
                                    <span class="status-indicator active" style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; display: inline-block;"></span>
                                </div>
                            </div>

                            <div class="toggle-option active" data-type="cord" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('cord')" style="
                                display: flex;
                                align-items: center;
                                padding: 15px;
                                background: #f0fdf4;
                                border: 2px solid #10b981;
                                border-radius: 10px;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                <div style="margin-right: 15px; font-size: 1.5em;">🔗</div>
                                <div style="flex: 1;">
                                    <h5 style="margin: 0 0 5px 0; color: #059669;">Plexus Cord Lesions</h5>
                                    <p style="margin: 0; font-size: 0.9em; color: #6b7280;">Lateral, posterior, medial cord injuries</p>
                                    <div style="font-size: 0.8em; color: #9ca3af; margin-top: 3px;">Examples: Lateral cord palsy, posterior cord injury</div>
                                </div>
                                <div class="toggle-status" style="margin-left: 10px;">
                                    <span class="status-indicator active" style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; display: inline-block;"></span>
                                </div>
                            </div>

                            <div class="toggle-option active" data-type="peripheral" onclick="window.EMGChallenge && EMGChallenge.toggleQuestionType('peripheral')" style="
                                display: flex;
                                align-items: center;
                                padding: 15px;
                                background: #f0fdf4;
                                border: 2px solid #10b981;
                                border-radius: 10px;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                <div style="margin-right: 15px; font-size: 1.5em;">⚡</div>
                                <div style="flex: 1;">
                                    <h5 style="margin: 0 0 5px 0; color: #059669;">Peripheral Nerve Lesions</h5>
                                    <p style="margin: 0; font-size: 0.9em; color: #6b7280;">Entrapment neuropathies, focal injuries</p>
                                    <div style="font-size: 0.8em; color: #9ca3af; margin-top: 3px;">Examples: Carpal tunnel, peroneal palsy</div>
                                </div>
                                <div class="toggle-status" style="margin-left: 10px;">
                                    <span class="status-indicator active" style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; display: inline-block;"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="challenge-launch" style="text-align: center;">
                        <button class="launch-challenge-btn" onclick="console.log('🔍 Button clicked!', 'window.EMGChallenge:', window.EMGChallenge); if (window.EMGChallenge) { EMGChallenge.startChallenge(); } else { console.error('❌ EMGChallenge not found!'); }" style="
                            background: linear-gradient(135deg, #10b981, #059669);
                            color: white;
                            border: none;
                            padding: 15px 30px;
                            border-radius: 10px;
                            font-size: 1.1em;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s;
                            display: inline-flex;
                            align-items: center;
                            gap: 10px;
                        ">
                            <span style="font-size: 1.2em;">🚀</span>
                            <span>Launch EMG Challenge</span>
                        </button>
                        <div style="margin-top: 10px; color: #a16207; font-size: 0.9em;">At least one question type must be selected</div>
                    </div>
                </div>

                <!-- Active Challenge -->
                <div id="emg-challenge-active" class="challenge-section" style="display: none;
                    background: linear-gradient(135deg, #fefcf3, #fef3c7);
                    border: 2px solid #f59e0b;
                    border-radius: 15px;
                    padding: 30px;
                ">
                    <div class="challenge-header" style="text-align: center; margin-bottom: 30px;">
                        <h3 style="color: #92400e; margin-bottom: 10px;">🔬 EMG Case Analysis</h3>
                        <div style="color: #a16207; font-size: 1.1em;">
                            <p id="challenge-scenario" style="margin: 0;">Loading case scenario...</p>
                        </div>
                    </div>

                    <div class="findings-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        <div class="abnormal-findings" style="
                            background: #fef2f2;
                            border: 2px solid #dc2626;
                            border-radius: 10px;
                            padding: 20px;
                        ">
                            <h5 style="color: #dc2626; margin-bottom: 15px; font-size: 1.2em;">❌ Abnormal Muscles (Denervation)</h5>
                            <ul id="challenge-abnormal-muscles" style="
                                color: #991b1b;
                                line-height: 1.6;
                                margin: 0;
                                padding-left: 20px;
                            ">
                                <!-- Abnormal muscles will be populated here -->
                            </ul>
                        </div>

                        <div class="normal-findings" style="
                            background: #f0fdf4;
                            border: 2px solid #10b981;
                            border-radius: 10px;
                            padding: 20px;
                        ">
                            <h5 style="color: #10b981; margin-bottom: 15px; font-size: 1.2em;">✅ Normal Muscles</h5>
                            <ul id="challenge-normal-muscles" style="
                                color: #065f46;
                                line-height: 1.6;
                                margin: 0;
                                padding-left: 20px;
                            ">
                                <!-- Normal muscles will be populated here -->
                            </ul>
                        </div>
                    </div>

                    <div class="challenge-question" style="
                        background: white;
                        border-radius: 10px;
                        padding: 20px;
                        margin-bottom: 20px;
                        text-align: center;
                    ">
                        <div class="question-text" id="challenge-question-text" style="
                            color: #374151;
                            font-size: 1.2em;
                            font-weight: 600;
                            margin-bottom: 20px;
                        ">
                            Where is the most likely location of the lesion?
                        </div>

                        <div class="answer-options-challenge" id="challenge-answer-options" style="
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                            gap: 10px;
                        ">
                            <!-- Answer options will be populated here -->
                        </div>
                    </div>

                    <div class="challenge-controls" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <button id="challenge-back-btn" onclick="window.EMGChallenge && EMGChallenge.backToSettings()" style="
                            background: #6b7280;
                            color: white;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            ← Back to Settings
                        </button>
                        <button id="challenge-submit-btn" onclick="window.EMGChallenge && EMGChallenge.submitAnswer()" disabled style="
                            background: #10b981;
                            color: white;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                            opacity: 0.5;
                        ">
                            Submit Analysis
                        </button>
                        <button id="challenge-next-btn" onclick="window.EMGChallenge && EMGChallenge.nextCase()" style="display: none;
                            background: #10b981;
                            color: white;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            Next Case →
                        </button>
                    </div>

                    <div class="challenge-feedback" id="challenge-feedback" style="display: none;">
                        <!-- Feedback will be populated here -->
                    </div>
                </div>
            </div>

            <!-- Required HTML for quiz functionality -->
            <div id="muscle-test-modal" class="muscle-test-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000;">
                <div class="muscle-test-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 15px; padding: 30px; max-width: 600px; width: 90%; max-height: 80%; overflow-y: auto;">
                    <div class="muscle-test-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <div class="test-title">
                            <h3 style="margin: 0; color: #1e40af;">🧪 Continuous Muscle Anatomy Quiz</h3>
                            <div class="test-stats" style="margin-top: 10px;">
                                <span id="questions-answered" style="margin-right: 15px; color: #6b7280;">Questions: 0</span>
                                <span id="current-accuracy" style="color: #6b7280;">Accuracy: 0%</span>
                            </div>
                        </div>
                        <button class="close-test-btn" onclick="MuscleAnatomy.stopMuscleTest()" style="
                            background: #dc2626;
                            color: white;
                            border: none;
                            padding: 8px 12px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                        ">✕ Stop Quiz</button>
                    </div>

                    <div class="muscle-test-body" id="muscle-test-body">
                        <div class="test-question">
                            <h4 id="question-text" style="margin-bottom: 20px; color: #374151;">Loading question...</h4>
                            <div id="answer-choices" class="answer-choices">
                                <!-- Multiple choice options will be populated here -->
                            </div>
                        </div>

                        <div id="answer-feedback" class="answer-feedback" style="display: none; margin-top: 20px; padding: 15px; border-radius: 8px;">
                            <div class="feedback-content">
                                <div id="feedback-result" style="font-weight: 600; margin-bottom: 10px;"></div>
                                <div id="feedback-explanation" style="color: #6b7280;"></div>
                            </div>
                            <button id="next-question-btn" class="next-question-btn" onclick="MuscleAnatomy.nextQuestion()" style="
                                margin-top: 15px;
                                padding: 10px 20px;
                                background: #10b981;
                                color: white;
                                border: none;
                                border-radius: 6px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Next Question →</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}

function generateNCSFundamentalsContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master comprehensive nerve conduction study principles: physiology, techniques, calculations, clinical applications, and professional standards for accurate electrodiagnostic interpretation.
                </p>
            </div>

            <!-- Tab Navigation for Enhanced Content -->
            <div style="display: flex; background: #f8fafc; padding: 5px; border-radius: 12px; margin-bottom: 25px; gap: 3px; flex-wrap: wrap;">
                <button onclick="showNCSSection('fundamentals')" id="ncs-fundamentals-tab" class="ncs-tab active-ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🔬 Fundamentals
                </button>
                <button onclick="showNCSSection('techniques')" id="ncs-techniques-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    ⚡ Techniques
                </button>
                <button onclick="showNCSSection('calculations')" id="ncs-calculations-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🧮 Calculations
                </button>
                <button onclick="showNCSSection('clinical')" id="ncs-clinical-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🏥 Clinical
                </button>
                <button onclick="showNCSSection('standards')" id="ncs-standards-tab" class="ncs-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    📋 Standards
                </button>
            </div>

            <!-- Fundamentals Section -->
            <div id="ncs-fundamentals-section" class="ncs-section">
                <!-- Nerve Physiology -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🧬 Nerve Physiology & Action Potentials</h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                            <h5 style="color: #92400e; margin-bottom: 15px;">⚡ Membrane Physiology</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Resting Potential:</strong> -70mV (Na⁺/K⁺ ATPase pump)</li>
                                <li><strong>Threshold:</strong> -55mV triggers voltage-gated Na⁺ channels</li>
                                <li><strong>Depolarization:</strong> Na⁺ influx → +30mV peak</li>
                                <li><strong>Repolarization:</strong> K⁺ efflux restores negative potential</li>
                                <li><strong>Refractory Period:</strong> Absolute (1ms) & relative phases</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">🚄 Conduction Velocity Factors</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Myelination:</strong> Saltatory conduction (50x faster)</li>
                                <li><strong>Axon Diameter:</strong> Larger = faster (square root relationship)</li>
                                <li><strong>Temperature:</strong> 2-5% decrease per 1°C drop</li>
                                <li><strong>Internodal Distance:</strong> Affects conduction efficiency</li>
                                <li><strong>Age:</strong> 0.5-1 m/s decrease per decade after 30</li>
                            </ul>
                        </div>
                    </div>

                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #f59e0b;">
                        <h5 style="color: #92400e; margin-bottom: 15px;">🔬 Fiber Type Classification</h5>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                                <strong style="color: #92400e;">Aα (Motor)</strong>
                                <div style="color: #6b7280; font-size: 0.9em; margin-top: 5px;">
                                    12-20μm diameter<br>
                                    70-120 m/s<br>
                                    Heavily myelinated
                                </div>
                            </div>
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
                                <strong style="color: #059669;">Aβ (Touch/Vibration)</strong>
                                <div style="color: #6b7280; font-size: 0.9em; margin-top: 5px;">
                                    5-12μm diameter<br>
                                    30-70 m/s<br>
                                    Myelinated
                                </div>
                            </div>
                            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
                                <strong style="color: #374151;">C (Pain/Temperature)</strong>
                                <div style="color: #6b7280; font-size: 0.9em; margin-top: 5px;">
                                    0.4-1.2μm diameter<br>
                                    0.5-2 m/s<br>
                                    Unmyelinated
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compound Potentials Deep Dive -->
                <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #1d4ed8; margin-bottom: 20px; font-size: 1.4em;">📊 Compound Potentials Deep Dive</h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                            <h5 style="color: #1d4ed8; margin-bottom: 15px;">🔋 CMAP (Compound Muscle Action Potential)</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Generation:</strong> Stimulate motor nerve → muscle fiber depolarization</li>
                                <li><strong>Amplitude:</strong> Reflects number of functioning motor axons</li>
                                <li><strong>Latency:</strong> Time to fastest conducting motor fibers</li>
                                <li><strong>Duration:</strong> Indicates synchrony of muscle fiber activation</li>
                                <li><strong>Area:</strong> Total electrical activity (amplitude × duration)</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px;">🌊 SNAP (Sensory Nerve Action Potential)</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Recording:</strong> Orthodromic (physiological) vs antidromic</li>
                                <li><strong>Amplitude:</strong> Lower than CMAP (μV vs mV)</li>
                                <li><strong>Sensitivity:</strong> First affected in length-dependent neuropathies</li>
                                <li><strong>Peak Latency:</strong> Time to maximum negative deflection</li>
                                <li><strong>Morphology:</strong> Triphasic waveform in normal studies</li>
                            </ul>
                        </div>
                    </div>

                    <div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #3b82f6;">
                        <h5 style="color: #1d4ed8; margin-bottom: 15px;">⚖️ Factors Affecting Amplitude & Morphology</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 8px; font-weight: 600;">Technical Factors</h6>
                                <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Electrode placement and contact</li>
                                    <li>Stimulus intensity and duration</li>
                                    <li>Filter settings and gain</li>
                                    <li>Temperature and skin impedance</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 8px; font-weight: 600;">Physiological Factors</h6>
                                <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Age and height effects</li>
                                    <li>Muscle bulk and anatomy</li>
                                    <li>Temporal dispersion</li>
                                    <li>Phase cancellation</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 8px; font-weight: 600;">Pathological Factors</h6>
                                <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Axonal loss (amplitude ↓)</li>
                                    <li>Demyelination (dispersion ↑)</li>
                                    <li>Conduction block</li>
                                    <li>Reinnervation changes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Techniques Section -->
            <div id="ncs-techniques-section" class="ncs-section" style="display: none;">
                <!-- Stimulation Techniques -->
                <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #166534; margin-bottom: 20px; font-size: 1.4em;">⚡ Stimulation Techniques & Methods</h4>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">🎯 Supramaximal Stimulation</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">Principles</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Definition:</strong> 20-50% above stimulus threshold for maximum response</li>
                                    <li><strong>Purpose:</strong> Ensure all axons are depolarized</li>
                                    <li><strong>Verification:</strong> No amplitude increase with higher intensity</li>
                                    <li><strong>Safety:</strong> Avoid excessive current (patient discomfort)</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 10px; font-weight: 600;">Parameters</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Duration:</strong> 0.1-1.0ms (typically 0.2ms)</li>
                                    <li><strong>Intensity:</strong> 10-100mA range</li>
                                    <li><strong>Waveform:</strong> Square wave, constant current</li>
                                    <li><strong>Polarity:</strong> Cathode (-) stimulates, anode (+) blocks</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">📏 Electrode Placement & Spacing</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #166534; margin-bottom: 10px;">Motor Studies</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Active (G1):</strong> Over motor point of muscle</li>
                                    <li><strong>Reference (G2):</strong> Over tendon or bone</li>
                                    <li><strong>Ground:</strong> Between stimulator and recording electrodes</li>
                                    <li><strong>Distance:</strong> 8cm between stimulation sites (standard)</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 10px;">Sensory Studies</h6>
                                <ul style="color: #374151; font-size: 0.95em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Recording:</strong> Over nerve trunk (G1-G2: 3-4cm apart)</li>
                                    <li><strong>Distance:</strong> 14cm between stimulation and recording (standard)</li>
                                    <li><strong>Stimulation:</strong> Distally for orthodromic studies</li>
                                    <li><strong>Advantage:</strong> Orthodromic = physiological direction</li>
                                    <li><strong>Alternative:</strong> Antidromic for digit-to-palm studies</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">🌡️ Technical Factors & Optimization</h5>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #dc2626; margin-bottom: 10px;">🌡️ Temperature Control</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Target:</strong> Limb temp >32°C</li>
                                    <li><strong>Effect:</strong> 2-5% CV change per 1°C</li>
                                    <li><strong>Warming:</strong> Heating lamps, warm water</li>
                                    <li><strong>Monitoring:</strong> Surface thermometer</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #7c3aed; margin-bottom: 10px;">📡 Signal Quality</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Impedance:</strong> <5kΩ for surface electrodes</li>
                                    <li><strong>Artifacts:</strong> Movement, 60Hz, stimulator</li>
                                    <li><strong>Filters:</strong> Low-pass 10kHz, high-pass 2-20Hz</li>
                                    <li><strong>Averaging:</strong> Multiple sweeps for SNAPs</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #059669; margin-bottom: 10px;">⚙️ Equipment Setup</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Gain:</strong> 2-5mV/div (motor), 10-20μV/div (sensory)</li>
                                    <li><strong>Sweep:</strong> 2-5ms/div (motor), 1-2ms/div (sensory)</li>
                                    <li><strong>Sensitivity:</strong> Optimize for clear waveform visualization</li>
                                    <li><strong>Calibration:</strong> Daily equipment verification</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Late Responses -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔄 Late Responses & Special Techniques</h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                            <h5 style="color: #92400e; margin-bottom: 15px;">🔄 F-Wave Studies</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Pathway:</strong> Antidromic to anterior horn → orthodromic return</li>
                                <li><strong>Latency:</strong> Assesses entire motor pathway length</li>
                                <li><strong>Normal Values:</strong> <31ms (median), <56ms (tibial)</li>
                                <li><strong>Clinical Use:</strong> Proximal conduction, radiculopathy</li>
                                <li><strong>Abnormalities:</strong> Prolonged, absent, or dispersed</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px;">🎯 H-Reflex Studies</h5>
                            <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li><strong>Pathway:</strong> Monosynaptic reflex arc (Ia afferent → α motor)</li>
                                <li><strong>Technique:</strong> Submaximal tibial nerve stimulation</li>
                                <li><strong>Recording:</strong> Soleus muscle surface electrodes</li>
                                <li><strong>Normal:</strong> <35ms latency, symmetric bilaterally</li>
                                <li><strong>Pathology:</strong> S1 radiculopathy, polyneuropathy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Calculations Section -->
            <div id="ncs-calculations-section" class="ncs-section" style="display: none;">
                <!-- Interactive Calculation System -->
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🧮 Interactive Calculation System</h4>

                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1f2937; margin-bottom: 20px;">📐 Conduction Velocity Calculations</h5>

                        <!-- Example 1: Normal Median Motor -->
                        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #10b981;">
                            <h6 style="color: #059669; margin-bottom: 15px;">Example 1: Normal Median Motor Study</h6>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center; margin: 15px 0;">
                                <div style="background: #ecfdf5; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Distance</div>
                                    <div style="font-size: 1.1em; color: #059669; margin: 5px 0; font-weight: bold;">8 cm</div>
                                </div>
                                <div style="background: #ecfdf5; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Wrist Latency</div>
                                    <div style="font-size: 1.1em; color: #059669; margin: 5px 0; font-weight: bold;">3.2 ms</div>
                                </div>
                                <div style="background: #ecfdf5; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Elbow Latency</div>
                                    <div style="font-size: 1.1em; color: #059669; margin: 5px 0; font-weight: bold;">4.8 ms</div>
                                </div>
                                <div style="background: #166534; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: white; font-size: 0.9em;">CV Result</div>
                                    <div style="font-size: 1.1em; color: white; margin: 5px 0; font-weight: bold;">50 m/s</div>
                                </div>
                            </div>
                            <div style="text-align: center; background: #f0fdf4; padding: 12px; border-radius: 6px;">
                                <strong style="color: #166534;">Calculation: 8 cm ÷ (4.8 - 3.2) ms = 8 ÷ 1.6 = 50 m/s ✓ Normal</strong>
                            </div>
                        </div>

                        <!-- Example 2: Abnormal Ulnar -->
                        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #dc2626;">
                            <h6 style="color: #dc2626; margin-bottom: 15px;">Example 2: Ulnar Neuropathy at Elbow</h6>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center; margin: 15px 0;">
                                <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Distance</div>
                                    <div style="font-size: 1.1em; color: #dc2626; margin: 5px 0; font-weight: bold;">8 cm</div>
                                </div>
                                <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Below Elbow</div>
                                    <div style="font-size: 1.1em; color: #dc2626; margin: 5px 0; font-weight: bold;">3.1 ms</div>
                                </div>
                                <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Above Elbow</div>
                                    <div style="font-size: 1.1em; color: #dc2626; margin: 5px 0; font-weight: bold;">7.5 ms</div>
                                </div>
                                <div style="background: #991b1b; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: white; font-size: 0.9em;">CV Result</div>
                                    <div style="font-size: 1.1em; color: white; margin: 5px 0; font-weight: bold;">18 m/s</div>
                                </div>
                            </div>
                            <div style="text-align: center; background: #fef2f2; padding: 12px; border-radius: 6px;">
                                <strong style="color: #991b1b;">Calculation: 8 cm ÷ (7.5 - 3.1) ms = 8 ÷ 4.4 = 18 m/s ⚠️ Abnormally Slow</strong>
                            </div>
                        </div>

                        <!-- Example 3: Normal Median Sensory -->
                        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #f59e0b;">
                            <h6 style="color: #92400e; margin-bottom: 15px;">Example 3: Normal Median Sensory Study</h6>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center; margin: 15px 0;">
                                <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Distance</div>
                                    <div style="font-size: 1.1em; color: #92400e; margin: 5px 0; font-weight: bold;">14 cm</div>
                                </div>
                                <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Digit 2 Stim</div>
                                    <div style="font-size: 1.1em; color: #92400e; margin: 5px 0; font-weight: bold;">0 ms</div>
                                </div>
                                <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: #374151; font-size: 0.9em;">Wrist Record</div>
                                    <div style="font-size: 1.1em; color: #92400e; margin: 5px 0; font-weight: bold;">2.8 ms</div>
                                </div>
                                <div style="background: #92400e; padding: 12px; border-radius: 8px;">
                                    <div style="font-weight: 600; color: white; font-size: 0.9em;">CV Result</div>
                                    <div style="font-size: 1.1em; color: white; margin: 5px 0; font-weight: bold;">50 m/s</div>
                                </div>
                            </div>
                            <div style="text-align: center; background: #fef3c7; padding: 12px; border-radius: 6px;">
                                <strong style="color: #92400e;">Calculation: 14 cm ÷ 2.8 ms = 50 m/s ✓ Normal</strong>
                            </div>
                        </div>

                        <!-- Practice Problem -->
                        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 2px solid #3b82f6;">
                            <h6 style="color: #1d4ed8; margin-bottom: 15px;">🧠 Practice Problem: Calculate This!</h6>
                            <p style="color: #374151; margin-bottom: 15px;">Peroneal motor study: Distance = 8cm, Ankle latency = 4.2ms, Fibular head latency = 6.0ms</p>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
                                <button class="calc-option" onclick="checkCalcAnswer(this, false)" style="padding: 10px; background: #f3f4f6; border: 2px solid #d1d5db; border-radius: 8px; cursor: pointer;">35 m/s</button>
                                <button class="calc-option" onclick="checkCalcAnswer(this, true)" style="padding: 10px; background: #f3f4f6; border: 2px solid #d1d5db; border-radius: 8px; cursor: pointer;">44 m/s</button>
                                <button class="calc-option" onclick="checkCalcAnswer(this, false)" style="padding: 10px; background: #f3f4f6; border: 2px solid #d1d5db; border-radius: 8px; cursor: pointer;">52 m/s</button>
                            </div>
                        </div>
                    </div>

                    <!-- Amplitude & Duration Measurements -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #1f2937; margin-bottom: 20px;">📏 Amplitude & Morphology Analysis</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 15px;">📊 Amplitude Measurements</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>CMAP:</strong> Baseline to negative peak (mV)</li>
                                    <li><strong>SNAP:</strong> Peak-to-peak measurement (μV)</li>
                                    <li><strong>Normal CMAP:</strong> >4mV (thenar), >2mV (hypothenar)</li>
                                    <li><strong>Normal SNAP:</strong> >15μV (median), >10μV (ulnar)</li>
                                    <li><strong>Age Effect:</strong> 1-2% decrease per decade</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 15px;">⏱️ Duration & Morphology</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li><strong>Duration:</strong> Onset to return to baseline</li>
                                    <li><strong>Normal CMAP:</strong> 4-12ms duration</li>
                                    <li><strong>Phases:</strong> Baseline crossings + 1</li>
                                    <li><strong>Polyphasia:</strong> >4 phases = abnormal</li>
                                    <li><strong>Area:</strong> Amplitude × duration correlation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clinical Applications Section -->
            <div id="ncs-clinical-section" class="ncs-section" style="display: none;">
                <!-- Normal Values & Pathology Recognition -->
                <div style="background: linear-gradient(135deg, #fecaca, #fed7d7); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.4em;">🏥 Clinical Applications & Pattern Recognition</h4>

                    <!-- Comprehensive Normal Values -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #dc2626; margin-bottom: 20px;">📊 Comprehensive Normal Values by Nerve</h5>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <!-- Upper Extremity Motor -->
                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 15px;">💪 Upper Extremity Motor</h6>
                                <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                                    <strong>Median (APB):</strong><br>
                                    • CV: >49 m/s • DL: <4.4ms • Amp: >4mV<br><br>
                                    <strong>Ulnar (ADM):</strong><br>
                                    • CV: >49 m/s • DL: <3.3ms • Amp: >6mV<br><br>
                                    <strong>Radial (EIP):</strong><br>
                                    • CV: >50 m/s • DL: <3.5ms • Amp: >2mV
                                </div>
                            </div>

                            <!-- Upper Extremity Sensory -->
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 15px;">👋 Upper Extremity Sensory</h6>
                                <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                                    <strong>Median (digit 2):</strong><br>
                                    • CV: >50 m/s • DL: <3.5ms • Amp: >15μV<br><br>
                                    <strong>Ulnar (digit 5):</strong><br>
                                    • CV: >50 m/s • DL: <3.1ms • Amp: >10μV<br><br>
                                    <strong>Radial (snuffbox):</strong><br>
                                    • CV: >50 m/s • DL: <2.8ms • Amp: >12μV
                                </div>
                            </div>

                            <!-- Lower Extremity -->
                            <div style="background: #dbeafe; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1d4ed8; margin-bottom: 15px;">🦵 Lower Extremity</h6>
                                <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                                    <strong>Peroneal Motor:</strong><br>
                                    • CV: >44 m/s • DL: <6.5ms • Amp: >2mV<br><br>
                                    <strong>Tibial Motor:</strong><br>
                                    • CV: >41 m/s • DL: <5.8ms • Amp: >4mV<br><br>
                                    <strong>Sural Sensory:</strong><br>
                                    • CV: >40 m/s • Amp: >6μV
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pathology Pattern Recognition -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #dc2626; margin-bottom: 20px;">🔍 Pathology Pattern Recognition</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                            <!-- Demyelinating Pattern -->
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border: 2px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 15px;">🐌 Demyelinating Pattern</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>CV:</strong> Significantly slowed (&lt;70% of LLN)</li>
                                    <li><strong>DL:</strong> Markedly prolonged (&gt;130% of ULN)</li>
                                    <li><strong>Amplitude:</strong> Relatively preserved early</li>
                                    <li><strong>Morphology:</strong> Temporal dispersion</li>
                                    <li><strong>Conduction Block:</strong> &gt;20-50% amplitude drop</li>
                                </ul>
                            </div>

                            <!-- Axonal Pattern -->
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border: 2px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 15px;">⚡ Axonal Pattern</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>CV:</strong> Normal or mildly slow (&gt;80% of LLN)</li>
                                    <li><strong>DL:</strong> Normal or mildly prolonged</li>
                                    <li><strong>Amplitude:</strong> Reduced (&lt;50% of LLN)</li>
                                    <li><strong>Morphology:</strong> Normal duration</li>
                                    <li><strong>Pattern:</strong> Length-dependent (distal→proximal)</li>
                                </ul>
                            </div>

                            <!-- Mixed Pattern -->
                            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; border: 2px solid #6b7280;">
                                <h6 style="color: #374151; margin-bottom: 15px;">🔗 Mixed Pattern</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li><strong>Features:</strong> Both demyelinating AND axonal</li>
                                    <li><strong>CV:</strong> Moderately slowed</li>
                                    <li><strong>Amplitude:</strong> Reduced with dispersion</li>
                                    <li><strong>Examples:</strong> CIDP, diabetic neuropathy</li>
                                    <li><strong>Prognosis:</strong> Depends on primary pathology</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Localization Principles -->
                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #dc2626; margin-bottom: 20px;">🎯 Localization Principles (Preston & Shapiro Framework)</h5>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 10px;">📍 Focal Lesions</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Discrete slowing or block across specific segment</li>
                                    <li>Normal conduction above/below lesion</li>
                                    <li>Examples: CTS, cubital tunnel, peroneal palsy</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 10px;">🌐 Generalized Lesions</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Uniform slowing across all segments</li>
                                    <li>Multiple nerves affected similarly</li>
                                    <li>Examples: CIDP, CMT, diabetic neuropathy</li>
                                </ul>
                            </div>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 10px;">📏 Length-Dependent</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Distal > proximal involvement</li>
                                    <li>Longest nerves affected first</li>
                                    <li>Examples: Most toxic/metabolic neuropathies</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Standards Section -->
            <div id="ncs-standards-section" class="ncs-section" style="display: none;">
                <!-- Quality Control & Professional Standards -->
                <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #7c3aed; margin-bottom: 20px; font-size: 1.4em;">📋 Professional Standards & Quality Control</h4>

                    <!-- Preston & Shapiro Cardinal Rules for NCS -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #7c3aed; margin-bottom: 20px;">⚖️ Cardinal Rules Applied to NCS (Preston & Shapiro Framework)</h5>

                        <div style="display: grid; gap: 20px;">
                            <div style="background: #faf5ff; padding: 20px; border-radius: 10px; border-left: 5px solid #7c3aed;">
                                <h6 style="color: #7c3aed; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span style="background: #7c3aed; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8em;">1</span>
                                    NCS Must Correlate with Clinical Examination
                                </h6>
                                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 0.95em;">
                                    <strong>Unexpected findings demand re-examination.</strong> If median sensory study is abnormal but patient has normal sensory exam in median distribution, investigate technical factors or consider subclinical disease.
                                </p>
                            </div>

                            <div style="background: #faf5ff; padding: 20px; border-radius: 10px; border-left: 5px solid #059669;">
                                <h6 style="color: #059669; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span style="background: #059669; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8em;">2</span>
                                    Always Consider Technical Factors First
                                </h6>
                                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 0.95em;">
                                    <strong>Most "abnormalities" are technical errors.</strong> Check temperature, electrode placement, stimulus intensity, and patient cooperation before calling a study abnormal.
                                </p>
                            </div>

                            <div style="background: #faf5ff; padding: 20px; border-radius: 10px; border-left: 5px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                                    <span style="background: #dc2626; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8em;">3</span>
                                    Study Multiple Nerves for Pattern Recognition
                                </h6>
                                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 0.95em;">
                                    <strong>Single nerve abnormalities suggest focal lesions; multiple nerve involvement suggests systemic disease.</strong> Compare bilateral studies and examine similar function nerves.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Technical Quality Control -->
                    <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h5 style="color: #7c3aed; margin-bottom: 20px;">🔧 Technical Quality Control Checklist</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h6 style="color: #374151; margin-bottom: 15px; font-weight: 600;">🌡️ Pre-Study Requirements</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>Limb temperature >32°C (warming if needed)</li>
                                    <li>Clean electrode sites with alcohol/abrasive</li>
                                    <li>Check equipment calibration daily</li>
                                    <li>Verify electrode impedance <5kΩ</li>
                                    <li>Explain procedure to reduce anxiety</li>
                                </ul>
                            </div>
                            <div>
                                <h6 style="color: #374151; margin-bottom: 15px; font-weight: 600;">⚙️ During Study Monitoring</h6>
                                <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                                    <li>Maintain consistent electrode placement</li>
                                    <li>Verify supramaximal stimulation achieved</li>
                                    <li>Monitor for movement artifacts</li>
                                    <li>Check stimulus artifact for consistency</li>
                                    <li>Document any technical difficulties</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Clinical Correlation Requirements -->
                    <div style="background: white; padding: 25px; border-radius: 12px;">
                        <h5 style="color: #7c3aed; margin-bottom: 20px;">🩺 Clinical Correlation & Limitations</h5>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #059669; margin-bottom: 10px;">✅ What NCS Can Do</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Assess large myelinated fiber function</li>
                                    <li>Localize focal lesions precisely</li>
                                    <li>Differentiate axonal vs demyelinating</li>
                                    <li>Quantify severity objectively</li>
                                    <li>Monitor progression/recovery</li>
                                </ul>
                            </div>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                                <h6 style="color: #dc2626; margin-bottom: 10px;">❌ NCS Limitations</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Cannot assess small fiber neuropathy</li>
                                    <li>May miss very early/mild disease</li>
                                    <li>Cannot determine precise etiology</li>
                                    <li>Technical factors affect accuracy</li>
                                    <li>Patient cooperation required</li>
                                </ul>
                            </div>
                            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #92400e; margin-bottom: 10px;">⚠️ Reporting Requirements</h6>
                                <ul style="color: #374151; font-size: 0.9em; line-height: 1.5; margin: 0; padding-left: 15px;">
                                    <li>Always correlate with clinical findings</li>
                                    <li>Note technical limitations clearly</li>
                                    <li>Distinguish definite from possible abnormalities</li>
                                    <li>Provide specific recommendations</li>
                                    <li>Include prognostic information when appropriate</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}

// NCS Section Navigation Functions
function showNCSSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.ncs-section');
    sections.forEach(section => section.style.display = 'none');

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.ncs-tab');
    tabs.forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#64748b';
        tab.classList.remove('active-ncs-tab');
    });

    // Show selected section
    const selectedSection = document.getElementById('ncs-' + sectionName + '-section');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Activate selected tab
    const selectedTab = document.getElementById('ncs-' + sectionName + '-tab');
    if (selectedTab) {
        selectedTab.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
        selectedTab.style.color = 'white';
        selectedTab.classList.add('active-ncs-tab');
    }
}

// Initialize NCS Fundamentals with first section visible
function initializeNCSFundamentals() {
    // Wait a brief moment for DOM elements to be available
    setTimeout(() => {
        showNCSSection('fundamentals');
    }, 100);
}

// Pathophysiology section navigation functions
function showPathophysSection(sectionName) {
    // Hide all pathophysiology content sections
    const allPathoSections = document.querySelectorAll('.patho-content');
    allPathoSections.forEach(section => {
        section.style.display = 'none';
    });

    // Remove active styling from all tabs
    const allPathoTabs = document.querySelectorAll('.patho-tab');
    allPathoTabs.forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#8b5cf6';
        tab.classList.remove('active-patho-tab');
    });

    // Show selected content section
    const selectedSection = document.getElementById('patho-' + sectionName + '-content');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Activate selected tab
    const selectedTab = document.getElementById('patho-' + sectionName + '-tab');
    if (selectedTab) {
        selectedTab.style.background = '#8b5cf6';
        selectedTab.style.color = 'white';
        selectedTab.classList.add('active-patho-tab');
    }
}

// Initialize Pathophysiology with first section visible
function initializePathophysiology() {
    setTimeout(() => {
        showPathophysSection('anatomy');
    }, 100);
}

// Make functions available globally
window.showNCSSection = showNCSSection;
window.initializeNCSFundamentals = initializeNCSFundamentals;
window.showPathophysSection = showPathophysSection;
window.initializePathophysiology = initializePathophysiology;

function generateNCSBasicTechniquesContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master proper electrode placement, stimulation techniques, and recording protocols for nerve conduction studies through hands-on video demonstrations.
                </p>
            </div>

            <!-- YouTube NCS Technique Videos -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">📹 Essential NCS Technique Videos for PGY-2s</h4>

                <!-- Upper Extremity Videos -->
                <div style="margin-bottom: 30px;">
                    <h5 style="color: #7c2d12; margin-bottom: 15px; font-size: 1.2em;">🖐️ Upper Extremity NCS</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 10px;">📍 Median Motor Study</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 8px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/cdVrcgeBgIg"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 8px;"
                                        title="Median Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.9em; margin: 0;">
                                <strong>Recording:</strong> Thenar muscles (APB)<br>
                                <strong>Stimulation:</strong> Wrist & elbow
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 10px;">📍 Median Sensory Study</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 8px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/86j7cNLIX0U"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 8px;"
                                        title="Median Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.9em; margin: 0;">
                                <strong>Recording:</strong> Digit 3 to wrist<br>
                                <strong>Stimulation:</strong> Orthodromic stimulation
                            </p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 10px;">📍 Ulnar Motor Study</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 8px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/UmFYJDMucOY"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 8px;"
                                        title="Ulnar Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.9em; margin: 0;">
                                <strong>Recording:</strong> Hypothenar muscles (ADM)<br>
                                <strong>Stimulation:</strong> Wrist, below & above elbow
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 10px;">📍 Ulnar Sensory Study</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 8px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/i9Naurf0eWU"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 8px;"
                                        title="Ulnar Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.9em; margin: 0;">
                                <strong>Recording:</strong> Digit 5 to wrist<br>
                                <strong>Stimulation:</strong> Orthodromic stimulation
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Lower Extremity Videos -->
                <div style="margin-bottom: 30px;">
                    <h5 style="color: #7c2d12; margin-bottom: 15px; font-size: 1.2em;">🦵 Lower Extremity NCS</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 10px;">📍 Common Fibular Motor Study</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 8px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/G1bsDinxuF8"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 8px;"
                                        title="Common Fibular Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.9em; margin: 0;">
                                <strong>Recording:</strong> Extensor digitorum brevis (EDB)<br>
                                <strong>Stimulation:</strong> Ankle, fibular head & popliteal fossa
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 10px;">📍 Tibial Motor Study</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 8px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/pWeH6kCa9lo"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 8px;"
                                        title="Tibial Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.9em; margin: 0;">
                                <strong>Recording:</strong> Abductor hallucis (AH)<br>
                                <strong>Stimulation:</strong> Ankle, popliteal fossa
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Advanced/Specialized Studies -->
                <div style="margin-bottom: 20px;">
                    <h5 style="color: #7c2d12; margin-bottom: 15px; font-size: 1.2em;">🔬 Advanced Studies</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 8px; font-size: 0.95em;">📍 Dorsal Ulnar Cutaneous</h6>
                            <div style="position: relative; width: 100%; height: 150px; background: #f3f4f6; border-radius: 6px; margin-bottom: 10px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/U-60ft_8klI"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 6px;"
                                        title="Dorsal Ulnar Cutaneous Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.8em; margin: 0;">DUC study for ulnar neuropathy localization</p>
                        </div>

                        <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 8px; font-size: 0.95em;">📍 Radial Sensory Study</h6>
                            <div style="position: relative; width: 100%; height: 150px; background: #f3f4f6; border-radius: 6px; margin-bottom: 10px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nMaxrbpyR-0"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 6px;"
                                        title="Radial Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.8em; margin: 0;">Superficial radial sensory technique</p>
                        </div>

                        <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h6 style="color: #1f2937; margin-bottom: 8px; font-size: 0.95em;">📍 Sural Sensory Study</h6>
                            <div style="position: relative; width: 100%; height: 150px; background: #f3f4f6; border-radius: 6px; margin-bottom: 10px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/zP1yAU5DW2s"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 6px;"
                                        title="Sural Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #6b7280; font-size: 0.8em; margin: 0;">Important for polyneuropathy screening</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Technique Tips -->
            <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #166534; margin-bottom: 20px; font-size: 1.3em;">💡 Pro Tips for Success</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #166534; margin-bottom: 15px;">🎯 Electrode Placement</h5>
                        <ul style="color: #374151; line-height: 1.7; margin: 0; padding-left: 20px;">
                            <li>Use consistent landmark measurements</li>
                            <li>Clean skin thoroughly with alcohol</li>
                            <li>Maintain proper ground electrode placement</li>
                            <li>Check impedances before recording</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #166534; margin-bottom: 15px;">⚡ Stimulation Technique</h5>
                        <ul style="color: #374151; line-height: 1.7; margin: 0; padding-left: 20px;">
                            <li>Start with supramaximal stimulation</li>
                            <li>Watch for stimulus artifact</li>
                            <li>Ensure proper cathode positioning</li>
                            <li>Use gel to improve contact</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Interactive Quiz -->
            <div class="quiz-section">
                <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                    <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.3em;">🧠 Check Your Understanding</h4>
                    <div id="technique-quiz" style="background: white; padding: 20px; border-radius: 10px;">
                        <div class="quiz-question" style="margin-bottom: 20px;">
                            <h5 style="color: #1f2937; margin-bottom: 15px;">What is the standard recording site for median motor studies?</h5>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <label style="display: flex; align-items: center; cursor: pointer; padding: 8px;">
                                    <input type="radio" name="q1" value="a" style="margin-right: 10px;">
                                    <span>First dorsal interosseous (FDI)</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer; padding: 8px;">
                                    <input type="radio" name="q1" value="b" style="margin-right: 10px;">
                                    <span>Abductor pollicis brevis (APB)</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer; padding: 8px;">
                                    <input type="radio" name="q1" value="c" style="margin-right: 10px;">
                                    <span>Abductor digiti minimi (ADM)</span>
                                </label>
                            </div>
                        </div>
                        <button onclick="checkAnswer('b', 'Correct! APB is the standard recording muscle for median motor studies.')"
                                style="background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer;">
                            Submit Answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateEMGNeedleBasicsContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #fef2f2, #fee2e2); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #dc2626;">
                <h3 style="color: #b91c1c; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #991b1b; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master needle EMG fundamentals including proper technique, safety protocols, needle types, and basic waveform interpretation for effective neuromuscular evaluation.
                </p>
            </div>

            <!-- Safety Protocol Section -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fcd34d); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #f59e0b;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">⚠️ Essential Safety Protocols</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 12px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px;">🦠 Infection Control</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>Sterile, single-use needles only</li>
                            <li>Clean gloves for each patient</li>
                            <li>Skin prep with alcohol/betadine</li>
                            <li>Proper needle disposal in sharps container</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px;">🚫 Contraindications</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>Anticoagulation (relative)</li>
                            <li>Bleeding disorders</li>
                            <li>Infection at needle site</li>
                            <li>Lymphedema (avoid affected limb)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Needle Types & Techniques -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid rgba(168, 85, 247, 0.1);">
                    <h4 style="color: #7c3aed; margin-bottom: 20px; font-size: 1.3em;">💉 Needle Selection</h4>

                    <div style="margin-bottom: 20px;">
                        <h5 style="color: #6d28d9; margin-bottom: 10px;">Concentric Needle</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em; margin-bottom: 15px;">
                            <li>Most commonly used</li>
                            <li>Good signal-to-noise ratio</li>
                            <li>25-30mm length standard</li>
                            <li>26-30 gauge thickness</li>
                        </ul>
                    </div>

                    <div style="background: #f3f4f6; padding: 15px; border-radius: 10px;">
                        <h5 style="color: #6d28d9; margin-bottom: 10px;">Monopolar Needle</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em;">
                            <li>Higher amplitude signals</li>
                            <li>More painful insertion</li>
                            <li>Larger pickup area</li>
                            <li>Requires separate reference electrode</li>
                        </ul>
                    </div>
                </div>

                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid rgba(34, 197, 94, 0.1);">
                    <h4 style="color: #059669; margin-bottom: 20px; font-size: 1.3em;">🎯 Insertion Technique</h4>

                    <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid #22c55e;">
                        <h5 style="color: #166534; margin-bottom: 10px;">Step-by-Step Process</h5>
                        <ol style="color: #374151; line-height: 1.7; padding-left: 20px;">
                            <li>Palpate muscle belly/anatomical landmarks</li>
                            <li>Insert needle perpendicular to skin</li>
                            <li>Advance slowly through muscle</li>
                            <li>Sample multiple sites within muscle</li>
                            <li>Listen for insertional/spontaneous activity</li>
                        </ol>
                    </div>

                    <div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
                        <p style="color: #92400e; font-weight: 600; margin: 0; font-size: 0.9em;">💡 Tip: Sample at least 10-20 sites per muscle for comprehensive evaluation</p>
                    </div>
                </div>
            </div>

            <!-- Basic Waveform Recognition -->
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                <h4 style="color: #1e40af; margin-bottom: 20px; font-size: 1.3em;">📊 Basic Waveform Recognition</h4>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div style="background: #f8fafc; padding: 15px; border-radius: 10px; text-align: center; border: 2px solid #e2e8f0;">
                        <h5 style="color: #475569; margin-bottom: 10px;">Normal (Silent)</h5>
                        <div style="color: #22c55e; font-size: 1.5em; margin: 10px 0;">📈</div>
                        <p style="color: #64748b; font-size: 0.9em; margin: 0;">No spontaneous activity</p>
                    </div>
                    <div style="background: #fef2f2; padding: 15px; border-radius: 10px; text-align: center; border: 2px solid #fecaca;">
                        <h5 style="color: #dc2626; margin-bottom: 10px;">Fibrillations</h5>
                        <div style="color: #dc2626; font-size: 1.5em; margin: 10px 0;">⚡</div>
                        <p style="color: #7f1d1d; font-size: 0.9em; margin: 0;">Sharp, regular spikes</p>
                    </div>
                    <div style="background: #fffbeb; padding: 15px; border-radius: 10px; text-align: center; border: 2px solid #fed7aa;">
                        <h5 style="color: #d97706; margin-bottom: 10px;">Fasciculations</h5>
                        <div style="color: #d97706; font-size: 1.5em; margin: 10px 0;">🌊</div>
                        <p style="color: #92400e; font-size: 0.9em; margin: 0;">Large, irregular waves</p>
                    </div>
                </div>

                <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                    <h5 style="color: #1e40af; margin-bottom: 12px;">Clinical Interpretation</h5>
                    <ul style="color: #1e3a8a; line-height: 1.6;">
                        <li><strong>Fibrillations/PSWs:</strong> Indicate denervation (2-3 weeks post-injury)</li>
                        <li><strong>Fasciculations:</strong> May suggest anterior horn cell disease</li>
                        <li><strong>Complex repetitive discharges:</strong> Chronic muscle disease</li>
                        <li><strong>Myotonic discharges:</strong> Characteristic "dive bomber" sound</li>
                    </ul>
                </div>
            </div>

            <!-- Patient Communication -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.3em;">💬 Patient Communication</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="color: #047857; margin-bottom: 12px;">Pre-procedure Explanation</h5>
                        <ul style="color: #065f46; line-height: 1.6; font-size: 0.95em;">
                            <li>"Small needle like acupuncture"</li>
                            <li>"Brief discomfort during insertion"</li>
                            <li>"Listen for muscle electrical activity"</li>
                            <li>"Test several muscles as needed"</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="color: #047857; margin-bottom: 12px;">During Procedure</h5>
                        <ul style="color: #065f46; line-height: 1.6; font-size: 0.95em;">
                            <li>"Relax the muscle completely"</li>
                            <li>"Now contract gently"</li>
                            <li>"This may be slightly uncomfortable"</li>
                            <li>"Almost finished with this muscle"</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Interactive Quiz -->
            <div class="quiz-section">
                <h4 style="color: #7c2d12; margin-bottom: 20px;">🧠 Safety & Technique Check</h4>
                <div style="background: #fef7f0; padding: 20px; border-radius: 12px; border: 2px solid rgba(234, 88, 12, 0.2);">
                    <p style="font-size: 1.1em; margin-bottom: 15px; color: #1f2937;">
                        A patient on warfarin (INR 2.8) requests EMG for suspected carpal tunnel syndrome.
                        What is the most appropriate action?
                    </p>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkEMGNeedleAnswer(this, false)">Proceed with normal EMG protocol</button>
                        <button class="quiz-option" onclick="checkEMGNeedleAnswer(this, true)">Consider NCS only, discuss risks with physician</button>
                        <button class="quiz-option" onclick="checkEMGNeedleAnswer(this, false)">Refuse procedure completely</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateBasicPatternsContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0e7ff); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #6366f1;">
                <h3 style="color: #4338ca; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #3730a3; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master the systematic analysis of EMG patterns using morphology, stability, and firing characteristics. Develop expertise in recognizing normal and abnormal spontaneous activity, motor unit potentials, and their clinical significance for accurate electrodiagnostic interpretation.
                </p>
            </div>

            <!-- Pattern Analysis Framework -->
            <div style="background: linear-gradient(135deg, #e0f7fa, #e8f5e8); padding: 25px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #00796b;">
                <h3 style="color: #00695c; margin-bottom: 20px; font-size: 1.4em;">📋 Systematic Pattern Analysis Framework</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h4 style="color: #00796b; margin-bottom: 15px; font-size: 1.2em;">🔍 Morphology</h4>
                        <ul style="color: #37474f; line-height: 1.6; font-size: 0.95em; margin: 0;">
                            <li><strong>Duration:</strong> Time from initial to final baseline crossing</li>
                            <li><strong>Amplitude:</strong> Peak-to-peak voltage measurement</li>
                            <li><strong>Phases:</strong> Baseline crossings + 1</li>
                            <li><strong>Initial deflection:</strong> Positive vs. negative</li>
                            <li><strong>Shape:</strong> Brief spike vs. positive wave</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h4 style="color: #00796b; margin-bottom: 15px; font-size: 1.2em;">⚖️ Stability</h4>
                        <ul style="color: #37474f; line-height: 1.6; font-size: 0.95em; margin: 0;">
                            <li><strong>Stable:</strong> Consistent morphology</li>
                            <li><strong>Waxing/Waning:</strong> Amplitude changes</li>
                            <li><strong>Decrementing:</strong> Progressive amplitude decrease</li>
                            <li><strong>Abrupt changes:</strong> Discrete morphology jumps</li>
                            <li><strong>Blocking:</strong> Intermittent firing failure</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h4 style="color: #00796b; margin-bottom: 15px; font-size: 1.2em;">🎯 Firing Characteristics</h4>
                        <ul style="color: #37474f; line-height: 1.6; font-size: 0.95em; margin: 0;">
                            <li><strong>Rate:</strong> Very slow (&lt;2Hz) to very fast (&gt;100Hz)</li>
                            <li><strong>Pattern:</strong> Regular, irregular, bursting</li>
                            <li><strong>Rhythm:</strong> Semi-rhythmic vs. perfectly regular</li>
                            <li><strong>Recruitment:</strong> Activation vs. recruitment patterns</li>
                            <li><strong>Voluntary control:</strong> &lt;4-5Hz cannot be voluntary</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Multimedia Pattern Recognition Library -->
            <div style="background: linear-gradient(135deg, #fff3e0, #fce4ec); padding: 25px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #f57c00;">
                <h3 style="color: #e65100; margin-bottom: 20px; font-size: 1.4em;">🎥 Interactive Pattern Recognition Library</h3>
                <p style="color: #bf360c; margin-bottom: 25px; font-size: 1.05em;">
                    Master EMG pattern recognition through real-time video demonstrations with expert clinical interpretation.
                </p>

                <!-- Abnormal Spontaneous Activity Videos -->
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #d84315; margin-bottom: 20px; font-size: 1.3em;">⚠️ Abnormal Spontaneous Activity</h4>

                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
                        <!-- Fibrillations and Positive Sharp Waves -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #c62828; margin-bottom: 15px; font-size: 1.1em;">🔴 Fibrillations & Positive Sharp Waves</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Spontaneous muscle fiber discharges indicating active denervation - the hallmark of nerve injury and motor neuron disease.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/jjUZMf8_B1k"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #ffebee; padding: 15px; border-radius: 8px;">
                                <p style="color: #b71c1c; font-weight: 600; margin-bottom: 8px;">Clinical Significance:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Fibrillations:</strong> Brief spike (1-5ms), regular 0.5-10Hz, "rain on tin roof" sound</li>
                                    <li><strong>PSWs:</strong> Initial positive, slow negative, "dull thud" sound</li>
                                    <li><strong>Pathology:</strong> Active denervation - radiculopathy, neuropathy, motor neuron disease</li>
                                    <li><strong>Timing:</strong> Appear 1-3 weeks post-denervation</li>
                                </ul>
                            </div>
                        </div>

                        <!-- 3+ Positive Sharp Waves -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #c62828; margin-bottom: 15px; font-size: 1.1em;">📈 Grade 3+ Positive Sharp Waves</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Severe denervation with abundant positive sharp waves filling multiple muscle areas - indicates significant nerve damage.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/fT6Lx4rnRNs"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #ffebee; padding: 15px; border-radius: 8px;">
                                <p style="color: #b71c1c; font-weight: 600; margin-bottom: 8px;">Grading Scale (0-4+):</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>0:</strong> None present</li>
                                    <li><strong>1+:</strong> Persistent single trains (2-3 areas)</li>
                                    <li><strong>2+:</strong> Moderate number (3+ areas)</li>
                                    <li><strong>3+:</strong> Many potentials in all areas</li>
                                    <li><strong>4+:</strong> Full interference pattern - severe denervation</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Complex Repetitive Discharges -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #7b1fa2; margin-bottom: 15px; font-size: 1.1em;">🔄 Complex Repetitive Discharges</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Time-linked muscle fibers creating perfectly regular "machine-like" discharges - characteristic of chronic muscle disorders.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/UE-UIRDzZ-U"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #f3e5f5; padding: 15px; border-radius: 8px;">
                                <p style="color: #4a148c; font-weight: 600; margin-bottom: 8px;">Distinctive Features:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Morphology:</strong> Time-linked individual muscle fibers</li>
                                    <li><strong>Sound:</strong> Characteristic "machine-like" pattern</li>
                                    <li><strong>Frequency:</strong> 5-100Hz, perfectly regular</li>
                                    <li><strong>Pathology:</strong> Chronic neuropathic/myopathic conditions</li>
                                    <li><strong>Mechanism:</strong> Ephaptic transmission between denervated fibers</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Myokymia -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #00796b; margin-bottom: 15px; font-size: 1.1em;">🌊 Myokymic Discharges</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Grouped bursts of the same motor unit with "marching soldiers" sound - often seen in radiation-induced nerve damage.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/ZClcikXOOaU"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #e0f2f1; padding: 15px; border-radius: 8px;">
                                <p style="color: #00695c; font-weight: 600; margin-bottom: 8px;">Clinical Patterns:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Pattern:</strong> Grouped repetitive discharges of same MUAP</li>
                                    <li><strong>Sound:</strong> "Marching soldiers"</li>
                                    <li><strong>Frequency:</strong> 1-5Hz (interburst), 5-60Hz (intraburst)</li>
                                    <li><strong>Associations:</strong> Radiation plexopathy, MS (facial), Guillain-Barré</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Motor Unit Analysis Videos -->
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #1565c0; margin-bottom: 20px; font-size: 1.3em;">⚡ Motor Unit Analysis</h4>

                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <!-- Polyphasic Potentials -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #1565c0; margin-bottom: 15px; font-size: 1.1em;">🔀 Polyphasic Potentials</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Motor units with >4 phases indicating loss of synchrony - seen in both muscle disease and nerve reinnervation.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/liNujyDKe58"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                                <p style="color: #0d47a1; font-weight: 600; margin-bottom: 8px;">Polyphasia Analysis:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Normal:</strong> 2-4 phases (≤10% polyphasic acceptable)</li>
                                    <li><strong>Abnormal:</strong> >10% polyphasic (&gt;25% in deltoid)</li>
                                    <li><strong>Sound:</strong> High-frequency "clicking"</li>
                                    <li><strong>Significance:</strong> Measure of synchrony, seen in both neuropathy and myopathy</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Motor Unit Recruitment -->
                        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <h5 style="color: #1565c0; margin-bottom: 15px; font-size: 1.1em;">📊 Motor Unit Recruitment</h5>
                            <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                                Progressive activation of motor units with increasing force - essential for distinguishing neuropathic vs. myopathic patterns.
                            </p>
                            <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                                <iframe loading="lazy" src="https://www.youtube.com/embed/kTJiD1d0NsI"
                                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                            </div>
                            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                                <p style="color: #0d47a1; font-weight: 600; margin-bottom: 8px;">Recruitment Patterns:</p>
                                <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <li><strong>Normal ratio:</strong> ~5:1 (firing rate : # of MUAPs)</li>
                                    <li><strong>Reduced recruitment:</strong> Neuropathic (axonal loss)</li>
                                    <li><strong>Early recruitment:</strong> Myopathic (fewer fibers per MU)</li>
                                    <li><strong>Poor activation:</strong> Central (upper motor neuron)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Normal Activity -->
                <div>
                    <h4 style="color: #2e7d32; margin-bottom: 20px; font-size: 1.3em;">✅ Normal Spontaneous Activity</h4>

                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px;">
                        <h5 style="color: #2e7d32; margin-bottom: 15px; font-size: 1.1em;">🎯 End Plate Spike (Normal)</h5>
                        <p style="color: #666; font-style: italic; margin-bottom: 15px; font-size: 0.95em;">
                            Normal needle-induced activity at the neuromuscular junction - important to distinguish from pathologic fibrillations.
                        </p>
                        <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin-bottom: 15px;">
                            <iframe loading="lazy" src="https://www.youtube.com/embed/2QgTg8f0pHE"
                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                        </div>
                        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                            <p style="color: #1b5e20; font-weight: 600; margin-bottom: 8px;">Normal Endplate Zone Activity:</p>
                            <ul style="color: #37474f; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                <li><strong>Endplate noise:</strong> MEPPs, monophasic negative, "seashell" sound</li>
                                <li><strong>Endplate spikes:</strong> Needle-induced, biphasic, initial negative</li>
                                <li><strong>Mechanism:</strong> Terminal nerve twig irritation → muscle fiber AP</li>
                                <li><strong>Key feature:</strong> Initial negativity (vs. fibrillations: initial positive)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comprehensive Pattern Reference Guide -->
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 30px;">
                <h3 style="color: #424242; margin-bottom: 20px; font-size: 1.4em;">📚 Comprehensive Pattern Reference Guide</h3>

                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Pattern</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Source Generator</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Sound</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Firing Rate</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Stability</th>
                                <th style="padding: 12px; text-align: left; border: 1px solid #ddd; color: #424242; font-weight: 600;">Clinical Significance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #d32f2f; font-weight: 500;">Fibrillation</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Muscle fiber</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Rain on tin roof</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">0.5-10 Hz (regular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Active denervation (neuropathy, radiculopathy, motor neuron disease)</td>
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 10px; border: 1px solid #ddd; color: #d32f2f; font-weight: 500;">Positive Sharp Wave</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Muscle fiber</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Dull pops</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">0.5-10 Hz (regular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Active denervation (same as fibrillations)</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #7b1fa2; font-weight: 500;">Complex Repetitive</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Multiple muscle fibers</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Machine-like</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">5-100 Hz (perfectly regular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Usually stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Chronic neuropathic/myopathic conditions</td>
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 10px; border: 1px solid #ddd; color: #00796b; font-weight: 500;">Myokymic</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Motor unit</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Marching soldiers</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">1-5 Hz (interburst)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Usually stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Radiation injury, MS (facial), Guillain-Barré</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #f57c00; font-weight: 500;">Myotonic</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Muscle fiber</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Revving engine</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">20-150 Hz</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Waxing/waning</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Myotonic dystrophy, myotonia congenita</td>
                            </tr>
                            <tr style="background: #fafafa;">
                                <td style="padding: 10px; border: 1px solid #ddd; color: #1976d2; font-weight: 500;">Fasciculation</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Motor unit</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Corn popping</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Low (0.1-10 Hz)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Motor neuron disease, benign fasciculations</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd; color: #388e3c; font-weight: 500;">Endplate Spike</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Terminal axon twig</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Sputtering</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">5-50 Hz (irregular)</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Stable</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Normal (needle-induced at endplate zone)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Advanced Clinical Scenarios -->
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                <h3 style="color: #6366f1; margin-bottom: 20px; font-size: 1.3em;">🎯 Advanced Pattern Recognition Scenarios</h3>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #ef4444;">
                        <h4 style="color: #dc2626; margin-bottom: 15px;">Case 1: Motor Neuron Disease</h4>
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                            <strong>Clinical:</strong> 55-year-old with progressive weakness, fasciculations<br>
                            <strong>EMG Findings:</strong> 3+ fibrillations/PSWs, large polyphasic MUAPs, reduced recruitment, fasciculations
                        </p>
                        <div style="background: #fef2f2; padding: 12px; border-radius: 8px;">
                            <strong style="color: #991b1b;">Key Features:</strong>
                            <ul style="color: #7f1d1d; margin-top: 8px; font-size: 0.9em;">
                                <li>Widespread denervation pattern</li>
                                <li>Chronic reinnervation (large MUAPs)</li>
                                <li>Active denervation (fibs/PSWs)</li>
                                <li>Fasciculations (motor neuron irritability)</li>
                            </ul>
                        </div>
                    </div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #8b5cf6;">
                        <h4 style="color: #7c3aed; margin-bottom: 15px;">Case 2: Myotonic Dystrophy</h4>
                        <p style="color: #475569; line-height: 1.6; margin-bottom: 15px;">
                            <strong>Clinical:</strong> 35-year-old with grip myotonia, distal weakness<br>
                            <strong>EMG Findings:</strong> Myotonic discharges, small polyphasic MUAPs, early recruitment
                        </p>
                        <div style="background: #f3e8ff; padding: 12px; border-radius: 8px;">
                            <strong style="color: #6b21a8;">Key Features:</strong>
                            <ul style="color: #6b21a8; margin-top: 8px; font-size: 0.9em;">
                                <li>Characteristic "dive bomber" sound</li>
                                <li>Waxing/waning amplitude and frequency</li>
                                <li>Myopathic MUAPs (small, brief, polyphasic)</li>
                                <li>Early recruitment pattern</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style="background: #eff6ff; padding: 20px; border-radius: 12px; margin-top: 20px;">
                    <h4 style="color: #1e40af; margin-bottom: 15px;">Diagnostic Approach</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div>
                            <strong style="color: #1e40af;">1. Morphology Analysis</strong>
                            <ul style="color: #374151; font-size: 0.9em; margin-top: 8px;">
                                <li>Duration (reflects fiber number)</li>
                                <li>Amplitude (proximity-dependent)</li>
                                <li>Phases (synchrony measure)</li>
                            </ul>
                        </div>
                        <div>
                            <strong style="color: #1e40af;">2. Stability Assessment</strong>
                            <ul style="color: #374151; font-size: 0.9em; margin-top: 8px;">
                                <li>Consistent morphology</li>
                                <li>Blocking patterns</li>
                                <li>Amplitude variations</li>
                            </ul>
                        </div>
                        <div>
                            <strong style="color: #1e40af;">3. Firing Pattern</strong>
                            <ul style="color: #374151; font-size: 0.9em; margin-top: 8px;">
                                <li>Rate and rhythm</li>
                                <li>Recruitment analysis</li>
                                <li>Voluntary vs. spontaneous</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Quiz Section -->
            <div class="quiz-section" style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <h3 style="color: #6366f1; margin-bottom: 20px;">🧠 Advanced Pattern Recognition Quiz</h3>

                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 2px solid rgba(99, 102, 241, 0.2); margin-bottom: 20px;">
                    <p style="font-size: 1.1em; margin-bottom: 15px; color: #1f2937;">
                        You observe a regular "machine-like" sound with perfectly repetitive, multi-serrated discharges at 50Hz.
                        Individual spikes are discernible and time-linked. This pattern most likely represents:
                    </p>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkPatternAnswer(this, true)">Complex repetitive discharges</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Myokymic discharges</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Polyphasic motor unit potentials</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Neuromyotonic discharges</button>
                    </div>
                </div>

                <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border: 2px solid rgba(59, 130, 246, 0.2);">
                    <p style="font-size: 1.1em; margin-bottom: 15px; color: #1f2937;">
                        A patient with suspected motor neuron disease shows abundant spontaneous activity.
                        Which combination of findings would be MOST supportive of this diagnosis?
                    </p>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkPatternAnswer(this, true)">Fibrillations + large polyphasic MUAPs + fasciculations + reduced recruitment</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Myotonic discharges + small MUAPs + early recruitment</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Complex repetitive discharges + normal MUAPs</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Endplate spikes + normal recruitment</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateRadiculopathyContent(module) {
    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Learning Objectives</h3>
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
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🧬 What is Radiculopathy?</h4>
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
                    <h5 style="color: #b91c1c; margin-bottom: 10px;">🔬 Key Pathophysiology</h5>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                        <div>
                            <strong style="color: #991b1b;">Location:</strong> Lesion is <em>proximal</em> to dorsal root ganglion → Sensory NCS remain normal
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
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📊 Age-Related Etiology</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #ede9fe; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #6b21a8; margin-bottom: 10px;">👶 Younger Patients (&lt;50 years)</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Disc herniation</strong> (most common)</li>
                            <li>Acute trauma</li>
                            <li>Athletic injuries</li>
                            <li>Inflammatory conditions</li>
                        </ul>
                    </div>
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #92400e; margin-bottom: 10px;">👴 Older Patients (&gt;50 years)</h5>
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
                <h3 style="color: #1e40af; margin-bottom: 15px;">⚡ Radiculopathy NCS/EMG Pattern</h3>
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
                <h3 style="color: #059669; margin-bottom: 15px;">📋 Clinical Findings by Nerve Root</h3>
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
                    <h4 style="color: #059669; margin-bottom: 15px;">📊 Common Causes</h4>
                    <ul style="color: #374151; line-height: 1.8; margin: 0;">
                        <li><strong>Herniated nucleus pulposus:</strong> Most common in adults <50 years</li>
                        <li><strong>Spinal stenosis:</strong> Most common in adults >50 years</li>
                    </ul>
                </div>

                <div style="background: white; padding: 20px; border-radius: 15px; border-left: 5px solid #dc2626;">
                    <h4 style="color: #dc2626; margin-bottom: 15px;">🎯 "HI MADAM" Mnemonic</h4>
                    <div style="font-size: 0.9em; line-height: 1.6; color: #374151;">
                        <p><strong>H</strong> - Herpes zoster</p>
                        <p><strong>I</strong> - Inflammatory (TB, Lyme, HIV, sarcoid)</p>
                        <p><strong>M</strong> - Metastasis</p>
                        <p><strong>A</strong> - Arachnoiditis</p>
                        <p><strong>D</strong> - Diabetes mellitus</p>
                        <p><strong>A</strong> - Abscess</p>
                        <p><strong>M</strong> - Mass (neurofibroma, meningioma, etc.)</p>
                    </div>
                </div>
            </div>

            <!-- Electrodiagnostic Timeline -->
            <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #7c3aed; margin-bottom: 15px;">⏰ Electrodiagnostic Timeline</h3>
                <div style="position: relative; padding: 20px 0;">
                    <div style="position: absolute; left: 50px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #7c3aed, #a855f7);"></div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #7c3aed; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center;">Day 0</div>
                        <div style="background: #f3f4f6; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Immediate findings:</strong> Decreased recruitment, prolonged F-waves, abnormal H-reflex (S1)
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #a855f7; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center;">1 Week</div>
                        <div style="background: #fef3c7; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Paraspinal abnormalities:</strong> First spontaneous activity appears in paraspinal muscles
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #c084fc; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center;">2 Weeks</div>
                        <div style="background: #fecaca; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Limb involvement:</strong> Abnormal spontaneous activity begins in limb muscles
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #d8b4fe; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center;">3 Weeks</div>
                        <div style="background: #fed7d7; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Full pattern:</strong> Abnormal activity in both paraspinals and limbs
                        </div>
                    </div>

                    <div style="display: flex; align-items: center;">
                        <div style="background: #059669; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; margin-right: 20px; min-width: 80px; text-align: center;">5-6 Weeks</div>
                        <div style="background: #dcfce7; padding: 12px 15px; border-radius: 8px; flex-grow: 1;">
                            <strong>Recovery begins:</strong> Reinnervation patterns start to appear
                        </div>
                    </div>
                </div>
            </div>

            <!-- Key Clinical Points -->
            <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #f59e0b;">
                <h3 style="color: #d97706; margin-bottom: 15px;">🔍 Diagnostic Pearls</h3>
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

            <div class="quiz-section">
                <h4>🧠 Knowledge Check</h4>
                <p><strong>A patient has neuropathic changes in triceps, flexor carpi radialis, and C7 paraspinal muscles. The sensory NCS are normal. What is the most likely diagnosis?</strong></p>
                <div class="quiz-options">
                    <button class="quiz-option" onclick="checkRadiculopathyAnswer(this, true)">C7 radiculopathy</button>
                    <button class="quiz-option" onclick="checkRadiculopathyAnswer(this, false)">Radial neuropathy</button>
                    <button class="quiz-option" onclick="checkRadiculopathyAnswer(this, false)">Median neuropathy</button>
                    <button class="quiz-option" onclick="checkRadiculopathyAnswer(this, false)">Brachial plexopathy</button>
                </div>
            </div>
        </div>
    `;
}

function generateNeuropathyContent(module) {
    console.log('🧠 DEBUG: generateNeuropathyContent function called with module:', module);
    return `
        <div class="interactive-content">
            <!-- Learning Objectives -->
            <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #9a3412; font-weight: 500;">• Master median and ulnar nerve anatomy and compression points</p>
                        <p style="color: #9a3412; font-weight: 500;">• Differentiate UNE vs UNW and CTS vs proximal median lesions</p>
                    </div>
                    <div>
                        <p style="color: #9a3412; font-weight: 500;">• Understand electrodiagnostic patterns for each lesion</p>
                        <p style="color: #9a3412; font-weight: 500;">• Apply clinical localization and differential diagnosis principles</p>
                    </div>
                </div>
            </div>

            <!-- Neuropathy Pathophysiology Mechanisms Section -->
            <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #8b5cf6;">
                <h4 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.4em;">🧠 Neuropathy Pathophysiology Mechanisms</h4>
                <p style="color: #7c3aed; margin-bottom: 25px; font-style: italic;">Understanding the fundamental mechanisms behind nerve injury and dysfunction</p>

                <!-- Pathophysiology Tab Navigation -->
                <div style="display: flex; background: #faf5ff; padding: 5px; border-radius: 12px; margin-bottom: 25px; gap: 3px; flex-wrap: wrap;">
                    <button onclick="showPathophysSection('anatomy')" id="patho-anatomy-tab" class="patho-tab active-patho-tab" style="
                        background: #8b5cf6; color: white; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        🔬 Anatomy & Function
                    </button>
                    <button onclick="showPathophysSection('mechanisms')" id="patho-mechanisms-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        ⚡ Injury Mechanisms
                    </button>
                    <button onclick="showPathophysSection('correlations')" id="patho-correlations-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        📊 EDX Correlations
                    </button>
                    <button onclick="showPathophysSection('classification')" id="patho-classification-tab" class="patho-tab" style="
                        background: transparent; color: #8b5cf6; border: none; border-radius: 8px; padding: 12px 16px; cursor: pointer;
                        transition: all 0.3s; font-weight: 600; font-size: 0.9em; flex: 1; min-width: 120px;
                    ">
                        🧪 Fiber Classification
                    </button>
                </div>

                <!-- Anatomy & Function Section -->
                <div id="patho-anatomy-content" class="patho-content" style="display: block;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">🔬 Fundamental Nerve Anatomy & Function</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1em;">📍 Peripheral Nervous System Components</h6>
                                <ul style="color: #475569; line-height: 1.6;">
                                    <li><strong>Nerve Roots:</strong> Motor (anterior) and sensory (dorsal) origins</li>
                                    <li><strong>Plexuses:</strong> Brachial (C5-T1) and lumbosacral (L1-S4) intermixing</li>
                                    <li><strong>Peripheral Nerves:</strong> Mixed motor/sensory/autonomic fibers</li>
                                    <li><strong>Neuromuscular Junction:</strong> Chemical transmission site</li>
                                    <li><strong>Muscle Fibers:</strong> Final effector organs</li>
                                </ul>
                            </div>

                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #22c55e;">
                                <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🧬 Schwann Cells & Myelin</h6>
                                <ul style="color: #475569; line-height: 1.6;">
                                    <li><strong>Myelin Formation:</strong> Concentric spirals of Schwann cell membrane</li>
                                    <li><strong>Internodes:</strong> Myelinated segments (~1mm length)</li>
                                    <li><strong>Nodes of Ranvier:</strong> Unmyelinated gaps (1-2μm)</li>
                                    <li><strong>Insulation Function:</strong> Reduces capacitance, enables saltatory conduction</li>
                                    <li><strong>Support Role:</strong> Metabolic support and nerve regeneration</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
                            <h6 style="color: #d97706; margin-bottom: 15px; font-size: 1.1em;">⚡ Action Potential Propagation</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #92400e; margin-bottom: 10px;"><strong>Saltatory Conduction (Myelinated):</strong></p>
                                    <ul style="color: #78350f; line-height: 1.6; font-size: 0.9em;">
                                        <li>Depolarization only at nodes</li>
                                        <li>Action potential "jumps" between nodes</li>
                                        <li>Conduction velocity: 35-75 m/s</li>
                                        <li>Energy efficient transmission</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #92400e; margin-bottom: 10px;"><strong>Continuous Conduction (Unmyelinated):</strong></p>
                                    <ul style="color: #78350f; line-height: 1.6; font-size: 0.9em;">
                                        <li>Depolarization along entire membrane</li>
                                        <li>Slow, progressive transmission</li>
                                        <li>Conduction velocity: 0.2-1.5 m/s</li>
                                        <li>Used for pain, temperature, autonomics</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; border: 2px solid #22c55e;">
                            <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🔑 Key Physiological Principles</h6>
                            <div style="color: #166534; line-height: 1.6;">
                                <p><strong>Resting Membrane Potential:</strong> -70 to -90mV maintained by Na+/K+ pump</p>
                                <p><strong>Threshold Activation:</strong> 10-30mV depolarization triggers all-or-none response</p>
                                <p><strong>Refractory Period:</strong> 1-2ms inactivation prevents backward propagation</p>
                                <p><strong>Conduction Velocity Formula:</strong> CV ∝ axon diameter × myelination thickness</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Injury Mechanisms Section -->
                <div id="patho-mechanisms-content" class="patho-content" style="display: none;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">⚡ Nerve Injury Mechanisms</h5>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #ef4444;">
                                <h6 style="color: #dc2626; margin-bottom: 15px; font-size: 1.1em;">🛡️ Demyelinating Neuropathies</h6>
                                <div style="color: #7f1d1d; line-height: 1.6;">
                                    <p><strong>Primary Pathology:</strong> Myelin sheath damage/loss</p>
                                    <p><strong>Mechanisms:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Immune-mediated destruction</li>
                                        <li>Metabolic disruption</li>
                                        <li>Compression-induced ischemia</li>
                                        <li>Toxic demyelination</li>
                                    </ul>
                                    <p><strong>Functional Effects:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Slowed conduction velocity</li>
                                        <li>Conduction blocks</li>
                                        <li>Temporal dispersion</li>
                                        <li>Prolonged distal latencies</li>
                                    </ul>
                                </div>
                            </div>

                            <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1d4ed8; margin-bottom: 15px; font-size: 1.1em;">🔗 Axonal Neuropathies</h6>
                                <div style="color: #1e3a8a; line-height: 1.6;">
                                    <p><strong>Primary Pathology:</strong> Axon degeneration</p>
                                    <p><strong>Mechanisms:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Wallerian degeneration</li>
                                        <li>Metabolic dysfunction</li>
                                        <li>Toxic axonopathy</li>
                                        <li>Ischemic damage</li>
                                    </ul>
                                    <p><strong>Functional Effects:</strong></p>
                                    <ul style="margin-left: 15px; font-size: 0.9em;">
                                        <li>Reduced amplitude (axon loss)</li>
                                        <li>Denervation (fibrillations)</li>
                                        <li>Motor unit dropout</li>
                                        <li>Preserved conduction velocity</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #fefce8; padding: 20px; border-radius: 10px; border-left: 4px solid #eab308; margin-bottom: 20px;">
                            <h6 style="color: #a16207; margin-bottom: 15px; font-size: 1.1em;">🔄 Mixed Neuropathies</h6>
                            <div style="color: #854d0e; line-height: 1.6;">
                                <p><strong>Combined Pathology:</strong> Both axonal and demyelinating features</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                                    <div>
                                        <p style="font-weight: 600;">Common Causes:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Diabetic neuropathy</li>
                                            <li>Uremic neuropathy</li>
                                            <li>Chronic inflammatory conditions</li>
                                            <li>Severe compression neuropathies</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p style="font-weight: 600;">EDX Features:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Reduced amplitudes</li>
                                            <li>Slowed conduction</li>
                                            <li>Prolonged latencies</li>
                                            <li>Denervation changes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f3e8ff; padding: 20px; border-radius: 10px; border: 2px solid #8b5cf6;">
                            <h6 style="color: #6b21a8; margin-bottom: 15px; font-size: 1.1em;">🗜️ Compression Neuropathies</h6>
                            <div style="color: #581c87; line-height: 1.6;">
                                <p><strong>Pathophysiology Stages:</strong></p>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px;">
                                    <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                        <p style="font-weight: 600; color: #7c3aed;">Stage 1: Ischemia</p>
                                        <ul style="font-size: 0.85em; margin-left: 15px;">
                                            <li>Reduced blood flow</li>
                                            <li>Reversible dysfunction</li>
                                            <li>Conduction slowing</li>
                                        </ul>
                                    </div>
                                    <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                        <p style="font-weight: 600; color: #7c3aed;">Stage 2: Demyelination</p>
                                        <ul style="font-size: 0.85em; margin-left: 15px;">
                                            <li>Myelin breakdown</li>
                                            <li>Conduction blocks</li>
                                            <li>Temporal dispersion</li>
                                        </ul>
                                    </div>
                                    <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                        <p style="font-weight: 600; color: #7c3aed;">Stage 3: Axonal Loss</p>
                                        <ul style="font-size: 0.85em; margin-left: 15px;">
                                            <li>Wallerian degeneration</li>
                                            <li>Amplitude reduction</li>
                                            <li>Denervation changes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- EDX Correlations Section -->
                <div id="patho-correlations-content" class="patho-content" style="display: none;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">📊 Electrodiagnostic Correlations</h5>

                        <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #475569; margin-bottom: 25px;">
                            <h6 style="color: #334155; margin-bottom: 15px; font-size: 1.1em;">🔬 Volume Conduction Principles</h6>
                            <div style="color: #475569; line-height: 1.6;">
                                <p><strong>Near-field Potentials:</strong> Recorded close to source (NCS, EMG), amplitude depends on distance</p>
                                <p><strong>Triphasic Waveforms:</strong> Positive → Negative → Positive as action potential passes electrode</p>
                                <p><strong>Biphasic Waveforms:</strong> Initial negative deflection when depolarization starts under electrode</p>
                                <p><strong>Recording Principle:</strong> Intracellular events transmitted through tissue to surface electrodes</p>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #ef4444;">
                                <h6 style="color: #dc2626; margin-bottom: 15px; font-size: 1.1em;">🐌 Demyelinating Patterns</h6>
                                <div style="color: #7f1d1d; line-height: 1.5;">
                                    <p><strong>NCS Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Prolonged distal latencies (>125% normal)</li>
                                        <li>Slowed conduction velocities (<75% normal)</li>
                                        <li>Conduction blocks (>50% amplitude drop)</li>
                                        <li>Temporal dispersion (duration >130%)</li>
                                        <li>Prolonged F-waves and H-reflexes</li>
                                    </ul>
                                    <p><strong>EMG Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Normal or minimal denervation</li>
                                        <li>Large, polyphasic MUAPs</li>
                                        <li>Reduced recruitment</li>
                                    </ul>
                                </div>
                            </div>

                            <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                                <h6 style="color: #1d4ed8; margin-bottom: 15px; font-size: 1.1em;">📉 Axonal Patterns</h6>
                                <div style="color: #1e3a8a; line-height: 1.5;">
                                    <p><strong>NCS Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Reduced CMAP/SNAP amplitudes</li>
                                        <li>Normal or mildly slow conduction velocities</li>
                                        <li>Normal distal latencies (if axons intact)</li>
                                        <li>Absent responses in severe cases</li>
                                        <li>Normal F-wave latencies</li>
                                    </ul>
                                    <p><strong>EMG Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Fibrillation potentials</li>
                                        <li>Positive sharp waves</li>
                                        <li>Reduced recruitment</li>
                                        <li>Large, long-duration MUAPs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; border: 2px solid #22c55e;">
                            <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🎯 Clinical Correlation Guidelines</h6>
                            <div style="color: #166534; line-height: 1.6;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div>
                                        <p style="font-weight: 600;">Severity Assessment:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li><strong>Mild:</strong> Prolonged latencies only</li>
                                            <li><strong>Moderate:</strong> Slowed CV + reduced amplitude</li>
                                            <li><strong>Severe:</strong> Absent responses + denervation</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p style="font-weight: 600;">Localization Principles:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li><strong>Focal:</strong> Localized slowing/block</li>
                                            <li><strong>Generalized:</strong> Diffuse abnormalities</li>
                                            <li><strong>Proximal:</strong> F-wave/H-reflex changes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fiber Classification Section -->
                <div id="patho-classification-content" class="patho-content" style="display: none;">
                    <div style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #e5e7eb;">
                        <h5 style="color: #6b21a8; margin-bottom: 20px; font-size: 1.3em;">🧪 Nerve Fiber Classification & Clinical Relevance</h5>

                        <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; border-left: 4px solid #334155; margin-bottom: 25px;">
                            <h6 style="color: #1e293b; margin-bottom: 15px; font-size: 1.1em;">📊 Fiber Type Classification Table</h6>
                            <div style="overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
                                    <thead>
                                        <tr style="background: #334155; color: white;">
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Fiber Type</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Diameter (μm)</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">CV (m/s)</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Function</th>
                                            <th style="padding: 12px; text-align: left; font-size: 0.9em;">Clinical Relevance</th>
                                        </tr>
                                    </thead>
                                    <tbody style="color: #374151; font-size: 0.85em;">
                                        <tr style="border-bottom: 1px solid #e5e7eb;">
                                            <td style="padding: 10px; font-weight: 600;">Aα (Ia)</td>
                                            <td style="padding: 10px;">12-21</td>
                                            <td style="padding: 10px;">80-120</td>
                                            <td style="padding: 10px;">Muscle spindle afferents</td>
                                            <td style="padding: 10px;">Mixed nerve studies, early compression</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
                                            <td style="padding: 10px; font-weight: 600;">Aβ</td>
                                            <td style="padding: 10px;">6-12</td>
                                            <td style="padding: 10px;">35-75</td>
                                            <td style="padding: 10px;">Motor efferents, touch, vibration</td>
                                            <td style="padding: 10px;">Standard NCS, most neuropathies</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb;">
                                            <td style="padding: 10px; font-weight: 600;">Aδ</td>
                                            <td style="padding: 10px;">1-5</td>
                                            <td style="padding: 10px;">5-30</td>
                                            <td style="padding: 10px;">Fast pain, temperature</td>
                                            <td style="padding: 10px;">Not recorded in routine NCS</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb; background: #f9fafb;">
                                            <td style="padding: 10px; font-weight: 600;">B</td>
                                            <td style="padding: 10px;">3</td>
                                            <td style="padding: 10px;">3-15</td>
                                            <td style="padding: 10px;">Preganglionic autonomic</td>
                                            <td style="padding: 10px;">Autonomic testing only</td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #e5e7eb;">
                                            <td style="padding: 10px; font-weight: 600;">C</td>
                                            <td style="padding: 10px;">0.2-1.5</td>
                                            <td style="padding: 10px;">1-2</td>
                                            <td style="padding: 10px;">Slow pain, autonomics</td>
                                            <td style="padding: 10px;">Small fiber neuropathy</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                                <h6 style="color: #d97706; margin-bottom: 15px; font-size: 1.1em;">🎯 Large Fiber Neuropathies</h6>
                                <div style="color: #92400e; line-height: 1.5;">
                                    <p><strong>Fibers Affected:</strong> Aα, Aβ (large myelinated)</p>
                                    <p><strong>Clinical Features:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Weakness and muscle atrophy</li>
                                        <li>Loss of vibration and position sense</li>
                                        <li>Areflexia (lost tendon reflexes)</li>
                                        <li>Sensory ataxia</li>
                                    </ul>
                                    <p><strong>EDX Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Abnormal NCS parameters</li>
                                        <li>Denervation on EMG</li>
                                        <li>Absent/prolonged F-waves</li>
                                    </ul>
                                </div>
                            </div>

                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #ef4444;">
                                <h6 style="color: #dc2626; margin-bottom: 15px; font-size: 1.1em;">🔥 Small Fiber Neuropathies</h6>
                                <div style="color: #7f1d1d; line-height: 1.5;">
                                    <p><strong>Fibers Affected:</strong> Aδ, C (small unmyelinated)</p>
                                    <p><strong>Clinical Features:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Burning, shooting pain</li>
                                        <li>Loss of pain and temperature</li>
                                        <li>Autonomic dysfunction</li>
                                        <li>Preserved strength and reflexes</li>
                                    </ul>
                                    <p><strong>EDX Findings:</strong></p>
                                    <ul style="font-size: 0.9em; margin-left: 15px;">
                                        <li>Normal routine NCS</li>
                                        <li>Normal needle EMG</li>
                                        <li>Requires specialized testing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border: 2px solid #22c55e;">
                            <h6 style="color: #15803d; margin-bottom: 15px; font-size: 1.1em;">🔑 Key Clinical Correlations</h6>
                            <div style="color: #166534; line-height: 1.6;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div>
                                        <p style="font-weight: 600;">Why Large Fibers Are Affected First:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Higher metabolic demands</li>
                                            <li>Longer axonal transport distances</li>
                                            <li>More susceptible to compression</li>
                                            <li>Greater myelin content</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p style="font-weight: 600;">Clinical Testing Implications:</p>
                                        <ul style="font-size: 0.9em; margin-left: 15px;">
                                            <li>Standard NCS tests large fibers only</li>
                                            <li>Normal NCS doesn't exclude neuropathy</li>
                                            <li>Small fiber testing requires special methods</li>
                                            <li>Symptom-EDX correlation essential</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Common Peripheral Neuropathies Atlas -->
            <div style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #0ea5e9;">
                <h4 style="color: #0c4a6e; margin-bottom: 10px; font-size: 1.4em;">🗺️ Common Peripheral Neuropathies Atlas</h4>
                <p style="color: #0369a1; margin-bottom: 20px; font-style: italic;">Interactive guide to specific nerve entrapments and compression neuropathies</p>

                <!-- Nerve Type Selector -->
                <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 25px; justify-content: center;">
                    <button class="nerve-type-btn active" onclick="showNerveType('median')" data-nerve="median" style="
                        background: white;
                        border: 3px solid #3b82f6;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #1e40af;
                        font-size: 0.95em;
                    ">
                        🖐️ Median
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('ulnar')" data-nerve="ulnar" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        🤏 Ulnar
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('radial')" data-nerve="radial" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        👍 Radial
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('peroneal')" data-nerve="peroneal" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        🦶 Peroneal
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('tibial')" data-nerve="tibial" style="
                        background: #f8fafc;
                        border: 2px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #64748b;
                        font-size: 0.95em;
                    ">
                        🦵 Tibial
                    </button>
                    <button class="nerve-type-btn" onclick="showNerveType('overview')" data-nerve="overview" style="
                        background: #fef3c7;
                        border: 2px solid #f59e0b;
                        border-radius: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-weight: 600;
                        color: #d97706;
                        font-size: 0.95em;
                    ">
                        📊 Master Chart
                    </button>
                </div>

                <!-- Median Nerve Content -->
                <div id="median-content" class="nerve-content" style="display: block;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🖐️</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Median Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">C6-T1 • Lateral & Medial Cords • Precision Grip Master</p>
                    </div>

                    <!-- Nerve Selection -->
                    <div class="nerve-selector" style="margin-bottom: 25px;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                            <button class="nerve-nav-btn active" onclick="showMedianSection('carpal-tunnel')" data-section="carpal-tunnel" style="
                                background: white;
                                border: 3px solid #3b82f6;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">🖐️</span>
                                    <h5 style="color: #1e40af; margin: 0; font-size: 1.1em;">Carpal Tunnel Syndrome</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Most common entrapment - median nerve at wrist</p>
                            </button>

                            <button class="nerve-nav-btn" onclick="showMedianSection('proximal-median')" data-section="proximal-median" style="
                                background: #f8fafc;
                                border: 2px solid #e2e8f0;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">💪</span>
                                    <h5 style="color: #64748b; margin: 0; font-size: 1.1em;">Proximal Median Neuropathies</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Pronator syndrome, anterior interosseous syndrome</p>
                            </button>
                        </div>
                    </div>

                    <!-- Content Sections -->
                    <div id="carpal-tunnel" class="median-section" style="display: block;">
                        ${generateCarpalTunnelContent()}
                    </div>

                    <div id="proximal-median" class="median-section" style="display: none;">
                        ${generateProximalMedianContent()}
                    </div>
                </div>

                <!-- Ulnar Nerve Content -->
                <div id="ulnar-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🤏</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Ulnar Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">C8-T1 • Medial Cord • Grip Strength & Fine Motor Control</p>
                    </div>

                    <!-- Ulnar Nerve Selection -->
                    <div class="nerve-selector" style="margin-bottom: 25px;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                            <button class="nerve-nav-btn active" onclick="showUlnarSection('ulnar-elbow')" data-section="ulnar-elbow" style="
                                background: white;
                                border: 3px solid #3b82f6;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">🤏</span>
                                    <h5 style="color: #1e40af; margin: 0; font-size: 1.1em;">Ulnar Neuropathy at Elbow (UNE)</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Most common ulnar entrapment - cubital tunnel syndrome</p>
                            </button>

                            <button class="nerve-nav-btn" onclick="showUlnarSection('ulnar-wrist')" data-section="ulnar-wrist" style="
                                background: #f8fafc;
                                border: 2px solid #e2e8f0;
                                border-radius: 12px;
                                padding: 20px;
                                cursor: pointer;
                                transition: all 0.3s;
                                text-align: left;
                            ">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="font-size: 24px; margin-right: 10px;">✋</span>
                                    <h5 style="color: #64748b; margin: 0; font-size: 1.1em;">Ulnar Neuropathy at Wrist (UNW)</h5>
                                </div>
                                <p style="color: #64748b; margin: 0; font-size: 0.9em;">Guyon's canal syndrome and ulnar tunnel syndrome</p>
                            </button>
                        </div>
                    </div>

                    <!-- Ulnar Content Sections -->
                    <div id="ulnar-elbow" class="ulnar-section" style="display: block;">
                        ${generateUlnarElbowContent()}
                    </div>

                    <div id="ulnar-wrist" class="ulnar-section" style="display: none;">
                        ${generateUlnarWristContent()}
                    </div>
                </div>

                <!-- Radial Nerve Content -->
                <div id="radial-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">👍</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Radial Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">C5-T1 • Posterior Cord • Extension Powerhouse</p>
                    </div>

                    <!-- Spiral Groove Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fee2e2; padding: 8px; border-radius: 50%; margin-right: 12px;">💥</span>
                            Spiral Groove Syndrome ("Saturday Night Palsy")
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">🎯 Anatomy & Vulnerability</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Radial nerve travels in <strong>spiral groove</strong> of mid-humerus</li>
                                    <li>Nerve lies directly against bone with minimal protection</li>
                                    <li>Most common site of radial nerve injury</li>
                                    <li>Vulnerable to compression, trauma, and fractures</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">⚡ Common Causes</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Humeral fractures</strong> (most serious)</li>
                                    <li><strong>Prolonged compression</strong> (arm over chair)</li>
                                    <li><strong>Crutch palsy</strong> (improper use)</li>
                                    <li><strong>Surgical positioning</strong> injury</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 1em;">🔍 Classic Clinical Presentation</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #7f1d1d; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Motor Signs:</p>
                                    <ul style="color: #7f1d1d; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Wrist drop</strong> (cannot extend wrist)</li>
                                        <li>Weak finger extension at MCPs</li>
                                        <li>Weak thumb extension/abduction</li>
                                        <li>Triceps usually SPARED (branches proximal)</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #7f1d1d; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Sensory Loss:</p>
                                    <ul style="color: #7f1d1d; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>First web space</strong> (dorsal)</li>
                                        <li>Dorsal hand between thumb/index</li>
                                        <li>Variable extent (often minimal)</li>
                                        <li>Preserved palmar sensation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">📊 Electrodiagnostic Findings</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">NCS Findings:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Low/absent radial CMAP (spiral groove stimulation)</li>
                                        <li>Normal radial SNAP (lesion proximal to DRG)</li>
                                        <li>Normal median/ulnar studies</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">EMG Pattern:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Denervation in extensor muscles</li>
                                        <li>Triceps typically normal</li>
                                        <li>Brachioradialis affected</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Posterior Interosseous Nerve (PIN) Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #059669; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #d1fae5; padding: 8px; border-radius: 50%; margin-right: 12px;">🎯</span>
                            Posterior Interosseous Nerve (PIN) Syndrome
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #065f46; margin-bottom: 12px; font-size: 1.1em;">📍 Anatomy & Location</h5>
                                <ul style="color: #064e3b; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>PIN = deep motor branch of radial nerve</li>
                                    <li>Passes through <strong>supinator muscle</strong></li>
                                    <li>Compression at <strong>arcade of Frohse</strong></li>
                                    <li>Purely motor - no sensory involvement</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #065f46; margin-bottom: 12px; font-size: 1.1em;">⚡ Causes</h5>
                                <ul style="color: #064e3b; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Repetitive supination</strong></li>
                                    <li>Rheumatoid synovitis</li>
                                    <li>Space-occupying lesions</li>
                                    <li>Trauma/fractures</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #059669; margin-bottom: 10px; font-size: 1em;">🔍 Clinical Features</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Key Motor Signs:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Finger drop</strong> (weak MCP extension)</li>
                                        <li>Weak thumb extension/abduction</li>
                                        <li><strong>Wrist extension PRESERVED</strong></li>
                                        <li>ECRL/ECRB normal (branch proximal)</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Distinguishing Features:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>NO sensory loss</strong></li>
                                        <li>NO wrist drop</li>
                                        <li>Normal brachioradialis</li>
                                        <li>May have forearm pain</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">📊 Electrodiagnostic Pattern</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">NCS:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>All sensory studies normal</li>
                                        <li>Radial motor to ECRB normal</li>
                                        <li>PIN motor responses reduced</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">EMG:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Denervation in PIN-innervated muscles</li>
                                        <li>ECRB/ECRL spared</li>
                                        <li>Brachioradialis normal</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Differential Diagnosis -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">🤔</span>
                            Differential Diagnosis
                        </h4>

                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                <thead>
                                    <tr style="background: #f3f4f6;">
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Condition</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Wrist Extension</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Finger Extension</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sensory Loss</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Triceps</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #dc2626;">Spiral Groove</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak (wrist drop)</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">First web space</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Normal</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">PIN Syndrome</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>None</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #7c2d12;">C7 Radiculopathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">C7 dermatome</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;"><strong>Weak</strong></td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #1d4ed8;">Axillary Level</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">First web + forearm</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;"><strong>Weak</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Clinical Pearls -->
                    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #78350f; padding: 20px; border-radius: 15px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; color: #78350f; font-size: 1.3em;">
                            <span style="margin-right: 10px;">💎</span>
                            Clinical Pearls
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Saturday night palsy:</strong> Classic spiral groove injury from prolonged arm compression</li>
                                    <li><strong>Wrist drop</strong> = spiral groove lesion until proven otherwise</li>
                                    <li><strong>PIN syndrome:</strong> Finger drop WITHOUT wrist drop</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Humeral fractures:</strong> Always consider radial nerve injury</li>
                                    <li><strong>Normal radial SNAP</strong> in spiral groove lesions (proximal to DRG)</li>
                                    <li><strong>Triceps involvement</strong> suggests axillary or very proximal lesion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Peroneal Nerve Content -->
                <div id="peroneal-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🦶</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Peroneal/Fibular Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">L4-S1 • Sciatic Division • Foot Drop Expert</p>
                    </div>

                    <!-- Common Peroneal Neuropathy at Fibular Neck -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fee2e2; padding: 8px; border-radius: 50%; margin-right: 12px;">⚡</span>
                            Common Peroneal Neuropathy at Fibular Neck
                        </h4>

                        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 1em;">📍 Most Common Lower Extremity Mononeuropathy</h6>
                            <p style="color: #7f1d1d; margin: 0; font-size: 0.9em; line-height: 1.5;">
                                <strong>Both names are commonly used:</strong> "Peroneal" (traditional) and "Fibular" (modern anatomical terminology).
                                The nerve is most vulnerable at the fibular neck where it's superficial and lies directly against bone.
                            </p>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">🎯 Anatomy & Vulnerability</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Nerve winds around <strong>fibular neck</strong></li>
                                    <li>Passes through <strong>fibular tunnel</strong> (peroneus longus)</li>
                                    <li>Most superficial and vulnerable location</li>
                                    <li>Deep branch fibers lie closest to fibula</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">⚡ Common Causes</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Prolonged positioning</strong> (anesthesia)</li>
                                    <li><strong>Habitual leg crossing</strong></li>
                                    <li><strong>Trauma & fractures</strong></li>
                                    <li><strong>Weight loss</strong> (loss of protective fat)</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; border-left: 4px solid #1e40af; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">🔍 Classic Clinical Presentation: "Foot Drop"</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Motor Signs:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Foot drop</strong> (weak dorsiflexion)</li>
                                        <li>Weak toe extension</li>
                                        <li>Weak foot eversion</li>
                                        <li><strong>Steppage gait</strong> pattern</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Sensory Loss:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Dorsum of foot</strong></li>
                                        <li>Lateral calf (mid to lower)</li>
                                        <li>First web space</li>
                                        <li>Preserved lateral foot (sural)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #059669; margin-bottom: 10px; font-size: 1em;">📊 Key Diagnostic Features</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Preserved Functions:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Ankle inversion</strong> (tibialis posterior)</li>
                                        <li>Normal ankle reflex</li>
                                        <li>Plantar flexion intact</li>
                                        <li>Knee flexion normal</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Clinical Signs:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Tinel's sign at fibular neck</li>
                                        <li>Increased ankle sprains</li>
                                        <li>Tripping on uneven surfaces</li>
                                        <li>Foot slapping when walking</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Anterior Tarsal Tunnel Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">🦶</span>
                            Anterior Tarsal Tunnel Syndrome (ATTS)
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">📍 Deep Peroneal at Ankle</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Compression under <strong>inferior extensor retinaculum</strong></li>
                                    <li>Rare entrapment neuropathy</li>
                                    <li>Affects extensor digitorum brevis</li>
                                    <li>Pure motor involvement</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">⚡ Causes</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Tight shoes</strong> (especially dancers)</li>
                                    <li>Trauma to anterior ankle</li>
                                    <li>Ganglion cysts</li>
                                    <li>Pes cavus deformity</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #92400e; margin-bottom: 10px; font-size: 1em;">🔍 Clinical Features</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #78350f; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Symptoms:</p>
                                    <ul style="color: #78350f; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Foot pain and paresthesias</li>
                                        <li>Dorsal foot discomfort</li>
                                        <li>Pain worse with plantar flexion</li>
                                        <li>Relief with dorsiflexion</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #78350f; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Signs:</p>
                                    <ul style="color: #78350f; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>EDB weakness/atrophy</li>
                                        <li>Sensory loss: first web space</li>
                                        <li>Tinel's sign at anterior ankle</li>
                                        <li>Normal foot dorsiflexion</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Differential Diagnosis -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #1d4ed8; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #dbeafe; padding: 8px; border-radius: 50%; margin-right: 12px;">🤔</span>
                            Differential Diagnosis of Foot Drop
                        </h4>

                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                <thead>
                                    <tr style="background: #f3f4f6;">
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Condition</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Dorsiflexion</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Eversion</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Inversion</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Ankle Reflex</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sensory Pattern</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #dc2626;">Common Peroneal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Dorsal foot, lateral calf</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #7c2d12;">Deep Peroneal Only</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">First web space only</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">Sciatic Nerve</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Weak</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Absent</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Dorsal + plantar foot</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #1d4ed8;">L5 Radiculopathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Weak</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;"><strong>Weak</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Normal*</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">L5 dermatome</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px; margin-bottom: 0;">
                                *May be reduced if S1 also involved
                            </p>
                        </div>
                    </div>

                    <!-- Electrodiagnostic Patterns -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">📊</span>
                            Electrodiagnostic Patterns
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">🔬 Nerve Conduction Studies</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Peroneal motor:</strong> Record EDB & TA</li>
                                    <li><strong>Conduction block</strong> across fibular neck</li>
                                    <li><strong>Superficial peroneal sensory</strong> abnormal</li>
                                    <li>Normal tibial motor and sural sensory</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">⚡ EMG Findings</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Denervation:</strong> TA, EHL, peroneus longus</li>
                                    <li><strong>Normal:</strong> Tibialis posterior</li>
                                    <li><strong>Normal:</strong> Short head biceps femoris</li>
                                    <li>Normal paraspinal muscles</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Clinical Pearls -->
                    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #78350f; padding: 20px; border-radius: 15px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; color: #78350f; font-size: 1.3em;">
                            <span style="margin-right: 10px;">💎</span>
                            Clinical Pearls
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Both names valid:</strong> Peroneal (traditional) = Fibular (modern)</li>
                                    <li><strong>Most common</strong> lower extremity mononeuropathy</li>
                                    <li><strong>Fibular neck:</strong> Most vulnerable location</li>
                                    <li><strong>Preserved inversion</strong> = key differentiating feature</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Recording TA</strong> more sensitive than EDB</li>
                                    <li><strong>Weight loss patients</strong> at higher risk</li>
                                    <li><strong>Normal radial SNAP</strong> in fibular neck lesions</li>
                                    <li><strong>EDB reinnervation</strong> common in normals</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tibial Nerve Content -->
                <div id="tibial-content" class="nerve-content" style="display: none;">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #7c2d12 0%, #dc2626 100%); color: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px;">🦵</div>
                        <h3 style="margin: 0 0 10px 0; font-size: 1.8em; font-weight: 700;">Tibial Nerve Pathophysiology</h3>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.9;">L4-S3 • Sciatic Division • Plantar Flexion Master</p>
                    </div>

                    <!-- Tarsal Tunnel Syndrome -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fee2e2; padding: 8px; border-radius: 50%; margin-right: 12px;">🔒</span>
                            Tarsal Tunnel Syndrome (TTS)
                        </h4>

                        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 1em;">⚠️ Important Clinical Reality</h6>
                            <p style="color: #7f1d1d; margin: 0; font-size: 0.9em; line-height: 1.5;">
                                <strong>Unlike carpal tunnel syndrome, TTS is exceptionally rare.</strong> Most patients referred for "TTS" have either
                                normal studies (orthopedic problems) or mild distal polyneuropathy. True TTS requires careful electrodiagnostic confirmation.
                            </p>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">📍 Anatomy & Location</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li>Tibial nerve passes under <strong>flexor retinaculum</strong></li>
                                    <li>Travels through <strong>tarsal tunnel</strong> at medial ankle</li>
                                    <li>Divides into medial/lateral plantar nerves</li>
                                    <li>Also gives off calcaneal sensory branches</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #7c2d12; margin-bottom: 12px; font-size: 1.1em;">⚡ Causes</h5>
                                <ul style="color: #451a03; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Trauma</strong> (sprains, fractures)</li>
                                    <li><strong>Mass lesions</strong> (ganglions, lipomas)</li>
                                    <li>Degenerative bone/tissue disorders</li>
                                    <li>Varicosities (rare)</li>
                                </ul>
                            </div>
                        </div>

                        <div style="background: #f0f9ff; border-left: 4px solid #1e40af; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #1e40af; margin-bottom: 10px; font-size: 1em;">🔍 Clinical Presentation</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Primary Symptoms:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Perimalleolar pain</strong> (burning)</li>
                                        <li>Worse with weight bearing</li>
                                        <li>Often worse at night</li>
                                        <li>Sole paresthesias</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #1e3a8a; font-weight: 600; margin-bottom: 8px; font-size: 0.9em;">Preserved Functions:</p>
                                    <ul style="color: #1e3a8a; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li><strong>Normal ankle reflex</strong></li>
                                        <li>Normal lateral foot sensation (sural)</li>
                                        <li>Normal dorsal foot sensation</li>
                                        <li>Normal long flexors/extensors</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ecfdf5; padding: 15px; border-radius: 8px;">
                            <h6 style="color: #059669; margin-bottom: 10px; font-size: 1em;">🎯 Sensory Distribution</h6>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Medial Plantar Nerve:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Medial sole of foot</li>
                                        <li>Great toe + 2nd, 3rd toes</li>
                                        <li>Medial half of 4th toe</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style="color: #065f46; font-weight: 600; margin-bottom: 5px; font-size: 0.9em;">Lateral Plantar Nerve:</p>
                                    <ul style="color: #065f46; font-size: 0.85em; margin: 0; padding-left: 15px;">
                                        <li>Lateral sole of foot</li>
                                        <li>5th toe</li>
                                        <li>Lateral half of 4th toe</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Electrodiagnostic Challenges -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #fed7aa; padding: 8px; border-radius: 50%; margin-right: 12px;">⚠️</span>
                            Electrodiagnostic Challenges
                        </h4>

                        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <h6 style="color: #92400e; margin-bottom: 10px; font-size: 1em;">🚨 Technical Difficulties</h6>
                            <ul style="color: #78350f; font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                <li><strong>Plantar responses are extremely small</strong> - often require averaging</li>
                                <li><strong>May be absent in normal subjects</strong> - especially older patients</li>
                                <li><strong>Temperature sensitive</strong> - most distal nerve in lower extremity</li>
                                <li><strong>Side-to-side comparison essential</strong> - absolute values unreliable</li>
                            </ul>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">🔬 Required Studies</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Bilateral tibial motor</strong> to AHB & ADQP</li>
                                    <li><strong>Plantar mixed responses</strong> (medial & lateral)</li>
                                    <li><strong>Routine tibial/peroneal</strong> studies</li>
                                    <li><strong>Sural sensory</strong> (exclude polyneuropathy)</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style="color: #92400e; margin-bottom: 12px; font-size: 1.1em;">⚡ EMG Limitations</h5>
                                <ul style="color: #78350f; font-size: 0.95em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Intrinsic foot muscles painful</strong> to examine</li>
                                    <li><strong>Difficult to activate</strong> muscles</li>
                                    <li><strong>"Normal abnormalities"</strong> common</li>
                                    <li><strong>Requires bilateral comparison</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Differential Diagnosis -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #1d4ed8; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #dbeafe; padding: 8px; border-radius: 50%; margin-right: 12px;">🤔</span>
                            Differential Diagnosis
                        </h4>

                        <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                <thead>
                                    <tr style="background: #f3f4f6;">
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Condition</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sole Sensation</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Lateral Foot</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Ankle Reflex</th>
                                        <th style="border: 1px solid #d1d5db; padding: 12px; text-align: left; color: #374151; font-weight: 600;">Sural Response</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #dc2626;">Tarsal Tunnel</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;"><strong>Normal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #7f1d1d;">Normal</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">Polyneuropathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Abnormal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">May be reduced</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;"><strong>Abnormal</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #7c2d12;">Proximal Tibial</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;"><strong>Abnormal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #92400e;">Normal</td>
                                    </tr>
                                    <tr style="background: #f9fafb;">
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #1d4ed8;">S1 Radiculopathy</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">May be abnormal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;"><strong>Abnormal</strong></td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #1e3a8a;">Normal</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; font-weight: 600; color: #059669;">Orthopedic</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                        <td style="border: 1px solid #d1d5db; padding: 12px; color: #065f46;">Normal</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Diagnostic Strategy -->
                    <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                        <h4 style="color: #059669; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.4em;">
                            <span style="background: #d1fae5; padding: 8px; border-radius: 50%; margin-right: 12px;">📋</span>
                            Diagnostic Strategy
                        </h4>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                                <h5 style="color: #1e40af; margin-bottom: 12px; font-size: 1.1em;">✅ Criteria for TTS</h5>
                                <ul style="color: #1e3a8a; font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Asymmetric plantar responses</strong> (>50% difference)</li>
                                    <li><strong>Prolonged distal latencies</strong></li>
                                    <li><strong>Normal sural response</strong></li>
                                    <li><strong>Clinical correlation</strong> essential</li>
                                </ul>
                            </div>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px;">
                                <h5 style="color: #dc2626; margin-bottom: 12px; font-size: 1.1em;">❌ Red Flags</h5>
                                <ul style="color: #7f1d1d; font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Abnormal sural</strong> → polyneuropathy</li>
                                    <li><strong>Bilateral absent plantar</strong> → normal variant</li>
                                    <li><strong>Abnormal ankle reflex</strong> → proximal lesion</li>
                                    <li><strong>Normal studies</strong> → orthopedic problem</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Clinical Pearls -->
                    <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #78350f; padding: 20px; border-radius: 15px;">
                        <h4 style="margin-bottom: 15px; display: flex; align-items: center; color: #78350f; font-size: 1.3em;">
                            <span style="margin-right: 10px;">💎</span>
                            Clinical Pearls
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>TTS is exceptionally rare</strong> - unlike carpal tunnel syndrome</li>
                                    <li><strong>Most "TTS" referrals</strong> are polyneuropathy or orthopedic</li>
                                    <li><strong>Side-to-side comparison</strong> absolutely essential</li>
                                    <li><strong>Normal ankle reflex</strong> key differentiating feature</li>
                                </ul>
                            </div>
                            <div>
                                <ul style="font-size: 0.9em; line-height: 1.6; margin: 0; padding-left: 18px;">
                                    <li><strong>Plantar responses difficult</strong> - often need averaging</li>
                                    <li><strong>Intrinsic foot EMG</strong> frequently shows "normal abnormalities"</li>
                                    <li><strong>Temperature affects</strong> plantar nerve conduction</li>
                                    <li><strong>Clinical correlation critical</strong> for diagnosis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Master Overview Chart -->
                <div id="overview-content" class="nerve-content" style="display: none;">
                    ${generateMasterNerveChart()}
                </div>
            </div>

            <!-- Comparison Table -->
            <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 25px;">
                <h3 style="color: #059669; margin-bottom: 15px;">📊 Quick Comparison: Median & Ulnar Nerve Lesions</h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc);">
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Location</th>
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Motor Loss</th>
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Sensory Loss</th>
                                <th style="border: 2px solid #0288d1; padding: 10px; text-align: center;">Key EDX Finding</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="background: #f8f9fa;">
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold;">Carpal Tunnel</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">APB, OP, FPB (superficial), lumbricals 1&2</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Thumb, index, middle, lateral ring</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Prolonged distal latencies</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold;">Pronator Syndrome</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Same as CTS + proximal muscles</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Same as CTS + thenar eminence</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Slow forearm conduction</td>
                            </tr>
                            <tr style="background: #f8f9fa;">
                                <td style="border: 1px solid #dee2e6; padding: 10px; font-weight: bold;">AIN Syndrome</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">FPL, FDP (index/middle), PQ</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">None (pure motor)</td>
                                <td style="border: 1px solid #dee2e6; padding: 10px;">Denervation in specific muscles</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Interactive Quiz -->
            <div style="background: white; padding: 20px; border-radius: 15px; border-left: 5px solid #f59e0b;">
                <h4 style="color: #d97706; margin-bottom: 15px;">🧠 Knowledge Check</h4>
                <p style="margin-bottom: 15px;"><strong>A patient presents with numbness in the thumb and index finger, weakness of thumb abduction, but normal sensation over the thenar eminence. What is the most likely diagnosis?</strong></p>
                <div class="quiz-options">
                    <button class="quiz-option" onclick="checkMedianAnswer(this, true)" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">Carpal tunnel syndrome</button>
                    <button class="quiz-option" onclick="checkMedianAnswer(this, false)" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">Pronator syndrome</button>
                    <button class="quiz-option" onclick="checkMedianAnswer(this, false)" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">Anterior interosseous syndrome</button>
                    <button class="quiz-option" onclick="checkMedianAnswer(this, false)" style="display: block; width: 100%; margin: 5px 0; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">C6 radiculopathy</button>
                </div>
            </div>
        </div>

        <script>
        function showMedianSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.median-section').forEach(section => {
                section.style.display = 'none';
            });

            // Show selected section
            document.getElementById(sectionId).style.display = 'block';

            // Update button styles
            document.querySelectorAll('.nerve-nav-btn').forEach(btn => {
                btn.style.background = '#f8fafc';
                btn.style.border = '2px solid #e2e8f0';
                btn.querySelectorAll('h5, p').forEach(el => el.style.color = '#64748b');
            });

            // Highlight active button
            const activeBtn = document.querySelector('[data-section="' + sectionId + '"]');
            activeBtn.style.background = 'white';
            activeBtn.style.border = '3px solid #3b82f6';
            activeBtn.querySelectorAll('h5').forEach(el => el.style.color = '#1e40af');
        }

        // checkMedianAnswer function moved to global scope in main HTML file

        // Navigation functions moved to global scope in main HTML file
        </script>
    `;
}

function generateCarpalTunnelContent() {
    return `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">🖐️ Carpal Tunnel Syndrome - Median Nerve at Wrist</h5>

            <!-- Anatomy Section -->
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Anatomy & Compression Site</h6>
                <ul style="color: #374151; line-height: 1.6; margin: 0;">
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
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Nocturnal paresthesias</li>
                            <li>Hand shaking relieves symptoms</li>
                            <li>Provoked by driving, phone use</li>
                            <li>Pain radiates to forearm</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Physical Signs:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
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
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li>Prolonged median distal motor latency</li>
                            <li>Prolonged median sensory latency</li>
                            <li>Reduced amplitudes (severe cases)</li>
                            <li>Abnormal comparison studies</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Sensitive Tests:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
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
}

function generateProximalMedianContent() {
    return `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">💪 Proximal Median Neuropathies</h5>

            <!-- Anatomical Overview -->
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Anatomical Compression Sites</h6>
                <div style="color: #374151; line-height: 1.6; margin: 0;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Four Major Sites:</p>
                            <ol style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                                <li><strong>Ligament of Struthers</strong> (rare)</li>
                                <li><strong>Lacertus fibrosus</strong></li>
                                <li><strong>Between pronator teres heads</strong></li>
                                <li><strong>Sublimis bridge (FDS arch)</strong></li>
                            </ol>
                        </div>
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Key Anatomical Points:</p>
                            <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                                <li>AIN branch given off 5-8cm distal to medial epicondyle</li>
                                <li>Palmar cutaneous branch proximal to carpal tunnel</li>
                                <li>Nerve travels with brachial artery</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ligament of Struthers -->
            <div style="background: #fefbeb; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                <h6 style="color: #92400e; margin-bottom: 10px;">⚠️ Ligament of Struthers Entrapment (Very Rare)</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Anatomy & Prevalence:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Supracondylar bony spur (1-2% population)</li>
                            <li>Tendinous band to medial epicondyle</li>
                            <li>Median nerve + brachial artery compressed</li>
                            <li>Visible on plain X-rays</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Clinical Features:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Volar forearm pain</li>
                            <li>Symptoms worse with supination + elbow extension</li>
                            <li>Radial pulse may be diminished</li>
                            <li>Palpable bony spur</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Pronator Syndrome -->
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #92400e; margin-bottom: 10px;">🔧 Pronator Syndrome (Most Common Proximal)</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Three Compression Sites:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li><strong>Lacertus fibrosus:</strong> From biceps to flexor muscles</li>
                            <li><strong>Pronator teres:</strong> Between muscle heads (most common)</li>
                            <li><strong>Sublimis bridge:</strong> FDS aponeurotic edge</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Clinical Presentation:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
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
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li><strong>FPL:</strong> Thumb IP flexion weakness</li>
                            <li><strong>FDP (index/middle):</strong> DIP flexion loss</li>
                            <li><strong>Pronator quadratus:</strong> Weak pronation (elbow flexed)</li>
                            <li><strong>Pure motor</strong> - no sensory loss</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Clinical Signs:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
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
                    <ul style="color: #14532d; font-size: 0.9em; margin: 0;">
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
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li>Reduced CMAP/SNAP amplitudes</li>
                            <li>Normal/slightly prolonged distal latencies</li>
                            <li>Slow forearm conduction velocity</li>
                            <li>Normal median-ulnar comparison studies</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #3730a3; font-weight: 500; margin-bottom: 5px;">EMG Key Findings:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
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
                        <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0;">
                            <li><strong>Thenar sensation:</strong> Affected in proximal (spared in CTS)</li>
                            <li><strong>Timing:</strong> Not worse at night</li>
                            <li><strong>Proximal muscles:</strong> Involved in proximal lesions</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">vs C6/C7 Radiculopathy:</p>
                        <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0;">
                            <li><strong>Neck pain:</strong> Absent in median neuropathy</li>
                            <li><strong>Reflexes:</strong> Normal in isolated median lesions</li>
                            <li><strong>Distribution:</strong> Pure median territory</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Ulnar Nerve Content Functions
function generateUlnarElbowContent() {
    console.log('🤏 DEBUG: generateUlnarElbowContent function called');
    return `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">🤏 Ulnar Neuropathy at Elbow (UNE)</h5>

            <!-- Anatomical Overview -->
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Cubital Tunnel Anatomy</h6>
                <div style="color: #374151; line-height: 1.6; margin: 0;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Compression Sites:</p>
                            <ol style="color: #1e1b4b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                                <li><strong>Arcade of Struthers</strong> (proximal)</li>
                                <li><strong>Medial intermuscular septum</strong></li>
                                <li><strong>Cubital tunnel</strong> (most common)</li>
                                <li><strong>Aponeurosis between FCU heads</strong></li>
                            </ol>
                        </div>
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Key Anatomy:</p>
                            <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                                <li>Ulnar groove behind medial epicondyle</li>
                                <li>Osborne's band (roof of cubital tunnel)</li>
                                <li>MCL forms floor of tunnel</li>
                                <li>Most vulnerable with elbow flexion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clinical Presentation -->
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #92400e; margin-bottom: 10px;">🎯 Clinical Presentation</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Sensory Symptoms:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li>Medial forearm pain</li>
                            <li>Ring & little finger numbness</li>
                            <li>Worse with prolonged elbow flexion</li>
                            <li>Aching pain along ulnar groove</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #78350f; font-weight: 500; margin-bottom: 5px;">Motor Signs:</p>
                        <ul style="color: #451a03; font-size: 0.9em; margin: 0;">
                            <li><strong>Early:</strong> Weak pinch, grip strength</li>
                            <li><strong>Late:</strong> Visible muscle atrophy</li>
                            <li>Benediction posture</li>
                            <li>Froment's sign (FPL compensation)</li>
                        </ul>
                    </div>
                </div>

                <!-- Clinical Signs -->
                <div style="background: #fff8db; padding: 12px; border-radius: 6px; border: 1px solid #fbbf24;">
                    <p style="color: #92400e; font-weight: 600; margin-bottom: 8px;">🔍 Physical Examination Findings:</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 0.85em;">
                        <div style="text-align: center; color: #78350f;">
                            <strong>Froment's Sign:</strong><br>
                            FPL compensates for weak adductor pollicis
                        </div>
                        <div style="text-align: center; color: #78350f;">
                            <strong>Wartenberg's Sign:</strong><br>
                            Abducted little finger (weak 3rd PI)
                        </div>
                        <div style="text-align: center; color: #78350f;">
                            <strong>Tinel's Sign:</strong><br>
                            Percussion over ulnar groove
                        </div>
                    </div>
                </div>
            </div>

            <!-- Muscle Involvement Pattern -->
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #065f46; margin-bottom: 10px;">💪 Muscle Involvement Pattern</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Forearm Muscles:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li><strong>FCU:</strong> Often spared (dual innervation)</li>
                            <li><strong>FDP (ring/little):</strong> Weak grip</li>
                            <li>May have proximal vs distal patterns</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Hand Muscles (All Affected):</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li>Hypothenar muscles (ADM, ODM, FDM)</li>
                            <li>Interossei (all - DAB/PAD)</li>
                            <li>Lumbricals 3&4</li>
                            <li>Adductor pollicis</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- EDX Findings -->
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #6366f1;">
                <h6 style="color: #4f46e5; margin-bottom: 10px;">⚡ Electrodiagnostic Findings</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #3730a3; font-weight: 500; margin-bottom: 5px;">NCS Key Findings:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li>Slow conduction across elbow segment</li>
                            <li>Normal distal ulnar motor/sensory</li>
                            <li>Conduction block possible</li>
                            <li>Dorsal ulnar cutaneous may be normal</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #3730a3; font-weight: 500; margin-bottom: 5px;">EMG Patterns:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li><strong>FCU involvement:</strong> Proximal lesion</li>
                            <li><strong>FCU sparing:</strong> Distal lesion</li>
                            <li>Hand muscle denervation (FDI primary)</li>
                            <li>Progressive severity with chronicity</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Differential Diagnosis -->
            <div style="background: #fdf2f8; padding: 15px; border-radius: 8px;">
                <h6 style="color: #be185d; margin-bottom: 10px;">🔍 Differential Diagnosis</h6>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">vs Ulnar Neuropathy at Wrist:</p>
                        <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0;">
                            <li><strong>Dorsal hand sensation:</strong> Spared in UNW</li>
                            <li><strong>FCU/FDP:</strong> Normal in UNW</li>
                            <li><strong>Location:</strong> Wrist vs elbow symptoms</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">vs C8-T1 Radiculopathy:</p>
                        <ul style="color: #4c1d4f; font-size: 0.9em; margin: 0;">
                            <li><strong>Neck pain:</strong> Present in radiculopathy</li>
                            <li><strong>APB involvement:</strong> In radiculopathy</li>
                            <li><strong>Paraspinal muscles:</strong> Abnormal in root</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateUlnarWristContent() {
    console.log('✋ DEBUG: generateUlnarWristContent function called');
    return `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.2em;">✋ Ulnar Neuropathy at Wrist (UNW)</h5>

            <!-- Anatomical Overview -->
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h6 style="color: #3730a3; margin-bottom: 10px;">🔬 Guyon's Canal Anatomy</h6>
                <div style="color: #374151; line-height: 1.6; margin: 0;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Canal Boundaries:</p>
                            <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                                <li><strong>Radial:</strong> Hook of hamate</li>
                                <li><strong>Ulnar:</strong> Pisiform bone</li>
                                <li><strong>Floor:</strong> Transverse carpal ligament</li>
                                <li><strong>Roof:</strong> Volar carpal ligament</li>
                            </ul>
                        </div>
                        <div>
                            <p style="color: #1e3a8a; font-weight: 500; margin-bottom: 5px;">Three Zones:</p>
                            <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                                <li><strong>Zone 1:</strong> Mixed nerve compression</li>
                                <li><strong>Zone 2:</strong> Deep motor branch</li>
                                <li><strong>Zone 3:</strong> Superficial sensory branch</li>
                            </ul>
                        </div>
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
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                            <li>Hook of hamate fracture</li>
                            <li>Cyclist's palsy (handlebar pressure)</li>
                            <li>Repetitive trauma</li>
                            <li>Chronic pressure on hypothenar</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #047857; font-weight: 500; margin-bottom: 5px;">Occupational/Masses:</p>
                        <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
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
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
                            <li><strong>FCU:</strong> Normal strength</li>
                            <li><strong>FDP (ring/little):</strong> Normal</li>
                            <li><strong>Dorsal hand sensation:</strong> Normal</li>
                            <li>No forearm symptoms</li>
                        </ul>
                    </div>
                    <div>
                        <p style="color: #3730a3; font-weight: 500; margin-bottom: 5p;">EDX Findings:</p>
                        <ul style="color: #1e1b4b; font-size: 0.9em; margin: 0;">
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
                            <ul style="color: #4c1d4f; margin: 0;">
                                <li>FDI strength (first dorsal interosseous)</li>
                                <li>ADM strength (abductor digiti minimi)</li>
                                <li>Froment's sign</li>
                                <li>Wartenberg's sign</li>
                            </ul>
                        </div>
                        <div>
                            <p style="color: #831843; font-weight: 500; margin-bottom: 5px;">Examine Wrist For:</p>
                            <ul style="color: #4c1d4f; margin: 0;">
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

        <script>
            // Initialize pathophysiology navigation
            setTimeout(() => {
                if (typeof window.initializePathophysiology === 'function') {
                    window.initializePathophysiology();
                }
            }, 200);
        </script>
    `;
}

function generateMasterNerveChart() {
    console.log('📊 DEBUG: generateMasterNerveChart function called');
    return `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.3em;">📊 Master Peripheral Nerve Pathophysiology Chart</h5>

            <!-- Introduction -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <p style="color: #92400e; font-weight: 500; margin: 0; font-size: 1.05em;">
                    🎯 Comprehensive comparison of all major peripheral nerve entrapments and their clinical patterns
                </p>
            </div>

            <!-- Comprehensive Comparison Table -->
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white;">
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Nerve</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Entrapment Site</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Motor Loss</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Sensory Loss</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Key EDX Finding</th>
                            <th style="border: 2px solid #1d4ed8; padding: 12px; text-align: center; font-weight: 700;">Classic Sign</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Median Nerve Group -->
                        <tr style="background: #f0fdf4;">
                            <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: bold; color: #065f46;">🖐️ Median</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #047857;"><strong>Carpal Tunnel</strong></td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">APB, OP, FPB, Lumb 1&2</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Thumb, index, middle, lateral ring</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Prolonged distal latencies</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px; color: #064e3b;">Nocturnal symptoms, Phalen's</td>
                        </tr>
                        <tr style="background: #f8f9fa;">
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
                    <ul style="color: #064e3b; font-size: 0.9em; margin: 0;">
                        <li><strong>Sensory sparing:</strong> Look for pure motor syndromes</li>
                        <li><strong>Timing patterns:</strong> Nocturnal vs activity-related</li>
                        <li><strong>Muscle combinations:</strong> Which muscles group together</li>
                        <li><strong>Provocative tests:</strong> Specific anatomical stresses</li>
                    </ul>
                </div>
                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
                    <h6 style="color: #991b1b; margin-bottom: 10px;">⚠️ Common Pitfalls</h6>
                    <ul style="color: #7f1d1d; font-size: 0.9em; margin: 0;">
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
}

function generatePlexusAnatomyContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #fef2f2, #fee2e2); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #dc2626;">
                <h3 style="color: #b91c1c; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #991b1b; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master brachial and lumbosacral plexus anatomy including nerve root organization, pathway tracing, and clinical correlations essential for EMG interpretation and localization.
                </p>
            </div>

            <!-- Pathway Explorer Section -->
            <div style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #0ea5e9;">
                <h4 style="color: #0c4a6e; margin-bottom: 20px; font-size: 1.4em;">📍 Interactive Pathway Explorer</h4>
                <p style="color: #0369a1; margin-bottom: 25px; font-size: 1.1em;">
                    Explore nerve pathways with step-by-step progression and memorable stories. Each nerve's journey is broken down into key anatomical landmarks.
                </p>

                <!-- Nerve Selector -->
                <div class="nerve-selector" id="nerve-selector" style="margin-bottom: 30px;">
                    <h5 style="color: #075985; margin-bottom: 15px; font-size: 1.2em;">🧠 Choose a nerve to explore:</h5>
                    <div class="nerve-buttons" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div class="nerve-group" style="background: #f0f9ff; border-radius: 12px; padding: 20px; border: 2px solid #0ea5e9;">
                            <h6 style="color: #0c4a6e; margin-bottom: 15px; text-align: center; font-size: 1.1em; font-weight: 600;">💪 Upper Extremity</h6>
                            <button class="nerve-btn" onclick="selectNerve('median')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🖐️ Median Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('ulnar')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🤏 Ulnar Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('radial')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">👍 Radial Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('musculocutaneous')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">💪 Musculocutaneous</button>
                            <button class="nerve-btn" onclick="selectNerve('axillary')" style="display: block; width: 100%; margin-bottom: 0; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🤲 Axillary Nerve</button>
                        </div>
                        <div class="nerve-group" style="background: #f0f9ff; border-radius: 12px; padding: 20px; border: 2px solid #0ea5e9;">
                            <h6 style="color: #0c4a6e; margin-bottom: 15px; text-align: center; font-size: 1.1em; font-weight: 600;">🦵 Lower Extremity</h6>
                            <button class="nerve-btn" onclick="selectNerve('femoral')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🦵 Femoral Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('tibial')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🦶 Tibial Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('peroneal')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🚶 Peroneal Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('sciatic')" style="display: block; width: 100%; margin-bottom: 10px; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🦴 Sciatic Nerve</button>
                            <button class="nerve-btn" onclick="selectNerve('obturator')" style="display: block; width: 100%; margin-bottom: 0; padding: 8px 15px; background: white; border: 2px solid #0ea5e9; border-radius: 8px; color: #0c4a6e; font-weight: 600; cursor: pointer; transition: all 0.2s;">🔀 Obturator Nerve</button>
                        </div>
                    </div>
                </div>

                <!-- Pathway Display -->
                <div class="pathway-container" id="pathway-container" style="display: none;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 25px;">
                        <div class="pathway-steps">
                            <h5 style="color: #0c4a6e; margin-bottom: 20px; font-size: 1.2em;">🗺️ Nerve Pathway</h5>
                            <div id="pathway-steps" style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #bae6fd; min-height: 200px; cursor: default; transition: all 0.3s ease; position: relative;">
                                <p style="color: #64748b; text-align: center; margin-top: 60px;">Select a nerve to see pathway steps</p>
                            </div>
                            <div style="text-align: center; margin-top: 15px;">
                                <button onclick="previousStep()" id="prev-btn" style="background: #0ea5e9; color: white; border: none; padding: 8px 15px; border-radius: 6px; margin-right: 10px; cursor: pointer;" disabled>← Previous</button>
                                <button onclick="resetPathway()" style="background: #64748b; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer;">Reset</button>
                            </div>
                        </div>

                        <div class="pathway-image-section">
                            <h5 style="color: #0c4a6e; margin-bottom: 20px; font-size: 1.2em;">🖼️ Anatomical Diagram</h5>
                            <div id="nerve-pathway-image" style="background: white; border: 2px solid #bae6fd; border-radius: 12px; padding: 20px; text-align: center; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                                <div style="text-align: center;">
                                    <div style="font-size: 3em; margin-bottom: 15px; color: #94a3b8;">🧠</div>
                                    <p style="color: #64748b;">Select a nerve to view anatomical pathway</p>
                                    <p style="color: #94a3b8; font-size: 0.9em; margin-top: 10px;">[Image placeholder - pathway diagram will appear here]</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Memory Story Section -->
                    <div class="story-section" style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #bae6fd;">
                        <h5 style="color: #0c4a6e; margin-bottom: 15px; font-size: 1.2em;">📖 Memory Story</h5>
                        <div id="story-text" style="color: #374151; line-height: 1.7; font-size: 1.05em;">
                            Select a nerve to begin the journey through your anatomical adventure!
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clinical Applications -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🏥 Clinical Applications</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 12px;">
                        <h5 style="color: #ea580c; margin-bottom: 15px;">EMG Localization Strategy</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>Root vs. plexus vs. peripheral nerve</li>
                            <li>Muscle selection for EMG needle examination</li>
                            <li>Paraspinal muscle significance</li>
                            <li>Anatomical vs. functional localization</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px;">
                        <h5 style="color: #ea580c; margin-bottom: 15px;">Common Clinical Scenarios</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li>Cervical radiculopathy vs. carpal tunnel</li>
                            <li>Lumbar radiculopathy vs. peroneal neuropathy</li>
                            <li>Brachial plexopathy patterns</li>
                            <li>Thoracic outlet syndrome</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Interactive Quiz -->
            <div class="quiz-section">
                <h4 style="color: #7c2d12; margin-bottom: 20px;">🧠 Plexus Knowledge Check</h4>
                <div style="background: #fef7f0; padding: 20px; border-radius: 12px; border: 2px solid rgba(234, 88, 12, 0.2);">
                    <p style="font-size: 1.1em; margin-bottom: 15px; color: #1f2937;">
                        A patient has weakness in thumb abduction and thenar atrophy, but normal median nerve
                        sensory responses. Which location is MOST likely?
                    </p>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkPlexusAnswer(this, false)">Carpal tunnel syndrome</button>
                        <button class="quiz-option" onclick="checkPlexusAnswer(this, true)">Anterior interosseous nerve syndrome</button>
                        <button class="quiz-option" onclick="checkPlexusAnswer(this, false)">C8 radiculopathy</button>
                        <button class="quiz-option" onclick="checkPlexusAnswer(this, false)">Radial nerve</button>
                        <button class="quiz-option" onclick="checkPlexusAnswer(this, false)">Ulnar nerve</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            // Pathway Explorer JavaScript - defined in global scope
            if (typeof window.pathwayExplorer === 'undefined') {
                window.pathwayExplorer = {};

                window.pathwayExplorer.currentNerve = null;
                window.pathwayExplorer.currentStep = 0;
                window.pathwayExplorer.maxSteps = 0;

                window.pathwayExplorer.nerveData = {
                    median: {
                        name: "Median Nerve",
                        roots: "C6-T1",
                        story: "The Median Messenger starts his epic journey at the bustling Brachial Plexus Central Station (C6-T1), where lateral and medial cords shake hands to form our hero. He travels down the arm like a VIP, riding the bicipital groove limousine between the Biceps and Brachialis neighborhoods. At the Cubital Fossa rest stop, he takes a breather medial to the brachial artery before squeezing through the narrow Pronator Teres tunnel. His faithful sidekick, the Anterior Interosseous branch, splits off to handle the deep muscle work while our main character continues toward his final destination: the infamous Carpal Tunnel! After surviving this tight squeeze, he emerges victorious in the hand, ready to command the LOAF muscles like a general commanding his troops!",
                        steps: [
                            {title: "Origin", desc: "Forms from lateral and medial cords of brachial plexus (C6-T1)"},
                            {title: "Upper Arm", desc: "Travels medially to humerus in bicipital groove"},
                            {title: "Cubital Fossa", desc: "Passes medial to brachial artery"},
                            {title: "Forearm Entry", desc: "Passes between heads of pronator teres"},
                            {title: "AIN Branch", desc: "Gives off anterior interosseous nerve"},
                            {title: "Carpal Tunnel", desc: "Passes through carpal tunnel"},
                            {title: "Hand", desc: "Divides into branches for thenar muscles (LOAF)"}
                        ]
                    },
                    ulnar: {
                        name: "Ulnar Nerve",
                        roots: "C8-T1",
                        story: "The Ulnar Underdog begins as the lone ranger from the medial cord, carrying the pure power of C8 and T1. He travels down the arm, taking the scenic route around the medial epicondyle at the elbow - that famous 'funny bone' spot where everyone's felt his electric personality! He slides through Guyon's canal at the wrist like a secret agent, then splits his mission: the deep branch heads to the interossei (the hand's fine motor specialists), while the superficial branch handles sensation for the pinky side of life.",
                        steps: [
                            {title: "Origin", desc: "Arises from medial cord of brachial plexus (C8-T1)"},
                            {title: "Upper Arm", desc: "Travels down medial aspect of arm"},
                            {title: "Cubital Tunnel", desc: "Passes through cubital tunnel behind medial epicondyle"},
                            {title: "Forearm", desc: "Travels between FCU and FDP in forearm"},
                            {title: "Guyon's Canal", desc: "Passes through Guyon's canal at wrist"},
                            {title: "Hand Division", desc: "Splits into superficial and deep branches"},
                            {title: "Hand Muscles", desc: "Innervates intrinsic hand muscles and sensation"}
                        ]
                    },
                    radial: {
                        name: "Radial Nerve",
                        roots: "C5-T1",
                        story: "The Radial Rebel is the strong, silent type from the posterior cord, packing the full power of C5-T1. This mighty nerve takes the back route down the arm, spiraling around the humerus in the famous spiral groove like a roller coaster. He's the extension expert, powering all the muscles that straighten the elbow, lift the wrist, and extend the fingers. His most vulnerable moment comes at the spiral groove, where a broken humerus can leave him bruised and beaten, causing the dreaded 'wrist drop.'",
                        steps: [
                            {title: "Origin", desc: "Arises from posterior cord (C5-T1)"},
                            {title: "Spiral Groove", desc: "Travels in spiral groove of humerus (vulnerable point)"},
                            {title: "Lateral Arm", desc: "Emerges laterally, pierces lateral intermuscular septum"},
                            {title: "Elbow Division", desc: "Divides into superficial and deep (PIN) branches"},
                            {title: "Posterior Forearm", desc: "PIN innervates extensor muscles"},
                            {title: "Dorsal Hand", desc: "Superficial branch provides dorsal hand sensation"}
                        ]
                    },
                    musculocutaneous: {
                        name: "Musculocutaneous Nerve",
                        roots: "C5-C7",
                        story: "The Musculocutaneous Marvel begins at the lateral cord headquarters in the brachial plexus, carrying orders from C5-C7. This sturdy nerve pierces through the coracobrachialis muscle like a determined warrior, then travels between the biceps brachii and brachialis muscles, supervising their every flex. As it approaches the elbow, it transforms into the lateral cutaneous nerve of the forearm, spreading its sensory network across the lateral forearm like a protective shield.",
                        steps: [
                            {title: "Origin", desc: "Arises from lateral cord of brachial plexus (C5-C7)"},
                            {title: "Coracobrachialis", desc: "Pierces coracobrachialis muscle"},
                            {title: "Biceps Brachii", desc: "Innervates biceps brachii"},
                            {title: "Brachialis", desc: "Innervates lateral part of brachialis"},
                            {title: "Lateral Cutaneous", desc: "Becomes lateral cutaneous nerve of forearm"},
                            {title: "Forearm Sensation", desc: "Provides sensation to lateral forearm"}
                        ]
                    },
                    axillary: {
                        name: "Axillary Nerve",
                        roots: "C5-C6",
                        story: "The Axillary Ambassador emerges from the posterior cord, carrying the strength of C5 and C6. This diplomatic nerve travels posteriorly around the surgical neck of the humerus, navigating through the quadrilateral space like a secret agent. It has two important missions: powering the mighty deltoid muscle and providing sensation to the shoulder's badge of honor - that small patch of skin over the deltoid that soldiers call the 'regimental patch'.",
                        steps: [
                            {title: "Origin", desc: "Arises from posterior cord (C5-C6)"},
                            {title: "Quadrilateral Space", desc: "Passes through quadrilateral space"},
                            {title: "Surgical Neck", desc: "Wraps around surgical neck of humerus"},
                            {title: "Deltoid Motor", desc: "Innervates deltoid muscle"},
                            {title: "Teres Minor", desc: "Innervates teres minor muscle"},
                            {title: "Cutaneous Branch", desc: "Provides sensation over deltoid (regimental patch)"}
                        ]
                    },
                    femoral: {
                        name: "Femoral Nerve",
                        roots: "L2-L4",
                        story: "The Femoral General emerges from the lumbar plexus with the authority of L2-L4. This commanding nerve travels under the inguinal ligament like a VIP passing through customs, then spreads its influence across the anterior thigh. It's the knee extension expert, powering the mighty quadriceps muscle group while also providing sensation down the medial leg via its saphenous branch - the longest sensory nerve in the body!",
                        steps: [
                            {title: "Origin", desc: "Forms from lumbar plexus (L2-L4)"},
                            {title: "Inguinal Ligament", desc: "Passes under inguinal ligament"},
                            {title: "Femoral Triangle", desc: "Enters femoral triangle"},
                            {title: "Quadriceps", desc: "Innervates quadriceps muscle group"},
                            {title: "Saphenous Branch", desc: "Gives off saphenous nerve"},
                            {title: "Medial Leg", desc: "Saphenous nerve provides sensation to medial leg"}
                        ]
                    },
                    tibial: {
                        name: "Tibial Nerve",
                        roots: "L4-S3",
                        story: "The Tibial Traveler is one half of the mighty sciatic nerve's legacy, carrying the plantarflexion power of L4-S3. After the sciatic nerve splits at the popliteal fossa, this nerve takes the deep route down the posterior leg, traveling through the tarsal tunnel at the ankle like a train through a mountain pass. It's the pointing-toes expert, controlling all the muscles that push the foot down and curl the toes.",
                        steps: [
                            {title: "Origin", desc: "Medial division of sciatic nerve (L4-S3)"},
                            {title: "Popliteal Fossa", desc: "Continues from sciatic bifurcation"},
                            {title: "Posterior Leg", desc: "Travels down posterior compartment"},
                            {title: "Plantarflexors", desc: "Innervates calf muscles and deep compartment"},
                            {title: "Tarsal Tunnel", desc: "Passes through tarsal tunnel at ankle"},
                            {title: "Foot Muscles", desc: "Innervates intrinsic foot muscles"}
                        ]
                    },
                    peroneal: {
                        name: "Peroneal (Fibular) Nerve",
                        roots: "L4-S2",
                        story: "The Peroneal Pioneer, also known as the Common Fibular nerve, is an adventurous branch of the mighty sciatic nerve. This nerve loves taking the scenic route around the fibular head, making it vulnerable but vital for foot function. It splits into two explorers: the superficial peroneal (the ankle evertor) and the deep peroneal (the toe lifter), each with their own important territories to govern in the lower leg and foot.",
                        steps: [
                            {title: "Origin", desc: "Lateral division of sciatic nerve (L4-S2)"},
                            {title: "Fibular Head", desc: "Wraps around fibular head (vulnerable point)"},
                            {title: "Superficial Branch", desc: "Gives off superficial peroneal nerve"},
                            {title: "Deep Branch", desc: "Continues as deep peroneal nerve"},
                            {title: "Ankle Muscles", desc: "Innervates ankle dorsiflexors and everters"},
                            {title: "Foot Sensation", desc: "Provides sensation to dorsal foot and web spaces"}
                        ]
                    },
                    sciatic: {
                        name: "Sciatic Nerve",
                        roots: "L4-S3",
                        story: "The Sciatic Supreme is the body's largest and most powerful nerve, combining the might of the lumbar and sacral plexuses. This heavyweight champion travels through the greater sciatic foramen, then runs down the posterior thigh like a mighty river. At the popliteal fossa, it typically splits into its two famous branches: the tibial nerve (the plantarflexion powerhouse) and the common peroneal nerve (the dorsiflexion dynamo).",
                        steps: [
                            {title: "Origin", desc: "Forms from sacral plexus (L4-S3)"},
                            {title: "Greater Sciatic Foramen", desc: "Exits pelvis through greater sciatic foramen"},
                            {title: "Posterior Thigh", desc: "Travels down posterior thigh"},
                            {title: "Hamstring Muscles", desc: "Innervates hamstring muscles"},
                            {title: "Popliteal Fossa", desc: "Reaches popliteal fossa"},
                            {title: "Bifurcation", desc: "Splits into tibial and common peroneal nerves"}
                        ]
                    },
                    obturator: {
                        name: "Obturator Nerve",
                        roots: "L2-L4",
                        story: "The Obturator Officer is a specialized nerve with a unique mission: controlling hip adduction. Born from the lumbar plexus, this nerve takes an unusual route through the obturator foramen (hence its name), like a secret tunnel through the pelvis. It divides into anterior and posterior branches to command the adductor muscle army, helping bring the legs together and stabilize the hip during walking.",
                        steps: [
                            {title: "Origin", desc: "Arises from lumbar plexus (L2-L4)"},
                            {title: "Obturator Foramen", desc: "Passes through obturator foramen"},
                            {title: "Anterior Branch", desc: "Splits into anterior branch"},
                            {title: "Posterior Branch", desc: "Splits into posterior branch"},
                            {title: "Adductor Muscles", desc: "Innervates adductor muscle group"},
                            {title: "Hip Sensation", desc: "Provides sensation to medial thigh"}
                        ]
                    }
                };
            }

            window.selectNerve = function(nerveName) {
                const explorer = window.pathwayExplorer;
                if (!explorer.nerveData[nerveName]) return;

                explorer.currentNerve = explorer.nerveData[nerveName];
                explorer.currentStep = 0;
                explorer.maxSteps = explorer.currentNerve.steps.length;

                // Show pathway container
                document.getElementById('pathway-container').style.display = 'block';

                // Update story
                document.getElementById('story-text').innerHTML = explorer.currentNerve.story;

                // Update pathway image placeholder
                document.getElementById('nerve-pathway-image').innerHTML = \`
                    <div style="text-align: center;">
                        <div style="font-size: 3em; margin-bottom: 15px; color: #0ea5e9;">🧠</div>
                        <h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 1.1em;">\${explorer.currentNerve.name}</h6>
                        <p style="color: #64748b;">Nerve Roots: \${explorer.currentNerve.roots}</p>
                        <p style="color: #94a3b8; font-size: 0.9em; margin-top: 15px; padding: 10px; background: #f1f5f9; border-radius: 6px;">[Anatomical pathway diagram placeholder - original images were removed due to size]</p>
                    </div>
                \`;

                // Reset and show first step
                window.showStep(0);

                // Update button states
                document.querySelectorAll('.nerve-btn').forEach(btn => {
                    btn.style.background = 'white';
                    btn.style.color = '#0c4a6e';
                });
                event.target.style.background = '#0ea5e9';
                event.target.style.color = 'white';
            };

            window.showStep = function(stepIndex) {
                const explorer = window.pathwayExplorer;
                if (!explorer.currentNerve || stepIndex < 0 || stepIndex >= explorer.maxSteps) return;

                explorer.currentStep = stepIndex;
                const step = explorer.currentNerve.steps[stepIndex];

                // Update pathway steps display
                const stepsHtml = explorer.currentNerve.steps.map((s, i) => \`
                    <div style="padding: 10px; margin-bottom: 8px; border-radius: 8px; border-left: 4px solid \${i <= stepIndex ? '#10b981' : '#e5e7eb'}; background: \${i === stepIndex ? '#f0fdf4' : (i < stepIndex ? '#ecfdf5' : '#f9fafb')};">
                        <div style="font-weight: 600; color: \${i <= stepIndex ? '#059669' : '#6b7280'}; margin-bottom: 4px;">
                            \${i + 1}. \${s.title}
                        </div>
                        <div style="color: \${i <= stepIndex ? '#374151' : '#9ca3af'}; font-size: 0.95em;">
                            \${s.desc}
                        </div>
                    </div>
                \`).join('');

                // Add click hint at the bottom if not at last step
                const clickHint = stepIndex === explorer.maxSteps - 1 ? '' :
                    '<div style="position: absolute; bottom: 10px; right: 15px; color: #94a3b8; font-size: 0.8em; opacity: 0.7;">Click anywhere to advance →</div>';

                document.getElementById('pathway-steps').innerHTML = stepsHtml + clickHint;

                // Update button states (only prev-btn now)
                document.getElementById('prev-btn').disabled = stepIndex === 0;
                document.getElementById('prev-btn').style.opacity = stepIndex === 0 ? '0.5' : '1';

                // Disable clicking if at last step, enable with hover effects if not
                const pathwayBox = document.getElementById('pathway-steps');
                if (stepIndex === explorer.maxSteps - 1) {
                    pathwayBox.style.cursor = 'default';
                    pathwayBox.onclick = null;
                    pathwayBox.onmouseover = null;
                    pathwayBox.onmouseout = null;
                } else {
                    pathwayBox.style.cursor = 'pointer';
                    pathwayBox.onclick = nextStep;
                    pathwayBox.onmouseover = function() {
                        this.style.backgroundColor = '#f0f9ff';
                        this.style.borderColor = '#0ea5e9';
                        this.style.transform = 'translateY(-2px)';
                        this.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.15)';
                    };
                    pathwayBox.onmouseout = function() {
                        this.style.backgroundColor = 'white';
                        this.style.borderColor = '#bae6fd';
                        this.style.transform = 'translateY(0)';
                        this.style.boxShadow = 'none';
                    };
                }
            };

            window.nextStep = function() {
                const explorer = window.pathwayExplorer;
                if (explorer.currentStep < explorer.maxSteps - 1) {
                    window.showStep(explorer.currentStep + 1);
                }
            };

            window.previousStep = function() {
                const explorer = window.pathwayExplorer;
                if (explorer.currentStep > 0) {
                    window.showStep(explorer.currentStep - 1);
                }
            };

            window.resetPathway = function() {
                const explorer = window.pathwayExplorer;
                if (explorer.currentNerve) {
                    window.showStep(0);
                }
            };
        </script>
    `;
}

function generateReportWritingContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #0ea5e9;">
                <h3 style="color: #0c4a6e; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #075985; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Master professional EMG report writing using standard terminology and structure. Learn to write conclusions that precisely describe findings using proper electrodiagnostic language that referring physicians expect.
                </p>
            </div>

            <!-- Communication Focus Alert -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #f59e0b;">
                <h4 style="color: #92400e; margin-bottom: 10px; font-size: 1.2em;">💡 Key Principle</h4>
                <p style="color: #451a03; margin: 0; font-weight: 500;">
                    Use precise, professional language that follows standard EMG reporting conventions. Referring physicians rely on proper terminology to understand the diagnosis and severity.
                </p>
            </div>

            <!-- Module Navigation Tabs -->
            <div style="display: flex; background: #f8fafc; padding: 5px; border-radius: 12px; margin-bottom: 25px; gap: 3px; flex-wrap: wrap;">
                <button onclick="showReportModule('communication')" id="communication-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🗣️ Clear Communication
                </button>
                <button onclick="showReportModule('severity')" id="severity-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    ⚖️ Severity Classification
                </button>
                <button onclick="showReportModule('examples')" id="examples-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    📚 Clinical Examples
                </button>
                <button onclick="showReportModule('builder')" id="builder-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🔧 Report Builder
                </button>
                <button onclick="showReportModule('coach')" id="coach-tab"
                        style="flex: 1; min-width: 140px; padding: 10px 12px; background: transparent; color: #64748b; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s; font-size: 0.9em;">
                    🎯 Writing Coach
                </button>
            </div>

            <!-- Module Content Container -->
            <div id="report-module-content">
                <!-- Communication Module (Default) -->
                <div id="communication-module" style="display: block;">
                    <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #1e40af; margin-bottom: 20px; font-size: 1.4em;">🗣️ Professional EMG Language Standards</h4>

                        <!-- Before/After Examples -->
                        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                            <h5 style="color: #1f2937; margin-bottom: 15px;">❌ Poor Writing vs ✅ Professional EMG Language</h5>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 3px solid #dc2626;">
                                    <h6 style="color: #dc2626; margin-bottom: 10px;">❌ Imprecise, Non-Standard Language</h6>
                                    <div style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #374151; line-height: 1.5;">
                                        "Mild carpal tunnel syndrome in both hands, affecting sensation only. No muscle damage detected. Conservative treatment typically effective."
                                    </div>
                                </div>

                                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 3px solid #16a34a;">
                                    <h6 style="color: #16a34a; margin-bottom: 10px;">✅ Professional EMG Standard</h6>
                                    <div style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #374151; line-height: 1.5;">
                                        "There are electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, bilaterally, affecting sensory fibers in a demyelinating manner."
                                    </div>
                                </div>
                            </div>

                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <h6 style="color: #475569; margin-bottom: 10px;">💡 Why Professional Language Matters</h6>
                                <p style="color: #374151; margin: 0; font-size: 0.9em;">The professional version uses precise terminology that referring physicians expect. It specifies anatomical location, severity, fiber type, and process - providing complete diagnostic information in standard format.</p>
                            </div>
                        </div>

                        <!-- Professional Terminology Guide -->
                        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                            <h5 style="color: #1f2937; margin-bottom: 15px;">🎯 Essential Professional Terminology</h5>
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                                <div style="text-align: center; padding: 15px; background: #fef3c7; border-radius: 8px;">
                                    <h6 style="color: #92400e; margin-bottom: 8px;">Positive Findings</h6>
                                    <div style="font-size: 0.85em; color: #451a03;">
                                        "abnormalities consistent with"<br>
                                        "suggestive of"<br>
                                        "involving sensory/motor fibers"
                                    </div>
                                </div>
                                <div style="text-align: center; padding: 15px; background: #e0f2fe; border-radius: 8px;">
                                    <h6 style="color: #0c4a6e; margin-bottom: 8px;">Severity Language</h6>
                                    <div style="font-size: 0.85em; color: #164e63;">
                                        "involvement appears to be"<br>
                                        "affecting [fiber type]"<br>
                                        "in a [process] manner"
                                    </div>
                                </div>
                                <div style="text-align: center; padding: 15px; background: #f3e8ff; border-radius: 8px;">
                                    <h6 style="color: #6b21a8; margin-bottom: 8px;">Negative Findings</h6>
                                    <div style="font-size: 0.85em; color: #581c87;">
                                        "no electrodiagnostic evidence"<br>
                                        "no denervation noted"<br>
                                        "clinical correlation indicated"
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Standard Report Structure -->
                        <div style="background: white; padding: 20px; border-radius: 12px;">
                            <h5 style="color: #1f2937; margin-bottom: 15px;">📋 Standard EMG Report Structure</h5>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                <p style="color: #374151; margin-bottom: 15px; font-weight: 500;">Follow this proven structure for professional EMG conclusions:</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                    <div>
                                        <h6 style="color: #059669; margin-bottom: 8px;">✅ Required Elements:</h6>
                                        <ul style="color: #047857; font-size: 0.9em; margin: 0; padding-left: 20px;">
                                            <li>1. "Abnormal study" or "Normal study"</li>
                                            <li>2. Primary findings with specific terminology</li>
                                            <li>3. Additional findings if present</li>
                                            <li>4-5. Systematic exclusions</li>
                                            <li>"Thank you for the courtesy of this referral"</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h6 style="color: #dc2626; margin-bottom: 8px;">❌ Common Mistakes:</h6>
                                        <ul style="color: #991b1b; font-size: 0.9em; margin: 0; padding-left: 20px;">
                                            <li>Skipping anatomical precision</li>
                                            <li>Mixing severity systems incorrectly</li>
                                            <li>Using vague severity descriptors</li>
                                            <li>Omitting fiber type and process</li>
                                            <li>Incomplete exclusions</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Severity Classification Module -->
                <div id="severity-module" style="display: none;">
                    <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">⚖️ Accurate CTS Severity Classification</h4>

                        <!-- Core Severity Principles -->
                        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                            <h5 style="color: #1f2937; margin-bottom: 15px;">🎯 Clinical Standard Definitions</h5>

                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                                <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-left: 3px solid #10b981;">
                                    <h6 style="color: #065f46; margin-bottom: 10px; font-weight: 600;">🟢 MILD CTS</h6>
                                    <div style="font-size: 0.85em; color: #047857; line-height: 1.5;">
                                        <strong>Criteria:</strong><br>
                                        • Only sensory involvement<br>
                                        • Normal motor studies<br>
                                        • No denervation on EMG<br><br>
                                        <strong>Language:</strong><br>
                                        "mild, affecting sensory fibers"
                                    </div>
                                </div>

                                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b;">
                                    <h6 style="color: #92400e; margin-bottom: 10px; font-weight: 600;">🟡 MODERATE CTS</h6>
                                    <div style="font-size: 0.85em; color: #451a03; line-height: 1.5;">
                                        <strong>Criteria:</strong><br>
                                        • Motor AND sensory affected<br>
                                        • Motor amplitudes maintained<br>
                                        • No denervation on EMG<br><br>
                                        <strong>Language:</strong><br>
                                        "moderate, affecting sensory and motor fibers"
                                    </div>
                                </div>

                                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 3px solid #dc2626;">
                                    <h6 style="color: #991b1b; margin-bottom: 10px; font-weight: 600;">🔴 SEVERE CTS</h6>
                                    <div style="font-size: 0.85em; color: #7f1d1d; line-height: 1.5;">
                                        <strong>Criteria:</strong><br>
                                        • Denervation on EMG<br>
                                        • Axon loss in motor studies<br>
                                        • Often absent sensory studies<br><br>
                                        <strong>Language:</strong><br>
                                        "severe, with denervation seen in..."
                                    </div>
                                </div>
                            </div>

                            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 3px solid #6366f1;">
                                <h6 style="color: #4338ca; margin-bottom: 10px;">🚨 Critical Distinction</h6>
                                <p style="color: #3730a3; margin: 0; font-size: 0.9em; font-weight: 500;">Motor involvement alone does NOT equal severe. Severe requires denervation + axon loss. Many residents incorrectly classify moderate as severe.</p>
                            </div>
                        </div>

                        <!-- Interactive Classification Trainer -->
                        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                            <h5 style="color: #1f2937; margin-bottom: 15px;">🧠 Classification Practice</h5>

                            <div id="severity-quiz-container">
                                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                    <h6 style="color: #475569; margin-bottom: 10px;">Scenario 1:</h6>
                                    <p style="color: #374151; margin-bottom: 15px; font-family: 'Courier New', monospace; font-size: 0.9em;">
                                        45-year-old female with bilateral hand numbness.<br>
                                        • Median sensory latency: 4.2ms (prolonged)<br>
                                        • Median motor latency: 3.8ms (normal)<br>
                                        • Motor amplitudes: 12mV (normal)<br>
                                        • EMG: No denervation in APB muscles
                                    </p>

                                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                                        <button onclick="checkSeverity('mild', 1)" class="severity-option" style="padding: 10px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 6px; cursor: pointer; font-weight: 500; color: #065f46;">
                                            Mild CTS
                                        </button>
                                        <button onclick="checkSeverity('moderate', 1)" class="severity-option" style="padding: 10px; background: #fef3c7; border: 2px solid #f59e0b; border-radius: 6px; cursor: pointer; font-weight: 500; color: #92400e;">
                                            Moderate CTS
                                        </button>
                                        <button onclick="checkSeverity('severe', 1)" class="severity-option" style="padding: 10px; background: #fef2f2; border: 2px solid #dc2626; border-radius: 6px; cursor: pointer; font-weight: 500; color: #991b1b;">
                                            Severe CTS
                                        </button>
                                    </div>

                                    <div id="severity-feedback-1" style="margin-top: 15px; padding: 10px; border-radius: 6px; display: none;">
                                        <!-- Feedback will be inserted here -->
                                    </div>
                                </div>
                            </div>

                            <button onclick="generateNewSeverityScenario()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                                🎲 Next Scenario
                            </button>
                        </div>

                        <!-- Cubital Tunnel Distinction -->
                        <div style="background: white; padding: 20px; border-radius: 12px;">
                            <h5 style="color: #1f2937; margin-bottom: 15px;">⚡ Important: Cubital Tunnel Has NO Severity Rating</h5>

                            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; border-left: 3px solid #0ea5e9;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div>
                                        <h6 style="color: #0c4a6e; margin-bottom: 10px;">✅ Correct for Cubital Tunnel:</h6>
                                        <div style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #164e63; background: white; padding: 10px; border-radius: 4px;">
                                            "There are electrodiagnostic abnormalities suggestive of an ulnar neuropathy at the level of the elbow consistent with cubital tunnel syndrome."
                                        </div>
                                    </div>
                                    <div>
                                        <h6 style="color: #dc2626; margin-bottom: 10px;">❌ Never Say for Cubital Tunnel:</h6>
                                        <div style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #991b1b; background: #fef2f2; padding: 10px; border-radius: 4px;">
                                            "mild cubital tunnel syndrome"<br>
                                            "moderate ulnar neuropathy"<br>
                                            "severe cubital tunnel"
                                        </div>
                                    </div>
                                </div>
                                <p style="color: #0c4a6e; margin-top: 15px; margin-bottom: 0; font-weight: 500;">Focus on anatomical localization and findings, not severity grading.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Examples Module -->
                <div id="examples-module" style="display: none;">
                    <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.4em;">📚 Clinical Examples Database</h4>
                        <p style="color: #047857; margin-bottom: 20px;">Professional EMG conclusions from real clinical cases - learn the exact language patterns used by experienced neurologists.</p>
                    </div>

                    <!-- Filter Categories -->
                    <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #10b981;">
                        <h5 style="color: #065f46; margin-bottom: 15px;">🔍 Filter by Condition Type</h5>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                            <button onclick="filterExamples('all')" id="filter-all" class="filter-btn active-filter"
                                    style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                                All Examples (39)
                            </button>
                            <button onclick="filterExamples('carpal-tunnel')" id="filter-carpal" class="filter-btn"
                                    style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                                Carpal Tunnel (12)
                            </button>
                            <button onclick="filterExamples('cubital-tunnel')" id="filter-cubital" class="filter-btn"
                                    style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                                Cubital Tunnel (5)
                            </button>
                            <button onclick="filterExamples('normal')" id="filter-normal" class="filter-btn"
                                    style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                                Normal (4)
                            </button>
                            <button onclick="filterExamples('radiculopathy')" id="filter-radiculopathy" class="filter-btn"
                                    style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                                Radiculopathy (8)
                            </button>
                            <button onclick="filterExamples('neuropathy')" id="filter-neuropathy" class="filter-btn"
                                    style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                                Other Neuropathy (6)
                            </button>
                            <button onclick="filterExamples('complex')" id="filter-complex" class="filter-btn"
                                    style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                                Complex Cases (4)
                            </button>
                        </div>
                    </div>

                    <!-- Professional Language Comparison -->
                    <div style="background: #fff7ed; padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #f97316;">
                        <h5 style="color: #9a3412; margin-bottom: 15px;">💡 Professional Language Trainer</h5>
                        <div style="margin-bottom: 15px;">
                            <button onclick="showLanguageComparison()" id="language-trainer-btn"
                                    style="padding: 10px 20px; background: #f97316; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">
                                🎯 Practice Professional Language
                            </button>
                            <button onclick="showTerminologyQuiz()" id="terminology-quiz-btn"
                                    style="padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; margin-left: 10px;">
                                📝 Terminology Quiz
                            </button>
                        </div>
                        <div id="language-training-area" style="display: none;">
                            <!-- Language training content will appear here -->
                        </div>
                    </div>

                    <!-- Examples Grid -->
                    <div id="examples-grid" style="display: grid; gap: 20px;">
                        <!-- Examples will be populated here by JavaScript -->
                    </div>

                    <!-- Detailed Example Modal Trigger -->
                    <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
                        <p style="color: #475569; margin-bottom: 10px; font-size: 0.9em;">Click any example above to see detailed analysis of professional language patterns</p>
                        <button onclick="loadAllExamples()" style="padding: 8px 16px; background: #475569; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                            📊 View Complete Database
                        </button>
                    </div>
                </div>

                <!-- Report Builder Module -->
                <div id="builder-module" style="display: none;">
                    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔧 Interactive Report Builder</h4>
                        <p style="color: #451a03; margin-bottom: 20px;">Coming soon: Step-by-step guided report construction with real clinical cases.</p>
                    </div>
                </div>

                <!-- Writing Coach Module -->
                <div id="coach-module" style="display: none;">
                    <div style="background: linear-gradient(135deg, #e0e7ff, #c7d2fe); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #3730a3; margin-bottom: 20px; font-size: 1.4em;">🎯 AI Writing Coach</h4>
                        <p style="color: #4338ca; margin-bottom: 20px;">Coming soon: Real-time feedback and communication coaching for EMG reports.</p>
                    </div>
                </div>

                <!-- Language Module -->
                <div id="language-module" style="display: none;">
                    <div style="background: linear-gradient(135deg, #e0e7ff, #c7d2fe); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #3730a3; margin-bottom: 20px; font-size: 1.4em;">📝 Professional Language Patterns</h4>

                        <!-- Language Categories -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div style="background: white; padding: 20px; border-radius: 12px;">
                                <h5 style="color: #1e40af; margin-bottom: 15px;">✅ Positive Findings</h5>
                                <div style="font-size: 0.9em; color: #374151; line-height: 1.6;">
                                    <div style="margin-bottom: 8px;">• "consistent with [diagnosis]"</div>
                                    <div style="margin-bottom: 8px;">• "suggestive of [condition]"</div>
                                    <div style="margin-bottom: 8px;">• "Involvement appears to be [mild/moderate/severe]"</div>
                                    <div style="margin-bottom: 8px;">• "affecting [sensory/motor] fibers"</div>
                                    <div style="margin-bottom: 8px;">• "in a [demyelinating/axonal] process"</div>
                                </div>
                            </div>

                            <div style="background: white; padding: 20px; border-radius: 12px;">
                                <h5 style="color: #dc2626; margin-bottom: 15px;">❌ Negative Findings</h5>
                                <div style="font-size: 0.9em; color: #374151; line-height: 1.6;">
                                    <div style="margin-bottom: 8px;">• "There is no electrodiagnostic evidence of..."</div>
                                    <div style="margin-bottom: 8px;">• "No evidence of [condition]"</div>
                                    <div style="margin-bottom: 8px;">• "There is no denervation noted in..."</div>
                                    <div style="margin-bottom: 8px;">• "No electrodiagnostic evidence of..."</div>
                                    <div style="margin-bottom: 8px;">• "Clinical correlation is indicated"</div>
                                </div>
                            </div>
                        </div>

                        <!-- Severity Language -->
                        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                            <h5 style="color: #7c2d12; margin-bottom: 15px;">📊 Severity Descriptors</h5>
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                                <div style="text-align: center; padding: 15px; background: #fef3c7; border-radius: 8px;">
                                    <h6 style="color: #92400e; margin-bottom: 8px;">Mild</h6>
                                    <div style="font-size: 0.85em; color: #451a03;">
                                        "mild involvement"<br>
                                        "affecting sensory fibers"<br>
                                        "no denervation noted"
                                    </div>
                                </div>
                                <div style="text-align: center; padding: 15px; background: #fed7aa; border-radius: 8px;">
                                    <h6 style="color: #9a3412; margin-bottom: 8px;">Moderate</h6>
                                    <div style="font-size: 0.85em; color: #7c2d12;">
                                        "moderate involvement"<br>
                                        "motor slowing across"<br>
                                        "borderline sensory studies"
                                    </div>
                                </div>
                                <div style="text-align: center; padding: 15px; background: #fecaca; border-radius: 8px;">
                                    <h6 style="color: #991b1b; margin-bottom: 8px;">Severe</h6>
                                    <div style="font-size: 0.85em; color: #7f1d1d;">
                                        "severe involvement"<br>
                                        "low motor amplitudes"<br>
                                        "denervation seen in"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Examples Module -->
                <div id="examples-module" style="display: none;">
                    <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px;">
                        <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.4em;">📚 Real Clinical Examples</h4>

                        <!-- Example Categories -->
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                                <button onclick="showExample('normal')" id="normal-btn" class="example-btn"
                                        style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
                                    Normal Study
                                </button>
                                <button onclick="showExample('mild-cts')" id="mild-cts-btn" class="example-btn"
                                        style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">
                                    Mild CTS
                                </button>
                                <button onclick="showExample('severe-cts')" id="severe-cts-btn" class="example-btn"
                                        style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">
                                    Severe CTS
                                </button>
                                <button onclick="showExample('complex')" id="complex-btn" class="example-btn"
                                        style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">
                                    Complex Case
                                </button>
                            </div>
                        </div>

                        <!-- Example Display Area -->
                        <div id="example-display" style="background: white; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
                            <!-- Examples will be loaded here -->
                        </div>
                    </div>
                </div>

                <!-- Practice Module -->
                <div id="practice-module" style="display: none;">
                    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 25px; border-radius: 15px;">
                        <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">✍️ Interactive Report Writing Practice</h4>

                        <!-- Case Scenario -->
                        <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                            <h5 style="color: #92400e; margin-bottom: 15px;">📋 Case Scenario</h5>
                            <div id="practice-scenario" style="color: #374151; line-height: 1.6;">
                                <!-- Scenario will be loaded here -->
                            </div>
                        </div>

                        <!-- Writing Interface -->
                        <div style="background: #f8fafc; padding: 20px; border-radius: 12px;">
                            <h5 style="color: #475569; margin-bottom: 15px;">✏️ Write Your Conclusion</h5>
                            <textarea id="report-textarea"
                                      placeholder="Start with '1. Abnormal study.' or '1. Normal study.' and build your conclusion..."
                                      style="width: 100%; height: 200px; padding: 15px; border: 2px solid #d1d5db; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 0.9em; line-height: 1.6; resize: vertical;"
                                      oninput="validateReport()"></textarea>

                            <!-- Real-time Feedback -->
                            <div id="report-feedback" style="margin-top: 15px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                                <h6 style="color: #065f46; margin-bottom: 10px;">💡 Real-time Feedback</h6>
                                <div id="feedback-content" style="color: #047857; font-size: 0.9em;">
                                    Start typing to get instant feedback on your report structure and language...
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div style="display: flex; gap: 10px; margin-top: 15px;">
                                <button onclick="generateNewScenario()"
                                        style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                                    🎲 New Scenario
                                </button>
                                <button onclick="showExpertExample()"
                                        style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                                    👨‍⚕️ Show Expert Version
                                </button>
                                <button onclick="clearReport()"
                                        style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
                                    🗑️ Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .example-btn:hover {
                    background: #059669 !important;
                    transform: translateY(-1px);
                }

                .quiz-option {
                    display: block;
                    width: 100%;
                    padding: 12px 16px;
                    margin-bottom: 10px;
                    background: white;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 0.9em;
                }

                .quiz-option:hover {
                    border-color: #3b82f6;
                    background: #f0f9ff;
                }

                .quiz-option.correct {
                    background: #dcfce7;
                    border-color: #16a34a;
                    color: #15803d;
                }

                .quiz-option.incorrect {
                    background: #fef2f2;
                    border-color: #dc2626;
                    color: #dc2626;
                }
            </style>

            <script>
                // Initialize the module
                window.currentReportModule = 'structure';
                window.practiceScenarios = [
                    {
                        title: "Bilateral Carpal Tunnel Syndrome",
                        description: "45-year-old female office worker with bilateral hand numbness and tingling, worse at night. NCS shows prolonged median distal latencies bilaterally, worse on right. No denervation on EMG.",
                        expert: "1. Abnormal study.\\n2. There are electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, bilaterally, right slightly worse than left, affecting sensory fibers in a demyelinating process. There is no denervation noted in either APB muscle. Clinical correlation is indicated.\\n3. There is no electrodiagnostic evidence of an ulnar neuropathy or superficial radial sensory neuropathy in either upper extremity.\\n4. There is no electrodiagnostic evidence of a cervical radiculopathy in either upper extremity.\\n\\nThank you for the courtesy of this referral."
                    },
                    {
                        title: "Normal Study",
                        description: "28-year-old male with intermittent hand numbness. All nerve conduction studies within normal limits. EMG shows normal voluntary motor units.",
                        expert: "1. Normal study.\\n2. No electrodiagnostic evidence of median neuropathy, ulnar neuropathy, or superficial radial neuropathy in the left upper extremity.\\n3. No electrodiagnostic evidence of a cervical radiculopathy or plexopathy in the left upper extremity.\\n\\nThank you for the courtesy of this referral."
                    }
                ];

                window.currentScenario = 0;

                // Load initial content with delay to ensure DOM is ready
                setTimeout(() => {
                    if (window.showExample) showExample('normal');
                    if (window.generateNewScenario) generateNewScenario();
                    if (window.updateStructurePreview) updateStructurePreview();
                }, 100);
            </script>
        </div>
    `;
}

function generateClinicalCorrelationContent(module) {
    // Instead of returning HTML, directly call the EMG APP clinical cases system
    console.log('🎯 Clinical Correlation clicked - launching EMG APP interface');

    // Close the current modal first
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }

    // Directly launch the EMG APP clinical cases interface
    setTimeout(() => {
        showClinicalCases('pgy2');
    }, 100);

    // Return placeholder content that won't be shown
    return `<div>Loading EMG APP Clinical Cases...</div>`;
}

function generateLearningContentByType(module, moduleIndex) {
    const contentId = module.contentId || module.id;
    switch(contentId) {
        case 'emg-introduction':
            return generateEMGIntroductionContent(module);
        case 'muscle-quiz':
            return generateMuscleQuizContent(module);
        case 'plexus-anatomy':
            return generatePlexusAnatomyContent(module);
        case 'brachial-plexus-interactive':
            return generateBrachialPlexusInteractiveContent(module);
        case 'radiculopathy-pathophysiology':
            return generateRadiculopathyContent(module);
        case 'neuropathy-pathophysiology':
            return generateNeuropathyContent(module);
        case 'ncs-fundamentals':
            return generateNCSFundamentalsContent(module);
        case 'ncs-techniques':
            return generateNCSBasicTechniquesContent(module);
        case 'emg-needle-localization':
            // Launch the EMG Needle Localization Guide directly
            setTimeout(() => {
                showEMGLocalizationGuide();
            }, 100);
            return `
                <div style="padding: 20px; text-align: center;">
                    <p>🔄 Loading EMG Needle Localization Guide...</p>
                </div>
            `;
        case 'basic-patterns':
            return generateBasicPatternsContent(module);
        case 'report-writing':
        case 'simple-reports':
            return generateReportWritingContent(module);
        case 'clinical-correlation':
            return generateClinicalCorrelationContent(module);
        case 'clinical-cases-system':
            return generateClinicalCasesSystemContent(module);
        case 'neuropathy-myopathy-basics':
            // Launch the Neuropathy vs Myopathy Basics modal directly
            setTimeout(() => {
                neuropathyVsMyopathyBasics();
            }, 100);
            return `
                <div style="padding: 20px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 15px;">🧠</div>
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">Loading Neuropathy vs Myopathy Basics...</h3>
                    <p style="color: #5a6c7d;">Preparing interactive learning module...</p>
                </div>
            `;
        default:
            return generatePlaceholderContent(module);
    }
}

// Generate placeholder content for unknown module types
function generatePlaceholderContent(module) {
    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); padding: 25px; border-radius: 15px; margin-bottom: 25px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 15px;">🔧</div>
                <h3 style="color: #374151; margin-bottom: 15px;">Module Under Development</h3>
                <p style="color: #6b7280; margin: 0;">
                    This module type (${module.type}) is currently being developed.
                    Check back soon for interactive content!
                </p>
            </div>
        </div>
    `;
}

// Complete EMG APP Clinical Cases System - Extracted from EMG APP
function showClinicalCases(pgyLevel) {
    const content = `
        <style>
            /* Enhanced Difficulty Selection Styles - EXACT from EMG APP */
            .difficulty-selector {
                background: linear-gradient(135deg, #6b9f78 0%, #4a6d52 100%);
                padding: 40px;
                border-radius: 20px;
                margin: 30px 0;
                color: white;
                position: relative;
                overflow: hidden;
            }
            .difficulty-selector::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: rotate 20s linear infinite;
            }
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .selector-title {
                text-align: center;
                font-size: 2em;
                margin-bottom: 10px;
                position: relative;
                z-index: 2;
            }
            .selector-subtitle {
                text-align: center;
                margin-bottom: 30px;
                opacity: 0.9;
                position: relative;
                z-index: 2;
            }
            .difficulty-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 25px;
                margin-bottom: 40px;
                position: relative;
                z-index: 2;
            }
            .difficulty-card {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 25px 30px 30px 30px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                overflow: visible;
                text-align: center;
                color: white;
                min-height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .difficulty-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .difficulty-card:hover::before {
                opacity: 1;
            }
            .difficulty-card.active {
                transform: translateY(-10px) scale(1.05);
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border-color: rgba(255, 255, 255, 0.5);
            }
            .difficulty-card.inactive {
                opacity: 0.4;
                transform: scale(0.95);
                filter: grayscale(100%);
            }
            .beginner-card.active {
                background: linear-gradient(135deg, #4ade80, #22c55e);
                box-shadow: 0 20px 40px rgba(34, 197, 94, 0.4);
            }
            .intermediate-card.active {
                background: linear-gradient(135deg, #fb923c, #f97316);
                box-shadow: 0 20px 40px rgba(249, 115, 22, 0.4);
            }
            .difficult-card.active {
                background: linear-gradient(135deg, #f87171, #ef4444);
                box-shadow: 0 20px 40px rgba(239, 68, 68, 0.4);
            }
            .difficulty-card input {
                display: none;
            }
            .card-icon {
                font-size: 48px;
                margin-bottom: 15px;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
                animation: float 3s ease-in-out infinite;
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            .card-title {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .card-subtitle {
                font-size: 14px;
                opacity: 0.9;
                font-weight: 600;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin: 10px 0;
                padding: 5px 0;
                position: relative;
                z-index: 3;
            }
            .status-light {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #4ade80;
                box-shadow: 0 0 15px #4ade80;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            .difficulty-card.inactive .status-light {
                background: #6b7280;
                box-shadow: 0 0 5px #6b7280;
                animation: none;
            }
            .status-text {
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1px;
                color: white;
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                position: relative;
                z-index: 10;
            }
            .difficulty-card.inactive .status-text {
                color: #9ca3af;
                text-shadow: none;
            }
            .card-description {
                font-size: 14px;
                opacity: 0.9;
                line-height: 1.4;
            }
            .action-buttons {
                display: flex;
                gap: 20px;
                justify-content: center;
                flex-wrap: wrap;
                position: relative;
                z-index: 2;
            }
            .primary-action-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 18px 36px;
                border-radius: 50px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
                position: relative;
                overflow: hidden;
            }
            .secondary-action-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 16px 34px;
                border-radius: 50px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }
            .primary-action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(5, 150, 105, 0.4);
            }
            .secondary-action-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }

            /* Case Selection Interface */
            .case-selection-section {
                background: #fff;
                border-radius: 15px;
                padding: 30px;
                margin-top: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .section-header h3 {
                color: #2c3e50;
                margin-bottom: 10px;
            }
            .case-controls {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            .control-btn {
                background: #6b9f78;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            .control-btn:hover {
                background: #4a6d52;
                transform: translateY(-1px);
            }
            .case-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
            }
            .case-item {
                background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            .case-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                border-color: #6b9f78;
            }
            .case-item.selected {
                background: linear-gradient(135deg, #ecfdf5, #d1fae5);
                border-color: #10b981;
            }
            .case-title {
                font-weight: 600;
                color: #2c3e50;
                margin-bottom: 5px;
            }
            .case-difficulty {
                font-size: 12px;
                padding: 2px 8px;
                border-radius: 10px;
                color: white;
                display: inline-block;
                margin-bottom: 8px;
            }
            .difficulty-beginner { background: #22c55e; }
            .difficulty-intermediate { background: #f97316; }
            .difficulty-difficult { background: #ef4444; }
            .case-preview {
                font-size: 13px;
                color: #6b7280;
                line-height: 1.3;
            }

            /* Case Interface Styles */
            .case-interface {
                background: #fff;
                border-radius: 15px;
                padding: 30px;
                margin: 20px 0;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .case-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e2e8f0;
            }
            .case-title-main {
                font-size: 24px;
                color: #2c3e50;
                margin-bottom: 10px;
                font-weight: 700;
            }
            .case-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .info-section {
                background: #f8fafc;
                padding: 20px;
                border-radius: 10px;
                border-left: 4px solid #6b9f78;
            }
            .info-section h4 {
                color: #2c3e50;
                margin-bottom: 10px;
                font-size: 16px;
            }
            .differential-section {
                background: #fff7ed;
                border: 2px solid #fed7aa;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
            }
            .differential-section h4 {
                color: #c2410c;
                margin-bottom: 15px;
            }
            .differential-input {
                width: 100%;
                padding: 10px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 14px;
                margin-bottom: 10px;
                transition: border-color 0.3s ease;
            }
            .differential-input:focus {
                outline: none;
                border-color: #6b9f78;
            }
            .diagnosis-section {
                background: #f0f9ff;
                border: 2px solid #bae6fd;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
            }
            .diagnosis-section h4 {
                color: #0c4a6e;
                margin-bottom: 15px;
            }
            .feedback-section {
                margin-top: 20px;
                padding: 15px;
                border-radius: 8px;
                display: none;
            }
            .feedback-correct {
                background: #f0fdf4;
                border: 2px solid #bbf7d0;
                color: #166534;
            }
            .feedback-partial {
                background: #fef3c7;
                border: 2px solid #fde68a;
                color: #92400e;
            }
            .feedback-incorrect {
                background: #fef2f2;
                border: 2px solid #fecaca;
                color: #991b1b;
            }
            .case-navigation {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e2e8f0;
            }
            .nav-btn {
                background: #6b9f78;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .nav-btn:hover {
                background: #4a6d52;
                transform: translateY(-1px);
            }
            .nav-btn:disabled {
                background: #9ca3af;
                cursor: not-allowed;
                transform: none;
            }
        </style>

        <div class="difficulty-selector">
            <h3 class="selector-title">⚡ Choose Your Challenge Level</h3>
            <p class="selector-subtitle">Select which difficulty levels you want to practice with</p>

            <div class="difficulty-cards">
                <div class="difficulty-card beginner-card active" id="beginner-toggle" onclick="toggleDifficulty('beginner')">
                    <input type="checkbox" id="beginner-checkbox" checked>
                    <div class="card-icon">🌱</div>
                    <div class="card-title">Beginner</div>
                    <div class="card-subtitle">Learning the Basics</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Perfect for residents starting their EMG/NCS journey</div>
                </div>

                <div class="difficulty-card intermediate-card active" id="intermediate-toggle" onclick="toggleDifficulty('intermediate')">
                    <input type="checkbox" id="intermediate-checkbox" checked>
                    <div class="card-icon">🔥</div>
                    <div class="card-title">Intermediate</div>
                    <div class="card-subtitle">Building Skills</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Ready for more complex diagnostic challenges</div>
                </div>

                <div class="difficulty-card difficult-card active" id="difficult-toggle" onclick="toggleDifficulty('difficult')">
                    <input type="checkbox" id="difficult-checkbox" checked>
                    <div class="card-icon">💎</div>
                    <div class="card-title">Expert</div>
                    <div class="card-subtitle">Master Level</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Advanced cases that challenge even experts</div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="primary-action-btn" onclick="startRandomCaseByDifficulty()">
                    🎲 Start Practice Session
                </button>
                <button class="secondary-action-btn" onclick="showCaseSelection()">
                    🎯 Choose Specific Cases
                </button>
            </div>
        </div>

        <!-- Case Selection Section (Hidden by default) -->
        <div class="case-selection-section" id="case-selection-section" style="display: none;">
            <div class="section-header">
                <h3>🎯 Select Your Cases</h3>
                <p>Choose specific scenarios to practice</p>
            </div>

            <div class="case-controls">
                <button class="control-btn" onclick="selectAllCases()">✓ Select All</button>
                <button class="control-btn" onclick="deselectAllCases()">✗ Clear All</button>
                <button class="control-btn" onclick="startSelectedCases()">🚀 Start Selected Cases</button>
                <button class="control-btn" onclick="hideCaseSelection()">← Back to Difficulty Selection</button>
            </div>

            <div class="case-grid" id="case-grid">
                <!-- Cases will be populated here -->
            </div>
        </div>

        <!-- Case Interface (Hidden by default) -->
        <div class="case-interface" id="case-interface" style="display: none;">
            <!-- Case content will be populated here -->
        </div>
    `;

    showModal('⚡ Choose Your Challenge Level', content);
}

// Wrapper function for compatibility - OVERRIDE OLD SYSTEM
function showClinicalCasesModal(pgyLevel, difficulty) {
    console.log('🎯 DEBUG: EMG APP showClinicalCasesModal called with:', { pgyLevel, difficulty });
    console.log('🚀 Using EMG APP design instead of old system');
    showClinicalCases(pgyLevel);
}

// Unlock Prompt Function - EXACT COPY from working system
function showUnlockPrompt(level, requiredPGY) {
    const levelNames = {
        'intermediate': 'Intermediate',
        'expert': 'Expert'
    };

    const content = `
        <div style="text-align: center;">
            <div style="font-size: 60px; margin-bottom: 20px;">🔓</div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Unlock ${levelNames[level]} Cases?</h3>
            <p style="color: #5a6c7d; margin-bottom: 25px;">
                These cases are designed for ${requiredPGY.toUpperCase()} residents, but you can access them if you'd like extra challenge.
            </p>
            <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                <p style="color: #92400e; margin: 0; font-weight: 600;">
                    ⚠️ "Proceed at your own risk!"
                </p>
                <p style="color: #b45309; margin: 5px 0 0 0; font-size: 14px;">
                    These cases may contain concepts you haven't learned yet.
                </p>
            </div>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button onclick="closeGeneralModal()"
                        style="background: #9ca3af; color: white; border: none; padding: 10px 20px;
                               border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Cancel
                </button>
                <button onclick="closeGeneralModal(); ${level === 'intermediate' ? 'startIntermediateCases()' : 'startExpertCases()'};"
                        style="background: #ef4444; color: white; border: none; padding: 10px 20px;
                               border-radius: 8px; cursor: pointer; font-weight: 600;">
                    🚀 Unlock & Continue
                </button>
            </div>
        </div>
    `;

    showModal('🔓 Unlock Cases', content);
}

// Neuropathy vs Myopathy Basics Modal
function neuropathyVsMyopathyBasics() {
    const content = `
        <div style="max-width: 1000px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #2c3e50; margin-bottom: 10px;">🧠 Neuropathy vs Myopathy Basics</h2>
                <p style="color: #5a6c7d; font-size: 16px;">Understanding EMG and NCS patterns in muscle and nerve disorders</p>
            </div>

            <!-- Tab Navigation -->
            <div style="display: flex; margin-bottom: 20px; background: #f8f9fa; border-radius: 10px; padding: 5px;">
                <button id="myopathy-tab" onclick="showMyopathyTab()"
                        style="flex: 1; padding: 12px; border: none; background: #007bff; color: white;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">
                    🔬 Myopathy Patterns
                </button>
                <button id="neuropathy-tab" onclick="showNeuropathyTab()"
                        style="flex: 1; padding: 12px; border: none; background: #e9ecef; color: #6c757d;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; margin-left: 5px;">
                    ⚡ Neuropathy Patterns
                </button>
                <button id="comparison-tab" onclick="showComparisonTab()"
                        style="flex: 1; padding: 12px; border: none; background: #e9ecef; color: #6c757d;
                               border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; margin-left: 5px;">
                    📊 Side-by-Side
                </button>
            </div>

            <!-- Tab Content -->
            <div id="tab-content">
                ${getMyopathyContent()}
            </div>
        </div>
    `;

    showModal('🧠 Neuropathy vs Myopathy Basics', content);
}

function getMyopathyContent() {
    return `
        <div style="background: linear-gradient(135deg, #e3f2fd, #f3e5f5); padding: 25px; border-radius: 15px;">
            <h3 style="color: #1565c0; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 10px;">🔬</span>
                Myopathy: EMG & NCS Patterns
            </h3>

            <!-- Definition and Pathophysiology -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #9c27b0;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🧬 What is Myopathy?</h4>
                <p style="color: #495057; margin-bottom: 15px; line-height: 1.6;">
                    <strong>Myopathy</strong> refers to diseases of muscle tissue where the primary pathology affects the muscle fibers themselves,
                    not the nerves that innervate them. The disorder involves dysfunction of the muscle cell membrane, contractile proteins,
                    or cellular metabolism.
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #6f42c1; margin-bottom: 10px;">Common Causes</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Inflammatory:</strong> Polymyositis, dermatomyositis</li>
                            <li><strong>Metabolic:</strong> Thyroid disorders, steroid myopathy</li>
                            <li><strong>Genetic:</strong> Muscular dystrophies</li>
                            <li><strong>Toxic:</strong> Statins, alcohol</li>
                            <li><strong>Infectious:</strong> Viral myositis</li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #6f42c1; margin-bottom: 10px;">Typical Symptoms</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Proximal weakness</strong> (shoulders, hips)</li>
                            <li><strong>Symmetric</strong> muscle involvement</li>
                            <li><strong>No sensory symptoms</strong></li>
                            <li><strong>Muscle pain/tenderness</strong> (inflammatory)</li>
                            <li><strong>Difficulty climbing stairs</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Key EMG Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #1565c0;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📈 Classic EMG Findings</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #dc3545; margin-bottom: 10px;">MUAP Characteristics</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>Short duration</strong> (↓)</li>
                            <li><strong>Small amplitude</strong> (↓)</li>
                            <li><strong>Polyphasic</strong> (>5 phases)</li>
                            <li><strong>Early recruitment</strong></li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #28a745; margin-bottom: 10px;">Recruitment Pattern</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>Early/rapid recruitment</strong></li>
                            <li><strong>Full interference pattern</strong></li>
                            <li><strong>Low amplitude</strong></li>
                            <li><strong>Normal firing frequency</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- NCS Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #28a745;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">⚡ NCS Findings</h4>
                <div style="background: #d4edda; padding: 15px; border-radius: 8px;">
                    <p style="margin: 0; color: #155724; font-weight: 600;">
                        ✅ <strong>Usually Normal</strong> - Nerves are intact in pure myopathy
                    </p>
                    <p style="margin: 10px 0 0 0; color: #155724; font-size: 14px;">
                        Exception: Very severe myopathy may show reduced CMAP amplitude
                    </p>
                </div>
            </div>

            <!-- Specific Myopathy Types -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🎯 Specific Myopathy Patterns</h4>

                <div style="margin-bottom: 15px;">
                    <div style="background: #fff3cd; padding: 12px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <h5 style="color: #856404; margin: 0 0 8px 0;">Inflammatory Myopathy</h5>
                        <p style="margin: 0; color: #856404; font-size: 14px;">
                            <strong>Spontaneous Activity:</strong> Fibrillations, positive sharp waves, complex repetitive discharges
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #f8d7da; padding: 12px; border-radius: 8px; border-left: 4px solid #dc3545;">
                        <h5 style="color: #721c24; margin: 0 0 8px 0;">Inclusion Body Myositis</h5>
                        <p style="margin: 0; color: #721c24; font-size: 14px;">
                            <strong>Mixed Pattern:</strong> Both myopathic and neurogenic features (long-duration MUAPs)
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #d1ecf1; padding: 12px; border-radius: 8px; border-left: 4px solid #17a2b8;">
                        <h5 style="color: #0c5460; margin: 0 0 8px 0;">Steroid Myopathy</h5>
                        <p style="margin: 0; color: #0c5460; font-size: 14px;">
                            <strong>Type II Fiber:</strong> Affects fast-twitch fibers, may have minimal EMG changes
                        </p>
                    </div>
                </div>
            </div>

            <!-- Clinical Correlation -->
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 20px; border-radius: 10px; color: white;">
                <h4 style="margin-bottom: 15px;">🩺 Clinical Correlation</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <h5 style="margin-bottom: 10px;">Typical Presentation:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Proximal weakness</li>
                            <li>Preserved reflexes (early)</li>
                            <li>No sensory loss</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 10px;">EMG Strategy:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Sample proximal muscles</li>
                            <li>Look for spontaneous activity</li>
                            <li>Assess MUAP morphology</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getNeuropathyContent() {
    return `
        <div style="background: linear-gradient(135deg, #fff3e0, #ffecb3); padding: 25px; border-radius: 15px;">
            <h3 style="color: #f57c00; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 10px;">⚡</span>
                Neuropathy: EMG & NCS Patterns
            </h3>

            <!-- Definition and Pathophysiology -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #ff9800;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">⚡ What is Neuropathy?</h4>
                <p style="color: #495057; margin-bottom: 15px; line-height: 1.6;">
                    <strong>Neuropathy</strong> refers to disorders affecting peripheral nerves, including motor, sensory, and autonomic fibers.
                    The pathology can involve <strong>axonal damage</strong> (affecting the nerve fiber itself) or <strong>demyelination</strong>
                    (affecting the myelin sheath that insulates the nerve).
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #e65100; margin-bottom: 10px;">Common Causes</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Metabolic:</strong> Diabetes (most common)</li>
                            <li><strong>Autoimmune:</strong> CIDP, Guillain-Barré</li>
                            <li><strong>Toxic:</strong> Chemotherapy, alcohol</li>
                            <li><strong>Compression:</strong> Carpal tunnel, cubital tunnel</li>
                            <li><strong>Hereditary:</strong> CMT, HNPP</li>
                            <li><strong>Infectious:</strong> HIV, Lyme disease</li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #e65100; margin-bottom: 10px;">Typical Symptoms</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057; font-size: 14px;">
                            <li><strong>Distal weakness</strong> (hands, feet)</li>
                            <li><strong>Sensory symptoms</strong> (numbness, tingling)</li>
                            <li><strong>Length-dependent</strong> pattern</li>
                            <li><strong>Reduced/absent reflexes</strong></li>
                            <li><strong>Burning pain</strong> (small fiber)</li>
                            <li><strong>"Stocking-glove"</strong> distribution</li>
                        </ul>
                    </div>
                </div>

                <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <h5 style="color: #e65100; margin-bottom: 10px;">🔬 Pathophysiology Types</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <strong style="color: #d84315;">Axonal:</strong> Nerve fiber damage → ↓ amplitude, normal velocity
                        </div>
                        <div>
                            <strong style="color: #d84315;">Demyelinating:</strong> Myelin damage → ↓ velocity, ↑ latency
                        </div>
                    </div>
                </div>
            </div>

            <!-- NCS Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #f57c00;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📊 Primary NCS Abnormalities</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #dc3545; margin-bottom: 10px;">Axonal Pattern</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>↓ Amplitude</strong> (CMAP/SNAP)</li>
                            <li><strong>Normal velocity</strong></li>
                            <li><strong>Normal latency</strong></li>
                            <li><strong>Length-dependent</strong></li>
                        </ul>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h5 style="color: #28a745; margin-bottom: 10px;">Demyelinating Pattern</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #495057;">
                            <li><strong>↓ Velocity</strong> (CV)</li>
                            <li><strong>↑ Latency</strong></li>
                            <li><strong>Conduction block</strong></li>
                            <li><strong>Temporal dispersion</strong></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- EMG Findings -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 5px solid #28a745;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📈 EMG Changes (Chronic)</h4>
                <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                    <h5 style="color: #2e7d32; margin-bottom: 10px;">Neurogenic Pattern</h5>
                    <ul style="margin: 0; padding-left: 20px; color: #2e7d32;">
                        <li><strong>Large amplitude</strong> MUAPs (reinnervation)</li>
                        <li><strong>Long duration</strong> MUAPs</li>
                        <li><strong>Reduced recruitment</strong></li>
                        <li><strong>High firing frequency</strong></li>
                        <li><strong>Fibrillations/PSWs</strong> (denervation)</li>
                    </ul>
                </div>
            </div>

            <!-- Common Neuropathy Types -->
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">🎯 Common Neuropathy Patterns</h4>

                <div style="margin-bottom: 15px;">
                    <div style="background: #fff3cd; padding: 12px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <h5 style="color: #856404; margin: 0 0 8px 0;">Diabetic Polyneuropathy</h5>
                        <p style="margin: 0; color: #856404; font-size: 14px;">
                            <strong>Distal, symmetric, length-dependent</strong> - Sensory > Motor, Axonal pattern
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #f8d7da; padding: 12px; border-radius: 8px; border-left: 4px solid #dc3545;">
                        <h5 style="color: #721c24; margin: 0 0 8px 0;">Carpal Tunnel Syndrome</h5>
                        <p style="margin: 0; color: #721c24; font-size: 14px;">
                            <strong>Focal demyelinating</strong> - Prolonged median distal latencies, normal ulnar
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="background: #d1ecf1; padding: 12px; border-radius: 8px; border-left: 4px solid #17a2b8;">
                        <h5 style="color: #0c5460; margin: 0 0 8px 0;">CIDP</h5>
                        <p style="margin: 0; color: #0c5460; font-size: 14px;">
                            <strong>Acquired demyelinating</strong> - Multifocal conduction blocks, prolonged F-waves
                        </p>
                    </div>
                </div>
            </div>

            <!-- Clinical Correlation -->
            <div style="background: linear-gradient(135deg, #ff9800, #ff5722); padding: 20px; border-radius: 10px; color: white;">
                <h4 style="margin-bottom: 15px;">🩺 Clinical Correlation</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <h5 style="margin-bottom: 10px;">Typical Presentation:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Distal weakness (usually)</li>
                            <li>Sensory symptoms</li>
                            <li>Reduced/absent reflexes</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 10px;">NCS Strategy:</h5>
                        <ul style="margin: 0; padding-left: 20px;">
                            <li>Multiple nerves</li>
                            <li>Distal and proximal sites</li>
                            <li>F-waves and H-reflexes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getComparisonContent() {
    return `
        <div style="background: linear-gradient(135deg, #f3e5f5, #e8eaf6); padding: 25px; border-radius: 15px;">
            <h3 style="color: #673ab7; margin-bottom: 20px; display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 10px;">📊</span>
                Side-by-Side Comparison
            </h3>

            <!-- Comparison Table -->
            <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #673ab7, #3f51b5);">
                            <th style="padding: 15px; color: white; text-align: left; border-right: 1px solid rgba(255,255,255,0.2);">Parameter</th>
                            <th style="padding: 15px; color: white; text-align: center; border-right: 1px solid rgba(255,255,255,0.2);">🔬 Myopathy</th>
                            <th style="padding: 15px; color: white; text-align: center;">⚡ Neuropathy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">NCS Findings</td>
                            <td style="padding: 12px; text-align: center; color: #28a745;">✅ Usually Normal</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">❌ Abnormal</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">MUAP Duration</td>
                            <td style="padding: 12px; text-align: center; color: #007bff;">⬇️ Short</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">⬆️ Long (chronic)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">MUAP Amplitude</td>
                            <td style="padding: 12px; text-align: center; color: #007bff;">⬇️ Small</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">⬆️ Large (chronic)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Recruitment</td>
                            <td style="padding: 12px; text-align: center; color: #28a745;">⚡ Early/Full</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">🔽 Reduced</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Firing Frequency</td>
                            <td style="padding: 12px; text-align: center; color: #6c757d;">➡️ Normal</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">⬆️ High</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Weakness Pattern</td>
                            <td style="padding: 12px; text-align: center; color: #007bff;">🏠 Proximal</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">👣 Distal (usually)</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: 600; background: #f8f9fa;">Sensory Loss</td>
                            <td style="padding: 12px; text-align: center; color: #28a745;">❌ Absent</td>
                            <td style="padding: 12px; text-align: center; color: #dc3545;">✅ Present (usually)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Key Learning Points -->
            <div style="margin-top: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="background: linear-gradient(135deg, #e3f2fd, #f3e5f5); padding: 20px; border-radius: 10px;">
                    <h4 style="color: #1565c0; margin-bottom: 15px;">🎯 Quick Diagnosis Tips</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #2c3e50;">
                        <li><strong>Normal NCS + Proximal weakness</strong> → Think Myopathy</li>
                        <li><strong>Abnormal NCS + Distal weakness</strong> → Think Neuropathy</li>
                        <li><strong>Mixed pattern</strong> → Consider inclusion body myositis</li>
                    </ul>
                </div>

                <div style="background: linear-gradient(135deg, #fff3e0, #ffecb3); padding: 20px; border-radius: 10px;">
                    <h4 style="color: #f57c00; margin-bottom: 15px;">⚠️ Important Exceptions</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #2c3e50;">
                        <li><strong>Severe myopathy</strong> → May have ↓ CMAP</li>
                        <li><strong>Early neuropathy</strong> → May have normal EMG</li>
                        <li><strong>Motor neuron disease</strong> → Normal NCS, neurogenic EMG</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Tab switching functions
function showMyopathyTab() {
    // Update tab styling
    document.getElementById('myopathy-tab').style.background = '#007bff';
    document.getElementById('myopathy-tab').style.color = 'white';
    document.getElementById('neuropathy-tab').style.background = '#e9ecef';
    document.getElementById('neuropathy-tab').style.color = '#6c757d';
    document.getElementById('comparison-tab').style.background = '#e9ecef';
    document.getElementById('comparison-tab').style.color = '#6c757d';

    // Update content
    document.getElementById('tab-content').innerHTML = getMyopathyContent();
}

function showNeuropathyTab() {
    // Update tab styling
    document.getElementById('myopathy-tab').style.background = '#e9ecef';
    document.getElementById('myopathy-tab').style.color = '#6c757d';
    document.getElementById('neuropathy-tab').style.background = '#007bff';
    document.getElementById('neuropathy-tab').style.color = 'white';
    document.getElementById('comparison-tab').style.background = '#e9ecef';
    document.getElementById('comparison-tab').style.color = '#6c757d';

    // Update content
    document.getElementById('tab-content').innerHTML = getNeuropathyContent();
}

function showComparisonTab() {
    // Update tab styling
    document.getElementById('myopathy-tab').style.background = '#e9ecef';
    document.getElementById('myopathy-tab').style.color = '#6c757d';
    document.getElementById('neuropathy-tab').style.background = '#e9ecef';
    document.getElementById('neuropathy-tab').style.color = '#6c757d';
    document.getElementById('comparison-tab').style.background = '#007bff';
    document.getElementById('comparison-tab').style.color = 'white';

    // Update content
    document.getElementById('tab-content').innerHTML = getComparisonContent();
}

// Complete EMG APP Case Database - Extracted from EMG APP
// DISABLED: caseDatabase now provided by emg-app-complete-system.js to avoid duplicate variable error
/*
const caseDatabase = {
    'hand14': {
        title: "Hand Numbness/Tingling (Digits 1-4)",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Administrative Assistant",
            chiefComplaint: "3-month history of numbness and tingling in thumb, index, and middle fingers, worse at night",
            history: "Symptoms wake her up at night, shaking hands provides relief. Occasional thenar weakness when gripping objects. No neck pain or trauma. Uses computer 8+ hours daily.",
            pmh: "Hypothyroidism, well-controlled",
            medications: "Levothyroxine"
        },
        physicalExam: {
            inspection: "Mild thenar atrophy",
            palpation: "Tenderness over carpal tunnel",
            rom: "Full ROM at wrist and fingers",
            strength: "Thenar muscles 4/5, other hand muscles normal",
            sensation: "Decreased sensation in median nerve distribution",
            reflexes: "Normal throughout",
            specialTests: "Positive Tinel's and Phalen's signs"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Dorsal ulnar Anti Sensory (Dorsum 5th MC)",
                    nr: "2.5",
                    peak: "64.2",
                    normPeak: "-10",
                    fpAmp: "41.0",
                    normFP: "",
                    site1: "Wrist",
                    site2: "Dorsum 5th MC",
                    deltaP: "1.9",
                    dist: "8.0",
                    vel: "42",
                    normVel: ""
                },
                {
                    site: "Right Dorsal ulnar Anti Sensory (Dorsum 5th MC)",
                    nr: "2.5",
                    peak: "",
                    normPeak: "-10",
                    fpAmp: "",
                    normFP: "",
                    site1: "Wrist",
                    site2: "Dorsum 5th MC",
                    deltaP: "1.9",
                    dist: "8.0",
                    vel: "42",
                    normVel: ""
                },
                {
                    site: "Left Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "64.2",
                    normPeak: "-10",
                    fpAmp: "41.0",
                    normFP: "",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "3.1",
                    dist: "14.0",
                    vel: "42",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "4.8",
                    normPeak: "<3.7",
                    fpAmp: "9.2",
                    normFP: ">20",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "5.1",
                    dist: "14.0",
                    vel: "28",
                    normVel: ">39"
                },
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.4",
                    fpAmp: "42.8",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.4",
                    fpAmp: "36.5",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                }
            ],
            motorSummary: [
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "9.4",
                    normOnset: ">5",
                    fpAmp: "4.23",
                    normFP: "",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.9",
                    dist: "22.0",
                    vel: "56",
                    normVel: ">50"
                },
                {
                    site: "Elbow",
                    nr: "",
                    onset: "8.2",
                    normOnset: "",
                    fpAmp: "4.69",
                    normFP: "",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "",
                    dist: "",
                    vel: "",
                    normVel: ""
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "5.8",
                    normOnset: "<4.4",
                    fpAmp: "3.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.9",
                    dist: "22.0",
                    vel: "64",
                    normVel: ">50"
                },
                {
                    site: "Elbow",
                    nr: "",
                    onset: "8.5",
                    normOnset: "",
                    fpAmp: "5.08",
                    normFP: "",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "",
                    dist: "",
                    vel: "",
                    normVel: ""
                },
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<3.3",
                    fpAmp: "9.16",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.8",
                    dist: "23.0",
                    vel: "61",
                    normVel: ">51"
                },
                {
                    site: "B Elbow",
                    nr: "6.0",
                    onset: "9.1",
                    normOnset: "",
                    fpAmp: "5.44",
                    normFP: "",
                    neg: "A Elbow",
                    site1: "B Elbow",
                    site2: "",
                    deltaP: "2.4",
                    dist: "10.0",
                    vel: "42",
                    normVel: ">51"
                },
                {
                    site: "A Elbow",
                    nr: "8.0",
                    onset: "9.1",
                    normOnset: "",
                    fpAmp: "5.94",
                    normFP: "",
                    neg: "",
                    site1: "A Elbow",
                    site2: "",
                    deltaP: "",
                    dist: "",
                    vel: "",
                    normVel: ""
                }
            ]
        },
        emgStudies: {
            comparisonSummary: [
                {
                    site: "Left Median/Radial Comparison (Digit 1)",
                    nr: "2.5",
                    peak: "88.4",
                    fpAmp: "",
                    site1: "Median",
                    site2: "Radial",
                    deltaP: "0.5"
                },
                {
                    site: "Radial",
                    nr: "3.0",
                    peak: "27.8",
                    fpAmp: "",
                    site1: "",
                    site2: "",
                    deltaP: ""
                },
                {
                    site: "Right Median/Radial Comparison (Digit 1)",
                    nr: "2.5",
                    peak: "103.0",
                    fpAmp: "",
                    site1: "Median",
                    site2: "Radial",
                    deltaP: "0.4"
                },
                {
                    site: "Radial",
                    nr: "2.9",
                    peak: "23.0",
                    fpAmp: "",
                    site1: "",
                    site2: "",
                    deltaP: ""
                }
            ],
            needleExamination: [
                {
                    side: "Right",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "1st Dorsal",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "Extindicts",
                    nerve: "Radial (Post Int)",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "1st Dorsal",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "Extindicts",
                    nerve: "Radial (Post Int)",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Carpal Tunnel Syndrome (Median Neuropathy at Wrist)",
        differentialDiagnosis: [
            "Carpal tunnel syndrome",
            "Cervical radiculopathy",
            "Pronator teres syndrome",
            "Thoracic outlet syndrome"
        ],
        explanation: "Classic carpal tunnel syndrome with median nerve compression at the wrist. Night symptoms, Tinel's/Phalen's signs, and electrodiagnostic findings confirm diagnosis."
    },
    'fibromyalgia': {
        title: "Widespread Pain and Fatigue",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Office Manager",
            chiefCompliant: "6-month history of widespread muscle pain, fatigue, and tingling in hands",
            history: "Gradual onset of widespread muscle and joint pain, fatigue, and sleep disturbances. Reports tingling in hands that led to EMG referral. No weakness or muscle atrophy. Pain worse with stress and weather changes.",
            pmh: "Depression, irritable bowel syndrome",
            medications: "Sertraline, gabapentin"
        },
        physicalExam: {
            inspection: "No visible atrophy or fasciculations",
            palpation: "Multiple tender points at neck, shoulders, back, hips",
            rom: "Full ROM but limited by pain",
            strength: "5/5 strength throughout (limited by effort due to pain)",
            sensation: "Normal objective sensation, subjective numbness in hands",
            reflexes: "2+ and symmetric throughout",
            specialTests: "Positive tender points (>11/18), negative Tinel's/Phalen's"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "3.2",
                    normPeak: "<3.7",
                    fpAmp: "48.5",
                    normFP: ">20",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.8",
                    dist: "14.0",
                    vel: "50",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.7",
                    fpAmp: "52.3",
                    normFP: ">20",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">39"
                },
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.4",
                    fpAmp: "44.8",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.6",
                    dist: "14.0",
                    vel: "54",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "2.9",
                    normPeak: "<3.4",
                    fpAmp: "47.2",
                    normFP: ">17",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.7",
                    dist: "14.0",
                    vel: "52",
                    normVel: ">38"
                }
            ],
            motorSummary: [
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.2",
                    normOnset: "<4.4",
                    fpAmp: "8.5",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.1",
                    dist: "22.0",
                    vel: "71",
                    normVel: ">50"
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.4",
                    normOnset: "<4.4",
                    fpAmp: "9.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.0",
                    dist: "22.0",
                    vel: "73",
                    normVel: ">50"
                },
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<3.3",
                    fpAmp: "10.8",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.8",
                    dist: "23.0",
                    vel: "82",
                    normVel: ">51"
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.0",
                    normOnset: "<3.3",
                    fpAmp: "11.2",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.9",
                    dist: "23.0",
                    vel: "79",
                    normVel: ">51"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Right",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "1st Dorsal",
                    nerve: "Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Right",
                    muscle: "Deltoid",
                    nerve: "Axillary",
                    root: "C5-6",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                },
                {
                    side: "Left",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: ""
                }
            ]
        },
        requiresEMG: false,
        emgIndication: "NOT INDICATED",
        difficulty: "beginner",
        correctDiagnosis: "Fibromyalgia - EMG NOT INDICATED",
        differentialDiagnosis: [
            "Fibromyalgia",
            "Myofascial pain syndrome",
            "Chronic fatigue syndrome",
            "Inflammatory myopathy"
        ],
        explanation: "Fibromyalgia is a central pain disorder with normal peripheral nervous system. EMG/NCS are normal and not indicated unless there are objective neurological findings."
    },
    'ulnarwristcompression': {
        title: "Hand Weakness After Wrist Injury",
        presentation: {
            age: 29,
            gender: "Male",
            occupation: "Rock Climber",
            chiefCompliant: "Hand weakness and numbness after fall while rock climbing 4 weeks ago",
            history: "Fell while climbing 4 weeks ago, landed on outstretched hands. Initially focused on wrist pain, but developed progressive weakness and numbness in ring and little fingers.",
            pmh: "Previous wrist injuries from climbing",
            medications: "Ibuprofen, wrist bracing"
        },
        physicalExam: {
            inspection: "Mild hypothenar atrophy, well-healed abrasions on palm",
            palpation: "Tenderness over Guyon's canal and pisiform bone",
            rom: "Full ROM at wrist and fingers",
            strength: "Hypothenar muscles 3/5, interossei normal (5/5), FCU normal",
            sensation: "Decreased sensation in little finger and ulnar half ring finger",
            reflexes: "Normal throughout",
            specialTests: "Positive Tinel's at Guyon's canal, negative at elbow"
        },
        ncsStudies: [
            {
                name: "Ulnar Motor (ADM)",
                result: "abnormal",
                findings: "Prolonged distal latency (4.8ms), reduced amplitude",
                interpretation: "Deep motor branch ulnar neuropathy at wrist"
            },
            {
                name: "Ulnar Sensory (digit 5)",
                result: "abnormal",
                findings: "Prolonged latency, reduced amplitude",
                interpretation: "Superficial sensory branch involvement"
            },
            {
                name: "Dorsal ulnar cutaneous",
                result: "normal",
                findings: "Normal response",
                interpretation: "Branches proximal to Guyon's canal spared"
            }
        ],
        emgStudies: [
            {
                muscle: "Abductor digiti minimi",
                findings: "Denervation changes with reduced recruitment",
                interpretation: "Deep motor branch involvement"
            },
            {
                muscle: "Flexor carpi ulnaris",
                findings: "Normal",
                interpretation: "Proximal ulnar nerve intact"
            }
        ],
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal - Type I (Mixed Motor and Sensory)",
        differentialDiagnosis: [
            "Ulnar neuropathy at Guyon's canal",
            "Ulnar neuropathy at elbow",
            "C8 radiculopathy",
            "Brachial plexopathy"
        ],
        explanation: "Ulnar nerve compression at Guyon's canal affecting both superficial sensory and deep motor branches. Spares dorsal ulnar cutaneous nerve which branches above wrist."
    },
    'footdrop': {
        title: "Foot Drop/Dorsiflexor Weakness",
        presentation: {
            age: 28,
            gender: "Male",
            occupation: "Construction Worker",
            chiefComplaint: "2-week history of inability to lift right foot, frequent tripping",
            history: "Gradual onset after prolonged squatting while laying tile. No back pain. No numbness initially, mild numbness over dorsum of foot developed later.",
            pmh: "None",
            medications: "None"
        },
        physicalExam: {
            inspection: "Right foot in plantar flexed position. No muscle atrophy visible yet.",
            palpation: "No tenderness over fibular head or spine. Fibular head feels normal.",
            rom: "Limited active dorsiflexion of right foot. Passive ROM normal.",
            strength: "Right dorsiflexion 1/5, eversion 2/5. Plantar flexion and inversion normal (5/5). Hip and knee strength normal.",
            sensation: "Decreased sensation over dorsum of right foot in first web space",
            reflexes: "Achilles reflex present and symmetric. No pathological reflexes.",
            specialTests: "Negative straight leg raise. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Right Superficial Fibular Anti Sensory (Dorsum Foot)",
                    nr: "2.5",
                    peak: "NR",
                    normPeak: "<4.2",
                    fpAmp: "NR",
                    normFP: ">6",
                    site1: "Ankle",
                    site2: "Dorsum Foot",
                    deltaP: "NR",
                    dist: "14.0",
                    vel: "NR",
                    normVel: ">40"
                },
                {
                    site: "Left Superficial Fibular Anti Sensory (Dorsum Foot)",
                    nr: "2.5",
                    peak: "3.8",
                    normPeak: "<4.2",
                    fpAmp: "12.5",
                    normFP: ">6",
                    site1: "Ankle",
                    site2: "Dorsum Foot",
                    deltaP: "3.8",
                    dist: "14.0",
                    vel: "37",
                    normVel: ">40"
                },
                {
                    site: "Right Sural Anti Sensory",
                    nr: "2.5",
                    peak: "3.4",
                    normPeak: "<4.4",
                    fpAmp: "18.2",
                    normFP: ">6",
                    site1: "Calf",
                    site2: "Ankle",
                    deltaP: "3.2",
                    dist: "14.0",
                    vel: "44",
                    normVel: ">40"
                },
                {
                    site: "Left Sural Anti Sensory",
                    nr: "2.5",
                    peak: "3.6",
                    normPeak: "<4.4",
                    fpAmp: "16.8",
                    normFP: ">6",
                    site1: "Calf",
                    site2: "Ankle",
                    deltaP: "3.4",
                    dist: "14.0",
                    vel: "41",
                    normVel: ">40"
                }
            ],
            motorSummary: [
                {
                    site: "Right Fibular Motor (EDB)",
                    nr: "2.0",
                    onset: "NR",
                    normOnset: "<6.5",
                    fpAmp: "NR",
                    normFP: ">2.0",
                    neg: "Fib Head",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "NR",
                    dist: "31.0",
                    vel: "NR",
                    normVel: ">44"
                },
                {
                    site: "Right Fibular Motor (Tib Ant)",
                    nr: "2.0",
                    onset: "NR",
                    normOnset: "<6.0",
                    fpAmp: "NR",
                    normFP: ">2.0",
                    neg: "Fib Head",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "NR",
                    dist: "28.0",
                    vel: "NR",
                    normVel: ">44"
                },
                {
                    site: "Left Fibular Motor (EDB)",
                    nr: "2.0",
                    onset: "5.8",
                    normOnset: "<6.5",
                    fpAmp: "4.2",
                    normFP: ">2.0",
                    neg: "Fib Head",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "2.9",
                    dist: "31.0",
                    vel: "50",
                    normVel: ">44"
                },
                {
                    site: "Right Tibial Motor (Abd Hall)",
                    nr: "2.0",
                    onset: "4.8",
                    normOnset: "<5.8",
                    fpAmp: "8.5",
                    normFP: ">4.0",
                    neg: "Pop Fossa",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "3.2",
                    dist: "42.0",
                    vel: "52",
                    normVel: ">41"
                },
                {
                    site: "Left Tibial Motor (Abd Hall)",
                    nr: "2.0",
                    onset: "4.6",
                    normOnset: "<5.8",
                    fpAmp: "9.1",
                    normFP: ">4.0",
                    neg: "Pop Fossa",
                    site1: "Ankle",
                    site2: "",
                    deltaP: "3.0",
                    dist: "42.0",
                    vel: "54",
                    normVel: ">41"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Right",
                    muscle: "Tibialis Anterior",
                    nerve: "Deep Fibular",
                    root: "L4-5",
                    insAct: "↑↑",
                    fibs: "3+",
                    psw: "2+",
                    amp: "↓",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Acute denervation"
                },
                {
                    side: "Right",
                    muscle: "Extensor Digitorum Brevis",
                    nerve: "Deep Fibular",
                    root: "L5-S1",
                    insAct: "↑↑",
                    fibs: "3+",
                    psw: "3+",
                    amp: "Absent",
                    dur: "Absent",
                    poly: "0",
                    recrt: "No volitional",
                    intPat: "No pattern",
                    comment: "Complete denervation"
                },
                {
                    side: "Right",
                    muscle: "Fibularis Longus",
                    nerve: "Superficial Fibular",
                    root: "L5-S1",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "1+",
                    amp: "↓",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Mild denervation"
                },
                {
                    side: "Right",
                    muscle: "Biceps Femoris (Short Head)",
                    nerve: "Fibular Div Sciatic",
                    root: "L5-S2",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Spares sciatic trunk"
                },
                {
                    side: "Right",
                    muscle: "Tibialis Posterior",
                    nerve: "Tibial",
                    root: "L4-5",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Tibial nerve normal"
                },
                {
                    side: "Left",
                    muscle: "Tibialis Anterior",
                    nerve: "Deep Fibular",
                    root: "L4-5",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Normal control"
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Common Fibular (Peroneal) Neuropathy at the Fibular Head",
        differentialDiagnosis: [
            "Common fibular (peroneal) neuropathy at fibular head",
            "Deep fibular (peroneal) neuropathy",
            "L5 radiculopathy",
            "Sciatic neuropathy",
            "Anterior compartment syndrome"
        ],
        explanation: "Acute onset foot drop with both motor and sensory involvement in common fibular distribution following prolonged squatting (compression at fibular head) is classic for fibular neuropathy."
    },
    'ulnarneuropathy': {
        title: "Hand Weakness and Numbness",
        presentation: {
            age: 52,
            gender: "Male",
            occupation: "Carpenter",
            chiefComplaint: "6-month history of weakness in right hand and numbness in ring and little fingers",
            history: "Gradual onset of difficulty with fine motor tasks. Notices weakness when trying to grip tools. Numbness in ring and little fingers, worse in the morning. Works long hours using hand tools and machinery. No neck pain or trauma.",
            pmh: "Diabetes mellitus type 2, hypertension",
            medications: "Metformin, lisinopril"
        },
        physicalExam: {
            inspection: "Mild atrophy of hypothenar eminence and first dorsal interosseous space on right",
            palpation: "No tenderness over ulnar groove at elbow. Ulnar nerve mobile at elbow.",
            rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
            strength: "Right hand intrinsics 3/5 (FDI, ADM, interossei). Grip strength reduced. FCU 4/5. All other muscle groups 5/5.",
            sensation: "Decreased light touch and pinprick in ulnar distribution (ring and little finger)",
            reflexes: "2+ and symmetric throughout. No pathological reflexes.",
            specialTests: "Positive Froment's sign on right. Negative Tinel's at wrist. Mild Tinel's at elbow. No Hoffmann, clonus, or spasticity"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.4",
                    fpAmp: "18.4",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "4.2",
                    normPeak: "<3.4",
                    fpAmp: "6.0",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "4.1",
                    dist: "14.0",
                    vel: "34",
                    normVel: ">38"
                },
                {
                    site: "Left Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "3.0",
                    normPeak: "<3.7",
                    fpAmp: "22.0",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.8",
                    dist: "14.0",
                    vel: "50",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (3rd Digit)",
                    nr: "2.5",
                    peak: "2.8",
                    normPeak: "<3.7",
                    fpAmp: "24.2",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "3rd Digit",
                    deltaP: "2.6",
                    dist: "14.0",
                    vel: "54",
                    normVel: ">39"
                }
            ],
            motorSummary: [
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.0",
                    normOnset: "<3.3",
                    fpAmp: "11.2",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.8",
                    dist: "23.0",
                    vel: "58",
                    normVel: ">51"
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "3.8",
                    normOnset: "<3.3",
                    fpAmp: "4.8",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.2",
                    dist: "23.0",
                    vel: "32",
                    normVel: ">51"
                },
                {
                    site: "B Elbow",
                    nr: "6.0",
                    onset: "6.8",
                    normOnset: "",
                    fpAmp: "4.5",
                    normFP: "",
                    neg: "A Elbow",
                    site1: "B Elbow",
                    site2: "",
                    deltaP: "2.9",
                    dist: "9.0",
                    vel: "31",
                    normVel: ">51"
                },
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<4.4",
                    fpAmp: "8.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.0",
                    dist: "22.0",
                    vel: "66",
                    normVel: ">50"
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<4.4",
                    fpAmp: "8.2",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.8",
                    dist: "22.0",
                    vel: "79",
                    normVel: ">50"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Right",
                    muscle: "1st Dorsal Interosseous",
                    nerve: "Deep Ulnar",
                    root: "C8-T1",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "2+",
                    amp: "↑",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Chronic denervation"
                },
                {
                    side: "Right",
                    muscle: "Abductor Digiti Minimi",
                    nerve: "Deep Ulnar",
                    root: "C8-T1",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "1+",
                    amp: "↑",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Chronic denervation"
                },
                {
                    side: "Right",
                    muscle: "Flexor Carpi Ulnaris",
                    nerve: "Ulnar",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Spares FCU branch"
                },
                {
                    side: "Right",
                    muscle: "Abd Poll Brev",
                    nerve: "Median",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Median nerve normal"
                },
                {
                    side: "Right",
                    muscle: "Extensor Indicis",
                    nerve: "Post Interosseous",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Radial nerve normal"
                },
                {
                    side: "Left",
                    muscle: "1st Dorsal Interosseous",
                    nerve: "Deep Ulnar",
                    root: "C8-T1",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Normal control"
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "intermediate",
        correctDiagnosis: "Cubital Tunnel Syndrome (Ulnar Neuropathy at Elbow)",
        differentialDiagnosis: [
            "Cubital tunnel syndrome",
            "Ulnar neuropathy at elbow",
            "Guyon's canal syndrome",
            "C8 radiculopathy",
            "Lower trunk brachial plexopathy",
            "Polyneuropathy"
        ],
        explanation: "Progressive hand weakness with ulnar distribution, positive Froment's sign, focal slowing across elbow on NCS, and EMG showing denervation in distal ulnar muscles while sparing FCU confirms ulnar neuropathy at the elbow."
    },
    'cervicalradiculopathy': {
        title: "Neck Pain with Arm Weakness",
        presentation: {
            age: 45,
            gender: "Female",
            occupation: "Office Manager",
            chiefComplaint: "3-month history of neck pain radiating to left arm with weakness and numbness",
            history: "Gradual onset of neck pain after minor motor vehicle accident. Pain radiates down left arm to thumb and index finger. Weakness noticed when lifting objects overhead. Numbness in thumb, index, and middle finger. Symptoms worse with neck extension.",
            pmh: "None",
            medications: "Ibuprofen PRN"
        },
        physicalExam: {
            inspection: "No visible muscle atrophy. Patient holds head in slightly flexed position.",
            palpation: "Tenderness over left cervical paraspinal muscles. No palpable lymphadenopathy.",
            rom: "Limited neck extension due to pain. Left lateral flexion reproduces arm pain.",
            strength: "Left biceps 4/5, brachioradialis 4/5, deltoid 4-/5. Grip strength mildly reduced on left. Right side normal.",
            sensation: "Decreased sensation in left C6 dermatome (thumb, index finger, lateral forearm)",
            reflexes: "Left biceps reflex diminished (1+). Brachioradialis reflex absent on left. Triceps 2+ bilaterally.",
            specialTests: "Positive Spurling's test on left. Negative Hoffmann bilaterally. No clonus or spasticity"
        },
        ncsStudies: {
            antiSensorySummary: [
                {
                    site: "Left Median Anti Sensory (1st Digit)",
                    nr: "2.5",
                    peak: "4.1",
                    normPeak: "<3.4",
                    fpAmp: "12.0",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "1st Digit",
                    deltaP: "4.0",
                    dist: "13.0",
                    vel: "33",
                    normVel: ">39"
                },
                {
                    site: "Right Median Anti Sensory (1st Digit)",
                    nr: "2.5",
                    peak: "3.2",
                    normPeak: "<3.4",
                    fpAmp: "18.5",
                    normFP: ">15",
                    site1: "Wrist",
                    site2: "1st Digit",
                    deltaP: "3.1",
                    dist: "13.0",
                    vel: "42",
                    normVel: ">39"
                },
                {
                    site: "Left Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.0",
                    normPeak: "<3.4",
                    fpAmp: "16.8",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "2.9",
                    dist: "14.0",
                    vel: "48",
                    normVel: ">38"
                },
                {
                    site: "Right Ulnar Anti Sensory (5th Digit)",
                    nr: "2.5",
                    peak: "3.1",
                    normPeak: "<3.4",
                    fpAmp: "15.2",
                    normFP: ">10",
                    site1: "Wrist",
                    site2: "5th Digit",
                    deltaP: "3.0",
                    dist: "14.0",
                    vel: "47",
                    normVel: ">38"
                }
            ],
            motorSummary: [
                {
                    site: "Left Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.2",
                    normOnset: "<4.4",
                    fpAmp: "9.1",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "3.0",
                    dist: "22.0",
                    vel: "73",
                    normVel: ">50"
                },
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "2.0",
                    onset: "3.1",
                    normOnset: "<4.4",
                    fpAmp: "9.4",
                    normFP: ">4.0",
                    neg: "Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.9",
                    dist: "22.0",
                    vel: "76",
                    normVel: ">50"
                },
                {
                    site: "Left Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "2.7",
                    normOnset: "<3.3",
                    fpAmp: "11.8",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.6",
                    dist: "23.0",
                    vel: "88",
                    normVel: ">51"
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "2.0",
                    onset: "2.8",
                    normOnset: "<3.3",
                    fpAmp: "12.1",
                    normFP: ">6.0",
                    neg: "B Elbow",
                    site1: "Wrist",
                    site2: "",
                    deltaP: "2.7",
                    dist: "23.0",
                    vel: "85",
                    normVel: ">51"
                },
                {
                    site: "Left Radial Motor (Ext Indicis)",
                    nr: "2.0",
                    onset: "3.4",
                    normOnset: "<4.0",
                    fpAmp: "4.2",
                    normFP: ">2.0",
                    neg: "Spiral Groove",
                    site1: "Forearm",
                    site2: "",
                    deltaP: "2.8",
                    dist: "18.0",
                    vel: "64",
                    normVel: ">50"
                },
                {
                    site: "Right Radial Motor (Ext Indicis)",
                    nr: "2.0",
                    onset: "3.3",
                    normOnset: "<4.0",
                    fpAmp: "4.5",
                    normFP: ">2.0",
                    neg: "Spiral Groove",
                    site1: "Forearm",
                    site2: "",
                    deltaP: "2.9",
                    dist: "18.0",
                    vel: "62",
                    normVel: ">50"
                }
            ]
        },
        emgStudies: {
            needleExamination: [
                {
                    side: "Left",
                    muscle: "Biceps",
                    nerve: "Musculocutaneous",
                    root: "C5-6",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "2+",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Active denervation"
                },
                {
                    side: "Left",
                    muscle: "Deltoid",
                    nerve: "Axillary",
                    root: "C5-6",
                    insAct: "↑",
                    fibs: "1+",
                    psw: "1+",
                    amp: "↑",
                    dur: "↑",
                    poly: "1",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Chronic reinnervation"
                },
                {
                    side: "Left",
                    muscle: "Brachioradialis",
                    nerve: "Radial",
                    root: "C5-6",
                    insAct: "↑",
                    fibs: "1+",
                    psw: "1+",
                    amp: "↑",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Mild denervation"
                },
                {
                    side: "Left",
                    muscle: "Triceps",
                    nerve: "Radial",
                    root: "C6-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Spares C7 myotome"
                },
                {
                    side: "Left",
                    muscle: "Extensor Indicis",
                    nerve: "Post Interosseous",
                    root: "C7-8",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "C8 myotome normal"
                },
                {
                    side: "Left",
                    muscle: "Cervical Paraspinals",
                    nerve: "Dorsal Rami",
                    root: "C6",
                    insAct: "↑",
                    fibs: "2+",
                    psw: "2+",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Reduced",
                    intPat: "Discrete",
                    comment: "Confirms root level"
                },
                {
                    side: "Right",
                    muscle: "Biceps",
                    nerve: "Musculocutaneous",
                    root: "C5-6",
                    insAct: "Nml",
                    fibs: "Nml",
                    psw: "Nml",
                    amp: "Nml",
                    dur: "Nml",
                    poly: "0",
                    recrt: "Nml",
                    intPat: "Nml",
                    comment: "Normal control"
                }
            ]
        },
        requiresEMG: true,
        emgIndication: "INDICATED",
        difficulty: "advanced",
        correctDiagnosis: "Left C6 Radiculopathy",
        differentialDiagnosis: [
            "C6 radiculopathy",
            "Cervical radiculopathy",
            "Cervical disc herniation",
            "Brachial plexopathy",
            "Multiple peripheral neuropathies",
            "Cervical myelopathy"
        ],
        explanation: "Clinical presentation with neck pain, C6 distribution weakness and numbness, diminished reflexes, positive Spurling's test, and EMG showing active denervation in C6 myotome muscles confirms C6 radiculopathy."
    }
};
*/
// DISABLED: End of caseDatabase - now provided by emg-app-complete-system.js

// Complete EMG APP Functionality - Extracted from EMG APP
function toggleDifficulty(difficulty) {
    const toggle = document.getElementById(`${difficulty}-toggle`);
    const checkbox = document.getElementById(`${difficulty}-checkbox`);
    const statusText = toggle.querySelector('.status-text');

    if (toggle.classList.contains('active')) {
        // Turn OFF
        toggle.classList.remove('active');
        toggle.classList.add('inactive');
        checkbox.checked = false;
        statusText.textContent = 'INACTIVE';
    } else {
        // Turn ON
        toggle.classList.remove('inactive');
        toggle.classList.add('active');
        checkbox.checked = true;
        statusText.textContent = 'ACTIVE';
    }

    updateCaseDisplay();
}

function startRandomCaseByDifficulty() {
    const beginnerChecked = document.getElementById('beginner-checkbox').checked;
    const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
    const difficultChecked = document.getElementById('difficult-checkbox').checked;

    if (!beginnerChecked && !intermediateChecked && !difficultChecked) {
        alert('Please select at least one difficulty level first.');
        return;
    }

    const availableCases = [];
    for (const [caseId, caseData] of Object.entries(window.caseDatabase)) {
        const difficulty = caseData.difficulty || 'intermediate';

        if ((difficulty === 'beginner' && beginnerChecked) ||
            (difficulty === 'intermediate' && intermediateChecked) ||
            (difficulty === 'difficult' && difficultChecked)) {
            availableCases.push(caseId);
        }
    }

    if (availableCases.length === 0) {
        alert('No cases available for selected difficulty levels.');
        return;
    }

    const randomCase = availableCases[Math.floor(Math.random() * availableCases.length)];
    startCase(randomCase);
}

function showCaseSelection() {
    document.getElementById('case-selection-section').style.display = 'block';
    populateCaseGrid();

    // Smooth scroll to case selection
    document.getElementById('case-selection-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function hideCaseSelection() {
    document.getElementById('case-selection-section').style.display = 'none';
}

function populateCaseGrid() {
    const beginnerChecked = document.getElementById('beginner-checkbox').checked;
    const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
    const difficultChecked = document.getElementById('difficult-checkbox').checked;

    const caseGrid = document.getElementById('case-grid');
    let html = '';

    for (const [caseId, caseData] of Object.entries(window.caseDatabase)) {
        const difficulty = caseData.difficulty || 'intermediate';

        // Filter based on selected difficulties
        if ((difficulty === 'beginner' && !beginnerChecked) ||
            (difficulty === 'intermediate' && !intermediateChecked) ||
            (difficulty === 'difficult' && !difficultChecked)) {
            continue;
        }

        html += `
            <div class="case-item" onclick="toggleCaseSelection('${caseId}')" id="case-${caseId}">
                <div class="case-title">${caseData.title}</div>
                <div class="case-difficulty difficulty-${difficulty}">${difficulty.toUpperCase()}</div>
                <div class="case-preview">${caseData.presentation.chiefComplaint}</div>
            </div>
        `;
    }

    caseGrid.innerHTML = html;
}

function toggleCaseSelection(caseId) {
    const caseElement = document.getElementById(`case-${caseId}`);
    caseElement.classList.toggle('selected');
}

function selectAllCases() {
    document.querySelectorAll('.case-item').forEach(item => {
        item.classList.add('selected');
    });
}

function deselectAllCases() {
    document.querySelectorAll('.case-item').forEach(item => {
        item.classList.remove('selected');
    });
}

function startSelectedCases() {
    const selectedCases = [];
    document.querySelectorAll('.case-item.selected').forEach(item => {
        const caseId = item.id.replace('case-', '');
        selectedCases.push(caseId);
    });

    if (selectedCases.length === 0) {
        alert('Please select at least one case first.');
        return;
    }

    // Start first selected case
    startCase(selectedCases[0]);
}

function updateCaseDisplay() {
    // This function would update any displayed case information based on difficulty selection
    console.log('Updating case display based on difficulty selection');
}

// Case Flow Functions
function startCase(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    if (!caseData) {
        console.error('❌ Case Data Error - Case not found:', caseId, 'Available cases:', window.caseDatabase ? Object.keys(window.caseDatabase) : 'No caseDatabase');
        return;
    }

    // Hide other sections
    document.getElementById('case-selection-section').style.display = 'none';

    // Show case interface
    const caseInterface = document.getElementById('case-interface');
    caseInterface.style.display = 'block';

    // Populate case interface
    caseInterface.innerHTML = generateCaseInterface(caseData, caseId);

    // Scroll to case interface
    caseInterface.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generateCaseInterface(caseData, caseId) {
    return `
        <div id="case-interface" class="case-interface" style="display: block;">
            <div class="progress-bar">
                <div id="progress-fill" class="progress-fill" style="width: 25%"></div>
            </div>

            <!-- Step 1: Case Presentation -->
            <div id="case-presentation-step" class="case-step" style="display: block;">
                <h3>📋 Patient Presentation</h3>
                <div id="case-details">
                    <div class="case-header">
                        <div class="case-title-main">${caseData.title}</div>
                        <div class="case-difficulty difficulty-${caseData.difficulty}">${caseData.difficulty.toUpperCase()}</div>
                    </div>
                    <div class="case-info">
                        <div class="info-section">
                            <h4>👤 Patient Information</h4>
                            <p><strong>Age:</strong> ${caseData.presentation.age}</p>
                            <p><strong>Gender:</strong> ${caseData.presentation.gender}</p>
                            <p><strong>Occupation:</strong> ${caseData.presentation?.occupation || 'Not specified'}</p>
                        </div>
                        <div class="info-section">
                            <h4>🩺 Chief Complaint</h4>
                            <p>${caseData.presentation.chiefComplaint}</p>
                        </div>
                        <div class="info-section">
                            <h4>📋 History</h4>
                            <p>${caseData.presentation?.history || caseData.history?.historyOfPresentIllness || 'History not available'}</p>
                        </div>
                    </div>
                </div>
                <button class="quiz-button" onclick="showPhysicalExam('${caseId}')">View Physical Exam →</button>
            </div>

            <!-- Step 2: Physical Examination -->
            <div id="physical-exam-step" class="case-step" style="display: none;">
                <h3>🔍 Physical Examination Findings</h3>
                <div id="physical-exam-details">
                    <div class="case-info">
                        <div class="info-section">
                            <h4>🏥 Physical Exam</h4>
                            <p><strong>Inspection:</strong> ${(caseData.physicalExam?.inspection || caseData.physicalExamination?.generalAppearance) || 'No significant findings'}</p>
                            <p><strong>Palpation:</strong> ${(caseData.physicalExam?.palpation || caseData.physicalExamination?.musculoskeletalExam) || 'No significant findings'}</p>
                            <p><strong>Strength:</strong> ${caseData.physicalExam?.strength || caseData.physicalExamination?.neurologicalExam || 'Normal strength'}</p>
                            <p><strong>Sensation:</strong> ${caseData.physicalExam?.sensation || caseData.physicalExamination?.neurologicalExam || 'Normal sensation'}</p>
                            <p><strong>Reflexes:</strong> ${caseData.physicalExam?.reflexes || caseData.physicalExamination?.neurologicalExam || 'Normal reflexes'}</p>
                            <p><strong>Special Tests:</strong> ${caseData.physicalExam?.specialTests || 'Not performed'}</p>
                        </div>
                    </div>
                </div>
                <button class="quiz-button" onclick="showCasePresentation('${caseId}')">← Back to Presentation</button>
                <button class="quiz-button" onclick="showDifferentialBuilder('${caseId}')">Build Differential →</button>
            </div>

            <!-- Step 3: Differential Building -->
            <div id="differential-step" class="case-step" style="display: none;">
                <h3>🧠 Build Your Differential Diagnosis</h3>
                <p><strong>Instructions:</strong> Based on the history and physical examination, list your differential diagnoses. Include both peripheral and central causes, ranking from most to least likely.</p>
                <textarea id="user-differential" class="differential-input" placeholder="Enter your differential diagnosis list here...&#10;Example:&#10;1. Carpal tunnel syndrome&#10;2. Ulnar neuropathy at elbow&#10;3. Cervical radiculopathy&#10;..."></textarea>
                <div id="differential-feedback" style="margin-top: 15px;"></div>
                <button class="quiz-button" onclick="showPhysicalExam('${caseId}')">← Back to Exam</button>
                <button class="quiz-button" onclick="analyzeDifferential('${caseId}')">Analyze Differential</button>

                <!-- EMG Decision Section (shown after differential analysis) -->
                <div id="emg-decision-section" style="display: none; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                    <h4>⚖️ Clinical Decision: EMG/NCS Indication</h4>
                    <p><strong>Based on the patient's presentation and your differential diagnosis, do the symptoms and findings warrant EMG/NCS studies?</strong></p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Consider:</strong></p>
                        <ul>
                            <li>Does this appear to be a <strong>peripheral nervous system</strong> problem?</li>
                            <li>Would EMG/NCS help <strong>localize</strong> the lesion?</li>
                            <li>Would EMG/NCS <strong>change management</strong>?</li>
                            <li>Are there <strong>upper motor neuron signs</strong> suggesting central pathology?</li>
                        </ul>
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <button class="quiz-button" onclick="makeEMGDecision('${caseId}', true)" style="background: #27ae60; margin-right: 20px;">
                            ✅ YES - EMG/NCS is indicated
                        </button>
                        <button class="quiz-button" onclick="makeEMGDecision('${caseId}', false)" style="background: #e74c3c;">
                            ❌ NO - EMG/NCS is not indicated
                        </button>
                    </div>
                    <div id="emg-decision-feedback" style="margin-top: 20px;"></div>
                    <button id="continue-after-decision" class="quiz-button" onclick="proceedAfterDecision('${caseId}')" style="display: none;">Continue →</button>
                </div>
            </div>

            <!-- Step 4: NCS/EMG Results -->
            <div id="results-step" class="case-step" style="display: none;">
                <h3>⚡ Nerve Conduction Study Results</h3>
                <div id="ncs-results">
                    <!-- NCS results will be populated here -->
                </div>

                <div id="emg-results" class="emg-section" style="display: none;">
                    <h4>🔬 EMG Results (when required for diagnosis)</h4>
                    <div id="emg-details">
                        <!-- EMG results will be populated here -->
                    </div>
                </div>

                <button class="quiz-button" onclick="showEMGDecision('${caseId}')">← Back to Decision</button>
                <button class="quiz-button" onclick="showFinalDiagnosis('${caseId}')">Make Final Diagnosis →</button>
            </div>

            <!-- Step 5: Final Diagnosis -->
            <div id="diagnosis-step" class="case-step" style="display: none;">
                <h3>🎯 Final Diagnosis</h3>
                <p><strong>Based on the clinical presentation and test results, what is your final diagnosis?</strong></p>
                <textarea id="final-diagnosis" class="differential-input" style="min-height: 80px;" placeholder="Enter your final diagnosis and reasoning..."></textarea>
                <div id="diagnosis-feedback" style="margin-top: 15px;"></div>
                <button class="quiz-button" onclick="showNCSResults('${caseId}')">← Back to Results</button>
                <button class="quiz-button" onclick="checkFinalDiagnosis('${caseId}')">Check Diagnosis</button>
                <button class="quiz-button" onclick="hideCaseInterface()" style="background: #95a5a6;">← Back to Cases</button>
            </div>
        </div>
    `;
}

function checkDifferential(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const userInput = document.getElementById(`differential-input-${caseId}`).value.toLowerCase();
    const feedbackDiv = document.getElementById(`differential-feedback-${caseId}`);

    const userDifferentials = userInput.split('\n').map(d => d.trim()).filter(d => d.length > 0);
    const correctDifferentials = caseData.differentialDiagnosis.map(d => d.toLowerCase());

    let matchedDifferentials = [];
    let missedDifferentials = [];

    // Check which differentials user got right
    userDifferentials.forEach(userDiff => {
        const matched = correctDifferentials.find(correctDiff =>
            correctDiff.includes(userDiff) || userDiff.includes(correctDiff.split(' ')[0])
        );
        if (matched) {
            matchedDifferentials.push(matched);
        }
    });

    // Find missed differentials
    missedDifferentials = correctDifferentials.filter(correct =>
        !matchedDifferentials.some(matched => matched === correct)
    );

    // Generate feedback
    let feedbackClass = 'feedback-correct';
    let feedbackText = '';

    if (matchedDifferentials.length === correctDifferentials.length) {
        feedbackClass = 'feedback-correct';
        feedbackText = `🎉 Excellent! You identified all key differentials: ${matchedDifferentials.join(', ')}`;
    } else if (matchedDifferentials.length > 0) {
        feedbackClass = 'feedback-partial';
        feedbackText = `✅ Good start! You identified: ${matchedDifferentials.join(', ')}<br>`;
        feedbackText += `💡 Also consider: ${missedDifferentials.join(', ')}`;
    } else {
        feedbackClass = 'feedback-incorrect';
        feedbackText = `🤔 Consider these key differentials: ${correctDifferentials.join(', ')}`;
    }

    feedbackDiv.className = `feedback-section ${feedbackClass}`;
    feedbackDiv.innerHTML = feedbackText;
    feedbackDiv.style.display = 'block';
}

function checkDiagnosis(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const userDiagnosis = document.getElementById(`diagnosis-input-${caseId}`).value.toLowerCase();
    const feedbackDiv = document.getElementById(`diagnosis-feedback-${caseId}`);
    const correctDiagnosis = caseData.correctDiagnosis.toLowerCase();

    let feedbackClass = 'feedback-incorrect';
    let feedbackText = '';

    // Check if diagnosis matches (flexible matching)
    const diagnosisWords = correctDiagnosis.split(' ');
    const userWords = userDiagnosis.split(' ');

    let matchCount = 0;
    diagnosisWords.forEach(word => {
        if (userWords.some(userWord => userWord.includes(word) || word.includes(userWord))) {
            matchCount++;
        }
    });

    const matchPercentage = matchCount / diagnosisWords.length;

    if (matchPercentage >= 0.7) {
        feedbackClass = 'feedback-correct';
        feedbackText = `🎉 Correct! ${caseData.correctDiagnosis}<br><br>📚 ${caseData.explanation}`;
    } else if (matchPercentage >= 0.4) {
        feedbackClass = 'feedback-partial';
        feedbackText = `🤔 Close! The correct diagnosis is: ${caseData.correctDiagnosis}<br><br>📚 ${caseData.explanation}`;
    } else {
        feedbackClass = 'feedback-incorrect';
        feedbackText = `❌ The correct diagnosis is: ${caseData.correctDiagnosis}<br><br>📚 ${caseData.explanation}`;
    }

    feedbackDiv.className = `feedback-section ${feedbackClass}`;
    feedbackDiv.innerHTML = feedbackText;
    feedbackDiv.style.display = 'block';
}

function showExplanation(caseId) {
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    alert(`Explanation:\n\n${caseData.explanation}`);
}

function hideCaseInterface() {
    document.getElementById('case-interface').style.display = 'none';
}

// Clinical Cases Navigation Functions
function hideAllSteps() {
    const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
    steps.forEach(stepId => {
        const element = document.getElementById(stepId);
        if (element) element.style.display = 'none';
    });
}

function updateProgress(percentage) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

function showCasePresentation(caseId) {
    hideAllSteps();
    document.getElementById('case-presentation-step').style.display = 'block';
    updateProgress(25);
}

function showPhysicalExam(caseId) {
    hideAllSteps();
    document.getElementById('physical-exam-step').style.display = 'block';
    updateProgress(50);
}

function showDifferentialBuilder(caseId) {
    hideAllSteps();
    document.getElementById('differential-step').style.display = 'block';
    updateProgress(75);
}

function analyzeDifferential(caseId) {
    const userInput = document.getElementById('user-differential').value;
    const feedbackDiv = document.getElementById('differential-feedback');

    if (!userInput.trim()) {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 15px; margin: 15px 0;">' +
            '<h4 style="color: #e74c3c;">⚠️ Please Enter Your Differential</h4>' +
            '<p style="color: #e74c3c;">Please provide your differential diagnosis before proceeding.</p>' +
            '</div>';
        return;
    }

    // Get case data and expected differentials
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    console.log('🔍 Differential Debug:', {
        caseId: caseId,
        hasDatabase: !!window.caseDatabase,
        caseFound: !!caseData,
        hasDifferential: !!(caseData && caseData.differentialDiagnosis),
        availableCases: window.caseDatabase ? Object.keys(window.caseDatabase) : 'No DB'
    });

    if (!caseData || !caseData.differentialDiagnosis) {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 15px; margin: 15px 0;">' +
            '<h4 style="color: #e74c3c;">❌ Case Data Error</h4>' +
            '<p style="color: #e74c3c;">Unable to analyze differential. Case ID: ' + caseId + '</p>' +
            '<p style="color: #e74c3c;">Database exists: ' + (!!window.caseDatabase) + '</p>' +
            '<p style="color: #e74c3c;">Available cases: ' + (window.caseDatabase ? Object.keys(window.caseDatabase).slice(0,3).join(', ') + '...' : 'None') + '</p>' +
            '</div>';
        return;
    }

    // Define common medical abbreviations and their full forms
    const abbreviationMap = {
        'cts': ['carpal tunnel syndrome', 'carpal tunnel'],
        'cuts': ['cubital tunnel syndrome', 'cubital tunnel'],
        'als': ['amyotrophic lateral sclerosis', 'motor neuron disease'],
        'ms': ['multiple sclerosis'],
        'gbs': ['guillain-barre syndrome', 'guillain barre syndrome'],
        'cidp': ['chronic inflammatory demyelinating polyneuropathy'],
        'dm': ['diabetes mellitus', 'diabetic neuropathy', 'diabetes'],
        'rad': ['radiculopathy'],
        'plexop': ['plexopathy'],
        'bpi': ['brachial plexus injury', 'brachial plexopathy'],
        'pn': ['peripheral neuropathy', 'polyneuropathy'],
        'myasthenia': ['myasthenia gravis', 'mg'],
        'rhabdo': ['rhabdomyolysis'],
        'polymyositis': ['inflammatory myopathy']
    };

    // Function to expand abbreviations and match terms
    function expandAndMatch(userTerm, expectedTerms) {
        const lowerUserTerm = userTerm.toLowerCase().trim();

        // Direct match
        if (expectedTerms.some(expected => expected.includes(lowerUserTerm) || lowerUserTerm.includes(expected))) {
            return true;
        }

        // Check if user term is an abbreviation
        if (abbreviationMap[lowerUserTerm]) {
            return abbreviationMap[lowerUserTerm].some(expansion =>
                expectedTerms.some(expected => expected.includes(expansion) || expansion.includes(expected))
            );
        }

        // Check if expected term has abbreviations
        for (const [abbrev, expansions] of Object.entries(abbreviationMap)) {
            if (expansions.some(expansion => expectedTerms.some(expected => expected.includes(expansion)))) {
                if (lowerUserTerm === abbrev) return true;
            }
        }

        return false;
    }

    // Parse user input
    const userDifferentials = userInput.toLowerCase().split('\n').map(d => d.trim()).filter(d => d.length > 0);
    const expectedDifferentials = caseData.differentialDiagnosis.map(d => d.toLowerCase());

    let matchedDifferentials = [];
    let missedDifferentials = [];

    // Check which differentials user got right
    userDifferentials.forEach(userDiff => {
        const matched = expectedDifferentials.find(expectedDiff => {
            // First try abbreviation/expansion matching
            if (expandAndMatch(userDiff, [expectedDiff])) {
                return true;
            }

            // Fallback to original word-based matching
            const userWords = userDiff.replace(/[^\w\s]/g, '').split(/\s+/);
            const expectedWords = expectedDiff.replace(/[^\w\s]/g, '').split(/\s+/);

            return userWords.some(userWord =>
                expectedWords.some(expectedWord =>
                    userWord.length > 3 && (expectedWord.includes(userWord) || userWord.includes(expectedWord))
                )
            );
        });

        if (matched) {
            const originalExpected = caseData.differentialDiagnosis.find(d => d.toLowerCase() === matched);
            if (!matchedDifferentials.includes(originalExpected)) {
                matchedDifferentials.push(originalExpected);
            }
        }
    });

    // Find missed key differentials
    missedDifferentials = caseData.differentialDiagnosis.filter(expected =>
        !matchedDifferentials.includes(expected)
    );

    // Generate comprehensive feedback
    let feedbackHtml = '<div style="background: #f0fff4; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 15px 0;">';
    feedbackHtml += '<h4 style="color: #047857; margin-bottom: 15px;">📋 Differential Analysis</h4>';

    if (matchedDifferentials.length > 0) {
        feedbackHtml += '<div style="margin-bottom: 15px;">';
        feedbackHtml += '<h5 style="color: #047857; margin-bottom: 8px;">✅ Correctly Identified:</h5>';
        feedbackHtml += '<ul style="margin: 0; padding-left: 20px; color: #047857;">';
        matchedDifferentials.forEach(diff => {
            feedbackHtml += `<li>${diff}</li>`;
        });
        feedbackHtml += '</ul></div>';
    }

    if (missedDifferentials.length > 0) {
        feedbackHtml += '<div style="margin-bottom: 15px;">';
        feedbackHtml += '<h5 style="color: #dc2626; margin-bottom: 8px;">❌ Key Differentials to Consider:</h5>';
        feedbackHtml += '<ul style="margin: 0; padding-left: 20px; color: #dc2626;">';
        missedDifferentials.forEach(diff => {
            feedbackHtml += `<li>${diff}</li>`;
        });
        feedbackHtml += '</ul></div>';
    }

    // Add learning point
    if (caseData.learningPoint) {
        feedbackHtml += '<div style="background: #fef3c7; padding: 12px; border-radius: 6px; margin-top: 15px;">';
        feedbackHtml += '<h5 style="color: #92400e; margin-bottom: 5px;">💡 Learning Point:</h5>';
        feedbackHtml += `<p style="color: #92400e; margin: 0; font-size: 14px;">${caseData.learningPoint}</p>`;
        feedbackHtml += '</div>';
    }

    feedbackHtml += '</div>';

    feedbackDiv.innerHTML = feedbackHtml;

    // Show EMG decision section
    document.getElementById('emg-decision-section').style.display = 'block';
}

function showEMGDecision(caseId) {
    hideAllSteps();
    document.getElementById('emg-decision-step').style.display = 'block';
    updateProgress(70);
}

function makeEMGDecision(caseId, decision) {
    const feedbackDiv = document.getElementById('emg-decision-feedback');
    const continueBtn = document.getElementById('continue-after-decision');

    // For now, assume EMG is indicated for most cases (this can be refined per case)
    const isEMGIndicated = true; // This should be set per case data

    if (decision === true && isEMGIndicated) {
        feedbackDiv.innerHTML = '<div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">' +
            '<h4 style="color: #27ae60;">✅ Correct Decision</h4>' +
            '<p>You correctly identified that this presentation warrants EMG/NCS evaluation. This appears to be a peripheral nervous system problem that would benefit from electrodiagnostic studies.</p>' +
            '</div>';
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = 'Proceed to EMG/NCS Results →';
    } else if (decision === false && !isEMGIndicated) {
        feedbackDiv.innerHTML = '<div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">' +
            '<h4 style="color: #27ae60;">✅ Excellent Clinical Judgment</h4>' +
            '<p>You correctly identified that EMG/NCS is not indicated in this case.</p>' +
            '</div>';
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = 'Complete Case Review →';
    } else {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">' +
            '<h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>' +
            '<p>For this case, EMG/NCS would be appropriate to help localize and characterize the peripheral nerve pathology.</p>' +
            '</div>';
        continueBtn.style.display = 'inline-block';
        continueBtn.textContent = 'Proceed to EMG/NCS Results (Educational) →';
    }
}

function proceedAfterDecision(caseId) {
    showNCSResults(caseId);
}

function convertLegacyToProfessionalFormat(legacyData) {
    console.log('🔄 Converting legacy format to professional format...');

    const professionalFormat = {
        antiSensorySummary: [],
        motorSummary: [],
        comparisonSummary: [],
        emgFindings: legacyData.emgFindings || []
    };

    // Determine if this is upper or lower extremity based on studies
    const isLowerExtremity = legacyData.sensoryStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('sural') ||
        study.nerve.toLowerCase().includes('tibial')
    ) || legacyData.motorStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('tibial') ||
        study.nerve.toLowerCase().includes('peroneal')
    );

    // Add required standard studies first
    if (isLowerExtremity) {
        // Add standard lower extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Superficial Fibular Sensory (Lateral Leg)",
                nr: "2.5", peak: "3.2", normPeak: "<4.0", ptAmp: "18.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Leg", deltaP: "3.0", dist: "14.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Sural Sensory (Lateral Foot)",
                nr: "2.5", peak: "3.8", normPeak: "<4.4", ptAmp: "15.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Foot", deltaP: "3.6", dist: "14.0",
                vel: "45", normVel: ">40", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Fibular Motor (Ext Dig Brev)",
                nr: "4.5", onset: "4.2", normOnset: "<5.5", opAmp: "6.0", normOPAmp: ">2",
                negDur: "7.5", site1: "Ankle", site2: "EDB", deltaO: "4.0", dist: "8.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Tibial Motor (Abd Hall)",
                nr: "4.5", onset: "4.8", normOnset: "<5.8", opAmp: "12.0", normOPAmp: ">4",
                negDur: "8.0", site1: "Ankle", site2: "AH", deltaO: "4.6", dist: "8.0",
                vel: "45", normVel: ">41", abnormal: false
            }
        );
    } else {
        // Add standard upper extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Median Sensory (Index Finger)",
                nr: "2.5", peak: "3.1", normPeak: "<3.4", ptAmp: "20.0", normPT: ">15",
                site1: "Wrist", site2: "Index Finger", deltaP: "2.9", dist: "13.0",
                vel: "58", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Sensory (Little Finger)",
                nr: "2.5", peak: "2.8", normPeak: "<3.4", ptAmp: "18.0", normPT: ">10",
                site1: "Wrist", site2: "Little Finger", deltaP: "2.6", dist: "13.0",
                vel: "62", normVel: ">49", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Median Motor (Abd Poll Brev)",
                nr: "4.5", onset: "3.8", normOnset: "<4.2", opAmp: "8.0", normOPAmp: ">5",
                negDur: "6.2", site1: "Wrist", site2: "APB", deltaO: "3.6", dist: "7.0",
                vel: "58", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Motor (Abd Dig Minimi)",
                nr: "4.5", onset: "2.8", normOnset: "<3.3", opAmp: "14.0", normOPAmp: ">6",
                negDur: "6.0", site1: "Wrist", site2: "ADM", deltaO: "2.6", dist: "7.0",
                vel: "62", normVel: ">53", abnormal: false
            }
        );
    }

    // Then add case-specific studies from legacy data
    if (legacyData.sensoryStudies) {
        legacyData.sensoryStudies.forEach(study => {
            // Skip if we already have this study type in standards
            const alreadyExists = professionalFormat.antiSensorySummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.antiSensorySummary.push({
                    site: `${study.nerve} Sensory (${study.recording})`,
                    nr: "2.5",
                    peak: study.peakLatency.toString(),
                    normPeak: "<3.5",
                    ptAmp: study.amplitude.toString(),
                    normPT: ">15",
                    site1: "Wrist",
                    site2: study.recording,
                    deltaP: (study.peakLatency - 1.0).toFixed(1),
                    dist: "14.0",
                    vel: study.cv.toString(),
                    normVel: ">40",
                    abnormal: !study.normal
                });
            }
        });
    }

    if (legacyData.motorStudies) {
        legacyData.motorStudies.forEach(study => {
            // Skip if we already have this study type in standards
            const alreadyExists = professionalFormat.motorSummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase()) &&
                existing.site.toLowerCase().includes(study.recording.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.motorSummary.push({
                    site: `${study.nerve} Motor (${study.recording})`,
                    nr: "4.5",
                    onset: study.distalLatency.toString(),
                    normOnset: "<4.0",
                    opAmp: study.amplitude.toString(),
                    normOPAmp: ">5",
                    negDur: "6.5",
                    site1: "Wrist",
                    site2: study.recording,
                    deltaO: (study.distalLatency - 1.0).toFixed(1),
                    dist: "7.0",
                    vel: study.cv.toString(),
                    normVel: ">50",
                    abnormal: !study.normal
                });
            }
        });
    }

    console.log('✅ Legacy conversion completed with standard studies included');
    return professionalFormat;
}

function convertNcsStudiesToProfessionalFormat(ncsStudies) {
    console.log('🔄 Converting ncsStudies format to professional format...');

    const professionalFormat = {
        antiSensorySummary: [],
        motorSummary: [],
        comparisonSummary: [],
        emgFindings: []
    };

    // If ncsStudies already has professional format structure, use it directly
    if (ncsStudies.antiSensorySummary) {
        professionalFormat.antiSensorySummary = [...ncsStudies.antiSensorySummary];
    }
    if (ncsStudies.motorSummary) {
        professionalFormat.motorSummary = [...ncsStudies.motorSummary];
    }
    if (ncsStudies.comparisonSummary) {
        professionalFormat.comparisonSummary = [...ncsStudies.comparisonSummary];
    }
    if (ncsStudies.emgFindings) {
        professionalFormat.emgFindings = [...ncsStudies.emgFindings];
    }

    // Determine if this is upper or lower extremity
    const isLowerExtremity = ncsStudies.sensoryStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('sural') ||
        study.nerve.toLowerCase().includes('tibial')
    ) || ncsStudies.motorStudies?.some(study =>
        study.nerve.toLowerCase().includes('fibular') ||
        study.nerve.toLowerCase().includes('tibial') ||
        study.nerve.toLowerCase().includes('peroneal')
    );

    // Ensure standard studies are present if not already in professional format
    if (professionalFormat.antiSensorySummary.length === 0 && professionalFormat.motorSummary.length === 0) {
        if (isLowerExtremity) {
            // Add standard lower extremity studies
            professionalFormat.antiSensorySummary.push(
                {
                    site: "Right Superficial Fibular Sensory (Lateral Leg)",
                    nr: "2.5", peak: "3.2", normPeak: "<4.0", ptAmp: "18.0", normPT: ">6",
                    site1: "Ankle", site2: "Lateral Leg", deltaP: "3.0", dist: "14.0",
                    vel: "48", normVel: ">44", abnormal: false
                },
                {
                    site: "Right Sural Sensory (Lateral Foot)",
                    nr: "2.5", peak: "3.8", normPeak: "<4.4", ptAmp: "15.0", normPT: ">6",
                    site1: "Ankle", site2: "Lateral Foot", deltaP: "3.6", dist: "14.0",
                    vel: "45", normVel: ">40", abnormal: false
                }
            );
            professionalFormat.motorSummary.push(
                {
                    site: "Right Fibular Motor (Ext Dig Brev)",
                    nr: "4.5", onset: "4.2", normOnset: "<5.5", opAmp: "6.0", normOPAmp: ">2",
                    negDur: "7.5", site1: "Ankle", site2: "EDB", deltaO: "4.0", dist: "8.0",
                    vel: "48", normVel: ">44", abnormal: false
                },
                {
                    site: "Right Tibial Motor (Abd Hall)",
                    nr: "4.5", onset: "4.8", normOnset: "<5.8", opAmp: "12.0", normOPAmp: ">4",
                    negDur: "8.0", site1: "Ankle", site2: "AH", deltaO: "4.6", dist: "8.0",
                    vel: "45", normVel: ">41", abnormal: false
                }
            );
        } else {
            // Add standard upper extremity studies
            professionalFormat.antiSensorySummary.push(
                {
                    site: "Right Median Sensory (Index Finger)",
                    nr: "2.5", peak: "3.1", normPeak: "<3.4", ptAmp: "20.0", normPT: ">15",
                    site1: "Wrist", site2: "Index Finger", deltaP: "2.9", dist: "13.0",
                    vel: "58", normVel: ">50", abnormal: false
                },
                {
                    site: "Right Ulnar Sensory (Little Finger)",
                    nr: "2.5", peak: "2.8", normPeak: "<3.4", ptAmp: "18.0", normPT: ">10",
                    site1: "Wrist", site2: "Little Finger", deltaP: "2.6", dist: "13.0",
                    vel: "62", normVel: ">49", abnormal: false
                }
            );
            professionalFormat.motorSummary.push(
                {
                    site: "Right Median Motor (Abd Poll Brev)",
                    nr: "4.5", onset: "3.8", normOnset: "<4.2", opAmp: "8.0", normOPAmp: ">5",
                    negDur: "6.2", site1: "Wrist", site2: "APB", deltaO: "3.6", dist: "7.0",
                    vel: "58", normVel: ">50", abnormal: false
                },
                {
                    site: "Right Ulnar Motor (Abd Dig Minimi)",
                    nr: "4.5", onset: "2.8", normOnset: "<3.3", opAmp: "14.0", normOPAmp: ">6",
                    negDur: "6.0", site1: "Wrist", site2: "ADM", deltaO: "2.6", dist: "7.0",
                    vel: "62", normVel: ">53", abnormal: false
                }
            );
        }
    }

    // Handle legacy sensory/motor study arrays if they exist (add as additional studies)
    if (ncsStudies.sensoryStudies) {
        ncsStudies.sensoryStudies.forEach(study => {
            // Skip if we already have this study type
            const alreadyExists = professionalFormat.antiSensorySummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.antiSensorySummary.push({
                    site: `${study.nerve} Sensory`,
                    nr: "2.5",
                    peak: study.peakLatency?.toString() || study.latency?.toString() || "N/A",
                    normPeak: "<3.5",
                    ptAmp: study.amplitude?.toString() || "N/A",
                    normPT: ">15",
                    site1: "Wrist",
                    site2: study.recording || "Digit",
                    deltaP: "2.0",
                    dist: "14.0",
                    vel: study.cv?.toString() || study.velocity?.toString() || "N/A",
                    normVel: ">40",
                    abnormal: !study.normal
                });
            }
        });
    }

    if (ncsStudies.motorStudies) {
        ncsStudies.motorStudies.forEach(study => {
            // Skip if we already have this study type
            const alreadyExists = professionalFormat.motorSummary.some(existing =>
                existing.site.toLowerCase().includes(study.nerve.toLowerCase()) &&
                existing.site.toLowerCase().includes(study.recording.toLowerCase())
            );
            if (!alreadyExists) {
                professionalFormat.motorSummary.push({
                    site: `${study.nerve} Motor`,
                    nr: "4.5",
                    onset: study.distalLatency?.toString() || study.latency?.toString() || "N/A",
                    normOnset: "<4.0",
                    opAmp: study.amplitude?.toString() || "N/A",
                    normOPAmp: ">5",
                    negDur: "6.5",
                    site1: "Wrist",
                    site2: study.recording || "Muscle",
                    deltaO: "2.0",
                    dist: "7.0",
                    vel: study.cv?.toString() || study.velocity?.toString() || "N/A",
                    normVel: ">50",
                    abnormal: !study.normal
                });
            }
        });
    }

    console.log('✅ ncsStudies conversion completed with standard studies ensured');
    return professionalFormat;
}

// Enhanced conversion function specifically for resident tool format
function convertResidentToolToProfessionalFormat(residentData) {
    console.log('🔄 Converting resident tool format to professional format...');
    const professionalFormat = {
        antiSensorySummary: [],
        motorSummary: [],
        comparisonSummary: [],
        emgFindings: []
    };

    // Determine if this is upper or lower extremity based on ncsStudies
    const isLowerExtremity = residentData.ncsStudies?.some(study =>
        study.nerve?.toLowerCase().includes('fibular') ||
        study.nerve?.toLowerCase().includes('sural') ||
        study.nerve?.toLowerCase().includes('tibial') ||
        study.nerve?.toLowerCase().includes('peroneal')
    );

    // Add required standard studies first
    if (isLowerExtremity) {
        // Standard lower extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Superficial Fibular Sensory (Lateral Leg)",
                nr: "2.5", peak: "3.2", normPeak: "<4.0", ptAmp: "18.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Leg", deltaP: "3.0", dist: "14.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Sural Sensory (Lateral Foot)",
                nr: "2.5", peak: "3.8", normPeak: "<4.4", ptAmp: "15.0", normPT: ">6",
                site1: "Ankle", site2: "Lateral Foot", deltaP: "3.6", dist: "14.0",
                vel: "45", normVel: ">40", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Fibular Motor (Ext Dig Brev)",
                nr: "4.5", onset: "4.2", normOnset: "<5.5", opAmp: "6.0", normOPAmp: ">2",
                negDur: "7.5", site1: "Ankle", site2: "EDB", deltaO: "4.0", dist: "8.0",
                vel: "48", normVel: ">44", abnormal: false
            },
            {
                site: "Right Tibial Motor (Abd Hall)",
                nr: "4.5", onset: "4.8", normOnset: "<5.8", opAmp: "12.0", normOPAmp: ">4",
                negDur: "8.0", site1: "Ankle", site2: "AH", deltaO: "4.6", dist: "8.0",
                vel: "45", normVel: ">41", abnormal: false
            }
        );
    } else {
        // Standard upper extremity studies
        professionalFormat.antiSensorySummary.push(
            {
                site: "Right Median Sensory (Index Finger)",
                nr: "2.5", peak: "3.1", normPeak: "<3.4", ptAmp: "20.0", normPT: ">15",
                site1: "Wrist", site2: "Index Finger", deltaP: "3.0", dist: "14.0",
                vel: "46", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Sensory (Little Finger)",
                nr: "2.5", peak: "2.9", normPeak: "<3.4", ptAmp: "18.0", normPT: ">15",
                site1: "Wrist", site2: "Little Finger", deltaP: "2.8", dist: "14.0",
                vel: "50", normVel: ">50", abnormal: false
            }
        );
        professionalFormat.motorSummary.push(
            {
                site: "Right Median Motor (Abd Poll Brev)",
                nr: "4.5", onset: "3.8", normOnset: "<4.2", opAmp: "12.0", normOPAmp: ">4",
                negDur: "7.5", site1: "Wrist", site2: "APB", deltaO: "3.6", dist: "7.0",
                vel: "52", normVel: ">50", abnormal: false
            },
            {
                site: "Right Ulnar Motor (Abd Dig Min)",
                nr: "4.5", onset: "3.4", normOnset: "<3.3", opAmp: "14.0", normOPAmp: ">6",
                negDur: "6.8", site1: "Wrist", site2: "ADM", deltaO: "3.2", dist: "7.0",
                vel: "55", normVel: ">50", abnormal: false
            }
        );
    }

    // Process the resident tool ncsStudies data to add disease-specific findings
    if (residentData.ncsStudies) {
        residentData.ncsStudies.forEach(study => {
            const isAbnormal = study.interpretation?.toLowerCase().includes('abnormal') ||
                             study.interpretation?.toLowerCase().includes('prolonged') ||
                             study.interpretation?.toLowerCase().includes('reduced') ||
                             study.interpretation?.toLowerCase().includes('absent') ||
                             study.interpretation?.toLowerCase().includes('decreased') ||
                             study.result?.toLowerCase().includes('abnormal');

            if (study.type && study.type.toLowerCase().includes('sensory')) {
                // Modify existing sensory study to show abnormality
                const existingIndex = professionalFormat.antiSensorySummary.findIndex(s =>
                    s.site.toLowerCase().includes(study.nerve?.toLowerCase())
                );

                if (existingIndex >= 0 && isAbnormal) {
                    // Modify existing study to show abnormality
                    professionalFormat.antiSensorySummary[existingIndex].abnormal = true;
                    professionalFormat.antiSensorySummary[existingIndex].peak = "Absent";
                    professionalFormat.antiSensorySummary[existingIndex].ptAmp = "0.0";
                    professionalFormat.antiSensorySummary[existingIndex].vel = "N/A";
                    professionalFormat.antiSensorySummary[existingIndex].deltaP = "N/A";
                } else if (existingIndex < 0) {
                    // Add new sensory study if not found in standards
                    professionalFormat.antiSensorySummary.push({
                        site: `Right ${study.nerve} Sensory`,
                        nr: study.result || "2.5",
                        peak: isAbnormal ? "Absent" : "3.1",
                        normPeak: "<3.4",
                        ptAmp: isAbnormal ? "0.0" : "20.0",
                        normPT: ">15",
                        site1: "Stimulation",
                        site2: "Recording",
                        deltaP: isAbnormal ? "N/A" : "3.0",
                        dist: "14.0",
                        vel: isAbnormal ? "N/A" : "46",
                        normVel: ">50",
                        abnormal: isAbnormal
                    });
                }
            } else if (study.type && study.type.toLowerCase().includes('motor')) {
                // Modify existing motor study to show abnormality
                const existingIndex = professionalFormat.motorSummary.findIndex(s =>
                    s.site.toLowerCase().includes(study.nerve?.toLowerCase())
                );

                if (existingIndex >= 0 && isAbnormal) {
                    // Modify existing study to show abnormality
                    professionalFormat.motorSummary[existingIndex].abnormal = true;
                    professionalFormat.motorSummary[existingIndex].onset = "Absent";
                    professionalFormat.motorSummary[existingIndex].opAmp = "0.0";
                    professionalFormat.motorSummary[existingIndex].vel = "N/A";
                    professionalFormat.motorSummary[existingIndex].deltaO = "N/A";
                    professionalFormat.motorSummary[existingIndex].negDur = "N/A";
                } else if (existingIndex < 0) {
                    // Add new motor study if not found in standards
                    professionalFormat.motorSummary.push({
                        site: `Right ${study.nerve} Motor`,
                        nr: study.result || "4.5",
                        onset: isAbnormal ? "Absent" : "3.8",
                        normOnset: "<4.2",
                        opAmp: isAbnormal ? "0.0" : "12.0",
                        normOPAmp: ">4",
                        negDur: isAbnormal ? "N/A" : "7.5",
                        site1: "Stimulation",
                        site2: "Recording",
                        deltaO: isAbnormal ? "N/A" : "3.6",
                        dist: "7.0",
                        vel: isAbnormal ? "N/A" : "52",
                        normVel: ">50",
                        abnormal: isAbnormal
                    });
                }
            }
        });
    }

    // Convert EMG studies if present in resident tool format
    if (residentData.emgStudies) {
        residentData.emgStudies.forEach(study => {
            const isAbnormal = study.interpretation?.toLowerCase().includes('abnormal') ||
                             study.interpretation?.toLowerCase().includes('neuropathic') ||
                             study.interpretation?.toLowerCase().includes('denervation');

            professionalFormat.emgFindings.push({
                muscle: study.muscle || study.nerve || "Unknown",
                insertionalActivity: study.interpretation?.toLowerCase().includes('increased') ? "Increased" : "Normal",
                spontaneousActivity: study.interpretation?.toLowerCase().includes('fibrillation') ||
                                   study.interpretation?.toLowerCase().includes('denervation') ? "2+ Fibs, 1+ PSWs" : "None",
                voluntaryActivity: study.interpretation?.toLowerCase().includes('neuropathic') ? "Reduced recruitment, large polyphasic MUAPs" : "Normal",
                recruitmentPattern: study.interpretation?.toLowerCase().includes('reduced') ? "Reduced" : "Normal",
                abnormal: isAbnormal
            });
        });
    }

    console.log('✅ Resident tool conversion completed');
    return professionalFormat;
}

function generateSimplifiedNCSTable(ncsResults) {
    let html = '';

    // Nerve/Root Reveal Controls
    html += `
        <div style="margin-bottom: 20px; text-align: center;">
            <button id="toggle-anatomy-info" onclick="toggleAnatomyInfo()"
                    style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                🧠 Show Nerve/Root Info
            </button>
            <p style="color: #6b7280; font-size: 12px; margin: 5px 0 0 0;">💪 Challenge yourself: Try to recall the nerve and root for each muscle before revealing!</p>
            <p style="color: #8b8b8b; font-size: 11px; margin: 2px 0 0 0; font-style: italic;">Building anatomical memory strengthens your clinical reasoning skills</p>
        </div>
    `;

    // Professional Anti Sensory Summary Table
    console.log('🔍 DEBUG: antiSensorySummary exists:', !!ncsResults.antiSensorySummary);
    console.log('🔍 DEBUG: antiSensorySummary length:', ncsResults.antiSensorySummary ? ncsResults.antiSensorySummary.length : 'N/A');
    if (ncsResults.antiSensorySummary && ncsResults.antiSensorySummary.length > 0) {
        console.log('✅ DEBUG: Rendering Anti Sensory Summary Table');
        console.log('📋 DEBUG: Current HTML length before table:', html.length);
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Anti Sensory Summary Table</h4>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Site</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">N/R</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Peak</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">P-T Amp (μV)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm P-T</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site1</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site2</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Vel (m/s)</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        ncsResults.antiSensorySummary.forEach(study => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            html += `
                <tr>
                    <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${study.site}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.nr}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.peak, !study.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normPeak}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.ptAmp, !study.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normPT}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site1}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site2}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.deltaP}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.dist}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.vel, !study.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normVel}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        console.log('📋 DEBUG: Anti Sensory table completed, HTML length:', html.length);
    }

    // Professional Motor Summary Table
    console.log('🔍 DEBUG: motorSummary exists:', !!ncsResults.motorSummary);
    console.log('🔍 DEBUG: motorSummary length:', ncsResults.motorSummary ? ncsResults.motorSummary.length : 'N/A');
    if (ncsResults.motorSummary && ncsResults.motorSummary.length > 0) {
        console.log('✅ DEBUG: Rendering Motor Summary Table');
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Motor Summary Table</h4>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Site</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">N/R</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Onset (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Onset (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">O-P Amp (mV)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm O-P Amp</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Neg Dur (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site1</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site2</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Delta-O (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Norm Vel (m/s)</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        ncsResults.motorSummary.forEach(study => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            html += `
                <tr>
                    <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${study.site}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.nr}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.onset, !study.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normOnset}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.opAmp, !study.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normOPAmp}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.negDur}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site1}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site2}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.deltaO}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.dist}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.vel, !study.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center; color: #6b7280;">${study.normVel}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Comparison Summary Table
    console.log('🔍 DEBUG: comparisonSummary exists:', !!ncsResults.comparisonSummary);
    console.log('🔍 DEBUG: comparisonSummary length:', ncsResults.comparisonSummary ? ncsResults.comparisonSummary.length : 'N/A');
    if (ncsResults.comparisonSummary && ncsResults.comparisonSummary.length > 0) {
        console.log('✅ DEBUG: Rendering Comparison Summary Table');
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Comparison Summary Table</h4>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Site</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">N/R</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">P-T Amp (μV)</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site1</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Site2</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        ncsResults.comparisonSummary.forEach(study => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            html += `
                <tr>
                    <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${study.site}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">
                        Median: ${study.median.nr}<br/>
                        Ulnar: ${study.ulnar.nr}
                    </td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">
                        ${formatValue(study.median.peak, !study.abnormal)}<br/>
                        ${study.ulnar.peak}
                    </td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">
                        ${formatValue(study.median.ptAmp, !study.abnormal)}<br/>
                        ${study.ulnar.ptAmp}
                    </td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site1}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${study.site2}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(study.deltaP, !study.abnormal)}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Professional EMG Table
    if (ncsResults.emgFindings && ncsResults.emgFindings.length > 0) {
        html += `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">EMG</h4>
                <div style="margin-bottom: 15px;">
                    <button id="toggle-anatomy-info"
                            onclick="toggleAnatomyInfo()"
                            style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer; margin-bottom: 10px;">
                        🧠 Show Nerve/Root Info
                    </button>
                    <p style="color: #8b8b8b; font-size: 11px; margin: 2px 0 0 0; font-style: italic;">Building anatomical memory strengthens your clinical reasoning skills</p>
                </div>
                <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                        <thead style="background: #f9fafb;">
                            <tr>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Side</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: left; font-weight: 600;">Muscle</th>
                                <th class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600; display: none;">Nerve</th>
                                <th class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600; display: none;">Root</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Ins Act</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Fibs</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Psw</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Amp</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Dur</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Poly</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Recrt</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Int Pat</th>
                                <th style="border: 1px solid #d1d5db; padding: 6px; text-align: center; font-weight: 600;">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        ncsResults.emgFindings.forEach(finding => {
            const formatValue = (value, isNormal) => {
                return isNormal ? value : `<strong style="color: #dc2626;">${value}</strong>`;
            };

            console.log('🔍 EMG Finding:', finding.muscle, 'nerve:', finding.nerve, 'root:', finding.root);

            html += `
                <tr>
                    <td style="border: 1px solid #d1d5db; padding: 6px;">${finding.side || 'Right'}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px;">${finding.muscle}</td>
                    <td class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; display: none;">${finding.nerve || '—'}</td>
                    <td class="anatomy-info" style="border: 1px solid #d1d5db; padding: 6px; text-align: center; display: none;">${finding.root || '—'}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.insAct || finding.insertionalActivity, !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.fibs || finding.spontaneousActivity, !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.psw || 'Nml', !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.amp || 'Nml', !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.dur || 'Nml', !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.poly || '0', !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.recrt || finding.recruitment, !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; text-align: center;">${formatValue(finding.intPat || 'Nml', !finding.abnormal)}</td>
                    <td style="border: 1px solid #d1d5db; padding: 6px; font-size: 10px;">${finding.comment || ''}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    console.log('🎯 DEBUG: Final HTML length:', html.length);
    console.log('📄 DEBUG: Final HTML preview:', html.substring(0, 500) + '...');
    return html;
}

function toggleAnatomyInfo() {
    const anatomyElements = document.querySelectorAll('.anatomy-info');
    const toggleButton = document.getElementById('toggle-anatomy-info');

    // Check if elements exist
    if (anatomyElements.length === 0) {
        console.warn('No anatomy-info elements found');
        return;
    }

    const isVisible = anatomyElements[0].style.display !== 'none';

    anatomyElements.forEach(element => {
        element.style.display = isVisible ? 'none' : 'table-cell';
    });

    if (toggleButton) {
        toggleButton.textContent = isVisible ? '🧠 Show Nerve/Root Info' : '🧠 Hide Nerve/Root Info';
    }
}

// Make function globally available
window.toggleAnatomyInfo = toggleAnatomyInfo;

function showNCSResults(caseId) {
    hideAllSteps();

    // Populate NCS results from case data
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const ncsResultsDiv = document.getElementById('ncs-results');

    // Handle both old ncsStudies format and new ncsResults format
    if (caseData && (caseData.ncsStudies || caseData.ncsResults)) {
        let ncsHtml = '<div class="clinical-report-container" style="background: white; padding: 25px; border-radius: 12px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">';

        // Patient header
        ncsHtml += `
            <div style="border-bottom: 2px solid #374151; margin-bottom: 25px; padding-bottom: 15px;">
                <h3 style="color: #374151; margin: 0; font-size: 20px; font-weight: 700;">Patient: ${caseData.presentation.occupation || 'Case Study'}</h3>
                <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Test Date: ${new Date().toLocaleDateString()}</p>
            </div>
        `;

        // Check if using new ncsResults format
        console.log('🔍 DEBUG: caseData.ncsResults exists:', !!caseData.ncsResults);
        console.log('🔍 DEBUG: ncsResults content:', caseData.ncsResults);

        if (caseData.ncsResults) {
            console.log('🔍 DEBUG: ncsResults keys:', Object.keys(caseData.ncsResults));

            // Convert legacy format to professional format if needed
            let professionalFormat = caseData.ncsResults;

            if (caseData.ncsResults.sensoryStudies || caseData.ncsResults.motorStudies) {
                console.log('🔄 DEBUG: Converting legacy format to professional format');
                professionalFormat = convertLegacyToProfessionalFormat(caseData.ncsResults);
            } else if (caseData.ncsResults.antiSensorySummary) {
                console.log('✅ DEBUG: Using existing professional format');
            } else {
                console.log('⚠️ DEBUG: Unknown format detected');
            }

            // CRITICAL FIX: Merge EMG data from separate emgFindings array if it exists
            if (caseData.emgFindings && caseData.emgFindings.length > 0) {
                console.log('🔧 DEBUG: Merging separate emgFindings array with', caseData.emgFindings.length, 'entries');
                if (!professionalFormat.emgFindings) {
                    professionalFormat.emgFindings = [];
                }
                professionalFormat.emgFindings = [...professionalFormat.emgFindings, ...caseData.emgFindings];
                console.log('✅ DEBUG: Merged EMG data, total EMG findings:', professionalFormat.emgFindings.length);
            }

            ncsHtml += generateSimplifiedNCSTable(professionalFormat);
        } else if (caseData.ncsStudies) {
            console.log('🔄 DEBUG: Converting ncsStudies legacy format to professional format');

            // Detect if this is resident tool format (has type, nerve, interpretation fields)
            const isResidentToolFormat = caseData.ncsStudies.some(study =>
                study.type && study.nerve && study.interpretation
            );

            let professionalFormat;
            if (isResidentToolFormat) {
                console.log('🎯 DEBUG: Detected resident tool format, using enhanced conversion');
                professionalFormat = convertResidentToolToProfessionalFormat(caseData);
            } else {
                console.log('🔄 DEBUG: Using standard ncsStudies conversion');
                professionalFormat = convertNcsStudiesToProfessionalFormat(caseData.ncsStudies);
            }

            // CRITICAL FIX: Merge EMG data from separate emgFindings array if it exists
            if (caseData.emgFindings && caseData.emgFindings.length > 0) {
                console.log('🔧 DEBUG: Merging separate emgFindings array with', caseData.emgFindings.length, 'entries');
                if (!professionalFormat.emgFindings) {
                    professionalFormat.emgFindings = [];
                }
                professionalFormat.emgFindings = [...professionalFormat.emgFindings, ...caseData.emgFindings];
                console.log('✅ DEBUG: Merged EMG data, total EMG findings:', professionalFormat.emgFindings.length);
            }

            ncsHtml += generateSimplifiedNCSTable(professionalFormat);
        } else {
            console.log('⚠️ DEBUG: No NCS data found, using legacy table rendering');
            // Handle legacy format
            // Anti-Sensory Summary Table
            ncsHtml += `
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">Nerve Conduction Studies</h4>
                    <h5 style="color: #6b7280; margin-bottom: 10px; font-size: 14px; font-weight: 600;">Anti Sensory Summary Table</h5>
                    <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                            <thead style="background: #f9fafb;">
                                <tr>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Site</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">NR</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Peak</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">F-P Amp (μV)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm F-P Amp</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site1</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site2</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Vel</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            caseData.ncsStudies.antiSensorySummary.forEach(study => {
                // Function to check if value is abnormal and return styled text
                const formatValue = (value, normal, isVelocity = false) => {
                    if (!value || !normal) return value || '';

                    const numValue = parseFloat(value);
                    let isAbnormal = false;

                    if (normal.startsWith('>')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue < threshold;
                    } else if (normal.startsWith('<')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue > threshold;
                    }

                    return isAbnormal ? `<strong>${value}</strong>` : value;
                };

                ncsHtml += `
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 8px; font-weight: 500;">${study.site}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.nr}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.peak, study.normPeak)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normPeak}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.fpAmp, study.normFP)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normFP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site1}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site2}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.deltaP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.dist}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.vel, study.normVel, true)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normVel}</td>
                    </tr>
                `;
            });

            ncsHtml += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        // Motor Summary Table (only for legacy format)
        if (caseData.ncsStudies && caseData.ncsStudies.motorSummary) {
            ncsHtml += `
                <div style="margin-bottom: 30px;">
                    <h5 style="color: #6b7280; margin-bottom: 10px; font-size: 14px; font-weight: 600;">Motor Summary Table</h5>
                    <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                            <thead style="background: #f9fafb;">
                                <tr>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Site</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">NR</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Onset (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Onset</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">F-P Amp (mV)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm F-P Amp</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Neg</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site1</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site2</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Dist (cm)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Vel (m/s)</th>
                                    <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Norm Vel</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            caseData.ncsStudies.motorSummary.forEach(study => {
                // Function to check if value is abnormal and return styled text
                const formatValue = (value, normal) => {
                    if (!value || !normal) return value || '';

                    const numValue = parseFloat(value);
                    let isAbnormal = false;

                    if (normal.startsWith('>')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue < threshold;
                    } else if (normal.startsWith('<')) {
                        const threshold = parseFloat(normal.substring(1));
                        isAbnormal = numValue > threshold;
                    }

                    return isAbnormal ? `<strong>${value}</strong>` : value;
                };

                ncsHtml += `
                    <tr>
                        <td style="border: 1px solid #d1d5db; padding: 8px; font-weight: 500;">${study.site}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.nr}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.onset, study.normOnset)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normOnset}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.fpAmp, study.normFP)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normFP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.neg}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site1}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site2}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.deltaP}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.dist}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatValue(study.vel, study.normVel)}</td>
                        <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.normVel}</td>
                    </tr>
                `;
            });

            ncsHtml += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        // EMG Results
        if (caseData.emgStudies) {
            // Comparison Summary Table
            if (caseData.emgStudies.comparisonSummary) {
                ncsHtml += `
                    <div style="margin-bottom: 30px;">
                        <h5 style="color: #6b7280; margin-bottom: 10px; font-size: 14px; font-weight: 600;">Comparison Summary Table</h5>
                        <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                                <thead style="background: #f9fafb;">
                                    <tr>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Site</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">NR</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Peak (ms)</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">F-P Amp (μV)</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site1</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Site2</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Delta-P (ms)</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;

                caseData.emgStudies.comparisonSummary.forEach(study => {
                    ncsHtml += `
                        <tr>
                            <td style="border: 1px solid #d1d5db; padding: 8px; font-weight: 500;">${study.site}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.nr}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.peak}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.fpAmp}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site1}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.site2}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.deltaP}</td>
                        </tr>
                    `;
                });

                ncsHtml += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }

            // EMG Needle Examination Table
            if (caseData.emgStudies.needleExamination) {
                ncsHtml += `
                    <div style="margin-bottom: 30px;">
                        <h4 style="color: #374151; margin-bottom: 15px; font-size: 16px; font-weight: 600;">EMG</h4>
                        <div style="overflow-x: auto; border: 1px solid #d1d5db; border-radius: 8px;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                                <thead style="background: #f9fafb;">
                                    <tr>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Side</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Muscle</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Nerve</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Root</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Ins Act</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Fibs</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Psw</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Amp</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Dur</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Poly</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Recrt</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 600;">Int Pat</th>
                                        <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left; font-weight: 600;">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                `;

                caseData.emgStudies.needleExamination.forEach(study => {
                    // Function to format EMG findings (bold if abnormal)
                    const formatEMGValue = (value) => {
                        if (!value || value === "Nml" || value === "0") return value;
                        // If it's not "Nml" or "0", it's abnormal
                        return `<strong>${value}</strong>`;
                    };

                    ncsHtml += `
                        <tr>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center; font-weight: 500;">${study.side}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px;">${study.muscle}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px;">${study.nerve}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${study.root}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.insAct)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.fibs)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.psw)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.amp)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.dur)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.poly)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.recrt)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${formatEMGValue(study.intPat)}</td>
                            <td style="border: 1px solid #d1d5db; padding: 8px;">${study.comment}</td>
                        </tr>
                    `;
                });

                ncsHtml += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            }
        }

        ncsHtml += '</div>';
        ncsResultsDiv.innerHTML = ncsHtml;
    } else {
        ncsResultsDiv.innerHTML = '<p>NCS results would be loaded here for this case.</p>';
    }

    document.getElementById('results-step').style.display = 'block';
    updateProgress(100);
}

function showFinalDiagnosis(caseId) {
    hideAllSteps();

    document.getElementById('diagnosis-step').style.display = 'block';
    updateProgress(100);
}

function checkFinalDiagnosis(caseId) {
    const userDiagnosis = document.getElementById('final-diagnosis').value;
    const feedbackDiv = document.getElementById('diagnosis-feedback');

    if (!userDiagnosis.trim()) {
        feedbackDiv.innerHTML = '<div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 15px; margin: 15px 0;">' +
            '<h4 style="color: #e74c3c;">⚠️ Please Enter Your Diagnosis</h4>' +
            '<p style="color: #e74c3c;">Please provide your final diagnosis before checking.</p>' +
            '</div>';
        return;
    }

    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    const correctDiagnosis = caseData ? caseData.correctDiagnosis || caseData.title : 'diagnosis not available';

    feedbackDiv.innerHTML = '<div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 15px 0;">' +
        '<h4 style="color: #1e40af;">📋 Your Diagnosis Recorded</h4>' +
        '<p style="color: #1e40af;"><strong>Your Diagnosis:</strong> ' + userDiagnosis + '</p>' +
        '<p style="color: #1e40af;"><strong>Expected Diagnosis:</strong> ' + correctDiagnosis + '</p>' +
        '<p style="color: #1e40af;">Great work completing this clinical case! Consider how the systematic approach helped you reach your diagnosis.</p>' +
        '</div>';
}

// Legacy function compatibility
function startBeginnerCases() {
    // Set only beginner to active
    document.getElementById('beginner-checkbox').checked = true;
    document.getElementById('intermediate-checkbox').checked = false;
    document.getElementById('difficult-checkbox').checked = false;
    updateDifficultyCards();
    startRandomCaseByDifficulty();
}

function startIntermediateCases() {
    // Set only intermediate to active
    document.getElementById('beginner-checkbox').checked = false;
    document.getElementById('intermediate-checkbox').checked = true;
    document.getElementById('difficult-checkbox').checked = false;
    updateDifficultyCards();
    startRandomCaseByDifficulty();
}

function startExpertCases() {
    // Set only difficult to active
    document.getElementById('beginner-checkbox').checked = false;
    document.getElementById('intermediate-checkbox').checked = false;
    document.getElementById('difficult-checkbox').checked = true;
    updateDifficultyCards();
    startRandomCaseByDifficulty();
}

function updateDifficultyCards() {
    ['beginner', 'intermediate', 'difficult'].forEach(difficulty => {
        const toggle = document.getElementById(`${difficulty}-toggle`);
        const checkbox = document.getElementById(`${difficulty}-checkbox`);
        const statusText = toggle.querySelector('.status-text');

        if (checkbox.checked) {
            toggle.classList.remove('inactive');
            toggle.classList.add('active');
            statusText.textContent = 'ACTIVE';
        } else {
            toggle.classList.remove('active');
            toggle.classList.add('inactive');
            statusText.textContent = 'INACTIVE';
        }
    });
}

// Make functions globally available
window.showClinicalCases = showClinicalCases;
window.showClinicalCasesModal = showClinicalCasesModal;
window.showUnlockPrompt = showUnlockPrompt;
window.toggleDifficulty = toggleDifficulty;
window.startRandomCaseByDifficulty = startRandomCaseByDifficulty;
window.showCaseSelection = showCaseSelection;
window.hideCaseSelection = hideCaseSelection;
window.populateCaseGrid = populateCaseGrid;
window.toggleCaseSelection = toggleCaseSelection;
window.selectAllCases = selectAllCases;
window.deselectAllCases = deselectAllCases;
window.startSelectedCases = startSelectedCases;

// Advanced Muscle Localization Lab - Extracted from EMG_NCS_Resident_Tool
window.AdvancedMuscleTest = {
    currentMode: 'regional',
    isTestActive: false,
    currentQuestion: null,
    stats: {
        questionsAnswered: 0,
        correctAnswers: 0,
        currentStreak: 0
    },

    setMode: function(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('selected');
        });
        if (event && event.target) {
            event.target.closest('.mode-card').classList.add('selected');
        }
        console.log('🎯 Training mode set to:', mode);
    },

    startTest: function() {
        this.isTestActive = true;
        // For now, show study cards until we have the full modal
        showStudyCards();
        console.log('🚀 Advanced muscle test started');
    },

    stopTest: function() {
        this.isTestActive = false;
        console.log('⏹️ Advanced muscle test stopped');
    }
};

// EMG Localization Challenge - Extracted from EMG_NCS_Resident_Tool
window.EMGChallenge = {
    currentSettings: {
        difficulty: 'moderate',
        region: 'mixed',
        type: 'localization'
    },
    isActive: false,
    currentCase: null,
    activeQuestionTypes: {
        root: true,
        plexus: true,
        peripheral: true
    },

    lesionSites: {
        UE: {
            'C5 nerve root': { type: 'root', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Infraspinatus'] },
            'C6 nerve root': { type: 'root', muscles: ['Biceps brachii', 'Brachioradialis', 'Extensor carpi radialis'] },
            'C7 nerve root': { type: 'root', muscles: ['Triceps brachii', 'Extensor digitorum', 'Flexor carpi radialis'] },
            'C8 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
            'T1 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Abductor digiti minimi'] },
            'Upper trunk (C5-C6)': { type: 'plexus', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Brachioradialis'] },
            'Lower trunk (C8-T1)': { type: 'plexus', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
            'Posterior cord': { type: 'plexus', muscles: ['Deltoid', 'Triceps brachii', 'Extensor digitorum', 'Brachioradialis'] },
            'Medial cord': { type: 'plexus', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
            'Lateral cord': { type: 'plexus', muscles: ['Biceps brachii', 'Brachialis', 'Pronator teres'] },
            'Median nerve at wrist (carpal tunnel)': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Opponens pollicis'] },
            'Median nerve at forearm': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Flexor pollicis longus', 'Pronator teres', 'Flexor carpi radialis'] },
            'Ulnar nerve at wrist (Guyon canal)': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Abductor digiti minimi', 'Adductor pollicis'] },
            'Ulnar nerve at elbow': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
            'Radial nerve in spiral groove': { type: 'peripheral', muscles: ['Triceps brachii', 'Brachioradialis', 'Extensor digitorum'] },
            'Posterior interosseous nerve': { type: 'peripheral', muscles: ['Extensor digitorum', 'Extensor pollicis longus'] },
            'Axillary nerve': { type: 'peripheral', muscles: ['Deltoid', 'Teres minor'] },
            'Suprascapular nerve': { type: 'peripheral', muscles: ['Supraspinatus', 'Infraspinatus'] }
        },
        LE: {
            'L2 nerve root': { type: 'root', muscles: ['Iliopsoas (psoas major)', 'Adductor longus', 'Sartorius'] },
            'L3 nerve root': { type: 'root', muscles: ['Rectus femoris', 'Vastus medialis', 'Adductor longus'] },
            'L4 nerve root': { type: 'root', muscles: ['Tibialis anterior', 'Rectus femoris', 'Vastus medialis'] },
            'L5 nerve root': { type: 'root', muscles: ['Extensor hallucis longus', 'Tibialis anterior', 'Gluteus medius', 'Biceps femoris (short head)'] },
            'S1 nerve root': { type: 'root', muscles: ['Gastrocnemius', 'Gluteus maximus', 'Biceps femoris (long head)'] },
            'Femoral nerve': { type: 'peripheral', muscles: ['Rectus femoris', 'Vastus medialis', 'Vastus lateralis', 'Sartorius'] },
            'Peroneal nerve at fibular head': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Fibularis longus'] },
            'Deep peroneal nerve': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Extensor digitorum brevis'] },
            'Sciatic nerve': { type: 'peripheral', muscles: ['Biceps femoris (long head)', 'Semitendinosus', 'Gastrocnemius'] },
            'Tibial nerve': { type: 'peripheral', muscles: ['Gastrocnemius', 'Soleus', 'Flexor hallucis longus'] },
            'Superior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus medius', 'Gluteus minimus', 'Tensor fasciae latae'] },
            'Inferior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus maximus'] }
        }
    },

    toggleQuestionType: function(type) {
        console.log('🎯 Toggle called for:', type);
        this.activeQuestionTypes[type] = !this.activeQuestionTypes[type];
        console.log('🎯 Question type toggled:', type, '→', this.activeQuestionTypes[type]);
    },

    startChallenge: function() {
        this.isActive = true;
        console.log('🚀 EMG Challenge started');
        // Show a placeholder message since we don't have the full interface
        alert('🚀 EMG Challenge Starting! Advanced muscle localization challenge with nerve root, plexus, and peripheral nerve lesions.');
    }
};

// Muscle Localization System - Simple Implementation for Region Switching
window.MuscleLocalization = {
    currentRegion: 'upper',

    switchRegion: function(region) {
        console.log(`🎯 Switching to ${region} extremity muscle localization`);
        this.currentRegion = region;

        // Update button states
        document.querySelectorAll('.region-btn').forEach(btn => {
            const btnRegion = btn.dataset.region;
            if (btnRegion === region) {
                btn.classList.add('active');
                btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                btn.style.color = 'white';
            } else {
                btn.classList.remove('active');
                btn.style.background = '#f3f4f6';
                btn.style.color = '#6b7280';
            }
        });

        // Show region-specific message
        alert(`📍 Switched to ${region} extremity muscle localization. Advanced muscle database with complete innervation patterns and clinical correlations available.`);
    }
};

// Study Cards Function - Links to Advanced Muscle Tools
window.showStudyCards = function() {
    console.log('🧬 Launching Advanced Muscle Study Lab...');

    const muscleLabContent = `
        <style>
            /* Advanced Muscle Lab Styling */
            .muscle-lab-hero {
                background: linear-gradient(135deg, rgba(107, 159, 120, 0.15) 0%, rgba(74, 109, 82, 0.15) 100%);
                border-radius: 25px;
                padding: 40px;
                margin: 20px 0;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                text-align: center;
            }
            .hero-title {
                font-size: 2.5rem;
                color: #2c3e50;
                margin-bottom: 15px;
                font-weight: 700;
            }
            .hero-subtitle {
                font-size: 1.1rem;
                color: #6b7280;
                margin-bottom: 25px;
            }
            .hero-stats {
                display: flex;
                justify-content: center;
                gap: 30px;
                flex-wrap: wrap;
            }
            .stat-card {
                background: rgba(254, 252, 243, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px 30px;
                border: 1px solid rgba(107, 159, 120, 0.2);
                min-width: 120px;
            }
            .stat-number {
                font-size: 2rem;
                font-weight: 700;
                color: #6b9f78;
                margin-bottom: 5px;
            }
            .stat-label {
                font-size: 0.9rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .study-controls-bar {
                display: flex;
                gap: 40px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(107, 159, 120, 0.2);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }
            .control-section h4 {
                color: #2c3e50;
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .region-selector, .anatomy-selector {
                display: flex;
                gap: 10px;
            }
            .region-btn, .anatomy-btn {
                padding: 8px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                background: white;
                color: #6b7280;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }
            .region-btn:hover, .anatomy-btn:hover {
                border-color: #6b9f78;
                background: rgba(107, 159, 120, 0.05);
                color: #6b9f78;
            }
            .region-btn.active, .anatomy-btn.active {
                border-color: #6b9f78;
                background: #6b9f78;
                color: white;
                font-weight: 600;
            }

            .quiz-section {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(139, 92, 246, 0.2);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 30px;
            }
            .quiz-header h3 {
                color: #2c3e50;
                margin-bottom: 5px;
            }
            .quiz-header p {
                color: #6b7280;
                margin-bottom: 20px;
            }
            .quiz-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                flex-wrap: wrap;
                gap: 20px;
            }
            .quiz-mode-toggle {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .quiz-mode-toggle label {
                font-weight: 600;
                color: #374151;
            }
            .mode-toggle-btn {
                padding: 8px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                background: white;
                color: #6b7280;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .mode-toggle-btn:hover {
                border-color: #8b5cf6;
                background: rgba(139, 92, 246, 0.05);
                color: #8b5cf6;
            }
            .mode-toggle-btn.active {
                border-color: #8b5cf6;
                background: #8b5cf6;
                color: white;
            }
            .quiz-action-btns {
                display: flex;
                gap: 15px;
            }
            .quiz-start-btn, .quiz-stop-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .quiz-start-btn {
                background: #8b5cf6;
                color: white;
            }
            .quiz-start-btn:hover {
                background: #7c3aed;
                transform: translateY(-2px);
            }
            .quiz-stop-btn {
                background: #ef4444;
                color: white;
            }
            .quiz-stop-btn:hover {
                background: #dc2626;
                transform: translateY(-2px);
            }
            .inline-quiz-area {
                border-top: 1px solid #e5e7eb;
                padding-top: 20px;
            }

            .muscle-anatomy-display-enhanced {
                background: rgba(254, 252, 243, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 20px;
                padding: 25px;
                margin: 20px 0;
                box-shadow: 0 15px 35px rgba(107, 159, 120, 0.2);
                min-height: 400px;
            }

            .muscle-region h3 {
                color: #2c3e50;
                font-size: 1.5rem;
                margin-bottom: 20px;
                text-align: center;
            }

            .muscle-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
            }

            .muscle-card-interactive {
                background: white;
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                padding: 20px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .muscle-card-interactive:hover {
                border-color: #6b9f78;
                box-shadow: 0 8px 25px rgba(107, 159, 120, 0.15);
                transform: translateY(-2px);
            }

            .muscle-card-interactive.expanded {
                border-color: #6b9f78;
                box-shadow: 0 12px 35px rgba(107, 159, 120, 0.2);
                transform: scale(1.02);
            }

            .muscle-header {
                margin-bottom: 15px;
            }

            .muscle-name {
                color: #1e40af;
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0;
            }

            .muscle-controls {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 15px;
            }

            .muscle-btn {
                padding: 6px 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                background: #f9fafb;
                color: #6b7280;
                font-size: 0.8rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .muscle-btn:hover {
                border-color: #6b9f78;
                background: rgba(107, 159, 120, 0.1);
                color: #6b9f78;
            }

            .muscle-btn.active {
                border-color: #6b9f78;
                background: #6b9f78;
                color: white;
            }

            .muscle-btn.show-all {
                background: #3b82f6;
                border-color: #3b82f6;
                color: white;
            }

            .muscle-btn.show-all:hover {
                background: #2563eb;
                border-color: #2563eb;
            }

            .muscle-detail {
                margin-top: 10px;
                padding: 12px;
                border-radius: 8px;
                border-left: 4px solid #6b9f78;
                background: #f8fafc;
                transition: all 0.3s ease;
                opacity: 0;
                transform: translateY(-10px);
            }

            .muscle-detail[style*="display: block"] {
                opacity: 1;
                transform: translateY(0);
            }

            .detail-header {
                margin-bottom: 8px;
            }

            .detail-label {
                font-weight: 600;
                color: #374151;
                font-size: 0.9rem;
            }

            .detail-content {
                color: #1f2937;
                font-size: 0.9rem;
                line-height: 1.4;
            }

            .muscle-test-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10001;
            }

            .muscle-test-content {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 800px;
                width: 90%;
                max-height: 90%;
                overflow-y: auto;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            }

            .muscle-test-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #e5e7eb;
            }

            .test-title h3 {
                color: #1e40af;
                margin: 0;
            }

            .test-stats {
                display: flex;
                gap: 20px;
                margin-top: 10px;
            }

            .test-stats span {
                background: #f3f4f6;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.9rem;
                color: #374151;
            }

            .close-test-btn {
                background: #ef4444;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
            }

            .quiz-question h4 {
                color: #1f2937;
                margin-bottom: 20px;
            }

            .quiz-answer-input {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            }

            .quiz-answer-input input {
                flex: 1;
                padding: 10px;
                border: 2px solid #e5e7eb;
                border-radius: 6px;
                font-size: 1rem;
            }

            .check-answer-btn {
                background: #10b981;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
            }

            .quiz-options {
                display: grid;
                gap: 10px;
                margin-bottom: 20px;
            }

            .quiz-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .quiz-option:hover {
                border-color: #6b9f78;
                background: rgba(107, 159, 120, 0.05);
            }

            .quiz-option.selected {
                border-color: #6b9f78;
                background: rgba(107, 159, 120, 0.1);
            }

            .quiz-feedback {
                margin-top: 20px;
                padding: 15px;
                border-radius: 8px;
            }

            .feedback-result.correct {
                background: #dcfce7;
                border: 1px solid #16a34a;
                color: #15803d;
            }

            .feedback-result.incorrect {
                background: #fef2f2;
                border: 1px solid #dc2626;
                color: #dc2626;
            }

            .next-question-btn {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                margin-top: 10px;
            }

            /* Global Reveal Controls */
            .global-reveal-controls {
                position: relative;
                margin-bottom: 20px;
            }

            .global-reveal-buttons {
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                justify-content: flex-end;
                z-index: 100;
            }

            .global-reveal-btn {
                padding: 8px 12px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                background: white;
                color: #6b7280;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                white-space: nowrap;
            }

            .global-reveal-btn:hover {
                border-color: #6b9f78;
                background: rgba(107, 159, 120, 0.1);
                color: #6b9f78;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .global-reveal-btn.active {
                border-color: #6b9f78;
                background: #6b9f78;
                color: white;
                box-shadow: 0 4px 12px rgba(107, 159, 120, 0.3);
            }

            .global-reveal-btn.reveal-all {
                background: #3b82f6;
                border-color: #3b82f6;
                color: white;
            }

            .global-reveal-btn.reveal-all:hover {
                background: #2563eb;
                border-color: #2563eb;
            }

            .global-reveal-btn.reveal-all.active {
                background: #1d4ed8;
                border-color: #1d4ed8;
            }
        </style>

        <div class="muscle-lab-hero">
            <div class="hero-content">
                <h2 class="hero-title">🧬 Advanced Muscle Laboratory</h2>
                <p class="hero-subtitle">Preston & Shapiro Complete Muscle Database</p>
                <div class="hero-stats">
                    <div class="stat-card">
                        <div class="stat-number">45</div>
                        <div class="stat-label">Muscles</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">∞</div>
                        <div class="stat-label">Questions</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">📈</div>
                        <div class="stat-label">Adaptive</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="study-controls-bar">
            <div class="control-section">
                <h4>Region</h4>
                <div class="region-selector">
                    <button class="region-btn active" data-region="lower" onclick="MuscleAnatomy.switchAnatomy('lower')">
                        🦵 Lower Extremity
                    </button>
                    <button class="region-btn" data-region="upper" onclick="MuscleAnatomy.switchAnatomy('upper')">
                        💪 Upper Extremity
                    </button>
                </div>
            </div>

            <div class="control-section">
                <h4>Anatomy Display</h4>
                <div class="anatomy-selector">
                    <button class="anatomy-btn active" data-anatomy="nerve" onclick="MuscleAnatomy.setAnatomyType('nerve')">
                        Nerve
                    </button>
                    <button class="anatomy-btn" data-anatomy="roots" onclick="MuscleAnatomy.setAnatomyType('roots')">
                        Roots
                    </button>
                    <button class="anatomy-btn" data-anatomy="cord" onclick="MuscleAnatomy.setAnatomyType('cord')">
                        Cord/Trunk
                    </button>
                    <button class="anatomy-btn" data-anatomy="actions" onclick="MuscleAnatomy.setAnatomyType('actions')">
                        Actions
                    </button>
                </div>
            </div>
        </div>

        <div class="quiz-section">
            <div class="quiz-header">
                <h3>🧪 Interactive Quiz</h3>
                <p>Test your knowledge with adaptive questions</p>
            </div>

            <div class="quiz-controls">
                <div class="quiz-mode-toggle">
                    <label>Quiz Mode:</label>
                    <button class="mode-toggle-btn" data-mode="type" onclick="MuscleAnatomy.setQuizMode('type')">
                        Type Answer
                    </button>
                    <button class="mode-toggle-btn active" data-mode="multiple" onclick="MuscleAnatomy.setQuizMode('multiple')">
                        Multiple Choice
                    </button>
                </div>
                <div class="quiz-action-btns">
                    <button class="quiz-start-btn" onclick="MuscleAnatomy.startInlineQuiz()">
                        Start Quiz
                    </button>
                    <button class="quiz-stop-btn" onclick="MuscleAnatomy.stopInlineQuiz()" style="display: none;">
                        Stop Quiz
                    </button>
                </div>
            </div>

            <div id="inline-quiz-area" class="inline-quiz-area" style="display: none;">
                <!-- Quiz content will be populated here -->
            </div>
        </div>

        <!-- Global Reveal Controls -->
        <div class="global-reveal-controls">
            <div class="global-reveal-buttons">
                <button class="global-reveal-btn reveal-all" onclick="MuscleAnatomy.globalRevealAll()" title="Show/Hide All Details">
                    📖 Reveal All
                </button>
                <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('nerve')" title="Show/Hide All Nerve Information">
                    🔌 All Nerves
                </button>
                <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('roots')" title="Show/Hide All Nerve Roots">
                    🌿 All Roots
                </button>
                <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('cord')" title="Show/Hide All Cord/Trunk Information">
                    🕸️ All Cords/Trunks
                </button>
                <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('actions')" title="Show/Hide All Muscle Actions">
                    💪 All Actions
                </button>
            </div>
        </div>

        <div id="muscle-anatomy-display" class="muscle-anatomy-display-enhanced">
            <!-- Muscles will be displayed here -->
        </div>


        <!-- Muscle Test Modal -->
        <div id="muscle-test-modal" class="muscle-test-modal" style="display: none;">
            <div class="muscle-test-content">
                <div class="muscle-test-header">
                    <div class="test-title">
                        <h3>🧪 Continuous Muscle Anatomy Quiz</h3>
                        <div class="test-stats">
                            <span id="questions-answered">Questions: 0</span>
                            <span id="current-accuracy">Accuracy: 0%</span>
                        </div>
                    </div>
                    <button class="close-test-btn" onclick="MuscleAnatomy.stopMuscleTest()">✕ Stop Quiz</button>
                </div>

                <div class="muscle-test-body" id="muscle-test-body">
                    <div class="test-question">
                        <h4 id="question-text">Loading question...</h4>
                        <div id="answer-choices" class="answer-choices">
                            <!-- Multiple choice options will be populated here -->
                        </div>
                    </div>

                    <div id="answer-feedback" class="answer-feedback" style="display: none;">
                        <div class="feedback-content">
                            <div id="feedback-result"></div>
                            <div id="feedback-explanation"></div>
                        </div>
                        <button id="next-question-btn" class="next-question-btn" onclick="MuscleAnatomy.nextQuestion()">Next Question →</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    showModal('🧬 Advanced Muscle Study Lab', muscleLabContent);

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (window.MuscleAnatomy) {
            console.log('🧬 Initializing MuscleAnatomy...', window.MuscleAnatomy);
            console.log('🧬 Muscle database size:', Object.keys(window.MuscleAnatomy.muscleDatabase).length);
            MuscleAnatomy.initializeDisplay();
        } else {
            console.error('❌ MuscleAnatomy object not found!');
        }
    }, 500);
};

// Complete MuscleAnatomy Object - Preston & Shapiro Database
window.MuscleAnatomy = {
    currentRegion: 'lower',
    currentAnatomyType: 'nerve',
    inlineQuizActive: false,
    quizMode: 'multiple', // 'type' or 'multiple'
    selectedQuizAnswer: null,
    testData: {
        questionsAnswered: 0,
        correctAnswers: 0,
        missedQuestions: [],
        usedMuscles: new Set(),
        isActive: false
    },

    // Complete Muscle Database - Preston & Shapiro
    muscleDatabase: {
        // Upper Extremity Muscles
        'Trapezius (upper)': { nerve: 'Spinal accessory', roots: ['C3', 'C4'], region: 'UE', peripheralNerve: 'Spinal accessory', cord: 'N/A (cranial nerve)', actions: 'Shoulder elevation, scapular retraction' },
        'Rhomboids': { nerve: 'Dorsal scapular', roots: ['C5'], region: 'UE', peripheralNerve: 'Dorsal scapular', cord: 'Upper trunk', actions: 'Scapular retraction and downward rotation' },
        'Serratus anterior': { nerve: 'Long thoracic', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Long thoracic', cord: 'Upper/Middle trunk', actions: 'Scapular protraction and upward rotation' },
        'Supraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'Upper trunk', actions: 'Shoulder abduction initiation' },
        'Infraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'Upper trunk', actions: 'Shoulder external rotation' },
        'Teres minor': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder external rotation' },
        'Deltoid': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder abduction, flexion, extension' },
        'Biceps brachii': { nerve: 'Musculocutaneous', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral cord', actions: 'Elbow flexion, forearm supination' },
        'Brachialis': { nerve: 'Musculocutaneous/Radial', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral/Posterior cord', actions: 'Elbow flexion' },
        'Brachioradialis': { nerve: 'Radial', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow flexion, forearm rotation' },
        'Subscapularis': { nerve: 'Subscapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Subscapular', cord: 'Posterior cord', actions: 'Shoulder internal rotation' },
        'Extensor carpi radialis': { nerve: 'Radial', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Wrist extension and radial deviation' },
        'Pronator teres': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Forearm pronation, elbow flexion' },
        'Flexor carpi radialis': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Wrist flexion and radial deviation' },
        'Pectoralis major': { nerve: 'Pectoral', roots: ['C5', 'C6', 'C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Pectoral', cord: 'Lateral/Medial cord', actions: 'Shoulder adduction, internal rotation' },
        'Latissimus dorsi': { nerve: 'Thoracodorsal', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Thoracodorsal', cord: 'Posterior cord', actions: 'Shoulder adduction, extension, internal rotation' },
        'Triceps brachii': { nerve: 'Radial', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow extension' },
        'Extensor digitorum': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Finger extension at MCP joints' },
        'Extensor pollicis longus': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Thumb extension and retropulsion' },
        'Flexor digitorum superficialis': { nerve: 'Median', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at PIP joints' },
        'Flexor digitorum profundus (digits 2&3)': { nerve: 'Anterior interosseous', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at DIP joints (index, middle)' },
        'Flexor digitorum profundus (digits 4&5)': { nerve: 'Ulnar', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Finger flexion at DIP joints (ring, little)' },
        'Flexor carpi ulnaris': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Wrist flexion and ulnar deviation' },
        'Flexor pollicis longus': { nerve: 'Anterior interosseous', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb flexion at IP joint' },
        'Abductor pollicis brevis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb abduction' },
        'Opponens pollicis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb opposition' },
        'Adductor pollicis': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Thumb adduction' },
        'First dorsal interosseous': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Index finger abduction' },
        'Abductor digiti minimi': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Little finger abduction' },

        // Lower Extremity Muscles - Complete Database
        'Gluteus maximus': { nerve: 'Inferior gluteal', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Inferior gluteal', actions: 'Hip extension, lateral rotation, upper fibers assist in abduction' },
        'Gluteus medius': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation (anterior fibers), lateral rotation (posterior fibers)' },
        'Gluteus minimus': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation, stabilizes pelvis' },
        'Tensor fasciae latae': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip flexion, abduction, medial rotation, stabilizes IT band' },
        'Piriformis': { nerve: 'Nerve to piriformis', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Piriformis', actions: 'Hip lateral rotation, abduction when hip is flexed' },
        'Rectus femoris': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension, hip flexion' },
        'Vastus lateralis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
        'Vastus medialis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
        'Vastus intermedius': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
        'Sartorius': { nerve: 'Femoral', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion, abduction, external rotation; knee flexion' },
        'Iliopsoas': { nerve: 'Lumbar plexus/Femoral', roots: ['L1', 'L2', 'L3'], region: 'LE', peripheralNerve: 'Lumbar plexus', actions: 'Hip flexion, stabilizes lumbar spine' },
        'Adductor longus': { nerve: 'Obturator', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, flexion' },
        'Adductor magnus': { nerve: 'Obturator/Sciatic', roots: ['L2', 'L3', 'L4', 'L5'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, extension (posterior fibers)' },
        'Gracilis': { nerve: 'Obturator', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, knee flexion' },
        'Biceps femoris': { nerve: 'Sciatic', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
        'Semitendinosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
        'Semimembranosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
        'Tibialis anterior': { nerve: 'Deep peroneal', roots: ['L4', 'L5'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle dorsiflexion, foot inversion' },
        'Extensor digitorum longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Toe extension, ankle dorsiflexion' },
        'Extensor hallucis longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Great toe extension, ankle dorsiflexion' },
        'Fibularis longus': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle plantarflexion, foot eversion' },
        'Fibularis brevis': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Foot eversion' },
        'Gastrocnemius': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, knee flexion' },
        'Soleus': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion' },
        'Tibialis posterior': { nerve: 'Tibial', roots: ['L4', 'L5'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, foot inversion' },
        'Flexor digitorum longus': { nerve: 'Tibial', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Toe flexion, ankle plantarflexion' },
        'Flexor hallucis longus': { nerve: 'Tibial', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe flexion, ankle plantarflexion' }
    },

    initializeDisplay() {
        this.displayMuscles('lower');
    },

    switchAnatomy(region) {
        this.currentRegion = region;
        this.displayMuscles(region);

        // Update button states
        document.querySelectorAll('.region-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-region="${region}"]`).classList.add('active');
    },

    displayMuscles(region) {
        const display = document.getElementById('muscle-anatomy-display');
        console.log('🧬 displayMuscles called with region:', region);
        console.log('🧬 Display element found:', !!display);
        if (!display) {
            console.error('❌ muscle-anatomy-display element not found!');
            return;
        }

        const muscles = Object.entries(this.muscleDatabase).filter(([name, data]) =>
            data.region === (region === 'upper' ? 'UE' : 'LE')
        );
        console.log('🧬 Filtered muscles for region', region, ':', muscles.length);

        const regionName = region === 'upper' ? 'Upper Extremity' : 'Lower Extremity';
        const regionEmoji = region === 'upper' ? '💪' : '🦵';

        let html = `
            <div class="muscle-region">
                <h3>${regionEmoji} ${regionName} Muscles</h3>
                <div class="muscle-grid">
        `;

        muscles.forEach(([muscleName, muscleData]) => {
            html += `
                <div class="muscle-card-interactive" data-muscle="${muscleName}">
                    <div class="muscle-header">
                        <h4 class="muscle-name">${muscleName}</h4>
                    </div>

                    <div class="muscle-controls">
                        <button class="muscle-btn nerve" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'nerve')" title="Show Nerve Supply">
                            Nerve
                        </button>
                        <button class="muscle-btn roots" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'roots')" title="Show Nerve Roots">
                            Roots
                        </button>
                        <button class="muscle-btn cord" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'cord')" title="Show Cord/Trunk">
                            Cord/Trunk
                        </button>
                        <button class="muscle-btn actions" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'actions')" title="Show Actions">
                            Actions
                        </button>
                        <button class="muscle-btn show-all" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'all')" title="Show All Details">
                            Show All
                        </button>
                    </div>

                    <div class="muscle-detail nerve-detail" data-type="nerve" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Nerve Supply</span>
                        </div>
                        <div class="detail-content">${muscleData.peripheralNerve}</div>
                    </div>

                    <div class="muscle-detail roots-detail" data-type="roots" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Nerve Roots</span>
                        </div>
                        <div class="detail-content">${muscleData.roots.join(', ')}</div>
                    </div>

                    <div class="muscle-detail cord-detail" data-type="cord" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Cord/Trunk</span>
                        </div>
                        <div class="detail-content">${muscleData.cord || 'Not applicable'}</div>
                    </div>

                    <div class="muscle-detail actions-detail" data-type="actions" style="display: none;">
                        <div class="detail-header">
                            <span class="detail-label">Primary Actions</span>
                        </div>
                        <div class="detail-content">${muscleData.actions}</div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        display.innerHTML = html;
    },

    toggleDetail(muscleName, type) {
        const card = Array.from(document.querySelectorAll('[data-muscle]')).find(el => el.dataset.muscle === muscleName);
        if (!card) return;

        if (type === 'all') {
            const details = card.querySelectorAll('.muscle-detail');
            const buttons = card.querySelectorAll('.muscle-btn:not(.show-all)');
            const showAllBtn = card.querySelector('.muscle-btn.show-all');
            const isAllShown = Array.from(details).every(detail => detail.style.display === 'block');

            details.forEach(detail => {
                detail.style.display = isAllShown ? 'none' : 'block';
            });

            buttons.forEach(btn => {
                if (isAllShown) {
                    btn.classList.remove('active');
                } else {
                    btn.classList.add('active');
                }
            });

            if (showAllBtn) {
                showAllBtn.textContent = isAllShown ? 'Show All' : 'Hide All';
                showAllBtn.classList.toggle('active');
            }
        } else {
            const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
            const button = card.querySelector(`.muscle-btn.${type}`);

            if (detail && button) {
                const isVisible = detail.style.display === 'block';
                detail.style.display = isVisible ? 'none' : 'block';
                button.classList.toggle('active');
            }
        }

        const visibleDetails = card.querySelectorAll('.muscle-detail[style*="display: block"]');
        if (visibleDetails.length > 0) {
            card.classList.add('expanded');
        } else {
            card.classList.remove('expanded');
        }
    },

    setAnatomyType(type) {
        this.currentAnatomyType = type;

        document.querySelectorAll('.anatomy-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-anatomy="${type}"]`).classList.add('active');

        this.displayMuscles(this.currentRegion);
    },

    setQuizMode(mode) {
        this.quizMode = mode;

        document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    },

    startInlineQuiz() {
        this.inlineQuizActive = true;

        document.getElementById('inline-quiz-area').style.display = 'block';
        document.querySelector('.quiz-start-btn').style.display = 'none';
        document.querySelector('.quiz-stop-btn').style.display = 'block';

        this.generateInlineQuestion();
    },

    stopInlineQuiz() {
        this.inlineQuizActive = false;

        document.getElementById('inline-quiz-area').style.display = 'none';
        document.querySelector('.quiz-start-btn').style.display = 'block';
        document.querySelector('.quiz-stop-btn').style.display = 'none';
    },

    generateInlineQuestion() {
        const muscles = Object.keys(this.muscleDatabase);
        const muscle = muscles[Math.floor(Math.random() * muscles.length)];
        const quizArea = document.getElementById('inline-quiz-area');

        if (this.quizMode === 'type') {
            quizArea.innerHTML = `
                <div class="quiz-question">
                    <h4>What is the ${this.getAnatomyLabel()} of ${muscle}?</h4>
                    <div class="quiz-answer-input">
                        <input type="text" id="quiz-answer" placeholder="Enter your answer..." />
                        <button onclick="MuscleAnatomy.checkInlineAnswer('${muscle}')" class="check-answer-btn">Check Answer</button>
                    </div>
                    <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
                </div>
            `;

            setTimeout(() => {
                document.getElementById('quiz-answer').focus();
            }, 100);

        } else {
            const correctAnswer = this.getCorrectAnswer(muscle);
            const options = this.generateQuizOptions(muscle, correctAnswer);

            quizArea.innerHTML = `
                <div class="quiz-question">
                    <h4>What is the ${this.getAnatomyLabel()} of ${muscle}?</h4>
                    <div class="quiz-options">
                        ${options.map((option, index) => `
                            <div class="quiz-option" onclick="MuscleAnatomy.selectQuizOption('${option}', '${muscle}')">
                                <input type="radio" name="quiz-choice" id="option-${index}" value="${option}">
                                <label for="option-${index}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                    <button onclick="MuscleAnatomy.checkInlineAnswer('${muscle}')" class="check-answer-btn" disabled id="check-multiple-btn">Check Answer</button>
                    <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
                </div>
            `;
        }
    },

    getCorrectAnswer(muscle) {
        const muscleData = this.muscleDatabase[muscle];
        switch(this.currentAnatomyType) {
            case 'nerve':
                return muscleData.peripheralNerve;
            case 'roots':
                return muscleData.roots.join(', ');
            case 'cord':
                return muscleData.cord || 'Not applicable';
            case 'actions':
                return muscleData.actions;
            default:
                return muscleData.peripheralNerve;
        }
    },

    generateQuizOptions(muscle, correctAnswer) {
        const allMuscles = Object.keys(this.muscleDatabase);
        const distractors = [];

        while (distractors.length < 3) {
            const randomMuscle = allMuscles[Math.floor(Math.random() * allMuscles.length)];
            if (randomMuscle !== muscle) {
                const distractorAnswer = this.getCorrectAnswer(randomMuscle);
                if (!distractors.includes(distractorAnswer) && distractorAnswer !== correctAnswer) {
                    distractors.push(distractorAnswer);
                }
            }
        }

        const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
        return options;
    },

    selectQuizOption(answer, muscle) {
        document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        event.target.closest('.quiz-option').classList.add('selected');

        this.selectedQuizAnswer = answer;
        document.getElementById('check-multiple-btn').disabled = false;
    },

    getAnatomyLabel() {
        switch(this.currentAnatomyType) {
            case 'nerve': return 'peripheral nerve';
            case 'roots': return 'nerve roots';
            case 'cord': return 'brachial plexus cord/trunk';
            case 'actions': return 'primary actions';
            default: return 'nerve supply';
        }
    },

    checkInlineAnswer(muscle) {
        const correctAnswer = this.getCorrectAnswer(muscle);
        const feedbackEl = document.getElementById('quiz-feedback');
        let userAnswer, isCorrect;

        if (this.quizMode === 'type') {
            userAnswer = document.getElementById('quiz-answer').value.trim();
            isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase().split(' ')[0]);
        } else {
            userAnswer = this.selectedQuizAnswer || 'No answer selected';
            isCorrect = userAnswer === correctAnswer;
        }

        feedbackEl.innerHTML = `
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                <p><strong>Correct answer:</strong> ${correctAnswer}</p>
                <button onclick="MuscleAnatomy.generateInlineQuestion()" class="next-question-btn">Next Question</button>
            </div>
        `;
        feedbackEl.style.display = 'block';

        this.selectedQuizAnswer = null;
    },

    startMuscleTest() {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.testData.questionsAnswered = 0;
        this.testData.correctAnswers = 0;
        this.testData.missedQuestions = [];
        this.testData.usedMuscles = new Set();
        this.testData.isActive = true;

        const modal = document.getElementById('muscle-test-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.getElementById('muscle-test-body').style.display = 'block';
            document.getElementById('answer-feedback').style.display = 'none';

            this.updateTestStats();
            this.generateNextQuestion();
        }
    },

    stopMuscleTest() {
        this.testData.isActive = false;
        const modal = document.getElementById('muscle-test-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    generateNextQuestion() {
        if (!this.testData.isActive) return;

        const muscles = Object.keys(this.muscleDatabase);
        let muscle;

        const availableMuscles = muscles.filter(m => !this.testData.usedMuscles.has(m));
        if (availableMuscles.length === 0) {
            this.testData.usedMuscles.clear();
            muscle = muscles[Math.floor(Math.random() * muscles.length)];
        } else {
            muscle = availableMuscles[Math.floor(Math.random() * availableMuscles.length)];
        }

        this.testData.usedMuscles.add(muscle);
        const correctAnswer = this.getCorrectAnswer(muscle);
        const options = this.generateQuizOptions(muscle, correctAnswer);

        document.getElementById('question-text').textContent = `What is the ${this.getAnatomyLabel()} of ${muscle}?`;

        const choicesDiv = document.getElementById('answer-choices');
        choicesDiv.innerHTML = options.map((option, index) => `
            <div class="quiz-option" onclick="MuscleAnatomy.submitTestAnswer('${option}', '${correctAnswer}', '${muscle}')">
                <input type="radio" name="test-choice" id="test-option-${index}" value="${option}">
                <label for="test-option-${index}">${option}</label>
            </div>
        `).join('');

        document.getElementById('answer-feedback').style.display = 'none';
    },

    submitTestAnswer(userAnswer, correctAnswer, muscle) {
        const isCorrect = userAnswer === correctAnswer;

        this.testData.questionsAnswered++;
        if (isCorrect) {
            this.testData.correctAnswers++;
        } else {
            this.testData.missedQuestions.push({
                muscle: muscle,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            });
        }

        const feedbackDiv = document.getElementById('answer-feedback');
        feedbackDiv.innerHTML = `
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                <p><strong>Correct answer:</strong> ${correctAnswer}</p>
            </div>
        `;
        feedbackDiv.style.display = 'block';

        this.updateTestStats();
    },

    nextQuestion() {
        this.generateNextQuestion();
    },

    updateTestStats() {
        const questionsElem = document.getElementById('questions-answered');
        const accuracyElem = document.getElementById('current-accuracy');

        if (questionsElem) questionsElem.textContent = `Questions: ${this.testData.questionsAnswered}`;

        if (accuracyElem) {
            const accuracy = this.testData.questionsAnswered > 0 ?
                Math.round((this.testData.correctAnswers / this.testData.questionsAnswered) * 100) : 0;
            accuracyElem.textContent = `Accuracy: ${accuracy}%`;
        }
    },

    // Global reveal functions
    globalRevealAll() {
        const allCards = document.querySelectorAll('.muscle-card-interactive');
        const revealAllBtn = document.querySelector('.global-reveal-btn.reveal-all');

        if (allCards.length === 0) return;

        // Check if any details are currently visible
        const anyVisible = Array.from(allCards).some(card =>
            card.querySelectorAll('.muscle-detail[style*="display: block"]').length > 0
        );

        // Toggle all details
        allCards.forEach(card => {
            const details = card.querySelectorAll('.muscle-detail');
            const buttons = card.querySelectorAll('.muscle-btn:not(.show-all)');
            const showAllBtn = card.querySelector('.muscle-btn.show-all');

            details.forEach(detail => {
                detail.style.display = anyVisible ? 'none' : 'block';
            });

            buttons.forEach(btn => {
                if (anyVisible) {
                    btn.classList.remove('active');
                } else {
                    btn.classList.add('active');
                }
            });

            if (showAllBtn) {
                showAllBtn.textContent = anyVisible ? 'Show All' : 'Hide All';
                showAllBtn.classList.toggle('active', !anyVisible);
            }

            if (!anyVisible) {
                card.classList.add('expanded');
            } else {
                card.classList.remove('expanded');
            }
        });

        // Update button state
        revealAllBtn.classList.toggle('active', !anyVisible);
        revealAllBtn.textContent = anyVisible ? '📖 Reveal All' : '📖 Hide All';

        console.log('🔍 Global reveal all:', !anyVisible ? 'shown' : 'hidden');
    },

    globalRevealType(type) {
        const allCards = document.querySelectorAll('.muscle-card-interactive');
        const typeBtn = document.querySelector(`[onclick="MuscleAnatomy.globalRevealType('${type}')"]`);

        if (allCards.length === 0) return;

        // Check if this type is currently visible on any card
        const anyTypeVisible = Array.from(allCards).some(card =>
            card.querySelector(`.muscle-detail[data-type="${type}"][style*="display: block"]`)
        );

        // Toggle this specific type across all cards
        allCards.forEach(card => {
            const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
            const button = card.querySelector(`.muscle-btn.${type}`);

            if (detail && button) {
                detail.style.display = anyTypeVisible ? 'none' : 'block';
                button.classList.toggle('active', !anyTypeVisible);
            }

            // Update card expansion state
            const visibleDetails = card.querySelectorAll('.muscle-detail[style*="display: block"]');
            if (visibleDetails.length > 0) {
                card.classList.add('expanded');
            } else {
                card.classList.remove('expanded');
            }
        });

        // Update button state
        typeBtn.classList.toggle('active', !anyTypeVisible);

        // Update button text based on type
        const buttonTexts = {
            nerve: anyTypeVisible ? '🔌 All Nerves' : '🔌 Hide Nerves',
            roots: anyTypeVisible ? '🌿 All Roots' : '🌿 Hide Roots',
            cord: anyTypeVisible ? '🕸️ All Cords/Trunks' : '🕸️ Hide Cords/Trunks',
            actions: anyTypeVisible ? '💪 All Actions' : '💪 Hide Actions'
        };

        typeBtn.textContent = buttonTexts[type];

        console.log(`🔍 Global reveal ${type}:`, !anyTypeVisible ? 'shown' : 'hidden');
    }
};

// Generate Clinical Cases System Content
function generateClinicalCasesSystemContent(module) {
    return `
        <div class="clinical-cases-main">
            <div class="clinical-header">
                <h3>🎯 Clinical Cases System</h3>
                <p>Practice clinical reasoning with our 5-stage case evaluation system</p>
            </div>

            <div class="case-selection-grid">
                <div class="case-card" onclick="startClinicalCase('hand14')">
                    <div class="case-card-header">
                        <span class="case-difficulty beginner">BEGINNER</span>
                        <span class="case-number">#1</span>
                    </div>
                    <h4>Hand Numbness/Tingling (Digits 1-4)</h4>
                    <p>45F Administrative Assistant with 3-month history of numbness and tingling</p>
                    <div class="case-stages">
                        <span>📋 History</span>
                        <span>🔍 Physical Exam</span>
                        <span>🧠 Differential</span>
                        <span>⚖️ EMG Decision</span>
                        <span>🎯 Diagnosis</span>
                    </div>
                </div>

                <div class="case-card" onclick="startClinicalCase('footdrop')">
                    <div class="case-card-header">
                        <span class="case-difficulty intermediate">INTERMEDIATE</span>
                        <span class="case-number">#2</span>
                    </div>
                    <h4>Foot Drop</h4>
                    <p>32M Marathon Runner with progressive foot drop and leg weakness</p>
                    <div class="case-stages">
                        <span>📋 History</span>
                        <span>🔍 Physical Exam</span>
                        <span>🧠 Differential</span>
                        <span>⚖️ EMG Decision</span>
                        <span>🎯 Diagnosis</span>
                    </div>
                </div>

                <div class="case-card" onclick="startClinicalCase('radialneuropathy')">
                    <div class="case-card-header">
                        <span class="case-difficulty difficult">ADVANCED</span>
                        <span class="case-number">#3</span>
                    </div>
                    <h4>Progressive Weakness</h4>
                    <p>58F Teacher with progressive proximal weakness and muscle fatigue</p>
                    <div class="case-stages">
                        <span>📋 History</span>
                        <span>🔍 Physical Exam</span>
                        <span>🧠 Differential</span>
                        <span>⚖️ EMG Decision</span>
                        <span>🎯 Diagnosis</span>
                    </div>
                </div>
            </div>

            <div class="clinical-instructions">
                <h4>🎓 How the 5-Stage System Works:</h4>
                <div class="stage-explanation">
                    <div class="stage-item">
                        <span class="stage-icon">📋</span>
                        <div>
                            <strong>Stage 1: History</strong>
                            <p>Review patient presentation, chief complaint, and medical history</p>
                        </div>
                    </div>
                    <div class="stage-item">
                        <span class="stage-icon">🔍</span>
                        <div>
                            <strong>Stage 2: Physical Exam</strong>
                            <p>Analyze examination findings including strength, sensation, and reflexes</p>
                        </div>
                    </div>
                    <div class="stage-item">
                        <span class="stage-icon">🧠</span>
                        <div>
                            <strong>Stage 3: Differential Diagnosis</strong>
                            <p>Build your differential diagnosis based on clinical findings</p>
                        </div>
                    </div>
                    <div class="stage-item">
                        <span class="stage-icon">⚖️</span>
                        <div>
                            <strong>Stage 4: EMG/NCS Decision</strong>
                            <p>Decide whether EMG/NCS studies are indicated for this case</p>
                        </div>
                    </div>
                    <div class="stage-item">
                        <span class="stage-icon">🎯</span>
                        <div>
                            <strong>Stage 5: Final Diagnosis</strong>
                            <p>Integrate all findings to reach your final diagnosis</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to start a clinical case with 5-stage system
function startClinicalCase(caseId) {
    // Close the current modal
    const currentModal = document.querySelector('.learning-modal-overlay.active');
    if (currentModal) {
        currentModal.classList.remove('active');
        setTimeout(() => {
            currentModal.remove();
        }, 300);
    }

    // Show the general modal with clinical case interface
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-body');

    if (!modalOverlay || !modalTitle || !modalContent) {
        console.error('Modal elements not found');
        return;
    }

    modalTitle.textContent = 'Clinical Case Evaluation';

    // Get case data - use existing case database
    const caseData = window.caseDatabase && window.caseDatabase[caseId];
    if (!caseData) {
        console.error('❌ Case Data Error - Case not found:', caseId, 'Available cases:', window.caseDatabase ? Object.keys(window.caseDatabase) : 'No caseDatabase');
        return;
    }

    // Generate the 5-stage interface
    modalContent.innerHTML = generateCaseInterface(caseData, caseId);

    // Ensure any clinical cases selection UI is hidden when running a case
    const difficultySelector = document.querySelector('.difficulty-selector');
    if (difficultySelector) {
        difficultySelector.style.display = 'none';
    }

    // Show the modal
    modalOverlay.style.display = 'flex';

    // Scroll to top
    modalContent.scrollTop = 0;
}

window.startCase = startCase;
window.checkDifferential = checkDifferential;
window.checkDiagnosis = checkDiagnosis;
window.showExplanation = showExplanation;
window.hideCaseInterface = hideCaseInterface;
window.startBeginnerCases = startBeginnerCases;
window.startIntermediateCases = startIntermediateCases;
window.startExpertCases = startExpertCases;
window.updateCaseDisplay = updateCaseDisplay;
window.startClinicalCase = startClinicalCase;
window.toggleAnatomyInfo = toggleAnatomyInfo;
window.generateLearningContentByType = generateLearningContentByType;

// ============================================================================
// EMG NEEDLE LOCALIZATION GUIDE SYSTEM
// Complete implementation with muscle database and interactive UI
// ============================================================================

// EMG Needle Localization Database - From PDF Analysis
window.EMGLocalizationDatabase = {
    upperExtremity: {
        "APB": {
            fullName: "Abductor Pollicis Brevis",
            innervation: "Ulnar Nerve, Medial Cord, Anterior Division, Lower Trunk, C8, T1",
            origin: "Lateral border of the third metacarpal",
            insertion: "Medial side of the base of the proximal phalanx",
            position: "Hand in full pronation, thumb in radial abduction",
            electrodeInsertion: "At the free edge of the first web space. The needle is directed toward the proximal end of the first metacarpal bone",
            testManeuver: "Adduct the thumb",
            pitfalls: "If the electrode is inserted too dorsally it will be in the first dorsal interosseus; if too volarly it will be in the opponens pollicis",
            comments: "The most distal muscle innervated by the ulnar nerve. Paresis or paralysis of this muscle results in Froment's sign (substitution of flexor pollicis longus on attempted adduction of thumb). May be involved in ulnar entrapment syndromes (Guyon's Tunnel; cubital tunnel; tardy ulnar palsy; cervical rib) and Klumpke's palsy (avulsion of C8, T1 nerve roots). This muscle is a powerful adductor of the thumb and greatly contributes in the strength of the grasp."
        },
        "Bicep": {
            fullName: "Biceps Brachii",
            innervation: "Musculocutaneous Nerve, Lateral Cord, Anterior Division, Upper Trunk, C5, C6",
            origin: "Long Head: From the supraglenoid tuberosity of scapula. Short Head: From the apex of the coracoid process of the scapula",
            insertion: "On the bicipital tuberosity of the radius",
            position: "The patient supine with the arm extended",
            electrodeInsertion: "Into the bulk of the muscle in mid-arm",
            testManeuver: "To flex or to supinate the forearm",
            pitfalls: "If the needle electrode is inserted too deeply it will be in the brachialis",
            comments: "Frequently used as recording muscle for musculocutaneous nerve motor conduction study. This muscle gets involved in entrapment of the musculocutaneous nerve as it courses through the coracobrachialis muscle. It also gets involved in upper brachial plexus lesions and in high cervical radiculopathies. Excessive traction of the baby head during delivery may produce an elongation of the upper brachial plexus resulting in paralysis of this muscle (obstetrical paralysis or Bell's palsy). The biceps shows a dual function: as a strong supinator of the forearm and a powerful elbow flexor. These two functions can be carried out separately."
        },
        "EIP": {
            fullName: "Extensor Indicis Proprius",
            innervation: "Posterior Interosseus Nerve, Radial Nerve, Posterior Cord, Posterior Division, Middle and Lower Trunk, C7, C8",
            origin: "Dorsal surface of lower half of ulnar shaft below the origin of the extensor pollicis longus",
            insertion: "Joins ulnar side of tendon of extensor digitorum communis, which goes to index finger; terminates in extensor expansion",
            position: "The forearm fully prorated",
            electrodeInsertion: "Two fingerbreadths proximal to ulnar styloid (UL. ST.) just radial to ulnar at a depth of one-half inch",
            testManeuver: "Extend finger with flexion of other fingers",
            pitfalls: "If needle electrode is inserted too radially it will be in the abductor pollicis longus; if inserted too proximally it will be in the extensor digitorum communis",
            comments: "Usually it is the most distal radial nerve innervated muscle (at times the extensor pollicis longus occupies this position). Tendon occupies the fourth compartment on dorsum of wrist with extensor digitorum communis. Used as recording muscle in radial nerve motor conduction studies. Involved in posterior interosseus and more proximal radial nerve injuries ('Saturday night' palsy and crutch palsy). This muscle acting in conjunction with the extensor digitorum, extends the index finger at the M.P. joint and at the proximal interphalangeal joint. It can work in an isolated fashion, as when the hand is kept in a fist and the index finger is pointing."
        },
        "FDI": {
            fullName: "First Dorsal Interosseus",
            innervation: "Ulnar Nerve, Medial Cord, Anterior Division, Lower Trunk, C8, T1",
            origin: "Lateral border of the third metacarpal",
            insertion: "Medial side of the base of the proximal phalanx",
            position: "Hand in full pronation, thumb in radial abduction",
            electrodeInsertion: "At the free edge of the first web space. The needle is directed toward the proximal end of the first metacarpal bone",
            testManeuver: "Adduct the thumb",
            pitfalls: "If the electrode is inserted too dorsally it will be in the first dorsal interosseus; if too volarly it will be in the opponens pollicis",
            comments: "The most distal muscle innervated by the ulnar nerve. Paresis or paralysis of this muscle results in Froment's sign (substitution of flexor pollicis longus on attempted adduction of thumb). May be involved in ulnar entrapment syndromes (Guyon's Tunnel; cubital tunnel; tardy ulnar palsy; cervical rib) and Klumpke's palsy (avulsion of C8, T1 nerve roots). This muscle is a powerful adductor of the thumb and greatly contributes in the strength of the grasp."
        },
        "Middle Deltoid": {
            fullName: "Deltoid, Middle",
            innervation: "Axillary Nerve, Posterior Cord, Posterior Division, Upper Trunk, C5, C6",
            origin: "Acromion",
            insertion: "Deltoid tubercle of the humerus",
            position: "Patient supine with arm at side",
            electrodeInsertion: "Halfway between the tip of the acromion (A) and the deltoid tubercle (DT)",
            testManeuver: "Abduction of arm",
            pitfalls: "None",
            comments: "Generally used as recording muscle in axillary nerve motor conduction study. If patient has a history of multiple injections into this muscle electromyographic findings may be misleading. Involved in axillary nerve injuries secondary to fractures, or joint dislocations and in upper brachial plexus injury (traction) during delivery. The function of this part of the deltoid is of a powerful abductor of the arm but in order to do this it needs the assistance of the supraspinatus muscle in order to prevent the head of the humerus for raising and hitting the acromium. Therefore, the specific function of the supraspinatus muscle is to fix the head of the humerus against the glenoid cavity of the scapula. This portion is also very active in controlling the gravitational descend of the arm, avoiding to drop abruptly against the body."
        },
        "PT": {
            fullName: "Pronator Teres",
            innervation: "Median Nerve, Lateral Cord, Anterior Division, Upper and Middle Trunk, C6, C7",
            origin: "This muscle has two heads of origins: (a) from the medial epicondyle of the humerus and (b) the coronoid process of the ulna. The median nerve enters the forearm between these two heads",
            insertion: "Lateral surface of radius at mid-shaft",
            position: "The forearm fully supinated",
            electrodeInsertion: "Two fingerbreadths distal to the midpoint of a line connecting the medial epicondyle (ME) and biceps tendon (BT)",
            testManeuver: "Pronation of forearm",
            pitfalls: "If the needle electrode is inserted too deeply it will be in the flexor digitorum sublimis; if inserted too ulnarly it will be in the flexor carpi radialis",
            comments: "The most proximal muscle innervated by the median nerve. Common site of entrapment as it is pierced by the median nerve. May or may not be involved in pronator teres syndrome depending on whether the nerve to the pronator muscle branches proximal to or within the muscle itself. Also involved in entrapment at the ligament of Struther. Of the two pronators, this is the most powerful. Its main function is to flex and prorate the forearm."
        },
        "Tricep": {
            fullName: "Triceps",
            innervation: "Radial Nerve, Posterior Cord, Posterior Division, Middle and Lower Trunk, C7, C8, T1",
            origin: "Long Head: Infraglenoid tuberosity of the scapula. Medial Head: From the dorsal surface of the shaft of the humerus below the groove for the radial nerve",
            insertion: "Long Head: Via a common tendon, the three heads of the triceps insert on the dorsal aspect of the olecranon process of the ulna. Medial Head: By common tendon into olecranon processes",
            position: "Long Head: Patient prone with arm abducted to ninety degrees and elbow flexed over edge of plinth. Medial Head: Patient prone with arm abducted",
            electrodeInsertion: "Long Head: Four fingerbreadths distal to the posterior axillary fold. Medial Head: Three fingerbreadths proximal to the medial epicondyle (ME) of humerus",
            testManeuver: "Long Head: Extension of the elbow. Medial Head: Extension of elbow",
            pitfalls: "Long Head: None. Medial Head: If the needle electrode is inserted too anteriorly it will be in the biceps, and there is also the danger of puncturing the brachial artery",
            comments: "Long Head: Because of its very proximal innervation through the radial nerve, it is almost never involved in 'crutch paralysis' or 'Saturday night palsy.' The main function of this portion of the triceps is to extend the elbow; however, as it crosses the shoulder joint, it helps in extension and adduction of the arm. A 3rd function is to fix the head of the humerus during abduction of the arm. This head of the triceps is the medial boundary of the 'quadrilateral space,' through which the circumflex (axillary) nerve and the vessel travel. The other boundaries of this space are: laterally: the surgical neck of the humerus; below: the teres major muscle and above by the teres minor muscle and subscapularis. Medial Head: If the needle electrode is inserted too anteriorly it will be in the biceps, and there is also the danger of puncturing the brachial artery."
        }
    },
    lowerExtremity: {
        "Extensor Hallucis": {
            fullName: "Extensor Hallucis Longus",
            innervation: "Deep Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1",
            origin: "From the midportion of the shaft of the fibula",
            insertion: "Into the distal phalanx of the great toe",
            position: "The patient supine",
            electrodeInsertion: "Three fingerbreadths above the bimalleolar line (MM-LM) of the ankle just lateral to the crest of the tibia",
            testManeuver: "Patient to extend the big toe or to dorsi flex the foot",
            pitfalls: "If the electrode is inserted too superficially and too proximally it will be in the tibialis anterior; if inserted too laterally it will be in the Peroneus tertius",
            comments: "Involved in: 1. Anterior compartment syndrome 2. Lesion of the deep peroneal nerve 3. Common peroneal nerve 4. Sciatic nerve 5. Sacral plexus 6. L5, S1 root lesions"
        },
        "Medial Gastroc": {
            fullName: "Gastrocnemius: Medial Head",
            innervation: "Tibial Nerve, Sciatic Nerve, Ventral Division Sacral Plexus, S1, S2",
            origin: "From the medial femoral condyle",
            insertion: "Into the calcaneus, through the Achille's tendon",
            position: "The patient prone with feet over edge of plinth",
            electrodeInsertion: "One handbreadth below the popliteal crease on the medial mass of the calf",
            testManeuver: "Patient to plantar flex the foot with the knee extended",
            pitfalls: "If the electrode is inserted too deeply it will be in the soleus",
            comments: "Involved in lesions of: 1. Tibial nerve 2. Sciatic nerve 3. Sacral plexus 4. L5, S1, S2 roots. The medial head is the larger and more prominent of the two gastrocnemius heads and is commonly used for EMG evaluation of the tibial nerve."
        },
        "Peroneus Longus": {
            fullName: "Peroneus Longus",
            innervation: "Superficial Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1, S2",
            origin: "From the fibular head and from the proximal two-thirds of the fibula",
            insertion: "Into the base of the first metatarsal and the first cuneiform",
            position: "The patient supine",
            electrodeInsertion: "Three fingerbreadths below the fibular head (FH) directed toward the lateral aspect of the fibula",
            testManeuver: "Patient to plantar flex and evert the foot",
            pitfalls: "If the electrode is inserted too posteriorly it will be in the soleus; if inserted too anteriorly it will be in the extensor digitorum longus",
            comments: "This muscle is involved in lesions of: 1. Superficial peroneal nerve 2. Common peroneal nerve 3. Sciatic nerve 4. Sacral plexus 5. L5, S1, roots. The main function of this muscle is to evert the foot. It also has a weak function in plantar-flexing the foot. It is a good support of the transverse arch of the foot."
        },
        "Tibialis Ant": {
            fullName: "Tibialis Anterior",
            innervation: "Deep Peroneal Nerve, Common Peroneal Nerve, Sciatic Nerve, Posterior Division Sacral Plexus, L5, S1",
            origin: "From the midportion of the shaft of the fibula",
            insertion: "Into the distal phalanx of the great toe",
            position: "The patient supine",
            electrodeInsertion: "Three fingerbreadths above the bimalleolar line (MM-LM) of the ankle just lateral to the crest of the tibia",
            testManeuver: "Patient to extend the big toe or to dorsi flex the foot",
            pitfalls: "If the electrode is inserted too superficially and too proximally it will be in the tibialis anterior; if inserted too laterally it will be in the Peroneus tertius",
            comments: "Involved in: 1. Anterior compartment syndrome 2. Lesion of the deep peroneal nerve 3. Common peroneal nerve 4. Sciatic nerve 5. Sacral plexus 6. L5, S1 root lesions"
        },
        "Tibialis Post": {
            fullName: "Tibialis Posterior",
            innervation: "Tibial Nerve, Sciatic Nerve, Anterior Division Sacral Plexus, L5, S1",
            origin: "From the interosseus membrane, the posterior surface of the body of the tibia and the upper two-thirds of the medial surface of the fibula",
            insertion: "This muscle inserts on the tuberosity of the navicular bone and the medial cuneiform bone, and strong aponeurotic strips are sent across the foot to the bases of the second, third and fourth metatarsal bone",
            position: "The patient prone with feet over edge of plinth, thigh internally rotated",
            electrodeInsertion: "One handbreadth distal to the tibial tuberosity (TT) and one fingerbreadth off the medial edge of the tibia. The electrode is directly obliquely through the soleus and flexor digitorum longus, just posterior to the tibia",
            testManeuver: "Patient is to invert foot in plantar flexion",
            pitfalls: "If the electrode is inserted too superficially it will be in the soleus or flexor digitorum longus; if inserted too deeply it will be in the tibialis anterior",
            comments: "Involved in lesions of: 1. Tibial nerve 2. Sciatic nerve 3. Sacral plexus 4. L5, S1 root. The main function of this muscle is to plantar flex and invert the foot. This is the deepest muscle in the posterior compartment. This muscle is the strongest support of the longitudinal arch of the foot."
        },
        "Vastus Lateralis": {
            fullName: "Vastus Lateralis",
            innervation: "Femoral Nerve, Posterior Division Lumbar Plexus, L2, L3, L4",
            origin: "From the intertrochanteric line, the linea aspera and the medial supracondylar line",
            insertion: "Through the quadriceps tendon onto the tibial tubercle",
            position: "The patient supine",
            electrodeInsertion: "Over the lateral aspect of the thigh, one handbreadth above the patella",
            testManeuver: "Patient to lift heel from plinth with knee extended",
            pitfalls: "If the electrode is inserted too posteriorly it will be in the biceps femoris; if inserted too medially it will be in the rectus femoris",
            comments: "Involved in lesions of: 1. Femoral nerve (entrapment) at the inguinal ligament level 2. Femoral nerve proximal to the inguinal ligament 3. Posterior division of the lumbar plexus 4. L2, L3, L4 roots. The main function of this muscle is to extend the knee. When this muscle gets paralyzed, the patient loses the force that keeps the knee in extension. Therefore, the patient develops the feeling that the knee will collapse when loaded during walking for which he tends to support it by placing one hand at the end of the thigh or by forcefully sending his knee into recurvatum which will produce the same effect."
        }
    }
};

// EMG Needle Localization Guide Function
window.showEMGLocalizationGuide = function() {
    console.log('🔍 DEBUG: showEMGLocalizationGuide called');

    const title = '💉 EMG Needle Localization Guide';
    const content = `
        <div class="emg-localization-container">
            <!-- Header Section -->
            <div class="emg-header">
                <h3>📖 EMG Needle Placement Reference</h3>
                <p>Comprehensive guide for precise electrode placement using anatomical landmarks</p>
            </div>

            <!-- Main Content Area -->
            <div class="emg-main-content">
                <!-- Left Panel: Muscle List -->
                <div class="muscle-list-panel">
                    <div class="region-header">
                        <h4>🫱 Upper Extremity</h4>
                    </div>
                    <div class="muscle-list" id="upper-muscle-list">
                        ${Object.keys(EMGLocalizationDatabase.upperExtremity).map(muscle =>
                            `<div class="muscle-list-item" onclick="EMGLocalization.selectMuscle('${muscle}', 'upper')" data-muscle="${muscle}">
                                <span class="muscle-name">${EMGLocalizationDatabase.upperExtremity[muscle].fullName}</span>
                                <span class="muscle-abbrev">(${muscle})</span>
                            </div>`
                        ).join('')}
                    </div>

                    <div class="region-header">
                        <h4>🦵 Lower Extremity</h4>
                    </div>
                    <div class="muscle-list" id="lower-muscle-list">
                        ${Object.keys(EMGLocalizationDatabase.lowerExtremity).map(muscle =>
                            `<div class="muscle-list-item" onclick="EMGLocalization.selectMuscle('${muscle}', 'lower')" data-muscle="${muscle}">
                                <span class="muscle-name">${EMGLocalizationDatabase.lowerExtremity[muscle].fullName}</span>
                                <span class="muscle-abbrev">(${muscle})</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>

                <!-- Right Panel: Muscle Details -->
                <div class="muscle-detail-panel">
                    <div class="detail-placeholder" id="muscle-detail-content">
                        <div class="placeholder-content">
                            <h4>🎯 Select a Muscle</h4>
                            <p>Choose a muscle from the left panel to view detailed EMG needle localization information including:</p>
                            <ul>
                                <li>📍 <strong>Electrode Insertion</strong> - Precise needle placement instructions</li>
                                <li>🧍 <strong>Patient Position</strong> - Optimal positioning for access</li>
                                <li>💪 <strong>Test Maneuver</strong> - Activation technique for verification</li>
                                <li>⚠️ <strong>Pitfalls</strong> - Common mistakes and warnings</li>
                                <li>🧠 <strong>Clinical Notes</strong> - Important anatomical information</li>
                                <li>🖼️ <strong>Image Placeholder</strong> - Space reserved for needle placement diagrams</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .emg-localization-container {
                font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
                max-width: 1400px;
                margin: 0 auto;
                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }

            .emg-header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .emg-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                opacity: 0.3;
            }

            .emg-header h3 {
                margin: 0 0 12px 0;
                font-size: 2.2em;
                font-weight: 700;
                position: relative;
                z-index: 1;
            }

            .emg-header p {
                margin: 0;
                opacity: 0.95;
                font-size: 1.2em;
                position: relative;
                z-index: 1;
                font-weight: 300;
            }

            .emg-main-content {
                display: flex;
                min-height: 650px;
                background: white;
            }

            /* Left Panel Styles */
            .muscle-list-panel {
                width: 380px;
                background: linear-gradient(135deg, #fafbfc, #f1f5f9);
                border-right: 3px solid #e2e8f0;
                overflow-y: auto;
                max-height: 650px;
            }

            .region-header {
                background: linear-gradient(135deg, #1e293b, #334155);
                color: white;
                padding: 18px 24px;
                margin: 0;
                position: sticky;
                top: 0;
                z-index: 10;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            .region-header h4 {
                margin: 0;
                font-size: 1.3em;
                font-weight: 700;
                letter-spacing: 0.5px;
            }

            .muscle-list {
                padding: 0;
            }

            .muscle-list-item {
                padding: 18px 24px;
                border-bottom: 1px solid #e2e8f0;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background: white;
                border-left: 4px solid transparent;
            }

            .muscle-list-item:hover {
                background: linear-gradient(135deg, #eff6ff, #dbeafe);
                border-left: 4px solid #3b82f6;
                transform: translateX(4px);
                box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
            }

            .muscle-list-item.selected {
                background: linear-gradient(135deg, #dbeafe, #bfdbfe);
                border-left: 4px solid #2563eb;
                box-shadow: 0 4px 12px -2px rgba(37, 99, 235, 0.25);
                transform: translateX(2px);
            }

            .muscle-name {
                display: block;
                font-weight: 700;
                color: #1e293b;
                font-size: 1.05em;
                margin-bottom: 6px;
                line-height: 1.3;
            }

            .muscle-abbrev {
                display: block;
                color: #64748b;
                font-size: 0.9em;
                font-style: italic;
                font-weight: 500;
            }

            /* Right Panel Styles */
            .muscle-detail-panel {
                flex: 1;
                padding: 35px;
                overflow-y: auto;
                max-height: 650px;
                background: linear-gradient(135deg, #fefefe, #f9fafb);
            }

            .placeholder-content {
                text-align: center;
                padding: 80px 40px;
                color: #64748b;
                background: white;
                border-radius: 16px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            .placeholder-content h4 {
                color: #1e293b;
                margin-bottom: 24px;
                font-size: 1.6em;
                font-weight: 700;
            }

            .placeholder-content ul {
                text-align: left;
                max-width: 550px;
                margin: 24px auto 0;
                line-height: 1.9;
            }

            .placeholder-content li {
                margin-bottom: 12px;
                font-weight: 500;
            }

            /* Selected Muscle Detail Styles */
            .muscle-detail {
                animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .muscle-title {
                background: linear-gradient(135deg, #0f172a, #1e293b);
                color: white;
                padding: 28px;
                border-radius: 16px;
                margin-bottom: 30px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            .muscle-title h4 {
                margin: 0 0 10px 0;
                font-size: 1.8em;
                font-weight: 800;
            }

            .muscle-subtitle {
                color: #94a3b8;
                font-size: 1.15em;
                margin: 0;
                font-weight: 400;
            }

            .detail-section {
                background: white;
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 20px;
                border-left: 4px solid #3b82f6;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
            }

            .detail-section:hover {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
            }

            .detail-section h5 {
                color: #1e293b;
                margin: 0 0 16px 0;
                font-size: 1.25em;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .detail-text {
                color: #374151;
                line-height: 1.8;
                margin: 0;
                font-size: 1.05em;
                font-weight: 400;
            }

            .image-placeholder {
                background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                border: 3px dashed #94a3b8;
                border-radius: 16px;
                padding: 50px;
                text-align: center;
                color: #64748b;
                margin-bottom: 25px;
                transition: all 0.3s ease;
            }

            .image-placeholder:hover {
                border-color: #6366f1;
                background: linear-gradient(135deg, #f0f4ff, #e0e7ff);
            }

            .image-placeholder-icon {
                font-size: 3.5em;
                margin-bottom: 16px;
                opacity: 0.6;
            }

            .image-placeholder p {
                margin: 8px 0;
                font-weight: 500;
            }

            /* MOBILE RESPONSIVENESS */
            @media (max-width: 480px) {
                .emg-localization-container {
                    border-radius: 10px;
                }

                /* Header adjustments */
                .emg-header {
                    padding: 20px 15px !important;
                }

                .emg-header h3 {
                    font-size: 1.5em !important;
                }

                .emg-header p {
                    font-size: 0.9em !important;
                }

                /* CRITICAL: Stack left panel and right panel vertically */
                .emg-main-content {
                    flex-direction: column !important;
                    min-height: auto !important;
                }

                /* Left panel - full width on mobile */
                .muscle-list-panel {
                    width: 100% !important;
                    max-height: 400px !important;
                    border-right: none !important;
                    border-bottom: 3px solid #e2e8f0;
                }

                /* Region headers */
                .region-header {
                    padding: 12px 15px !important;
                }

                .region-header h4 {
                    font-size: 1.1em !important;
                }

                /* Muscle list items - more compact */
                .muscle-list-item {
                    padding: 12px 15px !important;
                    font-size: 0.9em;
                }

                .muscle-name {
                    font-size: 0.95em !important;
                }

                .muscle-abbrev {
                    font-size: 0.85em !important;
                }

                /* Right panel - full width on mobile */
                .muscle-detail-panel {
                    padding: 20px 15px !important;
                    max-height: none !important;
                }

                /* Placeholder content */
                .placeholder-content {
                    padding: 40px 20px !important;
                }

                .placeholder-content h4 {
                    font-size: 1.2em !important;
                }

                .placeholder-content p {
                    font-size: 0.9em !important;
                }

                .placeholder-content li {
                    font-size: 0.85em !important;
                    margin-bottom: 8px;
                }

                /* Muscle detail content */
                .muscle-detail-content h3 {
                    font-size: 1.4em !important;
                }

                .muscle-detail-content h4 {
                    font-size: 1.1em !important;
                }

                .muscle-detail-content h5 {
                    font-size: 1em !important;
                }

                .muscle-detail-content p,
                .muscle-detail-content li {
                    font-size: 0.9em !important;
                    line-height: 1.5 !important;
                }

                /* Info boxes */
                .info-box {
                    padding: 12px !important;
                    margin: 12px 0 !important;
                }

                /* Image placeholders */
                .image-placeholder {
                    padding: 30px 15px !important;
                    margin-bottom: 15px !important;
                }

                .image-placeholder-icon {
                    font-size: 2.5em !important;
                }
            }

            /* Extra small phones */
            @media (max-width: 375px) {
                .emg-header h3 {
                    font-size: 1.3em !important;
                }

                .muscle-list-panel {
                    max-height: 350px !important;
                }
            }
        </style>
    `;

    showModal(title, content);

    // Initialize the EMG Localization system after modal is loaded
    setTimeout(() => {
        if (!window.EMGLocalization) {
            window.EMGLocalization = {
                selectedMuscle: null,
                selectedRegion: null,

                selectMuscle: function(muscle, region) {
                    console.log(`🔍 Selecting muscle: ${muscle} from ${region} extremity`);

                    // Update selection state
                    this.selectedMuscle = muscle;
                    this.selectedRegion = region;

                    // Remove previous selections
                    document.querySelectorAll('.muscle-list-item').forEach(item => {
                        item.classList.remove('selected');
                    });

                    // Add selection to clicked item
                    const selectedItem = document.querySelector(`[data-muscle="${muscle}"]`);
                    if (selectedItem) {
                        selectedItem.classList.add('selected');
                    }

                    // Get muscle data
                    const muscleData = region === 'upper'
                        ? EMGLocalizationDatabase.upperExtremity[muscle]
                        : EMGLocalizationDatabase.lowerExtremity[muscle];

                    // Update detail panel
                    this.displayMuscleDetails(muscleData);
                },

                displayMuscleDetails: function(muscleData) {
                    const detailPanel = document.getElementById('muscle-detail-content');

                    const detailHTML = `
                        <div class="muscle-detail">
                            <div class="muscle-title">
                                <h4>${muscleData.fullName}</h4>
                                <p class="muscle-subtitle">EMG Needle Localization Guide</p>
                            </div>

                            <div class="image-placeholder" style="margin-bottom: 25px;">
                                <div class="image-placeholder-icon">🖼️</div>
                                <p><strong>EMG Needle Placement Image</strong></p>
                                <p>Anatomical diagram for ${muscleData.fullName} needle insertion</p>
                            </div>

                            <div class="detail-section">
                                <h5>🧠 Innervation</h5>
                                <p class="detail-text">${muscleData.innervation}</p>
                            </div>

                            <div class="detail-section">
                                <h5>📍 Origin</h5>
                                <p class="detail-text">${muscleData.origin}</p>
                            </div>

                            <div class="detail-section">
                                <h5>🎯 Insertion</h5>
                                <p class="detail-text">${muscleData.insertion}</p>
                            </div>

                            <div class="detail-section">
                                <h5>🧍 Patient Position</h5>
                                <p class="detail-text">${muscleData.position}</p>
                            </div>

                            <div class="detail-section" style="border-left: 4px solid #dc2626;">
                                <h5>💉 Electrode Insertion</h5>
                                <p class="detail-text"><strong>${muscleData.electrodeInsertion}</strong></p>
                            </div>

                            <div class="detail-section">
                                <h5>💪 Test Maneuver</h5>
                                <p class="detail-text">${muscleData.testManeuver}</p>
                            </div>

                            <div class="detail-section" style="border-left: 4px solid #f59e0b;">
                                <h5>⚠️ Pitfalls</h5>
                                <p class="detail-text">${muscleData.pitfalls}</p>
                            </div>

                            <div class="detail-section">
                                <h5>📝 Clinical Comments</h5>
                                <p class="detail-text">${muscleData.comments}</p>
                            </div>
                        </div>
                    `;

                    detailPanel.innerHTML = detailHTML;
                }
            };
        }
    }, 100);
};

// Make EMG Localization Guide globally available
window.showEMGLocalizationGuide = showEMGLocalizationGuide;

// Report Writing Module Functions
window.showReportModule = function(moduleName) {
    // Update tab styles
    document.querySelectorAll('#communication-tab, #severity-tab, #examples-tab, #builder-tab, #coach-tab').forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#64748b';
    });

    const targetTab = document.getElementById(moduleName + '-tab');
    if (targetTab) {
        targetTab.style.background = '#3b82f6';
        targetTab.style.color = 'white';
    }

    // Hide all modules
    document.querySelectorAll('#communication-module, #severity-module, #examples-module, #builder-module, #coach-module').forEach(module => {
        module.style.display = 'none';
    });

    // Show selected module
    const targetModule = document.getElementById(moduleName + '-module');
    if (targetModule) {
        targetModule.style.display = 'block';
    }

    window.currentReportModule = moduleName;
};

window.updateStructurePreview = function() {
    const studyResult = document.getElementById('study-result');
    const primaryFinding = document.getElementById('primary-finding');
    const preview = document.getElementById('structure-preview');

    if (!studyResult || !primaryFinding || !preview) return;

    let previewText = '';

    if (studyResult.value === 'normal') {
        previewText = `1. Normal study.

2. No electrodiagnostic evidence of median neuropathy, ulnar neuropathy, or superficial radial neuropathy in the upper extremity.

3. No electrodiagnostic evidence of a cervical radiculopathy or plexopathy in the upper extremity.

Thank you for the courtesy of this referral.`;
    } else {
        let diagnosis = '';

        switch(primaryFinding.value) {
            case 'carpal':
                diagnosis = 'entrapment of the median nerve at the level of the wrist consistent with carpal tunnel syndrome';
                break;
            case 'cubital':
                diagnosis = 'entrapment of the ulnar nerve at the level of the elbow consistent with cubital tunnel syndrome';
                break;
            case 'radiculopathy':
                diagnosis = 'a cervical radiculopathy';
                break;
            case 'polyneuropathy':
                diagnosis = 'a distal sensorimotor polyneuropathy';
                break;
        }

        previewText = `1. Abnormal study.

2. There are electrodiagnostic abnormalities consistent with ${diagnosis}. Involvement appears to be mild, affecting sensory fibers in a demyelinating process.

3. There is no electrodiagnostic evidence of other nerve entrapments in the upper extremity.

4. There is no electrodiagnostic evidence of a cervical radiculopathy.

Thank you for the courtesy of this referral.`;
    }

    preview.innerHTML = previewText.replace(/\n/g, '<br>');
};

window.showExample = function(exampleType) {
    // Update button styles
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.style.background = '#6b7280';
    });

    const targetBtn = document.getElementById(exampleType + '-btn');
    if (targetBtn) {
        targetBtn.style.background = '#10b981';
    }

    const display = document.getElementById('example-display');
    if (!display) return;

    let content = '';

    switch(exampleType) {
        case 'normal':
            content = `
                <h5 style="color: #065f46; margin-bottom: 15px;">📄 Normal Study Example</h5>
                <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151;">
                    <strong>Conclusions:</strong><br><br>
                    1. Normal study.<br><br>
                    2. No electrodiagnostic evidence of median neuropathy, ulnar neuropathy, or superficial radial neuropathy in the left upper extremity.<br><br>
                    3. No electrodiagnostic evidence of a cervical radiculopathy or plexopathy in the left upper extremity.<br><br>
                    Thank you for the courtesy of this referral.
                </div>
                <div style="margin-top: 15px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                    <h6 style="color: #065f46; margin-bottom: 8px;">🎯 Key Points:</h6>
                    <ul style="color: #047857; margin: 0; padding-left: 20px;">
                        <li>Clear declaration of normal study</li>
                        <li>Systematic exclusion of common conditions</li>
                        <li>Professional closing</li>
                    </ul>
                </div>
            `;
            break;
        case 'mild-cts':
            content = `
                <h5 style="color: #065f46; margin-bottom: 15px;">📄 Mild Carpal Tunnel Syndrome</h5>
                <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151;">
                    <strong>Conclusions:</strong><br><br>
                    1. Abnormal study.<br><br>
                    2. There are electrodiagnostic abnormalities consistent with entrapment of the left median nerve at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, affecting sensory fibers in a demyelinating process. There is no denervation noted in the left APB muscle.<br><br>
                    3. There is no electrodiagnostic evidence of an ulnar neuropathy or superficial radial sensory neuropathy in the left upper extremity.<br><br>
                    4. There is no electrodiagnostic evidence of a cervical radiculopathy in the left upper extremity.<br><br>
                    Thank you for the courtesy of this referral.
                </div>
                <div style="margin-top: 15px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <h6 style="color: #92400e; margin-bottom: 8px;">🎯 Key Elements:</h6>
                    <ul style="color: #451a03; margin: 0; padding-left: 20px;">
                        <li>Specific anatomical localization</li>
                        <li>Severity assessment (mild)</li>
                        <li>Process type (demyelinating)</li>
                        <li>Exclusion of denervation</li>
                    </ul>
                </div>
            `;
            break;
        case 'severe-cts':
            content = `
                <h5 style="color: #065f46; margin-bottom: 15px;">📄 Severe Carpal Tunnel Syndrome</h5>
                <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151;">
                    <strong>Conclusions:</strong><br><br>
                    1. Abnormal study.<br><br>
                    2. There are electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be severe, right worse than left, affecting sensory and motor fibers in a demyelinating and axonal manner. There is denervation seen in both APB muscles.<br><br>
                    3. There are electrodiagnostic abnormalities suggestive of an ulnar neuropathy in both upper extremities at the level of the elbow consistent with cubital tunnel syndrome. There is motor slowing across both elbows with borderline sensory studies. There is no denervation noted in either FDI muscle.<br><br>
                    4. There is no electrodiagnostic evidence of a superficial radial sensory neuropathy in either upper extremity.<br><br>
                    5. There is no electrodiagnostic evidence of a lower cervical radiculopathy in either upper extremity.<br><br>
                    Thank you for the courtesy of this referral.
                </div>
                <div style="margin-top: 15px; padding: 15px; background: #fecaca; border-radius: 8px; border-left: 4px solid #dc2626;">
                    <h6 style="color: #991b1b; margin-bottom: 8px;">🎯 Complex Case Features:</h6>
                    <ul style="color: #7f1d1d; margin: 0; padding-left: 20px;">
                        <li>Multiple nerve involvement</li>
                        <li>Bilateral findings with asymmetry</li>
                        <li>Mixed demyelinating and axonal process</li>
                        <li>Evidence of denervation</li>
                    </ul>
                </div>
            `;
            break;
        case 'complex':
            content = `
                <h5 style="color: #065f46; margin-bottom: 15px;">📄 Complex Multi-System Case</h5>
                <div style="font-family: 'Courier New', monospace; background: #f9fafb; padding: 15px; border-radius: 8px; line-height: 1.6; color: #374151; font-size: 0.85em;">
                    <strong>Conclusions:</strong><br><br>
                    1. Abnormal study.<br><br>
                    2. There is electrodiagnostic evidence of a diffuse axonal process in the left upper extremity involving all tested muscles. The left median, radial and ulnar sensory studies are absent consistent with a post-ganglionic pan brachial plexopathy. Clinical correlation indicated.<br><br>
                    3. There are electrodiagnostic abnormalities consistent with entrapment of the right median nerve at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild to moderate, affecting sensory and motor fibers in a demyelinating manner.<br><br>
                    4. There are electrodiagnostic abnormalities suggestive of an ulnar neuropathy in the right upper extremity at the level of the elbow consistent with cubital tunnel syndrome.<br><br>
                    5. Electrodiagnostic evidence suggestive of an axonal and demyelinating peripheral polyneuropathy involving sensory and motor fibers in the right upper extremity.<br><br>
                    Thank you for the courtesy of this referral.
                </div>
                <div style="margin-top: 15px; padding: 15px; background: #e0e7ff; border-radius: 8px; border-left: 4px solid #6366f1;">
                    <h6 style="color: #3730a3; margin-bottom: 8px;">🎯 Advanced Reporting Features:</h6>
                    <ul style="color: #4338ca; margin: 0; padding-left: 20px;">
                        <li>Multiple pathological processes</li>
                        <li>Detailed anatomical correlation</li>
                        <li>Clinical correlation recommendations</li>
                        <li>Systematic exclusions</li>
                    </ul>
                </div>
            `;
            break;
    }

    display.innerHTML = content;
};

window.generateNewScenario = function() {
    if (!window.practiceScenarios) {
        window.practiceScenarios = [
            {
                title: "Bilateral Carpal Tunnel Syndrome",
                description: "45-year-old female office worker with bilateral hand numbness and tingling, worse at night. NCS shows prolonged median distal latencies bilaterally, worse on right. No denervation on EMG.",
                expert: "1. Abnormal study.\n2. There are electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, bilaterally, right slightly worse than left, affecting sensory fibers in a demyelinating process. There is no denervation noted in either APB muscle. Clinical correlation is indicated.\n3. There is no electrodiagnostic evidence of an ulnar neuropathy or superficial radial sensory neuropathy in either upper extremity.\n4. There is no electrodiagnostic evidence of a cervical radiculopathy in either upper extremity.\n\nThank you for the courtesy of this referral."
            },
            {
                title: "Normal Study",
                description: "28-year-old male with intermittent hand numbness. All nerve conduction studies within normal limits. EMG shows normal voluntary motor units.",
                expert: "1. Normal study.\n2. No electrodiagnostic evidence of median neuropathy, ulnar neuropathy, or superficial radial neuropathy in the left upper extremity.\n3. No electrodiagnostic evidence of a cervical radiculopathy or plexopathy in the left upper extremity.\n\nThank you for the courtesy of this referral."
            },
            {
                title: "Cubital Tunnel Syndrome",
                description: "52-year-old carpenter with elbow pain and hand weakness. NCS shows ulnar motor slowing across elbow. EMG shows denervation in ulnar-innervated muscles.",
                expert: "1. Abnormal study.\n2. There are electrodiagnostic abnormalities consistent with entrapment of the left ulnar nerve at the level of the elbow consistent with cubital tunnel syndrome. There is motor slowing across the elbow with normal sensory studies. There is denervation noted in the left FDI muscle.\n3. There is no electrodiagnostic evidence of a median neuropathy or superficial radial sensory neuropathy in the left upper extremity.\n4. There is no electrodiagnostic evidence of a cervical radiculopathy in the left upper extremity.\n\nThank you for the courtesy of this referral."
            }
        ];
    }

    window.currentScenario = Math.floor(Math.random() * window.practiceScenarios.length);
    const scenario = window.practiceScenarios[window.currentScenario];

    const scenarioDiv = document.getElementById('practice-scenario');
    if (scenarioDiv && scenario) {
        scenarioDiv.innerHTML = `
            <h6 style="color: #92400e; margin-bottom: 10px; font-weight: 600;">${scenario.title}</h6>
            <p style="margin: 0; color: #374151;">${scenario.description}</p>
        `;
    }

    // Clear the textarea
    const textarea = document.getElementById('report-textarea');
    if (textarea) {
        textarea.value = '';
        validateReport();
    }
};

window.showExpertExample = function() {
    if (!window.practiceScenarios || !window.practiceScenarios[window.currentScenario]) return;

    const expertReport = window.practiceScenarios[window.currentScenario].expert;
    const textarea = document.getElementById('report-textarea');

    if (textarea && expertReport) {
        textarea.value = expertReport;
        validateReport();
    }
};

window.clearReport = function() {
    const textarea = document.getElementById('report-textarea');
    if (textarea) {
        textarea.value = '';
        validateReport();
    }
};

window.validateReport = function() {
    const textarea = document.getElementById('report-textarea');
    const feedbackDiv = document.getElementById('feedback-content');

    if (!textarea || !feedbackDiv) return;

    const text = textarea.value.trim();
    const feedback = [];

    if (text === '') {
        feedbackDiv.innerHTML = 'Start typing to get instant feedback on your report structure and language...';
        return;
    }

    // Check structure
    if (!text.startsWith('1.')) {
        feedback.push('❌ Reports should start with "1. Normal study." or "1. Abnormal study."');
    } else if (text.startsWith('1. Normal study.')) {
        feedback.push('✅ Good start with normal study declaration');
    } else if (text.startsWith('1. Abnormal study.')) {
        feedback.push('✅ Good start with abnormal study declaration');
    }

    // Check for professional language
    if (text.includes('consistent with')) {
        feedback.push('✅ Using professional language: "consistent with"');
    }

    if (text.includes('electrodiagnostic abnormalities')) {
        feedback.push('✅ Professional terminology: "electrodiagnostic abnormalities"');
    }

    if (text.includes('There is no electrodiagnostic evidence of')) {
        feedback.push('✅ Good exclusion language');
    }

    if (text.includes('Thank you for the courtesy of this referral')) {
        feedback.push('✅ Professional closing included');
    } else if (text.length > 100) {
        feedback.push('⚠️ Don\'t forget professional closing: "Thank you for the courtesy of this referral."');
    }

    // Check severity descriptors
    if (text.includes('mild') || text.includes('moderate') || text.includes('severe')) {
        feedback.push('✅ Severity assessment included');
    }

    // Check numbering
    const lines = text.split('\n');
    let hasNumbering = true;
    let currentNumber = 1;

    for (const line of lines) {
        if (line.trim().match(/^\d+\./)) {
            const number = parseInt(line.trim().match(/^(\d+)\./)[1]);
            if (number !== currentNumber) {
                hasNumbering = false;
                break;
            }
            currentNumber++;
        }
    }

    if (hasNumbering && currentNumber > 1) {
        feedback.push('✅ Proper sequential numbering');
    } else if (currentNumber === 1 && text.length > 50) {
        feedback.push('⚠️ Consider adding numbered sections (2., 3., etc.)');
    }

    // Length feedback
    if (text.length < 50) {
        feedback.push('💡 Keep writing - reports typically have multiple numbered sections');
    } else if (text.length > 1000) {
        feedback.push('⚠️ Report is getting long - consider being more concise');
    }

    feedbackDiv.innerHTML = feedback.join('<br>') || '👍 Looking good! Keep writing...';
};

// Severity Classification Training Functions
window.checkSeverity = function(selectedSeverity, scenarioNumber) {
    const correctAnswer = 'mild'; // For scenario 1
    const feedbackDiv = document.getElementById(`severity-feedback-${scenarioNumber}`);

    if (!feedbackDiv) return;

    let feedbackContent = '';
    let bgColor = '';
    let borderColor = '';

    if (selectedSeverity === correctAnswer) {
        bgColor = '#f0fdf4';
        borderColor = '#16a34a';
        feedbackContent = `
            <div style="color: #15803d;">
                <h6 style="color: #15803d; margin-bottom: 8px;">✅ Correct! This is MILD CTS</h6>
                <p style="margin: 0; font-size: 0.9em;">
                    <strong>Why it's mild:</strong> Only sensory involvement (prolonged sensory latency), normal motor studies, and no denervation.
                    Motor amplitudes are normal at 12mV, and EMG shows no denervation in APB muscles.
                </p>
            </div>
        `;
    } else if (selectedSeverity === 'moderate') {
        bgColor = '#fef2f2';
        borderColor = '#dc2626';
        feedbackContent = `
            <div style="color: #dc2626;">
                <h6 style="color: #dc2626; margin-bottom: 8px;">❌ Incorrect - This is NOT moderate</h6>
                <p style="margin: 0; font-size: 0.9em;">
                    <strong>Why not moderate:</strong> Moderate requires BOTH motor AND sensory involvement.
                    This case has normal motor latency (3.8ms) and normal motor amplitudes (12mV).
                    Only sensory fibers are affected = MILD.
                </p>
            </div>
        `;
    } else if (selectedSeverity === 'severe') {
        bgColor = '#fef2f2';
        borderColor = '#dc2626';
        feedbackContent = `
            <div style="color: #dc2626;">
                <h6 style="color: #dc2626; margin-bottom: 8px;">❌ Incorrect - This is NOT severe</h6>
                <p style="margin: 0; font-size: 0.9em;">
                    <strong>Why not severe:</strong> Severe requires denervation on EMG AND axon loss in motor studies.
                    This case shows no denervation and normal motor amplitudes.
                    Common mistake: motor involvement ≠ severe!
                </p>
            </div>
        `;
    }

    feedbackDiv.style.display = 'block';
    feedbackDiv.style.background = bgColor;
    feedbackDiv.style.borderLeft = `3px solid ${borderColor}`;
    feedbackDiv.innerHTML = feedbackContent;

    // Disable all buttons after selection
    document.querySelectorAll('.severity-option').forEach(btn => {
        btn.style.opacity = '0.6';
        btn.style.pointerEvents = 'none';
    });
};

window.generateNewSeverityScenario = function() {
    const scenarios = [
        {
            title: "Scenario 2:",
            description: `52-year-old male construction worker with hand weakness.<br>
                • Median sensory latency: 5.1ms (prolonged)<br>
                • Median motor latency: 4.8ms (prolonged)<br>
                • Motor amplitudes: 9mV (maintained)<br>
                • EMG: No denervation in APB muscle`,
            correct: 'moderate'
        },
        {
            title: "Scenario 3:",
            description: `68-year-old female with severe hand pain and weakness.<br>
                • Median sensory: Absent<br>
                • Median motor latency: 6.2ms (very prolonged)<br>
                • Motor amplitudes: 1.8mV (very low - axon loss)<br>
                • EMG: Denervation potentials in APB muscle`,
            correct: 'severe'
        },
        {
            title: "Scenario 4:",
            description: `35-year-old pregnant woman with hand numbness.<br>
                • Median sensory latency: 4.0ms (prolonged)<br>
                • Median motor latency: 3.5ms (normal)<br>
                • Motor amplitudes: 14mV (normal)<br>
                • EMG: Normal voluntary motor units`,
            correct: 'mild'
        }
    ];

    // Cycle through scenarios
    if (!window.currentSeverityScenario) {
        window.currentSeverityScenario = 0;
    }
    window.currentSeverityScenario = (window.currentSeverityScenario + 1) % scenarios.length;

    const scenario = scenarios[window.currentSeverityScenario];
    const container = document.getElementById('severity-quiz-container');

    if (!container) return;

    container.innerHTML = `
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <h6 style="color: #475569; margin-bottom: 10px;">${scenario.title}</h6>
            <p style="color: #374151; margin-bottom: 15px; font-family: 'Courier New', monospace; font-size: 0.9em;">
                ${scenario.description}
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                <button onclick="checkNewSeverity('mild', '${scenario.correct}')" class="severity-option" style="padding: 10px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 6px; cursor: pointer; font-weight: 500; color: #065f46;">
                    Mild CTS
                </button>
                <button onclick="checkNewSeverity('moderate', '${scenario.correct}')" class="severity-option" style="padding: 10px; background: #fef3c7; border: 2px solid #f59e0b; border-radius: 6px; cursor: pointer; font-weight: 500; color: #92400e;">
                    Moderate CTS
                </button>
                <button onclick="checkNewSeverity('severe', '${scenario.correct}')" class="severity-option" style="padding: 10px; background: #fef2f2; border: 2px solid #dc2626; border-radius: 6px; cursor: pointer; font-weight: 500; color: #991b1b;">
                    Severe CTS
                </button>
            </div>

            <div id="severity-feedback-new" style="margin-top: 15px; padding: 10px; border-radius: 6px; display: none;">
                <!-- Feedback will be inserted here -->
            </div>
        </div>
    `;
};

window.checkNewSeverity = function(selectedSeverity, correctAnswer) {
    const feedbackDiv = document.getElementById('severity-feedback-new');

    if (!feedbackDiv) return;

    const explanations = {
        mild: {
            mild: "Correct! Only sensory involvement, normal motor studies, no denervation = MILD CTS.",
            moderate: "Not moderate because motor studies are completely normal. Moderate needs motor involvement.",
            severe: "Not severe - no denervation and normal motor studies. Far from severe criteria."
        },
        moderate: {
            mild: "Not mild because BOTH sensory and motor are affected. Mild = sensory only.",
            moderate: "Correct! Both sensory and motor involved, but amplitudes maintained and no denervation.",
            severe: "Not severe because no denervation on EMG and motor amplitudes are maintained."
        },
        severe: {
            mild: "Not mild - this has absent sensory studies and severe motor involvement with denervation.",
            moderate: "Not moderate because there is clear denervation on EMG and significant axon loss.",
            severe: "Correct! Denervation on EMG + axon loss (low amplitude) + absent sensory = SEVERE CTS."
        }
    };

    let feedbackContent = '';
    let bgColor = '';
    let borderColor = '';

    if (selectedSeverity === correctAnswer) {
        bgColor = '#f0fdf4';
        borderColor = '#16a34a';
        feedbackContent = `
            <div style="color: #15803d;">
                <h6 style="color: #15803d; margin-bottom: 8px;">✅ Correct! This is ${correctAnswer.toUpperCase()} CTS</h6>
                <p style="margin: 0; font-size: 0.9em;">
                    <strong>Explanation:</strong> ${explanations[correctAnswer][selectedSeverity]}
                </p>
            </div>
        `;
    } else {
        bgColor = '#fef2f2';
        borderColor = '#dc2626';
        feedbackContent = `
            <div style="color: #dc2626;">
                <h6 style="color: #dc2626; margin-bottom: 8px;">❌ Incorrect - This is ${correctAnswer.toUpperCase()} CTS</h6>
                <p style="margin: 0; font-size: 0.9em;">
                    <strong>Why not ${selectedSeverity}:</strong> ${explanations[correctAnswer][selectedSeverity]}<br><br>
                    <strong>Correct answer:</strong> ${explanations[correctAnswer][correctAnswer]}
                </p>
            </div>
        `;
    }

    feedbackDiv.style.display = 'block';
    feedbackDiv.style.background = bgColor;
    feedbackDiv.style.borderLeft = `3px solid ${borderColor}`;
    feedbackDiv.innerHTML = feedbackContent;

    // Disable all buttons after selection
    document.querySelectorAll('.severity-option').forEach(btn => {
        btn.style.opacity = '0.6';
        btn.style.pointerEvents = 'none';
    });
};



// Clinical Examples Database based on the 39 EMG conclusion screenshots
const clinicalExamplesDatabase = {
    "carpal-tunnel": [
        {
            id: "cts-bilateral-mild",
            title: "Bilateral Mild CTS",
            condition: "Carpal Tunnel Syndrome",
            severity: "Mild",
            conclusion: `1. Abnormal study.
2. The above study revealed electrodiagnostic abnormalities consistent with entrapment of both median nerves at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, bilaterally, affecting sensory fibers in a demyelinating process. There is no denervation noted in either APB muscle. Clinical correlation is indicated.
3. There is no electrodiagnostic evidence of an ulnar neuropathy or superficial radial sensory neuropathy in either upper extremity.
4. There is no electrodiagnostic evidence of a cervical radiculopathy in either upper extremity.`,
            keyTerms: ["electrodiagnostic abnormalities consistent with", "at the level of the wrist", "mild", "affecting sensory fibers", "demyelinating process", "no denervation"],
            professionalLanguage: "Uses precise anatomical localization and standard severity descriptors"
        }
    ],
    "normal": [
        {
            id: "normal-lower-extremity",
            title: "Normal Lower Extremity Study",
            condition: "Normal Study",
            severity: "N/A",
            conclusion: `1. Normal study.
2. No electrodiagnostic evidence of a lumbar radiculopathy or plexopathy in the right lower extremity.
3. No electrodiagnostic evidence of a large fiber peripheral neuropathy in the right lower extremity.
4. No electrodiagnostic evidence of a focal tibial, sciatic or peroneal entrapment neuropathy in the right lower extremity.`,
            keyTerms: ["Normal study", "No electrodiagnostic evidence of", "lumbar radiculopathy or plexopathy", "large fiber peripheral neuropathy"],
            professionalLanguage: "Standard normal study format with comprehensive exclusion statements"
        }
    ]
};

// Clinical Examples Functions
window.filterExamples = function(category) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.style.background = "#6b7280";
        btn.classList.remove("active-filter");
    });

    const activeBtn = document.getElementById(`filter-${category}`);
    if (activeBtn) {
        activeBtn.style.background = "#10b981";
        activeBtn.classList.add("active-filter");
    }

    const grid = document.getElementById("examples-grid");
    if (!grid) return;

    let examplesToShow = [];
    if (category === "all") {
        Object.values(clinicalExamplesDatabase).forEach(categoryExamples => {
            examplesToShow = examplesToShow.concat(categoryExamples);
        });
    } else {
        examplesToShow = clinicalExamplesDatabase[category] || [];
    }

    grid.innerHTML = examplesToShow.map(example => `
        <div onclick="showExampleDetail('${example.id}')" style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: between; align-items: flex-start; margin-bottom: 12px;">
                <h6 style="color: #1f2937; margin: 0; font-weight: 600; flex: 1;">${example.title}</h6>
                ${example.severity !== "N/A" ? `<span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: 500;">${example.severity}</span>` : ""}
            </div>
            <p style="color: #6b7280; margin-bottom: 15px; font-size: 0.9em;">${example.condition}</p>
            <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <p style="color: #374151; margin: 0; font-size: 0.85em; line-height: 1.4; font-family: 'Courier New', monospace;">
                    ${example.conclusion.split("\\n")[0]}<br>
                    ${example.conclusion.split("\\n")[1] ? example.conclusion.split("\\n")[1].substring(0, 80) + '...' : ''}
                </p>
            </div>
        </div>
    `).join("");
};

window.showExampleDetail = function(exampleId) {
    let example = null;
    Object.values(clinicalExamplesDatabase).forEach(categoryExamples => {
        const found = categoryExamples.find(ex => ex.id === exampleId);
        if (found) example = found;
    });
    if (!example) return;

    const modalContent = `
        <div style="max-width: 800px; background: white; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); max-height: 90vh; overflow-y: auto;">
            <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 25px; border-radius: 15px 15px 0 0;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.5em;">${example.title}</h3>
            </div>
            <div style="padding: 25px;">
                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #0ea5e9;">
                    <h5 style="color: #0c4a6e; margin-bottom: 12px;">💡 Professional Language Analysis</h5>
                    <p style="color: #075985; margin: 0; font-style: italic;">${example.professionalLanguage}</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h5 style="color: #1f2937; margin-bottom: 12px;">📄 Complete EMG Conclusion</h5>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                        <pre style="color: #374151; margin: 0; font-family: 'Courier New', monospace; font-size: 0.9em; line-height: 1.6; white-space: pre-wrap;">${example.conclusion}</pre>
                    </div>
                </div>
                <div style="display: flex; gap: 12px; margin-top: 25px;">
                    <button onclick="closeExampleDetail()" style="padding: 12px 20px; background: #6b7280; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer;">✕ Close</button>
                </div>
            </div>
        </div>
    `;

    const modalOverlay = document.createElement("div");
    modalOverlay.id = "example-detail-modal";
    modalOverlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; justify-content: center; align-items: center; padding: 20px;`;
    modalOverlay.innerHTML = modalContent;
    document.body.appendChild(modalOverlay);
};

window.closeExampleDetail = function() {
    const modal = document.getElementById("example-detail-modal");
    if (modal) modal.remove();
};

window.showLanguageComparison = function() {
    const trainingArea = document.getElementById("language-training-area");
    if (!trainingArea) return;
    trainingArea.style.display = "block";
    trainingArea.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 12px; margin-top: 15px;">
            <h6 style="color: #1f2937; margin-bottom: 15px;">🔄 Before/After Language Training</h6>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <h6 style="color: #dc2626; margin-bottom: 10px;">❌ Unprofessional</h6>
                    <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 3px solid #dc2626;">
                        <p style="color: #374151; margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em;">
                            "The patient has carpal tunnel syndrome that is not too bad. The nerve conduction study shows some problems with the median nerve at the wrist. No muscle damage was seen."
                        </p>
                    </div>
                </div>
                <div>
                    <h6 style="color: #10b981; margin-bottom: 10px;">✅ Professional</h6>
                    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 3px solid #10b981;">
                        <p style="color: #374151; margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em;">
                            "There are electrodiagnostic abnormalities consistent with entrapment of the median nerve at the level of the wrist consistent with carpal tunnel syndrome. Involvement appears to be mild, affecting sensory fibers in a demyelinating process. There is no denervation noted in the APB muscle."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.showTerminologyQuiz = function() {
    const trainingArea = document.getElementById("language-training-area");
    if (!trainingArea) return;
    trainingArea.style.display = "block";
    trainingArea.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 12px; margin-top: 15px;">
            <h6 style="color: #1f2937; margin-bottom: 15px;">📝 Professional Terminology Quiz</h6>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="color: #374151; margin-bottom: 15px; font-weight: 500;">Which phrase is most professional for describing carpal tunnel syndrome findings?</p>
                <div style="display: grid; gap: 10px;">
                    <button onclick="alert('Professional EMG language requires precise terminology. The correct answer uses: electrodiagnostic abnormalities consistent with entrapment at the level of the wrist.')" style="padding: 12px; background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 6px; cursor: pointer; text-align: left;">
                        A) "Electrodiagnostic abnormalities consistent with entrapment of the median nerve at the level of the wrist"
                    </button>
                </div>
            </div>
        </div>
    `;
};

window.loadAllExamples = function() {
    filterExamples("all");
};
