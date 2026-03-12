import { BrachialPlexopathyData } from './BrachialPlexopathyData.js';

export function generatePlexopathyContent() {
    return `
        <div class="plexopathy-clinical-content" style="padding: 30px; line-height: 1.7; color: #334155; font-family: 'Inter', system-ui, -apple-system, sans-serif;">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #7dd3fc; padding: 35px; border-radius: 24px; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.08);">
                <h2 style="color: #0369a1; margin-bottom: 20px; font-weight: 800; display: flex; align-items: center; gap: 12px; font-size: 1.8em;">
                    <svg style="width: 32px; height: 32px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    ${BrachialPlexopathyData.hero.title}
                </h2>
                <p style="font-size: 1.1em; color: #0c4a6e; font-weight: 500;" class="markdown-content">
                    ${BrachialPlexopathyData.hero.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                </p>
                <div style="margin-top: 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #bae6fd;">
                        <h5 style="color: #0369a1; margin-bottom: 8px; font-weight: 700;">Diagnostic Goal</h5>
                        <p style="margin: 0; font-size: 0.95em;">${BrachialPlexopathyData.hero.diagnosticGoal}</p>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #bae6fd;">
                        <h5 style="color: #0369a1; margin-bottom: 8px; font-weight: 700;">Resident Pro-Tip</h5>
                        <p style="margin: 0; font-size: 0.95em; font-style: italic;">${BrachialPlexopathyData.hero.proTip}</p>
                    </div>
                </div>
            </div>

            <!-- Section 1: The Golden Rule (Localization) -->
            <div style="background: white; padding: 30px; border-radius: 20px; border-left: 8px solid #0ea5e9; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 35px;">
                <h4 style="color: #0f172a; margin-bottom: 20px; font-size: 1.4em; font-weight: 700; display: flex; align-items: center; gap: 12px;">
                    <span style="background: #e0f2fe; color: #0ea5e9; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8em;">1</span>
                    ${BrachialPlexopathyData.sections[0].title}
                </h4>
                <p style="margin-bottom: 20px;" class="markdown-content">
                    ${BrachialPlexopathyData.sections[0].description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    ${BrachialPlexopathyData.sections[0].scenarios.map((scenario, idx) => `
                    <div style="${idx === 0 ? 'background: #f8fafc; border: 1px solid #e2e8f0;' : 'background: #f0f9ff; border: 1px solid #bae6fd;'} padding: 20px; border-radius: 16px;">
                        <h5 style="color: ${idx === 0 ? '#64748b' : '#0369a1'}; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.05em;">${scenario.label}</h5>
                        <p style="font-weight: 700; color: ${idx === 0 ? '#0369a1' : '#0ea5e9'}; margin-bottom: 10px;">${scenario.type}</p>
                        <p style="font-size: 0.9em;" class="markdown-content">${scenario.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>
                        <div style="margin-top: 10px; color: ${idx === 0 ? '#059669' : '#ef4444'}; font-weight: 800;">${scenario.result}</div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Section 2: Major Injury Patterns -->
            <div style="background: white; padding: 30px; border-radius: 20px; border-left: 8px solid #8b5cf6; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 35px;">
                <h4 style="color: #0f172a; margin-bottom: 25px; font-size: 1.4em; font-weight: 700; display: flex; align-items: center; gap: 12px;">
                    <span style="background: #f5f3ff; color: #8b5cf6; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8em;">2</span>
                    ${BrachialPlexopathyData.sections[1].title}
                </h4>
                
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${BrachialPlexopathyData.sections[1].patterns.map((pattern, idx) => `
                    <div style="${idx === 0 ? 'background: #faf5ff; border: 1px solid #e9d5ff;' : idx === 1 ? 'background: #fff1f2; border: 1px solid #fecaca;' : 'background: #f0fdfa; border: 1px solid #ccfbf1;'} padding: 20px; border-radius: 16px;">
                        ${idx === 0 ? `
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                            <h5 style="color: #6b21a8; font-weight: 800; margin: 0;">${pattern.title}</h5>
                            <span style="background: #8b5cf6; color: white; font-size: 0.7em; padding: 4px 10px; border-radius: 10px; font-weight: 700;">${pattern.tag}</span>
                        </div>
                        ` : `
                        <h5 style="${idx === 1 ? 'color: #be123c;' : 'color: #0f766e;'} font-weight: 800; margin-bottom: 10px;">${pattern.title}</h5>
                        `}
                        <p style="margin-bottom: 10px; font-size: 0.95em;" class="markdown-content">
                            ${pattern.cause.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                        </p>
                        ${pattern.presentation ? `
                        <p style="margin-bottom: 10px; font-size: 0.95em;" class="markdown-content">
                            ${pattern.presentation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                        </p>
                        ` : ''}
                        <div style="background: white; padding: 10px; border-radius: 8px; border: 1px dashed ${idx === 0 ? '#c084fc' : idx === 1 ? '#fb7185' : '#2dd4bf'}; font-size: 0.9em; color: ${idx === 0 ? '#5b21b6' : idx === 1 ? '#9f1239' : '#115e59'};" class="markdown-content">
                            ${pattern.edx.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Section 3: The "Burner" or "Stinger" -->
            <div style="background: #1e293b; padding: 30px; border-radius: 20px; color: white; margin-bottom: 35px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                <h4 style="color: #38bdf8; margin-bottom: 20px; font-size: 1.4em; font-weight: 700; display: flex; align-items: center; gap: 12px;">
                    <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    ${BrachialPlexopathyData.sections[2].title}
                </h4>
                <p style="opacity: 0.9; margin-bottom: 20px;" class="markdown-content">
                    ${BrachialPlexopathyData.sections[2].description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                </p>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;">
                    ${BrachialPlexopathyData.sections[2].bullets.map(b => `
                    <li style="display: flex; gap: 10px; align-items: center;">
                        <span style="background: #38bdf8; color: #1e293b; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8em; flex-shrink: 0;">!</span>
                        <span>${b}</span>
                    </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Quiz Section -->
            ${window.generateModuleQuiz ? window.generateModuleQuiz(BrachialPlexopathyData.quiz) : '<p class="error-text">Quiz module not loaded</p>'}
        </div>
    `;
}
