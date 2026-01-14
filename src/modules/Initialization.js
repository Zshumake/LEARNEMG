// Core Modules
import { ErnestCharacter } from '../ui/ErnestCharacter.js';
import { ClinicalCases } from './clinical/ClinicalCaseEngine.js';
import { Plexus } from './Plexus.js';
import { NCS } from './NCS.js';
import { CompetencyManager } from './competency/CompetencyManager.js?v=fix2';
import { ReportWriter } from './ReportWriter.js';
import { DiagnosisReference } from './DiagnosisReference.js';
import { ErnestCore } from './ernest/ErnestCore.js';
import { CandylandCore } from './candyland/CandylandCore.js';
import { AudioController } from './audio/AudioController.js';
import { Diagnostics } from './core/Diagnostics.js';
import { moduleLoader } from '../utils/ModuleLoader.js';
import { Router } from './core/Router.js';

// Initialize Core Systems
const diagnostics = new Diagnostics();

// Initialize Components
const ernest = new ErnestCharacter();
// ModuleRouter deprecated
const competencyManager = new CompetencyManager();
const clinicalCases = new ClinicalCases();
const plexus = new Plexus();
const ncs = new NCS();
const reportWriter = new ReportWriter(competencyManager);
const diagnosisReference = new DiagnosisReference();
const candyland = new CandylandCore();
const audioController = new AudioController();

// Initialize Router
const router = new Router(window.appComponents);

// Muscle Lab Modules
import './muscle-lab/MuscleLab.js';
import { initializeCandylandBoard } from './board/CandylandBoard.js';
import { initializeDebugTools } from '../utils/Debug.js';
import { generateErnestButton } from '../utils/ButtonGenerator.js';
import { generateModuleQuiz } from '../utils/QuizGenerator.js';

// Expose generators globally for legacy modules
window.generateErnestButton = generateErnestButton;
window.generateModuleQuiz = generateModuleQuiz;

// Candyland Board Logic (Legacy)
initializeCandylandBoard();

const ernestCore = new ErnestCore();

// Expose globally for legacy code interactions
window.appComponents = {
    dashboardRenderer: null, // Placeholder to avoid breaking other scripts immediately
    ernest,
    ernestCore,
    clinicalCases,
    plexus,
    ncs,
    competencyManager,
    reportWriter,
    diagnosisReference,
    candyland,
    audio: audioController,
    moduleLoader,
    router
};

// Also expose directly to window for legacy compatibility or easier access
window.moduleLoader = moduleLoader;
// ContentLoader deprecated

// Global Alias for Clinical Cases (Legacy Support)
window.showClinicalCases = () => {
    console.log(`🎯 showClinicalCases called globally`);
    if (clinicalCases) {
        clinicalCases.showClinicalCases();
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
        window.appComponents.ncs.startLandmarkQuiz();
    }
};

window.showNCSTechniqueVideos = () => {
    console.log('🎥 showNCSTechniqueVideos called');
    if (window.appComponents.ncs) {
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

    // Ensure main interface is visible
    const mainInterface = document.getElementById('main-interface-container');
    if (mainInterface) mainInterface.style.display = 'block';

    // Initialize Router basics
    router.init();

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

    // Initialize Quiz System (Legacy Quiz Logic Replacement)
    if (window.appComponents && !window.appComponents.quizSystem) {
        const { QuizSystem } = await import('./quiz/QuizSystem.js');
        const quizSystem = new QuizSystem();
        quizSystem.init();
        window.appComponents.quizSystem = quizSystem;
    }

    // Initialize Videos
    if (window.appComponents?.ncs) {
        window.appComponents.ncs.renderVideos('video-grid');
    }

    // Initialize Default Ernest Description
    // This ensures he introduces the app instead of saying "Initializing..."
    if (window.appComponents?.candyland && window.appComponents.candyland.renderer) {
        window.appComponents.candyland.renderer.updateErnestDescription(
            "Welcome to the EMG/NCS Pathway!",
            "I'm Ernest, your AI guide. Hover over any module to learn what it's about, or click to begin your training!",
            "Let's master electrodiagnostics together!"
        );
    }

    console.log('✅ App Initialization Complete');
}

// Bind to DOMContentLoaded
document.addEventListener('DOMContentLoaded', initApp);
