
import { EMGMachineData } from './EMGMachineData.js';

export const EMGMachine = {
    data: EMGMachineData,
    generateContent(module) {
        // Ensure global handler is defined
        if (!window.EMGMachine_switchTab) {
            window.EMGMachine_switchTab = function (tabName) {
                // Hide all sections
                document.querySelectorAll('.tech-section').forEach(el => el.style.display = 'none');
                // Show target
                const target = document.getElementById('content-' + tabName);
                if (target) target.style.display = 'block';

                // Updates buttons
                document.querySelectorAll('.tech-tab').forEach(el => el.classList.remove('active'));
                const btn = document.getElementById('tab-' + tabName);
                if (btn) btn.classList.add('active');
            };
        }

        return `
        <div class="emg-machine-container">
<!-- Hero Section -->
            <div class="machine-hero">
                <h1 style="font-size: 2.5em; letter-spacing: -0.04em; margin: 0;">${this.data.hero.title}</h1>
                <p style="margin-top: 15px;">${this.data.hero.subtitle}</p>
            </div>

            <!-- Navigation Tabs -->
            <div class="tabs-container">
                ${this.data.tabs.map((tab, i) => `
                    <button onclick="EMGMachine_switchTab('${tab.id}')" class="tech-tab ${i === 0 ? 'active' : ''}" id="tab-${tab.id}">${tab.label}</button>
                `).join('')}
            </div>

            <!-- CONTENT SECTIONS -->

            <!-- 1. SYSTEM OVERVIEW -->
            <div id="content-hardware" class="tech-section" style="display: block;">
                <div class="grid-2">
                    <div class="tech-card">
                        <div style="color: #0ea5e9; font-weight: 800; font-size: 0.8em; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">The Control Hub</div>
                        <h3>${this.data.hardware.hub.title}</h3>
                        <div class="hardware-img-container" style="background: white;">
                            <img src="images/hardware/sierra-summit.webp" alt="Sierra Summit Console" class="hardware-img">
                        </div>
                        <div class="info-box">
                            <p style="font-weight: 600; color: #0f172a; margin-bottom: 10px;">${this.data.hardware.hub.subtitle}</p>
                            <p style="font-size: 0.95em; color: #475569; line-height: 1.6;">${this.data.hardware.hub.description}</p>
                            <ul style="margin-top: 15px; font-size: 0.9em; color: #475569;">
                                ${this.data.hardware.hub.bulletPoints.map(bp => `<li>${bp}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="tech-card">
                        <div style="color: #8b5cf6; font-weight: 800; font-size: 0.8em; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Physical Ergonomics</div>
                        <h3>${this.data.hardware.ergonomics.title}</h3>
                        <div class="info-box" style="height: 100%; display: flex; flex-direction: column; justify-content: center;">
                            <p style="font-size: 0.95em; color: #475569; margin-bottom: 20px; line-height: 1.6;">${this.data.hardware.ergonomics.description}</p>
                            <div class="workflow-steps">
                                ${this.data.hardware.ergonomics.steps.map((step, i) => `
                                <div class="workflow-item">
                                    <span class="step-num">${i + 1}</span>
                                    <div>
                                        <div style="font-weight: 700;">${step.title}</div>
                                        <div style="font-size: 0.85em; color: #64748b;">${step.desc}</div>
                                    </div>
                                </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NCS SOFTWARE INTERFACE -->
            <div id="content-software" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <div style="color: #0ea5e9; font-weight: 800; font-size: 0.8em; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Analyzing the Sierra Interface</div>
                    <h3>The NCS Software Narrative</h3>
                    <p style="color: #475569; margin-bottom: 25px; line-height: 1.6;">${this.data.software.narrative}</p>
                    
                    <div class="hardware-img-container" style="height: auto; min-width: 100%; border: 3px solid #1e293b; background: #000; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
                        <img src="images/hardware/analysis-software.webp" alt="NCS Interface" class="hardware-img" style="object-fit: contain; padding: 0;">
                    </div>

                    <div class="grid-3" style="margin-top: 30px; gap: 20px;">
                        ${this.data.software.windows.map(win => `
                        <div class="info-box" style="border-top: 4px solid #${win.color}; background: #${win.color}11; padding: 15px; border-radius: 0 0 15px 15px;">
                            <h5 style="margin-bottom: 10px; color: #${win.color}; filter: brightness(0.6);">${win.title}</h5>
                            <p style="font-size: 0.85em; color: #${win.color}; filter: brightness(0.4); margin-bottom: 10px;">${win.description}</p>
                            <ul style="font-size: 0.8em; padding-left: 15px; color: #${win.color}; filter: brightness(0.4);">
                                ${win.bullets.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                        `).join('')}
                    </div>

                    <div class="resident-tip" style="margin-top: 25px; padding: 25px; background: #fffbeb; border-radius: 12px; border: 1px solid #fde68a;">
                        <h4 style="margin-bottom: 8px; color: #92400e; display: flex; align-items: center; gap: 10px;">Resident Pro-Tip: Keyboard Shortcuts</h4>
                        <p style="font-size: 0.9em; margin: 0; color: #78350f; line-height: 1.6;">${this.data.software.proTip}</p>
                    </div>
                </div>
            </div>

            <!-- STIMTROLLER PLUS -->
            <div id="content-stimtroller" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                        <div style="background: #0ea5e9; color: white; width: 60px; height: 60px; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 2em; box-shadow: 0 4px 12px rgba(14,165,233,0.3);">🕹️</div>
                        <div>
                            <h3 style="margin: 0;">StimTroller Plus™ Mastery</h3>
                            <p style="color: #64748b; margin: 5px 0 0 0;">${this.data.stimtroller.subtitle}</p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div class="hardware-img-container" style="height: 450px; background: #f1f5f9; border-radius: 20px; border: 2px solid #e2e8f0; position: relative;">
                            <img src="images/hardware/stimtroller.jpg" alt="StimTroller Plus" class="hardware-img rotate-90" style="filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));">
                            <div style="position: absolute; bottom: 30px; right: 30px; background: white; padding: 10px 15px; border-radius: 10px; font-size: 0.7em; font-weight: 800; border: 1px solid #e2e8f0;">360° VIEW</div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            ${this.data.stimtroller.buttons.map(btn => `
                            <div class="button-card" style="border-left: 5px solid #${btn.color}; border-top: none; ${btn.color === 'ef4444' ? 'background: #fffcfc;' : ''}">
                                <div class="button-name" style="${btn.color === 'ef4444' ? 'color: #ef4444;' : ''}">${btn.name}</div>
                                <p style="font-size: 0.9em; line-height: 1.5; color: #475569;">${btn.content}</p>
                            </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="resident-tip" style="margin-top: 25px; padding: 25px; background: #fef2f2; border-radius: 12px; border: 1px solid #fecaca;">
                        <h4 style="margin-bottom: 8px; color: #991b1b;">The "Beginner's Dial" Trap</h4>
                        <p style="font-size: 0.95em; margin: 0; color: #7f1d1d; line-height: 1.6;">${this.data.stimtroller.trap}</p>
                    </div>
                </div>
            </div>

            <!-- PREAMPLIFIER -->
            <div id="content-amplifier" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M12 2v6m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 7h14m-14 0a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/></svg>
                                <div>
                                    <h3 style="margin: 0;">Pre-Amplifier Headbox</h3>
                                    <p style="color: #64748b; font-size: 0.9em; margin-top: 5px;">Double-Shielded High Fidelity Differential Input.</p>
                                </div>
                            </div>
                            <div class="hardware-img-container" style="background: white; border-radius: 15px; border: 2px solid #e2e8f0; height: 280px; padding: 30px;">
                                <img src="images/hardware/headbox.png" alt="Sierra Amplifier" class="hardware-img">
                            </div>
                            <p style="font-size: 0.95em; line-height: 1.7; color: #475569; margin-top: 25px;">${this.data.amplifier.intro}</p>
                        </div>
                        
                        <div>
                            <h4 style="margin-bottom: 20px; color: #0f172a; font-size: 1.2em;">${this.data.amplifier.trinityLabel}</h4>
                            <p style="font-size: 0.9em; color: #64748b; margin-bottom: 25px; line-height: 1.6;">${this.data.amplifier.trinityDesc}</p>
                            <div class="port-list">
                                ${this.data.amplifier.ports.map(port => `
                                <div class="port-item" style="padding: 15px; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9;">
                                    <span class="port-dot" style="background: ${port.color === 'black' ? 'black' : '#' + port.color};"></span>
                                    <div>
                                        <div style="font-weight: 800;">${port.label}</div>
                                        <div style="font-size: 0.85em; color: #64748b;">${port.desc}</div>
                                    </div>
                                </div>
                                `).join('')}
                            </div>

                            <div class="alert-box success" style="margin-top: 30px; padding: 25px; background: #ecfdf5; border-radius: 15px; border: 1.5px solid #10b981; position: relative; overflow: hidden; box-shadow: 0 5px 15px rgba(16,185,129,0.1);">
                                <h4 style="margin-bottom: 10px; color: #064e3b; display: flex; align-items: center; gap: 8px; font-weight: 800;">Impedance Check: Your Data Quality Guarantee</h4>
                                <p style="color: #065f46; margin: 0; font-size: 0.9em; line-height: 1.6;">${this.data.amplifier.zTip}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SETTINGS GUIDE -->
            <div id="content-controls" class="tech-section" style="display: none;">
                <div class="tech-card">
                    <h3 style="margin-bottom: 30px; text-align: center; font-size: 1.8em;">The Dial Settings Mastery</h3>
                    <p style="text-align: center; color: #64748b; max-width: 800px; margin: 0 auto 40px auto; line-height: 1.6;">${this.data.controls.intro}</p>
                    
                    <div class="grid-3">
                        ${this.data.controls.pillars.map(pillar => `
                        <div class="tech-card hover-lift" style="border-top: 6px solid #${pillar.color}; padding: 25px; margin: 0;">
                            <div class="icon-lg">${pillar.icon}</div>
                            <h4 style="color: #${pillar.color}; filter: brightness(0.6); font-weight: 800;">${pillar.title}</h4>
                            <p style="font-size: 0.85em; color: #64748b; margin-bottom: 20px; min-height: 60px;">${pillar.desc}</p>
                            <div style="background: #${pillar.color}11; padding: 15px; border-radius: 12px; font-size: 0.85em;">
                                <strong>${pillar.settingsText}</strong>
                                <ul style="margin: 10px 0 0 10px; padding: 0; color: #${pillar.color}; filter: brightness(0.6); display: flex; flex-direction: column; gap: 5px;">
                                    ${pillar.settings.map(s => `<li>${s.includes(':') ? `<strong>${s.split(':')[0]}:</strong>${s.split(':')[1]}` : s}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                    
                    <div style="margin-top: 40px; padding: 30px; background: #f8fafc; border-radius: 20px; border-left: 10px solid #cbd5e1; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                        <h4 style="margin-bottom: 12px; font-weight: 800;">The "Filter Distortion" Warning</h4>
                        <p style="font-size: 0.95em; line-height: 1.7; color: #475569;">${this.data.controls.distortionWarning}</p>
                    </div>
                </div>
            </div>


        </div>

        <style>
            .emg-machine-container {
                font-family: 'Inter', -apple-system, system-ui, sans-serif;
                max-width: 1100px;
                margin: 0 auto;
                color: #1e293b;
                line-height: 1.6;
            }
            .machine-hero {
                text-align: center; 
                margin-bottom: 40px;
                padding: 70px 40px;
                background: linear-gradient(135deg, #0f172a, #334155);
                color: white;
                border-radius: 30px;
                box-shadow: 0 25px 40px -10px rgba(0,0,0,0.15);
            }
            .machine-hero h1 { font-weight: 900; }
            .machine-hero p { opacity: 0.85; font-size: 1.25em; max-width: 750px; margin: 0 auto; font-weight: 400; }
            
            .tabs-container {
                display: flex;
                justify-content: center;
                gap: 12px;
                margin-bottom: 60px;
                flex-wrap: wrap;
                background: #f1f5f9;
                padding: 12px;
                border-radius: 24px;
            }
            .tech-tab {
                padding: 16px 30px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 18px;
                cursor: pointer;
                font-weight: 700;
                color: #475569;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 0.95em;
            }
            .tech-tab:hover {
                border-color: #0ea5e9;
                color: #0ea5e9;
                transform: translateY(-4px);
                box-shadow: 0 12px 20px -5px rgba(0,0,0,0.08);
            }
            .tech-tab.active {
                background: #0ea5e9;
                color: white;
                border-color: #0ea5e9;
                box-shadow: 0 12px 25px rgba(14, 165, 233, 0.35);
            }

            .tech-card {
                background: white;
                padding: 45px;
                border-radius: 32px;
                border: 1px solid #e2e8f0;
                margin-bottom: 35px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .tech-card:hover {
                 box-shadow: 0 20px 30px -10px rgba(0,0,0,0.05);
            }
            .tech-card h3 { color: #0f172a; margin-bottom: 25px; font-weight: 900; font-size: 1.7em; letter-spacing: -0.03em; }

            .hardware-img-container {
                width: 100%;
                height: 240px;
                background: #f8fafc;
                border: 1.5px solid #e2e8f0;
                border-radius: 24px;
                margin-bottom: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .hardware-img {
                max-width: 90%;
                max-height: 85%;
                object-fit: contain;
                transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .hardware-img-container:hover .hardware-img {
                transform: scale(1.08);
            }
            .hardware-img.rotate-90 {
                transform: rotate(-90deg);
                max-height: 150% !important;
                max-width: 150% !important;
            }
            .hardware-img-container:hover .hardware-img.rotate-90 {
                transform: scale(1.08) rotate(-90deg);
            }

            .workflow-steps { display: flex; flex-direction: column; gap: 25px; }
            .workflow-item { display: flex; align-items: flex-start; gap: 20px; }
            .step-num { 
                width: 36px; height: 36px; background: #8b5cf6; color: white; 
                border-radius: 12px; display: flex; align-items: center; justify-content: center;
                font-weight: 900; font-size: 1em; flex-shrink: 0;
                box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
            }

            .button-card {
                padding: 28px;
                background: #f8fafc;
                border-radius: 24px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border: 1px solid #f1f5f9;
            }
            .button-card:hover { 
                transform: translateX(10px) scale(1.02); 
                background: white;
                box-shadow: 0 10px 25px -10px rgba(0,0,0,0.1);
                border-color: #e2e8f0;
            }
            .button-name { font-weight: 900; color: #1e293b; margin-bottom: 12px; font-size: 1.15em; letter-spacing: -0.02em; }

            .port-list { display: flex; flex-direction: column; gap: 18px; }
            .port-item { display: flex; align-items: flex-start; gap: 20px; transition: all 0.3s; }
            .port-item:hover { transform: translateX(5px); }
            .port-dot { 
                width: 18px; height: 18px; border-radius: 50%; border: 4px solid white; 
                box-shadow: 0 0 0 2px rgba(0,0,0,0.1); flex-shrink: 0; margin-top: 4px;
            }

            .grid-2 { display: grid; grid-template-columns: 1fr; gap: 40px; }
            .grid-3 { display: grid; grid-template-columns: 1fr; gap: 30px; }
            @media(min-width: 992px) {
                .grid-2 { grid-template-columns: 1fr 1.2fr; }
                .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
            }

            .icon-lg { font-size: 3.5em; margin-bottom: 25px; }

            .tech-section { animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
            @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
            
            .resident-tip h4 { font-weight: 900; letter-spacing: -0.02em; }
        </style>
        `;
    }
};
