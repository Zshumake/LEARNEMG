import { ClinicalIcons } from './ClinicalIcons.js';

export const ClinicalDiagnosisRenderer = {
    renderDifferentialFeedback: function (results, expected) {
        let html = `
            <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; color: #22d3ee; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    ${ClinicalIcons.getSvgIcon('chart', 'currentColor', '20')} Clinical Analysis Result
                </h4>
                <p style="margin: 0; color: #94a3b8;">Diagnostic capture: <strong style="color: #f8fafc;">${results.matched.length}</strong> / <strong style="color: #f8fafc;">${results.totalExpected}</strong> key considerations.</p>
            </div>
        `;

        if (results.matched.length > 0) {
            html += `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 15px;">
                    <h4 style="margin: 0 0 8px 0; color: #34d399; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                        ${ClinicalIcons.getSvgIcon('check', 'currentColor', '20')} Valid Considerations
                    </h4>
                    <p style="margin: 0; color: #a7f3d0;">${results.matched.join(', ')}</p>
                </div>
            `;
        }

        html += `
            <div style="background: rgba(15, 23, 42, 0.5); border: 2px dashed rgba(148, 163, 184, 0.3); padding: 20px; border-radius: 12px;">
                <h4 style="margin: 0 0 8px 0; color: #94a3b8; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                    ${ClinicalIcons.getSvgIcon('folder', 'currentColor', '20')} Diagnostic Progress
                </h4>
                <p style="margin: 0; font-size: 0.9em; color: #cbd5e1;">Capture is being recorded. Continue your investigation and EDX studies to reveal the definitive differential exclusion logic.</p>
            </div>
        `;
        return html;
    },

    renderEMGDecisionFeedback: function (evaluation) {
        const isCorrect = evaluation.type.includes('correct');
        const color = isCorrect ? '#34d399' : '#f87171';
        const bg = isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
        const border = isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        const title = isCorrect ? 'Clinical Correlation Accurate' : 'Strategy Reconsideration';
        const icon = isCorrect ? 'check' : 'x';

        let html = `
            <div style="background: ${bg}; border: 1px solid ${border}; padding: 25px; border-radius: 12px; border-left: 4px solid ${color};">
                <h4 style="color: ${color}; margin: 0 0 10px 0; display: flex; align-items: center; gap: 10px; font-size: 1.2em;">
                    ${ClinicalIcons.getSvgIcon(icon, 'currentColor', '24')} ${title}
                </h4>
                <p style="font-size: 1.05em; line-height: 1.5; color: #f8fafc; margin: 0;">${evaluation.message}</p>
        `;

        if (evaluation.educationalNote) {
            html += `
                <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid ${border}; border-left: 3px solid #fbbf24; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h5 style="margin: 0 0 8px 0; color: #fbbf24; text-transform: uppercase; font-size: 0.8em; letter-spacing: 1px;">Clinical Learning Point</h5>
                    <p style="margin: 0; font-size: 0.95em; color: #e2e8f0;">${evaluation.educationalNote}</p>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    },

    renderFinalDiagnosis: function (isCorrect, currentCase, userDiagnosis) {
        const title = isCorrect ? 'Clinical Excellence' : 'Diagnostic Review';
        const color = isCorrect ? '#34d399' : '#22d3ee';
        const bg = isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(6, 182, 212, 0.1)';
        const icon = isCorrect ? 'trophy' : 'microscope';

        return `
            <div style="background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(24px); border: 1px solid ${color}40; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); margin-top: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="color: ${color}; margin-bottom: 15px; filter: drop-shadow(0 0 10px ${color}80);">
                        ${ClinicalIcons.getSvgIcon(icon, 'currentColor', '64')}
                    </div>
                    <h3 style="margin: 0; color: ${color}; font-size: 2em; font-weight: 800; text-shadow: 0 0 10px ${color}40;">${title}</h3>
                </div>

                <div style="background: ${bg}; padding: 25px; border-radius: 12px; margin-bottom: 30px; text-align: center; border: 1px solid ${color}40;">
                    <div style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; font-weight: 600;">Confirmed Diagnosis</div>
                    <div style="font-size: 1.8em; font-weight: 800; color: #f8fafc;">${currentCase.correctDiagnosis}</div>
                </div>

                <div style="background: rgba(6, 182, 212, 0.05); border-left: 4px solid ${color}; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                    <h5 style="margin: 0 0 10px 0; color: ${color}; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Diagnostic Synthesis</h5>
                    <p style="margin: 0; line-height: 1.6; font-size: 1.05em; color: #e2e8f0;">${currentCase.explanation}</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <h5 style="margin: 0 0 15px 0; color: #94a3b8; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px; font-weight: 700;">Key Evidence Review</h5>
                    <div style="display: grid; gap: 12px;">
                        ${this.generateEvidenceReview(currentCase, color)}
                    </div>
                </div>

                ${currentCase.differentialDiagnosis && typeof currentCase.differentialDiagnosis[0] === 'object' ? `
                <div style="margin-bottom: 30px;">
                    <h5 style="margin: 0 0 15px 0; color: #94a3b8; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px; font-weight: 700;">Differential Exclusion Logic</h5>
                    <div style="background: rgba(15, 23, 42, 0.5); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.95em;">
                            <thead>
                                <tr style="background: rgba(255, 255, 255, 0.05); border-bottom: 2px solid rgba(255, 255, 255, 0.1);">
                                    <th style="padding: 15px; text-align: left; width: 40%; color: #94a3b8; font-weight: 600;">Diagnosis</th>
                                    <th style="padding: 15px; text-align: left; color: #94a3b8; font-weight: 600;">Rule-Out Reasoning</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${currentCase.differentialDiagnosis.map(diff => `
                                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                        <td style="padding: 15px; color: ${diff.name === currentCase.correctDiagnosis ? '#34d399' : '#f8fafc'}; font-weight: ${diff.name === currentCase.correctDiagnosis ? '700' : '500'}; display: flex; align-items: center; gap: 8px;">
                                            ${diff.name === currentCase.correctDiagnosis ? ClinicalIcons.getSvgIcon('check', '#34d399', '20') : ''}
                                            ${diff.name}
                                        </td>
                                        <td style="padding: 15px; color: #cbd5e1; line-height: 1.5;">${diff.ruleOut || diff.explanation || 'N/A'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                ` : ''}

            ${currentCase.teachingPoints ? `
                <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #fbbf24; padding: 25px; border-radius: 0 12px 12px 0;">
                    <h5 style="margin: 0 0 15px 0; color: #fbbf24; text-transform: uppercase; display: flex; align-items: center; gap: 8px; font-weight: 700;">
                        ${ClinicalIcons.getSvgIcon('cap', 'currentColor', '20')} Clinical Pearls
                    </h5>
                    <ul style="margin: 0; padding-left: 20px; color: #e2e8f0; line-height: 1.6;">
                        ${currentCase.teachingPoints.map(point => `<li style="margin-bottom: 10px;">${point}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
    },

    generateEvidenceReview: function (caseData, color = '#22d3ee') {
        let evidence = [];

        if (caseData.physicalExam) {
            const exam = caseData.physicalExam;
            if (exam.specialTests) {
                const tests = exam.specialTests.toLowerCase();
                if (tests.includes('tinel')) {
                    evidence.push({ icon: 'hand', text: 'Positive Tinel sign suggests focal nerve irritability at the site of compression.' });
                }
                if (tests.includes('spurling')) {
                    evidence.push({ icon: 'neck', text: "Positive Spurling's test strongly suggests cervical nerve root irritation (radiculopathy)." });
                }
                if (tests.includes('phalen')) {
                    evidence.push({ icon: 'hand', text: "Positive Phalen's maneuver increases carpal tunnel pressure, confirming focal median nerve entrapment." });
                }
            }
        }

        const ncs = caseData.ncsStudies || caseData.ncsResults;
        if (ncs) {
            const sensory = ncs.sensory || ncs.sensoryStudies;
            const motor = ncs.motor || ncs.motorStudies;
            const comparison = ncs.comparison;

            if (sensory) {
                sensory.filter(s => s.abnormal).forEach(s => {
                    evidence.push({ icon: 'lightning', text: `Abnormal sensory response in ${s.name || s.nerve} suggests ${s.amp === 0 ? 'severe axonal loss' : 'axonal drop or focal demyelination'}.` });
                });
            }
            if (motor) {
                motor.filter(m => m.abnormal).forEach(m => {
                    evidence.push({ icon: 'plug', text: `Abnormal motor response in ${m.name || m.nerve} indicates motor axon involvement or conduction failure.` });
                });
            }
            if (comparison) {
                comparison.filter(c => c.abnormal).forEach(c => {
                    evidence.push({ icon: 'scale', text: `Side - to - side or internal comparison (${c.name}) confirms focal pathology ${c.deltaP ? `with a significant ${c.deltaP} difference` : ''}.` });
                });
            }
        }

        const emg = caseData.emgStudies || caseData.emgFindings;
        if (emg) {
            emg.filter(f => f.abnormal).forEach(f => {
                const hasDenervation = (f.fibs && f.fibs !== '0' && f.fibs !== 'None' && f.fibs !== 'Nml');
                const chronic = (f.motorUnits && (f.motorUnits.toLowerCase().includes('large') || f.motorUnits.toLowerCase().includes('polyphasic')));

                if (hasDenervation) {
                    evidence.push({ icon: 'target', text: `Active denervation (Fibs/PSWs) in ${f.muscle} confirms ${caseData.title.toLowerCase().includes('myopathy') ? 'muscle fiber necrosis' : 'acute/ongoing axonal injury'}.` });
                }
                if (chronic) {
                    evidence.push({ icon: 'wrench', text: `Motor unit remodeling in ${f.muscle} indicates chronic reinnervation and neuroplasticity.` });
                }
            });
        }

        if (evidence.length === 0) return '<p style="color: #64748b; font-style: italic; margin: 0;">No specific abnormalities identified to review.</p>';

        return evidence.slice(0, 5).map(e => `
            <div style="display: flex; gap: 12px; align-items: flex-start; background: rgba(15, 23, 42, 0.4); padding: 15px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <div style="color: ${color}; margin-top: 2px;">${ClinicalIcons.getSvgIcon(e.icon, 'currentColor', '20')}</div>
                <div style="color: #cbd5e1; font-size: 0.95em; line-height: 1.5;">${e.text}</div>
            </div>
    `).join('');
    }
};
