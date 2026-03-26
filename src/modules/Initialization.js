import { moduleLoader } from '../utils/ModuleLoader.js?v=rootfix1';
import { Bootstrapper } from './core/Bootstrapper.js?v=20260317';
import { ErnestCharacter } from '../ui/ErnestCharacter.js?v=20260317';
import { PlexusManager } from './plexus/PlexusManager.js?v=20260317';
import { ModalSystem } from './ui/ModalSystem.js?v=20260317';
import { CandylandCore } from './candyland/CandylandCore.js?v=20260317e';
import { QuizSystem } from './quiz/QuizSystem.js?v=20260317';
import { NCSData } from './ncs/NCSData.js?v=20260317';
import { NCSEngine } from './ncs/NCSEngine.js?v=20260317';
import { NCSUI } from './ncs/NCSUI.js?v=20260317';
import { clinicalCasesData } from '../data/cases/index.js?v=20260317-v2';
import { ClinicalEngine } from './clinical/ClinicalEngine.js?v=20260317';
import { ClinicalUI } from './clinical/ClinicalUI.js?v=20260317';
import { MuscleLab } from './muscle-lab/MuscleLab.js?v=20260317';
import { AudioController } from './audio/AudioController.js?v=20260317';
import { ErnestCore } from './ernest/ErnestCore.js?v=20260317';
import { learningModulesConfig } from './candyland/BoardData.js?v=20260317';
import logger from '../utils/Logger.js';

// --- ActionBus: inline setup (avoids ES module cache issues) ---
const _actionHandlers = new Map();
window._registerAction = (name, handler) => _actionHandlers.set(name, handler);
window._unregisterAction = (name) => _actionHandlers.delete(name);
document.body.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const handler = _actionHandlers.get(el.dataset.action);
    if (handler) handler(el, e);
    else logger.warn(`ActionBus: no handler for "${el.dataset.action}"`);
});


class AppInitializer {
    constructor() {
        this.moduleLoader = moduleLoader;
        this.ernest = new ErnestCharacter();
        this.plexus = null; // Lazy load
        this.modal = new ModalSystem();
        this.candyland = new CandylandCore();
        this.quiz = new QuizSystem();

        // --- Modular Dependency Injection ---
        const clinicalEngine = new ClinicalEngine(clinicalCasesData);
        this.clinicalCases = new ClinicalUI(clinicalEngine);

        const ncsEngine = new NCSEngine(NCSData);
        this.ncs = new NCSUI(ncsEngine);
        // ------------------------------------


        this.audio = new AudioController();
        this.ernestAI = new ErnestCore();
    }

    async init() {
        logger.log('🚀 Initializing Application Components...');

        // Expose components globally for legacy compatibility
        // This is crucial for the "Hybrid" phase of the architecture
        window.appComponents = {
            moduleLoader: this.moduleLoader,
            ernest: this.ernest,
            modal: this.modal,
            candyland: this.candyland,
            quiz: this.quiz,
            ncs: this.ncs,       // Legacy compat alias
            ncsUI: this.ncs,     // Explicit UI alias for onclick handlers
            clinicalCases: this.clinicalCases,
            muscleLab: MuscleLab,
            audio: this.audio,
            ernestAI: this.ernestAI,
            plexus: null
        };
        window.moduleLoader = this.moduleLoader; // Legacy alias
        window.learningModulesConfig = learningModulesConfig;

        // Legacy global shims for decoupled HTML elements
        window.showEMGChallenge = window.showEMGChallenge || (() => {
            logger.warn('showEMGChallenge called but MuscleLab is not fully initialized');
            alert('EMG Challenge module is loading or not available in this context.');
        });
        window.showStudyCards = window.showStudyCards || (() => {
            logger.warn('showStudyCards called but Flashcards are not fully initialized');
            alert('Study Cards are loading or not available in this context.');
        });

        // Initialize Core Systems
        try {
            await this.ernest.init();
            logger.log('✅ Ernest Character Initialized');

            // Initialize Domain Systems
            this.candyland.init();
            this.quiz.init();
            // NCS doesn't have an async init, but we'll instantiate it
            logger.log('✅ Domain Systems Initialized');

            // Pre-load Plexus Manager (lightweight wrapper)
            this.plexus = new PlexusManager();
            window.appComponents.plexus = this.plexus;

        } catch (error) {
            logger.error('❌ Initialization Error:', error);
        }
    }
}

// Create and initialize the application
const app = new AppInitializer();
app.init().then(() => {
    const bootstrapper = new Bootstrapper();
    bootstrapper.start();
});

// Global Interactive Plexus Anatomy Wrapper (Legacy Adapter)
// Used by index.html buttons
window.showInteractivePlexusAnatomy = () => {
    if (window.appComponents && window.appComponents.plexus) {
        window.appComponents.plexus.showInteractiveAnatomy();
    } else {
        logger.error("❌ Plexus module not initialized");
    }
};

window.showErnestDialogue = () => {
    if (window.appComponents && window.appComponents.ernestAI) {
        window.appComponents.ernestAI.ui.toggleDialogue();
    }
};

window.explainPage = () => {
    if (window.appComponents && window.appComponents.ernestAI) {
        window.appComponents.ernestAI.explainVisiblePage();
    }
};
