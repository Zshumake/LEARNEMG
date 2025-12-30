export class ErnestChat {
    constructor(ui, core) {
        this.ui = ui;
        this.core = core;
        this.conversationHistory = [];
        this.isTyping = false;
    }

    addToChat(role, displayText, saveText = null) {
        if (!this.ui.ui.chatHistory) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `jrpg-ernest-chat-message jrpg-ernest-message-${role}`;

        // Handle loading state
        if (displayText === '...') {
            const loadingText = this.getLoadingMessage();
            msgDiv.innerHTML = `<span class="thinking-dots">${loadingText}</span>`;
            msgDiv.id = 'ernest-loading-msg';

            // Re-randomize text every 2 seconds
            this.loadingInterval = setInterval(() => {
                const loader = document.getElementById('ernest-loading-msg');
                if (loader) {
                    loader.innerHTML = `<span class="thinking-dots">${this.getLoadingMessage()}</span>`;
                } else {
                    clearInterval(this.loadingInterval);
                }
            }, 2000);

        } else {
            if (this.loadingInterval) clearInterval(this.loadingInterval);

            // Advanced Markdown Parsing
            let safeText = this.parseMarkdown(displayText);

            // Apply Typewriter effect for Ernest, instant for others
            if (role === 'ernest' || role === 'earl') {
                this.typeMessage(msgDiv, safeText);
            } else {
                msgDiv.innerHTML = safeText;
            }
        }

        this.ui.ui.chatHistory.appendChild(msgDiv);
        this.ui.ui.chatHistory.scrollTop = this.ui.ui.chatHistory.scrollHeight;

        // Remember context
        if (displayText !== '...') {
            const contextContent = saveText || displayText;
            this.conversationHistory.push({ role: role === 'user' ? 'user' : 'model', parts: [{ text: contextContent }] });
            // Keep history manageable
            if (this.conversationHistory.length > 20) this.conversationHistory.shift();
        }
    }

    typeMessage(element, htmlContent) {
        this.stopTyping();

        // Tokenize by tags to preserve structure
        const tokens = htmlContent.split(/(<[^>]+>)/g).filter(t => t !== "");
        const steps = [];

        tokens.forEach(t => {
            if (t.startsWith('<')) {
                steps.push({ text: t, isTag: true });
            } else {
                const words = t.split(/(\s+)/g).filter(w => w !== "");
                words.forEach(w => steps.push({ text: w, isTag: false }));
            }
        });

        let qIndex = 0;
        let currentHTML = "";
        const speed = 20;

        const typeLoop = () => {
            if (qIndex >= steps.length) {
                this.typeTimer = null;
                return;
            }

            // Smart Scroll
            const container = this.ui.ui.chatHistory;
            let isAtBottom = false;
            if (container) {
                const distanceToBottom = container.scrollHeight - (container.scrollTop + container.clientHeight);
                isAtBottom = distanceToBottom < 30;
            }

            const step = steps[qIndex];
            currentHTML += step.text;
            element.innerHTML = currentHTML;

            if (container && isAtBottom) {
                container.scrollTop = container.scrollHeight;
            }

            qIndex++;
            this.typeTimer = setTimeout(typeLoop, speed);
        };

        typeLoop();
    }

    stopTyping() {
        if (this.typeTimer) {
            clearTimeout(this.typeTimer);
            this.typeTimer = null;
        }
    }

    getLoadingMessage() {
        const persona = this.core.currentPersonaId;
        if (persona === 'earl') {
            const msgs = [
                "Judging your query...",
                "Sighing dramatically...",
                "Checking if you read the manual (doubtful)...",
                "Retrieving 'Common Sense' module...",
                "Scanning for incompetence..."
            ];
            return msgs[Math.floor(Math.random() * msgs.length)];
        } else {
            const msgs = [
                "Analyzing waveforms...",
                "Consulting Preston & Shapiro...",
                "Checking references...",
                "Filtering 60Hz noise...",
                "Calculating conduction velocity...",
                "Decreasing impedance..."
            ];
            return msgs[Math.floor(Math.random() * msgs.length)];
        }
    }

    showLoadingMessage() {
        this.removeLoadingMessage();
        const msg = this.getLoadingMessage();
        const loader = document.createElement('div');
        loader.id = 'ernest-loading-msg';
        loader.className = 'ernest-loading';
        loader.innerHTML = `<em>${msg}</em>`;
        this.ui.ui.chatHistory.appendChild(loader);
        this.ui.ui.chatHistory.scrollTop = this.ui.ui.chatHistory.scrollHeight;
    }

    removeLoadingMessage() {
        const loader = document.getElementById('ernest-loading-msg');
        if (loader) loader.remove();
    }

    clearHistory() {
        this.conversationHistory = [];
        this.ui.ui.chatHistory.innerHTML = '';
    }

    parseMarkdown(text) {
        if (!text) return '';

        let html = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Math & Physics Symbol Parsing
        html = html.replace(/\\mu/g, 'μ')
            .replace(/\\alpha/g, 'α')
            .replace(/\\beta/g, 'β')
            .replace(/\\Delta/g, 'Δ')
            .replace(/\\theta/g, 'θ');

        html = html.replace(/_([a-zA-Z0-9]+)/g, '<sub>$1</sub>');
        html = html.replace(/\^([\+0-9]+)/g, '<sup>$1</sup>');
        html = html.replace(/\^\{([^\}]+)\}/g, '<sup>$1</sup>');
        html = html.replace(/_\{([^\}]+)\}/g, '<sub>$1</sub>');

        html = html.replace(/\\text\{([^\}]+)\}/g, '$1');
        html = html.replace(/\\frac\{([^\}]+)\}\{([^\}]+)\}/g, '($1 / $2)');

        html = html.replace(/\\approx/g, '≈')
            .replace(/\\rightarrow/g, '→')
            .replace(/\\leftarrow/g, '←')
            .replace(/\\times/g, '×')
            .replace(/\\cdot/g, '·')
            .replace(/\\le/g, '≤')
            .replace(/\\ge/g, '≥');

        html = html.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')');
        html = html.replace(/\\left\[/g, '[').replace(/\\right\]/g, ']');
        html = html.replace(/\$/g, '');

        // Table Parsing
        const lines = html.split('\n');
        let inTable = false;
        let tableHtml = '';
        let resultLines = [];

        const isSeparator = (str) => str.trim().match(/^\|?([\s-:]+\|)+[\s-:]+\|?$/);
        const isTableRow = (str) => str.trim().includes('|');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const nextLine = lines[i + 1] ? lines[i + 1].trim() : '';

            if (!inTable && isTableRow(line) && isSeparator(nextLine)) {
                inTable = true;
                tableHtml = '<div class="jrpg-table-wrapper"><table class="jrpg-table">';

                let cleanLine = line;
                if (cleanLine.startsWith('|')) cleanLine = cleanLine.substring(1);
                if (cleanLine.endsWith('|')) cleanLine = cleanLine.substring(0, cleanLine.length - 1);

                const headers = cleanLine.split('|').map(h => h.trim());
                tableHtml += '<thead><tr>';
                headers.forEach(h => tableHtml += `<th>${h}</th>`);
                tableHtml += '</tr></thead><tbody>';
                i++; // Skip separator
            } else if (inTable) {
                if (isTableRow(line) && !isSeparator(line)) {
                    let cleanLine = line;
                    if (cleanLine.startsWith('|')) cleanLine = cleanLine.substring(1);
                    if (cleanLine.endsWith('|')) cleanLine = cleanLine.substring(0, cleanLine.length - 1);

                    const cells = cleanLine.split('|').map(c => c.trim());
                    tableHtml += '<tr>';
                    cells.forEach(c => tableHtml += `<td>${c}</td>`);
                    tableHtml += '</tr>';
                } else {
                    inTable = false;
                    tableHtml += '</tbody></table></div>';
                    resultLines.push(tableHtml);
                    tableHtml = '';
                    resultLines.push(line);
                }
            } else {
                resultLines.push(line);
            }
        }

        if (inTable) {
            tableHtml += '</tbody></table></div>';
            resultLines.push(tableHtml);
        }

        html = resultLines.join('\n');

        // Markdown Formatting
        html = html
            .replace(/### (.*?)(?:\n|$)/g, '<h3>$1</h3>')
            .replace(/## (.*?)(?:\n|$)/g, '<h4>$1</h4>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');

        html = html.replace(/^\s*[\*•-]\s+(.*)$/gm, '• $1');
        html = html.replace(/<\/h[34]>\n/g, '</h$1>');
        html = html.replace(/\n/g, '<br>');

        return html;
    }
}
