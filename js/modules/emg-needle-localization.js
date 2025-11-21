// EMG Needle Localization Module
// Launches the EMG Needle Localization Guide

export function generateContent(module) {
    // Launch the EMG Needle Localization Guide directly
    console.log('🎯 EMG Needle Localization clicked - launching guide');

    setTimeout(() => {
        if (typeof showEMGLocalizationGuide === 'function') {
            showEMGLocalizationGuide();
        } else {
            console.error('❌ showEMGLocalizationGuide function not found');
        }
    }, 100);

    return `
        <div style="padding: 20px; text-align: center;">
            <p>🔄 Loading EMG Needle Localization Guide...</p>
        </div>
    `;
}

// Export for backward compatibility
