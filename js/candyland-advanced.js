// SOPHISTICATED CANDYLAND SYSTEM - Complete original system extracted and fixed
console.log('🍭✨ Loading sophisticated Candyland system...');

// Essential variables
let currentPGYLevel = null;
let currentModuleIndex = 0;
let completedModules = new Set();
let currentPage = 'pgy-selection';

// Learning modules configuration (complete from original)
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
        { id: 'radiculopathy-advanced', title: 'Advanced Radiculopathy', icon: '🧠', competency: 'Competency 2 - Level 2', description: 'Complex radiculopathy patterns', contentId: 'radiculopathy-advanced' },
        { id: 'plexus-anatomy', title: 'Plexus Anatomy Mastery', icon: '🕸️', competency: 'Competency 2 - Level 2', description: 'Detailed plexus anatomy and localization', contentId: 'plexus-anatomy-advanced' },
        { id: 'entrapment-syndromes', title: 'Entrapment Syndromes', icon: '🔧', competency: 'Competency 3 - Level 2', description: 'Common peripheral entrapments', contentId: 'entrapment-syndromes' },
        { id: 'polyneuropathy', title: 'Polyneuropathy Evaluation', icon: '🌐', competency: 'Competency 3 - Level 2', description: 'Systematic polyneuropathy workup', contentId: 'polyneuropathy' },
        { id: 'myopathy-screening', title: 'Myopathy Screening', icon: '💪', competency: 'Competency 4 - Level 2', description: 'EMG in myopathy evaluation', contentId: 'myopathy-screening' },
        { id: 'motor-neuron-disease', title: 'Motor Neuron Disease', icon: '⚡', competency: 'Competency 4 - Level 2', description: 'EMG in motor neuron disorders', contentId: 'motor-neuron-disease' },
        { id: 'complex-cases', title: 'Complex Case Analysis', icon: '🔬', competency: 'Competency 5 - Level 2', description: 'Multi-system EMG findings', contentId: 'complex-cases' },
        { id: 'research-methods', title: 'Research & QA Methods', icon: '📊', competency: 'Competency 6 - Level 2', description: 'Research design and quality assurance', contentId: 'research-methods' },
        { id: 'teaching-skills', title: 'Teaching & Communication', icon: '👨‍🏫', competency: 'Competency 7 - Level 2', description: 'Teaching EMG concepts', contentId: 'teaching-skills' },
        { id: 'board-preparation', title: 'Board Examination Prep', icon: '🎯', competency: 'Integration', description: 'Board-style case discussions', contentId: 'board-preparation' }
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

// Generate Learning Board - SOPHISTICATED CANDYLAND SYSTEM
function generateLearningBoard(pgyLevel) {
    console.log('🍭✨ Generating sophisticated Candyland board for', pgyLevel);
    const boardContainer = document.getElementById('learning-board');
    if (!boardContainer) {
        console.error('❌ learning-board container not found');
        return;
    }

    const modules = learningModulesConfig[pgyLevel];
    if (!modules) {
        console.error('❌ No modules found for PGY level:', pgyLevel);
        return;
    }

    // Calculate dynamic height based on modules
    const pathHeight = Math.max(3500, (modules.length * 140) + 800);
    
    // Create sophisticated learning path with rainbow connections
    boardContainer.innerHTML = `
        <div class="learning-pathway" style="position: relative; width: 100%; min-height: ${pathHeight}px; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 60px 20px; overflow: visible;">
            <div class="pathway-board">
                ${modules.map((module, index) => generateAdvancedModuleSquare(module, index, modules.length)).join('')}
                ${generateRainbowConnections(modules.length)}
            </div>
            <div class="ernest-character idle" id="ernest-character" style="
                position: absolute;
                width: 70px;
                height: 70px;
                background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
                border-radius: 50%;
                border: 4px solid white;
                box-shadow: 0 8px 20px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 35px;
                cursor: pointer;
                transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 1000;
            ">🧠</div>
        </div>
    `;
    
    currentPage = 'learning-board';
    
    // Enhanced ERNEST initialization
    setTimeout(() => {
        positionErnest();
        showErnestWelcomeMessage();
        addModuleClickHandlers();
        console.log('🍭✨ Sophisticated Candyland system initialized!');
    }, 300);
}

// Generate Advanced Module Square with sophisticated styling
function generateAdvancedModuleSquare(module, index, totalModules) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    const isAvailable = index <= currentModuleIndex && !isCompleted;
    const isLocked = index > currentModuleIndex && !isCompleted;
    
    let statusClass = '';
    let statusText = '';
    let statusIcon = '';
    let moduleColor = '#6366f1';
    
    if (isCompleted) {
        statusClass = 'completed';
        statusText = 'Complete';
        statusIcon = '✅';
        moduleColor = '#10b981';
    } else if (isCurrent) {
        statusClass = 'current';
        statusText = 'Current';
        statusIcon = '👉';
        moduleColor = '#f59e0b';
    } else if (isAvailable) {
        statusClass = 'available';
        statusText = 'Available';
        statusIcon = '🔓';
        moduleColor = '#3b82f6';
    } else {
        statusClass = 'locked';
        statusText = 'Locked';
        statusIcon = '🔒';
        moduleColor = '#6b7280';
    }
    
    // Calculate sophisticated positioning - Candyland zigzag path
    const isLeft = index % 2 === 0;
    const verticalSpacing = 140;
    const topPosition = 80 + (index * verticalSpacing);
    const leftPosition = isLeft ? '12%' : '70%';
    const rotation = (Math.sin(index * 0.5) * 5); // Subtle rotation for organic feel
    
    const moduleNumber = index + 1;
    
    return `
        <div class="pathway-square ${statusClass}" 
             data-module-index="${index}" 
             data-module-id="${module.id}"
             style="
                position: absolute;
                width: 220px;
                height: 140px;
                background: linear-gradient(135deg, ${moduleColor} 0%, ${adjustColor(moduleColor, -20)} 100%);
                border-radius: 25px;
                top: ${topPosition}px;
                left: ${leftPosition};
                transform: rotate(${rotation}deg) scale(1);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                text-align: center;
                cursor: ${isLocked ? 'not-allowed' : 'pointer'};
                box-shadow: 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3);
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border: 3px solid rgba(255,255,255,0.6);
                backdrop-filter: blur(10px);
                z-index: 100;
                opacity: ${isLocked ? 0.6 : 1};
             ">
            <div class="module-header" style="
                position: absolute;
                top: 8px;
                left: 0;
                right: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 15px;
                font-size: 11px;
            ">
                <div class="module-number" style="
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                ">${moduleNumber}</div>
                <div class="module-status">
                    <span class="status-icon" style="font-size: 14px;">${statusIcon}</span>
                </div>
            </div>
            <div class="module-icon" style="font-size: 40px; margin: 10px 0;">${module.icon}</div>
            <div class="module-title" style="font-size: 14px; font-weight: bold; margin-bottom: 4px; line-height: 1.2;">${module.title}</div>
            <div class="module-competency" style="font-size: 10px; opacity: 0.9; margin-bottom: 2px;">${module.competency}</div>
            <div class="module-description" style="font-size: 9px; opacity: 0.8; line-height: 1.1; padding: 0 8px;">${module.description}</div>
        </div>
    `;
}

// Generate Rainbow Connections between modules
function generateRainbowConnections(totalModules) {
    let connections = '';
    
    for (let i = 0; i < totalModules - 1; i++) {
        const currentIsLeft = i % 2 === 0;
        const nextIsLeft = (i + 1) % 2 === 0;
        
        const currentTop = 80 + (i * 140) + 70; // Center of current module
        const nextTop = 80 + ((i + 1) * 140) + 70; // Center of next module
        
        const startX = currentIsLeft ? '23%' : '81%';
        const endX = nextIsLeft ? '23%' : '81%';
        
        // Calculate curve path for rainbow connection
        const midX = currentIsLeft !== nextIsLeft ? '52%' : (currentIsLeft ? '23%' : '81%');
        const midY = currentTop + ((nextTop - currentTop) / 2);
        
        connections += `
            <svg style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 50;
                pointer-events: none;
            ">
                <defs>
                    <linearGradient id="rainbow${i}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
                        <stop offset="16%" style="stop-color:#ffa726;stop-opacity:1" />
                        <stop offset="33%" style="stop-color:#ffeb3b;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#4caf50;stop-opacity:1" />
                        <stop offset="66%" style="stop-color:#42a5f5;stop-opacity:1" />
                        <stop offset="83%" style="stop-color:#9c27b0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#e91e63;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path d="M ${startX.replace('%', '')*window.innerWidth/100} ${currentTop} Q ${midX.replace('%', '')*window.innerWidth/100} ${midY} ${endX.replace('%', '')*window.innerWidth/100} ${nextTop}"
                      stroke="url(#rainbow${i})"
                      stroke-width="8"
                      fill="none"
                      stroke-linecap="round"
                      opacity="0.8"
                      style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));" />
            </svg>
        `;
    }
    
    return connections;
}

// Sophisticated ERNEST positioning with smooth animations
function positionErnest() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) {
        console.error('❌ ERNEST character not found');
        return;
    }

    // Don't move if user has clicked a specific module
    if (ernst.dataset.clickedModule) {
        console.log(`🧠 ERNEST staying at clicked module ${parseInt(ernst.dataset.clickedModule) + 1}`);
        return;
    }

    const modules = document.querySelectorAll('.pathway-square');
    if (modules.length > currentModuleIndex) {
        const targetModule = modules[currentModuleIndex];
        moveErnestToModule(targetModule, currentModuleIndex);
        console.log(`🧠 ERNEST positioned at module ${currentModuleIndex + 1}`);
    }
}

// Move ERNEST to specific module with sophisticated animation
function moveErnestToModule(moduleElement, moduleIndex) {
    const ernst = document.getElementById('ernest-character');
    if (!ernst || !moduleElement) return;
    
    const boardRect = document.querySelector('.learning-pathway').getBoundingClientRect();
    const moduleRect = moduleElement.getBoundingClientRect();
    
    // Calculate position relative to the pathway board
    const left = moduleRect.left - boardRect.left + (moduleRect.width / 2) - 35;
    const top = moduleRect.top - boardRect.top + (moduleRect.height / 2) - 35;
    
    // Add sophisticated hopping animation
    ernst.classList.remove('idle', 'celebrating');
    ernst.classList.add('hopping');
    
    // Smooth movement with bounce
    ernst.style.left = `${left}px`;
    ernst.style.top = `${top}px`;
    ernst.dataset.clickedModule = moduleIndex.toString();
    
    setTimeout(() => {
        ernst.classList.remove('hopping');
        ernst.classList.add('idle');
    }, 600);
}

// Add sophisticated click handlers to modules
function addModuleClickHandlers() {
    const modules = document.querySelectorAll('.pathway-square');
    
    modules.forEach((module, index) => {
        // Add hover effects
        module.addEventListener('mouseenter', () => {
            if (!module.classList.contains('locked')) {
                module.style.transform = `rotate(${Math.sin(index * 0.5) * 5}deg) scale(1.05) translateY(-5px)`;
                module.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.4)';
            }
        });
        
        module.addEventListener('mouseleave', () => {
            module.style.transform = `rotate(${Math.sin(index * 0.5) * 5}deg) scale(1)`;
            module.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)';
        });
        
        // Add click handler
        module.addEventListener('click', () => {
            if (!module.classList.contains('locked')) {
                moveErnestToModule(module, index);
                showModuleDescription(index);
                console.log(`🍭 Clicked module ${index + 1}: ${learningModulesConfig[currentPGYLevel][index].title}`);
            }
        });
    });
}

// Show sophisticated module description
function showModuleDescription(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];
    
    if (module) {
        showErnestSpeechBubble(`Exploring: ${module.title}! 🎯`, 3000);
        
        // Enhanced module feedback
        setTimeout(() => {
            showErnestSpeechBubble(`${module.description} 📚`, 4000);
        }, 3500);
    }
}

// ERNEST welcome message with personality
function showErnestWelcomeMessage() {
    const welcomeMessages = [
        "Welcome to your EMG learning adventure! 🎓",
        "Let's explore the fascinating world of electrodiagnosis! ⚡",
        "Ready to master EMG? Let's begin! 💪",
        "Your journey to EMG expertise starts here! 🚀",
        "Time to unlock the mysteries of nerve conduction! 🔍"
    ];
    
    const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    showErnestSpeechBubble(message, 4000);
}

// Sophisticated ERNEST speech bubble
function showErnestSpeechBubble(message, duration = 3000) {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    // Remove existing bubble
    const existing = ernst.querySelector('.speech-bubble');
    if (existing) existing.remove();
    
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = message;
    bubble.style.cssText = `
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        color: #1f2937;
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
        max-width: 200px;
        text-align: center;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1);
        z-index: 1001;
        border: 2px solid #FFD700;
        animation: bubbleAppear 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    // Add tail
    const tail = document.createElement('div');
    tail.style.cssText = `
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top-color: white;
        z-index: 1002;
    `;
    bubble.appendChild(tail);
    
    ernst.appendChild(bubble);
    
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.style.animation = 'bubbleDisappear 0.3s ease-in forwards';
            setTimeout(() => bubble.remove(), 300);
        }
    }, duration);
}

// Helper function to adjust colors
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// ERNEST celebration animation
function ernestCelebration() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    ernst.classList.remove('idle', 'hopping');
    ernst.classList.add('celebrating');
    
    const celebrationMessages = [
        "Excellent work! 🎉",
        "Module complete! ⭐",
        "You're crushing it! 💪",
        "Outstanding progress! 🌟",
        "EMG master in the making! 🏆"
    ];
    
    const message = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
    showErnestSpeechBubble(message, 2000);
    
    setTimeout(() => {
        ernst.classList.remove('celebrating');
        ernst.classList.add('idle');
    }, 1500);
}

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes bubbleAppear {
        0% { opacity: 0; transform: translateX(-50%) scale(0.8) translateY(10px); }
        100% { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
    }
    
    @keyframes bubbleDisappear {
        0% { opacity: 1; transform: translateX(-50%) scale(1); }
        100% { opacity: 0; transform: translateX(-50%) scale(0.9); }
    }
    
    .ernest-character.hopping {
        transform: scale(1.1);
        animation: hop 0.6s ease-in-out;
    }
    
    .ernest-character.celebrating {
        animation: celebrate 1.5s ease-in-out;
    }
    
    @keyframes hop {
        0%, 100% { transform: scale(1.1) translateY(0); }
        50% { transform: scale(1.2) translateY(-15px); }
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.15) rotate(-5deg); }
        75% { transform: scale(1.15) rotate(5deg); }
    }
    
    .pathway-square:hover {
        z-index: 200 !important;
    }
`;
document.head.appendChild(style);

// Export all functions to global scope
window.generateLearningBoard = generateLearningBoard;
window.learningModulesConfig = learningModulesConfig;
window.positionErnest = positionErnest;
window.showErnestSpeechBubble = showErnestSpeechBubble;
window.ernestCelebration = ernestCelebration;
window.moveErnestToModule = moveErnestToModule;

// Set global variables
window.currentPGYLevel = currentPGYLevel;
window.currentModuleIndex = currentModuleIndex;
window.completedModules = completedModules;
window.currentPage = currentPage;

console.log('✅🍭✨ SOPHISTICATED CANDYLAND SYSTEM LOADED! 🌈🎯🧠');