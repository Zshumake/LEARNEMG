/**
 * ClinicalExamLab.js
 * Module for teaching residents H&P before EMG/NCS.
 * Two modes: Study Mode (browse diagnoses) and Exam Builder (build from differential).
 */
import { clinicalExamData, DIAGNOSIS_CATEGORIES } from '../../data/clinical-exam/index.js?v=20260317';

// Inline SVG icons (no emojis)
const ICONS = {
    study: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    builder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
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
};

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
                    <button id="cel-tab-study" class="cel-tab cel-tab-active" onclick="window._celModule.switchTab('study')">
                        ${ICONS.study} Study Mode
                    </button>
                    <button id="cel-tab-builder" class="cel-tab" onclick="window._celModule.switchTab('builder')">
                        ${ICONS.builder} Exam Builder
                    </button>
                </div>
                <div id="cel-study-panel" class="cel-panel">
                    ${this.renderStudyMode()}
                </div>
                <div id="cel-builder-panel" class="cel-panel" style="display:none;">
                    ${this.renderExamBuilder()}
                </div>
            </div>
        `;
    }

    initialize() {
        window._celModule = this;
        // Select first diagnosis by default
        const firstCat = this.categories[0];
        if (firstCat && firstCat.ids.length > 0) {
            setTimeout(() => this.selectDiagnosis(firstCat.ids[0]), 100);
        }
    }

    // --- Tab Switching ---
    switchTab(tab) {
        this.currentTab = tab;
        document.getElementById('cel-study-panel').style.display = tab === 'study' ? 'flex' : 'none';
        document.getElementById('cel-builder-panel').style.display = tab === 'builder' ? 'block' : 'none';
        document.getElementById('cel-tab-study').className = `cel-tab ${tab === 'study' ? 'cel-tab-active' : ''}`;
        document.getElementById('cel-tab-builder').className = `cel-tab ${tab === 'builder' ? 'cel-tab-active' : ''}`;
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
                            <div class="cel-category-header" onclick="window._celModule.toggleCategory('${cat.name}')">
                                <span>${cat.name}</span>
                                <span class="cel-cat-count">${cat.ids.length}</span>
                            </div>
                            <div class="cel-category-items" id="cel-cat-${this.slugify(cat.name)}" style="display:none;">
                                ${cat.ids.map(id => {
                                    const dx = this.data[id];
                                    if (!dx) return '';
                                    return `<div class="cel-dx-item ${dx.isInappropriate ? 'cel-dx-inappropriate' : ''}"
                                                id="cel-dx-${id}"
                                                onclick="window._celModule.selectDiagnosis('${id}')">
                                        ${dx.name}
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

        // Update sidebar highlighting
        document.querySelectorAll('.cel-dx-item').forEach(el => el.classList.remove('cel-dx-selected'));
        const item = document.getElementById(`cel-dx-${id}`);
        if (item) {
            item.classList.add('cel-dx-selected');
            // Expand parent category
            const catEl = item.closest('.cel-category-items');
            if (catEl) catEl.style.display = 'block';
        }

        // Render diagnosis detail
        const main = document.getElementById('cel-main-content');
        if (main) main.innerHTML = this.renderDiagnosisDetail(dx);
    }

    renderDiagnosisDetail(dx) {
        return `
            <div class="cel-detail">
                <div class="cel-detail-header ${dx.isInappropriate ? 'cel-header-inappropriate' : ''}">
                    <h2>${dx.name}</h2>
                    <span class="cel-cat-label">${dx.category}</span>
                    ${dx.isInappropriate ? `<div class="cel-inappropriate-banner">${ICONS.warning} This diagnosis is commonly sent to the EMG lab but EMG/NCS is generally NOT indicated. The exam below helps distinguish it from true neuromuscular pathology.</div>` : ''}
                </div>

                <!-- History Section (collapsed by default) -->
                <div class="cel-section">
                    <h3 class="cel-section-title" onclick="window._celModule.toggleSection('history-${dx.id}')">
                        ${ICONS.history} Patient History <span class="cel-toggle" id="cel-arrow-history-${dx.id}">-</span>
                    </h3>
                    <div id="cel-section-history-${dx.id}" class="cel-section-body">
                        <div class="cel-info-row"><strong>Demographics:</strong> ${dx.history.demographics}</div>
                        <div class="cel-info-row"><strong>Chief Complaint:</strong> ${dx.history.chiefComplaint}</div>
                        <div class="cel-info-row">
                            <strong>Key HPI Features:</strong>
                            <ul>${dx.history.hpiKeyFeatures.map(f => `<li>${f}</li>`).join('')}</ul>
                        </div>
                        ${dx.history.associatedSymptoms?.length ? `
                        <div class="cel-info-row">
                            <strong>Associated Symptoms:</strong>
                            <ul>${dx.history.associatedSymptoms.map(s => `<li>${s}</li>`).join('')}</ul>
                        </div>` : ''}
                        ${dx.history.redFlags?.length ? `
                        <div class="cel-info-row cel-red-flags">
                            <strong>${ICONS.flag} Red Flags:</strong>
                            <ul>${dx.history.redFlags.map(f => `<li>${f}</li>`).join('')}</ul>
                        </div>` : ''}
                        ${dx.history.commonMisdiagnoses?.length ? `
                        <div class="cel-info-row">
                            <strong>Common Misdiagnoses:</strong> ${dx.history.commonMisdiagnoses.join(', ')}
                        </div>` : ''}
                    </div>
                </div>

                <!-- Physical Exam Section (collapsed by default) -->
                <div class="cel-section">
                    <h3 class="cel-section-title" onclick="window._celModule.toggleSection('exam-${dx.id}')">
                        ${ICONS.exam} Physical Examination <span class="cel-toggle" id="cel-arrow-exam-${dx.id}">-</span>
                    </h3>
                    <div id="cel-section-exam-${dx.id}" class="cel-section-body">
                        ${this.renderExamSubsection('inspection', 'Inspection', ICONS.inspection, dx.physicalExam.inspection, dx.id)}
                        ${this.renderExamSubsection('palpation', 'Palpation', ICONS.palpation, dx.physicalExam.palpation, dx.id)}
                        ${this.renderExamSubsection('rom', 'Range of Motion', ICONS.rom, dx.physicalExam.rom, dx.id)}
                        ${this.renderStrengthSubsection(dx.physicalExam.strength, dx.id)}
                        ${this.renderSensorySubsection(dx.physicalExam.sensory, dx.id)}
                        ${this.renderReflexSubsection(dx.physicalExam.reflexes, dx.id)}
                        ${this.renderSpecialTestsSubsection(dx.physicalExam.specialTests, dx.id)}
                    </div>
                </div>

                <!-- Key Distinguishing Findings (open by default) -->
                ${dx.keyDistinguishingFindings?.length ? `
                <div class="cel-section cel-key-findings">
                    <h3 class="cel-section-title" onclick="window._celModule.toggleSection('key-${dx.id}')">
                        ${ICONS.key} Key Distinguishing Findings <span class="cel-toggle" id="cel-arrow-key-${dx.id}">&minus;</span>
                    </h3>
                    <div id="cel-section-key-${dx.id}" class="cel-section-body">
                        <ul class="cel-pearl-list">
                            ${dx.keyDistinguishingFindings.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>` : ''}
            </div>
        `;
    }

    // Collapsible subsection for simple list items (inspection, palpation, ROM)
    renderExamSubsection(key, title, icon, items, dxId) {
        if (!items || items.length === 0) return '';
        const sectionId = `${key}-${dxId}`;
        return `
            <div class="cel-subsection">
                <div class="cel-subsection-title" onclick="window._celModule.toggleSection('sub-${sectionId}')">
                    ${icon} ${title} <span class="cel-sub-count">${items.length}</span>
                    <span class="cel-toggle" id="cel-arrow-sub-${sectionId}">-</span>
                </div>
                <div id="cel-section-sub-${sectionId}" class="cel-subsection-body">
                    <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
                </div>
            </div>
        `;
    }

    renderStrengthSubsection(strength, dxId) {
        if (!strength || strength.length === 0) return '';
        const sectionId = `strength-${dxId}`;
        return `
            <div class="cel-subsection">
                <div class="cel-subsection-title" onclick="window._celModule.toggleSection('sub-${sectionId}')">
                    ${ICONS.strength} Manual Muscle Testing <span class="cel-sub-count">${strength.length} muscles</span>
                    <span class="cel-toggle" id="cel-arrow-sub-${sectionId}">-</span>
                </div>
                <div id="cel-section-sub-${sectionId}" class="cel-subsection-body">
                    <div class="cel-table-wrapper">
                        <table class="cel-table">
                            <thead>
                                <tr><th>Muscle</th><th>Nerve</th><th>Root</th><th>Action</th><th>Expected</th><th>MRC</th></tr>
                            </thead>
                            <tbody>
                                ${strength.map(s => `
                                    <tr class="${s.expectedFinding.includes('WEAK') || s.expectedFinding.includes('ABSENT') ? 'cel-row-abnormal' : ''}">
                                        <td><strong>${s.muscle}</strong></td>
                                        <td>${s.nerve}</td>
                                        <td>${s.root}</td>
                                        <td>${s.action}</td>
                                        <td>${s.expectedFinding}</td>
                                        <td>${s.mrcGrade}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderSensorySubsection(sensory, dxId) {
        if (!sensory || sensory.length === 0) return '';
        const sectionId = `sensory-${dxId}`;
        return `
            <div class="cel-subsection">
                <div class="cel-subsection-title" onclick="window._celModule.toggleSection('sub-${sectionId}')">
                    ${ICONS.sensory} Sensory Examination <span class="cel-sub-count">${sensory.length}</span>
                    <span class="cel-toggle" id="cel-arrow-sub-${sectionId}">-</span>
                </div>
                <div id="cel-section-sub-${sectionId}" class="cel-subsection-body">
                    <div class="cel-table-wrapper">
                        <table class="cel-table">
                            <thead>
                                <tr><th>Area / Distribution</th><th>Modality</th><th>Expected Finding</th></tr>
                            </thead>
                            <tbody>
                                ${sensory.map(s => `
                                    <tr class="${s.expectedFinding.includes('Decreased') || s.expectedFinding.includes('Diminished') || s.expectedFinding.includes('ABSENT') ? 'cel-row-abnormal' : ''}">
                                        <td>${s.area}</td>
                                        <td>${s.modality}</td>
                                        <td>${s.expectedFinding}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderReflexSubsection(reflexes, dxId) {
        if (!reflexes || reflexes.length === 0) return '';
        const sectionId = `reflexes-${dxId}`;
        return `
            <div class="cel-subsection">
                <div class="cel-subsection-title" onclick="window._celModule.toggleSection('sub-${sectionId}')">
                    ${ICONS.reflex} Reflexes <span class="cel-sub-count">${reflexes.length}</span>
                    <span class="cel-toggle" id="cel-arrow-sub-${sectionId}">-</span>
                </div>
                <div id="cel-section-sub-${sectionId}" class="cel-subsection-body">
                    <div class="cel-table-wrapper">
                        <table class="cel-table">
                            <thead>
                                <tr><th>Reflex</th><th>Expected Finding</th></tr>
                            </thead>
                            <tbody>
                                ${reflexes.map(r => `
                                    <tr class="${r.expectedFinding.includes('DIMINISHED') || r.expectedFinding.includes('ABSENT') || r.expectedFinding.includes('Diminished') ? 'cel-row-abnormal' : ''}">
                                        <td>${r.reflex}</td>
                                        <td>${r.expectedFinding}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    renderSpecialTestsSubsection(tests, dxId) {
        if (!tests || tests.length === 0) return '';
        const sectionId = `special-${dxId}`;
        return `
            <div class="cel-subsection">
                <div class="cel-subsection-title" onclick="window._celModule.toggleSection('sub-${sectionId}')">
                    ${ICONS.specialTest} Special Tests <span class="cel-sub-count">${tests.length} tests</span>
                    <span class="cel-toggle" id="cel-arrow-sub-${sectionId}">-</span>
                </div>
                <div id="cel-section-sub-${sectionId}" class="cel-subsection-body">
                    ${tests.map(t => `
                        <div class="cel-special-test">
                            <div class="cel-test-name">${t.name}${t.sensitivity ? ` <span class="cel-test-stats">(Sens: ${t.sensitivity}${t.specificity ? `, Spec: ${t.specificity}` : ''})</span>` : ''}</div>
                            <div class="cel-test-technique"><strong>Technique:</strong> ${t.technique}</div>
                            <div class="cel-test-positive"><strong>Positive:</strong> ${t.positiveFinding}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // --- EXAM BUILDER ---
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
                                            <input type="checkbox" onchange="window._celModule.toggleBuilderDx('${id}')" ${this.examBuilderSelections.has(id) ? 'checked' : ''}>
                                            <span>${dx.name}</span>
                                            ${dx.isInappropriate ? '<span class="cel-badge-warn-sm">Non-EMG</span>' : ''}
                                        </label>`;
                                    }).join('')}
                                </div>
                            `).join('')}
                        </div>
                        <button class="cel-build-btn" onclick="window._celModule.buildExam()">
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
        if (this.examBuilderSelections.has(id)) {
            this.examBuilderSelections.delete(id);
        } else {
            this.examBuilderSelections.add(id);
        }
        const countEl = document.getElementById('cel-build-count');
        if (countEl) countEl.textContent = this.examBuilderSelections.size;
    }

    buildExam() {
        if (this.examBuilderSelections.size === 0) {
            const output = document.getElementById('cel-builder-output');
            if (output) output.innerHTML = '<div class="cel-placeholder"><h3>No diagnoses selected</h3><p>Check at least one diagnosis from the list to build an exam.</p></div>';
            return;
        }

        // Collect all exam components and de-duplicate
        const allStrength = new Map();
        const allSensory = new Map();
        const allReflexes = new Map();
        const allSpecialTests = new Map();
        const allInspection = new Map();
        const allPalpation = new Map();
        const allRom = new Map();

        for (const id of this.examBuilderSelections) {
            const dx = this.data[id];
            if (!dx) continue;
            const pe = dx.physicalExam;
            const name = dx.name;

            (pe.inspection || []).forEach(item => {
                const key = item.substring(0, 60);
                if (!allInspection.has(key)) allInspection.set(key, { text: item, diagnoses: [] });
                allInspection.get(key).diagnoses.push(name);
            });

            (pe.palpation || []).forEach(item => {
                const key = item.substring(0, 60);
                if (!allPalpation.has(key)) allPalpation.set(key, { text: item, diagnoses: [] });
                allPalpation.get(key).diagnoses.push(name);
            });

            (pe.rom || []).forEach(item => {
                const key = item.substring(0, 60);
                if (!allRom.has(key)) allRom.set(key, { text: item, diagnoses: [] });
                allRom.get(key).diagnoses.push(name);
            });

            (pe.strength || []).forEach(s => {
                const key = s.muscle;
                if (!allStrength.has(key)) {
                    allStrength.set(key, { ...s, diagnoses: [] });
                }
                allStrength.get(key).diagnoses.push(name);
            });

            (pe.sensory || []).forEach(s => {
                const key = s.area.substring(0, 50);
                if (!allSensory.has(key)) allSensory.set(key, { ...s, diagnoses: [] });
                allSensory.get(key).diagnoses.push(name);
            });

            (pe.reflexes || []).forEach(r => {
                const key = r.reflex;
                if (!allReflexes.has(key)) allReflexes.set(key, { ...r, diagnoses: [] });
                allReflexes.get(key).diagnoses.push(name);
            });

            (pe.specialTests || []).forEach(t => {
                const key = t.name;
                if (!allSpecialTests.has(key)) allSpecialTests.set(key, { ...t, diagnoses: [] });
                allSpecialTests.get(key).diagnoses.push(name);
            });
        }

        const selectedNames = [...this.examBuilderSelections].map(id => this.data[id]?.name).filter(Boolean);

        const output = document.getElementById('cel-builder-output');
        if (output) {
            output.innerHTML = `
                <div class="cel-built-exam">
                    <div class="cel-built-header">
                        <h3>Custom Physical Exam</h3>
                        <p>For differential: <strong>${selectedNames.join(', ')}</strong></p>
                        <button class="cel-copy-btn" onclick="window._celModule.copyExam()">${ICONS.copy} Copy to Clipboard</button>
                    </div>

                    ${this.renderBuiltSection('Inspection', allInspection)}
                    ${this.renderBuiltSection('Palpation', allPalpation)}
                    ${this.renderBuiltSection('Range of Motion', allRom)}
                    ${this.renderBuiltStrength(allStrength)}
                    ${this.renderBuiltSensory(allSensory)}
                    ${this.renderBuiltReflexes(allReflexes)}
                    ${this.renderBuiltSpecialTests(allSpecialTests)}
                </div>
            `;
        }
    }

    renderBuiltSection(title, map) {
        if (map.size === 0) return '';
        return `
            <div class="cel-built-section">
                <h4>${title}</h4>
                <ul>
                    ${[...map.values()].map(item => `
                        <li>
                            ${item.text}
                            <span class="cel-dx-tags">${item.diagnoses.map(d => `<span class="cel-dx-tag">${d}</span>`).join('')}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    renderBuiltStrength(map) {
        if (map.size === 0) return '';
        return `
            <div class="cel-built-section">
                <h4>Manual Muscle Testing</h4>
                <div class="cel-table-wrapper">
                    <table class="cel-table">
                        <thead><tr><th>Muscle</th><th>Nerve</th><th>Root</th><th>Action</th><th>Evaluates For</th></tr></thead>
                        <tbody>
                            ${[...map.values()].map(s => `
                                <tr>
                                    <td><strong>${s.muscle}</strong></td>
                                    <td>${s.nerve}</td>
                                    <td>${s.root}</td>
                                    <td>${s.action}</td>
                                    <td>${s.diagnoses.map(d => `<span class="cel-dx-tag">${d}</span>`).join('')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderBuiltSensory(map) {
        if (map.size === 0) return '';
        return `
            <div class="cel-built-section">
                <h4>Sensory Examination</h4>
                <div class="cel-table-wrapper">
                    <table class="cel-table">
                        <thead><tr><th>Area</th><th>Modality</th><th>Evaluates For</th></tr></thead>
                        <tbody>
                            ${[...map.values()].map(s => `
                                <tr>
                                    <td>${s.area}</td>
                                    <td>${s.modality}</td>
                                    <td>${s.diagnoses.map(d => `<span class="cel-dx-tag">${d}</span>`).join('')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderBuiltReflexes(map) {
        if (map.size === 0) return '';
        return `
            <div class="cel-built-section">
                <h4>Reflexes</h4>
                <div class="cel-table-wrapper">
                    <table class="cel-table">
                        <thead><tr><th>Reflex</th><th>Evaluates For</th></tr></thead>
                        <tbody>
                            ${[...map.values()].map(r => `
                                <tr>
                                    <td>${r.reflex}</td>
                                    <td>${r.diagnoses.map(d => `<span class="cel-dx-tag">${d}</span>`).join('')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderBuiltSpecialTests(map) {
        if (map.size === 0) return '';
        return `
            <div class="cel-built-section">
                <h4>Special Tests</h4>
                ${[...map.values()].map(t => `
                    <div class="cel-special-test">
                        <div class="cel-test-name">${t.name}</div>
                        <div class="cel-test-technique"><strong>Technique:</strong> ${t.technique}</div>
                        <div class="cel-test-positive"><strong>Positive:</strong> ${t.positiveFinding}</div>
                        <div class="cel-dx-tags">${t.diagnoses.map(d => `<span class="cel-dx-tag">${d}</span>`).join('')}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    copyExam() {
        const el = document.querySelector('.cel-built-exam');
        if (!el) return;
        const text = el.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('.cel-copy-btn');
            if (btn) {
                const orig = btn.innerHTML;
                btn.textContent = 'Copied!';
                setTimeout(() => btn.innerHTML = orig, 2000);
            }
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
            const match = el.textContent.toLowerCase().includes(q);
            el.style.display = match ? '' : 'none';
        });
        if (q.length > 0) {
            document.querySelectorAll('.cel-category-items').forEach(el => el.style.display = 'block');
        }
    }

    filterBuilder(query) {
        const q = query.toLowerCase();
        document.querySelectorAll('.cel-builder-item').forEach(el => {
            const match = el.getAttribute('data-dx-name').includes(q);
            el.style.display = match ? '' : 'none';
        });
    }

    slugify(str) {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    }

    // --- Styles ---
    getStyles() {
        return `
            .cel-collapsed { display: none !important; }
            .cel-container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .cel-tabs { display: flex; gap: 8px; margin-bottom: 20px; background: #f1f5f9; padding: 6px; border-radius: 12px; }
            .cel-tab { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 1.05em; font-weight: 600; cursor: pointer; background: transparent; color: #64748b; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
            .cel-tab svg { vertical-align: middle; }
            .cel-tab-active { background: white; color: #0d9488; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
            .cel-tab:hover:not(.cel-tab-active) { background: rgba(255,255,255,0.5); }

            /* Study Mode Layout */
            #cel-study-panel { display: flex; gap: 20px; min-height: 600px; }
            .cel-sidebar { width: 280px; flex-shrink: 0; background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow-y: auto; max-height: 700px; }
            .cel-main { flex: 1; min-width: 0; overflow-y: auto; max-height: 700px; }
            .cel-search-box { padding: 12px; border-bottom: 1px solid #e2e8f0; }
            .cel-search-box input { width: 100%; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.9em; box-sizing: border-box; }
            .cel-search-box input:focus { outline: none; border-color: #0d9488; box-shadow: 0 0 0 2px rgba(13,148,136,0.15); }

            /* Sidebar categories */
            .cel-category-header { padding: 10px 14px; font-weight: 600; font-size: 0.85em; color: #334155; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; }
            .cel-category-header:hover { background: #f8fafc; }
            .cel-cat-count { background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 10px; font-size: 0.8em; }
            .cel-dx-item { padding: 8px 14px 8px 24px; font-size: 0.85em; cursor: pointer; border-bottom: 1px solid #f8fafc; color: #475569; display: flex; justify-content: space-between; align-items: center; }
            .cel-dx-item:hover { background: #f0fdfa; color: #0d9488; }
            .cel-dx-selected { background: #ccfbf1 !important; color: #0d9488 !important; font-weight: 600; border-left: 3px solid #0d9488; }
            .cel-dx-inappropriate { color: #b45309; }
            .cel-badge-warn { background: #fef3c7; color: #92400e; padding: 1px 6px; border-radius: 4px; font-size: 0.7em; font-weight: 600; }
            .cel-badge-warn-sm { background: #fef3c7; color: #92400e; padding: 1px 4px; border-radius: 3px; font-size: 0.65em; font-weight: 600; margin-left: 4px; }

            /* Placeholder */
            .cel-placeholder { text-align: center; padding: 80px 20px; color: #94a3b8; }
            .cel-placeholder h3 { color: #64748b; margin: 10px 0 8px; }
            .cel-placeholder p { margin: 0; }

            /* Diagnosis Detail */
            .cel-detail { padding: 0 5px; }
            .cel-detail-header { margin-bottom: 20px; }
            .cel-detail-header h2 { margin: 0 0 6px; color: #0f172a; font-size: 1.5em; }
            .cel-cat-label { background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 6px; font-size: 0.8em; font-weight: 600; }
            .cel-header-inappropriate .cel-cat-label { background: #fef3c7; color: #92400e; }
            .cel-inappropriate-banner { margin-top: 12px; background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; font-size: 0.9em; color: #78350f; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; }
            .cel-inappropriate-banner svg { flex-shrink: 0; margin-top: 2px; }

            /* Sections */
            .cel-section { background: white; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
            .cel-section-title { margin: 0; padding: 14px 18px; font-size: 1.05em; cursor: pointer; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 8px; user-select: none; }
            .cel-section-title:hover { background: #f1f5f9; }
            .cel-section-title svg { flex-shrink: 0; }
            .cel-toggle { margin-left: auto; font-size: 1.1em; color: #94a3b8; font-weight: 700; line-height: 1; }
            .cel-section-body { padding: 16px 18px; }
            .cel-info-row { margin-bottom: 12px; line-height: 1.5; font-size: 0.92em; }
            .cel-info-row ul { margin: 4px 0 0 0; padding-left: 20px; }
            .cel-info-row li { margin-bottom: 3px; }
            .cel-red-flags { background: #fef2f2; border-radius: 8px; padding: 10px 14px; border: 1px solid #fecaca; }
            .cel-red-flags strong { display: flex; align-items: center; gap: 6px; }
            .cel-red-flags svg { flex-shrink: 0; }
            .cel-key-findings { border-color: #a7f3d0; }
            .cel-key-findings .cel-section-title { background: #ecfdf5; color: #065f46; }
            .cel-pearl-list li { margin-bottom: 8px; line-height: 1.5; font-size: 0.92em; color: #065f46; }

            /* Exam Subsections (nested collapsible) */
            .cel-subsection { border: 1px solid #f1f5f9; border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
            .cel-subsection-title { padding: 10px 14px; font-size: 0.9em; font-weight: 600; color: #475569; cursor: pointer; background: #fafbfc; display: flex; align-items: center; gap: 6px; user-select: none; }
            .cel-subsection-title:hover { background: #f1f5f9; }
            .cel-subsection-title svg { flex-shrink: 0; }
            .cel-sub-count { background: #e2e8f0; color: #64748b; padding: 1px 6px; border-radius: 8px; font-size: 0.75em; font-weight: 500; margin-left: 4px; }
            .cel-subsection-body { padding: 10px 14px; }
            .cel-subsection-body ul { margin: 0; padding-left: 18px; }
            .cel-subsection-body li { margin-bottom: 4px; font-size: 0.88em; line-height: 1.4; }

            /* Tables */
            .cel-table-wrapper { overflow-x: auto; }
            .cel-table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
            .cel-table th { background: #f1f5f9; padding: 8px 10px; text-align: left; font-weight: 600; color: #334155; border-bottom: 2px solid #e2e8f0; white-space: nowrap; }
            .cel-table td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; }
            .cel-row-abnormal { background: #fff7ed; }
            .cel-row-abnormal td { color: #c2410c; font-weight: 500; }

            /* Special Tests */
            .cel-special-test { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px; }
            .cel-test-name { font-weight: 700; color: #1e293b; margin-bottom: 4px; font-size: 0.95em; }
            .cel-test-stats { font-weight: 400; color: #64748b; font-size: 0.85em; }
            .cel-test-technique { font-size: 0.88em; color: #475569; margin-bottom: 3px; }
            .cel-test-positive { font-size: 0.88em; color: #0d9488; }

            /* Exam Builder */
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
            .cel-built-header { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #e2e8f0; }
            .cel-built-header h3 { margin: 0 0 6px; }
            .cel-built-header p { margin: 0 0 10px; color: #64748b; font-size: 0.9em; }
            .cel-copy-btn { padding: 6px 14px; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 0.85em; display: inline-flex; align-items: center; gap: 6px; }
            .cel-copy-btn:hover { background: #e2e8f0; }
            .cel-built-section { margin-bottom: 20px; }
            .cel-built-section h4 { margin: 0 0 10px; color: #0f172a; font-size: 1em; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
            .cel-built-section ul { padding-left: 20px; margin: 0; }
            .cel-built-section li { margin-bottom: 8px; font-size: 0.9em; line-height: 1.4; }
            .cel-dx-tags { display: inline-flex; gap: 4px; flex-wrap: wrap; margin-top: 4px; }
            .cel-dx-tag { background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; font-size: 0.7em; font-weight: 600; white-space: nowrap; }
        `;
    }
}

const clinicalExamLabInstance = new ClinicalExamLabModule();
export default {
    generateContent() { return clinicalExamLabInstance.generateContent(); },
    initialize() { clinicalExamLabInstance.initialize(); }
};
