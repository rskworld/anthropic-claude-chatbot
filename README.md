# Anthropic Claude Chatbot

**Project:** Anthropic Claude Chatbot  
**Category:** OpenAI Integration  
**Year:** 2026  
**Difficulty:** Intermediate

## Overview

This project integrates Anthropic Claude API to create intelligent chatbots with advanced reasoning capabilities. Features include long context handling, complex reasoning, and safe AI interactions.

### Developer Details
- **Website:** [https://rskworld.in](https://rskworld.in)
- **Email:** help@rskworld.in, support@rskworld.in
- **Phone:** +91 93305 39277
- **Organization:** RSK World
- **Founder:** Molla Samser
- **Designer & Tester:** Rima Khatun

## Features

### Core Features
- ✅ **Claude API Integration** - Seamless integration with Anthropic's Claude API
- ✅ **Long Context Support** - Handle extended conversations and context
- ✅ **Advanced Reasoning** - Leverage Claude's powerful reasoning capabilities
- ✅ **Safe AI Interactions** - Built-in safety features and content filtering
- ✅ **Multi-modal Support** - Support for text, images, and documents
- ✅ **Modern UI** - Beautiful and responsive user interface
- ✅ **Real-time Chat** - Smooth conversation experience
- ✅ **Customizable Settings** - Adjust model, temperature, and tokens

### Advanced & Unique Features
- 🎤 **Voice Input/Output** - Speech recognition and text-to-speech capabilities
- 📎 **File Upload & Analysis** - Upload images and documents for Claude to analyze
- 🌙 **Dark Mode** - Eye-friendly dark theme toggle
- 💾 **Export Chat History** - Export conversations as PDF or TXT files
- 💬 **Multiple Chat Sessions** - Create and manage multiple conversation threads
- 🎨 **Code Syntax Highlighting** - Beautiful code rendering with syntax highlighting
- 📝 **Markdown Rendering** - Rich text formatting support
- ⚡ **Streaming Responses** - Real-time token streaming for faster response display
- 📋 **Copy Messages** - One-click copy for any message
- 👍 **Message Reactions** - Like/unlike assistant responses
- 📊 **API Usage Tracking** - Monitor token usage and API statistics
- 🎯 **Quick Templates** - Pre-built conversation templates for common tasks
- 🔍 **Chat Search** - Search through conversation history
- ⚙️ **Settings Export/Import** - Save and restore your preferences
- 🗣️ **Multi-language Voice Support** - Support for multiple languages in voice features

## Technologies Used

- **Anthropic API** - For Claude AI integration
- **Python** - Backend server (Flask)
- **JavaScript** - Frontend interactivity
- **HTML/CSS** - User interface
- **Claude** - Advanced AI model

## Project Structure

```
anthropic-claude-chatbot/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── app.py             # Flask backend server
├── requirements.txt   # Python dependencies
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore file
└── README.md          # Project documentation
```

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js (optional, for any frontend tooling)
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Setup Steps

1. **Clone or download the project**

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your Anthropic API key
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

5. **Start the Flask server**
   ```bash
   python app.py
   ```

6. **Open the application**
   - Open `index.html` in your web browser, or
   - Use a local server (e.g., `python -m http.server 8000`) and navigate to `http://localhost:8000`

## Usage

1. **Configure API Key**: Make sure your `.env` file contains a valid Anthropic API key.

2. **Start Backend**: Run `python app.py` to start the Flask server on port 5000.

3. **Open Frontend**: Open `index.html` in your browser or serve it through a local server.

4. **Start Chatting**: Type your message and press Enter or click the send button.

5. **Use Advanced Features**:
   - **Voice Input**: Click the microphone icon to speak your message
   - **Voice Output**: Click the speaker icon to have Claude's response read aloud
   - **File Upload**: Click the paperclip icon to attach images or documents
   - **Dark Mode**: Toggle dark theme from the header
   - **Multiple Sessions**: Click the chat icon to manage multiple conversations
   - **Export Chat**: Download your conversation history as PDF or TXT
   - **Quick Templates**: Click the lightbulb icon for pre-built prompts
   - **Search**: Use the search box to find specific messages

6. **Adjust Settings**: Click the settings icon to customize:
   - Model selection (Claude 3.5 Sonnet, Opus, Sonnet, or Haiku)
   - Max tokens (1-4096)
   - Temperature (0-1)
   - Stream response option
   - Auto voice output
   - Voice language selection
   - Export/Import settings

## API Endpoints

### `GET /api/health`
Health check endpoint to verify API status.

**Response:**
```json
{
  "status": "healthy",
  "anthropic_configured": true
}
```

### `POST /api/chat`
Main chat endpoint for conversing with Claude.

**Request Body:**
```json
{
  "message": "Hello, Claude!",
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "temperature": 0.7,
  "conversation_history": [],
  "stream": false
}
```

**Response:**
```json
{
  "response": "Hello! How can I help you today?",
  "model": "claude-3-5-sonnet-20241022",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 8
  }
}
```

### `GET /api/models`
Get list of available Claude models.

## Configuration

### Environment Variables

- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)
- `FLASK_ENV` - Flask environment (development/production)
- `PORT` - Server port (default: 5000)

### Frontend Configuration

Edit `script.js` to change the API base URL:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Available Models

- **Claude 3.5 Sonnet** - Latest and most capable model (recommended)
- **Claude 3 Opus** - Most powerful for complex tasks
- **Claude 3 Sonnet** - Balanced performance and speed
- **Claude 3 Haiku** - Fastest and most cost-effective

## Features in Detail

### Long Context Support
Claude can handle conversations with up to 200K tokens of context, making it perfect for extended discussions and document analysis.

### Advanced Reasoning
Claude excels at complex reasoning tasks, coding, mathematics, and multi-step problem solving.

### Safe AI Interactions
Anthropic's safety measures ensure responsible AI usage with built-in content filtering and safety protocols.

## Troubleshooting

### API Key Issues
- Ensure your `.env` file contains a valid `ANTHROPIC_API_KEY`
- Check that the API key is correctly formatted (starts with `sk-ant-`)
- Verify your API key has sufficient credits

### CORS Issues
- Make sure Flask-CORS is installed: `pip install flask-cors`
- Check that the frontend and backend URLs are correct

### Connection Errors
- Verify the Flask server is running on port 5000
- Check firewall settings
- Ensure no other application is using port 5000

## Security Notes

- Never commit your `.env` file to version control
- Keep your API key secure and private
- Use environment variables for sensitive data
- Consider implementing rate limiting for production use

## Contributing

This project is part of RSK World's free programming resources. For contributions or issues, please contact:

- **Email:** help@rskworld.in
- **Website:** [https://rskworld.in](https://rskworld.in)

## License

This project is provided as-is for educational purposes. Please refer to Anthropic's API terms of service for usage guidelines.

## Acknowledgments

- **Anthropic** - For providing the Claude API
- **RSK World** - Project organization and development
- **Molla Samser** - Project founder
- **Rima Khatun** - Designer & Tester

## Support

For support, visit [https://rskworld.in/contact.php](https://rskworld.in/contact.php) or email help@rskworld.in

---

**© 2026 RSK World. All rights reserved.**

