import { generateErnestButton } from '../../modules/audio/AudioData.js';


const generateContent = function (module) {
    // Inject the external stylesheet if not already present
    if (!document.getElementById('clinical-correlation-styles')) {
        const link = document.createElement('link');
        link.id = 'clinical-correlation-styles';
        link.rel = 'stylesheet';
        link.href = 'src/content/emg/clinical-correlation.css';
        document.head.appendChild(link);
    }

    // Immediately trigger the modular Clinical Cases engine
    // We use a small delay to ensure the DOM is ready for the modal
    setTimeout(() => {
        if (window.appComponents && window.appComponents.clinicalCases) {
            const currentPGY = (window.store && window.store.getPGYLevel) ? window.store.getPGYLevel() : 'pgy2';
            window.appComponents.clinicalCases.renderDashboard(currentPGY);
        } else {
            console.error('❌ Clinical Cases engine not ready');
        }
    }, 50);

    // Return a minimal loading shell or a hidden anchor
    return `
        <div class="clinical-loading-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; color: #64748b;">
            <div class="spinner" style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animate: spin 1s linear infinite; margin-bottom: 20px;"></div>
            <p>Loading Clinical Cases...</p>
            <style>
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
        </div>
    `;
};

export const ClinicalCorrelation = { generateContent };
