export const ERNEST_STYLES = `
            /* Ernest JRPG UI Styles */
            .jrpg-ernest-wrapper {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(150%); /* Hidden by default */
                width: 90%;
                max-width: 800px;
                z-index: 2147483647; /* God-mode Layer */
                display: flex;
                align-items: flex-end;
                gap: 15px;
                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: none;
                visibility: hidden;
            }

            .jrpg-ernest-wrapper.active {
                transform: translateX(-50%) translateY(0);
                pointer-events: all;
                visibility: visible;
            }

            .jrpg-ernest-avatar-container {
                position: relative;
                width: 280px;
                height: 350px; /* Make it as tall as the chat box so he can stand full body */
                flex-shrink: 0;
            }

            .jrpg-ernest-full-svg {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: contain;
                /* Anchor him to the bottom so his body shows */
                object-position: bottom left; 
                filter: drop-shadow(0 4px 15px rgba(0,0,0,0.2));
            }

            .jrpg-ernest-dialogue-box {
                background: rgba(255, 255, 255, 0.98);
                border: 3px solid #6b9f78;
                border-radius: 15px;
                padding: 15px;
                flex-grow: 1;
                height: 350px; /* Fixed height for chat */
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                font-family: 'Segoe UI', sans-serif;
                position: relative;
                backdrop-filter: blur(10px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .jrpg-ernest-name-tag {
                position: absolute;
                top: -15px;
                left: 20px;
                background: #6b9f78;
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 0.9em;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            .jrpg-ernest-chat-history {
                flex-grow: 1;
                overflow-y: auto;
                margin-top: 10px;
                margin-bottom: 10px;
                padding-right: 5px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .jrpg-ernest-chat-message {
                padding: 8px 12px;
                border-radius: 10px;
                font-size: 1em;
                line-height: 1.4;
                max-width: 90%;
            }

            .jrpg-ernest-message-user {
                align-self: flex-end;
                background: #e2e8f0;
                color: #334155;
            }

            .jrpg-ernest-message-ernest {
                align-self: flex-start;
                background: #f0fdf4;
                color: #2c3e50;
                border: 1px solid #dcfce7;
            }
            .jrpg-ernest-message-earl {
                 align-self: flex-start;
                 background: #fef2f2;
                 color: #2c3e50;
                 border: 1px solid #fee2e2;
            }

            /* Table Styles */
            .jrpg-table-wrapper {
                overflow-x: auto;
                margin: 10px 0;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }

            .jrpg-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 0.9em;
                background: white;
            }

            .jrpg-table th {
                background: #6b9f78;
                color: white;
                padding: 8px 12px;
                text-align: left;
                font-weight: 600;
            }

            .jrpg-table td {
                padding: 8px 12px;
                border-bottom: 1px solid #f1f5f9;
                color: #334155;
            }

            .jrpg-table tr:last-child td {
                border-bottom: none;
            }

            .jrpg-table tr:nth-child(even) {
                background-color: #f8fafc;
            }

            .jrpg-ernest-input-area {
                display: flex;
                gap: 10px;
                border-top: 1px solid #e2e8f0;
                padding-top: 10px;
            }

            .jrpg-ernest-input {
                flex-grow: 1;
                padding: 10px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1em;
                outline: none;
                transition: border-color 0.2s;
            }
            .jrpg-ernest-input:focus {
                border-color: #6b9f78;
            }

            .jrpg-ernest-btn {
                background: #e2e8f0;
                border: none;
                padding: 8px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.2s;
                color: #475569;
                font-weight: 600;
                white-space: nowrap;
            }

            .jrpg-ernest-btn:hover {
                background: #cbd5e1;
                transform: translateY(-2px);
            }

            .jrpg-ernest-btn.primary {
                background: #6b9f78;
                color: white;
            }

            .jrpg-ernest-btn.primary:hover {
                background: #5a8a67;
            }

            /* Tooltip for Text Selection */
            .jrpg-ernest-tooltip {
                position: absolute;
                background: #2c3e50;
                color: white;
                padding: 8px 14px 8px 10px;
                border-radius: 25px;
                font-size: 14px;
                cursor: pointer;
                z-index: 2147483647;
                display: none; /* Initially hidden */
                animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                border: 2px solid white;
                align-items: center;
                gap: 8px;
            }

            /* Prevent tooltip from showing on start page */
            body.on-start-page .jrpg-ernest-tooltip {
                display: none !important;
            }
            /* Tooltip Arrow (Points UP) */
            .jrpg-ernest-tooltip::after {
                 content: '';
                 position: absolute;
                 bottom: 100%; /* Top of tooltip */
                 left: 50%;
                 margin-left: -6px;
                 border-width: 6px;
                 border-style: solid;
                 border-color: transparent transparent #2c3e50 transparent;
            }
            .jrpg-ernest-tooltip img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
            /* Loading Dots */
            .jrpg-typing-dots {
                display: inline-block;
                width: 20px;
                text-align: left;
            }
            .jrpg-typing-dots::after {
                content: '...';
                animation: dots 1.5s steps(4, end) infinite;
            }
            @keyframes dots {
                0%, 20% { content: ''; }
                40% { content: '.'; }
                60% { content: '..'; }
                80%, 100% { content: '...'; }
            }

            /* Floating "Start Page" Avatar */
            .jrpg-floating-avatar {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 80px;
                height: 80px;
                min-width: 80px;
                min-height: 80px;
                flex-shrink: 0;
                border-radius: 50%;
                border: 2px solid #2a2d34;
                background: #6b9f78;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                z-index: 2147483646; /* Just below wrapper */
                cursor: pointer;
                transition: transform 0.2s, opacity 0.5s, visibility 0.5s;
                display: flex; /* Flex to center image */
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            /* Hidden state for start page */
            body.on-start-page .jrpg-floating-avatar {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }

            .jrpg-floating-avatar:hover {
                transform: scale(1.1);
            }

            .jrpg-floating-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }

            /* Custom API Key Modal */
            .jrpg-ernest-modal-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(5px);
                z-index: 2147483648; /* Topmost */
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s;
            }
            .jrpg-ernest-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .jrpg-ernest-modal {
                background: white;
                border-radius: 15px;
                padding: 30px;
                width: 90%;
                max-width: 450px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border: 3px solid #6b9f78;
                transform: translateY(20px);
                transition: transform 0.3s;
            }
            .jrpg-ernest-modal-overlay.active .jrpg-ernest-modal {
                transform: translateY(0);
            }
            .jrpg-ernest-modal h3 {
                margin: 0 0 15px 0;
                color: #1e293b;
                font-family: 'Segoe UI', sans-serif;
            }
            .jrpg-ernest-modal p {
                margin: 0 0 20px 0;
                color: #64748b;
                font-size: 0.95em;
                line-height: 1.5;
            }
            .jrpg-ernest-modal input {
                width: 100%;
                padding: 12px;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1em;
                margin-bottom: 20px;
                box-sizing: border-box;
                font-family: monospace;
            }
            .jrpg-ernest-modal input:focus {
                border-color: #6b9f78;
                outline: none;
            }
            .jrpg-ernest-modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
`;
