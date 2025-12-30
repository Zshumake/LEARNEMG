/**
 * Debug.js
 * 
 * Diagnostic tools for development and troubleshooting.
 * Extracted from emg-app-main.js
 */

// DIAGNOSTIC FUNCTION - Hunt down sneaky elements
export function runDiagnosticTest() {
    console.log('🕵️ DIAGNOSTIC TEST: Hunting for header/sidebar elements');

    // Find ALL elements containing these texts
    const allElements = document.querySelectorAll('*');
    const suspiciousElements = [];

    allElements.forEach(element => {
        const text = element.textContent || '';
        if (text.includes('Nerve/MuscleTool') ||
            text.includes('Training Level') ||
            text.includes('Learning Approach') ||
            text.includes('PGY-2') ||
            text.includes('Levels 1-2')) {

            const isVisible = window.getComputedStyle(element).display !== 'none' &&
                window.getComputedStyle(element).visibility !== 'hidden' &&
                element.offsetHeight > 0;

            if (isVisible) {
                suspiciousElements.push({
                    element: element,
                    tagName: element.tagName,
                    className: element.className,
                    id: element.id,
                    display: window.getComputedStyle(element).display,
                    position: window.getComputedStyle(element).position,
                    top: element.offsetTop,
                    left: element.offsetLeft,
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    text: text.substring(0, 100) + '...'
                });
            }
        }
    });

    console.log(`Found ${suspiciousElements.length} visible suspicious elements:`);
    suspiciousElements.forEach((item, index) => {
        console.log(`${index + 1}. ${item.tagName}${item.id ? '#' + item.id : ''}${item.className ? '.' + item.className.split(' ')[0] : ''}`);
        console.log(`   Display: ${item.display}, Position: ${item.position}`);
        console.log(`   Location: (${item.left}, ${item.top}) Size: ${item.width}x${item.height}`);
        console.log(`   Text: ${item.text}`);
        console.log('   Element:', item.element);
        console.log('---');
    });

    // Test our main interface container
    const mainInterface = document.getElementById('main-interface-container');
    console.log('🎯 Main Interface Container Status:');
    console.log('   Exists:', !!mainInterface);
    if (mainInterface) {
        console.log('   Display:', window.getComputedStyle(mainInterface).display);
        console.log('   Visibility:', window.getComputedStyle(mainInterface).visibility);
        console.log('   Height:', mainInterface.offsetHeight);
        console.log('   Element:', mainInterface);
    }

    return suspiciousElements;
}

// Nuclear option - hide EVERYTHING that contains these texts
export function nuclearHideAll() {
    console.log('💥 NUCLEAR OPTION: Hiding ALL elements with suspicious text');

    const allElements = document.querySelectorAll('*');
    let hiddenCount = 0;

    allElements.forEach(element => {
        const text = element.textContent || '';
        if (text.includes('Nerve/MuscleTool') ||
            text.includes('Training Level') ||
            text.includes('Learning Approach') ||
            text.includes('PGY-2') ||
            text.includes('Levels 1-2')) {

            element.style.display = 'none !important';
            element.style.visibility = 'hidden !important';
            element.style.opacity = '0 !important';
            element.style.height = '0 !important';
            element.style.overflow = 'hidden !important';
            hiddenCount++;
        }
    });

    console.log(`💥 Nuclear option applied to ${hiddenCount} elements`);
}

// Initialize and Expose to Window
export function initializeDebugTools() {
    window.runDiagnosticTest = runDiagnosticTest;
    window.nuclearHideAll = nuclearHideAll;
    console.log('🕵️ Debug Tools Initialized (runDiagnosticTest, nuclearHideAll)');
}
