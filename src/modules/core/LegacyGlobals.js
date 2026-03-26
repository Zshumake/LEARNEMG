
// ---------- Debug Logger (classic script version) ----------
const _legacyDebug = (() => {
    try {
        if (localStorage.getItem('DEBUG') === 'true') return true;
        if (location.search.includes('debug')) return true;
    } catch(e) {}
    return false;
})();
const _noop = () => {};
const logger = {
    log:   _legacyDebug ? console.log.bind(console)   : _noop,
    warn:  _legacyDebug ? console.warn.bind(console)   : _noop,
    info:  _legacyDebug ? console.info.bind(console)   : _noop,
    debug: _legacyDebug ? console.debug.bind(console)  : _noop,
    error: console.error.bind(console),
};

// iOS detection (used by other modules)
if (typeof isIOS === 'undefined') {
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// Local Storage Functions

function loadProgressFromStorage() {
    const saved = localStorage.getItem('ernestEMGProgress');
    if (saved) {
        try {
            const progressData = JSON.parse(saved);
            window.currentPGYLevel = progressData.currentPGYLevel;
            window.completedModules = new Set(progressData.completedModules || []);
            window.currentModuleIndex = progressData.currentModuleIndex || 0;
            logger.log('✅ Progress loaded from storage');
            return true;
        } catch (error) {
            logger.log('⚠️ Error loading progress:', error);
            return false;
        }
    }
    return false;
}


// Unified journey interface



// Launch learning module via unified system
function startLearningModule(moduleIndex) {
    logger.log('🔍 Launching module:', moduleIndex);

    if (window.appComponents && window.appComponents.modal) {
        // Get module data from global config (populated by CandylandCore/Initializers)
        const config = window.learningModulesConfig || {};
        const pgyLevel = window.currentPGYLevel || 'pgy2';
        const modules = config[pgyLevel] || config['all'] || [];
        const module = modules[moduleIndex];

        if (module) {
            window.appComponents.modal.showLearningModal(module, moduleIndex, pgyLevel);
        } else {
            logger.error("❌ Module not found for index:", moduleIndex);
        }
        return;
    }

    logger.error('❌ Modal System not initialized');
}

// Global exports for legacy compatibility
window.startLearningModule = startLearningModule;

// Redirect legacy calls to new system
window.showEnhancedLearningModal = (module, index) => {
    if (window.appComponents?.modal) {
        window.appComponents.modal.showLearningModal(module, index, window.currentPGYLevel);
    }
};
window.closeEnhancedModal = (index) => {
    if (window.appComponents?.modal) window.appComponents.modal.closeModal(index);
};
window.completeEnhancedModule = (index) => {
    if (window.appComponents?.modal) window.appComponents.modal.completeModule(index);
};

// Override showErnestDialogue to use our modal system instead
window.showErnestDialogue = function (moduleIndex) {
    startLearningModule(moduleIndex);
};

// Disable old Ernest dialogue system
window.closeErnestDialogue = function () { };

// Initialize modal flag
window.isModalOpen = false;

// Global functions for nerve navigation (moved from modal content)
window.showNerveType = function (nerveType) {
    logger.log('🔍 DEBUG: showNerveType called with:', nerveType);
    // Hide all nerve content sections
    document.querySelectorAll('.nerve-content').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected nerve content
    const selectedContent = document.getElementById(nerveType + '-content');
    if (selectedContent) {
        selectedContent.style.display = 'block';
        logger.log('✅ DEBUG: Showing content for:', nerveType);
    } else {
        logger.log('❌ DEBUG: Content not found for:', nerveType);
    }

    // Update nerve type button styles
    document.querySelectorAll('.nerve-type-btn').forEach(btn => {
        btn.style.background = '#f8fafc';
        btn.style.border = '2px solid #e2e8f0';
        btn.style.color = '#64748b';
    });

    // Highlight active nerve type button
    const activeBtn = document.querySelector('[data-nerve="' + nerveType + '"]');
    if (activeBtn) {
        if (nerveType === 'overview') {
            activeBtn.style.background = '#fef3c7';
            activeBtn.style.border = '2px solid #f59e0b';
            activeBtn.style.color = '#d97706';
        } else {
            activeBtn.style.background = 'white';
            activeBtn.style.border = '3px solid #3b82f6';
            activeBtn.style.color = '#1e40af';
        }
        logger.log('✅ DEBUG: Highlighted button for:', nerveType);
    }
};

window.showMedianSection = function (sectionId) {
    logger.log('🔍 DEBUG: showMedianSection called with:', sectionId);
    // Hide all median sections
    document.querySelectorAll('.median-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        logger.log('✅ DEBUG: Showing median section:', sectionId);
    }

    // Update button styles within median content
    const medianContent = document.getElementById('median-content');
    if (medianContent) {
        medianContent.querySelectorAll('.nerve-nav-btn').forEach(btn => {
            btn.style.background = '#f8fafc';
            btn.style.border = '2px solid #e2e8f0';
            btn.querySelectorAll('h5, p').forEach(el => el.style.color = '#64748b');
        });

        // Highlight active button
        const activeBtn = medianContent.querySelector('[data-section="' + sectionId + '"]');
        if (activeBtn) {
            activeBtn.style.background = 'white';
            activeBtn.style.border = '3px solid #3b82f6';
            activeBtn.querySelectorAll('h5').forEach(el => el.style.color = '#1e40af');
        }
    }
};

window.showUlnarSection = function (sectionId) {
    logger.log('🔍 DEBUG: showUlnarSection called with:', sectionId);
    // Hide all ulnar sections
    document.querySelectorAll('.ulnar-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        logger.log('✅ DEBUG: Showing ulnar section:', sectionId);
    }

    // Update ulnar button styles within ulnar content
    const ulnarContent = document.getElementById('ulnar-content');
    if (ulnarContent) {
        ulnarContent.querySelectorAll('.nerve-nav-btn').forEach(btn => {
            btn.style.background = '#f8fafc';
            btn.style.border = '2px solid #e2e8f0';
            btn.querySelectorAll('h5, p').forEach(el => el.style.color = '#64748b');
        });

        // Highlight active button
        const activeBtn = ulnarContent.querySelector('[data-section="' + sectionId + '"]');
        if (activeBtn) {
            activeBtn.style.background = 'white';
            activeBtn.style.border = '3px solid #3b82f6';
            activeBtn.querySelectorAll('h5').forEach(el => el.style.color = '#1e40af');
        }
    }
};

// Global quiz function for median nerve content
window.checkMedianAnswer = function (button, isCorrect) {
    logger.log('🔍 DEBUG: checkMedianAnswer called with isCorrect:', isCorrect);
    const buttons = button.parentNode.querySelectorAll('.quiz-option');
    buttons.forEach(btn => btn.style.pointerEvents = 'none');

    if (isCorrect) {
        button.style.background = '#dcfce7';
        button.style.border = '2px solid #059669';
        button.style.color = '#059669';
        button.innerHTML += ' ✓ Correct! Normal thenar sensation (palmar cutaneous branch) localizes to carpal tunnel.';
    } else {
        button.style.background = '#fef2f2';
        button.style.border = '2px solid #dc2626';
        button.style.color = '#dc2626';
        button.innerHTML += ' ✗';
    }
};

// Pathway Explorer - Now handled by src/content/anatomy/PathwayExplorer.js

// ===============================================
// ATRIUM HEALTH 13-MODULE PATHWAY SYSTEM
// ===============================================

// Create Pre-Positioned Description Boxes





async function generateMasteryPathway(pgy = 'pgy2') {
    logger.log('🚀 Generating Mastery Pathway via Module System...', pgy);

    // Retry mechanism to wait for modules to initialize
    const maxRetries = 50; // 5 seconds (100ms * 50)
    let retries = 0;

    while (!(window.appComponents && window.appComponents.candyland) && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
        if (retries === 1) logger.log('⏳ Waiting for Candyland module initialization...');
    }

    if (window.appComponents && window.appComponents.candyland) {
        // Ensure the component has the data it needs or uses correct method
        if (typeof window.appComponents.candyland.generateLearningBoard === 'function') {
            await window.appComponents.candyland.generateLearningBoard(pgy);
        } else if (typeof window.appComponents.candyland.render === 'function') {
            // Fallback to render if generateLearningBoard is not found, but pass pgy
            await window.appComponents.candyland.render(pgy);
        } else {
            logger.error("❌ Candyland Component missing required methods!");
        }
    } else {
        logger.error("❌ Candyland Component not loaded after 2 seconds!");
    }
}

// Override the existing generateLearningBoard function
window.generateLearningBoard = generateMasteryPathway;

// Tab Navigation Function for Enhanced EMG Introduction



// Toggle Collapsible Podcasts Section
function togglePodcastsCollapsible() {
    const container = document.getElementById('podcasts-collapsible-container');
    const icon = document.getElementById('podcast-toggle-icon');

    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        icon.textContent = '▲';
        icon.style.transform = 'rotate(180deg)';
        logger.log('🎧 Expanded podcast list');
    } else {
        container.style.display = 'none';
        icon.textContent = '▼';
        icon.style.transform = 'rotate(0deg)';
        logger.log('🎧 Collapsed podcast list');
    }
}

// Make functions globally available
window.generateMasteryPathway = generateMasteryPathway;

window.togglePodcastsCollapsible = togglePodcastsCollapsible;

logger.log('✨🎮 Enhanced Journey with Integrated Modal Systemeady!');





// Close modal when clicking outside overlay
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            // Check if click came from modal content by traversing up the DOM
            let element = e.target;
            while (element && element !== overlay) {
                if (element.hasAttribute && element.hasAttribute('data-modal-content')) {
                    // Click is from modal content, don't close
                    return;
                }
                element = element.parentElement;
            }

            // Click is on overlay itself, close modal
            if (e.target === overlay) {
                closeGeneralModal();
            }
        });
    }
});

// Add keyboard support for ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('modal-overlay');
        if (overlay && overlay.style.display === 'flex') {
            closeGeneralModal();
        }
    }
});

// Learning Objectives Modal Functions - Global Scope
window.showLearningObjectives = function () {
    logger.log('🎯 showLearningObjectives called');
    const modal = document.getElementById('learning-objectives-modal');
    logger.log('📋 Modal element:', modal);
    if (modal) {
        logger.log('✅ Modal found, displaying...');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        logger.error('❌ Modal not found!');
    }
};

window.closeLearningObjectives = function () {
    logger.warn('🚨 closeLearningObjectives() CALLED');
    logger.warn('📍 Call stack:', new Error().stack);

    const modal = document.getElementById('learning-objectives-modal');
    if (modal) {
        logger.warn('✅ Learning objectives modal found, hiding it');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        logger.warn('❌ Learning objectives modal NOT found');
    }
};

// Close modal when clicking outside content (with zoom gesture detection + DEBUG LOGGING)
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('learning-objectives-modal');
    if (modal) {
        let touchStartTime = 0;
        let touchStartDistance = 0;

        // Track touch start for gesture detection
        modal.addEventListener('touchstart', function (e) {
            touchStartTime = Date.now();
            logger.warn('📱 LEARNING-OBJ touchstart:', {
                touches: e.touches.length,
                target: e.target.tagName,
                targetClass: e.target.className,
                timestamp: touchStartTime
            });

            // If multi-touch, likely a zoom gesture
            if (e.touches && e.touches.length > 1) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                touchStartDistance = Math.sqrt(dx * dx + dy * dy);
                logger.warn('🔍 LEARNING-OBJ MULTI-TOUCH:', {
                    distance: touchStartDistance,
                    touches: e.touches.length
                });
            } else {
                touchStartDistance = 0;
            }
        }, { passive: true });

        modal.addEventListener('click', function (e) {
            // Only close if:
            // 1. Click target is the modal overlay itself (not modal content)
            // 2. Touch duration was reasonable (< 300ms suggests intentional tap)
            // 3. No multi-touch detected (zoom gesture)
            const touchDuration = Date.now() - touchStartTime;
            const isModal = e.target === modal;
            const isQuickTap = touchDuration < 300;
            const isSingleTouch = touchStartDistance === 0;

            logger.warn('👆 LEARNING-OBJ click event:', {
                target: e.target.tagName,
                targetClass: e.target.className,
                isModal: isModal,
                touchDuration: touchDuration,
                isQuickTap: isQuickTap,
                touchStartDistance: touchStartDistance,
                isSingleTouch: isSingleTouch,
                willClose: isModal && isQuickTap && isSingleTouch
            });

            if (isModal && isQuickTap && isSingleTouch) {
                logger.warn('🚪 CLOSING learning objectives modal');
                window.closeLearningObjectives();
            } else {
                logger.warn('✋ NOT closing learning objectives - conditions not met');
            }

            // Reset for next interaction
            touchStartTime = 0;
            touchStartDistance = 0;
        });
    }
});



// Polyfill for closeModal to ensure it exists even if core.js module binding is delayed
if (!window.closeModal) {
    window.closeModal = function () {
        logger.log('Using global closeModal polyfill');
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.3s ease'; // Ensure transition exists
            overlay.style.opacity = '0'; // Start fade out
            overlay.classList.remove('show');

            // Wait for transition to finish
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.opacity = ''; // Reset for next time (handled by class usually)
            }, 300); // reduced from 500ms to match transition
        }

        // Also try the new transition method if available
        if (window.closeModalWithTransition) {
            window.closeModalWithTransition();
        }
    };
}


