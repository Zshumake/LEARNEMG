"""
CSP-PM&R Rules Engine Integration Layer
Connects the complete PM&R Rules Engine with the CSP Scheduling Engine
"""

import sys
import os
from datetime import datetime, date, timedelta
from typing import List, Dict, Any, Tuple, Optional
from dataclasses import dataclass
import json

# Import the engines (assuming they're in the same directory)
try:
    from pmr_rules_engine import PMRSchedulingRules
    from csp_scheduling_engine import CSPSchedulingEngine, Resident, Assignment
except ImportError as e:
    print(f"Warning: Could not import engines: {e}")
    print(
        "Make sure pmr_rules_engine.py and csp_scheduling_engine.py are in the same directory"
    )


class IntegratedPMRScheduler:
    """
    Integrated PM&R Scheduler that combines CSP optimization with complete PM&R rules validation
    """

    def __init__(self):
        self.rules_engine = PMRSchedulingRules()
        self.csp_engine = None  # Will be initialized when needed
        self.validation_results = None
        self.generation_stats = None

        print("🏥 Integrated PM&R Scheduler initialized")
        print(
            f"✅ Rules Engine: {len(self.rules_engine.hard_rules)} hard rules, {len(self.rules_engine.soft_rules)} soft rules"
        )

    def setup_schedule_generation(
        self, residents: List[Resident], start_date: date, end_date: date, **kwargs
    ):
        """
        Setup integrated schedule generation with PM&R rules

        Args:
            residents: List of Resident objects
            start_date: Start date for schedule
            end_date: End date for schedule
            **kwargs: Additional parameters (max_iterations, algorithm, etc.)
        """

        print(f"\n🏗️ Setting up integrated PM&R schedule generation...")
        print(f"📅 Period: {start_date} to {end_date}")
        print(f"👥 Residents: {len(residents)}")

        # Initialize CSP engine with PM&R rules
        self.csp_engine = CSPSchedulingEngine(self.rules_engine)

        # Setup CSP parameters
        self.csp_engine.max_iterations = kwargs.get("max_iterations", 15000)
        self.csp_engine.max_backtrack_depth = kwargs.get("max_backtrack_depth", 2000)

        # Setup the CSP problem with residents and dates
        self.csp_engine.setup_schedule_generation(residents, start_date, end_date)

        # Pre-validate residents and constraints
        validation_issues = self._pre_validate_setup(residents, start_date, end_date)

        if validation_issues:
            print("⚠️ Pre-validation issues found:")
            for issue in validation_issues:
                print(f"   • {issue}")

        return validation_issues

    def generate_optimized_schedule(
        self, **kwargs
    ) -> Tuple[List[Assignment], Dict[str, Any]]:
        """
        Generate schedule using CSP optimization with full PM&R rules integration

        Returns:
            Tuple of (schedule, comprehensive_results)
        """

        if not self.csp_engine:
            raise ValueError("Must call setup_schedule_generation() first")

        print("\n🚀 Starting integrated PM&R schedule generation...")

        # Phase 1: Generate initial schedule using CSP
        print("📊 Phase 1: CSP Optimization...")
        schedule, csp_stats = self.csp_engine.generate_schedule()

        if not schedule:
            print("❌ CSP failed to generate schedule")
            return [], {"error": "CSP generation failed", "csp_stats": csp_stats}

        print(f"✅ CSP generated {len(schedule)} assignments")

        # Phase 2: Comprehensive PM&R validation
        print("🔍 Phase 2: PM&R Rules Validation...")
        hard_violations, soft_violations, validation_details = (
            self.rules_engine.validate_schedule_against_all_rules(
                schedule,
                self.csp_engine.residents,
                year_progress=kwargs.get("year_progress", 1.0),
                holidays=kwargs.get("holidays", None),
            )
        )

        # Phase 3: Optimization attempt if violations found
        if hard_violations and kwargs.get("attempt_repair", True):
            print(
                f"🔧 Phase 3: Attempting to repair {len(hard_violations)} hard violations..."
            )
            schedule = self._attempt_schedule_repair(schedule, hard_violations)

            # Re-validate after repair
            hard_violations, soft_violations, validation_details = (
                self.rules_engine.validate_schedule_against_all_rules(
                    schedule,
                    self.csp_engine.residents,
                    year_progress=kwargs.get("year_progress", 1.0),
                )
            )

        # Phase 4: Compile comprehensive results
        comprehensive_results = self._compile_comprehensive_results(
            schedule, csp_stats, hard_violations, soft_violations, validation_details
        )

        self.validation_results = validation_details
        self.generation_stats = comprehensive_results

        return schedule, comprehensive_results

    def _pre_validate_setup(
        self, residents: List[Resident], start_date: date, end_date: date
    ) -> List[str]:
        """Pre-validate setup before generation"""
        issues = []

        # Check resident distribution
        pgy_counts = {}
        for resident in residents:
            pgy_counts[resident.pgy_level] = pgy_counts.get(resident.pgy_level, 0) + 1

        # PM&R specific checks
        if pgy_counts.get("PGY-2", 0) < 3:
            issues.append(
                f"Need at least 3 PGY-2s for adequate coverage (have {pgy_counts.get('PGY-2', 0)})"
            )

        if pgy_counts.get("PGY-3", 0) < 2:
            issues.append(
                f"Need at least 2 PGY-3s for Friday call coverage (have {pgy_counts.get('PGY-3', 0)})"
            )

        # Check quota feasibility
        total_days = (end_date - start_date).days + 1
        weekdays = sum(
            1
            for i in range(total_days)
            if (start_date + timedelta(days=i)).weekday() < 5
        )

        total_weekday_call_needed = weekdays
        total_pgy2_pgy3_residents = pgy_counts.get("PGY-2", 0) + pgy_counts.get(
            "PGY-3", 0
        )

        if total_pgy2_pgy3_residents < 3:
            issues.append("Insufficient residents for weekday call coverage")

        # Check time-off conflicts
        total_time_off = 0
        for resident in residents:
            if hasattr(resident, "time_off_requests"):
                total_time_off += len(resident.time_off_requests)

        if total_time_off > total_days * 0.4:
            issues.append(
                f"High time-off load: {total_time_off} days requested ({total_time_off/total_days*100:.1f}% of period)"
            )

        return issues

    def _attempt_schedule_repair(
        self, schedule: List[Assignment], violations: List[str]
    ) -> List[Assignment]:
        """Attempt to repair hard violations in the schedule"""

        print(f"🔧 Attempting to repair {len(violations)} violations...")

        # Simple repair strategies
        repaired_schedule = schedule.copy()

        # Strategy 1: Remove conflicting assignments
        conflicts_removed = 0

        # Find same-day call+moonlight conflicts (H012)
        for violation in violations:
            if "H012" in violation and "call and moonlight same day" in violation:
                # Find and remove moonlight assignment (keep call)
                for assignment in repaired_schedule:
                    if "moonlight" in assignment.shift_type and any(
                        a.date == assignment.date
                        and a.resident_id == assignment.resident_id
                        and "call" in a.shift_type
                        for a in repaired_schedule
                    ):

                        repaired_schedule.remove(assignment)
                        conflicts_removed += 1
                        break

        # Strategy 2: Fix post-call violations (H013)
        for violation in violations:
            if "H013" in violation and "moonlight day after call" in violation:
                # Remove the moonlight assignment
                for assignment in repaired_schedule:
                    if "moonlight" in assignment.shift_type:
                        previous_day = assignment.date - timedelta(days=1)
                        if any(
                            a.date == previous_day
                            and a.resident_id == assignment.resident_id
                            and "call" in a.shift_type
                            for a in repaired_schedule
                        ):
                            repaired_schedule.remove(assignment)
                            conflicts_removed += 1
                            break

        if conflicts_removed > 0:
            print(f"🔧 Removed {conflicts_removed} conflicting assignments")

        return repaired_schedule

    def _compile_comprehensive_results(
        self,
        schedule: List[Assignment],
        csp_stats: Dict,
        hard_violations: List[str],
        soft_violations: List[str],
        validation_details: Dict,
    ) -> Dict[str, Any]:
        """Compile comprehensive results from all phases"""

        return {
            "metadata": {
                "generated_on": datetime.now().isoformat(),
                "integration_version": "1.0.0",
                "total_assignments": len(schedule),
                "generation_method": "Integrated CSP + PM&R Rules",
            },
            "csp_results": {
                "generation_time": csp_stats.get("duration", 0),
                "assignments_tried": csp_stats.get("assignments_tried", 0),
                "backtracks": csp_stats.get("backtracks", 0),
                "constraint_checks": csp_stats.get("constraint_checks", 0),
                "csp_success": len(schedule) > 0,
            },
            "validation_results": {
                "hard_violations": hard_violations,
                "soft_violations": soft_violations,
                "hard_violation_count": len(hard_violations),
                "soft_violation_count": len(soft_violations),
                "schedule_valid": len(hard_violations) == 0,
                "rules_details": validation_details,
            },
            "quality_metrics": {
                "overall_score": max(
                    0, 100 - len(hard_violations) * 10 - len(soft_violations) * 2
                ),
                "hard_rules_passed": validation_details["summary"]["hard_rules_passed"],
                "soft_rules_passed": validation_details["summary"]["soft_rules_passed"],
                "total_rules_checked": len(self.rules_engine.hard_rules)
                + len(self.rules_engine.soft_rules),
            },
            "quota_analysis": self._analyze_quota_progress(schedule),
            "recommendations": self._generate_recommendations(
                hard_violations, soft_violations
            ),
        }

    def _analyze_quota_progress(self, schedule: List[Assignment]) -> Dict[str, Any]:
        """Analyze quota progress for all residents"""

        if not self.csp_engine:
            return {}

        quota_analysis = {
            "residents": {},
            "overall_balance": 0,
            "concerning_residents": [],
        }

        for resident in self.csp_engine.residents:
            resident_assignments = [a for a in schedule if a.resident_id == resident.id]

            # Count by type
            weekday_call = len(
                [
                    a
                    for a in resident_assignments
                    if a.shift_type in ["weekday_call", "friday_call"]
                ]
            )
            moonlight = len(
                [a for a in resident_assignments if "moonlight" in a.shift_type]
            )
            weekend_call = len(
                [a for a in resident_assignments if a.shift_type == "weekend_call"]
            )

            # Add completed
            total_weekday_call = weekday_call + resident.completed.get(
                "weekday_call", 0
            )
            total_moonlight = moonlight + resident.completed.get("moonlight", 0)
            total_weekend_call = weekend_call + resident.completed.get(
                "weekend_call", 0
            )

            # Expected quotas
            quotas = self.rules_engine.get_quotas_for_pgy_level(resident.pgy_level)

            analysis = {
                "assignments_this_period": len(resident_assignments),
                "weekday_call": {
                    "current": weekday_call,
                    "total": total_weekday_call,
                    "quota": quotas.get("weekday_call", 0),
                },
                "moonlight": {
                    "current": moonlight,
                    "total": total_moonlight,
                    "quota": quotas.get("moonlight", 0),
                },
                "weekend_call": {
                    "current": weekend_call,
                    "total": total_weekend_call,
                    "quota": quotas.get("weekend_call", 0),
                },
            }

            # Calculate progress percentages
            for quota_type in ["weekday_call", "moonlight", "weekend_call"]:
                quota_info = analysis[quota_type]
                if quota_info["quota"] > 0:
                    quota_info["progress_percent"] = (
                        quota_info["total"] / quota_info["quota"]
                    ) * 100

                    # Flag concerning residents
                    if quota_info["progress_percent"] < 50:  # Less than 50% of quota
                        quota_analysis["concerning_residents"].append(
                            {
                                "resident": resident.name,
                                "issue": f"{quota_type} only {quota_info['progress_percent']:.1f}% complete",
                            }
                        )

            quota_analysis["residents"][resident.name] = analysis

        return quota_analysis

    def _generate_recommendations(
        self, hard_violations: List[str], soft_violations: List[str]
    ) -> List[str]:
        """Generate actionable recommendations based on violations"""

        recommendations = []

        if hard_violations:
            recommendations.append(
                "🚨 CRITICAL: Hard rule violations must be fixed before schedule can be used"
            )

            # Specific recommendations based on violation types
            if any("H012" in v for v in hard_violations):
                recommendations.append(
                    "• Fix same-day call/moonlight conflicts by reassigning one of the shifts"
                )

            if any("H013" in v for v in hard_violations):
                recommendations.append(
                    "• Remove moonlight assignments the day after call shifts"
                )

            if any("H014" in v for v in hard_violations):
                recommendations.append(
                    "• Remove consecutive call assignments (except weekend blocks)"
                )

            if any("quota" in v.lower() for v in hard_violations):
                recommendations.append(
                    "• Adjust assignments to meet annual quota requirements"
                )

        else:
            recommendations.append(
                "✅ All hard rules satisfied - schedule is valid for use"
            )

        if soft_violations:
            if len(soft_violations) > 10:
                recommendations.append(
                    "⚠️ High number of soft violations - consider schedule adjustments for better quality"
                )

            if any("S001" in v for v in soft_violations):
                recommendations.append(
                    "• Consider reducing weekly shift loads to improve work-life balance"
                )

            if any("preference" in v.lower() for v in soft_violations):
                recommendations.append(
                    "• Review resident preferences and adjust assignments where possible"
                )

        if not hard_violations and len(soft_violations) < 5:
            recommendations.append(
                "🎉 Excellent schedule quality - ready for implementation"
            )

        return recommendations

    # ==================== STREAMLIT INTEGRATION METHODS ====================

    def export_for_streamlit(
        self, schedule: List[Assignment], results: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Export results in format suitable for Streamlit display"""

        return {
            "schedule_data": [
                {
                    "date": a.date.isoformat(),
                    "day_of_week": a.date.strftime("%A"),
                    "resident_name": next(
                        (
                            r.name
                            for r in self.csp_engine.residents
                            if r.id == a.resident_id
                        ),
                        a.resident_id,
                    ),
                    "resident_id": a.resident_id,
                    "pgy_level": a.pgy_level,
                    "shift_type": a.shift_type,
                    "shift_display": a.shift_type.replace("_", " ").title(),
                }
                for a in schedule
            ],
            "validation_summary": {
                "schedule_valid": results["validation_results"]["schedule_valid"],
                "quality_score": results["quality_metrics"]["overall_score"],
                "hard_violations": results["validation_results"][
                    "hard_violation_count"
                ],
                "soft_violations": results["validation_results"][
                    "soft_violation_count"
                ],
                "total_assignments": results["metadata"]["total_assignments"],
            },
            "violations": {
                "hard": results["validation_results"]["hard_violations"][
                    :10
                ],  # Limit for display
                "soft": results["validation_results"]["soft_violations"][:10],
            },
            "quota_progress": results["quota_analysis"],
            "recommendations": results["recommendations"],
            "generation_stats": results["csp_results"],
        }

    def get_rule_details(self, rule_id: str) -> Dict[str, Any]:
        """Get detailed information about a specific rule"""

        rule = self.rules_engine.get_rule_by_id(rule_id)
        if rule:
            return {
                "id": rule["id"],
                "name": rule["name"],
                "description": rule["description"],
                "type": rule["constraint_type"],
                "formula": rule["formula"],
                "rule_category": (
                    "Hard Rule" if rule["id"].startswith("H") else "Soft Rule"
                ),
            }
        return None

    def validate_existing_schedule(
        self, schedule_data: List[Dict], residents_data: List[Dict]
    ) -> Dict[str, Any]:
        """Validate an existing schedule (useful for imported schedules)"""

        # Convert data to internal format
        residents = self._convert_streamlit_residents(residents_data)
        schedule = self._convert_streamlit_schedule(schedule_data)

        # Run validation
        hard_violations, soft_violations, validation_details = (
            self.rules_engine.validate_schedule_against_all_rules(schedule, residents)
        )

        # Return results
        return self._compile_comprehensive_results(
            schedule, {}, hard_violations, soft_violations, validation_details
        )

    def _convert_streamlit_residents(
        self, residents_data: List[Dict]
    ) -> List[Resident]:
        """Convert Streamlit resident data to Resident objects"""

        residents = []
        for r_data in residents_data:
            resident = Resident(
                id=r_data.get("id", r_data["name"].lower().replace(" ", "_")),
                name=r_data["name"],
                pgy_level=r_data["pgy_level"],
                quotas=r_data.get("quotas", {}),
                completed=r_data.get("completed", {}),
                time_off_requests=r_data.get("time_off_requests", []),
                va_rotation_weeks=r_data.get("va_rotation_weeks", []),
                holiday_approved=r_data.get("holiday_approved", False),
                preferences=r_data.get("preferences", {}),
            )
            residents.append(resident)

        return residents

    def _convert_streamlit_schedule(
        self, schedule_data: List[Dict]
    ) -> List[Assignment]:
        """Convert Streamlit schedule data to Assignment objects"""

        schedule = []
        for s_data in schedule_data:
            assignment = Assignment(
                date=(
                    date.fromisoformat(s_data["date"])
                    if isinstance(s_data["date"], str)
                    else s_data["date"]
                ),
                resident_id=s_data["resident_id"],
                shift_type=s_data["shift_type"],
                pgy_level=s_data["pgy_level"],
            )
            schedule.append(assignment)

        return schedule


# ==================== STREAMLIT COMPONENT INTEGRATION ====================


def create_integrated_streamlit_component():
    """
    Create a Streamlit component that uses the integrated scheduler
    This would go in your components/integrated_scheduler.py file
    """

    component_code = '''
import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, date, timedelta
import json
from integrated_pmr_scheduler import IntegratedPMRScheduler

def render():
    """Render the Integrated PM&R Scheduler component"""
    
    st.markdown("## 🏥 Integrated PM&R Scheduler")
    st.markdown("Complete scheduling system with CSP optimization and full PM&R rules validation")
    
    # Initialize scheduler
    if 'integrated_scheduler' not in st.session_state:
        st.session_state.integrated_scheduler = IntegratedPMRScheduler()
    
    scheduler = st.session_state.integrated_scheduler
    
    # Main tabs
    tab1, tab2, tab3, tab4 = st.tabs(["🏗️ Setup", "🚀 Generate", "📋 Results", "🔍 Validation"])
    
    with tab1:
        show_integrated_setup(scheduler)
    
    with tab2:
        show_integrated_generation(scheduler)
    
    with tab3:
        show_integrated_results(scheduler)
    
    with tab4:
        show_integrated_validation(scheduler)

def show_integrated_setup(scheduler):
    """Setup tab for integrated scheduler"""
    
    st.markdown("### 🏗️ Integrated Scheduler Setup")
    st.markdown("Configure residents, dates, and parameters for PM&R schedule generation")
    
    # Import residents from quota tracker
    if st.button("📥 Import from Quota Tracker", type="primary"):
        if 'residents' in st.session_state:
            st.success(f"✅ Imported {len(st.session_state.residents)} residents from Quota Tracker")
        else:
            st.warning("No residents found in Quota Tracker. Please set up residents first.")
    
    # Date selection
    col1, col2 = st.columns(2)
    with col1:
        start_date = st.date_input("Start Date", value=date(2025, 8, 1))
    with col2:
        end_date = st.date_input("End Date", value=date(2025, 8, 31))
    
    # Advanced parameters
    with st.expander("⚙️ Advanced Parameters"):
        max_iterations = st.number_input("Max CSP Iterations", min_value=1000, max_value=50000, value=15000)
        attempt_repair = st.checkbox("Attempt Automatic Repair", value=True, help="Try to fix hard violations automatically")
        year_progress = st.slider("Academic Year Progress", 0.1, 1.0, 0.5, help="Fraction of academic year completed (for quota validation)")
    
    # Store parameters
    st.session_state.schedule_params = {
        'start_date': start_date,
        'end_date': end_date,
        'max_iterations': max_iterations,
        'attempt_repair': attempt_repair,
        'year_progress': year_progress
    }
    
    # Validation summary
    if 'residents' in st.session_state:
        st.markdown("### ✅ Setup Summary")
        
        residents = st.session_state.residents
        pgy_counts = {}
        for resident in residents:
            pgy_level = resident.get('pgy_level', 'Unknown')
            pgy_counts[pgy_level] = pgy_counts.get(pgy_level, 0) + 1
        
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Total Residents", len(residents))
        with col2:
            st.metric("PGY-2s", pgy_counts.get('PGY-2', 0))
        with col3:
            st.metric("PGY-3s", pgy_counts.get('PGY-3', 0))
        with col4:
            total_days = (end_date - start_date).days + 1
            st.metric("Schedule Days", total_days)

def show_integrated_generation(scheduler):
    """Generation tab for integrated scheduler"""
    
    if 'residents' not in st.session_state:
        st.warning("Please set up residents in the Setup tab first.")
        return
    
    if 'schedule_params' not in st.session_state:
        st.warning("Please configure parameters in the Setup tab first.")
        return
    
    st.markdown("### 🚀 Generate Integrated Schedule")
    
    params = st.session_state.schedule_params
    residents_data = st.session_state.residents
    
    # Convert to Resident objects
    residents = scheduler._convert_streamlit_residents(residents_data)
    
    if st.button("🚀 Generate Optimized Schedule", type="primary", use_container_width=True):
        
        with st.spinner("Setting up integrated scheduler..."):
            # Setup
            issues = scheduler.setup_schedule_generation(
                residents, 
                params['start_date'], 
                params['end_date'],
                max_iterations=params['max_iterations']
            )
            
            if issues:
                st.warning("Setup issues detected:")
                for issue in issues:
                    st.write(f"• {issue}")
        
        with st.spinner("Generating optimized schedule with PM&R rules..."):
            # Generate
            schedule, results = scheduler.generate_optimized_schedule(
                attempt_repair=params['attempt_repair'],
                year_progress=params['year_progress']
            )
            
            if schedule:
                # Store results
                st.session_state.generated_schedule = schedule
                st.session_state.generation_results = results
                st.session_state.streamlit_export = scheduler.export_for_streamlit(schedule, results)
                
                # Show immediate results
                streamlit_data = st.session_state.streamlit_export
                validation = streamlit_data['validation_summary']
                
                if validation['schedule_valid']:
                    st.success(f"✅ Valid schedule generated! Quality score: {validation['quality_score']}/100")
                    st.balloons()
                else:
                    st.error(f"❌ Schedule has {validation['hard_violations']} hard violations")
                
                # Quick stats
                col1, col2, col3, col4 = st.columns(4)
                with col1:
                    st.metric("Total Assignments", validation['total_assignments'])
                with col2:
                    st.metric("Quality Score", f"{validation['quality_score']}/100")
                with col3:
                    st.metric("Hard Violations", validation['hard_violations'])
                with col4:
                    st.metric("Soft Violations", validation['soft_violations'])
            
            else:
                st.error("❌ Failed to generate schedule")
                if 'generation_results' in results:
                    st.json(results['generation_results'])

def show_integrated_results(scheduler):
    """Results tab for integrated scheduler"""
    
    if 'streamlit_export' not in st.session_state:
        st.info("No schedule generated yet. Use the Generate tab to create a schedule.")
        return
    
    data = st.session_state.streamlit_export
    
    st.markdown("### 📋 Generated Schedule Results")
    
    # Summary metrics
    validation = data['validation_summary']
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Schedule Valid", "✅ Yes" if validation['schedule_valid'] else "❌ No")
    with col2:
        st.metric("Quality Score", f"{validation['quality_score']}/100")
    with col3:
        st.metric("Total Assignments", validation['total_assignments'])
    with col4:
        generation_time = data['generation_stats'].get('generation_time', 0)
        st.metric("Generation Time", f"{generation_time:.2f}s")
    
    # Display options
    display_option = st.selectbox("Display Format", ["Table View", "Calendar View", "By Resident", "By Shift Type"])
    
    # Schedule data
    schedule_df = pd.DataFrame(data['schedule_data'])
    
    if display_option == "Table View":
        st.dataframe(schedule_df, use_container_width=True, hide_index=True)
    
    elif display_option == "Calendar View":
        # Group by date
        for date_str in sorted(schedule_df['date'].unique()):
            day_data = schedule_df[schedule_df['date'] == date_str]
            day_name = day_data.iloc[0]['day_of_week']
            
            with st.expander(f"{date_str} ({day_name}) - {len(day_data)} assignments"):
                for _, row in day_data.iterrows():
                    st.write(f"**{row['shift_display']}:** {row['resident_name']} ({row['pgy_level']})")
    
    # Quota analysis
    if data['quota_progress']:
        st.markdown("### 📊 Quota Progress Analysis")
        
        quota_data = []
        for resident_name, analysis in data['quota_progress']['residents'].items():
            for quota_type, quota_info in analysis.items():
                if isinstance(quota_info, dict) and 'quota' in quota_info:
                    quota_data.append({
                        'Resident': resident_name,
                        'Quota Type': quota_type.replace('_', ' ').title(),
                        'Current': quota_info['current'],
                        'Total': quota_info['total'],
                        'Target': quota_info['quota'],
                        'Progress %': quota_info.get('progress_percent', 0)
                    })
        
        if quota_data:
            quota_df = pd.DataFrame(quota_data)
            st.dataframe(quota_df, use_container_width=True, hide_index=True)

def show_integrated_validation(scheduler):
    """Validation tab for integrated scheduler"""
    
    if 'streamlit_export' not in st.session_state:
        st.info("No schedule to validate. Generate a schedule first.")
        return
    
    data = st.session_state.streamlit_export
    
    st.markdown("### 🔍 Comprehensive PM&R Validation")
    
    # Violation summary
    violations = data['violations']
    
    if violations['hard']:
        st.error(f"❌ {len(violations['hard'])} Hard Rule Violations")
        for violation in violations['hard']:
            st.write(f"• {violation}")
    else:
        st.success("✅ All hard rules satisfied")
    
    if violations['soft']:
        st.warning(f"⚠️ {len(violations['soft'])} Soft Rule Violations")
        with st.expander("View soft violations"):
            for violation in violations['soft']:
                st.write(f"• {violation}")
    
    # Recommendations
    if data['recommendations']:
        st.markdown("### 💡 Recommendations")
        for rec in data['recommendations']:
            st.info(f"• {rec}")

    '''

    return component_code


# Example usage of the integrated component
if __name__ == "__main__":
    # This would normally be called from your Streamlit app
    print("Integrated PMR Scheduler component ready for Streamlit integration")
    print("Import this module and call render() from your Streamlit app")
