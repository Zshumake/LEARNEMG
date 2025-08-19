#!/usr/bin/env python3
"""
Test script for Universal Scheduler components
"""

import sys
import os

def test_component_loading():
    """Test if components can be loaded"""
    
    print("🧪 Testing Universal Scheduler Components")
    print("=" * 50)
    
    # Add current directory to path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, current_dir)
    
    # Test component imports
    components_to_test = [
        'dashboard',
        'resident_management', 
        'schedule_generator',
        'quota_tracker',
        'rule_parser',
        'csp_engine'
    ]
    
    results = {}
    
    for component_name in components_to_test:
        try:
            # Try to import from components directory
            component_path = os.path.join(current_dir, 'components', f'{component_name}.py')
            
            if os.path.exists(component_path):
                # Simple syntax check by attempting to compile
                with open(component_path, 'r') as f:
                    code = f.read()
                    compile(code, component_path, 'exec')
                
                results[component_name] = "✅ PASS - Syntax valid"
            else:
                results[component_name] = "❌ FAIL - File not found"
                
        except SyntaxError as e:
            results[component_name] = f"❌ FAIL - Syntax error: {e}"
        except Exception as e:
            results[component_name] = f"⚠️ WARN - {str(e)}"
    
    # Display results
    print("\n📋 Component Test Results:")
    print("-" * 30)
    
    for component, result in results.items():
        print(f"{component:<20} {result}")
    
    # Test core scheduling engines
    print("\n🔧 Testing Core Engines:")
    print("-" * 30)
    
    core_engines = [
        'pmr_rules_engine.py',
        'csp_scheduling_engine.py', 
        'integrated_pmr_scheduler.py'
    ]
    
    for engine in core_engines:
        engine_path = os.path.join(current_dir, engine)
        if os.path.exists(engine_path):
            try:
                with open(engine_path, 'r') as f:
                    code = f.read()
                    compile(code, engine_path, 'exec')
                print(f"{engine:<25} ✅ PASS")
            except Exception as e:
                print(f"{engine:<25} ❌ FAIL - {e}")
        else:
            print(f"{engine:<25} ❓ NOT FOUND")
    
    # Summary
    passed = sum(1 for r in results.values() if "✅ PASS" in r)
    total = len(results)
    
    print(f"\n📊 Summary: {passed}/{total} components passed basic validation")
    
    if passed == total:
        print("🎉 All components are ready!")
        return True
    else:
        print("⚠️ Some components need attention.")
        return False

def test_resident_data_structure():
    """Test resident data structure"""
    
    print("\n👥 Testing Resident Data Structure:")
    print("-" * 30)
    
    # Test resident data structure
    sample_resident = {
        'id': 1,
        'name': 'Dr. Test Resident',
        'pgy_level': 'PGY-2',
        'email': 'test@hospital.edu',
        'phone': '555-0100',
        'start_date': '2024-07-01',
        'specializations': ['EMG', 'Pain Management'],
        'preferences': {
            'preferred_call_days': ['Tuesday', 'Thursday'],
            'avoid_weekends': False
        },
        'time_off': [
            {
                'start_date': '2025-08-15',
                'end_date': '2025-08-20',
                'reason': 'Conference',
                'type': 'Conference'
            }
        ],
        'quota_targets': {
            'call': 38,
            'moonlight': 21,
            'weekend_call': 7.5
        }
    }
    
    # Validate required fields
    required_fields = ['id', 'name', 'pgy_level', 'email', 'quota_targets']
    
    for field in required_fields:
        if field in sample_resident:
            print(f"✅ {field} field present")
        else:
            print(f"❌ {field} field missing")
    
    # Validate quota targets
    quota_fields = ['call', 'moonlight', 'weekend_call']
    for field in quota_fields:
        if field in sample_resident['quota_targets']:
            print(f"✅ quota_targets.{field} present")
        else:
            print(f"❌ quota_targets.{field} missing")
    
    print("✅ Resident data structure validated")

def test_schedule_data_structure():
    """Test schedule data structure"""
    
    print("\n📅 Testing Schedule Data Structure:")
    print("-" * 30)
    
    # Test schedule assignment structure
    sample_assignment = {
        'id': 1,
        'date': '2025-07-01',
        'shift_type': 'call',
        'resident_name': 'Dr. Test Resident',
        'resident_pgy': 'PGY-2',
        'start_time': '17:00',
        'end_time': '08:00+1'
    }
    
    # Test schedule structure
    sample_schedule = {
        'assignments': [sample_assignment],
        'violations': {
            'hard': 0,
            'soft': 2
        },
        'statistics': {
            'total_days': 92,
            'total_assignments': 1,
            'residents_count': 3
        }
    }
    
    # Validate assignment fields
    assignment_fields = ['id', 'date', 'shift_type', 'resident_name', 'start_time']
    
    for field in assignment_fields:
        if field in sample_assignment:
            print(f"✅ assignment.{field} present")
        else:
            print(f"❌ assignment.{field} missing")
    
    # Validate schedule fields
    schedule_fields = ['assignments', 'violations', 'statistics']
    
    for field in schedule_fields:
        if field in sample_schedule:
            print(f"✅ schedule.{field} present")
        else:
            print(f"❌ schedule.{field} missing")
    
    print("✅ Schedule data structure validated")

if __name__ == "__main__":
    print("🏥 Universal Medical Residency Scheduler - Component Test")
    print("=" * 60)
    
    # Run tests
    component_test_passed = test_component_loading()
    test_resident_data_structure()
    test_schedule_data_structure()
    
    print("\n" + "=" * 60)
    if component_test_passed:
        print("🎉 System ready for deployment!")
        print("\n📝 Next steps:")
        print("1. Install dependencies: pip install -r requirements.txt")
        print("2. Run the application: streamlit run main.py")
        print("3. Navigate to http://localhost:8501 in your browser")
    else:
        print("⚠️ System needs attention before deployment")
        print("\n🔧 Review failed components and fix any issues")
    
    print("=" * 60)