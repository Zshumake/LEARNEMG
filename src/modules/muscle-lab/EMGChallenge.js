import { MuscleDatabase, LesionSites } from '../../data/MuscleDatabase.js';
import { registerAction } from '../../utils/ActionBus.js';
import logger from '../../utils/Logger.js';

export class EMGChallengeSystem {
    constructor() {
        this.currentSettings = {
            difficulty: 'moderate',
            region: 'mixed',
            type: 'localization'
        };
        this.isActive = false;
        this.currentCase = null;
        this.selectedAnswer = null;
        this.score = { correct: 0, total: 0 };
        this.caseNumber = 0;
        this.activeQuestionTypes = {
            root: true,
            plexus: true,
            peripheral: true
        };

        // Data Sources
        this.muscles = MuscleDatabase;
        this.lesionSites = LesionSites;

        // Bind methods
        this.startChallenge = this.startChallenge.bind(this);
        this.generateCase = this.generateCase.bind(this);
        this.selectAnswer = this.selectAnswer.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.nextCase = this.nextCase.bind(this);
        this.backToSettings = this.backToSettings.bind(this);
        this.toggleQuestionType = this.toggleQuestionType.bind(this);

        // Register with ActionBus (uses polling helper because this constructor
        // runs BEFORE Initialization.js defines window._registerAction)
        registerAction('emgChallenge:toggleQuestionType', (el) => {
            const type = el.getAttribute('data-type');
            this.toggleQuestionType(type);
        });
        registerAction('emgChallenge:startChallenge', () => this.startChallenge());
        registerAction('emgChallenge:selectAnswer', (el) => {
            const answer = el.getAttribute('data-answer');
            this.selectAnswer(answer);
        });
        registerAction('emgChallenge:backToSettings', () => this.backToSettings());
        registerAction('emgChallenge:submitAnswer', () => this.submitAnswer());
        registerAction('emgChallenge:nextCase', () => this.nextCase());
    }

    launch() {
        logger.log('EMG Localization Challenge Launched...');

        const emgChallengeContent = `
            <style>
                /* ============ EMG CHALLENGE — CLINICAL WORKSTATION UI ============ */
                .emg-challenge-root {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: #0f172a;
                    max-width: 1080px;
                    margin: 0 auto;
                    padding: 0 20px 40px;
                }

                /* ---- Shared header chrome (clinical workstation bar) ---- */
                .emg-clinical-bar {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    border-radius: 18px;
                    padding: 22px 28px;
                    color: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 28px;
                    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
                    position: relative;
                    overflow: hidden;
                }
                .emg-clinical-bar::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.08) 50%, transparent 100%);
                    pointer-events: none;
                }
                .emg-bar-left { display: flex; align-items: center; gap: 16px; position: relative; z-index: 1; }
                .emg-bar-indicator {
                    width: 10px; height: 10px; border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2), 0 0 14px rgba(34, 197, 94, 0.5);
                    animation: emg-pulse 1.8s ease-in-out infinite;
                }
                @keyframes emg-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.85); }
                }
                .emg-bar-title {
                    font-size: 1.35rem;
                    font-weight: 700;
                    letter-spacing: 0.3px;
                    margin: 0;
                }
                .emg-bar-subtitle {
                    font-size: 0.82rem;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin: 2px 0 0;
                    font-weight: 600;
                }
                .emg-bar-right { display: flex; align-items: center; gap: 14px; position: relative; z-index: 1; }
                .emg-stat-chip {
                    background: rgba(148, 163, 184, 0.12);
                    border: 1px solid rgba(148, 163, 184, 0.25);
                    padding: 8px 14px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    color: #cbd5e1;
                    font-variant-numeric: tabular-nums;
                }
                .emg-stat-chip .emg-stat-value {
                    color: #f8fafc;
                    font-weight: 700;
                    font-size: 0.95rem;
                    margin-left: 6px;
                }
                .emg-back-btn {
                    background: rgba(148, 163, 184, 0.15);
                    border: 1px solid rgba(148, 163, 184, 0.3);
                    color: #e2e8f0;
                    padding: 8px 16px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.2s;
                }
                .emg-back-btn:hover {
                    background: rgba(148, 163, 184, 0.25);
                    border-color: rgba(148, 163, 184, 0.5);
                }

                /* ---- Setup panel ---- */
                .emg-setup-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 18px;
                    padding: 36px;
                    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
                }
                .emg-setup-intro {
                    border-left: 4px solid #0ea5e9;
                    background: #f0f9ff;
                    padding: 18px 22px;
                    border-radius: 0 12px 12px 0;
                    margin-bottom: 30px;
                }
                .emg-setup-intro h4 {
                    margin: 0 0 4px;
                    color: #0c4a6e;
                    font-size: 1.05rem;
                    font-weight: 700;
                }
                .emg-setup-intro p {
                    margin: 0;
                    color: #0369a1;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .emg-section-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.78rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.8px;
                    color: #64748b;
                    margin: 0 0 16px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .emg-section-label .emg-section-count {
                    margin-left: auto;
                    background: #f1f5f9;
                    color: #475569;
                    padding: 2px 10px;
                    border-radius: 20px;
                    font-size: 0.72rem;
                    letter-spacing: 0.5px;
                }

                .emg-toggle-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
                    gap: 14px;
                    margin-bottom: 30px;
                }
                .emg-toggle-card {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 18px 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    position: relative;
                }
                .emg-toggle-card:hover {
                    border-color: #94a3b8;
                    background: #f1f5f9;
                }
                .emg-toggle-card.active {
                    background: white;
                    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
                }
                .emg-toggle-card.active[data-type="root"] { border-color: #14b8a6; }
                .emg-toggle-card.active[data-type="plexus"] { border-color: #f59e0b; }
                .emg-toggle-card.active[data-type="peripheral"] { border-color: #8b5cf6; }

                .emg-toggle-icon {
                    width: 44px; height: 44px;
                    border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    color: white;
                    background: #cbd5e1;
                    transition: all 0.2s;
                }
                .emg-toggle-card.active[data-type="root"] .emg-toggle-icon { background: #14b8a6; }
                .emg-toggle-card.active[data-type="plexus"] .emg-toggle-icon { background: #f59e0b; }
                .emg-toggle-card.active[data-type="peripheral"] .emg-toggle-icon { background: #8b5cf6; }

                .emg-toggle-body { flex: 1; }
                .emg-toggle-title { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 2px; }
                .emg-toggle-desc { font-size: 0.82rem; color: #64748b; margin: 0; line-height: 1.4; }
                .emg-toggle-check {
                    width: 22px; height: 22px;
                    border-radius: 50%;
                    border: 2px solid #cbd5e1;
                    background: white;
                    display: flex; align-items: center; justify-content: center;
                    color: white;
                    flex-shrink: 0;
                    transition: all 0.2s;
                }
                .emg-toggle-card.active .emg-toggle-check {
                    background: #0f172a;
                    border-color: #0f172a;
                }
                .emg-toggle-check svg { opacity: 0; transition: opacity 0.15s; }
                .emg-toggle-card.active .emg-toggle-check svg { opacity: 1; }

                .emg-launch-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 24px;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    border-radius: 14px;
                    margin-top: 10px;
                }
                .emg-launch-label { color: #94a3b8; font-size: 0.88rem; font-weight: 500; }
                .emg-launch-label strong { color: #f8fafc; font-weight: 700; }
                .emg-launch-btn {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    border: none;
                    padding: 14px 32px;
                    border-radius: 10px;
                    font-size: 0.98rem;
                    font-weight: 700;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
                }
                .emg-launch-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5); }

                /* ---- Active challenge panel ---- */
                .emg-case-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px;
                    margin-bottom: 22px;
                }
                .emg-findings-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
                }
                .emg-findings-head {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 20px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }
                .emg-findings-head.abnormal {
                    background: linear-gradient(90deg, #fef2f2 0%, #fee2e2 100%);
                    color: #991b1b;
                    border-bottom: 2px solid #fecaca;
                }
                .emg-findings-head.normal {
                    background: linear-gradient(90deg, #f0fdf4 0%, #dcfce7 100%);
                    color: #166534;
                    border-bottom: 2px solid #bbf7d0;
                }
                .emg-findings-count {
                    margin-left: auto;
                    background: rgba(255, 255, 255, 0.7);
                    padding: 2px 10px;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 700;
                }
                .emg-findings-body {
                    padding: 16px 20px 20px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    min-height: 90px;
                }
                .emg-muscle-chip {
                    padding: 7px 14px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'SF Mono', Menlo, monospace;
                }
                .emg-muscle-chip.abnormal {
                    background: #fef2f2;
                    color: #b91c1c;
                    border: 1px solid #fecaca;
                }
                .emg-muscle-chip.abnormal::before {
                    content: '';
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #dc2626;
                    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
                }
                .emg-muscle-chip.normal {
                    background: #f0fdf4;
                    color: #166534;
                    border: 1px solid #bbf7d0;
                }
                .emg-muscle-chip.normal::before {
                    content: '';
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #16a34a;
                }

                .emg-question-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    overflow: hidden;
                    margin-bottom: 20px;
                    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
                }
                .emg-question-head {
                    background: #0f172a;
                    color: #f1f5f9;
                    padding: 16px 24px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .emg-question-head::before {
                    content: '';
                    width: 6px; height: 22px;
                    background: linear-gradient(180deg, #3b82f6, #06b6d4);
                    border-radius: 3px;
                }
                .emg-question-prompt {
                    padding: 20px 24px 8px;
                    font-size: 1.08rem;
                    font-weight: 600;
                    color: #0f172a;
                }
                .emg-answer-grid {
                    padding: 8px 24px 24px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 10px;
                }
                .emg-answer-btn {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 14px 18px;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    color: #1e293b;
                    font-weight: 600;
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: inherit;
                }
                .emg-answer-btn:hover:not(:disabled) {
                    border-color: #6366f1;
                    background: white;
                    transform: translateY(-1px);
                }
                .emg-answer-btn:disabled { cursor: not-allowed; }
                .emg-answer-btn .emg-answer-letter {
                    width: 28px; height: 28px;
                    border-radius: 8px;
                    background: white;
                    border: 1.5px solid #cbd5e1;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 700;
                    font-size: 0.82rem;
                    color: #64748b;
                    flex-shrink: 0;
                    font-family: 'SF Mono', Menlo, monospace;
                }
                .emg-answer-btn.selected {
                    background: #eef2ff;
                    border-color: #6366f1;
                    color: #4338ca;
                }
                .emg-answer-btn.selected .emg-answer-letter {
                    background: #6366f1;
                    color: white;
                    border-color: #6366f1;
                }
                .emg-answer-btn.correct {
                    background: #dcfce7;
                    border-color: #16a34a;
                    color: #14532d;
                }
                .emg-answer-btn.correct .emg-answer-letter {
                    background: #16a34a;
                    color: white;
                    border-color: #16a34a;
                }
                .emg-answer-btn.wrong {
                    background: #fef2f2;
                    border-color: #dc2626;
                    color: #7f1d1d;
                }
                .emg-answer-btn.wrong .emg-answer-letter {
                    background: #dc2626;
                    color: white;
                    border-color: #dc2626;
                }

                .emg-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                }
                .emg-btn-ghost {
                    background: white;
                    color: #475569;
                    border: 1px solid #cbd5e1;
                    padding: 12px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.15s;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .emg-btn-ghost:hover { background: #f8fafc; border-color: #94a3b8; }
                .emg-btn-primary {
                    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
                    color: white;
                    border: none;
                    padding: 12px 28px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.95rem;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    transition: all 0.2s;
                    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }
                .emg-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45); }
                .emg-btn-primary:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
                .emg-btn-next {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
                }
                .emg-btn-next:hover { box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45); }

                /* ---- Feedback ---- */
                .emg-feedback-card {
                    margin-top: 22px;
                    border-radius: 14px;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                    background: white;
                }
                .emg-feedback-head {
                    padding: 16px 22px;
                    font-size: 1.05rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .emg-feedback-head.correct {
                    background: linear-gradient(90deg, #dcfce7 0%, #bbf7d0 100%);
                    color: #14532d;
                }
                .emg-feedback-head.wrong {
                    background: linear-gradient(90deg, #fee2e2 0%, #fecaca 100%);
                    color: #7f1d1d;
                }
                .emg-feedback-icon {
                    width: 32px; height: 32px;
                    border-radius: 50%;
                    background: white;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                    flex-shrink: 0;
                }
                .emg-feedback-body {
                    padding: 20px 22px;
                    color: #334155;
                    line-height: 1.6;
                    font-size: 0.95rem;
                }
                .emg-feedback-row {
                    display: grid;
                    grid-template-columns: 140px 1fr;
                    gap: 12px;
                    padding: 8px 0;
                    border-bottom: 1px dashed #e2e8f0;
                    align-items: baseline;
                }
                .emg-feedback-row:last-of-type { border-bottom: none; }
                .emg-feedback-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.2px;
                    color: #64748b;
                }
                .emg-feedback-value { color: #0f172a; font-weight: 600; }
                .emg-feedback-explanation {
                    margin-top: 14px;
                    padding: 14px 16px;
                    background: #f8fafc;
                    border-left: 3px solid #6366f1;
                    border-radius: 0 8px 8px 0;
                    font-size: 0.92rem;
                }
                .emg-feedback-explanation .emg-mention-red { color: #b91c1c; font-weight: 700; }
                .emg-feedback-explanation .emg-mention-green { color: #15803d; font-weight: 700; }

                /* ---- Score mini-widget ---- */
                .emg-score-inline {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: #eef2ff;
                    border: 1px solid #c7d2fe;
                    border-radius: 8px;
                    color: #4338ca;
                    font-weight: 700;
                    font-size: 0.85rem;
                    margin-top: 14px;
                    font-variant-numeric: tabular-nums;
                }

                @media (max-width: 720px) {
                    .emg-case-grid { grid-template-columns: 1fr; }
                    .emg-clinical-bar { flex-direction: column; align-items: flex-start; gap: 16px; }
                    .emg-bar-right { width: 100%; flex-wrap: wrap; }
                }
            </style>

            <div class="emg-challenge-root">
                <!-- ================= SETUP PANEL ================= -->
                <div id="emg-challenge-setup" class="challenge-section">
                    <div class="emg-clinical-bar">
                        <div class="emg-bar-left">
                            <span class="emg-bar-indicator"></span>
                            <div>
                                <p class="emg-bar-subtitle">EMG Clinical Workstation</p>
                                <h3 class="emg-bar-title">Localization Challenge — Setup</h3>
                            </div>
                        </div>
                        <div class="emg-bar-right">
                            <button class="emg-back-btn" data-action="backToMuscleMenu">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                Menu
                            </button>
                        </div>
                    </div>

                    <div class="emg-setup-card">
                        <div class="emg-setup-intro">
                            <h4>Diagnostic Localization Drill</h4>
                            <p>Review the pattern of abnormal and normal muscles, then localize the lesion. Select which lesion categories to include in your session below.</p>
                        </div>

                        <h5 class="emg-section-label">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Lesion Categories
                            <span class="emg-section-count">3 available</span>
                        </h5>

                        <div class="emg-toggle-grid">
                            <div class="emg-toggle-card active" data-type="root" data-action="emgChallenge:toggleQuestionType">
                                <div class="emg-toggle-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                </div>
                                <div class="emg-toggle-body">
                                    <h5 class="emg-toggle-title">Nerve Roots</h5>
                                    <p class="emg-toggle-desc">C5–T1 and L2–S1 radiculopathies</p>
                                </div>
                                <div class="emg-toggle-check">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>

                            <div class="emg-toggle-card active" data-type="plexus" data-action="emgChallenge:toggleQuestionType">
                                <div class="emg-toggle-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                                </div>
                                <div class="emg-toggle-body">
                                    <h5 class="emg-toggle-title">Plexus</h5>
                                    <p class="emg-toggle-desc">Trunk and cord-level injuries</p>
                                </div>
                                <div class="emg-toggle-check">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>

                            <div class="emg-toggle-card active" data-type="peripheral" data-action="emgChallenge:toggleQuestionType">
                                <div class="emg-toggle-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>
                                </div>
                                <div class="emg-toggle-body">
                                    <h5 class="emg-toggle-title">Peripheral Nerve</h5>
                                    <p class="emg-toggle-desc">Entrapments and focal neuropathies</p>
                                </div>
                                <div class="emg-toggle-check">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                            </div>
                        </div>

                        <div class="emg-launch-row">
                            <div class="emg-launch-label">
                                Ready to begin?<br>
                                <strong>Cases draw from all selected categories.</strong>
                            </div>
                            <button class="emg-launch-btn" data-action="emgChallenge:startChallenge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                Begin Session
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ================= ACTIVE CHALLENGE PANEL ================= -->
                <div id="emg-challenge-active" class="challenge-section" style="display:none;">
                    <div class="emg-clinical-bar">
                        <div class="emg-bar-left">
                            <span class="emg-bar-indicator"></span>
                            <div>
                                <p class="emg-bar-subtitle">Active Case Review</p>
                                <h3 class="emg-bar-title" id="emg-case-title">Case #1 — Localization</h3>
                            </div>
                        </div>
                        <div class="emg-bar-right">
                            <div class="emg-stat-chip">Accuracy<span class="emg-stat-value" id="emg-stat-accuracy">—</span></div>
                            <div class="emg-stat-chip">Score<span class="emg-stat-value" id="emg-stat-score">0 / 0</span></div>
                        </div>
                    </div>

                    <div class="emg-case-grid">
                        <div class="emg-findings-card">
                            <div class="emg-findings-head abnormal">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                                Abnormal Findings
                                <span class="emg-findings-count" id="emg-abnormal-count">0</span>
                            </div>
                            <div class="emg-findings-body" id="challenge-abnormal-muscles"></div>
                        </div>

                        <div class="emg-findings-card">
                            <div class="emg-findings-head normal">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Normal Findings
                                <span class="emg-findings-count" id="emg-normal-count">0</span>
                            </div>
                            <div class="emg-findings-body" id="challenge-normal-muscles"></div>
                        </div>
                    </div>

                    <div class="emg-question-card">
                        <div class="emg-question-head">Diagnostic Impression</div>
                        <div class="emg-question-prompt" id="challenge-question-text">
                            Where is the most likely location of the lesion?
                        </div>
                        <div class="emg-answer-grid" id="challenge-answer-options"></div>
                    </div>

                    <div class="emg-controls">
                        <button id="challenge-back-btn" class="emg-btn-ghost" data-action="emgChallenge:backToSettings">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            Back to Setup
                        </button>
                        <button id="challenge-submit-btn" class="emg-btn-primary" data-action="emgChallenge:submitAnswer" disabled>
                            Submit Diagnosis
                        </button>
                        <button id="challenge-next-btn" class="emg-btn-primary emg-btn-next" data-action="emgChallenge:nextCase" style="display:none;">
                            Next Case
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>

                    <div id="challenge-feedback" style="display:none;"></div>
                </div>
            </div>
        `;

        if (window.showModal) {
            window.showModal('Clinical Case Challenge', emgChallengeContent, true);
        } else {
            logger.error('showModal is not defined');
        }
    }

    toggleQuestionType(type) {
        this.activeQuestionTypes[type] = !this.activeQuestionTypes[type];
        const toggleElement = document.querySelector(`.emg-toggle-card[data-type="${type}"]`);
        if (toggleElement) {
            toggleElement.classList.toggle('active', this.activeQuestionTypes[type]);
        }
    }

    startChallenge() {
        this.isActive = true;
        this.score = { correct: 0, total: 0 };
        this.caseNumber = 0;
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');
        if (settingsPanel) settingsPanel.style.display = 'none';
        if (activePanel) activePanel.style.display = 'block';
        this.updateScoreboard();
        this.generateCase();
    }

    generateCase() {
        const availableLesions = this.getAvailableLesions();
        if (availableLesions.length === 0) {
            alert('No lesion types selected! Please enable at least one.');
            this.backToSettings();
            return;
        }

        this.caseNumber++;

        const randomIndex = Math.floor(Math.random() * availableLesions.length);
        const correctLesion = availableLesions[randomIndex];
        const lesionData = this.getLesionData(correctLesion);

        const abnormalMuscles = this.selectRandomMuscles(lesionData.muscles, 4);
        const normalMuscles = this.selectNormalMuscles(lesionData.muscles, lesionData.region, 4);
        const answerOptions = this.generateAnswerOptions(correctLesion, lesionData);

        this.currentCase = {
            correctLesion: correctLesion,
            abnormalMuscles: abnormalMuscles,
            normalMuscles: normalMuscles,
            answerOptions: answerOptions,
            region: lesionData.region
        };

        this.selectedAnswer = null;
        this.displayCase();
    }

    getAvailableLesions() {
        const lesions = [];
        const regions = this.currentSettings.region === 'mixed' ? ['UE', 'LE'] :
            this.currentSettings.region === 'upper' ? ['UE'] : ['LE'];

        regions.forEach(region => {
            Object.entries(this.lesionSites[region]).forEach(([name, data]) => {
                if (this.activeQuestionTypes[data.type]) {
                    lesions.push(name);
                }
            });
        });

        return lesions;
    }

    getLesionData(lesionName) {
        if (this.lesionSites.UE[lesionName]) {
            return { ...this.lesionSites.UE[lesionName], region: 'UE' };
        } else if (this.lesionSites.LE[lesionName]) {
            return { ...this.lesionSites.LE[lesionName], region: 'LE' };
        }
        return null;
    }

    selectRandomMuscles(muscleArray, count) {
        const shuffled = [...muscleArray].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, muscleArray.length));
    }

    selectNormalMuscles(abnormalMuscles, region, count) {
        const allMuscles = Object.keys(this.muscles).filter(muscle => {
            return this.muscles[muscle].region === region;
        });
        const normalMuscles = allMuscles.filter(muscle => !abnormalMuscles.includes(muscle));
        return this.selectRandomMuscles(normalMuscles, count);
    }

    generateAnswerOptions(correctLesion, correctLesionData) {
        const options = [correctLesion];
        const region = correctLesionData.region;
        const correctType = correctLesionData.type;
        const sameLesions = Object.keys(this.lesionSites[region]).filter(name => name !== correctLesion);

        const sameTypeLesions = sameLesions.filter(name => this.lesionSites[region][name].type === correctType);
        const shuffledSameType = [...sameTypeLesions].sort(() => Math.random() - 0.5);
        shuffledSameType.slice(0, 3).forEach(lesion => options.push(lesion));

        if (options.length < 4) {
            const differentTypeLesions = sameLesions.filter(name =>
                this.lesionSites[region][name].type !== correctType &&
                !options.includes(name)
            );
            const shuffledDifferent = [...differentTypeLesions].sort(() => Math.random() - 0.5);
            shuffledDifferent.slice(0, 4 - options.length).forEach(lesion => options.push(lesion));
        }
        return options.sort(() => Math.random() - 0.5);
    }

    displayCase() {
        const { abnormalMuscles, normalMuscles, answerOptions } = this.currentCase;

        // Case title
        const caseTitle = document.getElementById('emg-case-title');
        if (caseTitle) caseTitle.textContent = `Case #${this.caseNumber} — Localization`;

        // Abnormal muscles as chips
        const abnormalList = document.getElementById('challenge-abnormal-muscles');
        if (abnormalList) {
            abnormalList.innerHTML = abnormalMuscles
                .map(m => `<span class="emg-muscle-chip abnormal">${m}</span>`)
                .join('');
        }
        const abnormalCount = document.getElementById('emg-abnormal-count');
        if (abnormalCount) abnormalCount.textContent = abnormalMuscles.length;

        // Normal muscles as chips
        const normalList = document.getElementById('challenge-normal-muscles');
        if (normalList) {
            normalList.innerHTML = normalMuscles
                .map(m => `<span class="emg-muscle-chip normal">${m}</span>`)
                .join('');
        }
        const normalCount = document.getElementById('emg-normal-count');
        if (normalCount) normalCount.textContent = normalMuscles.length;

        // Answer buttons with letter badges (A, B, C, D)
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const optionsContainer = document.getElementById('challenge-answer-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = answerOptions.map((option, i) => `
                <button class="emg-answer-btn" data-action="emgChallenge:selectAnswer" data-answer="${option.replace(/"/g, '&quot;')}">
                    <span class="emg-answer-letter">${letters[i] || (i + 1)}</span>
                    <span>${option}</span>
                </button>
            `).join('');
        }

        // Reset button states
        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');
        const feedbackDiv = document.getElementById('challenge-feedback');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.display = 'inline-flex';
        }
        if (nextBtn) nextBtn.style.display = 'none';
        if (feedbackDiv) {
            feedbackDiv.style.display = 'none';
            feedbackDiv.innerHTML = '';
        }
    }

    selectAnswer(lesion) {
        this.selectedAnswer = lesion;
        document.querySelectorAll('.emg-answer-btn').forEach(btn => {
            const answer = btn.getAttribute('data-answer');
            btn.classList.toggle('selected', answer === lesion);
        });
        const submitBtn = document.getElementById('challenge-submit-btn');
        if (submitBtn) submitBtn.disabled = false;
    }

    submitAnswer() {
        if (!this.selectedAnswer) return;

        const correct = this.selectedAnswer === this.currentCase.correctLesion;
        this.score.total++;
        if (correct) this.score.correct++;
        this.updateScoreboard();

        const feedbackDiv = document.getElementById('challenge-feedback');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'block';
            const iconCorrect = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            const iconWrong = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

            const abnormalSpan = this.currentCase.abnormalMuscles.map(m => `<span class="emg-mention-red">${m}</span>`).join(', ');
            const normalSpan = this.currentCase.normalMuscles.map(m => `<span class="emg-mention-green">${m}</span>`).join(', ');
            const accuracyPct = Math.round((this.score.correct / this.score.total) * 100);

            feedbackDiv.innerHTML = `
                <div class="emg-feedback-card">
                    <div class="emg-feedback-head ${correct ? 'correct' : 'wrong'}">
                        <span class="emg-feedback-icon">${correct ? iconCorrect : iconWrong}</span>
                        ${correct ? 'Diagnosis Correct' : 'Diagnosis Incorrect'}
                    </div>
                    <div class="emg-feedback-body">
                        <div class="emg-feedback-row">
                            <span class="emg-feedback-label">Your Answer</span>
                            <span class="emg-feedback-value">${this.selectedAnswer}</span>
                        </div>
                        <div class="emg-feedback-row">
                            <span class="emg-feedback-label">Correct Answer</span>
                            <span class="emg-feedback-value">${this.currentCase.correctLesion}</span>
                        </div>
                        <div class="emg-feedback-explanation">
                            The pattern of abnormality in ${abnormalSpan}, sparing ${normalSpan},
                            localizes to a <strong>${this.currentCase.correctLesion}</strong> lesion.
                        </div>
                        <div class="emg-score-inline">
                            Session Score: ${this.score.correct} / ${this.score.total} (${accuracyPct}%)
                        </div>
                    </div>
                </div>
            `;
        }

        const submitBtn = document.getElementById('challenge-submit-btn');
        const nextBtn = document.getElementById('challenge-next-btn');
        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'inline-flex';

        // Highlight correct / wrong answers
        document.querySelectorAll('.emg-answer-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('selected');
            const answer = btn.getAttribute('data-answer');
            if (answer === this.currentCase.correctLesion) {
                btn.classList.add('correct');
            } else if (answer === this.selectedAnswer) {
                btn.classList.add('wrong');
            }
        });
    }

    updateScoreboard() {
        const scoreEl = document.getElementById('emg-stat-score');
        const accuracyEl = document.getElementById('emg-stat-accuracy');
        if (scoreEl) scoreEl.textContent = `${this.score.correct} / ${this.score.total}`;
        if (accuracyEl) {
            if (this.score.total === 0) {
                accuracyEl.textContent = '—';
            } else {
                accuracyEl.textContent = `${Math.round((this.score.correct / this.score.total) * 100)}%`;
            }
        }
    }

    nextCase() {
        this.generateCase();
    }

    backToSettings() {
        this.isActive = false;
        const settingsPanel = document.getElementById('emg-challenge-setup');
        const activePanel = document.getElementById('emg-challenge-active');
        if (settingsPanel) settingsPanel.style.display = 'block';
        if (activePanel) activePanel.style.display = 'none';
    }
}
