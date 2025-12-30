/**
 * Diagnostics.js
 * Admin and Debug tools for the EMG Application
 */

export class Diagnostics {
    constructor() {
        this.bindGlobals();
    }

    bindGlobals() {
        window.runDiagnosticTest = this.runDiagnosticTest.bind(this);
        window.nuclearHideAll = this.nuclearHideAll.bind(this);
    }

    runDiagnosticTest() {
        console.log('🕵️ DIAGNOSTIC TEST: Hunting for header/sidebar elements');
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
                        text: text.substring(0, 100) + '...'
                    });
                }
            }
        });

        console.log(`Found ${suspiciousElements.length} visible suspicious elements:`, suspiciousElements);
        return suspiciousElements;
    }

    nuclearHideAll() {
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
                hiddenCount++;
            }
        });
        console.log(`💥 Nuclear option applied to ${hiddenCount} elements`);
    }
}
