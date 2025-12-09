// Brachial Plexus Interactive Content Generator
function generateBrachialPlexusInteractiveContent(module) {
    return `
        <div class="interactive-content">
            <!-- Ernest's Podcast Banner -->
            <div onclick="window.playModulePodcast('brachial-plexus-interactive', 'brachial-ep1')"
                 style="background: linear-gradient(135deg, #f59e0b, #ea580c);
                        color: white;
                        padding: 20px 25px;
                        border-radius: 12px;
                        margin-bottom: 20px;
                        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 15px;"
                 onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(245, 158, 11, 0.4)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(245, 158, 11, 0.3)'">
                <img src="ERNEST.png"
                     style="width: 60px; height: 60px; border-radius: 50%; border: 3px solid white; object-fit: cover;"
                     alt="Ernest">
                <div style="flex: 1;">
                    <div style="font-weight: bold; font-size: 1.2em; margin-bottom: 5px;">
                        🎧 Learn more with my Plexopathies podcast
                    </div>
                    <div style="font-size: 0.9em; opacity: 0.95;">
                        Click to listen • Duration: 13:28
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.9);
                           color: #ea580c;
                           padding: 12px 24px;
                           border-radius: 8px;
                           font-weight: 600;
                           font-size: 1.1em;">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="vertical-align: middle; margin-right: 4px;">
                        <path d="M3 2L13 8L3 14V2Z" fill="currentColor"/>
                    </svg> Play
                </div>
            </div>

            <!-- Learning Objective Banner -->
            <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); padding: 25px; border-radius: 15px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
                <h3 style="color: #1e40af; margin-bottom: 15px;">🕸️ Interactive Brachial Plexus System</h3>
                <p style="color: #1e3a8a; font-size: 1.1em; font-weight: 500; margin: 0;">
                    Complete interactive brachial plexus anatomy with nerve pathway tracing, clinical patterns, and EMG correlations.
                </p>
            </div>

            <!-- Brachial Plexus Interactive Viewer -->
            <div style="background: #f8fafc; border-radius: 15px; padding: 20px; border: 2px solid #e2e8f0; margin-bottom: 25px;">
                <h3 style="color: #1e40af; margin-bottom: 15px; text-align: center;">🕸️ Interactive Brachial Plexus Anatomy</h3>
                <div style="position: relative; width: 100%; height: 700px; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <iframe
                        src="brachial-plexus-prototype.html"
                        style="width: 100%; height: 100%; border: none; border-radius: 10px;"
                        title="Interactive Brachial Plexus System"
                        loading="lazy"
                    ></iframe>
                </div>
                <div style="margin-top: 15px; text-align: center;">
                    <small style="color: #64748b;">
                        💡 Tip: Click on structures to explore nerve pathways and clinical correlations
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

// Navigation Helper - Global Definition
window.returnToMainPage = function () {
    console.log('🔙 Returning to main page...');

    // Close any open modals
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
        modalOverlay.classList.remove('show');
    }

    if (typeof closeLearningObjectives === 'function') {
        closeLearningObjectives();
    }

    // Reset to main interface
    if (typeof window.initMainInterface === 'function') {
        window.initMainInterface();
    } else {
        // Fallback manual reset
        const mainInterface = document.getElementById('main-interface-container');
        const pgySelection = document.getElementById('pgy-selection');

        if (mainInterface) {
            mainInterface.style.display = 'block';
            mainInterface.classList.add('active');
        }

        if (pgySelection) {
            pgySelection.style.display = 'none';
            pgySelection.classList.remove('active');
        }
    }

    // Ensure body scrolling is restored
    document.body.style.overflow = '';
};