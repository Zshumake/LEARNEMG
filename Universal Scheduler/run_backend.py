#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Script to run the FastAPI backend server."""

import os
import sys
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
    
    print("🚀 Starting Universal Medical Residency Scheduler API...")
    print("📍 Backend will be available at: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/api/docs")
    print("✅ ACGME Compliance: http://localhost:8000/api/compliance/metrics/summary")
    print("\n" + "="*60)
    
    # Start uvicorn server
    import uvicorn
    
    try:
        uvicorn.run(
            "scheduler.api.main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Failed to start server: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())