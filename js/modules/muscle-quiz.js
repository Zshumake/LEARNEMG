// Muscle Quiz Module
// Interactive muscle anatomy quiz with 71 muscles organized by peripheral nerve

export function generateContent(module) {
    // Call the original function if it exists
    if (typeof generateMuscleQuizContent === 'function') {
        return generateMuscleQuizContent(module);
    }

    // Stub content while we migrate
    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #14b8a6, #06b6d4); padding: 35px; border-radius: 20px; margin-bottom: 30px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">💪 Advanced Muscle Localization Training</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading 71-muscle database organized by peripheral nerve...</p>
            </div>
            <div style="text-align: center; padding: 40px;">
                <button onclick="showStudyCards()" style="
                    background: linear-gradient(135deg, #14b8a6, #06b6d4);
                    color: white;
                    border: none;
                    padding: 18px 45px;
                    border-radius: 50px;
                    font-size: 1.3em;
                    font-weight: 700;
                    cursor: pointer;
                ">🚀 Start Learning →</button>
            </div>
        </div>
    `;
}

export default { generateContent };
