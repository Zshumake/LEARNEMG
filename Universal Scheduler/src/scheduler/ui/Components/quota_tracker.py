import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, date
import json
import calendar


def render():
    """Render the simplified Quota Tracker component"""

    st.markdown("## 📊 Quota Tracker - Mid-Year Setup")
    st.markdown(
        "Set up residents, quotas, and track completed shifts when starting mid-academic year"
    )

    # Initialize session state
    if "residents" not in st.session_state:
        st.session_state.residents = []
    if "shift_types" not in st.session_state:
        st.session_state.shift_types = []
    if "start_month" not in st.session_state:
        st.session_state.start_month = "July"
    if "previous_shifts" not in st.session_state:
        st.session_state.previous_shifts = []

    # Main tabs
    tab1, tab2, tab3, tab4 = st.tabs(
        [
            "👥 Residents",
            "📅 Start Month & Shift Types",
            "📊 Completed Quotas",
            "📈 Summary",
        ]
    )

    with tab1:
        show_residents_setup()

    with tab2:
        show_month_and_shifts()

    with tab3:
        show_completed_quotas()

    with tab4:
        show_summary()


def show_residents_setup():
    """Simple resident setup"""
    st.markdown("### 👥 Add Residents")

    # Add new resident
    with st.form("add_resident"):
        col1, col2 = st.columns(2)

        with col1:
            resident_name = st.text_input("Resident Name", placeholder="e.g., John Doe")

        with col2:
            category = st.selectbox(
                "Year/Category",
                [
                    "PGY-1",
                    "PGY-2",
                    "PGY-3",
                    "PGY-4",
                    "PGY-5",
                    "Chief Resident",
                    "Senior Resident",
                    "Fellow",
                    "Other",
                ],
                help="Select the resident's year or special category (chiefs may have different requirements)",
            )

        notes = st.text_input(
            "Notes (optional)",
            placeholder="e.g., Part-time, Research track, Special requirements",
        )

        if st.form_submit_button("Add Resident", type="primary"):
            if resident_name and resident_name not in [
                r["name"] for r in st.session_state.residents
            ]:
                new_resident = {
                    "name": resident_name,
                    "category": category,
                    "notes": notes,
                    "completed_shifts": {},  # Will be populated based on shift types
                }
                st.session_state.residents.append(new_resident)
                st.success(f"Added {resident_name} ({category})")
                st.rerun()
            elif resident_name in [r["name"] for r in st.session_state.residents]:
                st.error("Resident with this name already exists!")

    # Show current residents
    if st.session_state.residents:
        st.markdown("### Current Residents")

        for i, resident in enumerate(st.session_state.residents):
            col1, col2, col3 = st.columns([3, 2, 1])

            with col1:
                st.write(f"**{resident['name']}**")
                st.write(f"Category: {resident['category']}")
                if resident["notes"]:
                    st.write(f"Notes: {resident['notes']}")

            with col2:
                # Show completed shifts count
                total_shifts = (
                    sum(resident["completed_shifts"].values())
                    if resident["completed_shifts"]
                    else 0
                )
                st.metric("Total Completed Shifts", total_shifts)

            with col3:
                if st.button("🗑️ Remove", key=f"remove_{i}"):
                    st.session_state.residents.pop(i)
                    st.rerun()

        st.markdown("---")
    else:
        st.info("No residents added yet. Add residents using the form above.")


def show_month_and_shifts():
    """Set start month and define shift types"""
    st.markdown("### 📅 Schedule Start Month")

    # Start month selection
    months = [
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
    ]

    col1, col2 = st.columns(2)

    with col1:
        start_month = st.selectbox(
            "When will the new schedule start?",
            months,
            index=months.index(st.session_state.start_month),
            help="If starting in July, no previous data needed. If later, we'll track completed shifts.",
        )
        st.session_state.start_month = start_month

    with col2:
        if start_month != "July":
            months_into_year = months.index(start_month)
            st.metric("Months into Academic Year", f"{months_into_year}/12")
        else:
            st.info("Starting fresh academic year - no previous data needed!")

    # Shift types definition (only if not starting in July)
    if start_month != "July":
        st.markdown("### 🕐 Define Shift Types")
        st.markdown("Define all the different types of shifts in your program")

        # Add new shift type
        with st.form("add_shift_type"):
            col1, col2 = st.columns(2)

            with col1:
                shift_name = st.text_input(
                    "Shift Name", placeholder="e.g., Primary Call, Weekend Call, Backup"
                )

            with col2:
                shift_description = st.text_input(
                    "Description (optional)", placeholder="e.g., 24-hour in-house call"
                )

            if st.form_submit_button("Add Shift Type", type="primary"):
                if shift_name and shift_name not in [
                    s["name"] for s in st.session_state.shift_types
                ]:
                    new_shift_type = {
                        "name": shift_name,
                        "description": shift_description,
                    }
                    st.session_state.shift_types.append(new_shift_type)

                    # Add this shift type to all existing residents
                    for resident in st.session_state.residents:
                        resident["completed_shifts"][shift_name] = 0

                    st.success(f"Added shift type: {shift_name}")
                    st.rerun()
                elif shift_name in [s["name"] for s in st.session_state.shift_types]:
                    st.error("Shift type already exists!")

        # Show current shift types
        if st.session_state.shift_types:
            st.markdown("#### Current Shift Types")

            for i, shift_type in enumerate(st.session_state.shift_types):
                col1, col2 = st.columns([4, 1])

                with col1:
                    st.write(f"**{shift_type['name']}**")
                    if shift_type["description"]:
                        st.write(f"Description: {shift_type['description']}")

                with col2:
                    if st.button("🗑️", key=f"remove_shift_{i}"):
                        shift_name = shift_type["name"]
                        st.session_state.shift_types.pop(i)

                        # Remove this shift type from all residents
                        for resident in st.session_state.residents:
                            if shift_name in resident["completed_shifts"]:
                                del resident["completed_shifts"][shift_name]

                        st.rerun()
        else:
            st.info("No shift types defined yet. Add shift types using the form above.")

        # Quick setup templates
        if not st.session_state.shift_types:
            st.markdown("#### 🚀 Quick Setup Templates")
            col1, col2, col3 = st.columns(3)

            with col1:
                if st.button("PM&R Shifts", use_container_width=True):
                    load_pmr_shifts()

            with col2:
                if st.button("Surgery Shifts", use_container_width=True):
                    load_surgery_shifts()

            with col3:
                if st.button("Medicine Shifts", use_container_width=True):
                    load_medicine_shifts()


def show_completed_quotas():
    """Track completed shifts for each resident"""
    if st.session_state.start_month == "July":
        st.info("Starting in July - no previous shifts to track!")
        return

    if not st.session_state.residents:
        st.warning("Please add residents first in the 'Residents' tab.")
        return

    if not st.session_state.shift_types:
        st.warning(
            "Please define shift types first in the 'Start Month & Shift Types' tab."
        )
        return

    st.markdown("### 📊 Completed Shifts (So Far This Academic Year)")
    st.markdown(
        f"Enter how many of each shift type each resident has completed from July through {st.session_state.start_month}"
    )

    # Create input grid
    for resident in st.session_state.residents:
        st.markdown(f"#### {resident['name']} ({resident['category']})")

        cols = st.columns(min(len(st.session_state.shift_types), 4))  # Max 4 columns

        for i, shift_type in enumerate(st.session_state.shift_types):
            col_index = i % 4
            with cols[col_index]:
                current_value = resident["completed_shifts"].get(shift_type["name"], 0)
                new_value = st.number_input(
                    f"{shift_type['name']}",
                    min_value=0,
                    max_value=100,
                    value=current_value,
                    key=f"{resident['name']}_{shift_type['name']}",
                    help=f"How many {shift_type['name']} shifts has {resident['name']} completed?",
                )
                resident["completed_shifts"][shift_type["name"]] = new_value

        st.markdown("---")

    # Save changes button
    if st.button("💾 Save All Changes", type="primary"):
        st.success("All shift counts saved!")


def show_summary():
    """Show summary of all data"""
    st.markdown("### 📈 Setup Summary")

    # Basic stats
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Residents", len(st.session_state.residents))

    with col2:
        st.metric("Shift Types", len(st.session_state.shift_types))

    with col3:
        st.metric("Start Month", st.session_state.start_month)

    with col4:
        if st.session_state.start_month != "July":
            total_shifts = sum(
                sum(resident["completed_shifts"].values())
                for resident in st.session_state.residents
            )
            st.metric("Total Shifts Tracked", total_shifts)
        else:
            st.metric("Previous Shifts", "None (July start)")

    # Residents breakdown
    if st.session_state.residents:
        st.markdown("### Residents by Category")

        # Category breakdown
        category_counts = {}
        for resident in st.session_state.residents:
            category = resident["category"]
            category_counts[category] = category_counts.get(category, 0) + 1

        category_df = pd.DataFrame(
            list(category_counts.items()), columns=["Category", "Count"]
        )

        fig = px.bar(
            category_df,
            x="Category",
            y="Count",
            title="Residents by Category",
            color="Count",
            color_continuous_scale="Blues",
        )
        fig.update_layout(height=300, showlegend=False)
        st.plotly_chart(fig, use_container_width=True)

    # Completed shifts visualization (if mid-year start)
    if (
        st.session_state.start_month != "July"
        and st.session_state.residents
        and st.session_state.shift_types
    ):
        st.markdown("### Completed Shifts Summary")

        # Create shifts summary dataframe
        shifts_data = []
        for resident in st.session_state.residents:
            for shift_type, count in resident["completed_shifts"].items():
                shifts_data.append(
                    {
                        "Resident": resident["name"],
                        "Category": resident["category"],
                        "Shift Type": shift_type,
                        "Count": count,
                    }
                )

        if shifts_data:
            shifts_df = pd.DataFrame(shifts_data)

            # Pivot table
            pivot_df = shifts_df.pivot(
                index="Resident", columns="Shift Type", values="Count"
            ).fillna(0)
            st.dataframe(pivot_df, use_container_width=True)

            # Chart by shift type
            total_by_shift = (
                shifts_df.groupby("Shift Type")["Count"].sum().reset_index()
            )

            fig2 = px.bar(
                total_by_shift,
                x="Shift Type",
                y="Count",
                title="Total Completed Shifts by Type",
                color="Count",
                color_continuous_scale="Greens",
            )
            fig2.update_layout(height=300, showlegend=False)
            st.plotly_chart(fig2, use_container_width=True)

    # Export functionality
    st.markdown("### 📥 Export Data")
    col1, col2 = st.columns(2)

    with col1:
        if st.button("📊 Export Setup Data", use_container_width=True):
            export_setup_data()

    with col2:
        if st.button("📋 Export for Rule Parser", use_container_width=True):
            export_for_rule_parser()


# Helper functions
def load_pmr_shifts():
    """Load PM&R shift types"""
    pmr_shifts = [
        {"name": "Primary Call", "description": "Weekday primary call shifts"},
        {
            "name": "Secondary/Moonlight",
            "description": "Secondary call and moonlight shifts",
        },
        {"name": "Weekend Call", "description": "Saturday-Sunday weekend call"},
        {"name": "Backup Call", "description": "Weekend backup coverage"},
        {"name": "Holiday Coverage", "description": "Holiday shifts"},
    ]

    st.session_state.shift_types = pmr_shifts

    # Add to all residents
    for resident in st.session_state.residents:
        for shift in pmr_shifts:
            resident["completed_shifts"][shift["name"]] = 0

    st.success("Loaded PM&R shift types!")
    st.rerun()


def load_surgery_shifts():
    """Load Surgery shift types"""
    surgery_shifts = [
        {"name": "Call", "description": "In-house call shifts"},
        {"name": "Trauma Call", "description": "Trauma surgery call"},
        {"name": "Weekend Coverage", "description": "Weekend duties"},
        {"name": "ICU Coverage", "description": "ICU coverage shifts"},
        {"name": "Consult Service", "description": "Consult service coverage"},
    ]

    st.session_state.shift_types = surgery_shifts

    for resident in st.session_state.residents:
        for shift in surgery_shifts:
            resident["completed_shifts"][shift["name"]] = 0

    st.success("Loaded Surgery shift types!")
    st.rerun()


def load_medicine_shifts():
    """Load Internal Medicine shift types"""
    medicine_shifts = [
        {"name": "Ward Call", "description": "General ward call"},
        {"name": "ICU Call", "description": "ICU coverage"},
        {"name": "Admissions", "description": "Admissions shifts"},
        {"name": "Weekend Coverage", "description": "Weekend duties"},
        {"name": "Cross Cover", "description": "Cross coverage shifts"},
    ]

    st.session_state.shift_types = medicine_shifts

    for resident in st.session_state.residents:
        for shift in medicine_shifts:
            resident["completed_shifts"][shift["name"]] = 0

    st.success("Loaded Internal Medicine shift types!")
    st.rerun()


def export_setup_data():
    """Export all setup data"""
    export_data = {
        "metadata": {
            "exported_on": datetime.now().isoformat(),
            "start_month": st.session_state.start_month,
            "residents_count": len(st.session_state.residents),
            "shift_types_count": len(st.session_state.shift_types),
        },
        "residents": st.session_state.residents,
        "shift_types": st.session_state.shift_types,
        "start_month": st.session_state.start_month,
    }

    json_string = json.dumps(export_data, indent=2)

    st.download_button(
        label="📥 Download Setup Data",
        data=json_string,
        file_name=f"quota_setup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
        mime="application/json",
    )

    st.success("Setup data exported successfully!")


def export_for_rule_parser():
    """Export data in format for Rule Parser"""
    # This will be the format the Rule Parser expects
    rule_parser_data = {
        "program_info": {
            "start_month": st.session_state.start_month,
            "mid_year_start": st.session_state.start_month != "July",
        },
        "residents": [
            {"name": r["name"], "category": r["category"], "notes": r["notes"]}
            for r in st.session_state.residents
        ],
        "shift_types": [s["name"] for s in st.session_state.shift_types],
        "completed_shifts": {
            r["name"]: r["completed_shifts"] for r in st.session_state.residents
        },
        "ready_for_rules": True,
        "next_step": "Define scheduling rules in Rule Parser",
    }

    json_string = json.dumps(rule_parser_data, indent=2)

    st.download_button(
        label="📥 Download for Rule Parser",
        data=json_string,
        file_name=f"rule_parser_input_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
        mime="application/json",
    )

    st.success("Data exported for Rule Parser! Use this file when setting up rules.")
