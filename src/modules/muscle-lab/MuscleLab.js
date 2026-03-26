
import { StudyCardsModule } from './StudyCards.js';
import { EMGChallengeSystem } from './EMGChallenge.js';
import { MuscleLocalization } from './MuscleLocalization.js';
import { MuscleLabMenu } from './MuscleLabMenu.js';
import { MuscleAnatomyQuizModule } from './MuscleAnatomyQuiz.js';
import { ReferenceMaterials } from '../info/ReferenceMaterials.js';
import { initializeCandylandBoard } from '../board/CandylandBoard.js';
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

// Register with ActionBus
if (window._registerAction) {
    window._registerAction('showStudyCards', () => studyCards.launch());
    window._registerAction('showEMGChallenge', () => emgChallenge.launch());
    window._registerAction('launchAnatomyQuiz', () => anatomyQuiz.launch());
    window._registerAction('backToMuscleMenu', () => muscleLabMenu.show());
    window._registerAction('showCardinalRules', () => referenceMaterials.showCardinalRules());
}

// Initialize Board Logic (if needed here or kept in Init)
// initializeCandylandBoard(); // Kept in Initialization.js for now or moved here?

export const MuscleLab = {
    studyCards,
    emgChallenge,
    muscleLabMenu,
    anatomyQuiz,
    referenceMaterials
};
