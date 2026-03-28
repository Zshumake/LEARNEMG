/**
 * MuscleTestAnatomy.js
 * Movement-specific SVG illustrations for manual muscle testing.
 * Each movement gets a dedicated view showing the relevant body part
 * with realistic filled shapes and smooth CSS animation.
 */

const SKIN = '#e8c4a0';
const SKIN_SHADOW = '#d4a574';
const HIGHLIGHT = '#8b5cf6';
const HIGHLIGHT_GLOW = 'rgba(139,92,246,0.3)';
const LE_HIGHLIGHT = '#ec4899';
const LE_GLOW = 'rgba(236,72,153,0.3)';

/* ── shared CSS injected once per SVG ── */
function sharedStyle(color, glow) {
    return `
        .limb { fill: ${SKIN}; stroke: ${SKIN_SHADOW}; stroke-width: 0.8; }
        .limb-shadow { fill: ${SKIN_SHADOW}; stroke: none; }
        .joint { fill: ${SKIN_SHADOW}; stroke: none; }
        .nail { fill: #f0ddd0; stroke: #d4a574; stroke-width: 0.3; }
        .active { fill: ${color}20; stroke: ${color}; stroke-width: 1.2; filter: drop-shadow(0 0 3px ${glow}); }
        .arrow { fill: none; stroke: ${color}; stroke-width: 1.5; stroke-linecap: round; marker-end: url(#arrowHead); }
        .arrow-head { fill: ${color}; }
        .label { font-family: system-ui, sans-serif; font-size: 5px; fill: #64748b; text-anchor: middle; }
        .muscle-label { font-family: system-ui, sans-serif; font-size: 4px; fill: ${color}; font-weight: 600; text-anchor: middle; }
    `;
}

function arrowMarker(color) {
    return `<defs><marker id="arrowHead" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" class="arrow-head" fill="${color}"/></marker></defs>`;
}

/* ════════════════════════════════════════
   UPPER EXTREMITY
   ════════════════════════════════════════ */

function svgElbowFlex() {
    // Lateral view: upper arm horizontal, forearm curls up
    return `<svg viewBox="0 0 120 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .forearm-group { transform-origin: 70px 48px; animation: elbowFlex 2s infinite alternate ease-in-out; }
            @keyframes elbowFlex { 0% { transform: rotate(0deg); } 100% { transform: rotate(-55deg); } }
        </style>
        ${arrowMarker(HIGHLIGHT)}
        <!-- Shoulder region -->
        <ellipse cx="22" cy="45" rx="12" ry="16" class="limb" />
        <!-- Upper arm -->
        <path d="M32,38 Q50,34 70,42 Q72,48 70,54 Q50,50 32,52 Z" class="limb" />
        <circle cx="70" cy="48" r="4" class="joint" />
        <!-- Forearm (animated) -->
        <g class="forearm-group">
            <path d="M70,42 Q88,38 105,40 Q107,44 105,48 Q88,50 70,54 Z" class="limb active" />
            <!-- Hand -->
            <rect x="104" y="38" rx="3" ry="3" width="12" height="12" class="limb" />
            <!-- Biceps bulge indicator -->
            <ellipse cx="52" cy="40" rx="8" ry="3" fill="${HIGHLIGHT}20" stroke="${HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="2,1" />
        </g>
        <!-- Arrow showing motion arc -->
        <path d="M100,52 Q96,62 88,68" class="arrow" />
        <text x="60" y="92" class="label">Elbow Flexion</text>
        <text x="52" y="36" class="muscle-label">biceps</text>
    </svg>`;
}

function svgElbowExt() {
    return `<svg viewBox="0 0 120 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .forearm-group { transform-origin: 70px 48px; animation: elbowExt 2s infinite alternate ease-in-out; }
            @keyframes elbowExt { 0% { transform: rotate(-50deg); } 100% { transform: rotate(0deg); } }
        </style>
        ${arrowMarker(HIGHLIGHT)}
        <ellipse cx="22" cy="45" rx="12" ry="16" class="limb" />
        <path d="M32,38 Q50,34 70,42 Q72,48 70,54 Q50,50 32,52 Z" class="limb" />
        <circle cx="70" cy="48" r="4" class="joint" />
        <g class="forearm-group">
            <path d="M70,42 Q88,38 105,40 Q107,44 105,48 Q88,50 70,54 Z" class="limb active" />
            <rect x="104" y="38" rx="3" ry="3" width="12" height="12" class="limb" />
            <!-- Triceps highlight -->
            <ellipse cx="52" cy="52" rx="8" ry="2.5" fill="${HIGHLIGHT}20" stroke="${HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="2,1" />
        </g>
        <path d="M88,30 Q96,24 100,18" class="arrow" />
        <text x="60" y="92" class="label">Elbow Extension</text>
        <text x="52" y="58" class="muscle-label">triceps</text>
    </svg>`;
}

function svgWristFlex() {
    return `<svg viewBox="0 0 120 90" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .hand-group { transform-origin: 82px 40px; animation: wristFlex 1.5s infinite alternate ease-in-out; }
            @keyframes wristFlex { 0% { transform: rotate(0deg); } 100% { transform: rotate(35deg); } }
        </style>
        ${arrowMarker(HIGHLIGHT)}
        <!-- Forearm -->
        <path d="M10,32 Q45,28 80,34 Q82,40 80,46 Q45,44 10,40 Z" class="limb" />
        <circle cx="82" cy="40" r="3" class="joint" />
        <!-- Hand -->
        <g class="hand-group">
            <path d="M82,34 Q95,30 108,33 Q112,38 108,44 Q95,46 82,46 Z" class="limb active" />
            <!-- Fingers -->
            <line x1="108" y1="34" x2="115" y2="33" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="108" y1="37" x2="116" y2="36" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="108" y1="40" x2="116" y2="40" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="108" y1="43" x2="115" y2="44" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
        </g>
        <path d="M105,48 Q108,55 108,60" class="arrow" />
        <text x="60" y="80" class="label">Wrist Flexion</text>
    </svg>`;
}

function svgWristExt() {
    return `<svg viewBox="0 0 120 90" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .hand-group { transform-origin: 82px 40px; animation: wristExt 1.5s infinite alternate ease-in-out; }
            @keyframes wristExt { 0% { transform: rotate(0deg); } 100% { transform: rotate(-30deg); } }
        </style>
        ${arrowMarker(HIGHLIGHT)}
        <path d="M10,32 Q45,28 80,34 Q82,40 80,46 Q45,44 10,40 Z" class="limb" />
        <circle cx="82" cy="40" r="3" class="joint" />
        <g class="hand-group">
            <path d="M82,34 Q95,30 108,33 Q112,38 108,44 Q95,46 82,46 Z" class="limb active" />
            <line x1="108" y1="34" x2="115" y2="33" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="108" y1="37" x2="116" y2="36" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="108" y1="40" x2="116" y2="40" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="108" y1="43" x2="115" y2="44" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
        </g>
        <path d="M105,28 Q108,22 108,16" class="arrow" />
        <text x="60" y="80" class="label">Wrist Extension</text>
    </svg>`;
}

function svgShoulderAbd() {
    // Anterior view: arm lifting away from body
    return `<svg viewBox="0 0 120 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .arm-group { transform-origin: 48px 28px; animation: shoulderAbd 2s infinite alternate ease-in-out; }
            @keyframes shoulderAbd { 0% { transform: rotate(0deg); } 100% { transform: rotate(-70deg); } }
        </style>
        ${arrowMarker(HIGHLIGHT)}
        <!-- Torso -->
        <path d="M45,18 Q60,14 75,18 Q80,45 78,75 Q60,78 42,75 Q40,45 45,18 Z" class="limb" />
        <!-- Head -->
        <ellipse cx="60" cy="12" rx="8" ry="10" class="limb" />
        <!-- Right arm (animated) -->
        <g class="arm-group">
            <!-- Deltoid cap -->
            <ellipse cx="44" cy="30" rx="7" ry="5" class="limb active" />
            <!-- Upper arm -->
            <path d="M40,34 Q38,50 37,65 Q42,67 45,65 Q44,50 46,34 Z" class="limb active" />
            <!-- Forearm + hand -->
            <path d="M37,65 Q36,76 35,85 Q39,87 42,85 Q42,76 45,65 Z" class="limb" />
        </g>
        <!-- Left arm (static) -->
        <path d="M76,34 Q78,50 79,65 Q83,67 85,65 Q84,50 82,34 Z" class="limb" style="opacity:0.5" />
        <path d="M79,65 Q80,76 81,85 Q84,87 86,85 Q85,76 85,65 Z" class="limb" style="opacity:0.5" />
        <path d="M30,50 Q20,38 14,30" class="arrow" />
        <text x="60" y="96" class="label">Shoulder Abduction</text>
        <text x="38" y="28" class="muscle-label">deltoid</text>
    </svg>`;
}

function svgFingerAbd() {
    // Dorsal view of hand: fingers spread apart
    return `<svg viewBox="0 0 100 110" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .f-index { transform-origin: 38px 45px; animation: fSpreadIndex 1.5s infinite alternate ease-in-out; }
            .f-middle { transform-origin: 46px 42px; }
            .f-ring { transform-origin: 54px 44px; animation: fSpreadRing 1.5s infinite alternate ease-in-out; }
            .f-pinky { transform-origin: 60px 48px; animation: fSpreadPinky 1.5s infinite alternate ease-in-out; }
            @keyframes fSpreadIndex { 0% { transform: rotate(0deg); } 100% { transform: rotate(-12deg); } }
            @keyframes fSpreadRing { 0% { transform: rotate(0deg); } 100% { transform: rotate(8deg); } }
            @keyframes fSpreadPinky { 0% { transform: rotate(0deg); } 100% { transform: rotate(16deg); } }
        </style>
        <!-- Palm -->
        <path d="M30,50 Q28,60 30,75 Q45,80 60,75 Q64,60 62,50 Z" class="limb" />
        <!-- Thumb -->
        <path d="M30,60 Q22,55 18,48 Q16,44 20,42 Q24,44 28,50 Z" class="limb" />
        <!-- Index -->
        <g class="f-index">
            <path d="M34,50 Q33,38 32,24 Q36,22 40,24 Q40,38 40,50 Z" class="limb active" />
            <rect x="33" y="22" rx="1" ry="1" width="6" height="3" class="nail" />
        </g>
        <!-- Middle -->
        <g class="f-middle">
            <path d="M42,48 Q42,34 42,18 Q46,16 50,18 Q49,34 48,48 Z" class="limb" />
            <rect x="42" y="16" rx="1" ry="1" width="6" height="3" class="nail" />
        </g>
        <!-- Ring -->
        <g class="f-ring">
            <path d="M50,50 Q51,36 52,22 Q56,20 58,22 Q57,36 56,50 Z" class="limb active" />
            <rect x="52" y="20" rx="1" ry="1" width="5" height="3" class="nail" />
        </g>
        <!-- Pinky -->
        <g class="f-pinky">
            <path d="M58,52 Q60,42 61,30 Q64,28 66,30 Q65,42 63,52 Z" class="limb active" />
            <rect x="61" y="28" rx="1" ry="1" width="4" height="3" class="nail" />
        </g>
        <!-- FDI muscle highlight -->
        <ellipse cx="36" cy="55" rx="4" ry="6" fill="${HIGHLIGHT}25" stroke="${HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="1.5,1" />
        <text x="50" y="100" class="label">Finger Abduction</text>
        <text x="28" y="64" class="muscle-label">FDI</text>
    </svg>`;
}

function svgThumbAbd() {
    // Palmar view: thumb moving away from palm
    return `<svg viewBox="0 0 100 110" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .thumb-group { transform-origin: 30px 60px; animation: thumbAbd 1.5s infinite alternate ease-in-out; }
            @keyframes thumbAbd { 0% { transform: rotate(0deg); } 100% { transform: rotate(-25deg); } }
        </style>
        ${arrowMarker(HIGHLIGHT)}
        <!-- Palm -->
        <path d="M30,50 Q28,60 30,75 Q45,80 60,75 Q64,60 62,50 Z" class="limb" />
        <!-- Fingers (static, slightly curled) -->
        <path d="M34,50 Q33,38 34,26 Q38,24 40,26 Q40,38 40,50 Z" class="limb" />
        <path d="M42,48 Q42,34 43,20 Q47,18 50,20 Q49,34 48,48 Z" class="limb" />
        <path d="M50,50 Q51,36 53,24 Q57,22 58,24 Q57,36 56,50 Z" class="limb" />
        <path d="M58,52 Q60,42 62,32 Q65,30 66,32 Q65,42 63,52 Z" class="limb" />
        <!-- Thumb (animated) -->
        <g class="thumb-group">
            <path d="M30,60 Q22,55 16,46 Q14,42 18,40 Q22,42 28,50 Z" class="limb active" />
        </g>
        <!-- Thenar eminence highlight -->
        <ellipse cx="34" cy="65" rx="5" ry="7" fill="${HIGHLIGHT}25" stroke="${HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="1.5,1" />
        <path d="M14,42 Q8,36 6,30" class="arrow" />
        <text x="50" y="100" class="label">Thumb Abduction</text>
        <text x="34" y="76" class="muscle-label">APB</text>
    </svg>`;
}

function svgGrip() {
    // Lateral view: hand closing into fist
    return `<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .fingers-group { animation: gripClose 1.8s infinite alternate ease-in-out; }
            .f1 { transform-origin: 65px 35px; }
            .f2 { transform-origin: 68px 32px; }
            .f3 { transform-origin: 66px 34px; }
            .f4 { transform-origin: 62px 38px; }
            @keyframes gripClose {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(30deg); }
            }
        </style>
        <!-- Forearm stub -->
        <path d="M5,38 Q25,32 45,35 Q47,42 45,48 Q25,48 5,45 Z" class="limb" />
        <!-- Palm -->
        <path d="M45,30 Q55,26 68,30 Q72,40 68,50 Q55,54 45,50 Z" class="limb active" />
        <!-- Thumb wrapping -->
        <path d="M50,50 Q48,56 52,60 Q56,62 60,58 Q58,52 56,48" class="limb" stroke-width="1" />
        <!-- Fingers curling -->
        <g class="fingers-group">
            <g class="f1"><path d="M68,32 Q76,28 80,32 Q78,36 72,36 Z" class="limb" /></g>
            <g class="f2"><path d="M68,36 Q78,33 82,37 Q80,42 72,40 Z" class="limb" /></g>
            <g class="f3"><path d="M67,40 Q76,38 80,42 Q78,46 70,44 Z" class="limb" /></g>
            <g class="f4"><path d="M65,44 Q72,43 76,46 Q74,50 68,48 Z" class="limb" /></g>
        </g>
        <text x="50" y="85" class="label">Grip Strength</text>
    </svg>`;
}

function svgFingerExt() {
    // Dorsal view: fingers extending from curled
    return `<svg viewBox="0 0 100 110" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(HIGHLIGHT, HIGHLIGHT_GLOW)}
            .fingers { transform-origin: 46px 50px; animation: fingerExt 1.8s infinite alternate ease-in-out; }
            @keyframes fingerExt { 0% { transform: rotate(8deg); } 100% { transform: rotate(0deg); } }
        </style>
        <path d="M30,50 Q28,60 30,75 Q45,80 60,75 Q64,60 62,50 Z" class="limb" />
        <path d="M30,60 Q22,55 18,48 Q16,44 20,42 Q24,44 28,50 Z" class="limb" />
        <g class="fingers">
            <path d="M34,50 Q33,38 34,26 Q38,24 40,26 Q40,38 40,50 Z" class="limb active" />
            <path d="M42,48 Q42,34 43,20 Q47,18 50,20 Q49,34 48,48 Z" class="limb active" />
            <path d="M50,50 Q51,36 53,24 Q57,22 58,24 Q57,36 56,50 Z" class="limb active" />
            <path d="M58,52 Q60,42 62,32 Q65,30 66,32 Q65,42 63,52 Z" class="limb active" />
        </g>
        <text x="50" y="100" class="label">Finger Extension</text>
    </svg>`;
}

/* ════════════════════════════════════════
   LOWER EXTREMITY
   ════════════════════════════════════════ */

function svgHipFlex() {
    // Lateral view: thigh lifting forward
    return `<svg viewBox="0 0 120 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .leg-group { transform-origin: 55px 35px; animation: hipFlex 2s infinite alternate ease-in-out; }
            @keyframes hipFlex { 0% { transform: rotate(0deg); } 100% { transform: rotate(-35deg); } }
        </style>
        ${arrowMarker(LE_HIGHLIGHT)}
        <!-- Torso/pelvis -->
        <path d="M40,10 Q60,8 70,12 Q72,28 68,38 Q55,42 45,38 Q42,28 40,10 Z" class="limb" />
        <!-- Leg (animated) -->
        <g class="leg-group">
            <path d="M48,36 Q46,52 44,68 Q42,72 44,76 Q52,78 56,76 Q58,72 56,68 Q56,52 58,36 Z" class="limb active" />
            <!-- Lower leg -->
            <path d="M44,76 Q42,86 42,94 Q46,96 50,96 Q52,94 56,76 Z" class="limb" />
            <!-- Foot -->
            <path d="M42,94 Q38,96 36,94 Q36,92 42,92 Z" class="limb" />
        </g>
        <!-- Static back leg -->
        <path d="M58,38 Q62,55 64,72 Q66,76 64,80 Q72,82 74,80 Q76,76 74,72 Q72,55 70,38 Z" class="limb" style="opacity:0.4" />
        <path d="M64,80 Q66,90 68,96 Q72,98 74,96 Q74,90 74,80 Z" class="limb" style="opacity:0.4" />
        <path d="M40,60 Q32,52 28,46" class="arrow" />
        <text x="60" y="16" class="muscle-label">iliopsoas</text>
    </svg>`;
}

function svgHipAbd() {
    // Anterior view: leg moving outward from midline
    return `<svg viewBox="0 0 120 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .leg-group { transform-origin: 48px 30px; animation: hipAbd 2s infinite alternate ease-in-out; }
            @keyframes hipAbd { 0% { transform: rotate(0deg); } 100% { transform: rotate(-20deg); } }
        </style>
        ${arrowMarker(LE_HIGHLIGHT)}
        <!-- Pelvis -->
        <path d="M35,10 Q60,8 85,10 Q88,24 85,32 Q60,36 35,32 Q32,24 35,10 Z" class="limb" />
        <!-- Left leg (animated) -->
        <g class="leg-group">
            <path d="M38,32 Q36,52 35,72 Q33,76 35,80 Q43,82 47,80 Q49,76 47,72 Q47,52 50,32 Z" class="limb active" />
            <path d="M35,80 Q34,88 34,95 Q38,97 42,95 Q44,88 47,80 Z" class="limb" />
        </g>
        <!-- Right leg (static) -->
        <path d="M68,32 Q66,52 65,72 Q63,76 65,80 Q73,82 77,80 Q79,76 77,72 Q77,52 80,32 Z" class="limb" style="opacity:0.4" />
        <path d="M65,80 Q64,88 64,95 Q68,97 72,95 Q74,88 77,80 Z" class="limb" style="opacity:0.4" />
        <!-- Glut med highlight -->
        <ellipse cx="38" cy="26" rx="6" ry="4" fill="${LE_HIGHLIGHT}25" stroke="${LE_HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="1.5,1" />
        <path d="M28,58 Q20,50 16,44" class="arrow" />
        <text x="32" y="22" class="muscle-label">glut med</text>
    </svg>`;
}

function svgHipExt() {
    return `<svg viewBox="0 0 120 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .leg-group { transform-origin: 55px 35px; animation: hipExt 2s infinite alternate ease-in-out; }
            @keyframes hipExt { 0% { transform: rotate(0deg); } 100% { transform: rotate(25deg); } }
        </style>
        ${arrowMarker(LE_HIGHLIGHT)}
        <path d="M40,10 Q60,8 70,12 Q72,28 68,38 Q55,42 45,38 Q42,28 40,10 Z" class="limb" />
        <g class="leg-group">
            <path d="M48,36 Q46,52 44,68 Q42,72 44,76 Q52,78 56,76 Q58,72 56,68 Q56,52 58,36 Z" class="limb active" />
            <path d="M44,76 Q42,86 42,94 Q46,96 50,96 Q52,94 56,76 Z" class="limb" />
        </g>
        <path d="M58,38 Q62,55 64,72 Q66,76 64,80 Q72,82 74,80 Q76,76 74,72 Q72,55 70,38 Z" class="limb" style="opacity:0.4" />
        <path d="M52,62 Q58,70 62,76" class="arrow" />
        <text x="60" y="16" class="muscle-label">glut max</text>
    </svg>`;
}

function svgKneeExt() {
    // Lateral view: lower leg extending from bent
    return `<svg viewBox="0 0 120 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .lower-leg { transform-origin: 55px 48px; animation: kneeExt 2s infinite alternate ease-in-out; }
            @keyframes kneeExt { 0% { transform: rotate(40deg); } 100% { transform: rotate(0deg); } }
        </style>
        ${arrowMarker(LE_HIGHLIGHT)}
        <!-- Thigh -->
        <path d="M40,8 Q38,24 40,40 Q44,50 50,50 Q58,50 62,40 Q64,24 62,8 Z" class="limb" />
        <!-- Quad highlight -->
        <ellipse cx="50" cy="24" rx="6" ry="10" fill="${LE_HIGHLIGHT}20" stroke="${LE_HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="1.5,1" />
        <circle cx="52" cy="48" r="5" class="joint" />
        <!-- Lower leg (animated) -->
        <g class="lower-leg">
            <path d="M46,50 Q44,66 43,82 Q47,86 53,86 Q55,82 58,66 Q58,50 56,50 Z" class="limb active" />
            <!-- Foot -->
            <path d="M43,84 Q40,88 38,90 Q40,92 48,92 Q53,90 53,86 Z" class="limb" />
        </g>
        <path d="M44,72 Q36,66 32,60" class="arrow" />
        <text x="50" y="18" class="muscle-label">quads</text>
    </svg>`;
}

function svgAnkleDorsi() {
    // Lateral view: foot pulling up
    return `<svg viewBox="0 0 110 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .foot-group { transform-origin: 50px 68px; animation: ankleDorsi 1.5s infinite alternate ease-in-out; }
            @keyframes ankleDorsi { 0% { transform: rotate(0deg); } 100% { transform: rotate(-20deg); } }
        </style>
        ${arrowMarker(LE_HIGHLIGHT)}
        <!-- Lower leg / shin -->
        <path d="M42,8 Q40,28 42,48 Q44,62 46,68 Q52,70 56,68 Q60,62 60,48 Q62,28 60,8 Z" class="limb" />
        <!-- Tibialis anterior highlight -->
        <ellipse cx="46" cy="40" rx="3" ry="12" fill="${LE_HIGHLIGHT}20" stroke="${LE_HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="1.5,1" />
        <circle cx="50" cy="68" r="4" class="joint" />
        <!-- Foot -->
        <g class="foot-group">
            <path d="M44,68 Q40,72 30,76 Q26,78 26,82 Q30,86 50,86 Q56,84 58,78 Q58,72 56,68 Z" class="limb active" />
            <!-- Toes -->
            <line x1="26" y1="82" x2="22" y2="80" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="28" y1="84" x2="24" y2="83" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
        </g>
        <path d="M30,72 Q24,66 22,60" class="arrow" />
        <text x="40" y="36" class="muscle-label">tib ant</text>
    </svg>`;
}

function svgAnklePlantar() {
    return `<svg viewBox="0 0 110 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .foot-group { transform-origin: 50px 68px; animation: anklePlantar 1.5s infinite alternate ease-in-out; }
            @keyframes anklePlantar { 0% { transform: rotate(0deg); } 100% { transform: rotate(15deg); } }
        </style>
        ${arrowMarker(LE_HIGHLIGHT)}
        <path d="M42,8 Q40,28 42,48 Q44,62 46,68 Q52,70 56,68 Q60,62 60,48 Q62,28 60,8 Z" class="limb" />
        <!-- Gastroc highlight -->
        <ellipse cx="56" cy="35" rx="4" ry="12" fill="${LE_HIGHLIGHT}20" stroke="${LE_HIGHLIGHT}" stroke-width="0.6" stroke-dasharray="1.5,1" />
        <circle cx="50" cy="68" r="4" class="joint" />
        <g class="foot-group">
            <path d="M44,68 Q40,72 30,76 Q26,78 26,82 Q30,86 50,86 Q56,84 58,78 Q58,72 56,68 Z" class="limb active" />
            <line x1="26" y1="82" x2="22" y2="80" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
            <line x1="28" y1="84" x2="24" y2="83" stroke="${SKIN_SHADOW}" stroke-width="1.5" stroke-linecap="round" />
        </g>
        <path d="M30,86 Q26,90 24,94" class="arrow" />
        <text x="62" y="32" class="muscle-label">gastroc</text>
    </svg>`;
}

function svgToeExt() {
    return `<svg viewBox="0 0 110 90" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .toes { animation: toeExt 1.5s infinite alternate ease-in-out; }
            .t1 { transform-origin: 24px 50px; }
            .t2 { transform-origin: 30px 48px; }
            .t3 { transform-origin: 36px 48px; }
            @keyframes toeExt { 0% { transform: rotate(8deg); } 100% { transform: rotate(-5deg); } }
        </style>
        <!-- Foot from above -->
        <path d="M30,30 Q20,40 18,55 Q18,65 25,72 Q40,78 60,72 Q68,65 68,55 Q66,40 58,30 Z" class="limb" />
        <!-- Toes -->
        <g class="toes">
            <g class="t1"><ellipse cx="20" cy="46" rx="5" ry="7" class="limb active" /><rect x="17" y="40" rx="1" ry="1" width="5" height="3" class="nail" /></g>
            <g class="t2"><ellipse cx="28" cy="42" rx="4" ry="7" class="limb active" /><rect x="25.5" y="36" rx="1" ry="1" width="5" height="3" class="nail" /></g>
            <g class="t3"><ellipse cx="36" cy="42" rx="4" ry="7" class="limb active" /><rect x="33.5" y="36" rx="1" ry="1" width="5" height="3" class="nail" /></g>
            <ellipse cx="44" cy="44" rx="4" ry="6" class="limb active" />
            <ellipse cx="52" cy="46" rx="3.5" ry="5.5" class="limb active" />
        </g>
        <text x="44" y="85" class="label">Toe Extension</text>
    </svg>`;
}

function svgFootEversion() {
    return `<svg viewBox="0 0 110 90" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            ${sharedStyle(LE_HIGHLIGHT, LE_GLOW)}
            .foot-group { transform-origin: 55px 35px; animation: footEvert 1.5s infinite alternate ease-in-out; }
            @keyframes footEvert { 0% { transform: rotate(0deg); } 100% { transform: rotate(12deg); } }
        </style>
        ${arrowMarker(LE_HIGHLIGHT)}
        <!-- Shin (anterior view) -->
        <path d="M44,4 Q42,16 44,30 Q48,36 55,36 Q62,36 64,30 Q66,16 64,4 Z" class="limb" />
        <circle cx="54" cy="35" r="4" class="joint" />
        <g class="foot-group">
            <path d="M40,36 Q32,42 28,50 Q26,56 30,60 Q44,64 62,60 Q66,56 64,50 Q62,42 60,36 Z" class="limb active" />
        </g>
        <path d="M30,55 Q24,58 20,62" class="arrow" />
        <text x="55" y="80" class="label">Foot Eversion</text>
        <text x="38" y="52" class="muscle-label">peroneals</text>
    </svg>`;
}

/* ════════════════════════════════════════
   IDLE / DEFAULT
   ════════════════════════════════════════ */

function svgIdle() {
    return `<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            .idle-text { font-family: system-ui, sans-serif; font-size: 6px; fill: #94a3b8; text-anchor: middle; }
            .idle-icon { fill: none; stroke: #cbd5e1; stroke-width: 1.2; stroke-linecap: round; }
            .idle-pulse { animation: idlePulse 2s infinite alternate ease-in-out; }
            @keyframes idlePulse { 0% { opacity: 0.4; } 100% { opacity: 1; } }
        </style>
        <g class="idle-pulse">
            <!-- Simple hand icon -->
            <path d="M42,30 Q40,40 42,55 Q48,60 52,60 Q58,55 60,40 Q58,30 50,28 Z" class="idle-icon" />
            <line x1="44" y1="55" x2="42" y2="65" class="idle-icon" />
            <line x1="48" y1="55" x2="47" y2="67" class="idle-icon" />
            <line x1="52" y1="55" x2="53" y2="67" class="idle-icon" />
            <line x1="56" y1="55" x2="58" y2="65" class="idle-icon" />
        </g>
        <text x="50" y="82" class="idle-text">Hover a muscle test</text>
        <text x="50" y="90" class="idle-text">to see demonstration</text>
    </svg>`;
}

function svgDefault(label) {
    // Generic pulsing highlight for unmatched movements
    return `<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;" xmlns="http://www.w3.org/2000/svg">
        <style>
            .def-text { font-family: system-ui, sans-serif; font-size: 5.5px; fill: #64748b; text-anchor: middle; }
            .def-circle { fill: none; stroke: #0d9488; stroke-width: 1; animation: defPulse 1.5s infinite alternate ease-in-out; }
            @keyframes defPulse { 0% { r: 20; opacity: 0.3; } 100% { r: 28; opacity: 0.8; } }
        </style>
        <circle cx="50" cy="42" r="24" class="def-circle" />
        <circle cx="50" cy="42" r="16" fill="#0d948815" stroke="#0d9488" stroke-width="0.5" />
        <text x="50" y="45" class="def-text" style="fill:#0d9488; font-weight:600;">${label || 'Movement'}</text>
        <text x="50" y="80" class="def-text">Manual muscle test</text>
    </svg>`;
}

/* ════════════════════════════════════════
   ROUTER
   ════════════════════════════════════════ */

export function getMuscleTestSVG(actionText) {
    const act = (actionText || '').toLowerCase().trim();

    if (!act || act === 'idle') return svgIdle();

    // Upper extremity
    if (act.includes('shoulder abd') || act.includes('scapul')) return svgShoulderAbd();
    if (act.includes('elbow flex') || act.includes('forearm flex')) return svgElbowFlex();
    if (act.includes('elbow ext')) return svgElbowExt();
    if (act.includes('wrist flex')) return svgWristFlex();
    if (act.includes('wrist ext')) return svgWristExt();
    if (act.includes('grip')) return svgGrip();
    if (act.includes('finger abd') || act.includes('finger abduction')) return svgFingerAbd();
    if (act.includes('finger ext') || act.includes('finger flex')) return svgFingerExt();
    if (act.includes('thumb') || act.includes('apb')) return svgThumbAbd();

    // Lower extremity
    if (act.includes('hip flex')) return svgHipFlex();
    if (act.includes('hip abd')) return svgHipAbd();
    if (act.includes('hip ext') || act.includes('hip add')) return svgHipExt();
    if (act.includes('knee ext') || act.includes('knee flex')) return svgKneeExt();
    if (act.includes('dorsiflex') || act.includes('foot inver')) return svgAnkleDorsi();
    if (act.includes('plantar') || act.includes('plantarflex')) return svgAnklePlantar();
    if (act.includes('toe ext') || act.includes('toe flex') || act.includes('intrinsic foot')) return svgToeExt();
    if (act.includes('foot ever')) return svgFootEversion();

    // Fallback with label
    return svgDefault(actionText);
}
