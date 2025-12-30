// ModuleRouter.js
// Handles navigation between different content tabs

export class ModuleRouter {
    constructor() {
        this.tabContentMap = {
            0: 'interactive-emg-cases',
            1: 'basic-ncs-principles',
            2: 'reference-materials',
            3: 'reference-materials',
            4: 'basic-ncs-principles',
            5: 'reference-materials',
            6: 'ncs-technique-videos',
            7: 'cardinal-rules',
            8: 'advanced-muscle-lab',
            9: 'emg-challenge',
            10: 'ncs-landmarks',
            11: 'emg-waveforms-audio',
            12: 'interactive-plexus-anatomy',
            13: 'report-writing-integration',
            14: 'emg-diagnosis-reference'
        };
    }

    route(tabNumber, pgyLevel) {
        console.log(`🎯 ModuleRouter: Routing to tab ${tabNumber} for ${pgyLevel}`);

        // 1. Hide Main Interface
        const mainInterface = document.getElementById('main-interface-container');
        if (mainInterface) {
            mainInterface.style.display = 'none';
        }

        // 2. Hide other tabs
        const tabSections = document.querySelectorAll('.tab-content');
        tabSections.forEach(section => {
            section.style.display = 'none';
        });

        // 3. Dispatch
        const contentType = this.tabContentMap[tabNumber];

        if (contentType) {
            this.dispatch(contentType, pgyLevel, tabNumber);
        } else {
            console.warn(`Unknown tab number: ${tabNumber}`);
            this.showPlaceholder(tabNumber, 'unknown');
        }
    }

    dispatch(contentType, pgyLevel) {
        // Dispatch to global handlers for now (Legacy Support)
        switch (contentType) {
            case 'interactive-emg-cases':
                if (window.showClinicalCases) window.showClinicalCases(pgyLevel);
                break;
            case 'cardinal-rules':
                if (window.showCardinalRules) window.showCardinalRules();
                break;
            case 'basic-ncs-principles':
                if (window.showBasicNCSPrinciples) window.showBasicNCSPrinciples();
                break;
            case 'nerve-classifications':
                if (window.showNerveClassifications) window.showNerveClassifications();
                break;
            case 'ncs-technique-videos':
                if (window.showNCSTechniqueVideos) window.showNCSTechniqueVideos();
                break;
            case 'ncs-landmarks':
                if (window.showNCSLandmarks) window.showNCSLandmarks();
                break;
            case 'emg-waveforms-audio':
                if (window.showEMGWaveformsAudio) window.showEMGWaveformsAudio();
                break;
            case 'interactive-plexus-anatomy':
                if (window.showInteractivePlexusAnatomy) window.showInteractivePlexusAnatomy();
                break;
            case 'report-writing-integration':
                if (window.showReportWriting) window.showReportWriting();
                break;
            case 'reference-materials':
                if (tabNumber === 2) window.showEMGInstruments?.();
                else if (tabNumber === 3) window.showEMGTerms?.();
                else if (tabNumber === 5) window.showQuickReference?.();
                break;
            case 'emg-diagnosis-reference':
                if (window.showEMGDiagnosisReference) window.showEMGDiagnosisReference();
                break;
            case 'advanced-muscle-lab':
                // Use new internal menu
                if (window.backToMuscleMenu) window.backToMuscleMenu();
                else if (window.showStudyCards) window.showStudyCards();
                break;
            case 'emg-challenge':
                if (window.showEMGChallenge) window.showEMGChallenge();
                break;
            case 'legacy-tab':
                if (window.showLegacyTab) window.showLegacyTab(tabNumber, pgyLevel);
                else {
                    console.warn('Legacy tab handler not found');
                    this.showPlaceholder(tabNumber, 'legacy');
                }
                break;
            default:
                console.warn(`No global handler for content type: ${contentType}`);
                this.showPlaceholder(tabNumber, contentType);
        }
    }

    showPlaceholder(tabNumber, contentType) {
        // Use ViewHelpers to show modal
        const content = `
            <div style="text-align: center; padding: 50px;">
                <div style="font-size: 48px; margin-bottom: 20px;">🔧</div>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">Content Under Development</h3>
                <p style="color: #5a6c7d; margin-bottom: 25px;">
                    Tab ${tabNumber} (${contentType}) is currently being developed.
                </p>
                <div style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                    <p style="color: #0277bd; margin: 0; font-weight: 600;">
                        🚀 Coming Soon!
                    </p>
                </div>
                <!-- Back button logic relies on global returnToPGYNavigator for now -->
                <button onclick="window.returnToPGYNavigator && window.returnToPGYNavigator(window.currentPGYLevel)" 
                        style="background: #6b9f78; color: white; border: none; padding: 12px 24px; 
                               border-radius: 8px; cursor: pointer; font-weight: 600;">
                    ← Back to Learning Pathway
                </button>
            </div>
        `;
        if (window.showModal) window.showModal('Content Under Development', content);
    }
}
