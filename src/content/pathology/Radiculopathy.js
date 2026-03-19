import { RadiculopathyData } from './RadiculopathyData.js';

export function generateContent(module) {
    const data = RadiculopathyData;
    const md = (text) => text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
    return `
        <div class="interactive-content" style="position: relative; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <!-- Hero Section: Clinical Significance -->
            <div style="background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); padding: 35px; border-radius: 20px; margin-bottom: 30px; border: 1px solid #fb923c; box-shadow: 0 10px 25px rgba(251, 146, 60, 0.1);">
                <h3 style="color: #c2410c; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.8em; font-weight: 800;">
                    <svg style="width: 32px; height: 32px; margin-right: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    ${data.hero.title}
                </h3>
                <p style="color: #9a3412; font-size: 1.1em; line-height: 1.6; margin-bottom: 20px; font-weight: 500;"
                    class="markdown-content">
                    ${md(data.hero.description)}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(251, 146, 60, 0.3);">
                        <h5 style="color: #c2410c; margin-bottom: 10px; font-weight: 700;">Diagnostic Goals</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #9a3412; font-size: 0.95em; line-height: 1.4;">
                            ${data.hero.goals.map(goal => `<li>${goal}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(251, 146, 60, 0.3);">
                        <h5 style="color: #c2410c; margin-bottom: 10px; font-weight: 700;">Resident Pro-Tip</h5>
                        <p style="margin: 0; color: #9a3412; font-size: 0.95em; font-style: italic;">
                            ${data.hero.proTip}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Beginner Introduction -->
            <div style="background: white; padding: 35px; border-radius: 20px; border-top: 4px solid #3b82f6; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 35px;">
                <h4 style="color: #0f172a; font-size: 1.4em; font-weight: 700; margin-bottom: 20px;">${data.beginnerIntro.title}</h4>
                <div style="color: #334155; font-size: 0.98em; line-height: 1.8; white-space: pre-line;">${md(data.beginnerIntro.text)}</div>
            </div>

            <!-- Red Flags -->
            <div style="background: white; padding: 35px; border-radius: 20px; border-left: 8px solid #dc2626; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 35px;">
                <h4 style="color: #991b1b; font-size: 1.4em; font-weight: 700; margin-bottom: 12px;">${data.redFlags.title}</h4>
                <p style="color: #475569; margin-bottom: 20px;">${data.redFlags.intro}</p>
                ${data.redFlags.flags.map(flag => `
                    <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 18px; border-radius: 12px; margin-bottom: 14px;">
                        <h5 style="color: #991b1b; margin-bottom: 8px; font-weight: 800;">${flag.name}</h5>
                        <p style="color: #334155; font-size: 0.92em; line-height: 1.7; margin: 0;">${flag.description}</p>
                    </div>
                `).join('')}
            </div>

            <!-- Section 1: Definition & The "Behind the DRG" Secret -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #ef4444; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #fee2e2; color: #ef4444; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">1</span>
                    ${data.sections[0].title}
                </h4>
                <div style="line-height: 1.7; color: #475569;">
                    <p style="margin-bottom: 20px;" class="markdown-content">
                        ${md(data.sections[0].description)}
                    </p>
                    
                    <div style="background: #f8fafc; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px; font-weight: 700; font-size: 1.1em;">${data.sections[0].callout.title}</h5>
                        <p style="margin-bottom: 15px;" class="markdown-content">
                            ${md(data.sections[0].callout.description)}
                        </p>
                        <ul style="margin-top: 10px;">
                            ${data.sections[0].callout.bullets.map(b => `<li class="markdown-content">${md(b)}</li>`).join('')}
                        </ul>
                        <div style="margin-top: 15px; padding: 12px; background: #fff1f2; border-radius: 8px; border: 1px solid #fecaca; color: #991b1b; font-weight: 600; text-align: center;">
                            ${data.sections[0].callout.clinicalPearl}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Etiology & Mechanisms -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #8b5cf6; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #f5f3ff; color: #8b5cf6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">2</span>
                    ${data.sections[1].title}
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                    ${data.sections[1].groups.map((group, idx) => `
                    <div style="${idx === 0 ? 'background: #fdf4ff; border: 1px solid #f5d0fe;' : 'background: #fffbeb; border: 1px solid #fef3c7;'} padding: 20px; border-radius: 15px;">
                        <h5 style="color: ${idx === 0 ? '#86198f' : '#92400e'}; margin-bottom: 15px; font-weight: 700;">${group.title}</h5>
                        <p style="font-size: 0.95em; color: ${idx === 0 ? '#701a75' : '#78350f'}; line-height: 1.5;" class="markdown-content">
                            ${md(group.description)}
                        </p>
                        <ul style="margin-top: 10px; color: ${idx === 0 ? '#701a75' : '#78350f'}; font-size: 0.9em; padding-left: 20px;">
                            ${group.bullets.map(b => `<li>${b}</li>`).join('')}
                        </ul>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Section 3: The "EMG Clock" (Timeline) -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #069669; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #ecfdf5; color: #069669; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">3</span>
                    ${data.sections[2].title}
                </h4>
                <p style="color: #475569; margin-bottom: 25px; line-height: 1.6;" class="markdown-content">
                    ${md(data.sections[2].description)}
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${data.sections[2].phases.map((phase, idx) => `
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="${idx === 0 ? 'background: #10b981;' : idx === 1 ? 'background: #059669;' : 'background: #047857;'} color: white; padding: 10px; border-radius: 12px; font-weight: 800; min-width: 100px; text-align: center; box-shadow: 0 4px 10px ${idx === 0 ? 'rgba(16, 185, 129, 0.2)' : idx === 1 ? 'rgba(5, 150, 105, 0.2)' : 'rgba(4, 120, 87, 0.2)'};">
                            ${phase.label}
                            <div style="font-size: 0.7em; font-weight: 400; margin-top: 4px;">${phase.sublabel}</div>
                        </div>
                        <div style="flex: 1; ${idx === 2 ? 'background: #fffbeb; border: 1px solid #fef3c7;' : 'background: #f0fdf4; border: 1px solid #d1fae5;'} padding: 15px; border-radius: 12px;">
                            <span style="color: ${idx === 2 ? '#92400e' : '#065f46'};" class="markdown-content">${md(phase.content)}</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Section 4: Clinical Localization Table -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #3b82f6; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #eff6ff; color: #3b82f6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">4</span>
                    ${data.sections[3].title}
                </h4>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                        <thead>
                            <tr style="background: #f1f5f9; color: #475569;">
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: center;">Root</th>
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: left;">Key Weakness / Muscles</th>
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: center;">Reflex</th>
                                <th style="padding: 15px; border-bottom: 2px solid #cbd5e1; text-align: left;">Resident Pro-Tip</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.sections[3].table.map((row, idx) => `
                            <tr style="${idx % 2 === 1 ? 'background: #fdfcf8;' : ''}">
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 800; color: #2563eb; background: ${idx % 2 === 1 ? '#f1f5f9' : '#f8fafc'};">${row.root}</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0;">${row.weakness}</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center;">${row.reflex}</td>
                                <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 0.9em; font-style: italic; color: #64748b;">${row.proTip}</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Section 5: The "HI MADAM" Differential -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #f59e0b; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 15px; font-size: 1.5em; font-weight: 700;">
                    ${data.sections[4].title}
                </h4>
                <p style="color: #475569; margin-bottom: 20px; line-height: 1.6;" class="markdown-content">
                    ${md(data.sections[4].description)}
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
                    ${data.sections[4].acronym.map(item => `
                    <div style="background: #fffbeb; padding: 15px; border-radius: 12px; border: 1px solid #fef3c7; text-align: center;">
                        <div style="font-size: 1.5em; font-weight: 800; color: #d97706;">${item.letter}</div>
                        <div style="font-size: 0.85em; color: #92400e;">${item.meaning}</div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Final Diagnostic Pearls: The "Senior Resident Lecture" -->
            <div style="background: #1e293b; padding: 35px; border-radius: 20px; color: white; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <h4 style="color: #38bdf8; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <svg style="width: 28px; height: 28px; margin-right: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    ${data.pearls.title}
                </h4>
                <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                    ${data.pearls.list.map((pearl, idx) => `
                    <p style="margin: 0; line-height: 1.7; opacity: 0.9;" class="markdown-content">
                        ${idx + 1}. ${md(pearl)}
                    </p>
                    `).join('')}
                </div>
            </div>

            <!-- Quiz Component -->
            ${typeof window.generateModuleQuiz === 'function' ? window.generateModuleQuiz(data.quiz) : '<div class="quiz-container">Quiz System currently unavailable</div>'}

            <!-- Clinical Scenarios -->
            <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 35px; margin-top: 35px; margin-bottom: 20px;">
                <h4 style="color: white; font-size: 1.35em; font-weight: 800; margin: 0 0 8px;">Name That Root: Clinical Scenarios</h4>
                <p style="color: #94a3b8; margin: 0; font-size: 0.95em;">Apply your localization skills to these clinical presentations. Each scenario requires you to identify the affected nerve root based on the clinical and electrodiagnostic findings.</p>
            </div>
            ${typeof window.generateModuleQuiz === 'function' ? window.generateModuleQuiz(data.scenarios) : ''}
        </div>
    `;
}

