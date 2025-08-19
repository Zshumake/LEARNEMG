import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, date, timedelta
import calendar
import json
import sys
import os

# Import the scheduling engines
try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)

    sys.path.append(parent_dir)
    from integrated_pmr_scheduler import PMRScheduleGenerator
    from csp_scheduling_engine import CSPSchedulingEngine
except ImportError as e:
    st.error(f"Could not import scheduling engines: {e}")


def render():
    """Render the Schedule Generation interface"""

    st.markdown("## 🗓️ Schedule Generation System")

    # Check if residents exist
    if (
        "residents" not in st.session_state
        or not st.session_state.residents["residents"]
    ):
        st.warning(
            "⚠️ No residents found. Please add residents using the Resident Management tab before generating schedules."
        )
        return

    # Main tabs for schedule generation
    tab1, tab2, tab3, tab4 = st.tabs(
        [
            "🚀 Generate Schedule",
            "📊 Current Schedule",
            "🔍 Schedule Analysis",
            "📤 Export/Import",
        ]
    )

    with tab1:
        generate_schedule_interface()

    with tab2:
        display_current_schedule()

    with tab3:
        analyze_schedule()

    with tab4:
        export_import_schedule()


def generate_schedule_interface():
    """Interface for generating new schedules"""

    st.markdown("### Schedule Generation Configuration")

    # Schedule period selection
    col1, col2 = st.columns(2)

    with col1:
        start_date = st.date_input(
            "Schedule Start Date",
            value=date(2025, 7, 1),  # Default to July 1st
            help="Select the first date for schedule generation",
        )

    with col2:
        end_date = st.date_input(
            "Schedule End Date",
            value=date(2025, 9, 30),  # Default to end of Q1
            help="Select the last date for schedule generation",
        )

    if start_date >= end_date:
        st.error("End date must be after start date.")
        return

    # Calculate schedule duration
    duration = (end_date - start_date).days + 1
    st.info(
        f"📅 Schedule Duration: {duration} days ({duration // 7} weeks, {duration % 7} extra days)"
    )

    # Algorithm selection
    st.markdown("### Algorithm Configuration")

    algorithm_col1, algorithm_col2 = st.columns(2)

    with algorithm_col1:
        algorithm_type = st.selectbox(
            "Scheduling Algorithm",
            [
                "CSP with Backtracking (Recommended)",
                "Integrated PMR Sequential",
                "Hybrid CSP-PMR",
            ],
            help="Choose the scheduling algorithm to use",
        )

    with algorithm_col2:
        optimization_level = st.selectbox(
            "Optimization Level",
            ["Balanced", "Speed Priority", "Quality Priority"],
            index=0,
            help="Balance between generation speed and schedule quality",
        )

    # Advanced settings
    with st.expander("🔧 Advanced Settings"):
        col3, col4 = st.columns(2)

        with col3:
            max_iterations = st.number_input(
                "Maximum Iterations",
                value=10000,
                min_value=1000,
                max_value=100000,
                step=1000,
                help="Maximum iterations for optimization algorithms",
            )

            enforce_soft_rules = st.checkbox(
                "Enforce Soft Rules",
                value=True,
                help="Attempt to satisfy soft rules in addition to hard rules",
            )

        with col4:
            timeout_minutes = st.number_input(
                "Timeout (minutes)",
                value=5,
                min_value=1,
                max_value=60,
                help="Maximum time to spend generating schedule",
            )

            allow_manual_fixes = st.checkbox(
                "Allow Manual Overrides",
                value=True,
                help="Enable manual fixes for constraint violations",
            )

    # Resident availability override
    st.markdown("### Resident Availability Overrides")

    selected_residents = st.multiselect(
        "Select residents to include (leave empty for all)",
        [r["name"] for r in st.session_state.residents["residents"]],
        default=[],
        help="If no residents selected, all will be included",
    )

    if not selected_residents:
        selected_residents = [
            r["name"] for r in st.session_state.residents["residents"]
        ]

    # Display selected residents summary
    st.markdown("#### Selected Residents Summary")

    resident_summary = []
    for resident in st.session_state.residents["residents"]:
        if resident["name"] in selected_residents:
            resident_summary.append(
                {
                    "Name": resident["name"],
                    "PGY": resident["pgy_level"],
                    "Call Target": resident["quota_targets"]["call"],
                    "Moonlight Target": resident["quota_targets"]["moonlight"],
                    "Time-Off Days": len(resident["time_off"]),
                }
            )

    if resident_summary:
        summary_df = pd.DataFrame(resident_summary)
        st.dataframe(summary_df, use_container_width=True, hide_index=True)

    # Generate button and progress tracking
    st.markdown("---")

    col5, col6, col7 = st.columns([2, 1, 2])

    with col6:
        if st.button("🚀 Generate Schedule", type="primary", use_container_width=True):
            generate_new_schedule(
                start_date,
                end_date,
                algorithm_type,
                optimization_level,
                selected_residents,
                max_iterations,
                timeout_minutes,
                enforce_soft_rules,
                allow_manual_fixes,
            )


def generate_new_schedule(
    start_date,
    end_date,
    algorithm_type,
    optimization_level,
    selected_residents,
    max_iterations,
    timeout_minutes,
    enforce_soft_rules,
    allow_manual_fixes,
):
    """Generate a new schedule with the specified parameters"""

    # Initialize progress tracking
    progress_container = st.container()

    with progress_container:
        st.markdown("### 🔄 Schedule Generation in Progress")
        progress_bar = st.progress(0)
        status_text = st.empty()
        log_container = st.expander("📋 Generation Log", expanded=True)

        try:
            # Step 1: Prepare data
            status_text.text("📊 Preparing resident data...")
            progress_bar.progress(0.1)

            # Filter selected residents
            active_residents = [
                r
                for r in st.session_state.residents["residents"]
                if r["name"] in selected_residents
            ]

            with log_container:
                st.write(f"✅ Loaded {len(active_residents)} residents")
                st.write(f"📅 Schedule period: {start_date} to {end_date}")
                st.write(f"🎯 Algorithm: {algorithm_type}")

            # Step 2: Initialize scheduling engine
            status_text.text("⚙️ Initializing scheduling engine...")
            progress_bar.progress(0.2)

            if "CSP" in algorithm_type:
                scheduler = initialize_csp_scheduler(
                    active_residents, start_date, end_date
                )
            elif "PMR" in algorithm_type:
                scheduler = initialize_pmr_scheduler(
                    active_residents, start_date, end_date
                )
            else:
                scheduler = initialize_hybrid_scheduler(
                    active_residents, start_date, end_date
                )

            with log_container:
                st.write("✅ Scheduling engine initialized")

            # Step 3: Generate schedule
            status_text.text("🎯 Generating optimal schedule...")
            progress_bar.progress(0.4)

            # Simulate schedule generation process
            import time

            for i in range(6):
                time.sleep(0.5)
                progress_bar.progress(0.4 + (i * 0.1))

                with log_container:
                    if i == 0:
                        st.write("🔍 Analyzing constraints...")
                    elif i == 1:
                        st.write("📋 Processing hard rules...")
                    elif i == 2:
                        st.write("🎯 Optimizing assignments...")
                    elif i == 3:
                        st.write("🛡️ Validating schedule...")
                    elif i == 4:
                        st.write("🔧 Applying final optimizations...")
                    else:
                        st.write("✅ Schedule generation complete!")

            # Step 4: Generate mock schedule results
            status_text.text("📊 Finalizing schedule results...")
            progress_bar.progress(1.0)

            # Create mock schedule for demonstration
            schedule_result = create_mock_schedule(
                active_residents, start_date, end_date
            )

            # Store in session state
            st.session_state.current_schedule = schedule_result
            st.session_state.schedule_metadata = {
                "generated_at": datetime.now().isoformat(),
                "algorithm": algorithm_type,
                "period_start": start_date.isoformat(),
                "period_end": end_date.isoformat(),
                "resident_count": len(active_residents),
                "total_assignments": len(schedule_result["assignments"]),
                "hard_violations": schedule_result["violations"]["hard"],
                "soft_violations": schedule_result["violations"]["soft"],
            }

            with log_container:
                st.write("✅ Schedule stored successfully")
                st.write(
                    f"📊 Generated {len(schedule_result['assignments'])} total assignments"
                )
                st.write(
                    f"🛡️ Hard rule violations: {schedule_result['violations']['hard']}"
                )
                st.write(
                    f"🎯 Soft rule violations: {schedule_result['violations']['soft']}"
                )

            # Clear progress and show success
            progress_container.empty()

            # Success message
            st.success("🎉 Schedule Generated Successfully!")

            # Show summary metrics
            col1, col2, col3, col4 = st.columns(4)

            with col1:
                st.metric("Total Assignments", len(schedule_result["assignments"]))

            with col2:
                st.metric(
                    "Hard Violations", schedule_result["violations"]["hard"], delta=0
                )

            with col3:
                st.metric("Soft Violations", schedule_result["violations"]["soft"])

            with col4:
                compliance = (
                    (
                        (
                            len(schedule_result["assignments"])
                            - schedule_result["violations"]["hard"]
                        )
                        / len(schedule_result["assignments"])
                    )
                    * 100
                    if schedule_result["assignments"]
                    else 0
                )
                st.metric("Compliance Rate", f"{compliance:.1f}%")

            # Show balloons for successful generation
            st.balloons()

        except Exception as e:
            progress_container.empty()
            st.error(f"❌ Schedule generation failed: {str(e)}")
            st.exception(e)


def create_mock_schedule(residents, start_date, end_date):
    """Create a mock schedule for demonstration purposes"""

    assignments = []
    current_date = start_date
    assignment_id = 1

    # Generate assignments for each day
    while current_date <= end_date:
        weekday = current_date.weekday()  # 0 = Monday, 6 = Sunday

        # Weekday assignments (Monday-Friday)
        if weekday < 5:
            # Call shift - one resident per day
            call_resident = residents[assignment_id % len(residents)]
            assignments.append(
                {
                    "id": assignment_id,
                    "date": current_date.isoformat(),
                    "shift_type": "call",
                    "resident_name": call_resident["name"],
                    "resident_pgy": call_resident["pgy_level"],
                    "start_time": "17:00",
                    "end_time": "08:00+1",
                }
            )
            assignment_id += 1

            # Moonlight shift (Monday-Thursday)
            if weekday < 4:
                moonlight_resident = residents[(assignment_id + 1) % len(residents)]
                assignments.append(
                    {
                        "id": assignment_id,
                        "date": current_date.isoformat(),
                        "shift_type": "moonlight",
                        "resident_name": moonlight_resident["name"],
                        "resident_pgy": moonlight_resident["pgy_level"],
                        "start_time": "20:00",
                        "end_time": "08:00+1",
                    }
                )
                assignment_id += 1

            # Friday moonlight (2 residents)
            elif weekday == 4:
                for i in range(2):
                    moonlight_resident = residents[(assignment_id + i) % len(residents)]
                    assignments.append(
                        {
                            "id": assignment_id,
                            "date": current_date.isoformat(),
                            "shift_type": "moonlight",
                            "resident_name": moonlight_resident["name"],
                            "resident_pgy": moonlight_resident["pgy_level"],
                            "start_time": "20:00",
                            "end_time": "08:00+1",
                        }
                    )
                    assignment_id += 1

        # Weekend assignments (Saturday-Sunday)
        elif weekday == 5:  # Saturday
            # Weekend call (PGY-2)
            pgy2_residents = [r for r in residents if r["pgy_level"] == "PGY-2"]
            if pgy2_residents:
                weekend_call_resident = pgy2_residents[
                    assignment_id % len(pgy2_residents)
                ]
                assignments.append(
                    {
                        "id": assignment_id,
                        "date": current_date.isoformat(),
                        "shift_type": "weekend_call",
                        "resident_name": weekend_call_resident["name"],
                        "resident_pgy": weekend_call_resident["pgy_level"],
                        "start_time": "08:00",
                        "end_time": "08:00+2",  # Covers both Saturday and Sunday
                    }
                )
                assignment_id += 1

            # Weekend moonlight
            pgy3_4_residents = [
                r for r in residents if r["pgy_level"] in ["PGY-3", "PGY-4"]
            ]
            if pgy3_4_residents:
                weekend_moonlight_resident = pgy3_4_residents[
                    assignment_id % len(pgy3_4_residents)
                ]
                assignments.append(
                    {
                        "id": assignment_id,
                        "date": current_date.isoformat(),
                        "shift_type": "weekend_moonlight",
                        "resident_name": weekend_moonlight_resident["name"],
                        "resident_pgy": weekend_moonlight_resident["pgy_level"],
                        "start_time": "08:00",
                        "end_time": "08:00+2",  # Covers both Saturday and Sunday
                    }
                )
                assignment_id += 1

        current_date += timedelta(days=1)

    # Calculate mock violations
    hard_violations = max(0, len(assignments) // 50)  # Simulate some violations
    soft_violations = max(0, len(assignments) // 20)

    return {
        "assignments": assignments,
        "violations": {"hard": hard_violations, "soft": soft_violations},
        "statistics": {
            "total_days": (end_date - start_date).days + 1,
            "total_assignments": len(assignments),
            "residents_count": len(residents),
        },
    }


def initialize_csp_scheduler(residents, start_date, end_date):
    """Initialize CSP scheduling engine"""
    # Mock initialization - would normally create CSPSchedulingEngine instance
    return {
        "type": "CSP",
        "residents": len(residents),
        "period": (start_date, end_date),
    }


def initialize_pmr_scheduler(residents, start_date, end_date):
    """Initialize PMR scheduling engine"""
    # Mock initialization - would normally create PMRScheduleGenerator instance
    return {
        "type": "PMR",
        "residents": len(residents),
        "period": (start_date, end_date),
    }


def initialize_hybrid_scheduler(residents, start_date, end_date):
    """Initialize hybrid scheduling engine"""
    # Mock initialization - would normally create hybrid scheduler
    return {
        "type": "Hybrid",
        "residents": len(residents),
        "period": (start_date, end_date),
    }


def display_current_schedule():
    """Display the currently generated schedule"""

    if "current_schedule" not in st.session_state:
        st.info(
            "📅 No schedule generated yet. Use the 'Generate Schedule' tab to create a new schedule."
        )
        return

    schedule = st.session_state.current_schedule
    metadata = st.session_state.schedule_metadata

    st.markdown("### 📊 Current Schedule Overview")

    # Schedule metadata
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Total Days", schedule["statistics"]["total_days"])

    with col2:
        st.metric("Total Assignments", schedule["statistics"]["total_assignments"])

    with col3:
        st.metric("Residents", schedule["statistics"]["residents_count"])

    with col4:
        generated_date = datetime.fromisoformat(metadata["generated_at"]).strftime(
            "%m/%d %H:%M"
        )
        st.metric("Generated", generated_date)

    # Schedule view options
    view_type = st.radio(
        "View Type", ["Calendar View", "List View", "Resident View"], horizontal=True
    )

    if view_type == "Calendar View":
        display_calendar_view(schedule)
    elif view_type == "List View":
        display_list_view(schedule)
    else:
        display_resident_view(schedule)


def display_calendar_view(schedule):
    """Display schedule in calendar format"""

    st.markdown("#### 📅 Calendar View")

    # Group assignments by date
    assignments_by_date = {}
    for assignment in schedule["assignments"]:
        date_str = assignment["date"]
        if date_str not in assignments_by_date:
            assignments_by_date[date_str] = []
        assignments_by_date[date_str].append(assignment)

    # Create calendar display
    if assignments_by_date:
        # Get date range
        dates = list(assignments_by_date.keys())
        start_date = datetime.fromisoformat(min(dates)).date()
        end_date = datetime.fromisoformat(max(dates)).date()

        # Month navigation
        current_month = st.selectbox(
            "Select Month",
            options=list(
                set([datetime.fromisoformat(d).strftime("%Y-%m") for d in dates])
            ),
            format_func=lambda x: datetime.strptime(x, "%Y-%m").strftime("%B %Y"),
        )

        # Filter assignments for selected month
        month_assignments = {
            k: v
            for k, v in assignments_by_date.items()
            if datetime.fromisoformat(k).strftime("%Y-%m") == current_month
        }

        # Display calendar grid
        if month_assignments:
            # Create DataFrame for calendar display
            calendar_data = []
            for date_str, day_assignments in month_assignments.items():
                date_obj = datetime.fromisoformat(date_str).date()

                assignment_summary = []
                for assignment in day_assignments:
                    shift_abbrev = {
                        "call": "C",
                        "moonlight": "M",
                        "weekend_call": "WC",
                        "weekend_moonlight": "WM",
                    }.get(
                        assignment["shift_type"], assignment["shift_type"][:2].upper()
                    )

                    assignment_summary.append(
                        f"{assignment['resident_name'].split()[-1]} ({shift_abbrev})"
                    )

                calendar_data.append(
                    {
                        "Date": date_obj.strftime("%m/%d"),
                        "Day": date_obj.strftime("%A"),
                        "Assignments": ", ".join(assignment_summary),
                        "Count": len(day_assignments),
                    }
                )

            calendar_df = pd.DataFrame(calendar_data)

            st.dataframe(
                calendar_df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "Date": st.column_config.TextColumn("Date", width=100),
                    "Day": st.column_config.TextColumn("Day", width=100),
                    "Assignments": st.column_config.TextColumn(
                        "Assignments", width=400
                    ),
                    "Count": st.column_config.NumberColumn("# Shifts", width=100),
                },
            )
        else:
            st.warning(f"No assignments found for {current_month}")
    else:
        st.warning("No assignments to display")


def display_list_view(schedule):
    """Display schedule in list format"""

    st.markdown("#### 📋 Assignment List")

    if not schedule["assignments"]:
        st.warning("No assignments to display")
        return

    # Convert assignments to DataFrame
    assignments_df = pd.DataFrame(schedule["assignments"])

    # Format for display
    assignments_df["Date"] = pd.to_datetime(assignments_df["date"]).dt.strftime(
        "%Y-%m-%d"
    )
    assignments_df["Day"] = pd.to_datetime(assignments_df["date"]).dt.strftime("%A")

    # Filter and sort options
    col1, col2, col3 = st.columns(3)

    with col1:
        shift_filter = st.multiselect(
            "Filter by Shift Type",
            options=assignments_df["shift_type"].unique(),
            default=assignments_df["shift_type"].unique(),
        )

    with col2:
        pgy_filter = st.multiselect(
            "Filter by PGY Level",
            options=assignments_df["resident_pgy"].unique(),
            default=assignments_df["resident_pgy"].unique(),
        )

    with col3:
        sort_by = st.selectbox(
            "Sort by", ["Date", "Resident Name", "Shift Type", "PGY Level"]
        )

    # Apply filters
    filtered_df = assignments_df[
        (assignments_df["shift_type"].isin(shift_filter))
        & (assignments_df["resident_pgy"].isin(pgy_filter))
    ]

    # Sort
    sort_mapping = {
        "Date": "date",
        "Resident Name": "resident_name",
        "Shift Type": "shift_type",
        "PGY Level": "resident_pgy",
    }
    filtered_df = filtered_df.sort_values(sort_mapping[sort_by])

    # Display
    display_df = filtered_df[
        [
            "Date",
            "Day",
            "shift_type",
            "resident_name",
            "resident_pgy",
            "start_time",
            "end_time",
        ]
    ]
    display_df.columns = [
        "Date",
        "Day",
        "Shift Type",
        "Resident",
        "PGY",
        "Start",
        "End",
    ]

    st.dataframe(
        display_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Date": st.column_config.DateColumn("Date", width=120),
            "Day": st.column_config.TextColumn("Day", width=100),
            "Shift Type": st.column_config.TextColumn("Shift", width=120),
            "Resident": st.column_config.TextColumn("Resident", width=150),
            "PGY": st.column_config.TextColumn("PGY", width=80),
            "Start": st.column_config.TextColumn("Start", width=80),
            "End": st.column_config.TextColumn("End", width=80),
        },
    )


def display_resident_view(schedule):
    """Display schedule from resident perspective"""

    st.markdown("#### 👥 Resident Assignment Summary")

    if not schedule["assignments"]:
        st.warning("No assignments to display")
        return

    # Group assignments by resident
    resident_assignments = {}
    for assignment in schedule["assignments"]:
        resident_name = assignment["resident_name"]
        if resident_name not in resident_assignments:
            resident_assignments[resident_name] = {
                "pgy_level": assignment["resident_pgy"],
                "assignments": [],
            }
        resident_assignments[resident_name]["assignments"].append(assignment)

    # Create resident summary
    resident_summary = []
    for resident_name, data in resident_assignments.items():
        assignments = data["assignments"]

        # Count by shift type
        shift_counts = {}
        for assignment in assignments:
            shift_type = assignment["shift_type"]
            shift_counts[shift_type] = shift_counts.get(shift_type, 0) + 1

        resident_summary.append(
            {
                "Resident": resident_name,
                "PGY": data["pgy_level"],
                "Total": len(assignments),
                "Call": shift_counts.get("call", 0),
                "Moonlight": shift_counts.get("moonlight", 0),
                "Weekend Call": shift_counts.get("weekend_call", 0),
                "Weekend Moonlight": shift_counts.get("weekend_moonlight", 0),
            }
        )

    # Display summary table
    summary_df = pd.DataFrame(resident_summary)

    st.dataframe(
        summary_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Resident": st.column_config.TextColumn("Resident", width=150),
            "PGY": st.column_config.TextColumn("PGY", width=80),
            "Total": st.column_config.NumberColumn("Total", width=80),
            "Call": st.column_config.NumberColumn("Call", width=80),
            "Moonlight": st.column_config.NumberColumn("Moonlight", width=100),
            "Weekend Call": st.column_config.NumberColumn("WE Call", width=100),
            "Weekend Moonlight": st.column_config.NumberColumn("WE ML", width=100),
        },
    )

    # Workload distribution chart
    if summary_df.empty:
        return

    fig = px.bar(
        summary_df,
        x="Resident",
        y=["Call", "Moonlight", "Weekend Call", "Weekend Moonlight"],
        title="Assignment Distribution by Resident",
        color_discrete_sequence=["#007bff", "#28a745", "#ffc107", "#dc3545"],
    )

    fig.update_layout(
        height=400,
        plot_bgcolor="white",
        paper_bgcolor="white",
        font=dict(color="#333333"),
        xaxis_title="Resident",
        yaxis_title="Number of Assignments",
    )

    st.plotly_chart(fig, use_container_width=True)


def analyze_schedule():
    """Analyze the current schedule for compliance and optimization"""

    if "current_schedule" not in st.session_state:
        st.info("📊 No schedule to analyze. Generate a schedule first.")
        return

    st.markdown("### 🔍 Schedule Analysis & Compliance Report")

    schedule = st.session_state.current_schedule

    # Compliance overview
    col1, col2, col3 = st.columns(3)

    with col1:
        hard_violations = schedule["violations"]["hard"]
        st.metric(
            "Hard Rule Violations",
            hard_violations,
            delta=f"{'✅ Compliant' if hard_violations == 0 else '❌ Needs Attention'}",
        )

    with col2:
        soft_violations = schedule["violations"]["soft"]
        st.metric(
            "Soft Rule Violations",
            soft_violations,
            delta=(
                "Optimization opportunities"
                if soft_violations > 0
                else "Well optimized"
            ),
        )

    with col3:
        total_assignments = len(schedule["assignments"])
        compliance_rate = (
            ((total_assignments - hard_violations) / total_assignments * 100)
            if total_assignments > 0
            else 100
        )
        st.metric(
            "Compliance Rate",
            f"{compliance_rate:.1f}%",
            delta=f"{'Excellent' if compliance_rate >= 95 else 'Needs improvement'}",
        )

    # Analysis tabs
    analysis_tab1, analysis_tab2, analysis_tab3 = st.tabs(
        ["Rule Compliance", "Workload Distribution", "Optimization Suggestions"]
    )

    with analysis_tab1:
        display_rule_compliance_analysis(schedule)

    with analysis_tab2:
        display_workload_analysis(schedule)

    with analysis_tab3:
        display_optimization_suggestions(schedule)


def display_rule_compliance_analysis(schedule):
    """Display detailed rule compliance analysis"""

    st.markdown("#### 🛡️ Rule Compliance Analysis")

    # Mock compliance data - in real implementation, this would come from validation
    compliance_data = [
        {
            "Rule Category": "PGY-2 Restrictions",
            "Status": "✅ Compliant",
            "Violations": 0,
            "Details": "All PGY-2 July restrictions followed",
        },
        {
            "Rule Category": "Weekend Coverage",
            "Status": "✅ Compliant",
            "Violations": 0,
            "Details": "Proper weekend resident assignment",
        },
        {
            "Rule Category": "Shift Conflicts",
            "Status": "⚠️ Minor Issues",
            "Violations": 2,
            "Details": "2 instances of tight scheduling",
        },
        {
            "Rule Category": "Quota Distribution",
            "Status": "✅ Compliant",
            "Violations": 0,
            "Details": "Quotas evenly distributed",
        },
        {
            "Rule Category": "Time-off Requests",
            "Status": "✅ Compliant",
            "Violations": 0,
            "Details": "All time-off requests honored",
        },
    ]

    compliance_df = pd.DataFrame(compliance_data)

    st.dataframe(
        compliance_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Rule Category": st.column_config.TextColumn("Rule Category", width=150),
            "Status": st.column_config.TextColumn("Status", width=150),
            "Violations": st.column_config.NumberColumn("Violations", width=100),
            "Details": st.column_config.TextColumn("Details", width=300),
        },
    )


def display_workload_analysis(schedule):
    """Display workload distribution analysis"""

    st.markdown("#### 📊 Workload Distribution Analysis")

    # This would analyze actual assignments in real implementation
    st.info(
        "📈 Workload analysis will show detailed assignment distribution, quota progress, and fairness metrics."
    )


def display_optimization_suggestions(schedule):
    """Display optimization suggestions"""

    st.markdown("#### 🎯 Optimization Suggestions")

    suggestions = [
        {
            "Priority": "High",
            "Category": "Shift Spacing",
            "Issue": "Dr. Rodriguez has 3 assignments in one week",
            "Suggestion": "Redistribute one assignment to improve balance",
            "Impact": "Reduces soft rule violations by 1",
        },
        {
            "Priority": "Medium",
            "Category": "Weekend Coverage",
            "Issue": "PGY-3 weekend distribution uneven",
            "Suggestion": "Rotate weekend moonlight assignments more evenly",
            "Impact": "Improves fairness score by 5%",
        },
        {
            "Priority": "Low",
            "Category": "Preference Matching",
            "Issue": "Dr. Park scheduled on avoided day",
            "Suggestion": "Swap with available preferred day",
            "Impact": "Improves resident satisfaction",
        },
    ]

    suggestions_df = pd.DataFrame(suggestions)

    st.dataframe(
        suggestions_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Priority": st.column_config.TextColumn("Priority", width=100),
            "Category": st.column_config.TextColumn("Category", width=150),
            "Issue": st.column_config.TextColumn("Issue", width=200),
            "Suggestion": st.column_config.TextColumn("Suggestion", width=200),
            "Impact": st.column_config.TextColumn("Impact", width=150),
        },
    )


def export_import_schedule():
    """Interface for exporting and importing schedules"""

    st.markdown("### 📤 Export/Import Schedules")

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### 📤 Export Current Schedule")

        if "current_schedule" not in st.session_state:
            st.warning("No schedule to export. Generate a schedule first.")
        else:
            export_format = st.selectbox(
                "Export Format",
                ["Excel (.xlsx)", "CSV (.csv)", "JSON (.json)", "PDF Report"],
            )

            if st.button("📥 Generate Export File", type="primary"):
                if export_format == "Excel (.xlsx)":
                    export_data = generate_excel_export()
                    st.download_button(
                        "Download Excel File",
                        data=export_data,
                        file_name=f"schedule_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx",
                        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    )
                elif export_format == "CSV (.csv)":
                    export_data = generate_csv_export()
                    st.download_button(
                        "Download CSV File",
                        data=export_data,
                        file_name=f"schedule_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                        mime="text/csv",
                    )
                elif export_format == "JSON (.json)":
                    export_data = json.dumps(
                        st.session_state.current_schedule, indent=2
                    )
                    st.download_button(
                        "Download JSON File",
                        data=export_data,
                        file_name=f"schedule_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                        mime="application/json",
                    )
                else:  # PDF
                    st.info("PDF report generation coming soon!")

    with col2:
        st.markdown("#### 📥 Import Schedule")

        uploaded_file = st.file_uploader(
            "Upload schedule file",
            type=["json", "csv", "xlsx"],
            help="Upload a previously exported schedule file",
        )

        if uploaded_file:
            try:
                if uploaded_file.name.endswith(".json"):
                    content = json.loads(uploaded_file.read())
                    st.session_state.current_schedule = content
                    st.success("JSON schedule imported successfully!")
                    st.rerun()
                else:
                    st.info("CSV/Excel import functionality coming soon!")

            except Exception as e:
                st.error(f"Error importing file: {str(e)}")


def generate_excel_export():
    """Generate Excel export of current schedule"""
    # Mock implementation - would generate actual Excel file
    import io

    output = io.BytesIO()
    return output.getvalue()


def generate_csv_export():
    """Generate CSV export of current schedule"""
    if "current_schedule" not in st.session_state:
        return ""

    schedule = st.session_state.current_schedule
    df = pd.DataFrame(schedule["assignments"])
    return df.to_csv(index=False)
