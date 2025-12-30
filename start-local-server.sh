#!/bin/bash
# Enhanced Journey EMG/NCS Anatomy Learning System Server
# This script starts a local HTTP server to test the Enhanced Journey EMG/NCS Anatomy Learning System

echo "🧠 Starting Enhanced Journey EMG/NCS Anatomy Learning System Server..."
echo ""
echo "This will start a local server at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 HTTP server..."
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    echo "Using Python HTTP server..."
    python -m SimpleHTTPServer 8080
else
    echo "❌ Python is not available. Please install Python or use another method."
    echo ""
    echo "Alternative: If you have Node.js installed, run:"
    echo "npx http-server -p 8080"
    exit 1
fi