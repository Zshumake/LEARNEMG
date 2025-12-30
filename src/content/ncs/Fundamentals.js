
export const NCSFundamentals = {
    generateContent() {
        return window.contentLoader ? window.contentLoader.getHTMLSync('ncs-fundamentals') : '<div class="loading">Loading content...</div>';
    },

    initialize() {
        setTimeout(() => {
            if (window.showNCSSection) {
                window.showNCSSection('fundamentals');
            }
        }, 100);
    },

    showSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.ncs-section');
        sections.forEach(section => section.style.display = 'none');

        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.ncs-tab');
        tabs.forEach(tab => {
            tab.style.background = 'transparent';
            tab.style.color = '#64748b';
            tab.classList.remove('active-ncs-tab');
        });

        // Show selected section
        const selectedSection = document.getElementById('ncs-' + sectionName + '-section');
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Activate selected tab
        const selectedTab = document.getElementById('ncs-' + sectionName + '-tab');
        if (selectedTab) {
            selectedTab.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
            selectedTab.style.color = 'white';
            selectedTab.classList.add('active-ncs-tab');
        }
    }
};

window.generateNCSFundamentalsContent = NCSFundamentals.generateContent;
window.initializeNCSFundamentals = NCSFundamentals.initialize;
window.showNCSSection = NCSFundamentals.showSection;
