import { NCSTechniquesData } from './NCSTechniquesData.js';
import logger from '../../utils/Logger.js';

export default {
    initialize() {
        logger.log('Initializing NCS Techniques Module');

        // Extremity Toggle Logic (UE vs LE)
        window.showNCSExtremity = function (extremity) {
            const ueSection = document.getElementById('ncs-ue-pictures');
            const leSection = document.getElementById('ncs-le-pictures');
            const ueBtn = document.getElementById('ncs-ue-btn');
            const leBtn = document.getElementById('ncs-le-btn');

            if (extremity === 'ue') {
                if (ueSection) ueSection.style.display = 'block';
                if (leSection) leSection.style.display = 'none';
                if (ueBtn) {
                    ueBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
                    ueBtn.style.color = 'white';
                    ueBtn.classList.add('active');
                    ueBtn.style.border = 'none';
                }
                if (leBtn) {
                    leBtn.style.background = 'white';
                    leBtn.style.color = '#64748b';
                    leBtn.classList.remove('active');
                    leBtn.style.border = '2px solid rgba(16, 185, 129, 0.3)';
                }
            } else if (extremity === 'le') {
                if (ueSection) ueSection.style.display = 'none';
                if (leSection) leSection.style.display = 'block';
                if (ueBtn) {
                    ueBtn.style.background = 'white';
                    ueBtn.style.color = '#64748b';
                    ueBtn.classList.remove('active');
                    ueBtn.style.border = '2px solid rgba(139, 92, 246, 0.3)';
                }
                if (leBtn) {
                    leBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    leBtn.style.color = 'white';
                    leBtn.classList.add('active');
                    leBtn.style.border = 'none';
                }
            }
        };

        // Content Type Toggle Logic (Videos vs Pictures)
        window.showNCSContentType = function (type) {
            const videoSection = document.getElementById('ncs-videos-section');
            const picSection = document.getElementById('ncs-pictures-section');
            const videoBtn = document.getElementById('ncs-videos-btn');
            const picBtn = document.getElementById('ncs-pictures-btn');

            if (type === 'videos') {
                if (videoSection) videoSection.style.display = 'block';
                if (picSection) picSection.style.display = 'none';

                if (videoBtn) {
                    videoBtn.style.background = 'linear-gradient(135deg, #0d9488, #0e7490)';
                    videoBtn.style.color = 'white';
                    videoBtn.style.border = 'none';
                    videoBtn.classList.add('active');
                }
                if (picBtn) {
                    picBtn.style.background = 'white';
                    picBtn.style.color = '#64748b';
                    picBtn.style.border = '2px solid rgba(139, 92, 246, 0.3)';
                    picBtn.classList.remove('active');
                }
            } else {
                if (videoSection) videoSection.style.display = 'none';
                if (picSection) picSection.style.display = 'block';

                if (videoBtn) {
                    videoBtn.style.background = 'white';
                    videoBtn.style.color = '#64748b';
                    videoBtn.style.border = '2px solid rgba(13, 148, 136, 0.3)';
                    videoBtn.classList.remove('active');
                }
                if (picBtn) {
                    picBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
                    picBtn.style.color = 'white';
                    picBtn.style.border = 'none';
                    picBtn.classList.add('active');
                }
            }
        };

        // Robust Gallery Navigation Logic for multiple images
        window.navigateGallery = function (btn, direction) {
            const gallery = btn.closest('.ncs-image-gallery');
            const imgElement = gallery.querySelector('.ncs-gallery-image');
            const counter = gallery.querySelector('.gallery-counter');

            // Re-parse the array attached as a data attribute
            let images = [];
            try {
                images = JSON.parse(gallery.getAttribute('data-images') || '[]');
            } catch (e) {
                logger.error("Gallery JSON parse error:", e);
                return;
            }

            if (images.length <= 1) return;

            // Strip the base URL to just get the relative path
            const currentSrc = new URL(imgElement.src).pathname.substring(1);

            // Find current index
            let currentIndex = images.findIndex(img => currentSrc.endsWith(img));
            if (currentIndex === -1) currentIndex = 0; // Fallback

            // Calculate new index
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = images.length - 1;
            if (newIndex >= images.length) newIndex = 0;

            // Set new image
            imgElement.src = images[newIndex];

            // Update counter UI (1-based index)
            if (counter) counter.innerText = `${newIndex + 1} / ${images.length}`;
        };
    },

    // --- RENDER HELPERS ---

    renderVideoGrid(videoArray, themeColor) {
        return `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 40px;">
                ${videoArray.map(vid => `
                    <div class="ncs-technique-card">
                        <h6 style="color: ${themeColor}; margin-bottom: 15px; font-size: 1.15em; font-weight: 800;">${vid.title}</h6>
                        <div style="position: relative; width: 100%; height: 220px; background: #f8fafc; border-radius: 12px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
                            <iframe width="100%" height="100%" src="${vid.url}" frameborder="0" allowfullscreen style="border: none;"></iframe>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    renderPictureCard(data, themeColor, lightBgColor) {
        const hasMultipleImages = data.images.length > 1;
        const imagesJSON = JSON.stringify(data.images).replace(/"/g, '&quot;');

        return `
            <div class="ncs-technique-card">
                <div class="ncs-image-gallery" data-images="${imagesJSON}" style="position: relative; margin-bottom: 20px; background: #f8fafc; border-radius: 12px; padding: 10px; border: 1px solid #e2e8f0;">
                    <img class="ncs-gallery-image" src="${data.images[0]}" style="width: 100%; height: 200px; object-fit: contain; border-radius: 8px; display: block; margin: 0 auto;">
                    
                    ${hasMultipleImages ? `
                        <button onclick="navigateGallery(this, -1)" class="gallery-nav-btn left">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button onclick="navigateGallery(this, 1)" class="gallery-nav-btn right">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                        <div class="gallery-counter">1 / ${data.images.length}</div>
                    ` : ''}
                </div>
                
                <h6 style="color: ${themeColor}; font-weight: 800; font-size: 1.2em; margin-bottom: 12px;">${data.title}</h6>
                
                <div style="color: #334155; font-size: 0.95em; line-height: 1.6; margin-bottom: 15px;">
                    <div style="font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 0.8em; letter-spacing: 0.05em; margin-bottom: 5px;">The Protocol</div>
                    ${data.protocol}
                </div>
                
                <div style="background: ${lightBgColor}; border-left: 4px solid ${themeColor}; padding: 15px; border-radius: 0 8px 8px 0; margin-top: 15px;">
                    <div style="font-weight: 800; color: ${themeColor}; font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; display: flex; align-items: center; gap: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        Resident Pearl
                    </div>
                    <div style="color: #475569; font-size: 0.9em; line-height: 1.5;">${data.pearl}</div>
                </div>
            </div>
        `;
    },

    generateContent() {
        const { videos, pictures } = NCSTechniquesData;

        return `
        <style>
            @keyframes gradient-flow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .ncs-technique-card {
                background: white;
                padding: 25px;
                border-radius: 16px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                border: 1px solid #e2e8f0;
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s;
                display: flex;
                flex-direction: column;
            }
            .ncs-technique-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
            
            .gallery-nav-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 40px !important;
                height: 40px !important;
                border: none !important;
                border-radius: 50% !important;
                background: rgba(255, 255, 255, 0.9) !important;
                color: #0f172a !important;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0 !important;
            }
            .gallery-nav-btn.left { left: 10px; }
            .gallery-nav-btn.right { right: 10px; }
            .gallery-nav-btn:hover { background: white !important; transform: translateY(-50%) scale(1.1) !important; }
            .gallery-nav-btn:active { transform: translateY(-50%) scale(0.95) !important; }
            
            .gallery-counter {
                position: absolute;
                bottom: 10px;
                right: 10px;
                background: rgba(15, 23, 42, 0.75);
                backdrop-filter: blur(4px);
                color: white;
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 0.8em;
                font-weight: 600;
                letter-spacing: 0.05em;
            }
        </style>
        
        <div class="interactive-content">
            
            <!-- Learning Objective Premium Header -->
            <div style="
                background: linear-gradient(135deg, #0d9488, #0e7490, #4338ca);
                background-size: 200% 200%;
                animation: gradient-flow 10s ease infinite;
                padding: 40px;
                border-radius: 24px;
                margin-bottom: 30px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 20px 40px -10px rgba(13, 148, 136, 0.3);
            ">
                <h3 style="color: white; margin: 0 0 15px 0; font-size: 2.2em; font-weight: 900; letter-spacing: -0.02em;">Techniques & Protocols</h3>
                <p style="color: rgba(255,255,255,0.9); font-size: 1.15em; font-weight: 400; margin: 0; line-height: 1.6; max-width: 800px;">
                    Mastering Electrodiagnostic Medicine requires absolute precision. Watch the technical execution in the video series, or study the exact anatomical landmarks, distance protocols, and clinical pitfalls in the picture guides below.
                </p>
            </div>

            <!-- Core Principles Primer Card -->
            <div style="background: white; border-radius: 16px; padding: 30px; margin-bottom: 40px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <h4 style="color: #0f172a; font-size: 1.3em; margin: 0 0 15px 0; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    The Fundamentals of Placement
                </h4>
                <p style="color: #475569; font-size: 1.05em; line-height: 1.6; margin: 0 0 15px 0;">
                    Before diving into specific nerves, understand the universal rule of NCS: <strong style="color: #0f172a;">G1 represents the recording electrode</strong>, and <strong style="color: #0f172a;">G2 represents the reference electrode.</strong>
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1;">
                        <strong style="color: #0d9488; font-size: 1.1em; display: block; margin-bottom: 8px;">Motor Studies (CMAP)</strong>
                        <span style="color: #475569; font-size: 0.95em; line-height: 1.5; display: block;">G1 must be placed squarely on the thickest part of the muscle belly. G2 must be placed distally on an electrically "dead" spot, typically the tendon or nearest distal joint. The machine calculates the difference between the active muscle and the dead joint.</span>
                    </div>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1;">
                        <strong style="color: #8b5cf6; font-size: 1.1em; display: block; margin-bottom: 8px;">Sensory Studies (SNAP)</strong>
                        <span style="color: #475569; font-size: 0.95em; line-height: 1.5; display: block;">G1 is placed directly over the sensory nerve exactly 14 cm away from the stimulator. G2 is placed 3-4 cm distally along the nerve path. Accurate distance measurement down to the millimeter is mandatory, as sensory signals are tiny and travel infinitely fast.</span>
                    </div>
                </div>
            </div>

            <!-- Videos/Pictures Main Toggle -->
            <div style="display: flex; gap: 15px; margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto;">
                <button id="ncs-videos-btn" onclick="showNCSContentType('videos')" class="active" 
                    style="flex: 1; padding: 16px 30px; border: none; border-radius: 12px; background: linear-gradient(135deg, #0d9488, #0e7490); color: white; font-size: 1.1em; font-weight: 700; cursor: pointer; box-shadow: 0 4px 10px rgba(13, 148, 136, 0.3); transition: all 0.2s;">
                    Instructional Videos
                </button>
                <button id="ncs-pictures-btn" onclick="showNCSContentType('pictures')" 
                    style="flex: 1; padding: 16px 30px; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 12px; background: white; color: #64748b; font-size: 1.1em; font-weight: 700; cursor: pointer; transition: all 0.2s;">
                    Picture Protocols
                </button>
            </div>

            <!-- VIDEOS SECTION -->
            <div id="ncs-videos-section" style="display: block;">
                <h4 style="color: #0f172a; font-size: 1.6em; margin-bottom: 25px; font-weight: 900; letter-spacing: -0.01em; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Upper Extremity Techniques</h4>
                ${this.renderVideoGrid(videos.upperExtremity, '#0d9488')}

                <h4 style="color: #0f172a; font-size: 1.6em; margin-bottom: 25px; font-weight: 900; letter-spacing: -0.01em; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Lower Extremity Techniques</h4>
                ${this.renderVideoGrid(videos.lowerExtremity, '#0d9488')}
            </div>

            <!-- PICTURES SECTION -->
            <div id="ncs-pictures-section" style="display: none;">
                
                <!-- Extremity Sub-Toggle -->
                 <div style="display: flex; gap: 15px; margin-bottom: 30px; max-width: 400px;">
                    <button id="ncs-ue-btn" onclick="showNCSExtremity('ue')" class="active" 
                        style="flex: 1; padding: 12px 20px; border-radius: 8px; border:none; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; font-weight: 700; font-size: 0.95em; cursor: pointer; box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);">
                        Upper Extremity
                    </button>
                    <button id="ncs-le-btn" onclick="showNCSExtremity('le')" 
                        style="flex: 1; padding: 12px 20px; border-radius: 8px; border: 2px solid rgba(16, 185, 129, 0.3); background: white; color: #64748b; font-weight: 700; font-size: 0.95em; cursor: pointer;">
                        Lower Extremity
                    </button>
                </div>

                <!-- Upper Extremity Content Container -->
                <div id="ncs-ue-pictures" style="display: block;">
                     
                     <h4 style="color: #0f172a; font-size: 1.4em; margin-bottom: 20px; font-weight: 800;">Motor Protocols</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        ${pictures.upperExtremityMotor.map(p => this.renderPictureCard(p, '#8b5cf6', '#f5f3ff')).join('')}
                     </div>

                     <h4 style="color: #0f172a; font-size: 1.4em; margin-bottom: 20px; font-weight: 800;">Sensory Protocols</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        ${pictures.upperExtremitySensory.map(p => this.renderPictureCard(p, '#8b5cf6', '#f5f3ff')).join('')}
                     </div>
                     
                     <h4 style="color: #0f172a; font-size: 1.4em; margin-bottom: 20px; font-weight: 800;">Comparison Protocols</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        ${pictures.comparisonStudies.map(p => this.renderPictureCard(p, '#8b5cf6', '#f5f3ff')).join('')}
                     </div>
                     
                     <h4 style="color: #0f172a; font-size: 1.4em; margin-bottom: 20px; font-weight: 800;">Palmar Mixed Protocols</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        ${pictures.palmarMixed.map(p => this.renderPictureCard(p, '#8b5cf6', '#f5f3ff')).join('')}
                     </div>
                </div>

                <!-- Lower Extremity Content Container -->
                <div id="ncs-le-pictures" style="display: none;">
                     <h4 style="color: #0f172a; font-size: 1.4em; margin-bottom: 20px; font-weight: 800;">Lower Extremity Motor Protocols</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        ${pictures.lowerExtremityMotor.map(p => this.renderPictureCard(p, '#10b981', '#ecfdf5')).join('')}
                     </div>

                     <h4 style="color: #0f172a; font-size: 1.4em; margin-bottom: 20px; font-weight: 800;">Lower Extremity Sensory Protocols</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        ${pictures.lowerExtremitySensory.map(p => this.renderPictureCard(p, '#10b981', '#ecfdf5')).join('')}
                     </div>

                     <h4 style="color: #0f172a; font-size: 1.4em; margin-bottom: 20px; font-weight: 800;">Lower Extremity Mixed & Late Responses</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px;">
                        ${pictures.lowerExtremityMixed.map(p => this.renderPictureCard(p, '#10b981', '#ecfdf5')).join('')}
                     </div>
                </div>
            </div>
        </div>

        <!-- Knowledge Check Quiz -->
        <div style="margin-top: 50px; border-top: 2px dashed #cbd5e1; padding-top: 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h3 style="color: #0f172a; margin-bottom: 10px; font-size: 2em; font-weight: 900;">NCS Techniques Knowledge Check</h3>
                <p style="font-size: 1.1em; color: #475569;">Test your understanding of electrode placement and protocol selection</p>
            </div>
            ${typeof window.generateModuleQuiz === 'function' ?
                window.generateModuleQuiz(NCSTechniquesData.quiz)
                : '<div style="text-align:center; padding: 20px; background: white; border-radius: 12px; color: #64748b;">Quiz system currently unavailable.</div>'}
        </div>
        `;
    }
};
