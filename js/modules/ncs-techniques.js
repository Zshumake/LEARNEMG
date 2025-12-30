// NCS Techniques Module
// Practical nerve conduction study techniques with video demonstrations

export function generateContent(module) {
    return `
        <script>
            // Gallery navigation function
            if (typeof window.navigateGallery === 'undefined') {
                window.navigateGallery = function(button, direction) {
                    const gallery = button.closest('.ncs-image-gallery');
                    if (!gallery) return;

                    const images = JSON.parse(gallery.getAttribute('data-images'));
                    const imgElement = gallery.querySelector('.ncs-gallery-image');
                    const counter = gallery.querySelector('.gallery-counter');
                    const leftBtn = gallery.querySelectorAll('button')[0];
                    const rightBtn = gallery.querySelectorAll('button')[1];

                    if (!imgElement || images.length <= 1) return;

                    // Get current index by extracting relative path from src
                    let currentSrc = decodeURIComponent(imgElement.src);

                    // Find the relative path by looking for 'NCS images/'
                    let relativeSrc = '';
                    let ncsIndex = currentSrc.indexOf('NCS images/');
                    if (ncsIndex !== -1) {
                        relativeSrc = currentSrc.substring(ncsIndex);
                    } else {
                        // Fallback: get everything after the last /
                        let parts = currentSrc.split('/');
                        if (parts.length >= 2) {
                            relativeSrc = parts.slice(-2).join('/');
                        }
                    }

                    let currentIndex = images.indexOf(relativeSrc);

                    // Debug logging (can be removed later)
                    console.log('Current src:', imgElement.src);
                    console.log('Decoded src:', currentSrc);
                    console.log('Relative src:', relativeSrc);
                    console.log('Images array:', images);
                    console.log('Current index:', currentIndex);

                    if (currentIndex === -1) currentIndex = 0;

                    // Calculate new index
                    let newIndex = currentIndex + direction;
                    if (newIndex < 0) newIndex = images.length - 1;
                    if (newIndex >= images.length) newIndex = 0;

                    // Update image
                    imgElement.src = images[newIndex];

                    // Update counter
                    if (counter) {
                        counter.textContent = (newIndex + 1) + ' / ' + images.length;
                    }

                    // Update button visibility
                    if (leftBtn) {
                        leftBtn.style.display = newIndex === 0 ? 'none' : 'block';
                    }
                    if (rightBtn) {
                        rightBtn.style.display = newIndex === images.length - 1 ? 'none' : 'block';
                    }
                };
            }

            // UE/LE toggle function
            if (typeof window.showNCSExtremity === 'undefined') {
                window.showNCSExtremity = function(extremity) {
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
                        if (ueSection) ueSection.style.display = 'none';
                        if (leSection) leSection.style.display = 'block';
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
                };
            }
        </script>
        <style>
            @keyframes gradient-flow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
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
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.8em; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">🎯 Master NCS Techniques</h3>
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
                    onmouseover="if(this.classList.contains('active')) this.style.transform='scale(1.05)'"
                    onmouseout="if(this.classList.contains('active')) this.style.transform='scale(1)'"
                    class="active"
                >
                    📹 Videos
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
                    onmouseover="if(!this.classList.contains('active')) this.style.borderColor='rgba(139, 92, 246, 0.5)'"
                    onmouseout="if(!this.classList.contains('active')) this.style.borderColor='rgba(139, 92, 246, 0.3)'"
                >
                    📸 Pictures
                </button>
            </div>

            <!-- Videos Section -->
            <div id="ncs-videos-section" style="display: block;">
                <!-- Upper Extremity Videos -->
                <div style="margin-bottom: 40px;">
                    <h4 style="
                        background: linear-gradient(135deg, #0d9488, #06b6d4);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        font-size: 1.8em;
                        margin-bottom: 25px;
                        font-weight: 700;
                    ">🖐️ Upper Extremity NCS</h4>

                    <!-- First Row: Median Sensory, Ulnar Sensory -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Median Sensory</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/86j7cNLIX0U"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Median Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Digit 3 to wrist<br>
                                <strong style="color: #0d9488;">Method:</strong> Orthodromic
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Ulnar Sensory</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/i9Naurf0eWU"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Ulnar Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Digit 5 to wrist<br>
                                <strong style="color: #0d9488;">Method:</strong> Orthodromic
                            </p>
                        </div>
                    </div>

                    <!-- Second Row: Median-Radial Comparison, Dorsal Ulnar Cutaneous -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Median-Radial Comparison</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nMaxrbpyR-0"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Radial Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Superficial radial<br>
                                <strong style="color: #0d9488;">Use:</strong> CTS comparison
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Dorsal Ulnar Cutaneous</h6>
                            <div style="position: relative; width: 100%; height: 220px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/U-60ft_8klI"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Dorsal Ulnar Cutaneous Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> DUC branch<br>
                                <strong style="color: #0d9488;">Use:</strong> Ulnar localization
                            </p>
                        </div>
                    </div>

                    <!-- Third Row: Median Motor, Ulnar Motor -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Median Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/cdVrcgeBgIg"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Median Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Thenar (APB)<br>
                                <strong style="color: #0d9488;">Stimulation:</strong> Wrist & elbow
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Ulnar Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/UmFYJDMucOY"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Ulnar Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Hypothenar (ADM)<br>
                                <strong style="color: #0d9488;">Stimulation:</strong> Wrist, below & above elbow
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Lower Extremity Videos -->
                <div style="margin-bottom: 40px;">
                    <h4 style="
                        background: linear-gradient(135deg, #0d9488, #06b6d4);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        font-size: 1.8em;
                        margin-bottom: 25px;
                        font-weight: 700;
                    ">🦵 Lower Extremity NCS</h4>

                    <!-- First Row: Superficial Fibular Sensory, Sural Sensory -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Superficial Fibular Sensory</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/M1sE2FT8YQg"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Superficial Fibular Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Ankle to lateral leg<br>
                                <strong style="color: #0d9488;">Use:</strong> Fibular neuropathy
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Sural Sensory</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/zP1yAU5DW2s"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Sural Sensory Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Calf to ankle<br>
                                <strong style="color: #0d9488;">Use:</strong> Polyneuropathy screening
                            </p>
                        </div>
                    </div>

                    <!-- Second Row: Common Fibular Motor, Tibial Motor -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Common Fibular Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/G1bsDinxuF8"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Common Fibular Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> EDB<br>
                                <strong style="color: #0d9488;">Stimulation:</strong> Ankle, fibular head, popliteal fossa
                            </p>
                        </div>

                        <div style="background: white; padding: 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.15); border: 2px solid rgba(20, 184, 166, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(20, 184, 166, 0.15)'">
                            <h6 style="color: #0d9488; margin-bottom: 12px; font-size: 1.1em; font-weight: 700;">📍 Tibial Motor</h6>
                            <div style="position: relative; width: 100%; height: 200px; background: #f3f4f6; border-radius: 12px; margin-bottom: 15px;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/pWeH6kCa9lo"
                                        frameborder="0" allowfullscreen
                                        style="border-radius: 12px;"
                                        title="Tibial Motor Nerve Conduction Study">
                                </iframe>
                            </div>
                            <p style="color: #64748b; font-size: 0.9em; margin: 0; line-height: 1.5;">
                                <strong style="color: #0d9488;">Recording:</strong> Abductor hallucis<br>
                                <strong style="color: #0d9488;">Stimulation:</strong> Ankle, popliteal fossa
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pictures Section (Initially Hidden) -->
            <div id="ncs-pictures-section" style="display: none;">
                <!-- UE/LE Toggle Buttons -->
                <div style="display: flex; gap: 20px; margin-bottom: 35px; max-width: 600px; margin-left: auto; margin-right: auto;">
                    <button
                        id="ncs-ue-btn"
                        onclick="showNCSExtremity('ue')"
                        style="
                            flex: 1;
                            padding: 20px 40px;
                            border: none;
                            border-radius: 50px;
                            background: linear-gradient(135deg, #8b5cf6, #6366f1);
                            color: white;
                            font-size: 1.3em;
                            font-weight: 700;
                            cursor: pointer;
                            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
                            transition: all 0.3s ease;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        "
                        onmouseover="if(this.classList.contains('active')) this.style.transform='scale(1.05)'"
                        onmouseout="if(this.classList.contains('active')) this.style.transform='scale(1)'"
                        class="active"
                    >
                        🖐️ Upper Extremity
                    </button>
                    <button
                        id="ncs-le-btn"
                        onclick="showNCSExtremity('le')"
                        style="
                            flex: 1;
                            padding: 20px 40px;
                            border: 2px solid rgba(16, 185, 129, 0.3);
                            border-radius: 50px;
                            background: white;
                            color: #64748b;
                            font-size: 1.3em;
                            font-weight: 700;
                            cursor: pointer;
                            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15);
                            transition: all 0.3s ease;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        "
                        onmouseover="if(!this.classList.contains('active')) this.style.borderColor='rgba(16, 185, 129, 0.5)'"
                        onmouseout="if(!this.classList.contains('active')) this.style.borderColor='rgba(16, 185, 129, 0.3)'"
                    >
                        🦵 Lower Extremity
                    </button>
                </div>

                <!-- Upper Extremity Pictures -->
                <div id="ncs-ue-pictures" style="display: block;">
                    <h4 style="
                        background: linear-gradient(135deg, #8b5cf6, #6366f1);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        font-size: 1.8em;
                        margin-bottom: 30px;
                        font-weight: 700;
                    ">📸 Upper Extremity NCS Technique Guide</h4>

                <!-- Motor Studies Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #8b5cf6; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">⚡ Motor Studies</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Median Motor -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/median_motor_at_wrist.png", "ncs_images/median_motor_at_elbow.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/median_motor_at_wrist.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Median Motor</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Abductor pollicis brevis (APB) - lateral thenar eminence<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> 1st MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Between FCR & palmaris longus tendons (8 cm)<br>
                                &nbsp;&nbsp;• <strong>Antecubital fossa:</strong> Over brachial artery pulse
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Excessive stim may co-activate ulnar nerve. Check for Martin-Gruber anastomosis if antecubital > wrist amplitude.</small>
                            </div>
                        </div>

                        <!-- Median Motor Palmar -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/median_motor_at_wrist.png", "ncs_images/median_motor_at_elbow.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/median_motor_at_wrist.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Median Motor Palmar</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> APB<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> 1st MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Between FCR & palmaris longus, 8 cm from recording<br>
                                &nbsp;&nbsp;• <strong>Palm:</strong> 7 cm distal to wrist, toward index/middle web space
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Palm/wrist ratio >1.2 implies conduction block across wrist. Recurrent thenar branch curves back from palm.</small>
                            </div>
                        </div>

                        <!-- Ulnar Motor -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/ulnar_motor_at_the_wrist.png", "ncs_images/ulnar_motor_ncs_below_the_elbow.png", "ncs_images/ulnar_motor_ncs_above_the_elbow.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/ulnar_motor_at_the_wrist.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 3</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Ulnar Motor</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Abductor digiti minimi (ADM) - medial hypothenar<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> 5th MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Medial wrist, adjacent to FCU tendon (8 cm)<br>
                                &nbsp;&nbsp;• <strong>Below elbow:</strong> 3 cm distal to medial epicondyle<br>
                                &nbsp;&nbsp;• <strong>Above elbow:</strong> Medial humerus, 10-12 cm from below-elbow<br>
                                &nbsp;&nbsp;• <strong>Axilla (optional):</strong> Proximal axilla, medial to biceps over axillary pulse
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Elbow flexed 90-135°. Must stimulate ≥3 cm distal to medial epicondyle. Check Martin-Gruber if below-elbow >10% smaller than wrist.</small>
                            </div>
                        </div>

                        <!-- Deep Ulnar Motor (FDI) -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/deep_ulnar_motor_branch.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/deep_ulnar_motor_branch.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Deep Ulnar Motor (FDI)</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> First dorsal interosseous (dorsal web thumb/index)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Muscle belly | <strong style="color: #8b5cf6;">G2:</strong> Thumb MCP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Wrist:</strong> Medial wrist, adjacent to FCU tendon (8-12 cm, use calipers)<br>
                                &nbsp;&nbsp;• <strong>Below elbow:</strong> 3 cm distal to medial epicondyle<br>
                                &nbsp;&nbsp;• <strong>Above elbow:</strong> Medial humerus, 10-12 cm from below-elbow
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Preferentially affected in Guyon's canal lesions. More sensitive for ulnar slowing across elbow than ADM. G2 MUST be on thumb MCP.</small>
                            </div>
                        </div>

                        <!-- Radial Motor -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/radial_motor_distal_stim.png", "ncs_images/radial_motor_stim_at_elbow.png", "ncs_images/radial_motor_stim_below_spiral_groove.png", "ncs_images/radial_motor_stim_above_spiral_groove.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/radial_motor_distal_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 4</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Radial Motor</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Extensor indicis proprius (EIP)<br>
                                <strong style="color: #8b5cf6;">Position:</strong> Hand pronated, G1 two fingerbreadths proximal to ulnar styloid | G2 over ulnar styloid<br>
                                <strong style="color: #8b5cf6;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Forearm:</strong> Over ulna, 4-6 cm proximal to recording (5-7 cm distance)<br>
                                &nbsp;&nbsp;• <strong>Elbow:</strong> Between biceps & brachioradialis muscles<br>
                                &nbsp;&nbsp;• <strong>Below spiral groove:</strong> Lateral midarm, between biceps & triceps<br>
                                &nbsp;&nbsp;• <strong>Above spiral groove:</strong> Posterior proximal arm over humerus
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Initial positive deflection is normal. Use obstetric calipers for proximal distances. Useful for spiral groove and posterior interosseous neuropathy.</small>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Sensory Studies Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #8b5cf6; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">🔍 Sensory Studies</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Median Sensory -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/median_sensory_ncs.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/median_sensory_ncs.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Median Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Index or middle finger (Digit 2 or 3)<br>
                                <strong style="color: #8b5cf6;">Ring electrodes:</strong> G1 at MCP joint, G2 3-4 cm distally at DIP joint<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Wrist (between FCR & palmaris longus)<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 14 cm (antidromic)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Volume-conducted motor potential may obscure sensory - have patient spread fingers. Digits 1 & 4 can also be used.</small>
                            </div>
                        </div>

                        <!-- Median Sensory Palmar -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/median_sensory_ncs.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/median_sensory_ncs.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Median Sensory Palmar</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Middle finger (G1 at PIP, G2 at DIP)<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Wrist (14 cm) + Palm (7 cm distal to wrist, toward middle finger)<br>
                                <strong style="color: #8b5cf6;">Distances:</strong> Wrist 14 cm, Palm 7 cm
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Palm/wrist ratio >1.6 = conduction block. Calculate wrist-palm CV for carpal tunnel assessment (segmental study). Rotate anode if artifact.</small>
                            </div>
                        </div>

                        <!-- Ulnar Sensory -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/ulnar_sensory_ncs.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/ulnar_sensory_ncs.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Ulnar Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/dorsal_ulnar_cutaneous_ncs.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/dorsal_ulnar_cutaneous_ncs.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Dorsal Ulnar Cutaneous</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/radial_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/radial_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Radial Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/medial_antebrachial_cutaneous.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/medial_antebrachial_cutaneous.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Medial Antebrachial Cutaneous</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/lateral_antebrachial_cutaneous.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/lateral_antebrachial_cutaneous.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Lateral Antebrachial Cutaneous</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div style="background: rgba(139, 92, 246, 0.05); border: 1px dashed rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 15px; margin-bottom: 15px; text-align: center;">
                                <span style="color: #8b5cf6; font-size: 0.9em;">📷 No Image Available</span>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 UE Proximal Stimulation</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                </div>

                <!-- Comparison Studies Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #8b5cf6; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">⚖️ Internal Comparison Studies</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Lumbrical-Interossei -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/ulnar_median_motor_comparsion_median_stim.png", "ncs_images/ulnar_median_motor_comparsion_ulnar_stim.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/ulnar_median_motor_comparsion_median_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚖️ Lumbrical-Interossei</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> SAME electrodes for both<br>
                                <strong style="color: #8b5cf6;">G1:</strong> Lateral to 3rd metacarpal midpoint | <strong style="color: #8b5cf6;">G2:</strong> D2 MCP joint<br>
                                <strong style="color: #8b5cf6;">Median stim:</strong> 2nd lumbrical | <strong style="color: #8b5cf6;">Ulnar stim:</strong> 1st palmar interosseous<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 10 cm (SAME for both)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Latency difference <0.5ms normal. Useful for CTS or Guyon's canal. Helpful when polyneuropathy present. Avoid co-stimulation. Interosseous amp > lumbrical amp.</small>
                            </div>
                        </div>

                        <!-- Median vs Ulnar Digit 4 -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/ulnar_to_median_sensory_comparison_median_stim.png", "ncs_images/ulnar_to_median_sensory_comparison_ulnar_stim.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/ulnar_to_median_sensory_comparison_median_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚖️ Median vs Ulnar - Digit 4</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #8b5cf6;">Recording:</strong> Ring finger (same electrodes)<br>
                                <strong style="color: #8b5cf6;">G1:</strong> MCP joint | <strong style="color: #8b5cf6;">G2:</strong> 3-4 cm distally at DIP<br>
                                <strong style="color: #8b5cf6;">Stimulation:</strong> Median at wrist vs Ulnar at wrist<br>
                                <strong style="color: #8b5cf6;">Distance:</strong> 10 cm (SAME for both)
                            </p>
                            <div style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Split innervation (lateral median, medial ulnar). Latency difference <0.5ms normal. Useful for CTS diagnosis. Avoid co-stimulation. Antidromic.</small>
                            </div>
                        </div>

                        <!-- Median vs Radial Digit 1 -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/radian_vs_median_sensory_comparison_median_stim.png", "ncs_images/radian_vs_median_sensory_comparison_radial_stim.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/radian_vs_median_sensory_comparison_median_stim.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚖️ Median vs Radial - Digit 1</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                </div>

                <!-- Mixed Nerve Studies Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #8b5cf6; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">🔄 Palmar Mixed Nerve Studies</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Median Palmar Mixed -->
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/median_vs_ulnar_palmar_mixed_median_record.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/median_vs_ulnar_palmar_mixed_median_record.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔄 Median Palmar Mixed</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(139, 92, 246, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/median_vs_ulnar_palmar_mixed_ulnar_record.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/median_vs_ulnar_palmar_mixed_ulnar_record.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #8b5cf6; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔄 Ulnar Palmar Mixed</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                </div>
                <!-- End Upper Extremity Pictures -->

                <!-- Lower Extremity Pictures -->
                <div id="ncs-le-pictures" style="display: none;">
                    <h4 style="
                        background: linear-gradient(135deg, #10b981, #14b8a6);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        font-size: 1.8em;
                        margin-bottom: 30px;
                        font-weight: 700;
                    ">🦵 Lower Extremity NCS Technique Guide</h4>

                <!-- Motor Studies Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #10b981; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">⚡ Motor Studies</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Tibial Motor (AHB) -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/tibial_motor_at_the_ankle.png", "ncs_images/tibial_motor_at_the_popliteal_fossa.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/tibial_motor_at_the_ankle.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Tibial Motor (AHB)</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/fibular_peroneal_motor_at_the_ankle.png", "ncs_images/fibular_peronal_motor_at_the_fibular_head.png", "ncs_images/fibular_peronal_motor_at_the_popliteal_fossa.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/fibular_peroneal_motor_at_the_ankle.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 3</div>
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Peroneal Motor (EDB)</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Extensor digitorum brevis (EDB) - dorsal lateral foot<br>
                                <strong style="color: #10b981;">G1:</strong> Muscle belly | <strong style="color: #10b981;">G2:</strong> MTP joint of little toe<br>
                                <strong style="color: #10b981;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Ankle:</strong> Anterior ankle, lateral to tibialis anterior tendon (9 cm)<br>
                                &nbsp;&nbsp;• <strong>Below fibular head:</strong> Lateral calf, 1-2 fingerbreadths below fibular head<br>
                                &nbsp;&nbsp;• <strong>Lateral popliteal fossa:</strong> Adjacent to external hamstring, 10-12 cm from below-fibular
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> ALWAYS stim all 3 sites to detect fibular neck slowing. Higher current needed below fibular head (deep nerve). If below-fibular > ankle, consider accessory peroneal.</small>
                            </div>
                        </div>

                        <!-- Peroneal Motor (TA) -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/fibular_motor_over_tibialis_anterior_at_the_fibular_head.png", "ncs_images/fibular_motor_over_tibialis_anterior_at_the_popliteal_fossa.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/fibular_motor_over_tibialis_anterior_at_the_fibular_head.png" style="width: 100%; border-radius: 8px; display: block;">
                                <button onclick="navigateGallery(this, -1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; display: none;">‹</button>
                                <button onclick="navigateGallery(this, 1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(16, 185, 129, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer;">›</button>
                                <div class="gallery-counter" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85em;">1 / 2</div>
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Peroneal Motor (TA)</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Tibialis anterior (TA) - mid-anterior lateral calf<br>
                                <strong style="color: #10b981;">G1:</strong> Muscle belly | <strong style="color: #10b981;">G2:</strong> Anterior ankle<br>
                                <strong style="color: #10b981;">Stimulation Sites:</strong><br>
                                &nbsp;&nbsp;• <strong>Below fibular head:</strong> Lateral calf, 1-2 fingerbreadths below head (5-10 cm)<br>
                                &nbsp;&nbsp;• <strong>Lateral popliteal fossa:</strong> Adjacent to external hamstring, 10-12 cm from below-fibular
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Especially valuable for peroneal neuropathy at fibular neck. Easier to demonstrate conduction block/focal slowing than with EDB recording. Higher stim current needed below fibular head.</small>
                            </div>
                        </div>

                        <!-- Femoral Motor -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/femoral_motor_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/femoral_motor_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Femoral Motor</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Rectus femoris<br>
                                <strong style="color: #10b981;">G1:</strong> Anterior thigh, halfway between inguinal crease & knee | <strong style="color: #10b981;">G2:</strong> Bony prominence at knee<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Inguinal area, slightly lateral to femoral pulse, below inguinal ligament<br>
                                <strong style="color: #10b981;">Distance:</strong> Variable
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Firm pressure needed. Difficult in obese patients (high currents >50mA). Limited use: side-to-side comparison for femoral neuropathy, lumbar plexopathy, severe L4 radiculopathy. Normal amplitude >3mV.</small>
                            </div>
                        </div>

                        <!-- Medial Plantar Motor -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/medial_plantar_motor_study_at_medial_malleolus.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/medial_plantar_motor_study_at_medial_malleolus.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Medial Plantar Motor</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Abductor hallucis brevis (AHB)<br>
                                <strong style="color: #10b981;">G1:</strong> 1 cm proximal & 1 cm inferior to navicular prominence | <strong style="color: #10b981;">G2:</strong> MTP joint of great toe<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial ankle, slightly proximal & posterior to medial malleolus<br>
                                <strong style="color: #10b981;">Distance:</strong> 9 cm
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Useful for tarsal tunnel syndrome evaluation. Side-to-side comparison required. Initial positive deflection common (adjust G1). AHB innervated by medial plantar nerve.</small>
                            </div>
                        </div>

                        <!-- Lateral Plantar Motor -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/lateral_plantar_motor.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/lateral_plantar_motor.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⚡ Lateral Plantar Motor</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Abductor digiti quinti pedis (ADQP) - lateral foot<br>
                                <strong style="color: #10b981;">G1:</strong> Halfway between lateral sole & lower margin of lateral malleolus | <strong style="color: #10b981;">G2:</strong> MTP joint of little toe<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial ankle, slightly proximal & posterior to medial malleolus<br>
                                <strong style="color: #10b981;">Distance:</strong> Variable (use obstetric calipers)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Useful for tarsal tunnel syndrome. ADQP innervated by lateral plantar nerve. Side-to-side comparison required. Initial positive deflection common.</small>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Sensory Studies Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #10b981; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">🔍 Sensory Studies</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Superficial Peroneal Sensory -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/superficial_fibular_peroneal_sensory_stud.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/superficial_fibular_peroneal_sensory_stud.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Superficial Peroneal Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/sural_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/sural_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Sural Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/saphenous_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/saphenous_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Saphenous Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Medial/anterior ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Between medial malleolus & tibialis anterior tendon | <strong style="color: #10b981;">G2:</strong> 3-4 cm distally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial calf (groove between tibia & medial gastrocnemius)<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm standard (10-12 cm often easier)
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Often small/absent >age 40 - side-to-side comparison critical. Shorter distance (10-12cm) easier with low stim (5-25mA). Abnormal in femoral nerve or lumbar plexus lesions.</small>
                            </div>
                        </div>

                        <!-- Lateral Femoral Cutaneous Sensory -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/lateral_femoral_cutaneous_sensory_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/lateral_femoral_cutaneous_sensory_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Lateral Femoral Cutaneous</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/medial_plantar_sensory.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/medial_plantar_sensory.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Medial Plantar Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/lateral_plantar_sensory.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/lateral_plantar_sensory.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔍 Lateral Plantar Sensory</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                </div>

                <!-- Mixed Studies Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #10b981; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">🔄 Mixed Studies</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Medial Plantar Mixed -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/medial_plantar_mixed_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/medial_plantar_mixed_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔄 Medial Plantar Mixed</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Tibial nerve at medial ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Slightly proximal & posterior to medial malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Medial sole (7cm into sole, then 7cm parallel to web 1-2)<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Technically easier than orthodromic sensory. Useful for tarsal tunnel syndrome. May be small/absent in normals >age 40. Side-to-side comparison critical. Averaging often needed.</small>
                            </div>
                        </div>

                        <!-- Lateral Plantar Mixed -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/lateral_plantar_mixed_study.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/lateral_plantar_mixed_study.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">🔄 Lateral Plantar Mixed</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
                                <strong style="color: #10b981;">Recording:</strong> Tibial nerve at medial ankle<br>
                                <strong style="color: #10b981;">G1:</strong> Slightly proximal & posterior to medial malleolus | <strong style="color: #10b981;">G2:</strong> 3-4 cm proximally<br>
                                <strong style="color: #10b981;">Stimulation:</strong> Lateral sole (7cm into sole, then 7cm parallel to web 4-5)<br>
                                <strong style="color: #10b981;">Distance:</strong> 14 cm
                            </p>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                                <small style="color: #6b7280;"><strong>Key Point:</strong> Technically easier than orthodromic sensory. Useful for tarsal tunnel syndrome. May be small/absent in normals >age 40. Side-to-side comparison critical. Averaging often needed.</small>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Late Responses Section -->
                <div style="margin-bottom: 40px;">
                    <h5 style="color: #10b981; font-size: 1.4em; margin-bottom: 20px; font-weight: 700;">⏱️ Late Responses</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">

                        <!-- Soleus H Reflex -->
                        <div style="background: white; border: 2px solid rgba(16, 185, 129, 0.2); border-radius: 15px; padding: 20px; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(16, 185, 129, 0.25)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <div class="ncs-image-gallery" data-images='["ncs_images/soleus_h_reflex.png"]' style="position: relative; margin-bottom: 15px;">
                                <img class="ncs-gallery-image" src="ncs_images/soleus_h_reflex.png" style="width: 100%; border-radius: 8px; display: block;">
                            </div>
                            <h6 style="color: #10b981; font-size: 1.1em; font-weight: 700; margin-bottom: 10px;">⏱️ Soleus H Reflex</h6>
                            <p style="color: #64748b; margin: 8px 0; line-height: 1.6;">
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
                <!-- End Lower Extremity Pictures -->

            </div>
            <!-- End Pictures Section -->
            <!-- NCS Techniques Quiz -->
            ${generateModuleQuiz([
        {
            question: "Where is the active recording electrode (G1) placed for a Median Motor study?",
            options: [
                "Over the Abductor Digiti Minimi (ADM)",
                "Over the Abductor Pollicis Brevis (APB) muscle belly",
                "Over the First Dorsal Interosseous (FDI)",
                "Over the Flexor Carpi Radialis (FCR)"
            ],
            correct: 1,
            explanation: "For the MEDIAN MOTOR study, the active recording electrode (G1) is placed over the belly of the ABDUCTOR POLLICIS BREVIS (APB) muscle in the thenar eminence. The reference electrode (G2) is placed distally on the 1st MCP joint. Correct placement is crucial for obtaining maximal amplitude and accurate latency."
        },
        {
            question: "What is the standard distance between the stimulation site at the wrist and the recording electrode (G1) for a Median Motor study?",
            options: [
                "6 cm",
                "8 cm",
                "10 cm",
                "14 cm"
            ],
            correct: 1,
            explanation: "The standard distance for the MEDIAN MOTOR study from the cathode of the stimulator at the wrist to the active recording electrode (G1) on the APB is 8 CM. Standardizing this distance is essential for comparing distal latencies to normal values (typically <4.4 ms)."
        },
        {
            question: "When performing an Ulnar Motor study, why is it important to stimulate at least 3-4 cm distal to the medial epicondyle for the 'below elbow' site?",
            options: [
                "To avoid stimulating the median nerve",
                "To ensure the nerve is superficial enough",
                "To minimize volume conduction errors and ensure the ulnar nerve is stimulated where it is not covered by muscle",
                "To avoid the ulnar groove where the nerve is deep"
            ],
            correct: 2,
            explanation: "Stimulating at least 3-4 CM DISTAL to the medial epicondyle is critical to avoid errors. At the elbow, the ulnar nerve dives deep into the flexor carpi ulnaris. Stimulating too proximally in the groove can lead to submaximal stimulation or measurement errors. The 'below elbow' site should be clearly distal to the groove."
        },
        {
            question: "For a Sural Sensory study, where is the recording electrode typically placed?",
            options: [
                "Posterior to the lateral malleolus",
                "Anterior to the medial malleolus",
                "Over the dorsum of the foot",
                "Posterior to the medial malleolus"
            ],
            correct: 0,
            explanation: "For the SURAL SENSORY study, the active recording electrode (G1) is placed POSTERIOR TO THE LATERAL MALLEOLUS. The nerve runs superficially here. Stimulation is applied to the posterior-lateral calf, typically 14 cm proximal to the recording site."
        },
        {
            question: "What is the primary utility of the Dorsal Ulnar Cutaneous (DUC) sensory study?",
            options: [
                "Diagnosing Carpal Tunnel Syndrome",
                "Differentiating ulnar neuropathy at the wrist (Guyon's canal) from ulnar neuropathy at the elbow",
                "Assessing C8 radiculopathy",
                "Diagnosing brachial plexopathy"
            ],
            correct: 1,
            explanation: "The DUC study is crucial for differentiating ULNAR NEUROPATHY AT THE WRIST vs. ELBOW. The DUC branch branches off the ulnar nerve PROXIMAL to the wrist (5-8 cm). Therefore, it is SPARED in wrist (Guyon's canal) lesions but AFFECTED in elbow lesions. If the ulnar sensory (digit 5) is abnormal but DUC is normal, the lesion is likely at the wrist."
        },
        {
            question: "In a Radial Motor study recording from the Extensor Indicis Proprius (EIP), where is the 'below spiral groove' stimulation site?",
            options: [
                "Antecubital fossa",
                "Lateral mid-arm between biceps and triceps",
                "Posterior proximal arm",
                "Forearm over the ulna"
            ],
            correct: 1,
            explanation: "The 'BELOW SPIRAL GROOVE' stimulation site for the Radial Motor study is in the LATERAL MID-ARM, in the groove between the biceps and triceps muscles. This site is distal to where the nerve wraps around the humerus in the spiral groove. Comparison with the 'above spiral groove' site helps localize radial nerve entrapment (Saturday Night Palsy)."
        },
        {
            question: "What is the significance of the 'Martin-Gruber Anastomosis' in NCS interpretation?",
            options: [
                "It causes a conduction block pattern",
                "It results in a larger CMAP amplitude at the elbow compared to the wrist in median motor studies",
                "It causes absent sensory responses",
                "It is a sign of severe neuropathy"
            ],
            correct: 1,
            explanation: "MARTIN-GRUBER ANASTOMOSIS is a common anatomical variant (15-20% of population) where motor fibers cross from the MEDIAN to ULNAR nerve in the forearm. In Median Motor studies, this results in a LARGER CMAP AMPLITUDE AT THE ELBOW (where all fibers are stimulated) than at the wrist (where crossing fibers have left). Recognizing this prevents misdiagnosis of conduction block."
        },
        {
            question: "For the H-reflex study, what is the optimal stimulus duration?",
            options: [
                "0.1 ms",
                "0.2 ms",
                "0.5 ms",
                "1.0 ms (1000 μs)"
            ],
            correct: 3,
            explanation: "The optimal stimulus duration for H-REFLEX studies is LONG, typically 1.0 MS (1000 μs). This long duration preferentially activates the large Ia sensory afferent fibers that mediate the reflex arc, allowing the H-reflex to be elicited at lower stimulus intensities, often before the direct motor (M) response is seen."
        },
        {
            question: "Which sensory study is most useful for diagnosing Meralgia Paresthetica?",
            options: [
                "Sural sensory",
                "Saphenous sensory",
                "Lateral Femoral Cutaneous sensory",
                "Superficial Peroneal sensory"
            ],
            correct: 2,
            explanation: "The LATERAL FEMORAL CUTANEOUS sensory study is the diagnostic test for MERALGIA PARESTHETICA, which is an entrapment of this nerve at the inguinal ligament. The study records from the lateral thigh with stimulation at the inguinal ligament. Side-to-side comparison is essential due to anatomical variability."
        },
        {
            question: "When performing a Fibular (Peroneal) Motor study recording from the Tibialis Anterior (TA), why is it valuable?",
            options: [
                "It is easier than recording from EDB",
                "It is more sensitive for detecting conduction block/slowing at the fibular head than EDB recording",
                "It assesses the deep peroneal nerve only",
                "It requires less stimulation intensity"
            ],
            correct: 1,
            explanation: "Recording from the TIBIALIS ANTERIOR (TA) is often MORE SENSITIVE for detecting conduction block or focal slowing at the FIBULAR HEAD than recording from the EDB. In some cases of fibular neuropathy, the fibers to the EDB may be spared or less affected, while fibers to the TA are blocked. It also helps when the EDB is atrophied (e.g., L5 radiculopathy or polyneuropathy)."
        }
    ])}
        </div>
    `;
}


