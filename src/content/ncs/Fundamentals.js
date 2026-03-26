import { NCSFundamentalsData } from './NCSFundamentalsData.js';
import { ErnestIcon } from '../../utils/ErnestIcon.js';

export const Fundamentals = {
    data: NCSFundamentalsData,

    generateContent(module) {
        // Register tab switcher action
        window._registerAction('NCS_switchTab', (el) => {
            const tabName = el.dataset.tab;
            document.querySelectorAll('.ncs-content').forEach(e => e.style.display = 'none');
            const target = document.getElementById('content-' + tabName);
            if (target) target.style.display = 'block';

            document.querySelectorAll('.ncs-tab').forEach(e => {
                e.classList.remove('active');
                e.style.background = 'transparent';
                e.style.color = '#475569';
            });

            const btn = document.getElementById('tab-' + tabName);
            if (btn) {
                btn.classList.add('active');
                btn.style.background = '#2563eb'; // Blue theme for NCS
                btn.style.color = 'white';
            }
        });

        // Register Math Calculations action
        window._registerAction('checkNCSCalc', (el) => {
            const isCorrect = el.dataset.correct === 'true';
            const parent = el.closest('.calc-card');
            parent.querySelectorAll('button').forEach(b => {
                b.disabled = true;
                if (b === el) {
                    b.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
                    b.style.borderColor = isCorrect ? '#22c55e' : '#ef4444';
                    b.style.color = isCorrect ? '#166534' : '#991b1b';
                }
            });
            const feedback = parent.querySelector('.calc-feedback');
            feedback.style.display = 'block';
            feedback.style.background = isCorrect ? '#f0fdf4' : '#fef2f2';
            feedback.style.color = isCorrect ? '#15803d' : '#b91c1c';
        });

        // Output the HTML
        return `
        <div class="intro-container">

            <!-- Hero Section -->
            <div class="intro-hero" style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 50px 30px; border-radius: 24px; color: white; margin-bottom: 40px; text-align: center; box-shadow: 0 20px 40px rgba(30, 58, 138, 0.2);">
                <h1 style="font-size: 2.8em; font-weight: 900; margin-bottom: 15px; letter-spacing: -0.03em;">${this.data.header.title}</h1>
                <p style="font-size: 1.25em; opacity: 0.9; max-width: 800px; margin: 0 auto; line-height: 1.6;">${this.data.header.subtitle}</p>
            </div>

            <!-- Navigation Tabs -->
            <div class="tabs-container" style="display: flex; flex-wrap: wrap; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 20px; margin-bottom: 40px; border: 1px solid #e2e8f0;">
                ${this.data.tabs.map((tab, i) => `
                    <button data-action="NCS_switchTab" data-tab="${tab.id}"
                            class="ncs-tab ${i === 0 ? 'active' : ''}"
                            id="tab-${tab.id}"
                            style="flex: 1; min-width: 150px; padding: 12px 20px; background: ${i === 0 ? '#2563eb' : 'transparent'}; color: ${i === 0 ? 'white' : '#475569'}; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${tab.icon}"></path></svg>
                        ${tab.label}
                    </button>
                `).join('')}
            </div>

            <!-- CONTENT SECTIONS -->

            <!-- 1. Physics & Physiology -->
            <div id="content-foundations" class="ncs-content" style="display: block; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.physiology.intro.title}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.physiology.intro.text}</p>
                    
                    <h4 style="color: #2563eb; font-weight: 800; font-size: 1.4em; margin-bottom: 15px;">The Action Potential Timeline</h4>
                    <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px;">
                        ${this.data.physiology.actionPotential.map((ap, idx) => `
                            <div style="background: ${idx % 2 === 0 ? 'white' : '#f8fafc'}; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px 20px; display: grid; grid-template-columns: 150px 100px 1fr; align-items: center; gap: 20px;">
                                <div style="font-weight: 800; color: #0f172a;">${ap.stage}</div>
                                <div style="font-family: monospace; font-weight: 700; color: #b45309; background: #fef3c7; padding: 4px 10px; border-radius: 8px; text-align: center;">${ap.value}</div>
                                <div style="color: #475569; font-size: 0.95em; line-height: 1.5;">${ap.detail}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; margin-bottom: 40px;">
                        <h4 style="color: #0f172a; margin-bottom: 15px; font-weight: 900; font-size: 1.4em;">${this.data.physiology.conduction.process}</h4>
                        <p style="color: #475569; margin-bottom: 20px; font-size: 1.05em; line-height: 1.7;">${this.data.physiology.conduction.detail}</p>
                        <div style="background: #eff6ff; padding: 15px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                            <span style="color: #1e3a8a; font-weight: 700; font-style: italic;">${this.data.physiology.conduction.staircase}</span>
                        </div>
                    </div>

                    <h4 style="color: #2563eb; font-weight: 800; font-size: 1.4em; margin-bottom: 15px;">Fiber Type Capabilities</h4>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 30px;">
                         ${this.data.physiology.fiberTypes.map(fiber => `
                            <div style="background: white; border: 1px solid #e2e8f0; border-left: 6px solid ${fiber.color}; border-radius: 16px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <h5 style="color: #0f172a; font-size: 1.25em; font-weight: 900; margin: 0;">${fiber.name}</h5>
                                    <div style="display: flex; gap: 10px;">
                                        <span style="background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.85em;">${fiber.diameter}</span>
                                        <span style="background: #f0fdf4; color: #166534; padding: 4px 12px; border-radius: 20px; font-weight: 800; font-size: 0.85em;">${fiber.velocity}</span>
                                    </div>
                                </div>
                                <p style="color: #334155; line-height: 1.6; margin: 0;">${fiber.function}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="resident-pearl">
                        <h4>The Great Blind Spot of EDX</h4>
                        <p>${this.data.physiology.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 2. Setup & Methods -->
            <div id="content-methods" class="ncs-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.methods.intro}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.methods.text}</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px;">
                            <h4 style="color: #1e293b; font-weight: 900; font-size: 1.3em; margin-bottom: 20px;">${this.data.methods.recording.montage}</h4>
                            <div style="display: flex; flex-direction: column; gap: 15px;">
                                <div style="background: #1e293b; color: white; padding: 15px; border-radius: 12px;">
                                    <strong>G1 (Active):</strong> <span style="opacity: 0.9;">${this.data.methods.recording.g1}</span>
                                </div>
                                <div style="background: white; border: 1px solid #cbd5e1; color: #334155; padding: 15px; border-radius: 12px;">
                                    <strong>G2 (Reference):</strong> <span style="opacity: 0.9;">${this.data.methods.recording.g2}</span>
                                </div>
                                <p style="color: #475569; font-size: 0.95em; line-height: 1.6; margin-top: 10px; font-style: italic;">${this.data.methods.recording.principle}</p>
                            </div>
                        </div>

                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px;">
                            <h4 style="color: #1e293b; font-weight: 900; font-size: 1.3em; margin-bottom: 20px;">${this.data.methods.supramaximal.definition}</h4>
                            <p style="color: #334155; line-height: 1.6; font-size: 1.05em;">${this.data.methods.supramaximal.reason}</p>
                        </div>
                    </div>

                    <h4 style="color: #2563eb; font-weight: 800; font-size: 1.4em; margin-bottom: 15px;">Targeting Sensory Signals</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                         ${this.data.methods.direction.map((dir, i) => `
                            <div style="background: white; border: 1px solid ${i === 0 ? '#3b82f6' : '#14b8a6'}; border-radius: 16px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
                                <h5 style="color: ${i === 0 ? '#1d4ed8' : '#0f766e'}; font-size: 1.25em; font-weight: 900; margin-bottom: 10px;">${dir.type}</h5>
                                <p style="color: #475569; font-size: 0.95em; line-height: 1.5; margin-bottom: 15px;">${dir.direction}</p>
                                <div style="background: #f0fdf4; color: #166534; padding: 10px 15px; border-radius: 8px; margin-bottom: 10px; font-size: 0.9em;">
                                    <strong>+ Pros:</strong> ${dir.pros}
                                </div>
                                <div style="background: #fef2f2; color: #991b1b; padding: 10px 15px; border-radius: 8px; font-size: 0.9em;">
                                    <strong>- Cons:</strong> ${dir.cons}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="resident-pearl">
                        <h4>The Initial Positive Deflection</h4>
                        <p>${this.data.methods.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 3. Technical Factors -->
            <div id="content-technical" class="ncs-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.technicalFactors.intro}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.technicalFactors.text}</p>
                    
                    <div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 16px; padding: 30px; margin-bottom: 40px; box-shadow: 0 10px 20px rgba(245, 158, 11, 0.1);">
                        <h4 style="color: #b45309; font-weight: 900; font-size: 1.5em; margin-bottom: 15px;">${this.data.technicalFactors.temperature.title}</h4>
                        <p style="color: #92400e; font-size: 1.1em; line-height: 1.6; border-left: 4px solid #f59e0b; padding-left: 15px; margin-bottom: 20px;">${this.data.technicalFactors.temperature.effects}</p>
                        <div style="background: white; border: 1px dashed #d97706; padding: 15px; border-radius: 12px; margin-bottom: 15px; font-size: 1.05em; font-weight: 700; color: #b45309; text-align: center;">
                            ${this.data.technicalFactors.temperature.correction}
                        </div>
                        <div style="text-align: center; color: #78350f; font-weight: 900; font-size: 1.2em;">
                            ${this.data.technicalFactors.temperature.ideal}
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px;">
                        <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #334155; font-weight: 900; font-size: 1.25em; margin-bottom: 15px;">${this.data.technicalFactors.noise.type}</h4>
                            <p style="color: #475569; line-height: 1.6; font-size: 0.95em;"><strong>The Cause:</strong> ${this.data.technicalFactors.noise.cause}</p>
                            <p style="color: #1e293b; line-height: 1.6; font-size: 0.95em; background: white; padding: 10px; border-radius: 8px; margin-top: 10px;"><strong>The Solution:</strong> ${this.data.technicalFactors.noise.solution}</p>
                        </div>

                        <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #334155; font-weight: 900; font-size: 1.25em; margin-bottom: 15px;">${this.data.technicalFactors.artifact.trailing}</h4>
                            <ul style="color: #475569; line-height: 1.6; font-size: 0.95em; padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                                ${this.data.technicalFactors.artifact.mitigation.map(mit => `<li>${mit}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <h4 style="color: #2563eb; font-weight: 800; font-size: 1.4em; margin-bottom: 15px;">Digital Filtration Mathematics</h4>
                    <div style="display: flex; gap: 20px; margin-bottom: 30px;">
                        ${this.data.technicalFactors.filters.map(filter => `
                            <div style="flex: 1; background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <h5 style="color: #0f172a; font-weight: 800; font-size: 1.1em; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${filter.type}</h5>
                                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                                    <span style="background: #eff6ff; color: #1d4ed8; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-size: 0.85em; flex: 1; text-align: center;">${filter.lff}</span>
                                    <span style="background: #fef2f2; color: #b91c1c; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-size: 0.85em; flex: 1; text-align: center;">${filter.hff}</span>
                                </div>
                                <p style="color: #64748b; font-size: 0.9em; line-height: 1.5; margin: 0;">${filter.note}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="resident-pearl">
                        <h4>Cathode Position Matters</h4>
                        <p>${this.data.technicalFactors.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 4. Interpretation -->
            <div id="content-interpretation" class="ncs-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.interpretation.intro}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.interpretation.text}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 30px; margin-bottom: 40px;">
                        <!-- Axonal Loss -->
                        <div style="background: white; border: 1px solid #fecaca; border-left: 8px solid #ef4444; border-radius: 16px; padding: 25px; box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.1);">
                            <h4 style="color: #b91c1c; font-weight: 900; font-size: 1.4em; margin-bottom: 15px;">${this.data.interpretation.axonalLoss.title}</h4>
                            <div style="background: #fef2f2; color: #991b1b; padding: 12px 15px; border-radius: 8px; font-weight: 800; margin-bottom: 15px;">
                                ${this.data.interpretation.axonalLoss.primary}
                            </div>
                            <p style="color: #475569; line-height: 1.6; font-size: 1.05em; margin-bottom: 15px;">${this.data.interpretation.axonalLoss.secondary}</p>
                            <p style="color: #b91c1c; font-size: 0.95em; font-weight: 700; margin: 0; font-style: italic;">${this.data.interpretation.axonalLoss.note}</p>
                        </div>

                        <!-- Demyelination -->
                        <div style="background: white; border: 1px solid #bfdbfe; border-left: 8px solid #3b82f6; border-radius: 16px; padding: 25px; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);">
                            <h4 style="color: #1d4ed8; font-weight: 900; font-size: 1.4em; margin-bottom: 15px;">${this.data.interpretation.demyelination.title}</h4>
                            <div style="background: #eff6ff; color: #1e3a8a; padding: 12px 15px; border-radius: 8px; font-weight: 800; margin-bottom: 15px;">
                                ${this.data.interpretation.demyelination.primary}
                            </div>
                            <p style="color: #475569; line-height: 1.6; font-size: 1.05em; margin-bottom: 15px;">${this.data.interpretation.demyelination.secondary}</p>
                            <div style="background: #f8fafc; border: 1px dashed #cbd5e1; padding: 15px; border-radius: 8px; color: #475569; font-size: 0.95em;">
                                <strong>Temporal Dispersion:</strong> ${this.data.interpretation.demyelination.dispersion}
                            </div>
                        </div>

                        <!-- Conduction Block -->
                        <div style="background: white; border: 1px solid #e9d5ff; border-left: 8px solid #a855f7; border-radius: 16px; padding: 25px; box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.1);">
                            <h4 style="color: #7e22ce; font-weight: 900; font-size: 1.4em; margin-bottom: 15px;">${this.data.interpretation.conductionBlock.title}</h4>
                            <p style="color: #475569; line-height: 1.6; font-size: 1.05em; margin-bottom: 15px;">${this.data.interpretation.conductionBlock.block}</p>
                            <div style="background: #faf5ff; color: #6b21a8; padding: 12px 15px; border-radius: 8px; font-weight: 800; font-size: 0.95em;">
                                ${this.data.interpretation.conductionBlock.dispersion}
                            </div>
                        </div>
                    </div>

                    <div class="resident-pearl">
                        <h4>The 75% Rule of Thumb</h4>
                        <p>${this.data.interpretation.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 5. Math & Calculations -->
            <div id="content-calculations" class="ncs-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.calculations.intro}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.calculations.text}</p>
                    
                    <div style="background: #1e293b; color: white; border-radius: 16px; padding: 30px; margin-bottom: 40px; text-align: center; box-shadow: 0 15px 30px rgba(0,0,0,0.1);">
                        <h4 style="color: #94a3b8; text-transform: uppercase; font-size: 0.9em; letter-spacing: 0.1em; margin-bottom: 15px;">The Master Formula</h4>
                        <code style="font-size: 1.5em; font-weight: 800; color: #f8fafc;">
                            ${this.data.calculations.formula}
                        </code>
                    </div>

                    <h4 style="color: #2563eb; font-weight: 800; font-size: 1.4em; margin-bottom: 15px;">Practice Calculations</h4>
                    <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px;">
                        ${this.data.calculations.practice.map((prac, i) => `
                            <div class="calc-card" style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: transform 0.2s;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                    <span style="background: #eff6ff; color: #1d4ed8; font-weight: 800; padding: 4px 12px; border-radius: 20px; font-size: 0.8em; text-transform: uppercase;">Scenario ${i + 1}</span>
                                    <span style="color: #64748b; font-size: 0.9em; font-weight: 600;">${prac.category}</span>
                                </div>
                                <p style="color: #1e293b; font-size: 1.1em; line-height: 1.6; margin-bottom: 25px;">${prac.question}</p>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                                    <button class="calc-btn" data-action="checkNCSCalc" data-correct="${prac.answer === '30 m/s' || prac.answer === '50 m/s'}" style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 12px; border-radius: 12px; font-weight: 700; color: #475569; cursor: pointer; transition: all 0.2s;">${prac.answer}</button>
                                    <button class="calc-btn" data-action="checkNCSCalc" data-correct="false" style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 12px; border-radius: 12px; font-weight: 700; color: #475569; cursor: pointer; transition: all 0.2s;">${prac.answer === '50 m/s' ? '40 m/s' : '40 m/s'}</button>
                                    <button class="calc-btn" data-action="checkNCSCalc" data-correct="false" style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 12px; border-radius: 12px; font-weight: 700; color: #475569; cursor: pointer; transition: all 0.2s;">${prac.answer === '50 m/s' ? '60 m/s' : '50 m/s'}</button>
                                </div>

                                <div class="calc-feedback" style="display: none; padding: 15px; border-radius: 12px; font-size: 0.95em; line-height: 1.5; margin-top: 15px;">
                                    <strong>Explanation:</strong> ${prac.check}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="resident-pearl">
                        <h4>Why Do We Subtract Latencies?</h4>
                        <p>${this.data.calculations.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- Quiz Section -->
            <div id="content-quiz" class="ncs-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card" style="background: #f8fafc; border: 2px solid #e2e8f0;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h3 style="color: #0f172a; margin-bottom: 10px; font-size: 2em; font-weight: 900;">Knowledge Check</h3>
                        <p style="font-size: 1.1em; color: #475569;">Validate your mastery of NCS Fundamentals</p>
                    </div>

                    ${typeof window.generateModuleQuiz === 'function' ?
                window.generateModuleQuiz(this.data.quiz)
                : '<div style="text-align:center; padding: 20px; background: white; border-radius: 12px; color: #64748b;">Quiz system currently unavailable.</div>'}
                </div>
            </div>

            <!-- Global Glossary -->
            <div style="margin-top: 50px; border-top: 2px dashed #cbd5e1; padding-top: 40px;">
                <h4 style="color: #64748b; text-transform: uppercase; font-size: 0.9em; letter-spacing: 0.1em; margin-bottom: 20px; text-align: center;">Mastery Glossary</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                    ${this.data.glossary.map(g => `
                        <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                            <strong style="color: #0f172a; display: block; margin-bottom: 8px; font-size: 1.05em;">${g.term}</strong>
                            <p style="color: #475569; font-size: 0.9em; line-height: 1.5; margin: 0;">${g.definition}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

        </div>

        <style>
            .intro-container {
                font-family: 'Inter', -apple-system, system-ui, sans-serif;
                max-width: 1100px;
                margin: 0 auto;
                color: #1e293b;
            }
            .content-card {
                background: white;
                padding: 40px;
                border-radius: 24px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .resident-pearl {
                background: linear-gradient(135deg, #eff6ff, #dbeafe);
                border: 1px solid #bfdbfe;
                border-radius: 16px;
                padding: 30px;
                margin-top: 40px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
            }
            .resident-pearl h4 {
                color: #1d4ed8;
                font-size: 1.3em;
                font-weight: 900;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .resident-pearl p {
                color: #1e3a8a;
                font-size: 1.05em;
                line-height: 1.6;
                margin: 0;
            }
            .ncs-tab.active {
                box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            }
            .ncs-tab:hover:not(.active) {
                background: #f1f5f9 !important;
                color: #0f172a !important;
            }
            .calc-btn:hover:not(:disabled) {
                background: #e2e8f0 !important;
                transform: translateY(-2px);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
        `;
    }
};

window.NCSFundamentals = Fundamentals;

export default {
    initialize() { /* Sub-handlers initialized inline now */ },
    generateContent() { return Fundamentals.generateContent(); }
};
