import { Icons } from './Icons.js';

export class PlayerControls {
    constructor(controller) {
        this.controller = controller;
        this.mountPoint = 'audio-controls-mount';
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
            <div id="audio-controls" class="section controls-section" style="display: block;">
                <!-- Progress Bar Mount -->
                <div id="progress-bar-mount"></div>

                <!-- Controls -->
                <div class="player-controls">
                    <button class="control-btn" id="prev-btn" title="Previous Episode">
                        ${Icons.prev}
                    </button>
                    <button class="control-btn" id="seek-back" title="Rewind 10s">
                        ${Icons.rewind}
                    </button>
                    <button class="control-btn play-btn" id="play-pause-btn" title="Play/Pause">
                        ${Icons.play}
                    </button>
                    <button class="control-btn" id="seek-fwd" title="Forward 10s">
                        ${Icons.forward}
                    </button>
                    <button class="control-btn" id="next-btn" title="Next Episode">
                        ${Icons.next}
                    </button>
                </div>

                <!-- Speed Controls -->
                <div class="speed-controls">
                    <button class="speed-btn active" data-speed="1">1x</button>
                    <button class="speed-btn" data-speed="1.5">1.5x</button>
                    <button class="speed-btn" data-speed="2">2x</button>
                </div>

                <!-- Volume Mount -->
                <div id="volume-control-mount"></div>

                <style>
                    .player-controls { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px; }
                    .control-btn {
                        background: none; border: none; cursor: pointer; color: #333;
                        display: flex; align-items: center; justify-content: center;
                        padding: 8px; border-radius: 50%; transition: transform 0.2s;
                    }
                    .control-btn:hover { background: rgba(0,0,0,0.05); transform: scale(1.1); }
                    .play-btn {
                        background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;
                        width: 64px; height: 64px; border-radius: 50%;
                        box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
                    }
                    .play-btn:hover { transform: scale(1.05); }
                    .speed-controls { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
                    .speed-btn {
                        background: white; border: 1px solid #e2e8f0; padding: 4px 10px;
                        border-radius: 12px; font-size: 0.8rem; font-weight: 600; color: #64748b; cursor: pointer;
                    }
                    .speed-btn.active { background: #f1f5f9; color: var(--podcast-primary-dark, #ea580c); border-color: var(--podcast-primary, #f59e0b); }
                </style>
            </div>
        `;
    }

    bindEvents() {
        document.getElementById('play-pause-btn').onclick = () => this.controller.togglePlayPause();
        document.getElementById('prev-btn').onclick = () => this.controller.prevEpisode();
        document.getElementById('next-btn').onclick = () => this.controller.nextEpisode();

        document.getElementById('seek-back').onclick = () => this.controller.skip(-10);
        document.getElementById('seek-fwd').onclick = () => this.controller.skip(10);

        // Mini player bindings (these live in Overlay but controls handle the logic essentially, 
        // OR Overlay handles them. For modularity, Overlay owns the Mini Player DOM, so Overlay should bind them? 
        // Actually, AudioUI had a central bind. Let's make sure Controller or Overlay handles Mini Player inputs, 
        // OR we bind them here if we can find them. The Mini Player is static in Overlay. 
        // It's cleaner if Overlay handles MiniPlayer UI events that call Controller directly.
        // So this file ONLY handles the main controls section.)

        // Speed
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.controller.setSpeed(parseFloat(btn.dataset.speed));
            };
        });
    }

    updatePlayState(isPlaying) {
        const icon = isPlaying ? Icons.pause : Icons.play;
        const mainBtn = document.getElementById('play-pause-btn');
        if (mainBtn) mainBtn.innerHTML = icon;
    }
}
