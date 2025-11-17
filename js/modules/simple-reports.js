// Simple Reports Module
// EMG/NCS report writing guide

export function generateContent(module) {
    if (typeof generateReportWritingContent === 'function') {
        return generateReportWritingContent(module);
    }

    return `
        <div class="interactive-content">
            <div style="background: linear-gradient(135deg, #ec4899, #db2777); padding: 35px; border-radius: 20px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">📝 EMG Report Writing</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading report writing templates and guidelines...</p>
            </div>
        </div>
    `;
}

export default { generateContent };
