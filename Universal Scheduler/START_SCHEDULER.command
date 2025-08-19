#!/bin/bash

# Universal Medical Residency Scheduler - Click to Launch
# Double-click this file to start the system

# Get the directory of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "🏥 Universal Medical Residency Scheduler"
echo "================================================="
echo "Starting system from: $DIR"
echo ""

# Check Python 3
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 required. Install from https://python.org"
    read -p "Press Enter to exit..."
    exit 1
fi

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "🔧 Activating virtual environment..."
    source venv/bin/activate
else
    echo "⚠️ Virtual environment not found, using system Python"
fi

# Install/check essential dependencies
echo "📦 Checking dependencies..."
python3 -m pip install streamlit fastapi uvicorn sqlalchemy pydantic python-dotenv email-validator requests pandas --quiet

# Kill any existing processes on our ports
echo "🧹 Cleaning up any existing processes..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:8501 | xargs kill -9 2>/dev/null || true

# Initialize database with workflow tables
echo "🔧 Initializing database with workflow tables..."
python3 initialize_database.py

if [ $? -ne 0 ]; then
    echo "❌ Database initialization failed"
    read -p "Press Enter to exit..."
    exit 1
fi

echo "🚀 Starting backend server..."
# Start backend in background
python3 -c "
import sys
import os
sys.path.insert(0, 'src')
os.environ['PYTHONPATH'] = 'src'
import uvicorn
from dotenv import load_dotenv
load_dotenv()
uvicorn.run('scheduler.api.main:app', host='0.0.0.0', port=8000, reload=False)
" &

BACKEND_PID=$!

# Wait for backend to start
echo "⏱️ Waiting for backend to initialize..."
sleep 5

# Check if backend is running
if ! lsof -i:8000 &> /dev/null; then
    echo "❌ Backend failed to start. Check for errors."
    kill $BACKEND_PID 2>/dev/null
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ Backend running on http://localhost:8000"

# Start frontend
echo "🎨 Starting frontend interface..."
python3 -c "
import sys
import os
sys.path.insert(0, 'src')
os.environ['PYTHONPATH'] = 'src'
import streamlit.web.cli as stcli
import streamlit as st
st._is_running_with_streamlit = True
sys.argv = ['streamlit', 'run', 'streamlit_app_persistent.py', '--server.port', '8501', '--server.address', '0.0.0.0']
stcli.main()
" &

FRONTEND_PID=$!

# Wait for frontend to start
echo "⏱️ Waiting for frontend to initialize..."
sleep 5

# Check if frontend is running
if ! lsof -i:8501 &> /dev/null; then
    echo "❌ Frontend failed to start"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    read -p "Press Enter to exit..."
    exit 1
fi

echo "✅ Frontend running on http://localhost:8501"

# Open browser
echo "🌐 Opening application in browser..."
sleep 2
open "http://localhost:8501"

echo ""
echo "🎉 Universal Medical Residency Scheduler is now running!"
echo ""
echo "📍 Access URLs:"
echo "   • Main Application:  http://localhost:8501"
echo "   • API Backend:       http://localhost:8000"
echo "   • API Documentation: http://localhost:8000/docs"
echo ""
echo "✅ Features Available:"
echo "   • PM&R Schedule Generation (47 Rules)"
echo "   • ACGME Compliance Tracking" 
echo "   • Real-time Violation Detection"
echo "   • Duty Hour Monitoring"
echo "   • Compliance Reporting & Export"
echo ""
echo "🛑 Press Ctrl+C or close this window to stop the system"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set trap to cleanup on interrupt
trap cleanup SIGINT SIGTERM

# Wait for processes
wait