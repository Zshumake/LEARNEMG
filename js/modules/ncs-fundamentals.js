// NCS Fundamentals Module
// Comprehensive nerve conduction study principles

export function generateContent(module) {
    if (typeof generateNCSFundamentalsContent === 'function') {
        return generateNCSFundamentalsContent(module);
    }

    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); padding: 35px; border-radius: 20px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">🔬 NCS Fundamentals</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading comprehensive NCS principles and physiology...</p>
            </div>
        </div>
    `;
}

export default { generateContent };
