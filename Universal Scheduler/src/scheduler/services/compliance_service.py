"""Compliance service for ACGME duty hour tracking and reporting."""

from datetime import datetime, date, timedelta
from typing import List, Dict, Optional, Any
from sqlalchemy.orm import Session
import logging

from .acgme_compliance_engine import (
    ACGMEComplianceEngine,
    initialize_acgme_configuration,
)
from .notification_service import NotificationService
from ..models import (
    Resident,
    Schedule,
    Assignment,
    ACGMEViolation,
    WeeklyDutyHourSummary,
    ACGMEComplianceReport,
    CorrectiveAction,
    ACGMEViolationType,
    ACGMEViolationSeverity,
)

logger = logging.getLogger(__name__)


class ComplianceService:
    """Service for managing ACGME compliance tracking and reporting."""

    def __init__(self, db_session: Session):
        self.db = db_session
        self.engine = ACGMEComplianceEngine(db_session)
        self.notification_service = NotificationService(db_session)
        self.logger = logging.getLogger(__name__)

    def initialize_compliance_system(self):
        """Initialize the ACGME compliance tracking system."""
        try:
            # Initialize configuration
            initialize_acgme_configuration(self.db)
            self.logger.info("ACGME compliance system initialized successfully")
        except Exception as e:
            self.logger.error(f"Failed to initialize compliance system: {e}")
            raise

    def process_new_schedule(self, schedule_id: int) -> Dict[str, Any]:
        """Process a newly generated schedule for ACGME compliance."""
        try:
            result = self.engine.process_schedule_for_compliance(schedule_id)

            # If violations are detected, generate immediate alerts
            if result["immediate_violations"] > 0:
                self._generate_compliance_alerts(schedule_id, result)

            return result

        except Exception as e:
            self.logger.error(
                f"Failed to process schedule {schedule_id} for compliance: {e}"
            )
            raise

    def _generate_compliance_alerts(self, schedule_id: int, processing_result: Dict):
        """Generate alerts for compliance violations in a schedule."""
        try:
            # Get all violations for this schedule
            violations = (
                self.db.query(ACGMEViolation)
                .filter(
                    ACGMEViolation.schedule_id == schedule_id,
                    ACGMEViolation.status == "active",
                )
                .all()
            )

            # Categorize violations by severity
            critical_violations = [
                v for v in violations if v.severity == ACGMEViolationSeverity.CRITICAL
            ]
            high_violations = [
                v for v in violations if v.severity == ACGMEViolationSeverity.HIGH
            ]

            # Log immediate attention items
            if critical_violations:
                self.logger.critical(
                    f"CRITICAL ACGME violations detected in schedule {schedule_id}: {len(critical_violations)} violations require immediate attention"
                )

            if high_violations:
                self.logger.warning(
                    f"HIGH severity ACGME violations detected in schedule {schedule_id}: {len(high_violations)} violations"
                )

            # Here you could integrate with notification systems, email alerts, etc.

        except Exception as e:
            self.logger.error(f"Failed to generate compliance alerts: {e}")

    def get_resident_dashboard(
        self, resident_id: int, weeks_back: int = 12
    ) -> Dict[str, Any]:
        """Get compliance dashboard data for a resident."""
        try:
            resident = (
                self.db.query(Resident).filter(Resident.id == resident_id).first()
            )
            if not resident:
                raise ValueError(f"Resident {resident_id} not found")

            # Calculate date range
            end_date = date.today()
            start_date = end_date - timedelta(weeks=weeks_back)

            # Get compliance status
            compliance_status = self.engine.get_resident_compliance_status(
                resident_id, start_date, end_date
            )

            # Get recent violations
            recent_violations = (
                self.db.query(ACGMEViolation)
                .filter(
                    ACGMEViolation.resident_id == resident_id,
                    ACGMEViolation.violation_date >= start_date,
                    ACGMEViolation.status == "active",
                )
                .order_by(ACGMEViolation.violation_date.desc())
                .limit(10)
                .all()
            )

            # Get weekly summaries for trend analysis
            weekly_summaries = (
                self.db.query(WeeklyDutyHourSummary)
                .filter(
                    WeeklyDutyHourSummary.resident_id == resident_id,
                    WeeklyDutyHourSummary.week_start_date >= start_date,
                )
                .order_by(WeeklyDutyHourSummary.week_start_date.desc())
                .all()
            )

            return {
                "resident": {
                    "id": resident.id,
                    "name": resident.name,
                    "pgy_level": resident.pgy_level,
                },
                "compliance_summary": compliance_status,
                "recent_violations": [
                    self._serialize_violation(v) for v in recent_violations
                ],
                "weekly_trends": [
                    self._serialize_weekly_summary(w) for w in weekly_summaries
                ],
                "alerts": self._get_resident_alerts(resident_id),
                "recommendations": self._get_resident_recommendations(
                    compliance_status
                ),
            }

        except Exception as e:
            self.logger.error(
                f"Failed to get resident dashboard for {resident_id}: {e}"
            )
            raise

    def get_program_dashboard(
        self, program_id: Optional[str] = None, weeks_back: int = 8
    ) -> Dict[str, Any]:
        """Get compliance dashboard data for program directors."""
        try:
            # Get residents in program
            query = self.db.query(Resident).filter(Resident.is_active == True)
            if program_id:
                query = query.filter(Resident.program_id == program_id)
            residents = query.all()

            # Calculate date range
            end_date = date.today()
            start_date = end_date - timedelta(weeks=weeks_back)

            # Get overall compliance metrics
            total_residents = len(residents)
            compliant_residents = 0
            total_violations = 0
            violation_severity_counts = {
                "critical": 0,
                "high": 0,
                "medium": 0,
                "low": 0,
            }

            resident_summaries = []

            for resident in residents:
                compliance_status = self.engine.get_resident_compliance_status(
                    resident.id, start_date, end_date
                )

                if compliance_status["compliance_percentage"] >= 95:
                    compliant_residents += 1

                total_violations += compliance_status["total_violations"]
                violation_severity_counts["critical"] += compliance_status[
                    "critical_violations"
                ]
                violation_severity_counts["high"] += compliance_status[
                    "high_violations"
                ]
                violation_severity_counts["medium"] += compliance_status[
                    "medium_violations"
                ]
                violation_severity_counts["low"] += compliance_status["low_violations"]

                resident_summaries.append(
                    {
                        "resident": {
                            "id": resident.id,
                            "name": resident.name,
                            "pgy_level": resident.pgy_level,
                        },
                        "compliance_percentage": compliance_status[
                            "compliance_percentage"
                        ],
                        "total_violations": compliance_status["total_violations"],
                        "requires_attention": compliance_status[
                            "requires_immediate_attention"
                        ],
                    }
                )

            # Get recent high-priority violations
            high_priority_violations = (
                self.db.query(ACGMEViolation)
                .filter(
                    ACGMEViolation.violation_date >= start_date,
                    ACGMEViolation.severity.in_(
                        [ACGMEViolationSeverity.CRITICAL, ACGMEViolationSeverity.HIGH]
                    ),
                    ACGMEViolation.status == "active",
                )
                .order_by(ACGMEViolation.violation_date.desc())
                .limit(20)
                .all()
            )

            if program_id:
                # Filter violations to residents in this program
                program_resident_ids = [r.id for r in residents]
                high_priority_violations = [
                    v
                    for v in high_priority_violations
                    if v.resident_id in program_resident_ids
                ]

            return {
                "program_summary": {
                    "program_id": program_id,
                    "total_residents": total_residents,
                    "compliant_residents": compliant_residents,
                    "compliance_rate": (
                        (compliant_residents / total_residents * 100)
                        if total_residents > 0
                        else 0.0
                    ),
                    "total_violations": total_violations,
                    "violation_severity_counts": violation_severity_counts,
                    "analysis_period": f"{start_date} to {end_date}",
                },
                "resident_summaries": resident_summaries,
                "high_priority_violations": [
                    self._serialize_violation(v) for v in high_priority_violations
                ],
                "program_alerts": self._get_program_alerts(program_id),
                "recommendations": self._get_program_recommendations(
                    violation_severity_counts, compliant_residents, total_residents
                ),
            }

        except Exception as e:
            self.logger.error(f"Failed to get program dashboard: {e}")
            raise

    def generate_monthly_report(
        self, year: int, month: int, program_id: Optional[str] = None
    ) -> ACGMEComplianceReport:
        """Generate monthly ACGME compliance report."""
        try:
            # Calculate month boundaries
            start_date = date(year, month, 1)
            if month == 12:
                end_date = date(year + 1, 1, 1) - timedelta(days=1)
            else:
                end_date = date(year, month + 1, 1) - timedelta(days=1)

            return self.engine.generate_compliance_report(
                report_type="monthly",
                start_date=start_date,
                end_date=end_date,
                program_id=program_id,
            )

        except Exception as e:
            self.logger.error(
                f"Failed to generate monthly report for {year}-{month}: {e}"
            )
            raise

    def generate_quarterly_report(
        self, year: int, quarter: int, program_id: Optional[str] = None
    ) -> ACGMEComplianceReport:
        """Generate quarterly ACGME compliance report."""
        try:
            # Calculate quarter boundaries
            quarter_starts = {1: 1, 2: 4, 3: 7, 4: 10}
            start_month = quarter_starts[quarter]
            start_date = date(year, start_month, 1)

            if quarter == 4:
                end_date = date(year + 1, 1, 1) - timedelta(days=1)
            else:
                end_month = quarter_starts[quarter + 1]
                end_date = date(year, end_month, 1) - timedelta(days=1)

            return self.engine.generate_compliance_report(
                report_type="quarterly",
                start_date=start_date,
                end_date=end_date,
                program_id=program_id,
            )

        except Exception as e:
            self.logger.error(
                f"Failed to generate quarterly report for {year} Q{quarter}: {e}"
            )
            raise

    def create_corrective_action(
        self,
        violation_id: int,
        action_type: str,
        description: str,
        assigned_to: str,
        due_date: Optional[date] = None,
    ) -> CorrectiveAction:
        """Create a corrective action for an ACGME violation."""
        try:
            violation = (
                self.db.query(ACGMEViolation)
                .filter(ACGMEViolation.id == violation_id)
                .first()
            )
            if not violation:
                raise ValueError(f"Violation {violation_id} not found")

            corrective_action = CorrectiveAction(
                violation_id=violation_id,
                resident_id=violation.resident_id,
                action_type=action_type,
                action_description=description,
                action_date=date.today(),
                assigned_to=assigned_to,
                due_date=due_date,
                created_by="Compliance Service",
            )

            self.db.add(corrective_action)
            self.db.commit()

            self.logger.info(f"Created corrective action for violation {violation_id}")
            return corrective_action

        except Exception as e:
            self.logger.error(
                f"Failed to create corrective action for violation {violation_id}: {e}"
            )
            raise

    def resolve_violation(
        self, violation_id: int, resolution_method: str, notes: str, resolved_by: str
    ) -> ACGMEViolation:
        """Mark an ACGME violation as resolved."""
        try:
            violation = (
                self.db.query(ACGMEViolation)
                .filter(ACGMEViolation.id == violation_id)
                .first()
            )
            if not violation:
                raise ValueError(f"Violation {violation_id} not found")

            violation.status = "resolved"
            violation.resolution_method = resolution_method
            violation.resolution_notes = notes
            violation.resolved_by = resolved_by
            violation.resolved_at = datetime.utcnow()

            self.db.commit()

            self.logger.info(f"Resolved violation {violation_id} by {resolved_by}")
            return violation

        except Exception as e:
            self.logger.error(f"Failed to resolve violation {violation_id}: {e}")
            raise

    def _serialize_violation(self, violation: ACGMEViolation) -> Dict[str, Any]:
        """Serialize violation object for API responses."""
        return {
            "id": violation.id,
            "type": violation.violation_type.value,
            "severity": violation.severity.value,
            "title": violation.title,
            "description": violation.description,
            "violation_date": violation.violation_date.isoformat(),
            "detected_at": violation.detected_at.isoformat(),
            "status": violation.status,
            "actual_value": violation.actual_value,
            "limit_value": violation.limit_value,
            "excess_amount": violation.excess_amount,
            "requires_pd_review": violation.requires_pd_review,
            "pd_reviewed": violation.pd_reviewed,
        }

    def _serialize_weekly_summary(
        self, summary: WeeklyDutyHourSummary
    ) -> Dict[str, Any]:
        """Serialize weekly summary for API responses."""
        return {
            "week_start_date": summary.week_start_date.isoformat(),
            "week_end_date": summary.week_end_date.isoformat(),
            "total_duty_hours": summary.total_duty_hours,
            "total_clinical_hours": summary.total_clinical_hours,
            "total_educational_hours": summary.total_educational_hours,
            "educational_hours_percentage": summary.educational_hours_percentage,
            "call_shifts_count": summary.call_shifts_count,
            "is_compliant": summary.is_compliant,
            "compliance_percentage": summary.compliance_percentage,
            "hours_over_limit": summary.hours_over_limit,
            "violation_count": summary.violation_count,
        }

    def _get_resident_alerts(self, resident_id: int) -> List[Dict[str, Any]]:
        """Get active alerts for a resident."""
        alerts = []

        # Check for recent critical violations
        critical_violations = (
            self.db.query(ACGMEViolation)
            .filter(
                ACGMEViolation.resident_id == resident_id,
                ACGMEViolation.severity == ACGMEViolationSeverity.CRITICAL,
                ACGMEViolation.status == "active",
                ACGMEViolation.detected_at >= datetime.utcnow() - timedelta(days=7),
            )
            .count()
        )

        if critical_violations > 0:
            alerts.append(
                {
                    "type": "critical_violation",
                    "message": f"{critical_violations} critical ACGME violation(s) in the last 7 days",
                    "severity": "critical",
                    "action_required": True,
                }
            )

        # Check for pattern of violations
        recent_violations = (
            self.db.query(ACGMEViolation)
            .filter(
                ACGMEViolation.resident_id == resident_id,
                ACGMEViolation.status == "active",
                ACGMEViolation.detected_at >= datetime.utcnow() - timedelta(days=30),
            )
            .count()
        )

        if recent_violations >= 3:
            alerts.append(
                {
                    "type": "violation_pattern",
                    "message": f"{recent_violations} violations in the last 30 days - pattern of non-compliance",
                    "severity": "high",
                    "action_required": True,
                }
            )

        return alerts

    def _get_program_alerts(self, program_id: Optional[str]) -> List[Dict[str, Any]]:
        """Get active alerts for the program."""
        alerts = []

        # Check overall compliance rate
        # This would include program-wide compliance metrics and trends
        # Implementation would depend on specific program requirements

        return alerts

    def _get_resident_recommendations(
        self, compliance_status: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Get recommendations for improving resident compliance."""
        recommendations = []

        if compliance_status["avg_weekly_hours"] > 75:
            recommendations.append(
                {
                    "type": "workload_reduction",
                    "message": "Consider reducing weekly assignments to prevent 80-hour violations",
                    "priority": "medium",
                }
            )

        if compliance_status["weeks_over_80_hours"] > 0:
            recommendations.append(
                {
                    "type": "schedule_adjustment",
                    "message": "Review scheduling patterns to prevent future 80-hour violations",
                    "priority": "high",
                }
            )

        return recommendations

    def _get_program_recommendations(
        self,
        severity_counts: Dict[str, int],
        compliant_residents: int,
        total_residents: int,
    ) -> List[Dict[str, Any]]:
        """Get recommendations for improving program compliance."""
        recommendations = []

        compliance_rate = (
            (compliant_residents / total_residents * 100)
            if total_residents > 0
            else 100.0
        )

        if compliance_rate < 90:
            recommendations.append(
                {
                    "type": "program_review",
                    "message": f"Program compliance at {compliance_rate:.1f}% - consider systematic review of scheduling practices",
                    "priority": "high",
                }
            )

        if severity_counts["critical"] > 0:
            recommendations.append(
                {
                    "type": "immediate_action",
                    "message": f"{severity_counts['critical']} critical violations require immediate corrective action",
                    "priority": "critical",
                }
            )

        return recommendations
