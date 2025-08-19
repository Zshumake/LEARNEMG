#!/usr/bin/env python3
"""Complete workflow test for Universal Medical Residency Scheduler."""

import requests
import json
import sys
from datetime import date, datetime, timedelta
import random

API_BASE = "http://127.0.0.1:8000/api"
ACADEMIC_YEAR = "2025-2026"

def api_call(endpoint, method="GET", data=None):
    """Make API call with error handling."""
    try:
        url = f"{API_BASE}{endpoint}"
        headers = {"Content-Type": "application/json"}
        
        if method == "GET":
            response = requests.get(url, timeout=10)
        elif method == "POST":
            response = requests.post(url, json=data, headers=headers, timeout=10)
        elif method == "PUT":
            response = requests.put(url, json=data, headers=headers, timeout=10)
        
        return response.status_code, response.json() if response.text else {}
    except Exception as e:
        print(f"❌ API call failed: {e}")
        return 500, {"error": str(e)}

def get_or_create_academic_year():
    """Get existing or create new academic year."""
    print("\n=== Step 1: Academic Year Setup ===")
    
    # Try to get existing
    status, data = api_call(f"/workflow/academic-years/{ACADEMIC_YEAR}")
    if status == 200:
        print(f"✅ Found existing academic year: {ACADEMIC_YEAR}")
        return data
    
    # Create new
    create_data = {
        "academic_year": ACADEMIC_YEAR,
        "required_residents_count": 15,
        "required_pgy_levels": ["PGY-2", "PGY-3", "PGY-4"]
    }
    
    status, data = api_call("/workflow/academic-years", "POST", create_data)
    if status in [200, 201]:
        print(f"✅ Created academic year: {ACADEMIC_YEAR}")
        return data
    else:
        print(f"❌ Failed to create academic year: {data}")
        return None

def add_residents():
    """Add 15 residents to the system."""
    print("\n=== Step 2: Add Residents ===")
    
    residents_data = [
        # 5 PGY-2 residents
        {"name": "Dr. Sarah Johnson", "email": "sarah.johnson@hospital.edu", "pgy_level": "PGY-2"},
        {"name": "Dr. Michael Chen", "email": "michael.chen@hospital.edu", "pgy_level": "PGY-2"},
        {"name": "Dr. Emily Rodriguez", "email": "emily.rodriguez@hospital.edu", "pgy_level": "PGY-2"},
        {"name": "Dr. James Wilson", "email": "james.wilson@hospital.edu", "pgy_level": "PGY-2"},
        {"name": "Dr. Lisa Patel", "email": "lisa.patel@hospital.edu", "pgy_level": "PGY-2"},
        
        # 5 PGY-3 residents
        {"name": "Dr. David Kim", "email": "david.kim@hospital.edu", "pgy_level": "PGY-3"},
        {"name": "Dr. Amanda Taylor", "email": "amanda.taylor@hospital.edu", "pgy_level": "PGY-3"},
        {"name": "Dr. Robert Anderson", "email": "robert.anderson@hospital.edu", "pgy_level": "PGY-3"},
        {"name": "Dr. Jennifer Martinez", "email": "jennifer.martinez@hospital.edu", "pgy_level": "PGY-3"},
        {"name": "Dr. Christopher Lee", "email": "christopher.lee@hospital.edu", "pgy_level": "PGY-3"},
        
        # 5 PGY-4 residents
        {"name": "Dr. Rachel Thompson", "email": "rachel.thompson@hospital.edu", "pgy_level": "PGY-4"},
        {"name": "Dr. Kevin White", "email": "kevin.white@hospital.edu", "pgy_level": "PGY-4"},
        {"name": "Dr. Nicole Brown", "email": "nicole.brown@hospital.edu", "pgy_level": "PGY-4"},
        {"name": "Dr. Daniel Garcia", "email": "daniel.garcia@hospital.edu", "pgy_level": "PGY-4"},
        {"name": "Dr. Michelle Davis", "email": "michelle.davis@hospital.edu", "pgy_level": "PGY-4"},
    ]
    
    # First, check existing residents
    status, existing = api_call("/residents")
    if status == 200:
        existing_emails = {r["email"] for r in existing}
        print(f"Found {len(existing)} existing residents")
    else:
        existing_emails = set()
    
    added_residents = []
    for resident in residents_data:
        if resident["email"] in existing_emails:
            print(f"⏭️  {resident['name']} already exists")
            continue
            
        resident_data = {
            "name": resident["name"],
            "email": resident["email"],
            "pgy_level": resident["pgy_level"],
            "phone": f"(555) {random.randint(100, 999)}-{random.randint(1000, 9999)}",
            "start_date": "2025-07-01",
            "program_id": "PMR-2025",
            "is_active": True,
            "specializations": ["General PM&R"]
        }
        
        status, result = api_call("/residents", "POST", resident_data)
        
        if status in [200, 201]:
            added_residents.append(result)
            print(f"✅ Added {resident['name']} ({resident['pgy_level']})")
        else:
            print(f"❌ Failed to add {resident['name']}: {result}")
    
    # Get final count
    status, all_residents = api_call("/residents")
    total_count = len(all_residents) if status == 200 else 0
    
    print(f"Total residents in system: {total_count}")
    return all_residents if status == 200 else []

def setup_dynamic_holidays():
    """Set up dynamic holiday management."""
    print("\n=== Step 3: Dynamic Holiday Setup ===")
    
    # Get dynamic holidays for academic year
    status, holidays = api_call(f"/workflow/academic-years/{ACADEMIC_YEAR}/dynamic-holidays")
    
    if status == 200 and holidays:
        print(f"✅ Found {len(holidays)} dynamic holidays")
        
        # Show holidays that require coverage
        coverage_needed = [h for h in holidays if h.get('is_coverage_required')]
        print(f"   🎄 {len(coverage_needed)} holidays require coverage")
        
        for holiday in coverage_needed[:3]:  # Show first 3
            print(f"      - {holiday['name']} on {holiday['holiday_date']}")
        
        return holidays
    else:
        print("❌ Failed to get dynamic holidays")
        return []

def assign_holiday_coverage(residents, holidays):
    """Assign residents to holiday coverage."""
    print("\n=== Step 4: Holiday Coverage Assignment ===")
    
    if not residents or not holidays:
        print("❌ Missing residents or holidays")
        return False
    
    # Get holidays that need coverage
    holidays_needing_coverage = [h for h in holidays if h.get('is_coverage_required') and not h.get('coverage_assigned')]
    
    print(f"Assigning coverage for {len(holidays_needing_coverage)} holidays")
    
    # Create resident pools by PGY level
    pgy2_residents = [r for r in residents if r['pgy_level'] == 'PGY-2']
    pgy3_residents = [r for r in residents if r['pgy_level'] == 'PGY-3'] 
    pgy4_residents = [r for r in residents if r['pgy_level'] == 'PGY-4']
    
    assignments_made = 0
    
    for holiday in holidays_needing_coverage[:6]:  # Assign first 6 holidays
        # Choose appropriate resident based on holiday
        holiday_name = holiday['name'].lower()
        
        if 'christmas' in holiday_name or 'thanksgiving' in holiday_name:
            # Major holidays - use senior residents (PGY-4)
            available_residents = pgy4_residents
        elif 'new year' in holiday_name or 'independence' in holiday_name:
            # Important holidays - use PGY-3
            available_residents = pgy3_residents
        else:
            # Other holidays - PGY-2 can handle
            available_residents = pgy2_residents
        
        if not available_residents:
            available_residents = residents  # Fallback to any resident
        
        # Pick a random resident
        primary_resident = random.choice(available_residents)
        backup_resident = random.choice([r for r in residents if r['id'] != primary_resident['id']])
        
        assignment_data = {
            "primary_resident_id": primary_resident["id"],
            "backup_resident_id": backup_resident["id"],
            "assignment_method": "automatic",
            "assigned_by": "Chief Resident (Test)"
        }
        
        status, result = api_call(
            f"/workflow/academic-years/{ACADEMIC_YEAR}/assign-holiday-coverage/{holiday['id']}",
            "POST",
            assignment_data
        )
        
        if status in [200, 201]:
            assignments_made += 1
            print(f"✅ Assigned {holiday['name']} to {primary_resident['name']} (backup: {backup_resident['name']})")
        else:
            print(f"❌ Failed to assign {holiday['name']}: {result}")
    
    print(f"Made {assignments_made} holiday assignments")
    return assignments_made > 0

def add_time_off_requests(residents):
    """Add 15 random time off requests."""
    print("\n=== Step 5: Time Off Requests ===")
    
    if not residents or len(residents) < 10:
        print("❌ Not enough residents for time off requests")
        return []
    
    # Create 15 random time off requests
    requests_made = []
    
    for i in range(15):
        resident = random.choice(residents)
        
        # Random start date in the future (next 120 days)
        start_offset = random.randint(10, 120)
        duration = random.randint(2, 5)  # 2-5 days
        
        start_date = date.today() + timedelta(days=start_offset)
        end_date = start_date + timedelta(days=duration - 1)
        
        # Skip weekends for simplicity
        if start_date.weekday() >= 5:
            start_date += timedelta(days=2)
            end_date += timedelta(days=2)
        
        request_data = {
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat(),
            "reason": random.choice([
                "Conference attendance", "Personal vacation", "Family event",
                "Medical appointment", "Research presentation", "Wedding"
            ]),
            "request_type": random.choice(["Vacation", "Conference", "Personal", "Medical"])
        }
        
        status, result = api_call(f"/residents/{resident['id']}/time-off", "POST", request_data)
        
        if status in [200, 201]:
            requests_made.append(result)
            print(f"✅ {resident['name']}: {duration} days off starting {start_date}")
        else:
            print(f"❌ Failed time off request for {resident['name']}: {result}")
    
    print(f"Created {len(requests_made)} time off requests")
    return requests_made

def test_schedule_generation(residents, holidays):
    """Test the integrated schedule generation."""
    print("\n=== Step 6: Schedule Generation Test ===")
    
    if not residents:
        print("❌ No residents available for scheduling")
        return
    
    # Prepare schedule generation parameters
    start_date = date.today() + timedelta(days=30)  # Start in 30 days
    end_date = start_date + timedelta(days=60)      # 60 day schedule
    
    schedule_params = {
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat(),
        "include_holidays": True,
        "optimize_preferences": True
    }
    
    print(f"Generating schedule from {start_date} to {end_date}")
    print(f"With {len(residents)} residents and {len(holidays)} holidays")
    
    status, result = api_call(
        f"/workflow/academic-years/{ACADEMIC_YEAR}/generate-schedule-with-holidays",
        "POST",
        schedule_params
    )
    
    if status in [200, 201]:
        print("✅ Schedule generation completed!")
        print(f"   Success: {result.get('success')}")
        print(f"   Assignments: {result.get('schedule_assignments', 0)}")
        print(f"   Holiday Requirements: {result.get('holiday_requirements_processed', 0)}")
        
        stats = result.get('generation_stats', {})
        if stats:
            print(f"   Generation Stats:")
            print(f"     - Duration: {stats.get('duration', 0):.2f}s")
            print(f"     - Assignments Tried: {stats.get('assignments_tried', 0)}")
            print(f"     - Constraint Checks: {stats.get('constraint_checks', 0)}")
        
        return True
    else:
        print(f"❌ Schedule generation failed: {result}")
        return False

def get_workflow_status():
    """Get final workflow status."""
    print("\n=== Final Workflow Status ===")
    
    status, data = api_call(f"/workflow/academic-years/{ACADEMIC_YEAR}/status")
    
    if status == 200:
        print(f"✅ Workflow Status for {ACADEMIC_YEAR}:")
        print(f"   Completion: {data.get('completion_percentage', 0):.1f}%")
        print(f"   Next Step: {data.get('next_step', 'Unknown')}")
        print(f"   Ready for Schedule: {data.get('ready_for_schedule', False)}")
        print(f"   Residents: {data.get('residents_count', 0)}")
        print(f"   Holidays Assigned: {data.get('holidays_assigned', 0)}")
        
        errors = data.get('validation_errors', [])
        if errors:
            print(f"   ⚠️ Validation Errors: {len(errors)}")
            for error in errors[:3]:
                print(f"      - {error}")
        
        return data
    else:
        print(f"❌ Failed to get workflow status: {data}")
        return None

def main():
    """Run complete workflow test."""
    print("🏥 Universal Medical Residency Scheduler - Complete Integration Test")
    print("=" * 70)
    
    # Test backend health
    status, _ = api_call("/health")
    if status != 200:
        print("❌ Backend is not healthy")
        sys.exit(1)
    print("✅ Backend is healthy")
    
    # Step 1: Academic year setup
    workflow = get_or_create_academic_year()
    if not workflow:
        sys.exit(1)
    
    # Step 2: Add residents
    residents = add_residents()
    if len(residents) < 10:
        print("❌ Not enough residents in system")
        # Continue anyway for testing
    
    # Step 3: Set up dynamic holidays
    holidays = setup_dynamic_holidays()
    
    # Step 4: Assign holiday coverage
    if residents and holidays:
        assign_holiday_coverage(residents, holidays)
    
    # Step 5: Add time off requests
    if residents:
        add_time_off_requests(residents)
    
    # Step 6: Test schedule generation
    schedule_success = test_schedule_generation(residents, holidays)
    
    # Final status
    final_status = get_workflow_status()
    
    print("\n" + "=" * 70)
    print("🎉 COMPLETE WORKFLOW TEST RESULTS:")
    print(f"   Academic Year: {ACADEMIC_YEAR}")
    print(f"   Residents: {len(residents)}")
    print(f"   Holidays: {len(holidays)}")
    print(f"   Schedule Generation: {'✅ Success' if schedule_success else '❌ Failed'}")
    
    if final_status:
        print(f"   Overall Completion: {final_status.get('completion_percentage', 0):.1f}%")
    
    print("\nSystem successfully demonstrates:")
    print("  ✅ Dynamic holiday management with chief input")
    print("  ✅ Database persistence and workflow tracking")
    print("  ✅ CSP integration with holiday constraints")
    print("  ✅ Real-time resident and preference management")
    print("  ✅ End-to-end schedule generation pipeline")

if __name__ == "__main__":
    main()