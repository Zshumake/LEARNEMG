import { BrachialPlexopathyData } from './BrachialPlexopathyData.js';

export function generatePlexopathyContent() {
    // Add window handler for EDX reveal
    if (!window._bpToggleEdx) {
        window._bpToggleEdx = function(id) {
            const el = document.getElementById('bp-edx-' + id);
            const btn = document.getElementById('bp-btn-' + id);
            if (el) {
                if (el.style.maxHeight === '0px' || !el.style.maxHeight) {
                    el.style.maxHeight = '300px';
                    if (btn) btn.textContent = 'Hide EDX Signature';
                } else {
                    el.style.maxHeight = '0px';
                    if (btn) btn.textContent = 'View EDX Signature';
                }
            }
        };
    }

    const md = (text) => text ? text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') : '';

    const goldenRule = BrachialPlexopathyData.sections[0];
    const patterns = BrachialPlexopathyData.sections[1];
    const burner = BrachialPlexopathyData.sections[2];

    const patternColors = [
        { bg: '#faf5ff', border: '#e9d5ff', accent: '#7c3aed', titleColor: '#6b21a8', btnBg: '#7c3aed' },
        { bg: '#fff1f2', border: '#fecaca', accent: '#e11d48', titleColor: '#be123c', btnBg: '#e11d48' },
        { bg: '#f0fdfa', border: '#ccfbf1', accent: '#0d9488', titleColor: '#0f766e', btnBg: '#0d9488' }
    ];

    return `
        <style>
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .bp-section { animation: fadeInUp 0.5s ease forwards; opacity: 0; }
            .bp-section:nth-child(1) { animation-delay: 0s; }
            .bp-section:nth-child(2) { animation-delay: 0.1s; }
            .bp-section:nth-child(3) { animation-delay: 0.2s; }
            .bp-section:nth-child(4) { animation-delay: 0.3s; }
            .bp-section:nth-child(5) { animation-delay: 0.4s; }
            .bp-section:nth-child(6) { animation-delay: 0.5s; }
            .bp-section:nth-child(7) { animation-delay: 0.6s; }
            .bp-section:nth-child(8) { animation-delay: 0.7s; }
            .bp-section:nth-child(9) { animation-delay: 0.8s; }
            .bp-edx-reveal { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
            .bp-edx-btn { cursor: pointer; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.85em; color: white; letter-spacing: 0.02em; transition: opacity 0.2s; }
            .bp-edx-btn:hover { opacity: 0.85; }
        </style>
        <div style="font-family: 'Inter', system-ui, sans-serif; color: #334155; line-height: 1.7; max-width: 900px; margin: 0 auto;">

            <!-- Editorial Hero -->
            <div class="bp-section" style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 45px; margin-bottom: 35px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -30px; right: -30px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%); border-radius: 50%;"></div>
                <h2 style="color: white; font-size: 2em; font-weight: 800; margin: 0 0 12px; letter-spacing: -0.02em;">${BrachialPlexopathyData.hero.title}</h2>
                <p style="color: #94a3b8; font-size: 1.05em; margin: 0 0 25px; max-width: 700px;">
                    ${md(BrachialPlexopathyData.hero.description).replace(/<strong>(.*?)<\/strong>/g, '<strong style="color: #e2e8f0;">$1</strong>')}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <div style="color: #7dd3fc; font-size: 0.72em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">Diagnostic Goal</div>
                        <div style="color: #e2e8f0; font-size: 0.92em;">${BrachialPlexopathyData.hero.diagnosticGoal}</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 18px; border-radius: 12px;">
                        <div style="color: #c4b5fd; font-size: 0.72em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">Resident Pro-Tip</div>
                        <div style="color: #e2e8f0; font-size: 0.92em; font-style: italic;">${BrachialPlexopathyData.hero.proTip}</div>
                    </div>
                </div>
            </div>

            <!-- Section 1: The Golden Rule -->
            <div class="bp-section" style="background: white; border-top: 4px solid #0ea5e9; border-radius: 16px; padding: 40px; margin-bottom: 30px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
                <h3 style="color: #0f172a; margin: 0 0 12px; font-size: 1.35em; font-weight: 800;">${goldenRule.title}</h3>
                <p style="margin: 0 0 25px; color: #475569; font-size: 0.98em;">
                    ${md(goldenRule.description)}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
                    ${goldenRule.scenarios.map((scenario, idx) => `
                    <div style="background: ${idx === 0 ? '#f8fafc' : '#f0f9ff'}; border: 1px solid ${idx === 0 ? '#e2e8f0' : '#bae6fd'}; padding: 22px; border-radius: 14px;">
                        <div style="color: ${idx === 0 ? '#64748b' : '#0369a1'}; font-weight: 800; font-size: 0.72em; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">${scenario.label}</div>
                        <div style="font-weight: 700; color: ${idx === 0 ? '#0f172a' : '#0369a1'}; margin-bottom: 8px; font-size: 1.05em;">${scenario.type}</div>
                        <p style="font-size: 0.9em; margin: 0 0 12px; color: #475569;">${md(scenario.description)}</p>
                        <div style="color: ${idx === 0 ? '#059669' : '#dc2626'}; font-weight: 800; font-size: 0.95em;">${scenario.result}</div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- Key Takeaway: Golden Rule -->
            <div class="bp-section" style="border-left: 4px solid #0ea5e9; background: #f0f9ff; padding: 20px 25px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                <div style="font-weight: 800; color: #0369a1; font-size: 0.78em; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">Key Takeaway</div>
                <div style="color: #0c4a6e; font-size: 0.95em;">If SNAP is normal = root (preganglionic). If SNAP is absent = plexus (postganglionic). This single finding is the most powerful localizer in EDX.</div>
            </div>

            <!-- Section 2: Big Three Injury Patterns -->
            <div class="bp-section" style="background: white; border-top: 4px solid #7c3aed; border-radius: 16px; padding: 40px; margin-bottom: 30px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
                <h3 style="color: #0f172a; margin: 0 0 25px; font-size: 1.35em; font-weight: 800;">${patterns.title}</h3>
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${patterns.patterns.map((pattern, idx) => {
                        const c = patternColors[idx];
                        return `
                        <div style="background: ${c.bg}; border: 1px solid ${c.border}; padding: 24px; border-radius: 14px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                <h4 style="color: ${c.titleColor}; font-weight: 800; margin: 0; font-size: 1.08em;">${pattern.title}</h4>
                                ${pattern.tag ? `<span style="background: ${c.btnBg}; color: white; font-size: 0.68em; padding: 4px 12px; border-radius: 10px; font-weight: 700; white-space: nowrap;">${pattern.tag}</span>` : ''}
                            </div>
                            <p style="margin: 0 0 8px; font-size: 0.93em; color: #334155;">${md(pattern.cause)}</p>
                            ${pattern.presentation ? `<p style="margin: 0 0 14px; font-size: 0.93em; color: #334155;">${md(pattern.presentation)}</p>` : '<div style="margin-bottom: 14px;"></div>'}
                            <button id="bp-btn-${idx}" class="bp-edx-btn" style="background: ${c.btnBg};" onclick="window._bpToggleEdx(${idx})">View EDX Signature</button>
                            <div id="bp-edx-${idx}" class="bp-edx-reveal" style="max-height: 0;">
                                <div style="margin-top: 14px; background: white; padding: 16px; border-radius: 10px; border: 1px dashed ${c.accent}; font-size: 0.9em; color: ${c.titleColor};">
                                    ${md(pattern.edx)}
                                </div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- Key Takeaway: Patterns -->
            <div class="bp-section" style="border-left: 4px solid #7c3aed; background: #faf5ff; padding: 20px 25px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                <div style="font-weight: 800; color: #6b21a8; font-size: 0.78em; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">Key Takeaway</div>
                <div style="color: #3b0764; font-size: 0.95em;">Erb's = waiter's tip (C5-C6). Klumpke's = claw hand + Horner (C8-T1). Parsonage-Turner = pain then patchy weakness.</div>
            </div>

            <!-- Section 3: Burners & Stingers -->
            <div class="bp-section" style="background: white; border-top: 4px solid #f59e0b; border-radius: 16px; padding: 40px; margin-bottom: 30px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
                <h3 style="color: #0f172a; margin: 0 0 12px; font-size: 1.35em; font-weight: 800;">${burner.title}</h3>
                <p style="margin: 0 0 20px; color: #475569; font-size: 0.98em;">${md(burner.description)}</p>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
                    ${burner.bullets.map(b => `
                    <li style="display: flex; gap: 12px; align-items: baseline;">
                        <span style="color: #f59e0b; font-weight: 800; font-size: 1.1em; flex-shrink: 0;">--</span>
                        <span style="color: #334155; font-size: 0.95em;">${b}</span>
                    </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Existing Quiz (10 questions) -->
            <div class="bp-section" style="margin-bottom: 30px;">
                <h3 style="color: #0f172a; margin: 0 0 20px; font-size: 1.35em; font-weight: 800;">Knowledge Check</h3>
                ${window.generateModuleQuiz ? window.generateModuleQuiz(BrachialPlexopathyData.quiz) : '<p style="color: #dc2626;">Quiz module not loaded</p>'}
            </div>

            <!-- NEW: Localize the Lesion Scenarios -->
            <div class="bp-section" style="margin-bottom: 30px;">
                <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 16px; padding: 35px; margin-bottom: 25px;">
                    <h3 style="color: white; margin: 0 0 8px; font-size: 1.35em; font-weight: 800;">Localize the Lesion</h3>
                    <p style="color: #94a3b8; margin: 0; font-size: 0.95em;">Apply the principles above to real clinical scenarios. Each vignette requires you to synthesize history, exam findings, and EDX data to pinpoint the anatomic site.</p>
                </div>
                ${window.generateModuleQuiz ? window.generateModuleQuiz(BrachialPlexopathyData.localizationScenarios) : '<p style="color: #dc2626;">Quiz module not loaded</p>'}
            </div>

        </div>
    `;
}
