// PGYSelector.js
// Handles PGY Level Logic

export class PGYSelector {
    constructor(store) {
        this.store = store;
        this.competencyData = {
            'pgy2': {
                title: '📚 PGY-2 Foundation',
                description: 'Levels 1-2: Basic understanding and supervised performance'
            },
            'pgy3': {
                title: '🎯 PGY-3 Independent',
                description: 'Levels 1-3: Independent evaluation and interpretation'
            },
            'pgy4': {
                title: '⭐ PGY-4 Advanced',
                description: 'Levels 1-4: Complete independent practice'
            },
            'all': {
                title: '📋 All Content',
                description: 'Complete competency levels 1-5'
            }
        };

        // Listen for state changes
        this.store.subscribe((state, key, value) => {
            if (key === 'pgyLevel') {
                this.updateUI(value);
            }
        });
    }

    // Called when a user clicks a PGY button
    select(pgyLevel) {
        console.log(`🧠 PGYSelector: User selected ${pgyLevel}`);
        this.store.setPGYLevel(pgyLevel);
    }

    // Updates UI elements based on the level
    updateUI(pgyLevel) {
        console.log(`🎨 PGYSelector: Updating UI for ${pgyLevel}`);

        // 1. Update Competency Info Sidebar
        this.updateCompetencyInfo(pgyLevel);

        // 2. Filter Content
        this.filterContent(pgyLevel);

        // 3. Highlight Sidebar Buttons
        this.highlightButtons(pgyLevel);

        // 4. Show PGY Dashboard (if on the board)
        // Note: DashboardRenderer usually handles the main board, but sidebar logic overlaps.
        // We will coordinate via event or let DashboardRenderer listen independently.
    }

    updateCompetencyInfo(pgyLevel) {
        const competencyInfo = document.getElementById('sidebar-info');
        if (!competencyInfo) return;

        const info = this.competencyData[pgyLevel] || this.competencyData['all'];
        competencyInfo.innerHTML = `
            <div class="info-card">
                <div class="info-title">${info.title}</div>
                <div class="info-text">${info.description}</div>
            </div>
        `;
    }

    highlightButtons(pgyLevel) {
        const pgyButtons = document.querySelectorAll('.sidebar-button');
        pgyButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.pgy === pgyLevel) {
                button.classList.add('active');
            }
        });
    }

    filterContent(pgyLevel) {
        const maxCompetencyLevel = {
            'pgy2': 2,
            'pgy3': 3,
            'pgy4': 4,
            'all': 5
        };

        const maxLevel = maxCompetencyLevel[pgyLevel] || 5;

        // Find all content with competency-level data attributes
        const competencyElements = document.querySelectorAll('[data-competency-level]');
        competencyElements.forEach(element => {
            const elementLevel = parseInt(element.dataset.competencyLevel);
            const shouldShow = elementLevel <= maxLevel;

            element.style.display = shouldShow ? '' : 'none';
            if (shouldShow && pgyLevel !== 'all') {
                element.classList.add('filtered-content');
            } else {
                element.classList.remove('filtered-content');
            }
        });

        // Senior resident content
        const seniorContent = document.querySelectorAll('.senior-navigation, .senior-tab, [data-senior-level="true"]');
        const showSenior = pgyLevel === 'pgy4' || pgyLevel === 'all';
        seniorContent.forEach(el => el.style.display = showSenior ? '' : 'none');

        console.log(`Filtered content for ${pgyLevel} (max level: ${maxLevel})`);
    }
}

// Global instance attached in Initialization.js, but exported here
