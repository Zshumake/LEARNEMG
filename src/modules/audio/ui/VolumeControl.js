import { Icons } from './Icons.js';

export class VolumeControl {
    constructor(controller) {
        this.controller = controller;
        this.mountPoint = 'volume-control-mount'; // Inside PlayerControls
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
            <div class="volume-container">
                <div class="volume-icon">${Icons.volume}</div>
                <input type="range" id="volume-slider" min="0" max="100" value="80">
                <style>
                    .volume-container { display: flex; align-items: center; gap: 10px; width: 80%; margin: 0 auto; color: #64748b; }
                </style>
            </div>
        `;
    }

    bindEvents() {
        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.oninput = (e) => this.controller.setVolume(e.target.value / 100);
        }
    }

    setVolume(value) {
        const slider = document.getElementById('volume-slider');
        if (slider) {
            slider.value = value * 100;
        }
    }
}
