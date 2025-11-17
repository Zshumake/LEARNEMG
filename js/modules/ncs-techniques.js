// NCS Techniques Module
// Nerve conduction study techniques and procedures

export function generateContent(module) {
    if (typeof generateNCSBasicTechniquesContent === 'function') {
        return generateNCSBasicTechniquesContent(module);
    }

    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 35px; border-radius: 20px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">⚡ NCS Techniques</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading nerve conduction study techniques...</p>
            </div>
        </div>
    `;
}

export default { generateContent };
