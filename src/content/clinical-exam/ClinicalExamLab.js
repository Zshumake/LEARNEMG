/**
 * ClinicalExamLab.js
 * Module for teaching residents H&P before EMG/NCS.
 * Two modes: Study Mode (browse diagnoses) and Exam Builder (build from differential).
 */
import { clinicalExamData, DIAGNOSIS_CATEGORIES } from '../../data/clinical-exam/index.js?v=rootfix1';
import { clinicalCasesData } from '../../data/cases/index.js';
import { ClinicalTables } from '../../modules/clinical/components/ClinicalTables.js';

// Featured/starred cases for presentation
const STARRED_CASES = new Set(['parsonage_turner', 'lower_trunk_plexopathy', 'traumatic_brachial_plexus', 'femoral_neuropathy', 'piriformis_sciatic']);

// Maps clinical-exam diagnosis IDs to NCS/EMG case database IDs
const DIAGNOSIS_TO_CASE_MAP = {
    cts: 'hand14', cubital_tunnel: 'hand5', guyons_canal: 'guyon',
    pronator_syndrome: 'pronator', ain_syndrome: 'ain', pin_syndrome: 'pin',
    wartenberg: 'wartenberg', suprascapular: 'suprascapular', axillary: 'axillary',
    long_thoracic: 'long_thoracic', musculocutaneous: 'musculocutaneous',
    fibular_neuropathy: 'footdrop', tarsal_tunnel: 'tarsal',
    deep_peroneal_ankle: 'deep_peroneal_ankle', femoral_neuropathy: 'retroperitoneal_hematoma',
    obturator_neuropathy: 'obturator', meralgia_paresthetica: 'meralgia',
    piriformis_sciatic: 'sciatic_injury', baxters: 'baxters', saphenous: 'saphenous_isolated',
    radial_tunnel: 'radialneuropathy', parsonage_turner: 'parsonage',
    radiation_plexopathy: 'radiationplexopathy', lumbosacral_plexopathy: 'diabeticplexopathy',
    c5_radiculopathy: 'c5radiculopathy', c6_radiculopathy: 'c6radiculopathy',
    c7_radiculopathy: 'c7radiculopathy', l5_radiculopathy: 'l5radiculopathy',
    s1_radiculopathy: 's1radiculopathy',
    diabetic_polyneuropathy: 'polyneuropathy', gbs: 'gbs', cidp: 'cidp',
    cmt: 'cmt', small_fiber: 'small_fiber', mmn: 'mmn',
    als: 'als', myasthenia_gravis: 'mg', lems: 'lems', polymyositis: 'myopathy',
};

// Inline SVG icons (no emojis)
const ICONS = {
    study: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    builder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    coach: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
    history: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    exam: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    key: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    inspection: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    palpation: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 13"/></svg>',
    rom: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    strength: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    sensory: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    reflex: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    specialTest: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>',
    warning: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    flag: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    placeholder: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    wrench: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    // Status icons for reflexes
    checkCircle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>',
    downCircle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v5"/><path d="M9 11l3 3 3-3"/></svg>',
    xCircle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg>',
    upCircle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-5"/><path d="M9 13l3-3 3 3"/></svg>',
};

// --- Region mapping for anatomical diagrams ---
const BODY_REGION = {
    UPPER: 'upper',
    LOWER: 'lower',
    BOTH: 'both',
    NONE: 'none'
};

function getCategoryBodyRegion(category) {
    const cat = (category || '').toLowerCase();
    if (cat.includes('upper extremity') || cat.includes('cervical')) return BODY_REGION.UPPER;
    if (cat.includes('lower extremity') || cat.includes('lumbosacral')) return BODY_REGION.LOWER;
    if (cat.includes('polyneuropathy')) return BODY_REGION.BOTH;
    if (cat.includes('plexopathy')) return BODY_REGION.UPPER; // mostly brachial
    return BODY_REGION.NONE;
}

class ClinicalExamLabModule {
    constructor() {
        this.data = clinicalExamData;
        this.categories = DIAGNOSIS_CATEGORIES;
        this.selectedDiagnosis = null;
        this.currentTab = 'study';
        this.examBuilderSelections = new Set();
    }

    generateContent() {
        return `
            <style>${this.getStyles()}</style>
            <div class="cel-container">
                <div class="cel-tabs">
                    <button id="cel-tab-study" class="cel-tab cel-tab-active" data-action="celSwitchTab" data-tab="study">
                        ${ICONS.study} Study Mode
                    </button>
                    <button id="cel-tab-builder" class="cel-tab" data-action="celSwitchTab" data-tab="builder">
                        ${ICONS.builder} Exam Builder
                    </button>
                    <button id="cel-tab-coach" class="cel-tab" data-action="celSwitchTab" data-tab="coach">
                        ${ICONS.coach} Exam Coach
                    </button>
                </div>
                <div id="cel-study-panel" class="cel-panel">
                    ${this.renderStudyMode()}
                </div>
                <div id="cel-builder-panel" class="cel-panel" style="display:none;">
                    ${this.renderExamBuilder()}
                </div>
                <div id="cel-coach-panel" class="cel-panel" style="display:none;">
                    ${this.renderCoachMode()}
                </div>
            </div>
        `;
    }

    initialize() {
        window._celModule = this;
        this.coachState = null; // { diagnosisId, phase: 'screen'|'localize'|'confirm'|'summary' }

        window._registerAction('celSwitchTab', (el) => this.switchTab(el.dataset.tab));
        window._registerAction('celToggleCategory', (el) => this.toggleCategory(el.dataset.category));
        window._registerAction('celSelectDiagnosis', (el) => this.selectDiagnosis(el.dataset.diagnosisId));
        window._registerAction('celToggleSection', (el) => this.toggleSection(el.dataset.sectionId));
        window._registerAction('celBuildExam', () => this.buildExam());
        window._registerAction('celCopyExam', () => this.copyExam());
        window._registerAction('celToggleBuilderDx', (el) => this.toggleBuilderDx(el.dataset.builderDxId));
        window._registerAction('celSelectCoachDx', (el) => this.selectCoachDiagnosis(el.dataset.diagnosisId));
        window._registerAction('celCoachNext', () => this.advanceCoachPhase());
        window._registerAction('celCoachReveal', (el) => this.revealCoachFinding(parseInt(el.dataset.idx)));

        const firstCat = this.categories[0];
        if (firstCat && firstCat.ids.length > 0) {
            setTimeout(() => this.selectDiagnosis(firstCat.ids[0]), 100);
        }
    }

    // --- Tab Switching ---
    switchTab(tab) {
        this.currentTab = tab;
        ['study', 'builder', 'coach'].forEach(t => {
            const panel = document.getElementById(`cel-${t}-panel`);
            const btn = document.getElementById(`cel-tab-${t}`);
            if (panel) panel.style.display = t === tab ? (t === 'study' || t === 'coach' ? 'flex' : 'block') : 'none';
            if (btn) btn.className = `cel-tab ${t === tab ? 'cel-tab-active' : ''}`;
        });
    }

    // --- STUDY MODE ---
    renderStudyMode() {
        return `
            <div class="cel-sidebar">
                <div class="cel-search-box">
                    <input type="text" id="cel-search" placeholder="Search diagnoses..." oninput="window._celModule.filterSidebar(this.value)">
                </div>
                <div id="cel-category-list" class="cel-category-list">
                    ${this.categories.map(cat => `
                        <div class="cel-category">
                            <div class="cel-category-header" data-action="celToggleCategory" data-category="${cat.name}">
                                <span>${cat.name}</span>
                                <span class="cel-cat-count">${cat.ids.length}</span>
                            </div>
                            <div class="cel-category-items" id="cel-cat-${this.slugify(cat.name)}" style="display:none;">
                                ${cat.ids.map(id => {
                                    const dx = this.data[id];
                                    if (!dx) return '';
                                    const starred = STARRED_CASES.has(id);
                                    return `<div class="cel-dx-item ${dx.isInappropriate ? 'cel-dx-inappropriate' : ''} ${starred ? 'cel-dx-starred' : ''}"
                                                id="cel-dx-${id}"
                                                data-action="celSelectDiagnosis" data-diagnosis-id="${id}">
                                        ${starred ? '<span class="cel-star">&#9733;</span>' : ''}${dx.name}
                                        ${dx.isInappropriate ? '<span class="cel-badge-warn">Non-EMG</span>' : ''}
                                    </div>`;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="cel-main" id="cel-main-content">
                <div class="cel-placeholder">
                    ${ICONS.placeholder}
                    <h3>Select a diagnosis from the sidebar</h3>
                    <p>Browse by category or use the search bar to find a specific diagnosis.</p>
                </div>
            </div>
        `;
    }

    selectDiagnosis(id) {
        this.selectedDiagnosis = id;
        const dx = this.data[id];
        if (!dx) return;
        document.querySelectorAll('.cel-dx-item').forEach(el => el.classList.remove('cel-dx-selected'));
        const item = document.getElementById(`cel-dx-${id}`);
        if (item) {
            item.classList.add('cel-dx-selected');
            const catEl = item.closest('.cel-category-items');
            if (catEl) catEl.style.display = 'block';
        }
        const main = document.getElementById('cel-main-content');
        if (main) {
            main.innerHTML = this.renderDiagnosisDetail(dx);
            main.scrollTop = 0;
        }
    }

    // --- STATUS HELPERS ---
    getStatus(finding) {
        const f = (finding || '').toUpperCase();
        if (f.includes('WEAK') || f.includes('ABSENT') || f.includes('DIMINISHED') || f.includes('DECREASED') || f.includes('HYPERACTIVE')) return 'abnormal';
        if (f.includes('MAY BE') || f.includes('VARIABLE') || f.includes('POSSIBLE')) return 'uncertain';
        return 'normal';
    }

    getReflexIcon(finding) {
        const f = (finding || '').toUpperCase();
        if (f.includes('ABSENT')) return ICONS.xCircle;
        if (f.includes('DIMINISHED')) return ICONS.downCircle;
        if (f.includes('HYPERACTIVE') || f.includes('BRISK')) return ICONS.upCircle;
        return ICONS.checkCircle;
    }

    parseStatPercent(str) {
        if (!str) return null;
        const match = str.match(/(\d+)/);
        return match ? parseInt(match[1]) : null;
    }

    getStatColor(val) {
        if (val === null) return '#94a3b8';
        if (val >= 80) return '#059669';
        if (val >= 60) return '#ea580c';
        return '#dc2626';
    }

    // =========================================
    // DIAGNOSIS DETAIL VIEW (redesigned)
    // =========================================
    renderDiagnosisDetail(dx) {
        const pe = dx.physicalExam;
        const abnormalStrength = (pe.strength || []).filter(s => this.getStatus(s.finding || s.expectedFinding) === 'abnormal').length;
        const totalStrength = (pe.strength || []).length;
        const abnormalSensory = (pe.sensory || []).filter(s => this.getStatus(s.expectedFinding) === 'abnormal').length;
        const totalSensory = (pe.sensory || []).length;
        const abnormalReflexes = (pe.reflexes || []).filter(r => this.getStatus(r.expectedFinding) !== 'normal').length;
        const totalReflexes = (pe.reflexes || []).length;
        const totalTests = (pe.specialTests || []).length;
        const bodyRegion = getCategoryBodyRegion(dx.category);

        return `
            <div class="cel-detail">
                <!-- Hero Header -->
                <div class="cel-hero ${dx.isInappropriate ? 'cel-hero-warn' : ''}">
                    <div class="cel-hero-content">
                        <span class="cel-hero-cat">${dx.category}</span>
                        <h2 class="cel-hero-title">${STARRED_CASES.has(dx.id) ? '<span class="cel-star-hero">&#9733;</span> ' : ''}${dx.name}</h2>
                        <div class="cel-hero-stats">
                            ${totalStrength ? `<span class="cel-stat-chip ${abnormalStrength ? 'cel-chip-abnormal' : 'cel-chip-normal'}">${abnormalStrength}/${totalStrength} muscles abnormal</span>` : ''}
                            ${totalSensory ? `<span class="cel-stat-chip ${abnormalSensory ? 'cel-chip-abnormal' : 'cel-chip-normal'}">${abnormalSensory}/${totalSensory} sensory abnormal</span>` : ''}
                            ${totalReflexes ? `<span class="cel-stat-chip ${abnormalReflexes ? 'cel-chip-abnormal' : 'cel-chip-normal'}">${abnormalReflexes}/${totalReflexes} reflexes abnormal</span>` : ''}
                            ${totalTests ? `<span class="cel-stat-chip">${totalTests} special tests</span>` : ''}
                        </div>
                    </div>
                    ${dx.isInappropriate ? `<div class="cel-hero-warn-banner">${ICONS.warning} EMG/NCS generally NOT indicated -- exam below helps distinguish from neuromuscular pathology.</div>` : ''}
                </div>

                <!-- History (collapsed, at top for context) -->
                <div class="cel-section cel-history-section">
                    <h3 class="cel-section-title" data-action="celToggleSection" data-section-id="history-${dx.id}">
                        ${ICONS.history} Patient History <span class="cel-toggle" id="cel-arrow-history-${dx.id}">+</span>
                    </h3>
                    <div id="cel-section-history-${dx.id}" class="cel-section-body cel-collapsed">
                        ${this.renderHistoryCompact(dx.history)}
                    </div>
                </div>

                <!-- Key Findings -->
                ${dx.keyDistinguishingFindings?.length ? `
                <div class="cel-pearls">
                    <div class="cel-pearls-header">${ICONS.key} Key Distinguishing Findings</div>
                    <div class="cel-pearls-body">
                        ${dx.keyDistinguishingFindings.map(f => `<div class="cel-pearl-item"><span class="cel-pearl-dot"></span>${f}</div>`).join('')}
                    </div>
                </div>` : ''}

                <!-- Anatomical Diagram + Exam Grid -->
                <div class="cel-exam-layout ${bodyRegion !== BODY_REGION.NONE ? 'cel-has-diagram' : ''}">
                    ${bodyRegion !== BODY_REGION.NONE ? `
                    <div class="cel-diagram-panel">
                        ${this.renderAnatomicalDiagram(dx, bodyRegion)}
                    </div>` : ''}

                    <div class="cel-exam-content">
                        ${this.renderStrengthCards(pe.strength)}
                        ${this.renderSensoryCards(pe.sensory)}
                        ${this.renderReflexChips(pe.reflexes)}
                        ${this.renderSpecialTestCards(pe.specialTests, dx.id)}
                        ${this.renderExamList('Inspection', ICONS.inspection, pe.inspection)}
                        ${this.renderExamList('Palpation', ICONS.palpation, pe.palpation)}
                        ${this.renderExamList('Range of Motion', ICONS.rom, pe.rom)}
                    </div>
                </div>

                ${this.renderEDXLink(dx.id)}
            </div>
        `;
    }

    // --- EDX CASE LINKING ---
    renderEDXLink(diagnosisId) {
        const caseId = DIAGNOSIS_TO_CASE_MAP[diagnosisId];
        if (!caseId) return '';
        const caseData = clinicalCasesData[caseId];
        if (!caseData) return '';

        return `
            <div class="cel-edx-section">
                <div class="cel-edx-header" data-action="celToggleSection" data-section-id="edx-${diagnosisId}">
                    <span class="cel-edx-icon">${ICONS.exam}</span>
                    <span>View EDX Study Findings</span>
                    <span class="cel-edx-case-name">${caseData.correctDiagnosis || caseData.title || ''}</span>
                    <span class="cel-toggle" id="cel-arrow-edx-${diagnosisId}">+</span>
                </div>
                <div id="cel-section-edx-${diagnosisId}" class="cel-section-body cel-collapsed">
                    <div class="cel-edx-tables">
                        ${ClinicalTables.generateNCSTable(caseData)}
                        ${ClinicalTables.generateEMGTable(caseData.emgStudies || caseData.emgFindings || [])}
                    </div>
                    ${caseData.teachingPoints?.length ? `
                    <div class="cel-edx-teaching">
                        <strong>EDX Teaching Points</strong>
                        <ul>${caseData.teachingPoints.map(t => `<li>${t}</li>`).join('')}</ul>
                    </div>` : ''}
                </div>
            </div>
        `;
    }

    // --- EXAM SEQUENCE COACH ---
    renderCoachMode() {
        const coachDiagnoses = Object.entries(this.data).filter(([, dx]) => dx.examSequence);
        if (coachDiagnoses.length === 0) {
            return `<div class="cel-coach-empty">No exam sequence data available yet. Check back soon!</div>`;
        }
        // Group by category
        const groups = {};
        coachDiagnoses.forEach(([id, dx]) => {
            const cat = dx.category || 'Other';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push({ id, name: dx.name });
        });
        return `
            <div class="cel-coach-sidebar">
                <h3 class="cel-sidebar-title">Guided Cases</h3>
                ${Object.entries(groups).map(([cat, items]) => `
                    <div class="cel-coach-group-label">${cat}</div>
                    ${items.map(d => `
                        <div class="cel-sidebar-item" data-action="celSelectCoachDx" data-diagnosis-id="${d.id}">${d.name}</div>
                    `).join('')}
                `).join('')}
            </div>
            <div class="cel-coach-main" id="cel-coach-main">
                <div class="cel-coach-placeholder">
                    <div class="cel-coach-placeholder-icon">${ICONS.coach}</div>
                    <h3>Exam Sequence Coach</h3>
                    <p>Learn the clinical reasoning ORDER of the physical exam.</p>
                    <p><strong>Screen</strong> (quick movements) &rarr; <strong>Localize</strong> (targeted tests) &rarr; <strong>Confirm</strong> (special tests)</p>
                    <p>Select a case from the left to begin.</p>
                </div>
            </div>
        `;
    }

    selectCoachDiagnosis(id) {
        this.coachState = { diagnosisId: id, phase: 'screen', revealed: [] };
        // Highlight selected item
        document.querySelectorAll('.cel-coach-sidebar .cel-sidebar-item').forEach(el => {
            el.classList.toggle('cel-sidebar-active', el.dataset.diagnosisId === id);
        });
        this.renderCoachPhase();
    }

    advanceCoachPhase() {
        if (!this.coachState) return;
        const phases = ['screen', 'localize', 'confirm', 'summary'];
        const idx = phases.indexOf(this.coachState.phase);
        if (idx < phases.length - 1) {
            this.coachState.phase = phases[idx + 1];
            this.coachState.revealed = [];
            this.renderCoachPhase();
        }
    }

    revealCoachFinding(idx) {
        const el = document.querySelector(`.cel-coach-finding[data-idx="${idx}"]`);
        if (el) {
            el.classList.remove('cel-coach-hidden');
            el.classList.add('cel-coach-revealed');
        }
        if (this.coachState) this.coachState.revealed.push(idx);
    }

    renderCoachPhase() {
        const main = document.getElementById('cel-coach-main');
        if (!main || !this.coachState) return;

        const dx = this.data[this.coachState.diagnosisId];
        if (!dx || !dx.examSequence) return;

        const { phase } = this.coachState;
        const phases = ['screen', 'localize', 'confirm'];
        const phaseLabels = ['Screen', 'Localize', 'Confirm'];

        if (phase === 'summary') {
            main.innerHTML = `
                <div class="cel-coach-summary">
                    <div class="cel-coach-complete">Clinical reasoning complete!</div>
                    <h3>${dx.name}</h3>
                    ${dx.keyDistinguishingFindings?.length ? `
                    <div class="cel-pearls">
                        ${dx.keyDistinguishingFindings.map(f => `<div class="cel-pearl-item"><span class="cel-pearl-dot"></span> ${f}</div>`).join('')}
                    </div>` : ''}
                    ${this.renderEDXLink(this.coachState.diagnosisId)}
                </div>
            `;
            return;
        }

        const phaseData = dx.examSequence[phase];
        if (!phaseData) return;
        const pe = dx.physicalExam;
        const currentIdx = phases.indexOf(phase);

        // Look up actual findings for each test
        const findings = (phaseData.tests || []).map(t => {
            let match = null;
            if (t.type === 'strength') match = (pe.strength || []).find(s => (s.movement || s.muscle) === t.key);
            else if (t.type === 'sensory') match = (pe.sensory || []).find(s => s.area === t.key);
            else if (t.type === 'reflex') match = (pe.reflexes || []).find(r => r.reflex === t.key);
            else if (t.type === 'specialTest') match = (pe.specialTests || []).find(s => s.name === t.key);
            return { ...t, match };
        });

        main.innerHTML = `
            <div class="cel-coach-content">
                <div class="cel-coach-progress">
                    ${phases.map((p, i) => `
                        <div class="cel-cp-step ${i === currentIdx ? 'cel-cp-active' : i < currentIdx ? 'cel-cp-done' : ''}">
                            <div class="cel-cp-circle">${i < currentIdx ? '&#10003;' : i + 1}</div>
                            <span class="cel-cp-label">${phaseLabels[i]}</span>
                        </div>
                        ${i < phases.length - 1 ? '<div class="cel-cp-line"></div>' : ''}
                    `).join('')}
                </div>

                <div class="cel-coach-prompt">
                    <div class="cel-coach-phase-label">${phaseLabels[currentIdx]}</div>
                    <p>${phaseData.prompt}</p>
                </div>

                <div class="cel-coach-findings">
                    ${findings.map((f, i) => {
                        const m = f.match;
                        if (!m) return `<div class="cel-coach-finding cel-coach-hidden" data-idx="${i}" data-action="celCoachReveal" data-idx="${i}"><div class="cel-cf-type">${f.type}</div><div class="cel-cf-key">${f.key}</div><div class="cel-cf-result">No data</div></div>`;

                        let result = '', status = 'normal';
                        if (f.type === 'strength') {
                            result = `${m.grade} - ${m.finding || m.expectedFinding}`;
                            status = this.getStatus(m.finding || m.expectedFinding);
                        } else if (f.type === 'sensory') {
                            result = m.expectedFinding;
                            status = this.getStatus(m.expectedFinding);
                        } else if (f.type === 'reflex') {
                            result = m.expectedFinding;
                            status = this.getStatus(m.expectedFinding);
                        } else if (f.type === 'specialTest') {
                            result = m.positiveFinding || m.expectedFinding || 'Positive';
                            status = 'abnormal';
                        }

                        return `
                        <div class="cel-coach-finding cel-coach-hidden cel-finding-${status}" data-idx="${i}" data-action="celCoachReveal">
                            <div class="cel-cf-type">${f.type}</div>
                            <div class="cel-cf-key">${f.key}</div>
                            <div class="cel-cf-result">${result}</div>
                            ${m.note ? `<div class="cel-cf-note">${m.note}</div>` : ''}
                        </div>`;
                    }).join('')}
                </div>

                <div class="cel-coach-reasoning" data-action="celToggleSection" data-section-id="coach-reasoning">
                    <strong>Clinical Reasoning <span class="cel-toggle" id="cel-arrow-coach-reasoning">+</span></strong>
                </div>
                <div id="cel-section-coach-reasoning" class="cel-section-body cel-collapsed">
                    <div class="cel-coach-reasoning-text">${phaseData.reasoning}</div>
                </div>

                <button class="cel-coach-next-btn" data-action="celCoachNext">
                    ${currentIdx < phases.length - 1 ? `Next: ${phaseLabels[currentIdx + 1]} &rarr;` : 'View Summary &rarr;'}
                </button>
            </div>
        `;
    }

    // --- STRENGTH CARD GRID ---
    renderStrengthCards(strength) {
        if (!strength || strength.length === 0) return '';
        const abnormal = strength.filter(s => this.getStatus(s.finding || s.expectedFinding) === 'abnormal').length;
        const pct = Math.round((abnormal / strength.length) * 100);
        return `
            <div class="cel-card-section">
                <div class="cel-card-section-header">
                    ${ICONS.strength} <span>Manual Muscle Testing</span>
                    <span class="cel-summary-text">${abnormal}/${strength.length} abnormal</span>
                </div>
                <div class="cel-summary-bar"><div class="cel-summary-fill cel-fill-abnormal" style="width:${pct}%"></div></div>
                <div class="cel-muscle-grid">
                    ${strength.map(s => {
                        const status = this.getStatus(s.finding || s.expectedFinding);
                        return `
                        <div class="cel-muscle-card cel-finding-${status}" >
                            <div class="cel-mc-content">
                                <div class="cel-mc-top">
                                    <span class="cel-mc-name">${s.movement || s.muscle}</span>
                                    <span class="cel-mrc-badge cel-mrc-${status}">${s.grade || s.mrcGrade}</span>
                                </div>
                                ${s.note ? `<div class="cel-mc-details"><span class="cel-mc-note">${s.note}</span></div>` : ''}
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // --- SENSORY CARD GRID ---
    renderSensoryCards(sensory) {
        if (!sensory || sensory.length === 0) return '';
        return `
            <div class="cel-card-section">
                <div class="cel-card-section-header">
                    ${ICONS.sensory} <span>Sensory Examination</span>
                </div>
                <div class="cel-sensory-grid">
                    ${sensory.map(s => {
                        const status = this.getStatus(s.expectedFinding);
                        return `
                        <div class="cel-sensory-card cel-finding-${status}">
                            <div class="cel-sc-area">${s.area}</div>
                            <div class="cel-sc-modality">${s.modality}</div>
                            <div class="cel-sc-finding">${s.expectedFinding}</div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // --- REFLEX CHIPS ---
    renderReflexChips(reflexes) {
        if (!reflexes || reflexes.length === 0) return '';
        return `
            <div class="cel-card-section">
                <div class="cel-card-section-header">
                    ${ICONS.reflex} <span>Reflexes</span>
                </div>
                <div class="cel-reflex-row">
                    ${reflexes.map(r => {
                        const status = this.getStatus(r.expectedFinding);
                        return `
                        <div class="cel-reflex-chip cel-finding-${status}">
                            ${this.getReflexIcon(r.expectedFinding)}
                            <span class="cel-rc-name">${r.reflex}</span>
                            <span class="cel-rc-finding">${r.expectedFinding}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // --- SPECIAL TEST CARDS ---
    renderSpecialTestCards(tests, dxId) {
        if (!tests || tests.length === 0) return '';
        return `
            <div class="cel-card-section">
                <div class="cel-card-section-header">
                    ${ICONS.specialTest} <span>Special Tests</span>
                    <span class="cel-summary-text">${tests.length} tests</span>
                </div>
                <div class="cel-tests-grid">
                    ${tests.map((t, i) => {
                        const sensVal = this.parseStatPercent(t.sensitivity);
                        const specVal = this.parseStatPercent(t.specificity);
                        const testId = `test-${dxId}-${i}`;
                        return `
                        <div class="cel-test-card" data-action="celToggleSection" data-section-id="${testId}">
                            <div class="cel-tc-header">
                                <span class="cel-tc-name">${t.name}</span>
                                <span class="cel-toggle cel-tc-toggle" id="cel-arrow-${testId}">+</span>
                            </div>
                            ${t.sensitivity || t.specificity ? `
                            <div class="cel-tc-stats">
                                ${t.sensitivity ? `
                                <div class="cel-stat-meter">
                                    <span class="cel-stat-label">Sens</span>
                                    <div class="cel-stat-bar"><div class="cel-stat-fill" style="width:${sensVal || 50}%;background:${this.getStatColor(sensVal)}"></div></div>
                                    <span class="cel-stat-value">${t.sensitivity}</span>
                                </div>` : ''}
                                ${t.specificity ? `
                                <div class="cel-stat-meter">
                                    <span class="cel-stat-label">Spec</span>
                                    <div class="cel-stat-bar"><div class="cel-stat-fill" style="width:${specVal || 50}%;background:${this.getStatColor(specVal)}"></div></div>
                                    <span class="cel-stat-value">${t.specificity}</span>
                                </div>` : ''}
                            </div>` : ''}
                            <div id="cel-section-${testId}" class="cel-tc-body cel-collapsed">
                                <div class="cel-tc-technique"><strong>Technique:</strong> ${t.technique}</div>
                                <div class="cel-tc-positive"><strong>Positive:</strong> ${t.positiveFinding}</div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // --- EXAM LIST (inspection, palpation, ROM) ---
    renderExamList(title, icon, items) {
        if (!items || items.length === 0) return '';
        return `
            <div class="cel-card-section cel-list-section">
                <div class="cel-card-section-header">
                    ${icon} <span>${title}</span>
                    <span class="cel-summary-text">${items.length} findings</span>
                </div>
                <div class="cel-exam-list">
                    ${items.map(item => `<div class="cel-exam-list-item">${item}</div>`).join('')}
                </div>
            </div>
        `;
    }

    // --- COMPACT HISTORY ---
    renderHistoryCompact(history) {
        if (!history) return '<div class="cel-history-compact"><em>No history data available.</em></div>';
        return `
            <div class="cel-history-compact">
                ${history.demographics ? `<div class="cel-hx-demo">${history.demographics}</div>` : ''}
                ${history.chiefComplaint ? `<div class="cel-hx-cc">"${history.chiefComplaint}"</div>` : ''}
                ${history.hpiKeyFeatures?.length ? `<div class="cel-hpi-grid">
                    ${history.hpiKeyFeatures.map(f => `<span class="cel-hpi-tag">${f}</span>`).join('')}
                </div>` : ''}
                ${history.associatedSymptoms?.length ? `
                <div class="cel-hx-row"><strong>Associated:</strong> ${history.associatedSymptoms.join('; ')}</div>` : ''}
                ${history.redFlags?.length ? `
                <div class="cel-hx-redflags">
                    ${history.redFlags.map(f => `<span class="cel-rf-item">${f}</span>`).join('')}
                </div>` : ''}
                ${history.commonMisdiagnoses?.length ? `
                <div class="cel-hx-row"><strong>Commonly confused with:</strong>
                    ${history.commonMisdiagnoses.map(m => `<span class="cel-misdiag-pill">${m}</span>`).join('')}
                </div>` : ''}
            </div>
        `;
    }

    // --- ANATOMICAL DIAGRAM ---
    renderAnatomicalDiagram(dx, region) {
        const pe = dx.physicalExam;
        const abnormalMuscles = (pe.strength || []).filter(s => this.getStatus(s.finding || s.expectedFinding) === 'abnormal').map(s => s.movement || s.muscle);
        const abnormalSensory = (pe.sensory || []).filter(s => this.getStatus(s.expectedFinding) === 'abnormal').map(s => s.area);
        // Only highlight the specific affected root for radiculopathies using explicit affectedRoot field
        const abnormalRoots = dx.affectedRoot ? [dx.affectedRoot] : [];

        if (region === BODY_REGION.UPPER || region === BODY_REGION.BOTH) {
            return this.renderUpperExtremitySVG(abnormalMuscles, abnormalSensory, abnormalRoots);
        }
        if (region === BODY_REGION.LOWER) {
            return this.renderLowerExtremitySVG(abnormalMuscles, abnormalSensory, abnormalRoots);
        }
        return '';
    }

    renderUpperExtremitySVG(muscles, sensory, roots) {
        // Simplified arm outline with labeled regions
        const regions = [
            { id: 'shoulder', label: 'Shoulder', y: 30, keywords: ['Deltoid', 'Supraspinatus', 'Infraspinatus', 'shoulder'] },
            { id: 'upper-arm', label: 'Upper Arm', y: 80, keywords: ['Biceps', 'Triceps', 'Brachialis', 'upper arm', 'arm'] },
            { id: 'forearm', label: 'Forearm', y: 140, keywords: ['Pronator', 'Supinator', 'Wrist', 'FCR', 'ECR', 'FDP', 'FDS', 'EDC', 'forearm', 'Brachioradialis'] },
            { id: 'hand-radial', label: 'Hand (Radial)', y: 200, keywords: ['APB', 'Abductor Pollicis', 'Opponens', 'thumb', 'index', 'middle', 'thenar', 'Median'] },
            { id: 'hand-ulnar', label: 'Hand (Ulnar)', y: 250, keywords: ['FDI', 'First Dorsal', 'ADM', 'Abductor Digiti', 'hypothenar', 'ring', 'small', 'little', 'Ulnar', 'inteross'] },
        ];

        return this.renderRegionDiagram(regions, muscles, sensory, roots, 'Upper Extremity');
    }

    renderLowerExtremitySVG(muscles, sensory, roots) {
        const regions = [
            { id: 'hip', label: 'Hip/Thigh', y: 30, keywords: ['Iliopsoas', 'Quadriceps', 'Hip', 'Thigh', 'Adductor', 'Hamstring', 'Gluteus', 'hip', 'thigh'] },
            { id: 'knee', label: 'Knee', y: 90, keywords: ['Quadriceps', 'knee', 'Patellar'] },
            { id: 'anterior-leg', label: 'Anterior Leg', y: 140, keywords: ['Tibialis Anterior', 'Peroneus', 'Fibularis', 'EHL', 'EDL', 'anterior leg', 'dorsiflexion'] },
            { id: 'posterior-leg', label: 'Posterior Leg', y: 180, keywords: ['Gastrocnemius', 'Soleus', 'Tibialis Posterior', 'calf', 'plantar flexion', 'posterior leg'] },
            { id: 'foot', label: 'Foot', y: 230, keywords: ['EDB', 'AH', 'Abductor Hallucis', 'foot', 'toe', 'plantar', 'dorsal foot'] },
        ];

        return this.renderRegionDiagram(regions, muscles, sensory, roots, 'Lower Extremity');
    }

    renderRegionDiagram(regions, muscles, sensory, roots, title) {
        const matchesAny = (keywords, items) => {
            return items.some(item => keywords.some(kw => item.toLowerCase().includes(kw.toLowerCase())));
        };

        const svgRegions = regions.map(r => {
            const muscleMatch = matchesAny(r.keywords, muscles);
            const sensoryMatch = matchesAny(r.keywords, sensory);
            const isAbnormal = muscleMatch || sensoryMatch;
            const fill = isAbnormal ? '#fecaca' : '#e2e8f0';
            const stroke = isAbnormal ? '#dc2626' : '#94a3b8';
            const textColor = isAbnormal ? '#991b1b' : '#475569';

            return `
                <g>
                    <rect x="10" y="${r.y}" width="160" height="36" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
                    <text x="90" y="${r.y + 15}" text-anchor="middle" fill="${textColor}" font-size="11" font-weight="600">${r.label}</text>
                    ${isAbnormal ? `<text x="90" y="${r.y + 28}" text-anchor="middle" fill="${stroke}" font-size="8" font-weight="500">ABNORMAL</text>` :
                    `<text x="90" y="${r.y + 28}" text-anchor="middle" fill="${textColor}" font-size="8">Normal</text>`}
                </g>`;
        }).join('');

        // Dermatome strip on the right
        const rootLevels = title === 'Upper Extremity'
            ? ['C4', 'C5', 'C6', 'C7', 'C8', 'T1']
            : ['L2', 'L3', 'L4', 'L5', 'S1', 'S2'];

        const dermStrip = rootLevels.map((root, i) => {
            const isAbnormal = roots.includes(root);
            const fill = isAbnormal ? '#fecaca' : '#f1f5f9';
            const stroke = isAbnormal ? '#dc2626' : '#cbd5e1';
            const textColor = isAbnormal ? '#991b1b' : '#64748b';
            const y = 20 + i * 40;
            return `
                <rect x="190" y="${y}" width="40" height="32" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1"/>
                <text x="210" y="${y + 20}" text-anchor="middle" fill="${textColor}" font-size="11" font-weight="${isAbnormal ? '700' : '400'}">${root}</text>`;
        }).join('');

        const height = Math.max(regions[regions.length - 1].y + 50, rootLevels.length * 40 + 30);

        return `
            <div class="cel-diagram-title">${title}</div>
            <svg viewBox="0 0 240 ${height}" width="100%" style="max-width:240px;">
                <text x="90" y="14" text-anchor="middle" fill="#64748b" font-size="9" font-weight="600">REGIONS</text>
                <text x="210" y="14" text-anchor="middle" fill="#64748b" font-size="9" font-weight="600">ROOTS</text>
                ${svgRegions}
                ${dermStrip}
            </svg>
            <div class="cel-diagram-legend">
                <span class="cel-legend-item"><span class="cel-legend-dot cel-legend-abnormal"></span>Abnormal</span>
                <span class="cel-legend-item"><span class="cel-legend-dot cel-legend-normal"></span>Normal</span>
            </div>
        `;
    }

    // --- EXAM BUILDER (unchanged) ---
    renderExamBuilder() {
        return `
            <div class="cel-builder">
                <div class="cel-builder-header">
                    <h3>Build Your Exam from a Differential</h3>
                    <p>Select all diagnoses you are considering for your patient. The system will generate a comprehensive, de-duplicated physical exam to rule in or out each diagnosis.</p>
                </div>
                <div class="cel-builder-body">
                    <div class="cel-builder-left">
                        <div class="cel-search-box">
                            <input type="text" id="cel-builder-search" placeholder="Search diagnoses..." oninput="window._celModule.filterBuilder(this.value)">
                        </div>
                        <div id="cel-builder-list" class="cel-builder-list">
                            ${this.categories.map(cat => `
                                <div class="cel-builder-cat">
                                    <div class="cel-builder-cat-header">${cat.name}</div>
                                    ${cat.ids.map(id => {
                                        const dx = this.data[id];
                                        if (!dx) return '';
                                        return `<label class="cel-builder-item" data-dx-name="${dx.name.toLowerCase()}" data-dx-id="${id}">
                                            <input type="checkbox" data-action="celToggleBuilderDx" data-builder-dx-id="${id}" ${this.examBuilderSelections.has(id) ? 'checked' : ''}>
                                            <span>${dx.name}</span>
                                            ${dx.isInappropriate ? '<span class="cel-badge-warn-sm">Non-EMG</span>' : ''}
                                        </label>`;
                                    }).join('')}
                                </div>
                            `).join('')}
                        </div>
                        <button class="cel-build-btn" data-action="celBuildExam">
                            Build My Exam (<span id="cel-build-count">${this.examBuilderSelections.size}</span> selected)
                        </button>
                    </div>
                    <div class="cel-builder-right" id="cel-builder-output">
                        <div class="cel-placeholder">
                            ${ICONS.wrench}
                            <h3>Select diagnoses, then click "Build My Exam"</h3>
                            <p>Your custom exam will appear here, organized by exam component.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    toggleBuilderDx(id) {
        if (this.examBuilderSelections.has(id)) this.examBuilderSelections.delete(id);
        else this.examBuilderSelections.add(id);
        const countEl = document.getElementById('cel-build-count');
        if (countEl) countEl.textContent = this.examBuilderSelections.size;
    }

    buildExam() {
        if (this.examBuilderSelections.size === 0) {
            const output = document.getElementById('cel-builder-output');
            if (output) output.innerHTML = '<div class="cel-placeholder"><h3>No diagnoses selected</h3><p>Check at least one diagnosis from the list to build an exam.</p></div>';
            return;
        }
        const allStrength = new Map(), allSensory = new Map(), allReflexes = new Map();
        const allSpecialTests = new Map(), allInspection = new Map(), allPalpation = new Map(), allRom = new Map();

        for (const id of this.examBuilderSelections) {
            const dx = this.data[id];
            if (!dx) continue;
            const pe = dx.physicalExam;
            (pe.inspection || []).forEach(item => { const key = item.substring(0, 60); if (!allInspection.has(key)) allInspection.set(key, { text: item }); });
            (pe.palpation || []).forEach(item => { const key = item.substring(0, 60); if (!allPalpation.has(key)) allPalpation.set(key, { text: item }); });
            (pe.rom || []).forEach(item => { const key = item.substring(0, 60); if (!allRom.has(key)) allRom.set(key, { text: item }); });
            (pe.strength || []).forEach(s => { const key = s.movement || s.muscle; if (!allStrength.has(key)) allStrength.set(key, s); });
            (pe.sensory || []).forEach(s => { const key = s.area.substring(0, 50); if (!allSensory.has(key)) allSensory.set(key, s); });
            (pe.reflexes || []).forEach(r => { if (!allReflexes.has(r.reflex)) allReflexes.set(r.reflex, r); });
            (pe.specialTests || []).forEach(t => { if (!allSpecialTests.has(t.name)) allSpecialTests.set(t.name, t); });
        }

        const selectedNames = [...this.examBuilderSelections].map(id => this.data[id]?.name).filter(Boolean);
        const totalExams = allStrength.size + allSensory.size + allReflexes.size + allSpecialTests.size + allInspection.size + allPalpation.size + allRom.size;
        const output = document.getElementById('cel-builder-output');
        if (output) {
            output.innerHTML = `
                <div class="cel-built-exam">
                    <div class="cel-built-hero">
                        <div class="cel-built-hero-content">
                            <h3>Your Exam Checklist</h3>
                            <p>${selectedNames.length} diagnoses in differential</p>
                            <div class="cel-hero-stats">
                                <span class="cel-stat-chip">${allStrength.size} muscles</span>
                                <span class="cel-stat-chip">${allSensory.size} sensory areas</span>
                                <span class="cel-stat-chip">${allReflexes.size} reflexes</span>
                                <span class="cel-stat-chip">${allSpecialTests.size} special tests</span>
                            </div>
                        </div>
                        <button class="cel-copy-btn-hero" data-action="celCopyExam">${ICONS.copy} Copy</button>
                    </div>
                    <div class="cel-built-diff">
                        <span class="cel-built-diff-label">Differential:</span>
                        ${selectedNames.map(n => `<span class="cel-dx-tag">${n}</span>`).join('')}
                    </div>
                    ${this.renderBuiltChecklist('Manual Muscle Testing', ICONS.strength, allStrength, 'strength')}
                    ${this.renderBuiltChecklist('Sensory Examination', ICONS.sensory, allSensory, 'sensory')}
                    ${this.renderBuiltChecklist('Reflexes', ICONS.reflex, allReflexes, 'reflex')}
                    ${this.renderBuiltTestChecklist(allSpecialTests)}
                    ${this.renderBuiltSimpleList('Inspection', ICONS.inspection, allInspection)}
                    ${this.renderBuiltSimpleList('Palpation', ICONS.palpation, allPalpation)}
                    ${this.renderBuiltSimpleList('Range of Motion', ICONS.rom, allRom)}
                </div>
            `;
        }
    }

    renderBuiltChecklist(title, icon, map, type) {
        if (map.size === 0) return '';
        const items = [...map.values()];
        return `
            <div class="cel-card-section">
                <div class="cel-card-section-header">${icon} <span>${title}</span><span class="cel-summary-text">${items.length} to test</span></div>
                <div class="cel-checklist-grid">
                    ${items.map(item => {
                        if (type === 'strength') {
                            return `<div class="cel-check-card"><div class="cel-check-top"><span class="cel-check-name">${item.muscle}</span><span class="cel-check-meta">${item.root}</span></div><div class="cel-check-sub">${item.nerve} -- ${item.action}</div></div>`;
                        } else if (type === 'sensory') {
                            return `<div class="cel-check-card"><div class="cel-check-top"><span class="cel-check-name">${item.area}</span></div><div class="cel-check-sub">${item.modality}</div></div>`;
                        } else {
                            return `<div class="cel-check-card"><div class="cel-check-name">${item.reflex}</div></div>`;
                        }
                    }).join('')}
                </div>
            </div>`;
    }

    renderBuiltTestChecklist(map) {
        if (map.size === 0) return '';
        const items = [...map.values()];
        let counter = 0;
        return `
            <div class="cel-card-section">
                <div class="cel-card-section-header">${ICONS.specialTest} <span>Special Tests</span><span class="cel-summary-text">${items.length} to perform</span></div>
                <div class="cel-tests-grid">
                    ${items.map(t => {
                        const id = `built-test-${counter++}`;
                        const sensVal = this.parseStatPercent(t.sensitivity);
                        const specVal = this.parseStatPercent(t.specificity);
                        return `
                        <div class="cel-test-card" data-action="celToggleSection" data-section-id="${id}">
                            <div class="cel-tc-header">
                                <span class="cel-tc-name">${t.name}</span>
                                <span class="cel-toggle cel-tc-toggle" id="cel-arrow-${id}">+</span>
                            </div>
                            ${t.sensitivity || t.specificity ? `
                            <div class="cel-tc-stats">
                                ${t.sensitivity ? `<div class="cel-stat-meter"><span class="cel-stat-label">Sens</span><div class="cel-stat-bar"><div class="cel-stat-fill" style="width:${sensVal || 50}%;background:${this.getStatColor(sensVal)}"></div></div><span class="cel-stat-value">${t.sensitivity}</span></div>` : ''}
                                ${t.specificity ? `<div class="cel-stat-meter"><span class="cel-stat-label">Spec</span><div class="cel-stat-bar"><div class="cel-stat-fill" style="width:${specVal || 50}%;background:${this.getStatColor(specVal)}"></div></div><span class="cel-stat-value">${t.specificity}</span></div>` : ''}
                            </div>` : ''}
                            <div id="cel-section-${id}" class="cel-tc-body cel-collapsed">
                                <div class="cel-tc-technique"><strong>How to perform:</strong> ${t.technique}</div>
                                <div class="cel-tc-positive"><strong>Positive finding:</strong> ${t.positiveFinding}</div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>`;
    }

    renderBuiltSimpleList(title, icon, map) {
        if (map.size === 0) return '';
        return `
            <div class="cel-card-section cel-list-section">
                <div class="cel-card-section-header">${icon} <span>${title}</span><span class="cel-summary-text">${map.size} findings</span></div>
                <div class="cel-exam-list">${[...map.values()].map(item => `<div class="cel-exam-list-item">${item.text}</div>`).join('')}</div>
            </div>`;
    }

    copyExam() {
        const el = document.querySelector('.cel-built-exam');
        if (!el) return;
        navigator.clipboard.writeText(el.innerText).then(() => {
            const btn = document.querySelector('.cel-copy-btn');
            if (btn) { const orig = btn.innerHTML; btn.textContent = 'Copied!'; setTimeout(() => btn.innerHTML = orig, 2000); }
        }).catch(() => alert('Copy failed. Please select and copy manually.'));
    }

    // --- Helpers ---
    toggleCategory(name) {
        const el = document.getElementById(`cel-cat-${this.slugify(name)}`);
        if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }

    toggleSection(id) {
        const el = document.getElementById(`cel-section-${id}`);
        const arrow = document.getElementById(`cel-arrow-${id}`);
        if (el) {
            const isHidden = el.classList.contains('cel-collapsed');
            el.classList.toggle('cel-collapsed');
            if (arrow) arrow.textContent = isHidden ? '\u2212' : '+';
        }
    }

    filterSidebar(query) {
        const q = query.toLowerCase();
        document.querySelectorAll('.cel-dx-item').forEach(el => {
            el.style.display = el.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
        if (q.length > 0) document.querySelectorAll('.cel-category-items').forEach(el => el.style.display = 'block');
    }

    filterBuilder(query) {
        const q = query.toLowerCase();
        document.querySelectorAll('.cel-builder-item').forEach(el => {
            el.style.display = el.getAttribute('data-dx-name').includes(q) ? '' : 'none';
        });
    }

    slugify(str) {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    }

    // --- Styles ---
    getStyles() {
        return `
            .cel-collapsed { display: none !important; }
            .cel-container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; --cel-normal: #059669; --cel-normal-bg: #f0fdf4; --cel-normal-border: #bbf7d0; --cel-abnormal: #dc2626; --cel-abnormal-bg: #fef2f2; --cel-abnormal-border: #fecaca; --cel-uncertain: #ea580c; --cel-uncertain-bg: #fff7ed; --cel-uncertain-border: #fed7aa; }
            .cel-tabs { display: flex; gap: 8px; margin-bottom: 20px; background: #f1f5f9; padding: 6px; border-radius: 12px; }
            .cel-tab { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 1.05em; font-weight: 600; cursor: pointer; background: transparent; color: #64748b; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
            .cel-tab svg { vertical-align: middle; }
            .cel-tab-active { background: white; color: #0d9488; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
            .cel-tab:hover:not(.cel-tab-active) { background: rgba(255,255,255,0.5); }

            /* Study Mode Layout */
            #cel-study-panel { display: flex; gap: 20px; min-height: 600px; }
            .cel-sidebar { width: 280px; flex-shrink: 0; background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow-y: auto; max-height: 700px; }
            .cel-main { flex: 1; min-width: 0; overflow-y: auto; max-height: 700px; padding-right: 4px; }
            .cel-search-box { padding: 12px; border-bottom: 1px solid #e2e8f0; }
            .cel-search-box input { width: 100%; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9em; box-sizing: border-box; }
            .cel-search-box input:focus { outline: none; border-color: #0d9488; box-shadow: 0 0 0 2px rgba(13,148,136,0.15); }

            /* Sidebar */
            .cel-category-header { padding: 10px 14px; font-weight: 600; font-size: 0.85em; color: #334155; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; }
            .cel-category-header:hover { background: #f8fafc; }
            .cel-cat-count { background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 10px; font-size: 0.8em; }
            .cel-dx-item { padding: 8px 14px 8px 24px; font-size: 0.85em; cursor: pointer; border-bottom: 1px solid #f8fafc; color: #475569; display: flex; justify-content: space-between; align-items: center; }
            .cel-dx-item:hover { background: #f0fdfa; color: #0d9488; }
            .cel-dx-selected { background: #ccfbf1 !important; color: #0d9488 !important; font-weight: 600; border-left: 3px solid #0d9488; }
            .cel-dx-inappropriate { color: #b45309; }
            .cel-badge-warn { background: #fef3c7; color: #92400e; padding: 1px 6px; border-radius: 4px; font-size: 0.7em; font-weight: 600; }
            .cel-badge-warn-sm { background: #fef3c7; color: #92400e; padding: 1px 4px; border-radius: 3px; font-size: 0.65em; font-weight: 600; margin-left: 4px; }
            .cel-placeholder { text-align: center; padding: 80px 20px; color: #94a3b8; }
            .cel-placeholder h3 { color: #64748b; margin: 10px 0 8px; }
            .cel-placeholder p { margin: 0; }

            /* Hero Header */
            .cel-hero { background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 16px; padding: 24px 28px 20px; margin-bottom: 16px; position: relative; overflow: hidden; }
            .cel-hero::after { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%); border-radius: 50%; }
            .cel-hero-warn { background: linear-gradient(135deg, #78350f, #451a03); }
            .cel-hero-warn::after { background: radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%); }
            .cel-hero-content { position: relative; z-index: 1; }
            .cel-hero-cat { display: inline-block; background: rgba(255,255,255,0.12); color: #cbd5e1; padding: 3px 10px; border-radius: 6px; font-size: 0.75em; font-weight: 600; letter-spacing: 0.3px; margin-bottom: 8px; }
            .cel-hero-title { color: white; margin: 0 0 12px; font-size: 1.4em; font-weight: 800; letter-spacing: -0.01em; }
            .cel-hero-stats { display: flex; flex-wrap: wrap; gap: 6px; }
            .cel-stat-chip { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 0.72em; font-weight: 600; background: rgba(255,255,255,0.1); color: #94a3b8; }
            .cel-chip-abnormal { background: rgba(220,38,38,0.2); color: #fca5a5; }
            .cel-chip-normal { background: rgba(5,150,105,0.2); color: #6ee7b7; }
            .cel-hero-warn-banner { margin-top: 12px; padding: 8px 12px; background: rgba(251,191,36,0.15); border-radius: 8px; color: #fde68a; font-size: 0.82em; display: flex; align-items: center; gap: 6px; position: relative; z-index: 1; }

            /* Key Findings Pearls */
            .cel-pearls { background: #ecfdf5; border: 1px solid #a7f3d0; border-left: 4px solid #059669; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
            .cel-pearls-header { padding: 12px 16px; font-weight: 700; font-size: 0.92em; color: #065f46; display: flex; align-items: center; gap: 8px; background: rgba(5,150,105,0.05); }
            .cel-pearls-body { padding: 8px 16px 12px; }
            .cel-pearl-item { display: flex; align-items: flex-start; gap: 8px; padding: 5px 0; font-size: 0.88em; color: #065f46; line-height: 1.45; }
            .cel-pearl-dot { width: 6px; height: 6px; border-radius: 50%; background: #059669; flex-shrink: 0; margin-top: 6px; }

            /* Starred/Featured Cases */
            .cel-star { color: #f59e0b; font-size: 0.9em; margin-right: 4px; }
            .cel-dx-starred { background: linear-gradient(90deg, rgba(245,158,11,0.08), transparent); border-left: 2px solid #f59e0b; }
            .cel-star-hero { color: #fbbf24; }

            /* Exam Layout with Diagram */
            .cel-exam-layout { display: flex; gap: 16px; margin-bottom: 16px; }
            .cel-exam-layout.cel-has-diagram .cel-diagram-panel { width: 250px; flex-shrink: 0; }
            .cel-exam-content { flex: 1; min-width: 0; }
            .cel-diagram-panel { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; position: sticky; top: 0; align-self: flex-start; }
            .cel-diagram-title { font-size: 0.8em; font-weight: 700; color: #334155; margin-bottom: 8px; text-align: center; }
            .cel-diagram-legend { display: flex; justify-content: center; gap: 12px; margin-top: 12px; font-size: 0.75em; color: #64748b; }
            .cel-legend-item { display: flex; align-items: center; gap: 5px; }
            .cel-legend-dot { width: 10px; height: 10px; border-radius: 2px; }
            .cel-legend-abnormal { background: #fecaca; border: 1px solid #dc2626; }
            .cel-legend-normal { background: #e2e8f0; border: 1px solid #94a3b8; }

            /* Card Section */
            .cel-card-section { margin-bottom: 14px; }
            .cel-card-section-header { display: flex; align-items: center; gap: 6px; padding: 8px 0 6px; font-weight: 700; font-size: 0.88em; color: #334155; border-bottom: 1px solid #e2e8f0; margin-bottom: 8px; }
            .cel-card-section-header svg { flex-shrink: 0; }
            .cel-summary-text { margin-left: auto; font-size: 0.82em; font-weight: 500; color: #64748b; }

            /* Summary Bar */
            .cel-summary-bar { height: 4px; background: #e2e8f0; border-radius: 2px; margin-bottom: 10px; overflow: hidden; }
            .cel-summary-fill { height: 100%; border-radius: 2px; transition: width 0.3s; }
            .cel-fill-abnormal { background: #dc2626; }

            /* Muscle Cards */
            .cel-muscle-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
            .cel-muscle-card { border-radius: 8px; border: 1px solid #e2e8f0; padding: 10px 14px; border-left: 4px solid; transition: transform 0.15s, box-shadow 0.15s; display: flex; gap: 12px; align-items: center; background: white; }
            .cel-mc-content { flex: 1; min-width: 0; }
            .cel-muscle-card:hover { transform: translateX(2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: #cbd5e1; }
            .cel-finding-abnormal { border-left-color: var(--cel-abnormal); }
            .cel-finding-uncertain { border-left-color: var(--cel-uncertain); background: var(--cel-uncertain-bg); }
            .cel-finding-normal { border-left-color: var(--cel-normal); background: var(--cel-normal-bg); }
            .cel-mc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
            .cel-mc-name { font-weight: 700; font-size: 0.84em; color: #1e293b; }
            .cel-mrc-badge { font-size: 0.7em; font-weight: 700; padding: 1px 7px; border-radius: 9px; color: white; }
            .cel-mrc-abnormal { background: var(--cel-abnormal); }
            .cel-mrc-uncertain { background: var(--cel-uncertain); }
            .cel-mrc-normal { background: var(--cel-normal); }
            .cel-mc-details { display: flex; gap: 8px; margin-bottom: 2px; }
            .cel-mc-nerve, .cel-mc-root { font-size: 0.75em; color: #64748b; }
            .cel-mc-action { font-size: 0.75em; color: #475569; font-style: italic; }
            .cel-mc-note { font-size: 0.75em; color: #64748b; font-style: italic; }

            /* Sensory Cards */
            .cel-sensory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }
            .cel-sensory-card { border-radius: 8px; border: 1px solid #e2e8f0; padding: 8px 10px; border-left: 4px solid; }
            .cel-sc-area { font-weight: 700; font-size: 0.84em; color: #1e293b; margin-bottom: 2px; }
            .cel-sc-modality { font-size: 0.75em; color: #64748b; margin-bottom: 2px; }
            .cel-sc-finding { font-size: 0.78em; font-weight: 600; }
            .cel-finding-abnormal .cel-sc-finding { color: var(--cel-abnormal); }
            .cel-finding-normal .cel-sc-finding { color: var(--cel-normal); }

            /* Reflex Chips */
            .cel-reflex-row { display: flex; flex-wrap: wrap; gap: 6px; }
            .cel-reflex-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; font-size: 0.82em; border: 1px solid; }
            .cel-reflex-chip.cel-finding-abnormal { background: var(--cel-abnormal-bg); border-color: var(--cel-abnormal-border); }
            .cel-reflex-chip.cel-finding-uncertain { background: var(--cel-uncertain-bg); border-color: var(--cel-uncertain-border); }
            .cel-reflex-chip.cel-finding-normal { background: var(--cel-normal-bg); border-color: var(--cel-normal-border); }
            .cel-rc-name { font-weight: 600; color: #334155; }
            .cel-rc-finding { font-size: 0.85em; color: #64748b; }

            /* Special Test Cards */
            .cel-tests-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px; }
            .cel-test-card { background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; cursor: pointer; transition: box-shadow 0.15s; }
            .cel-test-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
            .cel-tc-header { display: flex; justify-content: space-between; align-items: center; }
            .cel-tc-name { font-weight: 700; font-size: 0.88em; color: #1e293b; }
            .cel-tc-toggle { font-size: 0.9em; }
            .cel-tc-stats { display: flex; gap: 12px; margin-top: 6px; }
            .cel-stat-meter { display: flex; align-items: center; gap: 4px; }
            .cel-stat-label { font-size: 0.68em; font-weight: 600; color: #94a3b8; width: 28px; }
            .cel-stat-bar { width: 50px; height: 5px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
            .cel-stat-fill { height: 100%; border-radius: 3px; }
            .cel-stat-value { font-size: 0.68em; color: #64748b; }
            .cel-tc-body { margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; }
            .cel-tc-technique, .cel-tc-positive { font-size: 0.84em; color: #475569; margin-bottom: 3px; line-height: 1.4; }
            .cel-tc-positive { color: #0d9488; }

            /* Exam List (inspection, palpation, ROM) */
            .cel-list-section { background: #f8fafc; border-radius: 10px; padding: 10px 14px; }
            .cel-exam-list { display: flex; flex-direction: column; gap: 4px; }
            .cel-exam-list-item { font-size: 0.84em; color: #475569; line-height: 1.4; padding: 3px 0; border-bottom: 1px solid #f1f5f9; }
            .cel-exam-list-item:last-child { border-bottom: none; }

            /* Compact History */
            .cel-history-section { background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
            .cel-section-title { margin: 0; padding: 12px 16px; font-size: 0.95em; cursor: pointer; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 8px; user-select: none; }
            .cel-section-title:hover { background: #f1f5f9; }
            .cel-section-title svg { flex-shrink: 0; }
            .cel-toggle { margin-left: auto; font-size: 1.1em; color: #94a3b8; font-weight: 700; line-height: 1; }
            .cel-section-body { padding: 14px 16px; }

            .cel-history-compact {}
            .cel-hx-demo { font-size: 0.78em; color: #64748b; margin-bottom: 4px; }
            .cel-hx-cc { font-size: 0.95em; color: #334155; font-style: italic; margin-bottom: 10px; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
            .cel-hpi-grid { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
            .cel-hpi-tag { display: inline-block; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 8px; font-size: 0.78em; color: #475569; line-height: 1.3; }
            .cel-hx-row { font-size: 0.84em; color: #475569; margin-bottom: 6px; line-height: 1.5; }
            .cel-hx-redflags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
            .cel-rf-item { display: inline-block; background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 3px 8px; border-radius: 6px; font-size: 0.78em; font-weight: 500; }
            .cel-misdiag-pill { display: inline-block; background: #f1f5f9; border-radius: 12px; padding: 2px 8px; font-size: 0.75em; color: #64748b; margin-left: 4px; }

            /* Builder (unchanged) */
            .cel-builder-header { margin-bottom: 20px; }
            .cel-builder-header h3 { margin: 0 0 6px; }
            .cel-builder-header p { margin: 0; color: #64748b; font-size: 0.92em; }
            .cel-builder-body { display: flex; gap: 20px; }
            .cel-builder-left { width: 320px; flex-shrink: 0; }
            .cel-builder-right { flex: 1; min-width: 0; background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; overflow-y: auto; max-height: 650px; }
            .cel-builder-list { max-height: 480px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px; background: white; margin-bottom: 12px; }
            .cel-builder-cat-header { padding: 8px 12px; font-weight: 600; font-size: 0.8em; color: #334155; background: #f8fafc; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 1; }
            .cel-builder-item { display: flex; align-items: center; gap: 8px; padding: 6px 12px; font-size: 0.85em; cursor: pointer; border-bottom: 1px solid #f8fafc; }
            .cel-builder-item:hover { background: #f0fdfa; }
            .cel-builder-item input[type="checkbox"] { accent-color: #0d9488; }
            .cel-build-btn { width: 100%; padding: 12px; background: linear-gradient(135deg, #0d9488, #0284c7); color: white; border: none; border-radius: 10px; font-size: 1em; font-weight: 600; cursor: pointer; transition: all 0.2s; }
            .cel-build-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(13,148,136,0.3); }

            /* Built Exam Output */
            .cel-built-hero { background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 14px; padding: 20px 24px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-start; position: relative; overflow: hidden; }
            .cel-built-hero::after { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; background: radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%); border-radius: 50%; }
            .cel-built-hero-content { position: relative; z-index: 1; }
            .cel-built-hero h3 { color: white; margin: 0 0 4px; font-size: 1.3em; font-weight: 800; }
            .cel-built-hero p { color: #94a3b8; margin: 0 0 10px; font-size: 0.85em; }
            .cel-copy-btn-hero { position: relative; z-index: 1; padding: 8px 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: white; cursor: pointer; font-size: 0.82em; font-weight: 600; display: flex; align-items: center; gap: 6px; transition: all 0.2s; flex-shrink: 0; }
            .cel-copy-btn-hero:hover { background: rgba(255,255,255,0.2); }
            .cel-built-diff { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; margin-bottom: 16px; padding: 10px 14px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; }
            .cel-built-diff-label { font-size: 0.78em; font-weight: 700; color: #64748b; margin-right: 4px; }
            .cel-dx-tags { display: inline-flex; gap: 4px; flex-wrap: wrap; margin-top: 4px; }
            .cel-dx-tag { background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 0.72em; font-weight: 600; white-space: nowrap; }

            /* Checklist Grid */
            .cel-checklist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 6px; }
            .cel-check-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; border-left: 3px solid #0d9488; background: white; transition: transform 0.15s, box-shadow 0.15s; }
            .cel-check-card:hover { transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.06); }
            .cel-check-top { display: flex; justify-content: space-between; align-items: center; }
            .cel-check-name { font-weight: 700; font-size: 0.84em; color: #1e293b; }
            .cel-check-meta { font-size: 0.72em; color: #0d9488; font-weight: 600; background: #f0fdfa; padding: 1px 6px; border-radius: 4px; }
            .cel-check-sub { font-size: 0.75em; color: #64748b; margin-top: 2px; }
            .cel-test-stats { font-weight: 400; color: #64748b; font-size: 0.85em; }
            .cel-test-technique { font-size: 0.88em; color: #475569; margin-bottom: 3px; }
            .cel-test-positive { font-size: 0.88em; color: #0d9488; }

            /* Coach Mode */
            #cel-coach-panel { gap: 20px; min-height: 600px; }
            .cel-coach-sidebar { width: 220px; flex-shrink: 0; background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; max-height: 700px; overflow-y: auto; }
            .cel-coach-group-label { font-size: 0.72em; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin: 12px 0 4px; padding-top: 8px; border-top: 1px solid #f1f5f9; }
            .cel-coach-group-label:first-of-type { margin-top: 0; border-top: none; }
            .cel-coach-main { flex: 1; min-width: 0; }
            .cel-coach-placeholder { text-align: center; padding: 60px 30px; color: #64748b; }
            .cel-coach-placeholder-icon { margin-bottom: 12px; transform: scale(2); display: inline-block; color: #0d9488; }
            .cel-coach-placeholder h3 { color: #1e293b; margin: 8px 0; }
            .cel-coach-placeholder p { max-width: 400px; margin: 6px auto; font-size: 0.9em; line-height: 1.5; }
            .cel-coach-empty { text-align: center; padding: 40px; color: #94a3b8; }

            .cel-coach-progress { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 20px; padding: 16px; background: white; border-radius: 12px; border: 1px solid #e2e8f0; }
            .cel-cp-step { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            .cel-cp-circle { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85em; background: #f1f5f9; color: #94a3b8; border: 2px solid #e2e8f0; transition: all 0.3s; }
            .cel-cp-active .cel-cp-circle { background: #0d9488; color: white; border-color: #0d9488; box-shadow: 0 0 0 4px rgba(13,148,136,0.15); }
            .cel-cp-done .cel-cp-circle { background: #10b981; color: white; border-color: #10b981; }
            .cel-cp-label { font-size: 0.72em; font-weight: 600; color: #94a3b8; }
            .cel-cp-active .cel-cp-label { color: #0d9488; }
            .cel-cp-done .cel-cp-label { color: #10b981; }
            .cel-cp-line { width: 40px; height: 2px; background: #e2e8f0; margin: 0 8px; margin-bottom: 18px; }

            .cel-coach-prompt { background: white; border-left: 4px solid #0d9488; padding: 18px 20px; border-radius: 0 12px 12px 0; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
            .cel-coach-phase-label { font-size: 0.72em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0d9488; margin-bottom: 6px; }
            .cel-coach-prompt p { margin: 0; font-size: 1.05em; color: #1e293b; font-weight: 500; line-height: 1.5; }

            .cel-coach-findings { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 10px; margin-bottom: 16px; }
            .cel-coach-finding { padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; cursor: pointer; transition: all 0.4s ease; position: relative; overflow: hidden; }
            .cel-coach-hidden { filter: blur(6px); opacity: 0.3; }
            .cel-coach-hidden::after { content: 'Click to reveal'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.85em; color: #64748b; filter: none; background: rgba(255,255,255,0.7); }
            .cel-coach-revealed { filter: none; opacity: 1; }
            .cel-cf-type { font-size: 0.68em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px; }
            .cel-cf-key { font-weight: 700; font-size: 0.9em; color: #1e293b; margin-bottom: 4px; }
            .cel-cf-result { font-size: 0.85em; font-weight: 600; }
            .cel-finding-abnormal .cel-cf-result { color: #dc2626; }
            .cel-finding-normal .cel-cf-result { color: #059669; }
            .cel-cf-note { font-size: 0.78em; color: #64748b; margin-top: 4px; font-style: italic; }

            .cel-coach-reasoning { padding: 12px 16px; background: #f0fdf4; border-radius: 10px; border: 1px solid #bbf7d0; cursor: pointer; margin-bottom: 12px; }
            .cel-coach-reasoning strong { font-size: 0.88em; color: #166534; display: flex; align-items: center; justify-content: space-between; }
            .cel-coach-reasoning-text { padding: 12px 16px; font-size: 0.88em; color: #166534; line-height: 1.6; }

            .cel-coach-next-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #0d9488, #0f766e); color: white; border: none; border-radius: 10px; font-size: 1em; font-weight: 700; cursor: pointer; transition: all 0.2s; }
            .cel-coach-next-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(13,148,136,0.3); }

            .cel-coach-complete { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 14px 20px; border-radius: 10px; font-size: 1.1em; font-weight: 700; text-align: center; margin-bottom: 16px; }
            .cel-coach-summary h3 { text-align: center; margin: 12px 0 16px; color: #1e293b; }

            /* EDX Case Link */
            .cel-edx-section { margin-top: 20px; border: 2px solid #bfdbfe; border-radius: 14px; overflow: hidden; background: white; }
            .cel-edx-header { display: flex; align-items: center; gap: 8px; padding: 14px 18px; background: linear-gradient(135deg, #eff6ff, #dbeafe); cursor: pointer; font-weight: 700; font-size: 0.92em; color: #1e40af; transition: background 0.2s; }
            .cel-edx-header:hover { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
            .cel-edx-icon { display: flex; }
            .cel-edx-case-name { margin-left: auto; font-weight: 500; font-size: 0.85em; color: #3b82f6; }
            .cel-edx-tables { padding: 16px; overflow-x: auto; }
            .cel-edx-tables table { font-size: 0.82em; }
            .cel-edx-teaching { padding: 0 16px 16px; }
            .cel-edx-teaching strong { display: block; font-size: 0.85em; color: #1e40af; margin-bottom: 6px; }
            .cel-edx-teaching ul { margin: 0; padding-left: 18px; font-size: 0.82em; color: #334155; line-height: 1.6; }
            .cel-edx-teaching li { margin-bottom: 4px; }

            /* Animation */
            @keyframes celFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
            .cel-detail > * { animation: celFadeIn 0.25s ease both; }
            .cel-detail > *:nth-child(2) { animation-delay: 0.05s; }
            .cel-detail > *:nth-child(3) { animation-delay: 0.1s; }
            .cel-detail > *:nth-child(4) { animation-delay: 0.15s; }
        `;
    }
}

const clinicalExamLabInstance = new ClinicalExamLabModule();
export default {
    generateContent() { return clinicalExamLabInstance.generateContent(); },
    initialize() { clinicalExamLabInstance.initialize(); }
};
