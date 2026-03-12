import { NeuropathyMyopathyData } from './NeuropathyMyopathyData.js';

export const NeuropathyMyopathy = {
    data: NeuropathyMyopathyData,

    generateContent(module) {
        // Ensure global tab switcher is defined
        if (!window.NM_switchTab) {
            window.NM_switchTab = function (tabName) {
                document.querySelectorAll('.nm-content').forEach(el => el.style.display = 'none');
                const target = document.getElementById('content-' + tabName);
                if (target) target.style.display = 'block';

                document.querySelectorAll('.nm-tab').forEach(el => {
                    el.classList.remove('active');
                    el.style.background = 'transparent';
                    el.style.color = '#475569';
                });

                const btn = document.getElementById('tab-' + tabName);
                if (btn) {
                    btn.classList.add('active');
                    btn.style.background = '#7c3aed'; // Purple theme for NM
                    btn.style.color = 'white';
                }
            };
        }

        // Output the HTML
        return `
        <div class="intro-container">

            <!-- Hero Section -->
            <div class="intro-hero" style="background: linear-gradient(135deg, #4c1d95, #8b5cf6); padding: 50px 30px; border-radius: 24px; color: white; margin-bottom: 40px; text-align: center; box-shadow: 0 20px 40px rgba(76, 29, 149, 0.2);">
                <h1 style="font-size: 2.8em; font-weight: 900; margin-bottom: 15px; letter-spacing: -0.03em;">${this.data.header.title}</h1>
                <p style="font-size: 1.25em; opacity: 0.9; max-width: 800px; margin: 0 auto; line-height: 1.6;">${this.data.header.subtitle}</p>
            </div>

            <!-- Navigation Tabs -->
            <div class="tabs-container" style="display: flex; flex-wrap: wrap; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 20px; margin-bottom: 40px; border: 1px solid #e2e8f0;">
                ${this.data.tabs.map((tab, i) => `
                    <button onclick="NM_switchTab('${tab.id}')" 
                            class="nm-tab ${i === 0 ? 'active' : ''}" 
                            id="tab-${tab.id}"
                            style="flex: 1; min-width: 200px; padding: 12px 20px; background: ${i === 0 ? '#7c3aed' : 'transparent'}; color: ${i === 0 ? 'white' : '#475569'}; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${tab.icon}"></path></svg>
                        ${tab.label}
                    </button>
                `).join('')}
            </div>

            <!-- CONTENT SECTIONS -->

            <!-- 1. Myopathy -->
            <div id="content-myopathy" class="nm-content" style="display: block; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.myopathy.intro.title}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.myopathy.intro.text}</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #6d28d9; font-weight: 800; font-size: 1.25em; margin-bottom: 15px;">Primary Causes</h4>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.myopathy.causes.map(cause => `
                                    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #8b5cf6;">
                                        <strong style="color: #4c1d95; display: block; margin-bottom: 4px;">${cause.type}</strong>
                                        <span style="color: #475569; font-size: 0.9em; line-height: 1.4;">${cause.detail}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #be185d; font-weight: 800; font-size: 1.25em; margin-bottom: 15px;">Hallmark Symptoms</h4>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.myopathy.symptoms.map(symp => `
                                    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #db2777;">
                                        <strong style="color: #831843; display: block; margin-bottom: 4px;">${symp.finding}</strong>
                                        <span style="color: #475569; font-size: 0.9em; line-height: 1.4;">${symp.detail}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <h4 style="color: #6d28d9; font-weight: 900; font-size: 1.5em; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #f3e8ff;">${this.data.myopathy.emg.title}</h4>
                    
                    <div style="display: flex; flex-direction: column; gap: 25px; margin-bottom: 40px;">
                        <div style="background: white; border: 1px solid #c4b5fd; border-radius: 16px; padding: 25px; box-shadow: 0 4px 6px rgba(139, 92, 246, 0.05);">
                            <h5 style="color: #5b21b6; font-size: 1.15em; font-weight: 800; margin-bottom: 15px;">${this.data.myopathy.emg.muap.title}</h5>
                            <ul style="color: #334155; line-height: 1.6; padding-left: 20px; font-size: 1.05em; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.myopathy.emg.muap.traits.map(trait => `<li>${trait}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div style="background: white; border: 1px solid #fbcfe8; border-radius: 16px; padding: 25px; box-shadow: 0 4px 6px rgba(219, 39, 119, 0.05);">
                            <h5 style="color: #9d174d; font-size: 1.15em; font-weight: 800; margin-bottom: 15px;">${this.data.myopathy.emg.recruitment.title}</h5>
                            <ul style="color: #334155; line-height: 1.6; padding-left: 20px; font-size: 1.05em; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.myopathy.emg.recruitment.traits.map(trait => `<li>${trait}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; padding: 25px; margin-bottom: 30px;">
                         <h4 style="color: #166534; font-weight: 900; font-size: 1.3em; margin-bottom: 10px;">${this.data.myopathy.ncs.title}</h4>
                         <strong style="color: #15803d; display: block; margin-bottom: 10px; font-size: 1.1em;">${this.data.myopathy.ncs.finding}</strong>
                         <p style="color: #14532d; line-height: 1.6; margin: 0;">${this.data.myopathy.ncs.detail}</p>
                    </div>

                    <div style="background: #1e293b; color: white; border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                         <h4 style="color: #94a3b8; text-transform: uppercase; font-size: 0.9em; letter-spacing: 0.1em; margin-bottom: 15px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: text-bottom;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> THE CLINICAL STRATEGY</h4>
                         <p style="color: #e2e8f0; line-height: 1.6; margin-bottom: 15px;"><strong>Presentation:</strong> ${this.data.myopathy.clinical.presentation}</p>
                         <p style="color: #e2e8f0; line-height: 1.6; margin: 0;"><strong>Execution:</strong> ${this.data.myopathy.clinical.strategy}</p>
                    </div>

                    <div class="resident-pearl">
                        <h4>Steroids: The Great Deceiver</h4>
                        <p>${this.data.myopathy.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 2. Neuropathy -->
            <div id="content-neuropathy" class="nm-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">${this.data.neuropathy.intro.title}</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.neuropathy.intro.text}</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #0369a1; font-weight: 800; font-size: 1.25em; margin-bottom: 15px;">Primary Trajectories</h4>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.neuropathy.causes.map(cause => `
                                    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #0ea5e9;">
                                        <strong style="color: #0c4a6e; display: block; margin-bottom: 4px;">${cause.type}</strong>
                                        <span style="color: #475569; font-size: 0.9em; line-height: 1.4;">${cause.detail}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #b45309; font-weight: 800; font-size: 1.25em; margin-bottom: 15px;">Hallmark Symptoms</h4>
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.neuropathy.symptoms.map(symp => `
                                    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #f59e0b;">
                                        <strong style="color: #78350f; display: block; margin-bottom: 4px;">${symp.finding}</strong>
                                        <span style="color: #475569; font-size: 0.9em; line-height: 1.4;">${symp.detail}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <h4 style="color: #0369a1; font-weight: 900; font-size: 1.5em; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e0f2fe;">${this.data.neuropathy.ncs.title}</h4>
                    
                    <div style="display: flex; flex-direction: column; gap: 25px; margin-bottom: 40px;">
                        <div style="background: white; border: 1px solid #bae6fd; border-radius: 16px; padding: 25px; box-shadow: 0 4px 6px rgba(14, 165, 233, 0.05);">
                            <h5 style="color: #0284c7; font-size: 1.15em; font-weight: 800; margin-bottom: 15px;">${this.data.neuropathy.ncs.axonal.title}</h5>
                            <ul style="color: #334155; line-height: 1.6; padding-left: 20px; font-size: 1.05em; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.neuropathy.ncs.axonal.traits.map(trait => `<li>${trait}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div style="background: white; border: 1px solid #fde68a; border-radius: 16px; padding: 25px; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.05);">
                            <h5 style="color: #d97706; font-size: 1.15em; font-weight: 800; margin-bottom: 15px;">${this.data.neuropathy.ncs.demyelinating.title}</h5>
                            <ul style="color: #334155; line-height: 1.6; padding-left: 20px; font-size: 1.05em; margin: 0; display: flex; flex-direction: column; gap: 10px;">
                                ${this.data.neuropathy.ncs.demyelinating.traits.map(trait => `<li>${trait}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <h4 style="color: #0369a1; font-weight: 900; font-size: 1.5em; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e0f2fe;">${this.data.neuropathy.emg.title}</h4>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                        <ul style="color: #334155; line-height: 1.6; padding-left: 20px; font-size: 1.05em; margin: 0; display: flex; flex-direction: column; gap: 15px;">
                            ${this.data.neuropathy.emg.traits.map(trait => `<li>${trait}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="background: #1e293b; color: white; border-radius: 16px; padding: 30px; margin-bottom: 30px;">
                         <h4 style="color: #94a3b8; text-transform: uppercase; font-size: 0.9em; letter-spacing: 0.1em; margin-bottom: 15px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: text-bottom;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> THE CLINICAL STRATEGY</h4>
                         <p style="color: #e2e8f0; line-height: 1.6; margin-bottom: 15px;"><strong>Presentation:</strong> ${this.data.neuropathy.clinical.presentation}</p>
                         <p style="color: #e2e8f0; line-height: 1.6; margin: 0;"><strong>Execution:</strong> ${this.data.neuropathy.clinical.strategy}</p>
                    </div>

                    <div class="resident-pearl" style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-color: #bae6fd;">
                        <h4 style="color: #0284c7;">The Truth About Stocking-Glove</h4>
                        <p style="color: #0c4a6e;">${this.data.neuropathy.pearl}</p>
                    </div>
                </div>
            </div>

            <!-- 3. Classification -->
            <div id="content-classification" class="nm-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <h3 style="color: #0f172a; margin-bottom: 20px; font-size: 1.8em; font-weight: 900;">Injury Classification</h3>
                    <p style="font-size: 1.1em; color: #475569; line-height: 1.6; margin-bottom: 30px;">${this.data.classification.intro}</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 40px;">
                        ${this.data.classification.seddon.map(item => `
                            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 25px; border-left: 5px solid ${item.color}; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                    <div style="background: ${item.color}15; color: ${item.color}; padding: 8px; border-radius: 10px;">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            ${item.icon === 'bolt' ? '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>' :
                item.icon === 'cut' ? '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>' :
                    '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="12" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
                                        </svg>
                                    </div>
                                    <h4 style="color: ${item.color}; font-weight: 900; font-size: 1.25em; margin: 0;">${item.grade}</h4>
                                </div>
                                <p style="color: #475569; font-size: 1em; line-height: 1.5; margin: 0;">${item.desc}</p>
                            </div>
                        `).join('')}
                    </div>

                    <h4 style="color: #0f172a; font-weight: 900; font-size: 1.5em; margin-bottom: 20px;">Sunderland Grades</h4>
                    <div style="overflow-x: auto; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; margin-bottom: 40px;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead style="background: #f1f5f9;">
                                <tr style="border-bottom: 2px solid #e2e8f0;">
                                    <th style="padding: 15px 20px; font-weight: 800; color: #475569;">Grade</th>
                                    <th style="padding: 15px 20px; font-weight: 800; color: #475569;">Anatomy</th>
                                    <th style="padding: 15px 20px; font-weight: 800; color: #475569;">Prognosis</th>
                                    <th style="padding: 15px 20px; font-weight: 800; color: #475569;">Seddon Equivalent</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.data.classification.sunderland.map(row => `
                                    <tr style="border-bottom: 1px solid #e2e8f0;">
                                        <td style="padding: 15px 20px; font-weight: 700;">${row.grade}</td>
                                        <td style="padding: 15px 20px;">${row.anatomy}</td>
                                        <td style="padding: 15px 20px;"><span style="padding: 4px 10px; border-radius: 20px; background: #e2e8f0; color: #475569; font-size: 0.85em; font-weight: 700;">${row.prognosis}</span></td>
                                        <td style="padding: 15px 20px; color: #6d28d9; font-weight: 600;">${row.seddon}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div style="background: #f1f5f9; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
                        <h4 style="color: #0f172a; font-weight: 900; font-size: 1.3em; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                            Prognostic Indicators
                        </h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                            ${this.data.classification.prognosis.map(item => `
                                <div style="background: white; padding: 20px; border-radius: 12px; border-left: 3px solid ${item.color}; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                                    <strong style="color: #0f172a; display: block; margin-bottom: 8px;">${item.factor}</strong>
                                    <p style="color: #475569; font-size: 0.9em; line-height: 1.5; margin: 0;">${item.detail}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. Comparison -->
            <div id="content-comparison" class="nm-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h3 style="color: #0f172a; margin-bottom: 10px; font-size: 2em; font-weight: 900;">${this.data.comparison.intro}</h3>
                        <p style="font-size: 1.1em; color: #475569;">${this.data.comparison.text}</p>
                    </div>

                    <div style="display: flex; gap: 20px; margin-bottom: 40px;">
                        <div style="flex: 1; background: #fffbeb; border: 1px solid #fde68a; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #d97706; font-weight: 900; margin-bottom: 10px; font-size: 1.2em;">Neuropathy Rule of Thumb</h4>
                            <p style="color: #92400e; line-height: 1.5; margin: 0;">${this.data.comparison.ruleOfThumb.neuropathy}</p>
                        </div>
                        <div style="flex: 1; background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 16px; padding: 25px;">
                            <h4 style="color: #db2777; font-weight: 900; margin-bottom: 10px; font-size: 1.2em;">Myopathy Rule of Thumb</h4>
                            <p style="color: #9d174d; line-height: 1.5; margin: 0;">${this.data.comparison.ruleOfThumb.myopathy}</p>
                        </div>
                    </div>

                    <div style="overflow-x: auto; background: white; border-radius: 16px; border: 1px solid #e2e8f0; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead style="background: #f8fafc;">
                                <tr>
                                    <th style="padding: 15px 20px; font-weight: 800; color: #475569; border-bottom: 2px solid #e2e8f0; text-transform: uppercase; font-size: 0.85em; letter-spacing: 0.05em;">Feature</th>
                                    <th style="padding: 15px 20px; font-weight: 800; color: #5b21b6; border-bottom: 2px solid #ddd6fe; text-transform: uppercase; font-size: 0.85em; letter-spacing: 0.05em; background: #f5f3ff;">Myopathy (Muscle)</th>
                                    <th style="padding: 15px 20px; font-weight: 800; color: #0369a1; border-bottom: 2px solid #bae6fd; text-transform: uppercase; font-size: 0.85em; letter-spacing: 0.05em; background: #f0f9ff;">Neuropathy (Nerve)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.data.comparison.table.map(row => {
                        if (row.category) {
                            return `<tr><td colspan="3" style="background: #f1f5f9; padding: 12px 20px; font-weight: 800; color: #334155; font-size: 0.85em; letter-spacing: 0.05em; text-transform: uppercase;">${row.category}</td></tr>`;
                        }
                        return `
                                    <tr style="border-bottom: 1px solid #f1f5f9;">
                                        <td style="padding: 15px 20px; font-weight: 700; color: #1e293b;">${row.feature}</td>
                                        
                                        <td style="padding: 15px 20px; background: #faf5ff;">
                                            <strong style="color: #db2777; display: block; margin-bottom: 4px;">${row.myopathy.text}</strong>
                                            <span style="color: #64748b; font-size: 0.85em;">${row.myopathy.sub}</span>
                                        </td>

                                        <td style="padding: 15px 20px; background: #f8fafc;">
                                            <strong style="color: #0ea5e9; display: block; margin-bottom: 4px;">${row.neuropathy.text}</strong>
                                            <span style="color: #64748b; font-size: 0.85em;">${row.neuropathy.sub}</span>
                                        </td>
                                    </tr>
                                    `;
                    }).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div style="border-top: 2px dashed #cbd5e1; padding-top: 30px;">
                        <h4 style="color: #64748b; text-transform: uppercase; font-size: 0.9em; letter-spacing: 0.1em; margin-bottom: 20px;">Mastery Glossary</h4>
                         <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                            ${this.data.comparison.glossary.map(g => `
                                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px;">
                                    <strong style="color: #0f172a; display: block; margin-bottom: 8px; font-size: 1.05em;">${g.term}</strong>
                                    <p style="color: #475569; font-size: 0.9em; line-height: 1.5; margin: 0;">${g.def}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                </div>
            </div>

            <!-- 4. Quiz Tab -->
            <div id="content-quiz" class="nm-content" style="display: none; animation: fadeIn 0.5s;">
                <div class="content-card" style="padding: 0; background: transparent; border: none; box-shadow: none;">
                    ${window.QuizSystem ? window.QuizSystem.generateModuleQuiz(this.data.quiz, 'nm_quiz') : '<div class="error-msg">Quiz system not loaded.</div>'}
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
                background: linear-gradient(135deg, #faf5ff, #f3e8ff);
                border: 1px solid #e9d5ff;
                border-radius: 16px;
                padding: 30px;
                margin-top: 40px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(124, 58, 237, 0.1);
            }
            .resident-pearl h4 {
                color: #6d28d9;
                font-size: 1.3em;
                font-weight: 900;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .resident-pearl p {
                color: #4c1d95;
                font-size: 1.05em;
                line-height: 1.6;
                margin: 0;
            }
            .nm-tab.active {
                box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
            }
            .nm-tab:hover:not(.active) {
                background: #f1f5f9 !important;
                color: #0f172a !important;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
        `;
    }
};

window.NeuropathyMyopathy = NeuropathyMyopathy;

export default {
    initialize() { /* Sub-handlers initialized inline */ },
    generateContent() { return NeuropathyMyopathy.generateContent(); }
};
