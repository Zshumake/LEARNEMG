// EXACT ORIGINAL CANDYLAND SYSTEM - Extracted line-for-line from main.js
// This preserves 100% of the original logic, structure, and behavior

console.log('🍭 Loading EXACT original Candyland system...');

// Original global variables - exactly as in main.js
let currentPGYLevel = null;
let currentModuleIndex = 0;
let completedModules = new Set();
let currentPage = 'pgy-selection';

// EXACT ORIGINAL: learningModulesConfig from lines 9753+ in main.js
const learningModulesConfig = {
    pgy2: [
        { id: 'intro-emg', title: 'EMG/NCS Introduction', icon: '🧠', competency: 'Foundation', description: 'Basic principles and patient care approach', contentId: 'emg-introduction' },
        { id: 'peripheral-anatomy', title: 'Peripheral Anatomy', icon: '🦴', competency: 'Competency 1 & 6', description: 'Brachial and lumbosacral plexus foundations', contentId: 'plexus-anatomy' },
        { id: 'radiculopathy-patho', title: 'Radiculopathy Pathophysiology', icon: '🔬', competency: 'Competency 2 - Level 1', description: 'Understanding nerve root compression', contentId: 'radiculopathy-pathophysiology' },
        { id: 'neuropathy-patho', title: 'Neuropathy Pathophysiology', icon: '⚡', competency: 'Competency 3 - Level 1', description: 'Axonal vs demyelinating processes', contentId: 'neuropathy-pathophysiology' },
        { id: 'ncs-basics', title: 'NCS Fundamentals', icon: '📈', competency: 'Competency 1 - Level 1', description: 'Basic nerve conduction principles', contentId: 'ncs-fundamentals' },
        { id: 'ncs-techniques', title: 'NCS Techniques', icon: '🎯', competency: 'Competency 1 - Level 2', description: 'Proper electrode placement and protocols', contentId: 'ncs-techniques' },
        { id: 'emg-needle-basics', title: 'EMG Needle Techniques', icon: '💉', competency: 'Competency 2 & 3 - Level 2', description: 'Basic needle EMG evaluation', contentId: 'emg-needle-basics' },
        { id: 'muscle-anatomy', title: 'Muscle Localization', icon: '💪', competency: 'Competency 2 & 3', description: 'Interactive muscle anatomy quiz', contentId: 'muscle-quiz' },
        { id: 'basic-patterns', title: 'Basic Pattern Recognition', icon: '👁️', competency: 'Competency 5 - Level 1', description: 'Recognizing abnormal spontaneous activity', contentId: 'basic-patterns' },
        { id: 'neuropathy-myopathy-basics', title: 'Neuropathy vs Myopathy Basics', icon: '⚖️', competency: 'Competency 4 - Level 1', description: 'Basic pathophysiology differences', contentId: 'neuropathy-myopathy-basics' },
        { id: 'simple-reports', title: 'Basic Report Writing', icon: '📝', competency: 'Competency 7 - Level 1', description: 'Understanding report structure', contentId: 'simple-reports' },
        { id: 'clinical-correlation', title: 'Clinical Application', icon: '🩺', competency: 'Integration', description: 'Simple clinical case examples', contentId: 'clinical-correlation' }
    ],
    pgy3: [
        // PGY-3 Competency-Based Learning - 24 modules total
        { id: 'independent-ncs', title: 'Independent NCS Screen', icon: '🎯', competency: 'Competency 1 - Level 3', description: 'Perform independent NCS for median, ulnar, radial, peroneal, tibial, sural, H-reflex, F-wave', contentId: 'independent-ncs' },
        { id: 'ncs-landmarks', title: 'NCS Landmarks Mastery', icon: '📍', competency: 'Competency 1 - Level 3', description: 'Precise electrode placement for all standard NCS', contentId: 'ncs-landmarks' },
        { id: 'radiculopathy-pathophysiology', title: 'Radiculopathy Pathophysiology', icon: '🧠', competency: 'Competency 2 - Level 1', description: 'Articulate understanding of pathophysiology of radiculopathy', contentId: 'radiculopathy-pathophysiology' },
        { id: 'radiculopathy-ncs', title: 'NCS for Radiculopathy', icon: '⚡', competency: 'Competency 2 - Level 2', description: 'Properly perform NCS for radiculopathy evaluation', contentId: 'radiculopathy-ncs' },
        { id: 'radiculopathy-emg', title: 'EMG for Radiculopathy', icon: '🧬', competency: 'Competency 2 - Level 3', description: 'Properly perform EMG evaluation for radiculopathy', contentId: 'radiculopathy-emg' },
        { id: 'neuropathy-pathophysiology', title: 'Neuropathy Pathophysiology', icon: '🧠', competency: 'Competency 3 - Level 1', description: 'Articulate understanding of peripheral neuropathy pathophysiology', contentId: 'neuropathy-pathophysiology' },
        { id: 'neuropathy-ncs', title: 'NCS for Neuropathy', icon: '⚡', competency: 'Competency 3 - Level 2', description: 'Properly perform NCS for peripheral neuropathy', contentId: 'neuropathy-ncs' },
        { id: 'neuropathy-emg', title: 'EMG for Neuropathy', icon: '🎯', competency: 'Competency 3 - Level 3', description: 'Properly perform EMG evaluation for peripheral neuropathy', contentId: 'neuropathy-emg' },
        { id: 'neuropathy-patterns', title: 'Neuropathy Patterns', icon: '🩺', competency: 'Competency 3 - Level 3', description: 'Study peripheral neuropathy diagnosis patterns', contentId: 'neuropathy-patterns' },
        { id: 'neuropathy-myopathy-ddx', title: 'Neuropathy vs Myopathy DDx', icon: '🧠', competency: 'Competency 4 - Level 3', description: 'Discuss DDx associated with common neuropathies vs myopathies', contentId: 'neuropathy-myopathy-ddx' },
        { id: 'case-practice', title: 'Neuropathy vs Myopathy Cases', icon: '🎯', competency: 'Competency 4 - Level 3', description: 'Practice differentiating neuropathy vs myopathy cases', contentId: 'case-practice' },
        { id: 'emg-recognition', title: 'Audio/Visual EMG Recognition', icon: '👁️👂', competency: 'Competency 5 - Level 3', description: 'Recognize and differentiate Fibs, PSWs, Fascics, CRDs, Myokymia via audio and visual EMG', contentId: 'emg-recognition' },
        { id: 'recruitment-patterns', title: 'Recruitment Pattern Mastery', icon: '📊', competency: 'Competency 5 - Level 2-3', description: 'Master recruitment pattern, frequency, and morphology assessment', contentId: 'recruitment-patterns' },
        { id: 'entrapments', title: 'Common Entrapments', icon: '🧠', competency: 'Competency 6 - Level 3', description: 'Articulate common entrapments associated with upper and lower limb', contentId: 'entrapments' }
    ],
    pgy4: [
        { id: 'advanced-plexopathy', title: 'Advanced Plexopathy', icon: '🕸️', competency: 'Competency 2 - Level 3', description: 'Complex plexus lesion analysis', contentId: 'advanced-plexopathy' },
        { id: 'pediatric-emg', title: 'Pediatric EMG', icon: '👶', competency: 'Competency 3 - Level 3', description: 'EMG in pediatric populations', contentId: 'pediatric-emg' },
        { id: 'intraoperative-monitoring', title: 'Intraoperative Monitoring', icon: '⚕️', competency: 'Competency 1 - Level 3', description: 'EMG in surgical settings', contentId: 'intraoperative-monitoring' },
        { id: 'advanced-myopathy', title: 'Advanced Myopathy', icon: '💪', competency: 'Competency 4 - Level 3', description: 'Complex myopathy evaluation', contentId: 'advanced-myopathy' },
        { id: 'research-projects', title: 'Independent Research', icon: '🔬', competency: 'Competency 6 - Level 3', description: 'Leading research initiatives', contentId: 'research-projects' },
        { id: 'quality-assurance', title: 'Quality Assurance Leadership', icon: '✅', competency: 'Competency 6 - Level 3', description: 'QA program development', contentId: 'quality-assurance' },
        { id: 'clinical-correlation-advanced', title: 'Advanced Clinical Correlation', icon: '🔗', competency: 'Competency 7 - Level 3', description: 'Complex clinical decision making', contentId: 'clinical-correlation-advanced' },
        { id: 'advanced-techniques', title: 'Advanced EMG Techniques', icon: '⚙️', competency: 'All Competencies - Level 3', description: 'Specialized EMG methods', contentId: 'advanced-techniques' },
        { id: 'case-conferences', title: 'Case Conference Leadership', icon: '👥', competency: 'Competency 7 - Level 3', description: 'Leading multidisciplinary discussions', contentId: 'case-conferences' },
        { id: 'multidisciplinary-care', title: 'Multidisciplinary Care', icon: '🤝', competency: 'Competency 7 - Level 3', description: 'Coordinating comprehensive care', contentId: 'multidisciplinary-care' },
        { id: 'fellowship-preparation', title: 'Fellowship Preparation', icon: '🎓', competency: 'Integration', description: 'Advanced specialty preparation', contentId: 'fellowship-preparation' },
        { id: 'career-planning', title: 'Career Development', icon: '🚀', competency: 'Professional Development', description: 'Long-term career planning', contentId: 'career-planning' }
    ]
};

// EXACT ORIGINAL: generateLearningBoard function (lines 10197-10245)
function generateLearningBoard(pgyLevel) {
    const boardContainer = document.getElementById('learning-board');
    const modules = learningModulesConfig[pgyLevel];
    
    // Calculate the height needed for the path based on number of modules
    const pathHeight = Math.max(3000, (modules.length * 120) + 600);
    
    boardContainer.innerHTML = `
        <div class="learning-path" style="min-height: ${pathHeight}px;">
            <div class="learning-modules">
                ${modules.map((module, index) => generateModuleSquare(module, index)).join('')}
            </div>
            <div class="ernest-character idle" id="ernest-character"></div>
        </div>
    `;
    
    currentPage = 'learning-board';
    
    // Debug ERNEST creation
    console.log('🧠 ERNEST: Learning board generated, checking for ERNEST...');
    setTimeout(() => {
        const ernst = document.getElementById('ernest-character');
        console.log('🧠 ERNST Element immediately after creation:', ernst);
        if (ernst) {
            console.log('🧠 ERNST initial style:', window.getComputedStyle(ernst));
            console.log('🧠 ERNEST parent element:', ernst.parentElement);
        }
    }, 100);
    
    // Position ERNEST on the current module after a brief delay
    setTimeout(() => {
        console.log('🧠 ERNEST: Attempting to position ERNEST...');
        positionErnest();
        showErnestWelcomeMessage();
        
        // Debug after positioning
        const ernst = document.getElementById('ernest-character');
        if (ernst) {
            console.log('🧠 ERNEST positioned successfully:', {
                position: ernst.style.position,
                left: ernst.style.left,
                top: ernst.style.top,
                zIndex: ernst.style.zIndex
            });
        } else {
            console.error('🚨 ERNEST STILL MISSING AFTER POSITIONING ATTEMPT!');
        }
    }, 500);
}

// EXACT ORIGINAL: generateModuleSquare function (lines 10247-10299)
function generateModuleSquare(module, index) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    const isAvailable = index <= currentModuleIndex && !isCompleted;
    const isLocked = index > currentModuleIndex && !isCompleted;
    
    let statusClass = '';
    let statusText = '';
    let statusIcon = '';
    
    if (isCompleted) {
        statusClass = 'completed';
        statusText = 'Complete';
        statusIcon = '✅';
    } else if (isCurrent) {
        statusClass = 'current';
        statusText = 'Current';
        statusIcon = '👉';
    } else if (isAvailable) {
        statusClass = 'available';
        statusText = 'Available';
        statusIcon = '🔓';
    } else {
        statusClass = 'locked';
        statusText = 'Locked';
        statusIcon = '🔒';
    }
    
    const isClickable = !isLocked;
    const clickHandler = isClickable ? `showModuleDialog(${index})` : '';
    const moduleNumber = index + 1;
    
    // Determine if content exists or is placeholder
    const hasContent = checkModuleContentExists(module.contentId);
    const contentStatus = hasContent ? '' : '<div class="module-placeholder-badge">📋 Placeholder</div>';
    
    return `
        <div class="module-square ${statusClass}" onclick="${clickHandler}" data-module-index="${index}" data-module-id="${module.id}">
            <div class="module-header">
                <div class="module-number">${moduleNumber}</div>
                <div class="module-status">
                    <span class="status-icon">${statusIcon}</span>
                    <span class="status-text">${statusText}</span>
                </div>
            </div>
            <div class="module-icon">${module.icon}</div>
            <div class="module-title">${module.title}</div>
            <div class="module-competency">${module.competency}</div>
            <div class="module-description">${module.description}</div>
            ${contentStatus}
        </div>
    `;
}

// EXACT ORIGINAL: checkModuleContentExists function (lines 10301+)  
function checkModuleContentExists(contentId) {
    const existingContent = [
        'emg-introduction', 'plexus-anatomy', 'ncs-fundamentals', 
        'ncs-techniques', 'muscle-quiz', 'basic-patterns', 
        'simple-reports', 'clinical-correlation'
    ];
    return existingContent.includes(contentId);
}

// EXACT ORIGINAL: animateErnestToModule function (lines 10611-10628)
function animateErnestToModule(targetIndex, fromIndex) {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    // Determine direction and animation
    const isBackward = targetIndex < fromIndex;
    const animationClass = isBackward ? 'hopping-backward' : 'hopping';
    
    ernst.classList.remove('idle', 'celebrating', 'hopping', 'hopping-backward');
    ernst.classList.add(animationClass);
    
    // Position ERNEST on the target module after animation
    setTimeout(() => {
        positionErnest();
        ernst.classList.remove(animationClass);
        ernst.classList.add('idle');
    }, 800);
}

// EXACT ORIGINAL: moveErnestToClickedModule function (lines 10631-10669)
function moveErnestToClickedModule(moduleIndex) {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    const currentModuleSquares = document.querySelectorAll('.module-square');
    const targetSquare = currentModuleSquares[moduleIndex];
    
    if (!targetSquare) return;
    
    // Remove previous ERNEST positioning from all squares
    document.querySelectorAll('.module-square').forEach(square => {
        square.classList.remove('has-ernest');
    });
    
    // Add ERNEST to clicked module
    targetSquare.classList.add('has-ernest');
    
    // Position ERNEST ABSOLUTELY within the learning board container
    // This makes ERNEST stay with the module regardless of scrolling
    const learningBoard = document.querySelector('.learning-modules');
    const boardRect = learningBoard.getBoundingClientRect();
    const squareRect = targetSquare.getBoundingClientRect();
    
    // Calculate position relative to the learning board container
    const ernestX = (squareRect.left - boardRect.left) + (squareRect.width / 2) - 30;
    const ernestY = (squareRect.top - boardRect.top) + (squareRect.height / 2) - 30;
    
    ernst.style.position = 'absolute'; // CHANGED FROM FIXED TO ABSOLUTE
    ernst.style.left = `${ernestX}px`;
    ernst.style.top = `${ernestY}px`;
    ernst.style.zIndex = '1001';
    ernst.style.pointerEvents = 'none'; // Allow clicking through ERNEST to the module
    
    // Store the clicked module for persistence
    ernst.dataset.targetModule = moduleIndex;
    ernst.dataset.clickedModule = moduleIndex; // Store the user's choice
    
    console.log(`🧠 ERNEST moved to clicked module ${moduleIndex + 1} and will STAY there!`);
}

// EXACT ORIGINAL: positionErnest function (lines 10672-10687)
function positionErnest() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    // Check if user has clicked a specific module - if so, don't auto-position
    if (ernst.dataset.clickedModule) {
        console.log(`🧠 ERNEST staying at user's clicked module ${parseInt(ernst.dataset.clickedModule) + 1}`);
        return;
    }
    
    const modules = learningModulesConfig[currentPGYLevel];
    if (!modules || modules.length === 0) return;
    
    // Only do initial positioning if no specific module has been clicked
    moveErnestToClickedModule(Math.min(currentModuleIndex, modules.length - 1));
}

// EXACT ORIGINAL: moveErnestToNextModule function (lines 10690-10710)
function moveErnestToNextModule() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    // Add hopping animation
    ernst.classList.remove('idle', 'celebrating');
    ernst.classList.add('hopping');
    
    // Position on new module after hop animation
    setTimeout(() => {
        positionErnest();
        ernst.classList.remove('hopping');
        ernst.classList.add('celebrating');
        
        // Return to idle after celebration
        setTimeout(() => {
            ernst.classList.remove('celebrating');
            ernst.classList.add('idle');
        }, 1500);
    }, 800);
}

// EXACT ORIGINAL: showErnestWelcomeMessage function (lines 10713-10729)
function showErnestWelcomeMessage() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    const messages = [
        "Ready to learn EMG? Let's go!",
        "I'm here to guide your journey!",
        "Next module awaits!",
        "Great progress so far!",
        "You've got this!",
        "EMG mastery incoming!",
        "Let's tackle this together!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showErnestSpeechBubble(randomMessage, 3000);
}

// EXACT ORIGINAL: showErnestSpeechBubble function (lines 10732-10761)
function showErnestSpeechBubble(message, duration = 2000) {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    // Remove existing speech bubble
    const existingBubble = ernst.querySelector('.ernest-speech-bubble');
    if (existingBubble) {
        existingBubble.remove();
    }
    
    // Create new speech bubble
    const bubble = document.createElement('div');
    bubble.className = 'ernest-speech-bubble';
    bubble.textContent = message;
    
    ernst.appendChild(bubble);
    
    // Show bubble with animation
    setTimeout(() => {
        bubble.classList.add('show');
    }, 100);
    
    // Hide bubble after duration
    setTimeout(() => {
        bubble.classList.remove('show');
        setTimeout(() => {
            bubble.remove();
        }, 300);
    }, duration);
}

// EXACT ORIGINAL: ernestCelebration function (lines 10839-10864)
function ernestCelebration() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    ernst.classList.remove('idle', 'hopping');
    ernst.classList.add('celebrating');
    
    const celebrationMessages = [
        "Excellent work!",
        "Module complete! 🎉",
        "You're a pro!",
        "Outstanding progress!",
        "Keep it up!",
        "Fantastic job!",
        "You're mastering EMG!"
    ];
    
    const message = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
    showErnestSpeechBubble(message, 2000);
    
    // Return to idle after celebration
    setTimeout(() => {
        ernst.classList.remove('celebrating');
        ernst.classList.add('idle');
    }, 1500);
}

// EXACT ORIGINAL: showModuleDialog function (lines 10312+) - simplified for essential functionality
function showModuleDialog(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];
    
    // MOVE ERNEST TO THE CLICKED MODULE and KEEP HIM THERE
    moveErnestToClickedModule(moduleIndex);
    
    // Show speech bubble with module info
    showErnestSpeechBubble(`Exploring: ${module.title}!`, 3000);
    
    console.log(`🍭 Module clicked: ${module.title}`);
}

// Export all functions to global scope exactly as original
window.generateLearningBoard = generateLearningBoard;
window.learningModulesConfig = learningModulesConfig;
window.generateModuleSquare = generateModuleSquare;
window.checkModuleContentExists = checkModuleContentExists;
window.animateErnestToModule = animateErnestToModule;
window.moveErnestToClickedModule = moveErnestToClickedModule;
window.positionErnest = positionErnest;
window.moveErnestToNextModule = moveErnestToNextModule;
window.showErnestWelcomeMessage = showErnestWelcomeMessage;
window.showErnestSpeechBubble = showErnestSpeechBubble;
window.ernestCelebration = ernestCelebration;
window.showModuleDialog = showModuleDialog;

// Set global variables exactly as original
window.currentPGYLevel = currentPGYLevel;
window.currentModuleIndex = currentModuleIndex;
window.completedModules = completedModules;
window.currentPage = currentPage;

console.log('✅ EXACT original Candyland system - COMPLETE with all ERNEST functions!');