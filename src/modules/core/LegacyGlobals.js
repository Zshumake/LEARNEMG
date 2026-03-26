/**
 * LegacyGlobals.js — Classic script (not an ES module).
 *
 * Registers ActionBus handlers for UI toggles and provides window.* functions
 * that other modules call programmatically.
 *
 * When onclick handlers are fully migrated to data-action, this file can be deleted.
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
if (typeof window.isIOS === 'undefined') {
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// ---------- 1. Module Launching ----------
// Called programmatically by CandylandCore.js, AppShell.js

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

// ---------- 2. UI Toggles — via ActionBus ----------
// ActionBus (ES module) exposes window._registerAction after it loads.
// Classic scripts load before modules, so we poll until it's ready.

function _registerLegacyActions() {
    const reg = window._registerAction;
    if (!reg) {
        setTimeout(_registerLegacyActions, 50);
        return;
    }

    reg('togglePodcastsCollapsible', () => {
        const container = document.getElementById('podcasts-collapsible-container');
        const icon = document.getElementById('podcast-toggle-icon');
        if (!container) return;
        const isHidden = container.style.display === 'none' || container.style.display === '';
        container.style.display = isHidden ? 'block' : 'none';
        if (icon) {
            icon.textContent = isHidden ? '\u25B2' : '\u25BC';
            icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });

    reg('showLearningObjectives', () => {
        const modal = document.getElementById('learning-objectives-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    reg('closeLearningObjectives', () => {
        const modal = document.getElementById('learning-objectives-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    reg('closeModal', () => {
        if (window.closeModal) window.closeModal();
    });
}
_registerLegacyActions();

// Keep window.closeLearningObjectives for the touch handler below
window.closeLearningObjectives = function () {
    const modal = document.getElementById('learning-objectives-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// ---------- 3. Modal Management ----------

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

// Register closeModal for data-action delegation
if (window._registerAction) {
    window._registerAction('closeModal', () => window.closeModal());
}
