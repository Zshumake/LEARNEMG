
        <!-- Shared Quiz Utility Functions (Replaced by src/modules/quiz/QuizSystem.js) -->
    


        // Get muscle image path helper - Global utility function
        function getMuscleImagePath(muscleKey) {
            const imageMap = {
                'APB': 'images/muscles/Abductor Pollicus Brevis.png',
                'Bicep': 'images/muscles/Biceps.png',
                'EIP': 'images/muscles/Extensor Indicus.png',
                'FDI': 'images/muscles/First Dorsal Interosseous.png',
                'Middle Deltoid': 'images/muscles/Deltoid.png',
                'PT': 'images/muscles/Pronator teres.png',
                'Tricep': 'images/muscles/Triceps.png',
                'Extensor Hallucis': 'images/muscles/Extensor Hallucis longus.png',
                'Medial Gastroc': 'images/muscles/Medial Gastroc.png',
                'Peroneus Longus': 'images/muscles/Fibularis longus.png',
                'Tibialis Ant': 'images/muscles/Tibialis Anterior.png',
                'Tibialis Post': 'images/muscles/Tibialis Posterior.png',
                'Vastus Lateralis': 'images/muscles/Vastus Lateralis.png'
            };
            return imageMap[muscleKey] || null;
        }
        window.getMuscleImagePath = getMuscleImagePath;
    


        // Comprehensive iOS crash tracking
        // Check if isIOS already exists to prevent duplicate declaration
        if (typeof isIOS === 'undefined') {
            window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        }

        if (window.isIOS) {
            console.warn('📱 iOS DETECTED - Enhanced crash tracking enabled');

            // Track memory if available
            if (performance.memory) {
                setInterval(() => {
                    const mem = performance.memory;
                    const usedMB = (mem.usedJSHeapSize / 1048576).toFixed(2);
                    const totalMB = (mem.totalJSHeapSize / 1048576).toFixed(2);
                    const limitMB = (mem.jsHeapSizeLimit / 1048576).toFixed(2);
                    const percentUsed = ((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100).toFixed(1);

                    console.log(`💾 Memory: ${usedMB}MB / ${limitMB}MB (${percentUsed}%)`);

                    if (percentUsed > 90) {
                        console.error('🚨 MEMORY CRITICAL: ' + percentUsed + '%');
                    }
                }, 2000);
            }

            // Track zoom level changes
            let lastZoom = window.visualViewport ? window.visualViewport.scale : 1;
            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', () => {
                    const currentZoom = window.visualViewport.scale;
                    if (currentZoom !== lastZoom) {
                        console.warn('🔍 ZOOM CHANGED:', {
                            from: lastZoom.toFixed(2),
                            to: currentZoom.toFixed(2),
                            width: window.visualViewport.width,
                            height: window.visualViewport.height
                        });
                        lastZoom = currentZoom;
                    }
                });
            }

            // Track visible content size
            const trackVisibleContent = () => {
                const modalBody = document.getElementById('modal-body');
                if (modalBody) {
                    const rect = modalBody.getBoundingClientRect();
                    const contentSize = modalBody.innerHTML.length;
                    console.log('📏 Visible modal:', {
                        width: rect.width.toFixed(0),
                        height: rect.height.toFixed(0),
                        contentBytes: contentSize,
                        scrollHeight: modalBody.scrollHeight
                    });
                }
            };

            // Track every 5 seconds
            setInterval(trackVisibleContent, 5000);
        }

        // Minimal crash tracking
        window.addEventListener('beforeunload', function (e) {
            console.error('⚠️ PAGE UNLOAD - Something triggered navigation away from page');
        });

        window.addEventListener('pagehide', function (e) {
            console.error('⚠️ PAGE HIDE - Page is being hidden/closed');
        });

        // Note: window.startAtriumJourney is now defined in the <head> section for immediate availability

        // Local Storage Functions
        function saveProgressToStorage() {
            const progressData = {
                currentPGYLevel: window.currentPGYLevel,
                completedModules: Array.from(window.completedModules),
                currentModuleIndex: window.currentModuleIndex,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('ernestEMGProgress', JSON.stringify(progressData));
        }

        function loadProgressFromStorage() {
            const saved = localStorage.getItem('ernestEMGProgress');
            if (saved) {
                try {
                    const progressData = JSON.parse(saved);
                    window.currentPGYLevel = progressData.currentPGYLevel;
                    window.completedModules = new Set(progressData.completedModules || []);
                    window.currentModuleIndex = progressData.currentModuleIndex || 0;
                    console.log('✅ Progress loaded from storage');
                    return true;
                } catch (error) {
                    console.log('⚠️ Error loading progress:', error);
                    return false;
                }
            }
            return false;
        }


        // Unified journey interface
        function startJourney() {
            console.log(`🚀 Starting Modular EMG/NCS Learning Journey`);

            // Try to load state (completed modules)
            loadProgressFromStorage();

            // Show learning board
            const pgySelection = document.getElementById('pgy-selection');
            if (pgySelection) pgySelection.classList.add('hidden');

            document.getElementById('learning-board').classList.remove('hidden');

            // Generate the unified journey board
            if (window.appComponents && window.appComponents.candyland) {
                window.appComponents.candyland.generateLearningBoard('all');
            } else if (typeof generateLearningBoard === 'function') {
                generateLearningBoard('all');
            }

            console.log('📚 Journey ready - click any module to begin learning!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }



        // Launch learning module via unified system
        function startLearningModule(moduleIndex) {
            console.log('🔍 Launching module:', moduleIndex);

            if (window.appComponents && window.appComponents.modal) {
                // Get module data from global config (populated by CandylandCore/Initializers)
                const config = window.learningModulesConfig || {};
                const pgyLevel = window.currentPGYLevel || 'pgy2';
                const modules = config[pgyLevel] || config['all'] || [];
                const module = modules[moduleIndex];

                if (module) {
                    window.appComponents.modal.showLearningModal(module, moduleIndex, pgyLevel);
                } else {
                    console.error("❌ Module not found for index:", moduleIndex);
                }
                return;
            }

            console.error('❌ Modal System not initialized');
        }

        // Global exports for legacy compatibility
        window.startLearningModule = startLearningModule;

        // Redirect legacy calls to new system
        window.showEnhancedLearningModal = (module, index) => {
            if (window.appComponents?.modal) {
                window.appComponents.modal.showLearningModal(module, index, window.currentPGYLevel);
            }
        };
        window.closeEnhancedModal = (index) => {
            if (window.appComponents?.modal) window.appComponents.modal.closeModal(index);
        };
        window.completeEnhancedModule = (index) => {
            if (window.appComponents?.modal) window.appComponents.modal.completeModule(index);
        };

        // Override showErnestDialogue to use our modal system instead
        window.showErnestDialogue = function (moduleIndex) {
            startLearningModule(moduleIndex);
        };

        // Disable old Ernest dialogue system
        window.closeErnestDialogue = function () { };

        // Initialize modal flag
        window.isModalOpen = false;

        // Global functions for nerve navigation (moved from modal content)
        window.showNerveType = function (nerveType) {
            console.log('🔍 DEBUG: showNerveType called with:', nerveType);
            // Hide all nerve content sections
            document.querySelectorAll('.nerve-content').forEach(section => {
                section.style.display = 'none';
            });

            // Show selected nerve content
            const selectedContent = document.getElementById(nerveType + '-content');
            if (selectedContent) {
                selectedContent.style.display = 'block';
                console.log('✅ DEBUG: Showing content for:', nerveType);
            } else {
                console.log('❌ DEBUG: Content not found for:', nerveType);
            }

            // Update nerve type button styles
            document.querySelectorAll('.nerve-type-btn').forEach(btn => {
                btn.style.background = '#f8fafc';
                btn.style.border = '2px solid #e2e8f0';
                btn.style.color = '#64748b';
            });

            // Highlight active nerve type button
            const activeBtn = document.querySelector('[data-nerve="' + nerveType + '"]');
            if (activeBtn) {
                if (nerveType === 'overview') {
                    activeBtn.style.background = '#fef3c7';
                    activeBtn.style.border = '2px solid #f59e0b';
                    activeBtn.style.color = '#d97706';
                } else {
                    activeBtn.style.background = 'white';
                    activeBtn.style.border = '3px solid #3b82f6';
                    activeBtn.style.color = '#1e40af';
                }
                console.log('✅ DEBUG: Highlighted button for:', nerveType);
            }
        };

        window.showMedianSection = function (sectionId) {
            console.log('🔍 DEBUG: showMedianSection called with:', sectionId);
            // Hide all median sections
            document.querySelectorAll('.median-section').forEach(section => {
                section.style.display = 'none';
            });

            // Show selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.style.display = 'block';
                console.log('✅ DEBUG: Showing median section:', sectionId);
            }

            // Update button styles within median content
            const medianContent = document.getElementById('median-content');
            if (medianContent) {
                medianContent.querySelectorAll('.nerve-nav-btn').forEach(btn => {
                    btn.style.background = '#f8fafc';
                    btn.style.border = '2px solid #e2e8f0';
                    btn.querySelectorAll('h5, p').forEach(el => el.style.color = '#64748b');
                });

                // Highlight active button
                const activeBtn = medianContent.querySelector('[data-section="' + sectionId + '"]');
                if (activeBtn) {
                    activeBtn.style.background = 'white';
                    activeBtn.style.border = '3px solid #3b82f6';
                    activeBtn.querySelectorAll('h5').forEach(el => el.style.color = '#1e40af');
                }
            }
        };

        window.showUlnarSection = function (sectionId) {
            console.log('🔍 DEBUG: showUlnarSection called with:', sectionId);
            // Hide all ulnar sections
            document.querySelectorAll('.ulnar-section').forEach(section => {
                section.style.display = 'none';
            });

            // Show selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.style.display = 'block';
                console.log('✅ DEBUG: Showing ulnar section:', sectionId);
            }

            // Update ulnar button styles within ulnar content
            const ulnarContent = document.getElementById('ulnar-content');
            if (ulnarContent) {
                ulnarContent.querySelectorAll('.nerve-nav-btn').forEach(btn => {
                    btn.style.background = '#f8fafc';
                    btn.style.border = '2px solid #e2e8f0';
                    btn.querySelectorAll('h5, p').forEach(el => el.style.color = '#64748b');
                });

                // Highlight active button
                const activeBtn = ulnarContent.querySelector('[data-section="' + sectionId + '"]');
                if (activeBtn) {
                    activeBtn.style.background = 'white';
                    activeBtn.style.border = '3px solid #3b82f6';
                    activeBtn.querySelectorAll('h5').forEach(el => el.style.color = '#1e40af');
                }
            }
        };

        // Global quiz function for median nerve content
        window.checkMedianAnswer = function (button, isCorrect) {
            console.log('🔍 DEBUG: checkMedianAnswer called with isCorrect:', isCorrect);
            const buttons = button.parentNode.querySelectorAll('.quiz-option');
            buttons.forEach(btn => btn.style.pointerEvents = 'none');

            if (isCorrect) {
                button.style.background = '#dcfce7';
                button.style.border = '2px solid #059669';
                button.style.color = '#059669';
                button.innerHTML += ' ✓ Correct! Normal thenar sensation (palmar cutaneous branch) localizes to carpal tunnel.';
            } else {
                button.style.background = '#fef2f2';
                button.style.border = '2px solid #dc2626';
                button.style.color = '#dc2626';
                button.innerHTML += ' ✗';
            }
        };

        // Pathway Explorer Global Functions
        window.pathwayExplorer = window.pathwayExplorer || {};
        window.pathwayExplorer.currentNerve = null;
        window.pathwayExplorer.currentStep = 0;
        window.pathwayExplorer.maxSteps = 0;

        window.pathwayExplorer.nerveData = {
            median: {
                name: "Median Nerve",
                roots: "C6-T1",
                image: "Nerve Paths/Median Nerve.png",
                story: "The Median Messenger starts his epic journey at the bustling Brachial Plexus Central Station (C6-T1), where lateral and medial cords shake hands to form our hero. He travels down the arm like a VIP, riding the bicipital groove limousine between the Biceps and Brachialis neighborhoods. At the Cubital Fossa rest stop, he takes a breather medial to the brachial artery before squeezing through the narrow Pronator Teres tunnel. His faithful sidekick, the Anterior Interosseous branch, splits off to handle the deep muscle work while our main character continues toward his final destination: the infamous Carpal Tunnel! After surviving this tight squeeze, he emerges victorious in the hand, ready to command the LOAF muscles like a general commanding his troops!",
                steps: [
                    { title: "Origin", desc: "Forms from lateral and medial cords of brachial plexus (C6-T1)", isInjurySite: false },
                    { title: "Upper Arm", desc: "Travels medially to humerus in bicipital groove", isInjurySite: false },
                    { title: "Cubital Fossa", desc: "Passes medial to brachial artery", isInjurySite: false },
                    { title: "Forearm Entry", desc: "Passes between heads of pronator teres (common entrapment site)", isInjurySite: true },
                    { title: "AIN Branch", desc: "Gives off anterior interosseous nerve", isInjurySite: false },
                    { title: "Carpal Tunnel", desc: "Passes through carpal tunnel under transverse carpal ligament (most common entrapment)", isInjurySite: true },
                    { title: "Hand", desc: "Divides into branches for thenar muscles (LOAF)", isInjurySite: false }
                ]
            },
            ulnar: {
                name: "Ulnar Nerve",
                roots: "C8-T1",
                image: "Nerve Paths/Ulnar Nerve.png",
                story: "The Ulnar Underdog begins as the lone ranger from the medial cord, carrying the pure power of C8 and T1. He travels down the arm, taking the scenic route around the medial epicondyle at the elbow - that famous 'funny bone' spot where everyone's felt his electric personality! He slides through Guyon's canal at the wrist like a secret agent, then splits his mission: the deep branch heads to the interossei (the hand's fine motor specialists), while the superficial branch handles sensation for the pinky side of life.",
                steps: [
                    { title: "Origin", desc: "Arises from medial cord of brachial plexus (C8-T1)", isInjurySite: false },
                    { title: "Upper Arm", desc: "Travels down medial aspect of arm", isInjurySite: false },
                    { title: "Cubital Tunnel", desc: "Passes through cubital tunnel under Osborne's band behind medial epicondyle (most common entrapment)", isInjurySite: true },
                    { title: "Forearm", desc: "Travels between FCU and FDP in forearm", isInjurySite: false },
                    { title: "Guyon's Canal", desc: "Passes through Guyon's canal at wrist (volar carpal ligament roof)", isInjurySite: true },
                    { title: "Hand Division", desc: "Splits into superficial and deep branches", isInjurySite: false },
                    { title: "Hand Muscles", desc: "Innervates intrinsic hand muscles and sensation", isInjurySite: false }
                ]
            },
            radial: {
                name: "Radial Nerve",
                roots: "C5-T1",
                image: "Nerve Paths/Radial Nerve.png",
                story: "The Radial Rebel is the strong, silent type from the posterior cord, packing the full power of C5-T1. This mighty nerve takes the back route down the arm, spiraling around the humerus in the famous spiral groove like a roller coaster. He's the extension expert, powering all the muscles that straighten the elbow, lift the wrist, and extend the fingers. His most vulnerable moment comes at the spiral groove, where a broken humerus can leave him bruised and beaten, causing the dreaded 'wrist drop.'",
                steps: [
                    { title: "Origin", desc: "Arises from posterior cord (C5-T1)", isInjurySite: false },
                    { title: "Spiral Groove", desc: "Travels in spiral groove of humerus directly on bone (most vulnerable point for compression/fracture)", isInjurySite: true },
                    { title: "Lateral Arm", desc: "Emerges laterally, pierces lateral intermuscular septum", isInjurySite: false },
                    { title: "Elbow Division", desc: "Divides into superficial and deep (PIN) branches", isInjurySite: false },
                    { title: "Posterior Forearm", desc: "PIN passes through arcade of Frohse at supinator (compression site)", isInjurySite: true },
                    { title: "Dorsal Hand", desc: "Superficial branch provides dorsal hand sensation", isInjurySite: false }
                ]
            },
            musculocutaneous: {
                name: "Musculocutaneous Nerve",
                roots: "C5-C7",
                image: "Nerve Paths/Musculocutaneous Nerve.png",
                story: "The Musculocutaneous Marvel begins at the lateral cord headquarters in the brachial plexus, carrying orders from C5-C7. This sturdy nerve pierces through the coracobrachialis muscle like a determined warrior, then travels between the biceps brachii and brachialis muscles, supervising their every flex. As it approaches the elbow, it transforms into the lateral cutaneous nerve of the forearm, spreading its sensory network across the lateral forearm like a protective shield.",
                steps: [
                    { title: "Origin", desc: "Arises from lateral cord of brachial plexus (C5-C7)", isInjurySite: false },
                    { title: "Coracobrachialis", desc: "Pierces coracobrachialis muscle", isInjurySite: false },
                    { title: "Biceps Brachii", desc: "Innervates biceps brachii", isInjurySite: false },
                    { title: "Brachialis", desc: "Innervates lateral part of brachialis", isInjurySite: false },
                    { title: "Lateral Cutaneous", desc: "Becomes lateral cutaneous nerve of forearm", isInjurySite: false },
                    { title: "Forearm Sensation", desc: "Provides sensation to lateral forearm", isInjurySite: false }
                ]
            },
            axillary: {
                name: "Axillary Nerve",
                roots: "C5-C6",
                image: "Nerve Paths/Axillary Nerve.png",
                story: "The Axillary Ambassador emerges from the posterior cord, carrying the strength of C5 and C6. This diplomatic nerve travels posteriorly around the surgical neck of the humerus, navigating through the quadrilateral space like a secret agent. It has two important missions: powering the mighty deltoid muscle and providing sensation to the shoulder's badge of honor - that small patch of skin over the deltoid that soldiers call the 'regimental patch'.",
                steps: [
                    { title: "Origin", desc: "Arises from posterior cord (C5-C6)", isInjurySite: false },
                    { title: "Quadrilateral Space", desc: "Passes through quadrilateral space", isInjurySite: false },
                    { title: "Surgical Neck", desc: "Wraps around surgical neck of humerus (vulnerable to fracture)", isInjurySite: true },
                    { title: "Deltoid Motor", desc: "Innervates deltoid muscle", isInjurySite: false },
                    { title: "Teres Minor", desc: "Innervates teres minor muscle", isInjurySite: false },
                    { title: "Cutaneous Branch", desc: "Provides sensation over deltoid (regimental patch)", isInjurySite: false }
                ]
            },
            femoral: {
                name: "Femoral Nerve",
                roots: "L2-L4",
                image: "Nerve Paths/Femoral Nerve.png",
                story: "The Femoral General emerges from the lumbar plexus with the authority of L2-L4. This commanding nerve travels under the inguinal ligament like a VIP passing through customs, then spreads its influence across the anterior thigh. It's the knee extension expert, powering the mighty quadriceps muscle group while also providing sensation down the medial leg via its saphenous branch - the longest sensory nerve in the body!",
                steps: [
                    { title: "Origin", desc: "Forms from lumbar plexus (L2-L4)", isInjurySite: false },
                    { title: "Inguinal Ligament", desc: "Passes under inguinal ligament", isInjurySite: false },
                    { title: "Femoral Triangle", desc: "Enters femoral triangle", isInjurySite: false },
                    { title: "Quadriceps", desc: "Innervates quadriceps muscle group", isInjurySite: false },
                    { title: "Saphenous Branch", desc: "Gives off saphenous nerve", isInjurySite: false },
                    { title: "Medial Leg", desc: "Saphenous nerve provides sensation to medial leg", isInjurySite: false }
                ]
            },
            tibial: {
                name: "Tibial Nerve",
                roots: "L4-S3",
                image: "Nerve Paths/Tibial Nerve.png",
                story: "The Tibial Traveler is one half of the mighty sciatic nerve's legacy, carrying the plantarflexion power of L4-S3. After the sciatic nerve splits at the popliteal fossa, this nerve takes the deep route down the posterior leg, traveling through the tarsal tunnel at the ankle like a train through a mountain pass. It's the pointing-toes expert, controlling all the muscles that push the foot down and curl the toes.",
                steps: [
                    { title: "Origin", desc: "Medial division of sciatic nerve (L4-S3)", isInjurySite: false },
                    { title: "Popliteal Fossa", desc: "Continues from sciatic bifurcation", isInjurySite: false },
                    { title: "Posterior Leg", desc: "Travels down posterior compartment", isInjurySite: false },
                    { title: "Plantarflexors", desc: "Innervates calf muscles and deep compartment", isInjurySite: false },
                    { title: "Tarsal Tunnel", desc: "Passes through tarsal tunnel under flexor retinaculum at medial ankle (entrapment site)", isInjurySite: true },
                    { title: "Foot Muscles", desc: "Divides into medial and lateral plantar nerves for intrinsic foot muscles", isInjurySite: false }
                ]
            },
            peroneal: {
                name: "Peroneal (Fibular) Nerve",
                roots: "L4-S2",
                image: "Nerve Paths/Superficial Fibular Nerve.png",
                deepImage: "Nerve Paths/Deep Fibular Nerve.png",
                story: "The Peroneal Pioneer, also known as the Common Fibular nerve, is an adventurous branch of the mighty sciatic nerve. This nerve loves taking the scenic route around the fibular head, making it vulnerable but vital for foot function. It splits into two explorers: the superficial peroneal (the ankle evertor) and the deep peroneal (the toe lifter), each with their own important territories to govern in the lower leg and foot.",
                steps: [
                    { title: "Origin", desc: "Lateral division of sciatic nerve (L4-S2)", isInjurySite: false },
                    { title: "Fibular Head", desc: "Wraps around fibular neck through fibular tunnel (most common lower extremity mononeuropathy)", isInjurySite: true },
                    { title: "Superficial Branch", desc: "Gives off superficial peroneal nerve for ankle eversion", isInjurySite: false },
                    { title: "Deep Branch", desc: "Continues as deep peroneal nerve for ankle dorsiflexion", isInjurySite: false },
                    { title: "Anterior Tarsal Tunnel", desc: "Deep peroneal passes under inferior extensor retinaculum at ankle (rare entrapment)", isInjurySite: true },
                    { title: "Foot", desc: "Provides motor to foot extensors and sensation to dorsal foot and first web space", isInjurySite: false }
                ]
            },
            sciatic: {
                name: "Sciatic Nerve",
                roots: "L4-S3",
                image: "Nerve Paths/Sciatic Nerve.png",
                story: "The Sciatic Supreme is the body's largest and most powerful nerve, combining the might of the lumbar and sacral plexuses. This heavyweight champion travels through the greater sciatic foramen, then runs down the posterior thigh like a mighty river. At the popliteal fossa, it typically splits into its two famous branches: the tibial nerve (the plantarflexion powerhouse) and the common peroneal nerve (the dorsiflexion dynamo).",
                steps: [
                    { title: "Origin", desc: "Forms from sacral plexus (L4-S3)", isInjurySite: false },
                    { title: "Greater Sciatic Foramen", desc: "Exits pelvis through greater sciatic foramen", isInjurySite: false },
                    { title: "Posterior Thigh", desc: "Travels down posterior thigh", isInjurySite: false },
                    { title: "Hamstring Muscles", desc: "Innervates hamstring muscles", isInjurySite: false },
                    { title: "Popliteal Fossa", desc: "Reaches popliteal fossa", isInjurySite: false },
                    { title: "Bifurcation", desc: "Splits into tibial and common peroneal nerves", isInjurySite: false }
                ]
            },
            obturator: {
                name: "Obturator Nerve",
                roots: "L2-L4",
                image: "Nerve Paths/Obturator Nerve.png",
                story: "The Obturator Officer is a specialized nerve with a unique mission: controlling hip adduction. Born from the lumbar plexus, this nerve takes an unusual route through the obturator foramen (hence its name), like a secret tunnel through the pelvis. It divides into anterior and posterior branches to command the adductor muscle army, helping bring the legs together and stabilize the hip during walking.",
                steps: [
                    { title: "Origin", desc: "Arises from lumbar plexus (L2-L4)", isInjurySite: false },
                    { title: "Obturator Foramen", desc: "Passes through obturator foramen", isInjurySite: false },
                    { title: "Anterior Branch", desc: "Splits into anterior branch", isInjurySite: false },
                    { title: "Posterior Branch", desc: "Splits into posterior branch", isInjurySite: false },
                    { title: "Adductor Muscles", desc: "Innervates adductor muscle group", isInjurySite: false },
                    { title: "Hip Sensation", desc: "Provides sensation to medial thigh", isInjurySite: false }
                ]
            },
            sural: {
                name: "Sural Nerve",
                roots: "S1-S2",
                image: "Nerve Paths/Sural Nerve.png",
                story: "The Sural Scout is the faithful sensory companion of the lower leg. Formed by the union of the medial sural cutaneous nerve (from the tibial) and the communicating branch (from the common peroneal), this nerve travels down the back of the calf like a dedicated rear guard. It passes behind the lateral malleolus - a key landmark! - and continues along the side of the foot, providing sensation to the postero-lateral leg and the lateral side of the foot and little toe.",
                steps: [
                    { title: "Origin", desc: "Formed by union of medial sural cutaneous (tibial) and sural communicating branch (common peroneal) (S1-S2)", isInjurySite: false },
                    { title: "Posterior Leg", desc: "Travels down midline of posterior calf with small saphenous vein", isInjurySite: false },
                    { title: "Lateral Malleolus", desc: "Passes posterior to lateral malleolus (key landmark)", isInjurySite: false },
                    { title: "Foot", desc: "Travels along lateral side of foot", isInjurySite: false },
                    { title: "Innervation", desc: "Sensation to posterolateral leg, lateral foot, and lateral aspect of 5th toe", isInjurySite: false }
                ]
            }
        };

        window.selectNerve = function (nerveName) {
            console.log('🧠 Selecting nerve:', nerveName);
            const explorer = window.pathwayExplorer;
            if (!explorer.nerveData[nerveName]) {
                console.log('❌ Nerve not found:', nerveName);
                return;
            }

            explorer.currentNerve = explorer.nerveData[nerveName];
            explorer.currentStep = 0;
            explorer.maxSteps = explorer.currentNerve.steps.length;

            const pathwayContainer = document.getElementById('pathway-container');
            if (pathwayContainer) {
                pathwayContainer.style.display = 'block';
                console.log('✅ Pathway container shown');
            }

            const storyElement = document.getElementById('story-text');
            if (storyElement) {
                storyElement.innerHTML = explorer.currentNerve.story;
                console.log('✅ Story updated');
            }

            const imageElement = document.getElementById('nerve-pathway-image');
            if (imageElement) {
                let imageHtml = '';

                // Special case for peroneal nerve - show both superficial and deep fibular
                if (nerveName === 'peroneal' && explorer.currentNerve.deepImage) {
                    imageHtml = '<div style="text-align: center;"><h6 style="color: #0c4a6e; margin-bottom: 15px; font-size: 1.1em;">' + explorer.currentNerve.name + '</h6><p style="color: #64748b; margin-bottom: 15px;">Nerve Roots: ' + explorer.currentNerve.roots + '</p>' +
                        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">' +
                        '<div><h6 style="color: #0369a1; font-size: 1em; margin-bottom: 8px;">Superficial Fibular</h6><img src="' + explorer.currentNerve.image + '" alt="Superficial Fibular Nerve Pathway" style="width: 100%; height: auto; border-radius: 8px; border: 2px solid #bae6fd;"></div>' +
                        '<div><h6 style="color: #0369a1; font-size: 1em; margin-bottom: 8px;">Deep Fibular</h6><img src="' + explorer.currentNerve.deepImage + '" alt="Deep Fibular Nerve Pathway" style="width: 100%; height: auto; border-radius: 8px; border: 2px solid #bae6fd;"></div>' +
                        '</div></div>';
                } else if (explorer.currentNerve.image) {
                    // Regular nerve with single image
                    imageHtml = '<div style="text-align: center;"><h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 1.1em;">' + explorer.currentNerve.name + '</h6><p style="color: #64748b; margin-bottom: 15px;">Nerve Roots: ' + explorer.currentNerve.roots + '</p><img src="' + explorer.currentNerve.image + '" alt="' + explorer.currentNerve.name + ' Pathway" style="width: 100%; height: auto; border-radius: 8px; border: 2px solid #bae6fd;"></div>';
                } else {
                    // Fallback for nerves without images
                    imageHtml = '<div style="text-align: center;"><div style="font-size: 3em; margin-bottom: 15px; color: #0ea5e9;">🧠</div><h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 1.1em;">' + explorer.currentNerve.name + '</h6><p style="color: #64748b;">Nerve Roots: ' + explorer.currentNerve.roots + '</p><p style="color: #94a3b8; font-size: 0.9em; margin-top: 15px; padding: 10px; background: #f1f5f9; border-radius: 6px;">[Image not available]</p></div>';
                }

                imageElement.innerHTML = imageHtml;
                console.log('✅ Nerve image updated for:', nerveName);
            }

            window.showStep(0);

            document.querySelectorAll('.nerve-btn').forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#0c4a6e';
            });

            const clickedButton = document.querySelector('button[onclick*="' + nerveName + '"]');
            if (clickedButton) {
                clickedButton.style.background = '#0ea5e9';
                clickedButton.style.color = 'white';
                console.log('✅ Button highlighted');
            }
        };

        // Define showStep with RED/GREEN injury highlighting + click functionality
        window.showStep = function (stepIndex) {
            const explorer = window.pathwayExplorer;
            if (!explorer.currentNerve || stepIndex < 0 || stepIndex >= explorer.maxSteps) return;

            explorer.currentStep = stepIndex;

            // Build HTML with RED for injuries, GREEN for normal
            const stepsHtml = explorer.currentNerve.steps.map((s, i) => {
                const isInjury = s.isInjurySite;
                const isCurrent = i === stepIndex;
                const isFuture = i > stepIndex;

                let borderColor, bgColor, textColor, icon;

                if (isFuture) {
                    borderColor = '#e5e7eb';
                    bgColor = '#f9fafb';
                    textColor = '#6b7280';
                    icon = `${i + 1}.`;
                } else if (isInjury) {
                    borderColor = '#dc2626';
                    bgColor = isCurrent ? '#fee2e2' : '#fef2f2';
                    textColor = isCurrent ? '#991b1b' : '#dc2626';
                    icon = `⚠️ ${i + 1}.`;
                } else {
                    borderColor = '#10b981';
                    bgColor = isCurrent ? '#f0fdf4' : '#ecfdf5';
                    textColor = isCurrent ? '#047857' : '#059669';
                    icon = `${i + 1}.`;
                }

                return `<div style="padding: 10px; margin-bottom: 8px; border-radius: 8px; border-left: 4px solid ${borderColor}; background: ${bgColor};">
                    <div style="font-weight: 600; color: ${textColor}; margin-bottom: 4px;">
                        ${icon} ${s.title}
                    </div>
                    <div style="color: ${isFuture ? '#9ca3af' : '#374151'}; font-size: 0.95em;">
                        ${s.desc}
                    </div>
                </div>`;
            }).join('');

            const clickHint = stepIndex === explorer.maxSteps - 1 ? '' :
                '<div style="position: absolute; bottom: 10px; right: 15px; color: #94a3b8; font-size: 0.8em; opacity: 0.7;">Click anywhere to advance →</div>';

            document.getElementById('pathway-steps').innerHTML = stepsHtml + clickHint;

            // Update prev button
            const prevBtn = document.getElementById('prev-btn');
            if (prevBtn) {
                prevBtn.disabled = stepIndex === 0;
                prevBtn.style.opacity = stepIndex === 0 ? '0.5' : '1';
            }

            // Set up click-to-advance functionality
            const pathwayBox = document.getElementById('pathway-steps');
            if (stepIndex === explorer.maxSteps - 1) {
                pathwayBox.style.cursor = 'default';
                pathwayBox.onclick = null;
            } else {
                pathwayBox.style.cursor = 'pointer';
                pathwayBox.onclick = window.nextStep;
                pathwayBox.onmouseover = function () {
                    this.style.backgroundColor = '#f0f9ff';
                    this.style.borderColor = '#0ea5e9';
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.15)';
                };
                pathwayBox.onmouseout = function () {
                    this.style.backgroundColor = 'white';
                    this.style.borderColor = '#bae6fd';
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                };
            }
        };

        window.nextStep = function () {
            const explorer = window.pathwayExplorer;
            if (explorer.currentStep < explorer.maxSteps - 1) {
                window.showStep(explorer.currentStep + 1);
            }
        };

        window.previousStep = function () {
            const explorer = window.pathwayExplorer;
            if (explorer.currentStep > 0) {
                window.showStep(explorer.currentStep - 1);
            }
        };

        window.resetPathway = function () {
            const explorer = window.pathwayExplorer;
            if (explorer.currentNerve) {
                window.showStep(0);
            }
        };

        // Function to close general modal
        window.closeGeneralModal = function () {
            const modalOverlay = document.getElementById('modal-overlay');
            if (modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        };

        // ===============================================
        // ATRIUM HEALTH 13-MODULE PATHWAY SYSTEM
        // ===============================================

        // Module Configuration with Custom Artwork Integration
        const atriumModuleConfig = [
            { id: 'emg-introduction', title: 'EMG/NCS Introduction', customIcon: 'NEW ICONS/EMG:NCS Intro.png' },
            { id: 'plexus-anatomy', title: 'Peripheral Nerve Anatomy', customIcon: 'NEW ICONS/Peripheral Anatomy.png' },
            { id: 'plexus', title: 'Interactive Plexus Anatomy', customIcon: 'NEW ICONS/Brachial Plexus Anatomy.png' },
            { id: 'radiculopathy-pathophysiology', title: 'Radiculopathy Pathophysiology', customIcon: 'NEW ICONS/Radiculopathy Pathophysiology.png' },
            { id: 'neuropathy-pathophysiology', title: 'Neuropathy Pathophysiology', customIcon: 'NEW ICONS/Neuropathy Pathophysiology.png' },
            { id: 'ncs-fundamentals', title: 'NCS Fundamentals', customIcon: 'NEW ICONS/NCS Fundamentals.png' },
            { id: 'ncs-techniques', title: 'NCS Techniques', customIcon: 'NEW ICONS/NCS Techniques.png' },
            { id: 'emg-needle-localization', title: 'EMG Needle Localization', customIcon: 'NEW ICONS/EMG Needle localization.png' },
            { id: 'muscle-quiz', title: 'Muscle Study Lab', customIcon: 'NEW ICONS/muscle study lab.png' },
            { id: 'basic-patterns', title: 'Basic Pattern Recognition', customIcon: 'NEW ICONS/Basic Pattern Recognition.png' },
            { id: 'neuropathy-myopathy-basics', title: 'Neuropathy vs Myopathy Basics', customIcon: 'NEW ICONS/Neuropathy vs. Myopathy Basics.png' },
            { id: 'simple-reports', title: 'Basic Report Writing', customIcon: 'NEW ICONS/Basic report writing.png' },
            { id: 'clinical-correlation', title: 'Clinical Application', customIcon: 'NEW ICONS/Clinical application.png' }
        ];

        // Old ERNEST Messages Removed - Now Using Dynamic Description System

        // Create Pre-Positioned Description Boxes
        function createDescriptionBoxes() {
            const boardContainer = document.getElementById('learning-board');

            // Create 14 description boxes, one for each module
            for (let moduleNumber = 1; moduleNumber <= 14; moduleNumber++) {
                const desc = moduleDescriptions[moduleNumber] || {
                    title: `Module ${moduleNumber}`,
                    text: "Description coming soon.",
                    highlights: ""
                };

                const side = (moduleNumber - 1) % 2 === 0 ? 'left' : 'right';

                // Create the description box element
                const descriptionBox = document.createElement('div');
                descriptionBox.id = `description-box-${moduleNumber}`;
                descriptionBox.className = `ernest-description-box module-${moduleNumber}-description`;
                descriptionBox.innerHTML = `
                    <div class="description-ernest">
                        <img src="images/ui/ERNEST.png" alt="ERNEST" class="description-ernest-avatar">
                        <div class="description-content">
                            <div class="description-title">${desc.title}</div>
                            <div class="description-text">${desc.text}</div>
                            <div class="description-highlights">${desc.highlights}</div>
                        </div>
                    </div>
                `;

                // Add to the page
                boardContainer.appendChild(descriptionBox);

                // Position it parallel to the corresponding module (will be refined in next step)
                positionDescriptionBox(descriptionBox, moduleNumber, side);
            }

            console.log('✅ Created 13 pre-positioned description boxes');

            // Add window resize handler to reposition boxes
            window.addEventListener('resize', () => {
                for (let moduleNumber = 1; moduleNumber <= 14; moduleNumber++) {
                    const box = document.getElementById(`description-box-${moduleNumber}`);
                    const side = (moduleNumber - 1) % 2 === 0 ? 'left' : 'right';
                    if (box) {
                        positionDescriptionBox(box, moduleNumber, side);
                    }
                }
            });
        }

        // Position Description Box Parallel to Module Icon
        function positionDescriptionBox(box, moduleNumber, side) {
            // Find the corresponding module element
            const moduleElement = document.querySelector(`[onmouseover*="showModuleDescription(${moduleNumber}"]`);
            if (!moduleElement) {
                console.warn(`Module ${moduleNumber} not found for positioning`);
                return;
            }

            // Get the pathway center line element to calculate precise center
            const centerLine = document.querySelector('.pathway-center-line');
            const moduleRect = moduleElement.getBoundingClientRect();
            const centerRect = centerLine ? centerLine.getBoundingClientRect() : null;

            // Calculate the center of the page/pathway
            const pageCenter = centerRect ? centerRect.left + (centerRect.width / 2) : window.innerWidth / 2;

            // Calculate vertical position (parallel to module icon)
            const scrollY = window.scrollY;
            const topPosition = moduleRect.top + scrollY + (moduleRect.height / 2) - 100; // Center vertically with box

            // Calculate horizontal position (opposite side of center line)
            let leftPosition;
            const boxWidth = 350; // Match CSS width
            const spacing = 150; // Increased gap between center line and description box

            if (side === 'left') {
                // Module on left, description on right side of center
                leftPosition = pageCenter + spacing;
            } else {
                // Module on right, description on left side of center
                leftPosition = pageCenter - spacing - boxWidth;
            }

            // Ensure description boxes don't go off-screen
            const minLeft = 20;
            const maxLeft = window.innerWidth - boxWidth - 20;
            leftPosition = Math.max(minLeft, Math.min(maxLeft, leftPosition));

            // Apply positioning
            box.style.position = 'fixed';
            box.style.top = topPosition + 'px';
            box.style.left = leftPosition + 'px';
            box.style.opacity = '0'; // Hidden initially
            box.style.pointerEvents = 'none'; // Non-interactive when hidden

            // console.log(`Positioned description box ${moduleNumber} (${side}) at top: ${topPosition}px, left: ${leftPosition}px`);
        }


        // MAIN ENTRY POINT FOR PATHWAY GENERATION
        async function generateAtriumPathway() {
            console.log('🚀 Generating Atrium Pathway via Module System...');
            if (window.appComponents && window.appComponents.candyland) {
                await window.appComponents.candyland.render();
            } else {
                console.error("❌ Candyland Component not loaded!");
            }
        }

        // Generate Complete Podcast Library Section (All Episodes)
        function generateCompletePodcastLibrary() {
            return `
                < div class="complete-podcast-library" style = "margin-top: 80px; padding: 50px 0; background: linear-gradient(135deg, #fafaf9, #f5f5f4); border-top: 3px solid #d4d4d8;" >
                    < !--Section Header-- >
                    <div style="text-align: center; margin-bottom: 50px;">
                        <h2 style="color: #18181b; font-size: 2.5em; margin-bottom: 15px; font-weight: 800;">
                            🎙️ Complete Podcast Library
                        </h2>
                        <p style="color: #52525b; font-size: 1.2em; max-width: 800px; margin: 0 auto 10px;">
                            All of Ernest's podcast episodes in one place. Listen and learn at your own pace.
                        </p>
                        <p style="color: #71717a; font-size: 1em; max-width: 600px; margin: 0 auto;">
                            Total: 8 episodes • Combined duration: 4 hours 6 minutes
                        </p>
                    </div>

                    <!--Module Podcasts Section-- >
                    <div style="max-width: 1200px; margin: 0 auto 50px;">
                        <h3 style="color: #3b82f6; font-size: 1.8em; margin-bottom: 25px; text-align: center; font-weight: 700;">
                            📚 Core Module Podcasts
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;">
                            <!-- Plexopathies -->
                            <div class="podcast-list-card" data-podcast-trigger="true" data-module-id="brachial-plexus" data-episode-id="brachial-ep1"
                                 style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.2)'; this.style.borderColor='#3b82f6'"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #3b82f6; object-fit: cover;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #1e40af; margin: 0; font-size: 1.2em; font-weight: 600;">Plexopathies</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Module 3 • 25 min</p>
                                    </div>
                                </div>
                                <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                    Brachial and lumbosacral plexus pathology, clinical syndromes, and electrodiagnostic evaluation
                                </p>
                            </div>

                            <!-- Radiculopathy -->
                            <div class="podcast-list-card" data-podcast-trigger="true" data-module-id="radiculopathy" data-episode-id="radiculopathy-ep1"
                                 style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.2)'; this.style.borderColor='#3b82f6'"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #3b82f6; object-fit: cover;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #1e40af; margin: 0; font-size: 1.2em; font-weight: 600;">Radiculopathy</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Module 4 • 19 min</p>
                                    </div>
                                </div>
                                <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                    Nerve root compression mechanisms, classic patterns, and EMG findings
                                </p>
                            </div>

                            <!-- Neuropathy Pathophysiology -->
                            <div class="podcast-list-card" data-podcast-trigger="true" data-module-id="neuropathy-pathophysiology" data-episode-id="neuropathy-ep1"
                                 style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.2)'; this.style.borderColor='#3b82f6'"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #3b82f6; object-fit: cover;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #1e40af; margin: 0; font-size: 1.2em; font-weight: 600;">Neuropathy Pathophysiology</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Module 5 • 61 min</p>
                                    </div>
                                </div>
                                <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                    Comprehensive exploration of peripheral neuropathy mechanisms and patterns
                                </p>
                            </div>

                            <!-- EMG Interpretation -->
                            <div class="podcast-list-card" data-podcast-trigger="true" data-module-id="basic-patterns" data-episode-id="patterns-ep1"
                                 style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.2)'; this.style.borderColor='#3b82f6'"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #3b82f6; object-fit: cover;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #1e40af; margin: 0; font-size: 1.2em; font-weight: 600;">EMG Interpretation</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Module 7 • 28 min</p>
                                    </div>
                                </div>
                                <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                    Systematic EMG interpretation and pattern recognition for common diagnoses
                                </p>
                            </div>

                            <!-- Myopathy vs Neuropathy -->
                            <div class="podcast-list-card" data-podcast-trigger="true" data-module-id="neuropathy-myopathy" data-episode-id="neuro-myo-ep1"
                                 style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.2)'; this.style.borderColor='#3b82f6'"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                    <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #3b82f6; object-fit: cover;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #1e40af; margin: 0; font-size: 1.2em; font-weight: 600;">Myopathy vs. Neuropathy</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Module 8 • 32 min</p>
                                    </div>
                                </div>
                                <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                    Differentiate nerve and muscle disorders using clinical and EDX features
                                </p>
                            </div>
                        </div>
                    </div>

                    <!--Extra Topics Section-- >
                <div style="max-width: 1200px; margin: 0 auto;">
                    <h3 style="color: #a855f7; font-size: 1.8em; margin-bottom: 25px; text-align: center; font-weight: 700;">
                        ⭐ Advanced Topics
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;">
                        <!-- ALS and Mimics -->
                        <div class="podcast-list-card" onclick="window.playExtraPodcast('extra-als')"
                            style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                            onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(168, 85, 247, 0.2)'; this.style.borderColor='#a855f7'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #a855f7;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #7e22ce; margin: 0; font-size: 1.2em; font-weight: 600;">ALS and Mimics</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Extra Topics • 26 min</p>
                                    </div>
                            </div>
                            <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                Motor neuron disease diagnosis and differentiating ALS from treatable mimics
                            </p>
                        </div>

                        <!-- Blink Reflex -->
                        <div class="podcast-list-card" onclick="window.playExtraPodcast('extra-blink')"
                            style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                            onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(168, 85, 247, 0.2)'; this.style.borderColor='#a855f7'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #a855f7;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #7e22ce; margin: 0; font-size: 1.2em; font-weight: 600;">Blink Reflex</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Extra Topics • 26 min</p>
                                    </div>
                            </div>
                            <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                Specialized NCS technique for evaluating trigeminal and facial nerve pathways
                            </p>
                        </div>

                        <!-- MG vs Lambert-Eaton -->
                        <div class="podcast-list-card" onclick="window.playExtraPodcast('extra-mg-lems')"
                            style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                            onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 6px 20px rgba(168, 85, 247, 0.2)'; this.style.borderColor='#a855f7'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'; this.style.borderColor='#e5e7eb'">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                <img src="images/ui/ERNEST.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; border: 2px solid #a855f7;" alt="Ernest">
                                    <div>
                                        <h4 style="color: #7e22ce; margin: 0; font-size: 1.2em; font-weight: 600;">MG vs. Lambert-Eaton</h4>
                                        <p style="color: #64748b; margin: 3px 0 0 0; font-size: 0.85em;">Extra Topics • 29 min</p>
                                    </div>
                            </div>
                            <p style="color: #475569; line-height: 1.5; margin: 0; font-size: 0.9em;">
                                Compare and contrast these neuromuscular junction disorders
                            </p>
                        </div>
                    </div>
                </div>
                </div >
                `;
        }

        // Generate Extra Topics Podcast Section
        function generateExtraTopicsSection() {
            return `
                < div class="extra-topics-section" style = "margin-top: 60px; padding: 40px 0;" >
                    < !--Section Header-- >
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h2 style="color: #1e40af; font-size: 2.2em; margin-bottom: 15px; font-weight: 700;">
                            🎧 Advanced Topics Podcast Library
                        </h2>
                        <p style="color: #64748b; font-size: 1.1em; max-width: 700px; margin: 0 auto;">
                            Deep dives into specialized electrodiagnostic topics with Ernest. Expand your knowledge beyond the core curriculum.
                        </p>
                    </div>

                    <!--Podcast Cards Grid-- >
                <div class="podcast-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto;">
                    <!-- ALS and Mimics -->
                    <div class="podcast-card" onclick="window.playExtraPodcast('extra-als')"
                        style="background: linear-gradient(135deg, #fef2f2, #fee2e2);
                                    border: 2px solid #dc2626;
                                    border-radius: 15px;
                                    padding: 30px;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);"
                        onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 8px 25px rgba(220, 38, 38, 0.3)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(220, 38, 38, 0.2)'">
                        <div style="display: flex; align-items: center; margin-bottom: 20px;">
                            <img src="images/ui/ERNEST.png" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px; border: 3px solid #dc2626;" alt="Ernest">
                                <div>
                                    <h3 style="color: #991b1b; margin: 0; font-size: 1.4em; font-weight: 600;">ALS and Mimics</h3>
                                    <p style="color: #b91c1c; margin: 5px 0 0 0; font-size: 0.9em;">Duration: 26 minutes</p>
                                </div>
                        </div>
                        <p style="color: #7f1d1d; line-height: 1.6; margin-bottom: 15px;">
                            Explore motor neuron disease diagnosis and learn to differentiate ALS from treatable mimics using clinical and electrodiagnostic features.
                        </p>
                        <div style="display: flex; align-items: center; color: #dc2626; font-weight: 600;">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="margin-right: 8px; vertical-align: middle;">
                                <path d="M3 2L13 8L3 14V2Z" fill="currentColor" />
                            </svg> Listen Now
                        </div>
                    </div>

                    <!-- Blink Reflex -->
                    <div class="podcast-card" onclick="window.playExtraPodcast('extra-blink')"
                        style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
                                    border: 2px solid #0ea5e9;
                                    border-radius: 15px;
                                    padding: 30px;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.2);"
                        onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 8px 25px rgba(14, 165, 233, 0.3)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(14, 165, 233, 0.2)'">
                        <div style="display: flex; align-items: center; margin-bottom: 20px;">
                            <img src="images/ui/ERNEST.png" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px; border: 3px solid #0ea5e9;" alt="Ernest">
                                <div>
                                    <h3 style="color: #075985; margin: 0; font-size: 1.4em; font-weight: 600;">Blink Reflex</h3>
                                    <p style="color: #0369a1; margin: 5px 0 0 0; font-size: 0.9em;">Duration: 26 minutes</p>
                                </div>
                        </div>
                        <p style="color: #0c4a6e; line-height: 1.6; margin-bottom: 15px;">
                            Master this specialized NCS technique for evaluating trigeminal and facial nerve pathways. Learn technical aspects and clinical applications.
                        </p>
                        <div style="display: flex; align-items: center; color: #0ea5e9; font-weight: 600;">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="margin-right: 8px; vertical-align: middle;">
                                <path d="M3 2L13 8L3 14V2Z" fill="currentColor" />
                            </svg> Listen Now
                        </div>
                    </div>

                    <!-- MG vs Lambert-Eaton -->
                    <div class="podcast-card" onclick="window.playExtraPodcast('extra-mg-lems')"
                        style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
                                    border: 2px solid #a855f7;
                                    border-radius: 15px;
                                    padding: 30px;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);"
                        onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 8px 25px rgba(168, 85, 247, 0.3)'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(168, 85, 247, 0.2)'">
                        <div style="display: flex; align-items: center; margin-bottom: 20px;">
                            <img src="images/ui/ERNEST.png" style="width: 60px; height: 60px; border-radius: 50%; margin-right: 15px; border: 3px solid #a855f7;" alt="Ernest">
                                <div>
                                    <h3 style="color: #6b21a8; margin: 0; font-size: 1.4em; font-weight: 600;">MG vs. Lambert-Eaton</h3>
                                    <p style="color: #7e22ce; margin: 5px 0 0 0; font-size: 0.9em;">Duration: 29 minutes</p>
                                </div>
                        </div>
                        <p style="color: #581c87; line-height: 1.6; margin-bottom: 15px;">
                            Compare and contrast these neuromuscular junction disorders. Learn the distinctive clinical, electrodiagnostic, and treatment features of each.
                        </p>
                        <div style="display: flex; align-items: center; color: #a855f7; font-weight: 600;">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="margin-right: 8px; vertical-align: middle;">
                                <path d="M3 2L13 8L3 14V2Z" fill="currentColor" />
                            </svg> Listen Now
                        </div>
                    </div>
                </div>
                </div >
                `;
        }


        // Open module in new tab (iOS workaround for zoom crash)
        async function openModuleInNewTab(moduleNumber, moduleId) {
            const module = { contentId: moduleId, id: moduleId };

            try {
                // Use module loader to get content dynamically
                let content = '';
                if (window.moduleLoader) {
                    const loadedModule = await window.moduleLoader.loadModule(moduleId);
                    if (loadedModule && loadedModule.generateContent) {
                        content = loadedModule.generateContent(module);
                    } else {
                        throw new Error('Module not found or no content generator');
                    }
                } else if (typeof generateLearningContentByType === 'function') {
                    content = generateLearningContentByType(module, moduleNumber - 1);
                } else {
                    throw new Error('No content generation method available');
                }

                if (!content) {
                    throw new Error('No content generated');
                }

                const moduleTitle = atriumModuleConfig[moduleNumber - 1].title;

                // Get base URL for script paths
                const baseURL = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

                // Create standalone HTML page using string concatenation to avoid template literal issues
                const newTabHTML = '<!DOCTYPE html>\n' +
                    '<html lang="en">\n' +
                    '<head>\n' +
                    '    <meta charset="UTF-8">\n' +
                    '    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">\n' +
                    '    <title>Module ' + moduleNumber + ': ' + moduleTitle + '</title>\n' +
                    '    <base href="' + baseURL + '">\n' +
                    '    <style>\n' +
                    '        * { box-sizing: border-box; }\n' +
                    '        body {\n' +
                    '            font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\n' +
                    '            line-height: 1.8;\n' +
                    '            color: #1f2937;\n' +
                    '            background: linear-gradient(135deg, #fdfcf8 0%, #f9f7f1 100%);\n' +
                    '            margin: 0;\n' +
                    '            padding: 20px;\n' +
                    '            font-size: 18px;\n' +
                    '        }\n' +
                    '        .module-header {\n' +
                    '            background: linear-gradient(135deg, #4f46e5, #6366f1);\n' +
                    '            color: white;\n' +
                    '            padding: 25px;\n' +
                    '            border-radius: 15px;\n' +
                    '            margin-bottom: 25px;\n' +
                    '            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);\n' +
                    '        }\n' +
                    '        .module-header h1 { margin: 0 0 10px 0; font-size: 1.8em; }\n' +
                    '        .back-button {\n' +
                    '            display: inline-block;\n' +
                    '            background: white;\n' +
                    '            color: #4f46e5;\n' +
                    '            padding: 12px 24px;\n' +
                    '            border-radius: 25px;\n' +
                    '            text-decoration: none;\n' +
                    '            font-weight: 600;\n' +
                    '            margin-top: 15px;\n' +
                    '            box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n' +
                    '        }\n' +
                    '        .content-wrapper {\n' +
                    '            background: white;\n' +
                    '            padding: 30px;\n' +
                    '            border-radius: 15px;\n' +
                    '            box-shadow: 0 2px 20px rgba(0,0,0,0.08);\n' +
                    '            max-width: 900px;\n' +
                    '            margin: 0 auto;\n' +
                    '            overflow: hidden;\n' +
                    '        }\n' +
                    '        /* Mobile-optimized column layout - stack vertically */\n' +
                    '        .content-wrapper .study-section,\n' +
                    '        .content-wrapper .two-column-layout {\n' +
                    '            display: block !important;\n' +
                    '            width: 100% !important;\n' +
                    '        }\n' +
                    '        .content-wrapper .study-column,\n' +
                    '        .content-wrapper [style*="flex: 1"],\n' +
                    '        .content-wrapper [style*="width: 48%"],\n' +
                    '        .content-wrapper [style*="width: 50%"] {\n' +
                    '            display: block !important;\n' +
                    '            width: 100% !important;\n' +
                    '            max-width: 100% !important;\n' +
                    '            margin-bottom: 20px !important;\n' +
                    '            word-wrap: break-word;\n' +
                    '            overflow-wrap: break-word;\n' +
                    '        }\n' +
                    '        /* Ensure flex and grid containers don\'t break */\n' +
                    '        .content-wrapper [style*="display: grid"],\n' +
                    '        .content-wrapper [style*="display: flex"] {\n' +
                    '            display: block !important;\n' +
                    '        }\n' +
                    '        .content-wrapper img, .content-wrapper table { max-width: 100%; height: auto; }\n' +
                    '    </style>\n' +
                    '</head>\n' +
                    '<body>\n' +
                    '    <div class="module-header">\n' +
                    '        <h1>📚 Module ' + moduleNumber + ': ' + moduleTitle + '</h1>\n' +
                    '        <p style="margin: 0; opacity: 0.9;">EMG/NCS Learning Journey</p>\n' +
                    '        <a href="#" onclick="window.close(); return false;" class="back-button">← Close & Return to Journey</a>\n' +
                    '    </div>\n' +
                    '    <div class="content-wrapper">\n' +
                    content +
                    '\n    </div>\n' +
                    '\n' +
                    '    <!-- Lightweight interactive stubs for mobile - avoids loading 976KB file -->\n' +
                    '    <script>\n' +
                    '        // Stub functions that redirect back to main page for interactive features\n' +
                    '        window.showStudyCards = function() {\n' +
                    '            if (confirm(\'📱 Interactive features work best on the main page.\\n\\nWould you like to close this tab and return to the main page to use NCS Study Cards?\')) {\n' +
                    '                window.close();\n' +
                    '            }\n' +
                    '        };\n' +
                    '        \n' +
                    '        window.showEMGChallenge = function() {\n' +
                    '            if (confirm(\'📱 Interactive features work best on the main page.\\n\\nWould you like to close this tab and return to the main page to use the EMG Challenge?\')) {\n' +
                    '                window.close();\n' +
                    '            }\n' +
                    '        };\n' +
                    '        \n' +
                    '        window.launchEMGApp = function(caseId) {\n' +
                    '            if (confirm(\'📱 Interactive features work best on the main page.\\n\\nWould you like to close this tab and return to the main page to launch this EMG case?\')) {\n' +
                    '                window.close();\n' +
                    '            }\n' +
                    '        };\n' +
                    '        \n' +
                    '        window.openBrachialPlexusModal = function() {\n' +
                    '            if (confirm(\'📱 Interactive features work best on the main page.\\n\\nWould you like to close this tab and return to the main page for the interactive Brachial Plexus?\')) {\n' +
                    '                window.close();\n' +
                    '            }\n' +
                    '        };\n' +
                    '        \n' +
                    '        console.log(\'📱 Mobile-optimized stubs loaded. Interactive features redirect to main page.\');\n' +
                    '    </' + 'script>\n' +
                    '</body>\n' +
                    '</html>';

                // Open in new tab
                const newTab = window.open('', '_blank');
                if (newTab) {
                    newTab.document.write(newTabHTML);
                    newTab.document.close();
                    console.log(`✅ Module ${moduleNumber} opened in new tab`);
                } else {
                    alert('Please allow pop-ups to view learning modules on mobile.');
                }
            } catch (error) {
                console.error(`❌ Error opening module $ { moduleNumber } in new tab: `, error);
                alert('Error loading module content. Please try again.');
            }
        }

        // Fallback content if modal generators fail
        function showFallbackContent(moduleNumber, moduleId) {
            if (typeof window.showModal === 'function') {
                window.showModal(`Module ${moduleNumber} `, `
                < div style = "text-align: center; padding: 40px;" >
                        <div style="font-size: 3em; margin-bottom: 20px;">⚠️</div>
                        <h3>Content Loading Error</h3>
                        <p>Unable to load content for this module.</p>
                        <p><strong>Module:</strong> ${moduleId}</p>
                        <p>Please check that all required JavaScript files are loaded.</p>
                    </div >
                `);
            }
        }

        // Dynamic Module Description System
        const moduleDescriptions = {
            1: {
                title: "EMG/NCS Introduction",
                text: "Master the fundamental principles of electrodiagnostic medicine! This comprehensive module covers patient preparation, safety protocols, basic neurophysiology, and the clinical applications that make EMG/NCS an essential diagnostic tool.",
                highlights: "Topics: Patient care, safety, basic principles, clinical applications"
            },
            2: {
                title: "Peripheral Anatomy",
                text: "Build your anatomical foundation with detailed nerve pathway mapping. Learn the complex relationships between peripheral nerves, muscles, and clinical presentations to become an expert diagnostician.",
                highlights: "Topics: Nerve anatomy, muscle innervation, anatomical variations"
            },
            3: {
                title: "Plexus Anatomy",
                text: "Explore the complex nerve networks of the body! This interactive module covers both Brachial and Lumbosacral plexuses, helping you visualize anatomy, trace pathways, and understand injury patterns.",
                highlights: "Topics: Brachial & Lumbosacral anatomy, interactive tracing, injury patterns"
            },
            4: {
                title: "Radiculopathy Pathophysiology",
                text: "Understand the mechanisms behind nerve root compression and irritation. Learn to differentiate radiculopathy from other conditions and master the EMG/NCS findings that confirm your diagnosis.",
                highlights: "Topics: Nerve root compression, differential diagnosis, EMG patterns"
            },
            5: {
                title: "Neuropathy Pathophysiology",
                text: "Distinguish between axonal and demyelinating processes with confidence! This fundamental knowledge shapes your entire approach to peripheral nerve disorders and treatment planning.",
                highlights: "Topics: Axonal vs demyelinating, pathophysiology, treatment implications"
            },
            6: {
                title: "NCS Fundamentals",
                text: "Dive deep into nerve conduction studies! Master electrode placement, stimulation techniques, measurement interpretation, and learn to differentiate normal from pathological findings.",
                highlights: "Topics: Electrode placement, stimulation, normal values, interpretation"
            },
            7: {
                title: "NCS Techniques",
                text: "Perfect your technical skills with advanced nerve conduction study techniques. Learn troubleshooting strategies, optimal positioning, and how to obtain reliable, reproducible results.",
                highlights: "Topics: Advanced techniques, troubleshooting, quality control"
            },
            8: {
                title: "EMG Needle Localization",
                text: "Master precise needle electrode placement using anatomical landmarks. Learn safe insertion techniques, avoid complications, and ensure accurate muscle sampling for reliable results.",
                highlights: "Topics: Needle placement, anatomical landmarks, safety protocols"
            },
            9: {
                title: "Muscle Study Laboratory",
                text: "Explore comprehensive muscle anatomy with our advanced Preston & Shapiro laboratory database. Interactive muscle exploration with detailed anatomical references and clinical correlations.",
                highlights: "Topics: Muscle anatomy, Preston & Shapiro database, interactive learning"
            },
            10: {
                title: "Basic Pattern Recognition",
                text: "Develop your pattern recognition skills for abnormal spontaneous activity. Learn to identify fibrillations, positive sharp waves, fasciculations, and other key EMG findings.",
                highlights: "Topics: Spontaneous activity, pattern recognition, EMG waveforms"
            },
            11: {
                title: "Neuropathy vs Myopathy",
                text: "Master the critical distinction between nerve and muscle disorders. Learn the EMG/NCS patterns that differentiate neuropathies from myopathies and guide appropriate treatment.",
                highlights: "Topics: Differential diagnosis, EMG patterns, clinical implications"
            },
            12: {
                title: "Basic Report Writing",
                text: "Learn to write clear, clinically relevant EMG/NCS reports. Understand report structure, proper terminology, and how to communicate findings effectively to referring physicians.",
                highlights: "Topics: Report structure, medical terminology, clinical communication"
            },
            13: {
                title: "Clinical Application",
                text: "Apply everything you've learned with real clinical scenarios and comprehensive case studies. Practice the complete EMG/NCS workflow from history to final diagnosis.",
                highlights: "Topics: Clinical cases, workflow, diagnostic reasoning, real scenarios"
            }
        };


        // Global variables for ERNEST system
        let hideTimer = null;


        // NEW ERNEST RPG-STYLE DIALOGUE FUNCTIONS

        function showModuleDescription(moduleNumber) {
            // Cancel any pending hide timer
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }

            // Get module description
            const desc = moduleDescriptions[moduleNumber] || {
                title: `Module ${moduleNumber}`,
                text: "Hover over modules to learn more!",
                highlights: ""
            };

            // Update ERNEST dialogue content
            const ernestMessage = document.getElementById('ernest-message');
            const ernestHighlights = document.getElementById('ernest-highlights');
            const ernestDialogue = document.getElementById('ernest-dialogue');

            if (ernestMessage && ernestDialogue) {
                ernestMessage.textContent = desc.text;
                if (ernestHighlights) {
                    ernestHighlights.textContent = desc.highlights;
                }
                // Slide up ERNEST dialogue
                ernestDialogue.classList.add('show');
            }
        }

        function hideModuleDescription() {
            // Clear any existing timer
            if (hideTimer) {
                clearTimeout(hideTimer);
            }

            // Set 2-second delay before hiding ERNEST
            hideTimer = setTimeout(() => {
                const ernestDialogue = document.getElementById('ernest-dialogue');
                if (ernestDialogue) {
                    // Slide down ERNEST dialogue
                    ernestDialogue.classList.remove('show');
                }
                hideTimer = null;
            }, 2000); // 2 seconds - better timing
        }

        async function generateAtriumPathway(pgy = 'pgy2') {
            console.log('🚀 Generating Atrium Pathway via Module System...', pgy);

            // Retry mechanism to wait for modules to initialize
            const maxRetries = 50; // 5 seconds (100ms * 50)
            let retries = 0;

            while (!(window.appComponents && window.appComponents.candyland) && retries < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 100));
                retries++;
                if (retries === 1) console.log('⏳ Waiting for Candyland module initialization...');
            }

            if (window.appComponents && window.appComponents.candyland) {
                // Ensure the component has the data it needs or uses correct method
                if (typeof window.appComponents.candyland.generateLearningBoard === 'function') {
                    await window.appComponents.candyland.generateLearningBoard(pgy);
                } else if (typeof window.appComponents.candyland.render === 'function') {
                    // Fallback to render if generateLearningBoard is not found, but pass pgy
                    await window.appComponents.candyland.render(pgy);
                } else {
                    console.error("❌ Candyland Component missing required methods!");
                }
            } else {
                console.error("❌ Candyland Component not loaded after 2 seconds!");
            }
        }

        // Override the existing generateLearningBoard function
        window.generateLearningBoard = generateAtriumPathway;

        // Make sure all functions are available globally
        // window.startAtriumJourney is already defined earlier in the script
        window.showModuleDescription = showModuleDescription;
        window.hideModuleDescription = hideModuleDescription;

        // Tab Navigation Function for Enhanced EMG Introduction
        function showEMGSection(sectionName) {
            console.log('🔄 Switching to EMG section:', sectionName);

            // Hide all EMG sections
            const sections = document.querySelectorAll('.emg-section');
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Show the selected section
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                targetSection.style.display = 'block';
            }

            // Update tab styling
            const tabs = document.querySelectorAll('.emg-tab');
            tabs.forEach(tab => {
                tab.style.background = 'transparent';
                tab.style.color = '#64748b';
            });

            // Highlight active tab
            const activeTab = document.getElementById(sectionName + '-tab');
            if (activeTab) {
                activeTab.style.background = '#3b82f6';
                activeTab.style.color = 'white';
            }

            console.log('✅ EMG section switched to:', sectionName);
        }



        // Toggle Collapsible Podcasts Section
        function togglePodcastsCollapsible() {
            const container = document.getElementById('podcasts-collapsible-container');
            const icon = document.getElementById('podcast-toggle-icon');

            if (container.style.display === 'none' || container.style.display === '') {
                container.style.display = 'block';
                icon.textContent = '▲';
                icon.style.transform = 'rotate(180deg)';
                console.log('🎧 Expanded podcast list');
            } else {
                container.style.display = 'none';
                icon.textContent = '▼';
                icon.style.transform = 'rotate(0deg)';
                console.log('🎧 Collapsed podcast list');
            }
        }

        // Make functions globally available
        window.generateAtriumPathway = generateAtriumPathway;

        window.showModuleDescription = showModuleDescription;
        window.hideModuleDescription = hideModuleDescription;
        window.showEMGSection = showEMGSection;

        window.togglePodcastsCollapsible = togglePodcastsCollapsible;

        console.log('✨🎮 Enhanced Journey with Integrated Modal Systemeady!');
    


        function closeGeneralModal() {
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                // Fade out with transition
                overlay.classList.remove('show');

                // Hide after animation completes (increased to match slower transition)
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 700);

                console.log('🔒 Modal closed with transition');
            }
        }

        // Add CSS styles for modal and transitions
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
                /* Page transition effects */
                .page - transition {
                transition: all 0.8s cubic - bezier(0.4, 0, 0.2, 1);
            }

            .blur - out {
                filter: blur(20px);
                opacity: 0.3;
                transform: scale(0.95);
            }

            #modal - overlay {
                opacity: 0;
                backdrop - filter: blur(0px);
                transition: opacity 0.6s ease, backdrop - filter 0.6s ease;
            }

            #modal - overlay.show {
                opacity: 1;
                backdrop - filter: blur(8px);
            }

            #modal - overlay > div {
                opacity: 0;
                transform: scale(0.9) translateY(40px);
                transition: opacity 0.5s ease 0.2s, transform 0.5s cubic - bezier(0.4, 0, 0.2, 1) 0.2s;
            }

            #modal - overlay.show > div {
                opacity: 1;
                transform: scale(1) translateY(0);
            }

            #modal - overlay button:hover {
                background: #dc2626!important;
                transform: scale(1.1);
            }

            #modal - overlay.interactive - content {
                max - width: 100 %;
                margin: 0;
            }

            #modal - overlay.quiz - section {
                margin - bottom: 20px;
            }

            /* Transition for main content */
            #learning - board, #pgy - selection {
                transition: filter 0.6s ease, opacity 0.6s ease, transform 0.6s ease;
            }
        `;
        document.head.appendChild(modalStyles);

        // Close modal when clicking outside overlay
        document.addEventListener('DOMContentLoaded', function () {
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', function (e) {
                    // Check if click came from modal content by traversing up the DOM
                    let element = e.target;
                    while (element && element !== overlay) {
                        if (element.hasAttribute && element.hasAttribute('data-modal-content')) {
                            // Click is from modal content, don't close
                            return;
                        }
                        element = element.parentElement;
                    }

                    // Click is on overlay itself, close modal
                    if (e.target === overlay) {
                        closeGeneralModal();
                    }
                });
            }
        });

        // Add keyboard support for ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const overlay = document.getElementById('modal-overlay');
                if (overlay && overlay.style.display === 'flex') {
                    closeGeneralModal();
                }
            }
        });

        // Learning Objectives Modal Functions - Global Scope
        window.showLearningObjectives = function () {
            console.log('🎯 showLearningObjectives called');
            const modal = document.getElementById('learning-objectives-modal');
            console.log('📋 Modal element:', modal);
            if (modal) {
                console.log('✅ Modal found, displaying...');
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            } else {
                console.error('❌ Modal not found!');
            }
        };

        window.closeLearningObjectives = function () {
            console.warn('🚨 closeLearningObjectives() CALLED');
            console.warn('📍 Call stack:', new Error().stack);

            const modal = document.getElementById('learning-objectives-modal');
            if (modal) {
                console.warn('✅ Learning objectives modal found, hiding it');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else {
                console.warn('❌ Learning objectives modal NOT found');
            }
        };

        // Close modal when clicking outside content (with zoom gesture detection + DEBUG LOGGING)
        document.addEventListener('DOMContentLoaded', function () {
            const modal = document.getElementById('learning-objectives-modal');
            if (modal) {
                let touchStartTime = 0;
                let touchStartDistance = 0;

                // Track touch start for gesture detection
                modal.addEventListener('touchstart', function (e) {
                    touchStartTime = Date.now();
                    console.warn('📱 LEARNING-OBJ touchstart:', {
                        touches: e.touches.length,
                        target: e.target.tagName,
                        targetClass: e.target.className,
                        timestamp: touchStartTime
                    });

                    // If multi-touch, likely a zoom gesture
                    if (e.touches && e.touches.length > 1) {
                        const dx = e.touches[0].clientX - e.touches[1].clientX;
                        const dy = e.touches[0].clientY - e.touches[1].clientY;
                        touchStartDistance = Math.sqrt(dx * dx + dy * dy);
                        console.warn('🔍 LEARNING-OBJ MULTI-TOUCH:', {
                            distance: touchStartDistance,
                            touches: e.touches.length
                        });
                    } else {
                        touchStartDistance = 0;
                    }
                }, { passive: true });

                modal.addEventListener('click', function (e) {
                    // Only close if:
                    // 1. Click target is the modal overlay itself (not modal content)
                    // 2. Touch duration was reasonable (< 300ms suggests intentional tap)
                    // 3. No multi-touch detected (zoom gesture)
                    const touchDuration = Date.now() - touchStartTime;
                    const isModal = e.target === modal;
                    const isQuickTap = touchDuration < 300;
                    const isSingleTouch = touchStartDistance === 0;

                    console.warn('👆 LEARNING-OBJ click event:', {
                        target: e.target.tagName,
                        targetClass: e.target.className,
                        isModal: isModal,
                        touchDuration: touchDuration,
                        isQuickTap: isQuickTap,
                        touchStartDistance: touchStartDistance,
                        isSingleTouch: isSingleTouch,
                        willClose: isModal && isQuickTap && isSingleTouch
                    });

                    if (isModal && isQuickTap && isSingleTouch) {
                        console.warn('🚪 CLOSING learning objectives modal');
                        window.closeLearningObjectives();
                    } else {
                        console.warn('✋ NOT closing learning objectives - conditions not met');
                    }

                    // Reset for next interaction
                    touchStartTime = 0;
                    touchStartDistance = 0;
                });
            }
        });
    


        // Polyfill for closeModal to ensure it exists even if core.js module binding is delayed
        if (!window.closeModal) {
            window.closeModal = function () {
                console.log('Using global closeModal polyfill');
                const overlay = document.getElementById('modal-overlay');
                if (overlay) {
                    overlay.style.transition = 'opacity 0.3s ease'; // Ensure transition exists
                    overlay.style.opacity = '0'; // Start fade out
                    overlay.classList.remove('show');

                    // Wait for transition to finish
                    setTimeout(() => {
                        overlay.style.display = 'none';
                        overlay.style.opacity = ''; // Reset for next time (handled by class usually)
                    }, 300); // reduced from 500ms to match transition
                }

                // Also try the new transition method if available
                if (window.closeModalWithTransition) {
                    window.closeModalWithTransition();
                }
            };
        }
    

