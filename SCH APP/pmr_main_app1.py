import streamlit as st
import pandas as pd
from datetime import datetime, timedelta, date
import json
import time
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum
import calendar

# Configure Streamlit page
st.set_page_config(
    page_title="PM&R Sequential Schedule Generator",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main-header {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 2rem;
    }
    .stat-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
        margin: 0.5rem 0;
    }
    .stat-number {
        font-size: 2em;
        font-weight: bold;
    }
    .shift-call {
        background: #e3f2fd;
        color: #1565c0;
        padding: 2px 6px;
        border-radius: 4px;
        margin: 1px;
        font-size: 0.8em;
        border-left: 4px solid #1976d2;
    }
    .shift-moonlight {
        background: #f3e5f5;
        color: #7b1fa2;
        padding: 2px 6px;
        border-radius: 4px;
        margin: 1px;
        font-size: 0.8em;
        border-left: 4px solid #8e24aa;
    }
    .shift-weekend {
        background: #e8f5e8;
        color: #2e7d32;
        padding: 2px 6px;
        border-radius: 4px;
        margin: 1px;
        font-size: 0.8em;
        border-left: 4px solid #388e3c;
        font-weight: bold;
    }
    .violation-warning {
        background: #ffebee;
        border-left: 4px solid #f44336;
        padding: 0.5rem;
        margin: 0.2rem 0;
    }
    .request-honored {
        background: #e8f5e8;
        border-left: 4px solid #4caf50;
        padding: 0.5rem;
        margin: 0.2rem 0;
    }
    .no-coverage {
        background: #ffcdd2;
        border: 2px dashed #f44336;
        padding: 0.5rem;
        text-align: center;
        color: #d32f2f;
    }
</style>
""", unsafe_allow_html=True)

@dataclass
class Resident:
    name: str
    pgy_level: int
    annual_quotas: Dict[str, float]
    time_off: List[str]
    specific_requests: List[str]
    quarter_targets: Dict[str, float]
    current_stats: Dict[str, int] = field(default_factory=lambda: {"call": 0, "moonlight": 0, "weekend": 0})
    has_done_first_weekend: bool = False
    last_weekend_moonlight: Optional[str] = None
    last_assigned: Optional[str] = None
    display_name: str = ""
    
    def __post_init__(self):
        if not self.display_name:
            if self.name == 'Natalie Brush':
                self.display_name = 'Natalie B'
            elif self.name == 'Natalie Cignetti':
                self.display_name = 'Natalie C'
            else:
                self.display_name = self.name.split(' ')[0]

@dataclass
class Shift:
    date: str
    shift_type: str
    resident: str
    pgy_level: int
    assigned_time: str = ""
    
    def __post_init__(self):
        if not self.assigned_time:
            self.assigned_time = datetime.now().isoformat()

@dataclass
class ScheduleStats:
    days_processed: int = 0
    shifts_assigned: int = 0
    rules_checked: int = 0
    violations_found: int = 0
    fixes_applied: int = 0
    requests_honored: int = 0

class PMRSequentialGenerator:
    def __init__(self):
        self.residents = self._initialize_residents()
        self.schedule = {}
        self.current_date = datetime(2025, 7, 1)
        self.end_date = datetime(2025, 9, 30)
        self.stats = ScheduleStats()
        self.log_entries = []
        self.weekend_coverage_issues = []
        self.is_generating = False

    def _initialize_residents(self) -> Dict[str, Resident]:
        residents_data = [
            # PGY-2s
            {
                'name': 'Adam Girmann',
                'pgy_level': 2,
                'annual_quotas': {'call': 38, 'moonlight': 21, 'weekend': 7.5},
                'time_off': ['2025-08-11'],
                'specific_requests': ['2025-08-14'],
                'quarter_targets': {'call': 10, 'moonlight': 5, 'weekend': 2}
            },
            {
                'name': 'Ian Kinney',
                'pgy_level': 2,
                'annual_quotas': {'call': 38, 'moonlight': 21, 'weekend': 7.5},
                'time_off': ['2025-08-28', '2025-08-29', '2025-08-30', '2025-08-31', '2025-09-01'],
                'specific_requests': [],
                'quarter_targets': {'call': 10, 'moonlight': 5, 'weekend': 2}
            },
            {
                'name': 'Alexis Smith',
                'pgy_level': 2,
                'annual_quotas': {'call': 38, 'moonlight': 21, 'weekend': 7.5},
                'time_off': ['2025-07-11', '2025-07-12', '2025-07-13', '2025-07-31', '2025-08-01', '2025-08-02', '2025-08-29', '2025-08-30', '2025-08-31'],
                'specific_requests': [],
                'quarter_targets': {'call': 10, 'moonlight': 5, 'weekend': 2}
            },
            {
                'name': 'Leah Flanagan',
                'pgy_level': 2,
                'annual_quotas': {'call': 38, 'moonlight': 21, 'weekend': 7.5},
                'time_off': ['2025-07-11', '2025-07-12', '2025-07-13', '2025-07-18', '2025-07-19', '2025-07-20', '2025-08-18', '2025-08-19', '2025-08-20', '2025-08-21', '2025-08-22', '2025-08-23', '2025-08-24'],
                'specific_requests': [],
                'quarter_targets': {'call': 10, 'moonlight': 5, 'weekend': 2}
            },
            {
                'name': 'Bobby McBride',
                'pgy_level': 2,
                'annual_quotas': {'call': 38, 'moonlight': 21, 'weekend': 7.5},
                'time_off': ['2025-07-25', '2025-07-26', '2025-07-27', '2025-08-22', '2025-08-23', '2025-08-24', '2025-09-17', '2025-09-18', '2025-09-19', '2025-09-20', '2025-09-21'],
                'specific_requests': ['2025-07-24', '2025-09-29'],
                'quarter_targets': {'call': 10, 'moonlight': 5, 'weekend': 2}
            },
            # PGY-3s
            {
                'name': 'Chidera Uzowihe',
                'pgy_level': 3,
                'annual_quotas': {'call': 30, 'moonlight': 27, 'weekend': 2.5},
                'time_off': ['2025-07-11', '2025-07-12', '2025-07-13', '2025-07-18', '2025-07-19', '2025-07-20', '2025-08-02', '2025-08-30', '2025-08-31', '2025-09-20', '2025-09-25', '2025-09-26', '2025-09-27', '2025-09-28'],
                'specific_requests': [],
                'quarter_targets': {'call': 8, 'moonlight': 7, 'weekend': 1}
            },
            {
                'name': 'Daniel DeSimon',
                'pgy_level': 3,
                'annual_quotas': {'call': 30, 'moonlight': 27, 'weekend': 2.5},
                'time_off': ['2025-08-22', '2025-08-23', '2025-08-24', '2025-08-29', '2025-08-30', '2025-08-31', '2025-09-01', '2025-09-06', '2025-09-07', '2025-09-08', '2025-09-09', '2025-09-10', '2025-09-11', '2025-09-12', '2025-09-13', '2025-09-14'],
                'specific_requests': ['2025-07-12', '2025-07-13', '2025-08-07', '2025-09-04'],
                'quarter_targets': {'call': 8, 'moonlight': 7, 'weekend': 1}
            },
            {
                'name': 'Nic Brandt',
                'pgy_level': 3,
                'annual_quotas': {'call': 30, 'moonlight': 27, 'weekend': 2.5},
                'time_off': ['2025-07-05', '2025-07-06', '2025-09-26', '2025-09-27', '2025-09-28', '2025-09-29', '2025-09-30'],
                'specific_requests': [],
                'quarter_targets': {'call': 8, 'moonlight': 7, 'weekend': 1}
            },
            {
                'name': 'Jaymi Bautista-Whitaker',
                'pgy_level': 3,
                'annual_quotas': {'call': 30, 'moonlight': 27, 'weekend': 2.5},
                'time_off': ['2025-07-05', '2025-07-06', '2025-08-15', '2025-08-30', '2025-08-31', '2025-09-01'],
                'specific_requests': ['2025-09-08', '2025-09-22'],
                'quarter_targets': {'call': 8, 'moonlight': 7, 'weekend': 1}
            },
            # PGY-4s
            {
                'name': 'Emily Rothermel',
                'pgy_level': 4,
                'annual_quotas': {'call': 5, 'moonlight': 27, 'weekend': 0.5},
                'time_off': ['2025-09-19', '2025-09-20', '2025-09-21', '2025-09-22'],
                'specific_requests': [],
                'quarter_targets': {'call': 1, 'moonlight': 7, 'weekend': 0}
            },
            {
                'name': 'Zachary Shumaker',
                'pgy_level': 4,
                'annual_quotas': {'call': 5, 'moonlight': 27, 'weekend': 0.5},
                'time_off': ['2025-07-04', '2025-07-05', '2025-07-25', '2025-07-26', '2025-07-27', '2025-07-28', '2025-07-29', '2025-07-30', '2025-07-31', '2025-08-01', '2025-08-02', '2025-08-03', '2025-08-22', '2025-08-23', '2025-08-24', '2025-09-22'],
                'specific_requests': ['2025-07-24'],
                'quarter_targets': {'call': 1, 'moonlight': 7, 'weekend': 0}
            },
            {
                'name': 'Natalie Brush',
                'pgy_level': 4,
                'annual_quotas': {'call': 5, 'moonlight': 27, 'weekend': 0.5},
                'time_off': ['2025-09-05', '2025-09-06', '2025-09-07', '2025-09-08', '2025-09-09', '2025-09-10', '2025-09-11', '2025-09-12', '2025-09-13'],
                'specific_requests': [],
                'quarter_targets': {'call': 1, 'moonlight': 7, 'weekend': 0}
            },
            {
                'name': 'Natalie Cignetti',
                'pgy_level': 4,
                'annual_quotas': {'call': 5, 'moonlight': 27, 'weekend': 0.5},
                'time_off': ['2025-07-04', '2025-07-05', '2025-07-06', '2025-08-01', '2025-08-02', '2025-08-03', '2025-08-29', '2025-08-30', '2025-08-31', '2025-09-01', '2025-09-19', '2025-09-20', '2025-09-21'],
                'specific_requests': ['2025-07-19'],
                'quarter_targets': {'call': 1, 'moonlight': 7, 'weekend': 0}
            },
            {
                'name': 'Gage Powell',
                'pgy_level': 4,
                'annual_quotas': {'call': 5, 'moonlight': 27, 'weekend': 0.5},
                'time_off': ['2025-07-04', '2025-07-05', '2025-07-06', '2025-07-22', '2025-08-01', '2025-08-02', '2025-08-03', '2025-08-04', '2025-08-14', '2025-08-15', '2025-08-16', '2025-08-17', '2025-08-18', '2025-08-28', '2025-08-29', '2025-08-30', '2025-08-31', '2025-09-01', '2025-09-04', '2025-09-05', '2025-09-06', '2025-09-07', '2025-09-08', '2025-09-26', '2025-09-27', '2025-09-28'],
                'specific_requests': [],
                'quarter_targets': {'call': 1, 'moonlight': 7, 'weekend': 0}
            }
        ]
        
        residents = {}
        for data in residents_data:
            resident = Resident(**data)
            residents[resident.name] = resident
        
        return residents

    def log(self, message: str, level: str = 'info'):
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_entries.append({
            'time': timestamp,
            'level': level,
            'message': message
        })

    def reset_schedule(self):
        self.schedule = {}
        self.current_date = datetime(2025, 7, 1)
        self.stats = ScheduleStats()
        self.log_entries = []
        self.weekend_coverage_issues = []
        self.is_generating = False
        
        for resident in self.residents.values():
            resident.current_stats = {"call": 0, "moonlight": 0, "weekend": 0}
            resident.has_done_first_weekend = False
            resident.last_weekend_moonlight = None
            resident.last_assigned = None
        
        self.log('Schedule reset', 'info')

    def is_resident_available(self, resident_name: str, date_str: str) -> bool:
        resident = self.residents[resident_name]
        
        if date_str in resident.time_off:
            return False
        
        if date_str in self.schedule:
            for shift in self.schedule[date_str]:
                if shift.resident == resident_name:
                    return False
        
        return True

    def check_pgy2_blackouts(self, resident_name: str, date: datetime, shift_type: str) -> bool:
        resident = self.residents[resident_name]
        if resident.pgy_level != 2:
            return True
        
        if 'call' in shift_type and date < datetime(2025, 7, 15):
            return False
        
        if 'moonlight' in shift_type and date < datetime(2025, 8, 1):
            return False
        
        return True

    def check_consecutive_days(self, resident_name: str, date: datetime) -> bool:
        yesterday = date - timedelta(days=1)
        yesterday_str = yesterday.strftime('%Y-%m-%d')
        
        if yesterday_str in self.schedule:
            for shift in self.schedule[yesterday_str]:
                if shift.resident == resident_name:
                    if not (yesterday.weekday() == 4 and date.weekday() == 5):
                        return False
        
        return True

    def check_weekly_limits(self, resident_name: str, date: datetime) -> bool:
        week_start = date - timedelta(days=date.weekday() + 1)
        if date.weekday() == 6:
            week_start = date
        
        weekly_shifts = 0
        for i in range(7):
            check_date = week_start + timedelta(days=i)
            check_date_str = check_date.strftime('%Y-%m-%d')
            
            if check_date_str in self.schedule:
                for shift in self.schedule[check_date_str]:
                    if shift.resident == resident_name:
                        weekly_shifts += 1
        
        is_weekend_assignment = date.weekday() == 5
        potential_shifts = 2 if is_weekend_assignment else 1
        
        return (weekly_shifts + potential_shifts) <= 2

    def get_eligible_residents(self, date_str: str, shift_type: str, exclude_residents: List[str] = None, pgy_level: int = None) -> List[str]:
        if exclude_residents is None:
            exclude_residents = []
        
        date = datetime.strptime(date_str, '%Y-%m-%d')
        candidates = []
        
        for name, resident in self.residents.items():
            if name in exclude_residents:
                continue
            if pgy_level and resident.pgy_level != pgy_level:
                continue
            
            self.stats.rules_checked += 1
            
            if not self.is_resident_available(name, date_str):
                continue
            
            if not self.check_pgy2_blackouts(name, date, shift_type):
                continue
            
            if shift_type == 'weekday_call' and date.weekday() == 4 and resident.pgy_level != 3:
                continue
            
            if 'weekend' in shift_type:
                weekend_number = self.get_weekend_number(date)
                if weekend_number <= 2 and resident.pgy_level != 3:
                    continue
                if weekend_number > 2 and shift_type == 'weekend_call' and resident.pgy_level != 2:
                    continue
            
            if not self.check_consecutive_days(name, date):
                continue
            
            if not self.check_weekly_limits(name, date):
                continue
            
            candidates.append(name)
        
        return candidates

    def get_quota_debt(self, resident_name: str, shift_type: str) -> float:
        resident = self.residents[resident_name]
        target = resident.quarter_targets[shift_type]
        current = resident.current_stats[shift_type]
        
        quarter_start = datetime(2025, 7, 1)
        quarter_end = datetime(2025, 9, 30)
        total_days = (quarter_end - quarter_start).days + 1
        
        days_passed = max(0, (self.current_date - quarter_start).days)
        progress_ratio = min(1, days_passed / total_days)
        
        if shift_type == 'weekend':
            progress_ratio = max(0.3, progress_ratio)
        
        expected_progress = target * progress_ratio
        return max(0, expected_progress - current)

    def select_best_candidate(self, candidates: List[str], shift_type: str) -> Optional[str]:
        if not candidates:
            return None
        if len(candidates) == 1:
            return candidates[0]
        
        def sort_key(name):
            resident = self.residents[name]
            target = resident.quarter_targets[shift_type]
            current = resident.current_stats[shift_type]
            
            below_target = current < target
            debt = self.get_quota_debt(name, shift_type)
            total_shifts = sum(resident.current_stats.values())
            
            return (not below_target, -debt, total_shifts)
        
        sorted_candidates = sorted(candidates, key=sort_key)
        return sorted_candidates[0]

    def assign_shift(self, date_str: str, shift_type: str, resident_name: str):
        if date_str not in self.schedule:
            self.schedule[date_str] = []
        
        shift = Shift(
            date=date_str,
            shift_type=shift_type,
            resident=resident_name,
            pgy_level=self.residents[resident_name].pgy_level
        )
        
        self.schedule[date_str].append(shift)
        
        if 'call' in shift_type:
            self.residents[resident_name].current_stats['call'] += 1
        elif 'moonlight' in shift_type:
            self.residents[resident_name].current_stats['moonlight'] += 1
        elif 'weekend' in shift_type:
            self.residents[resident_name].current_stats['weekend'] += 1
        
        self.residents[resident_name].last_assigned = date_str
        self.stats.shifts_assigned += 1
        
        self.log(f'✅ Assigned {shift_type} to {resident_name} on {date_str}', 'success')

    def check_specific_requests(self, date_str: str) -> Optional[str]:
        for name, resident in self.residents.items():
            if date_str in resident.specific_requests:
                return name
        return None

    def process_specific_request(self, date_str: str, requested_resident: str, day_of_week: int):
        self.log(f'Processing specific request for {requested_resident} on {date_str}', 'info')
        
        conflicting_requests = []
        for name, resident in self.residents.items():
            if name != requested_resident and date_str in resident.specific_requests:
                conflicting_requests.append(name)
        
        if conflicting_requests:
            self.log(f'⚠️ Request conflict on {date_str}: {requested_resident} vs {", ".join(conflicting_requests)}', 'warning')
            self.log(f'✅ Resolving: {requested_resident} gets priority (first processed)', 'info')
            
            for name in conflicting_requests:
                self.log(f'❌ Denied request: {name} for {date_str} (conflict with {requested_resident})', 'warning')
        
        if self.validate_specific_request(date_str, requested_resident):
            self.assign_shift(date_str, 'weekday_call', requested_resident)
            self.stats.requests_honored += 1
            self.log(f'✅ Honored request: {requested_resident} gets call on {date_str}', 'success')
            
            if day_of_week == 4:
                self.assign_friday_moonlights(date_str, [requested_resident])
            else:
                self.assign_weekday_moonlight(date_str, [requested_resident])
        else:
            self.log(f'❌ Cannot honor request for {requested_resident} due to rule violations', 'warning')
            self.stats.violations_found += 1
            
            call_resident = self.assign_weekday_call(date_str, day_of_week)
            if day_of_week == 4:
                self.assign_friday_moonlights(date_str, [call_resident] if call_resident else [])
            else:
                self.assign_weekday_moonlight(date_str, [call_resident] if call_resident else [])

    def validate_specific_request(self, date_str: str, resident_name: str) -> bool:
        date = datetime.strptime(date_str, '%Y-%m-%d')
        
        if not self.is_resident_available(resident_name, date_str):
            return False
        
        if not self.check_pgy2_blackouts(resident_name, date, 'call'):
            return False
        
        if not self.check_consecutive_days(resident_name, date):
            return False
        
        if not self.check_weekly_limits(resident_name, date):
            return False
        
        return True

    def assign_weekday_call(self, date_str: str, day_of_week: int) -> Optional[str]:
        candidates = self.get_eligible_residents(date_str, 'weekday_call')
        
        if not candidates:
            self.log(f'❌ No eligible residents for call on {date_str}', 'error')
            self.stats.violations_found += 1
            return None
        
        selected_resident = self.select_best_candidate(candidates, 'call')
        if selected_resident:
            self.assign_shift(date_str, 'weekday_call', selected_resident)
        
        return selected_resident

    def assign_weekday_moonlight(self, date_str: str, exclude_residents: List[str]):
        candidates = self.get_eligible_residents(date_str, 'weekday_moonlight', exclude_residents)
        
        if not candidates:
            self.log(f'❌ No eligible residents for moonlight on {date_str}', 'error')
            self.stats.violations_found += 1
            return None
        
        selected_resident = self.select_best_candidate(candidates, 'moonlight')
        if selected_resident:
            self.assign_shift(date_str, 'weekday_moonlight', selected_resident)
        
        return selected_resident

    def assign_friday_moonlights(self, date_str: str, exclude_residents: List[str]):
        candidates = self.get_eligible_residents(date_str, 'friday_moonlight', exclude_residents)
        
        if len(candidates) < 2:
            self.log(f'⚠️ Only {len(candidates)} eligible for Friday moonlights on {date_str}', 'warning')
        
        if candidates:
            first = self.select_best_candidate(candidates, 'moonlight')
            self.assign_shift(date_str, 'friday_moonlight_1', first)
            
            remaining_candidates = [c for c in candidates if c != first]
            
            if remaining_candidates:
                second = self.select_best_candidate(remaining_candidates, 'moonlight')
                self.assign_shift(date_str, 'friday_moonlight_2', second)

    def get_weekend_number(self, date: datetime) -> int:
        first_saturday = datetime(2025, 7, 5)
        days_diff = (date - first_saturday).days
        return (days_diff // 7) + 1

    def process_weekend(self, date_str: str):
        date = datetime.strptime(date_str, '%Y-%m-%d')
        weekend_number = self.get_weekend_number(date)
        
        sunday = date + timedelta(days=1)
        sunday_str = sunday.strftime('%Y-%m-%d')
        
        self.log(f'Processing Weekend #{weekend_number} ({date_str})', 'info')
        
        if sunday_str not in self.schedule:
            self.schedule[sunday_str] = []
        
        if weekend_number <= 2:
            self.process_pgy3_weekend(date_str, sunday_str, weekend_number)
        else:
            self.process_pgy2_weekend(date_str, sunday_str, weekend_number)

    def process_pgy3_weekend(self, date_str: str, sunday_str: str, weekend_number: int):
        self.log(f'Assigning PGY-3 split weekend for weekend #{weekend_number}', 'info')
        
        pgy3_candidates = []
        for name, resident in self.residents.items():
            if (resident.pgy_level == 3 and 
                self.is_resident_available(name, date_str) and 
                self.is_resident_available(name, sunday_str)):
                pgy3_candidates.append(name)
        
        if len(pgy3_candidates) < 2:
            self.log(f'❌ Insufficient PGY-3s for weekend split ({len(pgy3_candidates)}/2)', 'error')
            self.stats.violations_found += 1
            self.weekend_coverage_issues.append({
                'date': date_str,
                'type': 'insufficient_pgy3s',
                'available': pgy3_candidates,
                'needed': 2
            })
            return
        
        sorted_candidates = sorted(pgy3_candidates, 
                                 key=lambda x: self.get_quota_debt(x, 'weekend'), 
                                 reverse=True)
        
        primary = sorted_candidates[0]
        secondary = sorted_candidates[1]
        
        self.assign_shift(date_str, 'weekend_call', primary)
        self.assign_shift(date_str, 'split_call', secondary)
        self.assign_shift(sunday_str, 'weekend_call', primary)
        self.assign_shift(sunday_str, 'split_call', secondary)
        
        self.log(f'✅ PGY-3 weekend: {primary} (primary) + {secondary} (secondary)', 'success')
        
        self.assign_weekend_moonlight(date_str, sunday_str, [primary, secondary])

    def process_pgy2_weekend(self, date_str: str, sunday_str: str, weekend_number: int):
        self.log(f'Assigning PGY-2 weekend for weekend #{weekend_number}', 'info')
        
        pgy2_candidates = []
        for name, resident in self.residents.items():
            if (resident.pgy_level == 2 and 
                self.is_resident_available(name, date_str) and 
                self.is_resident_available(name, sunday_str)):
                pgy2_candidates.append(name)
        
        if not pgy2_candidates:
            self.log('❌ No available PGY-2s for weekend', 'error')
            self.stats.violations_found += 1
            self.weekend_coverage_issues.append({
                'date': date_str,
                'type': 'no_pgy2s',
                'available': [],
                'needed': 1
            })
            return
        
        def sort_key(name):
            resident = self.residents[name]
            first_weekend_done = resident.has_done_first_weekend
            quota_debt = self.get_quota_debt(name, 'weekend')
            return (first_weekend_done, -quota_debt)
        
        sorted_candidates = sorted(pgy2_candidates, key=sort_key)
        primary_pgy2 = sorted_candidates[0]
        is_first_weekend = not self.residents[primary_pgy2].has_done_first_weekend
        
        self.assign_shift(date_str, 'weekend_call', primary_pgy2)
        self.assign_shift(sunday_str, 'weekend_call', primary_pgy2)
        
        exclude_list = [primary_pgy2]
        
        if is_first_weekend:
            pgy4_candidates = []
            for name, resident in self.residents.items():
                if (resident.pgy_level == 4 and 
                    name not in exclude_list and
                    self.is_resident_available(name, date_str) and 
                    self.is_resident_available(name, sunday_str)):
                    pgy4_candidates.append(name)
            
            if pgy4_candidates:
                mentor_pgy4 = self.select_best_candidate(pgy4_candidates, 'weekend')
                self.assign_shift(date_str, 'split_call', mentor_pgy4)
                self.assign_shift(sunday_str, 'split_call', mentor_pgy4)
                exclude_list.append(mentor_pgy4)
                
                self.residents[primary_pgy2].has_done_first_weekend = True
                self.log(f'✅ PGY-4 mentor: {mentor_pgy4} for {primary_pgy2}\'s first weekend', 'success')
        
        self.assign_backup_call(date_str, sunday_str, primary_pgy2, exclude_list)
        self.assign_weekend_moonlight(date_str, sunday_str, exclude_list)
        
        weekend_type = ' (FIRST WEEKEND)' if is_first_weekend else ''
        self.log(f'✅ PGY-2 weekend: {primary_pgy2}{weekend_type}', 'success')

    def assign_backup_call(self, date_str: str, sunday_str: str, primary_resident: str, exclude_list: List[str]):
        primary_level = self.residents[primary_resident].pgy_level
        backup_candidates = []
        
        for name, resident in self.residents.items():
            if (resident.pgy_level == primary_level and
                name not in exclude_list and
                self.is_resident_available(name, date_str) and
                self.is_resident_available(name, sunday_str)):
                backup_candidates.append(name)
        
        if backup_candidates:
            backup_resident = self.select_best_candidate(backup_candidates, 'call')
            self.assign_shift(date_str, 'backup_call', backup_resident)
            self.assign_shift(sunday_str, 'backup_call', backup_resident)
            self.log(f'✅ Backup call: {backup_resident}', 'success')
        else:
            self.log(f'⚠️ No backup call available for weekend {date_str}', 'warning')

    def assign_weekend_moonlight(self, date_str: str, sunday_str: str, exclude_list: List[str]):
        candidates = []
        
        for name, resident in self.residents.items():
            if ((resident.pgy_level == 3 or resident.pgy_level == 4) and 
                name not in exclude_list and
                self.is_resident_available(name, date_str) and 
                self.is_resident_available(name, sunday_str)):
                candidates.append(name)
        
        if candidates:
            def sort_key(name):
                resident = self.residents[name]
                last_weekend = resident.last_weekend_moonlight
                
                if not last_weekend:
                    return (0, -self.get_quota_debt(name, 'moonlight'))
                
                last_date = datetime.strptime(last_weekend, '%Y-%m-%d')
                gap_days = (datetime.strptime(date_str, '%Y-%m-%d') - last_date).days
                return (1, -gap_days, -self.get_quota_debt(name, 'moonlight'))
            
            sorted_candidates = sorted(candidates, key=sort_key)
            moonlight_resident = sorted_candidates[0]
            
            self.assign_shift(date_str, 'weekend_moonlight', moonlight_resident)
            self.assign_shift(sunday_str, 'weekend_moonlight', moonlight_resident)
            
            self.residents[moonlight_resident].last_weekend_moonlight = date_str
            self.log(f'✅ Weekend moonlight: {moonlight_resident}', 'success')
        else:
            self.log(f'⚠️ No weekend moonlight available for {date_str}', 'warning')

    def process_weekday(self, date_str: str, day_of_week: int):
        requested_resident = self.check_specific_requests(date_str)
        if requested_resident:
            self.process_specific_request(date_str, requested_resident, day_of_week)
            return
        
        call_resident = self.assign_weekday_call(date_str, day_of_week)
        
        if day_of_week == 4:
            self.assign_friday_moonlights(date_str, [call_resident] if call_resident else [])
        else:
            self.assign_weekday_moonlight(date_str, [call_resident] if call_resident else [])

    def process_day(self, date_str: str):
        date = datetime.strptime(date_str, '%Y-%m-%d')
        day_of_week = date.weekday()
        day_name = date.strftime('%A')
        
        self.log(f'Processing {day_name} {date_str}', 'info')
        
        if date_str not in self.schedule:
            self.schedule[date_str] = []
        
        if day_of_week <= 4:
            self.process_weekday(date_str, day_of_week)
        elif day_of_week == 5:
            self.process_weekend(date_str)
        
        self.stats.days_processed += 1

    def generate_schedule(self) -> bool:
        try:
            self.reset_schedule()
            self.is_generating = True
            self.log('Starting sequential generation for Q3 2025...', 'info')
            
            current = self.current_date
            while current <= self.end_date:
                date_str = current.strftime('%Y-%m-%d')
                self.current_date = current
                self.process_day(date_str)
                current += timedelta(days=1)
            
            self.is_generating = False
            self.log('🎉 Sequential generation complete!', 'success')
            self.log(f'Total stats: {self.stats.shifts_assigned} shifts, {self.stats.violations_found} violations, {self.stats.requests_honored} requests honored', 'info')
            
            return True
        except Exception as e:
            self.is_generating = False
            self.log(f'❌ Generation failed: {str(e)}', 'error')
            return False

    def get_unavailability_reasons(self, resident_name: str, date_str: str) -> List[str]:
        resident = self.residents[resident_name]
        date = datetime.strptime(date_str, '%Y-%m-%d')
        reasons = []
        
        if date_str in resident.time_off:
            reasons.append('Time off')
        
        if date_str in self.schedule:
            for shift in self.schedule[date_str]:
                if shift.resident == resident_name:
                    reasons.append('Already assigned')
                    break
        
        if resident.pgy_level == 2:
            if date < datetime(2025, 7, 15):
                reasons.append('PGY-2 call blackout')
            if date < datetime(2025, 8, 1):
                reasons.append('PGY-2 moonlight blackout')
        
        yesterday = date - timedelta(days=1)
        yesterday_str = yesterday.strftime('%Y-%m-%d')
        
        if yesterday_str in self.schedule:
            for shift in self.schedule[yesterday_str]:
                if shift.resident == resident_name:
                    reasons.append('Consecutive day rule')
                    break
        
        week_start = date - timedelta(days=date.weekday() + 1)
        if date.weekday() == 6:
            week_start = date
        
        weekly_shifts = 0
        for i in range(7):
            check_date = week_start + timedelta(days=i)
            check_date_str = check_date.strftime('%Y-%m-%d')
            
            if check_date_str in self.schedule:
                for shift in self.schedule[check_date_str]:
                    if shift.resident == resident_name:
                        weekly_shifts += 1
        
        if weekly_shifts >= 2:
            reasons.append('Weekly limit (2 shifts)')
        
        return reasons if reasons else ['Available']

    def apply_override(self, date_str: str, resident_name: str, shift_type: str):
        self.log(f'🔧 Chief override: Assigning {resident_name} to {date_str} ({shift_type})', 'warning')
        
        if date_str in self.schedule:
            self.schedule[date_str] = [s for s in self.schedule[date_str] 
                                     if not (shift_type in s.shift_type or s.shift_type in shift_type)]
        
        self.assign_shift(date_str, shift_type, resident_name)
        self.stats.fixes_applied += 1
        
        return True

# Initialize session state
if 'scheduler' not in st.session_state:
    st.session_state.scheduler = PMRSequentialGenerator()
if 'schedule_generated' not in st.session_state:
    st.session_state.schedule_generated = False

# Main UI functions
def main():
    st.markdown('<h1 class="main-header">🏥 PM&R Sequential Schedule Generator</h1>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center; color: #7f8c8d;">Real-time Rule Monitoring & Sequential Processing</p>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center;">✅ Processes dates sequentially • ✅ Real-time rule checking • ✅ Dynamic adjustments</p>', unsafe_allow_html=True)
    
    with st.sidebar:
        st.header("🎛️ Controls")
        
        col1, col2 = st.columns(2)
        with col1:
            if st.button("🚀 Generate", use_container_width=True, type="primary"):
                with st.spinner("Generating schedule..."):
                    success = st.session_state.scheduler.generate_schedule()
                    if success:
                        st.session_state.schedule_generated = True
                        st.success("Schedule generated successfully!")
                        st.rerun()
                    else:
                        st.error("Schedule generation failed!")
        
        with col2:
            if st.button("🔄 Reset", use_container_width=True):
                st.session_state.scheduler.reset_schedule()
                st.session_state.schedule_generated = False
                st.success("Schedule reset!")
                st.rerun()
        
        if st.session_state.schedule_generated:
            st.header("📤 Export")
            
            export_data = {
                'quarter': 'Q3_2025',
                'schedule': {date: [{'shift_type': s.shift_type, 'resident': s.resident, 'pgy_level': s.pgy_level} 
                           for s in shifts] for date, shifts in st.session_state.scheduler.schedule.items()},
                'residents': {name: {'name': r.name, 'pgy_level': r.pgy_level, 'current_stats': r.current_stats}
                            for name, r in st.session_state.scheduler.residents.items()},
                'stats': {
                    'days_processed': st.session_state.scheduler.stats.days_processed,
                    'shifts_assigned': st.session_state.scheduler.stats.shifts_assigned,
                    'violations_found': st.session_state.scheduler.stats.violations_found,
                    'requests_honored': st.session_state.scheduler.stats.requests_honored
                },
                'generated_at': datetime.now().isoformat()
            }
            
            json_data = json.dumps(export_data, indent=2)
            st.download_button(
                label="💾 Download JSON",
                data=json_data,
                file_name=f"pmr_schedule_q3_2025_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                mime="application/json",
                use_container_width=True
            )
    
    if st.session_state.schedule_generated:
        display_schedule()
    else:
        display_welcome()

def display_welcome():
    st.info("👋 Welcome to the PM&R Schedule Generator! Click 'Generate' in the sidebar to create a new schedule.")
    
    st.subheader("👥 Resident Overview")
    
    residents_df = pd.DataFrame([
        {
            'Name': r.display_name,
            'PGY Level': r.pgy_level,
            'Call Target': r.quarter_targets['call'],
            'Moonlight Target': r.quarter_targets['moonlight'],
            'Weekend Target': r.quarter_targets['weekend'],
            'Time Off Days': len(r.time_off),
            'Specific Requests': len(r.specific_requests)
        }
        for r in st.session_state.scheduler.residents.values()
    ])
    
    st.dataframe(residents_df, use_container_width=True, hide_index=True)

def display_schedule():
    scheduler = st.session_state.scheduler
    
    display_statistics()
    
    st.header("📅 Schedule Calendar")
    
    month_col1, month_col2, month_col3 = st.columns(3)
    
    with month_col1:
        if st.button("July 2025", use_container_width=True):
            st.session_state.selected_month = 'july'
    with month_col2:
        if st.button("August 2025", use_container_width=True):
            st.session_state.selected_month = 'august'
    with month_col3:
        if st.button("September 2025", use_container_width=True):
            st.session_state.selected_month = 'september'
    
    if 'selected_month' not in st.session_state:
        st.session_state.selected_month = 'july'
    
    display_month_calendar(st.session_state.selected_month)
    display_quota_tracking()
    display_monitoring_log()
    display_override_section()

def display_statistics():
    scheduler = st.session_state.scheduler
    stats = scheduler.stats
    
    st.subheader("📊 Schedule Statistics")
    
    col1, col2, col3, col4, col5, col6 = st.columns(6)
    
    with col1:
        st.markdown(f'''
        <div class="stat-card">
            <div class="stat-number">{stats.days_processed}</div>
            <div>Days Processed</div>
        </div>
        ''', unsafe_allow_html=True)
    
    with col2:
        st.markdown(f'''
        <div class="stat-card">
            <div class="stat-number">{stats.shifts_assigned}</div>
            <div>Shifts Assigned</div>
        </div>
        ''', unsafe_allow_html=True)
    
    with col3:
        st.markdown(f'''
        <div class="stat-card">
            <div class="stat-number">{stats.rules_checked}</div>
            <div>Rules Checked</div>
        </div>
        ''', unsafe_allow_html=True)
    
    with col4:
        st.markdown(f'''
        <div class="stat-card">
            <div class="stat-number">{stats.violations_found}</div>
            <div>Violations Found</div>
        </div>
        ''', unsafe_allow_html=True)
    
    with col5:
        st.markdown(f'''
        <div class="stat-card">
            <div class="stat-number">{stats.fixes_applied}</div>
            <div>Fixes Applied</div>
        </div>
        ''', unsafe_allow_html=True)
    
    with col6:
        st.markdown(f'''
        <div class="stat-card">
            <div class="stat-number">{stats.requests_honored}</div>
            <div>Requests Honored</div>
        </div>
        ''', unsafe_allow_html=True)

def display_month_calendar(month: str):
    scheduler = st.session_state.scheduler
    
    if month == 'july':
        start_date = datetime(2025, 7, 1)
        end_date = datetime(2025, 7, 31)
        month_name = "July 2025"
    elif month == 'august':
        start_date = datetime(2025, 8, 1)
        end_date = datetime(2025, 8, 31)
        month_name = "August 2025"
    else:
        start_date = datetime(2025, 9, 1)
        end_date = datetime(2025, 9, 30)
        month_name = "September 2025"
    
    st.subheader(f"📅 {month_name}")
    
    cal = calendar.monthcalendar(start_date.year, start_date.month)
    
    day_names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    cols = st.columns(7)
    for i, day_name in enumerate(day_names):
        with cols[i]:
            st.markdown(f"**{day_name}**")
    
    for week in cal:
        cols = st.columns(7)
        for i, day in enumerate(week):
            with cols[i]:
                if day == 0:
                    st.write("")
                else:
                    date_obj = datetime(start_date.year, start_date.month, day)
                    date_str = date_obj.strftime('%Y-%m-%d')
                    
                    shifts = scheduler.schedule.get(date_str, [])
                    
                    if shifts:
                        shift_html = f"<strong>{day}</strong><br>"
                        for shift in shifts:
                            resident_name = scheduler.residents[shift.resident].display_name
                            shift_abbrev = get_shift_abbreviation(shift.shift_type)
                            shift_class = get_shift_class(shift.shift_type)
                            shift_html += f'<span class="{shift_class}">{resident_name} ({shift_abbrev})</span><br>'
                        
                        st.markdown(shift_html, unsafe_allow_html=True)
                    else:
                        if date_obj.weekday() < 5:
                            st.markdown(f'<div class="no-coverage">{day}<br>No Coverage</div>', unsafe_allow_html=True)
                        else:
                            st.markdown(f"**{day}**")

def get_shift_abbreviation(shift_type: str) -> str:
    if 'call' in shift_type:
        return 'C'
    elif 'moonlight' in shift_type:
        return 'M'
    elif 'weekend' in shift_type:
        return 'W'
    return 'S'

def get_shift_class(shift_type: str) -> str:
    if 'call' in shift_type:
        return 'shift-call'
    elif 'moonlight' in shift_type:
        return 'shift-moonlight'
    elif 'weekend' in shift_type:
        return 'shift-weekend'
    return 'shift-call'

def display_quota_tracking():
    scheduler = st.session_state.scheduler
    
    st.subheader("📊 Quota Tracking")
    
    quota_data = []
    for name, resident in scheduler.residents.items():
        call_debt = scheduler.get_quota_debt(name, 'call')
        moonlight_debt = scheduler.get_quota_debt(name, 'moonlight')
        weekend_debt = scheduler.get_quota_debt(name, 'weekend')
        
        status = "✅ On Track"
        if call_debt > 2 or moonlight_debt > 2 or weekend_debt > 1:
            status = "⚠️ Behind"
        if (resident.current_stats['call'] > resident.quarter_targets['call'] or
            resident.current_stats['moonlight'] > resident.quarter_targets['moonlight'] or
            resident.current_stats['weekend'] > resident.quarter_targets['weekend']):
            status = "🔴 Over Target"
        
        quota_data.append({
            'Resident': resident.display_name,
            'PGY': resident.pgy_level,
            'Call': f"{resident.current_stats['call']}/{resident.quarter_targets['call']}",
            'Moonlight': f"{resident.current_stats['moonlight']}/{resident.quarter_targets['moonlight']}",
            'Weekend': f"{resident.current_stats['weekend']}/{resident.quarter_targets['weekend']}",
            'Status': status
        })
    
    quota_df = pd.DataFrame(quota_data)
    st.dataframe(quota_df, use_container_width=True, hide_index=True)

def display_monitoring_log():
    scheduler = st.session_state.scheduler
    
    st.subheader("🔍 Real-time Monitoring Log")
    
    recent_logs = scheduler.log_entries[-20:]
    
    for log_entry in reversed(recent_logs):
        level = log_entry['level']
        message = log_entry['message']
        time_str = log_entry['time']
        
        if level == 'success':
            st.markdown(f'<div class="request-honored">[{time_str}] {message}</div>', unsafe_allow_html=True)
        elif level == 'warning' or level == 'error':
            st.markdown(f'<div class="violation-warning">[{time_str}] {message}</div>', unsafe_allow_html=True)
        else:
            st.text(f"[{time_str}] {message}")

def display_override_section():
    scheduler = st.session_state.scheduler
    
    st.subheader("🔧 Chief Override System")
    
    with st.expander("Apply Manual Override"):
        st.info("Use this section to manually assign residents to specific dates, overriding normal rules.")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            override_date = st.date_input(
                "Select Date",
                min_value=date(2025, 7, 1),
                max_value=date(2025, 9, 30),
                value=date(2025, 7, 1)
            )
        
        with col2:
            resident_names = list(scheduler.residents.keys())
            override_resident = st.selectbox("Select Resident", resident_names)
        
        with col3:
            shift_types = ['weekday_call', 'weekday_moonlight', 'friday_moonlight_1', 'friday_moonlight_2', 
                          'weekend_call', 'weekend_moonlight', 'backup_call']
            override_shift = st.selectbox("Select Shift Type", shift_types)
        
        if st.button("Apply Override", type="primary"):
            date_str = override_date.strftime('%Y-%m-%d')
            
            reasons = scheduler.get_unavailability_reasons(override_resident, date_str)
            if reasons != ['Available']:
                st.warning(f"Override applied despite: {', '.join(reasons)}")
            
            success = scheduler.apply_override(date_str, override_resident, override_shift)
            if success:
                st.success(f"Override applied: {override_resident} assigned to {override_shift} on {date_str}")
                st.rerun()
            else:
                st.error("Override failed!")
        
        st.subheader("🔍 Availability Checker")
        check_col1, check_col2 = st.columns(2)
        
        with check_col1:
            check_date = st.date_input(
                "Check Date",
                min_value=date(2025, 7, 1),
                max_value=date(2025, 9, 30),
                value=date(2025, 7, 1),
                key="check_date"
            )
        
        with check_col2:
           check_resident = st.selectbox("Check Resident", resident_names, key="check_resident")
       
        if st.button("Check Availability"):
           check_date_str = check_date.strftime('%Y-%m-%d')
           reasons = scheduler.get_unavailability_reasons(check_resident, check_date_str)
           
           if reasons == ['Available']:
               st.success(f"✅ {check_resident} is available on {check_date_str}")
           else:
               st.warning(f"❌ {check_resident} is unavailable on {check_date_str}")
               for reason in reasons:
                   st.text(f"   • {reason}")

if __name__ == "__main__":
    main()