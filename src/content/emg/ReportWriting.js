
import { generateErnestButton } from '../../modules/audio/AudioData.js';

export class ReportWritingModule {
    constructor() {
        this.reportData = {
            patient: {
                name: '', dob: '', mrn: '', date: new Date().toISOString().split('T')[0],
                referring: '', tech: '', instrument: '', history: ''
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
                recommendations: ''
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
        this.showWizardStep = this.showWizardStep.bind(this);
        this.addSensoryRow = this.addSensoryRow.bind(this);
        this.removeSensoryRow = this.removeSensoryRow.bind(this);
        this.updateSensoryRow = this.updateSensoryRow.bind(this);
        this.addMotorRow = this.addMotorRow.bind(this);
        this.removeMotorRow = this.removeMotorRow.bind(this);
        this.updateMotorRow = this.updateMotorRow.bind(this);
        this.addEmgRow = this.addEmgRow.bind(this);
        this.addNormalEmgRow = this.addNormalEmgRow.bind(this);
        this.removeEmgRow = this.removeEmgRow.bind(this);
        this.updateEmgRow = this.updateEmgRow.bind(this);
        this.copyReport = this.copyReport.bind(this);
        this.printReport = this.printReport.bind(this);
        this.renderSensoryRows = this.renderSensoryRows.bind(this);
        this.renderMotorRows = this.renderMotorRows.bind(this);
        this.renderEmgRows = this.renderEmgRows.bind(this);
        // Expose globally for HTML onclick handlers
        this.initGlobalBindings();
    }

    initGlobalBindings() {
        window.switchReportTab = this.switchReportTab;
        window.showTutorialStep = this.showTutorialStep;
        window.showWizardStep = this.showWizardStep;
        window.addSensoryRow = this.addSensoryRow;
        window.removeSensoryRow = this.removeSensoryRow;
        window.updateSensoryRow = this.updateSensoryRow;
        window.addMotorRow = this.addMotorRow;
        window.removeMotorRow = this.removeMotorRow;
        window.updateMotorRow = this.updateMotorRow;
        window.addEmgRow = this.addEmgRow;
        window.addNormalEmgRow = this.addNormalEmgRow;
        window.removeEmgRow = this.removeEmgRow;
        window.updateEmgRow = this.updateEmgRow;
        window.copyReport = this.copyReport;
        window.printReport = this.printReport;
        window.renderSensoryRows = this.renderSensoryRows;
        window.renderMotorRows = this.renderMotorRows;
        window.renderEmgRows = this.renderEmgRows;
        window.reportData = this.reportData; // Expose data needed for wizard rendering
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
                        style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                        📚 Interactive Tutorial
                    </button>
                    <button id="template-tab" onclick="switchReportTab('template')"
                        style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; border: none; background: white; color: #64748b; border-radius: 15px 15px 0 0; cursor: pointer; transition: all 0.3s ease; border: 2px solid rgba(59, 130, 246, 0.3);">
                        📝 Template Generator
                    </button>
                </div>

                <!-- Tutorial Section -->
                <div id="tutorial-section" style="display: block;">
                    ${this.generateTutorialContent()}
                </div>

                <!-- Template Generator Section -->
                <div id="template-section" style="display: none;">
                    ${this.generateTemplateContent()}
                </div>
            </div>
        `;
    }

    switchReportTab(tab) {
        const tutorialSection = document.getElementById('tutorial-section');
        const templateSection = document.getElementById('template-section');
        const tutorialTab = document.getElementById('tutorial-tab');
        const templateTab = document.getElementById('template-tab');

        if (tab === 'tutorial') {
            tutorialSection.style.display = 'block';
            templateSection.style.display = 'none';
            tutorialTab.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            tutorialTab.style.color = 'white';
            tutorialTab.style.border = 'none';
            tutorialTab.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
            templateTab.style.background = 'white';
            templateTab.style.color = '#64748b';
            templateTab.style.border = '2px solid rgba(59, 130, 246, 0.3)';
            templateTab.style.boxShadow = 'none';
        } else {
            tutorialSection.style.display = 'none';
            templateSection.style.display = 'block';
            tutorialTab.style.background = 'white';
            tutorialTab.style.color = '#64748b';
            tutorialTab.style.border = '2px solid rgba(139, 92, 246, 0.3)';
            tutorialTab.style.boxShadow = 'none';
            templateTab.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            templateTab.style.color = 'white';
            templateTab.style.border = 'none';
            templateTab.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';

            // Ensure rows are rendered if they exist
            setTimeout(() => {
                this.renderSensoryRows();
                this.renderMotorRows();
                this.renderEmgRows();
            }, 100);
        }
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
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">👤</span>
                    Step 1: Patient Data & Clinical Problem
                </h3>
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                    <p style="color: #475569; line-height: 1.8; margin: 0;">
                        Every electrodiagnostic report must begin with essential patient information and a clear statement of the clinical problem being investigated.
                    </p>
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
                    <button onclick="showTutorialStep(2)" style="padding: 15px 40px; font-size: 1.1rem; font-weight: 600; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 12px; cursor: pointer;">
                        Next: NCS Studies →
                    </button>
                </div>
            </div>
        `;
    }

    generateTutorialStep2() {
        return `
            <div class="tutorial-step" data-step="2">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">⚡</span>
                    Step 2: Nerve Conduction Studies
                </h3>
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                    <p style="color: #475569; line-height: 1.8; margin: 0;">
                        Nerve conduction study results must be presented in <strong>tabular format</strong> with clear indication of abnormal values.
                    </p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(1)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px;">← Previous</button>
                    <button onclick="showTutorialStep(3)" style="padding: 15px 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 12px; border: none;">Next: Needle EMG →</button>
                </div>
            </div>
        `;
    }

    generateTutorialStep3() {
        return `
            <div class="tutorial-step" data-step="3">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">💉</span>
                    Step 3: Needle Electromyography
                </h3>
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                    <p style="color: #475569; line-height: 1.8; margin: 0;">EMG findings must be presented in <strong>tabular format</strong> listing each muscle examined.</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(2)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px;">← Previous</button>
                    <button onclick="showTutorialStep(4)" style="padding: 15px 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 12px; border: none;">Next: Summary →</button>
                </div>
            </div>
        `;
    }

    generateTutorialStep4() {
        return `
            <div class="tutorial-step" data-step="4">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📊</span>
                    Step 4: Summary Section
                </h3>
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                    <p style="color: #475569; line-height: 1.8; margin: 0;">The summary section provides a <strong>narrative synthesis</strong> of all electrodiagnostic findings.</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(3)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px;">← Previous</button>
                    <button onclick="showTutorialStep(5)" style="padding: 15px 40px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 12px; border: none;">Next: Interpretation →</button>
                </div>
            </div>
        `;
    }

    generateTutorialStep5() {
        return `
            <div class="tutorial-step" data-step="5">
                <h3 style="color: #3b82f6; font-size: 1.8rem; margin-bottom: 20px; display: flex; align-items: center; gap: 15px;">
                    <span style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🎯</span>
                    Step 5: Diagnostic Interpretation
                </h3>
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">📌 AANEM Guideline</h4>
                    <p style="color: #475569; line-height: 1.8; margin: 0;">The diagnostic interpretation section provides the <strong>electrodiagnostic diagnosis</strong> and correlates findings with the clinical presentation.</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                    <button onclick="showTutorialStep(4)" style="padding: 15px 40px; background: white; border: 2px solid #cbd5e1; border-radius: 12px;">← Previous</button>
                    <button onclick="showTutorialStep(1)" style="padding: 15px 40px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 12px; border: none;">↺ Restart Tutorial</button>
                </div>
            </div>
        `;
    }

    // ==========================================
    // WIZARD METHODS
    // ==========================================

    generateTemplateContent() {
        return `
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #1e293b; font-size: 2.2rem; margin-bottom: 15px;">📝 Report Template Generator</h2>
                    <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0 auto 20px auto;">
                        Create a professional, AANEM-compliant EMG/NCS report.
                    </p>
                </div>
                <div id="wizard-progress" style="margin-bottom: 30px;">
                    ${this.generateWizardProgressBar(1)}
                </div>
                <div id="wizard-content">
                    <div id="wizard-step-1">${this.generateWizardStep1()}</div>
                    <div id="wizard-step-2" style="display: none;">${this.generateWizardStep2()}</div>
                    <div id="wizard-step-3" style="display: none;">${this.generateWizardStep3()}</div>
                    <div id="wizard-step-4" style="display: none;">${this.generateWizardStep4()}</div>
                    <div id="wizard-step-5" style="display: none;">${this.generateWizardStep5()}</div>
                </div>
            </div>
        `;
    }

    generateWizardProgressBar(currentStep) {
        const steps = ['Patient Info', 'NCS Data', 'EMG Data', 'Summary', 'Preview'];
        let html = '<div style="display: flex; justify-content: space-between; position: relative;">';
        html += '<div style="position: absolute; top: 50%; left: 0; right: 0; height: 4px; background: #e2e8f0; z-index: 0; transform: translateY(-50%);"></div>';
        html += `<div style="position: absolute; top: 50%; left: 0; width: ${(currentStep - 1) / (steps.length - 1) * 100}%; height: 4px; background: #3b82f6; z-index: 0; transform: translateY(-50%); transition: width 0.3s ease;"></div>`;

        steps.forEach((step, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            let circleStyle = `width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; z-index: 1; position: relative; background: ${isActive ? '#3b82f6' : (isCompleted ? '#10b981' : 'white')}; border: 2px solid ${isActive ? '#3b82f6' : (isCompleted ? '#10b981' : '#e2e8f0')}; color: ${isActive || isCompleted ? 'white' : '#94a3b8'};`;

            html += `
                <div style="text-align: center; z-index: 1;">
                    <div style="${circleStyle}">${isCompleted ? '✓' : stepNum}</div>
                    <div style="margin-top: 8px; font-size: 0.85rem; font-weight: 600; color: ${isActive ? '#1e293b' : '#94a3b8'};">${step}</div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    showWizardStep(step) {
        this.saveCurrentStepData(this.currentTemplateStep);
        this.currentTemplateStep = step;

        for (let i = 1; i <= 5; i++) {
            const el = document.getElementById(`wizard-step-${i}`);
            if (el) el.style.display = 'none';
        }
        const target = document.getElementById(`wizard-step-${step}`);
        if (target) {
            target.style.display = 'block';
            if (step === 5) target.innerHTML = this.generateWizardStep5();
        }

        const progress = document.getElementById('wizard-progress');
        if (progress) progress.innerHTML = this.generateWizardProgressBar(step);

        const wizardContent = document.getElementById('wizard-content');
        if (wizardContent) wizardContent.scrollIntoView({ behavior: 'smooth' });
    }

    saveCurrentStepData(step) {
        if (!this.reportData) return;
        if (step === 1) {
            ['name', 'dob', 'mrn', 'date', 'referring', 'tech', 'instrument', 'history'].forEach(f => {
                const el = document.getElementById(`pt-${f}`);
                if (el) this.reportData.patient[f] = el.value;
            });
            // Handle history separately
            const historyEl = document.getElementById('pt-history');
            if (historyEl) {
                this.reportData.patient.history = historyEl.value;
            }
        } else if (step === 4) {
            this.reportData.summary.narrative = document.getElementById('sum-narrative')?.value || '';
            this.reportData.summary.limitations = document.getElementById('sum-limitations')?.value || '';
            this.reportData.summary.comparison = document.getElementById('sum-comparison')?.value || '';
            this.reportData.summary.diagnosis = document.getElementById('sum-diagnosis')?.value || '';
            this.reportData.summary.recommendations = document.getElementById('sum-recommendations')?.value || '';
        }
    }

    generateWizardStep1() {
        const d = this.reportData.patient;
        return `
            <div class="wizard-step">
                <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">👤 Patient Information</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div><label>Patient Name</label><input type="text" id="pt-name" value="${d.name}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;"></div>
                    <div><label>Date of Birth</label><input type="date" id="pt-dob" value="${d.dob}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;"></div>
                    <div><label>MRN</label><input type="text" id="pt-mrn" value="${d.mrn}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;"></div>
                    <div><label>Date of Study</label><input type="date" id="pt-date" value="${d.date}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;"></div>
                </div>
                <!-- Additional fields abbreviated for brevity but functional -->
                <div style="margin-bottom: 20px;"><label>Referring Physician</label><input type="text" id="pt-referring" value="${d.referring}" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;"></div>
                <div style="margin-bottom: 20px;"><label>Clinical History</label><textarea id="pt-history" rows="4" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.history}</textarea></div>
                <div style="text-align: right;"><button onclick="showWizardStep(2)" style="padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 10px; cursor: pointer;">Next: NCS Data →</button></div>
            </div>
        `;
    }

    generateWizardStep2() {
        return `
            <div class="wizard-step">
                <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">⚡ Nerve Conduction Studies</h3>
                <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">Sensory Studies</h4>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                        <thead><tr style="background: #e2e8f0; text-align: left;"><th style="padding: 10px;">Nerve</th><th>Lat (ms)</th><th>Amp (μV)</th><th>Dist (cm)</th><th>Vel (m/s)</th><th></th></tr></thead>
                        <tbody id="ncs-sensory-body"></tbody>
                    </table>
                    <button onclick="addSensoryRow()" style="padding: 8px 15px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">+ Add Sensory Row</button>
                </div>
                <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <h4 style="color: #1e293b; margin-bottom: 15px;">Motor Studies</h4>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                        <thead><tr style="background: #e2e8f0; text-align: left;"><th style="padding: 10px;">Nerve</th><th>Lat (ms)</th><th>Amp (mV)</th><th>Vel (m/s)</th><th>F-Wave</th><th></th></tr></thead>
                        <tbody id="ncs-motor-body"></tbody>
                    </table>
                    <button onclick="addMotorRow()" style="padding: 8px 15px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">+ Add Motor Row</button>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <button onclick="showWizardStep(1)" style="padding: 12px 30px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; cursor: pointer;">← Back</button>
                    <button onclick="showWizardStep(3)" style="padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 10px; cursor: pointer;">Next: EMG Data →</button>
                </div>
            </div>
        `;
    }

    generateWizardStep3() {
        return `
             <div class="wizard-step">
                <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">💉 Needle EMG</h3>
                <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                        <thead><tr style="background: #e2e8f0; text-align: left;"><th style="padding: 10px;">Muscle</th><th>Ins. Act</th><th>Spont</th><th>MUAP</th><th>Recruit</th><th></th></tr></thead>
                        <tbody id="emg-body"></tbody>
                    </table>
                    <button onclick="addEmgRow()" style="padding: 8px 15px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">+ Add Muscle</button>
                    <button onclick="addNormalEmgRow()" style="padding: 8px 15px; background: #dcfce7; border: 1px solid #86efac; border-radius: 6px; cursor: pointer; color: #166534; margin-left: 10px;">+ Add Normal Muscle</button>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <button onclick="showWizardStep(2)" style="padding: 12px 30px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; cursor: pointer;">← Back</button>
                    <button onclick="showWizardStep(4)" style="padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 10px; cursor: pointer;">Next: Summary →</button>
                </div>
            </div>
        `;
    }

    generateWizardStep4() {
        const d = this.reportData.summary;
        return `
            <div class="wizard-step">
                <h3 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 25px;">📊 Summary & Interpretation</h3>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600;">Summary</label>
                    <textarea id="sum-narrative" rows="4" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.narrative}</textarea>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-weight: 600;">Diagnosis</label>
                    <textarea id="sum-diagnosis" rows="3" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;">${d.diagnosis}</textarea>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <button onclick="showWizardStep(3)" style="padding: 12px 30px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; cursor: pointer;">← Back</button>
                    <button onclick="showWizardStep(5)" style="padding: 12px 30px; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; border-radius: 10px; cursor: pointer;">Generate Report →</button>
                </div>
            </div>
        `;
    }

    generateWizardStep5() {
        const d = this.reportData;

        // Helper to safely escape HTML
        const e = (str) => str ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';

        // Generate rows HTML
        const sensoryRows = d.ncs.sensory.map(r => `<tr><td>${e(r.nerve)}</td><td align="center">${e(r.latency)}</td><td align="center">${e(r.amp)}</td><td align="center">${e(r.dist)}</td><td align="center">${e(r.velocity)}</td></tr>`).join('');
        const motorRows = d.ncs.motor.map(r => `<tr><td>${e(r.nerve)}</td><td align="center">${e(r.latency)}</td><td align="center">${e(r.amp)}</td><td align="center">-</td><td align="center">${e(r.velocity)}</td></tr>`).join('');
        const emgRows = d.emg.map(r => `<tr><td>${e(r.muscle)}</td><td align="center">${e(r.insertional)}</td><td align="center">${e(r.spont)}</td><td align="center">${e(r.muap)}</td><td align="center">${e(r.recruit)}</td></tr>`).join('');

        const reportHtml = `
            <div style="font-family: Arial; padding: 20px; line-height: 1.5;">
                <h2 style="text-align: center; border-bottom: 2px solid black;">ELECTRODIAGNOSTIC REPORT</h2>
                <div style="margin-bottom: 20px;">
                    <strong>Patient:</strong> ${e(d.patient.name)}<br>
                    <strong>Date:</strong> ${e(d.patient.date)}
                </div>
                <h3>NERVE CONDUCTION STUDIES</h3>
                <table width="100%" border="1" cellpadding="5" style="border-collapse: collapse;">
                    <tr><th>Nerve</th><th>Lat</th><th>Amp</th><th>Dist</th><th>Vel</th></tr>
                    ${sensoryRows}
                    ${motorRows}
                </table>
                <h3>NEEDLE EMG</h3>
                <table width="100%" border="1" cellpadding="5" style="border-collapse: collapse;">
                    <tr><th>Muscle</th><th>Ins</th><th>Spont</th><th>MUAP</th><th>Recruit</th></tr>
                    ${emgRows}
                </table>
                <h3>SUMMARY</h3>
                <p>${e(d.summary.narrative)}</p>
                <h3>DIAGNOSIS</h3>
                <p>${e(d.summary.diagnosis)}</p>
            </div>
        `;

        return `
            <div class="wizard-step">
                <h3>Report Preview</h3>
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button onclick="copyReport()" style="flex: 1; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">Copy</button>
                    <button onclick="printReport()" style="flex: 1; padding: 10px; background: #64748b; color: white; border: none; border-radius: 5px; cursor: pointer;">Print</button>
                </div>
                <div id="report-preview-container" style="border: 1px solid #ccc; padding: 20px; background: white; max-height: 500px; overflow: auto;">
                    ${reportHtml}
                </div>
                <button onclick="showWizardStep(4)" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">← Edit</button>
            </div>
        `;
    }

    // ==========================================
    // DATA MANIPULATION
    // ==========================================

    addSensoryRow() {
        this.reportData.ncs.sensory.push({ nerve: '', latency: '', amp: '', dist: '', velocity: '' });
        this.renderSensoryRows();
    }
    removeSensoryRow(index) {
        this.reportData.ncs.sensory.splice(index, 1);
        this.renderSensoryRows();
    }
    updateSensoryRow(index, field, value) {
        const row = this.reportData.ncs.sensory[index];
        row[field] = value;

        // Auto-fill logic
        if (field === 'nerve') {
            let standardDist = this.STANDARD_NCS_VALUES.sensory[value];
            if (!standardDist) {
                const match = Object.entries(this.STANDARD_NCS_VALUES.sensory).find(([key]) => value.includes(key));
                if (match) standardDist = match[1];
            }
            if (standardDist) row.dist = standardDist;
        }

        if ((field === 'latency' || field === 'dist') && row.latency > 0 && row.dist > 0) {
            row.velocity = ((row.dist * 10) / row.latency).toFixed(1);
        }
        this.renderSensoryRows();
    }
    renderSensoryRows() {
        const tbody = document.getElementById('ncs-sensory-body');
        if (tbody) {
            tbody.innerHTML = this.reportData.ncs.sensory.map((row, i) => `
                <tr>
                    <td><input type="text" value="${row.nerve}" onchange="updateSensoryRow(${i}, 'nerve', this.value)" style="width: 100%"></td>
                    <td><input type="text" value="${row.latency}" onchange="updateSensoryRow(${i}, 'latency', this.value)" style="width: 50px"></td>
                    <td><input type="text" value="${row.amp}" onchange="updateSensoryRow(${i}, 'amp', this.value)" style="width: 50px"></td>
                    <td><input type="text" value="${row.dist}" onchange="updateSensoryRow(${i}, 'dist', this.value)" style="width: 50px"></td>
                    <td>${row.velocity}</td>
                    <td><button onclick="removeSensoryRow(${i})">🗑️</button></td>
                </tr>
            `).join('');
        }
    }

    addMotorRow() {
        this.reportData.ncs.motor.push({ nerve: '', latency: '', amp: '', velocity: '', fwave: '' });
        this.renderMotorRows();
    }
    removeMotorRow(index) {
        this.reportData.ncs.motor.splice(index, 1);
        this.renderMotorRows();
    }
    updateMotorRow(index, field, value) {
        this.reportData.ncs.motor[index][field] = value;
    }
    renderMotorRows() {
        const tbody = document.getElementById('ncs-motor-body');
        if (tbody) {
            tbody.innerHTML = this.reportData.ncs.motor.map((row, i) => `
                <tr>
                    <td><input type="text" value="${row.nerve}" onchange="updateMotorRow(${i}, 'nerve', this.value)" style="width: 100%"></td>
                    <td><input type="text" value="${row.latency}" onchange="updateMotorRow(${i}, 'latency', this.value)" style="width: 50px"></td>
                    <td><input type="text" value="${row.amp}" onchange="updateMotorRow(${i}, 'amp', this.value)" style="width: 50px"></td>
                    <td><input type="text" value="${row.velocity}" onchange="updateMotorRow(${i}, 'velocity', this.value)" style="width: 50px"></td>
                    <td><input type="text" value="${row.fwave}" onchange="updateMotorRow(${i}, 'fwave', this.value)" style="width: 50px"></td>
                    <td><button onclick="removeMotorRow(${i})">🗑️</button></td>
                </tr>
            `).join('');
        }
    }

    addEmgRow(data = {}) {
        this.reportData.emg.push({
            muscle: data.muscle || '',
            insertional: data.insertional || 'Normal',
            spont: data.spont || 'None',
            muap: data.muap || 'Normal',
            recruit: data.recruit || 'Normal'
        });
        this.renderEmgRows();
    }
    addNormalEmgRow() {
        this.addEmgRow({ insertional: 'Normal', spont: 'None', muap: 'Normal', recruit: 'Normal' });
    }
    removeEmgRow(index) {
        this.reportData.emg.splice(index, 1);
        this.renderEmgRows();
    }
    updateEmgRow(index, field, value) {
        this.reportData.emg[index][field] = value;
    }
    renderEmgRows() {
        const tbody = document.getElementById('emg-body');
        if (tbody) {
            tbody.innerHTML = this.reportData.emg.map((row, i) => `
                <tr>
                    <td><input type="text" value="${row.muscle}" onchange="updateEmgRow(${i}, 'muscle', this.value)" style="width: 100%"></td>
                    <td><select onchange="updateEmgRow(${i}, 'insertional', this.value)"><option ${row.insertional === 'Normal' ? 'selected' : ''}>Normal</option><option ${row.insertional === 'Increased' ? 'selected' : ''}>Increased</option></select></td>
                    <td><input type="text" value="${row.spont}" onchange="updateEmgRow(${i}, 'spont', this.value)"></td>
                    <td><input type="text" value="${row.muap}" onchange="updateEmgRow(${i}, 'muap', this.value)"></td>
                    <td><input type="text" value="${row.recruit}" onchange="updateEmgRow(${i}, 'recruit', this.value)"></td>
                    <td><button onclick="removeEmgRow(${i})">🗑️</button></td>
                </tr>
            `).join('');
        }
    }

    copyReport() {
        const content = document.getElementById('report-preview-container').innerText;
        navigator.clipboard.writeText(content).then(() => alert('Report text copied to clipboard!'));
    }

    printReport() {
        const content = document.getElementById('report-preview-container').innerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`<html><head><title>Print Report</title></head><body>${content}</body></html>`);
        printWindow.document.close();
        printWindow.print();
    }
}

// Module Compatibility Wrapper
export function generateContent(module) {
    const reportModule = new ReportWritingModule();
    return reportModule.render();
}
