
/**
 * Theme Manager for the Learning Journey
 * Handles terrain generation and theme resolution.
 */
export class ThemeManager {
    constructor() {
        this.themes = [
            { theme: 'forest', decoration: '🌲' },
            { theme: 'mountain', decoration: '⛰️' },
            { theme: 'desert', decoration: '🌵' },
            { theme: 'ocean', decoration: '🌊' },
            { theme: 'space', decoration: '🚀' } // Bonus
        ];
    }

    /**
     * Determines the terrain theme based on the module index.
     * @param {number} index - The module index.
     * @param {number} total - Total number of modules.
     * @returns {Object} { theme, decoration }
     */
    getTerrainTheme(index, total) {
        // Simple cyclical theme assignment
        // Map 0 -> forest, 1 -> mountain, etc.
        const themeIndex = index % 4; // Use first 4 core themes

        // Special case for final module?
        if (index === total - 1) {
            return { theme: 'victory', decoration: '🏆' };
        }

        return this.themes[themeIndex] || this.themes[0];
    }
}

export const themeManager = new ThemeManager();
