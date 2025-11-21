// Clinical Correlation Module
// Launches the EMG APP clinical cases system

export function generateContent(module) {
    // Instead of returning HTML, directly call the EMG APP clinical cases system
    console.log('🎯 Clinical Correlation clicked - launching EMG APP interface');

    // Close the current modal first
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }

    // Directly launch the EMG APP clinical cases interface
    setTimeout(() => {
        if (typeof showClinicalCases === 'function') {
            showClinicalCases('pgy2');
        } else {
            console.error('❌ showClinicalCases function not found');
        }
    }, 100);

    // Return placeholder content that won't be shown
    return `<div>Loading EMG APP Clinical Cases...</div>`;
}

// Export for backward compatibility
