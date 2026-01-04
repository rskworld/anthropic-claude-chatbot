# Quick Start Guide - Fix "Failed to fetch" Error

**Developer Details:**
- Website: https://rskworld.in
- Email: help@rskworld.in, support@rskworld.in
- Phone: +91 93305 39277

---

## The Problem
You see this error when trying to chat:
```
Failed to fetch. Please check your API configuration.
```

## The Solution (3 Simple Steps)

### Step 1: Start the Backend Server

Open a terminal/command prompt in the project folder and run:

```bash
python app.py
```

**You should see:**
```
==================================================
Anthropic Claude Chatbot Server
==================================================
Starting server on http://0.0.0.0:5000
API Health Check: http://localhost:5000/api/health
✅ Anthropic API client initialized successfully
```

**⚠️ IMPORTANT:** Keep this terminal window open! The server must stay running.

---

### Step 2: Open HTML in a Web Server

**Don't double-click `index.html`!** Use one of these:

#### Option A: Python HTTP Server (Recommended)
Open a NEW terminal/command prompt and run:
```bash
python -m http.server 8000
```

Then open browser: `http://localhost:8000`

#### Option B: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

---

### Step 3: Check Status Indicator

In the chatbot interface, look at the top-right:
- ✅ Green "Ready" = Everything is working!
- ❌ Red "Server Offline" = Server not running (go back to Step 1)

---

## Still Not Working?

### Check 1: Is Server Running?
Open browser and go to: `http://localhost:5000/api/health`

You should see:
```json
{"status":"healthy","anthropic_configured":true}
```

If you see "This site can't be reached" → Server is NOT running (Step 1)

### Check 2: Is API Key Set?
1. Create `.env` file in project folder
2. Add this line:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```
3. Get your key from: https://console.anthropic.com/
4. Restart the server (Step 1)

### Check 3: Port Conflict?
If port 5000 is busy, change it:
1. Edit `.env` file: `PORT=5001`
2. Edit `script.js` line 17: `const API_BASE_URL = 'http://localhost:5001/api';`
3. Restart server

---

## Complete Setup (First Time)

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Create .env file
copy env.example .env
# (Edit .env and add your ANTHROPIC_API_KEY)

# 3. Start Flask server (Terminal 1)
python app.py

# 4. Start HTTP server (Terminal 2)
python -m http.server 8000

# 5. Open browser
# Go to: http://localhost:8000
```

---

## Need More Help?

See `TROUBLESHOOTING.md` for detailed solutions.

**Contact:**
- Email: help@rskworld.in
- Website: https://rskworld.in

---

© 2026 RSK World. All rights reserved.

