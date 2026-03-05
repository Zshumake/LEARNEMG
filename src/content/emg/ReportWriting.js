import { ReportWritingData } from './ReportWritingData.js';

export const ReportWritingModule = {
    currentStep: 1,

    initGlobalBindings() {
        window.switchReportTab = (tab) => this.switchReportTab(tab);
        window.showTutorialStep = (step) => this.showTutorialStep(step);
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
        console.log('📝 Initializing Report Writing Module...');
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
                    <button id="tutorial-tab" class="rw-nav-btn active" onclick="switchReportTab('tutorial')">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${this.getIconSvg('FileSignature', 'currentColor')} Interactive Tutorial
                        </div>
                    </button>
                    <button id="scenarios-tab" class="rw-nav-btn" onclick="switchReportTab('scenarios')">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${this.getIconSvg('Target', 'currentColor')} Ideal Reports (Samples)
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

            </div>
        `;
    },

    switchReportTab(tab) {
        ['tutorial', 'scenarios'].forEach(t => {
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
                <div class="${btnClass}" style="${inlineStyle}" onclick="showTutorialStep(${i})">
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
                        <button onclick="showTutorialStep(${currentStepIdx - 1})" style="padding: 16px 45px; background: white; border: 2px solid #cbd5e1; color: #475569; border-radius: 16px; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02);" onmouseover="this.style.background='#f8fafc'; this.style.borderColor='#94a3b8'" onmouseout="this.style.background='white'; this.style.borderColor='#cbd5e1'">← Previous</button>
                    ` : '<div></div>'}
                    
                    ${currentStepIdx < totalSteps ? `
                        <button onclick="showTutorialStep(${currentStepIdx + 1})" style="padding: 16px 45px; background: linear-gradient(135deg, ${step.color}, ${step.color}dd); color: white; border-radius: 16px; border: none; font-weight: 700; font-size: 1.1rem; cursor: pointer; box-shadow: 0 8px 20px ${step.color}40; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 25px ${step.color}60'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px ${step.color}40'">Next Step →</button>
                    ` : `
                        <button onclick="showTutorialStep(1)" style="padding: 16px 45px; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 16px; border: none; font-weight: 700; font-size: 1.1rem; cursor: pointer; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 25px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 20px rgba(16, 185, 129, 0.25)'">↺ Start Masterclass Over</button>
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
    }
};

// Module Compatibility Wrapper
export function generateContent(module) {
    return ReportWritingModule.render();
}
