#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Script to run the Streamlit frontend application."""

import os
import sys
import subprocess
from pathlib import Path

def main():
    # Change to the project directory
    project_dir = Path(__file__).parent
    os.chdir(project_dir)
    
    # Add src to Python path
    src_dir = project_dir / "src"
    sys.path.insert(0, str(src_dir))
    
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    print("🎨 Starting Universal Medical Residency Scheduler UI...")
    print("📍 Frontend will be available at: http://localhost:8501")
    print("✅ ACGME Compliance Dashboard included")
    print("\n" + "="*60)
    
    # Start streamlit
    try:
        result = subprocess.run([
            "python3", "-m", "streamlit", "run", "streamlit_app.py",
            "--server.port", "8501",
            "--server.address", "0.0.0.0",
            "--theme.base", "light"
        ])
        return result.returncode
    except KeyboardInterrupt:
        print("\n🛑 Frontend stopped by user")
        return 0
    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())