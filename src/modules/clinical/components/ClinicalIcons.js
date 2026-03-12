export const ClinicalIcons = {
    getSvgIcon(name, color = "currentColor", size = "24") {
        const base = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="inline-svg" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`;
        const icons = {
            folder: `${base}<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
            beginner: `${base}<path d="M12 22V12"></path><path d="M12 12C12 12 7 7 4 9C1 11 5 17 12 17"></path><path d="M12 12C12 12 17 7 20 9C23 11 19 17 12 17"></path><path d="M12 2A4 4 0 0 0 8 6C8 9 12 12 12 12C12 12 16 9 16 6A4 4 0 0 0 12 2Z"></path></svg>`,
            intermediate: `${base}<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
            expert: `${base}<path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M11 3 8 9l4 13"></path><path d="M13 3l3 6-4 13"></path><path d="M2 9h20"></path></svg>`,
            stethoscope: `${base}<path d="M4 14a8 8 0 0 0 16 0V6a2 2 0 1 0-4 0v8a4 4 0 0 1-8 0V6a2 2 0 1 0-4 0v8z"></path><path d="M14 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4"></path></svg>`,
            hand: `${base}<path d="M18 11V6a2 2 0 0 0-4 0v5"></path><path d="M14 10V4a2 2 0 0 0-4 0v6"></path><path d="M10 10.5V3a2 2 0 0 0-4 0v9"></path><path d="M6 12v-1a2 2 0 0 0-4 0v8a8 8 0 0 0 16 0V11a2 2 0 0 0-4 0v2"></path></svg>`,
            brain: `${base}<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>`,
            lightning: `${base}<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
            check: `${base}<polyline points="20 6 9 17 4 12"></polyline></svg>`,
            x: `${base}<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            chart: `${base}<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
            star: `${base}<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
            trophy: `${base}<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
            microscope: `${base}<path d="M6 18h8"></path><path d="M3 22h18"></path><path d="M14 22a7 7 0 1 0 0-14h-1"></path><path d="M9 14h2"></path><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path></svg>`,
            neck: `${base}<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>`,
            plug: `${base}<path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path></svg>`,
            scale: `${base}<path d="M3 6h18"></path><path d="M12 6v16"></path><path d="m5 6-3 7c0 1.66 2.69 3 6 3s6-1.34 6-3l-3-7"></path><path d="m19 6-3 7c0 1.66 2.69 3 6 3s6-1.34 6-3l-3-7"></path></svg>`,
            target: `${base}<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
            wrench: `${base}<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
            cap: `${base}<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`
        };
        return icons[name] || icons.check;
    }
};
