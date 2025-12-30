
export class MuscleLabMenu {
    constructor() {
    }

    getHTML() {
        return `
        <style>
            @keyframes gradient-flow {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
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
                <button class="hero-back-btn" onclick="window.closeModal()" style="
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    backdrop-filter: blur(5px);
                    transition: all 0.3s;
                    z-index: 10;
                ">← Dashboard</button>

                <h3 style="color: white; margin-bottom: 15px; font-size: 1.8em; text-shadow: 0 2px 10px rgba(0,0,0,0.2); margin-top: 20px;">💪 Advanced Muscle Localization Training</h3>
                <p style="color: rgba(255,255,255,0.95); font-size: 1.1em; font-weight: 500; margin: 0; text-shadow: 0 1px 5px rgba(0,0,0,0.1);">
                    Interactive quiz system with nerve roots, innervation patterns, and clinical correlation - the same advanced system from the main EMG application.
                </p>
            </div>

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
            
            <div style="
                text-align: center;
                margin-top: 20px;
                color: #6b7280;
                font-size: 0.9em;
            ">
                <p>Module 9: Advanced Muscle Localization • Dr. Zachary Shumaker</p>
            </div>
        </div>
        `;
    }

    show() {
        if (window.showModal) {
            window.showModal('Module 9: Advanced Muscle Lab', this.getHTML());
        } else {
            console.error('showModal not found');
        }
    }
}
