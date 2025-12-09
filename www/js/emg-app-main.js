        // Global variable to track current PGY level
        let currentPGYLevel = 'all';
        
        // Enhanced Smooth Modal System
        function showModal(title, content) {
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

            // Show overlay first (invisible)
            overlay.style.display = 'flex';

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Force reflow then animate in
            overlay.offsetHeight;

            // Add show class for smooth animation
            setTimeout(() => {
                overlay.classList.add('show');
            }, 10);

            // Add keyboard support
            document.addEventListener('keydown', handleModalKeydown);

            console.log(`✨ Smooth modal opened: ${title}`);
        }
        
        function closeModal() {
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                // Smooth close animation
                overlay.classList.remove('show');

                // Hide after animation completes
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 400);

                document.removeEventListener('keydown', handleModalKeydown);
                console.log('🔒 Smooth modal closed');
            }
        }
        
        function handleModalKeydown(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        }
        
        // Click outside to close
        document.addEventListener('click', function(event) {
            const overlay = document.getElementById('modal-overlay');
            if (event.target === overlay) {
                closeModal();
            }
        });
        
        // PGY Level Selection Function
        function selectPGY(pgyLevel) {
            // Update global variable
            currentPGYLevel = pgyLevel;
            
            // Ensure main interface is visible (in case we're returning from a focused tab)
            const mainInterface = document.getElementById('main-interface-container');
            if (mainInterface) {
                mainInterface.style.display = 'block';
            }
            
            // Hide all tab content sections (they shouldn't be visible on pathway pages)
            const tabSections = document.querySelectorAll('.tab-content');
            tabSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Update button styles
            const pgyButtons = document.querySelectorAll('.sidebar-button');
            pgyButtons.forEach(button => {
                button.classList.remove('active');
                if (button.dataset.pgy === pgyLevel) {
                    button.classList.add('active');
                }
            });
            
            // Show/hide appropriate PGY dashboard
            const dashboards = document.querySelectorAll('.pgy-dashboard');
            dashboards.forEach(dashboard => {
                dashboard.style.display = 'none';
            });
            
            // Show the selected dashboard (handle 'all' level properly)
            const targetDashboard = pgyLevel === 'all' ? 'all-levels-dashboard' : `${pgyLevel}-dashboard`;
            const selectedDashboard = document.getElementById(targetDashboard);
            if (selectedDashboard) {
                selectedDashboard.style.display = 'block';
            }
            
            // Update competency info display
            updateCompetencyInfo(pgyLevel);
            
            // Filter content based on competency levels
            filterContentByPGY(pgyLevel);
            
            // Save selection to localStorage
            localStorage.setItem('selectedPGY', pgyLevel);
            
            // Refresh case grid to show appropriate cases (disabled - case grid removed)
            // if (typeof populateCaseGrid === 'function') {
            //     populateCaseGrid();
            // }
            
            // Show/hide progress dashboard based on PGY selection
            toggleProgressDashboard(pgyLevel !== 'all');
            
            // Update progress dashboard if visible
            if (pgyLevel !== 'all') {
                updateProgressDashboard();
            }
            
            console.log(`Selected PGY level: ${pgyLevel}`);
        }
        
        // Update the competency info display
        function updateCompetencyInfo(pgyLevel) {
            const competencyInfo = document.getElementById('sidebar-info');
            const competencyData = {
                'pgy2': {
                    title: '📚 PGY-2 Foundation',
                    description: 'Levels 1-2: Basic understanding and supervised performance'
                },
                'pgy3': {
                    title: '🎯 PGY-3 Independent',
                    description: 'Levels 1-3: Independent evaluation and interpretation'
                },
                'pgy4': {
                    title: '⭐ PGY-4 Advanced', 
                    description: 'Levels 1-4: Complete independent practice'
                },
                'all': {
                    title: '📋 All Content',
                    description: 'Complete competency levels 1-5'
                }
            };
            
            const info = competencyData[pgyLevel];
            competencyInfo.innerHTML = `
                <div class="info-card">
                    <div class="info-title">${info.title}</div>
                    <div class="info-text">${info.description}</div>
                </div>
            `;
        }
        
        // Filter content based on PGY level (placeholder - will be implemented as we tag content)
        function filterContentByPGY(pgyLevel) {
            const maxCompetencyLevel = {
                'pgy2': 2,
                'pgy3': 3,
                'pgy4': 4,
                'all': 5
            };
            
            const maxLevel = maxCompetencyLevel[pgyLevel];
            
            // Find all content with competency-level data attributes
            const competencyElements = document.querySelectorAll('[data-competency-level]');
            competencyElements.forEach(element => {
                const elementLevel = parseInt(element.dataset.competencyLevel);
                const shouldShow = elementLevel <= maxLevel;
                
                // Show/hide based on competency level
                element.style.display = shouldShow ? '' : 'none';
                
                // Add visual indicators for content filtering
                if (shouldShow && pgyLevel !== 'all') {
                    element.classList.add('filtered-content');
                } else {
                    element.classList.remove('filtered-content');
                }
            });
            
            // Special handling for senior resident content
            const seniorContent = document.querySelectorAll('.senior-navigation, .senior-tab, [data-senior-level="true"]');
            const showSeniorContent = pgyLevel === 'pgy4' || pgyLevel === 'all';
            
            seniorContent.forEach(element => {
                element.style.display = showSeniorContent ? '' : 'none';
            });
            
            console.log(`Filtered content for ${pgyLevel} (max level: ${maxLevel})`);
        }
        
        // Initialize PGY selection on page load
        function initializePGYSelection() {
            // Check for saved selection
            const savedPGY = localStorage.getItem('selectedPGY');
            const initialPGY = savedPGY || 'all';
            
            selectPGY(initialPGY);
        }
        
        // Call initialization when page loads
        document.addEventListener('DOMContentLoaded', initializePGYSelection);
        
        // Global variable to track current competency area filter
        let currentCompetencyArea = 'all';
        
        // Competency Area Selection Function  
        function selectCompetencyArea(competencyArea) {
            currentCompetencyArea = competencyArea;
            
            // Update button styles
            const competencyTabs = document.querySelectorAll('.competency-tab');
            competencyTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.competency === competencyArea) {
                    tab.classList.add('active');
                }
            });
            
            // Update competency area info display
            updateCompetencyAreaInfo(competencyArea);
            
            // Filter content based on competency area
            filterContentByCompetencyArea(competencyArea);
            
            // Refresh case grid if it exists (disabled - case grid removed)
            // if (typeof populateCaseGrid === 'function') {
            //     populateCaseGrid();
            // }
            
            console.log(`Selected competency area: ${competencyArea}`);
        }
        
        // Update competency area info display
        function updateCompetencyAreaInfo(area) {
            const areaInfo = document.getElementById('competency-area-info');
            const competencyDescriptions = {
                'all': {
                    title: 'All Competency Areas',
                    description: 'Browse all available content across the 7 core EMG/NCS competency areas.'
                },
                'ncs': {
                    title: '⚡ NCS - Nerve Conduction Studies',
                    description: 'Master nerve conduction study techniques, interpretation, and clinical application. Covers peripheral anatomy, electrode placement, and systematic NCS screening.'
                },
                'radiculopathy': {
                    title: '🦴 Radiculopathy Screen',  
                    description: 'Learn to evaluate nerve root lesions through targeted NCS and EMG studies. Focus on cervical and lumbar radiculopathy patterns.'
                },
                'neuropathy': {
                    title: '🔗 Peripheral Neuropathy',
                    description: 'Understand peripheral nerve pathology, including diabetic neuropathy, inflammatory conditions, and hereditary neuropathies.'
                },
                'neuropathy-vs-myopathy': {
                    title: '🔍 Neuropathy vs Myopathy',
                    description: 'Develop skills to differentiate between nerve and muscle pathology using targeted EMG studies and clinical correlation.'
                },
                'discharges': {
                    title: '📊 Spontaneous Discharges & Recruitment',
                    description: 'Master audio/visual recognition of abnormal EMG activity: fibrillations, positive sharp waves, fasciculations, and recruitment patterns.'
                },
                'plexus': {
                    title: '🕸️ Brachial & Lumbosacral Plexus',
                    description: 'Understand complex plexus anatomy, nerve root organization, and systematic evaluation of plexus lesions.'
                },
                'reports': {
                    title: '📝 EMG Report Writing',
                    description: 'Learn to write professional, clinically useful EMG reports with appropriate differential diagnoses and recommendations.'
                }
            };
            
            const info = competencyDescriptions[area];
            areaInfo.innerHTML = `
                <div class="area-description">
                    <h4>${info.title}</h4>
                    <p>${info.description}</p>
                </div>
            `;
        }
        
        // Filter content based on competency area
        function filterContentByCompetencyArea(area) {
            // This will be expanded as we add more content with competency area tags
            const competencyElements = document.querySelectorAll('[data-competency-area]');
            competencyElements.forEach(element => {
                const elementArea = element.dataset.competencyArea;
                const shouldShow = area === 'all' || elementArea === area;
                
                element.style.display = shouldShow ? '' : 'none';
            });
            
            console.log(`Filtered content for competency area: ${area}`);
        }
        
        // Show/hide competency navigation based on context
        function toggleCompetencyNavigation(show = true) {
            const competencyNav = document.getElementById('competency-navigation');
            if (show) {
                competencyNav.style.display = 'block';
                competencyNav.classList.add('visible');
            } else {
                competencyNav.style.display = 'none';
                competencyNav.classList.remove('visible');
            }
        }
        
        // Show Focused Tab Function - Essential for pathway navigation
        function showFocusedTab(tabNumber, pgyLevel) {
            console.log(`🎯 Navigating to tab ${tabNumber} for ${pgyLevel}`);
            
            // Hide the entire main interface (header, sidebar, pathways) - cleanest approach
            const mainInterface = document.getElementById('main-interface-container');
            if (mainInterface) {
                mainInterface.style.display = 'none';
            }
            
            // Also hide any remaining tab content sections
            const tabSections = document.querySelectorAll('.tab-content');
            tabSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Map tab numbers to content types
            const tabContentMap = {
                0: 'interactive-emg-cases', 
                1: 'basic-ncs-principles',
                4: 'nerve-classifications',
                6: 'ncs-technique-videos',
                7: 'cardinal-rules',
                10: 'ncs-landmarks',
                11: 'emg-waveforms-audio',
                12: 'interactive-plexus-anatomy',
                13: 'report-writing-integration',
                14: 'emg-diagnosis-reference'
            };
            
            const contentType = tabContentMap[tabNumber];
            
            if (contentType) {
                // Call the appropriate show function based on tab
                switch(contentType) {
                    case 'interactive-emg-cases':
                        showClinicalCases(pgyLevel);
                        break;
                    case 'cardinal-rules':
                        showCardinalRules();
                        break;
                    case 'basic-ncs-principles':
                        showBasicNCSPrinciples();
                        break;
                    case 'nerve-classifications':
                        showNerveClassifications();
                        break;
                    case 'ncs-technique-videos':
                        showNCSTechniqueVideos();
                        break;
                    case 'ncs-landmarks':
                        showNCSLandmarks();
                        break;
                    case 'emg-waveforms-audio':
                        showEMGWaveformsAudio();
                        break;
                    case 'interactive-plexus-anatomy':
                        showInteractivePlexusAnatomy();
                        break;
                    case 'report-writing-integration':
                        showReportWriting();
                        break;
                    case 'emg-diagnosis-reference':
                        showEMGDiagnosisReference();
                        break;
                    default:
                        console.warn(`No content handler for tab ${tabNumber}`);
                        showPlaceholderContent(tabNumber, contentType);
                }
            } else {
                console.warn(`Unknown tab number: ${tabNumber}`);
                showPlaceholderContent(tabNumber, 'unknown');
            }
        }
        
        // Return to PGY Navigator Function
        function returnToPGYNavigator(pgyLevel) {
            console.log(`🏠 Returning to ${pgyLevel} dashboard`);
            
            // Hide all content areas
            const allContent = document.querySelectorAll('[id$="-content"], .modal-overlay');
            allContent.forEach(content => {
                if (content.id !== 'modal-overlay') {
                    content.style.display = 'none';
                }
            });
            
            // Close any open modals
            closeModal();
            
            // Show the main interface container (header, sidebar, pathways)
            const mainInterface = document.getElementById('main-interface-container');
            if (mainInterface) {
                mainInterface.style.display = 'block';
            }
            
            // Hide all tab content sections (they shouldn't be visible on pathway pages)
            const tabSections = document.querySelectorAll('.tab-content');
            tabSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the appropriate PGY dashboard
            const targetDashboard = pgyLevel === 'all' ? 'all-levels-dashboard' : `${pgyLevel}-dashboard`;
            const dashboardElement = document.getElementById(targetDashboard);
            if (dashboardElement) {
                dashboardElement.style.display = 'block';
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Placeholder content function for missing implementations
        function showPlaceholderContent(tabNumber, contentType) {
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
                    <button onclick="returnToPGYNavigator(currentPGYLevel)" 
                            style="background: #6b9f78; color: white; border: none; padding: 12px 24px; 
                                   border-radius: 8px; cursor: pointer; font-weight: 600;">
                        ← Back to Learning Pathway
                    </button>
                </div>
            `;
            
            showModal('Content Under Development', content);
        }
        
        // DIAGNOSTIC FUNCTION - Let's hunt down these sneaky elements!
        function runDiagnosticTest() {
            console.log('🕵️ DIAGNOSTIC TEST: Hunting for header/sidebar elements');
            
            // Find ALL elements containing these texts
            const allElements = document.querySelectorAll('*');
            const suspiciousElements = [];
            
            allElements.forEach(element => {
                const text = element.textContent || '';
                if (text.includes('Nerve/MuscleTool') || 
                    text.includes('Training Level') || 
                    text.includes('Learning Approach') ||
                    text.includes('PGY-2') ||
                    text.includes('Levels 1-2')) {
                    
                    const isVisible = window.getComputedStyle(element).display !== 'none' && 
                                    window.getComputedStyle(element).visibility !== 'hidden' &&
                                    element.offsetHeight > 0;
                    
                    if (isVisible) {
                        suspiciousElements.push({
                            element: element,
                            tagName: element.tagName,
                            className: element.className,
                            id: element.id,
                            display: window.getComputedStyle(element).display,
                            position: window.getComputedStyle(element).position,
                            top: element.offsetTop,
                            left: element.offsetLeft,
                            width: element.offsetWidth,
                            height: element.offsetHeight,
                            text: text.substring(0, 100) + '...'
                        });
                    }
                }
            });
            
            console.log(`Found ${suspiciousElements.length} visible suspicious elements:`);
            suspiciousElements.forEach((item, index) => {
                console.log(`${index + 1}. ${item.tagName}${item.id ? '#' + item.id : ''}${item.className ? '.' + item.className.split(' ')[0] : ''}`);
                console.log(`   Display: ${item.display}, Position: ${item.position}`);
                console.log(`   Location: (${item.left}, ${item.top}) Size: ${item.width}x${item.height}`);
                console.log(`   Text: ${item.text}`);
                console.log('   Element:', item.element);
                console.log('---');
            });
            
            // Test our main interface container
            const mainInterface = document.getElementById('main-interface-container');
            console.log('🎯 Main Interface Container Status:');
            console.log('   Exists:', !!mainInterface);
            if (mainInterface) {
                console.log('   Display:', window.getComputedStyle(mainInterface).display);
                console.log('   Visibility:', window.getComputedStyle(mainInterface).visibility);
                console.log('   Height:', mainInterface.offsetHeight);
                console.log('   Element:', mainInterface);
            }
            
            return suspiciousElements;
        }
        
        // Nuclear option - hide EVERYTHING that contains these texts
        function nuclearHideAll() {
            console.log('💥 NUCLEAR OPTION: Hiding ALL elements with suspicious text');
            
            const allElements = document.querySelectorAll('*');
            let hiddenCount = 0;
            
            allElements.forEach(element => {
                const text = element.textContent || '';
                if (text.includes('Nerve/MuscleTool') || 
                    text.includes('Training Level') || 
                    text.includes('Learning Approach') ||
                    text.includes('PGY-2') ||
                    text.includes('Levels 1-2')) {
                    
                    element.style.display = 'none !important';
                    element.style.visibility = 'hidden !important';
                    element.style.opacity = '0 !important';
                    element.style.height = '0 !important';
                    element.style.overflow = 'hidden !important';
                    hiddenCount++;
                }
            });
            
            console.log(`💥 Nuclear option applied to ${hiddenCount} elements`);
        }
        
        // Enhanced showCardinalRules with diagnostic
        function showCardinalRules() {
            console.log('🎯 showCardinalRules called - running diagnostic first');
            runDiagnosticTest();
            
            const content = `
                <div class="cardinal-rules-content">
                    <div style="position: fixed; top: 10px; right: 10px; z-index: 9999; display: flex; gap: 10px;">
                        <div style="background: red; color: white; padding: 10px; border-radius: 5px; cursor: pointer;" onclick="runDiagnosticTest()">
                            🕵️ Diagnostic
                        </div>
                        <div style="background: darkred; color: white; padding: 10px; border-radius: 5px; cursor: pointer;" onclick="nuclearHideAll()">
                            💥 Nuclear Hide
                        </div>
                    </div>
                    <h3 style="color: #2c3e50; margin-bottom: 20px;">🚨 Cardinal EMG/NCS Rules</h3>
                    <div style="display: grid; gap: 20px;">
                        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #92400e;">🛡️ Safety First</h4>
                            <ul style="color: #b45309; margin: 0;">
                                <li>Always explain procedures to patients</li>
                                <li>Check for pacemakers and implanted devices</li>
                                <li>Use universal precautions</li>
                                <li>Proper needle disposal</li>
                            </ul>
                        </div>
                        <div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #15803d;">⚡ NCS Fundamentals</h4>
                            <ul style="color: #166534; margin: 0;">
                                <li>Always check skin temperature (>32°C)</li>
                                <li>Clean skin with alcohol before electrode placement</li>
                                <li>Start with distal stimulation sites</li>
                                <li>Measure distances accurately</li>
                            </ul>
                        </div>
                        <div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #1d4ed8;">🎯 EMG Essentials</h4>
                            <ul style="color: #1e40af; margin: 0;">
                                <li>Insert needle slowly and listen continuously</li>
                                <li>Sample multiple areas within each muscle</li>
                                <li>Always assess insertional activity first</li>
                                <li>Document findings systematically</li>
                            </ul>
                        </div>
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <button onclick="returnToPGYNavigator(currentPGYLevel)" 
                                style="background: #6b9f78; color: white; border: none; padding: 12px 24px; 
                                       border-radius: 8px; cursor: pointer; font-weight: 600;">
                            ← Back to Learning Pathway
                        </button>
                    </div>
                </div>
            `;
            showModal('🚨 Cardinal EMG/NCS Rules', content);
        }
        
        function showBasicNCSPrinciples() {
            const content = `
                <div class="ncs-principles-content">
                    <h3 style="color: #2c3e50; margin-bottom: 20px;">⚡ Basic NCS Principles</h3>
                    <div style="display: grid; gap: 20px;">
                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 10px;">
                            <h4 style="color: #1e40af;">🧠 What is NCS?</h4>
                            <p>Nerve Conduction Studies measure the speed and amplitude of electrical signals traveling along peripheral nerves. This helps us identify nerve damage, compression, or disease.</p>
                        </div>
                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 10px;">
                            <h4 style="color: #1e40af;">📊 Key Parameters</h4>
                            <ul>
                                <li><strong>Latency:</strong> Time from stimulus to response onset</li>
                                <li><strong>Amplitude:</strong> Size of the nerve response</li>
                                <li><strong>Conduction Velocity:</strong> Speed of nerve signal</li>
                                <li><strong>Duration:</strong> Length of the response</li>
                            </ul>
                        </div>
                        <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 10px;">
                            <h4 style="color: #1e40af;">🎯 Clinical Applications</h4>
                            <ul>
                                <li>Carpal tunnel syndrome evaluation</li>
                                <li>Peripheral neuropathy assessment</li>
                                <li>Radiculopathy screening</li>
                                <li>Nerve injury localization</li>
                            </ul>
                        </div>
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <button onclick="returnToPGYNavigator(currentPGYLevel)" 
                                style="background: #6b9f78; color: white; border: none; padding: 12px 24px; 
                                       border-radius: 8px; cursor: pointer; font-weight: 600;">
                            ← Back to Learning Pathway
                        </button>
                    </div>
                </div>
            `;
            showModal('⚡ Basic NCS Principles', content);
        }
        
        function showNerveClassifications() {
            showPlaceholderContent(4, 'nerve-classifications');
        }
        
        function showNCSTechniqueVideos() {
            showPlaceholderContent(6, 'ncs-technique-videos');
        }
        
        function showNCSLandmarks() {
            showPlaceholderContent(10, 'ncs-landmarks');
        }
        
        function showEMGWaveformsAudio() {
            showPlaceholderContent(11, 'emg-waveforms-audio');
        }
        
        function showInteractivePlexusAnatomy() {
            showPlaceholderContent(12, 'interactive-plexus-anatomy');
        }
        
        function showReportWriting() {
            showPlaceholderContent(13, 'report-writing-integration');
        }
        
        function showEMGDiagnosisReference() {
            showPlaceholderContent(14, 'emg-diagnosis-reference');
        }
        
        // Progress Dashboard Functions (modified to handle removed section)
        function toggleProgressDashboard(show = true) {
            // Progress dashboard has been removed - this function now does nothing
            console.log('Progress dashboard functionality removed');
        }
        
        function updateProgressDashboard() {
            const progress = getCompetencyProgress();
            const competencyCards = document.querySelectorAll('.competency-card');
            
            competencyCards.forEach(card => {
                const competency = card.dataset.competency;
                const competencyProgress = progress[competency] || 0;
                
                // Update level indicators
                const levelIndicators = card.querySelectorAll('.level-indicator');
                levelIndicators.forEach(indicator => {
                    const level = parseInt(indicator.dataset.level);
                    indicator.classList.remove('achieved', 'current');
                    
                    if (level <= competencyProgress) {
                        indicator.classList.add('achieved');
                    } else if (level === competencyProgress + 1) {
                        indicator.classList.add('current');
                    }
                });
                
                // Update progress bar
                const progressFill = card.querySelector('.progress-fill');
                const progressPercentage = (competencyProgress / 5) * 100;
                progressFill.style.width = `${progressPercentage}%`;
                progressFill.dataset.progress = competencyProgress;
            });
            
            // Update overall progress
            updateOverallProgress(progress);
        }
        
        function getCompetencyProgress() {
            const defaultProgress = {
                'ncs': 0,
                'radiculopathy': 0,
                'neuropathy': 0,
                'differential': 0,
                'emg-patterns': 0,
                'plexus': 0,
                'reporting': 0
            };
            
            const savedProgress = localStorage.getItem('competencyProgress');
            if (savedProgress) {
                return { ...defaultProgress, ...JSON.parse(savedProgress) };
            }
            
            return defaultProgress;
        }
        
        function updateCompetencyLevel(competency, level) {
            const progress = getCompetencyProgress();
            progress[competency] = Math.max(progress[competency], level);
            
            localStorage.setItem('competencyProgress', JSON.stringify(progress));
            updateProgressDashboard();
            
            // Show achievement animation
            showAchievementNotification(competency, level);
        }
        
        function updateOverallProgress(progress) {
            const progressValues = Object.values(progress);
            const totalProgress = progressValues.reduce((sum, val) => sum + val, 0);
            const maxProgress = progressValues.length * 5; // 7 competencies × 5 levels
            
            const overallPercentage = (totalProgress / maxProgress) * 100;
            const overallFill = document.getElementById('overallProgressFill');
            const completedSpan = document.getElementById('completedCompetencies');
            
            if (overallFill) {
                overallFill.style.width = `${overallPercentage}%`;
            }
            
            if (completedSpan) {
                const targetLevels = getTargetLevelsForPGY(currentPGYLevel);
                let completedCount = 0;
                
                Object.entries(progress).forEach(([competency, level]) => {
                    const targetLevel = targetLevels[competency] || 0;
                    if (level >= targetLevel) {
                        completedCount++;
                    }
                });
                
                completedSpan.textContent = completedCount;
            }
        }
        
        function getTargetLevelsForPGY(pgyLevel) {
            const targetLevels = {
                'pgy2': { 'ncs': 2, 'radiculopathy': 2, 'neuropathy': 2, 'differential': 2, 'emg-patterns': 2, 'plexus': 2, 'reporting': 2 },
                'pgy3': { 'ncs': 3, 'radiculopathy': 3, 'neuropathy': 3, 'differential': 3, 'emg-patterns': 3, 'plexus': 3, 'reporting': 3 },
                'pgy4': { 'ncs': 4, 'radiculopathy': 4, 'neuropathy': 4, 'differential': 4, 'emg-patterns': 4, 'plexus': 4, 'reporting': 4 }
            };
            
            return targetLevels[pgyLevel] || {};
        }
        
        function showAchievementNotification(competency, level) {
            const competencyNames = {
                'ncs': 'NCS Technique',
                'radiculopathy': 'Radiculopathy Screen',
                'neuropathy': 'Peripheral Neuropathy',
                'differential': 'Neuropathy vs Myopathy',
                'emg-patterns': 'EMG Pattern Recognition',
                'plexus': 'Plexus Anatomy',
                'reporting': 'EMG Report Writing'
            };
            
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div class="achievement-content">
                    <span class="achievement-icon">🎉</span>
                    <div class="achievement-text">
                        <strong>Level ${level} Achieved!</strong>
                        <br>${competencyNames[competency]}
                    </div>
                </div>
            `;
            
            // Add achievement notification styles if not already present
            if (!document.querySelector('.achievement-notification-styles')) {
                const styles = document.createElement('style');
                styles.className = 'achievement-notification-styles';
                styles.textContent = `
                    .achievement-notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, #6b9f78, #4a6d52);
                        color: white;
                        padding: 15px 20px;
                        border-radius: 10px;
                        box-shadow: 0 8px 25px rgba(107, 159, 120, 0.3);
                        z-index: 1000;
                        animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-in 3s;
                        animation-fill-mode: both;
                    }
                    
                    .achievement-content {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    
                    .achievement-icon {
                        font-size: 1.5em;
                    }
                    
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    
                    @keyframes fadeOut {
                        to { opacity: 0; transform: translateX(100%); }
                    }
                `;
                document.head.appendChild(styles);
            }
            
            document.body.appendChild(notification);
            
            // Remove notification after animation
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 4000);
        }
        
        // Click handlers for level indicators to manually set progress
        function setupProgressInteractions() {
            document.querySelectorAll('.level-indicator').forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const level = parseInt(this.dataset.level);
                    const competencyCard = this.closest('.competency-card');
                    const competency = competencyCard.dataset.competency;
                    
                    updateCompetencyLevel(competency, level);
                });
            });
        }
        
        // Initialize progress dashboard when page loads
        function initializeProgressDashboard() {
            // Set up click handlers
            setTimeout(() => {
                setupProgressInteractions();
                
                // Load and display saved progress
                if (currentPGYLevel !== 'all') {
                    updateProgressDashboard();
                }
            }, 100);
        }
        
        // Report Writing Functions
        function showReportMode(mode) {
            // Hide all report mode contents
            document.querySelectorAll('.report-mode-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all mode buttons
            document.querySelectorAll('.report-mode-button').forEach(button => {
                button.classList.remove('active');
            });
            
            // Show selected mode content
            const selectedContent = document.getElementById(`report-${mode}`);
            const selectedButton = document.querySelector(`[data-mode="${mode}"]`);
            
            if (selectedContent) selectedContent.classList.add('active');
            if (selectedButton) selectedButton.classList.add('active');
            
            console.log(`Report mode switched to: ${mode}`);
        }
        
        function showTemplateLevel(level) {
            // Hide all template levels
            document.querySelectorAll('.template-level').forEach(templateLevel => {
                templateLevel.classList.remove('active');
            });
            
            // Remove active class from all level buttons
            document.querySelectorAll('.template-level-btn').forEach(button => {
                button.classList.remove('active');
            });
            
            // Show selected template level
            const selectedLevel = document.getElementById(`template-level-${level}`);
            const selectedButton = document.querySelector(`[data-level="${level}"]`);
            
            if (selectedLevel) selectedLevel.classList.add('active');
            if (selectedButton) selectedButton.classList.add('active');
            
            // Update competency progress for report writing
            if (typeof updateCompetencyLevel === 'function') {
                updateCompetencyLevel('reporting', level);
            }
            
            console.log(`Template level switched to: ${level}`);
        }
        
        // Diagnosis Reference Functions
        function showDiagnosisCategory(category) {
            // Hide all diagnosis category contents
            document.querySelectorAll('.diagnosis-category-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all category buttons
            document.querySelectorAll('.diagnosis-category-button').forEach(button => {
                button.classList.remove('active');
            });
            
            // Show selected category content
            const selectedContent = document.getElementById(`diagnosis-${category}`);
            const selectedButton = document.querySelector(`[data-category="${category}"]`);
            
            if (selectedContent) selectedContent.classList.add('active');
            if (selectedButton) selectedButton.classList.add('active');
            
            console.log(`Diagnosis category switched to: ${category}`);
        }
        
        function showTab(tabIndex) {
            // Hide all PGY dashboards to switch to tab view
            const pgydashboards = document.querySelectorAll('.pgy-dashboard');
            pgydashboards.forEach(dashboard => {
                dashboard.style.display = 'none';
            });
            
            // Show the all-levels dashboard (which contains the tabs)
            const allLevelsDashboard = document.getElementById('all-levels-dashboard');
            if (allLevelsDashboard) {
                allLevelsDashboard.style.display = 'block';
            }
            
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Remove active class from all tab buttons
            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(button => button.classList.remove('active'));
            
            // Show selected tab content
            const targetTab = document.getElementById(`tab-${tabIndex}`);
            if (targetTab) {
                targetTab.classList.add('active');
                
                // Scroll to the top of the content
                setTimeout(() => {
                    targetTab.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }
            
            // Update PGY buttons to show "All Levels" is active
            const pgyButtons = document.querySelectorAll('.pgy-button');
            pgyButtons.forEach(button => {
                button.classList.remove('active');
                if (button.dataset.pgy === 'all') {
                    button.classList.add('active');
                }
            });
            
            // Show competency navigation for Interactive Case Studies tab (tabIndex 0)
            toggleCompetencyNavigation(tabIndex === 0);
        }
        
        function showFocusedTab(tabIndex, fromPGY = null) {
            // Hide ALL content sections for clean, isolated view
            const pgydashboards = document.querySelectorAll('.pgy-dashboard');
            pgydashboards.forEach(dashboard => {
                dashboard.style.display = 'none';
            });
            
            // Hide the all-levels dashboard with tab navigation
            const allLevelsDashboard = document.getElementById('all-levels-dashboard');
            if (allLevelsDashboard) {
                allLevelsDashboard.style.display = 'none';
            }
            
            // Hide main content section (contains all tabs)
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.display = 'none';
            }
            
            // Hide PGY selector container
            const pgySelector = document.querySelector('.pgy-selector-container');
            if (pgySelector) {
                pgySelector.style.display = 'none';
            }
            
            // Hide progress dashboard
            const progressDashboard = document.getElementById('progressDashboard');
            if (progressDashboard) {
                progressDashboard.style.display = 'none';
            }
            
            // Hide competency navigation
            const competencyNav = document.getElementById('competency-navigation');
            if (competencyNav) {
                competencyNav.style.display = 'none';
            }
            
            // Create or show focused tab container
            let focusedContainer = document.getElementById('focused-tab-container');
            if (!focusedContainer) {
                focusedContainer = document.createElement('div');
                focusedContainer.id = 'focused-tab-container';
                focusedContainer.className = 'pgy-dashboard';
                focusedContainer.style.cssText = `
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(107, 159, 120, 0.2);
                    border-radius: 15px;
                    padding: 30px;
                    margin: 20px auto;
                    max-width: 1200px;
                    box-shadow: 0 8px 32px rgba(107, 159, 120, 0.1);
                    position: relative;
                    z-index: 1000;
                `;
                
                // Insert at the beginning of container for top positioning
                const container = document.querySelector('.container');
                container.insertBefore(focusedContainer, container.firstChild);
            }
            
            // Get tab name for header
            const tabNames = {
                0: 'Interactive Case Studies',
                1: 'Nerve Conduction Studies', 
                2: 'EMG Instruments',
                3: 'EMG Terms',
                4: 'Nerve Classifications',
                5: 'Quick Reference',
                6: 'NCS Videos',
                7: 'Cardinal Rules of NCS',
                8: 'Advanced Muscle Lab',
                9: 'EMG Challenge',
                10: 'NCS Landmarks',
                11: 'EMG Waveforms & Audio',
                12: 'Interactive Plexus Anatomy',
                13: 'EMG Report Writing',
                14: 'EMG Diagnosis Reference'
            };
            
            const tabName = tabNames[tabIndex] || `Content Area ${tabIndex}`;
            
            // Get the actual tab content
            const sourceTab = document.getElementById(`tab-${tabIndex}`);
            let tabContent = '<p>Content not found.</p>';
            if (sourceTab) {
                tabContent = sourceTab.innerHTML;
            }
            
            // Create focused view with back button
            focusedContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #2c3e50;">📚 ${tabName}</h2>
                    <button onclick="returnToPGYNavigator('${fromPGY}')" 
                            style="background: #6b9f78; color: white; border: none; padding: 10px 20px; 
                                   border-radius: 8px; cursor: pointer; font-weight: 600;
                                   transition: all 0.3s ease;">
                        ← Back to Navigator
                    </button>
                </div>
                <div style="border-top: 2px solid #6b9f78; padding-top: 20px;">
                    ${tabContent}
                </div>
            `;
            
            focusedContainer.style.display = 'block';
            
            // Clear PGY button states
            const pgyButtonElements = document.querySelectorAll('.pgy-button');
            pgyButtonElements.forEach(button => button.classList.remove('active'));
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Show visual feedback
            showTabFeedback(tabIndex);
        }
        
        function returnToPGYNavigator(pgyLevel = null) {
            // Hide focused container
            const focusedContainer = document.getElementById('focused-tab-container');
            if (focusedContainer) {
                focusedContainer.style.display = 'none';
            }
            
            // Restore all hidden content sections
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.display = 'block';
            }
            
            const pgySelector = document.querySelector('.pgy-selector-container');
            if (pgySelector) {
                pgySelector.style.display = 'block';
            }
            
            const progressDashboard = document.getElementById('progressDashboard');
            if (progressDashboard && progressDashboard.style.display !== 'none') {
                progressDashboard.style.display = 'block';
            }
            
            const competencyNav = document.getElementById('competency-navigation');
            if (competencyNav && competencyNav.style.display !== 'none') {
                competencyNav.style.display = 'block';
            }
            
            // Return to the original PGY level or default to 'all'
            const targetPGY = pgyLevel || 'all';
            selectPGY(targetPGY);
            
            // Show notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #6b9f78;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            notification.textContent = '← Returned to PGY Navigator';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
        
        function showTabFeedback(tabIndex) {
            const tabNames = {
                0: 'Interactive Case Studies',
                1: 'Nerve Conduction Studies', 
                2: 'EMG Instruments',
                3: 'EMG Terms',
                4: 'Nerve Classifications',
                5: 'Quick Reference',
                6: 'NCS Videos',
                7: 'Cardinal Rules of NCS',
                8: 'Advanced Muscle Lab',
                9: 'EMG Challenge',
                10: 'NCS Landmarks',
                11: 'EMG Waveforms & Audio',
                12: 'Interactive Plexus Anatomy',
                13: 'EMG Report Writing',
                14: 'EMG Diagnosis Reference'
            };
            
            const tabName = tabNames[tabIndex] || `Tab ${tabIndex}`;
            
            // Create a temporary feedback notification
            const feedback = document.createElement('div');
            feedback.className = 'tab-feedback';
            feedback.innerHTML = `
                <div class="feedback-content">
                    <span class="feedback-icon">📖</span>
                    <span class="feedback-text">Loading: ${tabName}</span>
                </div>
            `;
            
            // Add CSS for the feedback
            const style = document.createElement('style');
            style.textContent = `
                .tab-feedback {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                    z-index: 1001;
                    animation: slideInRight 0.3s ease;
                }
                
                .feedback-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(feedback);
            
            // Remove feedback after 2 seconds
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.remove();
                }
                if (style.parentNode) {
                    style.remove();
                }
            }, 2000);
        }
        
        // Global variables for quiz state
        let currentCase = null;
        let currentStep = 1;
        let userDifferential = '';
        let currentDifficultyFilter = 'all';

        // Comprehensive case database
        const caseDatabase = {
            'hand14': {
                title: "Hand Numbness/Tingling (Digits 1-4)",
                // Competency metadata
                competencyArea: "NCS", // Primary: Nerve Conduction Study
                competencyLevel: 3, // Independent NCS screen
                pgyTarget: ["pgy3", "pgy4"], // Appropriate for PGY-3+
                secondaryCompetencies: [
                    {area: "Report Writing", level: 2},
                    {area: "Peripheral Neuropathy", level: 2}
                ],
                presentation: {
                    age: 45,
                    gender: "Female",
                    occupation: "Administrative Assistant",
                    chiefComplaint: "3-month history of numbness and tingling in thumb, index, and middle fingers, worse at night",
                    history: "Symptoms wake her up at night, shaking hands provides relief. Occasional thenar weakness when gripping objects. No neck pain or trauma. Uses computer 8+ hours daily.",
                    pmh: "Hypothyroidism, well-controlled",
                    medications: "Levothyroxine"
                },
                physicalExam: {
                    inspection: "No visible muscle atrophy. No fasciculations observed.",
                    palpation: "Mild tenderness over carpal tunnel. No cervical spine tenderness.",
                    rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
                    strength: "5/5 strength in all muscle groups except mild thenar weakness (4/5) on right",
                    sensation: "Decreased light touch and pinprick in median nerve distribution (digits 1-3)",
                    reflexes: "2+ and symmetric throughout. No pathological reflexes.",
                    specialTests: "Positive Tinel's sign at wrist. Positive Phalen's test. Negative Hoffmann, no clonus, no spasticity"
                },
                expectedDifferential: [
                    "Carpal tunnel syndrome",
                    "Pronator syndrome", 
                    "C6 radiculopathy",
                    "Cervical myelopathy",
                    "Polyneuropathy"
                ],
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Prolonged distal latency: 5.8 ms (normal <4.2 ms). Reduced CMAP amplitude: 3.2 mV (normal >5.0 mV)",
                        interpretation: "Abnormal median nerve function at the wrist level"
                    },
                    {
                        name: "Median Sensory (Wrist-Digit 3)",
                        result: "abnormal", 
                        findings: "Prolonged peak latency: 4.5 ms (normal <3.4 ms). Reduced amplitude: 8 μV (normal >15 μV)",
                        interpretation: "Confirms median sensory involvement at wrist"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal distal latency: 2.8 ms. Normal CMAP amplitude: 12.5 mV",
                        interpretation: "Normal ulnar nerve function"
                    },
                    {
                        name: "Ulnar Sensory (Wrist-Digit 5)",
                        result: "normal",
                        findings: "Normal peak latency: 2.9 ms. Normal amplitude: 25 μV",
                        interpretation: "Ulnar sensory function preserved"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor pollicis brevis (APB)",
                        findings: "Increased insertional activity, few fibrillation potentials, reduced recruitment with large amplitude, long duration motor unit potentials",
                        interpretation: "Chronic denervation with reinnervation in median-innervated muscle"
                    },
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Normal insertional activity, no abnormal spontaneous activity, full recruitment with normal motor unit potentials",
                        interpretation: "Normal ulnar nerve function, no evidence of C8 involvement"
                    }
                ],
                requiresEMG: true,
                correctDiagnosis: "Moderate Carpal Tunnel Syndrome",
                explanation: "Classic presentation with night symptoms, thenar weakness, positive provocative tests, and selective median nerve abnormalities on NCS. EMG shows chronic denervation in median-innervated thenar muscles confirming the diagnosis."
            },
            'footdrop': {
                title: "Foot Drop/Dorsiflexor Weakness",
                // Competency metadata
                competencyArea: "NCS", // Primary: Nerve Conduction Study
                competencyLevel: 2, // Focused H&P pertinent to EMG study
                pgyTarget: ["pgy2", "pgy3", "pgy4"], // Good for all levels - clear presentation
                secondaryCompetencies: [
                    {area: "Peripheral Neuropathy", level: 1},
                    {area: "Report Writing", level: 1}
                ], 
                presentation: {
                    age: 28,
                    gender: "Male",
                    occupation: "Construction Worker",
                    chiefComplaint: "2-week history of inability to lift right foot, frequent tripping",
                    history: "Gradual onset after prolonged squatting while laying tile. No back pain. No numbness initially, mild numbness over dorsum of foot developed later.",
                    pmh: "None",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "Right foot in plantar flexed position. No muscle atrophy visible yet.",
                    palpation: "No tenderness over fibular head or spine. Fibular head feels normal.",
                    rom: "Limited active dorsiflexion of right foot. Passive ROM normal.",
                    strength: "Right dorsiflexion 1/5, eversion 2/5. Plantar flexion and inversion normal (5/5). Hip and knee strength normal.",
                    sensation: "Decreased sensation over dorsum of right foot in first web space",
                    reflexes: "Achilles reflex present and symmetric. No pathological reflexes.",
                    specialTests: "Negative straight leg raise. No Hoffmann, clonus, or spasticity"
                },
                expectedDifferential: [
                    "Common fibular (peroneal) neuropathy at fibular head",
                    "Deep fibular (peroneal) neuropathy",
                    "L5 radiculopathy", 
                    "Sciatic neuropathy",
                    "Anterior compartment syndrome"
                ],
                ncsStudies: [
                    {
                        name: "Common Fibular Motor (EDB)",
                        result: "abnormal",
                        findings: "No response obtained from extensor digitorum brevis",
                        interpretation: "Complete conduction block or axonal loss in deep fibular nerve"
                    },
                    {
                        name: "Common Fibular Motor (Tibialis Anterior)",
                        result: "abnormal", 
                        findings: "No motor response from tibialis anterior muscle",
                        interpretation: "Confirms deep fibular nerve involvement"
                    },
                    {
                        name: "Superficial Fibular Sensory",
                        result: "abnormal",
                        findings: "No sensory response obtained",
                        interpretation: "Superficial fibular nerve also affected"
                    },
                    {
                        name: "Tibial Motor (AH)",
                        result: "normal",
                        findings: "Normal distal latency and amplitude",
                        interpretation: "Tibial nerve function preserved"
                    },
                    {
                        name: "Sural Sensory", 
                        result: "normal",
                        findings: "Normal amplitude and latency",
                        interpretation: "Normal distal nerve function"
                    }
                ],
                correctDiagnosis: "Common Fibular (Peroneal) Neuropathy at the Fibular Head",
                explanation: "Acute onset foot drop with both motor and sensory involvement in common fibular distribution following prolonged squatting (compression at fibular head) is classic for fibular neuropathy."
            },
            'ulnar': {
                title: "Hand Weakness and Numbness",
                presentation: {
                    age: 52,
                    gender: "Male",
                    occupation: "Carpenter",
                    chiefComplaint: "6-month history of weakness in right hand and numbness in ring and little fingers",
                    history: "Gradual onset of difficulty with fine motor tasks. Notices weakness when trying to grip tools. Numbness in ring and little fingers, worse in the morning. Works long hours using hand tools and machinery. No neck pain or trauma.",
                    pmh: "Diabetes mellitus type 2, hypertension",
                    medications: "Metformin, lisinopril"
                },
                physicalExam: {
                    inspection: "Mild atrophy of hypothenar eminence and first dorsal interosseous space on right",
                    palpation: "No tenderness over ulnar groove at elbow. Ulnar nerve mobile at elbow.",
                    rom: "Full ROM at neck, shoulder, elbow, and wrist bilaterally",
                    strength: "Right hand intrinsics 3/5 (FDI, ADM, interossei). Grip strength reduced. FCU 4/5. All other muscle groups 5/5.",
                    sensation: "Decreased light touch and pinprick in ulnar distribution (ring and little finger)",
                    reflexes: "2+ and symmetric throughout. No pathological reflexes.",
                    specialTests: "Positive Froment's sign on right. Negative Tinel's at wrist. Mild Tinel's at elbow. No Hoffmann, clonus, or spasticity"
                },
                expectedDifferential: [
                    "cubital tunnel syndrome",
                    "ulnar neuropathy at elbow",
                    "guyon's canal syndrome",
                    "c8 radiculopathy",
                    "lower trunk brachial plexopathy",
                    "polyneuropathy"
                ],
                ncsStudies: [
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Across elbow conduction velocity: 32 m/s (normal >50 m/s). Distal latency: 3.8 ms (normal <3.3 ms)",
                        interpretation: "Focal conduction abnormality across elbow segment"
                    },
                    {
                        name: "Ulnar Sensory (Wrist-Digit 5)",
                        result: "abnormal",
                        findings: "Prolonged peak latency: 4.2 ms (normal <3.4 ms). Reduced amplitude: 6 μV (normal >10 μV)",
                        interpretation: "Ulnar sensory involvement"
                    },
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency: 3.1 ms. Normal CMAP amplitude: 8.2 mV",
                        interpretation: "Normal median nerve function"
                    },
                    {
                        name: "Median Sensory (Wrist-Digit 3)",
                        result: "normal",
                        findings: "Normal peak latency: 2.8 ms. Normal amplitude: 22 μV",
                        interpretation: "Median sensory function preserved"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Increased insertional activity, frequent fibrillation potentials and positive sharp waves, reduced recruitment with large amplitude motor unit potentials",
                        interpretation: "Chronic denervation with reinnervation in ulnar-innervated hand muscles"
                    },
                    {
                        muscle: "Flexor carpi ulnaris",
                        findings: "Normal insertional activity, no abnormal spontaneous activity, full recruitment with normal motor unit potentials",
                        interpretation: "Normal - suggests lesion below elbow (spares FCU branch)"
                    }
                ],
                requiresEMG: true,
                correctDiagnosis: "Cubital Tunnel Syndrome (Ulnar Neuropathy at Elbow)",
                explanation: "Progressive hand weakness with ulnar distribution, positive Froment's sign, focal slowing across elbow on NCS, and EMG showing denervation in distal ulnar muscles while sparing FCU confirms ulnar neuropathy at the elbow."
            },
            'cervical': {
                title: "Neck Pain with Arm Weakness",
                presentation: {
                    age: 45,
                    gender: "Female",
                    occupation: "Office Manager",
                    chiefComplaint: "3-month history of neck pain radiating to left arm with weakness and numbness",
                    history: "Gradual onset of neck pain after minor motor vehicle accident. Pain radiates down left arm to thumb and index finger. Weakness noticed when lifting objects overhead. Numbness in thumb, index, and middle finger. Symptoms worse with neck extension.",
                    pmh: "None",
                    medications: "Ibuprofen PRN"
                },
                physicalExam: {
                    inspection: "No visible muscle atrophy. Patient holds head in slightly flexed position.",
                    palpation: "Tenderness over left cervical paraspinal muscles. No palpable lymphadenopathy.",
                    rom: "Limited neck extension due to pain. Left lateral flexion reproduces arm pain.",
                    strength: "Left biceps 4/5, brachioradialis 4/5, deltoid 4-/5. Grip strength mildly reduced on left. Right side normal.",
                    sensation: "Decreased sensation in left C6 dermatome (thumb, index finger, lateral forearm)",
                    reflexes: "Left biceps reflex diminished (1+). Brachioradialis reflex absent on left. Triceps 2+ bilaterally.",
                    specialTests: "Positive Spurling's test on left. Negative Hoffmann bilaterally. No clonus or spasticity"
                },
                expectedDifferential: [
                    "c6 radiculopathy",
                    "cervical radiculopathy",
                    "cervical disc herniation",
                    "brachial plexopathy",
                    "multiple peripheral neuropathies",
                    "cervical myelopathy"
                ],
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency: 3.2 ms. Normal CMAP amplitude: 9.1 mV",
                        interpretation: "Median nerve function normal"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal distal latency: 2.7 ms. Normal CMAP amplitude: 11.8 mV",
                        interpretation: "Ulnar nerve function normal"
                    },
                    {
                        name: "Radial Motor (EIP)",
                        result: "normal",
                        findings: "Normal distal latency: 3.4 ms. Normal CMAP amplitude: 4.2 mV",
                        interpretation: "Radial nerve function normal"
                    },
                    {
                        name: "Median Sensory (Wrist-Digit 1)",
                        result: "abnormal",
                        findings: "Prolonged peak latency: 4.1 ms (normal <3.4 ms). Reduced amplitude: 12 μV (normal >15 μV)",
                        interpretation: "Mild median sensory abnormality - correlate clinically"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Biceps",
                        findings: "Increased insertional activity, fibrillation potentials and positive sharp waves, reduced recruitment",
                        interpretation: "Active denervation in C6 innervated muscle"
                    },
                    {
                        muscle: "Deltoid",
                        findings: "Increased insertional activity, few fibrillation potentials, reduced recruitment with large amplitude MUPs",
                        interpretation: "Chronic denervation with reinnervation in C6 innervated muscle"
                    },
                    {
                        muscle: "Triceps",
                        findings: "Normal insertional activity, no spontaneous activity, full recruitment with normal MUPs",
                        interpretation: "Normal C7 innervated muscle"
                    }
                ],
                requiresEMG: true,
                correctDiagnosis: "Left C6 Radiculopathy",
                explanation: "Clinical presentation with neck pain, C6 distribution weakness and numbness, diminished reflexes, positive Spurling's test, and EMG showing active denervation in C6 myotome muscles confirms C6 radiculopathy."
            },
            'polyneuropathy': {
                title: "Progressive Weakness and Numbness",
                presentation: {
                    age: 62,
                    gender: "Male",
                    occupation: "Retired Mechanic",
                    chiefComplaint: "1-year history of progressive numbness in feet and hands with weakness",
                    history: "Gradual onset of numbness that started in toes and has progressed up legs. Now involves fingertips bilaterally. Reports difficulty walking due to imbalance. Denies back pain or trauma. Has had diabetes for 15 years with poor glucose control.",
                    pmh: "Diabetes mellitus type 2, hypertension, hyperlipidemia",
                    medications: "Insulin, metformin, lisinopril, atorvastatin"
                },
                physicalExam: {
                    inspection: "No muscle atrophy visible. Steady gait but decreased arm swing.",
                    palpation: "No tenderness. Decreased muscle bulk in distal legs.",
                    rom: "Full ROM throughout",
                    strength: "Distal lower extremity weakness: dorsiflexion 4/5, plantar flexion 4/5. Intrinsic hand muscles 4/5. Proximal strength normal.",
                    sensation: "Stocking-glove pattern sensory loss. Vibration and proprioception markedly reduced in toes and fingers.",
                    reflexes: "Achilles reflexes absent bilaterally. Knee reflexes 1+ bilaterally. Upper extremity reflexes 2+ but symmetric.",
                    specialTests: "Romberg positive. Unable to heel-to-toe walk. No Hoffmann, clonus, or spasticity"
                },
                expectedDifferential: [
                    "diabetic polyneuropathy",
                    "distal sensorimotor polyneuropathy",
                    "peripheral neuropathy",
                    "chronic inflammatory demyelinating polyneuropathy",
                    "vitamin deficiency neuropathy",
                    "toxic neuropathy"
                ],
                ncsStudies: [
                    {
                        name: "Median Sensory (Wrist-Digit 3)",
                        result: "abnormal",
                        findings: "Prolonged peak latency: 4.8 ms (normal <3.4 ms). Markedly reduced amplitude: 4 μV (normal >15 μV)",
                        interpretation: "Severe median sensory nerve dysfunction"
                    },
                    {
                        name: "Ulnar Sensory (Wrist-Digit 5)",
                        result: "abnormal",
                        findings: "Prolonged peak latency: 4.2 ms (normal <3.4 ms). Reduced amplitude: 6 μV (normal >10 μV)",
                        interpretation: "Severe ulnar sensory nerve dysfunction"
                    },
                    {
                        name: "Sural Sensory",
                        result: "abnormal",
                        findings: "No response obtained",
                        interpretation: "Severe sural sensory nerve dysfunction"
                    },
                    {
                        name: "Fibular Motor (EDB)",
                        result: "abnormal",
                        findings: "Prolonged distal latency: 7.2 ms (normal <6.5 ms). Markedly reduced amplitude: 0.8 mV (normal >2.5 mV)",
                        interpretation: "Severe fibular motor nerve dysfunction"
                    }
                ],
                requiresEMG: false,
                correctDiagnosis: "Diabetic Distal Sensorimotor Polyneuropathy",
                explanation: "Length-dependent sensorimotor polyneuropathy with stocking-glove distribution, absent reflexes, and uniform slowing on NCS studies in a patient with long-standing diabetes confirms diabetic polyneuropathy."
            },
            'myopathy': {
                title: "Progressive Proximal Weakness",
                presentation: {
                    age: 38,
                    gender: "Female",
                    occupation: "Teacher",
                    chiefComplaint: "6-month history of difficulty climbing stairs and lifting objects overhead",
                    history: "Gradual onset of weakness affecting shoulders and hips. Difficulty getting up from chairs and climbing stairs. No pain initially, but now has muscle aches. Denies rash or swallowing difficulties. No family history of muscle disease.",
                    pmh: "Hypothyroidism",
                    medications: "Levothyroxine"
                },
                physicalExam: {
                    inspection: "No obvious muscle atrophy. No rash or skin changes observed.",
                    palpation: "Mild tenderness in proximal muscle groups. No fasciculations palpated.",
                    rom: "Full passive ROM. Limited active ROM due to weakness.",
                    strength: "Proximal weakness: deltoids 3/5, hip flexors 3/5, neck flexors 4/5. Distal strength preserved (5/5).",
                    sensation: "Normal throughout",
                    reflexes: "2+ and symmetric throughout. No pathological reflexes.",
                    specialTests: "Gowers' sign present. No Hoffmann, clonus, or spasticity"
                },
                expectedDifferential: [
                    "inflammatory myopathy",
                    "polymyositis",
                    "dermatomyositis",
                    "inclusion body myositis",
                    "thyroid myopathy",
                    "muscular dystrophy",
                    "metabolic myopathy"
                ],
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency: 3.0 ms. Normal CMAP amplitude: 8.5 mV",
                        interpretation: "Normal median nerve function"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal distal latency: 2.8 ms. Normal CMAP amplitude: 10.2 mV",
                        interpretation: "Normal ulnar nerve function"
                    },
                    {
                        name: "Fibular Motor (EDB)",
                        result: "normal",
                        findings: "Normal distal latency: 4.2 ms. Normal CMAP amplitude: 3.8 mV",
                        interpretation: "Normal fibular nerve function"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Deltoid",
                        findings: "Increased insertional activity, frequent fibrillation potentials, positive sharp waves, and complex repetitive discharges. Early recruitment with small, short-duration, polyphasic motor unit potentials",
                        interpretation: "Myopathic changes with membrane instability"
                    },
                    {
                        muscle: "Biceps",
                        findings: "Increased insertional activity, fibrillation potentials, early recruitment with small amplitude, short duration MUPs",
                        interpretation: "Myopathic changes consistent with inflammatory myopathy"
                    },
                    {
                        muscle: "Iliopsoas",
                        findings: "Increased insertional activity, abnormal spontaneous activity, early recruitment with myopathic MUPs",
                        interpretation: "Proximal myopathic involvement"
                    }
                ],
                requiresEMG: true,
                correctDiagnosis: "Inflammatory Myopathy (likely Polymyositis)",
                explanation: "Proximal muscle weakness, elevated CK (implied), normal NCS with myopathic EMG changes showing membrane instability and small, short-duration motor units in proximal muscles supports inflammatory myopathy."
            },
            'als': {
                title: "Progressive Weakness and Muscle Twitching",
                presentation: {
                    age: 58,
                    gender: "Male",
                    occupation: "Engineer",
                    chiefComplaint: "8-month history of progressive weakness in right hand and visible muscle twitching",
                    history: "Started with weakness in right hand, difficulty with fine motor tasks like writing and buttoning shirts. Recently developed weakness in left hand and noticed muscle twitching in arms. Some difficulty with speech articulation. Denies sensory symptoms or bowel/bladder dysfunction.",
                    pmh: "Hypertension",
                    medications: "Amlodipine"
                },
                physicalExam: {
                    inspection: "Visible fasciculations in bilateral thenar and hypothenar eminences, deltoids, and tongue. Mild atrophy of right first dorsal interosseous.",
                    palpation: "Fasciculations palpable in multiple muscle groups. No tenderness.",
                    rom: "Full ROM throughout",
                    strength: "Right hand intrinsics 3/5, left hand intrinsics 4/5. Grip strength reduced bilaterally. Proximal strength mildly reduced in arms.",
                    sensation: "Normal throughout",
                    reflexes: "Hyperreflexic throughout (3+). Positive Hoffmann sign bilaterally. Jaw jerk present.",
                    specialTests: "Positive Babinski bilaterally. Tongue fasciculations visible. Mild dysarthria. No clonus."
                },
                expectedDifferential: [
                    "amyotrophic lateral sclerosis",
                    "motor neuron disease",
                    "progressive muscular atrophy",
                    "primary lateral sclerosis",
                    "kennedy disease",
                    "multifocal motor neuropathy",
                    "cervical myelopathy"
                ],
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Normal distal latency: 3.4 ms. Reduced CMAP amplitude: 2.1 mV (normal >4.0 mV)",
                        interpretation: "Reduced amplitude suggesting motor axon loss"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Normal distal latency: 3.1 ms. Reduced CMAP amplitude: 3.2 mV (normal >6.0 mV)",
                        interpretation: "Reduced amplitude consistent with motor neuron loss"
                    },
                    {
                        name: "Median Sensory (Wrist-Digit 3)",
                        result: "normal",
                        findings: "Normal peak latency: 2.9 ms. Normal amplitude: 18 μV",
                        interpretation: "Normal sensory function preserved"
                    },
                    {
                        name: "Ulnar Sensory (Wrist-Digit 5)",
                        result: "normal",
                        findings: "Normal peak latency: 3.0 ms. Normal amplitude: 15 μV",
                        interpretation: "Normal sensory function preserved"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Increased insertional activity, frequent fasciculation potentials, fibrillation potentials and positive sharp waves. Reduced recruitment with large amplitude, long duration motor unit potentials",
                        interpretation: "Chronic denervation with reinnervation and ongoing fasciculations"
                    },
                    {
                        muscle: "Deltoid",
                        findings: "Fasciculation potentials, reduced recruitment with giant motor unit potentials",
                        interpretation: "Chronic reinnervation with ongoing denervation"
                    },
                    {
                        muscle: "Tongue",
                        findings: "Frequent fasciculation potentials, fibrillation potentials, reduced recruitment",
                        interpretation: "Bulbar involvement with lower motor neuron signs"
                    }
                ],
                requiresEMG: true,
                correctDiagnosis: "Amyotrophic Lateral Sclerosis (ALS)",
                explanation: "Progressive weakness with both upper motor neuron signs (hyperreflexia, Babinski) and lower motor neuron signs (fasciculations, atrophy), preserved sensation, and EMG showing widespread denervation with fasciculations confirms ALS."
            },
            'stroke': {
                title: "Acute Hemiparesis",
                presentation: {
                    age: 68,
                    gender: "Male", 
                    occupation: "Retired",
                    chiefComplaint: "Acute onset left-sided weakness and facial droop this morning",
                    history: "Patient was found by wife at 7 AM with left-sided weakness and facial droop. She reports he was normal when she went to bed at 11 PM. Patient has slurred speech but is alert and oriented. Denies headache, neck pain, or back pain. No recent trauma or illness.",
                    pmh: "Hypertension, diabetes, atrial fibrillation",
                    medications: "Lisinopril, metformin, warfarin"
                },
                physicalExam: {
                    inspection: "Left facial droop, left arm held in flexed posture",
                    palpation: "Not applicable for acute stroke evaluation", 
                    rom: "Reduced active ROM on left side due to weakness",
                    strength: "Left arm 2/5, left leg 3/5. Right side normal (5/5). Upper motor neuron pattern of weakness.",
                    sensation: "Diminished sensation on entire left side",
                    reflexes: "Hyperreflexic on left (3+). Right side normal (2+).",
                    specialTests: "Positive Babinski sign on left. Hoffman sign positive on left. Spasticity present in left arm."
                },
                expectedDifferential: [
                    "Acute cerebrovascular accident (stroke)",
                    "Brain tumor with mass effect",
                    "Intracranial hemorrhage",
                    "Todd's paralysis (post-ictal)",
                    "Complicated migraine"
                ],
                emgIndication: "NOT INDICATED",
                explanation: "This is an upper motor neuron lesion (stroke). EMG/NCS evaluate the peripheral nervous system and would be normal in isolated stroke. Clinical presentation with hyperreflexia, Babinski sign, and spasticity confirms central cause.",
                correctDiagnosis: "Acute Cerebrovascular Accident (Stroke) - EMG NOT INDICATED",
                educationalNote: "EMG/NCS studies are used to evaluate the peripheral nervous system (nerve roots, plexuses, peripheral nerves, neuromuscular junction, and muscle). In pure upper motor neuron lesions like stroke, EMG would be normal and is not clinically indicated."
            },
            'combined': {
                title: "Bilateral Hand Numbness and Weakness",
                presentation: {
                    age: 52,
                    gender: "Female",
                    occupation: "Assembly Line Worker",
                    chiefComplaint: "6-month history of bilateral hand numbness, tingling, and weakness affecting multiple fingers",
                    history: "Started with classic carpal tunnel symptoms (thumb/index/middle finger numbness, worse at night). Over past 2 months, developed ring/little finger numbness and weakness pinching with thumb-index finger. Works on assembly line with repetitive elbow flexion and wrist extension. Symptoms now affect both median and ulnar distributions bilaterally.",
                    pmh: "Osteoarthritis, obesity",
                    medications: "Ibuprofen PRN"
                },
                physicalExam: {
                    inspection: "Mild thenar and hypothenar atrophy bilaterally",
                    palpation: "Tender over bilateral carpal tunnels and cubital tunnels",
                    rom: "Full ROM at all joints",
                    strength: "Thenar weakness (4/5) and interosseous weakness (4/5) bilaterally",
                    sensation: "Decreased sensation in median (digits 1-3) and ulnar (digits 4-5) distributions bilaterally",
                    reflexes: "2+ and symmetric throughout",
                    specialTests: "Positive Tinel's and Phalen's signs at wrists bilaterally. Positive elbow flexion test bilaterally."
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Prolonged distal latencies (5.2ms right, 4.8ms left), reduced amplitudes",
                        interpretation: "Bilateral median nerve dysfunction at wrist level"
                    },
                    {
                        name: "Median Sensory (digit 2)",
                        result: "abnormal", 
                        findings: "Prolonged peak latencies (4.1ms right, 3.9ms left), reduced amplitudes",
                        interpretation: "Median sensory nerve involvement at wrist"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Conduction velocity slowing across elbow (42 m/s right, 45 m/s left)",
                        interpretation: "Mild bilateral ulnar nerve dysfunction at elbow level"
                    },
                    {
                        name: "Ulnar Sensory (digit 5)",
                        result: "abnormal",
                        findings: "Reduced amplitudes, normal latencies",
                        interpretation: "Mild sensory involvement at elbow"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Chronic denervation with reinnervation changes",
                        interpretation: "Chronic median nerve dysfunction"
                    },
                    {
                        muscle: "First dorsal interosseous", 
                        findings: "Mild denervation changes",
                        interpretation: "Ulnar nerve dysfunction"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Combined Carpal Tunnel Syndrome and Cubital Tunnel Syndrome (bilateral)",
                explanation: "This case demonstrates the classic 'double crush' phenomenon where a worker with repetitive motions develops entrapments at multiple sites. Both median (carpal tunnel) and ulnar (cubital tunnel) neuropathies can coexist, especially in occupational settings."
            },
            'c5radiculopathy': {
                title: "Shoulder Pain and Arm Weakness",
                presentation: {
                    age: 41,
                    gender: "Male",
                    occupation: "Construction Worker",
                    chiefComplaint: "3-week history of severe neck pain radiating to right shoulder and arm with weakness",
                    history: "Lifting heavy materials 3 weeks ago, felt immediate sharp neck pain. Pain radiates from neck to right shoulder, lateral arm, and thumb. Weakness lifting arm overhead and external rotation. Coughing and sneezing worsen pain. No numbness in hand.",
                    pmh: "Previous back injury 10 years ago",
                    medications: "Ibuprofen, muscle relaxants"
                },
                physicalExam: {
                    inspection: "Holding right arm in adducted position",
                    palpation: "Cervical paraspinal muscle spasm, tender over C4-C5 region",
                    rom: "Limited cervical extension and right lateral flexion",
                    strength: "Deltoid 3/5, biceps 4/5, supraspinatus 3/5 on right. Left side normal.",
                    sensation: "Decreased sensation over lateral shoulder (C5 dermatome)",
                    reflexes: "Biceps reflex diminished (1+) on right. Triceps and brachioradialis normal.",
                    specialTests: "Positive Spurling's test on right"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency, amplitude, and conduction velocity",
                        interpretation: "Normal median nerve function"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal parameters throughout",
                        interpretation: "Normal ulnar nerve function"
                    },
                    {
                        name: "Radial Motor (EIP)",
                        result: "normal",
                        findings: "Normal distal latency and amplitude",
                        interpretation: "Normal radial nerve function"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Cervical paraspinals (C4-C5)",
                        findings: "Positive sharp waves and fibrillations",
                        interpretation: "Acute denervation"
                    },
                    {
                        muscle: "Deltoid",
                        findings: "Positive sharp waves, reduced recruitment",
                        interpretation: "C5 root involvement"
                    },
                    {
                        muscle: "Biceps",
                        findings: "Mild denervation changes",
                        interpretation: "C5-C6 involvement"
                    },
                    {
                        muscle: "Supraspinatus",
                        findings: "Active denervation",
                        interpretation: "C5 root lesion"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Right C5 Radiculopathy",
                explanation: "Classic C5 radiculopathy presentation with shoulder/deltoid weakness, diminished biceps reflex, and lateral shoulder sensory loss. Normal peripheral NCS with denervation in C5 myotomes and cervical paraspinals confirms root level pathology."
            },
            'l5radiculopathy': {
                title: "Lower Back Pain with Leg Weakness",
                presentation: {
                    age: 38,
                    gender: "Female", 
                    occupation: "Nurse",
                    chiefComplaint: "6-week history of lower back pain radiating down right leg with foot weakness",
                    history: "Gradual onset lower back pain after lifting patient. Pain radiates from low back down posterior/lateral right leg to dorsum of foot. Weakness dorsiflexing foot, difficulty walking on heels. Numbness between great and second toe. Pain worse with sitting, better with walking.",
                    pmh: "Previous episode of low back pain 5 years ago, resolved",
                    medications: "Naproxen, gabapentin"
                },
                physicalExam: {
                    inspection: "Slightly antalgic gait favoring right leg",
                    palpation: "Lumbar paraspinal muscle spasm, tender over L4-L5 region",
                    rom: "Limited lumbar flexion and extension",
                    strength: "Extensor hallucis longus 3/5, tibialis anterior 4/5 on right. Other muscles normal.",
                    sensation: "Decreased sensation in L5 dermatome (lateral leg, dorsum of foot, web space between toes 1-2)",
                    reflexes: "Achilles and patellar reflexes symmetric and normal",
                    specialTests: "Positive straight leg raise at 45 degrees on right"
                },
                ncsStudies: [
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "Reduced amplitude (2.1 mV, normal >2.5 mV)",
                        interpretation: "Mild axonal loss affecting deep peroneal nerve"
                    },
                    {
                        name: "Tibial Motor (AH)",
                        result: "normal",
                        findings: "Normal amplitude and conduction velocity",
                        interpretation: "No tibial nerve involvement"
                    },
                    {
                        name: "Superficial Peroneal Sensory",
                        result: "abnormal",
                        findings: "Reduced amplitude on right compared to left",
                        interpretation: "Sensory involvement"
                    },
                    {
                        name: "Sural Sensory",
                        result: "normal",
                        findings: "Normal amplitude and velocity bilaterally",
                        interpretation: "S1 distribution spared"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Lumbar paraspinals (L4-L5)",
                        findings: "Positive sharp waves and fibrillations",
                        interpretation: "Acute denervation"
                    },
                    {
                        muscle: "Tibialis anterior",
                        findings: "Positive sharp waves, reduced recruitment",
                        interpretation: "L4-L5 root involvement"
                    },
                    {
                        muscle: "Extensor hallucis longus",
                        findings: "Active denervation, severely reduced recruitment",
                        interpretation: "L5 root lesion"
                    },
                    {
                        muscle: "Gluteus medius",
                        findings: "Mild denervation changes",
                        interpretation: "Superior gluteal nerve (L5 root)"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Right L5 Radiculopathy",
                explanation: "L5 radiculopathy with classic dorsiflexor weakness, sensory loss in L5 distribution, and EMG showing denervation in L5 myotomes with sparing of S1 muscles. Reduced peroneal motor amplitude reflects axonal loss from chronic root compression."
            },
            'c7radiculopathy': {
                title: "Arm Pain with Hand Weakness",
                presentation: {
                    age: 46,
                    gender: "Male",
                    occupation: "Office Manager",
                    chiefComplaint: "4-week history of neck pain radiating down arm with hand and wrist weakness",
                    history: "Gradual onset neck pain radiating down posterior arm to middle finger. Weakness extending wrist and fingers. Difficulty opening jars and gripping objects. Pain worse with neck extension. No trauma. Desk job with poor ergonomics.",
                    pmh: "Cervical disc disease on MRI 2 years ago",
                    medications: "Tramadol, prednisone taper"
                },
                physicalExam: {
                    inspection: "No visible atrophy",
                    palpation: "Cervical paraspinal tenderness at C6-C7 level",
                    rom: "Limited cervical extension",
                    strength: "Triceps 4/5, wrist extensors 3/5, finger extensors 4/5 on right",
                    sensation: "Decreased sensation in middle finger (C7 dermatome)",
                    reflexes: "Triceps reflex diminished (1+) on right. Biceps and brachioradialis normal.",
                    specialTests: "Positive Spurling's test, negative Tinel's at wrist/elbow"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency and amplitude",
                        interpretation: "Normal median nerve function"
                    },
                    {
                        name: "Radial Motor (EIP)",
                        result: "abnormal",
                        findings: "Reduced amplitude (3.2 mV, normal >4.0 mV)",
                        interpretation: "Mild axonal loss in posterior interosseous nerve"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal parameters",
                        interpretation: "Normal ulnar nerve function"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Cervical paraspinals (C6-C7)",
                        findings: "Positive sharp waves and fibrillations",
                        interpretation: "Acute denervation"
                    },
                    {
                        muscle: "Triceps",
                        findings: "Positive sharp waves, reduced recruitment",
                        interpretation: "C7 root involvement"
                    },
                    {
                        muscle: "Extensor carpi radialis",
                        findings: "Active denervation changes",
                        interpretation: "C7 root lesion"
                    },
                    {
                        muscle: "Extensor digitorum communis",
                        findings: "Denervation with reduced recruitment",
                        interpretation: "Posterior interosseous nerve (C7 root)"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Right C7 Radiculopathy",
                explanation: "C7 radiculopathy with classic triceps weakness, diminished triceps reflex, and middle finger sensory loss. EMG shows denervation in C7 myotomes including triceps and wrist/finger extensors, with sparing of C5, C6, C8, and T1 muscles."
            },
            'plexopathy': {
                title: "Arm Weakness After Motorcycle Accident",
                presentation: {
                    age: 28,
                    gender: "Male",
                    occupation: "Motorcycle Mechanic",
                    chiefComplaint: "3-month history of right arm weakness and numbness following motorcycle accident",
                    history: "High-speed motorcycle accident 3 months ago with right shoulder trauma. Initially had complete right arm paralysis. Some recovery occurred but persistent weakness and numbness remain. Weakness affects entire arm from shoulder down. Numbness along medial arm and forearm.",
                    pmh: "No significant past medical history",
                    medications: "Gabapentin, physical therapy"
                },
                physicalExam: {
                    inspection: "Winged scapula on right, mild atrophy of hand intrinsics",
                    palpation: "Supraclavicular tenderness, no brachial plexus mass",
                    rom: "Limited shoulder abduction and flexion",
                    strength: "Deltoid 2/5, biceps 3/5, triceps 3/5, hand intrinsics 2/5 on right",
                    sensation: "Decreased sensation along medial arm and forearm (C8-T1 distribution)",
                    reflexes: "Absent biceps and triceps reflexes on right",
                    specialTests: "Positive Tinel's sign over brachial plexus"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Severely reduced amplitude (0.8 mV), prolonged latency",
                        interpretation: "Severe median nerve dysfunction"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Severely reduced amplitude (1.2 mV)",
                        interpretation: "Severe ulnar nerve dysfunction"
                    },
                    {
                        name: "Radial Motor (EIP)",
                        result: "abnormal",
                        findings: "Reduced amplitude (2.1 mV)",
                        interpretation: "Moderate radial nerve dysfunction"
                    },
                    {
                        name: "Medial Antebrachial Cutaneous",
                        result: "abnormal",
                        findings: "Absent sensory response",
                        interpretation: "Medial cord/lower trunk involvement"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Cervical paraspinals",
                        findings: "Normal",
                        interpretation: "Root level spared"
                    },
                    {
                        muscle: "Serratus anterior",
                        findings: "Denervation changes",
                        interpretation: "Long thoracic nerve involvement"
                    },
                    {
                        muscle: "Hand intrinsics",
                        findings: "Severe denervation with poor reinnervation",
                        interpretation: "Lower trunk/medial cord lesion"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Right Brachial Plexopathy (Lower Trunk/Medial Cord Pattern)",
                explanation: "Post-traumatic brachial plexopathy affecting primarily the lower trunk/medial cord, causing weakness in C8-T1 distribution with sparing of cervical paraspinals (distinguishing from root avulsion). Pattern of multiple nerve involvement localizes to plexus level."
            },
            's1radiculopathy': {
                title: "Lower Back Pain with Calf Weakness",
                presentation: {
                    age: 44,
                    gender: "Male",
                    occupation: "Warehouse Worker", 
                    chiefComplaint: "2-month history of lower back pain radiating down leg with calf weakness",
                    history: "Gradual onset lower back pain after lifting boxes. Pain radiates from low back down posterior leg to lateral foot. Difficulty walking on tiptoes and going up stairs. Numbness in lateral foot and little toe. Pain worse with prolonged standing.",
                    pmh: "Previous lumbar strain 3 years ago",
                    medications: "Ibuprofen, cyclobenzaprine"
                },
                physicalExam: {
                    inspection: "Slightly antalgic gait, difficulty with toe walking",
                    palpation: "Lumbar paraspinal muscle spasm, tender over L5-S1 region",
                    rom: "Limited lumbar flexion",
                    strength: "Plantarflexors 4/5, gastrocnemius 3/5 on right. EHL and tibialis anterior normal.",
                    sensation: "Decreased sensation in S1 dermatome (lateral foot, little toe)",
                    reflexes: "Achilles reflex absent on right (0+). Patellar normal.",
                    specialTests: "Positive straight leg raise at 50 degrees on right"
                },
                ncsStudies: [
                    {
                        name: "Tibial Motor (AH)",
                        result: "abnormal",
                        findings: "Reduced amplitude (8.2 mV, normal >10 mV)",
                        interpretation: "Mild axonal loss affecting tibial nerve"
                    },
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "normal",
                        findings: "Normal amplitude and conduction velocity",
                        interpretation: "L5 distribution spared"
                    },
                    {
                        name: "Sural Sensory",
                        result: "abnormal",
                        findings: "Reduced amplitude on right compared to left",
                        interpretation: "S1 sensory involvement"
                    },
                    {
                        name: "H-reflex",
                        result: "abnormal",
                        findings: "Absent H-reflex on right, normal on left",
                        interpretation: "S1 root dysfunction"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Lumbar paraspinals (L5-S1)",
                        findings: "Positive sharp waves and fibrillations",
                        interpretation: "Acute denervation"
                    },
                    {
                        muscle: "Gastrocnemius medial head",
                        findings: "Positive sharp waves, reduced recruitment",
                        interpretation: "S1 root involvement"
                    },
                    {
                        muscle: "Gluteus maximus",
                        findings: "Denervation changes",
                        interpretation: "Inferior gluteal nerve (S1 root)"
                    },
                    {
                        muscle: "Tibialis anterior",
                        findings: "Normal",
                        interpretation: "L5 distribution spared"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Right S1 Radiculopathy",
                explanation: "S1 radiculopathy with classic plantarflexor weakness, absent Achilles reflex, and lateral foot sensory loss. H-reflex absence is a sensitive early finding in S1 radiculopathy. EMG shows denervation in S1 myotomes with sparing of L5 muscles."
            },
            'radialneuropathy': {
                title: "Wrist Drop After Saturday Night",
                presentation: {
                    age: 35,
                    gender: "Male",
                    occupation: "Software Developer",
                    chiefComplaint: "Acute onset inability to extend wrist and fingers after falling asleep with arm over chair",
                    history: "Woke up yesterday morning unable to extend right wrist or fingers. Had been drinking the night before and fell asleep in chair with right arm draped over the back (Saturday night palsy). No pain, just weakness. Can still flex fingers and wrist normally.",
                    pmh: "No significant medical history",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "Right wrist drop, inability to extend fingers at MCP joints",
                    palpation: "No tenderness over spiral groove or elbow",
                    rom: "Full passive ROM, limited active extension",
                    strength: "Wrist extensors 0/5, finger extensors 0/5, triceps 5/5, brachioradialis 5/5",
                    sensation: "Decreased sensation in first web space (superficial radial distribution)",
                    reflexes: "Triceps reflex normal. Brachioradialis present but weak due to positioning.",
                    specialTests: "Negative Tinel's at elbow, positive wrist drop sign"
                },
                ncsStudies: [
                    {
                        name: "Radial Motor (EIP)",
                        result: "abnormal",
                        findings: "No response elicitable from posterior interosseous nerve",
                        interpretation: "Complete conduction block in radial nerve"
                    },
                    {
                        name: "Radial Motor (BR)",
                        result: "normal",
                        findings: "Normal amplitude and latency to brachioradialis",
                        interpretation: "Lesion distal to brachioradialis branch"
                    },
                    {
                        name: "Superficial Radial Sensory",
                        result: "abnormal",
                        findings: "Absent sensory response",
                        interpretation: "Superficial radial nerve involvement"
                    },
                    {
                        name: "Median/Ulnar studies",
                        result: "normal",
                        findings: "All parameters normal",
                        interpretation: "Other nerves unaffected"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Extensor carpi radialis longus",
                        findings: "Normal (innervated above spiral groove)",
                        interpretation: "Lesion at spiral groove level"
                    },
                    {
                        muscle: "Extensor carpi radialis brevis",
                        findings: "No voluntary activity",
                        interpretation: "Posterior interosseous nerve involvement"
                    },
                    {
                        muscle: "Extensor digitorum communis",
                        findings: "No voluntary activity",
                        interpretation: "Complete posterior interosseous nerve palsy"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "beginner",
                correctDiagnosis: "Radial Neuropathy at Spiral Groove (Saturday Night Palsy)",
                explanation: "Classic compression of radial nerve at spiral groove from prolonged pressure. Spares triceps and ECRL (innervated proximal to compression) but affects posterior interosseous nerve causing wrist and finger extensor weakness with sensory loss in superficial radial distribution."
            },
            'peronealpalsy': {
                title: "Foot Drop After Knee Surgery",
                presentation: {
                    age: 29,
                    gender: "Female",
                    occupation: "Teacher",
                    chiefComplaint: "Inability to lift foot up and numbness on top of foot since knee arthroscopy 2 weeks ago",
                    history: "Underwent knee arthroscopy 2 weeks ago for meniscal tear. Woke up from surgery with foot drop and numbness over dorsum of foot. Initially attributed to positioning during surgery. No improvement since discharge. Trips frequently due to toe catching.",
                    pmh: "Right meniscal tear",
                    medications: "Ibuprofen, physical therapy"
                },
                physicalExam: {
                    inspection: "Right foot drop, steppage gait pattern",
                    palpation: "Tenderness over fibular head, no calf tenderness",
                    rom: "Full passive dorsiflexion, limited active dorsiflexion",
                    strength: "Tibialis anterior 1/5, EHL 2/5, eversion 2/5. Plantarflexion and inversion normal.",
                    sensation: "Decreased sensation over dorsum of foot and lateral leg",
                    reflexes: "Achilles reflex normal. No patellar reflex abnormality.",
                    specialTests: "Positive Tinel's sign over fibular head"
                },
                ncsStudies: [
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "Prolonged distal latency (7.2ms), reduced amplitude (0.8 mV)",
                        interpretation: "Severe peroneal nerve dysfunction at fibular head level"
                    },
                    {
                        name: "Peroneal Motor (TA)",
                        result: "abnormal",
                        findings: "No response elicitable",
                        interpretation: "Complete conduction block to deep peroneal nerve"
                    },
                    {
                        name: "Superficial Peroneal Sensory",
                        result: "abnormal",
                        findings: "Absent sensory response",
                        interpretation: "Superficial peroneal nerve involvement"
                    },
                    {
                        name: "Tibial Motor (AH)",
                        result: "normal",
                        findings: "Normal amplitude and conduction velocity",
                        interpretation: "Tibial nerve spared"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Tibialis anterior",
                        findings: "No voluntary activity, denervation changes",
                        interpretation: "Complete deep peroneal nerve palsy"
                    },
                    {
                        muscle: "Extensor digitorum longus",
                        findings: "No voluntary activity",
                        interpretation: "Deep peroneal nerve involvement"
                    },
                    {
                        muscle: "Peroneus longus",
                        findings: "Denervation changes",
                        interpretation: "Superficial peroneal nerve involvement"
                    },
                    {
                        muscle: "Tibialis posterior",
                        findings: "Normal",
                        interpretation: "Tibial nerve spared"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "beginner",
                correctDiagnosis: "Common Peroneal Neuropathy at Fibular Head (Post-surgical)",
                explanation: "Iatrogenic peroneal nerve injury at fibular head from surgical positioning or compression. Complete palsy affecting both deep (dorsiflexion) and superficial (eversion) peroneal nerves with sparing of tibial nerve function."
            },
            'mg': {
                title: "Fatigable Weakness and Ptosis",
                presentation: {
                    age: 31,
                    gender: "Female",
                    occupation: "Graphic Designer",
                    chiefComplaint: "3-month history of fatigue, droopy eyelids, and weakness that worsens throughout the day",
                    history: "Gradual onset of fatigue and weakness that gets worse with activity and improves with rest. Noticed droopy eyelids, especially in evening. Difficulty chewing food by end of meals. Voice becomes nasal after talking for extended periods. Shortness of breath with minimal exertion.",
                    pmh: "Thyroid disease (Hashimoto's thyroiditis)",
                    medications: "Levothyroxine"
                },
                physicalExam: {
                    inspection: "Bilateral ptosis, worse on left. Facial weakness.",
                    palpation: "No muscle tenderness or atrophy",
                    rom: "Full ROM at all joints",
                    strength: "Proximal weakness (4/5) that worsens with repetitive testing. Normal strength initially.",
                    sensation: "Normal throughout",
                    reflexes: "Normal (2+) throughout",
                    specialTests: "Positive ice pack test (ptosis improves), positive edrophonium test"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency and amplitude",
                        interpretation: "Normal peripheral nerve function"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal parameters",
                        interpretation: "No nerve involvement"
                    },
                    {
                        name: "Repetitive Nerve Stimulation (3Hz)",
                        result: "abnormal",
                        findings: "15% decrement in amplitude with slow repetitive stimulation",
                        interpretation: "Neuromuscular junction dysfunction"
                    },
                    {
                        name: "Single Fiber EMG",
                        result: "abnormal",
                        findings: "Increased jitter and blocking in multiple muscles",
                        interpretation: "Neuromuscular transmission defect"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Deltoid",
                        findings: "Normal motor unit morphology, normal recruitment",
                        interpretation: "No myopathy"
                    },
                    {
                        muscle: "Biceps",
                        findings: "Normal spontaneous activity and motor units",
                        interpretation: "No denervation"
                    },
                    {
                        muscle: "Orbicularis oculi",
                        findings: "Increased jitter on single fiber EMG",
                        interpretation: "Facial muscle involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Myasthenia Gravis (Generalized)",
                explanation: "Classic presentation of myasthenia gravis with fatigable weakness, ptosis, and bulbar symptoms. Repetitive nerve stimulation shows decremental response characteristic of postsynaptic neuromuscular junction disorder. Single fiber EMG confirms transmission defect."
            },
            'tarsal': {
                title: "Foot Pain and Numbness",
                presentation: {
                    age: 42,
                    gender: "Female",
                    occupation: "Nurse",
                    chiefComplaint: "6-month history of burning foot pain and numbness, worse at night",
                    history: "Gradual onset burning pain and numbness on bottom of foot, radiating to toes. Pain worse at night and when wearing shoes. Standing for long periods at work exacerbates symptoms. Some relief with rest and elevation. No back pain or leg symptoms.",
                    pmh: "Diabetes mellitus type 2, well-controlled",
                    medications: "Metformin, gabapentin"
                },
                physicalExam: {
                    inspection: "No visible deformity or swelling",
                    palpation: "Tenderness over tarsal tunnel, positive Tinel's sign",
                    rom: "Full ankle ROM",
                    strength: "Intrinsic foot muscles weak (4/5), other muscles normal",
                    sensation: "Decreased sensation on plantar surface of foot",
                    reflexes: "Achilles reflex normal bilaterally",
                    specialTests: "Positive Tinel's sign over tarsal tunnel, negative straight leg raise"
                },
                ncsStudies: [
                    {
                        name: "Tibial Motor (AH)",
                        result: "normal",
                        findings: "Normal amplitude and conduction velocity to proximal muscles",
                        interpretation: "Proximal tibial nerve normal"
                    },
                    {
                        name: "Medial Plantar Sensory",
                        result: "abnormal",
                        findings: "Prolonged peak latency (4.8ms), reduced amplitude",
                        interpretation: "Medial plantar nerve compression"
                    },
                    {
                        name: "Lateral Plantar Sensory",
                        result: "abnormal",
                        findings: "Reduced amplitude compared to contralateral side",
                        interpretation: "Lateral plantar nerve involvement"
                    },
                    {
                        name: "Sural Sensory",
                        result: "normal",
                        findings: "Normal amplitude and velocity",
                        interpretation: "Sural nerve spared"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor hallucis",
                        findings: "Denervation changes with reduced recruitment",
                        interpretation: "Medial plantar nerve involvement"
                    },
                    {
                        muscle: "Flexor digitorum brevis",
                        findings: "Mild denervation changes",
                        interpretation: "Lateral plantar nerve involvement"
                    },
                    {
                        muscle: "Tibialis posterior",
                        findings: "Normal",
                        interpretation: "Proximal tibial nerve spared"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Tarsal Tunnel Syndrome (Tibial Neuropathy at Ankle)",
                explanation: "Compression of tibial nerve and its branches (medial and lateral plantar nerves) at the tarsal tunnel. Prolonged standing and diabetes are risk factors. Studies show distal tibial nerve involvement with sparing of proximal branches."
            },
            'mildcts': {
                title: "Early Hand Tingling in Pregnancy",
                presentation: {
                    age: 28,
                    gender: "Female",
                    occupation: "Teacher",
                    chiefComplaint: "3-week history of mild tingling in fingers, mainly at night",
                    history: "Currently 32 weeks pregnant. Started noticing mild tingling in thumb, index, and middle fingers that wakes her up at night. Shaking hands provides some relief. No weakness or dropping objects. Symptoms are intermittent and mild. No previous hand problems.",
                    pmh: "Pregnant (G2P1), no complications",
                    medications: "Prenatal vitamins"
                },
                physicalExam: {
                    inspection: "No visible atrophy or deformity",
                    palpation: "Mild tenderness over carpal tunnel, no swelling",
                    rom: "Full ROM at all joints",
                    strength: "5/5 strength throughout, normal pinch strength",
                    sensation: "Subjective mild numbness in median distribution, objective sensation intact",
                    reflexes: "2+ and symmetric throughout",
                    specialTests: "Mildly positive Phalen's test (symptoms at 45 seconds), negative Tinel's sign"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency (3.2ms), normal amplitude (8.5 mV)",
                        interpretation: "No motor involvement"
                    },
                    {
                        name: "Median Sensory (digit 2)",
                        result: "abnormal",
                        findings: "Mildly prolonged peak latency (3.8ms, normal <3.5ms), normal amplitude",
                        interpretation: "Mild median sensory nerve dysfunction"
                    },
                    {
                        name: "Median Sensory (palm-wrist)",
                        result: "abnormal",
                        findings: "Prolonged latency difference (0.6ms, normal <0.4ms)",
                        interpretation: "Mild median nerve dysfunction at wrist level"
                    },
                    {
                        name: "Ulnar Sensory (digit 5)",
                        result: "normal",
                        findings: "Normal amplitude and latency",
                        interpretation: "Normal ulnar function"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Normal spontaneous activity, normal motor units",
                        interpretation: "No denervation"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "beginner",
                correctDiagnosis: "Mild Carpal Tunnel Syndrome (Pregnancy-related)",
                explanation: "Early/mild CTS with purely sensory findings. Pregnancy-related fluid retention commonly causes reversible median nerve compression. Palm-wrist comparison study is sensitive for early CTS when routine sensory studies are borderline."
            },
            'severects': {
                title: "Severe Hand Weakness and Atrophy",
                presentation: {
                    age: 58,
                    gender: "Male",
                    occupation: "Retired Mechanic",
                    chiefComplaint: "2-year history of progressive hand weakness with visible muscle wasting",
                    history: "Started with nighttime numbness 2 years ago, gradually worsened. Now has constant numbness in thumb, index, and middle fingers. Significant weakness gripping tools, difficulty with buttons and fine motor tasks. Notices visible muscle loss in thumb area. Denies trauma or neck pain.",
                    pmh: "Diabetes mellitus type 2, osteoarthritis",
                    medications: "Metformin, insulin"
                },
                physicalExam: {
                    inspection: "Marked thenar atrophy, visible muscle wasting",
                    palpation: "Firm, non-tender mass over carpal tunnel",
                    rom: "Full ROM but weak thumb opposition",
                    strength: "Abductor pollicis brevis 2/5, opponens pollicis 2/5, severe pinch weakness",
                    sensation: "Complete sensory loss in median distribution",
                    reflexes: "2+ and symmetric throughout",
                    specialTests: "Unable to perform Phalen's test due to weakness, no Tinel's sign"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Severely prolonged distal latency (8.1ms), markedly reduced amplitude (1.2 mV)",
                        interpretation: "Severe median motor nerve dysfunction"
                    },
                    {
                        name: "Median Sensory (digit 2)",
                        result: "abnormal",
                        findings: "No sensory response elicitable",
                        interpretation: "Severe median sensory nerve dysfunction"
                    },
                    {
                        name: "Median Motor (FPL)",
                        result: "abnormal",
                        findings: "Prolonged latency, reduced amplitude",
                        interpretation: "Proximal median nerve involvement"
                    },
                    {
                        name: "Ulnar Motor/Sensory",
                        result: "normal",
                        findings: "All parameters normal",
                        interpretation: "Ulnar nerve spared"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Severe chronic denervation with poor reinnervation",
                        interpretation: "Severe chronic median nerve dysfunction"
                    },
                    {
                        muscle: "Opponens pollicis",
                        findings: "Chronic denervation changes",
                        interpretation: "Recurrent motor branch involvement"
                    },
                    {
                        muscle: "Flexor pollicis longus",
                        findings: "Chronic denervation",
                        interpretation: "Anterior interosseous nerve involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "beginner",
                correctDiagnosis: "Severe Carpal Tunnel Syndrome with Thenar Atrophy",
                explanation: "End-stage CTS with severe motor and sensory involvement, thenar atrophy, and poor prognosis for recovery. Diabetes is a risk factor for more severe neuropathy. Surgical decompression urgent to prevent further deterioration."
            },
            'acutecutspost': {
                title: "Acute Hand Numbness After Elbow Fracture",
                presentation: {
                    age: 24,
                    gender: "Male",
                    occupation: "Student",
                    chiefComplaint: "Acute onset numbness and weakness in hand 3 days after elbow fracture surgery",
                    history: "Fell off bicycle 1 week ago, sustained elbow fracture requiring ORIF. Surgery went well initially. Three days post-op, developed acute numbness in ring and little fingers with weakness pinching. No pre-surgical hand symptoms. Concerned about nerve injury.",
                    pmh: "No significant medical history",
                    medications: "Oxycodone, ibuprofen"
                },
                physicalExam: {
                    inspection: "Surgical incision healing well, mild swelling around elbow",
                    palpation: "Tender over surgical site, positive Tinel's over cubital tunnel",
                    rom: "Limited elbow flexion due to post-surgical restrictions",
                    strength: "Interosseous muscles 3/5, FDP (ring/little) 4/5, FCU 4/5",
                    sensation: "Decreased sensation in ulnar distribution (ring/little fingers)",
                    reflexes: "Normal throughout",
                    specialTests: "Positive elbow flexion test, positive Tinel's at cubital tunnel"
                },
                ncsStudies: [
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Conduction block across elbow (50% amplitude drop), normal distal latency",
                        interpretation: "Acute ulnar nerve dysfunction at elbow level"
                    },
                    {
                        name: "Ulnar Motor (FDI)",
                        result: "abnormal",
                        findings: "Reduced amplitude with conduction block",
                        interpretation: "Deep motor branch involvement"
                    },
                    {
                        name: "Ulnar Sensory (digit 5)",
                        result: "abnormal",
                        findings: "Severely reduced amplitude",
                        interpretation: "Ulnar sensory involvement"
                    },
                    {
                        name: "Median studies",
                        result: "normal",
                        findings: "All parameters normal",
                        interpretation: "Median nerve unaffected"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Reduced recruitment, no denervation (too early)",
                        interpretation: "Acute ulnar nerve dysfunction"
                    },
                    {
                        muscle: "Flexor carpi ulnaris",
                        findings: "Reduced recruitment",
                        interpretation: "Ulnar nerve at elbow level"
                    },
                    {
                        muscle: "Flexor digitorum profundus (ring)",
                        findings: "Mildly reduced recruitment",
                        interpretation: "Ulnar nerve involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Acute Post-Surgical Cubital Tunnel Syndrome",
                explanation: "Iatrogenic ulnar neuropathy following elbow surgery, likely from surgical trauma, swelling, or positioning. Conduction block pattern suggests compressive/demyelinating injury with potential for recovery if decompressed early."
            },
            'lumboplexopathy': {
                title: "Hip Pain with Leg Weakness After Surgery",
                presentation: {
                    age: 67,
                    gender: "Female",
                    occupation: "Retired",
                    chiefComplaint: "Right leg weakness and numbness following hip replacement surgery 6 weeks ago",
                    history: "Underwent right total hip replacement 6 weeks ago for severe arthritis. Post-operatively developed weakness in right leg, difficulty walking, and numbness over anterior thigh. Initially attributed to surgical pain but weakness persists. Can't lift leg straight up or extend knee strongly.",
                    pmh: "Osteoarthritis, hypertension",
                    medications: "Lisinopril, tramadol, physical therapy"
                },
                physicalExam: {
                    inspection: "Surgical scar healing well, mild quadriceps atrophy",
                    palpation: "No tenderness over surgical site, no palpable masses",
                    rom: "Limited hip flexion due to weakness",
                    strength: "Hip flexors 2/5, quadriceps 3/5, hip adductors 3/5. Normal ankle dorsiflexion.",
                    sensation: "Decreased sensation over anterior thigh and medial leg",
                    reflexes: "Absent patellar reflex on right (0+). Achilles normal.",
                    specialTests: "Negative straight leg raise, positive femoral stretch test"
                },
                ncsStudies: [
                    {
                        name: "Femoral Motor (Quadriceps)",
                        result: "abnormal",
                        findings: "Reduced amplitude (4.2 mV, normal >6 mV)",
                        interpretation: "Femoral nerve dysfunction"
                    },
                    {
                        name: "Lateral Femoral Cutaneous",
                        result: "abnormal",
                        findings: "Absent sensory response",
                        interpretation: "Lateral femoral cutaneous nerve involvement"
                    },
                    {
                        name: "Saphenous Sensory",
                        result: "abnormal",
                        findings: "Reduced amplitude",
                        interpretation: "Femoral nerve sensory branch involvement"
                    },
                    {
                        name: "Peroneal/Tibial studies",
                        result: "normal",
                        findings: "Normal amplitudes and velocities",
                        interpretation: "L5-S1 distribution spared"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Lumbar paraspinals",
                        findings: "Normal",
                        interpretation: "Root level spared"
                    },
                    {
                        muscle: "Iliopsoas",
                        findings: "Denervation changes",
                        interpretation: "Femoral nerve involvement"
                    },
                    {
                        muscle: "Quadriceps",
                        findings: "Active denervation and reduced recruitment",
                        interpretation: "Femoral nerve palsy"
                    },
                    {
                        muscle: "Adductor longus",
                        findings: "Mild denervation changes",
                        interpretation: "Obturator nerve involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Lumbar Plexopathy (Post-Surgical) - Femoral and Obturator Nerve Pattern",
                explanation: "Post-surgical lumbar plexopathy affecting femoral and obturator nerves from retractor positioning, hematoma, or direct surgical trauma. Pattern of multiple nerve involvement in L2-L4 distribution with spared paraspinals localizes to plexus level."
            },
            'c8radiculopathy': {
                title: "Hand Weakness with Neck Pain",
                presentation: {
                    age: 51,
                    gender: "Female",
                    occupation: "Administrative Assistant",
                    chiefComplaint: "6-week history of neck pain radiating to hand with weakness gripping",
                    history: "Gradual onset neck pain radiating down medial arm to ring and little fingers. Weakness gripping small objects and difficulty with fine motor tasks. Pain worse with neck movement. Numbness in ring and little fingers. No trauma but poor workplace ergonomics.",
                    pmh: "Cervical spondylosis on previous MRI",
                    medications: "NSAIDs, muscle relaxants"
                },
                physicalExam: {
                    inspection: "Mild intrinsic hand muscle atrophy",
                    palpation: "Cervical paraspinal tenderness at C7-T1 level",
                    rom: "Limited cervical lateral flexion",
                    strength: "Hand intrinsics 4/5, FDP (ring/little) 4/5, grip strength reduced",
                    sensation: "Decreased sensation in C8 dermatome (ring/little fingers, medial hand)",
                    reflexes: "Normal biceps and triceps, finger flexor reflex hyperactive",
                    specialTests: "Positive Spurling's test, negative Tinel's at elbow/wrist"
                },
                ncsStudies: [
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Mildly reduced amplitude (6.8 mV, normal >8 mV)",
                        interpretation: "Mild ulnar nerve dysfunction"
                    },
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Reduced amplitude (5.2 mV, normal >6 mV)",
                        interpretation: "Median nerve involvement"
                    },
                    {
                        name: "Ulnar Sensory (digit 5)",
                        result: "abnormal",
                        findings: "Reduced amplitude bilaterally",
                        interpretation: "Ulnar sensory involvement"
                    },
                    {
                        name: "Medial Antebrachial Cutaneous",
                        result: "abnormal",
                        findings: "Absent response on affected side",
                        interpretation: "C8-T1 sensory involvement"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Cervical paraspinals (C7-T1)",
                        findings: "Positive sharp waves and fibrillations",
                        interpretation: "Acute denervation"
                    },
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Denervation changes with reduced recruitment",
                        interpretation: "C8-T1 root involvement"
                    },
                    {
                        muscle: "Abductor digiti minimi",
                        findings: "Active denervation",
                        interpretation: "C8-T1 root lesion"
                    },
                    {
                        muscle: "Flexor digitorum profundus (ring)",
                        findings: "Denervation changes",
                        interpretation: "C8 root involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Right C8 Radiculopathy",
                explanation: "C8 radiculopathy with classic hand intrinsic weakness and sensory loss in C8 distribution. Both median and ulnar nerve amplitudes reduced due to C8 root lesion affecting both nerves. Cervical paraspinal denervation confirms root level pathology."
            },
            'guyon': {
                title: "Hand Numbness After Cycling",
                presentation: {
                    age: 34,
                    gender: "Male",
                    occupation: "Accountant",
                    chiefComplaint: "Numbness and weakness in ring and little fingers after long bike ride",
                    history: "Avid cyclist who completed 100-mile ride 2 weeks ago. Developed numbness in ring and little fingers during ride that persisted. Weakness gripping and pinching with thumb and little finger. No elbow pain or neck symptoms. Uses drop handlebars with prolonged pressure on palms.",
                    pmh: "No significant medical history",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "Mild hypothenar atrophy, no interosseous atrophy",
                    palpation: "Tenderness over Guyon's canal, no elbow tenderness",
                    rom: "Full ROM at all joints",
                    strength: "Hypothenar muscles 4/5, interossei normal, FCU normal",
                    sensation: "Decreased sensation in little finger and ulnar half of ring finger",
                    reflexes: "Normal throughout",
                    specialTests: "Negative Tinel's at elbow, positive Tinel's at Guyon's canal"
                },
                ncsStudies: [
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Prolonged distal latency (4.2ms), reduced amplitude",
                        interpretation: "Deep motor branch of ulnar nerve at wrist"
                    },
                    {
                        name: "Ulnar Motor (FDI)",
                        result: "normal",
                        findings: "Normal latency and amplitude",
                        interpretation: "Deep motor branch to interossei spared"
                    },
                    {
                        name: "Ulnar Sensory (digit 5)",
                        result: "abnormal",
                        findings: "Prolonged latency, reduced amplitude",
                        interpretation: "Superficial sensory branch involvement"
                    },
                    {
                        name: "Ulnar Motor across elbow",
                        result: "normal",
                        findings: "Normal conduction velocity and amplitude",
                        interpretation: "Normal ulnar nerve function at elbow"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor digiti minimi",
                        findings: "Mild denervation changes",
                        interpretation: "Deep motor branch involvement"
                    },
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Normal",
                        interpretation: "Deep motor branch to interossei spared"
                    },
                    {
                        muscle: "Flexor carpi ulnaris",
                        findings: "Normal",
                        interpretation: "Proximal ulnar nerve normal"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal (Cyclist's Palsy)",
                explanation: "Compression of ulnar nerve at Guyon's canal from prolonged pressure on handlebars. Affects superficial sensory branch and deep motor branch to hypothenar muscles while sparing interossei (which branch more proximally). Classic cycling injury."
            },
            'lumbosacralplexopathy': {
                title: "Bilateral Leg Weakness After Prolonged Labor",
                presentation: {
                    age: 26,
                    gender: "Female",
                    occupation: "Marketing Coordinator",
                    chiefComplaint: "Bilateral leg weakness and numbness after prolonged childbirth 6 weeks ago",
                    history: "Had difficult 18-hour labor with prolonged second stage requiring forceps delivery. Immediately post-delivery noticed bilateral leg weakness and numbness. Right leg more affected than left. Difficulty walking, frequent falls. Numbness over anterior thighs and medial legs bilaterally.",
                    pmh: "Uncomplicated pregnancy until delivery",
                    medications: "Iron supplements, physical therapy"
                },
                physicalExam: {
                    inspection: "Bilateral quadriceps atrophy, more pronounced on right",
                    palpation: "No masses or tenderness over pelvis",
                    rom: "Limited hip flexion due to weakness",
                    strength: "Hip flexors 3/5 bilaterally, quadriceps 2/5 right, 3/5 left",
                    sensation: "Decreased sensation over anterior thighs and medial legs bilaterally",
                    reflexes: "Absent patellar reflexes bilaterally, normal Achilles reflexes",
                    specialTests: "Negative straight leg raise, positive femoral stretch test bilaterally"
                },
                ncsStudies: [
                    {
                        name: "Femoral Motor (Quadriceps) - Right",
                        result: "abnormal",
                        findings: "Severely reduced amplitude (2.1 mV), normal latency",
                        interpretation: "Severe femoral nerve dysfunction"
                    },
                    {
                        name: "Femoral Motor (Quadriceps) - Left",
                        result: "abnormal",
                        findings: "Mildly reduced amplitude (4.8 mV)",
                        interpretation: "Mild femoral nerve dysfunction"
                    },
                    {
                        name: "Lateral Femoral Cutaneous - Bilateral",
                        result: "abnormal",
                        findings: "Absent responses bilaterally",
                        interpretation: "Bilateral lateral femoral cutaneous nerve involvement"
                    },
                    {
                        name: "Peroneal/Tibial studies",
                        result: "normal",
                        findings: "Normal amplitudes and velocities",
                        interpretation: "L5-S1 distribution spared"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Lumbar paraspinals",
                        findings: "Normal",
                        interpretation: "Root level spared"
                    },
                    {
                        muscle: "Iliopsoas - Bilateral",
                        findings: "Denervation changes bilaterally",
                        interpretation: "Bilateral femoral nerve involvement"
                    },
                    {
                        muscle: "Quadriceps - Right",
                        findings: "Severe denervation with poor reinnervation",
                        interpretation: "Severe femoral nerve palsy"
                    },
                    {
                        muscle: "Quadriceps - Left",
                        findings: "Mild denervation changes",
                        interpretation: "Mild femoral nerve involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Bilateral Lumbosacral Plexopathy (Obstetric) - Femoral Nerve Pattern",
                explanation: "Bilateral femoral nerve injury from prolonged labor with fetal head compression against maternal pelvis. Classic obstetric complication affecting lumbosacral plexus, typically involving femoral and lateral femoral cutaneous nerves."
            },
            'pinoneuropathy': {
                title: "Thumb Weakness After Wrist Fracture",
                presentation: {
                    age: 39,
                    gender: "Female",
                    occupation: "Physical Therapist",
                    chiefComplaint: "Inability to pinch and weakness making 'OK' sign 8 weeks after wrist fracture",
                    history: "Fell on outstretched hand 8 weeks ago, sustained distal radius fracture requiring ORIF with volar plate. Post-operatively developed inability to pinch tip of thumb to tip of index finger. Can't make 'OK' sign or pick up small objects. No numbness. Other hand functions normal.",
                    pmh: "No significant medical history",
                    medications: "Ibuprofen, physical therapy"
                },
                physicalExam: {
                    inspection: "No visible atrophy, well-healed surgical scar",
                    palpation: "No tenderness over carpal tunnel or surgical site",
                    rom: "Full ROM at wrist and fingers",
                    strength: "FPL 2/5, FDP (index) 2/5, all other muscles normal including APB",
                    sensation: "Normal sensation throughout hand",
                    reflexes: "Normal throughout",
                    specialTests: "Positive anterior interosseous nerve sign (can't make 'OK' sign)"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency and amplitude",
                        interpretation: "Main trunk of median nerve normal"
                    },
                    {
                        name: "Median Sensory (digit 2)",
                        result: "normal",
                        findings: "Normal amplitude and latency",
                        interpretation: "Normal median nerve function"
                    },
                    {
                        name: "Ulnar Motor/Sensory",
                        result: "normal",
                        findings: "All parameters normal",
                        interpretation: "Ulnar nerve unaffected"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Flexor pollicis longus",
                        findings: "No voluntary activity, denervation changes",
                        interpretation: "Anterior interosseous nerve palsy"
                    },
                    {
                        muscle: "Flexor digitorum profundus (index)",
                        findings: "No voluntary activity",
                        interpretation: "Anterior interosseous nerve involvement"
                    },
                    {
                        muscle: "Pronator quadratus",
                        findings: "Denervation changes",
                        interpretation: "Anterior interosseous nerve palsy"
                    },
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Normal",
                        interpretation: "Main median nerve trunk spared"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                correctDiagnosis: "Anterior Interosseous Nerve Palsy (Post-Surgical)",
                explanation: "Isolated anterior interosseous nerve (pure motor branch of median nerve) palsy following volar plate ORIF. Classic presentation with inability to pinch (FPL and FDP index weakness) with preserved sensation and normal APB. Often iatrogenic from surgical approach."
            },
            'lamberteatonmyasthenic': {
                title: "Progressive Weakness in Cancer Patient",
                presentation: {
                    age: 62,
                    gender: "Male",
                    occupation: "Retired Electrician",
                    chiefComplaint: "6-month history of progressive weakness and fatigue, especially in legs",
                    history: "Gradual onset proximal weakness, especially in legs. Difficulty standing from chair and climbing stairs. Weakness improves with activity initially but then worsens. Dry mouth and some difficulty swallowing. Recently diagnosed with small cell lung cancer. Family concerned about progression.",
                    pmh: "Small cell lung cancer (recently diagnosed), smoking history",
                    medications: "Chemotherapy regimen, prednisone"
                },
                physicalExam: {
                    inspection: "Mild proximal muscle atrophy, no fasciculations",
                    palpation: "No muscle tenderness",
                    rom: "Full ROM but limited by weakness",
                    strength: "Proximal weakness (3/5) that improves with initial exercise then fatigues",
                    sensation: "Normal throughout",
                    reflexes: "Diminished (1+) but improve with exercise",
                    specialTests: "Strength improves with brief exercise, then fatigues"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Low baseline amplitude (2.8 mV), normal latency",
                        interpretation: "Reduced compound muscle action potential"
                    },
                    {
                        name: "High-Frequency Repetitive Stimulation (50Hz)",
                        result: "abnormal",
                        findings: "400% increment in amplitude with high-frequency stimulation",
                        interpretation: "Classic Lambert-Eaton pattern"
                    },
                    {
                        name: "Post-Exercise Facilitation",
                        result: "abnormal",
                        findings: "Marked increase in CMAP amplitude after 10 seconds of exercise",
                        interpretation: "Presynaptic neuromuscular junction disorder"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Deltoid",
                        findings: "Small amplitude motor units with normal morphology",
                        interpretation: "Reduced recruitment due to NMJ dysfunction"
                    },
                    {
                        muscle: "Quadriceps",
                        findings: "Low amplitude voluntary units, no denervation",
                        interpretation: "Neuromuscular transmission defect"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Lambert-Eaton Myasthenic Syndrome (Paraneoplastic)",
                explanation: "Presynaptic neuromuscular junction disorder associated with small cell lung cancer. Characterized by low baseline CMAP amplitudes with dramatic increment (>100%) on high-frequency stimulation, opposite pattern from myasthenia gravis."
            },
            'inclusionbodymyositis': {
                title: "Slowly Progressive Weakness and Atrophy",
                presentation: {
                    age: 68,
                    gender: "Male",
                    occupation: "Retired Teacher",
                    chiefComplaint: "3-year history of slowly progressive weakness in arms and legs with muscle wasting",
                    history: "Insidious onset weakness starting with difficulty gripping objects and frequent falls. Progressive weakness in both proximal and distal muscles. Noticed muscle wasting in forearms and thighs. Difficulty swallowing solids recently. No rash or arthritis. Family history of 'muscle disease' in uncle.",
                    pmh: "Hypertension, type 2 diabetes",
                    medications: "Lisinopril, metformin"
                },
                physicalExam: {
                    inspection: "Asymmetric muscle atrophy affecting quadriceps and forearm flexors",
                    palpation: "Firm, atrophic muscles without tenderness",
                    rom: "Limited by weakness and contractures",
                    strength: "Asymmetric weakness: quadriceps 2/5, finger flexors 3/5, deltoids 4/5",
                    sensation: "Normal throughout",
                    reflexes: "Diminished (1+) throughout",
                    specialTests: "No rash, no fasciculations at rest"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency and amplitude",
                        interpretation: "Normal peripheral nerve function"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal parameters throughout",
                        interpretation: "No nerve involvement"
                    },
                    {
                        name: "Sensory studies",
                        result: "normal",
                        findings: "All sensory responses normal",
                        interpretation: "Normal sensory nerve function"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Quadriceps",
                        findings: "Mixed myopathic and neurogenic changes, positive sharp waves",
                        interpretation: "Inclusion body myositis pattern"
                    },
                    {
                        muscle: "Biceps",
                        findings: "Small polyphasic motor units with spontaneous activity",
                        interpretation: "Active myopathy with denervation"
                    },
                    {
                        muscle: "Forearm flexors",
                        findings: "Mixed pattern: small motor units with fibrillations",
                        interpretation: "Characteristic IBM pattern"
                    },
                    {
                        muscle: "Deltoid",
                        findings: "Predominantly myopathic changes",
                        interpretation: "Proximal myopathy"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Inclusion Body Myositis",
                explanation: "Progressive inflammatory myopathy with characteristic asymmetric pattern affecting both proximal and distal muscles. EMG shows mixed myopathic and neurogenic features with spontaneous activity, distinguishing it from other inflammatory myopathies."
            },
            'pronatorteres': {
                title: "Forearm Pain with Hand Numbness",
                presentation: {
                    age: 42,
                    gender: "Female",
                    occupation: "Tennis Instructor",
                    chiefComplaint: "6-month history of forearm pain and hand numbness that worsens with activity",
                    history: "Gradual onset pain in proximal forearm with numbness in thumb, index, and middle fingers. Pain and numbness worsen with repetitive forearm pronation during tennis instruction. Unlike typical carpal tunnel, symptoms present during day with activity rather than at night. No weakness with pinching.",
                    pmh: "Tennis elbow 2 years ago, resolved",
                    medications: "Ibuprofen PRN"
                },
                physicalExam: {
                    inspection: "No visible atrophy or deformity",
                    palpation: "Tenderness over pronator teres muscle, no carpal tunnel tenderness",
                    rom: "Full ROM but pain with resisted pronation",
                    strength: "5/5 strength throughout including normal pinch strength",
                    sensation: "Mild numbness in median distribution, including thenar eminence",
                    reflexes: "2+ and symmetric throughout",
                    specialTests: "Negative Phalen's and Tinel's at wrist. Positive pronator teres compression test."
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Mildly prolonged distal latency (4.2ms), normal amplitude",
                        interpretation: "Mild median motor nerve dysfunction"
                    },
                    {
                        name: "Median Sensory (digit 2)",
                        result: "abnormal",
                        findings: "Prolonged latency, reduced amplitude compared to ulnar",
                        interpretation: "Median sensory nerve dysfunction"
                    },
                    {
                        name: "Median Sensory (palm-wrist)",
                        result: "normal",
                        findings: "Normal latency difference (<0.4ms)",
                        interpretation: "Normal median nerve function"
                    },
                    {
                        name: "Palmar cutaneous sensory",
                        result: "abnormal",
                        findings: "Reduced amplitude",
                        interpretation: "Proximal to carpal tunnel (palmar cutaneous branches above wrist)"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Mild denervation changes",
                        interpretation: "Median nerve involvement"
                    },
                    {
                        muscle: "Flexor pollicis longus",
                        findings: "Normal",
                        interpretation: "AIN spared (branches before pronator teres)"
                    },
                    {
                        muscle: "Pronator teres",
                        findings: "Normal",
                        interpretation: "Compression distal to muscle innervation"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Pronator Teres Syndrome (Proximal Median Neuropathy)",
                explanation: "Median nerve compression at pronator teres level. Key features: activity-related symptoms (vs nighttime CTS), thenar eminence numbness (palmar cutaneous involved), normal palm-wrist studies. Less common than CTS, requires high index of suspicion."
            },
            'sci': {
                title: "Acute Paralysis After Diving Accident",
                presentation: {
                    age: 22,
                    gender: "Male",
                    occupation: "College Student",
                    chiefComplaint: "Complete paralysis below chest level after diving accident 2 weeks ago",
                    history: "Dove into shallow water 2 weeks ago, struck head on bottom. Immediate complete paralysis below nipple line. No sensation or movement in legs. Some arm movement preserved but hands weak. Bladder and bowel dysfunction. MRI shows complete C6 spinal cord injury.",
                    pmh: "Previously healthy athlete",
                    medications: "Methylprednisolone, catheter care"
                },
                physicalExam: {
                    inspection: "Wheelchair-bound, complete flaccid paralysis below C6 level",
                    palpation: "No pain sensation below injury level",
                    rom: "No active movement below C6 dermatome",
                    strength: "Biceps 4/5, triceps 0/5, complete paralysis below C7",
                    sensation: "Complete sensory loss below C6 dermatome",
                    reflexes: "Absent reflexes below injury, hyperreflexic biceps",
                    specialTests: "Positive Babinski sign, spasticity in arms"
                },
                ncsStudies: [],
                emgStudies: [],
                requiresEMG: false,
                emgIndication: "NOT INDICATED",
                difficulty: "beginner",
                correctDiagnosis: "Complete C6 Spinal Cord Injury - EMG NOT INDICATED",
                explanation: "Complete spinal cord injury with clear anatomical level and imaging confirmation. EMG/NCS would be normal below the lesion as the peripheral nervous system is intact. Clinical picture and imaging provide definitive diagnosis.",
                educationalNote: "EMG/NCS studies evaluate the peripheral nervous system. In complete spinal cord injuries, the peripheral nerves, muscles, and neuromuscular junctions are intact. EMG would show normal nerve conduction and muscle responses, providing no additional diagnostic information beyond clinical examination and imaging."
            },
            'femoraltrauma': {
                title: "Hip Pain and Leg Weakness After MVA",
                presentation: {
                    age: 35,
                    gender: "Male",
                    occupation: "Construction Worker",
                    chiefComplaint: "Right leg weakness and anterior thigh numbness 8 weeks after motor vehicle accident",
                    history: "High-speed MVA 8 weeks ago with pelvic fractures and retroperitoneal hematoma. After initial trauma stabilization, developed right leg weakness and numbness. Cannot extend knee or flex hip effectively. Numbness over anterior thigh and medial leg. Initial concern was for back injury but lumbar spine imaging normal.",
                    pmh: "No significant medical history before accident",
                    medications: "Oxycodone, physical therapy"
                },
                physicalExam: {
                    inspection: "Right quadriceps atrophy, antalgic gait with assistive device",
                    palpation: "Well-healed abdominal surgical scars, no palpable masses",
                    rom: "Limited hip flexion and knee extension",
                    strength: "Hip flexors 2/5, quadriceps 1/5, hip adductors 3/5 on right",
                    sensation: "Complete sensory loss over anterior thigh and medial leg",
                    reflexes: "Absent patellar reflex on right (0+), normal Achilles",
                    specialTests: "Positive femoral stretch test, negative straight leg raise"
                },
                ncsStudies: [
                    {
                        name: "Femoral Motor (Quadriceps)",
                        result: "abnormal",
                        findings: "No motor response elicitable",
                        interpretation: "Complete femoral nerve palsy"
                    },
                    {
                        name: "Saphenous Sensory",
                        result: "abnormal",
                        findings: "Absent sensory response",
                        interpretation: "Complete sensory loss in femoral distribution"
                    },
                    {
                        name: "Lateral Femoral Cutaneous",
                        result: "abnormal",
                        findings: "Absent response",
                        interpretation: "Lateral femoral cutaneous nerve involvement"
                    },
                    {
                        name: "Obturator nerve testing",
                        result: "abnormal",
                        findings: "Reduced response to adductor muscles",
                        interpretation: "Partial obturator nerve involvement"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Lumbar paraspinals",
                        findings: "Normal",
                        interpretation: "Root level spared"
                    },
                    {
                        muscle: "Iliopsoas",
                        findings: "No voluntary activity, denervation changes",
                        interpretation: "Complete femoral nerve palsy"
                    },
                    {
                        muscle: "Quadriceps",
                        findings: "No voluntary activity, active denervation",
                        interpretation: "Complete femoral nerve lesion"
                    },
                    {
                        muscle: "Adductor longus",
                        findings: "Denervation changes",
                        interpretation: "Partial obturator nerve involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Traumatic Femoral Nerve Palsy with Partial Obturator Nerve Injury",
                explanation: "Complete femoral nerve palsy from retroperitoneal hematoma or direct trauma during pelvic fracture. Compression/stretching of lumbar plexus branches. Pattern localizes to plexus level (spared paraspinals) rather than root avulsion."
            },
            'sciaticneoplasm': {
                title: "Progressive Leg Pain and Weakness",
                presentation: {
                    age: 58,
                    gender: "Female",
                    occupation: "Accountant",
                    chiefComplaint: "6-month history of progressive right leg pain, weakness, and numbness",
                    history: "Insidious onset deep, aching pain in right buttock radiating down entire leg. Progressive weakness in foot dorsiflexion and plantarflexion. Numbness in lateral leg and foot. Pain constant, not positional. Weight loss of 15 pounds. Night pain disrupting sleep. No back pain or trauma.",
                    pmh: "Breast cancer 8 years ago, treated with mastectomy and chemotherapy",
                    medications: "Gabapentin, oxycodone"
                },
                physicalExam: {
                    inspection: "Right leg atrophy, foot drop gait pattern",
                    palpation: "Deep tenderness in right buttock, no discrete mass palpable",
                    rom: "Limited by weakness and pain",
                    strength: "Complete foot drop (0/5 dorsiflexion), plantarflexion 2/5, hip weakness 3/5",
                    sensation: "Decreased sensation in entire sciatic distribution (lateral leg, dorsal/plantar foot)",
                    reflexes: "Absent Achilles reflex, absent patellar reflex on right",
                    specialTests: "Negative straight leg raise (too painful), negative Spurling's test"
                },
                ncsStudies: [
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "No response elicitable",
                        interpretation: "Complete deep peroneal nerve palsy"
                    },
                    {
                        name: "Tibial Motor (AH)",
                        result: "abnormal",
                        findings: "Severely reduced amplitude (2.1 mV)",
                        interpretation: "Severe tibial nerve dysfunction"
                    },
                    {
                        name: "Superficial Peroneal Sensory",
                        result: "abnormal",
                        findings: "Absent response",
                        interpretation: "Complete superficial peroneal nerve loss"
                    },
                    {
                        name: "Sural Sensory",
                        result: "abnormal",
                        findings: "Absent response",
                        interpretation: "Complete sural nerve loss"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Lumbar paraspinals",
                        findings: "Normal",
                        interpretation: "Root level spared"
                    },
                    {
                        muscle: "Gluteus maximus",
                        findings: "Severe denervation, no voluntary activity",
                        interpretation: "Sciatic nerve involvement above knee"
                    },
                    {
                        muscle: "Biceps femoris (short head)",
                        findings: "Complete denervation",
                        interpretation: "Peroneal division of sciatic nerve"
                    },
                    {
                        muscle: "Gastrocnemius",
                        findings: "Severe denervation changes",
                        interpretation: "Tibial division of sciatic nerve"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Sciatic Neuropathy Secondary to Neoplasm (Metastatic Disease)",
                explanation: "Complete sciatic nerve palsy from tumor compression/infiltration in pelvis. History of breast cancer, weight loss, and progressive nature suggest metastatic disease. EMG localizes to sciatic nerve level with spared paraspinals, distinguishing from root pathology."
            },
            'ulnarwristcompression': {
                title: "Hand Weakness After Wrist Injury",
                presentation: {
                    age: 29,
                    gender: "Male",
                    occupation: "Rock Climber",
                    chiefComplaint: "Hand weakness and numbness after fall while rock climbing 4 weeks ago",
                    history: "Fell while climbing 4 weeks ago, landed on outstretched hands. Initially focused on wrist pain, but developed progressive weakness and numbness in ring and little fingers. Weakness gripping and difficulty with fine motor tasks. Uses wrist guards for climbing which may compress ulnar nerve at wrist.",
                    pmh: "Previous wrist injuries from climbing",
                    medications: "Ibuprofen, wrist bracing"
                },
                physicalExam: {
                    inspection: "Mild hypothenar atrophy, well-healed abrasions on palm",
                    palpation: "Tenderness over Guyon's canal and pisiform bone",
                    rom: "Full ROM at wrist and fingers",
                    strength: "Hypothenar muscles 3/5, interossei normal (5/5), FCU normal",
                    sensation: "Decreased sensation in little finger and ulnar half ring finger",
                    reflexes: "Normal throughout",
                    specialTests: "Positive Tinel's at Guyon's canal, negative at elbow"
                },
                ncsStudies: [
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Prolonged distal latency (4.8ms), reduced amplitude",
                        interpretation: "Deep motor branch ulnar nerve dysfunction at wrist level"
                    },
                    {
                        name: "Ulnar Motor (FDI)",
                        result: "normal",
                        findings: "Normal latency and amplitude",
                        interpretation: "Deep motor branch to interossei spared"
                    },
                    {
                        name: "Ulnar Sensory (digit 5)",
                        result: "abnormal",
                        findings: "Prolonged latency, reduced amplitude",
                        interpretation: "Superficial sensory branch involvement"
                    },
                    {
                        name: "Dorsal ulnar cutaneous",
                        result: "normal",
                        findings: "Normal response",
                        interpretation: "Branches proximal to Guyon's canal spared"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor digiti minimi",
                        findings: "Denervation changes with reduced recruitment",
                        interpretation: "Deep motor branch involvement"
                    },
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Normal",
                        interpretation: "Interossei branch spares (branches proximally in canal)"
                    },
                    {
                        muscle: "Flexor carpi ulnaris",
                        findings: "Normal",
                        interpretation: "Proximal ulnar nerve intact"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Ulnar Neuropathy at Guyon's Canal - Type I (Mixed Motor and Sensory)",
                explanation: "Ulnar nerve compression at Guyon's canal affecting both superficial sensory and deep motor branches to hypothenar muscles. Spares interossei (branch more proximally) and dorsal ulnar cutaneous nerve (branches above wrist). Classic pattern from trauma or chronic pressure."
            },
            'fibromyalgia': {
                title: "Widespread Pain and Fatigue",
                presentation: {
                    age: 45,
                    gender: "Female",
                    occupation: "Office Manager",
                    chiefComplaint: "6-month history of widespread muscle pain, fatigue, and tingling in hands",
                    history: "Gradual onset of widespread muscle and joint pain, fatigue, and sleep disturbances. Reports tingling in hands that led to EMG referral. No weakness or muscle atrophy. Pain worse with stress and weather changes. Multiple tender points throughout body. Previous normal labs including ESR, CRP, ANA.",
                    pmh: "Depression, irritable bowel syndrome",
                    medications: "Sertraline, gabapentin"
                },
                physicalExam: {
                    inspection: "No visible atrophy or fasciculations",
                    palpation: "Multiple tender points at neck, shoulders, back, hips",
                    rom: "Full ROM but limited by pain",
                    strength: "5/5 strength throughout (limited by effort due to pain)",
                    sensation: "Normal objective sensation, subjective numbness in hands",
                    reflexes: "2+ and symmetric throughout",
                    specialTests: "Positive tender points (>11/18), negative Tinel's/Phalen's"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal distal latency and amplitude",
                        interpretation: "Normal median nerve function"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal parameters throughout",
                        interpretation: "Normal ulnar nerve function"
                    },
                    {
                        name: "All sensory studies",
                        result: "normal",
                        findings: "Normal amplitudes and latencies",
                        interpretation: "Normal peripheral nerve function"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Multiple muscles sampled",
                        findings: "Normal spontaneous activity, normal motor units",
                        interpretation: "Normal muscle and nerve function"
                    }
                ],
                requiresEMG: false,
                emgIndication: "NOT INDICATED",
                difficulty: "beginner",
                correctDiagnosis: "Fibromyalgia - EMG NOT INDICATED",
                explanation: "Fibromyalgia is a central pain disorder with normal peripheral nervous system. EMG/NCS are normal and not indicated unless there are objective neurological findings. Subjective sensory symptoms without objective deficits don't warrant electrodiagnostic studies.",
                educationalNote: "EMG/NCS should only be performed when there are objective neurological findings (weakness, atrophy, reflex changes, objective sensory loss). Subjective pain and fatigue without focal neurological deficits are not indications for electrodiagnostic testing."
            },
            'charcotmarietooth': {
                title: "Progressive Foot Deformity and Weakness",
                presentation: {
                    age: 32,
                    gender: "Male",
                    occupation: "Software Engineer",
                    chiefComplaint: "Lifelong foot problems with recent worsening weakness and frequent falls",
                    history: "Born with 'club feet' requiring braces as child. Progressive weakness in feet and legs over past 5 years. Frequent ankle sprains and falls. Family history of similar problems in father and paternal grandfather. High-arched feet and difficulty finding shoes that fit.",
                    pmh: "Pes cavus since childhood, multiple ankle sprains",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "Bilateral pes cavus, hammer toes, distal leg atrophy",
                    palpation: "Atrophic calf muscles, normal proximal muscles",
                    rom: "Limited ankle dorsiflexion",
                    strength: "Distal weakness: dorsiflexion 3/5, plantarflexion 4/5. Proximal muscles normal.",
                    sensation: "Decreased vibration and position sense in feet",
                    reflexes: "Absent Achilles reflexes, diminished patellar reflexes",
                    specialTests: "Positive Romberg sign, high-arched feet"
                },
                ncsStudies: [
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "Markedly reduced amplitude (0.5 mV), slow conduction velocity (25 m/s)",
                        interpretation: "Severe demyelinating process affecting nerve conduction"
                    },
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Reduced amplitude, slow conduction velocity (35 m/s)",
                        interpretation: "Demyelinating process affecting upper extremity nerves"
                    },
                    {
                        name: "Sural Sensory",
                        result: "abnormal",
                        findings: "Absent response",
                        interpretation: "Severe sensory nerve dysfunction"
                    },
                    {
                        name: "Median Sensory",
                        result: "abnormal",
                        findings: "Reduced amplitude, slow conduction velocity",
                        interpretation: "Demyelinating sensory nerve dysfunction"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Tibialis anterior",
                        findings: "Chronic denervation with large polyphasic motor units",
                        interpretation: "Chronic nerve dysfunction with reinnervation changes"
                    },
                    {
                        muscle: "Gastrocnemius",
                        findings: "Severe denervation, poor recruitment",
                        interpretation: "Advanced nerve dysfunction"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Charcot-Marie-Tooth Disease (Hereditary Neuropathy)",
                explanation: "Hereditary demyelinating neuropathy with classic distal weakness, pes cavus, and family history. Uniform slowing of conduction velocities throughout suggests demyelinating CMT (likely CMT1). Genetic testing would confirm specific subtype."
            },
            'multifocalmotorneuropathy': {
                title: "Asymmetric Hand and Arm Weakness",
                presentation: {
                    age: 48,
                    gender: "Male",
                    occupation: "Electrician",
                    chiefComplaint: "2-year history of progressive asymmetric weakness in hands and arms",
                    history: "Gradual onset weakness starting in right hand, now affecting left hand and right arm. Weakness is patchy - some muscles weak while adjacent ones normal. No sensory symptoms. No fasciculations visible. Weakness interferes with work requiring fine motor control.",
                    pmh: "No significant medical history",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "Asymmetric muscle atrophy in hands and forearms",
                    palpation: "Atrophic muscles without tenderness",
                    rom: "Full ROM where strength permits",
                    strength: "Patchy weakness: FDI 2/5 right, normal left. APB 3/5 right, 4/5 left. Triceps normal bilaterally.",
                    sensation: "Normal throughout",
                    reflexes: "Normal throughout",
                    specialTests: "No fasciculations, no upper motor neuron signs"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Conduction block: 60% amplitude drop from forearm to wrist",
                        interpretation: "Focal conduction block in median nerve"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Conduction block across elbow, prolonged distal latency",
                        interpretation: "Multifocal involvement of ulnar nerve"
                    },
                    {
                        name: "All sensory studies",
                        result: "normal",
                        findings: "Normal amplitudes and latencies",
                        interpretation: "No sensory involvement"
                    },
                    {
                        name: "Anti-GM1 antibodies",
                        result: "positive",
                        findings: "Elevated anti-GM1 ganglioside antibodies",
                        interpretation: "Supports MMN diagnosis"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Chronic denervation with large motor units",
                        interpretation: "Chronic motor nerve dysfunction"
                    },
                    {
                        muscle: "First dorsal interosseous",
                        findings: "Active denervation, reduced recruitment",
                        interpretation: "Progressive motor nerve dysfunction"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Multifocal Motor Neuropathy (MMN)",
                explanation: "Rare immune-mediated motor neuropathy with conduction blocks at non-entrapment sites. Key features: asymmetric pure motor involvement, normal sensory studies, conduction blocks, and anti-GM1 antibodies. Responds to immunotherapy unlike ALS."
            },
            'criticalillnesspolyneuropathy': {
                title: "Weakness After Prolonged ICU Stay",
                presentation: {
                    age: 55,
                    gender: "Female",
                    occupation: "Nurse",
                    chiefComplaint: "Severe weakness in all extremities after 3-week ICU stay for sepsis",
                    history: "Admitted 6 weeks ago with severe pneumonia and sepsis, required mechanical ventilation for 3 weeks. Multiple organ failure with prolonged use of steroids and neuromuscular blocking agents. When sedation lifted, found to have severe weakness in all extremities. Unable to lift arms or legs against gravity.",
                    pmh: "Diabetes mellitus, hypertension",
                    medications: "Multiple ICU medications, now weaning steroids"
                },
                physicalExam: {
                    inspection: "Generalized muscle atrophy, recently extubated",
                    palpation: "Diffuse muscle atrophy without specific tenderness",
                    rom: "Full passive ROM, limited active movement",
                    strength: "Proximal and distal weakness 2-3/5 throughout all extremities",
                    sensation: "Decreased sensation in stocking-glove distribution",
                    reflexes: "Diminished to absent throughout (1+ or absent)",
                    specialTests: "Difficulty weaning from ventilator due to diaphragm weakness"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Markedly reduced amplitude (1.8 mV), normal conduction velocity",
                        interpretation: "Severe axonal motor nerve dysfunction"
                    },
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "Severely reduced amplitude (0.6 mV)",
                        interpretation: "Severe axonal nerve dysfunction"
                    },
                    {
                        name: "Median Sensory",
                        result: "abnormal",
                        findings: "Severely reduced amplitude",
                        interpretation: "Axonal sensory nerve dysfunction"
                    },
                    {
                        name: "Sural Sensory",
                        result: "abnormal",
                        findings: "Absent response",
                        interpretation: "Severe sensory axonal loss"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Deltoid",
                        findings: "Fibrillations, positive sharp waves, reduced recruitment",
                        interpretation: "Acute denervation"
                    },
                    {
                        muscle: "Biceps",
                        findings: "Mixed myopathic and neuropathic changes",
                        interpretation: "Critical illness neuromyopathy"
                    },
                    {
                        muscle: "Tibialis anterior",
                        findings: "Severe denervation changes",
                        interpretation: "Axonal nerve dysfunction"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Critical Illness Polyneuropathy/Myopathy",
                explanation: "Acquired condition in critically ill patients, often with sepsis, prolonged mechanical ventilation, and multiple organ failure. Combination of axonal neuropathy and myopathy. Recovery is variable and often incomplete."
            },
            'spinalmusculatrophy': {
                title: "Progressive Weakness Since Childhood",
                presentation: {
                    age: 28,
                    gender: "Male",
                    occupation: "Teacher (uses wheelchair)",
                    chiefComplaint: "Lifelong progressive weakness, now with new concerns about swallowing",
                    history: "Born with muscle weakness, delayed motor milestones. Progressive weakness throughout childhood requiring wheelchair by age 12. Recent development of difficulty swallowing and choking on liquids. Family history of similar condition in younger brother who died in infancy.",
                    pmh: "Spinal muscular atrophy (known diagnosis), scoliosis",
                    medications: "Nusinersen injections, respiratory support"
                },
                physicalExam: {
                    inspection: "Severe muscle atrophy, scoliosis, fasciculations in tongue",
                    palpation: "Diffuse muscle atrophy, particularly proximal",
                    rom: "Contractures at hips and knees",
                    strength: "Severe proximal weakness (1-2/5), distal muscles relatively preserved",
                    sensation: "Normal throughout",
                    reflexes: "Absent throughout",
                    specialTests: "Tongue fasciculations, weak cough, difficulty swallowing"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Reduced amplitude (3.2 mV), normal latency and conduction velocity",
                        interpretation: "Reduced motor units but normal nerve conduction"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Reduced amplitude, normal conduction parameters",
                        interpretation: "Motor neuron loss"
                    },
                    {
                        name: "All sensory studies",
                        result: "normal",
                        findings: "Normal amplitudes and latencies",
                        interpretation: "No sensory involvement"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Deltoid",
                        findings: "Widespread fasciculations, large polyphasic motor units",
                        interpretation: "Chronic denervation with reinnervation"
                    },
                    {
                        muscle: "Biceps",
                        findings: "Fasciculations, giant motor units, reduced recruitment",
                        interpretation: "Chronic motor neuron disease"
                    },
                    {
                        muscle: "Tongue",
                        findings: "Fasciculations and fibrillations",
                        interpretation: "Bulbar motor neuron involvement"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Spinal Muscular Atrophy Type II (Intermediate)",
                explanation: "Genetic motor neuron disease caused by SMN1 gene mutations. Type II presents in childhood with progressive proximal weakness, fasciculations, and preserved sensation. Distinguished from ALS by early onset, family history, and specific genetic pattern."
            },
            'toxicneuropathy': {
                title: "Progressive Painful Neuropathy",
                presentation: {
                    age: 52,
                    gender: "Male",
                    occupation: "Factory Worker (Chemical Plant)",
                    chiefComplaint: "6-month history of progressive burning feet and hand numbness",
                    history: "Insidious onset burning pain in feet, progressing to hands over several months. Works in chemical plant with exposure to organic solvents. Symptoms worse at night, interfering with sleep. Progressive weakness in feet making walking difficult. Coworkers have similar complaints.",
                    pmh: "No diabetes, no alcohol abuse",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "No visible deformities, mild pes cavus",
                    palpation: "No specific tenderness",
                    rom: "Full ROM",
                    strength: "Mild distal weakness, toe dorsiflexion 4/5, hand intrinsics 4/5",
                    sensation: "Decreased vibration and pinprick in stocking-glove distribution",
                    reflexes: "Absent ankle reflexes, diminished throughout",
                    specialTests: "Negative Romberg, gait with mild foot drop"
                },
                ncsStudies: [
                    {
                        name: "Sural Sensory",
                        result: "abnormal",
                        findings: "Severely reduced amplitude (2 μV), mildly slow velocity (38 m/s)",
                        interpretation: "Axonal sensory nerve dysfunction"
                    },
                    {
                        name: "Median Sensory",
                        result: "abnormal", 
                        findings: "Reduced amplitude, mildly prolonged latency",
                        interpretation: "Distal axonal nerve dysfunction"
                    },
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "Low amplitude (1.2 mV), normal velocity",
                        interpretation: "Axonal motor nerve dysfunction"
                    },
                    {
                        name: "Tibial Motor (AHB)",
                        result: "abnormal",
                        findings: "Reduced amplitude, normal conduction velocity",
                        interpretation: "Length-dependent axonal nerve dysfunction"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Extensor digitorum brevis",
                        findings: "Fibrillations and positive sharp waves, reduced recruitment",
                        interpretation: "Active denervation"
                    },
                    {
                        muscle: "Tibialis anterior",
                        findings: "Chronic denervation changes with large motor units",
                        interpretation: "Chronic axonal nerve dysfunction"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Toxic Polyneuropathy (Solvent Exposure)",
                explanation: "Length-dependent axonal polyneuropathy caused by chronic exposure to organic solvents. Key features: occupational exposure, predominantly sensory symptoms with burning pain, distal axonal pattern on NCS, and similar symptoms in coworkers suggesting environmental cause."
            },
            'postviralguillainbarre': {
                title: "Acute Ascending Weakness",
                presentation: {
                    age: 34,
                    gender: "Female", 
                    occupation: "Teacher",
                    chiefComplaint: "Rapidly progressive weakness in legs and arms over 5 days",
                    history: "2 weeks ago had viral gastroenteritis with diarrhea. 5 days ago developed tingling in toes, followed by progressive weakness ascending from feet to hands. Now has difficulty walking and using hands. No respiratory symptoms yet but concerned about breathing.",
                    pmh: "Recent viral gastroenteritis 2 weeks ago",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "No muscle atrophy, appears anxious",
                    palpation: "No muscle tenderness",
                    rom: "Full passive ROM",
                    strength: "Symmetric weakness: legs 3/5 distal, 4/5 proximal; arms 4/5 distal, 4+/5 proximal",
                    sensation: "Decreased vibration in feet, mild numbness in fingertips",
                    reflexes: "Absent throughout all extremities",
                    specialTests: "Negative Babinski, normal cranial nerves, vital capacity 80% predicted"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Prolonged distal latency (6.2 ms), conduction block, slow velocity (38 m/s)",
                        interpretation: "Demyelinating motor nerve dysfunction with conduction block"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "abnormal",
                        findings: "Prolonged F-wave latency, temporal dispersion",
                        interpretation: "Proximal demyelination"
                    },
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "Absent response at ankle stimulation",
                        interpretation: "Severe demyelinating process affecting nerve conduction"
                    },
                    {
                        name: "Median Sensory",
                        result: "abnormal",
                        findings: "Prolonged latency, reduced amplitude",
                        interpretation: "Sensory nerve involvement"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Normal spontaneous activity, reduced recruitment",
                        interpretation: "Acute demyelination without denervation yet"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Guillain-Barré Syndrome (AIDP variant)",
                explanation: "Acute inflammatory demyelinating polyneuropathy following viral infection. Classic features: ascending weakness after infection, areflexia, demyelinating pattern on NCS with conduction blocks and prolonged latencies. Requires urgent monitoring for respiratory involvement."
            },
            'hereditaryneuropathy': {
                title: "Family History of Foot Problems",
                presentation: {
                    age: 28,
                    gender: "Male",
                    occupation: "Physical Therapist",
                    chiefComplaint: "Lifelong foot deformities and recent ankle sprains",
                    history: "Born with high arched feet, frequent ankle sprains since childhood. Mother and grandfather had similar foot problems and weakness. Recently noticed weakness in hands, difficulty with fine motor tasks. Progressive symptoms but very slowly. No acute illnesses.",
                    pmh: "Multiple ankle sprains, no other medical problems",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "High arched feet (pes cavus), hammer toes, mild hand atrophy",
                    palpation: "Atrophic intrinsic foot muscles",
                    rom: "Limited ankle dorsiflexion due to contractures",
                    strength: "Distal weakness: foot dorsiflexion 3/5, foot inversion 4/5, hand intrinsics 4/5",
                    sensation: "Decreased vibration in feet and hands",
                    reflexes: "Absent ankle reflexes, diminished elsewhere",
                    specialTests: "Steppage gait, positive family history"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal",
                        findings: "Mildly reduced amplitude, slow velocity (42 m/s)",
                        interpretation: "Mild demyelinating motor nerve dysfunction"
                    },
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal", 
                        findings: "Low amplitude (1.5 mV), slow velocity (38 m/s)",
                        interpretation: "Demyelinating nerve dysfunction with axonal loss"
                    },
                    {
                        name: "Median Sensory",
                        result: "abnormal",
                        findings: "Absent response",
                        interpretation: "Severe sensory nerve involvement"
                    },
                    {
                        name: "Sural Sensory",
                        result: "abnormal",
                        findings: "Absent response",
                        interpretation: "Chronic sensory nerve dysfunction"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Extensor digitorum brevis",
                        findings: "Chronic denervation with large motor units",
                        interpretation: "Chronic neurogenic changes"
                    },
                    {
                        muscle: "Abductor pollicis brevis",
                        findings: "Mild chronic denervation changes",
                        interpretation: "Progressive motor nerve dysfunction"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "intermediate",
                correctDiagnosis: "Charcot-Marie-Tooth Disease (CMT1A)",
                explanation: "Hereditary sensorimotor neuropathy with autosomal dominant inheritance. Classic features: pes cavus, distal weakness, positive family history, uniform slowing on NCS, and chronic progressive course. Genetic testing confirms PMP22 duplication."
            },
            'metabolicmyopathy': {
                title: "Exercise Intolerance and Muscle Pain",
                presentation: {
                    age: 25,
                    gender: "Female",
                    occupation: "Graduate Student",
                    chiefComplaint: "Lifelong exercise intolerance with muscle pain and fatigue",
                    history: "Since childhood, develops severe muscle pain and fatigue with moderate exercise. Episodes of dark urine after strenuous activity. Cannot keep up with peers during physical activity. Symptoms improve with rest and carbohydrate intake. Family history of similar symptoms in brother.",
                    pmh: "Recurrent episodes of myoglobinuria",
                    medications: "None"
                },
                physicalExam: {
                    inspection: "Normal muscle bulk, no atrophy",
                    palpation: "No muscle tenderness at rest",
                    rom: "Full ROM",
                    strength: "Normal strength at rest (5/5 throughout)",
                    sensation: "Normal throughout",
                    reflexes: "Normal and symmetric (2+ throughout)",
                    specialTests: "Ischemic forearm test planned, normal baseline strength"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "normal",
                        findings: "Normal amplitude, latency, and conduction velocity",
                        interpretation: "Normal peripheral nerve function"
                    },
                    {
                        name: "Ulnar Motor (ADM)",
                        result: "normal",
                        findings: "Normal parameters throughout",
                        interpretation: "Normal nerve conduction"
                    },
                    {
                        name: "All sensory studies",
                        result: "normal",
                        findings: "Normal amplitudes and latencies",
                        interpretation: "Normal sensory nerve function"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Deltoid",
                        findings: "Normal spontaneous activity, normal motor unit morphology",
                        interpretation: "No evidence of myopathy at rest"
                    },
                    {
                        muscle: "Quadriceps",
                        findings: "Normal baseline findings",
                        interpretation: "Normal muscle membrane stability"
                    },
                    {
                        muscle: "Ischemic forearm test",
                        findings: "No rise in serum lactate with anaerobic exercise",
                        interpretation: "Suggests glycolytic enzyme deficiency"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "McArdle Disease (Glycogen Storage Disease Type V)",
                explanation: "Metabolic myopathy due to muscle phosphorylase deficiency. Key features: exercise intolerance, myoglobinuria, normal strength at rest, normal EMG at baseline, and abnormal ischemic forearm test (no lactate rise). Requires enzyme testing or genetic analysis for confirmation."
            },
            'criticalillnessmyopathy': {
                title: "Post-ICU Weakness with Elevated CK",
                presentation: {
                    age: 48,
                    gender: "Male",
                    occupation: "Construction Worker",
                    chiefComplaint: "Severe weakness after prolonged ICU stay for COVID-19",
                    history: "Hospitalized 8 weeks ago with severe COVID-19, required mechanical ventilation for 4 weeks. Received high-dose steroids and neuromuscular blocking agents. Now has severe proximal and distal weakness, worse than expected for polyneuropathy alone. CK elevated at 2800 U/L.",
                    pmh: "Hypertension, obesity",
                    medications: "Prednisone (tapering), multiple ICU medications"
                },
                physicalExam: {
                    inspection: "Generalized muscle atrophy, more prominent proximally",
                    palpation: "Muscle atrophy without specific tenderness",
                    rom: "Full passive ROM, limited active movement",
                    strength: "Severe weakness: proximal 2/5, distal 3/5 in all extremities",
                    sensation: "Mild stocking-glove sensory loss",
                    reflexes: "Absent throughout",
                    specialTests: "Difficulty with ventilator weaning, elevated CK"
                },
                ncsStudies: [
                    {
                        name: "Median Motor (APB)",
                        result: "abnormal", 
                        findings: "Reduced amplitude (2.1 mV), normal velocity",
                        interpretation: "Axonal motor nerve dysfunction component"
                    },
                    {
                        name: "Peroneal Motor (EDB)",
                        result: "abnormal",
                        findings: "Low amplitude (0.8 mV)",
                        interpretation: "Severe axonal nerve dysfunction"
                    },
                    {
                        name: "Sensory studies",
                        result: "abnormal",
                        findings: "Reduced amplitudes in distal nerves",
                        interpretation: "Mild sensory axonal nerve dysfunction"
                    }
                ],
                emgStudies: [
                    {
                        muscle: "Deltoid",
                        findings: "Fibrillations, positive sharp waves, small polyphasic motor units",
                        interpretation: "Combined myopathic and neurogenic features"
                    },
                    {
                        muscle: "Quadriceps",
                        findings: "Abundant spontaneous activity, mixed motor unit sizes",
                        interpretation: "Acute myopathy with membrane instability"
                    },
                    {
                        muscle: "Biceps",
                        findings: "Myopathic motor units with spontaneous activity",
                        interpretation: "Necrotizing myopathy pattern"
                    }
                ],
                requiresEMG: true,
                emgIndication: "INDICATED",
                difficulty: "difficult",
                correctDiagnosis: "Critical Illness Myopathy with Polyneuropathy",
                explanation: "Combined critical illness myopathy and polyneuropathy (CIM/CIP) following prolonged ICU stay. Features: severe weakness, elevated CK, mixed EMG pattern with both myopathic and neurogenic changes, worse than neuropathy alone. Associated with steroids, paralytics, and systemic inflammation."
            }
        };

        function startCase(caseId) {
            // Remove selected class from all buttons
            const buttons = document.querySelectorAll('.complaint-button');
            buttons.forEach(button => button.classList.remove('selected'));
            
            // Add selected class to clicked button
            event.target.classList.add('selected');
            
            const differentialDiv = document.getElementById('differential-results');
            differentialDiv.style.display = 'block';
            
            let content = '';
            
            switch(complaint) {
                case 'hand14':
                    content = `
                        <h3>Hand Pain/Paresthesias (Digits 1-4)</h3>
                        <div class="differential-category">
                            <h4>Focal Neuropathies</h4>
                            <div class="differential-item">
                                <strong>Carpal Tunnel Syndrome:</strong> Median nerve entrapment at wrist. Most common. Night symptoms, thenar weakness.
                            </div>
                            <div class="differential-item">
                                <strong>Pronator Syndrome:</strong> Median nerve entrapment in forearm. Proximal forearm pain, no night symptoms.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Radiculopathy</h4>
                            <div class="differential-item">
                                <strong>C6 Radiculopathy:</strong> Neck pain, biceps weakness, thumb/index numbness.
                            </div>
                            <div class="differential-item">
                                <strong>C7 Radiculopathy:</strong> Middle finger numbness, triceps weakness.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Other Considerations</h4>
                            <div class="differential-item">
                                <strong>Polyneuropathy:</strong> Usually starts distally, bilateral, length-dependent.
                            </div>
                            <div class="differential-item">
                                <strong>Cervical Myelopathy:</strong> Upper motor neuron signs, bilateral symptoms.
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'hand45':
                    content = `
                        <h3>Hand Pain/Paresthesias (Digits 4-5)</h3>
                        <div class="differential-category">
                            <h4>Focal Neuropathies</h4>
                            <div class="differential-item">
                                <strong>Ulnar Neuropathy at Elbow:</strong> Most common. Cubital tunnel syndrome, progressive hand weakness.
                            </div>
                            <div class="differential-item">
                                <strong>Ulnar Neuropathy at Wrist:</strong> Guyon's canal, cyclist's palsy, hypothenar weakness.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Radiculopathy</h4>
                            <div class="differential-item">
                                <strong>C8 Radiculopathy:</strong> Medial forearm pain, hand intrinsic weakness, Horner's syndrome possible.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Plexopathy</h4>
                            <div class="differential-item">
                                <strong>Lower Trunk Brachial Plexopathy:</strong> C8-T1 involvement, Pancoast tumor, neurogenic TOS.
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'thenar':
                    content = `
                        <h3>Thenar Weakness</h3>
                        <div class="differential-category">
                            <h4>Focal Neuropathies</h4>
                            <div class="differential-item">
                                <strong>Carpal Tunnel Syndrome:</strong> Progressive median nerve compression, APB weakness.
                            </div>
                            <div class="differential-item">
                                <strong>Recurrent Motor Branch Injury:</strong> Pure motor branch of median nerve at wrist.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Radiculopathy</h4>
                            <div class="differential-item">
                                <strong>C6/C7 Radiculopathy:</strong> Neck pain, broader weakness pattern, reflex changes.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Anterior Horn Cell</h4>
                            <div class="differential-item">
                                <strong>ALS:</strong> Progressive weakness, fasciculations, upper motor neuron signs.
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'radicular':
                    content = `
                        <h3>Radicular Weakness Pattern</h3>
                        <div class="differential-category">
                            <h4>Cervical Radiculopathy</h4>
                            <div class="differential-item">
                                <strong>C5:</strong> Deltoid, biceps weakness. Axillary/musculocutaneous nerve pattern.
                            </div>
                            <div class="differential-item">
                                <strong>C6:</strong> Biceps, brachioradialis weakness. Lateral forearm numbness.
                            </div>
                            <div class="differential-item">
                                <strong>C7:</strong> Triceps, wrist extensors weakness. Middle finger numbness.
                            </div>
                            <div class="differential-item">
                                <strong>C8:</strong> Hand intrinsics, FDP weakness. Medial forearm numbness.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Lumbar Radiculopathy</h4>
                            <div class="differential-item">
                                <strong>L4:</strong> Quadriceps weakness, knee reflex loss, medial leg numbness.
                            </div>
                            <div class="differential-item">
                                <strong>L5:</strong> Dorsiflexors, EHL weakness, lateral leg numbness.
                            </div>
                            <div class="differential-item">
                                <strong>S1:</strong> Plantarflexors, ankle reflex loss, lateral foot numbness.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Mimics</h4>
                            <div class="differential-item">
                                <strong>Plexopathy:</strong> Multiple nerve territories, trauma history.
                            </div>
                            <div class="differential-item">
                                <strong>Multiple Mononeuropathies:</strong> Diabetes, vasculitis.
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'dropfoot':
                    content = `
                        <h3>Drop Foot</h3>
                        <div class="differential-category">
                            <h4>Focal Neuropathies</h4>
                            <div class="differential-item">
                                <strong>Fibular (Peroneal) Neuropathy:</strong> Most common. Compression at fibular head, footdrop with eversion.
                            </div>
                            <div class="differential-item">
                                <strong>Deep Fibular Neuropathy:</strong> Anterior compartment syndrome, weak dorsiflexion only.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Radiculopathy</h4>
                            <div class="differential-item">
                                <strong>L5 Radiculopathy:</strong> Back pain, EHL weakness, lateral leg numbness, normal eversion.
                            </div>
                            <div class="differential-item">
                                <strong>L4 Radiculopathy:</strong> Quadriceps weakness, tibialis anterior involvement.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Other Causes</h4>
                            <div class="differential-item">
                                <strong>Lumbosacral Plexopathy:</strong> Multiple nerve involvement, trauma/tumor.
                            </div>
                            <div class="differential-item">
                                <strong>Sciatic Neuropathy:</strong> High division, affects fibular > tibial.
                            </div>
                            <div class="differential-item">
                                <strong>Central Causes:</strong> Stroke, spinal cord lesion, upper motor neuron signs.
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'knee':
                    content = `
                        <h3>Knee Extension Weakness</h3>
                        <div class="differential-category">
                            <h4>Focal Neuropathies</h4>
                            <div class="differential-item">
                                <strong>Femoral Neuropathy:</strong> Diabetes, retroperitoneal hematoma, inguinal surgery.
                            </div>
                            <div class="differential-item">
                                <strong>Saphenous Neuropathy:</strong> Sensory only, medial leg numbness.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Radiculopathy</h4>
                            <div class="differential-item">
                                <strong>L4 Radiculopathy:</strong> Back pain, knee reflex loss, medial leg numbness.
                            </div>
                            <div class="differential-item">
                                <strong>L2/L3 Radiculopathy:</strong> Hip flexor weakness, anterior thigh pain.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Plexopathy</h4>
                            <div class="differential-item">
                                <strong>Lumbar Plexopathy:</strong> Diabetes, tumor, radiation, multiple nerves.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Myopathy</h4>
                            <div class="differential-item">
                                <strong>Inflammatory Myopathy:</strong> Proximal weakness, elevated CK, myopathic EMG.
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'brachial':
                    content = `
                        <h3>Brachial Plexopathy Syndromes</h3>
                        <div class="differential-category">
                            <h4>Upper Trunk (C5-C6)</h4>
                            <div class="differential-item">
                                <strong>Erb's Palsy:</strong> Birth trauma, motorcycle accident. Deltoid, biceps, supraspinatus weakness.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Lower Trunk (C8-T1)</h4>
                            <div class="differential-item">
                                <strong>Klumpke's Palsy:</strong> Hand intrinsic weakness, Horner's syndrome possible.
                            </div>
                            <div class="differential-item">
                                <strong>Pancoast Tumor:</strong> Lower trunk involvement, pain, weight loss.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Idiopathic/Inflammatory</h4>
                            <div class="differential-item">
                                <strong>Parsonage-Turner Syndrome:</strong> Acute onset, severe pain followed by weakness.
                            </div>
                        </div>
                        <div class="differential-category">
                            <h4>Traumatic</h4>
                            <div class="differential-item">
                                <strong>Stretch Injury:</strong> Motor vehicle accident, surgical positioning.
                            </div>
                            <div class="differential-item">
                                <strong>Radiation Plexopathy:</strong> Late complication, usually upper trunk.
                            </div>
                        </div>
                    `;
                    break;
            }
            
            differentialDiv.innerHTML = content;
        }
        
        // Essential utility functions
        function updateProgress(percentage) {
            document.getElementById('progress-fill').style.width = percentage + '%';
        }

        // Smart differential analysis with synonym recognition
        function analyzeDifferential() {
            const userInput = document.getElementById('user-differential').value.toLowerCase();
            const expectedDifferentials = currentCase.expectedDifferential || [];
            const feedbackDiv = document.getElementById('differential-feedback');
            
            if (!userInput.trim()) {
                feedbackDiv.innerHTML = `
                    <div class="feedback-card error">
                        <h4>🤔 Missing Input</h4>
                        <p>Please enter your differential diagnosis first!</p>
                    </div>
                `;
                return;
            }
            
            // Check for insufficient input (too short to be meaningful)
            if (userInput.trim().length < 3) {
                feedbackDiv.innerHTML = `
                    <div class="feedback-card warning">
                        <h4>🤔 Need More Detail</h4>
                        <p>Please provide more detailed input. Single letters or very short text cannot be properly analyzed.</p>
                        <p><strong>Example:</strong> Try entering actual diagnoses like "carpal tunnel syndrome" or abbreviations like "CTS".</p>
                    </div>
                `;
                return;
            }
            
            // Enhanced synonym dictionary for smart recognition
            const synonyms = {
                'cts': ['carpal tunnel syndrome', 'carpal tunnel', 'median neuropathy at wrist'],
                'carpal tunnel': ['cts', 'carpal tunnel syndrome', 'median neuropathy'],
                'cuts': ['cubital tunnel syndrome', 'ulnar neuropathy at elbow', 'ulnar entrapment'],
                'cubital tunnel': ['cuts', 'ulnar neuropathy', 'ulnar entrapment at elbow'],
                'radiculopathy': ['nerve root compression', 'pinched nerve', 'disc herniation'],
                'polyneuropathy': ['peripheral neuropathy', 'distal neuropathy', 'diabetic neuropathy'],
                'myopathy': ['muscle disease', 'muscular disorder', 'muscle weakness'],
                'als': ['amyotrophic lateral sclerosis', 'motor neuron disease', 'lou gehrig'],
                'guillain barre': ['gbs', 'guillain-barre syndrome', 'acute inflammatory demyelinating polyneuropathy', 'aidp'],
                'gbs': ['guillain barre', 'guillain-barre syndrome'],
                'cmt': ['charcot marie tooth', 'charcot-marie-tooth disease', 'hereditary neuropathy'],
                'tarsal tunnel': ['tibial neuropathy at ankle', 'posterior tibial neuropathy'],
                'peroneal neuropathy': ['fibular neuropathy', 'common peroneal neuropathy', 'foot drop'],
                'plexopathy': ['brachial plexopathy', 'lumbosacral plexopathy', 'plexus injury'],
                'myasthenia': ['mg', 'myasthenia gravis', 'neuromuscular junction disorder'],
                'stroke': ['cva', 'cerebrovascular accident', 'brain infarct', 'hemiplegia']
            };
            
            // Smart matching function with proper minimum length requirements
            function isMatch(userText, diagnosis) {
                const diagnosisLower = diagnosis.toLowerCase();
                const userLower = userText.toLowerCase().trim();
                
                // Minimum input length requirement - must be at least 3 characters
                if (userLower.length < 3) {
                    return false;
                }
                
                // Direct substring match (only if user input is meaningful)
                if (userLower.length >= 4) {
                    if (diagnosisLower.includes(userLower)) {
                        return true;
                    }
                }
                
                // Check synonyms (only with meaningful input)
                for (const [key, values] of Object.entries(synonyms)) {
                    if (key.length >= 3 && userLower.includes(key)) {
                        return values.some(synonym => diagnosisLower.includes(synonym));
                    }
                    if (diagnosisLower.includes(key)) {
                        return values.some(synonym => synonym.length >= 3 && userLower.includes(synonym));
                    }
                    if (values.some(synonym => synonym.length >= 3 && userLower.includes(synonym) && diagnosisLower.includes(key))) {
                        return true;
                    }
                }
                
                // Check individual keywords (with stricter matching)
                const diagnosisWords = diagnosisLower.split(' ').filter(word => word.length > 4);
                const userWords = userLower.split(' ').filter(word => word.length > 3);
                
                // Require at least 4-character overlap for word matching
                return diagnosisWords.some(diagWord => 
                    userWords.some(userWord => {
                        if (userWord.length >= 4 && diagWord.length >= 4) {
                            return diagWord.includes(userWord) || (userWord.length >= 5 && userWord.includes(diagWord));
                        }
                        return false;
                    })
                );
            }
            
            let matchedDiagnoses = [];
            let missedDiagnoses = [];
            
            expectedDifferentials.forEach(diagnosis => {
                if (isMatch(userInput, diagnosis)) {
                    matchedDiagnoses.push(diagnosis);
                } else {
                    missedDiagnoses.push(diagnosis);
                }
            });
            
            // Generate enhanced feedback
            let feedbackHTML = `
                <div class="analysis-header">
                    <h3>🧠 Smart Differential Analysis</h3>
                    <p>AI-powered recognition with medical abbreviations</p>
                </div>
            `;
            
            if (matchedDiagnoses.length > 0) {
                feedbackHTML += `
                    <div class="feedback-card success">
                        <h4>✅ Great job! You considered:</h4>
                        <ul class="diagnosis-list">
                            ${matchedDiagnoses.map(dx => `<li class="matched-diagnosis">${dx}</li>`).join('')}
                        </ul>
                        <p class="feedback-note">These match your input. Well done on your clinical reasoning!</p>
                    </div>
                `;
            }
            
            if (missedDiagnoses.length > 0) {
                feedbackHTML += `
                    <div class="feedback-card suggestion">
                        <h4>💡 Also consider these possibilities:</h4>
                        <ul class="diagnosis-list">
                            ${missedDiagnoses.map(dx => `<li class="missed-diagnosis">${dx}</li>`).join('')}
                        </ul>
                        <p class="feedback-note">These are important differentials to keep in mind for this presentation.</p>
                    </div>
                `;
            }
            
            // Always show the complete expected differential list for educational value
            if (matchedDiagnoses.length === 0) {
                feedbackHTML += `
                    <div class="feedback-card warning">
                        <h4>🤔 Hmm, let's think about this...</h4>
                        <p>Your input didn't match the expected differentials. Here are the key diagnoses to consider for this presentation:</p>
                    </div>
                `;
            }
            
            // Always display the complete differential list for learning
            feedbackHTML += `
                <div class="feedback-card info">
                    <h4>📚 Complete Expected Differential Diagnoses:</h4>
                    <ul class="diagnosis-list">
                        ${expectedDifferentials.map(dx => `<li class="expected-diagnosis">${dx}</li>`).join('')}
                    </ul>
                    <p class="feedback-note"><strong>Learning Point:</strong> These are the primary differentials based on the clinical presentation. Consider how each fits with the patient's symptoms and examination findings.</p>
                    ${matchedDiagnoses.length === 0 ? '<p><strong>Tip:</strong> You can use abbreviations like "CTS" for carpal tunnel syndrome!</p>' : ''}
                </div>
            `;
            
            // Always show comprehensive feedback and allow continuation
            feedbackDiv.innerHTML = feedbackHTML;
            document.getElementById('continue-to-studies').style.display = 'inline-block';
            
            console.log('📊 Differential analysis complete - matches:', matchedDiagnoses.length, 'total expected:', expectedDifferentials.length);
        }

        function checkFinalDiagnosis() {
            const userDiagnosis = document.getElementById('final-diagnosis').value.trim();
            const feedbackDiv = document.getElementById('diagnosis-feedback');
            
            if (!userDiagnosis) {
                feedbackDiv.innerHTML = '<div class="feedback-card error"><h4>📝 Missing Input</h4><p>Please enter your diagnosis first.</p></div>';
                return;
            }
            
            // Simple matching to determine if user got it right or wrong
            const correctDiagnosis = currentCase.correctDiagnosis.toLowerCase();
            const userLower = userDiagnosis.toLowerCase();
            const isCorrect = correctDiagnosis.includes(userLower) || userLower.includes(correctDiagnosis) ||
                             correctDiagnosis.split(' ').some(word => userLower.includes(word) && word.length > 3);
            
            let feedbackHTML = `
                <div class="analysis-header">
                    <h3>🎯 Final Diagnosis Review</h3>
                    <p>Your diagnosis: "<em>${userDiagnosis}</em>"</p>
                </div>
            `;
            
            if (isCorrect) {
                feedbackHTML += `
                    <div class="feedback-card success">
                        <h4>✅ Excellent! You got it right!</h4>
                        <p><strong>Correct Diagnosis:</strong> ${currentCase.correctDiagnosis}</p>
                        <p><strong>Explanation:</strong> ${currentCase.explanation}</p>
                    </div>
                `;
            } else {
                feedbackHTML += `
                    <div class="feedback-card error">
                        <h4>🤔 Not quite - let's review</h4>
                        <p><strong>Your Answer:</strong> ${userDiagnosis}</p>
                    </div>
                    <div class="feedback-card info">
                        <h4>🎯 Correct Diagnosis: ${currentCase.correctDiagnosis}</h4>
                        <p><strong>Explanation:</strong> ${currentCase.explanation}</p>
                        ${currentCase.educationalNote ? `<p><strong>Educational Note:</strong> ${currentCase.educationalNote}</p>` : ''}
                    </div>
                `;
            }
            
            // Special handling for EMG not indicated cases
            if (currentCase.emgIndication === "NOT INDICATED") {
                feedbackHTML += `
                    <div class="feedback-card warning">
                        <h4>⚠️ Important Clinical Point</h4>
                        <p><strong>EMG/NCS was NOT indicated</strong> for this case because this represents upper motor neuron pathology.</p>
                        <p>${currentCase.educationalNote || 'EMG/NCS studies evaluate the peripheral nervous system and would be normal in central lesions.'}</p>
                    </div>
                `;
            }
            
            feedbackDiv.innerHTML = feedbackHTML;
        }

        // New streamlined interface functions
        // Difficulty selection and case management
        function toggleDifficulty(difficulty) {
            const toggle = document.getElementById(`${difficulty}-toggle`);
            const checkbox = document.getElementById(`${difficulty}-checkbox`);
            const statusText = toggle.querySelector('.status-text');
            
            if (toggle.classList.contains('active')) {
                // Turn OFF
                toggle.classList.remove('active');
                toggle.classList.add('inactive');
                checkbox.checked = false;
                statusText.textContent = 'INACTIVE';
            } else {
                // Turn ON
                toggle.classList.remove('inactive');
                toggle.classList.add('active');
                checkbox.checked = true;
                statusText.textContent = 'ACTIVE';
            }
            
            updateCaseDisplay();
        }
        
        function showCaseSelection() {
            document.getElementById('case-selection-section').style.display = 'block';
            populateCaseGrid();
            // Smooth scroll to case selection
            document.getElementById('case-selection-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        function hideCaseSelection() {
            document.getElementById('case-selection-section').style.display = 'none';
        }
        
        function updateCaseDisplay() {
            const beginnerChecked = document.getElementById('beginner-checkbox').checked;
            const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
            const difficultChecked = document.getElementById('difficult-checkbox').checked;
            
            populateCaseGrid();
        }
        
        function populateCaseGrid() {
            // Function disabled - case grid interface was removed
            console.log('populateCaseGrid called but disabled (case grid removed)');
            return;
            
            const caseGrid = document.getElementById('case-grid');
            const beginnerChecked = document.getElementById('beginner-checkbox')?.checked || false;
            const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
            const difficultChecked = document.getElementById('difficult-checkbox').checked;
            
            let html = '';
            
            for (const [caseId, caseData] of Object.entries(caseDatabase)) {
                const difficulty = caseData.difficulty || 'intermediate';
                
                // Filter based on selected difficulties
                if ((difficulty === 'beginner' && !beginnerChecked) ||
                    (difficulty === 'intermediate' && !intermediateChecked) ||
                    (difficulty === 'difficult' && !difficultChecked)) {
                    continue;
                }
                
                // Check PGY level filtering
                const competencyLevel = caseData.competencyLevel || 1;
                const pgyTarget = caseData.pgyTarget || ['pgy2', 'pgy3', 'pgy4'];
                const isVisibleForCurrentPGY = currentPGYLevel === 'all' || pgyTarget.includes(currentPGYLevel);
                
                // Check competency area filtering
                const caseCompetencyArea = caseData.competencyArea?.toLowerCase() || 'ncs';
                const isVisibleForCurrentArea = currentCompetencyArea === 'all' || caseCompetencyArea === currentCompetencyArea;
                
                // Skip if not appropriate for current PGY level or competency area
                if (!isVisibleForCurrentPGY || !isVisibleForCurrentArea) {
                    continue;
                }
                
                const difficultyClass = difficulty;
                const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
                
                // Generate competency badges
                const competencyArea = caseData.competencyArea || 'General';
                const competencyBadge = `<span class="competency-badge" title="Primary Competency Area">${competencyArea} Level ${competencyLevel}</span>`;
                const pgyBadge = currentPGYLevel !== 'all' ? `<span class="pgy-appropriate-badge">✓ ${currentPGYLevel.toUpperCase()} Appropriate</span>` : '';
                
                html += `
                    <div class="case-card" onclick="toggleCaseSelection('${caseId}')" id="case-${caseId}" data-competency-level="${competencyLevel}">
                        <input type="checkbox" id="checkbox-${caseId}" onchange="event.stopPropagation(); updateCaseCard('${caseId}')">
                        <h4>${caseData.title}</h4>
                        <p><strong>Age:</strong> ${caseData.presentation.age} | <strong>Gender:</strong> ${caseData.presentation.gender}</p>
                        <p>${caseData.presentation.chiefComplaint}</p>
                        <div class="case-badges">
                            ${competencyBadge}
                            ${pgyBadge}
                            <span class="difficulty ${difficultyClass}">${difficultyText}</span>
                        </div>
                    </div>
                `;
            }
            
            if (html === '') {
                html = `
                    <div class="no-cases-message">
                        <p>No cases available for your selected PGY level (${currentPGYLevel.toUpperCase()})</p>
                        <p>Try selecting "All Levels" to see all available content, or check back as more cases are being tagged with competency levels.</p>
                    </div>
                `;
            }
            
            caseGrid.innerHTML = html;
        }
        
        function toggleCaseSelection(caseId) {
            const checkbox = document.getElementById(`checkbox-${caseId}`);
            const caseCard = document.getElementById(`case-${caseId}`);
            
            checkbox.checked = !checkbox.checked;
            updateCaseCard(caseId);
        }
        
        function updateCaseCard(caseId) {
            const checkbox = document.getElementById(`checkbox-${caseId}`);
            const caseCard = document.getElementById(`case-${caseId}`);
            
            if (checkbox.checked) {
                caseCard.classList.add('selected');
            } else {
                caseCard.classList.remove('selected');
            }
        }
        
        function selectAllCases() {
            const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                const caseId = checkbox.id.replace('checkbox-', '');
                updateCaseCard(caseId);
            });
        }
        
        function deselectAllCases() {
            const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                const caseId = checkbox.id.replace('checkbox-', '');
                updateCaseCard(caseId);
            });
        }
        
        function getSelectedCases() {
            const selectedCases = [];
            const checkboxes = document.querySelectorAll('#case-grid input[type="checkbox"]:checked');
            checkboxes.forEach(checkbox => {
                const caseId = checkbox.id.replace('checkbox-', '');
                selectedCases.push(caseId);
            });
            return selectedCases;
        }
        
        function startSelectedCases() {
            const selectedCases = getSelectedCases();
            if (selectedCases.length === 0) {
                alert('Please select at least one case first.');
                return;
            }
            
            // Start with first selected case for now
            // Could be enhanced to create a queue of cases
            const randomSelected = selectedCases[Math.floor(Math.random() * selectedCases.length)];
            startSpecificCase(randomSelected);
        }
        
        function startRandomCaseByDifficulty() {
            const beginnerChecked = document.getElementById('beginner-checkbox').checked;
            const intermediateChecked = document.getElementById('intermediate-checkbox').checked;
            const difficultChecked = document.getElementById('difficult-checkbox').checked;
            
            if (!beginnerChecked && !intermediateChecked && !difficultChecked) {
                alert('Please select at least one difficulty level first.');
                return;
            }
            
            const availableCases = [];
            for (const [caseId, caseData] of Object.entries(caseDatabase)) {
                const difficulty = caseData.difficulty || 'intermediate';
                
                if ((difficulty === 'beginner' && beginnerChecked) ||
                    (difficulty === 'intermediate' && intermediateChecked) ||
                    (difficulty === 'difficult' && difficultChecked)) {
                    availableCases.push(caseId);
                }
            }
            
            if (availableCases.length === 0) {
                alert('No cases available for the selected difficulty levels.');
                return;
            }
            
            const randomId = availableCases[Math.floor(Math.random() * availableCases.length)];
            startSpecificCase(randomId);
        }

        function startRandomCase() {
            // Use all cases for random selection
            const allCaseIds = Object.keys(caseDatabase);
            const randomId = allCaseIds[Math.floor(Math.random() * allCaseIds.length)];
            startSpecificCase(randomId);
        }

        function startSpecificCase(caseId) {
            if (!caseDatabase[caseId]) {
                alert('Case not available yet. Please try another case.');
                return;
            }

            currentCase = caseDatabase[caseId];
            currentStep = 1;  // Reset step for fresh start
            userDifferential = '';  // Clear previous differential
            
            // Hide case selection, show case interface
            document.getElementById('case-selection').style.display = 'none';
            document.getElementById('case-interface').style.display = 'block';
            
            // Populate case details
            populateCaseDetails();
            
            // Reset interface
            showCasePresentation();
            updateProgress(20);
        }

        function populateCaseDetails() {
            const case_ = currentCase;
            const caseDetailsDiv = document.getElementById('case-details');
            
            // Present all cases neutrally - no red warnings
            caseDetailsDiv.innerHTML = `
                <h4>${case_.title}</h4>
                <p><strong>Age:</strong> ${case_.presentation.age} | <strong>Gender:</strong> ${case_.presentation.gender} | <strong>Occupation:</strong> ${case_.presentation.occupation}</p>
                <p><strong>Chief Complaint:</strong> ${case_.presentation.chiefComplaint}</p>
                <p><strong>History:</strong> ${case_.presentation.history}</p>
                <p><strong>PMH:</strong> ${case_.presentation.pmh}</p>
                <p><strong>Medications:</strong> ${case_.presentation.medications}</p>
            `;
            
            // Populate physical exam
            const examDiv = document.getElementById('physical-exam-details');
            const exam = case_.physicalExam;
            examDiv.innerHTML = `
                <div class="physical-exam">
                    <div class="exam-category">
                        <h5>👁️ Inspection</h5>
                        <p>${exam.inspection}</p>
                    </div>
                    <div class="exam-category">
                        <h5>👋 Palpation</h5>
                        <p>${exam.palpation}</p>
                    </div>
                    <div class="exam-category">
                        <h5>🔄 Range of Motion</h5>
                        <p>${exam.rom}</p>
                    </div>
                    <div class="exam-category">
                        <h5>💪 Strength</h5>
                        <p>${exam.strength}</p>
                    </div>
                    <div class="exam-category">
                        <h5>👆 Sensation</h5>
                        <p>${exam.sensation}</p>
                    </div>
                    <div class="exam-category">
                        <h5>🔨 Reflexes</h5>
                        <p>${exam.reflexes}</p>
                    </div>
                    <div class="exam-category">
                        <h5>🧪 Special Tests</h5>
                        <p>${exam.specialTests}</p>
                    </div>
                </div>
            `;
        }

        function showCasePresentation() {
            hideAllSteps();
            document.getElementById('case-presentation-step').style.display = 'block';
            updateProgress(20);
        }

        function showPhysicalExam() {
            hideAllSteps();
            document.getElementById('physical-exam-step').style.display = 'block';
            updateProgress(40);
        }

        function showDifferentialBuilder() {
            hideAllSteps();
            document.getElementById('differential-step').style.display = 'block';
            updateProgress(60);
        }

        function showEMGDecision() {
            hideAllSteps();
            document.getElementById('emg-decision-step').style.display = 'block';
            updateProgress(70);
        }

        let userEMGDecision = null;

        function makeEMGDecision(indicatedDecision) {
            userEMGDecision = indicatedDecision;
            const feedbackDiv = document.getElementById('emg-decision-feedback');
            const continueBtn = document.getElementById('continue-after-decision');
            const isEMGIndicated = currentCase.emgIndication !== "NOT INDICATED";
            
            if (indicatedDecision === true && isEMGIndicated) {
                // Correct: YES for peripheral case
                feedbackDiv.innerHTML = `
                    <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #27ae60;">✅ Correct Decision</h4>
                        <p>You correctly identified that this presentation warrants EMG/NCS evaluation. This appears to be a peripheral nervous system problem that would benefit from electrodiagnostic studies.</p>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Proceed to EMG/NCS Results →';
            } else if (indicatedDecision === false && !isEMGIndicated) {
                // Correct: NO for central case
                feedbackDiv.innerHTML = `
                    <div style="background: #f0fff4; border: 2px solid #27ae60; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #27ae60;">✅ Excellent Clinical Judgment</h4>
                        <p>You correctly identified that EMG/NCS is <strong>not indicated</strong> in this case. The presentation suggests a central nervous system lesion with upper motor neuron signs.</p>
                        <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                            <h5>🚨 Immediate Management Required</h5>
                            <p>${currentCase.educationalNote}</p>
                        </div>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Complete Case Review →';
            } else if (indicatedDecision === false && isEMGIndicated) {
                // Incorrect: NO for peripheral case
                feedbackDiv.innerHTML = `
                    <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                        <p>Actually, EMG/NCS <strong>would be appropriate</strong> in this case. This presentation suggests a peripheral nervous system problem that could be localized and characterized with electrodiagnostic studies.</p>
                        <p><strong>Learning Point:</strong> EMG/NCS is indicated when there are signs of peripheral nerve, muscle, or neuromuscular junction pathology.</p>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Proceed to EMG/NCS Results (Educational) →';
            } else {
                // Incorrect: YES for central case
                feedbackDiv.innerHTML = `
                    <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #e74c3c;">❌ Reconsider Your Decision</h4>
                        <p>EMG/NCS would <strong>not be helpful</strong> in this case. The presence of upper motor neuron signs (hyperreflexia, Babinski sign, spasticity) suggests a central nervous system lesion.</p>
                        <p><strong>Learning Point:</strong> EMG/NCS evaluates the peripheral nervous system and would be normal in isolated central lesions.</p>
                        <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; margin-top: 15px;">
                            <h5>🚨 This Patient Needs:</h5>
                            <p>${currentCase.educationalNote}</p>
                        </div>
                    </div>
                `;
                continueBtn.style.display = 'inline-block';
                continueBtn.textContent = 'Complete Case Review →';
            }
        }

        function proceedAfterDecision() {
            const isEMGIndicated = currentCase.emgIndication !== "NOT INDICATED";
            
            if (userEMGDecision === true && isEMGIndicated) {
                // Show NCS results for appropriate case
                showNCSResults();
            } else if (userEMGDecision === false && !isEMGIndicated) {
                // End case appropriately for central cause
                showFinalDiagnosis();
            } else if (userEMGDecision === false && isEMGIndicated) {
                // Educational: show NCS results even though they said no
                showNCSResults();
            } else {
                // End case for central cause (they incorrectly said yes)
                showFinalDiagnosis();
            }
        }

        function showNCSResults() {
            hideAllSteps();
            document.getElementById('results-step').style.display = 'block';
            
            // Populate NCS results
            const ncsDiv = document.getElementById('ncs-results');
            if (currentCase.emgIndication === "NOT INDICATED") {
                ncsDiv.innerHTML = `
                    <div style="background: #fff5f5; border: 2px solid #e74c3c; border-radius: 8px; padding: 20px;">
                        <h4 style="color: #e74c3c;">⚠️ EMG/NCS NOT INDICATED</h4>
                        <p>${currentCase.explanation}</p>
                    </div>
                `;
            } else {
                let html = '';
                currentCase.ncsStudies.forEach(study => {
                    const resultClass = study.result === 'abnormal' ? 'abnormal-finding' : 'normal-finding';
                    html += `
                        <div class="ncs-study">
                            <h4>⚡ ${study.name}</h4>
                            <div class="${resultClass}">
                                <strong>Results:</strong> ${study.findings}
                            </div>
                            <p><strong>Interpretation:</strong> ${study.interpretation}</p>
                        </div>
                    `;
                });
                ncsDiv.innerHTML = html;
                
                // Show EMG results if required
                if (currentCase.requiresEMG && currentCase.emgStudies) {
                    document.getElementById('emg-results').style.display = 'block';
                    const emgDiv = document.getElementById('emg-details');
                    let emgHtml = '';
                    currentCase.emgStudies.forEach(study => {
                        emgHtml += `
                            <div style="margin: 15px 0; padding: 15px; background: #fff; border-left: 4px solid #f39c12; border-radius: 5px;">
                                <h5>${study.muscle}</h5>
                                <p><strong>Findings:</strong> ${study.findings}</p>
                                <p><strong>Interpretation:</strong> ${study.interpretation}</p>
                            </div>
                        `;
                    });
                    emgDiv.innerHTML = emgHtml;
                }
            }
            
            updateProgress(80);
        }

        function showFinalDiagnosis() {
            hideAllSteps();
            document.getElementById('diagnosis-step').style.display = 'block';
            updateProgress(100);
        }

        function hideAllSteps() {
            const steps = ['case-presentation-step', 'physical-exam-step', 'differential-step', 'emg-decision-step', 'results-step', 'diagnosis-step'];
            steps.forEach(stepId => {
                document.getElementById(stepId).style.display = 'none';
            });
        }

        function startNewCase() {
            // Reset all case state variables
            currentCase = null;
            currentStep = 1;
            userDifferential = '';
            
            // Reset interface
            document.getElementById('case-interface').style.display = 'none';
            document.getElementById('case-selection').style.display = 'block';
            
            // Clear form data
            document.getElementById('user-differential').value = '';
            document.getElementById('final-diagnosis').value = '';
            document.getElementById('differential-feedback').innerHTML = '';
            document.getElementById('diagnosis-feedback').innerHTML = '';
            document.getElementById('continue-to-studies').style.display = 'none';
            
            // Hide EMG results
            document.getElementById('emg-results').style.display = 'none';
            
            // Reset progress
            updateProgress(0);
            currentCase = null;
        }
        
        // Initialize videos when page loads
        function initializeVideos() {
            const videos = [
                {
                    title: "📍 Median Motor Study",
                    description: "Median motor nerve conduction technique for carpal tunnel evaluation",
                    recording: "Thenar muscles (APB)",
                    stimulation: "Wrist & elbow",
                    videoUrl: "https://www.youtube.com/embed/cdVrcgeBgIg"
                },
                {
                    title: "📍 Median Sensory Study",
                    description: "Median sensory nerve conduction study - digit 3 to wrist",
                    recording: "Digit 3 to wrist",
                    stimulation: "Orthodromic stimulation",
                    videoUrl: "https://www.youtube.com/embed/86j7cNLIX0U"
                },
                {
                    title: "📍 Ulnar Motor Study", 
                    description: "Ulnar motor nerve conduction technique with across-elbow segment",
                    recording: "Hypothenar muscles (ADM)",
                    stimulation: "Wrist, below & above elbow",
                    videoUrl: "https://www.youtube.com/embed/UmFYJDMucOY"
                },
                {
                    title: "📍 Ulnar Sensory Study",
                    description: "Ulnar sensory nerve conduction study - digit 5 to wrist", 
                    recording: "Digit 5 to wrist",
                    stimulation: "Orthodromic stimulation",
                    videoUrl: "https://www.youtube.com/embed/i9Naurf0eWU"
                },
                {
                    title: "📍 Dorsal Ulnar Cutaneous Study",
                    description: "DUC study for differentiating ulnar neuropathy location",
                    recording: "Dorsal hand to forearm",
                    stimulation: "Antidromic stimulation",
                    videoUrl: "https://www.youtube.com/embed/U-60ft_8klI"
                },
                {
                    title: "📍 Radial Sensory Study",
                    description: "Superficial radial sensory nerve conduction study",
                    recording: "Dorsal web space to forearm",
                    stimulation: "Antidromic stimulation",
                    videoUrl: "https://www.youtube.com/embed/nMaxrbpyR-0"
                },
                {
                    title: "📍 Common Fibular Motor Study",
                    description: "Common fibular (peroneal) motor nerve conduction for drop foot evaluation",
                    recording: "Extensor digitorum brevis (EDB)", 
                    stimulation: "Ankle, fibular head & popliteal fossa",
                    videoUrl: "https://www.youtube.com/embed/G1bsDinxuF8"
                },
                {
                    title: "📍 Superficial Fibular Study",
                    description: "Superficial fibular sensory nerve conduction study",
                    recording: "Lateral foot to leg",
                    stimulation: "Antidromic stimulation",
                    videoUrl: "https://www.youtube.com/embed/M1sE2FT8YQg"
                },
                {
                    title: "📍 Tibial Motor Study",
                    description: "Tibial motor nerve conduction technique",
                    recording: "Abductor hallucis (AH)",
                    stimulation: "Ankle, popliteal fossa",
                    videoUrl: "https://www.youtube.com/embed/pWeH6kCa9lo"
                },
                {
                    title: "📍 Sural Sensory Study",
                    description: "Sural sensory nerve conduction - important for polyneuropathy screening",
                    recording: "Lateral foot to calf",
                    stimulation: "Antidromic stimulation",
                    videoUrl: "https://www.youtube.com/embed/zP1yAU5DW2s"
                }
            ];
            
            const container = document.getElementById('video-grid');
            let html = '';
            
            videos.forEach(video => {
                html += `
                    <div class="video-card">
                        <h3>${video.title}</h3>
                        <div class="video-container">
                            <iframe width="100%" height="100%" src="${video.videoUrl}" 
                                    frameborder="0" allowfullscreen 
                                    title="${video.description}">
                            </iframe>
                        </div>
                        <div class="video-info">
                            <p><strong>Description:</strong> ${video.description}</p>
                            <p><strong>Recording:</strong> ${video.recording}</p>
                            <p><strong>Stimulation:</strong> ${video.stimulation}</p>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = html;
        }
        
        // Advanced Muscle Localization Lab (Tab 8)
        window.AdvancedMuscleTest = {
            currentMode: 'regional',
            isTestActive: false,
            currentQuestion: null,
            stats: {
                questionsAnswered: 0,
                correctAnswers: 0,
                currentStreak: 0
            },
            
            setMode: function(mode) {
                this.currentMode = mode;
                document.querySelectorAll('.mode-card').forEach(card => {
                    card.classList.remove('selected');
                });
                event.target.closest('.mode-card').classList.add('selected');
                console.log('🎯 Training mode set to:', mode);
            },
            
            startTest: function() {
                this.isTestActive = true;
                document.getElementById('advanced-muscle-test-modal').style.display = 'flex';
                this.generateQuestion();
                console.log('🚀 Advanced muscle test started');
            },
            
            stopTest: function() {
                this.isTestActive = false;
                document.getElementById('advanced-muscle-test-modal').style.display = 'none';
                console.log('⏹️ Advanced muscle test stopped');
            },
            
            generateQuestion: function() {
                const questions = this.getQuestionPool();
                this.currentQuestion = questions[Math.floor(Math.random() * questions.length)];
                this.displayQuestion();
            },
            
            getQuestionPool: function() {
                return [
                    {
                        muscle: "Flexor pollicis longus",
                        nerve: "Anterior interosseous nerve (branch of median)",
                        roots: "C7, C8, T1",
                        region: "UE",
                        context: "Patient unable to flex thumb IP joint, but thenar muscles intact"
                    },
                    {
                        muscle: "Extensor indicis proprius",
                        nerve: "Posterior interosseous nerve (branch of radial)",
                        roots: "C7, C8",
                        region: "UE",
                        context: "Isolated weakness of index finger extension"
                    },
                    {
                        muscle: "Tibialis posterior",
                        nerve: "Tibial nerve",
                        roots: "L4, L5",
                        region: "LE",
                        context: "Foot drop with preserved dorsiflexion but weak inversion"
                    }
                ];
            },
            
            displayQuestion: function() {
                const question = this.currentQuestion;
                document.getElementById('advanced-question-text').textContent = 
                    `What nerve innervates the ${question.muscle}?`;
                
                const options = this.generateAnswerOptions(question);
                this.displayAnswerOptions(options);
            },
            
            generateAnswerOptions: function(question) {
                const correct = question.nerve;
                const distractors = [
                    "Median nerve",
                    "Ulnar nerve", 
                    "Radial nerve",
                    "Tibial nerve",
                    "Common peroneal nerve"
                ].filter(option => option !== correct);
                
                const shuffled = [correct, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5);
                return shuffled.map((option, index) => ({
                    id: String.fromCharCode(65 + index),
                    text: option,
                    correct: option === correct
                }));
            },
            
            displayAnswerOptions: function(options) {
                const container = document.getElementById('advanced-answer-options');
                container.innerHTML = options.map(option => `
                    <div class="answer-option-advanced" data-answer="${option.id}" onclick="AdvancedMuscleTest.selectAnswer('${option.id}')">
                        <div class="option-letter">${option.id}</div>
                        <div class="option-text">${option.text}</div>
                    </div>
                `).join('');
            },
            
            selectAnswer: function(answerId) {
                document.querySelectorAll('.answer-option-advanced').forEach(option => {
                    option.classList.remove('selected');
                });
                document.querySelector(`[data-answer="${answerId}"]`).classList.add('selected');
                document.getElementById('advanced-submit-btn').disabled = false;
            },
            
            submitAnswer: function() {
                const selectedOption = document.querySelector('.answer-option-advanced.selected');
                if (!selectedOption) return;
                
                const isCorrect = this.checkAnswer(selectedOption.dataset.answer);
                this.updateStatsAfterAnswer(isCorrect);
                this.showFeedback(isCorrect);
                
                document.getElementById('advanced-submit-btn').style.display = 'none';
                document.getElementById('advanced-next-btn').style.display = 'block';
            },
            
            checkAnswer: function(answerId) {
                const options = this.generateAnswerOptions(this.currentQuestion);
                const selectedOption = options.find(opt => opt.id === answerId);
                return selectedOption && selectedOption.correct;
            },
            
            updateStatsAfterAnswer: function(isCorrect) {
                this.stats.questionsAnswered++;
                if (isCorrect) {
                    this.stats.correctAnswers++;
                    this.stats.currentStreak++;
                } else {
                    this.stats.currentStreak = 0;
                }
            },
            
            showFeedback: function(isCorrect) {
                const feedbackContainer = document.getElementById('advanced-feedback');
                const question = this.currentQuestion;
                
                feedbackContainer.innerHTML = `
                    <div class="feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
                        <h4>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h4>
                        <p><strong>${question.muscle}</strong> is innervated by the <strong>${question.nerve}</strong></p>
                        <p><strong>Nerve roots:</strong> ${question.roots}</p>
                        <p><strong>Clinical context:</strong> ${question.context}</p>
                    </div>
                `;
            },
            
            nextQuestion: function() {
                document.getElementById('advanced-submit-btn').style.display = 'block';
                document.getElementById('advanced-next-btn').style.display = 'none';
                document.getElementById('advanced-submit-btn').disabled = true;
                document.getElementById('advanced-feedback').innerHTML = '';
                
                this.generateQuestion();
            },
            
            reviewMissed: function() {
                alert('Review missed questions functionality coming soon!');
            }
        };

        // EMG Localization Challenge (Tab 9)
        window.EMGChallenge = {
            currentSettings: {
                difficulty: 'moderate',
                region: 'mixed',
                type: 'localization'
            },
            isActive: false,
            currentCase: null,
            activeQuestionTypes: {
                root: true,
                trunk: true,
                cord: true,
                peripheral: true
            },
            
            lesionSites: {
                UE: {
                    'C5 nerve root': { type: 'root', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Infraspinatus'] },
                    'C6 nerve root': { type: 'root', muscles: ['Biceps brachii', 'Brachioradialis', 'Extensor carpi radialis'] },
                    'C7 nerve root': { type: 'root', muscles: ['Triceps brachii', 'Extensor digitorum', 'Flexor carpi radialis'] },
                    'C8 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
                    'T1 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Abductor digiti minimi'] },
                    'Upper trunk (C5-C6)': { type: 'trunk', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Brachioradialis'] },
                    'Middle trunk (C7)': { type: 'trunk', muscles: ['Triceps brachii', 'Extensor digitorum', 'Flexor carpi radialis'] },
                    'Lower trunk (C8-T1)': { type: 'trunk', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
                    'Posterior cord': { type: 'cord', muscles: ['Deltoid', 'Triceps brachii', 'Extensor digitorum', 'Brachioradialis'] },
                    'Medial cord': { type: 'cord', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
                    'Lateral cord': { type: 'cord', muscles: ['Biceps brachii', 'Brachialis', 'Pronator teres'] },
                    'Median nerve at wrist (carpal tunnel)': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Opponens pollicis'] },
                    'Median nerve at forearm': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Flexor pollicis longus', 'Pronator teres', 'Flexor carpi radialis'] },
                    'Ulnar nerve at wrist (Guyon canal)': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Abductor digiti minimi', 'Adductor pollicis'] },
                    'Ulnar nerve at elbow': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
                    'Radial nerve in spiral groove': { type: 'peripheral', muscles: ['Triceps brachii', 'Brachioradialis', 'Extensor digitorum'] },
                    'Posterior interosseous nerve': { type: 'peripheral', muscles: ['Extensor digitorum', 'Extensor pollicis longus'] },
                    'Axillary nerve': { type: 'peripheral', muscles: ['Deltoid', 'Teres minor'] },
                    'Suprascapular nerve': { type: 'peripheral', muscles: ['Supraspinatus', 'Infraspinatus'] }
                },
                LE: {
                    'L2 nerve root': { type: 'root', muscles: ['Iliopsoas (psoas major)', 'Adductor longus', 'Sartorius'] },
                    'L3 nerve root': { type: 'root', muscles: ['Rectus femoris', 'Vastus medialis', 'Adductor longus'] },
                    'L4 nerve root': { type: 'root', muscles: ['Tibialis anterior', 'Rectus femoris', 'Vastus medialis'] },
                    'L5 nerve root': { type: 'root', muscles: ['Extensor hallucis longus', 'Tibialis anterior', 'Gluteus medius', 'Biceps femoris (short head)'] },
                    'S1 nerve root': { type: 'root', muscles: ['Gastrocnemius', 'Gluteus maximus', 'Biceps femoris (long head)'] },
                    'Femoral nerve': { type: 'peripheral', muscles: ['Rectus femoris', 'Vastus medialis', 'Vastus lateralis', 'Sartorius'] },
                    'Peroneal nerve at fibular head': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Fibularis longus'] },
                    'Deep peroneal nerve': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Extensor digitorum brevis'] },
                    'Sciatic nerve': { type: 'peripheral', muscles: ['Biceps femoris (long head)', 'Semitendinosus', 'Gastrocnemius'] },
                    'Tibial nerve': { type: 'peripheral', muscles: ['Gastrocnemius', 'Soleus', 'Flexor hallucis longus'] },
                    'Superior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus medius', 'Gluteus minimus', 'Tensor fasciae latae'] },
                    'Inferior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus maximus'] }
                }
            },
            
            startChallenge: function() {
                this.isActive = true;
                
                document.getElementById('emg-challenge-setup').style.display = 'none';
                document.getElementById('emg-challenge-active').style.display = 'block';
                
                this.generateCase();
                console.log('🚀 EMG Challenge started');
            },
            
            toggleQuestionType: function(type) {
                console.log('🎯 Toggle called for:', type);
                // Toggle the state
                this.activeQuestionTypes[type] = !this.activeQuestionTypes[type];
                
                // Update UI
                const option = document.querySelector(`[data-type="${type}"]`);
                const indicator = option.querySelector('.status-indicator');
                const text = option.querySelector('.status-text');
                
                if (this.activeQuestionTypes[type]) {
                    option.classList.add('active');
                    indicator.classList.add('active');
                    text.textContent = 'Active';
                } else {
                    option.classList.remove('active');
                    indicator.classList.remove('active');
                    text.textContent = 'Inactive';
                }
                
                // Check if at least one type is active
                const hasActiveType = Object.values(this.activeQuestionTypes).some(active => active);
                const launchBtn = document.querySelector('.launch-challenge-btn');
                const launchNote = document.querySelector('.launch-note');
                
                if (!hasActiveType) {
                    launchBtn.disabled = true;
                    launchBtn.style.opacity = '0.5';
                    launchNote.textContent = 'At least one question type must be selected';
                    launchNote.style.color = '#ef4444';
                } else {
                    launchBtn.disabled = false;
                    launchBtn.style.opacity = '1';
                    launchNote.textContent = 'Ready to launch challenge';
                    launchNote.style.color = '#6b7280';
                }
                
                console.log('🎯 Question type toggled:', type, '→', this.activeQuestionTypes[type]);
            },
            
            generateCase: function() {
                this.currentCase = this.getCaseData();
                this.displayCase();
            },
            
            displayCase: function() {
                if (!this.currentCase) return;
                
                const case_data = this.currentCase;
                
                // Display scenario
                const scenarioEl = document.getElementById('challenge-scenario-text');
                if (scenarioEl) {
                    scenarioEl.textContent = case_data.scenario;
                }
                
                // Display muscle findings
                const abnormalEl = document.getElementById('challenge-abnormal-muscles');
                const normalEl = document.getElementById('challenge-normal-muscles');
                
                if (abnormalEl) {
                    abnormalEl.innerHTML = case_data.abnormalMuscles.map(muscle => `<li>${muscle}</li>`).join('');
                }
                
                if (normalEl) {
                    normalEl.innerHTML = case_data.normalMuscles.map(muscle => `<li>${muscle}</li>`).join('');
                }
                
                // Display answer options
                const optionsEl = document.getElementById('challenge-answer-options');
                if (optionsEl && case_data.options) {
                    optionsEl.innerHTML = case_data.options.map((option, index) => `
                        <div class="emg-answer-option" data-answer="${option}" onclick="window.EMGChallenge.selectAnswer('${option}')">
                            <div class="option-content">${option}</div>
                            <div class="option-indicator">○</div>
                        </div>
                    `).join('');
                }
                
                // Reset selected answer
                this.selectedAnswer = null;
                
                // Disable submit button until an answer is selected
                const submitBtn = document.getElementById('challenge-submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                }
            },
            
            selectAnswer: function(answer) {
                this.selectedAnswer = answer;
                
                // Update UI to show selection
                const options = document.querySelectorAll('.emg-answer-option');
                options.forEach(option => {
                    option.classList.remove('selected');
                    const indicator = option.querySelector('.option-indicator');
                    if (indicator) indicator.textContent = '○';
                });
                
                const selectedOption = document.querySelector(`[data-answer="${answer}"]`);
                if (selectedOption) {
                    selectedOption.classList.add('selected');
                    const indicator = selectedOption.querySelector('.option-indicator');
                    if (indicator) indicator.textContent = '●';
                }
                
                // Enable submit button
                const submitBtn = document.getElementById('challenge-submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            },
            
            submitAnswer: function() {
                if (!this.selectedAnswer) {
                    alert('Please select an answer before submitting.');
                    return;
                }
                
                console.log('📝 Submitting answer:', this.selectedAnswer);
                
                const isCorrect = this.selectedAnswer === this.currentCase.correctAnswer;
                
                // Show feedback
                this.showFeedback(isCorrect);
                
                // Update buttons
                const submitBtn = document.getElementById('challenge-submit-btn');
                const nextBtn = document.getElementById('challenge-next-btn');
                
                if (submitBtn) submitBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'block';
            },
            
            showFeedback: function(isCorrect) {
                const feedbackEl = document.getElementById('challenge-feedback');
                if (!feedbackEl) return;
                
                const case_data = this.currentCase;
                feedbackEl.innerHTML = `
                    <div class="feedback-header ${isCorrect ? 'correct' : 'incorrect'}">
                        <h4>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h4>
                    </div>
                    <div class="feedback-content">
                        <p><strong>Your Answer:</strong> ${this.selectedAnswer}</p>
                        <p><strong>Correct Answer:</strong> ${case_data.correctAnswer}</p>
                        <p><strong>Explanation:</strong> ${case_data.explanation}</p>
                    </div>
                `;
                feedbackEl.style.display = 'block';
            },
            
            nextCase: function() {
                console.log('➡️ Loading next case...');
                
                // Hide feedback
                const feedbackEl = document.getElementById('challenge-feedback');
                if (feedbackEl) {
                    feedbackEl.style.display = 'none';
                }
                
                // Reset buttons
                const submitBtn = document.getElementById('challenge-submit-btn');
                const nextBtn = document.getElementById('challenge-next-btn');
                
                if (submitBtn) {
                    submitBtn.style.display = 'block';
                    submitBtn.disabled = true;  // Will be enabled when answer is selected
                }
                if (nextBtn) nextBtn.style.display = 'none';
                
                // Generate new case
                this.generateCase();
            },
            
            backToSettings: function() {
                console.log('🔙 Returning to settings...');
                
                // Reset challenge state
                this.isActive = false;
                this.currentCase = null;
                this.selectedAnswer = null;
                
                // Hide active challenge and show setup
                document.getElementById('emg-challenge-active').style.display = 'none';
                document.getElementById('emg-challenge-setup').style.display = 'block';
                
                // Hide feedback
                const feedbackEl = document.getElementById('challenge-feedback');
                if (feedbackEl) {
                    feedbackEl.style.display = 'none';
                }
            },
            
            getFilteredLesions: function() {
                const filtered = { UE: {}, LE: {} };
                
                // Filter lesions based on active question types
                ['UE', 'LE'].forEach(region => {
                    Object.entries(this.lesionSites[region]).forEach(([lesionName, lesionData]) => {
                        if (this.activeQuestionTypes[lesionData.type]) {
                            filtered[region][lesionName] = lesionData;
                        }
                    });
                });
                
                return filtered;
            },
            
            getCaseData: function() {
                // Get a random lesion from filtered lesions
                const filteredLesions = this.getFilteredLesions();
                
                // Choose a region first (UE or LE), then select lesion within that region
                const regions = [];
                if (Object.keys(filteredLesions.UE).length > 0) regions.push('UE');
                if (Object.keys(filteredLesions.LE).length > 0) regions.push('LE');
                
                if (regions.length === 0) {
                    console.error('No active lesion types found');
                    return null;
                }
                
                // Pick a random region
                const selectedRegion = regions[Math.floor(Math.random() * regions.length)];
                const regionLesions = Object.entries(filteredLesions[selectedRegion]);
                
                if (regionLesions.length === 0) {
                    console.error('No lesions found in selected region:', selectedRegion);
                    return null;
                }
                
                const [lesionName, lesionData] = regionLesions[Math.floor(Math.random() * regionLesions.length)];
                
                // Clinical scenarios that don't give away the answer
                const scenarios = this.getRealisticScenarios();
                const scenario = scenarios[lesionData.type] || scenarios.default;
                
                // Get muscles actually affected by this lesion based on muscle database
                const actuallyAffectedMuscles = this.getMusclesAffectedByLesion(lesionName, lesionData.type, selectedRegion);
                
                // Fallback to hardcoded muscles if no matches found
                const abnormalMuscles = actuallyAffectedMuscles.length > 0 
                    ? actuallyAffectedMuscles 
                    : lesionData.muscles;
                
                // Generate realistic normal muscles (muscles NOT affected by this lesion) from SAME region
                const normalMuscles = this.generateNormalMuscles(lesionName, lesionData, selectedRegion);
                
                // Generate multiple choice options
                const options = this.generateAnswerOptions(lesionName, lesionData);
                
                console.log(`🧠 Lesion: ${lesionName}, Affected muscles from DB:`, actuallyAffectedMuscles);
                console.log(`🧠 Normal muscles for case:`, normalMuscles);
                
                const case_data = {
                    scenario: scenario,
                    abnormalMuscles: abnormalMuscles.slice(0, Math.min(4, abnormalMuscles.length)),
                    normalMuscles: normalMuscles,
                    correctAnswer: lesionName,
                    options: options,
                    explanation: this.getExplanation(lesionName, lesionData)
                };
                
                console.log(`🧠 Final case_data.normalMuscles:`, case_data.normalMuscles);
                
                return case_data;
            },
            
            getRealisticScenarios: function() {
                return {
                    root: "A patient presents with weakness and sensory changes following trauma. EMG needle examination reveals the following pattern:",
                    plexus: "A patient with recent shoulder trauma presents with weakness and numbness. Needle EMG findings are shown below:",
                    peripheral: "A patient reports progressive weakness and sensory symptoms. The following EMG needle examination results were obtained:",
                    default: "Clinical presentation includes weakness and sensory changes. EMG needle examination shows the following pattern:"
                };
            },
            
            // NEW: Get muscles actually affected by a lesion based on muscle database
            getMusclesAffectedByLesion: function(lesionName, lesionType, selectedRegion) {
                const affectedMuscles = [];
                
                console.log(`🔬 Analyzing lesion: "${lesionName}" (type: ${lesionType}, region: ${selectedRegion})`);
                
                // Go through all muscles in the muscle database for this region
                console.log(`🔍 Debug: window.MuscleAnatomy exists?`, !!window.MuscleAnatomy);
                console.log(`🔍 Debug: this.muscleDatabase exists?`, !!this.muscleDatabase);
                console.log(`🔍 Debug: MuscleAnatomy object:`, typeof MuscleAnatomy, Object.keys(MuscleAnatomy || {}));
                
                const muscleDB = MuscleAnatomy?.muscleDatabase || window.MuscleAnatomy?.muscleDatabase || this.muscleDatabase || {};
                console.log(`🔍 MuscleDB found:`, Object.keys(muscleDB).length, 'muscles');
                console.log(`🔍 First 3 muscles in DB:`, Object.keys(muscleDB).slice(0, 3));
                
                Object.entries(muscleDB).forEach(([muscleName, muscleData]) => {
                    if (muscleData.region !== selectedRegion) return;
                    
                    let isAffected = false;
                    
                    switch(lesionType) {
                        case 'root':
                            // Extract root from lesion name (e.g., "C6 nerve root" -> "C6")
                            const match = lesionName.match(/([CLSclsT]\d+)/);
                            if (match) {
                                const lesionRoot = match[1].toUpperCase();
                                isAffected = muscleData.roots && muscleData.roots.includes(lesionRoot);
                                if (isAffected) {
                                    console.log(`  ✅ ${muscleName} affected by ${lesionRoot} (roots: ${muscleData.roots})`);
                                }
                            }
                            break;
                        case 'trunk':
                            const trunkName = lesionName.toLowerCase().split(' ')[0]; // e.g., "upper" from "Upper trunk"
                            isAffected = muscleData.trunk && muscleData.trunk.toLowerCase().includes(trunkName);
                            break;
                        case 'cord':
                            const cordName = lesionName.toLowerCase().split(' ')[0]; // e.g., "lateral" from "Lateral cord"
                            isAffected = muscleData.cord && muscleData.cord.toLowerCase().includes(cordName);
                            break;
                        case 'peripheral':
                            isAffected = muscleData.peripheralNerve && 
                                        (muscleData.peripheralNerve.toLowerCase().includes(lesionName.toLowerCase()) ||
                                         lesionName.toLowerCase().includes(muscleData.peripheralNerve.toLowerCase()));
                            break;
                    }
                    
                    if (isAffected) {
                        affectedMuscles.push(muscleName);
                    }
                });
                
                console.log(`🎯 Total affected muscles: ${affectedMuscles.length}`, affectedMuscles);
                return affectedMuscles;
            },

            generateNormalMuscles: function(lesionName, lesionData, selectedRegion) {
                // Get all muscles from this region
                const muscleDB = MuscleAnatomy?.muscleDatabase || window.MuscleAnatomy?.muscleDatabase || this.muscleDatabase || {};
                console.log(`🧪 generateNormalMuscles: MuscleDB has ${Object.keys(muscleDB).length} muscles`);
                
                const allRegionMuscles = Object.keys(muscleDB).filter(muscleName => 
                    muscleDB[muscleName].region === selectedRegion
                );
                console.log(`🧪 generateNormalMuscles: Found ${allRegionMuscles.length} muscles for region ${selectedRegion}`);
                
                // Get muscles that would actually be affected by this lesion
                const actuallyAffectedMuscles = this.getMusclesAffectedByLesion(lesionName, lesionData.type, selectedRegion);
                console.log(`🧪 generateNormalMuscles: ${actuallyAffectedMuscles.length} muscles affected by ${lesionName}`);
                
                // Normal muscles are those NOT affected by this lesion
                const availableNormals = allRegionMuscles.filter(muscle => 
                    !actuallyAffectedMuscles.includes(muscle)
                );
                
                console.log(`🔍 Debug Normal Muscles for ${lesionName}:`);
                console.log(`   All region muscles: ${allRegionMuscles.length}`, allRegionMuscles.slice(0, 5));
                console.log(`   Actually affected: ${actuallyAffectedMuscles.length}`, actuallyAffectedMuscles);
                console.log(`   Available normals: ${availableNormals.length}`, availableNormals.slice(0, 5));
                
                // If we don't have enough normal muscles, fall back to hardcoded approach
                if (availableNormals.length < 2) {
                    console.log(`⚠️ Not enough normal muscles found, using fallback approach`);
                    // Use the old hardcoded approach as fallback
                    const regionMuscles = Object.values(this.lesionSites[selectedRegion]).flatMap(site => site.muscles);
                    const fallbackNormals = [...new Set(regionMuscles)].filter(muscle => 
                        !lesionData.muscles.includes(muscle)
                    );
                    const shuffled = fallbackNormals.sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, Math.min(4, shuffled.length));
                }
                
                // Randomly select 3-4 normal muscles from the same region
                const shuffled = availableNormals.sort(() => 0.5 - Math.random());
                const finalNormalMuscles = shuffled.slice(0, Math.min(4, shuffled.length));
                console.log(`🎯 generateNormalMuscles returning:`, finalNormalMuscles);
                return finalNormalMuscles;
            },
            
            generateAnswerOptions: function(correctAnswer, lesionData) {
                // Determine if correct answer is UE or LE
                const isUE = this.lesionSites.UE.hasOwnProperty(correctAnswer);
                const regionLesions = isUE ? Object.keys(this.lesionSites.UE) : Object.keys(this.lesionSites.LE);
                const regionData = isUE ? this.lesionSites.UE : this.lesionSites.LE;
                
                // Get active question types
                const activeTypes = Object.keys(this.activeQuestionTypes).filter(type => this.activeQuestionTypes[type]);
                const multipleTypesActive = activeTypes.length > 1;
                
                let distractors = [];
                let targetCount = multipleTypesActive ? 7 : 4; // 8 total vs 5 total options
                
                if (multipleTypesActive) {
                    // When multiple types are active, include answers from all active types
                    console.log('🎯 Multiple types active:', activeTypes);
                    
                    // Get lesions from each active type (same region)
                    activeTypes.forEach(type => {
                        if (type === lesionData.type) return; // Skip same type as correct answer initially
                        
                        const typeSpecificLesions = regionLesions.filter(lesion => 
                            regionData[lesion].type === type
                        );
                        
                        // Add 1-2 from each type for variety
                        const shuffled = typeSpecificLesions.sort(() => 0.5 - Math.random());
                        const count = Math.min(2, shuffled.length);
                        distractors.push(...shuffled.slice(0, count));
                    });
                    
                    // Fill remaining slots with intelligent choices
                    const remainingSlots = targetCount - distractors.length;
                    if (remainingSlots > 0) {
                        // Add same-type lesions that might be confusing
                        const sameTypeLesions = regionLesions.filter(lesion => 
                            regionData[lesion].type === lesionData.type && 
                            lesion !== correctAnswer &&
                            !distractors.includes(lesion)
                        );
                        
                        // Intelligent selection: prefer lesions that share some muscles with the correct answer
                        const intelligentChoices = sameTypeLesions.filter(lesion => {
                            const sharedMuscles = regionData[lesion].muscles.some(muscle => 
                                lesionData.muscles.includes(muscle)
                            );
                            return sharedMuscles;
                        });
                        
                        const shuffledIntelligent = intelligentChoices.sort(() => 0.5 - Math.random());
                        const remainingFromSameType = sameTypeLesions.filter(l => !intelligentChoices.includes(l));
                        const shuffledRemaining = remainingFromSameType.sort(() => 0.5 - Math.random());
                        
                        const finalChoices = [
                            ...shuffledIntelligent.slice(0, Math.min(remainingSlots, intelligentChoices.length)),
                            ...shuffledRemaining.slice(0, Math.max(0, remainingSlots - intelligentChoices.length))
                        ];
                        
                        distractors.push(...finalChoices.slice(0, remainingSlots));
                    }
                    
                } else {
                    // Single type active - original behavior but refined
                    const sameTypeRegionLesions = regionLesions.filter(lesion => {
                        return regionData[lesion].type === lesionData.type;
                    });
                    
                    // Remove correct answer from pool
                    const availableDistractors = sameTypeRegionLesions.filter(l => l !== correctAnswer);
                    
                    if (availableDistractors.length >= targetCount) {
                        // Prioritize confusing similar lesions
                        const intelligentChoices = availableDistractors.filter(lesion => {
                            const sharedMuscles = regionData[lesion].muscles.some(muscle => 
                                lesionData.muscles.includes(muscle)
                            );
                            return sharedMuscles;
                        });
                        
                        const remainingChoices = availableDistractors.filter(l => !intelligentChoices.includes(l));
                        const shuffledIntelligent = intelligentChoices.sort(() => 0.5 - Math.random());
                        const shuffledRemaining = remainingChoices.sort(() => 0.5 - Math.random());
                        
                        // Mix intelligent and random choices
                        const mixedChoices = [
                            ...shuffledIntelligent.slice(0, Math.min(2, intelligentChoices.length)),
                            ...shuffledRemaining.slice(0, targetCount - Math.min(2, intelligentChoices.length))
                        ];
                        
                        distractors = mixedChoices.slice(0, targetCount);
                    } else {
                        // Use all available same-type distractors
                        distractors = [...availableDistractors];
                        
                        // Fill remaining with other types if needed
                        if (distractors.length < targetCount) {
                            const otherRegionTypes = regionLesions.filter(lesion => 
                                !sameTypeRegionLesions.includes(lesion) && lesion !== correctAnswer
                            );
                            const additionalNeeded = targetCount - distractors.length;
                            const shuffledOthers = otherRegionTypes.sort(() => 0.5 - Math.random());
                            distractors = [...distractors, ...shuffledOthers.slice(0, additionalNeeded)];
                        }
                    }
                }
                
                // Combine with correct answer and shuffle
                const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
                
                console.log(`🎯 Generated ${options.length} options for ${correctAnswer}:`, options);
                return options;
            },
            
            getExplanation: function(lesionName, lesionData) {
                const muscleList = lesionData.muscles.slice(0, 3).join(', ');
                return `This EMG pattern is consistent with ${lesionName}. The denervation pattern involving ${muscleList} localizes to this specific anatomical site. Other lesions would show different muscle involvement patterns.`;
            },
            
            displayCase: function() {
                const case_data = this.currentCase;
                
                // Display scenario
                document.getElementById('challenge-scenario-text').textContent = case_data.scenario;
                
                // Display muscle findings
                document.getElementById('challenge-abnormal-muscles').innerHTML = 
                    case_data.abnormalMuscles.map(muscle => `<li>${muscle}</li>`).join('');
                document.getElementById('challenge-normal-muscles').innerHTML = 
                    case_data.normalMuscles.map(muscle => `<li>${muscle}</li>`).join('');
                
                // Display answer options
                const shuffledOptions = [...case_data.options].sort(() => Math.random() - 0.5);
                document.getElementById('challenge-answer-options').innerHTML = 
                    shuffledOptions.map((option, index) => `
                        <div class="answer-option-challenge" data-answer="${option}" onclick="EMGChallenge.selectAnswer('${option}')">
                            <div class="option-text-challenge">${option}</div>
                        </div>
                    `).join('');
                
                // Reset buttons
                document.getElementById('challenge-submit-btn').disabled = true;
                document.getElementById('challenge-submit-btn').style.display = 'block';
                document.getElementById('challenge-next-btn').style.display = 'none';
                document.getElementById('challenge-feedback').style.display = 'none';
            },
            
            selectAnswer: function(answer) {
                document.querySelectorAll('.answer-option-challenge').forEach(option => {
                    option.classList.remove('selected');
                });
                document.querySelector(`[data-answer="${answer}"]`).classList.add('selected');
                document.getElementById('challenge-submit-btn').disabled = false;
            },
            
            submitAnswer: function() {
                const selectedOption = document.querySelector('.answer-option-challenge.selected');
                if (!selectedOption) return;
                
                const selectedAnswer = selectedOption.dataset.answer;
                const isCorrect = selectedAnswer === this.currentCase.correctAnswer;
                
                this.showChallengeFeedback(isCorrect, selectedAnswer);
                
                document.getElementById('challenge-submit-btn').style.display = 'none';
                document.getElementById('challenge-next-btn').style.display = 'block';
            },
            
            showChallengeFeedback: function(isCorrect, selectedAnswer) {
                const feedbackDiv = document.getElementById('challenge-feedback');
                const case_data = this.currentCase;
                
                feedbackDiv.innerHTML = `
                    <div class="challenge-feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
                        <h4>${isCorrect ? '🎯 Excellent Analysis!' : '🔍 Learning Opportunity'}</h4>
                        <div class="feedback-content">
                            <p><strong>Your answer:</strong> ${selectedAnswer}</p>
                            <p><strong>Correct answer:</strong> ${case_data.correctAnswer}</p>
                            <p><strong>Explanation:</strong> ${case_data.explanation}</p>
                        </div>
                    </div>
                `;
                
                feedbackDiv.style.display = 'block';
            },
            
            nextCase: function() {
                this.generateCase();
            },
            
            getFilteredLesions: function() {
                const filtered = { UE: {}, LE: {} };
                
                // Get the lesion sites from the other EMGChallenge object
                const otherEMG = window.EMGChallenge || this;
                if (!otherEMG.lesionSites) {
                    // Return all lesions if no filtering is set up
                    return { UE: {}, LE: {} };
                }
                
                // Filter lesions based on active question types
                ['UE', 'LE'].forEach(region => {
                    Object.entries(otherEMG.lesionSites[region] || {}).forEach(([lesionName, lesionData]) => {
                        if (this.activeQuestionTypes[lesionData.type]) {
                            filtered[region][lesionName] = lesionData;
                        }
                    });
                });
                
                return filtered;
            }
        };


        // Initialize videos when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeVideos();
            MuscleAnatomy.initializeDisplay();
            initializeProgressDashboard();
            // Don't populate case grid initially - only when user clicks "Choose Specific Cases"
        });

        // Advanced Muscle Anatomy System
        const MuscleAnatomy = {
            currentRegion: 'lower',
            currentAnatomyType: 'nerve',
            inlineQuizActive: false,
            quizMode: 'type', // 'type' or 'multiple'
            // Independent quiz type toggles (separate from display mode)
            activeQuizTypes: {
                nerve: true,
                roots: true,
                cord: true,
                trunk: true,
                actions: true
            },

            // Anatomical pathway database - complete axon path understanding
            anatomicalPathways: {
                // Each muscle's complete pathway from spinal cord to end organ
                'Biceps brachii': {
                    roots: ['C5', 'C6'],
                    trunk: 'Upper trunk',
                    cord: 'Lateral cord',
                    nerve: 'Musculocutaneous',
                    pathway: [
                        { level: 'root', location: 'C5 nerve root', description: 'C5 nerve root exit foramina' },
                        { level: 'root', location: 'C6 nerve root', description: 'C6 nerve root exit foramina' },
                        { level: 'trunk', location: 'Upper trunk', description: 'C5-C6 trunk formation' },
                        { level: 'cord', location: 'Lateral cord', description: 'Lateral cord of brachial plexus' },
                        { level: 'peripheral', location: 'Musculocutaneous nerve', description: 'Musculocutaneous nerve in axilla' }
                    ],
                    // Muscles that would be normal if lesion is at different levels
                    normalIfLesionAt: {
                        'C5 root': ['Brachioradialis', 'Extensor carpi radialis'], // C6 muscles would be normal
                        'C6 root': ['Deltoid', 'Supraspinatus'], // C5 muscles would be normal  
                        'Upper trunk': ['Triceps brachii', 'First dorsal interosseous'], // Other trunk/cord muscles normal
                        'Lateral cord': ['Deltoid', 'Triceps brachii'], // Posterior cord muscles normal
                        'Musculocutaneous nerve': ['Triceps brachii', 'Flexor carpi radialis'] // Other nerves normal
                    }
                },

                'Brachioradialis': {
                    roots: ['C5', 'C6'],
                    trunk: 'Upper trunk', 
                    cord: 'Posterior cord',
                    nerve: 'Radial',
                    pathway: [
                        { level: 'root', location: 'C5 nerve root', description: 'C5 nerve root exit foramina' },
                        { level: 'root', location: 'C6 nerve root', description: 'C6 nerve root exit foramina' },
                        { level: 'trunk', location: 'Upper trunk', description: 'C5-C6 trunk formation' },
                        { level: 'cord', location: 'Posterior cord', description: 'Posterior cord of brachial plexus' },
                        { level: 'peripheral', location: 'Radial nerve', description: 'Radial nerve in spiral groove' }
                    ],
                    normalIfLesionAt: {
                        'C5 root': ['Triceps brachii', 'Extensor digitorum'], // C7-C8 muscles normal
                        'C6 root': ['Deltoid', 'Biceps brachii'], // C5 muscles normal
                        'Upper trunk': ['Triceps brachii', 'First dorsal interosseous'], // Other levels normal
                        'Posterior cord': ['Biceps brachii', 'First dorsal interosseous'], // Other cords normal
                        'Radial nerve': ['Biceps brachii', 'First dorsal interosseous'] // Other nerves normal
                    }
                },

                'First dorsal interosseous': {
                    roots: ['C8', 'T1'],
                    trunk: 'Lower trunk',
                    cord: 'Medial cord', 
                    nerve: 'Ulnar',
                    pathway: [
                        { level: 'root', location: 'C8 nerve root', description: 'C8 nerve root exit foramina' },
                        { level: 'root', location: 'T1 nerve root', description: 'T1 nerve root exit foramina' },
                        { level: 'trunk', location: 'Lower trunk', description: 'C8-T1 trunk formation' },
                        { level: 'cord', location: 'Medial cord', description: 'Medial cord of brachial plexus' },
                        { level: 'peripheral', location: 'Ulnar nerve at elbow', description: 'Ulnar nerve at cubital tunnel' },
                        { level: 'peripheral', location: 'Ulnar nerve at wrist', description: 'Ulnar nerve at Guyon canal' }
                    ],
                    normalIfLesionAt: {
                        'C8 root': ['Abductor pollicis brevis', 'Flexor carpi ulnaris'], // T1 muscles affected differently
                        'T1 root': ['Flexor carpi ulnaris'], // C8 muscles affected differently
                        'Lower trunk': ['Biceps brachii', 'Triceps brachii'], // Other levels normal
                        'Medial cord': ['Triceps brachii', 'Deltoid'], // Other cords normal
                        'Ulnar nerve at elbow': ['Abductor pollicis brevis', 'Pronator teres'], // Median nerve normal
                        'Ulnar nerve at wrist': ['Flexor carpi ulnaris'] // Proximal ulnar muscles normal
                    }
                },

                'Triceps brachii': {
                    roots: ['C6', 'C7', 'C8'],
                    trunk: 'Upper/Middle trunk',
                    cord: 'Posterior cord',
                    nerve: 'Radial',
                    pathway: [
                        { level: 'root', location: 'C6 nerve root', description: 'C6 nerve root exit foramina' },
                        { level: 'root', location: 'C7 nerve root', description: 'C7 nerve root exit foramina' },
                        { level: 'root', location: 'C8 nerve root', description: 'C8 nerve root exit foramina' },
                        { level: 'trunk', location: 'Upper trunk', description: 'C5-C6 contribution' },
                        { level: 'trunk', location: 'Middle trunk', description: 'C7 contribution' },
                        { level: 'cord', location: 'Posterior cord', description: 'Posterior cord of brachial plexus' },
                        { level: 'peripheral', location: 'Radial nerve in spiral groove', description: 'Radial nerve in humeral spiral groove' }
                    ],
                    normalIfLesionAt: {
                        'C6 root': ['First dorsal interosseous'], // C8-T1 muscles normal
                        'C7 root': ['Biceps brachii', 'First dorsal interosseous'], // C5-C6, C8-T1 normal
                        'C8 root': ['Biceps brachii', 'Brachioradialis'], // C5-C7 normal
                        'Posterior cord': ['Biceps brachii', 'First dorsal interosseous'], // Other cords normal
                        'Radial nerve': ['Biceps brachii', 'First dorsal interosseous'] // Other nerves normal
                    }
                }
                // Add more muscles as needed...
            },
            testData: {
                questionsAnswered: 0,
                correctAnswers: 0,
                missedQuestions: [],
                usedMuscles: new Set(),
                isActive: false
            },

            // Complete Muscle Database - Preston & Shapiro
            muscleDatabase: {
                // Upper Extremity Muscles
                'Trapezius (upper)': { nerve: 'Spinal accessory', roots: ['C3', 'C4'], region: 'UE', peripheralNerve: 'Spinal accessory', cord: 'N/A (cranial nerve)', actions: 'Shoulder elevation, scapular retraction' },
                'Rhomboids': { nerve: 'Dorsal scapular', roots: ['C5'], region: 'UE', peripheralNerve: 'Dorsal scapular', cord: 'N/A (pre-plexus)', trunk: 'Upper trunk', actions: 'Scapular retraction and downward rotation' },
                'Serratus anterior': { nerve: 'Long thoracic', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Long thoracic', cord: 'N/A (pre-plexus)', trunk: 'Upper/Middle trunk', actions: 'Scapular protraction and upward rotation' },
                'Supraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'N/A (pre-plexus)', trunk: 'Upper trunk', actions: 'Shoulder abduction initiation' },
                'Infraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'N/A (pre-plexus)', trunk: 'Upper trunk', actions: 'Shoulder external rotation' },
                'Teres minor': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder external rotation' },
                'Deltoid': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder abduction, flexion, extension' },
                'Biceps brachii': { nerve: 'Musculocutaneous', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral cord', trunk: 'Upper trunk', actions: 'Elbow flexion, forearm supination' },
                'Brachialis': { nerve: 'Musculocutaneous/Radial', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral/Posterior cord', trunk: 'Upper/Middle trunk', actions: 'Elbow flexion' },
                'Brachioradialis': { nerve: 'Radial', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow flexion, forearm rotation' },
                'Subscapularis': { nerve: 'Subscapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Subscapular', cord: 'Posterior cord', actions: 'Shoulder internal rotation' },
                'Extensor carpi radialis': { nerve: 'Radial', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Wrist extension and radial deviation' },
                'Pronator teres': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', trunk: 'Upper/Middle trunk', actions: 'Forearm pronation, elbow flexion' },
                'Flexor carpi radialis': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', trunk: 'Upper/Middle trunk', actions: 'Wrist flexion and radial deviation' },
                'Pectoralis major': { nerve: 'Pectoral', roots: ['C5', 'C6', 'C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Pectoral', cord: 'Lateral/Medial cord', actions: 'Shoulder adduction, internal rotation' },
                'Latissimus dorsi': { nerve: 'Thoracodorsal', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Thoracodorsal', cord: 'Posterior cord', actions: 'Shoulder adduction, extension, internal rotation' },
                'Triceps brachii': { nerve: 'Radial', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow extension' },
                'Extensor digitorum': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Finger extension at MCP joints' },
                'Extensor pollicis longus': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Thumb extension and retropulsion' },
                'Flexor digitorum superficialis': { nerve: 'Median', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at PIP joints' },
                'Flexor digitorum profundus (digits 2&3)': { nerve: 'Anterior interosseous', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at DIP joints (index, middle)' },
                'Flexor digitorum profundus (digits 4&5)': { nerve: 'Ulnar', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', trunk: 'Middle/Lower trunk', actions: 'Finger flexion at DIP joints (ring, little)' },
                'Flexor carpi ulnaris': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', trunk: 'Lower trunk', actions: 'Wrist flexion and ulnar deviation' },
                'Flexor pollicis longus': { nerve: 'Anterior interosseous', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb flexion at IP joint' },
                'Abductor pollicis brevis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb abduction' },
                'Opponens pollicis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb opposition' },
                'Adductor pollicis': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', trunk: 'Lower trunk', actions: 'Thumb adduction' },
                'First dorsal interosseous': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', trunk: 'Lower trunk', actions: 'Index finger abduction' },
                'Abductor digiti minimi': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', trunk: 'Lower trunk', actions: 'Little finger abduction' },
                
                // Lower Extremity Muscles - Complete Database
                // Gluteal Region
                'Gluteus maximus': { nerve: 'Inferior gluteal', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Inferior gluteal', actions: 'Hip extension, lateral rotation, upper fibers assist in abduction' },
                'Gluteus medius': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation (anterior fibers), lateral rotation (posterior fibers)' },
                'Gluteus minimus': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation, stabilizes pelvis' },
                'Tensor fasciae latae': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip flexion, abduction, medial rotation, stabilizes IT band' },
                'Piriformis': { nerve: 'Nerve to piriformis', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Piriformis', actions: 'Hip lateral rotation, abduction when hip is flexed' },
                'Superior gemellus': { nerve: 'Nerve to obturator internus', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Obturator internus', actions: 'Hip lateral rotation' },
                'Obturator internus': { nerve: 'Nerve to obturator internus', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Obturator internus', actions: 'Hip lateral rotation' },
                'Inferior gemellus': { nerve: 'Nerve to quadratus femoris', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Quadratus femoris', actions: 'Hip lateral rotation' },
                'Quadratus femoris': { nerve: 'Nerve to quadratus femoris', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Quadratus femoris', actions: 'Hip lateral rotation, adduction' },
                'Obturator externus': { nerve: 'Obturator', roots: ['L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip lateral rotation' },
                
                // Thigh
                'Rectus femoris': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension, hip flexion' },
                'Vastus lateralis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
                'Vastus medialis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
                'Vastus intermedius': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
                'Sartorius': { nerve: 'Femoral', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion, abduction, external rotation; knee flexion' },
                'Iliopsoas (psoas major)': { nerve: 'Lumbar plexus', roots: ['L1', 'L2', 'L3'], region: 'LE', peripheralNerve: 'Lumbar plexus', actions: 'Hip flexion, stabilizes lumbar spine' },
                'Iliopsoas (iliacus)': { nerve: 'Femoral', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion' },
                'Pectineus': { nerve: 'Femoral/Obturator', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion, adduction' },
                'Adductor longus': { nerve: 'Obturator', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, flexion' },
                'Adductor brevis': { nerve: 'Obturator', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, flexion' },
                'Adductor magnus': { nerve: 'Obturator/Sciatic', roots: ['L2', 'L3', 'L4', 'L5'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, extension (posterior fibers)' },
                'Gracilis': { nerve: 'Obturator', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, knee flexion' },
                'Biceps femoris (long head)': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
                'Biceps femoris (short head)': { nerve: 'Sciatic (peroneal division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion' },
                'Semitendinosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
                'Semimembranosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
                
                // Leg
                'Tibialis anterior': { nerve: 'Deep peroneal', roots: ['L4', 'L5'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle dorsiflexion, foot inversion' },
                'Extensor digitorum longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Toe extension, ankle dorsiflexion' },
                'Extensor hallucis longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Great toe extension, ankle dorsiflexion' },
                'Fibularis tertius': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle dorsiflexion, foot eversion' },
                'Fibularis longus': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle plantarflexion, foot eversion' },
                'Fibularis brevis': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Foot eversion' },
                'Gastrocnemius': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, knee flexion' },
                'Soleus': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion' },
                'Plantaris': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, knee flexion' },
                'Popliteus': { nerve: 'Tibial', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Knee flexion, unlocks knee' },
                'Tibialis posterior': { nerve: 'Tibial', roots: ['L4', 'L5'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, foot inversion' },
                'Flexor digitorum longus': { nerve: 'Tibial', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Toe flexion, ankle plantarflexion' },
                'Flexor hallucis longus': { nerve: 'Tibial', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe flexion, ankle plantarflexion' },
                
                // Foot
                'Extensor digitorum brevis': { nerve: 'Deep peroneal', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Toe extension at MTP joints' },
                'Extensor hallucis brevis': { nerve: 'Deep peroneal', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Great toe extension at MTP joint' },
                'Abductor hallucis': { nerve: 'Medial plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe abduction, arch support' },
                'Flexor digitorum brevis': { nerve: 'Medial plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Toe flexion at PIP joints' },
                'Abductor digiti minimi (foot)': { nerve: 'Lateral plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Little toe abduction' },
                'Quadratus plantae': { nerve: 'Lateral plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Assists flexor digitorum longus' },
                'Lumbricals (1st)': { nerve: 'Medial plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'MTP flexion, IP extension' },
                'Lumbricals (2nd-4th)': { nerve: 'Lateral plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'MTP flexion, IP extension' },
                'Flexor hallucis brevis': { nerve: 'Medial plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe flexion at MTP joint' },
                'Adductor hallucis': { nerve: 'Lateral plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe adduction' },
                'Flexor digiti minimi brevis': { nerve: 'Lateral plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Little toe flexion at MTP joint' },
                'Plantar interossei': { nerve: 'Lateral plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Toe adduction toward 2nd toe' },
                'Dorsal interossei': { nerve: 'Lateral plantar', roots: ['S2', 'S3'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Toe abduction from 2nd toe' }
            },

            initializeDisplay() {
                this.displayMuscles('lower');
            },

            switchAnatomy(region) {
                this.currentRegion = region;
                this.displayMuscles(region);
                
                // Update button states
                document.querySelectorAll('.region-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-region="${region}"]`).classList.add('active');
            },
            
            studyMode: 'explorer',
            activeInfo: {
                nerve: true,
                roots: true,
                actions: true,
                peripheral: true
            },
            
            setStudyMethod(method) {
                this.studyMode = method;
                
                // Update button states
                document.querySelectorAll('.method-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-method="${method}"]`).classList.add('active');
                
                // Refresh display based on study method
                this.displayMuscles(this.currentRegion);
                
                console.log('🎯 Study method changed to:', method);
            },
            
            toggleInfo(infoType) {
                this.activeInfo[infoType] = !this.activeInfo[infoType];
                
                // Update button states
                const button = document.querySelector(`[data-info="${infoType}"]`);
                if (this.activeInfo[infoType]) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
                
                // Refresh display
                this.displayMuscles(this.currentRegion);
                
                console.log('📊 Info toggle:', infoType, '→', this.activeInfo[infoType]);
            },

            displayMuscles(region) {
                const display = document.getElementById('muscle-anatomy-display');
                if (!display) return;

                const muscles = Object.entries(this.muscleDatabase).filter(([name, data]) => 
                    data.region === (region === 'upper' ? 'UE' : 'LE')
                );

                const regionName = region === 'upper' ? 'Upper Extremity' : 'Lower Extremity';
                const regionEmoji = region === 'upper' ? '💪' : '🦵';

                let html = `
                    <div class="muscle-region">
                        <h3>${regionEmoji} ${regionName} Muscles</h3>
                        <div class="muscle-grid">
                `;

                muscles.forEach(([muscleName, muscleData]) => {
                    html += `
                        <div class="muscle-card-interactive" data-muscle="${muscleName}">
                            <div class="muscle-header">
                                <h4 class="muscle-name">${muscleName}</h4>
                            </div>
                            
                            <!-- Interactive reveal buttons -->
                            <div class="muscle-controls">
                                <button class="muscle-btn nerve" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'nerve')" title="Show Nerve Supply">
                                    Nerve
                                </button>
                                <button class="muscle-btn roots" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'roots')" title="Show Nerve Roots">
                                    Roots
                                </button>
                                <button class="muscle-btn cord" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'cord')" title="Show Cord">
                                    Cord
                                </button>
                                <button class="muscle-btn trunk" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'trunk')" title="Show Trunk">
                                    Trunk
                                </button>
                                <button class="muscle-btn actions" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'actions')" title="Show Actions">
                                    Actions
                                </button>
                                <button class="muscle-btn show-all" onclick="MuscleAnatomy.toggleDetail('${muscleName}', 'all')" title="Show All Details">
                                    Show All
                                </button>
                            </div>
                            
                            <!-- Hidden detail sections -->
                            <div class="muscle-detail nerve-detail" data-type="nerve" style="display: none;">
                                <div class="detail-header">
                                    <span class="detail-label">Nerve Supply</span>
                                </div>
                                <div class="detail-content">${muscleData.peripheralNerve}</div>
                            </div>
                            
                            <div class="muscle-detail roots-detail" data-type="roots" style="display: none;">
                                <div class="detail-header">
                                    <span class="detail-label">Nerve Roots</span>
                                </div>
                                <div class="detail-content">${muscleData.roots.join(', ')}</div>
                            </div>
                            
                            <div class="muscle-detail cord-detail" data-type="cord" style="display: none;">
                                <div class="detail-header">
                                    <span class="detail-label">Brachial Plexus Cord</span>
                                </div>
                                <div class="detail-content">${muscleData.cord || 'Not applicable'}</div>
                            </div>
                            
                            <div class="muscle-detail trunk-detail" data-type="trunk" style="display: none;">
                                <div class="detail-header">
                                    <span class="detail-label">Brachial Plexus Trunk</span>
                                </div>
                                <div class="detail-content">${muscleData.trunk || 'Not applicable'}</div>
                            </div>
                            
                            <div class="muscle-detail actions-detail" data-type="actions" style="display: none;">
                                <div class="detail-header">
                                    <span class="detail-label">Primary Actions</span>
                                </div>
                                <div class="detail-content">${muscleData.actions}</div>
                            </div>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;

                display.innerHTML = html;
            },

            // Interactive flashcard flip function with smooth 3D animation
            flipCard(muscleName) {
                // Handle special characters in muscle names
                const card = Array.from(document.querySelectorAll('[data-muscle]')).find(el => el.dataset.muscle === muscleName);
                if (!card) return;
                
                // Toggle the flipped state
                card.classList.toggle('flipped');
                
                // Add expanding effect for better visibility
                if (card.classList.contains('flipped')) {
                    card.classList.add('expanded');
                } else {
                    // Remove expanded class after flip animation completes
                    setTimeout(() => {
                        card.classList.remove('expanded');
                    }, 400);
                }
                
                // Add tactile feedback
                card.style.transform = card.classList.contains('flipped') 
                    ? 'scale(1.05) translateY(-5px)' 
                    : 'scale(0.98)';
                    
                setTimeout(() => {
                    card.style.transform = card.classList.contains('flipped') 
                        ? 'scale(1.05) translateY(-5px)' 
                        : '';
                }, 200);
            },

            toggleDetail(muscleName, type) {
                // Escape special characters in muscle names for CSS selector
                const escapedName = muscleName.replace(/[\\()&]/g, '\\$&');
                const card = document.querySelector(`[data-muscle="${escapedName}"]`) || 
                           document.querySelector(`div[data-muscle]`).parentNode.querySelector(`[data-muscle="${muscleName}"]`) ||
                           Array.from(document.querySelectorAll('[data-muscle]')).find(el => el.dataset.muscle === muscleName);
                if (!card) return;

                if (type === 'all') {
                    const details = card.querySelectorAll('.muscle-detail');
                    const buttons = card.querySelectorAll('.muscle-btn:not(.show-all)');
                    const showAllBtn = card.querySelector('.muscle-btn.show-all');
                    const isAllShown = Array.from(details).every(detail => detail.style.display === 'block');
                    
                    details.forEach(detail => {
                        detail.style.display = isAllShown ? 'none' : 'block';
                        if (!isAllShown) {
                            // Add smooth animation
                            detail.style.opacity = '0';
                            detail.style.transform = 'translateY(-10px)';
                            setTimeout(() => {
                                detail.style.opacity = '1';
                                detail.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    });
                    
                    buttons.forEach(btn => {
                        if (isAllShown) {
                            btn.classList.remove('active');
                        } else {
                            btn.classList.add('active');
                        }
                    });
                    
                    if (showAllBtn) {
                        showAllBtn.textContent = isAllShown ? 'Show All' : 'Hide All';
                        showAllBtn.classList.toggle('active');
                    }
                } else {
                    const detail = card.querySelector(`.muscle-detail[data-type="${type}"]`);
                    const button = card.querySelector(`.muscle-btn.${type}`);
                    
                    if (detail && button) {
                        const isVisible = detail.style.display === 'block';
                        detail.style.display = isVisible ? 'none' : 'block';
                        button.classList.toggle('active');
                        
                        // Add smooth animation for showing
                        if (!isVisible) {
                            detail.style.opacity = '0';
                            detail.style.transform = 'translateY(-10px)';
                            setTimeout(() => {
                                detail.style.opacity = '1';
                                detail.style.transform = 'translateY(0)';
                            }, 50);
                        }
                    }
                }
                
                // Add expand effect if any details are shown
                const visibleDetails = card.querySelectorAll('.muscle-detail[style*="display: block"]');
                if (visibleDetails.length > 0) {
                    card.classList.add('expanded');
                } else {
                    card.classList.remove('expanded');
                }
            },
            
            setAnatomyType(type) {
                this.currentAnatomyType = type;
                
                // Update button states
                document.querySelectorAll('.anatomy-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-anatomy="${type}"]`).classList.add('active');
                
                // Update muscle display to show only this anatomy type
                this.displayMuscles(this.currentRegion);
            },

            // New function for independent quiz type toggling
            toggleQuizType(type) {
                console.log('🎯 Quiz toggle called for:', type);
                // Toggle the state
                this.activeQuizTypes[type] = !this.activeQuizTypes[type];
                
                // Update UI
                const option = document.querySelector(`[data-quiz-type="${type}"]`);
                const indicator = option.querySelector('.status-indicator');
                const text = option.querySelector('.status-text');
                
                if (this.activeQuizTypes[type]) {
                    option.classList.add('active');
                    indicator.classList.add('active');
                    text.textContent = 'Active';
                } else {
                    option.classList.remove('active');
                    indicator.classList.remove('active');
                    text.textContent = 'Inactive';
                }
                
                // Check if at least one type is active
                const hasActiveType = Object.values(this.activeQuizTypes).some(active => active);
                const startQuizBtn = document.querySelector('#start-quiz-btn');
                
                if (!hasActiveType && startQuizBtn) {
                    startQuizBtn.disabled = true;
                    startQuizBtn.textContent = 'Select at least one quiz type';
                } else if (startQuizBtn) {
                    startQuizBtn.disabled = false;
                    startQuizBtn.textContent = 'Start Quiz';
                }
                
                console.log('🎯 Quiz type toggled:', type, '→', this.activeQuizTypes[type]);
            },
            
            setQuizMode(mode) {
                this.quizMode = mode;
                
                // Update button states
                document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
                
                console.log('🎯 Quiz mode changed to:', mode);
            },
            
            startInlineQuiz() {
                this.inlineQuizActive = true;
                
                // Show quiz area
                document.getElementById('inline-quiz-area').style.display = 'block';
                
                // Update buttons
                document.querySelector('.quiz-start-btn').style.display = 'none';
                document.querySelector('.quiz-stop-btn').style.display = 'block';
                
                // Generate first question
                this.generateInlineQuestion();
                
                console.log('🚀 Inline quiz started');
            },
            
            stopInlineQuiz() {
                this.inlineQuizActive = false;
                
                // Hide quiz area
                document.getElementById('inline-quiz-area').style.display = 'none';
                
                // Update buttons
                document.querySelector('.quiz-start-btn').style.display = 'block';
                document.querySelector('.quiz-stop-btn').style.display = 'none';
                
                console.log('⏹️ Inline quiz stopped');
            },
            
            generateInlineQuestion() {
                const muscles = Object.keys(this.muscleDatabase);
                const muscle = muscles[Math.floor(Math.random() * muscles.length)];
                const muscleData = this.muscleDatabase[muscle];
                
                const quizArea = document.getElementById('inline-quiz-area');
                
                if (this.quizMode === 'type') {
                    // Type-in answer mode
                    const questionType = this.getRandomActiveQuizType(muscle);
                    this.currentQuestionType = questionType;
                    this.currentQuestionMuscle = muscle;
                    
                    quizArea.innerHTML = `
                        <div class="quiz-question">
                            <h4>What is the ${this.getAnatomyLabel(questionType)} of ${muscle}?</h4>
                            <div class="quiz-answer-input">
                                <input type="text" id="quiz-answer" placeholder="Enter your answer..." />
                                <button onclick="MuscleAnatomy.checkInlineAnswer('${muscle}')" class="check-answer-btn">Check Answer</button>
                            </div>
                            <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
                        </div>
                    `;
                    
                    // Focus the input
                    setTimeout(() => {
                        document.getElementById('quiz-answer').focus();
                    }, 100);
                    
                } else {
                    // Multiple choice mode
                    const questionType = this.getRandomActiveQuizType(muscle);
                    const correctAnswer = this.getCorrectAnswer(muscle, questionType);
                    const options = this.generateQuizOptions(muscle, correctAnswer, questionType);
                    
                    // Store question type for answer checking
                    this.currentQuestionType = questionType;
                    this.currentQuestionMuscle = muscle;
                    
                    quizArea.innerHTML = `
                        <div class="quiz-question">
                            <h4>What is the ${this.getAnatomyLabel(questionType)} of ${muscle}?</h4>
                            <div class="quiz-options">
                                ${options.map((option, index) => `
                                    <div class="quiz-option" onclick="MuscleAnatomy.selectQuizOption('${option}', '${muscle}')">
                                        <input type="radio" name="quiz-choice" id="option-${index}" value="${option}">
                                        <label for="option-${index}">${option}</label>
                                    </div>
                                `).join('')}
                            </div>
                            <button onclick="MuscleAnatomy.checkInlineAnswer('${muscle}')" class="check-answer-btn" disabled id="check-multiple-btn">Check Answer</button>
                            <div id="quiz-feedback" class="quiz-feedback" style="display: none;"></div>
                        </div>
                    `;
                }
            },
            
            getCorrectAnswer(muscle, questionType = null) {
                const muscleData = this.muscleDatabase[muscle];
                const type = questionType || this.getRandomActiveQuizType();
                
                switch(type) {
                    case 'nerve': 
                        return muscleData.peripheralNerve;
                    case 'roots': 
                        return muscleData.roots.join(', ');
                    case 'cord': 
                        return muscleData.cord || 'Not applicable';
                    case 'trunk': 
                        return muscleData.trunk || 'Not applicable';
                    case 'actions': 
                        return muscleData.actions;
                    default: 
                        return muscleData.peripheralNerve;
                }
            },

            // Get a random active quiz type for question generation
            getRandomActiveQuizType(muscle = null) {
                let activeTypes = Object.keys(this.activeQuizTypes).filter(type => this.activeQuizTypes[type]);
                
                // If a muscle is specified, filter out inappropriate types
                if (muscle && this.muscleDatabase[muscle]) {
                    const muscleData = this.muscleDatabase[muscle];
                    activeTypes = activeTypes.filter(type => {
                        switch(type) {
                            case 'nerve': 
                                return muscleData.peripheralNerve && muscleData.peripheralNerve !== 'Not applicable';
                            case 'roots': 
                                return muscleData.roots && muscleData.roots.length > 0;
                            case 'cord': 
                                // Only allow cord questions for UE muscles (brachial plexus)
                                return muscleData.region === 'UE' && muscleData.cord && muscleData.cord !== 'Not applicable';
                            case 'trunk': 
                                // Only allow trunk questions for UE muscles (brachial plexus)
                                return muscleData.region === 'UE' && muscleData.trunk && muscleData.trunk !== 'Not applicable';
                            case 'actions': 
                                return muscleData.actions && muscleData.actions !== 'Not applicable';
                            default: 
                                return true;
                        }
                    });
                }
                
                if (activeTypes.length === 0) return 'nerve'; // fallback
                return activeTypes[Math.floor(Math.random() * activeTypes.length)];
            },

            // Advanced pathway-based answer generation
            generateIntelligentAnswerOptions(abnormalMuscles, normalMuscles) {
                console.log('🧠 Generating intelligent answers based on muscle patterns');
                console.log('Abnormal:', abnormalMuscles);
                console.log('Normal:', normalMuscles);

                const possibleLesions = new Set();

                // For each abnormal muscle, find all possible lesion sites along its pathway
                abnormalMuscles.forEach(muscle => {
                    const pathway = this.anatomicalPathways[muscle];
                    if (pathway) {
                        pathway.pathway.forEach(pathPoint => {
                            possibleLesions.add(pathPoint.location);
                        });
                    }
                });

                // Now eliminate lesion sites that would also affect normal muscles
                const validLesions = [];
                possibleLesions.forEach(lesionSite => {
                    let isValid = true;
                    
                    // Check if this lesion would spare the normal muscles
                    normalMuscles.forEach(normalMuscle => {
                        const normalPathway = this.anatomicalPathways[normalMuscle];
                        if (normalPathway) {
                            // If the normal muscle's pathway includes this lesion site, then this lesion site is invalid
                            const wouldAffectNormal = normalPathway.pathway.some(pathPoint => 
                                pathPoint.location === lesionSite
                            );
                            if (wouldAffectNormal) {
                                isValid = false;
                            }
                        }
                    });

                    if (isValid) {
                        validLesions.push(lesionSite);
                    }
                });

                // Also add some plausible distractors from the same anatomical region
                const distractors = [];
                abnormalMuscles.forEach(muscle => {
                    const pathway = this.anatomicalPathways[muscle];
                    if (pathway && pathway.normalIfLesionAt) {
                        Object.keys(pathway.normalIfLesionAt).forEach(distractor => {
                            if (!validLesions.includes(distractor) && !distractors.includes(distractor)) {
                                distractors.push(distractor);
                            }
                        });
                    }
                });

                // Combine valid lesions with some distractors
                const finalOptions = [
                    ...validLesions,
                    ...distractors.slice(0, Math.max(0, 8 - validLesions.length))
                ].slice(0, 8);

                console.log('🎯 Valid lesions based on muscle pattern:', validLesions);
                console.log('🎯 Final answer options:', finalOptions);

                return finalOptions.length > 0 ? finalOptions : ['Unable to localize with given pattern'];
            },

            // Enhanced EMG case generation with pathway understanding
            generatePathwayBasedCase() {
                // Select a random lesion site from our pathway database
                const allMuscles = Object.keys(this.anatomicalPathways);
                const randomMuscle = allMuscles[Math.floor(Math.random() * allMuscles.length)];
                const pathway = this.anatomicalPathways[randomMuscle];
                
                // Choose a random lesion site along this muscle's pathway
                const randomPathPoint = pathway.pathway[Math.floor(Math.random() * pathway.pathway.length)];
                const lesionSite = randomPathPoint.location;
                
                // Find all muscles that would be affected by this lesion
                const affectedMuscles = [];
                const normalMuscles = [];
                
                allMuscles.forEach(muscle => {
                    const musclePathway = this.anatomicalPathways[muscle];
                    if (musclePathway) {
                        const isAffected = musclePathway.pathway.some(pathPoint => 
                            pathPoint.location === lesionSite
                        );
                        
                        if (isAffected) {
                            affectedMuscles.push(muscle);
                        } else {
                            normalMuscles.push(muscle);
                        }
                    }
                });

                // Generate intelligent answer options
                const answerOptions = this.generateIntelligentAnswerOptions(
                    affectedMuscles.slice(0, 4), // Limit to 4 abnormal muscles for display
                    normalMuscles.slice(0, 4)    // Include 4 normal muscles
                );

                return {
                    lesionSite: lesionSite,
                    abnormalMuscles: affectedMuscles.slice(0, 4),
                    normalMuscles: normalMuscles.slice(0, 4),
                    answerOptions: answerOptions,
                    explanation: `This pattern localizes to ${lesionSite}. The affected muscles (${affectedMuscles.slice(0, 3).join(', ')}) all share this common pathway point, while the normal muscles (${normalMuscles.slice(0, 3).join(', ')}) are spared because their pathways bypass this lesion site.`
                };
            },
            
            generateQuizOptions(muscle, correctAnswer, questionType) {
                // Get the region of the target muscle
                const targetMuscleData = this.muscleDatabase[muscle];
                const targetRegion = targetMuscleData.region;
                
                // Filter muscles to same region only
                const sameFunctionMuscles = Object.keys(this.muscleDatabase).filter(m => 
                    this.muscleDatabase[m].region === targetRegion
                );
                
                const distractors = [];
                
                // Generate 3 distractors from other muscles of the SAME region and question type
                while (distractors.length < 3 && distractors.length < sameFunctionMuscles.length - 1) {
                    const randomMuscle = sameFunctionMuscles[Math.floor(Math.random() * sameFunctionMuscles.length)];
                    if (randomMuscle !== muscle) {
                        const distractorAnswer = this.getCorrectAnswer(randomMuscle, questionType);
                        // Only include valid, non-empty, non-"Not applicable" answers
                        if (distractorAnswer && 
                            distractorAnswer !== 'Not applicable' && 
                            distractorAnswer.trim() !== '' &&
                            !distractors.includes(distractorAnswer) && 
                            distractorAnswer !== correctAnswer) {
                            distractors.push(distractorAnswer);
                        }
                    }
                }
                
                // If we don't have enough distractors, add appropriate region-specific generic ones
                if (distractors.length < 3) {
                    const genericOptions = this.getGenericDistractors(questionType, correctAnswer, targetRegion);
                    genericOptions.forEach(option => {
                        if (distractors.length < 3 && !distractors.includes(option) && option !== correctAnswer) {
                            distractors.push(option);
                        }
                    });
                }
                
                // Combine and shuffle
                const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
                return options;
            },

            // Get appropriate generic distractors based on question type and region
            getGenericDistractors(questionType, correctAnswer, region = 'UE') {
                switch(questionType) {
                    case 'nerve':
                        return region === 'UE' 
                            ? ['Median', 'Ulnar', 'Radial', 'Axillary', 'Musculocutaneous', 'Suprascapular']
                            : ['Femoral', 'Tibial', 'Peroneal', 'Obturator', 'Sciatic', 'Gluteal'];
                    case 'roots':
                        return region === 'UE' 
                            ? ['C5, C6', 'C6, C7', 'C7, C8', 'C8, T1', 'C5, C6, C7'] 
                            : ['L2, L3', 'L3, L4', 'L4, L5', 'L5, S1', 'S1, S2'];
                    case 'cord':
                        // Only UE has brachial plexus cords
                        return region === 'UE' 
                            ? ['Lateral cord', 'Posterior cord', 'Medial cord']
                            : [];
                    case 'trunk':
                        // Only UE has brachial plexus trunks
                        return region === 'UE' 
                            ? ['Upper trunk', 'Middle trunk', 'Lower trunk']
                            : [];
                    case 'actions':
                        return region === 'UE' 
                            ? ['Shoulder abduction', 'Elbow flexion', 'Wrist extension', 'Finger flexion', 'Thumb opposition']
                            : ['Hip flexion', 'Knee extension', 'Ankle dorsiflexion', 'Hip abduction', 'Ankle plantarflexion'];
                    default:
                        return [];
                }
            },
            
            selectQuizOption(answer, muscle) {
                // Update selected state
                document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                event.target.closest('.quiz-option').classList.add('selected');
                
                // Store selected answer
                this.selectedQuizAnswer = answer;
                
                // Enable check button
                document.getElementById('check-multiple-btn').disabled = false;
            },
            
            getAnatomyLabel(questionType = null) {
                const type = questionType || 'nerve'; // Use default instead of random when no type specified
                switch(type) {
                    case 'nerve': return 'peripheral nerve';
                    case 'roots': return 'nerve roots';
                    case 'cord': return 'brachial plexus cord';
                    case 'trunk': return 'brachial plexus trunk';
                    case 'actions': return 'primary actions';
                    default: return 'nerve supply';
                }
            },
            
            checkInlineAnswer(muscle) {
                const questionType = this.currentQuestionType || this.getRandomActiveQuizType();
                const correctAnswer = this.getCorrectAnswer(muscle, questionType);
                const feedbackEl = document.getElementById('quiz-feedback');
                let userAnswer, isCorrect;
                
                if (this.quizMode === 'type') {
                    userAnswer = document.getElementById('quiz-answer').value.trim();
                    isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase().split(' ')[0]);
                } else {
                    userAnswer = this.selectedQuizAnswer || 'No answer selected';
                    isCorrect = userAnswer === correctAnswer;
                }
                
                feedbackEl.innerHTML = `
                    <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                        <h5>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h5>
                        <p><strong>Your answer:</strong> ${userAnswer}</p>
                        <p><strong>Correct answer:</strong> ${correctAnswer}</p>
                        <button onclick="MuscleAnatomy.generateInlineQuestion()" class="next-question-btn">Next Question</button>
                    </div>
                `;
                feedbackEl.style.display = 'block';
                
                // Reset selected answer for multiple choice
                this.selectedQuizAnswer = null;
            },

            showAllDetails() {
                document.querySelectorAll('.muscle-detail').forEach(detail => {
                    detail.classList.add('show');
                });
            },

            hideAllDetails() {
                document.querySelectorAll('.muscle-detail').forEach(detail => {
                    detail.classList.remove('show');
                });
            },

            toggleNerves() {
                document.querySelectorAll('.muscle-detail.nerve').forEach(detail => {
                    detail.classList.toggle('show');
                });
            },

            toggleRoots() {
                document.querySelectorAll('.muscle-detail.roots').forEach(detail => {
                    detail.classList.toggle('show');
                });
            },

            toggleActions() {
                document.querySelectorAll('.muscle-detail.actions').forEach(detail => {
                    detail.classList.toggle('show');
                });
            },

            startMuscleTest() {
                // Scroll to top of page first for better visibility
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                this.testData.questionsAnswered = 0;
                this.testData.correctAnswers = 0;
                this.testData.missedQuestions = [];
                this.testData.usedMuscles = new Set();
                this.testData.isActive = true;

                const modal = document.getElementById('muscle-test-modal');
                if (modal) {
                    modal.style.display = 'flex';
                    document.getElementById('test-results').style.display = 'none';
                    document.getElementById('muscle-test-body').style.display = 'block';
                    document.getElementById('answer-feedback').style.display = 'none';
                    
                    this.updateTestStats();
                    this.generateNextQuestion();
                }
            },

            stopMuscleTest() {
                this.testData.isActive = false;
                const modal = document.getElementById('muscle-test-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            },

            generateNextQuestion() {
                if (!this.testData.isActive) return;

                const muscles = Object.keys(this.muscleDatabase);
                let muscle;
                
                // Find an unused muscle
                const availableMuscles = muscles.filter(m => !this.testData.usedMuscles.has(m));
                if (availableMuscles.length === 0) {
                    this.testData.usedMuscles.clear();
                    muscle = muscles[Math.floor(Math.random() * muscles.length)];
                } else {
                    muscle = availableMuscles[Math.floor(Math.random() * availableMuscles.length)];
                }

                this.testData.usedMuscles.add(muscle);
                const muscleData = this.muscleDatabase[muscle];

                // Randomly choose question type
                const questionTypes = ['nerve', 'roots', 'peripheralNerve'];
                const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

                let question, correctAnswer, options;

                switch (questionType) {
                    case 'nerve':
                        question = `What nerve innervates the ${muscle}?`;
                        correctAnswer = muscleData.nerve;
                        options = this.generateNerveOptions(muscleData.nerve);
                        break;
                    case 'roots':
                        question = `What nerve roots innervate the ${muscle}?`;
                        correctAnswer = muscleData.roots.join(', ');
                        options = this.generateRootOptions(muscleData.roots);
                        break;
                    case 'peripheralNerve':
                        question = `What peripheral nerve innervates the ${muscle}?`;
                        correctAnswer = muscleData.peripheralNerve;
                        options = this.generatePeripheralNerveOptions(muscleData.peripheralNerve);
                        break;
                }

                this.currentQuestion = {
                    muscle,
                    question,
                    correctAnswer,
                    options,
                    type: questionType
                };

                this.displayQuestion();
            },

            generateNerveOptions(correctNerve) {
                const allNerves = [...new Set(Object.values(this.muscleDatabase).map(m => m.nerve))];
                const options = [correctNerve];
                
                while (options.length < 4) {
                    const randomNerve = allNerves[Math.floor(Math.random() * allNerves.length)];
                    if (!options.includes(randomNerve)) {
                        options.push(randomNerve);
                    }
                }
                
                return this.shuffleArray(options);
            },

            generateRootOptions(correctRoots) {
                const allRoots = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'T1', 'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3'];
                const correctAnswer = correctRoots.join(', ');
                const options = [correctAnswer];
                
                while (options.length < 4) {
                    const numRoots = Math.min(correctRoots.length + Math.floor(Math.random() * 2), 3);
                    const fakeRoots = [];
                    const startIndex = allRoots.indexOf(correctRoots[0]) + Math.floor(Math.random() * 4) - 2;
                    
                    for (let i = 0; i < numRoots; i++) {
                        const index = Math.max(0, Math.min(allRoots.length - 1, startIndex + i));
                        if (allRoots[index] && !fakeRoots.includes(allRoots[index])) {
                            fakeRoots.push(allRoots[index]);
                        }
                    }
                    
                    const fakeAnswer = fakeRoots.join(', ');
                    if (!options.includes(fakeAnswer) && fakeAnswer !== correctAnswer) {
                        options.push(fakeAnswer);
                    }
                }
                
                return this.shuffleArray(options);
            },

            generatePeripheralNerveOptions(correctNerve) {
                const allNerves = [...new Set(Object.values(this.muscleDatabase).map(m => m.peripheralNerve))];
                const options = [correctNerve];
                
                while (options.length < 4) {
                    const randomNerve = allNerves[Math.floor(Math.random() * allNerves.length)];
                    if (!options.includes(randomNerve)) {
                        options.push(randomNerve);
                    }
                }
                
                return this.shuffleArray(options);
            },

            shuffleArray(array) {
                const shuffled = [...array];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            },

            displayQuestion() {
                const questionText = document.getElementById('question-text');
                const answerChoices = document.getElementById('answer-choices');
                
                if (questionText) questionText.textContent = this.currentQuestion.question;
                
                if (answerChoices) {
                    answerChoices.innerHTML = '';
                    this.currentQuestion.options.forEach((option, index) => {
                        const choice = document.createElement('div');
                        choice.className = 'answer-choice';
                        choice.textContent = option;
                        choice.onclick = () => this.selectAnswer(index);
                        answerChoices.appendChild(choice);
                    });
                }

                // Hide feedback and show question
                document.getElementById('answer-feedback').style.display = 'none';
            },

            selectAnswer(index) {
                const selectedAnswer = this.currentQuestion.options[index];
                const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
                
                this.testData.questionsAnswered++;
                if (isCorrect) {
                    this.testData.correctAnswers++;
                } else {
                    this.testData.missedQuestions.push({
                        question: this.currentQuestion.question,
                        selectedAnswer,
                        correctAnswer: this.currentQuestion.correctAnswer,
                        muscle: this.currentQuestion.muscle
                    });
                }

                this.updateTestStats();
                this.showFeedback(isCorrect, selectedAnswer);
            },

            showFeedback(isCorrect, selectedAnswer) {
                const choices = document.querySelectorAll('.answer-choice');
                choices.forEach((choice, index) => {
                    if (choice.textContent === this.currentQuestion.correctAnswer) {
                        choice.classList.add('correct');
                    } else if (choice.textContent === selectedAnswer && !isCorrect) {
                        choice.classList.add('incorrect');
                    }
                    choice.onclick = null; // Disable further clicks
                });

                const feedback = document.getElementById('answer-feedback');
                const feedbackResult = document.getElementById('feedback-result');
                const feedbackExplanation = document.getElementById('feedback-explanation');

                if (feedbackResult) {
                    feedbackResult.innerHTML = isCorrect ? 
                        '<strong style="color: #28a745;">✅ Correct!</strong>' : 
                        '<strong style="color: #dc3545;">❌ Incorrect</strong>';
                }

                if (feedbackExplanation) {
                    const muscleData = this.muscleDatabase[this.currentQuestion.muscle];
                    feedbackExplanation.innerHTML = `
                        <p><strong>Muscle:</strong> ${this.currentQuestion.muscle}</p>
                        <p><strong>Correct Answer:</strong> ${this.currentQuestion.correctAnswer}</p>
                        <p><strong>Nerve:</strong> ${muscleData.nerve}</p>
                        <p><strong>Roots:</strong> ${muscleData.roots.join(', ')}</p>
                        <p><strong>Actions:</strong> ${muscleData.actions}</p>
                    `;
                }

                if (feedback) feedback.style.display = 'block';
            },

            nextQuestion() {
                this.generateNextQuestion();
            },

            updateTestStats() {
                const questionsElem = document.getElementById('questions-answered');
                const accuracyElem = document.getElementById('current-accuracy');
                
                if (questionsElem) questionsElem.textContent = `Questions: ${this.testData.questionsAnswered}`;
                
                if (accuracyElem) {
                    const accuracy = this.testData.questionsAnswered > 0 ? 
                        Math.round((this.testData.correctAnswers / this.testData.questionsAnswered) * 100) : 0;
                    accuracyElem.textContent = `Accuracy: ${accuracy}%`;
                }
            },

            reviewMissedQuestions() {
                // Implementation for reviewing missed questions
                console.log('Missed questions:', this.testData.missedQuestions);
            }
        };

        // EMG Clinical Localization Challenge System
        const EMGChallenge = {
            currentCase: null,
            selectedAnswer: null,
            activeQuestionTypes: {
                root: true,
                trunk: true,
                cord: true,
                peripheral: true
            },
            
            // Common lesion sites with clinical relevance
            lesionSites: {
                UE: {
                    'C5 nerve root': { type: 'root', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Infraspinatus'] },
                    'C6 nerve root': { type: 'root', muscles: ['Biceps brachii', 'Brachioradialis', 'Extensor carpi radialis'] },
                    'C7 nerve root': { type: 'root', muscles: ['Triceps brachii', 'Extensor digitorum', 'Flexor carpi radialis'] },
                    'C8 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
                    'T1 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Abductor digiti minimi'] },
                    'Upper trunk (C5-C6)': { type: 'trunk', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Brachioradialis'] },
                    'Middle trunk (C7)': { type: 'trunk', muscles: ['Triceps brachii', 'Extensor digitorum', 'Flexor carpi radialis'] },
                    'Lower trunk (C8-T1)': { type: 'trunk', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
                    'Posterior cord': { type: 'cord', muscles: ['Deltoid', 'Triceps brachii', 'Extensor digitorum', 'Brachioradialis'] },
                    'Medial cord': { type: 'cord', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
                    'Lateral cord': { type: 'cord', muscles: ['Biceps brachii', 'Brachialis', 'Pronator teres'] },
                    'Median nerve at wrist (carpal tunnel)': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Opponens pollicis'] },
                    'Median nerve at forearm': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Flexor pollicis longus', 'Pronator teres', 'Flexor carpi radialis'] },
                    'Ulnar nerve at wrist (Guyon canal)': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Abductor digiti minimi', 'Adductor pollicis'] },
                    'Ulnar nerve at elbow': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
                    'Radial nerve in spiral groove': { type: 'peripheral', muscles: ['Triceps brachii', 'Brachioradialis', 'Extensor digitorum'] },
                    'Posterior interosseous nerve': { type: 'peripheral', muscles: ['Extensor digitorum', 'Extensor pollicis longus'] },
                    'Axillary nerve': { type: 'peripheral', muscles: ['Deltoid', 'Teres minor'] },
                    'Suprascapular nerve': { type: 'peripheral', muscles: ['Supraspinatus', 'Infraspinatus'] }
                },
                LE: {
                    'L2 nerve root': { type: 'root', muscles: ['Iliopsoas (psoas major)', 'Adductor longus', 'Sartorius'] },
                    'L3 nerve root': { type: 'root', muscles: ['Rectus femoris', 'Vastus medialis', 'Adductor longus'] },
                    'L4 nerve root': { type: 'root', muscles: ['Tibialis anterior', 'Rectus femoris', 'Vastus medialis'] },
                    'L5 nerve root': { type: 'root', muscles: ['Extensor hallucis longus', 'Tibialis anterior', 'Gluteus medius', 'Biceps femoris (short head)'] },
                    'S1 nerve root': { type: 'root', muscles: ['Gastrocnemius', 'Gluteus maximus', 'Biceps femoris (long head)'] },
                    'Femoral nerve': { type: 'peripheral', muscles: ['Rectus femoris', 'Vastus medialis', 'Vastus lateralis', 'Sartorius'] },
                    'Peroneal nerve at fibular head': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Fibularis longus'] },
                    'Deep peroneal nerve': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Extensor digitorum brevis'] },
                    'Sciatic nerve': { type: 'peripheral', muscles: ['Biceps femoris (long head)', 'Semitendinosus', 'Gastrocnemius'] },
                    'Tibial nerve': { type: 'peripheral', muscles: ['Gastrocnemius', 'Soleus', 'Flexor hallucis longus'] },
                    'Superior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus medius', 'Gluteus minimus', 'Tensor fasciae latae'] },
                    'Inferior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus maximus'] }
                }
            },

            // Clinical scenarios for different lesion types
            scenarios: {
                'C5 nerve root': 'A 45-year-old construction worker develops shoulder weakness after a fall from scaffolding.',
                'C6 nerve root': 'A 28-year-old motorcycle accident victim presents with weakness in elbow flexion and wrist extension.',
                'C7 nerve root': 'A 35-year-old presents with difficulty extending the elbow and fingers after a neck injury.',
                'C8 nerve root': 'A 55-year-old office worker has hand weakness and numbness in the ring and little fingers.',
                'T1 nerve root': 'A newborn presents with a claw hand deformity and Horners syndrome.',
                'Upper trunk (C5-C6)': 'A football player sustains a "stinger" injury with shoulder weakness and numbness.',
                'Lower trunk (C8-T1)': 'A patient presents with weakness of intrinsic hand muscles after a difficult delivery.',
                'Posterior cord': 'A patient has combined radial and axillary nerve deficits after posterior shoulder dislocation.',
                'Medial cord': 'A patient presents with combined ulnar and median nerve symptoms after brachial plexus trauma.',
                'Lateral cord': 'A patient has weakness of elbow flexion and forearm pronation after lateral brachial plexus injury.',
                'Median nerve at wrist (carpal tunnel)': 'A 45-year-old office worker has numbness in thumb, index, and middle fingers, worse at night.',
                'Median nerve at forearm': 'A patient has weakness of thumb flexion and thenar muscle atrophy after a forearm fracture.',
                'Ulnar nerve at wrist (Guyon canal)': 'A cyclist develops hand weakness after long-distance riding, sparing FCU.',
                'Ulnar nerve at elbow': 'A patient has progressive hand weakness and numbness affecting the ring and little fingers.',
                'Radial nerve in spiral groove': 'A patient awakens with wrist drop after sleeping with arm over chair ("Saturday night palsy").',
                'Posterior interosseous nerve': 'A patient has finger extension weakness but normal wrist extension after elbow trauma.',
                'Axillary nerve': 'A patient develops shoulder weakness and numbness after shoulder dislocation.',
                'Suprascapular nerve': 'A volleyball player has shoulder pain and weakness with overhead activities.',
                'L4 nerve root': 'A patient has knee weakness and medial leg numbness after lumbar spine injury.',
                'L5 nerve root': 'A patient cannot dorsiflex the foot or extend the great toe after lumbar disc herniation.',
                'S1 nerve root': 'A patient has difficulty with plantarflexion and experiences posterior leg pain.',
                'Femoral nerve': 'A patient develops quadriceps weakness after hip surgery or trauma.',
                'Peroneal nerve at fibular head': 'A patient develops foot drop after crossing legs for prolonged periods.',
                'Deep peroneal nerve': 'A patient has weakness dorsiflexing toes with preserved ankle dorsiflexion.',
                'Sciatic nerve': 'A patient has weakness in knee flexion and all ankle movements after hip surgery.',
                'Superior gluteal nerve': 'A patient has a Trendelenburg gait and difficulty with hip abduction.',
                'Inferior gluteal nerve': 'A patient cannot rise from a seated position due to hip extension weakness.'
            },

            startChallenge() {
                const setupDiv = document.getElementById('emg-challenge-setup');
                const activeDiv = document.getElementById('emg-challenge-active');
                
                if (setupDiv) setupDiv.style.display = 'none';
                if (activeDiv) activeDiv.style.display = 'block';
                
                this.generateCase();
            },

            generateCase() {
                // Get filtered lesions based on active question types
                const filteredLesions = window.EMGChallenge.getFilteredLesions();
                
                // Randomly choose between UE and LE (only if both have active lesions)
                let availableRegions = [];
                if (Object.keys(filteredLesions.UE).length > 0) availableRegions.push('UE');
                if (Object.keys(filteredLesions.LE).length > 0) availableRegions.push('LE');
                
                if (availableRegions.length === 0) {
                    console.error('No active question types available');
                    return;
                }
                
                const region = availableRegions[Math.floor(Math.random() * availableRegions.length)];
                const lesionSites = Object.keys(filteredLesions[region]);
                const selectedLesion = lesionSites[Math.floor(Math.random() * lesionSites.length)];
                
                const lesionData = this.lesionSites[region][selectedLesion];
                const scenario = this.scenarios[selectedLesion];
                
                // Get affected muscles for this lesion
                const affectedMuscles = lesionData.muscles.filter(muscle => 
                    MuscleAnatomy.muscleDatabase[muscle] && 
                    MuscleAnatomy.muscleDatabase[muscle].region === region
                );
                
                // Get normal muscles (not affected by this lesion) from same region
                const allMusclesInRegion = Object.keys(MuscleAnatomy.muscleDatabase).filter(muscle => 
                    MuscleAnatomy.muscleDatabase[muscle].region === region
                );
                
                const normalMuscles = allMusclesInRegion.filter(muscle => 
                    !affectedMuscles.includes(muscle)
                ).slice(0, 6); // Limit to 6 normal muscles for readability
                
                // Generate answer options (correct + 3 distractors from same region)
                const allLesionSites = Object.keys(this.lesionSites[region]);
                const distractors = allLesionSites.filter(site => site !== selectedLesion)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                
                const answerOptions = [selectedLesion, ...distractors].sort(() => 0.5 - Math.random());
                
                this.currentCase = {
                    lesionSite: selectedLesion,
                    region: region,
                    scenario: scenario,
                    abnormalMuscles: affectedMuscles,  // Use consistent property name
                    normalMuscles: normalMuscles,
                    options: answerOptions,  // Use consistent property name
                    correctAnswer: selectedLesion
                };
                
                this.displayCase();
            },

            displayCase() {
                const case_data = this.currentCase;
                
                // Update scenario
                const scenarioText = document.getElementById('challenge-scenario-text');
                if (scenarioText) {
                    scenarioText.textContent = case_data.scenario;
                }
                
                // Update abnormal muscles
                const abnormalList = document.getElementById('challenge-abnormal-muscles');
                if (abnormalList && case_data.abnormalMuscles) {
                    abnormalList.innerHTML = '';
                    case_data.abnormalMuscles.forEach(muscle => {
                        const li = document.createElement('li');
                        li.textContent = muscle;
                        abnormalList.appendChild(li);
                    });
                }
                
                // Update normal muscles
                const normalList = document.getElementById('challenge-normal-muscles');
                if (normalList) {
                    normalList.innerHTML = '';
                    case_data.normalMuscles.forEach(muscle => {
                        const li = document.createElement('li');
                        li.textContent = muscle;
                        normalList.appendChild(li);
                    });
                }
                
                // Update answer options
                const optionsContainer = document.getElementById('challenge-answer-options');
                if (optionsContainer && case_data.options) {
                    optionsContainer.innerHTML = '';
                    case_data.options.forEach((option, index) => {
                        const button = document.createElement('button');
                        button.className = 'answer-option-challenge';
                        button.textContent = option;
                        button.onclick = () => this.selectAnswer(option);
                        optionsContainer.appendChild(button);
                    });
                }
                
                // Reset UI state
                this.selectedAnswer = null;
                const submitBtn = document.getElementById('challenge-submit-btn');
                const nextBtn = document.getElementById('challenge-next-btn');
                const feedback = document.getElementById('challenge-feedback');
                
                if (submitBtn) submitBtn.disabled = true;
                if (nextBtn) nextBtn.style.display = 'none';
                if (feedback) feedback.style.display = 'none';
                
                // Clear previous selections
                document.querySelectorAll('.answer-option-challenge').forEach(btn => {
                    btn.classList.remove('selected');
                });
            },

            selectAnswer(answer) {
                this.selectedAnswer = answer;
                
                // Update UI
                document.querySelectorAll('.answer-option-challenge').forEach(btn => {
                    btn.classList.remove('selected');
                    if (btn.textContent.includes(answer)) {
                        btn.classList.add('selected');
                    }
                });
                
                const submitBtn = document.getElementById('challenge-submit-btn');
                if (submitBtn) submitBtn.disabled = false;
            },

            submitAnswer() {
                if (!this.selectedAnswer) return;
                
                const isCorrect = this.selectedAnswer === this.currentCase.correctAnswer;
                
                // Update answer options to show correct/incorrect
                document.querySelectorAll('.answer-option-challenge').forEach(btn => {
                    if (btn.textContent.includes(this.currentCase.correctAnswer)) {
                        btn.classList.add('correct');
                    } else if (btn.textContent.includes(this.selectedAnswer) && !isCorrect) {
                        btn.classList.add('incorrect');
                    }
                    btn.onclick = null; // Disable further clicks
                });
                
                this.showFeedback(isCorrect);
            },

            showFeedback(isCorrect) {
                const feedbackDiv = document.getElementById('challenge-feedback');
                if (!feedbackDiv) return;
                
                const case_data = this.currentCase;
                const selectedAnswer = this.selectedAnswer;
                
                feedbackDiv.innerHTML = `
                    <div class="challenge-feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
                        <h4>${isCorrect ? '🎯 Excellent Analysis!' : '🔍 Learning Opportunity'}</h4>
                        <div class="feedback-content">
                            <p><strong>Your answer:</strong> ${selectedAnswer}</p>
                            <p><strong>Correct answer:</strong> ${case_data.correctAnswer}</p>
                            <div class="feedback-explanation">
                                <p><strong>Clinical Reasoning:</strong></p>
                                <p>The pattern of denervation in <strong>${case_data.affectedMuscles.join(', ')}</strong> with normal 
                                <strong>${case_data.normalMuscles.slice(0,3).join(', ')}</strong> is characteristic of ${case_data.correctAnswer}.</p>
                                ${isCorrect ? 
                                    '<p style="color: #28a745;">✅ Your localization skills are excellent!</p>' : 
                                    '<p style="color: #dc3545;">Review the innervation patterns and try to identify the common pathway affected.</p>'
                                }
                            </div>
                        </div>
                    </div>
                `;
                
                feedbackDiv.style.display = 'block';
                
                // Show next case button
                const nextBtn = document.getElementById('challenge-next-btn');
                if (nextBtn) nextBtn.style.display = 'inline-block';
                
                // Hide submit button
                const submitBtn = document.getElementById('challenge-submit-btn');
                if (submitBtn) submitBtn.style.display = 'none';
            },
            
            nextCase() {
                this.generateCase();
                
                // Reset buttons
                const submitBtn = document.getElementById('challenge-submit-btn');
                const nextBtn = document.getElementById('challenge-next-btn');
                
                if (submitBtn) {
                    submitBtn.style.display = 'inline-block';
                    submitBtn.disabled = true;
                }
                if (nextBtn) nextBtn.style.display = 'none';
            }
        };

        // PGY-Specific Case Filtering Functions
        function startPGYSpecificCases(pgyLevel, difficulty) {
            // Define case filtering based on PGY level and difficulty
            const pgyLevelMap = {
                'pgy2': ['beginner'], // PGY-2: Only beginner cases
                'pgy3': ['beginner', 'intermediate'], // PGY-3: Beginner + Intermediate
                'pgy4': ['beginner', 'intermediate', 'difficult'], // PGY-4: All levels
                'all': ['beginner', 'intermediate', 'difficult'] // All levels
            };
            
            let targetDifficulties = [];
            
            if (difficulty === 'all') {
                targetDifficulties = pgyLevelMap[pgyLevel];
            } else {
                // Check if the specific difficulty is allowed for this PGY level
                const allowedDifficulties = pgyLevelMap[pgyLevel];
                if (allowedDifficulties.includes(difficulty)) {
                    targetDifficulties = [difficulty];
                } else {
                    alert(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} cases are not available for ${pgyLevel.toUpperCase()} level. Please select from available difficulties.`);
                    return;
                }
            }
            
            // Filter cases based on difficulty
            const filteredCases = [];
            for (const [caseId, caseData] of Object.entries(caseDatabase)) {
                if (targetDifficulties.includes(caseData.difficulty)) {
                    filteredCases.push(caseId);
                }
            }
            
            if (filteredCases.length === 0) {
                alert('No cases found for the specified criteria. Please try a different selection.');
                return;
            }
            
            // Start a random case from the filtered set
            const randomId = filteredCases[Math.floor(Math.random() * filteredCases.length)];
            startSpecificCase(randomId);
            
            console.log(`Started ${pgyLevel} level ${difficulty} case: ${randomId}`);
        }

        // Additional Testing Functions (Professional implementations)
        function startEMGAudioTest(pgyLevel) {
            const levelInfo = {
                'pgy2': 'Basic EMG waveform recognition and normal patterns',
                'pgy3': 'Intermediate waveform identification and recruitment patterns',
                'pgy4': 'Advanced waveform analysis and complex pattern recognition'
            };
            
            const content = `
                <div class="modal-status status-coming-soon">Coming Soon</div>
                <p>The <strong>EMG Audio/Visual Recognition Test</strong> for ${pgyLevel.toUpperCase()} level will provide comprehensive training in:</p>
                <div class="modal-features">
                    <h4>🎯 Target Skills:</h4>
                    <ul>
                        <li>${levelInfo[pgyLevel] || 'Comprehensive EMG pattern recognition'}</li>
                        <li>Audio identification of abnormal discharges</li>
                        <li>Visual waveform analysis</li>
                        <li>Recruitment pattern assessment</li>
                    </ul>
                </div>
                <p><strong>Note:</strong> This feature requires audio and visual EMG samples. Please provide these resources to enable full implementation.</p>
            `;
            
            showModal('🔊 EMG Audio/Visual Recognition Test', content);
            console.log(`EMG Audio test requested for: ${pgyLevel}`);
        }

        function startLandmarkQuiz(pgyLevel) {
            // Initialize landmark quiz with appropriate difficulty
            const quizData = createLandmarkQuizData(pgyLevel);
            showLandmarkQuizModal(quizData, pgyLevel);
            console.log(`Landmarks quiz started for: ${pgyLevel}`);
        }
        
        function createLandmarkQuizData(pgyLevel) {
            const allQuestions = [
                {
                    id: 1,
                    difficulty: 'pgy2',
                    nerve: 'median',
                    question: "Where should the G1 (active) electrode be placed for median nerve motor studies?",
                    options: [
                        "Over the thenar eminence",
                        "Over the belly of abductor pollicis brevis muscle",
                        "Over the first metacarpal-phalangeal joint",
                        "Over the palmaris longus tendon"
                    ],
                    correct: 1,
                    explanation: "G1 should be placed over the belly of the abductor pollicis brevis muscle, not over tendon. This ensures proper muscle response recording."
                },
                {
                    id: 2,
                    difficulty: 'pgy2',
                    nerve: 'median',
                    question: "What is the standard distance from the wrist stimulation site to the recording electrode for median nerve studies?",
                    options: ["6 cm", "8 cm", "10 cm", "12 cm"],
                    correct: 1,
                    explanation: "8 cm is the standard distance from wrist stimulation to recording electrode, ensuring accurate distal latency measurement."
                },
                {
                    id: 3,
                    difficulty: 'pgy2',
                    nerve: 'ulnar',
                    question: "Where is the G1 (active) electrode placed for ulnar nerve motor studies?",
                    options: [
                        "Over the fifth metacarpal",
                        "Over the hypothenar eminence",
                        "Over the belly of abductor digiti minimi muscle",
                        "Over the flexor carpi ulnaris tendon"
                    ],
                    correct: 2,
                    explanation: "G1 is placed over the belly of the abductor digiti minimi muscle in the medial hypothenar eminence for optimal recording."
                },
                {
                    id: 4,
                    difficulty: 'pgy3',
                    nerve: 'ulnar',
                    question: "For ulnar nerve across-elbow studies, where should the below-elbow stimulation site be placed?",
                    options: [
                        "At the medial epicondyle",
                        "1 cm distal to medial epicondyle",
                        "3 cm distal to medial epicondyle",
                        "5 cm distal to medial epicondyle"
                    ],
                    correct: 2,
                    explanation: "3 cm distal to the medial epicondyle ensures the stimulation is distal to the cubital tunnel, allowing detection of ulnar slowing at the elbow."
                },
                {
                    id: 5,
                    difficulty: 'pgy3',
                    nerve: 'median',
                    question: "What anatomical landmark guides median nerve stimulation at the antecubital fossa?",
                    options: [
                        "Biceps brachii tendon laterally",
                        "Brachial artery pulsation medially",
                        "Just medial to brachial artery pulsation",
                        "Medial epicondyle"
                    ],
                    correct: 2,
                    explanation: "Stimulation should be just medial to the brachial artery pulsation, between the medial edge of biceps tendon and the artery."
                },
                {
                    id: 6,
                    difficulty: 'pgy4',
                    nerve: 'ulnar',
                    question: "When performing ulnar studies across the elbow, what elbow position prevents factitious slowing?",
                    options: [
                        "Full extension (180°)",
                        "90° flexion",
                        "90°-135° flexion",
                        "Maximum flexion"
                    ],
                    correct: 2,
                    explanation: "Elbow flexion between 90°-135° prevents factitious slowing that can occur with extreme positions, ensuring accurate measurement."
                },
                {
                    id: 7,
                    difficulty: 'pgy4',
                    nerve: 'median',
                    question: "What potential pitfall should be considered when stimulating the median nerve at the antecubital fossa?",
                    options: [
                        "Radial nerve co-stimulation",
                        "Martin-Gruber anastomosis",
                        "Ulnar nerve co-stimulation", 
                        "Brachial plexus stimulation"
                    ],
                    correct: 1,
                    explanation: "Martin-Gruber anastomosis (median-to-ulnar crossover in the forearm) can affect median nerve studies and must be considered."
                }
            ];
            
            // Filter questions based on PGY level
            const pgyLevels = {
                'pgy2': ['pgy2'],
                'pgy3': ['pgy2', 'pgy3'],
                'pgy4': ['pgy2', 'pgy3', 'pgy4']
            };
            
            const allowedDifficulties = pgyLevels[pgyLevel] || ['pgy2'];
            const filteredQuestions = allQuestions.filter(q => allowedDifficulties.includes(q.difficulty));
            
            // Shuffle and select 5 questions
            const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, Math.min(5, shuffled.length));
        }
        
        function showLandmarkQuizModal(questions, pgyLevel) {
            let currentQuestion = 0;
            let score = 0;
            let answers = [];
            
            const content = `
                <div class="landmark-quiz-container">
                    <div class="quiz-header">
                        <div class="quiz-progress">
                            <span id="question-counter">Question 1 of ${questions.length}</span>
                            <div class="progress-bar">
                                <div id="quiz-progress-fill" style="width: ${(1/questions.length)*100}%"></div>
                            </div>
                        </div>
                        <div class="quiz-score">Score: <span id="current-score">0</span>/${questions.length}</div>
                    </div>
                    
                    <div id="quiz-question-container">
                        <!-- Question content will be populated here -->
                    </div>
                    
                    <div class="quiz-controls">
                        <button id="quiz-submit" class="quiz-button primary" style="display:none;" onclick="submitLandmarkAnswer()">Submit Answer</button>
                        <button id="quiz-next" class="quiz-button primary" style="display:none;" onclick="nextLandmarkQuestion()">Next Question</button>
                        <button id="quiz-finish" class="quiz-button success" style="display:none;" onclick="finishLandmarkQuiz()">View Results</button>
                    </div>
                </div>
                
                <style>
                .landmark-quiz-container { font-family: Arial, sans-serif; }
                .quiz-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
                .quiz-progress { flex: 1; margin-right: 20px; }
                .progress-bar { width: 100%; height: 6px; background: #e0e7e9; border-radius: 3px; margin-top: 5px; }
                #quiz-progress-fill { height: 100%; background: linear-gradient(90deg, #6b9f78, #4a7c59); border-radius: 3px; transition: width 0.3s ease; }
                .quiz-score { font-weight: bold; color: #2d5a3d; }
                .quiz-question { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #e0e7e9; }
                .question-text { font-size: 1.1em; font-weight: 600; color: #2c3e50; margin-bottom: 15px; line-height: 1.4; }
                .nerve-badge { display: inline-block; background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.8em; font-weight: 600; margin-bottom: 15px; }
                .quiz-options { list-style: none; padding: 0; margin: 0; }
                .quiz-options li { margin-bottom: 12px; }
                .quiz-options label { display: flex; align-items: center; padding: 12px 15px; background: #f8f9fa; border: 2px solid transparent; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; }
                .quiz-options label:hover { background: #e9ecef; border-color: #6b9f78; }
                .quiz-options input[type="radio"] { margin-right: 12px; }
                .quiz-options label.correct { background: #d4edda; border-color: #28a745; color: #155724; }
                .quiz-options label.incorrect { background: #f8d7da; border-color: #dc3545; color: #721c24; }
                .quiz-explanation { background: #e7f3ff; border-left: 4px solid #3498db; padding: 15px; margin-top: 15px; border-radius: 0 8px 8px 0; }
                .quiz-button { padding: 12px 25px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
                .quiz-button.primary { background: #3498db; color: white; }
                .quiz-button.primary:hover { background: #2980b9; }
                .quiz-button.success { background: #27ae60; color: white; }
                .quiz-button.success:hover { background: #229954; }
                .quiz-controls { text-align: center; margin-top: 20px; }
                .quiz-final-score { text-align: center; padding: 30px; }
                .score-excellent { color: #27ae60; }
                .score-good { color: #f39c12; }
                .score-needs-work { color: #e74c3c; }
                </style>
            `;
            
            showModal('📍 NCS Landmarks Quiz', content);
            
            // Store quiz data globally for access by quiz functions
            window.currentLandmarkQuiz = {
                questions: questions,
                currentQuestion: 0,
                score: 0,
                answers: [],
                pgyLevel: pgyLevel
            };
            
            displayLandmarkQuestion();
        }
        
        function displayLandmarkQuestion() {
            const quiz = window.currentLandmarkQuiz;
            const question = quiz.questions[quiz.currentQuestion];
            
            const questionContainer = document.getElementById('quiz-question-container');
            questionContainer.innerHTML = `
                <div class="quiz-question">
                    <div class="nerve-badge">${question.nerve.toUpperCase()} NERVE</div>
                    <div class="question-text">${question.question}</div>
                    <ul class="quiz-options">
                        ${question.options.map((option, index) => `
                            <li>
                                <label>
                                    <input type="radio" name="quiz-answer" value="${index}">
                                    ${option}
                                </label>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            
            // Update progress
            document.getElementById('question-counter').textContent = `Question ${quiz.currentQuestion + 1} of ${quiz.questions.length}`;
            document.getElementById('quiz-progress-fill').style.width = `${((quiz.currentQuestion + 1) / quiz.questions.length) * 100}%`;
            
            // Show submit button
            document.getElementById('quiz-submit').style.display = 'inline-block';
            document.getElementById('quiz-next').style.display = 'none';
            document.getElementById('quiz-finish').style.display = 'none';
            
            // Add event listeners
            const radioButtons = document.querySelectorAll('input[name="quiz-answer"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    document.getElementById('quiz-submit').disabled = false;
                });
            });
        }
        
        function submitLandmarkAnswer() {
            const quiz = window.currentLandmarkQuiz;
            const question = quiz.questions[quiz.currentQuestion];
            const selectedAnswer = document.querySelector('input[name="quiz-answer"]:checked');
            
            if (!selectedAnswer) {
                alert('Please select an answer.');
                return;
            }
            
            const selectedIndex = parseInt(selectedAnswer.value);
            const isCorrect = selectedIndex === question.correct;
            
            // Store answer
            quiz.answers.push({
                questionId: question.id,
                selected: selectedIndex,
                correct: question.correct,
                isCorrect: isCorrect
            });
            
            if (isCorrect) {
                quiz.score++;
                document.getElementById('current-score').textContent = quiz.score;
            }
            
            // Show visual feedback
            const labels = document.querySelectorAll('.quiz-options label');
            labels[question.correct].classList.add('correct');
            if (!isCorrect) {
                labels[selectedIndex].classList.add('incorrect');
            }
            
            // Disable all radio buttons
            const radioButtons = document.querySelectorAll('input[name="quiz-answer"]');
            radioButtons.forEach(radio => radio.disabled = true);
            
            // Show explanation
            const questionContainer = document.querySelector('.quiz-question');
            questionContainer.innerHTML += `
                <div class="quiz-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            
            // Show appropriate next button
            document.getElementById('quiz-submit').style.display = 'none';
            if (quiz.currentQuestion < quiz.questions.length - 1) {
                document.getElementById('quiz-next').style.display = 'inline-block';
            } else {
                document.getElementById('quiz-finish').style.display = 'inline-block';
            }
        }
        
        function nextLandmarkQuestion() {
            const quiz = window.currentLandmarkQuiz;
            quiz.currentQuestion++;
            displayLandmarkQuestion();
        }
        
        function finishLandmarkQuiz() {
            const quiz = window.currentLandmarkQuiz;
            const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
            
            let scoreClass, feedback;
            if (percentage >= 80) {
                scoreClass = 'score-excellent';
                feedback = 'Excellent! You have a strong understanding of NCS landmarks.';
            } else if (percentage >= 60) {
                scoreClass = 'score-good';
                feedback = 'Good work! Review the missed questions to improve your landmark knowledge.';
            } else {
                scoreClass = 'score-needs-work';
                feedback = 'Consider reviewing the NCS Landmarks section for better understanding.';
            }
            
            const content = `
                <div class="quiz-final-score">
                    <h3>🎯 Quiz Complete!</h3>
                    <div class="${scoreClass}" style="font-size: 2em; font-weight: bold; margin: 20px 0;">
                        ${quiz.score}/${quiz.questions.length} (${percentage}%)
                    </div>
                    <p>${feedback}</p>
                    
                    <div class="modal-features">
                        <h4>📊 Performance Summary:</h4>
                        <ul>
                            <li><strong>Total Questions:</strong> ${quiz.questions.length}</li>
                            <li><strong>Correct Answers:</strong> ${quiz.score}</li>
                            <li><strong>Accuracy:</strong> ${percentage}%</li>
                            <li><strong>Level:</strong> ${quiz.pgyLevel.toUpperCase()}</li>
                        </ul>
                    </div>
                    
                    <p><strong>Next Steps:</strong> Review the NCS Landmarks tab for detailed electrode placement information and continue practicing with different PGY levels.</p>
                </div>
            `;
            
            showModal('📍 NCS Landmarks Quiz Results', content);
        }

        function startPlexusQuiz(pgyLevel) {
            // Initialize plexus quiz with appropriate difficulty
            const quizData = createPlexusQuizData(pgyLevel);
            showPlexusQuizModal(quizData, pgyLevel);
            console.log(`Plexus quiz started for: ${pgyLevel}`);
        }
        
        function createPlexusQuizData(pgyLevel) {
            const allQuestions = [
                {
                    id: 1,
                    difficulty: 'pgy2',
                    plexus: 'brachial',
                    question: "Identify the nerve roots that form the upper trunk of the brachial plexus:",
                    type: 'multiple_choice',
                    options: ["C5-C6", "C7", "C8-T1", "C5-C7"],
                    correct: 0,
                    explanation: "The upper trunk is formed by nerve roots C5 and C6. This is the most commonly injured trunk in brachial plexus injuries (Erb's palsy)."
                },
                {
                    id: 2,
                    difficulty: 'pgy2',
                    plexus: 'brachial',
                    question: "Which nerve comes directly from the medial cord?",
                    type: 'multiple_choice',
                    options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Axillary nerve"],
                    correct: 1,
                    explanation: "The ulnar nerve arises directly from the medial cord (C8-T1). The median nerve has contributions from both medial and lateral cords."
                },
                {
                    id: 3,
                    difficulty: 'pgy2',
                    plexus: 'lumbosacral',
                    question: "Which nerve root is most commonly affected in L5 radiculopathy?",
                    type: 'multiple_choice',
                    options: ["L4", "L5", "S1", "L3"],
                    correct: 1,
                    explanation: "L5 radiculopathy typically affects the L5 nerve root, commonly due to L4-L5 disc herniation or L5-S1 disc affecting the traversing L5 root."
                },
                {
                    id: 4,
                    difficulty: 'pgy3',
                    plexus: 'brachial',
                    question: "In the visual diagram, identify which structure represents the posterior cord:",
                    type: 'visual_identification',
                    options: ["A", "B", "C", "D"],
                    correct: 2,
                    explanation: "The posterior cord (C) is formed by the posterior divisions of all three trunks and gives rise to the radial and axillary nerves."
                },
                {
                    id: 5,
                    difficulty: 'pgy3',
                    plexus: 'brachial',
                    question: "What is the most common entrapment site for the ulnar nerve?",
                    type: 'multiple_choice',
                    options: ["Guyon's canal", "Cubital tunnel", "Axilla", "Carpal tunnel"],
                    correct: 1,
                    explanation: "The cubital tunnel at the elbow is the most common site for ulnar nerve entrapment, more frequent than Guyon's canal at the wrist."
                },
                {
                    id: 6,
                    difficulty: 'pgy4',
                    plexus: 'lumbosacral',
                    question: "Which muscles would be affected in a complete L5 root lesion?",
                    type: 'multiple_choice',
                    options: [
                        "Only tibialis anterior",
                        "Tibialis anterior and extensor digitorum longus", 
                        "Tibialis anterior, EHL, EDL, and gluteus medius",
                        "All dorsiflexors and plantarflexors"
                    ],
                    correct: 2,
                    explanation: "Complete L5 root lesion affects tibialis anterior, extensor hallucis longus, extensor digitorum longus, and gluteus medius, causing foot drop and Trendelenburg gait."
                }
            ];
            
            // Filter questions based on PGY level
            const pgyLevels = {
                'pgy2': ['pgy2'],
                'pgy3': ['pgy2', 'pgy3'],
                'pgy4': ['pgy2', 'pgy3', 'pgy4']
            };
            
            const allowedDifficulties = pgyLevels[pgyLevel] || ['pgy2'];
            const filteredQuestions = allQuestions.filter(q => allowedDifficulties.includes(q.difficulty));
            
            // Shuffle and select 4 questions
            const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, Math.min(4, shuffled.length));
        }
        
        function showPlexusQuizModal(questions, pgyLevel) {
            const content = `
                <div class="plexus-quiz-container">
                    <div class="quiz-header">
                        <div class="quiz-progress">
                            <span id="plexus-question-counter">Question 1 of ${questions.length}</span>
                            <div class="progress-bar">
                                <div id="plexus-progress-fill" style="width: ${(1/questions.length)*100}%"></div>
                            </div>
                        </div>
                        <div class="quiz-score">Score: <span id="plexus-score">0</span>/${questions.length}</div>
                    </div>
                    
                    <div id="plexus-question-container">
                        <!-- Question content will be populated here -->
                    </div>
                    
                    <div class="quiz-controls">
                        <button id="plexus-submit" class="quiz-button primary" style="display:none;" onclick="submitPlexusAnswer()">Submit Answer</button>
                        <button id="plexus-next" class="quiz-button primary" style="display:none;" onclick="nextPlexusQuestion()">Next Question</button>
                        <button id="plexus-finish" class="quiz-button success" style="display:none;" onclick="finishPlexusQuiz()">View Results</button>
                    </div>
                </div>
                
                <style>
                .plexus-quiz-container { font-family: Arial, sans-serif; }
                .plexus-diagram { max-width: 100%; height: auto; border: 2px solid #e0e7e9; border-radius: 8px; margin: 15px 0; background: white; }
                .diagram-container { text-align: center; margin: 20px 0; }
                .plexus-badge { display: inline-block; background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.8em; font-weight: 600; margin-bottom: 15px; }
                .visual-options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 20px; }
                .visual-option { padding: 10px; background: #f8f9fa; border: 2px solid transparent; border-radius: 8px; cursor: pointer; text-align: center; font-weight: bold; transition: all 0.2s ease; }
                .visual-option:hover { background: #e9ecef; border-color: #6b9f78; }
                .visual-option.selected { background: #d1ecf1; border-color: #3498db; }
                .visual-option.correct { background: #d4edda; border-color: #28a745; color: #155724; }
                .visual-option.incorrect { background: #f8d7da; border-color: #dc3545; color: #721c24; }
                </style>
            `;
            
            showModal('🧠 Plexus Anatomy Challenge', content);
            
            // Store quiz data globally
            window.currentPlexusQuiz = {
                questions: questions,
                currentQuestion: 0,
                score: 0,
                answers: [],
                pgyLevel: pgyLevel
            };
            
            displayPlexusQuestion();
        }
        
        function displayPlexusQuestion() {
            const quiz = window.currentPlexusQuiz;
            const question = quiz.questions[quiz.currentQuestion];
            
            const questionContainer = document.getElementById('plexus-question-container');
            
            let questionHTML = `
                <div class="quiz-question">
                    <div class="plexus-badge">${question.plexus.toUpperCase()} PLEXUS</div>
                    <div class="question-text">${question.question}</div>
            `;
            
            // Add visual diagram for visual identification questions
            if (question.type === 'visual_identification') {
                questionHTML += `
                    <div class="diagram-container">
                        ${createBrachialPlexusDiagram()}
                    </div>
                    <div class="visual-options">
                        ${question.options.map((option, index) => `
                            <div class="visual-option" data-value="${index}">
                                ${option}
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                questionHTML += `
                    <ul class="quiz-options">
                        ${question.options.map((option, index) => `
                            <li>
                                <label>
                                    <input type="radio" name="plexus-answer" value="${index}">
                                    ${option}
                                </label>
                            </li>
                        `).join('')}
                    </ul>
                `;
            }
            
            questionHTML += `</div>`;
            questionContainer.innerHTML = questionHTML;
            
            // Update progress
            document.getElementById('plexus-question-counter').textContent = `Question ${quiz.currentQuestion + 1} of ${quiz.questions.length}`;
            document.getElementById('plexus-progress-fill').style.width = `${((quiz.currentQuestion + 1) / quiz.questions.length) * 100}%`;
            
            // Show submit button
            document.getElementById('plexus-submit').style.display = 'inline-block';
            document.getElementById('plexus-next').style.display = 'none';
            document.getElementById('plexus-finish').style.display = 'none';
            
            // Add event listeners
            if (question.type === 'visual_identification') {
                const visualOptions = document.querySelectorAll('.visual-option');
                visualOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        visualOptions.forEach(opt => opt.classList.remove('selected'));
                        this.classList.add('selected');
                        this.dataset.selected = 'true';
                        document.getElementById('plexus-submit').disabled = false;
                    });
                });
            } else {
                const radioButtons = document.querySelectorAll('input[name="plexus-answer"]');
                radioButtons.forEach(radio => {
                    radio.addEventListener('change', function() {
                        document.getElementById('plexus-submit').disabled = false;
                    });
                });
            }
        }
        
        function createBrachialPlexusDiagram() {
            return `
                <svg class="plexus-diagram" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                    <!-- Background -->
                    <rect width="600" height="400" fill="#fafafa" stroke="#ddd" stroke-width="1"/>
                    
                    <!-- Title -->
                    <text x="300" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#2c3e50">Brachial Plexus - Simplified Diagram</text>
                    
                    <!-- Nerve Roots -->
                    <g stroke="#3498db" stroke-width="3" fill="none">
                        <line x1="50" y1="80" x2="150" y2="120" /> <!-- C5 -->
                        <line x1="50" y1="110" x2="150" y2="120" /> <!-- C6 -->
                        <line x1="50" y1="140" x2="150" y2="180" /> <!-- C7 -->
                        <line x1="50" y1="170" x2="150" y2="240" /> <!-- C8 -->
                        <line x1="50" y1="200" x2="150" y2="240" /> <!-- T1 -->
                    </g>
                    
                    <!-- Trunks -->
                    <g stroke="#27ae60" stroke-width="4" fill="none">
                        <line x1="150" y1="120" x2="250" y2="140" /> <!-- Upper Trunk -->
                        <line x1="150" y1="180" x2="250" y2="180" /> <!-- Middle Trunk -->
                        <line x1="150" y1="240" x2="250" y2="220" /> <!-- Lower Trunk -->
                    </g>
                    
                    <!-- Divisions (simplified) -->
                    <g stroke="#f39c12" stroke-width="2" fill="none">
                        <line x1="250" y1="140" x2="350" y2="120" /> <!-- Upper anterior -->
                        <line x1="250" y1="140" x2="350" y2="160" /> <!-- Upper posterior -->
                        <line x1="250" y1="180" x2="350" y2="160" /> <!-- Middle posterior -->
                        <line x1="250" y1="180" x2="350" y2="200" /> <!-- Middle anterior -->
                        <line x1="250" y1="220" x2="350" y2="200" /> <!-- Lower anterior -->
                        <line x1="250" y1="220" x2="350" y2="240" /> <!-- Lower posterior -->
                    </g>
                    
                    <!-- Cords -->
                    <g stroke="#e74c3c" stroke-width="5" fill="none">
                        <line x1="350" y1="120" x2="450" y2="130" /> <!-- Lateral Cord (A) -->
                        <line x1="350" y1="160" x2="450" y2="180" /> <!-- Posterior Cord (C) -->
                        <line x1="350" y1="200" x2="450" y2="230" /> <!-- Medial Cord (B) -->
                    </g>
                    
                    <!-- Terminal Nerves -->
                    <g stroke="#9b59b6" stroke-width="3" fill="none">
                        <line x1="450" y1="130" x2="550" y2="120" /> <!-- From Lateral -->
                        <line x1="450" y1="130" x2="550" y2="150" /> <!-- From Lateral -->
                        <line x1="450" y1="180" x2="550" y2="170" /> <!-- From Posterior -->
                        <line x1="450" y1="180" x2="550" y2="190" /> <!-- From Posterior -->
                        <line x1="450" y1="230" x2="550" y2="220" /> <!-- From Medial -->
                        <line x1="450" y1="230" x2="550" y2="240" /> <!-- From Medial -->
                    </g>
                    
                    <!-- Labels -->
                    <g font-size="12" text-anchor="middle" fill="#2c3e50">
                        <!-- Roots -->
                        <text x="30" y="85">C5</text>
                        <text x="30" y="115">C6</text>
                        <text x="30" y="145">C7</text>
                        <text x="30" y="175">C8</text>
                        <text x="30" y="205">T1</text>
                        
                        <!-- Trunks -->
                        <text x="200" y="135">Upper</text>
                        <text x="200" y="175">Middle</text>
                        <text x="200" y="215">Lower</text>
                        
                        <!-- Cords with answer labels -->
                        <text x="470" y="125" font-weight="bold" fill="#e74c3c">A</text>
                        <text x="470" y="225" font-weight="bold" fill="#e74c3c">B</text>
                        <text x="470" y="175" font-weight="bold" fill="#e74c3c">C</text>
                        <text x="420" y="175" font-weight="bold" fill="#e74c3c">D</text>
                        
                        <!-- Cord names (smaller) -->
                        <text x="430" y="110" font-size="10">Lateral</text>
                        <text x="430" y="160" font-size="10">Posterior</text>
                        <text x="430" y="210" font-size="10">Medial</text>
                    </g>
                    
                    <!-- Legend -->
                    <g font-size="10" fill="#666">
                        <text x="50" y="350">Legend:</text>
                        <line x1="50" y1="365" x2="70" y2="365" stroke="#3498db" stroke-width="3"/>
                        <text x="75" y="369">Roots</text>
                        <line x1="120" y1="365" x2="140" y2="365" stroke="#27ae60" stroke-width="4"/>
                        <text x="145" y="369">Trunks</text>
                        <line x1="190" y1="365" x2="210" y2="365" stroke="#e74c3c" stroke-width="5"/>
                        <text x="215" y="369">Cords</text>
                        <line x1="260" y1="365" x2="280" y2="365" stroke="#9b59b6" stroke-width="3"/>
                        <text x="285" y="369">Terminal Nerves</text>
                    </g>
                </svg>
            `;
        }
        
        function submitPlexusAnswer() {
            const quiz = window.currentPlexusQuiz;
            const question = quiz.questions[quiz.currentQuestion];
            let selectedIndex = -1;
            
            if (question.type === 'visual_identification') {
                const selectedOption = document.querySelector('.visual-option[data-selected="true"]');
                if (!selectedOption) {
                    alert('Please select an answer.');
                    return;
                }
                selectedIndex = parseInt(selectedOption.dataset.value);
            } else {
                const selectedAnswer = document.querySelector('input[name="plexus-answer"]:checked');
                if (!selectedAnswer) {
                    alert('Please select an answer.');
                    return;
                }
                selectedIndex = parseInt(selectedAnswer.value);
            }
            
            const isCorrect = selectedIndex === question.correct;
            
            // Store answer
            quiz.answers.push({
                questionId: question.id,
                selected: selectedIndex,
                correct: question.correct,
                isCorrect: isCorrect
            });
            
            if (isCorrect) {
                quiz.score++;
                document.getElementById('plexus-score').textContent = quiz.score;
            }
            
            // Show visual feedback
            if (question.type === 'visual_identification') {
                const options = document.querySelectorAll('.visual-option');
                options[question.correct].classList.add('correct');
                if (!isCorrect) {
                    options[selectedIndex].classList.add('incorrect');
                }
            } else {
                const labels = document.querySelectorAll('.quiz-options label');
                labels[question.correct].classList.add('correct');
                if (!isCorrect) {
                    labels[selectedIndex].classList.add('incorrect');
                }
                
                // Disable all radio buttons
                const radioButtons = document.querySelectorAll('input[name="plexus-answer"]');
                radioButtons.forEach(radio => radio.disabled = true);
            }
            
            // Show explanation
            const questionContainer = document.querySelector('.quiz-question');
            questionContainer.innerHTML += `
                <div class="quiz-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            
            // Show appropriate next button
            document.getElementById('plexus-submit').style.display = 'none';
            if (quiz.currentQuestion < quiz.questions.length - 1) {
                document.getElementById('plexus-next').style.display = 'inline-block';
            } else {
                document.getElementById('plexus-finish').style.display = 'inline-block';
            }
        }
        
        function nextPlexusQuestion() {
            const quiz = window.currentPlexusQuiz;
            quiz.currentQuestion++;
            displayPlexusQuestion();
        }
        
        function finishPlexusQuiz() {
            const quiz = window.currentPlexusQuiz;
            const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
            
            let scoreClass, feedback;
            if (percentage >= 75) {
                scoreClass = 'score-excellent';
                feedback = 'Outstanding! You have excellent plexus anatomy knowledge.';
            } else if (percentage >= 50) {
                scoreClass = 'score-good';
                feedback = 'Good foundation! Review missed concepts for improvement.';
            } else {
                scoreClass = 'score-needs-work';
                feedback = 'Focus on studying plexus anatomy basics and nerve pathways.';
            }
            
            const content = `
                <div class="quiz-final-score">
                    <h3>🧠 Plexus Quiz Complete!</h3>
                    <div class="${scoreClass}" style="font-size: 2em; font-weight: bold; margin: 20px 0;">
                        ${quiz.score}/${quiz.questions.length} (${percentage}%)
                    </div>
                    <p>${feedback}</p>
                    
                    <div class="modal-features">
                        <h4>📊 Performance Summary:</h4>
                        <ul>
                            <li><strong>Total Questions:</strong> ${quiz.questions.length}</li>
                            <li><strong>Correct Answers:</strong> ${quiz.score}</li>
                            <li><strong>Accuracy:</strong> ${percentage}%</li>
                            <li><strong>Level:</strong> ${quiz.pgyLevel.toUpperCase()}</li>
                        </ul>
                    </div>
                    
                    <p><strong>Continue Learning:</strong> Use the Interactive Plexus Anatomy tab and muscle lab for hands-on practice with nerve pathways and clinical correlations.</p>
                </div>
            `;
            
            showModal('🧠 Plexus Anatomy Results', content);
        }

        function startReportWritingPractice(pgyLevel) {
            const levelInfo = {
                'pgy2': 'Basic report structure and essential components',
                'pgy3': 'Critical components and basic differential diagnosis',
                'pgy4': 'Advanced DDx ranking and professional composition'
            };
            
            const content = `
                <div class="modal-status status-available">Available Now</div>
                <p>The <strong>Report Writing Practice</strong> for ${pgyLevel.toUpperCase()} level provides structured training in professional EMG report composition.</p>
                <div class="modal-features">
                    <h4>🎯 Training Components:</h4>
                    <ul>
                        <li>${levelInfo[pgyLevel] || 'Comprehensive report writing'}</li>
                        <li>Template-based learning exercises</li>
                        <li>Clinical correlation with study findings</li>
                        <li>Professional language and terminology</li>
                        <li>Recommendation formulation</li>
                    </ul>
                </div>
                <p><strong>Direct Access:</strong></p>
                <div style="text-align: center; margin: 20px 0;">
                    <button onclick="closeModal(); showTab(13);" class="quiz-button primary">📝 Go to Report Writing</button>
                </div>
            `;
            
            showModal('📝 Report Writing Practice', content);
            console.log(`Report writing practice requested for: ${pgyLevel}`);
        }

        function startComprehensiveAssessment(pgyLevel) {
            const levelDescriptions = {
                'pgy2': 'Level 1-2 competencies (foundation building)',
                'pgy3': 'Level 1-3 competencies (independent performance)', 
                'pgy4': 'Level 1-4 competencies (graduation readiness)'
            };
            
            const assessmentFeatures = {
                'pgy2': ['Basic case scenarios', 'Fundamental knowledge checks', 'Supervised skill assessments'],
                'pgy3': ['Mixed case difficulties', 'Audio/visual recognition', 'Independent evaluation skills'],
                'pgy4': ['Expert-level cases', 'DDx ranking challenges', 'Graduation readiness evaluation']
            };
            
            const content = `
                <div class="modal-status status-available">Available Now</div>
                <p>The <strong>Comprehensive Assessment</strong> for ${pgyLevel.toUpperCase()} level will test all ${levelDescriptions[pgyLevel]} through multiple assessment formats.</p>
                <div class="modal-features">
                    <h4>🎯 Assessment Components:</h4>
                    <ul>
                        ${assessmentFeatures[pgyLevel].map(feature => `<li>${feature}</li>`).join('')}
                        <li>Progress tracking and feedback</li>
                        <li>Competency level verification</li>
                    </ul>
                </div>
                <p><strong>Implementation:</strong> Mixed-format assessment framework coming next with structured evaluation criteria.</p>
            `;
            
            showModal('🎯 Comprehensive Assessment', content);
            console.log(`Comprehensive assessment requested for: ${pgyLevel}`);
        }

        function startConsultantChallenge() {
            const content = `
                <div class="modal-status status-available">Available Now</div>
                <p>The <strong>Consultant-Level Challenge</strong> provides aspirational Level 5 content for advanced practitioners and future practice preparation.</p>
                <div class="modal-features">
                    <h4>👑 Challenge Areas:</h4>
                    <ul>
                        <li>Complex multi-system diagnostic scenarios</li>
                        <li>Research-based case analysis</li>
                        <li>Rare condition identification</li>
                        <li>Teaching and supervision skills</li>
                        <li>Quality improvement initiatives</li>
                        <li>Advanced technique implementation</li>
                    </ul>
                </div>
                <p><strong>Target Audience:</strong> PGY-4 residents preparing for independent practice and attending physicians seeking continuing education.</p>
                <p><strong>Implementation:</strong> Advanced case scenarios and consultant-level decision making frameworks coming next.</p>
            `;
            
            showModal('👑 Consultant-Level Challenge', content);
            console.log(`Consultant-level challenge requested`);
        }

        // PGY-2 specific case starters (using existing functionality)
        function startBeginnerCases() {
            startPGYSpecificCases('pgy2', 'beginner');
        }
        
        // Missing functions that were referenced but not implemented
        function startAnatomyQuiz() {
            const content = `
                <div class="modal-status status-available">Available Now</div>
                <p>The <strong>Peripheral Anatomy Quiz</strong> tests your understanding of nerve pathways, muscle innervation, and anatomical relationships.</p>
                <div class="modal-features">
                    <h4>🎯 Quiz Areas:</h4>
                    <ul>
                        <li>Nerve root and peripheral nerve anatomy</li>
                        <li>Muscle innervation patterns</li>
                        <li>Anatomical landmark identification</li>
                        <li>Clinical correlation with EMG findings</li>
                    </ul>
                </div>
                <p><strong>Direct Access:</strong></p>
                <div style="text-align: center; margin: 20px 0;">
                    <button onclick="closeModal(); showTab(12);" class="quiz-button primary" style="margin-right: 10px;">📖 Go to Plexus Anatomy</button>
                    <button onclick="closeModal(); showTab(8);" class="quiz-button primary">🎓 Go to Muscle Lab</button>
                </div>
            `;
            
            showModal('🧬 Peripheral Anatomy Quiz', content);
            console.log('Anatomy quiz requested');
        }
        
        function startTerminologyQuiz() {
            const content = `
                <div class="modal-status status-available">Available Now</div>
                <p>The <strong>EMG Terminology Quiz</strong> tests your knowledge of electromyographic terms, measurements, and clinical definitions.</p>
                <div class="modal-features">
                    <h4>🎯 Terminology Areas:</h4>
                    <ul>
                        <li>EMG waveform terminology</li>
                        <li>Measurement definitions and normal values</li>
                        <li>Clinical EMG descriptors</li>
                        <li>Pathological EMG terminology</li>
                    </ul>
                </div>
                <p><strong>Direct Access:</strong></p>
                <div style="text-align: center; margin: 20px 0;">
                    <button onclick="closeModal(); showTab(3);" class="quiz-button primary" style="margin-right: 10px;">📚 Go to EMG Terms</button>
                    <button onclick="closeModal(); showTab(5);" class="quiz-button primary">🔍 Go to Quick Reference</button>
                </div>
            `;
            
            showModal('📚 EMG Terminology Quiz', content);
            console.log('Terminology quiz requested');
        }
        
        // Fix for video initialization error
        function initializeVideos() {
            // Check if video container exists before trying to populate
            const container = document.getElementById('video-container');
            if (container) {
                // Video initialization code would go here
                console.log('Video container found and initialized');
            } else {
                console.log('Video container not found - skipping video initialization');
            }
        }
        
        // Navigation help system
        function showNavigationHelp() {
            const content = `
                <div class="modal-status status-available">Navigation Guide</div>
                <h4>🧭 How to Navigate the EMG/NCS Learning Platform</h4>
                
                <div class="modal-features">
                    <h4>📚 Learning Pathways:</h4>
                    <ol>
                        <li><strong>Select Your Level:</strong> Click PGY-2, PGY-3, PGY-4, or All Levels at the top</li>
                        <li><strong>Choose Learning Cards:</strong> Click any card in your learning path</li>
                        <li><strong>Take Quizzes:</strong> Blue "Test Yourself" cards launch interactive quizzes</li>
                        <li><strong>Access Content:</strong> Green cards open educational tabs</li>
                    </ol>
                </div>
                
                <div class="modal-features">
                    <h4>🎯 Direct Access Options:</h4>
                    <ul>
                        <li><strong>Tab Navigation:</strong> Click "All Levels" then use the tab buttons</li>
                        <li><strong>Modal Buttons:</strong> Use "Go to Tab" buttons in information windows</li>
                        <li><strong>Quick Access:</strong> Cards automatically switch to tab view</li>
                    </ul>
                </div>
                
                <div class="modal-features">
                    <h4>🔍 Available Tools:</h4>
                    <ul>
                        <li>📖 <strong>Case Studies:</strong> Interactive clinical scenarios</li>
                        <li>📍 <strong>NCS Landmarks Quiz:</strong> Preston & Shapiro electrode placement</li>
                        <li>🧠 <strong>Plexus Anatomy Quiz:</strong> Interactive visual diagrams</li>
                        <li>📝 <strong>Report Writing:</strong> Professional EMG reporting practice</li>
                        <li>🎓 <strong>Muscle Lab:</strong> Advanced anatomy tools (PGY-3+)</li>
                    </ul>
                </div>
                
                <p style="text-align: center; font-weight: bold; color: #2980b9;">
                    Every learning card connects to real educational content!
                </p>
            `;
            
            showModal('🧭 Navigation Guide', content);
        }
        
        // Enhanced image error handling
        function handleImageError(img, type = 'generic') {
            const fallbacks = {
                'video': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2Y1MTY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5OmIFZpZGVvIENvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==',
                'landmark': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiOWY3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk41JbWFnZSBDb21pbmcgU29vbjwvdGV4dD48L3N2Zz4=',
                'generic': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTllY2VmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+'
            };
            
            img.src = fallbacks[type] || fallbacks['generic'];
            img.style.opacity = '0.7';
            console.log(`Image fallback applied: ${type}`);
        }
        
        // Clinical Cases Function - Shows Beautiful UI with PGY Level Locks
        function showClinicalCases(pgyLevel) {
            const content = `
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #2c3e50; margin-bottom: 10px;">🎯 Interactive Clinical Cases</h2>
                    <p style="color: #5a6c7d; font-size: 16px;">Practice with real-world EMG/NCS scenarios at your level</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 30px 0;">
                    <!-- Beginner Level - Always Available -->
                    <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 2px solid #10b981; border-radius: 15px; padding: 25px; position: relative; cursor: pointer; transition: all 0.3s ease;" onclick="startBeginnerCases()">
                        <div style="text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 15px;">🌱</div>
                            <h3 style="color: #065f46; margin: 0 0 10px 0;">Beginner Cases</h3>
                            <p style="color: #047857; margin: 0 0 15px 0;">Carpal tunnel, ulnar neuropathy, basic radiculopathy</p>
                            <div style="background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: 600;">
                                ✅ Available for ${pgyLevel.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Intermediate Level - Locked for PGY-2 -->
                    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid ${pgyLevel === 'pgy2' ? '#9ca3af' : '#f59e0b'}; border-radius: 15px; padding: 25px; position: relative; cursor: ${pgyLevel === 'pgy2' ? 'pointer' : 'pointer'}; transition: all 0.3s ease; ${pgyLevel === 'pgy2' ? 'opacity: 0.7;' : ''}" onclick="${pgyLevel === 'pgy2' ? 'showUnlockPrompt(\"intermediate\", \"pgy3\")' : 'startIntermediateCases()'}">
                        ${pgyLevel === 'pgy2' ? '<div style="position: absolute; top: 10px; right: 10px; background: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">🔒</div>' : ''}
                        <div style="text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 15px;">🌟</div>
                            <h3 style="color: #92400e; margin: 0 0 10px 0;">Intermediate Cases</h3>
                            <p style="color: #b45309; margin: 0 0 15px 0;">Complex neuropathies, plexopathies, myopathies</p>
                            <div style="background: ${pgyLevel === 'pgy2' ? '#9ca3af' : '#f59e0b'}; color: white; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: 600;">
                                ${pgyLevel === 'pgy2' ? '🔒 For PGY-3+ (Click to Unlock)' : '✅ Available for ' + pgyLevel.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Expert Level - Locked for PGY-2 & PGY-3 -->
                    <div style="background: linear-gradient(135deg, #fce7f3, #fbcfe8); border: 2px solid ${pgyLevel === 'pgy4' ? '#ec4899' : '#9ca3af'}; border-radius: 15px; padding: 25px; position: relative; cursor: pointer; transition: all 0.3s ease; ${pgyLevel !== 'pgy4' ? 'opacity: 0.7;' : ''}" onclick="${pgyLevel === 'pgy4' ? 'startExpertCases()' : 'showUnlockPrompt(\"expert\", \"pgy4\")'}">
                        ${pgyLevel !== 'pgy4' ? '<div style="position: absolute; top: 10px; right: 10px; background: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">🔒</div>' : ''}
                        <div style="text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 15px;">🏆</div>
                            <h3 style="color: #a21caf; margin: 0 0 10px 0;">Expert Cases</h3>
                            <p style="color: #be185d; margin: 0 0 15px 0;">Rare conditions, complex DDx, consultant-level</p>
                            <div style="background: ${pgyLevel === 'pgy4' ? '#ec4899' : '#9ca3af'}; color: white; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: 600;">
                                ${pgyLevel === 'pgy4' ? '✅ Available for PGY-4' : '🔒 For PGY-4 Only (Click to Unlock)'}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(107, 159, 120, 0.05); border-radius: 10px;">
                    <p style="color: #4a6d52; margin: 0; font-size: 14px;">
                        💡 <strong>Tip:</strong> Start with your level and work your way up. Each case includes detailed explanations and learning objectives.
                    </p>
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <button onclick="returnToPGYNavigator('${pgyLevel}')" 
                            style="background: #6b9f78; color: white; border: none; padding: 12px 24px; 
                                   border-radius: 8px; cursor: pointer; font-weight: 600;
                                   transition: all 0.3s ease;">
                        ← Back to Learning Pathway
                    </button>
                </div>
            `;
            
            showModal('Clinical Cases', content);
        }
        
        // Unlock Prompt Function
        function showUnlockPrompt(level, requiredPGY) {
            const levelNames = {
                'intermediate': 'Intermediate',
                'expert': 'Expert'
            };
            
            const content = `
                <div style="text-align: center;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🔓</div>
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">Unlock ${levelNames[level]} Cases?</h3>
                    <p style="color: #5a6c7d; margin-bottom: 25px;">
                        These cases are designed for ${requiredPGY.toUpperCase()} residents, but you can access them if you'd like extra challenge.
                    </p>
                    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 15px; border-radius: 10px; margin-bottom: 25px;">
                        <p style="color: #92400e; margin: 0; font-weight: 600;">
                            ⚠️ "Proceed at your own risk!" 
                        </p>
                        <p style="color: #b45309; margin: 5px 0 0 0; font-size: 14px;">
                            These cases may contain concepts you haven't learned yet.
                        </p>
                    </div>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button onclick="closeModal()" 
                                style="background: #9ca3af; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 8px; cursor: pointer; font-weight: 600;">
                            Cancel
                        </button>
                        <button onclick="closeModal(); ${level === 'intermediate' ? 'startIntermediateCases()' : 'startExpertCases()'};" 
                                style="background: #ef4444; color: white; border: none; padding: 10px 20px; 
                                       border-radius: 8px; cursor: pointer; font-weight: 600;">
                            🚀 Unlock & Continue
                        </button>
                    </div>
                </div>
            `;
            
            showModal('🔓 Unlock Cases', content);
        }
        
        // New Pathophysiology Functions
        function showRadiculopathyPathophysiology() {
            const content = `
                <div style="max-width: 900px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #4a6d52; margin-bottom: 10px;">🧠 Radiculopathy Pathophysiology</h2>
                        <p style="color: #6b9f78; font-size: 1.1em;">Level 1 Foundation - Understanding nerve root compression mechanisms</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Learning Objective</h3>
                        <p style="color: #9a3412; font-size: 1.1em; font-weight: 500;">
                            Articulate understanding of the pathophysiology of radiculopathy - nerve root compression, inflammation, and resulting clinical manifestations.
                        </p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <h4 style="color: #dc2626; margin-bottom: 15px; font-size: 1.2em;">🔬 Mechanism of Injury</h4>
                            <ul style="color: #374151; line-height: 1.6;">
                                <li><strong>Disc Herniation:</strong> Nucleus pulposus compresses nerve root</li>
                                <li><strong>Spinal Stenosis:</strong> Narrowed foramen compresses root</li>
                                <li><strong>Spondylosis:</strong> Bone spurs impinge on nerve</li>
                                <li><strong>Inflammation:</strong> Chemical radiculitis from disc material</li>
                            </ul>
                        </div>
                        
                        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <h4 style="color: #dc2626; margin-bottom: 15px; font-size: 1.2em;">⚡ Physiological Effects</h4>
                            <ul style="color: #374151; line-height: 1.6;">
                                <li><strong>Demyelination:</strong> Initial conduction slowing</li>
                                <li><strong>Axonal Loss:</strong> Chronic compression → axonal damage</li>
                                <li><strong>Wallerian Degeneration:</strong> Distal axon breakdown</li>
                                <li><strong>Denervation:</strong> Loss of motor unit function</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.3em;">📊 Clinical Manifestations by Severity</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444;">
                                <h5 style="color: #dc2626; margin-bottom: 10px;">Mild (Neuropraxia)</h5>
                                <p style="color: #991b1b; font-size: 0.9em;">Temporary demyelination, sensory symptoms predominate, good recovery expected</p>
                            </div>
                            
                            <div style="background: #fff7ed; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316;">
                                <h5 style="color: #ea580c; margin-bottom: 10px;">Moderate (Axonotmesis)</h5>
                                <p style="color: #c2410c; font-size: 0.9em;">Axonal damage, motor weakness appears, slower recovery</p>
                            </div>
                            
                            <div style="background: #fefce8; padding: 15px; border-radius: 8px; border-left: 4px solid #eab308;">
                                <h5 style="color: #ca8a04; margin-bottom: 10px;">Severe (Chronic)</h5>
                                <p style="color: #a16207; font-size: 0.9em;">Significant axonal loss, muscle atrophy, incomplete recovery</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #eff6ff; padding: 25px; border-radius: 15px; border: 2px solid #3b82f6;">
                        <h4 style="color: #1d4ed8; margin-bottom: 15px;">🧬 Why EMG Helps Localize Root Level</h4>
                        <p style="color: #1e40af; line-height: 1.6; margin-bottom: 15px;">
                            <strong>Key Principle:</strong> Each nerve root supplies a specific group of muscles (myotome). 
                            EMG can detect denervation in muscles supplied by the affected root, even when NCS are normal.
                        </p>
                        <ul style="color: #1e40af; line-height: 1.6;">
                            <li><strong>Paraspinal Muscles:</strong> Innervated directly by nerve root - earliest EMG changes</li>
                            <li><strong>Myotomal Pattern:</strong> Multiple muscles from same root show denervation</li>
                            <li><strong>Peripheral Nerves Spared:</strong> Normal NCS help distinguish from peripheral nerve lesions</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="startAnatomyQuiz()" 
                                style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; 
                                       border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; 
                                       font-weight: 600; cursor: pointer; margin-right: 15px;">
                            🎯 Practice Root-Muscle Mapping
                        </button>
                        <button onclick="closeModal()" 
                                style="background: #6b7280; color: white; border: none; padding: 15px 30px; 
                                       border-radius: 10px; font-size: 1.1em; cursor: pointer;">
                            ← Back to Competencies
                        </button>
                    </div>
                </div>
            `;
            showModal('Radiculopathy Pathophysiology', content);
        }
        
        function showNeuropathyPathophysiology() {
            const content = `
                <div style="max-width: 900px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #4a6d52; margin-bottom: 10px;">🧬 Peripheral Neuropathy Pathophysiology</h2>
                        <p style="color: #6b9f78; font-size: 1.1em;">Level 1 Foundation - Understanding peripheral nerve disease mechanisms</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Learning Objective</h3>
                        <p style="color: #9a3412; font-size: 1.1em; font-weight: 500;">
                            Articulate understanding of peripheral neuropathy pathophysiology - axonal vs demyelinating processes and their clinical implications.
                        </p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px;">
                        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                            <h4 style="color: #dc2626; margin-bottom: 20px; font-size: 1.3em;">🔥 Axonal Neuropathy</h4>
                            <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h5 style="color: #991b1b; margin-bottom: 10px;">Primary Damage: Axon</h5>
                                <ul style="color: #374151; line-height: 1.6; font-size: 0.9em;">
                                    <li>Wallerian degeneration</li>
                                    <li>Distal-to-proximal progression</li>
                                    <li>Reduced amplitudes on NCS</li>
                                    <li>Slow recovery (1mm/day)</li>
                                </ul>
                            </div>
                            <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Common Causes:</p>
                            <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5;">
                                <li>Diabetes (chronic)</li>
                                <li>Toxins/Chemotherapy</li>
                                <li>Nutritional deficiency (B12)</li>
                                <li>Chronic renal failure</li>
                            </ul>
                        </div>
                        
                        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                            <h4 style="color: #2563eb; margin-bottom: 20px; font-size: 1.3em;">⚡ Demyelinating Neuropathy</h4>
                            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h5 style="color: #1e40af; margin-bottom: 10px;">Primary Damage: Myelin Sheath</h5>
                                <ul style="color: #374151; line-height: 1.6; font-size: 0.9em;">
                                    <li>Segmental demyelination</li>
                                    <li>Conduction block/slowing</li>
                                    <li>Prolonged latencies on NCS</li>
                                    <li>Rapid recovery potential</li>
                                </ul>
                            </div>
                            <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Common Causes:</p>
                            <ul style="color: #6b7280; font-size: 0.9em; line-height: 1.5;">
                                <li>Guillain-Barré Syndrome</li>
                                <li>CIDP</li>
                                <li>CMT1 (hereditary)</li>
                                <li>Diabetes (early/acute)</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #059669; margin-bottom: 20px; font-size: 1.3em;">📋 EMG/NCS Patterns Help Distinguish:</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px;">
                                <h5 style="color: #dc2626; margin-bottom: 15px;">Axonal Pattern</h5>
                                <ul style="color: #991b1b; line-height: 1.6;">
                                    <li>↓ Amplitude (CMAP/SNAP)</li>
                                    <li>Normal/mildly ↓ velocity</li>
                                    <li>Normal distal latencies</li>
                                    <li>Length-dependent pattern</li>
                                    <li>Denervation on EMG</li>
                                </ul>
                            </div>
                            
                            <div style="background: #eff6ff; padding: 20px; border-radius: 10px;">
                                <h5 style="color: #2563eb; margin-bottom: 15px;">Demyelinating Pattern</h5>
                                <ul style="color: #1e40af; line-height: 1.6;">
                                    <li>↑ Distal latencies (>120% ULN)</li>
                                    <li>↓ Conduction velocities (>75% LLN)</li>
                                    <li>Conduction blocks</li>
                                    <li>Temporal dispersion</li>
                                    <li>Minimal denervation on EMG</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #f0fdf4; padding: 25px; border-radius: 15px; border: 2px solid #16a34a;">
                        <h4 style="color: #15803d; margin-bottom: 15px;">🎯 Clinical Implications</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h5 style="color: #15803d; margin-bottom: 10px;">Axonal → Supportive Care</h5>
                                <p style="color: #166534; font-size: 0.9em;">Treat underlying cause, symptomatic management, slow recovery</p>
                            </div>
                            <div>
                                <h5 style="color: #15803d; margin-bottom: 10px;">Demyelinating → Immunotherapy</h5>
                                <p style="color: #166534; font-size: 0.9em;">Often immune-mediated, steroids/IVIG/plasmic exchange, faster recovery</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="showFocusedTab(1, 'pgy2')" 
                                style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; 
                                       border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; 
                                       font-weight: 600; cursor: pointer; margin-right: 15px;">
                            ⚡ Practice NCS Interpretation
                        </button>
                        <button onclick="closeModal()" 
                                style="background: #6b7280; color: white; border: none; padding: 15px 30px; 
                                       border-radius: 10px; font-size: 1.1em; cursor: pointer;">
                            ← Back to Competencies
                        </button>
                    </div>
                </div>
            `;
            showModal('Neuropathy Pathophysiology', content);
        }
        
        function showRadiculopathyNCSProtocols() {
            const content = `
                <div style="max-width: 900px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #4a6d52; margin-bottom: 10px;">⚡ NCS Protocols for Radiculopathy</h2>
                        <p style="color: #6b9f78; font-size: 1.1em;">Level 2 Skills - Why and how we perform NCS for radiculopathy</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Key Principle</h3>
                        <p style="color: #9a3412; font-size: 1.1em; font-weight: 500;">
                            NCS are typically NORMAL in radiculopathy (nerve root lesion is proximal to NCS recording sites). 
                            We perform them to EXCLUDE peripheral nerve disorders that can mimic radiculopathy.
                        </p>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px;">🔍 Why NCS in Suspected Radiculopathy?</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-left: 4px solid #16a34a;">
                                <h5 style="color: #15803d; margin-bottom: 15px;">✅ What NCS Should Show:</h5>
                                <ul style="color: #166534; line-height: 1.6;">
                                    <li>Normal distal latencies</li>
                                    <li>Normal conduction velocities</li>
                                    <li>Normal amplitudes</li>
                                    <li>Normal F-waves (unless severe)</li>
                                </ul>
                            </div>
                            
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; border-left: 4px solid #dc2626;">
                                <h5 style="color: #991b1b; margin-bottom: 15px;">❌ Red Flags (Not Radiculopathy):</h5>
                                <ul style="color: #991b1b; line-height: 1.6;">
                                    <li>Prolonged distal latencies → Entrapment</li>
                                    <li>Slow velocities → Neuropathy</li>
                                    <li>Low amplitudes → Axonal process</li>
                                    <li>Absent responses → Severe nerve damage</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #2563eb; margin-bottom: 20px;">📋 Recommended NCS Protocol</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                            <div>
                                <h5 style="color: #1d4ed8; margin-bottom: 15px; padding: 10px; background: #dbeafe; border-radius: 8px;">
                                    Cervical Radiculopathy
                                </h5>
                                <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                    <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Motor Studies:</p>
                                    <ul style="color: #6b7280; line-height: 1.6; margin-bottom: 15px;">
                                        <li>Median motor (APB)</li>
                                        <li>Ulnar motor (ADM)</li>
                                        <li>Radial motor (EIP) if indicated</li>
                                    </ul>
                                    <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Sensory Studies:</p>
                                    <ul style="color: #6b7280; line-height: 1.6;">
                                        <li>Median sensory</li>
                                        <li>Ulnar sensory</li>
                                        <li>Radial sensory</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div>
                                <h5 style="color: #1d4ed8; margin-bottom: 15px; padding: 10px; background: #dbeafe; border-radius: 8px;">
                                    Lumbar Radiculopathy
                                </h5>
                                <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                    <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Motor Studies:</p>
                                    <ul style="color: #6b7280; line-height: 1.6; margin-bottom: 15px;">
                                        <li>Peroneal motor (EDB)</li>
                                        <li>Tibial motor (AH)</li>
                                        <li>H-reflex (S1 root function)</li>
                                    </ul>
                                    <p style="color: #374151; font-weight: 600; margin-bottom: 10px;">Sensory Studies:</p>
                                    <ul style="color: #6b7280; line-height: 1.6;">
                                        <li>Sural sensory</li>
                                        <li>Superficial peroneal</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #eff6ff; padding: 25px; border-radius: 15px; border: 2px solid #3b82f6;">
                        <h4 style="color: #1d4ed8; margin-bottom: 15px;">🎯 After NCS: Why EMG is Critical</h4>
                        <p style="color: #1e40af; line-height: 1.6; margin-bottom: 15px;">
                            NCS can't detect radiculopathy because the lesion is proximal to where we stimulate. 
                            <strong>EMG needle examination is the key diagnostic tool</strong> because:
                        </p>
                        <ul style="color: #1e40af; line-height: 1.6;">
                            <li><strong>Direct muscle sampling:</strong> Detects denervation in muscles supplied by affected root</li>
                            <li><strong>Myotomal mapping:</strong> Pattern of affected muscles points to specific root level</li>
                            <li><strong>Paraspinal examination:</strong> Most sensitive early finding (muscles innervated directly by root)</li>
                            <li><strong>Timing information:</strong> Acute vs chronic changes help determine prognosis</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="startAnatomyQuiz()" 
                                style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; 
                                       border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; 
                                       font-weight: 600; cursor: pointer; margin-right: 15px;">
                            🧠 Practice EMG Muscle Localization
                        </button>
                        <button onclick="showFocusedTab(1, 'pgy2')" 
                                style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; 
                                       border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; 
                                       font-weight: 600; cursor: pointer; margin-right: 15px;">
                            ⚡ Study NCS Techniques
                        </button>
                        <button onclick="closeModal()" 
                                style="background: #6b7280; color: white; border: none; padding: 15px 30px; 
                                       border-radius: 10px; font-size: 1.1em; cursor: pointer;">
                            ← Back to Competencies
                        </button>
                    </div>
                </div>
            `;
            showModal('NCS Protocols for Radiculopathy', content);
        }
        
        function showNeuropathyNCSProtocols() {
            const content = `
                <div style="max-width: 900px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="color: #4a6d52; margin-bottom: 10px;">⚡ NCS Protocols for Peripheral Neuropathy</h2>
                        <p style="color: #6b9f78; font-size: 1.1em;">Level 2 Skills - Systematic approach to neuropathy evaluation</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #fff7ed, #fed7aa); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h3 style="color: #c2410c; margin-bottom: 15px;">🎯 Key Principle</h3>
                        <p style="color: #9a3412; font-size: 1.1em; font-weight: 500;">
                            NCS are the PRIMARY tool for diagnosing peripheral neuropathy. They detect changes before clinical symptoms 
                            and help classify neuropathy type (axonal vs demyelinating) to guide treatment.
                        </p>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #dc2626; margin-bottom: 20px;">📋 Standard Neuropathy NCS Protocol</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 20px;">
                            <div style="background: #dbeafe; padding: 20px; border-radius: 10px;">
                                <h5 style="color: #1d4ed8; margin-bottom: 15px;">🏃‍♂️ Motor Studies</h5>
                                <ul style="color: #1e40af; line-height: 1.6;">
                                    <li><strong>Median:</strong> Wrist → Elbow stimulation</li>
                                    <li><strong>Ulnar:</strong> Wrist → Below elbow → Above elbow</li>
                                    <li><strong>Peroneal:</strong> Ankle → Fibular head</li>
                                    <li><strong>Tibial:</strong> Ankle stimulation</li>
                                </ul>
                                <p style="color: #1e40af; font-size: 0.9em; margin-top: 10px; font-style: italic;">
                                    Measure: Amplitude, latency, velocity
                                </p>
                            </div>
                            
                            <div style="background: #ecfdf5; padding: 20px; border-radius: 10px;">
                                <h5 style="color: #059669; margin-bottom: 15px;">👋 Sensory Studies</h5>
                                <ul style="color: #047857; line-height: 1.6;">
                                    <li><strong>Median:</strong> Digit 2 or 3 → Wrist</li>
                                    <li><strong>Ulnar:</strong> Digit 5 → Wrist</li>
                                    <li><strong>Radial:</strong> Thumb → Forearm</li>
                                    <li><strong>Sural:</strong> Lateral foot → Calf</li>
                                </ul>
                                <p style="color: #047857; font-size: 0.9em; margin-top: 10px; font-style: italic;">
                                    Most sensitive: Often abnormal first
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                        <h4 style="color: #7c2d12; margin-bottom: 20px;">🔍 Pattern Recognition</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
                            <div style="background: #fef2f2; padding: 20px; border-radius: 10px; text-align: center;">
                                <h5 style="color: #dc2626; margin-bottom: 15px;">Length-Dependent</h5>
                                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                                    <p style="color: #991b1b; font-size: 0.9em;">Sural > Peroneal > Others</p>
                                </div>
                                <p style="color: #6b7280; font-size: 0.8em;">Most common pattern (DM, toxic)</p>
                            </div>
                            
                            <div style="background: #eff6ff; padding: 20px; border-radius: 10px; text-align: center;">
                                <h5 style="color: #2563eb; margin-bottom: 15px;">Multifocal</h5>
                                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                                    <p style="color: #1d4ed8; font-size: 0.9em;">Asymmetric involvement</p>
                                </div>
                                <p style="color: #6b7280; font-size: 0.8em;">Suggests vasculitis, HNPP</p>
                            </div>
                            
                            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; text-align: center;">
                                <h5 style="color: #059669; margin-bottom: 15px;">Uniform</h5>
                                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                                    <p style="color: #047857; font-size: 0.9em;">All nerves equally affected</p>
                                </div>
                                <p style="color: #6b7280; font-size: 0.8em;">Suggests GBS, CIDP, CMT</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #eff6ff; padding: 25px; border-radius: 15px; border: 2px solid #3b82f6;">
                        <h4 style="color: #1d4ed8; margin-bottom: 15px;">🧠 Critical NCS Parameters for Classification</h4>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h5 style="color: #1d4ed8; margin-bottom: 10px;">For Demyelinating Diagnosis Need:</h5>
                                <ul style="color: #1e40af; line-height: 1.6;">
                                    <li>Distal latency >120% of upper limit</li>
                                    <li>CV <75% of lower limit</li>
                                    <li>Conduction block >20%</li>
                                    <li>Temporal dispersion</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h5 style="color: #1d4ed8; margin-bottom: 10px;">For Axonal Pattern:</h5>
                                <ul style="color: #1e40af; line-height: 1.6;">
                                    <li>Reduced CMAP/SNAP amplitudes</li>
                                    <li>Normal/mildly slow velocities</li>
                                    <li>Normal distal latencies</li>
                                    <li>Denervation on EMG</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <button onclick="showFocusedTab(14, 'pgy2')" 
                                style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; 
                                       border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; 
                                       font-weight: 600; cursor: pointer; margin-right: 15px;">
                            🩺 Study Neuropathy Patterns
                        </button>
                        <button onclick="showFocusedTab(1, 'pgy2')" 
                                style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; 
                                       border: none; padding: 15px 30px; border-radius: 10px; font-size: 1.1em; 
                                       font-weight: 600; cursor: pointer; margin-right: 15px;">
                            ⚡ Practice NCS Techniques
                        </button>
                        <button onclick="closeModal()" 
                                style="background: #6b7280; color: white; border: none; padding: 15px 30px; 
                                       border-radius: 10px; font-size: 1.1em; cursor: pointer;">
                            ← Back to Competencies
                        </button>
                    </div>
                </div>
            `;
            showModal('NCS Protocols for Neuropathy', content);
        }

// ================================================
// CANDYLAND LEARNING BOARD SYSTEM
// ================================================

// Learning modules configuration for different PGY levels
const learningModulesConfig = {
    pgy2: [
        { id: 'intro-emg', title: 'EMG/NCS Introduction', icon: '🧠', competency: 'Foundation', description: 'Basic principles and patient care approach', contentId: 'emg-introduction' },
        { id: 'peripheral-anatomy', title: 'Peripheral Anatomy', icon: '🦴', competency: 'Competency 1 & 6', description: 'Brachial and lumbosacral plexus foundations', contentId: 'plexus-anatomy' },
        { id: 'radiculopathy-patho', title: 'Radiculopathy Pathophysiology', icon: '🔬', competency: 'Competency 2 - Level 1', description: 'Understanding nerve root compression', contentId: 'radiculopathy-pathophysiology' },
        { id: 'neuropathy-patho', title: 'Neuropathy Pathophysiology', icon: '⚡', competency: 'Competency 3 - Level 1', description: 'Axonal vs demyelinating processes', contentId: 'neuropathy-pathophysiology' },
        { id: 'ncs-basics', title: 'NCS Fundamentals', icon: '📈', competency: 'Competency 1 - Level 1', description: 'Basic nerve conduction principles', contentId: 'ncs-fundamentals' },
        { id: 'ncs-techniques', title: 'NCS Techniques', icon: '🎯', competency: 'Competency 1 - Level 2', description: 'Proper electrode placement and protocols', contentId: 'ncs-techniques' },
        { id: 'emg-needle-basics', title: 'EMG Needle Techniques', icon: '💉', competency: 'Competency 2 & 3 - Level 2', description: 'Basic needle EMG evaluation', contentId: 'emg-needle-basics' },
        { id: 'muscle-anatomy', title: 'Muscle Localization', icon: '💪', competency: 'Competency 2 & 3', description: 'Interactive muscle anatomy quiz', contentId: 'muscle-quiz' },
        { id: 'basic-patterns', title: 'Basic Pattern Recognition', icon: '👁️', competency: 'Competency 5 - Level 1', description: 'Recognizing abnormal spontaneous activity', contentId: 'basic-patterns' },
        { id: 'neuropathy-myopathy-basics', title: 'Neuropathy vs Myopathy Basics', icon: '⚖️', competency: 'Competency 4 - Level 1', description: 'Basic pathophysiology differences', contentId: 'neuropathy-myopathy-basics' },
        { id: 'simple-reports', title: 'Basic Report Writing', icon: '📝', competency: 'Competency 7 - Level 1', description: 'Understanding report structure', contentId: 'simple-reports' },
        { id: 'clinical-correlation', title: 'Clinical Application', icon: '🩺', competency: 'Integration', description: 'Simple clinical case examples', contentId: 'clinical-correlation' }
    ],
    pgy3: [
        // Include all PGY-2 modules plus additional Level 3 content
        { id: 'intro-emg', title: 'EMG/NCS Introduction', icon: '🧠', competency: 'Foundation', description: 'Basic principles and patient care approach', contentId: 'emg-introduction' },
        { id: 'peripheral-anatomy', title: 'Peripheral Anatomy', icon: '🦴', competency: 'Competency 1 & 6', description: 'Brachial and lumbosacral plexus foundations', contentId: 'plexus-anatomy' },
        { id: 'radiculopathy-patho', title: 'Radiculopathy Pathophysiology', icon: '🔬', competency: 'Competency 2 - Level 1', description: 'Understanding nerve root compression', contentId: 'radiculopathy-pathophysiology' },
        { id: 'neuropathy-patho', title: 'Neuropathy Pathophysiology', icon: '⚡', competency: 'Competency 3 - Level 1', description: 'Axonal vs demyelinating processes', contentId: 'neuropathy-pathophysiology' },
        { id: 'ncs-basics', title: 'NCS Fundamentals', icon: '📈', competency: 'Competency 1 - Level 1', description: 'Basic nerve conduction principles', contentId: 'ncs-fundamentals' },
        { id: 'ncs-techniques', title: 'NCS Techniques', icon: '🎯', competency: 'Competency 1 - Level 2', description: 'Proper electrode placement and protocols', contentId: 'ncs-techniques' },
        { id: 'emg-needle-basics', title: 'EMG Needle Techniques', icon: '💉', competency: 'Competency 2 & 3 - Level 2', description: 'Basic needle EMG evaluation', contentId: 'emg-needle-basics' },
        { id: 'muscle-anatomy', title: 'Muscle Localization', icon: '💪', competency: 'Competency 2 & 3', description: 'Interactive muscle anatomy quiz', contentId: 'muscle-quiz' },
        { id: 'independent-ncs', title: 'Independent NCS Screen', icon: '🔍', competency: 'Competency 1 - Level 3', description: 'Median, ulnar, radial, peroneal, tibial studies', contentId: 'independent-ncs' },
        { id: 'radiculopathy-emg', title: 'Radiculopathy EMG Evaluation', icon: '🎪', competency: 'Competency 2 - Level 3', description: 'Independent EMG evaluation techniques', contentId: 'radiculopathy-emg' },
        { id: 'neuropathy-emg', title: 'Neuropathy EMG Evaluation', icon: '⚡', competency: 'Competency 3 - Level 3', description: 'Independent neuropathy assessment', contentId: 'neuropathy-emg' },
        { id: 'advanced-patterns', title: 'Advanced Pattern Recognition', icon: '🔊', competency: 'Competency 5 - Level 3', description: 'Audio/visual differentiation of discharges', contentId: 'advanced-patterns' },
        { id: 'neuropathy-myopathy-ddx', title: 'Neuropathy vs Myopathy DDx', icon: '🧬', competency: 'Competency 4 - Level 3', description: 'Common condition differentiation', contentId: 'neuropathy-myopathy-ddx' },
        { id: 'plexus-entrapments', title: 'Plexus & Entrapments', icon: '🕸️', competency: 'Competency 6 - Level 3', description: 'Common entrapment syndromes', contentId: 'plexus-entrapments' },
        { id: 'intermediate-reports', title: 'Intermediate Report Writing', icon: '📋', competency: 'Competency 7 - Level 3', description: 'Critical components and DDx ranking', contentId: 'intermediate-reports' },
        { id: 'complex-cases', title: 'Complex Clinical Cases', icon: '🧩', competency: 'Integration', description: 'Multi-competency case studies', contentId: 'complex-cases' }
    ],
    pgy4: [
        // Include all previous modules plus Level 4 content
        { id: 'intro-emg', title: 'EMG/NCS Introduction', icon: '🧠', competency: 'Foundation', description: 'Basic principles and patient care approach', contentId: 'emg-introduction' },
        { id: 'peripheral-anatomy', title: 'Peripheral Anatomy', icon: '🦴', competency: 'Competency 1 & 6', description: 'Brachial and lumbosacral plexus foundations', contentId: 'plexus-anatomy' },
        { id: 'radiculopathy-patho', title: 'Radiculopathy Pathophysiology', icon: '🔬', competency: 'Competency 2 - Level 1', description: 'Understanding nerve root compression', contentId: 'radiculopathy-pathophysiology' },
        { id: 'neuropathy-patho', title: 'Neuropathy Pathophysiology', icon: '⚡', competency: 'Competency 3 - Level 1', description: 'Axonal vs demyelinating processes', contentId: 'neuropathy-pathophysiology' },
        { id: 'ncs-basics', title: 'NCS Fundamentals', icon: '📈', competency: 'Competency 1 - Level 1', description: 'Basic nerve conduction principles', contentId: 'ncs-fundamentals' },
        { id: 'ncs-techniques', title: 'NCS Techniques', icon: '🎯', competency: 'Competency 1 - Level 2', description: 'Proper electrode placement and protocols', contentId: 'ncs-techniques' },
        { id: 'emg-needle-basics', title: 'EMG Needle Techniques', icon: '💉', competency: 'Competency 2 & 3 - Level 2', description: 'Basic needle EMG evaluation', contentId: 'emg-needle-basics' },
        { id: 'muscle-anatomy', title: 'Muscle Localization', icon: '💪', competency: 'Competency 2 & 3', description: 'Interactive muscle anatomy quiz', contentId: 'muscle-quiz' },
        { id: 'independent-ncs', title: 'Independent NCS Screen', icon: '🔍', competency: 'Competency 1 - Level 3', description: 'Median, ulnar, radial, peroneal, tibial studies', contentId: 'independent-ncs' },
        { id: 'radiculopathy-emg', title: 'Radiculopathy EMG Evaluation', icon: '🎪', competency: 'Competency 2 - Level 3', description: 'Independent EMG evaluation techniques', contentId: 'radiculopathy-emg' },
        { id: 'neuropathy-emg', title: 'Neuropathy EMG Evaluation', icon: '⚡', competency: 'Competency 3 - Level 3', description: 'Independent neuropathy assessment', contentId: 'neuropathy-emg' },
        { id: 'advanced-patterns', title: 'Advanced Pattern Recognition', icon: '🔊', competency: 'Competency 5 - Level 3', description: 'Audio/visual differentiation of discharges', contentId: 'advanced-patterns' },
        { id: 'neuropathy-myopathy-ddx', title: 'Neuropathy vs Myopathy DDx', icon: '🧬', competency: 'Competency 4 - Level 3', description: 'Common condition differentiation', contentId: 'neuropathy-myopathy-ddx' },
        { id: 'plexus-entrapments', title: 'Plexus & Entrapments', icon: '🕸️', competency: 'Competency 6 - Level 3', description: 'Common entrapment syndromes', contentId: 'plexus-entrapments' },
        { id: 'intermediate-reports', title: 'Intermediate Report Writing', icon: '📋', competency: 'Competency 7 - Level 3', description: 'Critical components and DDx ranking', contentId: 'intermediate-reports' },
        { id: 'advanced-ncs', title: 'Advanced NCS Studies', icon: '🔬', competency: 'Competency 1 - Level 4', description: 'Blink reflex, repetitive stim, proximal conduction', contentId: 'advanced-ncs' },
        { id: 'complete-radiculopathy', title: 'Complete Radiculopathy Assessment', icon: '📊', competency: 'Competency 2 - Level 4', description: 'Independent NCS/EMG evaluation', contentId: 'complete-radiculopathy' },
        { id: 'complete-neuropathy', title: 'Complete Neuropathy Assessment', icon: '⚡', competency: 'Competency 3 - Level 4', description: 'Independent comprehensive evaluation', contentId: 'complete-neuropathy' },
        { id: 'neuropathy-myopathy-findings', title: 'Specific EMG Findings', icon: '🔍', competency: 'Competency 4 - Level 4', description: 'Specific EMG findings for conditions', contentId: 'neuropathy-myopathy-findings' },
        { id: 'discharge-ddx', title: 'Discharge Pattern DDx', icon: '🎵', competency: 'Competency 5 - Level 4', description: 'DDx for abnormal spontaneous activity', contentId: 'discharge-ddx' },
        { id: 'plexus-ddx', title: 'Plexus DDx & Findings', icon: '🧠', competency: 'Competency 6 - Level 4', description: 'Common DDx for EDx findings', contentId: 'plexus-ddx' },
        { id: 'advanced-reports', title: 'Advanced Report Writing', icon: '📄', competency: 'Competency 7 - Level 4', description: 'DDx ranking and clinical integration', contentId: 'advanced-reports' },
        { id: 'teaching-prep', title: 'Teaching Preparation', icon: '🎓', competency: 'Leadership', description: 'Preparing to teach junior residents', contentId: 'teaching-prep' },
        { id: 'consultant-cases', title: 'Consultant-Level Cases', icon: '👨‍⚕️', competency: 'Mastery', description: 'Complex multi-system cases', contentId: 'consultant-cases' }
    ]
};

// Current system state - use existing global variables if available
if (typeof window.currentPGYLevel === 'undefined') {
    window.currentPGYLevel = null;
}
if (typeof window.currentModuleIndex === 'undefined') {
    window.currentModuleIndex = 0;
}
if (typeof window.completedModules === 'undefined') {
    window.completedModules = new Set();
}
let currentPage = 'pgy-selection';

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLearningBoard();
});

// Initialize the learning board system
function initializeLearningBoard() {
    // Load saved progress from localStorage
    loadProgress();
    
    // Show appropriate page
    if (currentPGYLevel && localStorage.getItem('emg-pgy-level')) {
        showLearningBoard(currentPGYLevel);
    } else {
        showPGYSelection();
    }
}

// PGY Level Selection Functions
function selectPGYLevel(pgyLevel) {
    currentPGYLevel = pgyLevel;
    currentModuleIndex = 0;
    
    // Save PGY level to localStorage
    localStorage.setItem('emg-pgy-level', pgyLevel);
    
    // Show the learning board with smooth transition
    transitionToPage('learning-board-page', () => {
        generateLearningBoard(pgyLevel);
        updateBoardHeader(pgyLevel);
    });
}

function showPGYSelection() {
    currentPage = 'pgy-selection';
    transitionToPage('pgy-selection-page');
}

// Page Transition Functions
function transitionToPage(targetPageId, callback) {
    const currentPageElement = document.querySelector('.page-container.active');
    const targetPageElement = document.getElementById(targetPageId);
    
    if (currentPageElement) {
        currentPageElement.classList.add('page-transition-exit');
        
        setTimeout(() => {
            currentPageElement.classList.remove('active', 'page-transition-exit');
        }, 300);
    }
    
    setTimeout(() => {
        targetPageElement.classList.add('active', 'page-transition-enter');
        
        if (callback) callback();
        
        setTimeout(() => {
            targetPageElement.classList.remove('page-transition-enter');
        }, 500);
    }, 300);
}

// Learning Board Generation
function generateLearningBoard(pgyLevel) {
    const boardContainer = document.getElementById('learning-board');
    const modules = learningModulesConfig[pgyLevel];
    
    // Calculate the height needed for the path based on number of modules
    const pathHeight = Math.max(800, (modules.length * 100) + 400);
    
    boardContainer.innerHTML = `
        <div class="learning-path" style="min-height: ${pathHeight}px;">
            <div class="learning-modules">
                ${modules.map((module, index) => generateModuleSquare(module, index)).join('')}
            </div>
            <div class="ernest-character idle" id="ernest-character"></div>
        </div>
    `;
    
    currentPage = 'learning-board';
    
    // Position ERNEST on the current module after a brief delay
    setTimeout(() => {
        positionErnest();
        showErnestWelcomeMessage();
    }, 500);
}

function generateModuleSquare(module, index) {
    const isCompleted = completedModules.has(module.id);
    const isCurrent = index === currentModuleIndex && !isCompleted;
    const isAvailable = index <= currentModuleIndex && !isCompleted;
    const isLocked = index > currentModuleIndex && !isCompleted;
    
    let statusClass = '';
    
    if (isCompleted) {
        statusClass = 'completed';
    } else if (isCurrent) {
        statusClass = 'current';
    } else if (isAvailable) {
        statusClass = 'available';
    } else {
        statusClass = 'locked';
    }
    
    const isClickable = !isLocked;
    const clickHandler = isClickable ? `navigateToModule(${index})` : '';
    
    return `
        <div class="module-square ${statusClass}" onclick="${clickHandler}" data-module-index="${index}" data-module-id="${module.id}">
            <div class="module-icon">${module.icon}</div>
            <div class="module-title">${module.title}</div>
            <div class="module-competency">${module.competency}</div>
        </div>
    `;
}

function updateBoardHeader(pgyLevel) {
    const boardTitle = document.getElementById('board-pgy-title');
    const progressDisplay = document.getElementById('progress-display');
    const modules = learningModulesConfig[pgyLevel];
    
    const pgyNames = {
        'pgy2': 'PGY-2 Foundation Journey',
        'pgy3': 'PGY-3 Development Journey', 
        'pgy4': 'PGY-4 Mastery Journey'
    };
    
    boardTitle.textContent = `🧠 ${pgyNames[pgyLevel]}`;
    progressDisplay.textContent = `Progress: ${completedModules.size}/${modules.length} Modules`;
}

// Module Navigation Functions
function openModule(moduleId, moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules.find(m => m.id === moduleId);
    
    if (!module) return;
    
    // Update module page content
    document.getElementById('module-title').textContent = module.title;
    document.getElementById('module-subtitle').textContent = module.competency;
    
    // Load module content based on contentId
    loadModuleContent(module.contentId);
    
    // Transition to module page
    transitionToPage('module-page');
    currentPage = 'module';
}

function loadModuleContent(contentId) {
    const moduleContent = document.getElementById('module-content');
    
    // Map content IDs to existing content sections
    const contentMapping = {
        'emg-introduction': () => showExistingContent('header'),
        'plexus-anatomy': () => showPlexusContent(),
        'radiculopathy-pathophysiology': () => showRadiculopathyPathophysiology(),
        'neuropathy-pathophysiology': () => showNeuropathyPathophysiology(),
        'ncs-fundamentals': () => showExistingContent('ncs-section'),
        'ncs-techniques': () => showExistingContent('ncs-techniques-section'),
        'muscle-quiz': () => showMuscleQuiz(),
        'basic-patterns': () => showExistingContent('emg-waveforms'),
        'simple-reports': () => showExistingContent('emg-reports'),
        'clinical-correlation': () => showExistingContent('diagnosis-reference')
    };
    
    if (contentMapping[contentId]) {
        contentMapping[contentId]();
    } else {
        // Default content for modules not yet implemented
        moduleContent.innerHTML = `
            <div class="module-placeholder">
                <h3>🚧 Content Coming Soon</h3>
                <p>This module is being developed and will be available soon.</p>
                <p><strong>Learning Objectives:</strong></p>
                <ul>
                    <li>Master the core concepts for this competency level</li>
                    <li>Practice hands-on skills and techniques</li>
                    <li>Complete assessment exercises</li>
                    <li>Apply knowledge to clinical scenarios</li>
                </ul>
                <button class="complete-module-btn" onclick="completeModule('${contentId}')">
                    Mark as Complete
                </button>
            </div>
        `;
    }
}

function showExistingContent(sectionId) {
    const moduleContent = document.getElementById('module-content');
    const existingContent = document.querySelector(`#${sectionId}, .${sectionId}`);
    
    if (existingContent) {
        moduleContent.innerHTML = existingContent.outerHTML;
    } else {
        moduleContent.innerHTML = `
            <div class="content-placeholder">
                <h3>📚 Learning Content</h3>
                <p>This module integrates with existing educational content.</p>
                <button class="complete-module-btn" onclick="completeCurrentModule()">
                    Mark as Complete
                </button>
            </div>
        `;
    }
}

// ================================================
// ERNEST CHARACTER SYSTEM
// ================================================

// Navigate to a specific module (allows clicking any accessible square)
function navigateToModule(targetIndex) {
    if (targetIndex > currentModuleIndex && !completedModules.has(learningModulesConfig[currentPGYLevel][targetIndex].id)) {
        // Module is locked
        return;
    }
    
    const previousIndex = currentModuleIndex;
    
    // If jumping to a previous completed module, just show it
    if (targetIndex < currentModuleIndex || completedModules.has(learningModulesConfig[currentPGYLevel][targetIndex].id)) {
        currentModuleIndex = targetIndex;
        
        // Animate ERNEST to the target module
        animateErnestToModule(targetIndex, previousIndex);
        
        // Show module description after ERNEST arrives
        setTimeout(() => {
            showModuleDescription(targetIndex);
        }, 1000);
    } else if (targetIndex === currentModuleIndex) {
        // Already at this module, just show description
        showModuleDescription(targetIndex);
    }
}

// Animate ERNEST moving to any module (forward or backward)
function animateErnestToModule(targetIndex, fromIndex) {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    // Determine direction and animation
    const isBackward = targetIndex < fromIndex;
    const animationClass = isBackward ? 'hopping-backward' : 'hopping';
    
    ernst.classList.remove('idle', 'celebrating', 'hopping', 'hopping-backward');
    ernst.classList.add(animationClass);
    
    // Position ERNEST on the target module after animation
    setTimeout(() => {
        positionErnest();
        ernst.classList.remove(animationClass);
        ernst.classList.add('idle');
    }, 800);
}

// Position ERNEST on the current learning module
function positionErnest() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    const modules = learningModulesConfig[currentPGYLevel];
    if (!modules || modules.length === 0) return;
    
    // Find the current module square
    const currentModuleSquares = document.querySelectorAll('.module-square');
    const targetIndex = Math.min(currentModuleIndex, currentModuleSquares.length - 1);
    const targetSquare = currentModuleSquares[targetIndex];
    
    if (!targetSquare) return;
    
    // Remove previous ernest positioning
    document.querySelectorAll('.module-square').forEach(square => {
        square.classList.remove('has-ernest');
    });
    
    // Add ernest to current module
    targetSquare.classList.add('has-ernest');
    
    // Calculate position relative to the learning board
    const boardRect = document.querySelector('.learning-path').getBoundingClientRect();
    const squareRect = targetSquare.getBoundingClientRect();
    
    // Position ERNEST on top-center of the module square
    const ernestX = (squareRect.left - boardRect.left) + (squareRect.width / 2) - 30;
    const ernestY = (squareRect.top - boardRect.top) - 20;
    
    ernst.style.left = `${ernestX}px`;
    ernst.style.top = `${ernestY}px`;
}

// Animate ERNEST hopping to next module
function moveErnestToNextModule() {
    const ernst = document.getElementById('ernst-character');
    if (!ernst) return;
    
    // Add hopping animation
    ernst.classList.remove('idle', 'celebrating');
    ernst.classList.add('hopping');
    
    // Position on new module after hop animation
    setTimeout(() => {
        positionErnest();
        ernst.classList.remove('hopping');
        ernst.classList.add('celebrating');
        
        // Return to idle after celebration
        setTimeout(() => {
            ernst.classList.remove('celebrating');
            ernst.classList.add('idle');
        }, 1500);
    }, 800);
}

// Show ERNEST's welcome message
function showErnestWelcomeMessage() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    const messages = [
        "Ready to learn EMG? Let's go!",
        "I'm here to guide your journey!",
        "Next module awaits!",
        "Great progress so far!",
        "You've got this!",
        "EMG mastery incoming!",
        "Let's tackle this together!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showErnestSpeechBubble(randomMessage, 3000);
}

// Show ERNEST's speech bubble with custom message
function showErnestSpeechBubble(message, duration = 2000) {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    // Remove existing speech bubble
    const existingBubble = ernst.querySelector('.ernest-speech-bubble');
    if (existingBubble) {
        existingBubble.remove();
    }
    
    // Create new speech bubble
    const bubble = document.createElement('div');
    bubble.className = 'ernest-speech-bubble';
    bubble.textContent = message;
    
    ernst.appendChild(bubble);
    
    // Show bubble with animation
    setTimeout(() => {
        bubble.classList.add('show');
    }, 100);
    
    // Hide bubble after duration
    setTimeout(() => {
        bubble.classList.remove('show');
        setTimeout(() => {
            bubble.remove();
        }, 300);
    }, duration);
}

// Show module description with ERNEST's explanation and GO button
function showModuleDescription(moduleIndex) {
    const modules = learningModulesConfig[currentPGYLevel];
    const module = modules[moduleIndex];
    if (!module) return;
    
    const targetSquare = document.querySelectorAll('.module-square')[moduleIndex];
    if (!targetSquare) return;
    
    // Remove any existing description boxes
    document.querySelectorAll('.ernest-description-box').forEach(box => box.remove());
    
    // Create description box
    const descriptionBox = document.createElement('div');
    descriptionBox.className = 'ernest-description-box';
    descriptionBox.innerHTML = `
        <h4>${module.title}</h4>
        <p>${getModuleDescription(module)}</p>
        <button class="ernest-go-button" onclick="openModule('${module.id}', ${moduleIndex})">
            🚀 Let's Go!
        </button>
    `;
    
    targetSquare.appendChild(descriptionBox);
    
    // Show the description box
    setTimeout(() => {
        descriptionBox.classList.add('show');
    }, 100);
    
    // Hide description after 5 seconds if no interaction
    setTimeout(() => {
        if (descriptionBox.parentNode) {
            descriptionBox.classList.remove('show');
            setTimeout(() => {
                if (descriptionBox.parentNode) {
                    descriptionBox.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Get detailed module description for ERNEST to explain
function getModuleDescription(module) {
    const descriptions = {
        'intro-emg': 'Start your EMG journey with fundamental principles and patient care approaches. Perfect foundation for beginners!',
        'peripheral-anatomy': 'Master the brachial and lumbosacral plexus anatomy with interactive diagrams and tracing exercises.',
        'radiculopathy-patho': 'Understand how nerve root compression causes symptoms and why EMG helps with diagnosis.',
        'neuropathy-patho': 'Learn the difference between axonal and demyelinating nerve damage patterns.',
        'ncs-basics': 'Master the fundamental principles of nerve conduction studies and electrode placement.',
        'ncs-techniques': 'Practice proper NCS techniques for all major nerves with video demonstrations.',
        'emg-needle-basics': 'Learn safe and effective needle EMG evaluation techniques with hands-on practice.',
        'muscle-anatomy': 'Test your knowledge of muscle localization and innervation patterns with interactive quizzes.',
        'basic-patterns': 'Recognize abnormal spontaneous EMG activity and understand what it means clinically.',
        'neuropathy-myopathy-basics': 'Understand the key differences between nerve and muscle diseases.',
        'simple-reports': 'Learn how to write clear, professional EMG reports that help referring physicians.',
        'clinical-correlation': 'Apply your EMG knowledge to real clinical cases and scenarios.',
        'independent-ncs': 'Perform independent nerve conduction screens for major nerves confidently.',
        'radiculopathy-emg': 'Master independent EMG evaluation techniques for diagnosing radiculopathy.',
        'neuropathy-emg': 'Develop skills in comprehensive neuropathy assessment using EMG.',
        'advanced-patterns': 'Distinguish between fibrillations, fasciculations, and other discharge patterns.',
        'neuropathy-myopathy-ddx': 'Master the differential diagnosis between nerve and muscle conditions.',
        'plexus-entrapments': 'Learn about common entrapment syndromes and their EMG findings.',
        'intermediate-reports': 'Write comprehensive reports with differential diagnosis ranking.',
        'complex-cases': 'Tackle challenging multi-system cases requiring integrated knowledge.',
        'advanced-ncs': 'Master advanced techniques like blink reflex and repetitive stimulation.',
        'complete-radiculopathy': 'Achieve complete independence in radiculopathy evaluation.',
        'complete-neuropathy': 'Master comprehensive neuropathy assessment and reporting.',
        'consultant-cases': 'Handle the most complex cases like a seasoned consultant.'
    };
    
    return descriptions[module.id] || 'Advance your EMG skills with this important learning module!';
}

// ERNEST celebrates module completion
function ernestCelebration() {
    const ernst = document.getElementById('ernest-character');
    if (!ernst) return;
    
    ernst.classList.remove('idle', 'hopping');
    ernst.classList.add('celebrating');
    
    const celebrationMessages = [
        "Excellent work!",
        "Module complete! 🎉",
        "You're a pro!",
        "Outstanding progress!",
        "Keep it up!",
        "Fantastic job!",
        "You're mastering EMG!"
    ];
    
    const message = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
    showErnestSpeechBubble(message, 2000);
    
    // Return to idle after celebration
    setTimeout(() => {
        ernst.classList.remove('celebrating');
        ernst.classList.add('idle');
    }, 1500);
}

// Progress Management Functions
function completeCurrentModule() {
    const modules = learningModulesConfig[currentPGYLevel];
    const currentModule = modules[currentModuleIndex];
    if (currentModule) {
        completeModule(currentModule.id);
    }
}

function completeModule(moduleId) {
    completedModules.add(moduleId);
    
    // Advance to next module if this was the current one
    const modules = learningModulesConfig[currentPGYLevel];
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    
    const wasCurrentModule = moduleIndex === currentModuleIndex;
    
    if (wasCurrentModule) {
        currentModuleIndex = Math.min(currentModuleIndex + 1, modules.length - 1);
    }
    
    // Save progress
    saveProgress();
    
    // ERNEST celebration and movement
    if (wasCurrentModule) {
        ernestCelebration();
        
        // If there's a next module, ERNEST will hop to it
        if (currentModuleIndex < modules.length - 1) {
            setTimeout(() => {
                moveErnestToNextModule();
            }, 2000);
        }
    }
    
    // Show success message and return to board
    showCompletionMessage(() => {
        returnToBoard();
    });
}

function showCompletionMessage(callback) {
    const moduleContent = document.getElementById('module-content');
    moduleContent.innerHTML = `
        <div class="completion-message">
            <div class="completion-icon">🎉</div>
            <h3>Module Complete!</h3>
            <p>Great job! You've successfully completed this learning module.</p>
            <button class="return-to-board-btn" onclick="${callback.name}()">
                Return to Learning Board
            </button>
        </div>
    `;
}

// Navigation Functions
function returnToBoard() {
    transitionToPage('learning-board-page', () => {
        generateLearningBoard(currentPGYLevel);
        updateBoardHeader(currentPGYLevel);
        
        // Re-position ERNEST after the board is regenerated
        setTimeout(() => {
            positionErnest();
        }, 100);
    });
}

function showPGYSelection() {
    currentPGYLevel = null;
    localStorage.removeItem('emg-pgy-level');
    transitionToPage('pgy-selection-page');
}

// Progress Persistence Functions
function saveProgress() {
    const progressData = {
        pgyLevel: currentPGYLevel,
        moduleIndex: currentModuleIndex,
        completedModules: Array.from(completedModules),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('emg-learning-progress', JSON.stringify(progressData));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('emg-learning-progress');
    const savedPGY = localStorage.getItem('emg-pgy-level');
    
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentPGYLevel = progress.pgyLevel || savedPGY;
        currentModuleIndex = progress.moduleIndex || 0;
        completedModules = new Set(progress.completedModules || []);
    } else if (savedPGY) {
        currentPGYLevel = savedPGY;
    }
}

// Integration with Existing Content Functions
function showPlexusContent() {
    const moduleContent = document.getElementById('module-content');
    const plexusSection = document.querySelector('.plexus-anatomy-section');
    
    if (plexusSection) {
        moduleContent.innerHTML = plexusSection.outerHTML;
    } else {
        moduleContent.innerHTML = `
            <div class="plexus-module">
                <h3>🦴 Interactive Plexus Anatomy</h3>
                <p>Master brachial and lumbosacral plexus anatomy through interactive learning.</p>
                <button class="launch-plexus-btn" onclick="launchPlexusDiagram()">
                    🚀 Launch Interactive Plexus
                </button>
                <button class="complete-module-btn" onclick="completeCurrentModule()">
                    Mark as Complete
                </button>
            </div>
        `;
    }
}

function launchPlexusDiagram() {
    // Integration with existing plexus content
    transitionToPage('main-interface-container', () => {
        showFocusedTab(4, currentPGYLevel); // Assuming plexus is tab 4
    });
}

function showMuscleQuiz() {
    const moduleContent = document.getElementById('module-content');
    moduleContent.innerHTML = `
        <div class="muscle-quiz-module">
            <h3>💪 Muscle Localization Quiz</h3>
            <p>Test your knowledge of muscle anatomy and innervation patterns.</p>
            <button class="launch-quiz-btn" onclick="launchMuscleQuiz()">
                🎯 Start Muscle Quiz
            </button>
            <button class="complete-module-btn" onclick="completeCurrentModule()">
                Mark as Complete
            </button>
        </div>
    `;
}

function launchMuscleQuiz() {
    // Integration with existing muscle quiz
    transitionToPage('main-interface-container', () => {
        showFocusedTab(0, currentPGYLevel); // Assuming muscle quiz is tab 0
    });
}

// Utility Functions
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        completedModules.clear();
        currentModuleIndex = 0;
        localStorage.removeItem('emg-learning-progress');
        
        if (currentPGYLevel) {
            generateLearningBoard(currentPGYLevel);
            updateBoardHeader(currentPGYLevel);
        }
    }
}

// Window resize handler to reposition ERNEST
window.addEventListener('resize', () => {
    if (currentPage === 'learning-board' && document.getElementById('ernest-character')) {
        setTimeout(positionErnest, 100);
    }
});

// Export functions for global access
window.selectPGYLevel = selectPGYLevel;
window.showPGYSelection = showPGYSelection;
window.returnToBoard = returnToBoard;
window.openModule = openModule;
window.completeCurrentModule = completeCurrentModule;
window.completeModule = completeModule;
window.resetProgress = resetProgress;
window.launchPlexusDiagram = launchPlexusDiagram;
window.launchMuscleQuiz = launchMuscleQuiz;

// New Candyland Board functions
window.navigateToModule = navigateToModule;
window.showModuleDescription = showModuleDescription;
window.animateErnestToModule = animateErnestToModule;

// ERNEST functions
window.positionErnest = positionErnest;
window.moveErnestToNextModule = moveErnestToNextModule;
window.ernestCelebration = ernestCelebration;
window.showErnestSpeechBubble = showErnestSpeechBubble;

// ================================================
// END OF CANDYLAND LEARNING BOARD SYSTEM
// ================================================
