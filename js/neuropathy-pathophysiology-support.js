// ============================================================================
// NEUROPATHY PATHOPHYSIOLOGY SUPPORT FUNCTIONS
// ============================================================================
// Tab switching and initialization functions for Module 5
// ============================================================================

console.log('🧠 Loading Neuropathy Pathophysiology support functions...');

// Tab switching function for pathophysiology sections
function showPathophysSection(sectionName) {
    // Hide all pathophysiology content sections
    const allPathoSections = document.querySelectorAll('.patho-content');
    allPathoSections.forEach(section => {
        section.style.display = 'none';
    });

    // Remove active styling from all tabs
    const allPathoTabs = document.querySelectorAll('.patho-tab');
    allPathoTabs.forEach(tab => {
        tab.style.background = 'transparent';
        tab.style.color = '#8b5cf6';
        tab.classList.remove('active-patho-tab');
    });

    // Show selected content section
    const selectedSection = document.getElementById('patho-' + sectionName + '-content');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Activate selected tab
    const selectedTab = document.getElementById('patho-' + sectionName + '-tab');
    if (selectedTab) {
        selectedTab.style.background = '#8b5cf6';
        selectedTab.style.color = 'white';
        selectedTab.classList.add('active-patho-tab');
    }
}

// Initialize Pathophysiology with first section visible
function initializePathophysiology() {
    setTimeout(() => {
        showPathophysSection('anatomy');
    }, 100);
}

// Make functions globally available
window.showPathophysSection = showPathophysSection;
window.initializePathophysiology = initializePathophysiology;

console.log('✅ Neuropathy Pathophysiology support functions loaded');
