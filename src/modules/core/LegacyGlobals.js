/**
 * LegacyGlobals.js — Global functions required by onclick handlers in HTML template strings.
 *
 * These window.* exports exist because content modules generate HTML via template
 * literals with inline onclick="window.fn()" attributes. They cannot use ES module
 * imports. When onclick handlers are migrated to event delegation, these can be removed.
 *
 * Categories:
 *   1. Module launching (startLearningModule, generateMasteryPathway)
 *   2. Nerve navigation (showNerveType, showMedianSection, showUlnarSection)
 *   3. Quiz interaction (checkMedianAnswer)
 *   4. UI toggles (togglePodcastsCollapsible, showLearningObjectives, closeLearningObjectives)
 *   5. Modal management (closeModal polyfill, overlay/ESC handlers)
 */

// ---------- Debug Logger (classic script version) ----------
const _legacyDebug = (() => {
    try {
        if (localStorage.getItem('DEBUG') === 'true') return true;
        if (location.search.includes('debug')) return true;
    } catch (e) { /* restricted context */ }
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

// ---------- iOS Detection ----------
if (typeof isIOS === 'undefined') {
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// ---------- 1. Module Launching ----------

function startLearningModule(moduleIndex) {
    logger.log('Launching module:', moduleIndex);

    if (window.appComponents?.modal) {
        const config = window.learningModulesConfig || {};
        const pgyLevel = window.currentPGYLevel || 'pgy2';
        const modules = config[pgyLevel] || config['all'] || [];
        const module = modules[moduleIndex];

        if (module) {
            window.appComponents.modal.showLearningModal(module, moduleIndex, pgyLevel);
        } else {
            logger.error('Module not found for index:', moduleIndex);
        }
        return;
    }
    logger.error('Modal System not initialized');
}
window.startLearningModule = startLearningModule;

async function generateMasteryPathway(pgy = 'pgy2') {
    logger.log('Generating Mastery Pathway...', pgy);
    const maxRetries = 50;
    let retries = 0;

    while (!window.appComponents?.candyland && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 100));
        retries++;
    }

    const candy = window.appComponents?.candyland;
    if (candy) {
        if (typeof candy.generateLearningBoard === 'function') {
            await candy.generateLearningBoard(pgy);
        } else if (typeof candy.render === 'function') {
            await candy.render(pgy);
        } else {
            logger.error('Candyland missing required methods');
        }
    } else {
        logger.error('Candyland not loaded after 5 seconds');
    }
}
window.generateMasteryPathway = generateMasteryPathway;
window.generateLearningBoard = generateMasteryPathway;

// Legacy modal flag (set by ModalSystem.js)
window.isModalOpen = false;

// ---------- 2. Nerve Navigation (used by PathwayExplorer onclick handlers) ----------

window.showNerveType = function (nerveType) {
    // Hide all, show selected
    document.querySelectorAll('.nerve-content').forEach(s => s.style.display = 'none');
    const selected = document.getElementById(nerveType + '-content');
    if (selected) selected.style.display = 'block';

    // Reset all buttons
    document.querySelectorAll('.nerve-type-btn').forEach(btn => {
        btn.style.background = '#f8fafc';
        btn.style.border = '2px solid #e2e8f0';
        btn.style.color = '#64748b';
    });

    // Highlight active
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
    }
};

function showNerveSection(containerClass, containerId, sectionId) {
    // Hide all sections of this type
    document.querySelectorAll('.' + containerClass).forEach(s => s.style.display = 'none');
    const selected = document.getElementById(sectionId);
    if (selected) selected.style.display = 'block';

    // Update button styles within container
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelectorAll('.nerve-nav-btn').forEach(btn => {
            btn.style.background = '#f8fafc';
            btn.style.border = '2px solid #e2e8f0';
            btn.querySelectorAll('h5, p').forEach(el => el.style.color = '#64748b');
        });
        const activeBtn = container.querySelector('[data-section="' + sectionId + '"]');
        if (activeBtn) {
            activeBtn.style.background = 'white';
            activeBtn.style.border = '3px solid #3b82f6';
            activeBtn.querySelectorAll('h5').forEach(el => el.style.color = '#1e40af');
        }
    }
}

window.showMedianSection = function (sectionId) {
    showNerveSection('median-section', 'median-content', sectionId);
};

window.showUlnarSection = function (sectionId) {
    showNerveSection('ulnar-section', 'ulnar-content', sectionId);
};

// ---------- 3. Quiz Interaction ----------

window.checkMedianAnswer = function (button, isCorrect) {
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

// ---------- 4. UI Toggles ----------

function togglePodcastsCollapsible() {
    const container = document.getElementById('podcasts-collapsible-container');
    const icon = document.getElementById('podcast-toggle-icon');
    const isHidden = container.style.display === 'none' || container.style.display === '';
    container.style.display = isHidden ? 'block' : 'none';
    icon.textContent = isHidden ? '▲' : '▼';
    icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
}
window.togglePodcastsCollapsible = togglePodcastsCollapsible;

window.showLearningObjectives = function () {
    const modal = document.getElementById('learning-objectives-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

window.closeLearningObjectives = function () {
    const modal = document.getElementById('learning-objectives-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// ---------- 5. Modal Management ----------

// Close general modal overlay on background click
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeGeneralModal();
        });
    }
});

// ESC key closes modals
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('modal-overlay');
        if (overlay && overlay.style.display === 'flex') closeGeneralModal();
    }
});

// Learning objectives modal — close on overlay tap (with zoom gesture detection for iOS)
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('learning-objectives-modal');
    if (!modal) return;

    let touchStartTime = 0;
    let touchStartDistance = 0;

    modal.addEventListener('touchstart', function (e) {
        touchStartTime = Date.now();
        if (e.touches && e.touches.length > 1) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            touchStartDistance = Math.sqrt(dx * dx + dy * dy);
        } else {
            touchStartDistance = 0;
        }
    }, { passive: true });

    modal.addEventListener('click', function (e) {
        const isOverlay = e.target === modal;
        const isQuickTap = (Date.now() - touchStartTime) < 300;
        const isSingleTouch = touchStartDistance === 0;

        if (isOverlay && isQuickTap && isSingleTouch) {
            window.closeLearningObjectives();
        }
        touchStartTime = 0;
        touchStartDistance = 0;
    });
});

// Polyfill — ensures closeModal exists even if module binding is delayed
if (!window.closeModal) {
    window.closeModal = function () {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.3s ease';
            overlay.style.opacity = '0';
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.style.opacity = '';
            }, 300);
        }
        if (window.closeModalWithTransition) window.closeModalWithTransition();
    };
}
