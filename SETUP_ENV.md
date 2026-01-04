# Setting Up .env File

**Developer Details:**
- Website: https://rskworld.in
- Email: help@rskworld.in, support@rskworld.in
- Phone: +91 93305 39277
- Organization: RSK World

---

## ✅ .env File Created Successfully!

The `.env` file has been created in your project directory.

---

## 🔑 Next Step: Add Your API Key

### Step 1: Get Your Anthropic API Key

1. Visit: https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys section
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-`)

### Step 2: Edit .env File

Open the `.env` file in a text editor and replace:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

With your actual key:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ Important:** 
- Don't share your API key
- Don't commit .env to git (it's already in .gitignore)
- Keep it secure

---

## 📋 .env File Contents

Your `.env` file includes:

```env
# Anthropic API Key (REQUIRED)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Flask Configuration
FLASK_ENV=development
PORT=5000
HOST=0.0.0.0

# CORS Configuration
CORS_ORIGINS=*

# API Configuration
API_BASE_URL=http://localhost:5000
```

---

## 🚀 After Adding API Key

1. Save the `.env` file
2. Start the server: `python app.py`
3. You should see: ✅ Anthropic API client initialized successfully

---

## ❌ Troubleshooting

### If you see: "ANTHROPIC_API_KEY not configured"

1. Check `.env` file exists in project root
2. Verify API key is on the correct line
3. Make sure there are no extra spaces
4. Restart the Flask server

### If API key doesn't work

1. Verify key starts with `sk-ant-`
2. Check key hasn't expired
3. Ensure you have credits in your Anthropic account
4. Try creating a new API key

---

## 📞 Need Help?

- Email: help@rskworld.in
- Website: https://rskworld.in

---

© 2026 RSK World. All rights reserved.

