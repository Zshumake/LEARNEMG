import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, date, timedelta
import json
import io


def render():
    """Render the Resident Management component"""

    st.markdown("## 👥 Resident Management System")

    # Initialize session state for residents if not exists
    if "residents" not in st.session_state:
        st.session_state.residents = initialize_default_residents()

    # Main navigation tabs
    tab1, tab2, tab3, tab4, tab5 = st.tabs(
        [
            "📋 Current Residents",
            "➕ Add/Edit Resident",
            "📅 Time-Off Management",
            "📊 Quota Overview",
            "💾 Import/Export",
        ]
    )

    with tab1:
        display_current_residents()

    with tab2:
        add_edit_resident()

    with tab3:
        manage_time_off()

    with tab4:
        display_quota_overview()

    with tab5:
        import_export_data()


def initialize_default_residents():
    """Initialize with default PM&R residents for demonstration"""
    return {
        "residents": [
            {
                "id": 1,
                "name": "Dr. Sarah Chen",
                "pgy_level": "PGY-2",
                "email": "sarah.chen@hospital.edu",
                "phone": "555-0101",
                "start_date": "2024-07-01",
                "specializations": ["EMG", "Pain Management"],
                "preferences": {
                    "preferred_call_days": ["Tuesday", "Thursday"],
                    "avoid_weekends": False,
                },
                "time_off": [],
                "quota_targets": {"call": 38, "moonlight": 21, "weekend_call": 7.5},
            },
            {
                "id": 2,
                "name": "Dr. Michael Rodriguez",
                "pgy_level": "PGY-3",
                "email": "michael.rodriguez@hospital.edu",
                "phone": "555-0102",
                "start_date": "2023-07-01",
                "specializations": ["Sports Medicine", "MSK Ultrasound"],
                "preferences": {
                    "preferred_call_days": ["Friday"],
                    "avoid_weekends": False,
                },
                "time_off": [],
                "quota_targets": {"call": 30, "moonlight": 27, "weekend_call": 2.5},
            },
            {
                "id": 3,
                "name": "Dr. Jennifer Park",
                "pgy_level": "PGY-4",
                "email": "jennifer.park@hospital.edu",
                "phone": "555-0103",
                "start_date": "2022-07-01",
                "specializations": ["Pediatric Rehab", "Brain Injury"],
                "preferences": {
                    "preferred_call_days": ["Monday", "Wednesday"],
                    "avoid_weekends": True,
                },
                "time_off": [],
                "quota_targets": {"call": 5, "moonlight": 27, "weekend_call": 0.5},
            },
        ],
        "next_id": 4,
    }


def display_current_residents():
    """Display current residents in an organized table"""

    st.markdown("### Current Residents Overview")

    if not st.session_state.residents["residents"]:
        st.warning(
            "No residents found. Please add residents using the 'Add/Edit Resident' tab."
        )
        return

    # Create dataframe for display
    residents_data = []
    for resident in st.session_state.residents["residents"]:
        residents_data.append(
            {
                "Name": resident["name"],
                "PGY Level": resident["pgy_level"],
                "Email": resident["email"],
                "Start Date": resident["start_date"],
                "Specializations": ", ".join(resident["specializations"]),
                "Time Off Requests": len(resident["time_off"]),
                "Call Target": resident["quota_targets"]["call"],
                "Moonlight Target": resident["quota_targets"]["moonlight"],
            }
        )

    df = pd.DataFrame(residents_data)

    # Display with custom styling
    st.dataframe(
        df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Name": st.column_config.TextColumn("Name", width=150),
            "PGY Level": st.column_config.TextColumn("PGY Level", width=100),
            "Email": st.column_config.TextColumn("Email", width=200),
            "Start Date": st.column_config.DateColumn("Start Date", width=120),
            "Specializations": st.column_config.TextColumn(
                "Specializations", width=200
            ),
            "Time Off Requests": st.column_config.NumberColumn("Time Off", width=100),
            "Call Target": st.column_config.NumberColumn("Call Target", width=100),
            "Moonlight Target": st.column_config.NumberColumn(
                "Moonlight Target", width=120
            ),
        },
    )

    # PGY Level Distribution Chart
    st.markdown("### PGY Level Distribution")

    pgy_counts = {}
    for resident in st.session_state.residents["residents"]:
        pgy = resident["pgy_level"]
        pgy_counts[pgy] = pgy_counts.get(pgy, 0) + 1

    if pgy_counts:
        fig = px.pie(
            values=list(pgy_counts.values()),
            names=list(pgy_counts.keys()),
            title="Current Residents by PGY Level",
            color_discrete_sequence=["#007bff", "#28a745", "#ffc107", "#dc3545"],
        )
        fig.update_layout(
            height=300,
            plot_bgcolor="white",
            paper_bgcolor="white",
            font=dict(color="#333333"),
        )
        st.plotly_chart(fig, use_container_width=True)

    # Quick Actions
    st.markdown("### Quick Actions")

    col1, col2, col3 = st.columns(3)

    with col1:
        if st.button("📋 View Detailed Profiles", use_container_width=True):
            show_detailed_profiles()

    with col2:
        if st.button("📊 Generate Quota Report", use_container_width=True):
            generate_quota_report()

    with col3:
        if st.button("🔄 Sync with External System", use_container_width=True):
            st.info("External sync functionality coming soon!")


def add_edit_resident():
    """Interface for adding or editing residents"""

    st.markdown("### Add or Edit Resident")

    # Mode selection
    mode = st.radio(
        "Select Mode", ["Add New Resident", "Edit Existing Resident"], horizontal=True
    )

    selected_resident = None
    if mode == "Edit Existing Resident":
        if st.session_state.residents["residents"]:
            resident_names = [
                r["name"] for r in st.session_state.residents["residents"]
            ]
            selected_name = st.selectbox("Select Resident to Edit", resident_names)
            selected_resident = next(
                r
                for r in st.session_state.residents["residents"]
                if r["name"] == selected_name
            )
        else:
            st.warning("No residents available to edit. Please add residents first.")
            return

    # Form for resident data
    with st.form("resident_form"):
        st.markdown("#### Basic Information")

        col1, col2 = st.columns(2)

        with col1:
            name = st.text_input(
                "Full Name",
                value=selected_resident["name"] if selected_resident else "",
            )
            email = st.text_input(
                "Email", value=selected_resident["email"] if selected_resident else ""
            )
            pgy_level = st.selectbox(
                "PGY Level",
                ["PGY-1", "PGY-2", "PGY-3", "PGY-4", "PGY-5"],
                index=(
                    ["PGY-1", "PGY-2", "PGY-3", "PGY-4", "PGY-5"].index(
                        selected_resident["pgy_level"]
                    )
                    if selected_resident
                    else 1
                ),
            )

        with col2:
            phone = st.text_input(
                "Phone", value=selected_resident["phone"] if selected_resident else ""
            )
            start_date = st.date_input(
                "Residency Start Date",
                value=(
                    datetime.strptime(
                        selected_resident["start_date"], "%Y-%m-%d"
                    ).date()
                    if selected_resident
                    else date.today()
                ),
            )

        st.markdown("#### Specializations & Preferences")

        specializations = st.multiselect(
            "Specializations",
            [
                "EMG",
                "Pain Management",
                "Sports Medicine",
                "MSK Ultrasound",
                "Pediatric Rehab",
                "Brain Injury",
                "Spinal Cord Injury",
                "Prosthetics",
                "Orthotics",
                "Cardiac Rehab",
            ],
            default=selected_resident["specializations"] if selected_resident else [],
        )

        col3, col4 = st.columns(2)

        with col3:
            preferred_days = st.multiselect(
                "Preferred Call Days",
                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                default=(
                    selected_resident["preferences"]["preferred_call_days"]
                    if selected_resident
                    else []
                ),
            )

        with col4:
            avoid_weekends = st.checkbox(
                "Prefer to avoid weekend assignments",
                value=(
                    selected_resident["preferences"]["avoid_weekends"]
                    if selected_resident
                    else False
                ),
            )

        st.markdown("#### Annual Quota Targets")

        quota_col1, quota_col2, quota_col3 = st.columns(3)

        # Set default quota based on PGY level
        default_quotas = {
            "PGY-1": {"call": 20, "moonlight": 10, "weekend_call": 4},
            "PGY-2": {"call": 38, "moonlight": 21, "weekend_call": 7.5},
            "PGY-3": {"call": 30, "moonlight": 27, "weekend_call": 2.5},
            "PGY-4": {"call": 5, "moonlight": 27, "weekend_call": 0.5},
            "PGY-5": {"call": 3, "moonlight": 30, "weekend_call": 0},
        }

        current_quotas = (
            selected_resident["quota_targets"]
            if selected_resident
            else default_quotas[pgy_level]
        )

        with quota_col1:
            call_quota = st.number_input(
                "Call Shifts Target",
                value=int(current_quotas["call"]),
                min_value=0,
                max_value=100,
            )

        with quota_col2:
            moonlight_quota = st.number_input(
                "Moonlight Shifts Target",
                value=int(current_quotas["moonlight"]),
                min_value=0,
                max_value=100,
            )

        with quota_col3:
            weekend_quota = st.number_input(
                "Weekend Call Target",
                value=float(current_quotas["weekend_call"]),
                min_value=0.0,
                max_value=20.0,
                step=0.5,
            )

        # Submit form
        submit_button = st.form_submit_button(
            f"{'Update' if mode == 'Edit Existing Resident' else 'Add'} Resident",
            type="primary",
        )

        if submit_button:
            # Validation
            if not name or not email:
                st.error("Name and email are required fields.")
                return

            # Check for duplicate names (if adding new)
            if mode == "Add New Resident":
                existing_names = [
                    r["name"] for r in st.session_state.residents["residents"]
                ]
                if name in existing_names:
                    st.error("A resident with this name already exists.")
                    return

            # Create resident data
            resident_data = {
                "id": (
                    selected_resident["id"]
                    if selected_resident
                    else st.session_state.residents["next_id"]
                ),
                "name": name,
                "pgy_level": pgy_level,
                "email": email,
                "phone": phone,
                "start_date": start_date.strftime("%Y-%m-%d"),
                "specializations": specializations,
                "preferences": {
                    "preferred_call_days": preferred_days,
                    "avoid_weekends": avoid_weekends,
                },
                "time_off": selected_resident["time_off"] if selected_resident else [],
                "quota_targets": {
                    "call": call_quota,
                    "moonlight": moonlight_quota,
                    "weekend_call": weekend_quota,
                },
            }

            if mode == "Add New Resident":
                st.session_state.residents["residents"].append(resident_data)
                st.session_state.residents["next_id"] += 1
                st.success(f"✅ Added new resident: {name}")
            else:
                # Update existing resident
                for i, r in enumerate(st.session_state.residents["residents"]):
                    if r["id"] == selected_resident["id"]:
                        st.session_state.residents["residents"][i] = resident_data
                        break
                st.success(f"✅ Updated resident: {name}")

            st.rerun()


def manage_time_off():
    """Interface for managing time-off requests"""

    st.markdown("### Time-Off Request Management")

    if not st.session_state.residents["residents"]:
        st.warning("No residents found. Please add residents first.")
        return

    # Select resident
    resident_names = [r["name"] for r in st.session_state.residents["residents"]]
    selected_name = st.selectbox("Select Resident", resident_names)
    selected_resident = next(
        r for r in st.session_state.residents["residents"] if r["name"] == selected_name
    )

    col1, col2 = st.columns([2, 1])

    with col1:
        st.markdown(f"#### Current Time-Off Requests for {selected_name}")

        if selected_resident["time_off"]:
            time_off_df = pd.DataFrame(selected_resident["time_off"])
            time_off_df["start_date"] = pd.to_datetime(
                time_off_df["start_date"]
            ).dt.strftime("%Y-%m-%d")
            time_off_df["end_date"] = pd.to_datetime(
                time_off_df["end_date"]
            ).dt.strftime("%Y-%m-%d")

            st.dataframe(
                time_off_df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "start_date": "Start Date",
                    "end_date": "End Date",
                    "reason": "Reason",
                    "type": "Type",
                },
            )

            # Option to remove time-off requests
            if st.button("🗑️ Remove Selected Time-Off Request"):
                st.info("Time-off removal functionality to be implemented.")
        else:
            st.info("No time-off requests found for this resident.")

    with col2:
        st.markdown("#### Add New Time-Off Request")

        with st.form("time_off_form"):
            start_date = st.date_input("Start Date", value=date.today())
            end_date = st.date_input("End Date", value=date.today() + timedelta(days=1))

            reason = st.text_area(
                "Reason", placeholder="e.g., Conference, Vacation, Personal"
            )

            time_off_type = st.selectbox(
                "Type", ["Vacation", "Conference", "Personal", "Medical", "Family"]
            )

            submit_time_off = st.form_submit_button(
                "Add Time-Off Request", type="primary"
            )

            if submit_time_off:
                if start_date > end_date:
                    st.error("Start date must be before end date.")
                else:
                    new_time_off = {
                        "start_date": start_date.strftime("%Y-%m-%d"),
                        "end_date": end_date.strftime("%Y-%m-%d"),
                        "reason": reason,
                        "type": time_off_type,
                    }

                    # Find and update the resident
                    for i, r in enumerate(st.session_state.residents["residents"]):
                        if r["name"] == selected_name:
                            st.session_state.residents["residents"][i][
                                "time_off"
                            ].append(new_time_off)
                            break

                    st.success(f"✅ Added time-off request for {selected_name}")
                    st.rerun()


def display_quota_overview():
    """Display quota overview and tracking for all residents"""

    st.markdown("### Quota Overview & Progress Tracking")

    if not st.session_state.residents["residents"]:
        st.warning("No residents found. Please add residents first.")
        return

    # Create quota tracking dataframe
    quota_data = []
    for resident in st.session_state.residents["residents"]:
        quota_data.append(
            {
                "Resident": resident["name"],
                "PGY": resident["pgy_level"],
                "Call Target": resident["quota_targets"]["call"],
                "Call Progress": 0,  # Would be filled from actual assignments
                "Call %": 0,
                "Moonlight Target": resident["quota_targets"]["moonlight"],
                "Moonlight Progress": 0,
                "Moonlight %": 0,
                "Weekend Target": resident["quota_targets"]["weekend_call"],
                "Weekend Progress": 0,
                "Weekend %": 0,
            }
        )

    df = pd.DataFrame(quota_data)

    # Display quota table
    st.dataframe(
        df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Resident": st.column_config.TextColumn("Resident", width=150),
            "PGY": st.column_config.TextColumn("PGY", width=80),
            "Call Target": st.column_config.NumberColumn("Call Target", width=100),
            "Call Progress": st.column_config.NumberColumn("Call Done", width=100),
            "Call %": st.column_config.ProgressColumn(
                "Call %", width=100, min_value=0, max_value=100
            ),
            "Moonlight Target": st.column_config.NumberColumn("ML Target", width=100),
            "Moonlight Progress": st.column_config.NumberColumn("ML Done", width=100),
            "Moonlight %": st.column_config.ProgressColumn(
                "ML %", width=100, min_value=0, max_value=100
            ),
            "Weekend Target": st.column_config.NumberColumn("WE Target", width=100),
            "Weekend Progress": st.column_config.NumberColumn("WE Done", width=100),
            "Weekend %": st.column_config.ProgressColumn(
                "WE %", width=100, min_value=0, max_value=100
            ),
        },
    )

    # Quota visualization by PGY level
    st.markdown("### Quota Targets by PGY Level")

    pgy_quotas = {}
    for resident in st.session_state.residents["residents"]:
        pgy = resident["pgy_level"]
        if pgy not in pgy_quotas:
            pgy_quotas[pgy] = {"Call": 0, "Moonlight": 0, "Weekend": 0, "Count": 0}

        pgy_quotas[pgy]["Call"] += resident["quota_targets"]["call"]
        pgy_quotas[pgy]["Moonlight"] += resident["quota_targets"]["moonlight"]
        pgy_quotas[pgy]["Weekend"] += resident["quota_targets"]["weekend_call"]
        pgy_quotas[pgy]["Count"] += 1

    # Calculate averages
    for pgy in pgy_quotas:
        if pgy_quotas[pgy]["Count"] > 0:
            pgy_quotas[pgy]["Call"] = pgy_quotas[pgy]["Call"] / pgy_quotas[pgy]["Count"]
            pgy_quotas[pgy]["Moonlight"] = (
                pgy_quotas[pgy]["Moonlight"] / pgy_quotas[pgy]["Count"]
            )
            pgy_quotas[pgy]["Weekend"] = (
                pgy_quotas[pgy]["Weekend"] / pgy_quotas[pgy]["Count"]
            )

    # Create visualization
    if pgy_quotas:
        pgy_levels = list(pgy_quotas.keys())
        call_values = [pgy_quotas[pgy]["Call"] for pgy in pgy_levels]
        moonlight_values = [pgy_quotas[pgy]["Moonlight"] for pgy in pgy_levels]
        weekend_values = [pgy_quotas[pgy]["Weekend"] for pgy in pgy_levels]

        fig = go.Figure()
        fig.add_trace(
            go.Bar(
                name="Call Shifts", x=pgy_levels, y=call_values, marker_color="#007bff"
            )
        )
        fig.add_trace(
            go.Bar(
                name="Moonlight Shifts",
                x=pgy_levels,
                y=moonlight_values,
                marker_color="#28a745",
            )
        )
        fig.add_trace(
            go.Bar(
                name="Weekend Shifts",
                x=pgy_levels,
                y=weekend_values,
                marker_color="#ffc107",
            )
        )

        fig.update_layout(
            title="Average Quota Targets by PGY Level",
            xaxis_title="PGY Level",
            yaxis_title="Number of Shifts",
            barmode="group",
            height=400,
            plot_bgcolor="white",
            paper_bgcolor="white",
            font=dict(color="#333333"),
        )

        st.plotly_chart(fig, use_container_width=True)


def import_export_data():
    """Interface for importing and exporting resident data"""

    st.markdown("### Import/Export Resident Data")

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### 📥 Import Data")

        import_method = st.radio(
            "Import Method",
            ["Upload CSV/Excel File", "JSON Import"],
            key="import_method",
        )

        if import_method == "Upload CSV/Excel File":
            uploaded_file = st.file_uploader(
                "Choose a CSV or Excel file",
                type=["csv", "xlsx"],
                help="File should contain columns: name, pgy_level, email, phone, start_date, specializations",
            )

            if uploaded_file:
                try:
                    if uploaded_file.name.endswith(".csv"):
                        df = pd.read_csv(uploaded_file)
                    else:
                        df = pd.read_excel(uploaded_file)

                    st.write("Preview of uploaded data:")
                    st.dataframe(df.head())

                    if st.button("Import Residents", type="primary"):
                        import_from_dataframe(df)
                        st.success("Residents imported successfully!")
                        st.rerun()

                except Exception as e:
                    st.error(f"Error reading file: {str(e)}")

        elif import_method == "JSON Import":
            json_data = st.text_area("Paste JSON data here:", height=200)

            if st.button("Import from JSON", type="primary"):
                try:
                    data = json.loads(json_data)
                    st.session_state.residents = data
                    st.success("Data imported successfully!")
                    st.rerun()
                except json.JSONDecodeError:
                    st.error("Invalid JSON format. Please check your data.")

    with col2:
        st.markdown("#### 📤 Export Data")

        export_format = st.radio(
            "Export Format", ["CSV", "Excel", "JSON"], key="export_format"
        )

        if st.button("Generate Export File", type="primary"):
            if export_format == "CSV":
                csv_data = generate_csv_export()
                st.download_button(
                    label="📥 Download CSV",
                    data=csv_data,
                    file_name=f"residents_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                    mime="text/csv",
                )

            elif export_format == "Excel":
                excel_data = generate_excel_export()
                st.download_button(
                    label="📥 Download Excel",
                    data=excel_data,
                    file_name=f"residents_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx",
                    mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                )

            elif export_format == "JSON":
                json_data = json.dumps(st.session_state.residents, indent=2)
                st.download_button(
                    label="📥 Download JSON",
                    data=json_data,
                    file_name=f"residents_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                    mime="application/json",
                )


def import_from_dataframe(df):
    """Import residents from uploaded dataframe"""

    required_columns = ["name", "pgy_level", "email"]
    missing_columns = [col for col in required_columns if col not in df.columns]

    if missing_columns:
        st.error(f"Missing required columns: {', '.join(missing_columns)}")
        return

    imported_count = 0
    for _, row in df.iterrows():
        try:
            resident_data = {
                "id": st.session_state.residents["next_id"],
                "name": str(row["name"]),
                "pgy_level": str(row["pgy_level"]),
                "email": str(row["email"]),
                "phone": str(row.get("phone", "")),
                "start_date": str(
                    row.get("start_date", date.today().strftime("%Y-%m-%d"))
                ),
                "specializations": (
                    str(row.get("specializations", "")).split(",")
                    if row.get("specializations")
                    else []
                ),
                "preferences": {"preferred_call_days": [], "avoid_weekends": False},
                "time_off": [],
                "quota_targets": {
                    "call": int(row.get("call_target", 30)),
                    "moonlight": int(row.get("moonlight_target", 25)),
                    "weekend_call": float(row.get("weekend_target", 3.0)),
                },
            }

            st.session_state.residents["residents"].append(resident_data)
            st.session_state.residents["next_id"] += 1
            imported_count += 1

        except Exception as e:
            st.warning(f"Skipped row for {row.get('name', 'Unknown')}: {str(e)}")

    st.success(f"Successfully imported {imported_count} residents.")


def generate_csv_export():
    """Generate CSV export data"""

    export_data = []
    for resident in st.session_state.residents["residents"]:
        export_data.append(
            {
                "name": resident["name"],
                "pgy_level": resident["pgy_level"],
                "email": resident["email"],
                "phone": resident["phone"],
                "start_date": resident["start_date"],
                "specializations": ", ".join(resident["specializations"]),
                "call_target": resident["quota_targets"]["call"],
                "moonlight_target": resident["quota_targets"]["moonlight"],
                "weekend_target": resident["quota_targets"]["weekend_call"],
                "time_off_count": len(resident["time_off"]),
            }
        )

    df = pd.DataFrame(export_data)
    return df.to_csv(index=False)


def generate_excel_export():
    """Generate Excel export data"""

    export_data = []
    for resident in st.session_state.residents["residents"]:
        export_data.append(
            {
                "name": resident["name"],
                "pgy_level": resident["pgy_level"],
                "email": resident["email"],
                "phone": resident["phone"],
                "start_date": resident["start_date"],
                "specializations": ", ".join(resident["specializations"]),
                "call_target": resident["quota_targets"]["call"],
                "moonlight_target": resident["quota_targets"]["moonlight"],
                "weekend_target": resident["quota_targets"]["weekend_call"],
                "time_off_count": len(resident["time_off"]),
            }
        )

    df = pd.DataFrame(export_data)

    # Create Excel file in memory
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        df.to_excel(writer, sheet_name="Residents", index=False)

    return output.getvalue()


def show_detailed_profiles():
    """Show detailed resident profiles"""
    st.info("Detailed profiles view will be implemented in the next update.")


def generate_quota_report():
    """Generate comprehensive quota report"""
    st.info("Quota report generation will be implemented in the next update.")
