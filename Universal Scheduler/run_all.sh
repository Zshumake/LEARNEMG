#!/bin/bash

# Universal Medical Residency Scheduler - Full Stack Startup Script

echo "🏥 Starting Universal Medical Residency Scheduler"
echo "================================================="

# Change to the project directory
cd "$(dirname "$0")"

# Activate virtual environment
source venv/bin/activate

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found! Please run setup first."
    exit 1
fi

# Check if database exists
if [ ! -f medical_scheduler.db ]; then
    echo "⚠️  Database not found. Initializing..."
    python3 -c "
import sys
sys.path.insert(0, 'src')
from dotenv import load_dotenv
load_dotenv()
from scheduler.models import create_tables, SessionLocal
from scheduler.services.acgme_compliance_engine import initialize_acgme_configuration

create_tables()
db = SessionLocal()
try:
    initialize_acgme_configuration(db)
finally:
    db.close()
print('✅ Database initialized')
"
fi

echo ""
echo "🚀 Starting services..."
echo ""

# Start backend in background
echo "📡 Starting FastAPI Backend (Port 8000)..."
python3 run_backend.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "🎨 Starting Streamlit Frontend (Port 8501)..."
python3 run_frontend.py &
FRONTEND_PID=$!

echo ""
echo "✅ Services started!"
echo ""
echo "🌐 Access URLs:"
echo "   • Frontend (UI):     http://localhost:8501"
echo "   • Backend API:       http://localhost:8000"
echo "   • API Documentation: http://localhost:8000/api/docs"
echo "   • Health Check:      http://localhost:8000/api/health"
echo "   • ACGME Compliance:  http://localhost:8000/api/compliance/metrics/summary"
echo ""
echo "📋 Features Available:"
echo "   • PM&R Schedule Generation (47 Rules)"
echo "   • ACGME Compliance Tracking"
echo "   • Real-time Violation Detection"
echo "   • Duty Hour Monitoring"
echo "   • Compliance Reporting & Export"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

# Set trap to cleanup on interrupt
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait