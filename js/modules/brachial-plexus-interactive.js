// Brachial Plexus Interactive Module
// Interactive brachial plexus anatomy and pathophysiology

import { registerModulePodcasts, generateErnestButton } from '../podcast-player.js';

export function generateContent(module) {
    // Register podcast for this module
    registerModulePodcasts('brachial-plexus');

    if (typeof generateBrachialPlexusInteractiveContent === 'function') {
        return generateBrachialPlexusInteractiveContent(module);
    }

    return `
        <div class="interactive-content" style="position: relative;">${generateErnestButton()}
            <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 35px; border-radius: 20px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">🧬 Brachial Plexus Interactive</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading interactive brachial plexus system...</p>
            </div>
        </div>
    `;
}

