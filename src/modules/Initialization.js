import { store } from '../state/Store.js';
import { PGYSelector } from '../ui/PGYSelector.js';
import { DashboardRenderer } from '../ui/DashboardRenderer.js';
import { ModuleRouter } from './ModuleRouter.js';
import { ErnestCharacter } from '../ui/ErnestCharacter.js';
import { ClinicalCases } from './ClinicalCases.js';
import { Plexus } from './Plexus.js';
import { NCS } from './NCS.js';
import { CompetencyManager } from './competency/CompetencyManager.js?v=fix2';
import { ReportWriter } from './ReportWriter.js';
import { DiagnosisReference } from './DiagnosisReference.js';
import { ErnestCore } from './ernest/ErnestCore.js';
import { CandylandCore } from './candyland/CandylandCore.js';
import { AudioController } from './audio/AudioController.js';
// New Core Modules
import { LegacyAdapter } from './core/LegacyAdapter.js';
import { Diagnostics } from './core/Diagnostics.js';
import { ContentManager } from './core/StaticContent.js';

// Legacy Content Modules (Global Side-Effects)
// Content Registry (Loads all content modules)
import '../content/index.js';

// Initialize Components
const pgySelector = new PGYSelector(store);
const dashboardRenderer = new DashboardRenderer(store);
const moduleRouter = new ModuleRouter();
const ernest = new ErnestCharacter(store);
const clinicalCases = new ClinicalCases(store);
const plexus = new Plexus(store);
const ncs = new NCS(store);
const competencyManager = new CompetencyManager(store);
const reportWriter = new ReportWriter(competencyManager);
const diagnosisReference = new DiagnosisReference();
const ernestJRPG = new ErnestCore();
const candyland = new CandylandCore(store);
const audioController = new AudioController(store);

// Initialize Core Systems
const legacyAdapter = new LegacyAdapter();
const diagnostics = new Diagnostics();
const contentManager = new ContentManager();

// Global Legacy Hook for JRPG Chat
window.ernest = ernestJRPG;

// Muscle Lab Modules
import { MuscleLabController } from './muscle-lab/MuscleLabController.js';
import { EMGChallengeSystem } from './muscle-lab/EMGChallenge.js';
import { MuscleLocalization } from './muscle-lab/MuscleLocalization.js';
import { MuscleLabMenu } from './muscle-lab/MuscleLabMenu.js';
import { ReferenceMaterials } from './info/ReferenceMaterials.js';
import { initializeCandylandBoard } from './board/CandylandBoard.js';
import { initializeDebugTools } from '../utils/Debug.js';

// Initialize Muscle Lab
const muscleLab = new MuscleLabController();
const emgChallenge = new EMGChallengeSystem();
const muscleLabMenu = new MuscleLabMenu();
const referenceMaterials = new ReferenceMaterials();

// Expose Muscle Lab Globally (Legacy Compatibility)
window.MuscleAnatomy = muscleLab;
window.EMGChallenge = emgChallenge;
window.MuscleLocalization = MuscleLocalization;

// Bind Global Launch Functions
window.showStudyCards = () => muscleLab.launch();
window.showEMGChallenge = () => emgChallenge.launch();
window.backToMuscleMenu = () => muscleLabMenu.show();
window.showCardinalRules = () => referenceMaterials.showCardinalRules();

// Expose globally for legacy code interactions
window.appComponents = {
    pgySelector,
    dashboardRenderer, // Kept for legacy reference but disabled
    moduleRouter,
    ernest,
    clinicalCases,
    plexus,
    ncs,
    competencyManager,
    reportWriter,
    diagnosisReference,
    candyland,
    audio: audioController // Exposed for debugging/console access
};

// Global Alias for Clinical Cases (Legacy Support)
// Global Alias for Clinical Cases (Legacy Support)
window.showClinicalCases = (pgyLevel) => {
    console.log(`🎯 showClinicalCases called globally with PGY: ${pgyLevel}`);
    if (clinicalCases) {
        clinicalCases.showClinicalCases(pgyLevel);
    } else {
        console.error("❌ clinicalCases instance is undefined in global scope");
    }
};

// Global Interactive Plexus Anatomy Wrapper
window.showInteractivePlexusAnatomy = () => {
    console.log('🧠 showInteractivePlexusAnatomy called');
    if (window.BrachialPlexus && typeof window.BrachialPlexus.showExplain === 'function') {
        window.BrachialPlexus.showExplain();
    } else if (window.LumbosacralPlexus && typeof window.LumbosacralPlexus.showExplain === 'function') {
        window.LumbosacralPlexus.showExplain();
    } else {
        console.error("❌ Plexus interactive module not found or showExplain missing");
        if (window.showModal) {
            window.showModal('Error', '<p>Interactive Plexus module could not be initialized. Please try again.</p>');
        }
    }
};

// Global NCS Feature Wrappers
window.showNCSLandmarks = () => {
    console.log('📍 showNCSLandmarks called');
    if (window.appComponents.ncs) {
        window.appComponents.ncs.startLandmarkQuiz(window.currentPGYLevel || 'pgy2');
    }
};

window.showNCSTechniqueVideos = () => {
    console.log('🎥 showNCSTechniqueVideos called');
    if (window.appComponents.ncs) {
        window.appComponents.ncs.renderVideos('video-grid');
        // If we are in a modal context, we might need to show the modal with the video grid container
        if (window.showModal) {
            window.showModal('🎥 NCS Technique Videos', '<div id="video-grid" class="video-grid"></div>');
            window.appComponents.ncs.renderVideos('video-grid');
        }
    }
};

window.showBasicNCSPrinciples = () => {
    console.log('⚡ showBasicNCSPrinciples called');
    if (window.appComponents.ncs) {
        window.appComponents.ncs.showBasicPrinciples();
    }
};

// Main Initialization
async function initApp() {
    console.log('🚀 App Initialization Started');

    // Check for saved state via Store (already loaded in Store constructor, but we trigger UI)
    const currentPGY = store.getPGYLevel();

    if (currentPGY) {
        console.log(`restore PGY: ${currentPGY}`);
        // Trigger UI updates
        pgySelector.updateUI(currentPGY);
        // dashboardRenderer.render(currentPGY); // DISABLED - Conflicts with CandylandCore (BoardRenderer)

        // Ensure main interface is visible
        const mainInterface = document.getElementById('main-interface-container');
        if (mainInterface) mainInterface.style.display = 'block';
    } else {
        // First time load or "All" default
        pgySelector.select('all');
    }

    // Initialize Competency Manager interactions
    competencyManager.initialize();

    // Initialize Legendary Board System
    if (window.appComponents.candyland) {
        window.appComponents.candyland.init();
    }

    // Initialize (Legacy) Candyland Board Logic
    initializeCandylandBoard();

    // Initialize Legacy Navigation Wrapper
    if (window.appComponents && !window.appComponents.legacyNavigator) {
        const { LegacyNavigator } = await import('./core/LegacyNavigator.js');
        const legacyNav = new LegacyNavigator();
        legacyNav.init();
        window.appComponents.legacyNavigator = legacyNav;
    }

    // Initialize Debug Tools
    initializeDebugTools();

    // Initialize Quiz Placeholders
    if (window.appComponents && !window.appComponents.quizPlaceholders) {
        const { QuizPlaceholders } = await import('./quiz/QuizPlaceholders.js');
        const placeholders = new QuizPlaceholders();
        placeholders.init();
        window.appComponents.quizPlaceholders = placeholders;
    }

    // Initialize Videos
    if (window.appComponents?.ncs) {
        window.appComponents.ncs.renderVideos('video-grid');
    }

    console.log('✅ App Initialization Complete');
}

// Bind to DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);
