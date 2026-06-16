import { moduleLoader } from '../utils/ModuleLoader.js?v=f4aa9b9a';
import { Bootstrapper } from './core/Bootstrapper.js?v=6ccb4484';
import { ErnestCharacter } from '../ui/ErnestCharacter.js?v=bb25e474';
import { PlexusManager } from './plexus/PlexusManager.js?v=9df5cd13';
import { ModalSystem } from './ui/ModalSystem.js?v=5a01714c';
import { CandylandCore } from './candyland/CandylandCore.js?v=7c0fdef9';
import { QuizSystem } from './quiz/QuizSystem.js?v=f0359ba1';
import { NCSData } from './ncs/NCSData.js?v=5781ca14';
import { NCSEngine } from './ncs/NCSEngine.js?v=27bcae44';
import { NCSUI } from './ncs/NCSUI.js?v=baa39b8a';
import { ClinicalEngine } from './clinical/ClinicalEngine.js?v=d37b34dc';
import { ClinicalUI } from './clinical/ClinicalUI.js?v=6407755e';
import { MuscleLab } from './muscle-lab/MuscleLab.js?v=be613fc8';
import { AudioController } from './audio/AudioController.js?v=9c578c28';
import { ErnestCore } from './ernest/ErnestCore.js?v=9750772d';
import { learningModulesConfig } from './candyland/BoardData.js?v=f7918a27';
import logger from '../utils/Logger.js';

// --- ActionBus: inline setup (avoids ES module cache issues) ---
const _actionHandlers = new Map();
window._registerAction = (name, handler) => _actionHandlers.set(name, handler);
document.body.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const handler = _actionHandlers.get(el.dataset.action);
    if (handler) handler(el, e);
    else logger.warn(`ActionBus: no handler for "${el.dataset.action}"`);
});
// Keyboard activation: lets Enter/Space fire data-action on non-native
// elements (clickable <div>s with role="button" tabindex="0"). Native
// controls (button/a/input) already activate via the click handler above.
document.body.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    const el = e.target.closest('[data-action]');
    if (!el || el.matches('button, a, input, textarea, select')) return;
    e.preventDefault(); // stop Space from scrolling the page
    const handler = _actionHandlers.get(el.dataset.action);
    if (handler) handler(el, e);
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
        // Case DB is loaded lazily on first clinical-tool open (not at boot).
        const clinicalEngine = new ClinicalEngine(null);
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
