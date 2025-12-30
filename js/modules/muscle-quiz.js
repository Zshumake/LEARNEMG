// Muscle Quiz Module  
// Interactive muscle localization tool with EMG needle placement guide

export function generateContent(module) {
    return `
        <style>
            @keyframes gradient-flow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            @keyframes float-gentle {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
            }
        </style>
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="
                background: linear-gradient(135deg, #14b8a6, #06b6d4, #8b5cf6);
                background-size: 200% 200%;
                animation: gradient-flow 8s ease infinite;
                padding: 35px;
                border-radius: 20px;
                margin-bottom: 30px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 10px 40px rgba(20, 184, 166, 0.3);
                position: relative;
                overflow: hidden;
            ">
                <h3 style="color: white; margin-bottom: 15px; font-size: 1.8em; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">💪 Advanced Muscle Localization Training</h3>
                <p style="color: rgba(255,255,255,0.95); font-size: 1.1em; font-weight: 500; margin: 0; text-shadow: 0 1px 5px rgba(0,0,0,0.1);">
                    Interactive quiz system with nerve roots, innervation patterns, and clinical correlation - the same advanced system from the main EMG application.
                </p>
            </div>

            <!-- Note: EMG Needle Localization Guide is available in the dedicated tab above -->
            <div style="display: flex; flex-direction: column; gap: 30px; margin-bottom: 30px; max-width: 800px; margin-left: auto; margin-right: auto;">

                <!-- Study Cards - Large Interactive Card -->
                <div style="
                    background: linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.05));
                    border-radius: 25px;
                    padding: 45px;
                    border: 3px solid rgba(20, 184, 166, 0.3);
                    box-shadow: 0 10px 40px rgba(20, 184, 166, 0.2);
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                " onmouseover="this.style.transform='translateY(-5px) scale(1.01)'; this.style.boxShadow='0 15px 50px rgba(20, 184, 166, 0.3)'; this.style.borderColor='rgba(20, 184, 166, 0.5)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 10px 40px rgba(20, 184, 166, 0.2)'; this.style.borderColor='rgba(20, 184, 166, 0.3)'">

                    <div style="position: relative; z-index: 2;">
                        <div style="text-align: left; margin-bottom: 25px;">
                            <h3 style="
                                background: linear-gradient(135deg, #0d9488, #06b6d4);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                font-size: 2em;
                                margin-bottom: 12px;
                                font-weight: 700;
                            ">📚 Master Every Muscle</h3>
                            <p style="color: #475569; font-size: 1.15em; line-height: 1.6; margin: 0;">
                                Dive deep into 45 muscles with interactive flashcards. Test your knowledge on innervation, nerve roots, actions, and clinical correlations.
                            </p>
                        </div>

                        <button
                            onclick="showStudyCards()"
                            style="
                                background: linear-gradient(135deg, #14b8a6, #06b6d4);
                                color: white;
                                border: none;
                                padding: 18px 45px;
                                border-radius: 50px;
                                font-size: 1.3em;
                                font-weight: 700;
                                cursor: pointer;
                                box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
                                transition: all 0.3s ease;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            "
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 35px rgba(20, 184, 166, 0.5)'; this.style.background='linear-gradient(135deg, #0d9488, #0891b2)'"
                            onmouseout="this.style.transform=''; this.style.boxShadow='0 8px 25px rgba(20, 184, 166, 0.4)'; this.style.background='linear-gradient(135deg, #14b8a6, #06b6d4)'"
                        >
                            🚀 Start Learning →
                        </button>
                    </div>
                </div>

                <!-- EMG Challenge - Large Interactive Card -->
                <div style="
                    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.05));
                    border-radius: 25px;
                    padding: 45px;
                    border: 3px solid rgba(139, 92, 246, 0.3);
                    box-shadow: 0 10px 40px rgba(139, 92, 246, 0.2);
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                " onmouseover="this.style.transform='translateY(-5px) scale(1.01)'; this.style.boxShadow='0 15px 50px rgba(139, 92, 246, 0.3)'; this.style.borderColor='rgba(139, 92, 246, 0.5)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 10px 40px rgba(139, 92, 246, 0.2)'; this.style.borderColor='rgba(139, 92, 246, 0.3)'">

                    <div style="position: relative; z-index: 2;">
                        <div style="text-align: left; margin-bottom: 25px;">
                            <h3 style="
                                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                font-size: 2em;
                                margin-bottom: 12px;
                                font-weight: 700;
                            ">📋 Localize Like A Pro</h3>
                            <p style="color: #475569; font-size: 1.15em; line-height: 1.6; margin: 0;">
                                Challenge yourself with real EMG patterns. Analyze abnormal findings, identify lesion locations, and build diagnostic confidence.
                            </p>
                        </div>

                        <button
                            onclick="showEMGChallenge()"
                            style="
                                background: linear-gradient(135deg, #8b5cf6, #6366f1);
                                color: white;
                                border: none;
                                padding: 18px 45px;
                                border-radius: 50px;
                                font-size: 1.3em;
                                font-weight: 700;
                                cursor: pointer;
                                box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
                                transition: all 0.3s ease;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            "
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 35px rgba(139, 92, 246, 0.5)'; this.style.background='linear-gradient(135deg, #7c3aed, #4f46e5)'"
                            onmouseout="this.style.transform=''; this.style.boxShadow='0 8px 25px rgba(139, 92, 246, 0.4)'; this.style.background='linear-gradient(135deg, #8b5cf6, #6366f1)'"
                        >
                            🎯 Take Challenge →
                        </button>
                    </div>
                </div>
            </div>

            <!-- Instructions -->
            <div style="
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
                padding: 25px;
                border-radius: 15px;
                border: 2px solid rgba(251, 191, 36, 0.3);
                box-shadow: 0 4px 15px rgba(251, 191, 36, 0.1);
            ">
                <h4 style="
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 18px;
                    font-size: 1.3em;
                ">📚 How to Use the Advanced Quiz System</h4>
                <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px; font-size: 1.05em;">
                    <li><strong style="color: #0d9488;">Select Quiz Types:</strong> Choose which anatomical aspects to test (nerve, roots, cords, actions)</li>
                    <li><strong style="color: #0d9488;">Choose Mode:</strong> Type answers for harder challenge or use multiple choice</li>
                    <li><strong style="color: #0d9488;">Region Selection:</strong> Focus on upper or lower extremity muscles</li>
                    <li><strong style="color: #0d9488;">Start Quiz:</strong> Begin interactive questions with immediate feedback</li>
                    <li><strong style="color: #0d9488;">EMG Testing Mode:</strong> Advanced continuous quiz with performance statistics</li>
                    <li><strong style="color: #0d9488;">EMG Localization Challenge:</strong> Study normal/abnormal muscle patterns to identify lesion locations</li>
                </ul>
            </div>

            <!-- EMG Challenge Interface - Now Opens in Modal via showEMGChallenge() -->

            <!-- Required HTML for quiz functionality -->
            <div id="muscle-test-modal" class="muscle-test-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000;">
                <div class="muscle-test-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 15px; padding: 30px; max-width: 600px; width: 90%; max-height: 80%; overflow-y: auto;">
                    <div class="muscle-test-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <div class="test-title">
                            <h3 style="margin: 0; color: #1e40af;">🧪 Continuous Muscle Anatomy Quiz</h3>
                            <div class="test-stats" style="margin-top: 10px;">
                                <span id="questions-answered" style="margin-right: 15px; color: #6b7280;">Questions: 0</span>
                                <span id="current-accuracy" style="color: #6b7280;">Accuracy: 0%</span>
                            </div>
                        </div>
                        <button class="close-test-btn" onclick="MuscleAnatomy.stopMuscleTest()" style="
                            background: #dc2626;
                            color: white;
                            border: none;
                            padding: 8px 12px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                        ">✕ Stop Quiz</button>
                    </div>

                    <div class="muscle-test-body" id="muscle-test-body">
                        <div class="test-question">
                            <h4 id="question-text" style="margin-bottom: 20px; color: #374151;">Loading question...</h4>
                            <div id="answer-choices" class="answer-choices">
                                <!-- Multiple choice options will be populated here -->
                            </div>
                        </div>

                        <div id="answer-feedback" class="answer-feedback" style="display: none; margin-top: 20px; padding: 15px; border-radius: 8px;">
                            <div class="feedback-content">
                                <div id="feedback-result" style="font-weight: 600; margin-bottom: 10px;"></div>
                                <div id="feedback-explanation" style="color: #6b7280;"></div>
                            </div>
                            <button id="next-question-btn" class="next-question-btn" onclick="MuscleAnatomy.nextQuestion()" style="
                                margin-top: 15px;
                                padding: 10px 20px;
                                background: #10b981;
                                color: white;
                                border: none;
                                border-radius: 6px;
                                cursor: pointer;
                                font-weight: 600;
                            ">Next Question →</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}


