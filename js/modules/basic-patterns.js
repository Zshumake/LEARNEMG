// Basic Patterns Module
// Common EMG/NCS patterns and abnormalities

export function generateContent(module) {
    if (typeof generateBasicPatternsContent === 'function') {
        return generateBasicPatternsContent(module);
    }

    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 35px; border-radius: 20px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">📊 Basic EMG/NCS Patterns</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading common patterns and abnormalities...</p>
            </div>
        </div>
    `;
}

export default { generateContent };
