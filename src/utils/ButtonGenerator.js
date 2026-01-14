
export function generateErnestButton(moduleId, title) {
    return `
        <div class="ernest-module-header">
            <div class="ernest-btn-content">
                <div class="ernest-avatar">
                   <img src="images/ui/ERNEST.png" alt="Ernest" />
                </div>
                <div class="module-info">
                    <span class="module-id">Module: ${moduleId}</span>
                    <h2 class="module-title">${title}</h2>
                </div>
            </div>
            <button class="ernest-action-btn" onclick="if(window.showErnestDialogue) window.showErnestDialogue('${moduleId}')">
                Ask Ernest
            </button>
        </div>
        <style>
            .ernest-module-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: white;
                padding: 15px 25px;
                border-radius: 16px;
                margin-bottom: 25px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                border: 1px solid #e2e8f0;
            }
            .ernest-btn-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .ernest-avatar img {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                border: 2px solid #8b5cf6;
                padding: 2px;
                background: #f3f4f6;
            }
            .module-info {
                display: flex;
                flex-direction: column;
            }
            .module-id {
                font-size: 0.75rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 600;
            }
            .module-title {
                font-size: 1.1rem;
                color: #1e293b;
                margin: 0;
                font-weight: 700;
            }
            .ernest-action-btn {
                background: #8b5cf6;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
                font-size: 0.9rem;
            }
            .ernest-action-btn:hover {
                background: #7c3aed;
            }
        </style>
    `;
}
