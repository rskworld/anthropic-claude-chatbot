/*
    Anthropic Claude Chatbot - Advanced Features
    Project: Anthropic Claude Chatbot
    Category: OpenAI Integration
    Year: 2026
    
    Developer Details:
    - Website: https://rskworld.in
    - Email: help@rskworld.in, support@rskworld.in
    - Phone: +91 93305 39277
    - Organization: RSK World
    - Founder: Molla Samser
    - Designer & Tester: Rima Khatun
*/

// Advanced Features Module
class AdvancedFeatures {
    constructor() {
        this.currentSessionId = 'session-1';
        this.sessions = new Map();
        this.apiUsage = { inputTokens: 0, outputTokens: 0 };
        this.voiceRecognition = null;
        this.speechSynthesis = window.speechSynthesis;
        this.selectedFile = null;
        this.isVoiceRecording = false;
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        this.init();
    }

    init() {
        this.setupVoiceRecognition();
        this.setupEventListeners();
        this.loadSessions();
        this.initTemplates();
        this.applyDarkMode();
    }

    // Voice Recognition Setup
    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.voiceRecognition = new SpeechRecognition();
            this.voiceRecognition.continuous = false;
            this.voiceRecognition.interimResults = false;
            this.voiceRecognition.lang = document.getElementById('voiceLanguage')?.value || 'en-US';

            this.voiceRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('messageInput').value = transcript;
                document.getElementById('messageInput').dispatchEvent(new Event('input'));
                this.showToast('Voice input captured!', 'success');
            };

            this.voiceRecognition.onerror = (event) => {
                this.showToast('Voice recognition error: ' + event.error, 'error');
                this.isVoiceRecording = false;
                this.updateVoiceButton();
            };

            this.voiceRecognition.onend = () => {
                this.isVoiceRecording = false;
                this.updateVoiceButton();
            };
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Voice Input
        const voiceInputBtn = document.getElementById('voiceInputBtn');
        if (voiceInputBtn) {
            voiceInputBtn.addEventListener('click', () => this.toggleVoiceInput());
        }

        // Voice Output
        const voiceOutputBtn = document.getElementById('voiceOutputBtn');
        if (voiceOutputBtn) {
            voiceOutputBtn.addEventListener('click', () => this.readLastMessage());
        }

        // Dark Mode
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
        }

        // File Upload
        const attachBtn = document.getElementById('attachBtn');
        const fileInput = document.getElementById('fileInput');
        if (attachBtn && fileInput) {
            attachBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        // Export Chat
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportChatHistory());
        }

        // History (same as export for now)
        const historyBtn = document.getElementById('historyBtn');
        if (historyBtn) {
            historyBtn.addEventListener('click', () => this.showChatHistory());
        }

        // Sessions
        const sessionsBtn = document.getElementById('sessionsBtn');
        const sessionsSidebar = document.getElementById('sessionsSidebar');
        const closeSessionsSidebar = document.getElementById('closeSessionsSidebar');
        if (sessionsBtn) {
            sessionsBtn.addEventListener('click', () => sessionsSidebar?.classList.add('active'));
        }
        if (closeSessionsSidebar) {
            closeSessionsSidebar.addEventListener('click', () => sessionsSidebar?.classList.remove('active'));
        }

        // New Session
        const newSessionBtn = document.getElementById('newSessionBtn');
        if (newSessionBtn) {
            newSessionBtn.addEventListener('click', () => this.createNewSession());
        }

        // Templates
        const templateBtn = document.getElementById('templateBtn');
        const templatesModal = document.getElementById('templatesModal');
        const closeTemplatesModal = document.getElementById('closeTemplatesModal');
        if (templateBtn) {
            templateBtn.addEventListener('click', () => templatesModal?.classList.add('active'));
        }
        if (closeTemplatesModal) {
            closeTemplatesModal.addEventListener('click', () => templatesModal?.classList.remove('active'));
        }

        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchInChat(e.target.value));
        }

        // Export/Import Settings
        const exportSettingsBtn = document.getElementById('exportSettings');
        const importSettingsBtn = document.getElementById('importSettings');
        if (exportSettingsBtn) {
            exportSettingsBtn.addEventListener('click', () => this.exportSettings());
        }
        if (importSettingsBtn) {
            importSettingsBtn.addEventListener('click', () => this.importSettings());
        }

        // Close file preview modal
        const closeFileModal = document.getElementById('closeFileModal');
        if (closeFileModal) {
            closeFileModal.addEventListener('click', () => {
                const modal = document.getElementById('filePreviewModal');
                if (modal) modal.classList.remove('active');
            });
        }

        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    // Voice Input Toggle
    toggleVoiceInput() {
        if (!this.voiceRecognition) {
            this.showToast('Voice recognition not supported in your browser', 'error');
            return;
        }

        if (this.isVoiceRecording) {
            this.voiceRecognition.stop();
            this.isVoiceRecording = false;
        } else {
            this.voiceRecognition.start();
            this.isVoiceRecording = true;
        }
        this.updateVoiceButton();
    }

    updateVoiceButton() {
        const btn = document.getElementById('voiceInputBtn');
        if (btn) {
            if (this.isVoiceRecording) {
                btn.classList.add('recording');
                btn.innerHTML = '<i class="fas fa-stop"></i>';
            } else {
                btn.classList.remove('recording');
                btn.innerHTML = '<i class="fas fa-microphone"></i>';
            }
        }
    }

    // Voice Output
    readLastMessage() {
        const messages = document.querySelectorAll('.message.assistant');
        if (messages.length === 0) {
            this.showToast('No messages to read', 'info');
            return;
        }

        const lastMessage = messages[messages.length - 1];
        const text = lastMessage.querySelector('.message-content div').textContent;
        
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        const voiceLang = document.getElementById('voiceLanguage')?.value || 'en-US';
        utterance.lang = voiceLang;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        this.speechSynthesis.speak(utterance);
        this.showToast('Reading message...', 'info');
    }

    // Dark Mode Toggle
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        this.applyDarkMode();
    }

    applyDarkMode() {
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        const btn = document.getElementById('darkModeBtn');
        if (btn) {
            btn.innerHTML = this.isDarkMode 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    }

    // File Upload Handler
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.selectedFile = file;
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        
        if (file.size > 10 * 1024 * 1024) {
            this.showToast('File size must be less than 10MB', 'error');
            return;
        }

        // Preview file
        this.previewFile(file);
        this.showToast(`File "${file.name}" (${fileSize}MB) selected`, 'success');

        // If image, add to message input
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const messageInput = document.getElementById('messageInput');
                messageInput.value = `[Image: ${file.name}]\n\n` + messageInput.value;
            };
            reader.readAsDataURL(file);
        }
    }

    previewFile(file) {
        const modal = document.getElementById('filePreviewModal');
        const content = document.getElementById('filePreviewContent');
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                content.innerHTML = `<img src="${e.target.result}" alt="${file.name}" style="max-width: 100%;">`;
                modal.classList.add('active');
            };
            reader.readAsDataURL(file);
        } else {
            content.innerHTML = `<p><strong>File:</strong> ${file.name}</p><p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p><p><strong>Type:</strong> ${file.type}</p>`;
            modal.classList.add('active');
        }
    }

    // Export Chat History
    exportChatHistory() {
        const messages = document.querySelectorAll('.message');
        if (messages.length === 0) {
            this.showToast('No chat history to export', 'info');
            return;
        }

        const format = prompt('Export format: (1) TXT (2) PDF', '1');
        
        if (format === '1') {
            this.exportAsTXT(messages);
        } else if (format === '2') {
            this.exportAsPDF(messages);
        }
    }

    exportAsTXT(messages) {
        let content = 'Anthropic Claude Chatbot - Chat History\n';
        content += 'Generated: ' + new Date().toLocaleString() + '\n';
        content += '='.repeat(50) + '\n\n';

        messages.forEach(msg => {
            const role = msg.classList.contains('user') ? 'User' : 'Claude';
            const text = msg.querySelector('.message-content div').textContent;
            const time = msg.querySelector('.message-time')?.textContent || '';
            
            content += `[${time}] ${role}:\n${text}\n\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `claude-chat-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Chat exported as TXT!', 'success');
    }

    exportAsPDF(messages) {
        if (typeof window.jspdf === 'undefined') {
            this.showToast('PDF export library not loaded', 'error');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;

        doc.setFontSize(16);
        doc.text('Anthropic Claude Chatbot - Chat History', 20, y);
        y += 10;
        doc.setFontSize(10);
        doc.text('Generated: ' + new Date().toLocaleString(), 20, y);
        y += 10;

        messages.forEach(msg => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }

            const role = msg.classList.contains('user') ? 'User' : 'Claude';
            const text = msg.querySelector('.message-content div').textContent;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.text(role + ':', 20, y);
            y += 5;
            doc.setFont(undefined, 'normal');
            
            const lines = doc.splitTextToSize(text, 170);
            doc.text(lines, 20, y);
            y += lines.length * 5 + 5;
        });

        doc.save(`claude-chat-${Date.now()}.pdf`);
        this.showToast('Chat exported as PDF!', 'success');
    }

    // Sessions Management
    createNewSession() {
        const sessionId = 'session-' + Date.now();
        const session = {
            id: sessionId,
            name: 'Chat ' + (this.sessions.size + 1),
            createdAt: new Date().toISOString(),
            messages: []
        };
        
        this.sessions.set(sessionId, session);
        this.currentSessionId = sessionId;
        this.saveSessions();
        this.renderSessions();
        
        // Clear chat messages
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon"><i class="fas fa-comments"></i></div>
                <h2>New Chat Session</h2>
                <p>Start a new conversation!</p>
            </div>
        `;
        
        this.showToast('New session created!', 'success');
        if (window.conversationHistory) {
            window.conversationHistory = [];
        }
    }

    loadSessions() {
        const saved = localStorage.getItem('chatSessions');
        if (saved) {
            const sessions = JSON.parse(saved);
            sessions.forEach(s => {
                this.sessions.set(s.id, s);
            });
        } else {
            // Create default session
            const defaultSession = {
                id: this.currentSessionId,
                name: 'Chat 1',
                createdAt: new Date().toISOString(),
                messages: []
            };
            this.sessions.set(this.currentSessionId, defaultSession);
        }
        this.renderSessions();
    }

    saveSessions() {
        const sessionsArray = Array.from(this.sessions.values());
        localStorage.setItem('chatSessions', JSON.stringify(sessionsArray));
    }

    renderSessions() {
        const sessionsList = document.getElementById('sessionsList');
        if (!sessionsList) return;

        sessionsList.innerHTML = '';
        const sessionCount = document.getElementById('sessionCount');
        if (sessionCount) {
            sessionCount.textContent = this.sessions.size;
        }

        this.sessions.forEach((session, id) => {
            const sessionItem = document.createElement('div');
            sessionItem.className = 'session-item' + (id === this.currentSessionId ? ' active' : '');
            sessionItem.innerHTML = `
                <div class="session-info">
                    <i class="fas fa-comment"></i>
                    <span>${session.name}</span>
                </div>
                <button class="session-delete" data-id="${id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            sessionItem.addEventListener('click', (e) => {
                if (!e.target.closest('.session-delete')) {
                    this.switchSession(id);
                }
            });

            const deleteBtn = sessionItem.querySelector('.session-delete');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteSession(id);
            });

            sessionsList.appendChild(sessionItem);
        });
    }

    switchSession(sessionId) {
        this.currentSessionId = sessionId;
        this.renderSessions();
        this.showToast('Switched session', 'info');
    }

    deleteSession(sessionId) {
        if (this.sessions.size === 1) {
            this.showToast('Cannot delete the last session', 'error');
            return;
        }

        if (confirm('Delete this session?')) {
            this.sessions.delete(sessionId);
            if (this.currentSessionId === sessionId) {
                const firstSession = this.sessions.keys().next().value;
                this.currentSessionId = firstSession;
            }
            this.saveSessions();
            this.renderSessions();
            this.showToast('Session deleted', 'success');
        }
    }

    // Templates
    initTemplates() {
        const templates = [
            { name: 'Code Review', prompt: 'Please review this code and provide suggestions for improvement:' },
            { name: 'Explain Concept', prompt: 'Can you explain this concept in simple terms:' },
            { name: 'Debug Help', prompt: 'I\'m having trouble with this code, can you help debug it:' },
            { name: 'Write Code', prompt: 'Please write code for:' },
            { name: 'Summarize', prompt: 'Please summarize the following:' },
            { name: 'Translate', prompt: 'Please translate the following to English:' },
            { name: 'Creative Writing', prompt: 'Help me write a creative piece about:' },
            { name: 'Learn', prompt: 'Teach me about:' }
        ];

        const templatesGrid = document.getElementById('templatesGrid');
        if (templatesGrid) {
            templatesGrid.innerHTML = templates.map(t => `
                <div class="template-card" data-prompt="${t.prompt}">
                    <i class="fas fa-lightbulb"></i>
                    <h4>${t.name}</h4>
                </div>
            `).join('');

            templatesGrid.querySelectorAll('.template-card').forEach(card => {
                card.addEventListener('click', () => {
                    const prompt = card.dataset.prompt;
                    document.getElementById('messageInput').value = prompt;
                    document.getElementById('templatesModal').classList.remove('active');
                    document.getElementById('messageInput').focus();
                });
            });
        }
    }

    // Search in Chat
    searchInChat(query) {
        if (!query) {
            document.querySelectorAll('.message').forEach(msg => {
                msg.classList.remove('search-highlight');
            });
            return;
        }

        const messages = document.querySelectorAll('.message');
        let found = false;

        messages.forEach(msg => {
            const text = msg.querySelector('.message-content div').textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                msg.classList.add('search-highlight');
                found = true;
            } else {
                msg.classList.remove('search-highlight');
            }
        });

        if (found && messages.length > 0) {
            const firstHighlighted = document.querySelector('.search-highlight');
            if (firstHighlighted) {
                firstHighlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // Export/Import Settings
    exportSettings() {
        const settings = {
            model: document.getElementById('modelSelect')?.value,
            maxTokens: document.getElementById('maxTokens')?.value,
            temperature: document.getElementById('temperature')?.value,
            streamResponse: document.getElementById('streamResponse')?.checked,
            autoVoiceOutput: document.getElementById('autoVoiceOutput')?.checked,
            voiceLanguage: document.getElementById('voiceLanguage')?.value
        };

        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'claude-settings.json';
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Settings exported!', 'success');
    }

    importSettings() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const settings = JSON.parse(event.target.result);
                    
                    if (settings.model) document.getElementById('modelSelect').value = settings.model;
                    if (settings.maxTokens) document.getElementById('maxTokens').value = settings.maxTokens;
                    if (settings.temperature) {
                        document.getElementById('temperature').value = settings.temperature;
                        document.getElementById('temperatureValue').textContent = settings.temperature;
                    }
                    if (settings.streamResponse !== undefined) {
                        document.getElementById('streamResponse').checked = settings.streamResponse;
                    }
                    if (settings.autoVoiceOutput !== undefined) {
                        document.getElementById('autoVoiceOutput').checked = settings.autoVoiceOutput;
                    }
                    if (settings.voiceLanguage) {
                        document.getElementById('voiceLanguage').value = settings.voiceLanguage;
                    }

                    if (typeof saveSettings === 'function') {
                        saveSettings();
                    }

                    this.showToast('Settings imported!', 'success');
                } catch (error) {
                    this.showToast('Invalid settings file', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    // Update API Usage
    updateAPIUsage(inputTokens, outputTokens) {
        this.apiUsage.inputTokens += inputTokens || 0;
        this.apiUsage.outputTokens += outputTokens || 0;
        
        const tokenCount = document.getElementById('tokenCount');
        if (tokenCount) {
            const total = this.apiUsage.inputTokens + this.apiUsage.outputTokens;
            tokenCount.textContent = total.toLocaleString();
            tokenCount.title = `Input: ${this.apiUsage.inputTokens.toLocaleString()}, Output: ${this.apiUsage.outputTokens.toLocaleString()}`;
        }
    }

    // Show Chat History
    showChatHistory() {
        const messages = document.querySelectorAll('.message');
        if (messages.length === 0) {
            this.showToast('No chat history available', 'info');
            return;
        }
        
        // Scroll to top to show all history
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = 0;
            this.showToast('Scrolled to chat history', 'info');
        }
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize Advanced Features when DOM is ready
let advancedFeatures;
document.addEventListener('DOMContentLoaded', () => {
    advancedFeatures = new AdvancedFeatures();
    
    // Make it globally available
    window.advancedFeatures = advancedFeatures;
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedFeatures;
}

