
export const NCSBasicTechniques = {
    generateContent() {
        return window.contentLoader ? window.contentLoader.getHTMLSync('ncs-techniques') : '<div class="loading">Loading content...</div>';
    },

    toggleContentType(type) {
        const videosBtn = document.getElementById('ncs-videos-btn');
        const picturesBtn = document.getElementById('ncs-pictures-btn');
        const videosSection = document.getElementById('ncs-videos-section');
        const picturesSection = document.getElementById('ncs-pictures-section');

        if (type === 'videos') {
            // Activate Videos button
            videosBtn.classList.add('active');
            videosBtn.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
            videosBtn.style.color = 'white';
            videosBtn.style.borderColor = 'transparent';
            videosBtn.style.transform = 'scale(1.05)';
            videosBtn.style.boxShadow = '0 8px 25px rgba(20, 184, 166, 0.4)';

            // Deactivate Pictures button
            picturesBtn.classList.remove('active');
            picturesBtn.style.background = 'white';
            picturesBtn.style.color = '#64748b';
            picturesBtn.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            picturesBtn.style.transform = '';
            picturesBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.15)';

            // Show Videos, hide Pictures
            videosSection.style.display = 'block';
            picturesSection.style.display = 'none';
        } else if (type === 'pictures') {
            // Activate Pictures button
            picturesBtn.classList.add('active');
            picturesBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            picturesBtn.style.color = 'white';
            picturesBtn.style.borderColor = 'transparent';
            picturesBtn.style.transform = 'scale(1.05)';
            picturesBtn.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';

            // Deactivate Videos button
            videosBtn.classList.remove('active');
            videosBtn.style.background = 'white';
            videosBtn.style.color = '#64748b';
            videosBtn.style.borderColor = 'rgba(20, 184, 166, 0.3)';
            videosBtn.style.transform = '';
            videosBtn.style.boxShadow = '0 4px 15px rgba(20, 184, 166, 0.15)';

            // Show Pictures, hide Videos
            picturesSection.style.display = 'block';
            videosSection.style.display = 'none';
        }
    },

    navigateGallery(button, direction) {
        const gallery = button.closest('.ncs-image-gallery');
        const img = gallery.querySelector('.ncs-gallery-image');
        const images = JSON.parse(gallery.getAttribute('data-images'));
        const counter = gallery.querySelector('.gallery-counter');
        const leftBtn = gallery.querySelectorAll('button')[0];
        const rightBtn = gallery.querySelectorAll('button')[1];

        let currentIndex = parseInt(gallery.getAttribute('data-current-index') || '0');
        currentIndex = (currentIndex + direction + images.length) % images.length;
        gallery.setAttribute('data-current-index', currentIndex);

        img.src = images[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${images.length}`;

        // Show/hide arrows based on position
        leftBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        rightBtn.style.display = currentIndex === images.length - 1 ? 'none' : 'block';
    }
};

window.generateNCSBasicTechniquesContent = NCSBasicTechniques.generateContent;
window.showNCSContentType = NCSBasicTechniques.toggleContentType;
window.navigateGallery = NCSBasicTechniques.navigateGallery;
