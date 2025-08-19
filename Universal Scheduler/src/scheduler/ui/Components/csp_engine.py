import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, date, timedelta
import json
import sys
import os

# Add parent directory to path so we can import the engines
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from pmr_rules_engine import PMRSchedulingRules
    from csp_scheduling_engine import (
        CSPSchedulingEngine,
        Resident,
        Assignment,
        create_sample_residents,
    )

    ENGINES_AVAILABLE = True
except ImportError as e:
    ENGINES_AVAILABLE = False
    IMPORT_ERROR = str(e)


def render():
    """Render the CSP Engine Streamlit component"""

    st.markdown("## 🎯 CSP Schedule Generator")
    st.markdown(
        "Generate optimal PM&R schedules using Constraint Satisfaction Programming"
    )

    # Check if engines are available
    if not ENGINES_AVAILABLE:
        st.error(f"❌ CSP engines not available: {IMPORT_ERROR}")
        st.markdown(
            """
        **To fix this:**
        1. Make sure `pmr_rules_engine.py` and `csp_scheduling_engine.py` are in your main project folder
        2. Restart the Streamlit app
        """
        )
        return

    # Initialize session state
    if "csp_residents" not in st.session_state:
        st.session_state.csp_residents = []
    if "generated_schedule" not in st.session_state:
        st.session_state.generated_schedule = None
    if "generation_stats" not in st.session_state:
        st.session_state.generation_stats = None

    # Main tabs
    tab1, tab2, tab3, tab4, tab5 = st.tabs(
        ["🏗️ Setup", "👥 Residents", "🚀 Generate", "📋 Results", "📊 Analysis"]
    )

    with tab1:
        show_setup_tab()

    with tab2:
        show_residents_tab()

    with tab3:
        show_generation_tab()

    with tab4:
        show_results_tab()

    with tab5:
        show_analysis_tab()


def show_setup_tab():
    """Setup tab for schedule parameters"""
    st.markdown("### 🏗️ Schedule Generation Setup")

    # Date range selection
    col1, col2 = st.columns(2)

    with col1:
        start_date = st.date_input(
            "Schedule Start Date",
            value=date(2025, 8, 1),
            min_value=date(2025, 1, 1),
            max_value=date(2026, 12, 31),
            help="First day of the schedule to generate",
        )

    with col2:
        end_date = st.date_input(
            "Schedule End Date",
            value=date(2025, 8, 31),
            min_value=start_date,
            max_value=date(2026, 12, 31),
            help="Last day of the schedule to generate",
        )

    # Store in session state
    st.session_state.schedule_start_date = start_date
    st.session_state.schedule_end_date = end_date

    # Schedule info
    if start_date and end_date:
        total_days = (end_date - start_date).days + 1
        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.metric("Total Days", total_days)

        with col2:
            weekdays = sum(
                1
                for i in range(total_days)
                if (start_date + timedelta(days=i)).weekday() < 5
            )
            st.metric("Weekdays", weekdays)

        with col3:
            weekends = total_days - weekdays
            st.metric("Weekend Days", weekends)

        with col4:
            estimated_assignments = weekdays * 2 + (weekends // 2) * 3  # Rough estimate
            st.metric("Est. Assignments", estimated_assignments)

    # CSP Parameters
    st.markdown("### ⚙️ CSP Engine Parameters")

    col1, col2 = st.columns(2)

    with col1:
        max_iterations = st.number_input(
            "Max Iterations",
            min_value=1000,
            max_value=50000,
            value=10000,
            step=1000,
            help="Maximum attempts before giving up",
        )

        max_backtrack_depth = st.number_input(
            "Max Backtrack Depth",
            min_value=100,
            max_value=5000,
            value=1000,
            step=100,
            help="Maximum backtracking depth",
        )

    with col2:
        algorithm_option = st.selectbox(
            "CSP Algorithm",
            ["Backtracking + Forward Checking", "Backtracking Only", "Arc Consistency"],
            index=0,
            help="Constraint satisfaction algorithm to use",
        )

        optimization_priority = st.selectbox(
            "Optimization Priority",
            ["Balanced", "Quota Focus", "Preference Focus", "Fairness Focus"],
            index=0,
            help="What to optimize for when multiple solutions exist",
        )

    # Store parameters
    st.session_state.csp_params = {
        "max_iterations": max_iterations,
        "max_backtrack_depth": max_backtrack_depth,
        "algorithm": algorithm_option,
        "optimization": optimization_priority,
    }

    # Quick setup options
    st.markdown("### 🚀 Quick Setup")

    col1, col2, col3 = st.columns(3)

    with col1:
        if st.button("📅 This Month", use_container_width=True):
            today = date.today()
            st.session_state.schedule_start_date = today.replace(day=1)
            # Get last day of month
            if today.month == 12:
                next_month = today.replace(year=today.year + 1, month=1)
            else:
                next_month = today.replace(month=today.month + 1)
            st.session_state.schedule_end_date = next_month - timedelta(days=1)
            st.rerun()

    with col2:
        if st.button("📊 Next Month", use_container_width=True):
            today = date.today()
            if today.month == 12:
                next_month = today.replace(year=today.year + 1, month=1)
            else:
                next_month = today.replace(month=today.month + 1)
            st.session_state.schedule_start_date = next_month
            # Get last day of next month
            if next_month.month == 12:
                end_month = next_month.replace(year=next_month.year + 1, month=1)
            else:
                end_month = next_month.replace(month=next_month.month + 1)
            st.session_state.schedule_end_date = end_month - timedelta(days=1)
            st.rerun()

    with col3:
        if st.button("🎯 Load Sample Data", use_container_width=True):
            st.session_state.csp_residents = create_sample_residents()
            st.success("✅ Sample residents loaded!")
            st.rerun()


def show_residents_tab():
    """Residents management tab"""
    st.markdown("### 👥 Resident Management")

    # Import from Quota Tracker option
    st.markdown("#### 📥 Import from Quota Tracker")

    uploaded_file = st.file_uploader(
        "Upload Quota Tracker JSON",
        type=["json"],
        help="Upload the JSON file exported from Quota Tracker",
    )

    if uploaded_file:
        try:
            quota_data = json.load(uploaded_file)
            residents = convert_quota_data_to_residents(quota_data)
            st.session_state.csp_residents = residents
            st.success(f"✅ Imported {len(residents)} residents from Quota Tracker")
            st.rerun()
        except Exception as e:
            st.error(f"❌ Error importing data: {e}")

    # Current residents display
    if st.session_state.csp_residents:
        st.markdown("#### 👥 Current Residents")

        # Summary metrics
        residents = st.session_state.csp_residents
        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.metric("Total Residents", len(residents))

        with col2:
            pgy2_count = len([r for r in residents if r.pgy_level == "PGY-2"])
            st.metric("PGY-2s", pgy2_count)

        with col3:
            pgy3_count = len([r for r in residents if r.pgy_level == "PGY-3"])
            st.metric("PGY-3s", pgy3_count)

        with col4:
            pgy4_count = len([r for r in residents if r.pgy_level == "PGY-4"])
            st.metric("PGY-4s", pgy4_count)

        # Residents table
        residents_data = []
        for resident in residents:
            residents_data.append(
                {
                    "Name": resident.name,
                    "PGY Level": resident.pgy_level,
                    "Call Quota": resident.quotas.get("weekday_call", 0),
                    "Moonlight Quota": resident.quotas.get("moonlight", 0),
                    "Time Off Requests": len(resident.time_off_requests),
                    "Holiday Approved": "✅" if resident.holiday_approved else "❌",
                }
            )

        residents_df = pd.DataFrame(residents_data)
        st.dataframe(residents_df, use_container_width=True, hide_index=True)

        # Individual resident details
        with st.expander("🔍 Resident Details", expanded=False):
            selected_resident = st.selectbox(
                "Select Resident",
                options=residents,
                format_func=lambda r: f"{r.name} ({r.pgy_level})",
            )

            if selected_resident:
                col1, col2 = st.columns(2)

                with col1:
                    st.markdown("**Quotas:**")
                    for quota_type, quota_value in selected_resident.quotas.items():
                        completed = selected_resident.completed.get(quota_type, 0)
                        progress = (
                            (completed / quota_value * 100) if quota_value > 0 else 0
                        )
                        st.write(
                            f"{quota_type}: {completed}/{quota_value} ({progress:.1f}%)"
                        )

                with col2:
                    st.markdown("**Time-off Requests:**")
                    if selected_resident.time_off_requests:
                        for start, end in selected_resident.time_off_requests:
                            st.write(f"• {start} to {end}")
                    else:
                        st.write("None")

                    st.markdown("**Preferences:**")
                    if selected_resident.preferences:
                        for day, pref in selected_resident.preferences.items():
                            st.write(f"• {day.title()}: {pref}/5")
                    else:
                        st.write("None set")

    else:
        st.info(
            "No residents loaded. Import from Quota Tracker or load sample data in the Setup tab."
        )


def show_generation_tab():
    """Schedule generation tab"""
    st.markdown("### 🚀 Generate Schedule")

    # Check prerequisites
    if not st.session_state.csp_residents:
        st.warning("⚠️ No residents loaded. Please add residents in the Residents tab.")
        return

    if "schedule_start_date" not in st.session_state:
        st.warning("⚠️ No schedule dates set. Please configure dates in the Setup tab.")
        return

    # Generation summary
    start_date = st.session_state.schedule_start_date
    end_date = st.session_state.schedule_end_date
    residents = st.session_state.csp_residents

    st.markdown("#### 📋 Generation Summary")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Date Range", f"{start_date} to {end_date}")
        total_days = (end_date - start_date).days + 1
        st.metric("Total Days", total_days)

    with col2:
        st.metric("Residents", len(residents))
        weekdays = sum(
            1
            for i in range(total_days)
            if (start_date + timedelta(days=i)).weekday() < 5
        )
        st.metric("Weekdays", weekdays)

    with col3:
        estimated_assignments = weekdays * 2 + ((total_days - weekdays) // 2) * 3
        st.metric("Est. Assignments", estimated_assignments)
        csp_params = st.session_state.get("csp_params", {})
        st.metric("Max Iterations", csp_params.get("max_iterations", 10000))

    # Pre-generation checks
    st.markdown("#### 🔍 Pre-Generation Checks")

    checks_passed = True

    # Check 1: Adequate residents for coverage
    pgy2_count = len([r for r in residents if r.pgy_level == "PGY-2"])
    pgy3_count = len([r for r in residents if r.pgy_level == "PGY-3"])
    pgy4_count = len([r for r in residents if r.pgy_level == "PGY-4"])

    if pgy2_count < 3:
        st.error(f"❌ Need at least 3 PGY-2s for adequate coverage (have {pgy2_count})")
        checks_passed = False
    else:
        st.success(f"✅ PGY-2 coverage: {pgy2_count} residents")

    if pgy3_count < 2:
        st.error(
            f"❌ Need at least 2 PGY-3s for Friday call coverage (have {pgy3_count})"
        )
        checks_passed = False
    else:
        st.success(f"✅ PGY-3 coverage: {pgy3_count} residents")

    if (pgy3_count + pgy4_count) < 2:
        st.error(
            f"❌ Need at least 2 PGY-3/4s for weekend moonlight (have {pgy3_count + pgy4_count})"
        )
        checks_passed = False
    else:
        st.success(f"✅ Senior coverage: {pgy3_count + pgy4_count} residents")

    # Check 2: Time-off conflicts
    total_time_off_days = sum(len(r.time_off_requests) for r in residents)
    if total_time_off_days > total_days * 0.3:  # More than 30% of days have time-off
        st.warning(f"⚠️ High time-off load: {total_time_off_days} total days requested")
    else:
        st.success(f"✅ Time-off load manageable: {total_time_off_days} days")

    # Generation button
    st.markdown("#### 🎯 Generate Schedule")

    if checks_passed:
        col1, col2 = st.columns([3, 1])

        with col1:
            if st.button(
                "🚀 Generate Optimal Schedule", type="primary", use_container_width=True
            ):
                generate_schedule_with_progress()

        with col2:
            if st.button("🧪 Test Run (7 days)", use_container_width=True):
                test_end_date = start_date + timedelta(days=6)
                generate_schedule_with_progress(test_end_date=test_end_date)

    else:
        st.error("❌ Cannot generate schedule - fix the issues above first")


def generate_schedule_with_progress(test_end_date=None):
    """Generate schedule with progress tracking"""

    # Initialize engines
    try:
        rules_engine = PMRSchedulingRules()
        csp_engine = CSPSchedulingEngine(rules_engine)
    except Exception as e:
        st.error(f"❌ Error initializing engines: {e}")
        return

    # Set up parameters
    residents = st.session_state.csp_residents
    start_date = st.session_state.schedule_start_date
    end_date = test_end_date or st.session_state.schedule_end_date

    # Show progress
    progress_container = st.container()

    with progress_container:
        st.info("🏗️ Setting up CSP problem...")

        # Setup
        csp_engine.setup_schedule_generation(residents, start_date, end_date)

        st.info("🎯 Running CSP algorithm...")
        progress_bar = st.progress(0)
        status_text = st.empty()

        # Override CSP engine to show progress
        original_max_iterations = csp_engine.max_iterations

        def progress_callback(iteration, max_iter):
            progress = iteration / max_iter
            progress_bar.progress(min(progress, 1.0))
            status_text.text(f"Iteration {iteration}/{max_iter} ({progress*100:.1f}%)")

        # Generate
        try:
            schedule, stats = csp_engine.generate_schedule()

            progress_bar.progress(1.0)

            if schedule:
                st.success(
                    f"✅ Schedule generated! {len(schedule)} assignments created"
                )

                # Store results
                st.session_state.generated_schedule = schedule
                st.session_state.generation_stats = stats

                # Validate
                hard_violations, soft_violations, validation_details = (
                    csp_engine.validate_generated_schedule(schedule)
                )

                st.session_state.validation_results = {
                    "hard_violations": hard_violations,
                    "soft_violations": soft_violations,
                    "validation_details": validation_details,
                }

                if not hard_violations:
                    st.balloons()

            else:
                st.error("❌ No valid schedule found")
                st.session_state.generation_stats = stats

                # Show debug info
                with st.expander("🔧 Debug Information"):
                    st.json(stats)

        except Exception as e:
            st.error(f"❌ Error during generation: {e}")
            st.exception(e)

        finally:
            progress_container.empty()


def show_results_tab():
    """Results display tab"""
    if st.session_state.generated_schedule is None:
        st.info(
            "📋 No schedule generated yet. Generate a schedule in the Generate tab."
        )
        return

    schedule = st.session_state.generated_schedule
    stats = st.session_state.generation_stats
    validation = st.session_state.get("validation_results", {})

    st.markdown("### 📋 Generated Schedule Results")

    # Summary metrics
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Total Assignments", len(schedule))

    with col2:
        generation_time = stats.get("duration", 0)
        st.metric("Generation Time", f"{generation_time:.2f}s")

    with col3:
        hard_violations = len(validation.get("hard_violations", []))
        st.metric(
            "Hard Violations",
            hard_violations,
            delta=None if hard_violations == 0 else "❌",
        )

    with col4:
        soft_violations = len(validation.get("soft_violations", []))
        st.metric("Soft Violations", soft_violations)

    # Validation status
    if hard_violations == 0:
        st.success("✅ Schedule is valid - all hard constraints satisfied!")
    else:
        st.error(f"❌ Schedule has {hard_violations} hard constraint violations")

        with st.expander("🔍 Hard Violations"):
            for violation in validation["hard_violations"]:
                st.write(f"• {violation}")

    if soft_violations > 0:
        st.warning(
            f"⚠️ {soft_violations} soft constraint violations (preferences not fully met)"
        )

        with st.expander("🔍 Soft Violations"):
            for violation in validation["soft_violations"][:10]:  # Show first 10
                st.write(f"• {violation}")

    # Schedule display options
    st.markdown("### 📅 Schedule Display")

    display_option = st.selectbox(
        "Display Format",
        ["Calendar View", "Table View", "By Resident", "By Shift Type"],
        index=0,
    )

    if display_option == "Calendar View":
        show_calendar_view(schedule)
    elif display_option == "Table View":
        show_table_view(schedule)
    elif display_option == "By Resident":
        show_by_resident_view(schedule)
    elif display_option == "By Shift Type":
        show_by_shift_type_view(schedule)

    # Export options
    st.markdown("### 📤 Export Options")

    col1, col2, col3 = st.columns(3)

    with col1:
        if st.button("📥 Download JSON", use_container_width=True):
            download_schedule_json(schedule, stats)

    with col2:
        if st.button("📊 Download CSV", use_container_width=True):
            download_schedule_csv(schedule)

    with col3:
        if st.button("📋 Generate Report", use_container_width=True):
            generate_schedule_report(schedule, stats, validation)


def show_calendar_view(schedule):
    """Show schedule in calendar format"""

    # Group assignments by date
    schedule_by_date = {}
    for assignment in schedule:
        date_str = assignment.date.strftime("%Y-%m-%d")
        if date_str not in schedule_by_date:
            schedule_by_date[date_str] = []
        schedule_by_date[date_str].append(assignment)

    # Display calendar
    start_date = min(assignment.date for assignment in schedule)
    end_date = max(assignment.date for assignment in schedule)

    current_date = start_date

    while current_date <= end_date:
        date_str = current_date.strftime("%Y-%m-%d")
        day_name = current_date.strftime("%A")

        # Create expandable section for each day
        assignments = schedule_by_date.get(date_str, [])

        with st.expander(f"{date_str} ({day_name}) - {len(assignments)} assignments"):
            if assignments:
                for assignment in assignments:
                    resident_name = next(
                        r.name
                        for r in st.session_state.csp_residents
                        if r.id == assignment.resident_id
                    )
                    shift_display = assignment.shift_type.replace("_", " ").title()
                    st.write(
                        f"**{shift_display}:** {resident_name} ({assignment.pgy_level})"
                    )
            else:
                st.write("No assignments")

        current_date += timedelta(days=1)


def show_table_view(schedule):
    """Show schedule in table format"""

    # Convert to DataFrame
    schedule_data = []
    for assignment in schedule:
        resident_name = next(
            r.name
            for r in st.session_state.csp_residents
            if r.id == assignment.resident_id
        )
        schedule_data.append(
            {
                "Date": assignment.date.strftime("%Y-%m-%d"),
                "Day": assignment.date.strftime("%A"),
                "Shift Type": assignment.shift_type.replace("_", " ").title(),
                "Resident": resident_name,
                "PGY Level": assignment.pgy_level,
            }
        )

    schedule_df = pd.DataFrame(schedule_data)

    # Add filters
    col1, col2, col3 = st.columns(3)

    with col1:
        shift_filter = st.multiselect(
            "Filter by Shift Type",
            options=schedule_df["Shift Type"].unique(),
            default=schedule_df["Shift Type"].unique(),
        )

    with col2:
        resident_filter = st.multiselect(
            "Filter by Resident",
            options=schedule_df["Resident"].unique(),
            default=schedule_df["Resident"].unique(),
        )

    with col3:
        pgy_filter = st.multiselect(
            "Filter by PGY Level",
            options=schedule_df["PGY Level"].unique(),
            default=schedule_df["PGY Level"].unique(),
        )

    # Apply filters
    filtered_df = schedule_df[
        (schedule_df["Shift Type"].isin(shift_filter))
        & (schedule_df["Resident"].isin(resident_filter))
        & (schedule_df["PGY Level"].isin(pgy_filter))
    ]

    st.dataframe(filtered_df, use_container_width=True, hide_index=True)


def show_by_resident_view(schedule):
    """Show schedule grouped by resident"""

    # Group by resident
    resident_schedules = {}
    for assignment in schedule:
        if assignment.resident_id not in resident_schedules:
            resident_schedules[assignment.resident_id] = []
        resident_schedules[assignment.resident_id].append(assignment)

    # Display each resident's schedule
    for resident in st.session_state.csp_residents:
        assignments = resident_schedules.get(resident.id, [])

        with st.expander(
            f"{resident.name} ({resident.pgy_level}) - {len(assignments)} assignments"
        ):
            if assignments:
                # Sort by date
                assignments.sort(key=lambda a: a.date)

                for assignment in assignments:
                    shift_display = assignment.shift_type.replace("_", " ").title()
                    day_name = assignment.date.strftime("%A")
                    st.write(f"• {assignment.date} ({day_name}): **{shift_display}**")
            else:
                st.write("No assignments")


def show_by_shift_type_view(schedule):
    """Show schedule grouped by shift type"""

    # Group by shift type
    shift_schedules = {}
    for assignment in schedule:
        if assignment.shift_type not in shift_schedules:
            shift_schedules[assignment.shift_type] = []
        shift_schedules[assignment.shift_type].append(assignment)

    # Display each shift type
    for shift_type, assignments in shift_schedules.items():
        shift_display = shift_type.replace("_", " ").title()

        with st.expander(f"{shift_display} - {len(assignments)} assignments"):
            if assignments:
                # Sort by date
                assignments.sort(key=lambda a: a.date)

                for assignment in assignments:
                    resident_name = next(
                        r.name
                        for r in st.session_state.csp_residents
                        if r.id == assignment.resident_id
                    )
                    day_name = assignment.date.strftime("%A")
                    st.write(
                        f"• {assignment.date} ({day_name}): **{resident_name}** ({assignment.pgy_level})"
                    )


def show_analysis_tab():
    """Analysis and statistics tab"""
    if st.session_state.generated_schedule is None:
        st.info("📊 No schedule to analyze. Generate a schedule first.")
        return

    schedule = st.session_state.generated_schedule
    stats = st.session_state.generation_stats

    st.markdown("### 📊 Schedule Analysis")

    # Generation statistics
    st.markdown("#### 🔧 Generation Statistics")

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Assignments Tried", stats.get("assignments_tried", 0))

    with col2:
        st.metric("Backtracks", stats.get("backtracks", 0))

    with col3:
        st.metric("Constraint Checks", stats.get("constraint_checks", 0))

    with col4:
        efficiency = (len(schedule) / max(stats.get("assignments_tried", 1), 1)) * 100
        st.metric("Efficiency", f"{efficiency:.2f}%")

    # Assignment distribution
    st.markdown("#### 📈 Assignment Distribution")

    # By resident
    resident_counts = {}
    for assignment in schedule:
        resident_name = next(
            r.name
            for r in st.session_state.csp_residents
            if r.id == assignment.resident_id
        )
        resident_counts[resident_name] = resident_counts.get(resident_name, 0) + 1

    fig_residents = px.bar(
        x=list(resident_counts.keys()),
        y=list(resident_counts.values()),
        title="Assignments per Resident",
        labels={"x": "Resident", "y": "Assignment Count"},
    )
    fig_residents.update_layout(height=300)
    st.plotly_chart(fig_residents, use_container_width=True)

    # By shift type
    shift_counts = {}
    for assignment in schedule:
        shift_type = assignment.shift_type.replace("_", " ").title()
        shift_counts[shift_type] = shift_counts.get(shift_type, 0) + 1

    fig_shifts = px.pie(
        values=list(shift_counts.values()),
        names=list(shift_counts.keys()),
        title="Distribution by Shift Type",
    )
    fig_shifts.update_layout(height=400)
    st.plotly_chart(fig_shifts, use_container_width=True)

    # Quota progress
    st.markdown("#### 🎯 Quota Progress Analysis")

    quota_data = []
    for resident in st.session_state.csp_residents:
        resident_assignments = [a for a in schedule if a.resident_id == resident.id]

        # Count by type
        call_count = len(
            [
                a
                for a in resident_assignments
                if "call" in a.shift_type and "weekend" not in a.shift_type
            ]
        )
        moonlight_count = len(
            [a for a in resident_assignments if "moonlight" in a.shift_type]
        )
        weekend_count = len(
            [a for a in resident_assignments if "weekend" in a.shift_type]
        )

        # Add completed counts
        total_call = call_count + resident.completed.get("weekday_call", 0)
        total_moonlight = moonlight_count + resident.completed.get("moonlight", 0)
        total_weekend = weekend_count + resident.completed.get("weekend_call", 0)

        quota_data.append(
            {
                "Resident": resident.name,
                "PGY Level": resident.pgy_level,
                "Call (Current)": call_count,
                "Call (Total)": total_call,
                "Call (Quota)": resident.quotas.get("weekday_call", 0),
                "Call Progress": f"{(total_call / resident.quotas.get('weekday_call', 1) * 100):.1f}%",
                "Moonlight (Current)": moonlight_count,
                "Moonlight (Total)": total_moonlight,
                "Moonlight (Quota)": resident.quotas.get("moonlight", 0),
                "Moonlight Progress": f"{(total_moonlight / resident.quotas.get('moonlight', 1) * 100):.1f}%",
            }
        )

    quota_df = pd.DataFrame(quota_data)
    st.dataframe(quota_df, use_container_width=True, hide_index=True)

    # Schedule timeline
    st.markdown("#### 📅 Schedule Timeline")

    # Create timeline data
    timeline_data = []
    for assignment in schedule:
        resident_name = next(
            r.name
            for r in st.session_state.csp_residents
            if r.id == assignment.resident_id
        )
        timeline_data.append(
            {
                "Date": assignment.date,
                "Resident": resident_name,
                "Shift Type": assignment.shift_type.replace("_", " ").title(),
                "PGY Level": assignment.pgy_level,
            }
        )

    timeline_df = pd.DataFrame(timeline_data)

    # Create timeline chart
    fig_timeline = px.scatter(
        timeline_df,
        x="Date",
        y="Resident",
        color="Shift Type",
        symbol="PGY Level",
        title="Schedule Timeline View",
        height=500,
    )
    fig_timeline.update_traces(marker=dict(size=10))
    st.plotly_chart(fig_timeline, use_container_width=True)


# Helper functions


def convert_quota_data_to_residents(quota_data):
    """Convert Quota Tracker data to Resident objects"""
    residents = []

    for resident_data in quota_data.get("residents", []):
        # Create default quotas based on PGY level
        pgy_level = resident_data.get("category", "PGY-2")

        if pgy_level == "PGY-2":
            default_quotas = {"weekday_call": 38, "weekend_call": 7.5, "moonlight": 21}
        elif pgy_level == "PGY-3":
            default_quotas = {"weekday_call": 30, "weekend_call": 2.5, "moonlight": 27}
        elif pgy_level == "PGY-4":
            default_quotas = {"weekday_call": 5, "weekend_call": 0.5, "moonlight": 27}
        else:
            default_quotas = {"weekday_call": 20, "weekend_call": 2, "moonlight": 15}

        # Get completed shifts from quota data
        completed_shifts = quota_data.get("completed_shifts", {}).get(
            resident_data["name"], {}
        )

        # Convert shift types to match our format
        completed = {}
        for shift_type, count in completed_shifts.items():
            if "call" in shift_type.lower() and "weekend" not in shift_type.lower():
                completed["weekday_call"] = completed.get("weekday_call", 0) + count
            elif "weekend" in shift_type.lower():
                completed["weekend_call"] = completed.get("weekend_call", 0) + count
            elif "moonlight" in shift_type.lower() or "secondary" in shift_type.lower():
                completed["moonlight"] = completed.get("moonlight", 0) + count

        resident = Resident(
            id=f"resident_{len(residents) + 1}",
            name=resident_data["name"],
            pgy_level=pgy_level,
            quotas=default_quotas,
            completed=completed,
            time_off_requests=[],
            va_rotation_weeks=[],
            holiday_approved=False,
            preferences={},
        )

        residents.append(resident)

    return residents


def download_schedule_json(schedule, stats):
    """Download schedule as JSON"""

    # Convert schedule to serializable format
    schedule_data = []
    for assignment in schedule:
        resident_name = next(
            r.name
            for r in st.session_state.csp_residents
            if r.id == assignment.resident_id
        )
        schedule_data.append(
            {
                "date": assignment.date.isoformat(),
                "resident_id": assignment.resident_id,
                "resident_name": resident_name,
                "pgy_level": assignment.pgy_level,
                "shift_type": assignment.shift_type,
                "day_of_week": assignment.date.strftime("%A"),
            }
        )

    export_data = {
        "metadata": {
            "generated_on": datetime.now().isoformat(),
            "start_date": st.session_state.schedule_start_date.isoformat(),
            "end_date": st.session_state.schedule_end_date.isoformat(),
            "total_assignments": len(schedule),
            "residents": len(st.session_state.csp_residents),
        },
        "schedule": schedule_data,
        "statistics": stats,
    }

    json_string = json.dumps(export_data, indent=2)

    st.download_button(
        label="📥 Download JSON",
        data=json_string,
        file_name=f"pmr_schedule_{st.session_state.schedule_start_date}_{st.session_state.schedule_end_date}.json",
        mime="application/json",
    )


def download_schedule_csv(schedule):
    """Download schedule as CSV"""

    # Convert to DataFrame
    schedule_data = []
    for assignment in schedule:
        resident_name = next(
            r.name
            for r in st.session_state.csp_residents
            if r.id == assignment.resident_id
        )
        schedule_data.append(
            {
                "Date": assignment.date.strftime("%Y-%m-%d"),
                "Day_of_Week": assignment.date.strftime("%A"),
                "Shift_Type": assignment.shift_type,
                "Resident_Name": resident_name,
                "Resident_ID": assignment.resident_id,
                "PGY_Level": assignment.pgy_level,
            }
        )

    schedule_df = pd.DataFrame(schedule_data)
    csv_string = schedule_df.to_csv(index=False)

    st.download_button(
        label="📊 Download CSV",
        data=csv_string,
        file_name=f"pmr_schedule_{st.session_state.schedule_start_date}_{st.session_state.schedule_end_date}.csv",
        mime="text/csv",
    )


def generate_schedule_report(schedule, stats, validation):
    """Generate comprehensive schedule report"""

    # Create report
    report = f"""
# PM&R Schedule Report

**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Period:** {st.session_state.schedule_start_date} to {st.session_state.schedule_end_date}
**Total Assignments:** {len(schedule)}

## Generation Statistics

- **Generation Time:** {stats.get('duration', 0):.2f} seconds
- **Assignments Tried:** {stats.get('assignments_tried', 0):,}
- **Backtracks:** {stats.get('backtracks', 0):,}
- **Constraint Checks:** {stats.get('constraint_checks', 0):,}

## Validation Results

- **Hard Violations:** {len(validation.get('hard_violations', []))}
- **Soft Violations:** {len(validation.get('soft_violations', []))}
- **Schedule Status:** {'✅ Valid' if len(validation.get('hard_violations', [])) == 0 else '❌ Invalid'}

## Resident Assignment Summary

"""

    # Add resident summaries
    for resident in st.session_state.csp_residents:
        resident_assignments = [a for a in schedule if a.resident_id == resident.id]
        call_count = len([a for a in resident_assignments if "call" in a.shift_type])
        moonlight_count = len(
            [a for a in resident_assignments if "moonlight" in a.shift_type]
        )

        report += f"**{resident.name} ({resident.pgy_level}):** {len(resident_assignments)} total ({call_count} calls, {moonlight_count} moonlights)\n"

    report += "\n## Schedule Details\n\n"

    # Add schedule details
    schedule_by_date = {}
    for assignment in schedule:
        date_str = assignment.date.strftime("%Y-%m-%d")
        if date_str not in schedule_by_date:
            schedule_by_date[date_str] = []
        schedule_by_date[date_str].append(assignment)

    for date_str in sorted(schedule_by_date.keys()):
        assignments = schedule_by_date[date_str]
        day_name = assignments[0].date.strftime("%A")
        report += f"**{date_str} ({day_name}):**\n"

        for assignment in assignments:
            resident_name = next(
                r.name
                for r in st.session_state.csp_residents
                if r.id == assignment.resident_id
            )
            shift_display = assignment.shift_type.replace("_", " ").title()
            report += f"- {shift_display}: {resident_name} ({assignment.pgy_level})\n"

        report += "\n"

    # Download report
    st.download_button(
        label="📋 Download Report",
        data=report,
        file_name=f"pmr_schedule_report_{st.session_state.schedule_start_date}_{st.session_state.schedule_end_date}.md",
        mime="text/markdown",
    )
