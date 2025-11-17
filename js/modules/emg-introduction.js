// EMG Introduction Module
// Introduction to EMG and electrodiagnostic medicine

export function generateContent(module) {
    if (typeof generateEMGIntroductionContent === 'function') {
        return generateEMGIntroductionContent(module);
    }

    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #06b6d4, #0891b2); padding: 35px; border-radius: 20px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">📚 Introduction to EMG</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading comprehensive EMG introduction...</p>
            </div>
        </div>
    `;
}

export default { generateContent };
