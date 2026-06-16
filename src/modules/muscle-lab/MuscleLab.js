
import { StudyCardsModule } from './StudyCards.js?v=309b6440';
import { EMGChallengeSystem } from './EMGChallenge.js?v=24212e6d';
import { MuscleLocalization } from './MuscleLocalization.js';
import { MuscleLabMenu } from './MuscleLabMenu.js';
import { MuscleAnatomyQuizModule } from './MuscleAnatomyQuiz.js?v=3bad75db';
import { ReferenceMaterials } from '../info/ReferenceMaterials.js';
import { registerAction } from '../../utils/ActionBus.js';
import logger from '../../utils/Logger.js';

logger.log('💪 Initializing Muscle Lab Core...');

// Initialize Modules
const studyCards = new StudyCardsModule();
const emgChallenge = new EMGChallengeSystem();
const muscleLabMenu = new MuscleLabMenu();
const anatomyQuiz = new MuscleAnatomyQuizModule();
const referenceMaterials = new ReferenceMaterials();

// Expose Muscle Lab Globally (Legacy Compatibility)
window.MuscleAnatomy = studyCards;
window.EMGChallenge = emgChallenge;
window.MuscleLocalization = MuscleLocalization;

// Bind Global Launch Functions
window.showStudyCards = () => studyCards.launch();
window.showEMGChallenge = () => emgChallenge.launch();
window.launchAnatomyQuiz = () => anatomyQuiz.launch();
window.backToMuscleMenu = () => muscleLabMenu.show();
window.showCardinalRules = () => referenceMaterials.showCardinalRules();

// Register with ActionBus (uses polling helper because this file's top-level
// runs BEFORE Initialization.js defines window._registerAction)
registerAction('showStudyCards', () => studyCards.launch());
registerAction('showEMGChallenge', () => emgChallenge.launch());
registerAction('launchAnatomyQuiz', () => anatomyQuiz.launch());
registerAction('backToMuscleMenu', () => muscleLabMenu.show());
registerAction('showCardinalRules', () => referenceMaterials.showCardinalRules());

export const MuscleLab = {
    studyCards,
    emgChallenge,
    muscleLabMenu,
    anatomyQuiz,
    referenceMaterials
};
