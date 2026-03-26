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
            .muscle-dashboard-card {
                background: white;
                border-radius: 25px;
                padding: 45px;
                border: 2px solid #e2e8f0;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
                transition: all 0.4s ease;
                position: relative;
                overflow: hidden;
            }
            .muscle-dashboard-card:hover {
                transform: translateY(-5px) scale(1.01);
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
            }
            .muscle-dashboard-card.study-card:hover {
                border-color: #06b6d4;
            }
            .muscle-dashboard-card.quiz-card:hover {
                border-color: #10b981;
            }
            .muscle-dashboard-card.challenge-card:hover {
                border-color: #8b5cf6;
            }
            
            .dashboard-card-btn {
                color: white;
                border: none;
                padding: 18px 45px;
                border-radius: 50px;
                font-size: 1.3em;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                display: flex;
                align-items: center;
                gap: 12px;
                margin-top: 15px;
            }
        </style>
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="
                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                padding: 35px;
                border-radius: 20px;
                margin-bottom: 30px;
                border: 2px solid #e2e8f0;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                display: flex;
                align-items: center;
                gap: 20px;
            ">
                <div style="background: white; padding: 15px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                </div>
                <div>
                    <h3 style="color: #0f172a; margin-bottom: 8px; font-size: 1.8em;">Advanced Muscle Localization</h3>
                    <p style="color: #64748b; font-size: 1.1em; font-weight: 500; margin: 0;">
                        Master functional anatomy, nerve roots, innervation patterns, and clinical correlation with our interactive study system.
                    </p>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 30px; margin-bottom: 30px; max-width: 800px; margin-left: auto; margin-right: auto;">

                <!-- Study Cards -->
                <div class="muscle-dashboard-card study-card">
                    <div style="position: relative; z-index: 2;">
                        <div style="text-align: left; margin-bottom: 25px;">
                            <h3 style="color: #0d9488; font-size: 2em; margin-bottom: 12px; font-weight: 700; display: flex; align-items: center; gap: 15px;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                                Master Every Muscle
                            </h3>
                            <p style="color: #64748b; font-size: 1.15em; line-height: 1.6; margin: 0;">
                                Dive deep into over 40 muscles with interactive flashcards. Review innervation, nerve roots, actions, and clinical correlations in an elegant UI.
                            </p>
                        </div>

                        <button
                            data-action="showStudyCards"
                            class="dashboard-card-btn"
                            style="background: linear-gradient(135deg, #0ea5e9, #0284c7); box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 35px rgba(14, 165, 233, 0.4)'"
                            onmouseout="this.style.transform=''; this.style.boxShadow='0 8px 25px rgba(14, 165, 233, 0.3)'"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            Explore Study Cards
                        </button>
                    </div>
                </div>

                <!-- Anatomy Quiz -->
                <div class="muscle-dashboard-card quiz-card">
                    <div style="position: relative; z-index: 2;">
                        <div style="text-align: left; margin-bottom: 25px;">
                            <h3 style="color: #10b981; font-size: 2em; margin-bottom: 12px; font-weight: 700; display: flex; align-items: center; gap: 15px;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                Anatomy Quiz Engine
                            </h3>
                            <p style="color: #64748b; font-size: 1.15em; line-height: 1.6; margin: 0;">
                                Test your rapid recall with an infinite generator. Customize topics (roots, nerves, actions) and build your diagnostic intuition through immediate feedback.
                            </p>
                        </div>

                        <button
                            data-action="launchAnatomyQuiz"
                            class="dashboard-card-btn"
                            style="background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 35px rgba(16, 185, 129, 0.4)'"
                            onmouseout="this.style.transform=''; this.style.boxShadow='0 8px 25px rgba(16, 185, 129, 0.3)'"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            Launch Quiz Engine
                        </button>
                    </div>
                </div>

                <!-- EMG Challenge -->
                <div class="muscle-dashboard-card challenge-card">
                    <div style="position: relative; z-index: 2;">
                        <div style="text-align: left; margin-bottom: 25px;">
                            <h3 style="color: #6366f1; font-size: 2em; margin-bottom: 12px; font-weight: 700; display: flex; align-items: center; gap: 15px;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                                Clinical EMG Challenge
                            </h3>
                            <p style="color: #64748b; font-size: 1.15em; line-height: 1.6; margin: 0;">
                                Challenge yourself with real clinical scenarios. Analyze abnormal findings, identify lesion locations, and bridge the gap between anatomy and pathology.
                            </p>
                        </div>

                        <button
                            data-action="showEMGChallenge"
                            class="dashboard-card-btn"
                            style="background: linear-gradient(135deg, #6366f1, #4f46e5); box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 35px rgba(99, 102, 241, 0.4)'"
                            onmouseout="this.style.transform=''; this.style.boxShadow='0 8px 25px rgba(99, 102, 241, 0.3)'"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            Start Clinical Challenge
                        </button>
                    </div>
                </div>
            </div>

            <!-- Instructions -->
            <div style="
                background: white;
                padding: 30px;
                border-radius: 20px;
                border: 2px solid #e2e8f0;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            ">
                <h4 style="color: #334155; margin-bottom: 20px; font-size: 1.3em; display: flex; align-items: center; gap: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    How to Utilize the Muscle Lab
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <strong style="color: #0ea5e9; display: block; margin-bottom: 8px; font-size: 1.1em;">Phase 1: Memorization</strong>
                        <p style="color: #64748b; margin: 0; line-height: 1.5;">Use the <strong style="color: #475569;">Study Cards</strong> to isolate individual muscles. Focus on memorizing the nerve root supplies and peripheral innervations.</p>
                    </div>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <strong style="color: #10b981; display: block; margin-bottom: 8px; font-size: 1.1em;">Phase 2: Speed Recall</strong>
                        <p style="color: #64748b; margin: 0; line-height: 1.5;">Fire up the <strong style="color: #475569;">Anatomy Quiz Engine</strong>. Configure it for your weak spots and test your rapid-fire knowledge under pressure.</p>
                    </div>
                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <strong style="color: #6366f1; display: block; margin-bottom: 8px; font-size: 1.1em;">Phase 3: Integration</strong>
                        <p style="color: #64748b; margin: 0; line-height: 1.5;">Take the <strong style="color: #475569;">Clinical Challenge</strong> to analyze real-world patterns. Build diagnostic confidence for neurophysiology boards.</p>
                    </div>
                </div>
            </div>

        </div>
    `;
}
