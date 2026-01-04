@echo off
REM Anthropic Claude Chatbot - Complete Startup Script
REM Project: Anthropic Claude Chatbot
REM Year: 2026
REM 
REM Developer Details:
REM - Website: https://rskworld.in
REM - Email: help@rskworld.in, support@rskworld.in
REM - Phone: +91 93305 39277
REM - Organization: RSK World

echo ========================================
echo Anthropic Claude Chatbot - Startup
echo ========================================
echo.

REM Check if .env file exists
if not exist .env (
    echo [WARNING] .env file not found!
    echo.
    echo Creating .env from env.example...
    copy env.example .env
    echo.
    echo [IMPORTANT] Please edit .env and add your ANTHROPIC_API_KEY
    echo Get your API key from: https://console.anthropic.com/
    echo.
    pause
    exit /b 1
)

REM Check if virtual environment exists
if exist venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo Virtual environment not found.
    echo Creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo Installing dependencies...
    pip install -r requirements.txt
)

echo.
echo ========================================
echo Starting Flask Backend Server...
echo ========================================
echo Server will run on: http://localhost:5000
echo API Health: http://localhost:5000/api/health
echo.
echo [IMPORTANT] Keep this window open!
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

python app.py

pause

