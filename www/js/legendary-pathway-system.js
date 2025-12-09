// LEGENDARY EMG/NCS PATHWAY SYSTEM
// Complete overhaul with custom artwork, ERNEST guidance, and progression-based design

console.log('🚀 Loading Legendary EMG/NCS Pathway System...');

// Icon mapping for custom artwork
const CUSTOM_ICON_MAPPING = {
    'intro-emg': 'EMG Intro.png',
    'peripheral-anatomy': 'Peripheral Anatomy.png',
    'brachial-plexus': 'Brachial Plexus Interactive.png',
    'radiculopathy-patho': 'Radiculopathy Pathophysiology.png',
    'neuropathy-patho': 'Neuropathy Pathophysiology.png',
    'ncs-basics': 'NCS Fundamentals.png',
    'ncs-techniques': 'NCS Techniques.png',
    'emg-needle-basics': 'EMG Needle Localization.png',
    'muscle-anatomy': 'Muscle Study Lab.png',
    'basic-patterns': 'Basic Pattern Recognitionpng.png',
    'neuropathy-myopathy-basics': 'Neuropathy Vs. Myopathy.png',
    'simple-reports': 'Basic Report Writing.png',
    'clinical-correlation': 'Clinical Application.png'
};

// ERNEST contextual guidance for each module
const ERNEST_GUIDANCE = {
    'intro-emg': "Welcome to your EMG/NCS journey! This foundational module covers the essential principles of electrodiagnostic medicine and proper patient care approach.",
    'peripheral-anatomy': "Master the anatomical foundations! Understanding peripheral nerve anatomy is crucial for accurate EMG/NCS interpretation.",
    'brachial-plexus': "Explore the complex brachial plexus interactively! This module helps you visualize nerve pathways and understand clinical correlations.",
    'radiculopathy-patho': "Understand nerve root compression! Learn the pathophysiology behind radiculopathy and how it appears on EMG/NCS studies.",
    'neuropathy-patho': "Distinguish axonal from demyelinating processes! This fundamental knowledge shapes your entire approach to EMG/NCS interpretation.",
    'ncs-basics': "Master nerve conduction fundamentals! Learn the core principles that form the foundation of all EMG/NCS work.",
    'ncs-techniques': "Perfect your electrode placement! Proper technique is essential for accurate and reproducible results.",
    'emg-needle-basics': "Learn needle EMG fundamentals! Develop the skills for safe and effective needle examination techniques.",
    'muscle-anatomy': "Test your muscle localization knowledge! Interactive quizzes help reinforce critical anatomical relationships.",
    'basic-patterns': "Recognize abnormal spontaneous activity! Learn to identify and interpret key EMG findings.",
    'neuropathy-myopathy-basics': "Understand the fundamental differences! Learn to distinguish neuropathic from myopathic processes.",
    'simple-reports': "Structure professional reports! Learn the essential components of clear, comprehensive EMG/NCS reporting.",
    'clinical-correlation': "Apply your knowledge clinically! Practice integrating EMG/NCS findings with patient presentations."
};

// Enhanced module configuration with custom icons
function getEnhancedModuleConfig(pgyLevel) {
    // Get base configuration from existing system
    let baseConfig = window.learningModulesConfig;

    // If not available globally, use a fallback basic config
    if (!baseConfig) {
        console.warn('⚠️ learningModulesConfig not found, using basic configuration');
        baseConfig = {
            pgy2: [
                { id: 'intro-emg', title: 'EMG/NCS Introduction', icon: '🧠', competency: 'Foundation', description: 'Basic principles and patient care approach', contentId: 'emg-introduction' },
                { id: 'peripheral-anatomy', title: 'Peripheral Anatomy', icon: '🦴', competency: 'Competency 1 & 6', description: 'Brachial and lumbosacral plexus foundations', contentId: 'plexus-anatomy' },
                { id: 'radiculopathy-patho', title: 'Radiculopathy Pathophysiology', icon: '🔬', competency: 'Competency 2 - Level 1', description: 'Understanding nerve root compression', contentId: 'radiculopathy-pathophysiology' },
                { id: 'neuropathy-patho', title: 'Neuropathy Pathophysiology', icon: '⚡', competency: 'Competency 3 - Level 1', description: 'Axonal vs demyelinating processes', contentId: 'neuropathy-pathophysiology' },
                { id: 'ncs-basics', title: 'NCS Fundamentals', icon: '📈', competency: 'Competency 1 - Level 1', description: 'Basic nerve conduction principles', contentId: 'ncs-fundamentals' },
                { id: 'ncs-techniques', title: 'NCS Techniques', icon: '🎯', competency: 'Competency 1 - Level 2', description: 'Proper electrode placement and protocols', contentId: 'ncs-techniques' },
                { id: 'emg-needle-basics', title: 'EMG Needle Techniques', icon: '💉', competency: 'Competency 2 & 3 - Level 2', description: 'Basic needle EMG evaluation', contentId: 'emg-needle-localization' },
                { id: 'muscle-anatomy', title: 'Muscle Localization', icon: '💪', competency: 'Competency 2 & 3', description: 'Interactive muscle anatomy quiz', contentId: 'muscle-quiz' },
                { id: 'basic-patterns', title: 'Basic Pattern Recognition', icon: '👁️', competency: 'Competency 5 - Level 1', description: 'Recognizing abnormal spontaneous activity', contentId: 'basic-patterns' },
                { id: 'neuropathy-myopathy-basics', title: 'Neuropathy vs Myopathy Basics', icon: '⚖️', competency: 'Competency 4 - Level 1', description: 'Basic pathophysiology differences', contentId: 'neuropathy-myopathy-basics' },
                { id: 'simple-reports', title: 'Basic Report Writing', icon: '📝', competency: 'Competency 7 - Level 1', description: 'Understanding report structure', contentId: 'simple-reports' },
                { id: 'clinical-correlation', title: 'Clinical Application', icon: '🩺', competency: 'Integration', description: 'Simple clinical case examples', contentId: 'clinical-correlation' }
            ]
        };
    }

    const baseModules = baseConfig[pgyLevel] || [];

    // Enhance with custom icons and guidance
    return baseModules.map(module => ({
        ...module,
        customIcon: CUSTOM_ICON_MAPPING[module.id] || null,
        ernestGuidance: ERNEST_GUIDANCE[module.id] || "Learn more about this important topic!",
        difficulty: getDifficultyLevel(module.competency),
        category: getModuleCategory(module.id)
    }));
}

function getDifficultyLevel(competency) {
    if (competency.includes('Foundation') || competency.includes('Level 1')) return 'beginner';
    if (competency.includes('Level 2') || competency.includes('Level 3')) return 'intermediate';
    if (competency.includes('Level 4') || competency.includes('Integration') || competency.includes('Mastery')) return 'advanced';
    return 'intermediate';
}

function getModuleCategory(moduleId) {
    if (moduleId.includes('intro') || moduleId.includes('anatomy')) return 'foundation';
    if (moduleId.includes('patho') || moduleId.includes('basics') || moduleId.includes('fundamentals')) return 'theory';
    if (moduleId.includes('techniques') || moduleId.includes('needle') || moduleId.includes('muscle')) return 'practical';
    if (moduleId.includes('patterns') || moduleId.includes('recognition')) return 'interpretation';
    if (moduleId.includes('reports') || moduleId.includes('clinical')) return 'application';
    return 'general';
}

// New legendary pathway generation function
function generateLegendaryPathway(pgyLevel) {
    console.log('🎯 Generating Legendary EMG/NCS Pathway...');

    const boardContainer = document.getElementById('learning-board');
    if (!boardContainer) {
        console.error('❌ Learning board container not found');
        return;
    }

    const modules = getEnhancedModuleConfig(pgyLevel);
    if (!modules.length) {
        console.error('❌ No modules found for level:', pgyLevel);
        return;
    }

    // Create the legendary pathway layout
    boardContainer.innerHTML = generatePathwayHTML(modules, pgyLevel);

    // Initialize ERNEST guidance system
    initializeErnestGuidance();

    // Initialize module interactions
    initializeModuleInteractions();

    // Initialize progress animations
    initializeProgressAnimations();

    // Initialize particle system
    initializeParticleSystem();

    console.log('✅ Legendary pathway generated successfully!');
}

function generatePathwayHTML(modules, pgyLevel) {
    const completedCount = (window.completedModules && window.completedModules.size) || 0;
    const progressPercentage = (completedCount / modules.length) * 100;

    return `
        <div class="legendary-pathway-container">
            <!-- Background Particle System -->
            <div class="pathway-particles" id="pathway-particles"></div>

            <!-- Loading Blur Overlay -->
            <div id="loading-blur-overlay" class="loading-blur-overlay">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <div class="loading-text" id="loading-text">Loading Content...</div>
                    <div class="loading-subtitle" id="loading-subtitle">Preparing your learning module</div>
                </div>
            </div>

            <!-- Enhanced Header -->
            <div class="pathway-header">
                <div class="header-content">
                    <h1 class="pathway-title">EMG/NCS Learning Pathway</h1>
                    <div class="pathway-subtitle">Comprehensive Electrodiagnostic Medicine Training</div>
                </div>
                <div class="progress-section">
                    <div class="progress-stats">
                        <span class="progress-text">${completedCount}/${modules.length} modules completed</span>
                        <span class="competency-text">Building expertise step by step</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Vertical Pathway with Dotted Lines -->
            <div class="pathway-journey">
                <div class="pathway-line"></div>
                <div class="modules-container">
                    ${modules.map((module, index) => generateModuleCard(module, index, modules.length)).join('')}
                </div>
            </div>

            <!-- ERNEST Guidance Bubble -->
            <div id="ernest-guidance-bubble" class="ernest-guidance-bubble hidden">
                <div class="ernest-character">
                    <img src="ERNEST.png" alt="ERNEST" class="ernest-avatar">
                    <div class="ernest-name-label">ERNEST</div>
                </div>
                <div class="guidance-content">
                    <div class="guidance-speech-bubble">
                        <div class="guidance-text" id="guidance-text"></div>
                    </div>
                    <div class="guidance-controls">
                        <button class="guidance-close" onclick="hideErnestGuidance()">Got it!</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateModuleCard(module, index, totalModules) {
    // All modules are available (no locking)
    const isCompleted = window.completedModules && window.completedModules.has(module.id);
    const statusClass = isCompleted ? 'completed' : 'available';

    const positionClass = index % 2 === 0 ? 'module-left' : 'module-right';

    const customIcon = module.customIcon ? `<img src="${module.customIcon}" alt="${module.title}" class="module-custom-icon-large">` :
                      `<div class="module-icon-fallback-large">${module.icon || '📚'}</div>`;

    return `
        <div class="module-card ${positionClass} ${statusClass}"
             data-module-id="${module.id}"
             data-index="${index}"
             onclick="handleModuleClick('${module.id}', ${index})">

            <!-- Progress Node -->
            <div class="progress-node">
                <div class="node-inner">
                    ${isCompleted ? '✓' : index + 1}
                </div>
            </div>

            <!-- Simplified Module Content -->
            <div class="module-content-simple">
                <div class="module-icon-container-large">
                    ${customIcon}
                </div>
            </div>

            <!-- Hover Effect Overlay -->
            <div class="module-hover-overlay"></div>
        </div>
    `;
}

function getStatusIcon(status) {
    switch(status) {
        case 'completed': return '<div class="status-icon completed">✅</div>';
        case 'current': return '<div class="status-icon current">▶️</div>';
        case 'available': return '<div class="status-icon available">🔓</div>';
        case 'locked': return '<div class="status-icon locked">🔒</div>';
        default: return '<div class="status-icon">📚</div>';
    }
}

// Enhanced ERNEST guidance with smart timing
let ernestTimer = null;
let ernestPersistenceTimer = null;
let isErnestVisible = false;
let currentModuleId = null;

function showErnestGuidance(moduleId) {
    const bubble = document.getElementById('ernest-guidance-bubble');
    const textElement = document.getElementById('guidance-text');

    if (bubble && textElement) {
        // Don't show if already showing this module
        if (currentModuleId === moduleId && isErnestVisible) {
            return;
        }

        // Clear any existing timers
        clearTimeout(ernestTimer);
        clearTimeout(ernestPersistenceTimer);

        currentModuleId = moduleId;
        const guidance = ERNEST_GUIDANCE[moduleId] || "Learn more about this important topic!";

        // Show ERNEST immediately
        // Add typing effect
        typeText(textElement, guidance);
        bubble.classList.remove('hidden');
        bubble.classList.add('show');
        isErnestVisible = true;

        // Add ERNEST personality - random encouraging gestures
        addErnestPersonality();

        // Set persistence timer - ERNEST stays visible for at least 4 seconds
        ernestPersistenceTimer = setTimeout(() => {
            isErnestVisible = false;
        }, 4000);
    }
}

function hideErnestGuidance() {
    // Only hide if persistence timer has expired AND we're not actively hovering
    if (!isErnestVisible) {
        const bubble = document.getElementById('ernest-guidance-bubble');
        if (bubble) {
            bubble.classList.remove('show');
            setTimeout(() => {
                bubble.classList.add('hidden');
                currentModuleId = null;
            }, 300);
        }
    }
}

// Improved hide function that respects active hover state
function tryHideErnestGuidance() {
    // Add a small delay to prevent flickering when moving between elements
    setTimeout(() => {
        if (!isErnestVisible) {
            hideErnestGuidance();
        }
    }, 100);
}

// Typing effect for ERNEST text - Much faster and smoother
function typeText(element, text, speed = 15) {
    element.textContent = '';
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }

    typeChar();
}

// Loading overlay functions
function showLoadingOverlay(moduleTitle) {
    const overlay = document.getElementById('loading-blur-overlay');
    const loadingText = document.getElementById('loading-text');
    const loadingSubtitle = document.getElementById('loading-subtitle');

    if (overlay) {
        if (loadingText) loadingText.textContent = `Loading ${moduleTitle}...`;
        if (loadingSubtitle) loadingSubtitle.textContent = 'Preparing your learning module';

        overlay.classList.add('active');

        // Add some variety to loading messages
        const loadingMessages = [
            'Preparing your learning module',
            'Gathering educational content',
            'Setting up interactive elements',
            'Loading EMG/NCS materials'
        ];

        if (loadingSubtitle) {
            loadingSubtitle.textContent = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        }
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-blur-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Add personality to ERNEST with random encouraging gestures
function addErnestPersonality() {
    const ernestAvatar = document.querySelector('.ernest-avatar');
    if (!ernestAvatar) return;

    // Random encouraging animations
    const personalities = [
        'ernestNod',
        'ernestBounce',
        'ernestGlow'
    ];

    const randomPersonality = personalities[Math.floor(Math.random() * personalities.length)];

    // Remove any existing personality classes
    ernestAvatar.classList.remove('ernestNod', 'ernestBounce', 'ernestGlow');

    // Add the new personality
    setTimeout(() => {
        ernestAvatar.classList.add(randomPersonality);

        // Remove after animation
        setTimeout(() => {
            ernestAvatar.classList.remove(randomPersonality);
        }, 1000);
    }, 500);
}

function initializeErnestGuidance() {
    // Position ERNEST bubble initially
    const bubble = document.getElementById('ernest-guidance-bubble');
    if (bubble) {
        bubble.style.position = 'fixed';
        bubble.style.bottom = '20px';
        bubble.style.left = '20px';
        bubble.style.zIndex = '1000';
    }
}

function initializeModuleInteractions() {
    // Add click handlers and hover effects
    document.querySelectorAll('.module-card').forEach(card => {
        const moduleId = card.dataset.moduleId;

        // Add enhanced hover events for the entire card
        card.addEventListener('mouseenter', (e) => {
            console.log('Module hover start:', moduleId);
            showErnestGuidance(moduleId);
        });

        card.addEventListener('mouseleave', (e) => {
            console.log('Module hover end:', moduleId);
            tryHideErnestGuidance();
        });

        card.addEventListener('click', (e) => {
            const index = parseInt(card.dataset.index);
            console.log('Module clicked:', moduleId, index);

            // Call existing module opening function if available
            if (window.openEnhancedModal && window.getContentById) {
                const module = getEnhancedModuleConfig(window.currentPGYLevel).find(m => m.id === moduleId);
                if (module) {
                    window.openEnhancedModal(index);
                }
            }
        });
    });
}

function initializeProgressAnimations() {
    // Add smooth animations for progress line and nodes
    const progressLine = document.querySelector('.pathway-line');
    if (progressLine) {
        // Animate progress line based on completion
        const completedModules = document.querySelectorAll('.module-card.completed').length;
        const totalModules = document.querySelectorAll('.module-card').length;
        const progressPercentage = (completedModules / totalModules) * 100;

        setTimeout(() => {
            progressLine.style.background = `linear-gradient(to bottom,
                #10b981 0%,
                #10b981 ${progressPercentage}%,
                #e5e7eb ${progressPercentage}%,
                #e5e7eb 100%)`;
        }, 500);
    }
}

function handleModuleClick(moduleId, index) {
    console.log(`🎯 Module clicked: ${moduleId} (index: ${index})`);
    hideErnestGuidance();

    // Get the module data
    const modules = getEnhancedModuleConfig(window.currentPGYLevel || 'pgy2');
    const module = modules[index];

    if (!module) {
        console.error(`❌ Module not found at index ${index}`);
        return;
    }

    console.log(`🔍 Loading content for: ${module.title} (contentId: ${module.contentId})`);

    // Show loading overlay with blur effect
    showLoadingOverlay(module.title);

    // Generate content with smoother transition timing
    setTimeout(() => {
        if (window.generateLearningContentByType && window.showModal) {
            try {
                const content = window.generateLearningContentByType(module, index);

                // Seamless transition: crossfade from loading to modal
                setTimeout(() => {
                    // First, prepare the modal content while loading is still visible
                    if (content) {
                        // Set modal content
                        const modalTitle = document.getElementById('modal-title');
                        const modalBody = document.getElementById('modal-body');
                        const overlay = document.getElementById('modal-overlay');

                        if (modalTitle && modalBody && overlay) {
                            modalTitle.textContent = module.title;
                            modalBody.innerHTML = content;

                            // Show modal overlay (invisible initially)
                            overlay.style.display = 'flex';

                            // Crossfade: hide loading and show modal simultaneously
                            hideLoadingOverlay();

                            // Small delay for smooth crossfade
                            setTimeout(() => {
                                overlay.classList.add('show');
                                console.log(`✅ Successfully opened: ${module.title}`);
                            }, 100);
                        }
                    } else {
                        console.error(`❌ No content generated for ${module.contentId}`);
                        // Show fallback content with same seamless transition
                        hideLoadingOverlay();
                        setTimeout(() => {
                            window.showModal(module.title, `
                                <div style="padding: 40px; text-align: center;">
                                    <div style="font-size: 64px; margin-bottom: 20px;">🚧</div>
                                    <h3>Content Coming Soon</h3>
                                    <p>This learning module is currently being developed.</p>
                                    <p><strong>Module:</strong> ${module.title}</p>
                                    <p><strong>Description:</strong> ${module.description}</p>
                                </div>
                            `);
                        }, 100);
                    }
                }, 600); // Longer loading time for better content preparation

            } catch (error) {
                console.error(`❌ Error loading content:`, error);
                setTimeout(() => {
                    hideLoadingOverlay();
                    setTimeout(() => {
                        window.showModal(module.title, `
                            <div style="padding: 40px; text-align: center;">
                                <div style="font-size: 64px; margin-bottom: 20px;">⚠️</div>
                                <h3>Error Loading Content</h3>
                                <p>There was an error loading this learning module.</p>
                                <p><strong>Module:</strong> ${module.title}</p>
                            </div>
                        `);
                    }, 100);
                }, 600);
            }
        } else {
            console.error('❌ Required functions not available:', {
                generateLearningContentByType: !!window.generateLearningContentByType,
                showModal: !!window.showModal
            });
            setTimeout(() => {
                hideLoadingOverlay();
            }, 600);
        }
    }, 200); // Quick initial response for immediate loading feedback
}

// Replace the existing generateLearningBoard function and prevent conflicts
window.generateLearningBoard = generateLegendaryPathway;

// Disable conflicting UI systems
window.uiLayoutManager = null;

// Prevent other systems from overriding our board
const originalSetTimeout = window.setTimeout;
window.setTimeout = function(callback, delay) {
    // Block any delayed calls that might interfere with our UI
    if (callback && callback.toString().includes('uiLayoutManager')) {
        console.log('🚫 Blocked conflicting UI system');
        return;
    }
    return originalSetTimeout.call(this, callback, delay);
};

// Export functions for global access
window.generateLegendaryPathway = generateLegendaryPathway;
window.showErnestGuidance = showErnestGuidance;
window.hideErnestGuidance = hideErnestGuidance;
window.showLoadingOverlay = showLoadingOverlay;
window.hideLoadingOverlay = hideLoadingOverlay;
window.handleModuleClick = handleModuleClick;

// Ensure our system stays in control
document.addEventListener('DOMContentLoaded', function() {
    // Override any conflicting initialization
    if (window.initializeLearningBoard) {
        const originalInit = window.initializeLearningBoard;
        window.initializeLearningBoard = function() {
            console.log('🎯 Legendary system taking control of initialization');
            // Don't call the original, we handle everything
        };
    }
});

// Particle system for background visual effects
function initializeParticleSystem() {
    const container = document.getElementById('pathway-particles');
    if (!container) return;

    // Create 20 floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';

    // Random animation duration (8-15 seconds)
    const duration = 8 + Math.random() * 7;
    particle.style.animationDuration = duration + 's';

    // Random delay
    particle.style.animationDelay = (index * 0.5) + 's';

    container.appendChild(particle);

    // Recreate particle when animation ends
    particle.addEventListener('animationend', () => {
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createParticle(container, index);
            }
        }, Math.random() * 2000);
    });
}

console.log('✅ Legendary Pathway System loaded successfully!');