#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Workflow-Driven Streamlit Application for Universal Medical Residency Scheduler.
Enforces proper sequential workflow with academic year management.
"""

import streamlit as st
import sys
import os
import requests
import json
import pandas as pd
from pathlib import Path
from datetime import datetime, date, timedelta
from typing import Dict, List, Optional, Tuple

# Add the src directory to Python path
current_dir = Path(__file__).parent
src_dir = current_dir / "src"
sys.path.insert(0, str(src_dir))

# Page configuration
st.set_page_config(
    page_title="Universal Medical Residency Scheduler",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Backend API base URL
API_BASE = "http://localhost:8000/api"

def check_backend() -> bool:
    """Check if backend is running."""
    try:
        response = requests.get(f"{API_BASE}/health", timeout=2)
        return response.status_code == 200
    except:
        return False

def api_call(endpoint: str, method: str = "GET", data: dict = None) -> dict:
    """Make API call to backend."""
    try:
        url = f"{API_BASE}{endpoint}"
        if method == "GET":
            response = requests.get(url, timeout=10)
        elif method == "POST":
            response = requests.post(url, json=data, timeout=10)
        elif method == "PUT":
            response = requests.put(url, json=data, timeout=10)
        elif method == "DELETE":
            response = requests.delete(url, timeout=10)
        
        if response.status_code in [200, 201]:
            return response.json()
        else:
            st.error(f"API Error: {response.status_code}")
            return {}
    except Exception as e:
        st.error(f"Connection error: {e}")
        return {}

def load_css():
    """Load comprehensive CSS styling."""
    st.markdown("""
    <style>
    .main-header {
        padding: 2rem 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        margin-bottom: 2rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .main-header h1 {
        color: white !important;
        margin-bottom: 0.5rem;
        font-size: 2.5rem;
    }
    
    .workflow-step {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #6c757d;
        margin: 0.5rem 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .workflow-completed {
        border-left: 4px solid #28a745 !important;
        background-color: #f8fff9;
    }
    
    .workflow-active {
        border-left: 4px solid #ffc107 !important;
        background-color: #fffbf0;
    }
    
    .workflow-locked {
        border-left: 4px solid #dc3545 !important;
        background-color: #f8f9fa;
        opacity: 0.6;
    }
    
    .academic-year-banner {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        margin: 1rem 0;
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .rule-category {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #667eea;
        margin: 0.5rem 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .rule-hard {
        border-left: 4px solid #dc3545 !important;
    }
    
    .rule-soft {
        border-left: 4px solid #ffc107 !important;
    }
    
    .rule-acgme {
        border-left: 4px solid #007bff !important;
    }
    </style>
    """, unsafe_allow_html=True)

# Global workflow state (mock for demo)
if 'workflow_state' not in st.session_state:
    st.session_state.workflow_state = {
        'academic_year': None,
        'step1_complete': False,
        'step2_complete': False,
        'step3_complete': False,
        'step4_complete': False,
        'step5_complete': False,
        'residents_count': 0,
        'requests_count': 0,
        'holidays_assigned': 0,
        'historical_imported': False
    }

def get_workflow_state() -> Dict:
    """Get current workflow state."""
    return st.session_state.workflow_state

def update_workflow_state(updates: Dict):
    """Update workflow state."""
    st.session_state.workflow_state.update(updates)

def main():
    """Main application entry point."""
    load_css()
    
    # Header
    st.markdown("""
    <div class="main-header">
        <h1>🏥 Universal Medical Residency Scheduler</h1>
        <p>Academic Year Workflow Management System</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Academic Year Selection (if not selected)
    workflow = get_workflow_state()
    
    if not workflow['academic_year']:
        render_academic_year_selection()
        return
    
    # Show current academic year
    st.markdown(f"""
    <div class="academic-year-banner">
        📅 Academic Year: {workflow['academic_year']} | Progress: {calculate_completion_percentage():.1f}%
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar with workflow progress
    with st.sidebar:
        st.markdown("## 📋 Workflow Progress")
        render_workflow_sidebar()
        
        st.markdown("---")
        st.markdown("## 🌐 System Status")
        backend_online = check_backend()
        if backend_online:
            st.success("✅ Backend Online")
        else:
            st.error("❌ Backend Offline")
        
        st.markdown("---")
        if st.button("🔄 Reset Workflow"):
            st.session_state.workflow_state = {
                'academic_year': None,
                'step1_complete': False,
                'step2_complete': False, 
                'step3_complete': False,
                'step4_complete': False,
                'step5_complete': False,
                'residents_count': 0,
                'requests_count': 0,
                'holidays_assigned': 0,
                'historical_imported': False
            }
            st.rerun()
    
    # Main navigation
    st.markdown("## 📋 Workflow Navigation")
    
    tabs = st.tabs([
        "1️⃣ Residents", 
        "2️⃣ Preferences & Requests", 
        "3️⃣ Holiday Coverage",
        "4️⃣ Historical Import",
        "5️⃣ Schedule Generation",
        "📚 Rules & Requirements",
        "📊 Dashboard"
    ])
    
    with tabs[0]:
        render_resident_management()
    
    with tabs[1]:
        render_resident_requests()
    
    with tabs[2]:
        render_holiday_coverage()
    
    with tabs[3]:
        render_historical_import()
    
    with tabs[4]:
        render_schedule_generation()
    
    with tabs[5]:
        render_rules_requirements()
    
    with tabs[6]:
        render_dashboard()

def render_academic_year_selection():
    """Render academic year selection interface."""
    st.markdown("## 📅 Academic Year Selection")
    st.markdown("*Select the academic year for schedule planning*")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("""
        ### 🎯 Choose Academic Year
        Academic years run from **July 1** to **June 30** of the following year.
        """)
        
        current_year = datetime.now().year
        academic_years = [
            f"{current_year-1}-{current_year}",
            f"{current_year}-{current_year+1}",
            f"{current_year+1}-{current_year+2}"
        ]
        
        selected_year = st.selectbox(
            "Academic Year:",
            academic_years,
            index=1,  # Default to current academic year
            help="Select the academic year you want to create schedules for"
        )
        
        st.markdown(f"""
        ### 📋 Academic Year: **{selected_year}**
        - **Start Date:** July 1, {selected_year.split('-')[0]}
        - **End Date:** June 30, {selected_year.split('-')[1]}
        - **Current Month:** {datetime.now().strftime('%B %Y')}
        """)
        
        # Determine if historical import is needed
        year_start = datetime(int(selected_year.split('-')[0]), 7, 1)
        current_date = datetime.now()
        needs_historical = current_date > year_start
        
        if needs_historical:
            months_passed = []
            temp_date = year_start
            while temp_date < current_date:
                months_passed.append(temp_date.strftime('%B %Y'))
                if temp_date.month == 12:
                    temp_date = temp_date.replace(year=temp_date.year + 1, month=1)
                else:
                    temp_date = temp_date.replace(month=temp_date.month + 1)
            
            st.warning(f"""
            ⚠️ **Historical Import Required**
            
            Since we're past July 1, you'll need to import schedule data for:
            {', '.join(months_passed)}
            """)
    
    with col2:
        st.markdown("### 🎯 What Happens Next")
        st.markdown("""
        After selecting academic year:
        
        1. **Add Residents** - Input all residents with current PGY levels
        2. **Collect Requests** - Gather all call/moonlight preferences  
        3. **Holiday Coverage** - Assign holiday coverage
        4. **Import History** - Add previous months (if needed)
        5. **Generate Schedule** - Create optimized schedule
        """)
    
    if st.button("🚀 Start Workflow", type="primary", use_container_width=True):
        # Initialize workflow state
        workflow_state = {
            'academic_year': selected_year,
            'step1_complete': True,
            'step2_complete': False,
            'step3_complete': False,
            'step4_complete': False,
            'step5_complete': needs_historical == False,  # Skip if July start
            'residents_count': 0,
            'requests_count': 0,
            'holidays_assigned': 0,
            'historical_imported': not needs_historical,
            'needs_historical': needs_historical,
            'historical_months': months_passed if needs_historical else []
        }
        
        update_workflow_state(workflow_state)
        st.success(f"✅ Workflow started for academic year {selected_year}")
        st.rerun()

def render_workflow_sidebar():
    """Render workflow progress in sidebar."""
    workflow = get_workflow_state()
    
    steps = [
        ("Academic Year", workflow['step1_complete'], True),
        ("Residents", workflow['step2_complete'], workflow['step1_complete']),
        ("Requests", workflow['step3_complete'], workflow['step2_complete']),
        ("Holiday Coverage", workflow['step4_complete'], workflow['step3_complete']),
        ("Historical Import", workflow['step5_complete'], workflow['step4_complete']),
        ("Schedule Generation", False, all([
            workflow['step2_complete'],
            workflow['step3_complete'], 
            workflow['step4_complete'],
            workflow['step5_complete']
        ]))
    ]
    
    for i, (name, completed, enabled) in enumerate(steps, 1):
        if completed:
            st.markdown(f"✅ **{i}. {name}**")
        elif enabled:
            st.markdown(f"⏳ **{i}. {name}** *(Current)*")
        else:
            st.markdown(f"🔒 **{i}. {name}** *(Locked)*")

def calculate_completion_percentage() -> float:
    """Calculate overall workflow completion."""
    workflow = get_workflow_state()
    completed_steps = sum([
        workflow['step1_complete'],
        workflow['step2_complete'],
        workflow['step3_complete'],
        workflow['step4_complete'],
        workflow['step5_complete']
    ])
    return (completed_steps / 5) * 100

def render_resident_management():
    """Render step 1: Resident management with workflow validation."""
    workflow = get_workflow_state()
    
    st.markdown(f"## 1️⃣ Resident Management - {workflow['academic_year']}")
    
    if not workflow['step1_complete']:
        st.error("🔒 Complete academic year selection first")
        return
    
    st.markdown("*Add all residents who will participate in scheduling*")
    
    tab1, tab2, tab3 = st.tabs(["➕ Add Residents", "📋 Current Residents", "✅ Validation"])
    
    with tab1:
        st.subheader("Add New Resident")
        
        with st.form("add_resident_form", clear_on_submit=True):
            col1, col2 = st.columns(2)
            
            with col1:
                name = st.text_input("Full Name *", placeholder="Dr. Sarah Johnson")
                email = st.text_input("Email *", placeholder="sarah.johnson@hospital.edu")
                phone = st.text_input("Phone", placeholder="(555) 123-4567")
                
                # PGY level with academic year validation
                current_year = int(workflow['academic_year'].split('-')[0])
                pgy_level = st.selectbox("PGY Level *", [
                    "PGY-1", "PGY-2", "PGY-3", "PGY-4", "PGY-5"
                ], help=f"PGY level for {workflow['academic_year']}")
            
            with col2:
                start_date = st.date_input(
                    "Program Start Date *", 
                    value=date(current_year, 7, 1),
                    help="Residency program start date"
                )
                
                specializations = st.multiselect(
                    "Specializations",
                    ["General PM&R", "Sports Medicine", "Pain Management", 
                     "Pediatric Rehabilitation", "Spinal Cord Injury", "Brain Injury"]
                )
                
                program_id = st.text_input("Program ID", value="PMR-2024")
                is_active = st.checkbox("Active in Program", value=True)
            
            submitted = st.form_submit_button("➕ Add Resident")
            
            if submitted:
                if not name or not email or not pgy_level:
                    st.error("❌ Please fill in all required fields (*)")
                elif '@' not in email:
                    st.error("❌ Please enter a valid email address")
                else:
                    # Add resident (mock implementation)
                    resident_data = {
                        "name": name,
                        "email": email,
                        "phone": phone,
                        "pgy_level": pgy_level,
                        "start_date": start_date.isoformat(),
                        "specializations": specializations,
                        "program_id": program_id,
                        "is_active": is_active,
                        "academic_year": workflow['academic_year']
                    }
                    
                    # Update residents count
                    workflow['residents_count'] += 1
                    update_workflow_state(workflow)
                    
                    st.success(f"✅ Added {name} ({pgy_level}) successfully!")
                    
                    # Check if we have enough residents
                    if workflow['residents_count'] >= 8:  # Minimum threshold
                        workflow['step2_complete'] = True
                        update_workflow_state(workflow)
                        st.success("🎉 Resident collection complete! Move to next step.")
                    
                    st.rerun()
    
    with tab2:
        st.subheader("Current Residents")
        
        # Mock resident data for demonstration
        mock_residents = [
            {"name": "Dr. Sarah Smith", "pgy_level": "PGY-2", "email": "sarah.smith@hospital.edu", "specializations": ["General PM&R"]},
            {"name": "Dr. Michael Johnson", "pgy_level": "PGY-3", "email": "m.johnson@hospital.edu", "specializations": ["Sports Medicine"]},
            {"name": "Dr. Emily Williams", "pgy_level": "PGY-4", "email": "e.williams@hospital.edu", "specializations": ["Pain Management"]},
            {"name": "Dr. David Brown", "pgy_level": "PGY-2", "email": "d.brown@hospital.edu", "specializations": ["General PM&R"]},
        ]
        
        # Add any residents added in this session
        for i in range(workflow['residents_count']):
            mock_residents.append({
                "name": f"Dr. New Resident {i+1}",
                "pgy_level": "PGY-2",
                "email": f"resident{i+1}@hospital.edu",
                "specializations": ["General PM&R"]
            })
        
        if mock_residents:
            for i, resident in enumerate(mock_residents):
                col1, col2, col3, col4 = st.columns([3, 1.5, 2, 1])
                
                with col1:
                    st.markdown(f"**{resident['name']}**")
                    st.markdown(f"📧 {resident['email']}")
                
                with col2:
                    st.markdown(f"**{resident['pgy_level']}**")
                
                with col3:
                    specs = resident['specializations']
                    st.markdown(f"**{', '.join(specs) if specs else 'General'}**")
                
                with col4:
                    if st.button("🗑️", key=f"delete_resident_{i}"):
                        st.success(f"Removed {resident['name']}")
                        if workflow['residents_count'] > 0:
                            workflow['residents_count'] -= 1
                            if workflow['residents_count'] < 8:
                                workflow['step2_complete'] = False
                            update_workflow_state(workflow)
                        st.rerun()
                
                st.markdown("---")
        else:
            st.info("No residents added yet. Use the 'Add Residents' tab to get started.")
    
    with tab3:
        st.subheader("Resident Collection Validation")
        
        total_residents = len(mock_residents)
        
        # PGY level distribution
        pgy_counts = {}
        for resident in mock_residents:
            pgy = resident['pgy_level']
            pgy_counts[pgy] = pgy_counts.get(pgy, 0) + 1
        
        # Validation checks
        checks = [
            ("Minimum 8 residents", total_residents >= 8, f"Have {total_residents}"),
            ("PGY-2 residents", pgy_counts.get('PGY-2', 0) >= 2, f"Have {pgy_counts.get('PGY-2', 0)}"),
            ("PGY-3 residents", pgy_counts.get('PGY-3', 0) >= 1, f"Have {pgy_counts.get('PGY-3', 0)}"),
            ("PGY-4 residents", pgy_counts.get('PGY-4', 0) >= 1, f"Have {pgy_counts.get('PGY-4', 0)}"),
            ("All have emails", all('@' in r['email'] for r in mock_residents), "Email validation"),
        ]
        
        all_valid = True
        for check_name, is_valid, details in checks:
            if is_valid:
                st.success(f"✅ {check_name} - {details}")
            else:
                st.error(f"❌ {check_name} - {details}")
                all_valid = False
        
        if all_valid and total_residents >= 8:
            if st.button("✅ Mark Residents Complete", type="primary"):
                workflow['step2_complete'] = True
                update_workflow_state(workflow)
                st.success("🎉 Resident collection marked complete!")
                st.rerun()
        
        st.markdown(f"### 📊 Summary: {total_residents} residents, {len(pgy_counts)} PGY levels")

def render_resident_requests():
    """Render step 2: Resident preferences and requests."""
    workflow = get_workflow_state()
    
    st.markdown(f"## 2️⃣ Resident Preferences & Requests - {workflow['academic_year']}")
    
    if not workflow['step2_complete']:
        st.error("🔒 Complete resident management first")
        return
    
    st.markdown("*Collect all resident preferences for call, moonlight, and special requests*")
    
    tab1, tab2, tab3 = st.tabs(["📝 Collect Preferences", "📋 Current Status", "✅ Validation"])
    
    with tab1:
        st.subheader("Resident Preference Collection")
        
        # Resident selection
        residents = ["Dr. Sarah Smith (PGY-2)", "Dr. Michael Johnson (PGY-3)", "Dr. Emily Williams (PGY-4)", "Dr. David Brown (PGY-2)"]
        selected_resident = st.selectbox("Select Resident:", residents)
        
        if selected_resident:
            st.markdown(f"### Preferences for {selected_resident}")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("#### Call Shift Preferences")
                
                call_frequency = st.selectbox(
                    "Preferred call frequency:",
                    ["Standard (2-3 per month)", "More calls (4+ per month)", "Fewer calls (1-2 per month)"]
                )
                
                preferred_call_days = st.multiselect(
                    "Preferred call days:",
                    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                )
                
                avoid_call_days = st.multiselect(
                    "Avoid call days:",
                    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                )
                
                st.markdown("#### Weekend Preferences")
                weekend_call = st.radio(
                    "Weekend call availability:",
                    ["Available", "Prefer not", "Not available"],
                    horizontal=True
                )
            
            with col2:
                st.markdown("#### Moonlight Preferences")
                
                moonlight_frequency = st.selectbox(
                    "Moonlight shift frequency:",
                    ["Not interested", "1-2 per month", "3-4 per month", "As many as possible"]
                )
                
                moonlight_nights = st.multiselect(
                    "Available moonlight nights:",
                    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                )
                
                st.markdown("#### Special Requests")
                
                special_requests = st.text_area(
                    "Special scheduling requests:",
                    placeholder="e.g., 'Need Fridays off for clinic', 'Prefer back-to-back calls', etc.",
                    height=100
                )
            
            if st.button(f"💾 Save Preferences for {selected_resident}"):
                preferences_data = {
                    "resident": selected_resident,
                    "call_frequency": call_frequency,
                    "preferred_call_days": preferred_call_days,
                    "avoid_call_days": avoid_call_days,
                    "weekend_call": weekend_call,
                    "moonlight_frequency": moonlight_frequency,
                    "moonlight_nights": moonlight_nights,
                    "special_requests": special_requests
                }
                
                workflow['requests_count'] += 1
                if workflow['requests_count'] >= 4:  # All residents
                    workflow['step3_complete'] = True
                
                update_workflow_state(workflow)
                st.success(f"✅ Preferences saved for {selected_resident}")
                st.rerun()
    
    with tab2:
        st.subheader("Preference Collection Status")
        
        # Mock status data
        residents_status = [
            {"name": "Dr. Sarah Smith", "status": "✅ Complete", "call_prefs": "Standard", "moonlight": "1-2/month"},
            {"name": "Dr. Michael Johnson", "status": "⏳ In Progress", "call_prefs": "More calls", "moonlight": "Not interested"},
            {"name": "Dr. Emily Williams", "status": "🔒 Pending", "call_prefs": "-", "moonlight": "-"},
            {"name": "Dr. David Brown", "status": "🔒 Pending", "call_prefs": "-", "moonlight": "-"}
        ]
        
        # Add any completed requests from this session
        completed_requests = workflow['requests_count']
        for i in range(min(completed_requests, len(residents_status))):
            residents_status[i]["status"] = "✅ Complete"
            if residents_status[i]["call_prefs"] == "-":
                residents_status[i]["call_prefs"] = "Standard"
                residents_status[i]["moonlight"] = "1-2/month"
        
        df = pd.DataFrame(residents_status)
        st.dataframe(df, use_container_width=True)
        
        # Progress metrics
        completed = sum(1 for r in residents_status if "✅" in r["status"])
        total = len(residents_status)
        
        st.progress(completed / total)
        st.markdown(f"**Progress:** {completed}/{total} residents completed ({completed/total*100:.1f}%)")
    
    with tab3:
        st.subheader("Request Collection Validation")
        
        total_residents = 4 + workflow['residents_count']
        completed_requests = workflow['requests_count']
        
        if completed_requests >= total_residents:
            st.success("✅ All resident preferences collected")
            if st.button("✅ Mark Requests Complete", type="primary"):
                workflow['step3_complete'] = True
                update_workflow_state(workflow)
                st.success("🎉 Resident requests marked complete!")
                st.rerun()
        else:
            remaining = total_residents - completed_requests
            st.warning(f"⏳ {remaining} residents still need to submit preferences")
            st.markdown("Complete all resident preferences before proceeding.")

def render_holiday_coverage():
    """Render step 3: Holiday coverage management."""
    workflow = get_workflow_state()
    
    st.markdown(f"## 3️⃣ Holiday Coverage Assignment - {workflow['academic_year']}")
    
    if not workflow['step3_complete']:
        st.error("🔒 Complete resident requests first")
        return
    
    st.markdown("*Assign residents to cover major holidays*")
    
    # Academic year holiday calendar
    current_year = int(workflow['academic_year'].split('-')[0])
    next_year = current_year + 1
    
    holidays = [
        {"name": "Independence Day", "date": f"July 4, {current_year}", "type": "Federal Holiday"},
        {"name": "Labor Day", "date": f"September 2, {current_year}", "type": "Federal Holiday"},
        {"name": "Thanksgiving", "date": f"November 28, {current_year}", "type": "Federal Holiday"},
        {"name": "Christmas Day", "date": f"December 25, {current_year}", "type": "Federal Holiday"},
        {"name": "New Year's Day", "date": f"January 1, {next_year}", "type": "Federal Holiday"},
        {"name": "Memorial Day", "date": f"May 26, {next_year}", "type": "Federal Holiday"},
    ]
    
    tab1, tab2 = st.tabs(["📅 Assign Coverage", "📋 Current Assignments"])
    
    with tab1:
        st.subheader("Holiday Coverage Assignment")
        
        residents = ["Dr. Sarah Smith (PGY-2)", "Dr. Michael Johnson (PGY-3)", "Dr. Emily Williams (PGY-4)", "Dr. David Brown (PGY-2)"]
        
        for holiday in holidays:
            st.markdown(f"### {holiday['name']} - {holiday['date']}")
            
            col1, col2, col3 = st.columns([2, 2, 1])
            
            with col1:
                primary = st.selectbox(
                    f"Primary Coverage:",
                    ["Not Assigned"] + residents,
                    key=f"primary_{holiday['name']}"
                )
            
            with col2:
                backup = st.selectbox(
                    f"Backup Coverage:",
                    ["Not Assigned"] + residents,
                    key=f"backup_{holiday['name']}"
                )
            
            with col3:
                if st.button("💾", key=f"save_{holiday['name']}"):
                    if primary != "Not Assigned":
                        workflow['holidays_assigned'] += 1
                        update_workflow_state(workflow)
                        st.success(f"✅ Saved coverage for {holiday['name']}")
                        st.rerun()
            
            st.markdown("---")
    
    with tab2:
        st.subheader("Holiday Assignment Summary")
        
        # Mock assignments
        assignments = [
            {"holiday": "Independence Day", "primary": "Dr. Johnson", "backup": "Dr. Smith", "status": "✅ Confirmed"},
            {"holiday": "Labor Day", "primary": "Dr. Williams", "backup": "Dr. Brown", "status": "✅ Confirmed"},
            {"holiday": "Thanksgiving", "primary": "Not Assigned", "backup": "Not Assigned", "status": "🔒 Pending"},
            {"holiday": "Christmas Day", "primary": "Not Assigned", "backup": "Not Assigned", "status": "🔒 Pending"},
            {"holiday": "New Year's Day", "primary": "Not Assigned", "backup": "Not Assigned", "status": "🔒 Pending"},
            {"holiday": "Memorial Day", "primary": "Not Assigned", "backup": "Not Assigned", "status": "🔒 Pending"},
        ]
        
        # Update with assigned holidays from workflow
        assigned_count = workflow['holidays_assigned']
        for i in range(min(assigned_count, len(assignments))):
            if assignments[i]["primary"] == "Not Assigned":
                assignments[i]["primary"] = "Dr. Smith"
                assignments[i]["backup"] = "Dr. Johnson"
                assignments[i]["status"] = "✅ Confirmed"
        
        df = pd.DataFrame(assignments)
        st.dataframe(df, use_container_width=True)
        
        # Validation
        total_holidays = len(holidays)
        assigned_holidays = workflow['holidays_assigned']
        
        st.progress(assigned_holidays / total_holidays)
        st.markdown(f"**Progress:** {assigned_holidays}/{total_holidays} holidays assigned")
        
        if assigned_holidays >= total_holidays:
            if st.button("✅ Mark Holiday Coverage Complete", type="primary"):
                workflow['step4_complete'] = True
                update_workflow_state(workflow)
                st.success("🎉 Holiday coverage complete!")
                st.rerun()

def render_historical_import():
    """Render step 4: Historical schedule import."""
    workflow = get_workflow_state()
    
    st.markdown(f"## 4️⃣ Historical Schedule Import - {workflow['academic_year']}")
    
    if not workflow['step4_complete']:
        st.error("🔒 Complete holiday coverage first")
        return
    
    # Check if historical import is needed
    if not workflow.get('needs_historical', False):
        st.success("✅ No historical import needed - Starting from July")
        workflow['step5_complete'] = True
        update_workflow_state(workflow)
        return
    
    st.markdown("*Import previous months' schedules to maintain yearly quota compliance*")
    
    required_months = workflow.get('historical_months', [])
    
    tab1, tab2 = st.tabs(["📤 Import Data", "📊 Import Status"])
    
    with tab1:
        st.subheader("Import Historical Schedule Data")
        
        month_to_import = st.selectbox(
            "Select month to import:",
            required_months
        )
        
        import_method = st.radio(
            "Import method:",
            ["📁 Upload CSV File", "📝 Manual Entry", "📋 Bulk Paste"]
        )
        
        if import_method == "📁 Upload CSV File":
            st.markdown("### CSV File Upload")
            
            st.markdown("""
            **Required CSV format:**
            ```
            resident_name,date,shift_type,start_time,end_time,hours_worked,location
            Dr. Smith,2024-07-01,Call,08:00,08:00,24.0,Main Hospital
            Dr. Johnson,2024-07-02,Regular,08:00,17:00,9.0,Clinic
            ```
            """)
            
            uploaded_file = st.file_uploader(
                f"Upload {month_to_import} schedule data:",
                type=['csv'],
                help="CSV file with historical schedule data"
            )
            
            if uploaded_file is not None:
                try:
                    df = pd.read_csv(uploaded_file)
                    st.success(f"✅ File loaded: {len(df)} schedule entries")
                    
                    # Show preview
                    st.subheader("Data Preview")
                    st.dataframe(df.head(10), use_container_width=True)
                    
                    # Validation
                    required_columns = ['resident_name', 'date', 'shift_type', 'hours_worked']
                    missing_columns = [col for col in required_columns if col not in df.columns]
                    
                    if missing_columns:
                        st.error(f"❌ Missing columns: {', '.join(missing_columns)}")
                    else:
                        if st.button(f"📥 Import {month_to_import} Data"):
                            with st.spinner(f"Importing {len(df)} entries..."):
                                import time
                                time.sleep(2)
                            
                            # Mark month as imported
                            imported_months = workflow.get('historical_months_imported', [])
                            if month_to_import not in imported_months:
                                imported_months.append(month_to_import)
                                workflow['historical_months_imported'] = imported_months
                            
                            update_workflow_state(workflow)
                            st.success(f"✅ Successfully imported {len(df)} entries for {month_to_import}")
                            st.rerun()
                            
                except Exception as e:
                    st.error(f"❌ Error reading file: {e}")
    
    with tab2:
        st.subheader("Historical Import Status")
        
        if required_months:
            imported_months = workflow.get('historical_months_imported', [])
            
            import_status = []
            for month in required_months:
                status = "✅ Imported" if month in imported_months else "🔒 Pending"
                import_status.append({"Month": month, "Status": status, "Entries": "124" if status == "✅ Imported" else "0"})
            
            df = pd.DataFrame(import_status)
            st.dataframe(df, use_container_width=True)
            
            imported_count = len(imported_months)
            total_months = len(required_months)
            
            st.progress(imported_count / total_months)
            st.markdown(f"**Progress:** {imported_count}/{total_months} months imported")
            
            if imported_count >= total_months:
                if st.button("✅ Mark Historical Import Complete", type="primary"):
                    workflow['step5_complete'] = True
                    update_workflow_state(workflow)
                    st.success("🎉 Historical import complete!")
                    st.rerun()
        else:
            st.info("No historical months require import.")

def render_schedule_generation():
    """Render step 5: Schedule generation with workflow validation."""
    workflow = get_workflow_state()
    
    st.markdown(f"## 5️⃣ Schedule Generation - {workflow['academic_year']}")
    
    # Check all prerequisites
    all_steps_complete = all([
        workflow['step2_complete'],
        workflow['step3_complete'],
        workflow['step4_complete'],
        workflow['step5_complete']
    ])
    
    if not all_steps_complete:
        st.error("🔒 Complete all previous workflow steps first")
        
        st.markdown("### 📋 Remaining Steps:")
        missing_steps = []
        if not workflow['step2_complete']:
            missing_steps.append("1️⃣ Resident Management")
        if not workflow['step3_complete']:
            missing_steps.append("2️⃣ Resident Preferences")
        if not workflow['step4_complete']:
            missing_steps.append("3️⃣ Holiday Coverage")
        if not workflow['step5_complete']:
            missing_steps.append("4️⃣ Historical Import")
        
        for step in missing_steps:
            st.warning(f"⏳ {step}")
        
        return
    
    st.success("✅ All prerequisites complete - Ready for schedule generation!")
    
    # Schedule generation interface
    tab1, tab2, tab3 = st.tabs(["🎯 Configuration", "🚀 Generate", "📋 Results"])
    
    with tab1:
        st.subheader("Schedule Generation Configuration")
        
        col1, col2 = st.columns(2)
        
        with col1:
            target_month = st.selectbox(
                "Target Month:",
                ["November 2024", "December 2024", "January 2025", "February 2025"],
                help="Month to generate schedule for"
            )
            
            algorithm = st.selectbox(
                "Scheduling Algorithm:",
                [
                    "CSP Optimizer (Recommended)",
                    "PMR Sequential Algorithm",
                    "Simple Round-Robin"
                ],
                help="Algorithm to use for schedule optimization"
            )
            
            optimization_goal = st.selectbox(
                "Optimization Priority:",
                [
                    "ACGME Compliance First",
                    "Balanced Workload",
                    "Maximize Preferences", 
                    "Equal Distribution"
                ]
            )
        
        with col2:
            st.markdown("### 🎯 Generation Summary")
            st.markdown(f"""
            **Academic Year:** {workflow['academic_year']}
            **Target Month:** {target_month}
            **Residents:** {4 + workflow['residents_count']} total
            **Holidays Covered:** {workflow['holidays_assigned']}/6
            **Historical Data:** {'✅ Imported' if workflow['historical_imported'] else '❌ Not Required'}
            **Algorithm:** {algorithm}
            """)
            
            st.markdown("### 📊 Constraint Summary")
            st.markdown("""
            - **Hard Rules:** 30 (ACGME, PGY levels, time-off)
            - **Soft Rules:** 17 (preferences, balance)
            - **ACGME Limits:** 80hr/week, 24hr consecutive
            - **Holiday Coverage:** All major holidays assigned
            """)
    
    with tab2:
        st.subheader("Generate Optimized Schedule")
        
        if st.button("🚀 Generate Schedule", type="primary", use_container_width=True):
            # Schedule generation simulation
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            steps = [
                "Initializing CSP solver...",
                "Loading resident data and preferences...",
                "Processing historical quota data...",
                "Applying ACGME compliance constraints...",
                "Processing holiday coverage requirements...",
                "Applying PM&R hard rules (30 rules)...",
                "Optimizing with soft preferences (17 rules)...",
                "Validating schedule conflicts...",
                "Generating compliance report...",
                "Finalizing schedule output..."
            ]
            
            for i, step in enumerate(steps):
                status_text.text(step)
                progress_bar.progress((i + 1) / len(steps))
                import time
                time.sleep(1)
            
            status_text.text("✅ Schedule generation complete!")
            
            # Show results
            st.success("🎉 **Schedule Generated Successfully!**")
            
            col1, col2, col3, col4 = st.columns(4)
            
            with col1:
                st.metric("ACGME Compliance", "98.7%", "2.1%")
            with col2:
                st.metric("Rule Violations", "0", "-5")
            with col3:
                st.metric("Preference Score", "94.2%", "8.1%")
            with col4:
                st.metric("Workload Balance", "97.8%", "3.2%")
    
    with tab3:
        st.subheader("Schedule Results & Export")
        
        st.info("Generate a schedule first to see results here.")

def render_rules_requirements():
    """Render comprehensive rules and requirements display."""
    st.markdown(f"## 📚 Scheduling Rules & Requirements")
    st.markdown("*Complete list of all rules and constraints the system follows*")
    
    tab1, tab2, tab3, tab4 = st.tabs(["🚨 Hard Rules", "🎯 Soft Rules", "✅ ACGME Rules", "📋 PM&R Specific"])
    
    with tab1:
        st.subheader("Hard Constraints (30 Rules)")
        st.markdown("*These rules MUST be satisfied - violations will prevent schedule generation*")
        
        hard_rules = [
            "**ACGME-001:** Maximum 80 hours duty per week",
            "**ACGME-002:** Maximum 24 consecutive hours on duty",
            "**ACGME-003:** Minimum 14 hours rest between duty periods",
            "**ACGME-004:** Minimum 1 day off in 7 (averaged over 4 weeks)",
            "**ACGME-005:** Maximum 6 nights on call per month (PGY-2+)",
            "**PGY-001:** PGY-1 residents cannot take moonlight shifts",
            "**PGY-002:** PGY-2 residents maximum 2 calls per week",
            "**PGY-003:** PGY-4 residents priority for complex cases",
            "**SHIFT-001:** All call shifts must have backup coverage",
            "**SHIFT-002:** Minimum 2 residents per weekend",
            "**SHIFT-003:** No single resident >4 consecutive calls",
            "**HOLIDAY-001:** All federal holidays must have coverage",
            "**HOLIDAY-002:** Holiday coverage requires PGY-3+ resident",
            "**TIMEOFF-001:** Approved time-off requests must be honored",
            "**TIMEOFF-002:** No resident can be scheduled during approved vacation",
            "**COVERAGE-001:** Emergency coverage must be available 24/7",
            "**COVERAGE-002:** Minimum attending backup for critical cases",
            "**QUOTA-001:** Annual call quotas must be met by June 30",
            "**QUOTA-002:** Moonlight quotas cannot exceed annual limits",
            "**REST-001:** Post-call residents get 24 hours rest",
            "**REST-002:** No scheduling after night shifts same day",
            "**CLINIC-001:** Clinic duties cannot conflict with call",
            "**CLINIC-002:** Morning clinic requires previous night rest",
            "**VA-001:** VA rotations have separate call requirements",
            "**VA-002:** VA residents cannot moonlight during rotation",
            "**WEEKEND-001:** Weekend coverage minimum 2 residents",
            "**WEEKEND-002:** Weekend calls count toward weekly limits",
            "**EMERGENCY-001:** Emergency backup must be within 30 minutes",
            "**TRAINING-001:** Educational conferences protected time",
            "**SAFETY-001:** Fatigue assessment before extended shifts"
        ]
        
        for rule in hard_rules:
            st.markdown(f"""
            <div class="rule-category rule-hard">
                {rule}
            </div>
            """, unsafe_allow_html=True)
    
    with tab2:
        st.subheader("Soft Constraints (17 Rules)")
        st.markdown("*These rules are optimized but can be violated if necessary*")
        
        soft_rules = [
            "**PREF-001:** Honor resident call day preferences when possible",
            "**PREF-002:** Respect moonlight availability preferences",
            "**PREF-003:** Consider weekend work preferences",
            "**PREF-004:** Accommodate childcare constraints",
            "**BALANCE-001:** Distribute workload evenly across residents",
            "**BALANCE-002:** Balance call types (weekend vs weekday)",
            "**BALANCE-003:** Avoid clustering difficult shifts for one resident",
            "**SEQUENCE-001:** Minimize consecutive difficult assignments",
            "**SEQUENCE-002:** Provide adequate recovery time between calls",
            "**FAIRNESS-001:** Rotate undesirable shifts fairly",
            "**FAIRNESS-002:** Equal opportunity for preferred assignments",
            "**EXPERIENCE-001:** Ensure diverse experience for each PGY level",
            "**EXPERIENCE-002:** Provide learning opportunities appropriate to level",
            "**WELLNESS-001:** Consider resident wellness and burnout prevention",
            "**WELLNESS-002:** Respect work-life balance when possible",
            "**EFFICIENCY-001:** Minimize schedule changes and conflicts",
            "**EFFICIENCY-002:** Optimize shift handoff efficiency"
        ]
        
        for rule in soft_rules:
            st.markdown(f"""
            <div class="rule-category rule-soft">
                {rule}
            </div>
            """, unsafe_allow_html=True)
    
    with tab3:
        st.subheader("ACGME Compliance Requirements")
        st.markdown("*All ACGME duty hour and supervision requirements*")
        
        acgme_rules = [
            "**Duty Hours:** 80-hour weekly limit averaged over 4 weeks",
            "**Consecutive Hours:** 24-hour maximum with up to 6 hours for transitions",
            "**Rest Between Shifts:** Minimum 14 hours, 10 hours minimum for emergency",
            "**Days Off:** 1 day in 7 averaged over 4 weeks",
            "**Night Call Frequency:** Maximum 6 nights per month (PGY-2+)",
            "**Home Call:** Counts toward duty hours if responding to calls",
            "**Supervision:** Appropriate supervision based on PGY level",
            "**Documentation:** All duty hours must be tracked and reported",
            "**Violation Reporting:** Immediate reporting of any violations",
            "**Rest Day Definition:** 24 consecutive hours free from all duties",
            "**Strategic Napping:** Allowed during extended duty periods",
            "**Patient Safety:** Primary consideration in all scheduling decisions"
        ]
        
        for rule in acgme_rules:
            st.markdown(f"""
            <div class="rule-category rule-acgme">
                {rule}
            </div>
            """, unsafe_allow_html=True)
    
    with tab4:
        st.subheader("PM&R Program Specific Rules")
        st.markdown("*Physical Medicine & Rehabilitation program requirements*")
        
        pmr_rules = [
            "**PMR-CLINIC:** Residents must maintain continuity clinic responsibilities",
            "**PMR-CONSULTS:** Ensure adequate consult coverage for PM&R services",
            "**PMR-SUBSPECIALTY:** Provide exposure to subspecialty areas",
            "**PMR-RESEARCH:** Protected time for research activities",
            "**PMR-EDUCATION:** Mandatory educational conferences and grand rounds",
            "**PMR-PROCEDURES:** Ensure procedural experience opportunities",
            "**PMR-INTERDISCIPLINARY:** Team-based care experience required",
            "**PMR-OUTCOMES:** Focus on functional outcome measurements",
            "**PMR-TECHNOLOGY:** Experience with assistive technology",
            "**PMR-ETHICS:** Exposure to disability ethics and advocacy",
            "**PMR-GERIATRICS:** Adequate geriatric rehabilitation exposure",
            "**PMR-PEDIATRICS:** Pediatric rehabilitation experience (if available)",
            "**PMR-SPORTS:** Sports medicine exposure for interested residents",
            "**PMR-PAIN:** Pain management experience requirements",
            "**PMR-NEURO:** Neurological rehabilitation focus",
            "**PMR-MUSCULOSKELETAL:** MSK rehabilitation emphasis",
            "**PMR-CARDIAC:** Cardiac rehabilitation exposure",
            "**PMR-PULMONARY:** Pulmonary rehabilitation experience"
        ]
        
        for rule in pmr_rules:
            st.markdown(f"""
            <div class="rule-category">
                {rule}
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown("---")
        st.markdown("### 🎯 Rule Priority Order")
        st.markdown("""
        1. **ACGME Compliance** - Highest priority, never violated
        2. **Safety Rules** - Patient and resident safety paramount  
        3. **Hard Constraints** - Program requirements and legal obligations
        4. **Soft Preferences** - Optimized when possible without violating above
        5. **Efficiency** - Minimize administrative burden
        """)

def render_dashboard():
    """Render overall system dashboard."""
    workflow = get_workflow_state()
    
    st.markdown("## 📊 System Dashboard")
    
    # Overall progress
    completion = calculate_completion_percentage()
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Workflow Progress", f"{completion:.1f}%", "")
    with col2:
        st.metric("Residents Added", workflow['residents_count'] + 4, "")
    with col3:
        st.metric("Requests Collected", workflow['requests_count'], "")
    with col4:
        st.metric("Holidays Assigned", workflow['holidays_assigned'], "")
    
    # Workflow status
    st.markdown("### 📋 Workflow Status")
    
    status_items = [
        ("Academic Year Selected", workflow['step1_complete']),
        ("Residents Complete", workflow['step2_complete']),
        ("Requests Complete", workflow['step3_complete']),
        ("Holiday Coverage Complete", workflow['step4_complete']),
        ("Historical Import Complete", workflow['step5_complete']),
    ]
    
    for item, complete in status_items:
        if complete:
            st.success(f"✅ {item}")
        else:
            st.warning(f"⏳ {item}")
    
    # Next steps
    if completion < 100:
        next_step = get_next_incomplete_step()
        st.info(f"🎯 **Next Step:** {next_step}")

def get_next_incomplete_step() -> str:
    """Get the next incomplete workflow step."""
    workflow = get_workflow_state()
    
    if not workflow['step2_complete']:
        return "Add all program residents with PGY levels"
    elif not workflow['step3_complete']:
        return "Collect resident preferences and requests"
    elif not workflow['step4_complete']:
        return "Assign holiday coverage for all major holidays"
    elif not workflow['step5_complete']:
        return "Import historical schedule data"
    else:
        return "Generate optimized schedule"

if __name__ == "__main__":
    main()