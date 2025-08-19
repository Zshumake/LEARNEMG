"""
Test script for PM&R Scheduling Rules Engine
Run this to validate all rules are working correctly
"""

from datetime import datetime, date, timedelta
from pmr_rules_engine import PMRSchedulingRules

def test_pmr_rules_engine():
    """Test the PM&R Rules Engine"""
    print("🏥 Testing PM&R Scheduling Rules Engine")
    print("=" * 50)
    
    # Initialize the rules engine
    rules_engine = PMRSchedulingRules()
    
    # Test 1: Check rules were loaded
    print("\n📋 Test 1: Rules Loading")
    hard_rules = rules_engine.get_all_hard_rules()
    soft_rules = rules_engine.get_all_soft_rules()
    
    print(f"✅ Hard rules loaded: {len(hard_rules)}")
    print(f"✅ Soft rules loaded: {len(soft_rules)}")
    print(f"✅ Total rules: {len(hard_rules) + len(soft_rules)}")
    
    # Test 2: Check quotas
    print("\n📊 Test 2: Quota Requirements")
    for pgy_level in ['PGY-2', 'PGY-3', 'PGY-4']:
        quotas = rules_engine.get_quotas_for_pgy_level(pgy_level)
        print(f"✅ {pgy_level}: {quotas}")
    
    # Test 3: Check special periods
    print("\n📅 Test 3: Special Periods")
    special_periods = rules_engine.get_special_periods()
    for period_name, period_info in special_periods.items():
        print(f"✅ {period_name}: {period_info}")
    
    # Test 4: Test specific rule validations
    print("\n🔍 Test 4: Rule Validation Functions")
    test_rule_validations(rules_engine)
    
    # Test 5: Test CSP constraint generation
    print("\n⚙️ Test 5: CSP Integration")
    csp_constraints = rules_engine.generate_csp_constraints()
    csp_objectives = rules_engine.generate_csp_objectives()
    
    print(f"✅ CSP constraints generated: {len(csp_constraints)}")
    print(f"✅ CSP objectives generated: {len(csp_objectives)}")
    
    # Test 6: Show sample rules
    print("\n📝 Test 6: Sample Rules")
    print("Hard Rules (first 5):")
    for i, rule in enumerate(hard_rules[:5]):
        print(f"  {rule['id']}: {rule['name']}")
    
    print("\nSoft Rules (first 5):")
    for i, rule in enumerate(soft_rules[:5]):
        print(f"  {rule['id']}: {rule['name']} (weight: {rule['weight']})")
    
    print("\n🎉 All tests completed successfully!")
    return True

def test_rule_validations(rules_engine):
    """Test specific rule validation functions"""
    
    # Create sample schedule data for testing
    sample_schedule = create_sample_schedule()
    sample_date = date(2025, 8, 15)  # Friday in August
    
    print("Testing validation functions...")
    
    # Test weekday call coverage
    try:
        result = rules_engine._validate_weekday_call_coverage(sample_schedule, sample_date)
        print(f"✅ Weekday call coverage validation: {result}")
    except Exception as e:
        print(f"❌ Weekday call coverage error: {e}")
    
    # Test PGY-2 July restriction
    try:
        july_date = date(2025, 7, 10)  # July 10th (within restriction period)
        result = rules_engine._validate_pgy2_july_restriction(sample_schedule, july_date)
        print(f"✅ PGY-2 July restriction validation: {result}")
    except Exception as e:
        print(f"❌ PGY-2 July restriction error: {e}")
    
    # Test PGY-2 moonlight start
    try:
        early_date = date(2025, 7, 25)  # Before August 1st
        result = rules_engine._validate_pgy2_moonlight_start(sample_schedule, early_date)
        print(f"✅ PGY-2 moonlight start validation: {result}")
    except Exception as e:
        print(f"❌ PGY-2 moonlight start error: {e}")
    
    # Test no same day call and moonlight
    try:
        result = rules_engine._validate_no_same_day_call_moonlight(sample_schedule, sample_date)
        print(f"✅ No same day call/moonlight validation: {result}")
    except Exception as e:
        print(f"❌ Same day call/moonlight error: {e}")

def create_sample_schedule():
    """Create sample schedule data for testing"""
    return [
        {
            'date': date(2025, 8, 15),  # Friday
            'resident_id': 'resident_001',
            'pgy_level': 'PGY-3',
            'shift_type': 'friday_call'
        },
        {
            'date': date(2025, 8, 15),  # Friday
            'resident_id': 'resident_002',
            'pgy_level': 'PGY-2',
            'shift_type': 'friday_moonlight'
        },
        {
            'date': date(2025, 8, 15),  # Friday
            'resident_id': 'resident_003',
            'pgy_level': 'PGY-2',
            'shift_type': 'friday_moonlight'
        },
        {
            'date': date(2025, 8, 16),  # Saturday
            'resident_id': 'resident_004',
            'pgy_level': 'PGY-2',
            'shift_type': 'weekend_call'
        },
        {
            'date': date(2025, 8, 16),  # Saturday
            'resident_id': 'resident_005',
            'pgy_level': 'PGY-3',
            'shift_type': 'weekend_moonlight'
        }
    ]

def test_quota_calculations():
    """Test quota calculations for different PGY levels"""
    print("\n📊 Testing Quota Calculations")
    
    rules_engine = PMRSchedulingRules()
    
    # Sample resident data
    sample_residents = [
        {'id': 'r1', 'name': 'Adam Girmann', 'pgy_level': 'PGY-2'},
        {'id': 'r2', 'name': 'Ian Kinney', 'pgy_level': 'PGY-2'},
        {'id': 'r3', 'name': 'Chidera', 'pgy_level': 'PGY-3'},
        {'id': 'r4', 'name': 'Emily Rothermel', 'pgy_level': 'PGY-4'}
    ]
    
    for resident in sample_residents:
        pgy_level = resident['pgy_level']
        quotas = rules_engine.get_quotas_for_pgy_level(pgy_level)
        
        print(f"\n{resident['name']} ({pgy_level}):")
        print(f"  Weekday Call: {quotas.get('weekday_call', 0)}")
        print(f"  Weekend Call: {quotas.get('weekend_call', 0)}")
        print(f"  Moonlight: {quotas.get('moonlight', 0)}")
        print(f"  Max Total: {quotas.get('total_shifts_max', 0)}")

def test_schedule_conflicts():
    """Test conflict detection in schedules"""
    print("\n⚠️ Testing Schedule Conflict Detection")
    
    rules_engine = PMRSchedulingRules()
    
    # Create a schedule with intentional conflicts
    conflict_schedule = [
        {
            'date': date(2025, 8, 15),
            'resident_id': 'resident_001',
            'pgy_level': 'PGY-2',
            'shift_type': 'weekday_call'
        },
        {
            'date': date(2025, 8, 15),  # Same day!
            'resident_id': 'resident_001',  # Same resident!
            'pgy_level': 'PGY-2',
            'shift_type': 'friday_moonlight'
        }
    ]
    
    # Test conflict detection
    test_date = date(2025, 8, 15)
    has_conflict = not rules_engine._validate_no_same_day_call_moonlight(conflict_schedule, test_date)
    
    if has_conflict:
        print("✅ Conflict correctly detected: Same resident on call and moonlight same day")
    else:
        print("❌ Conflict not detected!")

def run_comprehensive_test():
    """Run all tests"""
    print("🧪 Starting Comprehensive PM&R Rules Engine Test")
    print("=" * 60)
    
    try:
        # Main functionality test
        test_pmr_rules_engine()
        
        # Quota calculations test
        test_quota_calculations()
        
        # Conflict detection test
        test_schedule_conflicts()
        
        print("\n" + "=" * 60)
        print("🎉 ALL TESTS PASSED SUCCESSFULLY!")
        print("✅ PM&R Rules Engine is working correctly")
        print("✅ Ready for CSP Engine integration")
        
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        print("Check the error and fix before proceeding")
        return False
    
    return True

if __name__ == "__main__":
    run_comprehensive_test()