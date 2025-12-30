@echo off
REM ERNEST Local Development Server for Windows
REM This script starts a local HTTP server to test the ERNEST system

echo 🧠 Starting ERNEST Local Development Server...
echo.
echo This will start a local server at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python HTTP server...
    python -m http.server 8080
) else (
    echo ❌ Python is not available. Please install Python or use another method.
    echo.
    echo Alternative: If you have Node.js installed, run:
    echo npx http-server -p 8080
    pause
)