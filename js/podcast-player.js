// ============================================================================
// ERNEST'S PODCAST PLAYER - GLOBAL SYSTEM
// ============================================================================
// Persistent audio player that works across all modules
// Floating Ernest button triggers player overlay
// ============================================================================

import { podcastEpisodes, getModuleEpisodes } from './podcast-data.js';

console.log('🎧 Loading Ernest\'s Podcast Player...');

// ============================================================================
// GLOBAL STATE
// ============================================================================
const podcastState = {
    currentModule: null,
    currentEpisode: null,
    isPlaying: false,
    isMinimized: false,
    isPlayerVisible: false,
    volume: 0.8,
    volume: 0.8,
    playbackPosition: 0
};

// ============================================================================
// ICONS (SVG)
// ============================================================================
const PODCAST_ICONS = {
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
    rewind: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"></path></svg>`, // Reusing skipBack for consistency
    forward: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"></path></svg>` // Reusing skipFwd for consistency
};

// Audio element (created once, reused globally)
let audioElement = null;

// ============================================================================
// INITIALIZATION
// ============================================================================
export function initializePodcastPlayer() {
    console.log('🎧 Initializing podcast player...');

    // Create audio element
    audioElement = new Audio();
    audioElement.volume = podcastState.volume;
    audioElement.preload = 'auto'; // Preload full audio for faster playback

    // Setup audio event listeners
    setupAudioEventListeners();

    // Load saved state from localStorage
    loadSavedState();

    // Create Ernest button and player overlay
    injectPodcastUI();

    console.log('✅ Podcast player initialized');
}

// ============================================================================
// MODULE REGISTRATION
// ============================================================================
export function registerModulePodcasts(moduleId) {
    console.log(`🎧 Registering podcasts for module: ${moduleId}`);

    const episodes = getModuleEpisodes(moduleId);

    if (episodes && episodes.length > 0) {
        podcastState.currentModule = moduleId;
        updateEpisodeSelector();

        // Auto-select first episode if none selected
        if (!podcastState.currentEpisode && episodes.length > 0) {
            podcastState.currentEpisode = episodes[0];
            if (podcastState.isPlayerVisible) {
                updatePlayerDisplay();
            }
        }
    }
}

// ============================================================================
// ERNEST BUTTON GENERATOR (for modules to include)
// ============================================================================
export function generateErnestButton(moduleId, moduleTitle = null) {
    const episodes = getModuleEpisodes(moduleId);

    if (!episodes || episodes.length === 0) {
        console.warn(`No podcast episodes found for module: ${moduleId}`);
        return ''; // No button if no episodes
    }

    const displayTitle = moduleTitle || moduleId;
    const episodeCount = episodes.length;

    // SVG Icons
    const playIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    const headphonesIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`;

    // SPECIAL CASE: EMG Introduction - Show both episodes with separate buttons
    if (moduleId === 'emg-introduction') {
        return `
            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 88, 12, 0.1));
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.5);
                        padding: 24px;
                        border-radius: 20px;
                        margin-bottom: 24px;
                        box-shadow: 0 10px 30px rgba(245, 158, 11, 0.15);">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                    <div style="position: relative;">
                        <img src="ERNEST.png"
                             style="width: 64px; height: 64px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover;"
                             alt="Ernest">
                        <div style="position: absolute; bottom: 0; right: 0; background: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 800; font-size: 1.25em; margin-bottom: 6px; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                            <span style="color: #ea580c;">${headphonesIcon}</span> Ernest's EMG Podcasts
                        </div>
                        <div style="font-size: 0.95em; color: #64748b; line-height: 1.5;">
                            Deep dive into EMG concepts with these audio lessons.
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <button onclick="window.playModulePodcast('emg-introduction', 'emg-intro-main')"
                            class="podcast-trigger-btn"
                            style="flex: 1; min-width: 220px;
                                   background: white;
                                   color: #0f172a;
                                   border: 1px solid #e2e8f0;
                                   padding: 16px 20px;
                                   border-radius: 16px;
                                   font-weight: 600;
                                   font-size: 0.95em;
                                   cursor: pointer;
                                   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                                   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                                   display: flex;
                                   align-items: center;
                                   gap: 12px;
                                   text-align: left;">
                        <div style="background: #fff7ed; color: #ea580c; padding: 10px; border-radius: 12px; display: flex;">${playIcon}</div>
                        <div>
                            <div style="font-weight: 700;">EMG Introduction</div>
                            <div style="font-size: 0.85em; color: #64748b; margin-top: 2px;">101 min</div>
                        </div>
                    </button>
                    <button onclick="window.playModulePodcast('emg-introduction', 'emg-terminology')"
                            class="podcast-trigger-btn"
                            style="flex: 1; min-width: 220px;
                                   background: white;
                                   color: #0f172a;
                                   border: 1px solid #e2e8f0;
                                   padding: 16px 20px;
                                   border-radius: 16px;
                                   font-weight: 600;
                                   font-size: 0.95em;
                                   cursor: pointer;
                                   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                                   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                                   display: flex;
                                   align-items: center;
                                   gap: 12px;
                                   text-align: left;">
                        <div style="background: #fff7ed; color: #ea580c; padding: 10px; border-radius: 12px; display: flex;">${playIcon}</div>
                        <div>
                            <div style="font-weight: 700;">Essential Terminology</div>
                            <div style="font-size: 0.85em; color: #64748b; margin-top: 2px;">28 min</div>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }

    // SINGLE EPISODE: Clickable banner with direct play
    if (episodeCount === 1) {
        const episode = episodes[0];
        return `
            <div onclick="window.playModulePodcast('${moduleId}', '${episode.id}')"
                 class="podcast-card-hover"
                 style="background: linear-gradient(135deg, #ffffff, #f8fafc);
                        border: 1px solid rgba(226, 232, 240, 0.8);
                        padding: 24px;
                        border-radius: 20px;
                        margin-bottom: 24px;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        position: relative;
                        overflow: hidden;">
                
                <!-- Decorative background blob -->
                <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>

                <div style="position: relative;">
                    <img src="ERNEST.png"
                         style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover;"
                         alt="Ernest">
                    <div style="position: absolute; bottom: 2px; right: 2px; background: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>
                </div>

                <div style="flex: 1; z-index: 1;">
                    <div style="font-weight: 800; font-size: 1.2em; margin-bottom: 6px; color: #0f172a;">
                        ${displayTitle} Podcast
                    </div>
                    <div style="font-size: 0.95em; color: #64748b; display: flex; align-items: center; gap: 8px;">
                        <span style="background: #f1f5f9; padding: 2px 8px; border-radius: 12px; font-size: 0.85em; font-weight: 600; color: #475569;">${episode.duration}</span>
                        <span>Click to listen</span>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #f59e0b, #ea580c);
                           color: white;
                           width: 48px;
                           height: 48px;
                           border-radius: 50%;
                           display: flex;
                           align-items: center;
                           justify-content: center;
                           box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
                           transition: transform 0.2s;">
                    ${playIcon}
                </div>
            </div>
        `;
    }

    // MULTIPLE EPISODES: Generic message, opens player with first episode
    const firstEpisode = episodes[0];
    return `
        <div onclick="window.playModulePodcast('${moduleId}', '${firstEpisode.id}')"
             class="podcast-card-hover"
             style="background: linear-gradient(135deg, #ffffff, #f8fafc);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    padding: 24px;
                    border-radius: 20px;
                    margin-bottom: 24px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    position: relative;
                    overflow: hidden;">
            
            <!-- Decorative background blob -->
            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>

            <div style="position: relative;">
                <img src="ERNEST.png"
                     style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover;"
                     alt="Ernest">
                <div style="position: absolute; bottom: 2px; right: 2px; background: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>
            </div>

            <div style="flex: 1; z-index: 1;">
                <div style="font-weight: 800; font-size: 1.2em; margin-bottom: 6px; color: #0f172a;">
                    ${displayTitle} Series
                </div>
                <div style="font-size: 0.95em; color: #64748b;">
                    ${episodeCount} episodes available • Click to browse
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #f59e0b, #ea580c);
                       color: white;
                       width: 48px;
                       height: 48px;
                       border-radius: 50%;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                       box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
                       transition: transform 0.2s;">
                ${playIcon}
            </div>
        </div>
    `;
}

// ============================================================================
// UI INJECTION
// ============================================================================
function injectPodcastUI() {
    // Remove existing elements if any
    const existingButton = document.getElementById('ernest-podcast-button');
    const existingOverlay = document.getElementById('podcast-player-overlay');
    if (existingButton) existingButton.remove();
    if (existingOverlay) existingOverlay.remove();

    // Create container
    const container = document.createElement('div');
    container.id = 'podcast-container';
    container.innerHTML = createPodcastHTML();
    document.body.appendChild(container);

    // Attach event listeners
    attachEventListeners();

    console.log('🔍 DEBUG: Podcast UI injected');
    const overlay = document.getElementById('podcast-player-overlay');
    console.log('🔍 DEBUG: Overlay element:', overlay);
    if (overlay) {
        console.log('🔍 DEBUG: Overlay initial style:', window.getComputedStyle(overlay).display);
        console.log('🔍 DEBUG: Overlay z-index:', window.getComputedStyle(overlay).zIndex);
    } else {
        console.error('❌ CRITICAL: Podcast overlay NOT found in DOM after injection');
    }
}

function createPodcastHTML() {
    const icons = PODCAST_ICONS;

    return `
        <!-- Player Overlay -->
        <div id="podcast-player-overlay" class="glass-panel">
            <!-- Header -->
            <div class="player-header">
                <div class="header-content">
                    <div class="brand-container">
                        <div class="avatar-wrapper">
                            <img src="ERNEST.png" alt="Ernest">
                            <div class="status-dot"></div>
                        </div>
                        <div class="brand-text">
                            <h3>Ernest's Podcast</h3>
                            <p>EMG/NCS Learning Series</p>
                        </div>
                    </div>
                    <div class="header-controls" style="display: flex; gap: 8px;">
                        <button onclick="window.toggleInfoModal()" class="icon-btn info-btn" title="How to save app">
                            ${icons.info}
                        </button>
                        <button onclick="window.closePodcastPlayer()" class="icon-btn close-btn" title="Close">
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
                    <button onclick="window.toggleInfoModal()" class="close-info-btn">Got it!</button>
                </div>
            </div>

            <!-- Scrollable Content Area -->
            <div class="player-body">

                <!-- Episode Selector -->
                <div class="section episode-select-section">
                    <label>Select Episode</label>
                    <div class="select-wrapper">
                        <select id="episode-selector" onchange="window.changeEpisode(this.value)">
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
                        <input type="range" id="progress-bar" min="0" max="100" value="0" onchange="window.seekAudio(this.value)">
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
                <button class="control-btn play-btn" id="play-pause-btn" title="Play/Pause" onclick="window.togglePlayPause()">
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
            </div>         <!-- Volume Control -->
                    <div class="volume-container">
                        <div class="volume-icon">${icons.volume}</div>
                        <input type="range" id="volume-slider" min="0" max="100" value="80" onchange="window.setVolume(this.value)">
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
                    <button id="show-notes-toggle" onclick="window.toggleShowNotes()" class="accordion-btn">
                        <span class="btn-label">${icons.notes} Show Notes</span>
                        <span id="show-notes-arrow" class="arrow-icon">${icons.chevronDown}</span>
                    </button>
                    <div id="show-notes-panel" class="accordion-panel" style="display: none;">
                        <div id="show-notes-content">Show notes will appear here...</div>
                    </div>
                </div>

                <!-- Transcript Section -->
                <div class="accordion-section">
                    <button id="transcript-toggle" onclick="window.toggleTranscript()" class="accordion-btn">
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
                <button onclick="window.minimizePodcastPlayer()" class="minimize-btn">
                    ${icons.minimize} Minimize Player
                </button>
            </div>
        </div>

        <!-- Minimized Player Bar -->
        <div id="podcast-mini-player" class="glass-panel mini-player" style="display: none;">
            <div class="mini-content">
                <button onclick="window.skipAudio(-30)" class="mini-icon-btn">${icons.skipBack}</button>
                
                <button id="mini-play-pause-btn" onclick="window.togglePlayPause()" class="mini-play-btn">
                    ${icons.play}
                </button>
                
                <button onclick="window.skipAudio(30)" class="mini-icon-btn">${icons.skipFwd}</button>
                
                <div class="mini-info">
                    <div id="mini-episode-title">Select an episode</div>
                    <input type="range" id="mini-progress-bar" min="0" max="100" value="0" onchange="window.seekAudio(this.value)">
                </div>
                
                <button onclick="window.expandPodcastPlayer()" class="mini-expand-btn">
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
                display: none; /* Hidden by default */
                flex-direction: column;
                overflow: hidden;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                /* animation: slideUp 0.4s ease-out; */ /* Removed auto-popup animation */
            }

            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
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
                object-fit: cover; /* Fix squashed icon */
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

            .skip-btn {
                background: none;
                border: none;
                color: var(--podcast-text-light);
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                transition: color 0.2s;
            }

            .skip-btn:hover {
                color: var(--podcast-primary-dark);
            }

            .skip-text {
                font-size: 0.7rem;
                font-weight: 700;
            }

            .speed-controls {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 10px;
                margin-bottom: 5px;
            }

            .speed-btn {
                background: rgba(255, 255, 255, 0.5);
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                padding: 4px 10px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s;
                color: #555;
                font-weight: 600;
            }

            .speed-btn.active {
                background: #f59e0b;
                color: white;
                border-color: #f59e0b;
            }

            .speed-btn:hover:not(.active) {
                background: rgba(255, 255, 255, 0.8);
            }

            .volume-container {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: white;
                border-radius: 12px;
                border: 1px solid rgba(0,0,0,0.05);
            }

            .volume-icon {
                color: var(--podcast-text-light);
                display: flex;
            }

            /* Sliders */
            input[type="range"] {
                -webkit-appearance: none;
                width: 100%;
                height: 6px;
                background: #e2e8f0;
                border-radius: 3px;
                outline: none;
            }

            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                background: white;
                border: 2px solid #3b82f6;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                transition: transform 0.1s;
            }

            input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.1);
            }

            /* Accordions */
            .accordion-btn {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: none;
                border: none;
                padding: 16px 0;
                cursor: pointer;
                color: var(--podcast-text);
                font-weight: 600;
                font-size: 0.95rem;
                transition: color 0.2s;
            }

            .accordion-btn:hover {
                color: var(--podcast-primary-dark);
            }

            .btn-label {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .accordion-panel {
                padding-bottom: 20px;
                font-size: 0.9rem;
                line-height: 1.6;
                color: #475569;
            }

            /* Footer */
            .player-footer {
                padding: 16px 24px;
                background: white;
                border-top: 1px solid rgba(0,0,0,0.05);
            }

            .minimize-btn {
                width: 100%;
                padding: 12px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                color: var(--podcast-text-light);
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.2s;
            }

            .minimize-btn:hover {
                background: #f1f5f9;
                color: var(--podcast-text);
            }

            /* Mini Player */
            #podcast-mini-player {
                position: fixed;
                bottom: 100px;
                right: 24px;
                width: 340px;
                border-radius: 16px;
                z-index: 100000;
                padding: 12px 16px;
                animation: slideUp 0.3s ease-out;
            }

            .mini-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .mini-play-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                border: none;
                color: white;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }

            .mini-icon-btn {
                background: none;
                border: none;
                color: var(--podcast-text-light);
                cursor: pointer;
                padding: 4px;
                display: flex;
            }

            .mini-info {
                flex: 1;
                min-width: 0;
            }

            #mini-episode-title {
                font-size: 0.85rem;
                font-weight: 700;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 4px;
            }

            .mini-expand-btn {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #f1f5f9;
                border: none;
                color: var(--podcast-text-light);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }

            /* Placeholder */
            .placeholder-section {
                text-align: center;
                padding: 40px 20px;
            }

            .placeholder-icon {
                font-size: 3rem;
                margin-bottom: 16px;
            }

            .placeholder-card {
                background: #fff7ed;
                border: 1px solid #ffedd5;
                padding: 16px;
                border-radius: 12px;
                color: #9a3412;
                font-size: 0.9rem;
            }
            /* Info Modal */
            .info-modal {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                z-index: 20;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                animation: fadeIn 0.2s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .info-content {
                text-align: center;
                color: var(--podcast-text);
            }

            .info-content h4 {
                font-size: 1.4rem;
                margin-bottom: 16px;
                color: var(--podcast-primary-dark);
            }

            .info-content p {
                margin-bottom: 20px;
                line-height: 1.5;
            }

            .info-content ol {
                text-align: left;
                margin-bottom: 24px;
                padding-left: 24px;
            }

            .info-content li {
                margin-bottom: 12px;
                line-height: 1.4;
            }

            .close-info-btn {
                background: var(--podcast-primary);
                color: white;
                border: none;
                padding: 12px 32px;
                border-radius: 24px;
                font-weight: 700;
                font-size: 1rem;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
                transition: transform 0.2s;
            }

            .close-info-btn:hover {
                transform: scale(1.05);
            }
        </style>
    `;
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================
function attachEventListeners() {
    // Make functions globally accessible
    window.togglePodcastPlayer = togglePodcastPlayer;
    window.closePodcastPlayer = closePodcastPlayer;
    window.minimizePodcastPlayer = minimizePodcastPlayer;
    window.expandPodcastPlayer = expandPodcastPlayer;
    window.changeEpisode = changeEpisode;
    window.playModulePodcast = playModulePodcast;
    // Aliases for legacy HTML calls
    window.openModulePodcast = playModulePodcast;
    window.playExtraPodcast = playModulePodcast;

    window.togglePlayPause = togglePlayPause;

    // Removed duplicate event listeners (handled by onclick in HTML)

    window.seekAudio = seekAudio;
    window.seekAudio = seekAudio;
    window.setVolume = setVolume;
    window.skipAudio = skipAudio;
    window.toggleShowNotes = toggleShowNotes;
    window.toggleShowNotes = toggleShowNotes;
    window.toggleTranscript = toggleTranscript;
    window.toggleInfoModal = toggleInfoModal;

    // Speed Control Logic
    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseFloat(btn.dataset.speed);
            if (audioElement) {
                audioElement.playbackRate = speed;
            }

            // Update active state
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function setupAudioEventListeners() {
    if (!audioElement) return;

    // Update progress bar as audio plays
    audioElement.addEventListener('timeupdate', () => {
        if (audioElement.duration) {
            const progress = (audioElement.currentTime / audioElement.duration) * 100;
            updateProgressBars(progress);
            updateTimeDisplays();
        }
    });

    // Handle audio end
    audioElement.addEventListener('ended', () => {
        podcastState.isPlaying = false;
        updatePlayPauseButtons();
        hidePlayingIndicator();
    });

    // Handle audio loading - show metadata loaded
    audioElement.addEventListener('loadedmetadata', () => {
        console.log('🎧 Audio metadata loaded');
        updateDurationDisplays();
    });

    // Handle audio buffering start
    audioElement.addEventListener('waiting', () => {
        console.log('🎧 Buffering audio...');
        showBufferingIndicator();
    });

    // Handle audio can play through (enough buffered)
    audioElement.addEventListener('canplaythrough', () => {
        console.log('🎧 Audio ready to play');
        hideBufferingIndicator();
        showAudioControls();
        hideAudioPlaceholder();
    });

    // When audio can start playing
    audioElement.addEventListener('canplay', () => {
        console.log('🎧 Audio can start playing');
        hideBufferingIndicator();
        showAudioControls();
        hideAudioPlaceholder();
    });

    // Handle audio playing (resumed after buffering)
    audioElement.addEventListener('playing', () => {
        hideBufferingIndicator();
    });

    // Handle audio errors
    audioElement.addEventListener('error', (e) => {
        console.warn('🎧 Audio file not available:', e);
        hideBufferingIndicator();
        showAudioPlaceholder();
        hideAudioControls();
    });

    // Handle audio loading progress
    audioElement.addEventListener('progress', () => {
        if (audioElement.buffered.length > 0) {
            const bufferedEnd = audioElement.buffered.end(audioElement.buffered.length - 1);
            const duration = audioElement.duration;
            if (duration > 0) {
                const percentBuffered = (bufferedEnd / duration) * 100;
                console.log(`🎧 Buffered: ${percentBuffered.toFixed(1)}%`);
            }
        }
    });
}

// ============================================================================
// PLAYER CONTROLS
// ============================================================================
function togglePodcastPlayer() {
    if (podcastState.isPlayerVisible) {
        closePodcastPlayer();
    } else {
        openPodcastPlayer();
    }
}

function openPodcastPlayer() {
    const overlay = document.getElementById('podcast-player-overlay');
    const miniPlayer = document.getElementById('podcast-mini-player');

    if (overlay) {
        console.log('🎧 Opening podcast player overlay');
        console.log('🔍 DEBUG: Before open - Display:', overlay.style.display, 'Computed:', window.getComputedStyle(overlay).display);

        overlay.style.display = 'flex';
        miniPlayer.style.display = 'none';
        podcastState.isPlayerVisible = true;
        podcastState.isMinimized = false;

        console.log('🔍 DEBUG: After open - Display:', overlay.style.display, 'Computed:', window.getComputedStyle(overlay).display);
        console.log('🔍 DEBUG: Overlay classes:', overlay.className);
        console.log('🔍 DEBUG: Overlay z-index:', window.getComputedStyle(overlay).zIndex);

        // Ensure episode selector is updated with current module's episodes
        updateEpisodeSelector();
        updatePlayerDisplay();
    } else {
        console.error('❌ CRITICAL: Cannot open player - Overlay element not found');
    }
}

function closePodcastPlayer() {
    // If playing, minimize instead of closing completely
    if (podcastState.isPlaying) {
        minimizePodcastPlayer();
        return;
    }

    const overlay = document.getElementById('podcast-player-overlay');
    const miniPlayer = document.getElementById('podcast-mini-player');

    if (overlay) {
        overlay.style.display = 'none';
        miniPlayer.style.display = 'none';
        podcastState.isPlayerVisible = false;
        podcastState.isMinimized = false;
    }
}

function minimizePodcastPlayer() {
    const overlay = document.getElementById('podcast-player-overlay');
    const miniPlayer = document.getElementById('podcast-mini-player');

    if (overlay && miniPlayer) {
        overlay.style.display = 'none';
        miniPlayer.style.display = 'block';
        podcastState.isMinimized = true;
        updateMiniPlayerDisplay();
    }
}

function expandPodcastPlayer() {
    const overlay = document.getElementById('podcast-player-overlay');
    const miniPlayer = document.getElementById('podcast-mini-player');

    if (overlay && miniPlayer) {
        overlay.style.display = 'flex';
        miniPlayer.style.display = 'none';
        podcastState.isMinimized = false;
    }
}

function togglePlayPause() {
    console.log('🎧 togglePlayPause called. Current state:', podcastState.isPlaying ? 'Playing' : 'Paused');
    if (!audioElement || !podcastState.currentEpisode) {
        console.warn('🎧 No episode selected');
        return;
    }

    if (podcastState.isPlaying) {
        console.log('🎧 Attempting to pause...');
        audioElement.pause();
        podcastState.isPlaying = false;
        hidePlayingIndicator();
    } else {
        console.log('🎧 Attempting to play...');
        const playPromise = audioElement.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('🎧 Playback started successfully');
                podcastState.isPlaying = true;
                showPlayingIndicator();
                updatePlayPauseButtons();
            }).catch(err => {
                console.error('❌ Audio Playback Error:', err);
                console.error('❌ Error Name:', err.name);
                console.error('❌ Error Message:', err.message);
            });
        }
    }

    updatePlayPauseButtons();
    saveState();
}

function seekAudio(value) {
    if (!audioElement || !audioElement.duration) return;

    const time = (value / 100) * audioElement.duration;
    audioElement.currentTime = time;
    saveState();
}

function skipAudio(seconds) {
    if (!audioElement) return;
    audioElement.currentTime += seconds;
    saveState();
}

function setVolume(value) {
    if (!audioElement) return;

    const volume = value / 100;
    audioElement.volume = volume;
    podcastState.volume = volume;

    const volumePercent = document.getElementById('volume-percent');
    if (volumePercent) {
        volumePercent.textContent = value + '%';
    }

    saveState();
}

function changeEpisode(episodeId) {
    if (!episodeId || !podcastState.currentModule) return;

    const episodes = getModuleEpisodes(podcastState.currentModule);
    const episode = episodes.find(ep => ep.id === episodeId);

    if (episode) {
        loadEpisode(episode);
    }
}

// Play specific module podcast episode (called from top banner buttons)
function playModulePodcast(moduleId, episodeId) {
    console.log(`🎧 Playing module podcast: ${moduleId} - ${episodeId}`);

    // Register module podcasts
    registerModulePodcasts(moduleId);

    // Find the episode
    const episodes = getModuleEpisodes(moduleId);
    const episode = episodes.find(ep => ep.id === episodeId);

    if (episode) {
        // Load the episode and auto-play
        loadEpisode(episode, true);

        console.log('🔍 DEBUG: Calling openPodcastPlayer from playModulePodcast');
        // Open the player (force open even if minimized)
        openPodcastPlayer();

        // Update the episode selector to show the correct episode
        setTimeout(() => {
            updateEpisodeSelector();
        }, 100);
    }
}

function loadEpisode(episode, autoPlay = false) {
    console.log('🎧 Loading episode:', episode.title, 'AutoPlay:', autoPlay);

    podcastState.currentEpisode = episode;

    // Stop current playback
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        podcastState.isPlaying = false;
        hidePlayingIndicator();
    }

    // Load new audio
    console.log('🎧 Setting audio src:', episode.audioFile);
    audioElement.src = episode.audioFile;

    // Update display
    updatePlayerDisplay();
    updatePlayPauseButtons();

    // Auto-play if requested
    if (autoPlay) {
        console.log('🎧 Auto-play requested for new episode');
        // Small timeout to ensure DOM is ready and src is set
        setTimeout(() => {
            if (!podcastState.isPlaying) {
                togglePlayPause();
            }
        }, 100);
    }

    // Show episode info
    const episodeInfo = document.getElementById('episode-info');
    if (episodeInfo) episodeInfo.style.display = 'block';

    saveState();
}

// ============================================================================
// UI UPDATES
// ============================================================================
function updatePlayerDisplay() {
    if (!podcastState.currentEpisode) return;

    const episode = podcastState.currentEpisode;

    // Update episode info
    const titleEl = document.getElementById('episode-title');
    const descEl = document.getElementById('episode-description');
    const durationEl = document.getElementById('episode-duration');

    if (titleEl) titleEl.textContent = episode.title;
    if (descEl) descEl.textContent = episode.description;
    if (durationEl) durationEl.textContent = episode.duration;

    // Update show notes
    const showNotesContent = document.getElementById('show-notes-content');
    if (showNotesContent) {
        showNotesContent.innerHTML = episode.showNotes || 'No show notes available.';
    }

    // Update transcript
    const transcriptContent = document.getElementById('transcript-content');
    if (transcriptContent) {
        transcriptContent.textContent = episode.transcript || 'Transcript not yet available.';
    }
}

function updateEpisodeSelector() {
    const selector = document.getElementById('episode-selector');
    if (!selector || !podcastState.currentModule) return;

    const episodes = getModuleEpisodes(podcastState.currentModule);

    // Clear existing options
    selector.innerHTML = '';

    if (episodes.length === 0) {
        selector.innerHTML = '<option value="">No episodes available</option>';
        return;
    }

    // Add episodes
    episodes.forEach(episode => {
        const option = document.createElement('option');
        option.value = episode.id;
        option.textContent = episode.title;
        if (podcastState.currentEpisode && episode.id === podcastState.currentEpisode.id) {
            option.selected = true;
        }
        selector.appendChild(option);
    });
}

function updatePlayPauseButtons() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const miniPlayPauseBtn = document.getElementById('mini-play-pause-btn');

    const icon = podcastState.isPlaying ? PODCAST_ICONS.pause : PODCAST_ICONS.play;

    if (playPauseBtn) playPauseBtn.innerHTML = icon;
    if (miniPlayPauseBtn) miniPlayPauseBtn.innerHTML = icon;
}

function updateProgressBars(progress) {
    const progressBar = document.getElementById('progress-bar');
    const miniProgressBar = document.getElementById('mini-progress-bar');

    if (progressBar) progressBar.value = progress;
    if (miniProgressBar) miniProgressBar.value = progress;
}

function updateTimeDisplays() {
    if (!audioElement) return;

    const currentTime = formatTime(audioElement.currentTime);
    const currentTimeEls = [
        document.getElementById('current-time'),
        document.getElementById('mini-current-time')
    ];

    currentTimeEls.forEach(el => {
        if (el) el.textContent = currentTime;
    });
}

function updateDurationDisplays() {
    if (!audioElement || !audioElement.duration) return;

    const duration = formatTime(audioElement.duration);
    const durationEls = [
        document.getElementById('total-duration'),
        document.getElementById('mini-total-duration')
    ];

    durationEls.forEach(el => {
        if (el) el.textContent = duration;
    });
}

function updateMiniPlayerDisplay() {
    const miniTitle = document.getElementById('mini-episode-title');

    if (miniTitle && podcastState.currentEpisode) {
        miniTitle.textContent = podcastState.currentEpisode.title;
    }
}

function showPlayingIndicator() {
    // Update all Ernest buttons in all modules
    const indicators = document.querySelectorAll('.podcast-playing-indicator');
    indicators.forEach(indicator => indicator.style.display = 'block');
}

function hidePlayingIndicator() {
    // Update all Ernest buttons in all modules
    const indicators = document.querySelectorAll('.podcast-playing-indicator');
    indicators.forEach(indicator => indicator.style.display = 'none');
}

function showAudioControls() {
    const controls = document.getElementById('audio-controls');
    if (controls) controls.style.display = 'block';
}

function hideAudioControls() {
    const controls = document.getElementById('audio-controls');
    if (controls) controls.style.display = 'none';
}

function showAudioPlaceholder() {
    const placeholder = document.getElementById('audio-placeholder');
    if (placeholder) placeholder.style.display = 'block';
}

function hideAudioPlaceholder() {
    const placeholder = document.getElementById('audio-placeholder');
    if (placeholder) placeholder.style.display = 'none';
}

function showBufferingIndicator() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const miniPlayPauseBtn = document.getElementById('mini-play-pause-btn');

    if (playPauseBtn) {
        playPauseBtn.textContent = '⏳';
        playPauseBtn.style.opacity = '0.6';
    }
    if (miniPlayPauseBtn) {
        miniPlayPauseBtn.textContent = '⏳';
        miniPlayPauseBtn.style.opacity = '0.6';
    }
}

function hideBufferingIndicator() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const miniPlayPauseBtn = document.getElementById('mini-play-pause-btn');

    if (playPauseBtn) playPauseBtn.style.opacity = '1';
    if (miniPlayPauseBtn) miniPlayPauseBtn.style.opacity = '1';

    updatePlayPauseButtons(); // Restore correct icon
}

function toggleShowNotes() {
    const panel = document.getElementById('show-notes-panel');
    const arrow = document.getElementById('show-notes-arrow');

    if (panel && arrow) {
        const isVisible = panel.style.display === 'block';
        panel.style.display = isVisible ? 'none' : 'block';
        arrow.textContent = isVisible ? '▼' : '▲';
    }
}

function toggleTranscript() {
    const panel = document.getElementById('transcript-panel');
    const arrow = document.getElementById('transcript-arrow');

    if (panel && arrow) {
        const isVisible = panel.style.display === 'block';
        panel.style.display = isVisible ? 'none' : 'block';
        arrow.textContent = isVisible ? '▼' : '▲';
    }
}

function toggleInfoModal() {
    const modal = document.getElementById('podcast-info-modal');
    if (modal) {
        const isVisible = modal.style.display !== 'none';
        modal.style.display = isVisible ? 'none' : 'flex';
    }
}

// ============================================================================
// UTILITIES
// ============================================================================
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================================================
// STATE PERSISTENCE (localStorage)
// ============================================================================
function saveState() {
    try {
        const state = {
            module: podcastState.currentModule,
            episodeId: podcastState.currentEpisode?.id,
            volume: podcastState.volume,
            playbackPosition: audioElement?.currentTime || 0
        };
        localStorage.setItem('ernestPodcastState', JSON.stringify(state));
    } catch (err) {
        console.warn('🎧 Could not save state:', err);
    }
}

function loadSavedState() {
    try {
        const saved = localStorage.getItem('ernestPodcastState');
        if (saved) {
            const state = JSON.parse(saved);

            // Restore volume
            if (state.volume !== undefined) {
                podcastState.volume = state.volume;
                if (audioElement) audioElement.volume = state.volume;

                const volumeSlider = document.getElementById('volume-slider');
                const volumePercent = document.getElementById('volume-percent');
                if (volumeSlider) volumeSlider.value = state.volume * 100;
                if (volumePercent) volumePercent.textContent = Math.round(state.volume * 100) + '%';
            }

            console.log('✅ Podcast state loaded from localStorage');
        }
    } catch (err) {
        console.warn('🎧 Could not load saved state:', err);
    }
}

// ============================================================================
// EXPOSE FUNCTIONS IMMEDIATELY (before DOMContentLoaded)
// ============================================================================
// This ensures onclick handlers work even if modules load before DOM is ready
attachEventListeners();

// ============================================================================
// INITIALIZATION ON PAGE LOAD
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initializePodcastPlayer();
});

console.log('✅ Ernest\'s Podcast Player loaded');
