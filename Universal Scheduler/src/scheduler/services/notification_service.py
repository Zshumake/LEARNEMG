"""Notification service for ACGME compliance alerts and system notifications."""

import logging
from datetime import datetime, date, timedelta
from typing import List, Dict, Optional, Any
from sqlalchemy.orm import Session
from enum import Enum
import json
from dataclasses import dataclass

from ..models import (
    Resident,
    User,
    ACGMEViolation,
    ACGMEViolationSeverity,
    WeeklyDutyHourSummary,
    CorrectiveAction,
)

logger = logging.getLogger(__name__)


class NotificationType(Enum):
    """Types of notifications."""

    COMPLIANCE_VIOLATION = "compliance_violation"
    CRITICAL_VIOLATION = "critical_violation"
    SCHEDULE_PUBLISHED = "schedule_published"
    CORRECTIVE_ACTION_DUE = "corrective_action_due"
    WEEKLY_SUMMARY = "weekly_summary"
    MONTHLY_REPORT = "monthly_report"
    SYSTEM_ALERT = "system_alert"


class NotificationPriority(Enum):
    """Notification priority levels."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


@dataclass
class NotificationChannel:
    """Notification delivery channel configuration."""

    email: bool = True
    sms: bool = False
    in_app: bool = True
    push: bool = False


@dataclass
class NotificationRecipient:
    """Notification recipient information."""

    user_id: Optional[int] = None
    resident_id: Optional[int] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    name: str = "Unknown"
    role: str = "user"


class NotificationService:
    """Service for managing notifications and alerts."""

    def __init__(self, db_session: Session):
        self.db = db_session
        self.logger = logging.getLogger(__name__)

        # Default notification preferences
        self.default_channels = {
            NotificationType.COMPLIANCE_VIOLATION: NotificationChannel(
                email=True, in_app=True
            ),
            NotificationType.CRITICAL_VIOLATION: NotificationChannel(
                email=True, sms=True, in_app=True
            ),
            NotificationType.SCHEDULE_PUBLISHED: NotificationChannel(
                email=True, in_app=True
            ),
            NotificationType.CORRECTIVE_ACTION_DUE: NotificationChannel(
                email=True, in_app=True
            ),
            NotificationType.WEEKLY_SUMMARY: NotificationChannel(
                email=False, in_app=True
            ),
            NotificationType.MONTHLY_REPORT: NotificationChannel(
                email=True, in_app=False
            ),
            NotificationType.SYSTEM_ALERT: NotificationChannel(email=True, in_app=True),
        }

    def send_compliance_violation_alert(self, violation: ACGMEViolation):
        """Send alert for ACGME compliance violation."""
        try:
            # Determine notification type based on severity
            if violation.severity in [
                ACGMEViolationSeverity.CRITICAL,
                ACGMEViolationSeverity.HIGH,
            ]:
                notification_type = NotificationType.CRITICAL_VIOLATION
            else:
                notification_type = NotificationType.COMPLIANCE_VIOLATION

            # Get resident information
            resident = (
                self.db.query(Resident)
                .filter(Resident.id == violation.resident_id)
                .first()
            )
            if not resident:
                self.logger.error(
                    f"Resident {violation.resident_id} not found for violation {violation.id}"
                )
                return

            # Prepare notification content
            content = {
                "violation_id": violation.id,
                "violation_type": violation.violation_type.value,
                "severity": violation.severity.value,
                "title": violation.title,
                "description": violation.description,
                "violation_date": violation.violation_date.isoformat(),
                "resident_name": resident.name,
                "resident_pgy": resident.pgy_level,
                "actual_value": violation.actual_value,
                "limit_value": violation.limit_value,
                "excess_amount": violation.excess_amount,
            }

            # Determine recipients
            recipients = self._get_compliance_violation_recipients(violation, resident)

            # Send notifications
            for recipient in recipients:
                self._send_notification(
                    notification_type=notification_type,
                    recipient=recipient,
                    subject=f"ACGME Violation Alert: {violation.title}",
                    content=content,
                    priority=self._severity_to_priority(violation.severity),
                )

            self.logger.info(
                f"Sent compliance violation alerts for violation {violation.id} to {len(recipients)} recipients"
            )

        except Exception as e:
            self.logger.error(
                f"Failed to send compliance violation alert for violation {violation.id}: {e}"
            )

    def send_weekly_summary_notification(self, weekly_summary: WeeklyDutyHourSummary):
        """Send weekly duty hour summary to resident and supervisors."""
        try:
            resident = (
                self.db.query(Resident)
                .filter(Resident.id == weekly_summary.resident_id)
                .first()
            )
            if not resident:
                self.logger.error(
                    f"Resident {weekly_summary.resident_id} not found for weekly summary"
                )
                return

            # Prepare summary content
            content = {
                "resident_name": resident.name,
                "resident_pgy": resident.pgy_level,
                "week_start": weekly_summary.week_start_date.isoformat(),
                "week_end": weekly_summary.week_end_date.isoformat(),
                "total_hours": weekly_summary.total_duty_hours,
                "clinical_hours": weekly_summary.total_clinical_hours,
                "educational_hours": weekly_summary.total_educational_hours,
                "educational_percentage": weekly_summary.educational_hours_percentage,
                "call_shifts": weekly_summary.call_shifts_count,
                "compliance_percentage": weekly_summary.compliance_percentage,
                "is_compliant": weekly_summary.is_compliant,
                "hours_over_limit": weekly_summary.hours_over_limit,
                "violation_count": weekly_summary.violation_count,
            }

            # Determine priority based on compliance
            priority = (
                NotificationPriority.HIGH
                if not weekly_summary.is_compliant
                else NotificationPriority.LOW
            )

            # Send to resident
            resident_recipient = NotificationRecipient(
                resident_id=resident.id,
                email=resident.email,
                name=resident.name,
                role="resident",
            )

            self._send_notification(
                notification_type=NotificationType.WEEKLY_SUMMARY,
                recipient=resident_recipient,
                subject=f"Weekly Duty Hour Summary - Week of {weekly_summary.week_start_date}",
                content=content,
                priority=priority,
            )

            # Send to program directors if non-compliant
            if not weekly_summary.is_compliant:
                pd_recipients = self._get_program_director_recipients()
                for recipient in pd_recipients:
                    self._send_notification(
                        notification_type=NotificationType.WEEKLY_SUMMARY,
                        recipient=recipient,
                        subject=f"Non-Compliant Weekly Summary: {resident.name} - Week of {weekly_summary.week_start_date}",
                        content=content,
                        priority=NotificationPriority.HIGH,
                    )

            self.logger.info(
                f"Sent weekly summary notifications for resident {resident.id}"
            )

        except Exception as e:
            self.logger.error(f"Failed to send weekly summary notification: {e}")

    def send_corrective_action_due_alert(self, corrective_action: CorrectiveAction):
        """Send alert for overdue corrective actions."""
        try:
            if not corrective_action.is_overdue:
                return

            resident = (
                self.db.query(Resident)
                .filter(Resident.id == corrective_action.resident_id)
                .first()
            )
            violation = (
                self.db.query(ACGMEViolation)
                .filter(ACGMEViolation.id == corrective_action.violation_id)
                .first()
            )

            content = {
                "corrective_action_id": corrective_action.id,
                "violation_id": corrective_action.violation_id,
                "resident_name": resident.name if resident else "Unknown",
                "action_type": corrective_action.action_type,
                "description": corrective_action.action_description,
                "assigned_to": corrective_action.assigned_to,
                "due_date": (
                    corrective_action.due_date.isoformat()
                    if corrective_action.due_date
                    else None
                ),
                "days_overdue": (
                    (date.today() - corrective_action.due_date).days
                    if corrective_action.due_date
                    else 0
                ),
                "original_violation": {
                    "type": violation.violation_type.value if violation else "unknown",
                    "severity": violation.severity.value if violation else "unknown",
                    "title": violation.title if violation else "Unknown violation",
                },
            }

            # Send to assigned person and supervisors
            recipients = self._get_corrective_action_recipients(corrective_action)

            for recipient in recipients:
                self._send_notification(
                    notification_type=NotificationType.CORRECTIVE_ACTION_DUE,
                    recipient=recipient,
                    subject=f"Overdue Corrective Action: {corrective_action.action_type}",
                    content=content,
                    priority=NotificationPriority.HIGH,
                )

            self.logger.info(
                f"Sent overdue corrective action alerts for action {corrective_action.id}"
            )

        except Exception as e:
            self.logger.error(f"Failed to send corrective action due alert: {e}")

    def send_schedule_published_notification(self, schedule_id: int, published_by: str):
        """Send notification when a new schedule is published."""
        try:
            from ..models import Schedule, Assignment

            schedule = (
                self.db.query(Schedule).filter(Schedule.id == schedule_id).first()
            )
            if not schedule:
                self.logger.error(f"Schedule {schedule_id} not found")
                return

            # Get assignments count by resident
            assignments = (
                self.db.query(Assignment)
                .filter(Assignment.schedule_id == schedule_id)
                .all()
            )
            resident_assignments = {}

            for assignment in assignments:
                if assignment.resident_id not in resident_assignments:
                    resident_assignments[assignment.resident_id] = 0
                resident_assignments[assignment.resident_id] += 1

            content = {
                "schedule_id": schedule.id,
                "schedule_name": schedule.name,
                "start_date": schedule.start_date.isoformat(),
                "end_date": schedule.end_date.isoformat(),
                "published_by": published_by,
                "published_at": datetime.utcnow().isoformat(),
                "total_assignments": len(assignments),
                "compliance_percentage": schedule.compliance_percentage,
            }

            # Send to all active residents
            residents = self.db.query(Resident).filter(Resident.is_active == True).all()

            for resident in residents:
                resident_content = content.copy()
                resident_content["resident_assignments"] = resident_assignments.get(
                    resident.id, 0
                )

                recipient = NotificationRecipient(
                    resident_id=resident.id,
                    email=resident.email,
                    name=resident.name,
                    role="resident",
                )

                self._send_notification(
                    notification_type=NotificationType.SCHEDULE_PUBLISHED,
                    recipient=recipient,
                    subject=f"New Schedule Published: {schedule.name}",
                    content=resident_content,
                    priority=NotificationPriority.MEDIUM,
                )

            # Send to program directors
            pd_recipients = self._get_program_director_recipients()
            for recipient in pd_recipients:
                self._send_notification(
                    notification_type=NotificationType.SCHEDULE_PUBLISHED,
                    recipient=recipient,
                    subject=f"Schedule Published: {schedule.name}",
                    content=content,
                    priority=NotificationPriority.LOW,
                )

            self.logger.info(
                f"Sent schedule published notifications for schedule {schedule_id}"
            )

        except Exception as e:
            self.logger.error(f"Failed to send schedule published notification: {e}")

    def send_monthly_compliance_report_notification(self, report_id: int):
        """Send notification about monthly compliance report availability."""
        try:
            from ..models import ACGMEComplianceReport

            report = (
                self.db.query(ACGMEComplianceReport)
                .filter(ACGMEComplianceReport.id == report_id)
                .first()
            )
            if not report:
                self.logger.error(f"Compliance report {report_id} not found")
                return

            content = {
                "report_id": report.id,
                "report_name": report.report_name,
                "report_type": report.report_type,
                "period": f"{report.start_date} to {report.end_date}",
                "total_residents": report.total_residents,
                "compliance_rate": report.compliance_rate,
                "total_violations": report.total_violations,
                "critical_violations": report.critical_violations,
                "high_violations": report.high_violations,
                "generated_at": report.created_at.isoformat(),
            }

            # Send to program directors and administrators
            recipients = self._get_program_director_recipients()
            recipients.extend(self._get_administrator_recipients())

            for recipient in recipients:
                self._send_notification(
                    notification_type=NotificationType.MONTHLY_REPORT,
                    recipient=recipient,
                    subject=f"Monthly Compliance Report Available: {report.report_name}",
                    content=content,
                    priority=NotificationPriority.MEDIUM,
                )

            self.logger.info(
                f"Sent monthly report notifications for report {report_id}"
            )

        except Exception as e:
            self.logger.error(f"Failed to send monthly report notification: {e}")

    def _send_notification(
        self,
        notification_type: NotificationType,
        recipient: NotificationRecipient,
        subject: str,
        content: Dict[str, Any],
        priority: NotificationPriority,
    ):
        """Send notification through configured channels."""
        try:
            channels = self.default_channels.get(
                notification_type, NotificationChannel()
            )

            # Format content based on notification type
            formatted_content = self._format_notification_content(
                notification_type, content
            )

            # Send through email
            if channels.email and recipient.email:
                self._send_email_notification(
                    recipient.email, subject, formatted_content, priority
                )

            # Send through in-app notification
            if channels.in_app:
                self._send_in_app_notification(
                    recipient, subject, formatted_content, priority
                )

            # Send through SMS (if configured)
            if channels.sms and recipient.phone:
                self._send_sms_notification(
                    recipient.phone, subject, formatted_content, priority
                )

            # Send through push notification (if configured)
            if channels.push:
                self._send_push_notification(
                    recipient, subject, formatted_content, priority
                )

        except Exception as e:
            self.logger.error(f"Failed to send notification to {recipient.email}: {e}")

    def _send_email_notification(
        self, email: str, subject: str, content: str, priority: NotificationPriority
    ):
        """Send email notification."""
        # This would integrate with your email service (SMTP, SendGrid, etc.)
        self.logger.info(f"EMAIL to {email}: {subject} (Priority: {priority.value})")
        # Example: send_email(to=email, subject=subject, body=content)

    def _send_in_app_notification(
        self,
        recipient: NotificationRecipient,
        subject: str,
        content: str,
        priority: NotificationPriority,
    ):
        """Send in-app notification."""
        # This would store notifications in the database for in-app display
        self.logger.info(
            f"IN-APP to {recipient.name}: {subject} (Priority: {priority.value})"
        )
        # Example: create notification record in database

    def _send_sms_notification(
        self, phone: str, subject: str, content: str, priority: NotificationPriority
    ):
        """Send SMS notification."""
        # This would integrate with SMS service (Twilio, AWS SNS, etc.)
        self.logger.info(f"SMS to {phone}: {subject} (Priority: {priority.value})")
        # Example: send_sms(to=phone, message=f"{subject}: {content[:100]}...")

    def _send_push_notification(
        self,
        recipient: NotificationRecipient,
        subject: str,
        content: str,
        priority: NotificationPriority,
    ):
        """Send push notification."""
        # This would integrate with push notification service (Firebase, etc.)
        self.logger.info(
            f"PUSH to {recipient.name}: {subject} (Priority: {priority.value})"
        )
        # Example: send_push(user_id=recipient.user_id, title=subject, body=content)

    def _format_notification_content(
        self, notification_type: NotificationType, content: Dict[str, Any]
    ) -> str:
        """Format notification content based on type."""
        if notification_type == NotificationType.COMPLIANCE_VIOLATION:
            return f"""
ACGME Compliance Violation Alert

Resident: {content.get('resident_name')} ({content.get('resident_pgy')})
Violation Type: {content.get('violation_type')}
Severity: {content.get('severity').upper()}
Date: {content.get('violation_date')}

Description: {content.get('description')}

Actual Value: {content.get('actual_value')}
Limit: {content.get('limit_value')}
Excess: {content.get('excess_amount')}

This violation requires program director review and may need corrective action.
            """.strip()

        elif notification_type == NotificationType.WEEKLY_SUMMARY:
            return f"""
Weekly Duty Hour Summary

Resident: {content.get('resident_name')} ({content.get('resident_pgy')})
Week: {content.get('week_start')} to {content.get('week_end')}

Total Hours: {content.get('total_hours'):.1f}
Clinical Hours: {content.get('clinical_hours'):.1f}
Educational Hours: {content.get('educational_hours'):.1f} ({content.get('educational_percentage'):.1f}%)

Call Shifts: {content.get('call_shifts')}
Compliance: {content.get('compliance_percentage'):.1f}%
Status: {'COMPLIANT' if content.get('is_compliant') else 'NON-COMPLIANT'}

{f"Hours over 80-hour limit: {content.get('hours_over_limit'):.1f}" if content.get('hours_over_limit') > 0 else ""}
            """.strip()

        elif notification_type == NotificationType.SCHEDULE_PUBLISHED:
            return f"""
New Schedule Published

Schedule: {content.get('schedule_name')}
Period: {content.get('start_date')} to {content.get('end_date')}
Published by: {content.get('published_by')}

Your assignments: {content.get('resident_assignments', 'N/A')}
Total assignments: {content.get('total_assignments')}
Compliance rate: {content.get('compliance_percentage'):.1f}%

Please review your assignments and report any conflicts immediately.
            """.strip()

        else:
            return json.dumps(content, indent=2)

    def _get_compliance_violation_recipients(
        self, violation: ACGMEViolation, resident: Resident
    ) -> List[NotificationRecipient]:
        """Get recipients for compliance violation notifications."""
        recipients = []

        # Add program directors
        recipients.extend(self._get_program_director_recipients())

        # Add chief residents
        recipients.extend(self._get_chief_resident_recipients())

        # For critical violations, also notify the resident
        if violation.severity in [
            ACGMEViolationSeverity.CRITICAL,
            ACGMEViolationSeverity.HIGH,
        ]:
            recipients.append(
                NotificationRecipient(
                    resident_id=resident.id,
                    email=resident.email,
                    name=resident.name,
                    role="resident",
                )
            )

        return recipients

    def _get_program_director_recipients(self) -> List[NotificationRecipient]:
        """Get program director recipients."""
        # This would query for users with program_director role
        # For now, return empty list - would be configured based on your user system
        return []

    def _get_chief_resident_recipients(self) -> List[NotificationRecipient]:
        """Get chief resident recipients."""
        # This would query for users with chief_resident role
        return []

    def _get_administrator_recipients(self) -> List[NotificationRecipient]:
        """Get administrator recipients."""
        # This would query for users with administrator role
        return []

    def _get_corrective_action_recipients(
        self, action: CorrectiveAction
    ) -> List[NotificationRecipient]:
        """Get recipients for corrective action notifications."""
        recipients = []

        # Add the person assigned to the corrective action
        # This would look up the user by name/email
        recipients.append(
            NotificationRecipient(
                email=f"{action.assigned_to.lower().replace(' ', '.')}@hospital.com",  # Example
                name=action.assigned_to,
                role="assigned",
            )
        )

        # Add program directors for oversight
        recipients.extend(self._get_program_director_recipients())

        return recipients

    def _severity_to_priority(
        self, severity: ACGMEViolationSeverity
    ) -> NotificationPriority:
        """Convert ACGME violation severity to notification priority."""
        mapping = {
            ACGMEViolationSeverity.LOW: NotificationPriority.LOW,
            ACGMEViolationSeverity.MEDIUM: NotificationPriority.MEDIUM,
            ACGMEViolationSeverity.HIGH: NotificationPriority.HIGH,
            ACGMEViolationSeverity.CRITICAL: NotificationPriority.CRITICAL,
        }
        return mapping.get(severity, NotificationPriority.MEDIUM)

    def check_and_send_overdue_alerts(self):
        """Check for overdue corrective actions and send alerts."""
        try:
            overdue_actions = (
                self.db.query(CorrectiveAction)
                .filter(
                    CorrectiveAction.due_date < date.today(),
                    CorrectiveAction.status.in_(["planned", "in_progress"]),
                )
                .all()
            )

            for action in overdue_actions:
                self.send_corrective_action_due_alert(action)

            self.logger.info(
                f"Checked overdue corrective actions: {len(overdue_actions)} alerts sent"
            )

        except Exception as e:
            self.logger.error(f"Failed to check overdue alerts: {e}")

    def send_daily_compliance_digest(self, program_id: Optional[str] = None):
        """Send daily digest of compliance status to program directors."""
        try:
            from ..models import ACGMEViolation
            from sqlalchemy import and_, func

            # Get violations from last 24 hours
            yesterday = datetime.utcnow() - timedelta(days=1)
            recent_violations = (
                self.db.query(ACGMEViolation)
                .filter(
                    ACGMEViolation.detected_at >= yesterday,
                    ACGMEViolation.status == "active",
                )
                .all()
            )

            if program_id:
                # Filter by program residents
                program_residents = (
                    self.db.query(Resident)
                    .filter(Resident.program_id == program_id)
                    .all()
                )
                resident_ids = [r.id for r in program_residents]
                recent_violations = [
                    v for v in recent_violations if v.resident_id in resident_ids
                ]

            # Categorize violations
            critical_count = sum(
                1
                for v in recent_violations
                if v.severity == ACGMEViolationSeverity.CRITICAL
            )
            high_count = sum(
                1
                for v in recent_violations
                if v.severity == ACGMEViolationSeverity.HIGH
            )
            medium_count = sum(
                1
                for v in recent_violations
                if v.severity == ACGMEViolationSeverity.MEDIUM
            )

            if not recent_violations:
                return  # No violations, no digest needed

            content = {
                "date": date.today().isoformat(),
                "total_violations": len(recent_violations),
                "critical_violations": critical_count,
                "high_violations": high_count,
                "medium_violations": medium_count,
                "program_id": program_id,
            }

            # Send to program directors
            recipients = self._get_program_director_recipients()
            for recipient in recipients:
                self._send_notification(
                    notification_type=NotificationType.SYSTEM_ALERT,
                    recipient=recipient,
                    subject=f"Daily Compliance Digest - {len(recent_violations)} New Violations",
                    content=content,
                    priority=(
                        NotificationPriority.HIGH
                        if critical_count > 0
                        else NotificationPriority.MEDIUM
                    ),
                )

            self.logger.info(
                f"Sent daily compliance digest: {len(recent_violations)} violations"
            )

        except Exception as e:
            self.logger.error(f"Failed to send daily compliance digest: {e}")
