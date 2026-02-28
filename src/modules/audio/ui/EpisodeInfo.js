import { Icons } from './Icons.js';

export class EpisodeInfo {
    constructor(controller) {
        this.controller = controller;
        this.mountPoint = 'episode-info-mount';
    }

    inject() {
        const mount = document.getElementById(this.mountPoint);
        if (mount) {
            mount.innerHTML = this.renderHTML();
            this.bindEvents();
        }
    }

    renderHTML() {
        return `
            <div id="episode-info" class="section episode-info-section" style="display: none;">
                <h4 id="episode-title"></h4>
                <p id="episode-description"></p>
                <div class="meta-row">
                    <span class="badge duration-badge">⏱️ <strong id="episode-duration">0:00</strong></span>
                </div>

                <!-- Show Notes Section -->
                <div class="accordion-section">
                    <button id="show-notes-toggle" class="accordion-btn">
                        <span class="btn-label">${Icons.notes} Show Notes</span>
                        <span id="show-notes-arrow" class="arrow-icon">${Icons.chevronDown}</span>
                    </button>
                    <div id="show-notes-panel" class="accordion-panel" style="display: none;">
                        <div id="show-notes-content">Show notes will appear here...</div>
                    </div>
                </div>

                <!-- Transcript Section -->
                <div class="accordion-section">
                    <button id="transcript-toggle" class="accordion-btn">
                        <span class="btn-label">${Icons.transcript} Transcript</span>
                        <span id="transcript-arrow" class="arrow-icon">${Icons.chevronDown}</span>
                    </button>
                    <div id="transcript-panel" class="accordion-panel" style="display: none;">
                        <div id="transcript-content">Transcript will appear here...</div>
                    </div>
                </div>

                <style>
                    .episode-info-section h4 { margin: 0 0 8px 0; font-size: 1.2rem; color: #0f172a; line-height: 1.3; }
                    .episode-info-section p { margin: 0 0 16px 0; font-size: 0.95rem; color: #64748b; line-height: 1.6; }
                    .badge {
                        display: inline-flex; align-items: center; padding: 4px 10px;
                        background: #f1f5f9; border-radius: 20px; font-size: 0.8rem;
                        font-weight: 600; color: #475569; margin-bottom: 20px;
                    }
                    .accordion-section { border-top: 1px solid rgba(0,0,0,0.05); }
                    .accordion-btn {
                        background: none; border: none; width: 100%; padding: 16px 0;
                        text-align: left; display: flex; justify-content: space-between;
                        align-items: center; cursor: pointer; color: #0f172a;
                        font-weight: 600; font-size: 0.95rem;
                    }
                    .accordion-btn:hover { opacity: 0.8; }
                    .btn-label { display: flex; align-items: center; gap: 10px; }
                    .arrow-icon { transition: transform 0.3s; }
                    .accordion-panel { padding-bottom: 20px; font-size: 0.9rem; color: #64748b; line-height: 1.6; }
                </style>
            </div>
        `;
    }

    bindEvents() {
        const toggleAccordion = (panelId, arrowId) => {
            const panel = document.getElementById(panelId);
            const arrow = document.getElementById(arrowId);
            if (!panel || !arrow) return;
            const isOpen = panel.style.display === 'block';
            panel.style.display = isOpen ? 'none' : 'block';
            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        };

        document.getElementById('show-notes-toggle').onclick = () => toggleAccordion('show-notes-panel', 'show-notes-arrow');
        document.getElementById('transcript-toggle').onclick = () => toggleAccordion('transcript-panel', 'transcript-arrow');
    }

    update(episode) {
        if (!episode) return;

        const infoDiv = document.getElementById('episode-info');
        if (infoDiv) infoDiv.style.display = 'block';

        document.getElementById('episode-title').textContent = episode.title;
        document.getElementById('episode-description').textContent = episode.description;
        document.getElementById('episode-duration').textContent = episode.duration || '0:00';

        document.getElementById('show-notes-content').innerHTML = episode.showNotes || 'No notes available.';
        document.getElementById('transcript-content').innerHTML = episode.transcript || 'No transcript available.';
    }
}
