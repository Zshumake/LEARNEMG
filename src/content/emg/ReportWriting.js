import { ReportWritingData } from './ReportWritingData.js';
import logger from '../../utils/Logger.js';

export const ReportWritingModule = {
    currentStep: 1,
    wizardStep: 1,
    wizardData: {
        patientName: '', age: '', dob: '', studyDate: '', referringPhysician: '', indication: '',
        clinicalHistory: '',
        ncsFindings: '',
        emgFindings: '',
        summary: '', interpretation: ''
    },

    initGlobalBindings() {
        window._registerAction('switchReportTab', (el) => {
            this.switchReportTab(el.dataset.tab);
        });
        window._registerAction('showTutorialStep', (el) => {
            this.showTutorialStep(parseInt(el.dataset.step));
        });
        window._registerAction('RW_goToWizardStep', (el) => {
            this.saveWizardFields();
            this.showWizardStep(parseInt(el.dataset.step));
        });
        window._registerAction('RW_nextWizardStep', () => {
            this.saveWizardFields();
            if (this.wizardStep < 6) this.showWizardStep(this.wizardStep + 1);
        });
        window._registerAction('RW_prevWizardStep', () => {
            this.saveWizardFields();
            if (this.wizardStep > 1) this.showWizardStep(this.wizardStep - 1);
        });
        window._registerAction('RW_copyReport', () => {
            const text = this.formatReport();
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.getElementById('rw-copy-btn');
                if (btn) { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy to Clipboard', 2000); }
            });
        });
        window._registerAction('RW_downloadReport', () => {
            const text = this.formatReport();
            const name = this.wizardData.patientName.replace(/\s+/g, '_') || 'EDX_Report';
            const blob = new Blob([text], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${name}_EDX_Report.txt`;
            a.click();
            URL.revokeObjectURL(a.href);
        });
        window._registerAction('RW_clearForm', () => {
            Object.keys(this.wizardData).forEach(k => this.wizardData[k] = '');
            this.showWizardStep(1);
        });
    },

    getIconSvg(iconName, color) {
        const svgBase = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
        switch(iconName) {
            case 'User':
                return svgBase + `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
            case 'Activity':
                return svgBase + `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`;
            case 'FileSignature':
                return svgBase + `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>`;
            case 'AlignLeft':
                return svgBase + `<line x1="21" x2="3" y1="6" y2="6"></line><line x1="15" x2="3" y1="12" y2="12"></line><line x1="17" x2="3" y1="18" y2="18"></line></svg>`;
            case 'Target':
                return svgBase + `<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`;
            default:
                return svgBase + `<circle cx="12" cy="12" r="10"></circle></svg>`;
        }
    },

    render() {
        logger.log('📝 Initializing Report Writing Module...');
        this.initGlobalBindings();

        return `
            <style>
                .rw-interactive-card {
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
                    transition: all 0.3s ease;
                    margin-bottom: 25px;
                }
                .rw-interactive-card:hover {
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    border-color: #cbd5e1;
                }
                .rw-concept-box {
                    background: #f8fafc;
                    border-left: 5px solid #3b82f6;
                    padding: 25px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
                }
                .rw-safety-box {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 30px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
                }
                .rw-pearl-box {
                    background: #f1f5f9;
                    padding: 25px;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
                }
                .rw-code-block {
                    background: #ffffff;
                    padding: 30px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 0.9rem;
                    color: #334155;
                    line-height: 1.6;
                    box-shadow: inset 0 2px 5px rgba(0,0,0,0.03);
                    overflow-x: auto;
                }
                .rw-highlight-row {
                    background: #fef9c3;
                    border: 2px solid #facc15;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    box-shadow: 0 2px 8px rgba(250, 204, 21, 0.15);
                }
                .rw-nav-btn {
                    padding: 18px 45px;
                    font-size: 1.15rem;
                    font-weight: 700;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-bottom: 3px solid transparent;
                }
                .rw-nav-btn:hover {
                    color: #0f172a;
                    background: #f8fafc;
                    border-radius: 12px 12px 0 0;
                }
                .rw-nav-btn.active {
                    color: #3b82f6;
                    border-bottom-color: #3b82f6;
                    background: #eff6ff;
                    border-radius: 12px 12px 0 0;
                }

                .rw-step-btn {
                    flex: 1;
                    text-align: center;
                    cursor: pointer;
                    padding: 15px 10px;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                    background: white;
                    border: 2px solid #e2e8f0;
                    color: #94a3b8;
                    font-weight: 700;
                    font-size: 0.95rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                    position: relative;
                    overflow: hidden;
                }
                
                .rw-step-btn:hover {
                    border-color: #cbd5e1;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.05);
                }

                .rw-step-btn.completed {
                    background: #f0fdf4;
                    color: #16a34a;
                    border-color: #bbf7d0;
                }

                .rw-step-btn.active {
                    color: white;
                    border-color: transparent;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
                }

                .rw-step-title {
                    font-size: 0.85rem;
                    margin-top: 8px;
                    font-weight: 600;
                    opacity: 0.9;
                }
                
                .rw-gradient-text {
                    background: linear-gradient(135deg, #0f172a, #334155);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            </style>

            <div class="interactive-content" style="max-width: 1400px; margin: 0 auto; position: relative; font-family: 'Inter', system-ui, -apple-system, sans-serif;">
                
                <!-- Tab Navigation -->
                <div style="display: flex; gap: 10px; margin-bottom: 40px; border-bottom: 2px solid #e2e8f0; padding-bottom: 0;">
                    <button id="tutorial-tab" class="rw-nav-btn active" data-action="switchReportTab" data-tab="tutorial">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${this.getIconSvg('FileSignature', 'currentColor')} Interactive Tutorial
                        </div>
                    </button>
                    <button id="scenarios-tab" class="rw-nav-btn" data-action="switchReportTab" data-tab="scenarios">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${this.getIconSvg('Target', 'currentColor')} Ideal Reports (Samples)
                        </div>
                    </button>
                    <button id="generator-tab" class="rw-nav-btn" data-action="switchReportTab" data-tab="generator">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${this.getIconSvg('AlignLeft', 'currentColor')} Template Generator
                        </div>
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

                <!-- Template Generator Section -->
                <div id="generator-section" style="display: none;">
                    ${this.generateTemplateGeneratorContent()}
                </div>

            </div>
        `;
    },

    switchReportTab(tab) {
        ['tutorial', 'scenarios', 'generator'].forEach(t => {
            const section = document.getElementById(`${t}-section`);
            const btn = document.getElementById(`${t}-tab`);
            if (section) section.style.display = t === tab ? 'block' : 'none';
            if (btn) {
                if (t === tab) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    },

    showTutorialStep(step) {
        this.currentStep = step;
        for (let i = 1; i <= ReportWritingData.steps.length; i++) {
            const stepDiv = document.getElementById(`tutorial-step-${i}`);
            if (stepDiv) stepDiv.style.display = 'none';
        }
        const targetStep = document.getElementById(`tutorial-step-${step}`);
        if (targetStep) targetStep.style.display = 'block';

        const progressContainer = document.getElementById('tutorial-progress');
        if (progressContainer) {
            progressContainer.innerHTML = this.generateProgressBar(step, ReportWritingData.steps.length);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        const tutorialSection = document.getElementById('tutorial-section');
        if (tutorialSection) {
            tutorialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    generateTutorialContent() {
        return `
            <div style="background: white; border-radius: 24px; padding: 50px; box-shadow: 0 10px 40px rgba(0,0,0,0.04), border: 1px solid #f1f5f9;">
                <div style="text-align: center; margin-bottom: 50px;">
                    <h2 class="rw-gradient-text" style="font-size: 2.8rem; margin-bottom: 20px; font-weight: 800; letter-spacing: -0.02em;">${ReportWritingData.header.title}</h2>
                    <p style="color: #475569; font-size: 1.2rem; max-width: 800px; margin: 0 auto; line-height: 1.7; font-weight: 400;">
                        ${ReportWritingData.header.description}
                    </p>
                </div>
                
                <div id="tutorial-progress" style="margin-bottom: 50px;">
                    ${this.generateProgressBar(1, ReportWritingData.steps.length)}
                </div>
                
                <div id="tutorial-content">
                    ${ReportWritingData.steps.map((step, index) => this.generateStepHTML(step, index + 1, ReportWritingData.steps.length)).join('')}
                </div>
            </div>
        `;
    },

    generateProgressBar(currentStep, totalSteps) {
        let progressHTML = '<div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">';

        for (let i = 1; i <= totalSteps; i++) {
            const stepData = ReportWritingData.steps[i - 1];
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            
            let btnClass = 'rw-step-btn';
            let inlineStyle = '';
            let content = '';
            
            if (isCompleted) {
                btnClass += ' completed';
                content = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-5px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            } else if (isActive) {
                btnClass += ' active';
                inlineStyle = `background: linear-gradient(135deg, ${stepData.color}, ${stepData.color}dd);`;
                content = `Step ${i}`;
            } else {
                content = `Step ${i}`;
            }

            progressHTML += `
                <div class="${btnClass}" style="${inlineStyle}" data-action="showTutorialStep" data-step="${i}">
                    <div style="position: relative; z-index: 2;">
                        ${content}
                        <div class="rw-step-title">${stepData.title}</div>
                    </div>
                </div>
            `;
        }
        progressHTML += '</div>';
        return progressHTML;
    },

    generateStepHTML(step, currentStepIdx, totalSteps) {
        return `
            <div id="tutorial-step-${currentStepIdx}" class="tutorial-step" style="display: ${currentStepIdx === 1 ? 'block' : 'none'}; animation: fadeIn 0.4s ease;">
                <h3 style="color: ${step.color}; font-size: 2.2rem; margin-bottom: 35px; display: flex; align-items: center; gap: 20px; font-weight: 800; letter-spacing: -0.01em;">
                    <div style="background: linear-gradient(135deg, ${step.color}, ${step.color}dd); color: white; width: 64px; height: 64px; border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px ${step.color}40; transform: rotate(-5deg);">
                        ${this.getIconSvg(step.icon, 'white')}
                    </div>
                    Step ${currentStepIdx}: ${step.title}
                </h3>
                
                <div class="rw-concept-box" style="border-left-color: ${step.color};">
                    <h4 style="color: #0f172a; margin-bottom: 15px; font-size: 1.25rem; font-weight: 800; display:flex; align-items:center; gap:8px;">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="${step.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        AANEM Core Requirement: ${step.keyRequirement}
                    </h4>
                    <p style="color: #475569; font-size: 1.1rem; line-height: 1.7; margin: 0;">
                        ${step.keyRequirementDescription}
                    </p>
                </div>

                <div class="rw-safety-box">
                    <h4 style="color: #0f172a; margin-bottom: 25px; font-size: 1.25rem; font-weight: 800; display:flex; align-items:center; gap:10px;">
                        ${this.getIconSvg('Activity', step.color)}
                        Mandatory Data Points & Details
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                        ${step.safetyTips.map(tip => `
                            <div style="position:relative; z-index:1;">
                                <h5 style="color: ${step.color}; font-size: 1.05rem; margin-bottom: 12px; font-weight: 700; display:flex; align-items:center; gap:8px;">
                                    <div style="width:8px; height:8px; border-radius:50%; background:${step.color};"></div>
                                    ${tip.label}
                                </h5>
                                <p style="color: #475569; font-size: 1rem; line-height: 1.6; margin: 0; padding-left: 16px;">${tip.text}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="rw-pearl-box" style="border-left: 4px solid ${step.color};">
                    <h5 style="color: #0f172a; font-size: 1.2rem; margin-bottom: 15px; font-weight: 800; display:flex; align-items:center; gap:10px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${step.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 0 1 12 22 10 10 0 0 1 2 12 10 10 0 0 1 22 12z"></path><path d="M12 2v20"></path><path d="M12 12h10"></path></svg>
                        Clinical Pearl: ${step.pearlBox.title}
                    </h5>
                    <p style="color: #334155; font-size: 1.05rem; line-height: 1.7; margin: 0; font-weight: 500;">
                        ${step.pearlBox.content}
                    </p>
                </div>

                <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 35px; margin-bottom: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                    <h4 style="color: #0f172a; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 1.3rem;">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg> 
                        Proper Documentation Example
                    </h4>
                    <div class="rw-code-block">
                        <div class="rw-highlight-row">
                            ${step.example.map(ex => `
                                ${ex.type === 'header' ? `<strong style="color:#0f172a; font-size: 0.95rem; text-transform:uppercase; letter-spacing:0.05em;">${ex.text}</strong><br>` : ''}
                                ${ex.type === 'content' ? `<span style="color:#334155; display:block; margin: 8px 0 16px 0;">${ex.text}</span>` : ''}
                                ${ex.type === 'tabular' ? `<span style="color:#334155; white-space: pre; display:block; line-height:1.5;">${ex.text}</span>` : ''}
                            `).join('')}
                        </div>
                        <div style="color: #64748b; font-size: 0.85rem; margin-top:20px; font-weight:500;">
                            ${this.getIconSvg('AlignLeft', '#94a3b8')} 
                            <span style="vertical-align:top;margin-left:5px;">Excerpt from full report view</span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 50px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
                    ${currentStepIdx > 1 ? `
                        <button data-action="showTutorialStep" data-step="${currentStepIdx - 1}" style="padding: 16px 45px; background: white; border: 2px solid #cbd5e1; color: #475569; border-radius: 16px; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);" onmouseover="this.style.background='#f8fafc'; this.style.borderColor='#94a3b8'" onmouseout="this.style.background='white'; this.style.borderColor='#cbd5e1'">← Previous</button>
                    ` : '<div></div>'}

                    ${currentStepIdx < totalSteps ? `
                        <button data-action="showTutorialStep" data-step="${currentStepIdx + 1}" style="padding: 16px 45px; background: linear-gradient(135deg, ${step.color}, ${step.color}dd); color: white; border-radius: 16px; border: none; font-weight: 700; font-size: 1.1rem; cursor: pointer; box-shadow: 0 8px 20px ${step.color}40; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 25px ${step.color}60'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px ${step.color}40'">Next Step →</button>
                    ` : `
                        <button data-action="showTutorialStep" data-step="1" style="padding: 16px 45px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 16px; border: none; font-weight: 700; font-size: 1.1rem; cursor: pointer; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 25px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(16, 185, 129, 0.25)'">↺ Start Masterclass Over</button>
                    `}
                </div>
            </div>
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        `;
    },

    generateScenariosContent() {
        return `
            <div style="background: white; border-radius: 24px; padding: 50px; box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid #f1f5f9;">
                <div style="text-align: center; margin-bottom: 50px;">
                    <h3 class="rw-gradient-text" style="margin-bottom: 20px; font-size: 2.8rem; font-weight: 800; letter-spacing: -0.02em;">Ideal Report Gallery</h3>
                    <p style="color: #475569; font-size: 1.2rem; max-width: 800px; margin: 0 auto; line-height: 1.7;">Review these correctly phrased final impressions based on specific electrophysiological findings to master your phrasing.</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 35px;">
                    ${ReportWritingData.scenarios.map((s, idx) => `
                        <div class="rw-interactive-card" style="margin-bottom:0; padding: 35px; border-radius: 20px; animation: fadeIn ${0.2 + (idx * 0.1)}s ease;">
                            <h4 style="color: #2563eb; margin-bottom: 20px; font-size: 1.4rem; font-weight: 800; display:flex; align-items:center; gap:12px;">
                                <div style="background: #eff6ff; padding: 10px; border-radius: 12px; color: #2563eb;">
                                    ${this.getIconSvg('Target', 'currentColor')}
                                </div>
                                ${s.title}
                            </h4>

                            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e2e8f0; position:relative;">
                                <div style="position:absolute; top: -12px; left: 20px; background: white; padding: 0 10px; color: #64748b; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Clinical Findings</div>
                                <p style="font-size: 1.05rem; color: #334155; margin: 0; line-height: 1.6;">${s.finding}</p>
                            </div>

                            <div style="background: #fdf2f8; border-left: 4px solid #db2777; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(219, 39, 119, 0.05);">
                                <h5 style="font-size: 0.95rem; color: #9d174d; margin: 0 0 15px 0; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display:flex; align-items:center; gap:8px;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                                    AANEM Grade Impression
                                </h5>
                                <p style="font-size: 1.15rem; color: #831843; margin: 0; font-weight: 500; line-height: 1.6; font-style: italic;">"${s.impression}"</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // ─── Template Generator ────────────────────────────────────

    wizardSteps: [
        { id: 'demographics', title: 'Patient Demographics', color: '#3b82f6' },
        { id: 'history', title: 'Clinical History', color: '#f59e0b' },
        { id: 'ncs', title: 'NCS Findings', color: '#10b981' },
        { id: 'emg', title: 'EMG Findings', color: '#8b5cf6' },
        { id: 'summary', title: 'Summary & Interpretation', color: '#ef4444' },
        { id: 'preview', title: 'Preview & Export', color: '#0ea5e9' },
    ],

    saveWizardFields() {
        const fields = document.querySelectorAll('#generator-section [data-field]');
        fields.forEach(f => { this.wizardData[f.dataset.field] = f.value; });
    },

    showWizardStep(step) {
        this.wizardStep = step;
        for (let i = 1; i <= 6; i++) {
            const el = document.getElementById(`rw-wizard-step-${i}`);
            if (el) el.style.display = i === step ? 'block' : 'none';
        }
        const progress = document.getElementById('rw-wizard-progress');
        if (progress) progress.innerHTML = this.generateWizardProgressBar();

        if (step === 6) {
            this.saveWizardFields();
            const preview = document.getElementById('rw-report-preview');
            if (preview) preview.textContent = this.formatReport();
        }

        const gen = document.getElementById('generator-section');
        if (gen) gen.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    generateWizardProgressBar() {
        return `<div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${this.wizardSteps.map((s, i) => {
                const num = i + 1;
                const isActive = num === this.wizardStep;
                const isDone = num < this.wizardStep;
                const bg = isActive ? `background:${s.color}; color:white; border-color:transparent; box-shadow: 0 4px 12px ${s.color}40;` :
                           isDone ? 'background:#f0fdf4; color:#16a34a; border-color:#bbf7d0;' : '';
                return `<div class="rw-step-btn${isActive ? ' active' : ''}${isDone ? ' completed' : ''}" style="flex:1; min-width: 100px; ${bg}" data-action="RW_goToWizardStep" data-step="${num}">
                    <div>${isDone ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-3px;"><polyline points="20 6 9 17 4 12"></polyline></svg>' : num}</div>
                    <div class="rw-step-title">${s.title}</div>
                </div>`;
            }).join('')}
        </div>`;
    },

    generateTemplateGeneratorContent() {
        const d = this.wizardData;
        const field = (label, key, type, placeholder, rows) => {
            const val = d[key] || '';
            if (type === 'textarea') {
                return `<div style="margin-bottom: 20px;">
                    <label style="display:block; font-weight:700; color:#334155; margin-bottom:8px; font-size:0.95rem;">${label}</label>
                    <textarea data-field="${key}" placeholder="${placeholder}" rows="${rows || 4}" style="width:100%; padding:14px; border:2px solid #e2e8f0; border-radius:12px; font-size:1rem; font-family:inherit; resize:vertical; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">${val}</textarea>
                </div>`;
            }
            return `<div style="margin-bottom: 16px;">
                <label style="display:block; font-weight:700; color:#334155; margin-bottom:8px; font-size:0.95rem;">${label}</label>
                <input type="${type}" data-field="${key}" value="${val}" placeholder="${placeholder}" style="width:100%; padding:12px 14px; border:2px solid #e2e8f0; border-radius:12px; font-size:1rem; font-family:inherit; transition: border-color 0.2s;" onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'">
            </div>`;
        };

        return `
        <div style="background: white; border-radius: 24px; padding: 50px; box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid #f1f5f9;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h3 class="rw-gradient-text" style="font-size: 2.4rem; font-weight: 800; margin-bottom: 15px;">EDX Report Template Generator</h3>
                <p style="color: #475569; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">Build an AANEM-compliant electrodiagnostic report step by step. Fill in each section, then preview and export.</p>
            </div>

            <div id="rw-wizard-progress" style="margin-bottom: 40px;">
                ${this.generateWizardProgressBar()}
            </div>

            <!-- Step 1: Demographics -->
            <div id="rw-wizard-step-1" style="display: block; animation: fadeIn 0.3s ease;">
                <h4 style="color: #3b82f6; font-size: 1.5rem; font-weight: 800; margin-bottom: 25px;">Step 1: Patient Demographics</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    ${field('Patient Name', 'patientName', 'text', 'e.g., Smith, Jane')}
                    ${field('Age', 'age', 'text', 'e.g., 45')}
                    ${field('Date of Birth', 'dob', 'date', '')}
                    ${field('Date of Study', 'studyDate', 'date', '')}
                    ${field('Referring Physician', 'referringPhysician', 'text', 'e.g., Dr. Johnson')}
                    ${field('Indication / Reason for Study', 'indication', 'text', 'e.g., R hand numbness, rule out CTS')}
                </div>
            </div>

            <!-- Step 2: Clinical History -->
            <div id="rw-wizard-step-2" style="display: none;">
                <h4 style="color: #f59e0b; font-size: 1.5rem; font-weight: 800; margin-bottom: 25px;">Step 2: Clinical History</h4>
                <div class="rw-concept-box" style="border-left-color: #f59e0b; margin-bottom: 20px;">
                    <p style="color: #475569; margin: 0; font-size: 0.95rem;">Include chief complaint, HPI, relevant PMH, medications (especially anticoagulants), and any contraindications (pacemaker/ICD). Document limb temperature.</p>
                </div>
                ${field('Clinical History', 'clinicalHistory', 'textarea', 'e.g., 45 y.o. RHD female presents with 3 months of numbness and tingling in digits 1-3 of the right hand. Symptoms worse at night, waking patient from sleep. No prior surgery. No pacemaker/ICD. Not on anticoagulants. Temperature: R hand 33.1C.', 8)}
            </div>

            <!-- Step 3: NCS Findings -->
            <div id="rw-wizard-step-3" style="display: none;">
                <h4 style="color: #10b981; font-size: 1.5rem; font-weight: 800; margin-bottom: 25px;">Step 3: Nerve Conduction Study Findings</h4>
                <div class="rw-concept-box" style="border-left-color: #10b981; margin-bottom: 20px;">
                    <p style="color: #475569; margin: 0; font-size: 0.95rem;">Summarize sensory and motor NCS results. Include nerves tested, amplitudes, latencies, velocities. Note any abnormalities. AANEM requires tabular data in the final report.</p>
                </div>
                ${field('NCS Findings', 'ncsFindings', 'textarea', 'e.g., Motor NCS: Median motor DL 5.2 ms (normal <4.2), CMAP amplitude 6.8 mV (normal >4.0), CV 52 m/s. Ulnar motor normal.\n\nSensory NCS: Median SNAP absent digit 2. Ulnar SNAP normal. Radial SNAP normal.\n\nF-waves: Median F-wave latency prolonged at 34.2 ms.', 10)}
            </div>

            <!-- Step 4: EMG Findings -->
            <div id="rw-wizard-step-4" style="display: none;">
                <h4 style="color: #8b5cf6; font-size: 1.5rem; font-weight: 800; margin-bottom: 25px;">Step 4: Needle EMG Findings</h4>
                <div class="rw-concept-box" style="border-left-color: #8b5cf6; margin-bottom: 20px;">
                    <p style="color: #475569; margin: 0; font-size: 0.95rem;">Document muscles examined with insertional activity, spontaneous activity (fibs, PSWs, fascs), MUAP morphology, and recruitment pattern. AANEM requires systematic documentation of each muscle.</p>
                </div>
                ${field('EMG Findings', 'emgFindings', 'textarea', 'e.g., APB: Increased insertional activity, 2+ fibrillations, 2+ PSWs, decreased recruitment with large MUAPs.\nFDI: Normal.\nPronator teres: Normal.\nBiceps: Normal.\nCervical paraspinals: Normal.', 10)}
            </div>

            <!-- Step 5: Summary & Interpretation -->
            <div id="rw-wizard-step-5" style="display: none;">
                <h4 style="color: #ef4444; font-size: 1.5rem; font-weight: 800; margin-bottom: 25px;">Step 5: Summary & Interpretation</h4>
                <div class="rw-concept-box" style="border-left-color: #ef4444; margin-bottom: 20px;">
                    <p style="color: #475569; margin: 0; font-size: 0.95rem;">Synthesize NCS and EMG findings into a narrative summary. Then provide your electrodiagnostic interpretation with location, severity, and pathophysiology.</p>
                </div>
                ${field('Summary', 'summary', 'textarea', 'e.g., NCS demonstrate prolonged median motor distal latency and absent median SNAP with normal ulnar and radial studies. Needle EMG shows active denervation in the APB with sparing of C8/T1 muscles and cervical paraspinals.', 6)}
                ${field('Interpretation / Diagnosis', 'interpretation', 'textarea', 'e.g., This electrodiagnostic study is ABNORMAL.\n\n1. Right median neuropathy at the wrist (carpal tunnel syndrome), SEVERE, with evidence of axonal loss (active denervation in APB).\n2. No evidence of cervical radiculopathy or polyneuropathy.', 6)}
            </div>

            <!-- Step 6: Preview & Export -->
            <div id="rw-wizard-step-6" style="display: none;">
                <h4 style="color: #0ea5e9; font-size: 1.5rem; font-weight: 800; margin-bottom: 25px;">Step 6: Preview & Export</h4>
                <pre id="rw-report-preview" style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 30px; font-family: 'Courier New', monospace; font-size: 0.9rem; line-height: 1.6; color: #334155; white-space: pre-wrap; overflow-x: auto; max-height: 600px; overflow-y: auto;"></pre>
                <div style="display: flex; gap: 12px; margin-top: 25px; flex-wrap: wrap;">
                    <button id="rw-copy-btn" data-action="RW_copyReport" style="padding: 14px 30px; background: #3b82f6; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer;">Copy to Clipboard</button>
                    <button data-action="RW_downloadReport" style="padding: 14px 30px; background: #10b981; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer;">Download as .txt</button>
                    <button data-action="RW_clearForm" style="padding: 14px 30px; background: white; color: #ef4444; border: 2px solid #fca5a5; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer;">Clear All</button>
                </div>
            </div>

            <!-- Navigation -->
            <div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
                <button data-action="RW_prevWizardStep" style="padding: 14px 35px; background: white; border: 2px solid #cbd5e1; color: #475569; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer;">Previous</button>
                <button data-action="RW_nextWizardStep" style="padding: 14px 35px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 12px rgba(59,130,246,0.3);">Next Step</button>
            </div>
        </div>`;
    },

    formatReport() {
        const d = this.wizardData;
        const line = '='.repeat(50);
        const sections = [
            `ELECTRODIAGNOSTIC STUDY REPORT`,
            line,
            `Patient: ${d.patientName || '___'}    Age: ${d.age || '___'}    DOB: ${d.dob || '___'}`,
            `Date of Study: ${d.studyDate || '___'}`,
            `Referring Physician: ${d.referringPhysician || '___'}`,
            `Indication: ${d.indication || '___'}`,
            '',
            'CLINICAL HISTORY:',
            d.clinicalHistory || '[Not entered]',
            '',
            'NERVE CONDUCTION STUDIES:',
            d.ncsFindings || '[Not entered]',
            '',
            'NEEDLE EMG:',
            d.emgFindings || '[Not entered]',
            '',
            'SUMMARY:',
            d.summary || '[Not entered]',
            '',
            'INTERPRETATION:',
            d.interpretation || '[Not entered]',
            '',
            line,
            'Performed and interpreted by: ___________________________',
            'Signature: ___________________________',
            `Date: ${d.studyDate || '___'}`,
        ];
        return sections.join('\n');
    }
};

// Module Compatibility Wrapper
export function generateContent(module) {
    return ReportWritingModule.render();
}
