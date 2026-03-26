// ============================================================================
// AUDIO CONTROLLER
// ============================================================================
// The "Brain" of the Audio System.
// Coordinates data, player logic, and UI updates.
// Now uses modular UI architecture and supports EDX Booklet mode.
// ============================================================================

import { AudioPlayer } from './AudioPlayer.js';
import { getModuleEpisodes, generateErnestButton } from './AudioData.js';

// Modular UI Components
import { PlayerOverlay } from './ui/PlayerOverlay.js';
import { PlayerControls } from './ui/PlayerControls.js';
import { ProgressBar } from './ui/ProgressBar.js';
import { VolumeControl } from './ui/VolumeControl.js';
import { EpisodeInfo } from './ui/EpisodeInfo.js';
import logger from '../../utils/Logger.js';


export class AudioController {
    constructor() {
        // Initialize Core Player
        this.player = new AudioPlayer((state) => this.onPlayerStateChange(state));

        // Initialize UI Components
        this.overlay = new PlayerOverlay(this);
        this.controls = new PlayerControls(this);
        this.progressBar = new ProgressBar(this);
        this.volumeControl = new VolumeControl(this);
        this.episodeInfo = new EpisodeInfo(this);


        // State Tracking
        this.currentModuleId = null;
        this.currentEpisodeId = null;
        this.currentEpisode = null;


        // Initialize UI
        this.initUI();
        this.bindGlobalEvents();
    }

    initUI() {
        // 1. Inject Standard Overlay & Components
        this.overlay.inject();
        this.episodeInfo.inject();
        this.controls.inject();
        this.progressBar.inject();
        this.volumeControl.inject();


    }

    // ========================================================================
    // GLOBAL EVENT BINDINGS (Replaces legacy window methods)
    // ========================================================================
    bindGlobalEvents() {
        logger.log('🎧 Setting up Audio Event Listeners...');

        document.body.addEventListener('click', (e) => {
            const podcastTrigger = e.target.closest('[data-podcast-trigger="true"]');
            if (podcastTrigger) {
                e.preventDefault();
                e.stopPropagation();

                const moduleId = podcastTrigger.getAttribute('data-module-id');
                const episodeId = podcastTrigger.getAttribute('data-episode-id');

                // If episode ID is strictly 'undefined' string or empty, it means we just open the library
                if (episodeId && episodeId !== 'undefined' && episodeId !== 'null') {
                    this.playSpecificEpisode(moduleId, episodeId);
                } else {
                    this.openModuleLibrary(moduleId);
                }
            }
        });
    }

    // ========================================================================
    // BUSINESS LOGIC
    // ========================================================================

    playSpecificEpisode(moduleId, episodeId) {
        logger.log(`▶️ playSpecificEpisode called: module=${moduleId}, episode=${episodeId}`);
        // If switching modules or first load
        if (this.currentModuleId !== moduleId) {
            logger.log(`   Switching module from ${this.currentModuleId} to ${moduleId}`);
            this.loadModule(moduleId);
        }

        // If defined episode
        if (episodeId) {
            this.loadEpisode(episodeId, true); // True = AutoPlay
            this.expand(); // Show player
        }
    }

    openModuleLibrary(moduleId) {
        this.loadModule(moduleId);
        this.expand();
        // Don't auto-play, let user choose
    }

    loadModule(moduleId) {
        this.currentModuleId = moduleId;

        const episodes = getModuleEpisodes(moduleId);

        // Populate Standard UI (always kept in sync just in case)
        this.overlay.populateSelector(episodes, this.currentEpisodeId);

        // Default to first if none
        if (!this.currentEpisodeId && episodes.length > 0) {
            this.loadEpisode(episodes[0].id, false);
        }
    }

    loadEpisode(episodeId, autoPlay = false) {
        logger.log(`   Loading episode: ${episodeId}`);
        const episodes = getModuleEpisodes(this.currentModuleId);
        const episode = episodes.find(e => e.id === episodeId);

        if (!episode) {
            logger.error(`❌ Episode not found: ${episodeId} in module ${this.currentModuleId}`);
            return;
        }

        this.currentEpisodeId = episodeId;
        this.currentEpisode = episode;

        // Load Audio
        this.player.loadSource(episode.audioFile);

        // Update Media Session
        this.player.updateMediaSession({
            title: episode.title,
            artist: 'Ernest\'s Podcast',
            album: this.currentModuleId
        });

        // Update UI Logic
        // We update BOTH UIs so state is consistent if they switch contexts,
        // but the user only sees the active one.
        this.episodeInfo.update(episode);
        this.overlay.populateSelector(episodes, episodeId);



        if (autoPlay) {
            this.player.play();
        }
    }

    // ========================================================================
    // PLAYER CONTROLS (Called by UI)
    // ========================================================================

    togglePlayPause() { this.player.togglePlayPause(); }
    seekToPercentage(percent) { this.player.seekToPercentage(percent); }
    skip(seconds) { this.player.skip(seconds); }
    setVolume(value) { this.player.setVolume(value); }
    setSpeed(speed) { this.player.setPlaybackRate(speed); }

    nextEpisode() {
        const episodes = getModuleEpisodes(this.currentModuleId);
        const currentIndex = episodes.findIndex(e => e.id === this.currentEpisodeId);
        if (currentIndex < episodes.length - 1) {
            this.loadEpisode(episodes[currentIndex + 1].id, true);
        }
    }

    prevEpisode() {
        const episodes = getModuleEpisodes(this.currentModuleId);
        const currentIndex = episodes.findIndex(e => e.id === this.currentEpisodeId);
        if (currentIndex > 0) {
            this.loadEpisode(episodes[currentIndex - 1].id, true);
        }
    }

    // ========================================================================
    // VISIBILITY CONTROLS
    // ========================================================================
    expand() {
        this.overlay.show();
    }

    minimize() {
        // If in EDX mode, minimizing might just mean closing the book but keeping audio?
        // Or reverting to mini player?
        // Let's assume minimize reverts to standard Mini Player.

        this.overlay.minimize(); // This shows the mini player
    }

    close() {
        this.player.pause();
        this.overlay.hide();
    }

    togglePlayer() {
        this.expand();
    }


    // ========================================================================
    // EVENT HANDLING (From Player)
    // ========================================================================
    onPlayerStateChange(state) {
        // Update Standard UI
        if (state.isPlaying !== undefined) {
            this.controls.updatePlayState(state.isPlaying);

        }

        if (state.currentTime !== undefined || state.duration !== undefined) {
            const percent = (state.currentTime / (state.duration || 1)) * 100;

            // Standard UI
            this.progressBar.update(state.currentTime, state.duration, percent);



            // Mini Player Sync
            const miniBar = document.getElementById('mini-progress-bar');
            if (miniBar) {
                miniBar.value = percent;
                miniBar.style.background = `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
            }
        }

        if (state.error) {
            this.showErrorToast(state.error);
        }

        if (state.hasEnded) {
            this.nextEpisode();
        }
    }

    showErrorToast(message) {
        const existing = document.getElementById('podcast-error-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'podcast-error-toast';
        toast.style.cssText = `
            position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
            background: #DC2626; color: white; padding: 12px 24px;
            border-radius: 12px; font-size: 14px; font-weight: 600;
            z-index: 200000; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: fadeIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }
}

