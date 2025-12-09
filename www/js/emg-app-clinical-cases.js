// EMG APP Clinical Cases System - Exact implementation from EMG APP
console.log('🎯 Loading EMG APP Clinical Cases System...');

// EMG APP Clinical Cases Function - EXACT COPY from EMG APP design
function showClinicalCases(pgyLevel) {
    const content = `
        <style>
            .difficulty-selector {
                background: rgba(107, 159, 120, 0.95);
                border-radius: 25px;
                padding: 40px;
                margin: 20px 0;
                position: relative;
                overflow: hidden;
            }

            .selector-title {
                text-align: center;
                color: #2c3e50;
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
            }

            .selector-subtitle {
                text-align: center;
                color: #ffffff;
                font-size: 16px;
                margin-bottom: 40px;
                opacity: 0.9;
            }

            .difficulty-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 25px;
                margin-bottom: 40px;
                position: relative;
                z-index: 2;
            }

            .difficulty-card {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 30px;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                overflow: hidden;
                text-align: center;
                color: white;
            }

            .difficulty-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .difficulty-card:hover::before {
                opacity: 1;
            }

            .difficulty-card.active {
                transform: translateY(-10px) scale(1.05);
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border-color: rgba(255, 255, 255, 0.5);
            }

            .beginner-card.active {
                background: linear-gradient(135deg, #4ade80, #22c55e);
                box-shadow: 0 20px 40px rgba(34, 197, 94, 0.4);
            }

            .intermediate-card.active {
                background: linear-gradient(135deg, #fb923c, #f97316);
                box-shadow: 0 20px 40px rgba(249, 115, 22, 0.4);
            }

            .difficult-card.active {
                background: linear-gradient(135deg, #f87171, #ef4444);
                box-shadow: 0 20px 40px rgba(239, 68, 68, 0.4);
            }

            .card-icon {
                font-size: 48px;
                margin-bottom: 15px;
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .card-title {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 8px;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }

            .card-subtitle {
                font-size: 14px;
                opacity: 0.9;
                font-weight: 600;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin-bottom: 15px;
            }

            .status-light {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #4ade80;
                box-shadow: 0 0 15px #4ade80;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .status-text {
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1px;
            }

            .card-description {
                font-size: 14px;
                opacity: 0.9;
                line-height: 1.4;
            }

            .action-buttons {
                display: flex;
                gap: 20px;
                justify-content: center;
                flex-wrap: wrap;
                position: relative;
                z-index: 2;
            }

            .primary-action-btn {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 18px 36px;
                border-radius: 50px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
                position: relative;
                overflow: hidden;
            }

            .secondary-action-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 16px 34px;
                border-radius: 50px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .primary-action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(5, 150, 105, 0.4);
            }

            .secondary-action-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
        </style>

        <div class="difficulty-selector">
            <h3 class="selector-title">⚡ Choose Your Challenge Level</h3>
            <p class="selector-subtitle">Select which difficulty levels you want to practice with</p>

            <div class="difficulty-cards">
                <div class="difficulty-card beginner-card active" onclick="startBeginnerCases()">
                    <div class="card-icon">🌱</div>
                    <div class="card-title">Beginner</div>
                    <div class="card-subtitle">Learning the Basics</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Perfect for residents starting their EMG/NCS journey</div>
                </div>

                <div class="difficulty-card intermediate-card active" onclick="startIntermediateCases()">
                    <div class="card-icon">🔥</div>
                    <div class="card-title">Intermediate</div>
                    <div class="card-subtitle">Building Skills</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Ready for more complex diagnostic challenges</div>
                </div>

                <div class="difficulty-card difficult-card active" onclick="startExpertCases()">
                    <div class="card-icon">💎</div>
                    <div class="card-title">Expert</div>
                    <div class="card-subtitle">Master Level</div>
                    <div class="status-indicator">
                        <div class="status-light"></div>
                        <span class="status-text">ACTIVE</span>
                    </div>
                    <div class="card-description">Advanced cases that challenge even experts</div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="primary-action-btn" onclick="startRandomCaseByDifficulty()">
                    🎲 Start Practice Session
                </button>
                <button class="secondary-action-btn" onclick="showCaseSelection()">
                    🎯 Choose Specific Cases
                </button>
            </div>
        </div>
    `;

    showModal('⚡ Choose Your Challenge Level', content);
}

// Wrapper function for compatibility - OVERRIDE OLD SYSTEM
function showClinicalCasesModal(pgyLevel, difficulty) {
    console.log('🎯 DEBUG: EMG APP showClinicalCasesModal called with:', { pgyLevel, difficulty });
    console.log('🚀 Using EMG APP design instead of old system');
    showClinicalCases(pgyLevel);
}

// Placeholder functions for EMG APP functionality
function startRandomCaseByDifficulty() {
    alert('🎲 Starting random practice session! This will start a random case from your selected difficulty levels.');
    startBeginnerCases(); // For now, start with beginner cases
}

function showCaseSelection() {
    alert('🎯 Case selection interface coming soon! This will show all available cases to choose from.');
}

// Make functions globally available
window.showClinicalCases = showClinicalCases;
window.showClinicalCasesModal = showClinicalCasesModal;
window.startRandomCaseByDifficulty = startRandomCaseByDifficulty;
window.showCaseSelection = showCaseSelection;

// Force override of old functions
window.showClinicalCases = showClinicalCases;
window.showClinicalCasesModal = showClinicalCasesModal;

console.log('✅ EMG APP Clinical Cases System loaded successfully!');
console.log('🔄 Overriding old clinical cases functions with EMG APP design');