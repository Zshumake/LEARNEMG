// ============================================================================
// AUDIO CONTROLLER
// ============================================================================
// The "Brain" of the Audio System.
// Coordinates data, player logic, and UI updates.
// also handles global implementation for legacy support.
// ============================================================================

import { AudioPlayer } from './AudioPlayer.js';
import { AudioUI } from './AudioUI.js';
import { getModuleEpisodes, generateErnestButton } from './AudioData.js';

export class AudioController {
    constructor() {
        // Optional: If we want to persist playback state to Store

        // Initialize Core Components
        this.player = new AudioPlayer((state) => this.onPlayerStateChange(state));
        this.ui = new AudioUI(this);

        // State Tracking
        this.currentModuleId = null;
        this.currentEpisodeId = null;
        this.currentEpisode = null;

        // Initialize
        this.ui.inject();
        this.exposeGlobalAPI();
    }

    // ========================================================================
    // PUBLIC API (Exposed to Window)
    // ========================================================================
    exposeGlobalAPI() {
        console.log('🎧 Exposing Audio API to window...');

        // Main Entry Point
        window.playModulePodcast = (moduleId, episodeId) => {
            if (episodeId) {
                this.playSpecificEpisode(moduleId, episodeId);
            } else {
                this.openModuleLibrary(moduleId);
            }
        };

        // Legacy/Alias Support
        window.playExtraPodcast = window.playModulePodcast;

        // UI Controls exposed for inline HTML onclicks (if UI uses window calls)
        window.togglePodcastPlayer = () => this.togglePlayer();
        window.closePodcastPlayer = () => this.close();
        window.minimizePodcastPlayer = () => this.minimize();
        window.expandPodcastPlayer = () => this.expand();
        // window.togglePlayPause handled by UI binding directly or window
        window.togglePlayPause = () => this.togglePlayPause();
        window.seekAudio = (val) => this.seekToPercentage(val);
        window.setVolume = (val) => this.setVolume(val / 100);
        window.skipAudio = (sec) => this.skip(sec);
        window.changeEpisode = (epId) => this.loadEpisode(epId);
    }

    // ========================================================================
    // BUSINESS LOGIC
    // ========================================================================

    playSpecificEpisode(moduleId, episodeId) {
        // If switching modules or first load
        if (this.currentModuleId !== moduleId) {
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

        // Update UI Selector
        this.ui.populateEpisodeSelector(episodes, this.currentEpisodeId);

        // Default to first episode if none selected
        if (!this.currentEpisodeId && episodes.length > 0) {
            this.loadEpisode(episodes[0].id, false);
        }
    }

    loadEpisode(episodeId, autoPlay = false) {
        const episodes = getModuleEpisodes(this.currentModuleId);
        const episode = episodes.find(e => e.id === episodeId);

        if (!episode) {
            console.error(`Episode ${episodeId} not found in module ${this.currentModuleId}`);
            return;
        }

        this.currentEpisodeId = episodeId;
        this.currentEpisode = episode;

        // Update UI Info
        this.ui.updateEpisodeInfo(episode);

        // Load Audio
        this.player.loadSource(episode.audioFile);

        if (autoPlay) {
            this.player.play();
        }
    }

    // ========================================================================
    // PLAYER CONTROLS (Called by UI)
    // ========================================================================

    togglePlayPause() {
        this.player.togglePlayPause();
    }

    seekToPercentage(percent) {
        this.player.seekToPercentage(percent);
    }

    skip(seconds) {
        this.player.skip(seconds);
    }

    setVolume(value) {
        this.player.setVolume(value);
    }

    setSpeed(speed) {
        this.player.setPlaybackRate(speed);
    }

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
        this.ui.showPlayer();
    }

    minimize() {
        this.ui.minimizePlayer();
    }

    close() {
        this.player.pause();
        this.ui.hidePlayer();
    }

    togglePlayer() {
        // Logic to determine if we open or close based on state
        // For now, we just expand
        this.expand();
    }


    // ========================================================================
    // EVENT HANDLING (From Player)
    // ========================================================================
    onPlayerStateChange(state) {
        if (state.isPlaying !== undefined) {
            this.ui.updatePlayState(state.isPlaying);
        }

        if (state.currentTime !== undefined || state.duration !== undefined) {
            // Calculate percentage for UI
            const percent = (state.currentTime / (state.duration || 1)) * 100;
            this.ui.updateTime(state.currentTime, state.duration, percent);
        }

        if (state.hasEnded) {
            // Auto-play next logic could go here
            this.nextEpisode();
        }
    }
}
