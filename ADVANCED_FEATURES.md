# Advanced Features Documentation

## Overview
This document describes all the advanced and unique features added to the Anthropic Claude Chatbot project.

**Developer Details:**
- Website: https://rskworld.in
- Email: help@rskworld.in, support@rskworld.in
- Phone: +91 93305 39277
- Organization: RSK World
- Founder: Molla Samser
- Designer & Tester: Rima Khatun

---

## 🎤 Voice Input/Output

### Voice Input
- **Feature**: Speech-to-text input using browser's Web Speech API
- **Usage**: Click the microphone icon in the input toolbar
- **Supported Browsers**: Chrome, Edge, Safari
- **Languages**: Multiple language support (configurable in settings)

### Voice Output
- **Feature**: Text-to-speech for Claude's responses
- **Usage**: Click the speaker icon to read the last assistant message
- **Auto Mode**: Enable "Auto Voice Output" in settings for automatic reading
- **Customization**: Adjustable language, rate, pitch, and volume

---

## 📎 File Upload & Analysis

### Supported File Types
- **Images**: PNG, JPG, JPEG, GIF, WebP
- **Documents**: PDF, TXT, DOC, DOCX (up to 10MB)

### Features
- Drag-and-drop or click to upload
- File preview before sending
- Base64 encoding for API transmission
- Image analysis by Claude's vision capabilities

### Usage
1. Click the paperclip icon
2. Select a file
3. File preview will appear
4. Send message with file attached

---

## 🌙 Dark Mode

### Features
- Toggle between light and dark themes
- Persistent theme preference (saved in localStorage)
- Smooth transitions
- All UI elements styled for both themes

### Usage
Click the moon/sun icon in the header to toggle dark mode

---

## 💾 Export Chat History

### Export Formats

#### TXT Export
- Plain text format
- Includes timestamps
- Easy to read and share
- Small file size

#### PDF Export
- Professional formatted document
- Includes timestamps and user/assistant labels
- Multi-page support for long conversations
- Uses jsPDF library

### Usage
Click the download icon in the header, then choose format (1 for TXT, 2 for PDF)

---

## 💬 Multiple Chat Sessions

### Features
- Create unlimited chat sessions
- Switch between sessions seamlessly
- Each session maintains its own conversation history
- Delete sessions individually
- Session counter in header

### Usage
1. Click the chat icon in header to open sessions sidebar
2. Click "New Session" to create a new chat
3. Click on any session to switch
4. Click trash icon to delete a session

### Storage
Sessions are stored in browser's localStorage

---

## 🎨 Code Syntax Highlighting

### Features
- Automatic code block detection
- Syntax highlighting for 100+ programming languages
- Uses Highlight.js library
- Dark/light theme compatible
- Copy code blocks easily

### Supported Languages
- JavaScript, Python, Java, C++, C#, PHP, Ruby, Go, Rust, and many more

---

## 📝 Markdown Rendering

### Features
- Full Markdown support (GitHub Flavored Markdown)
- Headings, lists, links, images
- Code blocks with syntax highlighting
- Blockquotes, tables, strikethrough
- Automatic formatting

### Supported Elements
- Headers (H1-H6)
- Bold, italic, strikethrough
- Lists (ordered and unordered)
- Links and images
- Code blocks (inline and fenced)
- Blockquotes
- Tables
- Horizontal rules

---

## ⚡ Streaming Responses

### Features
- Real-time token streaming from API
- Faster perceived response time
- Visual streaming indicator
- Progressive message display
- Toggle in settings

### Usage
Enable "Stream Response" checkbox in settings

### Benefits
- See responses as they're generated
- Better user experience
- Reduced waiting time

---

## 📋 Copy Messages

### Features
- One-click copy for any message
- Visual feedback (checkmark appears)
- Copy button appears on hover
- Works for both user and assistant messages

---

## 👍 Message Reactions

### Features
- Like/unlike assistant responses
- Visual feedback
- Helps improve experience
- Feedback can be used for analytics

---

## 📊 API Usage Tracking

### Features
- Real-time token counting
- Input and output token tracking
- Display in header
- Hover for detailed breakdown
- Persistent across sessions

### Display
Shows total tokens used in the current session in the header

---

## 🎯 Quick Templates

### Pre-built Templates
1. **Code Review** - Request code review and suggestions
2. **Explain Concept** - Get simple explanations
3. **Debug Help** - Debug assistance
4. **Write Code** - Request code generation
5. **Summarize** - Summarize content
6. **Translate** - Translation requests
7. **Creative Writing** - Creative writing help
8. **Learn** - Educational explanations

### Usage
1. Click the lightbulb icon in input toolbar
2. Select a template
3. Template text is inserted into input
4. Customize and send

---

## 🔍 Chat Search

### Features
- Real-time search through conversation
- Highlights matching messages
- Auto-scroll to first match
- Case-insensitive search
- Search across all messages

### Usage
Type in the search box in the input footer

---

## ⚙️ Settings Export/Import

### Export Settings
- Save all preferences to JSON file
- Includes model, tokens, temperature, etc.
- Easy backup and restore

### Import Settings
- Load settings from JSON file
- Restore previous configuration
- Validate file format

### Settings Included
- Model selection
- Max tokens
- Temperature
- Stream response preference
- Auto voice output
- Voice language

---

## 🗣️ Multi-language Voice Support

### Supported Languages
- English (US & UK)
- Spanish
- French
- German
- More languages available via browser API

### Configuration
Select language in Settings > Voice Language

---

## Technical Implementation

### Libraries Used
- **Marked.js** - Markdown parsing
- **Highlight.js** - Code syntax highlighting
- **jsPDF** - PDF generation
- **Web Speech API** - Voice input/output
- **Anthropic API** - AI backend

### Browser Compatibility
- Chrome/Edge: Full support (including voice)
- Firefox: Most features (limited voice support)
- Safari: Full support
- Mobile browsers: Responsive design

### Performance
- Optimized for speed
- Lazy loading where applicable
- Efficient DOM updates
- Minimal dependencies

---

## Future Enhancements

Potential features for future versions:
- Conversation sharing via URL
- Cloud sync for sessions
- Custom voice model selection
- Advanced file type support
- Integration with external tools
- Plugin system

---

© 2026 RSK World. All rights reserved.

