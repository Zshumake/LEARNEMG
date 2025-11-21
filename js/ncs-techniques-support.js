// ============================================================================
// NCS TECHNIQUES SUPPORT FUNCTIONS
// ============================================================================
// Toggle function for videos/pictures sections in Module 7
// ============================================================================

console.log('📸 Loading NCS Techniques support functions...');

// Toggle between videos and pictures content
function showNCSContentType(contentType) {
    // Get the sections
    const videosSection = document.getElementById('ncs-videos-section');
    const picturesSection = document.getElementById('ncs-pictures-section');

    // Get the buttons
    const videosBtn = document.getElementById('ncs-videos-btn');
    const picturesBtn = document.getElementById('ncs-pictures-btn');

    if (contentType === 'videos') {
        // Show videos, hide pictures
        if (videosSection) videosSection.style.display = 'block';
        if (picturesSection) picturesSection.style.display = 'none';

        // Update button styles
        if (videosBtn) {
            videosBtn.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
            videosBtn.style.color = 'white';
            videosBtn.style.border = 'none';
            videosBtn.style.boxShadow = '0 8px 25px rgba(20, 184, 166, 0.4)';
            videosBtn.classList.add('active');
        }
        if (picturesBtn) {
            picturesBtn.style.background = 'white';
            picturesBtn.style.color = '#64748b';
            picturesBtn.style.border = '2px solid rgba(139, 92, 246, 0.3)';
            picturesBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';
            picturesBtn.classList.remove('active');
        }
    } else if (contentType === 'pictures') {
        // Show pictures, hide videos
        if (videosSection) videosSection.style.display = 'none';
        if (picturesSection) picturesSection.style.display = 'block';

        // Update button styles
        if (videosBtn) {
            videosBtn.style.background = 'white';
            videosBtn.style.color = '#64748b';
            videosBtn.style.border = '2px solid rgba(20, 184, 166, 0.3)';
            videosBtn.style.boxShadow = '0 4px 15px rgba(20, 184, 166, 0.15)';
            videosBtn.classList.remove('active');
        }
        if (picturesBtn) {
            picturesBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            picturesBtn.style.color = 'white';
            picturesBtn.style.border = 'none';
            picturesBtn.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
            picturesBtn.classList.add('active');
        }
    }
}

// Toggle between UE and LE pictures within the pictures section
function showNCSExtremity(extremity) {
    // Get the sections
    const ueSection = document.getElementById('ncs-ue-pictures');
    const leSection = document.getElementById('ncs-le-pictures');

    // Get the buttons
    const ueBtn = document.getElementById('ncs-ue-btn');
    const leBtn = document.getElementById('ncs-le-btn');

    if (extremity === 'ue') {
        // Show UE, hide LE
        if (ueSection) ueSection.style.display = 'block';
        if (leSection) leSection.style.display = 'none';

        // Update button styles
        if (ueBtn) {
            ueBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            ueBtn.style.color = 'white';
            ueBtn.style.border = 'none';
            ueBtn.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
            ueBtn.classList.add('active');
        }
        if (leBtn) {
            leBtn.style.background = 'white';
            leBtn.style.color = '#64748b';
            leBtn.style.border = '2px solid rgba(16, 185, 129, 0.3)';
            leBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.15)';
            leBtn.classList.remove('active');
        }
    } else if (extremity === 'le') {
        // Show LE, hide UE
        if (ueSection) ueSection.style.display = 'none';
        if (leSection) leSection.style.display = 'block';

        // Update button styles
        if (ueBtn) {
            ueBtn.style.background = 'white';
            ueBtn.style.color = '#64748b';
            ueBtn.style.border = '2px solid rgba(139, 92, 246, 0.3)';
            ueBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';
            ueBtn.classList.remove('active');
        }
        if (leBtn) {
            leBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            leBtn.style.color = 'white';
            leBtn.style.border = 'none';
            leBtn.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
            leBtn.classList.add('active');
        }
    }
}

// Navigate through image gallery
function navigateGallery(button, direction) {
    const gallery = button.closest('.ncs-image-gallery');
    if (!gallery) return;

    const images = JSON.parse(gallery.getAttribute('data-images'));
    const imgElement = gallery.querySelector('.ncs-gallery-image');
    const counter = gallery.querySelector('.gallery-counter');
    const leftBtn = gallery.querySelectorAll('button')[0];
    const rightBtn = gallery.querySelectorAll('button')[1];

    if (!imgElement || images.length <= 1) return;

    // Decode the URL first, then extract relative path
    let currentSrc = decodeURIComponent(imgElement.src);

    // Find the relative path by looking for 'NCS images/'
    let relativeSrc = '';
    let ncsIndex = currentSrc.indexOf('NCS images/');
    if (ncsIndex !== -1) {
        relativeSrc = currentSrc.substring(ncsIndex);
    } else {
        // Fallback: assume we're already at a relative path
        relativeSrc = currentSrc;
    }

    let currentIndex = images.indexOf(relativeSrc);

    // Debug logging
    console.log('🖼️ Gallery Navigation Debug:');
    console.log('  Original src:', imgElement.src);
    console.log('  Decoded src:', currentSrc);
    console.log('  Relative src:', relativeSrc);
    console.log('  Images array:', images);
    console.log('  Current index:', currentIndex);
    console.log('  Direction:', direction);

    if (currentIndex === -1) {
        console.warn('⚠️ Could not find current image in array, resetting to 0');
        currentIndex = 0;
    }

    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    console.log('  New index:', newIndex);
    console.log('  New image:', images[newIndex]);

    // Update image
    imgElement.src = images[newIndex];

    // Update counter
    if (counter) {
        counter.textContent = `${newIndex + 1} / ${images.length}`;
    }

    // Update button visibility based on new position
    if (leftBtn) {
        leftBtn.style.display = newIndex === 0 ? 'none' : 'block';
    }
    if (rightBtn) {
        rightBtn.style.display = newIndex === images.length - 1 ? 'none' : 'block';
    }
}

// Make functions globally available
window.showNCSContentType = showNCSContentType;
window.showNCSExtremity = showNCSExtremity;
window.navigateGallery = navigateGallery;

console.log('✅ NCS Techniques support functions loaded');
