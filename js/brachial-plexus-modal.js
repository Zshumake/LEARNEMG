// Brachial Plexus Interactive Content Generator
function generateBrachialPlexusInteractiveContent(module) {
    return `
        <div class="interactive-content">
            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🕸️ Interactive Brachial Plexus System</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Complete interactive brachial plexus anatomy with nerve pathway tracing, clinical patterns, and EMG correlations.
                </p>
            </div>

            <!-- Brachial Plexus Launch Button -->
            <div style="background: #f8fafc; border-radius: 15px; padding: 30px; border: 2px solid #e2e8f0; margin-bottom: 25px; text-align: center;">
                <h3 style="color: #1e40af; margin-bottom: 20px;">🕸️ Launch Interactive Brachial Plexus</h3>
                <p style="color: #64748b; margin-bottom: 25px; font-size: 1.1em;">
                    Open the complete brachial plexus system in a new tab for optimal viewing and interaction.
                </p>
                <button
                    onclick="window.open('brachial-plexus-prototype.html', '_blank', 'width=1400,height=900')"
                    style="
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 10px;
                        font-size: 1.2em;
                        font-weight: 600;
                        cursor: pointer;
                        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
                        transition: all 0.3s;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(59, 130, 246, 0.3)'"
                >
                    🚀 Launch Brachial Plexus System
                </button>
                <div style="margin-top: 15px;">
                    <small style="color: #64748b;">
                        Opens in a new window for full-screen interactive experience
                    </small>
                </div>
            </div>

            <!-- Quick Reference Guide -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
                <h4 style="color: #065f46; margin-bottom: 20px; font-size: 1.4em;">🩺 Clinical Applications</h4>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #059669; margin-bottom: 15px;">💡 EMG Localization</h5>
                        <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                            <li><strong>Root level:</strong> Paraspinal muscles + myotome pattern</li>
                            <li><strong>Trunk/Division:</strong> Specific nerve combinations</li>
                            <li><strong>Cord level:</strong> Multiple terminal nerve involvement</li>
                            <li><strong>Terminal nerve:</strong> Isolated nerve pattern</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                        <h5 style="color: #dc2626; margin-bottom: 15px;">🎯 Key Clinical Patterns</h5>
                        <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                            <li><strong>Erb's Palsy:</strong> C5-C6 (Upper trunk)</li>
                            <li><strong>Klumpke's:</strong> C8-T1 (Lower trunk)</li>
                            <li><strong>TOS:</strong> Medial cord pattern</li>
                            <li><strong>Median CTS:</strong> Thenar sparing of APB</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// No additional JavaScript needed - the iframe loads the complete standalone brachial plexus system

console.log('🕸️ Brachial Plexus Modal Content Loaded');