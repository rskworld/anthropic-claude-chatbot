# Troubleshooting Guide

**Developer Details:**
- Website: https://rskworld.in
- Email: help@rskworld.in, support@rskworld.in
- Phone: +91 93305 39277
- Organization: RSK World

---

## Common Error: "Failed to fetch"

### Problem
When you try to send a message, you see:
```
Sorry, I encountered an error: Failed to fetch. Please check your API configuration.
```

### Solutions

#### 1. **Backend Server Not Running** (Most Common)

**Solution:** Start the Flask backend server first!

**Steps:**
```bash
# Navigate to project directory
cd path/to/anthropic-claude-chatbot

# Activate virtual environment (if using one)
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Start the server
python app.py
```

You should see:
```
Starting Anthropic Claude Chatbot server on port 5000
 * Running on http://0.0.0.0:5000
```

**Keep this terminal window open!** The server must be running for the chatbot to work.

---

#### 2. **Opening HTML File Directly**

**Problem:** If you open `index.html` directly in the browser (double-click), it will show this error.

**Solution:** Use one of these methods:

**Option A: Use Python HTTP Server**
```bash
# In the project directory, run:
python -m http.server 8000

# Then open in browser:
http://localhost:8000
```

**Option B: Use Live Server (VS Code Extension)**
- Install "Live Server" extension in VS Code
- Right-click on `index.html`
- Select "Open with Live Server"

**Option C: Use the Flask Server (Recommended)**
- Start Flask server: `python app.py`
- Open browser to: `http://localhost:5000` (if you serve HTML from Flask)
- Or use Python HTTP server on port 8000 as shown above

---

#### 3. **Port Already in Use**

**Problem:** Port 5000 is already being used by another application.

**Solution:**

**Option A: Change Flask Port**
Edit `.env` file:
```
PORT=5001
```

Then update `script.js`:
```javascript
const API_BASE_URL = 'http://localhost:5001/api';
```

**Option B: Stop Other Application**
```bash
# Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Mac/Linux - Find and kill
lsof -ti:5000 | xargs kill
```

---

#### 4. **Firewall Blocking Connection**

**Problem:** Windows Firewall or antivirus blocking localhost connections.

**Solution:**
- Allow Python through Windows Firewall
- Temporarily disable antivirus to test
- Add exception for port 5000

---

#### 5. **API Key Not Configured**

**Problem:** Backend starts but API key is missing.

**Solution:**

1. Create `.env` file in project root (copy from `env.example`)
2. Add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

3. Restart the Flask server

**Get API Key:**
- Visit: https://console.anthropic.com/
- Sign up or log in
- Create API key
- Copy and paste into `.env` file

---

#### 6. **CORS Issues**

**Problem:** Browser blocking cross-origin requests.

**Solution:**

The app already has CORS enabled. If still having issues:

1. Make sure `flask-cors` is installed:
```bash
pip install flask-cors
```

2. Verify CORS is enabled in `app.py`:
```python
from flask_cors import CORS
CORS(app)
```

---

## Quick Start Checklist

✅ **Step 1:** Install dependencies
```bash
pip install -r requirements.txt
```

✅ **Step 2:** Create `.env` file
```bash
cp env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

✅ **Step 3:** Start Flask server
```bash
python app.py
```

✅ **Step 4:** Open HTML in browser
- Use Python HTTP server: `python -m http.server 8000`
- Or use Live Server extension
- Open `http://localhost:8000` in browser

✅ **Step 5:** Test connection
- Check status indicator in header (should show "Ready")
- Send a test message

---

## Testing Connection

### Test 1: Check Server Health
Open in browser: `http://localhost:5000/api/health`

Should return:
```json
{
  "status": "healthy",
  "anthropic_configured": true
}
```

### Test 2: Check Frontend Can Reach Backend
Open browser console (F12) and run:
```javascript
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(console.log)
```

Should return the health check JSON.

---

## Still Having Issues?

1. **Check Server Logs**
   - Look at the terminal where Flask is running
   - Check for error messages
   - Verify API key is loaded

2. **Check Browser Console**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for error messages

3. **Check Network Tab**
   - Open Developer Tools (F12)
   - Go to Network tab
   - Try sending a message
   - Check if request to `/api/chat` shows error

4. **Verify File Paths**
   - Make sure `index.html`, `script.js`, `advanced-features.js` are in same folder
   - Check browser console for 404 errors on these files

---

## Contact Support

If none of these solutions work:
- **Email:** help@rskworld.in
- **Website:** https://rskworld.in
- **Phone:** +91 93305 39277

---

© 2026 RSK World. All rights reserved.

