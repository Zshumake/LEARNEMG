
import { MuscleDatabase } from '../../data/MuscleDatabase.js';
import { registerAction } from '../../utils/ActionBus.js';
import logger from '../../utils/Logger.js';

// Sub-region mapping for "By Region" grouping
const REGION_MAP = {
    UE: {
        'Shoulder & Scapular': ['Trapezius', 'Rhomboid', 'Serratus', 'Supraspinatus', 'Infraspinatus', 'Subscapularis', 'Teres', 'Pectoralis', 'Latissimus', 'Deltoid', 'Levator'],
        'Arm': ['Biceps', 'Brachialis', 'Coracobrachialis', 'Triceps', 'Anconeus'],
        'Forearm': ['Pronator', 'Flexor carpi', 'Flexor digitorum', 'Flexor pollicis', 'Palmaris', 'Brachioradialis', 'Extensor carpi', 'Extensor digitorum', 'Extensor pollicis', 'Extensor indicis', 'Abductor pollicis longus', 'Supinator'],
        'Hand': ['Abductor pollicis brevis', 'Opponens', 'First dorsal', 'Adductor pollicis', 'Abductor digiti', 'Flexor digiti', 'Inteross', 'Lumbrical']
    },
    LE: {
        'Hip & Gluteal': ['Gluteus', 'Piriformis', 'Iliopsoas', 'Tensor', 'Pectineus'],
        'Thigh': ['Rectus femoris', 'Vastus', 'Sartorius', 'Adductor', 'Obturator', 'Gracilis', 'Biceps femoris', 'Semitendinosus', 'Semimembranosus'],
        'Leg': ['Tibialis', 'Extensor hallucis', 'Extensor digitorum longus', 'Peroneus', 'Gastrocnemius', 'Soleus', 'Plantaris', 'Popliteus', 'Flexor digitorum longus', 'Flexor hallucis longus'],
        'Foot': ['Extensor digitorum brevis', 'Abductor hallucis', 'Flexor digitorum brevis', 'Abductor digiti minimi pedis', 'Inteross']
    }
};

function getSubRegion(muscleName, regionCode) {
    const map = REGION_MAP[regionCode] || {};
    for (const [subRegion, keywords] of Object.entries(map)) {
        if (keywords.some(kw => muscleName.toLowerCase().includes(kw.toLowerCase()))) return subRegion;
    }
    return 'Other';
}

export class StudyCardsModule {
    constructor() {
        this.muscleDatabase = MuscleDatabase;
        this.currentRegion = 'lower';
        this.currentAnatomyType = 'nerve';
        this.groupBy = 'nerve';
        this.searchQuery = '';
        this.expandedGroups = new Set();
        this.showAll = true;            // groups expanded by default
        this.revealMode = 'browse';     // 'browse' = all info visible; 'quiz' = click-to-reveal

        this.launch = this.launch.bind(this);
        this.switchAnatomy = this.switchAnatomy.bind(this);
        this.displayMuscles = this.displayMuscles.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
        this.globalRevealAll = this.globalRevealAll.bind(this);
        this.globalRevealType = this.globalRevealType.bind(this);

        this.initGlobalBindings();
    }

    initGlobalBindings() {
        window.MuscleAnatomy = this;
        window.showStudyCards = this.launch;

        // Uses polling helper because this constructor runs BEFORE
        // Initialization.js defines window._registerAction
        registerAction('studyCards:switchAnatomy', (el) => {
            this.switchAnatomy(el.getAttribute('data-region'));
        });
        registerAction('studyCards:toggleDetail', (el) => {
            this.toggleDetail(el.getAttribute('data-muscle'), el.getAttribute('data-type'));
        });
        registerAction('studyCards:globalRevealAll', () => this.globalRevealAll());
        registerAction('studyCards:globalRevealType', (el) => {
            this.globalRevealType(el.getAttribute('data-type'));
        });
        registerAction('studyCards:setGroupBy', (el) => {
            this.setGroupBy(el.getAttribute('data-mode'));
        });
        registerAction('studyCards:toggleGroup', (el) => {
            this.toggleGroup(el.getAttribute('data-group'));
        });
        registerAction('studyCards:toggleShowAll', () => this.toggleShowAll());
        registerAction('studyCards:setRevealMode', (el) => this.setRevealMode(el.getAttribute('data-mode')));
        registerAction('closeStudyCardModal', () => {
            document.querySelector('.learning-modal-overlay.active')?.remove();
        });
    }

    toggleShowAll() {
        this.showAll = !this.showAll;
        const btn = document.getElementById('muscle-show-all-btn');
        if (btn) {
            btn.textContent = this.showAll ? 'Collapse All' : 'Expand All Muscles';
            btn.classList.toggle('active', this.showAll);
        }
        this.displayMuscles(this.currentRegion);
    }

    // --- Search & Grouping ---

    filterBySearch(value) {
        this.searchQuery = value.trim().toLowerCase();
        this.displayMuscles(this.currentRegion);
    }

    setGroupBy(mode) {
        this.groupBy = mode;
        this.expandedGroups.clear();
        document.querySelectorAll('.group-by-pill').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
        this.displayMuscles(this.currentRegion);
    }

    toggleGroup(groupName) {
        const body = document.getElementById(`mg-body-${this.slugify(groupName)}`);
        const chevron = document.getElementById(`mg-chev-${this.slugify(groupName)}`);
        if (!body) return;
        const isHidden = body.style.display === 'none';
        body.style.display = isHidden ? 'block' : 'none';
        if (chevron) chevron.textContent = isHidden ? '-' : '+';
        if (isHidden) this.expandedGroups.add(groupName); else this.expandedGroups.delete(groupName);
    }

    slugify(str) { return str.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(); }

    groupMuscles(muscles, regionCode) {
        const groups = {};
        muscles.forEach(([name, data]) => {
            let keys = [];
            switch (this.groupBy) {
                case 'nerve': keys = [data.peripheralNerve || data.nerve || 'Unknown']; break;
                case 'root': keys = data.roots || ['Unknown']; break;
                case 'region': keys = [getSubRegion(name, regionCode)]; break;
                case 'cord': keys = [data.cord || 'N/A']; break;
                default: keys = ['All'];
            }
            keys.forEach(key => {
                if (!groups[key]) groups[key] = [];
                groups[key].push([name, data]);
            });
        });
        // Sort groups
        const sorted = Object.entries(groups).sort(([a], [b]) => {
            if (this.groupBy === 'root') {
                const order = ['C3','C4','C5','C6','C7','C8','T1','L1','L2','L3','L4','L5','S1','S2','S3'];
                return (order.indexOf(a) === -1 ? 99 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 99 : order.indexOf(b));
            }
            return a.localeCompare(b);
        });
        return sorted;
    }

    // --- Launch & Display ---

    launch() {
        logger.log('Launching Advanced Muscle Study Lab...');
        const content = this.generateUI();
        const activeCandylandModal = document.querySelector('.learning-modal-overlay.active .learning-modal');

        if (activeCandylandModal) {
            activeCandylandModal.innerHTML = `
                <div style="padding: 25px; border-bottom: 2px solid #e5e7eb; background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 15px 15px 0 0; position: relative;">
                    <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">Advanced Muscle Study Lab</h2>
                    <button class="modal-close-btn" data-action="closeStudyCardModal" style="position: absolute; top: 20px; right: 20px; background: #ef4444; color: white; border: none; font-size: 20px; cursor: pointer; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">x</button>
                </div>
                <div style="padding: 30px; background: white; border-radius: 0 0 15px 15px; overflow-y: auto; max-height: 80vh;">
                    ${content}
                </div>
            `;
        } else if (window.showModal) {
            window.showModal('Advanced Muscle Study Lab', content);
        } else {
            logger.error("showModal not available");
        }

        setTimeout(() => this.initializeDisplay(), 500);
    }

    initializeDisplay() {
        this.displayMuscles('lower');
    }

    generateUI() {
        const count = Object.keys(this.muscleDatabase).length;
        return `
            <style>
                .muscle-lab-hero {
                    background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6, #14b8a6);
                    background-size: 300% 300%;
                    animation: gradient-shift 15s ease infinite;
                    border-radius: 25px; padding: 30px 40px; margin: 20px 0 12px;
                    text-align: center; color: white;
                    box-shadow: 0 10px 30px rgba(20, 184, 166, 0.3);
                    position: relative;
                }
                @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

                /* Sticky selection bar -- ONLY the region tabs + search are
                   pinned. Keeps the most-frequently-changed controls always
                   accessible without burning ~3 rows of screen on the
                   set-and-forget config (Mode / Group-by / Reveal). */
                .muscle-toolbar-pinned {
                    position: sticky; top: 0; z-index: 20;
                    background: rgba(255,255,255,0.97);
                    backdrop-filter: blur(8px);
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 10px 14px;
                    margin-bottom: 10px;
                    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
                }

                /* Non-sticky config -- scrolls away with the page so the
                   card grid gets the full screen once the user starts
                   scrolling through results. */
                .muscle-toolbar-config {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 10px 14px 8px;
                    margin-bottom: 14px;
                    display: flex; flex-direction: column; gap: 8px;
                }
                .toolbar-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; align-items: center; }
                .toolbar-label { font-size: 0.72rem; font-weight: 700; color: #64748b; letter-spacing: 0.06em; text-transform: uppercase; margin-right: 4px; }

                /* Cards */
                .muscle-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
                .muscle-card-interactive { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; transition: all 0.2s; }
                .muscle-card-interactive:hover { border-color: #14b8a6; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(20, 184, 166, 0.12); }
                .muscle-name { font-size: 1rem; margin: 0 0 10px 0; color: #0f766e; font-weight: 700; line-height: 1.25; }

                /* Browse-mode info rows (always visible) */
                .muscle-info-grid { display: grid; grid-template-columns: 1fr; gap: 6px; }
                .info-row { display: grid; grid-template-columns: 90px 1fr; gap: 8px; align-items: baseline; font-size: 0.85rem; padding: 4px 0; border-bottom: 1px dashed #f1f5f9; }
                .info-row:last-child { border-bottom: none; }
                .info-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #64748b; padding: 2px 8px; border-radius: 10px; background: #f8fafc; text-align: center; }
                .info-label.nerve-label { color: #0369a1; background: #e0f2fe; }
                .info-label.roots-label { color: #7c3aed; background: #f5f3ff; }
                .info-label.cord-label { color: #c2410c; background: #fff7ed; }
                .info-label.actions-label { color: #0d9488; background: #f0fdfa; }
                .info-value { color: #1e293b; font-weight: 500; line-height: 1.4; }

                /* Quiz-mode buttons + reveal panels */
                .muscle-btn { padding: 5px 10px; border: 1px solid #ccfbf1; border-radius: 6px; background: #f0fdfa; color: #0d9488; cursor: pointer; font-size: 0.8rem; }
                .muscle-btn.active { background: #0d9488; color: white; border-color: #0d9488; }
                .muscle-detail { margin-top: 8px; padding: 8px 10px; background: #f0f9ff; border-left: 3px solid #0ea5e9; border-radius: 4px; font-size: 0.85rem; }

                /* Shared pill buttons */
                .global-reveal-btn { padding: 7px 14px; border-radius: 20px; border: none; background: #e2e8f0; color: #475569; cursor: pointer; font-weight: 600; font-size: 0.82rem; }
                .global-reveal-btn:hover { background: #cbd5e1; }
                .region-btn { padding: 8px 18px; border-radius: 22px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 600; cursor: pointer; font-size: 0.85rem; }
                .region-btn.active { border-color: #14b8a6; color: #0d9488; background: #f0fdfa; }

                /* Search */
                .muscle-search-wrap { max-width: 520px; flex: 1 1 260px; position: relative; }
                .muscle-search-input { width: 100%; padding: 10px 14px 10px 36px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 0.9rem; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
                .muscle-search-input:focus { border-color: #14b8a6; }
                .muscle-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; }

                /* Group-by & action pills */
                .group-by-pill { padding: 7px 14px; border-radius: 20px; border: 2px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; font-weight: 600; font-size: 0.8rem; transition: all 0.15s; }
                .group-by-pill.active { border-color: #8b5cf6; color: #7c3aed; background: #f5f3ff; }
                .group-by-pill:hover { border-color: #a78bfa; }
                .show-all-pill { border-color: #14b8a6; color: #0d9488; background: #f0fdfa; }
                .show-all-pill:hover { border-color: #0d9488; }
                .show-all-pill.active { background: #0d9488; color: white; border-color: #0d9488; }

                /* Browse vs Quiz mode toggle */
                .reveal-mode-btn { padding: 7px 14px; border-radius: 20px; border: 2px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; font-weight: 600; font-size: 0.8rem; transition: all 0.15s; }
                .reveal-mode-btn.active { border-color: #0ea5e9; color: #0369a1; background: #e0f2fe; }
                .reveal-mode-btn:hover { border-color: #7dd3fc; }

                /* Groups */
                .muscle-group { margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; }
                .muscle-group-header { display: flex; align-items: center; padding: 12px 16px; background: #f8fafc; cursor: pointer; transition: background 0.2s; gap: 10px; user-select: none; }
                .muscle-group-header:hover { background: #f0fdfa; }
                .group-name { font-weight: 700; font-size: 0.95rem; color: #1e293b; flex: 1; }
                .group-count { background: #f0fdfa; color: #0d9488; padding: 2px 10px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; }
                .group-chevron { width: 28px; height: 28px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #64748b; font-size: 1rem; transition: all 0.2s; }
                .muscle-group-body { padding: 14px; background: white; }
                .muscle-no-results { text-align: center; padding: 40px; color: #94a3b8; font-size: 1rem; }

                @media (max-width: 640px) {
                    .info-row { grid-template-columns: 80px 1fr; font-size: 0.82rem; }
                }
            </style>

            <div class="muscle-lab-hero">
                <button data-action="backToMuscleMenu" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; padding: 8px 16px; border-radius: 20px; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg> Menu
                </button>
                <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                </div>
                <h2 style="margin: 0 0 6px;">Advanced Muscle Laboratory</h2>
                <p style="margin: 0; opacity: 0.8;">Comprehensive Muscle Database</p>
                <div style="display: flex; justify-content: center; gap: 30px; margin-top: 16px;">
                    <div><strong>${count}</strong> Muscles</div>
                </div>
            </div>

            <div id="cards-tab-content">
                <!-- Pinned: region tabs + search. The frequently-touched
                     controls follow the user; everything else scrolls away. -->
                <div class="muscle-toolbar-pinned">
                    <div class="toolbar-row">
                        <button class="region-btn active" data-region="lower" data-action="studyCards:switchAnatomy">Lower Extremity</button>
                        <button class="region-btn" data-region="upper" data-action="studyCards:switchAnatomy">Upper Extremity</button>
                        <div class="muscle-search-wrap">
                            <svg class="muscle-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" class="muscle-search-input" placeholder="Search muscles, nerves, or roots..." oninput="window.MuscleAnatomy.filterBySearch(this.value)">
                        </div>
                    </div>
                </div>

                <!-- Scrollable config: set-and-forget, no need to follow the
                     user down the page. Scroll up to change. -->
                <div class="muscle-toolbar-config">
                    <div class="toolbar-row">
                        <span class="toolbar-label">Mode</span>
                        <button class="reveal-mode-btn active" data-mode="browse" data-action="studyCards:setRevealMode">Browse (all info)</button>
                        <button class="reveal-mode-btn" data-mode="quiz" data-action="studyCards:setRevealMode">Quiz (click to reveal)</button>
                    </div>

                    <div class="toolbar-row">
                        <span class="toolbar-label">Group by</span>
                        <button class="group-by-pill active" data-mode="nerve" data-action="studyCards:setGroupBy">Nerve</button>
                        <button class="group-by-pill" data-mode="root" data-action="studyCards:setGroupBy">Root</button>
                        <button class="group-by-pill" data-mode="region" data-action="studyCards:setGroupBy">Region</button>
                        <button class="group-by-pill" data-mode="cord" data-action="studyCards:setGroupBy">Cord/Trunk</button>
                        <button id="muscle-show-all-btn" class="group-by-pill show-all-pill active" data-action="studyCards:toggleShowAll">Collapse All</button>
                    </div>

                    <!-- Quiz-mode only: global reveal shortcuts, hidden in browse mode -->
                    <div id="global-reveal-row" class="toolbar-row" style="display: none;">
                        <span class="toolbar-label">Reveal</span>
                        <button class="global-reveal-btn" data-action="studyCards:globalRevealAll">All</button>
                        <button class="global-reveal-btn" data-action="studyCards:globalRevealType" data-type="nerve">Nerves</button>
                        <button class="global-reveal-btn" data-action="studyCards:globalRevealType" data-type="roots">Roots</button>
                        <button class="global-reveal-btn" data-action="studyCards:globalRevealType" data-type="cord">Cords</button>
                        <button class="global-reveal-btn" data-action="studyCards:globalRevealType" data-type="actions">Actions</button>
                    </div>
                </div>

                <div id="muscle-anatomy-display"></div>
            </div>
        `;
    }

    switchAnatomy(region) {
        this.currentRegion = region;
        this.expandedGroups.clear();
        this.displayMuscles(region);
        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-region="${region}"]`)?.classList.add('active');
    }

    displayMuscles(region) {
        const display = document.getElementById('muscle-anatomy-display');
        if (!display) return;

        const regionCode = region === 'upper' ? 'UE' : 'LE';
        let muscles = Object.entries(this.muscleDatabase).filter(([_, d]) => d.region === regionCode);

        // Apply search filter
        if (this.searchQuery) {
            muscles = muscles.filter(([name, data]) => {
                const haystack = [name, data.peripheralNerve || '', data.nerve || '', (data.roots || []).join(' '), data.cord || '', data.actions || ''].join(' ').toLowerCase();
                return haystack.includes(this.searchQuery);
            });
        }

        if (muscles.length === 0) {
            const escaped = this.searchQuery.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            display.innerHTML = `<div class="muscle-no-results">No muscles match "${escaped}"</div>`;
            return;
        }

        const groups = this.groupMuscles(muscles, regionCode);

        display.innerHTML = groups.map(([groupName, groupMuscles]) => {
            const slug = this.slugify(groupName);
            const isExpanded = this.showAll || this.expandedGroups.has(groupName) || this.searchQuery.length > 0;
            return `
                <div class="muscle-group">
                    <div class="muscle-group-header" data-action="studyCards:toggleGroup" data-group="${groupName}">
                        <span class="group-name">${groupName}</span>
                        <span class="group-count">${groupMuscles.length} muscle${groupMuscles.length !== 1 ? 's' : ''}</span>
                        <span class="group-chevron" id="mg-chev-${slug}">${isExpanded ? '-' : '+'}</span>
                    </div>
                    <div class="muscle-group-body" id="mg-body-${slug}" style="display: ${isExpanded ? 'block' : 'none'};">
                        <div class="muscle-grid">
                            ${groupMuscles.map(([name, data]) => this.renderMuscleCard(name, data)).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderMuscleCard(name, data) {
        const nerve = data.peripheralNerve || 'N/A';
        const roots = (data.roots || []).join(', ') || 'N/A';
        const cord = data.cord || 'N/A';
        const actions = data.actions || 'N/A';

        if (this.revealMode === 'browse') {
            // Browse mode: all info visible in a clean labeled grid — no clicking required.
            return `
                <div class="muscle-card-interactive browse" data-muscle="${name}">
                    <h4 class="muscle-name">${name}</h4>
                    <div class="muscle-info-grid">
                        <div class="info-row"><span class="info-label nerve-label">Nerve</span><span class="info-value">${nerve}</span></div>
                        <div class="info-row"><span class="info-label roots-label">Roots</span><span class="info-value">${roots}</span></div>
                        <div class="info-row"><span class="info-label cord-label">Cord/Trunk</span><span class="info-value">${cord}</span></div>
                        <div class="info-row"><span class="info-label actions-label">Actions</span><span class="info-value">${actions}</span></div>
                    </div>
                </div>
            `;
        }

        // Quiz mode: click-to-reveal for self-testing.
        return `
            <div class="muscle-card-interactive quiz" data-muscle="${name}">
                <h4 class="muscle-name">${name}</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px;">
                    <button class="muscle-btn nerve" data-action="studyCards:toggleDetail" data-muscle="${name}" data-type="nerve">Nerve</button>
                    <button class="muscle-btn roots" data-action="studyCards:toggleDetail" data-muscle="${name}" data-type="roots">Roots</button>
                    <button class="muscle-btn cord" data-action="studyCards:toggleDetail" data-muscle="${name}" data-type="cord">Cord</button>
                    <button class="muscle-btn actions" data-action="studyCards:toggleDetail" data-muscle="${name}" data-type="actions">Actions</button>
                </div>
                <div class="muscle-detail" data-type="nerve" style="display: none;"><strong>Nerve:</strong> ${nerve}</div>
                <div class="muscle-detail" data-type="roots" style="display: none;"><strong>Roots:</strong> ${roots}</div>
                <div class="muscle-detail" data-type="cord" style="display: none;"><strong>Cord/Trunk:</strong> ${cord}</div>
                <div class="muscle-detail" data-type="actions" style="display: none;"><strong>Actions:</strong> ${actions}</div>
            </div>
        `;
    }

    setRevealMode(mode) {
        this.revealMode = mode === 'quiz' ? 'quiz' : 'browse';
        document.querySelectorAll('.reveal-mode-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.mode === this.revealMode);
        });
        // Only show the global reveal row in Quiz mode.
        const revealRow = document.getElementById('global-reveal-row');
        if (revealRow) revealRow.style.display = this.revealMode === 'quiz' ? 'flex' : 'none';
        this.displayMuscles(this.currentRegion);
    }

    toggleDetail(muscleName, type) {
        const card = Array.from(document.querySelectorAll(`[data-muscle]`)).find(el => el.dataset.muscle === muscleName);
        if (!card) return;
        const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
        const btn = card.querySelector(`.muscle-btn.${type}`);
        if (detail && btn) {
            const isHidden = detail.style.display === 'none';
            detail.style.display = isHidden ? 'block' : 'none';
            btn.classList.toggle('active', isHidden);
        }
    }

    globalRevealType(type) {
        document.querySelectorAll(`.muscle-detail[data-type="${type}"]`).forEach(d => d.style.display = 'block');
        document.querySelectorAll(`.muscle-btn.${type}`).forEach(b => b.classList.add('active'));
    }

    globalRevealAll() {
        document.querySelectorAll('.muscle-detail').forEach(d => d.style.display = 'block');
        document.querySelectorAll('.muscle-btn').forEach(b => b.classList.add('active'));
    }
}
