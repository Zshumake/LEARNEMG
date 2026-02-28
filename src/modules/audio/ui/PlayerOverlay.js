import { Icons } from './Icons.js';

export class PlayerOverlay {
    constructor(controller) {
        this.controller = controller;
        this.containerId = 'podcast-container';
    }

    inject() {
        const existing = document.getElementById(this.containerId);
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.id = this.containerId;
        container.innerHTML = this.renderHTML();
        document.body.appendChild(container);

        this.bindEvents();
    }

    renderHTML() {
        return `
            <!-- Player Overlay -->
            <div id="podcast-player-overlay" class="glass-panel" style="display: none;">
                <!-- Header -->
                <div class="player-header">
                    <div class="header-content">
                        <div class="brand-container">
                            <div class="avatar-wrapper">
                                <img id="podcast-header-icon" src="images/ui/ERNEST.png" alt="Ernest">
                                <div class="status-dot"></div>
                            </div>
                            <div class="brand-text">
                                <h3>Ernest's Podcast</h3>
                                <p>EMG/NCS Learning Series</p>
                            </div>
                        </div>
                        <div class="header-controls" style="display: flex; gap: 8px;">
                            <button id="podcast-info-btn" class="icon-btn info-btn" title="How to save app">
                                ${Icons.info}
                            </button>
                            <button id="podcast-close-btn" class="icon-btn close-btn" title="Close">
                                ${Icons.close}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Info Modal (Hidden by default) -->
                <div id="podcast-info-modal" class="info-modal" style="display: none;">
                    <div class="info-content">
                        <h4>📱 Listen in Background</h4>
                        <p>To keep listening when your phone locks or you switch apps, add this page to your Home Screen:</p>
                        <ol>
                            <li>Tap the <strong>Share</strong> button <span style="font-size: 1.2em;">⎋</span> in Safari</li>
                            <li>Scroll down and tap <strong>"Add to Home Screen"</strong> <span style="font-size: 1.2em;">➕</span></li>
                            <li>Open the new <strong>Ernest</strong> app icon on your home screen!</li>
                        </ol>
                        <button id="podcast-info-close-btn" class="close-info-btn">Got it!</button>
                    </div>
                </div>

                <!-- Scrollable Content Area -->
                <div class="player-body">
                    <!-- Episode Selector Placeholder -->
                    <div class="section episode-select-section">
                        <label>Select Episode</label>
                        <div class="select-wrapper">
                            <select id="episode-selector">
                                <option value="">Loading episodes...</option>
                            </select>
                            <div class="select-arrow">${Icons.chevronDown}</div>
                        </div>
                    </div>

                    <!-- Components mount here -->
                    <div id="episode-info-mount"></div>
                    <div id="audio-controls-mount"></div>

                    <!-- Placeholder Message -->
                    <div id="audio-placeholder" class="placeholder-section" style="display: none;">
                        <div class="placeholder-icon">🎧</div>
                        <h4>Episode Selected</h4>
                        <div class="placeholder-card">
                            <p><strong>Audio file coming soon!</strong><br>This episode is being prepared.</p>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="player-footer">
                    <button id="minimize-btn" class="minimize-btn">
                        ${Icons.minimize} Minimize Player
                    </button>
                </div>
            </div>

            <!-- Minimized Player Bar -->
            <div id="podcast-mini-player" class="glass-panel mini-player" style="display: none;">
                <div class="mini-content">
                    <button id="mini-seek-back" class="mini-icon-btn">${Icons.skipBack}</button>
                    
                    <button id="mini-play-pause-btn" class="mini-play-btn">
                        ${Icons.play}
                    </button>
                    
                    <button id="mini-seek-fwd" class="mini-icon-btn">${Icons.skipFwd}</button>
                    
                    <div class="mini-info">
                        <div id="mini-episode-title">Select an episode</div>
                        <input type="range" id="mini-progress-bar" min="0" max="100" value="0">
                    </div>
                    
                    <button id="mini-expand-btn" class="mini-expand-btn">
                        ${Icons.expand}
                    </button>
                </div>
            </div>

            ${this.renderStyles()}
        `;
    }

    bindEvents() {
        document.getElementById('podcast-close-btn').onclick = () => this.controller.close();
        document.getElementById('minimize-btn').onclick = () => this.controller.minimize();
        document.getElementById('mini-expand-btn').onclick = () => this.controller.expand();

        // Info Modal
        const toggleInfo = () => {
            const modal = document.getElementById('podcast-info-modal');
            modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
        };
        document.getElementById('podcast-info-btn').onclick = toggleInfo;
        document.getElementById('podcast-info-close-btn').onclick = toggleInfo;

        // Episode Selector
        document.getElementById('episode-selector').onchange = (e) => this.controller.loadEpisode(e.target.value);
    }

    show() {
        document.getElementById('podcast-player-overlay').style.display = 'flex';
        document.getElementById('podcast-mini-player').style.display = 'none';
        if (window.innerWidth <= 768) document.body.style.overflow = 'hidden';
    }

    hide() {
        document.getElementById('podcast-player-overlay').style.display = 'none';
        document.getElementById('podcast-mini-player').style.display = 'none';
        document.body.style.overflow = '';
    }

    minimize() {
        document.getElementById('podcast-player-overlay').style.display = 'none';
        document.getElementById('podcast-mini-player').style.display = 'block';
        document.body.style.overflow = '';
    }

    populateSelector(episodes, currentId) {
        const selector = document.getElementById('episode-selector');
        selector.innerHTML = '';
        episodes.forEach(ep => {
            const option = document.createElement('option');
            option.value = ep.id;
            option.textContent = ep.title;
            if (ep.id === currentId) option.selected = true;
            selector.appendChild(option);
        });
    }

    updateMeta(episode) {
        if (!episode) return;
        const headerIcon = document.getElementById('podcast-header-icon');
        if (headerIcon && episode.icon) {
            headerIcon.src = episode.icon;
        }
    }

    // Styles extracted from original AudioUI
    renderStyles() {
        return `
            <style>
                :root {
                    --podcast-primary: #f59e0b;
                    --podcast-primary-dark: #ea580c;
                    --podcast-bg: rgba(255, 255, 255, 0.85);
                    --podcast-border: rgba(255, 255, 255, 0.5);
                    --podcast-text: #0f172a;
                    --podcast-text-light: #64748b;
                    --podcast-shadow: 0 10px 40px -10px rgba(0,0,0,0.15);
                }
                .glass-panel {
                    background: var(--podcast-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid var(--podcast-border);
                    box-shadow: var(--podcast-shadow);
                }
                #podcast-player-overlay {
                    position: fixed;
                    bottom: 100px;
                    right: 24px;
                    width: 400px;
                    max-height: 85vh;
                    border-radius: 24px;
                    z-index: 100000;
                    flex-direction: column;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .player-header {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    padding: 20px 24px;
                    color: white;
                }
                .header-content {
                    display: flex; justify-content: space-between; align-items: center;
                }
                .brand-container {
                    display: flex; align-items: center; gap: 16px;
                }
                .avatar-wrapper img {
                    width: 48px; height: 48px; border-radius: 50%;
                    border: 3px solid rgba(255,255,255,0.3);
                }
                .status-dot {
                    position: absolute; bottom: 2px; right: 2px;
                    width: 12px; height: 12px; background: #10b981;
                    border: 2px solid #ea580c; border-radius: 50%;
                }
                .brand-text h3 { margin: 0; font-size: 1.1rem; font-weight: 800; }
                .brand-text p { margin: 0; font-size: 0.8rem; opacity: 0.9; }
                .icon-btn {
                    background: rgba(255,255,255,0.2); border: none; color: white;
                    width: 36px; height: 36px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: all 0.2s;
                }
                .icon-btn:hover { background: rgba(255,255,255,0.3); transform: scale(1.05); }
                .player-body { flex: 1; overflow-y: auto; background: rgba(255,255,255,0.5); }
                .section { padding: 20px 24px; border-bottom: 1px solid rgba(0,0,0,0.05); }
                .episode-select-section label {
                    display: block; font-size: 0.8rem; font-weight: 700;
                    text-transform: uppercase; color: var(--podcast-text-light); margin-bottom: 10px;
                }
                select {
                    width: 100%; padding: 14px 16px; border: 1px solid #e2e8f0;
                    border-radius: 12px; font-size: 0.95rem; background: white;
                    color: var(--podcast-text); appearance: none;
                }
                .select-arrow {
                    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
                    pointer-events: none; color: var(--podcast-text-light); display: flex;
                }
                .player-footer {
                    padding: 15px 24px; border-top: 1px solid rgba(0,0,0,0.05);
                    background: rgba(255,255,255,0.3);
                }
                .minimize-btn {
                    width: 100%; background: none; border: none; padding: 10px;
                    color: var(--podcast-text-light); font-size: 0.9rem;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    cursor: pointer; border-radius: 12px;
                }
                .minimize-btn:hover { background: rgba(255,255,255,0.5); color: var(--podcast-text); }
                .mini-player {
                    position: fixed; bottom: 24px; right: 24px; width: 400px;
                    padding: 16px; border-radius: 20px; z-index: 100000;
                    transition: all 0.4s;
                }
                .mini-content { display: flex; align-items: center; gap: 15px; }
                .mini-info { flex: 1; overflow: hidden; }
                #mini-episode-title {
                    font-size: 0.9rem; font-weight: 700; margin-bottom: 6px;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .mini-play-btn {
                    width: 40px; height: 40px; border-radius: 50%;
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                    color: white; border: none; display: flex;
                    align-items: center; justify-content: center; cursor: pointer;
                }
                .mini-icon-btn, .mini-expand-btn {
                    background: none; border: none; color: var(--podcast-text); cursor: pointer; padding: 4px;
                }
                .info-modal {
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(255,255,255,0.95); z-index: 200;
                    display: flex; align-items: center; justify-content: center;
                    padding: 30px; text-align: center;
                }
                .info-content h4 { font-size: 1.4rem; margin-bottom: 15px; color: var(--podcast-text); }
                .info-content ol { text-align: left; background: #f1f5f9; padding: 20px 20px 20px 40px; border-radius: 12px; }
                .info-content li { margin-bottom: 10px; color: var(--podcast-text-light); }
                .close-info-btn {
                    margin-top: 20px; background: var(--podcast-primary); color: white;
                    border: none; padding: 12px 24px; border-radius: 30px;
                    font-weight: 700; cursor: pointer;
                }
            </style>
        `;
    }
}
