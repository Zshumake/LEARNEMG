// Neuropathy vs Myopathy Basics Module
// Differentiation between neuropathy and myopathy

import { registerModulePodcasts, generateErnestButton } from '../podcast-player.js';

export function generateContent(module) {
    // Register podcast for this module
    registerModulePodcasts('neuropathy-myopathy');

    // This module typically launches a modal directly
    setTimeout(() => {
        if (typeof showNeuropathyMyopathyBasics === 'function') {
            showNeuropathyMyopathyBasics();
        } else {
            console.error('❌ showNeuropathyMyopathyBasics function not found');
        }
    }, 100);

    return `
        <div class="interactive-content" style="position: relative;">
            ${generateErnestButton('neuropathy-myopathy', 'Neuropathy vs Myopathy')}
            <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 35px; border-radius: 20px; color: white;">
                <h3 style="margin-bottom: 15px; font-size: 1.8em;">🔍 Neuropathy vs Myopathy</h3>
                <p style="font-size: 1.1em; margin: 0;">Loading differentiation guide...</p>
            </div>
        </div>
    `;
}

