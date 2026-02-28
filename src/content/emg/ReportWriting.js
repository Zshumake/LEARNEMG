
import { generateErnestButton } from '../../modules/audio/AudioData.js';

export class ReportWritingModule {
    constructor() {
        this.reportData = {
            patient: {
                name: '', dob: '', mrn: '', date: new Date().toISOString().split('T')[0],
                referring: '', tech: '', instrument: '', history: '',
                handTemp: '', footTemp: ''
            },
            ncs: {
                sensory: [], // { nerve, latency, amp, dist, velocity }
                motor: []    // { nerve, latency, amp, velocity, fwave }
            },
            emg: [], // { muscle, side, insertional, fibs, psw, fasc, muapAmp, muapDur, recruitment }
            summary: {
                narrative: '',
                limitations: '',
                comparison: '',
                diagnosis: '',
                recommendations: '',
                intervalChange: 'None (Baseline)'
            }
        };
        this.currentTemplateStep = 1;

        // Standard Value Constants
        this.STANDARD_NCS_VALUES = {
            sensory: {
                'Median Sensory (Digit 2)': 14.0, 'Median Sensory (Digit 3)': 14.0, 'Median Sensory Palmar': 7.0,
                'Ulnar Sensory (Digit 5)': 14.0, 'Dorsal Ulnar Cutaneous': 8.0, 'Radial Sensory (Thumb)': 14.0,
                'Medial Antebrachial Cutaneous': 12.0, 'Lateral Antebrachial Cutaneous': 12.0,
                'Superficial Fibular Sensory': 14.0, 'Sural Sensory': 14.0, 'Saphenous Sensory': 14.0,
                'Lateral Femoral Cutaneous': 12.0, 'Medial Plantar Sensory': 14.0, 'Lateral Plantar Sensory': 14.0,
                'Lumbrical-Interossei Comparison': 10.0, 'Median vs Ulnar (Digit 4)': 10.0,
                'Median vs Radial (Digit 1)': 10.0, 'Median Palmar Mixed': 8.0, 'Ulnar Palmar Mixed': 8.0
            }
        };

        this.STANDARD_EMG_MUSCLES = {
            ue: [
                "Trapezius (upper)", "Rhomboids", "Serratus anterior", "Supraspinatus", "Infraspinatus",
                "Subscapularis", "Teres major", "Pectoralis major", "Latissimus dorsi", "Deltoid",
                "Teres minor", "Biceps brachii", "Brachialis", "Coracobrachialis", "Brachioradialis",
                "Triceps brachii", "Anconeus", "Extensor carpi radialis", "Supinator", "Extensor digitorum",
                "Extensor carpi ulnaris", "Extensor pollicis longus", "Extensor indicis", "Abductor pollicis longus",
                "Pronator teres", "Flexor carpi radialis", "Palmaris longus", "Flexor digitorum superficialis",
                "Flexor digitorum profundus (digits 2&3)", "Flexor pollicis longus", "Pronator quadratus",
                "Abductor pollicis brevis", "Opponens pollicis", "Flexor carpi ulnaris",
                "Flexor digitorum profundus (digits 4&5)", "Adductor pollicis", "First dorsal interosseous",
                "Abductor digiti minimi"
            ],
            le: [
                "Gluteus medius", "Gluteus minimus", "Tensor fasciae latae", "Gluteus maximus", "Piriformis",
                "Iliopsoas", "Pectineus", "Rectus femoris", "Vastus lateralis", "Vastus medialis",
                "Vastus intermedius", "Sartorius", "Obturator externus", "Adductor longus", "Adductor magnus",
                "Gracilis", "Biceps femoris", "Semitendinosus", "Semimembranosus", "Gastrocnemius",
                "Soleus", "Tibialis posterior", "Flexor digitorum longus", "Flexor hallucis longus",
                "Abductor hallucis", "Abductor digiti minimi pedis", "Tibialis anterior", "Extensor digitorum longus",
                "Extensor hallucis longus", "Extensor digitorum brevis", "Peroneus tertius", "Fibularis longus",
                "Fibularis brevis"
            ]
        };

        // Bind methods to this instance for global access
        this.switchReportTab = this.switchReportTab.bind(this);
        this.showTutorialStep = this.showTutorialStep.bind(this);
        this.initGlobalBindings();
    }

    initGlobalBindings() {
        window.switchReportTab = (tab) => this.switchReportTab(tab);
        window.showTutorialStep = (step) => this.showTutorialStep(step);
        window.generateAIDraft = () => this.generateAIDraft();
        window.copyAIDraft = () => this.copyAIDraft();
        window.generateBockenekReport = () => this.generateBockenekReport();
        window.copyBockenekDraft = () => this.copyBockenekDraft();
        window.handleBockenekImage = (input) => this.handleBockenekImage(input);
    }

    render() {
        console.log('📝 Initializing Report Writing Module...');

        // Ensure globals are bound when render is called
        this.initGlobalBindings();

        return `
            <div class="interactive-content" style="max-width: 1400px; margin: 0 auto; position: relative;">
                ${generateErnestButton('simple-reports', 'Report Writing')}

                <!-- Tab Navigation -->
                <div style="display: flex; gap: 15px; margin-bottom: 30px; border-bottom: 3px solid #e5e7eb; padding-bottom: 0;">
                    <button id="tutorial-tab" onclick="switchReportTab('tutorial')"
                        style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease;">
                        📚 Interactive Tutorial
                    </button>
                    <button id="scenarios-tab" onclick="switchReportTab('scenarios')"
                        style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: white; color: #64748b; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease;">
                        📂 Ideal Reports (Samples)
                    </button>
                    <button id="ai-tab" onclick="switchReportTab('ai')"
                        style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: white; color: #64748b; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease;">
                        🤖 AI Draft Assistant
                    </button>
                    <button id="bockenek-tab" onclick="switchReportTab('bockenek')"
                        style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: white; color: #64748b; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease;">
                        👨‍⚕️ Dr. Bockenek's Template
                    </button>
                </div>

                <!-- Tutorial Section -->
                <div id="tutorial-section" style="display: block;">
                    ${this.generateTutorialContent()}
                </div>

                <!-- Ideal Reports Section -->
                <div id="scenarios-section" style="display: none;">
                    ${this.generateScenariosContent()}
                </div>

                <!-- AI Assistant Section -->
                <div id="ai-section" style="display: none;">
                    ${this.generateAISectionContent()}
                </div>

                <!-- Dr. Bockenek Section -->
                <div id="bockenek-section" style="display: none;">
                    ${this.generateBockenekSectionContent()}
                </div>
            </div>
        `;
    }

    switchReportTab(tab) {
        ['tutorial', 'scenarios', 'ai', 'bockenek'].forEach(t => {
            const section = document.getElementById(`${t}-section`);
            const btn = document.getElementById(`${t}-tab`);
            if (section) section.style.display = t === tab ? 'block' : 'none';
            if (btn) {
                if (t === tab) {
                    btn.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
                    btn.style.color = 'white';
                    btn.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                } else {
                    btn.style.background = 'white';
                    btn.style.color = '#64748b';
                    btn.style.boxShadow = 'none';
                }
            }
        });
    }

    // ==========================================
    // TUTORIAL METHODS
    // ==========================================

    showTutorialStep(step) {
        for (let i = 1; i <= 5; i++) {
            const stepDiv = document.getElementById(`tutorial-step-${i}`);
            if (stepDiv) stepDiv.style.display = 'none';
        }
        const targetStep = document.getElementById(`tutorial-step-${step}`);
        if (targetStep) targetStep.style.display = 'block';

        const progressContainer = document.getElementById('tutorial-progress');
        if (progressContainer) {
            progressContainer.innerHTML = this.generateProgressBar(step, 5);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        const tutorialSection = document.getElementById('tutorial-section');
        if (tutorialSection) {
            tutorialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    generateTutorialContent() {
        return `
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h2 style="color: #1e293b; font-size: 2.2rem; margin-bottom: 15px;">📋 AANEM Report Writing Tutorial</h2>
                    <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0 auto;">
                        Learn how to write professional electrodiagnostic reports following AANEM guidelines.
                    </p>
                </div>
                <div id="tutorial-progress" style="margin-bottom: 40px;">
                    ${this.generateProgressBar(1, 5)}
                </div>
                <div id="tutorial-content">
                    <div id="tutorial-step-1" style="display: block;">${this.generateTutorialStep1()}</div>
                    <div id="tutorial-step-2" style="display: none;">${this.generateTutorialStep2()}</div>
                    <div id="tutorial-step-3" style="display: none;">${this.generateTutorialStep3()}</div>
                    <div id="tutorial-step-4" style="display: none;">${this.generateTutorialStep4()}</div>
                    <div id="tutorial-step-5" style="display: none;">${this.generateTutorialStep5()}</div>
                </div>
            </div>
        `;
    }

    generateProgressBar(currentStep, totalSteps) {
        const steps = ['👤 Patient Data', '⚡ NCS Studies', '💉 Needle EMG', '📊 Summary', '🎯 Interpretation'];
        let progressHTML = '<div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">';

        for (let i = 1; i <= totalSteps; i++) {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            let bgColor = isCompleted ? '#10b981' : (isActive ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : '#e5e7eb');
            let textColor = (isCompleted || isActive) ? 'white' : '#9ca3af';
            let borderColor = isCompleted ? '#10b981' : (isActive ? '#3b82f6' : '#e5e7eb');

            progressHTML += `
                <div style="flex: 1; text-align: center;">
                    <div style="background: ${bgColor}; color: ${textColor}; border: 2px solid ${borderColor}; border-radius: 12px; padding: 15px 10px; font-weight: 600; font-size: 0.9rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        ${isCompleted ? '✓' : `Step ${i}`}
                        <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.9;">${steps[i - 1]}</div>
                    </div>
                </div>
            `;
        }
        progressHTML += '</div>';
        return progressHTML;
    }

    generateTutorialStep1() {
        return `
            <div class="tutorial-step" data-step="1">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 25px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">👤</span>
                    Step 1: Clinical Context & The "Real-Time" Mandate
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px;">
                    <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px;">
                        <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Core Requirement</h4>
                        <p style="color: #475569; font-size: 0.95rem; line-height: 1.6;">
                            <strong>Real-Time Interpretation:</strong> A quality study requires live modification of the test as data is obtained. AANEM explicitly states that interpretation cannot be performed by an offsite physician because the findings must guide nerve and muscle selection <em>during</em> the test.
                        </p>
                    </div>
                    <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 25px; border-radius: 12px;">
                        <h4 style="color: #9a3412; margin-bottom: 15px;">🛡️ Safety & Logistics</h4>
                        <p style="color: #c2410c; font-size: 0.95rem; line-height: 1.6;">
                            You MUST document safety factors: <strong>Cardiac pacemakers/ICDs</strong> (for NCS) or <strong>anticoagulation/thinners</strong> (for needle EMG). Also, note limitations like casts, dressings, or patient inability to position for paraspinal testing.
                        </p>
                    </div>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 15px; padding: 30px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
                    <h4 style="color: #3b82f6; margin-bottom: 15px;">🌡️ The Temperature Mandate: Why it matters</h4>
                    <p style="color: #475569; line-height: 1.8;">
                        Cool limbs (~28°C) increase sodium channel open-time. This <strong>falsely elevates amplitude</strong> while <strong>slowing conduction</strong>. You might accidentally diagnose demyelination in a perfectly healthy but cold patient.
                    </p>
                    <div style="background: #f1f5f9; padding: 15px; border-radius: 10px; margin-top: 10px; font-size: 0.9rem; color: #475569;">
                        <strong>Standard:</strong> Hands ≥ 32°C | Feet ≥ 30°C. Monitoring is mandatory to permit peer audit of your data.
                    </div>
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">📝</span> Proper Documentation: Full Report View
                    </h4>
                    <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-size: 0.85rem; color: #334155; line-height: 1.5; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="background: #fef9c3; border: 2px solid #facc15; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong>HISTORY:</strong> 45 y.o. male with 3 months of numbness in digits 1-3 of the right hand. <br>
                            <strong>SAFETY:</strong> No cardiac pacemaker or ICD. Patient is not on anticoagulants.<br>
                            <strong>LIMITATIONS:</strong> None. Patient tolerated the study well.<br>
                            <strong>TEMPERATURE:</strong> Right Hand: 33.2°C (Warmed with heating pad).
                        </div>
                        <div style="opacity: 0.5;">
                            <strong>SENSORY NCS:</strong><br>
                            R Median | Digit 2 | 3.1 ms | 45 uV | 14 cm | 45 m/s<br>
                            ...<br>
                            <strong>NEEDLE EMG:</strong><br>
                            R APB | Nml | 2+ | 2+ | Incr/Long | Reduced<br>
                            ...<br>
                            <strong>IMPRESSION:</strong><br>
                            1. Moderate right carpal tunnel syndrome.
                        </div>
                    </div>
                </div>

                <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border: 1px dashed #3b82f6;">
                    <h5 style="color: #2563eb; margin: 0 0 5px 0;">📋 Demographic Essentials</h5>
                    <p style="color: #2563eb; font-size: 0.9rem; margin: 0;">Include: Name, MRN, Age/DOB, Weight, Height (critical for height-dependent references), and Handedness (for UE studies).</p>
                </div>

                <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
                    <button onclick="showTutorialStep(2)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 12px; cursor: pointer; border-bottom: 4px solid #1e40af;">
                        Next: NCS Tabular Data →
                    </button>
                </div>
            </div>
        `;
    }

    generateTutorialStep2() {
        return `
            <div class="tutorial-step" data-step="2">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 25px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">⚡</span>
                    Step 2: NCS Documentation Standards
                </h3>
                
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">📌 The Tabular Imperative</h4>
                    <p style="color: #475569; line-height: 1.6; font-size: 0.95rem;">
                        Summary sentences like "NCS was normal" are insufficient. Tables allow for (1) review of results by other physicians and (2)Comparison to past/future results to see if a disease is stable or worsening.
                    </p>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 15px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">🛠️ Mandatory Data Points</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <ul style="color: #64748b; font-size: 0.9rem; line-height: 1.8;">
                            <li><strong>Nerve name & Side</strong> (Right/Left)</li>
                            <li><strong>Stimulation & Recording Sites</strong></li>
                            <li><strong>Distance</strong> (mm or cm)</li>
                        </ul>
                        <ul style="color: #64748b; font-size: 0.9rem; line-height: 1.8;">
                            <li><strong>Latency</strong> (Onset for Motor, Peak for Sensory)</li>
                            <li><strong>Amplitude</strong> (Base-to-peak or peak-to-peak)</li>
                            <li><strong>Conduction Velocity</strong> (m/s)</li>
                        </ul>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h5 style="color: #1e293b; font-size: 1rem; margin-bottom: 10px;">📉 Axonal vs Demyelinating</h5>
                        <p style="color: #64748b; font-size: 0.85rem; line-height: 1.6;">
                            <strong>Axonal:</strong> Low amplitudes with relatively preserved velocities.
                            <br><strong>Demyelinating:</strong> Significant slowing or prolonged latencies with preserved amplitudes.
                        </p>
                    </div>
                    <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h5 style="color: #1e293b; font-size: 1rem; margin-bottom: 10px;">🔄 Specialized Studies</h5>
                        <p style="color: #64748b; font-size: 0.85rem; line-height: 1.6;">
                            <strong>F-Waves:</strong> Report <em>minimum</em> latency for the nerve.
                            <br><strong>H-Reflexes:</strong> Report latency (essential for S1/Proximal screening).
                            <br><strong>RNS:</strong> Note physiological state (Rest vs Exercise) and medication use (e.g. Pyridostigmine).
                        </p>
                    </div>
                </div>

                <div style="background: #fefce8; border: 1px solid #fef08a; padding: 15px; border-radius: 10px; font-size: 0.9rem; color: #854d0e; margin-bottom: 30px;">
                    <strong>Mandatory Reference Values:</strong> You must include your laboratory's "Normal" values in the report or cite your reference material (e.g., AANEM Reference Data). This allows any outside reviewer to verify your findings.
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">📝</span> Proper Documentation: Full Report View
                    </h4>
                    <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-size: 0.8rem; color: #334155; line-height: 1.4; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); overflow-x: auto;">
                        <div style="opacity: 0.5; margin-bottom: 10px;">
                            <strong>HISTORY:</strong> Numbness R Digits 1-3. Temp: 33.2°C.<br>
                        </div>
                        <div style="background: #fef9c3; border: 2px solid #facc15; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong>SENSORY NCS:</strong><br>
                            Nerve | Site | Latency | Amp | Dist | Vel | (Normal)<br>
                            ---------------------------------------------------------<br>
                            R Median | Digit 2 | 3.1 ms | 45 uV | 14 cm | 45 m/s | (< 3.5, > 20)<br>
                            R Median | Palmar | 1.8 ms | 80 uV | 8 cm | 44 m/s | (< 2.2, > 50)<br>
                            <br>
                            <strong>F-WAVE STUDIES:</strong><br>
                            R Median (APB): 28.5 ms (Normal < 31.0 ms)
                        </div>
                        <div style="opacity: 0.5;">
                            <strong>NEEDLE EMG:</strong><br>
                            R APB | Nml | 2+ | 2+ | Incr/Long | Reduced<br>
                            ...<br>
                            <strong>IMPRESSION:</strong><br>
                            1. Moderate right carpal tunnel syndrome.
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(1)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px; font-weight: 600; cursor: pointer;">← Previous</button>
                    <button onclick="showTutorialStep(3)" style="padding: 15px 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; border-bottom: 4px solid #1e40af;">Next: EMG Interpretation →</button>
                </div>
            </div>
        `;
    }

    generateTutorialStep3() {
        return `
            <div class="tutorial-step" data-step="3">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 25px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">💉</span>
                    Step 3: Needle EMG Technical Detail
                </h3>
                
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">🔍 The Single Primary Record</h4>
                    <p style="color: #475569; line-height: 1.6; font-size: 0.95rem;">
                        Unlike NCS, there is generally <strong>no complete, permanent record of EMG waveforms</strong> (due to technological/data limits). This makes your written report the ONLY evidence that the testing was performed and analyzed correctly.
                    </p>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 15px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 20px;">📋 Muscle-Level Reporting</h4>
                    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">For EACH muscle examined, you must explicitly document:</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center;">
                            <strong style="color: #334155;">Insertional</strong>
                            <div style="font-size: 0.8rem;">Activity upon needle entry</div>
                        </div>
                        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center;">
                            <strong style="color: #334155;">Spontaneous</strong>
                            <div style="font-size: 0.8rem;">Fibs, PSWs, Fasciculations</div>
                        </div>
                        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center;">
                            <strong style="color: #334155;">Voluntary</strong>
                            <div style="font-size: 0.8rem;">Potentials at rest/contraction</div>
                        </div>
                    </div>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                    <h5 style="color: #1e293b; font-size: 1rem; margin-bottom: 10px;">📈 Voluntary Potential Analysis</h5>
                    <p style="color: #64748b; font-size: 0.9rem; line-height: 1.6;">
                        You must describe both <strong>Morphology</strong> (Amplitude, Duration, Phases) and <strong>Recruitment</strong>. 
                        <br><br>
                        <strong>Example:</strong> "Upper-limb potentials were normal in morphology but showed reduced recruitment in the C7 distribuition."
                    </p>
                </div>

                <div style="background: #fef2f2; border-radius: 12px; padding: 20px; border: 1px dashed #ef4444; margin-bottom: 30px;">
                    <p style="color: #b91c1c; font-weight: 600; font-size: 0.9rem; margin: 0;">🛑 Pro Tip: Document limitations like excessive pain, poor patient relaxation, or inability to fully activate the muscle. These factors significantly impact your interpretation.</p>
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">📝</span> Proper Documentation: Full Report View
                    </h4>
                    <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-size: 0.8rem; color: #334155; line-height: 1.4; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); overflow-x: auto;">
                        <div style="opacity: 0.5; margin-bottom: 10px;">
                            <strong>HISTORY:</strong> Numbness R Digits 1-3. Temp: 33.2°C.<br>
                            <strong>SENSORY NCS:</strong> [Tabulated Data Above]<br>
                        </div>
                        <div style="background: #fef9c3; border: 2px solid #facc15; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong>NEEDLE EMG FINDINGS:</strong><br>
                            Muscle | Ins | Fibs | PSW | MUAP Amp | Duration | Recruit<br>
                            -----------------------------------------------------------<br>
                            R APB | Nml | 2+ | 2+ | Increased | Long | Reduced<br>
                            R FPL | Nml | 0 | 0 | Normal | Normal | Normal<br>
                            R C7 PS | Nml | 1+ | 1+ | Normal | Normal | Normal
                        </div>
                        <div style="opacity: 0.5;">
                            <strong>IMPRESSION:</strong><br>
                            1. Moderate right carpal tunnel syndrome.
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(2)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px; font-weight: 600; cursor: pointer;">← Previous</button>
                    <button onclick="showTutorialStep(4)" style="padding: 15px 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; border-bottom: 4px solid #1e40af;">Next: Narrative Summary →</button>
                </div>
            </div>
        `;
    }

    generateTutorialStep4() {
        return `
            <div class="tutorial-step" data-step="4">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 25px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📊</span>
                    Step 4: Formal Summary Drafting
                </h3>
                
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">🧩 Connecting Data to Dialogue</h4>
                    <p style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
                        The Summary translates raw data into clinical observations. It must summarize abnormalities for both NCS and EMG separately. Avoid generic statements like "Lower-limb EMG was normal"—instead, list the specific nerves and muscles studied.
                    </p>
                </div>

                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">🔍 Summarizing Findings (Checklist)</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <ul style="color: #64748b; font-size: 0.9rem; margin: 0; padding-left: 20px;">
                            <li><strong>Normal Studies:</strong> List which nerves/muscles were tested and found normal.</li>
                            <li><strong>Specific Abnormalities:</strong> Use terms like <em>low amplitude</em>, <em>prolonged peak</em>, or <em>slowing of velocity</em>.</li>
                        </ul>
                        <ul style="color: #64748b; font-size: 0.9rem; margin: 0; padding-left: 20px;">
                            <li><strong>Distribution:</strong> Synthesize the findings into a pattern (e.g., "following a C6-C7 myotomal pattern").</li>
                            <li><strong>Real-World Phrasing:</strong> "There is evidence of focal slowing across the elbow segment of the ulnar nerve."</li>
                        </ul>
                    </div>
                </div>

                <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6; margin-bottom: 30px;">
                    <h5 style="color: #1e40af; margin-bottom: 10px;">🌟 AANEM Writing Tip: The Distribution</h5>
                    <p style="color: #1e40af; font-size: 0.9rem; line-height: 1.6;">
                        Explicitly state the distribution: Peripheral nerve? Plexus? Spinal root? This synthesis is what helps the referring physician understand the extent of the patient's pathology.
                    </p>
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">📝</span> Proper Documentation: Full Report View
                    </h4>
                    <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-size: 0.85rem; color: #334155; line-height: 1.5; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="opacity: 0.5; margin-bottom: 10px;">
                            [History, Safety, Temp & Tables above]<br>
                        </div>
                        <div style="background: #fef9c3; border: 2px solid #facc15; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                            <strong>SUMMARY:</strong> <br>
                            Right upper extremity nerve conduction studies reveal a focal delay of the median sensory response across the carpal tunnel with preserved amplitudes. Needle EMG of the right upper extremity reveals active denervation and chronic motor unit changes in the median-innervated APB, while the FPL and more proximal C7-innervated muscles remain spared.
                        </div>
                        <div style="opacity: 0.5;">
                            <strong>IMPRESSION:</strong><br>
                            1. Moderate right carpal tunnel syndrome.
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(3)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px; font-weight: 600; cursor: pointer;">← Previous</button>
                    <button onclick="showTutorialStep(5)" style="padding: 15px 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; border-bottom: 4px solid #1e40af;">Next: Final Impression →</button>
                </div>
            </div>
        `;
    }

    generateTutorialStep5() {
        return `
            <div class="tutorial-step" data-step="5">
                <h3 style="color: #10b981; font-size: 1.8rem; margin-bottom: 25px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #10b981, #059669); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🎯</span>
                    Step 5: Diagnostic Interpretation & Phrasing
                </h3>
                
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 15px; padding: 30px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">🏁 The Diagnostic Anchor</h4>
                    <p style="color: #475569; line-height: 1.8; font-size: 0.95rem;">
                        The Interpretation must answer the clinical question. It is not just a summary of data; it is a <strong>graded, located, and chronological</strong> diagnosis.
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 25px; border-radius: 12px;">
                        <h4 style="color: #1e293b; font-size: 1rem; margin-bottom: 10px;">🩺 Electrophysiological Diagnosis</h4>
                        <p style="color: #64748b; font-size: 0.85rem; line-height: 1.6;">
                            Describe the exact location: "Median nerve pathology at the wrist affecting primarily sensory fibers."
                        </p>
                    </div>
                    <div style="background: #f8fafc; border-left: 4px solid #10b981; padding: 25px; border-radius: 12px;">
                        <h4 style="color: #1e293b; font-size: 1rem; margin-bottom: 10px;">📅 Nature of Change</h4>
                        <p style="color: #64748b; font-size: 0.85rem; line-height: 1.6;">
                            If previous studies exist, you <strong>must</strong> report if findings are: Improved, Stable, or Worsened.
                        </p>
                    </div>
                </div>

                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #166534; margin-bottom: 15px;">📜 Professional Reporting Components</h4>
                    <table style="width: 100%; font-size: 0.9rem; border-collapse: collapse; color: #166534;">
                        <tr style="border-bottom: 1px solid #bbf7d0;">
                            <td style="padding: 8px;"><strong>Identification:</strong></td>
                            <td style="padding: 8px;">List all physicians, residents, fellows, and technologists involved in the study.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #bbf7d0;">
                            <td style="padding: 8px;"><strong>Equipment:</strong></td>
                            <td style="padding: 8px;">List the make and model of the EDX instrument (shows minimum standards were met).</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Accreditation:</strong></td>
                            <td style="padding: 8px;">Include laboratory AANEM accreditation status if applicable.</td>
                        </tr>
                    </table>
                </div>

                <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border: 1px dashed #3b82f6; margin-bottom: 30px;">
                    <p style="color: #2563eb; font-weight: 600; font-size: 0.9rem; margin: 0;">💡 Pro Tip: Clinical Correlate! AANEM notes that a physician can Establish an accurate diagnosis based on a synthesis of clinical and EDX data even if the EDX data alone is borderline.</p>
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">📝</span> Proper Documentation: Full Report View
                    </h4>
                    <div style="background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-size: 0.85rem; color: #334155; line-height: 1.5; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
                        <div style="opacity: 0.5; margin-bottom: 10px;">
                            [History, Safety, Temp & Tables above]<br>
                            <strong>SUMMARY:</strong> Right median neuropathy at wrist...<br>
                        </div>
                        <div style="background: #fef9c3; border: 2px solid #facc15; padding: 15px; border-radius: 8px;">
                            <strong>IMPRESSION:</strong> <br>
                            1. Electrophysiological evidence of a <strong>moderate</strong>, <strong>active-on-chronic</strong> right median mononeuropathy at the wrist (Carpal Tunnel Syndrome).<br>
                            2. This study is <strong>stable</strong> compared to the previous examination dated 01/15/2024.<br>
                            <br>
                            <em>Note: The above findings correlate with the patient's clinical presentation of nocturnal paresthesias.</em>
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(4)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px; font-weight: 600; cursor: pointer;">← Previous</button>
                    <button onclick="showTutorialStep(1)" style="padding: 15px 40px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; border-bottom: 4px solid #065f46;">↺ Start Masterclass</button>
                </div>
            </div>
        `;
    }

    generateScenariosContent() {
        const scenarios = [
            {
                title: "Carpal Tunnel (Mild)",
                finding: "Prolonged median sensory peak latency across wrist; normal motor; normal EMG.",
                impression: "Electrophysiological evidence of a mild median neuropathy at the wrist (carpal tunnel syndrome)."
            },
            {
                title: "Ulnar Neuropathy (Elbow)",
                finding: "Focal slowing of ulnar motor CV across the elbow; decreased amplitude.",
                impression: "Electrophysiological findings consistent with an ulnar neuropathy at the elbow."
            },
            {
                title: "L5 Radiculopathy",
                finding: "Normal NCS; abnormal EMG in Tibialis Anterior, Peroneus Longus.",
                impression: "Evidence of an acute/subacute L5 radiculopathy."
            }
        ];

        return `
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                <h3 style="color: #1e293b; margin-bottom: 25px;">📂 Ideal Report Gallery</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    ${scenarios.map(s => `
                        <div style="border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; background: #f8fafc;">
                            <h4 style="color: #3b82f6; margin-bottom: 10px;">${s.title}</h4>
                            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 10px;"><strong>Finding:</strong> ${s.finding}</p>
                            <p style="font-size: 0.9rem; color: #1e293b;"><strong>AI-Approved Impression:</strong><br><em>"${s.impression}"</em></p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateAISectionContent() {
        return `
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #1e293b; font-size: 2.2rem; margin-bottom: 15px;">🤖 AI Draft Assistant</h2>
                    <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0 auto;">
                        Ernest will convert your clinical notes into a professional, formal AANEM report.
                    </p>
                </div>

                <div style="margin-bottom: 25px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 10px; color: #475569;">Case Findings & Notes</label>
                    <textarea id="ai-notes-input" placeholder="Example: 55yo M with hand numbness. Median sensory latency 4.8 at wrist, ulnar ok. EMG normal." 
                        style="width: 100%; height: 150px; padding: 20px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1.1rem; outline: none; transition: border-color 0.3s;"
                        onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'"></textarea>
                </div>

                <button onclick="generateAIDraft()" id="ai-gen-btn"
                    style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 700; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; border-radius: 12px; cursor: pointer; transition: transform 0.2s;">
                    🪄 Generate Professional Draft
                </button>

                <div id="ai-result-area" style="display: none; margin-top: 40px; border-top: 2px dashed #e2e8f0; padding-top: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="color: #1e293b; margin: 0;">📋 Ernest's Draft Report</h4>
                        <button onclick="copyAIDraft()" style="padding: 8px 20px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer;">Copy to Clipboard</button>
                    </div>
                    <div id="ai-draft-output" style="background: #ffffff; border: 1px solid #cbd5e1; padding: 30px; border-radius: 12px; font-family: 'Courier New', monospace; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6; color: #1e293b; max-height: 600px; overflow-y: auto; box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);"></div>
                </div>
            </div>
        `;
    }

    async generateAIDraft() {
        const input = document.getElementById('ai-notes-input');
        const output = document.getElementById('ai-draft-output');
        const resultArea = document.getElementById('ai-result-area');
        const btn = document.getElementById('ai-gen-btn');

        if (!input || !input.value.trim()) {
            alert("Please enter some case findings first!");
            return;
        }

        btn.disabled = true;
        btn.innerHTML = "🧠 Ernest is analyzing signals...";
        resultArea.style.display = 'block';
        output.innerHTML = "<em>Compiling neural pathways and formatting report...</em>";

        const systemPrompt = `
            You are a Senior Electromyography Fellow and AI Assistant. 
            Convert the following raw case notes into a formal, professional AANEM-style Electrodiagnostic Report.
            
            STRUCTURE:
            1. Heading (ELECTRODIAGNOSTIC REPORT)
            2. History (Professional synthesis)
            3. Data Tables (Represent NCS data clearly in text tables if specific mA/ms/mV are given)
            4. Summary of Findings (Professional narrative)
            5. Final Clinical Impression (Numbered list)
            
            GUIDELINES:
            - Use formal medical terminology (e.g., 'distal symmetric polyneuropathy' instead of 'nerve damage').
            - If limb temperatures aren't provided, add a note: "Limb temperatures maintained >32C (hand) / >30C (foot)."
            - Be definitive yet medically sound.
            - Format with professional indentation and whitespace.
        `;

        try {
            // Access ErnestCore API directly via global app components
            const ernest = window.appComponents.ernestCore;
            if (!ernest || !ernest.api || !ernest.api.apiKey) {
                throw new Error("Ernest Core or API Key not found. Please initialize the AI Coach first.");
            }

            const response = await ernest.api.generateContent(input.value, systemPrompt);
            output.textContent = response;
        } catch (e) {
            output.innerHTML = `<span style="color: #ef4444;">❌ Error: ${e.message}</span>`;
        } finally {
            btn.disabled = false;
            btn.innerHTML = "🪄 Generate Professional Draft";
            output.scrollIntoView({ behavior: 'smooth' });
        }
    }

    copyAIDraft() {
        const text = document.getElementById('ai-draft-output').innerText;
        navigator.clipboard.writeText(text).then(() => alert('Draft copied!'));
    }

    generateBockenekSectionContent() {
        return `
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #1e293b; font-size: 2.2rem; margin-bottom: 15px;">👨‍⚕️ Dr. Bockenek's Auto-Template</h2>
                    <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0 auto;">
                        Upload a screenshot of your NCS/EMG charts. Ernest will extract the values and fill the template.
                    </p>
                </div>

                <div style="background: #fff7ed; border: 1px solid #ffedd5; border-radius: 12px; padding: 20px; margin-bottom: 30px; display: flex; align-items: flex-start; gap: 15px;">
                    <span style="font-size: 1.5rem;">⚠️</span>
                    <div>
                        <h4 style="color: #9a3412; margin: 0 0 5px 0;">Privacy & Safety Warning</h4>
                        <p style="color: #c2410c; margin: 0; font-size: 0.95rem; line-height: 1.5;">
                            <strong>Ensure no patient-identifying information (PHI) is included.</strong> Redact or crop out names, MRNs, and DOBs before uploading. Only include the data charts.
                        </p>
                    </div>
                </div>

                <div style="margin-bottom: 25px;">
                    <label style="display: block; font-weight: 600; margin-bottom: 10px; color: #475569;">Study Screenshot (Results Table)</label>
                    <div style="border: 2px dashed #e2e8f0; border-radius: 12px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.3s;"
                        onclick="document.getElementById('bockenek-file-input').click()"
                        onmouseover="this.style.borderColor='#3b82f6'; this.style.backgroundColor='#f8fafc'"
                        onmouseout="this.style.borderColor='#e2e8f0'; this.style.backgroundColor='transparent'">
                        <input type="file" id="bockenek-file-input" style="display: none;" accept="image/*" onchange="handleBockenekImage(this)">
                        <div id="bockenek-upload-placeholder">
                            <span style="font-size: 3rem; display: block; margin-bottom: 10px;">📸</span>
                            <p style="color: #64748b; margin: 0;">Click to upload or drag & drop a screenshot</p>
                        </div>
                        <img id="bockenek-preview" style="display: none; max-width: 100%; max-height: 300px; margin: 0 auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    </div>
                </div>

                <button onclick="generateBockenekReport()" id="bockenek-gen-btn"
                    style="width: 100%; padding: 18px; font-size: 1.2rem; font-weight: 700; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; border-radius: 12px; cursor: pointer; transition: transform 0.2s;">
                    ⚡ Auto-Fill Bockenek Template
                </button>

                <div id="bockenek-result-area" style="display: none; margin-top: 40px; border-top: 2px dashed #e2e8f0; padding-top: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h4 style="color: #1e293b; margin: 0;">📋 Filled Residency Template</h4>
                        <button onclick="copyBockenekDraft()" style="padding: 8px 20px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer;">Copy to Clipboard</button>
                    </div>
                    <div id="bockenek-draft-output" style="background: #ffffff; border: 1px solid #cbd5e1; padding: 30px; border-radius: 12px; font-family: 'Courier New', monospace; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6; color: #1e293b; max-height: 600px; overflow-y: auto; box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);"></div>
                </div>
            </div>
        `;
    }

    async generateBockenekReport() {
        const fileInput = document.getElementById('bockenek-file-input');
        const output = document.getElementById('bockenek-draft-output');
        const resultArea = document.getElementById('bockenek-result-area');
        const btn = document.getElementById('bockenek-gen-btn');

        if (!fileInput || !fileInput.files[0]) {
            alert("Please upload a screenshot of the results first!");
            return;
        }

        btn.disabled = true;
        btn.innerHTML = "🧠 Ernest is reading the waveform data...";
        resultArea.style.display = 'block';
        output.innerHTML = "<em>Analyzing screenshot for latencies and amplitudes...</em>";

        const template = `
SUMMARY OF ELECTRODIAGNOSTIC STUDIES:

[refer to onset or peak latencies as being prolonged or normal, and nerve conduction velocity as slowed or normal. ]

UPPER

SENSORY NERVE STUDIES:
1. Right median antidromic sensory nerve study recorded from the 3rd digit with stimulation 14 cm proximally at the wrist showed a *** peak latency of *** ms and a *** amplitude of *** uV.
 
2. Right ulnar antidromic sensory nerve study recorded from the 5th digit with stimulation 14 cm proximally at the wrist showed a *** peak latency of *** ms and a *** amplitude of *** uV
 
3. Right median to radial antidromic sensory nerve study comparison recorded from the 1st digit with stimulation 10 cm proximally at the wrist and over the radius showed a peak latency of *** ms for both the median and radial nerves resulting in a *** delta of ***.
 
4. Right radial antidromic sensory nerve study recorded from the anatomic snuff box with stimulation 10 cm proximally at the wrist showed a *** peak latency of *** ms and a *** amplitude of *** uV.

MOTOR NERVE STUDIES:
 
1. Right median orthodromic motor study recorded over the abductor pollicis brevis muscle with stimulation 8 cm proximally at the wrist revealed a *** onset latency of *** ms and a *** amplitude of *** mV. Additional stimulation *** cm proximally at the antecubital fossa revealed a *** amplitude of *** mV with conduction velocity being *** in the forearm segment at *** m/s.
 
2. Right ulnar orthodromic motor study recorded over the abductor digiti minimi muscle with stimulation 8 cm proximally at the wrist revealed a *** onset latency of *** ms and a *** amplitude of *** mV. Stimulation *** cm proximally, distal to the elbow revealed a *** amplitude of *** mV. Additional stimulation 10 cm proximally above the elbow revealed a *** amplitude of *** mV. Conduction velocities distal to and across the elbow were *** at *** m/s and *** m/s, respectively.

3.  Right radial orthodromic motor study recorded over the extensor indices muscle with stimulation 4 cm proximally at the forearm revealed a *** onset latency of *** ms and a *** amplitude of *** mV. Stimulation *** cm proximally, distal to the elbow revealed a *** amplitude of *** mV. Additional stimulation 10 cm proximally, proximal to the elbow revealed a *** amplitude of *** mV. Conduction velocities distal to the elbow and proximal to the elbow were *** at *** m/s and *** m/s, respectively.

LOWER

SENSORY NERVE STUDIES:
1. Left sural antidromic sensory nerve study recorded from the lateral malleolus with stimulation 14 cm proximally at the calf showed a *** peak latency of *** ms with a *** amplitude of *** uV.

2. Left superficial fibular antidromic sensory nerve study recorded from the anterior lateral malleolus with stimulation 14 cm proximally at the calf showed a *** peak latency of *** ms with a *** amplitude of *** uV.

3. Right sural antidromic sensory nerve study recorded from the lateral malleolus with stimulation 14 cm proximally at the calf showed a *** peak latency of *** ms with a *** amplitude of *** uV.

4. Right superficial fibular antidromic sensory nerve study recorded from the anterior lateral malleolus with stimulation 14 cm proximally the calf showed a *** peak latency of *** milliseconds with a normal amplitude of *** uV.

MOTOR NERVE STUDIES:

1. Left fibular orthodromic motor study recorded over the extensor digitorum brevis muscle with stimulation 8 cm proximally at the ankle was found to have a *** onset latency of  *** ms and a *** amplitude of *** mV.  Additional stimulation *** cm further proximally (distal to the fibular head) revealed an amplitude of *** mV.  A third stimulation 10 cm further proximally (proximal to the fibular head) revealed an amplitude of *** mV.  Conduction velocities distal to and across the knee were *** at *** m/s and *** m/s, respectively.

2. Left tibial orthodromic motor study recorded over the abductor hallucis brevis muscle with stimulation 8 cm proximally at the ankle revealed a *** onset latency of *** ms and a *** amplitude of ***mV.  Additional stimulation *** cm proximally (popliteal fossa) revealed an amplitude of *** mV with a *** conduction velocity in the leg segment at *** m/s.
 
3. Right fibular orthodromic motor study recorded over the extensor digitorum brevis muscle with stimulation 8 cm proximally at the ankle was found to have a *** onset latency of  *** ms and a *** amplitude of *** mV.  Additional stimulation *** cm further proximally (distal to the fibular head) revealed an amplitude of *** mV.  A third stimulation 10 cm further proximally (proximal to the fibular head) revealed an amplitude of *** mV.  Conduction velocities distal to and across the knee were *** at *** m/s and *** m/s, respectively.

4. Right tibial orthodromic motor study recorded over the abductor hallucis brevis muscle with stimulation 8 cm proximally at the ankle revealed a ***  onset latency of *** ms and a *** amplitude of *** mV.  Additional stimulation *** cm proximally (popliteal fossa) revealed an amplitude of *** mV with a *** conduction velocity in the leg segment at *** m/s.

ELECTROMYOGRAPHY STUDY:
[Populate with detailed muscle findings as per instructions]

IMPRESSION:
1. ***
2. ***
3. ***

[INSERT ASSESSMENT AND PLAN]
        `.trim();

        const systemPrompt = `
            You are a Senior Electromyography Fellow. Your task is to fill out a specific residency report template for Dr. Bockenek based on an UPLOADED SCREENSHOT of NCS/EMG charts.
            
            INPUT: An image of NCS/EMG data charts.
            TEMPLATE: Provided below. It contains many '***' placeholders.
            
            RULES for placeholders:
            1. Replace '***' with the actual numerical values extracted from the screenshot OR the qualitative descriptor (normal, prolonged, slowed, low, borderline, ULN, etc.).
            2. If a response is absent or "no response" is noted in the chart, replace the entire segment with "showed no response" or "no response for both...".
            3. For Summary sections, synthesize findings professionally. 
            4. Identify "Martin-Gruber anastomosis" if median conduction velocities are abnormally fast (e.g., >100 m/s).
            5. In the EMG section, group normal muscles if possible.
            
            STYLE GUIDE:
            - Use "ULN" for upper limit of normal if findings are near the cutoff.
            - Use "prolonged" for latencies > normal.
            - Use "slowed" for velocities < normal.
            - Follow the specific formatting of the provided template exactly.
            
            PRIVACY:
            - DO NOT include ANY patient names, MRNs, or DOBs in the output, even if visible in the screenshot.
            
            TEMPlATE TO FILL:
            ${template}
        `;

        try {
            const ernest = window.appComponents.ernestCore;
            if (!ernest || !ernest.api || !ernest.api.apiKey) {
                throw new Error("Ernest Core or API Key not found. Please initialize the AI Coach first.");
            }

            // Convert file to base64
            const file = fileInput.files[0];
            const reader = new FileReader();

            const imageData = await new Promise((resolve, reject) => {
                reader.onload = () => {
                    const base64Data = reader.result.split(',')[1];
                    resolve({
                        mimeType: file.type,
                        data: base64Data
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const response = await ernest.api.generateContent(
                "Extract data from this screenshot and fill the Bockenek template.",
                systemPrompt,
                [],
                'gemini-1.5-flash',
                imageData
            );

            output.textContent = response;
        } catch (e) {
            output.innerHTML = `<span style="color: #ef4444;">❌ Error: ${e.message}</span>`;
        } finally {
            btn.disabled = false;
            btn.innerHTML = "⚡ Auto-Fill Bockenek Template";
            output.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleBockenekImage(input) {
        const file = input.files[0];
        const preview = document.getElementById('bockenek-preview');
        const placeholder = document.getElementById('bockenek-upload-placeholder');

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    }

    copyBockenekDraft() {
        const text = document.getElementById('bockenek-draft-output').innerText;
        navigator.clipboard.writeText(text).then(() => alert('Template copied!'));
    }
}

// Module Compatibility Wrapper
export function generateContent(module) {
    const reportModule = new ReportWritingModule();
    return reportModule.render();
}
