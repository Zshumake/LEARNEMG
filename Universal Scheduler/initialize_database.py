#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Database initialization script for Universal Medical Residency Scheduler.
Creates all tables including new workflow management tables.
"""

import sys
import os
from pathlib import Path

# Add src to path
current_dir = Path(__file__).parent
src_dir = current_dir / "src"
sys.path.insert(0, str(src_dir))

# Load environment
from dotenv import load_dotenv
load_dotenv()

def initialize_database():
    """Initialize the complete database with all tables."""
    print("🏥 Universal Medical Residency Scheduler")
    print("=" * 50)
    print("🔧 Initializing database...")
    
    try:
        # Import all models to ensure they're registered
        from scheduler.models import (
            create_tables, SessionLocal,
            # Core models
            Resident, TimeOffRequest, QuotaTarget,
            Schedule, Assignment, RuleViolation, SchedulingRule,
            User, UserSession, AuditLog, APIKey,
            # ACGME models
            DutyHourEntry, WeeklyDutyHourSummary, ACGMEViolation, 
            CorrectiveAction, ACGMEComplianceReport, ACGMEConfiguration,
            # New workflow models
            AcademicYearWorkflow, HolidayCoverage, HistoricalScheduleImport, ResidentPreferences
        )
        
        print("📦 Models imported successfully")
        
        # Create all tables
        create_tables()
        print("✅ Database tables created")
        
        # Initialize ACGME configuration
        from scheduler.services.acgme_compliance_engine import initialize_acgme_configuration
        
        db = SessionLocal()
        try:
            initialize_acgme_configuration(db)
            print("✅ ACGME configuration initialized")
            
            # Create default admin user if needed
            from scheduler.services.auth import AuthService
            auth_service = AuthService(db)
            
            admin_user = db.query(User).filter(User.username == "admin").first()
            if not admin_user:
                admin_user = auth_service.create_user(
                    username="admin",
                    email="admin@hospital.edu",
                    full_name="System Administrator",
                    password="admin123",
                    role="program_director"
                )
                admin_user.is_admin = True
                admin_user.is_verified = True
                db.commit()
                print("✅ Default admin user created (admin/admin123)")
            
        finally:
            db.close()
        
        print("✅ Database initialization complete!")
        print("")
        print("🎯 Next Steps:")
        print("1. Run: ./START_SCHEDULER.command")
        print("2. Open: http://localhost:8501")
        print("3. Create your first academic year workflow")
        print("")
        
        return True
        
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    if initialize_database():
        sys.exit(0)
    else:
        input("Press Enter to exit...")
        sys.exit(1)