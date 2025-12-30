
export class BoardRenderer {
    constructor(core) {
        this.core = core;
    }


    render(containerId, modules, pgyLevel, completedModules) {
        const boardContainer = document.getElementById(containerId);
        if (!boardContainer) return;

        // Separate modules into Hero (0) and Grid (1..rest)
        const heroModule = modules[0];
        const gridModules = modules.slice(1);

        const heroHTML = this.generateHeroModule(heroModule, 1);
        const gridHTML = gridModules.map((mod, i) => this.generateGridModule(mod, i + 2)).join(''); // i+2 because 1 is hero

        // Podcast Section
        const podcastHTML = this.generatePodcastSection();


        const layoutHTML = `



            <div class="atrium-pathway-container" style="position: relative; padding: 40px 60px; background: linear-gradient(to bottom, #f8fafc, #f1f5f9); min-height: 100vh;">
                <!-- Podcast Header Section (Banner Style) -->
                <div class="pathway-header" style="
                    position: relative;
                    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(107, 159, 120, 0.15);
                    margin-bottom: 50px;
                    text-align: center;
                    border: 1px solid #bbf7d0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;">
                    
                    <!-- Title Section -->
                     <div style="margin-bottom: 20px;">
                        <h1 class="pathway-title" style="margin: 0; font-size: 3.5em;">
                            EMG/NCS Learning Pathway
                        </h1>
                    </div>
                    
                    <p class="pathway-subtitle" style="font-size: 1.3em; color: #475569; max-width: 800px; margin: 0 auto 30px;">
                        Comprehensive Electrodiagnostic Medicine Training
                    </p>
                    
                    <!-- Podcast Toggle Button Section (Includes Learning Obj) -->
                    ${podcastHTML}
                </div>

                <!-- Hero Module (Module 1) -->
                ${heroHTML}

                <!-- Main Modules Container -->
                <div class="modules-container">
                    <!-- Grid of Modules 2-13 (perfect 4x3 grid) -->
                    <div class="modules-grid">
                        ${gridHTML}
                    </div>
                </div>
                
                <!-- Footer Spacing -->
                <div style="height: 60px;"></div>
            </div>
        `;

        boardContainer.innerHTML = layoutHTML;

        // Append ERNEST directly to body (manage singleton)
        this.manageErnestDialogue();

        // Initialize Global Handlers for Podcasts
        this.initializeGlobalHandlers();

        // Add loaded class for animation
        setTimeout(() => {
            boardContainer.classList.add('pathway-loaded');
        }, 50);
    }

    initializeGlobalHandlers() {
        window.togglePodcastsCollapsible = () => {
            const container = document.getElementById('podcasts-collapsible-container');
            const icon = document.getElementById('podcast-toggle-icon');

            if (container.style.display === 'none' || container.style.display === '') {
                container.style.display = 'block';
                icon.textContent = '▲';
                icon.style.transform = 'rotate(180deg)';
            } else {
                container.style.display = 'none';
                icon.textContent = '▼';
                icon.style.transform = 'rotate(0deg)';
            }
        };

        // Ensure playExtraPodcast is safe (if not already defined by podcast-player.js)
        if (!window.playExtraPodcast) {
            window.playExtraPodcast = (id) => console.log('Playing extra podcast:', id);
        }

        // Ensure openModulePodcast is safe
        if (!window.openModulePodcast) {
            window.openModulePodcast = (modId, epId) => {
                if (window.playModulePodcast) {
                    window.playModulePodcast(modId, epId);
                } else {
                    console.log('Playing module podcast:', modId, epId);
                }
            };
        }

        // Ensure showLearningObjectives is safe
        if (!window.showLearningObjectives) {
            window.showLearningObjectives = () => console.log('Show Learning Objectives clicked');
        }
    }


    generatePodcastSection() {
        return `
            <!-- Learning Objectives Button -->
            <button class="learning-objectives-btn" onclick="showLearningObjectives()" style="
                margin-bottom: 20px;
                width: 100%;
                max-width: 450px;
                display: block;
                padding: 12px 20px;
                font-size: 1.1em;">
                See Learning Objectives
            </button>

            <!-- Collapsible Podcasts Button -->
            <button class="collapsible-podcasts-btn" onclick="togglePodcastsCollapsible()" style="
                background: linear-gradient(135deg, #f59e0b, #ea580c);
                color: white;
                border: none;
                border-radius: 12px;
                padding: 15px 25px;
                margin: 0 auto 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
                font-size: 1.1em;
                font-weight: 600;
                max-width: 450px;">
                <img src="ERNEST.png" alt="Ernest" style="width: 60px; height: 60px; border-radius: 50%; border: 3px solid white; object-fit: cover;">
                <span style="flex: 1;">Come Listen to My Podcasts!</span>
                <span id="podcast-toggle-icon" style="transition: transform 0.3s ease; font-size: 1.2em;">▼</span>
            </button>

            <!-- Collapsible Podcasts Container -->
            <div id="podcasts-collapsible-container" class="podcasts-collapsible" style="
                display: none;
                max-width: 1200px;
                margin: 0 auto 40px;
                background: white;
                border-radius: 12px;
                padding: 25px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); text-align: left;">

                <h3 style="color: #1e40af; margin: 0 0 20px 0; font-size: 1.3em; text-align: center;">🎙️ All Podcast Episodes (14 Total)</h3>

                <!-- Module Podcasts Section -->
                <div style="margin-bottom: 40px;">
                    <h4 style="color: #3b82f6; margin: 0 0 12px 0; font-size: 1em; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">📚 Module Podcasts</h4>

                    <!-- 3-Column Grid -->
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                        <!-- Essential Terminology -->
                         <div onclick="window.openModulePodcast('emg-introduction', 'emg-terminology')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Essential Terminology</div>
                                <div style="font-size: 0.7em; color: #64748b;">14:46</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                        <!-- Peripheral Anatomy -->
                        <div onclick="window.openModulePodcast('plexus-anatomy', 'plexus-peripheral')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Peripheral Anatomy</div>
                                <div style="font-size: 0.7em; color: #64748b;">39:07</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                         <!-- Plexopathies -->
                        <div onclick="window.openModulePodcast('brachial-plexus', 'brachial-ep1')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Plexopathies</div>
                                <div style="font-size: 0.7em; color: #64748b;">13:28</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                        <!-- Radiculopathy -->
                         <div onclick="window.openModulePodcast('radiculopathy', 'radiculopathy-ep1')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Radiculopathy</div>
                                <div style="font-size: 0.7em; color: #64748b;">15:48</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                        <!-- Polyneuropathies -->
                        <div onclick="window.openModulePodcast('neuropathy-pathophysiology', 'neuropathy-poly')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Polyneuropathies</div>
                                <div style="font-size: 0.7em; color: #64748b;">16:41</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                        <!-- Mononeuropathy -->
                         <div onclick="window.openModulePodcast('neuropathy-pathophysiology', 'neuropathy-mono')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Mononeuropathy</div>
                                <div style="font-size: 0.7em; color: #64748b;">33:22</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                         <!-- Pattern Recognition -->
                        <div onclick="window.openModulePodcast('basic-patterns', 'patterns-ep1')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Pattern Recognition</div>
                                <div style="font-size: 0.7em; color: #64748b;">14:59</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                        <!-- Neuropathy vs Myopathy -->
                        <div onclick="window.openModulePodcast('neuropathy-myopathy', 'neuro-myo-ep1')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Neuropathy vs Myopathy</div>
                                <div style="font-size: 0.7em; color: #64748b;">17:09</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>

                        <!-- Report Writing -->
                        <div onclick="window.openModulePodcast('simple-reports', 'reports-ep1')" style="
                            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px;
                            cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                            onmouseover="this.style.background='#eff6ff'; this.style.borderColor='#3b82f6'"
                            onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0'">
                            <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 0.8em; font-weight: 600; color: #1e40af; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Report Writing</div>
                                <div style="font-size: 0.7em; color: #64748b;">11:56</div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                                <path d="M3 2L13 8L3 14V2Z" fill="#f59e0b"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <!-- Advanced Topics Section -->
                <div>
                    <h3 style="color: #a855f7; font-size: 1.5em; margin-bottom: 25px; text-align: center; font-weight: 700;">
                        ⭐ Advanced Topics
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                        <!-- ALS and Mimics -->
                        <div onclick="window.playExtraPodcast('extra-als')"
                             style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(168, 85, 247, 0.2)'; this.style.borderColor='#a855f7'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <img src="ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #a855f7;" alt="Ernest">
                                <div>
                                    <h4 style="color: #7e22ce; margin: 0; font-size: 1.1em; font-weight: 600;">ALS and Mimics</h4>
                                    <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Extra Topics • 26 min</p>
                                </div>
                            </div>
                            <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                Motor neuron disease diagnosis and differentiating ALS from treatable mimics
                            </p>
                        </div>

                        <!-- Blink Reflex -->
                        <div onclick="window.playExtraPodcast('extra-blink')"
                             style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(168, 85, 247, 0.2)'; this.style.borderColor='#a855f7'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <img src="ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #a855f7;" alt="Ernest">
                                <div>
                                    <h4 style="color: #7e22ce; margin: 0; font-size: 1.1em; font-weight: 600;">Blink Reflex</h4>
                                    <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Extra Topics • 26 min</p>
                                </div>
                            </div>
                            <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                Specialized NCS technique for evaluating trigeminal and facial nerve pathways
                            </p>
                        </div>

                        <!-- MG vs Lambert-Eaton -->
                        <div onclick="window.playExtraPodcast('extra-mg-lems')"
                             style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(168, 85, 247, 0.2)'; this.style.borderColor='#a855f7'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <img src="ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #a855f7;" alt="Ernest">
                                <div>
                                    <h4 style="color: #7e22ce; margin: 0; font-size: 1.1em; font-weight: 600;">MG vs. Lambert-Eaton</h4>
                                    <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Extra Topics • 29 min</p>
                                </div>
                            </div>
                            <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                Compare and contrast these neuromuscular junction disorders
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateHeroModule(module, index) {
        // Fallback description if not found in data
        const desc = (module.description) ? module.description : "Start your journey here.";

        return `
            <div class="hero-module"
                 onmouseover="window.appComponents.candyland.showModuleDescription(${index})"
                 onmouseout="window.appComponents.candyland.hideModuleDescription()"
                 onclick="window.appComponents.candyland.handleModuleClick('${module.id}', ${index - 1})">
                <div class="hero-content">
                    <img src="${module.customIcon}" alt="${module.title}" class="hero-icon">
                    <div class="hero-text">
                        <div class="hero-badge">🚀 START HERE - Module ${index}</div>
                        <h2 class="hero-title">${module.title}</h2>
                        <p class="hero-description">${desc}</p>
                    </div>
                </div>
            </div>
        `;
    }

    generateGridModule(module, index) {
        // Note: onclick index is 0-based index in the FULL modules array?
        // handleModuleClick expects ID and Index. legacy used openAtriumModule(moduleNumber, id).
        // I will align handleModuleClick to take ID.
        return `
            <div class="module-card"
                 onmouseover="window.appComponents.candyland.showModuleDescription(${index})"
                 onmouseout="window.appComponents.candyland.hideModuleDescription()"
                 onclick="window.appComponents.candyland.handleModuleClick('${module.id}', ${index - 1})">
                <img src="${module.customIcon}"
                     alt="${module.title}"
                     class="module-icon"
                     style="width: 115px; height: 115px;">
            </div>
        `;
    }

    generateExtraTopics() {
        const topics = [
            { id: 'extra-als', title: 'ALS and Mimics', time: '13:54' },
            { id: 'extra-blink', title: 'Blink Reflex', time: '14:14' },
            { id: 'extra-nmj', title: 'NMJ Disorders', time: '16:00' }
        ];

        return topics.map(topic => `
            <div onclick="if(window.playExtraPodcast) window.playExtraPodcast('${topic.id}')" style="
                background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 6px; padding: 8px;
                cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;"
                onmouseover="this.style.background='#f3e8ff'; this.style.borderColor='#a855f7'"
                onmouseout="this.style.background='#faf5ff'; this.style.borderColor='#e9d5ff'">
                <img src="ERNEST.png" style="width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover;" alt="Ernest">
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 0.8em; font-weight: 600; color: #7e22ce; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${topic.title}</div>
                    <div style="font-size: 0.7em; color: #64748b;">${topic.time}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                    <path d="M3 2L13 8L3 14V2Z" fill="#a855f7"/>
                </svg>
            </div>
        `).join('');
    }

    manageErnestDialogue() {
        const existing = document.getElementById('ernest-dialogue');
        if (existing) existing.remove();

        const html = `
            <div id="ernest-dialogue" class="ernest-dialogue-box">
                <div class="ernest-dialogue-content">
                    <img src="ERNEST.png" alt="ERNEST" class="ernest-avatar">
                    <div class="ernest-text">
                        <p class="ernest-name">ERNEST - Your EMG Guide</p>
                        <p id="ernest-message" class="ernest-message">Hover over any module to learn more about it!</p>
                        <p id="ernest-highlights" class="ernest-highlights"></p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    updateErnestDescription(title, text, highlights) {
        const msgEl = document.getElementById('ernest-message');
        const highEl = document.getElementById('ernest-highlights');
        if (msgEl) msgEl.textContent = text;
        if (highEl) highEl.textContent = highlights || "";
    }

    resetErnestDescription() {
        const msgEl = document.getElementById('ernest-message');
        const highEl = document.getElementById('ernest-highlights');
        if (msgEl) msgEl.textContent = "Hover over any module to learn more about it!";
        if (highEl) highEl.textContent = "";
    }
}
