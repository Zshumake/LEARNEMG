/**
 * ActionBus — centralized event delegation for data-action attributes.
 *
 * The core bus is initialized inline in Initialization.js (to avoid ES module
 * cache issues). This module re-exports the window._ functions for clean
 * ES module imports in content modules.
 *
 * Usage (ES module):
 *   import { registerAction } from '../utils/ActionBus.js';
 *   registerAction('myAction', (el, event) => { ... el.dataset.someParam ... });
 *
 * Usage (classic script):
 *   window._registerAction('myAction', (el, event) => { ... });
 *
 * HTML:
 *   <button data-action="myAction" data-some-param="value">Click</button>
 */

export function registerAction(name, handler) {
    if (window._registerAction) {
        window._registerAction(name, handler);
    } else {
        // Fallback: queue until Initialization.js sets up the bus
        const poll = setInterval(() => {
            if (window._registerAction) {
                window._registerAction(name, handler);
                clearInterval(poll);
            }
        }, 50);
    }
}

export function unregisterAction(name) {
    if (window._unregisterAction) {
        window._unregisterAction(name);
    }
}
