/**
 * DesignTokens.js
 * Centralized design tokens for the LEARNEMG application.
 */

export const DesignTokens = {
    colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
        success: '#059669',
        danger: '#dc2626',
        warning: '#ea580c',
        info: '#0891b2',
        dark: '#1e293b',
        light: '#f8fafc',
        border: '#e2e8f0',
        text: {
            main: '#334155',
            muted: '#64748b',
            heading: '#1e293b'
        }
    },

    gradients: {
        foundations: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        anatomy: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        technical: 'linear-gradient(135deg, #ea580c, #c2410c)',
        equipment: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        localization: 'linear-gradient(135deg, #059669, #047857)',
        terminology: 'linear-gradient(135deg, #d946ef, #be185d)',
        encounter: 'linear-gradient(135deg, #0891b2, #0e7490)',
        safety: 'linear-gradient(135deg, #b91c1c, #991b1b)',
        cardinal: 'linear-gradient(135deg, #475569, #334155)',
        header: 'linear-gradient(135deg, #1e293b, #0f172a)'
    },

    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },

    animations: `
        @keyframes fadeInSlideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `
};
