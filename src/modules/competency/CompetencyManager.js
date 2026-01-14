export class CompetencyManager {
    constructor() {
        this.currentCompetencyArea = 'all';

        // Competency Area Descriptions
        this.competencyDescriptions = {
            'all': {
                title: 'All Competency Areas',
                description: 'Browse all available content across the 7 core EMG/NCS competency areas.'
            },
            'ncs': {
                title: '⚡ NCS - Nerve Conduction Studies',
                description: 'Master nerve conduction study techniques, interpretation, and clinical application. Covers peripheral anatomy, electrode placement, and systematic NCS screening.'
            },
            'radiculopathy': {
                title: '🦴 Radiculopathy Screen',
                description: 'Learn to evaluate nerve root lesions through targeted NCS and EMG studies. Focus on cervical and lumbar radiculopathy patterns.'
            },
            'neuropathy': {
                title: '🔗 Peripheral Neuropathy',
                description: 'Understand peripheral nerve pathology, including diabetic neuropathy, inflammatory conditions, and hereditary neuropathies.'
            },
            'neuropathy-vs-myopathy': {
                title: '🔍 Neuropathy vs Myopathy',
                description: 'Develop skills to differentiate between nerve and muscle pathology using targeted EMG studies and clinical correlation.'
            },
            'discharges': {
                title: '📊 Spontaneous Discharges & Recruitment',
                description: 'Master audio/visual recognition of abnormal EMG activity: fibrillations, positive sharp waves, fasciculations, and recruitment patterns.'
            },
            'plexus': {
                title: '🕸️ Brachial & Lumbosacral Plexus',
                description: 'Understand complex plexus anatomy, nerve root organization, and systematic evaluation of plexus lesions.'
            },
            'reports': {
                title: '📝 EMG Report Writing',
                description: 'Learn to write professional, clinically useful EMG reports with appropriate differential diagnoses and recommendations.'
            }
        };

        this.competencyNames = {
            'ncs': 'NCS Technique',
            'radiculopathy': 'Radiculopathy Screen',
            'neuropathy': 'Peripheral Neuropathy',
            'differential': 'Neuropathy vs Myopathy',
            'emg-patterns': 'EMG Pattern Recognition',
            'plexus': 'Plexus Anatomy',
            'reporting': 'EMG Report Writing'
        };

        // Alias for legacy/internal consistency
        this.updateProgressDashboard = this.updateDashboard.bind(this);
    }

    initialize() {
        // Initialize interactions after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.setupProgressInteractions();

            // Load and display saved progress
            this.updateDashboard();
        }, 100);
    }

    // --- Competency Area Selection ---

    selectArea(competencyArea) {
        this.currentCompetencyArea = competencyArea;

        // Update button styles
        const competencyTabs = document.querySelectorAll('.competency-tab');
        competencyTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.competency === competencyArea) {
                tab.classList.add('active');
            }
        });

        // Update info display and filter
        this.updateAreaInfo(competencyArea);
        this.filterContentByArea(competencyArea);

        console.log(`Selected competency area: ${competencyArea}`);
    }

    updateAreaInfo(area) {
        const areaInfo = document.getElementById('competency-area-info');
        if (!areaInfo) return;

        const info = this.competencyDescriptions[area] || this.competencyDescriptions['all'];
        areaInfo.innerHTML = `
            <div class="area-description">
                <h4>${info.title}</h4>
                <p>${info.description}</p>
            </div>
        `;
    }

    filterContentByArea(area) {
        const competencyElements = document.querySelectorAll('[data-competency-area]');
        competencyElements.forEach(element => {
            const elementArea = element.dataset.competencyArea;
            const shouldShow = area === 'all' || elementArea === area;
            element.style.display = shouldShow ? '' : 'none';
        });
        console.log(`Filtered content for competency area: ${area}`);
    }

    toggleNavigation(show = true) {
        const competencyNav = document.getElementById('competency-navigation');
        if (!competencyNav) return;

        if (show) {
            competencyNav.style.display = 'block';
            competencyNav.classList.add('visible');
        } else {
            competencyNav.style.display = 'none';
            competencyNav.classList.remove('visible');
        }
    }

    // --- Progress Tracking ---

    getProgress() {
        const defaultProgress = {
            'ncs': 0,
            'radiculopathy': 0,
            'neuropathy': 0,
            'differential': 0,
            'emg-patterns': 0,
            'plexus': 0,
            'reporting': 0
        };

        const savedProgress = localStorage.getItem('competencyProgress');
        if (savedProgress) {
            return { ...defaultProgress, ...JSON.parse(savedProgress) };
        }
        return defaultProgress;
    }

    updateDashboard() {
        // Also named updateProgressDashboard in legacy
        const progress = this.getProgress();
        const competencyCards = document.querySelectorAll('.competency-card');

        competencyCards.forEach(card => {
            const competency = card.dataset.competency;
            const competencyProgress = progress[competency] || 0;

            // Update level indicators
            const levelIndicators = card.querySelectorAll('.level-indicator');
            levelIndicators.forEach(indicator => {
                const level = parseInt(indicator.dataset.level);
                indicator.classList.remove('achieved', 'current');

                if (level <= competencyProgress) {
                    indicator.classList.add('achieved');
                } else if (level === competencyProgress + 1) {
                    indicator.classList.add('current');
                }
            });

            // Update progress bar
            const progressFill = card.querySelector('.progress-fill');
            if (progressFill) {
                const progressPercentage = (competencyProgress / 5) * 100;
                progressFill.style.width = `${progressPercentage}%`;
                progressFill.dataset.progress = competencyProgress;
            }
        });

        this.updateOverallProgress(progress);
    }

    updateLevel(competency, level) {
        const progress = this.getProgress();
        progress[competency] = Math.max(progress[competency], level);

        localStorage.setItem('competencyProgress', JSON.stringify(progress));
        this.updateDashboard();
        this.showAchievementNotification(competency, level);
    }

    updateOverallProgress(progress) {
        const progressValues = Object.values(progress);
        const totalProgress = progressValues.reduce((sum, val) => sum + val, 0);
        const maxProgress = progressValues.length * 5; // 7 competencies * 5 levels

        const overallPercentage = (totalProgress / maxProgress) * 100;
        const overallFill = document.getElementById('overallProgressFill');
        const completedSpan = document.getElementById('completedCompetencies');

        if (overallFill) {
            overallFill.style.width = `${overallPercentage}%`;
        }

        if (completedSpan) {
            // Target levels are unified now, default to Level 2 for 'completed' status
            const targetLevel = 2;
            let completedCount = 0;

            Object.entries(progress).forEach(([competency, level]) => {
                if (level >= targetLevel) {
                    completedCount++;
                }
            });

            completedSpan.textContent = completedCount;
        }
    }

    getTargetLevelsForPGY(pgyLevel) {
        const targetLevels = {
            'pgy2': { 'ncs': 2, 'radiculopathy': 2, 'neuropathy': 2, 'differential': 2, 'emg-patterns': 2, 'plexus': 2, 'reporting': 2 },
            'pgy3': { 'ncs': 3, 'radiculopathy': 3, 'neuropathy': 3, 'differential': 3, 'emg-patterns': 3, 'plexus': 3, 'reporting': 3 },
            'pgy4': { 'ncs': 4, 'radiculopathy': 4, 'neuropathy': 4, 'differential': 4, 'emg-patterns': 4, 'plexus': 4, 'reporting': 4 }
        };

        return targetLevels[pgyLevel] || {};
    }

    showAchievementNotification(competency, level) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
                <div class="achievement-content">
                    <span class="achievement-icon">🎉</span>
                    <div class="achievement-text">
                        <strong>Level ${level} Achieved!</strong>
                        <br>${this.competencyNames[competency] || competency}
                    </div>
                </div>
            `;

        // Add styles if needed (legacy code added them dynamically check if exists)
        if (!document.querySelector('.achievement-notification-styles')) {
            const styles = document.createElement('style');
            styles.className = 'achievement-notification-styles';
            styles.textContent = `
                    .achievement-notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, #6b9f78, #4a6d52);
                        color: white;
                        padding: 15px 20px;
                        border-radius: 10px;
                        box-shadow: 0 8px 25px rgba(107, 159, 120, 0.3);
                        z-index: 1000;
                        animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-in 3s;
                        animation-fill-mode: both;
                    }
                    .achievement-content { display: flex; align-items: center; gap: 12px; }
                    .achievement-icon { font-size: 1.5em; }
                    @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                    @keyframes fadeOut { to { opacity: 0; transform: translateX(100%); } }
                `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
        }, 4000);
    }

    setupProgressInteractions() {
        document.querySelectorAll('.level-indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const level = parseInt(indicator.dataset.level);
                const competencyCard = indicator.closest('.competency-card');
                if (competencyCard) {
                    const competency = competencyCard.dataset.competency;
                    this.updateLevel(competency, level);
                }
            });
        });
    }
}
