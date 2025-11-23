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
    playbackPosition: 0
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

    // SPECIAL CASE: EMG Introduction - Show both episodes with separate buttons
    if (moduleId === 'emg-introduction') {
        return `
            <div style="background: linear-gradient(135deg, #f59e0b, #ea580c);
                        color: white;
                        padding: 20px 25px;
                        border-radius: 12px;
                        margin-bottom: 20px;
                        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <img src="ERNEST.png"
                         style="width: 60px; height: 60px; border-radius: 50%; border: 3px solid white;"
                         alt="Ernest">
                    <div style="flex: 1;">
                        <div style="font-weight: bold; font-size: 1.2em; margin-bottom: 5px;">
                            🎧 Learn more with Ernest's EMG Podcasts
                        </div>
                        <div style="font-size: 0.9em; opacity: 0.95;">
                            Choose which episode to listen to:
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button onclick="window.playModulePodcast('emg-introduction', 'emg-intro-main')"
                            style="flex: 1; min-width: 200px;
                                   background: rgba(255,255,255,0.95);
                                   color: #ea580c;
                                   border: none;
                                   padding: 12px 20px;
                                   border-radius: 8px;
                                   font-weight: 600;
                                   font-size: 0.95em;
                                   cursor: pointer;
                                   transition: all 0.2s;
                                   box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                        ▶ EMG Introduction<br><span style="font-size: 0.85em; opacity: 0.8;">101 min</span>
                    </button>
                    <button onclick="window.playModulePodcast('emg-introduction', 'emg-terminology')"
                            style="flex: 1; min-width: 200px;
                                   background: rgba(255,255,255,0.95);
                                   color: #ea580c;
                                   border: none;
                                   padding: 12px 20px;
                                   border-radius: 8px;
                                   font-weight: 600;
                                   font-size: 0.95em;
                                   cursor: pointer;
                                   transition: all 0.2s;
                                   box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'">
                        ▶ Essential Terminology<br><span style="font-size: 0.85em; opacity: 0.8;">28 min</span>
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
                     style="width: 60px; height: 60px; border-radius: 50%; border: 3px solid white;"
                     alt="Ernest">
                <div style="flex: 1;">
                    <div style="font-weight: bold; font-size: 1.2em; margin-bottom: 5px;">
                        🎧 Learn more with my ${displayTitle} podcast
                    </div>
                    <div style="font-size: 0.9em; opacity: 0.95;">
                        Click to listen • Duration: ${episode.duration}
                    </div>
                </div>
                <div style="background: rgba(255,255,255,0.9);
                           color: #ea580c;
                           padding: 12px 24px;
                           border-radius: 8px;
                           font-weight: 600;
                           font-size: 1.1em;">
                    ▶ Play
                </div>
            </div>
        `;
    }

    // MULTIPLE EPISODES: Generic message, opens player with first episode
    const firstEpisode = episodes[0];
    return `
        <div onclick="window.playModulePodcast('${moduleId}', '${firstEpisode.id}')"
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
                 style="width: 60px; height: 60px; border-radius: 50%; border: 3px solid white;"
                 alt="Ernest">
            <div style="flex: 1;">
                <div style="font-weight: bold; font-size: 1.2em; margin-bottom: 5px;">
                    🎧 Learn more with my ${episodeCount} podcasts about ${displayTitle}
                </div>
                <div style="font-size: 0.9em; opacity: 0.95;">
                    Click to open player and select episode
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.9);
                       color: #ea580c;
                       padding: 12px 24px;
                       border-radius: 8px;
                       font-weight: 600;
                       font-size: 1.1em;">
                ▶ Play
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
}

function createPodcastHTML() {
    return `
        <!-- Player Overlay -->
        <div id="podcast-player-overlay"
             style="position: fixed;
                    bottom: 110px;
                    right: 20px;
                    width: min(380px, calc(100vw - 40px));
                    max-width: 380px;
                    max-height: 85vh;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
                    padding: 0;
                    z-index: 100000;
                    display: none;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 20px; color: white; border-radius: 20px 20px 0 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="ERNEST.png" style="width: 45px; height: 45px; border-radius: 50%; border: 3px solid white;" alt="Ernest">
                        <div>
                            <h3 style="margin: 0; font-size: 1.3rem; font-weight: 700;">Ernest's Podcast</h3>
                            <p style="margin: 0; font-size: 0.85rem; opacity: 0.9;">EMG/NCS Learning Series</p>
                        </div>
                    </div>
                    <button onclick="window.closePodcastPlayer()"
                            style="background: rgba(255,255,255,0.2);
                                   border: none;
                                   color: white;
                                   font-size: 1.8rem;
                                   cursor: pointer;
                                   width: 35px;
                                   height: 35px;
                                   border-radius: 50%;
                                   display: flex;
                                   align-items: center;
                                   justify-content: center;
                                   transition: all 0.2s;">×</button>
                </div>
            </div>

            <!-- Scrollable Content Area -->
            <div style="max-height: calc(85vh - 180px); overflow-y: auto;">

                <!-- Episode Selector -->
                <div style="padding: 20px 20px 15px 20px; border-bottom: 1px solid #e5e7eb;">
                    <label style="display: block; font-size: 0.9rem; font-weight: 600; color: #64748b; margin-bottom: 8px;">Select Episode:</label>
                    <select id="episode-selector"
                            onchange="window.changeEpisode(this.value)"
                            style="width: 100%;
                                   padding: 12px 15px;
                                   border: 2px solid #e5e7eb;
                                   border-radius: 12px;
                                   font-size: 1rem;
                                   background: white;
                                   cursor: pointer;
                                   transition: all 0.2s;">
                        <option value="">Loading episodes...</option>
                    </select>
                </div>

                <!-- Current Episode Info -->
                <div id="episode-info" style="padding: 20px; border-bottom: 1px solid #e5e7eb; display: none;">
                    <h4 id="episode-title" style="color: #1e293b; margin: 0 0 8px 0; font-size: 1.15rem; line-height: 1.4;"></h4>
                    <p id="episode-description" style="color: #64748b; margin: 0 0 10px 0; font-size: 0.95rem; line-height: 1.5;"></p>
                    <div style="display: flex; align-items: center; gap: 15px; font-size: 0.85rem; color: #94a3b8;">
                        <span>⏱️ Duration: <strong id="episode-duration">0:00</strong></span>
                    </div>
                </div>

                <!-- Audio Player Controls -->
                <div id="audio-controls" style="padding: 25px 20px; border-bottom: 1px solid #e5e7eb; background: #fafafa; display: none;">

                    <!-- Play/Pause + Progress Bar -->
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 18px;">
                        <button id="play-pause-btn"
                                onclick="window.togglePlayPause()"
                                style="width: 55px;
                                       height: 55px;
                                       border-radius: 50%;
                                       background: linear-gradient(135deg, #3b82f6, #2563eb);
                                       border: none;
                                       color: white;
                                       font-size: 1.6rem;
                                       cursor: pointer;
                                       box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
                                       transition: all 0.2s;
                                       display: flex;
                                       align-items: center;
                                       justify-content: center;">▶️</button>
                        <div style="flex: 1;">
                            <input type="range"
                                   id="progress-bar"
                                   min="0"
                                   max="100"
                                   value="0"
                                   onchange="window.seekAudio(this.value)"
                                   style="width: 100%; cursor: pointer;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #64748b; margin-top: 6px;">
                                <span id="current-time">0:00</span>
                                <span id="total-duration">0:00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Volume Control -->
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.2rem;">🔊</span>
                        <input type="range"
                               id="volume-slider"
                               min="0"
                               max="100"
                               value="80"
                               onchange="window.setVolume(this.value)"
                               style="flex: 1; cursor: pointer;">
                        <span id="volume-percent" style="font-size: 0.85rem; color: #64748b; width: 35px; text-align: right;">80%</span>
                    </div>
                </div>

                <!-- Placeholder Message (when no audio available) -->
                <div id="audio-placeholder" style="padding: 30px 20px; text-align: center; color: #64748b; display: none;">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🎧</div>
                    <h4 style="color: #1e293b; margin-bottom: 10px;">Episode Selected</h4>
                    <div style="background: #fef3c7; padding: 15px; border-radius: 12px; border-left: 4px solid #f59e0b; text-align: left; margin-top: 15px;">
                        <p style="color: #92400e; margin: 0; font-size: 0.95rem;">
                            <strong>Audio file coming soon!</strong><br>
                            This episode is being prepared. Check back later.
                        </p>
                    </div>
                </div>

                <!-- Show Notes Section -->
                <div style="border-bottom: 1px solid #e5e7eb;">
                    <button id="show-notes-toggle"
                            onclick="window.toggleShowNotes()"
                            style="width: 100%;
                                   padding: 15px 20px;
                                   background: white;
                                   border: none;
                                   cursor: pointer;
                                   text-align: left;
                                   display: flex;
                                   justify-content: space-between;
                                   align-items: center;
                                   font-size: 1rem;
                                   font-weight: 600;
                                   color: #1e293b;
                                   transition: all 0.2s;">
                        <span>📝 Show Notes</span>
                        <span id="show-notes-arrow">▼</span>
                    </button>
                    <div id="show-notes-panel" style="display: none; padding: 0 20px 20px 20px; background: #fafafa;">
                        <div id="show-notes-content" style="font-size: 0.95rem; line-height: 1.7; color: #475569;">
                            Show notes will appear here...
                        </div>
                    </div>
                </div>

                <!-- Transcript Section -->
                <div>
                    <button id="transcript-toggle"
                            onclick="window.toggleTranscript()"
                            style="width: 100%;
                                   padding: 15px 20px;
                                   background: white;
                                   border: none;
                                   cursor: pointer;
                                   text-align: left;
                                   display: flex;
                                   justify-content: space-between;
                                   align-items: center;
                                   font-size: 1rem;
                                   font-weight: 600;
                                   color: #1e293b;
                                   transition: all 0.2s;">
                        <span>📄 Transcript</span>
                        <span id="transcript-arrow">▼</span>
                    </button>
                    <div id="transcript-panel" style="display: none; padding: 0 20px 20px 20px; background: #fafafa; max-height: 300px; overflow-y: auto;">
                        <div id="transcript-content" style="font-size: 0.9rem; line-height: 1.8; color: #475569; white-space: pre-wrap;">
                            Transcript will appear here...
                        </div>
                    </div>
                </div>

            </div>

            <!-- Footer with Minimize Button -->
            <div style="padding: 15px 20px; border-top: 2px solid #e5e7eb; background: white; border-radius: 0 0 20px 20px;">
                <button onclick="window.minimizePodcastPlayer()"
                        style="width: 100%;
                               padding: 12px;
                               background: white;
                               border: 2px solid #e5e7eb;
                               border-radius: 12px;
                               cursor: pointer;
                               color: #64748b;
                               font-weight: 600;
                               font-size: 0.95rem;
                               transition: all 0.2s;">
                    − Minimize Player
                </button>
            </div>
        </div>

        <!-- Minimized Player Bar -->
        <div id="podcast-mini-player"
             style="position: fixed;
                    bottom: 110px;
                    right: 20px;
                    width: min(320px, calc(100vw - 40px));
                    max-width: 320px;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    padding: 15px 20px;
                    z-index: 100000;
                    display: none;
                    transition: all 0.3s ease;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <button id="mini-play-pause-btn"
                        onclick="window.togglePlayPause()"
                        style="width: 40px;
                               height: 40px;
                               border-radius: 50%;
                               background: linear-gradient(135deg, #3b82f6, #2563eb);
                               border: none;
                               color: white;
                               font-size: 1.2rem;
                               cursor: pointer;
                               display: flex;
                               align-items: center;
                               justify-content: center;">▶️</button>
                <div style="flex: 1; min-width: 0;">
                    <div id="mini-episode-title" style="font-size: 0.9rem; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;">Select an episode</div>
                    <input type="range"
                           id="mini-progress-bar"
                           min="0"
                           max="100"
                           value="0"
                           onchange="window.seekAudio(this.value)"
                           style="width: 100%; cursor: pointer;">
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">
                        <span id="mini-current-time">0:00</span> / <span id="mini-total-duration">0:00</span>
                    </div>
                </div>
                <button onclick="window.expandPodcastPlayer()"
                        style="width: 35px;
                               height: 35px;
                               border-radius: 50%;
                               background: #f3f4f6;
                               border: none;
                               color: #64748b;
                               font-size: 1.2rem;
                               cursor: pointer;
                               display: flex;
                               align-items: center;
                               justify-content: center;">▲</button>
            </div>
        </div>

        <!-- Styles -->
        <style>
            @keyframes podcastPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); box-shadow: 0 6px 30px rgba(245, 158, 11, 0.7); }
            }

            @keyframes podcastGlow {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }

            #ernest-podcast-button:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 35px rgba(245, 158, 11, 0.8);
            }

            #play-pause-btn:hover, #mini-play-pause-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
            }

            input[type="range"] {
                -webkit-appearance: none;
                appearance: none;
                height: 6px;
                background: #e5e7eb;
                border-radius: 3px;
                outline: none;
            }

            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
            }

            input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
                border: none;
            }

            #show-notes-toggle:hover, #transcript-toggle:hover {
                background: #f8fafc;
            }

            /* Scrollbar styling */
            #podcast-player-overlay > div:first-of-type::-webkit-scrollbar,
            #transcript-panel::-webkit-scrollbar {
                width: 8px;
            }

            #podcast-player-overlay > div:first-of-type::-webkit-scrollbar-track,
            #transcript-panel::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 4px;
            }

            #podcast-player-overlay > div:first-of-type::-webkit-scrollbar-thumb,
            #transcript-panel::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
            }

            #podcast-player-overlay > div:first-of-type::-webkit-scrollbar-thumb:hover,
            #transcript-panel::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
            }

            /* Mobile Responsive Styles */
            @media (max-width: 480px) {
                #podcast-player-overlay,
                #podcast-mini-player {
                    right: 10px !important;
                    left: 10px !important;
                    width: calc(100vw - 20px) !important;
                    max-width: none !important;
                    bottom: 10px !important;
                }

                #podcast-player-overlay {
                    max-height: calc(100vh - 20px) !important;
                    border-radius: 15px !important;
                }

                #podcast-mini-player {
                    border-radius: 12px !important;
                }
            }

            /* Tablet adjustments */
            @media (max-width: 768px) and (min-width: 481px) {
                #podcast-player-overlay {
                    right: 15px !important;
                    width: min(360px, calc(100vw - 30px)) !important;
                }

                #podcast-mini-player {
                    right: 15px !important;
                    width: min(300px, calc(100vw - 30px)) !important;
                }
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
    window.togglePlayPause = togglePlayPause;
    window.seekAudio = seekAudio;
    window.setVolume = setVolume;
    window.toggleShowNotes = toggleShowNotes;
    window.toggleTranscript = toggleTranscript;
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
        overlay.style.display = 'block';
        miniPlayer.style.display = 'none';
        podcastState.isPlayerVisible = true;
        podcastState.isMinimized = false;

        // Ensure episode selector is updated with current module's episodes
        updateEpisodeSelector();
        updatePlayerDisplay();
    }
}

function closePodcastPlayer() {
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
        overlay.style.display = 'block';
        miniPlayer.style.display = 'none';
        podcastState.isMinimized = false;
    }
}

function togglePlayPause() {
    if (!audioElement || !podcastState.currentEpisode) {
        console.warn('🎧 No episode selected');
        return;
    }

    if (podcastState.isPlaying) {
        audioElement.pause();
        podcastState.isPlaying = false;
        hidePlayingIndicator();
    } else {
        audioElement.play().then(() => {
            podcastState.isPlaying = true;
            showPlayingIndicator();
        }).catch(err => {
            console.warn('🎧 Could not play audio:', err);
        });
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
        // Load the episode
        loadEpisode(episode);

        // Open the player if not already visible
        if (!podcastState.isPlayerVisible) {
            openPodcastPlayer();
        }

        // Update the episode selector to show the correct episode
        setTimeout(() => {
            updateEpisodeSelector();
        }, 100);
    }
}

function loadEpisode(episode) {
    console.log('🎧 Loading episode:', episode.title);

    podcastState.currentEpisode = episode;

    // Stop current playback
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        podcastState.isPlaying = false;
        hidePlayingIndicator();
    }

    // Load new audio
    audioElement.src = episode.audioFile;

    // Update display
    updatePlayerDisplay();
    updatePlayPauseButtons();

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

    const icon = podcastState.isPlaying ? '⏸️' : '▶️';

    if (playPauseBtn) playPauseBtn.textContent = icon;
    if (miniPlayPauseBtn) miniPlayPauseBtn.textContent = icon;
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
