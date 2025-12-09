// ENHANCED JOURNEY CANDYLAND SYSTEM
// Beautiful winding pathway with true progression feeling

console.log('✨ Loading Enhanced Journey Candyland System...');

// Global variables
let currentPGYLevel = null;
let currentModuleIndex = 0;
let completedModules = new Set();
let ernestDialogueOpen = false;

// Professional icon system
const PROFESSIONAL_ICONS = {
    brain: '🧠', anatomy: '🫀', microscope: '🔬', lightning: '⚡', chart: '📊', target: '🎯',
    needle: '💉', muscle: '💪', eye: '👁️', balance: '⚖️', document: '📋', stethoscope: '🩺',
    completed: '✅', current: '👉', available: '🔓', locked: '🔒', star: '⭐',
    network: '🕸️', baby: '👶', medical: '⚕️', research: '🔬', quality: '✅',
    link: '🔗', tools: '⚙️', people: '👥', handshake: '🤝', graduation: '🎓', rocket: '🚀'
};

// Complete learning modules config with professional icons
const learningModulesConfig = {
    pgy2: [
        { id: 'intro-emg', title: 'EMG/NCS Introduction', icon: PROFESSIONAL_ICONS.brain, competency: 'Foundation', description: 'Basic principles and patient care approach', contentId: 'emg-introduction' },
        { id: 'peripheral-anatomy', title: 'Peripheral Anatomy', icon: PROFESSIONAL_ICONS.anatomy, competency: 'Competency 1 & 6', description: 'Brachial and lumbosacral plexus foundations', contentId: 'plexus-anatomy' },
        { id: 'radiculopathy-patho', title: 'Radiculopathy Pathophysiology', icon: PROFESSIONAL_ICONS.microscope, competency: 'Competency 2 - Level 1', description: 'Understanding nerve root compression', contentId: 'radiculopathy-pathophysiology' },
        { id: 'neuropathy-patho', title: 'Neuropathy Pathophysiology', icon: PROFESSIONAL_ICONS.lightning, competency: 'Competency 3 - Level 1', description: 'Axonal vs demyelinating processes', contentId: 'neuropathy-pathophysiology' },
        { id: 'ncs-basics', title: 'NCS Fundamentals', icon: PROFESSIONAL_ICONS.chart, competency: 'Competency 1 - Level 1', description: 'Basic nerve conduction principles', contentId: 'ncs-fundamentals' },
        { id: 'ncs-techniques', title: 'NCS Techniques', icon: PROFESSIONAL_ICONS.target, competency: 'Competency 1 - Level 2', description: 'Proper electrode placement and protocols', contentId: 'ncs-techniques' },
        { id: 'emg-needle-basics', title: 'EMG Needle Techniques', icon: PROFESSIONAL_ICONS.needle, competency: 'Competency 2 & 3 - Level 2', description: 'Basic needle EMG evaluation', contentId: 'emg-needle-basics' },
        { id: 'muscle-anatomy', title: 'Muscle Localization', icon: PROFESSIONAL_ICONS.muscle, competency: 'Competency 2 & 3', description: 'Interactive muscle anatomy quiz', contentId: 'muscle-quiz' },
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
        { id: 'entrapments', title: 'Common Entrapments', icon: PROFESSIONAL_ICONS.brain, competency: 'Competency 6 - Level 3', description: 'Articulate common entrapments associated with upper and lower limb', contentId: 'entrapments' }
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

// Beautiful winding journey pathway generator
function generateJourneyPath(numModules) {
    const pathPoints = [];
    const boardWidth = 900;
    const boardHeight = Math.max(1800, numModules * 180); // Much more space
    const squareSize = 140; // Larger squares
    const centerX = boardWidth / 2;
    
    for (let i = 0; i < numModules; i++) {
        const progress = i / (numModules - 1);
        const yPosition = 150 + (progress * (boardHeight - 300));
        
        // Create elegant S-curve using multiple sine waves
        const primaryWave = Math.sin(progress * Math.PI * 2.5) * 200;
        const secondaryWave = Math.sin(progress * Math.PI * 5) * 50;
        const xOffset = primaryWave + secondaryWave;
        const xPosition = centerX + xOffset;
        
        pathPoints.push({
            x: xPosition - squareSize / 2,
            y: yPosition,
            index: i,
            progress: progress
        });
    }
    
    return pathPoints;
}

// Generate smooth pathway connections
function generatePathConnections(pathPoints) {
    if (pathPoints.length < 2) return '';
    
    let pathString = `M ${pathPoints[0].x + 70} ${pathPoints[0].y + 70} `;
    
    for (let i = 0; i < pathPoints.length - 1; i++) {
        const current = pathPoints[i];
        const next = pathPoints[i + 1];
        
        const currentX = current.x + 70;
        const currentY = current.y + 70;
        const nextX = next.x + 70;
        const nextY = next.y + 70;
        
        // Create smooth curves
        const controlPoint1X = currentX + (nextX - currentX) * 0.3;
        const controlPoint1Y = currentY + (nextY - currentY) * 0.2;
        const controlPoint2X = currentX + (nextX - currentX) * 0.7;
        const controlPoint2Y = currentY + (nextY - currentY) * 0.8;
        
        pathString += `C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${nextX} ${nextY} `;
    }
    
    return pathString;
}

// Determine terrain theme
function getTerrainTheme(moduleIndex, totalModules) {
    const progress = moduleIndex / totalModules;
    
    if (progress < 0.33) {
        return { theme: 'forest', bgColor: 'rgba(34, 197, 94, 0.08)', decoration: '🌲', pathColor: '#22c55e' };
    } else if (progress < 0.66) {
        return { theme: 'mountain', bgColor: 'rgba(168, 85, 247, 0.08)', decoration: '⛰️', pathColor: '#a855f7' };
    } else {
        return { theme: 'summit', bgColor: 'rgba(234, 179, 8, 0.08)', decoration: '☁️', pathColor: '#eab308' };
    }
}

// Check if milestone
function isMilestoneModule(index, totalModules) {
    const progress = (index + 1) / totalModules;
    return [0.25, 0.5, 0.75, 1.0].includes(Math.round(progress * 100) / 100);
}

// Generate enhanced journey square
function generateJourneySquare(module, index, position, totalModules) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    const isAvailable = index <= currentModuleIndex && !isCompleted;
    const isLocked = index > currentModuleIndex && !isCompleted;
    const isMilestone = isMilestoneModule(index, totalModules);
    
    let statusClass = '';
    let statusIcon = '';
    
    if (isCompleted) {
        statusClass = 'completed';
        statusIcon = PROFESSIONAL_ICONS.completed;
    } else if (isCurrent) {
        statusClass = 'current';
        statusIcon = PROFESSIONAL_ICONS.current;
    } else if (isAvailable) {
        statusClass = 'available';
        statusIcon = PROFESSIONAL_ICONS.available;
    } else {
        statusClass = 'locked';
        statusIcon = PROFESSIONAL_ICONS.locked;
    }
    
    const clickHandler = !isLocked ? `showErnestDialogue(${index})` : `showLockedMessage()`;
    const terrain = getTerrainTheme(index, totalModules);
    
    return `
        <div class="journey-square ${statusClass} ${isMilestone ? 'milestone' : ''}" 
             onclick="${clickHandler}" 
             data-module-index="${index}"
             style="left: ${position.x}px; top: ${position.y}px; border-color: ${terrain.pathColor};">
             
            <div class="square-aura"></div>
            <div class="square-inner">
                <div class="module-number">${index + 1}</div>
                <div class="module-icon-large">${module.icon}</div>
                <div class="module-title-compact">${module.title}</div>
                <div class="status-badge">
                    <span>${statusIcon}</span>
                </div>
                ${isMilestone ? '<div class="milestone-crown">👑</div>' : ''}
            </div>
            
            <!-- Hover Info Panel -->
            <div class="module-info-panel">
                <h4>${module.title}</h4>
                <p class="competency-info">${module.competency}</p>
                <p class="description-info">${module.description}</p>
                <div class="terrain-badge">${terrain.decoration} ${terrain.theme}</div>
            </div>
        </div>
    `;
}

// Generate environmental decorations
function generateEnvironmentalDecorations(pathPoints, totalModules) {
    let decorations = '';
    
    pathPoints.forEach((point, index) => {
        const terrain = getTerrainTheme(index, totalModules);
        const random1 = (index * 7) % 3;
        const random2 = (index * 11) % 5;
        
        decorations += `
            <div class="environment-decoration ${terrain.theme}" 
                 style="left: ${point.x + 160 + random1 * 20}px; top: ${point.y + random2 * 30}px;">
                ${terrain.decoration}
            </div>
        `;
    });
    
    return decorations;
}

// Main board generation
function generateLearningBoard(pgyLevel) {
    console.log('✨ Generating Enhanced Journey Learning Board...');
    
    const boardContainer = document.getElementById('learning-board');
    const modules = learningModulesConfig[pgyLevel];
    currentPGYLevel = pgyLevel;
    
    if (!boardContainer || !modules) {
        console.error('Board container or modules not found');
        return;
    }
    
    const pathPoints = generateJourneyPath(modules.length);
    const pathConnections = generatePathConnections(pathPoints);
    const boardHeight = Math.max(1800, modules.length * 180);
    const progressPercentage = Math.round((completedModules.size / modules.length) * 100);
    
    boardContainer.innerHTML = `
        <div class="enhanced-journey-board">
            <!-- Beautiful Journey Header -->
            <div class="journey-header">
                <div class="header-content">
                    <h2>✨ ${pgyLevel.toUpperCase()} Learning Journey</h2>
                    <p class="journey-description">Embark on your path to EMG/NCS mastery</p>
                </div>
                <div class="journey-stats">
                    <div class="stat-card completed">
                        <span class="stat-number">${completedModules.size}</span>
                        <span class="stat-label">Completed</span>
                    </div>
                    <div class="stat-card remaining">
                        <span class="stat-number">${modules.length - completedModules.size}</span>
                        <span class="stat-label">Remaining</span>
                    </div>
                    <div class="stat-card progress">
                        <span class="stat-number">${progressPercentage}%</span>
                        <span class="stat-label">Progress</span>
                    </div>
                </div>
                <div class="enhanced-progress-bar">
                    <div class="progress-track"></div>
                    <div class="progress-fill" style="width: ${progressPercentage}%">
                        <div class="progress-glow"></div>
                    </div>
                    <div class="milestone-markers">
                        <div class="milestone-marker ${progressPercentage >= 25 ? 'reached' : ''}" style="left: 25%">
                            <span>25%</span>
                        </div>
                        <div class="milestone-marker ${progressPercentage >= 50 ? 'reached' : ''}" style="left: 50%">
                            <span>50%</span>
                        </div>
                        <div class="milestone-marker ${progressPercentage >= 75 ? 'reached' : ''}" style="left: 75%">
                            <span>75%</span>
                        </div>
                        <div class="milestone-marker ${progressPercentage >= 100 ? 'reached' : ''}" style="left: 100%">
                            <span>🏆</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Journey Canvas -->
            <div class="journey-canvas" style="height: ${boardHeight}px;">
                <!-- Magical Pathway -->
                <svg class="magical-pathway" width="100%" height="100%" viewBox="0 0 900 ${boardHeight}">
                    <defs>
                        <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#22c55e;stop-opacity:0.9" />
                            <stop offset="40%" style="stop-color:#a855f7;stop-opacity:0.9" />
                            <stop offset="80%" style="stop-color:#eab308;stop-opacity:0.9" />
                            <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.9" />
                        </linearGradient>
                        <filter id="magicalGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    <path d="${pathConnections}" 
                          stroke="url(#journeyGradient)" 
                          stroke-width="16" 
                          fill="none" 
                          filter="url(#magicalGlow)"
                          stroke-linecap="round">
                    </path>
                </svg>
                
                <!-- Journey Squares -->
                <div class="journey-squares">
                    ${modules.map((module, index) => generateJourneySquare(module, index, pathPoints[index], modules.length)).join('')}
                </div>
                
                <!-- Environmental Decorations -->
                <div class="environment-layer">
                    ${generateEnvironmentalDecorations(pathPoints, modules.length)}
                </div>
            </div>
        </div>
        
        <!-- Enhanced ERNEST Dialogue -->
        <div id="ernest-dialogue-system" class="enhanced-ernest-dialogue" style="display: none;">
            <div class="dialogue-backdrop"></div>
            <div class="dialogue-panel">
                <div class="ernest-avatar-section">
                    <div class="ernest-avatar-enhanced">
                        <div class="avatar-glow-ring"></div>
                        <div class="avatar-character">${PROFESSIONAL_ICONS.brain}</div>
                    </div>
                    <h3>Dr. ERNEST</h3>
                </div>
                <div class="dialogue-content-section">
                    <div class="dialogue-text" id="dialogue-text"></div>
                    <div class="dialogue-actions">
                        <button class="enhanced-dialogue-btn" onclick="closeErnestDialogue()">
                            Continue Journey ✨
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log('✅ Enhanced Journey Board Generated Successfully!');
}

// Enhanced learning content integration
const contentMapping = {
    // PGY-2 Foundation Modules
    'emg-introduction': { type: 'interactive', source: 'intro-lesson', title: 'EMG/NCS Introduction' },
    'plexus-anatomy': { type: 'interactive', source: 'muscle-quiz', title: 'Interactive Muscle Anatomy' },
    'radiculopathy-pathophysiology': { type: 'lesson', source: 'pathophysiology', title: 'Radiculopathy Pathophysiology' },
    'neuropathy-pathophysiology': { type: 'lesson', source: 'pathophysiology', title: 'Neuropathy Pathophysiology' },
    'ncs-fundamentals': { type: 'lesson', source: 'ncs-basics', title: 'NCS Fundamentals' },
    'ncs-techniques': { type: 'interactive', source: 'ncs-technique-videos', title: 'NCS Techniques' },
    'emg-needle-basics': { type: 'lesson', source: 'emg-needle-intro', title: 'EMG Needle Techniques' },
    'muscle-quiz': { type: 'quiz', source: 'muscle-localization', title: 'Muscle Localization Quiz' },
    'basic-patterns': { type: 'interactive', source: 'emg-waveforms', title: 'Basic Pattern Recognition' },
    'neuropathy-myopathy-basics': { type: 'lesson', source: 'differential-basics', title: 'Neuropathy vs Myopathy' },
    'simple-reports': { type: 'interactive', source: 'report-writing', title: 'Basic Report Writing' },
    'clinical-correlation': { type: 'case-study', source: 'clinical-cases', title: 'Clinical Application' }
};

// ERNEST dialogue functions with learning integration
function showErnestDialogue(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];
    
    if (!module) return;
    
    const dialogueSystem = document.getElementById('ernest-dialogue-system');
    const dialogueText = document.getElementById('dialogue-text');
    
    if (!dialogueSystem || !dialogueText) return;
    
    const dialogue = generateContextualDialogue(module, moduleIndex);
    dialogueText.innerHTML = dialogue;
    
    // Update dialogue button to start learning
    const dialogueActions = dialogueSystem.querySelector('.dialogue-actions');
    const hasContent = contentMapping[module.id];
    
    if (hasContent && !completedModules.has(module.id) && moduleIndex <= currentModuleIndex) {
        dialogueActions.innerHTML = `
            <button class="enhanced-dialogue-btn primary" onclick="startLearningModule(${moduleIndex})">
                Start Learning ✨
            </button>
            <button class="enhanced-dialogue-btn secondary" onclick="closeErnestDialogue()">
                Not Now
            </button>
        `;
    } else {
        dialogueActions.innerHTML = `
            <button class="enhanced-dialogue-btn" onclick="closeErnestDialogue()">
                Continue Journey ✨
            </button>
        `;
    }
    
    dialogueSystem.style.display = 'flex';
    setTimeout(() => dialogueSystem.classList.add('visible'), 50);
    
    ernestDialogueOpen = true;
    console.log(`✨ Enhanced ERNEST dialogue for: ${module.title}`);
}

// Start learning module with smooth transition
function startLearningModule(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];
    
    if (!module || !contentMapping[module.id]) {
        console.error('Module or content mapping not found:', module);
        return;
    }
    
    console.log(`🎓 Starting learning module: ${module.title}`);
    
    // Close ERNEST dialogue first
    closeErnestDialogue();
    
    // Animate the selected square
    animateSquareSelection(moduleIndex);
    
    // Show learning modal after brief animation
    setTimeout(() => {
        showLearningModal(module, moduleIndex);
    }, 300);
}

// Animate square selection
function animateSquareSelection(moduleIndex) {
    const square = document.querySelector(`[data-module-index="${moduleIndex}"]`);
    if (square) {
        square.classList.add('selected');
        square.style.transform = 'translateY(-8px) scale(1.1)';
        square.style.zIndex = '200';
        
        // Add glow effect
        const aura = square.querySelector('.square-aura');
        if (aura) {
            aura.style.opacity = '1';
            aura.style.animation = 'selectedGlow 1s ease-in-out infinite';
        }
    }
}

// Show learning modal with journey context
function showLearningModal(module, moduleIndex) {
    const contentInfo = contentMapping[module.id];
    const terrain = getTerrainTheme(moduleIndex, learningModulesConfig[currentPGYLevel].length);
    
    // Create modal HTML
    const modalHTML = `
        <div class="learning-modal-overlay">
            <div class="learning-modal" data-terrain="${terrain.theme}">
                <!-- Journey Context Header -->
                <div class="learning-header">
                    <div class="journey-breadcrumb">
                        <span class="breadcrumb-terrain">${terrain.decoration} ${terrain.theme}</span>
                        <span class="breadcrumb-separator">→</span>
                        <span class="breadcrumb-module">Module ${moduleIndex + 1}</span>
                    </div>
                    <h2 class="learning-title">${module.title}</h2>
                    <p class="learning-competency">${module.competency}</p>
                    <button class="close-learning-btn" onclick="closeLearningModal(${moduleIndex})">×</button>
                </div>
                
                <!-- Learning Content Area -->
                <div class="learning-content-area" id="learning-content-${moduleIndex}">
                    <div class="content-loading">
                        <div class="loading-spinner"></div>
                        <p>Loading ${contentInfo.title}...</p>
                    </div>
                </div>
                
                <!-- Learning Progress Footer -->
                <div class="learning-footer">
                    <div class="learning-progress-bar">
                        <div class="progress-track"></div>
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="learning-actions">
                        <button class="learning-btn secondary" onclick="closeLearningModal(${moduleIndex})">
                            Back to Journey
                        </button>
                        <button class="learning-btn primary disabled" id="complete-module-btn-${moduleIndex}" onclick="completeModule(${moduleIndex})">
                            Complete Module
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show with animation
    const overlay = document.querySelector('.learning-modal-overlay');
    setTimeout(() => {
        overlay.classList.add('visible');
        loadModuleContent(module, moduleIndex);
    }, 50);
}

// Enhanced content loading system with smooth transitions
function loadLearningContent(module, moduleIndex) {
    const contentArea = document.getElementById(`learning-content-${moduleIndex}`);

    // Show loading animation while content is being prepared
    showLoadingAnimation(moduleIndex);

    setTimeout(() => {
        const contentHTML = generateLearningContentByType(module, moduleIndex);

        // Fade out loading, fade in content
        const loadingDiv = contentArea.querySelector('.content-loading');
        loadingDiv.style.opacity = '0';

        setTimeout(() => {
            contentArea.innerHTML = contentHTML;
            contentArea.style.opacity = '0';
            requestAnimationFrame(() => {
                contentArea.style.transition = 'opacity 0.5s ease';
                contentArea.style.opacity = '1';
            });

            // Initialize interactive elements
            initializeInteractiveContent(module, moduleIndex);
        }, 300);
    }, 800); // Realistic loading time
}

function showLoadingAnimation(moduleIndex) {
    const loadingDiv = document.querySelector(`#learning-content-${moduleIndex} .content-loading`);
    if (loadingDiv) {
        const messages = [
            'Loading interactive content...',
            'Preparing learning materials...',
            'Setting up your personalized experience...',
            'Almost ready to begin learning...'
        ];

        let messageIndex = 0;
        const messageElement = loadingDiv.querySelector('p');

        const messageInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            messageElement.textContent = messages[messageIndex];
        }, 1500);

        // Store interval to clear it later
        loadingDiv.dataset.messageInterval = messageInterval;
    }
}

function generateLearningContentByType(module, moduleIndex) {
    const contentId = module.contentId || module.id;

    switch(contentId) {
        case 'emg-introduction':
            return generateEMGIntroductionContent(module);
        case 'muscle-quiz':
            return generateMuscleQuizContent(module);
        case 'plexus-anatomy':
            return generatePlexusAnatomyContent(module);
        case 'radiculopathy-pathophysiology':
            return generateRadiculopathyContent(module);
        case 'neuropathy-pathophysiology':
            return generateNeuropathyContent(module);
        case 'ncs-fundamentals':
            return generateNCSFundamentalsContent(module);
        case 'ncs-techniques':
            return generateNCSTechniquesContent(module);
        case 'emg-needle-basics':
            return generateEMGNeedleBasicsContent(module);
        case 'basic-patterns':
            return generateBasicPatternsContent(module);
        default:
            return generatePlaceholderContent(module);
    }
}

function initializeInteractiveContent(module, moduleIndex) {
    // Initialize any interactive elements specific to the content type
    console.log(`🎯 Initializing interactive content for: ${module.title}`);

    // Enable completion button after some interaction
    setTimeout(() => {
        const completeBtn = document.getElementById(`complete-module-btn-${moduleIndex}`);
        if (completeBtn) {
            completeBtn.classList.remove('disabled');
        }
    }, 5000); // Enable after 5 seconds of viewing
}

// Modal helper functions
function showModalErnestHelp(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];

    const ernestHTML = `
        <div class="modal-ernest-dialogue">
            <div class="ernest-avatar">🤖</div>
            <div class="ernest-message">
                <h4>💡 Learning Tip for ${module.title}</h4>
                <p>This module focuses on ${module.description.toLowerCase()}. Here are some key points to remember:</p>
                <ul>
                    <li>Take your time to understand the core concepts</li>
                    <li>Practice the interactive elements</li>
                    <li>Don't hesitate to review material multiple times</li>
                </ul>
                <button onclick="closeModalErnestHelp()">Got it, thanks!</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', ernestHTML);
}

function closeModalErnestHelp() {
    const dialogue = document.querySelector('.modal-ernest-dialogue');
    if (dialogue) {
        dialogue.remove();
    }
}

function closeLearningModal(moduleIndex) {
    const overlay = document.querySelector(`#learning-modal-overlay-${moduleIndex}`) ||
                   document.querySelector('.learning-modal-overlay');

    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 400);
    }
}

// Content generation functions for each module type
function generateEMGIntroductionContent(module) {
    return `
        <div class="interactive-content">
            <h3>Welcome to EMG/NCS Learning! 🧠</h3>
            <p>Electromyography (EMG) and Nerve Conduction Studies (NCS) are essential diagnostic tools in neurology. Let's begin your journey to mastering these techniques.</p>

            <div class="learning-section">
                <h4>What You'll Learn</h4>
                <ul>
                    <li>Basic principles of nerve conduction</li>
                    <li>EMG equipment and setup</li>
                    <li>Patient care and communication</li>
                    <li>Safety protocols</li>
                </ul>
            </div>

            <div class="quiz-section">
                <h4>Quick Knowledge Check</h4>
                <p>What does EMG stand for?</p>
                <div class="quiz-options">
                    <button class="quiz-option" onclick="checkAnswer(this, true)">Electromyography</button>
                    <button class="quiz-option" onclick="checkAnswer(this, false)">Electroencephalography</button>
                    <button class="quiz-option" onclick="checkAnswer(this, false)">Electrocardiography</button>
                </div>
            </div>
        </div>
    `;
}

function generateMuscleQuizContent(module) {
    return `
        <div class="interactive-content">
            <h3>Muscle Localization Quiz 💪</h3>
            <p>Test your knowledge of muscle anatomy and innervation patterns.</p>

            <div class="quiz-section">
                <h4>Question 1: Deltoid Muscle</h4>
                <p>Which nerve innervates the deltoid muscle?</p>
                <div class="quiz-options">
                    <button class="quiz-option" onclick="checkMuscleAnswer(this, true)">Axillary nerve</button>
                    <button class="quiz-option" onclick="checkMuscleAnswer(this, false)">Musculocutaneous nerve</button>
                    <button class="quiz-option" onclick="checkMuscleAnswer(this, false)">Median nerve</button>
                </div>
            </div>

            <div class="learning-section">
                <h4>Muscle Groups to Master</h4>
                <ul>
                    <li>Upper limb muscles and their innervation</li>
                    <li>Lower limb muscle anatomy</li>
                    <li>Proximal vs distal muscle patterns</li>
                    <li>Clinical correlation with findings</li>
                </ul>
            </div>
        </div>
    `;
}

function generatePlaceholderContent(module) {
    return `
        <div class="interactive-content">
            <h3>${module.title} - Coming Soon! 🚧</h3>
            <p>${module.description}</p>

            <div class="learning-section">
                <h4>This Module Will Cover:</h4>
                <p>This comprehensive learning module is currently under development and will include:</p>
                <ul>
                    <li>Interactive lessons and demonstrations</li>
                    <li>Clinical case studies</li>
                    <li>Practice quizzes and assessments</li>
                    <li>Real-world application scenarios</li>
                </ul>

                <div class="placeholder-status">
                    <p>📚 <strong>Content Status:</strong> In development</p>
                    <p>🎯 <strong>Competency Level:</strong> ${module.competency}</p>
                    <p>⏰ <strong>Estimated Launch:</strong> Coming soon</p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p><em>For now, you can mark this module as "completed" to continue your learning journey.</em></p>
                </div>
            </div>
        </div>
    `;
}

// Export to global scope
                        <li>Understand the basic principles of EMG and NCS</li>
                        <li>Learn about patient safety and preparation</li>
                        <li>Recognize the clinical applications</li>
                        <li>Appreciate the importance of proper technique</li>
                    </ul>
                </div>
                
                <div class="interactive-section">
                    <h4>🎯 Quick Check</h4>
                    <div class="quiz-question">
                        <p>What does EMG stand for?</p>
                        <div class="quiz-options">
                            <button class="quiz-option" onclick="checkAnswer(this, false)">Electrocardiography</button>
                            <button class="quiz-option" onclick="checkAnswer(this, true)">Electromyography</button>
                            <button class="quiz-option" onclick="checkAnswer(this, false)">Electroencephalography</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateMuscleQuizContent(module) {
    return `
        <div class="quiz-content">
            <div class="quiz-header">
                <h3>💪 Interactive Muscle Anatomy</h3>
                <p>Test your knowledge of muscle localization and innervation patterns</p>
            </div>
            
            <div class="anatomy-viewer">
                <div class="anatomy-image">
                    <img src="images/brachial-plexus-diagram.jpg" alt="Brachial Plexus" style="max-width: 100%; height: auto;" />
                </div>
                <div class="anatomy-controls">
                    <button class="anatomy-btn" onclick="showUpperLimb()">Upper Limb</button>
                    <button class="anatomy-btn" onclick="showLowerLimb()">Lower Limb</button>
                    <button class="anatomy-btn" onclick="startMuscleQuiz()">Start Quiz</button>
                </div>
            </div>
            
            <div class="quiz-area" id="muscle-quiz-area" style="display: none;">
                <div class="quiz-question">
                    <h4>Which nerve innervates the deltoid muscle?</h4>
                    <div class="quiz-options">
                        <button class="quiz-option" onclick="checkMuscleAnswer(this, false)">Suprascapular nerve</button>
                        <button class="quiz-option" onclick="checkMuscleAnswer(this, true)">Axillary nerve</button>
                        <button class="quiz-option" onclick="checkMuscleAnswer(this, false)">Long thoracic nerve</button>
                        <button class="quiz-option" onclick="checkMuscleAnswer(this, false)">Musculocutaneous nerve</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generatePathophysiologyContent(module) {
    const isRadiculopathy = module.id.includes('radiculopathy');
    
    return `
        <div class="pathophysiology-content">
            <div class="patho-header">
                <h3>🔬 ${isRadiculopathy ? 'Radiculopathy' : 'Neuropathy'} Pathophysiology</h3>
                <p>Understanding the underlying mechanisms is crucial for accurate diagnosis</p>
            </div>
            
            ${isRadiculopathy ? `
                <div class="patho-section">
                    <h4>Nerve Root Compression Mechanisms</h4>
                    <div class="mechanism-card">
                        <h5>🏗️ Structural Changes</h5>
                        <p>Disc herniation, osteophytes, and ligamentum flavum thickening can compress nerve roots in the neural foramen or lateral recess.</p>
                    </div>
                    <div class="mechanism-card">
                        <h5>⚡ Physiological Impact</h5>
                        <p>Compression leads to ischemia, inflammation, and altered nerve conduction, affecting both sensory and motor fibers.</p>
                    </div>
                    <div class="mechanism-card">
                        <h5>🎯 EMG Correlation</h5>
                        <p>Acute denervation shows fibrillations and positive sharp waves. Chronic changes show large, polyphasic motor units.</p>
                    </div>
                </div>
            ` : `
                <div class="patho-section">
                    <h4>Peripheral Neuropathy Mechanisms</h4>
                    <div class="mechanism-card">
                        <h5>🧬 Axonal vs Demyelinating</h5>
                        <p>Axonal neuropathy affects the nerve fiber itself, while demyelinating neuropathy affects the myelin sheath.</p>
                    </div>
                    <div class="mechanism-card">
                        <h5>📊 NCS Patterns</h5>
                        <p>Axonal: Reduced amplitudes with normal velocities. Demyelinating: Slow velocities with conduction blocks.</p>
                    </div>
                    <div class="mechanism-card">
                        <h5>🔍 Clinical Correlation</h5>
                        <p>Axonal patterns suggest metabolic or toxic causes. Demyelinating patterns suggest inflammatory or hereditary causes.</p>
                    </div>
                </div>
            `}
            
            <div class="interactive-diagram">
                <h4>📈 Interactive Learning</h4>
                <div class="diagram-controls">
                    <button class="diagram-btn active" onclick="showNormalNerve()">Normal Nerve</button>
                    <button class="diagram-btn" onclick="showPathology()">Pathological Changes</button>
                    <button class="diagram-btn" onclick="showEMGFindings()">EMG Findings</button>
                </div>
                <div class="diagram-area">
                    <p>Click the buttons above to explore different aspects of nerve pathophysiology</p>
                </div>
            </div>
        </div>
    `;
}

function generateNCSBasicsContent(module) {
    return `
        <div class="ncs-basics-content">
            <div class="ncs-header">
                <h3>⚡ Nerve Conduction Study Fundamentals</h3>
                <p>Master the basic principles that underlie all NCS testing</p>
            </div>
            
            <div class="fundamentals-section">
                <div class="principle-card">
                    <h4>🔋 Basic Principle</h4>
                    <p>NCS measures the speed and amplitude of electrical impulses as they travel along peripheral nerves.</p>
                    <div class="formula-box">
                        <strong>Conduction Velocity = Distance / Time</strong>
                    </div>
                </div>
                
                <div class="principle-card">
                    <h4>📏 Key Measurements</h4>
                    <ul>
                        <li><strong>Latency:</strong> Time from stimulus to response onset</li>
                        <li><strong>Amplitude:</strong> Size of the response (muscle or nerve)</li>
                        <li><strong>Velocity:</strong> Speed of nerve conduction</li>
                        <li><strong>Duration:</strong> Total time of the response</li>
                    </ul>
                </div>
                
                <div class="principle-card">
                    <h4>🎯 Clinical Applications</h4>
                    <div class="application-grid">
                        <div class="app-item">
                            <strong>Carpal Tunnel:</strong><br>Median nerve slowing at wrist
                        </div>
                        <div class="app-item">
                            <strong>Ulnar Neuropathy:</strong><br>Conduction block at elbow
                        </div>
                        <div class="app-item">
                            <strong>Polyneuropathy:</strong><br>Distal amplitude reduction
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="interactive-ncs">
                <h4>🖱️ Virtual NCS Setup</h4>
                <div class="virtual-setup">
                    <div class="setup-controls">
                        <button class="setup-btn" onclick="setupMedianNCS()">Setup Median NCS</button>
                        <button class="setup-btn" onclick="setupUlnarNCS()">Setup Ulnar NCS</button>
                        <button class="setup-btn" onclick="runSimulation()">Run Simulation</button>
                    </div>
                    <div class="simulation-area">
                        <p>Select a nerve setup above to see proper electrode placement and expected waveforms</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generatePlaceholderContent(module, contentInfo) {
    return `
        <div class="placeholder-content">
            <div class="placeholder-header">
                <h3>🚧 ${module.title}</h3>
                <p>This ${contentInfo.type} module is under development</p>
            </div>
            
            <div class="placeholder-body">
                <div class="development-info">
                    <h4>📋 Planned Content:</h4>
                    <ul>
                        <li>Interactive learning materials</li>
                        <li>Clinical case studies</li>
                        <li>Self-assessment quizzes</li>
                        <li>Visual learning aids</li>
                    </ul>
                </div>
                
                <div class="preview-section">
                    <h4>🔍 Module Preview:</h4>
                    <p><strong>Competency:</strong> ${module.competency}</p>
                    <p><strong>Description:</strong> ${module.description}</p>
                    <p><strong>Learning Type:</strong> ${contentInfo.type}</p>
                </div>
                
                <div class="coming-soon">
                    <p>✨ This comprehensive learning module will be available soon!</p>
                </div>
            </div>
        </div>
    `;
}

// Modal management functions
function closeLearningModal(moduleIndex) {
    const overlay = document.querySelector('.learning-modal-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(() => {
            overlay.remove();
            resetSquareSelection(moduleIndex);
        }, 300);
    }
}

function resetSquareSelection(moduleIndex) {
    const square = document.querySelector(`[data-module-index="${moduleIndex}"]`);
    if (square) {
        square.classList.remove('selected');
        square.style.transform = '';
        square.style.zIndex = '';
        
        const aura = square.querySelector('.square-aura');
        if (aura) {
            aura.style.opacity = '';
            aura.style.animation = '';
        }
    }
}

function completeModule(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    if (modules && modules[moduleIndex]) {
        // Mark as completed
        completedModules.add(modules[moduleIndex].id);
        if (moduleIndex >= currentModuleIndex) {
            currentModuleIndex = moduleIndex + 1;
        }
        
        // Show completion celebration
        showCompletionCelebration(modules[moduleIndex]);
        
        // Close modal and refresh board
        setTimeout(() => {
            closeLearningModal(moduleIndex);
            generateLearningBoard(currentPGYLevel);
        }, 2000);
        
        console.log(`🎉 Module ${moduleIndex + 1} completed: ${modules[moduleIndex].title}`);
    }
}

function showCompletionCelebration(module) {
    const celebrationHTML = `
        <div class="celebration-overlay">
            <div class="celebration-content">
                <div class="celebration-animation">🎉</div>
                <h3>Module Completed!</h3>
                <p><strong>${module.title}</strong> has been mastered!</p>
                <div class="celebration-progress">
                    <p>Your journey continues...</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', celebrationHTML);
    
    setTimeout(() => {
        const celebration = document.querySelector('.celebration-overlay');
        if (celebration) {
            celebration.remove();
        }
    }, 2000);
}

function updateLearningProgress(moduleIndex, percentage) {
    const progressBar = document.querySelector('.learning-progress-bar .progress-fill');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// Quiz interaction functions
function checkAnswer(button, isCorrect) {
    const options = button.parentElement.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.disabled = true;
        if (option === button) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });
    
    setTimeout(() => {
        if (isCorrect) {
            button.parentElement.innerHTML = '<p class="quiz-result correct">✅ Correct! Well done.</p>';
        } else {
            button.parentElement.innerHTML = '<p class="quiz-result incorrect">❌ Incorrect. The answer is Electromyography.</p>';
        }
    }, 1000);
}

function checkMuscleAnswer(button, isCorrect) {
    const options = button.parentElement.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.disabled = true;
        if (option === button) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });
    
    setTimeout(() => {
        if (isCorrect) {
            button.parentElement.innerHTML = '<p class="quiz-result correct">✅ Correct! The axillary nerve (C5-C6) innervates the deltoid muscle.</p>';
        } else {
            button.parentElement.innerHTML = '<p class="quiz-result incorrect">❌ Incorrect. The axillary nerve innervates the deltoid muscle.</p>';
        }
    }, 1000);
}

function generateContextualDialogue(module, index) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    const isMilestone = isMilestoneModule(index, learningModulesConfig[currentPGYLevel].length);
    
    if (isCompleted) {
        return `<h4>🎉 Excellent Progress!</h4>
                <p>You've successfully mastered <strong>"${module.title}"</strong>! Your understanding of ${module.description.toLowerCase()} is now solid.</p>
                <p>Ready to continue your journey toward EMG/NCS expertise?</p>`;
    } else if (isCurrent) {
        const milestoneText = isMilestone ? '<p><strong>🏆 This is a milestone module!</strong> Completing this will mark a significant achievement in your learning journey.</p>' : '';
        return `<h4>🎯 Current Focus</h4>
                <p>Welcome to <strong>"${module.title}"</strong> - your active learning module covering ${module.competency}.</p>
                <p>${module.description}</p>
                ${milestoneText}
                <p>Let's master this essential EMG/NCS competency together!</p>`;
    } else {
        return `<h4>🚀 Next Adventure</h4>
                <p>Ahead lies <strong>"${module.title}"</strong> - an exciting ${module.competency} module.</p>
                <p>${module.description}</p>
                <p>When you're ready to begin this learning experience, your journey awaits!</p>`;
    }
}

function closeErnestDialogue() {
    const dialogueSystem = document.getElementById('ernest-dialogue-system');
    if (dialogueSystem) {
        dialogueSystem.classList.remove('visible');
        setTimeout(() => dialogueSystem.style.display = 'none', 300);
        ernestDialogueOpen = false;
    }
}

function showLockedMessage() {
    const dialogueSystem = document.getElementById('ernst-dialogue-system');
    const dialogueText = document.getElementById('dialogue-text');
    
    if (dialogueSystem && dialogueText) {
        dialogueText.innerHTML = `
            <h4>🔒 Adventure Locked</h4>
            <p>This exciting module awaits your arrival! Complete the previous steps on your learning journey first.</p>
            <p>Each step builds upon the last - let's maintain our systematic approach to mastery!</p>
        `;
        
        dialogueSystem.style.display = 'flex';
        setTimeout(() => dialogueSystem.classList.add('visible'), 50);
        ernestDialogueOpen = true;
    }
}

// Testing function
function markModuleCompleted(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    if (modules && modules[moduleIndex]) {
        completedModules.add(modules[moduleIndex].id);
        if (moduleIndex >= currentModuleIndex) {
            currentModuleIndex = moduleIndex + 1;
        }
        generateLearningBoard(currentPGYLevel);
        console.log(`✅ Module ${moduleIndex + 1} completed - Journey continues!`);
    }
}

// Export to global scope
window.generateLearningBoard = generateLearningBoard;
window.learningModulesConfig = learningModulesConfig;
window.showErnestDialogue = showErnestDialogue;
window.closeErnestDialogue = closeErnestDialogue;
window.showLockedMessage = showLockedMessage;
window.markModuleCompleted = markModuleCompleted;
window.currentPGYLevel = currentPGYLevel;
window.currentModuleIndex = currentModuleIndex;
window.completedModules = completedModules;

console.log('✨🎮 Enhanced Journey Candyland System - Ready for Adventure!');