/**
 * MuscleLocalization.js
 * Handles the logic for switching between Upper and Lower extremity views
 * for needle localization.
 */

export class MuscleLocalization {
    constructor() {
        this.currentRegion = 'upper';
    }

    switchRegion(region) {
        console.log(`🎯 Switching to ${region} extremity muscle localization`);
        this.currentRegion = region;

        // Update button states
        const buttons = document.querySelectorAll('.region-btn');
        if (buttons.length > 0) {
            buttons.forEach(btn => {
                const btnRegion = btn.dataset.region;
                if (btnRegion === region) {
                    btn.classList.add('active');
                    btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
                    btn.style.color = 'white';
                } else {
                    btn.classList.remove('active');
                    btn.style.background = '#f3f4f6';
                    btn.style.color = '#6b7280';
                }
            });
        }

        // Show region-specific message
        // We use a non-blocking notification if possible, but keeping alert for legacy compat for now
        // or replacing with a nice toast if ViewHelpers is available?
        // Staying faithful to original logic:
        alert(`📍 Switched to ${region} extremity muscle localization. Advanced muscle database with complete innervation patterns and clinical correlations available.`);

        // Dispatch event or callback if needed
        if (window.appComponents && window.appComponents.muscleLab) {
            // Maybe trigger update in MuscleCards if they are open?
        }
    }
}
