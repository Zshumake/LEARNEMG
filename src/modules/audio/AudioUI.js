// ============================================================================
// AUDIO UI RENDERER
// ============================================================================
// Handles all HTML generation, DOM injection, and Event Binding for the player.
// ============================================================================

import { getModuleEpisodes } from './AudioData.js';

export class AudioUI {
    constructor(controller) {
        this.controller = controller;
        this.overlayId = 'podcast-player-overlay';
        this.icons = this.getIcons();
    }

    getIcons() {
        return {
            close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            minimize: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
            play: `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
            pause: `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
            skipBack: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"></path></svg>`,
            skipFwd: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"></path></svg>`,
            volume: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
            notes: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
            transcript: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
            chevronDown: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
            expand: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`,
            info: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
            prev: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>`,
            next: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>`,
            rewind: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"></path></svg>`,
            forward: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"></path></svg>`
        };
    }

    inject() {
        // Remove existing elements if any
        const existingContainer = document.getElementById('podcast-container');
        if (existingContainer) existingContainer.remove();

        // Create container
        const container = document.createElement('div');
        container.id = 'podcast-container';
        container.innerHTML = this.createHTML();
        document.body.appendChild(container);

        this.attachEventListeners();
        console.log('✅ Podcast UI injected');
    }

    createHTML() {
        const icons = this.icons;

        return `
            <!-- Player Overlay -->
            <div id="podcast-player-overlay" class="glass-panel" style="display: none;">
                <!-- Header -->
                <div class="player-header">
                    <div class="header-content">
                        <div class="brand-container">
                            <div class="avatar-wrapper">
                                <img src="images/ui/ERNEST.png" alt="Ernest">
                                <div class="status-dot"></div>
                            </div>
                            <div class="brand-text">
                                <h3>Ernest's Podcast</h3>
                                <p>EMG/NCS Learning Series</p>
                            </div>
                        </div>
                        <div class="header-controls" style="display: flex; gap: 8px;">
                            <button id="podcast-info-btn" class="icon-btn info-btn" title="How to save app">
                                ${icons.info}
                            </button>
                            <button id="podcast-close-btn" class="icon-btn close-btn" title="Close">
                                ${icons.close}
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

                    <!-- Episode Selector -->
                    <div class="section episode-select-section">
                        <label>Select Episode</label>
                        <div class="select-wrapper">
                            <select id="episode-selector">
                                <option value="">Loading episodes...</option>
                            </select>
                            <div class="select-arrow">${icons.chevronDown}</div>
                        </div>
                    </div>

                    <!-- Current Episode Info -->
                    <div id="episode-info" class="section episode-info-section" style="display: none;">
                        <h4 id="episode-title"></h4>
                        <p id="episode-description"></p>
                        <div class="meta-row">
                            <span class="badge duration-badge">⏱️ <strong id="episode-duration">0:00</strong></span>
                        </div>
                    </div>

                    <!-- Audio Player Controls -->
                    <div id="audio-controls" class="section controls-section" style="display: none;">
                        
                        <!-- Progress Bar -->
                        <div class="progress-container">
                            <input type="range" id="progress-bar" min="0" max="100" value="0">
                            <div class="time-labels">
                                <span id="current-time">0:00</span>
                                <span id="total-duration">0:00</span>
                            </div>
                        </div>

                        <!-- Controls -->
                        <div class="player-controls">
                            <button class="control-btn" id="prev-btn" title="Previous Episode">
                                ${icons.prev}
                            </button>
                            <button class="control-btn" id="seek-back" title="Rewind 10s">
                                ${icons.rewind}
                            </button>
                            <button class="control-btn play-btn" id="play-pause-btn" title="Play/Pause">
                                ${icons.play}
                            </button>
                            <button class="control-btn" id="seek-fwd" title="Forward 10s">
                                ${icons.forward}
                            </button>
                            <button class="control-btn" id="next-btn" title="Next Episode">
                                ${icons.next}
                            </button>
                        </div>

                        <!-- Speed Controls -->
                        <div class="speed-controls">
                            <button class="speed-btn active" data-speed="1">1x</button>
                            <button class="speed-btn" data-speed="1.5">1.5x</button>
                            <button class="speed-btn" data-speed="2">2x</button>
                        </div>

                         <!-- Volume Control -->
                        <div class="volume-container">
                            <div class="volume-icon">${icons.volume}</div>
                            <input type="range" id="volume-slider" min="0" max="100" value="80">
                        </div>
                    </div>

                    <!-- Placeholder Message -->
                    <div id="audio-placeholder" class="placeholder-section" style="display: none;">
                        <div class="placeholder-icon">🎧</div>
                        <h4>Episode Selected</h4>
                        <div class="placeholder-card">
                            <p><strong>Audio file coming soon!</strong><br>This episode is being prepared.</p>
                        </div>
                    </div>

                    <!-- Show Notes Section -->
                    <div class="accordion-section">
                        <button id="show-notes-toggle" class="accordion-btn">
                            <span class="btn-label">${icons.notes} Show Notes</span>
                            <span id="show-notes-arrow" class="arrow-icon">${icons.chevronDown}</span>
                        </button>
                        <div id="show-notes-panel" class="accordion-panel" style="display: none;">
                            <div id="show-notes-content">Show notes will appear here...</div>
                        </div>
                    </div>

                    <!-- Transcript Section -->
                    <div class="accordion-section">
                        <button id="transcript-toggle" class="accordion-btn">
                            <span class="btn-label">${icons.transcript} Transcript</span>
                            <span id="transcript-arrow" class="arrow-icon">${icons.chevronDown}</span>
                        </button>
                        <div id="transcript-panel" class="accordion-panel" style="display: none;">
                            <div id="transcript-content">Transcript will appear here...</div>
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="player-footer">
                    <button id="minimize-btn" class="minimize-btn">
                        ${icons.minimize} Minimize Player
                    </button>
                </div>
            </div>

            <!-- Minimized Player Bar -->
            <div id="podcast-mini-player" class="glass-panel mini-player" style="display: none;">
                <div class="mini-content">
                    <button id="mini-seek-back" class="mini-icon-btn">${icons.skipBack}</button>
                    
                    <button id="mini-play-pause-btn" class="mini-play-btn">
                        ${icons.play}
                    </button>
                    
                    <button id="mini-seek-fwd" class="mini-icon-btn">${icons.skipFwd}</button>
                    
                    <div class="mini-info">
                        <div id="mini-episode-title">Select an episode</div>
                        <input type="range" id="mini-progress-bar" min="0" max="100" value="0">
                    </div>
                    
                    <button id="mini-expand-btn" class="mini-expand-btn">
                        ${icons.expand}
                    </button>
                </div>
            </div>

             <!-- Styles -->
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

                /* Glassmorphism Base */
                .glass-panel {
                    background: var(--podcast-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid var(--podcast-border);
                    box-shadow: var(--podcast-shadow);
                }

                /* Overlay Layout */
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

                /* Header */
                .player-header {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    padding: 20px 24px;
                    color: white;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .brand-container {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .avatar-wrapper {
                    position: relative;
                }

                .avatar-wrapper img {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 3px solid rgba(255,255,255,0.3);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    object-fit: cover;
                }

                .status-dot {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 12px;
                    height: 12px;
                    background: #10b981;
                    border: 2px solid #ea580c;
                    border-radius: 50%;
                }

                .brand-text h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                }

                .brand-text p {
                    margin: 0;
                    font-size: 0.8rem;
                    opacity: 0.9;
                    font-weight: 500;
                }

                .icon-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .icon-btn:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.05);
                }

                /* Body */
                .player-body {
                    flex: 1;
                    overflow-y: auto;
                    background: rgba(255,255,255,0.5);
                }

                .section {
                    padding: 20px 24px;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }

                /* Episode Selector */
                .episode-select-section label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--podcast-text-light);
                    margin-bottom: 10px;
                }

                .select-wrapper {
                    position: relative;
                }

                select {
                    width: 100%;
                    padding: 14px 16px;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    background: white;
                    color: var(--podcast-text);
                    font-weight: 500;
                    appearance: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }

                select:hover {
                    border-color: #cbd5e1;
                }

                select:focus {
                    outline: none;
                    border-color: var(--podcast-primary);
                    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
                }

                .select-arrow {
                    position: absolute;
                    right: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: var(--podcast-text-light);
                    display: flex;
                }

                /* Episode Info */
                .episode-info-section h4 {
                    margin: 0 0 8px 0;
                    font-size: 1.2rem;
                    color: var(--podcast-text);
                    line-height: 1.3;
                }

                .episode-info-section p {
                    margin: 0 0 16px 0;
                    font-size: 0.95rem;
                    color: var(--podcast-text-light);
                    line-height: 1.6;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 10px;
                    background: #f1f5f9;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #475569;
                }

                /* Controls */
                .controls-section {
                    background: rgba(255,255,255,0.6);
                }

                .progress-container {
                    margin-bottom: 24px;
                }

                .time-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--podcast-text-light);
                    margin-top: 8px;
                    font-weight: 600;
                }

                .player-controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .control-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #333;
                    transition: transform 0.2s, color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    border-radius: 50%;
                }

                .control-btn:hover {
                    background: rgba(0,0,0,0.05);
                    transform: scale(1.1);
                }

                .play-btn {
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                    border: none;
                    color: white;
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
                    transition: all 0.2s;
                }

                .play-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 15px 30px -5px rgba(59, 130, 246, 0.6);
                }

                .play-btn:active {
                    transform: scale(0.95);
                }

                .speed-controls {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .speed-btn {
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .speed-btn.active {
                    background: #f1f5f9;
                    color: var(--podcast-primary-dark);
                    border-color: var(--podcast-primary);
                }

                /* Show Notes / Transcript Accordions */
                .accordion-section {
                    border-top: 1px solid rgba(0,0,0,0.05);
                }

                .accordion-btn {
                    background: none;
                    border: none;
                    width: 100%;
                    padding: 16px 24px;
                    text-align: left;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    color: var(--podcast-text);
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                .accordion-btn:hover {
                    background: rgba(255,255,255,0.4);
                }

                .btn-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .arrow-icon {
                    transition: transform 0.3s;
                }

                .accordion-panel {
                    padding: 0 24px 20px;
                    font-size: 0.9rem;
                    color: var(--podcast-text-light);
                    line-height: 1.6;
                }

                /* Footer */
                .player-footer {
                    padding: 15px 24px;
                    border-top: 1px solid rgba(0,0,0,0.05);
                    background: rgba(255,255,255,0.3);
                }

                .minimize-btn {
                    width: 100%;
                    background: none;
                    border: none;
                    padding: 10px;
                    color: var(--podcast-text-light);
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    border-radius: 12px;
                }

                .minimize-btn:hover {
                    background: rgba(255,255,255,0.5);
                    color: var(--podcast-text);
                }

                /* Mini Player */
                .mini-player {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    width: 400px;
                    padding: 16px;
                    border-radius: 20px;
                    z-index: 100000;
                    transition: all 0.4s;
                }

                .mini-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .mini-info {
                    flex: 1;
                    overflow: hidden;
                }

                #mini-episode-title {
                    font-size: 0.9rem;
                    font-weight: 700;
                    margin-bottom: 6px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .mini-play-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .mini-icon-btn, .mini-expand-btn {
                    background: none;
                    border: none;
                    color: var(--podcast-text);
                    cursor: pointer;
                    padding: 4px;
                }

                input[type="range"] {
                    width: 100%;
                    height: 4px;
                    background: #e2e8f0;
                    border-radius: 2px;
                    appearance: none;
                    cursor: pointer;
                }

                input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--podcast-primary);
                    cursor: pointer;
                    transition: transform 0.1s;
                }

                input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }
            </style>
        `;
    }

    attachEventListeners() {
        // Bind click events via Controller
        document.getElementById('podcast-close-btn').onclick = () => this.controller.close();
        document.getElementById('podcast-info-btn').onclick = () => this.toggleInfo();
        document.getElementById('podcast-info-close-btn').onclick = () => this.toggleInfo();
        document.getElementById('minimize-btn').onclick = () => this.controller.minimize();
        document.getElementById('mini-expand-btn').onclick = () => this.controller.expand();

        // Controls
        document.getElementById('play-pause-btn').onclick = () => this.controller.togglePlayPause();
        document.getElementById('mini-play-pause-btn').onclick = () => this.controller.togglePlayPause();

        document.getElementById('prev-btn').onclick = () => this.controller.prevEpisode();
        document.getElementById('next-btn').onclick = () => this.controller.nextEpisode();

        document.getElementById('seek-back').onclick = () => this.controller.skip(-10);
        document.getElementById('mini-seek-back').onclick = () => this.controller.skip(-30);

        document.getElementById('seek-fwd').onclick = () => this.controller.skip(10);
        document.getElementById('mini-seek-fwd').onclick = () => this.controller.skip(30);

        // Inputs
        document.getElementById('episode-selector').onchange = (e) => this.controller.loadEpisode(e.target.value);
        document.getElementById('progress-bar').oninput = (e) => this.controller.seekToPercentage(e.target.value);
        document.getElementById('mini-progress-bar').oninput = (e) => this.controller.seekToPercentage(e.target.value);
        document.getElementById('volume-slider').oninput = (e) => this.controller.setVolume(e.target.value / 100);

        // Speed
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.controller.setSpeed(parseFloat(btn.dataset.speed));
            };
        });

        // Accordions
        document.getElementById('show-notes-toggle').onclick = () => this.toggleAccordion('show-notes-panel', 'show-notes-arrow');
        document.getElementById('transcript-toggle').onclick = () => this.toggleAccordion('transcript-panel', 'transcript-arrow');
    }

    toggleInfo() {
        const modal = document.getElementById('podcast-info-modal');
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    }

    toggleAccordion(panelId, arrowId) {
        const panel = document.getElementById(panelId);
        const arrow = document.getElementById(arrowId);
        const isOpen = panel.style.display === 'block';

        panel.style.display = isOpen ? 'none' : 'block';
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    }

    // Update Methods
    updatePlayState(isPlaying) {
        const icon = isPlaying ? this.icons.pause : this.icons.play;
        document.getElementById('play-pause-btn').innerHTML = icon;
        document.getElementById('mini-play-pause-btn').innerHTML = icon;
    }

    updateTime(current, total, percent) {
        document.getElementById('current-time').textContent = this.formatTime(current);
        document.getElementById('total-duration').textContent = this.formatTime(total);
        document.getElementById('episode-duration').textContent = this.formatTime(total); // Also update badge

        // Update bars if not being dragged (simple check to avoid jitter, can be improved)
        const bar = document.getElementById('progress-bar');
        const miniBar = document.getElementById('mini-progress-bar');

        // We set value only if we are playing to update position
        bar.value = percent;
        miniBar.value = percent;

        // Update background gradient
        bar.style.background = `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
        miniBar.style.background = `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
    }

    updateEpisodeInfo(episode) {
        if (!episode) return;

        document.getElementById('episode-title').textContent = episode.title;
        document.getElementById('episode-description').textContent = episode.description;
        document.getElementById('mini-episode-title').textContent = episode.title;

        // Populate content
        document.getElementById('show-notes-content').innerHTML = episode.showNotes || 'No notes available.';
        document.getElementById('transcript-content').innerHTML = episode.transcript || 'No transcript available.';

        // Show controls, hide placeholder
        document.getElementById('audio-controls').style.display = 'block';
        document.getElementById('episode-info').style.display = 'block';
        document.getElementById('audio-placeholder').style.display = 'none';

        // Select in dropdown
        document.getElementById('episode-selector').value = episode.id;
    }

    populateEpisodeSelector(episodes, currentId) {
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

    showPlayer() {
        document.getElementById('podcast-player-overlay').style.display = 'flex';
        document.getElementById('podcast-mini-player').style.display = 'none';

        // Mobile optimization check
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling bg
        }
    }

    hidePlayer() {
        document.getElementById('podcast-player-overlay').style.display = 'none';
        document.getElementById('podcast-mini-player').style.display = 'none';
        document.body.style.overflow = '';
    }

    minimizePlayer() {
        document.getElementById('podcast-player-overlay').style.display = 'none';
        document.getElementById('podcast-mini-player').style.display = 'block';
        document.body.style.overflow = '';
    }

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}
