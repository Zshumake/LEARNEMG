import { RadiculopathyData } from './RadiculopathyData.js';

export function generateContent(module) {
    return `
        <div class="interactive-content" style="position: relative; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <!-- Hero Section: Clinical Significance -->
            <div style="background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); padding: 35px; border-radius: 20px; margin-bottom: 30px; border: 1px solid #fb923c; box-shadow: 0 10px 25px rgba(251, 146, 60, 0.1);">
                <h3 style="color: #c2410c; margin-bottom: 20px; display: flex; align-items: center; font-size: 1.8em; font-weight: 800;">
                    <svg style="width: 32px; height: 32px; margin-right: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    ${RadiculopathyData.hero.title}
                </h3>
                <p style="color: #9a3412; font-size: 1.1em; line-height: 1.6; margin-bottom: 20px; font-weight: 500;"
                    class="markdown-content">
                    ${RadiculopathyData.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(251, 146, 60, 0.3);">
                        <h5 style="color: #c2410c; margin-bottom: 10px; font-weight: 700;">Diagnostic Goals</h5>
                        <ul style="margin: 0; padding-left: 20px; color: #9a3412; font-size: 0.95em; line-height: 1.4;">
                            ${RadiculopathyData.hero.goals.map(goal => `<li>${goal}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.5); padding: 15px; border-radius: 12px; border: 1px solid rgba(251, 146, 60, 0.3);">
                        <h5 style="color: #c2410c; margin-bottom: 10px; font-weight: 700;">Resident Pro-Tip</h5>
                        <p style="margin: 0; color: #9a3412; font-size: 0.95em; font-style: italic;">
                            ${RadiculopathyData.hero.proTip}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 1: Definition & The "Behind the DRG" Secret -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #ef4444; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #fee2e2; color: #ef4444; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">1</span>
                    ${RadiculopathyData.sections[0].title}
                </h4>
                <div style="line-height: 1.7; color: #475569;">
                    <p style="margin-bottom: 20px;" class="markdown-content">
                        ${RadiculopathyData.sections[0].description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                    </p>
                    
                    <div style="background: #f8fafc; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px; font-weight: 700; font-size: 1.1em;">${RadiculopathyData.sections[0].callout.title}</h5>
                        <p style="margin-bottom: 15px;" class="markdown-content">
                            ${RadiculopathyData.sections[0].callout.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                        </p>
                        <ul style="margin-top: 10px;">
                            ${RadiculopathyData.sections[0].callout.bullets.map(b => `<li class="markdown-content">${b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</li>`).join('')}
                        </ul>
                        <div style="margin-top: 15px; padding: 12px; background: #fff1f2; border-radius: 8px; border: 1px solid #fecaca; color: #991b1b; font-weight: 600; text-align: center;">
                            ${RadiculopathyData.sections[0].callout.clinicalPearl}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Etiology & Mechanisms -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #8b5cf6; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #f5f3ff; color: #8b5cf6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">2</span>
                    ${RadiculopathyData.sections[1].title}
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                    ${RadiculopathyData.sections[1].groups.map((group, idx) => `
                    <div style="${idx === 0 ? 'background: #fdf4ff; border: 1px solid #f5d0fe;' : 'background: #fffbeb; border: 1px solid #fef3c7;'} padding: 20px; border-radius: 15px;">
                        <h5 style="color: ${idx === 0 ? '#86198f' : '#92400e'}; margin-bottom: 15px; font-weight: 700;">${group.title}</h5>
                        <p style="font-size: 0.95em; color: ${idx === 0 ? '#701a75' : '#78350f'}; line-height: 1.5;" class="markdown-content">
                            ${group.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
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
                    ${RadiculopathyData.sections[2].title}
                </h4>
                <p style="color: #475569; margin-bottom: 25px; line-height: 1.6;" class="markdown-content">
                    ${RadiculopathyData.sections[2].description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${RadiculopathyData.sections[2].phases.map((phase, idx) => `
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="${idx === 0 ? 'background: #10b981;' : idx === 1 ? 'background: #059669;' : 'background: #047857;'} color: white; padding: 10px; border-radius: 12px; font-weight: 800; min-width: 100px; text-align: center; box-shadow: 0 4px 10px ${idx === 0 ? 'rgba(16, 185, 129, 0.2)' : idx === 1 ? 'rgba(5, 150, 105, 0.2)' : 'rgba(4, 120, 87, 0.2)'};">
                            ${phase.label}
                            <div style="font-size: 0.7em; font-weight: 400; margin-top: 4px;">${phase.sublabel}</div>
                        </div>
                        <div style="flex: 1; ${idx === 2 ? 'background: #fffbeb; border: 1px solid #fef3c7;' : 'background: #f0fdf4; border: 1px solid #d1fae5;'} padding: 15px; border-radius: 12px;">
                            <span style="color: ${idx === 2 ? '#92400e' : '#065f46'};" class="markdown-content">${phase.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Section 4: Clinical Localization Table -->
            <div style="background: white; padding: 30px; border-radius: 20px; margin-bottom: 30px; border-left: 8px solid #3b82f6; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h4 style="color: #1e293b; margin-bottom: 20px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center;">
                    <span style="background: #eff6ff; color: #3b82f6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.8em;">4</span>
                    ${RadiculopathyData.sections[3].title}
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
                            ${RadiculopathyData.sections[3].table.map((row, idx) => `
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
                    ${RadiculopathyData.sections[4].title}
                </h4>
                <p style="color: #475569; margin-bottom: 20px; line-height: 1.6;" class="markdown-content">
                    ${RadiculopathyData.sections[4].description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
                    ${RadiculopathyData.sections[4].acronym.map(item => `
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
                    ${RadiculopathyData.pearls.title}
                </h4>
                <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                    ${RadiculopathyData.pearls.list.map((pearl, idx) => `
                    <p style="margin: 0; line-height: 1.7; opacity: 0.9;" class="markdown-content">
                        ${idx + 1}. ${pearl.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                    </p>
                    `).join('')}
                </div>
            </div>

            <!-- Quiz Component -->
            ${typeof window.generateModuleQuiz === 'function' ? window.generateModuleQuiz(RadiculopathyData.quiz) : '<div class="quiz-container">Quiz System currently unavailable</div>'}
        </div>
    `;
}

