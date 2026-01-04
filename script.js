/*
    Anthropic Claude Chatbot - Client-Side JavaScript
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

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const attachBtn = document.getElementById('attachBtn');
const settingsBtn = document.getElementById('settingsBtn');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const clearChatBtn = document.getElementById('clearChat');
const loadingOverlay = document.getElementById('loadingOverlay');
const charCount = document.getElementById('charCount');
const statusIndicator = document.getElementById('statusIndicator');

// Settings Elements
const modelSelect = document.getElementById('modelSelect');
const maxTokens = document.getElementById('maxTokens');
const temperature = document.getElementById('temperature');
const temperatureValue = document.getElementById('temperatureValue');
const streamResponse = document.getElementById('streamResponse');

// Application State
let conversationHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadSettings();
    checkServerConnection();
    messageInput.focus();
});

// Check Server Connection
async function checkServerConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            const data = await response.json();
            if (data.anthropic_configured) {
                statusIndicator.innerHTML = '<i class="fas fa-circle"></i> Ready';
                statusIndicator.querySelector('i').style.color = 'var(--success-color)';
            } else {
                statusIndicator.innerHTML = '<i class="fas fa-circle"></i> API Key Missing';
                statusIndicator.querySelector('i').style.color = 'var(--warning-color)';
                if (window.advancedFeatures) {
                    window.advancedFeatures.showToast('API key not configured in backend', 'error');
                }
            }
        }
    } catch (error) {
        statusIndicator.innerHTML = '<i class="fas fa-circle"></i> Server Offline';
        statusIndicator.querySelector('i').style.color = 'var(--danger-color)';
        console.warn('Server connection check failed:', error);
        
        // Show helpful message
        if (window.advancedFeatures) {
            const welcomeMsg = document.querySelector('.welcome-message');
            if (welcomeMsg) {
                const warning = document.createElement('div');
                warning.style.cssText = 'background: #fee; border: 1px solid #fcc; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; color: #c33;';
                warning.innerHTML = `
                    <strong><i class="fas fa-exclamation-triangle"></i> Server Not Running</strong><br>
                    Please start the Flask server first:<br>
                    <code style="background: #fff; padding: 0.25rem 0.5rem; border-radius: 0.25rem; display: inline-block; margin-top: 0.5rem;">python app.py</code>
                `;
                welcomeMsg.appendChild(warning);
            }
        }
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Send message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
        updateCharCount();
    });

    // Settings sidebar
    settingsBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Temperature slider
    temperature.addEventListener('input', (e) => {
        temperatureValue.textContent = e.target.value;
    });

    // Clear chat
    clearChatBtn.addEventListener('click', clearChat);

    // Attach file (placeholder)
    attachBtn.addEventListener('click', () => {
        alert('File attachment feature coming soon!');
    });
}

// Update character count
function updateCharCount() {
    const count = messageInput.value.length;
    charCount.textContent = `${count} characters`;
}

// Send Message Function
async function sendMessage() {
    const message = messageInput.value.trim();
    const fileInput = document.getElementById('fileInput');
    let fileData = null;
    let fileType = null;

    // Handle file if selected
    if (fileInput && fileInput.files.length > 0 && window.advancedFeatures && window.advancedFeatures.selectedFile) {
        const file = window.advancedFeatures.selectedFile;
        fileType = file.type;
        
        // Convert file to base64
        try {
            fileData = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Remove data URL prefix
                    const base64 = e.target.result.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        } catch (error) {
            console.error('Error reading file:', error);
            if (window.advancedFeatures) {
                window.advancedFeatures.showToast('Error reading file', 'error');
            }
            return;
        }
    }

    if (!message && !fileData) return;

    // Store user content for history (needed in multiple places)
    const userContent = message || (fileData ? `[File: ${fileInput?.files[0]?.name || 'attachment'}]` : '');

    // Add user message to UI
    addMessage('user', userContent);
    
    // Clear input and file
    messageInput.value = '';
    messageInput.style.height = 'auto';
    updateCharCount();
    if (fileInput) fileInput.value = '';
    if (window.advancedFeatures) window.advancedFeatures.selectedFile = null;
    
    // Disable send button
    sendBtn.disabled = true;
    
    // Show loading
    showLoading(true);

    try {
        // Prepare request
        const requestData = {
            message: message || '',
            model: modelSelect.value,
            max_tokens: parseInt(maxTokens.value),
            temperature: parseFloat(temperature.value),
            stream: streamResponse.checked,
            conversation_history: conversationHistory
        };

        // Add file data if available
        if (fileData) {
            requestData.file_data = fileData;
            requestData.file_type = fileType;
        }

        // Make API call
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle streaming vs non-streaming
        const streamingIndicator = document.getElementById('streamingIndicator');
        if (streamResponse.checked && response.body && !response.headers.get('content-type')?.includes('application/json')) {
            // Streaming response
            showLoading(false);
            if (streamingIndicator) streamingIndicator.style.display = 'block';

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = '';
            let messageElement = null;

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') continue;
                            
                            try {
                                const json = JSON.parse(data);
                                if (json.response) {
                                    assistantMessage += json.response;
                                    if (!messageElement) {
                                        messageElement = addMessage('assistant', assistantMessage, true);
                                    } else {
                                        const messageText = messageElement.querySelector('.message-text');
                                        if (messageText && typeof marked !== 'undefined') {
                                            messageText.innerHTML = marked.parse(assistantMessage);
                                            if (typeof hljs !== 'undefined') {
                                                messageText.querySelectorAll('pre code').forEach((block) => {
                                                    hljs.highlightElement(block);
                                                });
                                            }
                                        } else {
                                            messageText.textContent = assistantMessage;
                                        }
                                        chatMessages.scrollTop = chatMessages.scrollHeight;
                                    }
                                }
                            } catch (e) {
                                // Skip invalid JSON
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Streaming error:', error);
                if (window.advancedFeatures) {
                    window.advancedFeatures.showToast('Streaming error occurred', 'error');
                }
            } finally {
                // Remove streaming class and indicator
                if (messageElement) {
                    messageElement.classList.remove('streaming');
                }
                if (streamingIndicator) streamingIndicator.style.display = 'none';
            }

            // Update conversation history
            conversationHistory.push(
                { role: 'user', content: userContent },
                { role: 'assistant', content: assistantMessage }
            );

            // Update API usage if available
            if (window.advancedFeatures) {
                window.advancedFeatures.updateAPIUsage(0, assistantMessage.split(' ').length * 1.3);
            }
        } else {
            // Non-streaming response
            const data = await response.json();
            
            // Add assistant response to UI
            addMessage('assistant', data.response);
            
            // Update conversation history
            conversationHistory.push(
                { role: 'user', content: userContent },
                { role: 'assistant', content: data.response }
            );

            // Update API usage
            if (data.usage && window.advancedFeatures) {
                window.advancedFeatures.updateAPIUsage(data.usage.input_tokens, data.usage.output_tokens);
            }
        }

    } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'Sorry, I encountered an error. ';
        
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage += 'The backend server is not running or not accessible.\n\n';
            errorMessage += 'Please:\n';
            errorMessage += '1. Make sure Flask server is running: `python app.py`\n';
            errorMessage += '2. Check that the server is running on http://localhost:5000\n';
            errorMessage += '3. If opening HTML directly, use a local server instead\n';
            errorMessage += '4. Check your firewall settings';
        } else if (error.message.includes('404')) {
            errorMessage += 'API endpoint not found. Please check the server is running correctly.';
        } else if (error.message.includes('500')) {
            errorMessage += 'Server error. Please check:\n';
            errorMessage += '1. ANTHROPIC_API_KEY is set in .env file\n';
            errorMessage += '2. API key is valid\n';
            errorMessage += '3. Check server logs for details';
        } else {
            errorMessage += error.message;
        }
        
        addMessage('assistant', errorMessage);
        
        // Show toast notification
        if (window.advancedFeatures) {
            window.advancedFeatures.showToast('Connection error - Check server', 'error');
        }
    } finally {
        showLoading(false);
        sendBtn.disabled = false;
        messageInput.focus();
    }
}

// Add Message to UI with Markdown and Code Highlighting
function addMessage(role, content, isStreaming = false) {
    // Remove welcome message if exists
    const welcomeMsg = chatMessages.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }

    // Check if we're updating an existing streaming message
    let messageDiv = chatMessages.querySelector('.message.streaming');
    let messageText, messageContent;

    if (!messageDiv || !isStreaming) {
        messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        if (isStreaming) messageDiv.classList.add('streaming');
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = role === 'user' 
            ? '<i class="fas fa-user"></i>' 
            : '<i class="fas fa-robot"></i>';
        
        messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        messageText = document.createElement('div');
        messageText.className = 'message-text';
        
        const messageActions = document.createElement('div');
        messageActions.className = 'message-actions';
        if (role === 'assistant') {
            messageActions.innerHTML = `
                <button class="action-btn" onclick="copyMessage(this)" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="action-btn" onclick="readMessage(this)" title="Read">
                    <i class="fas fa-volume-up"></i>
                </button>
                <button class="action-btn" onclick="likeMessage(this)" title="Like">
                    <i class="fas fa-thumbs-up"></i>
                </button>
            `;
        }
        
        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageActions);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
    } else {
        messageText = messageDiv.querySelector('.message-text');
        messageContent = messageDiv.querySelector('.message-content');
    }

    // Render markdown for assistant messages
    if (role === 'assistant' && typeof marked !== 'undefined') {
        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true,
            highlight: function(code, lang) {
                if (lang && typeof hljs !== 'undefined') {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {
                        return hljs.highlightAuto(code).value;
                    }
                }
                return code;
            }
        });
        
        messageText.innerHTML = marked.parse(content);
        
        // Highlight code blocks
        if (typeof hljs !== 'undefined') {
            messageText.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    } else {
        messageText.textContent = content;
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Auto voice output if enabled
    if (role === 'assistant' && !isStreaming) {
        const autoVoice = document.getElementById('autoVoiceOutput')?.checked;
        if (autoVoice && window.advancedFeatures) {
            setTimeout(() => window.advancedFeatures.readLastMessage(), 500);
        }
    }

    return messageDiv;
}

// Copy Message Function
function copyMessage(btn) {
    const message = btn.closest('.message');
    const text = message.querySelector('.message-text').textContent;
    navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
        if (window.advancedFeatures) {
            window.advancedFeatures.showToast('Message copied!', 'success');
        }
    });
}

// Read Message Function
function readMessage(btn) {
    if (window.advancedFeatures) {
        window.advancedFeatures.readLastMessage();
    }
}

// Like Message Function
function likeMessage(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('liked')) {
        icon.className = 'fas fa-thumbs-up';
        if (window.advancedFeatures) {
            window.advancedFeatures.showToast('Thanks for the feedback!', 'success');
        }
    } else {
        icon.className = 'fas fa-thumbs-up';
    }
}

// Show/Hide Loading Overlay
function showLoading(show) {
    loadingOverlay.style.display = show ? 'flex' : 'none';
    if (show) {
        statusIndicator.innerHTML = '<i class="fas fa-circle"></i> Processing...';
        statusIndicator.querySelector('i').style.color = 'var(--warning-color)';
    } else {
        statusIndicator.innerHTML = '<i class="fas fa-circle"></i> Ready';
        statusIndicator.querySelector('i').style.color = 'var(--success-color)';
    }
}

// Clear Chat
function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        conversationHistory = [];
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <h2>Welcome to Claude Chatbot</h2>
                <p>Experience advanced conversational AI with Anthropic Claude. Ask me anything!</p>
                <div class="feature-list">
                    <span class="feature-tag"><i class="fas fa-check"></i> Long Context Support</span>
                    <span class="feature-tag"><i class="fas fa-check"></i> Advanced Reasoning</span>
                    <span class="feature-tag"><i class="fas fa-check"></i> Safe AI Interactions</span>
                </div>
            </div>
        `;
    }
}

// Load Settings from LocalStorage
function loadSettings() {
    const savedModel = localStorage.getItem('claude_model');
    const savedMaxTokens = localStorage.getItem('claude_max_tokens');
    const savedTemperature = localStorage.getItem('claude_temperature');
    const savedStream = localStorage.getItem('claude_stream');

    if (savedModel) modelSelect.value = savedModel;
    if (savedMaxTokens) maxTokens.value = savedMaxTokens;
    if (savedTemperature) {
        temperature.value = savedTemperature;
        temperatureValue.textContent = savedTemperature;
    }
    if (savedStream) streamResponse.checked = savedStream === 'true';
}

// Save Settings to LocalStorage
function saveSettings() {
    localStorage.setItem('claude_model', modelSelect.value);
    localStorage.setItem('claude_max_tokens', maxTokens.value);
    localStorage.setItem('claude_temperature', temperature.value);
    localStorage.setItem('claude_stream', streamResponse.checked);
}

// Save settings on change
modelSelect.addEventListener('change', saveSettings);
maxTokens.addEventListener('change', saveSettings);
temperature.addEventListener('change', saveSettings);
streamResponse.addEventListener('change', saveSettings);

