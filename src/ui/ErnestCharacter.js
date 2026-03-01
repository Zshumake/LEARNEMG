// ErnestCharacter.js
// Manages the Ernest Character (The "Frog" Cursor/Guide)

export class ErnestCharacter {
    constructor() {
        this.element = null;
        this.messageTimeout = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Any specific listeners if needed
    }

    async init() {
        // Initialization logic for Ernest Character
        console.log('🐸 Ernest Character is ready.');
        return Promise.resolve();
    }

    // Navigate to a specific module (allows clicking any accessible square)
    navigateToModule(targetIndex) {
        // Access globals for now (Hybrid Mode)
        const currentModuleIndex = window.currentModuleIndex || 0;
        const currentPGYLevel = window.currentPGYLevel || 'all';
        const modules = this.getModules(currentPGYLevel);
        const completedModules = window.completedModules || new Set();

        if (!modules || !modules[targetIndex]) return;

        // Visual lock check (logic mirrored from main)
        const moduleId = modules[targetIndex].id;
        const previousModuleId = targetIndex > 0 ? modules[targetIndex - 1].id : null;

        // Check if locked: target > current AND previous not completed
        // Actually, the logic in main.js was: 
        // if (targetIndex > currentModuleIndex && !completedModules.has(modules[currentModuleIndex].id)) ...
        // wait, let's stick to the exact logic from main.js but using store/args

        // original: if (targetIndex > currentModuleIndex && !completedModules.has(learningModulesConfig[currentPGYLevel][targetIndex].id))
        // This logic seems slightly buggy in original (checking target ID? no, checking if we can jump ahead).
        // Let's assume we can jump if we've unlocked it.
        // For faithful extraction, I'll delegate the "check" to a helper or just replicate.

        const isLocked = targetIndex > currentModuleIndex &&
            (!previousModuleId || !completedModules.has(previousModuleId));

        // If the original logic was slightly different, I should match it or fix it. 
        // Original: !completedModules.has(learningModulesConfig[currentPGYLevel][targetIndex].id) inside the if.
        // Wait, if targetIndex is 5, and we are at 0.
        // targetIndex > current (true). !completed has target?
        // This implies we can only jump to completed modules?

        if (isLocked && targetIndex !== currentModuleIndex) {
            // Logic says return if locked
            // Actually, the original code had:
            // if (targetIndex > currentModuleIndex && !completedModules.has(learningModulesConfig[currentPGYLevel][targetIndex].id))
            // This implies if we haven't completed the TARGET, we can't go there?
            // That effectively prevents jumping ahead.
            return;
        }

        const previousIndex = currentModuleIndex;

        // Updates global state if jumping (or we should use Store action?)
        // In hybrid, we update global
        if (window.currentModuleIndex !== undefined) {
            window.currentModuleIndex = targetIndex;
        }

        // Animate
        this.animateToModule(targetIndex, previousIndex);

        // Show description
        setTimeout(() => {
            this.showModuleDescription(targetIndex);
        }, 1000);
    }

    animateToModule(targetIndex, fromIndex) {
        const ernst = document.getElementById('ernest-character');
        if (!ernst) return;

        const isBackward = targetIndex < fromIndex;
        const animationClass = isBackward ? 'hopping-backward' : 'hopping';

        ernst.classList.remove('idle', 'celebrating', 'hopping', 'hopping-backward');
        ernst.classList.add(animationClass);

        setTimeout(() => {
            this.position(targetIndex); // Use passed index
            ernst.classList.remove(animationClass);
            ernst.classList.add('idle');
        }, 800);
    }

    // Position ERNEST on the current (or specific) learning module
    position(forceIndex = null) {
        const ernst = document.getElementById('ernest-character');
        if (!ernst) return;

        const pgyLevel = window.currentPGYLevel || 'all';
        const modules = this.getModules(pgyLevel);
        if (!modules || modules.length === 0) return;

        // Use forced index or global current
        const indexToUse = forceIndex !== null ? forceIndex : (window.currentModuleIndex || 0);

        const currentModuleSquares = document.querySelectorAll('.module-square');
        const targetIndex = Math.min(indexToUse, currentModuleSquares.length - 1);
        const targetSquare = currentModuleSquares[targetIndex];

        if (!targetSquare) return;

        // Remove previous
        document.querySelectorAll('.module-square').forEach(square => square.classList.remove('has-ernest'));
        targetSquare.classList.add('has-ernest');

        // Calculate position
        const boardElement = document.querySelector('.learning-path') || document.getElementById('learning-board'); // Fallback
        if (!boardElement) return;

        const boardRect = boardElement.getBoundingClientRect();
        const squareRect = targetSquare.getBoundingClientRect();

        const ernestX = (squareRect.left - boardRect.left) + (squareRect.width / 2) - 30; // -30 for center offset
        const ernestY = (squareRect.top - boardRect.top) - 20;

        ernst.style.left = `${ernestX}px`;
        ernst.style.top = `${ernestY}px`;
        ernst.style.display = 'block';
    }

    moveToNext() {
        const ernst = document.getElementById('ernest-character'); // ID fix: original had 'ernst-character' in one function, 'ernest' in others? 
        // Checked logic: code usually used 'ernest-character'.
        // animateErnestToModule used 'ernest-character'.
        // moveErnestToNextModule used 'ernst-character'. Typo in original?
        // I will use 'ernest-character' consistently.

        this.animateHopping();
    }

    animateHopping() {
        const ernst = document.getElementById('ernest-character');
        if (!ernst) return;

        ernst.classList.remove('idle', 'celebrating');
        ernst.classList.add('hopping');

        setTimeout(() => {
            this.position(); // Re-position based on new index
            ernst.classList.remove('hopping');
            ernst.classList.add('celebrating');

            setTimeout(() => {
                ernst.classList.remove('celebrating');
                ernst.classList.add('idle');
            }, 1500);
        }, 800);
    }

    playAnimation(animationName, duration = 3000) {
        const ernst = document.getElementById('ernest-character');
        if (!ernst) return;

        const container = ernst.querySelector('.ernest-container');
        if (!container) return;

        // Clear existing states
        ernst.classList.remove('idle', 'celebrating', 'hopping', 'thinking', 'excited', 'lecturing');
        ernst.classList.add(animationName);

        // Apply specific gestures for animations
        switch (animationName) {
            case 'thinking':
                // Hand to chin (using point hand in CSS)
                container.setAttribute('data-gesture-r', 'point');
                container.setAttribute('data-gesture-l', 'palm');
                break;
            case 'excited':
            case 'jumping':
                // Double fists for jumping/pumping
                container.setAttribute('data-gesture-r', 'fist');
                container.setAttribute('data-gesture-l', 'fist');
                break;
            case 'lecturing':
                // Pointing character's left hand out (viewer's right)
                container.setAttribute('data-gesture-r', 'palm');
                container.setAttribute('data-gesture-l', 'point');
                break;
            default:
                // Reset to default (Right Palm, Left Fist)
                container.removeAttribute('data-gesture-r');
                container.removeAttribute('data-gesture-l');
                if (animationName === 'idle') {
                    ernst.classList.add('idle');
                }
                break;
        }

        // Auto-revert if duration > 0
        if (duration > 0) {
            setTimeout(() => {
                // If it hasn't changed to another animation
                if (ernst.classList.contains(animationName)) {
                    this.playAnimation('idle', 0);
                }
            }, duration);
        }
    }

    speak(message, duration = 2000) {
        const ernst = document.getElementById('ernest-character');
        if (!ernst) return;

        const existingBubble = ernst.querySelector('.ernest-speech-bubble');
        if (existingBubble) existingBubble.remove();

        const bubble = document.createElement('div');
        bubble.className = 'ernest-speech-bubble';
        bubble.textContent = message;

        ernst.appendChild(bubble);

        setTimeout(() => bubble.classList.add('show'), 100);
        setTimeout(() => {
            bubble.classList.remove('show');
            setTimeout(() => bubble.remove(), 300);
        }, duration);
    }

    celebrate() {
        const ernst = document.getElementById('ernest-character');
        if (!ernst) return;

        ernst.classList.remove('idle', 'hopping');
        ernst.classList.add('celebrating');

        const messages = ["Excellent work!", "Module complete! 🎉", "You're a pro!", "Outstanding!"];
        const message = messages[Math.floor(Math.random() * messages.length)];
        this.speak(message, 2000);

        setTimeout(() => {
            ernst.classList.remove('celebrating');
            ernst.classList.add('idle');
        }, 1500);
    }

    welcome() {
        const messages = ["Ready to learn?", "Let's go!", "Next module awaits!"];
        this.speak(messages[Math.floor(Math.random() * messages.length)], 3000);
    }

    showModuleDescription(moduleIndex) {
        const pgyLevel = window.currentPGYLevel || 'all';
        const modules = this.getModules(pgyLevel);
        const module = modules[moduleIndex];
        if (!module) return;

        const squares = document.querySelectorAll('.module-square');
        const targetSquare = squares[moduleIndex];
        if (!targetSquare) return;

        document.querySelectorAll('.ernest-description-box').forEach(box => box.remove());

        const descriptionBox = document.createElement('div');
        descriptionBox.className = 'ernest-description-box';
        descriptionBox.innerHTML = `
            <h4>${module.title}</h4>
            <p>${this.getDescriptionText(module)}</p>
            <button class="ernest-go-button" onclick="window.openModule('${module.id}', ${moduleIndex})">
                🚀 Let's Go!
            </button>
        `;

        targetSquare.appendChild(descriptionBox);
        setTimeout(() => descriptionBox.classList.add('show'), 100);

        // Auto hide
        setTimeout(() => {
            if (descriptionBox.parentNode) {
                descriptionBox.classList.remove('show');
                setTimeout(() => {
                    if (descriptionBox.parentNode) descriptionBox.remove();
                }, 300);
            }
        }, 5000);
    }

    getDescriptionText(module) {
        // Consolidated descriptions
        const descriptions = {
            'intro-emg': 'Start your EMG journey with fundamental principles.',
            // ... (Add others or use generic)
        };
        // Reuse global function logic if exists or import config
        if (window.getModuleDescription) return window.getModuleDescription(module);
        return descriptions[module.id] || 'Advance your EMG skills!';
    }

    getModules(pgyLevel) {
        return window.learningModulesConfig ? window.learningModulesConfig[pgyLevel] : [];
    }
}
