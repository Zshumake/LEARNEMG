import streamlit as st
import pandas as pd
from datetime import datetime, timedelta, date
import json
import time
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum
import calendar
import math

# Configure Streamlit page
st.set_page_config(
    page_title="PM&R Schedule Generator - Rebuilt",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Enhanced CSS for interactive calendar and strict compliance
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
    
    /* Interactive Calendar Styles */
    .interactive-day {
        position: relative;
        min-height: 120px;
        border: 2px solid #ddd;
        border-radius: 8px;
        padding: 8px;
        margin: 2px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .interactive-day:hover {
        border-color: #4CAF50;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        transform: translateY(-2px);
    }
    
    /* Day Menu Popup */
    .day-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 2px solid #4CAF50;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 1000;
        display: none;
        padding: 10px;
    }
    .interactive-day:hover .day-menu {
        display: block;
    }
    
    .menu-button {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        margin: 2px;
        cursor: pointer;
        font-size: 0.8em;
        width: 100%;
        text-align: left;
    }
    .menu-button:hover {
        background: #45a049;
    }
    
    /* Shift Styles */
    .shift-call {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        color: #1565c0;
        padding: 3px 6px;
        border-radius: 4px;
        margin: 2px 0;
        font-size: 0.75em;
        border-left: 4px solid #1976d2;
        display: block;
    }
    .shift-moonlight {
        background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
        color: #7b1fa2;
        padding: 3px 6px;
        border-radius: 4px;
        margin: 2px 0;
        font-size: 0.75em;
        border-left: 4px solid #8e24aa;
        display: block;
    }
    .shift-weekend {
        background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
        color: #2e7d32;
        padding: 3px 6px;
        border-radius: 4px;
        margin: 2px 0;
        font-size: 0.75em;
        border-left: 4px solid #388e3c;
        font-weight: bold;
        display: block;
    }
    
    /* Status Indicators */
    .blackout-period {
        background: linear-gradient(45deg, #ffecb3, #fff176);
        border-color: #ffa000 !important;
    }
    .coverage-issue {
        background: linear-gradient(45deg, #ffcdd2, #f48fb1);
        border-color: #d32f2f !important;
        animation: pulse 2s infinite;
    }
    .weekend-special {
        background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
        border-color: #388e3c !important;
    }
    .chief-assignment {
        background: linear-gradient(135deg, #fff3e0, #ffcc02);
        border-color: #f57c00 !important;
    }
    
    /* Quota Status */
    .quota-excellent { background: #e8f5e8; color: #2e7d32; border-left: 6px solid #4caf50; }
    .quota-good { background: #e3f2fd; color: #1565c0; border-left: 6px solid #2196f3; }
    .quota-warning { background: #fff3e0; color: #e65100; border-left: 6px solid #ff9800; }
    .quota-danger { background: #ffebee; color: #d32f2f; border-left: 6px solid #f44336; }
    .quota-blocked { background: #f3e5f5; color: #7b1fa2; border-left: 6px solid #9c27b0; }
    
    /* Request Status */
    .request-honored { background: #e8f5e8; border-left: 4px solid #4caf50; padding: 8px; margin: 4px 0; }
    .request-denied { background: #ffebee; border-left: 4px solid #f44336; padding: 8px; margin: 4px 0; }
    .request-pending { background: #fff3e0; border-left: 4px solid #ff9800; padding: 8px; margin: 4px 0; }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
    
    /* Tooltips */
    .tooltip {
        position: relative;
        display: inline-block;
        cursor: help;
    }
    .tooltip .tooltiptext {
        visibility: hidden;
        width: 200px;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 8px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -100px;
        opacity: 0;
        transition: opacity 0.3s;
        font-size: 0.8em;
    }
    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
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
    monthly_limits: Dict[str, int] = field(default_factory=dict)
    current_stats: Dict[str, int] = field(default_factory=lambda: {"call": 0, "moonlight": 0, "weekend": 0})
    monthly_stats: Dict[str, Dict[str, int]] = field(default_factory=dict)
    has_done_first_weekend: bool = False
    last_weekend_moonlight: Optional[str] = None
    last_assigned: Optional[str] = None
    display_name: str = ""
    consecutive_shift_count: int = 0
    recovery_until: Optional[str] = None  # Date until which resident is in recovery
    
    def __post_init__(self):
        if not self.display_name:
            if self.name == 'Natalie Brush':
                self.display_name = 'Natalie B'
            elif self.name == 'Natalie Cignetti':
                self.display_name = 'Natalie C'
            else:
                self.display_name = self.name.split(' ')[0]
        
        # Calculate monthly limits from annual quotas
        if not self.monthly_limits:
            self.monthly_limits = {
                'call': math.ceil(self.annual_quotas['call'] / 12),
                'moonlight': math.ceil(self.annual_quotas['moonlight'] / 12),
                'weekend': math.ceil(self.annual_quotas['weekend'] / 12)
            }
        
        # Initialize monthly stats
        if not self.monthly_stats:
            for month in ['2025-07', '2025-08', '2025-09']:
                self.monthly_stats[month] = {"call": 0, "moonlight": 0, "weekend": 0}

@dataclass
class Shift:
    date: str
    shift_type: str
    resident: str
    pgy_level: int
    assigned_time: str = ""
    assigned_by: str = "system"  # "system" or "chief"
    
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
    monthly_blocks: int = 0  # NEW: Track monthly quota blocks

@dataclass
class CoverageIssue:
    date: str
    issue_type: str
    needed_shift_types: List[str]
    available_residents: List[str]
    unavailable_reasons: Dict[str, List[str]]
    priority: str = "medium"  # low, medium, high, critical

class PMRSchedulerRebuilt:
    def __init__(self):
        self.residents = self._initialize_residents()
        self.schedule = {}
        self.protected_dates = {}  # NEW: Protected for specific requests
        self.chief_assignments = {}  # NEW: Track chief manual assignments
        self.current_date = datetime(2025, 7, 1)
        self.end_date = datetime(2025, 9, 30)
        self.stats = ScheduleStats()
        self.log_entries = []
        self.coverage_issues = []
        self.is_generating = False

    def _initialize_residents(self) -> Dict[str, Resident]:
        """Initialize all residents with COMPLETE data and monthly tracking"""
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
            {
                'name': 'Alena Sidwell',
                'pgy_level': 2,
                'annual_quotas': {'call': 38, 'moonlight': 21, 'weekend': 7.5},
                'time_off': ['2025-07-04', '2025-07-05', '2025-07-06', '2025-07-31', '2025-08-01', '2025-08-02', '2025-08-03', '2025-08-15', '2025-08-16', '2025-08-17', '2025-08-18', '2025-09-19', '2025-09-20', '2025-09-21', '2025-09-22', '2025-09-23', '2025-09-24', '2025-09-25', '2025-09-26', '2025-09-27', '2025-09-28'],
                'specific_requests': [],
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
        """Complete reset with protected date preservation"""
        self.schedule = {}
        self.protected_dates = {}
        self.chief_assignments = {}
        self.current_date = datetime(2025, 7, 1)
        self.stats = ScheduleStats()
        self.log_entries = []
        self.coverage_issues = []
        self.is_generating = False
        
        for resident in self.residents.values():
            resident.current_stats = {"call": 0, "moonlight": 0, "weekend": 0}
            for month in ['2025-07', '2025-08', '2025-09']:
                resident.monthly_stats[month] = {"call": 0, "moonlight": 0, "weekend": 0}
            resident.has_done_first_weekend = False
            resident.last_weekend_moonlight = None
            resident.last_assigned = None
            resident.consecutive_shift_count = 0
            resident.recovery_until = None
        
        # Process specific requests and mark protected dates
        self.process_all_requests()
        
        self.log('Schedule reset with request protection initialized', 'info')

    def process_all_requests(self):
        """NEW: Process all specific requests FIRST and protect dates"""
        self.log('🎯 Processing all specific requests first...', 'info')
        
        # Collect all requests with conflict detection
        all_requests = []
        for name, resident in self.residents.items():
            for request_date in resident.specific_requests:
                all_requests.append({
                    'resident': name,
                    'date': request_date,
                    'pgy_level': resident.pgy_level
                })
        
        # Sort by PGY level (higher PGY gets priority) then by date
        all_requests.sort(key=lambda x: (-x['pgy_level'], x['date']))
        
        # Process requests in priority order
        for request in all_requests:
            date_str = request['date']
            resident_name = request['resident']
            
            if date_str not in self.protected_dates:
                self.protected_dates[date_str] = []
            
            # Check for conflicts
            existing_requests = [r for r in self.protected_dates[date_str] if r['shift_type'] == 'weekday_call']
            
            if existing_requests:
                self.log(f'❌ Request conflict: {resident_name} vs {existing_requests[0]["resident"]} for {date_str}', 'warning')
                continue
            
            # Validate request feasibility
            if self.validate_specific_request(date_str, resident_name):
                self.protected_dates[date_str].append({
                    'resident': resident_name,
                    'shift_type': 'weekday_call',
                    'priority': 'request'
                })
                self.log(f'🔒 Protected {date_str} for {resident_name} (specific request)', 'success')
            else:
                self.log(f'❌ Invalid request: {resident_name} cannot work {date_str}', 'warning')

    def get_month_from_date(self, date_str: str) -> str:
        """Get month string from date for monthly tracking"""
        return date_str[:7]  # Returns "2025-07", "2025-08", etc.

    def check_monthly_limits(self, resident_name: str, date_str: str, shift_type: str) -> bool:
        """NEW: Strict monthly quota enforcement"""
        resident = self.residents[resident_name]
        month = self.get_month_from_date(date_str)
        
        if 'call' in shift_type:
            current = resident.monthly_stats[month]['call']
            limit = resident.monthly_limits['call']
            
            # Check if all other residents are also at/over limit
            if current >= limit:
                all_others_at_limit = True
                for other_name, other_resident in self.residents.items():
                    if (other_name != resident_name and 
                        other_resident.pgy_level == resident.pgy_level and
                        other_resident.monthly_stats[month]['call'] < other_resident.monthly_limits['call'] and
                        self.is_resident_available(other_name, date_str)):
                        all_others_at_limit = False
                        break
                
                if not all_others_at_limit:
                    self.stats.monthly_blocks += 1
                    self.log(f'🚫 Monthly block: {resident_name} at call limit ({current}/{limit}) for {month}', 'warning')
                    return False
        
        elif 'moonlight' in shift_type:
            current = resident.monthly_stats[month]['moonlight']
            limit = resident.monthly_limits['moonlight']
            
            if current >= limit:
                all_others_at_limit = True
                for other_name, other_resident in self.residents.items():
                    if (other_name != resident_name and 
                        other_resident.pgy_level == resident.pgy_level and
                        other_resident.monthly_stats[month]['moonlight'] < other_resident.monthly_limits['moonlight'] and
                        self.is_resident_available(other_name, date_str)):
                        all_others_at_limit = False
                        break
                
                if not all_others_at_limit:
                    self.stats.monthly_blocks += 1
                    self.log(f'🚫 Monthly block: {resident_name} at moonlight limit ({current}/{limit}) for {month}', 'warning')
                    return False
        
        return True

    def is_resident_available(self, resident_name: str, date_str: str) -> bool:
        """Enhanced availability check"""
        resident = self.residents[resident_name]
        
        # Time-off check
        if date_str in resident.time_off:
            return False
        
        # Already assigned check
        if date_str in self.schedule:
            for shift in self.schedule[date_str]:
                if shift.resident == resident_name:
                    return False
        
        # Recovery period check
        if resident.recovery_until and date_str <= resident.recovery_until:
            return False
        
        return True

    def check_pgy2_blackouts(self, resident_name: str, date: datetime, shift_type: str) -> bool:
        """STRICT: Hard date enforcement for PGY-2 blackouts"""
        resident = self.residents[resident_name]
        if resident.pgy_level != 2:
            return True
        
        # PGY-2 call blackout (before July 15)
        if 'call' in shift_type and date < datetime(2025, 7, 15):
            self.log(f'🚫 PGY-2 call blackout: {resident_name} blocked before July 15', 'warning')
            return False
        
        # PGY-2 moonlight blackout (before August 1)
        if 'moonlight' in shift_type and date < datetime(2025, 8, 1):
            self.log(f'🚫 PGY-2 moonlight blackout: {resident_name} blocked before August 1', 'warning')
            return False
        
        return True

    def check_consecutive_days(self, resident_name: str, date: datetime) -> bool:
        """STRICT: Block ALL non-Friday→Saturday consecutive assignments"""
        yesterday = date - timedelta(days=1)
        yesterday_str = yesterday.strftime('%Y-%m-%d')
        
        # Check if worked yesterday
        if yesterday_str in self.schedule:
            for shift in self.schedule[yesterday_str]:
                if shift.resident == resident_name:
                    # Only allow Friday → Saturday for weekend blocks
                    if not (yesterday.weekday() == 4 and date.weekday() == 5):
                        self.log(f'🚫 Consecutive day block: {resident_name} worked {yesterday_str}', 'warning')
                        return False
        
        return True

    def check_post_call_recovery(self, resident_name: str, date: datetime) -> bool:
        """NEW: Mandatory post-call day off (no moonlight day after call)"""
        yesterday = date - timedelta(days=1)
        yesterday_str = yesterday.strftime('%Y-%m-%d')
        
        if yesterday_str in self.schedule:
            for shift in self.schedule[yesterday_str]:
                if shift.resident == resident_name and 'call' in shift.shift_type:
                    self.log(f'🚫 Post-call recovery: {resident_name} needs rest after call on {yesterday_str}', 'warning')
                    return False
        
        return True

    def check_weekly_limits(self, resident_name: str, date: datetime) -> bool:
        """24-hour rule enforcement with weekend exceptions"""
        week_start = date - timedelta(days=date.weekday() + 1)
        if date.weekday() == 6:  # Sunday
            week_start = date
        
        weekly_shifts = 0
        for i in range(7):
            check_date = week_start + timedelta(days=i)
            check_date_str = check_date.strftime('%Y-%m-%d')
            
            if check_date_str in self.schedule:
                for shift in self.schedule[check_date_str]:
                    if shift.resident == resident_name:
                        weekly_shifts += 1
        
        # Account for weekend blocks: if assigning weekend, it's 2+ days minimum
        is_weekend_assignment = date.weekday() == 5  # Saturday
        potential_shifts = 2 if is_weekend_assignment else 1
        
        if (weekly_shifts + potential_shifts) > 2:
            self.log(f'🚫 Weekly limit: {resident_name} would exceed 2 shifts/week', 'warning')
            return False
        
        return True

    def get_eligible_residents(self, date_str: str, shift_type: str, exclude_residents: List[str] = None, pgy_level: int = None) -> List[str]:
        """Enhanced eligibility checking with all new rules"""
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
            
            # Basic availability
            if not self.is_resident_available(name, date_str):
                continue
            
            # PGY-2 blackout enforcement
            if not self.check_pgy2_blackouts(name, date, shift_type):
                continue
            
            # Monthly limits (CRITICAL)
            if not self.check_monthly_limits(name, date_str, shift_type):
                continue
            
            # Friday call restriction (only PGY-3s)
            if shift_type == 'weekday_call' and date.weekday() == 4 and resident.pgy_level != 3:
                continue
            
            # Weekend structure enforcement
            if 'weekend' in shift_type:
                weekend_number = self.get_weekend_number(date)
                if weekend_number <= 2 and resident.pgy_level != 3:
                    continue
                if weekend_number > 2 and shift_type == 'weekend_call' and resident.pgy_level != 2:
                    continue
            
            # Consecutive day prevention
            if not self.check_consecutive_days(name, date):
                continue
            
            # Post-call recovery
            if 'moonlight' in shift_type and not self.check_post_call_recovery(name, date):
                continue
            
            # Weekly limits
            if not self.check_weekly_limits(name, date):
                continue
            
            candidates.append(name)
        
        return candidates

    def get_quota_debt(self, resident_name: str, shift_type: str) -> float:
        """Priority queue by debt - highest negative debt first"""
        resident = self.residents[resident_name]
        target = resident.quarter_targets[shift_type]
        current = resident.current_stats[shift_type]
        
        # Calculate expected progress
        quarter_start = datetime(2025, 7, 1)
        quarter_end = datetime(2025, 9, 30)
        total_days = (quarter_end - quarter_start).days + 1
        
        days_passed = max(0, (self.current_date - quarter_start).days)
        progress_ratio = min(1, days_passed / total_days)
        
        # Conservative pacing to prevent overruns
        if shift_type == 'weekend':
            progress_ratio = progress_ratio * 0.7  # Slower weekend pacing
        else:
            progress_ratio = progress_ratio * 0.8  # Slower overall pacing
        
        expected_progress = target * progress_ratio
        debt = expected_progress - current
        
        # HEAVY penalty for being over target
        if current >= target:
            debt = -((current - target + 1) * 100)  # Massive negative debt
        
        return debt

    def select_best_candidate(self, candidates: List[str], shift_type: str) -> Optional[str]:
        """Priority queue by debt with enhanced load balancing"""
        if not candidates:
            return None
        if len(candidates) == 1:
            return candidates[0]
        
        def sort_key(name):
            resident = self.residents[name]
            
            # Primary: Strict quota enforcement - never exceed target
            current = resident.current_stats[shift_type]
            target = resident.quarter_targets[shift_type]
            is_at_or_over_target = current >= target
            
            # Secondary: Quota debt (higher debt = more priority)
            debt = self.get_quota_debt(name, shift_type)
            
            # Tertiary: Total workload balance
            total_shifts = sum(resident.current_stats.values())
            
            # Quaternary: Anti-clustering - recovery from recent work
            days_since_last = 999
            if resident.last_assigned:
                last_date = datetime.strptime(resident.last_assigned, '%Y-%m-%d')
                days_since_last = (self.current_date - last_date).days
            
            # Quinary: Consecutive penalty
            consecutive_penalty = resident.consecutive_shift_count
            
            return (
                is_at_or_over_target,      # False (under target) comes first
                -debt,                     # Higher debt (more negative) comes first
                total_shifts,              # Lower total comes first
                consecutive_penalty,       # Lower consecutive count comes first
                -days_since_last          # More days since last comes first
            )
        
        sorted_candidates = sorted(candidates, key=sort_key)
        selected = sorted_candidates[0]
        
        # Update tracking
        self.residents[selected].consecutive_shift_count += 1
        
        # Reset others' consecutive counts
        for name in candidates:
            if name != selected:
                self.residents[name].consecutive_shift_count = max(0, self.residents[name].consecutive_shift_count - 1)
        
        return selected

    def assign_shift(self, date_str: str, shift_type: str, resident_name: str, assigned_by: str = "system"):
        """Enhanced shift assignment with monthly tracking"""
        if date_str not in self.schedule:
            self.schedule[date_str] = []
        
        shift = Shift(
            date=date_str,
            shift_type=shift_type,
            resident=resident_name,
            pgy_level=self.residents[resident_name].pgy_level,
            assigned_by=assigned_by
        )
        
        self.schedule[date_str].append(shift)
        
        # Update quarterly stats
        if 'call' in shift_type:
            self.residents[resident_name].current_stats['call'] += 1
        elif 'moonlight' in shift_type:
            self.residents[resident_name].current_stats['moonlight'] += 1
        elif 'weekend' in shift_type:
            self.residents[resident_name].current_stats['weekend'] += 1
        
        # Update monthly stats
        month = self.get_month_from_date(date_str)
        if 'call' in shift_type:
            self.residents[resident_name].monthly_stats[month]['call'] += 1
        elif 'moonlight' in shift_type:
            self.residents[resident_name].monthly_stats[month]['moonlight'] += 1
        elif 'weekend' in shift_type:
            self.residents[resident_name].monthly_stats[month]['weekend'] += 1
        
        # Update tracking
        self.residents[resident_name].last_assigned = date_str
        
        # Set recovery period for call shifts
        if 'call' in shift_type:
            next_day = datetime.strptime(date_str, '%Y-%m-%d') + timedelta(days=1)
            self.residents[resident_name].recovery_until = next_day.strftime('%Y-%m-%d')
        
        self.stats.shifts_assigned += 1
        
        # Track chief assignments
        if assigned_by == "chief":
            if date_str not in self.chief_assignments:
                self.chief_assignments[date_str] = []
            self.chief_assignments[date_str].append(shift_type)
        
        self.log(f'✅ Assigned {shift_type} to {resident_name} on {date_str} (by {assigned_by})', 'success')

    def process_protected_dates(self, date_str: str, day_of_week: int):
        """Process protected dates (specific requests) first"""
        if date_str not in self.protected_dates:
            return False
        
        protected = self.protected_dates[date_str]
        request_processed = False
        
        for protection in protected:
            if protection['priority'] == 'request':
                resident_name = protection['resident']
                shift_type = protection['shift_type']
                
                # Double-check feasibility at assignment time
                if self.validate_specific_request(date_str, resident_name):
                    self.assign_shift(date_str, shift_type, resident_name, "request")
                    self.stats.requests_honored += 1
                    self.log(f'🎯 Honored specific request: {resident_name} → {date_str}', 'success')
                    
                    # Complete the day's coverage
                    if day_of_week == 4:  # Friday
                        self.assign_friday_moonlights(date_str, [resident_name])
                    else:
                        self.assign_weekday_moonlight(date_str, [resident_name])
                    
                    request_processed = True
                else:
                    self.log(f'❌ Cannot honor request: {resident_name} → {date_str} (rule violation)', 'error')
                    self.stats.violations_found += 1
        
        return request_processed

    def validate_specific_request(self, date_str: str, resident_name: str) -> bool:
        """Comprehensive request validation"""
        date = datetime.strptime(date_str, '%Y-%m-%d')
        
        # All standard checks
        if not self.is_resident_available(resident_name, date_str):
            return False
        
        if not self.check_pgy2_blackouts(resident_name, date, 'call'):
            return False
        
        if not self.check_consecutive_days(resident_name, date):
            return False
        
        if not self.check_weekly_limits(resident_name, date):
            return False
        
        if not self.check_monthly_limits(resident_name, date_str, 'call'):
            return False
        
        return True

    def assign_weekday_call(self, date_str: str, day_of_week: int) -> Optional[str]:
        """Enhanced weekday call assignment"""
        candidates = self.get_eligible_residents(date_str, 'weekday_call')
        
        if not candidates:
            self.log(f'❌ No eligible residents for call on {date_str}', 'error')
            self.stats.violations_found += 1
            self.create_coverage_issue(date_str, 'No Call Coverage', ['weekday_call'], priority='critical')
            return None
        
        selected_resident = self.select_best_candidate(candidates, 'call')
        if selected_resident:
            self.assign_shift(date_str, 'weekday_call', selected_resident)
        
        return selected_resident

    def assign_weekday_moonlight(self, date_str: str, exclude_residents: List[str]):
        """Enhanced weekday moonlight assignment"""
        candidates = self.get_eligible_residents(date_str, 'weekday_moonlight', exclude_residents)
        
        if not candidates:
            self.log(f'❌ No eligible residents for moonlight on {date_str}', 'error')
            self.stats.violations_found += 1
            self.create_coverage_issue(date_str, 'No Moonlight Coverage', ['weekday_moonlight'], priority='high')
            return None
        
        selected_resident = self.select_best_candidate(candidates, 'moonlight')
        if selected_resident:
            self.assign_shift(date_str, 'weekday_moonlight', selected_resident)
        
        return selected_resident

    def assign_friday_moonlights(self, date_str: str, exclude_residents: List[str]):
        """Enhanced Friday moonlight assignment"""
        candidates = self.get_eligible_residents(date_str, 'friday_moonlight', exclude_residents)
        
        if len(candidates) < 2:
            self.log(f'⚠️ Only {len(candidates)} eligible for Friday moonlights on {date_str}', 'warning')
            self.create_coverage_issue(date_str, 'Insufficient Friday Moonlight', ['friday_moonlight_1', 'friday_moonlight_2'], priority='high')
        
        # Assign first moonlight
        if candidates:
            first = self.select_best_candidate(candidates, 'moonlight')
            self.assign_shift(date_str, 'friday_moonlight_1', first)
            
            # Remove first resident from candidates
            remaining_candidates = [c for c in candidates if c != first]
            
            # Assign second moonlight
            if remaining_candidates:
                second = self.select_best_candidate(remaining_candidates, 'moonlight')
                self.assign_shift(date_str, 'friday_moonlight_2', second)

    def get_weekend_number(self, date: datetime) -> int:
        """Calculate weekend number from July 5, 2025"""
        first_saturday = datetime(2025, 7, 5)
        days_diff = (date - first_saturday).days
        return (days_diff // 7) + 1

    def process_weekend(self, date_str: str):
        """Enhanced weekend processing with chief control for first two weekends"""
        date = datetime.strptime(date_str, '%Y-%m-%d')
        weekend_number = self.get_weekend_number(date)
        
        sunday = date + timedelta(days=1)
        sunday_str = sunday.strftime('%Y-%m-%d')
        
        self.log(f'Processing Weekend #{weekend_number} ({date_str})', 'info')
        
        if sunday_str not in self.schedule:
            self.schedule[sunday_str] = []
        
        # Check if first two weekends are manually assigned by chief
        if weekend_number <= 2:
            if date_str in self.chief_assignments or sunday_str in self.chief_assignments:
                self.log(f'✅ Weekend #{weekend_number} manually assigned by chief', 'success')
                # Add any missing coverage
                self.complete_weekend_coverage(date_str, sunday_str, weekend_number)
            else:
                # Leave blank for chief assignment
                self.log(f'⏳ Weekend #{weekend_number} left for chief assignment', 'warning')
                self.create_coverage_issue(date_str, f'Weekend #{weekend_number} needs chief assignment', 
                                         ['weekend_call', 'split_call', 'weekend_moonlight'], priority='critical')
        else:
            self.process_pgy2_weekend(date_str, sunday_str, weekend_number)

    def complete_weekend_coverage(self, date_str: str, sunday_str: str, weekend_number: int):
        """Complete weekend coverage after chief assignments"""
        # Check what's already assigned and fill gaps
        saturday_shifts = self.schedule.get(date_str, [])
        sunday_shifts = self.schedule.get(sunday_str, [])
        
        # Determine what's missing and assign accordingly
        has_call = any('call' in s.shift_type for s in saturday_shifts)
        has_moonlight = any('moonlight' in s.shift_type for s in saturday_shifts)
        
        if not has_call:
            self.create_coverage_issue(date_str, 'Missing weekend call coverage', ['weekend_call'], priority='critical')
        
        if not has_moonlight:
            self.assign_weekend_moonlight(date_str, sunday_str, [s.resident for s in saturday_shifts])

    def process_pgy2_weekend(self, date_str: str, sunday_str: str, weekend_number: int):
        """PGY-2 weekend processing with PGY-4 mentoring"""
        self.log(f'Assigning PGY-2 weekend for weekend #{weekend_number}', 'info')
        
        # Get available PGY-2s
        pgy2_candidates = []
        for name, resident in self.residents.items():
            if (resident.pgy_level == 2 and 
                self.is_resident_available(name, date_str) and 
                self.is_resident_available(name, sunday_str) and
                self.check_monthly_limits(name, date_str, 'weekend')):
                pgy2_candidates.append(name)
        
        if not pgy2_candidates:
            self.log('❌ No available PGY-2s for weekend', 'error')
            self.stats.violations_found += 1
            self.create_coverage_issue(date_str, 'No PGY-2 Weekend Coverage', ['weekend_call'], priority='critical')
            return
        
        # Sort by first weekend priority then quota debt
        def sort_key(name):
            resident = self.residents[name]
            first_weekend_done = resident.has_done_first_weekend
            quota_debt = self.get_quota_debt(name, 'weekend')
            return (first_weekend_done, -quota_debt)
        
        sorted_candidates = sorted(pgy2_candidates, key=sort_key)
        primary_pgy2 = sorted_candidates[0]
        is_first_weekend = not self.residents[primary_pgy2].has_done_first_weekend
        
        # Assign PGY-2 to both days
        self.assign_shift(date_str, 'weekend_call', primary_pgy2)
        self.assign_shift(sunday_str, 'weekend_call', primary_pgy2)
        
        exclude_list = [primary_pgy2]
        
        # Add PGY-4 mentor for first weekend
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
        
        # Add backup call (same PGY level)
        self.assign_backup_call(date_str, sunday_str, primary_pgy2, exclude_list)
        
        # Add weekend moonlight
        self.assign_weekend_moonlight(date_str, sunday_str, exclude_list)
        
        weekend_type = ' (FIRST WEEKEND)' if is_first_weekend else ''
        self.log(f'✅ PGY-2 weekend: {primary_pgy2}{weekend_type}', 'success')

    def assign_backup_call(self, date_str: str, sunday_str: str, primary_resident: str, exclude_list: List[str]):
        """Backup call same-level rule enforcement"""
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
            self.create_coverage_issue(date_str, 'No Backup Call Available', ['backup_call'], priority='medium')

    def assign_weekend_moonlight(self, date_str: str, sunday_str: str, exclude_list: List[str]):
        """Weekend moonlight gap algorithm - prioritize longest gaps"""
        candidates = []
        
        for name, resident in self.residents.items():
            if ((resident.pgy_level == 3 or resident.pgy_level == 4) and 
                name not in exclude_list and
                self.is_resident_available(name, date_str) and 
                self.is_resident_available(name, sunday_str) and
                self.check_monthly_limits(name, date_str, 'moonlight')):
                candidates.append(name)
        
        if candidates:
            # Sort by longest gap since last weekend moonlight
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
            
            # Weekend block assignment - both Saturday and Sunday
            self.assign_shift(date_str, 'weekend_moonlight', moonlight_resident)
            self.assign_shift(sunday_str, 'weekend_moonlight', moonlight_resident)
            
            self.residents[moonlight_resident].last_weekend_moonlight = date_str
            self.log(f'✅ Weekend moonlight: {moonlight_resident} (gap tracking)', 'success')
        else:
            self.log(f'⚠️ No weekend moonlight available for {date_str}', 'warning')
            self.create_coverage_issue(date_str, 'No Weekend Moonlight Available', ['weekend_moonlight'], priority='medium')

    def create_coverage_issue(self, date_str: str, issue_type: str, needed_shifts: List[str], priority: str = "medium"):
        """Enhanced coverage issue tracking"""
        available_residents = []
        unavailable_reasons = {}
        
        for name, resident in self.residents.items():
            reasons = self.get_unavailability_reasons(name, date_str)
            if reasons == ['Available']:
                available_residents.append(name)
            else:
                unavailable_reasons[name] = reasons
        
        issue = CoverageIssue(
            date=date_str,
            issue_type=issue_type,
            needed_shift_types=needed_shifts,
            available_residents=available_residents,
            unavailable_reasons=unavailable_reasons,
            priority=priority
        )
        
        self.coverage_issues.append(issue)
        self.log(f'🚨 Coverage issue ({priority}): {date_str} - {issue_type}', 'error')

    def process_weekday(self, date_str: str, day_of_week: int):
        """Enhanced weekday processing with request priority"""
        # First, check for protected dates (specific requests)
        if self.process_protected_dates(date_str, day_of_week):
            return  # Request processed, day complete
        
        # Normal assignment process
        call_resident = self.assign_weekday_call(date_str, day_of_week)
        
        if day_of_week == 4:  # Friday
            self.assign_friday_moonlights(date_str, [call_resident] if call_resident else [])
        else:
            self.assign_weekday_moonlight(date_str, [call_resident] if call_resident else [])

    def process_day(self, date_str: str):
        """Enhanced day processing"""
        date = datetime.strptime(date_str, '%Y-%m-%d')
        day_of_week = date.weekday()
        day_name = date.strftime('%A')
        
        self.log(f'Processing {day_name} {date_str}', 'info')
        
        if date_str not in self.schedule:
            self.schedule[date_str] = []
        
        if day_of_week <= 4:  # Monday-Friday
            self.process_weekday(date_str, day_of_week)
        elif day_of_week == 5:  # Saturday
            self.process_weekend(date_str)
        
        self.stats.days_processed += 1

    def generate_schedule(self) -> bool:
        """Main schedule generation with comprehensive validation"""
        try:
            self.reset_schedule()
            self.is_generating = True
            self.log('🚀 Starting rebuilt schedule generation with strict rules...', 'info')
            
            current = self.current_date
            while current <= self.end_date:
                date_str = current.strftime('%Y-%m-%d')
                self.current_date = current
                self.process_day(date_str)
                current += timedelta(days=1)
            
            self.is_generating = False
            self.log('🎉 Schedule generation complete!', 'success')
            self.log(f'📊 Final stats: {self.stats.shifts_assigned} shifts, {self.stats.violations_found} violations, {self.stats.requests_honored} requests honored, {self.stats.monthly_blocks} monthly blocks', 'info')
            
            # Run comprehensive validation
            self.run_comprehensive_validation()
            
            return True
        except Exception as e:
            self.is_generating = False
            self.log(f'❌ Generation failed: {str(e)}', 'error')
            return False

    def run_comprehensive_validation(self):
        """Comprehensive post-generation validation"""
        self.log('🔍 Running comprehensive validation...', 'info')
        
        violations = []
        
        # Check monthly limits
        for name, resident in self.residents.items():
            for month in ['2025-07', '2025-08', '2025-09']:
                for shift_type in ['call', 'moonlight', 'weekend']:
                    current = resident.monthly_stats[month][shift_type]
                    limit = resident.monthly_limits[shift_type]
                    if current > limit:
                        violations.append(f"Monthly overage: {name} {shift_type} {current}/{limit} in {month}")
        
        # Check consecutive days
        for date_str, shifts in self.schedule.items():
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')
            next_day = date_obj + timedelta(days=1)
            next_day_str = next_day.strftime('%Y-%m-%d')
            
            if next_day_str in self.schedule:
                for shift in shifts:
                    for next_shift in self.schedule[next_day_str]:
                        if (shift.resident == next_shift.resident and 
                            not (date_obj.weekday() == 4 and next_day.weekday() == 5)):
                            violations.append(f"Consecutive days: {shift.resident} {date_str}→{next_day_str}")
        
        # Check quota overruns
        for name, resident in self.residents.items():
            for shift_type in ['call', 'moonlight', 'weekend']:
                current = resident.current_stats[shift_type]
                target = resident.quarter_targets[shift_type]
                if current > target:
                    violations.append(f"Quota overrun: {name} {shift_type} {current}/{target}")
        
        if violations:
            self.log(f'⚠️ Validation found {len(violations)} violations:', 'warning')
            for v in violations[:10]:  # Show first 10
                self.log(f'  • {v}', 'warning')
        else:
            self.log('✅ All validation checks passed!', 'success')

    def get_unavailability_reasons(self, resident_name: str, date_str: str) -> List[str]:
        """Comprehensive unavailability analysis"""
        resident = self.residents[resident_name]
        date = datetime.strptime(date_str, '%Y-%m-%d')
        month = self.get_month_from_date(date_str)
        reasons = []
        
        if date_str in resident.time_off:
            reasons.append('Time off')
        
        if date_str in self.schedule:
            for shift in self.schedule[date_str]:
                if shift.resident == resident_name:
                    reasons.append('Already assigned')
                    break
        
        if resident.recovery_until and date_str <= resident.recovery_until:
            reasons.append('Post-call recovery')
        
        if resident.pgy_level == 2:
            if date < datetime(2025, 7, 15):
                reasons.append('PGY-2 call blackout')
            if date < datetime(2025, 8, 1):
                reasons.append('PGY-2 moonlight blackout')
        
        # Monthly limits
        for shift_type in ['call', 'moonlight', 'weekend']:
            current = resident.monthly_stats[month][shift_type]
            limit = resident.monthly_limits[shift_type]
            