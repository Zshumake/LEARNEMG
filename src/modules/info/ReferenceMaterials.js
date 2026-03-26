
/**
 * ReferenceMaterials.js
 * Handles static informational content and reference guides.
 */

import logger from '../../utils/Logger.js';
export class ReferenceMaterials {
    constructor() {
        // Diagnostic mode flag
        this.diagnosticMode = false;

        if (window._registerAction) {
            window._registerAction('returnToPGYNavigator', () => {
                window.returnToPGYNavigator?.(window.currentPGYLevel);
            });
        }
    }

    showCardinalRules() {
        const content = `
        <div class="cardinal-rules-content">
            ${this.getDiagnosticControls()}
            <h3 style="color: #2c3e50; margin-bottom: 20px;">🚨 Cardinal EMG/NCS Rules</h3>
            <div style="display: grid; gap: 20px;">
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px;">
                    <h4 style="color: #92400e;">🛡️ Safety First</h4>
                    <ul style="color: #b45309; margin: 0;">
                        <li>Always explain procedures to patients</li>
                        <li>Check for pacemakers and implanted devices</li>
                        <li>Use universal precautions</li>
                        <li>Proper needle disposal</li>
                    </ul>
                </div>
                <div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 20px; border-radius: 8px;">
                    <h4 style="color: #15803d;">⚡ NCS Fundamentals</h4>
                    <ul style="color: #166534; margin: 0;">
                        <li>Always check skin temperature (>32°C)</li>
                        <li>Clean skin with alcohol before electrode placement</li>
                        <li>Start with distal stimulation sites</li>
                        <li>Measure distances accurately</li>
                    </ul>
                </div>
                <div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px;">
                    <h4 style="color: #1d4ed8;">🎯 EMG Essentials</h4>
                    <ul style="color: #1e40af; margin: 0;">
                        <li>Insert needle slowly and listen continuously</li>
                        <li>Sample multiple areas within each muscle</li>
                        <li>Always assess insertional activity first</li>
                        <li>Document findings systematically</li>
                    </ul>
                </div>
            </div>
            <div style="text-align: center; margin: 30px 0;">
                <button data-action="returnToPGYNavigator"
                        style="background: #6b9f78; color: white; border: none; padding: 12px 24px;
                               border-radius: 8px; cursor: pointer; font-weight: 600;">
                    Back to Learning Pathway
                </button>
            </div>
        </div>
        `;

        if (window.showModal) {
            window.showModal('🚨 Cardinal EMG/NCS Rules', content);
        } else {
            logger.error('showModal not found');
        }
    }

    // Optional: Keep diagnostic controls if they were useful, otherwise simplify
    getDiagnosticControls() {
        // Simplified for now - can re-implement full diagnostic if needed
        return '';
        /* 
        return `
            <div style="position: fixed; top: 10px; right: 10px; z-index: 9999; display: flex; gap: 10px;">
                <div style="background: rgba(255,0,0,0.1); color: red; padding: 5px; border-radius: 5px; font-size: 0.8em;">
                    Debug Mode
                </div>
            </div>
        `;
        */
    }
}
