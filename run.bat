@echo off
REM Anthropic Claude Chatbot - Windows Start Script
REM Project: Anthropic Claude Chatbot
REM Year: 2026
REM 
REM Developer Details:
REM - Website: https://rskworld.in
REM - Email: help@rskworld.in, support@rskworld.in
REM - Phone: +91 93305 39277
REM - Organization: RSK World

echo Starting Anthropic Claude Chatbot...
echo.

REM Check if virtual environment exists
if exist venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo Virtual environment not found. Creating one...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo Installing dependencies...
    pip install -r requirements.txt
)

echo.
echo Starting Flask server...
python app.py

pause

