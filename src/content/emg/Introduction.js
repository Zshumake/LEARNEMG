
export const EMGIntroduction = {
    generateContent() {
        // In a real refactor, this would return the static HTML string or load it via ContentLoader.
        // For now, mirroring the functionality of the monolith which uses ContentLoader.
        return window.contentLoader ? window.contentLoader.getHTMLSync('emg-introduction') : '<div class="loading">Loading content...</div>';
    },

    initialize() {
        // Wait a brief moment for DOM elements to be available
        setTimeout(() => {
            if (window.showEMGSection) {
                window.showEMGSection('foundations');
            }
        }, 100);
    },

    // Explicit sections navigation
    showSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.emg-section');
        sections.forEach(section => section.style.display = 'none');

        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.emg-tab');
        tabs.forEach(tab => {
            tab.style.background = 'transparent';
            tab.style.color = '#64748b';
            tab.classList.remove('active-emg-tab');
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionName + '-section');
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Activate selected tab
        const selectedTab = document.getElementById(sectionName + '-tab');
        if (selectedTab) {
            selectedTab.style.background = 'linear-gradient(135deg, #059669, #047857)';
            selectedTab.style.color = 'white';
            selectedTab.classList.add('active-emg-tab');
        }
    }
};

// Global Exposure for Legacy Calls
window.generateEMGIntroductionContent = EMGIntroduction.generateContent;
window.initializeEMGIntroduction = EMGIntroduction.initialize;
window.showEMGSection = EMGIntroduction.showSection;
