export default {
    initialize() {
        console.log('Initializing NCS Techniques Module');

        // Main Tab Navigation (Upper/Lower/Quiz) - Keeps existing logic pattern
        window.showNCSTechniquesSection = function (sectionId) {
            // Hide all main sections
            // For now, let's map 'upper-limb' to showing the whole content div basically, 
            // since the new design is monolithic with internal toggles.
            // Actually, the temp file uses a different structure. 
            // It has one main <div class="interactive-content">.
            // I will return ONLY that div in generateContent.
            // So this function might be redundant if I don't use the old tabs.
            // BUT, the wrapper expects it.
        };

        // Gallery Navigation Logic
        window.navigateGallery = function (btn, direction) {
            const gallery = btn.closest('.ncs-image-gallery');
            const imgElement = gallery.querySelector('.ncs-gallery-image');
            const counter = gallery.querySelector('.gallery-counter');
            const images = JSON.parse(gallery.getAttribute('data-images'));
            const leftBtn = gallery.querySelector('button[onclick*="-1"]');
            const rightBtn = gallery.querySelector('button[onclick*="1"]');

            if (!images || images.length === 0) return;

            // Find current index based on src
            let currentSrc = imgElement.src;
            try { currentSrc = decodeURIComponent(currentSrc); } catch (e) { }

            let relativeSrc = '';
            // Try to match end of string
            for (let img of images) {
                if (currentSrc.endsWith(encodeURI(img)) || currentSrc.endsWith(img)) {
                    relativeSrc = img;
                    break;
                }
            }
            // Fallback if not found (direct match attempt)
            if (!relativeSrc) {
                let parts = currentSrc.split('/');
                if (parts.length >= 2) relativeSrc = 'images/ncs/' + parts[parts.length - 1];
            }

            let currentIndex = images.indexOf(relativeSrc);
            // Relaxed matching
            if (currentIndex === -1) {
                // Try finding by basename
                currentIndex = images.findIndex(img => currentSrc.includes(img.split('/').pop()));
            }

            if (currentIndex === -1) currentIndex = 0;

            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = images.length - 1;
            if (newIndex >= images.length) newIndex = 0;

            imgElement.src = images[newIndex];

            if (counter) counter.textContent = (newIndex + 1) + ' / ' + images.length;
            if (leftBtn) leftBtn.style.display = newIndex === 0 ? 'none' : 'block';
            if (rightBtn) rightBtn.style.display = newIndex === images.length - 1 ? 'none' : 'block';
        };

        // Extremity Toggle (UE/LE) for Pictures
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

        // Content Type Toggle (Videos/Pictures)
        window.showNCSContentType = function (type) {
            const videoSection = document.getElementById('ncs-videos-section');
            const picSection = document.getElementById('ncs-pictures-section');
            const videoBtn = document.getElementById('ncs-videos-btn');
            const picBtn = document.getElementById('ncs-pictures-btn');

            if (type === 'videos') {
                if (videoSection) videoSection.style.display = 'block';
                if (picSection) picSection.style.display = 'none';

                if (videoBtn) {
                    videoBtn.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
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
                    videoBtn.style.border = '2px solid rgba(20, 184, 166, 0.3)';
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
    },

    generateContent() {
        return `
        <style>
            @keyframes gradient-flow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            .ncs-technique-card {
                background: white;
                padding: 20px;
                border-radius: 20px;
                box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15);
                border: 2px solid rgba(20, 184, 166, 0.2);
                transition: all 0.3s ease;
            }
            .ncs-technique-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 12px 30px rgba(20, 184, 166, 0.25);
            }
            .ncs-image-gallery button {
                width: 40px !important;
                height: 40px !important;
                border: none !important;
                border-radius: 50% !important;
                background: rgba(255, 255, 255, 0.85) !important;
                backdrop-filter: blur(4px) !important;
                -webkit-backdrop-filter: blur(4px) !important;
                color: #334155 !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                font-size: 24px !important;
                line-height: 40px !important;
                text-align: center !important;
                padding: 0 !important;
                font-family: system-ui, -apple-system, sans-serif !important;
            }
            .ncs-image-gallery button:hover {
                background: white !important;
                transform: translateY(-50%) scale(1.15) !important;
                color: #0f172a !important;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
            }
            .ncs-image-gallery button:active {
                transform: translateY(-50%) scale(0.95) !important;
            }
        </style>
        <div class="interactive-content">
            <!-- Learning Objective Banner with Animated Gradient -->
            <div style="
                background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6);
                background-size: 200% 200%;
                animation: gradient-flow 8s ease infinite;
                padding: 35px;
                border-radius: 20px;
                margin-bottom: 30px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 10px 40px rgba(20, 184, 166, 0.3);
            ">
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.8em; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">Master NCS Techniques</h3>
                <p style="color: rgba(255,255,255,0.95); font-size: 1.1em; font-weight: 500; margin: 0; text-shadow: 0 1px 5px rgba(0,0,0,0.1);">
                    Master proper electrode placement, stimulation techniques, and recording protocols for nerve conduction studies through video demonstrations and visual guides.
                </p>
            </div>

            <!-- Videos/Pictures Toggle Buttons -->
            <div style="display: flex; gap: 20px; margin-bottom: 35px; max-width: 600px; margin-left: auto; margin-right: auto;">
                <button
                    id="ncs-videos-btn"
                    onclick="showNCSContentType('videos')"
                    style="
                        flex: 1;
                        padding: 20px 40px;
                        border: none;
                        border-radius: 50px;
                        background: linear-gradient(135deg, #14b8a6, #06b6d4);
                        color: white;
                        font-size: 1.3em;
                        font-weight: 700;
                        cursor: pointer;
                        box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
                        transition: all 0.3s ease;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    "
                    class="active"
                >
                    Videos
                </button>
                <button
                    id="ncs-pictures-btn"
                    onclick="showNCSContentType('pictures')"
                    style="
                        flex: 1;
                        padding: 20px 40px;
                        border: 2px solid rgba(139, 92, 246, 0.3);
                        border-radius: 50px;
                        background: white;
                        color: #64748b;
                        font-size: 1.3em;
                        font-weight: 700;
                        cursor: pointer;
                        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.15);
                        transition: all 0.3s ease;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    "
                >
                    Pictures
                </button>
            </div>

            <!-- Videos Section -->
            <div id="ncs-videos-section" style="display: block;">
                <!-- Upper Extremity Videos -->
                <div style="margin-bottom: 40px;">
                    <h4 style="color: #0d9488; font-size: 1.8em; margin-bottom: 25px; font-weight: 700;">Upper Extremity NCS</h4>

                    <!-- First Row: Median Sensory, Ulnar Sensory -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Median Sensory</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/86j7cNLIX0U" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>

                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Ulnar Sensory</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/i9Naurf0eWU" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>
                    </div>

                    <!-- Second Row -->
                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Median-Radial Comparison</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nMaxrbpyR-0" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>
                         <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Dorsal Ulnar Cutaneous</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/U-60ft_8klI" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>
                    </div>
                    <!-- Third Row: Median Motor, Ulnar Motor -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Median Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/cdVrcgeBgIg" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>

                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Ulnar Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/UmFYJDMucOY" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                 <!-- Lower Extremity Videos -->
                <div style="margin-bottom: 40px;">
                    <h4 style="color: #0d9488; font-size: 1.8em; margin-bottom: 25px; font-weight: 700;">Lower Extremity NCS</h4>
                    
                    <!-- First Row: Sensory -->
                     <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Superficial Fibular Sensory</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/M1sE2FT8YQg" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>
                         <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Sural Sensory</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/zP1yAU5DW2s" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>
                    </div>

                    <!-- Second Row: Motor -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Common Fibular Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/G1bsDinxuF8" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>

                        <div class="ncs-technique-card">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">Tibial Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/pWeH6kCa9lo" frameborder="0" allowfullscreen style="border-radius: 12px;"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pictures Section (Detailed Galleries) -->
            <div id="ncs-pictures-section" style="display: none;">
                <!-- UE/LE Toggle -->
                 <div style="display: flex; gap: 20px; margin-bottom: 35px; max-width: 600px; margin-left: auto; margin-right: auto;">
                    <button id="ncs-ue-btn" onclick="showNCSExtremity('ue')" class="active" style="flex: 1; padding: 15px; border-radius: 30px; border:none; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; font-weight: bold; cursor: pointer;">Upper Extremity</button>
                    <button id="ncs-le-btn" onclick="showNCSExtremity('le')" style="flex: 1; padding: 15px; border-radius: 30px; border: 2px solid #10b981; background: white; color: #64748b; font-weight: bold; cursor: pointer;">Lower Extremity</button>
                </div>

                <!-- Upper Extremity Content -->
                <div id="ncs-ue-pictures" style="display: block;">
                     <h4 style="color: #8b5cf6; font-size: 1.5em; margin-bottom: 20px;">Motor Studies</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        <!-- Median Motor -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/median_motor_at_wrist.png", "images/ncs/median_motor_at_elbow.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/median_motor_at_wrist.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Median Motor</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Abductor pollicis brevis (APB)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> 1st MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Between FCR & palmaris longus (8 cm)<br>
                                &nbsp;&nbsp;• <strong>Antecubital fossa:</strong> Over brachial artery pulse
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Excessive stim may co-activate ulnar nerve. Check for Martin-Gruber anastomosis if antecubital > wrist amplitude.</small>
                            </div>
                        </div>
                        
                        <!-- Median Motor Palmar -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/median_motor_at_wrist.png", "images/ncs/median_motor_at_elbow.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/median_motor_at_wrist.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Median Motor Palmar</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> APB<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> 1st MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Between FCR & palmaris longus (8 cm)<br>
                                &nbsp;&nbsp;• <strong>Palm:</strong> 7 cm distal to wrist
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Palm/wrist ratio >1.2 implies conduction block across wrist. Recurrent thenar branch curves back from palm.</small>
                            </div>
                        </div>

                        <!-- Ulnar Motor -->
                        <div class="ncs-technique-card">
                             <div class="ncs-image-gallery" data-images='["images/ncs/ulnar_motor_at_the_wrist.png", "images/ncs/ulnar_motor_ncs_below_the_elbow.png", "images/ncs/ulnar_motor_ncs_above_the_elbow.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/ulnar_motor_at_the_wrist.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 3</div>
                            </div>
                             <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Ulnar Motor</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Abductor digiti minimi (ADM)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> 5th MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Medial wrist, adjacent to FCU (8 cm)<br>
                                &nbsp;&nbsp;• <strong>Below elbow:</strong> 3 cm distal to epicondyle<br>
                                &nbsp;&nbsp;• <strong>Above elbow:</strong> Medial humerus (10-12 cm from BE)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Elbow flexed 90-135°. Must stimulate ≥3 cm distal to medial epicondyle. Check for Martin-Gruber.</small>
                            </div>
                        </div>

                        <!-- Deep Ulnar Motor -->
                        <div class="ncs-technique-card">
                             <div class="ncs-image-gallery" data-images='["images/ncs/deep_ulnar_motor_branch.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/deep_ulnar_motor_branch.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Deep Ulnar Motor (FDI)</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> First dorsal interosseous (FDI)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> Thumb MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Medial wrist (8-12 cm)<br>
                                &nbsp;&nbsp;• <strong>Below elbow:</strong> 3 cm distal to epicondyle<br>
                                &nbsp;&nbsp;• <strong>Above elbow:</strong> Medial humerus
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Preferentially affected in Guyon's canal lesions. More sensitive for ulnar slowing at elbow than ADM.</small>
                            </div>
                        </div>

                        <!-- Radial Motor -->
                        <div class="ncs-technique-card">
                             <div class="ncs-image-gallery" data-images='["images/ncs/radial_motor_distal_stim.png", "images/ncs/radial_motor_stim_at_elbow.png", "images/ncs/radial_motor_stim_below_spiral_groove.png", "images/ncs/radial_motor_stim_above_spiral_groove.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/radial_motor_distal_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 4</div>
                            </div>
                             <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Radial Motor</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Extensor indicis proprius (EIP)<br>
                                <strong style="color: #8b5cf6;">Position:</strong> Hand pronated, G1 2-fingers prox to ulnar styloid<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Forearm:</strong> Over ulna (5-7 cm from G1)<br>
                                &nbsp;&nbsp;• <strong>Elbow:</strong> Biceps/Brachioradialis groove<br>
                                &nbsp;&nbsp;• <strong>Spiral Groove:</strong> Below and Above
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Initial positive deflection is normal. Use obstetric calipers for proximal distances. Useful for spiral groove lesions.</small>
                            </div>
                        </div>
                     </div>

                     <h4 style="color: #8b5cf6; font-size: 1.5em; margin: 30px 0 20px;">Sensory Studies</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        
                        <!-- Median Sensory -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/median_sensory_ncs.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/median_sensory_ncs.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Median Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Middle finger (G1 at PIP, G2 at DIP)<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Wrist (14 cm) + Palm (7 cm distal to wrist, toward middle finger)<br>
                                <strong style="color: #8b5cf6;">Distances:</strong> Wrist 14 cm, Palm 7 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Palm/wrist ratio >1.6 = conduction block. Calculate wrist-palm CV for carpal tunnel assessment (segmental study). Rotate anode if artifact.</small>
                            </div>
                        </div>

                        <!-- Ulnar Sensory -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/ulnar_sensory_ncs.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/ulnar_sensory_ncs.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Ulnar Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Little finger (Digit 5)<br>
                                <strong style="color: #8b5cf6;">Ring electrodes:</strong> G1 at MCP joint, G2 3-4 cm distally at DIP<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Wrist (medial, adjacent to FCU tendon)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 14 cm (antidromic)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> May be abnormal in ulnar neuropathy or lower trunk plexopathy. Volume-conducted motor may obscure - spread fingers if needed.</small>
                            </div>
                        </div>

                        <!-- Dorsal Ulnar Cutaneous -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/dorsal_ulnar_cutaneous_ncs.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/dorsal_ulnar_cutaneous_ncs.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Dorsal Ulnar Cutaneous</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Dorsal hand web space (D4-5)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Between little & ring fingers | <strong style="color: #8b5cf6;">G2:</strong> 3-4 cm over little finger<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Proximal to ulnar styloid (hand pronated)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 8 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> ALWAYS spared in Guyon's canal lesions. May be abnormal in ulnar neuropathy at elbow. Low stim intensity (5-15 mA) sufficient.</small>
                            </div>
                        </div>

                        <!-- Radial Sensory -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/radial_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/radial_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Radial Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Superficial radial nerve over extensor tendons to thumb<br>
                                <strong style="color: #8b5cf6;">Tip:</strong> Palpate nerve over thumb extensor tendon (have patient extend thumb)<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Distal-mid radius<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 14 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Abnormal in radial neuropathy, posterior cord, upper/middle trunk plexopathy. SPARED in posterior interosseous neuropathy.</small>
                            </div>
                        </div>

                        <!-- Medial Antebrachial Cutaneous -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/medial_antebrachial_cutaneous.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/medial_antebrachial_cutaneous.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Medial Antebrachial Cutaneous</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Medial forearm<br>
                                <strong style="color: #8b5cf6;">G1:</strong> 12 cm distal to stim (line to ulnar wrist) | <strong style="color: #8b5cf6;">G2:</strong> 3-4 cm distally<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Medial elbow (midpoint biceps tendon to medial epicondyle)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 12 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Abnormal in medial cord/lower trunk plexopathy. Absent/low in true neurogenic TOS. Side-to-side comparison helpful. Low stim (5-15 mA).</small>
                            </div>
                        </div>

                        <!-- Lateral Antebrachial Cutaneous -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/lateral_antebrachial_cutaneous.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/lateral_antebrachial_cutaneous.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Lateral Antebrachial Cutaneous</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Lateral forearm<br>
                                <strong style="color: #8b5cf6;">G1:</strong> 12 cm distal to stim (line to radial wrist) | <strong style="color: #8b5cf6;">G2:</strong> 3-4 cm distally<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Antecubital fossa (lateral to biceps tendon)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 12 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Abnormal in musculocutaneous nerve, lateral cord, or upper trunk plexopathy. Low stim (5-15 mA). Avoid excessive stim → direct biceps activation.</small>
                            </div>
                        </div>

                        <!-- Upper Extremity Proximal -->
                        <div class="ncs-technique-card">
                            <div style="background: rgba(139, 92, 246, 0.05); border: 1px dashed rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 15px; margin-bottom: 15px; text-align: center;">
                                <span style="color: #8b5cf6; font-size: 0.9em;">📷 No Image Available</span>
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">UE Proximal Stimulation</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Any UE muscle (deltoid, infraspinatus, biceps, triceps)<br>
                                <strong style="color: #8b5cf6;">Belly-tendon:</strong> G1 on muscle belly, G2 on tendon<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Erb's point (supraclavicular fossa posterior to SCM) OR Cervical roots (monopolar needle)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> Variable (use calipers)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Supramax difficult. Side-to-side comparison essential. Use calipers for distances. CAUTION: Pneumothorax risk if needle too lateral at roots.</small>
                            </div>
                        </div>
                     </div>
                     
                     <h4 style="color: #8b5cf6; font-size: 1.5em; margin: 30px 0 20px;">Comparison Studies</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        
                        <!-- Lumbrical-Interossei -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/ulnar_median_motor_comparsion_median_stim.png", "images/ncs/ulnar_median_motor_comparsion_ulnar_stim.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/ulnar_median_motor_comparsion_median_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Lumbrical-Interossei</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> SAME electrodes for both<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Lateral to 3rd metacarpal midpoint | <strong style="color: #8b5cf6;">G2:</strong> D2 MCP joint<br>
                                <strong style="color: #8b5cf6;">Median stim:</strong> 2nd lumbrical | <strong style="color: #8b5cf6;">Ulnar stim:</strong> 1st palmar interosseous<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 10 cm (SAME for both)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Latency difference <0.5ms normal. Useful for CTS or Guyon's canal. Helpful when polyneuropathy present. Avoid co-stimulation. Interosseous amp > lumbrical amp.</small>
                            </div>
                         </div>

                         <!-- Median vs Ulnar D4 -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/ulnar_to_median_sensory_comparison_median_stim.png", "images/ncs/ulnar_to_median_sensory_comparison_ulnar_stim.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/ulnar_to_median_sensory_comparison_median_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Median vs Ulnar - Digit 4</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Ring finger (same electrodes)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> MCP joint | <strong style="color: #8b5cf6;">G2:</strong> 3-4 cm distally at DIP<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Median at wrist vs Ulnar at wrist<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 10 cm (SAME for both)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Split innervation (lateral median, medial ulnar). Latency difference <0.5ms normal. Useful for CTS diagnosis. Avoid co-stimulation. Antidromic.</small>
                            </div>
                         </div>

                         <!-- Median vs Radial D1 -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/radian_vs_median_sensory_comparison_median_stim.png", "images/ncs/radian_vs_median_sensory_comparison_radial_stim.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/radian_vs_median_sensory_comparison_median_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Median vs Radial - Digit 1</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Thumb (same electrodes)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> MCP joint | <strong style="color: #8b5cf6;">G2:</strong> Distally at DIP<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Median at wrist vs Radial at forearm (over radial bone)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 10 cm (SAME for both)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Split innervation (lateral radial, medial median). Latency difference <0.5ms normal. Useful for CTS. Avoid co-stimulation. Antidromic.</small>
                            </div>
                         </div>
                     </div>
                     
                     <h4 style="color: #8b5cf6; font-size: 1.5em; margin: 30px 0 20px;">Palmar Mixed Nerve Studies</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        <!-- Median Palmar Mixed -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/median_vs_ulnar_palmar_mixed_median_record.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/median_vs_ulnar_palmar_mixed_median_record.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Median Palmar Mixed</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Median nerve at wrist<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Between FCR & palmaris longus | <strong style="color: #8b5cf6;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Palm (8 cm from G1, toward index/middle web space)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 8 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Median/ulnar palmar latency difference <0.4ms normal. Subtle CTS detection. VERY careful with 8cm measurement. Avoid co-stimulation.</small>
                            </div>
                        </div>
                        
                        <!-- Ulnar Palmar Mixed -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/median_vs_ulnar_palmar_mixed_ulnar_record.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/median_vs_ulnar_palmar_mixed_ulnar_record.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-weight: 700; margin-bottom: 10px;">Ulnar Palmar Mixed</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Ulnar nerve at wrist<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Medial wrist adjacent to FCU | <strong style="color: #8b5cf6;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Palm (8 cm from G1, toward ring/little web space)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 8 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Compare with median palmar - difference <0.4ms normal. Useful for subtle median slowing across wrist (CTS). Precise 8cm measurement critical.</small>
                            </div>
                        </div>
                     </div>
                </div>

                <!-- Lower Extremity Content -->
                <div id="ncs-le-pictures" style="display: none;">
                     <h4 style="color: #10b981; font-size: 1.5em; margin-bottom: 20px;">Motor Studies</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        <!-- Tibial Motor -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/tibial_motor_at_the_ankle.png", "images/ncs/tibial_motor_at_the_popliteal_fossa.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/tibial_motor_at_the_ankle.png" style="width: 100%; border-radius: 8px; display: block;">
                                 <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Tibial Motor (AHB)</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Abductor hallucis brevis (AHB)<br>
                                <strong style="color: #10b981;">G1:</strong> 1 cm proximal & 1 cm inferior to navicular prominence | <strong style="color: #10b981;">G2:</strong> MTP joint of great toe<br>
                                <strong style="color: #10b981;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Medial ankle:</strong> Slightly proximal & posterior to medial malleolus (9 cm)<br>
                                &nbsp;&nbsp;• <strong>Popliteal fossa:</strong> Mid-posterior knee over popliteal pulse
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Initial positive deflection common (adjust G1 if seen). Popliteal amplitude may drop up to 50% (normal). High stim intensity needed at popliteal fossa.</small>
                            </div>
                        </div>
                        
                         <!-- Peroneal Motor (EDB) -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/fibular_peroneal_motor_at_the_ankle.png", "images/ncs/fibular_peronal_motor_at_the_fibular_head.png", "images/ncs/fibular_peronal_motor_at_the_popliteal_fossa.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/fibular_peroneal_motor_at_the_ankle.png" style="width: 100%; border-radius: 8px; display: block;">
                                 <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 3</div>
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Peroneal Motor (EDB)</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Extensor digitorum brevis (EDB)<br>
                                <strong style="color: #10b981;">G1:</strong> Muscle belly | <strong style="color: #10b981;">G2:</strong> MTP joint of little toe<br>
                                <strong style="color: #10b981;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Ankle:</strong> Anterior ankle, lateral to tibialis anterior tendon (9 cm)<br>
                                &nbsp;&nbsp;• <strong>Below fibular head:</strong> Lateral calf, 1-2 fingerbreadths below head<br>
                                &nbsp;&nbsp;• <strong>Popliteal fossa:</strong> Lateral, 10-12 cm from below-fibular
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> ALWAYS stim all 3 sites to detect fibular neck slowing. Higher current needed below fibular head (deep nerve). If below-fibular > ankle, consider accessory peroneal.</small>
                            </div>
                        </div>

                        <!-- Peroneal Motor (TA) -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/fibular_motor_over_tibialis_anterior_at_the_fibular_head.png", "images/ncs/fibular_motor_over_tibialis_anterior_at_the_popliteal_fossa.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/fibular_motor_over_tibialis_anterior_at_the_fibular_head.png" style="width: 100%; border-radius: 8px; display: block;">
                                 <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Peroneal Motor (TA)</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Tibialis anterior (TA)<br>
                                <strong style="color: #10b981;">G1:</strong> Muscle belly | <strong style="color: #10b981;">G2:</strong> Anterior ankle<br>
                                <strong style="color: #10b981;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Below fibular head:</strong> Lateral calf (5-10 cm)<br>
                                &nbsp;&nbsp;• <strong>Popliteal fossa:</strong> Lateral, 10-12 cm from below-fibular
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Especially valuable for peroneal neuropathy at fibular neck. Easier to demonstrate conduction block/focal slowing than with EDB recording.</small>
                            </div>
                        </div>

                        <!-- Femoral Motor -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/femoral_motor_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/femoral_motor_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Femoral Motor</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Rectus femoris<br>
                                <strong style="color: #10b981;">G1:</strong> Anterior thigh (mid) | <strong style="color: #10b981;">G2:</strong> Knee<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Inguinal area, slightly lateral to femoral pulse
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Firm pressure needed. Difficult in obese patients (>50mA). Limited use: side-to-side comparison. Normal amplitude >3mV.</small>
                            </div>
                        </div>

                        <!-- Medial Plantar Motor -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/medial_plantar_motor_study_at_medial_malleolus.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/medial_plantar_motor_study_at_medial_malleolus.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Medial Plantar Motor</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> AHB<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial ankle (posterior to malleolus)<br>
                                <strong style="color: #10b981;">Distance:</strong> 9 cm
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Useful for tarsal tunnel syndrome. Side-to-side comparison required. Initial positive deflection common.</small>
                            </div>
                        </div>

                        <!-- Lateral Plantar Motor -->
                        <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/lateral_plantar_motor.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/lateral_plantar_motor.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Lateral Plantar Motor</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> ADQP (lateral foot)<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial ankle (posterior to malleolus)<br>
                                <strong style="color: #10b981;">Distance:</strong> Variable
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Useful for tarsal tunnel syndrome. Side-to-side comparison required.</small>
                            </div>
                        </div>
                     </div>

                     <h4 style="color: #10b981; font-size: 1.5em; margin: 30px 0 20px;">Sensory Studies</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        
                        <!-- Superficial Peroneal Sensory -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/superficial_fibular_peroneal_sensory_stud.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/superficial_fibular_peroneal_sensory_stud.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Superficial Peroneal Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Lateral ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Between tibialis anterior tendon & lateral malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm distally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Lateral calf<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm standard (shorter 7-12 cm often easier)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Often easier at shorter distance (7-12 cm) with low stim (5-25mA). Use calculated CV from onset latency, not peak latency. Abnormal in peroneal, sciatic, or lumbosacral plexus lesions.</small>
                            </div>
                        </div>

                         <!-- Sural Sensory -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/sural_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/sural_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Sural Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Posterior ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Posterior to lateral malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm distally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Posterior-lateral calf<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm standard (10-12 cm often easier)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Best performed with patient on side, recording leg up. Shorter distance (10-12cm) often easier with low stim (5-25mA). Abnormal in tibial, sciatic, or lumbosacral plexus lesions.</small>
                            </div>
                        </div>

                        <!-- Saphenous Sensory -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/saphenous_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/saphenous_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Saphenous Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Medial/anterior ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Between medial malleolus & tibialis anterior tendon | <strong style="color: #10b981;">G2:</strong> 3-4 cm distally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial calf (groove between tibia & medial gastrocnemius)<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm standard (10-12 cm often easier)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Often small/absent >age 40 - side-to-side comparison critical. Shorter distance (10-12cm) easier with low stim (5-25mA). Abnormal in femoral nerve or lumbar plexus lesions.</small>
                            </div>
                        </div>

                        <!-- Lateral Femoral Cutaneous -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/lateral_femoral_cutaneous_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/lateral_femoral_cutaneous_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Lateral Femoral Cutaneous</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Anterior thigh (12 cm from stim)<br>
                                <strong style="color: #10b981;">Option 1:</strong> Line from ASIS to lateral patella | <strong style="color: #10b981;">Option 2:</strong> 2 cm medial to Option 1<br>
                                <strong style="color: #10b981;">G2:</strong> 3-4 cm distally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Inguinal area, 1 cm medial to ASIS, above inguinal ligament<br>
                                <strong style="color: #10b981;">Distance:</strong> 12 cm standard (10 cm if needed)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Anatomical variation (80% within 0-1.5cm lateral to ASIS, rarely 5-8.5cm medial). Difficult in obese patients. Side-to-side comparison critical. Used for meralgia paresthetica.</small>
                            </div>
                        </div>

                        <!-- Medial Plantar Sensory -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/medial_plantar_sensory.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/medial_plantar_sensory.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Medial Plantar Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Medial ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Slightly proximal & posterior to medial malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Great toe (ring electrodes at MTP joint proximally, anode distally)<br>
                                <strong style="color: #10b981;">Distance:</strong> Variable (orthodromic study)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Very small/absent even in normals, especially >age 40. Averaging often required. Side-to-side comparison essential. Useful for tarsal tunnel syndrome. For antidromic, reverse electrodes.</small>
                            </div>
                        </div>

                        <!-- Lateral Plantar Sensory -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/lateral_plantar_sensory.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/lateral_plantar_sensory.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Lateral Plantar Sensory</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Medial ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Slightly proximal & posterior to medial malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Little toe (ring electrodes at MTP joint proximally, anode as distal as possible)<br>
                                <strong style="color: #10b981;">Distance:</strong> Variable (orthodromic study)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Very small/absent even in normals, especially >age 40. Averaging often required. Side-to-side comparison essential. Useful for tarsal tunnel syndrome. For antidromic, reverse electrodes.</small>
                            </div>
                        </div>
                     </div>

                     <h4 style="color: #10b981; font-size: 1.5em; margin: 30px 0 20px;">Mixed & Late Responses</h4>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
                        <!-- Medial Plantar Mixed -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/medial_plantar_mixed_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/medial_plantar_mixed_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Medial Plantar Mixed</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Tiibal nerve at medial ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Slightly proximal & posterior to medial malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial sole (7cm into sole, then 7cm parallel to web 1-2)<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Technically easier than orthodromic sensory. Useful for tarsal tunnel syndrome. May be small/absent in normals >age 40. Side-to-side comparison critical. Averaging often needed.</small>
                            </div>
                        </div>

                        <!-- Lateral Plantar Mixed -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/lateral_plantar_mixed_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/lateral_plantar_mixed_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Lateral Plantar Mixed</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Tibial nerve at medial ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Slightly proximal & posterior to medial malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Lateral sole (7cm into sole, then 7cm parallel to web 4-5)<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Technically easier than orthodromic sensory. Useful for tarsal tunnel syndrome. May be small/absent in normals >age 40. Side-to-side comparison critical. Averaging often needed.</small>
                            </div>
                        </div>

                        <!-- Soleus H Reflex -->
                         <div class="ncs-technique-card">
                            <div class="ncs-image-gallery" data-images='["images/ncs/soleus_h_reflex.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="images/ncs/soleus_h_reflex.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                             <h6 style="color: #10b981; font-weight: 700; margin-bottom: 10px;">Soleus H Reflex</h6>
                            <p style="color: #64748b; font-size: 0.9em; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Soleus muscle - posterior calf<br>
                                <strong style="color: #10b981;">G1:</strong> 1-2 fingerbreadths distal to where soleus meets gastrocnemius bellies | <strong style="color: #10b981;">G2:</strong> Achilles tendon<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Popliteal fossa (mid-posterior knee over popliteal pulse)<br>
                                <strong style="color: #10b981;">Distance:</strong> Variable (20-25 cm typically)
                            </p>
                             <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Pulse duration MUST be 1000μs (1ms) to activate Ia fibers. H reflex appears at low stim, grows then decreases. Triphasic, 25-34ms latency. Side-to-side difference >1.5ms abnormal. Delayed/absent in polyneuropathy, tibial/sciatic neuropathy, plexopathy, S1 radiculopathy.</small>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
            
        </div>
        `;
    }
};
