// Core Shared Utilities for Module System
// Contains functions used across all modules

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

// Detect iOS (use existing if already defined in index.html)
if (typeof window.isIOS === 'undefined') {
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
export const isIOS = window.isIOS;

// Modal System Function with Transitions
export function showModal(title, content) {
    console.log('🔍 DEBUG: showModal called with title:', title);
    console.log('🔍 DEBUG: Content length:', content ? content.length : 'null');
    console.log('🔍 DEBUG: iOS detected:', isIOS);

    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    console.log('🔍 DEBUG: Elements found:', {
        overlay: !!overlay,
        modalTitle: !!modalTitle,
        modalBody: !!modalBody
    });

    if (!overlay || !modalTitle || !modalBody) {
        console.error('❌ Modal elements not found');
        return;
    }

    // Set content
    modalTitle.textContent = title;

    // For iOS: Optimize content to reduce memory pressure
    if (isIOS && content && content.length > 30000) {
        console.log('📱 iOS: Optimizing large content for mobile');

        // Create a temporary div to parse content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Remove all image placeholders and large visual elements to reduce DOM size
        const images = tempDiv.querySelectorAll('img, [style*="background-image"]');
        images.forEach(img => {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = 'background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center; color: #0369a1; margin: 10px 0;';
            placeholder.textContent = '📱 Image hidden on mobile to improve performance';
            img.replaceWith(placeholder);
        });

        // Simplify complex nested structures
        const complexDivs = tempDiv.querySelectorAll('[style*="linear-gradient"]');
        complexDivs.forEach(div => {
            if (div.style.background) {
                div.style.background = '#f8fafc';
            }
        });

        modalBody.innerHTML = tempDiv.innerHTML;
        console.log('✅ iOS: Content optimized and loaded');
    } else {
        // Desktop or small content: load immediately
        modalBody.innerHTML = content;
    }

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

        console.log('✅ iOS: Increased base font size for better readability');
    }

    // Show overlay but keep it invisible initially
    overlay.style.display = 'flex';

    // Force a repaint to ensure display: flex is applied
    overlay.offsetHeight;

    // Trigger fade-in animation
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });

    // Show visual feedback that modal opened
    console.log(`✅ Modal opened with transition: ${title}`);
}

// Enhanced close modal with transition
export function closeModalWithTransition() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        // Fade out
        overlay.classList.remove('show');

        // Hide after animation completes (increased to match slower transition)
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 700);
    }
}

// Make functions globally available for backward compatibility
window.showModal = showModal;
window.navigateWithTransition = navigateWithTransition;
window.closeModalWithTransition = closeModalWithTransition;
