import { MODULE_DESCRIPTIONS } from '../candyland/BoardData.js';

export function initializeCandylandBoard() {
    // Load saved progress from localStorage
    loadProgress();

    // Show appropriate page
    if (currentPGYLevel && localStorage.getItem('emg-pgy-level')) {
        showLearningBoard(currentPGYLevel);
    } else {
        showPGYSelection();
    }

    // Initialize resize handler
    window.addEventListener('resize', () => {
        if (currentPage === 'learning-board' && document.getElementById('ernest-character')) {
            setTimeout(positionErnest, 100);
        }
    });

    console.log('🍬 Candyland Board System Initialized');
}

// ================================================
// CANDYLAND LEARNING BOARD SYSTEM
// ================================================

// Current system state - use existing global variables if available
if (typeof window.currentPGYLevel === 'undefined') {
    window.currentPGYLevel = null;
}
if (typeof window.currentModuleIndex === 'undefined') {
    window.currentModuleIndex = 0;
}
if (typeof window.completedModules === 'undefined') {
    window.completedModules = new Set();
}
let currentPage = 'pgy-selection';

function showLearningBoard(pgyLevel) {
    transitionToPage('learning-board-page', () => {
        generateLearningBoard(pgyLevel);
        updateBoardHeader(pgyLevel);
    });
}

// PGY Level Selection Functions
function selectPGYLevel(pgyLevel) {
    if (window.appStore) {
        window.appStore.setPGYLevel(pgyLevel);
    }
    window.currentPGYLevel = pgyLevel;
    window.currentModuleIndex = 0;

    // Save PGY level to localStorage
    localStorage.setItem('emg-pgy-level', pgyLevel);

    // Show the learning board with smooth transition
    transitionToPage('learning-board-page', () => {
        generateLearningBoard(pgyLevel);
        updateBoardHeader(pgyLevel);
    });
}

function showPGYSelection() {
    currentPage = 'pgy-selection';
    transitionToPage('pgy-selection-page');
}

// Page Transition Functions
function transitionToPage(targetPageId, callback) {
    const currentPageElement = document.querySelector('.page-container.active');
    const targetPageElement = document.getElementById(targetPageId);

    if (currentPageElement) {
        currentPageElement.classList.add('page-transition-exit');

        setTimeout(() => {
            currentPageElement.classList.remove('active', 'page-transition-exit');
        }, 300);
    }

    setTimeout(() => {
        if (targetPageElement) {
            targetPageElement.classList.add('active', 'page-transition-enter');

            if (callback) callback();

            setTimeout(() => {
                targetPageElement.classList.remove('page-transition-enter');
            }, 500);
        } else {
            console.warn(`Target page element not found for transition`);
            if (callback) callback();
        }
    }, 300);
}

// Learning Board Generation
function generateLearningBoard(pgyLevel) {
    // Delegate to modern Candyland Core system
    if (window.appComponents && window.appComponents.candyland) {
        window.appComponents.candyland.generateLearningBoard(pgyLevel);
        currentPage = 'learning-board';

        // Ensure header is updated (Legacy support)
        updateBoardHeader(pgyLevel);
    } else {
        console.error("Candyland Core not initialized");
    }
}

function generateModuleSquare(module, index) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    const isAvailable = index <= currentModuleIndex && !isCompleted;
    const isLocked = index > currentModuleIndex && !isCompleted;

    let statusClass = '';

    if (isCompleted) {
        statusClass = 'completed';
    } else if (isCurrent) {
        statusClass = 'current';
    } else if (isAvailable) {
        statusClass = 'available';
    } else {
        statusClass = 'locked';
    }

    const isClickable = !isLocked;
    const clickHandler = isClickable ? `navigateToModule(${index})` : '';

    return `
        <div class="module-square ${statusClass}" onclick="${clickHandler}" data-module-index="${index}" data-module-id="${module.id}">
            <div class="module-icon">${module.icon}</div>
            <div class="module-title">${module.title}</div>
            <div class="module-competency">${module.competency}</div>
        </div>
        `;
}

function updateBoardHeader(pgyLevel) {
    const boardTitle = document.getElementById('board-pgy-title');
    const progressDisplay = document.getElementById('progress-display');
    const modules = window.learningModulesConfig?.[pgyLevel] || [];

    const pgyNames = {
        'pgy2': 'PGY-2 Foundation Journey',
        'pgy3': 'PGY-3 Development Journey',
        'pgy4': 'PGY-4 Mastery Journey'
    };

    if (boardTitle) {
        boardTitle.textContent = `🧠 ${pgyNames[pgyLevel]} `;
    }
    if (progressDisplay) {
        progressDisplay.textContent = `Progress: ${completedModules.size}/${modules.length} Modules`;
    }
}

// Module Navigation Functions
function openModule(moduleId, moduleIndex) {
    const modules = window.learningModulesConfig?.[currentPGYLevel];
    const module = modules?.find(m => m.id === moduleId);

    if (!module) return;

    // Update module page content
    document.getElementById('module-title').textContent = module.title;
    document.getElementById('module-subtitle').textContent = module.competency;

    // Load module content based on contentId
    loadModuleContent(module.contentId);

    // Transition to module page
    transitionToPage('module-page');
    currentPage = 'module';
}

function loadModuleContent(contentId) {
    const moduleContent = document.getElementById('module-content');

    // Map content IDs to existing content sections
    const contentMapping = {
        'emg-introduction': () => showExistingContent('header'),
        'plexus-anatomy': () => showPlexusContent(),
        'radiculopathy-pathophysiology': () => showRadiculopathyPathophysiology(),
        'neuropathy-pathophysiology': () => showNeuropathyPathophysiology(),
        'ncs-fundamentals': () => showExistingContent('ncs-section'),
        'ncs-techniques': () => showExistingContent('ncs-techniques-section'),
        'muscle-quiz': () => showMuscleQuiz(),
        'basic-patterns': () => showExistingContent('emg-waveforms'),
        'simple-reports': () => showExistingContent('emg-reports'),
        'clinical-correlation': () => showExistingContent('diagnosis-reference')
    };

    if (contentMapping[contentId]) {
        contentMapping[contentId]();
    } else {
        // Default content for modules not yet implemented
        moduleContent.innerHTML = `
            <div class="module-placeholder">
                <h3>🚧 Content Coming Soon</h3>
                <p>This module is being developed and will be available soon.</p>
                <p><strong>Learning Objectives:</strong></p>
                <ul>
                    <li>Master the core concepts for this competency level</li>
                    <li>Practice hands-on skills and techniques</li>
                    <li>Complete assessment exercises</li>
                    <li>Apply knowledge to clinical scenarios</li>
                </ul>
                <button class="complete-module-btn" onclick="completeModule('${contentId}')">
                    Mark as Complete
                </button>
            </div>
        `;
    }
}

function showExistingContent(sectionId) {
    const moduleContent = document.getElementById('module-content');
    const existingContent = document.querySelector(`#${sectionId}, .${sectionId}`);

    if (existingContent) {
        moduleContent.innerHTML = existingContent.outerHTML;
    } else {
        moduleContent.innerHTML = `
            <div class="content-placeholder">
                <h3>📚 Learning Content</h3>
                <p>This module integrates with existing educational content.</p>
                <button class="complete-module-btn" onclick="completeCurrentModule()">
                    Mark as Complete
                </button>
            </div>
        `;
    }
}

// ================================================
// ERNEST CHARACTER SYSTEM
// ================================================

// Navigate to a specific module (Delegated)
function navigateToModule(targetIndex) {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.navigateToModule(targetIndex);
    }
}

// Animate ERNEST (Delegated)
function animateErnestToModule(targetIndex, fromIndex) {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.animateToModule(targetIndex, fromIndex);
    }
}

// Position ERNEST (Delegated)
function positionErnest() {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.position();
    }
}

// Animate ERNEST hopping (Delegated)
function moveErnestToNextModule() {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.moveToNext();
    }
}

// Show ERNEST Welcome (Delegated)
function showErnestWelcomeMessage() {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.welcome();
    }
}

// Show ERNEST Speech (Delegated)
function showErnestSpeechBubble(message, duration = 2000) {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.speak(message, duration);
    }
}

// Show Module Description (Delegated)
function showModuleDescription(moduleIndex) {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.showModuleDescription(moduleIndex);
    }
}

// Get Description (Delegated)
function getModuleDescription(module) {
    if (window.appComponents?.ernest) {
        return window.appComponents.ernest.getDescriptionText(module);
    }
    return '';
}

// Ernest Celebration (Delegated)
function ernestCelebration() {
    if (window.appComponents?.ernest) {
        window.appComponents.ernest.celebrate();
    }
}

// Progress Management Functions
function completeCurrentModule() {
    const modules = window.learningModulesConfig?.[currentPGYLevel];
    const currentModule = modules?.[currentModuleIndex];
    if (currentModule) {
        completeModule(currentModule.id);
    }
}

function completeModule(moduleId) {
    if (window.appStore) {
        window.appStore.completeModule(moduleId);
    }
    completedModules.add(moduleId);

    // Advance to next module if this was the current one
    const modules = window.learningModulesConfig?.[currentPGYLevel];
    if (!modules) return;

    const moduleIndex = modules.findIndex(m => m.id === moduleId);

    const wasCurrentModule = moduleIndex === currentModuleIndex;

    if (wasCurrentModule) {
        currentModuleIndex = Math.min(currentModuleIndex + 1, modules.length - 1);
    }

    // Save progress
    saveProgress();

    // ERNEST celebration and movement
    if (wasCurrentModule) {
        ernestCelebration();

        // If there's a next module, ERNEST will hop to it
        if (currentModuleIndex < modules.length - 1) {
            setTimeout(() => {
                moveErnestToNextModule();
            }, 2000);
        }
    }

    // Show success message and return to board
    showCompletionMessage(() => {
        returnToBoard();
    });
}

function showCompletionMessage(callback) {
    const moduleContent = document.getElementById('module-content');
    moduleContent.innerHTML = `
        <div class="completion-message">
            <div class="completion-icon">🎉</div>
            <h3>Module Complete!</h3>
            <p>Great job! You've successfully completed this learning module.</p>
            <button class="return-to-board-btn" onclick="${callback.name}()">
                Return to Learning Board
            </button>
        </div>
    `;
}

// Navigation Functions
function returnToBoard() {
    transitionToPage('learning-board-page', () => {
        generateLearningBoard(currentPGYLevel);
        updateBoardHeader(currentPGYLevel);

        // Re-position ERNEST after the board is regenerated
        setTimeout(() => {
            positionErnest();
        }, 100);
    });
}

// Progress Persistence Functions
function saveProgress() {
    const progressData = {
        pgyLevel: currentPGYLevel,
        moduleIndex: currentModuleIndex,
        completedModules: Array.from(completedModules),
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('emg-learning-progress', JSON.stringify(progressData));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('emg-learning-progress');
    const savedPGY = localStorage.getItem('emg-pgy-level');

    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        window.currentPGYLevel = progress.pgyLevel || savedPGY;
        window.currentModuleIndex = progress.moduleIndex || 0;
        window.completedModules = new Set(progress.completedModules || []);
    } else if (savedPGY) {
        window.currentPGYLevel = savedPGY;
    }
}

// Integration with Existing Content Functions
function showPlexusContent() {
    const moduleContent = document.getElementById('module-content');
    const plexusSection = document.querySelector('.plexus-anatomy-section');

    if (plexusSection) {
        moduleContent.innerHTML = plexusSection.outerHTML;
    } else {
        moduleContent.innerHTML = `
            <div class="plexus-module">
                <h3>🦴 Interactive Plexus Anatomy</h3>
                <p>Master brachial and lumbosacral plexus anatomy through interactive learning.</p>
                <button class="launch-plexus-btn" onclick="launchPlexusDiagram()">
                    🚀 Launch Interactive Plexus
                </button>
                <button class="complete-module-btn" onclick="completeCurrentModule()">
                    Mark as Complete
                </button>
            </div>
        `;
    }
}

function launchPlexusDiagram() {
    // Integration with existing plexus content
    transitionToPage('main-interface-container', () => {
        showFocusedTab(4, currentPGYLevel); // Assuming plexus is tab 4
    });
}

function showMuscleQuiz() {
    const moduleContent = document.getElementById('module-content');
    moduleContent.innerHTML = `
        <div class="muscle-quiz-module">
            <h3>💪 Muscle Localization Quiz</h3>
            <p>Test your knowledge of muscle anatomy and innervation patterns.</p>
            <button class="launch-quiz-btn" onclick="launchMuscleQuiz()">
                🎯 Start Muscle Quiz
            </button>
            <button class="complete-module-btn" onclick="completeCurrentModule()">
                Mark as Complete
            </button>
        </div>
    `;
}

function launchMuscleQuiz() {
    // Integration with existing muscle quiz
    transitionToPage('main-interface-container', () => {
        if (window.showFocusedTab) {
            showFocusedTab(0, currentPGYLevel);
        } else {
            console.error('showFocusedTab not found');
        }
    });
}

// Utility Functions
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        completedModules.clear();
        currentModuleIndex = 0;
        localStorage.removeItem('emg-learning-progress');

        if (currentPGYLevel) {
            generateLearningBoard(currentPGYLevel);
            updateBoardHeader(currentPGYLevel);
        }
    }
}

// Export functions for global access (Compatibility Layer)
window.selectPGYLevel = selectPGYLevel;
window.showPGYSelection = showPGYSelection;
window.returnToBoard = returnToBoard;
window.openModule = openModule;
window.completeCurrentModule = completeCurrentModule;
window.completeModule = completeModule;
window.resetProgress = resetProgress;
window.launchPlexusDiagram = launchPlexusDiagram;
window.launchMuscleQuiz = launchMuscleQuiz;

// New Candyland Board functions
window.navigateToModule = navigateToModule;
window.showModuleDescription = showModuleDescription;
window.animateErnestToModule = animateErnestToModule;

// ERNEST functions
window.positionErnest = positionErnest;
window.moveErnestToNextModule = moveErnestToNextModule;
window.ernestCelebration = ernestCelebration;
window.showErnestSpeechBubble = showErnestSpeechBubble;
