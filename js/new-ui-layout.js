// New UI Layout System - Path and Compact Toggle
// This script handles the new progression path and compact grid layouts

class UILayoutManager {
    constructor() {
        this.currentLayout = 'path'; // Default to path layout
        this.modules = [];
        this.ernestTooltip = null;
        this.init();
    }

    init() {
        this.createLayoutStructure();
        this.setupEventListeners();
        this.createErnestTooltip();
    }

    createLayoutStructure() {
        const learningBoard = document.getElementById('learning-board');
        if (!learningBoard) {
            console.log('Learning board not found, retrying...');
            setTimeout(() => this.createLayoutStructure(), 1000);
            return;
        }

        // Check if board is visible (not hidden)
        if (learningBoard.classList.contains('hidden')) {
            console.log('Learning board is hidden, retrying...');
            setTimeout(() => this.createLayoutStructure(), 1000);
            return;
        }

        // Skip waiting for old system since we're bypassing it
        // The old system is now redirected to call us directly

        // Only create if not already created
        if (learningBoard.querySelector('.layout-toggle')) {
            console.log('Layout already exists, skipping creation');
            return;
        }

        console.log('Creating new UI layout structure...');

        // COMPLETELY REPLACE the old candyland system
        learningBoard.innerHTML = '';

        // Create header to match original
        const currentPGY = window.currentPGYLevel || 'pgy2';
        const modules = window.learningModulesConfig?.[currentPGY] || [];
        const completedCount = window.completedModules ? window.completedModules.size : 0;

        const headerContainer = document.createElement('div');
        headerContainer.className = 'board-game-header';
        headerContainer.innerHTML = `
            <h2>${currentPGY.toUpperCase()} Learning Pathway</h2>
            <div class="progress-indicator">
                <div class="progress-text">Progress: ${completedCount}/${modules.length} modules</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(completedCount / modules.length) * 100}%"></div>
                </div>
            </div>
        `;

        // Create toggle controls
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'layout-toggle';
        toggleContainer.innerHTML = `
            <span class="toggle-label">Layout:</span>
            <button class="toggle-button active" data-layout="path">Progression Path</button>
            <button class="toggle-button" data-layout="compact">Compact View</button>
        `;

        // Create path layout container
        const pathLayout = document.createElement('div');
        pathLayout.className = 'path-layout';
        pathLayout.innerHTML = '<div class="module-path"></div>';

        // Create compact layout container
        const compactLayout = document.createElement('div');
        compactLayout.className = 'compact-layout';
        compactLayout.innerHTML = '<div class="modules-grid"></div>';

        // Insert into learning board
        learningBoard.appendChild(headerContainer);
        learningBoard.appendChild(toggleContainer);
        learningBoard.appendChild(pathLayout);
        learningBoard.appendChild(compactLayout);

        console.log('UI layout structure created successfully');
    }

    setupEventListeners() {
        // Toggle button listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-button')) {
                this.handleLayoutToggle(e.target);
            }

            const moduleElement = this.findModuleElement(e.target);
            if (moduleElement) {
                this.handleModuleClick(moduleElement);
            }
        });

        // Hover listeners for Ernest tooltips
        document.addEventListener('mouseenter', (e) => {
            const moduleElement = this.findModuleElement(e.target);
            if (moduleElement) {
                this.showErnestTooltip(moduleElement);
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            const moduleElement = this.findModuleElement(e.target);
            if (moduleElement) {
                this.hideErnestTooltip();
            }
        }, true);
    }

    findModuleElement(target) {
        // Walk up the DOM tree to find module element
        let element = target;
        while (element && element !== document) {
            if (element.classList && (element.classList.contains('module-rectangle') || element.classList.contains('module-card'))) {
                return element;
            }
            element = element.parentNode;
        }
        return null;
    }

    handleLayoutToggle(button) {
        const layout = button.dataset.layout;
        if (layout === this.currentLayout) return;

        // Update button states
        document.querySelectorAll('.toggle-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Toggle layouts
        this.currentLayout = layout;
        const pathLayout = document.querySelector('.path-layout');
        const compactLayout = document.querySelector('.compact-layout');

        if (layout === 'path') {
            pathLayout.style.display = 'block';
            compactLayout.style.display = 'none';
            compactLayout.classList.remove('active');
        } else {
            pathLayout.style.display = 'none';
            compactLayout.style.display = 'block';
            compactLayout.classList.add('active');
        }

        // Re-render modules in new layout
        this.renderModules();
    }

    renderModules() {
        // Get current PGY modules
        const currentPGY = window.currentPGYLevel || 'pgy2';
        const modules = window.learningModulesConfig?.[currentPGY] || [];

        if (this.currentLayout === 'path') {
            this.renderPathLayout(modules);
        } else {
            this.renderCompactLayout(modules);
        }
    }

    renderPathLayout(modules) {
        const pathContainer = document.querySelector('.module-path');
        if (!pathContainer) return;

        pathContainer.innerHTML = '';

        modules.forEach((module, index) => {
            const moduleStep = document.createElement('div');
            moduleStep.className = 'module-step';
            moduleStep.style.animationDelay = `${index * 0.1}s`;
            moduleStep.style.position = 'relative';
            moduleStep.style.marginBottom = '60px'; // Space for arrows

            const moduleRectangle = document.createElement('div');
            moduleRectangle.className = 'module-rectangle';
            moduleRectangle.dataset.moduleId = module.id;
            moduleRectangle.dataset.moduleIndex = index;

            // Add state classes (you can customize this based on progress)
            if (index === 0) moduleRectangle.classList.add('current');
            if (index < window.currentModuleIndex) moduleRectangle.classList.add('completed');
            // All modules unlocked for development/testing
            // if (index > window.currentModuleIndex + 2) moduleRectangle.classList.add('locked');

            // Force inline styles to ensure visibility
            moduleRectangle.style.cssText = `
                background: linear-gradient(135deg, #ffffff, #f8fafc) !important;
                border: 3px solid #e2e8f0 !important;
                border-radius: 20px !important;
                padding: 25px !important;
                min-height: 150px !important;
                margin: 10px 0 !important;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
                cursor: pointer !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                display: block !important;
                position: relative !important;
            `;

            // Add hover effects
            moduleRectangle.addEventListener('mouseenter', () => {
                moduleRectangle.style.transform = 'translateY(-4px)';
                moduleRectangle.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                moduleRectangle.style.borderColor = '#3b82f6';
            });

            moduleRectangle.addEventListener('mouseleave', () => {
                moduleRectangle.style.transform = 'translateY(0)';
                moduleRectangle.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                moduleRectangle.style.borderColor = '#e2e8f0';
            });

            moduleRectangle.innerHTML = `
                <div class="module-header" style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div class="module-number" style="
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 18px;
                        margin-right: 15px;
                        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                    ">${index + 1}</div>
                    <div style="flex: 1;">
                        <div class="module-title" style="
                            font-size: 20px;
                            font-weight: 600;
                            color: #1e293b;
                            margin-bottom: 4px;
                            line-height: 1.2;
                        ">${module.title}</div>
                        <div class="module-competency" style="
                            font-size: 12px;
                            font-weight: 500;
                            color: #3b82f6;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            background: #eff6ff;
                            padding: 2px 8px;
                            border-radius: 12px;
                            display: inline-block;
                        ">${module.competency}</div>
                    </div>
                </div>
                <div class="module-content" style="
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.5;
                    padding-left: 55px;
                ">${module.description}</div>
            `;

            moduleStep.appendChild(moduleRectangle);

            // Add arrow if not last module - use CSS arrow instead of emoji
            if (index < modules.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'module-arrow';
                arrow.innerHTML = ''; // No text, use CSS for arrow
                moduleStep.appendChild(arrow);
            }

            pathContainer.appendChild(moduleStep);
        });
    }

    renderCompactLayout(modules) {
        const gridContainer = document.querySelector('.modules-grid');
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        modules.forEach((module, index) => {
            const moduleCard = document.createElement('div');
            moduleCard.className = 'module-card';
            moduleCard.dataset.moduleId = module.id;
            moduleCard.dataset.moduleIndex = index;
            moduleCard.style.animationDelay = `${index * 0.05}s`;

            // Add state classes
            if (index === 0) moduleCard.classList.add('current');
            if (index < window.currentModuleIndex) moduleCard.classList.add('completed');
            // All modules unlocked for development/testing
            // if (index > window.currentModuleIndex + 2) moduleCard.classList.add('locked');

            // Force inline styles for compact cards too
            moduleCard.style.cssText = `
                background: linear-gradient(135deg, #ffffff, #f8fafc) !important;
                border: 2px solid #e2e8f0 !important;
                border-radius: 15px !important;
                padding: 20px !important;
                min-height: 120px !important;
                margin: 10px !important;
                box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1) !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                display: block !important;
            `;

            // Add hover effects for compact cards
            moduleCard.addEventListener('mouseenter', () => {
                moduleCard.style.transform = 'translateY(-2px) scale(1.02)';
                moduleCard.style.boxShadow = '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06)';
                moduleCard.style.borderColor = '#3b82f6';
            });

            moduleCard.addEventListener('mouseleave', () => {
                moduleCard.style.transform = 'translateY(0) scale(1)';
                moduleCard.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
                moduleCard.style.borderColor = '#e2e8f0';
            });

            moduleCard.innerHTML = `
                <div class="card-header" style="display: flex; align-items: center; margin-bottom: 12px;">
                    <div class="module-number" style="
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 14px;
                        margin-right: 10px;
                        box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
                    ">${index + 1}</div>
                    <div class="module-competency" style="
                        font-size: 10px;
                        font-weight: 500;
                        color: #3b82f6;
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                        background: #eff6ff;
                        padding: 2px 6px;
                        border-radius: 8px;
                    ">${module.competency}</div>
                </div>
                <div class="module-title" style="
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 8px;
                    line-height: 1.3;
                ">${module.title}</div>
                <div class="module-description" style="
                    color: #64748b;
                    font-size: 12px;
                    line-height: 1.4;
                ">${module.description}</div>
            `;

            gridContainer.appendChild(moduleCard);
        });
    }

    getModuleIcon(iconData) {
        // Return empty string - no icons at all
        return '';
    }

    createErnestTooltip() {
        // Remove existing tooltip if it exists
        const existingTooltip = document.querySelector('.ernest-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        this.ernestTooltip = document.createElement('div');
        this.ernestTooltip.className = 'ernest-tooltip';
        this.ernestTooltip.innerHTML = `
            <div class="ernest-character" style="width: 40px; height: 40px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px;">🧑‍⚕️</div>
            <div class="tooltip-content">
                <div class="tooltip-title"></div>
                <div class="tooltip-text"></div>
            </div>
        `;

        // Position at bottom right, hidden by default
        this.ernestTooltip.style.position = 'fixed';
        this.ernestTooltip.style.bottom = '20px';
        this.ernestTooltip.style.right = '20px';
        this.ernestTooltip.style.opacity = '0';
        this.ernestTooltip.style.visibility = 'hidden';
        this.ernestTooltip.style.pointerEvents = 'none';
        this.ernestTooltip.style.transition = 'all 0.3s ease';
        document.body.appendChild(this.ernestTooltip);
    }

    showErnestTooltip(moduleElement) {
        if (!moduleElement || !this.ernestTooltip) return;

        const moduleIndex = parseInt(moduleElement.dataset.moduleIndex);
        const currentPGY = window.currentPGYLevel || 'pgy2';
        const modules = window.learningModulesConfig?.[currentPGY] || [];
        const module = modules[moduleIndex];

        if (!module) return;

        // Update tooltip content
        const titleEl = this.ernestTooltip.querySelector('.tooltip-title');
        const textEl = this.ernestTooltip.querySelector('.tooltip-text');

        titleEl.textContent = module.title;
        textEl.textContent = `Click to explore ${module.title}. This module covers: ${module.description}`;

        // Show tooltip with smooth animation
        this.ernestTooltip.style.opacity = '1';
        this.ernestTooltip.style.visibility = 'visible';
        this.ernestTooltip.classList.add('show');
    }

    hideErnestTooltip() {
        if (this.ernestTooltip) {
            this.ernestTooltip.style.opacity = '0';
            this.ernestTooltip.style.visibility = 'hidden';
            this.ernestTooltip.classList.remove('show');
        }
    }

    handleModuleClick(moduleElement) {
        if (!moduleElement) return;

        const moduleIndex = parseInt(moduleElement.dataset.moduleIndex);

        // All modules unlocked for development/testing
        // if (moduleElement.classList.contains('locked')) {
        //     this.showLockedMessage();
        //     return;
        // }

        // Call the existing startLearningModule function
        if (typeof window.startLearningModule === 'function') {
            window.startLearningModule(moduleIndex);
        }
    }

    showLockedMessage() {
        // Update Ernest tooltip for locked modules
        const titleEl = this.ernestTooltip.querySelector('.tooltip-title');
        const textEl = this.ernestTooltip.querySelector('.tooltip-text');

        titleEl.textContent = 'Module Locked';
        textEl.textContent = 'Complete the previous modules to unlock this content!';

        this.ernestTooltip.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            this.hideErnestTooltip();
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing UI Layout Manager...');
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.uiLayoutManager = new UILayoutManager();
        console.log('UI Layout Manager initialized');
    }, 1000);
});

// Also initialize when the learning board becomes active
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pgy-card')) {
        console.log('PGY card clicked, setting up new UI...');
        setTimeout(() => {
            if (!window.uiLayoutManager) {
                console.log('Creating new UI Layout Manager...');
                window.uiLayoutManager = new UILayoutManager();
            }
            console.log('Rendering modules...');
            window.uiLayoutManager.renderModules();
        }, 2000); // Increased wait time
    }
});

// Fallback initialization - try every few seconds if not initialized
let initAttempts = 0;
const maxInitAttempts = 10;

function tryInitialize() {
    initAttempts++;
    console.log(`UI initialization attempt ${initAttempts}/${maxInitAttempts}`);

    if (window.uiLayoutManager) {
        console.log('UI Layout Manager already exists');
        return;
    }

    const learningBoard = document.getElementById('learning-board');
    if (learningBoard && !learningBoard.classList.contains('hidden')) {
        console.log('Learning board found and visible, initializing UI...');
        window.uiLayoutManager = new UILayoutManager();
        window.uiLayoutManager.renderModules();
    } else if (initAttempts < maxInitAttempts) {
        console.log('Learning board not found or hidden, retrying...');
        setTimeout(tryInitialize, 2000);
    }
}

// Start trying to initialize after page load
window.addEventListener('load', () => {
    setTimeout(tryInitialize, 3000);
});