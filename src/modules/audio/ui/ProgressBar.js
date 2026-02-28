export class ProgressBar {
    constructor(controller) {
        this.controller = controller;
        this.mountPoint = 'progress-bar-mount'; // This is inside PlayerControls
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
            <div class="progress-container">
                <input type="range" id="progress-bar" min="0" max="100" value="0">
                <div class="time-labels">
                    <span id="current-time">0:00</span>
                    <span id="total-duration">0:00</span>
                </div>
                <style>
                    .progress-container { margin-bottom: 24px; width: 100%; }
                    .time-labels {
                        display: flex; justify-content: space-between;
                        font-size: 0.75rem; color: #64748b; margin-top: 8px; font-weight: 600;
                    }
                    input[type="range"] {
                        width: 100%; height: 4px; background: #e2e8f0;
                        border-radius: 2px; appearance: none; cursor: pointer;
                    }
                    input[type="range"]::-webkit-slider-thumb {
                        appearance: none; width: 12px; height: 12px; border-radius: 50%;
                        background: #f59e0b; cursor: pointer; transition: transform 0.1s;
                    }
                    input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }
                </style>
            </div>
        `;
    }

    bindEvents() {
        const bar = document.getElementById('progress-bar');
        if (bar) {
            bar.oninput = (e) => this.controller.seekToPercentage(e.target.value);
        }
    }

    update(currentTime, duration, percent) {
        const bar = document.getElementById('progress-bar');
        if (bar) {
            bar.value = percent;
            bar.style.background = `linear-gradient(to right, #f59e0b 0%, #f59e0b ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
        }

        document.getElementById('current-time').textContent = this.formatTime(currentTime);
        document.getElementById('total-duration').textContent = this.formatTime(duration);
    }

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }
}
