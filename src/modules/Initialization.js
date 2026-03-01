import { moduleLoader } from '../utils/ModuleLoader.js?v=quizFix1';
import { Bootstrapper } from './core/Bootstrapper.js?v=podcastRefactor1';
import { ErnestCharacter } from '../ui/ErnestCharacter.js?v=podcastRefactor1';
import { PlexusManager } from './plexus/PlexusManager.js?v=podcastRefactor1';
import { ModalSystem } from './ui/ModalSystem.js?v=podcastRefactor1';
import { CandylandCore } from './candyland/CandylandCore.js?v=podcastRefactor1';
import { QuizSystem } from './quiz/QuizSystem.js';
import { NCSData } from './ncs/NCSData.js';
import { NCSEngine } from './ncs/NCSEngine.js';
import { NCSUI } from './ncs/NCSUI.js';
import { clinicalCasesData } from '../data/ClinicalCorrelationCases.js';
import { ClinicalEngine } from './clinical/ClinicalEngine.js';
import { ClinicalUI } from './clinical/ClinicalUI.js';
import { MuscleLab } from './muscle-lab/MuscleLab.js';
import { AudioController } from './audio/AudioController.js';
import { ErnestCore } from './ernest/ErnestCore.js?v=podcastRefactor1';
import { LEARNING_MODULES_CONFIG } from '../data/ModuleConfig.js';


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
        console.log('🚀 Initializing Application Components...');

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
        window.learningModulesConfig = LEARNING_MODULES_CONFIG;

        // Legacy global shims for decoupled HTML elements
        window.showEMGChallenge = window.showEMGChallenge || (() => {
            console.warn('showEMGChallenge called but MuscleLab is not fully initialized');
            alert('EMG Challenge module is loading or not available in this context.');
        });
        window.showStudyCards = window.showStudyCards || (() => {
            console.warn('showStudyCards called but Flashcards are not fully initialized');
            alert('Study Cards are loading or not available in this context.');
        });

        // Initialize Core Systems
        try {
            await this.ernest.init();
            console.log('✅ Ernest Character Initialized');

            // Initialize Domain Systems
            this.candyland.init();
            this.quiz.init();
            // NCS doesn't have an async init, but we'll instantiate it
            console.log('✅ Domain Systems Initialized');

            // Pre-load Plexus Manager (lightweight wrapper)
            this.plexus = new PlexusManager();
            window.appComponents.plexus = this.plexus;

        } catch (error) {
            console.error('❌ Initialization Error:', error);
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
        console.error("❌ Plexus module not initialized");
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
