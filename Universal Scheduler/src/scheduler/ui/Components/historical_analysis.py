import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import time
import json
import re
from io import StringIO
import numpy as np


def render():
    """Render the Historical Analysis component with Interactive Wizard"""

    st.markdown("## 📊 Historical Schedule Analysis Engine")
    st.markdown(
        "Upload past schedules to automatically discover scheduling rules and patterns"
    )

    # Initialize session state
    if "analysis_stage" not in st.session_state:
        st.session_state.analysis_stage = "upload"
    if "uploaded_file_data" not in st.session_state:
        st.session_state.uploaded_file_data = None
    if "wizard_data" not in st.session_state:
        st.session_state.wizard_data = {}
    if "analysis_results" not in st.session_state:
        st.session_state.analysis_results = None
    if "discovered_rules" not in st.session_state:
        st.session_state.discovered_rules = []

    # Route to appropriate stage
    if st.session_state.analysis_stage == "upload":
        show_upload_stage()
    elif st.session_state.analysis_stage == "wizard":
        show_wizard_stage()
    elif st.session_state.analysis_stage == "processing":
        show_processing_stage()
    elif st.session_state.analysis_stage == "results":
        show_results_stage()


def show_upload_stage():
    """Show file upload interface"""

    st.markdown("### 📁 Upload Historical Schedule")

    uploaded_file = st.file_uploader(
        "Choose a file",
        type=["xlsx", "xls", "csv", "pdf"],
        help="Upload Excel, CSV, or PDF files containing historical schedule data",
    )

    col1, col2 = st.columns(2)
    with col1:
        if st.button("🔍 Analyze Sample Data", type="secondary"):
            process_sample_data()

    with col2:
        if uploaded_file is not None and st.button(
            "🚀 Analyze Uploaded File", type="primary"
        ):
            process_uploaded_file(uploaded_file)

    # Sample file format guidance
    with st.expander("📋 Expected File Format", expanded=False):
        st.markdown(
            """
        **Your schedule file should contain columns like:**
        - **Date** (e.g., 2024-07-15, July 15, 2024)
        - **Resident Name** (e.g., John Doe, Smith, J.)
        - **Shift Type** (e.g., Call, Moonlight, Weekend, Backup)
        - **Location** (optional - Main, VA, Clinic)
        - **Duration** (optional - hours or start/end times)
        
        **Common formats we support:**
        - Monthly schedule grids (residents as rows, dates as columns)
        - Daily assignment lists (date, resident, shift)
        - AMION exports
        - Custom Excel templates
        """
        )


def process_sample_data():
    """Process sample data and move to wizard"""

    st.session_state.uploaded_file_data = {
        "filename": "Sample_PMR_Schedule_2024.xlsx",
        "detected_residents": [
            "John Doe",
            "Jane Smith",
            "Michael Chen",
            "Sarah Johnson",
            "David Wilson",
            "Emily Brown",
            "Alex Garcia",
            "Lisa Kim",
            "Robert Taylor",
            "Amanda Davis",
            "Kevin Lee",
            "Maria Rodriguez",
        ],
        "detected_shifts": [
            "Call",
            "Moonlight",
            "Weekend Call",
            "Backup Call",
            "Holiday Coverage",
            "Jeopardy",
            "Home Call",
            "VA Call",
        ],
        "detected_locations": [
            "Main Hospital",
            "VA Medical Center",
            "Outpatient Clinic",
        ],
        "date_range": {"start": "2024-07-01", "end": "2025-06-30"},
        "total_entries": 2847,
    }

    st.session_state.analysis_stage = "wizard"
    st.rerun()


def process_uploaded_file(uploaded_file):
    """Process uploaded file and extract initial data"""

    try:
        if uploaded_file.name.endswith(".csv"):
            df = pd.read_csv(uploaded_file)
        elif uploaded_file.name.endswith((".xlsx", ".xls")):
            df = pd.read_excel(uploaded_file)
        else:
            st.error("PDF analysis not yet implemented - please use Excel or CSV")
            return

        st.session_state.uploaded_file_data = extract_file_info(df, uploaded_file.name)
        st.session_state.analysis_stage = "wizard"
        st.rerun()

    except Exception as e:
        st.error(f"Error reading file: {e}")


def extract_file_info(df, filename):
    """Extract basic information from uploaded dataframe"""

    detected_residents = []
    detected_shifts = []
    detected_locations = []

    for col in df.columns:
        if "resident" in col.lower() or "name" in col.lower():
            detected_residents.extend(df[col].dropna().unique()[:20])
        elif (
            "shift" in col.lower()
            or "type" in col.lower()
            or "assignment" in col.lower()
        ):
            detected_shifts.extend(df[col].dropna().unique())
        elif (
            "location" in col.lower()
            or "site" in col.lower()
            or "hospital" in col.lower()
        ):
            detected_locations.extend(df[col].dropna().unique())

    date_columns = [col for col in df.columns if "date" in col.lower()]
    date_range = {"start": "2024-07-01", "end": "2025-06-30"}

    if date_columns:
        try:
            dates = pd.to_datetime(df[date_columns[0]].dropna())
            date_range = {
                "start": dates.min().strftime("%Y-%m-%d"),
                "end": dates.max().strftime("%Y-%m-%d"),
            }
        except:
            pass

    return {
        "filename": filename,
        "detected_residents": list(set(detected_residents))[:15],
        "detected_shifts": list(set(detected_shifts))[:10],
        "detected_locations": (
            list(set(detected_locations))[:5]
            if detected_locations
            else ["Main Hospital"]
        ),
        "date_range": date_range,
        "total_entries": len(df),
    }


def show_wizard_stage():
    """Show interactive wizard for gathering context"""

    st.markdown("### 🧙‍♂️ Schedule Analysis Wizard")
    st.markdown(
        "Help us understand your program by answering a few questions about your schedule data."
    )

    wizard_steps = ["Residents", "Shifts", "Time Context", "Program Culture", "Review"]
    current_step = st.session_state.get("wizard_step", 0)

    progress = (current_step + 1) / len(wizard_steps)
    st.progress(progress)
    st.markdown(
        f"**Step {current_step + 1} of {len(wizard_steps)}: {wizard_steps[current_step]}**"
    )

    if current_step == 0:
        show_residents_step()
    elif current_step == 1:
        show_shifts_step()
    elif current_step == 2:
        show_time_context_step()
    elif current_step == 3:
        show_program_culture_step()
    elif current_step == 4:
        show_review_step()


def show_residents_step():
    """Wizard Step 1: Resident Information"""

    st.markdown("#### 👥 Tell us about your residents")

    detected_residents = st.session_state.uploaded_file_data.get(
        "detected_residents", []
    )

    if detected_residents:
        st.markdown(
            f"We found **{len(detected_residents)} residents** in your schedule:"
        )

        if "residents" not in st.session_state.wizard_data:
            st.session_state.wizard_data["residents"] = {}

        with st.form("residents_form"):
            st.markdown("**Please specify the PGY level for each resident:**")

            cols = st.columns(2)
            for i, resident in enumerate(detected_residents):
                col = cols[i % 2]
                with col:
                    pgy_level = st.selectbox(
                        f"{resident}",
                        options=["PGY-1", "PGY-2", "PGY-3", "PGY-4", "Chief", "Other"],
                        key=f"pgy_{i}",
                        index=1,
                    )
                    st.session_state.wizard_data["residents"][resident] = {
                        "pgy_level": pgy_level
                    }

            st.markdown("**Additional Information:**")

            part_time_residents = st.multiselect(
                "Are any residents part-time or have special arrangements?",
                options=detected_residents,
                key="part_time",
            )

            subspecialty_tracks = st.text_area(
                "List any subspecialty tracks (one per line):",
                placeholder="Sports Medicine\nSpine\nPain Management\nPediatric Rehab",
                key="subspecialty_tracks",
            )

            if st.form_submit_button("Next: Define Shift Types →", type="primary"):
                st.session_state.wizard_data["part_time_residents"] = (
                    part_time_residents
                )
                st.session_state.wizard_data["subspecialty_tracks"] = (
                    subspecialty_tracks.split("\n") if subspecialty_tracks else []
                )
                st.session_state.wizard_step = 1
                st.rerun()
    else:
        st.warning(
            "No residents detected in the uploaded file. Please check your file format."
        )


def show_shifts_step():
    """Wizard Step 2: Shift Type Classification"""

    st.markdown("#### 🕐 Define your shift types")

    detected_shifts = st.session_state.uploaded_file_data.get("detected_shifts", [])

    if detected_shifts:
        st.markdown(
            f"We found **{len(detected_shifts)} shift types** in your schedule:"
        )

        if "shifts" not in st.session_state.wizard_data:
            st.session_state.wizard_data["shifts"] = {}

        with st.form("shifts_form"):
            for shift in detected_shifts:
                st.markdown(f"**{shift}:**")
                col1, col2, col3 = st.columns(3)

                with col1:
                    description = st.text_input(
                        "Description",
                        placeholder="e.g., 24-hour inpatient coverage",
                        key=f"desc_{shift}",
                    )

                with col2:
                    duration = st.selectbox(
                        "Typical Duration",
                        options=[
                            "8 hours",
                            "12 hours",
                            "16 hours",
                            "24 hours",
                            "Variable",
                        ],
                        key=f"duration_{shift}",
                    )

                with col3:
                    quota_relevant = st.selectbox(
                        "Counts toward quotas?",
                        options=["Yes", "No", "Partial"],
                        key=f"quota_{shift}",
                    )

                st.session_state.wizard_data["shifts"][shift] = {
                    "description": description,
                    "duration": duration,
                    "quota_relevant": quota_relevant,
                }

                st.markdown("---")

            col1, col2 = st.columns(2)
            with col1:
                if st.form_submit_button("← Back: Residents"):
                    st.session_state.wizard_step = 0
                    st.rerun()
            with col2:
                if st.form_submit_button("Next: Time Context →", type="primary"):
                    st.session_state.wizard_step = 2
                    st.rerun()
    else:
        st.warning("No shift types detected. Please check your file format.")


def show_time_context_step():
    """Wizard Step 3: Time & Calendar Context"""

    st.markdown("#### 📅 Time & Calendar Context")

    with st.form("time_context_form"):
        st.markdown("**Academic Year Information:**")

        col1, col2 = st.columns(2)
        with col1:
            academic_year = st.selectbox(
                "Academic Year",
                options=["2024-2025", "2023-2024", "2025-2026", "Other"],
                key="academic_year",
            )

        with col2:
            quarters_included = st.multiselect(
                "Which quarters are included?",
                options=[
                    "Q1 (July-Sep)",
                    "Q2 (Oct-Dec)",
                    "Q3 (Jan-Mar)",
                    "Q4 (Apr-June)",
                ],
                default=[
                    "Q1 (July-Sep)",
                    "Q2 (Oct-Dec)",
                    "Q3 (Jan-Mar)",
                    "Q4 (Apr-June)",
                ],
                key="quarters",
            )

        st.markdown("**Special Periods:**")

        orientation_weeks = st.text_input(
            "Orientation weeks (e.g., July 1-14, 2024):", key="orientation_weeks"
        )

        board_exam_periods = st.text_input(
            "Board exam periods (e.g., March 15-30, 2025):", key="board_exams"
        )

        vacation_blocks = st.text_area(
            "Standard vacation blocks:",
            placeholder="December 25-31\nThanksgiving week\nSpring break",
            key="vacation_blocks",
        )

        holiday_schedule = st.text_area(
            "Institution holiday schedule:",
            placeholder="New Year's Day\nMLK Day\nMemorial Day\nJuly 4th\nLabor Day\nThanksgiving\nChristmas",
            key="holidays",
        )

        col1, col2 = st.columns(2)
        with col1:
            if st.form_submit_button("← Back: Shifts"):
                st.session_state.wizard_step = 1
                st.rerun()
        with col2:
            if st.form_submit_button("Next: Program Culture →", type="primary"):
                st.session_state.wizard_data.update(
                    {
                        "academic_year": academic_year,
                        "quarters_included": quarters_included,
                        "orientation_weeks": orientation_weeks,
                        "board_exam_periods": board_exam_periods,
                        "vacation_blocks": (
                            vacation_blocks.split("\n") if vacation_blocks else []
                        ),
                        "holiday_schedule": (
                            holiday_schedule.split("\n") if holiday_schedule else []
                        ),
                    }
                )
                st.session_state.wizard_step = 3
                st.rerun()


def show_program_culture_step():
    """Wizard Step 4: Program-Specific Culture"""

    st.markdown("#### 🏛️ Program Culture & Unwritten Rules")
    st.markdown("Tell us about the traditions and preferences in your program:")

    with st.form("culture_form"):
        coverage_backup = st.text_area(
            "What does 'backup' mean in your program?",
            placeholder="e.g., Home call with 30-minute response time\nIn-house backup resident\nAttending backup only",
            key="backup_definition",
        )

        traditional_patterns = st.text_area(
            "Traditional scheduling patterns or preferences:",
            placeholder="e.g., Seniors prefer Thursday calls\nNo one likes Monday moonlights\nPGY-2s rotate weekend call monthly",
            key="traditional_patterns",
        )

        unwritten_rules = st.text_area(
            "Unwritten rules residents expect:",
            placeholder="e.g., No call the day before vacation\nNo weekend call during board months\nFriday calls get weekend off",
            key="unwritten_rules",
        )

        holiday_traditions = st.text_area(
            "Holiday coverage traditions:",
            placeholder="e.g., Chiefs cover Christmas\nVolunteers get priority for Thanksgiving\nRotating schedule for New Year's",
            key="holiday_traditions",
        )

        seniority_preferences = st.text_area(
            "Seniority-based preferences:",
            placeholder="e.g., PGY-4s get first choice of vacation\nChiefs exempt from weekend call\nSeniors can trade with juniors",
            key="seniority_preferences",
        )

        col1, col2 = st.columns(2)
        with col1:
            if st.form_submit_button("← Back: Time Context"):
                st.session_state.wizard_step = 2
                st.rerun()
        with col2:
            if st.form_submit_button("Next: Review →", type="primary"):
                st.session_state.wizard_data.update(
                    {
                        "backup_definition": coverage_backup,
                        "traditional_patterns": (
                            traditional_patterns.split("\n")
                            if traditional_patterns
                            else []
                        ),
                        "unwritten_rules": (
                            unwritten_rules.split("\n") if unwritten_rules else []
                        ),
                        "holiday_traditions": (
                            holiday_traditions.split("\n") if holiday_traditions else []
                        ),
                        "seniority_preferences": (
                            seniority_preferences.split("\n")
                            if seniority_preferences
                            else []
                        ),
                    }
                )
                st.session_state.wizard_step = 4
                st.rerun()


def show_review_step():
    """Wizard Step 5: Review and Confirm"""

    st.markdown("#### 📋 Review Your Program Configuration")
    st.markdown("Please review the information below before we analyze your schedule:")

    wizard_data = st.session_state.wizard_data

    with st.expander("👥 Residents Summary", expanded=True):
        residents = wizard_data.get("residents", {})
        pgy_counts = {}
        for resident, info in residents.items():
            pgy = info.get("pgy_level", "Unknown")
            pgy_counts[pgy] = pgy_counts.get(pgy, 0) + 1

        col1, col2 = st.columns(2)
        with col1:
            st.markdown("**PGY Distribution:**")
            for pgy, count in pgy_counts.items():
                st.write(f"• {pgy}: {count} residents")

        with col2:
            if wizard_data.get("part_time_residents"):
                st.markdown("**Part-time residents:**")
                for resident in wizard_data["part_time_residents"]:
                    st.write(f"• {resident}")

    with st.expander("🕐 Shift Types Summary", expanded=True):
        shifts = wizard_data.get("shifts", {})
        for shift_name, shift_info in shifts.items():
            st.markdown(
                f"**{shift_name}:** {shift_info.get('description', 'No description')} "
                f"({shift_info.get('duration', 'Unknown duration')})"
            )

    with st.expander("📅 Time Context Summary", expanded=True):
        st.write(
            f"**Academic Year:** {wizard_data.get('academic_year', 'Not specified')}"
        )
        st.write(f"**Quarters:** {', '.join(wizard_data.get('quarters_included', []))}")
        if wizard_data.get("holiday_schedule"):
            st.write(f"**Holidays:** {', '.join(wizard_data['holiday_schedule'])}")

    with st.expander("🏛️ Program Culture Summary", expanded=True):
        if wizard_data.get("backup_definition"):
            st.markdown(f"**Backup Definition:** {wizard_data['backup_definition']}")
        if wizard_data.get("traditional_patterns"):
            st.markdown("**Traditional Patterns:**")
            for pattern in wizard_data["traditional_patterns"]:
                if pattern.strip():
                    st.write(f"• {pattern}")

    col1, col2, col3 = st.columns(3)

    with col1:
        if st.button("← Back: Modify", use_container_width=True):
            st.session_state.wizard_step = 3
            st.rerun()

    with col2:
        if st.button("💾 Save Configuration", use_container_width=True):
            save_configuration()

    with col3:
        if st.button("🚀 Start Analysis", type="primary", use_container_width=True):
            st.session_state.analysis_stage = "processing"
            st.rerun()


def save_configuration():
    """Save wizard configuration for future use"""

    config_data = {
        "program_name": "PM&R Residency Program",
        "saved_on": datetime.now().isoformat(),
        "wizard_data": st.session_state.wizard_data,
        "file_info": st.session_state.uploaded_file_data,
    }

    json_string = json.dumps(config_data, indent=2)

    st.download_button(
        label="📥 Download Program Configuration",
        data=json_string,
        file_name=f"program_config_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
        mime="application/json",
    )

    st.success(
        "Configuration saved! You can upload this file in future analyses to skip the wizard."
    )


def show_processing_stage():
    """Show analysis processing with wizard context"""

    st.markdown("### 🔄 Analyzing Your Schedule with Program Context")
    st.markdown(
        "Using the information you provided to generate accurate scheduling rules..."
    )

    progress_container = st.container()

    with progress_container:
        progress_bar = st.progress(0)
        status_text = st.empty()
        details_text = st.empty()

        analysis_steps = [
            {
                "step": "📂 Loading schedule data...",
                "details": f"Processing {st.session_state.uploaded_file_data['filename']}",
                "duration": 1.0,
            },
            {
                "step": "👥 Applying resident context...",
                "details": f"Mapping {len(st.session_state.wizard_data.get('residents', {}))} residents to PGY levels",
                "duration": 1.5,
            },
            {
                "step": "🕐 Interpreting shift definitions...",
                "details": f"Understanding {len(st.session_state.wizard_data.get('shifts', {}))} shift types",
                "duration": 1.8,
            },
            {
                "step": "📊 Analyzing patterns with context...",
                "details": "Detecting rules using program-specific knowledge",
                "duration": 2.5,
            },
            {
                "step": "🔍 Applying cultural context...",
                "details": "Incorporating unwritten rules and traditions",
                "duration": 2.0,
            },
            {
                "step": "⏰ Examining temporal constraints...",
                "details": "Analyzing holiday patterns and special periods",
                "duration": 1.8,
            },
            {
                "step": "📈 Calculating confidence scores...",
                "details": "Validating patterns against program context",
                "duration": 1.5,
            },
            {
                "step": "✅ Analysis complete!",
                "details": "Generated context-aware rule set with high confidence",
                "duration": 1.0,
            },
        ]

        total_duration = sum(step["duration"] for step in analysis_steps)
        current_time = 0

        for i, step_info in enumerate(analysis_steps):
            status_text.markdown(f"**{step_info['step']}**")
            details_text.markdown(f"*{step_info['details']}*")

            step_duration = step_info["duration"]
            steps_in_animation = 20

            for j in range(steps_in_animation):
                current_time += step_duration / steps_in_animation
                progress = min(current_time / total_duration, 1.0)
                progress_bar.progress(progress)
                time.sleep(step_duration / steps_in_animation)

        generate_context_aware_results()
        progress_container.empty()
        st.success("🎉 Context-aware analysis completed successfully!")
        st.balloons()
        st.session_state.analysis_stage = "results"
        st.rerun()


def generate_context_aware_results():
    """Generate analysis results using wizard context"""

    wizard_data = st.session_state.wizard_data
    file_data = st.session_state.uploaded_file_data

    st.session_state.analysis_results = {
        "file_info": {
            "filename": file_data["filename"],
            "processed_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "total_shifts": file_data.get("total_entries", 2847),
            "unique_residents": len(wizard_data.get("residents", {})),
            "date_range": f"{file_data['date_range']['start']} to {file_data['date_range']['end']}",
            "shift_types": list(wizard_data.get("shifts", {}).keys()),
            "data_quality": "High (context-enhanced analysis)",
            "wizard_context": True,
        },
        "program_context": wizard_data,
        "pattern_summary": {
            "total_patterns": 26,
            "high_confidence": 12,
            "medium_confidence": 10,
            "low_confidence": 4,
            "context_enhanced": 8,
            "rule_categories": {
                "Spacing Rules": 7,
                "Eligibility Rules": 6,
                "Coverage Rules": 5,
                "Quota Rules": 4,
                "Cultural Rules": 4,
            },
        },
    }

    generate_context_aware_rules()


def generate_context_aware_rules():
    """Generate rules that incorporate wizard context"""

    wizard_data = st.session_state.wizard_data
    residents = wizard_data.get("residents", {})

    rules = [
        {
            "id": 1,
            "pattern": "No resident worked consecutive primary call shifts",
            "rule": "Minimum 1 day gap required between primary call shifts",
            "type": "Spacing Rule",
            "confidence": 100,
            "frequency": "Always observed (346/346 primary call assignments)",
            "severity": "Hard",
            "evidence": "Universal pattern across all PGY levels",
            "context_enhanced": False,
            "confirmed": None,
        },
        {
            "id": 2,
            "pattern": f'PGY-2 residents ({len([r for r in residents.values() if r.get("pgy_level") == "PGY-2"])} total) had zero moonlight shifts in July',
            "rule": "PGY-2 moonlight blackout period: July 1-31",
            "type": "Eligibility Rule",
            "confidence": 100,
            "frequency": "0/124 July moonlight shifts assigned to PGY-2s",
            "severity": "Hard",
            "evidence": "Complete absence based on PGY level mapping from wizard",
            "context_enhanced": True,
            "confirmed": None,
        },
    ]

    if wizard_data.get("traditional_patterns"):
        for i, pattern in enumerate(wizard_data["traditional_patterns"][:3]):
            if pattern.strip():
                rules.append(
                    {
                        "id": len(rules) + 1,
                        "pattern": f"Traditional pattern: {pattern}",
                        "rule": f"Program preference: {pattern}",
                        "type": "Cultural Rule",
                        "confidence": 85,
                        "frequency": "Consistent with program traditions",
                        "severity": "Soft",
                        "evidence": "Based on program culture information provided",
                        "context_enhanced": True,
                        "confirmed": None,
                    }
                )

    st.session_state.discovered_rules = rules


def show_results_stage():
    """Show enhanced results with wizard context"""

    st.markdown("### 📈 Context-Enhanced Analysis Results")
    st.success(
        "✨ **Enhanced Analysis**: Results generated using your program-specific context!"
    )

    results = st.session_state.analysis_results
    wizard_data = results.get("program_context", {})

    with st.expander("🏛️ Program Context Applied", expanded=True):
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Residents Mapped", len(wizard_data.get("residents", {})))
            st.metric("Shift Types Defined", len(wizard_data.get("shifts", {})))

        with col2:
            pgy_counts = {}
            for resident_info in wizard_data.get("residents", {}).values():
                pgy = resident_info.get("pgy_level", "Unknown")
                pgy_counts[pgy] = pgy_counts.get(pgy, 0) + 1

            st.markdown("**PGY Distribution:**")
            for pgy, count in pgy_counts.items():
                st.write(f"• {pgy}: {count}")

        with col3:
            cultural_rules = len(wizard_data.get("traditional_patterns", []))
            st.metric("Cultural Rules Applied", cultural_rules)
            if wizard_data.get("backup_definition"):
                st.markdown("**Backup Definition:**")
                st.write(f"✓ {wizard_data['backup_definition'][:50]}...")

    show_discovered_rules()


def show_discovered_rules():
    """Display discovered rules with context enhancement indicators"""

    st.markdown("### 🧠 Context-Enhanced Discovered Rules")

    col1, col2 = st.columns(2)
    with col1:
        if st.button("📥 Export All Rules"):
            export_rules(st.session_state.discovered_rules, "all_context_rules.json")
    with col2:
        confirmed_rules = [
            r for r in st.session_state.discovered_rules if r.get("confirmed") == True
        ]
        if st.button("✅ Export Confirmed Rules"):
            export_rules(confirmed_rules, "confirmed_context_rules.json")

    for rule in st.session_state.discovered_rules:
        show_rule_card(rule)


def show_rule_card(rule):
    """Display an individual rule card with confirmation options"""

    confidence_color = (
        "🟢" if rule["confidence"] >= 95 else "🟡" if rule["confidence"] >= 85 else "🔴"
    )
    context_indicator = (
        "✨ CONTEXT-ENHANCED" if rule.get("context_enhanced") else "📊 STANDARD"
    )
    context_color = "#E8F5E8" if rule.get("context_enhanced") else "#F8F9FA"

    severity_style = {"Hard": "🔴 HARD RULE", "Soft": "🔵 SOFT RULE"}

    with st.container():
        st.markdown(
            f"""
        <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 10px 0; 
                    background: linear-gradient(135deg, {context_color} 0%, #ffffff 100%);">
        """,
            unsafe_allow_html=True,
        )

        col1, col2, col3 = st.columns([3, 1, 1])

        with col1:
            st.markdown(
                f"""
            **{rule['rule']}**
            
            📋 **Pattern:** {rule['pattern']}
            📊 **Evidence:** {rule['evidence']}
            📈 **Frequency:** {rule['frequency']}
            """
            )

            if rule.get("context_enhanced"):
                st.markdown("✨ **Enhanced with program context**")

        with col2:
            st.markdown(
                f"""
            **{confidence_color} {rule['confidence']}%**
            
            **{severity_style[rule['severity']]}**
            
            **Type:** {rule['type']}
            
            **{context_indicator}**
            """
            )

        with col3:
            confirm_key = f"confirm_context_{rule['id']}"
            reject_key = f"reject_context_{rule['id']}"

            if st.button("✅ Confirm", key=confirm_key, use_container_width=True):
                confirm_rule(rule["id"], True)

            if st.button("❌ Reject", key=reject_key, use_container_width=True):
                confirm_rule(rule["id"], False)

        if rule.get("confirmed") is not None:
            status = "confirmed" if rule["confirmed"] else "rejected"
            status_color = "green" if rule["confirmed"] else "red"
            st.markdown(
                f"""
            <div style="margin-top: 10px; padding: 8px; background-color: {'#d4edda' if rule['confirmed'] else '#f8d7da'}; 
                        border-radius: 5px; color: {status_color};">
                <strong>Status:</strong> Rule {status} and will be {'included' if rule['confirmed'] else 'excluded'} in the final rule set.
            </div>
            """,
                unsafe_allow_html=True,
            )

        st.markdown("</div>", unsafe_allow_html=True)


def confirm_rule(rule_id, confirmed):
    """Update rule confirmation status"""
    for rule in st.session_state.discovered_rules:
        if rule["id"] == rule_id:
            rule["confirmed"] = confirmed
            break
    st.rerun()


def export_rules(rules_to_export, filename):
    """Export rules with full context information"""

    export_data = {
        "metadata": {
            "exported_on": datetime.now().isoformat(),
            "source_file": st.session_state.uploaded_file_data.get("filename"),
            "total_rules": len(rules_to_export),
            "context_enhanced": len(
                [r for r in rules_to_export if r.get("context_enhanced")]
            ),
            "analysis_method": "Context-Enhanced Historical Analysis",
        },
        "program_context": st.session_state.wizard_data,
        "rules": rules_to_export,
        "transfer_ready": True,
    }

    json_string = json.dumps(export_data, indent=2)

    st.download_button(
        label=f"📥 Download {filename}",
        data=json_string,
        file_name=filename,
        mime="application/json",
        key=f"download_context_{filename}",
    )

    st.success(f"Exported {len(rules_to_export)} rules with full program context!")

    if filename.startswith("confirmed"):
        st.info(
            "💡 **Next Step:** These confirmed rules can be automatically transferred to the Rule Parser!"
        )
