/**
 * ViewHelpers.js
 * Modal system and navigation transition helpers.
 */

// Detect iOS
if (typeof window.isIOS === 'undefined') {
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
const isIOS = window.isIOS;

/**
 * Navigation transition helper
 */
export function navigateWithTransition(callback, duration = 300) {
    const mainContent = document.getElementById('learning-board') || document.getElementById('pgy-selection');

    if (mainContent) {
        mainContent.classList.add('blur-out');
    }

    setTimeout(() => {
        callback();
        if (mainContent) {
            setTimeout(() => {
                mainContent.classList.remove('blur-out');
            }, 100);
        }
    }, duration);
}

/**
 * Modal System Function with Transitions
 */
export function showModal(title, content) {
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!overlay || !modalTitle || !modalBody) {
        console.error('❌ Modal elements not found');
        return;
    }

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modalBody.setAttribute('data-modal-content', 'true');

    if (isIOS) {
        modalBody.style.fontSize = '18px';
        modalBody.style.lineHeight = '1.8';
        const allText = modalBody.querySelectorAll('p, li, span, div');
        allText.forEach(el => {
            const currentSize = window.getComputedStyle(el).fontSize;
            const sizeNum = parseFloat(currentSize);
            if (sizeNum < 16) {
                el.style.fontSize = '16px';
            }
        });
    }

    overlay.style.display = 'flex';
    overlay.offsetHeight; // Force reflow
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });
}

/**
 * Enhanced close modal with transition
 */
export function closeModalWithTransition() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 700);
    }
}

// Bind to window for legacy support
window.showModal = showModal;
window.navigateWithTransition = navigateWithTransition;
window.closeModalWithTransition = closeModalWithTransition;
window.closeGeneralModal = closeModalWithTransition; // Alias used in cases
