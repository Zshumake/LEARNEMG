import { ClinicalIcons } from './ClinicalIcons.js';

export const ClinicalExamRenderer = {
    renderCaseDetails: function (caseData) {
        const c = caseData.presentation;
        const diffColors = {
            beginner: '#10b981',
            intermediate: '#f59e0b',
            difficult: '#ef4444'
        };
        const badgeColor = diffColors[caseData.difficulty] || '#3b82f6';

        return `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; border-bottom: 2px solid rgba(6, 182, 212, 0.1); padding-bottom: 20px;">
                <h2 style="margin: 0; font-weight: 800; color: #f8fafc; font-size: 1.6em;">${caseData.title}</h2>
                <div style="display: flex; gap: 10px; align-items: center; color: #94a3b8; font-size: 0.9em; font-weight: 600; text-transform: uppercase;">
                    <span style="background: ${badgeColor}20; color: ${badgeColor}; padding: 4px 10px; border-radius: 20px; font-size: 0.8em; box-shadow: 0 0 10px ${badgeColor}40;">${caseData.difficulty}</span>
                    <span>•</span>
                    <span>Age: ${c.age}</span>
                    <span>•</span>
                    <span>${c.gender}</span>
                    <span>•</span>
                    <span>${c.occupation}</span>
                </div>
            </div>

            <div class="medical-history-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Chief Complaint</h5>
                    <p style="font-size: 1.1em; color: #f8fafc; font-weight: 700; margin: 0;">"${c.chiefComplaint}"</p>
                </div>
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">History of Present Illness</h5>
                    <p style="color: #e2e8f0; line-height: 1.6; margin: 0;">${c.history}</p>
                </div>
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Medical History</h5>
                    <p style="color: #e2e8f0; margin: 0 0 10px 0;">${c.pmh}</p>
                    <div style="font-size: 0.85em; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;"><strong>Meds:</strong> ${c.medications || 'None'}</div>
                </div>
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Family/Social</h5>
                    <p style="color: #e2e8f0; margin: 0;">${c.familyHistory || 'Non-contributory'}</p>
                </div>
                ${caseData.reviewOfSystems ? `
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Review of Systems</h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9em; color: #e2e8f0;">
                        ${Object.entries(caseData.reviewOfSystems).map(([sys, val]) => `<div><strong style="color: #f8fafc;">${sys.charAt(0).toUpperCase() + sys.slice(1)}:</strong> ${val}</div>`).join('')}
                    </div>
                </div>` : ''}
                ${caseData.humoralData && ((caseData.humoralData.labs && caseData.humoralData.labs.length > 0) || (caseData.humoralData.imaging && caseData.humoralData.imaging.length > 0)) ? `
                <div class="history-card glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;">
                    <h5 style="color: #94a3b8; font-size: 0.85em; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.5px;">Ancillary Studies (Labs/Imaging)</h5>
                    <div style="font-size: 0.9em; color: #e2e8f0; display: flex; flex-direction: column; gap: 8px;">
                        ${caseData.humoralData.labs && caseData.humoralData.labs.length > 0 ? `<div><strong style="color: #f8fafc;">Labs:</strong> ${caseData.humoralData.labs.join(', ')}</div>` : ''}
                        ${caseData.humoralData.imaging && caseData.humoralData.imaging.length > 0 ? `<div><strong style="color: #f8fafc;">Imaging:</strong> ${caseData.humoralData.imaging.join(', ')}</div>` : ''}
                    </div>
                </div>` : ''}
            </div>
        `;
    },

    renderPhysicalExam: function (exam) {
        return `
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${ClinicalIcons.getSvgIcon('hand', 'currentColor', '18')} Inspection</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.inspection}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${ClinicalIcons.getSvgIcon('hand', 'currentColor', '18')} Palpation</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.palpation}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${ClinicalIcons.getSvgIcon('neck', 'currentColor', '18')} Range of Motion</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.rom}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${ClinicalIcons.getSvgIcon('lightning', 'currentColor', '18')} Motor Strength</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.strength}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${ClinicalIcons.getSvgIcon('target', 'currentColor', '18')} Sensation</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.sensation}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px;"><h5 style="margin: 0 0 8px 0; color: #22d3ee; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${ClinicalIcons.getSvgIcon('wrench', 'currentColor', '18')} Reflexes</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.reflexes}</p></div>
            <div class="exam-category glass-card" style="padding: 20px; border-radius: 12px; grid-column: span 2;"><h5 style="margin: 0 0 8px 0; color: #c4b5fd; font-size: 0.9em; display: flex; align-items: center; gap: 6px;">${ClinicalIcons.getSvgIcon('microscope', 'currentColor', '18')} Provocative & Special Tests</h5><p style="margin: 0; color: #e2e8f0; font-size: 0.95em;">${exam.specialTests}</p></div>
        `;
    }
};
