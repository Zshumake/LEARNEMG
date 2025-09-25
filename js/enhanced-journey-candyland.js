// PROFESSIONAL BOARD GAME CANDYLAND SYSTEM
// Combines sophisticated medical education platform aesthetics with engaging board game design

console.log('🎯 Loading Professional Board Game Candyland System...');

// Global variables - use window scope to avoid conflicts
if (typeof window.currentPGYLevel === 'undefined') {
    window.currentPGYLevel = null;
}
if (typeof window.currentModuleIndex === 'undefined') {
    window.currentModuleIndex = 999; // Unlock all modules for testing
}
if (typeof window.completedModules === 'undefined') {
    window.completedModules = new Set();
}
let ernestDialogueOpen = false;

// Professional icon system (replacing corrupted Unicode)
const PROFESSIONAL_ICONS = {
    // Medical/Educational Icons
    brain: '🧠',
    anatomy: '🫀', 
    microscope: '🔬',
    lightning: '⚡',
    chart: '📊',
    target: '🎯',
    needle: '💉',
    muscle: '💪',
    eye: '👁️',
    balance: '⚖️',
    document: '📋',
    stethoscope: '🩺',
    
    // Status Icons
    completed: '✅',
    current: '👉',
    available: '🔓',
    locked: '🔒',
    
    // Difficulty Stars
    star: '⭐',
    
    // Professional alternatives for corrupted icons
    network: '🕸️',
    baby: '👶',
    medical: '⚕️',
    research: '🔬',
    quality: '✅',
    link: '🔗',
    tools: '⚙️',
    people: '👥',
    handshake: '🤝',
    graduation: '🎓',
    rocket: '🚀'
};

// Complete learning modules config with professional icons
const learningModulesConfig = {
    pgy2: [
        { id: 'intro-emg', title: 'EMG/NCS Introduction', icon: '🎓', competency: 'Foundation', description: 'Basic principles and patient care approach', contentId: 'emg-introduction' },
        { id: 'peripheral-anatomy', title: 'Peripheral Anatomy', icon: PROFESSIONAL_ICONS.anatomy, competency: 'Competency 1 & 6', description: 'Brachial and lumbosacral plexus foundations', contentId: 'plexus-anatomy' },
        { id: 'brachial-plexus', title: 'Brachial Plexus Interactive', icon: '🕸️', competency: 'Competency 1 & 6', description: 'Interactive exploration of brachial plexus anatomy and pathways', contentId: 'brachial-plexus-interactive' },
        { id: 'radiculopathy-patho', title: 'Radiculopathy Pathophysiology', icon: PROFESSIONAL_ICONS.microscope, competency: 'Competency 2 - Level 1', description: 'Understanding nerve root compression', contentId: 'radiculopathy-pathophysiology' },
        { id: 'neuropathy-patho', title: 'Neuropathy Pathophysiology', icon: PROFESSIONAL_ICONS.lightning, competency: 'Competency 3 - Level 1', description: 'Axonal vs demyelinating processes', contentId: 'neuropathy-pathophysiology' },
        { id: 'ncs-basics', title: 'NCS Fundamentals', icon: PROFESSIONAL_ICONS.chart, competency: 'Competency 1 - Level 1', description: 'Basic nerve conduction principles', contentId: 'ncs-fundamentals' },
        { id: 'ncs-techniques', title: 'NCS Techniques', icon: PROFESSIONAL_ICONS.target, competency: 'Competency 1 - Level 2', description: 'Proper electrode placement and protocols', contentId: 'ncs-techniques' },
        { id: 'emg-needle-localization', title: '💉 EMG Needle Localization', icon: PROFESSIONAL_ICONS.needle, competency: 'Competency 2 & 3 - Level 2', description: 'Precise electrode placement using anatomical landmarks', contentId: 'emg-needle-localization' },
        { id: 'muscle-anatomy', title: '🧬 Muscle Study Lab', icon: PROFESSIONAL_ICONS.muscle, competency: 'Competency 2 & 3', description: 'Advanced muscle anatomy laboratory with Preston & Shapiro database', contentId: 'muscle-quiz' },
        { id: 'basic-patterns', title: 'Basic Pattern Recognition', icon: PROFESSIONAL_ICONS.eye, competency: 'Competency 5 - Level 1', description: 'Recognizing abnormal spontaneous activity', contentId: 'basic-patterns' },
        { id: 'neuropathy-myopathy-basics', title: 'Neuropathy vs Myopathy Basics', icon: PROFESSIONAL_ICONS.balance, competency: 'Competency 4 - Level 1', description: 'Basic pathophysiology differences', contentId: 'neuropathy-myopathy-basics' },
        { id: 'simple-reports', title: 'Basic Report Writing', icon: PROFESSIONAL_ICONS.document, competency: 'Competency 7 - Level 1', description: 'Understanding report structure', contentId: 'simple-reports' },
        { id: 'clinical-correlation', title: 'Clinical Application', icon: PROFESSIONAL_ICONS.stethoscope, competency: 'Integration', description: 'Simple clinical case examples', contentId: 'clinical-correlation' }
    ],
    pgy3: [
        { id: 'independent-ncs', title: 'Independent NCS Screen', icon: PROFESSIONAL_ICONS.target, competency: 'Competency 1 - Level 3', description: 'Perform independent NCS for median, ulnar, radial, peroneal, tibial, sural, H-reflex, F-wave', contentId: 'independent-ncs' },
        { id: 'ncs-landmarks', title: 'NCS Landmarks Mastery', icon: PROFESSIONAL_ICONS.target, competency: 'Competency 1 - Level 3', description: 'Precise electrode placement for all standard NCS', contentId: 'ncs-landmarks' },
        { id: 'radiculopathy-pathophysiology', title: 'Radiculopathy Pathophysiology', icon: PROFESSIONAL_ICONS.brain, competency: 'Competency 2 - Level 1', description: 'Articulate understanding of pathophysiology of radiculopathy', contentId: 'radiculopathy-pathophysiology' },
        { id: 'radiculopathy-ncs', title: 'NCS for Radiculopathy', icon: PROFESSIONAL_ICONS.lightning, competency: 'Competency 2 - Level 2', description: 'Properly perform NCS for radiculopathy evaluation', contentId: 'radiculopathy-ncs' },
        { id: 'radiculopathy-emg', title: 'EMG for Radiculopathy', icon: PROFESSIONAL_ICONS.chart, competency: 'Competency 2 - Level 3', description: 'Properly perform EMG evaluation for radiculopathy', contentId: 'radiculopathy-emg' },
        { id: 'neuropathy-pathophysiology', title: 'Neuropathy Pathophysiology', icon: PROFESSIONAL_ICONS.brain, competency: 'Competency 3 - Level 1', description: 'Articulate understanding of peripheral neuropathy pathophysiology', contentId: 'neuropathy-pathophysiology' },
        { id: 'neuropathy-ncs', title: 'NCS for Neuropathy', icon: PROFESSIONAL_ICONS.lightning, competency: 'Competency 3 - Level 2', description: 'Properly perform NCS for peripheral neuropathy', contentId: 'neuropathy-ncs' },
        { id: 'neuropathy-emg', title: 'EMG for Neuropathy', icon: PROFESSIONAL_ICONS.target, competency: 'Competency 3 - Level 3', description: 'Properly perform EMG evaluation for peripheral neuropathy', contentId: 'neuropathy-emg' },
        { id: 'neuropathy-patterns', title: 'Neuropathy Patterns', icon: PROFESSIONAL_ICONS.stethoscope, competency: 'Competency 3 - Level 3', description: 'Study peripheral neuropathy diagnosis patterns', contentId: 'neuropathy-patterns' },
        { id: 'neuropathy-myopathy-ddx', title: 'Neuropathy vs Myopathy DDx', icon: PROFESSIONAL_ICONS.brain, competency: 'Competency 4 - Level 3', description: 'Discuss DDx associated with common neuropathies vs myopathies', contentId: 'neuropathy-myopathy-ddx' },
        { id: 'case-practice', title: 'Neuropathy vs Myopathy Cases', icon: PROFESSIONAL_ICONS.target, competency: 'Competency 4 - Level 3', description: 'Practice differentiating neuropathy vs myopathy cases', contentId: 'case-practice' },
        { id: 'emg-recognition', title: 'Audio/Visual EMG Recognition', icon: PROFESSIONAL_ICONS.eye, competency: 'Competency 5 - Level 3', description: 'Recognize and differentiate Fibs, PSWs, Fascics, CRDs, Myokymia via audio and visual EMG', contentId: 'emg-recognition' },
        { id: 'recruitment-patterns', title: 'Recruitment Pattern Mastery', icon: PROFESSIONAL_ICONS.chart, competency: 'Competency 5 - Level 2-3', description: 'Master recruitment pattern, frequency, and morphology assessment', contentId: 'recruitment-patterns' },
        { id: 'entrapments', title: 'Common Entrapments', icon: PROFESSIONAL_ICONS.brain, competency: 'Competency 6 - Level 3', description: 'Articulate common entrapments associated with upper and lower limb', contentId: 'entrapments' },
        { id: 'ulnar-neuropathy', title: 'Ulnar Neuropathy', icon: '🤏', competency: 'Competency 6 - Level 3', description: 'UNE vs UNW differential diagnosis and electrodiagnostic approach', contentId: 'ulnar-neuropathy' }
    ],
    pgy4: [
        { id: 'advanced-plexopathy', title: 'Advanced Plexopathy', icon: PROFESSIONAL_ICONS.network, competency: 'Competency 2 - Level 3', description: 'Complex plexus lesion analysis', contentId: 'advanced-plexopathy' },
        { id: 'pediatric-emg', title: 'Pediatric EMG', icon: PROFESSIONAL_ICONS.baby, competency: 'Competency 3 - Level 3', description: 'EMG in pediatric populations', contentId: 'pediatric-emg' },
        { id: 'intraoperative-monitoring', title: 'Intraoperative Monitoring', icon: PROFESSIONAL_ICONS.medical, competency: 'Competency 1 - Level 3', description: 'EMG in surgical settings', contentId: 'intraoperative-monitoring' },
        { id: 'advanced-myopathy', title: 'Advanced Myopathy', icon: PROFESSIONAL_ICONS.muscle, competency: 'Competency 4 - Level 3', description: 'Complex myopathy evaluation', contentId: 'advanced-myopathy' },
        { id: 'research-projects', title: 'Independent Research', icon: PROFESSIONAL_ICONS.research, competency: 'Competency 6 - Level 3', description: 'Leading research initiatives', contentId: 'research-projects' },
        { id: 'quality-assurance', title: 'Quality Assurance Leadership', icon: PROFESSIONAL_ICONS.quality, competency: 'Competency 6 - Level 3', description: 'QA program development', contentId: 'quality-assurance' },
        { id: 'clinical-correlation-advanced', title: 'Advanced Clinical Correlation', icon: PROFESSIONAL_ICONS.link, competency: 'Competency 7 - Level 3', description: 'Complex clinical decision making', contentId: 'clinical-correlation-advanced' },
        { id: 'advanced-techniques', title: 'Advanced EMG Techniques', icon: PROFESSIONAL_ICONS.tools, competency: 'All Competencies - Level 3', description: 'Specialized EMG methods', contentId: 'advanced-techniques' },
        { id: 'case-conferences', title: 'Case Conference Leadership', icon: PROFESSIONAL_ICONS.people, competency: 'Competency 7 - Level 3', description: 'Leading multidisciplinary discussions', contentId: 'case-conferences' },
        { id: 'multidisciplinary-care', title: 'Multidisciplinary Care', icon: PROFESSIONAL_ICONS.handshake, competency: 'Competency 7 - Level 3', description: 'Coordinating comprehensive care', contentId: 'multidisciplinary-care' },
        { id: 'fellowship-preparation', title: 'Fellowship Preparation', icon: PROFESSIONAL_ICONS.graduation, competency: 'Integration', description: 'Advanced specialty preparation', contentId: 'fellowship-preparation' },
        { id: 'career-planning', title: 'Career Development', icon: PROFESSIONAL_ICONS.rocket, competency: 'Professional Development', description: 'Long-term career planning', contentId: 'career-planning' }
    ]
};

// Beautiful winding board game pathway generator
function generateBoardGamePath(numModules) {
    const pathPoints = [];
    const boardWidth = 800; // Narrower for better visual flow
    const boardHeight = Math.max(1200, numModules * 150); // Much more vertical space
    const squareSize = 120; // Larger, more appealing squares
    const centerX = boardWidth / 2;
    
    // Create a beautiful winding S-curve path down the page
    for (let i = 0; i < numModules; i++) {
        const progress = i / (numModules - 1); // 0 to 1
        const yPosition = 100 + (progress * (boardHeight - 200)); // Vertical progression
        
        // Create smooth S-curve using sine wave
        const waveAmplitude = 250; // How far the curve extends left/right
        const frequency = 3; // How many curves in the path
        const xOffset = Math.sin(progress * Math.PI * frequency) * waveAmplitude;
        const xPosition = centerX + xOffset;
        
        pathPoints.push({
            x: xPosition - squareSize / 2, // Center the square on the path
            y: yPosition,
            index: i,
            angle: Math.atan2(
                i < numModules - 1 ? 
                    (100 + ((i + 1) / (numModules - 1)) * (boardHeight - 200)) - yPosition : 0,
                i < numModules - 1 ? 
                    (centerX + Math.sin(((i + 1) / (numModules - 1)) * Math.PI * frequency) * waveAmplitude) - xPosition : 0
            ) * 180 / Math.PI // Convert to degrees for CSS rotation
        });
    }
    
    return pathPoints;
}

// Generate beautiful flowing pathway connections
function generatePathConnections(pathPoints) {
    if (pathPoints.length < 2) return '';
    
    let pathString = `M ${pathPoints[0].x + 60} ${pathPoints[0].y + 60} `;
    
    // Create smooth Bezier curves between each point
    for (let i = 0; i < pathPoints.length - 1; i++) {
        const current = pathPoints[i];
        const next = pathPoints[i + 1];
        
        const currentX = current.x + 60; // Center of square
        const currentY = current.y + 60;
        const nextX = next.x + 60;
        const nextY = next.y + 60;
        
        // Calculate control points for smooth S-curve
        const controlPoint1X = currentX;
        const controlPoint1Y = currentY + (nextY - currentY) / 3;
        const controlPoint2X = nextX;
        const controlPoint2Y = nextY - (nextY - currentY) / 3;
        
        pathString += `C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${nextX} ${nextY} `;
    }
    
    return pathString;
}

// Determine terrain theme based on module progress
function getTerrainTheme(moduleIndex, totalModules) {
    const progress = moduleIndex / totalModules;
    
    if (progress < 0.33) {
        return {
            theme: 'forest',
            bgColor: 'rgba(34, 197, 94, 0.05)', // Green tint
            decoration: '🌲',
            pathColor: '#22c55e'
        };
    } else if (progress < 0.66) {
        return {
            theme: 'mountain',
            bgColor: 'rgba(168, 85, 247, 0.05)', // Purple tint
            decoration: '⛰️',
            pathColor: '#a855f7'
        };
    } else {
        return {
            theme: 'summit',
            bgColor: 'rgba(234, 179, 8, 0.05)', // Gold tint
            decoration: '☁️',
            pathColor: '#eab308'
        };
    }
}

// Check if module is a milestone (every 25%)
function isMilestoneModule(index, totalModules) {
    const progress = (index + 1) / totalModules;
    return progress === 0.25 || progress === 0.5 || progress === 0.75 || progress === 1.0;
}

// Professional board game learning board generator
function generateLearningBoard(pgyLevel) {
    console.log('🎯 Generating Professional Board Game Learning Board...');

    const boardContainer = document.getElementById('learning-board');
    const modules = learningModulesConfig[pgyLevel];
    currentPGYLevel = pgyLevel;

    if (!boardContainer || !modules) {
        console.error('Board container or modules not found');
        return;
    }

    // LEGENDARY PATHWAY SYSTEM: Let legendary-pathway-system.js handle everything
    console.log('🎯 Legendary Pathway System is in control - skipping candyland UI');

    // The legendary pathway system will handle all UI generation
    // This function should only be called by the legendary system now
    return;

    // OLD CODE BELOW (kept for reference but not executed)
    // Generate board game pathway
    const pathPoints = generateBoardGamePath(modules.length);
    const pathConnections = generatePathConnections(pathPoints);
    const boardHeight = Math.max(1200, modules.length * 150);
    
    // Create professional board game layout
    boardContainer.innerHTML = `
        <div class="professional-board-game">
            <!-- Professional Header -->
            <div class="board-game-header">
                <h2>🎯 ${pgyLevel.toUpperCase()} Learning Pathway</h2>
                <div class="progress-indicator">
                    <div class="progress-text">Progress: ${completedModules.size}/${modules.length} modules</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(completedModules.size / modules.length) * 100}%"></div>
                    </div>
                </div>
            </div>
            
            <!-- Board Game Canvas -->
            <div class="board-game-canvas" style="height: ${boardHeight}px;">
                <!-- SVG Path Connections -->
                <svg class="pathway-connections" width="100%" height="100%">
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#6b9f78;stop-opacity:0.6" />
                            <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.6" />
                        </linearGradient>
                        <filter id="pathGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <path d="${pathConnections}" 
                          stroke="url(#pathGradient)" 
                          stroke-width="4" 
                          fill="none" 
                          filter="url(#pathGlow)"
                          stroke-dasharray="10,5"
                          opacity="0.8">
                        <animate attributeName="stroke-dashoffset" 
                                 values="15;0;15" 
                                 dur="3s" 
                                 repeatCount="indefinite"/>
                    </path>
                </svg>
                
                <!-- Module Squares -->
                <div class="module-squares-container">
                    ${modules.map((module, index) => generateProfessionalBoardSquare(module, index, pathPoints[index])).join('')}
                </div>
            </div>
        </div>
        
        <!-- Professional ERNEST Dialogue System -->
        <div id="ernest-dialogue-system" class="professional-ernest-dialogue" style="display: none;">
            <div class="dialogue-overlay"></div>
            <div class="dialogue-container">
                <div class="ernest-avatar-container">
                    <div class="ernest-professional-avatar">
                        <div class="avatar-glow"></div>
                        <div class="avatar-character">${PROFESSIONAL_ICONS.brain}</div>
                    </div>
                </div>
                <div class="dialogue-content-container">
                    <div class="speaker-label">DR. ERNEST</div>
                    <div class="dialogue-message" id="dialogue-message"></div>
                    <div class="dialogue-actions">
                        <button class="professional-dialogue-btn" onclick="closeErnestDialogue()">
                            Continue Learning
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log('✅ Professional Board Game Learning Board Generated');
}

// Check if a module has actual learning content implemented
function moduleHasContent(contentId) {
    const contentTypesWithContent = [
        'emg-introduction',
        'plexus-anatomy',
        'peripheral-anatomy',
        'radiculopathy-pathophysiology',
        'radiculopathy-patho',
        'neuropathy-pathophysiology',
        'neuropathy-patho',
        'ncs-fundamentals',
        'ncs-basics',
        'emg-needle-localization',
        'emg-needle-techniques',
        'muscle-quiz',
        'muscle-anatomy',
        'basic-patterns',
        'pattern-recognition',
        'report-writing',
        'simple-reports',
        'report-templates'
    ];

    return contentTypesWithContent.includes(contentId);
}

// Generate professional board game square
function generateProfessionalBoardSquare(module, index, position) {
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
        statusIcon = PROFESSIONAL_ICONS.completed;
    } else if (isCurrent) {
        statusClass = 'current';
        statusText = 'Current';
        statusIcon = PROFESSIONAL_ICONS.current;
    } else if (isAvailable) {
        statusClass = 'available';
        statusText = 'Available';
        statusIcon = PROFESSIONAL_ICONS.available;
    } else {
        statusClass = 'locked';
        statusText = 'Locked';
        statusIcon = PROFESSIONAL_ICONS.locked;
    }
    
    const isClickable = !isLocked;
    const clickHandler = isClickable ? `showErnestDialogue(${index})` : `showLockedMessage()`;
    const moduleNumber = index + 1;

    // Check if module has actual learning content
    const hasContent = moduleHasContent(module.contentId);
    const contentIndicator = hasContent ? '<div class="content-indicator"></div>' : '';
    
    return `
        <div class="professional-board-square ${statusClass}"
             onclick="${clickHandler}"
             data-module-index="${index}"
             style="left: ${position.x}px; top: ${position.y}px;">

            ${contentIndicator}
            <div class="square-glow"></div>
            <div class="square-content">
                <div class="module-number-badge">${moduleNumber}</div>
                <div class="module-icon-container">
                    <div class="module-icon">${module.icon}</div>
                </div>
                <div class="module-title-short">${module.title}</div>
                <div class="status-indicator">
                    <span class="status-icon">${statusIcon}</span>
                </div>
                <div class="difficulty-stars">
                    ${getDifficultyStars(module.competency)}
                </div>
            </div>
            
            <!-- Hover Detail Panel -->
            <div class="module-detail-panel">
                <h4>${module.title}</h4>
                <p class="competency">${module.competency}</p>
                <p class="description">${module.description}</p>
                <div class="status-badge-detail">
                    <span>${statusIcon} ${statusText}</span>
                </div>
            </div>
        </div>
    `;
}

// Helper function for difficulty indication
function getDifficultyStars(competency) {
    const level = competency.match(/Level (\d)/);
    const starCount = level ? parseInt(level[1]) : 1;
    return PROFESSIONAL_ICONS.star.repeat(starCount);
}

// Professional ERNEST dialogue system
function showErnestDialogue(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];
    
    if (!module) return;
    
    const dialogueSystem = document.getElementById('ernest-dialogue-system');
    const dialogueMessage = document.getElementById('dialogue-message');
    
    if (!dialogueSystem || !dialogueMessage) return;
    
    // Generate professional contextual dialogue
    const dialogue = generateProfessionalDialogue(module, moduleIndex);
    
    // Show dialogue with professional animation
    dialogueMessage.innerHTML = dialogue;
    dialogueSystem.style.display = 'flex';
    
    // Animate appearance
    setTimeout(() => {
        dialogueSystem.classList.add('dialogue-visible');
    }, 50);
    
    ernestDialogueOpen = true;
    console.log(`🎯 Professional ERNEST dialogue opened for: ${module.title}`);
}

function generateProfessionalDialogue(module, index) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    
    if (isCompleted) {
        return `<strong>Excellent mastery of "${module.title}"!</strong><br><br>
                You've successfully completed this ${module.competency} module. Your understanding of ${module.description.toLowerCase()} is now solid. 
                <br><br>Ready to advance to the next challenge on your learning pathway?`;
    } else if (isCurrent) {
        return `<strong>Current Focus: "${module.title}"</strong><br><br>
                This is your active learning module covering ${module.competency}. 
                ${module.description}<br><br>
                Let's dive deep into mastering this essential EMG/NCS competency together!`;
    } else {
        return `<strong>Next Module: "${module.title}"</strong><br><br>
                This ${module.competency} module focuses on ${module.description.toLowerCase()}. 
                <br><br>When you're ready to begin this learning experience, click continue to start your journey!`;
    }
}

function closeErnestDialogue() {
    const dialogueSystem = document.getElementById('ernest-dialogue-system');
    if (dialogueSystem) {
        dialogueSystem.classList.remove('dialogue-visible');
        setTimeout(() => {
            dialogueSystem.style.display = 'none';
        }, 300);
        ernestDialogueOpen = false;
    }
}

function showLockedMessage() {
    const dialogueSystem = document.getElementById('ernest-dialogue-system');
    const dialogueMessage = document.getElementById('dialogue-message');
    
    if (dialogueSystem && dialogueMessage) {
        dialogueMessage.innerHTML = `
            <strong>Module Locked</strong><br><br>
            This advanced module is currently locked. Complete the previous modules in your learning pathway first to unlock this content.
            <br><br>Each step builds upon the previous knowledge - let's maintain our systematic approach to mastery!
        `;
        
        dialogueSystem.style.display = 'flex';
        setTimeout(() => {
            dialogueSystem.classList.add('dialogue-visible');
        }, 50);
        
        ernestDialogueOpen = true;
    }
}

// Mark module as completed (for testing)
function markModuleCompleted(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    if (modules && modules[moduleIndex]) {
        completedModules.add(modules[moduleIndex].id);
        if (moduleIndex >= currentModuleIndex) {
            currentModuleIndex = moduleIndex + 1;
        }
        generateLearningBoard(currentPGYLevel); // Refresh board
        console.log(`✅ Module ${moduleIndex + 1} marked as completed`);
    }
}

// Export functions to global scope
window.generateLearningBoard = generateLearningBoard;
window.learningModulesConfig = learningModulesConfig;
window.showErnestDialogue = showErnestDialogue;
window.closeErnestDialogue = closeErnestDialogue;
window.showLockedMessage = showLockedMessage;
window.markModuleCompleted = markModuleCompleted;

// Set global variables
window.currentPGYLevel = currentPGYLevel;
window.currentModuleIndex = currentModuleIndex;
window.completedModules = completedModules;

console.log('✅ Professional Board Game Candyland System Loaded Successfully!');