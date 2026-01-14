
import { StudyCardsModule } from './StudyCards.js';
import { EMGChallengeSystem } from './EMGChallenge.js';
import { MuscleLocalization } from './MuscleLocalization.js';
import { MuscleLabMenu } from './MuscleLabMenu.js';
import { ReferenceMaterials } from '../info/ReferenceMaterials.js';
import { initializeCandylandBoard } from '../board/CandylandBoard.js';

console.log('💪 Initializing Muscle Lab Core...');

// Initialize Modules
const studyCards = new StudyCardsModule();
const emgChallenge = new EMGChallengeSystem();
const muscleLabMenu = new MuscleLabMenu();
const referenceMaterials = new ReferenceMaterials();

// Expose Muscle Lab Globally (Legacy Compatibility)
window.MuscleAnatomy = studyCards;
window.EMGChallenge = emgChallenge;
window.MuscleLocalization = MuscleLocalization;

// Bind Global Launch Functions
window.showStudyCards = () => studyCards.launch();
window.showEMGChallenge = () => emgChallenge.launch();
window.backToMuscleMenu = () => muscleLabMenu.show();
window.showCardinalRules = () => referenceMaterials.showCardinalRules();

// Initialize Board Logic (if needed here or kept in Init)
// initializeCandylandBoard(); // Kept in Initialization.js for now or moved here?

export const MuscleLab = {
    studyCards,
    emgChallenge,
    muscleLabMenu,
    referenceMaterials
};
