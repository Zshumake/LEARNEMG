// ViewHelpers.js
// Shared UI helper functions for modal management and transitions

// Detect iOS (use existing if already defined in index.html)
if (typeof window.isIOS === 'undefined') {
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
const isIOS = window.isIOS;

// Navigation transition helper
export function navigateWithTransition(callback, duration = 300) {
    // Get main content areas to blur
    const mainContent = document.getElementById('learning-board') || document.getElementById('pgy-selection');

    if (mainContent) {
        // Add blur-out effect to current content
        mainContent.classList.add('blur-out');
    }

    // Wait for blur animation, then execute navigation
    setTimeout(() => {
        callback();

        // Remove blur from background after modal shows
        if (mainContent) {
            setTimeout(() => {
                mainContent.classList.remove('blur-out');
            }, 100);
        }
    }, duration);
}

// Modal System Function with Transitions
export function showModal(title, content) {
    console.log('🔍 DEBUG: showModal called with title:', title);
    console.log('🔍 DEBUG: Content length:', content ? content.length : 'null');

    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!overlay || !modalTitle || !modalBody) {
        console.error('❌ Modal elements not found');
        return;
    }

    // Set content
    modalTitle.textContent = title;
    modalBody.innerHTML = content;

    // CRITICAL FIX: Mark modal body so overlay can identify and ignore touches from it
    modalBody.setAttribute('data-modal-content', 'true');

    // iOS FIX: Increase base font size so less zoom is needed
    if (isIOS) {
        modalBody.style.fontSize = '18px';
        modalBody.style.lineHeight = '1.8';

        // Make all text larger
        const allText = modalBody.querySelectorAll('p, li, span, div');
        allText.forEach(el => {
            const currentSize = window.getComputedStyle(el).fontSize;
            const sizeNum = parseFloat(currentSize);
            if (sizeNum < 16) {
                el.style.fontSize = '16px';
            }
        });
    }

    // Show overlay but keep it invisible initially
    overlay.style.display = 'flex';

    // Force a repaint to ensure display: flex is applied
    overlay.offsetHeight;

    // Trigger fade-in animation
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });

    console.log(`✅ Modal opened with transition: ${title}`);
}

// Enhanced close modal with transition
export function closeModalWithTransition() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        // Fade out
        overlay.classList.remove('show');

        // Hide after animation completes
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 700);
    }
}

// Attach to window for legacy support if needed, though module import is preferred
// Enhanced image error handling
function handleImageError(img, type = 'generic') {
    const fallbacks = {
        'video': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2Y1MTY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5OmIFZpZGVvIENvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==',
        'landmark': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiOWY3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk41JbWFnZSBDb21pbmcgU29vbjwvdGV4dD48L3N2Zz4=',
        'generic': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTllY2VmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+'
    };

    img.src = fallbacks[type] || fallbacks['generic'];
    img.style.opacity = '0.7';
    console.log(`Image fallback applied: ${type} `);
}

window.ViewHelpers = {
    showModal,
    closeModalWithTransition,
    navigateWithTransition,
    handleImageError // Exported
};

// Also keep global window assignments for backward compatibility with existing inline calls
window.showModal = showModal;
window.navigateWithTransition = navigateWithTransition;
window.closeModalWithTransition = closeModalWithTransition;
window.handleImageError = handleImageError;

// Placeholder content function
export function showPlaceholderContent(tabNumber, contentType) {
    const content = `
                <div style="text-align: center; padding: 50px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🔧</div>
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">Content Under Development</h3>
                    <p style="color: #5a6c7d; margin-bottom: 25px;">
                        Tab ${tabNumber} (${contentType}) is currently being developed.
                    </p>
                    <div style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                        <p style="color: #0277bd; margin: 0; font-weight: 600;">
                            🚀 Coming Soon!
                        </p>
                        <p style="color: #0288d1; margin: 5px 0 0 0; font-size: 14px;">
                            This learning module will include interactive content, quizzes, and clinical scenarios.
                        </p>
                    </div>
                    <button onclick="closeModal()" 
                            style="background: #6b9f78; color: white; border: none; padding: 12px 24px; 
                                   border-radius: 8px; cursor: pointer; font-weight: 600;">
                        ← Close
                    </button>
                </div>
            `;
    showModal('Component Under Construction', content);
}

window.showPlaceholderContent = showPlaceholderContent;
