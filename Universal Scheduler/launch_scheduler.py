#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Universal Medical Residency Scheduler - Launcher Application
Double-click this file to start the complete system.
"""

import os
import sys
import subprocess
import time
import webbrowser
from pathlib import Path
import threading

class SchedulerLauncher:
    def __init__(self):
        self.project_dir = Path(__file__).parent
        self.backend_process = None
        self.frontend_process = None
        
    def setup_environment(self):
        """Setup the Python environment."""
        print("🏥 Universal Medical Residency Scheduler")
        print("=" * 50)
        print("Setting up environment...")
        
        # Change to project directory
        os.chdir(self.project_dir)
        
        # Add src to Python path
        src_dir = self.project_dir / "src"
        sys.path.insert(0, str(src_dir))
        
        # Load environment variables
        try:
            from dotenv import load_dotenv
            load_dotenv()
            print("✅ Environment loaded")
        except ImportError:
            print("⚠️ python-dotenv not found, using system environment")
    
    def check_dependencies(self):
        """Check if required dependencies are installed."""
        print("Checking dependencies...")
        
        required_packages = [
            'streamlit',
            'fastapi', 
            'uvicorn',
            'sqlalchemy',
            'pydantic'
        ]
        
        missing = []
        for package in required_packages:
            try:
                __import__(package)
                print(f"  ✅ {package}")
            except ImportError:
                missing.append(package)
                print(f"  ❌ {package}")
        
        if missing:
            print(f"\n⚠️ Missing packages: {', '.join(missing)}")
            print("Installing missing packages...")
            try:
                subprocess.run([
                    sys.executable, "-m", "pip", "install"
                ] + missing, check=True, capture_output=True)
                print("✅ Dependencies installed")
            except subprocess.CalledProcessError as e:
                print(f"❌ Failed to install dependencies: {e}")
                return False
        
        return True
    
    def start_backend(self):
        """Start the FastAPI backend server."""
        print("\n📡 Starting backend server...")
        
        try:
            # Use the virtual environment python if it exists
            venv_python = self.project_dir / "venv" / "bin" / "python3"
            python_cmd = str(venv_python) if venv_python.exists() else sys.executable
            
            self.backend_process = subprocess.Popen([
                python_cmd, "-m", "uvicorn", 
                "scheduler.api.main:app",
                "--host", "0.0.0.0",
                "--port", "8000",
                "--reload"
            ], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            cwd=self.project_dir,
            env={**os.environ, 'PYTHONPATH': str(self.project_dir / "src")}
            )
            
            # Wait a moment for the server to start
            time.sleep(3)
            
            if self.backend_process.poll() is None:
                print("✅ Backend server started on http://localhost:8000")
                return True
            else:
                print("❌ Backend server failed to start")
                return False
                
        except Exception as e:
            print(f"❌ Error starting backend: {e}")
            return False
    
    def start_frontend(self):
        """Start the Streamlit frontend."""
        print("\n🎨 Starting frontend interface...")
        
        try:
            # Use the virtual environment python if it exists
            venv_python = self.project_dir / "venv" / "bin" / "python3"
            python_cmd = str(venv_python) if venv_python.exists() else sys.executable
            
            self.frontend_process = subprocess.Popen([
                python_cmd, "-m", "streamlit", "run",
                "streamlit_app_simple.py",
                "--server.port", "8501",
                "--server.address", "0.0.0.0",
                "--theme.base", "light",
                "--server.headless", "true"
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE, 
            cwd=self.project_dir,
            env={**os.environ, 'PYTHONPATH': str(self.project_dir / "src")}
            )
            
            # Wait for frontend to start
            time.sleep(5)
            
            if self.frontend_process.poll() is None:
                print("✅ Frontend interface started on http://localhost:8501")
                return True
            else:
                print("❌ Frontend interface failed to start")
                return False
                
        except Exception as e:
            print(f"❌ Error starting frontend: {e}")
            return False
    
    def open_browser(self):
        """Open the application in the default browser."""
        print("\n🌐 Opening application in browser...")
        time.sleep(2)
        
        try:
            webbrowser.open("http://localhost:8501")
            print("✅ Application opened in browser")
        except Exception as e:
            print(f"⚠️ Could not auto-open browser: {e}")
            print("Please manually open: http://localhost:8501")
    
    def monitor_processes(self):
        """Monitor the running processes."""
        print("\n" + "=" * 50)
        print("🎯 Universal Medical Residency Scheduler is running!")
        print("=" * 50)
        print("📍 Frontend (UI):     http://localhost:8501")
        print("📍 Backend API:       http://localhost:8000")  
        print("📍 API Documentation: http://localhost:8000/docs")
        print("=" * 50)
        print("\n✅ System Status:")
        print("   • PM&R Schedule Generation (47 Rules)")
        print("   • ACGME Compliance Tracking")
        print("   • Real-time Violation Detection")
        print("   • Duty Hour Monitoring")
        print("   • Compliance Reporting & Export")
        print("\n🛑 Press Ctrl+C to stop all services")
        print("🔄 Keep this window open to keep the system running")
        
        try:
            # Wait for processes
            while True:
                if self.backend_process and self.backend_process.poll() is not None:
                    print("\n❌ Backend process stopped unexpectedly")
                    break
                if self.frontend_process and self.frontend_process.poll() is not None:
                    print("\n❌ Frontend process stopped unexpectedly") 
                    break
                time.sleep(1)
                
        except KeyboardInterrupt:
            print("\n\n🛑 Shutting down services...")
            self.cleanup()
    
    def cleanup(self):
        """Clean up processes on exit."""
        if self.backend_process:
            self.backend_process.terminate()
            try:
                self.backend_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.backend_process.kill()
            print("✅ Backend stopped")
        
        if self.frontend_process:
            self.frontend_process.terminate()
            try:
                self.frontend_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.frontend_process.kill()
            print("✅ Frontend stopped")
        
        print("✅ All services stopped")
    
    def launch(self):
        """Launch the complete system."""
        try:
            self.setup_environment()
            
            if not self.check_dependencies():
                input("\nPress Enter to exit...")
                return
            
            if not self.start_backend():
                input("\nPress Enter to exit...")
                return
            
            if not self.start_frontend():
                self.cleanup()
                input("\nPress Enter to exit...")
                return
            
            # Open browser in a separate thread
            browser_thread = threading.Thread(target=self.open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            # Monitor processes (this blocks)
            self.monitor_processes()
            
        except Exception as e:
            print(f"\n❌ Unexpected error: {e}")
            self.cleanup()
            input("\nPress Enter to exit...")

if __name__ == "__main__":
    launcher = SchedulerLauncher()
    launcher.launch()