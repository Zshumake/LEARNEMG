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

// Content generation functions for each module type
function generateEMGIntroductionContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🎯 Learning Objectives</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Understand the role of electrodiagnostic (EDX) studies in evaluating neuromuscular disorders, the core components of NCS and EMG, and the systematic approach to localization.
                </p>
            </div>

            <!-- Core Concepts Section -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔍 What are Electrodiagnostic Studies?</h4>

                <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin: 0;">
                        <strong>Electrodiagnostic (EDX) studies</strong> play a key role in evaluating patients with neuromuscular disorders.
                        They include nerve conduction studies (NCSs), repetitive nerve stimulation, late responses, blink reflexes,
                        and needle electromyography (EMG).
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

            <!-- Clinical Integration -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.4em;">🩺 Extension of Clinical Examination</h4>

                <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                    <p style="color: #374151; font-size: 1.1em; line-height: 1.7; margin-bottom: 15px;">
                        <strong>EDX studies serve as an extension of the clinical examination</strong> and should always be considered as such.
                        A directed neurologic examination must always be performed before EDX studies.
                    </p>

                    <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                        <h6 style="color: #dc2626; margin-bottom: 10px;">⚠️ Critical Point</h6>
                        <p style="color: #374151; margin: 0; font-style: italic;">
                            "With numerous nerves and literally hundreds of muscles available, it is neither desirable for the patient
                            nor practical for the electromyographer to study them all. Each case must be individualized."
                        </p>
                    </div>
                </div>
            </div>

            <!-- Cardinal Rules Preview -->
            <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #c2410c; margin-bottom: 20px; font-size: 1.4em;">📋 Cardinal Rules of EDX Studies</h4>

                <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #92400e;">1.</strong> NCS and EMG are an extension of the clinical examination
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #92400e;">2.</strong> When in doubt, always think about technical factors
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #92400e;">3.</strong> When in doubt, reexamine the patient
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #92400e;">4.</strong> Always think about clinical-electrophysiologic correlation
                    </div>
                </div>
            </div>

            <!-- Interactive Knowledge Check -->
            <div class="quiz-section" style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 15px;">
                <h4 style="color: #0c4a6e; margin-bottom: 20px;">🧠 Knowledge Check</h4>
                <p style="color: #075985; font-weight: 500; margin-bottom: 20px;">What is the principal goal of every EDX study?</p>
                <div class="quiz-options">
                    <button class="quiz-option" onclick="checkAnswer(this, false)">To determine the exact etiology of the disorder</button>
                    <button class="quiz-option" onclick="checkAnswer(this, true)">To localize the disorder</button>
                    <button class="quiz-option" onclick="checkAnswer(this, false)">To replace the clinical examination</button>
                    <button class="quiz-option" onclick="checkAnswer(this, false)">To study all available nerves and muscles</button>
                </div>
            </div>
        </div>
    `;
}

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

            <!-- EMG Muscle Localization Tool -->
            <div class="muscle-localization-tool" style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 5px solid #059669;">
                <div class="localization-header" style="margin-bottom: 25px;">
                    <h3 style="color: #065f46; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                        🎯 EMG Needle Localization Guide
                    </h3>
                    <p style="color: #374151; margin: 0; font-size: 1.1em;">
                        Professional guidance for precise EMG needle placement with anatomical landmarks and positioning instructions.
                    </p>
                </div>

                <!-- Region Selector -->
                <div class="region-selection" style="margin-bottom: 25px;">
                    <h4 style="color: #374151; margin-bottom: 15px;">📍 Select Body Region</h4>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <button
                            class="region-btn active"
                            data-region="upper"
                            onclick="MuscleLocalization.switchRegion('upper')"
                            style="
                                padding: 12px 24px;
                                background: linear-gradient(135deg, #059669, #047857);
                                color: white;
                                border: none;
                                border-radius: 10px;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            "
                        >
                            💪 Upper Extremity
                        </button>
                        <button
                            class="region-btn"
                            data-region="lower"
                            onclick="MuscleLocalization.switchRegion('lower')"
                            style="
                                padding: 12px 24px;
                                background: #f3f4f6;
                                color: #6b7280;
                                border: 2px solid #e5e7eb;
                                border-radius: 10px;
                                font-weight: 600;
                                cursor: not-allowed;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                opacity: 0.6;
                            "
                            disabled
                        >
                            🦵 Lower Extremity <span style="font-size: 0.8em;">(Coming Soon)</span>
                        </button>
                    </div>
                </div>

                <!-- Muscle Grid -->
                <div class="muscle-grid-container">
                    <h4 style="color: #374151; margin-bottom: 15px;">🔍 Select Muscle for Localization</h4>
                    <div id="muscle-localization-grid" class="muscle-grid" style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        gap: 15px;
                        margin-bottom: 25px;
                    ">
                        <!-- Muscle cards will be populated by JavaScript -->
                    </div>
                </div>

                <!-- Muscle Detail View -->
                <div id="muscle-detail-view" class="muscle-detail" style="display: none; background: #f8fafc; padding: 25px; border-radius: 12px; border: 2px solid #e2e8f0;">
                    <!-- Muscle details will be populated by JavaScript -->
                </div>
            </div>

            <!-- Muscle Localization Script will be loaded from global scope -->
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
                    Master the fundamental principles of nerve conduction studies including action potential propagation, compound potentials, and velocity calculations essential for EMG interpretation.
                </p>
            </div>

            <!-- Core Concepts Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid rgba(59, 130, 246, 0.1);">
                    <h4 style="color: #1e40af; margin-bottom: 20px; font-size: 1.3em;">⚡ Action Potential Basics</h4>
                    <ul style="color: #374151; line-height: 1.7; padding-left: 20px;">
                        <li><strong>Resting Potential:</strong> -70mV (Na+/K+ pump)</li>
                        <li><strong>Threshold:</strong> -55mV triggers depolarization</li>
                        <li><strong>Depolarization:</strong> Na+ channels open (+30mV)</li>
                        <li><strong>Repolarization:</strong> K+ channels restore resting</li>
                    </ul>

                    <div style="background: #f0f9ff; padding: 15px; border-radius: 10px; margin-top: 15px;">
                        <p style="color: #0c4a6e; font-weight: 600; margin: 0;">🔑 Key Point: Speed depends on myelination and axon diameter</p>
                    </div>
                </div>

                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid rgba(16, 185, 129, 0.1);">
                    <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.3em;">📊 Compound Potentials</h4>
                    <div style="margin-bottom: 15px;">
                        <h5 style="color: #047857; margin-bottom: 10px;">CMAP (Motor)</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em;">
                            <li>Stimulate nerve → Record from muscle</li>
                            <li>Amplitude: Number of functioning axons</li>
                            <li>Latency: Fastest conducting fibers</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="color: #047857; margin-bottom: 10px;">SNAP (Sensory)</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em;">
                            <li>Stimulate & record from same nerve</li>
                            <li>Lower amplitude than CMAP</li>
                            <li>More sensitive to pathology</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Interactive Calculation Section -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🧮 Conduction Velocity Calculation</h4>

                <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                    <h5 style="color: #1f2937; margin-bottom: 15px;">Formula: CV = Distance / (Proximal Latency - Distal Latency)</h5>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; text-align: center; margin: 20px 0;">
                        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                            <div style="font-weight: 600; color: #374151;">Distance</div>
                            <div style="font-size: 1.2em; color: #6b7280; margin: 5px 0;">14 cm</div>
                        </div>
                        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                            <div style="font-weight: 600; color: #374151;">Proximal Lat</div>
                            <div style="font-size: 1.2em; color: #6b7280; margin: 5px 0;">4.2 ms</div>
                        </div>
                        <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                            <div style="font-weight: 600; color: #374151;">Distal Lat</div>
                            <div style="font-size: 1.2em; color: #6b7280; margin: 5px 0;">3.8 ms</div>
                        </div>
                    </div>

                    <div style="text-align: center; background: #f0fdf4; padding: 15px; border-radius: 8px; border: 2px solid #22c55e;">
                        <strong style="color: #166534; font-size: 1.2em;">Result: 14 ÷ (4.2 - 3.8) = 35 m/s</strong>
                    </div>
                </div>
            </div>

            <!-- Clinical Applications -->
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                <h4 style="color: #7c2d12; margin-bottom: 20px; font-size: 1.3em;">🏥 Clinical Applications</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="color: #ea580c; margin-bottom: 12px;">Normal Values (Adult)</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li><strong>Motor CV:</strong> >50 m/s (upper), >40 m/s (lower)</li>
                            <li><strong>Sensory CV:</strong> >50 m/s</li>
                            <li><strong>Distal Latency:</strong> <4.5ms (median motor)</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="color: #ea580c; margin-bottom: 12px;">Abnormal Findings</h5>
                        <ul style="color: #374151; line-height: 1.6;">
                            <li><strong>Demyelination:</strong> Slow CV, prolonged latency</li>
                            <li><strong>Axonal Loss:</strong> Low amplitude, normal CV</li>
                            <li><strong>Conduction Block:</strong> Amplitude drop >50%</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Interactive Quiz -->
            <div class="quiz-section">
                <h4 style="color: #1e40af; margin-bottom: 20px;">🧠 Knowledge Check</h4>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 2px solid rgba(59, 130, 246, 0.2);">
                    <p style="font-size: 1.1em; margin-bottom: 15px; color: #1f2937;">
                        A median motor nerve study shows: Distal latency 5.2ms, Proximal latency 7.8ms, Distance 18cm.
                        What is the conduction velocity?
                    </p>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkNCSAnswer(this, false)">42 m/s - Normal</button>
                        <button class="quiz-option" onclick="checkNCSAnswer(this, true)">69 m/s - Abnormally fast</button>
                        <button class="quiz-option" onclick="checkNCSAnswer(this, false)">18 m/s - Severely slow</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

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
                    Develop skills in recognizing and interpreting basic EMG patterns including normal activity, abnormal spontaneous discharges, and motor unit potentials for accurate diagnosis.
                </p>
            </div>

            <!-- Pattern Recognition Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid rgba(34, 197, 94, 0.1);">
                    <h4 style="color: #059669; margin-bottom: 20px; font-size: 1.3em;">✅ Normal Patterns</h4>

                    <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h5 style="color: #166534; margin-bottom: 10px;">Insertional Activity</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em;">
                            <li>Brief (50-300ms) burst with needle movement</li>
                            <li>Stops immediately when needle stops</li>
                            <li>Normal "popping" or "crackling" sound</li>
                        </ul>
                    </div>

                    <div style="background: #f0fdf4; padding: 15px; border-radius: 10px;">
                        <h5 style="color: #166534; margin-bottom: 10px;">At Rest</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em;">
                            <li>Complete electrical silence</li>
                            <li>No spontaneous activity</li>
                            <li>Flat baseline on EMG</li>
                        </ul>
                    </div>
                </div>

                <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid rgba(239, 68, 68, 0.1);">
                    <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.3em;">⚠️ Abnormal Spontaneous Activity</h4>

                    <div style="background: #fef2f2; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h5 style="color: #991b1b; margin-bottom: 10px;">Fibrillation Potentials</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em;">
                            <li>Small, sharp, brief (1-5ms)</li>
                            <li>Regular firing rate (0.5-15 Hz)</li>
                            <li>High-pitched "tick" sound</li>
                        </ul>
                    </div>

                    <div style="background: #fef2f2; padding: 15px; border-radius: 10px;">
                        <h5 style="color: #991b1b; margin-bottom: 10px;">Positive Sharp Waves</h5>
                        <ul style="color: #374151; line-height: 1.6; font-size: 0.95em;">
                            <li>Initial positive deflection</li>
                            <li>Slow negative return (10-100ms)</li>
                            <li>Low-pitched "dull thud" sound</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Audio-Visual Pattern Guide -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">🔊 Audio Pattern Recognition</h4>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                    <div style="background: white; padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 2em; margin-bottom: 10px;">🔇</div>
                        <h5 style="color: #059669; margin-bottom: 8px;">Normal Rest</h5>
                        <p style="color: #6b7280; font-size: 0.9em; margin: 0;">"Complete silence"</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 2em; margin-bottom: 10px;">🎵</div>
                        <h5 style="color: #dc2626; margin-bottom: 8px;">Fibrillations</h5>
                        <p style="color: #6b7280; font-size: 0.9em; margin: 0;">"Rain on tin roof"</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 12px; text-align: center;">
                        <div style="font-size: 2em; margin-bottom: 10px;">✈️</div>
                        <h5 style="color: #7c2d12; margin-bottom: 8px;">Myotonic</h5>
                        <p style="color: #6b7280; font-size: 0.9em; margin: 0;">"Dive bomber"</p>
                    </div>
                </div>

                <div style="background: white; padding: 20px; border-radius: 12px; margin-top: 20px;">
                    <h5 style="color: #92400e; margin-bottom: 15px;">Clinical Correlation</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <strong style="color: #dc2626;">Denervation (Fibs + PSWs):</strong>
                            <ul style="color: #374151; line-height: 1.6; margin-top: 8px; font-size: 0.95em;">
                                <li>Radiculopathy</li>
                                <li>Peripheral neuropathy</li>
                                <li>Motor neuron disease</li>
                            </ul>
                        </div>
                        <div>
                            <strong style="color: #7c2d12;">Myopathy Patterns:</strong>
                            <ul style="color: #374151; line-height: 1.6; margin-top: 8px; font-size: 0.95em;">
                                <li>Small, brief MUPs</li>
                                <li>Early recruitment</li>
                                <li>Polyphasic potentials</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Practice Exercise -->
            <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 25px;">
                <h4 style="color: #6366f1; margin-bottom: 20px; font-size: 1.3em;">🎯 Pattern Recognition Exercise</h4>

                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h5 style="color: #475569; margin-bottom: 15px;">Scenario: 45-year-old with progressive hand weakness</h5>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 15px;">
                        EMG of first dorsal interosseous shows abundant fibrillation potentials and positive sharp waves at rest.
                        Motor unit potentials are large, polyphasic, and fire at rapid rates with minimal effort.
                    </p>

                    <div style="background: #eff6ff; padding: 15px; border-radius: 10px;">
                        <strong style="color: #1e40af;">What does this pattern suggest?</strong>
                    </div>
                </div>
            </div>

            <!-- Interactive Quiz -->
            <div class="quiz-section">
                <h4 style="color: #6366f1; margin-bottom: 20px;">🧠 Pattern Recognition Quiz</h4>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 2px solid rgba(99, 102, 241, 0.2);">
                    <p style="font-size: 1.1em; margin-bottom: 15px; color: #1f2937;">
                        You hear a regular "tick-tick-tick" sound during needle EMG at rest. The waveforms are small,
                        sharp, and brief. This most likely represents:
                    </p>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkPatternAnswer(this, true)">Fibrillation potentials</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Fasciculation potentials</button>
                        <button class="quiz-option" onclick="checkPatternAnswer(this, false)">Normal insertional activity</button>
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

            <!-- Nerve Navigation System -->
            <div style="background: linear-gradient(135deg, #e0f2fe, #b3e5fc); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #0ea5e9;">
                <h4 style="color: #0c4a6e; margin-bottom: 20px; font-size: 1.4em;">🧠 Peripheral Nerve Pathophysiology Navigator</h4>

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
                            <div id="pathway-steps" style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #bae6fd; min-height: 200px;">
                                <p style="color: #64748b; text-align: center; margin-top: 60px;">Select a nerve to see pathway steps</p>
                            </div>
                            <div style="text-align: center; margin-top: 15px;">
                                <button onclick="previousStep()" id="prev-btn" style="background: #0ea5e9; color: white; border: none; padding: 8px 15px; border-radius: 6px; margin-right: 10px; cursor: pointer;" disabled>← Previous</button>
                                <button onclick="nextStep()" id="next-btn" style="background: #0ea5e9; color: white; border: none; padding: 8px 15px; border-radius: 6px; margin-right: 10px; cursor: pointer;" disabled>Next →</button>
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

                document.getElementById('pathway-steps').innerHTML = stepsHtml;

                // Update button states
                document.getElementById('prev-btn').disabled = stepIndex === 0;
                document.getElementById('next-btn').disabled = stepIndex === explorer.maxSteps - 1;
                document.getElementById('prev-btn').style.opacity = stepIndex === 0 ? '0.5' : '1';
                document.getElementById('next-btn').style.opacity = stepIndex === explorer.maxSteps - 1 ? '0.5' : '1';
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
                    Master the essential components of EMG report writing including clinical correlation, technical parameters, and diagnostic conclusions that meet professional standards.
                </p>
            </div>

            <!-- Report Structure Template -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #92400e; margin-bottom: 20px; font-size: 1.4em;">📝 Standard EMG Report Structure</h4>

                <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; font-family: 'Courier New', monospace;">
                    <h5 style="color: #1f2937; margin-bottom: 15px;">Template Example:</h5>
                    <div style="color: #374151; line-height: 1.8;">
                        <strong>CLINICAL HISTORY:</strong><br>
                        [Age]-year-old [gender] with [chief complaint] and [relevant symptoms]<br><br>

                        <strong>NERVE CONDUCTION STUDIES:</strong><br>
                        Motor: [List tested nerves with latencies, amplitudes, velocities]<br>
                        Sensory: [List tested nerves with latencies, amplitudes, velocities]<br><br>

                        <strong>NEEDLE EMG:</strong><br>
                        [Muscles tested] - [Insertional activity, spontaneous activity, voluntary activity]<br><br>

                        <strong>IMPRESSION:</strong><br>
                        [Primary diagnosis with severity and pattern]<br>
                        [Supporting evidence from study findings]
                    </div>
                </div>

                <!-- Quiz Section -->
                <div class="quiz-section" style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px;">
                    <h4 style="color: #065f46; margin-bottom: 20px;">🧠 Knowledge Check</h4>
                    <p style="color: #047857; font-weight: 500; margin-bottom: 20px;">Which element is MOST critical for medicolegal documentation in EMG reports?</p>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkReportAnswer(this, false)">Patient comfort level during procedure</button>
                        <button class="quiz-option" onclick="checkReportAnswer(this, true)">Clinical correlation with symptoms and examination findings</button>
                        <button class="quiz-option" onclick="checkReportAnswer(this, false)">Duration of the procedure in minutes</button>
                        <button class="quiz-option" onclick="checkReportAnswer(this, false)">Type of needle electrode used</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateClinicalCorrelationContent(module) {
    console.log('🎯 Clinical Correlation clicked - showing difficulty selection');

    return `
        <div class="interactive-content">
            <!-- Clinical Cases Header -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border: 2px solid #0ea5e9;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 48px;">🩺</div>
                    <div>
                        <h3 style="margin: 0; color: #0c4a6e; font-size: 24px;">Clinical Cases System</h3>
                        <p style="margin: 5px 0 0 0; color: #0369a1;">Complete EMG/NCS case-based learning with clinical workflow</p>
                    </div>
                </div>
            </div>

            <!-- Difficulty Selection -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h4 style="color: #1f2937; margin-bottom: 20px; font-size: 20px;">Choose Your Training Level</h4>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 800px; margin: 0 auto;">
                    <!-- Beginner Level -->
                    <div onclick="ClinicalCases.startBeginnerCases()"
                         style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px 20px; border-radius: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);"
                         onmouseover="this.style.transform='translateY(-5px) scale(1.02)'; this.style.boxShadow='0 8px 25px rgba(16, 185, 129, 0.4)'"
                         onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 4px 15px rgba(16, 185, 129, 0.3)'">
                        <div style="font-size: 48px; margin-bottom: 15px;">🟢</div>
                        <h5 style="margin: 0 0 10px 0; font-size: 18px;">BEGINNER</h5>
                        <p style="margin: 0; font-size: 14px; opacity: 0.9;">PGY-2 Level<br>Basic cases with guidance</p>
                    </div>

                    <!-- Intermediate Level -->
                    <div onclick="ClinicalCases.startIntermediateCases()"
                         style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px 20px; border-radius: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);"
                         onmouseover="this.style.transform='translateY(-5px) scale(1.02)'; this.style.boxShadow='0 8px 25px rgba(245, 158, 11, 0.4)'"
                         onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 4px 15px rgba(245, 158, 11, 0.3)'">
                        <div style="font-size: 48px; margin-bottom: 15px;">🟠</div>
                        <h5 style="margin: 0 0 10px 0; font-size: 18px;">INTERMEDIATE</h5>
                        <p style="margin: 0; font-size: 14px; opacity: 0.9;">PGY-3 Level<br>Moderate complexity cases</p>
                    </div>

                    <!-- Advanced Level -->
                    <div onclick="ClinicalCases.startExpertCases()"
                         style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px 20px; border-radius: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);"
                         onmouseover="this.style.transform='translateY(-5px) scale(1.02)'; this.style.boxShadow='0 8px 25px rgba(239, 68, 68, 0.4)'"
                         onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 4px 15px rgba(239, 68, 68, 0.3)'">
                        <div style="font-size: 48px; margin-bottom: 15px;">🔴</div>
                        <h5 style="margin: 0 0 10px 0; font-size: 18px;">ADVANCED</h5>
                        <p style="margin: 0; font-size: 14px; opacity: 0.9;">PGY-4 Level<br>Complex clinical cases</p>
                    </div>
                </div>
            </div>

            <!-- Clinical Workflow Information -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #6b9f78;">
                <h5 style="color: #1f2937; margin: 0 0 15px 0;">📋 Complete Clinical Workflow</h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="text-align: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">📋</div>
                        <div style="font-size: 12px; color: #64748b;">1. History</div>
                    </div>
                    <div style="text-align: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🔍</div>
                        <div style="font-size: 12px; color: #64748b;">2. Physical Exam</div>
                    </div>
                    <div style="text-align: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🤔</div>
                        <div style="font-size: 12px; color: #64748b;">3. Differential</div>
                    </div>
                    <div style="text-align: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">⚡</div>
                        <div style="font-size: 12px; color: #64748b;">4. EMG Decision</div>
                    </div>
                    <div style="text-align: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">📊</div>
                        <div style="font-size: 12px; color: #64748b;">5. Results</div>
                    </div>
                    <div style="text-align: center; padding: 10px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🎯</div>
                        <div style="font-size: 12px; color: #64748b;">6. Diagnosis</div>
                    </div>
                </div>
            </div>

            <!-- Add required DOM elements for clinical cases system -->
            <div id="case-selection" style="display: none;"></div>
            <div id="case-interface" style="display: none;">
                <!-- Progress Bar -->
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 10px;">
                        <span id="progress-text" style="font-weight: 600; color: #374151;">Starting case...</span>
                        <span style="font-size: 14px; color: #6b7280;">Progress</span>
                    </div>
                    <div class="progress-bar">
                        <div id="progress-bar" class="progress-fill" style="width: 0%;"></div>
                    </div>
                </div>

                <!-- Case Steps -->
                <div id="case-presentation-step" class="case-step">
                    <div id="case-details"></div>
                    <button onclick="ClinicalCases.showPhysicalExam()" class="quiz-button" style="margin-top: 20px;">Continue to Physical Examination →</button>
                </div>

                <div id="physical-exam-step" class="case-step">
                    <h4 style="color: #1f2937; margin-bottom: 20px;">🔍 Physical Examination</h4>
                    <div id="physical-exam-details"></div>
                    <button onclick="ClinicalCases.showDifferentialBuilder()" class="quiz-button" style="margin-top: 20px;">Continue to Differential Diagnosis →</button>
                </div>

                <div id="differential-step" class="case-step">
                    <h4 style="color: #1f2937; margin-bottom: 20px;">🤔 Differential Diagnosis</h4>
                    <p style="color: #374151; margin-bottom: 15px;">Based on the history and physical examination, what is your differential diagnosis?</p>
                    <textarea id="user-differential" class="differential-input" placeholder="Enter your differential diagnosis (list the most likely diagnoses in order of likelihood)..."></textarea>
                    <div id="differential-feedback"></div>
                    <div style="margin-top: 15px;">
                        <button onclick="ClinicalCases.checkDifferential()" class="quiz-button">Submit Differential</button>
                        <button id="continue-to-studies" onclick="ClinicalCases.showEMGDecision()" class="quiz-button" style="display: none; margin-left: 10px;">Continue to EMG Decision →</button>
                    </div>
                </div>

                <div id="emg-decision-step" class="case-step">
                    <h4 style="color: #1f2937; margin-bottom: 20px;">⚡ EMG/NCS Decision</h4>
                    <p style="color: #374151; margin-bottom: 20px;">Based on your clinical assessment, would you recommend EMG/NCS studies for this patient?</p>
                    <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
                        <button onclick="ClinicalCases.makeEMGDecision(true)" class="quiz-button" style="background: #10b981;">Yes - EMG/NCS Indicated</button>
                        <button onclick="ClinicalCases.makeEMGDecision(false)" class="quiz-button" style="background: #ef4444;">No - EMG/NCS Not Indicated</button>
                    </div>
                    <div id="emg-decision-feedback"></div>
                    <button id="continue-after-decision" onclick="ClinicalCases.proceedAfterDecision()" class="quiz-button" style="display: none; margin-top: 15px;">Continue →</button>
                </div>

                <div id="results-step" class="case-step">
                    <h4 style="color: #1f2937; margin-bottom: 20px;">📊 EMG/NCS Results</h4>
                    <div id="ncs-results"></div>
                    <div id="emg-results" style="display: none;">
                        <h5 style="color: #1f2937; margin: 20px 0 15px 0;">🔍 EMG Findings</h5>
                        <div id="emg-details"></div>
                    </div>
                    <button onclick="ClinicalCases.showFinalDiagnosis()" class="quiz-button" style="margin-top: 20px;">Continue to Final Diagnosis →</button>
                </div>

                <div id="diagnosis-step" class="case-step">
                    <h4 style="color: #1f2937; margin-bottom: 20px;">🎯 Final Diagnosis</h4>
                    <p style="color: #374151; margin-bottom: 15px;">Based on all the clinical and electrodiagnostic information, what is your final diagnosis?</p>
                    <input type="text" id="final-diagnosis" style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; margin-bottom: 15px;" placeholder="Enter your final diagnosis...">
                    <div id="diagnosis-feedback"></div>
                    <div style="margin-top: 20px;">
                        <button onclick="ClinicalCases.checkDiagnosis()" class="quiz-button">Submit Diagnosis</button>
                        <button onclick="ClinicalCases.startNewCase()" class="quiz-button" style="background: #6b9f78; margin-left: 15px;">Start New Case</button>
                    </div>
                </div>
            </div>
        </div>
    `;
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
        case 'radiculopathy-pathophysiology':
            return generateRadiculopathyContent(module);
        case 'neuropathy-pathophysiology':
            return generateNeuropathyContent(module);
        case 'ncs-fundamentals':
            return generateNCSFundamentalsContent(module);
        case 'ncs-techniques':
            return generateNCSTechniquesContent(module);
        case 'emg-needle-basics':
            return generateEMGNeedleBasicsContent(module);
        case 'basic-patterns':
            return generateBasicPatternsContent(module);
        case 'report-writing':
            return generateReportWritingContent(module);
        case 'clinical-correlation':
            return generateClinicalCorrelationContent(module);
        case 'clinical-cases-system':
            return generateClinicalCasesSystemContent(module);
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

