import { ClinicalIcons } from './ClinicalIcons.js';
import { ClinicalShellRenderer } from './ClinicalShellRenderer.js';

export const ClinicalDashboardRenderer = {
    renderDashboard: function (pgyLevel, caseDatabase, selectedDifficulty = 'all') {
        let caseListHtml = '';
        if (caseDatabase) {
            caseListHtml = '<div class="case-list-container" style="margin-top: 50px;">';
            const displayDifficulty = selectedDifficulty === 'difficult' ? 'Expert' : (selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1));
            caseListHtml += `<h3 style="color: #0f172a; text-align: center; margin-bottom: 25px; font-size: 1.5em; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px;">
                ${ClinicalIcons.getSvgIcon('folder', '#3b82f6')} ${selectedDifficulty === 'all' ? 'All Patient' : displayDifficulty} Case Load
            </h3>`;
            caseListHtml += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 10px;">';

            for (const [id, caseData] of Object.entries(caseDatabase)) {
                if (selectedDifficulty !== 'all' && caseData.difficulty !== selectedDifficulty) continue;

                const difficultyColor = caseData.difficulty === 'beginner' ? '#10b981' : (caseData.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444');

                caseListHtml += `
                    <div class="difficulty-card" data-action="startCase" data-id="${id}" 
                         style="width: auto; padding: 20px; border-bottom: 4px solid ${difficultyColor}; text-align: left; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer;">
                        <div style="font-size: 1.1em; font-weight: 700; color: #0f172a; margin-bottom: 8px;">${caseData.title}</div>
                        <div style="font-size: 11px; letter-spacing: 1px; color: #64748b; text-transform: uppercase; display: flex; align-items: center; gap: 5px; font-weight: 600;">
                            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${difficultyColor};"></span>
                            ${caseData.difficulty}
                        </div>
                    </div>
                 `;
            }
            caseListHtml += '</div></div>';
        }

        const activeStyles = {
            beginner: 'background: linear-gradient(135deg, #10b981, #059669); color: white; border-color: transparent;',
            intermediate: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border-color: transparent;',
            difficult: 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border-color: transparent;'
        };

        return `
            <style>
                .difficulty-cards-centered {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                .large-diff-card {
                    width: 300px !important;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    cursor: pointer;
                    color: #0f172a;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .large-diff-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
                }
                .large-diff-card.active {
                    transform: translateY(-5px);
                }
                .large-diff-card.beginner-card:hover, .large-diff-card.beginner-card.active {
                    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
                    border-color: #10b981;
                }
                .large-diff-card.intermediate-card:hover, .large-diff-card.intermediate-card.active {
                    box-shadow: 0 15px 30px rgba(245, 158, 11, 0.4);
                    border-color: #f59e0b;
                }
                .large-diff-card.difficult-card:hover, .large-diff-card.difficult-card.active {
                    box-shadow: 0 15px 30px rgba(239, 68, 68, 0.4);
                    border-color: #ef4444;
                }
            </style>
            <div class="advanced-mesh-bg" style="min-height: 100%; border-radius: 12px; padding: 30px; text-align: center;">
            <div id="case-selection" class="difficulty-selector" style="background: transparent; border: none; box-shadow: none;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h3 class="selector-title" style="color: #f8fafc; font-size: 2em; font-weight: 800; margin-bottom: 10px;">Clinical Correlation Lab</h3>
                    <p class="selector-subtitle" style="color: #94a3b8; font-size: 1.1em;">Master the diagnostic pathway through real-world patient scenarios</p>
                </div>

                <div class="difficulty-cards-centered">
                    <div class="difficulty-card large-diff-card beginner-card glass-card ${selectedDifficulty === 'beginner' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'beginner' ? activeStyles.beginner : ''}"
                         data-action="setFilter" data-difficulty="beginner">
                        <div class="card-icon" style="margin-bottom: 15px; color: ${selectedDifficulty === 'beginner' ? 'white' : '#10b981'};">
                            ${ClinicalIcons.getSvgIcon('beginner', 'currentColor', '64')}
                        </div>
                        <div class="card-title" style="font-size: 1.6em; margin-bottom: 8px; font-weight: 700; color: #f8fafc;">Beginner</div>
                        <div class="card-subtitle" style="font-weight: 600; font-size: 0.8em; letter-spacing: 1px; color: ${selectedDifficulty === 'beginner' ? 'rgba(255,255,255,0.8)' : '#94a3b8'};">FOUNDATIONAL SKILLS</div>
                    </div>
                    <div class="difficulty-card large-diff-card intermediate-card glass-card ${selectedDifficulty === 'intermediate' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'intermediate' ? activeStyles.intermediate : ''}"
                         data-action="setFilter" data-difficulty="intermediate">
                        <div class="card-icon" style="margin-bottom: 15px; color: ${selectedDifficulty === 'intermediate' ? 'white' : '#f59e0b'};">
                            ${ClinicalIcons.getSvgIcon('intermediate', 'currentColor', '64')}
                        </div>
                        <div class="card-title" style="font-size: 1.6em; margin-bottom: 8px; font-weight: 700; color: #f8fafc;">Intermediate</div>
                        <div class="card-subtitle" style="font-weight: 600; font-size: 0.8em; letter-spacing: 1px; color: ${selectedDifficulty === 'intermediate' ? 'rgba(255,255,255,0.8)' : '#94a3b8'};">CLINICAL REASONING</div>
                    </div>
                    <div class="difficulty-card large-diff-card difficult-card glass-card ${selectedDifficulty === 'difficult' ? 'active' : ''}" 
                         style="${selectedDifficulty === 'difficult' ? activeStyles.difficult : ''}"
                         data-action="setFilter" data-difficulty="difficult">
                        <div class="card-icon" style="margin-bottom: 15px; color: ${selectedDifficulty === 'difficult' ? 'white' : '#ef4444'};">
                            ${ClinicalIcons.getSvgIcon('expert', 'currentColor', '64')}
                        </div>
                        <div class="card-title" style="font-size: 1.6em; margin-bottom: 8px; font-weight: 700; color: #f8fafc;">Expert</div>
                        <div class="card-subtitle" style="font-weight: 600; font-size: 0.8em; letter-spacing: 1px; color: ${selectedDifficulty === 'difficult' ? 'rgba(255,255,255,0.8)' : '#94a3b8'};">COMPLEX LOCALIZATION</div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
                     ${selectedDifficulty !== 'all' ? '<button class="dashboard-card-btn glass-btn" style="background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.4);" data-action="setFilter" data-difficulty="all">Show All Cases</button>' : ''}
                </div>

                ${caseListHtml}
            </div>
            </div>
            ${ClinicalShellRenderer.renderInterfaceShell()}
        `;
    }
};
