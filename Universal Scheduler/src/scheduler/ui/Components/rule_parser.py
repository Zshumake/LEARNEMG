import streamlit as st
import pandas as pd
import json
from datetime import datetime, date, timedelta
import re


def render():
    """Render the Natural Language Rule Parser component"""

    st.markdown("## 🧠 Natural Language Rule Parser")
    st.markdown(
        "Input scheduling rules in plain English - the system will convert them to mathematical constraints"
    )

    # Initialize session state
    if "parsed_rules" not in st.session_state:
        st.session_state.parsed_rules = []
    if "quota_data" not in st.session_state:
        st.session_state.quota_data = None
    if "previous_shifts" not in st.session_state:
        st.session_state.previous_shifts = {}

    # Main tabs
    tab1, tab2, tab3, tab4, tab5 = st.tabs(
        [
            "📥 Import Data",
            "📅 Previous 2 Weeks",
            "📝 Add Rules",
            "📋 Rule Library",
            "📤 Export Rules",
        ]
    )

    with tab1:
        show_import_data()

    with tab2:
        show_previous_weeks()

    with tab3:
        show_add_rules()

    with tab4:
        show_rule_library()

    with tab5:
        show_export_rules()


def show_import_data():
    """Import data from Quota Tracker"""
    st.markdown("### 📥 Import Setup Data")
    st.markdown("Import the resident and quota data from the Quota Tracker component")

    # File upload
    uploaded_file = st.file_uploader(
        "Upload Quota Tracker Data",
        type=["json"],
        help="Upload the JSON file exported from the Quota Tracker",
    )

    if uploaded_file:
        try:
            quota_data = json.load(uploaded_file)
            st.session_state.quota_data = quota_data

            # Display imported data summary
            st.success("✅ Data imported successfully!")

            col1, col2, col3 = st.columns(3)

            with col1:
                residents_count = len(quota_data.get("residents", []))
                st.metric("Residents", residents_count)

            with col2:
                shift_types = len(quota_data.get("shift_types", []))
                st.metric("Shift Types", shift_types)

            with col3:
                start_month = quota_data.get("start_month", "Not specified")
                st.metric("Start Month", start_month)

            # Show residents summary
            if quota_data.get("residents"):
                st.markdown("#### Imported Residents")
                residents_df = pd.DataFrame(
                    [
                        {
                            "Name": r["name"],
                            "Category": r["category"],
                            "Notes": r.get("notes", ""),
                        }
                        for r in quota_data["residents"]
                    ]
                )
                st.dataframe(residents_df, use_container_width=True, hide_index=True)

            # Show and manage shift types
            if quota_data.get("shift_types"):
                st.markdown("#### Available Shift Types")
                st.markdown("*These shift types will be available when writing rules*")

                # Display current shift types
                shift_cols = st.columns(min(len(quota_data["shift_types"]), 4))
                for i, shift_type in enumerate(quota_data["shift_types"]):
                    col_index = i % 4
                    with shift_cols[col_index]:
                        if isinstance(shift_type, dict):
                            st.write(f"• **{shift_type['name']}**")
                            if shift_type.get("description"):
                                st.write(f"  _{shift_type['description']}_")
                        else:
                            st.write(f"• **{shift_type}**")

            # Add additional shift types
            st.markdown("#### ➕ Add Additional Shift Types")
            st.markdown(
                "Add any shift types that weren't captured in the Quota Tracker"
            )

            with st.form("add_shift_type_parser"):
                col1, col2 = st.columns(2)

                with col1:
                    new_shift_name = st.text_input(
                        "Shift Type Name",
                        placeholder="e.g., EMG Coverage, Holiday Call, Trauma Call",
                    )

                with col2:
                    new_shift_desc = st.text_input(
                        "Description (optional)",
                        placeholder="e.g., Emergency procedure coverage",
                    )

                if st.form_submit_button("Add Shift Type"):
                    if new_shift_name:
                        # Add to shift types list
                        if "shift_types" not in quota_data:
                            quota_data["shift_types"] = []

                        # Check if it's already there
                        existing_shifts = []
                        for shift in quota_data["shift_types"]:
                            if isinstance(shift, dict):
                                existing_shifts.append(shift["name"])
                            else:
                                existing_shifts.append(shift)

                        if new_shift_name not in existing_shifts:
                            quota_data["shift_types"].append(
                                {"name": new_shift_name, "description": new_shift_desc}
                            )
                            st.session_state.quota_data = quota_data
                            st.success(f"Added shift type: {new_shift_name}")
                            st.rerun()
                        else:
                            st.error("Shift type already exists!")

        except Exception as e:
            st.error(f"Error importing data: {e}")

    # Manual setup option
    st.markdown("---")
    st.markdown("#### 🔧 Or Set Up Manually")

    col1, col2 = st.columns(2)

    with col1:
        if st.button("Start Manual Setup", use_container_width=True):
            # Create basic structure for manual setup
            st.session_state.quota_data = {
                "residents": [],
                "shift_types": [],
                "start_month": "July",
                "completed_shifts": {},
            }
            st.success("Manual setup initialized!")
            st.rerun()

    with col2:
        if st.button("Load Common Shift Types", use_container_width=True):
            # Load common shift types for manual setup
            common_shifts = [
                {"name": "Primary Call", "description": "Main call coverage"},
                {"name": "Secondary Call", "description": "Secondary/backup call"},
                {"name": "Weekend Call", "description": "Weekend coverage"},
                {"name": "Moonlight", "description": "Evening/overnight coverage"},
                {"name": "Holiday Coverage", "description": "Holiday shifts"},
                {"name": "Backup Call", "description": "Backup coverage"},
            ]

            st.session_state.quota_data = {
                "residents": [],
                "shift_types": common_shifts,
                "start_month": "July",
                "completed_shifts": {},
            }
            st.success("Common shift types loaded!")
            st.rerun()


def show_previous_weeks():
    """Input who worked the previous 2 weeks"""
    if not st.session_state.quota_data:
        st.warning(
            "Please import data from Quota Tracker first in the 'Import Data' tab."
        )
        return

    st.markdown("### 📅 Previous 2 Weeks Shifts")
    st.markdown("Enter who worked shifts in the 2 weeks before the new schedule starts")
    st.markdown("*This prevents overworking residents by ensuring proper spacing*")

    quota_data = st.session_state.quota_data
    residents = [r["name"] for r in quota_data.get("residents", [])]
    shift_types = [s for s in quota_data.get("shift_types", [])]

    if not residents:
        st.warning("No residents found in imported data.")
        return

    # Date range for previous 2 weeks
    start_month = quota_data.get("start_month", "July")

    st.markdown(f"#### Shifts in the 2 weeks before {start_month} schedule starts")

    # Create input for each day in previous 2 weeks
    for week in ["Week 2 Before", "Week 1 Before"]:
        with st.expander(f"📅 {week}", expanded=False):
            st.markdown(f"**{week} (7 days)**")

            for day in range(1, 8):
                st.markdown(f"**Day {day}**")

                col1, col2 = st.columns(2)

                with col1:
                    day_key = f"{week}_day_{day}"
                    selected_residents = st.multiselect(
                        f"Who worked shifts on Day {day}?",
                        residents,
                        key=f"residents_{day_key}",
                        help="Select all residents who worked any shift this day",
                    )

                with col2:
                    if selected_residents:
                        shift_details = st.multiselect(
                            f"What shift types?",
                            shift_types,
                            key=f"shifts_{day_key}",
                            help="Select the types of shifts worked",
                        )

                        # Store in session state
                        if selected_residents and shift_details:
                            st.session_state.previous_shifts[day_key] = {
                                "residents": selected_residents,
                                "shifts": shift_details,
                            }

    # Summary of previous shifts
    if st.session_state.previous_shifts:
        st.markdown("#### 📊 Previous Shifts Summary")

        # Create summary
        summary_data = []
        for day_key, data in st.session_state.previous_shifts.items():
            for resident in data["residents"]:
                for shift in data["shifts"]:
                    summary_data.append(
                        {
                            "Day": day_key.replace("_", " ").title(),
                            "Resident": resident,
                            "Shift Type": shift,
                        }
                    )

        if summary_data:
            summary_df = pd.DataFrame(summary_data)
            st.dataframe(summary_df, use_container_width=True, hide_index=True)

            # Save button
            if st.button("💾 Save Previous Shifts Data", type="primary"):
                st.success("Previous shifts data saved!")


def show_add_rules():
    """Add new scheduling rules in natural language"""
    st.markdown("### 📝 Add Scheduling Rules")
    st.markdown(
        "Enter rules in plain English - the system will parse them automatically"
    )

    # Check if we have imported data
    if not st.session_state.quota_data:
        st.warning(
            "⚠️ Please import data or set up manually in the 'Import Data' tab first."
        )
        return

    # Show available context for rule writing
    quota_data = st.session_state.quota_data

    with st.expander("🎯 Available Context for Rules", expanded=True):
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("**Available Residents & Categories:**")
            if quota_data.get("residents"):
                categories = set()
                for resident in quota_data["residents"]:
                    categories.add(resident["category"])
                    st.write(f"• {resident['name']} ({resident['category']})")

                st.markdown("**Categories available for rules:**")
                for category in sorted(categories):
                    st.write(f"• {category}")
            else:
                st.write("No residents imported yet")

        with col2:
            st.markdown("**Available Shift Types:**")
            if quota_data.get("shift_types"):
                for shift_type in quota_data["shift_types"]:
                    if isinstance(shift_type, dict):
                        st.write(
                            f"• **{shift_type['name']}** - {shift_type.get('description', '')}"
                        )
                    else:
                        st.write(f"• **{shift_type}**")
            else:
                st.write("No shift types defined yet")
                st.info("Add shift types in the 'Import Data' tab")

    # Rule templates for quick reference
    with st.expander("📚 Rule Examples & Templates", expanded=False):
        st.markdown(
            """
        **Basic Rule Examples:**
        - `PGY-2 residents cannot take call shifts before August 1st`
        - `Maximum 2 call shifts per resident per week`
        - `No consecutive call shifts for any resident`
        - `Weekend call requires PGY-3 or higher backup`
        - `Minimum 24 hours between call and moonlight shifts`
        
        **Advanced Rule Examples:**
        - `Chief residents get priority for Friday call shifts`
        - `No resident should work more than 3 weekends per quarter`
        - `Holiday coverage requires residents approved for holiday work`
        - `EMG rotations must be paired with PGY-3+ supervision`
        - `Research track residents limited to 1 call shift per month`
        """
        )

    # Rule input form
    with st.form("add_rule_form"):
        st.markdown("#### Enter New Rule")

        col1, col2 = st.columns([3, 1])

        with col1:
            rule_text = st.text_area(
                "Rule Description",
                placeholder="e.g., PGY-2 residents cannot take moonlight shifts before August 1st",
                help="Describe the rule in plain English using the available residents and shift types shown above",
            )

        with col2:
            rule_type = st.selectbox(
                "Rule Type",
                ["Hard Rule", "Soft Rule", "Preference"],
                help="Hard rules cannot be violated, soft rules should be followed when possible",
            )

            priority = st.selectbox("Priority", ["High", "Medium", "Low"], index=1)

        notes = st.text_input(
            "Additional Notes (optional)",
            placeholder="Any additional context or special considerations",
        )

        if st.form_submit_button("🧠 Parse Rule", type="primary"):
            if rule_text.strip():
                parsed_rule = parse_natural_language_rule(
                    rule_text, rule_type, priority, notes
                )

                if parsed_rule:
                    st.session_state.parsed_rules.append(parsed_rule)
                    st.success(f"✅ Rule parsed and added successfully!")
                    st.rerun()
                else:
                    st.error("❌ Could not parse the rule. Please try rephrasing.")

    # Quick rule builder
    st.markdown("---")
    st.markdown("#### 🚀 Quick Rule Builder")
    st.markdown("Build common rules using form inputs")

    # Get available options from imported data
    available_categories = []
    available_shifts = []

    if quota_data.get("residents"):
        categories = set()
        for resident in quota_data["residents"]:
            categories.add(resident["category"])
        available_categories = sorted(list(categories))

    if quota_data.get("shift_types"):
        for shift_type in quota_data["shift_types"]:
            if isinstance(shift_type, dict):
                available_shifts.append(shift_type["name"])
            else:
                available_shifts.append(shift_type)

    with st.form("quick_rule_form"):
        quick_rule_type = st.selectbox(
            "Common Rule Type",
            [
                "Training Level Restriction",
                "Maximum Shifts Limit",
                "Minimum Gap Requirement",
                "Coverage Requirement",
                "Priority Assignment",
            ],
        )

        if quick_rule_type == "Training Level Restriction":
            col1, col2, col3 = st.columns(3)
            with col1:
                if available_categories:
                    level = st.selectbox(
                        "Training Level/Category", available_categories
                    )
                else:
                    level = st.selectbox(
                        "Training Level", ["PGY-1", "PGY-2", "PGY-3", "PGY-4", "Chief"]
                    )

            with col2:
                restriction = st.selectbox("Cannot", ["take", "be assigned to"])

            with col3:
                if available_shifts:
                    shift_type = st.selectbox("Shift Type", available_shifts)
                else:
                    shift_type = st.text_input(
                        "Shift Type", placeholder="e.g., call shifts"
                    )

            time_restriction = st.text_input(
                "Time Restriction (optional)", placeholder="e.g., before August 1st"
            )

            if st.form_submit_button("Build Rule"):
                if level and shift_type:
                    quick_rule = f"{level} residents cannot {restriction} {shift_type}"
                    if time_restriction:
                        quick_rule += f" {time_restriction}"

                    parsed_rule = parse_natural_language_rule(
                        quick_rule, "Hard Rule", "High", "Built with Quick Rule Builder"
                    )
                    if parsed_rule:
                        st.session_state.parsed_rules.append(parsed_rule)
                        st.success(f"✅ Quick rule added: {quick_rule}")
                        st.rerun()

        elif quick_rule_type == "Maximum Shifts Limit":
            col1, col2, col3 = st.columns(3)
            with col1:
                max_number = st.number_input(
                    "Maximum Number", min_value=1, max_value=10, value=2
                )
            with col2:
                if available_shifts:
                    shift_type = st.selectbox("Shift Type", available_shifts)
                else:
                    shift_type = st.text_input(
                        "Shift Type", placeholder="e.g., call shifts"
                    )
            with col3:
                time_period = st.selectbox("Per", ["week", "month", "quarter"])

            if st.form_submit_button("Build Rule"):
                if shift_type:
                    quick_rule = f"Maximum {max_number} {shift_type} per resident per {time_period}"
                    parsed_rule = parse_natural_language_rule(
                        quick_rule, "Hard Rule", "High", "Built with Quick Rule Builder"
                    )
                    if parsed_rule:
                        st.session_state.parsed_rules.append(parsed_rule)
                        st.success(f"✅ Quick rule added: {quick_rule}")
                        st.rerun()


def parse_natural_language_rule(rule_text, rule_type, priority, notes):
    """Parse natural language rule into structured format"""

    # Create parsed rule structure
    parsed_rule = {
        "id": len(st.session_state.parsed_rules) + 1,
        "original_text": rule_text,
        "rule_type": rule_type,
        "priority": priority,
        "notes": notes,
        "created_at": datetime.now().isoformat(),
        "parsed_components": {},
        "constraints": [],
        "confidence": 0,
        "status": "active",
    }

    # Basic parsing logic
    rule_lower = rule_text.lower()

    # Extract training levels
    pgy_patterns = re.findall(r"pgy[-\s]*(\d+)", rule_lower)
    if pgy_patterns:
        parsed_rule["parsed_components"]["training_levels"] = [
            f"PGY-{level}" for level in pgy_patterns
        ]

    if "chief" in rule_lower:
        parsed_rule["parsed_components"].setdefault("training_levels", []).append(
            "Chief"
        )

    # Extract prohibitions
    if any(
        word in rule_lower
        for word in ["cannot", "prohibited", "not allowed", "forbidden"]
    ):
        parsed_rule["parsed_components"]["rule_category"] = "prohibition"
        parsed_rule["confidence"] = 90

    # Extract limits
    limit_match = re.search(r"maximum\s+(\d+)", rule_lower)
    if limit_match:
        parsed_rule["parsed_components"]["rule_category"] = "limit"
        parsed_rule["parsed_components"]["limit_value"] = int(limit_match.group(1))
        parsed_rule["confidence"] = 85

    # Extract minimum requirements
    if "minimum" in rule_lower:
        parsed_rule["parsed_components"]["rule_category"] = "minimum_requirement"
        parsed_rule["confidence"] = 85

    # Extract time periods
    time_periods = ["week", "month", "quarter", "year", "day"]
    for period in time_periods:
        if period in rule_lower:
            parsed_rule["parsed_components"]["time_period"] = period
            break

    # Extract shift types (look for common shift keywords)
    shift_keywords = [
        "call",
        "moonlight",
        "backup",
        "weekend",
        "holiday",
        "coverage",
        "shift",
    ]
    for keyword in shift_keywords:
        if keyword in rule_lower:
            parsed_rule["parsed_components"].setdefault("shift_types", []).append(
                keyword
            )

    # Extract date restrictions
    date_match = re.search(r"(before|after)\s+([a-z]+\s+\d+)", rule_lower)
    if date_match:
        parsed_rule["parsed_components"]["date_restriction"] = {
            "type": date_match.group(1),
            "date": date_match.group(2),
        }
        parsed_rule["confidence"] = max(parsed_rule["confidence"], 80)

    # Generate constraints based on parsed components
    constraints = generate_constraints(parsed_rule["parsed_components"], rule_text)
    parsed_rule["constraints"] = constraints

    # Set confidence if not already set
    if parsed_rule["confidence"] == 0:
        parsed_rule["confidence"] = 70  # Default confidence

    return parsed_rule


def generate_constraints(components, original_text):
    """Generate mathematical constraints from parsed components"""
    constraints = []

    rule_category = components.get("rule_category", "general")

    if rule_category == "prohibition":
        constraint = {
            "type": "PROHIBITION",
            "description": f"Prohibition constraint based on: {original_text}",
            "formula": generate_prohibition_formula(components),
            "severity": "HARD",
        }
        constraints.append(constraint)

    elif rule_category == "limit":
        constraint = {
            "type": "LIMIT",
            "description": f"Limit constraint: max {components.get('limit_value', 'X')} per {components.get('time_period', 'period')}",
            "formula": generate_limit_formula(components),
            "severity": "HARD",
        }
        constraints.append(constraint)

    elif rule_category == "minimum_requirement":
        constraint = {
            "type": "MINIMUM",
            "description": f"Minimum requirement constraint based on: {original_text}",
            "formula": generate_minimum_formula(components),
            "severity": "HARD",
        }
        constraints.append(constraint)

    else:
        # General constraint
        constraint = {
            "type": "GENERAL",
            "description": f"General constraint based on: {original_text}",
            "formula": f"RULE: {original_text}",
            "severity": "SOFT",
        }
        constraints.append(constraint)

    return constraints


def generate_prohibition_formula(components):
    """Generate prohibition formula"""
    levels = components.get("training_levels", ["ALL_RESIDENTS"])
    shift_types = components.get("shift_types", ["SHIFTS"])

    formula = f"∀ resident ∈ {levels}: NOT assigned_to({shift_types})"

    if "date_restriction" in components:
        date_info = components["date_restriction"]
        formula += f" WHEN date {date_info['type']} {date_info['date']}"

    return formula


def generate_limit_formula(components):
    """Generate limit formula"""
    limit = components.get("limit_value", "X")
    period = components.get("time_period", "period")
    shift_types = components.get("shift_types", ["shifts"])

    return f"∀ resident: COUNT({shift_types}) ≤ {limit} per {period}"


def generate_minimum_formula(components):
    """Generate minimum requirement formula"""
    shift_types = components.get("shift_types", ["shifts"])
    period = components.get("time_period", "period")

    return f"∀ resident: COUNT({shift_types}) ≥ MINIMUM_REQUIRED per {period}"


def show_rule_library():
    """Display all parsed rules"""
    st.markdown("### 📋 Rule Library")

    if not st.session_state.parsed_rules:
        st.info("No rules added yet. Add rules in the 'Add Rules' tab.")
        return

    # Summary stats
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Total Rules", len(st.session_state.parsed_rules))

    with col2:
        hard_rules = len(
            [r for r in st.session_state.parsed_rules if r["rule_type"] == "Hard Rule"]
        )
        st.metric("Hard Rules", hard_rules)

    with col3:
        soft_rules = len(
            [r for r in st.session_state.parsed_rules if r["rule_type"] == "Soft Rule"]
        )
        st.metric("Soft Rules", soft_rules)

    with col4:
        avg_confidence = sum(
            r["confidence"] for r in st.session_state.parsed_rules
        ) / len(st.session_state.parsed_rules)
        st.metric("Avg Confidence", f"{avg_confidence:.0f}%")

    # Rules list
    st.markdown("#### All Rules")

    for i, rule in enumerate(st.session_state.parsed_rules):
        show_rule_card(rule, i)


def show_rule_card(rule, index):
    """Display an individual rule card"""

    # Confidence color
    confidence = rule["confidence"]
    if confidence >= 90:
        conf_color = "🟢"
        conf_badge = "success"
    elif confidence >= 75:
        conf_color = "🟡"
        conf_badge = "warning"
    else:
        conf_color = "🔴"
        conf_badge = "error"

    # Rule type color
    type_color = (
        "🔴"
        if rule["rule_type"] == "Hard Rule"
        else "🟡" if rule["rule_type"] == "Soft Rule" else "🔵"
    )

    with st.container():
        col1, col2, col3 = st.columns([4, 1, 1])

        with col1:
            st.markdown(
                f"""
            **{type_color} {rule['original_text']}**
            
            *Type: {rule['rule_type']} | Priority: {rule['priority']} | Confidence: {conf_color} {confidence}%*
            """
            )

            if rule["notes"]:
                st.markdown(f"**Notes:** {rule['notes']}")

            # Show parsed components
            if rule["parsed_components"]:
                with st.expander("🔍 Parsed Components", expanded=False):
                    st.json(rule["parsed_components"])

            # Show constraints
            if rule["constraints"]:
                with st.expander("⚙️ Generated Constraints", expanded=False):
                    for constraint in rule["constraints"]:
                        st.markdown(
                            f"""
                        **Type:** {constraint['type']} ({constraint['severity']})
                        **Formula:** `{constraint['formula']}`
                        **Description:** {constraint['description']}
                        """
                        )

        with col2:
            if st.button("✏️ Edit", key=f"edit_{index}"):
                edit_rule(index)

        with col3:
            if st.button("🗑️ Delete", key=f"delete_{index}"):
                st.session_state.parsed_rules.pop(index)
                st.rerun()

        st.markdown("---")


def edit_rule(index):
    """Edit an existing rule"""
    rule = st.session_state.parsed_rules[index]

    with st.form(f"edit_rule_{index}"):
        st.markdown(f"### Edit Rule {index + 1}")

        new_text = st.text_area("Rule Text", value=rule["original_text"])

        col1, col2 = st.columns(2)
        with col1:
            new_type = st.selectbox(
                "Rule Type",
                ["Hard Rule", "Soft Rule", "Preference"],
                index=["Hard Rule", "Soft Rule", "Preference"].index(rule["rule_type"]),
            )

        with col2:
            new_priority = st.selectbox(
                "Priority",
                ["High", "Medium", "Low"],
                index=["High", "Medium", "Low"].index(rule["priority"]),
            )

        new_notes = st.text_input("Notes", value=rule["notes"])

        col1, col2 = st.columns(2)
        with col1:
            if st.form_submit_button("💾 Save Changes", type="primary"):
                # Re-parse the rule with new content
                updated_rule = parse_natural_language_rule(
                    new_text, new_type, new_priority, new_notes
                )
                updated_rule["id"] = rule["id"]  # Keep original ID
                st.session_state.parsed_rules[index] = updated_rule
                st.success("Rule updated successfully!")
                st.rerun()

        with col2:
            if st.form_submit_button("❌ Cancel"):
                st.rerun()


def show_export_rules():
    """Export rules for CSP Engine"""
    st.markdown("### 📤 Export Rules")
    st.markdown(
        "Export parsed rules and data for the CSP Engine and Schedule Generator"
    )

    if not st.session_state.parsed_rules:
        st.warning("No rules to export. Add rules first.")
        return

    # Export options
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### 📋 Rules Summary")
        st.metric("Total Rules", len(st.session_state.parsed_rules))

        rule_types = {}
        for rule in st.session_state.parsed_rules:
            rule_type = rule["rule_type"]
            rule_types[rule_type] = rule_types.get(rule_type, 0) + 1

        for rule_type, count in rule_types.items():
            st.metric(rule_type, count)

    with col2:
        st.markdown("#### 🎯 Export Options")

        export_format = st.selectbox(
            "Export Format",
            ["JSON (for CSP Engine)", "Human Readable Report", "Rule Summary"],
        )

        include_components = st.checkbox("Include Parsed Components", value=True)
        include_constraints = st.checkbox("Include Generated Constraints", value=True)
        include_quota_data = st.checkbox("Include Quota Data", value=True)

    # Generate export data
    export_data = {
        "metadata": {
            "exported_on": datetime.now().isoformat(),
            "total_rules": len(st.session_state.parsed_rules),
            "export_format": export_format,
            "system_version": "1.0.0",
        },
        "rules": [],
    }

    # Add rules to export
    for rule in st.session_state.parsed_rules:
        rule_export = {
            "id": rule["id"],
            "text": rule["original_text"],
            "type": rule["rule_type"],
            "priority": rule["priority"],
            "confidence": rule["confidence"],
            "notes": rule["notes"],
            "created_at": rule["created_at"],
        }

        if include_components:
            rule_export["parsed_components"] = rule["parsed_components"]

        if include_constraints:
            rule_export["constraints"] = rule["constraints"]

        export_data["rules"].append(rule_export)

    # Add quota data if available and selected
    if include_quota_data and st.session_state.quota_data:
        export_data["quota_data"] = st.session_state.quota_data

    # Add previous shifts data
    if st.session_state.previous_shifts:
        export_data["previous_shifts"] = st.session_state.previous_shifts

    # Export buttons
    st.markdown("---")
    col1, col2, col3 = st.columns(3)

    with col1:
        if st.button(
            "📥 Download Rules Data", type="primary", use_container_width=True
        ):
            json_string = json.dumps(export_data, indent=2)

            st.download_button(
                label="📥 Download JSON File",
                data=json_string,
                file_name=f"parsed_rules_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                mime="application/json",
            )

    with col2:
        if st.button("📋 Generate Report", use_container_width=True):
            generate_readable_report()

    with col3:
        if st.button("🔄 Transfer to CSP Engine", use_container_width=True):
            st.success("Rules ready for CSP Engine! (Feature coming in next component)")

    # Preview export data
    with st.expander("👁️ Preview Export Data", expanded=False):
        st.json(export_data)


def generate_readable_report():
    """Generate a human-readable rules report"""

    report = f"""
# Scheduling Rules Report
**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Total Rules:** {len(st.session_state.parsed_rules)}

## Rules Summary

"""

    # Group by type
    rule_groups = {}
    for rule in st.session_state.parsed_rules:
        rule_type = rule["rule_type"]
        if rule_type not in rule_groups:
            rule_groups[rule_type] = []
        rule_groups[rule_type].append(rule)

    for rule_type, rules in rule_groups.items():
        report += f"\n### {rule_type} ({len(rules)} rules)\n\n"

        for i, rule in enumerate(rules, 1):
            report += f"{i}. **{rule['original_text']}**\n"
            report += f"   - Priority: {rule['priority']}\n"
            report += f"   - Confidence: {rule['confidence']}%\n"
            if rule["notes"]:
                report += f"   - Notes: {rule['notes']}\n"
            report += "\n"

    # Add quota data summary if available
    if st.session_state.quota_data:
        quota_data = st.session_state.quota_data
        report += f"\n## Program Setup\n\n"
        report += f"**Start Month:** {quota_data.get('start_month', 'Not specified')}\n"
        report += f"**Residents:** {len(quota_data.get('residents', []))}\n"
        report += f"**Shift Types:** {len(quota_data.get('shift_types', []))}\n"

    st.download_button(
        label="📄 Download Report",
        data=report,
        file_name=f"rules_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md",
        mime="text/markdown",
    )

    st.success("Report generated successfully!")
