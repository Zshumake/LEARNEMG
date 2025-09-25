// SIMPLIFIED PROFESSIONAL CANDYLAND SYSTEM
// Clean board design with Pokemon-style ERNEST dialogue

console.log('🎯 Loading simplified professional Candyland system...');

// Global variables
let currentPGYLevel = null;
let currentModuleIndex = 0;
let completedModules = new Set();
let ernestDialogueOpen = false;

// Complete learning modules config (same as original)
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

// SIMPLIFIED: Generate clean professional board
function generateLearningBoard(pgyLevel) {
    console.log('🎯 Generating simplified professional board...');
    
    const boardContainer = document.getElementById('learning-board');
    const modules = learningModulesConfig[pgyLevel];
    currentPGYLevel = pgyLevel;
    
    if (!boardContainer || !modules) {
        console.error('Board container or modules not found');
        return;
    }
    
    // Create clean, professional board layout
    boardContainer.innerHTML = `
        <div class="professional-learning-board">
            <div class="board-header">
                <h2>🎯 ${pgyLevel.toUpperCase()} Learning Pathway</h2>
                <div class="progress-indicator">
                    <span>Progress: ${completedModules.size}/${modules.length} modules</span>
                </div>
            </div>
            <div class="learning-path-grid">
                ${modules.map((module, index) => generateProfessionalModuleCard(module, index)).join('')}
            </div>
        </div>
        
        <!-- ERNEST Pokemon-style dialogue system -->
        <div id="ernest-dialogue-system" class="ernest-dialogue-container" style="display: none;">
            <div class="dialogue-bar">
                <div class="ernest-avatar">
                    <div class="ernest-character-small">🧠</div>
                </div>
                <div class="dialogue-content">
                    <div class="dialogue-text" id="dialogue-text"></div>
                    <div class="dialogue-controls">
                        <button onclick="closeErnestDialogue()" class="dialogue-btn">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log('✅ Professional board generated successfully');
}

// Generate professional module cards (no floating elements)
function generateProfessionalModuleCard(module, index) {
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
    const clickHandler = isClickable ? `showErnestDialogue(${index})` : `showLockedMessage()`;
    const moduleNumber = index + 1;
    
    return `
        <div class="professional-module-card ${statusClass}" onclick="${clickHandler}" data-module-index="${index}">
            <div class="card-header">
                <div class="module-number">${moduleNumber}</div>
                <div class="status-badge">
                    <span class="status-icon">${statusIcon}</span>
                    <span class="status-text">${statusText}</span>
                </div>
            </div>
            <div class="card-content">
                <div class="module-icon-large">${module.icon}</div>
                <div class="module-info">
                    <h3 class="module-title">${module.title}</h3>
                    <p class="module-competency">${module.competency}</p>
                    <p class="module-description">${module.description}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="difficulty-indicator">${getDifficultyStars(module.competency)}</div>
            </div>
        </div>
    `;
}

// Helper function for difficulty indication
function getDifficultyStars(competency) {
    if (competency.includes('Level 3')) return '⭐⭐⭐';
    if (competency.includes('Level 2')) return '⭐⭐';
    if (competency.includes('Level 1')) return '⭐';
    return '⭐';
}

// Pokemon-style ERNEST dialogue system
function showErnestDialogue(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];
    
    if (!module) return;
    
    const dialogueSystem = document.getElementById('ernest-dialogue-system');
    const dialogueText = document.getElementById('dialogue-text');
    
    if (!dialogueSystem || !dialogueText) return;
    
    // Generate contextual dialogue based on module
    const dialogue = generateModuleDialogue(module, moduleIndex);
    
    // Show dialogue with animation
    dialogueText.innerHTML = `
        <div class="speaker-name">ERNEST</div>
        <div class="message-text">${dialogue}</div>
    `;
    
    dialogueSystem.style.display = 'block';
    dialogueSystem.classList.add('dialogue-appear');
    ernestDialogueOpen = true;
    
    console.log(`🎯 ERNEST dialogue opened for: ${module.title}`);
}

function generateModuleDialogue(module, index) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    
    if (isCompleted) {
        return `Great work completing "${module.title}"! You've mastered this competency. Ready to tackle the next challenge?`;
    } else if (isCurrent) {
        return `This is your current focus: "${module.title}". ${module.description} Let's dive in and master this ${module.competency} skill!`;
    } else {
        return `Ready for "${module.title}"? This module covers ${module.competency}. ${module.description} Click continue when you're ready to start!`;
    }
}

function closeErnestDialogue() {
    const dialogueSystem = document.getElementById('ernest-dialogue-system');
    if (dialogueSystem) {
        dialogueSystem.classList.remove('dialogue-appear');
        dialogueSystem.style.display = 'none';
        ernestDialogueOpen = false;
    }
}

function showLockedMessage() {
    showErnestDialogue(-1); // Special case for locked modules
    document.getElementById('dialogue-text').innerHTML = `
        <div class="speaker-name">ERNEST</div>
        <div class="message-text">This module is locked! Complete the previous modules first to unlock your learning path.</div>
    `;
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

console.log('✅ Simplified professional Candyland system loaded successfully!');