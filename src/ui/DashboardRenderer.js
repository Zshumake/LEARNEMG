// DashboardRenderer.js
// Renders the Learning Board and manages Ernest Character

export class DashboardRenderer {
    constructor(store) {
        this.store = store;
        this.learningModulesConfig = {
            'pgy2': [
                { id: 'intro-emg', title: 'EMG Fundamentals', competency: 'Core Skills', contentId: 'emg-introduction' },
                { id: 'peripheral-anatomy', title: 'Plexus Anatomy', competency: 'Anatomy', contentId: 'plexus-anatomy' },
                { id: 'radiculopathy-patho', title: 'Radiculopathy', competency: 'Pathology', contentId: 'radiculopathy-pathophysiology' },
                { id: 'ncs-basics', title: 'NCS Principles', competency: 'NCS Skills', contentId: 'ncs-fundamentals' }
            ],
            // ... (Full config would be here or imported from a Config module)
            // For brevity in refactor, we rely on the global configuration for now 
            // or pass it in. Assuming global 'learningModulesConfig' exists or we copy it.
        };

        // Listen for updates
        this.store.subscribe((state, key, value) => {
            if (key === 'pgyLevel' || key === 'completedModules') {
                const currentPGY = this.store.getPGYLevel();
                if (currentPGY) {
                    this.render(currentPGY);
                }
            }
        });
    }

    render(pgyLevel) {
        console.log(`🎨 DashboardRenderer: Render disabled (superceded by CandylandCore)`);
        return;

        // console.log(`🎨 DashboardRenderer: Rendering board for ${pgyLevel}`);
        // const boardContainer = document.getElementById('learning-board');
        const boardTitle = document.getElementById('board-title');
        const progressDisplay = document.getElementById('progress-display');

        if (!boardContainer) return; // Not on board page

        // Clear existing
        boardContainer.innerHTML = '';

        // Use global config for now (Legacy Support)
        const modules = window.learningModulesConfig ? window.learningModulesConfig[pgyLevel]
            : (this.learningModulesConfig[pgyLevel] || []);

        if (!modules) return;

        // Render Squares
        modules.forEach((module, index) => {
            const isCompleted = this.store.isModuleCompleted(module.id);
            const isLocked = index > 0 && !this.store.isModuleCompleted(modules[index - 1].id);
            // Default current is first incomplete? Or stored current?
            const isCurrent = false; // Logic to derive current needs stored index

            const square = document.createElement('div');
            square.className = `module-square ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
            square.dataset.index = index;
            square.dataset.id = module.id;

            square.innerHTML = `
                <div class="module-number">${index + 1}</div>
                <div class="module-icon">${this.getIconForCompetency(module.competency)}</div>
                <div class="module-title">${module.title}</div>
            `;

            square.onclick = () => {
                if (!isLocked) {
                    // Direct navigation (Ernest does not move on dashboard)
                    window.openModule(module.id, index);
                }
            };

            boardContainer.appendChild(square);

            // Add connector unless last
            if (index < modules.length - 1) {
                const connector = document.createElement('div');
                connector.className = `path-connector ${isCompleted ? 'active' : ''}`;
                boardContainer.appendChild(connector);
            }
        });

        // Update Header
        if (boardTitle) {
            const pgyNames = { 'pgy2': 'PGY-2 Foundation', 'pgy3': 'PGY-3 Development', 'pgy4': 'PGY-4 Mastery' };
            boardTitle.textContent = `🧠 ${pgyNames[pgyLevel] || 'Learning Journey'}`;
        }

        // Position Ernest
        this.positionErnest();
    }

    getIconForCompetency(competency) {
        const icons = { 'Anatomy': '🦴', 'Core Skills': '⚡', 'Pathology': '🦠', 'NCS Skills': '🔌' };
        return icons[competency] || '📚';
    }

    positionErnest() {
        if (window.appComponents && window.appComponents.ernest) {
            window.appComponents.ernest.position();
        }
    }
}
