// ============================================================================
// AUDIO PLAYER LOGIC
// ============================================================================
// Pure logic for audio playback, state management, and event emitting.
// Decoupled from UI rendering.
// ============================================================================

export class AudioPlayer {
    constructor(stateCallback) {
        this.audio = new Audio();
        this.audio.preload = 'auto'; // Preload for smoother experience
        this.stateCallback = stateCallback; // Callback to notify controller/UI of changes

        // Internal State
        this.isPlaying = false;
        this.volume = 0.8;
        this.currentSrc = null;

        this.attachListeners();
        this.loadSavedVolume();
    }

    attachListeners() {
        // Time Update (Progress)
        this.audio.addEventListener('timeupdate', () => {
            this.emitStateChange({
                currentTime: this.audio.currentTime,
                duration: this.audio.duration || 0,
                progress: (this.audio.currentTime / (this.audio.duration || 1)) * 100
            });
        });

        // Loaded Metadata (Duration available)
        this.audio.addEventListener('loadedmetadata', () => {
            this.emitStateChange({
                duration: this.audio.duration,
                currentTime: this.audio.currentTime
            });
        });

        // Playback Ended
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.emitStateChange({ isPlaying: false, hasEnded: true });
        });

        // Play/Pause Events (in case triggered by OS/Keyboard)
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.emitStateChange({ isPlaying: true });
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.emitStateChange({ isPlaying: false });
        });

        // Error Handling
        this.audio.addEventListener('error', (e) => {
            console.error('Audio Playback Error:', e);
            this.emitStateChange({ error: 'Playback failed' });
        });
    }

    loadSource(src) {
        if (!src) return;
        this.currentSrc = src;
        this.audio.src = src;
        this.audio.load();
        this.emitStateChange({ src: src, currentTime: 0, duration: 0 });
    }

    play() {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Auto-play prevented or fetch error:", error);
                this.emitStateChange({ isPlaying: false, error: 'Auto-play prevented' });
            });
        }
    }

    pause() {
        this.audio.pause();
    }

    togglePlayPause() {
        if (this.audio.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    seek(time) {
        if (isFinite(time)) {
            this.audio.currentTime = time;
        }
    }

    seekToPercentage(percent) {
        if (this.audio.duration) {
            const time = (percent / 100) * this.audio.duration;
            this.seek(time);
        }
    }

    skip(seconds) {
        this.audio.currentTime += seconds;
    }

    setVolume(value) {
        // Value between 0 and 1
        this.volume = Math.max(0, Math.min(1, value));
        this.audio.volume = this.volume;
        localStorage.setItem('ernest_podcast_volume', this.volume);
    }

    setPlaybackRate(rate) {
        this.audio.playbackRate = rate;
    }

    loadSavedVolume() {
        const savedVol = localStorage.getItem('ernest_podcast_volume');
        if (savedVol !== null) {
            this.setVolume(parseFloat(savedVol));
        } else {
            this.setVolume(0.8);
        }
    }

    // Helper to notify subscribers
    emitStateChange(changes) {
        if (this.stateCallback) {
            this.stateCallback(changes);
        }
    }
}
