
import { MuscleDatabase } from '../../data/MuscleDatabase.js';
import logger from '../../utils/Logger.js';

export class StudyCardsModule {
    constructor() {
        this.muscleDatabase = MuscleDatabase;
        this.currentRegion = 'lower';
        this.currentAnatomyType = 'nerve';

        // Bind high-level methods
        this.launch = this.launch.bind(this);
        this.switchAnatomy = this.switchAnatomy.bind(this);
        this.displayMuscles = this.displayMuscles.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
        this.globalRevealAll = this.globalRevealAll.bind(this);
        this.globalRevealType = this.globalRevealType.bind(this);

        // Expose globally for HTML onclicks
        this.initGlobalBindings();
    }

    initGlobalBindings() {
        window.MuscleAnatomy = this;
        window.showStudyCards = this.launch;
    }

    launch() {
        logger.log('🧬 Launching Advanced Muscle Study Lab...');

        const content = this.generateUI();

        // 1. Candyland Core Integration Check: If we are already inside a Candyland modal, inject directly into it.
        const activeCandylandModal = document.querySelector('.learning-modal-overlay.active .learning-modal');

        if (activeCandylandModal) {
            logger.log('🧬 Injecting directly into active Candyland module...');

            // Overwrite the entire inner modal to remove the header and close button, providing a unified experience.
            activeCandylandModal.innerHTML = `
                <div style="padding: 25px; border-bottom: 2px solid #e5e7eb; background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 15px 15px 0 0; position: relative;">
                    <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">🧬 Advanced Muscle Study Lab</h2>
                    <button class="modal-close-btn" onclick="document.querySelector('.learning-modal-overlay.active').remove()" style="position: absolute; top: 20px; right: 20px; background: #ef4444; color: white; border: none; font-size: 20px; cursor: pointer; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: all 0.2s;">×</button>
                </div>
                <div style="padding: 30px; background: white; border-radius: 0 0 15px 15px; overflow-y: auto; max-height: 80vh;">
                    ${content}
                </div>
            `;
        }
        // 2. Fallback to global modal if launched outside Candyland
        else if (window.showModal) {
            window.showModal('🧬 Advanced Muscle Study Lab', content);
        } else {
            logger.error("showModal not available");
        }

        // Initialize after DOM update
        setTimeout(() => {
            this.initializeDisplay();
        }, 500);
    }

    initializeDisplay() {
        this.displayMuscles('lower');
    }

    generateUI() {
        return `
            <style>
                /* Advanced Muscle Lab Styling - Inline for encapsulation */
                .muscle-lab-hero {
                    background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6, #14b8a6);
                    background-size: 300% 300%;
                    animation: gradient-shift 15s ease infinite;
                    border-radius: 25px;
                    padding: 40px;
                    margin: 20px 0;
                    text-align: center;
                    color: white;
                    box-shadow: 0 10px 30px rgba(20, 184, 166, 0.3);
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .muscle-lab-tabs {
                    display: none; /* Tabs hidden since quiz is moved */
                }
                .muscle-tab {
                    padding: 15px 30px; border: none; background: transparent;
                    color: #64748b; font-weight: 600; cursor: pointer; border-radius: 10px;
                    font-size: 1.1rem; flex: 1; transition: all 0.3s;
                }
                .muscle-tab.active {
                    background: linear-gradient(135deg, #14b8a6, #06b6d4);
                    color: white; shadow: 0 4px 15px rgba(20, 184, 166, 0.4);
                }
                .muscle-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }
                .muscle-card-interactive {
                    background: white; border: 2px solid rgba(20, 184, 166, 0.15);
                    border-radius: 12px; padding: 20px; transition: all 0.3s;
                }
                .muscle-card-interactive:hover {
                    border-color: #14b8a6; transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.2);
                }
                .muscle-name {
                    font-size: 1.2rem; margin: 0 0 15px 0;
                    color: #0f766e;
                }
                .muscle-btn {
                    padding: 6px 12px; border: 1px solid #ccfbf1; border-radius: 6px;
                    background: #f0fdfa; color: #0d9488; cursor: pointer;
                    font-size: 0.85rem; margin-right: 5px; margin-bottom: 5px;
                }
                .muscle-btn.active {
                    background: #0d9488; color: white; border-color: #0d9488;
                }
                .muscle-detail {
                    margin-top: 10px; padding: 10px; background: #f0f9ff;
                    border-left: 3px solid #0ea5e9; border-radius: 4px;
                    font-size: 0.9rem;
                }
                .global-reveal-controls {
                    display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
                    margin-bottom: 30px;
                }
                .global-reveal-btn {
                     padding: 10px 20px; border-radius: 20px; border: none;
                     background: #e2e8f0; color: #475569; cursor: pointer; font-weight: 600;
                }
                .global-reveal-btn:hover { background: #cbd5e1; }
                .region-btn {
                    padding: 12px 24px; border-radius: 25px; border: 2px solid #e2e8f0;
                    background: white; color: #64748b; font-weight: 600; cursor: pointer;
                }
                .region-btn.active {
                    border-color: #14b8a6; color: #0d9488; background: #f0fdfa;
                }
            </style>

            <div class="muscle-lab-hero">
                <button onclick="window.backToMuscleMenu()" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); color: white; padding: 8px 16px; border-radius: 20px; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg> Menu
                </button>
                <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                </div>
                <h2>Advanced Muscle Laboratory</h2>
                <p>Comprehensive Muscle Database</p>
                <div style="display: flex; justify-content: center; gap: 30px; margin-top: 20px;">
                    <div><strong>${Object.keys(this.muscleDatabase).length}</strong> Muscles</div>
                    <div><strong>∞</strong> Variations</div>
                </div>
            </div>

            <!-- CARDS TAB -->
            <div id="cards-tab-content" class="tab-content">
                <div style="text-align: center; margin-bottom: 20px; display: flex; justify-content: center; gap: 15px;">
                     <button class="region-btn active" data-region="lower" onclick="MuscleAnatomy.switchAnatomy('lower')" style="display: flex; align-items: center; gap: 8px;">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> Lower Extremity
                     </button>
                     <button class="region-btn" data-region="upper" onclick="MuscleAnatomy.switchAnatomy('upper')" style="display: flex; align-items: center; gap: 8px;">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> Upper Extremity
                     </button>
                </div>

                <div class="global-reveal-controls">
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealAll()" style="display: flex; align-items: center; gap: 6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg> Reveal All</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('nerve')" style="display: flex; align-items: center; gap: 6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Nerves</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('roots')" style="display: flex; align-items: center; gap: 6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg> Roots</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('cord')" style="display: flex; align-items: center; gap: 6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="8"></line><line x1="10" y1="1" x2="10" y2="8"></line><line x1="14" y1="1" x2="14" y2="8"></line></svg> Cords</button>
                    <button class="global-reveal-btn" onclick="MuscleAnatomy.globalRevealType('actions')" style="display: flex; align-items: center; gap: 6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.24l-3.26-3.26"></path></svg> Actions</button>
                </div>

                <div id="muscle-anatomy-display"></div>
            </div>
        `;
    }

    switchAnatomy(region) {
        this.currentRegion = region;
        this.displayMuscles(region);

        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-region="${region}"]`)?.classList.add('active');
    }

    displayMuscles(region) {
        const display = document.getElementById('muscle-anatomy-display');
        if (!display) return;

        const regionCode = region === 'upper' ? 'UE' : 'LE';
        const muscles = Object.entries(this.muscleDatabase).filter(([_, data]) => data.region === regionCode);

        display.innerHTML = `
            <div class="muscle-grid">
                ${muscles.map(([name, data]) => `
                    <div class="muscle-card-interactive" data-muscle="${name}">
                        <h4 class="muscle-name">${name}</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;">
                            <button class="muscle-btn nerve" onclick="MuscleAnatomy.toggleDetail('${name}', 'nerve')">Nerve</button>
                            <button class="muscle-btn roots" onclick="MuscleAnatomy.toggleDetail('${name}', 'roots')">Roots</button>
                            <button class="muscle-btn cord" onclick="MuscleAnatomy.toggleDetail('${name}', 'cord')">Cord</button>
                            <button class="muscle-btn actions" onclick="MuscleAnatomy.toggleDetail('${name}', 'actions')">Actions</button>
                        </div>
                        
                        <div class="muscle-detail" data-type="nerve" style="display: none;">
                            <strong>Nerve:</strong> ${data.peripheralNerve}
                        </div>
                        <div class="muscle-detail" data-type="roots" style="display: none;">
                            <strong>Roots:</strong> ${data.roots.join(', ')}
                        </div>
                        <div class="muscle-detail" data-type="cord" style="display: none;">
                            <strong>Cord/Trunk:</strong> ${data.cord || 'N/A'}
                        </div>
                        <div class="muscle-detail" data-type="actions" style="display: none;">
                            <strong>Actions:</strong> ${data.actions}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    toggleDetail(muscleName, type) {
        const card = Array.from(document.querySelectorAll(`[data-muscle]`)).find(el => el.dataset.muscle === muscleName);
        if (!card) return;

        const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
        const btn = card.querySelector(`.muscle-btn.${type}`);

        if (detail && btn) {
            const isHidden = detail.style.display === 'none';
            detail.style.display = isHidden ? 'block' : 'none';
            if (isHidden) btn.classList.add('active'); else btn.classList.remove('active');
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
