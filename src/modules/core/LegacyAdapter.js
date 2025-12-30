/**
 * LegacyAdapter.js
 * Bridges the gap between old-school inline HTML calls (onclick="...")
 * and the new ES6 Module architecture.
 */

export class LegacyAdapter {
    constructor() {
        this.bindGlobalFunctions();
    }

    bindGlobalFunctions() {
        // --- PGY Navigation ---
        window.selectPGY = (pgyLevel) => {
            if (window.appComponents?.pgySelector) {
                window.appComponents.pgySelector.select(pgyLevel);
            }
        };

        window.returnToPGYNavigator = (pgyLevel) => {
            // 1. Clean up Legacy/Modal UI
            const focusedContainer = document.getElementById('focused-tab-container');
            if (focusedContainer) focusedContainer.style.display = 'none';

            // 2. Restore Main Interface (ModuleRouter hides it)
            const mainInterface = document.getElementById('main-interface-container');
            if (mainInterface) mainInterface.style.display = 'block';

            // Restore legacy containers just in case
            const mainContent = document.querySelector('.main-content');
            if (mainContent) mainContent.style.display = 'block';
            const pgySelector = document.querySelector('.pgy-selector-container');
            if (pgySelector) pgySelector.style.display = 'block';

            // 3. Close any active modals
            if (window.closeModal) window.closeModal();

            // 4. Update State via PGYSelector
            const targetPGY = pgyLevel || 'all';
            if (window.appComponents?.pgySelector) {
                window.appComponents.pgySelector.select(targetPGY);
            }
        };

        // --- Tab Navigation (Delegated to ModuleRouter) ---
        window.showTab = (tabIndex) => {
            if (window.appComponents?.moduleRouter) {
                window.appComponents.moduleRouter.route(tabIndex, 'all');
            }
        };

        // --- Competency Management ---
        window.filterContentByPGY = (pgyLevel) => {
            window.appComponents?.pgySelector?.filterContent(pgyLevel);
        };

        window.updateCompetencyInfo = (pgyLevel) => {
            window.appComponents?.pgySelector?.updateCompetencyInfo(pgyLevel);
        };

        // --- Muscle Lab Legacy Hooks ---
        window.switchAnatomy = (region) => {
            if (window.MuscleAnatomy) {
                window.MuscleAnatomy.switchAnatomy(region);
            }
        };

        // --- Core Application Wrappers ---
        window.startAtriumJourney = () => {
            console.log('🏥 Starting Atrium Health Journey (Legacy Adapter)');
            // Legacy Atrium entry - ID is actually 'pgy-selection' in index.html
            const intro = document.getElementById('pgy-selection');

            if (intro) {
                // Smooth fade out
                intro.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                intro.style.opacity = '0';
                intro.style.transform = 'translateY(-20px)';

                setTimeout(() => {
                    intro.style.display = 'none';

                    // Show the board container explicitly
                    const board = document.getElementById('learning-board');
                    if (board) board.classList.remove('hidden');

                    // Trigger PGY-2 Journey as per original intent
                    if (window.appComponents?.pgySelector) {
                        window.appComponents.pgySelector.select('pgy2');
                    } else {
                        console.error('❌ PGYSelector component not ready');
                    }
                }, 800);
            } else {
                console.warn('⚠️ Welcome screen (id="pgy-selection") not found');

                // Show the board container explicitly
                const board = document.getElementById('learning-board');
                if (board) board.classList.remove('hidden');

                // Attempt direct start anyway
                if (window.appComponents?.pgySelector) {
                    window.appComponents.pgySelector.select('pgy2');
                }
            }
        };

        // --- Competency Management ---
        window.selectCompetencyArea = (area) => window.appComponents?.competencyManager?.selectArea(area);
        window.updateCompetencyAreaInfo = (area) => window.appComponents?.competencyManager?.updateAreaInfo(area);
        window.filterContentByCompetencyArea = (area) => window.appComponents?.competencyManager?.filterContentByArea(area);
        window.toggleCompetencyNavigation = (show) => window.appComponents?.competencyManager?.toggleNavigation(show);

        // Progress Dashboard
        window.updateProgressDashboard = () => window.appComponents?.competencyManager?.updateDashboard();
        window.getCompetencyProgress = () => window.appComponents?.competencyManager?.getProgress() || {};
        window.updateCompetencyLevel = (competency, level) => window.appComponents?.competencyManager?.updateLevel(competency, level);
        window.updateOverallProgress = (progress) => window.appComponents?.competencyManager?.updateOverallProgress(progress);
        window.getTargetLevelsForPGY = (pgyLevel) => window.appComponents?.competencyManager?.getTargetLevelsForPGY(pgyLevel) || {};
        window.showAchievementNotification = (competency, level) => window.appComponents?.competencyManager?.showAchievementNotification(competency, level);
        window.setupProgressInteractions = () => window.appComponents?.competencyManager?.setupProgressInteractions();

        // --- NCS / Info Modules ---
        window.showBasicNCSPrinciples = () => window.appComponents?.ncs?.showBasicPrinciples();
        window.showNCSTechniqueVideos = () => window.appComponents?.ncs?.showTechniqueVideos();
        window.showNCSLandmarks = () => window.appComponents?.ncs?.showLandmarks();
        window.showRadiculopathyNCSProtocols = () => window.appComponents?.ncs?.showRadiculopathyProtocols();
        window.showNeuropathyNCSProtocols = () => window.appComponents?.ncs?.showNeuropathyProtocols();
        window.showInteractivePlexusAnatomy = () => window.appComponents?.plexus?.showInteractiveAnatomy();

        // --- Clinical Cases ---
        window.showClinicalCases = (pgyLevel) => window.appComponents?.clinicalCases?.showClinicalCases(pgyLevel);
        window.startPGYSpecificCases = (pgyLevel, difficulty) => window.appComponents?.clinicalCases?.startPGYSpecificCases(pgyLevel, difficulty);
        window.showUnlockPrompt = (level, requiredPGY) => window.appComponents?.clinicalCases?.showUnlockPrompt(level, requiredPGY);
        window.showRadiculopathyPathophysiology = () => window.appComponents?.clinicalCases?.showRadiculopathyPathophysiology();
        window.showNeuropathyPathophysiology = () => window.appComponents?.clinicalCases?.showNeuropathyPathophysiology();

        // Legacy Case Flow (for backward compatibility if any inline calls remain)
        window.startRandomCase = () => window.appComponents?.clinicalCases?.startRandomCase();
        window.startSpecificCase = (id) => window.appComponents?.clinicalCases?.startSpecificCase(id);
        window.populateCaseDetails = () => window.appComponents?.clinicalCases?.populateCaseDetails();
        window.showCasePresentation = () => window.appComponents?.clinicalCases?.showCasePresentation();
        window.showPhysicalExam = () => window.appComponents?.clinicalCases?.showPhysicalExam();
        window.showDifferentialBuilder = () => window.appComponents?.clinicalCases?.showDifferentialBuilder();
        window.analyzeDifferential = () => window.appComponents?.clinicalCases?.analyzeDifferential();
        window.checkFinalDiagnosis = () => window.appComponents?.clinicalCases?.checkFinalDiagnosis();
        window.showEMGDecision = () => window.appComponents?.clinicalCases?.showEMGDecision();
        window.makeEMGDecision = (dec) => window.appComponents?.clinicalCases?.makeEMGDecision(dec);
        window.proceedAfterDecision = () => window.appComponents?.clinicalCases?.proceedAfterDecision();
        window.showNCSResults = () => window.appComponents?.clinicalCases?.showNCSResults();
        window.showFinalDiagnosis = () => window.appComponents?.clinicalCases?.showFinalDiagnosis();
        window.hideAllSteps = () => window.appComponents?.clinicalCases?.hideAllSteps();
        window.startNewCase = () => window.appComponents?.clinicalCases?.startNewCase();

        // --- Placeholders & Report Writing ---
        window.showReportMode = (mode) => window.appComponents?.reportWriter?.showMode(mode);
        window.showTemplateLevel = (level) => window.appComponents?.reportWriter?.showTemplateLevel(level);
        window.showDiagnosisCategory = (cat) => window.appComponents?.diagnosisReference?.showCategory(cat);

        // Legacy Placeholders (referenced in HTML)
        window.showCardinalRules = () => { if (window.appComponents?.referenceMaterials) window.appComponents.referenceMaterials.showCardinalRules(); };
        window.showNerveClassifications = () => showPlaceholderContent(4, 'nerve-classifications');
        window.showEMGWaveformsAudio = () => showPlaceholderContent(11, 'emg-waveforms-audio');
        window.showReportWriting = () => showPlaceholderContent(13, 'report-writing-integration');
        window.showEMGDiagnosisReference = () => showPlaceholderContent(14, 'emg-diagnosis-reference');

        console.log('✅ Legacy Adapter Initialized: Global functions bound.');
    }
}
