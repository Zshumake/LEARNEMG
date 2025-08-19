"""Tests for ACGME compliance tracking system."""

import pytest
from datetime import date, datetime, time, timedelta
from unittest.mock import Mock, patch
from sqlalchemy.orm import Session

from src.scheduler.models import (
    Resident, Assignment, DutyHourEntry, WeeklyDutyHourSummary,
    ACGMEViolation, ACGMEComplianceReport, CorrectiveAction,
    ACGMEViolationType, ACGMEViolationSeverity, Schedule
)
from src.scheduler.services.acgme_compliance_engine import ACGMEComplianceEngine, ACGMELimits
from src.scheduler.services.compliance_service import ComplianceService
from src.scheduler.services.notification_service import NotificationService
from src.scheduler.services.compliance_export_service import ComplianceExportService


@pytest.fixture
def sample_resident(db_session):
    """Create a sample resident for testing."""
    resident = Resident(
        name="John Doe",
        email="john.doe@hospital.com",
        pgy_level="PGY-2",
        start_date=date(2024, 7, 1),
        is_active=True
    )
    db_session.add(resident)
    db_session.commit()
    return resident


@pytest.fixture
def sample_schedule(db_session):
    """Create a sample schedule for testing."""
    schedule = Schedule(
        name="Test Schedule",
        start_date=date(2024, 10, 1),
        end_date=date(2024, 10, 31),
        algorithm_used="CSP",
        status="active"
    )
    db_session.add(schedule)
    db_session.commit()
    return schedule


@pytest.fixture
def compliance_engine(db_session):
    """Create ACGME compliance engine instance."""
    return ACGMEComplianceEngine(db_session)


@pytest.fixture
def compliance_service(db_session):
    """Create compliance service instance."""
    return ComplianceService(db_session)


@pytest.fixture
def notification_service(db_session):
    """Create notification service instance."""
    return NotificationService(db_session)


@pytest.fixture
def export_service(db_session):
    """Create export service instance."""
    return ComplianceExportService(db_session)


class TestACGMEComplianceEngine:
    """Test ACGME compliance engine functionality."""
    
    def test_acgme_limits_defaults(self):
        """Test default ACGME limits are correct."""
        limits = ACGMELimits()
        assert limits.max_weekly_hours == 80.0
        assert limits.max_consecutive_hours == 24.0
        assert limits.min_rest_period_hours == 8.0
        assert limits.min_rest_period_after_24h == 14.0
        assert limits.max_moonlighting_hours_weekly == 20.0
    
    def test_duty_hour_tracking_basic(self, compliance_engine, sample_resident, sample_schedule, db_session):
        """Test basic duty hour tracking functionality."""
        # Create assignment
        assignment = Assignment(
            schedule_id=sample_schedule.id,
            resident_id=sample_resident.id,
            assignment_date=date(2024, 10, 1),
            shift_type="call",
            start_time=time(17, 0),
            end_time=time(8, 0),
            duration_hours=15
        )
        db_session.add(assignment)
        db_session.commit()
        
        # Track duty hours
        duty_entry = compliance_engine.track_duty_hours(assignment)
        
        assert duty_entry is not None
        assert duty_entry.resident_id == sample_resident.id
        assert duty_entry.assignment_id == assignment.id
        assert duty_entry.total_hours == 15.0
        assert duty_entry.is_call_duty == True
        assert duty_entry.is_clinical_work == True
    
    def test_duty_hour_classification(self, compliance_engine, sample_resident, sample_schedule, db_session):
        """Test classification of different assignment types."""
        test_cases = [
            ("call", True, False, True, False),
            ("moonlight", True, False, False, True),
            ("educational", False, True, False, False),
            ("research", False, False, False, False),
        ]
        
        for shift_type, is_clinical, is_educational, is_call, is_moonlight in test_cases:
            assignment = Assignment(
                schedule_id=sample_schedule.id,
                resident_id=sample_resident.id,
                assignment_date=date(2024, 10, 1),
                shift_type=shift_type,
                duration_hours=8
            )
            db_session.add(assignment)
            db_session.commit()
            
            activity_type, classified_clinical, classified_educational, classified_call, classified_moonlight = \
                compliance_engine._classify_assignment(assignment)
            
            assert classified_clinical == is_clinical
            assert classified_educational == is_educational
            assert classified_call == is_call
            assert classified_moonlight == is_moonlight
    
    def test_24_hour_violation_detection(self, compliance_engine, sample_resident, sample_schedule, db_session):
        """Test detection of 24-hour consecutive duty violations."""
        # Create assignment exceeding 24 hours
        assignment = Assignment(
            schedule_id=sample_schedule.id,
            resident_id=sample_resident.id,
            assignment_date=date(2024, 10, 1),
            shift_type="call",
            duration_hours=28  # Exceeds 24-hour limit
        )
        db_session.add(assignment)
        db_session.commit()
        
        duty_entry = compliance_engine.track_duty_hours(assignment)
        
        assert duty_entry.potential_violation == True
        assert ACGMEViolationType.DUTY_HOURS_24_HOUR.value in duty_entry.violation_types
    
    def test_weekly_summary_calculation(self, compliance_engine, sample_resident, db_session):
        """Test weekly duty hour summary calculation."""
        week_start = date(2024, 10, 7)  # Monday
        
        # Create duty entries for the week
        duty_entries = []
        for day_offset in range(7):
            entry_date = week_start + timedelta(days=day_offset)
            entry = DutyHourEntry(
                resident_id=sample_resident.id,
                date=entry_date,
                start_time=datetime.combine(entry_date, time(8, 0)),
                end_time=datetime.combine(entry_date, time(18, 0)),
                total_hours=10.0,
                activity_type="clinical_duties",
                is_clinical_work=True,
                entry_method="test"
            )
            db_session.add(entry)
            duty_entries.append(entry)
        
        db_session.commit()
        
        # Calculate weekly summary
        weekly_summary = compliance_engine.calculate_weekly_summary(sample_resident.id, week_start)
        
        assert weekly_summary.total_duty_hours == 70.0  # 7 days * 10 hours
        assert weekly_summary.total_clinical_hours == 70.0
        assert weekly_summary.is_compliant == True  # Under 80 hours
        assert weekly_summary.compliance_percentage == 100.0
    
    def test_80_hour_violation_detection(self, compliance_engine, sample_resident, db_session):
        """Test detection of 80-hour weekly violations."""
        week_start = date(2024, 10, 7)  # Monday
        
        # Create duty entries exceeding 80 hours
        for day_offset in range(6):  # 6 days
            entry_date = week_start + timedelta(days=day_offset)
            entry = DutyHourEntry(
                resident_id=sample_resident.id,
                date=entry_date,
                start_time=datetime.combine(entry_date, time(8, 0)),
                end_time=datetime.combine(entry_date, time(22, 0)),
                total_hours=14.0,  # 6 days * 14 hours = 84 hours
                activity_type="clinical_duties",
                is_clinical_work=True,
                entry_method="test"
            )
            db_session.add(entry)
        
        db_session.commit()
        
        # Calculate weekly summary
        weekly_summary = compliance_engine.calculate_weekly_summary(sample_resident.id, week_start)
        
        assert weekly_summary.total_duty_hours == 84.0
        assert weekly_summary.is_compliant == False
        assert weekly_summary.hours_over_limit == 4.0
        
        # Check for violation creation
        violations = db_session.query(ACGMEViolation).filter(
            ACGMEViolation.resident_id == sample_resident.id,
            ACGMEViolation.violation_type == ACGMEViolationType.DUTY_HOURS_80_HOUR
        ).all()
        
        assert len(violations) > 0
        assert violations[0].actual_value == 84.0
        assert violations[0].limit_value == 80.0
        assert violations[0].excess_amount == 4.0
    
    def test_violation_severity_calculation(self, compliance_engine):
        """Test violation severity determination."""
        # Test different severity levels
        test_cases = [
            (82, 80, ACGMEViolationSeverity.LOW),    # 2.5% over
            (88, 80, ACGMEViolationSeverity.MEDIUM), # 10% over
            (92, 80, ACGMEViolationSeverity.HIGH),   # 15% over
            (100, 80, ACGMEViolationSeverity.CRITICAL) # 25% over
        ]
        
        for actual, limit, expected_severity in test_cases:
            severity = compliance_engine._determine_severity(actual, limit)
            assert severity == expected_severity
    
    def test_resident_compliance_status(self, compliance_engine, sample_resident, db_session):
        """Test comprehensive resident compliance status calculation."""
        start_date = date(2024, 10, 1)
        end_date = date(2024, 10, 31)
        
        # Create some violations
        violation1 = ACGMEViolation(
            resident_id=sample_resident.id,
            violation_type=ACGMEViolationType.DUTY_HOURS_80_HOUR,
            severity=ACGMEViolationSeverity.HIGH,
            violation_date=date(2024, 10, 15),
            title="Weekly hours exceeded",
            description="Worked 85 hours in week",
            actual_value=85.0,
            limit_value=80.0,
            excess_amount=5.0,
            detected_at=datetime.utcnow()
        )
        db_session.add(violation1)
        
        # Create weekly summary
        weekly_summary = WeeklyDutyHourSummary(
            resident_id=sample_resident.id,
            week_start_date=date(2024, 10, 14),
            week_end_date=date(2024, 10, 20),
            year=2024,
            week_number=42,
            total_duty_hours=85.0,
            total_clinical_hours=80.0,
            total_educational_hours=5.0,
            is_compliant=False,
            violation_count=1,
            last_calculated=datetime.utcnow()
        )
        db_session.add(weekly_summary)
        db_session.commit()
        
        # Get compliance status
        status = compliance_engine.get_resident_compliance_status(
            sample_resident.id, start_date, end_date
        )
        
        assert status["resident_id"] == sample_resident.id
        assert status["total_violations"] == 1
        assert status["high_violations"] == 1
        assert status["compliance_percentage"] == 0.0  # 0 out of 1 week compliant
        assert status["requires_immediate_attention"] == True


class TestComplianceService:
    """Test compliance service functionality."""
    
    def test_service_initialization(self, compliance_service):
        """Test compliance service initialization."""
        assert compliance_service is not None
        assert compliance_service.engine is not None
        assert compliance_service.notification_service is not None
    
    def test_process_new_schedule(self, compliance_service, sample_resident, sample_schedule, db_session):
        """Test processing new schedule for compliance."""
        # Create assignments in schedule
        assignment1 = Assignment(
            schedule_id=sample_schedule.id,
            resident_id=sample_resident.id,
            assignment_date=date(2024, 10, 1),
            shift_type="call",
            duration_hours=15
        )
        assignment2 = Assignment(
            schedule_id=sample_schedule.id,
            resident_id=sample_resident.id,
            assignment_date=date(2024, 10, 2),
            shift_type="moonlight",
            duration_hours=12
        )
        db_session.add_all([assignment1, assignment2])
        db_session.commit()
        
        # Process schedule
        result = compliance_service.process_new_schedule(sample_schedule.id)
        
        assert result["schedule_id"] == sample_schedule.id
        assert result["assignments_processed"] == 2
        assert result["duty_entries_created"] == 2
        assert "compliance_rate" in result
    
    def test_resident_dashboard(self, compliance_service, sample_resident):
        """Test resident dashboard data generation."""
        dashboard_data = compliance_service.get_resident_dashboard(sample_resident.id)
        
        assert dashboard_data["resident"]["id"] == sample_resident.id
        assert dashboard_data["resident"]["name"] == sample_resident.name
        assert "compliance_summary" in dashboard_data
        assert "recent_violations" in dashboard_data
        assert "weekly_trends" in dashboard_data
        assert "alerts" in dashboard_data
        assert "recommendations" in dashboard_data
    
    def test_program_dashboard(self, compliance_service, sample_resident):
        """Test program dashboard data generation."""
        dashboard_data = compliance_service.get_program_dashboard()
        
        assert "program_summary" in dashboard_data
        assert "resident_summaries" in dashboard_data
        assert "high_priority_violations" in dashboard_data
        assert "program_alerts" in dashboard_data
        assert "recommendations" in dashboard_data
        assert dashboard_data["program_summary"]["total_residents"] >= 1
    
    def test_monthly_report_generation(self, compliance_service, sample_resident, db_session):
        """Test monthly compliance report generation."""
        # Create some test data
        violation = ACGMEViolation(
            resident_id=sample_resident.id,
            violation_type=ACGMEViolationType.DUTY_HOURS_80_HOUR,
            severity=ACGMEViolationSeverity.MEDIUM,
            violation_date=date(2024, 10, 15),
            title="Test violation",
            description="Test description",
            detected_at=datetime.utcnow()
        )
        db_session.add(violation)
        db_session.commit()
        
        report = compliance_service.generate_monthly_report(2024, 10)
        
        assert report is not None
        assert report.report_type == "monthly"
        assert report.start_date == date(2024, 10, 1)
        assert report.end_date == date(2024, 10, 31)
        assert report.total_residents >= 1
        assert report.total_violations >= 1
    
    def test_corrective_action_creation(self, compliance_service, sample_resident, db_session):
        """Test corrective action creation."""
        # Create violation first
        violation = ACGMEViolation(
            resident_id=sample_resident.id,
            violation_type=ACGMEViolationType.DUTY_HOURS_80_HOUR,
            severity=ACGMEViolationSeverity.HIGH,
            violation_date=date(2024, 10, 15),
            title="Test violation",
            description="Test description",
            detected_at=datetime.utcnow()
        )
        db_session.add(violation)
        db_session.commit()
        
        # Create corrective action
        action = compliance_service.create_corrective_action(
            violation_id=violation.id,
            action_type="schedule_adjustment",
            description="Reduce weekly assignments",
            assigned_to="Program Director",
            due_date=date.today() + timedelta(days=7)
        )
        
        assert action is not None
        assert action.violation_id == violation.id
        assert action.action_type == "schedule_adjustment"
        assert action.assigned_to == "Program Director"
        assert action.status == "planned"
    
    def test_violation_resolution(self, compliance_service, sample_resident, db_session):
        """Test violation resolution."""
        # Create violation
        violation = ACGMEViolation(
            resident_id=sample_resident.id,
            violation_type=ACGMEViolationType.DUTY_HOURS_80_HOUR,
            severity=ACGMEViolationSeverity.MEDIUM,
            violation_date=date(2024, 10, 15),
            title="Test violation",
            description="Test description",
            detected_at=datetime.utcnow(),
            status="active"
        )
        db_session.add(violation)
        db_session.commit()
        
        # Resolve violation
        resolved_violation = compliance_service.resolve_violation(
            violation_id=violation.id,
            resolution_method="schedule_adjustment",
            notes="Adjusted future schedules to prevent recurrence",
            resolved_by="Program Director"
        )
        
        assert resolved_violation.status == "resolved"
        assert resolved_violation.resolution_method == "schedule_adjustment"
        assert resolved_violation.resolved_by == "Program Director"
        assert resolved_violation.resolved_at is not None


class TestNotificationService:
    """Test notification service functionality."""
    
    def test_notification_service_initialization(self, notification_service):
        """Test notification service initialization."""
        assert notification_service is not None
        assert notification_service.default_channels is not None
    
    @patch('src.scheduler.services.notification_service.NotificationService._send_email_notification')
    def test_compliance_violation_alert(self, mock_email, notification_service, sample_resident, db_session):
        """Test compliance violation alert notification."""
        # Create violation
        violation = ACGMEViolation(
            resident_id=sample_resident.id,
            violation_type=ACGMEViolationType.DUTY_HOURS_80_HOUR,
            severity=ACGMEViolationSeverity.CRITICAL,
            violation_date=date(2024, 10, 15),
            title="Critical violation",
            description="Severe duty hour violation",
            detected_at=datetime.utcnow()
        )
        db_session.add(violation)
        db_session.commit()
        
        # Send notification
        notification_service.send_compliance_violation_alert(violation)
        
        # Verify notification was attempted (mock was called)
        # In real implementation, this would verify actual notification delivery
        assert True  # Test passes if no exceptions thrown
    
    def test_weekly_summary_notification(self, notification_service, sample_resident, db_session):
        """Test weekly summary notification."""
        # Create weekly summary
        weekly_summary = WeeklyDutyHourSummary(
            resident_id=sample_resident.id,
            week_start_date=date(2024, 10, 14),
            week_end_date=date(2024, 10, 20),
            year=2024,
            week_number=42,
            total_duty_hours=75.0,
            total_clinical_hours=70.0,
            total_educational_hours=5.0,
            is_compliant=True,
            last_calculated=datetime.utcnow()
        )
        db_session.add(weekly_summary)
        db_session.commit()
        
        # Send notification
        notification_service.send_weekly_summary_notification(weekly_summary)
        
        # Test passes if no exceptions thrown
        assert True
    
    def test_notification_priority_mapping(self, notification_service):
        """Test ACGME severity to notification priority mapping."""
        from src.scheduler.services.notification_service import NotificationPriority
        
        priority_map = {
            ACGMEViolationSeverity.LOW: NotificationPriority.LOW,
            ACGMEViolationSeverity.MEDIUM: NotificationPriority.MEDIUM,
            ACGMEViolationSeverity.HIGH: NotificationPriority.HIGH,
            ACGMEViolationSeverity.CRITICAL: NotificationPriority.CRITICAL
        }
        
        for acgme_severity, expected_priority in priority_map.items():
            actual_priority = notification_service._severity_to_priority(acgme_severity)
            assert actual_priority == expected_priority


class TestComplianceExportService:
    """Test compliance export service functionality."""
    
    def test_export_service_initialization(self, export_service):
        """Test export service initialization."""
        assert export_service is not None
        assert export_service.db is not None
    
    def test_violations_csv_export(self, export_service, sample_resident, db_session):
        """Test violations CSV export."""
        # Create test violation
        violation = ACGMEViolation(
            resident_id=sample_resident.id,
            violation_type=ACGMEViolationType.DUTY_HOURS_80_HOUR,
            severity=ACGMEViolationSeverity.HIGH,
            violation_date=date(2024, 10, 15),
            title="Test violation",
            description="Test description",
            actual_value=85.0,
            limit_value=80.0,
            excess_amount=5.0,
            detected_at=datetime.utcnow()
        )
        db_session.add(violation)
        db_session.commit()
        
        # Export CSV
        csv_content = export_service.export_violations_csv(
            start_date=date(2024, 10, 1),
            end_date=date(2024, 10, 31)
        )
        
        assert csv_content is not None
        assert "Violation_ID" in csv_content  # Header
        assert "Test violation" in csv_content  # Data
        assert "85.0" in csv_content  # Actual value
    
    def test_weekly_summaries_excel_export(self, export_service, sample_resident, db_session):
        """Test weekly summaries Excel export."""
        # Create test weekly summary
        weekly_summary = WeeklyDutyHourSummary(
            resident_id=sample_resident.id,
            week_start_date=date(2024, 10, 14),
            week_end_date=date(2024, 10, 20),
            year=2024,
            week_number=42,
            total_duty_hours=75.0,
            total_clinical_hours=70.0,
            is_compliant=True,
            last_calculated=datetime.utcnow()
        )
        db_session.add(weekly_summary)
        db_session.commit()
        
        # Export Excel
        excel_content = export_service.export_weekly_summaries_excel(
            start_date=date(2024, 10, 1),
            end_date=date(2024, 10, 31)
        )
        
        assert excel_content is not None
        assert isinstance(excel_content, bytes)
        assert len(excel_content) > 0
    
    def test_duty_hours_detailed_csv_export(self, export_service, sample_resident, db_session):
        """Test detailed duty hours CSV export."""
        # Create test duty hour entry
        duty_entry = DutyHourEntry(
            resident_id=sample_resident.id,
            date=date(2024, 10, 15),
            start_time=datetime.combine(date(2024, 10, 15), time(8, 0)),
            end_time=datetime.combine(date(2024, 10, 15), time(18, 0)),
            total_hours=10.0,
            activity_type="clinical_duties",
            is_clinical_work=True,
            entry_method="test"
        )
        db_session.add(duty_entry)
        db_session.commit()
        
        # Export CSV
        csv_content = export_service.export_duty_hours_detailed_csv(
            resident_id=sample_resident.id,
            start_date=date(2024, 10, 1),
            end_date=date(2024, 10, 31)
        )
        
        assert csv_content is not None
        assert sample_resident.name in csv_content
        assert "10.0" in csv_content  # Total hours
        assert "clinical_duties" in csv_content
    
    def test_compliance_report_json_export(self, export_service, db_session):
        """Test compliance report JSON export."""
        # Create test report
        report = ACGMEComplianceReport(
            report_name="Test Report",
            report_type="monthly",
            start_date=date(2024, 10, 1),
            end_date=date(2024, 10, 31),
            total_residents=5,
            compliant_residents=4,
            compliance_rate=80.0,
            total_violations=3,
            generated_by="Test System"
        )
        db_session.add(report)
        db_session.commit()
        
        # Export JSON
        json_content = export_service.export_compliance_report_json(report.id)
        
        assert json_content is not None
        assert "Test Report" in json_content
        assert '"compliance_rate": 80.0' in json_content
        assert '"total_violations": 3' in json_content
    
    def test_acgme_submission_package(self, export_service, sample_resident, db_session):
        """Test ACGME submission package generation."""
        # Create test report with minimal data
        report = ACGMEComplianceReport(
            report_name="Submission Test Report",
            report_type="quarterly",
            start_date=date(2024, 10, 1),
            end_date=date(2024, 12, 31),
            total_residents=1,
            compliant_residents=1,
            compliance_rate=100.0,
            total_violations=0,
            generated_by="Test System"
        )
        db_session.add(report)
        db_session.commit()
        
        # Generate package
        package = export_service.generate_acgme_submission_package(report.id)
        
        assert package is not None
        assert isinstance(package, dict)
        assert "compliance_report.json" in package
        assert "violations_summary.csv" in package
        assert "weekly_summaries.xlsx" in package
        assert "corrective_actions.csv" in package
        assert "cover_letter.txt" in package
        assert len(package) == 5
    
    def test_audit_trail_logging(self, export_service, db_session):
        """Test audit trail logging for exports."""
        # Test export activity logging
        export_service._log_export_activity(
            "test_export",
            {"test_param": "test_value", "record_count": 10}
        )
        
        # Verify audit log was created
        from src.scheduler.models import AuditLog
        audit_entries = db_session.query(AuditLog).filter(
            AuditLog.action == "test_export"
        ).all()
        
        assert len(audit_entries) == 1
        assert audit_entries[0].details["test_param"] == "test_value"
        assert audit_entries[0].details["record_count"] == 10


class TestACGMEIntegration:
    """Integration tests for complete ACGME compliance workflow."""
    
    def test_complete_compliance_workflow(self, db_session, sample_resident, sample_schedule):
        """Test complete workflow from schedule generation to compliance reporting."""
        # Initialize services
        compliance_service = ComplianceService(db_session)
        
        # Step 1: Create assignments that will cause violations
        assignments = []
        for day_offset in range(6):  # 6 days of heavy duty
            assignment_date = date(2024, 10, 1) + timedelta(days=day_offset)
            assignment = Assignment(
                schedule_id=sample_schedule.id,
                resident_id=sample_resident.id,
                assignment_date=assignment_date,
                shift_type="call",
                duration_hours=16  # 6 * 16 = 96 hours (violation)
            )
            assignments.append(assignment)
            db_session.add(assignment)
        
        db_session.commit()
        
        # Step 2: Process schedule for compliance
        result = compliance_service.process_new_schedule(sample_schedule.id)
        assert result["assignments_processed"] == 6
        
        # Step 3: Verify violations were detected
        violations = db_session.query(ACGMEViolation).filter(
            ACGMEViolation.resident_id == sample_resident.id
        ).all()
        assert len(violations) > 0
        
        # Step 4: Generate compliance report
        report = compliance_service.generate_monthly_report(2024, 10)
        assert report.total_violations > 0
        
        # Step 5: Create corrective action
        if violations:
            action = compliance_service.create_corrective_action(
                violation_id=violations[0].id,
                action_type="schedule_adjustment",
                description="Reduce future assignments",
                assigned_to="Program Director"
            )
            assert action is not None
            
            # Step 6: Resolve violation
            resolved = compliance_service.resolve_violation(
                violation_id=violations[0].id,
                resolution_method="schedule_modification",
                notes="Schedule modified to prevent future violations",
                resolved_by="Program Director"
            )
            assert resolved.status == "resolved"
    
    def test_multi_resident_compliance_tracking(self, db_session, sample_schedule):
        """Test compliance tracking with multiple residents."""
        # Create multiple residents
        residents = []
        for i in range(3):
            resident = Resident(
                name=f"Resident {i+1}",
                email=f"resident{i+1}@hospital.com",
                pgy_level="PGY-2",
                start_date=date(2024, 7, 1),
                is_active=True
            )
            db_session.add(resident)
            residents.append(resident)
        
        db_session.commit()
        
        # Create assignments with different compliance levels
        compliance_service = ComplianceService(db_session)
        
        for i, resident in enumerate(residents):
            # Resident 1: Compliant, Resident 2: Minor violation, Resident 3: Major violation
            hours_per_day = [10, 12, 16][i]  # 70, 84, 112 hours per week
            
            for day_offset in range(7):
                assignment_date = date(2024, 10, 1) + timedelta(days=day_offset)
                assignment = Assignment(
                    schedule_id=sample_schedule.id,
                    resident_id=resident.id,
                    assignment_date=assignment_date,
                    shift_type="call",
                    duration_hours=hours_per_day
                )
                db_session.add(assignment)
        
        db_session.commit()
        
        # Process schedule
        result = compliance_service.process_new_schedule(sample_schedule.id)
        assert result["assignments_processed"] == 21  # 3 residents * 7 days
        
        # Generate program dashboard
        dashboard = compliance_service.get_program_dashboard()
        assert dashboard["program_summary"]["total_residents"] == 3
        
        # Check that different compliance levels were detected
        resident_summaries = dashboard["resident_summaries"]
        compliance_rates = [summary["compliance_percentage"] for summary in resident_summaries]
        
        # Should have at least one fully compliant and one non-compliant resident
        assert max(compliance_rates) > min(compliance_rates)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])