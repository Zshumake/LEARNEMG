#!/usr/bin/env python3
"""
PM&R Schedule Generator Launcher
Simple script to launch the Streamlit application
"""

import subprocess
import sys
import os

def check_dependencies():
    """Check if required packages are installed"""
    required_packages = ['streamlit', 'pandas', 'numpy']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("❌ Missing required packages:")
        for package in missing_packages:
            print(f"   - {package}")
        print("\n📦 Installing missing packages...")
        
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
            print("✅ Dependencies installed successfully!")
        except subprocess.CalledProcessError:
            print("❌ Failed to install dependencies. Please run:")
            print("   pip install -r requirements.txt")
            return False
    
    return True

def launch_app():
    """Launch the Streamlit application"""
    if not os.path.exists('pmr_scheduler.py'):
        print("❌ pmr_scheduler.py not found in current directory!")
        print("Please ensure you're running this script from the correct folder.")
        return False
    
    print("🚀 Launching PM&R Schedule Generator...")
    print("📱 The application will open in your web browser")
    print("🔗 URL: http://localhost:8501")
    print("\n💡 Press Ctrl+C to stop the application")
    print("=" * 50)
    
    try:
        subprocess.run([sys.executable, '-m', 'streamlit', 'run', 'pmr_scheduler.py'])
    except KeyboardInterrupt:
        print("\n👋 Shutting down PM&R Schedule Generator...")
        return True
    except Exception as e:
        print(f"❌ Error launching application: {e}")
        return False

if __name__ == "__main__":
    print("🏥 PM&R Sequential Schedule Generator")
    print("=" * 40)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Launch application
    success = launch_app()
    
    if success:
        print("✅ Application closed successfully")
    else:
        print("❌ Application encountered an error")
        sys.exit(1)