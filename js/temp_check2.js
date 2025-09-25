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
                    <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.4em;">📋 Six Cardinal Rules of EDX Studies</h4>

                    <div style="display: grid; gap: 20px;">
                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #dc2626;">
                            <h5 style="color: #dc2626; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #dc2626; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                                NCS and Needle EMG are Complementary
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Always perform both NCS and needle EMG during the same session.</strong> They provide different but complementary information about the nervous system.
                            </p>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px;">
                                <p style="color: #991b1b; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Key Point:</strong> NCS assess large, myelinated motor and sensory fibers, while needle EMG evaluates motor unit function and can detect abnormalities in small, unmyelinated fibers not assessed by NCS.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #ea580c;">
                            <h5 style="color: #ea580c; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #ea580c; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                                Study the Asymptomatic Side for Comparison
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Always examine the contralateral asymptomatic side</strong> to establish normal values for that individual and identify subclinical abnormalities.
                            </p>
                            <div style="background: #fff7ed; padding: 15px; border-radius: 8px;">
                                <p style="color: #9a3412; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Clinical Relevance:</strong> Individual variation in nerve conduction values requires internal controls. Bilateral studies may reveal systemic processes like polyneuropathy.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #d97706;">
                            <h5 style="color: #d97706; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #d97706; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                                Study Both Proximal and Distal Muscles
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Examine muscles at different levels</strong> to determine the anatomical extent and distribution of the lesion.
                            </p>
                            <div style="background: #fffbeb; padding: 15px; border-radius: 8px;">
                                <p style="color: #92400e; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Localization Strategy:</strong> Proximal involvement suggests nerve root, plexus, or proximal nerve lesions. Distal-only involvement suggests peripheral neuropathy or distal entrapment.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #059669;">
                            <h5 style="color: #059669; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #059669; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</span>
                                Examine Multiple Nerve Root Levels
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Sample muscles innervated by different nerve roots</strong> to distinguish radiculopathy from other disorders.
                            </p>
                            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
                                <p style="color: #166534; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Differential Diagnosis:</strong> Single root involvement suggests radiculopathy. Multi-root involvement may indicate plexopathy, polyneuropathy, or motor neuron disease.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #0891b2;">
                            <h5 style="color: #0891b2; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #0891b2; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</span>
                                Correlate with Clinical Findings
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>EDX findings must correlate with clinical symptoms and signs.</strong> Discordant findings require further evaluation or study modification.
                            </p>
                            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                                <p style="color: #0c4a6e; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Clinical Integration:</strong> Asymptomatic EDX abnormalities may represent subclinical disease, age-related changes, or anatomical variants. Always interpret in clinical context.
                                </p>
                            </div>
                        </div>

                        <div style="background: white; padding: 25px; border-radius: 12px; border-left: 5px solid #7c3aed;">
                            <h5 style="color: #7c3aed; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="background: #7c3aed; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">6</span>
                                Consider Technical and Physiological Factors
                            </h5>
                            <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                                <strong>Account for factors that affect nerve conduction:</strong> temperature, age, height, edema, and cooperation level.
                            </p>
                            <div style="background: #faf5ff; padding: 15px; border-radius: 8px;">
                                <p style="color: #6b21a8; font-size: 0.95em; line-height: 1.5; margin: 0;">
                                    <strong>Quality Assurance:</strong> Maintain limb temperature >32°C, ensure proper electrode placement, minimize stimulus artifact, and optimize patient positioning for accurate results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
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

