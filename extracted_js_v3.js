        'use strict';
        
        /**
         * Main application namespace for nerve anatomy study tool
         */
        const NerveStudyApp = {
            // Application state
            currentNerve: null,
            currentStep: -1,
            quizQuestions: [],
            currentQuizIndex: 0,
            quizScore: 0,
            currentAnatomyTab: 'lower',
            
            // Cached DOM elements
            domCache: {},
            
            // Event listeners array for cleanup
            eventListeners: [],
            
            /**
             * Initialize the application when DOM is ready
             */
            init: function() {
                try {
                    this.cacheDOM();
                    this.bindEvents();
                    this.initializeMuscleAnatomy();
                    this.initializeEmgNcsTerms();
                    console.log('NerveStudyApp initialized successfully');
                } catch (error) {
                    console.error('Error initializing application:', error);
                }
            },
            
            /**
             * Cache frequently accessed DOM elements for performance
             */
            cacheDOM: function() {
                try {
                    this.domCache = {
                        nerveSelect: document.getElementById('nerve-select'),
                        pathwaySteps: document.getElementById('pathway-steps'),
                        storyText: document.getElementById('story-text'),
                        prevBtn: document.getElementById('prev-btn'),
                        nextBtn: document.getElementById('next-btn'),
                        quizContainer: document.getElementById('quiz-container'),
                        tabButtons: document.querySelectorAll('.tab-button'),
                        body: document.body
                    };
                } catch (error) {
                    console.error('Error caching DOM elements:', error);
                }
            },
            
            /**
             * Bind event listeners using modern event handling
             */
            bindEvents: function() {
                try {
                    // Nerve select dropdown
                    if (this.domCache.nerveSelect) {
                        const selectHandler = this.selectNerve.bind(this);
                        this.domCache.nerveSelect.addEventListener('change', selectHandler);
                        this.eventListeners.push({
                            element: this.domCache.nerveSelect,
                            event: 'change',
                            handler: selectHandler
                        });
                    }
                    
                    // Navigation buttons
                    if (this.domCache.prevBtn) {
                        const prevHandler = this.previousStep.bind(this);
                        this.domCache.prevBtn.addEventListener('click', prevHandler);
                        this.eventListeners.push({
                            element: this.domCache.prevBtn,
                            event: 'click',
                            handler: prevHandler
                        });
                    }
                    
                    if (this.domCache.nextBtn) {
                        const nextHandler = this.nextStep.bind(this);
                        this.domCache.nextBtn.addEventListener('click', nextHandler);
                        this.eventListeners.push({
                            element: this.domCache.nextBtn,
                            event: 'click',
                            handler: nextHandler
                        });
                    }
                    
                    // Tab buttons
                    this.domCache.tabButtons.forEach((button, index) => {
                        const tabHandler = () => this.showTab(index);
                        button.addEventListener('click', tabHandler);
                        this.eventListeners.push({
                            element: button,
                            event: 'click',
                            handler: tabHandler
                        });
                    });
                    
                } catch (error) {
                    console.error('Error binding events:', error);
                }
            },
            
            /**
             * Safe DOM element getter with error handling
             * @param {string} selector - CSS selector or element ID
             * @returns {Element|null} - Found element or null
             */
            safeGetElement: function(selector) {
                try {
                    if (!selector || typeof selector !== 'string') {
                        console.warn('Invalid selector provided:', selector);
                        return null;
                    }
                    
                    if (selector.startsWith('#')) {
                        return document.getElementById(selector.substring(1));
                    }
                    return document.querySelector(selector);
                } catch (error) {
                    console.warn('Element not found:', selector, error);
                    return null;
                }
            },
            
            /**
             * Safe DOM elements getter with error handling
             * @param {string} selector - CSS selector
             * @returns {NodeList} - Found elements or empty NodeList
             */
            safeGetElements: function(selector) {
                try {
                    if (!selector || typeof selector !== 'string') {
                        console.warn('Invalid selector provided:', selector);
                        return [];
                    }
                    return document.querySelectorAll(selector) || [];
                } catch (error) {
                    console.warn('Elements not found:', selector, error);
                    return [];
                }
            },
            
            /**
             * Cleanup function to remove event listeners
             */
            cleanup: function() {
                this.eventListeners.forEach(listener => {
                    try {
                        if (listener.element && listener.element.removeEventListener) {
                            listener.element.removeEventListener(listener.event, listener.handler);
                        }
                    } catch (error) {
                        console.warn('Error removing event listener:', error);
                    }
                });
                this.eventListeners = [];
            },
        
        // Nerve data
        nerveData: {
            median: {
                roots: "C5-T1",
                story: "The Median nerve forms from lateral and medial cords and travels through the carpal tunnel.",
                steps: [
                    {title: "Origin", desc: "Forms from lateral and medial cords of brachial plexus (C5-T1)"},
                    {title: "Upper Arm", desc: "Travels medially to humerus in bicipital groove"},
                    {title: "Cubital Fossa", desc: "Passes medial to brachial artery"},
                    {title: "Forearm Entry", desc: "Passes between heads of pronator teres"},
                    {title: "AIN Branch", desc: "Gives off anterior interosseous nerve"},
                    {title: "Carpal Tunnel", desc: "Passes through carpal tunnel"},
                    {title: "Hand", desc: "Divides into branches for thenar muscles (LOAF)"}
                ]
            },
            ulnar: {
                roots: "C8-T1",
                story: "The Ulnar Underdog begins his journey from the medial cord at Brachial Plexus Station (C8-T1), feeling a bit left out since he's not as popular as his median cousin. He takes the scenic route down the arm's medial side, making a dramatic appearance at the 'funny bone' - the medial epicondyle of the humerus. Here, he's so close to the surface that even a gentle bump makes him cry out! After this vulnerable moment, he dives deep into the forearm, hiding under the flexor carpi ulnaris muscle like a ninja in the shadows. His final destination is Guyon's Canal, a much more spacious tunnel than his cousin's carpal tunnel. Once in the hand, he becomes the master of the intrinsic muscles!",
                steps: [
                    {title: "Origin", desc: "Arises from medial cord (C8-T1)"},
                    {title: "Upper Arm", desc: "Travels along medial aspect of arm"},
                    {title: "Funny Bone", desc: "Passes behind medial epicondyle of humerus"},
                    {title: "Forearm", desc: "Runs deep to flexor carpi ulnaris"},
                    {title: "Wrist", desc: "Passes through Guyon's canal"},
                    {title: "Hand", desc: "Innervates hypothenar and intrinsic muscles"}
                ]
            },
            radial: {
                roots: "C5-T1",
                story: "The Radial Rebel is the daredevil of the nerve family! Starting from the posterior cord at Brachial Plexus HQ (C5-T1), he immediately heads to the back of the party - the posterior compartment. He's not afraid of taking risks, spiraling around the humerus in the radial groove like he's on a roller coaster! This adventurous route makes him vulnerable to 'Saturday Night Palsy' when someone falls asleep with their arm over a chair. At the elbow, he splits his personality - sending his deep branch to handle the tough extensor work while his superficial branch becomes a gentle sensory poet, providing feeling to the back of the hand.",
                steps: [
                    {title: "Origin", desc: "From posterior cord of brachial plexus (C5-T1)"},
                    {title: "Posterior Arm", desc: "Travels in radial groove of humerus"},
                    {title: "Lateral Elbow", desc: "Passes anteriorly around lateral elbow"},
                    {title: "Forearm Split", desc: "Divides into superficial and deep branches"},
                    {title: "Deep Branch", desc: "Posterior interosseous nerve innervates extensors"},
                    {title: "Superficial Branch", desc: "Provides sensation to dorsal hand"}
                ]
            },
            femoral: {
                roots: "L2-L4",
                story: "The Femoral Force is the powerhouse of the thigh! Born from the lumbar plexus (L2-L4), he's like a superhero emerging from the psoas muscle's secret lair. He makes his grand entrance to the thigh by sliding under the inguinal ligament, right next to the femoral artery - they're like best friends traveling together! His mission? To command the mighty Quadriceps Army - the strongest muscle group in the body!",
                steps: [
                    {title: "Origin", desc: "Forms from lumbar plexus (L2-L4)"},
                    {title: "Pelvis", desc: "Emerges lateral to psoas muscle"},
                    {title: "Inguinal Ligament", desc: "Passes under inguinal ligament"},
                    {title: "Anterior Thigh", desc: "Spreads into anterior compartment"},
                    {title: "Quadriceps", desc: "Innervates the quadriceps muscle group"}
                ]
            },
            tibial: {
                roots: "L4-S3",
                story: "The Tibial Titan is the marathon runner of the nerve world! Starting his journey as part of the mighty sciatic nerve (L4-S3), he eventually splits off to become the master of the posterior compartment. He loves the back of the leg, running down with the popliteal vessels like they're his running buddies. Behind the knee in the popliteal fossa, he takes a quick break before diving deep under the soleus muscle. His destination is the famous tarsal tunnel behind the medial malleolus, where he splits into his final forms. He's the plantarflexion champion!",
                steps: [
                    {title: "Origin", desc: "Branch of sciatic nerve (L4-S3)"},
                    {title: "Posterior Thigh", desc: "Travels with sciatic nerve"},
                    {title: "Popliteal Fossa", desc: "Continues through popliteal fossa"},
                    {title: "Posterior Leg", desc: "Runs deep in posterior compartment"},
                    {title: "Tarsal Tunnel", desc: "Passes through tarsal tunnel"},
                    {title: "Plantar Foot", desc: "Splits into medial and lateral plantar nerves"}
                ]
            }
        },

        /**
         * Show tab by index with proper error handling and input validation
         * @param {number} tabIndex - The index of the tab to show (0-5)
         */
        showTab: function(tabIndex) {
            // Input validation
            if (typeof tabIndex !== 'number' || tabIndex < 0 || tabIndex > 5) {
                console.warn('Invalid tab index:', tabIndex);
                return;
            }
            
            try {
                const tabIds = ['pathway-tab', 'quiz-tab', 'videos-tab', 'emg-tab', 'reference-tab', 'anatomy-tab'];
                
                // Remove any existing floating tabs
                const existingFloatingTabs = this.safeGetElements('.floating-tab');
                existingFloatingTabs.forEach(tab => {
                    if (tab && tab.remove) {
                        tab.remove();
                    }
                });
                
                // Remove active from all buttons
                const allButtons = this.safeGetElements('.tab-button');
                allButtons.forEach(button => {
                    if (button && button.classList) {
                        button.classList.remove('active');
                    }
                });
            
                // Create floating tab for ANY tab (including pathway explorer)
                if (tabIds[tabIndex]) {
                    const originalTab = this.safeGetElement(`#${tabIds[tabIndex]}`);
                    if (originalTab) {
                        const floatingTab = document.createElement('div');
                        floatingTab.className = 'floating-tab';
                        
                        // Add close button at the top
                        const closeButton = document.createElement('button');
                        closeButton.innerHTML = '✕ Close';
                        closeButton.style.cssText = 'position: absolute; top: 15px; right: 20px; background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; font-size: 14px; font-weight: bold; z-index: 101;';
                        
                        // Use modern event listener
                        const closeHandler = () => this.closeTab();
                        closeButton.addEventListener('click', closeHandler);
                        this.eventListeners.push({
                            element: closeButton,
                            event: 'click',
                            handler: closeHandler
                        });
                    
                        // Add tab title
                        const tabTitles = ['📍 Pathway Explorer', '🎯 Quiz Mode', '📹 NCS Videos', '⚡ EMG/NCS Terms', '📋 Quick Reference', '💪 Muscle Anatomy'];
                        const titleBar = document.createElement('div');
                        titleBar.innerHTML = `<h2 style="margin: 0 0 20px 0; color: #00a19b; padding-right: 100px;">${tabTitles[tabIndex]}</h2>`;
                        titleBar.style.cssText = 'border-bottom: 2px solid #00a19b; padding-bottom: 15px; margin-bottom: 25px;';
                        
                        // Content container
                        const contentDiv = document.createElement('div');
                        contentDiv.innerHTML = originalTab.innerHTML;
                        
                        // Assemble the floating tab
                        floatingTab.appendChild(closeButton);
                        floatingTab.appendChild(titleBar);
                        floatingTab.appendChild(contentDiv);
                        
                        // Center it properly using transform
                        floatingTab.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 1200px; min-height: 500px; max-height: 85vh; background: white; border: 3px solid #00a19b; border-radius: 15px; padding: 30px; z-index: 100; box-shadow: 0 15px 35px rgba(0,161,155,0.4); overflow-y: auto;';
                        
                        if (this.domCache.body) {
                            this.domCache.body.appendChild(floatingTab);
                        }
                        
                        console.log('Created floating tab popup:', tabTitles[tabIndex]);
                        
                        // Initialize content for specific tabs
                        if (tabIndex === 3) {
                            this.initializeEmgNcsTerms();
                        } else if (tabIndex === 5) {
                            this.initializeMuscleAnatomy();
                        }
                        
                        // Activate button
                        if (allButtons[tabIndex] && allButtons[tabIndex].classList) {
                            allButtons[tabIndex].classList.add('active');
                        }
                    }
                }
            } catch (error) {
                console.error('Error showing tab:', error);
            }
        },
        
        /**
         * Close the floating tab popup and return to main page
         */
        closeTab: function() {
            try {
                const existingFloatingTabs = this.safeGetElements('.floating-tab');
                existingFloatingTabs.forEach(tab => {
                    if (tab && tab.remove) {
                        tab.remove();
                    }
                });
                
                // Remove active from all buttons
                const allButtons = this.safeGetElements('.tab-button');
                allButtons.forEach(button => {
                    if (button && button.classList) {
                        button.classList.remove('active');
                    }
                });
                
                console.log('Closed popup, returned to main page');
            } catch (error) {
                console.error('Error closing tab:', error);
            }
        },

        /**
         * Handle nerve selection from dropdown with input validation
         */
        selectNerve: function() {
            try {
                const select = this.domCache.nerveSelect || this.safeGetElement('#nerve-select');
                if (!select) {
                    console.warn('Nerve select element not found');
                    return;
                }
                
                const nerveName = select.value;
                
                // Input validation
                if (!nerveName || typeof nerveName !== 'string') {
                    this.currentNerve = null;
                    this.currentStep = -1;
                    this.updateDisplay();
                    return;
                }
                
                if (!this.nerveData[nerveName]) {
                    console.warn('Invalid nerve selected:', nerveName);
                    this.currentNerve = null;
                    this.currentStep = -1;
                    this.updateDisplay();
                    return;
                }
                
                this.currentNerve = this.nerveData[nerveName];
                this.currentStep = -1;
                
                this.displayPathway();
                this.updateStory();
                this.updateDisplay();
            } catch (error) {
                console.error('Error selecting nerve:', error);
            }
        },

        /**
         * Display pathway steps for the current nerve
         */
        displayPathway: function() {
            try {
                if (!this.currentNerve || !this.currentNerve.steps) {
                    console.warn('No current nerve or steps available');
                    return;
                }
                
                const container = this.domCache.pathwaySteps || this.safeGetElement('#pathway-steps');
                if (!container) {
                    console.warn('Pathway steps container not found');
                    return;
                }
                
                container.innerHTML = '<h3>🗺️ Nerve Pathway</h3>';
                
                this.currentNerve.steps.forEach((step, index) => {
                    if (!step || !step.title || !step.desc) {
                        console.warn('Invalid step data:', step);
                        return;
                    }
                    
                    const stepDiv = document.createElement('div');
                    stepDiv.className = 'step';
                    stepDiv.innerHTML = `<strong>${step.title}</strong><br>${step.desc}<br><small>Roots: ${this.currentNerve.roots || 'Unknown'}</small>`;
                    
                    // Use modern event listener instead of onclick
                    const clickHandler = () => this.jumpToStep(index);
                    stepDiv.addEventListener('click', clickHandler);
                    this.eventListeners.push({
                        element: stepDiv,
                        event: 'click',
                        handler: clickHandler
                    });
                    
                    container.appendChild(stepDiv);
                });
            } catch (error) {
                console.error('Error displaying pathway:', error);
            }
        },

        /**
         * Update the story text based on current nerve selection
         */
        updateStory: function() {
            try {
                const storyElement = this.domCache.storyText || this.safeGetElement('#story-text');
                if (!storyElement) {
                    console.warn('Story text element not found');
                    return;
                }
                
                if (this.currentNerve && this.currentNerve.story && typeof this.currentNerve.story === 'string') {
                    storyElement.textContent = this.currentNerve.story;
                } else {
                    storyElement.textContent = 'Select a nerve to begin the journey through your anatomical adventure!';
                }
            } catch (error) {
                console.error('Error updating story:', error);
            }
        },

        /**
         * Navigate to the next step in the pathway
         */
        nextStep: function() {
            try {
                if (!this.currentNerve || !this.currentNerve.steps) {
                    console.warn('No current nerve available for navigation');
                    return;
                }
                
                if (this.currentStep >= this.currentNerve.steps.length - 1) {
                    console.log('Already at the last step');
                    return;
                }
                
                this.currentStep++;
                this.updateDisplay();
            } catch (error) {
                console.error('Error navigating to next step:', error);
            }
        },

        /**
         * Navigate to the previous step in the pathway
         */
        previousStep: function() {
            try {
                if (this.currentStep <= 0) {
                    console.log('Already at the first step');
                    return;
                }
                
                this.currentStep--;
                this.updateDisplay();
            } catch (error) {
                console.error('Error navigating to previous step:', error);
            }
        },

        /**
         * Jump to a specific step in the pathway
         * @param {number} index - The step index to jump to
         */
        jumpToStep: function(index) {
            try {
                // Input validation
                if (typeof index !== 'number' || index < 0) {
                    console.warn('Invalid step index:', index);
                    return;
                }
                
                if (!this.currentNerve || !this.currentNerve.steps) {
                    console.warn('No current nerve available for navigation');
                    return;
                }
                
                if (index >= this.currentNerve.steps.length) {
                    console.warn('Step index out of range:', index);
                    return;
                }
                
                this.currentStep = index;
                this.updateDisplay();
            } catch (error) {
                console.error('Error jumping to step:', error);
            }
        },

        /**
         * Reset the pathway to the beginning
         */
        resetPathway: function() {
            try {
                this.currentStep = -1;
                this.updateDisplay();
                this.updateStory();
            } catch (error) {
                console.error('Error resetting pathway:', error);
            }
        },

        // Update display based on current step
        updateDisplay: function() {
            var steps = document.querySelectorAll('.step');
            var prevBtn = document.getElementById('prev-btn');
            var nextBtn = document.getElementById('next-btn');
            
            // Update step appearance
            for (var i = 0; i < steps.length; i++) {
                var step = steps[i];
                step.classList.remove('current', 'revealed');
                if (i < this.currentStep) {
                    step.classList.add('revealed');
                    step.style.opacity = '1';
                    step.style.borderLeftColor = 'var(--success-color)';
                    step.style.transform = 'translateX(5px)';
                } else if (i === this.currentStep) {
                    step.classList.add('current', 'revealed');
                    step.style.opacity = '1';
                    step.style.borderLeftColor = 'var(--accent-color)';
                    step.style.backgroundColor = '#e0f7f6';
                    step.style.transform = 'translateX(5px)';
                } else {
                    step.style.opacity = '0.3';
                    step.style.borderLeftColor = '#6c757d';
                    step.style.backgroundColor = 'var(--white)';
                    step.style.transform = 'translateX(0)';
                }
            }
            
            // Update button states
            if (prevBtn) {
                prevBtn.disabled = this.currentStep <= 0;
            }
            if (nextBtn) {
                nextBtn.disabled = !this.currentNerve || this.currentStep >= this.currentNerve.steps.length - 1;
            }
        },

        // Quiz system
        startQuiz: function() {
            this.generateQuizQuestions();
            this.currentQuizIndex = 0;
            this.quizScore = 0;
            this.displayQuizQuestion();
        },

        generateQuizQuestions: function() {
            this.quizQuestions = [
                {
                    question: "Which nerve passes through the carpal tunnel?",
                    options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Dorsal scapular nerve"],
                    correct: 0,
                    explanation: "The median nerve is the only major nerve that passes through the carpal tunnel."
                },
                {
                    question: "What are the nerve roots of the ulnar nerve?",
                    options: ["C5-C6", "C6-C8", "C8-T1", "L2-L4"],
                    correct: 2,
                    explanation: "The ulnar nerve arises from C8-T1 nerve roots from the medial cord."
                },
                {
                    question: "Which nerve is most commonly injured in 'Saturday Night Palsy'?",
                    options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Femoral nerve"],
                    correct: 2,
                    explanation: "The radial nerve is vulnerable in the spiral groove and can be compressed when the arm hangs over a chair."
                },
                {
                    question: "The quadriceps femoris muscle group is innervated by which nerve?",
                    options: ["Sciatic nerve", "Obturator nerve", "Femoral nerve", "Superior gluteal nerve"],
                    correct: 2,
                    explanation: "The femoral nerve innervates all four heads of the quadriceps femoris muscle (L2, L3, L4)."
                },
                {
                    question: "Which nerve travels in the spiral groove of the humerus?",
                    options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Musculocutaneous nerve"],
                    correct: 2,
                    explanation: "The radial nerve travels in the spiral (radial) groove on the posterior aspect of the humerus."
                },
                {
                    question: "The ulnar nerve is most vulnerable to injury at which anatomical location?",
                    options: ["Carpal tunnel", "Cubital tunnel", "Guyon's canal", "Spiral groove"],
                    correct: 1,
                    explanation: "The ulnar nerve is most commonly entrapped at the cubital tunnel (behind the medial epicondyle), causing cubital tunnel syndrome."
                },
                {
                    question: "Common peroneal nerve palsy typically occurs due to compression at which location?",
                    options: ["Tarsal tunnel", "Fibular head", "Popliteal fossa", "Ankle"],
                    correct: 1,
                    explanation: "The common peroneal nerve wraps around the fibular head, making it vulnerable to compression from leg crossing, casts, or direct trauma."
                },
                {
                    question: "Which nerve innervates the interosseous muscles of the hand?",
                    options: ["Median nerve", "Radial nerve", "Ulnar nerve", "Anterior interosseous nerve"],
                    correct: 2,
                    explanation: "The ulnar nerve (deep branch) innervates all interosseous muscles of the hand, both dorsal and palmar."
                },
                {
                    question: "A patient cannot make an 'OK' sign (opposition of thumb and index finger). Which nerve is likely affected?",
                    options: ["Ulnar nerve", "Radial nerve", "Median nerve", "Musculocutaneous nerve"],
                    correct: 2,
                    explanation: "Inability to make an 'OK' sign indicates median nerve palsy affecting the anterior interosseous nerve branch."
                },
                {
                    question: "Foot drop (inability to dorsiflex the foot) is typically caused by injury to which nerve?",
                    options: ["Tibial nerve", "Superficial peroneal nerve", "Deep peroneal nerve", "Sural nerve"],
                    correct: 2,
                    explanation: "The deep peroneal nerve innervates the dorsiflexors (tibialis anterior, etc.), so its injury causes foot drop."
                },
                {
                    question: "A patient has weakness gripping paper between fingers (Froment's sign). Which nerve is affected?",
                    options: ["Median nerve", "Radial nerve", "Ulnar nerve", "Posterior interosseous nerve"],
                    correct: 2,
                    explanation: "Froment's sign indicates ulnar nerve palsy affecting the adductor pollicis muscle."
                },
                {
                    question: "The tibial nerve passes through which anatomical structure at the ankle?",
                    options: ["Carpal tunnel", "Tarsal tunnel", "Cubital tunnel", "Guyon's canal"],
                    correct: 1,
                    explanation: "The tibial nerve passes through the tarsal tunnel behind the medial malleolus."
                },
                {
                    question: "Which muscle is innervated by BOTH the median and ulnar nerves?",
                    options: ["Flexor digitorum profundus", "Flexor pollicis brevis", "Pronator teres", "Flexor carpi radialis"],
                    correct: 1,
                    explanation: "The flexor pollicis brevis has dual innervation: superficial head by median nerve, deep head by ulnar nerve."
                },
                {
                    question: "A patient presents with 'winging' of the scapula. Which nerve is most likely injured?",
                    options: ["Suprascapular nerve", "Long thoracic nerve", "Dorsal scapular nerve", "Spinal accessory nerve"],
                    correct: 1,
                    explanation: "Long thoracic nerve palsy causes serratus anterior weakness, resulting in scapular winging."
                },
                {
                    question: "The 'hand of benediction' sign is associated with which nerve palsy?",
                    options: ["Ulnar nerve", "Radial nerve", "Median nerve", "Musculocutaneous nerve"],
                    correct: 2,
                    explanation: "The 'hand of benediction' occurs with median nerve palsy when attempting to make a fist, due to loss of finger flexors."
                }
            ];
        },

        displayQuizQuestion: function() {
            if (this.currentQuizIndex >= this.quizQuestions.length) {
                this.displayQuizResults();
                return;
            }

            var question = this.quizQuestions[this.currentQuizIndex];
            var container = document.getElementById('quiz-container');
            
            var html = '<div style="background: #e8f4f4; border-radius: 10px; padding: 25px; border: 2px solid var(--accent-color);">';
            html += '<h3>Question ' + (this.currentQuizIndex + 1) + ' of ' + this.quizQuestions.length + '</h3>';
            html += '<p><strong>' + question.question + '</strong></p>';
            html += '<div id="quiz-options">';
            
            for (var i = 0; i < question.options.length; i++) {
                html += '<div class="quiz-option" onclick="selectAnswer(' + i + ')" style="background: var(--white); margin: 10px 0; padding: 15px; border-radius: 8px; cursor: pointer; border: 2px solid #dee2e6;">' + question.options[i] + '</div>';
            }
            
            html += '</div>';
            html += '<div id="quiz-feedback" style="margin-top: 20px;"></div>';
            html += '</div>';
            
            container.innerHTML = html;
        },

        selectAnswer: function(selectedIndex) {
            var question = this.quizQuestions[this.currentQuizIndex];
            var options = document.querySelectorAll('.quiz-option');
            var feedback = document.getElementById('quiz-feedback');
            
            // Disable all options
            for (var i = 0; i < options.length; i++) {
                options[i].style.pointerEvents = 'none';
                if (i === question.correct) {
                    options[i].style.backgroundColor = '#d4edda';
                    options[i].style.borderColor = 'var(--success-color)';
                } else if (i === selectedIndex) {
                    options[i].style.backgroundColor = '#f8d7da';
                    options[i].style.borderColor = 'var(--danger-color)';
                }
            }
            
            // Provide feedback
            if (selectedIndex === question.correct) {
                this.quizScore++;
                feedback.innerHTML = '<div style="color: var(--success-color); font-weight: bold;">✅ Correct! ' + question.explanation + '</div>';
            } else {
                feedback.innerHTML = '<div style="color: var(--danger-color); font-weight: bold;">❌ Incorrect. ' + question.explanation + '</div>';
            }
            
            // Move to next question after delay
            var self = this;
            setTimeout(function() {
                self.currentQuizIndex++;
                self.displayQuizQuestion();
            }, 3000);
        },

        displayQuizResults: function() {
            var container = document.getElementById('quiz-container');
            var percentage = Math.round((this.quizScore / this.quizQuestions.length) * 100);
            
            var message = '';
            if (percentage >= 80) {
                message = 'Excellent work! You are mastering nerve anatomy!';
            } else if (percentage >= 60) {
                message = 'Good job! Keep studying to improve further.';
            } else {
                message = 'Keep practicing! Review the pathway explorer and try again.';
            }
            
            var html = '<div style="background: #e8f4f4; border-radius: 10px; padding: 25px; border: 2px solid var(--accent-color); text-align: center;">';
            html += '<h2>🎉 Quiz Complete!</h2>';
            html += '<h3>Your Score: ' + this.quizScore + '/' + this.quizQuestions.length + ' (' + percentage + '%)</h3>';
            html += '<p>' + message + '</p>';
            html += '<button class="btn" onclick="startQuiz()">🔄 Retake Quiz</button>';
            html += '<button class="btn" onclick="showTab(0)">📍 Back to Pathway Explorer</button>';
            html += '</div>';
            
            container.innerHTML = html;
        },

        // Muscle Anatomy Variables and Data
        currentAnatomyTab: 'lower',

        lowerExtremityData: {
            gluteal: [
                {
                    name: "Gluteus Maximus",
                    nerve: "Inferior gluteal nerve",
                    roots: "L5, S1, S2",
                    actions: "Hip extension, lateral rotation, upper fibers assist in abduction"
                },
                {
                    name: "Gluteus Medius",
                    nerve: "Superior gluteal nerve",
                    roots: "L4, L5, S1",
                    actions: "Hip abduction, medial rotation (anterior fibers), lateral rotation (posterior fibers)"
                },
                {
                    name: "Gluteus Minimus",
                    nerve: "Superior gluteal nerve",
                    roots: "L4, L5, S1",
                    actions: "Hip abduction, medial rotation, stabilizes pelvis"
                },
                {
                    name: "Tensor Fasciae Latae",
                    nerve: "Superior gluteal nerve",
                    roots: "L4, L5, S1",
                    actions: "Hip flexion, abduction, medial rotation, stabilizes IT band"
                },
                {
                    name: "Piriformis",
                    nerve: "Nerve to piriformis",
                    roots: "S1, S2",
                    actions: "Hip lateral rotation, abduction when hip is flexed"
                },
                {
                    name: "Superior Gemellus",
                    nerve: "Nerve to obturator internus",
                    roots: "L5, S1",
                    actions: "Hip lateral rotation"
                },
                {
                    name: "Obturator Internus",
                    nerve: "Nerve to obturator internus",
                    roots: "L5, S1",
                    actions: "Hip lateral rotation"
                },
                {
                    name: "Inferior Gemellus",
                    nerve: "Nerve to quadratus femoris",
                    roots: "L5, S1",
                    actions: "Hip lateral rotation"
                },
                {
                    name: "Quadratus Femoris",
                    nerve: "Nerve to quadratus femoris",
                    roots: "L5, S1",
                    actions: "Hip lateral rotation, adduction"
                },
                {
                    name: "Obturator Externus",
                    nerve: "Obturator nerve",
                    roots: "L3, L4",
                    actions: "Hip lateral rotation"
                }
            ],
            thigh: [
                {
                    name: "Rectus Femoris",
                    nerve: "Femoral nerve",
                    roots: "L2, L3, L4",
                    actions: "Hip flexion, knee extension"
                },
                {
                    name: "Vastus Lateralis",
                    nerve: "Femoral nerve",
                    roots: "L2, L3, L4",
                    actions: "Knee extension"
                },
                {
                    name: "Vastus Medialis",
                    nerve: "Femoral nerve",
                    roots: "L2, L3, L4",
                    actions: "Knee extension, stabilizes patella"
                },
                {
                    name: "Vastus Intermedius",
                    nerve: "Femoral nerve",
                    roots: "L2, L3, L4",
                    actions: "Knee extension"
                },
                {
                    name: "Sartorius",
                    nerve: "Femoral nerve",
                    roots: "L2, L3",
                    actions: "Hip flexion, abduction, lateral rotation; knee flexion"
                },
                {
                    name: "Iliopsoas (Psoas Major)",
                    nerve: "Branches from lumbar plexus",
                    roots: "L1, L2, L3",
                    actions: "Hip flexion, trunk flexion"
                },
                {
                    name: "Iliopsoas (Iliacus)",
                    nerve: "Femoral nerve",
                    roots: "L2, L3",
                    actions: "Hip flexion"
                },
                {
                    name: "Pectineus",
                    nerve: "Femoral nerve (sometimes obturator)",
                    roots: "L2, L3",
                    actions: "Hip flexion, adduction"
                },
                {
                    name: "Adductor Longus",
                    nerve: "Obturator nerve",
                    roots: "L2, L3, L4",
                    actions: "Hip adduction, flexion"
                },
                {
                    name: "Adductor Brevis",
                    nerve: "Obturator nerve",
                    roots: "L2, L3, L4",
                    actions: "Hip adduction, flexion"
                },
                {
                    name: "Adductor Magnus",
                    nerve: "Obturator nerve (adductor part), sciatic nerve (hamstring part)",
                    roots: "L2, L3, L4 (obturator); L4, L5, S1 (sciatic)",
                    actions: "Hip adduction, extension (posterior fibers)"
                },
                {
                    name: "Gracilis",
                    nerve: "Obturator nerve",
                    roots: "L2, L3",
                    actions: "Hip adduction, knee flexion"
                },
                {
                    name: "Biceps Femoris (Long Head)",
                    nerve: "Sciatic nerve (tibial division)",
                    roots: "L5, S1, S2",
                    actions: "Hip extension, knee flexion, lateral rotation"
                },
                {
                    name: "Biceps Femoris (Short Head)",
                    nerve: "Sciatic nerve (common fibular division)",
                    roots: "L5, S1, S2",
                    actions: "Knee flexion, lateral rotation"
                },
                {
                    name: "Semitendinosus",
                    nerve: "Sciatic nerve (tibial division)",
                    roots: "L5, S1, S2",
                    actions: "Hip extension, knee flexion, medial rotation"
                },
                {
                    name: "Semimembranosus",
                    nerve: "Sciatic nerve (tibial division)",
                    roots: "L5, S1, S2",
                    actions: "Hip extension, knee flexion, medial rotation"
                }
            ],
            leg: [
                {
                    name: "Tibialis Anterior",
                    nerve: "Deep fibular nerve",
                    roots: "L4, L5",
                    actions: "Ankle dorsiflexion, foot inversion"
                },
                {
                    name: "Extensor Digitorum Longus",
                    nerve: "Deep fibular nerve",
                    roots: "L5, S1",
                    actions: "Toe extension, ankle dorsiflexion"
                },
                {
                    name: "Extensor Hallucis Longus",
                    nerve: "Deep fibular nerve",
                    roots: "L5, S1",
                    actions: "Great toe extension, ankle dorsiflexion"
                },
                {
                    name: "Fibularis Tertius",
                    nerve: "Deep fibular nerve",
                    roots: "L5, S1",
                    actions: "Ankle dorsiflexion, foot eversion"
                },
                {
                    name: "Fibularis Longus",
                    nerve: "Superficial fibular nerve",
                    roots: "L5, S1, S2",
                    actions: "Foot eversion, ankle plantarflexion"
                },
                {
                    name: "Fibularis Brevis",
                    nerve: "Superficial fibular nerve",
                    roots: "L5, S1, S2",
                    actions: "Foot eversion, ankle plantarflexion"
                },
                {
                    name: "Gastrocnemius",
                    nerve: "Tibial nerve",
                    roots: "S1, S2",
                    actions: "Ankle plantarflexion, knee flexion"
                },
                {
                    name: "Soleus",
                    nerve: "Tibial nerve",
                    roots: "S1, S2",
                    actions: "Ankle plantarflexion"
                },
                {
                    name: "Plantaris",
                    nerve: "Tibial nerve",
                    roots: "S1, S2",
                    actions: "Ankle plantarflexion, knee flexion"
                },
                {
                    name: "Popliteus",
                    nerve: "Tibial nerve",
                    roots: "L4, L5, S1",
                    actions: "Knee flexion, unlocks knee, tibial medial rotation"
                },
                {
                    name: "Tibialis Posterior",
                    nerve: "Tibial nerve",
                    roots: "L4, L5",
                    actions: "Ankle plantarflexion, foot inversion"
                },
                {
                    name: "Flexor Digitorum Longus",
                    nerve: "Tibial nerve",
                    roots: "S2, S3",
                    actions: "Toe flexion, ankle plantarflexion, foot inversion"
                },
                {
                    name: "Flexor Hallucis Longus",
                    nerve: "Tibial nerve",
                    roots: "S2, S3",
                    actions: "Great toe flexion, ankle plantarflexion"
                }
            ],
            foot: [
                {
                    name: "Extensor Digitorum Brevis",
                    nerve: "Deep fibular nerve",
                    roots: "L5, S1",
                    actions: "Extension of toes 2-4"
                },
                {
                    name: "Extensor Hallucis Brevis",
                    nerve: "Deep fibular nerve",
                    roots: "L5, S1",
                    actions: "Great toe extension"
                },
                {
                    name: "Abductor Hallucis",
                    nerve: "Medial plantar nerve",
                    roots: "S2, S3",
                    actions: "Great toe abduction, flexion"
                },
                {
                    name: "Flexor Digitorum Brevis",
                    nerve: "Medial plantar nerve",
                    roots: "S2, S3",
                    actions: "Flexion of toes 2-5"
                },
                {
                    name: "Abductor Digiti Minimi",
                    nerve: "Lateral plantar nerve",
                    roots: "S2, S3",
                    actions: "5th toe abduction, flexion"
                },
                {
                    name: "Quadratus Plantae",
                    nerve: "Lateral plantar nerve",
                    roots: "S2, S3",
                    actions: "Assists flexor digitorum longus"
                },
                {
                    name: "Lumbricals (1st)",
                    nerve: "Medial plantar nerve",
                    roots: "S2, S3",
                    actions: "MTP flexion, IP extension of 2nd toe"
                },
                {
                    name: "Lumbricals (2nd-4th)",
                    nerve: "Lateral plantar nerve",
                    roots: "S2, S3",
                    actions: "MTP flexion, IP extension of toes 3-5"
                },
                {
                    name: "Flexor Hallucis Brevis",
                    nerve: "Medial plantar nerve",
                    roots: "S2, S3",
                    actions: "Great toe flexion"
                },
                {
                    name: "Adductor Hallucis",
                    nerve: "Lateral plantar nerve",
                    roots: "S2, S3",
                    actions: "Great toe adduction"
                },
                {
                    name: "Flexor Digiti Minimi Brevis",
                    nerve: "Lateral plantar nerve",
                    roots: "S2, S3",
                    actions: "5th toe flexion"
                },
                {
                    name: "Plantar Interossei (3 muscles)",
                    nerve: "Lateral plantar nerve",
                    roots: "S2, S3",
                    actions: "Toe adduction toward 2nd toe"
                },
                {
                    name: "Dorsal Interossei (4 muscles)",
                    nerve: "Lateral plantar nerve",
                    roots: "S2, S3",
                    actions: "Toe abduction from 2nd toe"
                }
            ]
        },

        upperExtremityData: {
            shoulder: [
                {
                    name: "Trapezius (Upper)",
                    nerve: "Accessory nerve (XI) + C3, C4",
                    roots: "C3, C4",
                    cords: "N/A (cranial nerve)",
                    actions: "Elevates scapula, upward rotation, extends neck"
                },
                {
                    name: "Trapezius (Middle)",
                    nerve: "Accessory nerve (XI) + C3, C4",
                    roots: "C3, C4",
                    cords: "N/A (cranial nerve)",
                    actions: "Retracts scapula, stabilizes scapula"
                },
                {
                    name: "Trapezius (Lower)",
                    nerve: "Accessory nerve (XI) + C3, C4",
                    roots: "C3, C4",
                    cords: "N/A (cranial nerve)",
                    actions: "Depresses scapula, upward rotation"
                },
                {
                    name: "Rhomboid Major",
                    nerve: "Dorsal scapular nerve",
                    roots: "C5",
                    cords: "From nerve roots (pre-plexus)",
                    actions: "Retracts scapula, downward rotation, elevates scapula"
                },
                {
                    name: "Rhomboid Minor",
                    nerve: "Dorsal scapular nerve",
                    roots: "C5",
                    cords: "From nerve roots (pre-plexus)",
                    actions: "Retracts scapula, downward rotation, elevates scapula"
                },
                {
                    name: "Levator Scapulae",
                    nerve: "Dorsal scapular nerve + C3, C4",
                    roots: "C3, C4, C5",
                    cords: "From nerve roots (pre-plexus)",
                    actions: "Elevates scapula, downward rotation"
                },
                {
                    name: "Serratus Anterior",
                    nerve: "Long thoracic nerve",
                    roots: "C5, C6, C7",
                    cords: "From nerve roots (pre-plexus)",
                    actions: "Protracts scapula, upward rotation, stabilizes scapula"
                },
                {
                    name: "Pectoralis Major (Clavicular)",
                    nerve: "Lateral pectoral nerve",
                    roots: "C5, C6, C7",
                    cords: "Lateral cord",
                    actions: "Shoulder flexion, adduction, horizontal adduction"
                },
                {
                    name: "Pectoralis Major (Sternocostal)",
                    nerve: "Medial pectoral nerve",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Shoulder adduction, extension, horizontal adduction"
                },
                {
                    name: "Pectoralis Minor",
                    nerve: "Medial pectoral nerve",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Depresses scapula, protracts scapula, downward rotation"
                },
                {
                    name: "Subclavius",
                    nerve: "Nerve to subclavius",
                    roots: "C5, C6",
                    cords: "Upper trunk",
                    actions: "Depresses clavicle, stabilizes sternoclavicular joint"
                },
                {
                    name: "Deltoid (Anterior)",
                    nerve: "Axillary nerve",
                    roots: "C5, C6",
                    cords: "Posterior cord",
                    actions: "Shoulder flexion, horizontal adduction"
                },
                {
                    name: "Deltoid (Middle)",
                    nerve: "Axillary nerve",
                    roots: "C5, C6",
                    cords: "Posterior cord",
                    actions: "Shoulder abduction"
                },
                {
                    name: "Deltoid (Posterior)",
                    nerve: "Axillary nerve",
                    roots: "C5, C6",
                    cords: "Posterior cord",
                    actions: "Shoulder extension, horizontal abduction"
                },
                {
                    name: "Supraspinatus",
                    nerve: "Suprascapular nerve",
                    roots: "C5, C6",
                    cords: "Upper trunk",
                    actions: "Shoulder abduction, stabilizes humeral head"
                },
                {
                    name: "Infraspinatus",
                    nerve: "Suprascapular nerve",
                    roots: "C5, C6",
                    cords: "Upper trunk",
                    actions: "Shoulder external rotation, stabilizes humeral head"
                },
                {
                    name: "Teres Minor",
                    nerve: "Axillary nerve",
                    roots: "C5, C6",
                    cords: "Posterior cord",
                    actions: "Shoulder external rotation, stabilizes humeral head"
                },
                {
                    name: "Subscapularis",
                    nerve: "Upper & lower subscapular nerves",
                    roots: "C5, C6, C7",
                    cords: "Posterior cord",
                    actions: "Shoulder internal rotation, stabilizes humeral head"
                },
                {
                    name: "Teres Major",
                    nerve: "Lower subscapular nerve",
                    roots: "C6, C7",
                    cords: "Posterior cord",
                    actions: "Shoulder adduction, extension, internal rotation"
                },
                {
                    name: "Latissimus Dorsi",
                    nerve: "Thoracodorsal nerve",
                    roots: "C6, C7, C8",
                    cords: "Posterior cord",
                    actions: "Shoulder adduction, extension, internal rotation"
                }
            ],
            arm: [
                {
                    name: "Biceps Brachii (Long Head)",
                    nerve: "Musculocutaneous nerve",
                    roots: "C5, C6, C7",
                    cords: "Lateral cord",
                    actions: "Elbow flexion, forearm supination, shoulder flexion"
                },
                {
                    name: "Biceps Brachii (Short Head)",
                    nerve: "Musculocutaneous nerve",
                    roots: "C5, C6, C7",
                    cords: "Lateral cord",
                    actions: "Elbow flexion, forearm supination, shoulder adduction"
                },
                {
                    name: "Brachialis",
                    nerve: "Musculocutaneous nerve + radial nerve",
                    roots: "C5, C6, C7 + C7, C8, T1",
                    cords: "Lateral cord + posterior cord",
                    actions: "Elbow flexion"
                },
                {
                    name: "Coracobrachialis",
                    nerve: "Musculocutaneous nerve",
                    roots: "C5, C6, C7",
                    cords: "Lateral cord",
                    actions: "Shoulder flexion, adduction"
                },
                {
                    name: "Triceps Brachii (Long Head)",
                    nerve: "Radial nerve",
                    roots: "C6, C7, C8, T1",
                    cords: "Posterior cord",
                    actions: "Elbow extension, shoulder extension, adduction"
                },
                {
                    name: "Triceps Brachii (Lateral Head)",
                    nerve: "Radial nerve",
                    roots: "C6, C7, C8, T1",
                    cords: "Posterior cord",
                    actions: "Elbow extension"
                },
                {
                    name: "Triceps Brachii (Medial Head)",
                    nerve: "Radial nerve",
                    roots: "C6, C7, C8, T1",
                    cords: "Posterior cord",
                    actions: "Elbow extension"
                },
                {
                    name: "Anconeus",
                    nerve: "Radial nerve",
                    roots: "C7, C8, T1",
                    cords: "Posterior cord",
                    actions: "Elbow extension, stabilizes elbow joint"
                }
            ],
            forearm: [
                {
                    name: "Pronator Teres",
                    nerve: "Median nerve",
                    roots: "C6, C7",
                    cords: "Lateral & medial cords",
                    actions: "Forearm pronation, elbow flexion"
                },
                {
                    name: "Flexor Carpi Radialis",
                    nerve: "Median nerve",
                    roots: "C6, C7",
                    cords: "Lateral & medial cords",
                    actions: "Wrist flexion, radial deviation"
                },
                {
                    name: "Palmaris Longus",
                    nerve: "Median nerve",
                    roots: "C7, C8",
                    cords: "Lateral & medial cords",
                    actions: "Wrist flexion, tenses palmar aponeurosis"
                },
                {
                    name: "Flexor Digitorum Superficialis",
                    nerve: "Median nerve",
                    roots: "C7, C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "Finger PIP flexion, wrist flexion"
                },
                {
                    name: "Flexor Digitorum Profundus (Radial)",
                    nerve: "Anterior interosseous nerve (median)",
                    roots: "C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "Finger DIP flexion (index, middle), wrist flexion"
                },
                {
                    name: "Flexor Digitorum Profundus (Ulnar)",
                    nerve: "Ulnar nerve",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Finger DIP flexion (ring, little), wrist flexion"
                },
                {
                    name: "Flexor Pollicis Longus",
                    nerve: "Anterior interosseous nerve (median)",
                    roots: "C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "Thumb IP flexion, wrist flexion"
                },
                {
                    name: "Pronator Quadratus",
                    nerve: "Anterior interosseous nerve (median)",
                    roots: "C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "Forearm pronation"
                },
                {
                    name: "Flexor Carpi Ulnaris",
                    nerve: "Ulnar nerve",
                    roots: "C7, C8, T1",
                    cords: "Medial cord",
                    actions: "Wrist flexion, ulnar deviation"
                },
                {
                    name: "Brachioradialis",
                    nerve: "Radial nerve",
                    roots: "C5, C6, C7",
                    cords: "Posterior cord",
                    actions: "Elbow flexion, forearm to neutral position"
                },
                {
                    name: "Extensor Carpi Radialis Longus",
                    nerve: "Radial nerve",
                    roots: "C6, C7",
                    cords: "Posterior cord",
                    actions: "Wrist extension, radial deviation"
                },
                {
                    name: "Extensor Carpi Radialis Brevis",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Wrist extension, radial deviation"
                },
                {
                    name: "Extensor Digitorum",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Finger extension, wrist extension"
                },
                {
                    name: "Extensor Digiti Minimi",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Little finger extension"
                },
                {
                    name: "Extensor Carpi Ulnaris",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Wrist extension, ulnar deviation"
                },
                {
                    name: "Supinator",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Forearm supination"
                },
                {
                    name: "Abductor Pollicis Longus",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Thumb abduction, wrist radial deviation"
                },
                {
                    name: "Extensor Pollicis Brevis",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Thumb extension, abduction"
                },
                {
                    name: "Extensor Pollicis Longus",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Thumb extension, adduction"
                },
                {
                    name: "Extensor Indicis",
                    nerve: "Posterior interosseous nerve (radial)",
                    roots: "C7, C8",
                    cords: "Posterior cord",
                    actions: "Index finger extension"
                }
            ],
            hand: [
                {
                    name: "Abductor Pollicis Brevis",
                    nerve: "Median nerve (recurrent branch)",
                    roots: "C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "Thumb abduction"
                },
                {
                    name: "Flexor Pollicis Brevis (Superficial)",
                    nerve: "Median nerve (recurrent branch)",
                    roots: "C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "Thumb MCP flexion"
                },
                {
                    name: "Flexor Pollicis Brevis (Deep)",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Thumb MCP flexion"
                },
                {
                    name: "Opponens Pollicis",
                    nerve: "Median nerve (recurrent branch)",
                    roots: "C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "Thumb opposition"
                },
                {
                    name: "Adductor Pollicis",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Thumb adduction"
                },
                {
                    name: "Abductor Digiti Minimi",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Little finger abduction"
                },
                {
                    name: "Flexor Digiti Minimi Brevis",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Little finger MCP flexion"
                },
                {
                    name: "Opponens Digiti Minimi",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Little finger opposition"
                },
                {
                    name: "Lumbricals (1st & 2nd)",
                    nerve: "Median nerve",
                    roots: "C8, T1",
                    cords: "Lateral & medial cords",
                    actions: "MCP flexion, IP extension (index, middle)"
                },
                {
                    name: "Lumbricals (3rd & 4th)",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "MCP flexion, IP extension (ring, little)"
                },
                {
                    name: "Palmar Interossei",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Finger adduction toward middle finger"
                },
                {
                    name: "Dorsal Interossei",
                    nerve: "Ulnar nerve (deep branch)",
                    roots: "C8, T1",
                    cords: "Medial cord",
                    actions: "Finger abduction from middle finger"
                }
            ]
        },

        // EMG/NCS Terms Data
        emgNcsTermsData: {
            amplitudes: [
                {
                    term: "CMAP",
                    definition: "Compound Muscle Action Potential - The summated response of all muscle fibers innervated by a motor nerve when stimulated",
                    category: "Amplitudes"
                },
                {
                    term: "SNAP",
                    definition: "Sensory Nerve Action Potential - The electrical response of sensory nerve fibers to stimulation",
                    category: "Amplitudes"
                },
                {
                    term: "Amplitude",
                    definition: "The maximum voltage difference between positive and negative peaks of an action potential, measured in mV for motor responses and μV for sensory responses",
                    category: "Amplitudes"
                },
                {
                    term: "Duration",
                    definition: "The time from initial deflection to return to baseline, measured in milliseconds",
                    category: "Amplitudes"
                }
            ],
            latencies: [
                {
                    term: "Distal Latency",
                    definition: "The time between stimulus onset and the onset of the response when stimulating at the most distal point",
                    category: "Latencies"
                },
                {
                    term: "Proximal Latency",
                    definition: "The time between stimulus onset and the onset of the response when stimulating at a more proximal point",
                    category: "Latencies"
                },
                {
                    term: "Onset Latency",
                    definition: "The time from stimulus artifact to the initial deflection from baseline",
                    category: "Latencies"
                },
                {
                    term: "Peak Latency",
                    definition: "The time from stimulus artifact to the maximum negative peak of the response",
                    category: "Latencies"
                }
            ],
            conduction: [
                {
                    term: "Conduction Velocity",
                    definition: "The speed of nerve impulse transmission, calculated as distance divided by conduction time (m/s)",
                    category: "Conduction Studies"
                },
                {
                    term: "Conduction Block",
                    definition: "Failure of nerve impulse transmission across a segment of nerve, indicated by >50% drop in amplitude with <15% increase in duration",
                    category: "Conduction Studies"
                },
                {
                    term: "Temporal Dispersion",
                    definition: "Abnormal prolongation and dispersion of action potential, resulting in >15% increase in duration",
                    category: "Conduction Studies"
                },
                {
                    term: "Motor Conduction Study",
                    definition: "Assessment of motor nerve function by stimulating nerve and recording from muscle",
                    category: "Conduction Studies"
                },
                {
                    term: "Sensory Conduction Study",
                    definition: "Assessment of sensory nerve function by stimulating and recording from sensory nerves",
                    category: "Conduction Studies"
                }
            ],
            reflexes: [
                {
                    term: "F-Wave",
                    definition: "Late response occurring 25-35ms after M-response, representing antidromic activation of motor neurons",
                    category: "Late Responses"
                },
                {
                    term: "H-Reflex",
                    definition: "Hoffmann reflex - electrical equivalent of stretch reflex, typically recorded from soleus muscle",
                    category: "Late Responses"
                },
                {
                    term: "A-Wave",
                    definition: "Axon reflex occurring before F-wave, indicates nerve regeneration or ephaptic transmission",
                    category: "Late Responses"
                },
                {
                    term: "F-Wave Latency",
                    definition: "Time from stimulus to onset of F-wave, used to assess proximal nerve conduction",
                    category: "Late Responses"
                }
            ],
            pathology: [
                {
                    term: "Demyelination",
                    definition: "Loss of myelin sheath resulting in slowed conduction velocity, prolonged latencies, and conduction block",
                    category: "Pathophysiology"
                },
                {
                    term: "Axonopathy",
                    definition: "Damage to the axon resulting in reduced amplitude with relatively preserved conduction velocity",
                    category: "Pathophysiology"
                },
                {
                    term: "Neuropraxia",
                    definition: "Mildest form of nerve injury with temporary conduction block but preserved axon continuity",
                    category: "Pathophysiology"
                },
                {
                    term: "Axonotmesis",
                    definition: "Nerve injury involving axon damage but preserved endoneurium, allowing for regeneration",
                    category: "Pathophysiology"
                },
                {
                    term: "Neurotmesis",
                    definition: "Complete nerve transection with disruption of all neural elements, requiring surgical repair",
                    category: "Pathophysiology"
                }
            ],
            emg: [
                {
                    term: "EMG",
                    definition: "Electromyography - Study of electrical activity of muscles at rest and during voluntary contraction",
                    category: "EMG Parameters"
                },
                {
                    term: "Insertional Activity",
                    definition: "Brief electrical activity occurring with needle movement, normally lasting 200-300ms",
                    category: "EMG Parameters"
                },
                {
                    term: "Spontaneous Activity",
                    definition: "Abnormal electrical activity occurring at rest, including fibrillations, positive waves, and fasciculations",
                    category: "EMG Parameters"
                },
                {
                    term: "Fibrillation Potentials",
                    definition: "Spontaneous action potentials from single muscle fibers, indicating denervation",
                    category: "EMG Parameters"
                },
                {
                    term: "Positive Sharp Waves",
                    definition: "Spontaneous potentials with initial positive deflection, also indicating denervation",
                    category: "EMG Parameters"
                },
                {
                    term: "Fasciculation",
                    definition: "Spontaneous firing of motor unit visible as muscle twitch, may indicate motor neuron disease",
                    category: "EMG Parameters"
                },
                {
                    term: "Motor Unit Action Potential",
                    definition: "MUAP - Electrical activity from a single motor unit during voluntary contraction",
                    category: "EMG Parameters"
                },
                {
                    term: "Recruitment",
                    definition: "Pattern of motor unit activation with increasing voluntary effort",
                    category: "EMG Parameters"
                }
            ],
            technical: [
                {
                    term: "Stimulus Artifact",
                    definition: "Electrical artifact from stimulating electrode, appears as initial deflection",
                    category: "Technical"
                },
                {
                    term: "Baseline Drift",
                    definition: "Slow change in baseline voltage, often due to temperature changes or electrode issues",
                    category: "Technical"
                },
                {
                    term: "60 Hz Interference",
                    definition: "Electrical interference from AC power lines, appears as regular oscillations",
                    category: "Technical"
                },
                {
                    term: "Supramaximal Stimulation",
                    definition: "Stimulus intensity 20-30% above that required to produce maximal response",
                    category: "Technical"
                },
                {
                    term: "Temperature Correction",
                    definition: "Adjustment of nerve conduction values for body temperature, typically 1.5 m/s per degree C",
                    category: "Technical"
                }
            ]
        },

        // Muscle Anatomy Functions
        switchAnatomyTab: function(extremity) {
            this.currentAnatomyTab = extremity;
            
            // Update tab buttons
            var tabBtns = document.querySelectorAll('.anatomy-tab-btn');
            for (var i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove('active');
                tabBtns[i].style.background = 'var(--light-bg)';
                tabBtns[i].style.color = '#6c757d';
                tabBtns[i].style.borderBottom = '3px solid transparent';
            }
            
            // Update content visibility
            var contents = document.querySelectorAll('.anatomy-content');
            for (var i = 0; i < contents.length; i++) {
                contents[i].style.display = 'none';
            }
            
            if (extremity === 'upper') {
                // Activate upper extremity
                tabBtns[1].classList.add('active');
                tabBtns[1].style.background = 'var(--white)';
                tabBtns[1].style.color = 'var(--primary-color)';
                tabBtns[1].style.borderBottom = '3px solid var(--accent-color)';
                document.getElementById('upper-anatomy-content').style.display = 'block';
            } else {
                // Activate lower extremity
                tabBtns[0].classList.add('active');
                tabBtns[0].style.background = 'var(--white)';
                tabBtns[0].style.color = 'var(--primary-color)';
                tabBtns[0].style.borderBottom = '3px solid var(--accent-color)';
                document.getElementById('lower-anatomy-content').style.display = 'block';
            }
            
            // Re-initialize muscles for current tab
            this.initializeMuscleAnatomy();
        },

        createMuscleCard: function(muscle, isUpperExtremity) {
            var muscleEmoji = this.getMuscleEmoji(muscle.name, isUpperExtremity);
            var hasCordsField = muscle.hasOwnProperty('cords');
            
            var html = '<div class="muscle-card">';
            html += '<div class="muscle-image-container">';
            html += '<div class="placeholder-image">';
            html += '<div style="text-align: center;">';
            html += '<div style="font-size: 32px; margin-bottom: 10px;">' + muscleEmoji + '</div>';
            html += '<div style="font-weight: bold; margin-bottom: 5px;">' + muscle.name + '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="muscle-content">';
            html += '<div class="muscle-name">' + muscle.name + '</div>';
            html += '<div class="muscle-details">';
            html += '<div class="detail-row">';
            html += '<span class="detail-label">Nerve:</span>';
            html += '<span class="detail-content hidden">[Click to reveal]</span>';
            html += '<button class="reveal-btn" onclick="toggleMuscleReveal(this, \'' + muscle.nerve.replace(/'/g, '&#39;') + '\')">Reveal</button>';
            html += '</div>';
            html += '<div class="detail-row">';
            html += '<span class="detail-label">Roots:</span>';
            html += '<span class="detail-content hidden">[Click to reveal]</span>';
            html += '<button class="reveal-btn" onclick="toggleMuscleReveal(this, \'' + muscle.roots.replace(/'/g, '&#39;') + '\')">Reveal</button>';
            html += '</div>';
            
            if (hasCordsField) {
                html += '<div class="detail-row">';
                html += '<span class="detail-label">Cords:</span>';
                html += '<span class="detail-content hidden">[Click to reveal]</span>';
                html += '<button class="reveal-btn" onclick="toggleMuscleReveal(this, \'' + muscle.cords.replace(/'/g, '&#39;') + '\')">Reveal</button>';
                html += '</div>';
            }
            
            html += '<div class="detail-row">';
            html += '<span class="detail-label">Actions:</span>';
            html += '<span class="detail-content hidden">[Click to reveal]</span>';
            html += '<button class="reveal-btn" onclick="toggleMuscleReveal(this, \'' + muscle.actions.replace(/'/g, '&#39;') + '\')">Reveal</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            
            return html;
        },

        getMuscleEmoji: function(muscleName, isUpperExtremity) {
            if (isUpperExtremity) {
                if (muscleName.toLowerCase().includes('trap') || muscleName.toLowerCase().includes('deltoid')) {
                    return '🫸';
                } else if (muscleName.toLowerCase().includes('flex') || muscleName.toLowerCase().includes('extensor')) {
                    return '🤏';
                } else if (muscleName.toLowerCase().includes('pollicis') || muscleName.toLowerCase().includes('hand')) {
                    return '✋';
                } else {
                    return '💪';
                }
            } else {
                if (muscleName.toLowerCase().includes('gluteus')) {
                    return '🍑';
                } else if (muscleName.toLowerCase().includes('gastrocnemius') || muscleName.toLowerCase().includes('soleus')) {
                    return '🦵';
                } else if (muscleName.toLowerCase().includes('foot') || muscleName.toLowerCase().includes('toe') || muscleName.toLowerCase().includes('hallucis')) {
                    return '🦶';
                } else {
                    return '🦵';
                }
            }
        }

        toggleMuscleReveal: function(button, content) {
            var detailContent = button.previousElementSibling;
            
            if (detailContent.classList.contains('hidden')) {
                detailContent.textContent = content;
                detailContent.classList.remove('hidden');
                detailContent.classList.add('revealed');
                button.textContent = 'Hide';
                button.classList.add('revealed');
            } else {
                detailContent.textContent = '[Click to reveal]';
                detailContent.classList.add('hidden');
                detailContent.classList.remove('revealed');
                button.textContent = 'Reveal';
                button.classList.remove('revealed');
            }
        }

        hideAllMuscleAnswers: function() {
            var contents = document.querySelectorAll('.detail-content');
            var buttons = document.querySelectorAll('.reveal-btn');
            
            for (var i = 0; i < contents.length; i++) {
                contents[i].textContent = '[Click to reveal]';
                contents[i].classList.add('hidden');
                contents[i].classList.remove('revealed');
            }
            
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].textContent = 'Reveal';
                buttons[i].classList.remove('revealed');
            }
        }

        revealAllMuscleAnswers: function() {
            var cards = document.querySelectorAll('.muscle-card');
            for (var i = 0; i < cards.length; i++) {
                var buttons = cards[i].querySelectorAll('.reveal-btn');
                for (var j = 0; j < buttons.length; j++) {
                    if (!buttons[j].classList.contains('revealed')) {
                        buttons[j].click();
                    }
                }
            }
        }

        initializeMuscleAnatomy: function() {
            if (this.currentAnatomyTab === 'lower') {
                var regions = ['gluteal', 'thigh', 'leg', 'foot'];
                for (var i = 0; i < regions.length; i++) {
                    var region = regions[i];
                    var container = document.getElementById(region + '-muscles');
                    if (container && this.lowerExtremityData[region]) {
                        var muscles = this.lowerExtremityData[region];
                        var html = '';
                        for (var j = 0; j < muscles.length; j++) {
                            html += this.createMuscleCard(muscles[j], false);
                        }
                        container.innerHTML = html;
                    }
                }
            } else {
                var regions = ['shoulder', 'arm', 'forearm', 'hand'];
                for (var i = 0; i < regions.length; i++) {
                    var region = regions[i];
                    var container = document.getElementById(region + '-muscles');
                    if (container && this.upperExtremityData[region]) {
                        var muscles = this.upperExtremityData[region];
                        var html = '';
                        for (var j = 0; j < muscles.length; j++) {
                            html += this.createMuscleCard(muscles[j], true);
                        }
                        container.innerHTML = html;
                    }
                }
            }
        },

        /**
         * Initialize EMG/NCS Terms grid
         */
        initializeEmgNcsTerms: function() {
            try {
                const termsGrid = document.querySelector('.terms-grid');
                if (!termsGrid) {
                    console.warn('Terms grid container not found');
                    return;
                }

                // Clear existing content
                termsGrid.innerHTML = '';

                // Create terms organized by categories
                const categories = ['amplitudes', 'latencies', 'conduction', 'reflexes', 'pathology', 'emg', 'technical'];
                const categoryTitles = {
                    amplitudes: '⚡ Amplitudes & Measurements',
                    latencies: '⏱️ Latencies & Timing', 
                    conduction: '🔄 Conduction Studies',
                    reflexes: '🔁 Late Responses',
                    pathology: '🔬 Pathophysiology',
                    emg: '📈 EMG Parameters',
                    technical: '🛠️ Technical Terms'
                };

                let html = '';
                
                categories.forEach(category => {
                    if (this.emgNcsTermsData[category] && this.emgNcsTermsData[category].length > 0) {
                        html += `<div class="terms-category">`;
                        html += `<h3 class="category-title">${categoryTitles[category]}</h3>`;
                        html += `<div class="category-grid">`;
                        
                        this.emgNcsTermsData[category].forEach(termData => {
                            html += this.createTermCard(termData);
                        });
                        
                        html += `</div></div>`;
                    }
                });

                termsGrid.innerHTML = html;
                console.log('EMG/NCS Terms initialized successfully');
            } catch (error) {
                console.error('Error initializing EMG/NCS Terms:', error);
            }
        },

        /**
         * Create a term card for EMG/NCS terms display
         */
        createTermCard: function(termData) {
            return `
                <div class="term-card">
                    <div class="term-header">
                        <h4 class="term-name">${termData.term}</h4>
                        <span class="term-category">${termData.category}</span>
                    </div>
                    <div class="term-definition">
                        ${termData.definition}
                    </div>
                </div>
            `;
        }
        };
        
        // Make functions available globally for inline event handlers until they're all converted
        window.showTab = function(index) { NerveStudyApp.showTab(index); };
        window.selectNerve = function() { NerveStudyApp.selectNerve(); };
        window.nextStep = function() { NerveStudyApp.nextStep(); };
        window.previousStep = function() { NerveStudyApp.previousStep(); };
        window.resetPathway = function() { NerveStudyApp.resetPathway(); };
        window.startQuiz = function() { NerveStudyApp.startQuiz(); };
        window.closeTab = function() { NerveStudyApp.closeTab(); };
        window.switchAnatomyTab = function(tab) { NerveStudyApp.switchAnatomyTab(tab); };
        window.toggleMuscleReveal = function(btn, content) { NerveStudyApp.toggleMuscleReveal(btn, content); };
        window.hideAllMuscleAnswers = function() { NerveStudyApp.hideAllMuscleAnswers(); };
        window.revealAllMuscleAnswers = function() { NerveStudyApp.revealAllMuscleAnswers(); };
        window.selectAnswer = function(index) { NerveStudyApp.selectAnswer(index); };
        window.showAnatomyTab = function(tab) { NerveStudyApp.switchAnatomyTab(tab); };
        
        // Initialize the application when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                NerveStudyApp.init();
            });
        } else {
            // DOM is already ready
            NerveStudyApp.init();
        }
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', function() {
            NerveStudyApp.cleanup();
        });
