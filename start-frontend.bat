@echo off
REM Anthropic Claude Chatbot - Frontend Server
REM Project: Anthropic Claude Chatbot
REM Year: 2026
REM 
REM Developer Details:
REM - Website: https://rskworld.in

echo ========================================
echo Starting Frontend Server...
echo ========================================
echo.
echo Opening http://localhost:8000 in your browser...
echo.
echo [IMPORTANT] Make sure Flask backend is running first!
echo Run: start.bat (in another terminal)
echo.
echo Press Ctrl+C to stop
echo ========================================
echo.

REM Open browser
start http://localhost:8000

REM Start HTTP server
python -m http.server 8000

pause

