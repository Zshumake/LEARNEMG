#!/usr/bin/env python3
"""Test workflow integration step by step."""

import requests
import json
import sys
from datetime import date, datetime

API_BASE = "http://127.0.0.1:8000/api"

def test_health():
    """Test if backend is healthy."""
    try:
        response = requests.get(f"{API_BASE}/health")
        print(f"Health check: {response.status_code}")
        if response.status_code == 200:
            print("✅ Backend is healthy")
            return True
        else:
            print(f"❌ Backend unhealthy: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Backend connection failed: {e}")
        return False

def create_academic_year():
    """Create academic year 2024-2025."""
    print("\n=== Step 1: Create Academic Year ===")
    
    data = {
        "academic_year": "2025-2026",
        "required_residents_count": 15,
        "required_pgy_levels": ["PGY-2", "PGY-3", "PGY-4"]
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/workflow/academic-years",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code in [200, 201]:
            result = response.json()
            print("✅ Academic year created successfully")
            print(f"   Academic Year: {result.get('academic_year')}")
            print(f"   Next Step: {result.get('next_step')}")
            return True
        else:
            print(f"❌ Failed to create academic year")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def add_residents():
    """Add 15 residents: 5 PGY-2, 5 PGY-3, 5 PGY-4."""
    print("\n=== Step 2: Add 15 Residents ===")
    
    residents = [
        # PGY-2 residents
        {"name": "Dr. Sarah Johnson", "email": "sarah.johnson@hospital.edu", "pgy_level": "PGY-2", "phone": "(555) 101-2001"},
        {"name": "Dr. Michael Chen", "email": "michael.chen@hospital.edu", "pgy_level": "PGY-2", "phone": "(555) 101-2002"},
        {"name": "Dr. Emily Rodriguez", "email": "emily.rodriguez@hospital.edu", "pgy_level": "PGY-2", "phone": "(555) 101-2003"},
        {"name": "Dr. James Wilson", "email": "james.wilson@hospital.edu", "pgy_level": "PGY-2", "phone": "(555) 101-2004"},
        {"name": "Dr. Lisa Patel", "email": "lisa.patel@hospital.edu", "pgy_level": "PGY-2", "phone": "(555) 101-2005"},
        
        # PGY-3 residents
        {"name": "Dr. David Kim", "email": "david.kim@hospital.edu", "pgy_level": "PGY-3", "phone": "(555) 101-3001"},
        {"name": "Dr. Amanda Taylor", "email": "amanda.taylor@hospital.edu", "pgy_level": "PGY-3", "phone": "(555) 101-3002"},
        {"name": "Dr. Robert Anderson", "email": "robert.anderson@hospital.edu", "pgy_level": "PGY-3", "phone": "(555) 101-3003"},
        {"name": "Dr. Jennifer Martinez", "email": "jennifer.martinez@hospital.edu", "pgy_level": "PGY-3", "phone": "(555) 101-3004"},
        {"name": "Dr. Christopher Lee", "email": "christopher.lee@hospital.edu", "pgy_level": "PGY-3", "phone": "(555) 101-3005"},
        
        # PGY-4 residents
        {"name": "Dr. Rachel Thompson", "email": "rachel.thompson@hospital.edu", "pgy_level": "PGY-4", "phone": "(555) 101-4001"},
        {"name": "Dr. Kevin White", "email": "kevin.white@hospital.edu", "pgy_level": "PGY-4", "phone": "(555) 101-4002"},
        {"name": "Dr. Nicole Brown", "email": "nicole.brown@hospital.edu", "pgy_level": "PGY-4", "phone": "(555) 101-4003"},
        {"name": "Dr. Daniel Garcia", "email": "daniel.garcia@hospital.edu", "pgy_level": "PGY-4", "phone": "(555) 101-4004"},
        {"name": "Dr. Michelle Davis", "email": "michelle.davis@hospital.edu", "pgy_level": "PGY-4", "phone": "(555) 101-4005"},
    ]
    
    added_residents = []
    for i, resident in enumerate(residents, 1):
        resident_data = {
            "name": resident["name"],
            "email": resident["email"],
            "pgy_level": resident["pgy_level"],
            "phone": resident["phone"],
            "start_date": "2024-07-01",
            "program_id": "PMR-2024",
            "is_active": True,
            "specializations": ["General PM&R"]
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/residents",
                json=resident_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [200, 201]:
                result = response.json()
                added_residents.append(result)
                print(f"✅ Added {resident['name']} ({resident['pgy_level']})")
            else:
                print(f"❌ Failed to add {resident['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Error adding {resident['name']}: {e}")
    
    print(f"Added {len(added_residents)}/15 residents")
    return added_residents

def main():
    print("🏥 Universal Medical Residency Scheduler - Complete Workflow Test")
    
    # Test backend health
    if not test_health():
        sys.exit(1)
    
    # Step 1: Create academic year
    if not create_academic_year():
        sys.exit(1)
    
    # Step 2: Add residents
    residents = add_residents()
    if len(residents) < 10:
        print("❌ Not enough residents added")
        sys.exit(1)
    
    print(f"\n🎉 Successfully completed initial setup!")
    print(f"   Academic Year: 2025-2026")
    print(f"   Residents Added: {len(residents)}")

if __name__ == "__main__":
    main()